# JavaScript Mini Projects

<p align="center">
  <img src="img/Logo.png" alt="JavaScript Mini Projects Logo" width="175" />
</p>

<p align="center">
  A collection of three beginner-friendly web projects built with HTML, CSS, and JavaScript.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

---

## Table of Contents

- [About](#about)
- [Projects](#projects)
  - [1. Electronic Voting Machine](#1-electronic-voting-machine)
  - [2. Image Slideshow](#2-image-slideshow)
  - [3. Registration Form](#3-registration-form)
- [Technologies](#technologies)
- [What I Learned](#what-i-learned)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Code Highlights](#code-highlights)
- [Reference](#reference)
- [Author](#author)

---

## About

This repository contains three small web applications developed as a JavaScript learning challenge. The original projects were created in September and October 2021 by following a YouTube tutorial by **Bonieky Lacerda**.

The repository was revisited in September 2026 to review and improve the code, organization, and documentation.

The main goal is to practice fundamental web development concepts through practical projects, including DOM manipulation, event handling, form validation, and interactive user interfaces.

## Projects

### 1. Electronic Voting Machine

**Description**

A browser-based simulation of an electronic voting machine. Users can enter a candidate number, review candidate information, select a blank vote, correct their selection, and confirm their vote.

**Screenshot**

<!-- Replace the path below with the actual screenshot location. -->

<p align="center">
  <img src="screenshots/electronic-voting-machine.png" alt="Electronic Voting Machine interface" width="800" />
</p>

<p align="center">
  <em>Screenshot placeholder — add your own project screenshot.</em>
</p>

**Features**

- Enter a candidate number using the virtual keypad.
- Display candidate information.
- Register valid, blank, and null votes.
- Correct a selection before confirmation.
- Use the physical keyboard to interact with the application.
- Display vote totals and candidate results.
- Reset the simulated election.

**What I Learned**

- Manipulating the DOM to update the interface dynamically.
- Handling click and keyboard events.
- Managing application state with JavaScript objects.
- Using conditional statements to validate candidate numbers.
- Updating vote counters and displaying results.
- Using `setTimeout()` to control temporary interface states.

**Key Code Example**

```javascript
function digitarNumero(numero) {
    if (estado.bloqueado || estado.votoEmBranco) {
        return;
    }

    if (!/^\d$/.test(numero)) {
        return;
    }

    if (estado.numeroDigitado.length >= 2) {
        return;
    }

    estado.numeroDigitado += numero;

    atualizarTela();
}
```

This function demonstrates input validation, state management, and DOM updates. It accepts one digit at a time, prevents additional input when the selection is locked, and refreshes the interface after each entry.

> **Note:** This is an educational simulation and is not designed for real elections.

---

### 2. Image Slideshow

**Description**

An interactive image slideshow that allows users to navigate through a collection of images using interface controls.

**Screenshot**

<!-- Replace the path below with the actual screenshot location. -->

<p align="center">
  <img src="screenshots/image-slideshow.png" alt="Image Slideshow interface" width="800" />
</p>

<p align="center">
  <em>Screenshot placeholder — add your own project screenshot.</em>
</p>

**Features**

- Display images in a slideshow.
- Navigate between slides using controls.
- Update the displayed image dynamically.
- Organize slide navigation with JavaScript.

**What I Learned**

- Selecting and manipulating DOM elements.
- Handling user interactions with event listeners.
- Updating image sources dynamically.
- Working with arrays and indexes to manage slide positions.
- Separating JavaScript behavior from HTML structure and CSS presentation.

**Key Code Example**

```javascript
function showSlide(index) {
    if (index < 0 || index >= slides.length) {
        return;
    }

    currentSlide = index;

    // Update the displayed image and related interface elements.
    updateSlideshow();
}
```

This example illustrates how an index can identify the active slide. The bounds check prevents invalid indexes from being used. Adapt the function names to match the actual implementation in your project.

---

### 3. Registration Form

**Description**

A registration form designed to collect user information and demonstrate client-side form validation using JavaScript.

**Screenshot**

<!-- Replace the path below with the actual screenshot location. -->

<p align="center">
  <img src="screenshots/registration-form.png" alt="Registration Form interface" width="800" />
</p>

<p align="center">
  <em>Screenshot placeholder — add your own project screenshot.</em>
</p>

**Features**

- Collect basic registration information.
- Validate required fields.
- Check email and password input.
- Compare password and password confirmation fields.
- Display validation feedback to the user.

**What I Learned**

- Handling form submission events.
- Accessing input values through the DOM.
- Validating user input with conditional statements.
- Using JavaScript to provide feedback without reloading the page.
- Improving the interaction between HTML forms and JavaScript.

**Key Code Example**

```javascript
function validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
        return false;
    }

    return true;
}
```

This function compares the password and confirmation values. It demonstrates how validation logic can be separated into a reusable function.

**Security Note:** Client-side validation improves usability but does not replace server-side validation in a production application.

---

## Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Styling, layout, and responsiveness |
| JavaScript (ES6+) | Application logic and interactivity |
| Git | Version control |
| GitHub | Source code hosting and portfolio presentation |
| Visual Studio Code | Recommended development editor |

The projects use browser-native technologies and do not require a JavaScript framework.

## What I Learned

Through these projects, I practiced the fundamentals of front-end development:

- DOM selection and manipulation.
- Event listeners and user interactions.
- Functions, objects, arrays, and conditional logic.
- Input validation and feedback messages.
- Updating interface elements dynamically.
- Separating HTML, CSS, and JavaScript.
- Organizing and documenting projects for GitHub.

These exercises helped reinforce the JavaScript fundamentals needed to build more complex web applications.

## Getting Started

### Prerequisites

You will need:

- [Git](https://git-scm.com/) to clone the repository.
- A modern web browser.
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

No Node.js installation or package manager is required for the basic HTML, CSS, and JavaScript projects, provided they do not depend on additional tooling.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Taunt-byte/DESAFIO-3-Projetos-em-JavaScript.git
   ```

2. Navigate to the project directory:

   ```bash
   cd DESAFIO-3-Projetos-em-JavaScript
   ```

3. Open the repository in Visual Studio Code or your preferred editor.

4. Open the relevant project's `index.html` file in your browser.

You can also use the **Live Server** extension in Visual Studio Code for local development.

**Important:** If the repository contains separate folders for the three projects, open the `index.html` file inside the appropriate project folder.

## Project Structure

The following is a suggested structure. Adjust the paths to reflect the actual organization of your repository.

```text
DESAFIO-3-Projetos-em-JavaScript/
├── img/
│   └── Formulario.png
│   └── SlideShow.png
│   └── Urna.png
└── apps
│   └──electronic-voting-machine/
│     ├── index.html
│     ├── css/
│     └── js/
│   └── image-slideshow/
│     ├── index.html
│     ├── css/
│     └── js/
│   └── registration-form/
│     ├── index.html
│     ├── css/
│     └── js/
└── README.md
```

This structure is illustrative. Keep your existing folder names if the projects are organized differently.

## Code Highlights

### DOM Manipulation

JavaScript can select HTML elements and change their content, attributes, classes, or visibility without reloading the page.

```javascript
const message = document.querySelector("#message");

message.textContent = "Welcome!";
```

### Event Handling

Event listeners allow the application to respond to user actions, such as clicks and form submissions.

```javascript
button.addEventListener("click", () => {
    console.log("Button clicked!");
});
```

### Input Validation

Regular expressions and conditional statements can be used to validate input before processing it.

```javascript
const isValidNumber = /^\d+$/.test(inputValue);
```

These snippets are illustrative examples of the concepts used in the projects, rather than replacements for the original source files.

## Reference

**Original tutorial:** Bonieky Lacerda — YouTube Live

[Watch the original tutorial](https://www.youtube.com/live/hF_VMWnsY00?si=mcEdl-8_expm_kpg)

**Project timeline**

- Original project development: September–October 2021.
- Repository review: September 2026.

The tutorial served as the learning reference for the original exercises. The repository documentation and subsequent code revisions are intended to support continued learning and experimentation.

## Author

**Lucas Neves**

Computer Engineering student interested in software development, JavaScript, and game development.

- GitHub: [@Taunt-byte](https://github.com/Taunt-byte)

---

<p align="center">
  Made for learning, practice, and continuous improvement.
</p>