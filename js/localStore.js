import { appState } from "./appState.js";

const KEY = "splitease_full_v1";

export function saveState() {
  localStorage.setItem(KEY, JSON.stringify(appState));
}

export function loadState() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return;

  const data = JSON.parse(raw);
  appState.projects = data.projects || [];
  appState.activeProjectId = data.activeProjectId;
}
