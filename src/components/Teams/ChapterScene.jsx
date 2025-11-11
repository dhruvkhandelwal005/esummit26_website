import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DomainSection from "./DomainSection";
import FogLayer from "./FogLayer";

gsap.registerPlugin(ScrollTrigger);

export default function ChapterScene({ domains, index }) {
  const sceneRef = useRef(null);

  // Debug: Log domains to console
  useEffect(() => {
    console.log(`ChapterScene ${index} - Domains:`, domains);
    if (!domains || domains.length === 0) {
      console.warn(`ChapterScene ${index} - No domains provided!`);
    }
  }, [domains, index]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Initialize domain sections - force visible immediately
    const domainSections = scene.querySelectorAll(".domain-section");
    domainSections.forEach((section) => {
      gsap.set(section, {
        opacity: 1,
        scale: 1,
        visibility: 'visible',
        display: 'flex',
        willChange: "transform, opacity",
        clearProps: "all",
      });
    });

    // Force scene content visible
    const sceneContent = scene.querySelector(".scene-content");
    if (sceneContent) {
      gsap.set(sceneContent, {
        opacity: 1,
        visibility: 'visible',
        display: 'flex',
      });
    }

    // Force chapter domains visible
    const chapterDomains = scene.querySelector(".chapter-domains");
    if (chapterDomains) {
      gsap.set(chapterDomains, {
        opacity: 1,
        visibility: 'visible',
        display: 'grid',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === scene) {
          trigger.kill();
        }
      });
    };
  }, [domains, index]);

  return (
    <section ref={sceneRef} className="chapter-scene" data-scene>
      {/* Fog layer - subtle atmosphere only, no texture backgrounds here */}
      <div className="chapter-fog-container">
        <FogLayer />
      </div>

      {/* Content layer - stays crisp and in focus */}
      <div className="scene-content">
        <div className="chapter-domains">
          {domains && domains.length > 0 ? (
            domains.map((domainData, idx) => (
              <DomainSection
                key={domainData?.domain || Math.random()}
                domain={domainData?.domain || 'Unknown'}
                texture={domainData?.texture}
                lead={domainData?.lead}
                coLead={domainData?.coLead}
                isWebDev={domainData?.domain === "Web & App Domain"}
              seniorMembers={domainData?.seniorMembers || []}
              juniorMembers={domainData?.juniorMembers || []}
              subtitle={domainData?.subtitle}
              isHospitality={domainData?.isHospitality}
                index={idx}
              />
            ))
          ) : (
            <div className="domain-empty" style={{ padding: '2rem', color: '#000', gridColumn: '1 / -1' }}>
              No domains available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

