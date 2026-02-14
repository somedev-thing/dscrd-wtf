import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  await signIn("discord")
  return null
}
