const fs = require("fs");
const inquirer = require("inquirer");
const question = [
  "What is the title of your project?:",
  "Give your project a description:",
  "Give detailed installation instructions:",
  "Give detailed usage instructions:",
  "List any contributors (preferably by Github username, seperated only by spaces no commas):",
  "Give instructions to test application:",
  "What is your Github Username?:",
  "What is your Email Address?:",
  "Select your license"
];

inquirer
  .prompt([
    {
      type: "input",
      message: question[0],
      name: "title",
    },
    {
      type: "editor",
      message: question[1],
      name: "description",
    },
    {
      type: "editor",
      message: question[2],
      name: "installation",
    },
    {
      type: "editor",
      message: question[3],
      name: "usage",
    },
    {
      type: "input",
      message: question[4],
      name: "contributors",
    },
    {
      type: "editor",
      message: question[5],
      name: "testing",
    },
    {
      type: "input",
      message: question[6],
      name: "github",
    },
    {
      type: "input",
      message: question[7],
      name: "email",
    },
    {
      type: "list",
      message: question[8],
      choices: [
        "MIT License",
        "GNU GPLv3",
        "Unlicense",
      ],
      name: "license",
    }
  ])
  .then(function (data) {
    contributorArr = data.contributors.trim().split(" ");
    for (i = 0; i < contributorArr.length; i++) {
      contributorArr[i] = `* ${contributorArr[i]}\n`
    };

    let licenseBadge =
      data.license === "GNU GPLv3" ? `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
        : data.license === "MIT License" ? `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
          : `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;

    let licenseInfo =
      data.license === "GNU GPLv3" ?
        `This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License. 
        
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
        : data.license === "MIT License" ? 
        `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
          : 
          `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.
          
In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.
          
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          `;

    fs.writeFile(`${data.title}.md`,
      `# ${data.title} ${licenseBadge}
## Table of Contents
[Description](#Description)\n
[Installation](#Installation)\n
[Usage](#Usage)\n
[Contribution](#Contribution)\n
[Testing](#Testing)\n
[Questions](#Questions)\n
[License](#License)\n
## Description
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
If you have any further questions or feedback, please contact me on [github](https://github.com/${data.github}) or by [email](${data.email})
## License: 
## ${data.license}
${licenseInfo}`,
      (err) => err ? console.log(err) : console.log("README created successfully!"))
  });