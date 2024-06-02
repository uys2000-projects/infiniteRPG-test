import "dotenv/config";

/**
 * Logs the environment and clears console for logging
 */
export default function () {
  console.clear();
  console.log(`Environment: ${process.env.NODE_ENV ?? "DEV"}\n`);
}
