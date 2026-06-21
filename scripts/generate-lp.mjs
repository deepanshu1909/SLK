#!/usr/bin/env node
/**
 * Generate + deploy client landing pages to zarklo.com/{slug}
 *
 * npm run lp -- -w https://salon.com -i https://instagram.com/h -s salon-name --deploy
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(root, "Client_LPGen/generate_lp.py");
const python = process.env.PYTHON ?? "python3";
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Client LP Generator → zarklo.com/{slug}

  npm run lp -- -w WEBSITE -i INSTAGRAM -s slug --deploy

Examples:
  npm run lp -- -w https://onesalonnyc.com/ -i https://instagram.com/onesalon.nyc/ -s one-salon --deploy
  npm run lp -- -w https://kolorstudionyc.com/ -s kolor-studio --deploy

Then: git add Client_LPGen/ && git commit && git push
(Vercel auto-deploys → live at zarklo.com/{slug})
`);
  process.exit(0);
}

const result = spawnSync(python, [script, ...args], { cwd: root, stdio: "inherit", env: process.env });
process.exit(result.status ?? 1);
