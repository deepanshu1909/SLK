#!/usr/bin/env node
/**
 * Generate + deploy client landing pages to zarklo.com/{slug}
 *
 * npm run lp hairkuwayama          → uses Client_LPGen/clients/hairkuwayama.json
 * npm run lp:all                   → rebuild all client configs
 * npm run lp -- -w URL -i IG -s slug --deploy
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(root, "Client_LPGen/generate_lp.py");
const venvPython = path.join(root, ".venv/bin/python3");
const python = process.env.PYTHON ?? (existsSync(venvPython) ? venvPython : "python3");
const rawArgs = process.argv.slice(2);

function resolveArgs(argv) {
  if (argv.length === 0) return argv;

  if (argv.length === 1 && argv[0] === "--all") {
    return ["--all"];
  }

  // Shorthand: npm run lp hairkuwayama
  if (argv.length === 1 && !argv[0].startsWith("-")) {
    return ["--client", argv[0], "--deploy"];
  }

  return argv;
}

const args = resolveArgs(rawArgs);

if (args.length === 0) {
  console.log(`
Client LP Generator → zarklo.com/{slug}

  npm run lp hairkuwayama
  npm run lp:all
  npm run lp -- -w WEBSITE -i INSTAGRAM -s slug --deploy
  npm run lp -- -c dramatics-nyc

Client configs (manual copy + photos when scrape is thin):
  Client_LPGen/clients/{slug}.json

Examples:
  npm run lp dramatics-nyc
  npm run lp -- -w https://dramaticsnyc.com/
  npm run lp -- -w URL -i INSTAGRAM -s slug

Note: use ONE line — backslash line breaks can drop flags like --deploy in zsh.

Then: git add Client_LPGen/ && git commit && git push
(Vercel auto-deploys → live at zarklo.com/{slug})
`);
  process.exit(0);
}

const result = spawnSync(python, [script, ...args], { cwd: root, stdio: "inherit", env: process.env });
process.exit(result.status ?? 1);
