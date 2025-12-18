import { appState } from "./appState.js";
import { saveState, loadState } from "./localStore.js";
import {
  createProject,
  addEqualExpense,
  addPercentExpense,
  generateSettlements,
  completeSettlement
} from "./expenseLogic.js";
import {
  renderAll,
  getActiveProject
} from "./domRenderer.js";

loadState();
renderAll();

document.getElementById("addProjectBtn").onclick = () => {
  const name = projectInput.value.trim();
  if (!name) return;

  const p = createProject(name);
  appState.projects.push(p);
  appState.activeProjectId = p.id;
  saveState();
  renderAll();
};

document.getElementById("addMemberBtn").onclick = () => {
  const project = getActiveProject();
  if (!project) return;

  const name = memberInput.value.trim();
  if (!name || project.members.includes(name)) return;

  project.members.push(name);
  project.balances[name] = 0;
  saveState();
  renderAll();
};

document.getElementById("addExpenseBtn").onclick = () => {
  const project = getActiveProject();
  if (!project) return;

  const amount = Number(amountInput.value);
  const paidBy = paidBySelect.value;

  const people = [...document.querySelectorAll("#participantsContainer input[type=checkbox]")]
    .filter(c => c.checked)
    .map(c => c.value);

  if (splitType.value === "equal") {
    addEqualExpense(project, amount, paidBy, people);
  } else {
    const percents = {};
    people.forEach(p => percents[p] = Number(document.getElementById(`percent-${p}`).value));
    addPercentExpense(project, amount, paidBy, people, percents);
  }

  generateSettlements(project);
  saveState();
  renderAll();
};

document.getElementById("settlements").onclick = e => {
  if (e.target.tagName !== "BUTTON") return;

  const project = getActiveProject();
  completeSettlement(project, e.target.dataset.idx);
  generateSettlements(project);
  saveState();
  renderAll();
};

document.getElementById("splitType").onchange = e => {
  const project = getActiveProject();
  if (!project) return;

  project.members.forEach(m => {
    const el = document.getElementById(`percent-${m}`);
    if (el) el.style.display = e.target.value === "percent" ? "inline-block" : "none";
  });
};
const settleBtn = document.getElementById("toggleSettleBtn");
const settleBox = document.getElementById("settlements");

settleBtn.onclick = () => {
  if (settleBox.style.display === "none") {
    settleBox.style.display = "block";
    settleBtn.textContent = "Hide Settlements";
  } else {
    settleBox.style.display = "none";
    settleBtn.textContent = "Show Settlements";
  }
};
