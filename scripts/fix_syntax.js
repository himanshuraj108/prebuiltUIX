const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/template-view.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const start = content.indexOf('handleDownload');
const end = content.indexOf('return (');

console.log("--- CONTENT SNIPPET ---");
console.log(content.substring(start, end));
console.log("--- END SNIPPET ---");

const regexStart = /a\.download\s*=\s*\${/;
console.log("Regex Test:", regexStart.test(content));
