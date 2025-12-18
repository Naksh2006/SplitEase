# SplitEase

SplitEase is a frontend-first web application for managing shared expenses within trips or projects.  
It is inspired by tools like Splitwise and focuses on clear balance tracking, settlements, and activity visibility.

The current version runs entirely in the browser and is designed to be extended into a full-stack application in the future.

---

## Current Capabilities

- Create multiple projects or trips
- Manage different members per project
- Add expenses with:
  - Equal split (default)
  - Percentage-based split
- Track net balances for each member
- Generate settle-up tasks automatically
- Mark settlements as completed
- Live activity feed showing all actions within a project
- Persistent data using browser localStorage

---

## How the System Works

Each project maintains a **net balance** for every member:
- Positive balance → the member should receive money
- Negative balance → the member owes money

Instead of storing pairwise debts, SplitEase calculates minimal settlement tasks by matching debtors and creditors.  
This reduces unnecessary transactions and keeps the settlement process simple.

All logic is handled on the client side in the current version.

---

## Tech Stack (Current)

- HTML
- CSS
- Vanilla JavaScript (ES Modules)
- Browser localStorage for persistence

No backend or authentication is implemented in the current version.

---

## Project Structure
---
## Live Demo

The current frontend version is deployed using GitHub Pages:  
👉 [Click to view the application](https://naksh2006.github.io/SplitEase/)

## Current Status

This project is currently implemented as a frontend-only application.  
All data is stored locally in the browser using localStorage.


