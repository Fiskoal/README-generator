// TODO: Include packages needed for this application

const fs = require("fs");
const inquirer = require("inquirer");
const markdown = require("./utils/generateMarkdown.js")

// TODO: Create an array of questions for user input

const questions = [
  "What is the title of your project?",
  "Give your project a description:",
  "Give detailed installation instructions:",
  "Give detailed usage instructions:",
  "List any contributors (preferably by Github username):",
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
        type: "input",
        message: questions[1],
        name: "description",
      },
      {
        type: "input",
        message: questions[2],
        name: "installation",
      },
      {
        type: "input",
        message: questions[3],
        name: "usage",
      },
      {
        type: "input",
        message: questions[4],
        name: "contributors",
      },
      {
        type: "input",
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
          "No License"
        ],
        name: "license",
      }
    ])
    .then(function(data){
      fs.writeFile(`${data.title}.md`, 
      markdown.generateMarkdown, 
      (err) => err ? console.log(err) : console.log("README created successfully!"))
    });
};

// TODO: Create a function to write README file


// TODO: Create a function to initialize app
function init() {
  inquire();
};

// Function call to initialize app
init();
