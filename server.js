import express from "express";
import { baueGesetzDatenbank } from "./gesetzDatenbank.js";

const app = express();
app.use(express.json());

let datenbank = {};

(async () => {
  datenbank = await baueGesetzDatenbank();
})();

app.post("/frage", (req, res) => {
  const frage = req.body.frage.toLowerCase();

  const antworten = [];

  for (const gesetz in datenbank) {
    for (const paragraf in datenbank[gesetz]) {
      const text = datenbank[gesetz][paragraf].toLowerCase();

      if (text.includes(frage)) {
        antworten.push({
          gesetz,
          paragraf,
          text: datenbank[gesetz][paragraf]
        });
      }
    }
  }

  res.json({ antworten });
});

app.listen(3000, () => console.log("Judika Professional Backend läuft"));
