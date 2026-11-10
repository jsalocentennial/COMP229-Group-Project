import '../style/layout.css';
import '../style/game-guide.css';

const GameGuide = () => {
    return (
        <>
        <div className="game-guide-container">
            <h2 className="layout-title">Game Guide</h2>
        </div>
        <div className="game-guide-container">
            <h3>Introduction:</h3>
            <p>Welcome to the Game Guide! Here you'll find all the information you need to get started.</p>
            <p>Before you begin, make sure you are logged in.</p>
            <p className="hint">Hint: You can register for an account if you don't already have one <a href="/register">here</a></p>
            <h3>Character Creation:</h3>
            <p>Head on over to the <a href="/character-sheet">Character Sheet</a> page to create your character. You'll be met with a whole list of options as shown:</p>
            <img src="/src/assets/character_sheet_options.png" alt="Character Sheet Options"></img>
            <p>Lets walk through what each of these option do:</p>
            <ul className="features">
                <img src="/src/assets/character_sheet_name.png" alt="Name Option"></img>
                <li><b>Name:</b> This setting determines the name of your character. For this example, we'll call our new hero <i>David</i>.</li>
                <img src="/src/assets/character_sheet_class.png" alt="Class Option"></img>
                <li><b>Class:</b> This setting determines your character's class, for now, you can choose from three classes: Fighter, Mage, and Thief. David has been obsessed with spellbooks and the magical arts since he was a young boy, therefore, he has chosen to become a Mage.</li>
                <img src="/src/assets/character_sheet_race.png" alt="Race Option"></img>
                <li><b>Race:</b> This setting determines your character's race, for now, you can choose from three races: Human, Elf, and Orc. David was born in the elven forest, lucky for him, this makes him adept at mana manipulation.</li>
                <img src="/src/assets/character_sheet_experience.png" alt="Experience Option"></img>
                <li><b>Experience:</b> This setting determines your character's experience level, maxing out at 1000. David accumulated a fair bit of experience in his last adventure, netting him 236 experience points.</li>
                <img src="/src/assets/character_sheet_level.png" alt="Level Option"></img>
                <li><b>Level:</b> This setting determines your character's level, maxing out at 100. David is a seasoned adventurer, currently sitting at level 24, he hopes to reach level 30 within the next year or two.</li>
                <img src="/src/assets/character_sheet_create.png" alt="Create Character Option"></img>
                <li><b>Create character and Preview:</b> Once you've filled out all the necessary information, you can create your character and preview their stats and attributes.</li>
            </ul>
            <p>Say hello to David!</p>
            <img src="/src/assets/David.png" alt="David"></img>
            <h3>Modifying your Characters:</h3>
            <img src="/src/assets/character_sheet_modify.png" alt="Modifying Characters"></img>
            <p>Once you've created your character, you can modify their stats and attributes at any time.</p>
            <ul>
                <img src="/src/assets/character_sheet_view.png" alt="View Character"></img>
                <li><b>View:</b> Displays the character in the bottom panel. Say hello to Riley, David's mentor and our example for this section.</li>
                <img src="/src/assets/character_sheet_edit.png" alt="Edit Character"></img>
                <li><b>Edit:</b> Allows you to modify the character's stats and attributes, hit <b>Save changes</b> for them to take affect. Riley recently defeated a three headed hydra netting him enough exp to hit level 60!</li>
                <img src="/src/assets/character_sheet_delete.png" alt="Delete Character"></img>
                <li><b>Delete:</b> Removes the character from your roster. Riley was a great hero, but unfortunately, he met his end in a valiant battle, rest in piece.</li>
            </ul>
            <h3>Conclusion:</h3>
            <p>That's all for the Game Guide! We hope you found it helpful and informative. If you have any more questions, check out our <a href="/faq">FAQ</a>!</p>
        </div>
        </>
    );
};

export default GameGuide;