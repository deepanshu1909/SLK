import { FadeIn } from "./motion-bits";
import { teamMembers, CONTACT_EMAIL } from "@/lib/site-content";

export function TeamSection() {
  return (
    <section id="team" className="zk-section bg-[var(--background)]">
      <div className="zk-container">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="zk-kicker mb-4">Who’s behind Zarklo</div>
            <h2 className="zk-h2">
              Built for owners handing over <span className="italic">real access.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Connecting Google Business Profile and calendars is a trust decision. Here’s
              who you’ll work with — and how to reach us directly.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-3xl gap-4">
          {teamMembers.map((member) => (
            <FadeIn key={member.name}>
              <article className="zk-card-white flex flex-col gap-5 p-6 sm:flex-row sm:items-start md:p-8">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[var(--brand-soft)] font-display text-xl text-[var(--heading)]">
                  {member.initials}
                </div>
                <div>
                  <h3 className="zk-h3">{member.name}</h3>
                  <p className="mt-1 text-sm text-[var(--gold)]">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-ink)]">
                    {member.bio}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="zk-link-gold mt-4 inline-flex"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
