import React, { useEffect, useRef } from 'react';

const CodeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Kuch impactful coding words aur symbols
    const codeChars = ["01", "10", "const", "function", "<div>", "npm", "return", "{}", "[]", "=>", "React", "void"];
    
    const fontSize = 16;
    const columns = Math.floor(canvas.width / 40); // spacing streams
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50; 
    }

    const draw = () => {
      // Semi-transparent clearing to create a trailing effect
      ctx.fillStyle = 'rgba(10, 10, 12, 0.15)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon cyan/blue styling for high visibility on black
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)'; // Opacity increased to 0.25
      ctx.font = 'bold 13px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = codeChars[Math.floor(Math.random() * codeChars.length)];
        
        ctx.fillText(text, i * 40, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i] += 0.4; // Controlled smooth speed
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // content ke piche rhega
        pointerEvents: 'none',
        backgroundColor: '#0a0a0c' // Main system deep black background
      }}
    />
  );
};

export default CodeBackground;