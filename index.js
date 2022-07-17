const fs = require("fs");
const core = require("@actions/core");

const folder = core.getInput("folder");
const output = core.getInput("output");

async function main() {
  try {
    const files = fs.readdirSync(folder).filter(file => file.endsWith(".json"));
    const jsonData = [];
    files.forEach(file => {
      const content = fs.readFileSync(`${folder}/${file}`, "utf8");
      jsonData.push(JSON.parse(content));
    });
    core.debug(JSON.stringify(jsonData, null, 1));
    fs.writeFileSync(output, JSON.stringify(jsonData, null, 1));
  } catch (e) {
    core.setFailed(e.message);
  }
}