import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MemberCard from "./MemberCard";

gsap.registerPlugin(ScrollTrigger);

export default function DomainSection({ 
  domain, 
  texture, 
  lead, 
  coLead, 
  isWebDev = false, 
  seniorMembers = [],
  juniorMembers = [],
  subtitle,
  isHospitality = false
}) {
  const sectionRef = useRef(null);
  const textureRef = useRef(null);
  const shineRef = useRef(null);
  const titleRef = useRef(null);
  const heroContainerRef = useRef(null);
  const heroMembersRef = useRef(null);

  // Force visible on mount - ensure section is always visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Force visible immediately
    gsap.set(section, {
      opacity: 1,
      scale: 1,
      visibility: 'visible',
      display: 'flex',
    });

    // Smart focus activation
    const activate = () => {
      gsap.to(section, {
        scale: 1.02,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
      
      // Soften neighboring sections
      const allSections = document.querySelectorAll('.domain-section');
      allSections.forEach((s) => {
        if (s !== section && !s.classList.contains('active-focus')) {
          gsap.to(s, {
            opacity: 0.9,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });
      
      section.classList.add('active-focus');
    };

    const deactivate = () => {
      gsap.to(section, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });
      section.classList.remove('active-focus');
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: activate,
      onEnterBack: activate,
      onLeave: deactivate,
      onLeaveBack: deactivate,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Interactive hover effects: tilt, shine, camera movement, texture zoom
  useEffect(() => {
    const section = sectionRef.current;
    const textureElement = textureRef.current;
    const shine = shineRef.current;
    if (!section || !textureElement) return;

    // Disable on mobile for performance
    if (window.innerWidth < 800) return;

    let isHovering = false;
    let rafId = null;

    // Mouse move handler for 3D tilt and camera movement (throttled with RAF)
    const handleMouseMove = (e) => {
      if (!isHovering) return;
      
      // Cancel previous animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // 3D tilt effect - subtle camera-like movement
        gsap.to(section, {
          rotationY: x * 4, // Enhanced tilt
          rotationX: -y * 4,
          x: x * 10, // Camera pan
          y: y * 10,
          scale: 1.04,
          duration: 0.5,
          ease: "power1.out",
          transformPerspective: 1000,
        });

        // Texture parallax - moves opposite to cursor for depth
        gsap.to(textureElement, {
          x: -x * 25,
          y: -y * 25,
          scale: 1.1,
          duration: 0.7,
          ease: "power1.out",
        });

        // Shine effect follows cursor
        if (shine) {
          const shineX = (e.clientX - rect.left);
          const shineY = (e.clientY - rect.top);
          gsap.to(shine, {
            x: shineX - 100,
            y: shineY - 100,
            opacity: 0.5,
            duration: 0.2,
            ease: "power1.out",
          });
        }
      });
    };

    // Mouse enter - activate hover state
    const handleMouseEnter = () => {
      isHovering = true;
      section.classList.add('domain-section--hover');
      
      // Initial shine animation
      if (shine) {
        gsap.to(shine, {
          opacity: 0.3,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      // Enhance texture visibility and clarity on hover - make it even clearer
      gsap.to(textureElement, {
        opacity: 0.85,
        filter: "brightness(1.15) contrast(1.25) saturate(1.3)",
        duration: 0.5,
        ease: "power2.out",
      });

      // Zoom cards slightly
      const cards = section.querySelectorAll('.team-card');
      cards.forEach((card, index) => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
        });
      });
    };

    // Mouse leave - reset all effects
    const handleMouseLeave = () => {
      isHovering = false;
      section.classList.remove('domain-section--hover');
      
      // Reset section transform
      gsap.to(section, {
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Reset texture to default state - clear and visible
      gsap.to(textureElement, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 0.75,
        filter: "brightness(1.1) contrast(1.15) saturate(1.2)",
        duration: 0.6,
        ease: "power3.out",
      });

      // Hide shine
      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in",
        });
      }

      // Reset cards
      const cards = section.querySelectorAll('.team-card');
      gsap.to(cards, {
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll parallax for texture (subtle) - only on desktop, paused on hover
  useEffect(() => {
    const textureElement = textureRef.current;
    const section = sectionRef.current;
    if (!textureElement || !section || window.innerWidth < 800) return;

    // Gentle parallax for domain texture on scroll
    // This will work alongside hover effects, but hover takes priority
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        // Only apply scroll parallax if not hovering
        if (!section.classList.contains('domain-section--hover')) {
          gsap.set(textureElement, {
            y: 15 * self.progress,
            overwrite: false, // Don't overwrite hover transforms
          });
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    if (!isWebDev || !textureRef.current || !texture) return;

    const element = textureRef.current;
    let observer = null;

    const loadTexture = () => {
      element.style.backgroundImage = `url(${texture})`;
      element.dataset.loaded = "true";
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadTexture();
              if (observer) {
                observer.disconnect();
              }
            }
          });
        },
        { rootMargin: "200px" }
      );

      observer.observe(element);
    } else {
      loadTexture();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isWebDev, texture]);

  useEffect(() => {
    if (!isWebDev || !sectionRef.current) return;

    const section = sectionRef.current;
    const heroContainer = heroContainerRef.current;
    const heroMembers = heroMembersRef.current;
    const heading = titleRef.current;

    const cards = section.querySelectorAll(".domain-section--webapp .member-card");

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    heroTimeline.fromTo(
      section,
      { scale: 0.95, opacity: 0.85, rotateX: -2 },
      {
        scale: 1,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out",
      }
    );

    if (heading) {
      heroTimeline.fromTo(
        heading,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }

    if (heroContainer) {
      heroTimeline.fromTo(
        heroContainer,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }

    if (cards.length > 0) {
      heroTimeline.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      );
    }

    let cameraEffect;
    if (heroMembers) {
      cameraEffect = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 40%",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(heroMembers, {
            xPercent: progress * 2,
            y: progress * -10,
            duration: 0.2,
            ease: "power1.out",
          });
        },
      });
    }

    return () => {
      heroTimeline.kill();
      if (cameraEffect) {
        cameraEffect.kill();
      }
    };
  }, [isWebDev]);

  return (
    <article
      ref={sectionRef}
      className={`domain-section ${isWebDev ? 'domain-section--webapp' : ''} ${isHospitality ? 'domain-section--hospitality' : ''}`}
      data-priority={isWebDev ? "webapp" : undefined}
      role="group"
      aria-label={`${domain} team section`}
    >
      {texture && (
        <>
          <div
            ref={textureRef}
            className={`domain-texture ${isWebDev ? 'domain-texture--webapp' : ''}`}
            style={
              isWebDev
                ? undefined
                : {
                    backgroundImage: `url(${texture})`,
                  }
            }
            data-texture={isWebDev ? texture : undefined}
            aria-hidden="true"
          />
          <div
            ref={shineRef}
            className="domain-shine"
            aria-hidden="true"
          />
        </>
      )}

      <header className={`domain-header ${isWebDev ? 'domain-header--webapp' : ''}`}>
        <div className="domain-title-group">
          {isWebDev && subtitle && (
            <span className="domain-subtitle-eyebrow" aria-hidden="true">
              {subtitle}
            </span>
          )}
          <h2
            ref={titleRef}
            className={`domain-title ${isWebDev ? 'domain-title--webapp' : ''}`}
          >
            {domain}
          </h2>
        </div>
      </header>

      {isWebDev ? (
        <div className="webapp-hero" ref={heroContainerRef}>
          <div className="webapp-hero-top">
            {lead && (
              <MemberCard
                member={{
                  name: lead.name || 'Unknown',
                  role: lead.role || "Lead",
                  image: lead.image,
                }}
                className="team-card team-card--lead webapp-hero-card webapp-hero-card--lead"
              />
            )}
            {coLead && (
              <MemberCard
                member={{
                  name: coLead.name || 'Unknown',
                  role: coLead.role || "Co-Lead",
                  image: coLead.image,
                }}
                className="team-card team-card--colead webapp-hero-card webapp-hero-card--colead"
              />
            )}
          </div>

          <div className="webapp-hero-tiers" ref={heroMembersRef}>
            {seniorMembers.length > 0 && (
              <section className="webapp-tier webapp-tier--seniors">
                <div className="webapp-tier-heading">
                  <h3>Senior Team</h3>
                  <span className="webapp-tier-count" aria-hidden="true">
                    {seniorMembers.length}
                  </span>
                </div>
                <div className="webapp-tier-grid">
                  {seniorMembers.map((member, idx) => (
                    <MemberCard
                      key={`senior-${member.name}-${idx}`}
                      member={{
                        name: member.name,
                        role: member.role,
                        image: member.image,
                      }}
                      className="team-card webapp-tier-card webapp-tier-card--senior"
                    />
                  ))}
                </div>
              </section>
            )}

            {juniorMembers.length > 0 && (
              <section className="webapp-tier webapp-tier--juniors">
                <div className="webapp-tier-heading">
                  <h3>Junior Team</h3>
                  <span className="webapp-tier-count" aria-hidden="true">
                    {juniorMembers.length}
                  </span>
                </div>
                <div className="webapp-tier-grid webapp-tier-grid--compact">
                  {juniorMembers.map((member, idx) => (
                    <MemberCard
                      key={`junior-${member.name}-${idx}`}
                      member={{
                        name: member.name,
                        role: member.role,
                        image: member.image,
                      }}
                      className="team-card webapp-tier-card webapp-tier-card--junior"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      ) : (
        <div className="domain-cards">
          {lead && (
            <MemberCard
              member={{
                name: lead.name || 'Unknown',
                role: lead.role || "Lead",
                image: lead.image,
              }}
              className="team-card team-card--lead"
            />
          )}
          {coLead && (
            <MemberCard
              member={{
                name: coLead.name || 'Unknown',
                role: coLead.role || "Co-Lead",
                image: coLead.image,
              }}
              className="team-card team-card--colead"
            />
          )}
        </div>
      )}

      <footer className="domain-footer" aria-hidden="true">
        {/* Reserved for taglines or additional info */}
      </footer>
    </article>
  );
}

