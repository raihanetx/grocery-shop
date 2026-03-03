import type { PrecacheEntry } from "serwist";
import { installSerwist } from "@serwist/next/browser";

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: PrecacheEntry[];
};

installSerwist({
  precacheEntries: self.__WB_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
});
