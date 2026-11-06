import assert from "node:assert/strict";
import test from "node:test";
import { goImportResponse } from "../src/lib/go-import.js";

for (const path of [
  "/?go-get=1",
  "/cli/cmd/crona?go-get=1",
  "/tui/cmd/crona-tui?go-get=1&foo=bar",
  "/kernel/cmd/crona-daemon?go-get=1",
]) {
  test(`serves Go metadata for ${path}`, async () => {
    const response = goImportResponse(new URL(path, "https://crona.work"));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Content-Type"), "text/html; charset=utf-8");
    assert.equal(response.headers.get("Cache-Control"), "public, max-age=3600");
    const body = await response.text();
    assert.equal(body.split('<meta name="go-import" content="crona.work git https://github.com/crona-app/crona">').length - 1, 1);
    assert.ok(body.includes('name="go-source"'));
    assert.ok(body.includes('/blob/main{/dir}/{file}#L{line}'));
    assert.ok(body.includes('http-equiv="refresh"'));
  });
}

for (const path of ["/install.sh", "/migration", "/?go-get=0", "/?go-get=", "/"]) {
  test(`passes through ${path}`, () => {
    assert.equal(goImportResponse(new URL(path, "https://crona.work")), undefined);
  });
}
