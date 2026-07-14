import { spawn, spawnSync } from "node:child_process";

const env = {
  ...process.env,
  NODE_ENV: "development",
  PORT: process.env.PORT ?? "3000",
};
const shell = process.platform === "win32";

const build = spawnSync("corepack", ["pnpm", "run", "build"], {
  env,
  shell,
  stdio: "inherit",
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const server = spawn("node", ["--enable-source-maps", "./dist/index.mjs"], {
  env,
  stdio: "inherit",
});

server.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
