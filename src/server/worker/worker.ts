import OpenFIScraper, { Language } from "../../scraper/OpenFiScraper";
import Queue, { DoneCallback, Job } from "bull";
import { generateHashId, mapTransactionENRow } from "../../scraper/utils";

import { InsiderTransaction } from "../../scraper/types";
import { PrismaClient } from "@prisma/client";
import client from "../prisma";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

const FIRST_DATA_DAY = new Date(2016, 5, 1);

export const scrapeQueue = new Queue("scrapeQueue", process.env.REDIS_URL);
export const fullScrapeQueue = new Queue(
  "fullScrapeQueue",
  process.env.REDIS_URL
);

const scrapeCronJob = async (job: Job, done: DoneCallback) => {
  console.log(`starting scrape ${new Date().toISOString()}`);
  const scraper = new OpenFIScraper();
  await client.$connect();
  const res = await scraper.insiderInformation(new Date(), Language.EN);
  const mappedValues = res.map(mapTransactionENRow);

  await saveToDatabase(mappedValues, client);
  console.log("Scrape done");
  await client.$disconnect();
  done();
};

scrapeQueue.process(scrapeCronJob);

const saveToDatabase = async (
  rows: InsiderTransaction[],
  client: PrismaClient
) => {
  for (const row of rows) {
    const id = generateHashId(row);
    await client.insiderTrade.upsert({
      where: {
        id,
      },
      create: {
        id,
        amendment: row.amendment,
        amendmentDetails: row.amendmentDetails,
        closelyAssociated: row.closelyAssociated,
        currency: row.currency,
        initialNotification: row.initialNotification,
        instrumentName: row.instrumentName,
        instrumentType: row.instrumentType,
        isin: row.isin,
        issuer: row.issuer,
        leiCode: row.leiCode,
        notifier: row.notifier,
        managerialResponsibilities: row.managerialResponsibilities,
        position: row.position,
        price: row.price,
        publicationDateTime: row.publicationDateTime,
        shareOrOptionProgram: row.shareOrOptionProgram,
        status: row.status,
        transactionDateTime: row.transactionDateTime,
        transactionType: row.transactionType,
        unit: row.unit,
        venue: row.venue,
        volume: row.volume,
      },
      update: {},
    });
  }
};

export const fullSync = async () => {
  console.log("starting full scrape");
  const scraper = new OpenFIScraper();
  await client.$connect();
  const days = eachDayOfInterval({
    start: FIRST_DATA_DAY,
    end: new Date(),
  });

  for (const d of days) {
    const res = await scraper.insiderInformation(d, Language.EN);
    const mappedValues = res.map(mapTransactionENRow);

    await saveToDatabase(mappedValues, client);
  }

  await client.$disconnect();
  console.log("Scrape done");
};

fullScrapeQueue.process(fullSync);
