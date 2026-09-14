const { spawn } = require("child_process");
const path = require("path");

const INTERVAL_MINUTES = 15;
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

function runSync() {
  const timestamp = new Date().toLocaleTimeString();
  console.log(\n[] Starting scheduled OSCI'26 leaderboard sync...);

  const child = spawn("node", [path.resolve(__dirname, "backfill-contributions-table.js")], {
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (code) => {
    const finishedAt = new Date().toLocaleTimeString();
    if (code === 0) {
      console.log([] Leaderboard sync completed successfully!);
    } else {
      console.error([] Sync process exited with error code );
    }
    console.log(Next sync in  minutes...);
  });

  child.on("error", (err) => {
    console.error("Failed to start sync process:", err);
  });
}

console.log(=== OSCI'26 Auto-Sync Scheduler Started (Runs every  mins) ===);

// Run immediately on launch
runSync();

// Repeat every 15 minutes
setInterval(runSync, INTERVAL_MS);
