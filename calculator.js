"use strict";
const defaults={count:8,diameter:3000,width:140,thick:45,overhang:180,clearance:1};
const ids=Object.keys(defaults);
const $=id=>document.getElementById(id);
const fmt=n=>Number(n.toFixed(1)).toLocaleString();
const point=(angle,r)=>({x:300+r*Math.cos(angle),y:214+r*Math.sin(angle)});
function compute(v){
 const n=v.count,r=v.diameter/2,theta=2*Math.PI/n,side=2*r*Math.sin(Math.PI/n);
 const length=side+2*v.overhang;
 const notchWidth=v.width+v.clearance;
 const depth=v.thick/2; // Symmetric half-lap geometry only; NOT a structural design recommendation.\n const stockRemaining=v.thick-depth;\n const notchFromEnd=v.overhang;
 const errors=[];
 if(!Number.isInteger(n)||n<3||n>16)errors.push("Choose 3–16 whole-number members.");
 if(Object.values(v).some(x=>!Number.isFinite(x)))errors.push("All inputs must be finite numbers.");
 if(v.diameter<300||v.diameter>12000||v.width<20||v.thick<20||v.overhang<0||v.clearance<0)errors.push("Check input limits.");

 if(notchWidth>=side/2)errors.push("Notch width is too large relative to the segment length.");
 return {n,r,theta,side,length,notchWidth,stockRemaining,depth,notchFromEnd,errors};
}
function render(){
 const v=Object.fromEntries(ids.map(id=>[id,Number($(id).value)]));
 const d=compute(v);
 $('message').innerHTML=d.errors.length?'<p class="warning">'+d.errors.join(' ')+'</p>':'';
 $('metrics').innerHTML=[['Nominal segment',d.side],['Stock cut length',d.length],['Half-lap depth (concept)',d.depth],['Remaining thickness',d.stockRemaining]].map(([k,val])=>'<span><small>'+k+'</small><br><strong>'+fmt(val)+' mm</strong></span>').join('');
 const a=[];const radius=155;
 for(let i=0;i<d.n&&i<16;i++){
 const angle=-Math.PI/2+i*d.theta;
 const start=point(angle,radius),end=point(angle+d.theta,radius);
 a.push('<line x1="'+start.x+'" y1="'+start.y+'" x2="'+end.x+'" y2="'+end.y+'" stroke="'+(i%2?'#bb8b53':'#8f633b')+'" stroke-width="'+Math.max(4,Math.min(20,v.width/v.diameter*310))+'" stroke-linecap="square"/>');
 a.push('<circle cx="'+start.x+'" cy="'+start.y+'" r="5" fill="#315e4c"/>');
 a.push('<text x="'+(start.x-10)+'" y="'+(start.y-10)+'" fill="#24433b" font-size="13">'+(i+1)+'</text>');
 }
 $('plan').innerHTML=a.join('')+'<text x="300" y="405" text-anchor="middle" fill="#54655c" font-size="14">Top view • conceptual crossing locations (green)</text>';
 $('schedule').innerHTML='<tr><td>Timber members</td><td>'+d.n+'</td><td>'+fmt(d.length)+' × '+fmt(v.width)+' × '+fmt(v.thick)+' mm</td></tr><tr><td>Notched crossings</td><td>'+d.n+'</td><td>Nominal recess width '+fmt(d.notchWidth)+' mm; illustrative half-lap depth '+fmt(d.depth)+' mm; center at '+fmt(d.notchFromEnd)+' mm from stock end (both ends)</td></tr><tr><td>End extension</td><td>2 per member</td><td>'+fmt(v.overhang)+' mm beyond nominal chord endpoints</td></tr><tr><td>Nominal interior turning angle</td><td>'+d.n+'</td><td>'+fmt(180-360/d.n)+'° (plan geometry)</td></tr>';
}
ids.forEach(id=>$(id).addEventListener('input',render));
$('reset').addEventListener('click',()=>{ids.forEach(id=>$(id).value=defaults[id]);render()});
render();