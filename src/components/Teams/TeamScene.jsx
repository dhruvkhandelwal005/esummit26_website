// TeamScene.jsx
// Main section container: sets up asymmetric grid, passes domains to TeamCard,
// handles modal open, includes FogLayer and TeamParticles.

import React, { useState } from "react";
import TeamCard from "./TeamCard";
import TeamParticles from "./TeamParticles";
import FogLayer from "./FogLayer";
import "../styles/teamSection.css";

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

export default function TeamScene() {
  const [openDomain, setOpenDomain] = useState(null);

  function openModal(d) { setOpenDomain(d); document.body.style.overflow = "hidden"; }
  function closeModal() { setOpenDomain(null); document.body.style.overflow = ""; }

  return (
    <section className="team-section-root" aria-label="Domains & Teams">
      <div className="paper-bg" />
      <FogLayer />
      <TeamParticles />

      <div className="team-content">
        <header className="team-header">
          <h2>Our <span>Domains</span> & Teams</h2>
          <p className="team-sub">Scroll — each panel reveals like an ink stroke. Hover to focus, click to explore members.</p>
        </header>

        <div className="team-grid asymmetric-grid">
          {domains.map((d, i) => <TeamCard key={i} domain={d} idx={i} onOpenModal={openModal} />)}
        </div>
      </div>

      {openDomain && (
        <div className="team-modal" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="modal-inner" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
            <h3>{openDomain.name}</h3>
            <p><strong>Lead:</strong> {openDomain.lead}</p>
            <p><strong>Co-Lead:</strong> {openDomain.coLead}</p>
            {openDomain.members && <p><strong>Members:</strong> {openDomain.members.join(", ")}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
