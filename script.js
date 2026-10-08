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

function formatFraction(formattedStr) {
  const parts = formattedStr.split(",");
  if (parts.length < 2) return formattedStr;
  
  const whole = parts[0];
  const decimals = parts[1]; // Наприклад "9397"

  // Якщо маємо 4 цифри копійок ("9397")
  if (decimals.length > 2) {
    const mainCop = decimals.slice(0, 2); // "93" (звичайний розмір)
    const microCop = decimals.slice(2);   // "97" (зменшений)
    return `${whole},${mainCop}<span style="font-size: 0.65em; opacity: 0.75;">${microCop}</span>`;
  }
  
  return formattedStr;
}

function tick(animate = true) {
  const value = calc();
  
  // Верхня сума (2 знаки) — звичайний розмір для всього
  if (totalEl) totalEl.textContent = money(value, 2) + " ₴";
  
  // Нижня сума (4 знаки) — XX,XXxx (перші 2 цифри копійок звичайні, останні 2 зменшені)
  if (earnedEl) earnedEl.innerHTML = formatFraction(money(value, 4)) + " ₴";

  if (animate && bank) {
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
