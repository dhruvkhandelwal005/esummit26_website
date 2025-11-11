import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./TeamSection.css";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  { name: "EOC", lead: "Haruki Tanaka", coLead: "Maya Ito", img: "/textures/eoc.jpg" },
  { name: "Decor", lead: "Aarav Mehta", coLead: "Riko Yamada", img: "/textures/decor.jpg" },
  { name: "Marketing", lead: "Akira Sato", coLead: "Yuki Tan", img: "/textures/marketing.jpg" },
  { name: "Corporate", lead: "Takeshi Mori", coLead: "Sana Ueno", img: "/textures/corporate.jpg" },
  { name: "Photography", lead: "Nobu Arai", coLead: "Kiko Haru", img: "/textures/photography.jpg" },
  { name: "Design", lead: "Aiko Ren", coLead: "Kenji Ryu", img: "/textures/design.jpg" },
  { name: "Logistics", lead: "Sora Yuki", coLead: "Rin Hayashi", img: "/textures/logistics.jpg" },
  { name: "Content & Anchoring", lead: "Mei Arata", coLead: "Rei Fuji", img: "/textures/content_anchoring.jpg" },
  { name: "Hospitality", lead: "Takumi Lee", coLead: "Naomi Saito", img: "/textures/hospitality.jpg" },
  { name: "Stage & Technical", lead: "Daichi Ono", coLead: "Aina Wada", img: "/textures/stage_technical.jpg" },
  { name: "PR Outreach", lead: "Hana Sato", coLead: "Kaito Inoue", img: "/textures/pr_outreach.jpg" },
  {
    name: "Web & App Domain",
    lead: "Alex Chen",
    coLead: "Sarah Kim",
    members: ["Rahul", "Priya", "Akira", "Neha", "Arjun"],
    img: "/textures/web_app.jpg",
  },
];

export default function TeamSection() {
  const sectionRef = useRef();

  useEffect(() => {
    gsap.utils.toArray(".team-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="team-section" ref={sectionRef}>
      <div className="title-wrapper">
        <h1>
          Our <span>Domains</span> & Teams
        </h1>
      </div>

      <div className="team-grid">
        {domains.map((domain, i) => (
          <div className="team-card" key={i}>
            <div className="image-container">
              <img src={domain.img} alt={domain.name} loading="lazy" />
            </div>
            <div className="team-info">
              <h3>{domain.name}</h3>
              <p>
                <b>Lead:</b> {domain.lead} <br />
                <b>Co-Lead:</b> {domain.coLead}
              </p>
              {domain.members && (
                <p className="members">
                  <b>Members:</b> {domain.members.join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
