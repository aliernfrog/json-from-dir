const fs = require("fs");
const core = require("@actions/core");

const folder = core.getInput("folder");
const output = core.getInput("output");
const indent = core.getInput("indent");

async function run() {
  try {
    const files = fs.readdirSync(folder).filter(file => file.endsWith(".json"));
    const jsonData = [];
    files.forEach(file => {
      const content = fs.readFileSync(`${folder}/${file}`, "utf8");
      jsonData.push(JSON.parse(content));
    });
    const jsonFinal = JSON.stringify(jsonData, null, indent);
    fs.writeFileSync(output, jsonFinal);
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();