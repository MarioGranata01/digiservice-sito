(function(){
const TAU=Math.PI*2,RED='225,23,31',REDL='255,64,72';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ptr={x:0,y:0};
addEventListener('pointermove',e=>{ptr.x=(e.clientX/innerWidth-.5)*2;ptr.y=(e.clientY/innerHeight-.5)*2},{passive:true});
const rng=s=>()=>(s=s*16807%2147483647)/2147483647;
const sm=()=>{let x=0,y=0;return()=>{x+=(ptr.x-x)*.06;y+=(ptr.y-y)*.06;return[x,y]}};
const R3=(p,ry,rx)=>{let c=Math.cos(ry),s=Math.sin(ry);const x=p[0]*c+p[2]*s,z=-p[0]*s+p[2]*c;c=Math.cos(rx);s=Math.sin(rx);return[x,p[1]*c-z*s,p[1]*s+z*c]};
const P=(p,cx,cy,sc,D)=>{D=D||7;const k=D/(D-p[2]);return[cx+p[0]*sc*k,cy-p[1]*sc*k,k]};
function glow(ctx,x,y,r,a){a=a==null?1:a;const g=ctx.createRadialGradient(x,y,0,x,y,r*4);g.addColorStop(0,`rgba(${REDL},${a})`);g.addColorStop(.25,`rgba(${RED},${a*.45})`);g.addColorStop(1,`rgba(${RED},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*4,0,TAU);ctx.fill();ctx.fillStyle=`rgba(${RED},${Math.min(1,a+.15)})`;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill()}

function globe(o){o=o||{};
 const r=rng(11),N=o.n||260,pts=[],ed=[],dots=[],reds=new Set(),S=sm(),seen=new Set();
 for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,q=Math.sqrt(1-y*y),th=i*2.399963;pts.push([Math.cos(th)*q,y,Math.sin(th)*q])}
 pts.forEach((a,i)=>{pts.map((b,j)=>[j,(a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2]).filter(x=>x[0]!==i).sort((m,n)=>m[1]-n[1]).slice(0,3).forEach(([j])=>{const k=i<j?i+'_'+j:j+'_'+i;if(!seen.has(k)){seen.add(k);ed.push([i,j])}})});
 for(let i=0;i<(o.dots||1300);i++){const la=Math.asin(2*r()-1),lo=r()*TAU,f=Math.sin(lo*2+1)*Math.cos(la*3)+.6*Math.sin(lo*5)*Math.sin(la*2+1);if(f>.3)dots.push([Math.cos(la)*Math.cos(lo),Math.sin(la),Math.cos(la)*Math.sin(lo)])}
 while(reds.size<(o.reds||16))reds.add(Math.floor(r()*N));
 const rl=[...reds];
 return(ctx,w,h,t)=>{const[px,py]=S(),sc=Math.min(w,h)*.43*(o.scale||1),cx=w*(o.cx==null?.5:o.cx),cy=h*(o.cy==null?.5:o.cy),ry=t*.16+px*.35,rx=.25+py*.18;
  const g=ctx.createRadialGradient(cx-sc*.3,cy-sc*.35,sc*.1,cx,cy,sc*1.05);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.75,`rgba(${RED},.03)`);g.addColorStop(1,`rgba(${RED},.16)`);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,sc,0,TAU);ctx.fill();ctx.strokeStyle=`rgba(${RED},.35)`;ctx.lineWidth=1;ctx.stroke();
  const V=pts.map(p=>R3(p,ry,rx)),Q=V.map(v=>P(v,cx,cy,sc,9));
  ctx.lineWidth=.8;
  for(const[i,j]of ed){const z=(V[i][2]+V[j][2])/2;if(z<-.15)continue;ctx.strokeStyle=`rgba(${RED},${.1+.4*(z+.15)/1.15})`;ctx.beginPath();ctx.moveTo(Q[i][0],Q[i][1]);ctx.lineTo(Q[j][0],Q[j][1]);ctx.stroke()}
  for(const d of dots){const v=R3(d,ry,rx);if(v[2]<0)continue;const q=P(v,cx,cy,sc,9);ctx.fillStyle=`rgba(${RED},${.12+.5*v[2]})`;ctx.fillRect(q[0],q[1],1.6,1.6)}
  pts.forEach((p,i)=>{if(V[i][2]<-.1||reds.has(i))return;ctx.fillStyle=`rgba(120,128,140,${.3+.5*V[i][2]})`;ctx.beginPath();ctx.arc(Q[i][0],Q[i][1],2,0,TAU);ctx.fill()});
  rl.forEach(i=>{if(V[i][2]<-.3)return;glow(ctx,Q[i][0],Q[i][1],2.6+V[i][2]*1.6,.5+.5*Math.max(0,V[i][2]))});
  const pi=rl.find(i=>V[i][2]>.3);if(pi!=null){const f=(t%2.4)/2.4;ctx.strokeStyle=`rgba(${RED},${.6*(1-f)})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(Q[pi][0],Q[pi][1],6+f*sc*.18,0,TAU);ctx.stroke()}
 }}

function cloud(o){o=o||{};
 const r=rng(5),S=sm(),pts=[],ed=[],pins=[],FL=-.46,FY=-.64;
 const sp=[[-.78,-.12,.36],[-.42,.16,.5],[.02,.36,.64],[.5,.14,.52],[.84,-.1,.38],[0,-.12,.58]];
 sp.forEach((s,si)=>{for(let k=0;k<80;k++){const u=r()*2-1,th=r()*TAU,q=Math.sqrt(1-u*u);const p=[s[0]+s[2]*q*Math.cos(th),s[1]+s[2]*u,s[2]*q*Math.sin(th)*.75];if(p[1]<FL)p[1]=FL;if(sp.some((t,ti)=>ti!==si&&(p[0]-t[0])**2+(p[1]-t[1])**2+(p[2]/.75)**2<(t[2]*.96)**2))continue;pts.push(p)}});
 pts.forEach((a,i)=>{pts.map((b,j)=>[j,Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])]).filter(x=>x[0]>i&&x[1]<.36).sort((m,n)=>m[1]-n[1]).slice(0,2).forEach(([j])=>ed.push([i,j]))});
 for(let i=0;i<18;i++)pins.push([(r()*2-1)*1.35,FY,(r()*2-1)*.9,.5+r()*.9]);
 return(ctx,w,h,t)=>{const[px,py]=S(),sc=Math.min(w*.32,h*.46)*(o.scale||1),cx=w*(o.cx==null?.5:o.cx),cy=h*(o.cy==null?.52:o.cy),ry=Math.sin(t*.35)*.5+px*.3,rx=.33+py*.1;
  const pj=p=>{const v=R3(p,ry,rx);return P(v,cx,cy,sc,6).concat(v[2])};
  ctx.lineWidth=1;ctx.strokeStyle=`rgba(${RED},.28)`;ctx.beginPath();
  for(let i=-4;i<=4;i++){let a=pj([i*.4,FY,-1.6]),b=pj([i*.4,FY,1.6]);ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);a=pj([-1.6,FY,i*.4]);b=pj([1.6,FY,i*.4]);ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1])}ctx.stroke();
  pins.forEach((p,i)=>{const a=pj(p),b=pj([p[0],p[3]-.4,p[2]]);ctx.strokeStyle=`rgba(${RED},.45)`;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();if(i%3===0)glow(ctx,b[0],b[1],3.2,.9);else{ctx.fillStyle=`rgba(${RED},.8)`;ctx.beginPath();ctx.arc(b[0],b[1],2.6,0,TAU);ctx.fill()}});
  const fy=pj([0,FL,0])[1];
  const hz=ctx.createRadialGradient(cx,fy,0,cx,fy,sc*1.6);hz.addColorStop(0,`rgba(${RED},.25)`);hz.addColorStop(1,`rgba(${RED},0)`);ctx.fillStyle=hz;ctx.save();ctx.translate(0,fy);ctx.scale(1,.28);ctx.translate(0,-fy);ctx.beginPath();ctx.arc(cx,fy,sc*1.6,0,TAU);ctx.fill();ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(0,0,w,fy+sc*.04);ctx.clip();
  sp.map(s=>{const q=pj([s[0],s[1],0]);return{q,r:s[2]}}).sort((a,b)=>a.q[3]-b.q[3]).forEach(({q,r})=>{const rr=r*sc*q[2],g=ctx.createRadialGradient(q[0],q[1],0,q[0],q[1],rr);g.addColorStop(0,'rgba(70,0,8,.5)');g.addColorStop(.7,`rgba(${RED},.26)`);g.addColorStop(1,`rgba(${RED},.08)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(q[0],q[1],rr,0,TAU);ctx.fill()});
  const Q=pts.map(pj);ctx.lineWidth=.8;
  for(const[i,j]of ed){ctx.strokeStyle=`rgba(255,255,255,${.25+.35*(Q[i][3]+1)/2})`;ctx.beginPath();ctx.moveTo(Q[i][0],Q[i][1]);ctx.lineTo(Q[j][0],Q[j][1]);ctx.stroke()}
  Q.forEach((q,i)=>{if(i%9===0)glow(ctx,q[0],q[1],2.4,.95);else{ctx.fillStyle=`rgba(255,255,255,${.5+.4*(q[3]+1)/2})`;ctx.beginPath();ctx.arc(q[0],q[1],1.5,0,TAU);ctx.fill()}});
  ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1.5;ctx.beginPath();const a=pj([-1.0,FL,0]),b=pj([1.05,FL,0]);ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
 }}

function cubes(o){o=o||{};
 const S=sm(),g=.44,s=.2;
 const V=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
 const F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[0,3,7,4],[1,2,6,5]];
 const N=[[0,0,-1],[0,0,1],[0,-1,0],[0,1,0],[-1,0,0],[1,0,0]];
 const L=[-.35,.8,.5];
 let base=[[-1,0,0],[0,0,0],[1,0,0],[0,0,-1],[0,0,1],[1,0,1],[-1,0,-1],[0,1,0],[1,1,0],[0,1,1]];
 if(o.small)base=base.slice(0,8);
 const trav=[{s:[-1,1,1],f:[-3.2,1.6,2.4],ph:0},{s:[1,1,-1],f:[3.4,1.2,-2],ph:2.1}];
 return(ctx,w,h,t)=>{const[px,py]=S(),sc=Math.min(w,h)*.34*(o.scale||1),cx=w*(o.cx==null?.5:o.cx),cy=h*(o.cy==null?.55:o.cy),ry=-.6+Math.sin(t*.25)*.35+px*.3,rx=.5+py*.1;
  const list=base.map(b=>b.slice());
  list.push([0,2+.45*(.5+.5*Math.sin(t*.9)),0]);
  trav.forEach(a=>{const k=Math.pow(.5+.5*Math.cos(t*.6+a.ph),2);list.push([a.s[0]+(a.f[0]-a.s[0])*k,a.s[1]+(a.f[1]-a.s[1])*k,a.s[2]+(a.f[2]-a.s[2])*k])});
  const ctr=R3([0,.5*g,0],ry,rx),cp=P(ctr,cx,cy,sc,5);
  const fl=P(R3([0,-.3,0],ry,rx),cx,cy,sc,5);
  ctx.save();ctx.translate(0,fl[1]);ctx.scale(1,.3);ctx.translate(0,-fl[1]);const sh=ctx.createRadialGradient(cx,fl[1],0,cx,fl[1],sc*1.5);sh.addColorStop(0,`rgba(${RED},.3)`);sh.addColorStop(1,`rgba(${RED},0)`);ctx.fillStyle=sh;ctx.beginPath();ctx.arc(cx,fl[1],sc*1.5,0,TAU);ctx.fill();ctx.restore();
  const hz=ctx.createRadialGradient(cp[0],cp[1],0,cp[0],cp[1],sc*.9);hz.addColorStop(0,'rgba(255,255,255,.9)');hz.addColorStop(.3,`rgba(${REDL},.3)`);hz.addColorStop(1,`rgba(${RED},0)`);ctx.fillStyle=hz;ctx.beginPath();ctx.arc(cp[0],cp[1],sc*.9,0,TAU);ctx.fill();
  const faces=[];
  list.forEach(c=>{const wc=[c[0]*g,c[1]*g-.1,c[2]*g];const vs=V.map(v=>P(R3([wc[0]+v[0]*s,wc[1]+v[1]*s,wc[2]+v[2]*s],ry,rx),cx,cy,sc,5).concat(0));
   const zs=V.map(v=>R3([wc[0]+v[0]*s,wc[1]+v[1]*s,wc[2]+v[2]*s],ry,rx)[2]);
   F.forEach((f,fi)=>{const n=R3(N[fi],ry,rx),dp=n[0]*L[0]+n[1]*L[1]+n[2]*L[2];faces.push({q:f.map(i=>vs[i]),z:f.reduce((a,i)=>a+zs[i],0)/4,a:(n[2]>0?.3+.32*Math.max(0,dp):.14+.1*Math.max(0,dp))})})});
  faces.sort((a,b)=>a.z-b.z);
  for(const f of faces){ctx.beginPath();f.q.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();ctx.fillStyle=`rgba(${RED},${f.a})`;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=1.2;ctx.stroke();ctx.strokeStyle='rgba(150,0,10,.28)';ctx.lineWidth=.6;ctx.stroke()}
  glow(ctx,cp[0],cp[1],3,.9);
 }}

function neural(o){o=o||{};
 const Ls=o.layers||[4,6,7,5,3],S=sm(),r=rng(3),nodes=[],edges=[];
 Ls.forEach((n,i)=>{for(let j=0;j<n;j++)nodes.push({i,x:i/(Ls.length-1)*2-1,y:(j+.5)/n*2-1,z:(r()-.5)*.9,hub:r()<.2})});
 const by=Ls.map((_,i)=>nodes.filter(n=>n.i===i));
 for(let i=0;i<Ls.length-1;i++)by[i].forEach(a=>by[i+1].forEach(b=>{if(r()<.72)edges.push({a,b,ph:r(),sp:.15+r()*.25,on:r()<.35})}));
 return(ctx,w,h,t)=>{const[px,py]=S(),sc=Math.min(w/2.3,h/2.1)*(o.scale||1),cx=w*(o.cx==null?.5:o.cx),cy=h*(o.cy==null?.5:o.cy),ry=.45+px*.25,rx=-.1+py*.15;
  nodes.forEach(n=>{n.s=P(R3([n.x*1.0,-n.y*.8,n.z],ry,rx),cx,cy,sc,6)});
  ctx.lineWidth=.9;
  for(const e of edges){ctx.strokeStyle=e.on?`rgba(${RED},.5)`:'rgba(120,128,140,.28)';ctx.beginPath();ctx.moveTo(e.a.s[0],e.a.s[1]);ctx.lineTo(e.b.s[0],e.b.s[1]);ctx.stroke()}
  for(const e of edges){if(!e.on)continue;const f=(t*e.sp+e.ph)%1,x=e.a.s[0]+(e.b.s[0]-e.a.s[0])*f,y=e.a.s[1]+(e.b.s[1]-e.a.s[1])*f;glow(ctx,x,y,2.2,.85)}
  for(const n of nodes){if(n.hub)glow(ctx,n.s[0],n.s[1],5*n.s[2],.9);else{ctx.fillStyle='#fff';ctx.strokeStyle=`rgba(${RED},.75)`;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(n.s[0],n.s[1],4.2*n.s[2],0,TAU);ctx.fill();ctx.stroke()}}
 }}

function orbit(o){o=o||{};
 const S=sm(),r=rng(9),rings=o.rings||3,rs=[.6,.9,1.2,1.5].slice(0,rings),tilt=[[.9,.2],[.5,-.6],[1.2,.9],[.7,1.4]],nds=[];
 rs.forEach((R,i)=>{const n=3+i;for(let k=0;k<n;k++)nds.push({i,R,a:k/n*TAU+r(),sp:(.25+r()*.2)*(i%2?-1:1),red:r()<.5,rr:3+r()*3})});
 return(ctx,w,h,t)=>{const[px,py]=S(),sc=Math.min(w,h)*(rings>3?.27:.3)*(o.scale||1),cx=w*(o.cx==null?.5:o.cx),cy=h*(o.cy==null?.5:o.cy),ry0=t*.12+px*.3,rx0=.15+py*.12;
  const rp=(i,R,a)=>R3(R3([Math.cos(a)*R,0,Math.sin(a)*R],tilt[i][1],tilt[i][0]),ry0,rx0);
  ctx.lineWidth=1;
  rs.forEach((R,i)=>{ctx.strokeStyle=`rgba(${RED},${.34-i*.05})`;ctx.beginPath();for(let k=0;k<=72;k++){const q=P(rp(i,R,k/72*TAU),cx,cy,sc,6);k?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.stroke()});
  const pos=nds.map(n=>{const v=rp(n.i,n.R,n.a+t*n.sp);return{n,v,q:P(v,cx,cy,sc,6)}}).sort((a,b)=>a.v[2]-b.v[2]);
  const node=({n,v,q})=>{const al=.5+.5*(v[2]+1.5)/3;if(n.red)glow(ctx,q[0],q[1],n.rr*q[2]*.8,al);else{ctx.fillStyle=`rgba(255,255,255,${al})`;ctx.strokeStyle='rgba(120,128,140,.7)';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(q[0],q[1],n.rr*q[2]*.9,0,TAU);ctx.fill();ctx.stroke()}};
  pos.filter(p=>p.v[2]<0).forEach(node);
  const oc=ctx.createRadialGradient(cx-sc*.1,cy-sc*.12,0,cx,cy,sc*.3);oc.addColorStop(0,'#FF8A93');oc.addColorStop(.45,'#E3000F');oc.addColorStop(1,'#7A0008');
  const hz=ctx.createRadialGradient(cx,cy,sc*.2,cx,cy,sc*.9);hz.addColorStop(0,`rgba(${RED},.28)`);hz.addColorStop(1,`rgba(${RED},0)`);ctx.fillStyle=hz;ctx.beginPath();ctx.arc(cx,cy,sc*.9,0,TAU);ctx.fill();
  ctx.fillStyle=oc;ctx.beginPath();ctx.arc(cx,cy,sc*.28,0,TAU);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(cx-sc*.09,cy-sc*.11,sc*.07,sc*.04,-.6,0,TAU);ctx.fill();
  pos.filter(p=>p.v[2]>=0).forEach(node);
 }}


function shield(o){o=o||{};
 const S=sm(),r=rng(4),poly=[[-.62,.55],[0,.82],[.62,.55],[.62,0],[.44,-.42],[0,-.82],[-.44,-.42],[-.62,0]],nds=[];
 for(let i=0;i<16;i++){const a=r()*TAU,d=1.05+r()*.5;nds.push([Math.cos(a)*d*1.15,Math.sin(a)*d*.85,(r()-.5)*.9,r()<.4,i%8])}
 return(ctx,w,h,t)=>{const[px,py]=S(),sc=Math.min(w,h)*.34*(o.scale||1),cx=w*.5,cy=h*.5,ry=Math.sin(t*.4)*.55+px*.3,rx=.1+py*.1;
  const pj=(x,y,z)=>{const v=R3([x,y,z],ry,rx);return P(v,cx,cy,sc,6).concat(v[2])};
  const hz=ctx.createRadialGradient(cx,cy,0,cx,cy,sc*1.3);hz.addColorStop(0,`rgba(${RED},.2)`);hz.addColorStop(1,`rgba(${RED},0)`);ctx.fillStyle=hz;ctx.beginPath();ctx.arc(cx,cy,sc*1.3,0,TAU);ctx.fill();
  nds.forEach(n=>{const a=pj(n[0],n[1],n[2]),b=pj(poly[n[4]][0],poly[n[4]][1],0);ctx.strokeStyle=`rgba(${RED},.22)`;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();if(n[3])glow(ctx,a[0],a[1],2.6,.85);else{ctx.fillStyle='rgba(120,128,140,.7)';ctx.beginPath();ctx.arc(a[0],a[1],2.2,0,TAU);ctx.fill()}});
  const layer=(z,al)=>{ctx.beginPath();poly.forEach((p,i)=>{const q=pj(p[0],p[1],z);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.fillStyle=`rgba(${RED},${al})`;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=1.4;ctx.stroke();ctx.strokeStyle=`rgba(150,0,10,.3)`;ctx.lineWidth=.7;ctx.stroke()};
  layer(-.2,.16);layer(-.1,.2);
  ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1;poly.forEach(p=>{const a=pj(p[0],p[1],-.2),b=pj(p[0],p[1],.2);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()});
  layer(0,.22);layer(.2,.4);
  const ck=[[-.27,-.02],[-.07,-.24],[.3,.27]].map(p=>pj(p[0],p[1],.22));
  ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=`rgba(${RED},.35)`;ctx.lineWidth=12;ctx.beginPath();ck.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();
  ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.stroke();
  const y=Math.sin(t*1.1)*.62,a=pj(-.6,y,.22),b=pj(.6,y,.22);const lg=ctx.createLinearGradient(a[0],a[1],b[0],b[1]);lg.addColorStop(0,'rgba(255,255,255,0)');lg.addColorStop(.5,'rgba(255,255,255,.95)');lg.addColorStop(1,'rgba(255,255,255,0)');ctx.strokeStyle=lg;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();ctx.lineCap='butt';
 }}

function loop(o){o=o||{};
 const S=sm(),pt=a=>{const d=1+Math.sin(a)**2;return[1.3*Math.cos(a)/d,2.2*Math.sin(a)*Math.cos(a)/d,.3*Math.sin(a*2+.5)]},
 st=[[-.75,'BUILD'],[.75,'TEST'],[Math.PI-.75,'DEPLOY'],[Math.PI+.75,'RUN']];
 return(ctx,w,h,t)=>{const[px,py]=S(),sc=Math.min(w*.36,h*.8)*(o.scale||1),cx=w*.5,cy=h*.5,ry=Math.sin(t*.3)*.4+px*.25,rx=.35+py*.1;
  const pj=a=>{const v=R3(pt(a),ry,rx);return P(v,cx,cy,sc,6).concat(v[2])};
  ctx.lineCap='round';ctx.strokeStyle=`rgba(${RED},.16)`;ctx.lineWidth=14;ctx.beginPath();for(let i=0;i<=200;i++){const q=pj(i/200*TAU);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.stroke();
  ctx.strokeStyle=`rgba(${RED},.75)`;ctx.lineWidth=2;ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=.8;ctx.stroke();ctx.lineCap='butt';
  for(let k=0;k<6;k++){const q=pj(t*.7+k*TAU/6);glow(ctx,q[0],q[1],3,.9)}
  ctx.font='600 11px JetBrains Mono,monospace';ctx.textAlign='center';
  st.forEach(([a,l])=>{const q=pj(a);ctx.fillStyle='#fff';ctx.strokeStyle=`rgba(${RED},1)`;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(q[0],q[1],10,0,TAU);ctx.fill();ctx.stroke();ctx.fillStyle=`rgba(${RED},1)`;ctx.beginPath();ctx.arc(q[0],q[1],3.5,0,TAU);ctx.fill();ctx.fillStyle='#1C2733';ctx.fillText(l,q[0],q[1]-20)});
 }}
const reg={globe,cloud,cubes,neural,orbit,shield,loop};
function mount(cv){
 const f=reg[cv.dataset.s];if(!f)return;let o={};try{o=JSON.parse(cv.dataset.o||'{}')}catch(e){}
 const scene=f(o),ctx=cv.getContext('2d');let w=0,h=0,vis=false,raf=0,t=reduce?3:0,last=0;
 const draw=()=>{if(!w||!h)return;ctx.clearRect(0,0,w,h);scene(ctx,w,h,t)};
 const size=()=>{const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;if(!w||!h)return;cv.width=Math.round(w*d);cv.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);draw()};
 const loop=now=>{raf=0;if(!vis)return;t+=Math.min((now-last)/1000,.05);last=now;draw();raf=requestAnimationFrame(loop)};
 new ResizeObserver(size).observe(cv);
 new IntersectionObserver(es=>{vis=es[es.length-1].isIntersecting;if(vis&&!reduce&&!raf){last=performance.now();raf=requestAnimationFrame(loop)}},{rootMargin:'120px'}).observe(cv);
}
window.mountScenes=()=>document.querySelectorAll('canvas[data-s]').forEach(mount);
})();
