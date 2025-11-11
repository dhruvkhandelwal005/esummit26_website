import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChapterIntro({ kanji, title, subtitle }) {
  const introRef = useRef(null);
  const kanjiRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    const kanji = kanjiRef.current;
    const text = textRef.current;
    
    if (!intro || !kanji || !text) return;

    // Set visible by default
    gsap.set(kanji, { opacity: 0.08, scale: 1 });
    gsap.set(text, { opacity: 1, y: 0 });

    // Kanji glow animation on scroll
    gsap.fromTo(kanji, 
      { opacity: 0.05, scale: 0.95 },
      {
        opacity: 0.08,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: intro,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Text float in animation
    gsap.fromTo(text,
      { opacity: 0.8, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: intro,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Scroll-out fade
    gsap.to(intro, {
      opacity: 0.3,
      scale: 0.98,
      scrollTrigger: {
        trigger: intro,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === intro) {
          trigger.kill();
        }
      });
    };
  }, [kanji, title, subtitle]);

  return (
    <section ref={introRef} className="chapter-intro">
      <div ref={kanjiRef} className="kanji-background">
        {kanji}
      </div>
      <div ref={textRef} className="chapter-intro-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

