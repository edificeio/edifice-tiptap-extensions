const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
  encoding: 'utf-8',
}).trim();

const commitDate = new Date().toLocaleString('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const filePath = path.join(process.cwd(), 'version.txt');
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonContent);

const data = `${packageJson.name}@${currentBranch} ${commitDate}`;

fs.writeFileSync(filePath, data, 'utf-8');
