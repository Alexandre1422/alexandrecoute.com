import React, { useEffect, useRef } from 'react';

const PCBAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const grid = 20; 
    const speed = 1.5; 
    const cyan = '99, 255, 219';
    
    let chips = [];
    let traces = [];

    // --- ZONE PROTEGEE (Keep-Out Zone pour le texte) ---
    // --- ZONE PROTEGEE (Keep-Out Zone pour le texte) ---
    const isInsideKeepOutZone = (x, y) => {
      const w = canvas.width;
      const h = canvas.height;
      const isMobile = w < 768; // Détecte si on est sur mobile

      // Sur mobile, la zone de protection prend presque toute la largeur
      // et s'étend un peu plus en hauteur pour couvrir les boutons
      const minX = isMobile ? w * -0.01 : w * 0.30;
      const maxX = isMobile ? w * 1 : w * 0.70;
      const minY = isMobile ? h * 0.25 : h * 0.30;
      const maxY = isMobile ? h * 0.75 : h * 0.70;

      return x > minX && x < maxX && y > minY && y < maxY;
    };

    // --- GENERATION DES COMPOSANTS ---
    const generateComponents = (w, h) => {
      const isMobile = w < 768;

      if (isMobile) {
        // DISPOSITION MOBILE : On pousse tout aux extrémités haut/bas
        return [
          // Petit CPU en haut à gauche
          { x: Math.floor((w * 0.1) / grid) * grid, y: Math.floor((h * 0.05) / grid) * grid, w: grid * 3, h: grid * 3, type: 'cpu' },
          // CPU en bas au centre/droite
          { x: Math.floor((w * 0.7) / grid) * grid, y: Math.floor((h * 0.80) / grid) * grid, w: grid * 4, h: grid * 4, type: 'cpu' },
          // Barrette de RAM en haut à droite
          { x: Math.floor((w * 0.75) / grid) * grid, y: Math.floor((h * 0.1) / grid) * grid, w: grid * 2, h: grid * 4, type: 'ram' },
          // Un petit composant en bas à gauche
          { x: Math.floor((w * 0.1) / grid) * grid, y: Math.floor((h * 0.9) / grid) * grid, w: grid * 2, h: grid * 1, type: 'smd' }
        ];
      }

      // DISPOSITION PC (Celle que tu avais, repoussée dans les coins)
      return [
        { x: Math.floor((w * 0.3) / grid) * grid, y: Math.floor((h * 0.7) / grid) * grid, w: grid * 5, h: grid * 5, type: 'cpu' },
        { x: Math.floor((w * 0.7) / grid) * grid, y: Math.floor((h * 0.2) / grid) * grid, w: grid * 2, h: grid * 6, type: 'ram' },
        { x: Math.floor((w * 0.1) / grid) * grid, y: Math.floor((h * 0.6) / grid) * grid, w: grid * 4, h: grid * 2, type: 'ram' },
        { x: Math.floor((w * 0.2) / grid) * grid, y: Math.floor((h * 0.2) / grid) * grid, w: grid * 1, h: grid * 2, type: 'smd' },
        { x: Math.floor((w * 0.8) / grid) * grid, y: Math.floor((h * 0.7) / grid) * grid, w: grid * 2, h: grid * 1, type: 'smd' },
        { x: Math.floor((w * 0.6) / grid) * grid, y: Math.floor((h * 0.8) / grid) * grid, w: grid * 2, h: grid * 1, type: 'smd' }
      ];
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const currentWidth = parent.clientWidth || window.innerWidth;
      const currentHeight = parent.clientHeight || window.innerHeight;
      
      canvas.width = Math.floor(currentWidth / grid) * grid;
      canvas.height = Math.floor(currentHeight / grid) * grid; 
      
      chips = generateComponents(canvas.width, canvas.height);
      traces = [];
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- LOGIQUE DES COURANTS ELECTRIQUES (TRACES) ---
    class Trace {
      constructor() {
        // Force l'apparition en dehors de la zone de texte
        do {
          this.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
          this.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
        } while (isInsideKeepOutZone(this.x, this.y));
        
        this.target = chips.length > 0 ? chips[Math.floor(Math.random() * chips.length)] : null;
        
        this.dirs = [
          [1, 0], [1, 1], [0, 1], [-1, 1],
          [-1, 0], [-1, -1], [0, -1], [1, -1]
        ];
        this.dirIndex = Math.floor(Math.random() * 8);
        this.life = Math.floor(Math.random() * 200) + 100; 
        this.dead = false;
        this.drawVia = true;
      }

      update() {
        if (this.dead || !this.target) return;
        this.life--;

        const hitTarget = (
          this.x >= this.target.x - grid && this.x <= this.target.x + this.target.w + grid && 
          this.y >= this.target.y - grid && this.y <= this.target.y + this.target.h + grid
        );

        if (this.life <= 0 || hitTarget) {
          this.dead = true;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${cyan})`;
          ctx.fill();
          return;
        }

        if (this.x % grid === 0 && this.y % grid === 0) {
          if (this.drawVia) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${cyan})`;
            ctx.fill();
            this.drawVia = false;
          }

          const targetX = this.target.x + this.target.w / 2;
          const targetY = this.target.y + this.target.h / 2;
          const angleToTarget = Math.atan2(targetY - this.y, targetX - this.x);
          
          let idealDir = Math.round(angleToTarget / (Math.PI / 4));
          idealDir = (idealDir + 8) % 8;

          if (Math.random() < 0.4) {
            const diff = (idealDir - this.dirIndex + 8) % 8;
            if (diff === 1 || diff === 2 || diff === 3) this.dirIndex = (this.dirIndex + 1) % 8;
            else if (diff === 5 || diff === 6 || diff === 7) this.dirIndex = (this.dirIndex + 7) % 8;
          } else if (Math.random() < 0.1) {
            this.dirIndex = (this.dirIndex + (Math.random() > 0.5 ? 1 : 7)) % 8;
          }
        }

        const dx = this.dirs[this.dirIndex][0] * speed;
        const dy = this.dirs[this.dirIndex][1] * speed;
        const nextX = this.x + dx;
        const nextY = this.y + dy;

        // VERIFICATION DE LA KEEP-OUT ZONE AVANT D'AVANCER
        if (isInsideKeepOutZone(nextX, nextY)) {
          this.dead = true;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${cyan})`;
          ctx.fill();
          return;
        }

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(nextX, nextY);
        ctx.strokeStyle = `rgba(${cyan}, 0.9)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        this.x = nextX;
        this.y = nextY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.dead = true;
        }
      }
    }

    const drawChips = () => {
      chips.forEach(c => {
        ctx.clearRect(c.x, c.y, c.w, c.h); 
        ctx.strokeStyle = `rgba(${cyan}, 0.6)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(c.x, c.y, c.w, c.h);

        ctx.fillStyle = `rgba(${cyan}, 0.8)`;
        const pinSize = 4;
        
        if (c.type === 'cpu' || c.type === 'ram') {
          const pinSpacing = grid / 2;
          for (let px = c.x + pinSpacing; px < c.x + c.w; px += pinSpacing) {
            ctx.fillRect(px - pinSize / 2, c.y - pinSize, pinSize, pinSize); 
            ctx.fillRect(px - pinSize / 2, c.y + c.h, pinSize, pinSize); 
          }
          if (c.type === 'cpu') {
            for (let py = c.y + pinSpacing; py < c.y + c.h; py += pinSpacing) {
              ctx.fillRect(c.x - pinSize, py - pinSize / 2, pinSize, pinSize); 
              ctx.fillRect(c.x + c.w, py - pinSize / 2, pinSize, pinSize); 
            }
          }
        } else if (c.type === 'smd') {
          if (c.w > c.h) { 
            ctx.fillRect(c.x, c.y, pinSize, c.h);
            ctx.fillRect(c.x + c.w - pinSize, c.y, pinSize, c.h);
          } else { 
            ctx.fillRect(c.x, c.y, c.w, pinSize);
            ctx.fillRect(c.x, c.y + c.h - pinSize, c.w, pinSize);
          }
        }
      });
    };

    const animate = (w) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'source-over';

      traces.forEach(t => t.update());
      traces = traces.filter(t => !t.dead);
      const isMobile = w < 768;
      const tracesLimit = isMobile ? 1 : 10;
      if (chips.length > 0) {
        while (traces.length < tracesLimit) {
          traces.push(new Trace());
        }
      }

      drawChips();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-60">
      <canvas 
        ref={canvasRef} 
        style={{ display: 'block', width: '100%', height: '100%' }} 
      />
    </div>
  );
};

export default PCBAnimation;
/*
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
*/