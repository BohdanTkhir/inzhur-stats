const $=s=>document.querySelector(s);
const setup=$("#setup"), bank=$("#bank"), certInput=$("#certificates"), rateInput=$("#rate");
const totalEl=$("#total"), earnedEl=$("#earned"), certOut=$("#certOut"), rateOut=$("#rateOut");
let certificates=0, rate=0, startMs=0, timer=null;

function money(v,d=2){return v.toLocaleString("uk-UA",{minimumFractionDigits:d,maximumFractionDigits:d})}

// Отримання кількості днів у поточному місяці
function getDaysInCurrentMonth(){
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

function calc(){
  const now = Date.now();
  // Секунди, що минули з 1-го числа місяця 00:00:00
  const elapsed = (now - startMs) / 1000;
  
  // Фіксована сума дивідендів за весь поточний місяць
  const monthlyTotal = certificates * rate;
  
  // Загальна кількість секунд у поточному місяці
  const secondsInMonth = getDaysInCurrentMonth() * 24 * 3600;
  
  // Зароблені дивіденди пропорційно підрахованому часу
  return monthlyTotal * (elapsed / secondsInMonth);
}

function tick(animate=true){
  const value=calc();
  totalEl.textContent=money(value,2)+" ₴";
  earnedEl.textContent=money(value,4)+" ₴";
  if(animate){
    bank.classList.remove("heartbeat");
    void bank.offsetWidth;
    bank.classList.add("heartbeat");
  }
}

function start(){
  certificates=Math.max(0,Number(certInput.value)||0);
  rate=Math.max(0,Number(rateInput.value)||0); // Сума на 1 сертифікат за місяць
  
  // Встановлюємо старт на 1-ше число поточного місяця, 00:00:00
  const now = new Date();
  startMs = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0).getTime();
  
  certOut.textContent=certificates.toLocaleString("uk-UA");
  rateOut.textContent=rate.toLocaleString("uk-UA");
  setup.classList.add("hidden"); bank.classList.remove("hidden");
  
  tick(false);
  clearInterval(timer);
  timer=setInterval(()=>tick(true),1000);
}

$("#start").addEventListener("click",start);
$("#edit").addEventListener("click",()=>{
  clearInterval(timer); bank.classList.add("hidden"); setup.classList.remove("hidden");
});
