import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_xxx");

const CONTACTS_EMAIL = "Intelligence Repo <contacts@intelligencerepo.ai>";
const ADMIN_EMAIL = "support@intelligencerepo.ai";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Determine inquiry type and route accordingly
    let routingNote = "";
    let priority = "normal";

    if (subject.toLowerCase().includes("sales") || subject.toLowerCase().includes("booking") || subject.toLowerCase().includes("meeting")) {
      routingNote = "🚨 SALES/METTING INQUIRY - Priority Response Needed";
      priority = "high";
    } else if (subject.toLowerCase().includes("support")) {
      routingNote = "📧 SUPPORT REQUEST - Standard Response";
      priority = "normal";
    } else if (subject.toLowerCase().includes("custom") || subject.toLowerCase().includes("development")) {
      routingNote = "⚡ CUSTOM DEVELOPMENT Inquiry - High Value";
      priority = "high";
    }

    // Send notification to admin
    const adminEmailContent = `
${routingNote}

New Contact Form Submission
==========================

Name: ${name}
Email: ${email}
Subject: ${subject}
Priority: ${priority}

Message:
---------
${message}

==========================
Received at: ${new Date().toISOString()}
Reply to: ${email}
    `.trim();

    // Send to admin
    await resend.emails.send({
      from: CONTACTS_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[${priority.toUpperCase()}] ${subject} - From ${name}`,
      text: adminEmailContent,
    });

    // Send confirmation to user
    const userEmailContent = `
Hi ${name},

Thank you for reaching out to Intelligence Repo!

We've received your message and will get back to you within 24 hours.

Your submission:
---------------
Subject: ${subject}

We'll respond to: ${email}

Best regards,
The Intelligence Repo Team
    `.trim();

    await resend.emails.send({
      from: CONTACTS_EMAIL,
      to: email,
      subject: "We received your message - Intelligence Repo",
      text: userEmailContent,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent! We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}