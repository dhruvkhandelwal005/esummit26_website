import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MemberCard from "./MemberCard";
import FogLayer from "./FogLayer";

gsap.registerPlugin(ScrollTrigger);

export default function WebDevFeatureSection({ texture, members = [] }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const bg = bgRef.current;
    const cards = section?.querySelectorAll(".webdev-member-card-wrapper");

    if (!section || !title) return;

    // Set initial states
    gsap.set(section, { opacity: 0 });
    gsap.set(title, { opacity: 0, y: 80 });
    if (bg) {
      gsap.set(bg, { scale: 1, opacity: 0.8 });
    }
    if (cards) {
      gsap.set(cards, { opacity: 0, y: 100 });
    }

    // Cinematic timeline for WebDev section (hero sequence)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Title animation
    tl.from(".webdev-feature-title", {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out",
    });

    // Staggered card animations
    tl.from(".webdev-member-card-wrapper", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.4");

    // Background scale and opacity (simultaneous with cards)
    if (bg) {
      tl.to(".webdev-feature-bg", {
        scale: 1.1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }, "<");
    }

    // Special camera-pan-like motion
    gsap.to(section, {
      yPercent: -10,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Individual card hover parallax during scroll
    if (cards) {
      cards.forEach((card, index) => {
        const offset = (index % 2 === 0 ? -1 : 1) * 15;
        gsap.to(card, {
          y: offset,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [members]);

  return (
    <section ref={sectionRef} className="webdev-feature">
      {/* Background texture */}
      {texture && (
        <div
          ref={bgRef}
          className="webdev-feature-bg"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Fog layer */}
      <div className="webdev-fog-container">
        <FogLayer />
      </div>

      {/* Content */}
      <div className="webdev-feature-content">
        {/* Title */}
        <div ref={titleRef} className="webdev-feature-title">
          <h2>Web & App Domain</h2>
          <p className="webdev-subtitle">Building the digital experience</p>
        </div>

        {/* Member cards grid */}
        <div className="webdev-cards-grid">
          {members.map((member, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="webdev-member-card-wrapper"
            >
              <MemberCard
                member={{
                  name: member.name,
                  role: member.role,
                  image: member.image,
                  tagline: member.tagline,
                }}
                className="webdev-member-card"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

