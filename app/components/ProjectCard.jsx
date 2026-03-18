'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Star,
  BarChart3,
  Workflow,
  Gauge,
  BrainCircuit,
  Database,
  ShieldCheck,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';

const iconMap = {
  chart: BarChart3,
  workflow: Workflow,
  gauge: Gauge,
  brain: BrainCircuit,
  database: Database,
  shield: ShieldCheck,
  layout: LayoutDashboard,
  spark: Sparkles
};

export default function ProjectCard({ project }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const prevImage = () => {
    setImageIndex((current) => (current === 0 ? project.images.length - 1 : current - 1));
  };

  const nextImage = () => {
    setImageIndex((current) => (current + 1) % project.images.length);
  };

  const ProjectIcon = iconMap[project.icon] || BarChart3;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col gap-3"
    >
      <div className="relative overflow-hidden rounded-airbnb border border-airbnb-light bg-airbnb-bg aspect-square">
        {!loaded && <div className="absolute inset-0 shimmer" aria-hidden="true" />}
        <img
          src={project.images[imageIndex]}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          onLoad={() => setLoaded(true)}
        />

        <button
          aria-label={liked ? 'Remove favorite' : 'Add favorite'}
          onClick={() => setLiked((current) => !current)}
          className="absolute right-3 top-3 rounded-full border border-airbnb-light bg-white/95 p-2 transition hover:bg-airbnb-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
        >
          <Heart
            className="h-4 w-4"
            fill={liked ? '#FF385C' : 'transparent'}
            color={liked ? '#FF385C' : '#222222'}
            strokeWidth={1.8}
          />
        </button>

        <button
          aria-label="Previous image"
          onClick={prevImage}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-airbnb-light bg-white/95 px-2 py-1 text-sm text-airbnb-dark transition group-hover:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
        >
          ‹
        </button>
        <button
          aria-label="Next image"
          onClick={nextImage}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-airbnb-light bg-white/95 px-2 py-1 text-sm text-airbnb-dark transition group-hover:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb-dark/20"
        >
          ›
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="inline-flex items-center gap-2 text-[15px] font-semibold text-airbnb-dark tracking-tightish">
            <ProjectIcon className="h-4 w-4 text-airbnb-gray" />
            {project.title}
          </h3>
          <span className="inline-flex items-center gap-1 text-[14px] text-airbnb-dark">
            <Star className="h-3.5 w-3.5 fill-airbnb-dark text-airbnb-dark" />
            {project.rating}
          </span>
        </div>
        <p className="text-[15px] text-airbnb-gray">{project.subtitle}</p>
        <p className="text-[15px] text-airbnb-gray">{project.timeline}</p>
        <p className="text-[15px] font-semibold text-airbnb-dark underline underline-offset-2">View case study</p>
      </div>
    </motion.article>
  );
}
