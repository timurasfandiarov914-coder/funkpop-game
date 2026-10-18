(() => {
  "use strict";

  const gameData = {
    quiz: {
      name: "QUIZ RUSH",
      kicker: "QUICK QUESTIONS · BIG FAN ENERGY",
      intro: "Five quick questions about K-pop. Lock in your answer and see how much you know.",
      rounds: [
        {
          question: "Which group released the song “Dynamite”?",
          choices: ["BLACKPINK", "BTS", "TWICE", "Stray Kids"],
          answer: 1,
          explanation: "“Dynamite” is a BTS single released in 2020."
        },
        {
          question: "Which of these is a girl group?",
          choices: ["ATEEZ", "SEVENTEEN", "IVE", "TXT"],
          answer: 2,
          explanation: "IVE is a South Korean girl group that debuted in 2021."
        },
        {
          question: "Which group has the fan name “STAY”?",
          choices: ["Stray Kids", "NewJeans", "aespa", "ENHYPEN"],
          answer: 0,
          explanation: "STAY is the official fandom name for Stray Kids."
        },
        {
          question: "Which artist released “Gangnam Style”?",
          choices: ["Rain", "PSY", "G-Dragon", "ZICO"],
          answer: 1,
          explanation: "PSY released “Gangnam Style” in 2012."
        },
        {
          question: "Which of these groups includes the song “Super Shy”?",
          choices: ["NewJeans", "LE SSERAFIM", "ITZY", "Red Velvet"],
          answer: 0,
          explanation: "“Super Shy” is a NewJeans song from 2023."
        }
      ]
    },
    bias: {
      name: "BIAS BATTLE",
      kicker: "THE IMPOSSIBLE CHOICE",
      intro: "No wrong answers here. Pick the one you would save from every bias-wrecker.",
      rounds: [
        { question: "First battle. Who are you picking?", choices: ["JENNIE", "LISA"], answer: null, explanation: "An iconic opening choice. Your bias list is your business." },
        { question: "Who owns this round?", choices: ["JUNGKOOK", "V"], answer: null, explanation: "Both are fan favourites. The decision is yours." },
        { question: "Your girl-group pick?", choices: ["KARINA", "WONYOUNG"], answer: null, explanation: "Different vibes, same impossible decision." },
        { question: "Who's winning this battle?", choices: ["FELIX", "HYUNJIN"], answer: null, explanation: "A hard one for STAYs. There is no wrong pick." },
        { question: "Last round. Trust your bias.", choices: ["ROSÉ", "JISOO"], answer: null, explanation: "Bias check complete. Stay loyal to your own taste." }
      ]
    },
    intruder: {
      name: "FIND THE INTRUDER",
      kicker: "SPOT THE ODD ONE OUT",
      intro: "Three fit the category. One doesn't. Find the group that sneaked into the wrong lineup.",
      rounds: [
        { question: "Which one is NOT a girl group?", choices: ["TWICE", "IVE", "SEVENTEEN", "ITZY"], answer: 2, explanation: "SEVENTEEN is a boy group. The other three are girl groups." },
        { question: "Which one is NOT a boy group?", choices: ["ATEEZ", "aespa", "EXO", "TXT"], answer: 1, explanation: "aespa is a girl group. The other three are boy groups." },
        { question: "Which one is NOT a girl group?", choices: ["LE SSERAFIM", "NMIXX", "ENHYPEN", "Red Velvet"], answer: 2, explanation: "ENHYPEN is a boy group. The other three are girl groups." },
        { question: "Which one is NOT a boy group?", choices: ["Stray Kids", "BABYMONSTER", "RIIZE", "SHINee"], answer: 1, explanation: "BABYMONSTER is a girl group. The other three are boy groups." },
        { question: "Which one is NOT a girl group?", choices: ["KISS OF LIFE", "ILLIT", "BOYNEXTDOOR", "STAYC"], answer: 2, explanation: "BOYNEXTDOOR is a boy group. The other three are girl groups." }
      ]
    },
    emoji: {
      name: "EMOJI DECODER",
      kicker: "DECODE THE CLUE",
      intro: "Read the emoji clue and choose the K-pop group it points to. Some are wordplay, so think creatively.",
      rounds: [
        { question: "🆕 + 👖  Which group is this?", choices: ["NewJeans", "IVE", "ITZY", "TWICE"], answer: 0, explanation: "NEW + JEANS: this one is hiding in plain sight." },
        { question: "🖤 + 💗  Which group is this?", choices: ["Red Velvet", "BLACKPINK", "aespa", "MAMAMOO"], answer: 1, explanation: "BLACK + PINK gives you the group's name." },
        { question: "💜 + 🎤 + 🌍  Guess the group.", choices: ["BTS", "EXO", "ATEEZ", "RIIZE"], answer: 0, explanation: "A purple-heart, music and worldwide-fandom hint points to BTS." },
        { question: "🧒 + 🧭 + ⭐  Guess the group.", choices: ["Stray Kids", "TXT", "ENHYPEN", "SHINee"], answer: 0, explanation: "A playful “stray” + “kids” word clue points to Stray Kids." },
        { question: "🔴 + 🎩 + 🍰  Which group is hinted at?", choices: ["Red Velvet", "BLACKPINK", "IVE", "NMIXX"], answer: 0, explanation: "Red + velvet cake: a visual wordplay clue for Red Velvet." }
      ]
    }
  };

  const modal = document.getElementById("game-modal");
  const content = document.getElementById("game-content");
  const headerPlay = document.getElementById("header-play");
  let activeGame = null;
  let roundIndex = 0;
  let score = 0;
  let answered = false;
  let lastFocus = null;
  let lastRound = null;

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function openGame(gameKey) {
    const selected = gameData[gameKey];
    if (!selected) return;
    activeGame = gameKey;
    roundIndex = 0;
    score = 0;
    answered = false;
    lastRound = null;
    activeGameData = { ...selected, rounds: shuffle(selected.rounds) };
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    renderIntro();
    modal.querySelector(".modal-close").focus();
  }

  let activeGameData = null;

  function renderIntro() {
    content.innerHTML =
      '<div class="game-kicker">' + escapeHTML(activeGameData.kicker) + '</div>' +
      '<h2 class="game-title" id="modal-title">' + escapeHTML(activeGameData.name) + '<span>.</span></h2>' +
      '<p class="game-subtitle">' + escapeHTML(activeGameData.intro) + '</p>' +
      '<div class="result-stamp" aria-hidden="true">✦</div>' +
      '<div class="result-actions">' +
      '<button type="button" class="restart-button" id="start-rounds">START GAME ↗</button>' +
      '<button type="button" class="secondary-button" data-close-modal>NOT NOW</button>' +
      '</div>';
    document.getElementById("start-rounds").addEventListener("click", renderRound);
  }

  function renderRound() {
    const round = activeGameData.rounds[roundIndex];
    if (!round) return renderResults();
    answered = false;
    lastRound = round;
    const total = activeGameData.rounds.length;
    const choiceButtons = round.choices.map((choice, index) =>
      '<button type="button" class="choice-button" data-choice="' + index + '">' +
      '<span class="choice-prefix">' + String.fromCharCode(65 + index) + '</span>' +
      escapeHTML(choice) + '</button>'
    ).join("");

    content.innerHTML =
      '<div class="game-kicker">' + escapeHTML(activeGameData.name) + ' · ROUND ' + (roundIndex + 1) + '</div>' +
      '<div class="progress-row"><span>ROUND ' + String(roundIndex + 1).padStart(2, "0") + ' / ' + String(total).padStart(2, "0") + '</span><span>' + (activeGame === "bias" ? "BIAS CHECK" : "YOUR SCORE: " + score) + '</span></div>' +
      '<div class="progress-track" role="progressbar" aria-label="Game progress" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + roundIndex + '"><div class="progress-fill" style="width:' + (roundIndex / total * 100) + '%"></div></div>' +
      '<div class="question-label">' + (activeGame === "emoji" ? "🧩 CRACK THE CODE" : activeGame === "bias" ? "💖 CHOOSE YOUR FAVOURITE" : "✦ YOUR QUESTION") + '</div>' +
      '<h2 class="question-text" id="modal-title">' + escapeHTML(round.question) + '</h2>' +
      '<div class="choice-grid" role="group" aria-label="Choose an answer">' + choiceButtons + '</div>' +
      '<div class="answer-feedback" id="answer-feedback" role="status" aria-live="polite" hidden></div>' +
      '<div class="modal-bottom"><div class="score-label">' + (activeGame === "bias" ? "PICKS MADE: " : "SCORE: ") + '<strong id="score-value">' + score + '</strong> / ' + total + '</div><button type="button" class="next-button" id="next-round" disabled>' + (roundIndex === total - 1 ? "SEE RESULTS ↗" : "NEXT ROUND ↗") + '</button></div>';

    content.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => chooseAnswer(Number(button.dataset.choice)));
    });
    document.getElementById("next-round").addEventListener("click", () => {
      if (!answered) return;
      roundIndex += 1;
      renderRound();
    });
    const firstChoice = content.querySelector("[data-choice]");
    if (firstChoice) firstChoice.focus();
  }

  function chooseAnswer(choiceIndex) {
    if (answered || !lastRound) return;
    answered = true;
    const correct = lastRound.answer === choiceIndex;
    if (activeGame === "bias" || correct) score += 1;

    const buttons = [...content.querySelectorAll("[data-choice]")];
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (activeGame === "bias") {
        if (index === choiceIndex) button.classList.add("chosen");
      } else {
        if (index === lastRound.answer) button.classList.add("correct");
        if (index === choiceIndex && !correct) button.classList.add("incorrect");
      }
    });

    const feedback = document.getElementById("answer-feedback");
    feedback.hidden = false;
    if (activeGame === "bias") {
      feedback.innerHTML = "<strong>CHOICE LOCKED IN 💖</strong>" + escapeHTML(lastRound.explanation);
    } else if (correct) {
      feedback.innerHTML = "<strong>THAT'S RIGHT! ✦</strong>" + escapeHTML(lastRound.explanation);
    } else {
      feedback.innerHTML = "<strong>NOT QUITE! KEEP GOING.</strong>" + escapeHTML(lastRound.explanation);
    }
    document.getElementById("score-value").textContent = String(score);
    const progress = content.querySelector(".progress-fill");
    progress.style.width = ((roundIndex + 1) / activeGameData.rounds.length * 100) + "%";
    content.querySelector(".progress-track").setAttribute("aria-valuenow", String(roundIndex + 1));
    const next = document.getElementById("next-round");
    next.disabled = false;
    next.focus();
  }

  function renderResults() {
    const total = activeGameData.rounds.length;
    const percentage = Math.round(score / total * 100);
    let headline;
    let note;
    if (activeGame === "bias") {
      headline = "BIAS CHECK COMPLETE";
      note = "You picked " + score + " favourites. Your bias list is officially yours. Send this challenge to a friend and compare picks.";
    } else if (percentage === 100) {
      headline = "CERTIFIED SUPERFAN";
      note = "Flawless run. Your K-pop brain is on another level. Run it back and try a different game.";
    } else if (percentage >= 60) {
      headline = "MAIN CHARACTER ENERGY";
      note = "You know your stuff. A few tricky questions tried to get you, but you're still in your era.";
    } else {
      headline = "YOUR STAN ERA STARTS NOW";
      note = "Every expert starts somewhere. Play another round, learn a fun fact, and come back for the perfect score.";
    }
    content.innerHTML =
      '<div class="result-screen">' +
      '<div class="result-stamp" aria-hidden="true">' + (percentage === 100 ? "★" : activeGame === "bias" ? "♥" : "✦") + '</div>' +
      '<p class="game-kicker">GAME COMPLETE · ' + escapeHTML(activeGameData.name) + '</p>' +
      '<h2 class="game-title" id="modal-title">' + escapeHTML(headline) + '<span>!</span></h2>' +
      '<div class="result-score"><strong>' + score + '</strong><span>/ ' + total + (activeGame === "bias" ? " PICKS" : " POINTS") + '</span></div>' +
      '<p class="game-subtitle">' + escapeHTML(note) + '</p>' +
      '<div class="result-actions"><button type="button" class="restart-button" id="play-again">PLAY AGAIN ↻</button><button type="button" class="secondary-button" id="change-game">PICK ANOTHER</button></div>' +
      '</div>';
    document.getElementById("play-again").addEventListener("click", () => openGame(activeGame));
    document.getElementById("change-game").addEventListener("click", closeGame);
    const stamp = content.querySelector(".result-stamp");
    if (stamp) stamp.style.background = activeGame === "bias" ? "var(--pink)" : percentage >= 60 ? "var(--green)" : "var(--yellow)";
    content.querySelector("#play-again").focus();
  }

  function closeGame() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    content.innerHTML = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  document.querySelectorAll("[data-game]").forEach((button) => {
    button.addEventListener("click", () => openGame(button.dataset.game));
  });
  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeGame);
  });
  headerPlay.addEventListener("click", () => {
    document.getElementById("games").scrollIntoView({ behavior: "smooth" });
    const firstGame = document.querySelector("[data-game]");
    if (firstGame) firstGame.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeGame();
  });
  document.addEventListener("click", (event) => {
    const internalLink = event.target.closest('a[href^="#"]');
    if (internalLink && !modal.hidden) closeGame();
  });
})();