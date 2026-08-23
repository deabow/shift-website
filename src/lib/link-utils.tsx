import React from "react";
import { ExternalLink } from "lucide-react";

/**
 * Utility to parse plain text description and convert embedded URLs (http/https)
 * into safe, clickable external links with hover effects.
 */
export function renderFormattedDescription(text: string): React.ReactNode {
  if (!text) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const displayUrl = part.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-violet-400 underline underline-offset-4 transition-colors hover:text-violet-300"
          onClick={(e) => e.stopPropagation()}
        >
          <span>{displayUrl}</span>
          <ExternalLink size={12} className="shrink-0 text-violet-400" />
        </a>
      );
    }
    return part;
  });
}
