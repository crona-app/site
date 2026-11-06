// Install instructions shared by the install modal and the closing install section.
// Keep in step with https://docs.crona.work/install/.

export interface InstallMethod {
  id: InstallMethodId;
  label: string;
  /** Where the method works, shown under the tabs. */
  platforms: string;
  /** Lead-in for the install step. */
  intro: string;
  install: string[];
  update: string;
}

export type InstallMethodId = "brew" | "scoop" | "nix" | "sh" | "powershell";

const scriptBase = "https://github.com/crona-app/crona/releases/latest/download";

// Each release ships install scripts pinned to its own version, so /latest/ always installs the
// newest build. They verify checksums, unpack bundled assets and stop a running daemon first.
export const installMethods: InstallMethod[] = [
  {
    id: "brew",
    label: "brew",
    platforms: "macOS · Linux",
    intro: "Install with Homebrew:",
    install: ["brew install webxsid/tap/crona"],
    update: "brew upgrade crona",
  },
  {
    id: "scoop",
    label: "scoop",
    platforms: "Windows",
    intro: "Install with Scoop:",
    // Two commands rather than `&&`, which Windows PowerShell 5.1 rejects.
    install: ["scoop bucket add webxsid https://github.com/webxsid/scoop-bucket", "scoop install crona"],
    update: "scoop update crona",
  },
  {
    id: "nix",
    label: "nix",
    platforms: "Linux · Apple silicon Macs",
    intro:
      "Install from the crona flake. Needs flakes enabled (experimental-features = nix-command flakes); on older Nix, use profile install:",
    install: ["nix profile add github:crona-app/crona#crona"],
    update: "nix profile upgrade crona",
  },
  {
    id: "sh",
    label: "curl",
    platforms: "macOS · Linux, without a package manager",
    intro: "Run the install script. It puts crona in ~/.local/bin; add that to your PATH if needed:",
    install: [`curl -fsSL ${scriptBase}/install-crona-tui.sh | sh`],
    update: `curl -fsSL ${scriptBase}/install-crona-tui.sh | CRONA_INSTALL_FORCE=1 sh`,
  },
  {
    id: "powershell",
    label: "powershell",
    platforms: "Windows, without Scoop",
    intro: "Run the install script in PowerShell. It adds crona to your PATH:",
    install: [`irm ${scriptBase}/install-crona-tui.ps1 | iex`],
    update: `irm ${scriptBase}/install-crona-tui.ps1 | iex`,
  },
];

export const runCommand = "crona";

export const installDocsUrl = "https://docs.crona.work/install/";
