import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";

function App() {
  const [lang, setLang] = useState("en"); // État global du langage

  const footerTexts = {
    en: {
      built: "Built and designed by Alexandre Couté.",
      rights: "All rights reserved. ©",
    },
    fr: {
      built: "Conçu et développé par Alexandre Couté.",
      rights: "Tous droits réservés. ©",
    },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col">
      {/* Header */}
      <Header setLang={setLang} />

      {/* Main content */}
      <main className="flex-grow pt-20 p-6">
        <Home lang={lang} />
        <About lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
      </main>

      {/* Footer */}
      <footer className="text-gray-500 text-center text-sm py-6">
        <p>{footerTexts[lang].built}</p>
        <p>{footerTexts[lang].rights}</p>
      </footer>
    </div>
  );
}

export default App;
