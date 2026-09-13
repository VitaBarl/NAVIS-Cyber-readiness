# NAVIS Cyber Readiness

NAVIS è un simulatore locale di security awareness ambientato in un contesto marittimo-militare. Trasforma i temi di phishing e social engineering della tesi di riferimento in otto esercitazioni difensive con valutazione, debrief e modello delle contromisure.

L’applicazione non invia messaggi, non raccoglie credenziali e non contatta servizi esterni. Tutti gli esempi sono fittizi e i domini sono resi non cliccabili con la notazione `[.]`.

## Funzioni

- quadro operativo con avanzamento, accuratezza e rischio residuo;
- scenari su e-mail, SMS, voce, social network, portali clonati, tailgating, baiting e quid pro quo;
- identificazione guidata degli indicatori e scelta della risposta operativa;
- punteggio e debrief immediato con contromisure suggerite;
- configuratore di difesa per filtri, blocklist, MFA, formazione, verifica fuori banda, reporting e controllo accessi;
- rapporto locale esportabile in JSON;
- salvataggio nel solo `localStorage` del browser;
- interfaccia responsive e navigabile da tastiera.

## Avvio locale

Requisito: Node.js 18 o superiore. Non sono necessarie dipendenze né un passaggio di installazione.

```bash
npm start
```

Aprire quindi `http://127.0.0.1:4173`.

Per usare una porta diversa:

```bash
PORT=8080 npm start
```

## Verifica

```bash
npm test
```

I test coprono punteggio, progressione, rischio residuo e generazione del rapporto.

## Struttura

```text
dist/                 applicazione statica pronta all’uso
  index.html
  styles.css
  app.js
  domain.mjs          scenari e logica di valutazione
test/                 test automatici senza dipendenze
docs/                 report degli scenari e tracciabilità con la tesi
server.mjs            server HTTP locale con intestazioni di sicurezza
.github/workflows/    pubblicazione opzionale su GitHub Pages
```

## Pubblicazione su GitHub

1. creare un repository vuoto su GitHub;
2. aggiungerlo come remote del repository locale;
3. eseguire il push del branch `main`;
4. in GitHub, abilitare Pages con sorgente **GitHub Actions**.

Il workflow incluso pubblica esclusivamente la cartella `dist`. La pubblicazione è opzionale: il progetto funziona interamente in locale.

## Documentazione

- `docs/REPORT_SCENARI.md`: report tecnico dettagliato e versionabile degli otto scenari;
- `docs/Report_dettagliato_scenari_NAVIS.docx`: versione Word impaginata per consegna e consultazione;
- `docs/TRACEABILITY.md`: sintesi della corrispondenza fra i temi della tesi e le funzioni del sistema.

## Uso responsabile

NAVIS è uno strumento di formazione difensiva. Non deve essere usato per raccogliere dati reali, impersonare persone, inviare campagne o eludere controlli. Prima di un impiego organizzativo occorre adattare ruoli, procedure, classificazione e canali di segnalazione alle policy applicabili.

## Licenza

Distribuito con licenza MIT. Vedere `LICENSE`.
