export default function Privacy() {
  return (
    <main className="pt-40 pb-24 px-6 min-h-screen max-w-3xl mx-auto font-body text-gray-400">
      <h1 className="text-4xl font-black mb-8 text-white font-sans">Privacy Policy</h1>
      
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. What we collect.</h2>
      <ul className="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Discord ID:</strong> Publicly available info (avatar, username, banner).</li>
        <li><strong>Click Counts:</strong> We track how many times your profile is viewed. That's it.</li>
        <li><strong>Payment Info:</strong> Processed by Stripe/LemonSqueezy. We don't see your credit card.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Cookies.</h2>
      <p className="mb-4">
        We use a session cookie to keep you logged in. We don't use tracking cookies to follow you around the internet.
        We don't sell your data to advertisers because we hate them too.
      </p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Right to be forgotten.</h2>
      <p className="mb-4">
        If you want to delete your account, there's a big red button in the settings. Click it, and poof. Gone.
      </p>
    </main>
  )
}
