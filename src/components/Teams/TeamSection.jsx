// src/components/TeamSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import TeamCard from "./TeamCard";
import TeamParticles from "./TeamParticles";
import FogLayer from "./FogLayer";
import "../styles/teamSection.css";

gsap.registerPlugin(ScrollTrigger);

const domains = [
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
  { name: "Web & App Domain", lead: "Dhruv KhandelWal", coLead: "S. Yashaswi Sai Govind", members: ["Rahul", "Priya", "Akira", "Neha", "Arjun"], img: "/textures/web_app.jpg" },
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardsRef = useRef([]);
  const timeRef = useRef({ current: 0 });

  // Prefetch images
  useEffect(() => {
    domains.forEach((domain) => {
      const img = new Image();
      img.src = domain.img;
    });
  }, []);

  // Cursor tracking for light spot
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallax background and scroll setup
  useEffect(() => {
    if (!sectionRef.current || !backgroundRef.current) return;

    // Parallax background
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (backgroundRef.current) {
          const progress = self.progress;
          backgroundRef.current.style.transform = `translateY(${progress * 50}px)`;
          backgroundRef.current.style.opacity = 1 - progress * 0.3;
        }
      },
    });

    // Scroll snapping (cinematic pauses)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (domains.length / 3), // Snap every 3 cards
        duration: { min: 0.2, max: 0.6 },
        delay: 0.1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars?.trigger;
        if (triggerElement && sectionRef.current && sectionRef.current.contains(triggerElement)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedDomain) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDomain]);

  const handleWebAppClick = (domain) => {
    setSelectedDomain(domain);
  };

  const closeModal = () => {
    setSelectedDomain(null);
  };

  return (
    <section className="team-section" ref={sectionRef}>
      {/* Parallax Background Layers */}
      <div className="team-section-background" ref={backgroundRef}>
        <div className="team-section-paper-texture" />
        <div className="team-section-vignette" />
      </div>

      {/* Pointer-follow light spot */}
      <div 
        className="team-section-light-spot"
        style={{
          background: `radial-gradient(circle 400px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Three.js Canvas for Particles and Fog */}
      <div className="team-section-canvas-container">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <FogLayer />
          <TeamParticles count={60} />
        </Canvas>
      </div>
      
      <div className="team-section-container" ref={containerRef}>
        <div className="title-wrapper">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Our <span>Domains</span> & Teams
          </motion.h1>
        </div>

        <div className="team-grid">
          {domains.map((domain, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="team-card-wrapper"
            >
              <TeamCard
                domain={domain}
                index={i}
                onWebAppClick={handleWebAppClick}
                timeRef={timeRef}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal with Ink Transition */}
      <AnimatePresence>
        {selectedDomain && (
          <>
            <motion.div
              className="team-modal-backdrop"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={closeModal}
            />
            
            {/* Ink transition overlay */}
            <motion.div
              className="team-modal-ink-overlay"
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              exit={{ clipPath: "circle(0% at 50% 50%)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            <motion.div
              className="team-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 200,
                delay: 0.2 
              }}
            >
              <button className="team-modal-close" onClick={closeModal}>
                ×
              </button>
              
              <div className="team-modal-content">
                <motion.div 
                  className="team-modal-header"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2>{selectedDomain.name}</h2>
                  <div className="team-modal-ink-frame" />
                </motion.div>
                
                <div className="team-modal-body">
                  <motion.div 
                    className="team-modal-info"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p>
                      <span className="label">Lead:</span> {selectedDomain.lead}
                    </p>
                    <p>
                      <span className="label">Co-Lead:</span> {selectedDomain.coLead}
                    </p>
                  </motion.div>
                  
                  {selectedDomain.members && (
                    <motion.div 
                      className="team-modal-members"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3>Team Members</h3>
                      <ul>
                        {selectedDomain.members.map((member, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                          >
                            {member}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
