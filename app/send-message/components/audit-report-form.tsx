"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, Eye, FileText, Upload } from "lucide-react"
import { MarkdownEditor } from "./markdown-editor"
import type { AuditReportFormData } from "../types"

interface AuditReportFormProps {
  form: {
    register: ReturnType<typeof useForm<AuditReportFormData>>["register"]
    setValue: ReturnType<typeof useForm<AuditReportFormData>>["setValue"]
  }
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isSubmitting: boolean
  errors: ReturnType<typeof useForm<AuditReportFormData>>["formState"]["errors"]
  submitStatus: "idle" | "success" | "error"
  errorMessage: string
  togglePreview: () => void
  showPreview: boolean
  watchedValues: AuditReportFormData
}

export function AuditReportForm({
  form,
  onSubmit,
  isSubmitting,
  errors,
  submitStatus,
  errorMessage,
  togglePreview,
  showPreview,
  watchedValues,
}: AuditReportFormProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown'))) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        form.setValue("content", content)
      }
      reader.readAsText(file)
    }
    // Reset input
    e.target.value = ""
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="audit-title">
          Report Title <span className="text-white/40">*</span>
        </Label>
        <Input
          id="audit-title"
          placeholder="Technical Security Audit Report"
          {...form.register("title")}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="audit-client">
          Client Name <span className="text-white/40">*</span>
        </Label>
        <Input
          id="audit-client"
          placeholder="Acme Corporation"
          {...form.register("client")}
          disabled={isSubmitting}
        />
        {errors.client && (
          <p className="text-sm text-red-400">{errors.client.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="audit-date">Report Date</Label>
        <Input
          id="audit-date"
          type="date"
          {...form.register("date")}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-3">
        <Label>Upload Markdown File (optional)</Label>
        <label className="flex items-center gap-2 px-4 py-2 bg-black text-white border border-white/20 rounded-md hover:bg-black/80 cursor-pointer transition-colors w-fit">
          <Upload className="h-4 w-4" />
          <span className="text-sm">Upload .md File</span>
          <input
            type="file"
            accept=".md,.markdown"
            onChange={handleFileUpload}
            disabled={isSubmitting}
            className="hidden"
          />
        </label>
        <p className="text-xs text-white/40">
          Upload an existing markdown file or write your report below
        </p>
      </div>

      <MarkdownEditor
        value={watchedValues.content || ""}
        onChange={(value) => form.setValue("content", value)}
        disabled={isSubmitting}
      />
      {errors.content && (
        <p className="text-sm text-red-400">{errors.content.message}</p>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <p className="text-sm text-red-400">
            {errorMessage || "Failed to generate PDF. Please try again."}
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={togglePreview}
          disabled={isSubmitting || !watchedValues.content}
          className="flex-1 bg-black text-white border border-white/20 hover:bg-black/80"
        >
          <Eye className="h-4 w-4 mr-2" />
          {showPreview ? "Hide Preview" : "Preview"}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-white text-black hover:bg-white/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate PDF
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
