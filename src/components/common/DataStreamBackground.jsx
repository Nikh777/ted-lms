import React, { useEffect, useRef } from 'react';

const DataStreamBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Massive Data Pool of Algorithms, Arrays & Script Tags
    const algorithmSnippets = [
      "arr.sort((a, b) => a - b)",
      "binarySearch(array, target)",
      "quickSort(matrix, 0, n-1)",
      "dp[i][j] = dp[i-1][j] + cost",
      "let pivot = partition(arr)",
      "while (left <= right)",
      "graph.bfs(rootNode)",
      "stack.push(currentNode)",
      "mergeSort(leftHalf, rightHalf)",
      "if (visited[node] === true)",
      "hashTable.insert(key, value)",
      "return new TreeNode(data)",
      "const matrix = Array(n).fill(0)",
      "function dijkstra(graph, src)",
      "maxHeap.insert(element)",
      "for (let i = 0; i < arr.length; i++)",
      "ctx.drawImage(image, x, y)",
      "fetch('/api/v1/data/stream')",
      "map.set(item.id, { ...item })",
      "const root = createRoot(container)",
      "res.status(200).json({ success: true })",
      "Array.from({ length: 10 }, (_, i) => i)",
      "process.env.NODE_ENV === 'production'",
      "git commit -m 'feat: system override'",
      "npm run build --report",
      "window.localStorage.getItem('token')",
      "JSON.parse(crypto.decrypt(payload))",
      "const stream = new ReadableStream()"
    ];

    const particles = [];
    // Dynamic density matrix badha kar 110 particles kar diya hai taaki screen puri code se bhar jaye
    const maxParticles = 110; 

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: algorithmSnippets[Math.floor(Math.random() * algorithmSnippets.length)],
        speed: 0.2 + Math.random() * 0.6, // Multi-layered parallax speed setup
        opacity: 0.07 + Math.random() * 0.11, // Visually balanced high opacity on white text layer
        fontSize: 11 + Math.floor(Math.random() * 3)
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Technical matrix grid structure layers
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Render heavy data stream
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(15, 23, 42, ${p.opacity})`;
        ctx.font = `600 ${p.fontSize}px monospace`;
        ctx.fillText(p.text, p.x, p.y);

        // Continuous horizontal velocity flow
        p.x += p.speed;

        // Reset tracking coordinates instantly when out of box boundary
        if (p.x > canvas.width) {
          p.x = -220; // Re-enter from left screen smoothly
          p.y = Math.random() * canvas.height;
          p.text = algorithmSnippets[Math.floor(Math.random() * algorithmSnippets.length)];
        }
      });
    };

    const interval = setInterval(draw, 18); // Smooth fluid frame timing

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default DataStreamBackground;