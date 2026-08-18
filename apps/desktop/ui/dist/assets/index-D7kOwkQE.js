var ad=Object.defineProperty;var _i=a=>{throw TypeError(a)};var nd=(a,t,n)=>t in a?ad(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;var aa=(a,t,n)=>nd(a,typeof t!="symbol"?t+"":t,n),Lo=(a,t,n)=>t.has(a)||_i("Cannot "+n);var N=(a,t,n)=>(Lo(a,t,"read from private field"),n?n.call(a):t.get(a)),Ze=(a,t,n)=>t.has(a)?_i("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,n),et=(a,t,n,r)=>(Lo(a,t,"write to private field"),r?r.call(a,n):t.set(a,n),n),vt=(a,t,n)=>(Lo(a,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const ul=!1;var qs=Array.isArray,rd=Array.prototype.indexOf,ro=Array.prototype.includes,To=Array.from,od=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,vl=Object.getOwnPropertyDescriptors,sd=Object.prototype,id=Array.prototype,Rs=Object.getPrototypeOf,pi=Object.isExtensible;function sr(a){return typeof a=="function"}const ld=()=>{};function cd(a){return a()}function os(a){for(var t=0;t<a.length;t++)a[t]()}function fl(){var a,t,n=new Promise((r,o)=>{a=r,t=o});return{promise:n,resolve:a,reject:t}}function hl(a,t){if(Array.isArray(a))return a;if(!(Symbol.iterator in a))return Array.from(a);const n=[];for(const r of a)if(n.push(r),n.length===t)break;return n}const Ut=2,Sn=4,Nr=8,Ls=1<<24,Pa=16,ya=32,Ya=64,ss=128,ba=512,Ot=1024,Lt=2048,Ea=4096,ea=8192,da=16384,Zn=32768,is=1<<25,on=65536,oo=1<<17,_l=1<<18,er=1<<19,pl=1<<20,ja=1<<25,Dn=65536,so=1<<21,In=1<<22,rn=1<<23,Ia=Symbol("$state"),gl=Symbol("legacy props"),dd=Symbol(""),Vr=Symbol("attributes"),ls=Symbol("class"),cs=Symbol("style"),fr=Symbol("text"),Jr=Symbol("form reset"),jr=new class extends Error{constructor(){super(...arguments);aa(this,"name","StaleReactionError");aa(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var ll;const So=!!((ll=globalThis.document)!=null&&ll.contentType)&&globalThis.document.contentType.includes("xml");function ud(a){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function vd(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function fd(a,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function hd(a){throw new Error("https://svelte.dev/e/effect_in_teardown")}function _d(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function pd(a){throw new Error("https://svelte.dev/e/effect_orphan")}function gd(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function md(a){throw new Error("https://svelte.dev/e/props_invalid_value")}function bd(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function yd(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function kd(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function wd(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const xd=1,Td=2,ml=4,Sd=8,Dd=16,Pd=1,Md=2,bl=4,Ed=8,Cd=16,yl=1,Nd=2,Rt=Symbol("uninitialized"),kl="http://www.w3.org/1999/xhtml",jd="http://www.w3.org/2000/svg",Fd="@attach";function Ad(){console.warn("https://svelte.dev/e/derived_inert")}function Id(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function qd(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function wl(a){return a===this.v}function Rd(a,t){return a!=a?t==t:a!==t||a!==null&&typeof a=="object"||typeof a=="function"}function xl(a){return!Rd(a,this.v)}let tr=!1,Ld=!1;function Od(){tr=!0}let Ct=null;function Wn(a){Ct=a}function _t(a,t=!1,n){Ct={p:Ct,i:!1,c:null,e:null,s:a,x:null,r:st,l:tr&&!t?{s:null,u:null,$:[]}:null}}function pt(a){var t=Ct,n=t.e;if(n!==null){t.e=null;for(var r of n)Yl(r)}return t.i=!0,Ct=t.p,{}}function Fr(){return!tr||Ct!==null&&Ct.l===null}let fn=[];function Tl(){var a=fn;fn=[],os(a)}function Fa(a){if(fn.length===0&&!br){var t=fn;queueMicrotask(()=>{t===fn&&Tl()})}fn.push(a)}function Bd(){for(;fn.length>0;)Tl()}function Sl(a){var t=st;if(t===null)return ut.f|=rn,a;if((t.f&Zn)===0&&(t.f&Sn)===0)throw a;tn(a,t)}function tn(a,t){if(!(t!==null&&(t.f&da)!==0)){for(;t!==null;){if((t.f&ss)!==0){if((t.f&Zn)===0)throw a;try{t.b.error(a);return}catch(n){a=n}}t=t.parent}throw a}}const zd=-7169;function jt(a,t){a.f=a.f&zd|t}function Os(a){(a.f&ba)!==0||a.deps===null?jt(a,Ot):jt(a,Ea)}function Dl(a){if(a!==null)for(const t of a)(t.f&Ut)===0||(t.f&Dn)===0||(t.f^=Dn,Dl(t.deps))}function Pl(a,t,n){(a.f&Lt)!==0?t.add(a):(a.f&Ea)!==0&&n.add(a),Dl(a.deps),jt(a,Ot)}let Yr=!1;function Hd(a){var t=Yr;try{return Yr=!1,[a(),Yr]}finally{Yr=t}}function kn(a,t){if(t){const n=document.body;a.autofocus=!0,Fa(()=>{document.activeElement===n&&a.focus()})}}let gi=!1;function Ud(){gi||(gi=!0,document.addEventListener("reset",a=>{Promise.resolve().then(()=>{var t;if(!a.defaultPrevented)for(const n of a.target.elements)(t=n[Jr])==null||t.call(n)})},{capture:!0}))}function ar(a){var t=ut,n=st;ka(null),wa(null);try{return a()}finally{ka(t),wa(n)}}function Ml(a,t,n,r=n){a.addEventListener(t,()=>ar(n));const o=a[Jr];o?a[Jr]=()=>{o(),r(!0)}:a[Jr]=()=>r(!0),Ud()}function Wd(a){let t=0,n=sn(0),r;return()=>{Ys()&&(e(n),$s(()=>(t===0&&(r=Wt(()=>a(()=>yr(n)))),t+=1,()=>{Fa(()=>{t-=1,t===0&&(r==null||r(),r=void 0,yr(n))})})))}}var Yd=on|er;function $d(a,t,n,r){new Gd(a,t,n,r)}var _a,Is,pa,pn,na,ga,Xt,la,Oa,gn,Xa,qn,Sr,Dr,Ba,bo,Et,Kd,Vd,ds,Jd,us,Qr,Xr,vs,fs;class Gd{constructor(t,n,r,o){Ze(this,Et);aa(this,"parent");aa(this,"is_pending",!1);aa(this,"transform_error");Ze(this,_a);Ze(this,Is,null);Ze(this,pa);Ze(this,pn);Ze(this,na);Ze(this,ga,null);Ze(this,Xt,null);Ze(this,la,null);Ze(this,Oa,null);Ze(this,gn,0);Ze(this,Xa,0);Ze(this,qn,!1);Ze(this,Sr,new Set);Ze(this,Dr,new Set);Ze(this,Ba,null);Ze(this,bo,Wd(()=>(et(this,Ba,sn(N(this,gn))),()=>{et(this,Ba,null)})));var c;et(this,_a,t),et(this,pa,n),et(this,pn,l=>{var i=st;i.b=this,i.f|=ss,r(l)}),this.parent=st.b,this.transform_error=o??((c=this.parent)==null?void 0:c.transform_error)??(l=>l),et(this,na,rr(()=>{vt(this,Et,us).call(this)},Yd))}defer_effect(t){Pl(t,N(this,Sr),N(this,Dr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!N(this,pa).pending}update_pending_count(t,n){vt(this,Et,vs).call(this,t,n),et(this,gn,N(this,gn)+t),!(!N(this,Ba)||N(this,qn))&&(et(this,qn,!0),Fa(()=>{et(this,qn,!1),N(this,Ba)&&$n(N(this,Ba),N(this,gn))}))}get_effect_pending(){return N(this,bo).call(this),e(N(this,Ba))}error(t){if(!N(this,pa).onerror&&!N(this,pa).failed)throw t;Re!=null&&Re.is_fork?(N(this,ga)&&Re.skip_effect(N(this,ga)),N(this,Xt)&&Re.skip_effect(N(this,Xt)),N(this,la)&&Re.skip_effect(N(this,la)),Re.oncommit(()=>{vt(this,Et,fs).call(this,t)})):vt(this,Et,fs).call(this,t)}}_a=new WeakMap,Is=new WeakMap,pa=new WeakMap,pn=new WeakMap,na=new WeakMap,ga=new WeakMap,Xt=new WeakMap,la=new WeakMap,Oa=new WeakMap,gn=new WeakMap,Xa=new WeakMap,qn=new WeakMap,Sr=new WeakMap,Dr=new WeakMap,Ba=new WeakMap,bo=new WeakMap,Et=new WeakSet,Kd=function(){try{et(this,ga,Zt(()=>N(this,pn).call(this,N(this,_a))))}catch(t){this.error(t)}},Vd=function(t){const n=N(this,pa).failed,{reset:r,invoke_onerror:o}=vt(this,Et,ds).call(this,t);Fa(o),n&&et(this,la,Zt(()=>{n(N(this,_a),()=>t,()=>r)}))},ds=function(t){var n=!1,r=!1;const o=()=>{if(n){qd();return}n=!0,r&&wd(),N(this,la)!==null&&xn(N(this,la),()=>{et(this,la,null)}),vt(this,Et,Xr).call(this,()=>{vt(this,Et,us).call(this)})};return{reset:o,invoke_onerror:()=>{var l,i;try{r=!0,(i=(l=N(this,pa)).onerror)==null||i.call(l,t,o),r=!1}catch(u){tn(u,N(this,na)&&N(this,na).parent)}}}},Jd=function(){const t=N(this,pa).pending;t&&(this.is_pending=!0,et(this,Xt,Zt(()=>t(N(this,_a)))),Fa(()=>{var n=et(this,Oa,document.createDocumentFragment()),r=qa();n.append(r),et(this,ga,vt(this,Et,Xr).call(this,()=>Zt(()=>N(this,pn).call(this,r)))),N(this,Xa)===0&&(N(this,_a).before(n),et(this,Oa,null),xn(N(this,Xt),()=>{et(this,Xt,null)}),vt(this,Et,Qr).call(this,Re))}))},us=function(){try{if(this.is_pending=this.has_pending_snippet(),et(this,Xa,0),et(this,gn,0),et(this,ga,Zt(()=>{N(this,pn).call(this,N(this,_a))})),N(this,Xa)>0){var t=et(this,Oa,document.createDocumentFragment());Ks(N(this,ga),t);const n=N(this,pa).pending;et(this,Xt,Zt(()=>n(N(this,_a))))}else vt(this,Et,Qr).call(this,Re)}catch(n){this.error(n)}},Qr=function(t){this.is_pending=!1,t.transfer_effects(N(this,Sr),N(this,Dr))},Xr=function(t){var n=st,r=ut,o=Ct;wa(N(this,na)),ka(N(this,na)),Wn(N(this,na).ctx);try{return Pn.ensure(),t()}catch(c){return Sl(c),null}finally{wa(n),ka(r),Wn(o)}},vs=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&vt(r=this.parent,Et,vs).call(r,t,n);return}et(this,Xa,N(this,Xa)+t),N(this,Xa)===0&&(vt(this,Et,Qr).call(this,n),N(this,Xt)&&xn(N(this,Xt),()=>{et(this,Xt,null)}),N(this,Oa)&&(N(this,_a).before(N(this,Oa)),et(this,Oa,null)))},fs=function(t){N(this,ga)&&(Gt(N(this,ga)),et(this,ga,null)),N(this,Xt)&&(Gt(N(this,Xt)),et(this,Xt,null)),N(this,la)&&(Gt(N(this,la)),et(this,la,null));let n=N(this,pa).failed;const r=o=>{const{reset:c,invoke_onerror:l}=vt(this,Et,ds).call(this,o);l(),n&&et(this,la,vt(this,Et,Xr).call(this,()=>{try{return Zt(()=>{var i=st;i.b=this,i.f|=ss,n(N(this,_a),()=>o,()=>c)})}catch(i){return tn(i,N(this,na).parent),null}}))};Fa(()=>{var o;try{o=this.transform_error(t)}catch(c){tn(c,N(this,na)&&N(this,na).parent);return}o!==null&&typeof o=="object"&&typeof o.then=="function"?o.then(r,c=>tn(c,N(this,na)&&N(this,na).parent)):r(o)})};function Bs(a,t,n,r){const o=Fr()?Yn:zs;var c=a.filter(y=>!y.settled),l=t.map(o);if(n.length===0&&c.length===0){r(l);return}var i=st,u=Qd(),v=c.length===1?c[0].promise:c.length>1?Promise.all(c.map(y=>y.promise)):null;function _(y){if((i.f&da)===0){u();try{r([...l,...y])}catch(x){tn(x,i)}io()}}var m=El();if(n.length===0){v.then(()=>_([])).finally(m);return}function h(){Promise.all(n.map(y=>Xd(y))).then(_).catch(y=>tn(y,i)).finally(m)}v?v.then(()=>{u(),h(),io()}):h()}function Qd(){var a=st,t=ut,n=Ct,r=Re;return function(c=!0){wa(a),ka(t),Wn(n),c&&(a.f&da)===0&&(r==null||r.activate(),r==null||r.apply())}}function io(a=!0){wa(null),ka(null),Wn(null),a&&(Re==null||Re.deactivate())}function El(){var a=st,t=a.b,n=Re,r=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(r,a),()=>{t==null||t.update_pending_count(-1,n),n.decrement(r,a)}}function Yn(a){var t=Ut|Lt;return st!==null&&(st.f|=er),{ctx:Ct,deps:null,effects:null,equals:wl,f:t,fn:a,reactions:null,rv:0,v:Rt,wv:0,parent:st,ac:null}}const hr=Symbol("obsolete");function Xd(a,t,n){let r=st;r===null&&vd();var o=void 0,c=sn(Rt),l=!ut,i=new Set;return fu(()=>{var y,x;var u=st,v=fl();o=v.promise;try{Promise.resolve(a()).then(v.resolve,S=>{S!==jr&&v.reject(S)}).finally(io)}catch(S){v.reject(S),io()}var _=Re;if(l){if((u.f&Zn)!==0)var m=El();if((y=r.b)!=null&&y.is_rendered())(x=_.async_deriveds.get(u))==null||x.reject(hr);else for(const S of i.values())S.reject(hr);i.add(v),_.async_deriveds.set(u,v)}const h=(S,M=void 0)=>{m==null||m(),i.delete(v),M!==hr&&(_.activate(),M?(c.f|=rn,$n(c,M)):((c.f&rn)!==0&&(c.f^=rn),$n(c,S)),_.deactivate())};v.promise.then(h,S=>h(null,S||"unknown"))}),Do(()=>{for(const u of i)u.reject(hr)}),new Promise(u=>{function v(_){function m(){_===o?u(c):v(o)}_.then(m,m)}v(o)})}function F(a){const t=Yn(a);return Ql(t),t}function zs(a){const t=Yn(a);return t.equals=xl,t}function Zd(a){var t=a.effects;if(t!==null){a.effects=null;for(var n=0;n<t.length;n+=1)Gt(t[n])}}function Hs(a){var t,n=st,r=a.parent;if(!$a&&r!==null&&a.v!==Rt&&(r.f&(da|ea))!==0)return Ad(),a.v;wa(r);try{a.f&=~Dn,Zd(a),t=tc(a)}finally{wa(n)}return t}function Cl(a){var t=Hs(a);if(!a.equals(t)&&(a.wv=Zl(),(!(Re!=null&&Re.is_fork)||a.deps===null)&&(Re!==null?(Re.capture(a,t,!0),mr==null||mr.capture(a,t,!0)):a.v=t,a.deps===null))){jt(a,Ot);return}$a||($t!==null?(Ys()||Re!=null&&Re.is_fork)&&$t.set(a,t):Os(a))}function eu(a){var t;if(a.effects!==null)for(const n of a.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&ar(()=>{n.ac.abort(jr),n.ac=null}),n.fn!==null&&(n.teardown=ld),xr(n,0),Gs(n))}function Nl(a){if(a.effects!==null)for(const t of a.effects)t.teardown&&t.fn!==null&&Gn(t)}let Oo=null,Nn=null,Re=null,mr=null,$t=null,hs=null,br=!1,Bo=!1,An=null,Zr=null;var mi=0;let tu=1;var Rn,Za,mn,Ln,On,Bn,za,zn,ra,Pr,Ha,Sa,Ca,Hn,bn,wt,_s,_r,ps,jl,Fl,Fn,au,pr;const yo=class yo{constructor(){Ze(this,wt);aa(this,"id",tu++);Ze(this,Rn,!1);aa(this,"linked",!0);Ze(this,Za,null);Ze(this,mn,null);aa(this,"async_deriveds",new Map);aa(this,"current",new Map);aa(this,"previous",new Map);Ze(this,Ln,new Set);Ze(this,On,new Set);Ze(this,Bn,0);Ze(this,za,new Map);Ze(this,zn,null);Ze(this,ra,[]);Ze(this,Pr,[]);Ze(this,Ha,new Set);Ze(this,Sa,new Set);Ze(this,Ca,new Map);Ze(this,Hn,new Set);aa(this,"is_fork",!1);Ze(this,bn,!1);Nn===null?Oo=Nn=this:(et(Nn,mn,this),et(this,Za,Nn)),Nn=this}skip_effect(t){N(this,Ca).has(t)||N(this,Ca).set(t,{d:[],m:[]}),N(this,Hn).delete(t)}unskip_effect(t,n=r=>this.schedule(r)){var r=N(this,Ca).get(t);if(r){N(this,Ca).delete(t);for(var o of r.d)jt(o,Lt),n(o);for(o of r.m)jt(o,Ea),n(o)}N(this,Hn).add(t)}capture(t,n,r=!1){t.v!==Rt&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&rn)===0&&(this.current.set(t,[n,r]),$t==null||$t.set(t,n)),this.is_fork||(t.v=n)}activate(){Re=this}deactivate(){Re=null,$t=null}flush(){try{Bo=!0,Re=this,vt(this,wt,_r).call(this)}finally{mi=0,hs=null,An=null,Zr=null,Bo=!1,Re=null,$t=null,wn.clear()}}discard(){var t;for(const n of N(this,On))n(this);N(this,On).clear();for(const n of this.async_deriveds.values())n.reject(hr);vt(this,wt,pr).call(this),(t=N(this,zn))==null||t.resolve()}register_created_effect(t){N(this,Pr).push(t)}increment(t,n){if(et(this,Bn,N(this,Bn)+1),t){let r=N(this,za).get(n)??0;N(this,za).set(n,r+1)}}decrement(t,n){if(et(this,Bn,N(this,Bn)-1),t){let r=N(this,za).get(n)??0;r===1?N(this,za).delete(n):N(this,za).set(n,r-1)}N(this,bn)||(et(this,bn,!0),Fa(()=>{et(this,bn,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const r of t)N(this,Ha).add(r);for(const r of n)N(this,Sa).add(r);t.clear(),n.clear()}oncommit(t){N(this,Ln).add(t)}ondiscard(t){N(this,On).add(t)}settled(){return(N(this,zn)??et(this,zn,fl())).promise}static ensure(){if(Re===null){const t=Re=new yo;!Bo&&!br&&Fa(()=>{N(t,Rn)||t.flush()})}return Re}apply(){{$t=null;return}}schedule(t){var o;if(hs=t,(o=t.b)!=null&&o.is_pending&&(t.f&(Sn|Nr|Ls))!==0&&(t.f&Zn)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(An!==null&&n===st&&(ut===null||(ut.f&Ut)===0))return;if((r&(Ya|ya))!==0){if((r&Ot)===0)return;n.f^=Ot}}N(this,ra).push(n)}};Rn=new WeakMap,Za=new WeakMap,mn=new WeakMap,Ln=new WeakMap,On=new WeakMap,Bn=new WeakMap,za=new WeakMap,zn=new WeakMap,ra=new WeakMap,Pr=new WeakMap,Ha=new WeakMap,Sa=new WeakMap,Ca=new WeakMap,Hn=new WeakMap,bn=new WeakMap,wt=new WeakSet,_s=function(){if(this.is_fork)return!0;for(const r of N(this,za).keys()){for(var t=r,n=!1;t.parent!==null;){if(N(this,Ca).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},_r=function(){var u,v,_,m;et(this,Rn,!0),mi++>1e3&&(vt(this,wt,pr).call(this),ru());for(const h of N(this,Ha))N(this,Sa).delete(h),jt(h,Lt),this.schedule(h);for(const h of N(this,Sa))jt(h,Ea),this.schedule(h);const t=N(this,ra);et(this,ra,[]),this.apply();var n=An=[],r=[],o=Zr=[];for(const h of t)try{vt(this,wt,ps).call(this,h,n,r)}catch(y){throw ql(h),vt(this,wt,_s).call(this)||this.discard(),y}if(Re=null,o.length>0){var c=yo.ensure();for(const h of o)c.schedule(h)}if(An=null,Zr=null,vt(this,wt,_s).call(this)){vt(this,wt,Fn).call(this,r),vt(this,wt,Fn).call(this,n);for(const[h,y]of N(this,Ca))Il(h,y);o.length>0&&vt(u=Re,wt,_r).call(u);return}const l=vt(this,wt,jl).call(this);if(l){vt(this,wt,Fn).call(this,r),vt(this,wt,Fn).call(this,n),vt(v=l,wt,Fl).call(v,this);return}N(this,Ha).clear(),N(this,Sa).clear();for(const h of N(this,Ln))h(this);N(this,Ln).clear(),mr=this,bi(r),bi(n),mr=null,(_=N(this,zn))==null||_.resolve();var i=Re;if(N(this,Bn)===0&&(N(this,ra).length===0||i!==null)&&vt(this,wt,pr).call(this),N(this,ra).length>0)if(i!==null){const h=i;N(h,ra).push(...N(this,ra).filter(y=>!N(h,ra).includes(y)))}else i=this;i!==null&&vt(m=i,wt,_r).call(m)},ps=function(t,n,r){t.f^=Ot;for(var o=t.first;o!==null;){var c=o.f,l=(c&(ya|Ya))!==0,i=l&&(c&Ot)!==0,u=i||(c&ea)!==0||N(this,Ca).has(o);if(!u&&o.fn!==null){l?o.f^=Ot:(c&Sn)!==0?n.push(o):Rr(o)&&((c&Pa)!==0&&N(this,Sa).add(o),Gn(o));var v=o.first;if(v!==null){o=v;continue}}for(;o!==null;){var _=o.next;if(_!==null){o=_;break}o=o.parent}}},jl=function(){for(var t=N(this,Za);t!==null;){if(!t.is_fork){for(const[n,[,r]]of this.current)if(t.current.has(n)&&!r)return t}t=N(t,Za)}return null},Fl=function(t){var r;for(const[o,c]of t.current)!this.previous.has(o)&&t.previous.has(o)&&this.previous.set(o,t.previous.get(o)),this.current.set(o,c);for(const[o,c]of t.async_deriveds){const l=this.async_deriveds.get(o);l&&c.promise.then(l.resolve).catch(l.reject)}t.async_deriveds.clear(),this.transfer_effects(N(t,Ha),N(t,Sa));const n=o=>{var c=o.reactions;if(c!==null&&!((o.f&Ut)!==0&&(o.f&(Lt|Ea))===0))for(const u of c){var l=u.f;if((l&Ut)!==0)n(u);else{var i=u;l&(In|Pa)&&!this.async_deriveds.has(i)&&(N(this,Sa).delete(i),jt(i,Lt),this.schedule(i))}}};for(const o of this.current.keys())n(o);this.oncommit(()=>t.discard()),vt(r=t,wt,pr).call(r),Re=this,vt(this,wt,_r).call(this)},Fn=function(t){for(var n=0;n<t.length;n+=1)Pl(t[n],N(this,Ha),N(this,Sa))},au=function(){var m;for(let h=Oo;h!==null;h=N(h,mn)){var t=h.id<this.id,n=[];for(const[y,[x,S]]of this.current){if(h.current.has(y)){var r=h.current.get(y)[0];if(t&&x!==r)h.current.set(y,[x,S]);else continue}n.push(y)}if(t)for(const[y,x]of this.async_deriveds){const S=h.async_deriveds.get(y);S&&x.promise.then(S.resolve).catch(S.reject)}var o=[...h.current.keys()].filter(y=>!h.current.get(y)[1]);if(!(!N(h,Rn)||o.length===0)){var c=o.filter(y=>!this.current.has(y));if(c.length===0)t&&h.discard();else if(n.length>0){if(t)for(const y of N(this,Hn))h.unskip_effect(y,x=>{var S;(x.f&(Pa|In))!==0?h.schedule(x):vt(S=h,wt,Fn).call(S,[x])});h.activate();var l=new Set,i=new Map;for(var u of n)Al(u,c,l,i);i=new Map;var v=[...h.current].filter(([y,x])=>{const S=this.current.get(y);return S?S[0]!==x[0]||S[1]!==x[1]:!0}).map(([y])=>y);if(v.length>0)for(const y of N(this,Pr))(y.f&(da|ea|oo))===0&&Us(y,v,i)&&((y.f&(In|Pa))!==0?(jt(y,Lt),h.schedule(y)):N(h,Ha).add(y));if(N(h,ra).length>0&&!N(h,bn)){h.apply();for(var _ of N(h,ra))vt(m=h,wt,ps).call(m,_,[],[]);et(h,ra,[])}h.deactivate()}}}},pr=function(){if(this.linked){var t=N(this,Za),n=N(this,mn);t===null?Oo=n:et(t,mn,n),n===null?Nn=t:et(n,Za,t),this.linked=!1}};let Pn=yo;function nu(a){var t=br;br=!0;try{for(var n;;){if(Bd(),Re===null)return n;Re.flush()}}finally{br=t}}function ru(){try{gd()}catch(a){tn(a,hs)}}let Ta=null;function bi(a){var t=a.length;if(t!==0){for(var n=0;n<t;){var r=a[n++];if((r.f&(da|ea))===0&&Rr(r)&&(Ta=new Set,Gn(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&Kl(r),(Ta==null?void 0:Ta.size)>0)){wn.clear();for(const o of Ta){if((o.f&(da|ea))!==0)continue;const c=[o];let l=o.parent;for(;l!==null;)Ta.has(l)&&(Ta.delete(l),c.push(l)),l=l.parent;for(let i=c.length-1;i>=0;i--){const u=c[i];(u.f&(da|ea))===0&&Gn(u)}}Ta.clear()}}Ta=null}}function Al(a,t,n,r){if(!n.has(a)&&(n.add(a),a.reactions!==null))for(const o of a.reactions){const c=o.f;(c&Ut)!==0?Al(o,t,n,r):(c&(In|Pa))!==0&&(c&Lt)===0&&Us(o,t,r)&&(jt(o,Lt),Ws(o))}}function Us(a,t,n){const r=n.get(a);if(r!==void 0)return r;if(a.deps!==null)for(const o of a.deps){if(ro.call(t,o))return!0;if((o.f&Ut)!==0&&Us(o,t,n))return n.set(o,!0),!0}return n.set(a,!1),!1}function Ws(a){Re.schedule(a)}function Il(a,t){if(!((a.f&ya)!==0&&(a.f&Ot)!==0)){(a.f&Lt)!==0?t.d.push(a):(a.f&Ea)!==0&&t.m.push(a),jt(a,Ot);for(var n=a.first;n!==null;)Il(n,t),n=n.next}}function ql(a){jt(a,Ot);for(var t=a.first;t!==null;)ql(t),t=t.next}let lo=new Set;const wn=new Map;let Rl=!1;function sn(a,t){var n={f:0,v:a,reactions:null,equals:wl,rv:0,wv:0};return n}function H(a,t){const n=sn(a);return Ql(n),n}function ou(a,t=!1,n=!0){var o;const r=sn(a);return t||(r.equals=xl),tr&&n&&Ct!==null&&Ct.l!==null&&((o=Ct.l).s??(o.s=[])).push(r),r}function f(a,t,n=!1){ut!==null&&(!Ma||(ut.f&oo)!==0)&&Fr()&&(ut.f&(Ut|Pa|In|oo))!==0&&(Ra===null||!Ra.has(a))&&kd();let r=n?ze(t):t;return $n(a,r,Zr)}function $n(a,t,n=null){if(!a.equals(t)){wn.set(a,$a?t:a.v);var r=Pn.ensure();if(r.capture(a,t),(a.f&Ut)!==0){const o=a;(a.f&Lt)!==0&&Hs(o),$t===null&&Os(o)}a.wv=Zl(),Ll(a,Lt,n),Fr()&&st!==null&&(st.f&Ot)!==0&&(st.f&(ya|Ya))===0&&(ha===null?pu([a]):ha.push(a)),!r.is_fork&&lo.size>0&&!Rl&&su()}return t}function su(){Rl=!1;for(const a of lo){(a.f&Ot)!==0&&jt(a,Ea);let t;try{t=Rr(a)}catch{t=!0}t&&Gn(a)}lo.clear()}function yi(a,t=1){var n=e(a),r=t===1?n++:n--;return f(a,n),r}function yr(a){f(a,a.v+1)}function Ll(a,t,n){var r=a.reactions;if(r!==null)for(var o=Fr(),c=r.length,l=0;l<c;l++){var i=r[l],u=i.f;if(!(!o&&i===st)){var v=(u&Lt)===0;if(v&&jt(i,t),(u&oo)!==0)lo.add(i);else if((u&Ut)!==0){var _=i;$t==null||$t.delete(_),(u&Dn)===0&&(u&ba&&(st===null||(st.f&so)===0)&&(i.f|=Dn),Ll(_,Ea,n))}else if(v){var m=i;(u&Pa)!==0&&Ta!==null&&Ta.add(m),n!==null?n.push(m):Ws(m)}}}}function ze(a){if(typeof a!="object"||a===null||Ia in a)return a;const t=Rs(a);if(t!==sd&&t!==id)return a;var n=new Map,r=qs(a),o=H(0),c=Tn,l=i=>{if(Tn===c)return i();var u=ut,v=Tn;ka(null),xi(c);var _=i();return ka(u),xi(v),_};return r&&n.set("length",H(a.length)),new Proxy(a,{defineProperty(i,u,v){(!("value"in v)||v.configurable===!1||v.enumerable===!1||v.writable===!1)&&bd();var _=n.get(u);return _===void 0?l(()=>{var m=H(v.value);return n.set(u,m),m}):f(_,v.value,!0),!0},deleteProperty(i,u){var v=n.get(u);if(v===void 0){if(u in i){const _=l(()=>H(Rt));n.set(u,_),yr(o)}}else f(v,Rt),yr(o);return!0},get(i,u,v){var y;if(u===Ia)return a;var _=n.get(u),m=u in i;if(_===void 0&&(!m||(y=nn(i,u))!=null&&y.writable)&&(_=l(()=>{var x=ze(m?i[u]:Rt),S=H(x);return S}),n.set(u,_)),_!==void 0){var h=e(_);return h===Rt?void 0:h}return Reflect.get(i,u,v)},getOwnPropertyDescriptor(i,u){var v=Reflect.getOwnPropertyDescriptor(i,u);if(v&&"value"in v){var _=n.get(u);_&&(v.value=e(_))}else if(v===void 0){var m=n.get(u),h=m==null?void 0:m.v;if(m!==void 0&&h!==Rt)return{enumerable:!0,configurable:!0,value:h,writable:!0}}return v},has(i,u){var h;if(u===Ia)return!0;var v=n.get(u),_=v!==void 0&&v.v!==Rt||Reflect.has(i,u);if(v!==void 0||st!==null&&(!_||(h=nn(i,u))!=null&&h.writable)){v===void 0&&(v=l(()=>{var y=_?ze(i[u]):Rt,x=H(y);return x}),n.set(u,v));var m=e(v);if(m===Rt)return!1}return _},set(i,u,v,_){var T;var m=n.get(u),h=u in i;if(r&&u==="length")for(var y=v;y<m.v;y+=1){var x=n.get(y+"");x!==void 0?f(x,Rt):y in i&&(x=l(()=>H(Rt)),n.set(y+"",x))}if(m===void 0)(!h||(T=nn(i,u))!=null&&T.writable)&&(m=l(()=>H(void 0)),f(m,ze(v)),n.set(u,m));else{h=m.v!==Rt;var S=l(()=>ze(v));f(m,S)}var M=Reflect.getOwnPropertyDescriptor(i,u);if(M!=null&&M.set&&M.set.call(_,v),!h){if(r&&typeof u=="string"){var P=n.get("length"),Y=Number(u);Number.isInteger(Y)&&Y>=P.v&&f(P,Y+1)}yr(o)}return!0},ownKeys(i){e(o);var u=Reflect.ownKeys(i).filter(m=>{var h=n.get(m);return h===void 0||h.v!==Rt});for(var[v,_]of n)_.v!==Rt&&!(v in i)&&u.push(v);return u},setPrototypeOf(){yd()}})}function ki(a){try{if(a!==null&&typeof a=="object"&&Ia in a)return a[Ia]}catch{}return a}function iu(a,t){return Object.is(ki(a),ki(t))}var gs,nr,Ol,Bl,zl;function lu(){if(gs===void 0){gs=window,nr=document,Ol=/Firefox/.test(navigator.userAgent);var a=Element.prototype,t=Node.prototype,n=Text.prototype;Bl=nn(t,"firstChild").get,zl=nn(t,"nextSibling").get,pi(a)&&(a[ls]=void 0,a[Vr]=null,a[cs]=void 0,a.__e=void 0),pi(n)&&(n[fr]=void 0)}}function qa(a=""){return document.createTextNode(a)}function Ua(a){return Bl.call(a)}function Ar(a){return zl.call(a)}function s(a,t){return Ua(a)}function Ee(a,t=!1){{var n=Ua(a);return n instanceof Comment&&n.data===""?Ar(n):n}}function d(a,t=1,n=!1){let r=a;for(;t--;)r=Ar(r);return r}function cu(a){a.textContent=""}function Hl(){return!1}function Ul(a,t,n){return t==null||t===kl?n?document.createElement(a,{is:n}):document.createElement(a):n?document.createElementNS(t,a,{is:n}):document.createElementNS(t,a)}function Wl(a){st===null&&(ut===null&&pd(),_d()),$a&&hd()}function du(a,t){var n=t.last;n===null?t.last=t.first=a:(n.next=a,a.prev=n,t.last=a)}function xa(a,t){var n=st;n!==null&&(n.f&ea)!==0&&(a|=ea);var r={ctx:Ct,deps:null,nodes:null,f:a|Lt|ba,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};Re==null||Re.register_created_effect(r);var o=r;if((a&Sn)!==0)An!==null?An.push(r):Pn.ensure().schedule(r);else if(t!==null){try{Gn(r)}catch(l){throw Gt(r),l}o.deps===null&&o.teardown===null&&o.nodes===null&&o.first===o.last&&(o.f&er)===0&&(o=o.first,(a&Pa)!==0&&(a&on)!==0&&o!==null&&(o.f|=on))}if(o!==null&&(o.parent=n,n!==null&&du(o,n),ut!==null&&(ut.f&Ut)!==0&&(a&Ya)===0)){var c=ut;(c.effects??(c.effects=[])).push(o)}return r}function Ys(){return ut!==null&&!Ma}function Do(a){const t=xa(Nr,null);return jt(t,Ot),t.teardown=a,t}function St(a){Wl();var t=st.f,n=!ut&&(t&ya)!==0&&Ct!==null&&!Ct.i;if(n){var r=Ct;(r.e??(r.e=[])).push(a)}else return Yl(a)}function Yl(a){return xa(Sn|pl,a)}function uu(a){return Wl(),xa(Nr|pl,a)}function vu(a){Pn.ensure();const t=xa(Ya|er,a);return(n={})=>new Promise(r=>{n.outro?xn(t,()=>{Gt(t),r(void 0)}):(Gt(t),r(void 0))})}function Ir(a){return xa(Sn,a)}function fu(a){return xa(In|er,a)}function $s(a,t=0){return xa(Nr|t,a)}function E(a,t=[],n=[],r=[]){Bs(r,t,n,o=>{xa(Nr,()=>{a(...o.map(e))})})}function qr(a,t=[],n=[],r=[]){Bs(r,t,n,o=>{xa(Sn,()=>a(...o.map(e)))})}function rr(a,t=0){var n=xa(Pa|t,a);return n}function $l(a,t=0){var n=xa(Ls|t,a);return n}function Zt(a){return xa(ya|er,a)}function Gl(a){var t=a.teardown;if(t!==null){const n=$a,r=ut;wi(!0),ka(null);try{t.call(null)}finally{wi(n),ka(r)}}}function Gs(a,t=!1){var n=a.first;for(a.first=a.last=null;n!==null;){const o=n.ac;o!==null&&ar(()=>{o.abort(jr)});var r=n.next;(n.f&Ya)!==0?n.parent=null:Gt(n,t),n=r}}function hu(a){for(var t=a.first;t!==null;){var n=t.next;(t.f&ya)===0&&Gt(t),t=n}}function Gt(a,t=!0){var n=!1;(t||(a.f&_l)!==0)&&a.nodes!==null&&a.nodes.end!==null&&(_u(a.nodes.start,a.nodes.end),n=!0),a.f|=is,Gs(a,t&&!n),xr(a,0);var r=a.nodes&&a.nodes.t;if(r!==null)for(const c of r)c.stop();Gl(a),a.f^=is,a.f|=da;var o=a.parent;o!==null&&o.first!==null&&Kl(a),a.next=a.prev=a.teardown=a.ctx=a.deps=a.fn=a.nodes=a.ac=a.b=null}function _u(a,t){for(;a!==null;){var n=a===t?null:Ar(a);a.remove(),a=n}}function Kl(a){var t=a.parent,n=a.prev,r=a.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===a&&(t.first=r),t.last===a&&(t.last=n))}function xn(a,t,n=!0){var r=[];Vl(a,r,!0);var o=()=>{n&&Gt(a),t&&t()},c=r.length;if(c>0){var l=()=>--c||o();for(var i of r)i.out(l)}else o()}function Vl(a,t,n){if((a.f&ea)===0){a.f^=ea;var r=a.nodes&&a.nodes.t;if(r!==null)for(const i of r)(i.is_global||n)&&t.push(i);for(var o=a.first;o!==null;){var c=o.next;if((o.f&Ya)===0){var l=(o.f&on)!==0||(o.f&ya)!==0&&(a.f&Pa)!==0;Vl(o,t,l?n:!1)}o=c}}}function co(a){Jl(a,!0)}function Jl(a,t){if((a.f&ea)!==0){a.f^=ea,(a.f&Ot)===0&&(jt(a,Lt),Pn.ensure().schedule(a));for(var n=a.first;n!==null;){var r=n.next,o=(n.f&on)!==0||(n.f&ya)!==0;Jl(n,o?t:!1),n=r}var c=a.nodes&&a.nodes.t;if(c!==null)for(const l of c)(l.is_global||t)&&l.in()}}function Ks(a,t){if(a.nodes)for(var n=a.nodes.start,r=a.nodes.end;n!==null;){var o=n===r?null:Ar(n);t.append(n),n=o}}let eo=!1,$a=!1;function wi(a){$a=a}let ut=null,Ma=!1;function ka(a){ut=a}let st=null;function wa(a){st=a}let Ra=null;function Ql(a){ut!==null&&(Ra??(Ra=new Set)).add(a)}let oa=null,ia=0,ha=null;function pu(a){ha=a}let Xl=1,hn=0,Tn=hn;function xi(a){Tn=a}function Zl(){return++Xl}function Rr(a){var t=a.f;if((t&Lt)!==0)return!0;if(t&Ut&&(a.f&=~Dn),(t&Ea)!==0){for(var n=a.deps,r=n.length,o=0;o<r;o++){var c=n[o];if(Rr(c)&&Cl(c),c.wv>a.wv)return!0}(t&ba)!==0&&$t===null&&jt(a,Ot)}return!1}function ec(a,t,n=!0){var r=a.reactions;if(r!==null&&!(Ra!==null&&Ra.has(a)))for(var o=0;o<r.length;o++){var c=r[o];(c.f&Ut)!==0?ec(c,t,!1):t===c&&(n?jt(c,Lt):(c.f&Ot)!==0&&jt(c,Ea),Ws(c))}}function tc(a){var S;var t=oa,n=ia,r=ha,o=ut,c=Ra,l=Ct,i=Ma,u=Tn,v=a.f;oa=null,ia=0,ha=null,ut=(v&(ya|Ya))===0?a:null,Ra=null,Wn(a.ctx),Ma=!1,Tn=++hn,a.ac!==null&&(ar(()=>{a.ac.abort(jr)}),a.ac=null);try{a.f|=so;var _=a.fn,m=_();a.f|=Zn;var h=a.deps,y=Re==null?void 0:Re.is_fork;if(oa!==null){var x;if(y||xr(a,ia),h!==null&&ia>0)for(h.length=ia+oa.length,x=0;x<oa.length;x++)h[ia+x]=oa[x];else a.deps=h=oa;if(Ys()&&(a.f&ba)!==0)for(x=ia;x<h.length;x++)((S=h[x]).reactions??(S.reactions=[])).push(a)}else!y&&h!==null&&ia<h.length&&(xr(a,ia),h.length=ia);if(Fr()&&ha!==null&&!Ma&&h!==null&&(a.f&(Ut|Ea|Lt))===0)for(x=0;x<ha.length;x++)ec(ha[x],a);if(o!==null&&o!==a){if(hn++,o.deps!==null)for(let M=0;M<n;M+=1)o.deps[M].rv=hn;if(t!==null)for(const M of t)M.rv=hn;ha!==null&&(r===null?r=ha:r.push(...ha))}return(a.f&rn)!==0&&(a.f^=rn),m}catch(M){return Sl(M)}finally{a.f^=so,oa=t,ia=n,ha=r,ut=o,Ra=c,Wn(l),Ma=i,Tn=u}}function gu(a,t){let n=t.reactions;if(n!==null){var r=rd.call(n,a);if(r!==-1){var o=n.length-1;o===0?n=t.reactions=null:(n[r]=n[o],n.pop())}}if(n===null&&(t.f&Ut)!==0&&(oa===null||!ro.call(oa,t))){var c=t;(c.f&ba)!==0&&(c.f^=ba,c.f&=~Dn),c.v!==Rt&&Os(c),c.ac!==null&&ar(()=>{c.ac.abort(jr),c.ac=null,jt(c,Lt)}),eu(c),xr(c,0)}}function xr(a,t){var n=a.deps;if(n!==null)for(var r=t;r<n.length;r++)gu(a,n[r])}function Gn(a){var t=a.f;if((t&da)===0){jt(a,Ot);var n=st,r=eo;st=a,eo=(t&(ya|Ya))===0;try{(t&(Pa|Ls))!==0?hu(a):Gs(a),Gl(a);var o=tc(a);a.teardown=typeof o=="function"?o:null,a.wv=Xl;var c;ul&&Ld&&(a.f&Lt)!==0&&a.deps}finally{eo=r,st=n}}}async function mu(){await Promise.resolve(),nu()}function e(a){var t=a.f,n=(t&Ut)!==0;if(ut!==null&&!Ma){var r=st!==null&&(st.f&da)!==0;if(!r&&(Ra===null||!Ra.has(a))){var o=ut.deps;if((ut.f&so)!==0)a.rv<hn&&(a.rv=hn,oa===null&&o!==null&&o[ia]===a?ia++:oa===null?oa=[a]:oa.push(a));else{ut.deps??(ut.deps=[]),ro.call(ut.deps,a)||ut.deps.push(a);var c=a.reactions;c===null?a.reactions=[ut]:ro.call(c,ut)||c.push(ut)}}}if($a&&wn.has(a))return wn.get(a);if(n){var l=a;if($a){var i=l.v;return((l.f&Ot)===0&&l.reactions!==null||nc(l))&&(i=Hs(l)),wn.set(l,i),i}var u=(l.f&ba)===0&&!Ma&&ut!==null&&(eo||(ut.f&ba)!==0),v=(l.f&Zn)===0;Rr(l)&&(u&&(l.f|=ba),Cl(l)),u&&!v&&(Nl(l),ac(l))}if($t!=null&&$t.has(a))return $t.get(a);if((a.f&rn)!==0)throw a.v;return a.v}function ac(a){if(a.f|=ba,a.deps!==null)for(const t of a.deps)(t.reactions??(t.reactions=[])).push(a),(t.f&Ut)!==0&&(t.f&ba)===0&&(Nl(t),ac(t))}function nc(a){if(a.v===Rt)return!0;if(a.deps===null)return!1;for(const t of a.deps)if(wn.has(t)||(t.f&Ut)!==0&&nc(t))return!0;return!1}function Wt(a){var t=Ma;try{return Ma=!0,a()}finally{Ma=t}}function un(a){if(!(typeof a!="object"||!a||a instanceof EventTarget)){if(Ia in a)ms(a);else if(!Array.isArray(a))for(let t in a){const n=a[t];typeof n=="object"&&n&&Ia in n&&ms(n)}}}function ms(a,t=new Set){if(typeof a=="object"&&a!==null&&!(a instanceof EventTarget)&&!t.has(a)){t.add(a),a instanceof Date&&a.getTime();for(let r in a)try{ms(a[r],t)}catch{}const n=Rs(a);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=vl(n);for(let o in r){const c=r[o].get;if(c)try{c.call(a)}catch{}}}}}function bu(a){return a.endsWith("capture")&&a!=="gotpointercapture"&&a!=="lostpointercapture"}const yu=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function ku(a){return yu.includes(a)}const wu={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function xu(a){return a=a.toLowerCase(),wu[a]??a}const Tu=["touchstart","touchmove"];function Su(a){return Tu.includes(a)}const _n=Symbol("events"),rc=new Set,bs=new Set;function oc(a,t,n,r={}){function o(c){if(r.capture||ys.call(t,c),!c.cancelBubble)return ar(()=>n==null?void 0:n.call(this,c))}return a.startsWith("pointer")||a.startsWith("touch")||a==="wheel"?Fa(()=>{t.addEventListener(a,o,r)}):t.addEventListener(a,o,r),o}function yt(a,t,n,r,o){var c={capture:r,passive:o},l=oc(a,t,n,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&Do(()=>{t.removeEventListener(a,l,c)})}function G(a,t,n){(t[_n]??(t[_n]={}))[a]=n}function xt(a){for(var t=0;t<a.length;t++)rc.add(a[t]);for(var n of bs)n(a)}let Ti=null;function ys(a){var S,M;var t=this,n=t.ownerDocument,r=a.type,o=((S=a.composedPath)==null?void 0:S.call(a))||[],c=o[0]||a.target;Ti=a;var l=0,i=Ti===a&&a[_n];if(i){var u=o.indexOf(i);if(u!==-1&&(t===document||t===window)){a[_n]=t;return}var v=o.indexOf(t);if(v===-1)return;u<=v&&(l=u)}if(c=o[l]||a.target,c!==t){od(a,"currentTarget",{configurable:!0,get(){return c||n}});var _=ut,m=st;ka(null),wa(null);try{for(var h,y=[];c!==null&&c!==t;){try{var x=(M=c[_n])==null?void 0:M[r];x!=null&&(!c.disabled||a.target===c)&&x.call(c,a)}catch(P){h?y.push(P):h=P}if(a.cancelBubble)break;l++,c=l<o.length?o[l]:null}if(h){for(let P of y)queueMicrotask(()=>{throw P});throw h}}finally{a[_n]=t,delete a.currentTarget,ka(_),wa(m)}}}var cl;const zo=((cl=globalThis==null?void 0:globalThis.window)==null?void 0:cl.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:a=>a});function Du(a){return(zo==null?void 0:zo.createHTML(a))??a}function sc(a){var t=Ul("template");return t.innerHTML=Du(a.replaceAll("<!>","<!---->")),t.content}function Kn(a,t){var n=st;n.nodes===null&&(n.nodes={start:a,end:t,a:null,t:null})}function C(a,t){var n=(t&yl)!==0,r=(t&Nd)!==0,o,c=!a.startsWith("<!>");return()=>{o===void 0&&(o=sc(c?a:"<!>"+a),n||(o=Ua(o)));var l=r||Ol?document.importNode(o,!0):o.cloneNode(!0);if(n){var i=Ua(l),u=l.lastChild;Kn(i,u)}else Kn(l,l);return l}}function Pu(a,t,n="svg"){var r=!a.startsWith("<!>"),o=(t&yl)!==0,c=`<${n}>${r?a:"<!>"+a}</${n}>`,l;return()=>{if(!l){var i=sc(c),u=Ua(i);if(o)for(l=document.createDocumentFragment();Ua(u);)l.appendChild(Ua(u));else l=Ua(u)}var v=l.cloneNode(!0);if(o){var _=Ua(v),m=v.lastChild;Kn(_,m)}else Kn(v,v);return v}}function Va(a,t){return Pu(a,t,"svg")}function qe(){var a=document.createDocumentFragment(),t=document.createComment(""),n=qa();return a.append(t,n),Kn(t,n),a}function g(a,t){a!==null&&a.before(t)}function p(a,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(a[fr]??(a[fr]=a.nodeValue))&&(a[fr]=n,a.nodeValue=`${n}`)}function Mu(a,t){return Eu(a,t)}const $r=new Map;function Eu(a,{target:t,anchor:n,props:r={},events:o,context:c,intro:l=!0,transformError:i}){lu();var u=void 0,v=vu(()=>{var _=n??t.appendChild(qa());$d(_,{pending:()=>{}},y=>{_t({});var x=Ct;c&&(x.c=c),o&&(r.$$events=o),u=a(y,r)||{},pt()},i);var m=new Set,h=y=>{for(var x=0;x<y.length;x++){var S=y[x];if(!m.has(S)){m.add(S);var M=Su(S);for(const T of[t,document]){var P=$r.get(T);P===void 0&&(P=new Map,$r.set(T,P));var Y=P.get(S);Y===void 0?(T.addEventListener(S,ys,{passive:M}),P.set(S,1)):P.set(S,Y+1)}}}};return h(To(rc)),bs.add(h),()=>{var M;for(var y of m)for(const P of[t,document]){var x=$r.get(P),S=x.get(y);--S==0?(P.removeEventListener(y,ys),x.delete(y),x.size===0&&$r.delete(P)):x.set(y,S)}bs.delete(h),_!==n&&((M=_.parentNode)==null||M.removeChild(_))}});return Cu.set(u,v),u}let Cu=new WeakMap;var Da,Na,ca,yn,Mr,Er,ko;class Vs{constructor(t,n=!0){aa(this,"anchor");Ze(this,Da,new Map);Ze(this,Na,new Map);Ze(this,ca,new Map);Ze(this,yn,new Set);Ze(this,Mr,!0);Ze(this,Er,t=>{if(N(this,Da).has(t)){var n=N(this,Da).get(t),r=N(this,Na).get(n);if(r)co(r),N(this,yn).delete(n);else{var o=N(this,ca).get(n);o&&(co(o.effect),N(this,Na).set(n,o.effect),N(this,ca).delete(n),o.fragment.lastChild.remove(),this.anchor.before(o.fragment),r=o.effect)}for(const[c,l]of N(this,Da)){if(N(this,Da).delete(c),c===t)break;const i=N(this,ca).get(l);i&&(Gt(i.effect),N(this,ca).delete(l))}for(const[c,l]of N(this,Na)){if(c===n||N(this,yn).has(c))continue;const i=()=>{if(Array.from(N(this,Da).values()).includes(c)){var v=document.createDocumentFragment();Ks(l,v),v.append(qa()),N(this,ca).set(c,{effect:l,fragment:v})}else Gt(l);N(this,yn).delete(c),N(this,Na).delete(c)};N(this,Mr)||!r?(N(this,yn).add(c),xn(l,i,!1)):i()}}});Ze(this,ko,t=>{N(this,Da).delete(t);const n=Array.from(N(this,Da).values());for(const[r,o]of N(this,ca))n.includes(r)||(Gt(o.effect),N(this,ca).delete(r))});this.anchor=t,et(this,Mr,n)}ensure(t,n){var r=Re,o=Hl();if(n&&!N(this,Na).has(t)&&!N(this,ca).has(t))if(o){var c=document.createDocumentFragment(),l=qa();c.append(l),N(this,ca).set(t,{effect:Zt(()=>n(l)),fragment:c})}else N(this,Na).set(t,Zt(()=>n(this.anchor)));if(N(this,Da).set(r,t),o){for(const[i,u]of N(this,Na))i===t?r.unskip_effect(u):r.skip_effect(u);for(const[i,u]of N(this,ca))i===t?r.unskip_effect(u.effect):r.skip_effect(u.effect);r.oncommit(N(this,Er)),r.ondiscard(N(this,ko))}else N(this,Er).call(this,r)}}Da=new WeakMap,Na=new WeakMap,ca=new WeakMap,yn=new WeakMap,Mr=new WeakMap,Er=new WeakMap,ko=new WeakMap;function se(a,t,n=!1){var r=new Vs(a),o=n?on:0;function c(l,i){r.ensure(l,i)}rr(()=>{var l=!1;t((i,u=0)=>{l=!0,c(u,i)}),l||c(-1,null)},o)}function La(a,t){return t}function Nu(a,t,n){for(var r=[],o=t.length,c,l=t.length,i=0;i<o;i++){let m=t[i];xn(m,()=>{if(c){if(c.pending.delete(m),c.done.add(m),c.pending.size===0){var h=a.outrogroups;ks(a,To(c.done)),h.delete(c),h.size===0&&(a.outrogroups=null)}}else l-=1},!1)}if(l===0){var u=r.length===0&&n!==null&&a.pending.size===0;if(u){var v=n,_=v.parentNode;cu(_),_.append(v),a.items.clear()}ks(a,t,!u)}else c={pending:new Set(t),done:new Set},(a.outrogroups??(a.outrogroups=new Set)).add(c)}function ks(a,t,n=!0){var r;if(a.pending.size>0){r=new Set;for(const l of a.pending.values())for(const i of l)r.add(a.items.get(i).e)}for(var o=0;o<t.length;o++){var c=t[o];if(r!=null&&r.has(c)){c.f|=ja;const l=document.createDocumentFragment();Ks(c,l)}else Gt(t[o],n)}}var Si;function Me(a,t,n,r,o,c=null){var l=a,i=new Map,u=(t&ml)!==0;if(u){var v=a;l=v.appendChild(qa())}var _=null,m=zs(()=>{var T=n();return qs(T)?T:T==null?[]:To(T)}),h,y=new Map,x=!0;function S(T){(Y.effect.f&da)===0&&(Y.pending.delete(T),Y.fallback=_,ju(Y,h,l,t,r),_!==null&&(h.length===0?(_.f&ja)===0?co(_):(_.f^=ja,gr(_,null,l)):xn(_,()=>{_=null})))}function M(T){Y.pending.delete(T)}var P=rr(()=>{h=e(m);for(var T=h.length,L=new Set,k=Re,D=Hl(),I=0;I<T;I+=1){var ie=h[I],ae=r(ie,I),re=x?null:i.get(ae);re?(re.v&&$n(re.v,ie),re.i&&$n(re.i,I),D&&k.unskip_effect(re.e)):(re=Fu(i,x?l:Si??(Si=qa()),ie,ae,I,o,t,n),x||(re.e.f|=ja),i.set(ae,re)),L.add(ae)}if(T===0&&c&&!_&&(x?_=Zt(()=>c(l)):(_=Zt(()=>c(Si??(Si=qa()))),_.f|=ja)),T>L.size&&fd(),!x)if(y.set(k,L),D){for(const[te,ce]of i)L.has(te)||k.skip_effect(ce.e);k.oncommit(S),k.ondiscard(M)}else S(k);e(m)}),Y={effect:P,items:i,pending:y,outrogroups:null,fallback:_};x=!1}function ir(a){for(;a!==null&&(a.f&ya)===0;)a=a.next;return a}function ju(a,t,n,r,o){var re,te,ce,$,j,U,J,he,be;var c=(r&Sd)!==0,l=t.length,i=a.items,u=ir(a.effect.first),v,_=null,m,h=[],y=[],x,S,M,P;if(c)for(P=0;P<l;P+=1)x=t[P],S=o(x,P),M=i.get(S).e,(M.f&ja)===0&&((te=(re=M.nodes)==null?void 0:re.a)==null||te.measure(),(m??(m=new Set)).add(M));for(P=0;P<l;P+=1){if(x=t[P],S=o(x,P),M=i.get(S).e,a.outrogroups!==null)for(const Z of a.outrogroups)Z.pending.delete(M),Z.done.delete(M);if((M.f&ea)!==0&&(co(M),c&&(($=(ce=M.nodes)==null?void 0:ce.a)==null||$.unfix(),(m??(m=new Set)).delete(M))),(M.f&ja)!==0)if(M.f^=ja,M===u)gr(M,null,n);else{var Y=_?_.next:u;M===a.effect.last&&(a.effect.last=M.prev),M.prev&&(M.prev.next=M.next),M.next&&(M.next.prev=M.prev),Qa(a,_,M),Qa(a,M,Y),gr(M,Y,n),_=M,h=[],y=[],u=ir(_.next);continue}if(M!==u){if(v!==void 0&&v.has(M)){if(h.length<y.length){var T=y[0],L;_=T.prev;var k=h[0],D=h[h.length-1];for(L=0;L<h.length;L+=1)gr(h[L],T,n);for(L=0;L<y.length;L+=1)v.delete(y[L]);Qa(a,k.prev,D.next),Qa(a,_,k),Qa(a,D,T),u=T,_=D,P-=1,h=[],y=[]}else v.delete(M),gr(M,u,n),Qa(a,M.prev,M.next),Qa(a,M,_===null?a.effect.first:_.next),Qa(a,_,M),_=M;continue}for(h=[],y=[];u!==null&&u!==M;)(v??(v=new Set)).add(u),y.push(u),u=ir(u.next);if(u===null)continue}(M.f&ja)===0&&h.push(M),_=M,u=ir(M.next)}if(a.outrogroups!==null){for(const Z of a.outrogroups)Z.pending.size===0&&(ks(a,To(Z.done)),(j=a.outrogroups)==null||j.delete(Z));a.outrogroups.size===0&&(a.outrogroups=null)}if(u!==null||v!==void 0){var I=[];if(v!==void 0)for(M of v)(M.f&ea)===0&&I.push(M);for(;u!==null;)(u.f&ea)===0&&u!==a.fallback&&I.push(u),u=ir(u.next);var ie=I.length;if(ie>0){var ae=(r&ml)!==0&&l===0?n:null;if(c){for(P=0;P<ie;P+=1)(J=(U=I[P].nodes)==null?void 0:U.a)==null||J.measure();for(P=0;P<ie;P+=1)(be=(he=I[P].nodes)==null?void 0:he.a)==null||be.fix()}Nu(a,I,ae)}}c&&Fa(()=>{var Z,de;if(m!==void 0)for(M of m)(de=(Z=M.nodes)==null?void 0:Z.a)==null||de.apply()})}function Fu(a,t,n,r,o,c,l,i){var u=(l&xd)!==0?(l&Dd)===0?ou(n,!1,!1):sn(n):null,v=(l&Td)!==0?sn(o):null;return{v:u,i:v,e:Zt(()=>(c(t,u??n,v??o,i),()=>{a.delete(r)}))}}function gr(a,t,n){if(a.nodes)for(var r=a.nodes.start,o=a.nodes.end,c=t&&(t.f&ja)===0?t.nodes.start:n;r!==null;){var l=Ar(r);if(c.before(r),r===o)return;r=l}}function Qa(a,t,n){t===null?a.effect.first=n:t.next=n,n===null?a.effect.last=t:n.prev=t}function Ge(a,t,n,r,o){var i;var c=(i=t.$$slots)==null?void 0:i[n],l=!1;c===!0&&(c=t.children,l=!0),c===void 0||c(a,l?()=>r:r)}function Lr(a,t,n){var r=new Vs(a);rr(()=>{var o=t()??null;r.ensure(o,o&&(c=>n(c,o)))},on)}function Au(a,t,n,r,o,c){var l=null,i=a,u=new Vs(i,!1);rr(()=>{const v=t()||null;var _=jd;if(v===null){u.ensure(null,null);return}return u.ensure(v,m=>{if(v){if(l=Ul(v,_),Kn(l,l),r){var h=null,y=l.appendChild(qa());r(l,y),h==null||h.remove()}st.nodes.end=l,m.before(l)}}),()=>{}},on),Do(()=>{})}function Or(a,t){var n;n=document.head.appendChild(qa());try{rr(()=>{var r=Zt(()=>t(n));r.f|=_l})}finally{}}function Iu(a,t){var n=void 0,r;$l(()=>{n!==(n=t())&&(r&&(Gt(r),r=null),n&&(r=Zt(()=>{Ir(()=>n(a))})))})}function ic(a){var t,n,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var o=a.length;for(t=0;t<o;t++)a[t]&&(n=ic(a[t]))&&(r&&(r+=" "),r+=n)}else for(n in a)a[n]&&(r&&(r+=" "),r+=n);return r}function qu(){for(var a,t,n=0,r="",o=arguments.length;n<o;n++)(a=arguments[n])&&(t=ic(a))&&(r&&(r+=" "),r+=t);return r}function Ru(a){return typeof a=="object"?qu(a):a??""}const Di=[...` 	
\r\f \v\uFEFF`];function Lu(a,t,n){var r=a==null?"":""+a;if(t&&(r=r?r+" "+t:t),n){for(var o of Object.keys(n))if(n[o])r=r?r+" "+o:o;else if(r.length)for(var c=o.length,l=0;(l=r.indexOf(o,l))>=0;){var i=l+c;(l===0||Di.includes(r[l-1]))&&(i===r.length||Di.includes(r[i]))?r=(l===0?"":r.substring(0,l))+r.substring(i+1):l=i}}return r===""?null:r}function Pi(a,t=!1){var n=t?" !important;":";",r="";for(var o of Object.keys(a)){var c=a[o];c!=null&&c!==""&&(r+=" "+o+": "+c+n)}return r}function Ho(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function Ou(a,t){if(t){var n="",r,o;if(Array.isArray(t)?(r=t[0],o=t[1]):r=t,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,l=0,i=!1,u=[];r&&u.push(...Object.keys(r).map(Ho)),o&&u.push(...Object.keys(o).map(Ho));var v=0,_=-1;const S=a.length;for(var m=0;m<S;m++){var h=a[m];if(i?h==="/"&&a[m-1]==="*"&&(i=!1):c?c===h&&(c=!1):h==="/"&&a[m+1]==="*"?i=!0:h==='"'||h==="'"?c=h:h==="("?l++:h===")"&&l--,!i&&c===!1&&l===0){if(h===":"&&_===-1)_=m;else if(h===";"||m===S-1){if(_!==-1){var y=Ho(a.substring(v,_).trim());if(!u.includes(y)){h!==";"&&m++;var x=a.substring(v,m).trim();n+=" "+x+";"}}v=m+1,_=-1}}}}return r&&(n+=Pi(r)),o&&(n+=Pi(o,!0)),n=n.trim(),n===""?null:n}return a==null?null:String(a)}function at(a,t,n,r,o,c){var l=a[ls];if(l!==n||l===void 0){var i=Lu(n,r,c);i==null?a.removeAttribute("class"):t?a.className=i:a.setAttribute("class",i),a[ls]=n}else if(c&&o!==c)for(var u in c){var v=!!c[u];(o==null||v!==!!o[u])&&a.classList.toggle(u,v)}return c}function Uo(a,t={},n,r){for(var o in n){var c=n[o];t[o]!==c&&(n[o]==null?a.style.removeProperty(o):a.style.setProperty(o,c,r))}}function At(a,t,n,r){var o=a[cs];if(o!==t){var c=Ou(t,r);c==null?a.removeAttribute("style"):a.style.cssText=c,a[cs]=t}else r&&(Array.isArray(r)?(Uo(a,n==null?void 0:n[0],r[0]),Uo(a,n==null?void 0:n[1],r[1],"important")):Uo(a,n,r));return r}function It(a,t,n=!1){if(a.multiple){if(t==null)return;if(!qs(t))return Id();for(var r of a.options)r.selected=t.includes(kr(r));return}for(r of a.options){var o=kr(r);if(iu(o,t)){r.selected=!0;return}}(!n||t!==void 0)&&(a.selectedIndex=-1)}function Bt(a){var t=new MutationObserver(()=>{"__value"in a&&It(a,a.__value)});t.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Do(()=>{t.disconnect()})}function uo(a,t,n=t){var r=new WeakSet,o=!0;Ml(a,"change",c=>{var l=c?"[selected]":":checked",i;if(a.multiple)i=[].map.call(a.querySelectorAll(l),kr);else{var u=a.querySelector(l)??a.querySelector("option:not([disabled])");i=u&&kr(u)}n(i),a.__value=i,Re!==null&&r.add(Re)}),Ir(()=>{var c=t();if(a===document.activeElement){var l=Re;if(r.has(l))return}if(It(a,c,o),o&&c===void 0){var i=a.querySelector(":checked");i!==null&&(c=kr(i),n(c))}a.__value=c,o=!1}),Bt(a)}function kr(a){return"__value"in a?a.__value:a.value}const lr=Symbol("class"),cr=Symbol("style"),lc=Symbol("is custom element"),cc=Symbol("is html"),Bu=So?"input":"INPUT",zu=So?"option":"OPTION",Hu=So?"select":"SELECT",Uu=So?"progress":"PROGRESS";function vo(a,t){var n=Po(a);n.value===(n.value=t??void 0)||a.value===t&&(t!==0||a.nodeName!==Uu)||(a.value=t??"")}function Js(a,t){var n=Po(a);n.checked!==(n.checked=t??void 0)&&(a.checked=t)}function Wu(a,t){t?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function A(a,t,n,r){var o=Po(a);o[t]!==(o[t]=n)&&(t==="loading"&&(a[dd]=n),n==null?a.removeAttribute(t):typeof n!="string"&&dc(a).includes(t)?a[t]=n:a.setAttribute(t,n))}function Yu(a,t,n,r,o=!1,c=!1){var l=Po(a),i=l[lc],u=!l[cc],v=t||{},_=a.nodeName===zu;for(var m in t)m in n||(n[m]=null);n.class?n.class=Ru(n.class):n[lr]&&(n.class=null),n[cr]&&(n.style??(n.style=null));var h=dc(a);if(a.nodeName===Bu&&"type"in n&&("value"in n||"__value"in n)){var y=n.type;(y!==v.type||y===void 0&&a.hasAttribute("type"))&&(v.type=y,A(a,"type",y))}for(const k in n){let D=n[k];if(_&&k==="value"&&D==null){a.value=a.__value="",v[k]=D;continue}if(k==="class"){var x=a.namespaceURI==="http://www.w3.org/1999/xhtml";at(a,x,D,r,t==null?void 0:t[lr],n[lr]),v[k]=D,v[lr]=n[lr];continue}if(k==="style"){At(a,D,t==null?void 0:t[cr],n[cr]),v[k]=D,v[cr]=n[cr];continue}var S=v[k];if(!(D===S&&!(D===void 0&&a.hasAttribute(k)))){v[k]=D;var M=k[0]+k[1];if(M!=="$$")if(M==="on"){const I={},ie="$$"+k;let ae=k.slice(2);var P=ku(ae);if(bu(ae)&&(ae=ae.slice(0,-7),I.capture=!0),!P&&S){if(D!=null)continue;a.removeEventListener(ae,v[ie],I),v[ie]=null}if(P)G(ae,a,D),xt([ae]);else if(D!=null){let re=function(te){v[k].call(this,te)};var L=re;v[ie]=oc(ae,a,re,I)}}else if(k==="style")A(a,k,D);else if(k==="autofocus")kn(a,!!D);else if(!i&&(k==="__value"||k==="value"&&D!=null))a.value=a.__value=D;else if(k==="selected"&&_)Wu(a,D);else{var Y=k;u||(Y=xu(Y));var T=Y==="defaultValue"||Y==="defaultChecked";if(D==null&&!i&&!T)if(l[k]=null,Y==="value"||Y==="checked"){let I=a;const ie=t===void 0;if(Y==="value"){let ae=I.defaultValue;I.removeAttribute(Y),I.defaultValue=ae,I.value=I.__value=ie?ae:null}else{let ae=I.defaultChecked;I.removeAttribute(Y),I.defaultChecked=ae,I.checked=ie?ae:!1}}else a.removeAttribute(k);else T||h.includes(Y)&&(i||typeof D!="string")?(a[Y]=D,Y in l&&(l[Y]=Rt)):typeof D!="function"&&A(a,Y,D)}}}return v}function Mi(a,t,n=[],r=[],o=[],c,l=!1,i=!1){Bs(o,n,r,u=>{var v=void 0,_={},m=a.nodeName===Hu,h=!1;if($l(()=>{var x=t(...u.map(e)),S=Yu(a,v,x,c,l,i);h&&m&&"value"in x&&It(a,x.value);for(let P of Object.getOwnPropertySymbols(_))x[P]||Gt(_[P]);for(let P of Object.getOwnPropertySymbols(x)){var M=x[P];P.description===Fd&&(!v||M!==v[P])&&(_[P]&&Gt(_[P]),_[P]=Zt(()=>Iu(a,()=>M))),S[P]=M}v=S}),m){var y=a;Ir(()=>{It(y,v.value,!0),Bt(y)})}h=!0})}function Po(a){return a[Vr]??(a[Vr]={[lc]:a.nodeName.includes("-"),[cc]:a.namespaceURI===kl})}var Ei=new Map;function dc(a){var t=a.getAttribute("is")||a.nodeName,n=Ei.get(t);if(n)return n;Ei.set(t,n=[]);for(var r,o=a,c=Element.prototype;c!==o;){r=vl(o);for(var l in r)r[l].set&&l!=="innerHTML"&&l!=="textContent"&&l!=="innerText"&&n.push(l);o=Rs(o)}return n}function kt(a,t,n=t){var r=new WeakSet;Ml(a,"input",async o=>{var c=o?a.defaultValue:a.value;if(c=Wo(a)?Yo(c):c,n(c),Re!==null&&r.add(Re),await mu(),c!==(c=t())){var l=a.selectionStart,i=a.selectionEnd,u=a.value.length;if(a.value=c??"",i!==null){var v=a.value.length;l===i&&i===u&&v>u?(a.selectionStart=v,a.selectionEnd=v):(a.selectionStart=l,a.selectionEnd=Math.min(i,v))}}}),Wt(t)==null&&a.value&&(n(Wo(a)?Yo(a.value):a.value),Re!==null&&r.add(Re)),$s(()=>{var o=t();if(a===document.activeElement){var c=Re;if(r.has(c))return}Wo(a)&&o===Yo(a.value)||a.type==="date"&&!o&&!a.value||o!==a.value&&(a.value=o??"")})}function Wo(a){var t=a.type;return t==="number"||t==="range"}function Yo(a){return a===""?null:+a}var en,Un,Cr,wo,uc;const xo=class xo{constructor(t){Ze(this,wo);Ze(this,en,new WeakMap);Ze(this,Un);Ze(this,Cr);et(this,Cr,t)}observe(t,n){var r=N(this,en).get(t)||new Set;return r.add(n),N(this,en).set(t,r),vt(this,wo,uc).call(this).observe(t,N(this,Cr)),()=>{var o=N(this,en).get(t);o.delete(n),o.size===0&&(N(this,en).delete(t),N(this,Un).unobserve(t))}}};en=new WeakMap,Un=new WeakMap,Cr=new WeakMap,wo=new WeakSet,uc=function(){return N(this,Un)??et(this,Un,new ResizeObserver(t=>{for(var n of t){xo.entries.set(n.target,n);for(var r of N(this,en).get(n.target)||[])r(n)}}))},aa(xo,"entries",new WeakMap);let ws=xo;var $u=new ws({box:"border-box"});function Gu(a,t,n){var r=$u.observe(a,()=>n(a[t]));Ir(()=>(Wt(()=>n(a[t])),r))}function $o(a,t){return a===t||(a==null?void 0:a[Ia])===t}function Ku(a={},t,n,r){var o=Ct.r,c=st;return Ir(()=>{var l,i;return $s(()=>{l=i,i=[],Wt(()=>{$o(n(...i),a)||(t(a,...i),l&&$o(n(...l),a)&&t(null,...l))})}),()=>{let u=c;for(;u!==o&&u.parent!==null&&u.parent.f&is;)u=u.parent;const v=()=>{i&&$o(n(...i),a)&&t(null,...i)},_=u.teardown;u.teardown=()=>{v(),_==null||_()}}}),a}function Vu(a=!1){const t=Ct,n=t.l.u;if(!n)return;let r=()=>un(t.s);if(a){let o=0,c={};const l=Yn(()=>{let i=!1;const u=t.s;for(const v in u)u[v]!==c[v]&&(c[v]=u[v],i=!0);return i&&o++,o});r=()=>e(l)}n.b.length&&uu(()=>{Ci(t,r),os(n.b)}),St(()=>{const o=Wt(()=>n.m.map(cd));return()=>{for(const c of o)typeof c=="function"&&c()}}),n.a.length&&St(()=>{Ci(t,r),os(n.a)})}function Ci(a,t){if(a.l.s)for(const n of a.l.s)e(n);t()}const Ju={get(a,t){if(!a.exclude.includes(t))return e(a.version),t in a.special?a.special[t]():a.props[t]},set(a,t,n){if(!(t in a.special)){var r=st;try{wa(a.parent_effect),a.special[t]=ma({get[t](){return a.props[t]}},t,bl)}finally{wa(r)}}return a.special[t](n),yi(a.version),!0},getOwnPropertyDescriptor(a,t){if(!a.exclude.includes(t)&&t in a.props)return{enumerable:!0,configurable:!0,value:a.props[t]}},deleteProperty(a,t){return a.exclude.includes(t)||(a.exclude.push(t),yi(a.version)),!0},has(a,t){return a.exclude.includes(t)?!1:t in a.props},ownKeys(a){return Reflect.ownKeys(a.props).filter(t=>!a.exclude.includes(t))}};function Ue(a,t){return new Proxy({props:a,exclude:t,special:{},version:sn(0),parent_effect:st},Ju)}const Qu={get(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(sr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(a,t,n){let r=a.props.length;for(;r--;){let o=a.props[r];sr(o)&&(o=o());const c=nn(o,t);if(c&&c.set)return c.set(n),!0}return!1},getOwnPropertyDescriptor(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(sr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const o=nn(r,t);return o&&!o.configurable&&(o.configurable=!0),o}}},has(a,t){if(t===Ia||t===gl)return!1;for(let n of a.props)if(sr(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(a){const t=[];for(let n of a.props)if(sr(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function Qe(...a){return new Proxy({props:a},Qu)}function ma(a,t,n,r){var L;var o=!tr||(n&Md)!==0,c=(n&Ed)!==0,l=(n&Cd)!==0,i=r,u=!0,v=void 0,_=()=>l&&o?(v??(v=Yn(r)),e(v)):(u&&(u=!1,i=l?Wt(r):r),i);let m;if(c){var h=Ia in a||gl in a;m=((L=nn(a,t))==null?void 0:L.set)??(h&&t in a?k=>a[t]=k:void 0)}var y,x=!1;c?[y,x]=Hd(()=>a[t]):y=a[t],y===void 0&&r!==void 0&&(y=_(),m&&(o&&md(),m(y)));var S;if(o?S=()=>{var k=a[t];return k===void 0?_():(u=!0,k)}:S=()=>{var k=a[t];return k!==void 0&&(i=void 0),k===void 0?i:k},o&&(n&bl)===0)return S;if(m){var M=a.$$legacy;return(function(k,D){return arguments.length>0?((!o||!D||M||x)&&m(D?S():k),k):S()})}var P=!1,Y=((n&Pd)!==0?Yn:zs)(()=>(P=!1,S()));c&&e(Y);var T=st;return(function(k,D){if(arguments.length>0){const I=D?e(Y):o&&c?ze(k):k;return f(Y,I),P=!0,i!==void 0&&(i=I),k}return $a&&P||(T.f&da)!==0?Y.v:e(Y)})}function ln(a){Ct===null&&ud(),tr&&Ct.l!==null?Xu(Ct).m.push(a):St(()=>{const t=Wt(a);if(typeof t=="function")return t})}function Xu(a){var t=a.l;return t.u??(t.u={a:[],b:[],m:[]})}const Zu="modulepreload",ev=function(a){return"/"+a},Ni={},tv=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let l=function(v){return Promise.all(v.map(_=>Promise.resolve(_).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=l(n.map(v=>{if(v=ev(v),v in Ni)return;Ni[v]=!0;const _=v.endsWith(".css"),m=_?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${m}`))return;const h=document.createElement("link");if(h.rel=_?"stylesheet":Zu,_||(h.as="script"),h.crossOrigin="",h.href=v,u&&h.setAttribute("nonce",u),document.head.appendChild(h),_)return new Promise((y,x)=>{h.addEventListener("load",y),h.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${v}`)))})}))}function c(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return o.then(l=>{for(const i of l||[])i.status==="rejected"&&c(i.reason);return t().catch(c)})},av="5";var dl;typeof window<"u"&&((dl=window.__svelte??(window.__svelte={})).v??(dl.v=new Set)).add(av);Od();/**
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
 */const nv={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const rv=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const ji=(...a)=>a.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var ov=Va("<svg><!><!></svg>");function Xe(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]),r=Ue(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);_t(t,!1);let o=ma(t,"name",8,void 0),c=ma(t,"color",8,"currentColor"),l=ma(t,"size",8,24),i=ma(t,"strokeWidth",8,2),u=ma(t,"absoluteStrokeWidth",8,!1),v=ma(t,"iconNode",24,()=>[]);Vu();var _=ov();Mi(_,(y,x,S)=>({...nv,...y,...r,width:l(),height:l(),stroke:c(),"stroke-width":x,class:S}),[()=>rv(r)?void 0:{"aria-hidden":"true"},()=>(un(u()),un(i()),un(l()),Wt(()=>u()?Number(i())*24/Number(l()):i())),()=>(un(ji),un(o()),un(n),Wt(()=>ji("lucide-icon","lucide",o()?`lucide-${o()}`:"",n.class)))]);var m=s(_);Me(m,1,v,La,(y,x)=>{var S=F(()=>hl(e(x),2));let M=()=>e(S)[0],P=()=>e(S)[1];var Y=qe(),T=Ee(Y);Au(T,M,!0,(L,k)=>{Mi(L,()=>({...P()}))}),g(y,Y)});var h=d(m);Ge(h,t,"default",{}),g(a,_),pt()}function Fi(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];Xe(a,Qe({name:"award"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function vc(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];Xe(a,Qe({name:"bell"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function sv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];Xe(a,Qe({name:"book-open"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function iv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];Xe(a,Qe({name:"calendar-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function fc(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];Xe(a,Qe({name:"calendar-days"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function lv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];Xe(a,Qe({name:"calendar-range"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function cv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];Xe(a,Qe({name:"calendar"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Qs(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];Xe(a,Qe({name:"chart-column"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Wa(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];Xe(a,Qe({name:"check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Vn(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];Xe(a,Qe({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function dv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15 18-6-6 6-6"}]];Xe(a,Qe({name:"chevron-left"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Jn(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];Xe(a,Qe({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function xs(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];Xe(a,Qe({name:"circle-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function hc(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];Xe(a,Qe({name:"circle-question-mark"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Qn(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];Xe(a,Qe({name:"clock"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function uv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];Xe(a,Qe({name:"download"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function vv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];Xe(a,Qe({name:"ellipsis-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function fv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];Xe(a,Qe({name:"flame"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function hv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];Xe(a,Qe({name:"folder"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function _v(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];Xe(a,Qe({name:"grip-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function pv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]];Xe(a,Qe({name:"languages"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function _c(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["rect",{x:"3",y:"4",width:"6",height:"6",rx:"1"}]];Xe(a,Qe({name:"list-todo"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function gv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];Xe(a,Qe({name:"list"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function mv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];Xe(a,Qe({name:"mail"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function bv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];Xe(a,Qe({name:"palette"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function yv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];Xe(a,Qe({name:"pause"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Xs(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];Xe(a,Qe({name:"pencil"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function fo(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];Xe(a,Qe({name:"play"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Mn(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];Xe(a,Qe({name:"plus"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function pc(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];Xe(a,Qe({name:"quote"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function kv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];Xe(a,Qe({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function wv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m17 2 4 4-4 4"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{d:"m7 22-4-4 4-4"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3"}]];Xe(a,Qe({name:"repeat"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function xv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];Xe(a,Qe({name:"rotate-ccw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Tv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]];Xe(a,Qe({name:"save"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Sv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];Xe(a,Qe({name:"search"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Dv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];Xe(a,Qe({name:"settings"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Pv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 4v16"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]];Xe(a,Qe({name:"skip-forward"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Mv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];Xe(a,Qe({name:"square"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Ev(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Xe(a,Qe({name:"sun"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Cv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];Xe(a,Qe({name:"sunrise"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Nv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];Xe(a,Qe({name:"tag"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Ts(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];Xe(a,Qe({name:"target"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Br(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Xe(a,Qe({name:"trash-2"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Go(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];Xe(a,Qe({name:"trending-up"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function jv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Xe(a,Qe({name:"upload"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Fv(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]];Xe(a,Qe({name:"user-round"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Zs(a,t){const n=Ue(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Xe(a,Qe({name:"x"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ee(l);Ge(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}const Av="/timer";function gc(){const a=window.location.hash,t=a.startsWith("#")?a.slice(1):a;return!t||t==="/"?Av:t}let ei=H(ze(gc())),Ai=!1;function Iv(){Ai||typeof window>"u"||(Ai=!0,window.addEventListener("hashchange",()=>{f(ei,gc(),!0)}))}Iv();function qv(){return e(ei)}function mc(a){if(window.location.hash===`#${a}`){f(ei,a,!0);return}window.location.hash=a}const Rv=[{path:"/timer",labelKey:"timer"},{path:"/tasks",labelKey:"tasks"},{path:"/stats",labelKey:"stats"},{path:"/settings",labelKey:"settings"},{path:"/help",labelKey:"help"}],Lv={page:{timer:"番茄钟 - PomoFlow",tasks:"任务 - PomoFlow",stats:"统计 - PomoFlow",settings:"配置 - PomoFlow"},nav:{timer:"番茄钟",tasks:"任务清单",stats:"统计",settings:"配置",help:"帮助与反馈",mainNav:"主导航"},mode:{focus:"专注",shortBreak:"短休息",longBreak:"长休息",focusing:"专注中"},priority:{high:"高",medium:"中",low:"低",none:"无"},common:{confirm:"知道了",noData:"暂无任务",reviewPlaceholder:"写点复盘…",ariaCompleted:"已完成",ariaMarkDone:"标记完成",ariaMarkUndone:"标记为未完成",loading:"加载中...",close:"关闭",clear:"清除",add:"添加",expand:"展开",collapse:"收起"},timer:{start:"开始专注",startBreak:"开始休息啦",pause:"暂停",resume:"继续",stop:"停止",abandon:"放弃",skip:"跳过",starting:"启动中...",todayDone:"今日已完成",pomodoroUnit:"个番茄钟",pomodoros:"番茄",taskList:"任务清单",todayFocus:"今日专注",minute:"分钟",selectTask:"选择专注任务",selectTaskPlaceholder:"-- 选择任务 --",modeTabsAria:"计时器模式",noSpecificTask:"无特定任务",noTodoTask:"暂无待办任务",reviewTitle:"📝 今日日复盘",reviewPlaceholder:"记录今天的复盘…",clearFilter:"清除筛选",startTooltip:"开始专注",mottoRefresh:"换一条",modalTitle:"提示",focusCompleteTitle:"专注完成",noTask:"暂无任务",expandSubtasks:"展开子任务",collapseSubtasks:"收起子任务"},filter:{project:"项目",tag:"标签",priority:"优先级",date:"日　期",all:"全部",allProject:"全部项目",allTag:"全部标签",allPriority:"全部优先级",today:"今天",tomorrow:"明天",thisWeek:"本周",week:"本周",month:"本月",startDate:"开始日期",endDate:"结束日期",dueDate:"到期日",start:"开始",end:"结束",to:"至",export:"导出",projectAria:"项目筛选",tagAria:"标签筛选",priorityAria:"优先级筛选"},export:{index:"序号",title:"任务描述",project:"项目",priority:"优先级",dueDate:"到期日",estimated:"预计番茄数",tags:"标签",subtasks:"子任务",status:"任务状态",statusActive:"未完成",statusCompleted:"已完成",fileName:"任务清单"},task:{statEstimated:"预计时间",statActive:"待完成任务",statFocused:"已专注时间",statCompleted:"已完成任务",statCompletedPomo:"已完成番茄钟",searchResult:"搜索结果",list:"清单",task:"任务",noTask:"暂无任务",noDate:"未安排日期",unscheduled:"未安排",minute:"分钟",startTooltip:"开始专注",detailPriority:"优先级",detailPomodoro:"番茄",detailDueDate:"到期日",detailProject:"清单",detailReminder:"提醒",detailRepeat:"重复",detailNoTags:"无标签",detailEditTags:"编辑标签",detailCollapse:"收起",detailAddSubtask:"添加子任务...",subtaskEditPlaceholder:"修改子任务...",editSubtask:"编辑子任务",deleteSubtask:"删除子任务",detailAddNote:"添加备注...",detailDelete:"删除任务",detailNoProject:"无",detailNoTagsAvailable:"暂无可用标签",detailEmpty:"点击任务查看详情",detailTimeFilled:"已用当前时间补全截止时间，如需调整请在「到期日」中修改。",deleteConfirm:"删除任务「{title}」？",emptyAll:"暂无任务，添加一个开始吧",emptyFiltered:"此筛选下没有任务",groupHeader:"{date}（{weekday}）| {n} 分钟",detailPanelAria:"任务详情",titleAria:"标题",detailDescription:"描述",detailDescPlaceholder:"补充细节...",detailSubtasks:"子任务",newSubtaskAria:"新子任务",unknownProject:"未知",toggleSubtaskAria:"切换子任务完成",dblclickToEdit:"双击编辑",noTagsHint:"还没有标签，在「设置 → 标签」里创建",tagPickerAria:"标签多选",saveFailed:"保存失败：{err}",setTagsFailed:"设置标签失败：{err}",addSubtaskFailed:"添加子任务失败：{err}",updateSubtaskFailed:"更新子任务失败：{err}",deleteSubtaskFailed:"删除子任务失败：{err}"},stats:{dimToday:"今日",dimWeek:"本周",dimMonth:"本月",dimQuarter:"季度",dimHalf:"半年",dimYear:"年",focusDuration:"专注时长",sessions:"番茄数",completed:"完成任务",avg:"日均专注",activeDays:"活跃天数",longestStreak:"最长连续专注",avgWeek:"周均专注",avgMonth:"月均专注",peakMonth:"高峰月",peakPeriod:"高峰期",bestProject:"最佳项目",momRatio:"环比上期",trendTitle:"专注趋势",projectDist:"项目时间分布",noData:"该维度暂无专注数据",noProject:"暂无项目数据",unitMin:"分钟",unitCount:"个",unitDay:"天",byDay:"日",byWeek:"周",byMonth:"月",weeklyFocusTitle:"本周专注时长（分钟）",loading:"统计加载中...",loadError:"统计加载失败：{err}",trendChartAria:"专注趋势柱状图",donutChartAria:"项目时间分布环形图"},enum:{reminder:{"":"不提醒",on_time:"准时","5m":"提前 5 分钟","30m":"提前 30 分钟","1h":"提前 1 小时","1d":"提前 1 天","2d":"提前 2 天"},repeat:{"":"不重复",daily:"每天",weekday:"每个工作日",weekly:"每周",monthly:"每月",yearly:"每年",custom:"自定义"},weekday:["周日","周一","周二","周三","周四","周五","周六"]},settings:{tab:{account:"账号",timer:"番茄钟",lists:"清单管理",tags:"标签管理",theme:"主题背景",motto:"名言警句",notification:"通知文案",language:"中英切换"},language:{title:"界面语言",desc:"选择系统的显示语言，切换后所有页面文字随之变化",zh:"中文",en:"英文"},timerTitle:"番茄钟",timerParams:"番茄钟参数",durationSetting:"时长设置",behaviorSetting:"行为偏好",focusDuration:"番茄时长",shortBreakDuration:"短时休息",longBreakDuration:"长时休息",longBreakInterval:"长时休息间隔",longBreakIntervalEvery:"长休息间隔（每 N 个专注）",minute:"分钟",pomodoroUnit:"个番茄",autoStartNext:"自动开始下个番茄",autoStartNextDesc:"完成一个番茄后立即开始下一个",autoStartBreak:"自动开始休息",autoStartBreakDesc:"番茄完成后自动进入休息时段",autoEnterBreak:"专注完成后自动进入休息",disableBreak:"禁用休息",disableBreakDesc:"开启后将跳过所有休息时段",soundEnabled:"完成提示音",systemNotification:"系统通知",reset:"恢复默认",accountNotOpen:"该功能暂未开放",systemSection:"系统能力",autostart:"开机自启动",autostartHint:"OS 启动时自动运行 PomoFlow（静默启动，常驻托盘）",on:"已开启",off:"已关闭",notifTest:"系统通知测试",notifTestHint:"发送一条测试通知，验证系统通知链路是否通",sendTest:"发送测试",trayHint:"💡 关闭主窗口时 PomoFlow 会驻留在系统托盘，右键托盘图标可『显示窗口 / 退出』。",autostartFail:"自启动切换失败：{err}",notifPermDenied:"通知权限未授予，无法发送",notifSendFail:"通知失败：{err}",testNotifTitle:"PomoFlow 测试通知",testNotifBody:"当前 active 任务数：{n}",theme:{title:"主题背景",desc:"上方选主题决定主色（按钮、进度环、导航指示），下方选背景图可单独替换背景层——两者互不影响。",preset:"预设主题",presetBg:"预设背景",presetBgHint:"点选 8 张之一即可换背景；主色仍由上方所选主题决定。",presetBgName:{"preset-bg-1":"预设 1","preset-bg-2":"预设 2","preset-bg-3":"预设 3","preset-bg-4":"预设 4","preset-bg-5":"预设 5","preset-bg-6":"预设 6","preset-bg-7":"预设 7","preset-bg-8":"预设 8"},custom:"自定义背景",upload:"上传图片",customUsed:"已使用自定义背景",bgUsed:"已使用自定义背景图",presetBgUsed:"已使用预设背景",clearBg:"移除背景图",customHint:"支持 JPG/PNG，大图会自动压缩；上传图片会覆盖预设背景，主色仍由所选主题决定。",reset:"恢复默认",compressFail:"图片处理失败，请换一张",bgTooLarge:"背景图片过大，无法持久保存。本次使用有效，但刷新后需重新设置。",presetName:{default:"默认",sunny:"暖阳",ocean:"海洋",forest:"森林",dusk:"黄昏",lavender:"薰衣草",evening:"暮色",teal:"青石"}},motto:{title:"名言警句",addPlaceholder:"输入名言…",authorPlaceholder:"作者（可选）",addBtn:"添加",empty:"暂未添加自定义名言。番茄钟页面将轮播内置名言。",builtInBadge:"内置",defaultAuthor:"自定义",textRequired:"请输入名言内容",textTooLong:"名言不能超过 500 字",authorTooLong:"作者不能超过 64 字"},notification:{title:"通知文案",styleLabel:"提示风格",styleHintCustom:"自定义风格：填写下方文案 + 风格描述",styleHintPreset:"预设风格文案跟随界面语言自动切换；如需自定义文案请选择「自定义风格」。",styleDesc:"风格描述",styleDescPlaceholder:"如：霸气总裁风、文艺青年风…",focusEnd:"🍅 专注结束",breakEnd:"☕ 休息结束",reminder:"🔔 任务到期提醒",titleLabel:"标题",bodyLabel:"正文",placeholderHint:"用 {task_title} 作为任务名占位符，触发时自动替换",save:"保存",saved:"✓ 已保存",styleName:{default:"默认",cute:"卡哇伊",self_dep:"自嘲",strive:"奋斗",funny:"搞笑",custom:"自定义风格"},fallback:{focusTitle:"专注结束",focusBody:"番茄钟结束了，休息一下吧",breakTitle:"休息结束",breakBody:"休息结束，满满的能量开启新的任务专注。"}},repeatCustom:{title:"自定义重复",startDate:"开始日期",endDate:"结束日期",interval:"重复间隔（0~99）",type:"重复类型",typeDay:"日",typeWeek:"周",typeMonth:"月",typeYear:"年",weekdays:"重复在星期几（可多选）",monthDays:"重复在当月几日（可多选）",weekShort:["一","二","三","四","五","六","日"],needPickWeek:"请至少选择一个星期",needPickDay:"请至少选择一个日期",cancel:"取消",confirm:"确定"},list:{title:"清单管理",addRootPlaceholder:"一级清单名称",addRoot:"添加一级清单",addChild:"添加子清单",edit:"修改",del:"删除",level2Placeholder:"二级清单名称",level3Placeholder:"三级清单名称",empty:"暂无清单",dragHint:"按住拖动以重排或改变层级",reorderFail:"拖拽排序失败，请重试",reorderFailDepth:"层级过深，无法移动到此处",reorderFailCycle:"无法移动到当前位置（会形成循环）"},tag:{namePlaceholder:"输入新标签名称",add:"添加标签",colorLabel:"选择颜色：",colorAria:"颜色 {color}",nameLabel:"名称",empty:"暂无标签，请添加一个",dragHandle:"拖动以重排"}},form:{placeholder:"在此输入”任务描述”添加新任务，按「回车」键保存",titlePlaceholder:"任务标题...",pomodoroIcons:"预计番茄钟数",pomodoroUnit:"个番茄钟",more:"更多",collapse:"收起",submit:"提交",estimatedPomo:"预计番茄数",needTitle:"请输入任务名称",needTimeForReminder:"设置了提醒，请在到期日中选择具体时间（时分）",addFailed:"添加失败"},sidebar:{searchPlaceholder:"搜索",searchTasksPlaceholder:"搜索任务标题...",planned:"已计划",completed:"已完成",journal:"手账模式",emptyHint:"暂无清单，点击 + 添加",addRootAria:"新增根清单",addListTitle:"新增清单",listNamePlaceholder:"清单名称...",moreActions:"更多操作",deleteListConfirm:"删除此清单？子清单会一并删除"},journal:{monthTitle:"{year} 年 {month} 月",yearOption:"{year} 年",monthOption:"{month} 月",prevMonth:"上一月",nextMonth:"下一月",yearAria:"年份",monthAria:"月份",weekRange:"第 {n} 周（{ms}/{ds} ~ {me}/{de}）",weekday:["周一","周二","周三","周四","周五","周六","周日"],dailyReviewPlaceholder:"日复盘",weeklyReview:"📋 周复盘",weeklyReviewPlaceholder:"本周复盘"},monthPanel:{title:"{year}年{month}月 · 复盘",weeklyReadonly:"周复盘（只读 · 在手账模式每周区块内编辑）",weekRange:"第 {n} 周（周一起 {date}）",empty:"（空）",monthlyReview:"📋 月度复盘",monthlyPlaceholder:"本月总结…"},help:{tab:{manual:"用户手册",faq:"常见问题",contact:"联系我们"},manual:{timer:{title:"🍅 番茄钟",items:[{text:"选择一个任务后点击「开始」，进入专注计时。专注结束后自动切换到休息模式。"},{text:"三种模式：「专注」（默认 25 分钟，可自定义）/「短休息」（默认 5 分钟）/「长休息」（默认 15 分钟，每 N 个番茄触发一次）。"},{text:"专注结束时弹出系统通知 + 模态框提示（文案可在「配置 → 通知文案」中自定义风格）。"},{text:"可开启「自动开始休息」「自动开始下个番茄」，专注结束后无需手动操作。"},{text:"计时器到点后即使切到其他页面，通知和自动衔接也会正常触发。"},{text:"右侧显示当月任务清单，支持按项目、标签、优先级、日期筛选。"},{text:"专注下方有「今日日复盘」文本框和「座右铭」卡片（可点换一条）。"}]},tasks:{title:"📋 任务清单",items:[{text:"左侧栏切换视图：今天 / 明天 / 本周 / 已计划 / 已完成 / 手账模式。"},{text:"「已计划」页支持按项目、标签、优先级、本周、本月、到期日范围筛选。"},{text:"任务支持：标题、备注、优先级（高/中/低/无）、到期日（含时分）、预计番茄数、番茄时长、提醒、重复。"},{text:"清单（项目）支持嵌套（最多 3 级）、自定义颜色。标签支持多对多、12 种预设色。"},{text:"子任务（Checklist）：每个任务可添加多个子任务，独立勾选完成。"},{text:"点击任务可展开右侧详情面板，直接编辑标题、到期日、优先级、提醒、重复、标签、子任务、备注。"}]},reminder:{title:"🔔 任务提醒",items:[{text:"设置提醒后，到达提醒时间点（到期日减去提前量）会弹出浏览器系统通知。"},{text:"提醒选项：准时 / 提前 5 分钟 / 30 分钟 / 1 小时 / 1 天 / 2 天。"},{text:"专注期间不弹提醒，专注结束后自动补弹（避免打断专注）。"},{text:"同一提醒只弹一次，不会重复打扰。"},{text:"设置提醒时必须填写到期日的时间（时分），否则会提示补全。"}]},repeat:{title:"🔁 任务重复",items:[{text:"内置规则：每天 / 工作日 / 每周 / 每月 / 每年。设置后自动预生成重复实例（上限 50 个）。"},{text:"「自定义」：可选重复间隔（0~99）、类型（日/周/月/年）。",sub:"间隔 0 = 每周期都重复；间隔 1 = 每隔 1 个周期（跳过 1 个）；间隔 N = 每隔 N 个周期。"},{text:"类型为「周」可选星期几（一~日多选）；类型为「月」可选当月几日（多选）。"},{text:"修改重复规则时，旧的未完成实例会自动删除并按新规则重新生成。"},{text:"每个重复实例会完整复制原任务的标签、子任务、备注、优先级、番茄数。"}]},journal:{title:"📔 手账模式",items:[{text:"月级视图，按自然周分组（周一~周日），每周内按 3+3+1 分行展示。"},{text:"每天方块显示当日任务（方形复选框可切完成）+ 日复盘文本框。"},{text:"每周底部有周复盘文本框。右侧面板展示当月各周复盘（只读）+ 月度复盘（可编辑）。"},{text:"支持上一月/下一月 + 年/月下拉切换。"},{text:"番茄钟页面的「今日日复盘」与手账模式当天的日复盘数据同步。"}]},stats:{title:"📊 统计报表",items:[{text:"6 种维度切换：今日 / 本周 / 本月 / 季度 / 半年 / 年。"},{text:"通用 4 卡：专注时长、番茄数、完成任务、日均专注。"},{text:"维度越长亮点越多：活跃天数、最长连续专注、周/月均、高峰期、最佳项目、环比上期。"},{text:"趋势柱状图（按日/周/月自动切换粒度）+ 圆环图（项目时间分布），全部跟随当前主题主色（accent）统一配色，告别五颜六色。"}]},settings:{title:"⚙️ 配置",items:[{text:"「番茄钟」：专注/休息时长、长时休息间隔（2~6 个番茄）、自动开始选项。"},{text:"「清单管理」：添加/修改/删除项目（嵌套 3 级）、自定义颜色。"},{text:"「标签管理」：添加/修改/删除标签、12 种预设色。"},{text:"「主题背景」：8 种预设主题（默认/暖阳/海洋/森林/黄昏/薰衣草/暮色/青石），各含专属背景渐变与配套主色；亦可自定义上传图片（自动压缩），所有页面统一半透明蒙层淡化背景、避免刺眼。"},{text:"「名言警句」：管理自定义座右铭（存数据库，番茄钟页轮播展示）。"},{text:"「通知文案」：6 种风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），分别配置专注结束/休息结束/任务提醒的标题和正文。"}]}},faq:{items:[{q:"数据保存在哪里？会丢失吗？",a:"所有数据（任务、番茄记录、复盘、名言、通知文案、主题设置）保存在本地 SQLite 数据库（pomoflow.db）和浏览器 localStorage 中，无需联网。升级版本时数据库会自动迁移，旧数据完整保留。建议定期备份 pomoflow.db 文件。"},{q:"如何修改番茄时长和长时休息间隔？",a:"进入「配置」→「番茄钟」，在「番茄时长」「短时休息」「长时休息」下拉框中选择分钟数（1~90 分钟可选）。长时休息间隔可选 2~6 个番茄（即每完成几个番茄触发一次长休息）。"},{q:"为什么专注期间不弹任务提醒？",a:"这是设计行为。专注期间系统会抑制所有任务提醒，避免打断你的专注。专注结束后会自动补弹被跳过的提醒。"},{q:"任务提醒不弹通知怎么办？",a:"首次使用时浏览器会请求通知权限，需要点击「允许」。如果之前拒绝了，可在浏览器地址栏左侧的设置图标中重新允许通知。另外，提醒需要任务设置了「到期日+具体时间（时分）」和「提醒选项」才会触发。"},{q:"自定义重复的间隔 0 和间隔 1 有什么区别？",a:"间隔 0 = 每个周期都重复（如每天都出现）。间隔 1 = 每隔 1 个周期（如第 1 周、第 3 周、第 5 周，跳过第 2、4 周）。间隔 N = 跳过 N 个周期后再重复。"},{q:"手账模式的周复盘和月度复盘在哪里编辑？",a:"周复盘在每周区块底部的文本框直接编辑（失焦自动保存）。月度复盘在右侧面板的「📋 月度复盘」文本框编辑。左侧编辑后右侧面板会自动刷新。"},{q:"自定义名言存在哪里？刷新会丢失吗？",a:"自定义名言存在数据库（pomoflow.db）中，刷新页面不会丢失。内置的 50 条名言是程序自带的。番茄钟页面的名言卡片优先轮播自定义名言（逐条不重复），轮完一轮后重新开始。"},{q:"切换页面后专注还在计时吗？自动休息还会触发吗？",a:"是的。计时器和所有自动逻辑（自动开始休息、自动开始下个番茄、专注完成通知）都在全局状态中，切到任务清单/统计/配置等页面不影响。专注到点会正常通知和衔接。"},{q:"主题背景上传的图片太大怎么办？",a:"上传图片会自动压缩（缩放到 1920px 宽、JPEG 0.8 质量），不会撑爆存储。如果图片仍然过大导致无法持久保存，会弹出提示告知你刷新后需重新设置。"},{q:"通知文案可以自定义吗？",a:"可以。进入「配置」→「通知文案」，选择风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），文案会自动填入。你可以手动修改每个场景的标题和正文。任务提醒正文支持用 {task_title} 作为任务名占位符，触发时自动替换。"},{q:"删除清单（项目）会删除里面的任务吗？",a:"删除清单后，归属该清单的任务会自动变为「无项目」状态，任务本身不会被删除。删除子清单同理，任务会上升到父清单。"},{q:"切换主题或上传背景图后，按钮和图表颜色会跟着变吗？",a:"会。8 种预设主题各自配有一套主色（accent），切换后按钮、导航指示条、计时器圆环、统计图表、输入框焦点光晕等全部跟随变化。上传自定义背景图时，主色自动回退为默认的柔雾番茄红。"},{q:"上传的背景图太鲜艳影响阅读怎么办？",a:"所有页面都有一层统一的半透明蒙层覆盖在背景图上，会自动淡化背景，保证文字与卡片清晰可读。如果仍觉得偏亮，可在「配置 → 主题背景」中换用更柔和的预设主题。"}]},contact:{intro:"如有商务合作或其他事项，可通过以下方式联系我们：",emailLabel:"邮箱：",phoneLabel:"电话：",workHoursLabel:"工作时间：",workHours:"周一至周五 7:00 - 08:50 | 18：30 - 22：00 ; 周末 07：00 - 22：00",feedbackTitle:"问题反馈 / 功能建议",feedbackDesc:"如果您在使用过程中遇到 Bug 或有功能建议，请发送邮件到以上邮箱，我们会及时跟进处理。",subjectLabel:"邮件主题格式：",subjectFormat:"PomoFlow-功能建议",subjectHint:"（可选：功能建议 / Bug 反馈 / 使用疑问）",bodyLabel:"邮件正文建议包含：",bodyItems:["问题或建议的详细描述","您的联系方式（邮箱 / QQ / 手机号），方便我们回复","遇到 Bug 时的操作步骤（便于我们复现）"],exampleLabel:"示例：",exampleText:`主题：PomoFlow-Bug 反馈

您好，我在创建任务时点击「重复」
选择「自定义」后弹窗没有出现。

联系方式：user@example.com`}}},Ov={page:{timer:"Timer - PomoFlow",tasks:"Tasks - PomoFlow",stats:"Stats - PomoFlow",settings:"Settings - PomoFlow"},nav:{timer:"Pomodoro",tasks:"Tasks",stats:"Stats",settings:"Settings",help:"Help & Feedback",mainNav:"Main navigation"},mode:{focus:"Focus",shortBreak:"Short Break",longBreak:"Long Break",focusing:"Focusing"},priority:{high:"High",medium:"Medium",low:"Low",none:"None"},common:{confirm:"OK",noData:"No tasks yet",reviewPlaceholder:"Write a review…",ariaCompleted:"Completed",ariaMarkDone:"Mark complete",ariaMarkUndone:"Mark as not done",loading:"Loading...",close:"Close",clear:"Clear",add:"Add",expand:"Expand",collapse:"Collapse"},timer:{start:"Start Focus",startBreak:"Start Break",pause:"Pause",resume:"Resume",stop:"Stop",abandon:"Abandon",skip:"Skip",starting:"Starting…",todayDone:"Today completed",pomodoroUnit:"pomodoros",pomodoros:"pomodoros",taskList:"Tasks",todayFocus:"Today's focus",minute:"min",selectTask:"Select a task",selectTaskPlaceholder:"-- Select a task --",modeTabsAria:"Timer mode",noSpecificTask:"No specific task",noTodoTask:"No active tasks",reviewTitle:"📝 Daily Review",reviewPlaceholder:"Write today’s review…",clearFilter:"Clear filters",startTooltip:"Start focus",mottoRefresh:"Next",modalTitle:"Notice",focusCompleteTitle:"Focus complete",noTask:"No tasks",expandSubtasks:"Expand subtasks",collapseSubtasks:"Collapse subtasks"},filter:{project:"Project",tag:"Tag",priority:"Priority",date:"Date",all:"All",allProject:"All projects",allTag:"All tags",allPriority:"All priorities",today:"Today",tomorrow:"Tomorrow",thisWeek:"This week",week:"This week",month:"This month",startDate:"Start date",endDate:"End date",dueDate:"Due date",start:"Start",end:"End",to:"to",export:"Export",projectAria:"Filter by project",tagAria:"Filter by tag",priorityAria:"Filter by priority"},export:{index:"No.",title:"Task",project:"Project",priority:"Priority",dueDate:"Due date",estimated:"Est. Pomodoros",tags:"Tags",subtasks:"Subtasks",status:"Status",statusActive:"Active",statusCompleted:"Completed",fileName:"Tasks"},task:{statEstimated:"Estimated time",statActive:"Active tasks",statFocused:"Time focused",statCompleted:"Tasks done",statCompletedPomo:"Pomodoros done",searchResult:"Search results",list:"List",task:"Tasks",noTask:"No tasks yet",noDate:"No date",unscheduled:"Unscheduled",minute:"min",startTooltip:"Start focus",detailPriority:"Priority",detailPomodoro:"Pomodoro",detailDueDate:"Due date",detailProject:"List",detailReminder:"Reminder",detailRepeat:"Repeat",detailNoTags:"No tags",detailEditTags:"Edit tags",detailCollapse:"Collapse",detailAddSubtask:"Add subtask...",subtaskEditPlaceholder:"Edit subtask...",editSubtask:"Edit subtask",deleteSubtask:"Delete subtask",detailAddNote:"Add note...",detailDelete:"Delete task",detailNoProject:"None",detailNoTagsAvailable:"No tags available",detailEmpty:"Click a task to view details",detailTimeFilled:"Filled the due time with the current time. Adjust in “Due date” if needed.",deleteConfirm:'Delete task "{title}"?',emptyAll:"No tasks yet — add one to get started",emptyFiltered:"No tasks match these filters",groupHeader:"{date} ({weekday}) | {n} min",detailPanelAria:"Task details",titleAria:"Title",detailDescription:"Description",detailDescPlaceholder:"Add details...",detailSubtasks:"Subtasks",newSubtaskAria:"New subtask",unknownProject:"Unknown",toggleSubtaskAria:"Toggle subtask completion",dblclickToEdit:"Double-click to edit",noTagsHint:"No tags yet — create them in Settings → Tags",tagPickerAria:"Tag multi-select",saveFailed:"Save failed: {err}",setTagsFailed:"Failed to set tags: {err}",addSubtaskFailed:"Failed to add subtask: {err}",updateSubtaskFailed:"Failed to update subtask: {err}",deleteSubtaskFailed:"Failed to delete subtask: {err}"},stats:{dimToday:"Today",dimWeek:"This week",dimMonth:"This month",dimQuarter:"Quarter",dimHalf:"Half-year",dimYear:"Year",focusDuration:"Focus time",sessions:"Pomodoros",completed:"Tasks done",avg:"Daily avg",activeDays:"Active days",longestStreak:"Longest streak",avgWeek:"Weekly avg",avgMonth:"Monthly avg",peakMonth:"Peak month",peakPeriod:"Peak period",bestProject:"Top project",momRatio:"vs last period",trendTitle:"Focus trend",projectDist:"Project distribution",noData:"No focus data for this range",noProject:"No project data",unitMin:"min",unitCount:"",unitDay:"d",byDay:"day",byWeek:"week",byMonth:"month",weeklyFocusTitle:"This week’s focus (min)",loading:"Loading stats...",loadError:"Failed to load stats: {err}",trendChartAria:"Focus trend bar chart",donutChartAria:"Project distribution donut chart"},enum:{reminder:{"":"No reminder",on_time:"On time","5m":"5 min before","30m":"30 min before","1h":"1 hour before","1d":"1 day before","2d":"2 days before"},repeat:{"":"No repeat",daily:"Daily",weekday:"Weekdays",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",custom:"Custom"},weekday:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},settings:{tab:{account:"Account",timer:"Pomodoro",lists:"Lists",tags:"Tags",theme:"Theme",motto:"Mottos",notification:"Notifications",language:"Language"},language:{title:"Interface Language",desc:"Choose the display language. All pages update instantly.",zh:"Chinese",en:"English"},timerTitle:"Pomodoro",timerParams:"Timer parameters",durationSetting:"Durations",behaviorSetting:"Behavior",focusDuration:"Focus duration",shortBreakDuration:"Short break",longBreakDuration:"Long break",longBreakInterval:"Long-break interval",longBreakIntervalEvery:"Long-break interval (every N focus sessions)",minute:"min",pomodoroUnit:"pomodoros",autoStartNext:"Auto-start next pomodoro",autoStartNextDesc:"Start the next pomodoro immediately after one ends",autoStartBreak:"Auto-start break",autoStartBreakDesc:"Enter break automatically after a pomodoro",autoEnterBreak:"Enter break automatically after focus ends",disableBreak:"Disable breaks",disableBreakDesc:"Skip all break periods when enabled",soundEnabled:"Completion sound",systemNotification:"System notifications",reset:"Reset to default",accountNotOpen:"This feature is not available yet",systemSection:"System",autostart:"Launch at startup",autostartHint:"Run PomoFlow automatically at OS startup (silent start, stays in tray)",on:"On",off:"Off",notifTest:"Notification test",notifTestHint:"Send a test notification to verify the system notification pipeline",sendTest:"Send test",trayHint:"💡 When you close the main window, PomoFlow stays in the system tray. Right-click the tray icon to show the window or quit.",autostartFail:"Failed to toggle autostart: {err}",notifPermDenied:"Notification permission not granted",notifSendFail:"Notification failed: {err}",testNotifTitle:"PomoFlow test notification",testNotifBody:"Active tasks: {n}",theme:{title:"Theme",desc:"Pick a preset above to set the accent color (buttons, progress ring, nav indicator). Pick a background below to independently override the background layer. The two are independent.",preset:"Preset themes",presetBg:"Preset backgrounds",presetBgHint:"Click any of the 8 boxes to switch the background. The accent color still comes from the chosen theme above.",presetBgName:{"preset-bg-1":"Preset 1","preset-bg-2":"Preset 2","preset-bg-3":"Preset 3","preset-bg-4":"Preset 4","preset-bg-5":"Preset 5","preset-bg-6":"Preset 6","preset-bg-7":"Preset 7","preset-bg-8":"Preset 8"},custom:"Custom background",upload:"Upload image",customUsed:"Using custom background",bgUsed:"Custom background active",presetBgUsed:"Preset background active",clearBg:"Remove background",customHint:"JPG/PNG supported; large images are auto-compressed. The uploaded image replaces the preset background; the accent color still comes from the chosen theme.",reset:"Reset to default",compressFail:"Image processing failed, please try another.",bgTooLarge:"The background image is too large to persist. It works this session, but you’ll need to reset it after refresh.",presetName:{default:"Default",sunny:"Sunny",ocean:"Ocean",forest:"Forest",dusk:"Dusk",lavender:"Lavender",evening:"Evening",teal:"Teal"}},motto:{title:"Mottos",addPlaceholder:"Enter a motto…",authorPlaceholder:"Author (optional)",addBtn:"Add",empty:"No custom mottos yet. The timer page will cycle through built-in mottos.",builtInBadge:"Built-in",defaultAuthor:"Custom",textRequired:"Please enter the motto text",textTooLong:"Motto text must be at most 500 characters",authorTooLong:"Author must be at most 64 characters"},notification:{title:"Notifications",styleLabel:"Style",styleHintCustom:"Custom style: fill in the texts below + a style description",styleHintPreset:'Preset style texts follow the interface language automatically. To customize, choose "Custom style".',styleDesc:"Style description",styleDescPlaceholder:"e.g. CEO style, artsy style…",focusEnd:"🍅 Focus ended",breakEnd:"☕ Break ended",reminder:"🔔 Task reminder",titleLabel:"Title",bodyLabel:"Body",placeholderHint:"Use {task_title} as the task name placeholder; auto-replaced on trigger",save:"Save",saved:"✓ Saved",styleName:{default:"Default",cute:"Cute",self_dep:"Self-deprecating",strive:"Strive",funny:"Funny",custom:"Custom"},fallback:{focusTitle:"Focus ended",focusBody:"A pomodoro just ended — take a short break.",breakTitle:"Break ended",breakBody:"Break over — back to focused work with fresh energy."}},repeatCustom:{title:"Custom repeat",startDate:"Start date",endDate:"End date",interval:"Interval (0–99)",type:"Repeat type",typeDay:"Day",typeWeek:"Week",typeMonth:"Month",typeYear:"Year",weekdays:"Repeat on weekdays (multi-select)",monthDays:"Repeat on days of month (multi-select)",weekShort:["M","T","W","T","F","S","S"],needPickWeek:"Please pick at least one weekday",needPickDay:"Please pick at least one date",cancel:"Cancel",confirm:"OK"},list:{title:"Lists",addRootPlaceholder:"Top-level list name",addRoot:"Add top-level list",addChild:"Add sub-list",edit:"Rename",del:"Delete",level2Placeholder:"Sub-list name",level3Placeholder:"Sub-list name",empty:"No lists yet",dragHint:"Hold and drag to reorder or change level",reorderFail:"Reorder failed, please try again",reorderFailDepth:"Target location exceeds max depth",reorderFailCycle:"Cannot move: would create a cycle"},tag:{namePlaceholder:"Enter tag name",add:"Add tag",colorLabel:"Color:",colorAria:"Color {color}",nameLabel:"Name",empty:"No tags yet, add one",dragHandle:"Drag to reorder"}},form:{placeholder:'Type a "task description" here to add a new task, press Enter to save',titlePlaceholder:"Task title...",pomodoroIcons:"Estimated pomodoros",pomodoroUnit:"pomodoros",more:"More",collapse:"Collapse",submit:"Add",estimatedPomo:"Est. pomodoros",needTitle:"Please enter a task title",needTimeForReminder:"A reminder needs a specific time (HH:MM) in the due date",addFailed:"Failed to add"},sidebar:{searchPlaceholder:"Search",searchTasksPlaceholder:"Search task titles...",planned:"Planned",completed:"Completed",journal:"Journal",emptyHint:"No lists yet, click + to add",addRootAria:"Add root list",addListTitle:"Add list",listNamePlaceholder:"List name...",moreActions:"More actions",deleteListConfirm:"Delete this list? Sub-lists will be deleted too"},journal:{monthTitle:"{month} {year}",yearOption:"{year}",monthOption:"{month}",prevMonth:"Previous month",nextMonth:"Next month",yearAria:"Year",monthAria:"Month",weekRange:"Week {n} ({ms}/{ds} – {me}/{de})",weekday:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],dailyReviewPlaceholder:"Daily review",weeklyReview:"📋 Weekly review",weeklyReviewPlaceholder:"This week's review"},monthPanel:{title:"{month}/{year} · Review",weeklyReadonly:"Weekly reviews (read-only · edited in each week block)",weekRange:"Week {n} (from {date})",empty:"(empty)",monthlyReview:"📋 Monthly review",monthlyPlaceholder:"Monthly summary…"},help:{tab:{manual:"User Manual",faq:"FAQ",contact:"Contact Us"},manual:{timer:{title:"🍅 Pomodoro",items:[{text:"Pick a task and click “Start” to begin a focus session. When focus ends, the app switches to break mode automatically."},{text:"Three modes: “Focus” (default 25 min, customizable) / “Short break” (default 5 min) / “Long break” (default 15 min, triggered every N pomodoros)."},{text:"When focus ends, a system notification + modal appears (you can customize the wording under Settings → Notifications)."},{text:"Enable “Auto-start break” and “Auto-start next pomodoro” so focus endings need no manual action."},{text:"Even if you switch pages after the timer finishes, notifications and auto-transitions still fire."},{text:"The right panel shows the current task list, filterable by project, tag, priority, and date."},{text:"Below the timer are a “Daily review” text box and a “Motto” card (click to get another)."}]},tasks:{title:"📋 Tasks",items:[{text:"Switch views from the left sidebar: Today / Tomorrow / This week / Planned / Completed / Journal."},{text:"The “Planned” view supports filtering by project, tag, priority, this week, this month, and due-date range."},{text:"Tasks support: title, note, priority (high/medium/low/none), due date (with time), estimated pomodoros, pomodoro duration, reminder, and repeat."},{text:"Lists (projects) support nesting (up to 3 levels) and custom colors. Tags support many-to-many with 12 preset colors."},{text:"Subtasks (checklist): each task can have multiple subtasks, each toggleable independently."},{text:"Click a task to open the right detail panel and edit title, due date, priority, reminder, repeat, tags, subtasks, and notes."}]},reminder:{title:"🔔 Reminders",items:[{text:"After setting a reminder, a browser notification fires at the reminder time (due date minus the lead time)."},{text:"Reminder options: On time / 5 min / 30 min / 1 hour / 1 day / 2 days before."},{text:"No reminders fire during focus; they are shown after focus ends (to avoid breaking focus)."},{text:"Each reminder fires only once — no repeat interruptions."},{text:"A reminder requires a due date with a specific time (HH:MM); otherwise you’ll be prompted to fill it in."}]},repeat:{title:"🔁 Repeat",items:[{text:"Built-in rules: Daily / Weekdays / Weekly / Monthly / Yearly. Setting one auto-generates repeat instances (up to 50)."},{text:"“Custom”: choose an interval (0–99) and a type (day/week/month/year).",sub:"Interval 0 = repeat every cycle; interval 1 = every other cycle (skip 1); interval N = every N cycles."},{text:"Type “Week” lets you pick weekdays (Mon–Sun, multi-select); type “Month” lets you pick days of the month (multi-select)."},{text:"When you change the repeat rule, old incomplete instances are deleted and regenerated under the new rule."},{text:"Each repeat instance fully copies the original task’s tags, subtasks, notes, priority, and pomodoro count."}]},journal:{title:"📔 Journal",items:[{text:"Monthly view, grouped by natural weeks (Mon–Sun); each week is laid out in a 3+3+1 row split."},{text:"Each day cell shows that day’s tasks (a square checkbox toggles completion) plus a daily-review text box."},{text:"Each week has a weekly-review box at the bottom. The right panel shows the month’s weekly reviews (read-only) + a monthly review (editable)."},{text:"Supports previous/next month and year/month dropdowns."},{text:"The “daily review” on the timer page syncs with the same day’s daily review in Journal mode."}]},stats:{title:"📊 Stats",items:[{text:"Six range filters: Today / This week / This month / Quarter / Half-year / Year."},{text:"Four common cards: focus time, pomodoros, tasks done, daily average."},{text:"Longer ranges unlock more highlights: active days, longest streak, weekly/monthly averages, peak period, top project, and period-over-period."},{text:"Trend bar chart (auto day/week/month granularity) + donut chart (project time distribution), all colored by the current theme accent — no more rainbow."}]},settings:{title:"⚙️ Settings",items:[{text:"“Pomodoro”: focus/break durations, long-break interval (2–6 pomodoros), and auto-start options."},{text:"“Lists”: add/rename/delete projects (3-level nesting), custom colors."},{text:"“Tags”: add/rename/delete tags, 12 preset colors."},{text:"“Theme”: 8 preset themes (Default/Sunny/Ocean/Forest/Dusk/Lavender/Evening/Teal), each with its own background gradient and matching accent; you can also upload a custom image (auto-compressed). All pages use a unified translucent veil to soften the background."},{text:"“Mottos”: manage custom mottos (stored in the database, cycled on the timer page)."},{text:"“Notifications”: 6 styles (Default/Cute/Self-deprecating/Strive/Funny/Custom), each configurable for focus-end/break-end/reminder title and body."}]}},faq:{items:[{q:"Where is my data stored? Can it be lost?",a:"All data (tasks, pomodoro records, reviews, mottos, notification wording, theme settings) is stored in a local SQLite database (pomoflow.db) and browser localStorage — no internet needed. When you upgrade, the database auto-migrates and old data is fully preserved. Back up pomoflow.db regularly."},{q:"How do I change the pomodoro duration and long-break interval?",a:"Go to Settings → Pomodoro and pick minutes from the Focus / Short break / Long break dropdowns (1–90 min). The long-break interval can be 2–6 pomodoros (i.e. a long break every N pomodoros)."},{q:"Why do task reminders not fire during focus?",a:"By design. During focus, all task reminders are suppressed so your focus isn’t interrupted. Skipped reminders are shown after focus ends."},{q:"What if task reminders don’t show a notification?",a:"On first use the browser asks for notification permission — click “Allow”. If you denied it, re-enable notifications via the settings icon on the left of the address bar. Also, a reminder only fires when the task has a due date with a specific time (HH:MM) and a reminder option set."},{q:"In custom repeat, what’s the difference between interval 0 and interval 1?",a:"Interval 0 = repeat every cycle (e.g. appears every day). Interval 1 = every other cycle (e.g. weeks 1, 3, 5, skipping 2 and 4). Interval N = skip N cycles, then repeat."},{q:"Where do I edit weekly and monthly reviews in Journal mode?",a:"Weekly reviews are edited in the text box at the bottom of each week block (auto-saved on blur). Monthly reviews are edited in the “📋 Monthly review” box on the right panel. Edits on the left refresh the right panel automatically."},{q:"Where are custom mottos stored? Lost on refresh?",a:"Custom mottos are stored in the database (pomoflow.db) and survive refreshes. The 50 built-in mottos ship with the app. The motto card on the timer page prefers custom mottos (cycling without repeats) and restarts after one full loop."},{q:"Does focus keep timing after I switch pages? Do auto-breaks still fire?",a:"Yes. The timer and all auto logic (auto-start break, auto-start next pomodoro, focus-end notification) live in global state, so switching to Tasks/Stats/Settings doesn’t affect them. Focus completions still notify and transition."},{q:"What if an uploaded background image is too large?",a:"Uploads are auto-compressed (scaled to 1920px wide, JPEG quality 0.8), so storage isn’t blown up. If an image is still too large to persist, a prompt tells you to reset after refresh."},{q:"Can notification wording be customized?",a:"Yes. Go to Settings → Notifications and pick a style (Default/Cute/Self-deprecating/Strive/Funny/Custom); the wording auto-fills. You can edit each scene’s title and body. The reminder body supports {task_title} as the task name placeholder, auto-replaced on trigger."},{q:"Does deleting a list (project) delete its tasks?",a:"No. Deleting a list sets its tasks to “no project”; the tasks themselves aren’t deleted. Deleting a sub-list works the same way — tasks move up to the parent list."},{q:"Do buttons and charts change color when I switch themes or upload a background?",a:"Yes. Each of the 8 preset themes has its own accent color; switching it updates buttons, the nav indicator, the timer ring, charts, and input focus glow. When you upload a custom background, the accent falls back to the default soft tomato."},{q:"What if an uploaded background is too vivid to read?",a:"Every page has a unified translucent veil over the background that softens it, keeping text and cards readable. If it still feels bright, switch to a softer preset theme under Settings → Theme."}]},contact:{intro:"For business cooperation or other matters, reach us via:",emailLabel:"Email: ",phoneLabel:"Phone: ",workHoursLabel:"Working hours: ",workHours:"Mon–Fri 7:00 - 08:50 | 18：30 - 22：00 ;  Weekend: 07:00 - 22:00",feedbackTitle:"Bug Reports / Feature Requests",feedbackDesc:"If you hit a bug or have a feature idea, email the address above and we’ll follow up.",subjectLabel:"Email subject format:",subjectFormat:"PomoFlow-Feature Request",subjectHint:"(Optional: Feature Request / Bug Report / Question)",bodyLabel:"Email body should include:",bodyItems:["Detailed description of the issue or suggestion","Your contact (email / QQ / phone) so we can reply","Steps to reproduce if it’s a bug"],exampleLabel:"Example:",exampleText:`Subject: PomoFlow-Bug Report

Hi, when creating a task I clicked “Repeat”
and chose “Custom” but the dialog didn’t appear.

Contact: user@example.com`}}},Bv={zh:Lv,en:Ov},Ii="zh",bc="pomoflow-lang";function zv(){if(typeof localStorage>"u")return Ii;try{const a=localStorage.getItem(bc);if(a==="en"||a==="zh")return a}catch{}return Ii}let Mo=H(ze(zv()));function Eo(){return e(Mo)}function Hv(a){if(f(Mo,a,!0),typeof localStorage<"u")try{localStorage.setItem(bc,a)}catch{}typeof document<"u"&&(document.documentElement.lang=a)}function mt(){return Bv[e(Mo)]}function Ft(a,t){return Object.entries(t).reduce((n,[r,o])=>n.split(`{${r}}`).join(String(o)),a)}typeof document<"u"&&(document.documentElement.lang=e(Mo));const yc="pomoflow:settings:v2",Uv="pomoflow:settings:v1",dr={focusDuration:25,shortBreakDuration:5,longBreakDuration:15,longBreakInterval:4,autoStartNextPomodoro:!1,autoStartBreak:!1,disableBreak:!1,soundEnabled:!0,desktopNotificationEnabled:!0};function Wv(a){try{const t=JSON.parse(a),n={};return typeof t.focusMinutes=="number"&&(n.focusDuration=t.focusMinutes),typeof t.shortBreakMinutes=="number"&&(n.shortBreakDuration=t.shortBreakMinutes),typeof t.longBreakMinutes=="number"&&(n.longBreakDuration=t.longBreakMinutes),typeof t.longBreakInterval=="number"&&(n.longBreakInterval=t.longBreakInterval),typeof t.autoChain=="boolean"&&(n.autoStartBreak=t.autoChain),typeof t.soundEnabled=="boolean"&&(n.soundEnabled=t.soundEnabled),typeof t.desktopNotificationEnabled=="boolean"&&(n.desktopNotificationEnabled=t.desktopNotificationEnabled),Object.keys(n).length>0?n:null}catch{return null}}function kc(a){typeof localStorage>"u"||localStorage.setItem(yc,JSON.stringify(a))}function Yv(){if(typeof localStorage>"u")return{...dr};const a=localStorage.getItem(yc);if(a)try{const n=JSON.parse(a);return{...dr,...n}}catch{return{...dr}}const t=localStorage.getItem(Uv);if(t){const n=Wv(t);if(n){const r={...dr,...n};return kc(r),r}}return{...dr}}let to=H(ze(Yv()));function Ja(){return e(to)}function qi(a){f(to,{...e(to),...a},!0),kc(e(to))}const $v=[{key:"default",label:"默认"},{key:"cute",label:"卡哇伊"},{key:"self_dep",label:"自嘲"},{key:"strive",label:"奋斗"},{key:"funny",label:"搞笑"},{key:"custom",label:"自定义风格"}],wc={default:{style:"default",focus_end_title:"专注结束",focus_end_body:"番茄钟结束了，休息一下吧",break_end_title:"休息结束",break_end_body:"休息结束，满满的能量开启新的任务专注。",reminder_title:"PomoFlow 任务提醒",reminder_body:"任务「{task_title}」提醒时间已到"},cute:{style:"cute",focus_end_title:"专注完成啦~",focus_end_body:"你好棒呀！休息一下吧~ ✨",break_end_title:"休息结束啦~",break_end_body:"元气满满，继续加油鸭！✧",reminder_title:"该做任务啦~",reminder_body:"「{task_title}」的时间到啦，快去看看吧~ ♪"},self_dep:{style:"self_dep",focus_end_title:"又混过去一个",focus_end_body:"居然坚持下来了，不太像你啊…",break_end_title:"该干活了",break_end_body:"虽然我知道你不想，但还是开始吧…",reminder_title:"别装了",reminder_body:"「{task_title}」该做了，别再拖了"},strive:{style:"strive",focus_end_title:"专注完成！",focus_end_body:"又一个番茄被你征服！继续！",break_end_title:"休息结束！",break_end_body:"调整完毕，向下一个目标冲刺！",reminder_title:"时间到了！",reminder_body:"「{task_title}」——现在就是行动的时刻！"},funny:{style:"funny",focus_end_title:"终于停了！",focus_end_body:"番茄钟说：你该歇了，我也该歇了 😂",break_end_title:"歇够了？",break_end_body:"再不开始老板要扣工资了…你是自己的老板？那更得自律！🤣",reminder_title:"起来搬砖！",reminder_body:"「{task_title}」叫你回来干活了 🧱"},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}},xc={default:{style:"default",focus_end_title:"Focus Complete",focus_end_body:"Pomodoro finished. Take a break.",break_end_title:"Break Over",break_end_body:"Break ended — recharge and start your next focus.",reminder_title:"PomoFlow Task Reminder",reminder_body:'Task "{task_title}" reminder time has arrived'},cute:{style:"cute",focus_end_title:"Focus done~",focus_end_body:"Great job! Take a little break~ ✨",break_end_title:"Break over~",break_end_body:"Full of energy, keep it up!",reminder_title:"Time for a task~",reminder_body:'It’s time for "{task_title}", go check it~ ♪'},self_dep:{style:"self_dep",focus_end_title:"Another one down",focus_end_body:"You actually stuck with it — not very you…",break_end_title:"Back to work",break_end_body:"I know you don’t want to, but let’s begin…",reminder_title:"Stop pretending",reminder_body:'"{task_title}" is due — no more procrastinating'},strive:{style:"strive",focus_end_title:"Focus complete!",focus_end_body:"Another pomodoro conquered! Keep going!",break_end_title:"Break over!",break_end_body:"Recharged — sprint toward the next goal!",reminder_title:"Time’s up!",reminder_body:'"{task_title}" — act now!'},funny:{style:"funny",focus_end_title:"Finally stopped!",focus_end_body:"The pomodoro says: you should rest, so should I 😂",break_end_title:"Rested enough?",break_end_body:"If you don’t start now the boss will dock your pay… wait, you ARE the boss? Even more reason to be disciplined! 🤣",reminder_title:"Get back to work!",reminder_body:'"{task_title}" is calling you back to grind 🧱'},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}};function Tc(a,t,n){const r=t==="en"?xc:wc;if(a==="custom"){const l=r.default;return{focus_end_title:(n==null?void 0:n.focus_end_title)||l.focus_end_title,focus_end_body:(n==null?void 0:n.focus_end_body)||l.focus_end_body,break_end_title:(n==null?void 0:n.break_end_title)||l.break_end_title,break_end_body:(n==null?void 0:n.break_end_body)||l.break_end_body,reminder_title:(n==null?void 0:n.reminder_title)||l.reminder_title,reminder_body:(n==null?void 0:n.reminder_body)||l.reminder_body}}const c=r[a||"default"]??r.default;return{focus_end_title:c.focus_end_title,focus_end_body:c.focus_end_body,break_end_title:c.break_end_title,break_end_body:c.break_end_body,reminder_title:c.reminder_title,reminder_body:c.reminder_body}}function Vt(a,t,n,r){if(typeof t=="function"?a!==t||!r:!t.has(a))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(a):r?r.value:t.get(a)}function ur(a,t,n,r,o){if(typeof t=="function"?a!==t||!0:!t.has(a))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(a,n),n}var dn,va,jn,Gr;const Ri="__TAURI_TO_IPC_KEY__";function Gv(a,t=!1){return window.__TAURI_INTERNALS__.transformCallback(a,t)}class Kv{constructor(t){dn.set(this,void 0),va.set(this,0),jn.set(this,[]),Gr.set(this,void 0),ur(this,dn,t||(()=>{})),this.id=Gv(n=>{const r=n.index;if("end"in n){r==Vt(this,va,"f")?this.cleanupCallback():ur(this,Gr,r);return}const o=n.message;if(r==Vt(this,va,"f")){for(Vt(this,dn,"f").call(this,o),ur(this,va,Vt(this,va,"f")+1);Vt(this,va,"f")in Vt(this,jn,"f");){const c=Vt(this,jn,"f")[Vt(this,va,"f")];Vt(this,dn,"f").call(this,c),delete Vt(this,jn,"f")[Vt(this,va,"f")],ur(this,va,Vt(this,va,"f")+1)}Vt(this,va,"f")===Vt(this,Gr,"f")&&this.cleanupCallback()}else Vt(this,jn,"f")[r]=o})}cleanupCallback(){window.__TAURI_INTERNALS__.unregisterCallback(this.id)}set onmessage(t){ur(this,dn,t)}get onmessage(){return Vt(this,dn,"f")}[(dn=new WeakMap,va=new WeakMap,jn=new WeakMap,Gr=new WeakMap,Ri)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[Ri]()}}class Li{constructor(t,n,r){this.plugin=t,this.event=n,this.channelId=r}async unregister(){return Ae(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}}async function Sc(a,t,n){const r=new Kv(n);try{return await Ae(`plugin:${a}|register_listener`,{event:t,handler:r}),new Li(a,t,r.id)}catch{return await Ae(`plugin:${a}|registerListener`,{event:t,handler:r}),new Li(a,t,r.id)}}async function Ae(a,t={},n){return window.__TAURI_INTERNALS__.invoke(a,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const En=a=>Ae("list_tasks",{query:a}),Ss=(a,t)=>Ae("upsert_task",{task:a,tagIds:t}),Vv=a=>Ae("delete_task",{id:a}),Dc=a=>Ae("complete_task",{id:a}),Pc=a=>Ae("reopen_task",{id:a}),ti=()=>Ae("list_projects"),ho=a=>Ae("upsert_project",{project:a}),Mc=a=>Ae("delete_project",{id:a}),Jv=a=>Ae("reorder_projects",{items:a}),ai=()=>Ae("list_tags"),Oi=a=>Ae("upsert_tag",{tag:a}),Qv=a=>Ae("delete_tag",{id:a}),Xv=a=>Ae("reorder_tags",{items:a}),Zv=a=>Ae("list_tags_for_task",{taskId:a}),ef=(a,t)=>Ae("set_tags_for_task",{taskId:a,tagIds:t}),tf=(a,t,n)=>Ae("start_pomodoro",{taskId:a,projectId:t,duration:n}),Ec=(a,t)=>Ae("stop_pomodoro",{sessionId:a,isCompleted:t}),Bi=a=>Ae("get_daily_review",{date:a}),Cc=a=>Ae("upsert_daily_review",{review:a}),af=(a,t)=>Ae("list_daily_reviews",{startDate:a,endDate:t}),Nc=a=>Ae("delete_daily_review",{date:a}),nf=a=>Ae("upsert_weekly_review",{review:a}),jc=(a,t)=>Ae("list_weekly_reviews",{year:a,month:t}),rf=a=>Ae("delete_weekly_review",{weekStart:a}),of=a=>Ae("get_monthly_review",{yearMonth:a}),sf=a=>Ae("upsert_monthly_review",{review:a}),lf=a=>Ae("delete_monthly_review",{yearMonth:a}),Fc=a=>Ae("list_subtasks_for_task",{taskId:a}),Ds=a=>Ae("upsert_subtask",{subtask:a}),cf=a=>Ae("delete_subtask",{id:a}),Ac=()=>Ae("list_mottos"),df=a=>Ae("upsert_motto",{motto:a}),uf=a=>Ae("delete_motto",{id:a}),Ic=()=>Ae("get_notification_template"),vf=a=>Ae("upsert_notification_template",{template:a}),ff=(a,t)=>Ae("today_completed_minutes",{startMs:a,endMs:t}),zi=(a,t,n,r)=>Ae("stats_range",{startDate:a,endDate:t,group:n,tzOffsetMin:r}),hf=(a,t,n,r)=>Ae("stats_overview",{today:a,weekStart:t,monthStart:n,tzOffsetMin:r}),_f=(a,t,n,r)=>Ae("export_tasks_xlsx",{path:a,sheetName:t,headers:n,rows:r});var Ps;(function(a){a.Year="year",a.Month="month",a.TwoWeeks="twoWeeks",a.Week="week",a.Day="day",a.Hour="hour",a.Minute="minute",a.Second="second"})(Ps||(Ps={}));class pf{static at(t,n=!1,r=!1){return{at:{date:t,repeating:n,allowWhileIdle:r},interval:void 0,every:void 0}}static interval(t,n=!1){return{at:void 0,interval:{interval:t,allowWhileIdle:n},every:void 0}}static every(t,n,r=!1){return{at:void 0,interval:void 0,every:{interval:t,count:n,allowWhileIdle:r}}}}var Ms;(function(a){a[a.None=0]="None",a[a.Min=1]="Min",a[a.Low=2]="Low",a[a.Default=3]="Default",a[a.High=4]="High"})(Ms||(Ms={}));var Es;(function(a){a[a.Secret=-1]="Secret",a[a.Private=0]="Private",a[a.Public=1]="Public"})(Es||(Es={}));async function Co(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await Ae("plugin:notification|is_permission_granted")}async function No(){return await window.Notification.requestPermission()}function jo(a){typeof a=="string"?new window.Notification(a):new window.Notification(a.title,a)}async function gf(a){await Ae("plugin:notification|register_action_types",{types:a})}async function mf(){return await Ae("plugin:notification|get_pending")}async function bf(a){await Ae("plugin:notification|cancel",{notifications:a})}async function yf(){await Ae("plugin:notification|cancel")}async function kf(){return await Ae("plugin:notification|get_active")}async function wf(a){await Ae("plugin:notification|remove_active",{notifications:a})}async function xf(){await Ae("plugin:notification|remove_active")}async function Tf(a){await Ae("plugin:notification|create_channel",{...a})}async function Sf(a){await Ae("plugin:notification|delete_channel",{id:a})}async function Df(){return await Ae("plugin:notification|listChannels")}async function Pf(a){return await Sc("notification","notification",a)}async function Mf(a){return await Sc("notification","actionPerformed",a)}const Ef=Object.freeze(Object.defineProperty({__proto__:null,get Importance(){return Ms},Schedule:pf,get ScheduleEvery(){return Ps},get Visibility(){return Es},active:kf,cancel:bf,cancelAll:yf,channels:Df,createChannel:Tf,isPermissionGranted:Co,onAction:Mf,onNotificationReceived:Pf,pending:mf,registerActionTypes:gf,removeActive:wf,removeAllActive:xf,removeChannel:Sf,requestPermission:No,sendNotification:jo},Symbol.toStringTag,{value:"Module"})),qc="pomoflow-focus-count";let Pe=ze({mode:"focus",secondsLeft:Ja().focusDuration*60,running:!1,sessionId:null,activeTask:null,focusCompletedCount:Cf(),pendingCompletionMessage:null,todayCount:0,todayMinutes:0}),Fo=0,Ao=0,Cs=new Date().toDateString(),Tr=!1,fa=null;function Cf(){try{return parseInt(localStorage.getItem(qc)||"0",10)||0}catch{return 0}}function ni(){return Pe}function Nf(){return fa}async function Rc(){try{fa=await Ic()}catch{}}function jf(){var a;return((a=Pe.activeTask)==null?void 0:a.pomodoro_duration)??Ja().focusDuration}function zr(a){const t=Ja();return a==="focus"?jf()*60:a==="short_break"?t.shortBreakDuration*60:t.longBreakDuration*60}function Io(){!Pe.running&&Pe.sessionId===null&&(Pe.secondsLeft=zr(Pe.mode))}async function Xn(a,t,n){const r=n??Math.floor(zr(Pe.mode)/60),o=await tf(a,t,r);Pe.sessionId=o.id,n!==void 0&&(Pe.secondsLeft=n*60),Fo=Date.now(),Ao=Pe.secondsLeft,Pe.running=!0,Tr=!1}async function Ff(a){Pe.sessionId!==null&&await ri(!1),Pe.activeTask=a,Pe.mode="focus",Io(),await Xn(a.id,a.project_id??null,a.pomodoro_duration??void 0)}async function Af(a){Pe.activeTask=a,!Pe.running&&(Pe.sessionId!==null&&await ri(!1),Pe.mode="focus",Io(),await Xn(a.id,a.project_id??null,a.pomodoro_duration??void 0))}function Ko(){Pe.running&&(Pe.running=!1)}function Vo(){Pe.running||Pe.sessionId===null||(Fo=Date.now(),Ao=Pe.secondsLeft,Pe.running=!0)}async function ri(a){const t=Pe.sessionId;if(Pe.running=!1,Pe.sessionId=null,t!==null)try{await Ec(t,a)}catch(n){console.warn("stop pomodoro failed",n)}Pe.secondsLeft=zr(Pe.mode)}function _o(a){Pe.mode=a,Pe.running=!1,Pe.sessionId=null,Pe.secondsLeft=zr(a)}function If(){if(!Pe.running)return;const a=Math.floor((Date.now()-Fo)/1e3),t=Math.max(0,Ao-a);if(t<=0){Pe.secondsLeft=0,Pe.running=!1,Pe.sessionId!==null&&!Tr&&(Tr=!0,Lc());return}Pe.secondsLeft=t}function qf(){if(!Pe.running)return;const a=Math.floor((Date.now()-Fo)/1e3),t=Math.max(0,Ao-a);t<=0?(Pe.secondsLeft=0,Pe.running=!1,Pe.sessionId!==null&&!Tr&&(Tr=!0,Lc())):Pe.secondsLeft=t}function Rf(){Pe.pendingCompletionMessage=null}function Hi(a){Pe.activeTask=a,Io()}function Lf(){Io()}function Of(a){const t=new Date().toDateString();t!==Cs?(Cs=t,Pe.todayCount=1,Pe.todayMinutes=a):(Pe.todayCount+=1,Pe.todayMinutes+=a)}function Bf(a,t){Pe.todayCount=a,Pe.todayMinutes=t,Cs=new Date().toDateString()}async function Jo(){try{const a=new Date,t=a.getDay(),n=new Date(a);n.setDate(a.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0);const r=new Date(a.getFullYear(),a.getMonth(),1),o=l=>`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,c=await hf(o(a),o(n),o(r),-a.getTimezoneOffset());Bf(c.today_sessions,c.today_minutes)}catch(a){console.warn("sync today stats",a)}}let Ui=!1;function zf(){if(Ui||typeof window>"u")return;Ui=!0,Jo(),document.addEventListener("visibilitychange",()=>{document.hidden||Jo()});let a=new Date().toDateString();window.setInterval(()=>{const t=new Date().toDateString();t!==a&&(a=t,Jo())},6e4)}function Hf(a){const t=new Date;t.setHours(0,0,0,0);const n=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0,23,59,59,999),o={high:0,medium:1,low:2,none:3},c=a.filter(l=>{if(l.status!=="active"||!l.due_date)return!1;const i=new Date(l.due_date);if(isNaN(i.getTime())||i<n||i>r)return!1;const u=new Date(i);return u.setHours(0,0,0,0),u.getTime()<=t.getTime()});return c.sort((l,i)=>{const u=o[l.priority??"none"]??3,v=o[i.priority??"none"]??3;return u!==v?u-v:new Date(l.created_at??0).getTime()-new Date(i.created_at??0).getTime()}),c[0]??null}async function Uf(a,t){if(Ja().desktopNotificationEnabled)try{let n=await Co();if(n||(n=await No()==="granted"),!n)return;jo({title:a,body:t})}catch(n){console.warn("notification failed",n)}}async function Lc(){const a=Pe.mode,t=Math.floor(zr(a)/60),n=Pe.activeTask,r=Eo(),o=fa?{focus_end_title:fa.focus_end_title??void 0,focus_end_body:fa.focus_end_body??void 0,break_end_title:fa.break_end_title??void 0,break_end_body:fa.break_end_body??void 0,reminder_title:fa.reminder_title??void 0,reminder_body:fa.reminder_body??void 0}:null,c=Tc(fa==null?void 0:fa.style,r,o),l=a==="focus"?c.focus_end_title:c.break_end_title,i=a==="focus"?c.focus_end_body:c.break_end_body;await Uf(l,i),Pe.pendingCompletionMessage=i;const u=Pe.sessionId;if(Pe.running=!1,Pe.sessionId=null,u!==null)try{await Ec(u,!0)}catch(h){console.warn("stop pomodoro failed",h)}const v=Ja();if(a==="focus"){Pe.focusCompletedCount+=1;try{localStorage.setItem(qc,String(Pe.focusCompletedCount))}catch{}Of(t);let h=[];try{h=await En({status:null,limit:null})}catch(x){console.warn("refresh tasks failed",x)}const y=n?h.find(x=>x.id===n.id)??null:null;if(!v.disableBreak&&v.autoStartBreak){const S=Pe.focusCompletedCount%v.longBreakInterval===0,M=S?"long_break":"short_break",P=S?v.longBreakDuration:v.shortBreakDuration;_o(M),await Xn(null,(y==null?void 0:y.project_id)??(n==null?void 0:n.project_id)??null,P);return}await Wi(h,y,v.autoStartNextPomodoro);return}let _=[];try{_=await En({status:null,limit:null})}catch(h){console.warn("refresh tasks failed",h)}const m=n?_.find(h=>h.id===n.id)??null:null;await Wi(_,m,v.autoStartNextPomodoro)}async function Wi(a,t,n){if(t!==null&&t.status==="active"&&(t.completed_pomodoros??0)<(t.estimated_pomodoros??0)&&t){_o("focus"),Pe.activeTask=t,n&&await Xn(t.id,t.project_id??null,t.pomodoro_duration??void 0);return}t&&t.status==="completed"&&(Pe.activeTask=null);const o=Hf(a);Pe.activeTask=o,_o("focus"),o&&n&&await Xn(o.id,o.project_id??null,o.pomodoro_duration??void 0)}const Oc="pomoflow-fired-reminders",Wf=3e4,Yf=10080*60*1e3,$f={on_time:0,minutes5:5*6e4,minutes30:30*6e4,hour1:60*6e4,day1:1440*6e4,days2:2880*6e4};function Gf(){try{const a=localStorage.getItem(Oc);return a?JSON.parse(a):{}}catch{return{}}}function Kf(a){try{localStorage.setItem(Oc,JSON.stringify(a))}catch{}}function Bc(){const a=ni();return a.running&&a.mode==="focus"}async function Vf(a){const t=Nf(),n=Eo(),r=t?{reminder_title:t.reminder_title??void 0,reminder_body:t.reminder_body??void 0}:null,o=Tc(t==null?void 0:t.style,n,r),c=o.reminder_body.replace(/\{task_title\}/g,a.title);try{let l=await Co();if(l||(l=await No()==="granted"),!l)return;jo({title:o.reminder_title,body:c})}catch(l){console.warn("reminder notification failed",l)}}async function Jf(){const a=Date.now(),t=Gf();let n=!1,r=[];try{r=await En({status:"active",limit:null})}catch{return}const o=Bc();for(const l of r){if(l.status!=="active"||!l.reminder||l.reminder==="none"||!l.due_date)continue;const i=$f[l.reminder];if(i===void 0)continue;const u=new Date(l.due_date).getTime();if(Number.isNaN(u))continue;const v=u-i;if(v>a)continue;const _=`${l.id}:${v}`;t[_]||o||(t[_]=v,n=!0,await Vf(l))}const c=a-Yf;for(const l of Object.keys(t))t[l]<c&&(delete t[l],n=!0);n&&Kf(t)}let Yi=!1,$i=!1,Qo=!1;async function ao(){if(!Qo){Qo=!0;try{await Jf()}finally{Qo=!1}}}function Qf(){ao()}function Xf(){Yi||typeof window>"u"||(Yi=!0,ao(),window.setInterval(()=>void ao(),Wf),window.setInterval(()=>{const a=Bc();$i&&!a&&ao(),$i=a},1e3))}const Zf="/assets/preset-1-CBSgnW-Q.jpg",eh="/assets/preset-2-DV_n3pDN.jpg",th="/assets/preset-3-q3qAbjR3.jpg",ah="/assets/preset-4-B_bSN4WY.jpg",nh="/assets/preset-5-C1j6rp_Z.jpg",rh="/assets/preset-6-_4eNaNuV.jpg",oh="/assets/preset-7-D1OhqFGY.jpg",sh="/assets/preset-8-oFCsPykG.jpg",po=[{id:"preset-bg-1",url:`url(${Zf})`},{id:"preset-bg-2",url:`url(${eh})`},{id:"preset-bg-3",url:`url(${th})`},{id:"preset-bg-4",url:`url(${ah})`},{id:"preset-bg-5",url:`url(${nh})`},{id:"preset-bg-6",url:`url(${rh})`},{id:"preset-bg-7",url:`url(${oh})`},{id:"preset-bg-8",url:`url(${sh})`}],ih=po.map(a=>a.id);function lh(a){return ih.includes(a)}function ch(a){var t;return((t=po.find(n=>n.id===a))==null?void 0:t.url)??""}const zc=[{id:"default",name:"默认",preview:"linear-gradient(160deg, #faf8f5, #ede4d8)"},{id:"sunny",name:"暖阳",preview:"linear-gradient(160deg, #fffbf5, #fde4c2)"},{id:"ocean",name:"海洋",preview:"linear-gradient(160deg, #f2f7fb, #c8dcf0)"},{id:"forest",name:"森林",preview:"linear-gradient(160deg, #f3f7f1, #cde0c6)"},{id:"dusk",name:"黄昏",preview:"linear-gradient(160deg, #fdf7f1, #edd0bc)"},{id:"lavender",name:"薰衣草",preview:"linear-gradient(160deg, #f8f5fb, #dcc8ed)"},{id:"evening",name:"暮色",preview:"linear-gradient(160deg, #f6f3f0, #d8cbbe)"},{id:"teal",name:"青石",preview:"linear-gradient(160deg, #f3f7f6, #c4dad5)"}],dh=zc.map(a=>a.id);function uh(a){return dh.includes(a)}const Hc="pomoflow-theme",oi="preset-bg-1";function Xo(){return{theme:"default",background:{kind:"preset",id:oi}}}function vh(a){return a?a.kind==="preset"?`preset:${a.id}`:a.url:""}function fh(){if(typeof localStorage>"u")return Xo();try{const a=localStorage.getItem(Hc);if(!a||!a.startsWith("{"))return Xo();const t=JSON.parse(a),n=typeof t.theme=="string"&&uh(t.theme)?t.theme:"default",r=typeof t.background=="string"?t.background:"";if(r.startsWith("preset:")){const o=r.slice(7);if(lh(o))return{theme:n,background:{kind:"preset",id:o}}}return r.startsWith("url(")?{theme:n,background:{kind:"custom",url:r}}:{theme:n,background:{kind:"preset",id:oi}}}catch{return Xo()}}function Hr(a){if(!(typeof localStorage>"u"))try{localStorage.setItem(Hc,JSON.stringify({theme:a.theme,background:vh(a.background)}))}catch{}}function hh(a){return a?a.kind==="preset"?ch(a.id):a.url:null}let Ga=H("default"),Ka=H(null);function or(){if(typeof document>"u")return;const a=document.documentElement;a.setAttribute("data-theme",e(Ga));const t=hh(e(Ka));t?a.style.setProperty("--bg-page",t):a.style.removeProperty("--bg-page")}function _h(){const a=fh();f(Ga,a.theme,!0),f(Ka,a.background,!0),or()}function ph(){return e(Ga)}function gh(){return e(Ka)}function mh(a){f(Ga,a,!0),Hr({theme:a,background:e(Ka)}),or()}function bh(a){const t={kind:"preset",id:a};f(Ka,t,!0),Hr({theme:e(Ga),background:t}),or()}function yh(a){if(!a.startsWith("url("))return;const t={kind:"custom",url:a};f(Ka,t,!0),Hr({theme:e(Ga),background:t}),or()}function Zo(){f(Ka,null),Hr({theme:e(Ga),background:null}),or()}function es(){f(Ga,"default"),f(Ka,{kind:"preset",id:oi},!0),Hr({theme:e(Ga),background:e(Ka)}),or()}function kh(a){return new Promise(t=>{const n=new FileReader;n.onerror=()=>t(null),n.onload=()=>{const r=new Image;r.onerror=()=>t(null),r.onload=()=>{try{const c=Math.min(1,1920/Math.max(r.width,r.height)),l=Math.max(1,Math.round(r.width*c)),i=Math.max(1,Math.round(r.height*c)),u=document.createElement("canvas");u.width=l,u.height=i;const v=u.getContext("2d");if(!v)return t(null);v.drawImage(r,0,0,l,i),t(`url(${u.toDataURL("image/jpeg",.8)})`)}catch{t(null)}},r.src=String(n.result)},n.readAsDataURL(a)})}var wh=Va('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function Uc(a,t){let n=ma(t,"size",3,14),r=ma(t,"filled",3,!0);var o=wh(),c=s(o);E(()=>{A(o,"width",n()),A(o,"height",n()),A(c,"fill",r()?"currentColor":"#e5e7eb")}),g(a,o)}const xh=ze({project:null,tag:null,priority:null,date:null});var Th=C('<textarea class="review-textarea svelte-1na66lg"></textarea>');function go(a,t){_t(t,!0);const n=F(mt);let r=ma(t,"rows",3,2),o=H(ze(Wt(()=>t.value??"")));St(()=>{const i=t.value??"";Wt(()=>{i!==e(o)&&f(o,i,!0)})});function c(){const i=e(o).trim();i===""?t.value&&t.onDelete&&t.onDelete():i!==(t.value??"")&&t.onSave(i)}var l=Th();E(()=>{A(l,"placeholder",t.placeholder??e(n).common.reviewPlaceholder),A(l,"aria-label",t.ariaLabel??t.placeholder??e(n).common.reviewPlaceholder),A(l,"rows",r())}),yt("blur",l,c),kt(l,()=>e(o),i=>f(o,i)),g(a,l),pt()}const Gi=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function Ki(){return Gi[Math.floor(Math.random()*Gi.length)]}const Wc=ze({n:0});function Vi(){Wc.n+=1}var Sh=C('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985"><!></button></div></div>');function Dh(a,t){_t(t,!0);const n=F(mt);let r=H(ze([])),o=H(ze(new Set)),c=H(null);async function l(){try{f(r,await Ac(),!0)}catch{f(r,[],!0)}}ln(()=>{l()}),St(()=>{Wc.n,l()}),St(()=>{var m;if(!e(c))if(e(r).length>0){const h=e(r)[0];f(c,{text:h.text,author:(m=h.author)!=null&&m.trim()?h.author:e(n).settings.motto.defaultAuthor},!0);const y=new Set(e(o));y.add(h.id),f(o,y,!0)}else f(c,Ki(),!0)});function i(){var m;if(e(r).length>0){let h=e(r).filter(S=>!e(o).has(S.id));h.length===0&&(f(o,new Set,!0),h=e(r));const y=h[0];f(c,{text:y.text,author:(m=y.author)!=null&&m.trim()?y.author:e(n).settings.motto.defaultAuthor},!0);const x=new Set(e(o));x.add(y.id),f(o,x,!0)}else f(c,Ki(),!0)}var u=qe(),v=Ee(u);{var _=m=>{var h=Sh(),y=s(h),x=s(y),S=s(x);pc(S,{size:20});var M=d(x,2),P=s(M),Y=s(P),T=d(P,2),L=s(T),k=d(M,2),D=s(k);kv(D,{size:14}),E(()=>{p(Y,e(c).text),p(L,`—— ${e(c).author??""}`),A(k,"aria-label",e(n).timer.mottoRefresh),A(k,"title",e(n).timer.mottoRefresh)}),G("click",k,i),g(m,h)};se(v,m=>{e(c)&&m(_)})}g(a,u),pt()}xt(["click"]);var Ph=C('<div class="empty svelte-1qmsx7e"> </div>'),Mh=C('<button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-main svelte-1qmsx7e"><span class="item-title svelte-1qmsx7e"> </span> <span class="item-sub svelte-1qmsx7e"> </span></span> <span class="pri-dot svelte-1qmsx7e"></span></button>'),Eh=C('<button type="button" class="backdrop svelte-1qmsx7e" aria-hidden="true" tabindex="-1"></button> <div class="menu svelte-1qmsx7e" role="listbox"><button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-title svelte-1qmsx7e"> </span></button> <!> <!></div>',1),Ch=C('<div class="selector svelte-1qmsx7e"><button type="button" class="trigger svelte-1qmsx7e" aria-haspopup="listbox"><span class="trigger-label svelte-1qmsx7e"> </span> <!></button> <!></div>');function Nh(a,t){_t(t,!0);const n=F(mt);let r=H(!1);const o={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};function c(y){t.onSelect(y),f(r,!1)}var l=Ch(),i=s(l),u=s(i),v=s(u),_=d(u,2);{let y=F(()=>"chev"+(e(r)?" open":""));Vn(_,{size:16,get class(){return e(y)}})}var m=d(i,2);{var h=y=>{var x=Eh(),S=Ee(x),M=d(S,2),P=s(M),Y=s(P),T=s(Y);{var L=re=>{Wa(re,{size:16})};se(T,re=>{t.activeTask||re(L)})}var k=d(Y,2),D=s(k),I=d(P,2);{var ie=re=>{var te=Ph(),ce=s(te);E(()=>p(ce,e(n).timer.noTodoTask)),g(re,te)};se(I,re=>{t.tasks.length===0&&re(ie)})}var ae=d(I,2);Me(ae,17,()=>t.tasks,re=>re.id,(re,te)=>{var ce=Mh(),$=s(ce),j=s($);{var U=q=>{Wa(q,{size:16})};se(j,q=>{var W;((W=t.activeTask)==null?void 0:W.id)===e(te).id&&q(U)})}var J=d($,2),he=s(J),be=s(he),Z=d(he,2),de=s(Z),ke=d(J,2);E(()=>{var q;A(ce,"aria-selected",((q=t.activeTask)==null?void 0:q.id)===e(te).id),p(be,e(te).title),p(de,`${e(te).completed_pomodoros??0??""}/${e(te).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`),At(ke,`background-color: ${o[e(te).priority??"none"]??o.none??""}`)}),G("click",ce,()=>c(e(te))),g(re,ce)}),E(()=>{A(P,"aria-selected",t.activeTask===null),p(D,e(n).timer.noSpecificTask)}),G("click",S,()=>f(r,!1)),G("click",P,()=>c(null)),g(y,x)};se(m,y=>{e(r)&&y(h)})}E(()=>{A(i,"aria-expanded",e(r)),p(v,t.activeTask?t.activeTask.title:e(n).timer.selectTask)}),G("click",i,()=>f(r,!e(r))),g(a,l),pt()}xt(["click"]);//! 截止时间（due_date）相关工具。
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
function mo(a){return!!a&&a.includes("T")}function Ht(a){return a?a.includes("T")?js(a).slice(0,10):a.slice(0,10):""}function Aa(){const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function jh(){const a=new Date;return`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`}function Ns(a){return`${Ht(a)||Aa()}T${jh()}`}function no(){const a=new Date;return a.setDate(a.getDate()+1),`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function js(a){if(!a)return"";try{const t=new Date(a);if(isNaN(t.getTime()))return"";const n=t.getTimezoneOffset();return new Date(t.getTime()-n*6e4).toISOString().slice(0,16)}catch{return""}}function Fs(a){if(!a)return null;try{const t=new Date(a);return isNaN(t.getTime())?null:t.toISOString()}catch{return null}}var Ji=C("<option> </option>"),Qi=C('<button type="button"> </button>'),Fh=C('<button type="button" class="clear svelte-13vcwbh"> </button>'),Ah=C('<div class="empty svelte-13vcwbh"> </div>'),Ih=C('<button type="button" class="expander svelte-13vcwbh"><!></button>'),qh=C('<span class="expander-placeholder svelte-13vcwbh"></span>'),ts=C('<span class="meta-item svelte-13vcwbh"> </span>'),Rh=C('<button type="button" class="start svelte-13vcwbh"><!></button>'),Lh=C('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),Oh=C('<div class="subs svelte-13vcwbh"></div>'),Bh=C('<div><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),zh=C('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh"> </h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh"> </span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh"> </h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project"> </label> <select id="timer-filter-project" class="svelte-13vcwbh"><option> </option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag"> </label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option> </option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function Hh(a,t){_t(t,!0);const n=F(mt),r={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let o=H(ze(new Set));function c(z){const b=new Set(e(o));b.has(z)?b.delete(z):b.add(z),f(o,b,!0)}function l(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const i=F(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),u=["high","medium","low"],v=F(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low})),_=["today","tomorrow","this_week"],m=F(()=>({today:e(n).filter.today,tomorrow:e(n).filter.tomorrow,this_week:e(n).filter.thisWeek}));function h(z){var b;return z?((b=t.projects.find(w=>w.id===z))==null?void 0:b.name)??"":""}var y=zh(),x=s(y),S=s(x),M=s(S),P=s(M),Y=d(M,2),T=s(Y),L=s(T),k=d(T,2),D=s(k),I=d(S,2),ie=s(I),ae=s(ie),re=d(ie,2),te=s(re),ce=s(te),$=s(ce),j=d(ce,2),U=s(j),J=s(U);U.value=U.__value="";var he=d(U);Me(he,17,()=>t.projects,z=>z.id,(z,b)=>{var w=Ji(),X=s(w),R={};E(()=>{p(X,e(b).name),R!==(R=e(b).id)&&(w.value=(w.__value=e(b).id)??"")}),g(z,w)});var be;Bt(j);var Z=d(te,2),de=s(Z),ke=s(de),q=d(de,2),W=s(q),B=s(W);W.value=W.__value="";var Q=d(W);Me(Q,17,()=>t.tags,z=>z.id,(z,b)=>{var w=Ji(),X=s(w),R={};E(()=>{p(X,e(b).name),R!==(R=e(b).id)&&(w.value=(w.__value=e(b).id)??"")}),g(z,w)});var pe;Bt(q);var ge=d(re,2),fe=s(ge),_e=s(fe),O=d(fe,2);Me(O,20,()=>u,z=>z,(z,b)=>{var w=Qi();let X;var R=s(w);E(()=>{X=at(w,1,"opt svelte-13vcwbh",null,X,{active:t.filter.priority===b}),p(R,e(v)[b])}),G("click",w,()=>t.onFilterChange({priority:t.filter.priority===b?null:b})),g(z,w)});var ne=d(O,2),ue=s(ne),we=d(ne,2);Me(we,20,()=>_,z=>z,(z,b)=>{var w=Qi();let X;var R=s(w);E(()=>{X=at(w,1,"opt svelte-13vcwbh",null,X,{active:t.filter.date===b}),p(R,e(m)[b])}),G("click",w,()=>t.onFilterChange({date:t.filter.date===b?null:b})),g(z,w)});var Ne=d(ge,2);{var je=z=>{var b=Fh(),w=s(b);E(()=>p(w,e(n).timer.clearFilter)),G("click",b,l),g(z,b)};se(Ne,z=>{e(i)&&z(je)})}var We=d(x,2),Ke=s(We);{var Ye=z=>{var b=Ah(),w=s(b);E(()=>p(w,e(n).timer.noTask)),g(z,b)};se(Ke,z=>{t.tasks.length===0&&z(Ye)})}var V=d(Ke,2);Me(V,17,()=>t.tasks,z=>z.id,(z,b)=>{const w=F(()=>e(b).status==="completed"),X=F(()=>{var He;return(((He=e(b).subtasks)==null?void 0:He.length)??0)>0}),R=F(()=>e(o).has(e(b).id)),K=F(()=>e(X)?(e(b).subtasks??[]).filter(He=>He.is_completed).length:0),ve=F(()=>h(e(b).project_id));var oe=Bh();let ye;var me=s(oe),Ie=s(me);{var it=He=>{var Fe=Ih(),dt=s(Fe);{var ee=Le=>{Vn(Le,{size:14})},Se=Le=>{Jn(Le,{size:14})};se(dt,Le=>{e(R)?Le(ee):Le(Se,-1)})}E(()=>A(Fe,"aria-label",e(R)?e(n).timer.collapseSubtasks:e(n).timer.expandSubtasks)),G("click",Fe,()=>c(e(b).id)),g(He,Fe)},lt=He=>{var Fe=qh();g(He,Fe)};se(Ie,He=>{e(X)?He(it):He(lt,-1)})}var ft=d(Ie,2),rt=d(ft,2),Ve=s(rt);let Oe;var Be=s(Ve),Ce=d(Ve,2),Te=s(Ce),nt=s(Te),ct=d(Te,2);{var Dt=He=>{var Fe=ts(),dt=s(Fe);E(()=>{var ee;return p(dt,`· ${e(K)??""}/${((ee=e(b).subtasks)==null?void 0:ee.length)??0??""}`)}),g(He,Fe)};se(ct,He=>{e(X)&&He(Dt)})}var zt=d(ct,2);{var Jt=He=>{var Fe=ts(),dt=s(Fe);E(()=>p(dt,e(ve))),g(He,Fe)};se(zt,He=>{e(ve)&&He(Jt)})}var ua=d(zt,2);{var tt=He=>{var Fe=ts(),dt=s(Fe);E(ee=>p(dt,ee),[()=>Ht(e(b).due_date)]),g(He,Fe)};se(ua,He=>{e(b).due_date&&He(tt)})}var gt=d(rt,2);{var ht=He=>{var Fe=Rh(),dt=s(Fe);fo(dt,{size:10,color:"#fff",fill:"#fff"}),E(()=>{A(Fe,"aria-label",e(n).timer.startTooltip),A(Fe,"title",e(n).timer.startTooltip)}),G("click",Fe,()=>t.onStartTask(e(b))),g(He,Fe)};se(gt,He=>{e(w)||He(ht)})}var Nt=d(me,2);{var Pt=He=>{var Fe=Oh();Me(Fe,21,()=>e(b).subtasks??[],dt=>dt.id,(dt,ee)=>{var Se=Lh();let Le;var Je=s(Se),Tt=d(Je,2),xe=s(Tt);E(()=>{Le=at(Se,1,"sub-row svelte-13vcwbh",null,Le,{done:e(ee).is_completed}),Js(Je,e(ee).is_completed),p(xe,e(ee).title)}),G("change",Je,ot=>t.onToggleSubtask(e(ee).id,ot.currentTarget.checked)),g(dt,Se)}),g(He,Fe)};se(Nt,He=>{e(X)&&e(R)&&He(Pt)})}E(()=>{ye=at(oe,1,"task-card svelte-13vcwbh",null,ye,{active:e(b).id===t.activeTaskId}),At(ft,`background-color: ${r[e(b).priority||"none"]??r.none??""}`),Oe=at(Ve,1,"title svelte-13vcwbh",null,Oe,{done:e(w)}),p(Be,e(b).title),p(nt,`${e(b).completed_pomodoros??0??""}/${e(b).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`)}),g(z,oe)}),E(()=>{p(P,e(n).timer.todayFocus),p(L,t.todayMinutes),p(D,e(n).timer.minute),p(ae,e(n).timer.taskList),p($,e(n).filter.project),p(J,e(n).filter.all),be!==(be=t.filter.project??"")&&(j.value=(j.__value=t.filter.project??"")??"",It(j,t.filter.project??"")),p(ke,e(n).filter.tag),p(B,e(n).filter.all),pe!==(pe=t.filter.tag??"")&&(q.value=(q.__value=t.filter.tag??"")??"",It(q,t.filter.tag??"")),p(_e,e(n).filter.priority),p(ue,e(n).filter.date)}),G("change",j,z=>t.onFilterChange({project:z.currentTarget.value||null})),G("change",q,z=>t.onFilterChange({tag:z.currentTarget.value||null})),g(a,y),pt()}xt(["change","click"]);var Uh=C('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt"> </h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button"> </button></div></div>');function Wh(a,t){_t(t,!0);const n=F(mt);function r(u){u.target===u.currentTarget&&t.onClose()}function o(u){u.key==="Escape"&&t.onClose()}var c=qe();yt("keydown",gs,function(...u){var v;(v=t.open?o:void 0)==null||v.apply(this,u)});var l=Ee(c);{var i=u=>{var v=Uh(),_=s(v),m=d(s(_),2),h=s(m),y=d(m,2),x=s(y),S=d(y,2),M=s(S);E(()=>{p(h,e(n).timer.modalTitle),p(x,t.message),p(M,e(n).common.confirm)}),G("click",v,r),G("click",S,function(...P){var Y;(Y=t.onClose)==null||Y.apply(this,P)}),g(u,v)};se(l,u=>{t.open&&u(i)})}g(a,c),pt()}xt(["click"]);var Yh=C('<span class="pomo-count svelte-17qnxlg"> </span>'),$h=C('<div class="error svelte-17qnxlg" role="alert"> </div>'),Gh=C('<button class="btn pause svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Kh=C('<button class="btn primary svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Vh=C('<button class="btn primary svelte-17qnxlg"><!> </button>'),Jh=C('<div class="layout page-veil svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="halo svelte-17qnxlg" aria-hidden="true"></div> <div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist"><button role="tab"> </button> <button role="tab"> </button> <button role="tab"> </button></div> <!> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><defs class="svelte-17qnxlg"><linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%" class="svelte-17qnxlg"><stop offset="0%" stop-color="var(--color-accent-400, #e29676)" class="svelte-17qnxlg"></stop><stop offset="100%" stop-color="var(--color-accent-600, #c9552d)" class="svelte-17qnxlg"></stop></linearGradient></defs><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none" stroke-linecap="round" stroke="url(#ring-gradient)"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-row svelte-17qnxlg"><span class="mode-label svelte-17qnxlg"> </span> <!></div></div></div> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> <b class="svelte-17qnxlg"> </b> </div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg"> </div> <!></div> <!></div></div> <!> <!></div>');function Xi(a,t){_t(t,!0);let n=H(ze([])),r=H(ze([])),o=H(ze([])),c=H(ze([])),l=H(null),i=H(0),u=H(null),v=H(!1);const _=xh,m=F(ni),h=F(mt),y=F(()=>{var Se;const ee=Ja();return e(m).mode==="focus"?(((Se=e(m).activeTask)==null?void 0:Se.pomodoro_duration)??ee.focusDuration)*60:e(m).mode==="short_break"?ee.shortBreakDuration*60:ee.longBreakDuration*60}),x=F(()=>e(y)>0?1-e(m).secondsLeft/e(y):0),S=F(()=>Math.floor(e(m).secondsLeft/60)),M=F(()=>e(m).secondsLeft%60),P=F(()=>`${String(e(S)).padStart(2,"0")}:${String(e(M)).padStart(2,"0")}`),Y=F(()=>e(m).activeTask),T=F(()=>!e(m).running&&e(m).sessionId===null&&!e(v)),L=F(()=>e(m).mode==="focus"),k=F(()=>e(m).mode==="focus"?e(h).mode.focusing:e(m).mode==="short_break"?e(h).mode.shortBreak:e(h).mode.longBreak);function D(){const ee=new Date,Se=new Date(ee.getFullYear(),ee.getMonth(),ee.getDate(),0,0,0,0),Le=new Date(ee.getFullYear(),ee.getMonth(),ee.getDate()+1,0,0,0,0);return{startMs:Se.getTime(),endMs:Le.getTime()}}function I(){const ee=new Date,Se=new Date(ee.getFullYear(),ee.getMonth(),1,0,0,0,0),Je=new Date(ee.getFullYear(),ee.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:Se.getTime(),monthEndMs:Je}}function ie(){const ee=new Date;return`${ee.getFullYear()}-${String(ee.getMonth()+1).padStart(2,"0")}-${String(ee.getDate()).padStart(2,"0")}`}St(()=>{e(m).todayCount,j(),te(),ce()}),St(()=>{e(m).activeTask&&e(m).activeTask.status==="completed"&&Hi(null)});async function ae(){try{f(n,await ti(),!0)}catch(ee){console.warn("refresh projects",ee)}}async function re(){try{f(r,await ai(),!0)}catch(ee){console.warn("refresh tags",ee)}}async function te(){try{const ee=I(),Se=await En({status:null,month_start_ms:ee.monthStartMs,month_end_ms:ee.monthEndMs,project_id:_.project,tag_id:_.tag,priority:_.priority,date:_.date,tz_offset_min:-new Date().getTimezoneOffset(),limit:null}),Le={high:0,medium:1,low:2,none:3};f(o,Se.sort((Je,Tt)=>{if(Je.status!==Tt.status)return Je.status==="active"?-1:1;const xe=Le[Je.priority??"none"]??3,ot=Le[Tt.priority??"none"]??3;return xe!==ot?xe-ot:new Date(Je.created_at??0).getTime()-new Date(Tt.created_at??0).getTime()}),!0)}catch(ee){console.warn("refresh tasks",ee)}}async function ce(){try{const ee=await En({status:"active",limit:null}),Se={high:0,medium:1,low:2,none:3};f(c,ee.sort((Le,Je)=>{const Tt=Se[Le.priority??"none"]??3,xe=Se[Je.priority??"none"]??3;return Tt!==xe?Tt-xe:new Date(Le.created_at??0).getTime()-new Date(Je.created_at??0).getTime()}),!0)}catch(ee){console.warn("refresh active tasks",ee)}}async function $(){try{const ee=await Bi(ie());f(l,(ee==null?void 0:ee.content)??null,!0)}catch(ee){console.warn("refresh review",ee)}}async function j(){try{const ee=D();f(i,await ff(ee.startMs,ee.endMs),!0)}catch(ee){console.warn("refresh minutes",ee)}}St(()=>{_.project,_.tag,_.priority,_.date,te()}),ln(async()=>{await Promise.all([ae(),re(),te(),ce(),$(),j()])});async function U(){var ee,Se,Le;if(e(T)){f(v,!0),f(u,null);try{await Xn(((ee=e(Y))==null?void 0:ee.id)??null,((Se=e(Y))==null?void 0:Se.project_id)??null,((Le=e(Y))==null?void 0:Le.pomodoro_duration)??void 0)}catch(Je){f(u,String(Je),!0)}finally{f(v,!1)}}}async function J(){try{await ri(!1)}catch(ee){f(u,String(ee),!0)}}function he(ee){_o(ee)}async function be(ee){try{await Ff(ee)}catch(Se){f(u,String(Se),!0)}}function Z(ee){Hi(ee)}async function de(ee,Se){try{const Le=await Promise.all(e(o).map(Tt=>Fc(Tt.id)));let Je=null;for(const Tt of Le){const xe=Tt.find(ot=>ot.id===ee);if(xe){Je=xe;break}}if(!Je)return;await Ds({...Je,is_completed:Se}),await te(),await j()}catch(Le){console.warn("toggle subtask",Le)}}async function ke(ee){try{const Se=ie(),Le=await Bi(Se),Je=Le?{...Le,content:ee}:{id:crypto.randomUUID(),date:Se,content:ee,updated_at:new Date().toISOString()};await Cc(Je),f(l,ee,!0)}catch(Se){console.warn("save review",Se)}}async function q(){try{await Nc(ie()),f(l,null)}catch(ee){console.warn("delete review",ee)}}const W=262,B=8,Q=(W-B)/2,pe=2*Math.PI*Q,ge=F(()=>pe*(1-e(x)));var fe=Jh();Or("17qnxlg",ee=>{qr(()=>{nr.title=e(h).page.timer??""})});var _e=s(fe),O=d(s(_e),2),ne=s(O),ue=s(ne);let we;var Ne=s(ue),je=d(ue,2);let We;var Ke=s(je),Ye=d(je,2);let V;var z=s(Ye),b=d(ne,2);{var w=ee=>{Nh(ee,{get tasks(){return e(c)},get activeTask(){return e(Y)},onSelect:Z})};se(b,ee=>{e(L)&&ee(w)})}var X=d(b,2),R=s(X);A(R,"width",W),A(R,"height",W),A(R,"viewBox","0 0 262 262");var K=d(s(R));A(K,"cx",W/2),A(K,"cy",W/2),A(K,"r",Q),A(K,"stroke-width",B);var ve=d(K);A(ve,"cx",W/2),A(ve,"cy",W/2),A(ve,"r",Q),A(ve,"stroke-width",B),A(ve,"stroke-dasharray",pe),A(ve,"transform","rotate(-90 131 131)");var oe=d(R,2),ye=s(oe),me=s(ye),Ie=d(ye,2),it=s(Ie),lt=s(it),ft=d(it,2);{var rt=ee=>{var Se=Yh(),Le=s(Se);E(()=>{var Je,Tt;return p(Le,`${((Je=e(Y))==null?void 0:Je.completed_pomodoros)??0??""}/${((Tt=e(Y))==null?void 0:Tt.estimated_pomodoros)??0??""} ${e(h).timer.pomodoros??""}`)}),g(ee,Se)};se(ft,ee=>{e(L)&&ee(rt)})}var Ve=d(X,2);{var Oe=ee=>{var Se=$h(),Le=s(Se);E(()=>p(Le,`⚠ ${e(u)??""}`)),g(ee,Se)};se(Ve,ee=>{e(u)&&ee(Oe)})}var Be=d(Ve,2),Ce=s(Be);{var Te=ee=>{var Se=Gh(),Le=Ee(Se),Je=s(Le);yv(Je,{size:18,fill:"currentColor"});var Tt=d(Je),xe=d(Le,2),ot=s(xe);Pv(ot,{size:16});var bt=d(ot);E(()=>{p(Tt,` ${e(h).timer.pause??""}`),p(bt,` ${e(h).timer.skip??""}`)}),G("click",Le,function(...Kt){Ko==null||Ko.apply(this,Kt)}),G("click",xe,J),g(ee,Se)},nt=ee=>{var Se=Kh(),Le=Ee(Se),Je=s(Le);fo(Je,{size:18,fill:"currentColor"});var Tt=d(Je),xe=d(Le,2),ot=s(xe);Mv(ot,{size:16});var bt=d(ot);E(()=>{p(Tt,` ${e(h).timer.resume??""}`),p(bt,` ${e(h).timer.abandon??""}`)}),G("click",Le,function(...Kt){Vo==null||Vo.apply(this,Kt)}),G("click",xe,J),g(ee,Se)},ct=ee=>{var Se=Vh(),Le=s(Se);fo(Le,{size:18,fill:"currentColor"});var Je=d(Le);E(()=>{Se.disabled=!e(T),p(Je,` ${(e(v)?e(h).timer.starting:e(L)?e(h).timer.start:e(h).timer.startBreak)??""}`)}),G("click",Se,U),g(ee,Se)};se(Ce,ee=>{e(m).running?ee(Te):e(m).sessionId?ee(nt,1):ee(ct,-1)})}var Dt=d(Be,2),zt=d(s(Dt)),Jt=d(zt),ua=s(Jt),tt=d(Jt),gt=d(Dt,2),ht=s(gt),Nt=s(ht),Pt=d(ht,2);go(Pt,{get value(){return e(l)},get placeholder(){return e(h).timer.reviewPlaceholder},rows:2,onSave:ke,onDelete:q});var He=d(gt,2);Dh(He,{});var Fe=d(_e,2);{let ee=F(()=>{var Se;return((Se=e(m).activeTask)==null?void 0:Se.id)??null});Hh(Fe,{get todayMinutes(){return e(i)},get projects(){return e(n)},get tags(){return e(r)},get tasks(){return e(o)},get activeTaskId(){return e(ee)},get filter(){return _},onFilterChange:Se=>Object.assign(_,Se),onStartTask:be,onToggleSubtask:de})}var dt=d(Fe,2);{let ee=F(()=>e(m).pendingCompletionMessage!==null),Se=F(()=>e(m).pendingCompletionMessage??"");Wh(dt,{get open(){return e(ee)},get message(){return e(Se)},get onClose(){return Rf}})}E(()=>{A(ne,"aria-label",e(h).timer.modeTabsAria),we=at(ue,1,"mode-tab svelte-17qnxlg",null,we,{active:e(m).mode==="focus"}),A(ue,"aria-selected",e(m).mode==="focus"),p(Ne,e(h).mode.focus),We=at(je,1,"mode-tab svelte-17qnxlg",null,We,{active:e(m).mode==="short_break"}),A(je,"aria-selected",e(m).mode==="short_break"),p(Ke,e(h).mode.shortBreak),V=at(Ye,1,"mode-tab svelte-17qnxlg",null,V,{active:e(m).mode==="long_break"}),A(Ye,"aria-selected",e(m).mode==="long_break"),p(z,e(h).mode.longBreak),A(ve,"stroke-dashoffset",e(ge)),p(me,e(P)),p(lt,e(k)),p(zt,` ${e(h).timer.todayDone??""} `),p(ua,e(m).todayCount),p(tt,` ${e(h).timer.pomodoroUnit??""}`),p(Nt,e(h).timer.reviewTitle)}),G("click",ue,()=>he("focus")),G("click",je,()=>he("short_break")),G("click",Ye,()=>he("long_break")),g(a,fe),pt()}xt(["click"]);async function Qh(a={}){return typeof a=="object"&&Object.freeze(a),await Ae("plugin:dialog|save",{options:a})}var Xh=C('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <span class="filter-stats svelte-qbpxhc"> </span></button>'),Zh=C('<button type="button" class="add-root svelte-qbpxhc"><!></button>'),e_=C('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),t_=C('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),a_=C('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),n_=C('<span class="expand-spacer svelte-qbpxhc"></span>'),r_=C('<button type="button" class="more-btn svelte-qbpxhc"><!></button>'),o_=C('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),s_=C('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Zi=C('<button type="button" class="ctx-item svelte-qbpxhc"><!> </button>'),i_=C('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> </button>'),l_=C('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),c_=C('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),d_=C('<div class="empty-hint svelte-qbpxhc"> </div>'),u_=C('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),v_=C('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> </button> <!></div> <!></div></aside>');function f_(a,t){_t(t,!0);const n=F(mt);let r=ma(t,"search",3,""),o=H(!0),c=H(ze(new Set)),l=H(null),i=H(null),u=H(""),v=H(null),_=H("");function m(q){const W=q.getDay(),B=W===0?-6:1-W,Q=new Date(q);return Q.setDate(Q.getDate()+B),Q.setHours(0,0,0,0),Q}function h(q){const W=m(q),B=new Date(W);return B.setDate(B.getDate()+6),B.setHours(23,59,59,999),B}function y(q,W){if(W==="journal")return{timeStr:"",count:0};const B=Aa(),Q=no(),pe=m(new Date),ge=h(new Date);let fe=q;W==="today"&&(fe=q.filter(we=>Ht(we.due_date)===B)),W==="tomorrow"&&(fe=q.filter(we=>Ht(we.due_date)===Q)),W==="week"&&(fe=q.filter(we=>{if(!we.due_date)return!1;const Ne=new Date(we.due_date);return Ne>=pe&&Ne<=ge})),W==="planned"&&(fe=q.filter(we=>we.due_date!==null&&we.due_date!==void 0)),W==="completed"&&(fe=q.filter(we=>we.status==="completed"));const _e=fe.reduce((we,Ne)=>we+(Ne.estimated_pomodoros||0)*(Ne.pomodoro_duration||25),0),O=Math.floor(_e/60),ne=_e%60;return{timeStr:O>0?`${O}h ${ne}m`:`${ne}m`,count:fe.length}}function x(q){const W=new Map,B=[];for(const pe of q)W.set(pe.id,{...pe,children:[],depth:0});for(const pe of q){const ge=W.get(pe.id);ge&&(pe.parent_id&&W.has(pe.parent_id)?W.get(pe.parent_id).children.push(ge):B.push(ge))}const Q=(pe,ge)=>{for(const fe of pe)fe.depth=ge,Q(fe.children,ge+1)};return Q(B,0),B}function S(q,W){const B=[];for(const Q of q)B.push(Q),W.has(Q.id)&&Q.children.length>0&&B.push(...S(Q.children,W));return B}const M=F(()=>x(t.projects)),P=F(()=>S(e(M),e(c))),Y=F(()=>[{key:"today",icon:Ev,label:e(n).filter.today},{key:"tomorrow",icon:Cv,label:e(n).filter.tomorrow},{key:"week",icon:fc,label:e(n).filter.week},{key:"planned",icon:iv,label:e(n).sidebar.planned},{key:"completed",icon:xs,label:e(n).sidebar.completed},{key:"journal",icon:lv,label:e(n).sidebar.journal}]),T=F(()=>t.selectedProject===null?t.filter:"");function L(q){const W=new Set(e(c));W.has(q)?W.delete(q):W.add(q),f(c,W,!0)}function k(q){t.onSetFilter(q),t.onSelectProject(null)}var D=v_(),I=s(D),ie=s(I);Sv(ie,{size:14,class:"search-icon"});var ae=d(ie,2),re=d(I,2);Me(re,21,()=>e(Y),q=>q.key,(q,W)=>{const B=F(()=>y(t.tasks,e(W).key)),Q=F(()=>e(T)===e(W).key);var pe=Xh();let ge;var fe=s(pe),_e=s(fe);Lr(_e,()=>e(W).icon,(we,Ne)=>{Ne(we,{size:16})});var O=d(_e),ne=d(fe,2),ue=s(ne);E(()=>{ge=at(pe,1,"filter-btn svelte-qbpxhc",null,ge,{active:e(Q)}),p(O,` ${e(W).label??""}`),p(ue,`${e(B).timeStr??""} ${e(B).count??""}`)}),G("click",pe,()=>k(e(W).key)),g(q,pe)});var te=d(re,2),ce=s(te),$=s(ce),j=s($);{var U=q=>{Vn(q,{size:14})},J=q=>{Jn(q,{size:14})};se(j,q=>{e(o)?q(U):q(J,-1)})}var he=d(j),be=d($,2);{var Z=q=>{var W=Zh(),B=s(W);Mn(B,{size:14}),E(()=>{A(W,"aria-label",e(n).sidebar.addRootAria),A(W,"title",e(n).sidebar.addListTitle)}),G("click",W,()=>{f(v,"root"),f(_,"")}),g(q,W)};se(be,q=>{t.onCreateProject&&q(Z)})}var de=d(ce,2);{var ke=q=>{var W=u_(),B=s(W);{var Q=_e=>{var O=e_(),ne=s(O);kn(ne,!0),E(()=>A(ne,"placeholder",e(n).sidebar.listNamePlaceholder)),G("keydown",ne,ue=>{if(ue.key==="Enter"){const we=e(_).trim();we&&t.onCreateProject&&t.onCreateProject(we,null),f(v,null),f(_,"")}ue.key==="Escape"&&(f(v,null),f(_,""))}),yt("blur",ne,()=>{const ue=e(_).trim();ue&&t.onCreateProject&&t.onCreateProject(ue,null),f(v,null),f(_,"")}),kt(ne,()=>e(_),ue=>f(_,ue)),g(_e,O)};se(B,_e=>{e(v)==="root"&&t.onCreateProject&&_e(Q)})}var pe=d(B,2);Me(pe,17,()=>e(P),_e=>_e.id,(_e,O)=>{const ne=F(()=>t.selectedProject===e(O).id),ue=F(()=>e(l)===e(O).id),we=F(()=>e(i)===e(O).id),Ne=F(()=>e(O).children.length>0),je=F(()=>e(c).has(e(O).id));var We=c_(),Ke=s(We);{var Ye=R=>{var K=t_(),ve=s(K);kn(ve,!0),G("keydown",ve,oe=>{if(oe.key==="Enter"){const ye=e(u).trim();ye&&t.onUpdateProject&&t.onUpdateProject(e(O).id,ye),f(i,null),f(u,"")}oe.key==="Escape"&&(f(i,null),f(u,""))}),yt("blur",ve,()=>{const oe=e(u).trim();oe&&t.onUpdateProject&&t.onUpdateProject(e(O).id,oe),f(i,null),f(u,"")}),kt(ve,()=>e(u),oe=>f(u,oe)),g(R,K)},V=R=>{var K=o_();let ve;var oe=s(K),ye=s(oe);{var me=Oe=>{var Be=a_(),Ce=s(Be);{var Te=ct=>{Vn(ct,{size:12})},nt=ct=>{Jn(ct,{size:12})};se(Ce,ct=>{e(je)?ct(Te):ct(nt,-1)})}E(()=>A(Be,"aria-label",e(je)?e(n).form.collapse:e(n).common.expand)),G("click",Be,ct=>{ct.stopPropagation(),L(e(O).id)}),g(Oe,Be)},Ie=Oe=>{var Be=n_();g(Oe,Be)};se(ye,Oe=>{e(Ne)?Oe(me):Oe(Ie,-1)})}var it=d(ye,2);{let Oe=F(()=>e(O).color||"var(--color-accent)");hv(it,{size:14,get color(){return e(Oe)}})}var lt=d(it,2),ft=s(lt),rt=d(oe,2);{var Ve=Oe=>{var Be=r_(),Ce=s(Be);vv(Ce,{size:14}),E(()=>A(Be,"aria-label",e(n).sidebar.moreActions)),G("click",Be,Te=>{Te.stopPropagation(),f(l,e(ue)?null:e(O).id,!0)}),g(Oe,Be)};se(rt,Oe=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&e(O).depth<2)&&Oe(Ve)})}E(()=>{ve=at(K,1,"node-row svelte-qbpxhc",null,ve,{active:e(ne)}),p(ft,e(O).name)}),G("click",oe,()=>{t.onSelectProject(e(O).id),t.onSetFilter("")}),G("keydown",oe,Oe=>{(Oe.key==="Enter"||Oe.key===" ")&&(Oe.preventDefault(),t.onSelectProject(e(O).id),t.onSetFilter(""))}),g(R,K)};se(Ke,R=>{e(we)?R(Ye):R(V,-1)})}var z=d(Ke,2);{var b=R=>{var K=s_(),ve=s(K);kn(ve,!0),E(()=>{At(K,`padding-left: ${(e(O).depth+1)*12+12}px;`),A(ve,"placeholder",e(O).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)}),G("keydown",ve,oe=>{if(oe.key==="Enter"){const ye=e(_).trim();ye&&t.onCreateProject&&t.onCreateProject(ye,e(O).id),f(v,null),f(_,"");const me=new Set(e(c));me.add(e(O).id),f(c,me,!0)}oe.key==="Escape"&&(f(v,null),f(_,""))}),yt("blur",ve,()=>{const oe=e(_).trim();oe&&t.onCreateProject&&t.onCreateProject(oe,e(O).id),f(v,null),f(_,"");const ye=new Set(e(c));ye.add(e(O).id),f(c,ye,!0)}),kt(ve,()=>e(_),oe=>f(_,oe)),g(R,K)};se(z,R=>{e(v)===e(O).id&&t.onCreateProject&&R(b)})}var w=d(z,2);{var X=R=>{var K=l_(),ve=s(K);{var oe=lt=>{var ft=Zi(),rt=s(ft);Mn(rt,{size:12});var Ve=d(rt);E(()=>p(Ve,` ${e(n).settings.list.addChild??""}`)),G("click",ft,()=>{f(v,e(O).id,!0),f(_,""),f(l,null)}),g(lt,ft)};se(ve,lt=>{t.onCreateProject&&e(O).depth<2&&lt(oe)})}var ye=d(ve,2);{var me=lt=>{var ft=Zi(),rt=s(ft);Xs(rt,{size:12});var Ve=d(rt);E(()=>p(Ve,` ${e(n).settings.list.edit??""}`)),G("click",ft,()=>{f(u,e(O).name,!0),f(i,e(O).id,!0),f(l,null)}),g(lt,ft)};se(ye,lt=>{t.onUpdateProject&&lt(me)})}var Ie=d(ye,2);{var it=lt=>{var ft=i_(),rt=s(ft);Br(rt,{size:12});var Ve=d(rt);E(()=>p(Ve,` ${e(n).settings.list.del??""}`)),G("click",ft,()=>{t.onDeleteProject(e(O).id),f(l,null)}),g(lt,ft)};se(Ie,lt=>{t.onDeleteProject&&lt(it)})}g(R,K)};se(w,R=>{e(ue)&&!e(we)&&R(X)})}E(()=>At(We,`padding-left: ${e(O).depth*12}px;`)),g(_e,We)});var ge=d(pe,2);{var fe=_e=>{var O=d_(),ne=s(O);E(()=>p(ne,e(n).sidebar.emptyHint)),g(_e,O)};se(ge,_e=>{t.projects.length===0&&e(v)!=="root"&&_e(fe)})}g(q,W)};se(de,q=>{e(o)&&q(ke)})}E(()=>{vo(ae,r()),A(ae,"placeholder",e(n).sidebar.searchTasksPlaceholder),p(he,` ${e(n).task.list??""}`)}),G("input",ae,q=>{var W;return(W=t.onSearchChange)==null?void 0:W.call(t,q.currentTarget.value)}),G("click",$,()=>f(o,!e(o))),g(a,D),pt()}xt(["input","click","keydown"]);var h_=C('<span class="pri-badge svelte-3041n"> </span>'),__=C('<span class="tag svelte-3041n"> </span>'),p_=C('<div class="row-2 svelte-3041n"></div>'),g_=C("<span></span>"),m_=C('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),b_=C('<span class="due svelte-3041n"> </span>'),y_=C('<button type="button" class="start svelte-3041n"><!></button>'),k_=C('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function Yc(a,t){_t(t,!0);const n=F(mt),r=F(()=>t.task.status==="completed"),o=F(()=>t.task.estimated_pomodoros||0),c=F(()=>t.task.completed_pomodoros||0),l=F(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),i=F(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""})[t.task.priority||"none"]),u=F(()=>t.task.due_date?Ht(t.task.due_date):"");var v=k_();let _;var m=s(v);let h;var y=s(m);{var x=j=>{Wa(j,{size:12,strokeWidth:3,color:"#fff"})};se(y,j=>{e(r)&&j(x)})}var S=d(m,2),M=s(S),P=s(M);{var Y=j=>{var U=h_(),J=s(U);E(()=>{At(U,`--pri-color: ${e(l)??""}`),p(J,e(i))}),g(j,U)};se(P,j=>{t.task.priority&&t.task.priority!=="none"&&j(Y)})}var T=d(P,2),L=s(T),k=d(M,2);{var D=j=>{var U=p_();Me(U,21,()=>t.task.tags.slice(0,3),J=>J.id,(J,he)=>{var be=__(),Z=s(be);E(()=>p(Z,`#${e(he).name??""}`)),g(J,be)}),g(j,U)};se(k,j=>{t.task.tags&&t.task.tags.length>0&&j(D)})}var I=d(k,2),ie=s(I);{var ae=j=>{var U=m_(),J=s(U);Me(J,21,()=>Array.from({length:Math.min(e(o),8)}),La,(Z,de,ke)=>{var q=g_();let W;E(()=>W=at(q,1,"dot svelte-3041n",null,W,{filled:ke<e(c)})),g(Z,q)});var he=d(J,2),be=s(he);E(()=>p(be,`${e(c)??""}/${e(o)??""} ${e(n).timer.pomodoros??""}`)),g(j,U)};se(ie,j=>{e(o)>0&&j(ae)})}var re=d(ie,2);{var te=j=>{var U=b_(),J=s(U);E(()=>p(J,e(u))),g(j,U)};se(re,j=>{e(u)&&j(te)})}var ce=d(S,2);{var $=j=>{var U=y_(),J=s(U);fo(J,{size:13,color:"#fff",fill:"#fff"}),E(()=>{A(U,"aria-label",e(n).task.startTooltip),A(U,"title",e(n).task.startTooltip)}),G("click",U,he=>{var be;he.stopPropagation(),(be=t.onStart)==null||be.call(t,t.task)}),g(j,U)};se(ce,j=>{!e(r)&&t.onStart&&j($)})}E(()=>{_=at(v,1,"task-card svelte-3041n",null,_,{selected:t.selected,done:e(r)}),A(v,"aria-label",t.task.title),h=at(m,1,"check svelte-3041n",null,h,{checked:e(r)}),A(m,"aria-label",e(r)?e(n).common.ariaMarkUndone:e(n).common.ariaMarkDone),p(L,t.task.title)}),G("click",v,()=>t.onSelect(t.task)),G("keydown",v,j=>{(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),t.onSelect(t.task))}),G("click",m,j=>{j.stopPropagation(),t.onToggle(t.task.id)}),g(a,v),pt()}xt(["click","keydown"]);//! 清单(项目)树 → 下拉选项平铺 —— v1 TaskForm/TaskDetailPanel 共用逻辑。
//!
//! 规则(v1 getProjectTreeOptions):
//!   - 深度优先遍历,子清单缩进一级(depth 供前端渲染 `'　'.repeat(depth)`)
//!   - 有子清单的父节点 `disabled: true`(任务只能挂到叶子清单)
function $c(a){const t=new Map;for(const c of a)t.set(c.id,{...c,children:[]});const n=[];for(const c of a)c.parent_id&&t.has(c.parent_id)?t.get(c.parent_id).children.push(c.id):n.push(c.id);const r=[],o=(c,l)=>{const i=t.get(c),u=i.children.length>0;r.push({id:i.id,name:i.name,depth:l,disabled:u});for(const v of i.children)o(v,l+1)};for(const c of n)o(c,0);return r}var w_=C('<input type="text" class="title-input svelte-1t5orp1"/>'),x_=C('<button type="button" class="title-btn svelte-1t5orp1"> </button>'),T_=C('<button type="button" class="icon-btn svelte-1t5orp1"><!></button>'),S_=C('<li><input type="checkbox" class="svelte-1t5orp1"/> <!> <!> <button type="button" class="icon-btn danger svelte-1t5orp1"><!></button></li>');function D_(a,t){_t(t,!0);const n=F(mt);let r=H(!1),o=H(ze(Wt(()=>t.subtask.title))),c=H(null);St(()=>{e(r)||f(o,t.subtask.title,!0)});function l(){f(o,t.subtask.title,!0),f(r,!0),queueMicrotask(()=>{var k;return(k=e(c))==null?void 0:k.focus()})}function i(){const k=e(o).trim();e(r)&&(f(r,!1),k&&k!==t.subtask.title?t.onChange({...t.subtask,title:k}):k||f(o,t.subtask.title,!0))}function u(){f(o,t.subtask.title,!0),f(r,!1)}function v(k){k.key==="Enter"?(k.preventDefault(),i()):k.key==="Escape"&&(k.preventDefault(),u())}function _(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var m=S_();let h;var y=s(m),x=d(y,2);{var S=k=>{var D=w_();Ku(D,I=>f(c,I),()=>e(c)),E(()=>A(D,"aria-label",e(n).task.editSubtask)),yt("blur",D,i),G("keydown",D,v),kt(D,()=>e(o),I=>f(o,I)),g(k,D)},M=k=>{var D=x_(),I=s(D);E(()=>{A(D,"title",e(n).task.dblclickToEdit),p(I,t.subtask.title)}),G("dblclick",D,l),g(k,D)};se(x,k=>{e(r)?k(S):k(M,-1)})}var P=d(x,2);{var Y=k=>{var D=T_(),I=s(D);Xs(I,{size:14}),E(()=>{A(D,"aria-label",e(n).task.editSubtask),A(D,"title",e(n).task.editSubtask)}),G("click",D,l),g(k,D)};se(P,k=>{e(r)||k(Y)})}var T=d(P,2),L=s(T);Br(L,{size:14}),E(()=>{h=at(m,1,"row svelte-1t5orp1",null,h,{done:t.subtask.is_completed}),Js(y,t.subtask.is_completed),A(y,"aria-label",e(n).task.toggleSubtaskAria),A(T,"aria-label",e(n).task.deleteSubtask),A(T,"title",e(n).task.deleteSubtask)}),G("change",y,_),G("click",T,()=>t.onDelete(t.subtask.id)),g(a,m),pt()}xt(["change","keydown","dblclick","click"]);var el=C('<button type="button"> </button>'),P_=C('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="weekdays svelte-1h3pyjl"></div></div>'),M_=C('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="month-grid svelte-1h3pyjl"></div></div>'),E_=C('<div class="warn svelte-1h3pyjl"> </div>'),C_=C('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl"> </h3> <button type="button" class="close-btn svelte-1h3pyjl"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl"> </label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl"> </label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl"> </label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl"> </label> <select id="rc-type" class="input svelte-1h3pyjl"><option> </option><option> </option><option> </option><option> </option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl"> </button> <button type="button" class="btn-confirm svelte-1h3pyjl"> </button></div></div></div>');function Gc(a,t){_t(t,!0);const n=F(mt);function r(){const T=new Date,L=k=>String(k).padStart(2,"0");return`${T.getFullYear()}-${L(T.getMonth()+1)}-${L(T.getDate())}T${L(T.getHours())}:${L(T.getMinutes())}`}function o(){return`${new Date().getFullYear()}-12-31T23:59`}let c=H(ze(r())),l=H(ze(o())),i=H(1),u=H("week"),v=H(ze([])),_=H(ze([]));St(()=>{if(t.open&&t.initialConfig)try{const T=JSON.parse(t.initialConfig);f(c,T.startDate||r(),!0),f(l,T.endDate||o(),!0),f(i,T.interval||1,!0),f(u,T.type||"week",!0),f(v,T.weekdays||[],!0),f(_,T.monthDays||[],!0)}catch{}});function m(T,L,k){k(T.includes(L)?T.filter(D=>D!==L):[...T,L].sort((D,I)=>D-I))}function h(){const T={interval:e(i),type:e(u),startDate:e(c),endDate:e(l)};e(u)==="week"&&(T.weekdays=e(v)),e(u)==="month"&&(T.monthDays=e(_)),t.onConfirm(JSON.stringify(T))}let y=F(()=>e(u)==="week"&&e(v).length===0||e(u)==="month"&&e(_).length===0);function x(T){T.target===T.currentTarget&&t.onClose()}function S(T){T.key==="Escape"&&t.onClose()}var M=qe(),P=Ee(M);{var Y=T=>{var L=C_(),k=s(L),D=s(k),I=s(D),ie=s(I),ae=d(I,2),re=s(ae);Zs(re,{size:18});var te=d(D,2),ce=s(te),$=s(ce),j=s($),U=s(j),J=d(j,2),he=d($,2),be=s(he),Z=s(be),de=d(be,2),ke=d(ce,2),q=s(ke),W=s(q),B=s(W),Q=d(W,2),pe=d(q,2),ge=s(pe),fe=s(ge),_e=d(ge,2),O=s(_e),ne=s(O);O.value=O.__value="day";var ue=d(O),we=s(ue);ue.value=ue.__value="week";var Ne=d(ue),je=s(Ne);Ne.value=Ne.__value="month";var We=d(Ne),Ke=s(We);We.value=We.__value="year";var Ye=d(ke,2);{var V=me=>{var Ie=P_(),it=s(Ie),lt=s(it),ft=d(it,2);Me(ft,21,()=>e(n).settings.repeatCustom.weekShort,La,(rt,Ve,Oe)=>{const Be=F(()=>Oe+1),Ce=F(()=>e(v).includes(e(Be)));var Te=el();let nt;var ct=s(Te);E(()=>{nt=at(Te,1,"weekday-btn svelte-1h3pyjl",null,nt,{active:e(Ce)}),p(ct,e(Ve))}),G("click",Te,()=>m(e(v),e(Be),Dt=>f(v,Dt,!0))),g(rt,Te)}),E(()=>p(lt,e(n).settings.repeatCustom.weekdays)),g(me,Ie)};se(Ye,me=>{e(u)==="week"&&me(V)})}var z=d(Ye,2);{var b=me=>{var Ie=M_(),it=s(Ie),lt=s(it),ft=d(it,2);Me(ft,20,()=>Array.from({length:31},(rt,Ve)=>Ve+1),La,(rt,Ve)=>{const Oe=F(()=>e(_).includes(Ve));var Be=el();let Ce;var Te=s(Be);E(()=>{Ce=at(Be,1,"month-btn svelte-1h3pyjl",null,Ce,{active:e(Oe)}),p(Te,Ve)}),G("click",Be,()=>m(e(_),Ve,nt=>f(_,nt,!0))),g(rt,Be)}),E(()=>p(lt,e(n).settings.repeatCustom.monthDays)),g(me,Ie)};se(z,me=>{e(u)==="month"&&me(b)})}var w=d(z,2);{var X=me=>{var Ie=E_(),it=s(Ie);E(()=>p(it,e(u)==="week"?e(n).settings.repeatCustom.needPickWeek:e(n).settings.repeatCustom.needPickDay)),g(me,Ie)};se(w,me=>{e(y)&&me(X)})}var R=d(te,2),K=s(R),ve=s(K),oe=d(K,2),ye=s(oe);E(()=>{p(ie,e(n).settings.repeatCustom.title),A(ae,"aria-label",e(n).common.close),p(U,e(n).settings.repeatCustom.startDate),p(Z,e(n).settings.repeatCustom.endDate),p(B,e(n).settings.repeatCustom.interval),p(fe,e(n).settings.repeatCustom.type),p(ne,e(n).settings.repeatCustom.typeDay),p(we,e(n).settings.repeatCustom.typeWeek),p(je,e(n).settings.repeatCustom.typeMonth),p(Ke,e(n).settings.repeatCustom.typeYear),p(ve,e(n).settings.repeatCustom.cancel),oe.disabled=e(y),p(ye,e(n).settings.repeatCustom.confirm)}),G("click",L,x),G("keydown",L,S),G("click",ae,function(...me){var Ie;(Ie=t.onClose)==null||Ie.apply(this,me)}),kt(J,()=>e(c),me=>f(c,me)),kt(de,()=>e(l),me=>f(l,me)),kt(Q,()=>e(i),me=>f(i,me)),uo(_e,()=>e(u),me=>f(u,me)),G("click",K,function(...me){var Ie;(Ie=t.onClose)==null||Ie.apply(this,me)}),G("click",oe,h),g(T,L)};se(P,T=>{t.open&&T(Y)})}g(a,M),pt()}xt(["click","keydown"]);var N_=C('<span class="tag-chip svelte-1qppxcb"> </span>'),j_=C('<div class="tag-chips svelte-1qppxcb"></div>'),F_=C('<span class="no-tags svelte-1qppxcb"> </span>'),A_=C('<label class="tags-editor-row svelte-1qppxcb"><input type="checkbox" class="svelte-1qppxcb"/> <span class="tag-dot svelte-1qppxcb"></span> <span> </span></label>'),I_=C('<div class="no-tags svelte-1qppxcb"> </div>'),q_=C('<div class="tags-editor svelte-1qppxcb"><!> <!></div>'),as=C("<option> </option>"),R_=C('<aside class="panel svelte-1qppxcb"><div class="head svelte-1qppxcb"><div class="head-left svelte-1qppxcb"><span class="pri-dot svelte-1qppxcb"></span> <input class="title-input svelte-1qppxcb"/></div> <button class="close svelte-1qppxcb"><!></button></div> <div class="tags svelte-1qppxcb"><!> <button type="button" class="tags-toggle svelte-1qppxcb"> </button> <!></div> <div class="rows svelte-1qppxcb"><div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><span class="pri-swatch svelte-1qppxcb"></span> </span> <select class="ctrl svelte-1qppxcb"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <span class="ctrl-group svelte-1qppxcb"><span class="pomo-done svelte-1qppxcb"> </span> <input class="pomo-input svelte-1qppxcb" type="number" min="1" max="99"/> <span class="pomo-minutes svelte-1qppxcb"> </span></span></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <input class="ctrl ctrl-bare svelte-1qppxcb" type="datetime-local"/></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"><option> </option><!></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"></select></div></div> <div class="subtasks svelte-1qppxcb"><!> <div class="sub-add svelte-1qppxcb"><!> <input type="text" class="svelte-1qppxcb"/></div></div> <div class="notes svelte-1qppxcb"><textarea rows="3" class="svelte-1qppxcb"></textarea></div> <div class="del-wrap svelte-1qppxcb"><button type="button" class="del-btn svelte-1qppxcb"><!> </button></div> <!></aside>');function L_(a,t){_t(t,!0);const n=F(mt);let r=H(ze(Wt(()=>t.task.title))),o=H(ze(Wt(()=>t.task.description??""))),c=H(ze(Wt(()=>js(t.task.due_date))));St(()=>{f(r,t.task.title,!0),f(o,t.task.description??"",!0),f(c,js(t.task.due_date),!0)});function l(){return new Date().toISOString()}async function i(le){try{await Ss({...t.task,...le,updated_at:l()}),t.onChanged()}catch(De){console.error("patch task failed",De),alert(Ft(e(n).task.saveFailed,{err:String(De)}))}}async function u(le,De){try{await Ss({...t.task,repeat:le,updated_at:l(),...le==="custom"&&De!==void 0?{repeat_config:De}:{}},e(h)),t.onChanged()}catch($e){console.error("patch repeat failed",$e),alert(Ft(e(n).task.saveFailed,{err:String($e)}))}}async function v(){const le=e(r).trim();!le||le===t.task.title||await i({title:le})}async function _(){e(o)!==(t.task.description??"")&&await i({description:e(o)})}async function m(){const le=Fs(e(c));le!==t.task.due_date&&await i({due_date:le})}let h=H(ze([])),y=H(!1);St(()=>{x()});async function x(){try{const le=await Zv(t.task.id);f(h,le.map(De=>De.id),!0)}catch(le){console.error("load tags failed",le)}}async function S(le){const De=e(h),$e=De.includes(le)?De.filter(qt=>qt!==le):[...De,le];f(h,$e,!0);try{await ef(t.task.id,$e),t.onChanged()}catch(qt){f(h,De,!0),alert(Ft(e(n).task.setTagsFailed,{err:String(qt)}))}}const M=F(()=>e(h).map(le=>t.allTags.find(De=>De.id===le)).filter(le=>!!le));let P=H(ze([])),Y=H("");St(()=>{T()});async function T(){try{f(P,await Fc(t.task.id),!0)}catch(le){console.error("load subtasks failed",le)}}async function L(){const le=e(Y).trim();if(!le)return;f(Y,"");const De={id:crypto.randomUUID(),task_id:t.task.id,title:le,is_completed:!1,position:e(P).length,created_at:l(),updated_at:l()};try{const $e=await Ds(De);f(P,[...e(P),$e],!0),t.onChanged()}catch($e){alert(Ft(e(n).task.addSubtaskFailed,{err:String($e)}))}}async function k(le){const De=e(P).find($e=>$e.id===le.id);f(P,e(P).map($e=>$e.id===le.id?le:$e),!0);try{await Ds(le),t.onChanged()}catch($e){De&&f(P,e(P).map(qt=>qt.id===De.id?De:qt),!0),alert(Ft(e(n).task.updateSubtaskFailed,{err:String($e)}))}}async function D(le){const De=e(P);f(P,e(P).filter($e=>$e.id!==le),!0);try{await cf(le),t.onChanged()}catch($e){f(P,De,!0),alert(Ft(e(n).task.deleteSubtaskFailed,{err:String($e)}))}}async function I(){try{await Vv(t.task.id),t.onClose(),t.onChanged()}catch(le){alert(Ft(e(n).task.saveFailed,{err:String(le)}))}}const ie=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],ae=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],re={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},te={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function ce(le){return e(n).enum.reminder[re[le]]}function $(le){return e(n).enum.repeat[te[le]]}let j=H(!1);const U=F(Ja),J=F(()=>t.task.estimated_pomodoros*(t.task.pomodoro_duration??e(U).focusDuration));function he(le){const De=le.currentTarget,$e=Math.round(Number(De.value)),qt=Math.min(99,Math.max(1,Number.isFinite($e)?$e:1));qt!==t.task.estimated_pomodoros&&i({estimated_pomodoros:qt})}function be(le){if(le==="none"){i({reminder:le});return}if(mo(e(c)))i({reminder:le});else{const De=Ns(e(c));alert(e(n).task.detailTimeFilled),f(c,De,!0),i({reminder:le,due_date:Fs(De)})}}const Z={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #a8a298)",none:"var(--color-neutral-400, #a8a298)"};var de=R_(),ke=s(de),q=s(ke),W=s(q),B=d(W,2),Q=d(q,2),pe=s(Q);Zs(pe,{size:18});var ge=d(ke,2),fe=s(ge);{var _e=le=>{var De=j_();Me(De,21,()=>e(M),$e=>$e.id,($e,qt)=>{var ta=N_(),Qt=s(ta);E(()=>{At(ta,`background-color: ${e(qt).color??""}`),p(Qt,e(qt).name)}),g($e,ta)}),g(le,De)},O=le=>{var De=F_(),$e=s(De);E(()=>p($e,e(n).task.detailNoTags)),g(le,De)};se(fe,le=>{e(M).length>0?le(_e):le(O,-1)})}var ne=d(fe,2),ue=s(ne),we=d(ne,2);{var Ne=le=>{var De=q_(),$e=s(De);Me($e,17,()=>t.allTags,Qt=>Qt.id,(Qt,cn)=>{var Wr=A_(),Ro=s(Wr),hi=d(Ro,2),Zc=d(hi,2),ed=s(Zc);E(td=>{Js(Ro,td),At(hi,`background-color: ${e(cn).color??""}`),p(ed,e(cn).name)},[()=>e(h).includes(e(cn).id)]),G("change",Ro,()=>void S(e(cn).id)),g(Qt,Wr)});var qt=d($e,2);{var ta=Qt=>{var cn=I_(),Wr=s(cn);E(()=>p(Wr,e(n).task.detailNoTagsAvailable)),g(Qt,cn)};se(qt,Qt=>{t.allTags.length===0&&Qt(ta)})}g(le,De)};se(we,le=>{e(y)&&le(Ne)})}var je=d(ge,2),We=s(je),Ke=s(We),Ye=s(Ke),V=d(Ye),z=d(Ke,2),b=s(z),w=s(b);b.value=b.__value="high";var X=d(b),R=s(X);X.value=X.__value="medium";var K=d(X),ve=s(K);K.value=K.__value="low";var oe=d(K),ye=s(oe);oe.value=oe.__value="none";var me;Bt(z);var Ie=d(We,2),it=s(Ie),lt=s(it);Qn(lt,{size:16});var ft=d(lt),rt=d(it,2),Ve=s(rt),Oe=s(Ve),Be=d(Ve,2),Ce=d(Be,2),Te=s(Ce),nt=d(Ie,2),ct=s(nt),Dt=s(ct);cv(Dt,{size:16});var zt=d(Dt),Jt=d(ct,2),ua=d(nt,2),tt=s(ua),gt=s(tt);gv(gt,{size:16});var ht=d(gt),Nt=d(tt,2),Pt=s(Nt),He=s(Pt);Pt.value=Pt.__value="";var Fe=d(Pt);Me(Fe,17,()=>$c(t.projects),le=>le.id,(le,De)=>{var $e=as(),qt=s($e),ta={};E(Qt=>{$e.disabled=e(De).disabled,p(qt,`${Qt??""}${e(De).name??""}`),ta!==(ta=e(De).id)&&($e.value=($e.__value=e(De).id)??"")},[()=>"　".repeat(e(De).depth)]),g(le,$e)});var dt;Bt(Nt);var ee=d(ua,2),Se=s(ee),Le=s(Se);vc(Le,{size:16});var Je=d(Le),Tt=d(Se,2);Me(Tt,21,()=>ie,le=>le.value,(le,De)=>{var $e=as(),qt=s($e),ta={};E(Qt=>{p(qt,Qt),ta!==(ta=e(De).value)&&($e.value=($e.__value=e(De).value)??"")},[()=>ce(e(De).value)]),g(le,$e)});var xe;Bt(Tt);var ot=d(ee,2),bt=s(ot),Kt=s(bt);wv(Kt,{size:16});var sa=d(Kt),Cn=d(bt,2);Me(Cn,21,()=>ae,le=>le.value,(le,De)=>{var $e=as(),qt=s($e),ta={};E(Qt=>{p(qt,Qt),ta!==(ta=e(De).value)&&($e.value=($e.__value=e(De).value)??"")},[()=>$(e(De).value)]),g(le,$e)});var si;Bt(Cn);var ii=d(je,2),li=s(ii);Me(li,17,()=>e(P),le=>le.id,(le,De)=>{D_(le,{get subtask(){return e(De)},onChange:k,onDelete:D})});var Jc=d(li,2),ci=s(Jc);Mn(ci,{size:14,class:"sub-add-icon"});var Ur=d(ci,2),di=d(ii,2),qo=s(di),ui=d(di,2),vi=s(ui),fi=s(vi);Br(fi,{size:14});var Qc=d(fi),Xc=d(ui,2);Gc(Xc,{get open(){return e(j)},get initialConfig(){return t.task.repeat_config},onConfirm:le=>{f(j,!1),u("custom",le)},onClose:()=>f(j,!1)}),E(()=>{A(de,"aria-label",e(n).task.detailPanelAria),At(W,`background-color: ${Z[t.task.priority]??Z.none??""}`),A(B,"aria-label",e(n).task.titleAria),A(Q,"aria-label",e(n).common.close),p(ue,e(y)?e(n).task.detailCollapse:e(n).task.detailEditTags),At(Ye,`background-color: ${Z[t.task.priority]??Z.none??""}`),p(V,` ${e(n).task.detailPriority??""}`),p(w,e(n).priority.high),p(R,e(n).priority.medium),p(ve,e(n).priority.low),p(ye,e(n).priority.none),me!==(me=t.task.priority)&&(z.value=(z.__value=t.task.priority)??"",It(z,t.task.priority)),p(ft,` ${e(n).task.detailPomodoro??""}`),p(Oe,`${t.task.completed_pomodoros??""}/`),vo(Be,t.task.estimated_pomodoros),p(Te,`= ${e(J)??""}${e(n).task.minute??""}`),p(zt,` ${e(n).task.detailDueDate??""}`),p(ht,` ${e(n).task.detailProject??""}`),p(He,e(n).task.detailNoProject),dt!==(dt=t.task.project_id??"")&&(Nt.value=(Nt.__value=t.task.project_id??"")??"",It(Nt,t.task.project_id??"")),p(Je,` ${e(n).task.detailReminder??""}`),xe!==(xe=t.task.reminder??"none")&&(Tt.value=(Tt.__value=t.task.reminder??"none")??"",It(Tt,t.task.reminder??"none")),p(sa,` ${e(n).task.detailRepeat??""}`),si!==(si=t.task.repeat??"none")&&(Cn.value=(Cn.__value=t.task.repeat??"none")??"",It(Cn,t.task.repeat??"none")),A(Ur,"placeholder",e(n).task.detailAddSubtask),A(Ur,"aria-label",e(n).task.newSubtaskAria),A(qo,"placeholder",e(n).task.detailAddNote),p(Qc,` ${e(n).task.detailDelete??""}`)}),yt("blur",B,v),G("keydown",B,le=>{le.key==="Enter"&&(le.preventDefault(),le.currentTarget.blur())}),kt(B,()=>e(r),le=>f(r,le)),G("click",Q,function(...le){var De;(De=t.onClose)==null||De.apply(this,le)}),G("click",ne,()=>f(y,!e(y))),G("change",z,le=>{const De=le.currentTarget.value;i({priority:De})}),G("change",Be,he),G("input",Jt,le=>{le.currentTarget.value.length===16&&le.currentTarget.blur()}),yt("blur",Jt,m),kt(Jt,()=>e(c),le=>f(c,le)),G("change",Nt,le=>{const De=le.currentTarget.value;i({project_id:De||null})}),G("change",Tt,le=>{const De=le.currentTarget.value;be(De)}),G("change",Cn,le=>{const De=le.currentTarget.value;De==="custom"?f(j,!0):u(De)}),G("keydown",Ur,le=>{le.key==="Enter"&&e(Y).trim()&&(le.preventDefault(),L())}),kt(Ur,()=>e(Y),le=>f(Y,le)),yt("blur",qo,_),kt(qo,()=>e(o),le=>f(o,le)),G("click",vi,()=>void I()),g(a,de),pt()}xt(["keydown","click","change","input"]);var O_=C('<div class="group-tasks svelte-1u318f6"></div>'),B_=C('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),z_=C('<div class="grouped svelte-1u318f6"></div>');function H_(a,t){_t(t,!0);const n=F(mt),r="unscheduled";let o=H(ze(new Set));function c(v,_){const m=new Date(v+"T00:00:00"),h=_.reduce((y,x)=>y+(x.estimated_pomodoros||0)*(x.pomodoro_duration||25),0);return Ft(e(n).task.groupHeader,{date:v,weekday:e(n).enum.weekday[m.getDay()],n:h})}function l(v){const _=new Set(e(o));_.has(v)?_.delete(v):_.add(v),f(o,_,!0)}const i=F(()=>{const v=new Map;for(const m of t.tasks){let h;t.groupBy==="completed_at"?m.completed_at?h=Ht(m.completed_at):h=r:h=m.due_date?Ht(m.due_date):r,v.has(h)||v.set(h,[]),v.get(h).push(m)}const _=Array.from(v.entries());return _.sort((m,h)=>m[0]===r?1:h[0]===r?-1:new Date(m[0]).getTime()-new Date(h[0]).getTime()),_});var u=z_();Me(u,21,()=>e(i),([v,_])=>v,(v,_)=>{var m=F(()=>hl(e(_),2));let h=()=>e(m)[0],y=()=>e(m)[1];const x=F(()=>e(o).has(h()));var S=B_(),M=s(S),P=s(M),Y=s(P),T=d(P,2),L=s(T);{var k=ae=>{Jn(ae,{size:16})},D=ae=>{Vn(ae,{size:16})};se(L,ae=>{e(x)?ae(k):ae(D,-1)})}var I=d(M,2);{var ie=ae=>{var re=O_();Me(re,21,y,te=>te.id,(te,ce)=>{{let $=F(()=>{var j;return((j=t.selectedTask)==null?void 0:j.id)===e(ce).id});Yc(te,{get task(){return e(ce)},get selected(){return e($)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),g(ae,re)};se(I,ae=>{e(x)||ae(ie)})}E(ae=>{A(M,"aria-expanded",!e(x)),p(Y,ae)},[()=>h()===r?e(n).task.noDate:c(h(),y())]),G("click",M,()=>l(h())),g(v,S)}),g(a,u),pt()}xt(["click"]);var U_=C('<span class="unit svelte-1i37zgo"> </span>'),W_=C('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function Yt(a,t){var n=W_();let r;var o=s(n),c=s(o);Lr(c,()=>t.icon,(h,y)=>{y(h,{size:18,strokeWidth:1.8})});var l=d(o,2),i=s(l),u=d(i);{var v=h=>{var y=U_(),x=s(y);E(()=>p(x,t.unit)),g(h,y)};se(u,h=>{t.unit&&h(v)})}var _=d(l,2),m=s(_);E(()=>{r=at(n,1,"stat-card svelte-1i37zgo",null,r,{accent:t.accent}),p(i,t.value),p(m,t.label)}),g(a,n)}var tl=C("<option> </option>"),Y_=C('<button type="button" class="clear-btn svelte-1ko7jxa"> </button>'),$_=C('<button type="button" class="export-btn svelte-1ko7jxa"><!> </button>'),G_=C('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><option> </option><option> </option><option> </option><option> </option></select> <button type="button"> </button> <button type="button"> </button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <!></div></div>');function al(a,t){_t(t,!0);const n=F(mt),r=F(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function o(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var c=G_(),l=s(c),i=s(l),u=s(i),v=s(u);u.value=u.__value="";var _=d(u);Me(_,17,()=>t.projects,O=>O.id,(O,ne)=>{var ue=tl(),we=s(ue),Ne={};E(()=>{p(we,e(ne).name),Ne!==(Ne=e(ne).id)&&(ue.value=(ue.__value=e(ne).id)??"")}),g(O,ue)});var m;Bt(i);var h=d(i,2),y=s(h),x=s(y);y.value=y.__value="";var S=d(y);Me(S,17,()=>t.tags,O=>O.id,(O,ne)=>{var ue=tl(),we=s(ue),Ne={};E(()=>{p(we,e(ne).name),Ne!==(Ne=e(ne).id)&&(ue.value=(ue.__value=e(ne).id)??"")}),g(O,ue)});var M;Bt(h);var P=d(h,2),Y=s(P),T=s(Y);Y.value=Y.__value="";var L=d(Y),k=s(L);L.value=L.__value="high";var D=d(L),I=s(D);D.value=D.__value="medium";var ie=d(D),ae=s(ie);ie.value=ie.__value="low";var re=d(ie),te=s(re);re.value=re.__value="none";var ce;Bt(P);var $=d(P,2);let j;var U=s($),J=d($,2);let he;var be=s(J),Z=d(J,2);{var de=O=>{var ne=Y_(),ue=s(ne);E(()=>p(ue,e(n).timer.clearFilter)),G("click",ne,o),g(O,ne)};se(Z,O=>{e(r)&&O(de)})}var ke=d(l,2),q=s(ke),W=s(q),B=d(q,2),Q=d(B,2),pe=s(Q),ge=d(Q,2),fe=d(ge,2);{var _e=O=>{var ne=$_(),ue=s(ne);uv(ue,{size:14});var we=d(ue);E(()=>p(we,` ${e(n).filter.export??""}`)),G("click",ne,function(...Ne){var je;(je=t.onExport)==null||je.apply(this,Ne)}),g(O,ne)};se(fe,O=>{t.onExport&&O(_e)})}E((O,ne)=>{A(i,"title",O),A(i,"aria-label",e(n).filter.projectAria),p(v,e(n).filter.allProject),m!==(m=t.filterProject??"")&&(i.value=(i.__value=t.filterProject??"")??"",It(i,t.filterProject??"")),A(h,"title",ne),A(h,"aria-label",e(n).filter.tagAria),p(x,e(n).filter.allTag),M!==(M=t.filterTag??"")&&(h.value=(h.__value=t.filterTag??"")??"",It(h,t.filterTag??"")),A(P,"aria-label",e(n).filter.priorityAria),p(T,e(n).filter.allPriority),p(k,e(n).priority.high),p(I,e(n).priority.medium),p(ae,e(n).priority.low),p(te,e(n).priority.none),ce!==(ce=t.filterPriority??"")&&(P.value=(P.__value=t.filterPriority??"")??"",It(P,t.filterPriority??"")),j=at($,1,"preset-btn svelte-1ko7jxa",null,j,{on:t.filterPreset==="week"}),p(U,e(n).filter.week),he=at(J,1,"preset-btn svelte-1ko7jxa",null,he,{on:t.filterPreset==="month"}),p(be,e(n).filter.month),p(W,e(n).filter.dueDate),vo(B,t.filterStartDate),A(B,"aria-label",e(n).filter.startDate),p(pe,e(n).filter.to),vo(ge,t.filterEndDate),A(ge,"aria-label",e(n).filter.endDate)},[()=>{var O;return t.filterProject!==null?(O=t.projects.find(ne=>ne.id===t.filterProject))==null?void 0:O.name:e(n).filter.allProject},()=>{var O;return t.filterTag!==null?(O=t.tags.find(ne=>ne.id===t.filterTag))==null?void 0:O.name:e(n).filter.allTag}]),G("change",i,O=>{const ne=O.currentTarget.value;t.setFilterProject(ne||null)}),G("change",h,O=>{const ne=O.currentTarget.value;t.setFilterTag(ne||null)}),G("change",P,O=>{const ne=O.currentTarget.value;t.setFilterPriority(ne||null)}),G("click",$,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),G("click",J,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),G("change",B,O=>t.setFilterStartDate(O.currentTarget.value)),G("change",ge,O=>t.setFilterEndDate(O.currentTarget.value)),g(a,c),pt()}xt(["change","click"]);var K_=C('<button type="button"><!></button>'),V_=C('<div class="error svelte-1vpobhk"> </div>'),ns=C("<option> </option>"),J_=C('<button type="button"> </button>'),Q_=C('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk"> </span> <div class="tag-chips svelte-1vpobhk"></div></div>'),X_=C('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk"> </label> <select id="tf-proj" class="svelte-1vpobhk"><option> </option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk"> </label> <select id="tf-pri" class="svelte-1vpobhk"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk"> </label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk"> </label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk"> </label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk"> </label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk"> </button></div></div>'),Z_=C('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function ep(a,t){_t(t,!0);const n=F(mt),r=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],o=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],c={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},l={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function i(q){return e(n).enum.reminder[c[q]]}function u(q){return e(n).enum.repeat[l[q]]}let v=F(Ja),_=H(""),m=H(ze(Wt(()=>t.defaultProjectId??null))),h=H("medium"),y=H(ze(Wt(()=>t.defaultDueDate||Aa()))),x=H(0),S=H("none"),M=H("none"),P=H(null),Y=H(!1),T=H(ze(Wt(()=>t.tags.length>0?[t.tags[0].id]:[]))),L=H(!1),k=H(""),D=H(!1);St(()=>{f(m,t.defaultProjectId??null,!0)}),St(()=>{f(y,t.defaultDueDate||Aa(),!0)}),St(()=>{t.tags.length>0&&e(T).length===0&&f(T,[t.tags[0].id],!0)});async function I(){const q=e(_).trim();if(!q){f(k,e(n).form.needTitle,!0);return}let W=e(y)||Aa();if(e(S)!=="none"&&!mo(W)){if(!e(D)){f(D,!0),f(k,e(n).form.needTimeForReminder,!0);return}W=Ns(W)}f(D,!1),f(k,"");try{await t.onAdd({title:q,project_id:e(m),priority:e(h),due_date:W,estimated_pomodoros:e(x)>0?e(x):1,pomodoro_duration:e(v).focusDuration,reminder:e(S)==="none"?null:e(S),repeat:e(M)==="none"?null:e(M),repeat_config:e(M)==="custom"?e(P):null,tag_ids:e(T)}),f(_,""),f(m,t.defaultProjectId??null,!0),f(h,"medium"),f(y,t.defaultDueDate||Aa(),!0),f(x,0),f(S,"none"),f(D,!1),f(M,"none"),f(P,null),f(T,t.tags.length>0?[t.tags[0].id]:[],!0),f(L,!1)}catch(B){f(k,String(B),!0)}}function ie(q){q.preventDefault(),I()}function ae(){e(L)||mo(e(y))||f(y,Ns(e(y)),!0),f(L,!e(L))}var re=Z_(),te=s(re),ce=s(te);Mn(ce,{size:16,class:"plus-icon"});var $=d(ce,2),j=d($,2);Me(j,20,()=>Array.from({length:6},(q,W)=>W+1),La,(q,W)=>{const B=F(()=>e(x)>=W);var Q=K_();let pe;var ge=s(Q);Uc(ge,{size:14,get filled(){return e(B)}}),E(()=>{pe=at(Q,1,"tomato-btn svelte-1vpobhk",null,pe,{filled:e(B)}),A(Q,"aria-label",`${W} ${e(n).form.pomodoroUnit}`),A(Q,"aria-pressed",e(B))}),G("click",Q,()=>f(x,W,!0)),g(q,Q)});var U=d(j,2),J=s(U),he=d(te,2);{var be=q=>{var W=V_(),B=s(W);E(()=>p(B,e(k))),g(q,W)};se(he,q=>{e(k)&&q(be)})}var Z=d(he,2);{var de=q=>{var W=X_(),B=s(W),Q=s(B),pe=s(Q),ge=d(Q,2),fe=s(ge),_e=s(fe);fe.value=fe.__value="";var O=d(fe);Me(O,17,()=>$c(t.projects),tt=>tt.id,(tt,gt)=>{var ht=ns(),Nt=s(ht),Pt={};E(He=>{ht.disabled=e(gt).disabled,p(Nt,`${He??""}${e(gt).name??""}`),Pt!==(Pt=e(gt).id)&&(ht.value=(ht.__value=e(gt).id)??"")},[()=>"　".repeat(e(gt).depth)]),g(tt,ht)});var ne;Bt(ge);var ue=d(B,2),we=s(ue),Ne=s(we),je=d(we,2),We=s(je),Ke=s(We);We.value=We.__value="high";var Ye=d(We),V=s(Ye);Ye.value=Ye.__value="medium";var z=d(Ye),b=s(z);z.value=z.__value="low";var w=d(z),X=s(w);w.value=w.__value="none";var R;Bt(je);var K=d(ue,2),ve=s(K),oe=s(ve),ye=d(ve,2),me=d(K,2),Ie=s(me),it=s(Ie),lt=d(Ie,2),ft=d(me,2),rt=s(ft),Ve=s(rt),Oe=d(rt,2);Me(Oe,21,()=>r,tt=>tt.value,(tt,gt)=>{var ht=ns(),Nt=s(ht),Pt={};E(He=>{p(Nt,He),Pt!==(Pt=e(gt).value)&&(ht.value=(ht.__value=e(gt).value)??"")},[()=>i(e(gt).value)]),g(tt,ht)});var Be=d(ft,2),Ce=s(Be),Te=s(Ce),nt=d(Ce,2);Me(nt,21,()=>o,tt=>tt.value,(tt,gt)=>{var ht=ns(),Nt=s(ht),Pt={};E(He=>{p(Nt,He),Pt!==(Pt=e(gt).value)&&(ht.value=(ht.__value=e(gt).value)??"")},[()=>u(e(gt).value)]),g(tt,ht)});var ct=d(Be,2);{var Dt=tt=>{var gt=Q_(),ht=s(gt),Nt=s(ht),Pt=d(ht,2);Me(Pt,21,()=>t.tags,He=>He.id,(He,Fe)=>{const dt=F(()=>e(T).includes(e(Fe).id));var ee=J_();let Se;var Le=s(ee);E(()=>{Se=at(ee,1,"chip svelte-1vpobhk",null,Se,{on:e(dt)}),A(ee,"aria-pressed",e(dt)),p(Le,e(Fe).name)}),G("click",ee,()=>f(T,e(dt)?e(T).filter(Je=>Je!==e(Fe).id):[...e(T),e(Fe).id],!0)),g(He,ee)}),E(()=>p(Nt,e(n).filter.tag)),g(tt,gt)};se(ct,tt=>{t.tags.length>0&&tt(Dt)})}var zt=d(ct,2),Jt=s(zt),ua=s(Jt);E(()=>{p(pe,e(n).filter.project),p(_e,e(n).task.detailNoProject),ne!==(ne=e(m)??"")&&(ge.value=(ge.__value=e(m)??"")??"",It(ge,e(m)??"")),p(Ne,e(n).filter.priority),p(Ke,e(n).priority.high),p(V,e(n).priority.medium),p(b,e(n).priority.low),p(X,e(n).priority.none),R!==(R=e(h))&&(je.value=(je.__value=e(h))??"",It(je,e(h))),p(oe,e(n).filter.dueDate),p(it,e(n).form.estimatedPomo),p(Ve,e(n).task.detailReminder),p(Te,e(n).task.detailRepeat),p(ua,e(n).form.submit)}),G("change",ge,tt=>{const gt=tt.currentTarget.value;f(m,gt||null,!0)}),G("change",je,tt=>{f(h,tt.currentTarget.value,!0)}),G("input",ye,tt=>{tt.currentTarget.value.length===16&&tt.currentTarget.blur()}),kt(ye,()=>e(y),tt=>f(y,tt)),kt(lt,()=>e(x),tt=>f(x,tt)),G("change",Oe,()=>f(D,!1)),uo(Oe,()=>e(S),tt=>f(S,tt)),G("change",nt,tt=>{tt.currentTarget.value==="custom"?f(Y,!0):f(P,null)}),uo(nt,()=>e(M),tt=>f(M,tt)),G("click",Jt,I),g(q,W)};se(Z,q=>{e(L)&&q(de)})}var ke=d(Z,2);Gc(ke,{get open(){return e(Y)},get initialConfig(){return e(P)},onConfirm:q=>{f(P,q,!0),f(Y,!1)},onClose:()=>f(Y,!1)}),E(()=>{A($,"placeholder",e(n).form.titlePlaceholder),A(j,"aria-label",e(n).form.pomodoroIcons),p(J,e(L)?e(n).form.collapse:e(n).form.more)}),yt("submit",re,ie),kt($,()=>e(_),q=>f(_,q)),G("click",U,ae),g(a,re),pt()}xt(["click","change","input"]);//! 月历工具:ISO 日期格式化 + 自然周(周一起点)计算。
//! 手账视图(JournalView)与月度复盘面板(MonthReviewPanel)共用。
//! (v1 frontend/src/utils/calendar.ts 对应物,v1 12bc45a 抽取)
function wr(a){return String(a).padStart(2,"0")}function vn(a){return`${a.getFullYear()}-${wr(a.getMonth()+1)}-${wr(a.getDate())}`}function Kc(a,t){const n=[],r=new Date(a,t-1,1);for(;r.getDay()!==1;)r.setDate(r.getDate()+1);for(;r.getMonth()===t-1;)n.push(new Date(r)),r.setDate(r.getDate()+7);return n}var tp=C('<button type="button"><!></button>');function ap(a,t){_t(t,!0);const n=F(mt);var r=tp();let o;var c=s(r);{var l=i=>{Wa(i,{size:10,strokeWidth:3,color:"#fff"})};se(c,i=>{t.completed&&i(l)})}E(()=>{o=at(r,1,"checkbox svelte-1bxwwxl",null,o,{completed:t.completed}),A(r,"aria-label",t.completed?e(n).common.ariaCompleted:e(n).common.ariaMarkDone)}),G("click",r,i=>{i.stopPropagation(),t.onToggle()}),g(a,r),pt()}xt(["click"]);var nl=C("<option> </option>"),np=C('<div class="no-task svelte-tr144z"> </div>'),rp=C('<div class="task-row svelte-tr144z"><!> <span> </span></div>'),op=C('<div class="day-cell svelte-tr144z"><div> </div> <!> <div class="day-divider svelte-tr144z"></div> <!></div>'),sp=C('<section class="week-card svelte-tr144z"><div class="week-title svelte-tr144z"> </div> <div class="day-grid svelte-tr144z"></div> <div class="weekly-block svelte-tr144z"><div class="weekly-label svelte-tr144z"> </div> <!></div></section>'),ip=C('<div class="journal svelte-tr144z"><div class="inner svelte-tr144z"><div class="head svelte-tr144z"><h1 class="title svelte-tr144z"> </h1> <div class="month-nav svelte-tr144z"><button type="button" class="nav-btn svelte-tr144z"><!></button> <select class="select svelte-tr144z"></select> <select class="select svelte-tr144z"></select> <button type="button" class="nav-btn svelte-tr144z"><!></button></div></div> <div class="weeks svelte-tr144z"></div></div></div>');function lp(a,t){_t(t,!0);const n=F(mt),r=Array.from({length:61},(Z,de)=>2026+de),o=Array.from({length:12},(Z,de)=>de+1);let c=H(ze([])),l=H(ze([]));async function i(Z,de){const ke=vn(new Date(Z,de-1,1)),q=vn(new Date(Z,de,0));try{const[W,B]=await Promise.all([jc(Z,de),af(ke,q)]);if(Z!==t.year||de!==t.month)return;f(c,W,!0),f(l,B,!0)}catch(W){console.warn("journal load reviews failed",W)}}St(()=>{const Z=t.year,de=t.month;i(Z,de)});const u=F(()=>{const Z=e(n).journal.weekday;return Kc(t.year,t.month).map((de,ke)=>{const q=Array.from({length:7},(Q,pe)=>{const ge=new Date(de);return ge.setDate(ge.getDate()+pe),ge}),W=q[6],B=q.map((Q,pe)=>({iso:vn(Q),label:`${Z[pe]} ${Q.getMonth()+1}/${Q.getDate()}`}));return{startISO:vn(de),title:Ft(e(n).journal.weekRange,{n:ke+1,ms:de.getMonth()+1,ds:de.getDate(),me:W.getMonth()+1,de:W.getDate()}),days:B}})});function v(Z){return Z===vn(new Date)}const _=F(()=>{const Z=new Map;for(const de of t.tasks){const ke=Ht(de.due_date);ke&&(Z.has(ke)||Z.set(ke,[]),Z.get(ke).push(de))}return Z}),m=F(()=>new Map(e(c).map(Z=>[Z.week_start,Z]))),h=F(()=>new Map(e(l).map(Z=>[Z.date,Z])));function y(){t.month===1?(t.onMonthChange(12),t.onYearChange(t.year-1)):t.onMonthChange(t.month-1)}function x(){t.month===12?(t.onMonthChange(1),t.onYearChange(t.year+1)):t.onMonthChange(t.month+1)}async function S(Z){var de;try{Z.status==="active"?await Dc(Z.id):await Pc(Z.id),(de=t.onTasksChange)==null||de.call(t)}catch(ke){console.warn("journal toggle task failed",ke)}}async function M(Z,de){try{const ke=e(h).get(Z),q=ke?{...ke,content:de}:{id:crypto.randomUUID(),date:Z,content:de,updated_at:new Date().toISOString()};await Cc(q),await i(t.year,t.month)}catch(ke){console.warn("journal save daily review failed",ke)}}async function P(Z){try{await Nc(Z),await i(t.year,t.month)}catch(de){console.warn("journal delete daily review failed",de)}}async function Y(Z,de){var ke;try{const q=e(m).get(Z),W=q?{...q,content:de}:{id:crypto.randomUUID(),week_start:Z,content:de,updated_at:new Date().toISOString()};await nf(W),await i(t.year,t.month),(ke=t.onReviewChange)==null||ke.call(t)}catch(q){console.warn("journal save weekly review failed",q)}}async function T(Z){var de;try{await rf(Z),await i(t.year,t.month),(de=t.onReviewChange)==null||de.call(t)}catch(ke){console.warn("journal delete weekly review failed",ke)}}var L=ip(),k=s(L),D=s(k),I=s(D),ie=s(I),ae=d(I,2),re=s(ae),te=s(re);dv(te,{size:16});var ce=d(re,2);Me(ce,20,()=>r,Z=>Z,(Z,de)=>{var ke=nl(),q=s(ke),W={};E(B=>{p(q,B),W!==(W=de)&&(ke.value=(ke.__value=de)??"")},[()=>Ft(e(n).journal.yearOption,{year:de})]),g(Z,ke)});var $;Bt(ce);var j=d(ce,2);Me(j,20,()=>o,Z=>Z,(Z,de)=>{var ke=nl(),q=s(ke),W={};E(B=>{p(q,B),W!==(W=de)&&(ke.value=(ke.__value=de)??"")},[()=>Ft(e(n).journal.monthOption,{month:de})]),g(Z,ke)});var U;Bt(j);var J=d(j,2),he=s(J);Jn(he,{size:16});var be=d(D,2);Me(be,21,()=>e(u),Z=>Z.startISO,(Z,de)=>{var ke=sp(),q=s(ke),W=s(q),B=d(q,2);Me(B,21,()=>e(de).days,_e=>_e.iso,(_e,O)=>{var ne=op(),ue=s(ne);let we;var Ne=s(ue),je=d(ue,2);{var We=z=>{var b=np(),w=s(b);E(()=>p(w,e(n).common.noData)),g(z,b)},Ke=F(()=>(e(_).get(e(O).iso)??[]).length===0),Ye=z=>{var b=qe(),w=Ee(b);Me(w,17,()=>e(_).get(e(O).iso)??[],X=>X.id,(X,R,K,ve)=>{var oe=rp(),ye=s(oe);{let lt=F(()=>e(R).status==="completed");ap(ye,{get completed(){return e(lt)},onToggle:()=>S(e(R))})}var me=d(ye,2);let Ie;var it=s(me);E(()=>{Ie=at(me,1,"task-title svelte-tr144z",null,Ie,{done:e(R).status==="completed"}),p(it,e(R).title)}),g(X,oe)}),g(z,b)};se(je,z=>{e(Ke)?z(We):z(Ye,-1)})}var V=d(je,4);{let z=F(()=>{var b;return((b=e(h).get(e(O).iso))==null?void 0:b.content)??null});go(V,{get value(){return e(z)},get placeholder(){return e(n).journal.dailyReviewPlaceholder},rows:2,onSave:b=>M(e(O).iso,b),onDelete:()=>P(e(O).iso)})}E(z=>{we=at(ue,1,"day-head svelte-tr144z",null,we,z),p(Ne,e(O).label)},[()=>({today:v(e(O).iso)})]),g(_e,ne)});var Q=d(B,2),pe=s(Q),ge=s(pe),fe=d(pe,2);{let _e=F(()=>{var O;return((O=e(m).get(e(de).startISO))==null?void 0:O.content)??null});go(fe,{get value(){return e(_e)},get placeholder(){return e(n).journal.weeklyReviewPlaceholder},rows:5,onSave:O=>Y(e(de).startISO,O),onDelete:()=>T(e(de).startISO)})}E(()=>{p(W,e(de).title),p(ge,e(n).journal.weeklyReview)}),g(Z,ke)}),E(Z=>{p(ie,Z),A(re,"title",e(n).journal.prevMonth),A(re,"aria-label",e(n).journal.prevMonth),A(ce,"aria-label",e(n).journal.yearAria),$!==($=t.year)&&(ce.value=(ce.__value=t.year)??"",It(ce,t.year)),A(j,"aria-label",e(n).journal.monthAria),U!==(U=t.month)&&(j.value=(j.__value=t.month)??"",It(j,t.month)),A(J,"title",e(n).journal.nextMonth),A(J,"aria-label",e(n).journal.nextMonth)},[()=>Ft(e(n).journal.monthTitle,{year:t.year,month:t.month})]),G("click",re,y),G("change",ce,Z=>t.onYearChange(Number(Z.currentTarget.value))),G("change",j,Z=>t.onMonthChange(Number(Z.currentTarget.value))),G("click",J,x),g(a,L),pt()}xt(["click","change"]);var cp=C('<div class="week-card svelte-w363gh"><div class="week-head svelte-w363gh"> </div> <div> </div></div>'),dp=C('<aside class="panel svelte-w363gh"><h2 class="title svelte-w363gh"> </h2> <div class="weekly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <div class="week-list svelte-w363gh"></div></div> <div class="monthly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div></aside>');function up(a,t){_t(t,!0);const n=F(mt);let r=H(ze([])),o=H(null);async function c(k,D){try{const[I,ie]=await Promise.all([jc(k,D),of(`${k}-${wr(D)}`)]);if(k!==t.year||D!==t.month)return;f(r,I,!0),f(o,ie,!0)}catch(I){console.warn("month panel load failed",I)}}St(()=>{const k=t.year,D=t.month;t.reviewVersion,c(k,D)});const l=F(()=>Kc(t.year,t.month)),i=F(()=>{const k=new Map;for(const D of e(r))k.set(D.week_start,D.content);return k});async function u(k){try{const D=`${t.year}-${wr(t.month)}`,I=e(o)?{...e(o),content:k}:{id:crypto.randomUUID(),year_month:D,content:k,updated_at:new Date().toISOString()};await sf(I),await c(t.year,t.month)}catch(D){console.warn("month panel save failed",D)}}async function v(){try{await lf(`${t.year}-${wr(t.month)}`),await c(t.year,t.month)}catch(k){console.warn("month panel delete failed",k)}}var _=dp(),m=s(_),h=s(m),y=d(m,2),x=s(y),S=s(x),M=d(x,2);Me(M,23,()=>e(l),k=>vn(k),(k,D,I)=>{const ie=F(()=>vn(e(D))),ae=F(()=>e(i).get(e(ie)));var re=cp(),te=s(re),ce=s(te),$=d(te,2);let j;var U=s($);E((J,he,be)=>{p(ce,J),j=at($,1,"week-content svelte-w363gh",null,j,he),p(U,be)},[()=>Ft(e(n).monthPanel.weekRange,{n:e(I)+1,date:e(ie)}),()=>{var J;return{dimmed:!((J=e(ae))!=null&&J.trim())}},()=>{var J;return(J=e(ae))!=null&&J.trim()?e(ae):e(n).monthPanel.empty}]),g(k,re)});var P=d(y,2),Y=s(P),T=s(Y),L=d(Y,2);{let k=F(()=>{var D;return((D=e(o))==null?void 0:D.content)??null});go(L,{get value(){return e(k)},get placeholder(){return e(n).monthPanel.monthlyPlaceholder},rows:6,onSave:u,onDelete:v})}E((k,D)=>{A(_,"aria-label",k),p(h,D),p(S,e(n).monthPanel.weeklyReadonly),p(T,e(n).monthPanel.monthlyReview)},[()=>Ft(e(n).monthPanel.title,{year:t.year,month:t.month}),()=>Ft(e(n).monthPanel.title,{year:t.year,month:t.month})]),g(a,_),pt()}var vp=C('<h1 class="title svelte-969q1d"> </h1>'),fp=C('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),hp=C('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),_p=C('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),pp=C('<p class="loading svelte-969q1d"> </p>'),gp=C('<p class="empty svelte-969q1d"> </p>'),mp=C('<div class="task-list svelte-969q1d"></div>'),bp=C('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),yp=C('<aside class="detail-empty svelte-969q1d"> </aside>'),kp=C('<div class="page page-veil svelte-969q1d"><!> <div><!></div> <!></div>');function wp(a,t){_t(t,!0);let n=H(ze([])),r=H(ze([])),o=H(ze([])),c=H(!0),l=H(null);const i=F(mt);let u=H(null),v=H("today"),_=H(""),m=H(null),h=H(ze(new Date().getFullYear())),y=H(new Date().getMonth()+1),x=H(0),S=H(null),M=H(null),P=H(null),Y=H(null),T=H(""),L=H(""),k=H(null),D=H(null),I=H(null),ie=H(null),ae=H(""),re=H("");const te=F(()=>{let V=[...e(n)];const z={high:0,medium:1,low:2,none:3};if(e(_).trim()){const ye=e(_).trim().toLowerCase();return V=V.filter(me=>me.title.toLowerCase().includes(ye)),V.sort((me,Ie)=>{if(me.status!==Ie.status)return me.status==="active"?-1:1;const it=z[me.priority||"none"]??3,lt=z[Ie.priority||"none"]??3;return it!==lt?it-lt:new Date(me.created_at??0).getTime()-new Date(Ie.created_at??0).getTime()}),V}const b=Aa(),w=no(),X=new Date,R=X.getDay(),K=R===0?6:R-1,ve=new Date(X);ve.setDate(ve.getDate()-K),ve.setHours(0,0,0,0);const oe=new Date(ve);return oe.setDate(oe.getDate()+6),oe.setHours(23,59,59,999),e(u)!==null?V=V.filter(ye=>ye.project_id===e(u)):e(v)==="today"?V=V.filter(ye=>Ht(ye.due_date)===b):e(v)==="tomorrow"?V=V.filter(ye=>Ht(ye.due_date)===w):e(v)==="week"?V=V.filter(ye=>{if(!ye.due_date)return!1;const me=new Date(ye.due_date);return me>=ve&&me<=oe}):e(v)==="planned"?V=ce(V,{project:e(S),tag:e(M),priority:e(P),preset:e(Y),startDate:e(T),endDate:e(L)}):e(v)==="completed"?(V=V.filter(ye=>ye.status==="completed"),V=ce(V,{project:e(k),tag:e(D),priority:e(I),preset:e(ie),startDate:e(ae),endDate:e(re)})):e(v)==="journal"&&(V=V.filter(ye=>!!ye.due_date)),V.sort((ye,me)=>{if(ye.status!==me.status)return ye.status==="active"?-1:1;const Ie=z[ye.priority||"none"]??3,it=z[me.priority||"none"]??3;return Ie!==it?Ie-it:new Date(ye.created_at??0).getTime()-new Date(me.created_at??0).getTime()}),V});function ce(V,z){let b=V;if(z.project!==null&&(b=b.filter(w=>w.project_id===z.project)),z.tag!==null&&(b=b.filter(w=>(w.tags??[]).some(X=>X.id===z.tag))),z.priority!==null&&(b=b.filter(w=>w.priority===z.priority)),z.preset==="week"){const w=new Date,X=w.getDay(),R=X===0?6:X-1,K=new Date(w);K.setDate(w.getDate()-R);const ve=new Date(K);ve.setDate(K.getDate()+6);const oe=Ht(K.toISOString()),ye=Ht(ve.toISOString());b=b.filter(me=>{const Ie=Ht(me.due_date);return!!Ie&&Ie>=oe&&Ie<=ye})}if(z.preset==="month"){const w=new Date,X=`${w.getFullYear()}-${String(w.getMonth()+1).padStart(2,"0")}-01`,R=new Date(w.getFullYear(),w.getMonth()+1,0),K=Ht(R.toISOString());b=b.filter(ve=>{const oe=Ht(ve.due_date);return!!oe&&oe>=X&&oe<=K})}return z.startDate&&(b=b.filter(w=>{const X=Ht(w.due_date);return!!X&&X>=z.startDate})),z.endDate&&(b=b.filter(w=>{const X=Ht(w.due_date);return!!X&&X<=z.endDate})),b}const $=F(()=>{const V=e(te).filter(R=>R.status==="active").reduce((R,K)=>R+(K.estimated_pomodoros||0)*(K.pomodoro_duration||25),0),z=e(te).filter(R=>R.status==="active").length,b=e(te).reduce((R,K)=>R+(K.completed_pomodoros||0)*(K.pomodoro_duration||25),0),w=e(te).reduce((R,K)=>R+(K.completed_pomodoros||0),0),X=e(te).filter(R=>R.status==="completed").length;return{estimatedMinutes:V,activeCount:z,focusedMinutes:b,completedCount:X,completedPomodoros:w}}),j=F(()=>{if(e(_).trim())return`${e(i).task.searchResult} (${e(te).length})`;if(e(u)!==null){const z=e(r).find(b=>b.id===e(u));return(z==null?void 0:z.name)||e(i).task.list}return{today:e(i).filter.today,tomorrow:e(i).filter.tomorrow,week:e(i).filter.week,planned:e(i).sidebar.planned,completed:e(i).sidebar.completed,journal:e(i).sidebar.journal,"":e(i).task.task}[e(v)]||e(i).task.task});async function U(){try{const[V,z,b]=await Promise.all([En({}),ti(),ai()]);if(f(n,V.map(w=>({...w,tags:w.tags??[]})),!0),f(r,z,!0),f(o,b,!0),e(m)){const w=e(n).find(X=>X.id===e(m).id);f(m,w??null,!0)}Qf()}catch(V){f(l,String(V),!0)}finally{f(c,!1)}}ln(U);function J(){return new Date().toISOString()}function he(){return crypto.randomUUID()}async function be(V){const z=typeof V=="string"?V:V.id,b=typeof V=="string"?e(n).find(w=>w.id===z):V;if(b)try{b.status==="active"?await Dc(z):await Pc(z),await U()}catch(w){f(l,String(w),!0)}}async function Z(V,z=null){try{await ho({id:he(),name:V,color:"#c97b6e",parent_id:z??null,created_at:J(),updated_at:J()}),await U()}catch(b){f(l,String(b),!0)}}async function de(V,z){try{const b=e(r).find(w=>w.id===V);if(!b)return;await ho({...b,name:z,updated_at:J()}),await U()}catch(b){f(l,String(b),!0)}}async function ke(V){if(confirm(e(i).sidebar.deleteListConfirm))try{await Mc(V),e(u)===V&&f(u,null),await U()}catch(z){f(l,String(z),!0)}}function q(V){f(m,V,!0)}function W(){f(m,null)}function B(){U()}async function Q(V){try{await Af(V),mc("/timer")}catch(z){f(l,String(z),!0)}}async function pe(V){const z=V.due_date??(e(v)==="tomorrow"?no():Aa());try{const b=he();await Ss({id:b,title:V.title,description:"",project_id:V.project_id??e(u),priority:V.priority,status:"active",due_date:Fs(mo(z)?z:`${z}T00:00:00`),estimated_pomodoros:V.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:V.pomodoro_duration,reminder:V.reminder??"none",repeat:V.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:V.repeat_config??null,completed_at:null,created_at:J(),updated_at:J()},V.tag_ids),await U()}catch(b){f(l,String(b),!0)}}async function ge(){try{const V=await Qh({defaultPath:`${e(i).export.fileName}_${Aa()}.xlsx`,filters:[{name:"xlsx",extensions:["xlsx"]}]});if(!V)return;const z=[e(i).export.index,e(i).export.title,e(i).export.project,e(i).export.priority,e(i).export.dueDate,e(i).export.estimated,e(i).export.tags,e(i).export.subtasks,e(i).export.status],b=e(te).map(w=>{var X;return{title:w.title,project:((X=e(r).find(R=>R.id===w.project_id))==null?void 0:X.name)??"",priority:e(i).priority[w.priority??"none"]??w.priority??"",dueDate:Ht(w.due_date),estimated:w.estimated_pomodoros??0,tags:(w.tags??[]).map(R=>R.name).join(", "),subtasks:(w.subtasks??[]).map(R=>R.title).join(`
`),status:w.status==="completed"?e(i).export.statusCompleted:e(i).export.statusActive}});await _f(V,e(i).nav.tasks,z,b)}catch(V){f(l,String(V),!0)}}var fe=kp();Or("969q1d",V=>{qr(()=>{nr.title=e(i).page.tasks??""})});var _e=s(fe);f_(_e,{get projects(){return e(r)},get filter(){return e(v)},get selectedProject(){return e(u)},onSetFilter:V=>{f(v,V,!0),f(_,"")},onSelectProject:V=>{f(u,V,!0),f(_,"")},onCreateProject:Z,onUpdateProject:de,onDeleteProject:ke,get search(){return e(_)},onSearchChange:V=>{f(_,V,!0),V.trim()&&(f(u,null),f(v,""))},get tasks(){return e(n)}});var O=d(_e,2);let ne;var ue=s(O);{var we=V=>{lp(V,{get year(){return e(h)},get month(){return e(y)},get tasks(){return e(te)},onYearChange:z=>f(h,z,!0),onMonthChange:z=>f(y,z,!0),onReviewChange:()=>f(x,e(x)+1),onTasksChange:()=>void U()})},Ne=V=>{var z=bp(),b=s(z);{var w=Ce=>{var Te=vp(),nt=s(Te);E(()=>p(nt,e(j))),g(Ce,Te)};se(b,Ce=>{e(j)&&Ce(w)})}var X=d(b,2);{var R=Ce=>{var Te=fp(),nt=s(Te);Yt(nt,{get icon(){return Qn},get label(){return e(i).task.statFocused},get value(){return e($).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var ct=d(nt,2);Yt(ct,{get icon(){return Ts},get label(){return e(i).task.statCompletedPomo},get value(){return e($).completedPomodoros},get unit(){return e(i).stats.unitCount},accent:!0});var Dt=d(ct,2);Yt(Dt,{get icon(){return xs},get label(){return e(i).task.statCompleted},get value(){return e($).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),g(Ce,Te)},K=Ce=>{var Te=hp(),nt=s(Te);Yt(nt,{get icon(){return Qn},get label(){return e(i).task.statEstimated},get value(){return e($).estimatedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var ct=d(nt,2);Yt(ct,{get icon(){return Ts},get label(){return e(i).task.statActive},get value(){return e($).activeCount},get unit(){return e(i).stats.unitCount},accent:!0});var Dt=d(ct,2);Yt(Dt,{get icon(){return Qs},get label(){return e(i).task.statFocused},get value(){return e($).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var zt=d(Dt,2);Yt(zt,{get icon(){return xs},get label(){return e(i).task.statCompleted},get value(){return e($).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),g(Ce,Te)};se(X,Ce=>{e(v)==="completed"?Ce(R):Ce(K,-1)})}var ve=d(X,2);{var oe=Ce=>{al(Ce,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(k)},setFilterProject:Te=>f(k,Te,!0),get filterTag(){return e(D)},setFilterTag:Te=>f(D,Te,!0),get filterPriority(){return e(I)},setFilterPriority:Te=>f(I,Te,!0),get filterPreset(){return e(ie)},setFilterPreset:Te=>f(ie,Te,!0),get filterStartDate(){return e(ae)},setFilterStartDate:Te=>f(ae,Te,!0),get filterEndDate(){return e(re)},setFilterEndDate:Te=>f(re,Te,!0)})},ye=Ce=>{al(Ce,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(S)},setFilterProject:Te=>f(S,Te,!0),get filterTag(){return e(M)},setFilterTag:Te=>f(M,Te,!0),get filterPriority(){return e(P)},setFilterPriority:Te=>f(P,Te,!0),get filterPreset(){return e(Y)},setFilterPreset:Te=>f(Y,Te,!0),get filterStartDate(){return e(T)},setFilterStartDate:Te=>f(T,Te,!0),get filterEndDate(){return e(L)},setFilterEndDate:Te=>f(L,Te,!0),onExport:ge})};se(ve,Ce=>{e(v)==="completed"?Ce(oe):e(v)==="planned"&&Ce(ye,1)})}var me=d(ve,2);{var Ie=Ce=>{{let Te=F(()=>e(v)==="tomorrow"?no():Aa());ep(Ce,{get projects(){return e(r)},get tags(){return e(o)},get defaultProjectId(){return e(u)},get defaultDueDate(){return e(Te)},onAdd:pe})}};se(me,Ce=>{e(v)!=="completed"&&Ce(Ie)})}var it=d(me,2);{var lt=Ce=>{var Te=_p(),nt=s(Te),ct=s(nt),Dt=d(nt,2);E(()=>p(ct,`⚠ ${e(l)??""}`)),G("click",Dt,()=>f(l,null)),g(Ce,Te)};se(it,Ce=>{e(l)&&Ce(lt)})}var ft=d(it,2);{var rt=Ce=>{var Te=pp(),nt=s(Te);E(()=>p(nt,e(i).common.loading)),g(Ce,Te)},Ve=Ce=>{var Te=gp(),nt=s(Te);E(()=>p(nt,e(i).task.noTask)),g(Ce,Te)},Oe=Ce=>{H_(Ce,{get tasks(){return e(te)},groupBy:"due_date",get selectedTask(){return e(m)},onToggle:be,onSelect:q,onStart:Q})},Be=Ce=>{var Te=mp();Me(Te,21,()=>e(te),nt=>nt.id,(nt,ct)=>{{let Dt=F(()=>{var zt;return((zt=e(m))==null?void 0:zt.id)===e(ct).id});Yc(nt,{get task(){return e(ct)},get selected(){return e(Dt)},onToggle:()=>be(e(ct)),onSelect:q,onStart:Q})}}),g(Ce,Te)};se(ft,Ce=>{e(c)?Ce(rt):e(te).length===0?Ce(Ve,1):e(v)==="week"||e(v)==="planned"||e(v)==="completed"?Ce(Oe,2):Ce(Be,-1)})}g(V,z)};se(ue,V=>{e(v)==="journal"?V(we):V(Ne,-1)})}var je=d(O,2);{var We=V=>{up(V,{get year(){return e(h)},get month(){return e(y)},get reviewVersion(){return e(x)}})},Ke=V=>{L_(V,{get task(){return e(m)},get projects(){return e(r)},get allTags(){return e(o)},onClose:W,onChanged:B})},Ye=V=>{var z=yp(),b=s(z);E(()=>p(b,e(i).task.detailEmpty)),g(V,z)};se(je,V=>{e(v)==="journal"?V(We):e(m)?V(Ke,1):V(Ye,-1)})}E(()=>ne=at(O,1,"main svelte-969q1d",null,ne,{journal:e(v)==="journal"})),g(a,fe),pt()}xt(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
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
const xp=[{key:"today",group:"day"},{key:"week",group:"day"},{key:"month",group:"day"},{key:"quarter",group:"week"},{key:"halfyear",group:"month"},{key:"year",group:"month"}];function rl(a){return String(a).padStart(2,"0")}function Mt(a){return`${a.getFullYear()}-${rl(a.getMonth()+1)}-${rl(a.getDate())}`}function rs(a,t){return Math.round((t.getTime()-a.getTime())/864e5)+1}function ol(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today")return{start:Mt(n),end:Mt(n),days:1,group:"day"};if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Mt(i),end:Mt(u),days:7,group:"day"}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth(),1),u=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:Mt(i),end:Mt(u),days:u.getDate(),group:"day"}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),i*3,1),v=new Date(n.getFullYear(),i*3+3,0);return{start:Mt(u),end:Mt(v),days:rs(u,v),group:"week"}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i,1),v=new Date(n.getFullYear(),i+6,0);return{start:Mt(u),end:Mt(v),days:rs(u,v),group:"month"}}const c=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31);return{start:Mt(c),end:Mt(l),days:rs(c,l),group:"month"}}function Tp(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today"){const i=new Date(n);return i.setDate(n.getDate()-1),{start:Mt(i),end:Mt(i)}}if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o-7);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Mt(i),end:Mt(u)}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth()-1,1),u=new Date(n.getFullYear(),n.getMonth(),0);return{start:Mt(i),end:Mt(u)}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),(i-1)*3,1),v=new Date(n.getFullYear(),i*3,0);return{start:Mt(u),end:Mt(v)}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i-6,1),v=new Date(n.getFullYear(),i,0);return{start:Mt(u),end:Mt(v)}}const c=new Date(n.getFullYear()-1,0,1),l=new Date(n.getFullYear()-1,11,31);return{start:Mt(c),end:Mt(l)}}function Vc(a,t){return t==="month"?`${Number(a.slice(5,7))}`:`${Number(a.slice(5,7))}/${Number(a.slice(8,10))}`}function Sp(a,t=new Date){return Mt(t)}var Dp=C('<div class="empty svelte-1ixrxd8"> </div>'),Pp=Va('<line class="grid svelte-1ixrxd8"></line>'),Mp=Va('<line class="tick-line svelte-1ixrxd8"></line><text class="tick svelte-1ixrxd8" text-anchor="end"> </text>',1),Ep=Va("<path></path>"),Cp=Va('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),Np=Va('<!><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),jp=C('<div class="tooltip svelte-1ixrxd8"> </div>'),Fp=C('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" class="svelte-1ixrxd8"><!><line class="axis svelte-1ixrxd8"></line><!><line class="axis svelte-1ixrxd8"></line><!></svg> <!></div>');function Ap(a,t){_t(t,!0);const n=F(mt),r=234,o={top:8,right:8,bottom:24,left:44},c=10,l=32,i=4;let u=H(0);const v=F(()=>e(u)>0?e(u):600),_=F(()=>e(v)-o.left-o.right),m=r-o.top-o.bottom;let h=H(null);function y(k){if(k<=0)return 0;const D=Math.pow(10,Math.floor(Math.log10(k))),I=k/D;return(I<=1?1:I<=2?2:I<=5?5:10)*D}function x(k,D,I,ie,ae){const re=Math.min(ae,I/2,Math.max(0,ie));return`M ${k} ${D+ie} L ${k} ${D+re} Q ${k} ${D} ${k+re} ${D} L ${k+I-re} ${D} Q ${k+I} ${D} ${k+I} ${D+re} L ${k+I} ${D+ie} Z`}const S=F(()=>{const k=t.data.length,D=t.data.reduce((j,U)=>Math.max(j,U.minutes),0),I=y(D),ie=k>0?e(_)/k:e(_),ae=Math.min(ie*.62,l),re=Math.max(1,Math.ceil(k/c)),te=t.group==="day"?Sp():null,ce=t.data.map((j,U)=>{const J=j.minutes>0&&I>0?j.minutes/I*m:0,he=o.left+ie*U+(ie-ae)/2,be=o.top+m-J;return{i:U,key:j.key,minutes:j.minutes,x:he,y:be,w:ae,h:J,path:x(he,be,ae,J,i),hitX:o.left+ie*U,hitW:ie,label:Vc(j.key,t.group),showLabel:U%re===0||U===k-1,isCurrent:te!==null&&j.key===te}}),$=[0,.25,.5,.75,1].map(j=>({y:o.top+m-j*m,value:Math.round(I*j)}));return{bars:ce,ticks:$,baseline:o.top+m}}),M=F(()=>e(h)!==null?e(S).bars[e(h)]:null);var P=qe(),Y=Ee(P);{var T=k=>{var D=Dp(),I=s(D);E(()=>p(I,t.emptyText??e(n).stats.noData)),g(k,D)},L=k=>{var D=Fp(),I=s(D);A(I,"height",r);var ie=s(I);Me(ie,17,()=>e(S).ticks.slice(1,-1),La,(U,J)=>{var he=Pp();E(()=>{A(he,"x1",o.left),A(he,"x2",e(v)-o.right),A(he,"y1",e(J).y),A(he,"y2",e(J).y)}),g(U,he)});var ae=d(ie),re=d(ae);Me(re,17,()=>e(S).ticks,La,(U,J)=>{var he=Mp(),be=Ee(he),Z=d(be),de=s(Z);E(()=>{A(be,"x1",o.left-4),A(be,"x2",o.left),A(be,"y1",e(J).y),A(be,"y2",e(J).y),A(Z,"x",o.left-6),A(Z,"y",e(J).y+3.5),p(de,e(J).value)}),g(U,he)});var te=d(re),ce=d(te);Me(ce,17,()=>e(S).bars,U=>U.key,(U,J)=>{var he=Np(),be=Ee(he);{var Z=W=>{var B=Ep();let Q;E(()=>{Q=at(B,0,"bar svelte-1ixrxd8",null,Q,{current:e(J).isCurrent}),A(B,"d",e(J).path)}),g(W,B)};se(be,W=>{e(J).h>0&&W(Z)})}var de=d(be);{var ke=W=>{var B=Cp();A(B,"y",r-6);var Q=s(B);E(()=>{A(B,"x",e(J).x+e(J).w/2),p(Q,e(J).label)}),g(W,B)};se(de,W=>{e(J).showLabel&&W(ke)})}var q=d(de);E(()=>{A(q,"x",e(J).hitX),A(q,"y",o.top),A(q,"width",e(J).hitW),A(q,"height",m)}),yt("pointerenter",q,()=>f(h,e(J).i,!0)),yt("pointerleave",q,()=>f(h,null)),g(U,he)});var $=d(I,2);{var j=U=>{var J=jp();let he;var be=s(J);E(Z=>{he=At(J,"",he,Z),p(be,`${e(M).label??""} · ${e(M).minutes??""} ${e(n).stats.unitMin??""}`)},[()=>({left:Math.min(88,Math.max(12,(e(M).x+e(M).w/2)/e(v)*100))+"%",top:e(M).y/r*100+"%"})]),g(U,J)};se($,U=>{e(M)&&U(j)})}E(()=>{A(I,"viewBox",`0 0 ${e(v)??""} 234`),A(I,"width",e(v)),A(I,"aria-label",e(n).stats.trendChartAria),A(ae,"x1",o.left),A(ae,"x2",o.left),A(ae,"y1",o.top),A(ae,"y2",e(S).baseline),A(te,"x1",o.left),A(te,"x2",e(v)-o.right),A(te,"y1",e(S).baseline),A(te,"y2",e(S).baseline)}),yt("pointerleave",I,()=>f(h,null)),Gu(D,"clientWidth",U=>f(u,U)),g(k,D)};se(Y,k=>{t.data.length===0?k(T):k(L,-1)})}g(a,P),pt()}var Ip=C('<div class="empty svelte-s63rv4"> </div>'),qp=Va('<circle class="seg svelte-s63rv4" role="presentation" pathLength="100"></circle>'),Rp=Va('<text class="seg-label svelte-s63rv4" dominant-baseline="middle"> </text>'),Lp=C('<div class="tooltip svelte-s63rv4"> </div>'),Op=C('<div class="chart svelte-s63rv4"><svg role="img" class="svelte-s63rv4"><g></g><!></svg> <!></div>');function Bp(a,t){_t(t,!0);const n=F(mt),r=240,o=120,c=70,l=2/360*100,i=104,u=[500,300,700,400,200,600,800,100,900],v={100:"#faebe2",200:"#f4d5c4",300:"#ecb89d",400:"#e29676",500:"#d17b5c",600:"#b86649",700:"#9a523b",800:"#7a4130",900:"#5c3125"};function _(L){if(L<u.length){const k=u[L];return`var(--color-accent-${k}, ${v[String(k)]})`}return L===u.length?"var(--color-neutral-300, #d2ccc2)":`var(--color-accent-${u[L%u.length]}, ${v[String(u[L%u.length])]})`}function m(L){return L>u.length?Math.max(.4,1-(L-u.length)*.15):void 0}let h=H(null);const y=F(()=>t.projects.reduce((L,k)=>L+k.total_minutes,0)),x=F(()=>{if(e(y)<=0||t.projects.length===0)return[];const L=t.projects.length>1?l:0;let k=0;return t.projects.map((D,I)=>{const ie=D.total_minutes/e(y),ae=Math.max(.6,ie*100-L),re=(k+ie/2)/100*2*Math.PI-Math.PI/2,te=Math.cos(re),ce={i:I,p:D,len:ae,offset:k,color:_(I),opacity:m(I),midRad:re,lx:o+i*te,ly:o+i*Math.sin(re),anchor:Math.abs(te)<.35?"middle":te>0?"start":"end"};return k+=ie*100,ce})}),S=F(()=>e(h)!==null?e(x)[e(h)]:null);var M=qe(),P=Ee(M);{var Y=L=>{var k=Ip(),D=s(k);E(()=>p(D,t.emptyText??e(n).stats.noProject)),g(L,k)},T=L=>{var k=Op(),D=s(k);A(D,"viewBox","0 0 240 240");var I=s(D);A(I,"transform","rotate(-90 120 120)"),Me(I,21,()=>e(x),te=>te.p.project_id,(te,ce)=>{var $=qp();A($,"cx",o),A($,"cy",o),A($,"r",c);let j;E(()=>{A($,"opacity",e(ce).opacity),A($,"stroke-dasharray",`${e(ce).len??""} ${100-e(ce).len}`),A($,"stroke-dashoffset",-e(ce).offset),j=At($,"",j,{stroke:e(ce).color})}),yt("pointerenter",$,()=>f(h,e(ce).i,!0)),yt("pointerleave",$,()=>f(h,null)),g(te,$)});var ie=d(I);Me(ie,17,()=>e(x),te=>te.p.project_id,(te,ce)=>{var $=Rp(),j=s($);E(()=>{A($,"x",e(ce).lx),A($,"y",e(ce).ly),A($,"text-anchor",e(ce).anchor),p(j,e(ce).p.project_name)}),g(te,$)});var ae=d(D,2);{var re=te=>{var ce=Lp();let $;var j=s(ce);E(()=>{$=At(ce,"",$,{left:e(S).lx/r*100+"%",top:e(S).ly/r*100+"%"}),p(j,`${e(S).p.project_name??""} · ${e(S).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),g(te,ce)};se(ae,te=>{e(S)&&te(re)})}E(()=>A(D,"aria-label",e(n).stats.donutChartAria)),g(L,k)};se(P,L=>{e(x).length===0?L(Y):L(T,-1)})}g(a,M),pt()}var zp=C("<button> </button>"),Hp=C('<div class="error svelte-giv6a6" role="alert"> </div>'),Up=C('<p class="loading svelte-giv6a6"> </p>'),Wp=C('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),Yp=C('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section></div>',1),$p=C('<div class="stats-veil page-veil svelte-giv6a6"><div class="page svelte-giv6a6"><div class="dims svelte-giv6a6"></div> <!> <!></div></div>');function Gp(a,t){_t(t,!0);const n=F(mt);let r=H("week"),o=H(null),c=H(0),l=H(!0),i=H(null),u=0;const v=F(()=>ol(e(r))),_=F(()=>e(v).group),m=F(()=>e(_)==="day"?e(n).stats.byDay:e(_)==="week"?e(n).stats.byWeek:e(n).stats.byMonth),h=F(()=>({today:e(n).stats.dimToday,week:e(n).stats.dimWeek,month:e(n).stats.dimMonth,quarter:e(n).stats.dimQuarter,halfyear:e(n).stats.dimHalf,year:e(n).stats.dimYear})),y=F(()=>{var $;return(($=e(o))==null?void 0:$.summary.total_minutes)??0}),x=F(()=>{var $;return(($=e(o))==null?void 0:$.summary.total_sessions)??0}),S=F(()=>{var $;return(($=e(o))==null?void 0:$.summary.completed_tasks)??0}),M=F(()=>Math.round(e(y)/Math.max(1,e(v).days))),P=F(()=>{if(!e(o))return null;const $=e(o).trend;let j=0,U=0;for(const he of $)he.minutes>0?(U++,j=Math.max(j,U)):U=0;let J={key:"",minutes:0,sessions:0};for(const he of $)he.minutes>J.minutes&&(J=he);return{activeDays:$.filter(he=>he.minutes>0).length,longest:j,perPeriod:$.length>0?Math.round(e(y)/$.length):0,peak:J,projects:[...e(o).projects].sort((he,be)=>be.total_minutes-he.total_minutes)}}),Y=F(()=>e(c)>0?Math.round((e(y)-e(c))/e(c)*100):e(y)>0?100:0),T=F(()=>`${e(Y)>=0?"+":""}${e(Y)}%`),L=F(()=>e(P)?e(P).projects:[]);St(()=>{const $=ol(e(r)),j=Tp(e(r)),U=++u;f(o,null),f(c,0),f(i,null),f(l,!0);const J=-new Date().getTimezoneOffset();zi($.start,$.end,$.group,J).then(he=>{U===u&&(f(o,he,!0),f(l,!1))}).catch(he=>{U===u&&(f(i,String(he),!0),f(l,!1))}),zi(j.start,j.end,$.group,J).then(he=>{U===u&&f(c,he.summary.total_minutes,!0)}).catch(()=>{})});var k=$p();Or("giv6a6",$=>{qr(()=>{nr.title=e(n).page.stats??""})});var D=s(k),I=s(D);Me(I,21,()=>xp,$=>$.key,($,j)=>{var U=zp();let J;var he=s(U);E(()=>{J=at(U,1,"dim-pill svelte-giv6a6",null,J,{active:e(r)===e(j).key}),A(U,"aria-pressed",e(r)===e(j).key),p(he,e(h)[e(j).key])}),G("click",U,()=>f(r,e(j).key,!0)),g($,U)});var ie=d(I,2);{var ae=$=>{var j=Hp(),U=s(j);E(J=>p(U,`⚠ ${J??""}`),[()=>Ft(e(n).stats.loadError,{err:e(i)})]),g($,j)};se(ie,$=>{e(i)&&$(ae)})}var re=d(ie,2);{var te=$=>{var j=Up(),U=s(j);E(()=>p(U,e(n).stats.loading)),g($,j)},ce=$=>{var j=Yp(),U=Ee(j),J=s(U);Yt(J,{get icon(){return Qn},get label(){return e(n).stats.focusDuration},get value(){return e(y)},get unit(){return e(n).stats.unitMin},accent:!0});var he=d(J,2);Yt(he,{get icon(){return Qs},get label(){return e(n).stats.sessions},get value(){return e(x)},get unit(){return e(n).stats.unitCount},accent:!0});var be=d(he,2);Yt(be,{get icon(){return Ts},get label(){return e(n).stats.completed},get value(){return e(S)},get unit(){return e(n).stats.unitCount},accent:!0});var Z=d(be,2);Yt(Z,{get icon(){return Go},get label(){return e(n).stats.avg},get value(){return e(M)},get unit(){return e(n).stats.unitMin},accent:!0});var de=d(U,2);{var ke=ue=>{var we=Wp(),Ne=s(we);Yt(Ne,{get icon(){return fc},get label(){return e(n).stats.activeDays},get value(){return e(P).activeDays},get unit(){return e(n).stats.unitDay},accent:!0});var je=d(Ne,2);{var We=R=>{Yt(R,{get icon(){return fv},get label(){return e(n).stats.longestStreak},get value(){return e(P).longest},get unit(){return e(n).stats.unitDay},accent:!0})};se(je,R=>{(e(r)==="month"||e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&R(We)})}var Ke=d(je,2);{var Ye=R=>{{let K=F(()=>e(_)==="week"?e(n).stats.avgWeek:e(n).stats.avgMonth);Yt(R,{get icon(){return Go},get label(){return e(K)},get value(){return e(P).perPeriod},get unit(){return e(n).stats.unitMin},accent:!0})}};se(Ke,R=>{(e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&R(Ye)})}var V=d(Ke,2);{var z=R=>{{let K=F(()=>e(_)==="month"?e(n).stats.peakMonth:e(n).stats.peakPeriod),ve=F(()=>e(P).peak.key?Vc(e(P).peak.key,e(_)):"—"),oe=F(()=>e(P).peak.minutes?`${e(P).peak.minutes} ${e(n).stats.unitMin}`:"");Yt(R,{get icon(){return Fi},get label(){return e(K)},get value(){return e(ve)},get unit(){return e(oe)},accent:!0})}};se(V,R=>{(e(r)==="halfyear"||e(r)==="year")&&R(z)})}var b=d(V,2);{var w=R=>{{let K=F(()=>`${e(P).projects[0].total_minutes} ${e(n).stats.unitMin}`);Yt(R,{get icon(){return Fi},get label(){return e(n).stats.bestProject},get value(){return e(P).projects[0].project_name},get unit(){return e(K)},accent:!0})}};se(b,R=>{(e(r)==="halfyear"||e(r)==="year")&&e(P).projects[0]&&R(w)})}var X=d(b,2);Yt(X,{get icon(){return Go},get label(){return e(n).stats.momRatio},get value(){return e(T)},accent:!0}),g(ue,we)};se(de,ue=>{e(P)&&e(r)!=="today"&&ue(ke)})}var q=d(de,2);let W;var B=s(q),Q=s(B),pe=s(Q),ge=d(Q,2);Ap(ge,{get data(){return e(o).trend},get group(){return e(_)}});var fe=d(B,2),_e=s(fe),O=s(_e),ne=d(_e,2);Bp(ne,{get projects(){return e(L)}}),E(()=>{W=at(q,1,"charts svelte-giv6a6",null,W,{split:e(r)!=="month"}),p(pe,`${e(n).stats.trendTitle??""}（${e(m)??""}）`),p(O,e(n).stats.projectDist)}),g($,j)};se(re,$=>{e(l)?$(te):e(o)&&$(ce,1)})}g(a,k),pt()}xt(["click"]);var Kp=C('<button type="button" role="switch"><span class="knob svelte-1re5fgf"></span></button>');function vr(a,t){_t(t,!0);let n=ma(t,"disabled",3,!1);var r=Kp();let o;E(()=>{o=at(r,1,"switch svelte-1re5fgf",null,o,{on:t.checked}),A(r,"aria-checked",t.checked),A(r,"aria-label",t.label),r.disabled=n()}),G("click",r,()=>t.onChange(!t.checked)),g(a,r),pt()}xt(["click"]);async function Vp(){return await Ae("plugin:autostart|is_enabled")}async function Jp(){await Ae("plugin:autostart|enable")}async function Qp(){await Ae("plugin:autostart|disable")}var Kr=C("<option> </option>"),Xp=C('<div class="error svelte-90mmv5" role="alert"> </div>'),Zp=C('<div><h2 class="tab-title svelte-90mmv5"> </h2> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <button type="button" class="action svelte-90mmv5"> </button></div></div> <p class="tray-hint svelte-90mmv5"> </p></section> <!></div>');function eg(a,t){_t(t,!0);const n=F(mt),r=F(Ja),o=[1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90],c=[2,3,4,5,6];function l(xe,ot){return ot.includes(xe)?ot:[...ot,xe].sort((bt,Kt)=>bt-Kt)}let i=H(!1),u=H(!1),v=H(0),_=H(null);async function m(){try{f(i,await Vp(),!0)}catch(xe){console.warn("isEnabled failed",xe),f(i,!1)}try{const xe=await En({status:"active"});f(v,xe.length,!0)}catch{}}St(()=>{m()}),St(()=>{e(r).focusDuration,e(r).shortBreakDuration,e(r).longBreakDuration,e(r).longBreakInterval,Lf()});function h(xe,ot){qi({[xe]:ot})}function y(xe){xe&&e(r).autoStartBreak?qi({disableBreak:!0,autoStartBreak:!1}):h("disableBreak",xe)}async function x(){if(!e(u)){f(u,!0),f(_,null);try{e(i)?(await Qp(),f(i,!1)):(await Jp(),f(i,!0))}catch(xe){f(_,Ft(e(n).settings.autostartFail,{err:String(xe)}),!0)}finally{f(u,!1)}}}async function S(){f(_,null);try{let xe=await Co();if(xe||(xe=await No()==="granted"),!xe){f(_,e(n).settings.notifPermDenied,!0);return}jo({title:e(n).settings.testNotifTitle,body:Ft(e(n).settings.testNotifBody,{n:e(v)})})}catch(xe){f(_,Ft(e(n).settings.notifSendFail,{err:String(xe)}),!0)}}var M=Zp(),P=s(M),Y=s(P),T=d(P,2),L=s(T),k=s(L),D=d(L,2),I=s(D),ie=s(I),ae=s(ie),re=d(ie,2);Me(re,20,()=>l(e(r).focusDuration,o),xe=>xe,(xe,ot)=>{var bt=Kr(),Kt=s(bt),sa={};E(()=>{p(Kt,`${ot??""}${e(n).settings.minute??""}`),sa!==(sa=ot)&&(bt.value=(bt.__value=ot)??"")}),g(xe,bt)});var te;Bt(re);var ce=d(I,2),$=s(ce),j=s($),U=d($,2);Me(U,20,()=>l(e(r).shortBreakDuration,o),xe=>xe,(xe,ot)=>{var bt=Kr(),Kt=s(bt),sa={};E(()=>{p(Kt,`${ot??""}${e(n).settings.minute??""}`),sa!==(sa=ot)&&(bt.value=(bt.__value=ot)??"")}),g(xe,bt)});var J;Bt(U);var he=d(ce,2),be=s(he),Z=s(be),de=d(be,2);Me(de,20,()=>l(e(r).longBreakDuration,o),xe=>xe,(xe,ot)=>{var bt=Kr(),Kt=s(bt),sa={};E(()=>{p(Kt,`${ot??""}${e(n).settings.minute??""}`),sa!==(sa=ot)&&(bt.value=(bt.__value=ot)??"")}),g(xe,bt)});var ke;Bt(de);var q=d(he,2),W=s(q),B=s(W),Q=d(W,2);Me(Q,20,()=>l(e(r).longBreakInterval,c),xe=>xe,(xe,ot)=>{var bt=Kr(),Kt=s(bt),sa={};E(()=>{p(Kt,`${ot??""}${e(n).settings.pomodoroUnit??""}`),sa!==(sa=ot)&&(bt.value=(bt.__value=ot)??"")}),g(xe,bt)});var pe;Bt(Q);var ge=d(T,2),fe=s(ge),_e=s(fe),O=d(fe,2),ne=s(O),ue=s(ne),we=s(ue),Ne=s(we),je=d(we,2),We=s(je),Ke=d(ue,2);vr(Ke,{get checked(){return e(r).autoStartNextPomodoro},onChange:xe=>h("autoStartNextPomodoro",xe),get label(){return e(n).settings.autoStartNext}});var Ye=d(ne,2),V=s(Ye),z=s(V),b=s(z),w=d(z,2),X=s(w),R=d(V,2);vr(R,{get checked(){return e(r).autoStartBreak},onChange:xe=>h("autoStartBreak",xe),get label(){return e(n).settings.autoStartBreak}});var K=d(Ye,2),ve=s(K),oe=s(ve),ye=s(oe),me=d(oe,2),Ie=s(me),it=d(ve,2);vr(it,{get checked(){return e(r).disableBreak},onChange:y,get label(){return e(n).settings.disableBreak}});var lt=d(ge,2),ft=s(lt),rt=s(ft),Ve=d(ft,2),Oe=s(Ve),Be=s(Oe),Ce=s(Be),Te=d(Be,2);vr(Te,{get checked(){return e(r).desktopNotificationEnabled},onChange:xe=>h("desktopNotificationEnabled",xe),get label(){return e(n).settings.systemNotification}});var nt=d(Oe,2),ct=s(nt),Dt=s(ct),zt=s(Dt),Jt=d(Dt,2),ua=s(Jt),tt=d(ct,2);vr(tt,{get checked(){return e(i)},onChange:x,get label(){return e(n).settings.autostart},get disabled(){return e(u)}});var gt=d(nt,2),ht=s(gt),Nt=s(ht),Pt=s(Nt),He=d(Nt,2),Fe=s(He),dt=d(ht,2),ee=s(dt),Se=d(Ve,2),Le=s(Se),Je=d(lt,2);{var Tt=xe=>{var ot=Xp(),bt=s(ot);E(()=>p(bt,`⚠ ${e(_)??""}`)),g(xe,ot)};se(Je,xe=>{e(_)&&xe(Tt)})}E(()=>{p(Y,e(n).settings.timerTitle),p(k,e(n).settings.durationSetting),p(ae,e(n).settings.focusDuration),te!==(te=e(r).focusDuration)&&(re.value=(re.__value=e(r).focusDuration)??"",It(re,e(r).focusDuration)),p(j,e(n).settings.shortBreakDuration),J!==(J=e(r).shortBreakDuration)&&(U.value=(U.__value=e(r).shortBreakDuration)??"",It(U,e(r).shortBreakDuration)),p(Z,e(n).settings.longBreakDuration),ke!==(ke=e(r).longBreakDuration)&&(de.value=(de.__value=e(r).longBreakDuration)??"",It(de,e(r).longBreakDuration)),p(B,e(n).settings.longBreakInterval),pe!==(pe=e(r).longBreakInterval)&&(Q.value=(Q.__value=e(r).longBreakInterval)??"",It(Q,e(r).longBreakInterval)),p(_e,e(n).settings.behaviorSetting),p(Ne,e(n).settings.autoStartNext),p(We,e(n).settings.autoStartNextDesc),p(b,e(n).settings.autoStartBreak),p(X,e(n).settings.autoStartBreakDesc),p(ye,e(n).settings.disableBreak),p(Ie,e(n).settings.disableBreakDesc),p(rt,e(n).settings.systemSection),p(Ce,e(n).settings.systemNotification),p(zt,e(n).settings.autostart),p(ua,e(n).settings.autostartHint),p(Pt,e(n).settings.notifTest),p(Fe,e(n).settings.notifTestHint),p(ee,e(n).settings.sendTest),p(Le,e(n).settings.trayHint)}),G("change",re,xe=>h("focusDuration",Number(xe.currentTarget.value))),G("change",U,xe=>h("shortBreakDuration",Number(xe.currentTarget.value))),G("change",de,xe=>h("longBreakDuration",Number(xe.currentTarget.value))),G("change",Q,xe=>h("longBreakInterval",Number(xe.currentTarget.value))),G("click",dt,S),g(a,M),pt()}xt(["change","click"]);const As=["#c97b6e","#d4945c","#d4a574","#b8a878","#7fa086","#6b9b8a","#5c8b84","#5c8fad","#7a8fb0","#8b7baf","#a68b78","#a8a298"],an=As[0];var tg=C('<div class="error svelte-1o455o6" role="alert"> </div>'),ag=C('<div class="add-root-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),ng=C('<button type="button" class="add-root-btn svelte-1o455o6"><!> </button>'),rg=C('<div class="edit-box svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),og=C('<button type="button" class="chevron svelte-1o455o6"><!></button>'),sg=C('<span class="chevron-spacer svelte-1o455o6"></span>'),ig=C('<button type="button" class="icon-btn svelte-1o455o6"><!></button>'),lg=C('<div role="treeitem" tabindex="-1" aria-selected="false"><span><!> <span class="dot svelte-1o455o6"></span> <span class="name svelte-1o455o6"> </span></span> <span class="actions svelte-1o455o6"><!> <button type="button" class="icon-btn svelte-1o455o6"><!></button> <button type="button" class="icon-btn danger svelte-1o455o6"><!></button></span></div>'),cg=C('<div class="add-child-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),dg=C('<div class="row-wrap svelte-1o455o6"><!> <!></div>'),ug=C('<div class="empty svelte-1o455o6"> </div>'),vg=C('<div class="manager svelte-1o455o6"><h2 class="tab-title svelte-1o455o6"> </h2> <p class="drag-hint svelte-1o455o6"> </p> <!> <!> <div role="tree" tabindex="-1"><!> <!></div></div>');function fg(a,t){_t(t,!0);const n=F(mt);let r=H(ze([])),o=H(ze(new Set)),c=H("root"),l=H(""),i=H(null),u=H(""),v=H(ze(an)),_=H(null),m=H(null),h=H(null),y=H(!1);function x(){return new Date().toISOString()}async function S(){try{f(r,await ti(),!0)}catch{}}ln(()=>{S()}),St(()=>{if(!e(_))return;const b=window.setTimeout(()=>f(_,null),3e3);return()=>window.clearTimeout(b)});function M(b){const w=new Map,X=[];for(const ve of b)w.set(ve.id,{...ve,children:[],depth:0});for(const ve of b){const oe=w.get(ve.id);oe&&(ve.parent_id&&w.has(ve.parent_id)?w.get(ve.parent_id).children.push(oe):X.push(oe))}const R=ve=>{ve.sort((oe,ye)=>(oe.display_order??0)-(ye.display_order??0)||(oe.created_at??"").localeCompare(ye.created_at??"")||oe.id.localeCompare(ye.id)),ve.forEach(oe=>R(oe.children))};R(X);const K=(ve,oe)=>{for(const ye of ve)ye.depth=oe,K(ye.children,oe+1)};return K(X,0),X}function P(b,w){const X=[];for(const R of b)X.push(R),w.has(R.id)&&R.children.length>0&&X.push(...P(R.children,w));return X}const Y=F(()=>M(e(r))),T=F(()=>P(e(Y),e(o)));function L(b){const w=new Set(e(o));w.has(b)?w.delete(b):w.add(b),f(o,w,!0)}function k(){const b=new Map;for(const w of e(r))b.set(w.id,w.parent_id??null);return b}function D(){const b=new Map;for(const w of e(r)){const X=w.parent_id??null;b.has(X)||b.set(X,[]),b.get(X).push(w.id)}return b}function I(b,w){const X=w.get(b)??[];return X.length===0?1:1+Math.max(...X.map(R=>I(R,w)))}function ie(b,w,X){let R=b;const K=new Set;for(;R;){if(R===w)return!0;if(K.has(R))return!1;K.add(R),R=X.get(R)??null}return!1}async function ae(){const b=e(l).trim();if(!b)return;const w=e(c)==="root"?null:e(c),X=e(r).filter(R=>(R.parent_id??null)===w);try{await ho({id:crypto.randomUUID(),name:b,color:an,parent_id:w,display_order:X.length,created_at:x(),updated_at:x()})}catch(R){f(_,String(R),!0)}if(f(l,""),f(c,null),w){const R=new Set(e(o));R.add(w),f(o,R,!0)}await S()}function re(b){f(i,b.id,!0),f(u,b.name,!0),f(v,b.color??an,!0)}async function te(){if(!e(i))return;const b=e(u).trim();if(!b)return;const w=e(r).find(X=>X.id===e(i));if(w){try{await ho({...w,name:b,color:e(v),updated_at:x()})}catch(X){f(_,String(X),!0)}f(i,null),f(u,""),await S()}}async function ce(b){try{await Mc(b)}catch(w){f(_,String(w),!0)}await S()}function $(b){return b.includes("exceed max depth")?e(n).settings.list.reorderFailDepth:b.includes("cycle")?e(n).settings.list.reorderFailCycle:e(n).settings.list.reorderFail}function j(b){return b.map(w=>({id:w.id,parent_id:w.parent_id??null,display_order:w.display_order??0}))}function U(b){const w=new Map;for(const R of b){const K=R.parent_id??null;w.has(K)||w.set(K,[]),w.get(K).push(R)}const X=new Map;for(const R of w.values())R.slice().sort((K,ve)=>(K.display_order??0)-(ve.display_order??0)).forEach((K,ve)=>X.set(K.id,ve));return b.map(R=>({...R,display_order:X.get(R.id)??0}))}async function J(b,w){if(!e(r).find(oe=>oe.id===b))return;const R=e(r).filter(oe=>(oe.parent_id??null)===w&&oe.id!==b).length,K=e(r).map(oe=>oe.id===b?{...oe,parent_id:w,display_order:R}:oe),ve=U(K);if(f(r,ve,!0),w){const oe=new Set(e(o));oe.add(w),f(o,oe,!0)}try{await Jv(j(ve)),await S()}catch(oe){await S(),f(_,$(String(oe)),!0)}}function he(b){const w=e(m);if(Z(),!w||w===b.id)return;const X=e(r).find(ve=>ve.id===w);if(!X||(X.parent_id??null)===b.id)return;const R=k();if(ie(b.id,w,R)){f(_,e(n).settings.list.reorderFailCycle,!0);return}const K=I(w,D());if(b.depth+K>2){f(_,e(n).settings.list.reorderFailDepth,!0);return}J(w,b.id)}function be(){const b=e(m);if(Z(),!b)return;const w=e(r).find(X=>X.id===b);if(w){if((w.parent_id??null)===null){const X=e(r).filter(R=>R.parent_id==null&&R.id!==b).length;if((w.display_order??0)===X)return}J(b,null)}}function Z(){f(m,null),f(h,null),f(y,!1)}function de(b,w){b.dataTransfer&&(f(m,w.id,!0),b.dataTransfer.effectAllowed="move",b.dataTransfer.setData("text/plain",w.id))}function ke(b,w){e(m)&&(b.preventDefault(),b.stopPropagation(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),f(h,w.id,!0),f(y,!1))}function q(b,w){b.preventDefault(),b.stopPropagation(),he(w)}function W(b){e(m)&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),f(y,!0),f(h,null))}function B(b){b.preventDefault(),be()}function Q(b){b.target===b.currentTarget&&f(y,!1)}var pe=vg(),ge=s(pe),fe=s(ge),_e=d(ge,2),O=s(_e),ne=d(_e,2);{var ue=b=>{var w=tg(),X=s(w);E(()=>p(X,e(_))),g(b,w)};se(ne,b=>{e(_)&&b(ue)})}var we=d(ne,2);{var Ne=b=>{var w=ag(),X=s(w);kn(X,!0),E(()=>A(X,"placeholder",e(n).settings.list.addRootPlaceholder)),G("keydown",X,R=>{R.key==="Enter"&&ae(),R.key==="Escape"&&(f(c,null),f(l,""))}),yt("blur",X,()=>{e(l).trim()?ae():(f(c,null),f(l,""))}),kt(X,()=>e(l),R=>f(l,R)),g(b,w)},je=b=>{var w=ng(),X=s(w);Mn(X,{size:16});var R=d(X);E(()=>p(R,` ${e(n).settings.list.addRoot??""}`)),G("click",w,()=>{f(c,"root"),f(l,"")}),g(b,w)};se(we,b=>{e(c)==="root"?b(Ne):b(je,-1)})}var We=d(we,2);let Ke;var Ye=s(We);Me(Ye,17,()=>e(T),b=>b.id,(b,w)=>{const X=F(()=>e(i)===e(w).id),R=F(()=>e(c)===e(w).id),K=F(()=>e(w).children.length>0),ve=F(()=>e(o).has(e(w).id)),oe=F(()=>!e(X)&&!e(R)&&e(w).depth>0);var ye=dg(),me=s(ye);{var Ie=rt=>{var Ve=rg(),Oe=s(Ve);E(()=>A(Oe,"placeholder",e(w).name)),G("keydown",Oe,Be=>{Be.key==="Enter"&&te(),Be.key==="Escape"&&(f(i,null),f(u,""))}),yt("blur",Oe,()=>{e(i)===e(w).id&&te()}),kt(Oe,()=>e(u),Be=>f(u,Be)),g(rt,Ve)},it=rt=>{var Ve=lg();let Oe;var Be=s(Ve);let Ce;var Te=s(Be);{var nt=Fe=>{var dt=og(),ee=s(dt);{var Se=Je=>{Vn(Je,{size:14})},Le=Je=>{Jn(Je,{size:14})};se(ee,Je=>{e(ve)?Je(Se):Je(Le,-1)})}E(()=>A(dt,"aria-label",e(ve)?e(n).common.expand:e(n).common.collapse)),G("click",dt,Je=>{Je.stopPropagation(),L(e(w).id)}),g(Fe,dt)},ct=Fe=>{var dt=sg();g(Fe,dt)};se(Te,Fe=>{e(K)?Fe(nt):Fe(ct,-1)})}var Dt=d(Te,2),zt=d(Dt,2),Jt=s(zt),ua=d(Be,2),tt=s(ua);{var gt=Fe=>{var dt=ig(),ee=s(dt);Mn(ee,{size:14}),E(()=>{A(dt,"title",e(n).settings.list.addChild),A(dt,"aria-label",e(n).settings.list.addChild)}),G("click",dt,Se=>{Se.stopPropagation(),f(c,e(w).id,!0),f(l,"")}),g(Fe,dt)};se(tt,Fe=>{e(w).depth<2&&Fe(gt)})}var ht=d(tt,2),Nt=s(ht);Xs(Nt,{size:14});var Pt=d(ht,2),He=s(Pt);Br(He,{size:14}),E(()=>{Oe=at(Ve,1,"row svelte-1o455o6",null,Oe,{"drop-over":e(h)===e(w).id&&e(m)!==e(w).id,dragging:e(m)===e(w).id}),A(Ve,"draggable",e(oe)),Ce=at(Be,1,"label svelte-1o455o6",null,Ce,{grabbable:e(oe)}),At(Dt,`background-color: ${e(w).color??an??""}`),p(Jt,e(w).name),A(ht,"title",e(n).settings.list.edit),A(ht,"aria-label",e(n).settings.list.edit),A(Pt,"title",e(n).settings.list.del),A(Pt,"aria-label",e(n).settings.list.del)}),yt("dragstart",Ve,Fe=>de(Fe,e(w))),yt("dragover",Ve,Fe=>ke(Fe,e(w))),yt("drop",Ve,Fe=>q(Fe,e(w))),yt("dragend",Ve,Z),G("click",ht,Fe=>{Fe.stopPropagation(),re(e(w))}),G("click",Pt,Fe=>{Fe.stopPropagation(),ce(e(w).id)}),g(rt,Ve)};se(me,rt=>{e(X)?rt(Ie):rt(it,-1)})}var lt=d(me,2);{var ft=rt=>{var Ve=cg(),Oe=s(Ve);kn(Oe,!0),E(()=>A(Oe,"placeholder",e(w).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)),G("keydown",Oe,Be=>{Be.key==="Enter"&&ae(),Be.key==="Escape"&&(f(c,null),f(l,""))}),yt("blur",Oe,()=>{e(l).trim()?ae():(f(c,null),f(l,""))}),kt(Oe,()=>e(l),Be=>f(l,Be)),g(rt,Ve)};se(lt,rt=>{e(R)&&rt(ft)})}E(()=>At(ye,`padding-left: ${e(w).depth*24}px`)),g(b,ye)});var V=d(Ye,2);{var z=b=>{var w=ug(),X=s(w);E(()=>p(X,e(n).settings.list.empty)),g(b,w)};se(V,b=>{e(r).length===0&&e(c)!=="root"&&b(z)})}E(()=>{p(fe,e(n).settings.list.title),p(O,e(n).settings.list.dragHint),Ke=at(We,1,"tree svelte-1o455o6",null,Ke,{"over-root":e(y)})}),yt("dragover",We,W),yt("drop",We,B),yt("dragleave",We,Q),g(a,pe),pt()}xt(["keydown","click"]);var sl=C('<button type="button"></button>'),hg=C('<div class="error svelte-1hwdvdh" role="alert"> </div>'),_g=C('<div class="edit-box svelte-1hwdvdh"><div class="edit-name-row svelte-1hwdvdh"><span class="name-label svelte-1hwdvdh"> </span> <input type="text" class="text-input svelte-1hwdvdh"/></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div> <div class="edit-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <button type="button" class="save-btn svelte-1hwdvdh"> </button></div></div>'),pg=C('<div class="tag-row svelte-1hwdvdh"><div class="tag-row-main svelte-1hwdvdh"><span class="grip svelte-1hwdvdh"><!></span> <span class="dot svelte-1hwdvdh"></span> <span class="tag-name svelte-1hwdvdh"> </span></div> <div class="tag-row-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <span class="sep svelte-1hwdvdh">|</span> <button type="button" class="link-btn danger svelte-1hwdvdh"> </button></div></div>'),gg=C('<div role="listitem" tabindex="-1"><!></div>'),mg=C('<div class="empty svelte-1hwdvdh"> </div>'),bg=C('<div><h2 class="tab-title svelte-1hwdvdh"> </h2> <div class="add-card svelte-1hwdvdh"><div class="add-row svelte-1hwdvdh"><input type="text" class="text-input svelte-1hwdvdh"/> <button type="button" class="add-btn svelte-1hwdvdh"> </button></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div></div> <!> <div class="tag-list svelte-1hwdvdh" role="list"></div> <!></div>');function yg(a,t){_t(t,!0);const n=F(mt);let r=H(ze([])),o=H(""),c=H(ze(an)),l=H(null),i=H(""),u=H(ze(an)),v=H(null),_=H(null),m=H(null);function h(){return new Date().toISOString()}async function y(){try{const B=await ai();f(r,[...B].sort((Q,pe)=>(Q.display_order??0)-(pe.display_order??0)||(Q.created_at??"").localeCompare(pe.created_at??"")||Q.id.localeCompare(pe.id)),!0)}catch{}}ln(()=>{y()}),St(()=>{if(!e(v))return;const B=window.setTimeout(()=>f(v,null),3e3);return()=>window.clearTimeout(B)});function x(B,Q,pe){const ge=B.slice(),[fe]=ge.splice(Q,1);return ge.splice(pe,0,fe),ge}async function S(){const B=e(o).trim();if(B)try{await Oi({id:crypto.randomUUID(),name:B,color:e(c),display_order:e(r).length,created_at:h(),updated_at:h()}),f(o,""),await y()}catch(Q){f(v,String(Q),!0)}}async function M(B){try{await Qv(B),await y()}catch(Q){f(v,String(Q),!0)}}function P(B){f(l,B.id,!0),f(i,B.name,!0),f(u,B.color??an,!0)}async function Y(){if(!e(l))return;const B=e(i).trim();if(!B)return;const Q=e(r).find(pe=>pe.id===e(l));if(Q){try{await Oi({...Q,name:B,color:e(u),updated_at:h()})}catch(pe){f(v,String(pe),!0)}f(l,null),await y()}}function T(B,Q){B.dataTransfer&&(f(_,Q.id,!0),B.dataTransfer.effectAllowed="move",B.dataTransfer.setData("text/plain",Q.id))}function L(B,Q){!e(_)||e(_)===Q.id||(B.preventDefault(),B.stopPropagation(),B.dataTransfer&&(B.dataTransfer.dropEffect="move"),f(m,Q.id,!0))}function k(B,Q){B.preventDefault(),B.stopPropagation();const pe=e(_);if(f(_,null),f(m,null),!pe||pe===Q.id)return;const ge=e(r).findIndex(ue=>ue.id===pe),fe=e(r).findIndex(ue=>ue.id===Q.id);if(ge<0||fe<0)return;const _e=e(r),O=x(e(r),ge,fe);f(r,O,!0);const ne=O.map((ue,we)=>({id:ue.id,display_order:we}));Xv(ne).then(y).catch(async ue=>{f(r,_e,!0),await y(),f(v,String(ue)||e(n).settings.list.reorderFail,!0)})}function D(){f(_,null),f(m,null)}var I=bg(),ie=s(I),ae=s(ie),re=d(ie,2),te=s(re),ce=s(te),$=d(ce,2),j=s($),U=d(te,2),J=s(U),he=s(J),be=d(J,2);Me(be,20,()=>As,B=>B,(B,Q)=>{var pe=sl();let ge;E(fe=>{ge=at(pe,1,"swatch svelte-1hwdvdh",null,ge,{active:e(c)===Q}),At(pe,`background-color: ${Q??""}`),A(pe,"aria-label",fe)},[()=>Ft(e(n).settings.tag.colorAria,{color:Q})]),G("click",pe,()=>f(c,Q,!0)),g(B,pe)});var Z=d(re,2);{var de=B=>{var Q=hg(),pe=s(Q);E(()=>p(pe,e(v))),g(B,Q)};se(Z,B=>{e(v)&&B(de)})}var ke=d(Z,2);Me(ke,21,()=>e(r),B=>B.id,(B,Q)=>{const pe=F(()=>e(l)===e(Q).id);var ge=gg();let fe;var _e=s(ge);{var O=ue=>{var we=_g(),Ne=s(we),je=s(Ne),We=s(je),Ke=d(je,2);kn(Ke,!0);var Ye=d(Ne,2),V=s(Ye),z=s(V),b=d(V,2);Me(b,20,()=>As,oe=>oe,(oe,ye)=>{var me=sl();let Ie;E(it=>{Ie=at(me,1,"swatch sm svelte-1hwdvdh",null,Ie,{active:e(u)===ye}),At(me,`background-color: ${ye??""}`),A(me,"aria-label",it)},[()=>Ft(e(n).settings.tag.colorAria,{color:ye})]),G("click",me,()=>f(u,ye,!0)),g(oe,me)});var w=d(Ye,2),X=s(w),R=s(X),K=d(X,2),ve=s(K);E(()=>{p(We,e(n).settings.tag.nameLabel),p(z,e(n).settings.tag.colorLabel),p(R,e(n).settings.repeatCustom.cancel),p(ve,e(n).settings.notification.save)}),G("keydown",Ke,oe=>{oe.key==="Enter"&&Y(),oe.key==="Escape"&&f(l,null)}),kt(Ke,()=>e(i),oe=>f(i,oe)),G("click",X,()=>f(l,null)),G("click",K,Y),g(ue,we)},ne=ue=>{var we=pg(),Ne=s(we),je=s(Ne),We=s(je);_v(We,{size:16});var Ke=d(je,2),Ye=d(Ke,2),V=s(Ye),z=d(Ne,2),b=s(z),w=s(b),X=d(b,4),R=s(X);E(()=>{A(je,"aria-label",e(n).settings.tag.dragHandle),A(je,"title",e(n).settings.tag.dragHandle),At(Ke,`background-color: ${e(Q).color??an??""}`),p(V,e(Q).name),p(w,e(n).settings.list.edit),p(R,e(n).settings.list.del)}),G("click",b,()=>P(e(Q))),G("click",X,()=>void M(e(Q).id)),g(ue,we)};se(_e,ue=>{e(pe)?ue(O):ue(ne,-1)})}E(()=>{fe=at(ge,1,"tag-card svelte-1hwdvdh",null,fe,{dragging:e(_)===e(Q).id,"drop-over":e(m)===e(Q).id&&e(_)!==null&&e(_)!==e(Q).id}),A(ge,"draggable",!e(pe))}),yt("dragstart",ge,ue=>T(ue,e(Q))),yt("dragover",ge,ue=>L(ue,e(Q))),yt("drop",ge,ue=>k(ue,e(Q))),yt("dragend",ge,D),g(B,ge)});var q=d(ke,2);{var W=B=>{var Q=mg(),pe=s(Q);E(()=>p(pe,e(n).settings.tag.empty)),g(B,Q)};se(q,B=>{e(r).length===0&&B(W)})}E(()=>{p(ae,e(n).settings.tab.tags),A(ce,"placeholder",e(n).settings.tag.namePlaceholder),p(j,e(n).settings.tag.add),p(he,e(n).settings.tag.colorLabel)}),G("keydown",ce,B=>{B.key==="Enter"&&S()}),kt(ce,()=>e(o),B=>f(o,B)),G("click",$,S),g(a,I),pt()}xt(["keydown","click"]);var il=C('<span class="badge svelte-wf1h2h"><!></span>'),kg=C('<button type="button"><!> <span class="card-name svelte-wf1h2h"> </span></button>'),wg=C('<button type="button"><!> <span class="card-name corner svelte-wf1h2h"> </span></button>'),xg=C('<p class="used svelte-wf1h2h"><!> </p>'),Tg=C('<div class="thumb svelte-wf1h2h"></div> <span class="used svelte-wf1h2h"><!> </span> <button type="button" class="clear-btn svelte-wf1h2h"><!> </button>',1),Sg=C('<p class="fail svelte-wf1h2h" role="alert"> </p>'),Dg=C('<button type="button" class="reset-btn svelte-wf1h2h"><!> </button>'),Pg=C('<div class="setting svelte-wf1h2h"><h2 class="tab-title svelte-wf1h2h"> </h2> <p class="desc svelte-wf1h2h"> </p> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div> <p class="hint svelte-wf1h2h"> </p> <!></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="custom-row svelte-wf1h2h"><label class="upload-btn svelte-wf1h2h"><input type="file" accept="image/*" class="file-input svelte-wf1h2h"/> <!> </label> <!></div> <!> <p class="hint svelte-wf1h2h"> </p></section> <!></div>');function Mg(a,t){_t(t,!0);const n=F(mt),r=F(ph),o=F(gh);let c=H(!1);async function l(fe){var ue;const _e=fe.currentTarget,O=(ue=_e.files)==null?void 0:ue[0];if(!O)return;f(c,!1);const ne=await kh(O);ne?yh(ne):f(c,!0),_e.value=""}const i=F(()=>{var fe;return((fe=e(o))==null?void 0:fe.kind)==="preset"?e(o).id:null}),u=F(()=>{var fe;return((fe=e(o))==null?void 0:fe.kind)==="custom"}),v=F(()=>{var fe;return e(r)==="default"&&((fe=e(o))==null?void 0:fe.kind)==="preset"&&e(o).id==="preset-bg-1"}),_=F(()=>{var fe,_e;if(((fe=e(o))==null?void 0:fe.kind)==="preset"){const O=po.find(ne=>ne.id===e(o).id);return O?`background-image: ${O.url}`:null}return((_e=e(o))==null?void 0:_e.kind)==="custom"?`background-image: ${e(o).url}`:null});var m=Pg(),h=s(m),y=s(h),x=d(h,2),S=s(x),M=d(x,2),P=s(M),Y=s(P),T=d(P,2);Me(T,21,()=>zc,fe=>fe.id,(fe,_e)=>{const O=F(()=>e(r)===e(_e).id);var ne=kg();let ue;var we=s(ne);{var Ne=Ke=>{var Ye=il(),V=s(Ye);Wa(V,{size:11,strokeWidth:3}),g(Ke,Ye)};se(we,Ke=>{e(O)&&Ke(Ne)})}var je=d(we,2),We=s(je);E(()=>{ue=at(ne,1,"card svelte-wf1h2h",null,ue,{active:e(O)}),At(ne,`background: ${e(_e).preview??""}`),A(ne,"title",e(n).settings.theme.presetName[e(_e).id]),A(ne,"aria-pressed",e(O)),p(We,e(n).settings.theme.presetName[e(_e).id])}),G("click",ne,()=>mh(e(_e).id)),g(fe,ne)});var L=d(M,2),k=s(L),D=s(k),I=d(k,2);Me(I,21,()=>po,fe=>fe.id,(fe,_e)=>{const O=F(()=>e(i)===e(_e).id);var ne=wg();let ue;var we=s(ne);{var Ne=Ke=>{var Ye=il(),V=s(Ye);Wa(V,{size:11,strokeWidth:3}),g(Ke,Ye)};se(we,Ke=>{e(O)&&Ke(Ne)})}var je=d(we,2),We=s(je);E(()=>{ue=at(ne,1,"card cover svelte-wf1h2h",null,ue,{active:e(O)}),At(ne,`background-image: ${e(_e).url??""}`),A(ne,"title",e(n).settings.theme.presetBgName[e(_e).id]),A(ne,"aria-pressed",e(O)),p(We,e(n).settings.theme.presetBgName[e(_e).id])}),G("click",ne,()=>bh(e(_e).id)),g(fe,ne)});var ie=d(I,2),ae=s(ie),re=d(ie,2);{var te=fe=>{var _e=xg(),O=s(_e);Wa(O,{size:13});var ne=d(O);E(()=>p(ne,` ${e(n).settings.theme.presetBgUsed??""}`)),g(fe,_e)};se(re,fe=>{e(i)&&fe(te)})}var ce=d(L,2),$=s(ce),j=s($),U=d($,2),J=s(U),he=s(J),be=d(he,2);jv(be,{size:14});var Z=d(be),de=d(J,2);{var ke=fe=>{var _e=Tg(),O=Ee(_e),ne=d(O,2),ue=s(ne);Wa(ue,{size:13});var we=d(ue),Ne=d(ne,2),je=s(Ne);Zs(je,{size:12});var We=d(je);E(()=>{At(O,e(_)),A(O,"aria-label",e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed),p(we,` ${(e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed)??""}`),p(We,` ${e(n).settings.theme.clearBg??""}`)}),G("click",Ne,function(...Ke){Zo==null||Zo.apply(this,Ke)}),g(fe,_e)};se(de,fe=>{e(o)&&e(_)&&fe(ke)})}var q=d(U,2);{var W=fe=>{var _e=Sg(),O=s(_e);E(()=>p(O,e(n).settings.theme.compressFail)),g(fe,_e)};se(q,fe=>{e(c)&&fe(W)})}var B=d(q,2),Q=s(B),pe=d(ce,2);{var ge=fe=>{var _e=Dg(),O=s(_e);xv(O,{size:12});var ne=d(O);E(()=>p(ne,` ${e(n).settings.theme.reset??""}`)),G("click",_e,function(...ue){es==null||es.apply(this,ue)}),g(fe,_e)};se(pe,fe=>{e(v)||fe(ge)})}E(()=>{p(y,e(n).settings.theme.title),p(S,e(n).settings.theme.desc),p(Y,e(n).settings.theme.preset),p(D,e(n).settings.theme.presetBg),p(ae,e(n).settings.theme.presetBgHint),p(j,e(n).settings.theme.custom),p(Z,` ${e(n).settings.theme.upload??""}`),p(Q,e(n).settings.theme.customHint)}),G("change",he,l),g(a,m),pt()}xt(["click","change"]);var Eg=C('<div class="error svelte-16699lq" role="alert"> </div>'),Cg=C('<div class="empty svelte-16699lq"> </div>'),Ng=C('<div class="item svelte-16699lq"><div class="item-main svelte-16699lq"><div class="item-text svelte-16699lq"> </div> <div class="item-author svelte-16699lq"> </div></div> <button type="button" class="del-btn svelte-16699lq"><!></button></div>'),jg=C('<div class="manager svelte-16699lq"><h2 class="tab-title svelte-16699lq"> </h2> <div class="add-card svelte-16699lq"><textarea class="textarea svelte-16699lq"></textarea> <div class="author-row svelte-16699lq"><input type="text" class="author-input svelte-16699lq"/> <button type="button" class="add-btn svelte-16699lq"><!> </button></div></div> <!> <div class="list svelte-16699lq"><!> <!></div></div>');function Fg(a,t){_t(t,!0);const n=F(mt),r=500,o=64;let c=H(ze([])),l=H(""),i=H(""),u=H(null);function v(){return new Date().toISOString()}async function _(){try{f(c,await Ac(),!0)}catch{}}ln(()=>{_()}),St(()=>{if(!e(u))return;const j=window.setTimeout(()=>f(u,null),3e3);return()=>window.clearTimeout(j)});function m(){const j=e(l).trim();return j.length<1?e(n).settings.motto.textRequired:j.length>r?e(n).settings.motto.textTooLong:e(i).trim().length>o?e(n).settings.motto.authorTooLong:null}async function h(){const j=m();if(j){f(u,j,!0);return}try{await df({id:crypto.randomUUID(),text:e(l).trim(),author:e(i).trim()||null,created_at:v(),updated_at:v()}),f(l,""),f(i,""),await _(),Vi()}catch(U){f(u,String(U),!0)}}async function y(j){try{await uf(j),await _(),Vi()}catch(U){f(u,String(U),!0)}}var x=jg(),S=s(x),M=s(S),P=d(S,2),Y=s(P);A(Y,"rows",2);var T=d(Y,2),L=s(T),k=d(L,2),D=s(k);Mn(D,{size:14});var I=d(D),ie=d(P,2);{var ae=j=>{var U=Eg(),J=s(U);E(()=>p(J,e(u))),g(j,U)};se(ie,j=>{e(u)&&j(ae)})}var re=d(ie,2),te=s(re);{var ce=j=>{var U=Cg(),J=s(U);E(()=>p(J,e(n).settings.motto.empty)),g(j,U)};se(te,j=>{e(c).length===0&&j(ce)})}var $=d(te,2);Me($,17,()=>e(c),j=>j.id,(j,U)=>{var J=Ng(),he=s(J),be=s(he),Z=s(be),de=d(be,2),ke=s(de),q=d(he,2),W=s(q);Br(W,{size:14}),E(B=>{p(Z,e(U).text),p(ke,`—— ${B??""}`),A(q,"aria-label",e(n).settings.list.del)},[()=>{var B;return(B=e(U).author)!=null&&B.trim()?e(U).author:e(n).settings.motto.defaultAuthor}]),G("click",q,()=>void y(e(U).id)),g(j,J)}),E(()=>{p(M,e(n).settings.motto.title),A(Y,"placeholder",e(n).settings.motto.addPlaceholder),A(L,"placeholder",e(n).settings.motto.authorPlaceholder),p(I,` ${e(n).settings.motto.addBtn??""}`)}),kt(Y,()=>e(l),j=>f(l,j)),G("keydown",L,j=>{j.key==="Enter"&&h()}),kt(L,()=>e(i),j=>f(i,j)),G("click",k,h),g(a,x),pt()}xt(["keydown","click"]);var Ag=C("<option> </option>"),Ig=C('<div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style-desc"> </label> <input id="notif-style-desc" type="text" class="text-input svelte-s7babn"/></div>'),qg=C('<span class="saved svelte-s7babn"> </span>'),Rg=C('<span class="save-error svelte-s7babn" role="alert"> </span>'),Lg=C('<div class="setting svelte-s7babn"><h2 class="tab-title svelte-s7babn"> </h2> <div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style"> </label> <select id="notif-style" class="select svelte-s7babn"></select> <p class="hint svelte-s7babn"> </p></div> <!> <div class="fields svelte-s7babn"><section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-fe-title"> </label> <input id="ntf-fe-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-fe-body"> </label> <input id="ntf-fe-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-be-title"> </label> <input id="ntf-be-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-be-body"> </label> <input id="ntf-be-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-rm-title"> </label> <input id="ntf-rm-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-rm-body"> </label> <input id="ntf-rm-body" type="text" class="text-input svelte-s7babn"/> <p class="hint svelte-s7babn"> </p></section></div> <div class="save-row svelte-s7babn"><button type="button" class="save-btn svelte-s7babn"><!> </button> <!> <!></div></div>');function Og(a,t){_t(t,!0);const n=F(mt),r=F(Eo);let o=H("default"),c=H(""),l=H(null),i=H(ze({focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""})),u=H(!1),v=H(null);const _=F(()=>e(o)==="custom");ln(()=>{Ic().then(K=>{f(o,K.style||"default",!0),f(c,K.style_description||"",!0),f(l,K,!0)}).catch(()=>{})}),St(()=>{if(e(_))e(l)&&f(i,{focus_end_title:e(l).focus_end_title||"",focus_end_body:e(l).focus_end_body||"",break_end_title:e(l).break_end_title||"",break_end_body:e(l).break_end_body||"",reminder_title:e(l).reminder_title||"",reminder_body:e(l).reminder_body||""},!0);else{const K=(e(r)==="en"?xc:wc)[e(o)];f(i,{focus_end_title:K.focus_end_title,focus_end_body:K.focus_end_body,break_end_title:K.break_end_title,break_end_body:K.break_end_body,reminder_title:K.reminder_title,reminder_body:K.reminder_body},!0)}});async function m(){f(v,null);const K={id:"1",style:e(o),style_description:e(_)?e(c):null,focus_end_title:e(i).focus_end_title,focus_end_body:e(i).focus_end_body,break_end_title:e(i).break_end_title,break_end_body:e(i).break_end_body,reminder_title:e(i).reminder_title,reminder_body:e(i).reminder_body};try{const ve=await vf(K);f(l,ve,!0),await Rc(),f(u,!0),window.setTimeout(()=>f(u,!1),2e3)}catch(ve){f(v,String(ve),!0)}}var h=Lg(),y=s(h),x=s(y),S=d(y,2),M=s(S),P=s(M),Y=d(M,2);Me(Y,21,()=>$v,K=>K.key,(K,ve)=>{var oe=Ag(),ye=s(oe),me={};E(()=>{p(ye,e(n).settings.notification.styleName[e(ve).key]),me!==(me=e(ve).key)&&(oe.value=(oe.__value=e(ve).key)??"")}),g(K,oe)});var T=d(Y,2),L=s(T),k=d(S,2);{var D=K=>{var ve=Ig(),oe=s(ve),ye=s(oe),me=d(oe,2);E(()=>{p(ye,e(n).settings.notification.styleDesc),A(me,"placeholder",e(n).settings.notification.styleDescPlaceholder)}),kt(me,()=>e(c),Ie=>f(c,Ie)),g(K,ve)};se(k,K=>{e(_)&&K(D)})}var I=d(k,2),ie=s(I),ae=s(ie),re=s(ae),te=d(ae,2),ce=s(te),$=d(te,2),j=d($,2),U=s(j),J=d(j,2),he=d(ie,2),be=s(he),Z=s(be),de=d(be,2),ke=s(de),q=d(de,2),W=d(q,2),B=s(W),Q=d(W,2),pe=d(he,2),ge=s(pe),fe=s(ge),_e=d(ge,2),O=s(_e),ne=d(_e,2),ue=d(ne,2),we=s(ue),Ne=d(ue,2),je=d(Ne,2),We=s(je),Ke=d(I,2),Ye=s(Ke),V=s(Ye);Tv(V,{size:14});var z=d(V),b=d(Ye,2);{var w=K=>{var ve=qg(),oe=s(ve);E(()=>p(oe,e(n).settings.notification.saved)),g(K,ve)};se(b,K=>{e(u)&&K(w)})}var X=d(b,2);{var R=K=>{var ve=Rg(),oe=s(ve);E(()=>p(oe,e(v))),g(K,ve)};se(X,K=>{e(v)&&K(R)})}E(()=>{p(x,e(n).settings.notification.title),p(P,e(n).settings.notification.styleLabel),p(L,e(_)?e(n).settings.notification.styleHintCustom:e(n).settings.notification.styleHintPreset),p(re,e(n).settings.notification.focusEnd),p(ce,e(n).settings.notification.titleLabel),$.disabled=!e(_),p(U,e(n).settings.notification.bodyLabel),J.disabled=!e(_),p(Z,e(n).settings.notification.breakEnd),p(ke,e(n).settings.notification.titleLabel),q.disabled=!e(_),p(B,e(n).settings.notification.bodyLabel),Q.disabled=!e(_),p(fe,e(n).settings.notification.reminder),p(O,e(n).settings.notification.titleLabel),ne.disabled=!e(_),p(we,e(n).settings.notification.bodyLabel),Ne.disabled=!e(_),p(We,e(n).settings.notification.placeholderHint),p(z,` ${e(n).settings.notification.save??""}`)}),uo(Y,()=>e(o),K=>f(o,K)),kt($,()=>e(i).focus_end_title,K=>e(i).focus_end_title=K),kt(J,()=>e(i).focus_end_body,K=>e(i).focus_end_body=K),kt(q,()=>e(i).break_end_title,K=>e(i).break_end_title=K),kt(Q,()=>e(i).break_end_body,K=>e(i).break_end_body=K),kt(ne,()=>e(i).reminder_title,K=>e(i).reminder_title=K),kt(Ne,()=>e(i).reminder_body,K=>e(i).reminder_body=K),G("click",Ye,m),g(a,h),pt()}xt(["click"]);var Bg=C('<span class="badge svelte-hb0yns"><!></span>'),zg=C('<button type="button"><!> <span class="label svelte-hb0yns"> </span> <span class="sub svelte-hb0yns"> </span></button>'),Hg=C('<div><h2 class="tab-title svelte-hb0yns"> </h2> <p class="desc svelte-hb0yns"> </p> <div class="options svelte-hb0yns"></div></div>');function Ug(a,t){_t(t,!0);const n=F(mt),r=F(Eo),o=[{key:"zh",label:"中文",sub:"Chinese"},{key:"en",label:"English",sub:"英文"}];var c=Hg(),l=s(c),i=s(l),u=d(l,2),v=s(u),_=d(u,2);Me(_,21,()=>o,m=>m.key,(m,h)=>{const y=F(()=>e(r)===e(h).key);var x=zg();let S;var M=s(x);{var P=D=>{var I=Bg(),ie=s(I);Wa(ie,{size:16}),g(D,I)};se(M,D=>{e(y)&&D(P)})}var Y=d(M,2),T=s(Y),L=d(Y,2),k=s(L);E(()=>{S=at(x,1,"option svelte-hb0yns",null,S,{active:e(y)}),A(x,"aria-pressed",e(y)),p(T,e(h).label),p(k,e(h).sub)}),G("click",x,()=>Hv(e(h).key)),g(m,x)}),E(()=>{p(i,e(n).settings.language.title),p(v,e(n).settings.language.desc)}),g(a,c),pt()}xt(["click"]);var Wg=C('<span class="indicator svelte-uox1oc" aria-hidden="true"></span>'),Yg=C('<button type="button"><!> <!> </button>'),$g=C('<div class="account-placeholder svelte-uox1oc"><p class="svelte-uox1oc"> </p></div>'),Gg=C('<div class="settings-page page-veil svelte-uox1oc"><aside class="menu svelte-uox1oc"><nav class="menu-nav svelte-uox1oc"></nav></aside> <main class="content svelte-uox1oc"><div class="card svelte-uox1oc"><!></div></main></div>');function Kg(a,t){_t(t,!0);const n=F(mt);let r=H("timer");const o=F(()=>[{key:"account",icon:Fv,label:e(n).settings.tab.account},{key:"timer",icon:Qn,label:e(n).settings.tab.timer},{key:"lists",icon:_c,label:e(n).settings.tab.lists},{key:"tags",icon:Nv,label:e(n).settings.tab.tags},{key:"theme",icon:bv,label:e(n).settings.tab.theme},{key:"motto",icon:pc,label:e(n).settings.tab.motto},{key:"notification",icon:vc,label:e(n).settings.tab.notification},{key:"language",icon:pv,label:e(n).settings.tab.language}]);var c=Gg();Or("uox1oc",T=>{qr(()=>{nr.title=e(n).page.settings??""})});var l=s(c),i=s(l);Me(i,21,()=>e(o),T=>T.key,(T,L)=>{const k=F(()=>e(r)===e(L).key);var D=Yg();let I;var ie=s(D);{var ae=ce=>{var $=Wg();g(ce,$)};se(ie,ce=>{e(k)&&ce(ae)})}var re=d(ie,2);Lr(re,()=>e(L).icon,(ce,$)=>{$(ce,{size:16})});var te=d(re);E(()=>{I=at(D,1,"menu-item svelte-uox1oc",null,I,{active:e(k)}),A(D,"aria-current",e(k)?"true":void 0),p(te,` ${e(L).label??""}`)}),G("click",D,()=>f(r,e(L).key,!0)),g(T,D)});var u=d(l,2),v=s(u),_=s(v);{var m=T=>{var L=$g(),k=s(L),D=s(k);E(()=>p(D,e(n).settings.accountNotOpen)),g(T,L)},h=T=>{eg(T,{})},y=T=>{fg(T,{})},x=T=>{yg(T,{})},S=T=>{Mg(T,{})},M=T=>{Fg(T,{})},P=T=>{Og(T,{})},Y=T=>{Ug(T,{})};se(_,T=>{e(r)==="account"?T(m):e(r)==="timer"?T(h,1):e(r)==="lists"?T(y,2):e(r)==="tags"?T(x,3):e(r)==="theme"?T(S,4):e(r)==="motto"?T(M,5):e(r)==="notification"?T(P,6):e(r)==="language"&&T(Y,7)})}g(a,c),pt()}xt(["click"]);var Vg=C('<button type="button"><!> </button>'),Jg=C('<br/> <span class="sub svelte-k6bk06"> </span>',1),Qg=C('<li class="svelte-k6bk06"> <!></li>'),Xg=C('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <ul class="svelte-k6bk06"></ul></section>'),Zg=C('<div class="manual svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),em=C('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p></section>'),tm=C('<div class="faq svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),am=C('<li class="svelte-k6bk06"> </li>'),nm=C('<div class="contact svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>522988349@qq.com</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>18688994926</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span> </span></div></div> <div class="feedback svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono svelte-k6bk06"> </div> <div class="hint svelte-k6bk06"> </div></div> <div><span class="lbl xs svelte-k6bk06"> </span> <ul class="body-items svelte-k6bk06"></ul></div> <div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono muted svelte-k6bk06"> </div></div></div></div></div>'),rm=C('<div class="help-page page-veil svelte-k6bk06"><aside class="menu svelte-k6bk06"><nav class="menu-nav"></nav></aside> <main class="content svelte-k6bk06"><div class="card svelte-k6bk06"><!></div></main></div>');function om(a,t){_t(t,!0);const n=F(mt);let r=H("manual");const o=["timer","tasks","reminder","repeat","journal","stats","settings"];var c=rm();Or("k6bk06",x=>{qr(()=>{nr.title=`${e(n).nav.help??""} - PomoFlow`})});var l=s(c),i=s(l);Me(i,21,()=>[{key:"manual",icon:sv},{key:"faq",icon:hc},{key:"contact",icon:mv}],x=>x.key,(x,S)=>{const M=F(()=>e(r)===e(S).key);var P=Vg();let Y;var T=s(P);Lr(T,()=>e(S).icon,(k,D)=>{D(k,{size:16})});var L=d(T);E(()=>{Y=at(P,1,"menu-item svelte-k6bk06",null,Y,{active:e(M)}),A(P,"aria-current",e(M)?"true":void 0),p(L,` ${e(n).help.tab[e(S).key]??""}`)}),G("click",P,()=>f(r,e(S).key,!0)),g(x,P)});var u=d(l,2),v=s(u),_=s(v);{var m=x=>{var S=Zg(),M=s(S),P=s(M),Y=d(M,2);Me(Y,16,()=>o,T=>T,(T,L)=>{const k=F(()=>e(n).help.manual[L]);var D=Xg(),I=s(D),ie=s(I),ae=d(I,2);Me(ae,21,()=>e(k).items,La,(re,te)=>{const ce=F(()=>e(te));var $=Qg(),j=s($),U=d(j);{var J=he=>{var be=Jg(),Z=d(Ee(be),2),de=s(Z);E(()=>p(de,e(ce).sub)),g(he,be)};se(U,he=>{e(ce).sub&&he(J)})}E(()=>p(j,`${e(ce).text??""} `)),g(re,$)}),E(()=>p(ie,e(k).title)),g(T,D)}),E(()=>p(P,e(n).help.tab.manual)),g(x,S)},h=x=>{var S=tm(),M=s(S),P=s(M),Y=d(M,2);Me(Y,17,()=>e(n).help.faq.items,La,(T,L)=>{var k=em(),D=s(k),I=s(D),ie=d(D,2),ae=s(ie);E(()=>{p(I,`Q: ${e(L).q??""}`),p(ae,`A: ${e(L).a??""}`)}),g(T,k)}),E(()=>p(P,e(n).help.tab.faq)),g(x,S)},y=x=>{const S=F(()=>e(n).help.contact);var M=nm(),P=s(M),Y=s(P),T=d(P,2),L=s(T),k=d(T,2),D=s(k),I=s(D),ie=s(I),ae=d(D,2),re=s(ae),te=s(re),ce=d(ae,2),$=s(ce),j=s($),U=d($,2),J=s(U),he=d(k,2),be=s(he),Z=s(be),de=d(be,2),ke=s(de),q=d(de,2),W=s(q),B=s(W),Q=s(B),pe=d(B,2),ge=s(pe),fe=d(pe,2),_e=s(fe),O=d(W,2),ne=s(O),ue=s(ne),we=d(ne,2);Me(we,21,()=>e(S).bodyItems,La,(V,z)=>{var b=am(),w=s(b);E(()=>p(w,e(z))),g(V,b)});var Ne=d(O,2),je=s(Ne),We=s(je),Ke=d(je,2),Ye=s(Ke);E(()=>{p(Y,e(n).help.tab.contact),p(L,e(S).intro),p(ie,e(S).emailLabel),p(te,e(S).phoneLabel),p(j,e(S).workHoursLabel),p(J,e(S).workHours),p(Z,e(S).feedbackTitle),p(ke,e(S).feedbackDesc),p(Q,e(S).subjectLabel),p(ge,e(S).subjectFormat),p(_e,e(S).subjectHint),p(ue,e(S).bodyLabel),p(We,e(S).exampleLabel),p(Ye,e(S).exampleText)}),g(x,M)};se(_,x=>{e(r)==="manual"?x(m):e(r)==="faq"?x(h,1):x(y,-1)})}g(a,c),pt()}xt(["click"]);var sm=C('<button><!> <span class="nav-label svelte-1n46o8q"> </span></button>'),im=C('<main class="app app-bg svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true"><!></span> <h1 class="brand-name svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function lm(a,t){_t(t,!0);const n=F(mt);_h(),St(()=>{if(!ni().running)return;const L=setInterval(()=>If(),1e3);return()=>clearInterval(L)}),ln(()=>{Rc(),document.addEventListener("visibilitychange",()=>{document.hidden||qf()}),zf(),Xf(),(async()=>{try{const{isPermissionGranted:T,requestPermission:L}=await tv(async()=>{const{isPermissionGranted:k,requestPermission:D}=await Promise.resolve().then(()=>Ef);return{isPermissionGranted:k,requestPermission:D}},void 0);await T()||await L()}catch{}})()});const r=F(qv),o={timer:Qn,tasks:_c,stats:Qs,settings:Dv,help:hc};var c=im(),l=s(c),i=s(l),u=s(i),v=s(u);Uc(v,{size:26});var _=d(i,2);Me(_,21,()=>Rv,T=>T.path,(T,L)=>{const k=F(()=>o[e(L).labelKey]);var D=sm();let I;var ie=s(D);Lr(ie,()=>e(k),(te,ce)=>{ce(te,{size:18})});var ae=d(ie,2),re=s(ae);E(()=>{I=at(D,1,"nav-item svelte-1n46o8q",null,I,{active:e(r)===e(L).path}),A(D,"title",e(n).nav[e(L).labelKey]),A(D,"aria-current",e(r)===e(L).path?"page":void 0),p(re,e(n).nav[e(L).labelKey])}),G("click",D,()=>mc(e(L).path)),g(T,D)});var m=d(l,2),h=s(m);{var y=T=>{Xi(T,{})},x=T=>{wp(T,{})},S=T=>{Gp(T,{})},M=T=>{Kg(T,{})},P=T=>{om(T,{})},Y=T=>{Xi(T,{})};se(h,T=>{e(r)==="/timer"?T(y):e(r)==="/tasks"?T(x,1):e(r)==="/stats"?T(S,2):e(r)==="/settings"?T(M,3):e(r)==="/help"?T(P,4):T(Y,-1)})}E(()=>A(_,"aria-label",e(n).nav.mainNav)),g(a,c),pt()}xt(["click"]);Mu(lm,{target:document.getElementById("app")});
