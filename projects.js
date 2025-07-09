const projects = [
  {
    title: "Pro Dice Roll Simulator",
    description: "Simulate dice rolls with this interactive JavaScript app.",
    live: "https://beshoy-rezk-tech.github.io/Pro-Dice-Roll-Simulator/",
    github: "https://github.com/beshoy-rezk-tech/Pro-Dice-Roll-Simulator"
  },
  {
    title: "Age Calculator",
    description: "Calculate your age instantly.",
    live: "https://beshoy-rezk-tech.github.io/Age-Calculator/",
    github: "https://github.com/beshoy-rezk-tech/Age-Calculator"
  },
  {
    title: "Rock Paper Scissors",
    description: "Classic game built with CSS.",
    live: "https://beshoy-rezk-tech.github.io/rock-paper-scissors/",
    github: "https://github.com/beshoy-rezk-tech/rock-paper-scissors"
  },
  {
    title: "Calculator",
    description: "A simple calculator app.",
    live: "https://beshoy-rezk-tech.github.io/calculator/",
    github: "https://github.com/beshoy-rezk-tech/calculator"
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes easily.",
    live: "https://beshoy-rezk-tech.github.io/qr-code-generator/",
    github: "https://github.com/beshoy-rezk-tech/qr-code-generator"
  },
  {
    title: "Flip Coin Game",
    description: "Flip a coin and test your luck.",
    live: "https://beshoy-rezk-tech.github.io/Flip-Coin-Game/",
    github: "https://github.com/beshoy-rezk-tech/Flip-Coin-Game"
  },
  {
    title: "Snake Game",
    description: "Classic snake game in JavaScript.",
    live: "https://beshoy-rezk-tech.github.io/snake-game/",
    github: "https://github.com/beshoy-rezk-tech/snake-game"
  },
  {
    title: "Tic Tac Toe",
    description: "Play Tic Tac Toe against a friend.",
    live: "https://beshoy-rezk-tech.github.io/Tic-Tac-Toe-/",
    github: "https://github.com/beshoy-rezk-tech/Tic-Tac-Toe-"
  },
  {
    title: "Choose Random Numbers",
    description: "Random number generator tool.",
    live: "https://beshoy-rezk-tech.github.io/choose-random-numbers/",
    github: "https://github.com/beshoy-rezk-tech/choose-random-numbers"
  },
  {
    title: "Guessing Game",
    description: "A fun guessing game.",
    live: "https://beshoy-rezk-tech.github.io/guessing-game/",
    github: "https://github.com/beshoy-rezk-tech/guessing-game"
  },
  {
    title: "Web Designer Portfolio",
    description: "Personal web designer portfolio.",
    live: "https://beshoy-rezk-tech.github.io/beshoy-rezk-web-designer/",
    github: "https://github.com/beshoy-rezk-tech/beshoy-rezk-web-designer"
  }
];

function renderProjects() {
  const projectsContainer = document.getElementById('projects-list');
  projectsContainer.innerHTML = projects.map(project => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-buttons">
        <a href="${project.live}" class="btn project-btn" target="_blank">View Live Demo</a>
        <a href="${project.github}" class="btn project-btn-outline" target="_blank">View on GitHub</a>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderProjects); 