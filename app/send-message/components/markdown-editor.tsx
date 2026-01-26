"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function MarkdownEditor({ value, onChange, disabled }: MarkdownEditorProps) {
  return (
    <div className="space-y-2">
      <Label>Markdown Content</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="font-mono text-sm min-h-[400px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
        placeholder="# Audit Report

## Executive Summary
Your markdown content here...

**Bold text**, *italic text*, `code`

### Code Example
\`\`\`javascript
console.log('Hello World');
\`\`\`"
      />
      <p className="text-xs text-white/40">
        Supports: Headers, bold, italic, lists, tables, code blocks with syntax highlighting
      </p>
    </div>
  )
}
