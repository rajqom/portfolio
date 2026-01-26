import { marked, Tokens } from 'marked'
import hljs from 'highlight.js'
import fs from 'fs'
import path from 'path'

// Configure marked with GFM
marked.setOptions({
  gfm: true,
  breaks: true,
})

// Extend marked renderer for code blocks with syntax highlighting and Mermaid diagrams
marked.use({
  renderer: {
    code(token: Tokens.Code): string {
      const code = token.text
      const lang = token.lang
      
      // Handle Mermaid diagrams
      if (lang === 'mermaid') {
        // Don't escape Mermaid code - it needs to be parsed by Mermaid.js
        // The code is already sanitized by marked parser
        return `<div class="mermaid">${code}</div>`
      }
      
      // Handle regular code blocks with syntax highlighting
      if (lang && hljs.getLanguage(lang)) {
        try {
          const highlighted = hljs.highlight(code, { language: lang }).value
          return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
        } catch {
          const highlighted = hljs.highlightAuto(code).value
          return `<pre><code class="hljs">${highlighted}</code></pre>`
        }
      }
      const highlighted = hljs.highlightAuto(code).value
      return `<pre><code class="hljs">${highlighted}</code></pre>`
    },
  },
})

export interface AuditReportData {
  title: string
  client: string
  date?: string
  content: string // markdown
}

export function processMarkdownToHtml(markdown: string): string {
  return marked.parse(markdown) as string
}

export function generateAuditReportHtml(data: AuditReportData): string {
  const templatePath = path.join(process.cwd(), 'templates', 'audit-report.html')
  const template = fs.readFileSync(templatePath, 'utf-8')
  
  const markdownHtml = processMarkdownToHtml(data.content)
  const date = data.date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return template
    .replace(/{{title}}/g, escapeHtml(data.title))
    .replace(/{{client}}/g, escapeHtml(data.client))
    .replace(/{{date}}/g, date)
    .replace(/{{markdownContent}}/g, markdownHtml)
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
