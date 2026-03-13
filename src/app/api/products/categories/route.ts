export const runtime = "edge";

export async function GET() {
  const res = await fetch(`https://fakestoreapi.com/products/categories`);
  if (!res.ok) return Response.json({ error: `Failed: ${res.status}` }, { status: res.status });
  const data = await res.json();
  return Response.json(data);
}