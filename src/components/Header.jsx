import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link';

export default function Header({ setLang }) {
  const [language, setLanguage] = useState("FR");
  const [clicked, setClicked] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === "FR" ? "EN" : "FR";
    setLanguage(newLang);
    if (setLang) setLang(newLang.toLowerCase());

    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  const highlightColor = "rgb(99, 255, 219)";

  const navTexts = {
    EN: [
      { label: "Home", id: "home" },
      { label: "About", id: "about" },
      { label: "Experience", id: "experience" },
      { label: "Projects", id: "projects" },
      { label: "Research", id: "research" }
    ],
    FR: [
      { label: "Accueil", id: "home" },
      { label: "À propos", id: "about" },
      { label: "Expérience", id: "experience" },
      { label: "Projets", id: "projects" },
      { label: "Recherche", id: "research" }
    ]
  };

  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full z-50 font-sans top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">

        {/* Logo + Navigation */}
        <div className="flex items-center space-x-6">
          {/* Remplacement du lien <a> classique par HashLink */}
          <HashLink 
            smooth 
            to="/#home" 
            className="hover:text-teal-400 transition-colors cursor-pointer"
          >
            <h1 className="text-xl font-bold">Alexandre Couté</h1>
          </HashLink>
          <nav>
            <ul className="hidden md:flex space-x-4 text-sm">
              {navTexts[language].map((item, i) => (
                <li key={i}>
                  {/* Remplacement du lien <a> classique par HashLink */}
                  <HashLink
                    smooth
                    to={`/#${item.id}`} // Force le passage par la racine "/" avant de cibler l'ID
                    className="transition-colors cursor-pointer"
                    style={{ color: "white" }}
                    onMouseEnter={e => (e.currentTarget.style.color = highlightColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = "white")}
                  >
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Icônes + Language switch */}
        <div className="flex items-center space-x-3">
          {[
            { icon: FaEnvelope, href: "mailto:alexandre.coute@outlook.fr" },
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