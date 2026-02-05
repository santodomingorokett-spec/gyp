const USERS = [
  { email: 'socio@bufete.co', password: 'Admin#2026', nombre: 'Socio Director', rol: 'socio_direccion', especial: true },
  { email: 'abogado@bufete.co', password: 'Abogado#2026', nombre: 'Abogado Senior', rol: 'abogado', especial: false }
];

const state = {
  user: null,
  clients: JSON.parse(localStorage.getItem('clients') || '[]'),
  agenda: JSON.parse(localStorage.getItem('agenda') || '[]'),
  config: null
};

const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const specialPanel = document.getElementById('specialPanel');
const welcomeText = document.getElementById('welcomeText');
const kpiCards = document.getElementById('kpiCards');
const clientList = document.getElementById('clientList');
const agendaList = document.getElementById('agendaList');

function saveState() {
  localStorage.setItem('clients', JSON.stringify(state.clients));
  localStorage.setItem('agenda', JSON.stringify(state.agenda));
}

function renderKpis() {
  const cards = [
    { valor: state.clients.length, label: 'Expedientes activos' },
    { valor: state.agenda.length, label: 'Eventos programados' },
    { valor: `${Math.min(100, 70 + state.agenda.length * 2)}%`, label: 'Cumplimiento estimado' },
    { valor: state.config?.roles?.length || 0, label: 'Roles operativos' }
  ];
  kpiCards.innerHTML = cards.map(k => `<article class="card kpi"><strong>${k.valor}</strong><span>${k.label}</span></article>`).join('');
}

function renderLists() {
  clientList.innerHTML = state.clients.map(c => `<li><strong>${c.nombre}</strong> — ${c.tipo}</li>`).join('') || '<li>Sin expedientes registrados.</li>';
  agendaList.innerHTML = state.agenda.map(a => `<li>${a.fecha}: ${a.tarea}</li>`).join('') || '<li>Sin actividades programadas.</li>';
}

function renderDashboard() {
  welcomeText.textContent = `${state.user.nombre} (${state.user.rol})`;
  specialPanel.classList.toggle('hidden', !state.user.especial);
  renderKpis();
  renderLists();
}

function showDashboard() {
  loginSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  renderDashboard();
}

function showLogin() {
  dashboardSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
}

async function loadConfig() {
  try {
    const response = await fetch('./config/gestion-integral.json');
    state.config = await response.json();
  } catch {
    state.config = { roles: [] };
  }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await loadConfig();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const user = USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Credenciales inválidas. Verifica correo y contraseña.');
    return;
  }

  state.user = user;
  showDashboard();
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  state.user = null;
  showLogin();
});

document.getElementById('clientForm').addEventListener('submit', (e) => {
  e.preventDefault();
  state.clients.push({
    nombre: document.getElementById('clientName').value.trim(),
    tipo: document.getElementById('caseType').value.trim()
  });
  e.target.reset();
  saveState();
  renderDashboard();
});

document.getElementById('agendaForm').addEventListener('submit', (e) => {
  e.preventDefault();
  state.agenda.push({
    tarea: document.getElementById('agendaTask').value.trim(),
    fecha: document.getElementById('agendaDate').value
  });
  e.target.reset();
  saveState();
  renderDashboard();
});

showLogin();
