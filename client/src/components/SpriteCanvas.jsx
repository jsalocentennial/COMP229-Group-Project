import React, { useEffect, useRef } from 'react';

const SpriteCanvas = ({ 
  canvasSize = { width: 800, height: 400 }, 
  characters = [],  
  backgroundImage = "https://grosh.com/wp-content/uploads/Dark-Castle-Interior_backdrop-ES8255-fullsize-scaled.jpg",
  raceIconUrl = null,
  characterStats = {} // New prop for Name, Level, XP
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false; 

    let animationFrameId;
    
    // Setup independent animation states for each character
    const actors = characters.map(char => {
      const img = new Image();
      img.src = char.spriteSheet;
      
      return {
        ...char,
        img,
        currentFrame: 0,
        lastUpdateTime: 0,
        frameInterval: 1000 / char.spriteConfig.fps,
        isLoaded: false
      };
    });

    // Track image loading state safely
    actors.forEach(actor => {
      actor.img.onload = () => {
        actor.isLoaded = true;
      };
    });

    // Preload race icon if provided
    let raceImg = null;
    if (raceIconUrl) {
      raceImg = new Image();
      raceImg.src = raceIconUrl;
    }

    // Single loop rendering everyone onto the single canvas
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render HUD Text (Name, Level, XP)
      ctx.font = 'bold 32px system-ui, sans-serif';
      ctx.textBaseline = 'top';
      
      // Helper to draw text with outline for readability
      const drawTextWithOutline = (text, x, y, color) => {
        ctx.fillStyle = '#000';
        ctx.fillText(text, x + 1, y + 1); // Shadow
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
      };

      // Top Center: Name (White)
      if (characterStats.name) {
        ctx.textAlign = 'center';
        drawTextWithOutline(characterStats.name, canvas.width / 2, 10, '#ffffff');
      }

      // Top Left: Level & XP (Yellow)
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.textAlign = 'left';
      if (characterStats.level !== undefined) {
        drawTextWithOutline(`Lvl ${characterStats.level}`, 10, 10, '#fbbf24'); // Yellow-400
      }
      if (characterStats.experience !== undefined) {
        drawTextWithOutline(`${characterStats.experience}XP`, 10, 40, '#fbbf24');
      }

      // 2. Render Race Icon at top-right (28x28)
      if (raceImg && raceImg.complete) {
        ctx.drawImage(raceImg, canvas.width - 48, 10, 48, 48);
      }

      // 3. Render Animated Characters
      actors.forEach(actor => {
        if (!actor.isLoaded) return; 

        // Update frame progression
        if (!actor.lastUpdateTime) actor.lastUpdateTime = timestamp;
        const elapsed = timestamp - actor.lastUpdateTime;

        if (elapsed >= actor.frameInterval) {
          actor.currentFrame = (actor.currentFrame + 1) % actor.spriteConfig.totalFrames;
          actor.lastUpdateTime = timestamp - (elapsed % actor.frameInterval);
        }

        // Calculate source crop
        const sx = actor.currentFrame * actor.spriteConfig.width;
        const sy = 0; 

        // Use scaled dimensions if available, otherwise fallback to original
        const displayWidth = actor.spriteConfig.displayWidth || actor.spriteConfig.width;
        const displayHeight = actor.spriteConfig.displayHeight || actor.spriteConfig.height;

        // Draw character with proper scaling
        ctx.drawImage(
          actor.img,
          sx, sy,
          actor.spriteConfig.width,
          actor.spriteConfig.height,
          actor.position.x,
          actor.position.y,
          displayWidth,
          displayHeight
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [characters, canvasSize, raceIconUrl, characterStats]);

  return (
    <canvas 
      ref={canvasRef} 
      width={canvasSize.width}   
      height={canvasSize.height} 
      style={{ 
        width: `${canvasSize.width}px`, 
        height: `${canvasSize.height}px`, 
        display: 'block',
        border: '1px solid #ccc',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} 
    />
  );
};

export default SpriteCanvas;