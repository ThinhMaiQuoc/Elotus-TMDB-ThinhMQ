export async function apiGet<T>(url: string): Promise<T> {
  const r = await fetch(url, { cache: 'no-store' })
  if (!r.ok) {
    const text = await r.text().catch(() => '')
    throw new Error(text || `Request failed: ${r.status}`)
  }
  return r.json() as Promise<T>
}
