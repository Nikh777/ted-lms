import React, { useEffect, useRef } from 'react';

const LocalCodeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    // Is baar window nahi, parent div ke size ke hisab se canvas scale hoga
    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const codeChars = ["01", "10", "const", "function", "<div>", "npm", "return", "{}", "[]", "=>", "React"];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / 40);
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 12, 0.12)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)'; // Light cyber cyan vibe
      ctx.font = '12px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = codeChars[Math.floor(Math.random() * codeChars.length)];
        ctx.fillText(text, i * 40, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.4;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-0 pointer-events-none rounded-2xl"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default LocalCodeBackground;