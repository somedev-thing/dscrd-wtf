import { signIn } from "@/auth"
import { LogIn } from "lucide-react"

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("discord", { redirectTo: "/dashboard" })
      }}
    >
      <button className="flex items-center gap-2 px-4 py-2 bg-discord hover:bg-discord/80 text-white rounded-full transition-colors text-sm font-bold font-sans">
        <LogIn size={16} />
        Login
      </button>
    </form>
  )
}
