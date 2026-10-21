(function(){
  var el=document.getElementById('clock');
  function tick(){if(!el)return;try{el.textContent=new Intl.DateTimeFormat('ja-JP',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Tokyo'}).format(new Date());}catch(e){}}
  tick();setInterval(tick,15000);
  var root=document.documentElement,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||rm||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    if(a.target&&a.target!=='_self'||a.hasAttribute('download'))return;
    var u=new URL(a.href,location.href);
    if(u.origin!==location.origin||!/^https?:|^file:/.test(u.protocol))return;
    if(u.pathname===location.pathname&&u.search===location.search)return;
    e.preventDefault();
    try{sessionStorage.setItem('pt','1');}catch(x){}
    root.classList.remove('pt-in');root.classList.add('pt-out');
    setTimeout(function(){location.href=a.href;},520);
  });
  window.addEventListener('pageshow',function(e){if(e.persisted)root.classList.remove('pt-out');});
  var btn=document.getElementById('menu-btn'),hd=document.querySelector('header');
  if(btn){btn.addEventListener('click',function(){var o=hd.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
    document.querySelectorAll('#gnav a').forEach(function(a){a.addEventListener('click',function(){hd.classList.remove('open');btn.setAttribute('aria-expanded','false');});});}
  var form=document.getElementById('contact-form');
  if(form)form.addEventListener('submit',function(e){e.preventDefault();document.getElementById('sent').hidden=false;});
})();
