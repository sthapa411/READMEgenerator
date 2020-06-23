const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Write your the title of your project:"
    },
    {
      type: "input",
      name: "description",
      message: "Write the description of your project:"
    },
    {
      type: "input",
      name: "content",
      message: "Table of content:"
    },
    {
      type: "input",
      name: "installation",
      message: "Installation"
    },
    {
      type: "input",
      name: "license",
      message: "License name:"
    },
    {
      type: "input",
      name: "contribution",
      message: "Contributor(s)"
    },
    {
      type: "input",
      name: "test",
      message: "Tests:"
    },
    {
      type: "input",
      name: "question",
      message: "Do you have github profile picture?"
    },
    {
      type: "input",
      name: "email",
      message: "Enter your github email:"
    }
  ]);
}

function generateMarkdown(answers) {
  return `
# ${answers.title}
## Description:
* ${answers.description}
## Table of Content:
* [Installation] (#installation)
* [License] (#license)
* [Contributor(s)] (#contribution)
* [Tests] (#tests)
* [Questions] (#questions)

## Installation:
* ${answers.installation}
## License:
* ${answers.license}
## Contributors:
* ${answers.contribution}
## Tests:
* ${answers.Test}
## Do you have github profile picture?
* ${answers.question}
## Enter your Github email: 
* ${answers.email}
## Badge 
* https://img.shields.io/apm/l/github?style=for-the-badge
`;
}

module.exports = generateMarkdown;

promptUser()
  .then(function(answers) {
    const markdown = generateMarkdown(answers);

    return writeFileAsync("README.md", markdown);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
