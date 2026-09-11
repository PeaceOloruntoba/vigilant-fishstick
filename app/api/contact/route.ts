import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  serviceType?: string;
  projectVision?: string;
  // Honeypot field — real visitors never fill this in. Bots usually do.
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { fullName, email, serviceType, projectVision, company } = body;

  // Honeypot tripped — pretend success so bots don't learn to adapt, but
  // don't actually send anything.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!fullName?.trim() || !email?.trim() || !serviceType?.trim() || !projectVision?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM_NAME,
    SMTP_FROM_EMAIL,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM_EMAIL) {
    console.error("Contact form: missing SMTP environment variables.");
    return NextResponse.json(
      { ok: false, error: "Email is not configured on the server yet." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE !== "false", // true for port 465, false for 587/STARTTLS
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const recipient = CONTACT_TO_EMAIL || SMTP_FROM_EMAIL;

  try {
    await transporter.sendMail({
      from: `"${SMTP_FROM_NAME || "Landfairy Website"}" <${SMTP_FROM_EMAIL}>`,
      to: recipient,
      replyTo: email.trim(),
      subject: `New quote request from ${fullName.trim()}`,
      text: [
        `Name: ${fullName.trim()}`,
        `Email: ${email.trim()}`,
        `Service type: ${serviceType.trim()}`,
        "",
        "Project vision:",
        projectVision.trim(),
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #022c22;">
          <p><strong>Name:</strong> ${escapeHtml(fullName.trim())}</p>
          <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
          <p><strong>Service type:</strong> ${escapeHtml(serviceType.trim())}</p>
          <p><strong>Project vision:</strong></p>
          <p>${escapeHtml(projectVision.trim()).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't send your message. Please try again shortly." },
      { status: 502 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
