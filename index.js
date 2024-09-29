const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .requiredOption("-i, --input <file>", "input file path")
  .option("-o, --output <file>", "output file path")
  .option("-d, --display", "display result");

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input));

if (options.display) {
  console.log(data);
}

if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(data, null, 2));
}
