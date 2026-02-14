import dbConnect from "@/lib/db"
import Link from "@/lib/models/Link"

export async function getLinksByUserId(userId: string) {
  await dbConnect()
  const links = await Link.find({ userId }).sort({ position: 1 }).lean()
  return links.map((l: any) => ({ ...l, id: l._id.toString() }))
}
