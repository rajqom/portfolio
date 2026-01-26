import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import puppeteer from "puppeteer"
import { generateAuditReportHtml } from "@/lib/markdown-processor"

const auditPdfSchema = z.object({
  title: z.string(),
  client: z.string(),
  date: z.string().optional(),
  content: z.string(),
})

export async function POST(request: NextRequest) {
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null
  
  try {
    const body = await request.json()
    const data = auditPdfSchema.parse(body)
    
    const html = generateAuditReportHtml(data)
    
    // Generate PDF using Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    })
    
    await browser.close()
    browser = null
    
    // Sanitize filename
    const sanitizedTitle = data.title.replace(/[^a-z0-9]/gi, '_')
    
    // Return PDF as download
    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${sanitizedTitle}.pdf"`,
        'Content-Length': pdf.length.toString(),
      },
    })
  } catch (error) {
    // Ensure browser is closed even on error
    if (browser) {
      try {
        await browser.close()
      } catch (closeError) {
        console.error("Error closing browser:", closeError)
      }
    }
    
    console.error("Error generating audit PDF:", error)
    
    // Return JSON error response
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to generate PDF" 
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
