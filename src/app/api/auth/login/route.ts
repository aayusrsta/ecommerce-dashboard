export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`https://fakestoreapi.com/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return Response.json({ error: "Invalid credentials" }, { status: res.status });
  const data = await res.json();
  return Response.json(data);
}