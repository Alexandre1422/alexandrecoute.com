import React, { useEffect } from "react";
import "../styles/ArtGallery.css";
import "../styles/Projects.css";
import "../styles/ProjectLog.css"; 
import FadeInSection from "./FadeInSection";
import { Link, useParams } from "react-router-dom";
// Ajout des icônes pour les boutons
import { FaArrowLeft, FaFilePdf, FaImage, FaFileAlt, FaGithub } from "react-icons/fa"; 

export default function ResearchLog({ lang = "en" }) {
  const { projectId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const logsData = {
    en: {
      notFound: "/ research not found",
      logTitle: "/ research details",
      projects: {
        "MRTA": {
          title: "Collaborative Drone Mission Simulation Integrating Failures",
          date: "Spring 2026",
          description: "A comprehensive study and simulation of centralized and decentralized Multi-Robot Task Allocation (MRTA) algorithms for autonomous drone fleets facing engine failures.",
          image: "/coppelia.png",
          buttons: [
            { label: "Full Report", url: "/Simulation de mission collaborative de drones intégrant des pannes.pdf", icon: <FaFilePdf /> },
            { label: "Demo (With Failures)", url: "https://youtu.be/NKEQDP3DuyE", icon: <FaImage /> },
            { label: "Demo (Standard)", url: "https://youtu.be/7jnT0Cy0X2E", icon: <FaImage /> }
          ],
          logs: [
            {
              title: "1. MRTA Context & Operational Uncertainty",
              content: [
                { type: "text", value: "Multi-Robot Task Allocation (MRTA) consists of coordinating a team of robots to accomplish a set of tasks while minimizing the total cost (time or distance). Unlike simple swarm behaviors, MRTA implies intentional, planned cooperation." },
                { type: "list", title: "The Problem of Centralization:", items: [
                  "Real-world drone missions face dynamic constraints such as limited battery life, communication loss, or mechanical engine failures.",
                  "Centralized algorithms operate through a single central planner. If this planner fails, it creates a Single Point of Failure (SPOF), instantly aborting the entire mission."
                ]}
              ]
            },
            {
              title: "2. Evaluated Algorithms",
              content: [
                { type: "text", value: "To find the most resilient alternatives, three distinct algorithms were implemented and compared under simulated failure conditions:" },
                { type: "list", title: "Approaches compared:", items: [
                  "Hungarian Algorithm (Centralized): Mathematically optimal for simple assignments, but highly vulnerable due to its strict reliance on a central node.",
                  "DMCHBA (Distributed Hungarian-Based Algorithm): A decentralized approach using a 'smart-cloning' mechanism to square cost matrices efficiently. It requires only one execution to allocate tasks globally.",
                  "Performance Impact (PI): A decentralized consensus-based algorithm running in 3 phases (Inclusion, Consensus, Removal). Robots negotiate tasks locally based on their individual performance costs and distances."
                ]}
              ]
            },
            {
              title: "3. Hybrid Simulation Architecture",
              content: [
                { type: "text", value: "The study utilized a dual simulation approach to validate the algorithms physically and statistically." },
                { type: "list", title: "Simulation Environments:", items: [
                  "CoppeliaSim: A 3D physical environment featuring a fleet of three terrestrial robots avoiding obstacles. The logic was injected via Python scripts using the ZMQ API.",
                  "Headless Python Environment: A pure logic simulator built to push the algorithms to their limits. It allowed massive statistical testing with up to 20 robots, 200 resources, and dynamic 50% engine failure rates."
                ]}
              ]
            },
            {
              title: "4. Experimental Results & Resilience",
              content: [
                { type: "text", value: "The simulation introduced sudden motor failures at specific milestones (e.g., after completing a set number of tasks) to force the robots to recalculate assignments dynamically." },
                { type: "text", value: "While the centralized Hungarian algorithm proved slightly faster in a perfect environment, it cannot survive central failures. Massive data testing revealed that the DMCHBA is the most robust option under high failure rates. By acting distributively, it eliminates the Single Point of Failure and requires significantly less computational power than the Performance Impact algorithm to achieve full mission recovery." }
              ]
            }
          ]
        },
        "embedded_predictive_maintenance": {
          title: "Unsupervised Models for Embedded Predictive Maintenance",
          date: "Summer 2026",
          description: "A comprehensive comparison between Autoencoders, Random Forest, and a combinatorial architecture deployed directly on an ESP32 microcontroller for real-time fault prediction.",
          image: "/esp32_setup.jpg",
          buttons: [
            { label: "Full Report", url: "/rapport_stage_m2-1.pdf", icon: <FaFilePdf /> },
            { label: "Scientific Poster", url: "/Soutenance Stage M2.pdf", icon: <FaImage /> },
            { label: "Source Code", url: "https://github.com/Alexandre1422/BearingFaultDetection_Stage_M2", icon: <FaGithub /> }
          ],
          logs: [
            {
              title: "1. Industry 4.0 & Edge AI Context",
              content: [
                { type: "text", value: "Unexpected production downtime due to ball bearing mechanical failures represents a critical logistical and economic cost. The goal is to transition from reactive to predictive maintenance by analyzing vibration signatures." },
                { type: "list", title: "Key technological paradigms:", items: [
                  "Edge Computing: Continuously sending thousands of vibration data points to the cloud creates latency and security risks. We process data locally, right at the sensor.",
                  "TinyML: Running Machine Learning models on highly constrained microcontrollers. The ESP32 provides a 240 MHz CPU and only about 520 KB of SRAM, without any dedicated AI hardware accelerator."
                ]}
              ]
            },
            {
              title: "2. Data Preprocessing & Evaluated Architectures",
              content: [
                { type: "text", value: "Raw temporal signals are first transformed using a Fast Fourier Transform (FFT) followed by logarithmic compression and Min-Max normalization. This highlights crucial minor harmonics while compressing the massive fundamental rotation peaks." },
                { type: "list", title: "Machine Learning Approaches:", items: [
                  "Supervised (Random Forest): Highly accurate for known faults (94.60% accuracy on CWRU) and incredibly lightweight. However, it suffers from 'forced classification': it arbitrarily classifies totally unknown anomalies into known classes, generating false diagnostics.",
                  "Unsupervised (Autoencoder): Trained only on healthy data, it forces inputs through a 16-dimension bottleneck. Any unknown signal fails to reconstruct correctly, causing the Mean Squared Error (MSE) to spike and trigger an alert. It acts as an absolute safety net.",
                  "Combinatorial Architecture (AE + RF): A two-stage pipeline. The Autoencoder acts as a universal, uncompromising filter. If an anomaly is confirmed, the Random Forest takes over to specify the fault (e.g., inner race, outer race, balls)."
                ]}
              ]
            },
            {
              title: "3. Implementation & Transpilation on ESP32",
              content: [
                { type: "text", value: "To fit the Autoencoder into the ESP32 without an SD card, the model was compressed using TensorFlow Lite Converter into a static, flat C-array format stored directly in the Flash memory. A static 'Tensor Arena' prevents any dynamic memory allocation crashes (Heap Overflow)." },
                { type: "text", value: "For the Random Forest, an innovative source-to-source transpilation was developed. A Python script converts the entire trained model (Scikit-Learn) into native nested C++ if/else statements. This bypasses the need for an AI framework altogether, achieving virtually zero RAM overhead and ultra-fast execution (3 to 4 milliseconds)." },
                { type: "code", value: "// Excerpt of the C++ transpilator generated from Python\nint predict_random_forest(float* features, float* probabilities) {\n  for(int i = 0; i < N_CLASSES; i++) probabilities[i] = 0;\n  score_tree_0(features, probabilities);\n  // ...\n  return best_class;\n}" }
              ]
            },
            {
              title: "4. Experimental Results on Extreme Cases",
              content: [
                { type: "text", value: "The system was heavily tested using the CWRU and the complex MaFaulDa datasets, including extreme 'corner cases' like totally unknown anomalies, extreme mechanical shocks, or flat signals." },
                { type: "text", value: "The results showed a critical trade-off: While the combinatorial architecture successfully secures the system against major unknown failures (which the Random Forest alone misclassifies), it loses some sensitivity on extremely subtle, early-stage faults compared to the raw Autoencoder. However, the entire hybrid inference pipeline successfully runs in under 80 milliseconds on the ESP32, proving the immense potential of TinyML for critical industrial safety." }
              ]
            }
          ]
        }
      }
    },
    fr: {
      notFound: "/ recherche introuvable",
      logTitle: "/ détails de la recherche",
      projects: {
        "MRTA": {
          title: "Simulation de mission collaborative de drones intégrant des pannes",
          date: "Printemps 2026",
          description: "Étude et simulation approfondie d'algorithmes d'allocation de tâches multi-robots (MRTA) centralisés et décentralisés pour des flottes de drones confrontées à des pannes moteur.",
          image: "/coppelia.png",
          buttons: [
            { label: "Rapport Complet", url: "/Simulation de mission collaborative de drones intégrant des pannes.pdf", icon: <FaFilePdf /> },
            { label: "Démo (Pannes)", url: "https://youtu.be/NKEQDP3DuyE", icon: <FaImage /> },
            { label: "Démo (Standard)", url: "https://youtu.be/7jnT0Cy0X2E", icon: <FaImage /> }
          ],
          logs: [
            {
              title: "1. Contexte MRTA et Incertitudes Opérationnelles",
              content: [
                { type: "text", value: "L'allocation de tâches multi-robots (MRTA) consiste à coordonner une équipe pour accomplir un ensemble de tâches tout en minimisant les coûts globaux (temps, distance). Contrairement aux essaims, elle nécessite une coopération intentionnelle." },
                { type: "list", title: "La problématique de la centralisation :", items: [
                  "En conditions réelles, les drones subissent des contraintes dynamiques : batteries limitées, perte de réseau, ou pannes mécaniques.",
                  "Les algorithmes centralisés dépendent d'un planificateur unique. Si ce dernier tombe en panne, cela crée un Single Point of Failure (SPOF) critique qui stoppe net la mission entière."
                ]}
              ]
            },
            {
              title: "2. Algorithmes Évalués",
              content: [
                { type: "text", value: "Pour identifier l'approche la plus résiliente, trois algorithmes distincts ont été implémentés et comparés face à des pannes matérielles simulées :" },
                { type: "list", title: "Approches étudiées :", items: [
                  "Algorithme Hongrois (Centralisé) : Mathématiquement optimal et rapide pour les allocations simples, mais extrêmement vulnérable en cas d'imprévu.",
                  "DMCHBA (Distributed Hungarian-Based Algorithm) : Une variante décentralisée utilisant le 'smart-cloning' pour équilibrer intelligemment la matrice des coûts en une seule exécution globale.",
                  "Performance Impact (PI) : Algorithme distribué basé sur le consensus itératif (Inclusion, Consensus, Suppression). Les robots négocient localement selon leur coût de performance et leur distance."
                ]}
              ]
            },
            {
              title: "3. Architecture de Simulation Hybride",
              content: [
                { type: "text", value: "L'étude s'appuie sur une double architecture de simulation pour valider la robustesse physique et statistique des algorithmes." },
                { type: "list", title: "Environnements déployés :", items: [
                  "CoppeliaSim : Environnement physique 3D testant 3 robots terrestres équipés de détection d'obstacles. L'intelligence est gérée par des scripts Python communiquant via l'API ZMQ.",
                  "Python Headless : Un environnement d'exécution brut (sans interface) développé spécifiquement pour forcer des tests statistiques massifs, allant jusqu'à 20 robots, 200 ressources et un taux de panne moteur dynamique de 50%."
                ]}
              ]
            },
            {
              title: "4. Résultats Expérimentaux et Résilience",
              content: [
                { type: "text", value: "Durant la simulation, des pannes moteur subites étaient planifiées à des étapes clés (ex: après un nombre défini de tâches accomplies) forçant les drones fonctionnels à ré-exécuter l'allocation pour prendre le relais." },
                { type: "text", value: "L'algorithme centralisé s'est montré légèrement plus rapide en condition idéale, mais inapte à survivre à des pannes critiques. Les campagnes de tests massifs ont confirmé que l'approche DMCHBA est la plus robuste : son architecture distribuée efface le Single Point of Failure et son fonctionnement nécessite nettement moins de puissance de calcul que le Performance Impact pour faire aboutir la mission coûte que coûte." }
              ]
            }
          ]
        },
        "embedded_predictive_maintenance": {
          title: "Modèles non-supervisés pour la maintenance prédictive embarquée",
          date: "Été 2026",
          description: "Une comparaison exhaustive entre autoencodeurs, Random Forest et une architecture combinatoire déployée directement sur microcontrôleur ESP32 pour le pronostic de défaillances.",
          image: "/embeddeddetection.png",
          buttons: [
            { label: "Rapport Complet", url: "/rapport_stage_m2-1.pdf", icon: <FaFilePdf /> },
            { label: "Poster Scientifique", url: "/Soutenance Stage M2.pdf", icon: <FaImage /> },
            { label: "Code Source", url: "https://github.com/Alexandre1422/BearingFaultDetection_Stage_M2", icon: <FaGithub /> }
          ],
          logs: [
            {
              title: "1. Le Contexte de l'Industrie 4.0 et de l'Edge AI",
              content: [
                { type: "text", value: "L'arrêt inattendu d'une chaîne de production dû à des défaillances de roulements à billes représente un coût économique critique. L'objectif est de passer d'une maintenance réactive à une maintenance prédictive par l'analyse des signatures vibratoires." },
                { type: "list", title: "Défis technologiques :", items: [
                  "Edge Computing : Transmettre des milliers de points de données vers le cloud crée des problèmes de latence et de sécurité. Le traitement s'effectue localement, au plus près du capteur.",
                  "TinyML : Exécution de modèles d'IA sur des cibles extrêmement contraintes. L'ESP32 ne dispose que d'un CPU à 240 MHz et d'environ 520 Ko de mémoire vive (SRAM), sans accélérateur matériel."
                ]}
              ]
            },
            {
              title: "2. Prétraitement et Architectures Étudiées",
              content: [
                { type: "text", value: "Les signaux temporels bruts subissent d'abord une Transformée de Fourier Rapide (FFT), suivie d'une compression logarithmique et d'une normalisation Min-Max. Cela permet de faire ressortir les harmoniques mineures tout en compressant l'amplitude écrasante des pics de rotation fondamentale." },
                { type: "list", title: "Approches comparées :", items: [
                  "Random Forest (Supervisé) : Très précis sur les pannes connues (94.60% d'accuracy sur CWRU) et extrêmement léger. Cependant, il souffre du problème de 'classification forcée' : il classe à tort toute panne totalement inédite dans une catégorie connue, générant un faux diagnostic.",
                  "Autoencodeur (Non-supervisé) : Entraîné uniquement sur l'état sain, il force le passage du signal dans un goulot d'étranglement de 16 dimensions. Tout signal inconnu échoue à être reconstruit, faisant exploser l'erreur quadratique moyenne (MSE) et déclenchant l'alerte. Il agit comme un filet de sécurité absolu.",
                  "Architecture Combinatoire (AE + RF) : Un processus en deux étages. L'Autoencodeur agit comme un filtre universel et intransigeant. Si l'anomalie est avérée, le Random Forest intervient pour qualifier la panne mécanique précise."
                ]}
              ]
            },
            {
              title: "3. Transpilation et Déploiement sur ESP32",
              content: [
                { type: "text", value: "Pour être embarqué sur l'ESP32 sans carte SD, l'Autoencodeur a été compressé via TensorFlow Lite Converter et sérialisé sous forme de tableau statique C directement dans la mémoire Flash. L'allocation statique d'une 'Tensor Arena' empêche tout crash lié au dépassement mémoire (Heap Overflow)." },
                { type: "text", value: "Pour le Random Forest, une transpilation source-à-source innovante a été développée. Un script Python convertit intégralement le modèle entraîné (Scikit-Learn) en une gigantesque suite de règles conditionnelles natives en C++ (if/else). Cela supprime le besoin d'un framework d'IA, offrant une empreinte RAM quasi-nulle et un temps d'exécution record (3 à 4 millisecondes)." },
                { type: "code", value: "// Logique générée automatiquement par le transpilateur Python en C++\nvoid score_tree_0(float* features, float* probabilities) {\n  if (features[12] <= 0.5432) {\n    // Logique décisionnelle\n  }\n}" }
              ]
            },
            {
              title: "4. Résultats Expérimentaux et Cas Extrêmes",
              content: [
                { type: "text", value: "Le système a été lourdement éprouvé sur les datasets CWRU et MaFaulDa, incluant des 'cas pièges' extrêmes comme des anomalies totalement inconnues, des chocs mécaniques violents, ou des signaux plats (câble coupé)." },
                { type: "text", value: "Les résultats démontrent un compromis inévitable : si l'architecture combinatoire sécurise magistralement le système contre les pannes inconnues majeures (que le Random Forest seul classifiait à tort), elle perd légèrement en sensibilité face aux micro-défauts naissants par rapport à l'Autoencodeur pur. Toutefois, l'ensemble de l'inférence hybride s'exécute en moins de 80 millisecondes sur l'ESP32, prouvant l'immense viabilité du TinyML pour la sécurité industrielle critique." }
              ]
            }
          ]
        }
      }
    }
  };

  const currentTexts = logsData[lang];
  const project = currentTexts.projects[projectId];

  const renderContent = (content) => {
    return content.map((item, i) => {
      switch (item.type) {
        case "text":
          return <p key={i} className="article-text">{item.value}</p>;
        case "image":
          return (
            <div key={i} className="article-image-container">
              <img src={item.value} alt="Project detail" className="article-image" />
            </div>
          );
        case "list":
          return (
            <div key={i} className="article-list-container">
              {item.title && <div className="article-list-title">{item.title}</div>}
              <ul className="article-list">
                {item.items.map((li, j) => <li key={j}>{li}</li>)}
              </ul>
            </div>
          );
        case "tip":
          return <div key={i} className="article-tip">{item.value}</div>;
        case "code":
          return (
            <div key={i} className="article-code-container">
              <pre className="article-code">
                <code>{item.value}</code>
              </pre>
            </div>
          );
        case "diagram":
          return (
            <div key={i} className="article-diagram-container">
              <pre className="article-diagram">{item.value}</pre>
            </div>
          );
        default:
          return null;
      }
    });
  };

  if (!projectId || !project) {
    return (
      <div className="project-log-page">
        <div className="section-header">
          <Link to="/" className="back-button" style={{ marginRight: '20px', marginBottom: '15px', color: "#2DD4BF" }}>
            <FaArrowLeft size={18} style={{ color: "#2DD4BF" }}/>
          </Link>
          <span className="section-title">{currentTexts.notFound}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-log-page">
      <div className="section-header">
        <Link to="/" className="back-button" style={{ marginRight: '20px', marginBottom: '15px', color: '#2DD4BF' }}>
          <FaArrowLeft size={18} />
        </Link>
        <span className="section-title">{currentTexts.logTitle}</span>
      </div>
      
      <FadeInSection delay="200ms">
        <div className="project-log-header">
          <h1 className="project-log-title">{project.title}</h1>
          
          {project.image && (
            <div className="project-log-hero-wrapper" style={project.heroStyle || {}}>
              <div className="project-log-hero-container">
                <img src={project.image} alt={project.title} className="project-log-hero" />
              </div>
            </div>
          )}

          <p className="project-log-description">{project.description}</p>
          {project.date && <div className="project-log-date" style={{ color: "#2DD4BF" }}>{project.date}</div>}

          {/* 🔥 Zone dynamique pour les boutons modulables */}
          {project.buttons && project.buttons.length > 0 && (
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
              {project.buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-reels-link" // Réutilisation de ta classe CSS existante
                  style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                  {btn.icon}
                  <span className="reels-text">{btn.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </FadeInSection>

      <div className="project-log-container">
        {project.logs.map((log, i) => (
          <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
            <section className="article-section">
              <div className="article-header">
                <h2 className="article-title">{log.title}</h2>
              </div>
              <div className="article-content">
                {renderContent(log.content)}
              </div>
            </section>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}