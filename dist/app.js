import {
  buildReport,
  calculateResidualRisk,
  decisions,
  defaultDefenseIds,
  defenseControls,
  evaluateAttempt,
  scenarios,
  summarizeAttempts,
} from "./domain.mjs";

const ATTEMPTS_KEY = "navis.training.attempts.v2";
const DEFENSES_KEY = "navis.training.defenses.v2";
const root = document.querySelector("#view-root");
const title = document.querySelector("#view-title");
const kicker = document.querySelector("#view-kicker");
const toast = document.querySelector("#toast");
const confirmDialog = document.querySelector("#confirm-dialog");

const viewMeta = {
  dashboard: ["Quadro operativo", "Centro addestramento cyber"],
  scenarios: ["Scenari", "Simulazioni guidate"],
  defenses: ["Difese", "Postura di contrasto"],
  reports: ["Rapporti", "Risultati della sessione"],
};

const state = {
  view: "dashboard",
  selectedScenarioId: scenarios[0].id,
  phase: "intro",
  selectedSignals: new Set(),
  decisionId: "",
  lastResult: null,
  attempts: loadJson(ATTEMPTS_KEY, []),
  defenseIds: loadJson(DEFENSES_KEY, defaultDefenseIds),
};

function loadJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function persist() {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(state.attempts));
  localStorage.setItem(DEFENSES_KEY, JSON.stringify(state.defenseIds));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setView(view, focus = true) {
  if (!viewMeta[view]) return;
  state.view = view;
  render();
  if (focus) root.focus({ preventScroll: true });
}

function getLatestByScenario() {
  const map = new Map();
  for (const attempt of state.attempts) map.set(attempt.scenarioId, attempt);
  return map;
}

function render() {
  const [viewTitle, viewKicker] = viewMeta[state.view];
  title.textContent = viewTitle;
  kicker.textContent = viewKicker;
  document.querySelectorAll(".nav-item").forEach((item) => {
    const active = item.dataset.view === state.view;
    item.classList.toggle("active", active);
    item.setAttribute("aria-current", active ? "page" : "false");
  });

  if (state.view === "dashboard") root.innerHTML = renderDashboard();
  if (state.view === "scenarios") root.innerHTML = renderScenarios();
  if (state.view === "defenses") root.innerHTML = renderDefenses();
  if (state.view === "reports") root.innerHTML = renderReports();
}

function renderDashboard() {
  const summary = summarizeAttempts(state.attempts);
  const latest = getLatestByScenario();
  const nextScenario = scenarios.find((scenario) => !latest.has(scenario.id)) || scenarios[0];
  const risk = calculateResidualRisk(state.defenseIds);
  const bars = scenarios.map((scenario) => latest.get(scenario.id)?.score || 4);
  const passedRate = summary.completed ? Math.round((summary.passed / summary.completed) * 100) : 0;
  const activeControls = defenseControls.filter((control) => state.defenseIds.includes(control.id)).length;
  const channelData = [
    ["E-mail", 88, "spear phishing"],
    ["Mobile", 74, "smishing e vishing"],
    ["Social", 68, "OSINT e profili falsi"],
    ["Fisico", 79, "tailgating e baiting"],
  ];

  return `
    <section class="overview" aria-labelledby="overview-title">
      <div>
        <p class="section-index">01 / PRONTEZZA</p>
        <h2 id="overview-title">Riconoscere l’inganno prima che diventi incidente.</h2>
        <p>Un ambiente locale per allenare decisioni prudenti su comunicazioni, accessi e richieste che sfruttano autorità, urgenza, fiducia e familiarità.</p>
      </div>
      <div class="readiness-ring" style="--value:${summary.readiness * 3.6}deg" aria-label="Prontezza ${summary.readiness} percento"><span><strong>${summary.readiness}%</strong><small>prontezza</small></span></div>
    </section>
    <section class="metric-strip" aria-label="Indicatori della sessione">
      <div class="metric"><span>${summary.completed}/${summary.total}</span><small>scenari completati</small></div>
      <div class="metric"><span>${summary.completed ? `${summary.average}%` : "—"}</span><small>accuratezza media</small></div>
      <div class="metric"><span>${passedRate}%</span><small>esiti positivi</small></div>
      <div class="metric"><span>${risk}</span><small>rischio residuo / 100</small></div>
    </section>
    <section class="dashboard-grid">
      <article class="scenario-panel">
        <div class="panel-head"><span>Prossimo scenario</span><span class="risk-label">RISCHIO ${escapeHtml(nextScenario.risk.toUpperCase())}</span></div>
        <div class="scenario-meta"><span>${escapeHtml(nextScenario.channel)}</span>${nextScenario.principles.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <h3>${escapeHtml(nextScenario.title)}</h3>
        <p>${escapeHtml(nextScenario.summary)}</p>
        <div class="signal-row"><span class="signal-icon">!</span><div><strong>Obiettivo</strong><small>Individua gli indicatori, scegli la risposta operativa e consulta il debrief.</small></div></div>
        <button class="primary-action" data-action="start-scenario" data-id="${nextScenario.id}" type="button">Avvia scenario <span aria-hidden="true">→</span></button>
      </article>
      <aside class="status-panel" aria-label="Stato sessione">
        <div class="panel-head"><span>Progressione</span><span>LOCALE</span></div>
        <dl>
          <div><dt>Moduli difensivi attivi</dt><dd>${activeControls} / ${defenseControls.length}</dd></div>
          <div><dt>Scenari superati</dt><dd>${summary.passed}</dd></div>
          <div><dt>Tentativi registrati</dt><dd>${state.attempts.length}</dd></div>
        </dl>
        <div class="mini-chart" aria-label="Punteggi recenti per scenario">${bars.map((score) => `<span style="height:${Math.max(score, 4)}%" title="${score}%"></span>`).join("")}</div>
        <p class="privacy-note">I risultati restano nel browser del dispositivo. L’applicazione non effettua chiamate di rete.</p>
      </aside>
    </section>
    <section class="secondary-grid">
      <article class="matrix-panel">
        <div class="panel-head"><span>Matrice vettori</span><span>ESPOSIZIONE DIDATTICA</span></div>
        <div class="vector-matrix">
          ${channelData.map(([name, value, detail]) => `<div class="vector-cell"><strong>${name}</strong><span>${detail}</span><div class="risk-bar"><span style="width:${value}%"></span></div></div>`).join("")}
        </div>
      </article>
      <aside class="defense-summary">
        <div class="panel-head"><span>Postura</span><span>${risk <= 25 ? "ROBUSTA" : risk <= 50 ? "INTERMEDIA" : "DA RAFFORZARE"}</span></div>
        <h3>${activeControls} controlli attivi</h3>
        <p>La riduzione del rischio dipende dall’integrazione di tecnologia, procedure e comportamento umano.</p>
        <button class="text-action" data-view-target="defenses" type="button">Configura difese →</button>
      </aside>
    </section>`;
}

function renderScenarios() {
  const selected = scenarios.find((scenario) => scenario.id === state.selectedScenarioId) || scenarios[0];
  const latest = getLatestByScenario();
  return `
    <section class="view-intro">
      <div><p class="section-index">02 / ESERCITAZIONI</p><h2>Otto vettori, una disciplina comune.</h2><p>Ogni scenario è simulato, non contiene link attivi e termina con un feedback orientato alla prevenzione.</p></div>
      <span class="tag">${latest.size} di ${scenarios.length} completati</span>
    </section>
    <section class="scenario-layout">
      <aside class="scenario-list" aria-label="Elenco scenari">
        <div class="scenario-list-head">Percorso addestrativo</div>
        ${scenarios.map((scenario) => `
          <button class="scenario-select ${scenario.id === selected.id ? "active" : ""}" data-action="select-scenario" data-id="${scenario.id}" type="button">
            <span class="number">${String(scenario.order).padStart(2, "0")}</span>
            <span><strong>${escapeHtml(scenario.title)}</strong><small>${escapeHtml(scenario.channel)} · ${escapeHtml(scenario.technique)}</small></span>
            <span class="complete-mark">${latest.has(scenario.id) ? "✓" : ""}</span>
          </button>`).join("")}
      </aside>
      <div class="scenario-stage">${renderScenarioStage(selected)}</div>
    </section>`;
}

function renderScenarioStage(scenario) {
  if (state.phase === "analysis") return renderAnalysis(scenario);
  if (state.phase === "debrief" && state.lastResult) return renderDebrief(scenario, state.lastResult);
  return `
    <p class="eyebrow">Scenario ${String(scenario.order).padStart(2, "0")} · ${escapeHtml(scenario.channel)}</p>
    <h2>${escapeHtml(scenario.title)}</h2>
    <p class="stage-lede">${escapeHtml(scenario.summary)}</p>
    <div class="tag-list">${scenario.principles.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>
    <div class="signal-row"><span class="signal-icon">i</span><div><strong>${escapeHtml(scenario.technique)}</strong><small>Esamina il contesto senza interagire con sistemi esterni. Nessuna credenziale verrà richiesta.</small></div></div>
    <div class="stage-actions">
      <button class="primary-action" data-action="begin-analysis" type="button">Inizia analisi <span aria-hidden="true">→</span></button>
      <button class="secondary-action" data-view-target="dashboard" type="button">Torna al quadro</button>
    </div>`;
}

function renderArtifact(scenario) {
  const artifact = scenario.artifact;
  const subject = artifact.subject ? `<strong>${escapeHtml(artifact.subject)}</strong>` : "";
  return `
    <article class="artifact kind-${escapeHtml(artifact.kind)}" aria-label="Artefatto simulato">
      <div class="artifact-chrome"><span>${escapeHtml(artifact.from)}</span><span>${escapeHtml(artifact.time)}</span></div>
      <div class="artifact-body">
        <div class="artifact-head">${subject}<span>${escapeHtml(scenario.technique)}</span></div>
        <div class="artifact-copy">${artifact.body.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
        <div class="artifact-footer">${escapeHtml(artifact.footer)}</div>
      </div>
    </article>`;
}

function renderAnalysis(scenario) {
  return `
    <p class="eyebrow">Analisi in corso · ${escapeHtml(scenario.channel)}</p>
    <h2>${escapeHtml(scenario.title)}</h2>
    ${renderArtifact(scenario)}
    <form id="exercise-form">
      <div class="exercise-grid">
        <fieldset class="question-block">
          <legend><h3>Quali elementi richiedono attenzione?</h3></legend>
          <p>Seleziona tutti gli indicatori che ritieni sospetti.</p>
          <div class="option-list">
            ${scenario.signals.map((signal) => `<label class="check-option"><input type="checkbox" name="signals" value="${signal.id}" ${state.selectedSignals.has(signal.id) ? "checked" : ""} /><span>${escapeHtml(signal.label)}</span></label>`).join("")}
          </div>
        </fieldset>
        <fieldset class="question-block">
          <legend><h3>Qual è la risposta più sicura?</h3></legend>
          <p>Scegli una sola decisione operativa.</p>
          <div class="option-list">
            ${decisions.map((decision) => `<label class="radio-option"><input type="radio" name="decision" value="${decision.id}" ${state.decisionId === decision.id ? "checked" : ""} /><span>${escapeHtml(decision.label)}</span></label>`).join("")}
          </div>
        </fieldset>
      </div>
      <div class="stage-actions">
        <button class="primary-action" data-action="submit-attempt" type="submit">Conferma valutazione <span aria-hidden="true">→</span></button>
        <button class="secondary-action" data-action="cancel-analysis" type="button">Interrompi esercizio</button>
      </div>
    </form>`;
}

function renderDebrief(scenario, result) {
  const selected = new Set(result.selectedSignalIds);
  const missed = scenario.signals.filter((signal) => signal.suspicious && !selected.has(signal.id));
  const falsePositives = scenario.signals.filter((signal) => !signal.suspicious && selected.has(signal.id));
  const nextScenario = scenarios[(scenario.order) % scenarios.length];
  return `
    <p class="eyebrow">Debrief · ${escapeHtml(scenario.channel)}</p>
    <div class="score-banner">
      <div class="score-value">${result.score}%</div>
      <div><h3>${result.passed ? "Valutazione superata" : "Rivedi gli indicatori chiave"}</h3><p>${result.truePositives} indicatori rilevati · ${result.falsePositives} falsi positivi · decisione ${result.decisionScore ? "corretta" : "da rivedere"}</p></div>
    </div>
    <div class="debrief">
      <p class="stage-lede">${escapeHtml(scenario.debrief)}</p>
      <div class="feedback-grid">
        <section class="feedback-panel"><h4>Indicatori decisivi</h4><ul>${scenario.signals.filter((signal) => signal.suspicious).map((signal) => `<li>${escapeHtml(signal.label)}</li>`).join("")}</ul></section>
        <section class="feedback-panel"><h4>Contromisure integrate</h4><ul>${scenario.countermeasures.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
      </div>
      ${missed.length || falsePositives.length ? `<div class="method-note"><strong>Da affinare.</strong> ${missed.length ? `${missed.length} indicatore/i sospetto/i non selezionato/i.` : ""} ${falsePositives.length ? `${falsePositives.length} elemento/i plausibile/i è stato interpretato come prova di attacco.` : ""}</div>` : ""}
      <div class="stage-actions">
        <button class="primary-action" data-action="next-scenario" data-id="${nextScenario.id}" type="button">Scenario successivo <span aria-hidden="true">→</span></button>
        <button class="secondary-action" data-action="retry-scenario" type="button">Ripeti scenario</button>
        <button class="text-action" data-view-target="reports" type="button">Apri rapporto</button>
      </div>
    </div>`;
}

function riskLabel(risk) {
  if (risk <= 25) return "Contenuto";
  if (risk <= 50) return "Moderato";
  if (risk <= 70) return "Elevato";
  return "Critico";
}

function renderDefenses() {
  const risk = calculateResidualRisk(state.defenseIds);
  const active = new Set(state.defenseIds);
  const coverage = ["E-mail", "SMS", "Voce", "Social", "Fisico", "Web", "Supporto"].map((channel) => {
    const relevant = defenseControls.filter((control) => control.coverage.includes(channel) || control.coverage.includes("Tutti i vettori"));
    const enabled = relevant.filter((control) => active.has(control.id)).length;
    return [channel, relevant.length ? Math.round((enabled / relevant.length) * 100) : 0];
  });
  const scaleActive = risk <= 25 ? 1 : risk <= 50 ? 2 : risk <= 70 ? 3 : 4;
  return `
    <section class="view-intro">
      <div><p class="section-index">03 / CONTRASTO</p><h2>La tecnologia funziona quando incontra procedure e persone.</h2><p>Attiva o disattiva i controlli per osservare come cambia il rischio residuo del modello didattico.</p></div>
    </section>
    <section class="defense-layout">
      <div class="control-list">
        ${defenseControls.map((control, index) => `
          <div class="control-row">
            <span class="control-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="control-copy"><strong>${escapeHtml(control.title)}</strong><small>${escapeHtml(control.detail)} Copertura: ${escapeHtml(control.coverage.join(", "))}.</small></span>
            <label class="switch"><span class="sr-only">Attiva ${escapeHtml(control.title)}</span><input type="checkbox" data-defense-id="${control.id}" ${active.has(control.id) ? "checked" : ""} /><span class="switch-track"></span></label>
          </div>`).join("")}
      </div>
      <aside class="posture-panel">
        <div class="panel-head"><span>Rischio residuo</span><span>${riskLabel(risk).toUpperCase()}</span></div>
        <div class="risk-number">${risk}</div>
        <p>Indice didattico su scala 0–100. Non rappresenta una valutazione certificata né sostituisce un risk assessment dell’organizzazione.</p>
        <div class="posture-scale" aria-label="Livello di rischio ${riskLabel(risk)}">${[1,2,3,4].map((level) => `<span class="${level === scaleActive ? "active" : ""}"></span>`).join("")}</div>
        <div class="coverage-list">${coverage.map(([channel, value]) => `<div class="coverage-row"><span>${channel}</span><div class="coverage-track"><span style="width:${value}%"></span></div><b>${value}</b></div>`).join("")}</div>
      </aside>
    </section>
    <p class="method-note"><strong>Principio di integrazione.</strong> HTTPS/TLS protegge il trasporto ma non certifica l’affidabilità del sito; MFA limita gli effetti del furto di password ma va affiancata da verifica, filtri aggiornati, segnalazione e formazione continua.</p>`;
}

function renderReports() {
  const summary = summarizeAttempts(state.attempts);
  const risk = calculateResidualRisk(state.defenseIds);
  const rows = [...state.attempts].reverse().map((attempt) => {
    const scenario = scenarios.find((item) => item.id === attempt.scenarioId);
    const date = new Intl.DateTimeFormat("it-IT", { dateStyle: "short", timeStyle: "short" }).format(new Date(attempt.completedAt));
    return `<tr><td>${date}</td><td>${escapeHtml(scenario?.title || attempt.scenarioId)}</td><td>${escapeHtml(attempt.channel)}</td><td>${attempt.score}%</td><td><span class="result-mark ${attempt.passed ? "pass" : "fail"}">${attempt.passed ? "Superato" : "Da rivedere"}</span></td></tr>`;
  }).join("");
  return `
    <section class="view-intro">
      <div><p class="section-index">04 / RISULTATI</p><h2>Traccia locale della preparazione.</h2><p>Il rapporto riassume i tentativi effettuati su questo dispositivo e può essere esportato in formato JSON.</p></div>
    </section>
    <section class="report-grid" aria-label="Sintesi risultati">
      <div class="report-stat"><strong>${summary.completed}/${summary.total}</strong><small>scenari affrontati</small></div>
      <div class="report-stat"><strong>${summary.completed ? `${summary.average}%` : "—"}</strong><small>accuratezza media</small></div>
      <div class="report-stat"><strong>${risk}</strong><small>rischio residuo</small></div>
    </section>
    <div class="report-actions">
      <button class="primary-action" data-action="export-report" type="button" ${state.attempts.length ? "" : "disabled"}>Esporta rapporto JSON</button>
      <button class="secondary-action" data-action="request-reset" type="button">Azzera sessione</button>
    </div>
    ${state.attempts.length ? `<div class="table-wrap"><table><thead><tr><th>Data</th><th>Scenario</th><th>Vettore</th><th>Punteggio</th><th>Esito</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<div class="empty-state"><div><h3>Nessun tentativo registrato</h3><p>Completa il primo scenario per iniziare a costruire il rapporto della sessione.</p><button class="primary-action" data-action="start-scenario" data-id="${scenarios[0].id}" type="button">Avvia il primo scenario →</button></div></div>`}
    <p class="method-note">I dati sono memorizzati tramite localStorage. L’esportazione crea un file sul dispositivo; nessuna informazione viene inviata dall’applicazione.</p>`;
}

function startScenario(scenarioId) {
  if (!scenarios.some((scenario) => scenario.id === scenarioId)) throw new Error("Scenario non valido");
  state.selectedScenarioId = scenarioId;
  state.phase = "analysis";
  state.selectedSignals = new Set();
  state.decisionId = "";
  state.lastResult = null;
  setView("scenarios");
}

function submitAttempt(scenarioId, selectedSignalIds, decisionId) {
  const scenario = scenarios.find((item) => item.id === scenarioId);
  if (!scenario) throw new Error("Scenario non valido");
  const allowedSignals = new Set(scenario.signals.map((signal) => signal.id));
  if (!Array.isArray(selectedSignalIds) || selectedSignalIds.some((id) => !allowedSignals.has(id))) throw new Error("Indicatori non validi");
  if (!decisions.some((decision) => decision.id === decisionId)) throw new Error("Decisione non valida");
  const result = {
    ...evaluateAttempt(scenario, selectedSignalIds, decisionId),
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${scenario.id}`,
    completedAt: new Date().toISOString(),
  };
  state.attempts.push(result);
  state.lastResult = result;
  state.phase = "debrief";
  persist();
  render();
  showToast(result.passed ? "Scenario completato" : "Scenario registrato: consulta il debrief");
  return result;
}

function exportReport() {
  const report = buildReport(state.attempts, state.defenseIds);
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `navis-rapporto-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast("Rapporto esportato sul dispositivo");
}

function resetSession() {
  state.attempts = [];
  state.defenseIds = [...defaultDefenseIds];
  state.lastResult = null;
  state.phase = "intro";
  persist();
  render();
  showToast("Sessione locale azzerata");
}

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-view]");
  if (navButton) return setView(navButton.dataset.view);
  const viewTarget = event.target.closest("[data-view-target]");
  if (viewTarget) return setView(viewTarget.dataset.viewTarget);
  const action = event.target.closest("[data-action]");
  if (!action) return;
  const scenario = scenarios.find((item) => item.id === state.selectedScenarioId);

  if (action.dataset.action === "start-scenario") startScenario(action.dataset.id);
  if (action.dataset.action === "select-scenario") {
    state.selectedScenarioId = action.dataset.id;
    state.phase = "intro";
    state.selectedSignals = new Set();
    state.decisionId = "";
    state.lastResult = null;
    render();
  }
  if (action.dataset.action === "begin-analysis") startScenario(state.selectedScenarioId);
  if (action.dataset.action === "cancel-analysis") {
    state.phase = "intro";
    render();
  }
  if (action.dataset.action === "retry-scenario") startScenario(state.selectedScenarioId);
  if (action.dataset.action === "next-scenario") startScenario(action.dataset.id);
  if (action.dataset.action === "export-report") exportReport();
  if (action.dataset.action === "request-reset") confirmDialog.showModal();
  void scenario;
});

document.addEventListener("change", (event) => {
  if (event.target.matches('input[name="signals"]')) {
    if (event.target.checked) state.selectedSignals.add(event.target.value);
    else state.selectedSignals.delete(event.target.value);
  }
  if (event.target.matches('input[name="decision"]')) state.decisionId = event.target.value;
  if (event.target.matches("[data-defense-id]")) {
    const id = event.target.dataset.defenseId;
    const active = new Set(state.defenseIds);
    if (event.target.checked) active.add(id);
    else active.delete(id);
    state.defenseIds = [...active];
    persist();
    render();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "exercise-form") return;
  event.preventDefault();
  if (!state.decisionId) return showToast("Seleziona prima una risposta operativa");
  submitAttempt(state.selectedScenarioId, [...state.selectedSignals], state.decisionId);
});

document.querySelector("#confirm-reset")?.addEventListener("click", resetSession);

function updateClock() {
  const clock = document.querySelector("#session-clock");
  clock.textContent = new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
}

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const safeRegister = (definition) => {
    try { void Promise.resolve(context.registerTool(definition)).catch(() => {}); } catch { /* Browser senza supporto completo. */ }
  };
  safeRegister({
    name: "get_training_status",
    title: "Leggi stato addestramento",
    description: "Restituisce la sintesi locale degli scenari completati e del rischio residuo.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: () => ({ ...summarizeAttempts(state.attempts), residualRisk: calculateResidualRisk(state.defenseIds) }),
  });
  safeRegister({
    name: "start_training_scenario",
    title: "Avvia scenario addestrativo",
    description: "Apre uno degli scenari difensivi disponibili nell’interfaccia.",
    inputSchema: { type: "object", properties: { scenarioId: { type: "string", enum: scenarios.map((item) => item.id) } }, required: ["scenarioId"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ scenarioId }) => { startScenario(scenarioId); return { scenarioId, status: "started" }; },
  });
  safeRegister({
    name: "submit_training_attempt",
    title: "Consegna valutazione scenario",
    description: "Valuta indicatori e decisione per uno scenario e aggiorna lo stesso rapporto visibile nell’app.",
    inputSchema: {
      type: "object",
      properties: {
        scenarioId: { type: "string", enum: scenarios.map((item) => item.id) },
        selectedSignalIds: { type: "array", items: { type: "string" }, uniqueItems: true },
        decisionId: { type: "string", enum: decisions.map((item) => item.id) },
      },
      required: ["scenarioId", "selectedSignalIds", "decisionId"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ scenarioId, selectedSignalIds, decisionId }) => {
      state.selectedScenarioId = scenarioId;
      state.view = "scenarios";
      const result = submitAttempt(scenarioId, selectedSignalIds, decisionId);
      return { scenarioId, score: result.score, passed: result.passed };
    },
  });
  safeRegister({
    name: "configure_training_defenses",
    title: "Configura difese didattiche",
    description: "Imposta in blocco i controlli attivi nel modello di rischio locale.",
    inputSchema: { type: "object", properties: { activeDefenseIds: { type: "array", items: { type: "string", enum: defenseControls.map((item) => item.id) }, uniqueItems: true } }, required: ["activeDefenseIds"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ activeDefenseIds }) => {
      if (!Array.isArray(activeDefenseIds) || activeDefenseIds.some((id) => !defenseControls.some((control) => control.id === id))) throw new Error("Configurazione non valida");
      state.defenseIds = [...activeDefenseIds];
      persist();
      setView("defenses");
      return { activeDefenseIds: state.defenseIds, residualRisk: calculateResidualRisk(state.defenseIds) };
    },
  });
}

updateClock();
window.setInterval(updateClock, 1000);
render();
registerWebMcpTools();
