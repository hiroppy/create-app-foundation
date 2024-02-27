import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tryGitInit } from "./git.mjs";

const rl = createInterface({ input, output });

let workingDir = "";

{
  const answer = await rl.question(question("What is your project named?"));

  workingDir = join(process.cwd(), answer);
}

rl.close();

// await mkdir(workingDir);

console.log(workingDir);
process.chdir("test");

// tryGitInit();

function question(title) {
  return `🎃 ${title}  `;
}
