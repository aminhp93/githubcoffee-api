export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-zinc-950 text-zinc-100 font-mono">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-emerald-500">GitHub Coffee API</h1>
          <p className="text-zinc-400">
            A unified mock server for ESM, PMP, and Foresight platforms.
            Built with Next.js App Router for high-performance JSON delivery.
          </p>
        </header>

        <section className="space-y-4 border border-zinc-800 p-6 rounded-lg bg-zinc-900/50">
          <h2 className="text-xl font-semibold text-emerald-400">REST Endpoints</h2>
          <ul className="space-y-4">
            <li className="space-y-1">
              <code className="bg-zinc-800 px-2 py-1 rounded">GET /api/esm</code>
              <p className="text-sm text-zinc-500">Energy Storage Management - Stations & Metrics</p>
            </li>
            <li className="space-y-1">
              <code className="bg-zinc-800 px-2 py-1 rounded">GET /api/pmp</code>
              <p className="text-sm text-zinc-500">Piscada Management Platform - Devices & Alarms</p>
            </li>
            <li className="space-y-1">
              <code className="bg-zinc-800 px-2 py-1 rounded">GET /api/foresight</code>
              <p className="text-sm text-zinc-500">Facilities Management - Portfolio & Building Health</p>
            </li>
          </ul>
        </section>

        <section className="space-y-4 border border-zinc-800 p-6 rounded-lg bg-emerald-950/10 border-emerald-900/50">
          <h2 className="text-xl font-semibold text-emerald-400">GraphQL Playground</h2>
          <p className="text-zinc-400 text-sm">
            For complex dynamic requests, use the unified GraphQL endpoint.
          </p>
          <div className="pt-2">
            <a 
              href="/api/graphql" 
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-md transition-colors"
            >
              Open GraphQL Explorer
            </a>
          </div>
        </section>

        <footer className="pt-8 text-xs text-zinc-600 border-t border-zinc-900">
          <p>Running on Next.js 15.1.4 (latest) • App Router • TypeScript</p>
        </footer>
      </div>
    </main>
  );
}
