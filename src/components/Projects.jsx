import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Projects({ lang = "en" }) {
  const texts = {
    en: { title: "/ pet projects",
      projects: [
        {
          id: 1,
          title: "2048 RL",
          description:
            "A reinforcement learning project that plays the 2048 game.",
          tech: ["Python", "NumPy"],
          image: "/2048.png",
          github: "https://github.com/Alexandre1422/2048_rl",
        },
        {
          id: 2,
          title: "Christmas Calendar",
          description: "An interactive Christmas calendar web app.",
          tech: ["JavaScript", "CSS", "HTML"],
          image: "/christmascalendar.png",
          github: "https://github.com/Alexandre1422/christmascalendar",
          demo: "https://demo.com/project2",
        },
        {
          id: 3,
          title: "Cube Compute Shader",
          description: "A group project for 3D cube rendering forked on ComputeShaderStudio.",
          tech: ["GDScript", "Godot", "Compute Shaders"],
          image: "/cube.png",
          github: "https://github.com/mahboubiabdelkader/ComputeShaderStudio",
        },
        {
          id: 4,
          title: "NerdzByNight",
          description: "A group web project made on one night for nuitdelinfo.com.",
          tech: ["JavaScript", "PHP", "CSS", "HTML"],
          image: "/NerdzByNight.png",
          github: "https://github.com/EwannDelacre/NerdzByNight",
          demo: "https://nuitdelinfo-nine.vercel.app/",
        }
      ]
    },
    fr: { title: "/ projets parallèles",
      projects: [
        {
          id: 1,
          title: "2048 RL",
          description:
            "Un projet de reinforcement learning qui joue au jeu 2048.",
          tech: ["Python", "NumPy"],
          image: "/2048.png",
          github: "https://github.com/Alexandre1422/2048_rl",
        },
        {
          id: 2,
          title: "Calendrier de l'Avent",
          description: "Une application web interactive de calendrier de l'Avent.",
          tech: ["JavaScript", "CSS", "HTML"],
          image: "/christmascalendar.png",
          github: "https://github.com/Alexandre1422/christmascalendar",
          demo: "https://demo.com/project2",
        },
        {
          id: 3,
          title: "Cube Compute Shader",
          description: "Un projet de groupe pour le rendu 3D de cubes forké sur ComputeShaderStudio.",
          tech: ["GDScript", "Godot", "Compute Shaders"],
          image: "/cube.png",
          github: "https://github.com/mahboubiabdelkader/ComputeShaderStudio",
          demo: "https://demo.com/project3",
        },
        {
          id: 4,
          title: "NerdzByNight",
          description: "Un projet web de groupe réalisé en une nuit pour nuitdelinfo.com.",
          tech: ["JavaScript", "PHP", "CSS", "HTML"],
          image: "/NerdzByNight.png",
          github: "https://github.com/EwannDelacre/NerdzByNight",
          demo: "https://nuitdelinfo-nine.vercel.app/",
        }
      ]
    },
  };

  const projects = texts[lang].projects;

  // Slides avec clones
  const slides = [
    projects[projects.length - 1], // clone dernier
    ...projects,
    projects[0], // clone premier
  ];

  const [current, setCurrent] = useState(1); // on commence sur le vrai premier
  const [transition, setTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide avec pause au survol
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrent((prev) => prev - 1);
  };

  // Gérer le reset invisible quand on atteint un clone
  useEffect(() => {
    if (current === slides.length - 1) {
      // clone du premier
      setTimeout(() => {
        setTransition(false);
        setCurrent(1); // reset au vrai premier
      }, 700);
    }
    if (current === 0) {
      // clone du dernier
      setTimeout(() => {
        setTransition(false);
        setCurrent(slides.length - 2); // reset au vrai dernier
      }, 700);
    }
  }, [current, slides.length]);

  // Quand on reset, réactiver la transition
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  }, [transition]);

  return (
    <section
      id="projects"
      className="mb-20 bg-background text-foreground px-6 py-16 max-w-5xl mx-auto"
    >
      {/* Titre */}
      <div className="flex items-center mt-10 mb-12">
        <h2 className="flex items-center gap-4 text-4xl font-black">
          <span>{texts[lang].title}</span>
        </h2>
        <div className="flex-1 h-px bg-gray-700 ml-4"></div>
      </div>

      {/* Carrousel */}
      <div
        className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex h-full ${
            transition ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((project, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 relative">
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay noir */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Contenu */}
              <div className="absolute bottom-0 left-0 right-0 text-center p-6 z-10">
                <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-2">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap justify-center mb-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-teal-400 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Icônes */}
                <div className="flex justify-center gap-6 mt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-teal-400 text-xl"
                  >
                    <FaGithub />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-teal-400 text-xl"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flèches */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index + 1)} // +1 car clone au début
            className={`cursor-pointer w-8 h-1 rounded-full transition-all ${
              index + 1 === current ? "bg-teal-400" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
