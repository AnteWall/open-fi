import parse from "date-fns/parse";
import {
  InsiderTransaction,
  TransactionSearchRawENResponse,
  TransactionSearchResponse,
} from "./types";

function cyrb53(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function generateHashId(row: InsiderTransaction): string {
  return cyrb53(JSON.stringify(row)).toString();
}

const EN_DATETIME_FORMAT = "dd/MM/yyyy HH:mm:ss";

export function mapTransactionENRow(
  row: TransactionSearchRawENResponse
): InsiderTransaction {
  return {
    amendment: row.Amendment.toLowerCase() === "yes",
    amendmentDetails: row["Details of amendment"],
    closelyAssociated: row["Closely associated"].toLowerCase() === "yes",
    currency: row.Currency.toUpperCase(),
    initialNotification: row["Initial notification"],
    instrumentName: row["Instrument name"],
    instrumentType: row["Intrument type"],
    isin: row.ISIN,
    issuer: row.Issuer,
    leiCode: row["LEI-code"],
    managerialResponsibilities:
      row["Person discharging managerial responsibilities"],
    notifier: row.Notifier,
    position: row.Position,
    publicationDateTime: parse(
      row["Publication date"],
      EN_DATETIME_FORMAT,
      new Date()
    ),
    shareOrOptionProgram:
      row["Linked to share option programme"].toLowerCase() === "yes",
    status: row.Status,
    transactionDateTime: parse(
      row["Transaction date"],
      EN_DATETIME_FORMAT,
      new Date()
    ),
    transactionType: row["Nature of transaction"],
    unit: row.Unit,
    price: Number(row.Price),
    venue: row["Trading venue"],
    volume: Number(row.Volume),
  };
}
