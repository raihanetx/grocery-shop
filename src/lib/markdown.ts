// Simple markdown parser for basic formatting
// Supports: **bold**, *italic*, __underline__, ~~strikethrough~~

export function parseMarkdown(text: string): string {
  if (!text) return ''
  
  let result = text
  
  // Escape HTML to prevent XSS
  result = result
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Bold: **text** or __text__
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/__(.*?)__/g, '<strong>$1</strong>')
  
  // Italic: *text* or _text_
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  result = result.replace(/_([^_]+)_/g, '<em>$1</em>')
  
  // Strikethrough: ~~text~~
  result = result.replace(/~~(.*?)~~/g, '<del>$1</del>')
  
  // Code: `text`
  result = result.replace(/`([^`]+)`/g, '<code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">$1</code>')
  
  // Line breaks
  result = result.replace(/\n/g, '<br />')
  
  return result
}

// For use with TypeScript in components
export function renderMarkdown(text: string): { __html: string } {
  return { __html: parseMarkdown(text) }
}
