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
    setTimeout(function(){location.href=a.href;},620);
  });
  window.addEventListener('pageshow',function(e){if(e.persisted)root.classList.remove('pt-out');});
  (function(){
    if(!('IntersectionObserver' in window)){root.classList.remove('js');return;}
    function skip(el){return el.closest('.hero,.page-head,header,footer,.intro,.pt');}
    function all(sel){return Array.prototype.filter.call(document.querySelectorAll(sel),function(el){return !skip(el);});}
    var targets=[];
    all('.sec-title,.brand-band h2,.cta-link>span').forEach(function(el){
      var parts=el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML=parts.map(function(h,i){return '<span class="rl" style="--l:'+i+'"><span>'+h+'</span></span>';}).join('');
      el.classList.add('r-lines');targets.push(el);});
    all('.lead,.mission,.value h3,.brand-band .kicker').forEach(function(el){
      var n=0;(function walk(node){Array.prototype.slice.call(node.childNodes).forEach(function(c){
        if(c.nodeType===3){var f=document.createDocumentFragment();Array.from(c.textContent).forEach(function(ch){
          if(/\s/.test(ch)){f.appendChild(document.createTextNode(ch));return;}
          var s=document.createElement('span');s.className='rc';s.style.setProperty('--i',n++);s.textContent=ch;f.appendChild(s);});
          c.parentNode.replaceChild(f,c);}
        else if(c.nodeType===1&&c.tagName!=='BR')walk(c);});})(el);
      el.classList.add('r-chars');targets.push(el);});
    function stagger(list,cls){list.forEach(function(el){var p=el.parentNode,i=0,sib=p.firstElementChild;
      while(sib&&sib!==el){if(sib.classList.contains(cls))i++;sib=sib.nextElementSibling;}
      el.classList.add(cls);el.style.setProperty('--i',i%8);targets.push(el);});}
    stagger(all('.sec-head>.label,.body>.label,.value>.label,.message>.label,.body>p:not(.lead):not(.mission),.message>p,.value>p,.svc>li,.plans>*,.stats>div,.probs>div,.flow>li,.faq>details,.company>dt,.company>dd,.more,.works-head>p,.cta-band .label,.cta-band p,.legal h3,.legal .body>p,.work-meta,.sec-head>p,.fine,form>*'),'r-up');
    stagger(all('.brand-band .lines span'),'r-box');
    stagger(all('.thumb'),'r-mask');
    stagger(all('.brand-band .more-link'),'r-up');
    // clip-path hides an element from IntersectionObserver, so clipped reveals watch their parent instead
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){(e.target.__rv||[e.target]).forEach(function(t){t.classList.add('in');});io.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px',threshold:0.12});
    targets.forEach(function(el){
      if(el.classList.contains('r-box')||el.classList.contains('r-mask')){var w=el.parentElement;if(!w.__rv){w.__rv=[];io.observe(w);}w.__rv.push(el);}
      else io.observe(el);});
  })();
  var btn=document.getElementById('menu-btn'),hd=document.querySelector('header');
  if(btn){btn.addEventListener('click',function(){var o=hd.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
    document.querySelectorAll('#gnav a').forEach(function(a){a.addEventListener('click',function(){hd.classList.remove('open');btn.setAttribute('aria-expanded','false');});});}
  var form=document.getElementById('contact-form');
  if(form){
    var hp=document.createElement('input');hp.type='text';hp.name='_honey';hp.tabIndex=-1;hp.autocomplete='off';hp.setAttribute('aria-hidden','true');hp.style.cssText='position:absolute;left:-9999px;width:1px;height:1px;opacity:0';form.appendChild(hp);
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var out=document.getElementById('sent'),btn=form.querySelector('button[type=submit]');
      function say(t,ok){out.textContent=t;out.hidden=false;out.classList.toggle('err',!ok);}
      if(!form.checkValidity()){var bad=form.querySelector(':invalid');if(bad)bad.focus();
        say(bad&&bad.type==='email'&&bad.value?'メールアドレスの形式をご確認ください。':'必須の項目（会社名・お名前・メールアドレス）をご入力ください。',false);return;}
      if(hp.value)return;
      var d={};new FormData(form).forEach(function(v,k){d[k]=v;});
      var body={'会社名':d.company,'お名前':d.name,'メールアドレス':d.email,'ご相談内容':d.topic,'詳しい内容':d.message||'（記入なし）',
        _subject:'【HP問い合わせ】'+d.company+' '+d.name+'様',_replyto:d.email,_template:'table',_honey:''};
      btn.disabled=true;var label=btn.textContent;btn.textContent='送信中…';
      fetch('https://formsubmit.co/ajax/0ed5f1fb5bcba320dc17bf002947b6bc',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(body)})
        .then(function(r){return r.json();})
        .then(function(j){
          if(j&&(j.success===true||j.success==='true')){form.reset();say('送信しました。お問い合わせありがとうございます。内容を確認のうえ、ご入力いただいたメールアドレスにご連絡します。',true);}
          else throw new Error(j&&j.message);
        })
        .catch(function(){say('送信できませんでした。お手数ですが、m.mizutani@tsunaguda.com まで直接メールでご連絡ください。',false);})
        .then(function(){btn.disabled=false;btn.textContent=label;});
    });
  }
})();
