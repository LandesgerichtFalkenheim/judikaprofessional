export function parseParagraphs(text) {
  const paragraphRegex = /§\s*\d+[a-zA-Z]?(?:\s*Abs\.\s*\d+)?[\s\S]*?(?=§\s*\d+|$)/g;

  const matches = text.match(paragraphRegex) || [];

  const result = {};

  for (const block of matches) {
    const headerMatch = block.match(/§\s*\d+[a-zA-Z]?/);
    if (!headerMatch) continue;

    const paragraphNumber = headerMatch[0].replace("§", "").trim();
    result[paragraphNumber] = block.trim();
  }

  return result;
}
