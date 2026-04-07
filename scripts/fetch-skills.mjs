/**
 * Fetches skills from xjin6/comm-agent — reads each skill's README.md
 * to extract version, lastUpdate, category (type), author, and description.
 *
 * Run: node scripts/fetch-skills.mjs
 */

const REPO = "xjin6/comm-agent";
const SKILLS_DIR = "general-skill";
const API_BASE = `https://api.github.com/repos/${REPO}`;

function makeHeaders() {
  const headers = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: makeHeaders() });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
  return res.json();
}

async function tryFetchJSON(url) {
  const res = await fetch(url, { headers: makeHeaders() });
  if (!res.ok) return null;
  return res.json();
}

function parseReadme(text) {
  const lines = text.split("\n");

  // Title from first h1
  const titleLine = lines.find((l) => l.startsWith("# "));
  const name = titleLine ? titleLine.replace(/^#\s+/, "").trim() : "";

  // Meta line: > **v0.1.0** · Updated 2026-03-26 · `scraper`
  const metaLine = lines.find((l) => /^>\s+\*\*v/.test(l));
  let version = "0.1.0", lastUpdate = "", category = "tool";
  if (metaLine) {
    const vMatch = metaLine.match(/\*\*(v[\d.]+)\*\*/);
    if (vMatch) version = vMatch[1];

    const dateMatch = metaLine.match(/Updated\s+([\d-]+)/);
    if (dateMatch) lastUpdate = dateMatch[1];

    const typeMatch = metaLine.match(/`([^`]+)`/);
    if (typeMatch) category = typeMatch[1];
  }

  // Description: first non-empty, non-header, non-meta paragraph after the meta line
  let description = "";
  let pastMeta = false;
  for (const line of lines) {
    if (!pastMeta) {
      if (/^>\s+\*\*v/.test(line)) pastMeta = true;
      continue;
    }
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith(">") && !trimmed.startsWith("|") && !trimmed.startsWith("!")) {
      description = trimmed;
      break;
    }
  }

  // Author: from "## Author" section — **Name** (@handle)
  let author = "";
  const authorIdx = lines.findIndex((l) => /^##\s+Author/.test(l));
  if (authorIdx !== -1) {
    for (let i = authorIdx + 1; i < lines.length && i < authorIdx + 6; i++) {
      const handleMatch = lines[i].match(/\(@(\w+)\)/);
      if (handleMatch) {
        author = `@${handleMatch[1]}`;
        break;
      }
    }
  }

  return { name, version, category, description, author, lastUpdate };
}

async function main() {
  // List all skill-* directories under general-skill/
  const entries = await tryFetchJSON(`${API_BASE}/contents/${SKILLS_DIR}`);
  if (!entries) {
    console.warn("Could not reach comm-agent repo (missing token or private repo). Using existing skills.json as fallback.");
    return;
  }
  const skillDirs = entries.filter((e) => e.type === "dir" && e.name.startsWith("skill-"));

  const skills = await Promise.all(
    skillDirs.map(async (dir) => {
      try {
        const readmeRes = await fetchJSON(`${API_BASE}/contents/${SKILLS_DIR}/${dir.name}/README.md`);
        const text = Buffer.from(readmeRes.content, "base64").toString("utf-8");
        return parseReadme(text);
      } catch (e) {
        console.warn(`  ⚠ Could not fetch README for ${dir.name}: ${e.message}`);
        // Fallback: derive name from folder, minimal info
        return {
          name: dir.name
            .replace(/^skill-/, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          version: "0.1.0",
          category: "tool",
          description: "",
          author: "",
          lastUpdate: "",
        };
      }
    })
  );

  const output = JSON.stringify(skills, null, 2);
  const fs = await import("fs");
  fs.writeFileSync(new URL("../src/data/skills.json", import.meta.url), output);

  console.log(`Fetched ${skills.length} skills from ${REPO}/${SKILLS_DIR}`);
  skills.forEach((s) => console.log(`  • ${s.name} ${s.version} [${s.category}] — ${s.author} — ${s.lastUpdate}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
