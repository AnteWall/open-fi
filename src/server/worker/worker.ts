import { InsiderTransaction } from "../../scraper/types";
import { PrismaClient } from ".prisma/client";
import { generateHashId, mapTransactionENRow } from "../../scraper/utils";
import OpenFIScraper, { Language } from "../../scraper/OpenFiScraper";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

const FIRST_DATA_DAY = new Date(2016, 5, 1);

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
  const scraper = new OpenFIScraper();
  const client = new PrismaClient();
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
};
