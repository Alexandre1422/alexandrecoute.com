import React from "react";

export default function About({ lang = "en" }) {
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
            University of Western Brittany
          </span>
          . At the moment, I am seeking for a{" "}
          <strong className="font-bold text-white">6-month internship</strong>{" "}
          starting in March 2026 (and maybe a full-time position afterwards).
        </>
      ),
      techIntro: "Here are some technologies I have been working with:",
      technologies: [
        "C / C++",
        "Python",
        "Java",
        "Go",
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
          Je suis actuellement en dernière année de{" "}
          <strong className="font-extrabold text-white">
            Master Logiciels pour Systèmes Embarqués
          </strong>{" "}
          à{" "}
          <span className="text-teal-400 font-semibold">
            l&apos;Université de Bretagne Occidentale
          </span>
          . En ce moment, je suis à la recherche d&apos;un{" "}
          <strong className="font-bold text-white">stage de 6 mois</strong>{" "}
          à partir de mars 2026 (et peut-être d&apos;un poste à temps plein par la suite).
        </>
      ),
      techIntro: "Voici quelques technologies avec lesquelles j’ai travaillé :",
      technologies: [
        "C / C++",
        "Python",
        "Java",
        "Go",
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
      <div className="flex items-center mt-10 mb-12">
        <h2 className="flex items-center gap-4 text-4xl font-black">
          <span>{texts[lang].title}</span>
        </h2>
        <div className="flex-1 h-px bg-gray-700 ml-4"></div>
      </div>

      {/* Contenu */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Colonne gauche : description + techno */}
        <div>
          <p className="text-lg text-blue-gray text-foreground/80 mb-6">{texts[lang].description}</p>
          <p className="text-md text-blue-gray font-semibold mb-4">{texts[lang].techIntro}</p>

          <ul className="grid grid-cols-2 gap-2 text-blue-gray text-foreground/70">
            {texts[lang].technologies.map((tech, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-teal-400">▹</span>
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne droite : photo */}
        <div className="hidden md:flex justify-center">
          <img
            src="/photo1_1.jpg" // ⚠️ Mets ton image dans public/
            alt="Me"
            className="rounded-2xl shadow-lg max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}
