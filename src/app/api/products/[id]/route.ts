export const runtime = "edge";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return Response.json({ error: `Failed: ${res.status}` }, { status: res.status });
  const data = await res.json();
  return Response.json(data);
}