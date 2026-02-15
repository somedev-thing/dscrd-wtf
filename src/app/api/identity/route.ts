import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import Profile from "@/lib/models/Profile"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await dbConnect()
    const profile = await Profile.findOne({ userId: session.user.id })
    return NextResponse.json(profile)
}

export async function PATCH(req: Request) {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { bio, themeConfig } = body

    await dbConnect()
    
    const updateData: any = {}
    if (bio !== undefined) updateData.bio = bio
    if (themeConfig) {
        updateData['themeConfig.color'] = themeConfig.color
        updateData['themeConfig.mode'] = themeConfig.mode
    }

    const profile = await Profile.findOneAndUpdate(
        { userId: session.user.id },
        { $set: updateData },
        { new: true }
    )

    return NextResponse.json(profile)
}
