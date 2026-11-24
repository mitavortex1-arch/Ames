
import "./style.css";

const app = document.querySelector("#app");

const stages = [
  "BLUEPRINT",
  "ENGINEERING",
  "BUILDOUT",
  "VALIDATION",
  "DEPLOYMENT",
  "OPERATIONS",
  "REPLICATION",
  "COMMERCIALIZATION"
];

const state = {
  activeView: "overview",
  selectedProject: 0,
  projects: [
    {
      id: 427,
      name: "VENOM SOFTWARE FACTORY",
      sector: "TECHNOLOGY",
      stage: 2,
      status: "IN DEVELOPMENT",
      progress: 38,
      owner: "SHELBY PREDATOR",
      description: "Enterprise software architecture and factory development."
    },
    {
      id: 428,
      name: "AMERICAN MUSCLE PLATFORM",
      sector: "ENTERPRISE SYSTEMS",
      stage: 0,
      status: "BLUEPRINT",
      progress: 10,
      owner: "AMES",
      description: "Commercial enterprise lifecycle platform."
    },
    {
      id: 429,
      name: "INDUSTRIAL REPLICATION MODEL",
      sector: "MANUFACTURING",
      stage: 1,
      status: "ENGINEERING",
      progress: 22,
      owner: "AMER CO.",
      description: "A repeatable factory and production architecture."
    }
  ],
  activities: [
    { time: "10:42:18", text: "AMES lifecycle framework initialized", type: "SYSTEM" },
    { time: "10:38:04", text: "VENOM Software Factory registered", type: "PROJECT" },
    { time: "10:31:52", text: "Enterprise Blueprint framework loaded", type: "BLUEPRINT" },
    { time: "10:24:11", text: "Governance and approval gates established", type: "GOVERNANCE" }
  ],
  gates: [
    { name: "Blueprint authorization", status: "APPROVED" },
    { name: "Engineering review", status: "PENDING" },
    { name: "Buildout authorization", status: "LOCKED" },
    { name: "Validation approval", status: "LOCKED" }
  ]
};

function log(text, type = "SYSTEM") {
  state.activities.unshift({
    time: new Date().toLocaleTimeString("en-US", { hour12: false }),
    text,
    type
  });
  state.activities = state.activities.slice(0, 12);
}

function selectedProject() {
  return state.projects.find(p => p.id === state.selectedProject) || state.projects[0];
}

function navigate(view) {
  state.activeView = view;
  render();
}

function sidebar() {
  const items = [
    ["overview", "⌂", "Enterprise Overview"],
    ["blueprint", "◈", "Enterprise Blueprint"],
    ["buildout", "⚙", "Enterprise Buildout"],
    ["operations", "▦", "Enterprise Operations"],
    ["replication", "⟳", "Enterprise Replication"],
    ["projects", "▤", "Project Portfolio"],
    ["governance", "◇", "Governance Center"],
    ["network", "⬡", "Enterprise Network"],
    ["ledger", "≡", "Activity Ledger"]
  ];

  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">A</div>
        <div>
          <div class="brand-name">AMES</div>
          <div class="brand-sub">AMERICAN MUSCLE SYSTEMS</div>
        </div>
      </div>

      <div class="side-section">ENTERPRISE CONTROL</div>

      ${items.map(([id, icon, label]) => `
        <button class="nav-item ${state.activeView === id ? "active" : ""}" data-view="${id}">
          <span class="nav-icon">${icon}</span>
          <span>${label}</span>
          ${state.activeView === id ? '<span class="nav-indicator"></span>' : ""}
        </button>
      `).join("")}

      <div class="sidebar-bottom">
        <div class="online-line"><span class="status-dot"></span> AMES CORE ONLINE</div>
        <div class="sidebar-version">PLATFORM VERSION 1.0.0</div>
        <div class="sidebar-version">THE AMERICAN MUSCLE STANDARD</div>
      </div>
    </aside>
  `;
}

function header() {
  return `
    <header class="topbar">
      <div>
        <div class="breadcrumb">AMERICAN MUSCLE / ENTERPRISE SYSTEMS / <strong>AMES</strong></div>
        <div class="top-heading">ENTERPRISE LIFECYCLE CONTROL PLATFORM</div>
      </div>
      <div class="top-controls">
        <div class="status-pill"><span class="status-dot"></span> PLATFORM OPERATIONAL</div>
        <div class="clock" id="clock"></div>
      </div>
    </header>
  `;
}

function metric(label, value, unit, symbol) {
  return `
    <div class="metric-card">
      <div class="metric-top">
        <span>${label}</span>
        <span class="metric-symbol">${symbol}</span>
      </div>
      <div class="metric-value">${value}<small>${unit}</small></div>
      <div class="metric-foot"><span class="status-dot"></span> PLATFORM REGISTER</div>
    </div>
  `;
}

function pillar(number, name, subtitle, description, icon, view) {
  return `
    <button class="pillar-card" data-view="${view}">
      <div class="pillar-top">
        <span class="pillar-number">${number}</span>
        <span class="pillar-icon">${icon}</span>
      </div>
      <h3>${name}</h3>
      <div class="pillar-subtitle">${subtitle}</div>
      <p>${description}</p>
      <div class="pillar-link">OPEN PILLAR <span>→</span></div>
    </button>
  `;
}

function projectRows() {
  return `
    <div class="project-table">
      <div class="project-table-head">
        <span>ENTERPRISE / PROJECT</span>
        <span>SECTOR</span>
        <span>CURRENT STAGE</span>
        <span>PROGRESS</span>
      </div>
      ${state.projects.map(project => `
        <button class="project-row" data-project="${project.id}">
          <span class="project-name">
            <strong>${project.name}</strong>
            <small>PROJECT #${project.id}</small>
          </span>
          <span class="project-sector">${project.sector}</span>
          <span class="project-stage">${stages[project.stage]}</span>
          <span class="project-progress">
            <span class="mini-track"><span style="width:${project.progress}%"></span></span>
            <small>${project.progress}%</small>
          </span>
        </button>
      `).join("")}
    </div>
  `;
}

function activityRows(count = 5) {
  return `
    <div class="activity-list">
      ${state.activities.slice(0, count).map(item => `
        <div class="activity-row">
          <span class="activity-time">${item.time}</span>
          <span class="activity-text">${item.text}</span>
          <span class="activity-type">${item.type}</span>
        </div>
      `).join("") || '<div class="empty-state">NO ACTIVITY RECORDED</div>'}
    </div>
  `;
}

function lifecycle() {
  return `
    <div class="lifecycle">
      ${stages.map((stage, i) => `
        <div class="lifecycle-step">
          <div class="step-circle ${i < selectedProject().stage ? "complete" : i === selectedProject().stage ? "current" : ""}">
            ${i < selectedProject().stage ? "✓" : String(i + 1).padStart(2, "0")}
          </div>
          <div class="step-name">${stage}</div>
          ${i < stages.length - 1 ? '<div class="step-line"></div>' : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function overview() {
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="eyebrow"><span></span> AMERICAN MUSCLE ENTERPRISE SYSTEMS</div>
        <h1>BUILD THE<br><span>ENTERPRISE.</span></h1>
        <p>
          One methodology. Four pillars. An integrated enterprise lifecycle.
          From initial blueprint to commercial replication.
        </p>
        <div class="hero-actions">
          <button class="primary-button" data-view="projects">OPEN PROJECT PORTFOLIO →</button>
          <button class="secondary-button" data-view="blueprint">EXPLORE FRAMEWORK</button>
        </div>
      </div>

      <div class="hero-graphic">
        <div class="graphic-ring ring-one"></div>
        <div class="graphic-ring ring-two"></div>
        <div class="graphic-ring ring-three"></div>
        <div class="graphic-center">
          <div class="center-top">AMERICAN MUSCLE</div>
          <div class="center-main">AMES</div>
          <div class="center-bottom">ENTERPRISE SYSTEMS</div>
        </div>
        <div class="graphic-label gl-one">DESIGN</div>
        <div class="graphic-label gl-two">BUILD</div>
        <div class="graphic-label gl-three">OPERATE</div>
        <div class="graphic-label gl-four">REPLICATE</div>
      </div>
    </section>

    <section class="metrics-grid">
      ${metric("REGISTERED PROJECTS", state.projects.length, "PROJECTS", "▤")}
      ${metric("LIFECYCLE STAGES", stages.length, "STAGES", "◈")}
      ${metric("CORE PILLARS", 4, "PILLARS", "⬡")}
      ${metric("ACTIVE FRAMEWORK", "AMES", "CORE", "A")}
    </section>

    <section class="section-heading">
      <div>
        <div class="eyebrow">THE AMES METHODOLOGY</div>
        <h2>FOUR PILLARS. ONE ENTERPRISE.</h2>
      </div>
      <span class="section-code">FRAMEWORK / 001</span>
    </section>

    <section class="pillar-grid">
      ${pillar("01", "ENTERPRISE BLUEPRINT", "DESIGN THE ENTERPRISE", "Define the business model, architecture, products, systems, and operating structure.", "◈", "blueprint")}
      ${pillar("02", "ENTERPRISE BUILDOUT", "CONSTRUCT THE SYSTEM", "Coordinate engineering, software, infrastructure, manufacturing, and integration.", "⚙", "buildout")}
      ${pillar("03", "ENTERPRISE OPERATIONS", "RUN THE ENTERPRISE", "Monitor performance, manage workflows, improve processes, and maintain quality.", "▦", "operations")}
      ${pillar("04", "ENTERPRISE REPLICATION", "REPRODUCE THE MODEL", "Package proven systems, standards, training, licensing, and deployment methods.", "⟳", "replication")}
    </section>

    <section class="section-heading">
      <div>
        <div class="eyebrow">ENTERPRISE DEVELOPMENT</div>
        <h2>ACTIVE PROJECT PORTFOLIO</h2>
      </div>
      <button class="text-button" data-view="projects">VIEW PORTFOLIO →</button>
    </section>

    <section class="panel portfolio-panel">
      ${projectRows()}
    </section>

    <section class="bottom-grid">
      <div class="panel">
        <div class="panel-heading">
          <div><div class="eyebrow">LIFECYCLE FRAMEWORK</div><h2>THE ENTERPRISE JOURNEY</h2></div>
          <span class="gold-tag">8 STAGES</span>
        </div>
        ${lifecycle()}
      </div>
      <div class="panel">
        <div class="panel-heading">
          <div><div class="eyebrow">PLATFORM RECORD</div><h2>RECENT ACTIVITY</h2></div>
          <button class="text-button" data-view="ledger">VIEW ALL →</button>
        </div>
        ${activityRows(4)}
      </div>
    </section>
  `;
}

function pillarPage(number, title, subtitle, description, capabilities, next) {
  return `
    <div class="page-heading">
      <div class="eyebrow">AMES METHODOLOGY / PILLAR ${number}</div>
      <h1>${title}</h1>
      <p>${description}</p>
    </div>

    <div class="pillar-hero">
      <div>
        <div class="eyebrow">${subtitle}</div>
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
      <div class="pillar-big-number">${number}</div>
    </div>

    <div class="section-heading">
      <div><div class="eyebrow">CAPABILITY REGISTER</div><h2>CORE FUNCTIONS</h2></div>
    </div>

    <div class="capability-grid">
      ${capabilities.map((cap, i) => `
        <div class="panel capability-card">
          <span class="capability-index">CAPABILITY 0${i + 1}</span>
          <h3>${cap[0]}</h3>
          <p>${cap[1]}</p>
        </div>
      `).join("")}
    </div>

    <div class="panel next-panel">
      <div><div class="eyebrow">LIFECYCLE CONTINUITY</div><h2>NEXT: ${next}</h2></div>
      <button class="primary-button" data-view="${next.toLowerCase().replace(" ", "")}">OPEN NEXT PILLAR →</button>
    </div>
  `;
}

function blueprintView() {
  return pillarPage("01", "ENTERPRISE BLUEPRINT", "DESIGN THE ENTERPRISE",
    "The blueprint pillar transforms a business concept into a defined enterprise architecture. It establishes what the enterprise is, what it delivers, how it operates, and what it requires.",
    [
      ["Business Architecture", "Define the business model, value proposition, markets, customers, and commercial structure."],
      ["Enterprise Architecture", "Map organizational layers, systems, departments, data flows, and responsibilities."],
      ["Product Architecture", "Define products, services, platforms, interfaces, and supporting capabilities."],
      ["Technology Architecture", "Identify software, hardware, cloud, APIs, infrastructure, and integration requirements."],
      ["Financial Architecture", "Establish budgets, capital requirements, revenue models, cost structures, and financial controls."],
      ["Governance Architecture", "Define authority, human approval, risk controls, compliance requirements, and decision rights."]
    ], "BUILDOUT");
}

function buildoutView() {
  return pillarPage("02", "ENTERPRISE BUILDOUT", "CONSTRUCT THE SYSTEM",
    "The buildout pillar turns the approved blueprint into a functioning enterprise through coordinated engineering, development, manufacturing, integration, and implementation.",
    [
      ["Engineering & Development", "Translate approved designs into technical specifications, products, and working systems."],
      ["Software & Infrastructure", "Develop applications, platforms, networks, databases, and deployment environments."],
      ["Manufacturing & Production", "Coordinate physical production, facilities, equipment, materials, and suppliers."],
      ["Systems Integration", "Connect enterprise systems, APIs, data pipelines, services, and operational workflows."],
      ["Quality Assurance", "Test functionality, performance, reliability, security, and conformance to requirements."],
      ["Implementation", "Prepare the organization, resources, personnel, and systems for operational launch."]
    ], "OPERATIONS");
}

function operationsView() {
  return pillarPage("03", "ENTERPRISE OPERATIONS", "RUN THE ENTERPRISE",
    "The operations pillar manages the functioning enterprise. It monitors performance, coordinates resources, maintains quality, and creates a continuous improvement cycle.",
    [
      ["Command & Control", "Coordinate operational activity, decision-making, accountability, and human oversight."],
      ["Workflow Management", "Manage processes, tasks, dependencies, approvals, and operating procedures."],
      ["Performance Intelligence", "Measure output, quality, efficiency, financial performance, and service delivery."],
      ["Resource Management", "Monitor staffing, equipment, inventory, infrastructure, and operating capacity."],
      ["Risk & Compliance", "Track operational risk, control requirements, exceptions, and corrective actions."],
      ["Continuous Improvement", "Capture operational feedback and translate it into approved system improvements."]
    ], "REPLICATION");
}

function replicationView() {
  return pillarPage("04", "ENTERPRISE REPLICATION", "REPRODUCE THE MODEL",
    "The replication pillar converts a proven enterprise into a repeatable model. It packages the architecture, technology, training, standards, and commercial rights needed to deploy it elsewhere.",
    [
      ["Replication Blueprint", "Create standardized enterprise templates and deployment specifications."],
      ["Factory Replication", "Reproduce validated production systems, workflows, and operating infrastructure."],
      ["Training & Certification", "Prepare teams and partners to operate the replicated enterprise to defined standards."],
      ["Licensing & Intellectual Property", "Manage commercial rights, intellectual property, and authorized use of enterprise systems."],
      ["Deployment Partnerships", "Coordinate qualified partners, suppliers, implementation teams, and distribution channels."],
      ["Commercialization", "Package, price, position, sell, and support the enterprise model in external markets."]
    ], "PROJECTS");
}

function projectsView() {
  return `
    <div class="page-heading">
      <div class="eyebrow">ENTERPRISE DEVELOPMENT REGISTER</div>
      <h1>PROJECT <span>PORTFOLIO</span></h1>
      <p>Track enterprise concepts through the AMES lifecycle.</p>
    </div>

    <div class="portfolio-toolbar">
      <div><div class="eyebrow">REGISTERED ENTERPRISES</div><h2>${state.projects.length} PROJECTS IN THE REGISTER</h2></div>
      <button class="primary-button" data-action="new-project">+ CREATE PROJECT</button>
    </div>

    <div class="panel portfolio-panel">
      ${projectRows()}
    </div>

    ${projectDetail()}
  `;
}

function projectDetail() {
  const p = selectedProject();
  if (!p) return "";

  return `
    <div class="panel detail-panel">
      <div class="panel-heading">
        <div><div class="eyebrow">SELECTED PROJECT / #${p.id}</div><h2>${p.name}</h2></div>
        <span class="gold-tag">${p.status}</span>
      </div>
      <p class="body-copy">${p.description}</p>
      <div class="detail-stats">
        <div><span>SECTOR</span><strong>${p.sector}</strong></div>
        <div><span>PROJECT OWNER</span><strong>${p.owner}</strong></div>
        <div><span>CURRENT STAGE</span><strong>${stages[p.stage]}</strong></div>
        <div><span>PROGRESS</span><strong>${p.progress}%</strong></div>
      </div>
      <div class="detail-track"><div style="width:${p.progress}%"></div></div>
      <div class="detail-actions">
        <button class="primary-button" data-action="advance">ADVANCE LIFECYCLE STAGE →</button>
        <span class="approval-note">Stage advancement is a local demonstration action.</span>
      </div>
    </div>
  `;
}

function governanceView() {
  return `
    <div class="page-heading">
      <div class="eyebrow">ENTERPRISE CONTROL FRAMEWORK</div>
      <h1>GOVERNANCE <span>CENTER</span></h1>
      <p>Approval gates, decision authority, and enterprise-level control.</p>
    </div>
    <div class="metrics-grid">
      ${metric("APPROVAL GATES", state.gates.length, "GATES", "◇")}
      ${metric("APPROVED", state.gates.filter(g => g.status === "APPROVED").length, "GATES", "✓")}
      ${metric("PENDING", state.gates.filter(g => g.status === "PENDING").length, "GATES", "◷")}
      ${metric("LOCKED", state.gates.filter(g => g.status === "LOCKED").length, "GATES", "▣")}
    </div>
    <div class="panel">
      <div class="panel-heading"><div><div class="eyebrow">AUTHORIZATION REGISTER</div><h2>ENTERPRISE DECISION GATES</h2></div><span class="gold-tag">HUMAN CONTROL</span></div>
      ${state.gates.map((gate, i) => `
        <div class="gate-row">
          <div><span class="gate-number">GATE 0${i + 1}</span><strong>${gate.name}</strong></div>
          <span class="gate-status ${gate.status.toLowerCase()}">${gate.status}</span>
          ${gate.status === "PENDING" ? `<button class="small-button" data-gate="${i}">APPROVE</button>` : ""}
        </div>
      `).join("")}
    </div>
    <div class="panel governance-note">
      <div class="eyebrow">CORE GOVERNANCE PRINCIPLE</div>
      <h2>NO UNAUTHORIZED ADVANCEMENT.</h2>
      <p class="body-copy">Enterprise decisions remain subject to designated human authority. Automated tools can support analysis and coordination but cannot independently approve real-world business decisions.</p>
    </div>
  `;
}

function networkView() {
  const nodes = [
    ["AMES", "Lifecycle methodology", "PLATFORM OWNER"],
    ["AMER CO.", "Internal production engine", "EXECUTION"],
    ["AMR", "Factory command interface", "CONTROL"],
    ["ENTERPRISE FACTORIES", "Distributed execution units", "DEPLOYMENT"]
  ];

  return `
    <div class="page-heading">
      <div class="eyebrow">AMERICAN MUSCLE ARCHITECTURE</div>
      <h1>ENTERPRISE <span>NETWORK</span></h1>
      <p>The relationship between the methodology, internal production engine, and factory command interface.</p>
    </div>

    <div class="network-stack">
      ${nodes.map((node, i) => `
        <div class="network-node">
          <div class="network-index">0${i + 1}</div>
          <div><h2>${node[0]}</h2><p>${node[1]}</p></div>
          <span>${node[2]}</span>
        </div>
        ${i < nodes.length - 1 ? '<div class="network-connector">↓</div>' : ""}
      `).join("")}
    </div>

    <div class="panel">
      <div class="eyebrow">ARCHITECTURE RULE</div>
      <h2>SEPARATION OF RESPONSIBILITY</h2>
      <p class="body-copy">AMES owns the lifecycle methodology and external commercialization platform. AMER Co. executes internal enterprise construction and replication. AMR coordinates factory operations within AMER's policies, permissions, and human approval requirements.</p>
    </div>
  `;
}

function ledgerView() {
  return `
    <div class="page-heading">
      <div class="eyebrow">ENTERPRISE RECORDKEEPING</div>
      <h1>ACTIVITY <span>LEDGER</span></h1>
      <p>Local demonstration record of platform events and project activity.</p>
    </div>
    <div class="panel">
      <div class="panel-heading"><div><div class="eyebrow">SYSTEM REGISTER</div><h2>EVENT HISTORY</h2></div><span class="gold-tag">LOCAL DEMO</span></div>
      ${activityRows(12)}
      <button class="secondary-button" data-action="clear">CLEAR LOCAL ACTIVITY</button>
    </div>
  `;
}

function content() {
  const views = {
    overview,
    blueprint: blueprintView,
    buildout: buildoutView,
    operations: operationsView,
    replication: replicationView,
    projects: projectsView,
    governance: governanceView,
    network: networkView,
    ledger: ledgerView
  };

  return (views[state.activeView] || overview)();
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => navigate(button.dataset.view));
  });

  document.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedProject = Number(button.dataset.project);
      state.activeView = "projects";
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;

      if (action === "new-project") {
        const name = prompt("Enter the new enterprise or project name:");
        if (!name || !name.trim()) return;

        const project = {
          id: 430 + state.projects.length,
          name: name.trim().toUpperCase(),
          sector: "UNASSIGNED",
          stage: 0,
          status: "BLUEPRINT",
          progress: 5,
          owner: "AMES",
          description: "New enterprise project registered in the AMES portfolio."
        };

        state.projects.push(project);
        state.selectedProject = project.id;
        log(`New project registered: ${project.name}`, "PROJECT");
        render();
      }

      if (action === "advance") {
        const p = selectedProject();
        if (p.stage >= stages.length - 1) {
          alert("This project has reached the final lifecycle stage.");
          return;
        }

        const nextStage = stages[p.stage + 1];
        const gate = state.gates.find(g => g.status === "PENDING");

        if (p.stage >= 1 && gate) {
          alert("A pending governance gate must be reviewed before further advancement.");
          return;
        }

        p.stage++;
        p.progress = Math.min(100, Math.round(((p.stage + 1) / stages.length) * 100));
        p.status = p.stage === 0 ? "BLUEPRINT" : "IN DEVELOPMENT";
        log(`${p.name} advanced to ${nextStage}`, "PROJECT");
        render();
      }

      if (action === "clear") {
        state.activities = [];
        render();
      }
    });
  });

  document.querySelectorAll("[data-gate]").forEach(button => {
    button.addEventListener("click", () => {
      const gate = state.gates[Number(button.dataset.gate)];
      gate.status = "APPROVED";
      log(`${gate.name} approved by demo operator`, "GOVERNANCE");
      render();
    });
  });
}

function updateClock() {
  const clock = document.getElementById("clock");
  if (clock) {
    clock.textContent = new Date().toLocaleTimeString("en-US", { hour12: false });
  }
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      ${sidebar()}
      <main class="main-area">
        ${header()}
        <div class="page-content">
          ${content()}
        </div>
        <footer class="footer">
          <span>AMERICAN MUSCLE ENTERPRISE SYSTEMS</span>
          <span>THE AMERICAN MUSCLE STANDARD</span>
          <span>AMES PLATFORM / 2026</span>
        </footer>
      </main>
    </div>
  `;

  bindEvents();
  updateClock();
}

render();
setInterval(updateClock, 1000);

