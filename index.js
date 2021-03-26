const fs = require("fs");
const inquirer = require("inquirer");

const questions = [
  "What is the title of your project?",
  "Give your project a description:",
  "Give detailed installation instructions:",
  "Give detailed usage instructions:",
  "List any contributors (preferably by Github username, seperated only by spaces no commas):",
  "Give instructions to test application:",
  "What is your Github Username?",
  "What is your Email Address?",
  "Select your license"
];

function inquire() {
  inquirer
    .prompt([
      {
        type: "input",
        message: questions[0],
        name: "title",
      },
      {
        type: "editor",
        message: questions[1],
        name: "description",
      },
      {
        type: "editor",
        message: questions[2],
        name: "installation",
      },
      {
        type: "editor",
        message: questions[3],
        name: "usage",
      },
      {
        type: "input",
        message: questions[4],
        name: "contributors",
      },
      {
        type: "editor",
        message: questions[5],
        name: "testing",
      },
      {
        type: "input",
        message: questions[6],
        name: "github",
      },
      {
        type: "input",
        message: questions[7],
        name: "email",
      },
      {
        type: "list",
        message: questions[8],
        choices: [
          "GNU GPLv3",
          "MIT License",
          "No License",
        ],
        name: "license",
      }
    ])
    .then(function(data){
        contributorArr = data.contributors.trim().split(" ");
        for (i = 0; i < contributorArr.length; i++) {
          contributorArr[i] = `* ${contributorArr[i]}\n`
        };

      let licenseBadge = 
      data.license === "GNU GPLv3" ? `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
      : data.license === "MIT License" ? `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
      : `[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)]`;

      fs.writeFile(`${data.title}.md`,
`# ${data.title}
## Description ${licenseBadge}
${data.description}
## Installation
${data.installation}
## Usage
${data.usage}
## Contribution
${(contributorArr.join()).replace(/,/g, "")}
## Testing
${data.testing}
## Questions
${data.github}
${data.email}`, 
      (err) => err ? console.log(err) : console.log("README created successfully!"))
    });
};

function init() {
  inquire();
};

init();
