/**
 * Add quotes around a string if necessary.
 *
 * @param text string to return between quotes
 * @returns given string with quotes
 */
export function quote(text: string) {
  if (!text || (text.startsWith('"') && text.endsWith('"'))) {
    return text;
  } else {
    return `"${text.replace('"', '\\"')}"`;
  }
}
