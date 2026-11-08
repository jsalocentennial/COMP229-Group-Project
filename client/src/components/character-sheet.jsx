import React, { useState, useEffect } from 'react';
import '../style/character-creator.css';
import "../style/layout.css";
import SpriteCanvas from '../components/SpriteCanvas';

// Importing my sprite sheets directly from src/assets
import thiefSprite from '../assets/Thief_01.png';
import fighterSprite from '../assets/Fighter_01.png';
import mageSprite from '../assets/Mage_01.png';

// Importing race icons for JS resizing
import elfIcon from '../assets/elf.png';
import orcIcon from '../assets/orc.png';
import humanIcon from '../assets/human.png';

const CharacterSheet = () => {
  const canvasConfig = { width: 600, height: 300 };
  const [activeCharacters, setActiveCharacters] = useState([]);
  const [raceIconUrl, setRaceIconUrl] = useState(null);
  const [characterStats, setCharacterStats] = useState({});

  // My sprite definitions with original frame dimensions
  const spriteDefinitions = {
    Thief: { src: thiefSprite, width: 40, height: 71, x: 275, y: 220  },
    Fighter: { src: fighterSprite, width: 67, height: 51, x: 230, y: 150 },
    Mage: { src: mageSprite, width: 56, height: 50, x: 235, y: 200 }
  };

  const raceIconMap = {
    Elf: elfIcon,
    Orc: orcIcon,
    Human: humanIcon
  };

  // Processing my saved character data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        
        // Enforce caps: Level max 100, XP max 1000
        const safeLevel = Math.min(Math.max(parseInt(data.level) || 1, 1), 100);
        const safeXP = Math.min(Math.max(parseInt(data.experience) || 0, 0), 1000);

        // Save processed stats for HUD rendering
        setCharacterStats({
          name: data.name || 'Unknown Hero',
          level: safeLevel,
          experience: safeXP
        });

        // Building my single character array based on saved form values
        if (data.class && spriteDefinitions[data.class]) {
          const def = spriteDefinitions[data.class];
          // Calculating scale factor to reach exactly 128px height while keeping aspect ratio
          const scaleFactor = 128 / def.height;
          const scaledWidth = Math.round(def.width * scaleFactor);

          setActiveCharacters([{
            id: 'user-character',
            spriteSheet: def.src,
            position: { x: def.x, y: def.y },
            spriteConfig: {
              width: def.width,
              height: def.height,
              totalFrames: 4,
              fps: 4,
              displayWidth: scaledWidth,
              displayHeight: 128
            }
          }]);
        }

        // Resizing my race icon using an offscreen canvas
        if (data.race && raceIconMap[data.race]) {
          const imgSrc = raceIconMap[data.race];
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const offscreen = document.createElement('canvas');
            offscreen.width = 28;
            offscreen.height = 28;
            const ctx = offscreen.getContext('2d');
            ctx.drawImage(img, 0, 0, 28, 28);
            setRaceIconUrl(offscreen.toDataURL());
          };
          img.src = imgSrc;
        }
      } catch (e) {
        console.error("Failed to load character data", e);
      }
    }
  }, []);

  // Handling my form submission to save character data
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const characterData = Object.fromEntries(formData.entries());
    
    // Saving my form values to local storage before refresh
    localStorage.setItem('characterData', JSON.stringify(characterData));
    
    // Refreshing page so canvas can load new character state
    window.location.reload();
  };

  return (
    <div>
      <h2 className="layout-title">Creatures vs Humans</h2>
      
      {/* My character creation form */}
      <form className="character-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required placeholder="Enter character name" />
        </div>

        <div className="form-group">
          <label htmlFor="class">Class</label>
          <select id="class" name="class" required defaultValue="">
            <option value="" disabled>Select Class</option>
            <option value="Fighter">Fighter</option>
            <option value="Mage">Mage</option>
            <option value="Thief">Thief</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="race">Race</label>
          <select id="race" name="race" required defaultValue="">
            <option value="" disabled>Select Race</option>
            <option value="Human">Human</option>
            <option value="Elf">Elf</option>
            <option value="Orc">Orc</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input type="number" id="experience" name="experience" min="0" max="1000" defaultValue="0" />
        </div>

        <div className="form-group">
          <label htmlFor="level">Level</label>
          <input type="number" id="level" name="level" min="1" max="100" defaultValue="1" />
        </div>

        <button type="submit" className="submit-btn">Create Character & Preview</button>
      </form>

      <div className="character-preview-container">
        <SpriteCanvas 
          canvasSize={canvasConfig} 
          characters={activeCharacters} 
          raceIconUrl={raceIconUrl}
          characterStats={characterStats}
        />
      </div>
    </div>
  );
};

export default CharacterSheet;