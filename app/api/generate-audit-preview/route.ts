import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateAuditReportHtml } from "@/lib/markdown-processor"

const auditPreviewSchema = z.object({
  title: z.string(),
  client: z.string(),
  date: z.string().optional(),
  content: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = auditPreviewSchema.parse(body)
    
    const html = generateAuditReportHtml(data)
    
    return NextResponse.json({ success: true, html })
  } catch (error) {
    console.error("Error generating audit preview:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to generate preview" 
      },
      { status: 500 }
    )
  }
}
