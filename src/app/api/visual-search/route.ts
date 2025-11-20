import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Analyze this interior design image. Identify the key furniture and decor items present. Return a JSON array of objects, where each object has a 'name' (string) and 'description' (string) of the item. Focus on items that would be shoppable.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: file.type,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Clean up the response to get pure JSON
    const jsonString = text.replace(/```json\n|\n```/g, "").trim();
    let items = [];
    try {
        items = JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse Gemini response:", text);
        return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
    }

    // In a real app, we would use vector search here.
    // For this demo, we'll do a simple keyword search in our database for each item found.
    const searchResults = [];
    
    for (const item of items) {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: item.name, mode: 'insensitive' } },
                    { description: { contains: item.name, mode: 'insensitive' } }
                ]
            },
            take: 2
        });
        if (products.length > 0) {
            searchResults.push({
                detectedItem: item,
                matches: products
            });
        }
    }

    return NextResponse.json({ detectedItems: items, results: searchResults });
  } catch (error) {
    console.error("Visual Search Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
