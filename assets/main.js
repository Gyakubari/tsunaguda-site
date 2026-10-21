(function(){
  var el=document.getElementById('clock');
  function tick(){if(!el)return;try{el.textContent=new Intl.DateTimeFormat('ja-JP',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Tokyo'}).format(new Date());}catch(e){}}
  tick();setInterval(tick,15000);
  var PTL={home:['tsunaguda','ホーム'],about:['About','私たちについて'],philosophy:['Philosophy','理念・代表メッセージ'],service:['Service','サービス'],plan:['Plan','料金プラン'],works:['Works','実績・事例紹介'],company:['Company','会社概要'],contact:['Contact','お問い合わせ'],privacy:['Privacy','プライバシーポリシー']};
  function setPT(l){var a=document.getElementById('pt-en'),b=document.getElementById('pt-jp');if(a)a.textContent=l[0];if(b)b.textContent=l[1];}
  if(window.__pt)setPT(PTL[window.__pt]||PTL.home);
  var root=document.documentElement,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||rm||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    if(a.target&&a.target!=='_self'||a.hasAttribute('download'))return;
    var u=new URL(a.href,location.href);
    if(u.origin!==location.origin||!/^https?:|^file:/.test(u.protocol))return;
    if(u.pathname===location.pathname&&u.search===location.search)return;
    e.preventDefault();
    var seg=(u.pathname.match(/\/(about|philosophy|service|plan|works|company|contact|privacy)\//)||[])[1]||'home';
    var lb=PTL[seg]||PTL.home;setPT(lb);
    try{sessionStorage.setItem('pt',seg);}catch(x){}
    root.classList.remove('pt-in');root.classList.add('pt-out');
    setTimeout(function(){location.href=a.href;},360);
  });
  window.addEventListener('pageshow',function(e){if(e.persisted)root.classList.remove('pt-out');});
  var btn=document.getElementById('menu-btn'),hd=document.querySelector('header');
  if(btn){btn.addEventListener('click',function(){var o=hd.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
    document.querySelectorAll('#gnav a').forEach(function(a){a.addEventListener('click',function(){hd.classList.remove('open');btn.setAttribute('aria-expanded','false');});});}
  var form=document.getElementById('contact-form');
  if(form)form.addEventListener('submit',function(e){e.preventDefault();document.getElementById('sent').hidden=false;});
})();
