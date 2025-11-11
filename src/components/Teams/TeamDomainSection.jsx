import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MemberCard from "./MemberCard";
import FogLayer from "./FogLayer";

gsap.registerPlugin(ScrollTrigger);

export default function TeamDomainSection({ domain, texture, lead, coLead }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const inkMaskRef = useRef(null);
  const fogContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const inkMask = inkMaskRef.current;

    if (!section || !title) return;

    // Set initial states
    gsap.set(section, { opacity: 0, y: 100 });
    gsap.set(title, { opacity: 0, y: 50, scale: 0.95 });
    if (inkMask) {
      gsap.set(inkMask, { clipPath: "inset(100% 0 0 0)" });
    }

    // Section reveal animation with ink effect
    // Main section reveal using fromTo as specified
    gsap.fromTo(
      section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Ink reveal mask animation (GSAP scroll ink effect)
    if (inkMask) {
      gsap.to(inkMask, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Title animation with brushstroke effect
    gsap.to(
      title,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Card animations
    const cards = section.querySelectorAll(".member-card");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Scroll-based parallax for background texture
    if (texture) {
      const bgElement = section.querySelector(".domain-section-bg");
      if (bgElement) {
        gsap.to(bgElement, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    // Removed y transform to prevent overlap - only subtle scale for focus
    // Camera lock effect is now handled by ScrollCameraController

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [texture]);

  return (
    <section ref={sectionRef} className="team-domain-section">
      {/* Background texture */}
      {texture && (
        <div
          className="domain-section-bg"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Fog layer for this section */}
      <div ref={fogContainerRef} className="domain-fog-container">
        <FogLayer />
      </div>

      {/* Ink reveal mask */}
      <div ref={inkMaskRef} className="domain-ink-mask">
        <div className="domain-content">
          {/* Section title */}
          <div ref={titleRef} className="domain-title">
            <h2>{domain}</h2>
          </div>

          {/* Member cards */}
          <div className="domain-cards-container">
            {lead && (
              <MemberCard
                member={{
                  name: lead.name,
                  role: lead.role || "Lead",
                  image: lead.image,
                  tagline: lead.tagline,
                }}
                className="domain-lead-card"
              />
            )}
            {coLead && (
              <MemberCard
                member={{
                  name: coLead.name,
                  role: coLead.role || "Co-Lead",
                  image: coLead.image,
                  tagline: coLead.tagline,
                }}
                className="domain-colead-card"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

