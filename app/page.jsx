'use client';

import { useEffect, useState } from 'react';
import StickyHeader from './components/StickyHeader';
import ProjectGrid from './components/ProjectGrid';
import { categories, projects } from '../lib/projects';

const trackedSections = ['education', 'projects', 'skills', 'contact'];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSection, setActiveSection] = useState('projects');
  const [heroImageOffset, setHeroImageOffset] = useState(0);
  const avatarLoaderUrl = process.env.NEXT_PUBLIC_AVATAR_LOADER_URL?.trim();

  useEffect(() => {
    const onScroll = () => {
      const sections = trackedSections
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((item) => item.element);

      const current = sections.find((item) => {
        const rect = item.element.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (current) {
        setActiveSection(current.id);
      }

      const offset = Math.min(window.scrollY * 0.12, 26);
      setHeroImageOffset(offset);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll('.scroll-reveal, .scroll-pop'));
    if (!revealTargets.length) return;

    revealTargets.forEach((target, index) => {
      target.style.transitionDelay = `${Math.min((index % 8) * 60, 360)}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <StickyHeader
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeSection={activeSection}
      />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-20 pt-8 md:px-8">
        <section id="home" className="scroll-reveal mb-10 grid scroll-mt-36 gap-6 rounded-airbnb border border-airbnb-light bg-airbnb-white p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-airbnb-primary">Analytics Portfolio</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tightish text-airbnb-dark sm:text-5xl">
              Prateek Naharia
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] text-airbnb-gray">
              Data Science and Analytics professional focused on building decision systems, cloud data products,
              and business-facing dashboards across domains.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/Prateek_Naharia_Resume_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-airbnb border border-airbnb-dark bg-airbnb-dark px-4 py-2 text-[15px] font-medium text-white transition hover:border-airbnb-primary hover:bg-airbnb-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
              >
                View Resume
              </a>
            </div>

            <div className="mt-6 rounded-airbnb border border-airbnb-light bg-airbnb-bg p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-airbnb-primary">Work Experience Highlights</p>
              <div className="mt-3 space-y-3 text-[15px]">
                <div className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-3">
                  <p className="font-semibold text-airbnb-dark">Senior Consultant, EXL</p>
                  <p className="text-airbnb-gray">Feb 2025 - Present • Analytics product delivery, data pipelines, ML, dashboards</p>
                </div>
                <div className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-3">
                  <p className="font-semibold text-airbnb-dark">Data Scientist, OpiAID</p>
                  <p className="text-airbnb-gray">Jan 2024 - Feb 2025 • Wearable data ML and operations intelligence</p>
                </div>
                <div className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-3">
                  <p className="font-semibold text-airbnb-dark">Software Engineer, LTIMindtree</p>
                  <p className="text-airbnb-gray">May 2019 - Dec 2021 • ETL, BI validation, SQL testing automation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-airbnb border border-airbnb-light bg-airbnb-bg">
            <img
              src="/images/Prateek2.JPG"
              alt="Prateek Naharia"
              className="h-full w-full object-cover will-change-transform"
              style={{ transform: `translate3d(0, ${heroImageOffset}px, 0)` }}
            />
          </div>
        </section>

        <section id="education" className="scroll-reveal scroll-mt-36">
          <h2 className="mb-6 text-2xl font-semibold tracking-tightish text-airbnb-dark">Education</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-airbnb-primary">2022 - 2024</p>
              <h3 className="mt-2 text-[15px] font-semibold text-airbnb-dark">Boston University</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">Master's in Business Analytics</p>
            </article>
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-airbnb-primary">2015 - 2019</p>
              <h3 className="mt-2 text-[15px] font-semibold text-airbnb-dark">SRM University</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">B.Tech in Computer / Information Technology</p>
            </article>
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-airbnb-primary">2017</p>
              <h3 className="mt-2 text-[15px] font-semibold text-airbnb-dark">IIT Kharagpur</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">Internship: Computer Systems Networking and Telecommunications</p>
            </article>
          </div>
        </section>

        <section id="projects" className="scroll-reveal mt-16 scroll-mt-36">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tightish text-airbnb-dark">Projects</h2>
            <p className="text-[15px] text-airbnb-gray">Project details and case studies will be expanded next.</p>
          </div>
          <ProjectGrid category={activeCategory} projects={projects} />
        </section>

        <section className="scroll-reveal mt-16">
          <div className="rounded-[32px] border border-airbnb-light bg-gradient-to-br from-[#131313] via-[#1D1D1D] to-[#2B2B2B] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.14)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FFB88C]">AI Avatar Project</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Building a talking portfolio copilot for this site.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72 sm:text-[15px]">
                  The site is now prepared for an external avatar widget so the portfolio can host
                  a live voice experience without moving away from GitHub Pages. The realtime agent,
                  speech pipeline, and talking avatar service will run as a separate deployment.
                </p>
              </div>

              <div className="min-w-[220px] rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">Integration Status</p>
                <p className="mt-3 text-lg font-semibold">
                  {avatarLoaderUrl ? 'Avatar loader configured' : 'Site hook ready'}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {avatarLoaderUrl
                    ? 'The site will load the external avatar widget after hydration.'
                    : 'Set NEXT_PUBLIC_AVATAR_LOADER_URL during build to activate the floating avatar widget.'}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-sm font-semibold">Site Layer</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Static Next.js export on GitHub Pages with an optional external loader script.
                </p>
              </article>
              <article className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-sm font-semibold">Realtime Layer</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Dedicated avatar service for session startup, widget assets, and LiveKit connection orchestration.
                </p>
              </article>
              <article className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-sm font-semibold">Copilot Layer</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Resume-aware GenAI assistant for project walkthroughs, experience Q&amp;A, and recruiter interactions.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-reveal mt-16 scroll-mt-36">
          <h2 className="mb-6 text-2xl font-semibold tracking-tightish text-airbnb-dark">Skills</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5">
              <h3 className="text-[15px] font-semibold text-airbnb-dark">Data Engineering</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">SQL, dbt, Airflow, ETL pipelines, Data Modeling, Data Quality</p>
            </article>
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5">
              <h3 className="text-[15px] font-semibold text-airbnb-dark">Analytics & BI</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">Power BI, Tableau, KPI Design, Reporting Automation, Insights Storytelling</p>
            </article>
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5">
              <h3 className="text-[15px] font-semibold text-airbnb-dark">Data Science & ML</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">Python, ML Modeling, Feature Engineering, Experimentation, Predictive Analytics</p>
            </article>
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5">
              <h3 className="text-[15px] font-semibold text-airbnb-dark">Cloud & Platforms</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">GCP, AWS, BigQuery, Snowflake, Cloud Storage, Orchestration</p>
            </article>
            <article className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-5 lg:col-span-2">
              <h3 className="text-[15px] font-semibold text-airbnb-dark">Certifications</h3>
              <p className="mt-2 text-[15px] text-airbnb-gray">SnowPro Core Certification, CITI Program Certification</p>
            </article>
          </div>
        </section>

        <section id="contact" className="scroll-reveal mt-16 scroll-mt-36">
          <h2 className="mb-6 text-2xl font-semibold tracking-tightish text-airbnb-dark">Contact</h2>
          <div className="scroll-pop rounded-airbnb border border-airbnb-light bg-airbnb-white p-6 text-[15px]">
            <p className="text-airbnb-dark">Email: <a className="underline" href="mailto:nahariap@bu.edu">nahariap@bu.edu</a></p>
            <p className="mt-2 text-airbnb-dark">LinkedIn: <a className="underline" href="https://www.linkedin.com/in/prateeknaharia" target="_blank" rel="noopener noreferrer">linkedin.com/in/prateeknaharia</a></p>
            <p className="mt-2 text-airbnb-dark">GitHub: <a className="underline" href="https://github.com/nahariaprateek" target="_blank" rel="noopener noreferrer">github.com/nahariaprateek</a></p>
            <p className="mt-2 text-airbnb-dark">Resume: <a className="underline" href="/Prateek_Naharia_Resume_2026.pdf" target="_blank" rel="noopener noreferrer">Open PDF</a></p>
          </div>
        </section>
      </main>
    </>
  );
}
