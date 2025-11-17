import { NextResponse } from "next/server";

const PASSWORD = "jean-linguiça";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (password !== PASSWORD) {
      return NextResponse.json({ ok: false, error: "Senha incorreta" }, { status: 401 });
    }

    const res = NextResponse.redirect(new URL("/player", req.url), { status: 303 });
    res.cookies.set("player_auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",                 // <-- cookie visível no /player
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida" }, { status: 400 });
  }
}
