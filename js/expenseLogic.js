export function createProject(name) {
  return {
    id: Date.now().toString(),
    name,
    members: [],
    balances: {},
    settlements: [],
    activity: []
  };
}

export function logActivity(project, text) {
  project.activity.unshift({
    text,
    time: new Date().toLocaleTimeString()
  });
}

export function addEqualExpense(project, amount, paidBy, people) {
  const share = amount / people.length;

  people.forEach(p => {
    if (p !== paidBy) {
      project.balances[p] -= share;
      project.balances[paidBy] += share;
    }
  });

  logActivity(project, `${paidBy} added ₹${amount} expense`);
}

export function addPercentExpense(project, amount, paidBy, people, percents) {
  let total = 0;
  people.forEach(p => total += percents[p]);

  if (total !== 100) throw new Error("Percent must sum to 100");

  people.forEach(p => {
    if (p !== paidBy) {
      const share = (percents[p] / 100) * amount;
      project.balances[p] -= share;
      project.balances[paidBy] += share;
    }
  });

  logActivity(project, `${paidBy} added ₹${amount} expense (percent split)`);
}

export function generateSettlements(project) {
  const creditors = [];
  const debtors = [];

  Object.entries(project.balances).forEach(([p, amt]) => {
    if (amt > 0) creditors.push({ p, amt });
    if (amt < 0) debtors.push({ p, amt: -amt });
  });

  project.settlements = [];

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amt, creditors[j].amt);

    project.settlements.push({
      from: debtors[i].p,
      to: creditors[j].p,
      amount: pay
    });

    debtors[i].amt -= pay;
    creditors[j].amt -= pay;

    if (debtors[i].amt === 0) i++;
    if (creditors[j].amt === 0) j++;
  }
}

export function completeSettlement(project, idx) {
  const s = project.settlements[idx];

  project.balances[s.from] += s.amount;
  project.balances[s.to] -= s.amount;

  logActivity(project, `${s.from} settled ₹${s.amount} with ${s.to}`);
  project.settlements.splice(idx, 1);
}
