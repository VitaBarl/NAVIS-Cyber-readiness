export const scenarios = [
  {
    id: "email-ordine-operativo",
    order: 1,
    channel: "E-mail",
    technique: "Spear phishing e pretexting",
    risk: "Alto",
    title: "Variazione urgente del piano di ormeggio",
    summary: "Una comunicazione attribuita alla Sala Operativa richiede di consultare un allegato e riconfermare l’accesso al portale missione.",
    principles: ["Autorità", "Urgenza", "Coerenza del contesto"],
    artifact: {
      kind: "email",
      from: "Sala Operativa <pianificazione@marina-operativa[.]org>",
      to: "Ufficiale di guardia",
      subject: "IMMEDIATO — variazione piano ormeggio 18:40",
      time: "18:31",
      body: [
        "Per disposizione del Comando, il piano di ormeggio è stato aggiornato. La finestra di conferma scade tra 10 minuti.",
        "Aprire il documento Piano_Ormeggio_R7.zip e validare l’identità sul portale https://sso.marina-operativa[.]org/conferma.",
        "La mancata conferma sarà registrata come indisponibilità del reparto.",
      ],
      footer: "Cap. C. De Santis — Sala Operativa",
    },
    signals: [
      { id: "domain", label: "Il dominio imita un indirizzo istituzionale, ma non è quello ufficiale", suspicious: true },
      { id: "deadline", label: "La scadenza di dieci minuti riduce il tempo di verifica", suspicious: true },
      { id: "archive", label: "L’allegato compresso non era atteso", suspicious: true },
      { id: "credentials", label: "Il messaggio richiede una nuova autenticazione da un link ricevuto", suspicious: true },
      { id: "signature", label: "La firma contiene grado e cognome", suspicious: false },
      { id: "topic", label: "L’argomento è coerente con il servizio di guardia", suspicious: false },
    ],
    correctDecision: "verify",
    debrief: "L’attacco combina spear phishing e pretexting: usa dettagli plausibili, autorità e urgenza. Interrompere il flusso, non aprire l’allegato e verificare l’ordine sul canale operativo già noto.",
    countermeasures: ["Filtri e autenticazione e-mail", "Procedura di verifica fuori banda", "Segnalazione al nucleo cyber", "MFA resistente al phishing"],
  },
  {
    id: "sms-varco-arsenale",
    order: 2,
    channel: "SMS",
    technique: "Smishing",
    risk: "Medio-alto",
    title: "Blocco temporaneo del pass per l’arsenale",
    summary: "Un SMS apparentemente inviato dal servizio varchi segnala un’anomalia e propone un link per riattivare il pass.",
    principles: ["Urgenza", "Autorità", "Scarsità del tempo"],
    artifact: {
      kind: "sms",
      from: "SERVIZIO VARCHI",
      time: "06:52",
      body: ["AVVISO: pass arsenale sospeso per mancato allineamento. Riattivalo prima del turno: hxxps://m-arsenale[.]support/accesso — pratica 48A7."],
      footer: "SMS simulato — nessun collegamento è attivo",
    },
    signals: [
      { id: "domain", label: "Il dominio non appartiene ai servizi ufficiali", suspicious: true },
      { id: "pressure", label: "La riattivazione è legata all’imminenza del turno", suspicious: true },
      { id: "short-context", label: "Il messaggio non indica contatti o procedura di verifica", suspicious: true },
      { id: "code", label: "La pratica alfanumerica rende il messaggio più credibile", suspicious: false },
      { id: "sender", label: "Il mittente è visualizzato con un nome descrittivo", suspicious: false },
    ],
    correctDecision: "verify",
    debrief: "Il nome del mittente può essere manipolato. Non aprire il collegamento: verificare lo stato del pass attraverso il presidio o il recapito già registrato e inoltrare lo screenshot al punto di contatto cyber.",
    countermeasures: ["Formazione mobile", "Canale ufficiale per i varchi", "Filtro URL su dispositivi gestiti", "Segnalazione rapida"],
  },
  {
    id: "voice-supporto-satcom",
    order: 3,
    channel: "Voce",
    technique: "Vishing e spoofing",
    risk: "Alto",
    title: "Supporto SATCOM durante una finestra critica",
    summary: "Un sedicente tecnico segnala un guasto imminente e chiede il codice MFA ricevuto sul telefono di servizio.",
    principles: ["Autorità tecnica", "Urgenza", "Quid pro quo"],
    artifact: {
      kind: "call",
      from: "+39 0187 71 204 · Supporto reti",
      time: "Chiamata in corso · 01:46",
      body: [
        "Tecnico: Abbiamo un errore di sincronizzazione sulla vostra utenza SATCOM. Se cade la sessione, la riattivazione richiederà ore.",
        "Tecnico: Le ho inviato un codice a sei cifre. Me lo detti subito e chiudiamo l’anomalia senza interrompere il servizio.",
      ],
      footer: "Trascrizione di esercitazione",
    },
    signals: [
      { id: "otp", label: "Viene richiesto verbalmente un codice MFA", suspicious: true },
      { id: "consequence", label: "Si prospetta un’interruzione grave per accelerare la decisione", suspicious: true },
      { id: "unsolicited", label: "La chiamata di supporto non era stata aperta dal reparto", suspicious: true },
      { id: "spoofing", label: "Il numero visualizzato, da solo, non prova l’identità", suspicious: true },
      { id: "technical", label: "L’interlocutore usa terminologia tecnica", suspicious: false },
    ],
    correctDecision: "stop",
    debrief: "I codici MFA non si comunicano mai. Terminare la chiamata, annotare i dati utili e richiamare l’assistenza tramite il numero presente nella rubrica ufficiale.",
    countermeasures: ["MFA resistente al phishing", "Procedure help desk", "Verifica fuori banda", "Formazione sullo spoofing"],
  },
  {
    id: "social-collega-missione",
    order: 4,
    channel: "Social",
    technique: "Profilo falso e OSINT",
    risk: "Medio-alto",
    title: "Contatto di un collega in missione",
    summary: "Un nuovo profilo usa informazioni pubbliche per costruire familiarità e invia un documento esterno.",
    principles: ["Familiarità", "Riprova sociale", "Reciprocità"],
    artifact: {
      kind: "social",
      from: "Marco Rinaldi · Ufficiale di collegamento",
      time: "Nuova richiesta di contatto",
      body: [
        "Ciao, ci siamo incrociati durante l’esercitazione Mare Aperto. Ho visto le foto del tuo reparto.",
        "Ti giro l’ultima matrice frequenze che ci hanno passato: files-operativi[.]cloud/matrice. Fammi sapere se coincide con la vostra.",
      ],
      footer: "Profilo creato 12 giorni fa · 37 contatti",
    },
    signals: [
      { id: "new-profile", label: "Il profilo è recente e ha una rete molto ridotta", suspicious: true },
      { id: "public-detail", label: "I riferimenti possono provenire da contenuti pubblici", suspicious: true },
      { id: "external", label: "Il file operativo è ospitato su un servizio esterno", suspicious: true },
      { id: "unverified", label: "L’identità non è stata verificata su un canale istituzionale", suspicious: true },
      { id: "mutual", label: "Sono presenti alcuni contatti in comune", suspicious: false },
    ],
    correctDecision: "report",
    debrief: "La familiarità non equivale a identità verificata. Non aprire il file, limitare l’esposizione di informazioni sul reparto e segnalare il profilo attraverso i canali previsti.",
    countermeasures: ["Disciplina OSINT", "Verifica identità", "Policy social", "Segnalazione profili sospetti"],
  },
  {
    id: "web-portale-logistico",
    order: 5,
    channel: "Web",
    technique: "Clonazione interfaccia e typosquatting",
    risk: "Alto",
    title: "Portale logistico quasi identico",
    summary: "Una pagina riproduce il portale di approvvigionamento, usa HTTPS valido e un dominio alterato di un solo carattere.",
    principles: ["Fiducia visiva", "Autorità", "Abitudine"],
    artifact: {
      kind: "web",
      from: "🔒 https://logistica-marinamilitare[.]it.sessione-sicura[.]net",
      time: "Certificato TLS valido",
      body: [
        "PORTALE LOGISTICO — Sessione scaduta",
        "Accedi nuovamente con utenza di reparto e codice temporaneo per visualizzare la richiesta materiali 2471-B.",
      ],
      footer: "Pagina dimostrativa — nessun campo credenziali presente",
    },
    signals: [
      { id: "registrable", label: "Il dominio effettivo è sessione-sicura[.]net", suspicious: true },
      { id: "lock", label: "Il lucchetto indica cifratura, non legittimità del sito", suspicious: true },
      { id: "reauth", label: "La pagina richiede anche il codice temporaneo", suspicious: true },
      { id: "visual", label: "L’aspetto coerente può derivare dalla clonazione grafica", suspicious: true },
      { id: "https", label: "La connessione usa HTTPS", suspicious: false },
      { id: "reference", label: "È presente un numero di richiesta plausibile", suspicious: false },
    ],
    correctDecision: "stop",
    debrief: "HTTPS protegge il trasporto, non certifica l’affidabilità del soggetto. Leggere il dominio da destra verso sinistra, chiudere la pagina e aprire il servizio da un preferito o portale interno noto.",
    countermeasures: ["Controllo URL", "DNS e blocklist", "Password manager vincolato al dominio", "MFA resistente al phishing"],
  },
  {
    id: "physical-varco-banchina",
    order: 6,
    channel: "Fisico",
    technique: "Tailgating e pretexting",
    risk: "Alto",
    title: "Tecnico al varco della banchina",
    summary: "Una persona con abbigliamento tecnico e una cassetta attrezzi chiede di passare insieme perché il badge non funziona.",
    principles: ["Cortesia", "Autorità percepita", "Urgenza"],
    artifact: {
      kind: "physical",
      from: "Varco B · area a controllo accessi",
      time: "07:14 · cambio turno",
      body: [
        "La persona indossa una pettorina del manutentore abituale e conosce il nome del responsabile impianti.",
        "Dice che il lettore non riconosce il badge e che deve ripristinare una pompa prima dell’ispezione. Chiede di tenere aperto il varco.",
      ],
      footer: "Osservazione situazionale simulata",
    },
    signals: [
      { id: "badge", label: "Il badge non abilita l’accesso", suspicious: true },
      { id: "escort", label: "La persona chiede di sfruttare l’apertura altrui", suspicious: true },
      { id: "pressure", label: "L’ispezione imminente crea pressione", suspicious: true },
      { id: "knowledge", label: "Conoscere nomi interni non dimostra autorizzazione", suspicious: true },
      { id: "uniform", label: "Abbigliamento e attrezzi sono coerenti con il ruolo dichiarato", suspicious: false },
    ],
    correctDecision: "verify",
    debrief: "La cortesia non sostituisce il controllo accessi. Impedire il passaggio condiviso e contattare il referente del varco o il responsabile del contratto per verificare identità e ordine di lavoro.",
    countermeasures: ["Controllo accessi individuale", "Verifica ordine di lavoro", "Formazione del personale", "Registro visitatori"],
  },
  {
    id: "baiting-supporto-rimovibile",
    order: 7,
    channel: "Supporto",
    technique: "Baiting",
    risk: "Medio-alto",
    title: "Supporto USB con etichetta operativa",
    summary: "Una chiavetta trovata vicino alla mensa riporta un’etichetta capace di suscitare curiosità e senso di urgenza.",
    principles: ["Curiosità", "Scarsità", "Rilevanza operativa"],
    artifact: {
      kind: "usb",
      from: "Supporto rimovibile non inventariato",
      time: "Rinvenuto alle 12:22",
      body: [
        "Etichetta: PIANO IMMERSIONE — REVISIONE RISERVATA",
        "Il supporto non ha contrassegno inventariale e non è accompagnato da una busta di trasporto.",
      ],
      footer: "Oggetto scenico — nessun file reale",
    },
    signals: [
      { id: "uncontrolled", label: "Il supporto non è inventariato né accompagnato", suspicious: true },
      { id: "lure", label: "L’etichetta sembra progettata per attirare l’attenzione", suspicious: true },
      { id: "location", label: "È stato rinvenuto in un’area di passaggio", suspicious: true },
      { id: "scan", label: "Inserirlo solo per eseguire una scansione esporrebbe comunque il dispositivo", suspicious: true },
      { id: "sealed", label: "La scocca non mostra danni visibili", suspicious: false },
    ],
    correctDecision: "report",
    debrief: "Non collegare mai supporti sconosciuti, neppure per una scansione. Isolare fisicamente l’oggetto e consegnarlo secondo la procedura di gestione dei supporti rinvenuti.",
    countermeasures: ["Blocco supporti rimovibili", "Inventario", "Procedura di consegna", "Security awareness"],
  },
  {
    id: "supporto-crittografico",
    order: 8,
    channel: "Assistenza",
    technique: "Quid pro quo",
    risk: "Alto",
    title: "Assistenza gratuita al dispositivo crittografico",
    summary: "Un fornitore offre una correzione immediata in cambio dell’avvio di una sessione remota non pianificata.",
    principles: ["Reciprocità", "Autorità tecnica", "Urgenza"],
    artifact: {
      kind: "support",
      from: "Service partner · ticket non verificato #88421",
      time: "14:05",
      body: [
        "Abbiamo rilevato una versione vulnerabile sul vostro dispositivo. Possiamo correggerla ora senza aprire un fermo tecnico.",
        "Installate l’agente di teleassistenza allegato e comunicate l’utenza con privilegi; al resto pensiamo noi.",
      ],
      footer: "Conversazione simulata",
    },
    signals: [
      { id: "unsolicited", label: "L’intervento non corrisponde a una richiesta aperta", suspicious: true },
      { id: "agent", label: "Viene proposto un agente remoto non approvato", suspicious: true },
      { id: "privileged", label: "Sono richieste credenziali privilegiate", suspicious: true },
      { id: "bypass", label: "L’offerta promette di evitare il fermo e il processo ordinario", suspicious: true },
      { id: "ticket", label: "Il messaggio riporta un numero di ticket", suspicious: false },
    ],
    correctDecision: "stop",
    debrief: "Un vantaggio immediato non giustifica l’aggiramento delle procedure. Non installare software e non condividere utenze: verificare contratto, ticket e tecnico tramite il referente ufficiale.",
    countermeasures: ["Allowlist software", "Gestione fornitori", "Account nominativi", "Change management"],
  },
];

export const decisions = [
  { id: "verify", label: "Sospendi e verifica su un canale noto" },
  { id: "stop", label: "Interrompi subito l’interazione" },
  { id: "report", label: "Isola l’elemento e segnala" },
  { id: "proceed", label: "Procedi perché il contesto è plausibile" },
];

export const defenseControls = [
  { id: "mail", title: "Autenticazione e filtro e-mail", detail: "SPF, DKIM, DMARC, analisi allegati e anti-spam adattivo.", weight: 16, coverage: ["E-mail", "Web"] },
  { id: "blocklist", title: "DNS, blocklist e RBL", detail: "Blocco tempestivo di domini, IP e mittenti già associati a campagne malevole.", weight: 11, coverage: ["E-mail", "SMS", "Web"] },
  { id: "mfa", title: "MFA resistente al phishing", detail: "Fattori legati all’origine per ridurre l’impatto delle credenziali sottratte.", weight: 17, coverage: ["E-mail", "Voce", "Web"] },
  { id: "awareness", title: "Formazione continua", detail: "Esercitazioni realistiche, feedback immediato e aggiornamenti periodici.", weight: 15, coverage: ["Tutti i vettori"] },
  { id: "verification", title: "Verifica fuori banda", detail: "Conferma di ordini, identità e richieste tramite recapiti e procedure già noti.", weight: 14, coverage: ["E-mail", "SMS", "Voce", "Social", "Fisico"] },
  { id: "reporting", title: "Segnalazione e triage", detail: "Canale unico, rapido e non punitivo verso il nucleo cyber o il responsabile di sicurezza.", weight: 10, coverage: ["Tutti i vettori"] },
  { id: "access", title: "Controllo accessi e supporti", detail: "Accesso individuale, inventario dei supporti e policy sugli strumenti rimovibili.", weight: 9, coverage: ["Fisico", "Supporto"] },
];

export const defaultDefenseIds = ["mail", "blocklist", "mfa", "awareness", "verification", "reporting"];

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function evaluateAttempt(scenario, selectedSignalIds, decisionId) {
  const selected = new Set(selectedSignalIds);
  const suspicious = scenario.signals.filter((signal) => signal.suspicious);
  const truePositives = suspicious.filter((signal) => selected.has(signal.id)).length;
  const falsePositives = scenario.signals.filter((signal) => !signal.suspicious && selected.has(signal.id)).length;
  const signalScore = clamp(Math.round((truePositives / suspicious.length) * 70 - falsePositives * 8), 0, 70);
  const decisionScore = decisionId === scenario.correctDecision ? 30 : 0;
  const score = signalScore + decisionScore;
  return {
    scenarioId: scenario.id,
    channel: scenario.channel,
    selectedSignalIds: [...selected],
    decisionId,
    truePositives,
    falsePositives,
    signalScore,
    decisionScore,
    score,
    passed: score >= 70,
  };
}

export function summarizeAttempts(attempts) {
  const latestByScenario = new Map();
  for (const attempt of attempts) latestByScenario.set(attempt.scenarioId, attempt);
  const latest = [...latestByScenario.values()];
  const average = latest.length ? Math.round(latest.reduce((sum, item) => sum + item.score, 0) / latest.length) : 0;
  const passed = latest.filter((item) => item.passed).length;
  return {
    completed: latest.length,
    total: scenarios.length,
    average,
    passed,
    readiness: Math.round((latest.length / scenarios.length) * 45 + (average / 100) * 55),
    latest,
  };
}

export function calculateResidualRisk(activeIds) {
  const active = new Set(activeIds);
  let reduction = defenseControls.filter((control) => active.has(control.id)).reduce((sum, control) => sum + control.weight, 0);
  if (active.has("mfa") && active.has("awareness")) reduction += 4;
  if (active.has("verification") && active.has("reporting")) reduction += 3;
  return clamp(92 - reduction, 8, 92);
}

export function buildReport(attempts, activeDefenseIds) {
  const summary = summarizeAttempts(attempts);
  return {
    application: "NAVIS Cyber Readiness",
    generatedAt: new Date().toISOString(),
    dataPolicy: "Elaborazione locale; nessuna trasmissione prevista dall’applicazione.",
    summary,
    residualRisk: calculateResidualRisk(activeDefenseIds),
    activeDefenses: defenseControls.filter((control) => activeDefenseIds.includes(control.id)).map((control) => control.title),
    attempts,
  };
}
