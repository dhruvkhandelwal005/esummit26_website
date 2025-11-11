import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function TeamCard({ domain }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const lightSweepRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const lightSweep = lightSweepRef.current;
    const info = infoRef.current;

    if (!card || !image || !lightSweep || !info) return;

    // Set initial states
    gsap.set(lightSweep, { x: "-100%" });
    const infoContent = info.querySelector(".info-content");
    gsap.set(info, {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      opacity: 0,
      pointerEvents: "none",
      visibility: "hidden",
      y: 30,
    });
    if (infoContent) {
      gsap.set(infoContent, { opacity: 0, y: 10 });
    }

    // Hover enter animation
    const handleMouseEnter = () => {
      // Card glow and scale
      gsap.to(card, {
        "--card-shadow":
          "0 10px 40px rgba(255, 255, 255, 0.3), 0 20px 60px rgba(0, 0, 0, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Image zoom
      gsap.to(image, {
        scale: 1.05,
        filter: "brightness(1.15)",
        duration: 0.5,
        ease: "power2.out",
      });

      // Light sweep animation
      gsap.to(lightSweep, {
        x: "200%",
        duration: 0.8,
        ease: "power2.inOut",
      });

      // Cinematic ink reveal with bounce
      const infoContent = info.querySelector(".info-content");
      const paragraphs = infoContent ? infoContent.querySelectorAll("p") : [];

      // Show the info panel first
      gsap.set(info, { visibility: "visible" });

      gsap.fromTo(
        info,
        {
          y: 30,
          opacity: 0,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          pointerEvents: "none",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          pointerEvents: "auto",
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
        }
      );

      // Staggered text reveal for cinematic effect
      if (infoContent) {
        gsap.fromTo(
          infoContent,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
          }
        );

        // Stagger paragraph reveals
        if (paragraphs.length > 0) {
          gsap.fromTo(
            paragraphs,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            }
          );
        }
      }
    };

    // Hover leave animation
    const handleMouseLeave = () => {
      // Reset card tilt
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Reset card shadow
      gsap.to(card, {
        "--card-shadow": "0 18px 40px rgba(16, 16, 16, 0.08)",
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset image
      gsap.to(image, {
        scale: 1,
        filter: "brightness(1)",
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset light sweep
      gsap.to(lightSweep, {
        x: "-100%",
        duration: 0.3,
        ease: "power2.in",
      });

      // Hide info with reverse ink stroke
      const infoContent = info.querySelector(".info-content");
      const paragraphs = infoContent ? infoContent.querySelectorAll("p") : [];

      // Fade out content first
      if (infoContent) {
        gsap.to(infoContent, {
          opacity: 0,
          y: 5,
          duration: 0.3,
          ease: "power2.in",
        });

        if (paragraphs.length > 0) {
          gsap.to(paragraphs, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        }
      }

      // Then hide the container
      gsap.to(info, {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        opacity: 0,
        y: 10,
        pointerEvents: "none",
        visibility: "hidden",
        duration: 0.4,
        delay: 0.1,
        ease: "power2.in",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function onMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotationY: x * 6,
      rotationX: -y * 6,
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  return (
    <div ref={cardRef} className="team-card-wrapper" onMouseMove={onMove}>
      <div className="team-card-inner">
        <div className="team-card-image-container">
          <img
            ref={imageRef}
            src={domain.img}
            alt={domain.name}
            className="team-card-image"
          />
          <div ref={lightSweepRef} className="team-card-light-sweep"></div>
        </div>
        <div className="team-card-label">{domain.name}</div>

        <div ref={infoRef} className="team-card-info">
          <div className="ink-reveal-overlay"></div>
          <div className="info-content">
            <h3>{domain.name}</h3>
            <p>
              <strong>Lead:</strong> {domain.lead}
            </p>
            <p>
              <strong>Co-Lead:</strong> {domain.coLead}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
