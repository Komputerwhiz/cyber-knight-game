import React, { useState, useEffect } from 'react';

function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

const scenes = {
  chapter1: {
    image: "assets/chapter1_choice_consistent.png",
    narration: "A strange pop-up appears offering free power. What should Lyra do?",
    choices: [
      { text: "Click it!", next: "wrong1" },
      { text: "Ask G.H.O.S.T.", next: "badge1" }
    ]
  },
  wrong1: {
    image: "assets/popup_trap_wrong_consistent.png",
    narration: "Lyra clicked it... and got trapped in a flood of pop-ups!",
    choices: [{ text: "Try Again", next: "chapter1" }]
  },
  badge1: {
    image: "assets/badge_pause.png",
    narration: "You earned the Pause Badge! You asked before clicking.",
    choices: [{ text: "Continue", next: "chapter2" }]
  },
  chapter2: {
    image: "assets/chapter2_choice_consistent.png",
    narration: "A friend asks to come through Lyra’s open portal. What should she do?",
    choices: [
      { text: "Leave it open", next: "wrong2" },
      { text: "Secure it first", next: "badge2" }
    ]
  },
  wrong2: {
    image: "assets/malware_leak_wrong_consistent.png",
    narration: "Oops! Unlocked portals leak danger.",
    choices: [{ text: "Try Again", next: "chapter2" }]
  },
  badge2: {
    image: "assets/badge_gatekeeper.png",
    narration: "You earned the Gatekeeper Badge! Always secure your gates.",
    choices: [{ text: "Continue", next: "chapter3" }]
  },
  chapter3: {
    image: "assets/chapter3_choice_consistent.png",
    narration: "A scroll says it’s from G.H.O.S.T. asking for your password. What should Lyra do?",
    choices: [
      { text: "Send the password", next: "wrong3" },
      { text: "Verify in person", next: "badge3" }
    ]
  },
  wrong3: {
    image: "assets/phishing_betrayal_wrong_consistent.png",
    narration: "Yikes! That wasn’t G.H.O.S.T. after all.",
    choices: [{ text: "Try Again", next: "chapter3" }]
  },
  badge3: {
    image: "assets/badge_trust.png",
    narration: "You earned the Trust Token! Always verify first.",
    choices: [{ text: "Finish", next: "victory" }]
  },
  victory: {
    image: "assets/victory_final_consistent.png",
    narration: "Lyra has completed her journey and been knighted as a Cyber Sentinel!",
    choices: [{ text: "Play Again", next: "chapter1" }]
  }
};

function App() {
  const [scene, setScene] = useState("chapter1");

  useEffect(() => {
    if (scene.startsWith("badge")) playSound("badge");
    else if (scene.startsWith("wrong")) playSound("wrong");
    else if (scene === "victory") playSound("victory");
  }, [scene]);

  const current = scenes[scene];

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <audio id="click" src="assets/button_click.mp3" />
      <audio id="badge" src="assets/badge_earned.mp3" />
      <audio id="wrong" src="assets/wrong_buzz.mp3" />
      <audio id="victory" src="assets/victory_theme.mp3" />
      <audio id="bg" src="assets/bg_music_loop.mp3" autoPlay loop />

      <img src={current.image} alt="scene" style={{ width: "100%", maxWidth: "700px", height: "auto", transition: "opacity 0.5s ease-in-out" }} />
      <h2>{current.narration}</h2>
      <div>
        {current.choices.map((choice, idx) => (
          <button key={idx} onClick={() => { setScene(choice.next); playSound("click"); }}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
