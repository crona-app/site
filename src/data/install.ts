// Install instructions shared by the install modal and the closing install section.
// Keep in step with https://docs.crona.work/install/.

export interface PackageManager {
  id: "brew" | "scoop";
  label: string;
  install: string[];
  update: string;
}

export const packageManagers: Record<PackageManager["id"], PackageManager> = {
  brew: {
    id: "brew",
    label: "Homebrew",
    install: ["brew install webxsid/tap/crona"],
    update: "brew upgrade crona",
  },
  scoop: {
    id: "scoop",
    label: "Scoop",
    // Two commands rather than `&&`, which Windows PowerShell 5.1 rejects.
    install: ["scoop bucket add webxsid https://github.com/webxsid/scoop-bucket", "scoop install crona"],
    update: "scoop update crona",
  },
};

export const runCommand = "crona";

export interface InstallPlatform {
  id: "macos" | "linux" | "windows";
  label: string;
  manager: PackageManager["id"];
  /** Extra route shown under the steps, for people without the package manager. */
  alternative?: { text: string; href: string };
}

export const installPlatforms: InstallPlatform[] = [
  { id: "macos", label: "macOS", manager: "brew" },
  {
    id: "linux",
    label: "Linux",
    manager: "brew",
    alternative: {
      text: "No Homebrew? Download the Linux bundle (amd64 · arm64)",
      href: "https://github.com/webxsid/crona/releases/latest",
    },
  },
  { id: "windows", label: "Windows", manager: "scoop" },
];

export const installDocsUrl = "https://docs.crona.work/install/";
