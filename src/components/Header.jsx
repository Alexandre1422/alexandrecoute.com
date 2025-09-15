import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Header({ setLang }) {
  const [language, setLanguage] = useState("EN");
  const [clicked, setClicked] = useState(false); // pour effet de highlight

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "FR" : "EN";
    setLanguage(newLang);
    if (setLang) setLang(newLang.toLowerCase());

    // Effet de highlight
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  const highlightColor = "rgb(99, 255, 219)";

  // Traductions des liens
  // Traductions des liens (texte affiché)
  const navTexts = {
    EN: [
      { label: "Home", id: "home" },
      { label: "About", id: "about" },
      { label: "Experience", id: "experience" },
      { label: "Projects", id: "projects" }
    ],
    FR: [
      { label: "Accueil", id: "home" },
      { label: "À propos", id: "about" },
      { label: "Expérience", id: "experience" },
      { label: "Projets", id: "projects" }
    ]
  };


  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full z-50 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">

        {/* Logo + Navigation */}
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Alexandre Couté</h1>
          <nav>
            <ul className="hidden md:flex space-x-4 text-sm">
              {navTexts[language].map((item, i) => (
                <li key={i}>
                  <a
                    href={`#${item.id}`}   // 🔥 toujours en anglais
                    className="transition-colors"
                    style={{ color: "white" }}
                    onMouseEnter={e => (e.currentTarget.style.color = highlightColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = "white")}
                  >
                    {item.label}   {/* 🔥 traduit */}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* icon: SiLeetcode, href: "https://leetcode.com/u/twigtwig/" */}
        {/* Icônes + Language switch */}
        <div className="flex items-center space-x-3">
          {[{ icon: FaEnvelope, href: "mailto:alexandre.coute@outlook.fr" },
            { icon: FaGithub, href: "https://github.com/Alexandre1422" },
            { icon: FaLinkedin, href: "https://www.linkedin.com/in/alexandre-coute/" }
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              <Icon
                className="w-4 h-4 transition-colors"
                style={{ color: "white" }}
                onMouseEnter={e => (e.currentTarget.style.color = highlightColor)}
                onMouseLeave={e => (e.currentTarget.style.color = "white")}
              />
            </a>
          ))}

          <button
            onClick={toggleLanguage}
            className={`ml-6 px-2 py-1 text-sm border border-white rounded transition-all
              ${clicked ? "bg-teal-400 text-gray-900" : "bg-transparent text-white"}`}
          >
            {language}
          </button>
        </div>
      </div>
    </header>
  );
}
