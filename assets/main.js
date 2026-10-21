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
    all('.cta-band').forEach(function(el){el.classList.add('r-panel');targets.push(el);});
    targets.forEach(function(el){if((el.classList.contains('label')&&!el.classList.contains('clock'))||(el.matches('.sec-title,.cta-link>span')&&/^[\x00-\x7F\s]+$/.test(el.textContent)))el.__scr=true;});
    stagger(all('.thumb'),'r-mask');
    stagger(all('.brand-band .more-link'),'r-up');
    // clip-path hides an element from IntersectionObserver, so clipped reveals watch their parent instead
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){(e.target.__rv||[e.target]).forEach(function(t){t.classList.add('in');if(t.__scr)scramble(t,t.closest('.cta-band')?520:(parseFloat(t.style.getPropertyValue('--i'))||0)*90+60);});io.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px',threshold:0.12});
    targets.forEach(function(el){
      if(el.classList.contains('r-box')||el.classList.contains('r-mask')){var w=el.parentElement;if(!w.__rv){w.__rv=[];io.observe(w);}w.__rv.push(el);}
      else io.observe(el);});
  })();
  // hero shapes: brand motifs burst from the center, then float and follow the pointer
  (function(){
    var hero=document.querySelector('.hero');if(!hero)return;
    var G='<defs><linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#24389d"/><stop offset=".5" stop-color="#24389d"/><stop offset=".5" stop-color="#3352ab"/><stop offset="1" stop-color="#3352ab"/></linearGradient>'+
      '<linearGradient id="hg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3352ab"/><stop offset="1" stop-color="#3352ab"/></linearGradient>'+
      '<linearGradient id="hg3" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3352ab"/><stop offset="1" stop-color="#7fd0f5"/></linearGradient></defs>';
    var T={
      ring:function(g){return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="url(#'+g+')" stroke-width="22"/></svg>';},
      thin:function(g){return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="url(#'+g+')" stroke-width="10"/></svg>';},
      play:function(g){return '<svg viewBox="0 0 100 100"><path d="M18 8 L92 50 L18 92 Z" fill="url(#'+g+')" stroke="url(#'+g+')" stroke-width="10" stroke-linejoin="round"/></svg>';},
      dot:function(g){return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#'+g+')"/></svg>';},
      shard:function(g){return '<svg viewBox="0 0 400 60"><path d="M0 60 L400 0 L330 60 Z" fill="url(#'+g+')"/></svg>';},
      link:function(g){return '<svg viewBox="0 0 120 40"><path d="M22 20 H80" stroke="#111214" stroke-width="5" stroke-linecap="round"/><circle cx="18" cy="20" r="12" fill="#111214"/><circle cx="92" cy="20" r="20" fill="url(#'+g+')"/><path d="M86 11 L102 20 L86 29 Z" fill="#fff"/></svg>';}
    };
    // [type, x%, y%, size(px), rotate(deg), grad, depth, hideOnMobile]
    var S=[['ring',89,40,230,0,'hg1',.9,1],['shard',14,86,460,-6,'hg1',.5,1],['thin',5,90,130,0,'hg2',.6,0],['shard',80,78,320,-14,'hg2',.7,1],
      ['play',72,14,56,-12,'hg1',1.2,1],['play',95,60,40,18,'hg3',1,0],['play',43,7,30,8,'hg2',.8,1],['thin',84,44,48,0,'hg3',1.1,1],['thin',55,92,32,0,'hg2',.9,1],
      ['dot',61,13,12,0,'hg1',1.4,1],['dot',30,95,14,0,'hg2',1.2,1],['dot',97,34,10,0,'hg3',1.5,0],['dot',7,28,11,0,'hg1',1.3,1],['dot',74,92,18,0,'hg3',1,1],
      ['link',66,62,110,-8,'hg1',1.1,1],['ring',99,96,90,0,'hg3',.6,1]];
    var box=document.createElement('div');box.className='hero-shapes';box.setAttribute('aria-hidden','true');
    var html='<svg width="0" height="0" style="position:absolute">'+G+'</svg>';
    S.forEach(function(d,i){html+='<div class="sh'+(d[7]?' nm':'')+'" data-k="'+d[6]+'" style="--x:'+d[1]+'%;--y:'+d[2]+'%;--s:'+d[3]+'px;--r:'+d[4]+'deg;--i:'+i+';--fd:'+(6+(i%5))+'s"><div class="pl"><div class="fl">'+T[d[0]](d[5])+'</div></div></div>';});
    box.innerHTML=html;hero.insertBefore(box,hero.firstChild);
    var els=box.querySelectorAll('.sh');
    function aim(){var w=hero.clientWidth,h=hero.clientHeight;els.forEach(function(el,i){var d=S[i];
      el.style.setProperty('--dx',((50-d[1])/100*w)+'px');el.style.setProperty('--dy',((50-d[2])/100*h)+'px');});}
    aim();
    var wait=root.classList.contains('seen')?120:1850;
    setTimeout(function(){box.offsetWidth;box.classList.add('go');},wait);
    if(rm||!window.matchMedia('(pointer:fine)').matches)return;
    var raf=0,mx=0,my=0;
    hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;
      if(!raf)raf=requestAnimationFrame(function(){raf=0;els.forEach(function(el){var k=+el.dataset.k;el.firstChild.style.transform='translate3d('+(-mx*34*k)+'px,'+(-my*26*k)+'px,0)';});});});
    hero.addEventListener('mouseleave',function(){els.forEach(function(el){el.firstChild.style.transform='';});});
  })();
  // text scramble for English labels and headings
  var SCR='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  function scramble(el,delay){
    if(rm||el.__scrDone)return;el.__scrDone=true;
    var nodes=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null);while(w.nextNode())nodes.push(w.currentNode);
    var items=[];nodes.forEach(function(n){items.push({n:n,o:n.textContent});});
    var total=items.reduce(function(a,b){return a+b.o.length;},0)||1,t0=null,dur=Math.min(1100,380+total*28);
    function frame(ts){if(t0===null)t0=ts;var p=(ts-t0)/dur,k=0;
      items.forEach(function(it){var out='';for(var c=0;c<it.o.length;c++,k++){var ch=it.o[c];
        if(!/[A-Za-z0-9]/.test(ch)||p>=k/total*0.85+0.15){out+=ch;}else{out+=SCR[(Math.random()*SCR.length)|0];}}
        it.n.textContent=out;});
      if(p<1)requestAnimationFrame(frame);else items.forEach(function(it){it.n.textContent=it.o;});}
    setTimeout(function(){requestAnimationFrame(frame);},delay||0);
  }
  window.__scramble=scramble;
  document.querySelectorAll('.page-head .display .ln>span').forEach(function(el){scramble(el,150);});
  (function(){
    var it=document.querySelector('.intro'),de=document.documentElement;
    if(!it||de.classList.contains('seen')||getComputedStyle(it).display==='none')return;
    if('scrollRestoration' in history)history.scrollRestoration='manual';
    window.scrollTo(0,0);de.classList.add('lock');
    var keys={32:1,33:1,34:1,35:1,36:1,38:1,40:1};
    function stop(e){if(e.type!=='keydown'||keys[e.keyCode])e.preventDefault();}
    var o={passive:false};
    ['wheel','touchmove','keydown'].forEach(function(t){window.addEventListener(t,stop,o);});
    function onScroll(){window.scrollTo(0,0);}
    window.addEventListener('scroll',onScroll);
    setTimeout(function(){
      ['wheel','touchmove','keydown'].forEach(function(t){window.removeEventListener(t,stop,o);});
      window.removeEventListener('scroll',onScroll);de.classList.remove('lock');window.scrollTo(0,0);
    },2350);
  })();
  (function(){
    var band=document.querySelector('.brand-band'),tag=band&&band.querySelector('.tagline span'),fr=band&&band.querySelector('.e5');
    if(!band||!tag||!fr)return;
    var svg=band.querySelector('.e5-line'),path=svg.querySelector('path'),play=fr.querySelector('.e5-play');
    function draw(){
      if(getComputedStyle(fr).display==='none')return;
      var b=band.getBoundingClientRect(),t=tag.getBoundingClientRect(),p=play.getBoundingClientRect();
      svg.setAttribute('viewBox','0 0 '+b.width+' '+b.height);
      var x0=t.left-b.left,y0=t.bottom-b.top+12,px=p.left-b.left,py=p.top-b.top+p.height/2,xm=Math.max(t.right-b.left+40,px-200);
      path.setAttribute('d','M'+x0+' '+y0+' H'+xm+' C '+(xm+70)+' '+y0+', '+(xm+50)+' '+py+', '+(xm+130)+' '+py+' H'+px);
      var len=path.getTotalLength();path.style.strokeDasharray=len;band.style.setProperty('--len',len);
    }
    draw();window.addEventListener('resize',draw);if(document.fonts)document.fonts.ready.then(draw);
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){draw();band.classList.add('e5-on');io.disconnect();}});},{threshold:.35});
    io.observe(band);
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
