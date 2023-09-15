export function quote(text: string) {
  if (!text || (text.startsWith('"') && text.endsWith('"'))) {
    return text;
  } else {
    return `"${text.replace('"', '\\"')}"`;
  }
}
