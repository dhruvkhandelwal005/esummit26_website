import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DomainIntro({ title, subtitle, symbol, index }) {
  const introRef = useRef(null);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;

    // Main intro fade in animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Symbol reveal animation (Kanji)
    const symbolEl = el.querySelector(".intro-symbol");
    if (symbolEl) {
      gsap.fromTo(
        symbolEl,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 0.2,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    }

    // Title and subtitle reveal
    const titleEl = el.querySelector(".intro-title");
    const subtitleEl = el.querySelector(".intro-subtitle");
    
    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (subtitleEl) {
      gsap.fromTo(
        subtitleEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Brushstroke ink reveal effect
    const brushEl = el.querySelector(".intro-brushstroke");
    if (brushEl) {
      gsap.fromTo(
        brushEl,
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 0.4,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Intersection Observer for in-view class (for CSS transitions)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [title, subtitle, symbol, index]);

  return (
    <div className="domain-intro" ref={introRef}>
      <div className="intro-brushstroke"></div>
      <div className="intro-symbol">{symbol}</div>
      <div className="intro-text">
        <h2 className="intro-title">{title}</h2>
        <p className="intro-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

