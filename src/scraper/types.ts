export type TransactionSearchResponse =
  | TransactionSearchRawENResponse
  | TransactionSearchRawSVResponse;

export interface InsiderTransaction {
  publicationDateTime: Date;
  issuer: string;
  leiCode: string;
  notifier: string;
  managerialResponsibilities: string;
  position: string;
  closelyAssociated: boolean;
  amendment: boolean;
  amendmentDetails: string;
  initialNotification: string;
  shareOrOptionProgram: boolean;
  transactionType: string;
  instrumentType: string;
  instrumentName: string;
  isin: string;
  transactionDateTime: Date;
  volume: number;
  price: number;
  unit: string;
  currency: string;
  venue: string;
  status: string;
}

export interface TransactionSearchRawENResponse {
  "Publication date": string;
  Issuer: string;
  "LEI-code": string;
  Notifier: string;
  "Person discharging managerial responsibilities": string;
  Position: string;
  "Closely associated": string;
  Amendment: string;
  "Details of amendment": string;
  "Initial notification": string;
  "Linked to share option programme": string;
  "Nature of transaction": string;
  "Intrument type": string;
  "Instrument name": string;
  ISIN: string;
  "Transaction date": string;
  Volume: string;
  Unit: string;
  Price: string;
  Currency: string;
  "Trading venue": string;
  Status: string;
}
export interface TransactionSearchRawSVResponse {
  Publiceringsdatum: string;
  Emittent: string;
  "LEI-kod": string;
  Anmälningsskyldig: string;
  "Person i ledande ställning": string;
  Befattning: string;
  Närstående: string;
  Korrigering: string;
  "Beskrivning av korrigering": string;
  "Är förstagångsrapportering": string;
  "Är kopplad till aktieprogram": string;
  Karaktär: string;
  Instrumenttyp: string;
  Instrumentnamn: string;
  ISIN: string;
  Transaktionsdatum: string;
  Volym: string;
  Volymsenhet: string;
  Pris: string;
  Valuta: string;
  Handelsplats: string;
  Status: string;
}
