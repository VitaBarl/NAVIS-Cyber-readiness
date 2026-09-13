# NAVIS Cyber Readiness

## Report dettagliato degli scenari formativi

**Versione:** 1.0  
**Data:** 13 settembre 2026  
**Classificazione del documento:** materiale didattico dimostrativo  
**Ambito:** sensibilizzazione e addestramento difensivo in un contesto marittimo militare simulato

> Questo documento descrive scenari interamente simulati. Nomi, indirizzi, domini, numeri, reparti e situazioni sono fittizi o neutralizzati. Il report non sostituisce ordini, procedure operative, direttive di sicurezza o disposizioni dell'organizzazione di appartenenza.

## 1. Scopo e destinatari

NAVIS Cyber Readiness è un sistema locale di formazione sulla componente umana della sicurezza informatica. Gli scenari traducono i principali vettori di social engineering in situazioni plausibili per personale impiegato in servizi di guardia, supporto tecnico, logistica, controllo accessi e attività amministrative.

Il report ha quattro obiettivi:

1. documentare in modo verificabile gli otto scenari implementati;
2. fornire al formatore obiettivi, segnali attesi e punti di debriefing;
3. descrivere criteri di valutazione e contromisure senza trasformare l'esercitazione in una guida offensiva;
4. mantenere la tracciabilità fra tesi, applicazione e risultati dell'addestramento.

I destinatari sono formatori, responsabili della sicurezza, referenti cyber, responsabili di reparto e personale autorizzato a partecipare ad attività di awareness.

## 2. Principi di impiego responsabile

- Eseguire gli scenari in un ambiente autorizzato, con finalità formative e senza inviare messaggi o file a soggetti reali.
- Usare esclusivamente dati fittizi o neutralizzati. Nell'applicazione i domini sono resi non navigabili mediante la forma `[.]` oppure `hxxps`.
- Non simulare campagne reali, non raccogliere credenziali e non registrare informazioni operative classificate.
- Adeguare la risposta attesa alle procedure ufficiali dell'ente. Le formule “verifica fuori banda”, “interrompi” e “segnala” sono principi generali, non recapiti o ordini operativi.
- Conservare i risultati solo per il tempo necessario alla formazione e applicare criteri di minimizzazione dei dati.

## 3. Modello didattico

Ogni esercitazione segue lo stesso ciclo:

1. **Esposizione controllata:** l'utente osserva un artefatto simulato, per esempio un'e-mail, un SMS, una telefonata o una situazione al varco.
2. **Analisi:** seleziona gli elementi che considera sospetti, distinguendoli dai dettagli semplicemente plausibili.
3. **Decisione:** sceglie una delle quattro azioni disponibili: sospendere e verificare; interrompere; isolare e segnalare; procedere.
4. **Valutazione:** il sistema calcola il punteggio sugli indicatori riconosciuti e sulla decisione finale.
5. **Debriefing:** vengono presentati tecnica, leve psicologiche, risposta attesa e difese organizzative o tecniche.
6. **Tracciamento locale:** l'ultimo tentativo di ciascuno scenario contribuisce all'indice di preparazione.

Le competenze osservate sono: riconoscimento delle leve di persuasione, controllo di identità e canale, capacità di interrompere una sequenza rischiosa, uso della verifica fuori banda, segnalazione tempestiva e comprensione delle difese a strati.

## 4. Quadro riepilogativo

| N. | Scenario | Vettore | Tecnica | Rischio | Risposta attesa |
|---:|---|---|---|---|---|
| 1 | Variazione urgente del piano di ormeggio | E-mail | Spear phishing e pretexting | Alto | Sospendi e verifica su un canale noto |
| 2 | Blocco temporaneo del pass per l'arsenale | SMS | Smishing | Medio-alto | Sospendi e verifica su un canale noto |
| 3 | Supporto SATCOM durante una finestra critica | Voce | Vishing e spoofing | Alto | Interrompi subito l'interazione |
| 4 | Contatto di un collega in missione | Social | Profilo falso e OSINT | Medio-alto | Isola l'elemento e segnala |
| 5 | Portale logistico quasi identico | Web | Clonazione e typosquatting | Alto | Interrompi subito l'interazione |
| 6 | Tecnico al varco della banchina | Fisico | Tailgating e pretexting | Alto | Sospendi e verifica su un canale noto |
| 7 | Supporto USB con etichetta operativa | Supporto | Baiting | Medio-alto | Isola l'elemento e segnala |
| 8 | Assistenza gratuita al dispositivo crittografico | Assistenza | Quid pro quo | Alto | Interrompi subito l'interazione |

## 5. Schede degli scenari

### Scenario 1 — Variazione urgente del piano di ormeggio

**Identificativo:** `email-ordine-operativo`  
**Canale e tecnica:** e-mail; spear phishing e pretexting  
**Livello di rischio simulato:** alto  
**Principi di persuasione:** autorità, urgenza, coerenza del contesto

#### Contesto e obiettivo formativo

Durante un servizio di guardia arriva una comunicazione attribuita alla Sala Operativa. Il messaggio annuncia una variazione del piano di ormeggio, impone una conferma entro dieci minuti e invita ad aprire un archivio compresso e autenticarsi da un collegamento ricevuto. Lo scenario verifica se l'utente sa resistere alla pressione temporale e validare un ordine operativo usando un canale già noto.

#### Artefatto simulato

- Mittente visualizzato: `Sala Operativa <pianificazione@marina-operativa[.]org>`.
- Oggetto: “IMMEDIATO — variazione piano ormeggio 18:40”.
- Allegato indicato: `Piano_Ormeggio_R7.zip`.
- Collegamento neutralizzato: `https://sso.marina-operativa[.]org/conferma`.
- Leva principale: la mancata conferma sarebbe registrata come indisponibilità del reparto.

#### Indicatori da riconoscere

- Il dominio imita un indirizzo istituzionale ma non coincide con quello ufficiale.
- La scadenza di dieci minuti limita deliberatamente il tempo di verifica.
- L'allegato compresso è inatteso.
- È richiesta una nuova autenticazione da un link contenuto nel messaggio.

La firma con grado e cognome e la pertinenza dell'argomento rendono il messaggio più credibile, ma non provano autenticità.

#### Risposta attesa

Non aprire l'allegato e non usare il collegamento. Sospendere l'azione, preservare il messaggio e verificare l'ordine tramite un recapito o un sistema operativo già conosciuto. In caso di anomalia, applicare la procedura di segnalazione prevista.

#### Debriefing e difese

Il formatore evidenzia che un attacco mirato usa dettagli plausibili proprio per abbassare la soglia di attenzione. Le difese correlate sono autenticazione e filtraggio e-mail, analisi degli allegati, verifica fuori banda, segnalazione al referente cyber e MFA resistente al phishing.

**Evidenza attesa nell'app:** selezione dei quattro indicatori sospetti, decisione “Sospendi e verifica su un canale noto”, lettura del debriefing.

### Scenario 2 — Blocco temporaneo del pass per l'arsenale

**Identificativo:** `sms-varco-arsenale`  
**Canale e tecnica:** SMS; smishing  
**Livello di rischio simulato:** medio-alto  
**Principi di persuasione:** urgenza, autorità, scarsità del tempo

#### Contesto e obiettivo formativo

Poco prima dell'inizio del turno, un SMS apparentemente inviato dal servizio varchi segnala la sospensione del pass e propone un link per riattivarlo. Lo scenario misura la capacità di non confondere il nome visualizzato del mittente con una prova di autenticità e di scegliere una verifica alternativa.

#### Artefatto simulato

- Mittente visualizzato: `SERVIZIO VARCHI`.
- Testo sintetico con pratica `48A7`.
- Collegamento neutralizzato: `hxxps://m-arsenale[.]support/accesso`.
- Leva principale: riattivare il pass prima del turno.

#### Indicatori da riconoscere

- Il dominio non appartiene ai servizi ufficiali.
- L'imminenza del turno crea pressione sulla decisione.
- Il messaggio non offre contatti o una procedura nota per verificare la richiesta.

Il nome descrittivo del mittente e il codice pratica aumentano la plausibilità, ma possono essere replicati.

#### Risposta attesa

Non aprire il collegamento. Verificare lo stato del pass contattando il presidio o usando il recapito già registrato, quindi inoltrare le evidenze secondo la procedura di reporting dell'ente.

#### Debriefing e difese

Il punto centrale è la manipolabilità del sender ID e la minore leggibilità dei domini su dispositivi mobili. Le difese includono formazione mobile, un canale ufficiale per le comunicazioni sui varchi, filtraggio URL sui dispositivi gestiti e segnalazione rapida.

**Evidenza attesa nell'app:** selezione dei tre indicatori sospetti e decisione “Sospendi e verifica su un canale noto”.

### Scenario 3 — Supporto SATCOM durante una finestra critica

**Identificativo:** `voice-supporto-satcom`  
**Canale e tecnica:** voce; vishing e spoofing  
**Livello di rischio simulato:** alto  
**Principi di persuasione:** autorità tecnica, urgenza, quid pro quo

#### Contesto e obiettivo formativo

Un sedicente tecnico chiama durante una finestra considerata critica e prospetta un'interruzione prolungata del servizio. Per “chiudere l'anomalia” chiede il codice MFA appena ricevuto sul telefono di servizio. L'obiettivo è rendere automatica la regola secondo cui un codice di autenticazione non viene mai comunicato a terzi.

#### Artefatto simulato

- Numero visualizzato con descrizione “Supporto reti”.
- Lessico tecnico relativo alla sincronizzazione dell'utenza SATCOM.
- Richiesta immediata di un codice a sei cifre.
- Leva principale: evitare ore di indisponibilità.

#### Indicatori da riconoscere

- Richiesta verbale di un codice MFA.
- Conseguenza grave prospettata per accelerare la decisione.
- Contatto di assistenza non originato da un ticket aperto dal reparto.
- Il numero visualizzato non costituisce prova dell'identità del chiamante.

La terminologia tecnica è un elemento di credibilità, non una garanzia.

#### Risposta attesa

Non comunicare il codice. Terminare la chiamata, annotare ora, numero e contenuto essenziale, quindi ricontattare l'assistenza attraverso il numero ufficiale presente in rubrica o nel sistema di ticketing.

#### Debriefing e difese

Lo scenario mostra come urgenza e competenza apparente possano trasformare un meccanismo di sicurezza in uno strumento di pressione. Difese: MFA resistente al phishing, procedure help desk che vietano la richiesta di OTP, verifica fuori banda e formazione sullo spoofing.

**Evidenza attesa nell'app:** selezione dei quattro indicatori sospetti e decisione “Interrompi subito l'interazione”.

### Scenario 4 — Contatto di un collega in missione

**Identificativo:** `social-collega-missione`  
**Canale e tecnica:** social; profilo falso e raccolta di informazioni pubbliche  
**Livello di rischio simulato:** medio-alto  
**Principi di persuasione:** familiarità, riprova sociale, reciprocità

#### Contesto e obiettivo formativo

Un profilo recente afferma di appartenere a un collega incontrato durante un'esercitazione e cita dettagli pubblici sul reparto. Propone poi un documento esterno riguardante una presunta matrice frequenze. Lo scenario sviluppa consapevolezza sui dati ricavabili da fonti aperte e sulla necessità di separare familiarità e identità verificata.

#### Artefatto simulato

- Profilo dichiarato: “Marco Rinaldi · Ufficiale di collegamento”.
- Riferimento a un'esercitazione e a fotografie del reparto.
- Link neutralizzato a `files-operativi[.]cloud/matrice`.
- Profilo creato da dodici giorni con trentasette contatti.

#### Indicatori da riconoscere

- Profilo recente e rete sociale ridotta.
- Dettagli sul reparto potenzialmente ricavati da contenuti pubblici.
- Documento operativo ospitato su un servizio esterno.
- Identità non verificata mediante un canale istituzionale.

La presenza di contatti in comune è riprova sociale, non autenticazione.

#### Risposta attesa

Non aprire il file, non condividere ulteriori informazioni e conservare gli elementi necessari alla segnalazione. Verificare eventualmente l'identità tramite un canale istituzionale separato e segnalare il profilo secondo le regole interne.

#### Debriefing e difese

Il formatore collega lo scenario alla disciplina OSINT: piccoli frammenti pubblici possono essere combinati per costruire un pretesto credibile. Difese: criteri di pubblicazione sui social, verifica dell'identità, separazione fra canali personali e istituzionali e procedura per profili sospetti.

**Evidenza attesa nell'app:** selezione dei quattro indicatori sospetti e decisione “Isola l'elemento e segnala”.

### Scenario 5 — Portale logistico quasi identico

**Identificativo:** `web-portale-logistico`  
**Canale e tecnica:** web; clonazione dell'interfaccia e typosquatting  
**Livello di rischio simulato:** alto  
**Principi di persuasione:** fiducia visiva, autorità, abitudine

#### Contesto e obiettivo formativo

Una pagina simula il portale logistico, mostra una connessione HTTPS valida e chiede nuovamente utenza di reparto e codice temporaneo. L'obiettivo è insegnare a leggere il dominio effettivo e a comprendere che il lucchetto prova la cifratura del collegamento, non l'affidabilità del soggetto.

#### Artefatto simulato

- URL neutralizzato: `https://logistica-marinamilitare[.]it.sessione-sicura[.]net`.
- Avviso di sessione scaduta.
- Riferimento plausibile alla richiesta materiali `2471-B`.
- Richiesta di credenziali e codice temporaneo.

#### Indicatori da riconoscere

- Il dominio registrabile reale è `sessione-sicura[.]net`.
- HTTPS e lucchetto non attestano la legittimità del servizio.
- La pagina richiede anche il codice temporaneo.
- La coerenza grafica può derivare dalla clonazione dell'interfaccia.

Il numero di richiesta plausibile e il certificato TLS valido sono elementi compatibili anche con una pagina ingannevole.

#### Risposta attesa

Non inserire dati. Chiudere la pagina e riaprire il servizio mediante un preferito amministrato, un portale interno o un indirizzo noto. Se previsto, segnalare URL e contesto senza visitare nuovamente la pagina.

#### Debriefing e difese

Il dominio va letto dal suffisso verso sinistra per individuare la parte realmente registrata. Le difese includono controllo URL, DNS e blocklist, password manager vincolato al dominio e fattori di autenticazione resistenti al phishing.

**Evidenza attesa nell'app:** selezione dei quattro indicatori sospetti e decisione “Interrompi subito l'interazione”.

### Scenario 6 — Tecnico al varco della banchina

**Identificativo:** `physical-varco-banchina`  
**Canale e tecnica:** accesso fisico; tailgating e pretexting  
**Livello di rischio simulato:** alto  
**Principi di persuasione:** cortesia, autorità percepita, urgenza

#### Contesto e obiettivo formativo

Al cambio turno, una persona in abbigliamento tecnico sostiene che il proprio badge non funzioni e chiede di attraversare il varco insieme a un autorizzato. Conosce il nome del responsabile impianti e dichiara di dover ripristinare una pompa prima di un'ispezione. Lo scenario verifica l'applicazione coerente del controllo accessi anche quando rifiutare appare scomodo.

#### Artefatto simulato

- Varco B, area a controllo accessi.
- Pettorina e cassetta attrezzi coerenti con il ruolo dichiarato.
- Badge non riconosciuto.
- Pressione legata a un intervento urgente e a un'ispezione imminente.

#### Indicatori da riconoscere

- Il badge non abilita l'accesso.
- Viene richiesto di sfruttare l'apertura autorizzata di un'altra persona.
- L'urgenza dell'ispezione condiziona il giudizio.
- Conoscere nomi interni non dimostra autorizzazione.

Uniforme e attrezzi possono essere autentici o imitati: non sostituiscono la verifica.

#### Risposta attesa

Non consentire il passaggio condiviso. Mantenere un comportamento professionale, contattare il presidio o il responsabile del contratto e verificare identità, autorizzazione e ordine di lavoro. Gestire l'attesa senza abbandonare il controllo del varco.

#### Debriefing e difese

Il principio chiave è che la cortesia deve operare entro la procedura, non al suo posto. Difese: accesso individuale, verifica dell'ordine di lavoro, registro visitatori, formazione del personale e gestione formale dei fornitori.

**Evidenza attesa nell'app:** selezione dei quattro indicatori sospetti e decisione “Sospendi e verifica su un canale noto”.

### Scenario 7 — Supporto USB con etichetta operativa

**Identificativo:** `baiting-supporto-rimovibile`  
**Canale e tecnica:** supporto rimovibile; baiting  
**Livello di rischio simulato:** medio-alto  
**Principi di persuasione:** curiosità, scarsità, rilevanza operativa

#### Contesto e obiettivo formativo

Una chiavetta USB viene rinvenuta in un'area di passaggio. L'etichetta richiama un documento operativo riservato e induce la tentazione di inserirla in un computer per identificarne il proprietario o eseguire una scansione. Lo scenario mira a rendere immediata la separazione fisica dell'oggetto dai sistemi.

#### Artefatto simulato

- Supporto non inventariato e privo di busta di trasporto.
- Etichetta: “PIANO IMMERSIONE — REVISIONE RISERVATA”.
- Rinvenimento vicino a una zona frequentata.
- Nessun file reale è presente nell'esercitazione.

#### Indicatori da riconoscere

- Supporto non registrato né accompagnato.
- Etichetta costruita per suscitare curiosità e senso di rilevanza.
- Collocazione in un'area di passaggio.
- Anche l'inserimento finalizzato alla sola scansione espone il dispositivo.

L'assenza di danni visibili alla scocca non fornisce alcuna garanzia sul contenuto o sull'elettronica.

#### Risposta attesa

Non collegare il supporto a computer, dispositivi di test o sistemi isolati improvvisati. Evitare manipolazioni non necessarie, isolare fisicamente l'oggetto e consegnarlo attraverso il percorso autorizzato per i supporti rinvenuti.

#### Debriefing e difese

Il formatore distingue la curiosità legittima dalla procedura sicura. Difese: blocco tecnico dei supporti rimovibili, inventario, contenitori e catena di consegna, punti di raccolta definiti e awareness periodica.

**Evidenza attesa nell'app:** selezione dei quattro indicatori sospetti e decisione “Isola l'elemento e segnala”.

### Scenario 8 — Assistenza gratuita al dispositivo crittografico

**Identificativo:** `supporto-crittografico`  
**Canale e tecnica:** assistenza; quid pro quo  
**Livello di rischio simulato:** alto  
**Principi di persuasione:** reciprocità, autorità tecnica, urgenza

#### Contesto e obiettivo formativo

Un presunto fornitore propone una correzione immediata per un dispositivo crittografico, promettendo di evitare un fermo tecnico. Chiede di installare un agente di teleassistenza non pianificato e di comunicare un'utenza con privilegi. Lo scenario valuta la capacità di proteggere il processo di change management anche sotto pressione.

#### Artefatto simulato

- Mittente dichiarato: “Service partner”.
- Ticket non verificato `#88421`.
- Offerta di correzione immediata.
- Richiesta di agente remoto e utenza privilegiata.

#### Indicatori da riconoscere

- L'intervento non corrisponde a una richiesta aperta dal reparto.
- È proposto software remoto non approvato.
- Sono richieste credenziali o utenze con privilegi.
- L'offerta promette di aggirare il fermo e il normale processo di modifica.

Un numero di ticket può essere inventato e deve essere controllato nel sistema ufficiale.

#### Risposta attesa

Non installare software e non comunicare credenziali. Interrompere l'interazione e verificare contratto, ticket, identità del tecnico, finestra di manutenzione e autorizzazione mediante i referenti ufficiali.

#### Debriefing e difese

Il vantaggio immediato offerto è il “quid” con cui si tenta di ottenere un accesso sproporzionato. Difese: allowlist del software, gestione dei fornitori, account nominativi e con privilegio minimo, change management e verifica formale degli interventi.

**Evidenza attesa nell'app:** selezione dei quattro indicatori sospetti e decisione “Interrompi subito l'interazione”.

## 6. Criteri di valutazione

Il punteggio massimo per ogni scenario è 100:

- **Riconoscimento degli indicatori:** fino a 70 punti, proporzionali agli indicatori sospetti correttamente selezionati.
- **Decisione operativa:** 30 punti se la decisione coincide con quella attesa.
- **Falsi positivi:** ogni dettaglio plausibile ma non sospetto selezionato sottrae 8 punti dalla componente indicatori.
- **Esito:** la soglia di superamento è 70 punti.

Formula della componente indicatori:

```text
arrotonda((indicatori corretti / indicatori sospetti totali) × 70 − falsi positivi × 8)
```

Il valore viene limitato all'intervallo 0–70. Il punteggio finale è la somma fra componente indicatori e componente decisione.

Esempi interpretativi:

- tutti gli indicatori sospetti, nessun falso positivo e decisione corretta: 100;
- tutti gli indicatori sospetti, un falso positivo e decisione corretta: 92;
- tutti gli indicatori sospetti ma decisione errata: 70;
- metà degli indicatori e decisione corretta: circa 65, quindi l'esercitazione non è superata.

Questa logica premia sia l'analisi sia l'azione. Il formatore deve comunque usare il punteggio come supporto al debriefing, non come unica misura di competenza.

## 7. Indice di preparazione

Per ciascuno scenario conta solo il tentativo più recente. L'applicazione calcola:

- scenari completati su otto;
- media dei punteggi più recenti;
- numero di scenari superati;
- indice di preparazione.

L'indice attribuisce il 45% alla copertura degli scenari e il 55% alla media ottenuta:

```text
preparazione = arrotonda((scenari completati / 8) × 45 + (media / 100) × 55)
```

La copertura è quindi indispensabile: un ottimo risultato su pochi casi non equivale al completamento dell'intero percorso.

## 8. Modello delle difese a strati

Il laboratorio difese parte da un rischio simulato pari a 92 e sottrae il peso dei controlli attivati. Il risultato è limitato fra 8 e 92. Il valore ha finalità esclusivamente didattica e non rappresenta una valutazione reale del rischio di un'organizzazione.

| Controllo | Peso | Vettori coperti | Funzione |
|---|---:|---|---|
| Autenticazione e filtro e-mail | 16 | E-mail, Web | SPF, DKIM, DMARC, analisi allegati e anti-spam adattivo |
| DNS, blocklist e RBL | 11 | E-mail, SMS, Web | Blocco di domini, IP e mittenti associati a campagne malevole |
| MFA resistente al phishing | 17 | E-mail, Voce, Web | Riduzione dell'impatto della sottrazione di credenziali |
| Formazione continua | 15 | Tutti | Esercitazioni realistiche, feedback e aggiornamento periodico |
| Verifica fuori banda | 14 | E-mail, SMS, Voce, Social, Fisico | Conferma tramite recapiti e procedure già noti |
| Segnalazione e triage | 10 | Tutti | Canale rapido e non punitivo verso il referente di sicurezza |
| Controllo accessi e supporti | 9 | Fisico, Supporto | Accesso individuale, inventario e regole sui supporti rimovibili |

Sono previste due sinergie: MFA più formazione riducono ulteriormente il rischio simulato di 4 punti; verifica fuori banda più reporting lo riducono di altri 3 punti. La configurazione iniziale attiva tutti i controlli tranne “Controllo accessi e supporti”.

## 9. Procedura trasversale di risposta

La risposta può essere ricordata con cinque verbi:

1. **Sospendi:** interrompere l'automatismo e non eseguire l'azione richiesta.
2. **Isola:** evitare interazioni ulteriori con link, allegati, dispositivi, account o persone non verificati.
3. **Verifica:** usare esclusivamente recapiti, portali, registri e referenti già conosciuti.
4. **Segnala:** trasmettere gli elementi utili al canale previsto, senza ampliare inutilmente la diffusione.
5. **Riprendi:** procedere solo dopo una conferma valida o secondo le indicazioni del responsabile competente.

Le evidenze minime utili possono comprendere data e ora, canale, mittente visualizzato, testo o screenshot, URL neutralizzato, decisioni già prese e sistemi eventualmente coinvolti. Non inserire nel report dell'app credenziali, codici MFA, dati classificati o informazioni operative non necessarie.

## 10. Dati, privacy ed esportazione

NAVIS funziona nel browser e non prevede trasmissione dei risultati. I progressi sono memorizzati localmente nel browser. L'utente può esportare un report JSON contenente:

- nome dell'applicazione e data di generazione;
- informativa sull'elaborazione locale;
- riepilogo del percorso;
- rischio residuo simulato;
- difese attive;
- tentativi effettuati, segnali selezionati, decisione e punteggio.

Per l'uso organizzativo si raccomanda di definire prima della sessione: finalità, responsabile del trattamento, durata di conservazione, regole di pseudonimizzazione e destinatari dei risultati. L'applicazione non richiede nomi, matricole o altri identificativi personali.

## 11. Conduzione consigliata della sessione

### Prima dell'esercitazione

- Definire obiettivi, pubblico e durata.
- Dichiarare che tutti gli artefatti sono simulati e neutralizzati.
- Chiarire il canale reale da usare in caso di segnalazioni o dubbi emersi durante la sessione.
- Verificare che il browser sia supportato e che l'ambiente locale non contenga dati operativi.

### Durante l'esercitazione

- Lasciare all'utente il tempo di osservare senza anticipare la risposta.
- Chiedere di motivare gli indicatori scelti.
- Annotare soprattutto gli errori di ragionamento: fiducia nel lucchetto, nel nome del mittente, nell'uniforme o nel linguaggio tecnico.
- Interrompere immediatamente qualsiasi tentativo di applicare la simulazione a sistemi o persone reali.

### Dopo l'esercitazione

- Rivedere gli scenari non superati e gli indicatori mancati.
- Confrontare le risposte generali con le procedure ufficiali dell'ente.
- Esportare il JSON solo se serve e conservarlo secondo le regole stabilite.
- Trasformare le lacune ricorrenti in azioni formative, non in attribuzioni punitive individuali.

## 12. Criteri di accettazione e verifica

Il sistema è considerato correttamente documentato quando:

- tutti gli otto scenari sono disponibili e coerenti con le schede di questo report;
- ogni scenario presenta artefatto, segnali, decisione, punteggio e debriefing;
- i collegamenti e i domini dimostrativi non sono attivi;
- il calcolo del punteggio rispetta le formule documentate;
- il laboratorio difese produce valori compresi fra 8 e 92;
- il report JSON viene generato localmente senza richieste di rete;
- il progetto può essere avviato e testato seguendo il README.

I test automatici verificano numero e unicità degli scenari, punteggi perfetti, penalità per falsi positivi, deduplicazione dei tentativi, sinergie tra difese e struttura del report esportato.

## 13. Limiti del modello

- Gli scenari sono didattici e non coprono ogni minaccia, ruolo o procedura possibile.
- Il rischio residuo è un indicatore dimostrativo, non una misura quantitativa certificata.
- Il punteggio valuta scelte all'interno dell'interfaccia, non tempi di reazione, comunicazione di squadra o comportamento in un incidente reale.
- La risposta attesa deve essere adattata alle direttive effettive dell'organizzazione.
- Il sistema non effettua integrazioni con directory, SIEM, posta elettronica, ticketing o infrastrutture operative.
- L'applicazione non deve essere collegata a reti o dati classificati senza una valutazione e un'autorizzazione specifiche.

## 14. Tracciabilità rispetto alla tesi

| Tema di origine | Traduzione nel sistema |
|---|---|
| Principi di persuasione: autorità, urgenza, familiarità, reciprocità | Etichette didattiche, costruzione del contesto e domande di debriefing |
| Pretexting, phishing, baiting, tailgating, quid pro quo | Otto scenari interattivi con vettori digitali e fisici |
| E-mail, SMS, voce e social media | Scenari 1–4 e controlli di verifica specifici per canale |
| Clonazione delle interfacce e manipolazione degli URL | Scenario 5 e addestramento alla lettura del dominio registrabile |
| Raccolta di informazioni pubbliche | Scenario 4 e indicazioni di disciplina OSINT |
| Furto di credenziali e abuso dell'autenticazione | Scenari 1, 3, 5 e 8; enfasi su MFA resistente al phishing |
| Anti-spam, autenticazione e-mail, DNS e blocklist | Laboratorio difese e contromisure degli scenari digitali |
| Awareness, simulazioni periodiche e formazione | Ciclo esposizione–decisione–feedback, punteggio e indice di preparazione |

La tesi è stata usata come fonte tematica e concettuale. Gli scenari, i nomi e le situazioni operative sono elaborazioni originali e fittizie realizzate esclusivamente per il prototipo.

## 15. Glossario essenziale

- **Baiting:** uso di un'esca, spesso un contenuto o un oggetto attraente, per indurre un'azione rischiosa.
- **MFA:** autenticazione a più fattori. Un codice temporaneo non deve essere comunicato a terzi.
- **OSINT:** raccolta e analisi di informazioni disponibili da fonti aperte.
- **Pretexting:** costruzione di un'identità o di una situazione plausibile per ottenere fiducia o informazioni.
- **Quid pro quo:** promessa di un beneficio o di un servizio in cambio di accesso, informazioni o azioni.
- **Smishing:** phishing veicolato tramite SMS o messaggistica mobile.
- **Spear phishing:** messaggio mirato costruito usando informazioni sul destinatario o sul suo contesto.
- **Spoofing:** falsificazione o manipolazione di un identificativo visualizzato, come numero o mittente.
- **Tailgating:** ingresso in un'area controllata sfruttando l'accesso autorizzato di un'altra persona.
- **Typosquatting:** registrazione o uso di domini graficamente simili a quelli legittimi.
- **Verifica fuori banda:** conferma effettuata con un canale indipendente e già noto.
- **Vishing:** social engineering condotto mediante chiamate vocali.

## 16. Riferimenti interni al progetto

- `README.md`: avvio locale, test e pubblicazione su GitHub Pages.
- `docs/TRACEABILITY.md`: sintesi della tracciabilità fra fonte e funzionalità.
- `dist/domain.mjs`: definizione degli scenari, punteggi e controlli difensivi.
- `test/domain.test.mjs`: test automatici del modello.

