// ---------- ROOM DATA ----------
const ROOMS = {
  obyvacka: {
    photos:['img/obyvacka-1.jpg','img/obyvacka-2.jpg','img/obyvacka-3.jpg','img/obyvacka-4.jpg'],
    sk:{t:'Obývačka', d:'Obývacia časť je otvorená do záhrady a prirodzene nadväzuje na terasu. Krb, veľké presklenie a pokojná farebnosť robia z priestoru hlavné miesto na spoločné chvíle.'},
    en:{t:'Living room', d:'The living area opens naturally toward the garden and terrace. A fireplace, large glazing and calm materials make it the central space for everyday family life.'}
  },
  kuchyna: {
    photos:['img/kuchyna-1.jpg','img/kuchyna-2.jpg','img/kuchyna-3.jpg','img/kuchyna-4.jpg'],
    sk:{t:'Kuchyňa', d:'Kuchyňa je riešená čisto a prakticky, s ostrovčekom ako prirodzeným centrom dennej zóny. Materiály pôsobia teplo, no zároveň zostávajú nenápadné.'},
    en:{t:'Kitchen', d:'The kitchen is clean and practical, with the island as a natural centre of the day area. The materials feel warm without becoming visually heavy.'}
  },
  spalna: {
    photos:['img/spalna-1.jpg','img/spalna-2.jpg','img/spalna-3.jpg'],
    sk:{t:'Hlavná spálňa', d:'Hlavná spálňa je jednoduchá a pokojná, s veľkým oknom do záhrady a dostatkom priestoru na úložné riešenia.'},
    en:{t:'Master bedroom', d:'The main bedroom is calm and simple, with a large window facing the garden and enough room for built-in storage.'}
  },
  detska: {
    photos:['img/detska-1.jpg','img/detska-2.jpg','img/detska-3.jpg','img/detska-4.jpg'],
    sk:{t:'Detská izba', d:'Detská izba má vlastný charakter, ale stále zostáva praktická. Vstavané prvky šetria miesto a nechávajú priestor na hru aj učenie.'},
    en:{t:"Children's room", d:'The room has character while staying practical. Built-in elements save space and leave room for play as well as study.'}
  },
  kupelna: {
    photos:['img/kupelna-1.jpg','img/kupelna-2.jpg','img/kupelna-3.jpg','img/kupelna-4.jpg'],
    sk:{t:'Kúpeľňa', d:'Kúpeľňa kombinuje výraznejší obklad s jednoduchými detailmi. Sprchový kút za sklom a úložné riešenia držia priestor čistý a praktický.'},
    en:{t:'Bathroom', d:'The bathroom combines a more distinctive surface with simple details. A glass walk-in shower and storage solutions keep the space clean and practical.'}
  },
  pracovna: {
    photos:['img/pracovna-1.jpg','img/pracovna-2.jpg'],
    sk:{t:'Pracovňa', d:'Pracovňa je oddelená od hlavnej dennej časti domu, takže sa hodí na prácu z domu, administratívu alebo pokojné štúdium.'},
    en:{t:'Home office', d:'The study is separated from the main day area, making it suitable for working from home, administration or focused study.'}
  },
  chodba: {
    photos:['img/chodba-1.jpg','img/chodba-2.jpg','img/chodba-3.jpg'],
    sk:{t:'Vstupná chodba', d:'Vstupná časť je riešená prakticky, s miestom na odkladanie a s materiálmi, ktoré nadväzujú na zvyšok interiéru.'},
    en:{t:'Entrance hall', d:'The entrance area is practical, with storage space and materials that connect naturally to the rest of the interior.'}
  }
};

let currentLang = 'sk';
let currentRoom = 'obyvacka';
let currentPhotoIdx = 0;

const roomPhoto = document.getElementById('roomPhoto');
const roomTitle = document.getElementById('roomTitle');
const roomDesc = document.getElementById('roomDesc');
const roomCount = document.getElementById('roomCount');
const roomDots = document.getElementById('roomDots');

function buildDots(count){
  roomDots.innerHTML = '';
  for(let i=0;i<count;i++){
    const d=document.createElement('button');
    d.className='room-dot'+(i===currentPhotoIdx?' active':'');
    d.setAttribute('aria-label','Foto '+(i+1));
    d.addEventListener('click',()=>{ currentPhotoIdx=i; updateRoomPhoto(); });
    roomDots.appendChild(d);
  }
}

function updateRoomPhoto(){
  const photos = ROOMS[currentRoom].photos;
  roomPhoto.style.opacity='0';
  setTimeout(()=>{
    roomPhoto.style.backgroundImage=`url('${photos[currentPhotoIdx]}')`;
    roomPhoto.style.opacity='1';
  },180);
  roomDots.querySelectorAll('.room-dot').forEach((d,i)=>d.classList.toggle('active',i===currentPhotoIdx));
}

function showRoom(key, resetPhoto=true){
  currentRoom = key;
  if(resetPhoto) currentPhotoIdx = 0;
  const r = ROOMS[key];
  roomPhoto.style.opacity='0';
  setTimeout(()=>{
    roomPhoto.style.backgroundImage=`url('${r.photos[currentPhotoIdx]}')`;
    roomPhoto.style.opacity='1';
  },180);
  roomTitle.textContent = r[currentLang].t;
  roomDesc.textContent = r[currentLang].d;
  roomCount.textContent = '('+r.photos.length+')';
  document.querySelectorAll('.room-tab').forEach(t=>t.classList.toggle('active',t.dataset.room===key));
  buildDots(r.photos.length);
}

document.querySelectorAll('.room-tab').forEach(tab=>{
  tab.addEventListener('click',()=> showRoom(tab.dataset.room));
});

document.getElementById('roomPrev').addEventListener('click',()=>{
  const n = ROOMS[currentRoom].photos.length;
  currentPhotoIdx=(currentPhotoIdx-1+n)%n;
  updateRoomPhoto();
});
document.getElementById('roomNext').addEventListener('click',()=>{
  const n = ROOMS[currentRoom].photos.length;
  currentPhotoIdx=(currentPhotoIdx+1)%n;
  updateRoomPhoto();
});

roomPhoto.addEventListener('click',()=> openLightbox(ROOMS[currentRoom].photos, currentPhotoIdx));
document.getElementById('roomGalleryBtn').addEventListener('click',()=> openLightbox(ROOMS[currentRoom].photos, currentPhotoIdx));

// ---------- HEADER SCROLL + AUTO-HIDE ----------
const hd = document.getElementById('hd');
let lastScrollY = 0;
let hdTicking = false;
function updateHd(){
  const y = window.scrollY;
  hd.classList.toggle('scrolled', y > 60);
  if(y > 120){
    if(y < lastScrollY - 4){ hd.classList.remove('hd-hidden'); }
    else if(y > lastScrollY + 4){ hd.classList.add('hd-hidden'); }
  } else {
    hd.classList.remove('hd-hidden');
  }
  lastScrollY = y;
  hdTicking = false;
}
window.addEventListener('scroll', ()=>{ if(!hdTicking){ requestAnimationFrame(updateHd); hdTicking=true; } });
document.addEventListener('mousemove', e=>{ if(e.clientY < 80) hd.classList.remove('hd-hidden'); });

// ---------- BURGER ----------
const burger = document.getElementById('burger');
const hdNav = document.getElementById('hdNav');
function closeNav(){ hdNav.classList.remove('open'); burger.classList.remove('x'); hd.classList.remove('nav-open'); }
burger.addEventListener('click', ()=>{ hdNav.classList.toggle('open'); burger.classList.toggle('x'); hd.classList.toggle('nav-open'); });
hdNav.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeNav));
hdNav.addEventListener('click', e=>{ if(e.target === hdNav) closeNav(); });

// ---------- LANGUAGE ----------
function setLang(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-sk]').forEach(el=>{
    const v = el.getAttribute('data-'+lang); if(v!==null) el.textContent = v;
  });
  document.querySelectorAll('[data-ph-sk]').forEach(el=>{
    const v = el.getAttribute('data-ph-'+lang); if(v!==null) el.placeholder = v;
  });
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  // refresh room text
  roomTitle.textContent = ROOMS[currentRoom][lang].t;
  roomDesc.textContent = ROOMS[currentRoom][lang].d;
}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click', ()=> setLang(b.dataset.lang)));

// ---------- LIGHTBOX ----------
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbThumbs = document.getElementById('lbThumbs');
let lbList = [], lbIndex = 0;

function buildThumbs(){
  lbThumbs.innerHTML = '';
  lbList.forEach((src,i)=>{
    const t=document.createElement('div');
    t.className='lb-thumb'+(i===lbIndex?' active':'');
    t.style.backgroundImage=`url('${src}')`;
    t.addEventListener('click',()=>{lbIndex=i;update();});
    lbThumbs.appendChild(t);
  });
}
function update(){
  lbImg.src=lbList[lbIndex];
  lbCounter.textContent=(lbIndex+1)+' / '+lbList.length;
  lbThumbs.querySelectorAll('.lb-thumb').forEach((t,i)=>t.classList.toggle('active',i===lbIndex));
  const a=lbThumbs.querySelector('.lb-thumb.active');
  if(a) a.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'});
}
function openLightbox(list,index){
  lbList=list; lbIndex=index; buildThumbs(); update();
  lb.classList.add('open'); document.body.style.overflow='hidden';
}
function closeLightbox(){ lb.classList.remove('open'); document.body.style.overflow=''; }
function step(d){ lbIndex=(lbIndex+d+lbList.length)%lbList.length; update(); }
document.getElementById('lbClose').addEventListener('click',closeLightbox);
document.getElementById('lbPrev').addEventListener('click',()=>step(-1));
document.getElementById('lbNext').addEventListener('click',()=>step(1));
lb.addEventListener('click',e=>{ if(e.target===lb||e.target.classList.contains('lb-stage')) closeLightbox(); });
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open')) return;
  if(e.key==='Escape') closeLightbox();
  if(e.key==='ArrowLeft') step(-1);
  if(e.key==='ArrowRight') step(1);
});

// Exterior / wellness data-full items
document.querySelectorAll('[data-full]').forEach(el=>{
  el.addEventListener('click',()=>{
    const group=[...el.closest('section').querySelectorAll('[data-full]')].map(x=>x.dataset.full);
    const idx=group.indexOf(el.dataset.full);
    openLightbox(group, idx<0?0:idx);
  });
});

// ---------- FLOOR PLAN VIEWER ----------
const FLOOR_IMAGES = {
  '1-3d':   'img/podorys-1np-3d.jpg',
  '1-plan': 'img/podorys-1np-plan.jpg',
  '2-3d':   'img/podorys-2np-3d.jpg',
  '2-plan': 'img/podorys-2np-plan.jpg'
};
const FLOOR_ALT = {
  sk: { '1-3d':'1. podlažie — 3D model','1-plan':'1. podlažie — Pôdorys','2-3d':'2. podlažie — 3D model','2-plan':'2. podlažie — Pôdorys' },
  en: { '1-3d':'1st floor — 3D model','1-plan':'1st floor — Floor plan','2-3d':'2nd floor — 3D model','2-plan':'2nd floor — Floor plan' }
};
let fvFloor = '1', fvView = '3d';
const fvImg = document.getElementById('fvImg');

const FLOOR_SCALE = { '1-3d':1.2, '1-plan':1, '2-3d':1, '2-plan':1 };

function updateFloorView(){
  const key = fvFloor + '-' + fvView;
  fvImg.classList.add('fading');
  setTimeout(()=>{
    fvImg.src = FLOOR_IMAGES[key];
    fvImg.alt = (FLOOR_ALT[currentLang] || FLOOR_ALT.sk)[key];
    fvImg.dataset.full = FLOOR_IMAGES[key];
    fvImg.style.transform = 'scale(' + (FLOOR_SCALE[key] || 1) + ')';
    fvImg.classList.remove('fading');
  }, 200);
}

document.querySelectorAll('.fv-floor').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    fvFloor = btn.dataset.floor;
    document.querySelectorAll('.fv-floor').forEach(b=>b.classList.toggle('active', b===btn));
    updateFloorView();
  });
});
document.querySelectorAll('.fv-view').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    fvView = btn.dataset.view;
    document.querySelectorAll('.fv-view').forEach(b=>b.classList.toggle('active', b===btn));
    updateFloorView();
  });
});

// Floor plan lightbox on click
if(fvImg){
  fvImg.addEventListener('click', ()=>{
    const allKeys = [fvFloor+'-3d', fvFloor+'-plan'];
    const imgs = allKeys.map(k => FLOOR_IMAGES[k]);
    const idx = fvView === '3d' ? 0 : 1;
    openLightbox(imgs, idx);
  });
}

// ---------- VÝHODY TAP-TO-EXPAND (MOBILE) ----------
document.querySelectorAll('.vy-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    if(window.innerWidth > 900) return;
    const wasOpen = card.classList.contains('open');
    document.querySelectorAll('.vy-card.open').forEach(c=>c.classList.remove('open'));
    if(!wasOpen) card.classList.add('open');
  });
});

// ---------- SCROLL PROGRESS INDICATOR ----------
const scrollProgressBar = document.getElementById('scrollProgress');
function updateScrollProgress(){
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
  scrollProgressBar.style.width = pct + '%';
}

// ---------- SCROLL REVEAL (IntersectionObserver) ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScrollReveal(){
  if(prefersReducedMotion) return;
  const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-scale,.stagger-children');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// ---------- STAT COUNTER ANIMATION ----------
let statsAnimated = false;
function animateCounters(){
  if(statsAnimated || prefersReducedMotion) return;
  const statNums = document.querySelectorAll('.intro-facts .if-num');
  if(!statNums.length) return;

  const rect = statNums[0].closest('.intro-facts').getBoundingClientRect();
  if(rect.top > window.innerHeight * 0.85) return;

  statsAnimated = true;
  statNums.forEach(el=>{
    const target = parseInt(el.textContent, 10);
    if(isNaN(target)) return;
    el.classList.add('counting');
    const duration = 1200;
    const start = performance.now();
    function tick(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if(progress < 1) requestAnimationFrame(tick);
      else { el.textContent = target; el.classList.remove('counting'); }
    }
    requestAnimationFrame(tick);
  });
}

// ---------- HERO PARALLAX ----------
const heroPhoto = document.querySelector('.hero-photo');
function updateParallax(){
  if(prefersReducedMotion || !heroPhoto) return;
  const y = window.scrollY;
  if(y < window.innerHeight){
    heroPhoto.style.transform = 'translateY(' + (y * 0.25) + 'px) scale(' + (1 + Math.max(0, 0.06 - y * 0.0001)) + ')';
  }
}

// ---------- UNIFIED SCROLL HANDLER ----------
let scrollTick = false;
window.addEventListener('scroll', ()=>{
  if(!scrollTick){
    requestAnimationFrame(()=>{
      updateHd();
      updateScrollProgress();
      updateParallax();
      animateCounters();
      scrollTick = false;
    });
    scrollTick = true;
  }
}, { passive: true });

// ---------- CONTACT FORM VALIDATION ----------
const contactForm = document.querySelector('.contact-form');
if(contactForm){
  const submitBtn = contactForm.querySelector('.cf-submit');

  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let valid = true;

    inputs.forEach(input=>{
      if(!input.checkValidity()){
        valid = false;
        input.reportValidity();
      }
    });

    if(!valid) return;

    submitBtn.classList.add('sending');
    const btnText = submitBtn.textContent;
    submitBtn.textContent = currentLang === 'sk' ? 'Odosielam...' : 'Sending...';

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute('action');

    if(action && !action.includes('REPLACE_FORM_ID')){
      fetch(action, { method:'POST', body: formData, headers:{'Accept':'application/json'} })
        .then(r=>{
          if(r.ok){
            showFormSuccess();
          } else {
            submitBtn.classList.remove('sending');
            submitBtn.textContent = btnText;
            alert(currentLang === 'sk' ? 'Chyba pri odosielaní. Skúste znova.' : 'Error sending. Please try again.');
          }
        })
        .catch(()=>{
          submitBtn.classList.remove('sending');
          submitBtn.textContent = btnText;
          alert(currentLang === 'sk' ? 'Chyba pripojenia. Skúste znova.' : 'Connection error. Please try again.');
        });
    } else {
      setTimeout(()=>{ showFormSuccess(); }, 800);
    }
  });

  function showFormSuccess(){
    contactForm.innerHTML = '<div class="cf-success show"><strong>' +
      (currentLang === 'sk' ? 'Ďakujeme za váš záujem' : 'Thank you for your interest') +
      '</strong>' +
      (currentLang === 'sk' ? 'Ozveme sa vám čo najskôr.' : 'We will get back to you soon.') +
      '</div>';
  }
}

// ---------- INIT ----------
roomPhoto.style.transition='opacity .4s';
showRoom('obyvacka');
initScrollReveal();
updateScrollProgress();
