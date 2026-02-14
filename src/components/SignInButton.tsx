
import { signIn } from "@/auth"
import { SignIn } from "@phosphor-icons/react/dist/ssr"

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("discord", { redirectTo: "/dashboard" })
      }}
    >
      <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded-full bg-electric text-white font-bold text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,114,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] font-sans">
        <SignIn size={16} weight="bold" />
        <span>Sign In</span>
      </button>
    </form>
  )
}
