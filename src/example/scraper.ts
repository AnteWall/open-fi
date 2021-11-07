import OpenFIScraper, { Language } from "../scraper/OpenFiScraper";
import { generateHashId, mapTransactionENRow } from "../scraper/utils";
import { fullSync } from "../server/worker/worker";

async function main() {
  fullSync();
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {});
