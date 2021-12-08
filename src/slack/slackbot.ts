import OpenFIScraper, { Language } from "../scraper/OpenFiScraper";
import { generateHashId, mapTransactionENRow } from "../scraper/utils";

import { TransactionSearchRawENResponse } from "./../scraper/types";
import axios from "axios";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();

function postToSlack(rows: TransactionSearchRawENResponse[]) {
  const url = process.env.SLACK_WEBHOOK_URL;
  const formattedRows = rows.map((row) => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${row.Issuer}*\n:loudspeaker: ${row["Publication date"]
          }\n:currency_exchange: ${row["Transaction date"]}\n *${row.Notifier
          }* - _${row.Position}_\n ${row.Volume} ${row["Intrument type"]} at ${row.Price
          } ${row.Currency}\n *Total:* ${Number(row.Price) * Number(row.Volume)
          } ${row.Currency}\n _${row["Trading venue"]}_ - _${row.ISIN}_`,
      },
    };
  });

  const text = {
    type: "home",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `New insider trades as of ${new Date().toISOString()}`,
        },
      },
      {
        type: "divider",
      },
      ...formattedRows,
    ],
  };
  axios
    .post(url, text)
    .then((response) => {
      console.log(response.status);
    })
    .catch((err) => {
      console.error(err.response);
    });
}

const checkForNewEntries = async (
  scraper: OpenFIScraper,
  lastEntry: string | null
) => {
  const res = await scraper.insiderInformation(new Date(), Language.EN);
  const rowsToPost: TransactionSearchRawENResponse[] = [];

  const filters = res.filter((r) => {
    const mapped = mapTransactionENRow(r);
    return (
      mapped.transactionType === "Acquisition" &&
      mapped.instrumentType === "Share" &&
      mapped.closelyAssociated == false &&
      mapped.shareOrOptionProgram == false
    );
  });

  for (const row of filters.slice(
    0,
    48
  ) /* max 50 blocks inside of slack message*/) {
    if (lastEntry === generateHashId(mapTransactionENRow(row))) {
      break;
    }
    rowsToPost.push(row);
  }
  if (rowsToPost.length > 0) {
    postToSlack(rowsToPost);
  }
  return generateHashId(mapTransactionENRow(filters[0]));
};

async function main() {
  console.log(process.env.SLACK_WEBHOOK_URL);
  if (!process.env.SLACK_WEBHOOK_URL) {
    throw Error("SLACK_WEBHOOK_URL is undefined");
  }
  const scraper = new OpenFIScraper();
  let lastEntry = null;
  setInterval(async () => {
    console.log("Checking", new Date());
    lastEntry = await checkForNewEntries(scraper, lastEntry);
  }, 1 * 10000);
}

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");

  process.exit();
});

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => { });
