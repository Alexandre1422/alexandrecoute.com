import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PCBAnimation from "./PCBAnimation";
import { FaEnvelope, FaDownload } from "react-icons/fa";

export default function Home({ lang = "en" }) {
  const texts = {
    en: {
      title: "hi, alex here.",
      subtitle: "I enjoy bringing ideas to life.",
      description: "I'm an embedded software engineer from France. I'm fascinated by robotics, complex algorithms, AI, and the IoT."
    },
    fr: {
      title: "salut, ici alex.",
      subtitle: "J’aime donner vie à mes idées.",
      description: "Je suis ingénieur en logiciels pour systèmes embarqués. Je suis passionné par la robotique, les algorithmes complexes, l'IA et l'IoT."
    }
  };

  const [displayedText, setDisplayedText] = useState("");
  const fullText = texts[lang].title;

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    // Ajout de relative, justify-center et overflow-hidden
    <section id="home" className="relative flex flex-col items-center justify-center text-center min-h-screen bg-background text-foreground px-4 scroll-mt-20 overflow-hidden">

      <PCBAnimation /> 
      
      {/* Conteneur optionnel pour s'assurer que le texte reste lisible au-dessus de l'animation */}
      <div className="z-10 flex flex-col items-center">
        <h1 className="m-0 text-5xl sm:text-5xl md:text-7xl font-bold drop-shadow-lg">
          <span
            dangerouslySetInnerHTML={{
              __html: displayedText.replace(/alex/g, "<span class='highlight'>alex</span>")
            }}
          />
          <span className="cursor">|</span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-blue-gray text-2xl sm:text-2xl md:text-4xl text-muted-foreground drop-shadow-md"
        >
          {texts[lang].subtitle}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-blue-gray max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed drop-shadow-md"
        >
          {texts[lang].description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 flex gap-4"
        >
          {/* Contraste corrigé : texte sombre sur fond clair */}
          <a
            href="mailto:alexandrecoute@outlook.fr"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-400 text-gray-900 font-bold hover:bg-teal-300 transition-all shadow-lg hover:shadow-teal-400/20"
          >
            <FaEnvelope className="text-lg" />
            {lang === "en" ? "Contact Me!" : "Contactez moi !"}
          </a>

          <a
            href={lang === "en" ? "/Resume_Alexandre_Couté.pdf" : "/CV_Alexandre_Couté_FR.pdf"}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 font-medium text-teal-400 transition-all border border-teal-400/30"
          >
            <FaDownload className="text-lg" />
            {lang === "en" ? "Resume" : "CV"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}