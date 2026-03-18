'use client';

import Script from 'next/script';

const loaderUrl = process.env.NEXT_PUBLIC_AVATAR_LOADER_URL?.trim();

export default function AvatarWidgetEmbed() {
  if (!loaderUrl) {
    return null;
  }

  return (
    <Script
      src={loaderUrl}
      strategy="afterInteractive"
      data-avatar-loader="prateek-site"
    />
  );
}
