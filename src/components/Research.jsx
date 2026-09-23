import React from "react";
// Garde tes imports CSS tels quels
import "../styles/Projects.css";
import "../styles/Research.css"; 
import FadeInSection from "./FadeInSection"; // Ton composant local pour l'animation
// Utilisation de react-icons (plus léger) au lieu de Material UI
import { FaFolderOpen, FaExternalLinkAlt } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

export default function Research({ lang = "en" }) {
  const navigate = useNavigate();
  const texts = {
    en: { 
      title: "/ research",
      readMore: "Read full detail",
      projects: [
        {
          title: "Multi-Robot Task Allocation (MRTA) Algorithms",
          desc: "Study and comparison of the efficiency, complexity, and robustness of algorithms allowing robots to distribute tasks to accomplish a mission.",
          techStack: "Machine Learning, Robotics Simulation, Python, Lua",
          link: "/research/MRTA",
          image: "coppelia.png"
        },
        {
          title: "Unsupervised Models for Embedded Predictive Maintenance",
          desc: "If you don't provide an image, the component will display a folder icon instead.",
          techStack: "TensorFlowLite, ESP32, TinyML, Python",
          link: "/research/embedded_predictive_maintenance",
          badge: { text: "View publication", href: "https://arxiv.org/..." } 
        }
      ]
    },
    fr: { 
      title: "/ recherche",
      readMore: "Lire le détail",
      projects: [
        {
          title: "Algorithmes d'allocations de tâches multi-robot (MRTA)",
          desc: "Etude et comparaison de l'efficacité, de la complexité et de la robustesse d'algorithmes permettant à des robots de se répartir des tâches afin d'accomplir une mission.",
          techStack: "Machine Learning, Simulation Robotique, Python, Lua",
          link: "/research/MRTA",
          image: "coppelia.png"
        },
        {
          title: "Modèles non-supervisés pour la maintenance prédictive embarquée",
          desc: "Si tu ne fournis pas d'image, le composant affichera l'icône de dossier à la place.",
          techStack: "TensorFlowLite, ESP32, TinyML, Python",
          link: "/research/embedded_predictive_maintenance",
          image: "embeddeddetection.png"
          /*badge: { text: "Voir la publication", href: "https://arxiv.org/..." }*/
        }
      ]
    }
  };

  const currentTexts = texts[lang];

  return (
    <div id="research">
      <div className="section-header">
        <span className="section-title">{currentTexts.title}</span>
      </div>
      <div className="project-container">
        <ul className="projects-grid">
          {currentTexts.projects.map((project, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <li
                className="projects-card"
                // Navigation native au lieu de useNavigate
                onClick={() => navigate(project.link)}
                style={{ cursor: "pointer" }}
              >
                {project.image ? (
                  <div className="project-image-container">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-image" 
                      style={project.imageStyle || {}} 
                    />
                  </div>
                ) : (
                  <div className="card-header">
                    <div className="folder-icon">
                      {/* Remplacement de l'icône MUI par react-icons */}
                      <FaFolderOpen size={35} />
                    </div>
                  </div>
                )}
                <div className="card-title">{project.title}</div>
                {project.badge && (
                  <a
                    href={project.badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-badge-link"
                    onClick={() => navigate(project.link)}
                  >
                    {project.badge.text}
                    {/* Remplacement de l'icône MUI par react-icons */}
                    <FaExternalLinkAlt style={{ fontSize: 12, display: "block", marginLeft: "5px" }} />
                  </a>
                )}
                <div className="card-desc">{project.desc}</div>
                <div className="full-log-link" style={{ color: "#2DD4BF" }}>{currentTexts.readMore}</div>
                <div className="card-tech">{project.techStack}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
}