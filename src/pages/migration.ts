import type { APIRoute } from "astro";

export const GET: APIRoute = ({ redirect }) =>
  redirect("https://github.com/crona-app/crona/blob/main/docs/migration.md", 302);
