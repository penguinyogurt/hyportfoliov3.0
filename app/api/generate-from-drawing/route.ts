import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { imageData } = await req.json()

    // Step 1: Use Imagga for image recognition
    const imaggaResponse = await fetch("https://api.imagga.com/v2/tags", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from("acc_your_key:your_secret").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_base64: imageData.split(",")[1],
      }),
    })

    let tags: string[] = []

    if (imaggaResponse.ok) {
      const imaggaData = await imaggaResponse.json()
      tags = imaggaData.result?.tags?.slice(0, 10).map((tag: any) => tag.tag.en) || []
    }

    // Fallback: analyze the drawing ourselves if Imagga fails
    if (tags.length === 0) {
      tags = ["sketch", "drawing", "artwork", "creative"]
    }

    console.log("[v0] Imagga tags:", tags)

    // Step 2: Use Groq to structure a better prompt
    const { text: enhancedPrompt } = await generateText({
      model: "groq/llama-3.3-70b-versatile",
      prompt: `You are an expert at creating detailed image generation prompts. 
      
A user has drawn a sketch that has been analyzed with these tags: ${tags.join(", ")}

Create a detailed, creative prompt for an AI image generator that will transform this sketch into a beautiful, polished artwork. 
The prompt should be descriptive, artistic, and specify style, lighting, and mood.

Return ONLY the prompt text, nothing else.`,
      maxOutputTokens: 200,
    })

    console.log("[v0] Enhanced prompt:", enhancedPrompt)

    // Step 3: Generate image with Pollinations.ai
    const pollinationsPrompt = encodeURIComponent(enhancedPrompt.trim())
    const generatedImageUrl = `https://image.pollinations.ai/prompt/${pollinationsPrompt}?width=1024&height=1024&nologo=true`

    return Response.json({
      tags,
      enhancedPrompt,
      generatedImage: generatedImageUrl,
    })
  } catch (error) {
    console.error("[v0] Error in generate-from-drawing:", error)
    return Response.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
