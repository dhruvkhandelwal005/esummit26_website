import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function MemberCard({ member, className = "" }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const lightSweepRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const lightSweep = lightSweepRef.current;

    if (!card || !image || !lightSweep) return;

    // Set initial states
    gsap.set(lightSweep, { x: "-100%" });

    // Hover enter animation - enhanced with image zoom
    const handleMouseEnter = () => {
      // Card lift with glow (enhanced)
      gsap.to(card, {
        y: -12,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });

      // Enhanced image zoom and brightness
      gsap.to(image, {
        scale: 1.15,
        filter: "brightness(1.2) contrast(1.1)",
        duration: 0.6,
        ease: "power2.out",
      });

      // Light sweep animation (enhanced)
      gsap.to(lightSweep, {
        x: "200%",
        duration: 0.8,
        ease: "power2.inOut",
      });
      
      // Add rim light effect
      card.classList.add('card-hover-active');
    };

    // Hover leave animation
    const handleMouseLeave = () => {
      // Reset card position and scale
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        y: 0,
        z: 0,
        duration: 0.6,
        ease: "power3.out",
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
      
      // Remove rim light
      card.classList.remove('card-hover-active');
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
    
    // Enhanced 3D tilt with smoother motion
    gsap.to(el, { 
      rotationY: x * 8, 
      rotationX: -y * 8, 
      scale: 1.03,
      z: 30,
      duration: 0.4, 
      ease: "power2.out" 
    });
  }

  return (
    <article
      ref={cardRef}
      className={`member-card ${className}`}
      onMouseMove={onMove}
      style={{ transformStyle: "preserve-3d" }}
      role="group"
      aria-label={`${member.name}, ${member.role}`}
      tabIndex={0}
    >
      <div className="member-card-inner">
        <div className="member-card-image-container">
          {member.image ? (
            <img 
              ref={imageRef} 
              src={member.image} 
              alt="" 
              className="member-card-image" 
              onError={(e) => {
                // Hide broken image and show placeholder instead
                e.target.style.display = 'none';
                const placeholder = e.target.nextElementSibling;
                if (placeholder && placeholder.classList.contains('member-card-placeholder-fallback')) {
                  placeholder.style.display = 'flex';
                }
              }}
            />
          ) : null}
          {/* Fallback placeholder - hidden by default if image exists */}
          <div 
            className="member-card-placeholder" 
            style={{ display: member.image ? 'none' : 'flex' }}
          >
            <span>{member.name.charAt(0)}</span>
          </div>
          <div ref={lightSweepRef} className="member-card-light-sweep"></div>
        </div>
        <div className="member-info">
          <h3>{member.name}</h3>
          <p className="member-role">{member.role}</p>
          {member.tagline && <p className="member-tagline">{member.tagline}</p>}
        </div>
      </div>
    </article>
  );
}

