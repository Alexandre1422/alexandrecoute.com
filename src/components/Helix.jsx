import React, { useEffect } from "react";
import "./Helix.css"; // on garde le CSS séparé pour la lisibilité

export default function Helix() {
  useEffect(() => {
    const helix = document.getElementById("helix");
    if (!helix) return;

    const numCubes = 20;
    const radius = 50;
    const spacing = 15;

    for (let i = 0; i < numCubes; i++) {
      // colonne gauche
      const cubeL = document.createElement("div");
      cubeL.className = "cube";
      const angleL = i * 20;
      for (let j = 0; j < 12; j++) {
        const edge = document.createElement("div");
        edge.className = "edge";

        cubeL.appendChild(edge);
      }

      
      
      const yL = i * spacing;
      const xL = Math.cos((angleL * Math.PI) / 180) * radius;
      const zL = Math.sin((angleL * Math.PI) / 180) * radius;
      cubeL.style.transform = `translateX(${xL}px) translateY(${yL}px) translateZ(${zL}px) rotateY(${angleL}deg)`;
      helix.appendChild(cubeL);

      // colonne droite
      const cubeR = document.createElement("div");
      cubeR.className = "cube";
      for (let j = 0; j < 12; j++) {
        const edge = document.createElement("div");
        edge.className = "edge";
        cubeR.appendChild(edge);
      }
      const angleR = angleL + 180;
      const xR = Math.cos((angleR * Math.PI) / 180) * radius;
      const zR = Math.sin((angleR * Math.PI) / 180) * radius;
      cubeR.style.transform = `translateX(${xR}px) translateY(${yL}px) translateZ(${zR}px) rotateY(${angleR}deg)`;
      helix.appendChild(cubeR);
    }
  }, []);

  return <div className="helix" id="helix"></div>;
}
