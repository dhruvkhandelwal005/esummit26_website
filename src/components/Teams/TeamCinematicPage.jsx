import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterIntro from "./ChapterIntro";
import ChapterScene from "./ChapterScene";
import ScrollCameraController from "./ScrollCameraController";
import GlowCursor from "./GlowCursor";
import "./styles/teamCinematic.css";
import { ScrollNavbar } from "../Home/ScrollNavbar";

gsap.registerPlugin(ScrollTrigger);

// Domain data
const allDomains = [
  { name: "EOC", lead: "Haruki Tanaka", coLead: "Maya Ito", img: "/textures/eoc.jpg" },
  { name: "Decor", lead: "Mouryagna Baindla", coLead: "Rhythem Gupta", img: "/textures/decor.jpg" },
  { name: "Marketing", lead: "Akira Sato", coLead: "Yuki Tan", img: "/textures/marketing.jpg" },
  { name: "Corporate", lead: "Lakshya", coLead: "Gaurav Borikar", img: "/textures/corporate.jpg" },
  { name: "Photography", lead: "Suraj Pratap Singh", coLead: "Dilkhush Choubey", img: "/textures/photography.jpg" },
  { name: "Design", lead: "Tanishq Kamble", coLead: "Shubh Gupta", img: "/textures/design.jpg" },
  { name: "Logistics", lead: "Shreeyansh Kulkarni", coLead: "Harsh Agarwal", img: "/textures/logistics.jpg" },
  { name: "Content & Anchoring", lead: "Tanaya Patne", coLead: "Rei Fuji", img: "/textures/content_anchoring.jpg" },
  { name: "Hospitality", lead: "Priyanka Pawar", coLead: "Shruthi Rathod", img: "/textures/hospitality.jpg" },
  { name: "Stage & Technical", lead: "Prakarsh Jain", coLead: "Vedant Anjankar", img: "/textures/stage_technical.jpg" },
  { name: "PR Outreach", lead: "Aditi Thakre", coLead: "Pranay Ukey", img: "/textures/pr_outreach.jpg" },
  { name: "Web & App Domain", lead: "Dhruv KhandelWal", coLead: "S. Yashaswi Sai Govind", img: "/textures/web_app.jpg" },
];

// Organize domains into 3 chapters
const chapters = [
  {
    kanji: "美",
    title: "The Creative Core",
    subtitle: "Artistry in Expression",
    domains: ["Decor", "Design", "Photography", "Content & Anchoring"],
  },
  {
    kanji: "策",
    title: "The Strategic Frontline",
    subtitle: "Vision in Action",
    domains: ["PR Outreach", "Marketing", "Corporate", "EOC"],
  },
  {
    kanji: "技",
    title: "The Tech Backbone",
    subtitle: "Engineering Tomorrow",
    domains: ["Web & App Domain", "Logistics", "Stage & Technical", "Hospitality"],
  },
];

// Helper function to get domain data
const getDomainData = (domainName) => {
  const domain = allDomains.find((d) => d.name === domainName);
  if (!domain) return null;

  const isWebDomain = domainName === "Web & App Domain";

  const domainData = {
    domain: domain.name,
    texture: domain.img,
    lead: {
      name: domain.lead,
      role: "Lead",
      image: `/team/${domain.name.toLowerCase().replace(/\s+/g, "_")}_lead.jpg`,
    },
    coLead: {
      name: domain.coLead,
      role: "Co-Lead",
      image: `/team/${domain.name.toLowerCase().replace(/\s+/g, "_")}_colead.jpg`,
    },
    seniorMembers: [],
    juniorMembers: [],
    subtitle: undefined,
    isHospitality: domainName === "Hospitality",
  };

  // Add additional members for Web & App Domain
  if (isWebDomain) {
    domainData.subtitle = "Tech Backbone";
    domainData.seniorMembers = [
      { name: "Riya Patel", role: "Senior Frontend Engineer", image: null },
      { name: "Arman Bose", role: "Senior Full Stack Engineer", image: null },
      { name: "Mei Nakamura", role: "Senior UX Engineer", image: null },
    ];
    domainData.juniorMembers = [
      { name: "Kaito Ishida", role: "Junior Frontend Developer", image: null },
      { name: "Sara Iyer", role: "Junior Backend Developer", image: null },
      { name: "Luis Andrade", role: "Junior App Developer", image: null },
      { name: "Neha Kulkarni", role: "Junior QA Engineer", image: null },
      { name: "Evelyn Park", role: "Junior UI Designer", image: null },
    ];
    domainData.additionalMembers = [
      ...domainData.seniorMembers,
      ...domainData.juniorMembers,
    ];
  }

  return domainData;
};

export default function TeamCinematicPage() {
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images but don't block content - show content immediately
  useEffect(() => {
    // Show content immediately, preload in background
    setImagesLoaded(true);
    
    const imageUrls = [];
    
    // Collect all texture images
    allDomains.forEach((domain) => {
      if (domain.img) imageUrls.push(domain.img);
    });
    
    // Collect all team member images
    chapters.forEach((chapter) => {
      chapter.domains.forEach((domainName) => {
        const domainData = getDomainData(domainName);
        if (domainData) {
          if (domainData.lead?.image) imageUrls.push(domainData.lead.image);
          if (domainData.coLead?.image) imageUrls.push(domainData.coLead.image);
          if (domainData.additionalMembers) {
            domainData.additionalMembers.forEach((member) => {
              if (member.image) imageUrls.push(member.image);
            });
          }
        }
      });
    });

    // Preload critical images first, then lazy-load the rest
    const criticalImages = imageUrls.slice(0, 4); // First 4 are critical
    const lazyImages = imageUrls.slice(4);
    
    // Preload critical images
    criticalImages.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
      
      const img = new Image();
      img.src = url;
    });
    
    // Lazy load the rest with IntersectionObserver
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, { rootMargin: '50px' });
      
      lazyImages.forEach((url) => {
        const img = new Image();
        img.dataset.src = url;
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      lazyImages.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imagesLoaded) return;

    // Initialize ScrollSmoother for buttery smooth scrolling
    let smoother = null;
    try {
      const { ScrollSmoother } = require("gsap/ScrollSmoother");
      if (ScrollSmoother) {
        smoother = ScrollSmoother.create({
          wrapper: ".team-cinematic",
          content: ".team-cinematic-content",
          smooth: 2,
          effects: true,
          smoothTouch: 0.1,
        });
      }
    } catch (e) {
      // ScrollSmoother not available, continue without it
      console.log("ScrollSmoother not available, using standard scroll");
    }

    // Floating lantern animation
    const lantern = document.querySelector(".floating-lantern");
    if (lantern) {
      gsap.to(lantern, {
        y: -40,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Add lens spotlight effect that follows cursor
    const lens = document.createElement("div");
    lens.classList.add("lens-spotlight");
    document.body.appendChild(lens);
    gsap.set(lens, { opacity: 0.15 });

    const handleMouseMove = (e) => {
      gsap.to(lens, {
        x: e.clientX - 150,
        y: e.clientY - 150,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    // Show lens on mouse move, hide when mouse leaves
    const handleMouseEnter = () => {
      gsap.to(lens, { opacity: 0.15, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(lens, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Ensure domain sections and cards are visible immediately
    gsap.set(".domain-section, .team-card, .chapter-intro", {
      opacity: 1,
      scale: 1,
      visibility: 'visible',
      display: 'flex',
    });
    
    // Optional: Gentle fade-in for domain sections (non-blocking)
    setTimeout(() => {
      gsap.fromTo(
        ".domain-section",
        { opacity: 0.95, scale: 0.99 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }, 100);

    // Refresh ScrollTrigger after DOM updates
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (lens && lens.parentNode) {
        lens.parentNode.removeChild(lens);
      }
      if (smoother) {
        smoother.kill();
      }
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars && t.vars.trigger === container) {
          t.kill();
        }
      });
    };
  }, [imagesLoaded]);

  // Prepare chapter data with domain information
  const chaptersWithData = chapters.map((chapter) => ({
    ...chapter,
    domains: chapter.domains
      .map((domainName) => getDomainData(domainName))
      .filter((d) => d !== null),
  }));

  // Debug: Log chapters data
  useEffect(() => {
    console.log("Chapters with data:", chaptersWithData);
    chaptersWithData.forEach((chapter, i) => {
      console.log(`Chapter ${i}: ${chapter.title} - ${chapter.domains.length} domains`);
      chapter.domains.forEach((domain, j) => {
        console.log(`  Domain ${j}:`, domain);
      });
    });
  }, [chaptersWithData]);

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-50">
      <ScrollNavbar />
    </div>
    <div className="team-cinematic" ref={containerRef}>
      {!imagesLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="team-cinematic-content" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        {/* ARIA Live Region for Screen Readers */}
        <div id="aria-live-announcer" className="sr-only" aria-live="polite" aria-atomic="true"></div>
        
        {/* Animation Toggle (Accessibility) */}
        <button
          className="animation-toggle"
          onClick={() => {
            document.documentElement.classList.toggle('animations-disabled');
            const announcer = document.getElementById('aria-live-announcer');
            if (announcer) {
              announcer.textContent = document.documentElement.classList.contains('animations-disabled')
                ? 'Animations disabled'
                : 'Animations enabled';
            }
          }}
          aria-label="Toggle animations"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid var(--accent)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ⚡ Animations
        </button>
        
        <ScrollCameraController />
        
        {/* Floating lantern element */}
        <div className="floating-lantern">
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 10C35 10 39 14 39 19V50C39 55 35 59 30 59C25 59 21 55 21 50V19C21 14 25 10 30 10Z" fill="rgba(255, 200, 100, 0.3)" stroke="rgba(200, 150, 80, 0.4)" strokeWidth="1"/>
            <path d="M30 50L30 70" stroke="rgba(200, 150, 80, 0.3)" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="30" cy="19" r="3" fill="rgba(255, 220, 120, 0.5)"/>
          </svg>
        </div>
        
        {chaptersWithData.map((chapter, index) => (
          <React.Fragment key={chapter.title}>
            <ChapterIntro
              kanji={chapter.kanji}
              title={chapter.title}
              subtitle={chapter.subtitle}
            />
            <ChapterScene
              domains={chapter.domains}
              index={index}
            />
          </React.Fragment>
        ))}
      </div>

      <GlowCursor />
    </div>
    </>
  );
}

