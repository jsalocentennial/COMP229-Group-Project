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

const CharacterSheet = ({ token }) => {
  const canvasConfig = { width: 600, height: 300 };
  const [activeCharacters, setActiveCharacters] = useState([]);
  const [raceIconUrl, setRaceIconUrl] = useState(null);
  const [characterStats, setCharacterStats] = useState({});
  const [savedCharacters, setSavedCharacters] = useState([]);            // State to hold saved characters from backend
  const [editingCharacter, setEditingCharacter] = useState(null);        // State to hold the character being edited


  // Fetching all characters saved by the logged-in user from the backend
  useEffect(() => {                                                      
    const getCharacters = async () => {                                 
        try {
            const response = await fetch('/api/characterSheet/getAllCharacters', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to retrieve characters');
            }

            setSavedCharacters(data);
            console.log('Saved characters:', data);

        } catch (error) {
            console.error('Error retrieving characters:', error);
        }
    };

    getCharacters();
}, [token]);
  
  
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const characterData = Object.fromEntries(formData.entries());
    const method = editingCharacter ? 'PUT' : 'POST';                          // Use PUT for editing, POST for new character
    const url = editingCharacter ? `/api/characterSheet/${editingCharacter._id}` : '/api/characterSheet';

    try {
      const response = await fetch(url, {                                      //Uses post or put depending on if editing or creating new character 
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(characterData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save character');
      console.log('Character saved:', data);

      localStorage.setItem('characterData', JSON.stringify(data)); //Save character locally so animations work
      window.location.reload();                                             // Refreshing page so canvas can load new character state

    } catch (error) {
      console.error('Error saving character:', error);
    }
    //Commented Out for backend integration//
    // // Saving my form values to local storage before refresh
    // localStorage.setItem('characterData', JSON.stringify(characterData));            
    
    // // Refreshing page so canvas can load new character state
    // window.location.reload();
  };

  //Used to handle selecting a character from the saved list, selected character will be displayed on canvas
  const handleSelectCharacter = (character) => {
    localStorage.setItem('characterData', JSON.stringify(character));
    window.location.reload();
  };

  // Function to handle editing a character from the saved list
  const handleEditCharacter = (character) => {                                         
    setEditingCharacter(character);
    console.log('Editing character:', character);
};

// Function to handle deleting a character from the saved list
  const handleDeleteCharacter = async (character) => {
      const confirmDelete = window.confirm(
          `Are you sure you want to delete ${character.name}?`
      );
      if (!confirmDelete) {
          return;
      }
      try {
          const response = await fetch(`/api/characterSheet/${character._id}`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          const data = await response.json();
          if (!response.ok) {
              throw new Error(data.message || 'Failed to delete character');
          }
          console.log('Character deleted:', data);
          // Remove the deleted character from local storage if it's the currently previewed character  
          const previewCharacter = JSON.parse(localStorage.getItem('characterData') || 'null');
          if (previewCharacter?._id === character._id) {
    localStorage.removeItem('characterData');
}

window.location.reload();
      } catch (error) {
          console.error('Error deleting character:', error);
      }
    };

  return (
    <div>
      <h2 className="layout-title">Creatures vs Humans</h2>

      {/* Display characters saved by the logged-in user */}
      <div className="saved-characters">
        <h3 className="layout-title">My Characters</h3>

        {savedCharacters.length === 0 ? (
          <p>You haven't created any characters yet.</p>
        ) : (
          <ul>
            {savedCharacters.map((character) => (
              <li key={character._id}>
                <strong>{character.name}</strong>
                {' — '}
                {character.race} {character.class}
                {' — '}
                Level {character.level}
                <button
                  type="button"
                  onClick={() => handleSelectCharacter(character)}> View
              </button>
              <button
                type="button"
                onClick={() => handleEditCharacter(character)}> Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCharacter(character)}> Delete
              </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* My character creation form */}
      <form
        key={editingCharacter?._id || 'new'}
        className="character-form" 
        onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            required 
            placeholder="Enter character name" 
            defaultValue={editingCharacter?.name || ''}/>
        </div>

        <div className="form-group">
          <label htmlFor="class">Class</label>
          <select id="class" name="class" required defaultValue={editingCharacter?.class || ''}>
            <option value="" disabled>Select Class</option>
            <option value="Fighter">Fighter</option>
            <option value="Mage">Mage</option>
            <option value="Thief">Thief</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="race">Race</label>
          <select id="race" name="race" required defaultValue={editingCharacter?.race || ''}>
            <option value="" disabled>Select Race</option>
            <option value="Human">Human</option>
            <option value="Elf">Elf</option>
            <option value="Orc">Orc</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input type="number" id="experience" name="experience" min="0" max="1000" defaultValue={editingCharacter?.experience || '0'} />
        </div>

        <div className="form-group">
          <label htmlFor="level">Level</label>
          <input type="number" id="level" name="level" min="1" max="100" defaultValue={editingCharacter?.level || '1'} />
        </div>

        <button type="submit" className="submit-btn"> {editingCharacter ? 'Save Changes' : 'Create character and Preview'}
        </button>
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