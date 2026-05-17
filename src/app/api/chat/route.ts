import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    // Keep initialization inside the handler so runtime env vars are always available.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const body = await req.json();
    const { history = [], message = "" } = body as {
      history?: Array<{ role: string; text: string }>;
      message?: string;
    };

    const normalizedMessage = String(message).trim();
    if (!normalizedMessage) {
      return NextResponse.json({ reply: "ابعتلي سؤالك وأنا معاك فوراً." });
    }

    const userMessageCount =
      history.filter((msg) => msg.role === "user").length + 1;

    if (userMessageCount === 3) {
      return NextResponse.json({
        reply: "واضح إن مشروعك محتاج كلام متخصص. أنا لخصت طلبك وديبو (المدير التقني) مستنيك على واتساب حالاً.",
        showWhatsApp: true,
      });
    }

    const systemInstruction =
      "أنت Shift AI Agent، مساعد ذكي لشركة SHIFT للتكنولوجيا. مديرك التقني هو ديبو (Mohamed Tarek). كلم العملاء بالمصري، بذكاء واختصار، ووضح لهم إزاي بنطور البيزنس بالـ AI والسيكيوريتي.";

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> =
      history
        .filter(
          (msg) =>
            (msg.role === "user" || msg.role === "bot") &&
            typeof msg.text === "string" &&
            msg.text.trim().length > 0,
        )
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

    contents.push({
      role: "user",
      parts: [{ text: normalizedMessage }],
    });

    const result = await model.generateContent({
      contents:
        contents.length > 0
          ? contents
          : [
              {
                role: "user",
                parts: [{ text: normalizedMessage }],
              },
            ],
    });

    const text = result.response.text()?.trim();

    return NextResponse.json({
      reply: text || "ابعتلي تفاصيل أكتر عن مشروعك وأنا هساعدك فوراً.",
      showWhatsApp: false,
    });
  } catch (error: unknown) {
    console.error("GEMINI_API_ERROR:", error);

    return NextResponse.json({
      reply: "أهلاً بك! أنا مساعد SHIFT، حالياً بنحدث الأنظمة، بس تقدر تسألني أي حاجة وهرد عليك فوراً على واتساب.",
      showWhatsApp: false,
    });
  }
}
