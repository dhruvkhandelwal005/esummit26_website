import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCameraController() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationsDisabled = document.documentElement.classList.contains('animations-disabled');
    
    if (prefersReducedMotion || animationsDisabled) {
      // Minimal animations - fade only
      const sections = gsap.utils.toArray(".chapter-intro, .chapter-scene, .domain-section");
      sections.forEach((section) => {
        gsap.set(section, { opacity: 1 });
      });
      return;
    }

    // Get all chapter intros and scenes for smooth Kanji scene flow
    const sections = gsap.utils.toArray(".chapter-intro, .chapter-scene");
    const chapterScenes = gsap.utils.toArray(".chapter-scene");
    
    // Smart Focus Camera - Domain sections handle their own focus via DomainSection component
    // This controller handles global parallax and scene transitions
    
    // Smooth zoom/fade between chapter intros and domain grids
    // But ensure sections are visible immediately, animate on scroll
    sections.forEach((section, i) => {
      // Set visible immediately
      gsap.set(section, {
        opacity: 1,
        y: 0,
        scale: 1,
        visibility: 'visible',
      });
      
      // Only animate on scroll if section is below viewport
      gsap.fromTo(
        section,
        { opacity: 0.8, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
            ease: "power1.out",
          },
        }
      );
    });

    // Global parallax background layer (if exists)
    const globalBg = document.querySelector('.layer-bg');
    if (globalBg && window.innerWidth >= 800) {
      gsap.to(globalBg, {
        y: 18,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    // If using new chapter structure, apply cinematic transitions
    if (chapterScenes.length > 0) {
      chapterScenes.forEach((scene, i) => {
        const content = scene.querySelector(".scene-content");
        const nextScene = chapterScenes[i + 1];

        if (!content) return;

        // Gentle fade transition between scenes
        gsap.to(content, {
          opacity: 0.95,
          scale: 0.99,
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "top 60%",
            scrub: 0.6,
            ease: "power1.out",
          },
        });

        // Next scene fade in
        if (nextScene) {
          const nextContent = nextScene.querySelector(".scene-content");

          if (nextContent) {
            gsap.fromTo(
              nextContent,
              { opacity: 0.9, scale: 0.98 },
              {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                  trigger: nextScene,
                  start: "top 80%",
                  end: "top 50%",
                  scrub: 0.6,
                  ease: "power1.out",
                },
              }
            );
          }
        }
      });

      ScrollTrigger.refresh();
      return;
    }

    // Fallback: Original domain section logic (for backward compatibility)
    const legacyDomainSections = gsap.utils.toArray(".team-domain-section, .webdev-feature");
    const domainIntros = gsap.utils.toArray(".domain-intro");

    // Apply cinematic camera transitions to domain sections
    legacyDomainSections.forEach((section, i) => {
      const next = legacyDomainSections[i + 1];

      // Camera zoom and opacity effect (removed z and y transforms to prevent overlap)
      gsap.fromTo(
        section,
        { 
          scale: 0.98, 
          opacity: 0.7,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );

      // Separate blur and brightness animation for better performance
      gsap.fromTo(
        section,
        {
          filter: "blur(3px) brightness(0.95)",
        },
        {
          filter: "blur(0px) brightness(1)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );

      // Parallax background movement (only background, not the section itself)
      const bgElement = section.querySelector(".domain-section-bg, .webdev-feature-bg");
      if (bgElement) {
        gsap.to(bgElement, {
          yPercent: -10,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Animate domain intros with camera focus
    domainIntros.forEach((intro, i) => {
      gsap.fromTo(
        intro,
        { 
          scale: 0.98, 
          opacity: 0,
          filter: "blur(8px)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // Fade out intro as section comes in (gentler transition)
      const nextSection = domainSections[i];
      if (nextSection) {
        gsap.to(intro, {
          opacity: 0.2,
          scale: 0.98,
          filter: "blur(2px)",
          ease: "power2.in",
          scrollTrigger: {
            trigger: nextSection,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        });
      }
    });

    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && 
            (trigger.vars.trigger?.classList?.contains("team-domain-section") ||
             trigger.vars.trigger?.classList?.contains("webdev-feature") ||
             trigger.vars.trigger?.classList?.contains("domain-intro"))) {
          trigger.kill();
        }
      });
    };
  }, []);

  return null;
}

