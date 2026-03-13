import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort");
  const query = sort ? `?sort=${sort}` : "";

  const res = await fetch(`https://fakestoreapi.com/products${query}`);
  const data = await res.json();

  return NextResponse.json(data);
}