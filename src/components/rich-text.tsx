import type { ReactNode } from "react";

// [label](https://example.com)
const LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

/**
 * Renders admin-edited body text: blank lines separate paragraphs, and
 * `[label](url)` becomes a link. Everything is built as React elements, so
 * the text can never inject markup; only http(s) URLs are linkified.
 */
export function RichText({
  text,
  className,
  paragraphClassName,
  linkClassName,
}: {
  text: string;
  className?: string;
  paragraphClassName?: string;
  linkClassName?: string;
}) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={paragraphClassName}>
          {linkify(paragraph, linkClassName)}
        </p>
      ))}
    </div>
  );
}

function linkify(paragraph: string, linkClassName?: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of paragraph.matchAll(LINK)) {
    const [full, label, href] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(paragraph.slice(lastIndex, start));
    }
    nodes.push(
      <a
        key={start}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {label}
      </a>,
    );
    lastIndex = start + full.length;
  }

  if (lastIndex < paragraph.length) {
    nodes.push(paragraph.slice(lastIndex));
  }

  return nodes;
}
