export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Trend API</h1>
          <p className="text-zinc-400 text-lg">
            Real-time trend velocity data for TikTok, Reddit, and X.
            What agencies pay $500/mo for — starting free.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 space-y-3">
          <p className="text-zinc-500 text-sm font-mono">// Try it now</p>
          <pre className="text-green-400 text-sm font-mono overflow-x-auto whitespace-pre-wrap">{`curl "https://trend-api-one.vercel.app/api/v1/trends?platform=tiktok&category=finance" \\
  -H "x-api-key: YOUR_KEY"`}</pre>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { plan: 'Free', price: '$0', requests: '100 req/mo' },
            { plan: 'Pro', price: '$29/mo', requests: '10,000 req/mo' },
            { plan: 'Enterprise', price: '$99/mo', requests: '100,000 req/mo' },
          ].map((tier) => (
            <div key={tier.plan} className="bg-zinc-900 rounded-lg p-4 space-y-1">
              <p className="font-bold">{tier.plan}</p>
              <p className="text-2xl font-bold text-white">{tier.price}</p>
              <p className="text-zinc-500 text-sm">{tier.requests}</p>
            </div>
          ))}
        </div>

        <p className="text-zinc-600 text-sm text-center">
          Get your API key → email coming soon
        </p>
      </div>
    </main>
  )
}
