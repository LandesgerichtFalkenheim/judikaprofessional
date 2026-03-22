const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");

// einfache Keyword-Router für "Weiterleitung"
const routes = [
  {
    keywords: ["kontakt", "telefon", "sprechzeiten"],
    hint: "Informationen zum Kontakt des Landesgerichts Falkenheim finden Sie im Bereich „Kontakt“ der Website.",
    linkText: "Zur Kontaktseite",
    href: "#kontakt",
  },
  {
    keywords: ["organisation", "aufbau", "abteilungen"],
    hint: "Details zur Organisation des Landesgerichts Falkenheim finden Sie im Bereich „Organisation“.",
    linkText: "Zur Organisationsseite",
    href: "#organisation",
  },
  {
    keywords: ["rechtsprechung", "urteil", "urteile"],
    hint: "Hinweise zur Rechtsprechung im Falkenheim‑Modell finden Sie im Bereich „Rechtsprechung“.",
    linkText: "Zur Rechtsprechungsseite",
    href: "#rechtsprechung",
  },
];

const systemNotice =
  "Hinweis: Judika Professional darf ausschließlich Informationen aus den hinterlegten Gesetzestexten verwenden. " +
  "Sie ersetzt keine Rechtsberatung und ist nicht für reale Gesetzbücher der Bundesrepublik Deutschland zugelassen. " +
  "Die Verwendung der Judika Professional ersetzt keine gültige Rechtssprechung. Weitere Details finden Sie im § 34 StPO.";

function appendMessage(author, text, type = "judika") {
  const wrapper = document.createElement("div");
  wrapper.className = `message message-${type}`;

  const authorEl = document.createElement("div");
  authorEl.className = "message-author";
  authorEl.textContent = author;

  const textEl = document.createElement("div");
  textEl.className = "message-text";
  textEl.textContent = text;

  wrapper.appendChild(authorEl);
  wrapper.appendChild(textEl);
  chatLog.appendChild(wrapper);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function appendLinkHint(hint, linkText, href) {
  const wrapper = document.createElement("div");
  wrapper.className = "message message-judika";

  const authorEl = document.createElement("div");
  authorEl.className = "message-author";
  authorEl.textContent = "Judika Professional";

  const textEl = document.createElement("div");
  textEl.className = "message-text";

  const p = document.createElement("p");
  p.textContent = hint;

  const a = document.createElement("a");
  a.href = href;
  a.textContent = linkText;
  a.style.color = "#3b82f6";
  a.style.textDecoration = "none";

  textEl.appendChild(p);
  textEl.appendChild(a);

  wrapper.appendChild(authorEl);
  wrapper.appendChild(textEl);
  chatLog.appendChild(wrapper);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function handleUserQuestion(question) {
  const q = question.toLowerCase();

  // einfache Weiterleitungslogik
  for (const route of routes) {
    if (route.keywords.some((k) => q.includes(k))) {
      appendLinkHint(route.hint, route.linkText, route.href);
      appendMessage(
        "Judika Professional",
        "Bitte beachten Sie: Die Verwendung der Judika Professional ersetzt keine gültige Rechtssprechung. Weitere Details finden Sie im § 34 StPO.",
        "judika"
      );
      return;
    }
  }

  // Platzhalter-Antwort – hier würde später die echte KI-/Gesetzeslogik andocken
  appendMessage(
    "Judika Professional",
    "Dies ist eine Platzhalterantwort. In einer erweiterten Version würde Judika Professional nun relevante Gesetzesstellen aus den hinterlegten PDFs abrufen und auf dieser Basis antworten.",
    "judika"
  );
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;

  appendMessage("Sie", question, "user");
  chatInput.value = "";

  handleUserQuestion(question);
});

// Systemhinweis beim Laden anzeigen
window.addEventListener("DOMContentLoaded", () => {
  appendMessage("System", systemNotice, "judika");
  appendMessage(
    "Judika Professional",
    "Willkommen. Stellen Sie Ihre Frage zu den hinterlegten Gesetzestexten im Modell-Landesgericht Falkenheim.",
    "judika"
  );
});
