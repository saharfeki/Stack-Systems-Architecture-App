import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base px-6 py-10 text-copy-primary">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-surface-border bg-surface">
        <div className="grid min-h-[640px] grid-cols-1 lg:grid-cols-[1.1fr_1.4fr]">
          <section className="flex flex-col justify-center border-b border-surface-border bg-elevated px-8 py-10 lg:border-b-0 lg:border-r">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-surface-border bg-subtle text-sm font-semibold text-brand">
                G
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-copy-muted">
                Ghost AI
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-copy-muted">
                  System design workspace
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-copy-primary">
                  Design and refine architecture with your team.
                </h1>
              </div>

              <ul className="space-y-3 text-sm text-copy-secondary">
                <li>• Shared real-time canvas for architecture planning</li>
                <li>• AI-assisted generation from plain-language prompts</li>
                <li>• Markdown specifications generated from the live graph</li>
              </ul>
            </div>
          </section>

          <section className="flex items-center justify-center px-4 py-8 sm:px-8">
            <div className="w-full max-w-md">
              <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
