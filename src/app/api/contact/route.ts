import { NextResponse } from "next/server";
import { Resend } from "resend";

/* Lazily initialise Resend so the module can be imported at build time
   (e.g. during Next.js page-data collection) without requiring the API key
   to be present in the build environment. The key is only needed at runtime
   when a POST request is actually handled. */
let _resend: Resend | null = null;
const getResend = () => {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
};

const FROM_ADDRESS = "Performance Peak Enquiries <enquiry@updates.pp-worldwide.com>";
const TO_ADDRESS = "lee@pp-worldwide.com";

const sanitize = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

const formatMultiline = (value: string) => sanitize(value).replace(/\n/g, "<br />");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name = "",
      email = "",
      message = "",
      company = "",
      phone = "",
      honeypot = "",
    } = body ?? {};

    if (honeypot) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedMessage = String(message).trim();
    const trimmedCompany = String(company).trim();
    const trimmedPhone = String(phone).trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (trimmedMessage.length < 20) {
      return NextResponse.json({ error: "Message must be at least 20 characters." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const subject = `New enquiry from ${trimmedName}`;
    const htmlContent = `
      <h2>New contact enquiry</h2>
      <p><strong>Name:</strong> ${sanitize(trimmedName)}</p>
      <p><strong>Email:</strong> ${sanitize(trimmedEmail)}</p>
      ${trimmedCompany ? `<p><strong>Company:</strong> ${sanitize(trimmedCompany)}</p>` : ""}
      ${trimmedPhone ? `<p><strong>Phone:</strong> ${sanitize(trimmedPhone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${formatMultiline(trimmedMessage)}</p>
    `;

    const textLines = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
    ];

    if (trimmedCompany) {
      textLines.push(`Company: ${trimmedCompany}`);
    }

    if (trimmedPhone) {
      textLines.push(`Phone: ${trimmedPhone}`);
    }

    const textContent = `New contact enquiry\n\n${textLines.join("\n")}\n\nMessage:\n${trimmedMessage}`;

    await getResend().emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject,
      html: htmlContent,
      text: textContent,
      reply_to: trimmedEmail,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email failed", error);
    return NextResponse.json({ error: "Unable to send your enquiry right now. Please try again soon." }, { status: 500 });
  }
}
