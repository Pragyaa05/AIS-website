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
  links.forEach(a => a.classList.toggle("active", a.dataset.link === target.id));
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
