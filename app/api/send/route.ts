import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type SendBody = {
  apiKey?: string;
  from?: string;
  to?: string;
  subject?: string;
  html?: string;
  text?: string;
  replyTo?: string;
};

// Like /api/domains, this route never stores the API key — it's read from
// the request, used to construct a one-off Resend client, and discarded
// once the response is sent.
export async function POST(req: NextRequest) {
  let body: SendBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { apiKey, from, to, subject, html, text, replyTo } = body;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing Resend API key." }, { status: 400 });
  }
  if (!from || !to || !subject) {
    return NextResponse.json(
      { error: "From, To and Subject are all required." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html: html || "<p></p>",
      text: text || "",
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Resend could not send that email." },
        { status: 400 }
      );
    }

    return NextResponse.json({ id: data?.id });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Resend. Check your connection and try again." },
      { status: 502 }
    );
  }
}
