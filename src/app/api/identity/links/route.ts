import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import Link from "@/lib/models/Link"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { title, url, icon } = body

    if (!title || !url) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

    await dbConnect()
    const link = await Link.create({
        userId: session.user.id,
        title,
        url,
        icon: icon || 'link',
        position: 0 // Default to top, logic can be improved later
    })

    return NextResponse.json(link)
}

export async function DELETE(req: Request) {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 })

    await dbConnect()
    await Link.deleteOne({ _id: id, userId: session.user.id })

    return NextResponse.json({ success: true })
}
