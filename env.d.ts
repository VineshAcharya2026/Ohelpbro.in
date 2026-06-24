/// <reference path="./cloudflare-env.d.ts" />

interface CloudflareEnv {
  DB: D1Database;
  NEXT_INC_CACHE_R2_BUCKET: R2Bucket;
  WORKER_SELF_REFERENCE: Fetcher;
  IMAGES: ImagesBinding;
  ASSETS: Fetcher;
}
