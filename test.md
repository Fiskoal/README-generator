function generateMarkdown(data) {
  return `# ${data.title}
##Description
${data.license}
${data.description}
##Installation
${data.installation}
##Usage
${data.usage}
##Contribution
${data.contributors}
##Testing
${data.testing}
##Questions
${data.github}
${data.email}
`;
}