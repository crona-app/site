import { defineMiddleware } from "astro:middleware";
import { goImportResponse } from "./lib/go-import.js";

export const onRequest = defineMiddleware((context, next) => {
  return goImportResponse(context.url) ?? next();
});
