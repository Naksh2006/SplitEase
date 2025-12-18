import { appState } from "./appState.js";

export function getActiveProject() {
  return appState.projects.find(p => p.id === appState.activeProjectId);
}

export function renderProjects() {
  const box = document.getElementById("projectList");
  box.innerHTML = "";

  appState.projects.forEach(p => {
    const span = document.createElement("span");
    span.textContent = p.name;

    if (p.id === appState.activeProjectId) {
      span.classList.add("active-project");
    }

    span.onclick = () => {
      appState.activeProjectId = p.id;
      renderAll();
    };

    box.appendChild(span);
  });
}


export function renderMembers(project) {
  const list = document.getElementById("memberList");
  const paid = document.getElementById("paidBySelect");
  const part = document.getElementById("participantsContainer");

  list.innerHTML = paid.innerHTML = part.innerHTML = "";

  project.members.forEach(m => {
    list.innerHTML += `
  <span>
    ${m}
    <button data-name="${m}" style="margin-left:5px;">✕</button>
  </span>
  `
;

    paid.innerHTML += `<option>${m}</option>`;
    part.innerHTML += `
      <div>
        <input type="checkbox" value="${m}" checked>
        ${m}
        <input type="number" id="percent-${m}" placeholder="%" style="display:none">
      </div>`;
  });
}

export function renderBalances(project) {
  const box = document.getElementById("balances");
  box.innerHTML = "";

  Object.entries(project.balances).forEach(([p, b]) => {
    box.innerHTML += `<div class="${b >= 0 ? "balance-positive" : "balance-negative"}">
      ${p}: ${b.toFixed(2)}
    </div>`;
  });
}

export function renderSettlements(project) {
  const box = document.getElementById("settlements");
  box.innerHTML = "";

  project.settlements.forEach((s, i) => {
    box.innerHTML += `
      <div>
        ${s.from} pays ${s.to} ₹${s.amount}
        <button data-idx="${i}">Done</button>
      </div>`;
  });
}

export function renderActivity(project) {
  const box = document.getElementById("activityLog");
  box.innerHTML = "";

  project.activity.forEach(a => {
    box.innerHTML += `<div>[${a.time}] ${a.text}</div>`;
  });
}

export function showEmptyState() {
  document.getElementById("memberList").innerHTML = "";
  document.getElementById("participantsContainer").innerHTML = "";
  document.getElementById("balances").innerHTML = "";
  document.getElementById("settlements").innerHTML = "";
  document.getElementById("activityLog").innerHTML = "";

  const projectList = document.getElementById("projectList");
  projectList.innerHTML = "<p style='color:#777'>No projects yet. Add one to get started.</p>";
}

export function renderAll() {
  if (!appState.activeProjectId) {
    showEmptyState();
    renderProjects();
    return;
  }

  const project = getActiveProject();
  if (!project) return;

  renderProjects();
  renderMembers(project);
  renderBalances(project);
  renderSettlements(project);
  renderActivity(project);
}
