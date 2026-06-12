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
  ];

  return (
    <section className="flex flex-wrap gap-4 justify-center items-center py-4" aria-label="Social Links">
      {links.map((link) => (
        <SocialLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
      ))}
    </section>
  );
}
