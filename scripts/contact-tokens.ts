/**
 * Keeps business contact details in one place: client/src/config/site.ts.
 *
 * React code imports CONTACT / telLink directly. Two files can't import:
 * client/index.html (the pre-JS crawler fallback) and client/public/llms.txt
 * (read by AI crawlers). They carry %CONTACT_*% tokens instead, filled from
 * CONTACT at build time — so a number change is a one-line edit in site.ts.
 *
 * The build also fails if the number is typed by hand anywhere in client/.
 * A hard-coded copy is how the old number survived in 29 files: every page
 * that pasted it had to be found and edited when it changed, and a missed one
 * is a NAP mismatch that weakens the local-search entity.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { CONTACT } from "../client/src/config/site";

const TOKENS: Record<string, string> = {
  CONTACT_PHONE: CONTACT.phone,
  CONTACT_PHONE_DISPLAY: CONTACT.phoneDisplay,
  CONTACT_WHATSAPP: CONTACT.whatsapp,
  CONTACT_EMAIL: CONTACT.email,
};

/** Replaces %CONTACT_*% tokens. Throws on an unknown token rather than shipping it. */
export function fillContactTokens(text: string, source: string): string {
  return text.replace(/%(CONTACT_[A-Z_]+)%/g, (token, key: string) => {
    const value = TOKENS[key];
    if (value === undefined) {
      throw new Error(`[contact-tokens] Unknown token ${token} in ${source}`);
    }
    return value;
  });
}

/** The 10-digit national number, with any spaces/dashes allowed between digits. */
function hardcodedPhonePattern(): RegExp {
  const national = CONTACT.phone.replace(/\D/g, "").slice(-10);
  return new RegExp(national.split("").join("[\\s-]?"));
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/**
 * Fails the build if the phone number is typed by hand anywhere in client/
 * outside site.ts. Binary assets are skipped.
 */
export function assertNoHardcodedContact(repoRoot: string): void {
  const clientDir = join(repoRoot, "client");
  const siteConfig = join(clientDir, "src/config/site.ts");
  const pattern = hardcodedPhonePattern();
  const hits: string[] = [];

  for (const file of walk(clientDir)) {
    if (file === siteConfig) continue;
    if (!/\.(tsx?|jsx?|html|txt|md|json|xml)$/.test(file)) continue;
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (pattern.test(line)) hits.push(`${relative(repoRoot, file)}:${i + 1}`);
      });
  }

  if (hits.length > 0) {
    throw new Error(
      "[contact-tokens] Phone number is hard-coded outside client/src/config/site.ts.\n" +
        "Use CONTACT / telLink in code, or %CONTACT_PHONE% / %CONTACT_PHONE_DISPLAY% in index.html and llms.txt:\n  " +
        hits.join("\n  "),
    );
  }
}
