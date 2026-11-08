(function(){"use strict";
var EMAIL="jlreforma@ccc.edu.ph",root=document.documentElement;
function $(s,c){return (c||document).querySelector(s)}
var y=$("#year");if(y)y.textContent=new Date().getFullYear();
// theme
var tt=$(".theme-toggle"),saved=null;try{saved=localStorage.getItem("theme")}catch(e){}
function setTheme(t){root.setAttribute("data-theme",t);if(tt)tt.textContent=t==="dark"?"\u2600":"\u263E"}
setTheme(saved||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
if(tt)tt.addEventListener("click",function(){var n=root.getAttribute("data-theme")==="dark"?"light":"dark";setTheme(n);try{localStorage.setItem("theme",n)}catch(e){}});
// mobile menu
var mt=$(".menu-toggle"),nav=$(".nav");
if(mt&&nav){mt.addEventListener("click",function(){var o=nav.classList.toggle("open");mt.setAttribute("aria-expanded",o)});nav.addEventListener("click",function(e){if(e.target.tagName==="A"){nav.classList.remove("open");mt.setAttribute("aria-expanded","false")}})}
// project search + filter
var cards=[].slice.call(document.querySelectorAll(".project-card")),inp=$("#projectSearch"),btns=[].slice.call(document.querySelectorAll(".filter-btn")),cat="all";
function apply(){var q=(inp?inp.value:"").trim().toLowerCase(),n=0;cards.forEach(function(c){var txt=(c.textContent+" "+(c.dataset.search||"")).toLowerCase(),ok=(cat==="all"||c.dataset.category===cat)&&(!q||txt.indexOf(q)>-1);c.hidden=!ok;if(ok)n++});
var pc=$("#projectCount"),es=$("#emptyState");if(pc)pc.textContent=n+(n===1?" project":" projects");if(es)es.hidden=n>0}
if(inp)inp.addEventListener("input",apply);
btns.forEach(function(b){b.addEventListener("click",function(){cat=b.dataset.filter;btns.forEach(function(x){x.classList.toggle("active",x===b)});apply()})});
// contact form -> mailto
var f=$("#contactForm");
if(f)f.addEventListener("submit",function(e){e.preventDefault();var d=new FormData(f),note=$("#formNote");if(d.get("website"))return;
var body="Name: "+d.get("name")+"\nEmail: "+d.get("email")+"\n\n"+d.get("message");
location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent(d.get("subject"))+"&body="+encodeURIComponent(body);
if(note)note.textContent="Your email app should open now. If it did not, write to "+EMAIL+" directly."});
})();