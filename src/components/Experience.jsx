import React, { useState } from "react";

function RippleButton({ exp, selected, setSelected }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    setSelected(exp.id);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative overflow-hidden w-full text-left px-4 py-3 rounded-md border transition-all
        ${
          selected === exp.id
            ? "border-gray-700 text-teal-400 font-bold"
            : "border-gray-800 text-gray-400 hover:text-gray-200"
        }
      `}
    >
      <span className="uppercase tracking-wide">{exp.company}</span>

      {selected === exp.id && (
        <div className="absolute right-0 top-0 h-full w-1 bg-teal-400 rounded-r-md transition-all" />
      )}

      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute bg-teal-400/30 rounded-full animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            transform: "translate(-50%, -50%)",
            width: 20,
            height: 20
          }}
        />
      ))}
    </button>
  );
}

export default function Experience({ lang = "en" }) {
  const texts = {
    en: {
      title: "/ experience",
      experiences: [
        { id: "ub", company: "University of Western Brittany", role: "Research Intern", period: "APR 2025 - JUN 2025", description: "Research on algorithms addressing multi-robot task allocation problems. Implementation and testing of the Hungarian algorithm and Q-learning on CoppeliaSim." },
        { id: "ys", company: "Yvon Salaun", role: "Web Developer and Designer Intern", period: "APR 2024 - JUN 2024", description: "Redesign of the company's showcase website. Added an administration section for customer requests and inventory management for the repair shop. Website: depannagesalaun.fr" },
        { id: "aei", company: "AEI Services", role: "Web Developer and Designer Intern", period: "DEC 2022 - JAN 2023", description: "Redesign of an internal web application for managing clients, client requests, and time tracking for repair tasks. Developed internal tools to improve productivity." },
        { id: "cy", company: "Cyllene", role: "Web Developer Intern", period: "MAY 2022 - JUN 2022", description: "Created a web application for calculating profit sheets for a garage. Calculated profits for each operation performed by an employee. Exported these profit sheets in various formats." }
      ]
    },
    fr: {
      title: "/ experience",
      experiences: [
        { id: "ub", company: "Université de Bretagne Occidentale", role: "Stagiaire chercheur", period: "AVR 2025 - JUIN 2025", description: "Recherche sur des algorithmes répondant aux problèmes d'allocation de tâches pour des systèmes multi-robot. Implémentation et test de l'algorithme hongrois et du Q-learning sur CoppeliaSim." },
        { id: "ys", company: "Yvon Salaun", role: "Stagiaire développeur et concepteur web", period: "AVR 2024 - JUIN 2024", description: "Refonte du site vitrine de l'entreprise. Ajout d'une partie administration concernant les demandes clients et l'inventaire du magasin de dépannage. Site : depannagesalaun.fr" },
        { id: "aei", company: "AEI Services", role: "Stagiaire développeur et concepteur web", period: "DEC 2022 - JAN 2023", description: "Refonte d'une application web interne à l'entreprise de gestion de clientele, de demande clientele et de calcul de temps par tâches pour des réparations d'objets. Développement d'outils internes pour améliorer la productivité." },
        { id: "cy", company: "Cyllene", role: "Stagiaire développeur web", period: "MAI 2022 - JUIN 2022", description: "Réalisation d'une application web permettant le calcul de feuille de marge pour un garage. Calcul des bénéfices réalisé pour chaque opération d'un employé. Export de ces feuilles de marges sous différents formats." }
      ]
    }
  };

  const [selected, setSelected] = useState("ub");
  const current = texts[lang].experiences.find((exp) => exp.id === selected);

  return (
    <section
      id="experience"
      className="bg-background text-foreground px-6 py-8 max-w-5xl mx-auto"
    >
      <div className="flex items-center mt-10 mb-12">
        <h2 className="flex items-center gap-4 text-4xl font-black">
          <span>{texts[lang].title}</span>
        </h2>
        <div className="flex-1 h-px bg-gray-700 ml-4"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Liste des expériences */}
        <div className="flex flex-col gap-4 text-sm font-mono relative md:w-1/3">
          {texts.en.experiences.map((exp) => (
            <RippleButton
              key={exp.id}
              exp={exp}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>

        {/* Détail de l'expérience */}
        <div className="flex-1 md:w-2/3 mt-8 md:mt-0">
          <h3 className="text-xl font-bold">
            {current.role}{" "}
            <span className="text-foreground">
              {lang === "en" ? "@" : "à"}{" "}
              <span className="text-teal-400">{current.company}</span>
            </span>
          </h3>
          <p className="text-base text-gray-400 mt-1">{current.period}</p>
          <p className="mt-4 text-base text-foreground/90 text-blue-gray">
            {current.description}
          </p>
        </div>
      </div>
    </section>
  );
}
