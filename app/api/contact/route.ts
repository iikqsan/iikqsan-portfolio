import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email, subject, message } = await req.json();

        if (!email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const { error } = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL!,
            to: process.env.CONTACT_TO_EMAIL!,
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            html: `
                <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px;">
                    <p style="color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Message from Portfolio</p>
                    <hr style="border: none; border-top: 1px solid #E5E5E0; margin: 16px 0;" />
                    <p><strong>From:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: none; border-top: 1px solid #E5E5E0; margin: 16px 0;" />
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
