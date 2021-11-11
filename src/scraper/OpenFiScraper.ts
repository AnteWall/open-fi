import format from "date-fns/format";
import merge from "lodash/merge";
import fetch from "node-fetch-commonjs";
import neatCsv from "neat-csv";

import {
  TransactionSearchRawENResponse,
  TransactionSearchRawSVResponse,
  TransactionSearchResponse,
} from "./types";

export interface OpenFIScraperOptions {
  baseUrl?: string;
}

export enum Language {
  SV = "sv-SE",
  EN = "en-GB",
}

const DEFAULT_OPTIONS: OpenFIScraperOptions = {
  baseUrl: "https://marknadssok.fi.se/publiceringsklient",
};

export default class OpenFIScraper {
  private options: OpenFIScraperOptions;

  constructor(options: OpenFIScraperOptions = {}) {
    this.options = merge(DEFAULT_OPTIONS, options);
  }

  async insiderInformation(
    day: Date,
    language: Language.SV
  ): Promise<TransactionSearchRawSVResponse[]>;
  async insiderInformation(
    day: Date,
    language: Language.EN
  ): Promise<TransactionSearchRawENResponse[]>;
  async insiderInformation(day: Date, language: Language = Language.SV) {
    const formattedDate = format(day, "yyyy-MM-dd");

    const params = new URLSearchParams({
      SearchFunctionType: "Insyn",
      "Publiceringsdatum.From": formattedDate,
      "Publiceringsdatum.To": formattedDate,
      button: "export",
    });
    const url = `${
      this.options.baseUrl
    }/${language}/Search/Search?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "text/csv",
        "Accept-Encoding": "gzip",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
      },
    });
    const csvAsString = (await response.buffer()).toString("utf16le");
    const res = (await neatCsv(csvAsString, {
      separator: ";",
    })) as TransactionSearchResponse[];
    return res;
  }
}
