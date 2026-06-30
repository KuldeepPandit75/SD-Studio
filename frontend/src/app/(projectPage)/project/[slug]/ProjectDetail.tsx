"use client";

import Link from "next/link";
import { PROJECTS } from "@/src/components/Services/data";
import "./project-detail.css";

interface ProjectDetailProps {
  slug: string;
}

export default function ProjectDetail({ slug }: ProjectDetailProps) {
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    return (
      <div className="pd-page" style={{ padding: "120px 64px" }}>
        <p>Project not found.</p>
        <Link href="/projects" style={{ color: "var(--pd-accent)" }}>
          ← Back to Projects
        </Link>
      </div>
    );
  }

  // Next project (wraps around)
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const projectName = project.name.replace("\\n", " ");
  const nextProjectName = nextProject.name.replace("\\n", " ");

  const statusClass =
    project.status === "Completed" ? "completed" : "ongoing";

  return (
    <div className="pd-page">
      {/* ── Back Navigation ────────────────────────────────────── */}
      <Link href="/projects" className="pd-back">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Projects
      </Link>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="pd-hero">
        <img
          src={project.image}
          alt={projectName}
          className="pd-hero__img"
        />
        <div className="pd-hero__overlay" />
        <div className="pd-hero__content">
          <h1 className="pd-hero__name">
            {project.name.replace("\\n", "\n")}
          </h1>
        </div>
      </section>

      {/* ── Metadata Bar ───────────────────────────────────────── */}
      <div className="pd-meta-bar">
        <span className="pd-meta-bar__item">{project.year}</span>
        <span className="pd-meta-bar__sep" />
        <span className="pd-meta-bar__item">{project.location}</span>
        <span className="pd-meta-bar__sep" />
        <span className="pd-meta-bar__item">{project.type}</span>
        <span className="pd-meta-bar__sep" />
        <span className="pd-meta-bar__item">{project.size}</span>
        <span className="pd-meta-bar__sep" />
        <span className="pd-meta-bar__item pd-meta-bar__status">
          <span
            className={`pd-meta-bar__status-dot pd-meta-bar__status-dot--${statusClass}`}
          />
          {project.status}
        </span>
      </div>

      {/* ── Description ────────────────────────────────────────── */}
      <section className="pd-description">
        <div>
          <h2 className="pd-description__heading">About This Project</h2>
        </div>
        <div>
          <p className="pd-description__text">{project.description}</p>
          <div className="pd-description__scope">
            {project.scope.map((s) => (
              <span key={s} className="pd-description__scope-tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────────── */}
      {/* <section className="pd-gallery">
        <p className="pd-gallery__label">Project Gallery</p>
        <div className="pd-gallery__grid">
          {project.gallery.map((img, i) => (
            <div key={i} className="pd-gallery__item">
              <img
                src={img}
                alt={`${projectName} — View ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </section> */}

      {/* ── Design Highlights ──────────────────────────────────── */}
      <section className="pd-highlights">
        <div>
          <h2 className="pd-highlights__heading">Design Highlights</h2>
        </div>
        <ul className="pd-highlights__list">
          {project.highlights.map((h, i) => (
            <li key={i} className="pd-highlights__item">
              <span className="pd-highlights__number" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Client Review ──────────────────────────────────────── */}
      <section className="pd-review">
        <div className="pd-review__rule" />
        <blockquote className="pd-review__quote">
          &ldquo;{project.client.quote}&rdquo;
        </blockquote>
        <p className="pd-review__attribution">
          — {project.client.name}
        </p>
      </section>

      {/* ── Next Project ───────────────────────────────────────── */}
      <Link
        href={`/project/${nextProject.slug}`}
        className="pd-next"
      >
        <img
          src={nextProject.image}
          alt={nextProjectName}
          className="pd-next__img"
        />
        <div className="pd-next__overlay" />
        <div className="pd-next__content">
          <span className="pd-next__label">Next Project</span>
          <span className="pd-next__name">
            {nextProjectName}
            <span className="pd-next__arrow">→</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
