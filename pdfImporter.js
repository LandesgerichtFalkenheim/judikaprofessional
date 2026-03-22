import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

const ORDNER = "./gesetzbuecher/";

export async function ladeAllePDFs() {
  const dateien = fs.readdirSync(ORDNER).filter(f => f.endsWith(".pdf"));

  const gesetze = {};

  for (const datei of dateien) {
    const filePath = path.join(ORDNER, datei);
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    gesetze[datei.replace(".pdf", "")] = pdfData.text;
  }

  return gesetze;
}
