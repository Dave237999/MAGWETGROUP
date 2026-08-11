document.addEventListener('DOMContentLoaded',function(){
  // AOS init
  if(window.AOS) AOS.init({duration:700,once:true});

  // Year
  const yearEl=document.getElementById('year');
  if(yearEl) yearEl.textContent=new Date().getFullYear();

  // Mobile nav toggle
  const navToggle=document.getElementById('navToggle');
  const navList=document.getElementById('navList');
  navToggle?.addEventListener('click',()=>navList.classList.toggle('open'));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href=this.getAttribute('href');
      if(!href) return;
      if(href.startsWith('#')){
        e.preventDefault();
        const target=document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start',inline:'nearest'});
      } else if(href.endsWith('.html') && location.pathname.endsWith(href) ){
        // same page anchor handled above
      } else {
        // allow default navigation
      }
      navList.classList.remove('open');
    });
  });

  // Header scroll behavior
  const header=document.getElementById('siteHeader');
  const offset=50;
  const onScroll=()=>{
    if(window.scrollY>offset) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    // back-to-top
    const btt=document.getElementById('backToTop');
    if(btt) { if(window.scrollY>300) btt.classList.add('show'); else btt.classList.remove('show'); }
  };
  window.addEventListener('scroll',onScroll);
  onScroll();

  // Back to top
  const btt=document.getElementById('backToTop');
  btt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Active nav link highlighting using IntersectionObserver
  const sections=document.querySelectorAll('main section[id], header + section[id], section[id]');
  const navLinks=document.querySelectorAll('.nav-link');
  if('IntersectionObserver' in window && sections.length){
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const id=entry.target.id;
        const link=document.querySelector('.nav-link[href$="#'+id+'"], .nav-link[href*="'+id+'.html"]');
        if(entry.isIntersecting){
          navLinks.forEach(n=>n.classList.remove('active'));
          if(link) link.classList.add('active');
        }
      });
    },{root:null,threshold:0.45});
    sections.forEach(s=>obs.observe(s));
  } else {
    // fallback: update on scroll
    window.addEventListener('scroll',()=>{
      let current='';
      sections.forEach(s=>{ const rect=s.getBoundingClientRect(); if(rect.top<=120) current=s.id; });
      navLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href')?.includes(current) ));
    });
  }
});
