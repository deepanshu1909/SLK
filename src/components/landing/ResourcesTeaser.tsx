import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./motion-bits";
import { blogPosts } from "@/lib/site-content";

export function ResourcesTeaser() {
  return (
    <section id="resources" className="zk-section bg-[var(--cream)]">
      <div className="zk-container">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="zk-kicker mb-4">Resources</div>
              <h2 className="zk-h2">
                Practical guides for <span className="italic">owners.</span>
              </h2>
              <p className="mt-4 zk-muted">
                Short, useful articles on local ranking, no-shows, and retention — written
                for salons, clinics, and labs.
              </p>
            </div>
            <Link to="/resources" className="zk-btn-secondary shrink-0">
              View all resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <Link
                to={`/resources/${post.slug}`}
                className="zk-card-white flex h-full flex-col p-5 transition hover:border-[var(--gold)]"
              >
                <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--gold)]">
                  {post.vertical}
                </div>
                <h3 className="mt-3 text-base font-medium leading-snug text-[var(--heading)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--muted-ink)]">
                  {post.excerpt}
                </p>
                <span className="mt-4 text-xs text-[var(--muted-ink)]">
                  {post.readMins} min read
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
