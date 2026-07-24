import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkRateLimit, applyRateLimitHeaders } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

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

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 10 };

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

function getLocalFallbackResponse(message: string): { reply: string; showWhatsApp: boolean } {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("سعر") || lowerMsg.includes("أسعار") || lowerMsg.includes("بكام") || lowerMsg.includes("price") || lowerMsg.includes("تكلفة")) {
    return {
      reply: "أسعارنا بتختلف حسب حجم المشروع وتفاصيله. تقدر تكلم ديبو على واتساب وهيديك تسعير دقيق بعد ما يفهم متطلباتك! 💬",
      showWhatsApp: true
    };
  }
  
  if (lowerMsg.includes("خدمات") || lowerMsg.includes("بتعملوا ايه") || lowerMsg.includes("services")) {
    return {
      reply: "إحنا في SHIFT بنقدم 4 خدمات أساسية: تطوير مواقع وتطبيقات، تسويق رقمي، هوية بصرية وإنتاج سينمائي، وأمن سيبراني. محتاج تفاصيل عن خدمة معينة؟",
      showWhatsApp: false
    };
  }
  
  if (lowerMsg.includes("موبايل") || lowerMsg.includes("تطبيقات") || lowerMsg.includes("app")) {
    return {
      reply: "بنبرمج تطبيقات الموبايل باستخدام Flutter و React Native عشان نضمن أعلى أداء على iOS و Android. كلم ديبو لو عندك فكرة تطبيق!",
      showWhatsApp: true
    };
  }
  
  if (lowerMsg.includes("سلام") || lowerMsg.includes("اهلا") || lowerMsg.includes("أهلا") || lowerMsg.includes("hi") || lowerMsg.includes("مرحبا")) {
    return {
      reply: "أهلاً بيك! إزاي أقدر أساعدك في تطوير البيزنس بتاعك النهاردة؟",
      showWhatsApp: false
    };
  }
  
  return {
    reply: "انا المساعد الذكي لـ SHIFT! حالياً في ضغط على السيرفر بس تقدر تكلم ديبو مباشرة على واتساب وهيجاوبك فوراً 👇",
    showWhatsApp: true
  };
}

async function callGeminiWithRetry(
  contents: { role: "user" | "model"; parts: { text: string }[] }[],
  apiKey: string,
): Promise<string | null> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const result = await model.generateContent({ contents });
      const text = result.response.text()?.trim();

      if (text) {
        logger.info("chat", `Gemini responded on attempt ${attempt}`);
        return text;
      }

      logger.warn("chat", `Gemini returned empty on attempt ${attempt}`);
    } catch (error: unknown) {
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? (error as { status: number }).status
          : null;

      logger.error("chat", `Gemini attempt ${attempt} failed`, {
        status,
        message: error instanceof Error ? error.message : String(error),
      });

      if (status === 429 && attempt < MAX_RETRIES) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
        logger.info("chat", `Retrying in ${delay}ms due to rate limit`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (attempt < MAX_RETRIES) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  return null;
}

export async function POST(req: Request): Promise<NextResponse> {
  const rateResult = checkRateLimit(req, RATE_LIMIT);

  if (!rateResult.allowed) {
    logger.warn("chat", "Rate limit exceeded");
    const response = NextResponse.json<ChatResponse>(
      {
        reply: "تم تجاوز حد الطلبات. جرّب تاني بعد شوية.",
        showWhatsApp: true,
      },
      { status: 429 },
    );
    applyRateLimitHeaders(response, rateResult);
    return response;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  // If API key is missing entirely, we don't return an error, we just use the fallback engine later
  if (!apiKey) {
    logger.warn("chat", "GEMINI_API_KEY is not set. Will use fallback engine.");
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    logger.warn("chat", "Invalid JSON body");
    return NextResponse.json(
      { error: "Bad Request", details: "Request body is not valid JSON." },
      { status: 400 },
    );
  }

  const history: HistoryEntry[] = Array.isArray(body.history) ? body.history : [];
  const rawMessage = typeof body.message === "string" ? body.message.trim() : "";

  if (!rawMessage) {
    const response = NextResponse.json<ChatResponse>({
      reply: "ابعتلي سؤالك وأنا معاك فوراً 👋",
      showWhatsApp: false,
    });
    applyRateLimitHeaders(response, rateResult);
    return response;
  }

  const userTurnCount = history.filter((m) => m.role === "user").length + 1;
  if (userTurnCount >= 3) {
    logger.info("chat", "User hit 3-message limit, showing WhatsApp CTA");
    const response = NextResponse.json<ChatResponse>({
      reply:
        "واضح إن مشروعك كبير ومحتاج حل متخصص 🔥 لخصت طلبك وديبو (المدير التقني) مستنيك على واتساب دلوقتي!",
      showWhatsApp: true,
    });
    applyRateLimitHeaders(response, rateResult);
    return response;
  }

  const geminiContents = history
    .filter(
      (m) =>
        (m.role === "user" || m.role === "bot") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0,
    )
    .map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.text }],
    }));

  const sanitizedContents =
    geminiContents.length > 0 && geminiContents[0].role !== "user"
      ? geminiContents.slice(1)
      : geminiContents;

  sanitizedContents.push({
    role: "user" as const,
    parts: [{ text: rawMessage }],
  });

  logger.info("chat", `Sending ${sanitizedContents.length} turn(s) to Gemini`);

  let replyText = null;
  
  if (apiKey) {
    replyText = await callGeminiWithRetry(sanitizedContents, apiKey);
  } else {
    logger.warn("chat", "Skipping Gemini call because API key is empty");
  }

  if (replyText) {
    const response = NextResponse.json<ChatResponse>({
      reply: replyText,
      showWhatsApp: false,
    });
    applyRateLimitHeaders(response, rateResult);
    return response;
  }

  logger.warn("chat", "All Gemini retries failed or API key invalid, returning smart fallback");
  
  const fallback = getLocalFallbackResponse(rawMessage);
  
  const response = NextResponse.json<ChatResponse>(fallback);
  applyRateLimitHeaders(response, rateResult);
  return response;
}
