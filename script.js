/* ===== Blog posts: edit this list when you have real content ===== */
const posts = [
  { title: "Blog post title one",   date: "[Date]", excerpt: "[Short summary of the post]" },
  { title: "Blog post title two",   date: "[Date]", excerpt: "[Short summary of the post]" },
  { title: "Blog post title three", date: "[Date]", excerpt: "[Short summary of the post]" }
];
const postCard = p =>
  `<article class="item"><div class="img-ph">[Cover image]</div><small>${p.date}</small><h3>${p.title}</h3><p>${p.excerpt}</p></article>`;
document.querySelectorAll("[data-blog-preview]").forEach(el => el.innerHTML = posts.map(postCard).join(""));
document.querySelectorAll("[data-blog-list]").forEach(el => el.innerHTML = posts.concat(posts).map(postCard).join(""));

/* ===== Hash router (#home, #about, ...) ===== */
const pages = [...document.querySelectorAll(".page")];
const links = [...document.querySelectorAll("[data-link]")];
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");

function route() {
  const id = location.hash.slice(1) || "home";
  const target = pages.find(p => p.id === id) || pages[0];
  pages.forEach(p => p.classList.toggle("show", p === target));
  links.forEach(a => a.classList.toggle("active", a.dataset.link === (target.dataset.parent || target.id)));
  document.getElementById("cta").style.display = target.id === "contact" ? "none" : "";
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  const h1 = target.querySelector("h1");
  document.title = (target.id === "home" ? "" : h1.textContent + " | ") + "Transkey | Accurate Infoway Solution";
}
addEventListener("hashchange", route);
route();

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

/* ===== Contact form validation ===== */
const form = document.getElementById("contactForm");
const rules = {
  name:    v => v.trim().length > 1,
  company: v => v.trim().length > 1,
  mobile:  v => {
    let n = v.replace(/[\s-]/g, "").replace(/^\+/, "");
    if (n.length === 12 && n.startsWith("91")) n = n.slice(2);
    return /^[6-9]\d{9}$/.test(n);
  },
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
};

form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;
  for (const [key, test] of Object.entries(rules)) {
    const field = form.elements[key];
    const good = test(field.value);
    field.closest(".field").classList.toggle("bad", !good);
    if (!good) valid = false;
  }
  if (!valid) return;
  const data = Object.fromEntries(new FormData(form));
  /* TODO: send `data` to your backend, form service or email API here. */
  console.log("Enquiry:", data);
  form.reset();
  document.getElementById("ok").style.display = "block";
});

document.getElementById("yr").textContent = new Date().getFullYear();

/* ===== Feature data: edit text here ===== */
const highlights = [
  { t:"Unlimited branches", ic:"building", s:"Any number of branches, with separate bill series and serial numbers.",
    d:["Maintain any number of branches","Separate bill series and serial numbers for each branch's transactions","Branch-wise profitability, based on where work is generated, billed and paid","Reports for one branch or consolidated for many"] },
  { t:"Auto journals & TDS", ic:"book", s:"Bills adjusted and journals passed automatically, with TDS tracking.",
    d:["TDS tracking when payment arrives after deduction of GST and claim","Auto journal fully adjusts the bill and updates accounts","Bill and lorry challan adjustment, partly or fully, during cash/bank and journal entry","TDS declaration report against lorry hire by vehicle, broker, fleet owner or PAN","Interest calculation entry and report"] },
  { t:"Complete GST solution", ic:"percent", s:"GST and education cess handled per C/N and bill.",
    d:["Complete GST and education cess solution per C/N and bill, with realised and deposit details","GST reports and returns"] },
  { t:"Easy year-end", ic:"cal", s:"Enter opening balances once and work in two financial years at the same time.",
    d:["Opening entry only once for accounts, outstanding C/N, L/C, bills and delivery orders","From the next year, only the financial year opening is needed","Work in both financial years at the same time"] },
  { t:"Godown & delivery control", ic:"warehouse", s:"Godown-wise stock, transfers and flexible delivery options.",
    d:["Delivery as per godown for retail or rail booking, and direct delivery for full truck load","C/N stock godown-wise and branch-wise, with godown transfer","List of unbilled consignment notes to pay outstanding and unpaid lorry challans","Individual status query for consignment note, lorry challan, bill and more"] },
  { t:"Reports & MIS", ic:"chart", s:"Full accounting reports, costing and management MIS.",
    d:["Cash/bank book, journal, ledger, trial balance, P&L and balance sheet, branch-wise and consolidated","Costing and margin per C/N and per loading challan","MIS reports for management to see branch-wise performance","Tally-style zooming from every report and entry level","Reports by date, branch or company","Customize reports and invoices, including your logo","Export to Excel, Word, PDF, HTML and XML"] },
  { t:"Easy to use & manage", ic:"sliders", s:"Keyboard, mouse and menu driven, with central office control.",
    d:["Fully mouse, keyboard and menu driven","Manage all offices from one central office, online or offline over broadband","User parameter setup with restrictions by company, branch, entry, edit and report level","Data transfer from other software (at extra cost)"] },
  { t:"Fleet add-on & support", ic:"headset", s:"Optional fleet management, container logistics and 24/7 support.",
    d:["Add-on fleet management with trip details, way expenses, tyre and equipment, and document expiry information","Unique solution for container-based logistics","24/7, 365-day support"] }
];

const featureTabs = [
  { name:"Special Features", groups: highlights.map(h => ({ g:h.t, i:h.d })) },
  { name:"Operations", groups:[
    { g:"Booking", i:["Booking register and C/N related information","Validation of GR numbers against pre-printed stationery stock","Pre-defined consignor and consignee lists","Multiple weight units and rates, FOC and charged weights","Freight rates picked from the rate contract master","Paid, To Pay and To Be Billed consignments, and billing party","User-defined expenses such as labour, loading and other charges","Booking, station-wise, branch-wise, C/N revenue and costing, and business analysis reports"] },
    { g:"Manifest", i:["Auto pickup of C/N stock details, or manual selection","Partial dispatch, short and excess dispatch details","Manifest analysis and un-dispatched consignment reports"] },
    { g:"Unloading", i:["Unloading details at the arrival station","Goods condition and the godown where goods are unloaded","Unloading status report"] },
    { g:"Lorry hire challan", i:["Auto pickup of manifest details","Lorry details, freight rate, amount and other charges","Auto journal voucher posting for freight payment accounts","PAN and Form 15-I details, and broker details for commission and payments","Consolidation report on manifest and excess payment check","Broker-wise and vehicle-wise ledger reports"] },
    { g:"Delivery / POD", i:["POD for FTL with delivery details, and gate pass printing for retail topay or paid booking","Daily cash collection report with delivery details","Payment collection for To Pay consignments","Damage certificate"] },
    { g:"Billing", i:["Complete billing for To Be Billed consignments","Freight and supplementary billing integrated with accounting","Auto posting to booking branch and billing branch","Consignor, consignee or third-party billing","Single or multiple consignment billing with matching expenses"] },
    { g:"Documents & enquiry", i:["Issue pre-printed documents to stations and agents, with cancelled or missing document analysis","Search by C/N, challan, manifest, M/R, cheque, consignee and more","Advance enquiry by bill number or party cheque number","Full transit history and status of any GR on screen, with date and station-wise tracking"] }
  ]},
  { name:"Finance & Accounting", groups:[
    { g:"Cash, bank & reports", i:["Cash/bank, journal voucher and contra","Bank reconciliation report","Ledger and books reports","Trial balance, balance sheet, P&L and schedules","Analysis of expenditure and income","Outstanding analysis, ageing analysis and payment reminders","GST reports and returns"] },
    { g:"Outstanding", i:["Lorry challan outstanding with on-account payment details","Debtors and creditors status as on date","To Pay outstanding and unbilled GR"] },
    { g:"Masters & contracts", i:["Customer contracts by destination, state, zone or city","Goods-wise, consignor/consignee-wise and flight-wise (air mode) rates","Vehicle, packages, KM or weight-slab rates","Additional charges and contract approval","Vendor management: grouping and creation","General ledgers: main groups, sub groups, ledgers and sub-ledgers"] },
    { g:"Billing & collection", i:["Booking bill as per customer contract","Delivery, miscellaneous, supplementary and department-wise bills","Bill submission","Money receipts against paid booking, ToPay delivery, bills or on account","PDC cheque deposit, reverse money receipt and on-account adjustment","Credit notes with reason and approval"] },
    { g:"Accounts payable", i:["Lorry hire payments: advance and balance","Party, labour, agency, booking and delivery commissions","Vendor payments, advice generation, bill receipt, passing and payment","Debit note, advance payment adjustment and bank advice"] },
    { g:"Branches & other", i:["Inter-branch transactions: funds transfer, acknowledgement, debit/credit notes and reconciliation","Branch expenses, and cash payments with approval","Journal voucher entry, cash withdrawals, funds deposited in bank and ledger merging","TDS and GST"] }
  ]}
];

/* ===== Home highlights + popup ===== */
const dlg = document.getElementById("featureDialog");
const grid = document.getElementById("highlightGrid");
grid.innerHTML = highlights.map((h, n) =>
  `<button type="button" class="item hl" data-n="${n}"><svg class="ico" aria-hidden="true"><use href="#i-${h.ic}"/></svg><h3>${h.t}</h3><p>${h.s}</p><span class="more">View details &rarr;</span></button>`
).join("");
grid.addEventListener("click", e => {
  const b = e.target.closest(".hl"); if (!b) return;
  const h = highlights[b.dataset.n];
  document.getElementById("dlgTitle").textContent = h.t;
  document.getElementById("dlgList").innerHTML = h.d.map(x => `<li>${x}</li>`).join("");
  dlg.showModal();
});
document.getElementById("dlgClose").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

/* ===== Solutions: tabs + accordions ===== */
const tabList = document.getElementById("tabList");
const tabPanel = document.getElementById("tabPanel");
function showTab(n) {
  tabList.querySelectorAll(".tab").forEach((t, i) => t.setAttribute("aria-selected", i === n));
  tabPanel.innerHTML = featureTabs[n].groups.map(g =>
    `<details><summary>${g.g}</summary><ul>${g.i.map(x => `<li>${x}</li>`).join("")}</ul></details>`
  ).join("");
}
tabList.innerHTML = featureTabs.map((t, i) => `<button type="button" class="tab" role="tab" data-n="${i}">${t.name}</button>`).join("");
tabList.addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) showTab(+b.dataset.n); });
showTab(0);

/* ===== Home tabs: Technology / Business features ===== */
const homeTabs = document.getElementById("homeTabs");
homeTabs.addEventListener("click", e => {
  const b = e.target.closest(".tab"); if (!b) return;
  homeTabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t === b));
  const biz = b.dataset.t === "biz";
  document.getElementById("techGrid").hidden = biz;
  document.getElementById("highlightGrid").hidden = !biz;
  document.getElementById("bizLink").hidden = !biz;
});

/* ===== Stop orbit motion for visitors who prefer reduced motion ===== */
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".orbit svg").forEach(s => s.pauseAnimations());
}
