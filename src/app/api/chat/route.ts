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

const SYSTEM_INSTRUCTION = `أنت "Hodour AI Agent"، المساعد الذكي الرسمي لشركة حضور (Hodour) للإعلانات والتسويق المتكامل والإنتاج الإعلامي.

معلومات عن حضور (Hodour):
- شركة إعلانات وتسويق متكاملة في مصر: إنتاج إعلامي وسينمائي، تصميم جرافيكي وهوية بصرية، تسويق رقمي وإعلانات ممولة، تطوير مواقع وتطبيقات، وإدارة سوشيال ميديا.
- المدير التنفيذي وفريق العمل متاحون لدعم ونمو كافة العملاء.

قواعد التعامل:
- تكلم العملاء باللهجة المصرية العامية المحترفة والراقية، بأسلوب ذكي ومختصر وودود.
- لا تتكلم أكتر من 3-4 جمل في الرد الواحد.
- وضح دايماً إزاي حضور (Hodour) تقدر تحل مشكلة العميل وتصنع له حضور حقيقي في السوق.
- لو العميل سأل عن التواصل أو الأسعار، وجهه للتواصل مباشرة مع إدارة حضور عبر واتساب.
- ما تذكرش أسماء منافسين أو شركات تانية أبداً.`;

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 10 };

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

function getLocalFallbackResponse(message: string): { reply: string; showWhatsApp: boolean } {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("سعر") || lowerMsg.includes("أسعار") || lowerMsg.includes("بكام") || lowerMsg.includes("price") || lowerMsg.includes("تكلفة")) {
    return {
      reply: "أسعارنا بتختلف حسب حجم المشروع وتفاصيله. تقدر تتواصل مباشرة مع إدارة حضور (Hodour) على واتساب وهنقدّم لك استشارة وتسعير دقيق بعد دراسة متطلباتك! 💬",
      showWhatsApp: true
    };
  }

  if (lowerMsg.includes("خدمات") || lowerMsg.includes("بتعملوا ايه") || lowerMsg.includes("services")) {
    return {
      reply: "إحنا في حضور (Hodour) بنقدم خدمات متكاملة: إنتاج إعلامي وسينمائي، تصميم وهوية بصرية، تسويق رقمي، وتطوير مواقع. محتاج تفاصيل عن خدمة معينة؟",
      showWhatsApp: false
    };
  }

  if (lowerMsg.includes("موبايل") || lowerMsg.includes("تطبيقات") || lowerMsg.includes("app") || lowerMsg.includes("موقع")) {
    return {
      reply: "بنطوّر مواقع ومنصات رقمية وتطبيقات فائقة السرعة والأمان لتنمية أعمالك. تواصل معنا على واتساب لو عندك فكرة جاهزة للتنفيذ!",
      showWhatsApp: true
    };
  }

  if (lowerMsg.includes("سلام") || lowerMsg.includes("اهلا") || lowerMsg.includes("أهلا") || lowerMsg.includes("hi") || lowerMsg.includes("مرحبا")) {
    return {
      reply: "أهلاً بيك في حضور (Hodour)! إزاي نقدر نساعدك في صناعة حضور استثنائي لمشروعك النهاردة؟",
      showWhatsApp: false
    };
  }

  return {
    reply: "أنا المساعد الذكي لـ حضور (Hodour)! حالياً تقدر تتواصل مباشرة مع فريقنا على واتساب للمساعدة الفورية 👇",
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
        "مشروعك واعد ويستحق حل متكامل 🚀 لخصت تفاصيل طلبك وفريق حضور (Hodour) متاح للتواصل معك على واتساب الآن لمناقشة خطة العمل!",
      showWhatsApp: true
    });
    applyRateLimitHeaders(response, rateResult);
    return response;
  }

  // Build sanitized alternating contents for Gemini API:
  // Rules: must start with 'user', and roles must alternate strictly (user -> model -> user)
  const rawTurns = history
    .filter(
      (m) =>
        (m.role === "user" || m.role === "bot") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0,
    )
    .map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.text.trim() }],
    }));

  const alternatingTurns: { role: "user" | "model"; parts: { text: string }[] }[] = [];
  for (const turn of rawTurns) {
    if (alternatingTurns.length === 0) {
      if (turn.role === "user") {
        alternatingTurns.push(turn);
      }
    } else {
      const lastTurn = alternatingTurns[alternatingTurns.length - 1];
      if (lastTurn.role !== turn.role) {
        alternatingTurns.push(turn);
      } else {
        lastTurn.parts[0].text += `\n${turn.parts[0].text}`;
      }
    }
  }

  if (alternatingTurns.length > 0 && alternatingTurns[alternatingTurns.length - 1].role === "user") {
    alternatingTurns[alternatingTurns.length - 1].parts[0].text += `\n${rawMessage}`;
  } else {
    alternatingTurns.push({
      role: "user" as const,
      parts: [{ text: rawMessage }],
    });
  }

  const sanitizedContents = alternatingTurns;

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
