#!/usr/bin/env node

import { createServer } from "node:net";
import { execSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { cloneRepo, removeGit, tryGitInit } from "./git.mjs";

try {
  await Promise.all([isPortTaken(5432), isPortTaken(5433)]);
} catch (e) {
  console.log(e.message);
  process.exit(1);
}

const rl = createInterface({ input, output });

let workingDir = "";
let isRemoveDocker = false;

{
  const answer = await rl.question(question("What is your project named?"));

  workingDir = join(process.cwd(), answer);
}
{
  const answer = await rl.question(
    question("Do you want to remove Docker for app? (y/N)")
  );

  if (answer === "y" || answer === "Y") {
    isRemoveDocker = true;
  }
}

rl.close();

await mkdir(workingDir);
process.chdir(workingDir);

cloneRepo();
report("Completed to clone hiroppy/web-app-template");
removeGit(workingDir);
tryGitInit(workingDir);

execSync("npm run setup", { stdio: "ignore" });

report("Installing dependencies...");
execSync("pnpm i", { stdio: "ignore" });

execSync("cp .env.sample .env.local");

report("Setting up...");
execSync("node init.mjs --skip-questions", { stdio: "ignore" });

console.log("");
console.log("Completed to setup 🎉🎉🎉🎉🎉🎉");
console.log("");
console.log(
  "🖼️  this code base is https://github.com/hiroppy/web-app-template."
);

function question(title) {
  return `🎃 ${title}  `;
}

function report(text) {
  console.log("\x1b[36m%s\x1b[0m", `🐕  ${text}`);
}

async function isPortTaken(port) {
  return new Promise((resolve, reject) => {
    const tester = createServer()
      .once("error", (err) => {
        reject(err);
      })
      .once("listening", () => {
        tester.once("close", () => resolve(true)).close();
      })
      .listen(port);
  });
}
