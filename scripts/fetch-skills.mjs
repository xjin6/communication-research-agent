/**
 * Fetches the latest skills data from xjin6/comm-agent README
 * and writes it to src/data/skills.json.
 *
 * Run: node scripts/fetch-skills.mjs
 */

const REPO = "xjin6/comm-agent";
const API = `https://api.github.com/repos/${REPO}/readme`;

async function main() {
  const headers = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(API, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);

  const { content } = await res.json();
  const readme = Buffer.from(content, "base64").toString("utf-8");

  // Parse the skills table from README
  // Format: | [skill-name](./path/) | version | description |
  const skillRows = readme
    .split("\n")
    .filter((line) => line.startsWith("| [skill-"));

  const skills = skillRows.map((row) => {
    const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
    // cells[0] = [skill-name](./path/)
    // cells[1] = version
    // cells[2] = description
    const nameMatch = cells[0].match(/\[(.+?)\]/);
    const name = nameMatch
      ? nameMatch[1]
          .replace(/^skill-/, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : cells[0];

    return {
      name,
      version: cells[1] || "0.1.0",
      category: "TOOL",
      description: cells[2] || "",
      author: "@xjin6",
    };
  });

  const output = JSON.stringify(skills, null, 2);

  const fs = await import("fs");
  fs.writeFileSync(
    new URL("../src/data/skills.json", import.meta.url),
    output
  );

  console.log(`Fetched ${skills.length} skills from ${REPO}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
