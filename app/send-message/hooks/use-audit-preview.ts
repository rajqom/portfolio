import * as React from "react"
import type { AuditReportFormData } from "../types"

export function useAuditPreview(
  showPreview: boolean,
  activeTab: string,
  watchedValues: AuditReportFormData
) {
  const [previewHtml, setPreviewHtml] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(false)

  const generatePreview = React.useCallback(async (data: AuditReportFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-audit-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success && result.html) {
        setPreviewHtml(result.html)
      }
    } catch (error) {
      console.error("Error generating audit preview:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Use specific fields to avoid infinite loops from object reference changes
  const title = watchedValues.title || ""
  const client = watchedValues.client || ""
  const date = watchedValues.date || ""
  const content = watchedValues.content || ""

  React.useEffect(() => {
    if (showPreview && activeTab === "audit-report" && content) {
      // Debounce to avoid excessive API calls
      const timeoutId = setTimeout(() => {
        generatePreview({ title, client, date, content })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [showPreview, activeTab, title, client, date, content, generatePreview])

  return { previewHtml, isLoading, generatePreview }
}
