'use client';

const avatarLoaderUrl = process.env.NEXT_PUBLIC_AVATAR_LOADER_URL?.trim() || '';

const checklist = [
  'Start the avatar backend locally on port 8001.',
  'Run the portfolio with the avatar loader env variable enabled.',
  'Open this page and verify the floating avatar button appears.',
  'Click the avatar button and confirm the session reaches the ready state.',
  'Ask questions about projects, skills, and experience in the widget.',
  'Minimize, expand, mute, and end the session to verify loader controls.'
];

export default function AvatarLabPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1100px] px-4 py-10 md:px-8">
      <section className="rounded-[32px] border border-airbnb-light bg-airbnb-white p-6 shadow-[0_24px_50px_rgba(0,0,0,0.06)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-airbnb-primary">Avatar Lab</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tightish text-airbnb-dark">
          Local testing environment for the portfolio avatar.
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-airbnb-gray">
          This route is the controlled test surface for the avatar integration. The loader is injected
          globally when the public loader URL is configured, so you can use this page to validate the
          full site-to-widget flow before deploying to GitHub Pages and a cloud backend.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-airbnb-light bg-airbnb-white p-6">
          <p className="text-sm font-semibold text-airbnb-dark">Current loader configuration</p>
          <div className="mt-4 rounded-[20px] border border-airbnb-light bg-airbnb-bg p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-airbnb-primary">NEXT_PUBLIC_AVATAR_LOADER_URL</p>
            <p className="mt-3 break-all font-mono text-sm text-airbnb-dark">
              {avatarLoaderUrl || 'Not set'}
            </p>
          </div>

          <div className="mt-5 rounded-[20px] border border-airbnb-light bg-[#FFF8F1] p-4 text-[15px] text-airbnb-dark">
            {avatarLoaderUrl
              ? 'The loader URL is configured. If the avatar backend is running, you should see the floating launcher on this page.'
              : 'The loader URL is not configured. Use `npm run dev:site:avatar` to run the site against the local avatar service.'}
          </div>
        </article>

        <article className="rounded-[28px] border border-airbnb-light bg-airbnb-white p-6">
          <p className="text-sm font-semibold text-airbnb-dark">Manual test checklist</p>
          <div className="mt-4 space-y-3">
            {checklist.map((item, index) => (
              <div key={item} className="rounded-[20px] border border-airbnb-light bg-airbnb-bg p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-airbnb-primary">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-[15px] leading-6 text-airbnb-dark">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
