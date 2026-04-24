import { NextRequest, NextResponse } from "next/server";

/** Base URL da API Express (sem barra final). Não pode ser a mesma porta do Next. */
function backendBase(): string {
  return (process.env.MATRICULAS_API_ORIGIN ?? "http://127.0.0.1:3001").replace(
    /\/$/,
    "",
  );
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const joined = path.join("/");
  const target = `${backendBase()}/api/${joined}${request.nextUrl.search}`;

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      cache: "no-store",
      headers: {
        accept: request.headers.get("accept") ?? "application/json",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        error: "Upstream API unreachable",
        detail: msg,
        target,
        hint:
          "Defina MATRICULAS_API_ORIGIN em matriculas-react/.env.local (ex.: http://127.0.0.1:3001) e suba a Express nessa porta; Next e API não podem usar a mesma porta.",
      },
      { status: 502 },
    );
  }

  const contentType =
    upstream.headers.get("content-type") ?? "application/json; charset=utf-8";
  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    status: upstream.status,
    headers: { "content-type": contentType },
  });
}
