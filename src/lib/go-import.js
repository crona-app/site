const REPOSITORY_URL = "https://github.com/webxsid/crona";

const html = `<!doctype html>
<html><head>
<meta charset="utf-8">
<meta name="go-import" content="crona.work git ${REPOSITORY_URL}">
<meta name="go-source" content="crona.work ${REPOSITORY_URL} ${REPOSITORY_URL}/tree/main{/dir} ${REPOSITORY_URL}/blob/main{/dir}/{file}#L{line}">
<meta http-equiv="refresh" content="0; url=${REPOSITORY_URL}">
</head><body>Go module <code>crona.work</code>: <a href="${REPOSITORY_URL}">source</a></body></html>`;

/** @param {URL} url */
export function goImportResponse(url) {
  if (url.searchParams.get("go-get") !== "1") return undefined;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
