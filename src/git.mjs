// https://github.com/vercel/next.js/blob/canary/packages/create-next-app/helpers/git.ts

import { execSync } from "node:child_process";

export function tryGitInit(root) {
  let didInit = false;

  try {
    execSync("git --version", { stdio: "ignore" });
    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    execSync("git init", { stdio: "ignore" });
    didInit = true;

    // if (!isDefaultBranchSet()) {
    //   execSync("git checkout -b main", { stdio: "ignore" });
    // }

    // execSync("git add -A", { stdio: "ignore" });
    // execSync('git commit -m "Initial commit from Create Next App"', {
    //   stdio: "ignore",
    // });
    return true;
  } catch (e) {
    if (didInit) {
      try {
        fs.rmSync(path.join(root, ".git"), { recursive: true, force: true });
      } catch (_) {}
    }
    return false;
  }
}

export function cloneRepo() {
  const url = "https://github.com/hiroppy/web-app-template.git";

  execSync(`git clone ${url} .`, { stdio: "ignore" });
}
