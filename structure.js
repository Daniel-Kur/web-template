const fs = require('fs');
const path = require('path');

// Define your custom project structure with data and types directories
const customStructure = {
  "src": {
    "components": {},
    "pages": {},
    "hooks": {},
    "utils": {},
    "services": {},
    "data": {},
    "types": {},
    "layouts": {},
  },
  "public": {},
  ".vscode": {
    "settings.json": "// Place your settings here"
  },
  "tests": {},
};

// Function to create directories and files based on the custom structure
const createStructure = (basePath, structure) => {
  Object.entries(structure).forEach(([name, contents]) => {
    const fullPath = path.join(basePath, name);

    if (typeof contents === 'string') {
      // Create file if contents are a string
      fs.writeFileSync(fullPath, contents);
    } else {
      // Create directory if contents are an object
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
      }
      // Recursively create the substructure
      createStructure(fullPath, contents);
    }
  });
};

// Run the script
const projectRoot = process.cwd(); // This will use the current working directory
createStructure(projectRoot, customStructure);

console.log('Project structure adjusted successfully!');
