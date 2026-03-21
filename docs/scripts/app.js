const section = (kicker, title, body = "") => `
  <div class="section-header">
    <p class="section-kicker">${kicker}</p>
    <h2 class="section-title">${title}</h2>
  </div>
  ${body}
`;

const paragraphs = (items) => `
  <div class="section-copy">
    ${items.map((item) => `<p>${item}</p>`).join("")}
  </div>
`;

const chipList = (items, className = "chip-list") => `
  <div class="${className}">
    ${items.map((item) => `<span>${item}</span>`).join("")}
  </div>
`;

const findStatValue = (stats, match) =>
  stats.find((item) => item.label.toLowerCase().includes(match.toLowerCase()))?.value ?? "";

const membershipSummary = (membership, tag) =>
  membership.find((item) => item.tag === tag) ?? { title: "", copy: "" };

const renderHero = (site, administration, support, plan) => {
  const heroRoot = document.querySelector("#hero");
  const informedMembers = findStatValue(administration.stats, "socios informados");

  heroRoot.innerHTML = `
    <article class="hero-card">
      <div class="hero-mark">
        <img src="./favicon.svg" alt="Isotipo Liga Protectora de Estudiantes de Quilpué" />
      </div>
      <span class="eyebrow">${site.heroTag}</span>
      <h1 class="hero-title">${site.heroTitle}</h1>
      <p class="hero-summary">${site.heroSummary}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="${site.heroPrimaryCta.href}">${site.heroPrimaryCta.label}</a>
        <a class="button button-secondary" href="${site.heroSecondaryCta.href}">${site.heroSecondaryCta.label}</a>
      </div>
    </article>
    <aside class="hero-stats">
      <article class="hero-stat">
        <span class="hero-stat-label">Cobertura 2025</span>
        <strong>${support.items.length} establecimientos</strong>
      </article>
      <article class="hero-stat">
        <span class="hero-stat-label">Líneas de apoyo</span>
        <strong>${support.generalBenefits.length} acciones principales</strong>
      </article>
      <article class="hero-stat">
        <span class="hero-stat-label">Proyección 2026</span>
        <strong>${plan.institutions.length} establecimientos</strong>
      </article>
      <article class="hero-stat">
        <span class="hero-stat-label">Base social</span>
        <strong>${informedMembers} socios</strong>
      </article>
    </aside>
  `;
};

const renderPurpose = (intro, memory, support, plan) => {
  const root = document.querySelector("#proposito");
  const currentInstitutions = support.items.map((item) => item.title);
  const plannedInstitutions = plan.institutions.map((item) => item.name);

  root.innerHTML = section(
    "Propósito",
    "Una presencia educativa concreta en Quilpué",
    `
      <div class="split-layout">
        <div>
          ${paragraphs([intro.paragraphs[1], memory.paragraphs[0], memory.paragraphs[1]])}
        </div>
        <div class="highlight-card">
          <p class="highlight-label">Cobertura actual</p>
          ${chipList(currentInstitutions, "chip-list chip-list-tight")}
          <p class="highlight-label">Cobertura proyectada 2026</p>
          ${chipList(plannedInstitutions, "chip-list chip-list-tight")}
        </div>
      </div>
    `
  );
};

const renderImpact = (administration, support, plan) => {
  const root = document.querySelector("#impacto");
  const activeMembers = membershipSummary(administration.membership, "Socios activos");
  const exemptMembers = membershipSummary(administration.membership, "Socios exentos");
  const volunteerMembers = membershipSummary(administration.membership, "Socios voluntarios");
  const meetings = findStatValue(administration.stats, "reuniones");

  const metrics = [
    {
      value: String(support.items.length),
      label: "establecimientos apoyados en 2025"
    },
    {
      value: String(support.generalBenefits.length),
      label: "líneas generales de apoyo activadas"
    },
    {
      value: meetings,
      label: "reuniones de directorio realizadas en el año"
    },
    {
      value: String(plan.institutions.length),
      label: "establecimientos considerados para 2026"
    }
  ]
    .map(
      (item) => `
        <article class="metric-card">
          <p class="metric-value">${item.value}</p>
          <p class="metric-label">${item.label}</p>
        </article>
      `
    )
    .join("");

  root.innerHTML = section(
    "Impacto",
    "Lo esencial, antes que el detalle",
    `
      <div class="metrics-grid">${metrics}</div>
      <p class="inline-line">
        <span>${activeMembers.tag}: ${activeMembers.title.toLowerCase()}. ${activeMembers.copy}</span>
        <span>${exemptMembers.tag}: ${exemptMembers.title.toLowerCase()}. ${exemptMembers.copy}</span>
        <span>${volunteerMembers.tag}: ${volunteerMembers.title.toLowerCase()}. ${volunteerMembers.copy}</span>
      </p>
    `
  );
};

const renderSupport = (support) => {
  const root = document.querySelector("#apoyos");
  const institutions = support.items.map((item) => item.title);

  root.innerHTML = section(
    support.kicker,
    "La ayuda se traduce en apoyos claros y útiles",
    `
      <div class="section-copy">
        <p>En lugar de repetir cada caso, aquí se sintetizan las líneas de ayuda que la Liga activó durante 2025 para responder a necesidades concretas de asistencia, aprendizaje y permanencia escolar.</p>
      </div>
      ${chipList(support.generalBenefits, "benefit-cloud")}
      <div class="support-footer">
        <p class="support-total">Apoyos orientados a necesidades concretas de estudiantes y establecimientos.</p>
        ${chipList(institutions, "chip-list chip-list-tight")}
      </div>
    `
  );
};

const renderNetwork = (management, publicRelations) => {
  const root = document.querySelector("#gestion");
  const circles = management.items
    .map(
      (item) => `
        <article class="action-circle">
          <span class="action-tag">${item.tag}</span>
          <h3 class="action-title">${item.circleTitle || item.title}</h3>
        </article>
      `
    )
    .join("");

  root.innerHTML = section(
    "Redes y presencia",
    "La Liga también abre puertas, articula y acompaña",
    `
      <div class="action-strip">${circles}</div>
      <div class="section-copy">
        <p>Además de los aportes materiales, la institución sostuvo presencia activa en ceremonias, aniversarios y actividades escolares de la comuna.</p>
      </div>
      ${chipList(publicRelations.items, "presence-line")}
    `
  );
};

const renderPlan = (plan, treasury) => {
  const root = document.querySelector("#plan");
  const institutions = chipList(
    plan.institutions.map((item) => item.name),
    "chip-list plan-chip-list"
  );

  root.innerHTML = section(
    plan.kicker,
    plan.title,
    `
      ${paragraphs(plan.paragraphs)}
      <div class="plan-callout">
        <p class="plan-callout-label">Cobertura proyectada 2026</p>
        <p class="plan-callout-value">${plan.institutions.length} establecimientos</p>
      </div>
      ${institutions}
      <div class="treasury-note">
        <p class="treasury-note-label">${treasury.title}</p>
        <p>La planificación considera continuidad operativa, expansión gradual y apoyo focalizado según las necesidades levantadas en cada establecimiento.</p>
      </div>
    `
  );
};

const renderIncome = (income) => {
  const root = document.querySelector("#ingresos");
  const items = income.items
    .map(
      (item) => `
        <article class="fund-card">
          <span class="fund-tag">${item.tag}</span>
          <h3 class="fund-title">${item.title}</h3>
          <p class="fund-copy">${item.copy}</p>
        </article>
      `
    )
    .join("");

  root.innerHTML = section(income.kicker, income.title, `<div class="fund-grid">${items}</div>`);
};

const renderLeadership = (administration, board) => {
  const root = document.querySelector("#equipo");
  const summaryLine = [
    administration.paragraphs[0],
    administration.paragraphs[1],
    administration.paragraphs[2]
  ]
    .map((item) => `<span>${item}</span>`)
    .join("");

  const members = board.members
    .map(
      (member) => `
        <article class="board-circle">
          <span class="board-role">${member.role}</span>
          <h3 class="board-name">${member.name}</h3>
        </article>
      `
    )
    .join("");

  root.innerHTML = section(
    "Equipo",
    "Un directorio que sostiene continuidad y gestión",
    `
      <p class="inline-line">${summaryLine}</p>
      <div class="board-strip">${members}</div>
    `
  );
};

const renderClosing = (closing) => {
  const root = document.querySelector("#cierre");
  root.innerHTML = section(
    closing.kicker,
    closing.title,
    `
      <div class="quote-block">
        <p class="quote-text">${closing.quote}</p>
        <p class="quote-author">${closing.author}</p>
      </div>
      ${paragraphs(closing.paragraphs)}
    `
  );
};

const renderFooter = (site) => {
  const root = document.querySelector("#footer");
  root.innerHTML = `
    <div class="footer-box">
      <div class="footer-main">
        <p class="footer-title">${site.name}</p>
        <p class="footer-copy">${site.footerSummary}</p>
      </div>
      <div class="footer-meta">
        <p><strong>Dirección</strong> ${site.address}</p>
        <p><strong>Teléfono</strong> ${site.phone}</p>
        <p><strong>Personalidad jurídica</strong> ${site.legalStatus}</p>
        <p><strong>Referencia</strong> ${site.cityDate}</p>
      </div>
      <a class="button button-footer" href="#top">Volver arriba</a>
    </div>
  `;
};

const showError = () => {
  const main = document.querySelector("#content");
  main.innerHTML = `
    <section class="panel error-state">
      <div>
        <h2 class="section-title">No fue posible cargar el contenido</h2>
        <p class="item-copy">Verifica la disponibilidad de <code>scripts/data/site-content.json</code>.</p>
      </div>
    </section>
  `;
};

const init = async () => {
  try {
    const response = await fetch("./scripts/data/site-content.json");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    renderHero(data.site, data.administration, data.materialSupport, data.plan2026);
    renderPurpose(data.intro, data.memory, data.materialSupport, data.plan2026);
    renderImpact(data.administration, data.materialSupport, data.plan2026);
    renderSupport(data.materialSupport);
    renderNetwork(data.managementActions, data.publicRelations);
    renderPlan(data.plan2026, data.treasury);
    renderIncome(data.incomeSources);
    renderLeadership(data.administration, data.board);
    renderClosing(data.closing);
    renderFooter(data.site);
  } catch (error) {
    console.error(error);
    showError();
  }
};

init();
