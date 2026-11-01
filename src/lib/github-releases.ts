import { fetchGitHub, repoApiPath } from "./github-api";

export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface GitHubRelease {
  draft: boolean;
  prerelease: boolean;
  tag_name?: string | null;
  name?: string | null;
  html_url: string;
  published_at?: string | null;
  body?: string | null;
  assets?: GitHubReleaseAsset[];
}

export async function loadGitHubReleases(repoUrl: string, perPage = 20): Promise<GitHubRelease[]> {
  return fetchGitHub<GitHubRelease[]>(`${repoApiPath(repoUrl)}/releases?per_page=${perPage}`);
}
