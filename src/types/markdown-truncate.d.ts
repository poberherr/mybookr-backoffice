declare module "markdown-truncate" {
  export const ASTERISK_ITALIC: string;
  export const UNDERSCORE_ITALIC: string;
  export const ASTERISK_BOLD: string;
  export const UNDERSCORE_BOLD: string;
  export const BACKTICK: string;
  export const TRIPLE_BACKTICKS: string;
  export const ESCAPED_UNDERSCORE: string;
  export const ESCAPED_ASTERISK: string;

  export const ESCAPED_ASTERISK_REGEXP: RegExp;
  export const ASTERISK_PLACEHOLDER_REGEXP: RegExp;
  export const ESCAPED_UNDERSCORE_REGEXP: RegExp;
  export const UNDERSCORE_PLACEHOLDER_REGEXP: RegExp;
  export const UNDERSCORE_BOLD_PLACEHOLDER_REGEXP: RegExp;
  export const UNDERSCORE_BOLD_REGEXP: RegExp;
  export const ASTERISK_BOLD_PLACEHOLDER_REGEXP: RegExp;
  export const ASTERISK_BOLD_REGEXP: RegExp;
  export const UNDERSCORE_ITALIC_PLACEHOLDER_REGEXP: RegExp;
  export const UNDERSCORE_ITALIC_REGEXP: RegExp;
  export const ASTERISK_ITALIC_PLACEHOLDER_REGEXP: RegExp;
  export const ASTERISK_ITALIC_REGEXP: RegExp;
  export const TRIPLE_BACKTICKS_PLACEHOLDER_REGEXP: RegExp;
  export const TRIPLE_BACKTICKS_REGEXP: RegExp;
  export const BACKTICK_PLACEHOLDER_REGEXP: RegExp;
  export const BACKTICK_REGEXP: RegExp;
  export const HYPERLINK: RegExp;

  export function replaceFormatMarkersWithPlaceholders(E: string): string;
  export function replaceFormatPlaceholdersWithMarkers(E: string): string;

  export const formatMarkers: string[];
  export const formatPlaceholdersMap: Record<string, number>;

  export function findFormatPlaceholderAhead(E: string): string | null;
  export function findFormatMarkerAhead(E: string, r: string[]): string | null;

  export function truncate(E: string, r: number, e?: boolean): string;

  interface TruncateMarkdownOptions {
    limit?: number;
    ellipsis?: boolean;
  }

  export default function truncateMarkdown(
    E: string,
    r?: TruncateMarkdownOptions,
  ): string;
}
