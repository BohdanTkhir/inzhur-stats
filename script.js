document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const setup = $("#setup"), bank = $("#bank"), certInput = $("#certificates"), rateInput = $("#rate");
  const totalEl = $("#total"), earnedEl = $("#earned"), certOut = $("#certOut"), rateOut = $("#rateOut");
  let certificates = 0, rate = 0, startMs = 0, timer = null;

  function money(v, d = 2) {
    return v.toLocaleString("uk-UA", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function getDaysInCurrentMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  function calc() {
    const now = Date.now();
    const elapsed = (now - startMs) / 1000;
    const monthlyTotal = certificates * rate;
    const secondsInMonth = getDaysInCurrentMonth() * 24 * 3600;
    return monthlyTotal * (elapsed / secondsInMonth);
  }

  function formatSmallDecimals(formattedStr) {
  // Розділяємо число по комі та загортаємо дробову частину в span
  const parts = formattedStr.split(",");
  if (parts.length < 2) return formattedStr;
  return `${parts[0]}<span style="font-size: 0.6em; opacity: 0.85;">,${parts[1]}</span>`;
}

function tick(animate=true){
  const value = calc();
  
  // Використовуємо innerHTML замість textContent, щоб спрацював тег <span>
  if (totalEl) totalEl.innerHTML = formatSmallDecimals(money(value, 2)) + " ₴";
  if (earnedEl) earnedEl.innerHTML = formatSmallDecimals(money(value, 4)) + " ₴";

  if(animate && bank){
    bank.classList.remove("heartbeat");
    void bank.offsetWidth;
    bank.classList.add("heartbeat");
  }
}

  function start(e) {
    if (e) e.preventDefault();

    certificates = Math.max(0, Number(certInput.value) || 0);
    rate = Math.max(0, Number(rateInput.value) || 0);

    const now = new Date();
    startMs = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0).getTime();

    if (certOut) certOut.textContent = certificates.toLocaleString("uk-UA");
    if (rateOut) rateOut.textContent = rate.toLocaleString("uk-UA");

    if (setup) setup.classList.add("hidden");
    if (bank) bank.classList.remove("hidden");

    tick(false);
    if (timer) clearInterval(timer);
    timer = setInterval(() => tick(true), 1000);
  }

  const startBtn = $("#start");
  if (startBtn) startBtn.addEventListener("click", start);

  const editBtn = $("#edit");
  if (editBtn) {
    editBtn.addEventListener("click", (e) => {
      if (e) e.preventDefault();
      if (timer) clearInterval(timer);
      if (bank) bank.classList.add("hidden");
      if (setup) setup.classList.remove("hidden");
    });
  }
});
