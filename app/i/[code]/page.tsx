export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-[480px] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-display text-2xl font-semibold text-ink">CareMitra</p>
      <p className="mt-4 text-[17px] text-ink">
        Someone who cares about you invited you to try CareMitra. We&apos;ll call you soon.
      </p>
      <p className="mt-8 text-[15px] font-medium text-ink-muted">Your invite code</p>
      <p className="mt-1 font-display text-3xl font-semibold tracking-wide text-accent">
        {code}
      </p>
    </main>
  );
}
