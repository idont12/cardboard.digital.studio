/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Youtube, Instagram, Gamepad2 } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  key?: string | number;
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full border border-white text-white hover:bg-white hover:text-blue-600 flex items-center justify-center transition-all duration-200 outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-blue-600"
    >
      {icon}
    </a>
  );
}

export default function SocialLinks() {
  const links = [
    {
      href: 'https://www.tiktok.com/@cardboard.digital.studio',
      label: 'Follow Cardboard Digital on TikTok',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      href: 'https://www.instagram.com/cardboard.digital.studio/',
      label: 'Follow Cardboard Digital on Instagram',
      icon: <Instagram className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
      href: 'https://www.youtube.com/@CardboardDigitalStudio',
      label: 'Subscribe to Cardboard Digital on YouTube',
      icon: <Youtube className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
      href: 'https://yardenz.itch.io/',
      label: 'View our Itch.io Game Profile',
      icon: <Gamepad2 className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
  href: 'https://bsky.app/profile/cardboarddigitalst.bsky.social',
  label: 'Follow Cardboard Digital on Bluesky',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 530"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M135 44C184 81 236 157 300 287C364 157 416 81 465 44C500 18 557 -2 557 63C557 76 549 168 544 183C527 237 465 251 410 241C506 257 530 312 477 367C376 472 332 341 320 307C318 302 317 300 300 300C283 300 282 302 280 307C268 341 224 472 123 367C70 312 94 257 190 241C135 251 73 237 56 183C51 168 43 76 43 63C43 -2 100 18 135 44Z"/>
    </svg>
  ),
},
{
  href: 'https://x.com/YardenZilber',
  label: 'Follow Cardboard Digital on X',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.3-8.4L1 2h6.2l4.3 5.7L18.9 2zm-1.1 18h1.7L6.2 3.9H4.4L17.8 20z" />
    </svg>
  ),
},
  ];

  return (
    <section className="flex flex-wrap gap-4 justify-center items-center py-4" aria-label="Social Links">
      {links.map((link) => (
        <SocialLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
      ))}
    </section>
  );
}
