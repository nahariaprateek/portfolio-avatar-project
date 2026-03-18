'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Code2,
  Database,
  Filter,
  Heart,
  Menu,
  Brain,
  Cpu,
  Search
} from 'lucide-react';

const iconByCategory = {
  All: Cpu,
  Analytics: Code2,
  Engineering: Database,
  BI: Cloud,
  ML: Brain
};

const navItems = [
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

export default function StickyHeader({
  categories,
  activeCategory,
  onCategoryChange,
  activeSection
}) {
  const [isCompact, setIsCompact] = useState(false);
  const categoryRefs = useRef({});
  const showCategoryStrip = Array.isArray(categories) && categories.length > 1;

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 120);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const target = categoryRefs.current[activeCategory];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeCategory]);

  const headerHeight = useMemo(() => (isCompact ? 64 : 80), [isCompact]);

  return (
    <div className="sticky top-0 z-40 bg-airbnb-white">
      <motion.header
        animate={{ height: headerHeight }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 md:px-8 ${
          isCompact ? 'shadow-header' : ''
        }`}
      >
        <div className="flex min-w-[160px] items-center gap-2">
          <a
            href="https://www.linkedin.com/in/prateeknaharia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-airbnb-light p-2 text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
          >
            <img src="/icons/linkedin.png" alt="" className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/nahariaprateek"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-airbnb-light p-2 text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
          >
            <img src="/icons/github.png" alt="" className="h-4 w-4" />
          </a>
          <a href="#home" className="text-sm font-semibold tracking-tightish text-airbnb-dark">
            Prateek Naharia
          </a>
        </div>

        <nav
          aria-label="Search navigation"
          className="hidden h-12 flex-1 items-center justify-center md:flex"
        >
          <div className="flex items-center rounded-airbnbLg border border-airbnb-light bg-airbnb-white px-1 py-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-airbnbLg px-4 py-2 text-sm font-medium text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20 ${
                  activeSection === item.id ? 'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-airbnb-dark' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Prateek_Naharia_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-airbnbLg px-4 py-2 text-sm font-medium text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
            >
              Resume
            </a>
            <div className="ml-1 flex items-center gap-1 border-l border-airbnb-light pl-2">
              <button
                aria-label="Filters"
                className="rounded-full p-2 text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
              >
                <Filter className="h-4 w-4" />
              </button>
              <button
                aria-label="Favorites"
                className="rounded-full p-2 text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </nav>

        <div className="flex min-w-[120px] items-center justify-end gap-2">
          <button
            aria-label="Search"
            className="rounded-full border border-airbnb-light p-2 text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Menu"
            className="rounded-full border border-airbnb-light p-2 text-airbnb-dark transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.header>

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-3 md:hidden md:px-8">
        <button className="w-full rounded-airbnbLg border border-airbnb-light bg-airbnb-white px-4 py-3 text-left text-sm text-airbnb-gray transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20">
          Search projects
        </button>
      </div>

      {showCategoryStrip ? (
        <div className="relative border-y border-airbnb-light bg-airbnb-white">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-airbnb-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-airbnb-white to-transparent" />

          <div
            className="no-scrollbar mx-auto flex w-full max-w-[1280px] gap-6 overflow-x-auto px-4 py-3 md:px-8"
            role="tablist"
            aria-label="Tech categories"
          >
            {categories.map((category) => {
              const Icon = iconByCategory[category.id] || Cpu;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  ref={(node) => {
                    if (node) categoryRefs.current[category.id] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(category.id)}
                  className={`relative shrink-0 rounded-airbnb px-3 py-2 text-left transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20 ${
                    isActive ? 'text-airbnb-dark' : 'text-airbnb-gray'
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs font-medium">
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </span>
                  {isActive ? <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-airbnb-dark" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
