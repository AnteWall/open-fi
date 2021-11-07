import OpenFIScraper, { Language } from "../scraper/OpenFiScraper";

async function main() {
  const scraper = new OpenFIScraper();

  const day = new Date(2021, 10, 5);

  const res = await scraper.insiderInformation(day, Language.SV);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {});
