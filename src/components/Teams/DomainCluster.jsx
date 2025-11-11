import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MemberCard from "./MemberCard";

gsap.registerPlugin(ScrollTrigger);

export default function DomainCluster({ domain, texture, lead, coLead, isWebDev = false, additionalMembers = [] }) {
  const clusterRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Debug: Log domain data
  useEffect(() => {
    console.log("DomainCluster rendered:", { domain, texture, lead, coLead });
    if (!domain) {
      console.error("DomainCluster: No domain name provided!");
    }
  }, [domain, texture, lead, coLead]);

  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;

    // Force visible immediately - no animation delays
    gsap.set(cluster, { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      display: "flex",
      visibility: "visible"
    });
    
    // Optional: Gentle entrance animation (non-blocking)
    const timer = setTimeout(() => {
      gsap.fromTo(
        cluster,
        { opacity: 0.9, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cluster,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === cluster) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Web & App domain expansion animation
  useEffect(() => {
    if (!isWebDev || !clusterRef.current) return;

    const additionalContainer = clusterRef.current.querySelector(".additional-members-container");
    if (!additionalContainer) return;
    
    if (isExpanded) {
      // Expand container
      gsap.to(additionalContainer, {
        opacity: 1,
        y: 0,
        scale: 1,
        maxHeight: "500px",
        duration: 0.6,
        ease: "power2.out",
      });
      
      // Slight zoom forward effect
      gsap.to(clusterRef.current, {
        scale: 1.05,
        z: 50,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      // Collapse container
      gsap.to(additionalContainer, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        maxHeight: "0px",
        duration: 0.4,
        ease: "power2.in",
      });
      
      gsap.to(clusterRef.current, {
        scale: 1,
        z: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isExpanded, isWebDev]);

  return (
    <div 
      ref={clusterRef} 
      className={`domain-cluster ${isWebDev ? 'webdev-cluster' : ''} ${isExpanded ? 'expanded' : ''}`}
      style={{
        backgroundImage: texture ? `url(${texture})` : 'none',
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
        zIndex: 30,
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
      onMouseEnter={() => isWebDev && setIsExpanded(true)}
      onMouseLeave={() => isWebDev && setIsExpanded(false)}
    >
      <div className="domain-cluster-header" style={{ zIndex: 40, position: 'relative' }}>
        <h3 className="domain-cluster-title" style={{ color: '#000', fontSize: '1.8rem', fontWeight: 'bold' }}>
          {domain || 'Unknown Domain'}
        </h3>
      </div>
      
      <div className="domain-cluster-cards" style={{ zIndex: 40, position: 'relative', width: '100%' }}>
        {lead ? (
          <MemberCard
            member={{
              name: lead.name || 'Unknown',
              role: lead.role || "Lead",
              image: lead.image,
            }}
            className="domain-lead-card"
          />
        ) : (
          <div style={{ padding: '1rem', color: '#000' }}>No Lead assigned</div>
        )}
        {coLead ? (
          <MemberCard
            member={{
              name: coLead.name || 'Unknown',
              role: coLead.role || "Co-Lead",
              image: coLead.image,
            }}
            className="domain-colead-card"
          />
        ) : (
          <div style={{ padding: '1rem', color: '#000' }}>No Co-Lead assigned</div>
        )}
      </div>
      
      {/* Additional members for Web & App domain (outside main cards for expansion) */}
      {isWebDev && additionalMembers.length > 0 && (
        <div className="additional-members-container">
          {additionalMembers.map((member, index) => (
            <div key={index} className="additional-member-card">
              <MemberCard
                member={{
                  name: member.name,
                  role: member.role,
                  image: member.image,
                }}
                className="additional-member"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

