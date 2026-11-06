import type { APIRoute } from "astro";

const repo = "crona-app/crona";
const installerUrl = `https://github.com/${repo}/releases/latest/download/install-crona-tui.sh`;

const script = `#!/usr/bin/env sh
set -eu

REPO="${repo}"
INSTALLER_URL="${installerUrl}"
TMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d /tmp/crona-install.XXXXXX)"
INSTALLER_PATH="\${TMP_DIR}/install-crona-tui.sh"

cleanup() {
  rm -rf "\${TMP_DIR}"
}

trap cleanup EXIT INT TERM

if ! command -v curl >/dev/null 2>&1; then
  echo "Required command not found: curl" >&2
  exit 1
fi

echo "Downloading Crona installer from \${INSTALLER_URL}"
curl -fsSL "\${INSTALLER_URL}" -o "\${INSTALLER_PATH}"
sh "\${INSTALLER_PATH}"
`;

export const GET: APIRoute = () =>
  new Response(script, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/x-sh; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
