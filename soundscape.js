// Original generative score: sparse felt-like keys, warm harmonic overtones and stereo reverb.
// Original synthesized music; browser autoplay restrictions are respected.
(()=>{
let context,master,dry,wet,reverb,enabled=true,hidden=document.hidden,interval=null,next=0,step=0,volume=.35,suspendTimer;
const bpm=58,beat=60/bpm;
const chords=[[57,60,64,71],[53,57,60,64],[48,55,59,62],[55,59,62,69]];
const melody=[0,2,3,2,1,3,2,1,0,2,1,3,2,0,3,1];
const active=new Set();
function setup(){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('Audio unsupported');context=new Audio();master=context.createGain();master.gain.value=volume*.5;master.connect(context.destination);dry=context.createGain();dry.gain.value=.65;dry.connect(master);wet=context.createGain();wet.gain.value=.35;wet.connect(master);reverb=context.createConvolver();const length=Math.floor(context.sampleRate*3.4),ir=context.createBuffer(2,length,context.sampleRate);for(let c=0;c<2;c++){const a=ir.getChannelData(c);let memory=0;for(let i=0;i<length;i++){memory=memory*.62+(Math.random()*2-1)*.38;a[i]=memory*Math.pow(1-i/length,3.6);}}reverb.buffer=ir;reverb.connect(wet);}
function note(midi,time,duration=4.5,velocity=.12,pan=0){const f=440*Math.pow(2,(midi-69)/12),p=context.createStereoPanner(),env=context.createGain();p.pan.value=pan;env.connect(p);p.connect(dry);p.connect(reverb);env.gain.setValueAtTime(0,time);env.gain.linearRampToValueAtTime(velocity,time+.035);env.gain.exponentialRampToValueAtTime(.0001,time+duration);const voices=[];[[1,1],[2,.16],[3,.035]].forEach(([ratio,amp])=>{const o=context.createOscillator(),level=context.createGain();o.type='sine';o.frequency.value=f*ratio;level.gain.value=amp;o.connect(level);level.connect(env);o.start(time);o.stop(time+duration+.05);voices.push([o,level]);active.add(o);o.onended=()=>{active.delete(o);o.disconnect();level.disconnect();};});setTimeout(()=>{env.disconnect();p.disconnect();},Math.max(0,(time-context.currentTime+duration+.2)*1000));}
function tick(){if(!enabled||hidden||!context||context.state!=='running')return;while(next<context.currentTime+.15){const bar=Math.floor(step/8)%4,position=step%8,chord=chords[bar];if(position===0){note(chord[0],next,7,.10,-.25);note(chord[2],next+.12,6,.055,.25);}if(position===1||position===4||position===6){const index=melody[Math.floor(step/2)%melody.length];note(chord[index]+12,next,4.5,.075,position===1?-.38:.35);}step++;next+=beat;}}
function schedule(){clearInterval(interval);next=context.currentTime+.08;interval=setInterval(tick,120);tick();}
function notify(){document.dispatchEvent(new CustomEvent('end-audio-state',{detail:{enabled,playing:enabled&&!hidden&&context?.state==='running'}}));}
function sync(){if(enabled&&!hidden&&context?.state==='running'){master.gain.cancelScheduledValues(context.currentTime);master.gain.setTargetAtTime(volume*.5,context.currentTime,.15);if(!interval)schedule();}else{clearInterval(interval);interval=null;}notify();}
function start(){if(!enabled||hidden)return;clearTimeout(suspendTimer);try{if(!context){setup();context.addEventListener('statechange',sync);}if(context.state==='running')sync();else{context.resume().then(sync).catch(notify);notify();}}catch{enabled=false;notify();}}
function toggle(){enabled=!enabled;if(enabled)start();else{clearInterval(interval);interval=null;if(context){master.gain.cancelScheduledValues(context.currentTime);master.gain.setTargetAtTime(0,context.currentTime,.06);clearTimeout(suspendTimer);suspendTimer=setTimeout(()=>{if(!enabled)context.suspend().catch(()=>{});},220);}notify();}return enabled;}
function effect(frequency=440,duration=.4){if(!enabled||hidden||!context||context.state!=='running')return;const midi=69+12*Math.log2(Math.max(130,Math.min(frequency,900))/440);note(midi,context.currentTime,duration+1.1,.08,.05);}
function setVolume(value){volume=Math.min(1,Math.max(0,value));if(master&&enabled)master.gain.setTargetAtTime(volume*.5,context.currentTime,.08);}
function setHidden(value){hidden=value;if(value){clearInterval(interval);interval=null;if(context)context.suspend().catch(()=>{});notify();}else if(enabled)start();}
// A pending autoplay attempt must never lock the mute control.
function unlock(event){if(event.target instanceof Element&&event.target.closest('.sound-toggle'))return;if(event.type==='keydown'&&(event.repeat||event.ctrlKey||event.metaKey||event.altKey))return;if(enabled&&context?.state!=='running')start();}
document.addEventListener('pointerdown',unlock,{passive:true});
document.addEventListener('keydown',unlock);
window.EndAudio={toggle,effect,setVolume,setHidden,start};
})();
