const $=s=>document.querySelector(s);
const setup=$("#setup"), bank=$("#bank"), certInput=$("#certificates"), rateInput=$("#rate");
const totalEl=$("#total"), earnedEl=$("#earned"), certOut=$("#certOut"), rateOut=$("#rateOut");
let certificates=0, rate=0, startMs=0, baseEarned=0, timer=null;

function money(v,d=2){return v.toLocaleString("uk-UA",{minimumFractionDigits:d,maximumFractionDigits:d})}
function calc(){
  const elapsed=(Date.now()-startMs)/1000;
  const annual=certificates*rate/100;
  return baseEarned+annual*(elapsed/(365*24*3600));
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
  rate=Math.max(0,Number(rateInput.value)||0);
  startMs=Date.now(); baseEarned=0;
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
