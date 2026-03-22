import { ladeAllePDFs } from "./pdfImporter.js";
import { parseParagraphs } from "./paragraphParser.js";

export async function baueGesetzDatenbank() {
  const rohTexte = await ladeAllePDFs();

  const datenbank = {};

  for (const gesetzName in rohTexte) {
    datenbank[gesetzName] = parseParagraphs(rohTexte[gesetzName]);
  }

  return datenbank;
}
