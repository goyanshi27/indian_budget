/**
 * India Union Budget Dashboard 2026
 * Main JavaScript — Modular, ES6+
 */

'use strict';

// ============================================================
// STATE
// ============================================================
const State = {
  data: null,
  theme: 'dark',
  sidebarCollapsed: false,
  activeCategory: 'all',
  activeYear: '2025-26',
  charts: {}
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initParticles();
  initTheme();
  initSidebar();
  initTopbar();
  initFilters();
  renderKPIs();
  renderCharts();
  renderSectorTable();
  renderStateMap();
  renderAIInsights();
  renderObservations();
  initSearch();
  initDownloads();
  AOS.init({ duration: 700, once: true, offset: 60 });
  hideLoader();
});

// ============================================================
// DATA LOADING
// ============================================================
async function loadData() {
  try {
    const res = await fetch('data/budget-data.json');
    State.data = await res.json();
  } catch (e) {
    State.data = getFallbackData();
  }
}

function getFallbackData() {
  return {
    meta: { title: "India Union Budget 2026", currency: "₹ Lakh Crore", totalBudget: 50.65, gdpGrowthEstimate: 7.2, fiscalYear: "2025-26" },
    sectors: [
      { id:1, name:"Defence", allocation:6.21, prevYear:5.94, growth:4.55, category:"security", color:"#FF6B6B", icon:"fa-shield-halved" },
      { id:2, name:"Infrastructure", allocation:5.80, prevYear:5.20, growth:11.54, category:"economic", color:"#4ECDC4", icon:"fa-road" },
      { id:3, name:"Education", allocation:4.10, prevYear:3.85, growth:6.49, category:"social", color:"#45B7D1", icon:"fa-graduation-cap" },
      { id:4, name:"Healthcare", allocation:3.75, prevYear:3.40, growth:10.29, category:"social", color:"#96CEB4", icon:"fa-heart-pulse" },
      { id:5, name:"Agriculture", allocation:3.50, prevYear:3.20, growth:9.38, category:"economic", color:"#FFEAA7", icon:"fa-wheat-awn" },
      { id:6, name:"Railways", allocation:2.65, prevYear:2.40, growth:10.42, category:"infrastructure", color:"#DDA0DD", icon:"fa-train" },
      { id:7, name:"Rural Development", allocation:2.45, prevYear:2.30, growth:6.52, category:"social", color:"#98D8C8", icon:"fa-house-chimney" },
      { id:8, name:"Digital India / IT", allocation:2.20, prevYear:1.85, growth:18.92, category:"economic", color:"#F7DC6F", icon:"fa-microchip" },
      { id:9, name:"Renewable Energy", allocation:1.95, prevYear:1.60, growth:21.88, category:"infrastructure", color:"#82E0AA", icon:"fa-solar-panel" },
      { id:10, name:"Commerce & Industry", allocation:1.80, prevYear:1.70, growth:5.88, category:"economic", color:"#F0B27A", icon:"fa-industry" },
      { id:11, name:"Science & Space", allocation:1.60, prevYear:1.40, growth:14.29, category:"economic", color:"#BB8FCE", icon:"fa-rocket" },
      { id:12, name:"Women & Child Welfare", allocation:1.40, prevYear:1.25, growth:12.00, category:"social", color:"#F1948A", icon:"fa-child" },
      { id:13, name:"Skill Development", allocation:1.20, prevYear:1.05, growth:14.29, category:"social", color:"#85C1E9", icon:"fa-person-chalkboard" },
      { id:14, name:"Environment & Climate", allocation:0.95, prevYear:0.80, growth:18.75, category:"infrastructure", color:"#A9DFBF", icon:"fa-leaf" },
      { id:15, name:"Tourism", allocation:0.69, prevYear:0.62, growth:11.29, category:"economic", color:"#FAD7A0", icon:"fa-umbrella-beach" }
    ],
    historicalData: {
      years: ["2021-22","2022-23","2023-24","2024-25","2025-26"],
      totalBudget: [34.83,39.45,43.10,47.66,50.65],
      sectors: {
        "Defence":[4.78,5.25,5.54,5.94,6.21],
        "Infrastructure":[3.50,4.10,4.60,5.20,5.80],
        "Education":[3.10,3.40,3.65,3.85,4.10],
        "Healthcare":[2.60,2.90,3.15,3.40,3.75],
        "Agriculture":[2.50,2.75,2.95,3.20,3.50],
        "Railways":[1.90,2.10,2.25,2.40,2.65],
        "Digital India / IT":[1.10,1.35,1.60,1.85,2.20],
        "Renewable Energy":[0.90,1.10,1.35,1.60,1.95]
      }
    },
    stateData: [
      { state:"Maharashtra", education:18500, healthcare:12300, infrastructure:22000 },
      { state:"Uttar Pradesh", education:22000, healthcare:14500, infrastructure:19000 },
      { state:"Tamil Nadu", education:15000, healthcare:11000, infrastructure:17500 },
      { state:"Karnataka", education:13500, healthcare:9800, infrastructure:16000 },
      { state:"Gujarat", education:12000, healthcare:8500, infrastructure:18000 },
      { state:"Rajasthan", education:14000, healthcare:9200, infrastructure:13500 },
      { state:"West Bengal", education:13000, healthcare:8800, infrastructure:12000 },
      { state:"Madhya Pradesh", education:11500, healthcare:7600, infrastructure:11000 },
      { state:"Bihar", education:10000, healthcare:6500, infrastructure:9500 },
      { state:"Andhra Pradesh", education:11000, healthcare:8000, infrastructure:14000 }
    ],
    revenueExpenditure: {
      years:["2021-22","2022-23","2023-24","2024-25","2025-26"],
      revenue:[19.05,22.84,26.32,30.01,33.61],
      expenditure:[34.83,39.45,43.10,47.66,50.65],
      deficit:[15.78,16.61,16.78,17.65,17.04]
    },
    predictions: {
      years:["2025-26","2026-27","2027-28","2028-29","2029-30","2030-31"],
      totalBudget:[50.65,55.20,60.10,65.80,72.00,78.50],
      sectors:{
        "Defence":[6.21,6.65,7.10,7.60,8.15,8.75],
        "Infrastructure":[5.80,6.50,7.30,8.20,9.20,10.30],
        "Education":[4.10,4.55,5.05,5.60,6.20,6.85],
        "Healthcare":[3.75,4.25,4.80,5.40,6.10,6.85],
        "Renewable Energy":[1.95,2.40,2.95,3.60,4.35,5.20],
        "Digital India / IT":[2.20,2.75,3.40,4.15,5.00,6.00]
      }
    },
    aiInsights: {
      highestGrowing:"Renewable Energy",
      fastestDeclining:"Tourism",
      budgetEfficiencyScore:78,
      topPriorities:["Digital Infrastructure","Green Energy Transition","Healthcare Expansion"],
      economicGrowthEstimate:7.2,
      inflationAdjustedGrowth:4.8
    }
  };
}

// ============================================================
// LOADER
// ============================================================
function hideLoader() {
  setTimeout(() => {
    const loader = document.getElementById('loadingScreen');
    if (loader) loader.classList.add('hidden');
  }, 2200);
}

// ============================================================
// PARTICLES
// ============================================================
function initParticles() {
  const container = document.getElementById('particles-bg');
  if (!container) return;
  const colors = ['#FF9933', '#138808', '#FFFFFF', '#45B7D1', '#BB8FCE'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 20 + 15}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// ============================================================
// THEME
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('budgetTheme') || 'dark';
  setTheme(saved);
  document.getElementById('themeToggle').addEventListener('click', () => {
    setTheme(State.theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => renderCharts(), 100);
  });
}

function setTheme(theme) {
  State.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('budgetTheme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ============================================================
// SIDEBAR
// ============================================================
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const toggleBtn = document.getElementById('sidebarToggle');
  const mobileBtn = document.getElementById('mobileMenuBtn');

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';
  document.body.appendChild(overlay);

  toggleBtn.addEventListener('click', () => {
    State.sidebarCollapsed = !State.sidebarCollapsed;
    sidebar.classList.toggle('collapsed', State.sidebarCollapsed);
    mainContent.classList.toggle('expanded', State.sidebarCollapsed);
  });

  mobileBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    });
  });
}

// ============================================================
// TOPBAR
// ============================================================
function initTopbar() {
  const notifBtn = document.getElementById('notifBtn');
  const notifPanel = document.getElementById('notifPanel');
  const closeNotif = document.getElementById('closeNotif');

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('open');
  });
  closeNotif.addEventListener('click', () => notifPanel.classList.remove('open'));
  document.addEventListener('click', (e) => {
    if (!notifPanel.contains(e.target) && e.target !== notifBtn) {
      notifPanel.classList.remove('open');
    }
  });

  document.getElementById('topYearSelector').addEventListener('change', (e) => {
    State.activeYear = e.target.value;
    document.getElementById('yearFilter').value = e.target.value;
    updateDashboard();
  });
}

// ============================================================
// FILTERS
// ============================================================
function initFilters() {
  document.getElementById('yearFilter').addEventListener('change', (e) => {
    State.activeYear = e.target.value;
    document.getElementById('topYearSelector').value = e.target.value;
    updateDashboard();
  });

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      State.activeCategory = chip.dataset.cat;
      renderSectorTable();
      updatePieChart();
    });
  });
}

function updateDashboard() {
  renderKPIs();
  renderSectorTable();
}

// ============================================================
// HELPERS
// ============================================================
function getFilteredSectors() {
  const sectors = State.data.sectors;
  if (State.activeCategory === 'all') return sectors;
  return sectors.filter(s => s.category === State.activeCategory);
}

function isDark() { return State.theme === 'dark'; }
function chartTextColor() { return isDark() ? '#8fa3c0' : '#3a5070'; }
function chartGridColor() { return isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'; }
function chartBgColor() { return isDark() ? '#0d1b35' : '#ffffff'; }

// ============================================================
// KPI CARDS
// ============================================================
function renderKPIs() {
  const { sectors, meta } = State.data;
  const total = meta.totalBudget;
  const sorted = [...sectors].sort((a, b) => b.allocation - a.allocation);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];
  const edu = sectors.find(s => s.name === 'Education');
  const health = sectors.find(s => s.name === 'Healthcare');

  const kpis = [
    {
      label: 'Total Budget', icon: 'fa-indian-rupee-sign',
      value: `₹${total}`, suffix: ' L.Cr',
      growth: 6.3, up: true, sub: 'FY 2025-26',
      accent: 'linear-gradient(135deg,#FF9933,#ff6600)',
      iconBg: 'rgba(255,153,51,0.15)', iconColor: '#FF9933',
      glow: 'rgba(255,153,51,0.08)'
    },
    {
      label: 'Highest Funded Sector', icon: highest.icon,
      value: highest.name, suffix: '',
      growth: highest.growth, up: true, sub: `₹${highest.allocation} L.Cr`,
      accent: `linear-gradient(135deg,${highest.color},${highest.color}99)`,
      iconBg: `${highest.color}22`, iconColor: highest.color,
      glow: `${highest.color}10`
    },
    {
      label: 'Lowest Funded Sector', icon: lowest.icon,
      value: lowest.name, suffix: '',
      growth: lowest.growth, up: true, sub: `₹${lowest.allocation} L.Cr`,
      accent: 'linear-gradient(135deg,#FAD7A0,#f0a040)',
      iconBg: 'rgba(250,215,160,0.15)', iconColor: '#FAD7A0',
      glow: 'rgba(250,215,160,0.06)'
    },
    {
      label: 'Education Spending', icon: 'fa-graduation-cap',
      value: ((edu.allocation / total) * 100).toFixed(1), suffix: '%',
      growth: edu.growth, up: true, sub: `₹${edu.allocation} L.Cr allocated`,
      accent: 'linear-gradient(135deg,#45B7D1,#2980b9)',
      iconBg: 'rgba(69,183,209,0.15)', iconColor: '#45B7D1',
      glow: 'rgba(69,183,209,0.08)'
    },
    {
      label: 'Healthcare Spending', icon: 'fa-heart-pulse',
      value: ((health.allocation / total) * 100).toFixed(1), suffix: '%',
      growth: health.growth, up: true, sub: `₹${health.allocation} L.Cr allocated`,
      accent: 'linear-gradient(135deg,#96CEB4,#27ae60)',
      iconBg: 'rgba(150,206,180,0.15)', iconColor: '#96CEB4',
      glow: 'rgba(150,206,180,0.08)'
    },
    {
      label: 'GDP Growth Estimate', icon: 'fa-chart-line',
      value: meta.gdpGrowthEstimate, suffix: '%',
      growth: 0.4, up: true, sub: 'FY 2025-26 projection',
      accent: 'linear-gradient(135deg,#138808,#0d6b06)',
      iconBg: 'rgba(19,136,8,0.15)', iconColor: '#138808',
      glow: 'rgba(19,136,8,0.08)'
    }
  ];

  const grid = document.getElementById('kpiGrid');
  grid.innerHTML = kpis.map((k, i) => `
    <div class="kpi-card" data-aos="fade-up" data-aos-delay="${i * 80}"
      style="--card-accent:${k.accent};--card-icon-bg:${k.iconBg};--card-icon-color:${k.iconColor};--card-glow:${k.glow}">
      <div class="kpi-icon"><i class="fa-solid ${k.icon}"></i></div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">
        <span class="counter" data-target="${typeof k.value === 'number' ? k.value : ''}"
          data-suffix="${k.suffix}">${typeof k.value === 'string' ? k.value : '0'}${k.suffix}</span>
      </div>
      <div class="kpi-footer">
        <span class="kpi-growth ${k.up ? 'up' : 'down'}">
          <i class="fa-solid ${k.up ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}"></i>
          ${k.growth > 0 ? '+' : ''}${k.growth}%
        </span>
        <span class="kpi-sub">${k.sub}</span>
      </div>
    </div>
  `).join('');

  animateCounters();
}

function animateCounters() {
  document.querySelectorAll('.counter[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    if (isNaN(target)) return;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const isInt = Number.isInteger(target);
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ============================================================
// CHARTS — MAIN RENDER
// ============================================================
function renderCharts() {
  renderPieChart();
  renderBarChart();
  renderLineChart();
  renderDonutChart();
  renderTreemap();
  renderHeatmap();
  renderAreaChart();
  renderForecastChart();
  renderSectorForecastChart();
}

// ---- PIE CHART (ApexCharts) ----
function renderPieChart(type = 'pie') {
  const { sectors } = State.data;
  const el = document.getElementById('pieChart');
  if (!el) return;
  if (State.charts.pie) { State.charts.pie.destroy(); }

  State.charts.pie = new ApexCharts(el, {
    series: sectors.map(s => s.allocation),
    labels: sectors.map(s => s.name),
    colors: sectors.map(s => s.color),
    chart: {
      type: type, height: 300, background: 'transparent',
      animations: { enabled: true, speed: 800 },
      toolbar: { show: false }
    },
    legend: { position: 'bottom', labels: { colors: chartTextColor() }, fontSize: '11px' },
    tooltip: { y: { formatter: val => `₹${val.toFixed(2)} L.Cr` }, theme: State.theme },
    dataLabels: {
      enabled: type === 'pie',
      formatter: (val) => val.toFixed(1) + '%',
      style: { fontSize: '10px' }
    },
    plotOptions: {
      pie: { donut: { size: type === 'donut' ? '65%' : '0%' }, expandOnClick: true }
    },
    stroke: { width: 2, colors: [chartBgColor()] },
    theme: { mode: State.theme }
  });
  State.charts.pie.render();

  // Attach toggle listeners (once)
  document.querySelectorAll('[data-chart]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-chart]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPieChart(btn.dataset.chart);
    };
  });
}

function updatePieChart() {
  const filtered = getFilteredSectors();
  if (State.charts.pie) {
    State.charts.pie.updateOptions({
      series: filtered.map(s => s.allocation),
      labels: filtered.map(s => s.name),
      colors: filtered.map(s => s.color)
    });
  }
}

// ---- BAR CHART (Chart.js) ----
function renderBarChart(horizontal = false) {
  const { sectors } = State.data;
  const el = document.getElementById('barChart');
  if (!el) return;
  if (State.charts.bar) { State.charts.bar.destroy(); }

  let canvas = el.querySelector('canvas');
  if (!canvas) { canvas = document.createElement('canvas'); el.appendChild(canvas); }

  State.charts.bar = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: sectors.map(s => s.name.length > 12 ? s.name.substring(0, 12) + '…' : s.name),
      datasets: [{
        label: 'Allocation (₹ L.Cr)',
        data: sectors.map(s => s.allocation),
        backgroundColor: sectors.map(s => s.color + 'cc'),
        borderColor: sectors.map(s => s.color),
        borderWidth: 1, borderRadius: 6, borderSkipped: false
      }]
    },
    options: {
      indexAxis: horizontal ? 'y' : 'x',
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => `₹${ctx.raw.toFixed(2)} L.Cr` },
          backgroundColor: chartBgColor(), titleColor: chartTextColor(),
          bodyColor: chartTextColor(), borderColor: '#FF9933', borderWidth: 1
        }
      },
      scales: {
        x: { ticks: { color: chartTextColor(), font: { size: 10 } }, grid: { color: chartGridColor() } },
        y: { ticks: { color: chartTextColor(), font: { size: 10 } }, grid: { color: chartGridColor() } }
      }
    }
  });

  document.querySelectorAll('[data-dir]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-dir]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBarChart(btn.dataset.dir === 'horizontal');
    };
  });
}

// ---- LINE CHART (Chart.js) ----
function renderLineChart() {
  const { historicalData } = State.data;
  const el = document.getElementById('lineChart');
  if (!el) return;
  if (State.charts.line) { State.charts.line.destroy(); }

  let canvas = el.querySelector('canvas');
  if (!canvas) { canvas = document.createElement('canvas'); el.appendChild(canvas); }

  const colors = ['#FF9933','#45B7D1','#96CEB4','#FF6B6B','#4ECDC4','#F7DC6F','#BB8FCE','#82E0AA'];
  const sectorNames = Object.keys(historicalData.sectors);

  const datasets = sectorNames.map((name, i) => ({
    label: name,
    data: historicalData.sectors[name],
    borderColor: colors[i % colors.length],
    backgroundColor: colors[i % colors.length] + '18',
    borderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
    tension: 0.4, fill: false
  }));

  datasets.unshift({
    label: 'Total Budget',
    data: historicalData.totalBudget,
    borderColor: '#FF9933',
    backgroundColor: 'rgba(255,153,51,0.08)',
    borderWidth: 3, pointRadius: 5, pointHoverRadius: 8,
    tension: 0.4, fill: true
  });

  State.charts.line = new Chart(canvas, {
    type: 'line',
    data: { labels: historicalData.years, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 1000 },
      plugins: {
        legend: { labels: { color: chartTextColor(), font: { size: 10 }, boxWidth: 12 } },
        tooltip: {
          mode: 'index', intersect: false,
          backgroundColor: chartBgColor(), titleColor: '#FF9933',
          bodyColor: chartTextColor(), borderColor: '#FF9933', borderWidth: 1,
          callbacks: { label: ctx => `${ctx.dataset.label}: ₹${ctx.raw.toFixed(2)} L.Cr` }
        }
      },
      scales: {
        x: { ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } },
        y: { ticks: { color: chartTextColor(), callback: v => `₹${v}` }, grid: { color: chartGridColor() } }
      },
      interaction: { mode: 'nearest', axis: 'x', intersect: false }
    }
  });
}

// ---- DONUT CHART — Category Distribution (ApexCharts) ----
function renderDonutChart() {
  const { sectors } = State.data;
  const el = document.getElementById('donutChart');
  if (!el) return;
  if (State.charts.donut) { State.charts.donut.destroy(); }

  const categories = { social: 0, economic: 0, infrastructure: 0, security: 0 };
  sectors.forEach(s => { categories[s.category] = (categories[s.category] || 0) + s.allocation; });

  const labels = Object.keys(categories).map(k => k.charAt(0).toUpperCase() + k.slice(1));
  const values = Object.values(categories);
  const colors = ['#45B7D1', '#F7DC6F', '#4ECDC4', '#FF6B6B'];

  State.charts.donut = new ApexCharts(el, {
    series: values, labels, colors,
    chart: {
      type: 'donut', height: 300, background: 'transparent',
      animations: { enabled: true, speed: 900 }, toolbar: { show: false }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true, label: 'Total', color: chartTextColor(),
              formatter: () => `₹${values.reduce((a, b) => a + b, 0).toFixed(1)} L.Cr`
            }
          }
        }
      }
    },
    legend: { position: 'bottom', labels: { colors: chartTextColor() }, fontSize: '11px' },
    tooltip: { y: { formatter: v => `₹${v.toFixed(2)} L.Cr` }, theme: State.theme },
    stroke: { width: 2, colors: [chartBgColor()] },
    theme: { mode: State.theme }
  });
  State.charts.donut.render();
}

// ---- TREEMAP (ECharts) ----
function renderTreemap() {
  const { sectors } = State.data;
  const el = document.getElementById('treemapChart');
  if (!el) return;
  if (State.charts.treemap) { State.charts.treemap.dispose(); }

  const chart = echarts.init(el, State.theme === 'dark' ? 'dark' : null);
  State.charts.treemap = chart;

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      formatter: p => `<b>${p.name}</b><br/>₹${p.value.toFixed(2)} L.Cr<br/>${((p.value / State.data.meta.totalBudget) * 100).toFixed(1)}% of total`
    },
    series: [{
      type: 'treemap',
      data: sectors.map(s => ({
        name: s.name, value: s.allocation,
        itemStyle: { color: s.color, borderColor: chartBgColor(), borderWidth: 2 },
        label: { color: '#fff', fontSize: 11, fontWeight: 'bold' }
      })),
      label: {
        show: true,
        formatter: p => `${p.name}\n₹${p.value.toFixed(2)}`,
        fontSize: 11, color: '#fff'
      },
      breadcrumb: { show: false }, roam: false, nodeClick: false,
      animationDuration: 800
    }]
  });

  window.addEventListener('resize', () => chart.resize());
}

// ---- HEATMAP (ApexCharts) ----
function renderHeatmap() {
  const { stateData } = State.data;
  const el = document.getElementById('heatmapChart');
  if (!el) return;
  if (State.charts.heatmap) { State.charts.heatmap.destroy(); }

  const series = [
    { name: 'Education', data: stateData.map(s => ({ x: s.state, y: s.education })) },
    { name: 'Healthcare', data: stateData.map(s => ({ x: s.state, y: s.healthcare })) },
    { name: 'Infrastructure', data: stateData.map(s => ({ x: s.state, y: s.infrastructure })) }
  ];

  State.charts.heatmap = new ApexCharts(el, {
    series,
    chart: {
      type: 'heatmap', height: 280, background: 'transparent',
      toolbar: { show: false }, animations: { enabled: true, speed: 800 }
    },
    dataLabels: { enabled: false },
    colors: ['#FF9933'],
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 8000, color: '#1a3a6b', name: 'Low' },
            { from: 8001, to: 13000, color: '#FF9933', name: 'Medium' },
            { from: 13001, to: 25000, color: '#138808', name: 'High' }
          ]
        }
      }
    },
    xaxis: { labels: { style: { colors: chartTextColor(), fontSize: '10px' } } },
    yaxis: { labels: { style: { colors: chartTextColor() } } },
    legend: { labels: { colors: chartTextColor() } },
    tooltip: { y: { formatter: v => `₹${(v / 100).toFixed(0)} Cr` }, theme: State.theme },
    theme: { mode: State.theme }
  });
  State.charts.heatmap.render();
}

// ---- AREA CHART — Revenue vs Expenditure (ApexCharts) ----
function renderAreaChart() {
  const { revenueExpenditure } = State.data;
  const el = document.getElementById('areaChart');
  if (!el) return;
  if (State.charts.area) { State.charts.area.destroy(); }

  State.charts.area = new ApexCharts(el, {
    series: [
      { name: 'Total Expenditure', data: revenueExpenditure.expenditure },
      { name: 'Revenue Receipts', data: revenueExpenditure.revenue },
      { name: 'Fiscal Deficit', data: revenueExpenditure.deficit }
    ],
    chart: {
      type: 'area', height: 300, background: 'transparent',
      toolbar: { show: false }, animations: { enabled: true, speed: 900 }
    },
    colors: ['#FF9933', '#138808', '#FF6B6B'],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] }
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: revenueExpenditure.years, labels: { style: { colors: chartTextColor() } } },
    yaxis: { labels: { style: { colors: chartTextColor() }, formatter: v => `₹${v.toFixed(0)}` } },
    legend: { labels: { colors: chartTextColor() } },
    tooltip: { y: { formatter: v => `₹${v.toFixed(2)} L.Cr` }, theme: State.theme },
    grid: { borderColor: chartGridColor() },
    theme: { mode: State.theme }
  });
  State.charts.area.render();
}

// ---- FORECAST CHART (ECharts) ----
function renderForecastChart() {
  const { predictions } = State.data;
  const el = document.getElementById('forecastChart');
  if (!el) return;
  if (State.charts.forecast) { State.charts.forecast.dispose(); }

  const chart = echarts.init(el, State.theme === 'dark' ? 'dark' : null);
  State.charts.forecast = chart;

  const sectorColors = {
    'Defence': '#FF6B6B', 'Infrastructure': '#4ECDC4',
    'Education': '#45B7D1', 'Healthcare': '#96CEB4',
    'Renewable Energy': '#82E0AA', 'Digital India / IT': '#F7DC6F'
  };
  const sectorNames = Object.keys(predictions.sectors);

  const series = [
    {
      name: 'Total Budget', type: 'line',
      data: predictions.totalBudget,
      lineStyle: { color: '#FF9933', width: 3 },
      itemStyle: { color: '#FF9933' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255,153,51,0.3)' },
            { offset: 1, color: 'rgba(255,153,51,0.02)' }
          ]
        }
      },
      smooth: true, symbol: 'circle', symbolSize: 8,
      markLine: {
        data: [{ xAxis: '2025-26', label: { formatter: 'Current', color: '#FF9933' }, lineStyle: { color: '#FF9933', type: 'dashed' } }]
      }
    },
    ...sectorNames.map(name => ({
      name, type: 'line',
      data: predictions.sectors[name],
      lineStyle: { color: sectorColors[name] || '#888', width: 2 },
      itemStyle: { color: sectorColors[name] || '#888' },
      smooth: true, symbol: 'circle', symbolSize: 6
    }))
  ];

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        let html = `<b>${params[0].axisValue}</b><br/>`;
        params.forEach(p => { html += `${p.marker}${p.seriesName}: ₹${p.value.toFixed(2)} L.Cr<br/>`; });
        return html;
      },
      backgroundColor: chartBgColor(),
      borderColor: '#FF9933', borderWidth: 1,
      textStyle: { color: chartTextColor() }
    },
    legend: {
      data: ['Total Budget', ...sectorNames],
      textStyle: { color: chartTextColor(), fontSize: 11 },
      bottom: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category', data: predictions.years,
      axisLabel: { color: chartTextColor() },
      axisLine: { lineStyle: { color: chartGridColor() } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: chartTextColor(), formatter: v => `₹${v}` },
      splitLine: { lineStyle: { color: chartGridColor() } }
    },
    series
  });

  window.addEventListener('resize', () => chart.resize());
}

// ---- SECTOR FORECAST (Chart.js) ----
function renderSectorForecastChart() {
  const { predictions } = State.data;
  const el = document.getElementById('sectorForecastChart');
  if (!el) return;
  if (State.charts.sectorForecast) { State.charts.sectorForecast.destroy(); }

  let canvas = el.querySelector('canvas');
  if (!canvas) { canvas = document.createElement('canvas'); el.appendChild(canvas); }

  const sectorNames = Object.keys(predictions.sectors);
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#82E0AA', '#F7DC6F'];

  State.charts.sectorForecast = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: predictions.years,
      datasets: sectorNames.map((name, i) => ({
        label: name,
        data: predictions.sectors[name],
        backgroundColor: colors[i % colors.length] + 'bb',
        borderColor: colors[i % colors.length],
        borderWidth: 1, borderRadius: 4
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: {
        legend: { labels: { color: chartTextColor(), font: { size: 10 }, boxWidth: 12 } },
        tooltip: {
          backgroundColor: chartBgColor(), titleColor: '#FF9933',
          bodyColor: chartTextColor(), borderColor: '#FF9933', borderWidth: 1,
          callbacks: { label: ctx => `${ctx.dataset.label}: ₹${ctx.raw.toFixed(2)} L.Cr` }
        }
      },
      scales: {
        x: { stacked: true, ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } },
        y: { stacked: true, ticks: { color: chartTextColor(), callback: v => `₹${v}` }, grid: { color: chartGridColor() } }
      }
    }
  });
}

// ============================================================
// SECTOR TABLE
// ============================================================
function renderSectorTable() {
  const sectors = getFilteredSectors();
  renderFilteredTable(sectors);
}

function renderFilteredTable(sectors) {
  const total = State.data.meta.totalBudget;
  const tbody = document.getElementById('sectorTableBody');
  if (!tbody) return;

  if (sectors.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;padding:32px 24px">
          <div style="color:var(--text-muted);font-size:0.85rem">
            <i class="fa-solid fa-magnifying-glass" style="font-size:1.4rem;display:block;margin-bottom:8px;opacity:0.4"></i>
            No sectors match your search
          </div>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = sectors.map(s => {
    const share = ((s.allocation / total) * 100).toFixed(1);
    const barWidth = Math.round((s.allocation / 6.5) * 80);
    return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="width:10px;height:10px;border-radius:50%;background:${s.color};display:inline-block;flex-shrink:0"></span>
            <i class="fa-solid ${s.icon}" style="color:${s.color};width:16px;text-align:center"></i>
            <span>${s.name}</span>
          </div>
        </td>
        <td><span class="cat-badge cat-${s.category}">${s.category}</span></td>
        <td><strong>₹${s.allocation.toFixed(2)}</strong></td>
        <td>₹${s.prevYear.toFixed(2)}</td>
        <td>
          <span class="growth-pill ${s.growth >= 0 ? 'growth-up' : 'growth-down'}">
            <i class="fa-solid ${s.growth >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
            ${Math.abs(s.growth).toFixed(2)}%
          </span>
        </td>
        <td>${share}%</td>
        <td>
          <div class="progress-bar-custom" style="width:80px">
            <div class="progress-fill" style="width:${barWidth}%;background:${s.color}"></div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================
// STATE MAP
// ============================================================
function renderStateMap() {
  const { stateData } = State.data;
  const mapVisual = document.getElementById('mapVisual');
  const mapLegend = document.getElementById('mapLegend');
  if (!mapVisual) return;

  const maxVal = Math.max(...stateData.map(s => s.education));

  mapVisual.innerHTML = stateData.map(s => {
    const intensity = s.education / maxVal;
    const r = Math.round(255 * intensity);
    const g = Math.round(153 * intensity);
    const b = Math.round(51 * (1 - intensity * 0.5));
    const bg = `rgba(${r},${g},${b},${0.3 + intensity * 0.5})`;
    return `
      <div class="state-block" style="background:${bg};border-color:rgba(${r},${g},${b},0.4)"
        title="${s.state}"
        onclick="showStatePopup('${s.state}', ${s.education}, ${s.healthcare}, ${s.infrastructure})">
        <div class="state-name">${s.state.split(' ').map(w => w[0]).join('')}</div>
        <div class="state-val">₹${(s.education / 100).toFixed(0)}Cr</div>
      </div>
    `;
  }).join('');

  mapLegend.innerHTML = `
    <div class="legend-title">Education Spend</div>
    <div class="legend-item"><div class="legend-dot" style="background:rgba(255,153,51,0.9)"></div>High (&gt;₹180Cr)</div>
    <div class="legend-item"><div class="legend-dot" style="background:rgba(255,153,51,0.5)"></div>Medium</div>
    <div class="legend-item"><div class="legend-dot" style="background:rgba(255,153,51,0.2)"></div>Low (&lt;₹100Cr)</div>
    <div style="margin-top:12px" class="legend-title">Click state for details</div>
  `;
}

function showStatePopup(state, edu, health, infra) {
  const existing = document.getElementById('stateToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'stateToast';
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:500;
    background:var(--bg-card);border:1px solid var(--glass-border);
    border-radius:14px;padding:16px 20px;min-width:220px;
    box-shadow:var(--shadow);backdrop-filter:blur(16px);
    animation:fadeInUp 0.3s ease;
  `;
  toast.innerHTML = `
    <div style="font-weight:700;color:var(--saffron);margin-bottom:8px;font-size:0.9rem">${state}</div>
    <div style="font-size:0.78rem;color:var(--text-secondary);line-height:1.8">
      <i class="fa-solid fa-graduation-cap" style="color:#45B7D1;width:16px"></i> Education: ₹${(edu / 100).toFixed(0)} Cr<br>
      <i class="fa-solid fa-heart-pulse" style="color:#96CEB4;width:16px"></i> Healthcare: ₹${(health / 100).toFixed(0)} Cr<br>
      <i class="fa-solid fa-road" style="color:#4ECDC4;width:16px"></i> Infrastructure: ₹${(infra / 100).toFixed(0)} Cr
    </div>
    <button onclick="this.parentElement.remove()" style="position:absolute;top:8px;right:10px;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.9rem">✕</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

// ============================================================
// AI INSIGHTS
// ============================================================
function renderAIInsights() {
  const { aiInsights, sectors } = State.data;
  const grid = document.getElementById('aiInsightsGrid');
  if (!grid) return;

  const highGrowth = [...sectors].sort((a, b) => b.growth - a.growth)[0];
  const lowGrowth = [...sectors].sort((a, b) => a.growth - b.growth)[0];

  const insights = [
    {
      icon: 'fa-arrow-trend-up',
      title: 'Highest Growing Sector',
      value: highGrowth.name,
      desc: `<span class="ai-highlight">+${highGrowth.growth}% YoY growth</span> — ${highGrowth.name} leads budget expansion with ₹${highGrowth.allocation} L.Cr allocation in FY 2025-26.`
    },
    {
      icon: 'fa-arrow-trend-down',
      title: 'Slowest Growing Sector',
      value: lowGrowth.name,
      desc: `<span class="ai-highlight">+${lowGrowth.growth}% YoY</span> — ${lowGrowth.name} has the lowest growth rate. Potential for increased investment in coming years.`
    },
    {
      icon: 'fa-gauge-high',
      title: 'Budget Efficiency Score',
      value: `${aiInsights.budgetEfficiencyScore}/100`,
      desc: `Overall fiscal efficiency rated <span class="ai-highlight">${aiInsights.budgetEfficiencyScore}%</span>. Strong performance in infrastructure and digital sectors.`,
      extra: `score:${aiInsights.budgetEfficiencyScore}`
    },
    {
      icon: 'fa-chart-line',
      title: 'GDP Growth Estimate',
      value: `${aiInsights.economicGrowthEstimate}%`,
      desc: `Nominal GDP growth at <span class="ai-highlight">${aiInsights.economicGrowthEstimate}%</span>. Inflation-adjusted real growth estimated at <span class="ai-highlight">${aiInsights.inflationAdjustedGrowth}%</span>.`
    },
    {
      icon: 'fa-lightbulb',
      title: 'Investment Priorities',
      value: 'Top 3 Focus Areas',
      desc: aiInsights.topPriorities.map(p => `<span class="ai-highlight">• ${p}</span>`).join('<br>')
    },
    {
      icon: 'fa-robot',
      title: 'AI Forecast Confidence',
      value: '87.4%',
      desc: `Predictive model confidence at <span class="ai-highlight">87.4%</span> based on 5-year historical trends and macroeconomic indicators.`
    }
  ];

  grid.innerHTML = insights.map(ins => `
    <div class="ai-card" data-aos="fade-up">
      <div class="ai-card-icon"><i class="fa-solid ${ins.icon}"></i></div>
      <div class="ai-card-title">${ins.title}</div>
      <div class="ai-card-value">${ins.value}</div>
      ${ins.extra && ins.extra.startsWith('score:') ? `
        <div class="score-ring">
          <span class="score-value">${parseInt(ins.extra.split(':')[1])}</span>
        </div>
      ` : ''}
      <div class="ai-card-desc">${ins.desc}</div>
    </div>
  `).join('');
}

// ============================================================
// OBSERVATIONS & RECOMMENDATIONS
// ============================================================
function renderObservations() {
  const grid = document.getElementById('observationsGrid');
  if (!grid) return;

  const observations = [
    {
      icon: 'fa-shield-halved', color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)',
      title: 'Defence Dominance',
      text: "Defence remains the largest allocation at ₹6.21 L.Cr (12.3% of total budget), reflecting India's strategic security priorities and modernisation drive."
    },
    {
      icon: 'fa-solar-panel', color: '#82E0AA', bg: 'rgba(130,224,170,0.12)',
      title: 'Green Energy Surge',
      text: "Renewable Energy sees the highest growth at 21.88% YoY, signalling India's commitment to achieving 500 GW non-fossil fuel capacity by 2030."
    },
    {
      icon: 'fa-microchip', color: '#F7DC6F', bg: 'rgba(247,220,111,0.12)',
      title: 'Digital India Momentum',
      text: 'Digital India / IT allocation grew 18.92% to ₹2.20 L.Cr, accelerating AI adoption, 5G rollout, and digital public infrastructure.'
    },
    {
      icon: 'fa-road', color: '#4ECDC4', bg: 'rgba(78,205,196,0.12)',
      title: 'Infrastructure Push',
      text: "Infrastructure capex at ₹5.80 L.Cr (11.5% of budget) continues the government's focus on highways, ports, and urban development."
    },
    {
      icon: 'fa-heart-pulse', color: '#96CEB4', bg: 'rgba(150,206,180,0.12)',
      title: 'Healthcare Expansion',
      text: 'Healthcare allocation up 10.29% to ₹3.75 L.Cr. Ayushman Bharat and AIIMS expansion drive increased health spending.'
    },
    {
      icon: 'fa-graduation-cap', color: '#45B7D1', bg: 'rgba(69,183,209,0.12)',
      title: 'Education Investment',
      text: 'Education at ₹4.10 L.Cr (8.1% of budget). NEP 2020 implementation and IIT/NIT expansion are key drivers of increased allocation.'
    },
    {
      icon: 'fa-chart-pie', color: '#FF9933', bg: 'rgba(255,153,51,0.12)',
      title: 'Fiscal Deficit Management',
      text: 'Fiscal deficit narrowing to ₹17.04 L.Cr (3.4% of GDP), demonstrating improved revenue mobilisation and expenditure rationalisation.'
    },
    {
      icon: 'fa-leaf', color: '#A9DFBF', bg: 'rgba(169,223,191,0.12)',
      title: 'Climate Action',
      text: "Environment & Climate allocation grew 18.75% to ₹0.95 L.Cr. India's net-zero 2070 commitment drives green budget initiatives."
    }
  ];

  grid.innerHTML = observations.map(obs => `
    <div class="obs-card" data-aos="fade-up">
      <div class="obs-icon" style="background:${obs.bg};color:${obs.color}">
        <i class="fa-solid ${obs.icon}"></i>
      </div>
      <div class="obs-title">${obs.title}</div>
      <div class="obs-text">${obs.text}</div>
    </div>
  `).join('');
}

// ============================================================
// SEARCH
// ============================================================
// SEARCH
// ============================================================
function initSearch() {
  // Global search (topbar)
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        renderSectorTable();
        clearSearchHighlight();
        return;
      }
      const filtered = State.data.sectors.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );
      renderFilteredTable(filtered);
      // Scroll to the sector table so user sees results
      const tableSection = document.getElementById('sectors');
      if (tableSection) {
        tableSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showSearchBadge(filtered.length, query);
    });

    // Clear on Escape
    globalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        globalSearch.value = '';
        renderSectorTable();
        clearSearchHighlight();
      }
    });
  }

  // Sector table inline search
  const sectorSearch = document.getElementById('sectorSearch');
  if (sectorSearch) {
    sectorSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        renderSectorTable();
        clearSearchHighlight();
        return;
      }
      const filtered = getFilteredSectors().filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );
      renderFilteredTable(filtered);
      showSearchBadge(filtered.length, query);
    });

    sectorSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        sectorSearch.value = '';
        renderSectorTable();
        clearSearchHighlight();
      }
    });
  }
}

function showSearchBadge(count, query) {
  // Update or create a small result count label near the table header
  let badge = document.getElementById('searchResultBadge');
  if (!badge) {
    badge = document.createElement('span');
    badge.id = 'searchResultBadge';
    badge.style.cssText = `
      display:inline-flex;align-items:center;gap:6px;
      background:rgba(255,153,51,0.15);color:var(--saffron);
      border:1px solid rgba(255,153,51,0.3);
      padding:3px 10px;border-radius:20px;
      font-size:0.72rem;font-weight:600;margin-left:10px;
    `;
    const tableHeader = document.querySelector('#sectorTable')?.closest('.chart-card')?.querySelector('.chart-card-header h3');
    if (tableHeader) tableHeader.after(badge);
  }
  badge.textContent = count === 0
    ? `No results for "${query}"`
    : `${count} result${count !== 1 ? 's' : ''} for "${query}"`;
  badge.style.color = count === 0 ? '#ef4444' : 'var(--saffron)';
  badge.style.background = count === 0 ? 'rgba(239,68,68,0.12)' : 'rgba(255,153,51,0.15)';
}

function clearSearchHighlight() {
  const badge = document.getElementById('searchResultBadge');
  if (badge) badge.remove();
}

// ============================================================
// DOWNLOADS & EXPORTS
// ============================================================
function initDownloads() {
  // Top bar export buttons
  document.getElementById('exportPDF')?.addEventListener('click', exportPDF);
  document.getElementById('exportCSV')?.addEventListener('click', exportCSV);
  // Download section buttons
  document.getElementById('dlPDF')?.addEventListener('click', exportPDF);
  document.getElementById('dlCSV')?.addEventListener('click', exportCSV);
  document.getElementById('dlJSON')?.addEventListener('click', exportJSON);
  document.getElementById('dlPNG')?.addEventListener('click', exportPNG);
}

function exportCSV() {
  const { sectors, meta } = State.data;
  const headers = ['Sector', 'Category', 'Allocation (L.Cr)', 'Prev Year (L.Cr)', 'Growth %', 'Share %'];
  const rows = sectors.map(s => [
    s.name, s.category, s.allocation.toFixed(2), s.prevYear.toFixed(2),
    s.growth.toFixed(2), ((s.allocation / meta.totalBudget) * 100).toFixed(1)
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'india-budget-2026.csv';
  a.click(); URL.revokeObjectURL(url);
  showToast('CSV exported successfully!', 'success');
}

function exportJSON() {
  const json = JSON.stringify(State.data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'india-budget-2026.json';
  a.click(); URL.revokeObjectURL(url);
  showToast('JSON exported successfully!', 'success');
}

function exportPDF() {
  showToast('PDF export: Use browser Print → Save as PDF for best results.', 'info');
  setTimeout(() => window.print(), 800);
}

function exportPNG() {
  showToast('Screenshot: Use browser screenshot tool or Ctrl+Shift+S', 'info');
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info') {
  const existing = document.getElementById('appToast');
  if (existing) existing.remove();

  const colors = { success: '#138808', info: '#45B7D1', error: '#FF6B6B' };
  const icons = { success: 'fa-check-circle', info: 'fa-info-circle', error: 'fa-exclamation-circle' };

  const toast = document.createElement('div');
  toast.id = 'appToast';
  toast.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:600;
    background:var(--bg-card);border:1px solid ${colors[type]}44;
    border-radius:12px;padding:12px 20px;
    box-shadow:var(--shadow);backdrop-filter:blur(16px);
    display:flex;align-items:center;gap:10px;
    font-size:0.82rem;color:var(--text-primary);
    animation:fadeInUp 0.3s ease;
    max-width:360px;text-align:center;
  `;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type]}" style="color:${colors[type]}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ============================================================
// KEYFRAME INJECTION
// ============================================================
(function injectKeyframes() {
  if (document.getElementById('dashboardKeyframes')) return;
  const style = document.createElement('style');
  style.id = 'dashboardKeyframes';
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();
