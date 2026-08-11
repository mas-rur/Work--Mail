import { NextRequest, NextResponse } from "next/server";

// This route is a thin, stateless relay: it takes the caller's own Resend
// API key, asks Resend which domains are on the account, and returns the
// list. The key is read from the request body and used for exactly one
// outbound call — it is never logged, cached, or written to disk.
export async function POST(req: NextRequest) {
  let body: { apiKey?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const apiKey = body.apiKey?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Resend API key." }, { status: 400 });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await resendRes.json().catch(() => null);

    if (!resendRes.ok) {
      return NextResponse.json(
        {
          error:
            (data && (data.message || data.error)) ||
            "Resend rejected that API key.",
        },
        { status: resendRes.status }
      );
    }

    const domains = Array.isArray(data?.data)
      ? data.data.map((d: { name: string; status: string }) => ({
          name: d.name,
          status: d.status,
        }))
      : [];

    return NextResponse.json({ domains });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Resend. Check your connection and try again." },
      { status: 502 }
    );
  }
}
