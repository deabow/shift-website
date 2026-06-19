import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Types ────────────────────────────────────────────────────────────────────
type HistoryEntry = {
  role: "user" | "bot";
  text: string;
};

type RequestBody = {
  history?: HistoryEntry[];
  message?: string;
};

type ChatResponse = {
  reply: string;
  showWhatsApp: boolean;
};

// ─── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `أنت "Shift AI Agent"، المساعد الذكي الرسمي لشركة SHIFT للتكنولوجيا والإبداع الرقمي.

معلومات عن SHIFT:
- متخصصة في تطوير الويب (Next.js, React)، تطبيقات الموبايل (Flutter, React Native)، أنظمة المؤسسات والـ ERP المخصصة، والأمن السيبراني واختبار الاختراق.
- المدير التقني للشركة هو ديبو (Mohamed Tarek).

قواعد التعامل:
- تكلم العملاء باللهجة المصرية العامية فقط، بأسلوب ذكي ومختصر وودود.
- لا تتكلم أكتر من 3-4 جمل في الرد الواحد.
- وضح دايماً إزاي SHIFT تقدر تحل مشكلة العميل.
- لو العميل سأل عن التواصل أو الأسعار، وجهه لديبو على واتساب.
- ما تذكرش أسماء منافسين أو شركات تانية أبداً.`;

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request): Promise<NextResponse> {
  // ── 1. Environment check ───────────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "[GEMINI API FATAL ERROR]: GEMINI_API_KEY is not set in environment variables. " +
      "Add it to .env.local as GEMINI_API_KEY=your_key_here"
    );
    return NextResponse.json<ChatResponse>(
      {
        reply:
          "أهلاً! مؤقتاً في تحديث على الأنظمة. تقدر تتواصل مع ديبو مباشرة على واتساب وهيرد عليك فوراً.",
        showWhatsApp: true,
      },
      { status: 200 }
    );
  }

  // ── 2. Parse request body safely ──────────────────────────────────────────
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch (parseError: unknown) {
    console.error("[GEMINI API FATAL ERROR]: Failed to parse request JSON body:", parseError);
    return NextResponse.json(
      { error: "Bad Request", details: "Request body is not valid JSON." },
      { status: 400 }
    );
  }

  const history: HistoryEntry[] = Array.isArray(body.history) ? body.history : [];
  const rawMessage = typeof body.message === "string" ? body.message.trim() : "";

  if (!rawMessage) {
    return NextResponse.json<ChatResponse>({
      reply: "ابعتلي سؤالك وأنا معاك فوراً 👋",
      showWhatsApp: false,
    });
  }

  // ── 3. Three-message hard limit (server-side guard) ───────────────────────
  const userTurnCount = history.filter((m) => m.role === "user").length + 1;
  if (userTurnCount >= 3) {
    return NextResponse.json<ChatResponse>({
      reply:
        "واضح إن مشروعك كبير ومحتاج حل متخصص 🔥 لخصت طلبك وديبو (المدير التقني) مستنيك على واتساب دلوقتي!",
      showWhatsApp: true,
    });
  }

  // ── 4. Call Gemini ─────────────────────────────────────────────────────────
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // stable model supported across all endpoints
      systemInstruction: SYSTEM_INSTRUCTION,
    });
    // Convert frontend history (user/bot) → Gemini format (user/model).
    // Gemini requires strict alternation: first turn must be "user".
    const geminiContents = history
      .filter(
        (m) =>
          (m.role === "user" || m.role === "bot") &&
          typeof m.text === "string" &&
          m.text.trim().length > 0
      )
      .map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("model" as const),
        parts: [{ text: m.text }],
      }));

    // Ensure the history starts with a user turn (Gemini requirement)
    const sanitizedContents =
      geminiContents.length > 0 && geminiContents[0].role !== "user"
        ? geminiContents.slice(1)
        : geminiContents;

    // Append current user message
    sanitizedContents.push({
      role: "user" as const,
      parts: [{ text: rawMessage }],
    });

    console.log(
      `[Gemini] Sending ${sanitizedContents.length} turn(s) to gemini-1.5-flash`
    );

    const result = await model.generateContent({ contents: sanitizedContents });
    const replyText = result.response.text()?.trim();

    if (!replyText) {
      console.warn("[Gemini] Received empty response from model.");
    }

    return NextResponse.json<ChatResponse>({
      reply: replyText || "ابعتلي تفاصيل أكتر عن المشروع وهساعدك في الحل الأمثل!",
      showWhatsApp: false,
    });
  } catch (error: unknown) {
    // Full stack trace in server terminal
    console.error("[GEMINI API FATAL ERROR]:", error);

    // Always return ChatResponse shape so the frontend can read .reply
    return NextResponse.json<ChatResponse>({
      reply:
        "عندي مشكلة تقنية دلوقتي 😅 تقدر تكلم ديبو مباشرة على واتساب وهيساعدك فوراً.",
      showWhatsApp: true,
    });
  }
}
