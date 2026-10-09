'use strict';
const profile=window.PROFILE;
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
const storageKey='vesiloe-end-explorer-v2';
function readStorage(){try{return JSON.parse(localStorage.getItem(storageKey))||{};}catch{return {};}}
const saved=readStorage();
let progress={crystals:[...new Set(Array.isArray(saved.crystals)?saved.crystals.filter(n=>Number.isInteger(n)&&n>=0&&n<4):[])],teleported:!!saved.teleported,opened:!!saved.opened,defeated:!!saved.defeated,bloom:!!saved.bloom};
let portalWelcomeSeen=!!(saved.portalWelcomeSeen||saved.opened);
let reduced=typeof saved.reduced==='boolean'?saved.reduced:matchMedia('(prefers-reduced-motion: reduce)').matches;
function save(){try{localStorage.setItem(storageKey,JSON.stringify({...progress,reduced,portalWelcomeSeen}));}catch{}}
$$('[data-content]').forEach(el=>el.textContent=profile[el.dataset.content]||'');
$('#year').textContent=new Date().getFullYear();
document.title=`${profile.name} - The End`;
if(profile.name!=='VesiloeLichiko'){$('h1').textContent=profile.name;$('h1').style.overflowWrap='anywhere';}
$('h1').setAttribute('aria-label',profile.name);
$('.header .brand').setAttribute('aria-label',`${profile.name} - на главную`);
profile.interests.forEach(text=>$('.interests').append(node('span','',text)));
if(profile.achievements?.length){
 const section=node('section','section wrap personal-path');section.id='personal-achievements';
 const heading=node('h2','','Опыт, который ');heading.append(node('em','','со мной.'));
 section.append(node('p','eyebrow','ЛИЧНЫЙ ПУТЬ / 2022 →'),heading,node('p','path-intro','От колледжа и первой практики - к кибербезопасности.'));
 const grid=node('div','path-grid');
 profile.achievements.forEach(item=>{
  const card=node('article','path-card');card.dataset.tone=item.tone||'violet';
  const meta=node('div','path-meta');meta.append(node('span','',item.label||'ДОСТИЖЕНИЕ'),node('span','',item.date||''));
  const img=node('img','path-art');img.src=`assets/item-${item.art||'code'}.svg`;img.alt='';img.loading='lazy';
  card.append(meta,img,node('h3','',item.title),node('p','',item.text));grid.append(card);
 });
 section.append(grid);$('#achievements').before(section);
}
$$('[data-social]').forEach(link=>link.href=profile[link.dataset.social]);
if(profile.instagram){const old=$('.instagram'),link=node('a');link.innerHTML=old.innerHTML;link.href=profile.instagram;link.target='_blank';link.rel='noopener noreferrer';$('small',link).textContent='Instagram';$('.social-top>span',link).textContent='↗';old.replaceWith(link);}
let toastTimer;
function toast(message){$('.toast').textContent=message;$('.toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').classList.remove('visible'),4200);}
let sound=true;
function tone(frequency=523,duration=.3){window.EndAudio.effect(frequency,duration);}
function renderSound(playing=false){const button=$('.sound-toggle');button.setAttribute('aria-pressed',String(sound));button.setAttribute('aria-label',sound?'Выключить звук':'Включить звук');button.dataset.playing=String(playing);button.title=sound?(playing?'Музыка играет':'Музыка включена - начнётся после первого нажатия'):'Музыка выключена';button.style.color=sound?'var(--green)':'';$('path',button).setAttribute('d',sound?'M4 9h4l5-4v14l-5-4H4zM16 8a6 6 0 0 1 0 8M19 5a10 10 0 0 1 0 14':'M4 9h4l5-4v14l-5-4H4zM17 9l5 6m0-6-5 6');}
document.addEventListener('end-audio-state',event=>{sound=event.detail.enabled;renderSound(event.detail.playing);});
$('.sound-toggle').addEventListener('click',()=>{window.EndAudio.toggle();toast(sound?'Тихие острова · музыка включена':'Музыка выключена');});
renderSound();window.EndAudio.start();
const dialog=$('#detail-dialog');const dialogContent=$('.dialog-content');let previousFocus;
function closeDialog(){dialog.close();if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});}
function showDialog(parts,cls=''){previousFocus=document.activeElement;dialogContent.className=`dialog-content ${cls}`;dialogContent.replaceChildren(...parts);const heading=$('h2',dialogContent);if(heading){heading.id='dialog-title';dialog.setAttribute('aria-labelledby','dialog-title');}if(!dialog.open)dialog.showModal();$('.dialog-close').focus({preventScroll:true});tone(330,.2);}
$('.dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
function openProject(item){const img=node('img');img.src=`assets/item-${item.art}.svg`;img.alt='';const tags=node('div','dialog-tags');item.tags.forEach(tag=>tags.append(node('span','',tag)));const action=node('a','button primary',`${item.action} ↗`);action.href=item.url;if(item.url.startsWith('#'))action.addEventListener('click',closeDialog);else{action.target='_blank';action.rel='noopener noreferrer';}showDialog([img,node('p','eyebrow',item.subtitle),node('h2','',item.title),node('p','',item.detail),tags,action]);}
function renderInventory(filter='all'){$('.project-grid').replaceChildren();const items=profile.projects.filter(item=>filter==='all'||item.category===filter);items.forEach(item=>{const card=node('button','project-card');card.setAttribute('aria-label',`Осмотреть: ${item.title}`);const art=node('div','project-art'),img=node('img');img.src=`assets/item-${item.art}.svg`;img.alt='';img.loading='lazy';art.append(img,node('span','item-rarity',item.category==='education'?'ОБРАЗОВАНИЕ':item.category==='experience'?'ПРАКТИКА':item.category==='games'?'ПРИКЛЮЧЕНИЯ':'СОЗИДАНИЕ'),node('span','item-no',`0${profile.projects.indexOf(item)+1}`));const body=node('div','project-body');const open=node('div','project-open','Осмотреть предмет');open.append(node('span','','↗'));body.append(node('p','project-label',item.subtitle),node('h3','',item.title),node('p','project-description',item.description),open);card.append(art,body);card.addEventListener('click',()=>openProject(item));card.addEventListener('pointermove',event=>{if(reduced)return;const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${(event.clientX-r.left)/r.width*100}%`);card.style.setProperty('--my',`${(event.clientY-r.top)/r.height*100}%`);});$('.project-grid').append(card);});$('.inventory-count').textContent=`${items.length} / ${profile.projects.length} ПРЕДМЕТОВ`;}
renderInventory();$('[data-filter="all"] span').textContent=String(profile.projects.length).padStart(2,'0');
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{$$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderInventory(button.dataset.filter);tone(262,.15);}));
const crystalNames=['Эхо пустоты','Любопытство','Искра созидания','Сердце Энда'];
const crystalSections=['#home','#about','#inventory','#portal'];
function updateProgress(){const replay=$('.boss-replay');if(replay)replay.hidden=!progress.defeated;const count=progress.crystals.length;$$('.crystal-total').forEach(el=>el.textContent=`${count} / 4`);$$('[data-crystal]').forEach(button=>{const id=Number(button.dataset.crystal),collected=progress.crystals.includes(id);button.classList.toggle('collected',collected);button.setAttribute('aria-label',`${collected?'Кристалл уже собран':'Собрать кристалл'} ${id+1}: ${crystalNames[id]}`);button.setAttribute('aria-pressed',String(collected));const caption=$('.crystal-caption b',button);if(caption)caption.textContent=collected?'В твоём инвентаре':'Нажми, чтобы забрать';});$$('[data-slot]').forEach(el=>{const id=Number(el.dataset.slot),done=progress.crystals.includes(id);el.classList.toggle('filled',done);el.textContent=done?'◆':'◇';el.setAttribute('aria-label',`${crystalNames[id]}: ${done?'собран':'не найден'}`);});$$('.gate-eye').forEach(el=>el.classList.toggle('lit',progress.crystals.includes(Number(el.dataset.side))));$('.portal-visual').classList.toggle('ready',progress.defeated);const action=$('.portal-action');action.disabled=count<4;action.classList.toggle('ready',count===4);action.replaceChildren(node('span','',count===4?(progress.defeated?'Войти в портал':'Сразиться с драконом'):'Найдено'),node('span','crystal-total',`${count} / 4`),node('span','',count===4?'↗':'◇'));$('#portal-surface').setAttribute('aria-label',count===4?(progress.defeated?'Войти в портал':'Сразиться с драконом'):'Осмотреть портал');document.body.classList.toggle('bloom',progress.bloom);renderAchievements();save();}
const advancementQueue=[];
let advancementBusy=false,previousAdvancements=null;
function advancementIcon(name){const img=node('img');img.src='assets/adv-'+name+'.svg';img.alt='';img.width=48;img.height=48;return img;}
function announceAdvancement(item){advancementQueue.push(item);playNextAdvancement();}
function playNextAdvancement(){if(advancementBusy||!advancementQueue.length)return;advancementBusy=true;const item=advancementQueue.shift(),notice=$('.advancement-notice'),copy=node('div');copy.append(node('span','','Достижение получено!'),node('strong','',item.title));notice.replaceChildren(advancementIcon(item.icon),copy);notice.classList.add('visible');tone(659,.35);setTimeout(()=>tone(988,.55),170);setTimeout(()=>{notice.classList.remove('visible');setTimeout(()=>{advancementBusy=false;playNextAdvancement();},350);},4800);}
function renderAchievements(){
 const achievements=[
  {title:'Конец?',reference:'THE END?',text:'Добро пожаловать по ту сторону портала.',hint:'Зайти в это измерение. Ты уже здесь - первое достижение твоё.',icon:'eye',done:true},
  {title:'Зрительный контакт',reference:'НЕ СМОТРИ ЕМУ В ГЛАЗА',text:'Иногда один взгляд меняет координаты.',hint:'Нажми на эндермена, поздоровайся с ним или подари ему блок.',icon:'pearl',done:progress.teleported},
  {title:'Алмазы! Почти.',reference:'DIAMONDS!',text:'Фиолетовые. Парят. Тоже драгоценные.',hint:'Собери четыре кристалла: на главном острове, у биографии, под инвентарём и возле портала.',icon:'crystal',done:progress.crystals.length===4},
  {title:'Освободите Энд',reference:'FREE THE END',text:'Конец - это только начало.',hint:'Собери четыре кристалла и победи дракона. Кристаллы - твоё оружие, победа откроет портал.',icon:'egg',done:progress.defeated}
 ];
 const grid=$('#achievements .achievement-grid');grid.classList.add('advancement-tree');grid.replaceChildren();
 achievements.forEach((item,index)=>{const card=node('button','achievement-card advancement-card'+(item.done?' unlocked':''));card.setAttribute('aria-label',item.title+' - '+(item.done?'Получено':'Узнать условие'));const frame=node('span','achievement-icon advancement-frame'),copy=node('span','advancement-copy');frame.append(advancementIcon(item.icon));copy.append(node('span','advancement-reference',item.reference),node('strong','advancement-title',item.title),node('span','advancement-description',item.text));card.append(node('span','achievement-marker',item.done?'✓ ПОЛУЧЕНО':'◇ НЕ ОТКРЫТО'),frame,copy,node('span','advancement-inspect','Условие достижения ↗'));card.addEventListener('click',()=>showDialog([advancementIcon(item.icon),node('p','eyebrow',item.done?'ДОСТИЖЕНИЕ ПОЛУЧЕНО':'ПУТЬ ИССЛЕДОВАТЕЛЯ'),node('h2','',item.title),node('p','',item.hint),node('p','advancement-note','Отсылка к Minecraft. Прогресс относится к твоему путешествию по этому сайту.')]));grid.append(card);if(previousAdvancements&&!previousAdvancements[index]&&item.done)announceAdvancement(item);});
 previousAdvancements=achievements.map(item=>item.done);$('#achievement-count').textContent=achievements.filter(item=>item.done).length;
}

$$('[data-crystal]').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.dataset.crystal);if(progress.crystals.includes(id)){toast(`${crystalNames[id]} уже в инвентаре.`);return;}progress.crystals.push(id);updateProgress();tone([392,494,587,784][id],.8);toast(progress.crystals.length===4?'Все кристаллы собраны. Вызови дракона у портала!':`Найдено: ${crystalNames[id]} · ${progress.crystals.length} / 4`);burstAt(button,24);}));
function showHints(){const list=node('div','hint-list');const hints=['Над первым островом','Рядом с рассказом обо мне','Под предметами инвентаря','У самого портала'];hints.forEach((hint,i)=>{const link=node('a',progress.crystals.includes(i)?'done':'',`${i+1}. ${hint}`);link.href=crystalSections[i];link.append(node('span','',progress.crystals.includes(i)?'✓':'↗'));link.addEventListener('click',()=>{closeDialog();setTimeout(()=>{$(`[data-crystal="${i}"]`).focus({preventScroll:true});},100);});list.append(link);});showDialog([node('p','eyebrow','КАРТА ИССЛЕДОВАТЕЛЯ'),node('h2','','Четыре искры пустоты'),node('p','','Ищи парящие фиолетовые кристаллы. Нажми на кристалл, чтобы забрать его. Зелёный цвет означает, что он уже у тебя.'),list]);}
$('.hint-button').addEventListener('click',showHints);$('.dock-guide').addEventListener('click',showHints);
let entering=false;
function changeDimension(){progress.bloom=!progress.bloom;updateProgress();}
function enterPortal(){
 if(progress.crystals.length<4){showHints();return;}if(!progress.defeated){window.EndBoss.open();return;}if(entering)return;entering=true;
 const firstVisit=!portalWelcomeSeen;
 $('.portal-flash').classList.add('flash');tone(131,1.3);setTimeout(()=>tone(262,1),150);setTimeout(()=>tone(523,1),350);
 setTimeout(()=>{
  progress.opened=true;
  if(!firstVisit){changeDimension();return;}
  portalWelcomeSeen=true;updateProgress();
  const action=node('button','button primary',progress.bloom?'Вернуть фиолетовый Энд':'Разбудить другое измерение');
  action.addEventListener('click',()=>{changeDimension();closeDialog();});
  showDialog([node('div','secret-symbol','✦'),node('p','eyebrow','ДОСТИЖЕНИЕ ПОЛУЧЕНО'),node('h2','','Конец - это только начало.'),node('p','','Ты собрал свет, заглянул в пустоту и нашёл дорогу. Спасибо, что исследовал Энд. Попробуй изменить его атмосферу.'),action],'secret-dialog');
 },reduced?0:620);
 setTimeout(()=>{$('.portal-flash').classList.remove('flash');entering=false;},1400);
}

$('.portal-action').addEventListener('click',enterPortal);$('#portal-surface').addEventListener('click',enterPortal);
$('.reset-progress').addEventListener('click',()=>{const buttons=node('div','reset-actions');const reset=node('button','button primary','Начать заново'),cancel=node('button','text-link','Сохранить прогресс');reset.addEventListener('click',()=>{progress={crystals:[],teleported:false,opened:false,defeated:false,bloom:false};updateProgress();closeDialog();toast('Новый маршрут. Все кристаллы на своих местах.');});cancel.addEventListener('click',closeDialog);buttons.append(reset,cancel);showDialog([node('p','eyebrow','НОВОЕ ПУТЕШЕСТВИЕ'),node('h2','','Пройти путь ещё раз?'),node('p','','Кристаллы и достижения этого браузера будут сброшены. Личные данные и настройки сайта не изменятся.'),buttons]);});
$('.discord').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(profile.discord);toast(`Ник скопирован: ${profile.discord}`);tone(440,.3);}catch{showDialog([node('p','eyebrow','DISCORD'),node('h2','',profile.discord),node('p','','Автоматическое копирование недоступно. Выдели ник и скопируй его вручную.')]);}});
const mobileNav=$('#mobile-nav'),menu=$('.menu-toggle');
function closeMenu(){mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');}
menu.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});$$('a',mobileNav).forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)$$('.header nav a').forEach(link=>link.classList.toggle('active',link.hash===`#${entry.target.id}`));}),{rootMargin:'-10% 0px -60% 0px'});$$('section[id]').forEach(section=>sectionObserver.observe(section));
let scrollFrame=0;window.addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{const range=document.documentElement.scrollHeight-innerHeight;$('.reading-progress').style.width=`${range>0?scrollY/range*100:0}%`;scrollFrame=0;});},{passive:true});
const canvas=$('#particles'),ctx=canvas.getContext('2d');let width=innerWidth,height=innerHeight,frame=0,last=0,stars=[],sparks=[];
function resizeCanvas(){width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:width<700?25:60},()=>({x:Math.random()*width,y:Math.random()*height,size:Math.random()*1.8+.6,speed:Math.random()*.3+.08,phase:Math.random()*Math.PI*2}));if(reduced)draw(0);}
function draw(time){if(!ctx)return;ctx.clearRect(0,0,width,height);stars.forEach(star=>{if(!reduced){star.y-=star.speed;if(star.y<-5)star.y=height+5;}ctx.fillStyle=`rgba(191,141,234,${.15+(Math.sin(time*.0006+star.phase)+1)*.18})`;ctx.fillRect(star.x,star.y,star.size,star.size);});if(!reduced){sparks=sparks.filter(s=>s.life>0);sparks.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=.018;s.life-=.018;ctx.fillStyle=`rgba(221,184,255,${Math.max(0,s.life)})`;ctx.fillRect(s.x,s.y,3,3);});}}
function animate(time){frame=0;if(reduced||document.hidden)return;if(time-last>30){draw(time);last=time;}frame=requestAnimationFrame(animate);}
function startAnimation(){if(!frame&&!reduced&&!document.hidden)frame=requestAnimationFrame(animate);}
function burstAt(el,count){if(reduced)return;const r=el.getBoundingClientRect();for(let i=0;i<count;i++){const angle=Math.random()*Math.PI*2,speed=Math.random()*2+1;sparks.push({x:r.left+r.width/2,y:r.top+r.height/2,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1});}}
function setMotion(){document.documentElement.classList.toggle('reduce-motion',reduced);const button=$('.motion-toggle');button.setAttribute('aria-pressed',String(reduced));button.setAttribute('aria-label',reduced?'Включить анимации':'Отключить анимации');button.textContent=reduced?'▷':'Ⅱ';if(reduced){cancelAnimationFrame(frame);frame=0;draw(0);}else startAnimation();save();}
$('.motion-toggle').addEventListener('click',()=>{reduced=!reduced;setMotion();toast(reduced?'Анимации приостановлены':'Анимации включены');});
window.addEventListener('resize',resizeCanvas,{passive:true});
document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('tab-hidden',document.hidden);if(document.hidden){cancelAnimationFrame(frame);frame=0;window.EndAudio.setHidden(true);}else{startAnimation();window.EndAudio.setHidden(false);}});
$('.hero').addEventListener('pointermove',event=>{if(reduced||event.pointerType==='touch')return;$('.hero-landscape').style.setProperty('--scene-x',`${(event.clientX/innerWidth-.5)*-12}px`);$('.hero-landscape').style.setProperty('--scene-y',`${(event.clientY/innerHeight-.5)*-8}px`);});
resizeCanvas();setMotion();updateProgress();


