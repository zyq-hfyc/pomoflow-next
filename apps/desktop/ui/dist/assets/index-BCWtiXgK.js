var nd=Object.defineProperty;var pi=a=>{throw TypeError(a)};var rd=(a,t,n)=>t in a?nd(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;var aa=(a,t,n)=>rd(a,typeof t!="symbol"?t+"":t,n),qs=(a,t,n)=>t.has(a)||pi("Cannot "+n);var N=(a,t,n)=>(qs(a,t,"read from private field"),n?n.call(a):t.get(a)),Ze=(a,t,n)=>t.has(a)?pi("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,n),et=(a,t,n,r)=>(qs(a,t,"write to private field"),r?r.call(a,n):t.set(a,n),n),vt=(a,t,n)=>(qs(a,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}})();const vl=!1;var Io=Array.isArray,sd=Array.prototype.indexOf,rs=Array.prototype.includes,xs=Array.from,od=Object.defineProperty,sn=Object.getOwnPropertyDescriptor,fl=Object.getOwnPropertyDescriptors,id=Object.prototype,ld=Array.prototype,qo=Object.getPrototypeOf,gi=Object.isExtensible;function or(a){return typeof a=="function"}const cd=()=>{};function dd(a){return a()}function no(a){for(var t=0;t<a.length;t++)a[t]()}function hl(){var a,t,n=new Promise((r,s)=>{a=r,t=s});return{promise:n,resolve:a,reject:t}}function _l(a,t){if(Array.isArray(a))return a;if(!(Symbol.iterator in a))return Array.from(a);const n=[];for(const r of a)if(n.push(r),n.length===t)break;return n}const Ht=2,Tn=4,Cr=8,Ro=1<<24,Pa=16,ya=32,$a=64,ro=128,ba=512,Ot=1024,Lt=2048,ja=4096,ea=8192,da=16384,Zn=32768,so=1<<25,ln=65536,ss=1<<17,pl=1<<18,er=1<<19,gl=1<<20,Fa=1<<25,Dn=65536,os=1<<21,In=1<<22,on=1<<23,qa=Symbol("$state"),ml=Symbol("legacy props"),ud=Symbol(""),Vr=Symbol("attributes"),oo=Symbol("class"),io=Symbol("style"),fr=Symbol("text"),Jr=Symbol("form reset"),Nr=new class extends Error{constructor(){super(...arguments);aa(this,"name","StaleReactionError");aa(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var cl;const Ss=!!((cl=globalThis.document)!=null&&cl.contentType)&&globalThis.document.contentType.includes("xml");function vd(a){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function fd(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function hd(a,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function _d(a){throw new Error("https://svelte.dev/e/effect_in_teardown")}function pd(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function gd(a){throw new Error("https://svelte.dev/e/effect_orphan")}function md(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function bd(a){throw new Error("https://svelte.dev/e/props_invalid_value")}function yd(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function kd(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function wd(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function xd(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Sd=1,Td=2,bl=4,Dd=8,Pd=16,Md=1,jd=2,yl=4,Ed=8,Cd=16,kl=1,Nd=2,Rt=Symbol("uninitialized"),wl="http://www.w3.org/1999/xhtml",Fd="http://www.w3.org/2000/svg",Ad="@attach";function Id(){console.warn("https://svelte.dev/e/derived_inert")}function qd(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function Rd(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function xl(a){return a===this.v}function Ld(a,t){return a!=a?t==t:a!==t||a!==null&&typeof a=="object"||typeof a=="function"}function Sl(a){return!Ld(a,this.v)}let tr=!1,Od=!1;function Bd(){tr=!0}let Et=null;function Wn(a){Et=a}function ft(a,t=!1,n){Et={p:Et,i:!1,c:null,e:null,s:a,x:null,r:ot,l:tr&&!t?{s:null,u:null,$:[]}:null}}function ht(a){var t=Et,n=t.e;if(n!==null){t.e=null;for(var r of n)$l(r)}return t.i=!0,Et=t.p,{}}function Fr(){return!tr||Et!==null&&Et.l===null}let fn=[];function Tl(){var a=fn;fn=[],no(a)}function Aa(a){if(fn.length===0&&!br){var t=fn;queueMicrotask(()=>{t===fn&&Tl()})}fn.push(a)}function zd(){for(;fn.length>0;)Tl()}function Dl(a){var t=ot;if(t===null)return ut.f|=on,a;if((t.f&Zn)===0&&(t.f&Tn)===0)throw a;nn(a,t)}function nn(a,t){if(!(t!==null&&(t.f&da)!==0)){for(;t!==null;){if((t.f&ro)!==0){if((t.f&Zn)===0)throw a;try{t.b.error(a);return}catch(n){a=n}}t=t.parent}throw a}}const Hd=-7169;function Ft(a,t){a.f=a.f&Hd|t}function Lo(a){(a.f&ba)!==0||a.deps===null?Ft(a,Ot):Ft(a,ja)}function Pl(a){if(a!==null)for(const t of a)(t.f&Ht)===0||(t.f&Dn)===0||(t.f^=Dn,Pl(t.deps))}function Ml(a,t,n){(a.f&Lt)!==0?t.add(a):(a.f&ja)!==0&&n.add(a),Pl(a.deps),Ft(a,Ot)}let Yr=!1;function Ud(a){var t=Yr;try{return Yr=!1,[a(),Yr]}finally{Yr=t}}function kn(a,t){if(t){const n=document.body;a.autofocus=!0,Aa(()=>{document.activeElement===n&&a.focus()})}}let mi=!1;function Wd(){mi||(mi=!0,document.addEventListener("reset",a=>{Promise.resolve().then(()=>{var t;if(!a.defaultPrevented)for(const n of a.target.elements)(t=n[Jr])==null||t.call(n)})},{capture:!0}))}function ar(a){var t=ut,n=ot;ka(null),wa(null);try{return a()}finally{ka(t),wa(n)}}function jl(a,t,n,r=n){a.addEventListener(t,()=>ar(n));const s=a[Jr];s?a[Jr]=()=>{s(),r(!0)}:a[Jr]=()=>r(!0),Wd()}function Yd(a){let t=0,n=cn(0),r;return()=>{Wo()&&(e(n),Yo(()=>(t===0&&(r=Ut(()=>a(()=>yr(n)))),t+=1,()=>{Aa(()=>{t-=1,t===0&&(r==null||r(),r=void 0,yr(n))})})))}}var $d=ln|er;function Gd(a,t,n,r){new Kd(a,t,n,r)}var _a,Ao,pa,pn,na,ga,Qt,la,Ba,gn,en,qn,Tr,Dr,za,ms,jt,Vd,Jd,lo,Qd,co,Qr,Xr,uo,vo;class Kd{constructor(t,n,r,s){Ze(this,jt);aa(this,"parent");aa(this,"is_pending",!1);aa(this,"transform_error");Ze(this,_a);Ze(this,Ao,null);Ze(this,pa);Ze(this,pn);Ze(this,na);Ze(this,ga,null);Ze(this,Qt,null);Ze(this,la,null);Ze(this,Ba,null);Ze(this,gn,0);Ze(this,en,0);Ze(this,qn,!1);Ze(this,Tr,new Set);Ze(this,Dr,new Set);Ze(this,za,null);Ze(this,ms,Yd(()=>(et(this,za,cn(N(this,gn))),()=>{et(this,za,null)})));var c;et(this,_a,t),et(this,pa,n),et(this,pn,l=>{var i=ot;i.b=this,i.f|=ro,r(l)}),this.parent=ot.b,this.transform_error=s??((c=this.parent)==null?void 0:c.transform_error)??(l=>l),et(this,na,rr(()=>{vt(this,jt,co).call(this)},$d))}defer_effect(t){Ml(t,N(this,Tr),N(this,Dr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!N(this,pa).pending}update_pending_count(t,n){vt(this,jt,uo).call(this,t,n),et(this,gn,N(this,gn)+t),!(!N(this,za)||N(this,qn))&&(et(this,qn,!0),Aa(()=>{et(this,qn,!1),N(this,za)&&$n(N(this,za),N(this,gn))}))}get_effect_pending(){return N(this,ms).call(this),e(N(this,za))}error(t){if(!N(this,pa).onerror&&!N(this,pa).failed)throw t;Re!=null&&Re.is_fork?(N(this,ga)&&Re.skip_effect(N(this,ga)),N(this,Qt)&&Re.skip_effect(N(this,Qt)),N(this,la)&&Re.skip_effect(N(this,la)),Re.oncommit(()=>{vt(this,jt,vo).call(this,t)})):vt(this,jt,vo).call(this,t)}}_a=new WeakMap,Ao=new WeakMap,pa=new WeakMap,pn=new WeakMap,na=new WeakMap,ga=new WeakMap,Qt=new WeakMap,la=new WeakMap,Ba=new WeakMap,gn=new WeakMap,en=new WeakMap,qn=new WeakMap,Tr=new WeakMap,Dr=new WeakMap,za=new WeakMap,ms=new WeakMap,jt=new WeakSet,Vd=function(){try{et(this,ga,Xt(()=>N(this,pn).call(this,N(this,_a))))}catch(t){this.error(t)}},Jd=function(t){const n=N(this,pa).failed,{reset:r,invoke_onerror:s}=vt(this,jt,lo).call(this,t);Aa(s),n&&et(this,la,Xt(()=>{n(N(this,_a),()=>t,()=>r)}))},lo=function(t){var n=!1,r=!1;const s=()=>{if(n){Rd();return}n=!0,r&&xd(),N(this,la)!==null&&xn(N(this,la),()=>{et(this,la,null)}),vt(this,jt,Xr).call(this,()=>{vt(this,jt,co).call(this)})};return{reset:s,invoke_onerror:()=>{var l,i;try{r=!0,(i=(l=N(this,pa)).onerror)==null||i.call(l,t,s),r=!1}catch(u){nn(u,N(this,na)&&N(this,na).parent)}}}},Qd=function(){const t=N(this,pa).pending;t&&(this.is_pending=!0,et(this,Qt,Xt(()=>t(N(this,_a)))),Aa(()=>{var n=et(this,Ba,document.createDocumentFragment()),r=Ra();n.append(r),et(this,ga,vt(this,jt,Xr).call(this,()=>Xt(()=>N(this,pn).call(this,r)))),N(this,en)===0&&(N(this,_a).before(n),et(this,Ba,null),xn(N(this,Qt),()=>{et(this,Qt,null)}),vt(this,jt,Qr).call(this,Re))}))},co=function(){try{if(this.is_pending=this.has_pending_snippet(),et(this,en,0),et(this,gn,0),et(this,ga,Xt(()=>{N(this,pn).call(this,N(this,_a))})),N(this,en)>0){var t=et(this,Ba,document.createDocumentFragment());Go(N(this,ga),t);const n=N(this,pa).pending;et(this,Qt,Xt(()=>n(N(this,_a))))}else vt(this,jt,Qr).call(this,Re)}catch(n){this.error(n)}},Qr=function(t){this.is_pending=!1,t.transfer_effects(N(this,Tr),N(this,Dr))},Xr=function(t){var n=ot,r=ut,s=Et;wa(N(this,na)),ka(N(this,na)),Wn(N(this,na).ctx);try{return Pn.ensure(),t()}catch(c){return Dl(c),null}finally{wa(n),ka(r),Wn(s)}},uo=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&vt(r=this.parent,jt,uo).call(r,t,n);return}et(this,en,N(this,en)+t),N(this,en)===0&&(vt(this,jt,Qr).call(this,n),N(this,Qt)&&xn(N(this,Qt),()=>{et(this,Qt,null)}),N(this,Ba)&&(N(this,_a).before(N(this,Ba)),et(this,Ba,null)))},vo=function(t){N(this,ga)&&($t(N(this,ga)),et(this,ga,null)),N(this,Qt)&&($t(N(this,Qt)),et(this,Qt,null)),N(this,la)&&($t(N(this,la)),et(this,la,null));let n=N(this,pa).failed;const r=s=>{const{reset:c,invoke_onerror:l}=vt(this,jt,lo).call(this,s);l(),n&&et(this,la,vt(this,jt,Xr).call(this,()=>{try{return Xt(()=>{var i=ot;i.b=this,i.f|=ro,n(N(this,_a),()=>s,()=>c)})}catch(i){return nn(i,N(this,na).parent),null}}))};Aa(()=>{var s;try{s=this.transform_error(t)}catch(c){nn(c,N(this,na)&&N(this,na).parent);return}s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(r,c=>nn(c,N(this,na)&&N(this,na).parent)):r(s)})};function Oo(a,t,n,r){const s=Fr()?Yn:Bo;var c=a.filter(y=>!y.settled),l=t.map(s);if(n.length===0&&c.length===0){r(l);return}var i=ot,u=Xd(),f=c.length===1?c[0].promise:c.length>1?Promise.all(c.map(y=>y.promise)):null;function p(y){if((i.f&da)===0){u();try{r([...l,...y])}catch(x){nn(x,i)}is()}}var m=El();if(n.length===0){f.then(()=>p([])).finally(m);return}function h(){Promise.all(n.map(y=>Zd(y))).then(p).catch(y=>nn(y,i)).finally(m)}f?f.then(()=>{u(),h(),is()}):h()}function Xd(){var a=ot,t=ut,n=Et,r=Re;return function(c=!0){wa(a),ka(t),Wn(n),c&&(a.f&da)===0&&(r==null||r.activate(),r==null||r.apply())}}function is(a=!0){wa(null),ka(null),Wn(null),a&&(Re==null||Re.deactivate())}function El(){var a=ot,t=a.b,n=Re,r=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(r,a),()=>{t==null||t.update_pending_count(-1,n),n.decrement(r,a)}}function Yn(a){var t=Ht|Lt;return ot!==null&&(ot.f|=er),{ctx:Et,deps:null,effects:null,equals:xl,f:t,fn:a,reactions:null,rv:0,v:Rt,wv:0,parent:ot,ac:null}}const hr=Symbol("obsolete");function Zd(a,t,n){let r=ot;r===null&&fd();var s=void 0,c=cn(Rt),l=!ut,i=new Set;return hu(()=>{var y,x;var u=ot,f=hl();s=f.promise;try{Promise.resolve(a()).then(f.resolve,S=>{S!==Nr&&f.reject(S)}).finally(is)}catch(S){f.reject(S),is()}var p=Re;if(l){if((u.f&Zn)!==0)var m=El();if((y=r.b)!=null&&y.is_rendered())(x=p.async_deriveds.get(u))==null||x.reject(hr);else for(const S of i.values())S.reject(hr);i.add(f),p.async_deriveds.set(u,f)}const h=(S,P=void 0)=>{m==null||m(),i.delete(f),P!==hr&&(p.activate(),P?(c.f|=on,$n(c,P)):((c.f&on)!==0&&(c.f^=on),$n(c,S)),p.deactivate())};f.promise.then(h,S=>h(null,S||"unknown"))}),Ts(()=>{for(const u of i)u.reject(hr)}),new Promise(u=>{function f(p){function m(){p===s?u(c):f(s)}p.then(m,m)}f(s)})}function A(a){const t=Yn(a);return Xl(t),t}function Bo(a){const t=Yn(a);return t.equals=Sl,t}function eu(a){var t=a.effects;if(t!==null){a.effects=null;for(var n=0;n<t.length;n+=1)$t(t[n])}}function zo(a){var t,n=ot,r=a.parent;if(!Ga&&r!==null&&a.v!==Rt&&(r.f&(da|ea))!==0)return Id(),a.v;wa(r);try{a.f&=~Dn,eu(a),t=ac(a)}finally{wa(n)}return t}function Cl(a){var t=zo(a);if(!a.equals(t)&&(a.wv=ec(),(!(Re!=null&&Re.is_fork)||a.deps===null)&&(Re!==null?(Re.capture(a,t,!0),mr==null||mr.capture(a,t,!0)):a.v=t,a.deps===null))){Ft(a,Ot);return}Ga||(Yt!==null?(Wo()||Re!=null&&Re.is_fork)&&Yt.set(a,t):Lo(a))}function tu(a){var t;if(a.effects!==null)for(const n of a.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&ar(()=>{n.ac.abort(Nr),n.ac=null}),n.fn!==null&&(n.teardown=cd),xr(n,0),$o(n))}function Nl(a){if(a.effects!==null)for(const t of a.effects)t.teardown&&t.fn!==null&&Gn(t)}let Rs=null,Cn=null,Re=null,mr=null,Yt=null,fo=null,br=!1,Ls=!1,An=null,Zr=null;var bi=0;let au=1;var Rn,tn,mn,Ln,On,Bn,Ha,zn,ra,Pr,Ua,Ta,Ea,Hn,bn,xt,ho,_r,_o,Fl,Al,Fn,nu,pr;const bs=class bs{constructor(){Ze(this,xt);aa(this,"id",au++);Ze(this,Rn,!1);aa(this,"linked",!0);Ze(this,tn,null);Ze(this,mn,null);aa(this,"async_deriveds",new Map);aa(this,"current",new Map);aa(this,"previous",new Map);Ze(this,Ln,new Set);Ze(this,On,new Set);Ze(this,Bn,0);Ze(this,Ha,new Map);Ze(this,zn,null);Ze(this,ra,[]);Ze(this,Pr,[]);Ze(this,Ua,new Set);Ze(this,Ta,new Set);Ze(this,Ea,new Map);Ze(this,Hn,new Set);aa(this,"is_fork",!1);Ze(this,bn,!1);Cn===null?Rs=Cn=this:(et(Cn,mn,this),et(this,tn,Cn)),Cn=this}skip_effect(t){N(this,Ea).has(t)||N(this,Ea).set(t,{d:[],m:[]}),N(this,Hn).delete(t)}unskip_effect(t,n=r=>this.schedule(r)){var r=N(this,Ea).get(t);if(r){N(this,Ea).delete(t);for(var s of r.d)Ft(s,Lt),n(s);for(s of r.m)Ft(s,ja),n(s)}N(this,Hn).add(t)}capture(t,n,r=!1){t.v!==Rt&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&on)===0&&(this.current.set(t,[n,r]),Yt==null||Yt.set(t,n)),this.is_fork||(t.v=n)}activate(){Re=this}deactivate(){Re=null,Yt=null}flush(){try{Ls=!0,Re=this,vt(this,xt,_r).call(this)}finally{bi=0,fo=null,An=null,Zr=null,Ls=!1,Re=null,Yt=null,wn.clear()}}discard(){var t;for(const n of N(this,On))n(this);N(this,On).clear();for(const n of this.async_deriveds.values())n.reject(hr);vt(this,xt,pr).call(this),(t=N(this,zn))==null||t.resolve()}register_created_effect(t){N(this,Pr).push(t)}increment(t,n){if(et(this,Bn,N(this,Bn)+1),t){let r=N(this,Ha).get(n)??0;N(this,Ha).set(n,r+1)}}decrement(t,n){if(et(this,Bn,N(this,Bn)-1),t){let r=N(this,Ha).get(n)??0;r===1?N(this,Ha).delete(n):N(this,Ha).set(n,r-1)}N(this,bn)||(et(this,bn,!0),Aa(()=>{et(this,bn,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const r of t)N(this,Ua).add(r);for(const r of n)N(this,Ta).add(r);t.clear(),n.clear()}oncommit(t){N(this,Ln).add(t)}ondiscard(t){N(this,On).add(t)}settled(){return(N(this,zn)??et(this,zn,hl())).promise}static ensure(){if(Re===null){const t=Re=new bs;!Ls&&!br&&Aa(()=>{N(t,Rn)||t.flush()})}return Re}apply(){{Yt=null;return}}schedule(t){var s;if(fo=t,(s=t.b)!=null&&s.is_pending&&(t.f&(Tn|Cr|Ro))!==0&&(t.f&Zn)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(An!==null&&n===ot&&(ut===null||(ut.f&Ht)===0))return;if((r&($a|ya))!==0){if((r&Ot)===0)return;n.f^=Ot}}N(this,ra).push(n)}};Rn=new WeakMap,tn=new WeakMap,mn=new WeakMap,Ln=new WeakMap,On=new WeakMap,Bn=new WeakMap,Ha=new WeakMap,zn=new WeakMap,ra=new WeakMap,Pr=new WeakMap,Ua=new WeakMap,Ta=new WeakMap,Ea=new WeakMap,Hn=new WeakMap,bn=new WeakMap,xt=new WeakSet,ho=function(){if(this.is_fork)return!0;for(const r of N(this,Ha).keys()){for(var t=r,n=!1;t.parent!==null;){if(N(this,Ea).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},_r=function(){var u,f,p,m;et(this,Rn,!0),bi++>1e3&&(vt(this,xt,pr).call(this),su());for(const h of N(this,Ua))N(this,Ta).delete(h),Ft(h,Lt),this.schedule(h);for(const h of N(this,Ta))Ft(h,ja),this.schedule(h);const t=N(this,ra);et(this,ra,[]),this.apply();var n=An=[],r=[],s=Zr=[];for(const h of t)try{vt(this,xt,_o).call(this,h,n,r)}catch(y){throw Rl(h),vt(this,xt,ho).call(this)||this.discard(),y}if(Re=null,s.length>0){var c=bs.ensure();for(const h of s)c.schedule(h)}if(An=null,Zr=null,vt(this,xt,ho).call(this)){vt(this,xt,Fn).call(this,r),vt(this,xt,Fn).call(this,n);for(const[h,y]of N(this,Ea))ql(h,y);s.length>0&&vt(u=Re,xt,_r).call(u);return}const l=vt(this,xt,Fl).call(this);if(l){vt(this,xt,Fn).call(this,r),vt(this,xt,Fn).call(this,n),vt(f=l,xt,Al).call(f,this);return}N(this,Ua).clear(),N(this,Ta).clear();for(const h of N(this,Ln))h(this);N(this,Ln).clear(),mr=this,yi(r),yi(n),mr=null,(p=N(this,zn))==null||p.resolve();var i=Re;if(N(this,Bn)===0&&(N(this,ra).length===0||i!==null)&&vt(this,xt,pr).call(this),N(this,ra).length>0)if(i!==null){const h=i;N(h,ra).push(...N(this,ra).filter(y=>!N(h,ra).includes(y)))}else i=this;i!==null&&vt(m=i,xt,_r).call(m)},_o=function(t,n,r){t.f^=Ot;for(var s=t.first;s!==null;){var c=s.f,l=(c&(ya|$a))!==0,i=l&&(c&Ot)!==0,u=i||(c&ea)!==0||N(this,Ea).has(s);if(!u&&s.fn!==null){l?s.f^=Ot:(c&Tn)!==0?n.push(s):Rr(s)&&((c&Pa)!==0&&N(this,Ta).add(s),Gn(s));var f=s.first;if(f!==null){s=f;continue}}for(;s!==null;){var p=s.next;if(p!==null){s=p;break}s=s.parent}}},Fl=function(){for(var t=N(this,tn);t!==null;){if(!t.is_fork){for(const[n,[,r]]of this.current)if(t.current.has(n)&&!r)return t}t=N(t,tn)}return null},Al=function(t){var r;for(const[s,c]of t.current)!this.previous.has(s)&&t.previous.has(s)&&this.previous.set(s,t.previous.get(s)),this.current.set(s,c);for(const[s,c]of t.async_deriveds){const l=this.async_deriveds.get(s);l&&c.promise.then(l.resolve).catch(l.reject)}t.async_deriveds.clear(),this.transfer_effects(N(t,Ua),N(t,Ta));const n=s=>{var c=s.reactions;if(c!==null&&!((s.f&Ht)!==0&&(s.f&(Lt|ja))===0))for(const u of c){var l=u.f;if((l&Ht)!==0)n(u);else{var i=u;l&(In|Pa)&&!this.async_deriveds.has(i)&&(N(this,Ta).delete(i),Ft(i,Lt),this.schedule(i))}}};for(const s of this.current.keys())n(s);this.oncommit(()=>t.discard()),vt(r=t,xt,pr).call(r),Re=this,vt(this,xt,_r).call(this)},Fn=function(t){for(var n=0;n<t.length;n+=1)Ml(t[n],N(this,Ua),N(this,Ta))},nu=function(){var m;for(let h=Rs;h!==null;h=N(h,mn)){var t=h.id<this.id,n=[];for(const[y,[x,S]]of this.current){if(h.current.has(y)){var r=h.current.get(y)[0];if(t&&x!==r)h.current.set(y,[x,S]);else continue}n.push(y)}if(t)for(const[y,x]of this.async_deriveds){const S=h.async_deriveds.get(y);S&&x.promise.then(S.resolve).catch(S.reject)}var s=[...h.current.keys()].filter(y=>!h.current.get(y)[1]);if(!(!N(h,Rn)||s.length===0)){var c=s.filter(y=>!this.current.has(y));if(c.length===0)t&&h.discard();else if(n.length>0){if(t)for(const y of N(this,Hn))h.unskip_effect(y,x=>{var S;(x.f&(Pa|In))!==0?h.schedule(x):vt(S=h,xt,Fn).call(S,[x])});h.activate();var l=new Set,i=new Map;for(var u of n)Il(u,c,l,i);i=new Map;var f=[...h.current].filter(([y,x])=>{const S=this.current.get(y);return S?S[0]!==x[0]||S[1]!==x[1]:!0}).map(([y])=>y);if(f.length>0)for(const y of N(this,Pr))(y.f&(da|ea|ss))===0&&Ho(y,f,i)&&((y.f&(In|Pa))!==0?(Ft(y,Lt),h.schedule(y)):N(h,Ua).add(y));if(N(h,ra).length>0&&!N(h,bn)){h.apply();for(var p of N(h,ra))vt(m=h,xt,_o).call(m,p,[],[]);et(h,ra,[])}h.deactivate()}}}},pr=function(){if(this.linked){var t=N(this,tn),n=N(this,mn);t===null?Rs=n:et(t,mn,n),n===null?Cn=t:et(n,tn,t),this.linked=!1}};let Pn=bs;function ru(a){var t=br;br=!0;try{for(var n;;){if(zd(),Re===null)return n;Re.flush()}}finally{br=t}}function su(){try{md()}catch(a){nn(a,fo)}}let Sa=null;function yi(a){var t=a.length;if(t!==0){for(var n=0;n<t;){var r=a[n++];if((r.f&(da|ea))===0&&Rr(r)&&(Sa=new Set,Gn(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&Vl(r),(Sa==null?void 0:Sa.size)>0)){wn.clear();for(const s of Sa){if((s.f&(da|ea))!==0)continue;const c=[s];let l=s.parent;for(;l!==null;)Sa.has(l)&&(Sa.delete(l),c.push(l)),l=l.parent;for(let i=c.length-1;i>=0;i--){const u=c[i];(u.f&(da|ea))===0&&Gn(u)}}Sa.clear()}}Sa=null}}function Il(a,t,n,r){if(!n.has(a)&&(n.add(a),a.reactions!==null))for(const s of a.reactions){const c=s.f;(c&Ht)!==0?Il(s,t,n,r):(c&(In|Pa))!==0&&(c&Lt)===0&&Ho(s,t,r)&&(Ft(s,Lt),Uo(s))}}function Ho(a,t,n){const r=n.get(a);if(r!==void 0)return r;if(a.deps!==null)for(const s of a.deps){if(rs.call(t,s))return!0;if((s.f&Ht)!==0&&Ho(s,t,n))return n.set(s,!0),!0}return n.set(a,!1),!1}function Uo(a){Re.schedule(a)}function ql(a,t){if(!((a.f&ya)!==0&&(a.f&Ot)!==0)){(a.f&Lt)!==0?t.d.push(a):(a.f&ja)!==0&&t.m.push(a),Ft(a,Ot);for(var n=a.first;n!==null;)ql(n,t),n=n.next}}function Rl(a){Ft(a,Ot);for(var t=a.first;t!==null;)Rl(t),t=t.next}let ls=new Set;const wn=new Map;let Ll=!1;function cn(a,t){var n={f:0,v:a,reactions:null,equals:xl,rv:0,wv:0};return n}function z(a,t){const n=cn(a);return Xl(n),n}function ou(a,t=!1,n=!0){var s;const r=cn(a);return t||(r.equals=Sl),tr&&n&&Et!==null&&Et.l!==null&&((s=Et.l).s??(s.s=[])).push(r),r}function v(a,t,n=!1){ut!==null&&(!Ma||(ut.f&ss)!==0)&&Fr()&&(ut.f&(Ht|Pa|In|ss))!==0&&(La===null||!La.has(a))&&wd();let r=n?Ue(t):t;return $n(a,r,Zr)}function $n(a,t,n=null){if(!a.equals(t)){wn.set(a,Ga?t:a.v);var r=Pn.ensure();if(r.capture(a,t),(a.f&Ht)!==0){const s=a;(a.f&Lt)!==0&&zo(s),Yt===null&&Lo(s)}a.wv=ec(),Ol(a,Lt,n),Fr()&&ot!==null&&(ot.f&Ot)!==0&&(ot.f&(ya|$a))===0&&(ha===null?gu([a]):ha.push(a)),!r.is_fork&&ls.size>0&&!Ll&&iu()}return t}function iu(){Ll=!1;for(const a of ls){(a.f&Ot)!==0&&Ft(a,ja);let t;try{t=Rr(a)}catch{t=!0}t&&Gn(a)}ls.clear()}function ki(a,t=1){var n=e(a),r=t===1?n++:n--;return v(a,n),r}function yr(a){v(a,a.v+1)}function Ol(a,t,n){var r=a.reactions;if(r!==null)for(var s=Fr(),c=r.length,l=0;l<c;l++){var i=r[l],u=i.f;if(!(!s&&i===ot)){var f=(u&Lt)===0;if(f&&Ft(i,t),(u&ss)!==0)ls.add(i);else if((u&Ht)!==0){var p=i;Yt==null||Yt.delete(p),(u&Dn)===0&&(u&ba&&(ot===null||(ot.f&os)===0)&&(i.f|=Dn),Ol(p,ja,n))}else if(f){var m=i;(u&Pa)!==0&&Sa!==null&&Sa.add(m),n!==null?n.push(m):Uo(m)}}}}function Ue(a){if(typeof a!="object"||a===null||qa in a)return a;const t=qo(a);if(t!==id&&t!==ld)return a;var n=new Map,r=Io(a),s=z(0),c=Sn,l=i=>{if(Sn===c)return i();var u=ut,f=Sn;ka(null),Si(c);var p=i();return ka(u),Si(f),p};return r&&n.set("length",z(a.length)),new Proxy(a,{defineProperty(i,u,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&yd();var p=n.get(u);return p===void 0?l(()=>{var m=z(f.value);return n.set(u,m),m}):v(p,f.value,!0),!0},deleteProperty(i,u){var f=n.get(u);if(f===void 0){if(u in i){const p=l(()=>z(Rt));n.set(u,p),yr(s)}}else v(f,Rt),yr(s);return!0},get(i,u,f){var y;if(u===qa)return a;var p=n.get(u),m=u in i;if(p===void 0&&(!m||(y=sn(i,u))!=null&&y.writable)&&(p=l(()=>{var x=Ue(m?i[u]:Rt),S=z(x);return S}),n.set(u,p)),p!==void 0){var h=e(p);return h===Rt?void 0:h}return Reflect.get(i,u,f)},getOwnPropertyDescriptor(i,u){var f=Reflect.getOwnPropertyDescriptor(i,u);if(f&&"value"in f){var p=n.get(u);p&&(f.value=e(p))}else if(f===void 0){var m=n.get(u),h=m==null?void 0:m.v;if(m!==void 0&&h!==Rt)return{enumerable:!0,configurable:!0,value:h,writable:!0}}return f},has(i,u){var h;if(u===qa)return!0;var f=n.get(u),p=f!==void 0&&f.v!==Rt||Reflect.has(i,u);if(f!==void 0||ot!==null&&(!p||(h=sn(i,u))!=null&&h.writable)){f===void 0&&(f=l(()=>{var y=p?Ue(i[u]):Rt,x=z(y);return x}),n.set(u,f));var m=e(f);if(m===Rt)return!1}return p},set(i,u,f,p){var F;var m=n.get(u),h=u in i;if(r&&u==="length")for(var y=f;y<m.v;y+=1){var x=n.get(y+"");x!==void 0?v(x,Rt):y in i&&(x=l(()=>z(Rt)),n.set(y+"",x))}if(m===void 0)(!h||(F=sn(i,u))!=null&&F.writable)&&(m=l(()=>z(void 0)),v(m,Ue(f)),n.set(u,m));else{h=m.v!==Rt;var S=l(()=>Ue(f));v(m,S)}var P=Reflect.getOwnPropertyDescriptor(i,u);if(P!=null&&P.set&&P.set.call(p,f),!h){if(r&&typeof u=="string"){var D=n.get("length"),Y=Number(u);Number.isInteger(Y)&&Y>=D.v&&v(D,Y+1)}yr(s)}return!0},ownKeys(i){e(s);var u=Reflect.ownKeys(i).filter(m=>{var h=n.get(m);return h===void 0||h.v!==Rt});for(var[f,p]of n)p.v!==Rt&&!(f in i)&&u.push(f);return u},setPrototypeOf(){kd()}})}function wi(a){try{if(a!==null&&typeof a=="object"&&qa in a)return a[qa]}catch{}return a}function lu(a,t){return Object.is(wi(a),wi(t))}var po,nr,Bl,zl,Hl;function cu(){if(po===void 0){po=window,nr=document,Bl=/Firefox/.test(navigator.userAgent);var a=Element.prototype,t=Node.prototype,n=Text.prototype;zl=sn(t,"firstChild").get,Hl=sn(t,"nextSibling").get,gi(a)&&(a[oo]=void 0,a[Vr]=null,a[io]=void 0,a.__e=void 0),gi(n)&&(n[fr]=void 0)}}function Ra(a=""){return document.createTextNode(a)}function Wa(a){return zl.call(a)}function Ar(a){return Hl.call(a)}function o(a,t){return Wa(a)}function Ee(a,t=!1){{var n=Wa(a);return n instanceof Comment&&n.data===""?Ar(n):n}}function d(a,t=1,n=!1){let r=a;for(;t--;)r=Ar(r);return r}function du(a){a.textContent=""}function Ul(){return!1}function Wl(a,t,n){return t==null||t===wl?n?document.createElement(a,{is:n}):document.createElement(a):n?document.createElementNS(t,a,{is:n}):document.createElementNS(t,a)}function Yl(a){ot===null&&(ut===null&&gd(),pd()),Ga&&_d()}function uu(a,t){var n=t.last;n===null?t.last=t.first=a:(n.next=a,a.prev=n,t.last=a)}function xa(a,t){var n=ot;n!==null&&(n.f&ea)!==0&&(a|=ea);var r={ctx:Et,deps:null,nodes:null,f:a|Lt|ba,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};Re==null||Re.register_created_effect(r);var s=r;if((a&Tn)!==0)An!==null?An.push(r):Pn.ensure().schedule(r);else if(t!==null){try{Gn(r)}catch(l){throw $t(r),l}s.deps===null&&s.teardown===null&&s.nodes===null&&s.first===s.last&&(s.f&er)===0&&(s=s.first,(a&Pa)!==0&&(a&ln)!==0&&s!==null&&(s.f|=ln))}if(s!==null&&(s.parent=n,n!==null&&uu(s,n),ut!==null&&(ut.f&Ht)!==0&&(a&$a)===0)){var c=ut;(c.effects??(c.effects=[])).push(s)}return r}function Wo(){return ut!==null&&!Ma}function Ts(a){const t=xa(Cr,null);return Ft(t,Ot),t.teardown=a,t}function Tt(a){Yl();var t=ot.f,n=!ut&&(t&ya)!==0&&Et!==null&&!Et.i;if(n){var r=Et;(r.e??(r.e=[])).push(a)}else return $l(a)}function $l(a){return xa(Tn|gl,a)}function vu(a){return Yl(),xa(Cr|gl,a)}function fu(a){Pn.ensure();const t=xa($a|er,a);return(n={})=>new Promise(r=>{n.outro?xn(t,()=>{$t(t),r(void 0)}):($t(t),r(void 0))})}function Ir(a){return xa(Tn,a)}function hu(a){return xa(In|er,a)}function Yo(a,t=0){return xa(Cr|t,a)}function M(a,t=[],n=[],r=[]){Oo(r,t,n,s=>{xa(Cr,()=>{a(...s.map(e))})})}function qr(a,t=[],n=[],r=[]){Oo(r,t,n,s=>{xa(Tn,()=>a(...s.map(e)))})}function rr(a,t=0){var n=xa(Pa|t,a);return n}function Gl(a,t=0){var n=xa(Ro|t,a);return n}function Xt(a){return xa(ya|er,a)}function Kl(a){var t=a.teardown;if(t!==null){const n=Ga,r=ut;xi(!0),ka(null);try{t.call(null)}finally{xi(n),ka(r)}}}function $o(a,t=!1){var n=a.first;for(a.first=a.last=null;n!==null;){const s=n.ac;s!==null&&ar(()=>{s.abort(Nr)});var r=n.next;(n.f&$a)!==0?n.parent=null:$t(n,t),n=r}}function _u(a){for(var t=a.first;t!==null;){var n=t.next;(t.f&ya)===0&&$t(t),t=n}}function $t(a,t=!0){var n=!1;(t||(a.f&pl)!==0)&&a.nodes!==null&&a.nodes.end!==null&&(pu(a.nodes.start,a.nodes.end),n=!0),a.f|=so,$o(a,t&&!n),xr(a,0);var r=a.nodes&&a.nodes.t;if(r!==null)for(const c of r)c.stop();Kl(a),a.f^=so,a.f|=da;var s=a.parent;s!==null&&s.first!==null&&Vl(a),a.next=a.prev=a.teardown=a.ctx=a.deps=a.fn=a.nodes=a.ac=a.b=null}function pu(a,t){for(;a!==null;){var n=a===t?null:Ar(a);a.remove(),a=n}}function Vl(a){var t=a.parent,n=a.prev,r=a.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===a&&(t.first=r),t.last===a&&(t.last=n))}function xn(a,t,n=!0){var r=[];Jl(a,r,!0);var s=()=>{n&&$t(a),t&&t()},c=r.length;if(c>0){var l=()=>--c||s();for(var i of r)i.out(l)}else s()}function Jl(a,t,n){if((a.f&ea)===0){a.f^=ea;var r=a.nodes&&a.nodes.t;if(r!==null)for(const i of r)(i.is_global||n)&&t.push(i);for(var s=a.first;s!==null;){var c=s.next;if((s.f&$a)===0){var l=(s.f&ln)!==0||(s.f&ya)!==0&&(a.f&Pa)!==0;Jl(s,t,l?n:!1)}s=c}}}function cs(a){Ql(a,!0)}function Ql(a,t){if((a.f&ea)!==0){a.f^=ea,(a.f&Ot)===0&&(Ft(a,Lt),Pn.ensure().schedule(a));for(var n=a.first;n!==null;){var r=n.next,s=(n.f&ln)!==0||(n.f&ya)!==0;Ql(n,s?t:!1),n=r}var c=a.nodes&&a.nodes.t;if(c!==null)for(const l of c)(l.is_global||t)&&l.in()}}function Go(a,t){if(a.nodes)for(var n=a.nodes.start,r=a.nodes.end;n!==null;){var s=n===r?null:Ar(n);t.append(n),n=s}}let es=!1,Ga=!1;function xi(a){Ga=a}let ut=null,Ma=!1;function ka(a){ut=a}let ot=null;function wa(a){ot=a}let La=null;function Xl(a){ut!==null&&(La??(La=new Set)).add(a)}let sa=null,ia=0,ha=null;function gu(a){ha=a}let Zl=1,hn=0,Sn=hn;function Si(a){Sn=a}function ec(){return++Zl}function Rr(a){var t=a.f;if((t&Lt)!==0)return!0;if(t&Ht&&(a.f&=~Dn),(t&ja)!==0){for(var n=a.deps,r=n.length,s=0;s<r;s++){var c=n[s];if(Rr(c)&&Cl(c),c.wv>a.wv)return!0}(t&ba)!==0&&Yt===null&&Ft(a,Ot)}return!1}function tc(a,t,n=!0){var r=a.reactions;if(r!==null&&!(La!==null&&La.has(a)))for(var s=0;s<r.length;s++){var c=r[s];(c.f&Ht)!==0?tc(c,t,!1):t===c&&(n?Ft(c,Lt):(c.f&Ot)!==0&&Ft(c,ja),Uo(c))}}function ac(a){var S;var t=sa,n=ia,r=ha,s=ut,c=La,l=Et,i=Ma,u=Sn,f=a.f;sa=null,ia=0,ha=null,ut=(f&(ya|$a))===0?a:null,La=null,Wn(a.ctx),Ma=!1,Sn=++hn,a.ac!==null&&(ar(()=>{a.ac.abort(Nr)}),a.ac=null);try{a.f|=os;var p=a.fn,m=p();a.f|=Zn;var h=a.deps,y=Re==null?void 0:Re.is_fork;if(sa!==null){var x;if(y||xr(a,ia),h!==null&&ia>0)for(h.length=ia+sa.length,x=0;x<sa.length;x++)h[ia+x]=sa[x];else a.deps=h=sa;if(Wo()&&(a.f&ba)!==0)for(x=ia;x<h.length;x++)((S=h[x]).reactions??(S.reactions=[])).push(a)}else!y&&h!==null&&ia<h.length&&(xr(a,ia),h.length=ia);if(Fr()&&ha!==null&&!Ma&&h!==null&&(a.f&(Ht|ja|Lt))===0)for(x=0;x<ha.length;x++)tc(ha[x],a);if(s!==null&&s!==a){if(hn++,s.deps!==null)for(let P=0;P<n;P+=1)s.deps[P].rv=hn;if(t!==null)for(const P of t)P.rv=hn;ha!==null&&(r===null?r=ha:r.push(...ha))}return(a.f&on)!==0&&(a.f^=on),m}catch(P){return Dl(P)}finally{a.f^=os,sa=t,ia=n,ha=r,ut=s,La=c,Wn(l),Ma=i,Sn=u}}function mu(a,t){let n=t.reactions;if(n!==null){var r=sd.call(n,a);if(r!==-1){var s=n.length-1;s===0?n=t.reactions=null:(n[r]=n[s],n.pop())}}if(n===null&&(t.f&Ht)!==0&&(sa===null||!rs.call(sa,t))){var c=t;(c.f&ba)!==0&&(c.f^=ba,c.f&=~Dn),c.v!==Rt&&Lo(c),c.ac!==null&&ar(()=>{c.ac.abort(Nr),c.ac=null,Ft(c,Lt)}),tu(c),xr(c,0)}}function xr(a,t){var n=a.deps;if(n!==null)for(var r=t;r<n.length;r++)mu(a,n[r])}function Gn(a){var t=a.f;if((t&da)===0){Ft(a,Ot);var n=ot,r=es;ot=a,es=(t&(ya|$a))===0;try{(t&(Pa|Ro))!==0?_u(a):$o(a),Kl(a);var s=ac(a);a.teardown=typeof s=="function"?s:null,a.wv=Zl;var c;vl&&Od&&(a.f&Lt)!==0&&a.deps}finally{es=r,ot=n}}}async function bu(){await Promise.resolve(),ru()}function e(a){var t=a.f,n=(t&Ht)!==0;if(ut!==null&&!Ma){var r=ot!==null&&(ot.f&da)!==0;if(!r&&(La===null||!La.has(a))){var s=ut.deps;if((ut.f&os)!==0)a.rv<hn&&(a.rv=hn,sa===null&&s!==null&&s[ia]===a?ia++:sa===null?sa=[a]:sa.push(a));else{ut.deps??(ut.deps=[]),rs.call(ut.deps,a)||ut.deps.push(a);var c=a.reactions;c===null?a.reactions=[ut]:rs.call(c,ut)||c.push(ut)}}}if(Ga&&wn.has(a))return wn.get(a);if(n){var l=a;if(Ga){var i=l.v;return((l.f&Ot)===0&&l.reactions!==null||rc(l))&&(i=zo(l)),wn.set(l,i),i}var u=(l.f&ba)===0&&!Ma&&ut!==null&&(es||(ut.f&ba)!==0),f=(l.f&Zn)===0;Rr(l)&&(u&&(l.f|=ba),Cl(l)),u&&!f&&(Nl(l),nc(l))}if(Yt!=null&&Yt.has(a))return Yt.get(a);if((a.f&on)!==0)throw a.v;return a.v}function nc(a){if(a.f|=ba,a.deps!==null)for(const t of a.deps)(t.reactions??(t.reactions=[])).push(a),(t.f&Ht)!==0&&(t.f&ba)===0&&(Nl(t),nc(t))}function rc(a){if(a.v===Rt)return!0;if(a.deps===null)return!1;for(const t of a.deps)if(wn.has(t)||(t.f&Ht)!==0&&rc(t))return!0;return!1}function Ut(a){var t=Ma;try{return Ma=!0,a()}finally{Ma=t}}function vn(a){if(!(typeof a!="object"||!a||a instanceof EventTarget)){if(qa in a)go(a);else if(!Array.isArray(a))for(let t in a){const n=a[t];typeof n=="object"&&n&&qa in n&&go(n)}}}function go(a,t=new Set){if(typeof a=="object"&&a!==null&&!(a instanceof EventTarget)&&!t.has(a)){t.add(a),a instanceof Date&&a.getTime();for(let r in a)try{go(a[r],t)}catch{}const n=qo(a);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=fl(n);for(let s in r){const c=r[s].get;if(c)try{c.call(a)}catch{}}}}}function yu(a){return a.endsWith("capture")&&a!=="gotpointercapture"&&a!=="lostpointercapture"}const ku=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function wu(a){return ku.includes(a)}const xu={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Su(a){return a=a.toLowerCase(),xu[a]??a}const Tu=["touchstart","touchmove"];function Du(a){return Tu.includes(a)}const _n=Symbol("events"),sc=new Set,mo=new Set;function oc(a,t,n,r={}){function s(c){if(r.capture||bo.call(t,c),!c.cancelBubble)return ar(()=>n==null?void 0:n.call(this,c))}return a.startsWith("pointer")||a.startsWith("touch")||a==="wheel"?Aa(()=>{t.addEventListener(a,s,r)}):t.addEventListener(a,s,r),s}function wt(a,t,n,r,s){var c={capture:r,passive:s},l=oc(a,t,n,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&Ts(()=>{t.removeEventListener(a,l,c)})}function G(a,t,n){(t[_n]??(t[_n]={}))[a]=n}function kt(a){for(var t=0;t<a.length;t++)sc.add(a[t]);for(var n of mo)n(a)}let Ti=null;function bo(a){var S,P;var t=this,n=t.ownerDocument,r=a.type,s=((S=a.composedPath)==null?void 0:S.call(a))||[],c=s[0]||a.target;Ti=a;var l=0,i=Ti===a&&a[_n];if(i){var u=s.indexOf(i);if(u!==-1&&(t===document||t===window)){a[_n]=t;return}var f=s.indexOf(t);if(f===-1)return;u<=f&&(l=u)}if(c=s[l]||a.target,c!==t){od(a,"currentTarget",{configurable:!0,get(){return c||n}});var p=ut,m=ot;ka(null),wa(null);try{for(var h,y=[];c!==null&&c!==t;){try{var x=(P=c[_n])==null?void 0:P[r];x!=null&&(!c.disabled||a.target===c)&&x.call(c,a)}catch(D){h?y.push(D):h=D}if(a.cancelBubble)break;l++,c=l<s.length?s[l]:null}if(h){for(let D of y)queueMicrotask(()=>{throw D});throw h}}finally{a[_n]=t,delete a.currentTarget,ka(p),wa(m)}}}var dl;const Os=((dl=globalThis==null?void 0:globalThis.window)==null?void 0:dl.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:a=>a});function Pu(a){return(Os==null?void 0:Os.createHTML(a))??a}function ic(a){var t=Wl("template");return t.innerHTML=Pu(a.replaceAll("<!>","<!---->")),t.content}function Kn(a,t){var n=ot;n.nodes===null&&(n.nodes={start:a,end:t,a:null,t:null})}function j(a,t){var n=(t&kl)!==0,r=(t&Nd)!==0,s,c=!a.startsWith("<!>");return()=>{s===void 0&&(s=ic(c?a:"<!>"+a),n||(s=Wa(s)));var l=r||Bl?document.importNode(s,!0):s.cloneNode(!0);if(n){var i=Wa(l),u=l.lastChild;Kn(i,u)}else Kn(l,l);return l}}function Mu(a,t,n="svg"){var r=!a.startsWith("<!>"),s=(t&kl)!==0,c=`<${n}>${r?a:"<!>"+a}</${n}>`,l;return()=>{if(!l){var i=ic(c),u=Wa(i);if(s)for(l=document.createDocumentFragment();Wa(u);)l.appendChild(Wa(u));else l=Wa(u)}var f=l.cloneNode(!0);if(s){var p=Wa(f),m=f.lastChild;Kn(p,m)}else Kn(f,f);return f}}function Ja(a,t){return Mu(a,t,"svg")}function qe(){var a=document.createDocumentFragment(),t=document.createComment(""),n=Ra();return a.append(t,n),Kn(t,n),a}function g(a,t){a!==null&&a.before(t)}function _(a,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(a[fr]??(a[fr]=a.nodeValue))&&(a[fr]=n,a.nodeValue=`${n}`)}function ju(a,t){return Eu(a,t)}const $r=new Map;function Eu(a,{target:t,anchor:n,props:r={},events:s,context:c,intro:l=!0,transformError:i}){cu();var u=void 0,f=fu(()=>{var p=n??t.appendChild(Ra());Gd(p,{pending:()=>{}},y=>{ft({});var x=Et;c&&(x.c=c),s&&(r.$$events=s),u=a(y,r)||{},ht()},i);var m=new Set,h=y=>{for(var x=0;x<y.length;x++){var S=y[x];if(!m.has(S)){m.add(S);var P=Du(S);for(const F of[t,document]){var D=$r.get(F);D===void 0&&(D=new Map,$r.set(F,D));var Y=D.get(S);Y===void 0?(F.addEventListener(S,bo,{passive:P}),D.set(S,1)):D.set(S,Y+1)}}}};return h(xs(sc)),mo.add(h),()=>{var P;for(var y of m)for(const D of[t,document]){var x=$r.get(D),S=x.get(y);--S==0?(D.removeEventListener(y,bo),x.delete(y),x.size===0&&$r.delete(D)):x.set(y,S)}mo.delete(h),p!==n&&((P=p.parentNode)==null||P.removeChild(p))}});return Cu.set(u,f),u}let Cu=new WeakMap;var Da,Ca,ca,yn,Mr,jr,ys;class Ko{constructor(t,n=!0){aa(this,"anchor");Ze(this,Da,new Map);Ze(this,Ca,new Map);Ze(this,ca,new Map);Ze(this,yn,new Set);Ze(this,Mr,!0);Ze(this,jr,t=>{if(N(this,Da).has(t)){var n=N(this,Da).get(t),r=N(this,Ca).get(n);if(r)cs(r),N(this,yn).delete(n);else{var s=N(this,ca).get(n);s&&(cs(s.effect),N(this,Ca).set(n,s.effect),N(this,ca).delete(n),s.fragment.lastChild.remove(),this.anchor.before(s.fragment),r=s.effect)}for(const[c,l]of N(this,Da)){if(N(this,Da).delete(c),c===t)break;const i=N(this,ca).get(l);i&&($t(i.effect),N(this,ca).delete(l))}for(const[c,l]of N(this,Ca)){if(c===n||N(this,yn).has(c))continue;const i=()=>{if(Array.from(N(this,Da).values()).includes(c)){var f=document.createDocumentFragment();Go(l,f),f.append(Ra()),N(this,ca).set(c,{effect:l,fragment:f})}else $t(l);N(this,yn).delete(c),N(this,Ca).delete(c)};N(this,Mr)||!r?(N(this,yn).add(c),xn(l,i,!1)):i()}}});Ze(this,ys,t=>{N(this,Da).delete(t);const n=Array.from(N(this,Da).values());for(const[r,s]of N(this,ca))n.includes(r)||($t(s.effect),N(this,ca).delete(r))});this.anchor=t,et(this,Mr,n)}ensure(t,n){var r=Re,s=Ul();if(n&&!N(this,Ca).has(t)&&!N(this,ca).has(t))if(s){var c=document.createDocumentFragment(),l=Ra();c.append(l),N(this,ca).set(t,{effect:Xt(()=>n(l)),fragment:c})}else N(this,Ca).set(t,Xt(()=>n(this.anchor)));if(N(this,Da).set(r,t),s){for(const[i,u]of N(this,Ca))i===t?r.unskip_effect(u):r.skip_effect(u);for(const[i,u]of N(this,ca))i===t?r.unskip_effect(u.effect):r.skip_effect(u.effect);r.oncommit(N(this,jr)),r.ondiscard(N(this,ys))}else N(this,jr).call(this,r)}}Da=new WeakMap,Ca=new WeakMap,ca=new WeakMap,yn=new WeakMap,Mr=new WeakMap,jr=new WeakMap,ys=new WeakMap;function le(a,t,n=!1){var r=new Ko(a),s=n?ln:0;function c(l,i){r.ensure(l,i)}rr(()=>{var l=!1;t((i,u=0)=>{l=!0,c(u,i)}),l||c(-1,null)},s)}function Oa(a,t){return t}function Nu(a,t,n){for(var r=[],s=t.length,c,l=t.length,i=0;i<s;i++){let m=t[i];xn(m,()=>{if(c){if(c.pending.delete(m),c.done.add(m),c.pending.size===0){var h=a.outrogroups;yo(a,xs(c.done)),h.delete(c),h.size===0&&(a.outrogroups=null)}}else l-=1},!1)}if(l===0){var u=r.length===0&&n!==null&&a.pending.size===0;if(u){var f=n,p=f.parentNode;du(p),p.append(f),a.items.clear()}yo(a,t,!u)}else c={pending:new Set(t),done:new Set},(a.outrogroups??(a.outrogroups=new Set)).add(c)}function yo(a,t,n=!0){var r;if(a.pending.size>0){r=new Set;for(const l of a.pending.values())for(const i of l)r.add(a.items.get(i).e)}for(var s=0;s<t.length;s++){var c=t[s];if(r!=null&&r.has(c)){c.f|=Fa;const l=document.createDocumentFragment();Go(c,l)}else $t(t[s],n)}}var Di;function je(a,t,n,r,s,c=null){var l=a,i=new Map,u=(t&bl)!==0;if(u){var f=a;l=f.appendChild(Ra())}var p=null,m=Bo(()=>{var F=n();return Io(F)?F:F==null?[]:xs(F)}),h,y=new Map,x=!0;function S(F){(Y.effect.f&da)===0&&(Y.pending.delete(F),Y.fallback=p,Fu(Y,h,l,t,r),p!==null&&(h.length===0?(p.f&Fa)===0?cs(p):(p.f^=Fa,gr(p,null,l)):xn(p,()=>{p=null})))}function P(F){Y.pending.delete(F)}var D=rr(()=>{h=e(m);for(var F=h.length,C=new Set,k=Re,T=Ul(),q=0;q<F;q+=1){var ie=h[q],ne=r(ie,q),oe=x?null:i.get(ne);oe?(oe.v&&$n(oe.v,ie),oe.i&&$n(oe.i,q),T&&k.unskip_effect(oe.e)):(oe=Au(i,x?l:Di??(Di=Ra()),ie,ne,q,s,t,n),x||(oe.e.f|=Fa),i.set(ne,oe)),C.add(ne)}if(F===0&&c&&!p&&(x?p=Xt(()=>c(l)):(p=Xt(()=>c(Di??(Di=Ra()))),p.f|=Fa)),F>C.size&&hd(),!x)if(y.set(k,C),T){for(const[re,ue]of i)C.has(re)||k.skip_effect(ue.e);k.oncommit(S),k.ondiscard(P)}else S(k);e(m)}),Y={effect:D,items:i,pending:y,outrogroups:null,fallback:p};x=!1}function ir(a){for(;a!==null&&(a.f&ya)===0;)a=a.next;return a}function Fu(a,t,n,r,s){var oe,re,ue,W,E,U,Q,fe,ye;var c=(r&Dd)!==0,l=t.length,i=a.items,u=ir(a.effect.first),f,p=null,m,h=[],y=[],x,S,P,D;if(c)for(D=0;D<l;D+=1)x=t[D],S=s(x,D),P=i.get(S).e,(P.f&Fa)===0&&((re=(oe=P.nodes)==null?void 0:oe.a)==null||re.measure(),(m??(m=new Set)).add(P));for(D=0;D<l;D+=1){if(x=t[D],S=s(x,D),P=i.get(S).e,a.outrogroups!==null)for(const te of a.outrogroups)te.pending.delete(P),te.done.delete(P);if((P.f&ea)!==0&&(cs(P),c&&((W=(ue=P.nodes)==null?void 0:ue.a)==null||W.unfix(),(m??(m=new Set)).delete(P))),(P.f&Fa)!==0)if(P.f^=Fa,P===u)gr(P,null,n);else{var Y=p?p.next:u;P===a.effect.last&&(a.effect.last=P.prev),P.prev&&(P.prev.next=P.next),P.next&&(P.next.prev=P.prev),Za(a,p,P),Za(a,P,Y),gr(P,Y,n),p=P,h=[],y=[],u=ir(p.next);continue}if(P!==u){if(f!==void 0&&f.has(P)){if(h.length<y.length){var F=y[0],C;p=F.prev;var k=h[0],T=h[h.length-1];for(C=0;C<h.length;C+=1)gr(h[C],F,n);for(C=0;C<y.length;C+=1)f.delete(y[C]);Za(a,k.prev,T.next),Za(a,p,k),Za(a,T,F),u=F,p=T,D-=1,h=[],y=[]}else f.delete(P),gr(P,u,n),Za(a,P.prev,P.next),Za(a,P,p===null?a.effect.first:p.next),Za(a,p,P),p=P;continue}for(h=[],y=[];u!==null&&u!==P;)(f??(f=new Set)).add(u),y.push(u),u=ir(u.next);if(u===null)continue}(P.f&Fa)===0&&h.push(P),p=P,u=ir(P.next)}if(a.outrogroups!==null){for(const te of a.outrogroups)te.pending.size===0&&(yo(a,xs(te.done)),(E=a.outrogroups)==null||E.delete(te));a.outrogroups.size===0&&(a.outrogroups=null)}if(u!==null||f!==void 0){var q=[];if(f!==void 0)for(P of f)(P.f&ea)===0&&q.push(P);for(;u!==null;)(u.f&ea)===0&&u!==a.fallback&&q.push(u),u=ir(u.next);var ie=q.length;if(ie>0){var ne=(r&bl)!==0&&l===0?n:null;if(c){for(D=0;D<ie;D+=1)(Q=(U=q[D].nodes)==null?void 0:U.a)==null||Q.measure();for(D=0;D<ie;D+=1)(ye=(fe=q[D].nodes)==null?void 0:fe.a)==null||ye.fix()}Nu(a,q,ne)}}c&&Aa(()=>{var te,de;if(m!==void 0)for(P of m)(de=(te=P.nodes)==null?void 0:te.a)==null||de.apply()})}function Au(a,t,n,r,s,c,l,i){var u=(l&Sd)!==0?(l&Pd)===0?ou(n,!1,!1):cn(n):null,f=(l&Td)!==0?cn(s):null;return{v:u,i:f,e:Xt(()=>(c(t,u??n,f??s,i),()=>{a.delete(r)}))}}function gr(a,t,n){if(a.nodes)for(var r=a.nodes.start,s=a.nodes.end,c=t&&(t.f&Fa)===0?t.nodes.start:n;r!==null;){var l=Ar(r);if(c.before(r),r===s)return;r=l}}function Za(a,t,n){t===null?a.effect.first=n:t.next=n,n===null?a.effect.last=t:n.prev=t}function Ke(a,t,n,r,s){var i;var c=(i=t.$$slots)==null?void 0:i[n],l=!1;c===!0&&(c=t.children,l=!0),c===void 0||c(a,l?()=>r:r)}function Lr(a,t,n){var r=new Ko(a);rr(()=>{var s=t()??null;r.ensure(s,s&&(c=>n(c,s)))},ln)}function Iu(a,t,n,r,s,c){var l=null,i=a,u=new Ko(i,!1);rr(()=>{const f=t()||null;var p=Fd;if(f===null){u.ensure(null,null);return}return u.ensure(f,m=>{if(f){if(l=Wl(f,p),Kn(l,l),r){var h=null,y=l.appendChild(Ra());r(l,y),h==null||h.remove()}ot.nodes.end=l,m.before(l)}}),()=>{}},ln),Ts(()=>{})}function Or(a,t){var n;n=document.head.appendChild(Ra());try{rr(()=>{var r=Xt(()=>t(n));r.f|=pl})}finally{}}function qu(a,t){var n=void 0,r;Gl(()=>{n!==(n=t())&&(r&&($t(r),r=null),n&&(r=Xt(()=>{Ir(()=>n(a))})))})}function lc(a){var t,n,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var s=a.length;for(t=0;t<s;t++)a[t]&&(n=lc(a[t]))&&(r&&(r+=" "),r+=n)}else for(n in a)a[n]&&(r&&(r+=" "),r+=n);return r}function Ru(){for(var a,t,n=0,r="",s=arguments.length;n<s;n++)(a=arguments[n])&&(t=lc(a))&&(r&&(r+=" "),r+=t);return r}function Lu(a){return typeof a=="object"?Ru(a):a??""}const Pi=[...` 	
\r\f \v\uFEFF`];function Ou(a,t,n){var r=a==null?"":""+a;if(t&&(r=r?r+" "+t:t),n){for(var s of Object.keys(n))if(n[s])r=r?r+" "+s:s;else if(r.length)for(var c=s.length,l=0;(l=r.indexOf(s,l))>=0;){var i=l+c;(l===0||Pi.includes(r[l-1]))&&(i===r.length||Pi.includes(r[i]))?r=(l===0?"":r.substring(0,l))+r.substring(i+1):l=i}}return r===""?null:r}function Mi(a,t=!1){var n=t?" !important;":";",r="";for(var s of Object.keys(a)){var c=a[s];c!=null&&c!==""&&(r+=" "+s+": "+c+n)}return r}function Bs(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function Bu(a,t){if(t){var n="",r,s;if(Array.isArray(t)?(r=t[0],s=t[1]):r=t,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,l=0,i=!1,u=[];r&&u.push(...Object.keys(r).map(Bs)),s&&u.push(...Object.keys(s).map(Bs));var f=0,p=-1;const S=a.length;for(var m=0;m<S;m++){var h=a[m];if(i?h==="/"&&a[m-1]==="*"&&(i=!1):c?c===h&&(c=!1):h==="/"&&a[m+1]==="*"?i=!0:h==='"'||h==="'"?c=h:h==="("?l++:h===")"&&l--,!i&&c===!1&&l===0){if(h===":"&&p===-1)p=m;else if(h===";"||m===S-1){if(p!==-1){var y=Bs(a.substring(f,p).trim());if(!u.includes(y)){h!==";"&&m++;var x=a.substring(f,m).trim();n+=" "+x+";"}}f=m+1,p=-1}}}}return r&&(n+=Mi(r)),s&&(n+=Mi(s,!0)),n=n.trim(),n===""?null:n}return a==null?null:String(a)}function at(a,t,n,r,s,c){var l=a[oo];if(l!==n||l===void 0){var i=Ou(n,r,c);i==null?a.removeAttribute("class"):t?a.className=i:a.setAttribute("class",i),a[oo]=n}else if(c&&s!==c)for(var u in c){var f=!!c[u];(s==null||f!==!!s[u])&&a.classList.toggle(u,f)}return c}function zs(a,t={},n,r){for(var s in n){var c=n[s];t[s]!==c&&(n[s]==null?a.style.removeProperty(s):a.style.setProperty(s,c,r))}}function At(a,t,n,r){var s=a[io];if(s!==t){var c=Bu(t,r);c==null?a.removeAttribute("style"):a.style.cssText=c,a[io]=t}else r&&(Array.isArray(r)?(zs(a,n==null?void 0:n[0],r[0]),zs(a,n==null?void 0:n[1],r[1],"important")):zs(a,n,r));return r}function It(a,t,n=!1){if(a.multiple){if(t==null)return;if(!Io(t))return qd();for(var r of a.options)r.selected=t.includes(kr(r));return}for(r of a.options){var s=kr(r);if(lu(s,t)){r.selected=!0;return}}(!n||t!==void 0)&&(a.selectedIndex=-1)}function Bt(a){var t=new MutationObserver(()=>{"__value"in a&&It(a,a.__value)});t.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Ts(()=>{t.disconnect()})}function ds(a,t,n=t){var r=new WeakSet,s=!0;jl(a,"change",c=>{var l=c?"[selected]":":checked",i;if(a.multiple)i=[].map.call(a.querySelectorAll(l),kr);else{var u=a.querySelector(l)??a.querySelector("option:not([disabled])");i=u&&kr(u)}n(i),a.__value=i,Re!==null&&r.add(Re)}),Ir(()=>{var c=t();if(a===document.activeElement){var l=Re;if(r.has(l))return}if(It(a,c,s),s&&c===void 0){var i=a.querySelector(":checked");i!==null&&(c=kr(i),n(c))}a.__value=c,s=!1}),Bt(a)}function kr(a){return"__value"in a?a.__value:a.value}const lr=Symbol("class"),cr=Symbol("style"),cc=Symbol("is custom element"),dc=Symbol("is html"),zu=Ss?"input":"INPUT",Hu=Ss?"option":"OPTION",Uu=Ss?"select":"SELECT",Wu=Ss?"progress":"PROGRESS";function us(a,t){var n=Ds(a);n.value===(n.value=t??void 0)||a.value===t&&(t!==0||a.nodeName!==Wu)||(a.value=t??"")}function Vo(a,t){var n=Ds(a);n.checked!==(n.checked=t??void 0)&&(a.checked=t)}function Yu(a,t){t?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function I(a,t,n,r){var s=Ds(a);s[t]!==(s[t]=n)&&(t==="loading"&&(a[ud]=n),n==null?a.removeAttribute(t):typeof n!="string"&&uc(a).includes(t)?a[t]=n:a.setAttribute(t,n))}function $u(a,t,n,r,s=!1,c=!1){var l=Ds(a),i=l[cc],u=!l[dc],f=t||{},p=a.nodeName===Hu;for(var m in t)m in n||(n[m]=null);n.class?n.class=Lu(n.class):n[lr]&&(n.class=null),n[cr]&&(n.style??(n.style=null));var h=uc(a);if(a.nodeName===zu&&"type"in n&&("value"in n||"__value"in n)){var y=n.type;(y!==f.type||y===void 0&&a.hasAttribute("type"))&&(f.type=y,I(a,"type",y))}for(const k in n){let T=n[k];if(p&&k==="value"&&T==null){a.value=a.__value="",f[k]=T;continue}if(k==="class"){var x=a.namespaceURI==="http://www.w3.org/1999/xhtml";at(a,x,T,r,t==null?void 0:t[lr],n[lr]),f[k]=T,f[lr]=n[lr];continue}if(k==="style"){At(a,T,t==null?void 0:t[cr],n[cr]),f[k]=T,f[cr]=n[cr];continue}var S=f[k];if(!(T===S&&!(T===void 0&&a.hasAttribute(k)))){f[k]=T;var P=k[0]+k[1];if(P!=="$$")if(P==="on"){const q={},ie="$$"+k;let ne=k.slice(2);var D=wu(ne);if(yu(ne)&&(ne=ne.slice(0,-7),q.capture=!0),!D&&S){if(T!=null)continue;a.removeEventListener(ne,f[ie],q),f[ie]=null}if(D)G(ne,a,T),kt([ne]);else if(T!=null){let oe=function(re){f[k].call(this,re)};var C=oe;f[ie]=oc(ne,a,oe,q)}}else if(k==="style")I(a,k,T);else if(k==="autofocus")kn(a,!!T);else if(!i&&(k==="__value"||k==="value"&&T!=null))a.value=a.__value=T;else if(k==="selected"&&p)Yu(a,T);else{var Y=k;u||(Y=Su(Y));var F=Y==="defaultValue"||Y==="defaultChecked";if(T==null&&!i&&!F)if(l[k]=null,Y==="value"||Y==="checked"){let q=a;const ie=t===void 0;if(Y==="value"){let ne=q.defaultValue;q.removeAttribute(Y),q.defaultValue=ne,q.value=q.__value=ie?ne:null}else{let ne=q.defaultChecked;q.removeAttribute(Y),q.defaultChecked=ne,q.checked=ie?ne:!1}}else a.removeAttribute(k);else F||h.includes(Y)&&(i||typeof T!="string")?(a[Y]=T,Y in l&&(l[Y]=Rt)):typeof T!="function"&&I(a,Y,T)}}}return f}function ji(a,t,n=[],r=[],s=[],c,l=!1,i=!1){Oo(s,n,r,u=>{var f=void 0,p={},m=a.nodeName===Uu,h=!1;if(Gl(()=>{var x=t(...u.map(e)),S=$u(a,f,x,c,l,i);h&&m&&"value"in x&&It(a,x.value);for(let D of Object.getOwnPropertySymbols(p))x[D]||$t(p[D]);for(let D of Object.getOwnPropertySymbols(x)){var P=x[D];D.description===Ad&&(!f||P!==f[D])&&(p[D]&&$t(p[D]),p[D]=Xt(()=>qu(a,()=>P))),S[D]=P}f=S}),m){var y=a;Ir(()=>{It(y,f.value,!0),Bt(y)})}h=!0})}function Ds(a){return a[Vr]??(a[Vr]={[cc]:a.nodeName.includes("-"),[dc]:a.namespaceURI===wl})}var Ei=new Map;function uc(a){var t=a.getAttribute("is")||a.nodeName,n=Ei.get(t);if(n)return n;Ei.set(t,n=[]);for(var r,s=a,c=Element.prototype;c!==s;){r=fl(s);for(var l in r)r[l].set&&l!=="innerHTML"&&l!=="textContent"&&l!=="innerText"&&n.push(l);s=qo(s)}return n}function bt(a,t,n=t){var r=new WeakSet;jl(a,"input",async s=>{var c=s?a.defaultValue:a.value;if(c=Hs(a)?Us(c):c,n(c),Re!==null&&r.add(Re),await bu(),c!==(c=t())){var l=a.selectionStart,i=a.selectionEnd,u=a.value.length;if(a.value=c??"",i!==null){var f=a.value.length;l===i&&i===u&&f>u?(a.selectionStart=f,a.selectionEnd=f):(a.selectionStart=l,a.selectionEnd=Math.min(i,f))}}}),Ut(t)==null&&a.value&&(n(Hs(a)?Us(a.value):a.value),Re!==null&&r.add(Re)),Yo(()=>{var s=t();if(a===document.activeElement){var c=Re;if(r.has(c))return}Hs(a)&&s===Us(a.value)||a.type==="date"&&!s&&!a.value||s!==a.value&&(a.value=s??"")})}function Hs(a){var t=a.type;return t==="number"||t==="range"}function Us(a){return a===""?null:+a}var an,Un,Er,ks,vc;const ws=class ws{constructor(t){Ze(this,ks);Ze(this,an,new WeakMap);Ze(this,Un);Ze(this,Er);et(this,Er,t)}observe(t,n){var r=N(this,an).get(t)||new Set;return r.add(n),N(this,an).set(t,r),vt(this,ks,vc).call(this).observe(t,N(this,Er)),()=>{var s=N(this,an).get(t);s.delete(n),s.size===0&&(N(this,an).delete(t),N(this,Un).unobserve(t))}}};an=new WeakMap,Un=new WeakMap,Er=new WeakMap,ks=new WeakSet,vc=function(){return N(this,Un)??et(this,Un,new ResizeObserver(t=>{for(var n of t){ws.entries.set(n.target,n);for(var r of N(this,an).get(n.target)||[])r(n)}}))},aa(ws,"entries",new WeakMap);let ko=ws;var Gu=new ko({box:"border-box"});function Ku(a,t,n){var r=Gu.observe(a,()=>n(a[t]));Ir(()=>(Ut(()=>n(a[t])),r))}function Ws(a,t){return a===t||(a==null?void 0:a[qa])===t}function Vu(a={},t,n,r){var s=Et.r,c=ot;return Ir(()=>{var l,i;return Yo(()=>{l=i,i=[],Ut(()=>{Ws(n(...i),a)||(t(a,...i),l&&Ws(n(...l),a)&&t(null,...l))})}),()=>{let u=c;for(;u!==s&&u.parent!==null&&u.parent.f&so;)u=u.parent;const f=()=>{i&&Ws(n(...i),a)&&t(null,...i)},p=u.teardown;u.teardown=()=>{f(),p==null||p()}}}),a}function Ju(a=!1){const t=Et,n=t.l.u;if(!n)return;let r=()=>vn(t.s);if(a){let s=0,c={};const l=Yn(()=>{let i=!1;const u=t.s;for(const f in u)u[f]!==c[f]&&(c[f]=u[f],i=!0);return i&&s++,s});r=()=>e(l)}n.b.length&&vu(()=>{Ci(t,r),no(n.b)}),Tt(()=>{const s=Ut(()=>n.m.map(dd));return()=>{for(const c of s)typeof c=="function"&&c()}}),n.a.length&&Tt(()=>{Ci(t,r),no(n.a)})}function Ci(a,t){if(a.l.s)for(const n of a.l.s)e(n);t()}const Qu={get(a,t){if(!a.exclude.includes(t))return e(a.version),t in a.special?a.special[t]():a.props[t]},set(a,t,n){if(!(t in a.special)){var r=ot;try{wa(a.parent_effect),a.special[t]=ma({get[t](){return a.props[t]}},t,yl)}finally{wa(r)}}return a.special[t](n),ki(a.version),!0},getOwnPropertyDescriptor(a,t){if(!a.exclude.includes(t)&&t in a.props)return{enumerable:!0,configurable:!0,value:a.props[t]}},deleteProperty(a,t){return a.exclude.includes(t)||(a.exclude.push(t),ki(a.version)),!0},has(a,t){return a.exclude.includes(t)?!1:t in a.props},ownKeys(a){return Reflect.ownKeys(a.props).filter(t=>!a.exclude.includes(t))}};function $e(a,t){return new Proxy({props:a,exclude:t,special:{},version:cn(0),parent_effect:ot},Qu)}const Xu={get(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(or(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(a,t,n){let r=a.props.length;for(;r--;){let s=a.props[r];or(s)&&(s=s());const c=sn(s,t);if(c&&c.set)return c.set(n),!0}return!1},getOwnPropertyDescriptor(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(or(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const s=sn(r,t);return s&&!s.configurable&&(s.configurable=!0),s}}},has(a,t){if(t===qa||t===ml)return!1;for(let n of a.props)if(or(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(a){const t=[];for(let n of a.props)if(or(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function Qe(...a){return new Proxy({props:a},Xu)}function ma(a,t,n,r){var C;var s=!tr||(n&jd)!==0,c=(n&Ed)!==0,l=(n&Cd)!==0,i=r,u=!0,f=void 0,p=()=>l&&s?(f??(f=Yn(r)),e(f)):(u&&(u=!1,i=l?Ut(r):r),i);let m;if(c){var h=qa in a||ml in a;m=((C=sn(a,t))==null?void 0:C.set)??(h&&t in a?k=>a[t]=k:void 0)}var y,x=!1;c?[y,x]=Ud(()=>a[t]):y=a[t],y===void 0&&r!==void 0&&(y=p(),m&&(s&&bd(),m(y)));var S;if(s?S=()=>{var k=a[t];return k===void 0?p():(u=!0,k)}:S=()=>{var k=a[t];return k!==void 0&&(i=void 0),k===void 0?i:k},s&&(n&yl)===0)return S;if(m){var P=a.$$legacy;return(function(k,T){return arguments.length>0?((!s||!T||P||x)&&m(T?S():k),k):S()})}var D=!1,Y=((n&Md)!==0?Yn:Bo)(()=>(D=!1,S()));c&&e(Y);var F=ot;return(function(k,T){if(arguments.length>0){const q=T?e(Y):s&&c?Ue(k):k;return v(Y,q),D=!0,i!==void 0&&(i=q),k}return Ga&&D||(F.f&da)!==0?Y.v:e(Y)})}function Qa(a){Et===null&&vd(),tr&&Et.l!==null?Zu(Et).m.push(a):Tt(()=>{const t=Ut(a);if(typeof t=="function")return t})}function Zu(a){var t=a.l;return t.u??(t.u={a:[],b:[],m:[]})}const ev="modulepreload",tv=function(a){return"/"+a},Ni={},av=function(t,n,r){let s=Promise.resolve();if(n&&n.length>0){let l=function(f){return Promise.all(f.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=l(n.map(f=>{if(f=tv(f),f in Ni)return;Ni[f]=!0;const p=f.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${m}`))return;const h=document.createElement("link");if(h.rel=p?"stylesheet":ev,p||(h.as="script"),h.crossOrigin="",h.href=f,u&&h.setAttribute("nonce",u),document.head.appendChild(h),p)return new Promise((y,x)=>{h.addEventListener("load",y),h.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${f}`)))})}))}function c(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return s.then(l=>{for(const i of l||[])i.status==="rejected"&&c(i.reason);return t().catch(c)})},nv="5";var ul;typeof window<"u"&&((ul=window.__svelte??(window.__svelte={})).v??(ul.v=new Set)).add(nv);Bd();/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const rv={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const sv=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Fi=(...a)=>a.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var ov=Ja("<svg><!><!></svg>");function Xe(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]),r=$e(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);ft(t,!1);let s=ma(t,"name",8,void 0),c=ma(t,"color",8,"currentColor"),l=ma(t,"size",8,24),i=ma(t,"strokeWidth",8,2),u=ma(t,"absoluteStrokeWidth",8,!1),f=ma(t,"iconNode",24,()=>[]);Ju();var p=ov();ji(p,(y,x,S)=>({...rv,...y,...r,width:l(),height:l(),stroke:c(),"stroke-width":x,class:S}),[()=>sv(r)?void 0:{"aria-hidden":"true"},()=>(vn(u()),vn(i()),vn(l()),Ut(()=>u()?Number(i())*24/Number(l()):i())),()=>(vn(Fi),vn(s()),vn(n),Ut(()=>Fi("lucide-icon","lucide",s()?`lucide-${s()}`:"",n.class)))]);var m=o(p);je(m,1,f,Oa,(y,x)=>{var S=A(()=>_l(e(x),2));let P=()=>e(S)[0],D=()=>e(S)[1];var Y=qe(),F=Ee(Y);Iu(F,P,!0,(C,k)=>{ji(C,()=>({...D()}))}),g(y,Y)});var h=d(m);Ke(h,t,"default",{}),g(a,p),ht()}function Ai(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];Xe(a,Qe({name:"award"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function fc(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];Xe(a,Qe({name:"bell"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function iv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];Xe(a,Qe({name:"book-open"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function lv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];Xe(a,Qe({name:"calendar-check"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function hc(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];Xe(a,Qe({name:"calendar-days"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function cv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];Xe(a,Qe({name:"calendar-range"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function dv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];Xe(a,Qe({name:"calendar"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Jo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];Xe(a,Qe({name:"chart-column"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Ya(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];Xe(a,Qe({name:"check"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Vn(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];Xe(a,Qe({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function uv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m15 18-6-6 6-6"}]];Xe(a,Qe({name:"chevron-left"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Jn(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];Xe(a,Qe({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function wo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];Xe(a,Qe({name:"circle-check"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function _c(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];Xe(a,Qe({name:"circle-question-mark"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Qn(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];Xe(a,Qe({name:"clock"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function vv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];Xe(a,Qe({name:"download"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function fv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];Xe(a,Qe({name:"ellipsis-vertical"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function hv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];Xe(a,Qe({name:"flame"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function _v(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];Xe(a,Qe({name:"folder"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function pv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];Xe(a,Qe({name:"grip-vertical"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function gv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]];Xe(a,Qe({name:"languages"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function pc(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["rect",{x:"3",y:"4",width:"6",height:"6",rx:"1"}]];Xe(a,Qe({name:"list-todo"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function mv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];Xe(a,Qe({name:"list"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function bv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];Xe(a,Qe({name:"mail"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function yv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];Xe(a,Qe({name:"palette"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function kv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];Xe(a,Qe({name:"pause"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Qo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];Xe(a,Qe({name:"pencil"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function vs(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];Xe(a,Qe({name:"play"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Mn(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];Xe(a,Qe({name:"plus"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function gc(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];Xe(a,Qe({name:"quote"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Xo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];Xe(a,Qe({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function wv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m17 2 4 4-4 4"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{d:"m7 22-4-4 4-4"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3"}]];Xe(a,Qe({name:"repeat"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function xv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];Xe(a,Qe({name:"rotate-ccw"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Sv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]];Xe(a,Qe({name:"save"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Tv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];Xe(a,Qe({name:"search"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Dv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];Xe(a,Qe({name:"settings"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Pv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M21 4v16"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]];Xe(a,Qe({name:"skip-forward"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Mv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];Xe(a,Qe({name:"square"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function jv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Xe(a,Qe({name:"sun"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Ev(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];Xe(a,Qe({name:"sunrise"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Cv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];Xe(a,Qe({name:"tag"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function xo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];Xe(a,Qe({name:"target"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Br(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Xe(a,Qe({name:"trash-2"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Ys(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];Xe(a,Qe({name:"trending-up"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Nv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Xe(a,Qe({name:"upload"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Fv(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]];Xe(a,Qe({name:"user-round"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}function Zo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Xe(a,Qe({name:"x"},()=>n,{get iconNode(){return r},children:(s,c)=>{var l=qe(),i=Ee(l);Ke(i,t,"default",{}),g(s,l)},$$slots:{default:!0}}))}const Av="/timer";function mc(){const a=window.location.hash,t=a.startsWith("#")?a.slice(1):a;return!t||t==="/"?Av:t}let ei=z(Ue(mc())),Ii=!1;function Iv(){Ii||typeof window>"u"||(Ii=!0,window.addEventListener("hashchange",()=>{v(ei,mc(),!0)}))}Iv();function qv(){return e(ei)}function bc(a){if(window.location.hash===`#${a}`){v(ei,a,!0);return}window.location.hash=a}const Rv=[{path:"/timer",labelKey:"timer"},{path:"/tasks",labelKey:"tasks"},{path:"/stats",labelKey:"stats"},{path:"/settings",labelKey:"settings"},{path:"/help",labelKey:"help"}],Lv={page:{timer:"番茄钟 - PomoFlow",tasks:"任务 - PomoFlow",stats:"统计 - PomoFlow",settings:"配置 - PomoFlow"},nav:{timer:"番茄钟",tasks:"任务清单",stats:"统计",settings:"配置",help:"帮助与反馈",mainNav:"主导航"},mode:{focus:"专注",shortBreak:"短休息",longBreak:"长休息",focusing:"专注中"},priority:{high:"高",medium:"中",low:"低",none:"无"},common:{confirm:"知道了",noData:"暂无任务",reviewPlaceholder:"写点复盘…",ariaCompleted:"已完成",ariaMarkDone:"标记完成",ariaMarkUndone:"标记为未完成",loading:"加载中...",close:"关闭",clear:"清除",add:"添加",expand:"展开",collapse:"收起"},timer:{start:"开始专注",startBreak:"开始休息啦",pause:"暂停",resume:"继续",stop:"停止",abandon:"放弃",skip:"跳过",starting:"启动中...",todayDone:"今日已完成",pomodoroUnit:"个番茄钟",pomodoros:"番茄",taskList:"任务清单",todayFocus:"今日专注",minute:"分钟",selectTask:"选择专注任务",selectTaskPlaceholder:"-- 选择任务 --",modeTabsAria:"计时器模式",noSpecificTask:"无特定任务",noTodoTask:"暂无待办任务",reviewTitle:"📝 今日日复盘",reviewPlaceholder:"记录今天的复盘…",clearFilter:"清除筛选",startTooltip:"开始专注",mottoRefresh:"换一条",modalTitle:"提示",focusCompleteTitle:"专注完成",noTask:"暂无任务",expandSubtasks:"展开子任务",collapseSubtasks:"收起子任务"},filter:{project:"项目",tag:"标签",priority:"优先级",date:"日　期",all:"全部",allProject:"全部项目",allTag:"全部标签",allPriority:"全部优先级",today:"今天",tomorrow:"明天",thisWeek:"本周",week:"本周",month:"本月",startDate:"开始日期",endDate:"结束日期",dueDate:"到期日",start:"开始",end:"结束",to:"至",export:"导出",projectAria:"项目筛选",tagAria:"标签筛选",priorityAria:"优先级筛选"},export:{index:"序号",title:"任务描述",project:"项目",priority:"优先级",dueDate:"到期日",estimated:"预计番茄数",tags:"标签",subtasks:"子任务",status:"任务状态",statusActive:"未完成",statusCompleted:"已完成",fileName:"任务清单"},task:{statEstimated:"预计时间",statActive:"待完成任务",statFocused:"已专注时间",statCompleted:"已完成任务",statCompletedPomo:"已完成番茄钟",searchResult:"搜索结果",list:"清单",task:"任务",noTask:"暂无任务",noDate:"未安排日期",unscheduled:"未安排",minute:"分钟",startTooltip:"开始专注",detailPriority:"优先级",detailPomodoro:"番茄",detailDueDate:"到期日",detailProject:"清单",detailReminder:"提醒",detailRepeat:"重复",detailNoTags:"无标签",detailEditTags:"编辑标签",detailCollapse:"收起",detailAddSubtask:"添加子任务...",subtaskEditPlaceholder:"修改子任务...",editSubtask:"编辑子任务",deleteSubtask:"删除子任务",detailAddNote:"添加备注...",detailDelete:"删除任务",detailNoProject:"无",detailNoTagsAvailable:"暂无可用标签",detailEmpty:"点击任务查看详情",detailTimeFilled:"已用当前时间补全截止时间，如需调整请在「到期日」中修改。",deleteConfirm:"删除任务「{title}」？",emptyAll:"暂无任务，添加一个开始吧",emptyFiltered:"此筛选下没有任务",groupHeader:"{date}（{weekday}）| {n} 分钟",detailPanelAria:"任务详情",titleAria:"标题",detailDescription:"描述",detailDescPlaceholder:"补充细节...",detailSubtasks:"子任务",newSubtaskAria:"新子任务",unknownProject:"未知",toggleSubtaskAria:"切换子任务完成",dblclickToEdit:"双击编辑",noTagsHint:"还没有标签，在「设置 → 标签」里创建",tagPickerAria:"标签多选",saveFailed:"保存失败：{err}",setTagsFailed:"设置标签失败：{err}",addSubtaskFailed:"添加子任务失败：{err}",updateSubtaskFailed:"更新子任务失败：{err}",deleteSubtaskFailed:"删除子任务失败：{err}"},stats:{dimToday:"今日",dimWeek:"本周",dimMonth:"本月",dimQuarter:"季度",dimHalf:"半年",dimYear:"年",focusDuration:"专注时长",sessions:"番茄数",completed:"完成任务",avg:"日均专注",activeDays:"活跃天数",longestStreak:"最长连续专注",avgWeek:"周均专注",avgMonth:"月均专注",peakMonth:"高峰月",peakPeriod:"高峰期",bestProject:"最佳项目",momRatio:"环比上期",trendTitle:"专注趋势",projectDist:"项目时间分布",noData:"该维度暂无专注数据",noProject:"暂无项目数据",unitMin:"分钟",unitCount:"个",unitDay:"天",byDay:"日",byWeek:"周",byMonth:"月",weeklyFocusTitle:"本周专注时长（分钟）",loading:"统计加载中...",loadError:"统计加载失败：{err}",trendChartAria:"专注趋势柱状图",donutChartAria:"项目时间分布环形图"},enum:{reminder:{"":"不提醒",on_time:"准时","5m":"提前 5 分钟","30m":"提前 30 分钟","1h":"提前 1 小时","1d":"提前 1 天","2d":"提前 2 天"},repeat:{"":"不重复",daily:"每天",weekday:"每个工作日",weekly:"每周",monthly:"每月",yearly:"每年",custom:"自定义"},weekday:["周日","周一","周二","周三","周四","周五","周六"]},settings:{tab:{account:"账号",timer:"番茄钟",lists:"清单管理",tags:"标签管理",theme:"主题背景",motto:"名言警句",notification:"通知文案",sync:"数据同步",language:"中英切换"},language:{title:"界面语言",desc:"选择系统的显示语言，切换后所有页面文字随之变化",zh:"中文",en:"英文"},sync:{title:"数据同步",serverSection:"服务器连接",serverUrl:"服务器地址",serverUrlPh:"http://192.168.1.10:8080",token:"访问令牌(Token)",tokenPh:"与服务端 .env 的 SYNC_TOKEN 一致",save:"保存配置",saved:"已保存",identitySection:"本机标识",userId:"用户 ID",deviceId:"设备 ID",identityHint:"部署服务端时,把上方「用户 ID」填入服务端 .env 的 SYNC_USER_ID(两端必须一致,否则服务端拒绝同步)",copy:"复制",copied:"已复制",syncNow:"立即同步",syncing:"同步中…",result:"完成:推送 {pushed} 条,拉取 {pulled} 条,冲突收敛 {conflicts} 条,拒收 {dropped} 条",notConfigured:"请先填写并保存服务器地址与令牌"},timerTitle:"番茄钟",timerParams:"番茄钟参数",durationSetting:"时长设置",behaviorSetting:"行为偏好",focusDuration:"番茄时长",shortBreakDuration:"短时休息",longBreakDuration:"长时休息",longBreakInterval:"长时休息间隔",longBreakIntervalEvery:"长休息间隔（每 N 个专注）",minute:"分钟",pomodoroUnit:"个番茄",autoStartNext:"自动开始下个番茄",autoStartNextDesc:"完成一个番茄后立即开始下一个",autoStartBreak:"自动开始休息",autoStartBreakDesc:"番茄完成后自动进入休息时段",autoEnterBreak:"专注完成后自动进入休息",disableBreak:"禁用休息",disableBreakDesc:"开启后将跳过所有休息时段",soundEnabled:"完成提示音",systemNotification:"系统通知",reset:"恢复默认",accountNotOpen:"该功能暂未开放",systemSection:"系统能力",autostart:"开机自启动",autostartHint:"OS 启动时自动运行 PomoFlow（静默启动，常驻托盘）",on:"已开启",off:"已关闭",notifTest:"系统通知测试",notifTestHint:"发送一条测试通知，验证系统通知链路是否通",sendTest:"发送测试",trayHint:"💡 关闭主窗口时 PomoFlow 会驻留在系统托盘，右键托盘图标可『显示窗口 / 退出』。",autostartFail:"自启动切换失败：{err}",notifPermDenied:"通知权限未授予，无法发送",notifSendFail:"通知失败：{err}",testNotifTitle:"PomoFlow 测试通知",testNotifBody:"当前 active 任务数：{n}",theme:{title:"主题背景",desc:"上方选主题决定主色（按钮、进度环、导航指示），下方选背景图可单独替换背景层——两者互不影响。",preset:"预设主题",presetBg:"预设背景",presetBgHint:"点选 8 张之一即可换背景；主色仍由上方所选主题决定。",presetBgName:{"preset-bg-1":"预设 1","preset-bg-2":"预设 2","preset-bg-3":"预设 3","preset-bg-4":"预设 4","preset-bg-5":"预设 5","preset-bg-6":"预设 6","preset-bg-7":"预设 7","preset-bg-8":"预设 8"},custom:"自定义背景",upload:"上传图片",customUsed:"已使用自定义背景",bgUsed:"已使用自定义背景图",presetBgUsed:"已使用预设背景",clearBg:"移除背景图",customHint:"支持 JPG/PNG，大图会自动压缩；上传图片会覆盖预设背景，主色仍由所选主题决定。",reset:"恢复默认",compressFail:"图片处理失败，请换一张",bgTooLarge:"背景图片过大，无法持久保存。本次使用有效，但刷新后需重新设置。",presetName:{default:"默认",sunny:"暖阳",ocean:"海洋",forest:"森林",dusk:"黄昏",lavender:"薰衣草",evening:"暮色",teal:"青石"}},motto:{title:"名言警句",addPlaceholder:"输入名言…",authorPlaceholder:"作者（可选）",addBtn:"添加",empty:"暂未添加自定义名言。番茄钟页面将轮播内置名言。",builtInBadge:"内置",defaultAuthor:"自定义",textRequired:"请输入名言内容",textTooLong:"名言不能超过 500 字",authorTooLong:"作者不能超过 64 字"},notification:{title:"通知文案",styleLabel:"提示风格",styleHintCustom:"自定义风格：填写下方文案 + 风格描述",styleHintPreset:"预设风格文案跟随界面语言自动切换；如需自定义文案请选择「自定义风格」。",styleDesc:"风格描述",styleDescPlaceholder:"如：霸气总裁风、文艺青年风…",focusEnd:"🍅 专注结束",breakEnd:"☕ 休息结束",reminder:"🔔 任务到期提醒",titleLabel:"标题",bodyLabel:"正文",placeholderHint:"用 {task_title} 作为任务名占位符，触发时自动替换",save:"保存",saved:"✓ 已保存",styleName:{default:"默认",cute:"卡哇伊",self_dep:"自嘲",strive:"奋斗",funny:"搞笑",custom:"自定义风格"},fallback:{focusTitle:"专注结束",focusBody:"番茄钟结束了，休息一下吧",breakTitle:"休息结束",breakBody:"休息结束，满满的能量开启新的任务专注。"}},repeatCustom:{title:"自定义重复",startDate:"开始日期",endDate:"结束日期",interval:"重复间隔（0~99）",type:"重复类型",typeDay:"日",typeWeek:"周",typeMonth:"月",typeYear:"年",weekdays:"重复在星期几（可多选）",monthDays:"重复在当月几日（可多选）",weekShort:["一","二","三","四","五","六","日"],needPickWeek:"请至少选择一个星期",needPickDay:"请至少选择一个日期",cancel:"取消",confirm:"确定"},list:{title:"清单管理",addRootPlaceholder:"一级清单名称",addRoot:"添加一级清单",addChild:"添加子清单",edit:"修改",del:"删除",level2Placeholder:"二级清单名称",level3Placeholder:"三级清单名称",empty:"暂无清单",dragHint:"按住拖动以重排或改变层级",reorderFail:"拖拽排序失败，请重试",reorderFailDepth:"层级过深，无法移动到此处",reorderFailCycle:"无法移动到当前位置（会形成循环）"},tag:{namePlaceholder:"输入新标签名称",add:"添加标签",colorLabel:"选择颜色：",colorAria:"颜色 {color}",nameLabel:"名称",empty:"暂无标签，请添加一个",dragHandle:"拖动以重排"}},form:{placeholder:"在此输入”任务描述”添加新任务，按「回车」键保存",titlePlaceholder:"任务标题...",pomodoroIcons:"预计番茄钟数",pomodoroUnit:"个番茄钟",more:"更多",collapse:"收起",submit:"提交",estimatedPomo:"预计番茄数",needTitle:"请输入任务名称",needTimeForReminder:"设置了提醒，请在到期日中选择具体时间（时分）",addFailed:"添加失败"},sidebar:{searchPlaceholder:"搜索",searchTasksPlaceholder:"搜索任务标题...",planned:"已计划",completed:"已完成",journal:"手账模式",emptyHint:"暂无清单，点击 + 添加",addRootAria:"新增根清单",addListTitle:"新增清单",listNamePlaceholder:"清单名称...",moreActions:"更多操作",deleteListConfirm:"删除此清单？子清单会一并删除"},journal:{monthTitle:"{year} 年 {month} 月",yearOption:"{year} 年",monthOption:"{month} 月",prevMonth:"上一月",nextMonth:"下一月",yearAria:"年份",monthAria:"月份",weekRange:"第 {n} 周（{ms}/{ds} ~ {me}/{de}）",weekday:["周一","周二","周三","周四","周五","周六","周日"],dailyReviewPlaceholder:"日复盘",weeklyReview:"📋 周复盘",weeklyReviewPlaceholder:"本周复盘"},monthPanel:{title:"{year}年{month}月 · 复盘",weeklyReadonly:"周复盘（只读 · 在手账模式每周区块内编辑）",weekRange:"第 {n} 周（周一起 {date}）",empty:"（空）",monthlyReview:"📋 月度复盘",monthlyPlaceholder:"本月总结…"},help:{tab:{manual:"用户手册",faq:"常见问题",contact:"联系我们"},manual:{timer:{title:"🍅 番茄钟",items:[{text:"选择一个任务后点击「开始」，进入专注计时。专注结束后自动切换到休息模式。"},{text:"三种模式：「专注」（默认 25 分钟，可自定义）/「短休息」（默认 5 分钟）/「长休息」（默认 15 分钟，每 N 个番茄触发一次）。"},{text:"专注结束时弹出系统通知 + 模态框提示（文案可在「配置 → 通知文案」中自定义风格）。"},{text:"可开启「自动开始休息」「自动开始下个番茄」，专注结束后无需手动操作。"},{text:"计时器到点后即使切到其他页面，通知和自动衔接也会正常触发。"},{text:"右侧显示当月任务清单，支持按项目、标签、优先级、日期筛选。"},{text:"专注下方有「今日日复盘」文本框和「座右铭」卡片（可点换一条）。"}]},tasks:{title:"📋 任务清单",items:[{text:"左侧栏切换视图：今天 / 明天 / 本周 / 已计划 / 已完成 / 手账模式。"},{text:"「已计划」页支持按项目、标签、优先级、本周、本月、到期日范围筛选。"},{text:"任务支持：标题、备注、优先级（高/中/低/无）、到期日（含时分）、预计番茄数、番茄时长、提醒、重复。"},{text:"清单（项目）支持嵌套（最多 3 级）、自定义颜色。标签支持多对多、12 种预设色。"},{text:"子任务（Checklist）：每个任务可添加多个子任务，独立勾选完成。"},{text:"点击任务可展开右侧详情面板，直接编辑标题、到期日、优先级、提醒、重复、标签、子任务、备注。"}]},reminder:{title:"🔔 任务提醒",items:[{text:"设置提醒后，到达提醒时间点（到期日减去提前量）会弹出浏览器系统通知。"},{text:"提醒选项：准时 / 提前 5 分钟 / 30 分钟 / 1 小时 / 1 天 / 2 天。"},{text:"专注期间不弹提醒，专注结束后自动补弹（避免打断专注）。"},{text:"同一提醒只弹一次，不会重复打扰。"},{text:"设置提醒时必须填写到期日的时间（时分），否则会提示补全。"}]},repeat:{title:"🔁 任务重复",items:[{text:"内置规则：每天 / 工作日 / 每周 / 每月 / 每年。设置后自动预生成重复实例（上限 50 个）。"},{text:"「自定义」：可选重复间隔（0~99）、类型（日/周/月/年）。",sub:"间隔 0 = 每周期都重复；间隔 1 = 每隔 1 个周期（跳过 1 个）；间隔 N = 每隔 N 个周期。"},{text:"类型为「周」可选星期几（一~日多选）；类型为「月」可选当月几日（多选）。"},{text:"修改重复规则时，旧的未完成实例会自动删除并按新规则重新生成。"},{text:"每个重复实例会完整复制原任务的标签、子任务、备注、优先级、番茄数。"}]},journal:{title:"📔 手账模式",items:[{text:"月级视图，按自然周分组（周一~周日），每周内按 3+3+1 分行展示。"},{text:"每天方块显示当日任务（方形复选框可切完成）+ 日复盘文本框。"},{text:"每周底部有周复盘文本框。右侧面板展示当月各周复盘（只读）+ 月度复盘（可编辑）。"},{text:"支持上一月/下一月 + 年/月下拉切换。"},{text:"番茄钟页面的「今日日复盘」与手账模式当天的日复盘数据同步。"}]},stats:{title:"📊 统计报表",items:[{text:"6 种维度切换：今日 / 本周 / 本月 / 季度 / 半年 / 年。"},{text:"通用 4 卡：专注时长、番茄数、完成任务、日均专注。"},{text:"维度越长亮点越多：活跃天数、最长连续专注、周/月均、高峰期、最佳项目、环比上期。"},{text:"趋势柱状图（按日/周/月自动切换粒度）+ 圆环图（项目时间分布），全部跟随当前主题主色（accent）统一配色，告别五颜六色。"}]},settings:{title:"⚙️ 配置",items:[{text:"「番茄钟」：专注/休息时长、长时休息间隔（2~6 个番茄）、自动开始选项。"},{text:"「清单管理」：添加/修改/删除项目（嵌套 3 级）、自定义颜色。"},{text:"「标签管理」：添加/修改/删除标签、12 种预设色。"},{text:"「主题背景」：8 种预设主题（默认/暖阳/海洋/森林/黄昏/薰衣草/暮色/青石），各含专属背景渐变与配套主色；亦可自定义上传图片（自动压缩），所有页面统一半透明蒙层淡化背景、避免刺眼。"},{text:"「名言警句」：管理自定义座右铭（存数据库，番茄钟页轮播展示）。"},{text:"「通知文案」：6 种风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），分别配置专注结束/休息结束/任务提醒的标题和正文。"}]}},faq:{items:[{q:"数据保存在哪里？会丢失吗？",a:"所有数据（任务、番茄记录、复盘、名言、通知文案、主题设置）保存在本地 SQLite 数据库（pomoflow.db）和浏览器 localStorage 中，无需联网。升级版本时数据库会自动迁移，旧数据完整保留。建议定期备份 pomoflow.db 文件。"},{q:"如何修改番茄时长和长时休息间隔？",a:"进入「配置」→「番茄钟」，在「番茄时长」「短时休息」「长时休息」下拉框中选择分钟数（1~90 分钟可选）。长时休息间隔可选 2~6 个番茄（即每完成几个番茄触发一次长休息）。"},{q:"为什么专注期间不弹任务提醒？",a:"这是设计行为。专注期间系统会抑制所有任务提醒，避免打断你的专注。专注结束后会自动补弹被跳过的提醒。"},{q:"任务提醒不弹通知怎么办？",a:"首次使用时浏览器会请求通知权限，需要点击「允许」。如果之前拒绝了，可在浏览器地址栏左侧的设置图标中重新允许通知。另外，提醒需要任务设置了「到期日+具体时间（时分）」和「提醒选项」才会触发。"},{q:"自定义重复的间隔 0 和间隔 1 有什么区别？",a:"间隔 0 = 每个周期都重复（如每天都出现）。间隔 1 = 每隔 1 个周期（如第 1 周、第 3 周、第 5 周，跳过第 2、4 周）。间隔 N = 跳过 N 个周期后再重复。"},{q:"手账模式的周复盘和月度复盘在哪里编辑？",a:"周复盘在每周区块底部的文本框直接编辑（失焦自动保存）。月度复盘在右侧面板的「📋 月度复盘」文本框编辑。左侧编辑后右侧面板会自动刷新。"},{q:"自定义名言存在哪里？刷新会丢失吗？",a:"自定义名言存在数据库（pomoflow.db）中，刷新页面不会丢失。内置的 50 条名言是程序自带的。番茄钟页面的名言卡片优先轮播自定义名言（逐条不重复），轮完一轮后重新开始。"},{q:"切换页面后专注还在计时吗？自动休息还会触发吗？",a:"是的。计时器和所有自动逻辑（自动开始休息、自动开始下个番茄、专注完成通知）都在全局状态中，切到任务清单/统计/配置等页面不影响。专注到点会正常通知和衔接。"},{q:"主题背景上传的图片太大怎么办？",a:"上传图片会自动压缩（缩放到 1920px 宽、JPEG 0.8 质量），不会撑爆存储。如果图片仍然过大导致无法持久保存，会弹出提示告知你刷新后需重新设置。"},{q:"通知文案可以自定义吗？",a:"可以。进入「配置」→「通知文案」，选择风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），文案会自动填入。你可以手动修改每个场景的标题和正文。任务提醒正文支持用 {task_title} 作为任务名占位符，触发时自动替换。"},{q:"删除清单（项目）会删除里面的任务吗？",a:"删除清单后，归属该清单的任务会自动变为「无项目」状态，任务本身不会被删除。删除子清单同理，任务会上升到父清单。"},{q:"切换主题或上传背景图后，按钮和图表颜色会跟着变吗？",a:"会。8 种预设主题各自配有一套主色（accent），切换后按钮、导航指示条、计时器圆环、统计图表、输入框焦点光晕等全部跟随变化。上传自定义背景图时，主色自动回退为默认的柔雾番茄红。"},{q:"上传的背景图太鲜艳影响阅读怎么办？",a:"所有页面都有一层统一的半透明蒙层覆盖在背景图上，会自动淡化背景，保证文字与卡片清晰可读。如果仍觉得偏亮，可在「配置 → 主题背景」中换用更柔和的预设主题。"}]},contact:{intro:"如有商务合作或其他事项，可通过以下方式联系我们：",emailLabel:"邮箱：",phoneLabel:"电话：",workHoursLabel:"工作时间：",workHours:"周一至周五 7:00 - 08:50 | 18：30 - 22：00 ; 周末 07：00 - 22：00",feedbackTitle:"问题反馈 / 功能建议",feedbackDesc:"如果您在使用过程中遇到 Bug 或有功能建议，请发送邮件到以上邮箱，我们会及时跟进处理。",subjectLabel:"邮件主题格式：",subjectFormat:"PomoFlow-功能建议",subjectHint:"（可选：功能建议 / Bug 反馈 / 使用疑问）",bodyLabel:"邮件正文建议包含：",bodyItems:["问题或建议的详细描述","您的联系方式（邮箱 / QQ / 手机号），方便我们回复","遇到 Bug 时的操作步骤（便于我们复现）"],exampleLabel:"示例：",exampleText:`主题：PomoFlow-Bug 反馈

您好，我在创建任务时点击「重复」
选择「自定义」后弹窗没有出现。

联系方式：user@example.com`}}},Ov={page:{timer:"Timer - PomoFlow",tasks:"Tasks - PomoFlow",stats:"Stats - PomoFlow",settings:"Settings - PomoFlow"},nav:{timer:"Pomodoro",tasks:"Tasks",stats:"Stats",settings:"Settings",help:"Help & Feedback",mainNav:"Main navigation"},mode:{focus:"Focus",shortBreak:"Short Break",longBreak:"Long Break",focusing:"Focusing"},priority:{high:"High",medium:"Medium",low:"Low",none:"None"},common:{confirm:"OK",noData:"No tasks yet",reviewPlaceholder:"Write a review…",ariaCompleted:"Completed",ariaMarkDone:"Mark complete",ariaMarkUndone:"Mark as not done",loading:"Loading...",close:"Close",clear:"Clear",add:"Add",expand:"Expand",collapse:"Collapse"},timer:{start:"Start Focus",startBreak:"Start Break",pause:"Pause",resume:"Resume",stop:"Stop",abandon:"Abandon",skip:"Skip",starting:"Starting…",todayDone:"Today completed",pomodoroUnit:"pomodoros",pomodoros:"pomodoros",taskList:"Tasks",todayFocus:"Today's focus",minute:"min",selectTask:"Select a task",selectTaskPlaceholder:"-- Select a task --",modeTabsAria:"Timer mode",noSpecificTask:"No specific task",noTodoTask:"No active tasks",reviewTitle:"📝 Daily Review",reviewPlaceholder:"Write today’s review…",clearFilter:"Clear filters",startTooltip:"Start focus",mottoRefresh:"Next",modalTitle:"Notice",focusCompleteTitle:"Focus complete",noTask:"No tasks",expandSubtasks:"Expand subtasks",collapseSubtasks:"Collapse subtasks"},filter:{project:"Project",tag:"Tag",priority:"Priority",date:"Date",all:"All",allProject:"All projects",allTag:"All tags",allPriority:"All priorities",today:"Today",tomorrow:"Tomorrow",thisWeek:"This week",week:"This week",month:"This month",startDate:"Start date",endDate:"End date",dueDate:"Due date",start:"Start",end:"End",to:"to",export:"Export",projectAria:"Filter by project",tagAria:"Filter by tag",priorityAria:"Filter by priority"},export:{index:"No.",title:"Task",project:"Project",priority:"Priority",dueDate:"Due date",estimated:"Est. Pomodoros",tags:"Tags",subtasks:"Subtasks",status:"Status",statusActive:"Active",statusCompleted:"Completed",fileName:"Tasks"},task:{statEstimated:"Estimated time",statActive:"Active tasks",statFocused:"Time focused",statCompleted:"Tasks done",statCompletedPomo:"Pomodoros done",searchResult:"Search results",list:"List",task:"Tasks",noTask:"No tasks yet",noDate:"No date",unscheduled:"Unscheduled",minute:"min",startTooltip:"Start focus",detailPriority:"Priority",detailPomodoro:"Pomodoro",detailDueDate:"Due date",detailProject:"List",detailReminder:"Reminder",detailRepeat:"Repeat",detailNoTags:"No tags",detailEditTags:"Edit tags",detailCollapse:"Collapse",detailAddSubtask:"Add subtask...",subtaskEditPlaceholder:"Edit subtask...",editSubtask:"Edit subtask",deleteSubtask:"Delete subtask",detailAddNote:"Add note...",detailDelete:"Delete task",detailNoProject:"None",detailNoTagsAvailable:"No tags available",detailEmpty:"Click a task to view details",detailTimeFilled:"Filled the due time with the current time. Adjust in “Due date” if needed.",deleteConfirm:'Delete task "{title}"?',emptyAll:"No tasks yet — add one to get started",emptyFiltered:"No tasks match these filters",groupHeader:"{date} ({weekday}) | {n} min",detailPanelAria:"Task details",titleAria:"Title",detailDescription:"Description",detailDescPlaceholder:"Add details...",detailSubtasks:"Subtasks",newSubtaskAria:"New subtask",unknownProject:"Unknown",toggleSubtaskAria:"Toggle subtask completion",dblclickToEdit:"Double-click to edit",noTagsHint:"No tags yet — create them in Settings → Tags",tagPickerAria:"Tag multi-select",saveFailed:"Save failed: {err}",setTagsFailed:"Failed to set tags: {err}",addSubtaskFailed:"Failed to add subtask: {err}",updateSubtaskFailed:"Failed to update subtask: {err}",deleteSubtaskFailed:"Failed to delete subtask: {err}"},stats:{dimToday:"Today",dimWeek:"This week",dimMonth:"This month",dimQuarter:"Quarter",dimHalf:"Half-year",dimYear:"Year",focusDuration:"Focus time",sessions:"Pomodoros",completed:"Tasks done",avg:"Daily avg",activeDays:"Active days",longestStreak:"Longest streak",avgWeek:"Weekly avg",avgMonth:"Monthly avg",peakMonth:"Peak month",peakPeriod:"Peak period",bestProject:"Top project",momRatio:"vs last period",trendTitle:"Focus trend",projectDist:"Project distribution",noData:"No focus data for this range",noProject:"No project data",unitMin:"min",unitCount:"",unitDay:"d",byDay:"day",byWeek:"week",byMonth:"month",weeklyFocusTitle:"This week’s focus (min)",loading:"Loading stats...",loadError:"Failed to load stats: {err}",trendChartAria:"Focus trend bar chart",donutChartAria:"Project distribution donut chart"},enum:{reminder:{"":"No reminder",on_time:"On time","5m":"5 min before","30m":"30 min before","1h":"1 hour before","1d":"1 day before","2d":"2 days before"},repeat:{"":"No repeat",daily:"Daily",weekday:"Weekdays",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",custom:"Custom"},weekday:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},settings:{tab:{account:"Account",timer:"Pomodoro",lists:"Lists",tags:"Tags",theme:"Theme",motto:"Mottos",notification:"Notifications",sync:"Data Sync",language:"Language"},sync:{title:"Data Sync",serverSection:"Server connection",serverUrl:"Server URL",serverUrlPh:"http://192.168.1.10:8080",token:"Access token",tokenPh:"SYNC_TOKEN from the server .env",save:"Save",saved:"Saved",identitySection:"This device",userId:"User ID",deviceId:"Device ID",identityHint:"When deploying the server, put the User ID above into SYNC_USER_ID in the server .env (both sides must match, otherwise the server rejects sync)",copy:"Copy",copied:"Copied",syncNow:"Sync now",syncing:"Syncing…",result:"Done: pushed {pushed}, pulled {pulled}, conflicts resolved {conflicts}, dropped {dropped}",notConfigured:"Save the server URL and token first"},language:{title:"Interface Language",desc:"Choose the display language. All pages update instantly.",zh:"Chinese",en:"English"},timerTitle:"Pomodoro",timerParams:"Timer parameters",durationSetting:"Durations",behaviorSetting:"Behavior",focusDuration:"Focus duration",shortBreakDuration:"Short break",longBreakDuration:"Long break",longBreakInterval:"Long-break interval",longBreakIntervalEvery:"Long-break interval (every N focus sessions)",minute:"min",pomodoroUnit:"pomodoros",autoStartNext:"Auto-start next pomodoro",autoStartNextDesc:"Start the next pomodoro immediately after one ends",autoStartBreak:"Auto-start break",autoStartBreakDesc:"Enter break automatically after a pomodoro",autoEnterBreak:"Enter break automatically after focus ends",disableBreak:"Disable breaks",disableBreakDesc:"Skip all break periods when enabled",soundEnabled:"Completion sound",systemNotification:"System notifications",reset:"Reset to default",accountNotOpen:"This feature is not available yet",systemSection:"System",autostart:"Launch at startup",autostartHint:"Run PomoFlow automatically at OS startup (silent start, stays in tray)",on:"On",off:"Off",notifTest:"Notification test",notifTestHint:"Send a test notification to verify the system notification pipeline",sendTest:"Send test",trayHint:"💡 When you close the main window, PomoFlow stays in the system tray. Right-click the tray icon to show the window or quit.",autostartFail:"Failed to toggle autostart: {err}",notifPermDenied:"Notification permission not granted",notifSendFail:"Notification failed: {err}",testNotifTitle:"PomoFlow test notification",testNotifBody:"Active tasks: {n}",theme:{title:"Theme",desc:"Pick a preset above to set the accent color (buttons, progress ring, nav indicator). Pick a background below to independently override the background layer. The two are independent.",preset:"Preset themes",presetBg:"Preset backgrounds",presetBgHint:"Click any of the 8 boxes to switch the background. The accent color still comes from the chosen theme above.",presetBgName:{"preset-bg-1":"Preset 1","preset-bg-2":"Preset 2","preset-bg-3":"Preset 3","preset-bg-4":"Preset 4","preset-bg-5":"Preset 5","preset-bg-6":"Preset 6","preset-bg-7":"Preset 7","preset-bg-8":"Preset 8"},custom:"Custom background",upload:"Upload image",customUsed:"Using custom background",bgUsed:"Custom background active",presetBgUsed:"Preset background active",clearBg:"Remove background",customHint:"JPG/PNG supported; large images are auto-compressed. The uploaded image replaces the preset background; the accent color still comes from the chosen theme.",reset:"Reset to default",compressFail:"Image processing failed, please try another.",bgTooLarge:"The background image is too large to persist. It works this session, but you’ll need to reset it after refresh.",presetName:{default:"Default",sunny:"Sunny",ocean:"Ocean",forest:"Forest",dusk:"Dusk",lavender:"Lavender",evening:"Evening",teal:"Teal"}},motto:{title:"Mottos",addPlaceholder:"Enter a motto…",authorPlaceholder:"Author (optional)",addBtn:"Add",empty:"No custom mottos yet. The timer page will cycle through built-in mottos.",builtInBadge:"Built-in",defaultAuthor:"Custom",textRequired:"Please enter the motto text",textTooLong:"Motto text must be at most 500 characters",authorTooLong:"Author must be at most 64 characters"},notification:{title:"Notifications",styleLabel:"Style",styleHintCustom:"Custom style: fill in the texts below + a style description",styleHintPreset:'Preset style texts follow the interface language automatically. To customize, choose "Custom style".',styleDesc:"Style description",styleDescPlaceholder:"e.g. CEO style, artsy style…",focusEnd:"🍅 Focus ended",breakEnd:"☕ Break ended",reminder:"🔔 Task reminder",titleLabel:"Title",bodyLabel:"Body",placeholderHint:"Use {task_title} as the task name placeholder; auto-replaced on trigger",save:"Save",saved:"✓ Saved",styleName:{default:"Default",cute:"Cute",self_dep:"Self-deprecating",strive:"Strive",funny:"Funny",custom:"Custom"},fallback:{focusTitle:"Focus ended",focusBody:"A pomodoro just ended — take a short break.",breakTitle:"Break ended",breakBody:"Break over — back to focused work with fresh energy."}},repeatCustom:{title:"Custom repeat",startDate:"Start date",endDate:"End date",interval:"Interval (0–99)",type:"Repeat type",typeDay:"Day",typeWeek:"Week",typeMonth:"Month",typeYear:"Year",weekdays:"Repeat on weekdays (multi-select)",monthDays:"Repeat on days of month (multi-select)",weekShort:["M","T","W","T","F","S","S"],needPickWeek:"Please pick at least one weekday",needPickDay:"Please pick at least one date",cancel:"Cancel",confirm:"OK"},list:{title:"Lists",addRootPlaceholder:"Top-level list name",addRoot:"Add top-level list",addChild:"Add sub-list",edit:"Rename",del:"Delete",level2Placeholder:"Sub-list name",level3Placeholder:"Sub-list name",empty:"No lists yet",dragHint:"Hold and drag to reorder or change level",reorderFail:"Reorder failed, please try again",reorderFailDepth:"Target location exceeds max depth",reorderFailCycle:"Cannot move: would create a cycle"},tag:{namePlaceholder:"Enter tag name",add:"Add tag",colorLabel:"Color:",colorAria:"Color {color}",nameLabel:"Name",empty:"No tags yet, add one",dragHandle:"Drag to reorder"}},form:{placeholder:'Type a "task description" here to add a new task, press Enter to save',titlePlaceholder:"Task title...",pomodoroIcons:"Estimated pomodoros",pomodoroUnit:"pomodoros",more:"More",collapse:"Collapse",submit:"Add",estimatedPomo:"Est. pomodoros",needTitle:"Please enter a task title",needTimeForReminder:"A reminder needs a specific time (HH:MM) in the due date",addFailed:"Failed to add"},sidebar:{searchPlaceholder:"Search",searchTasksPlaceholder:"Search task titles...",planned:"Planned",completed:"Completed",journal:"Journal",emptyHint:"No lists yet, click + to add",addRootAria:"Add root list",addListTitle:"Add list",listNamePlaceholder:"List name...",moreActions:"More actions",deleteListConfirm:"Delete this list? Sub-lists will be deleted too"},journal:{monthTitle:"{month} {year}",yearOption:"{year}",monthOption:"{month}",prevMonth:"Previous month",nextMonth:"Next month",yearAria:"Year",monthAria:"Month",weekRange:"Week {n} ({ms}/{ds} – {me}/{de})",weekday:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],dailyReviewPlaceholder:"Daily review",weeklyReview:"📋 Weekly review",weeklyReviewPlaceholder:"This week's review"},monthPanel:{title:"{month}/{year} · Review",weeklyReadonly:"Weekly reviews (read-only · edited in each week block)",weekRange:"Week {n} (from {date})",empty:"(empty)",monthlyReview:"📋 Monthly review",monthlyPlaceholder:"Monthly summary…"},help:{tab:{manual:"User Manual",faq:"FAQ",contact:"Contact Us"},manual:{timer:{title:"🍅 Pomodoro",items:[{text:"Pick a task and click “Start” to begin a focus session. When focus ends, the app switches to break mode automatically."},{text:"Three modes: “Focus” (default 25 min, customizable) / “Short break” (default 5 min) / “Long break” (default 15 min, triggered every N pomodoros)."},{text:"When focus ends, a system notification + modal appears (you can customize the wording under Settings → Notifications)."},{text:"Enable “Auto-start break” and “Auto-start next pomodoro” so focus endings need no manual action."},{text:"Even if you switch pages after the timer finishes, notifications and auto-transitions still fire."},{text:"The right panel shows the current task list, filterable by project, tag, priority, and date."},{text:"Below the timer are a “Daily review” text box and a “Motto” card (click to get another)."}]},tasks:{title:"📋 Tasks",items:[{text:"Switch views from the left sidebar: Today / Tomorrow / This week / Planned / Completed / Journal."},{text:"The “Planned” view supports filtering by project, tag, priority, this week, this month, and due-date range."},{text:"Tasks support: title, note, priority (high/medium/low/none), due date (with time), estimated pomodoros, pomodoro duration, reminder, and repeat."},{text:"Lists (projects) support nesting (up to 3 levels) and custom colors. Tags support many-to-many with 12 preset colors."},{text:"Subtasks (checklist): each task can have multiple subtasks, each toggleable independently."},{text:"Click a task to open the right detail panel and edit title, due date, priority, reminder, repeat, tags, subtasks, and notes."}]},reminder:{title:"🔔 Reminders",items:[{text:"After setting a reminder, a browser notification fires at the reminder time (due date minus the lead time)."},{text:"Reminder options: On time / 5 min / 30 min / 1 hour / 1 day / 2 days before."},{text:"No reminders fire during focus; they are shown after focus ends (to avoid breaking focus)."},{text:"Each reminder fires only once — no repeat interruptions."},{text:"A reminder requires a due date with a specific time (HH:MM); otherwise you’ll be prompted to fill it in."}]},repeat:{title:"🔁 Repeat",items:[{text:"Built-in rules: Daily / Weekdays / Weekly / Monthly / Yearly. Setting one auto-generates repeat instances (up to 50)."},{text:"“Custom”: choose an interval (0–99) and a type (day/week/month/year).",sub:"Interval 0 = repeat every cycle; interval 1 = every other cycle (skip 1); interval N = every N cycles."},{text:"Type “Week” lets you pick weekdays (Mon–Sun, multi-select); type “Month” lets you pick days of the month (multi-select)."},{text:"When you change the repeat rule, old incomplete instances are deleted and regenerated under the new rule."},{text:"Each repeat instance fully copies the original task’s tags, subtasks, notes, priority, and pomodoro count."}]},journal:{title:"📔 Journal",items:[{text:"Monthly view, grouped by natural weeks (Mon–Sun); each week is laid out in a 3+3+1 row split."},{text:"Each day cell shows that day’s tasks (a square checkbox toggles completion) plus a daily-review text box."},{text:"Each week has a weekly-review box at the bottom. The right panel shows the month’s weekly reviews (read-only) + a monthly review (editable)."},{text:"Supports previous/next month and year/month dropdowns."},{text:"The “daily review” on the timer page syncs with the same day’s daily review in Journal mode."}]},stats:{title:"📊 Stats",items:[{text:"Six range filters: Today / This week / This month / Quarter / Half-year / Year."},{text:"Four common cards: focus time, pomodoros, tasks done, daily average."},{text:"Longer ranges unlock more highlights: active days, longest streak, weekly/monthly averages, peak period, top project, and period-over-period."},{text:"Trend bar chart (auto day/week/month granularity) + donut chart (project time distribution), all colored by the current theme accent — no more rainbow."}]},settings:{title:"⚙️ Settings",items:[{text:"“Pomodoro”: focus/break durations, long-break interval (2–6 pomodoros), and auto-start options."},{text:"“Lists”: add/rename/delete projects (3-level nesting), custom colors."},{text:"“Tags”: add/rename/delete tags, 12 preset colors."},{text:"“Theme”: 8 preset themes (Default/Sunny/Ocean/Forest/Dusk/Lavender/Evening/Teal), each with its own background gradient and matching accent; you can also upload a custom image (auto-compressed). All pages use a unified translucent veil to soften the background."},{text:"“Mottos”: manage custom mottos (stored in the database, cycled on the timer page)."},{text:"“Notifications”: 6 styles (Default/Cute/Self-deprecating/Strive/Funny/Custom), each configurable for focus-end/break-end/reminder title and body."}]}},faq:{items:[{q:"Where is my data stored? Can it be lost?",a:"All data (tasks, pomodoro records, reviews, mottos, notification wording, theme settings) is stored in a local SQLite database (pomoflow.db) and browser localStorage — no internet needed. When you upgrade, the database auto-migrates and old data is fully preserved. Back up pomoflow.db regularly."},{q:"How do I change the pomodoro duration and long-break interval?",a:"Go to Settings → Pomodoro and pick minutes from the Focus / Short break / Long break dropdowns (1–90 min). The long-break interval can be 2–6 pomodoros (i.e. a long break every N pomodoros)."},{q:"Why do task reminders not fire during focus?",a:"By design. During focus, all task reminders are suppressed so your focus isn’t interrupted. Skipped reminders are shown after focus ends."},{q:"What if task reminders don’t show a notification?",a:"On first use the browser asks for notification permission — click “Allow”. If you denied it, re-enable notifications via the settings icon on the left of the address bar. Also, a reminder only fires when the task has a due date with a specific time (HH:MM) and a reminder option set."},{q:"In custom repeat, what’s the difference between interval 0 and interval 1?",a:"Interval 0 = repeat every cycle (e.g. appears every day). Interval 1 = every other cycle (e.g. weeks 1, 3, 5, skipping 2 and 4). Interval N = skip N cycles, then repeat."},{q:"Where do I edit weekly and monthly reviews in Journal mode?",a:"Weekly reviews are edited in the text box at the bottom of each week block (auto-saved on blur). Monthly reviews are edited in the “📋 Monthly review” box on the right panel. Edits on the left refresh the right panel automatically."},{q:"Where are custom mottos stored? Lost on refresh?",a:"Custom mottos are stored in the database (pomoflow.db) and survive refreshes. The 50 built-in mottos ship with the app. The motto card on the timer page prefers custom mottos (cycling without repeats) and restarts after one full loop."},{q:"Does focus keep timing after I switch pages? Do auto-breaks still fire?",a:"Yes. The timer and all auto logic (auto-start break, auto-start next pomodoro, focus-end notification) live in global state, so switching to Tasks/Stats/Settings doesn’t affect them. Focus completions still notify and transition."},{q:"What if an uploaded background image is too large?",a:"Uploads are auto-compressed (scaled to 1920px wide, JPEG quality 0.8), so storage isn’t blown up. If an image is still too large to persist, a prompt tells you to reset after refresh."},{q:"Can notification wording be customized?",a:"Yes. Go to Settings → Notifications and pick a style (Default/Cute/Self-deprecating/Strive/Funny/Custom); the wording auto-fills. You can edit each scene’s title and body. The reminder body supports {task_title} as the task name placeholder, auto-replaced on trigger."},{q:"Does deleting a list (project) delete its tasks?",a:"No. Deleting a list sets its tasks to “no project”; the tasks themselves aren’t deleted. Deleting a sub-list works the same way — tasks move up to the parent list."},{q:"Do buttons and charts change color when I switch themes or upload a background?",a:"Yes. Each of the 8 preset themes has its own accent color; switching it updates buttons, the nav indicator, the timer ring, charts, and input focus glow. When you upload a custom background, the accent falls back to the default soft tomato."},{q:"What if an uploaded background is too vivid to read?",a:"Every page has a unified translucent veil over the background that softens it, keeping text and cards readable. If it still feels bright, switch to a softer preset theme under Settings → Theme."}]},contact:{intro:"For business cooperation or other matters, reach us via:",emailLabel:"Email: ",phoneLabel:"Phone: ",workHoursLabel:"Working hours: ",workHours:"Mon–Fri 7:00 - 08:50 | 18：30 - 22：00 ;  Weekend: 07:00 - 22:00",feedbackTitle:"Bug Reports / Feature Requests",feedbackDesc:"If you hit a bug or have a feature idea, email the address above and we’ll follow up.",subjectLabel:"Email subject format:",subjectFormat:"PomoFlow-Feature Request",subjectHint:"(Optional: Feature Request / Bug Report / Question)",bodyLabel:"Email body should include:",bodyItems:["Detailed description of the issue or suggestion","Your contact (email / QQ / phone) so we can reply","Steps to reproduce if it’s a bug"],exampleLabel:"Example:",exampleText:`Subject: PomoFlow-Bug Report

Hi, when creating a task I clicked “Repeat”
and chose “Custom” but the dialog didn’t appear.

Contact: user@example.com`}}},Bv={zh:Lv,en:Ov},qi="zh",yc="pomoflow-lang";function zv(){if(typeof localStorage>"u")return qi;try{const a=localStorage.getItem(yc);if(a==="en"||a==="zh")return a}catch{}return qi}let Ps=z(Ue(zv()));function Ms(){return e(Ps)}function Hv(a){if(v(Ps,a,!0),typeof localStorage<"u")try{localStorage.setItem(yc,a)}catch{}typeof document<"u"&&(document.documentElement.lang=a)}function gt(){return Bv[e(Ps)]}function Nt(a,t){return Object.entries(t).reduce((n,[r,s])=>n.split(`{${r}}`).join(String(s)),a)}typeof document<"u"&&(document.documentElement.lang=e(Ps));const kc="pomoflow:settings:v2",Uv="pomoflow:settings:v1",dr={focusDuration:25,shortBreakDuration:5,longBreakDuration:15,longBreakInterval:4,autoStartNextPomodoro:!1,autoStartBreak:!1,disableBreak:!1,soundEnabled:!0,desktopNotificationEnabled:!0};function Wv(a){try{const t=JSON.parse(a),n={};return typeof t.focusMinutes=="number"&&(n.focusDuration=t.focusMinutes),typeof t.shortBreakMinutes=="number"&&(n.shortBreakDuration=t.shortBreakMinutes),typeof t.longBreakMinutes=="number"&&(n.longBreakDuration=t.longBreakMinutes),typeof t.longBreakInterval=="number"&&(n.longBreakInterval=t.longBreakInterval),typeof t.autoChain=="boolean"&&(n.autoStartBreak=t.autoChain),typeof t.soundEnabled=="boolean"&&(n.soundEnabled=t.soundEnabled),typeof t.desktopNotificationEnabled=="boolean"&&(n.desktopNotificationEnabled=t.desktopNotificationEnabled),Object.keys(n).length>0?n:null}catch{return null}}function wc(a){typeof localStorage>"u"||localStorage.setItem(kc,JSON.stringify(a))}function Yv(){if(typeof localStorage>"u")return{...dr};const a=localStorage.getItem(kc);if(a)try{const n=JSON.parse(a);return{...dr,...n}}catch{return{...dr}}const t=localStorage.getItem(Uv);if(t){const n=Wv(t);if(n){const r={...dr,...n};return wc(r),r}}return{...dr}}let ts=z(Ue(Yv()));function Xa(){return e(ts)}function Ri(a){v(ts,{...e(ts),...a},!0),wc(e(ts))}const $v=[{key:"default",label:"默认"},{key:"cute",label:"卡哇伊"},{key:"self_dep",label:"自嘲"},{key:"strive",label:"奋斗"},{key:"funny",label:"搞笑"},{key:"custom",label:"自定义风格"}],xc={default:{style:"default",focus_end_title:"专注结束",focus_end_body:"番茄钟结束了，休息一下吧",break_end_title:"休息结束",break_end_body:"休息结束，满满的能量开启新的任务专注。",reminder_title:"PomoFlow 任务提醒",reminder_body:"任务「{task_title}」提醒时间已到"},cute:{style:"cute",focus_end_title:"专注完成啦~",focus_end_body:"你好棒呀！休息一下吧~ ✨",break_end_title:"休息结束啦~",break_end_body:"元气满满，继续加油鸭！✧",reminder_title:"该做任务啦~",reminder_body:"「{task_title}」的时间到啦，快去看看吧~ ♪"},self_dep:{style:"self_dep",focus_end_title:"又混过去一个",focus_end_body:"居然坚持下来了，不太像你啊…",break_end_title:"该干活了",break_end_body:"虽然我知道你不想，但还是开始吧…",reminder_title:"别装了",reminder_body:"「{task_title}」该做了，别再拖了"},strive:{style:"strive",focus_end_title:"专注完成！",focus_end_body:"又一个番茄被你征服！继续！",break_end_title:"休息结束！",break_end_body:"调整完毕，向下一个目标冲刺！",reminder_title:"时间到了！",reminder_body:"「{task_title}」——现在就是行动的时刻！"},funny:{style:"funny",focus_end_title:"终于停了！",focus_end_body:"番茄钟说：你该歇了，我也该歇了 😂",break_end_title:"歇够了？",break_end_body:"再不开始老板要扣工资了…你是自己的老板？那更得自律！🤣",reminder_title:"起来搬砖！",reminder_body:"「{task_title}」叫你回来干活了 🧱"},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}},Sc={default:{style:"default",focus_end_title:"Focus Complete",focus_end_body:"Pomodoro finished. Take a break.",break_end_title:"Break Over",break_end_body:"Break ended — recharge and start your next focus.",reminder_title:"PomoFlow Task Reminder",reminder_body:'Task "{task_title}" reminder time has arrived'},cute:{style:"cute",focus_end_title:"Focus done~",focus_end_body:"Great job! Take a little break~ ✨",break_end_title:"Break over~",break_end_body:"Full of energy, keep it up!",reminder_title:"Time for a task~",reminder_body:'It’s time for "{task_title}", go check it~ ♪'},self_dep:{style:"self_dep",focus_end_title:"Another one down",focus_end_body:"You actually stuck with it — not very you…",break_end_title:"Back to work",break_end_body:"I know you don’t want to, but let’s begin…",reminder_title:"Stop pretending",reminder_body:'"{task_title}" is due — no more procrastinating'},strive:{style:"strive",focus_end_title:"Focus complete!",focus_end_body:"Another pomodoro conquered! Keep going!",break_end_title:"Break over!",break_end_body:"Recharged — sprint toward the next goal!",reminder_title:"Time’s up!",reminder_body:'"{task_title}" — act now!'},funny:{style:"funny",focus_end_title:"Finally stopped!",focus_end_body:"The pomodoro says: you should rest, so should I 😂",break_end_title:"Rested enough?",break_end_body:"If you don’t start now the boss will dock your pay… wait, you ARE the boss? Even more reason to be disciplined! 🤣",reminder_title:"Get back to work!",reminder_body:'"{task_title}" is calling you back to grind 🧱'},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}};function Tc(a,t,n){const r=t==="en"?Sc:xc;if(a==="custom"){const l=r.default;return{focus_end_title:(n==null?void 0:n.focus_end_title)||l.focus_end_title,focus_end_body:(n==null?void 0:n.focus_end_body)||l.focus_end_body,break_end_title:(n==null?void 0:n.break_end_title)||l.break_end_title,break_end_body:(n==null?void 0:n.break_end_body)||l.break_end_body,reminder_title:(n==null?void 0:n.reminder_title)||l.reminder_title,reminder_body:(n==null?void 0:n.reminder_body)||l.reminder_body}}const c=r[a||"default"]??r.default;return{focus_end_title:c.focus_end_title,focus_end_body:c.focus_end_body,break_end_title:c.break_end_title,break_end_body:c.break_end_body,reminder_title:c.reminder_title,reminder_body:c.reminder_body}}function Kt(a,t,n,r){if(typeof t=="function"?a!==t||!r:!t.has(a))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(a):r?r.value:t.get(a)}function ur(a,t,n,r,s){if(typeof t=="function"?a!==t||!0:!t.has(a))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(a,n),n}var un,va,Nn,Gr;const Li="__TAURI_TO_IPC_KEY__";function Gv(a,t=!1){return window.__TAURI_INTERNALS__.transformCallback(a,t)}class Kv{constructor(t){un.set(this,void 0),va.set(this,0),Nn.set(this,[]),Gr.set(this,void 0),ur(this,un,t||(()=>{})),this.id=Gv(n=>{const r=n.index;if("end"in n){r==Kt(this,va,"f")?this.cleanupCallback():ur(this,Gr,r);return}const s=n.message;if(r==Kt(this,va,"f")){for(Kt(this,un,"f").call(this,s),ur(this,va,Kt(this,va,"f")+1);Kt(this,va,"f")in Kt(this,Nn,"f");){const c=Kt(this,Nn,"f")[Kt(this,va,"f")];Kt(this,un,"f").call(this,c),delete Kt(this,Nn,"f")[Kt(this,va,"f")],ur(this,va,Kt(this,va,"f")+1)}Kt(this,va,"f")===Kt(this,Gr,"f")&&this.cleanupCallback()}else Kt(this,Nn,"f")[r]=s})}cleanupCallback(){window.__TAURI_INTERNALS__.unregisterCallback(this.id)}set onmessage(t){ur(this,un,t)}get onmessage(){return Kt(this,un,"f")}[(un=new WeakMap,va=new WeakMap,Nn=new WeakMap,Gr=new WeakMap,Li)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[Li]()}}class Oi{constructor(t,n,r){this.plugin=t,this.event=n,this.channelId=r}async unregister(){return Ce(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}}async function Dc(a,t,n){const r=new Kv(n);try{return await Ce(`plugin:${a}|register_listener`,{event:t,handler:r}),new Oi(a,t,r.id)}catch{return await Ce(`plugin:${a}|registerListener`,{event:t,handler:r}),new Oi(a,t,r.id)}}async function Ce(a,t={},n){return window.__TAURI_INTERNALS__.invoke(a,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const jn=a=>Ce("list_tasks",{query:a}),So=(a,t)=>Ce("upsert_task",{task:a,tagIds:t,tzOffsetMin:-new Date().getTimezoneOffset()}),Vv=a=>Ce("delete_task",{id:a}),Pc=a=>Ce("complete_task",{id:a}),Mc=a=>Ce("reopen_task",{id:a}),ti=()=>Ce("list_projects"),fs=a=>Ce("upsert_project",{project:a}),jc=a=>Ce("delete_project",{id:a}),Jv=a=>Ce("reorder_projects",{items:a}),ai=()=>Ce("list_tags"),Bi=a=>Ce("upsert_tag",{tag:a}),Qv=a=>Ce("delete_tag",{id:a}),Xv=a=>Ce("reorder_tags",{items:a}),Zv=a=>Ce("list_tags_for_task",{taskId:a}),ef=(a,t)=>Ce("set_tags_for_task",{taskId:a,tagIds:t}),tf=(a,t,n)=>Ce("start_pomodoro",{taskId:a,projectId:t,duration:n}),Ec=(a,t)=>Ce("stop_pomodoro",{sessionId:a,isCompleted:t}),zi=a=>Ce("get_daily_review",{date:a}),Cc=a=>Ce("upsert_daily_review",{review:a}),af=(a,t)=>Ce("list_daily_reviews",{startDate:a,endDate:t}),Nc=a=>Ce("delete_daily_review",{date:a}),nf=a=>Ce("upsert_weekly_review",{review:a}),Fc=(a,t)=>Ce("list_weekly_reviews",{year:a,month:t}),rf=a=>Ce("delete_weekly_review",{weekStart:a}),sf=a=>Ce("get_monthly_review",{yearMonth:a}),of=a=>Ce("upsert_monthly_review",{review:a}),lf=a=>Ce("delete_monthly_review",{yearMonth:a}),Ac=a=>Ce("list_subtasks_for_task",{taskId:a}),To=a=>Ce("upsert_subtask",{subtask:a}),cf=a=>Ce("delete_subtask",{id:a}),Ic=()=>Ce("list_mottos"),df=a=>Ce("upsert_motto",{motto:a}),uf=a=>Ce("delete_motto",{id:a}),qc=()=>Ce("get_notification_template"),vf=a=>Ce("upsert_notification_template",{template:a}),ff=(a,t)=>Ce("today_completed_minutes",{startMs:a,endMs:t}),Hi=(a,t,n,r)=>Ce("stats_range",{startDate:a,endDate:t,group:n,tzOffsetMin:r}),hf=(a,t,n,r)=>Ce("stats_overview",{today:a,weekStart:t,monthStart:n,tzOffsetMin:r}),ni=(a,t)=>Ce("send_notification",{title:a,body:t}),_f=()=>Ce("get_sync_config"),pf=(a,t)=>Ce("set_sync_config",{serverUrl:a,token:t}),gf=()=>Ce("get_sync_identity"),mf=()=>Ce("sync_now"),bf=(a,t,n,r)=>Ce("export_tasks_xlsx",{path:a,sheetName:t,headers:n,rows:r});var Do;(function(a){a.Year="year",a.Month="month",a.TwoWeeks="twoWeeks",a.Week="week",a.Day="day",a.Hour="hour",a.Minute="minute",a.Second="second"})(Do||(Do={}));class yf{static at(t,n=!1,r=!1){return{at:{date:t,repeating:n,allowWhileIdle:r},interval:void 0,every:void 0}}static interval(t,n=!1){return{at:void 0,interval:{interval:t,allowWhileIdle:n},every:void 0}}static every(t,n,r=!1){return{at:void 0,interval:void 0,every:{interval:t,count:n,allowWhileIdle:r}}}}var Po;(function(a){a[a.None=0]="None",a[a.Min=1]="Min",a[a.Low=2]="Low",a[a.Default=3]="Default",a[a.High=4]="High"})(Po||(Po={}));var Mo;(function(a){a[a.Secret=-1]="Secret",a[a.Private=0]="Private",a[a.Public=1]="Public"})(Mo||(Mo={}));async function js(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await Ce("plugin:notification|is_permission_granted")}async function Es(){return await window.Notification.requestPermission()}function kf(a){typeof a=="string"?new window.Notification(a):new window.Notification(a.title,a)}async function wf(a){await Ce("plugin:notification|register_action_types",{types:a})}async function xf(){return await Ce("plugin:notification|get_pending")}async function Sf(a){await Ce("plugin:notification|cancel",{notifications:a})}async function Tf(){await Ce("plugin:notification|cancel")}async function Df(){return await Ce("plugin:notification|get_active")}async function Pf(a){await Ce("plugin:notification|remove_active",{notifications:a})}async function Mf(){await Ce("plugin:notification|remove_active")}async function jf(a){await Ce("plugin:notification|create_channel",{...a})}async function Ef(a){await Ce("plugin:notification|delete_channel",{id:a})}async function Cf(){return await Ce("plugin:notification|listChannels")}async function Nf(a){return await Dc("notification","notification",a)}async function Ff(a){return await Dc("notification","actionPerformed",a)}const Af=Object.freeze(Object.defineProperty({__proto__:null,get Importance(){return Po},Schedule:yf,get ScheduleEvery(){return Do},get Visibility(){return Mo},active:Df,cancel:Sf,cancelAll:Tf,channels:Cf,createChannel:jf,isPermissionGranted:js,onAction:Ff,onNotificationReceived:Nf,pending:xf,registerActionTypes:wf,removeActive:Pf,removeAllActive:Mf,removeChannel:Ef,requestPermission:Es,sendNotification:kf},Symbol.toStringTag,{value:"Module"})),Rc="pomoflow-focus-count";let Pe=Ue({mode:"focus",secondsLeft:Xa().focusDuration*60,running:!1,sessionId:null,activeTask:null,focusCompletedCount:If(),pendingCompletionMessage:null,todayCount:0,todayMinutes:0}),Cs=0,Ns=0,jo=new Date().toDateString(),Sr=!1,fa=null;function If(){try{return parseInt(localStorage.getItem(Rc)||"0",10)||0}catch{return 0}}function ri(){return Pe}function qf(){return fa}async function Lc(){try{fa=await qc()}catch{}}function Rf(){var a;return((a=Pe.activeTask)==null?void 0:a.pomodoro_duration)??Xa().focusDuration}function zr(a){const t=Xa();return a==="focus"?Rf()*60:a==="short_break"?t.shortBreakDuration*60:t.longBreakDuration*60}function Fs(){!Pe.running&&Pe.sessionId===null&&(Pe.secondsLeft=zr(Pe.mode))}async function Xn(a,t,n){const r=n??Math.floor(zr(Pe.mode)/60),s=await tf(a,t,r);Pe.sessionId=s.id,n!==void 0&&(Pe.secondsLeft=n*60),Cs=Date.now(),Ns=Pe.secondsLeft,Pe.running=!0,Sr=!1}async function Lf(a){Pe.sessionId!==null&&await si(!1),Pe.activeTask=a,Pe.mode="focus",Fs(),await Xn(a.id,a.project_id??null,a.pomodoro_duration??void 0)}async function Of(a){Pe.activeTask=a,!Pe.running&&(Pe.sessionId!==null&&await si(!1),Pe.mode="focus",Fs(),await Xn(a.id,a.project_id??null,a.pomodoro_duration??void 0))}function $s(){Pe.running&&(Pe.running=!1)}function Gs(){Pe.running||Pe.sessionId===null||(Cs=Date.now(),Ns=Pe.secondsLeft,Pe.running=!0)}async function si(a){const t=Pe.sessionId;if(Pe.running=!1,Pe.sessionId=null,t!==null)try{await Ec(t,a)}catch(n){console.warn("stop pomodoro failed",n)}Pe.secondsLeft=zr(Pe.mode)}function hs(a){Pe.mode=a,Pe.running=!1,Pe.sessionId=null,Pe.secondsLeft=zr(a)}function Bf(){if(!Pe.running)return;const a=Math.floor((Date.now()-Cs)/1e3),t=Math.max(0,Ns-a);if(t<=0){Pe.secondsLeft=0,Pe.running=!1,Pe.sessionId!==null&&!Sr&&(Sr=!0,Oc());return}Pe.secondsLeft=t}function zf(){if(!Pe.running)return;const a=Math.floor((Date.now()-Cs)/1e3),t=Math.max(0,Ns-a);t<=0?(Pe.secondsLeft=0,Pe.running=!1,Pe.sessionId!==null&&!Sr&&(Sr=!0,Oc())):Pe.secondsLeft=t}function Hf(){Pe.pendingCompletionMessage=null}function Ui(a){Pe.activeTask=a,Fs()}function Uf(){Fs()}function Wf(a){const t=new Date().toDateString();t!==jo?(jo=t,Pe.todayCount=1,Pe.todayMinutes=a):(Pe.todayCount+=1,Pe.todayMinutes+=a)}function Yf(a,t){Pe.todayCount=a,Pe.todayMinutes=t,jo=new Date().toDateString()}async function Ks(){try{const a=new Date,t=a.getDay(),n=new Date(a);n.setDate(a.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0);const r=new Date(a.getFullYear(),a.getMonth(),1),s=l=>`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,c=await hf(s(a),s(n),s(r),-a.getTimezoneOffset());Yf(c.today_sessions,c.today_minutes)}catch(a){console.warn("sync today stats",a)}}let Wi=!1;function $f(){if(Wi||typeof window>"u")return;Wi=!0,Ks(),document.addEventListener("visibilitychange",()=>{document.hidden||Ks()});let a=new Date().toDateString();window.setInterval(()=>{const t=new Date().toDateString();t!==a&&(a=t,Ks())},6e4)}function Gf(a){const t=new Date;t.setHours(0,0,0,0);const n=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0,23,59,59,999),s={high:0,medium:1,low:2,none:3},c=a.filter(l=>{if(l.status!=="active"||!l.due_date)return!1;const i=new Date(l.due_date);if(isNaN(i.getTime())||i<n||i>r)return!1;const u=new Date(i);return u.setHours(0,0,0,0),u.getTime()<=t.getTime()});return c.sort((l,i)=>{const u=s[l.priority??"none"]??3,f=s[i.priority??"none"]??3;return u!==f?u-f:new Date(l.created_at??0).getTime()-new Date(i.created_at??0).getTime()}),c[0]??null}async function Kf(a,t){if(Xa().desktopNotificationEnabled)try{let n=await js();if(n||(n=await Es()==="granted"),!n)return;ni(a,t)}catch(n){console.warn("notification failed",n)}}async function Oc(){const a=Pe.mode,t=Math.floor(zr(a)/60),n=Pe.activeTask,r=Ms(),s=fa?{focus_end_title:fa.focus_end_title??void 0,focus_end_body:fa.focus_end_body??void 0,break_end_title:fa.break_end_title??void 0,break_end_body:fa.break_end_body??void 0,reminder_title:fa.reminder_title??void 0,reminder_body:fa.reminder_body??void 0}:null,c=Tc(fa==null?void 0:fa.style,r,s),l=a==="focus"?c.focus_end_title:c.break_end_title,i=a==="focus"?c.focus_end_body:c.break_end_body;await Kf(l,i),Pe.pendingCompletionMessage=i;const u=Pe.sessionId;if(Pe.running=!1,Pe.sessionId=null,u!==null)try{await Ec(u,!0)}catch(h){console.warn("stop pomodoro failed",h)}const f=Xa();if(a==="focus"){Pe.focusCompletedCount+=1;try{localStorage.setItem(Rc,String(Pe.focusCompletedCount))}catch{}Wf(t);let h=[];try{h=await jn({status:null,limit:null})}catch(x){console.warn("refresh tasks failed",x)}const y=n?h.find(x=>x.id===n.id)??null:null;if(!f.disableBreak&&f.autoStartBreak){const S=Pe.focusCompletedCount%f.longBreakInterval===0,P=S?"long_break":"short_break",D=S?f.longBreakDuration:f.shortBreakDuration;hs(P),await Xn(null,(y==null?void 0:y.project_id)??(n==null?void 0:n.project_id)??null,D);return}await Yi(h,y,f.autoStartNextPomodoro);return}let p=[];try{p=await jn({status:null,limit:null})}catch(h){console.warn("refresh tasks failed",h)}const m=n?p.find(h=>h.id===n.id)??null:null;await Yi(p,m,f.autoStartNextPomodoro)}async function Yi(a,t,n){if(t!==null&&t.status==="active"&&(t.completed_pomodoros??0)<(t.estimated_pomodoros??0)&&t){hs("focus"),Pe.activeTask=t,n&&await Xn(t.id,t.project_id??null,t.pomodoro_duration??void 0);return}t&&t.status==="completed"&&(Pe.activeTask=null);const s=Gf(a);Pe.activeTask=s,hs("focus"),s&&n&&await Xn(s.id,s.project_id??null,s.pomodoro_duration??void 0)}const Bc="pomoflow-fired-reminders",Vf=3e4,Jf=10080*60*1e3,Qf={on_time:0,minutes5:5*6e4,minutes30:30*6e4,hour1:60*6e4,day1:1440*6e4,days2:2880*6e4};function Xf(){try{const a=localStorage.getItem(Bc);return a?JSON.parse(a):{}}catch{return{}}}function Zf(a){try{localStorage.setItem(Bc,JSON.stringify(a))}catch{}}function zc(){const a=ri();return a.running&&a.mode==="focus"}async function eh(a){const t=qf(),n=Ms(),r=t?{reminder_title:t.reminder_title??void 0,reminder_body:t.reminder_body??void 0}:null,s=Tc(t==null?void 0:t.style,n,r),c=s.reminder_body.replace(/\{task_title\}/g,a.title);try{let l=await js();if(l||(l=await Es()==="granted"),!l)return;ni(s.reminder_title,c)}catch(l){console.warn("reminder notification failed",l)}}async function th(){const a=Date.now(),t=Xf();let n=!1,r=[];try{r=await jn({status:"active",limit:null})}catch{return}const s=zc();for(const l of r){if(l.status!=="active"||!l.reminder||l.reminder==="none"||!l.due_date)continue;const i=Qf[l.reminder];if(i===void 0)continue;const u=new Date(l.due_date).getTime();if(Number.isNaN(u))continue;const f=u-i;if(f>a)continue;const p=`${l.id}:${f}`;t[p]||s||(t[p]=f,n=!0,await eh(l))}const c=a-Jf;for(const l of Object.keys(t))t[l]<c&&(delete t[l],n=!0);n&&Zf(t)}let $i=!1,Gi=!1,Vs=!1;async function as(){if(!Vs){Vs=!0;try{await th()}finally{Vs=!1}}}function ah(){as()}function nh(){$i||typeof window>"u"||($i=!0,as(),window.setInterval(()=>void as(),Vf),window.setInterval(()=>{const a=zc();Gi&&!a&&as(),Gi=a},1e3))}const rh="/assets/preset-1-CBSgnW-Q.jpg",sh="/assets/preset-2-DV_n3pDN.jpg",oh="/assets/preset-3-q3qAbjR3.jpg",ih="/assets/preset-4-B_bSN4WY.jpg",lh="/assets/preset-5-C1j6rp_Z.jpg",ch="/assets/preset-6-_4eNaNuV.jpg",dh="/assets/preset-7-D1OhqFGY.jpg",uh="/assets/preset-8-oFCsPykG.jpg",_s=[{id:"preset-bg-1",url:`url(${rh})`},{id:"preset-bg-2",url:`url(${sh})`},{id:"preset-bg-3",url:`url(${oh})`},{id:"preset-bg-4",url:`url(${ih})`},{id:"preset-bg-5",url:`url(${lh})`},{id:"preset-bg-6",url:`url(${ch})`},{id:"preset-bg-7",url:`url(${dh})`},{id:"preset-bg-8",url:`url(${uh})`}],vh=_s.map(a=>a.id);function fh(a){return vh.includes(a)}function hh(a){var t;return((t=_s.find(n=>n.id===a))==null?void 0:t.url)??""}const Hc=[{id:"default",name:"默认",preview:"linear-gradient(160deg, #faf8f5, #ede4d8)"},{id:"sunny",name:"暖阳",preview:"linear-gradient(160deg, #fffbf5, #fde4c2)"},{id:"ocean",name:"海洋",preview:"linear-gradient(160deg, #f2f7fb, #c8dcf0)"},{id:"forest",name:"森林",preview:"linear-gradient(160deg, #f3f7f1, #cde0c6)"},{id:"dusk",name:"黄昏",preview:"linear-gradient(160deg, #fdf7f1, #edd0bc)"},{id:"lavender",name:"薰衣草",preview:"linear-gradient(160deg, #f8f5fb, #dcc8ed)"},{id:"evening",name:"暮色",preview:"linear-gradient(160deg, #f6f3f0, #d8cbbe)"},{id:"teal",name:"青石",preview:"linear-gradient(160deg, #f3f7f6, #c4dad5)"}],_h=Hc.map(a=>a.id);function ph(a){return _h.includes(a)}const Uc="pomoflow-theme",oi="preset-bg-1";function Js(){return{theme:"default",background:{kind:"preset",id:oi}}}function gh(a){return a?a.kind==="preset"?`preset:${a.id}`:a.url:""}function mh(){if(typeof localStorage>"u")return Js();try{const a=localStorage.getItem(Uc);if(!a||!a.startsWith("{"))return Js();const t=JSON.parse(a),n=typeof t.theme=="string"&&ph(t.theme)?t.theme:"default",r=typeof t.background=="string"?t.background:"";if(r.startsWith("preset:")){const s=r.slice(7);if(fh(s))return{theme:n,background:{kind:"preset",id:s}}}return r.startsWith("url(")?{theme:n,background:{kind:"custom",url:r}}:{theme:n,background:{kind:"preset",id:oi}}}catch{return Js()}}function Hr(a){if(!(typeof localStorage>"u"))try{localStorage.setItem(Uc,JSON.stringify({theme:a.theme,background:gh(a.background)}))}catch{}}function bh(a){return a?a.kind==="preset"?hh(a.id):a.url:null}let Ka=z("default"),Va=z(null);function sr(){if(typeof document>"u")return;const a=document.documentElement;a.setAttribute("data-theme",e(Ka));const t=bh(e(Va));t?a.style.setProperty("--bg-page",t):a.style.removeProperty("--bg-page")}function yh(){const a=mh();v(Ka,a.theme,!0),v(Va,a.background,!0),sr()}function kh(){return e(Ka)}function wh(){return e(Va)}function xh(a){v(Ka,a,!0),Hr({theme:a,background:e(Va)}),sr()}function Sh(a){const t={kind:"preset",id:a};v(Va,t,!0),Hr({theme:e(Ka),background:t}),sr()}function Th(a){if(!a.startsWith("url("))return;const t={kind:"custom",url:a};v(Va,t,!0),Hr({theme:e(Ka),background:t}),sr()}function Qs(){v(Va,null),Hr({theme:e(Ka),background:null}),sr()}function Xs(){v(Ka,"default"),v(Va,{kind:"preset",id:oi},!0),Hr({theme:e(Ka),background:e(Va)}),sr()}function Dh(a){return new Promise(t=>{const n=new FileReader;n.onerror=()=>t(null),n.onload=()=>{const r=new Image;r.onerror=()=>t(null),r.onload=()=>{try{const c=Math.min(1,1920/Math.max(r.width,r.height)),l=Math.max(1,Math.round(r.width*c)),i=Math.max(1,Math.round(r.height*c)),u=document.createElement("canvas");u.width=l,u.height=i;const f=u.getContext("2d");if(!f)return t(null);f.drawImage(r,0,0,l,i),t(`url(${u.toDataURL("image/jpeg",.8)})`)}catch{t(null)}},r.src=String(n.result)},n.readAsDataURL(a)})}var Ph=Ja('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function Wc(a,t){let n=ma(t,"size",3,14),r=ma(t,"filled",3,!0);var s=Ph(),c=o(s);M(()=>{I(s,"width",n()),I(s,"height",n()),I(c,"fill",r()?"currentColor":"#e5e7eb")}),g(a,s)}const Mh=Ue({project:null,tag:null,priority:null,date:null});var jh=j('<textarea class="review-textarea svelte-1na66lg"></textarea>');function ps(a,t){ft(t,!0);const n=A(gt);let r=ma(t,"rows",3,2),s=z(Ue(Ut(()=>t.value??"")));Tt(()=>{const i=t.value??"";Ut(()=>{i!==e(s)&&v(s,i,!0)})});function c(){const i=e(s).trim();i===""?t.value&&t.onDelete&&t.onDelete():i!==(t.value??"")&&t.onSave(i)}var l=jh();M(()=>{I(l,"placeholder",t.placeholder??e(n).common.reviewPlaceholder),I(l,"aria-label",t.ariaLabel??t.placeholder??e(n).common.reviewPlaceholder),I(l,"rows",r())}),wt("blur",l,c),bt(l,()=>e(s),i=>v(s,i)),g(a,l),ht()}const Ki=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function Vi(){return Ki[Math.floor(Math.random()*Ki.length)]}const Yc=Ue({n:0});function Ji(){Yc.n+=1}var Eh=j('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985"><!></button></div></div>');function Ch(a,t){ft(t,!0);const n=A(gt);let r=z(Ue([])),s=z(Ue(new Set)),c=z(null);async function l(){try{v(r,await Ic(),!0)}catch{v(r,[],!0)}}Qa(()=>{l()}),Tt(()=>{Yc.n,l()}),Tt(()=>{var m;if(!e(c))if(e(r).length>0){const h=e(r)[0];v(c,{text:h.text,author:(m=h.author)!=null&&m.trim()?h.author:e(n).settings.motto.defaultAuthor},!0);const y=new Set(e(s));y.add(h.id),v(s,y,!0)}else v(c,Vi(),!0)});function i(){var m;if(e(r).length>0){let h=e(r).filter(S=>!e(s).has(S.id));h.length===0&&(v(s,new Set,!0),h=e(r));const y=h[0];v(c,{text:y.text,author:(m=y.author)!=null&&m.trim()?y.author:e(n).settings.motto.defaultAuthor},!0);const x=new Set(e(s));x.add(y.id),v(s,x,!0)}else v(c,Vi(),!0)}var u=qe(),f=Ee(u);{var p=m=>{var h=Eh(),y=o(h),x=o(y),S=o(x);gc(S,{size:20});var P=d(x,2),D=o(P),Y=o(D),F=d(D,2),C=o(F),k=d(P,2),T=o(k);Xo(T,{size:14}),M(()=>{_(Y,e(c).text),_(C,`—— ${e(c).author??""}`),I(k,"aria-label",e(n).timer.mottoRefresh),I(k,"title",e(n).timer.mottoRefresh)}),G("click",k,i),g(m,h)};le(f,m=>{e(c)&&m(p)})}g(a,u),ht()}kt(["click"]);var Nh=j('<div class="empty svelte-1qmsx7e"> </div>'),Fh=j('<button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-main svelte-1qmsx7e"><span class="item-title svelte-1qmsx7e"> </span> <span class="item-sub svelte-1qmsx7e"> </span></span> <span class="pri-dot svelte-1qmsx7e"></span></button>'),Ah=j('<button type="button" class="backdrop svelte-1qmsx7e" aria-hidden="true" tabindex="-1"></button> <div class="menu svelte-1qmsx7e" role="listbox"><button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-title svelte-1qmsx7e"> </span></button> <!> <!></div>',1),Ih=j('<div class="selector svelte-1qmsx7e"><button type="button" class="trigger svelte-1qmsx7e" aria-haspopup="listbox"><span class="trigger-label svelte-1qmsx7e"> </span> <!></button> <!></div>');function qh(a,t){ft(t,!0);const n=A(gt);let r=z(!1);const s={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};function c(y){t.onSelect(y),v(r,!1)}var l=Ih(),i=o(l),u=o(i),f=o(u),p=d(u,2);{let y=A(()=>"chev"+(e(r)?" open":""));Vn(p,{size:16,get class(){return e(y)}})}var m=d(i,2);{var h=y=>{var x=Ah(),S=Ee(x),P=d(S,2),D=o(P),Y=o(D),F=o(Y);{var C=oe=>{Ya(oe,{size:16})};le(F,oe=>{t.activeTask||oe(C)})}var k=d(Y,2),T=o(k),q=d(D,2);{var ie=oe=>{var re=Nh(),ue=o(re);M(()=>_(ue,e(n).timer.noTodoTask)),g(oe,re)};le(q,oe=>{t.tasks.length===0&&oe(ie)})}var ne=d(q,2);je(ne,17,()=>t.tasks,oe=>oe.id,(oe,re)=>{var ue=Fh(),W=o(ue),E=o(W);{var U=R=>{Ya(R,{size:16})};le(E,R=>{var $;(($=t.activeTask)==null?void 0:$.id)===e(re).id&&R(U)})}var Q=d(W,2),fe=o(Q),ye=o(fe),te=d(fe,2),de=o(te),ke=d(Q,2);M(()=>{var R;I(ue,"aria-selected",((R=t.activeTask)==null?void 0:R.id)===e(re).id),_(ye,e(re).title),_(de,`${e(re).completed_pomodoros??0??""}/${e(re).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`),At(ke,`background-color: ${s[e(re).priority??"none"]??s.none??""}`)}),G("click",ue,()=>c(e(re))),g(oe,ue)}),M(()=>{I(D,"aria-selected",t.activeTask===null),_(T,e(n).timer.noSpecificTask)}),G("click",S,()=>v(r,!1)),G("click",D,()=>c(null)),g(y,x)};le(m,y=>{e(r)&&y(h)})}M(()=>{I(i,"aria-expanded",e(r)),_(f,t.activeTask?t.activeTask.title:e(n).timer.selectTask)}),G("click",i,()=>v(r,!e(r))),g(a,l),ht()}kt(["click"]);//! 截止时间（due_date）相关工具。
//!
//! 后端 due_date 存为 UTC RFC3339（如 "2026-07-12T09:30:00Z"）。
//! 前端表单用本地 datetime-local（"YYYY-MM-DD" 或 "YYYY-MM-DDTHH:MM"）。
//!
//! `TaskForm` / `TaskDetailPanel` / `TasksPage` 共用本工具保证校验逻辑一致。
//!
//! 与 v1 完全对齐：
//! - `hasTimePart`：含 'T' 即视为用户选了时分
//! - `datePart`：取 YYYY-MM-DD 部分
//! - `todayStr`：今天 YYYY-MM-DD
//! - `fillCurrentTime`：补全时分（默认当前时刻），用于"设置了提醒但用户未选时间"的兜底
//! - `toLocal`：UTC RFC3339 → 本地 "YYYY-MM-DDTHH:MM"（datetime-local 展示）
//! - `toIsoUtc`：本地 "YYYY-MM-DD[THH:MM]" → UTC RFC3339（提交后端）
function gs(a){return!!a&&a.includes("T")}function Zt(a){return a?a.includes("T")?Co(a).slice(0,10):a.slice(0,10):""}function Ia(){const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Rh(){const a=new Date;return`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`}function Eo(a){return`${Zt(a)||Ia()}T${Rh()}`}function ns(){const a=new Date;return a.setDate(a.getDate()+1),`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Co(a){if(!a)return"";try{const t=new Date(a);if(isNaN(t.getTime()))return"";const n=t.getTimezoneOffset();return new Date(t.getTime()-n*6e4).toISOString().slice(0,16)}catch{return""}}function No(a){if(!a)return null;try{const t=new Date(a);return isNaN(t.getTime())?null:t.toISOString()}catch{return null}}var Qi=j("<option> </option>"),Xi=j('<button type="button"> </button>'),Lh=j('<button type="button" class="clear svelte-13vcwbh"> </button>'),Oh=j('<div class="empty svelte-13vcwbh"> </div>'),Bh=j('<button type="button" class="expander svelte-13vcwbh"><!></button>'),zh=j('<span class="expander-placeholder svelte-13vcwbh"></span>'),Zs=j('<span class="meta-item svelte-13vcwbh"> </span>'),Hh=j('<button type="button" class="start svelte-13vcwbh"><!></button>'),Uh=j('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),Wh=j('<div class="subs svelte-13vcwbh"></div>'),Yh=j('<div><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),$h=j('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh"> </h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh"> </span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh"> </h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project"> </label> <select id="timer-filter-project" class="svelte-13vcwbh"><option> </option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag"> </label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option> </option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function Gh(a,t){ft(t,!0);const n=A(gt),r={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let s=z(Ue(new Set));function c(H){const b=new Set(e(s));b.has(H)?b.delete(H):b.add(H),v(s,b,!0)}function l(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const i=A(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),u=["high","medium","low"],f=A(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low})),p=["today","tomorrow","this_week"],m=A(()=>({today:e(n).filter.today,tomorrow:e(n).filter.tomorrow,this_week:e(n).filter.thisWeek}));function h(H){var b;return H?((b=t.projects.find(w=>w.id===H))==null?void 0:b.name)??"":""}var y=$h(),x=o(y),S=o(x),P=o(S),D=o(P),Y=d(P,2),F=o(Y),C=o(F),k=d(F,2),T=o(k),q=d(S,2),ie=o(q),ne=o(ie),oe=d(ie,2),re=o(oe),ue=o(re),W=o(ue),E=d(ue,2),U=o(E),Q=o(U);U.value=U.__value="";var fe=d(U);je(fe,17,()=>t.projects,H=>H.id,(H,b)=>{var w=Qi(),Z=o(w),O={};M(()=>{_(Z,e(b).name),O!==(O=e(b).id)&&(w.value=(w.__value=e(b).id)??"")}),g(H,w)});var ye;Bt(E);var te=d(re,2),de=o(te),ke=o(de),R=d(de,2),$=o(R),B=o($);$.value=$.__value="";var X=d($);je(X,17,()=>t.tags,H=>H.id,(H,b)=>{var w=Qi(),Z=o(w),O={};M(()=>{_(Z,e(b).name),O!==(O=e(b).id)&&(w.value=(w.__value=e(b).id)??"")}),g(H,w)});var pe;Bt(R);var ge=d(oe,2),he=o(ge),_e=o(he),L=d(he,2);je(L,20,()=>u,H=>H,(H,b)=>{var w=Xi();let Z;var O=o(w);M(()=>{Z=at(w,1,"opt svelte-13vcwbh",null,Z,{active:t.filter.priority===b}),_(O,e(f)[b])}),G("click",w,()=>t.onFilterChange({priority:t.filter.priority===b?null:b})),g(H,w)});var se=d(L,2),ve=o(se),we=d(se,2);je(we,20,()=>p,H=>H,(H,b)=>{var w=Xi();let Z;var O=o(w);M(()=>{Z=at(w,1,"opt svelte-13vcwbh",null,Z,{active:t.filter.date===b}),_(O,e(m)[b])}),G("click",w,()=>t.onFilterChange({date:t.filter.date===b?null:b})),g(H,w)});var Me=d(ge,2);{var Fe=H=>{var b=Lh(),w=o(b);M(()=>_(w,e(n).timer.clearFilter)),G("click",b,l),g(H,b)};le(Me,H=>{e(i)&&H(Fe)})}var Oe=d(x,2),We=o(Oe);{var Be=H=>{var b=Oh(),w=o(b);M(()=>_(w,e(n).timer.noTask)),g(H,b)};le(We,H=>{t.tasks.length===0&&H(Be)})}var J=d(We,2);je(J,17,()=>t.tasks,H=>H.id,(H,b)=>{const w=A(()=>e(b).status==="completed"),Z=A(()=>{var Ye;return(((Ye=e(b).subtasks)==null?void 0:Ye.length)??0)>0}),O=A(()=>e(s).has(e(b).id)),V=A(()=>e(Z)?(e(b).subtasks??[]).filter(Ye=>Ye.is_completed).length:0),K=A(()=>h(e(b).project_id));var ee=Yh();let me;var be=o(ee),Ie=o(be);{var it=Ye=>{var Ae=Bh(),dt=o(Ae);{var ae=Le=>{Vn(Le,{size:14})},Te=Le=>{Jn(Le,{size:14})};le(dt,Le=>{e(O)?Le(ae):Le(Te,-1)})}M(()=>I(Ae,"aria-label",e(O)?e(n).timer.collapseSubtasks:e(n).timer.expandSubtasks)),G("click",Ae,()=>c(e(b).id)),g(Ye,Ae)},lt=Ye=>{var Ae=zh();g(Ye,Ae)};le(Ie,Ye=>{e(Z)?Ye(it):Ye(lt,-1)})}var _t=d(Ie,2),rt=d(_t,2),Ve=o(rt);let ze;var He=o(Ve),Ne=d(Ve,2),Se=o(Ne),nt=o(Se),ct=d(Se,2);{var Dt=Ye=>{var Ae=Zs(),dt=o(Ae);M(()=>{var ae;return _(dt,`· ${e(V)??""}/${((ae=e(b).subtasks)==null?void 0:ae.length)??0??""}`)}),g(Ye,Ae)};le(ct,Ye=>{e(Z)&&Ye(Dt)})}var zt=d(ct,2);{var Vt=Ye=>{var Ae=Zs(),dt=o(Ae);M(()=>_(dt,e(K))),g(Ye,Ae)};le(zt,Ye=>{e(K)&&Ye(Vt)})}var ua=d(zt,2);{var tt=Ye=>{var Ae=Zs(),dt=o(Ae);M(ae=>_(dt,ae),[()=>Zt(e(b).due_date)]),g(Ye,Ae)};le(ua,Ye=>{e(b).due_date&&Ye(tt)})}var mt=d(rt,2);{var pt=Ye=>{var Ae=Hh(),dt=o(Ae);vs(dt,{size:10,color:"#fff",fill:"#fff"}),M(()=>{I(Ae,"aria-label",e(n).timer.startTooltip),I(Ae,"title",e(n).timer.startTooltip)}),G("click",Ae,()=>t.onStartTask(e(b))),g(Ye,Ae)};le(mt,Ye=>{e(w)||Ye(pt)})}var Ct=d(be,2);{var Pt=Ye=>{var Ae=Wh();je(Ae,21,()=>e(b).subtasks??[],dt=>dt.id,(dt,ae)=>{var Te=Uh();let Le;var Je=o(Te),St=d(Je,2),xe=o(St);M(()=>{Le=at(Te,1,"sub-row svelte-13vcwbh",null,Le,{done:e(ae).is_completed}),Vo(Je,e(ae).is_completed),_(xe,e(ae).title)}),G("change",Je,st=>t.onToggleSubtask(e(ae).id,st.currentTarget.checked)),g(dt,Te)}),g(Ye,Ae)};le(Ct,Ye=>{e(Z)&&e(O)&&Ye(Pt)})}M(()=>{me=at(ee,1,"task-card svelte-13vcwbh",null,me,{active:e(b).id===t.activeTaskId}),At(_t,`background-color: ${r[e(b).priority||"none"]??r.none??""}`),ze=at(Ve,1,"title svelte-13vcwbh",null,ze,{done:e(w)}),_(He,e(b).title),_(nt,`${e(b).completed_pomodoros??0??""}/${e(b).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`)}),g(H,ee)}),M(()=>{_(D,e(n).timer.todayFocus),_(C,t.todayMinutes),_(T,e(n).timer.minute),_(ne,e(n).timer.taskList),_(W,e(n).filter.project),_(Q,e(n).filter.all),ye!==(ye=t.filter.project??"")&&(E.value=(E.__value=t.filter.project??"")??"",It(E,t.filter.project??"")),_(ke,e(n).filter.tag),_(B,e(n).filter.all),pe!==(pe=t.filter.tag??"")&&(R.value=(R.__value=t.filter.tag??"")??"",It(R,t.filter.tag??"")),_(_e,e(n).filter.priority),_(ve,e(n).filter.date)}),G("change",E,H=>t.onFilterChange({project:H.currentTarget.value||null})),G("change",R,H=>t.onFilterChange({tag:H.currentTarget.value||null})),g(a,y),ht()}kt(["change","click"]);var Kh=j('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt"> </h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button"> </button></div></div>');function Vh(a,t){ft(t,!0);const n=A(gt);function r(u){u.target===u.currentTarget&&t.onClose()}function s(u){u.key==="Escape"&&t.onClose()}var c=qe();wt("keydown",po,function(...u){var f;(f=t.open?s:void 0)==null||f.apply(this,u)});var l=Ee(c);{var i=u=>{var f=Kh(),p=o(f),m=d(o(p),2),h=o(m),y=d(m,2),x=o(y),S=d(y,2),P=o(S);M(()=>{_(h,e(n).timer.modalTitle),_(x,t.message),_(P,e(n).common.confirm)}),G("click",f,r),G("click",S,function(...D){var Y;(Y=t.onClose)==null||Y.apply(this,D)}),g(u,f)};le(l,u=>{t.open&&u(i)})}g(a,c),ht()}kt(["click"]);var Jh=j('<span class="pomo-count svelte-17qnxlg"> </span>'),Qh=j('<div class="error svelte-17qnxlg" role="alert"> </div>'),Xh=j('<button class="btn pause svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Zh=j('<button class="btn primary svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),e_=j('<button class="btn primary svelte-17qnxlg"><!> </button>'),t_=j('<div class="layout page-veil svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="halo svelte-17qnxlg" aria-hidden="true"></div> <div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist"><button role="tab"> </button> <button role="tab"> </button> <button role="tab"> </button></div> <!> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><defs class="svelte-17qnxlg"><linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%" class="svelte-17qnxlg"><stop offset="0%" stop-color="var(--color-accent-400, #e29676)" class="svelte-17qnxlg"></stop><stop offset="100%" stop-color="var(--color-accent-600, #c9552d)" class="svelte-17qnxlg"></stop></linearGradient></defs><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none" stroke-linecap="round" stroke="url(#ring-gradient)"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-row svelte-17qnxlg"><span class="mode-label svelte-17qnxlg"> </span> <!></div></div></div> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> <b class="svelte-17qnxlg"> </b> </div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg"> </div> <!></div> <!></div></div> <!> <!></div>');function Zi(a,t){ft(t,!0);let n=z(Ue([])),r=z(Ue([])),s=z(Ue([])),c=z(Ue([])),l=z(null),i=z(0),u=z(null),f=z(!1);const p=Mh,m=A(ri),h=A(gt),y=A(()=>{var Te;const ae=Xa();return e(m).mode==="focus"?(((Te=e(m).activeTask)==null?void 0:Te.pomodoro_duration)??ae.focusDuration)*60:e(m).mode==="short_break"?ae.shortBreakDuration*60:ae.longBreakDuration*60}),x=A(()=>e(y)>0?1-e(m).secondsLeft/e(y):0),S=A(()=>Math.floor(e(m).secondsLeft/60)),P=A(()=>e(m).secondsLeft%60),D=A(()=>`${String(e(S)).padStart(2,"0")}:${String(e(P)).padStart(2,"0")}`),Y=A(()=>e(m).activeTask),F=A(()=>!e(m).running&&e(m).sessionId===null&&!e(f)),C=A(()=>e(m).mode==="focus"),k=A(()=>e(m).mode==="focus"?e(h).mode.focusing:e(m).mode==="short_break"?e(h).mode.shortBreak:e(h).mode.longBreak);function T(){const ae=new Date,Te=new Date(ae.getFullYear(),ae.getMonth(),ae.getDate(),0,0,0,0),Le=new Date(ae.getFullYear(),ae.getMonth(),ae.getDate()+1,0,0,0,0);return{startMs:Te.getTime(),endMs:Le.getTime()}}function q(){const ae=new Date,Te=new Date(ae.getFullYear(),ae.getMonth(),1,0,0,0,0),Je=new Date(ae.getFullYear(),ae.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:Te.getTime(),monthEndMs:Je}}function ie(){const ae=new Date;return`${ae.getFullYear()}-${String(ae.getMonth()+1).padStart(2,"0")}-${String(ae.getDate()).padStart(2,"0")}`}Tt(()=>{e(m).todayCount,E(),re(),ue()}),Tt(()=>{e(m).activeTask&&e(m).activeTask.status==="completed"&&Ui(null)});async function ne(){try{v(n,await ti(),!0)}catch(ae){console.warn("refresh projects",ae)}}async function oe(){try{v(r,await ai(),!0)}catch(ae){console.warn("refresh tags",ae)}}async function re(){try{const ae=q(),Te=await jn({status:null,month_start_ms:ae.monthStartMs,month_end_ms:ae.monthEndMs,project_id:p.project,tag_id:p.tag,priority:p.priority,date:p.date,tz_offset_min:-new Date().getTimezoneOffset(),limit:null}),Le={high:0,medium:1,low:2,none:3};v(s,Te.sort((Je,St)=>{if(Je.status!==St.status)return Je.status==="active"?-1:1;const xe=Le[Je.priority??"none"]??3,st=Le[St.priority??"none"]??3;return xe!==st?xe-st:new Date(Je.created_at??0).getTime()-new Date(St.created_at??0).getTime()}),!0)}catch(ae){console.warn("refresh tasks",ae)}}async function ue(){try{const ae=await jn({status:"active",limit:null}),Te={high:0,medium:1,low:2,none:3};v(c,ae.sort((Le,Je)=>{const St=Te[Le.priority??"none"]??3,xe=Te[Je.priority??"none"]??3;return St!==xe?St-xe:new Date(Le.created_at??0).getTime()-new Date(Je.created_at??0).getTime()}),!0)}catch(ae){console.warn("refresh active tasks",ae)}}async function W(){try{const ae=await zi(ie());v(l,(ae==null?void 0:ae.content)||null,!0)}catch(ae){console.warn("refresh review",ae)}}async function E(){try{const ae=T();v(i,await ff(ae.startMs,ae.endMs),!0)}catch(ae){console.warn("refresh minutes",ae)}}Tt(()=>{p.project,p.tag,p.priority,p.date,re()}),Qa(async()=>{await Promise.all([ne(),oe(),re(),ue(),W(),E()])});async function U(){var ae,Te,Le;if(e(F)){v(f,!0),v(u,null);try{await Xn(((ae=e(Y))==null?void 0:ae.id)??null,((Te=e(Y))==null?void 0:Te.project_id)??null,((Le=e(Y))==null?void 0:Le.pomodoro_duration)??void 0)}catch(Je){v(u,String(Je),!0)}finally{v(f,!1)}}}async function Q(){try{await si(!1)}catch(ae){v(u,String(ae),!0)}}function fe(ae){hs(ae)}async function ye(ae){try{await Lf(ae)}catch(Te){v(u,String(Te),!0)}}function te(ae){Ui(ae)}async function de(ae,Te){try{const Le=await Promise.all(e(s).map(St=>Ac(St.id)));let Je=null;for(const St of Le){const xe=St.find(st=>st.id===ae);if(xe){Je=xe;break}}if(!Je)return;await To({...Je,is_completed:Te}),await re(),await E()}catch(Le){console.warn("toggle subtask",Le)}}async function ke(ae){try{const Te=ie(),Le=await zi(Te),Je=Le?{...Le,content:ae}:{id:crypto.randomUUID(),date:Te,content:ae,updated_at:new Date().toISOString()};await Cc(Je),v(l,ae,!0)}catch(Te){console.warn("save review",Te)}}async function R(){try{await Nc(ie()),v(l,null)}catch(ae){console.warn("delete review",ae)}}const $=262,B=8,X=($-B)/2,pe=2*Math.PI*X,ge=A(()=>pe*(1-e(x)));var he=t_();Or("17qnxlg",ae=>{qr(()=>{nr.title=e(h).page.timer??""})});var _e=o(he),L=d(o(_e),2),se=o(L),ve=o(se);let we;var Me=o(ve),Fe=d(ve,2);let Oe;var We=o(Fe),Be=d(Fe,2);let J;var H=o(Be),b=d(se,2);{var w=ae=>{qh(ae,{get tasks(){return e(c)},get activeTask(){return e(Y)},onSelect:te})};le(b,ae=>{e(C)&&ae(w)})}var Z=d(b,2),O=o(Z);I(O,"width",$),I(O,"height",$),I(O,"viewBox","0 0 262 262");var V=d(o(O));I(V,"cx",$/2),I(V,"cy",$/2),I(V,"r",X),I(V,"stroke-width",B);var K=d(V);I(K,"cx",$/2),I(K,"cy",$/2),I(K,"r",X),I(K,"stroke-width",B),I(K,"stroke-dasharray",pe),I(K,"transform","rotate(-90 131 131)");var ee=d(O,2),me=o(ee),be=o(me),Ie=d(me,2),it=o(Ie),lt=o(it),_t=d(it,2);{var rt=ae=>{var Te=Jh(),Le=o(Te);M(()=>{var Je,St;return _(Le,`${((Je=e(Y))==null?void 0:Je.completed_pomodoros)??0??""}/${((St=e(Y))==null?void 0:St.estimated_pomodoros)??0??""} ${e(h).timer.pomodoros??""}`)}),g(ae,Te)};le(_t,ae=>{e(C)&&ae(rt)})}var Ve=d(Z,2);{var ze=ae=>{var Te=Qh(),Le=o(Te);M(()=>_(Le,`⚠ ${e(u)??""}`)),g(ae,Te)};le(Ve,ae=>{e(u)&&ae(ze)})}var He=d(Ve,2),Ne=o(He);{var Se=ae=>{var Te=Xh(),Le=Ee(Te),Je=o(Le);kv(Je,{size:18,fill:"currentColor"});var St=d(Je),xe=d(Le,2),st=o(xe);Pv(st,{size:16});var yt=d(st);M(()=>{_(St,` ${e(h).timer.pause??""}`),_(yt,` ${e(h).timer.skip??""}`)}),G("click",Le,function(...Gt){$s==null||$s.apply(this,Gt)}),G("click",xe,Q),g(ae,Te)},nt=ae=>{var Te=Zh(),Le=Ee(Te),Je=o(Le);vs(Je,{size:18,fill:"currentColor"});var St=d(Je),xe=d(Le,2),st=o(xe);Mv(st,{size:16});var yt=d(st);M(()=>{_(St,` ${e(h).timer.resume??""}`),_(yt,` ${e(h).timer.abandon??""}`)}),G("click",Le,function(...Gt){Gs==null||Gs.apply(this,Gt)}),G("click",xe,Q),g(ae,Te)},ct=ae=>{var Te=e_(),Le=o(Te);vs(Le,{size:18,fill:"currentColor"});var Je=d(Le);M(()=>{Te.disabled=!e(F),_(Je,` ${(e(f)?e(h).timer.starting:e(C)?e(h).timer.start:e(h).timer.startBreak)??""}`)}),G("click",Te,U),g(ae,Te)};le(Ne,ae=>{e(m).running?ae(Se):e(m).sessionId?ae(nt,1):ae(ct,-1)})}var Dt=d(He,2),zt=d(o(Dt)),Vt=d(zt),ua=o(Vt),tt=d(Vt),mt=d(Dt,2),pt=o(mt),Ct=o(pt),Pt=d(pt,2);ps(Pt,{get value(){return e(l)},get placeholder(){return e(h).timer.reviewPlaceholder},rows:2,onSave:ke,onDelete:R});var Ye=d(mt,2);Ch(Ye,{});var Ae=d(_e,2);{let ae=A(()=>{var Te;return((Te=e(m).activeTask)==null?void 0:Te.id)??null});Gh(Ae,{get todayMinutes(){return e(i)},get projects(){return e(n)},get tags(){return e(r)},get tasks(){return e(s)},get activeTaskId(){return e(ae)},get filter(){return p},onFilterChange:Te=>Object.assign(p,Te),onStartTask:ye,onToggleSubtask:de})}var dt=d(Ae,2);{let ae=A(()=>e(m).pendingCompletionMessage!==null),Te=A(()=>e(m).pendingCompletionMessage??"");Vh(dt,{get open(){return e(ae)},get message(){return e(Te)},get onClose(){return Hf}})}M(()=>{I(se,"aria-label",e(h).timer.modeTabsAria),we=at(ve,1,"mode-tab svelte-17qnxlg",null,we,{active:e(m).mode==="focus"}),I(ve,"aria-selected",e(m).mode==="focus"),_(Me,e(h).mode.focus),Oe=at(Fe,1,"mode-tab svelte-17qnxlg",null,Oe,{active:e(m).mode==="short_break"}),I(Fe,"aria-selected",e(m).mode==="short_break"),_(We,e(h).mode.shortBreak),J=at(Be,1,"mode-tab svelte-17qnxlg",null,J,{active:e(m).mode==="long_break"}),I(Be,"aria-selected",e(m).mode==="long_break"),_(H,e(h).mode.longBreak),I(K,"stroke-dashoffset",e(ge)),_(be,e(D)),_(lt,e(k)),_(zt,` ${e(h).timer.todayDone??""} `),_(ua,e(m).todayCount),_(tt,` ${e(h).timer.pomodoroUnit??""}`),_(Ct,e(h).timer.reviewTitle)}),G("click",ve,()=>fe("focus")),G("click",Fe,()=>fe("short_break")),G("click",Be,()=>fe("long_break")),g(a,he),ht()}kt(["click"]);async function a_(a={}){return typeof a=="object"&&Object.freeze(a),await Ce("plugin:dialog|save",{options:a})}//! 月历工具:ISO 日期格式化 + 自然周(周一起点)计算。
//! 手账视图(JournalView)与月度复盘面板(MonthReviewPanel)共用。
//! (v1 frontend/src/utils/calendar.ts 对应物,v1 12bc45a 抽取)
function wr(a){return String(a).padStart(2,"0")}function Na(a){return`${a.getFullYear()}-${wr(a.getMonth()+1)}-${wr(a.getDate())}`}function $c(a,t){const n=[],r=new Date(a,t-1,1);for(;r.getDay()!==1;)r.setDate(r.getDate()+1);for(;r.getMonth()===t-1;)n.push(new Date(r)),r.setDate(r.getDate()+7);return n}var n_=j('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <span class="filter-stats svelte-qbpxhc"> </span></button>'),r_=j('<button type="button" class="add-root svelte-qbpxhc"><!></button>'),s_=j('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),o_=j('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),i_=j('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),l_=j('<span class="expand-spacer svelte-qbpxhc"></span>'),c_=j('<button type="button" class="more-btn svelte-qbpxhc"><!></button>'),d_=j('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),u_=j('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),el=j('<button type="button" class="ctx-item svelte-qbpxhc"><!> </button>'),v_=j('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> </button>'),f_=j('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),h_=j('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),__=j('<div class="empty-hint svelte-qbpxhc"> </div>'),p_=j('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),g_=j('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> </button> <!></div> <!></div></aside>');function m_(a,t){ft(t,!0);const n=A(gt);let r=ma(t,"search",3,""),s=z(!0),c=z(Ue(new Set)),l=z(null),i=z(null),u=z(""),f=z(null),p=z("");function m(R){const $=R.getDay(),B=$===0?-6:1-$,X=new Date(R);return X.setDate(X.getDate()+B),X.setHours(0,0,0,0),X}function h(R){const $=m(R),B=new Date($);return B.setDate(B.getDate()+6),B.setHours(23,59,59,999),B}function y(R,$){if($==="journal")return{timeStr:"",count:0};const B=Ia(),X=ns(),pe=m(new Date),ge=h(new Date);let he=R;$==="today"&&(he=R.filter(we=>Zt(we.due_date)===B)),$==="tomorrow"&&(he=R.filter(we=>Zt(we.due_date)===X)),$==="week"&&(he=R.filter(we=>{if(!we.due_date)return!1;const Me=new Date(we.due_date);return Me>=pe&&Me<=ge})),$==="planned"&&(he=R.filter(we=>we.due_date!==null&&we.due_date!==void 0)),$==="completed"&&(he=R.filter(we=>we.status==="completed"));const _e=he.reduce((we,Me)=>we+(Me.estimated_pomodoros||0)*(Me.pomodoro_duration||25),0),L=Math.floor(_e/60),se=_e%60;return{timeStr:L>0?`${L}h ${se}m`:`${se}m`,count:he.length}}function x(R){const $=new Map,B=[];for(const pe of R)$.set(pe.id,{...pe,children:[],depth:0});for(const pe of R){const ge=$.get(pe.id);ge&&(pe.parent_id&&$.has(pe.parent_id)?$.get(pe.parent_id).children.push(ge):B.push(ge))}const X=(pe,ge)=>{for(const he of pe)he.depth=ge,X(he.children,ge+1)};return X(B,0),B}function S(R,$){const B=[];for(const X of R)B.push(X),$.has(X.id)&&X.children.length>0&&B.push(...S(X.children,$));return B}const P=A(()=>x(t.projects)),D=A(()=>S(e(P),e(c))),Y=A(()=>[{key:"today",icon:jv,label:e(n).filter.today},{key:"tomorrow",icon:Ev,label:e(n).filter.tomorrow},{key:"week",icon:hc,label:e(n).filter.week},{key:"planned",icon:lv,label:e(n).sidebar.planned},{key:"completed",icon:wo,label:e(n).sidebar.completed},{key:"journal",icon:cv,label:e(n).sidebar.journal}]),F=A(()=>t.selectedProject===null?t.filter:"");function C(R){const $=new Set(e(c));$.has(R)?$.delete(R):$.add(R),v(c,$,!0)}function k(R){t.onSetFilter(R),t.onSelectProject(null)}var T=g_(),q=o(T),ie=o(q);Tv(ie,{size:14,class:"search-icon"});var ne=d(ie,2),oe=d(q,2);je(oe,21,()=>e(Y),R=>R.key,(R,$)=>{const B=A(()=>y(t.tasks,e($).key)),X=A(()=>e(F)===e($).key);var pe=n_();let ge;var he=o(pe),_e=o(he);Lr(_e,()=>e($).icon,(we,Me)=>{Me(we,{size:16})});var L=d(_e),se=d(he,2),ve=o(se);M(()=>{ge=at(pe,1,"filter-btn svelte-qbpxhc",null,ge,{active:e(X)}),_(L,` ${e($).label??""}`),_(ve,`${e(B).timeStr??""} ${e(B).count??""}`)}),G("click",pe,()=>k(e($).key)),g(R,pe)});var re=d(oe,2),ue=o(re),W=o(ue),E=o(W);{var U=R=>{Vn(R,{size:14})},Q=R=>{Jn(R,{size:14})};le(E,R=>{e(s)?R(U):R(Q,-1)})}var fe=d(E),ye=d(W,2);{var te=R=>{var $=r_(),B=o($);Mn(B,{size:14}),M(()=>{I($,"aria-label",e(n).sidebar.addRootAria),I($,"title",e(n).sidebar.addListTitle)}),G("click",$,()=>{v(f,"root"),v(p,"")}),g(R,$)};le(ye,R=>{t.onCreateProject&&R(te)})}var de=d(ue,2);{var ke=R=>{var $=p_(),B=o($);{var X=_e=>{var L=s_(),se=o(L);kn(se,!0),M(()=>I(se,"placeholder",e(n).sidebar.listNamePlaceholder)),G("keydown",se,ve=>{if(ve.key==="Enter"){const we=e(p).trim();we&&t.onCreateProject&&t.onCreateProject(we,null),v(f,null),v(p,"")}ve.key==="Escape"&&(v(f,null),v(p,""))}),wt("blur",se,()=>{const ve=e(p).trim();ve&&t.onCreateProject&&t.onCreateProject(ve,null),v(f,null),v(p,"")}),bt(se,()=>e(p),ve=>v(p,ve)),g(_e,L)};le(B,_e=>{e(f)==="root"&&t.onCreateProject&&_e(X)})}var pe=d(B,2);je(pe,17,()=>e(D),_e=>_e.id,(_e,L)=>{const se=A(()=>t.selectedProject===e(L).id),ve=A(()=>e(l)===e(L).id),we=A(()=>e(i)===e(L).id),Me=A(()=>e(L).children.length>0),Fe=A(()=>e(c).has(e(L).id));var Oe=h_(),We=o(Oe);{var Be=O=>{var V=o_(),K=o(V);kn(K,!0),G("keydown",K,ee=>{if(ee.key==="Enter"){const me=e(u).trim();me&&t.onUpdateProject&&t.onUpdateProject(e(L).id,me),v(i,null),v(u,"")}ee.key==="Escape"&&(v(i,null),v(u,""))}),wt("blur",K,()=>{const ee=e(u).trim();ee&&t.onUpdateProject&&t.onUpdateProject(e(L).id,ee),v(i,null),v(u,"")}),bt(K,()=>e(u),ee=>v(u,ee)),g(O,V)},J=O=>{var V=d_();let K;var ee=o(V),me=o(ee);{var be=ze=>{var He=i_(),Ne=o(He);{var Se=ct=>{Vn(ct,{size:12})},nt=ct=>{Jn(ct,{size:12})};le(Ne,ct=>{e(Fe)?ct(Se):ct(nt,-1)})}M(()=>I(He,"aria-label",e(Fe)?e(n).form.collapse:e(n).common.expand)),G("click",He,ct=>{ct.stopPropagation(),C(e(L).id)}),g(ze,He)},Ie=ze=>{var He=l_();g(ze,He)};le(me,ze=>{e(Me)?ze(be):ze(Ie,-1)})}var it=d(me,2);{let ze=A(()=>e(L).color||"var(--color-accent)");_v(it,{size:14,get color(){return e(ze)}})}var lt=d(it,2),_t=o(lt),rt=d(ee,2);{var Ve=ze=>{var He=c_(),Ne=o(He);fv(Ne,{size:14}),M(()=>I(He,"aria-label",e(n).sidebar.moreActions)),G("click",He,Se=>{Se.stopPropagation(),v(l,e(ve)?null:e(L).id,!0)}),g(ze,He)};le(rt,ze=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&e(L).depth<2)&&ze(Ve)})}M(()=>{K=at(V,1,"node-row svelte-qbpxhc",null,K,{active:e(se)}),_(_t,e(L).name)}),G("click",ee,()=>{t.onSelectProject(e(L).id),t.onSetFilter("")}),G("keydown",ee,ze=>{(ze.key==="Enter"||ze.key===" ")&&(ze.preventDefault(),t.onSelectProject(e(L).id),t.onSetFilter(""))}),g(O,V)};le(We,O=>{e(we)?O(Be):O(J,-1)})}var H=d(We,2);{var b=O=>{var V=u_(),K=o(V);kn(K,!0),M(()=>{At(V,`padding-left: ${(e(L).depth+1)*12+12}px;`),I(K,"placeholder",e(L).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)}),G("keydown",K,ee=>{if(ee.key==="Enter"){const me=e(p).trim();me&&t.onCreateProject&&t.onCreateProject(me,e(L).id),v(f,null),v(p,"");const be=new Set(e(c));be.add(e(L).id),v(c,be,!0)}ee.key==="Escape"&&(v(f,null),v(p,""))}),wt("blur",K,()=>{const ee=e(p).trim();ee&&t.onCreateProject&&t.onCreateProject(ee,e(L).id),v(f,null),v(p,"");const me=new Set(e(c));me.add(e(L).id),v(c,me,!0)}),bt(K,()=>e(p),ee=>v(p,ee)),g(O,V)};le(H,O=>{e(f)===e(L).id&&t.onCreateProject&&O(b)})}var w=d(H,2);{var Z=O=>{var V=f_(),K=o(V);{var ee=lt=>{var _t=el(),rt=o(_t);Mn(rt,{size:12});var Ve=d(rt);M(()=>_(Ve,` ${e(n).settings.list.addChild??""}`)),G("click",_t,()=>{v(f,e(L).id,!0),v(p,""),v(l,null)}),g(lt,_t)};le(K,lt=>{t.onCreateProject&&e(L).depth<2&&lt(ee)})}var me=d(K,2);{var be=lt=>{var _t=el(),rt=o(_t);Qo(rt,{size:12});var Ve=d(rt);M(()=>_(Ve,` ${e(n).settings.list.edit??""}`)),G("click",_t,()=>{v(u,e(L).name,!0),v(i,e(L).id,!0),v(l,null)}),g(lt,_t)};le(me,lt=>{t.onUpdateProject&&lt(be)})}var Ie=d(me,2);{var it=lt=>{var _t=v_(),rt=o(_t);Br(rt,{size:12});var Ve=d(rt);M(()=>_(Ve,` ${e(n).settings.list.del??""}`)),G("click",_t,()=>{t.onDeleteProject(e(L).id),v(l,null)}),g(lt,_t)};le(Ie,lt=>{t.onDeleteProject&&lt(it)})}g(O,V)};le(w,O=>{e(ve)&&!e(we)&&O(Z)})}M(()=>At(Oe,`padding-left: ${e(L).depth*12}px;`)),g(_e,Oe)});var ge=d(pe,2);{var he=_e=>{var L=__(),se=o(L);M(()=>_(se,e(n).sidebar.emptyHint)),g(_e,L)};le(ge,_e=>{t.projects.length===0&&e(f)!=="root"&&_e(he)})}g(R,$)};le(de,R=>{e(s)&&R(ke)})}M(()=>{us(ne,r()),I(ne,"placeholder",e(n).sidebar.searchTasksPlaceholder),_(fe,` ${e(n).task.list??""}`)}),G("input",ne,R=>{var $;return($=t.onSearchChange)==null?void 0:$.call(t,R.currentTarget.value)}),G("click",W,()=>v(s,!e(s))),g(a,T),ht()}kt(["input","click","keydown"]);var b_=j('<span class="pri-badge svelte-3041n"> </span>'),y_=j('<span class="tag svelte-3041n"> </span>'),k_=j('<div class="row-2 svelte-3041n"></div>'),w_=j("<span></span>"),x_=j('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),S_=j('<span class="due svelte-3041n"> </span>'),T_=j('<button type="button" class="start svelte-3041n"><!></button>'),D_=j('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function Gc(a,t){ft(t,!0);const n=A(gt),r=A(()=>t.task.status==="completed"),s=A(()=>t.task.estimated_pomodoros||0),c=A(()=>t.task.completed_pomodoros||0),l=A(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),i=A(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""})[t.task.priority||"none"]),u=A(()=>t.task.due_date?Zt(t.task.due_date):"");var f=D_();let p;var m=o(f);let h;var y=o(m);{var x=E=>{Ya(E,{size:12,strokeWidth:3,color:"#fff"})};le(y,E=>{e(r)&&E(x)})}var S=d(m,2),P=o(S),D=o(P);{var Y=E=>{var U=b_(),Q=o(U);M(()=>{At(U,`--pri-color: ${e(l)??""}`),_(Q,e(i))}),g(E,U)};le(D,E=>{t.task.priority&&t.task.priority!=="none"&&E(Y)})}var F=d(D,2),C=o(F),k=d(P,2);{var T=E=>{var U=k_();je(U,21,()=>t.task.tags.slice(0,3),Q=>Q.id,(Q,fe)=>{var ye=y_(),te=o(ye);M(()=>_(te,`#${e(fe).name??""}`)),g(Q,ye)}),g(E,U)};le(k,E=>{t.task.tags&&t.task.tags.length>0&&E(T)})}var q=d(k,2),ie=o(q);{var ne=E=>{var U=x_(),Q=o(U);je(Q,21,()=>Array.from({length:Math.min(e(s),8)}),Oa,(te,de,ke)=>{var R=w_();let $;M(()=>$=at(R,1,"dot svelte-3041n",null,$,{filled:ke<e(c)})),g(te,R)});var fe=d(Q,2),ye=o(fe);M(()=>_(ye,`${e(c)??""}/${e(s)??""} ${e(n).timer.pomodoros??""}`)),g(E,U)};le(ie,E=>{e(s)>0&&E(ne)})}var oe=d(ie,2);{var re=E=>{var U=S_(),Q=o(U);M(()=>_(Q,e(u))),g(E,U)};le(oe,E=>{e(u)&&E(re)})}var ue=d(S,2);{var W=E=>{var U=T_(),Q=o(U);vs(Q,{size:13,color:"#fff",fill:"#fff"}),M(()=>{I(U,"aria-label",e(n).task.startTooltip),I(U,"title",e(n).task.startTooltip)}),G("click",U,fe=>{var ye;fe.stopPropagation(),(ye=t.onStart)==null||ye.call(t,t.task)}),g(E,U)};le(ue,E=>{!e(r)&&t.onStart&&E(W)})}M(()=>{p=at(f,1,"task-card svelte-3041n",null,p,{selected:t.selected,done:e(r)}),I(f,"aria-label",t.task.title),h=at(m,1,"check svelte-3041n",null,h,{checked:e(r)}),I(m,"aria-label",e(r)?e(n).common.ariaMarkUndone:e(n).common.ariaMarkDone),_(C,t.task.title)}),G("click",f,()=>t.onSelect(t.task)),G("keydown",f,E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),t.onSelect(t.task))}),G("click",m,E=>{E.stopPropagation(),t.onToggle(t.task.id)}),g(a,f),ht()}kt(["click","keydown"]);//! 清单(项目)树 → 下拉选项平铺 —— v1 TaskForm/TaskDetailPanel 共用逻辑。
//!
//! 规则(v1 getProjectTreeOptions):
//!   - 深度优先遍历,子清单缩进一级(depth 供前端渲染 `'　'.repeat(depth)`)
//!   - 有子清单的父节点 `disabled: true`(任务只能挂到叶子清单)
function Kc(a){const t=new Map;for(const c of a)t.set(c.id,{...c,children:[]});const n=[];for(const c of a)c.parent_id&&t.has(c.parent_id)?t.get(c.parent_id).children.push(c.id):n.push(c.id);const r=[],s=(c,l)=>{const i=t.get(c),u=i.children.length>0;r.push({id:i.id,name:i.name,depth:l,disabled:u});for(const f of i.children)s(f,l+1)};for(const c of n)s(c,0);return r}var P_=j('<input type="text" class="title-input svelte-1t5orp1"/>'),M_=j('<button type="button" class="title-btn svelte-1t5orp1"> </button>'),j_=j('<button type="button" class="icon-btn svelte-1t5orp1"><!></button>'),E_=j('<li><input type="checkbox" class="svelte-1t5orp1"/> <!> <!> <button type="button" class="icon-btn danger svelte-1t5orp1"><!></button></li>');function C_(a,t){ft(t,!0);const n=A(gt);let r=z(!1),s=z(Ue(Ut(()=>t.subtask.title))),c=z(null);Tt(()=>{e(r)||v(s,t.subtask.title,!0)});function l(){v(s,t.subtask.title,!0),v(r,!0),queueMicrotask(()=>{var k;return(k=e(c))==null?void 0:k.focus()})}function i(){const k=e(s).trim();e(r)&&(v(r,!1),k&&k!==t.subtask.title?t.onChange({...t.subtask,title:k}):k||v(s,t.subtask.title,!0))}function u(){v(s,t.subtask.title,!0),v(r,!1)}function f(k){k.key==="Enter"?(k.preventDefault(),i()):k.key==="Escape"&&(k.preventDefault(),u())}function p(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var m=E_();let h;var y=o(m),x=d(y,2);{var S=k=>{var T=P_();Vu(T,q=>v(c,q),()=>e(c)),M(()=>I(T,"aria-label",e(n).task.editSubtask)),wt("blur",T,i),G("keydown",T,f),bt(T,()=>e(s),q=>v(s,q)),g(k,T)},P=k=>{var T=M_(),q=o(T);M(()=>{I(T,"title",e(n).task.dblclickToEdit),_(q,t.subtask.title)}),G("dblclick",T,l),g(k,T)};le(x,k=>{e(r)?k(S):k(P,-1)})}var D=d(x,2);{var Y=k=>{var T=j_(),q=o(T);Qo(q,{size:14}),M(()=>{I(T,"aria-label",e(n).task.editSubtask),I(T,"title",e(n).task.editSubtask)}),G("click",T,l),g(k,T)};le(D,k=>{e(r)||k(Y)})}var F=d(D,2),C=o(F);Br(C,{size:14}),M(()=>{h=at(m,1,"row svelte-1t5orp1",null,h,{done:t.subtask.is_completed}),Vo(y,t.subtask.is_completed),I(y,"aria-label",e(n).task.toggleSubtaskAria),I(F,"aria-label",e(n).task.deleteSubtask),I(F,"title",e(n).task.deleteSubtask)}),G("change",y,p),G("click",F,()=>t.onDelete(t.subtask.id)),g(a,m),ht()}kt(["change","keydown","dblclick","click"]);var tl=j('<button type="button"> </button>'),N_=j('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="weekdays svelte-1h3pyjl"></div></div>'),F_=j('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="month-grid svelte-1h3pyjl"></div></div>'),A_=j('<div class="warn svelte-1h3pyjl"> </div>'),I_=j('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl"> </h3> <button type="button" class="close-btn svelte-1h3pyjl"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl"> </label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl"> </label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl"> </label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl"> </label> <select id="rc-type" class="input svelte-1h3pyjl"><option> </option><option> </option><option> </option><option> </option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl"> </button> <button type="button" class="btn-confirm svelte-1h3pyjl"> </button></div></div></div>');function Vc(a,t){ft(t,!0);const n=A(gt);function r(){const F=new Date,C=k=>String(k).padStart(2,"0");return`${F.getFullYear()}-${C(F.getMonth()+1)}-${C(F.getDate())}T${C(F.getHours())}:${C(F.getMinutes())}`}function s(){return`${new Date().getFullYear()}-12-31T23:59`}let c=z(Ue(r())),l=z(Ue(s())),i=z(1),u=z("week"),f=z(Ue([])),p=z(Ue([]));Tt(()=>{if(t.open&&t.initialConfig)try{const F=JSON.parse(t.initialConfig);v(c,F.startDate||r(),!0),v(l,F.endDate||s(),!0),v(i,F.interval||1,!0),v(u,F.type||"week",!0),v(f,F.weekdays||[],!0),v(p,F.monthDays||[],!0)}catch{}});function m(F,C,k){k(F.includes(C)?F.filter(T=>T!==C):[...F,C].sort((T,q)=>T-q))}function h(){const F={interval:e(i),type:e(u),startDate:e(c),endDate:e(l)};e(u)==="week"&&(F.weekdays=e(f)),e(u)==="month"&&(F.monthDays=e(p)),t.onConfirm(JSON.stringify(F))}let y=A(()=>e(u)==="week"&&e(f).length===0||e(u)==="month"&&e(p).length===0);function x(F){F.target===F.currentTarget&&t.onClose()}function S(F){F.key==="Escape"&&t.onClose()}var P=qe(),D=Ee(P);{var Y=F=>{var C=I_(),k=o(C),T=o(k),q=o(T),ie=o(q),ne=d(q,2),oe=o(ne);Zo(oe,{size:18});var re=d(T,2),ue=o(re),W=o(ue),E=o(W),U=o(E),Q=d(E,2),fe=d(W,2),ye=o(fe),te=o(ye),de=d(ye,2),ke=d(ue,2),R=o(ke),$=o(R),B=o($),X=d($,2),pe=d(R,2),ge=o(pe),he=o(ge),_e=d(ge,2),L=o(_e),se=o(L);L.value=L.__value="day";var ve=d(L),we=o(ve);ve.value=ve.__value="week";var Me=d(ve),Fe=o(Me);Me.value=Me.__value="month";var Oe=d(Me),We=o(Oe);Oe.value=Oe.__value="year";var Be=d(ke,2);{var J=be=>{var Ie=N_(),it=o(Ie),lt=o(it),_t=d(it,2);je(_t,21,()=>e(n).settings.repeatCustom.weekShort,Oa,(rt,Ve,ze)=>{const He=A(()=>ze+1),Ne=A(()=>e(f).includes(e(He)));var Se=tl();let nt;var ct=o(Se);M(()=>{nt=at(Se,1,"weekday-btn svelte-1h3pyjl",null,nt,{active:e(Ne)}),_(ct,e(Ve))}),G("click",Se,()=>m(e(f),e(He),Dt=>v(f,Dt,!0))),g(rt,Se)}),M(()=>_(lt,e(n).settings.repeatCustom.weekdays)),g(be,Ie)};le(Be,be=>{e(u)==="week"&&be(J)})}var H=d(Be,2);{var b=be=>{var Ie=F_(),it=o(Ie),lt=o(it),_t=d(it,2);je(_t,20,()=>Array.from({length:31},(rt,Ve)=>Ve+1),Oa,(rt,Ve)=>{const ze=A(()=>e(p).includes(Ve));var He=tl();let Ne;var Se=o(He);M(()=>{Ne=at(He,1,"month-btn svelte-1h3pyjl",null,Ne,{active:e(ze)}),_(Se,Ve)}),G("click",He,()=>m(e(p),Ve,nt=>v(p,nt,!0))),g(rt,He)}),M(()=>_(lt,e(n).settings.repeatCustom.monthDays)),g(be,Ie)};le(H,be=>{e(u)==="month"&&be(b)})}var w=d(H,2);{var Z=be=>{var Ie=A_(),it=o(Ie);M(()=>_(it,e(u)==="week"?e(n).settings.repeatCustom.needPickWeek:e(n).settings.repeatCustom.needPickDay)),g(be,Ie)};le(w,be=>{e(y)&&be(Z)})}var O=d(re,2),V=o(O),K=o(V),ee=d(V,2),me=o(ee);M(()=>{_(ie,e(n).settings.repeatCustom.title),I(ne,"aria-label",e(n).common.close),_(U,e(n).settings.repeatCustom.startDate),_(te,e(n).settings.repeatCustom.endDate),_(B,e(n).settings.repeatCustom.interval),_(he,e(n).settings.repeatCustom.type),_(se,e(n).settings.repeatCustom.typeDay),_(we,e(n).settings.repeatCustom.typeWeek),_(Fe,e(n).settings.repeatCustom.typeMonth),_(We,e(n).settings.repeatCustom.typeYear),_(K,e(n).settings.repeatCustom.cancel),ee.disabled=e(y),_(me,e(n).settings.repeatCustom.confirm)}),G("click",C,x),G("keydown",C,S),G("click",ne,function(...be){var Ie;(Ie=t.onClose)==null||Ie.apply(this,be)}),bt(Q,()=>e(c),be=>v(c,be)),bt(de,()=>e(l),be=>v(l,be)),bt(X,()=>e(i),be=>v(i,be)),ds(_e,()=>e(u),be=>v(u,be)),G("click",V,function(...be){var Ie;(Ie=t.onClose)==null||Ie.apply(this,be)}),G("click",ee,h),g(F,C)};le(D,F=>{t.open&&F(Y)})}g(a,P),ht()}kt(["click","keydown"]);var q_=j('<span class="tag-chip svelte-1qppxcb"> </span>'),R_=j('<div class="tag-chips svelte-1qppxcb"></div>'),L_=j('<span class="no-tags svelte-1qppxcb"> </span>'),O_=j('<label class="tags-editor-row svelte-1qppxcb"><input type="checkbox" class="svelte-1qppxcb"/> <span class="tag-dot svelte-1qppxcb"></span> <span> </span></label>'),B_=j('<div class="no-tags svelte-1qppxcb"> </div>'),z_=j('<div class="tags-editor svelte-1qppxcb"><!> <!></div>'),eo=j("<option> </option>"),H_=j('<aside class="panel svelte-1qppxcb"><div class="head svelte-1qppxcb"><div class="head-left svelte-1qppxcb"><span class="pri-dot svelte-1qppxcb"></span> <input class="title-input svelte-1qppxcb"/></div> <button class="close svelte-1qppxcb"><!></button></div> <div class="tags svelte-1qppxcb"><!> <button type="button" class="tags-toggle svelte-1qppxcb"> </button> <!></div> <div class="rows svelte-1qppxcb"><div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><span class="pri-swatch svelte-1qppxcb"></span> </span> <select class="ctrl svelte-1qppxcb"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <span class="ctrl-group svelte-1qppxcb"><span class="pomo-done svelte-1qppxcb"> </span> <input class="pomo-input svelte-1qppxcb" type="number" min="1" max="99"/> <span class="pomo-minutes svelte-1qppxcb"> </span></span></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <input class="ctrl ctrl-bare svelte-1qppxcb" type="datetime-local"/></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"><option> </option><!></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"></select></div></div> <div class="subtasks svelte-1qppxcb"><!> <div class="sub-add svelte-1qppxcb"><!> <input type="text" class="svelte-1qppxcb"/></div></div> <div class="notes svelte-1qppxcb"><textarea rows="3" class="svelte-1qppxcb"></textarea></div> <div class="del-wrap svelte-1qppxcb"><button type="button" class="del-btn svelte-1qppxcb"><!> </button></div> <!></aside>');function U_(a,t){ft(t,!0);const n=A(gt);let r=z(Ue(Ut(()=>t.task.title))),s=z(Ue(Ut(()=>t.task.description??""))),c=z(Ue(Ut(()=>Co(t.task.due_date))));Tt(()=>{v(r,t.task.title,!0),v(s,t.task.description??"",!0),v(c,Co(t.task.due_date),!0)});function l(){return new Date().toISOString()}async function i(ce){try{await So({...t.task,...ce,updated_at:l()}),t.onChanged()}catch(De){console.error("patch task failed",De),alert(Nt(e(n).task.saveFailed,{err:String(De)}))}}async function u(ce,De){try{await So({...t.task,repeat:ce,updated_at:l(),...ce==="custom"&&De!==void 0?{repeat_config:De}:{}},e(h)),t.onChanged()}catch(Ge){console.error("patch repeat failed",Ge),alert(Nt(e(n).task.saveFailed,{err:String(Ge)}))}}async function f(){const ce=e(r).trim();!ce||ce===t.task.title||await i({title:ce})}async function p(){e(s)!==(t.task.description??"")&&await i({description:e(s)})}async function m(){const ce=No(e(c));ce!==t.task.due_date&&await i({due_date:ce})}let h=z(Ue([])),y=z(!1);Tt(()=>{x()});async function x(){try{const ce=await Zv(t.task.id);v(h,ce.map(De=>De.id),!0)}catch(ce){console.error("load tags failed",ce)}}async function S(ce){const De=e(h),Ge=De.includes(ce)?De.filter(qt=>qt!==ce):[...De,ce];v(h,Ge,!0);try{await ef(t.task.id,Ge),t.onChanged()}catch(qt){v(h,De,!0),alert(Nt(e(n).task.setTagsFailed,{err:String(qt)}))}}const P=A(()=>e(h).map(ce=>t.allTags.find(De=>De.id===ce)).filter(ce=>!!ce));let D=z(Ue([])),Y=z("");Tt(()=>{F()});async function F(){try{v(D,await Ac(t.task.id),!0)}catch(ce){console.error("load subtasks failed",ce)}}async function C(){const ce=e(Y).trim();if(!ce)return;v(Y,"");const De={id:crypto.randomUUID(),task_id:t.task.id,title:ce,is_completed:!1,position:e(D).length,created_at:l(),updated_at:l()};try{const Ge=await To(De);v(D,[...e(D),Ge],!0),t.onChanged()}catch(Ge){alert(Nt(e(n).task.addSubtaskFailed,{err:String(Ge)}))}}async function k(ce){const De=e(D).find(Ge=>Ge.id===ce.id);v(D,e(D).map(Ge=>Ge.id===ce.id?ce:Ge),!0);try{await To(ce),t.onChanged()}catch(Ge){De&&v(D,e(D).map(qt=>qt.id===De.id?De:qt),!0),alert(Nt(e(n).task.updateSubtaskFailed,{err:String(Ge)}))}}async function T(ce){const De=e(D);v(D,e(D).filter(Ge=>Ge.id!==ce),!0);try{await cf(ce),t.onChanged()}catch(Ge){v(D,De,!0),alert(Nt(e(n).task.deleteSubtaskFailed,{err:String(Ge)}))}}async function q(){try{await Vv(t.task.id),t.onClose(),t.onChanged()}catch(ce){alert(Nt(e(n).task.saveFailed,{err:String(ce)}))}}const ie=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],ne=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],oe={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},re={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function ue(ce){return e(n).enum.reminder[oe[ce]]}function W(ce){return e(n).enum.repeat[re[ce]]}let E=z(!1);const U=A(Xa),Q=A(()=>t.task.estimated_pomodoros*(t.task.pomodoro_duration??e(U).focusDuration));function fe(ce){const De=ce.currentTarget,Ge=Math.round(Number(De.value)),qt=Math.min(99,Math.max(1,Number.isFinite(Ge)?Ge:1));qt!==t.task.estimated_pomodoros&&i({estimated_pomodoros:qt})}function ye(ce){if(ce==="none"){i({reminder:ce});return}if(gs(e(c)))i({reminder:ce});else{const De=Eo(e(c));alert(e(n).task.detailTimeFilled),v(c,De,!0),i({reminder:ce,due_date:No(De)})}}const te={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #a8a298)",none:"var(--color-neutral-400, #a8a298)"};var de=H_(),ke=o(de),R=o(ke),$=o(R),B=d($,2),X=d(R,2),pe=o(X);Zo(pe,{size:18});var ge=d(ke,2),he=o(ge);{var _e=ce=>{var De=R_();je(De,21,()=>e(P),Ge=>Ge.id,(Ge,qt)=>{var ta=q_(),Jt=o(ta);M(()=>{At(ta,`background-color: ${e(qt).color??""}`),_(Jt,e(qt).name)}),g(Ge,ta)}),g(ce,De)},L=ce=>{var De=L_(),Ge=o(De);M(()=>_(Ge,e(n).task.detailNoTags)),g(ce,De)};le(he,ce=>{e(P).length>0?ce(_e):ce(L,-1)})}var se=d(he,2),ve=o(se),we=d(se,2);{var Me=ce=>{var De=z_(),Ge=o(De);je(Ge,17,()=>t.allTags,Jt=>Jt.id,(Jt,dn)=>{var Wr=O_(),Is=o(Wr),_i=d(Is,2),ed=d(_i,2),td=o(ed);M(ad=>{Vo(Is,ad),At(_i,`background-color: ${e(dn).color??""}`),_(td,e(dn).name)},[()=>e(h).includes(e(dn).id)]),G("change",Is,()=>void S(e(dn).id)),g(Jt,Wr)});var qt=d(Ge,2);{var ta=Jt=>{var dn=B_(),Wr=o(dn);M(()=>_(Wr,e(n).task.detailNoTagsAvailable)),g(Jt,dn)};le(qt,Jt=>{t.allTags.length===0&&Jt(ta)})}g(ce,De)};le(we,ce=>{e(y)&&ce(Me)})}var Fe=d(ge,2),Oe=o(Fe),We=o(Oe),Be=o(We),J=d(Be),H=d(We,2),b=o(H),w=o(b);b.value=b.__value="high";var Z=d(b),O=o(Z);Z.value=Z.__value="medium";var V=d(Z),K=o(V);V.value=V.__value="low";var ee=d(V),me=o(ee);ee.value=ee.__value="none";var be;Bt(H);var Ie=d(Oe,2),it=o(Ie),lt=o(it);Qn(lt,{size:16});var _t=d(lt),rt=d(it,2),Ve=o(rt),ze=o(Ve),He=d(Ve,2),Ne=d(He,2),Se=o(Ne),nt=d(Ie,2),ct=o(nt),Dt=o(ct);dv(Dt,{size:16});var zt=d(Dt),Vt=d(ct,2),ua=d(nt,2),tt=o(ua),mt=o(tt);mv(mt,{size:16});var pt=d(mt),Ct=d(tt,2),Pt=o(Ct),Ye=o(Pt);Pt.value=Pt.__value="";var Ae=d(Pt);je(Ae,17,()=>Kc(t.projects),ce=>ce.id,(ce,De)=>{var Ge=eo(),qt=o(Ge),ta={};M(Jt=>{Ge.disabled=e(De).disabled,_(qt,`${Jt??""}${e(De).name??""}`),ta!==(ta=e(De).id)&&(Ge.value=(Ge.__value=e(De).id)??"")},[()=>"　".repeat(e(De).depth)]),g(ce,Ge)});var dt;Bt(Ct);var ae=d(ua,2),Te=o(ae),Le=o(Te);fc(Le,{size:16});var Je=d(Le),St=d(Te,2);je(St,21,()=>ie,ce=>ce.value,(ce,De)=>{var Ge=eo(),qt=o(Ge),ta={};M(Jt=>{_(qt,Jt),ta!==(ta=e(De).value)&&(Ge.value=(Ge.__value=e(De).value)??"")},[()=>ue(e(De).value)]),g(ce,Ge)});var xe;Bt(St);var st=d(ae,2),yt=o(st),Gt=o(yt);wv(Gt,{size:16});var oa=d(Gt),En=d(yt,2);je(En,21,()=>ne,ce=>ce.value,(ce,De)=>{var Ge=eo(),qt=o(Ge),ta={};M(Jt=>{_(qt,Jt),ta!==(ta=e(De).value)&&(Ge.value=(Ge.__value=e(De).value)??"")},[()=>W(e(De).value)]),g(ce,Ge)});var ii;Bt(En);var li=d(Fe,2),ci=o(li);je(ci,17,()=>e(D),ce=>ce.id,(ce,De)=>{C_(ce,{get subtask(){return e(De)},onChange:k,onDelete:T})});var Qc=d(ci,2),di=o(Qc);Mn(di,{size:14,class:"sub-add-icon"});var Ur=d(di,2),ui=d(li,2),As=o(ui),vi=d(ui,2),fi=o(vi),hi=o(fi);Br(hi,{size:14});var Xc=d(hi),Zc=d(vi,2);Vc(Zc,{get open(){return e(E)},get initialConfig(){return t.task.repeat_config},onConfirm:ce=>{v(E,!1),u("custom",ce)},onClose:()=>v(E,!1)}),M(()=>{I(de,"aria-label",e(n).task.detailPanelAria),At($,`background-color: ${te[t.task.priority]??te.none??""}`),I(B,"aria-label",e(n).task.titleAria),I(X,"aria-label",e(n).common.close),_(ve,e(y)?e(n).task.detailCollapse:e(n).task.detailEditTags),At(Be,`background-color: ${te[t.task.priority]??te.none??""}`),_(J,` ${e(n).task.detailPriority??""}`),_(w,e(n).priority.high),_(O,e(n).priority.medium),_(K,e(n).priority.low),_(me,e(n).priority.none),be!==(be=t.task.priority)&&(H.value=(H.__value=t.task.priority)??"",It(H,t.task.priority)),_(_t,` ${e(n).task.detailPomodoro??""}`),_(ze,`${t.task.completed_pomodoros??""}/`),us(He,t.task.estimated_pomodoros),_(Se,`= ${e(Q)??""}${e(n).task.minute??""}`),_(zt,` ${e(n).task.detailDueDate??""}`),_(pt,` ${e(n).task.detailProject??""}`),_(Ye,e(n).task.detailNoProject),dt!==(dt=t.task.project_id??"")&&(Ct.value=(Ct.__value=t.task.project_id??"")??"",It(Ct,t.task.project_id??"")),_(Je,` ${e(n).task.detailReminder??""}`),xe!==(xe=t.task.reminder??"none")&&(St.value=(St.__value=t.task.reminder??"none")??"",It(St,t.task.reminder??"none")),_(oa,` ${e(n).task.detailRepeat??""}`),ii!==(ii=t.task.repeat??"none")&&(En.value=(En.__value=t.task.repeat??"none")??"",It(En,t.task.repeat??"none")),I(Ur,"placeholder",e(n).task.detailAddSubtask),I(Ur,"aria-label",e(n).task.newSubtaskAria),I(As,"placeholder",e(n).task.detailAddNote),_(Xc,` ${e(n).task.detailDelete??""}`)}),wt("blur",B,f),G("keydown",B,ce=>{ce.key==="Enter"&&(ce.preventDefault(),ce.currentTarget.blur())}),bt(B,()=>e(r),ce=>v(r,ce)),G("click",X,function(...ce){var De;(De=t.onClose)==null||De.apply(this,ce)}),G("click",se,()=>v(y,!e(y))),G("change",H,ce=>{const De=ce.currentTarget.value;i({priority:De})}),G("change",He,fe),G("input",Vt,ce=>{ce.currentTarget.value.length===16&&ce.currentTarget.blur()}),wt("blur",Vt,m),bt(Vt,()=>e(c),ce=>v(c,ce)),G("change",Ct,ce=>{const De=ce.currentTarget.value;i({project_id:De||null})}),G("change",St,ce=>{const De=ce.currentTarget.value;ye(De)}),G("change",En,ce=>{const De=ce.currentTarget.value;De==="custom"?v(E,!0):u(De)}),G("keydown",Ur,ce=>{ce.key==="Enter"&&e(Y).trim()&&(ce.preventDefault(),C())}),bt(Ur,()=>e(Y),ce=>v(Y,ce)),wt("blur",As,p),bt(As,()=>e(s),ce=>v(s,ce)),G("click",fi,()=>void q()),g(a,de),ht()}kt(["keydown","click","change","input"]);var W_=j('<div class="group-tasks svelte-1u318f6"></div>'),Y_=j('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),$_=j('<div class="grouped svelte-1u318f6"></div>');function G_(a,t){ft(t,!0);const n=A(gt),r="unscheduled";let s=z(Ue(new Set));function c(f,p){const m=new Date(f+"T00:00:00"),h=p.reduce((y,x)=>y+(x.estimated_pomodoros||0)*(x.pomodoro_duration||25),0);return Nt(e(n).task.groupHeader,{date:f,weekday:e(n).enum.weekday[m.getDay()],n:h})}function l(f){const p=new Set(e(s));p.has(f)?p.delete(f):p.add(f),v(s,p,!0)}const i=A(()=>{const f=new Map;for(const m of t.tasks){let h;t.groupBy==="completed_at"?m.completed_at?h=Zt(m.completed_at):h=r:h=m.due_date?Zt(m.due_date):r,f.has(h)||f.set(h,[]),f.get(h).push(m)}const p=Array.from(f.entries());return p.sort((m,h)=>m[0]===r?1:h[0]===r?-1:new Date(m[0]).getTime()-new Date(h[0]).getTime()),p});var u=$_();je(u,21,()=>e(i),([f,p])=>f,(f,p)=>{var m=A(()=>_l(e(p),2));let h=()=>e(m)[0],y=()=>e(m)[1];const x=A(()=>e(s).has(h()));var S=Y_(),P=o(S),D=o(P),Y=o(D),F=d(D,2),C=o(F);{var k=ne=>{Jn(ne,{size:16})},T=ne=>{Vn(ne,{size:16})};le(C,ne=>{e(x)?ne(k):ne(T,-1)})}var q=d(P,2);{var ie=ne=>{var oe=W_();je(oe,21,y,re=>re.id,(re,ue)=>{{let W=A(()=>{var E;return((E=t.selectedTask)==null?void 0:E.id)===e(ue).id});Gc(re,{get task(){return e(ue)},get selected(){return e(W)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),g(ne,oe)};le(q,ne=>{e(x)||ne(ie)})}M(ne=>{I(P,"aria-expanded",!e(x)),_(Y,ne)},[()=>h()===r?e(n).task.noDate:c(h(),y())]),G("click",P,()=>l(h())),g(f,S)}),g(a,u),ht()}kt(["click"]);var K_=j('<span class="unit svelte-1i37zgo"> </span>'),V_=j('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function Wt(a,t){var n=V_();let r;var s=o(n),c=o(s);Lr(c,()=>t.icon,(h,y)=>{y(h,{size:18,strokeWidth:1.8})});var l=d(s,2),i=o(l),u=d(i);{var f=h=>{var y=K_(),x=o(y);M(()=>_(x,t.unit)),g(h,y)};le(u,h=>{t.unit&&h(f)})}var p=d(l,2),m=o(p);M(()=>{r=at(n,1,"stat-card svelte-1i37zgo",null,r,{accent:t.accent}),_(i,t.value),_(m,t.label)}),g(a,n)}var al=j("<option> </option>"),J_=j('<button type="button" class="clear-btn svelte-1ko7jxa"> </button>'),Q_=j('<button type="button" class="export-btn svelte-1ko7jxa"><!> </button>'),X_=j('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><option> </option><option> </option><option> </option><option> </option></select> <button type="button"> </button> <button type="button"> </button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <!></div></div>');function nl(a,t){ft(t,!0);const n=A(gt),r=A(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function s(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var c=X_(),l=o(c),i=o(l),u=o(i),f=o(u);u.value=u.__value="";var p=d(u);je(p,17,()=>t.projects,L=>L.id,(L,se)=>{var ve=al(),we=o(ve),Me={};M(()=>{_(we,e(se).name),Me!==(Me=e(se).id)&&(ve.value=(ve.__value=e(se).id)??"")}),g(L,ve)});var m;Bt(i);var h=d(i,2),y=o(h),x=o(y);y.value=y.__value="";var S=d(y);je(S,17,()=>t.tags,L=>L.id,(L,se)=>{var ve=al(),we=o(ve),Me={};M(()=>{_(we,e(se).name),Me!==(Me=e(se).id)&&(ve.value=(ve.__value=e(se).id)??"")}),g(L,ve)});var P;Bt(h);var D=d(h,2),Y=o(D),F=o(Y);Y.value=Y.__value="";var C=d(Y),k=o(C);C.value=C.__value="high";var T=d(C),q=o(T);T.value=T.__value="medium";var ie=d(T),ne=o(ie);ie.value=ie.__value="low";var oe=d(ie),re=o(oe);oe.value=oe.__value="none";var ue;Bt(D);var W=d(D,2);let E;var U=o(W),Q=d(W,2);let fe;var ye=o(Q),te=d(Q,2);{var de=L=>{var se=J_(),ve=o(se);M(()=>_(ve,e(n).timer.clearFilter)),G("click",se,s),g(L,se)};le(te,L=>{e(r)&&L(de)})}var ke=d(l,2),R=o(ke),$=o(R),B=d(R,2),X=d(B,2),pe=o(X),ge=d(X,2),he=d(ge,2);{var _e=L=>{var se=Q_(),ve=o(se);vv(ve,{size:14});var we=d(ve);M(()=>_(we,` ${e(n).filter.export??""}`)),G("click",se,function(...Me){var Fe;(Fe=t.onExport)==null||Fe.apply(this,Me)}),g(L,se)};le(he,L=>{t.onExport&&L(_e)})}M((L,se)=>{I(i,"title",L),I(i,"aria-label",e(n).filter.projectAria),_(f,e(n).filter.allProject),m!==(m=t.filterProject??"")&&(i.value=(i.__value=t.filterProject??"")??"",It(i,t.filterProject??"")),I(h,"title",se),I(h,"aria-label",e(n).filter.tagAria),_(x,e(n).filter.allTag),P!==(P=t.filterTag??"")&&(h.value=(h.__value=t.filterTag??"")??"",It(h,t.filterTag??"")),I(D,"aria-label",e(n).filter.priorityAria),_(F,e(n).filter.allPriority),_(k,e(n).priority.high),_(q,e(n).priority.medium),_(ne,e(n).priority.low),_(re,e(n).priority.none),ue!==(ue=t.filterPriority??"")&&(D.value=(D.__value=t.filterPriority??"")??"",It(D,t.filterPriority??"")),E=at(W,1,"preset-btn svelte-1ko7jxa",null,E,{on:t.filterPreset==="week"}),_(U,e(n).filter.week),fe=at(Q,1,"preset-btn svelte-1ko7jxa",null,fe,{on:t.filterPreset==="month"}),_(ye,e(n).filter.month),_($,e(n).filter.dueDate),us(B,t.filterStartDate),I(B,"aria-label",e(n).filter.startDate),_(pe,e(n).filter.to),us(ge,t.filterEndDate),I(ge,"aria-label",e(n).filter.endDate)},[()=>{var L;return t.filterProject!==null?(L=t.projects.find(se=>se.id===t.filterProject))==null?void 0:L.name:e(n).filter.allProject},()=>{var L;return t.filterTag!==null?(L=t.tags.find(se=>se.id===t.filterTag))==null?void 0:L.name:e(n).filter.allTag}]),G("change",i,L=>{const se=L.currentTarget.value;t.setFilterProject(se||null)}),G("change",h,L=>{const se=L.currentTarget.value;t.setFilterTag(se||null)}),G("change",D,L=>{const se=L.currentTarget.value;t.setFilterPriority(se||null)}),G("click",W,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),G("click",Q,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),G("change",B,L=>t.setFilterStartDate(L.currentTarget.value)),G("change",ge,L=>t.setFilterEndDate(L.currentTarget.value)),g(a,c),ht()}kt(["change","click"]);var Z_=j('<button type="button"><!></button>'),ep=j('<div class="error svelte-1vpobhk"> </div>'),to=j("<option> </option>"),tp=j('<button type="button"> </button>'),ap=j('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk"> </span> <div class="tag-chips svelte-1vpobhk"></div></div>'),np=j('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk"> </label> <select id="tf-proj" class="svelte-1vpobhk"><option> </option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk"> </label> <select id="tf-pri" class="svelte-1vpobhk"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk"> </label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk"> </label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk"> </label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk"> </label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk"> </button></div></div>'),rp=j('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function sp(a,t){ft(t,!0);const n=A(gt),r=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],s=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],c={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},l={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function i(R){return e(n).enum.reminder[c[R]]}function u(R){return e(n).enum.repeat[l[R]]}let f=A(Xa),p=z(""),m=z(Ue(Ut(()=>t.defaultProjectId??null))),h=z("medium"),y=z(Ue(Ut(()=>t.defaultDueDate||Ia()))),x=z(0),S=z("none"),P=z("none"),D=z(null),Y=z(!1),F=z(Ue(Ut(()=>t.tags.length>0?[t.tags[0].id]:[]))),C=z(!1),k=z(""),T=z(!1);Tt(()=>{v(m,t.defaultProjectId??null,!0)}),Tt(()=>{v(y,t.defaultDueDate||Ia(),!0)}),Tt(()=>{t.tags.length>0&&e(F).length===0&&v(F,[t.tags[0].id],!0)});async function q(){const R=e(p).trim();if(!R){v(k,e(n).form.needTitle,!0);return}let $=e(y)||Ia();if(e(S)!=="none"&&!gs($)){if(!e(T)){v(T,!0),v(k,e(n).form.needTimeForReminder,!0);return}$=Eo($)}v(T,!1),v(k,"");try{await t.onAdd({title:R,project_id:e(m),priority:e(h),due_date:$,estimated_pomodoros:e(x)>0?e(x):1,pomodoro_duration:e(f).focusDuration,reminder:e(S)==="none"?null:e(S),repeat:e(P)==="none"?null:e(P),repeat_config:e(P)==="custom"?e(D):null,tag_ids:e(F)}),v(p,""),v(m,t.defaultProjectId??null,!0),v(h,"medium"),v(y,t.defaultDueDate||Ia(),!0),v(x,0),v(S,"none"),v(T,!1),v(P,"none"),v(D,null),v(F,t.tags.length>0?[t.tags[0].id]:[],!0),v(C,!1)}catch(B){v(k,String(B),!0)}}function ie(R){R.preventDefault(),q()}function ne(){e(C)||gs(e(y))||v(y,Eo(e(y)),!0),v(C,!e(C))}var oe=rp(),re=o(oe),ue=o(re);Mn(ue,{size:16,class:"plus-icon"});var W=d(ue,2),E=d(W,2);je(E,20,()=>Array.from({length:6},(R,$)=>$+1),Oa,(R,$)=>{const B=A(()=>e(x)>=$);var X=Z_();let pe;var ge=o(X);Wc(ge,{size:14,get filled(){return e(B)}}),M(()=>{pe=at(X,1,"tomato-btn svelte-1vpobhk",null,pe,{filled:e(B)}),I(X,"aria-label",`${$} ${e(n).form.pomodoroUnit}`),I(X,"aria-pressed",e(B))}),G("click",X,()=>v(x,$,!0)),g(R,X)});var U=d(E,2),Q=o(U),fe=d(re,2);{var ye=R=>{var $=ep(),B=o($);M(()=>_(B,e(k))),g(R,$)};le(fe,R=>{e(k)&&R(ye)})}var te=d(fe,2);{var de=R=>{var $=np(),B=o($),X=o(B),pe=o(X),ge=d(X,2),he=o(ge),_e=o(he);he.value=he.__value="";var L=d(he);je(L,17,()=>Kc(t.projects),tt=>tt.id,(tt,mt)=>{var pt=to(),Ct=o(pt),Pt={};M(Ye=>{pt.disabled=e(mt).disabled,_(Ct,`${Ye??""}${e(mt).name??""}`),Pt!==(Pt=e(mt).id)&&(pt.value=(pt.__value=e(mt).id)??"")},[()=>"　".repeat(e(mt).depth)]),g(tt,pt)});var se;Bt(ge);var ve=d(B,2),we=o(ve),Me=o(we),Fe=d(we,2),Oe=o(Fe),We=o(Oe);Oe.value=Oe.__value="high";var Be=d(Oe),J=o(Be);Be.value=Be.__value="medium";var H=d(Be),b=o(H);H.value=H.__value="low";var w=d(H),Z=o(w);w.value=w.__value="none";var O;Bt(Fe);var V=d(ve,2),K=o(V),ee=o(K),me=d(K,2),be=d(V,2),Ie=o(be),it=o(Ie),lt=d(Ie,2),_t=d(be,2),rt=o(_t),Ve=o(rt),ze=d(rt,2);je(ze,21,()=>r,tt=>tt.value,(tt,mt)=>{var pt=to(),Ct=o(pt),Pt={};M(Ye=>{_(Ct,Ye),Pt!==(Pt=e(mt).value)&&(pt.value=(pt.__value=e(mt).value)??"")},[()=>i(e(mt).value)]),g(tt,pt)});var He=d(_t,2),Ne=o(He),Se=o(Ne),nt=d(Ne,2);je(nt,21,()=>s,tt=>tt.value,(tt,mt)=>{var pt=to(),Ct=o(pt),Pt={};M(Ye=>{_(Ct,Ye),Pt!==(Pt=e(mt).value)&&(pt.value=(pt.__value=e(mt).value)??"")},[()=>u(e(mt).value)]),g(tt,pt)});var ct=d(He,2);{var Dt=tt=>{var mt=ap(),pt=o(mt),Ct=o(pt),Pt=d(pt,2);je(Pt,21,()=>t.tags,Ye=>Ye.id,(Ye,Ae)=>{const dt=A(()=>e(F).includes(e(Ae).id));var ae=tp();let Te;var Le=o(ae);M(()=>{Te=at(ae,1,"chip svelte-1vpobhk",null,Te,{on:e(dt)}),I(ae,"aria-pressed",e(dt)),_(Le,e(Ae).name)}),G("click",ae,()=>v(F,e(dt)?e(F).filter(Je=>Je!==e(Ae).id):[...e(F),e(Ae).id],!0)),g(Ye,ae)}),M(()=>_(Ct,e(n).filter.tag)),g(tt,mt)};le(ct,tt=>{t.tags.length>0&&tt(Dt)})}var zt=d(ct,2),Vt=o(zt),ua=o(Vt);M(()=>{_(pe,e(n).filter.project),_(_e,e(n).task.detailNoProject),se!==(se=e(m)??"")&&(ge.value=(ge.__value=e(m)??"")??"",It(ge,e(m)??"")),_(Me,e(n).filter.priority),_(We,e(n).priority.high),_(J,e(n).priority.medium),_(b,e(n).priority.low),_(Z,e(n).priority.none),O!==(O=e(h))&&(Fe.value=(Fe.__value=e(h))??"",It(Fe,e(h))),_(ee,e(n).filter.dueDate),_(it,e(n).form.estimatedPomo),_(Ve,e(n).task.detailReminder),_(Se,e(n).task.detailRepeat),_(ua,e(n).form.submit)}),G("change",ge,tt=>{const mt=tt.currentTarget.value;v(m,mt||null,!0)}),G("change",Fe,tt=>{v(h,tt.currentTarget.value,!0)}),G("input",me,tt=>{tt.currentTarget.value.length===16&&tt.currentTarget.blur()}),bt(me,()=>e(y),tt=>v(y,tt)),bt(lt,()=>e(x),tt=>v(x,tt)),G("change",ze,()=>v(T,!1)),ds(ze,()=>e(S),tt=>v(S,tt)),G("change",nt,tt=>{tt.currentTarget.value==="custom"?v(Y,!0):v(D,null)}),ds(nt,()=>e(P),tt=>v(P,tt)),G("click",Vt,q),g(R,$)};le(te,R=>{e(C)&&R(de)})}var ke=d(te,2);Vc(ke,{get open(){return e(Y)},get initialConfig(){return e(D)},onConfirm:R=>{v(D,R,!0),v(Y,!1)},onClose:()=>v(Y,!1)}),M(()=>{I(W,"placeholder",e(n).form.titlePlaceholder),I(E,"aria-label",e(n).form.pomodoroIcons),_(Q,e(C)?e(n).form.collapse:e(n).form.more)}),wt("submit",oe,ie),bt(W,()=>e(p),R=>v(p,R)),G("click",U,ne),g(a,oe),ht()}kt(["click","change","input"]);var op=j('<button type="button"><!></button>');function ip(a,t){ft(t,!0);const n=A(gt);var r=op();let s;var c=o(r);{var l=i=>{Ya(i,{size:10,strokeWidth:3,color:"#fff"})};le(c,i=>{t.completed&&i(l)})}M(()=>{s=at(r,1,"checkbox svelte-1bxwwxl",null,s,{completed:t.completed}),I(r,"aria-label",t.completed?e(n).common.ariaCompleted:e(n).common.ariaMarkDone)}),G("click",r,i=>{i.stopPropagation(),t.onToggle()}),g(a,r),ht()}kt(["click"]);var rl=j("<option> </option>"),lp=j('<div class="no-task svelte-tr144z"> </div>'),cp=j('<div class="task-row svelte-tr144z"><!> <span> </span></div>'),dp=j('<div class="day-cell svelte-tr144z"><div> </div> <!> <div class="day-divider svelte-tr144z"></div> <!></div>'),up=j('<section class="week-card svelte-tr144z"><div class="week-title svelte-tr144z"> </div> <div class="day-grid svelte-tr144z"></div> <div class="weekly-block svelte-tr144z"><div class="weekly-label svelte-tr144z"> </div> <!></div></section>'),vp=j('<div class="journal svelte-tr144z"><div class="inner svelte-tr144z"><div class="head svelte-tr144z"><h1 class="title svelte-tr144z"> </h1> <div class="month-nav svelte-tr144z"><button type="button" class="nav-btn svelte-tr144z"><!></button> <select class="select svelte-tr144z"></select> <select class="select svelte-tr144z"></select> <button type="button" class="nav-btn svelte-tr144z"><!></button></div></div> <div class="weeks svelte-tr144z"></div></div></div>');function fp(a,t){ft(t,!0);const n=A(gt),r=Array.from({length:61},(te,de)=>2026+de),s=Array.from({length:12},(te,de)=>de+1);let c=z(Ue([])),l=z(Ue([]));async function i(te,de){const ke=Na(new Date(te,de-1,1)),R=Na(new Date(te,de,0));try{const[$,B]=await Promise.all([Fc(te,de),af(ke,R)]);if(te!==t.year||de!==t.month)return;v(c,$,!0),v(l,B,!0)}catch($){console.warn("journal load reviews failed",$)}}Tt(()=>{const te=t.year,de=t.month;i(te,de)});const u=A(()=>{const te=e(n).journal.weekday;return $c(t.year,t.month).map((de,ke)=>{const R=Array.from({length:7},(X,pe)=>{const ge=new Date(de);return ge.setDate(ge.getDate()+pe),ge}),$=R[6],B=R.map((X,pe)=>({iso:Na(X),label:`${te[pe]} ${X.getMonth()+1}/${X.getDate()}`}));return{startISO:Na(de),title:Nt(e(n).journal.weekRange,{n:ke+1,ms:de.getMonth()+1,ds:de.getDate(),me:$.getMonth()+1,de:$.getDate()}),days:B}})});function f(te){return te===Na(new Date)}const p=A(()=>{const te=new Map;for(const de of t.tasks){const ke=Zt(de.due_date);ke&&(te.has(ke)||te.set(ke,[]),te.get(ke).push(de))}return te}),m=A(()=>new Map(e(c).map(te=>[te.week_start,te]))),h=A(()=>new Map(e(l).map(te=>[te.date,te])));function y(){t.month===1?(t.onMonthChange(12),t.onYearChange(t.year-1)):t.onMonthChange(t.month-1)}function x(){t.month===12?(t.onMonthChange(1),t.onYearChange(t.year+1)):t.onMonthChange(t.month+1)}async function S(te){var de;try{te.status==="active"?await Pc(te.id):await Mc(te.id),(de=t.onTasksChange)==null||de.call(t)}catch(ke){console.warn("journal toggle task failed",ke)}}async function P(te,de){try{const ke=e(h).get(te),R=ke?{...ke,content:de}:{id:crypto.randomUUID(),date:te,content:de,updated_at:new Date().toISOString()};await Cc(R),await i(t.year,t.month)}catch(ke){console.warn("journal save daily review failed",ke)}}async function D(te){try{await Nc(te),await i(t.year,t.month)}catch(de){console.warn("journal delete daily review failed",de)}}async function Y(te,de){var ke;try{const R=e(m).get(te),$=R?{...R,content:de}:{id:crypto.randomUUID(),week_start:te,content:de,updated_at:new Date().toISOString()};await nf($),await i(t.year,t.month),(ke=t.onReviewChange)==null||ke.call(t)}catch(R){console.warn("journal save weekly review failed",R)}}async function F(te){var de;try{await rf(te),await i(t.year,t.month),(de=t.onReviewChange)==null||de.call(t)}catch(ke){console.warn("journal delete weekly review failed",ke)}}var C=vp(),k=o(C),T=o(k),q=o(T),ie=o(q),ne=d(q,2),oe=o(ne),re=o(oe);uv(re,{size:16});var ue=d(oe,2);je(ue,20,()=>r,te=>te,(te,de)=>{var ke=rl(),R=o(ke),$={};M(B=>{_(R,B),$!==($=de)&&(ke.value=(ke.__value=de)??"")},[()=>Nt(e(n).journal.yearOption,{year:de})]),g(te,ke)});var W;Bt(ue);var E=d(ue,2);je(E,20,()=>s,te=>te,(te,de)=>{var ke=rl(),R=o(ke),$={};M(B=>{_(R,B),$!==($=de)&&(ke.value=(ke.__value=de)??"")},[()=>Nt(e(n).journal.monthOption,{month:de})]),g(te,ke)});var U;Bt(E);var Q=d(E,2),fe=o(Q);Jn(fe,{size:16});var ye=d(T,2);je(ye,21,()=>e(u),te=>te.startISO,(te,de)=>{var ke=up(),R=o(ke),$=o(R),B=d(R,2);je(B,21,()=>e(de).days,_e=>_e.iso,(_e,L)=>{var se=dp(),ve=o(se);let we;var Me=o(ve),Fe=d(ve,2);{var Oe=H=>{var b=lp(),w=o(b);M(()=>_(w,e(n).common.noData)),g(H,b)},We=A(()=>(e(p).get(e(L).iso)??[]).length===0),Be=H=>{var b=qe(),w=Ee(b);je(w,17,()=>e(p).get(e(L).iso)??[],Z=>Z.id,(Z,O,V,K)=>{var ee=cp(),me=o(ee);{let lt=A(()=>e(O).status==="completed");ip(me,{get completed(){return e(lt)},onToggle:()=>S(e(O))})}var be=d(me,2);let Ie;var it=o(be);M(()=>{Ie=at(be,1,"task-title svelte-tr144z",null,Ie,{done:e(O).status==="completed"}),_(it,e(O).title)}),g(Z,ee)}),g(H,b)};le(Fe,H=>{e(We)?H(Oe):H(Be,-1)})}var J=d(Fe,4);{let H=A(()=>{var b;return((b=e(h).get(e(L).iso))==null?void 0:b.content)||null});ps(J,{get value(){return e(H)},get placeholder(){return e(n).journal.dailyReviewPlaceholder},rows:2,onSave:b=>P(e(L).iso,b),onDelete:()=>D(e(L).iso)})}M(H=>{we=at(ve,1,"day-head svelte-tr144z",null,we,H),_(Me,e(L).label)},[()=>({today:f(e(L).iso)})]),g(_e,se)});var X=d(B,2),pe=o(X),ge=o(pe),he=d(pe,2);{let _e=A(()=>{var L;return((L=e(m).get(e(de).startISO))==null?void 0:L.content)||null});ps(he,{get value(){return e(_e)},get placeholder(){return e(n).journal.weeklyReviewPlaceholder},rows:5,onSave:L=>Y(e(de).startISO,L),onDelete:()=>F(e(de).startISO)})}M(()=>{_($,e(de).title),_(ge,e(n).journal.weeklyReview)}),g(te,ke)}),M(te=>{_(ie,te),I(oe,"title",e(n).journal.prevMonth),I(oe,"aria-label",e(n).journal.prevMonth),I(ue,"aria-label",e(n).journal.yearAria),W!==(W=t.year)&&(ue.value=(ue.__value=t.year)??"",It(ue,t.year)),I(E,"aria-label",e(n).journal.monthAria),U!==(U=t.month)&&(E.value=(E.__value=t.month)??"",It(E,t.month)),I(Q,"title",e(n).journal.nextMonth),I(Q,"aria-label",e(n).journal.nextMonth)},[()=>Nt(e(n).journal.monthTitle,{year:t.year,month:t.month})]),G("click",oe,y),G("change",ue,te=>t.onYearChange(Number(te.currentTarget.value))),G("change",E,te=>t.onMonthChange(Number(te.currentTarget.value))),G("click",Q,x),g(a,C),ht()}kt(["click","change"]);var hp=j('<div class="week-card svelte-w363gh"><div class="week-head svelte-w363gh"> </div> <div> </div></div>'),_p=j('<aside class="panel svelte-w363gh"><h2 class="title svelte-w363gh"> </h2> <div class="weekly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <div class="week-list svelte-w363gh"></div></div> <div class="monthly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div></aside>');function pp(a,t){ft(t,!0);const n=A(gt);let r=z(Ue([])),s=z(null);async function c(k,T){try{const[q,ie]=await Promise.all([Fc(k,T),sf(`${k}-${wr(T)}`)]);if(k!==t.year||T!==t.month)return;v(r,q,!0),v(s,ie,!0)}catch(q){console.warn("month panel load failed",q)}}Tt(()=>{const k=t.year,T=t.month;t.reviewVersion,c(k,T)});const l=A(()=>$c(t.year,t.month)),i=A(()=>{const k=new Map;for(const T of e(r))k.set(T.week_start,T.content);return k});async function u(k){try{const T=`${t.year}-${wr(t.month)}`,q=e(s)?{...e(s),content:k}:{id:crypto.randomUUID(),year_month:T,content:k,updated_at:new Date().toISOString()};await of(q),await c(t.year,t.month)}catch(T){console.warn("month panel save failed",T)}}async function f(){try{await lf(`${t.year}-${wr(t.month)}`),await c(t.year,t.month)}catch(k){console.warn("month panel delete failed",k)}}var p=_p(),m=o(p),h=o(m),y=d(m,2),x=o(y),S=o(x),P=d(x,2);je(P,23,()=>e(l),k=>Na(k),(k,T,q)=>{const ie=A(()=>Na(e(T))),ne=A(()=>e(i).get(e(ie)));var oe=hp(),re=o(oe),ue=o(re),W=d(re,2);let E;var U=o(W);M((Q,fe,ye)=>{_(ue,Q),E=at(W,1,"week-content svelte-w363gh",null,E,fe),_(U,ye)},[()=>Nt(e(n).monthPanel.weekRange,{n:e(q)+1,date:e(ie)}),()=>{var Q;return{dimmed:!((Q=e(ne))!=null&&Q.trim())}},()=>{var Q;return(Q=e(ne))!=null&&Q.trim()?e(ne):e(n).monthPanel.empty}]),g(k,oe)});var D=d(y,2),Y=o(D),F=o(Y),C=d(Y,2);{let k=A(()=>{var T;return((T=e(s))==null?void 0:T.content)||null});ps(C,{get value(){return e(k)},get placeholder(){return e(n).monthPanel.monthlyPlaceholder},rows:6,onSave:u,onDelete:f})}M((k,T)=>{I(p,"aria-label",k),_(h,T),_(S,e(n).monthPanel.weeklyReadonly),_(F,e(n).monthPanel.monthlyReview)},[()=>Nt(e(n).monthPanel.title,{year:t.year,month:t.month}),()=>Nt(e(n).monthPanel.title,{year:t.year,month:t.month})]),g(a,p),ht()}var gp=j('<h1 class="title svelte-969q1d"> </h1>'),mp=j('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),bp=j('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),yp=j('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),kp=j('<p class="loading svelte-969q1d"> </p>'),wp=j('<p class="empty svelte-969q1d"> </p>'),xp=j('<div class="task-list svelte-969q1d"></div>'),Sp=j('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),Tp=j('<aside class="detail-empty svelte-969q1d"> </aside>'),Dp=j('<div class="page page-veil svelte-969q1d"><!> <div><!></div> <!></div>');function Pp(a,t){ft(t,!0);let n=z(Ue([])),r=z(Ue([])),s=z(Ue([])),c=z(!0),l=z(null);const i=A(gt);let u=z(null),f=z("today"),p=z(""),m=z(null),h=z(Ue(new Date().getFullYear())),y=z(new Date().getMonth()+1),x=z(0),S=z(null),P=z(null),D=z(null),Y=z(null),F=z(""),C=z(""),k=z(null),T=z(null),q=z(null),ie=z(null),ne=z(""),oe=z("");const re=A(()=>{let J=[...e(n)];const H={high:0,medium:1,low:2,none:3};if(e(p).trim()){const me=e(p).trim().toLowerCase();return J=J.filter(be=>be.title.toLowerCase().includes(me)),J.sort((be,Ie)=>{if(be.status!==Ie.status)return be.status==="active"?-1:1;const it=H[be.priority||"none"]??3,lt=H[Ie.priority||"none"]??3;return it!==lt?it-lt:new Date(be.created_at??0).getTime()-new Date(Ie.created_at??0).getTime()}),J}const b=Ia(),w=ns(),Z=new Date,O=Z.getDay(),V=O===0?6:O-1,K=new Date(Z);K.setDate(K.getDate()-V),K.setHours(0,0,0,0);const ee=new Date(K);return ee.setDate(ee.getDate()+6),ee.setHours(23,59,59,999),e(u)!==null?J=J.filter(me=>me.project_id===e(u)):e(f)==="today"?J=J.filter(me=>Zt(me.due_date)===b):e(f)==="tomorrow"?J=J.filter(me=>Zt(me.due_date)===w):e(f)==="week"?J=J.filter(me=>{if(!me.due_date)return!1;const be=new Date(me.due_date);return be>=K&&be<=ee}):e(f)==="planned"?J=ue(J,{project:e(S),tag:e(P),priority:e(D),preset:e(Y),startDate:e(F),endDate:e(C)}):e(f)==="completed"?(J=J.filter(me=>me.status==="completed"),J=ue(J,{project:e(k),tag:e(T),priority:e(q),preset:e(ie),startDate:e(ne),endDate:e(oe)})):e(f)==="journal"&&(J=J.filter(me=>!!me.due_date)),J.sort((me,be)=>{if(me.status!==be.status)return me.status==="active"?-1:1;const Ie=H[me.priority||"none"]??3,it=H[be.priority||"none"]??3;return Ie!==it?Ie-it:new Date(me.created_at??0).getTime()-new Date(be.created_at??0).getTime()}),J});function ue(J,H){let b=J;if(H.project!==null&&(b=b.filter(w=>w.project_id===H.project)),H.tag!==null&&(b=b.filter(w=>(w.tags??[]).some(Z=>Z.id===H.tag))),H.priority!==null&&(b=b.filter(w=>w.priority===H.priority)),H.preset==="week"){const w=new Date,Z=w.getDay(),O=Z===0?6:Z-1,V=new Date(w);V.setDate(w.getDate()-O);const K=new Date(V);K.setDate(V.getDate()+6);const ee=Na(V),me=Na(K);b=b.filter(be=>{const Ie=Zt(be.due_date);return!!Ie&&Ie>=ee&&Ie<=me})}if(H.preset==="month"){const w=new Date,Z=`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}-01`,O=new Date(w.getFullYear(),w.getMonth()+1,0),V=Na(O);b=b.filter(K=>{const ee=Zt(K.due_date);return!!ee&&ee>=Z&&ee<=V})}return H.startDate&&(b=b.filter(w=>{const Z=Zt(w.due_date);return!!Z&&Z>=H.startDate})),H.endDate&&(b=b.filter(w=>{const Z=Zt(w.due_date);return!!Z&&Z<=H.endDate})),b}const W=A(()=>{const J=e(re).filter(O=>O.status==="active").reduce((O,V)=>O+(V.estimated_pomodoros||0)*(V.pomodoro_duration||25),0),H=e(re).filter(O=>O.status==="active").length,b=e(re).reduce((O,V)=>O+(V.completed_pomodoros||0)*(V.pomodoro_duration||25),0),w=e(re).reduce((O,V)=>O+(V.completed_pomodoros||0),0),Z=e(re).filter(O=>O.status==="completed").length;return{estimatedMinutes:J,activeCount:H,focusedMinutes:b,completedCount:Z,completedPomodoros:w}}),E=A(()=>{if(e(p).trim())return`${e(i).task.searchResult} (${e(re).length})`;if(e(u)!==null){const H=e(r).find(b=>b.id===e(u));return(H==null?void 0:H.name)||e(i).task.list}return{today:e(i).filter.today,tomorrow:e(i).filter.tomorrow,week:e(i).filter.week,planned:e(i).sidebar.planned,completed:e(i).sidebar.completed,journal:e(i).sidebar.journal,"":e(i).task.task}[e(f)]||e(i).task.task});async function U(){try{const[J,H,b]=await Promise.all([jn({}),ti(),ai()]);if(v(n,J.map(w=>({...w,tags:w.tags??[]})),!0),v(r,H,!0),v(s,b,!0),e(m)){const w=e(n).find(Z=>Z.id===e(m).id);v(m,w??null,!0)}ah()}catch(J){v(l,String(J),!0)}finally{v(c,!1)}}Qa(U);function Q(){return new Date().toISOString()}function fe(){return crypto.randomUUID()}async function ye(J){const H=typeof J=="string"?J:J.id,b=typeof J=="string"?e(n).find(w=>w.id===H):J;if(b)try{b.status==="active"?await Pc(H):await Mc(H),await U()}catch(w){v(l,String(w),!0)}}async function te(J,H=null){try{await fs({id:fe(),name:J,color:"#c97b6e",parent_id:H??null,created_at:Q(),updated_at:Q()}),await U()}catch(b){v(l,String(b),!0)}}async function de(J,H){try{const b=e(r).find(w=>w.id===J);if(!b)return;await fs({...b,name:H,updated_at:Q()}),await U()}catch(b){v(l,String(b),!0)}}async function ke(J){if(confirm(e(i).sidebar.deleteListConfirm))try{await jc(J),e(u)===J&&v(u,null),await U()}catch(H){v(l,String(H),!0)}}function R(J){v(m,J,!0)}function $(){v(m,null)}function B(){U()}async function X(J){try{await Of(J),bc("/timer")}catch(H){v(l,String(H),!0)}}async function pe(J){const H=J.due_date??(e(f)==="tomorrow"?ns():Ia());try{const b=fe();await So({id:b,title:J.title,description:"",project_id:J.project_id??e(u),priority:J.priority,status:"active",due_date:No(gs(H)?H:`${H}T00:00:00`),estimated_pomodoros:J.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:J.pomodoro_duration,reminder:J.reminder??"none",repeat:J.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:J.repeat_config??null,completed_at:null,created_at:Q(),updated_at:Q()},J.tag_ids),await U()}catch(b){v(l,String(b),!0)}}async function ge(){try{const J=await a_({defaultPath:`${e(i).export.fileName}_${Ia()}.xlsx`,filters:[{name:"xlsx",extensions:["xlsx"]}]});if(!J)return;const H=[e(i).export.index,e(i).export.title,e(i).export.project,e(i).export.priority,e(i).export.dueDate,e(i).export.estimated,e(i).export.tags,e(i).export.subtasks,e(i).export.status],b=e(re).map(w=>{var Z;return{title:w.title,project:((Z=e(r).find(O=>O.id===w.project_id))==null?void 0:Z.name)??"",priority:e(i).priority[w.priority??"none"]??w.priority??"",dueDate:Zt(w.due_date),estimated:w.estimated_pomodoros??0,tags:(w.tags??[]).map(O=>O.name).join(", "),subtasks:(w.subtasks??[]).map(O=>O.title).join(`
`),status:w.status==="completed"?e(i).export.statusCompleted:e(i).export.statusActive}});await bf(J,e(i).nav.tasks,H,b)}catch(J){v(l,String(J),!0)}}var he=Dp();Or("969q1d",J=>{qr(()=>{nr.title=e(i).page.tasks??""})});var _e=o(he);m_(_e,{get projects(){return e(r)},get filter(){return e(f)},get selectedProject(){return e(u)},onSetFilter:J=>{v(f,J,!0),v(p,"")},onSelectProject:J=>{v(u,J,!0),v(p,"")},onCreateProject:te,onUpdateProject:de,onDeleteProject:ke,get search(){return e(p)},onSearchChange:J=>{v(p,J,!0),J.trim()&&(v(u,null),v(f,""))},get tasks(){return e(n)}});var L=d(_e,2);let se;var ve=o(L);{var we=J=>{fp(J,{get year(){return e(h)},get month(){return e(y)},get tasks(){return e(re)},onYearChange:H=>v(h,H,!0),onMonthChange:H=>v(y,H,!0),onReviewChange:()=>v(x,e(x)+1),onTasksChange:()=>void U()})},Me=J=>{var H=Sp(),b=o(H);{var w=Ne=>{var Se=gp(),nt=o(Se);M(()=>_(nt,e(E))),g(Ne,Se)};le(b,Ne=>{e(E)&&Ne(w)})}var Z=d(b,2);{var O=Ne=>{var Se=mp(),nt=o(Se);Wt(nt,{get icon(){return Qn},get label(){return e(i).task.statFocused},get value(){return e(W).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var ct=d(nt,2);Wt(ct,{get icon(){return xo},get label(){return e(i).task.statCompletedPomo},get value(){return e(W).completedPomodoros},get unit(){return e(i).stats.unitCount},accent:!0});var Dt=d(ct,2);Wt(Dt,{get icon(){return wo},get label(){return e(i).task.statCompleted},get value(){return e(W).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),g(Ne,Se)},V=Ne=>{var Se=bp(),nt=o(Se);Wt(nt,{get icon(){return Qn},get label(){return e(i).task.statEstimated},get value(){return e(W).estimatedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var ct=d(nt,2);Wt(ct,{get icon(){return xo},get label(){return e(i).task.statActive},get value(){return e(W).activeCount},get unit(){return e(i).stats.unitCount},accent:!0});var Dt=d(ct,2);Wt(Dt,{get icon(){return Jo},get label(){return e(i).task.statFocused},get value(){return e(W).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var zt=d(Dt,2);Wt(zt,{get icon(){return wo},get label(){return e(i).task.statCompleted},get value(){return e(W).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),g(Ne,Se)};le(Z,Ne=>{e(f)==="completed"?Ne(O):Ne(V,-1)})}var K=d(Z,2);{var ee=Ne=>{nl(Ne,{get projects(){return e(r)},get tags(){return e(s)},get filterProject(){return e(k)},setFilterProject:Se=>v(k,Se,!0),get filterTag(){return e(T)},setFilterTag:Se=>v(T,Se,!0),get filterPriority(){return e(q)},setFilterPriority:Se=>v(q,Se,!0),get filterPreset(){return e(ie)},setFilterPreset:Se=>v(ie,Se,!0),get filterStartDate(){return e(ne)},setFilterStartDate:Se=>v(ne,Se,!0),get filterEndDate(){return e(oe)},setFilterEndDate:Se=>v(oe,Se,!0)})},me=Ne=>{nl(Ne,{get projects(){return e(r)},get tags(){return e(s)},get filterProject(){return e(S)},setFilterProject:Se=>v(S,Se,!0),get filterTag(){return e(P)},setFilterTag:Se=>v(P,Se,!0),get filterPriority(){return e(D)},setFilterPriority:Se=>v(D,Se,!0),get filterPreset(){return e(Y)},setFilterPreset:Se=>v(Y,Se,!0),get filterStartDate(){return e(F)},setFilterStartDate:Se=>v(F,Se,!0),get filterEndDate(){return e(C)},setFilterEndDate:Se=>v(C,Se,!0),onExport:ge})};le(K,Ne=>{e(f)==="completed"?Ne(ee):e(f)==="planned"&&Ne(me,1)})}var be=d(K,2);{var Ie=Ne=>{{let Se=A(()=>e(f)==="tomorrow"?ns():Ia());sp(Ne,{get projects(){return e(r)},get tags(){return e(s)},get defaultProjectId(){return e(u)},get defaultDueDate(){return e(Se)},onAdd:pe})}};le(be,Ne=>{e(f)!=="completed"&&Ne(Ie)})}var it=d(be,2);{var lt=Ne=>{var Se=yp(),nt=o(Se),ct=o(nt),Dt=d(nt,2);M(()=>_(ct,`⚠ ${e(l)??""}`)),G("click",Dt,()=>v(l,null)),g(Ne,Se)};le(it,Ne=>{e(l)&&Ne(lt)})}var _t=d(it,2);{var rt=Ne=>{var Se=kp(),nt=o(Se);M(()=>_(nt,e(i).common.loading)),g(Ne,Se)},Ve=Ne=>{var Se=wp(),nt=o(Se);M(()=>_(nt,e(i).task.noTask)),g(Ne,Se)},ze=Ne=>{G_(Ne,{get tasks(){return e(re)},groupBy:"due_date",get selectedTask(){return e(m)},onToggle:ye,onSelect:R,onStart:X})},He=Ne=>{var Se=xp();je(Se,21,()=>e(re),nt=>nt.id,(nt,ct)=>{{let Dt=A(()=>{var zt;return((zt=e(m))==null?void 0:zt.id)===e(ct).id});Gc(nt,{get task(){return e(ct)},get selected(){return e(Dt)},onToggle:()=>ye(e(ct)),onSelect:R,onStart:X})}}),g(Ne,Se)};le(_t,Ne=>{e(c)?Ne(rt):e(re).length===0?Ne(Ve,1):e(f)==="week"||e(f)==="planned"||e(f)==="completed"?Ne(ze,2):Ne(He,-1)})}g(J,H)};le(ve,J=>{e(f)==="journal"?J(we):J(Me,-1)})}var Fe=d(L,2);{var Oe=J=>{pp(J,{get year(){return e(h)},get month(){return e(y)},get reviewVersion(){return e(x)}})},We=J=>{U_(J,{get task(){return e(m)},get projects(){return e(r)},get allTags(){return e(s)},onClose:$,onChanged:B})},Be=J=>{var H=Tp(),b=o(H);M(()=>_(b,e(i).task.detailEmpty)),g(J,H)};le(Fe,J=>{e(f)==="journal"?J(Oe):e(m)?J(We,1):J(Be,-1)})}M(()=>se=at(L,1,"main svelte-969q1d",null,se,{journal:e(f)==="journal"})),g(a,he),ht()}kt(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
//! `DIMENSIONS` / `getRange` / `getPrevRange` / `keyLabel` 纯函数移植。
//!
//! 边界语义(与 v1 逐条对齐,勿擅自改动):
//! - today    : 当天,固定 1 天
//! - week     : 本周一 → 周日,固定 7 天(周一开始;周日属于上一周)
//! - month    : 自然月(1 号 → 月末)
//! - quarter  : 自然季度(季度首月 1 号 → 季度末月月末,按 3 个月推进)
//! - halfyear : 自然半年(上半年 1/1–6/30,下半年 7/1–12/31,按 6 个月推进)
//! - year     : 自然年(1/1 → 12/31)
//! - prev     : 对齐日历边界取上一自然周期(昨日/上周/上月/上季/上半年/去年)
//!
//! 趋势粒度(group)按维度固定:today/week/month → day,quarter → week,
//! halfyear/year → month。
//!
//! 所有函数均为纯函数;`now` 参数仅用于注入"当前时刻"方便核对边界,
//! 缺省取系统时间。日期一律本地时区(与后端 `tz_offset_min` 分桶口径一致)。
const Mp=[{key:"today",group:"day"},{key:"week",group:"day"},{key:"month",group:"day"},{key:"quarter",group:"week"},{key:"halfyear",group:"month"},{key:"year",group:"month"}];function sl(a){return String(a).padStart(2,"0")}function Mt(a){return`${a.getFullYear()}-${sl(a.getMonth()+1)}-${sl(a.getDate())}`}function ao(a,t){return Math.round((t.getTime()-a.getTime())/864e5)+1}function ol(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),s=r===0?-6:1-r;if(a==="today")return{start:Mt(n),end:Mt(n),days:1,group:"day"};if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+s);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Mt(i),end:Mt(u),days:7,group:"day"}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth(),1),u=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:Mt(i),end:Mt(u),days:u.getDate(),group:"day"}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),i*3,1),f=new Date(n.getFullYear(),i*3+3,0);return{start:Mt(u),end:Mt(f),days:ao(u,f),group:"week"}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i,1),f=new Date(n.getFullYear(),i+6,0);return{start:Mt(u),end:Mt(f),days:ao(u,f),group:"month"}}const c=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31);return{start:Mt(c),end:Mt(l),days:ao(c,l),group:"month"}}function jp(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),s=r===0?-6:1-r;if(a==="today"){const i=new Date(n);return i.setDate(n.getDate()-1),{start:Mt(i),end:Mt(i)}}if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+s-7);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Mt(i),end:Mt(u)}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth()-1,1),u=new Date(n.getFullYear(),n.getMonth(),0);return{start:Mt(i),end:Mt(u)}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),(i-1)*3,1),f=new Date(n.getFullYear(),i*3,0);return{start:Mt(u),end:Mt(f)}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i-6,1),f=new Date(n.getFullYear(),i,0);return{start:Mt(u),end:Mt(f)}}const c=new Date(n.getFullYear()-1,0,1),l=new Date(n.getFullYear()-1,11,31);return{start:Mt(c),end:Mt(l)}}function Jc(a,t){return t==="month"?`${Number(a.slice(5,7))}`:`${Number(a.slice(5,7))}/${Number(a.slice(8,10))}`}function Ep(a,t=new Date){return Mt(t)}var Cp=j('<div class="empty svelte-1ixrxd8"> </div>'),Np=Ja('<line class="grid svelte-1ixrxd8"></line>'),Fp=Ja('<line class="tick-line svelte-1ixrxd8"></line><text class="tick svelte-1ixrxd8" text-anchor="end"> </text>',1),Ap=Ja("<path></path>"),Ip=Ja('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),qp=Ja('<!><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),Rp=j('<div class="tooltip svelte-1ixrxd8"> </div>'),Lp=j('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" class="svelte-1ixrxd8"><!><line class="axis svelte-1ixrxd8"></line><!><line class="axis svelte-1ixrxd8"></line><!></svg> <!></div>');function Op(a,t){ft(t,!0);const n=A(gt),r=234,s={top:8,right:8,bottom:24,left:44},c=10,l=32,i=4;let u=z(0);const f=A(()=>e(u)>0?e(u):600),p=A(()=>e(f)-s.left-s.right),m=r-s.top-s.bottom;let h=z(null);function y(k){if(k<=0)return 0;const T=Math.pow(10,Math.floor(Math.log10(k))),q=k/T;return(q<=1?1:q<=2?2:q<=5?5:10)*T}function x(k,T,q,ie,ne){const oe=Math.min(ne,q/2,Math.max(0,ie));return`M ${k} ${T+ie} L ${k} ${T+oe} Q ${k} ${T} ${k+oe} ${T} L ${k+q-oe} ${T} Q ${k+q} ${T} ${k+q} ${T+oe} L ${k+q} ${T+ie} Z`}const S=A(()=>{const k=t.data.length,T=t.data.reduce((E,U)=>Math.max(E,U.minutes),0),q=y(T),ie=k>0?e(p)/k:e(p),ne=Math.min(ie*.62,l),oe=Math.max(1,Math.ceil(k/c)),re=t.group==="day"?Ep():null,ue=t.data.map((E,U)=>{const Q=E.minutes>0&&q>0?E.minutes/q*m:0,fe=s.left+ie*U+(ie-ne)/2,ye=s.top+m-Q;return{i:U,key:E.key,minutes:E.minutes,x:fe,y:ye,w:ne,h:Q,path:x(fe,ye,ne,Q,i),hitX:s.left+ie*U,hitW:ie,label:Jc(E.key,t.group),showLabel:U%oe===0||U===k-1,isCurrent:re!==null&&E.key===re}}),W=[0,.25,.5,.75,1].map(E=>({y:s.top+m-E*m,value:Math.round(q*E)}));return{bars:ue,ticks:W,baseline:s.top+m}}),P=A(()=>e(h)!==null?e(S).bars[e(h)]:null);var D=qe(),Y=Ee(D);{var F=k=>{var T=Cp(),q=o(T);M(()=>_(q,t.emptyText??e(n).stats.noData)),g(k,T)},C=k=>{var T=Lp(),q=o(T);I(q,"height",r);var ie=o(q);je(ie,17,()=>e(S).ticks.slice(1,-1),Oa,(U,Q)=>{var fe=Np();M(()=>{I(fe,"x1",s.left),I(fe,"x2",e(f)-s.right),I(fe,"y1",e(Q).y),I(fe,"y2",e(Q).y)}),g(U,fe)});var ne=d(ie),oe=d(ne);je(oe,17,()=>e(S).ticks,Oa,(U,Q)=>{var fe=Fp(),ye=Ee(fe),te=d(ye),de=o(te);M(()=>{I(ye,"x1",s.left-4),I(ye,"x2",s.left),I(ye,"y1",e(Q).y),I(ye,"y2",e(Q).y),I(te,"x",s.left-6),I(te,"y",e(Q).y+3.5),_(de,e(Q).value)}),g(U,fe)});var re=d(oe),ue=d(re);je(ue,17,()=>e(S).bars,U=>U.key,(U,Q)=>{var fe=qp(),ye=Ee(fe);{var te=$=>{var B=Ap();let X;M(()=>{X=at(B,0,"bar svelte-1ixrxd8",null,X,{current:e(Q).isCurrent}),I(B,"d",e(Q).path)}),g($,B)};le(ye,$=>{e(Q).h>0&&$(te)})}var de=d(ye);{var ke=$=>{var B=Ip();I(B,"y",r-6);var X=o(B);M(()=>{I(B,"x",e(Q).x+e(Q).w/2),_(X,e(Q).label)}),g($,B)};le(de,$=>{e(Q).showLabel&&$(ke)})}var R=d(de);M(()=>{I(R,"x",e(Q).hitX),I(R,"y",s.top),I(R,"width",e(Q).hitW),I(R,"height",m)}),wt("pointerenter",R,()=>v(h,e(Q).i,!0)),wt("pointerleave",R,()=>v(h,null)),g(U,fe)});var W=d(q,2);{var E=U=>{var Q=Rp();let fe;var ye=o(Q);M(te=>{fe=At(Q,"",fe,te),_(ye,`${e(P).label??""} · ${e(P).minutes??""} ${e(n).stats.unitMin??""}`)},[()=>({left:Math.min(88,Math.max(12,(e(P).x+e(P).w/2)/e(f)*100))+"%",top:e(P).y/r*100+"%"})]),g(U,Q)};le(W,U=>{e(P)&&U(E)})}M(()=>{I(q,"viewBox",`0 0 ${e(f)??""} 234`),I(q,"width",e(f)),I(q,"aria-label",e(n).stats.trendChartAria),I(ne,"x1",s.left),I(ne,"x2",s.left),I(ne,"y1",s.top),I(ne,"y2",e(S).baseline),I(re,"x1",s.left),I(re,"x2",e(f)-s.right),I(re,"y1",e(S).baseline),I(re,"y2",e(S).baseline)}),wt("pointerleave",q,()=>v(h,null)),Ku(T,"clientWidth",U=>v(u,U)),g(k,T)};le(Y,k=>{t.data.length===0?k(F):k(C,-1)})}g(a,D),ht()}var Bp=j('<div class="empty svelte-s63rv4"> </div>'),zp=Ja('<circle class="seg svelte-s63rv4" role="presentation" pathLength="100"></circle>'),Hp=Ja('<text class="seg-label svelte-s63rv4" dominant-baseline="middle"> </text>'),Up=j('<div class="tooltip svelte-s63rv4"> </div>'),Wp=j('<div class="chart svelte-s63rv4"><svg role="img" class="svelte-s63rv4"><g></g><!></svg> <!></div>');function Yp(a,t){ft(t,!0);const n=A(gt),r=240,s=120,c=70,l=2/360*100,i=104,u=[500,300,700,400,200,600,800,100,900],f={100:"#faebe2",200:"#f4d5c4",300:"#ecb89d",400:"#e29676",500:"#d17b5c",600:"#b86649",700:"#9a523b",800:"#7a4130",900:"#5c3125"};function p(C){if(C<u.length){const k=u[C];return`var(--color-accent-${k}, ${f[String(k)]})`}return C===u.length?"var(--color-neutral-300, #d2ccc2)":`var(--color-accent-${u[C%u.length]}, ${f[String(u[C%u.length])]})`}function m(C){return C>u.length?Math.max(.4,1-(C-u.length)*.15):void 0}let h=z(null);const y=A(()=>t.projects.reduce((C,k)=>C+k.total_minutes,0)),x=A(()=>{if(e(y)<=0||t.projects.length===0)return[];const C=t.projects.length>1?l:0;let k=0;return t.projects.map((T,q)=>{const ie=T.total_minutes/e(y),ne=Math.max(.6,ie*100-C),oe=(k+ie/2)/100*2*Math.PI-Math.PI/2,re=Math.cos(oe),ue={i:q,p:T,len:ne,offset:k,color:p(q),opacity:m(q),midRad:oe,lx:s+i*re,ly:s+i*Math.sin(oe),anchor:Math.abs(re)<.35?"middle":re>0?"start":"end"};return k+=ie*100,ue})}),S=A(()=>e(h)!==null?e(x)[e(h)]:null);var P=qe(),D=Ee(P);{var Y=C=>{var k=Bp(),T=o(k);M(()=>_(T,t.emptyText??e(n).stats.noProject)),g(C,k)},F=C=>{var k=Wp(),T=o(k);I(T,"viewBox","0 0 240 240");var q=o(T);I(q,"transform","rotate(-90 120 120)"),je(q,21,()=>e(x),re=>re.p.project_id,(re,ue)=>{var W=zp();I(W,"cx",s),I(W,"cy",s),I(W,"r",c);let E;M(()=>{I(W,"opacity",e(ue).opacity),I(W,"stroke-dasharray",`${e(ue).len??""} ${100-e(ue).len}`),I(W,"stroke-dashoffset",-e(ue).offset),E=At(W,"",E,{stroke:e(ue).color})}),wt("pointerenter",W,()=>v(h,e(ue).i,!0)),wt("pointerleave",W,()=>v(h,null)),g(re,W)});var ie=d(q);je(ie,17,()=>e(x),re=>re.p.project_id,(re,ue)=>{var W=Hp(),E=o(W);M(()=>{I(W,"x",e(ue).lx),I(W,"y",e(ue).ly),I(W,"text-anchor",e(ue).anchor),_(E,e(ue).p.project_name)}),g(re,W)});var ne=d(T,2);{var oe=re=>{var ue=Up();let W;var E=o(ue);M(()=>{W=At(ue,"",W,{left:e(S).lx/r*100+"%",top:e(S).ly/r*100+"%"}),_(E,`${e(S).p.project_name??""} · ${e(S).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),g(re,ue)};le(ne,re=>{e(S)&&re(oe)})}M(()=>I(T,"aria-label",e(n).stats.donutChartAria)),g(C,k)};le(D,C=>{e(x).length===0?C(Y):C(F,-1)})}g(a,P),ht()}var $p=j("<button> </button>"),Gp=j('<div class="error svelte-giv6a6" role="alert"> </div>'),Kp=j('<p class="loading svelte-giv6a6"> </p>'),Vp=j('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),Jp=j('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section></div>',1),Qp=j('<div class="stats-veil page-veil svelte-giv6a6"><div class="page svelte-giv6a6"><div class="dims svelte-giv6a6"></div> <!> <!></div></div>');function Xp(a,t){ft(t,!0);const n=A(gt);let r=z("week"),s=z(null),c=z(0),l=z(!0),i=z(null),u=0;const f=A(()=>ol(e(r))),p=A(()=>e(f).group),m=A(()=>e(p)==="day"?e(n).stats.byDay:e(p)==="week"?e(n).stats.byWeek:e(n).stats.byMonth),h=A(()=>({today:e(n).stats.dimToday,week:e(n).stats.dimWeek,month:e(n).stats.dimMonth,quarter:e(n).stats.dimQuarter,halfyear:e(n).stats.dimHalf,year:e(n).stats.dimYear})),y=A(()=>{var W;return((W=e(s))==null?void 0:W.summary.total_minutes)??0}),x=A(()=>{var W;return((W=e(s))==null?void 0:W.summary.total_sessions)??0}),S=A(()=>{var W;return((W=e(s))==null?void 0:W.summary.completed_tasks)??0}),P=A(()=>Math.round(e(y)/Math.max(1,e(f).days))),D=A(()=>{if(!e(s))return null;const W=e(s).trend;let E=0,U=0;for(const fe of W)fe.minutes>0?(U++,E=Math.max(E,U)):U=0;let Q={key:"",minutes:0,sessions:0};for(const fe of W)fe.minutes>Q.minutes&&(Q=fe);return{activeDays:W.filter(fe=>fe.minutes>0).length,longest:E,perPeriod:W.length>0?Math.round(e(y)/W.length):0,peak:Q,projects:[...e(s).projects].sort((fe,ye)=>ye.total_minutes-fe.total_minutes)}}),Y=A(()=>e(c)>0?Math.round((e(y)-e(c))/e(c)*100):e(y)>0?100:0),F=A(()=>`${e(Y)>=0?"+":""}${e(Y)}%`),C=A(()=>e(D)?e(D).projects:[]);Tt(()=>{const W=ol(e(r)),E=jp(e(r)),U=++u;v(s,null),v(c,0),v(i,null),v(l,!0);const Q=-new Date().getTimezoneOffset();Hi(W.start,W.end,W.group,Q).then(fe=>{U===u&&(v(s,fe,!0),v(l,!1))}).catch(fe=>{U===u&&(v(i,String(fe),!0),v(l,!1))}),Hi(E.start,E.end,W.group,Q).then(fe=>{U===u&&v(c,fe.summary.total_minutes,!0)}).catch(()=>{})});var k=Qp();Or("giv6a6",W=>{qr(()=>{nr.title=e(n).page.stats??""})});var T=o(k),q=o(T);je(q,21,()=>Mp,W=>W.key,(W,E)=>{var U=$p();let Q;var fe=o(U);M(()=>{Q=at(U,1,"dim-pill svelte-giv6a6",null,Q,{active:e(r)===e(E).key}),I(U,"aria-pressed",e(r)===e(E).key),_(fe,e(h)[e(E).key])}),G("click",U,()=>v(r,e(E).key,!0)),g(W,U)});var ie=d(q,2);{var ne=W=>{var E=Gp(),U=o(E);M(Q=>_(U,`⚠ ${Q??""}`),[()=>Nt(e(n).stats.loadError,{err:e(i)})]),g(W,E)};le(ie,W=>{e(i)&&W(ne)})}var oe=d(ie,2);{var re=W=>{var E=Kp(),U=o(E);M(()=>_(U,e(n).stats.loading)),g(W,E)},ue=W=>{var E=Jp(),U=Ee(E),Q=o(U);Wt(Q,{get icon(){return Qn},get label(){return e(n).stats.focusDuration},get value(){return e(y)},get unit(){return e(n).stats.unitMin},accent:!0});var fe=d(Q,2);Wt(fe,{get icon(){return Jo},get label(){return e(n).stats.sessions},get value(){return e(x)},get unit(){return e(n).stats.unitCount},accent:!0});var ye=d(fe,2);Wt(ye,{get icon(){return xo},get label(){return e(n).stats.completed},get value(){return e(S)},get unit(){return e(n).stats.unitCount},accent:!0});var te=d(ye,2);Wt(te,{get icon(){return Ys},get label(){return e(n).stats.avg},get value(){return e(P)},get unit(){return e(n).stats.unitMin},accent:!0});var de=d(U,2);{var ke=ve=>{var we=Vp(),Me=o(we);Wt(Me,{get icon(){return hc},get label(){return e(n).stats.activeDays},get value(){return e(D).activeDays},get unit(){return e(n).stats.unitDay},accent:!0});var Fe=d(Me,2);{var Oe=O=>{Wt(O,{get icon(){return hv},get label(){return e(n).stats.longestStreak},get value(){return e(D).longest},get unit(){return e(n).stats.unitDay},accent:!0})};le(Fe,O=>{(e(r)==="month"||e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&O(Oe)})}var We=d(Fe,2);{var Be=O=>{{let V=A(()=>e(p)==="week"?e(n).stats.avgWeek:e(n).stats.avgMonth);Wt(O,{get icon(){return Ys},get label(){return e(V)},get value(){return e(D).perPeriod},get unit(){return e(n).stats.unitMin},accent:!0})}};le(We,O=>{(e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&O(Be)})}var J=d(We,2);{var H=O=>{{let V=A(()=>e(p)==="month"?e(n).stats.peakMonth:e(n).stats.peakPeriod),K=A(()=>e(D).peak.key?Jc(e(D).peak.key,e(p)):"—"),ee=A(()=>e(D).peak.minutes?`${e(D).peak.minutes} ${e(n).stats.unitMin}`:"");Wt(O,{get icon(){return Ai},get label(){return e(V)},get value(){return e(K)},get unit(){return e(ee)},accent:!0})}};le(J,O=>{(e(r)==="halfyear"||e(r)==="year")&&O(H)})}var b=d(J,2);{var w=O=>{{let V=A(()=>`${e(D).projects[0].total_minutes} ${e(n).stats.unitMin}`);Wt(O,{get icon(){return Ai},get label(){return e(n).stats.bestProject},get value(){return e(D).projects[0].project_name},get unit(){return e(V)},accent:!0})}};le(b,O=>{(e(r)==="halfyear"||e(r)==="year")&&e(D).projects[0]&&O(w)})}var Z=d(b,2);Wt(Z,{get icon(){return Ys},get label(){return e(n).stats.momRatio},get value(){return e(F)},accent:!0}),g(ve,we)};le(de,ve=>{e(D)&&e(r)!=="today"&&ve(ke)})}var R=d(de,2);let $;var B=o(R),X=o(B),pe=o(X),ge=d(X,2);Op(ge,{get data(){return e(s).trend},get group(){return e(p)}});var he=d(B,2),_e=o(he),L=o(_e),se=d(_e,2);Yp(se,{get projects(){return e(C)}}),M(()=>{$=at(R,1,"charts svelte-giv6a6",null,$,{split:e(r)!=="month"}),_(pe,`${e(n).stats.trendTitle??""}（${e(m)??""}）`),_(L,e(n).stats.projectDist)}),g(W,E)};le(oe,W=>{e(l)?W(re):e(s)&&W(ue,1)})}g(a,k),ht()}kt(["click"]);var Zp=j('<button type="button" role="switch"><span class="knob svelte-1re5fgf"></span></button>');function vr(a,t){ft(t,!0);let n=ma(t,"disabled",3,!1);var r=Zp();let s;M(()=>{s=at(r,1,"switch svelte-1re5fgf",null,s,{on:t.checked}),I(r,"aria-checked",t.checked),I(r,"aria-label",t.label),r.disabled=n()}),G("click",r,()=>t.onChange(!t.checked)),g(a,r),ht()}kt(["click"]);async function eg(){return await Ce("plugin:autostart|is_enabled")}async function tg(){await Ce("plugin:autostart|enable")}async function ag(){await Ce("plugin:autostart|disable")}var Kr=j("<option> </option>"),ng=j('<div class="error svelte-90mmv5" role="alert"> </div>'),rg=j('<div><h2 class="tab-title svelte-90mmv5"> </h2> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <button type="button" class="action svelte-90mmv5"> </button></div></div> <p class="tray-hint svelte-90mmv5"> </p></section> <!></div>');function sg(a,t){ft(t,!0);const n=A(gt),r=A(Xa),s=[1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90],c=[2,3,4,5,6];function l(xe,st){return st.includes(xe)?st:[...st,xe].sort((yt,Gt)=>yt-Gt)}let i=z(!1),u=z(!1),f=z(0),p=z(null);async function m(){try{v(i,await eg(),!0)}catch(xe){console.warn("isEnabled failed",xe),v(i,!1)}try{const xe=await jn({status:"active"});v(f,xe.length,!0)}catch{}}Tt(()=>{m()}),Tt(()=>{e(r).focusDuration,e(r).shortBreakDuration,e(r).longBreakDuration,e(r).longBreakInterval,Uf()});function h(xe,st){Ri({[xe]:st})}function y(xe){xe&&e(r).autoStartBreak?Ri({disableBreak:!0,autoStartBreak:!1}):h("disableBreak",xe)}async function x(){if(!e(u)){v(u,!0),v(p,null);try{e(i)?(await ag(),v(i,!1)):(await tg(),v(i,!0))}catch(xe){v(p,Nt(e(n).settings.autostartFail,{err:String(xe)}),!0)}finally{v(u,!1)}}}async function S(){v(p,null);try{let xe=await js();if(xe||(xe=await Es()==="granted"),!xe){v(p,e(n).settings.notifPermDenied,!0);return}ni(e(n).settings.testNotifTitle,Nt(e(n).settings.testNotifBody,{n:e(f)}))}catch(xe){v(p,Nt(e(n).settings.notifSendFail,{err:String(xe)}),!0)}}var P=rg(),D=o(P),Y=o(D),F=d(D,2),C=o(F),k=o(C),T=d(C,2),q=o(T),ie=o(q),ne=o(ie),oe=d(ie,2);je(oe,20,()=>l(e(r).focusDuration,s),xe=>xe,(xe,st)=>{var yt=Kr(),Gt=o(yt),oa={};M(()=>{_(Gt,`${st??""}${e(n).settings.minute??""}`),oa!==(oa=st)&&(yt.value=(yt.__value=st)??"")}),g(xe,yt)});var re;Bt(oe);var ue=d(q,2),W=o(ue),E=o(W),U=d(W,2);je(U,20,()=>l(e(r).shortBreakDuration,s),xe=>xe,(xe,st)=>{var yt=Kr(),Gt=o(yt),oa={};M(()=>{_(Gt,`${st??""}${e(n).settings.minute??""}`),oa!==(oa=st)&&(yt.value=(yt.__value=st)??"")}),g(xe,yt)});var Q;Bt(U);var fe=d(ue,2),ye=o(fe),te=o(ye),de=d(ye,2);je(de,20,()=>l(e(r).longBreakDuration,s),xe=>xe,(xe,st)=>{var yt=Kr(),Gt=o(yt),oa={};M(()=>{_(Gt,`${st??""}${e(n).settings.minute??""}`),oa!==(oa=st)&&(yt.value=(yt.__value=st)??"")}),g(xe,yt)});var ke;Bt(de);var R=d(fe,2),$=o(R),B=o($),X=d($,2);je(X,20,()=>l(e(r).longBreakInterval,c),xe=>xe,(xe,st)=>{var yt=Kr(),Gt=o(yt),oa={};M(()=>{_(Gt,`${st??""}${e(n).settings.pomodoroUnit??""}`),oa!==(oa=st)&&(yt.value=(yt.__value=st)??"")}),g(xe,yt)});var pe;Bt(X);var ge=d(F,2),he=o(ge),_e=o(he),L=d(he,2),se=o(L),ve=o(se),we=o(ve),Me=o(we),Fe=d(we,2),Oe=o(Fe),We=d(ve,2);vr(We,{get checked(){return e(r).autoStartNextPomodoro},onChange:xe=>h("autoStartNextPomodoro",xe),get label(){return e(n).settings.autoStartNext}});var Be=d(se,2),J=o(Be),H=o(J),b=o(H),w=d(H,2),Z=o(w),O=d(J,2);vr(O,{get checked(){return e(r).autoStartBreak},onChange:xe=>h("autoStartBreak",xe),get label(){return e(n).settings.autoStartBreak}});var V=d(Be,2),K=o(V),ee=o(K),me=o(ee),be=d(ee,2),Ie=o(be),it=d(K,2);vr(it,{get checked(){return e(r).disableBreak},onChange:y,get label(){return e(n).settings.disableBreak}});var lt=d(ge,2),_t=o(lt),rt=o(_t),Ve=d(_t,2),ze=o(Ve),He=o(ze),Ne=o(He),Se=d(He,2);vr(Se,{get checked(){return e(r).desktopNotificationEnabled},onChange:xe=>h("desktopNotificationEnabled",xe),get label(){return e(n).settings.systemNotification}});var nt=d(ze,2),ct=o(nt),Dt=o(ct),zt=o(Dt),Vt=d(Dt,2),ua=o(Vt),tt=d(ct,2);vr(tt,{get checked(){return e(i)},onChange:x,get label(){return e(n).settings.autostart},get disabled(){return e(u)}});var mt=d(nt,2),pt=o(mt),Ct=o(pt),Pt=o(Ct),Ye=d(Ct,2),Ae=o(Ye),dt=d(pt,2),ae=o(dt),Te=d(Ve,2),Le=o(Te),Je=d(lt,2);{var St=xe=>{var st=ng(),yt=o(st);M(()=>_(yt,`⚠ ${e(p)??""}`)),g(xe,st)};le(Je,xe=>{e(p)&&xe(St)})}M(()=>{_(Y,e(n).settings.timerTitle),_(k,e(n).settings.durationSetting),_(ne,e(n).settings.focusDuration),re!==(re=e(r).focusDuration)&&(oe.value=(oe.__value=e(r).focusDuration)??"",It(oe,e(r).focusDuration)),_(E,e(n).settings.shortBreakDuration),Q!==(Q=e(r).shortBreakDuration)&&(U.value=(U.__value=e(r).shortBreakDuration)??"",It(U,e(r).shortBreakDuration)),_(te,e(n).settings.longBreakDuration),ke!==(ke=e(r).longBreakDuration)&&(de.value=(de.__value=e(r).longBreakDuration)??"",It(de,e(r).longBreakDuration)),_(B,e(n).settings.longBreakInterval),pe!==(pe=e(r).longBreakInterval)&&(X.value=(X.__value=e(r).longBreakInterval)??"",It(X,e(r).longBreakInterval)),_(_e,e(n).settings.behaviorSetting),_(Me,e(n).settings.autoStartNext),_(Oe,e(n).settings.autoStartNextDesc),_(b,e(n).settings.autoStartBreak),_(Z,e(n).settings.autoStartBreakDesc),_(me,e(n).settings.disableBreak),_(Ie,e(n).settings.disableBreakDesc),_(rt,e(n).settings.systemSection),_(Ne,e(n).settings.systemNotification),_(zt,e(n).settings.autostart),_(ua,e(n).settings.autostartHint),_(Pt,e(n).settings.notifTest),_(Ae,e(n).settings.notifTestHint),_(ae,e(n).settings.sendTest),_(Le,e(n).settings.trayHint)}),G("change",oe,xe=>h("focusDuration",Number(xe.currentTarget.value))),G("change",U,xe=>h("shortBreakDuration",Number(xe.currentTarget.value))),G("change",de,xe=>h("longBreakDuration",Number(xe.currentTarget.value))),G("change",X,xe=>h("longBreakInterval",Number(xe.currentTarget.value))),G("click",dt,S),g(a,P),ht()}kt(["change","click"]);const Fo=["#c97b6e","#d4945c","#d4a574","#b8a878","#7fa086","#6b9b8a","#5c8b84","#5c8fad","#7a8fb0","#8b7baf","#a68b78","#a8a298"],rn=Fo[0];var og=j('<div class="error svelte-1o455o6" role="alert"> </div>'),ig=j('<div class="add-root-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),lg=j('<button type="button" class="add-root-btn svelte-1o455o6"><!> </button>'),cg=j('<div class="edit-box svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),dg=j('<button type="button" class="chevron svelte-1o455o6"><!></button>'),ug=j('<span class="chevron-spacer svelte-1o455o6"></span>'),vg=j('<button type="button" class="icon-btn svelte-1o455o6"><!></button>'),fg=j('<div role="treeitem" tabindex="-1" aria-selected="false"><span><!> <span class="dot svelte-1o455o6"></span> <span class="name svelte-1o455o6"> </span></span> <span class="actions svelte-1o455o6"><!> <button type="button" class="icon-btn svelte-1o455o6"><!></button> <button type="button" class="icon-btn danger svelte-1o455o6"><!></button></span></div>'),hg=j('<div class="add-child-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),_g=j('<div class="row-wrap svelte-1o455o6"><!> <!></div>'),pg=j('<div class="empty svelte-1o455o6"> </div>'),gg=j('<div class="manager svelte-1o455o6"><h2 class="tab-title svelte-1o455o6"> </h2> <p class="drag-hint svelte-1o455o6"> </p> <!> <!> <div role="tree" tabindex="-1"><!> <!></div></div>');function mg(a,t){ft(t,!0);const n=A(gt);let r=z(Ue([])),s=z(Ue(new Set)),c=z("root"),l=z(""),i=z(null),u=z(""),f=z(Ue(rn)),p=z(null),m=z(null),h=z(null),y=z(!1);function x(){return new Date().toISOString()}async function S(){try{v(r,await ti(),!0)}catch{}}Qa(()=>{S()}),Tt(()=>{if(!e(p))return;const b=window.setTimeout(()=>v(p,null),3e3);return()=>window.clearTimeout(b)});function P(b){const w=new Map,Z=[];for(const K of b)w.set(K.id,{...K,children:[],depth:0});for(const K of b){const ee=w.get(K.id);ee&&(K.parent_id&&w.has(K.parent_id)?w.get(K.parent_id).children.push(ee):Z.push(ee))}const O=K=>{K.sort((ee,me)=>(ee.display_order??0)-(me.display_order??0)||(ee.created_at??"").localeCompare(me.created_at??"")||ee.id.localeCompare(me.id)),K.forEach(ee=>O(ee.children))};O(Z);const V=(K,ee)=>{for(const me of K)me.depth=ee,V(me.children,ee+1)};return V(Z,0),Z}function D(b,w){const Z=[];for(const O of b)Z.push(O),w.has(O.id)&&O.children.length>0&&Z.push(...D(O.children,w));return Z}const Y=A(()=>P(e(r))),F=A(()=>D(e(Y),e(s)));function C(b){const w=new Set(e(s));w.has(b)?w.delete(b):w.add(b),v(s,w,!0)}function k(){const b=new Map;for(const w of e(r))b.set(w.id,w.parent_id??null);return b}function T(){const b=new Map;for(const w of e(r)){const Z=w.parent_id??null;b.has(Z)||b.set(Z,[]),b.get(Z).push(w.id)}return b}function q(b,w){const Z=w.get(b)??[];return Z.length===0?1:1+Math.max(...Z.map(O=>q(O,w)))}function ie(b,w,Z){let O=b;const V=new Set;for(;O;){if(O===w)return!0;if(V.has(O))return!1;V.add(O),O=Z.get(O)??null}return!1}async function ne(){const b=e(l).trim();if(!b)return;const w=e(c)==="root"?null:e(c),Z=e(r).filter(O=>(O.parent_id??null)===w);try{await fs({id:crypto.randomUUID(),name:b,color:rn,parent_id:w,display_order:Z.length,created_at:x(),updated_at:x()})}catch(O){v(p,String(O),!0)}if(v(l,""),v(c,null),w){const O=new Set(e(s));O.add(w),v(s,O,!0)}await S()}function oe(b){v(i,b.id,!0),v(u,b.name,!0),v(f,b.color??rn,!0)}async function re(){if(!e(i))return;const b=e(u).trim();if(!b)return;const w=e(r).find(Z=>Z.id===e(i));if(w){try{await fs({...w,name:b,color:e(f),updated_at:x()})}catch(Z){v(p,String(Z),!0)}v(i,null),v(u,""),await S()}}async function ue(b){try{await jc(b)}catch(w){v(p,String(w),!0)}await S()}function W(b){return b.includes("exceed max depth")?e(n).settings.list.reorderFailDepth:b.includes("cycle")?e(n).settings.list.reorderFailCycle:e(n).settings.list.reorderFail}function E(b){return b.map(w=>({id:w.id,parent_id:w.parent_id??null,display_order:w.display_order??0}))}function U(b){const w=new Map;for(const O of b){const V=O.parent_id??null;w.has(V)||w.set(V,[]),w.get(V).push(O)}const Z=new Map;for(const O of w.values())O.slice().sort((V,K)=>(V.display_order??0)-(K.display_order??0)).forEach((V,K)=>Z.set(V.id,K));return b.map(O=>({...O,display_order:Z.get(O.id)??0}))}async function Q(b,w){if(!e(r).find(ee=>ee.id===b))return;const O=e(r).filter(ee=>(ee.parent_id??null)===w&&ee.id!==b).length,V=e(r).map(ee=>ee.id===b?{...ee,parent_id:w,display_order:O}:ee),K=U(V);if(v(r,K,!0),w){const ee=new Set(e(s));ee.add(w),v(s,ee,!0)}try{await Jv(E(K)),await S()}catch(ee){await S(),v(p,W(String(ee)),!0)}}function fe(b){const w=e(m);if(te(),!w||w===b.id)return;const Z=e(r).find(K=>K.id===w);if(!Z||(Z.parent_id??null)===b.id)return;const O=k();if(ie(b.id,w,O)){v(p,e(n).settings.list.reorderFailCycle,!0);return}const V=q(w,T());if(b.depth+V>2){v(p,e(n).settings.list.reorderFailDepth,!0);return}Q(w,b.id)}function ye(){const b=e(m);if(te(),!b)return;const w=e(r).find(Z=>Z.id===b);if(w){if((w.parent_id??null)===null){const Z=e(r).filter(O=>O.parent_id==null&&O.id!==b).length;if((w.display_order??0)===Z)return}Q(b,null)}}function te(){v(m,null),v(h,null),v(y,!1)}function de(b,w){b.dataTransfer&&(v(m,w.id,!0),b.dataTransfer.effectAllowed="move",b.dataTransfer.setData("text/plain",w.id))}function ke(b,w){e(m)&&(b.preventDefault(),b.stopPropagation(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),v(h,w.id,!0),v(y,!1))}function R(b,w){b.preventDefault(),b.stopPropagation(),fe(w)}function $(b){e(m)&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),v(y,!0),v(h,null))}function B(b){b.preventDefault(),ye()}function X(b){b.target===b.currentTarget&&v(y,!1)}var pe=gg(),ge=o(pe),he=o(ge),_e=d(ge,2),L=o(_e),se=d(_e,2);{var ve=b=>{var w=og(),Z=o(w);M(()=>_(Z,e(p))),g(b,w)};le(se,b=>{e(p)&&b(ve)})}var we=d(se,2);{var Me=b=>{var w=ig(),Z=o(w);kn(Z,!0),M(()=>I(Z,"placeholder",e(n).settings.list.addRootPlaceholder)),G("keydown",Z,O=>{O.key==="Enter"&&ne(),O.key==="Escape"&&(v(c,null),v(l,""))}),wt("blur",Z,()=>{e(l).trim()?ne():(v(c,null),v(l,""))}),bt(Z,()=>e(l),O=>v(l,O)),g(b,w)},Fe=b=>{var w=lg(),Z=o(w);Mn(Z,{size:16});var O=d(Z);M(()=>_(O,` ${e(n).settings.list.addRoot??""}`)),G("click",w,()=>{v(c,"root"),v(l,"")}),g(b,w)};le(we,b=>{e(c)==="root"?b(Me):b(Fe,-1)})}var Oe=d(we,2);let We;var Be=o(Oe);je(Be,17,()=>e(F),b=>b.id,(b,w)=>{const Z=A(()=>e(i)===e(w).id),O=A(()=>e(c)===e(w).id),V=A(()=>e(w).children.length>0),K=A(()=>e(s).has(e(w).id)),ee=A(()=>!e(Z)&&!e(O)&&e(w).depth>0);var me=_g(),be=o(me);{var Ie=rt=>{var Ve=cg(),ze=o(Ve);M(()=>I(ze,"placeholder",e(w).name)),G("keydown",ze,He=>{He.key==="Enter"&&re(),He.key==="Escape"&&(v(i,null),v(u,""))}),wt("blur",ze,()=>{e(i)===e(w).id&&re()}),bt(ze,()=>e(u),He=>v(u,He)),g(rt,Ve)},it=rt=>{var Ve=fg();let ze;var He=o(Ve);let Ne;var Se=o(He);{var nt=Ae=>{var dt=dg(),ae=o(dt);{var Te=Je=>{Vn(Je,{size:14})},Le=Je=>{Jn(Je,{size:14})};le(ae,Je=>{e(K)?Je(Te):Je(Le,-1)})}M(()=>I(dt,"aria-label",e(K)?e(n).common.expand:e(n).common.collapse)),G("click",dt,Je=>{Je.stopPropagation(),C(e(w).id)}),g(Ae,dt)},ct=Ae=>{var dt=ug();g(Ae,dt)};le(Se,Ae=>{e(V)?Ae(nt):Ae(ct,-1)})}var Dt=d(Se,2),zt=d(Dt,2),Vt=o(zt),ua=d(He,2),tt=o(ua);{var mt=Ae=>{var dt=vg(),ae=o(dt);Mn(ae,{size:14}),M(()=>{I(dt,"title",e(n).settings.list.addChild),I(dt,"aria-label",e(n).settings.list.addChild)}),G("click",dt,Te=>{Te.stopPropagation(),v(c,e(w).id,!0),v(l,"")}),g(Ae,dt)};le(tt,Ae=>{e(w).depth<2&&Ae(mt)})}var pt=d(tt,2),Ct=o(pt);Qo(Ct,{size:14});var Pt=d(pt,2),Ye=o(Pt);Br(Ye,{size:14}),M(()=>{ze=at(Ve,1,"row svelte-1o455o6",null,ze,{"drop-over":e(h)===e(w).id&&e(m)!==e(w).id,dragging:e(m)===e(w).id}),I(Ve,"draggable",e(ee)),Ne=at(He,1,"label svelte-1o455o6",null,Ne,{grabbable:e(ee)}),At(Dt,`background-color: ${e(w).color??rn??""}`),_(Vt,e(w).name),I(pt,"title",e(n).settings.list.edit),I(pt,"aria-label",e(n).settings.list.edit),I(Pt,"title",e(n).settings.list.del),I(Pt,"aria-label",e(n).settings.list.del)}),wt("dragstart",Ve,Ae=>de(Ae,e(w))),wt("dragover",Ve,Ae=>ke(Ae,e(w))),wt("drop",Ve,Ae=>R(Ae,e(w))),wt("dragend",Ve,te),G("click",pt,Ae=>{Ae.stopPropagation(),oe(e(w))}),G("click",Pt,Ae=>{Ae.stopPropagation(),ue(e(w).id)}),g(rt,Ve)};le(be,rt=>{e(Z)?rt(Ie):rt(it,-1)})}var lt=d(be,2);{var _t=rt=>{var Ve=hg(),ze=o(Ve);kn(ze,!0),M(()=>I(ze,"placeholder",e(w).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)),G("keydown",ze,He=>{He.key==="Enter"&&ne(),He.key==="Escape"&&(v(c,null),v(l,""))}),wt("blur",ze,()=>{e(l).trim()?ne():(v(c,null),v(l,""))}),bt(ze,()=>e(l),He=>v(l,He)),g(rt,Ve)};le(lt,rt=>{e(O)&&rt(_t)})}M(()=>At(me,`padding-left: ${e(w).depth*24}px`)),g(b,me)});var J=d(Be,2);{var H=b=>{var w=pg(),Z=o(w);M(()=>_(Z,e(n).settings.list.empty)),g(b,w)};le(J,b=>{e(r).length===0&&e(c)!=="root"&&b(H)})}M(()=>{_(he,e(n).settings.list.title),_(L,e(n).settings.list.dragHint),We=at(Oe,1,"tree svelte-1o455o6",null,We,{"over-root":e(y)})}),wt("dragover",Oe,$),wt("drop",Oe,B),wt("dragleave",Oe,X),g(a,pe),ht()}kt(["keydown","click"]);var il=j('<button type="button"></button>'),bg=j('<div class="error svelte-1hwdvdh" role="alert"> </div>'),yg=j('<div class="edit-box svelte-1hwdvdh"><div class="edit-name-row svelte-1hwdvdh"><span class="name-label svelte-1hwdvdh"> </span> <input type="text" class="text-input svelte-1hwdvdh"/></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div> <div class="edit-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <button type="button" class="save-btn svelte-1hwdvdh"> </button></div></div>'),kg=j('<div class="tag-row svelte-1hwdvdh"><div class="tag-row-main svelte-1hwdvdh"><span class="grip svelte-1hwdvdh"><!></span> <span class="dot svelte-1hwdvdh"></span> <span class="tag-name svelte-1hwdvdh"> </span></div> <div class="tag-row-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <span class="sep svelte-1hwdvdh">|</span> <button type="button" class="link-btn danger svelte-1hwdvdh"> </button></div></div>'),wg=j('<div role="listitem" tabindex="-1"><!></div>'),xg=j('<div class="empty svelte-1hwdvdh"> </div>'),Sg=j('<div><h2 class="tab-title svelte-1hwdvdh"> </h2> <div class="add-card svelte-1hwdvdh"><div class="add-row svelte-1hwdvdh"><input type="text" class="text-input svelte-1hwdvdh"/> <button type="button" class="add-btn svelte-1hwdvdh"> </button></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div></div> <!> <div class="tag-list svelte-1hwdvdh" role="list"></div> <!></div>');function Tg(a,t){ft(t,!0);const n=A(gt);let r=z(Ue([])),s=z(""),c=z(Ue(rn)),l=z(null),i=z(""),u=z(Ue(rn)),f=z(null),p=z(null),m=z(null);function h(){return new Date().toISOString()}async function y(){try{const B=await ai();v(r,[...B].sort((X,pe)=>(X.display_order??0)-(pe.display_order??0)||(X.created_at??"").localeCompare(pe.created_at??"")||X.id.localeCompare(pe.id)),!0)}catch{}}Qa(()=>{y()}),Tt(()=>{if(!e(f))return;const B=window.setTimeout(()=>v(f,null),3e3);return()=>window.clearTimeout(B)});function x(B,X,pe){const ge=B.slice(),[he]=ge.splice(X,1);return ge.splice(pe,0,he),ge}async function S(){const B=e(s).trim();if(B)try{await Bi({id:crypto.randomUUID(),name:B,color:e(c),display_order:e(r).length,created_at:h(),updated_at:h()}),v(s,""),await y()}catch(X){v(f,String(X),!0)}}async function P(B){try{await Qv(B),await y()}catch(X){v(f,String(X),!0)}}function D(B){v(l,B.id,!0),v(i,B.name,!0),v(u,B.color??rn,!0)}async function Y(){if(!e(l))return;const B=e(i).trim();if(!B)return;const X=e(r).find(pe=>pe.id===e(l));if(X){try{await Bi({...X,name:B,color:e(u),updated_at:h()})}catch(pe){v(f,String(pe),!0)}v(l,null),await y()}}function F(B,X){B.dataTransfer&&(v(p,X.id,!0),B.dataTransfer.effectAllowed="move",B.dataTransfer.setData("text/plain",X.id))}function C(B,X){!e(p)||e(p)===X.id||(B.preventDefault(),B.stopPropagation(),B.dataTransfer&&(B.dataTransfer.dropEffect="move"),v(m,X.id,!0))}function k(B,X){B.preventDefault(),B.stopPropagation();const pe=e(p);if(v(p,null),v(m,null),!pe||pe===X.id)return;const ge=e(r).findIndex(ve=>ve.id===pe),he=e(r).findIndex(ve=>ve.id===X.id);if(ge<0||he<0)return;const _e=e(r),L=x(e(r),ge,he);v(r,L,!0);const se=L.map((ve,we)=>({id:ve.id,display_order:we}));Xv(se).then(y).catch(async ve=>{v(r,_e,!0),await y(),v(f,String(ve)||e(n).settings.list.reorderFail,!0)})}function T(){v(p,null),v(m,null)}var q=Sg(),ie=o(q),ne=o(ie),oe=d(ie,2),re=o(oe),ue=o(re),W=d(ue,2),E=o(W),U=d(re,2),Q=o(U),fe=o(Q),ye=d(Q,2);je(ye,20,()=>Fo,B=>B,(B,X)=>{var pe=il();let ge;M(he=>{ge=at(pe,1,"swatch svelte-1hwdvdh",null,ge,{active:e(c)===X}),At(pe,`background-color: ${X??""}`),I(pe,"aria-label",he)},[()=>Nt(e(n).settings.tag.colorAria,{color:X})]),G("click",pe,()=>v(c,X,!0)),g(B,pe)});var te=d(oe,2);{var de=B=>{var X=bg(),pe=o(X);M(()=>_(pe,e(f))),g(B,X)};le(te,B=>{e(f)&&B(de)})}var ke=d(te,2);je(ke,21,()=>e(r),B=>B.id,(B,X)=>{const pe=A(()=>e(l)===e(X).id);var ge=wg();let he;var _e=o(ge);{var L=ve=>{var we=yg(),Me=o(we),Fe=o(Me),Oe=o(Fe),We=d(Fe,2);kn(We,!0);var Be=d(Me,2),J=o(Be),H=o(J),b=d(J,2);je(b,20,()=>Fo,ee=>ee,(ee,me)=>{var be=il();let Ie;M(it=>{Ie=at(be,1,"swatch sm svelte-1hwdvdh",null,Ie,{active:e(u)===me}),At(be,`background-color: ${me??""}`),I(be,"aria-label",it)},[()=>Nt(e(n).settings.tag.colorAria,{color:me})]),G("click",be,()=>v(u,me,!0)),g(ee,be)});var w=d(Be,2),Z=o(w),O=o(Z),V=d(Z,2),K=o(V);M(()=>{_(Oe,e(n).settings.tag.nameLabel),_(H,e(n).settings.tag.colorLabel),_(O,e(n).settings.repeatCustom.cancel),_(K,e(n).settings.notification.save)}),G("keydown",We,ee=>{ee.key==="Enter"&&Y(),ee.key==="Escape"&&v(l,null)}),bt(We,()=>e(i),ee=>v(i,ee)),G("click",Z,()=>v(l,null)),G("click",V,Y),g(ve,we)},se=ve=>{var we=kg(),Me=o(we),Fe=o(Me),Oe=o(Fe);pv(Oe,{size:16});var We=d(Fe,2),Be=d(We,2),J=o(Be),H=d(Me,2),b=o(H),w=o(b),Z=d(b,4),O=o(Z);M(()=>{I(Fe,"aria-label",e(n).settings.tag.dragHandle),I(Fe,"title",e(n).settings.tag.dragHandle),At(We,`background-color: ${e(X).color??rn??""}`),_(J,e(X).name),_(w,e(n).settings.list.edit),_(O,e(n).settings.list.del)}),G("click",b,()=>D(e(X))),G("click",Z,()=>void P(e(X).id)),g(ve,we)};le(_e,ve=>{e(pe)?ve(L):ve(se,-1)})}M(()=>{he=at(ge,1,"tag-card svelte-1hwdvdh",null,he,{dragging:e(p)===e(X).id,"drop-over":e(m)===e(X).id&&e(p)!==null&&e(p)!==e(X).id}),I(ge,"draggable",!e(pe))}),wt("dragstart",ge,ve=>F(ve,e(X))),wt("dragover",ge,ve=>C(ve,e(X))),wt("drop",ge,ve=>k(ve,e(X))),wt("dragend",ge,T),g(B,ge)});var R=d(ke,2);{var $=B=>{var X=xg(),pe=o(X);M(()=>_(pe,e(n).settings.tag.empty)),g(B,X)};le(R,B=>{e(r).length===0&&B($)})}M(()=>{_(ne,e(n).settings.tab.tags),I(ue,"placeholder",e(n).settings.tag.namePlaceholder),_(E,e(n).settings.tag.add),_(fe,e(n).settings.tag.colorLabel)}),G("keydown",ue,B=>{B.key==="Enter"&&S()}),bt(ue,()=>e(s),B=>v(s,B)),G("click",W,S),g(a,q),ht()}kt(["keydown","click"]);var ll=j('<span class="badge svelte-wf1h2h"><!></span>'),Dg=j('<button type="button"><!> <span class="card-name svelte-wf1h2h"> </span></button>'),Pg=j('<button type="button"><!> <span class="card-name corner svelte-wf1h2h"> </span></button>'),Mg=j('<p class="used svelte-wf1h2h"><!> </p>'),jg=j('<div class="thumb svelte-wf1h2h"></div> <span class="used svelte-wf1h2h"><!> </span> <button type="button" class="clear-btn svelte-wf1h2h"><!> </button>',1),Eg=j('<p class="fail svelte-wf1h2h" role="alert"> </p>'),Cg=j('<button type="button" class="reset-btn svelte-wf1h2h"><!> </button>'),Ng=j('<div class="setting svelte-wf1h2h"><h2 class="tab-title svelte-wf1h2h"> </h2> <p class="desc svelte-wf1h2h"> </p> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div> <p class="hint svelte-wf1h2h"> </p> <!></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="custom-row svelte-wf1h2h"><label class="upload-btn svelte-wf1h2h"><input type="file" accept="image/*" class="file-input svelte-wf1h2h"/> <!> </label> <!></div> <!> <p class="hint svelte-wf1h2h"> </p></section> <!></div>');function Fg(a,t){ft(t,!0);const n=A(gt),r=A(kh),s=A(wh);let c=z(!1);async function l(he){var ve;const _e=he.currentTarget,L=(ve=_e.files)==null?void 0:ve[0];if(!L)return;v(c,!1);const se=await Dh(L);se?Th(se):v(c,!0),_e.value=""}const i=A(()=>{var he;return((he=e(s))==null?void 0:he.kind)==="preset"?e(s).id:null}),u=A(()=>{var he;return((he=e(s))==null?void 0:he.kind)==="custom"}),f=A(()=>{var he;return e(r)==="default"&&((he=e(s))==null?void 0:he.kind)==="preset"&&e(s).id==="preset-bg-1"}),p=A(()=>{var he,_e;if(((he=e(s))==null?void 0:he.kind)==="preset"){const L=_s.find(se=>se.id===e(s).id);return L?`background-image: ${L.url}`:null}return((_e=e(s))==null?void 0:_e.kind)==="custom"?`background-image: ${e(s).url}`:null});var m=Ng(),h=o(m),y=o(h),x=d(h,2),S=o(x),P=d(x,2),D=o(P),Y=o(D),F=d(D,2);je(F,21,()=>Hc,he=>he.id,(he,_e)=>{const L=A(()=>e(r)===e(_e).id);var se=Dg();let ve;var we=o(se);{var Me=We=>{var Be=ll(),J=o(Be);Ya(J,{size:11,strokeWidth:3}),g(We,Be)};le(we,We=>{e(L)&&We(Me)})}var Fe=d(we,2),Oe=o(Fe);M(()=>{ve=at(se,1,"card svelte-wf1h2h",null,ve,{active:e(L)}),At(se,`background: ${e(_e).preview??""}`),I(se,"title",e(n).settings.theme.presetName[e(_e).id]),I(se,"aria-pressed",e(L)),_(Oe,e(n).settings.theme.presetName[e(_e).id])}),G("click",se,()=>xh(e(_e).id)),g(he,se)});var C=d(P,2),k=o(C),T=o(k),q=d(k,2);je(q,21,()=>_s,he=>he.id,(he,_e)=>{const L=A(()=>e(i)===e(_e).id);var se=Pg();let ve;var we=o(se);{var Me=We=>{var Be=ll(),J=o(Be);Ya(J,{size:11,strokeWidth:3}),g(We,Be)};le(we,We=>{e(L)&&We(Me)})}var Fe=d(we,2),Oe=o(Fe);M(()=>{ve=at(se,1,"card cover svelte-wf1h2h",null,ve,{active:e(L)}),At(se,`background-image: ${e(_e).url??""}`),I(se,"title",e(n).settings.theme.presetBgName[e(_e).id]),I(se,"aria-pressed",e(L)),_(Oe,e(n).settings.theme.presetBgName[e(_e).id])}),G("click",se,()=>Sh(e(_e).id)),g(he,se)});var ie=d(q,2),ne=o(ie),oe=d(ie,2);{var re=he=>{var _e=Mg(),L=o(_e);Ya(L,{size:13});var se=d(L);M(()=>_(se,` ${e(n).settings.theme.presetBgUsed??""}`)),g(he,_e)};le(oe,he=>{e(i)&&he(re)})}var ue=d(C,2),W=o(ue),E=o(W),U=d(W,2),Q=o(U),fe=o(Q),ye=d(fe,2);Nv(ye,{size:14});var te=d(ye),de=d(Q,2);{var ke=he=>{var _e=jg(),L=Ee(_e),se=d(L,2),ve=o(se);Ya(ve,{size:13});var we=d(ve),Me=d(se,2),Fe=o(Me);Zo(Fe,{size:12});var Oe=d(Fe);M(()=>{At(L,e(p)),I(L,"aria-label",e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed),_(we,` ${(e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed)??""}`),_(Oe,` ${e(n).settings.theme.clearBg??""}`)}),G("click",Me,function(...We){Qs==null||Qs.apply(this,We)}),g(he,_e)};le(de,he=>{e(s)&&e(p)&&he(ke)})}var R=d(U,2);{var $=he=>{var _e=Eg(),L=o(_e);M(()=>_(L,e(n).settings.theme.compressFail)),g(he,_e)};le(R,he=>{e(c)&&he($)})}var B=d(R,2),X=o(B),pe=d(ue,2);{var ge=he=>{var _e=Cg(),L=o(_e);xv(L,{size:12});var se=d(L);M(()=>_(se,` ${e(n).settings.theme.reset??""}`)),G("click",_e,function(...ve){Xs==null||Xs.apply(this,ve)}),g(he,_e)};le(pe,he=>{e(f)||he(ge)})}M(()=>{_(y,e(n).settings.theme.title),_(S,e(n).settings.theme.desc),_(Y,e(n).settings.theme.preset),_(T,e(n).settings.theme.presetBg),_(ne,e(n).settings.theme.presetBgHint),_(E,e(n).settings.theme.custom),_(te,` ${e(n).settings.theme.upload??""}`),_(X,e(n).settings.theme.customHint)}),G("change",fe,l),g(a,m),ht()}kt(["click","change"]);var Ag=j('<div class="error svelte-16699lq" role="alert"> </div>'),Ig=j('<div class="empty svelte-16699lq"> </div>'),qg=j('<div class="item svelte-16699lq"><div class="item-main svelte-16699lq"><div class="item-text svelte-16699lq"> </div> <div class="item-author svelte-16699lq"> </div></div> <button type="button" class="del-btn svelte-16699lq"><!></button></div>'),Rg=j('<div class="manager svelte-16699lq"><h2 class="tab-title svelte-16699lq"> </h2> <div class="add-card svelte-16699lq"><textarea class="textarea svelte-16699lq"></textarea> <div class="author-row svelte-16699lq"><input type="text" class="author-input svelte-16699lq"/> <button type="button" class="add-btn svelte-16699lq"><!> </button></div></div> <!> <div class="list svelte-16699lq"><!> <!></div></div>');function Lg(a,t){ft(t,!0);const n=A(gt),r=500,s=64;let c=z(Ue([])),l=z(""),i=z(""),u=z(null);function f(){return new Date().toISOString()}async function p(){try{v(c,await Ic(),!0)}catch{}}Qa(()=>{p()}),Tt(()=>{if(!e(u))return;const E=window.setTimeout(()=>v(u,null),3e3);return()=>window.clearTimeout(E)});function m(){const E=e(l).trim();return E.length<1?e(n).settings.motto.textRequired:E.length>r?e(n).settings.motto.textTooLong:e(i).trim().length>s?e(n).settings.motto.authorTooLong:null}async function h(){const E=m();if(E){v(u,E,!0);return}try{await df({id:crypto.randomUUID(),text:e(l).trim(),author:e(i).trim()||null,created_at:f(),updated_at:f()}),v(l,""),v(i,""),await p(),Ji()}catch(U){v(u,String(U),!0)}}async function y(E){try{await uf(E),await p(),Ji()}catch(U){v(u,String(U),!0)}}var x=Rg(),S=o(x),P=o(S),D=d(S,2),Y=o(D);I(Y,"rows",2);var F=d(Y,2),C=o(F),k=d(C,2),T=o(k);Mn(T,{size:14});var q=d(T),ie=d(D,2);{var ne=E=>{var U=Ag(),Q=o(U);M(()=>_(Q,e(u))),g(E,U)};le(ie,E=>{e(u)&&E(ne)})}var oe=d(ie,2),re=o(oe);{var ue=E=>{var U=Ig(),Q=o(U);M(()=>_(Q,e(n).settings.motto.empty)),g(E,U)};le(re,E=>{e(c).length===0&&E(ue)})}var W=d(re,2);je(W,17,()=>e(c),E=>E.id,(E,U)=>{var Q=qg(),fe=o(Q),ye=o(fe),te=o(ye),de=d(ye,2),ke=o(de),R=d(fe,2),$=o(R);Br($,{size:14}),M(B=>{_(te,e(U).text),_(ke,`—— ${B??""}`),I(R,"aria-label",e(n).settings.list.del)},[()=>{var B;return(B=e(U).author)!=null&&B.trim()?e(U).author:e(n).settings.motto.defaultAuthor}]),G("click",R,()=>void y(e(U).id)),g(E,Q)}),M(()=>{_(P,e(n).settings.motto.title),I(Y,"placeholder",e(n).settings.motto.addPlaceholder),I(C,"placeholder",e(n).settings.motto.authorPlaceholder),_(q,` ${e(n).settings.motto.addBtn??""}`)}),bt(Y,()=>e(l),E=>v(l,E)),G("keydown",C,E=>{E.key==="Enter"&&h()}),bt(C,()=>e(i),E=>v(i,E)),G("click",k,h),g(a,x),ht()}kt(["keydown","click"]);var Og=j("<option> </option>"),Bg=j('<div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style-desc"> </label> <input id="notif-style-desc" type="text" class="text-input svelte-s7babn"/></div>'),zg=j('<span class="saved svelte-s7babn"> </span>'),Hg=j('<span class="save-error svelte-s7babn" role="alert"> </span>'),Ug=j('<div class="setting svelte-s7babn"><h2 class="tab-title svelte-s7babn"> </h2> <div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style"> </label> <select id="notif-style" class="select svelte-s7babn"></select> <p class="hint svelte-s7babn"> </p></div> <!> <div class="fields svelte-s7babn"><section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-fe-title"> </label> <input id="ntf-fe-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-fe-body"> </label> <input id="ntf-fe-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-be-title"> </label> <input id="ntf-be-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-be-body"> </label> <input id="ntf-be-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-rm-title"> </label> <input id="ntf-rm-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-rm-body"> </label> <input id="ntf-rm-body" type="text" class="text-input svelte-s7babn"/> <p class="hint svelte-s7babn"> </p></section></div> <div class="save-row svelte-s7babn"><button type="button" class="save-btn svelte-s7babn"><!> </button> <!> <!></div></div>');function Wg(a,t){ft(t,!0);const n=A(gt),r=A(Ms);let s=z("default"),c=z(""),l=z(null),i=z(Ue({focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""})),u=z(!1),f=z(null);const p=A(()=>e(s)==="custom");Qa(()=>{qc().then(V=>{v(s,V.style||"default",!0),v(c,V.style_description||"",!0),v(l,V,!0)}).catch(()=>{})}),Tt(()=>{if(e(p))e(l)&&v(i,{focus_end_title:e(l).focus_end_title||"",focus_end_body:e(l).focus_end_body||"",break_end_title:e(l).break_end_title||"",break_end_body:e(l).break_end_body||"",reminder_title:e(l).reminder_title||"",reminder_body:e(l).reminder_body||""},!0);else{const V=(e(r)==="en"?Sc:xc)[e(s)];v(i,{focus_end_title:V.focus_end_title,focus_end_body:V.focus_end_body,break_end_title:V.break_end_title,break_end_body:V.break_end_body,reminder_title:V.reminder_title,reminder_body:V.reminder_body},!0)}});async function m(){v(f,null);const V={id:"1",style:e(s),style_description:e(p)?e(c):null,focus_end_title:e(i).focus_end_title,focus_end_body:e(i).focus_end_body,break_end_title:e(i).break_end_title,break_end_body:e(i).break_end_body,reminder_title:e(i).reminder_title,reminder_body:e(i).reminder_body};try{const K=await vf(V);v(l,K,!0),await Lc(),v(u,!0),window.setTimeout(()=>v(u,!1),2e3)}catch(K){v(f,String(K),!0)}}var h=Ug(),y=o(h),x=o(y),S=d(y,2),P=o(S),D=o(P),Y=d(P,2);je(Y,21,()=>$v,V=>V.key,(V,K)=>{var ee=Og(),me=o(ee),be={};M(()=>{_(me,e(n).settings.notification.styleName[e(K).key]),be!==(be=e(K).key)&&(ee.value=(ee.__value=e(K).key)??"")}),g(V,ee)});var F=d(Y,2),C=o(F),k=d(S,2);{var T=V=>{var K=Bg(),ee=o(K),me=o(ee),be=d(ee,2);M(()=>{_(me,e(n).settings.notification.styleDesc),I(be,"placeholder",e(n).settings.notification.styleDescPlaceholder)}),bt(be,()=>e(c),Ie=>v(c,Ie)),g(V,K)};le(k,V=>{e(p)&&V(T)})}var q=d(k,2),ie=o(q),ne=o(ie),oe=o(ne),re=d(ne,2),ue=o(re),W=d(re,2),E=d(W,2),U=o(E),Q=d(E,2),fe=d(ie,2),ye=o(fe),te=o(ye),de=d(ye,2),ke=o(de),R=d(de,2),$=d(R,2),B=o($),X=d($,2),pe=d(fe,2),ge=o(pe),he=o(ge),_e=d(ge,2),L=o(_e),se=d(_e,2),ve=d(se,2),we=o(ve),Me=d(ve,2),Fe=d(Me,2),Oe=o(Fe),We=d(q,2),Be=o(We),J=o(Be);Sv(J,{size:14});var H=d(J),b=d(Be,2);{var w=V=>{var K=zg(),ee=o(K);M(()=>_(ee,e(n).settings.notification.saved)),g(V,K)};le(b,V=>{e(u)&&V(w)})}var Z=d(b,2);{var O=V=>{var K=Hg(),ee=o(K);M(()=>_(ee,e(f))),g(V,K)};le(Z,V=>{e(f)&&V(O)})}M(()=>{_(x,e(n).settings.notification.title),_(D,e(n).settings.notification.styleLabel),_(C,e(p)?e(n).settings.notification.styleHintCustom:e(n).settings.notification.styleHintPreset),_(oe,e(n).settings.notification.focusEnd),_(ue,e(n).settings.notification.titleLabel),W.disabled=!e(p),_(U,e(n).settings.notification.bodyLabel),Q.disabled=!e(p),_(te,e(n).settings.notification.breakEnd),_(ke,e(n).settings.notification.titleLabel),R.disabled=!e(p),_(B,e(n).settings.notification.bodyLabel),X.disabled=!e(p),_(he,e(n).settings.notification.reminder),_(L,e(n).settings.notification.titleLabel),se.disabled=!e(p),_(we,e(n).settings.notification.bodyLabel),Me.disabled=!e(p),_(Oe,e(n).settings.notification.placeholderHint),_(H,` ${e(n).settings.notification.save??""}`)}),ds(Y,()=>e(s),V=>v(s,V)),bt(W,()=>e(i).focus_end_title,V=>e(i).focus_end_title=V),bt(Q,()=>e(i).focus_end_body,V=>e(i).focus_end_body=V),bt(R,()=>e(i).break_end_title,V=>e(i).break_end_title=V),bt(X,()=>e(i).break_end_body,V=>e(i).break_end_body=V),bt(se,()=>e(i).reminder_title,V=>e(i).reminder_title=V),bt(Me,()=>e(i).reminder_body,V=>e(i).reminder_body=V),G("click",Be,m),g(a,h),ht()}kt(["click"]);var Yg=j('<div class="result svelte-1v3jjul" role="status"> </div>'),$g=j('<div class="error svelte-1v3jjul" role="alert"> </div>'),Gg=j('<div><h2 class="tab-title svelte-1v3jjul"> </h2> <section class="group svelte-1v3jjul"><h3 class="group-title svelte-1v3jjul"> </h3> <div class="group-body svelte-1v3jjul"><div class="form-row svelte-1v3jjul"><span class="row-label svelte-1v3jjul"> </span> <input class="input svelte-1v3jjul" type="text" spellcheck="false"/></div> <div class="form-row svelte-1v3jjul"><span class="row-label svelte-1v3jjul"> </span> <input class="input svelte-1v3jjul" type="password" spellcheck="false" autocomplete="off"/></div> <div class="form-row svelte-1v3jjul"><span class="row-label svelte-1v3jjul"></span> <div class="actions svelte-1v3jjul"><button type="button" class="action svelte-1v3jjul"> </button> <button type="button" class="action primary svelte-1v3jjul"><!> </button></div></div></div></section> <section class="group svelte-1v3jjul"><h3 class="group-title svelte-1v3jjul"> </h3> <div class="group-body svelte-1v3jjul"><div class="form-row svelte-1v3jjul"><span class="row-label svelte-1v3jjul"> </span> <div class="id-cell svelte-1v3jjul"><code class="id-text svelte-1v3jjul"> </code> <button type="button" class="copy svelte-1v3jjul"> </button></div></div> <div class="form-row svelte-1v3jjul"><span class="row-label svelte-1v3jjul"> </span> <div class="id-cell svelte-1v3jjul"><code class="id-text svelte-1v3jjul"> </code> <button type="button" class="copy svelte-1v3jjul"> </button></div></div> <p class="hint svelte-1v3jjul"> </p></div></section> <!> <!></div>');function Kg(a,t){ft(t,!0);const n=A(gt);let r=z(""),s=z(""),c=z(null),l=z(!1),i=z(!1),u=z(""),f=z(null),p=z(null);Qa(async()=>{try{const[K,ee]=await Promise.all([_f(),gf()]);v(r,K.server_url??"",!0),v(s,K.token??"",!0),v(c,ee,!0)}catch(K){v(f,String(K),!0)}});async function m(){v(f,null),v(l,!1);try{await pf(e(r)||null,e(s)||null),v(l,!0),setTimeout(()=>v(l,!1),1500)}catch(K){v(f,String(K),!0)}}async function h(K,ee){try{await navigator.clipboard.writeText(K),v(p,ee,!0),setTimeout(()=>v(p,null),1200)}catch{}}async function y(){if(!e(i)){if(!e(r).trim()||!e(s).trim()){v(f,e(n).settings.sync.notConfigured,!0);return}v(i,!0),v(f,null),v(u,"");try{const K=await mf();v(u,Nt(e(n).settings.sync.result,{pushed:K.pushed,pulled:K.pulled,conflicts:K.conflicts,dropped:K.dropped}),!0)}catch(K){v(f,String(K),!0)}finally{v(i,!1)}}}var x=Gg(),S=o(x),P=o(S),D=d(S,2),Y=o(D),F=o(Y),C=d(Y,2),k=o(C),T=o(k),q=o(T),ie=d(T,2),ne=d(k,2),oe=o(ne),re=o(oe),ue=d(oe,2),W=d(ne,2),E=d(o(W),2),U=o(E),Q=o(U),fe=d(U,2),ye=o(fe);{let K=A(()=>e(i)?"spin":"");Xo(ye,{size:14,get class(){return e(K)}})}var te=d(ye),de=d(D,2),ke=o(de),R=o(ke),$=d(ke,2),B=o($),X=o(B),pe=o(X),ge=d(X,2),he=o(ge),_e=o(he),L=d(he,2),se=o(L),ve=d(B,2),we=o(ve),Me=o(we),Fe=d(we,2),Oe=o(Fe),We=o(Oe),Be=d(Oe,2),J=o(Be),H=d(ve,2),b=o(H),w=d(de,2);{var Z=K=>{var ee=Yg(),me=o(ee);M(()=>_(me,e(u))),g(K,ee)};le(w,K=>{e(u)&&K(Z)})}var O=d(w,2);{var V=K=>{var ee=$g(),me=o(ee);M(()=>_(me,`⚠ ${e(f)??""}`)),g(K,ee)};le(O,K=>{e(f)&&K(V)})}M(()=>{var K,ee;_(P,e(n).settings.sync.title),_(F,e(n).settings.sync.serverSection),_(q,e(n).settings.sync.serverUrl),I(ie,"placeholder",e(n).settings.sync.serverUrlPh),_(re,e(n).settings.sync.token),I(ue,"placeholder",e(n).settings.sync.tokenPh),_(Q,e(l)?e(n).settings.sync.saved:e(n).settings.sync.save),fe.disabled=e(i),_(te,` ${(e(i)?e(n).settings.sync.syncing:e(n).settings.sync.syncNow)??""}`),_(R,e(n).settings.sync.identitySection),_(pe,e(n).settings.sync.userId),_(_e,((K=e(c))==null?void 0:K.user_id)??"…"),_(se,e(p)==="user"?e(n).settings.sync.copied:e(n).settings.sync.copy),_(Me,e(n).settings.sync.deviceId),_(We,((ee=e(c))==null?void 0:ee.device_id)??"…"),_(J,e(p)==="device"?e(n).settings.sync.copied:e(n).settings.sync.copy),_(b,e(n).settings.sync.identityHint)}),bt(ie,()=>e(r),K=>v(r,K)),bt(ue,()=>e(s),K=>v(s,K)),G("click",U,()=>void m()),G("click",fe,()=>void y()),G("click",L,()=>e(c)&&void h(e(c).user_id,"user")),G("click",Be,()=>e(c)&&void h(e(c).device_id,"device")),g(a,x),ht()}kt(["click"]);var Vg=j('<span class="badge svelte-hb0yns"><!></span>'),Jg=j('<button type="button"><!> <span class="label svelte-hb0yns"> </span> <span class="sub svelte-hb0yns"> </span></button>'),Qg=j('<div><h2 class="tab-title svelte-hb0yns"> </h2> <p class="desc svelte-hb0yns"> </p> <div class="options svelte-hb0yns"></div></div>');function Xg(a,t){ft(t,!0);const n=A(gt),r=A(Ms),s=[{key:"zh",label:"中文",sub:"Chinese"},{key:"en",label:"English",sub:"英文"}];var c=Qg(),l=o(c),i=o(l),u=d(l,2),f=o(u),p=d(u,2);je(p,21,()=>s,m=>m.key,(m,h)=>{const y=A(()=>e(r)===e(h).key);var x=Jg();let S;var P=o(x);{var D=T=>{var q=Vg(),ie=o(q);Ya(ie,{size:16}),g(T,q)};le(P,T=>{e(y)&&T(D)})}var Y=d(P,2),F=o(Y),C=d(Y,2),k=o(C);M(()=>{S=at(x,1,"option svelte-hb0yns",null,S,{active:e(y)}),I(x,"aria-pressed",e(y)),_(F,e(h).label),_(k,e(h).sub)}),G("click",x,()=>Hv(e(h).key)),g(m,x)}),M(()=>{_(i,e(n).settings.language.title),_(f,e(n).settings.language.desc)}),g(a,c),ht()}kt(["click"]);var Zg=j('<span class="indicator svelte-uox1oc" aria-hidden="true"></span>'),em=j('<button type="button"><!> <!> </button>'),tm=j('<div class="account-placeholder svelte-uox1oc"><p class="svelte-uox1oc"> </p></div>'),am=j('<div class="settings-page page-veil svelte-uox1oc"><aside class="menu svelte-uox1oc"><nav class="menu-nav svelte-uox1oc"></nav></aside> <main class="content svelte-uox1oc"><div class="card svelte-uox1oc"><!></div></main></div>');function nm(a,t){ft(t,!0);const n=A(gt);let r=z("timer");const s=A(()=>[{key:"account",icon:Fv,label:e(n).settings.tab.account},{key:"timer",icon:Qn,label:e(n).settings.tab.timer},{key:"lists",icon:pc,label:e(n).settings.tab.lists},{key:"tags",icon:Cv,label:e(n).settings.tab.tags},{key:"theme",icon:yv,label:e(n).settings.tab.theme},{key:"motto",icon:gc,label:e(n).settings.tab.motto},{key:"notification",icon:fc,label:e(n).settings.tab.notification},{key:"sync",icon:Xo,label:e(n).settings.tab.sync},{key:"language",icon:gv,label:e(n).settings.tab.language}]);var c=am();Or("uox1oc",C=>{qr(()=>{nr.title=e(n).page.settings??""})});var l=o(c),i=o(l);je(i,21,()=>e(s),C=>C.key,(C,k)=>{const T=A(()=>e(r)===e(k).key);var q=em();let ie;var ne=o(q);{var oe=W=>{var E=Zg();g(W,E)};le(ne,W=>{e(T)&&W(oe)})}var re=d(ne,2);Lr(re,()=>e(k).icon,(W,E)=>{E(W,{size:16})});var ue=d(re);M(()=>{ie=at(q,1,"menu-item svelte-uox1oc",null,ie,{active:e(T)}),I(q,"aria-current",e(T)?"true":void 0),_(ue,` ${e(k).label??""}`)}),G("click",q,()=>v(r,e(k).key,!0)),g(C,q)});var u=d(l,2),f=o(u),p=o(f);{var m=C=>{var k=tm(),T=o(k),q=o(T);M(()=>_(q,e(n).settings.accountNotOpen)),g(C,k)},h=C=>{sg(C,{})},y=C=>{mg(C,{})},x=C=>{Tg(C,{})},S=C=>{Fg(C,{})},P=C=>{Lg(C,{})},D=C=>{Wg(C,{})},Y=C=>{Kg(C,{})},F=C=>{Xg(C,{})};le(p,C=>{e(r)==="account"?C(m):e(r)==="timer"?C(h,1):e(r)==="lists"?C(y,2):e(r)==="tags"?C(x,3):e(r)==="theme"?C(S,4):e(r)==="motto"?C(P,5):e(r)==="notification"?C(D,6):e(r)==="sync"?C(Y,7):e(r)==="language"&&C(F,8)})}g(a,c),ht()}kt(["click"]);var rm=j('<button type="button"><!> </button>'),sm=j('<br/> <span class="sub svelte-k6bk06"> </span>',1),om=j('<li class="svelte-k6bk06"> <!></li>'),im=j('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <ul class="svelte-k6bk06"></ul></section>'),lm=j('<div class="manual svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),cm=j('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p></section>'),dm=j('<div class="faq svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),um=j('<li class="svelte-k6bk06"> </li>'),vm=j('<div class="contact svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>522988349@qq.com</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>18688994926</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span> </span></div></div> <div class="feedback svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono svelte-k6bk06"> </div> <div class="hint svelte-k6bk06"> </div></div> <div><span class="lbl xs svelte-k6bk06"> </span> <ul class="body-items svelte-k6bk06"></ul></div> <div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono muted svelte-k6bk06"> </div></div></div></div></div>'),fm=j('<div class="help-page page-veil svelte-k6bk06"><aside class="menu svelte-k6bk06"><nav class="menu-nav"></nav></aside> <main class="content svelte-k6bk06"><div class="card svelte-k6bk06"><!></div></main></div>');function hm(a,t){ft(t,!0);const n=A(gt);let r=z("manual");const s=["timer","tasks","reminder","repeat","journal","stats","settings"];var c=fm();Or("k6bk06",x=>{qr(()=>{nr.title=`${e(n).nav.help??""} - PomoFlow`})});var l=o(c),i=o(l);je(i,21,()=>[{key:"manual",icon:iv},{key:"faq",icon:_c},{key:"contact",icon:bv}],x=>x.key,(x,S)=>{const P=A(()=>e(r)===e(S).key);var D=rm();let Y;var F=o(D);Lr(F,()=>e(S).icon,(k,T)=>{T(k,{size:16})});var C=d(F);M(()=>{Y=at(D,1,"menu-item svelte-k6bk06",null,Y,{active:e(P)}),I(D,"aria-current",e(P)?"true":void 0),_(C,` ${e(n).help.tab[e(S).key]??""}`)}),G("click",D,()=>v(r,e(S).key,!0)),g(x,D)});var u=d(l,2),f=o(u),p=o(f);{var m=x=>{var S=lm(),P=o(S),D=o(P),Y=d(P,2);je(Y,16,()=>s,F=>F,(F,C)=>{const k=A(()=>e(n).help.manual[C]);var T=im(),q=o(T),ie=o(q),ne=d(q,2);je(ne,21,()=>e(k).items,Oa,(oe,re)=>{const ue=A(()=>e(re));var W=om(),E=o(W),U=d(E);{var Q=fe=>{var ye=sm(),te=d(Ee(ye),2),de=o(te);M(()=>_(de,e(ue).sub)),g(fe,ye)};le(U,fe=>{e(ue).sub&&fe(Q)})}M(()=>_(E,`${e(ue).text??""} `)),g(oe,W)}),M(()=>_(ie,e(k).title)),g(F,T)}),M(()=>_(D,e(n).help.tab.manual)),g(x,S)},h=x=>{var S=dm(),P=o(S),D=o(P),Y=d(P,2);je(Y,17,()=>e(n).help.faq.items,Oa,(F,C)=>{var k=cm(),T=o(k),q=o(T),ie=d(T,2),ne=o(ie);M(()=>{_(q,`Q: ${e(C).q??""}`),_(ne,`A: ${e(C).a??""}`)}),g(F,k)}),M(()=>_(D,e(n).help.tab.faq)),g(x,S)},y=x=>{const S=A(()=>e(n).help.contact);var P=vm(),D=o(P),Y=o(D),F=d(D,2),C=o(F),k=d(F,2),T=o(k),q=o(T),ie=o(q),ne=d(T,2),oe=o(ne),re=o(oe),ue=d(ne,2),W=o(ue),E=o(W),U=d(W,2),Q=o(U),fe=d(k,2),ye=o(fe),te=o(ye),de=d(ye,2),ke=o(de),R=d(de,2),$=o(R),B=o($),X=o(B),pe=d(B,2),ge=o(pe),he=d(pe,2),_e=o(he),L=d($,2),se=o(L),ve=o(se),we=d(se,2);je(we,21,()=>e(S).bodyItems,Oa,(J,H)=>{var b=um(),w=o(b);M(()=>_(w,e(H))),g(J,b)});var Me=d(L,2),Fe=o(Me),Oe=o(Fe),We=d(Fe,2),Be=o(We);M(()=>{_(Y,e(n).help.tab.contact),_(C,e(S).intro),_(ie,e(S).emailLabel),_(re,e(S).phoneLabel),_(E,e(S).workHoursLabel),_(Q,e(S).workHours),_(te,e(S).feedbackTitle),_(ke,e(S).feedbackDesc),_(X,e(S).subjectLabel),_(ge,e(S).subjectFormat),_(_e,e(S).subjectHint),_(ve,e(S).bodyLabel),_(Oe,e(S).exampleLabel),_(Be,e(S).exampleText)}),g(x,P)};le(p,x=>{e(r)==="manual"?x(m):e(r)==="faq"?x(h,1):x(y,-1)})}g(a,c),ht()}kt(["click"]);var _m=j('<button><!> <span class="nav-label svelte-1n46o8q"> </span></button>'),pm=j('<main class="app app-bg svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true"><!></span> <h1 class="brand-name svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function gm(a,t){ft(t,!0);const n=A(gt);yh(),Tt(()=>{if(!ri().running)return;const C=setInterval(()=>Bf(),1e3);return()=>clearInterval(C)}),Qa(()=>{Lc(),document.addEventListener("visibilitychange",()=>{document.hidden||zf()}),$f(),nh(),(async()=>{try{const{isPermissionGranted:F,requestPermission:C}=await av(async()=>{const{isPermissionGranted:k,requestPermission:T}=await Promise.resolve().then(()=>Af);return{isPermissionGranted:k,requestPermission:T}},void 0);await F()||await C()}catch{}})()});const r=A(qv),s={timer:Qn,tasks:pc,stats:Jo,settings:Dv,help:_c};var c=pm(),l=o(c),i=o(l),u=o(i),f=o(u);Wc(f,{size:26});var p=d(i,2);je(p,21,()=>Rv,F=>F.path,(F,C)=>{const k=A(()=>s[e(C).labelKey]);var T=_m();let q;var ie=o(T);Lr(ie,()=>e(k),(re,ue)=>{ue(re,{size:18})});var ne=d(ie,2),oe=o(ne);M(()=>{q=at(T,1,"nav-item svelte-1n46o8q",null,q,{active:e(r)===e(C).path}),I(T,"title",e(n).nav[e(C).labelKey]),I(T,"aria-current",e(r)===e(C).path?"page":void 0),_(oe,e(n).nav[e(C).labelKey])}),G("click",T,()=>bc(e(C).path)),g(F,T)});var m=d(l,2),h=o(m);{var y=F=>{Zi(F,{})},x=F=>{Pp(F,{})},S=F=>{Xp(F,{})},P=F=>{nm(F,{})},D=F=>{hm(F,{})},Y=F=>{Zi(F,{})};le(h,F=>{e(r)==="/timer"?F(y):e(r)==="/tasks"?F(x,1):e(r)==="/stats"?F(S,2):e(r)==="/settings"?F(P,3):e(r)==="/help"?F(D,4):F(Y,-1)})}M(()=>I(p,"aria-label",e(n).nav.mainNav)),g(a,c),ht()}kt(["click"]);ju(gm,{target:document.getElementById("app")});
