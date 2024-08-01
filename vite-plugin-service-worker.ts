// @ts-nocheck
import type { Plugin } from "vite";
import { createHash } from "crypto";

export default function ViteServiceWorker({
  importPrefix = "service-worker:",
  output = "service-worker.js",
  include = ["."],
} = {}): Plugin {
  return {
    name: "service-worker",
    async resolveId(id, importer) {
      if (!id.startsWith(importPrefix)) return;
      const plainId = id.slice(importPrefix.length);
      const result = await this.resolve(plainId, importer);
      if (!result) return;

      return importPrefix + result.id;
    },
    load(id) {
      if (!id.startsWith(importPrefix)) return;

      const fileId = this.emitFile({
        type: "chunk",
        id: id.slice(importPrefix.length),
        fileName: output,
      });

      return `export default import.meta.ROLLUP_FILE_URL_${fileId};`;
    },
    generateBundle(options, bundle) {
      const serviceWorkerChunk = bundle[output];

      const cacheChunks = Object.values(bundle).filter(
        (d) => d !== serviceWorkerChunk
      );

      const cacheURLs = [...include, ...cacheChunks.map((d) => d.fileName)];
      const ASSETS = JSON.stringify(cacheURLs);

      const versionHash = createHash("sha1");
      for (const item of cacheChunks) {
        versionHash.update(item.code || item.source);
      }
      const VERSION = JSON.stringify(versionHash.digest("hex"));

      serviceWorkerChunk.code = `const VERSION = ${VERSION};const ASSETS = ${ASSETS};${serviceWorkerChunk.code}`;
    },
  };
}
