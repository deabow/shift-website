type LogLevel = "info" | "warn" | "error";

const isDev = process.env.NODE_ENV !== "production";

function formatTimestamp(): string {
  return new Date().toISOString();
}

function log(level: LogLevel, context: string, message: string, data?: unknown): void {
  const timestamp = formatTimestamp();
  const prefix = `[${timestamp}] [${level.toUpperCase()}] [${context}]`;

  if (level === "error") {
    console.error(prefix, message, data !== undefined ? data : "");
  } else if (level === "warn") {
    console.warn(prefix, message, data !== undefined ? data : "");
  } else if (isDev) {
    console.log(prefix, message, data !== undefined ? data : "");
  }
}

export const logger = {
  info: (context: string, message: string, data?: unknown) =>
    log("info", context, message, data),

  warn: (context: string, message: string, data?: unknown) =>
    log("warn", context, message, data),

  error: (context: string, message: string, data?: unknown) =>
    log("error", context, message, data),
};
