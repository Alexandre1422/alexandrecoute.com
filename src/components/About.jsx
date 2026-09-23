import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function About({ lang = "en" }) {
  const rotationRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const maxDeg = 20; // rotation max ±20°

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // rotation relative au centre, centrée sur 0
    const rotateY = ((x / rect.width - 0.5) * 2) * maxDeg; 
    const rotateX = -((y / rect.height - 0.5) * 2) * maxDeg;

    rotationRef.current = { x: rotateX, y: rotateY };

    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(updateRotation);
    }
  };

  const updateRotation = () => {
    // interpolation simple pour smoothing
    setRotation((prev) => ({
      x: prev.x + (rotationRef.current.x - prev.x) * 0.25,
      y: prev.y + (rotationRef.current.y - prev.y) * 0.25,
    }));
    requestRef.current = requestAnimationFrame(updateRotation);
  };

  const handleMouseLeave = () => {
    rotationRef.current = { x: 0, y: 0 };
    setRotation({ x: 0, y: 0 });
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  const texts = {
    en: {
      title: "/ about me",
      description: (
        <>
          I am currently on my last year of{" "}
          <strong className="font-extrabold text-white">
            Master&apos;s in Embedded Software Engineering
          </strong>{" "}
          at{" "}
          <span className="text-teal-400 font-semibold">
            Université de Bretagne Occidentale
          </span>
          . At the moment, I am seeking for a{" "}
          <strong className="font-bold text-white">full-time, Master's level position in development (embedded, software, etc.)</strong>{" "}
          starting in September 2026.
        </>
      ),
      techIntro: "Here are some technologies I have been working with:",
      technologies: [
        "C / C++",
        "Python",
        "Ada",
        "Java / C#",
        "Go",
        "Godot",
        "Embedded Linux",
        "RTOS",
        "FPGA (VHDL/Verilog)",
        "TensorFlow / PyTorch",
        "JavaScript / React / VueJS",
      ],
    },
    fr: {
      title: "/ à propos de moi",
      description: (
        <>
          Je viens tout juste d'être diplômée d'un{" "}
          <strong className="font-extrabold text-white">
            Master Logiciels pour Systèmes Embarqués (mention Bien)
          </strong>{" "}
          à{" "}
          <span className="text-teal-400 font-semibold">
            l&apos;Université de Bretagne Occidentale
          </span>
          . Je suis actuellement à la recherche d&apos;un{" "}
          <strong className="font-bold text-white">poste à temps plein de niveau bac+5 dans le développement (embarqué, logiciel, etc.)</strong>{" "}
          à partir de septembre 2026.
        </>
      ),
      techIntro: "Voici quelques technologies avec lesquelles j’ai travaillé :",
      technologies: [
        "C / C++",
        "Python",
        "Ada",
        "Java / C#",
        "Go",
        "Godot",
        "Linux embarqué",
        "RTOS",
        "FPGA (VHDL/Verilog)",
        "TensorFlow / PyTorch",
        "JavaScript / React / VueJS",
      ],
    },
  };

  return (
    <section
      id="about"
      className="bg-background text-foreground px-6 py-8 max-w-5xl mx-auto"
    >
      {/* Titre */}
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

      {/* Contenu */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Colonne gauche : description + techno */}
        <div>
          <motion.p 
            className="text-lg text-blue-gray text-foreground/80 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {texts[lang].description}
          </motion.p>
          <motion.p 
            className="text-md text-blue-gray font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {texts[lang].techIntro}
          </motion.p>

          <ul className="grid grid-cols-2 gap-2 text-blue-gray text-foreground/70">
            {texts[lang].technologies.map((tech, index) => (
              <motion.li 
                key={index} className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2*(0.5*index) }}
                viewport={{ once: true }}
              >
                <span className="text-teal-400">▹</span>
                {tech}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Colonne droite : photo */}
        <div className="hidden md:flex justify-center">
          <div className="[perspective:1000px]">
            <img
              src="/photo1_1.jpg"
              alt="Me"
              className="rounded-2xl shadow-lg max-w-xs transition-transform duration-150 transform-gpu"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
