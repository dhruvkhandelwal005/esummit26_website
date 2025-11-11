import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GlowCursor() {
  const cursorRef = useRef(null);
  const isHoveringCard = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover || !cursorRef.current) return;

    const cursor = cursorRef.current;
    let rafId = null;

    // Initialize cursor position and CSS variables
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
      scale: 1,
      "--cursor-color": "rgba(255, 255, 240, 0.15)",
      "--cursor-opacity": 1,
      "--cursor-blur": "30px",
    });

    // Smooth follow using GSAP quickTo for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power2.out" });

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);

      // Fade in cursor if not visible
      if (gsap.getProperty(cursor, "opacity") === 0) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }
    };

    // Mouse leave handler - fade out cursor
    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    // Card hover handlers
    const handleCardEnter = () => {
      isHoveringCard.current = true;
      gsap.to(cursor, {
        scale: 1.3,
        "--cursor-opacity": 1.25,
        "--cursor-blur": "40px",
        "--cursor-color": "rgba(0, 180, 180, 0.3)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handleCardLeave = () => {
      isHoveringCard.current = false;
      gsap.to(cursor, {
        scale: 1.0,
        "--cursor-opacity": 1,
        "--cursor-blur": "30px",
        "--cursor-color": "rgba(255, 255, 240, 0.15)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    // Idle pulse animation
    const pulseAnimation = gsap.to(cursor, {
      "--cursor-opacity": 1.05,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Attach event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Listen for card hover events using event delegation
    const handleCardMouseEnter = (e) => {
      if (e.target.closest(".team-card-wrapper") || e.target.closest(".member-card")) {
        handleCardEnter();
      }
    };

    const handleCardMouseLeave = (e) => {
      if (e.target.closest(".team-card-wrapper") || e.target.closest(".member-card")) {
        handleCardLeave();
      }
    };

    // Use event delegation on the section for better performance
    const section = document.querySelector(".team-cinematic") || document.querySelector(".team-cinematic-content");
    if (section) {
      section.addEventListener("mouseenter", handleCardMouseEnter, true);
      section.addEventListener("mouseleave", handleCardMouseLeave, true);
    }

    // Also listen directly to cards for immediate response
    const attachCardListeners = () => {
      const teamCards = document.querySelectorAll(".team-card-wrapper");
      const memberCards = document.querySelectorAll(".member-card");
      const allCards = [...teamCards, ...memberCards];
      allCards.forEach((card) => {
        card.addEventListener("mouseenter", handleCardEnter);
        card.addEventListener("mouseleave", handleCardLeave);
      });
      return allCards;
    };

    // Initial attachment
    let cards = attachCardListeners();

    // Re-attach listeners if cards are added dynamically
    const observer = new MutationObserver(() => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleCardEnter);
        card.removeEventListener("mouseleave", handleCardLeave);
      });
      cards = attachCardListeners();
    });

    if (section) {
      observer.observe(section, { childList: true, subtree: true });
    } else {
      // Fallback: observe document body if section not found
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (section) {
        section.removeEventListener("mouseenter", handleCardMouseEnter, true);
        section.removeEventListener("mouseleave", handleCardMouseLeave, true);
      }
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleCardEnter);
        card.removeEventListener("mouseleave", handleCardLeave);
      });
      observer.disconnect();
      pulseAnimation.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-glow" />;
}

