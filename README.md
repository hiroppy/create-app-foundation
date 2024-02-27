## Create App Foundation

This is a way to use [web-app-template](https://github.com/hiroppy/web-app-template) via CLI instead of using GitHub template.

### Usage

```sh
$ npx create-app-foundation
```

### Libraries

| kind        |                         |                          |                         |
| ----------- | ----------------------- | ------------------------ | ----------------------- |
| **app**     | Next.js (framework)     | Tailwind CSS (css)       | NextAuth.js (auth)      |
|             | Prisma (orm)            | React Hook Form (form)   | Zod (validator)         |
| **tools**   | TypeScript (language)   | Biome (linter, fmt)      | Prettier (linter)       |
|             | ESLint (linter)         | lint-staged (pre-commit) |                         |
| **testing** | Vitest (test runner)    | Playwright (e2e testing) |                         |
| **others**  | workflows (ci)          | .vscode (editor)         | Docker Compose (docker) |
|             | Renovate (deps manager) |                          |                         |

Please check the details on [this repo](https://github.com/hiroppy/web-app-template)!
