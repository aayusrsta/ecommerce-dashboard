import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort");
  const query = sort ? `?sort=${sort}` : "";

  const res = await fetch(`https://fakestoreapi.com/products${query}`);

  if (!res.ok) {
    return NextResponse.json({ error: `Failed: ${res.status}` }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}