import React, { useState, useEffect } from "react";
import Helix from "./Helix";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

  // Effet machine à écrire
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
    <section id="home" className="flex flex-col items-center justify-start text-center min-h-screen bg-background text-foreground px-4 scroll-mt-20">

      <Helix /> {/* 🎉 Animation au-dessus du titre */}
      
      {/* Titre avec curseur */}
      <h1 className="m-0 text-5xl sm:text-5xl md:text-7xl font-bold">
        <span
          dangerouslySetInnerHTML={{
            __html: displayedText.replace(/alex/g, "<span class='highlight'>alex</span>")
          }}
        />
        <span className="cursor">|</span>
      </h1>




      {/* Phrase d'accroche */}
      <p className="mt-4 text-blue-gray text-2xl sm:text-2xl md:text-4xl text-muted-foreground">
        {texts[lang].subtitle}
      </p>

      {/* Description */}
      <p className="mt-6 text-blue-gray max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80">
        {texts[lang].description}
      </p>

      {/* Bouton mailto */}
      <a
        href="mailto:alexandrecoute@outlook.fr"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-400 text-white font-medium hover:bg-teal-500 transition-all"
      >
        <FaEnvelope className="text-lg" />
        {lang === "en" ? "Say hi!" : "Dis bonjour !"}
      </a>
    </section>
  );
}
