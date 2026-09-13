import test from "node:test";
import assert from "node:assert/strict";
import {
  buildReport,
  calculateResidualRisk,
  defaultDefenseIds,
  defenseControls,
  evaluateAttempt,
  scenarios,
  summarizeAttempts,
} from "../dist/domain.mjs";

test("ogni scenario ha indicatori e una decisione valida", () => {
  assert.equal(scenarios.length, 8);
  for (const scenario of scenarios) {
    assert.ok(scenario.signals.some((signal) => signal.suspicious));
    assert.ok(["verify", "stop", "report", "proceed"].includes(scenario.correctDecision));
  }
});

test("una valutazione perfetta produce 100 punti", () => {
  const scenario = scenarios[0];
  const selected = scenario.signals.filter((signal) => signal.suspicious).map((signal) => signal.id);
  const result = evaluateAttempt(scenario, selected, scenario.correctDecision);
  assert.equal(result.score, 100);
  assert.equal(result.passed, true);
  assert.equal(result.falsePositives, 0);
});

test("i falsi positivi e una decisione errata riducono il punteggio", () => {
  const scenario = scenarios[0];
  const selected = scenario.signals.map((signal) => signal.id);
  const result = evaluateAttempt(scenario, selected, "proceed");
  assert.ok(result.score < 70);
  assert.equal(result.passed, false);
  assert.ok(result.falsePositives > 0);
});

test("la difesa integrata riduce il rischio più di un solo controllo", () => {
  const oneControl = calculateResidualRisk([defenseControls[0].id]);
  const integrated = calculateResidualRisk(defaultDefenseIds);
  assert.ok(integrated < oneControl);
  assert.ok(integrated >= 8);
});

test("la sintesi conta uno scenario una sola volta usando l’ultimo tentativo", () => {
  const attempts = [
    { scenarioId: scenarios[0].id, score: 50, passed: false },
    { scenarioId: scenarios[0].id, score: 90, passed: true },
  ];
  const summary = summarizeAttempts(attempts);
  assert.equal(summary.completed, 1);
  assert.equal(summary.average, 90);
  assert.equal(summary.passed, 1);
});

test("il rapporto contiene policy locale e postura", () => {
  const report = buildReport([], defaultDefenseIds);
  assert.match(report.dataPolicy, /locale/i);
  assert.equal(typeof report.residualRisk, "number");
  assert.ok(Array.isArray(report.activeDefenses));
});
