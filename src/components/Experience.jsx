import React, { useState } from "react";
import { motion } from "framer-motion";

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
        { id: "us", company: "Universidade de São Paulo & Université de Bretagne Occidentale", role: "Research Intern", period: "MAR 2026 - JUL 2026", description: "Research and development in embedded Artificial Intelligence (TinyML) for industrial predictive maintenance on ESP32 microcontrollers. The project focused on evaluating and optimizing machine learning models, comparing unsupervised (standard and variational Autoencoders) and supervised (Random Forest) approaches to analyze vibration signals. The technical scope involved hardware-specific model compression using TensorFlow Lite and native C++ transpilation to minimize memory footprint and inference latency." },
        { id: "ub", company: "Université de Bretagne Occidentale", role: "Research Intern", period: "APR 2025 - JUN 2025", description: "Research on algorithms addressing multi-robot task allocation problems. Implementation and testing of the Hungarian algorithm and Q-learning on CoppeliaSim." },
        { id: "ys", company: "Yvon Salaun", role: "Web Developer and Designer Intern", period: "APR 2024 - JUN 2024", description: "Redesign of the company's showcase website. Added an administration section for customer requests and inventory management for the repair shop. Website: depannagesalaun.fr" },
        { id: "aei", company: "AEI Services", role: "Web Developer and Designer Intern", period: "DEC 2022 - JAN 2023", description: "Redesign of an internal web application for managing clients, client requests, and time tracking for repair tasks. Developed internal tools to improve productivity." },
        { id: "cy", company: "Cyllene", role: "Web Developer Intern", period: "MAY 2022 - JUN 2022", description: "Created a web application for calculating profit sheets for a garage. Calculated profits for each operation performed by an employee. Exported these profit sheets in various formats." }
      ]
    },
    fr: {
      title: "/ experience",
      experiences: [
        { id: "us", company: "Universidade de São Paulo & Université de Bretagne Occidentale", role: "Stagiaire chercheur", period: "MAR 2026 - JUIL 2026", description: "Recherche et développement en intelligence artificielle embarquée (TinyML) pour la maintenance prédictive industrielle sur microcontrôleur ESP32. Le projet s'est concentré sur l'évaluation et l'optimisation de modèles d'apprentissage automatique, en comparant des approches non supervisées (Autoencodeurs standard et variationnels) et supervisées (Random Forest) pour l'analyse de signaux vibratoires. Le travail technique a impliqué la compression matérielle des modèles via TensorFlow Lite et leur conversion en C++ natif pour minimiser l'empreinte mémoire et la latence d'inférence." },
        { id: "ub", company: "Université de Bretagne Occidentale", role: "Stagiaire chercheur", period: "AVR 2025 - JUIN 2025", description: "Recherche sur des algorithmes d’allocation de tâches pour des systèmes multi-robots. Implémentation et tests de l’algorithme hongrois et du Q-learning sur CoppeliaSim." },
        { id: "ys", company: "Yvon Salaun", role: "Stagiaire développeur et concepteur web", period: "AVR 2024 - JUIN 2024", description: "Refonte du site vitrine de l’entreprise, avec l’ajout d’une interface d’administration pour la gestion des demandes clients et de l’inventaire du magasin de dépannage. Site : depannagesalaun.fr" },
        { id: "aei", company: "AEI Services", role: "Stagiaire développeur et concepteur web", period: "DEC 2022 - JAN 2023", description: "Refonte d’une application web interne dédiée à la gestion de la clientèle, aux demandes clients et au calcul du temps par tâche pour les réparations d’objets. Développement d’outils internes visant à améliorer la productivité." },
        { id: "cy", company: "Cyllene", role: "Stagiaire développeur web", period: "MAI 2022 - JUIN 2022", description: "Réalisation d’une application web permettant le calcul des feuilles de marge pour un garage. Suivi des bénéfices générés par chaque opération réalisée par un employé, avec export des feuilles de marge dans différents formats." }
      ]
    }
  };

  const [selected, setSelected] = useState("us");
  const current = texts[lang].experiences.find((exp) => exp.id === selected);

  return (
    <section
      id="experience"
      className="bg-background text-foreground px-6 py-8 max-w-5xl mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="flex items-center mt-10 mb-12"
      >
        <h2 className="flex items-center gap-4 text-4xl font-black">
          <span>{texts[lang].title}</span>
        </h2>
        <div className="flex-1 h-px bg-gray-700 ml-4"></div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Liste des expériences */}
        <motion.div
          className="flex flex-col gap-4 text-sm font-mono relative md:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          {texts[lang].experiences.map((exp) => (
            <RippleButton
              key={exp.id}
              exp={exp}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </motion.div>

        {/* Détail de l'expérience */}
        <div className="flex-1 md:w-2/3 mt-8 md:mt-0">
          <motion.h3 
            className="text-xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {current.role}{" "}
            <span className="text-foreground">
              {lang === "en" ? "@" : "à"}{" "}
              <span className="text-teal-400">{current.company}</span>
            </span>
          </motion.h3>
          <motion.p 
            className="text-base text-gray-400 mt-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {current.period}
          </motion.p>
          <motion.p 
            className="mt-4 text-base text-foreground/90 text-blue-gray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            {current.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
