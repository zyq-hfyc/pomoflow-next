var Hc=Object.defineProperty;var Zs=a=>{throw TypeError(a)};var Uc=(a,t,n)=>t in a?Hc(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;var oa=(a,t,n)=>Uc(a,typeof t!="symbol"?t+"":t,n),Eo=(a,t,n)=>t.has(a)||Zs("Cannot "+n);var N=(a,t,n)=>(Eo(a,t,"read from private field"),n?n.call(a):t.get(a)),ot=(a,t,n)=>t.has(a)?Zs("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,n),at=(a,t,n,r)=>(Eo(a,t,"write to private field"),r?r.call(a,n):t.set(a,n),n),_t=(a,t,n)=>(Eo(a,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const Qi=!1;var Ss=Array.isArray,Wc=Array.prototype.indexOf,Jr=Array.prototype.includes,_o=Array.from,Yc=Object.defineProperty,en=Object.getOwnPropertyDescriptor,Xi=Object.getOwnPropertyDescriptors,Gc=Object.prototype,Vc=Array.prototype,Ts=Object.getPrototypeOf,ei=Object.isExtensible;function tr(a){return typeof a=="function"}const Kc=()=>{};function $c(a){return a()}function Jo(a){for(var t=0;t<a.length;t++)a[t]()}function Zi(){var a,t,n=new Promise((r,o)=>{a=r,t=o});return{promise:n,resolve:a,reject:t}}function el(a,t){if(Array.isArray(a))return a;if(!(Symbol.iterator in a))return Array.from(a);const n=[];for(const r of a)if(n.push(r),n.length===t)break;return n}const Ut=2,kn=4,Dr=8,Ds=1<<24,Ta=16,ma=32,Ua=64,Qo=128,ga=512,Ot=1024,qt=2048,Pa=4096,Zt=8192,ca=16384,Vn=32768,Xo=1<<25,an=65536,Qr=1<<17,tl=1<<18,Kn=1<<19,al=1<<20,Na=1<<25,wn=65536,Xr=1<<21,Nn=1<<22,tn=1<<23,Aa=Symbol("$state"),nl=Symbol("legacy props"),Jc=Symbol(""),zr=Symbol("attributes"),Zo=Symbol("class"),es=Symbol("style"),lr=Symbol("text"),Hr=Symbol("form reset"),Pr=new class extends Error{constructor(){super(...arguments);oa(this,"name","StaleReactionError");oa(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var Ki;const po=!!((Ki=globalThis.document)!=null&&Ki.contentType)&&globalThis.document.contentType.includes("xml");function Qc(a){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Xc(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Zc(a,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function ed(a){throw new Error("https://svelte.dev/e/effect_in_teardown")}function td(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function ad(a){throw new Error("https://svelte.dev/e/effect_orphan")}function nd(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function rd(a){throw new Error("https://svelte.dev/e/props_invalid_value")}function od(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function sd(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function id(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function ld(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const cd=1,dd=2,rl=4,ud=8,vd=16,fd=1,hd=2,ol=4,_d=8,pd=16,sl=1,gd=2,It=Symbol("uninitialized"),il="http://www.w3.org/1999/xhtml",md="http://www.w3.org/2000/svg",bd="@attach";function yd(){console.warn("https://svelte.dev/e/derived_inert")}function kd(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function wd(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function ll(a){return a===this.v}function xd(a,t){return a!=a?t==t:a!==t||a!==null&&typeof a=="object"||typeof a=="function"}function cl(a){return!xd(a,this.v)}let $n=!1,Sd=!1;function Td(){$n=!0}let Et=null;function On(a){Et=a}function ut(a,t=!1,n){Et={p:Et,i:!1,c:null,e:null,s:a,x:null,r:st,l:$n&&!t?{s:null,u:null,$:[]}:null}}function vt(a){var t=Et,n=t.e;if(n!==null){t.e=null;for(var r of n)Nl(r)}return t.i=!0,Et=t.p,{}}function Mr(){return!$n||Et!==null&&Et.l===null}let cn=[];function dl(){var a=cn;cn=[],Jo(a)}function ja(a){if(cn.length===0&&!hr){var t=cn;queueMicrotask(()=>{t===cn&&dl()})}cn.push(a)}function Dd(){for(;cn.length>0;)dl()}function ul(a){var t=st;if(t===null)return ct.f|=tn,a;if((t.f&Vn)===0&&(t.f&kn)===0)throw a;Xa(a,t)}function Xa(a,t){if(!(t!==null&&(t.f&ca)!==0)){for(;t!==null;){if((t.f&Qo)!==0){if((t.f&Vn)===0)throw a;try{t.b.error(a);return}catch(n){a=n}}t=t.parent}throw a}}const Pd=-7169;function Ft(a,t){a.f=a.f&Pd|t}function Ps(a){(a.f&ga)!==0||a.deps===null?Ft(a,Ot):Ft(a,Pa)}function vl(a){if(a!==null)for(const t of a)(t.f&Ut)===0||(t.f&wn)===0||(t.f^=wn,vl(t.deps))}function fl(a,t,n){(a.f&qt)!==0?t.add(a):(a.f&Pa)!==0&&n.add(a),vl(a.deps),Ft(a,Ot)}let Rr=!1;function Md(a){var t=Rr;try{return Rr=!1,[a(),Rr]}finally{Rr=t}}function gn(a,t){if(t){const n=document.body;a.autofocus=!0,ja(()=>{document.activeElement===n&&a.focus()})}}let ti=!1;function Ed(){ti||(ti=!0,document.addEventListener("reset",a=>{Promise.resolve().then(()=>{var t;if(!a.defaultPrevented)for(const n of a.target.elements)(t=n[Hr])==null||t.call(n)})},{capture:!0}))}function Jn(a){var t=ct,n=st;ba(null),ya(null);try{return a()}finally{ba(t),ya(n)}}function hl(a,t,n,r=n){a.addEventListener(t,()=>Jn(n));const o=a[Hr];o?a[Hr]=()=>{o(),r(!0)}:a[Hr]=()=>r(!0),Ed()}function Cd(a){let t=0,n=nn(0),r;return()=>{Fs()&&(e(n),As(()=>(t===0&&(r=Vt(()=>a(()=>_r(n)))),t+=1,()=>{ja(()=>{t-=1,t===0&&(r==null||r(),r=void 0,_r(n))})})))}}var Nd=an|Kn;function jd(a,t,n,r){new Fd(a,t,n,r)}var fa,xs,ha,vn,ta,_a,Qt,ia,qa,fn,Ja,jn,kr,wr,Ra,vo,Dt,Ad,Id,ts,qd,as,Ur,Wr,ns,rs;class Fd{constructor(t,n,r,o){ot(this,Dt);oa(this,"parent");oa(this,"is_pending",!1);oa(this,"transform_error");ot(this,fa);ot(this,xs,null);ot(this,ha);ot(this,vn);ot(this,ta);ot(this,_a,null);ot(this,Qt,null);ot(this,ia,null);ot(this,qa,null);ot(this,fn,0);ot(this,Ja,0);ot(this,jn,!1);ot(this,kr,new Set);ot(this,wr,new Set);ot(this,Ra,null);ot(this,vo,Cd(()=>(at(this,Ra,nn(N(this,fn))),()=>{at(this,Ra,null)})));var c;at(this,fa,t),at(this,ha,n),at(this,vn,l=>{var i=st;i.b=this,i.f|=Qo,r(l)}),this.parent=st.b,this.transform_error=o??((c=this.parent)==null?void 0:c.transform_error)??(l=>l),at(this,ta,Xn(()=>{_t(this,Dt,as).call(this)},Nd))}defer_effect(t){fl(t,N(this,kr),N(this,wr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!N(this,ha).pending}update_pending_count(t,n){_t(this,Dt,ns).call(this,t,n),at(this,fn,N(this,fn)+t),!(!N(this,Ra)||N(this,jn))&&(at(this,jn,!0),ja(()=>{at(this,jn,!1),N(this,Ra)&&zn(N(this,Ra),N(this,fn))}))}get_effect_pending(){return N(this,vo).call(this),e(N(this,Ra))}error(t){if(!N(this,ha).onerror&&!N(this,ha).failed)throw t;Re!=null&&Re.is_fork?(N(this,_a)&&Re.skip_effect(N(this,_a)),N(this,Qt)&&Re.skip_effect(N(this,Qt)),N(this,ia)&&Re.skip_effect(N(this,ia)),Re.oncommit(()=>{_t(this,Dt,rs).call(this,t)})):_t(this,Dt,rs).call(this,t)}}fa=new WeakMap,xs=new WeakMap,ha=new WeakMap,vn=new WeakMap,ta=new WeakMap,_a=new WeakMap,Qt=new WeakMap,ia=new WeakMap,qa=new WeakMap,fn=new WeakMap,Ja=new WeakMap,jn=new WeakMap,kr=new WeakMap,wr=new WeakMap,Ra=new WeakMap,vo=new WeakMap,Dt=new WeakSet,Ad=function(){try{at(this,_a,Xt(()=>N(this,vn).call(this,N(this,fa))))}catch(t){this.error(t)}},Id=function(t){const n=N(this,ha).failed,{reset:r,invoke_onerror:o}=_t(this,Dt,ts).call(this,t);ja(o),n&&at(this,ia,Xt(()=>{n(N(this,fa),()=>t,()=>r)}))},ts=function(t){var n=!1,r=!1;const o=()=>{if(n){wd();return}n=!0,r&&ld(),N(this,ia)!==null&&bn(N(this,ia),()=>{at(this,ia,null)}),_t(this,Dt,Wr).call(this,()=>{_t(this,Dt,as).call(this)})};return{reset:o,invoke_onerror:()=>{var l,i;try{r=!0,(i=(l=N(this,ha)).onerror)==null||i.call(l,t,o),r=!1}catch(u){Xa(u,N(this,ta)&&N(this,ta).parent)}}}},qd=function(){const t=N(this,ha).pending;t&&(this.is_pending=!0,at(this,Qt,Xt(()=>t(N(this,fa)))),ja(()=>{var n=at(this,qa,document.createDocumentFragment()),r=Ma();n.append(r),at(this,_a,_t(this,Dt,Wr).call(this,()=>Xt(()=>N(this,vn).call(this,r)))),N(this,Ja)===0&&(N(this,fa).before(n),at(this,qa,null),bn(N(this,Qt),()=>{at(this,Qt,null)}),_t(this,Dt,Ur).call(this,Re))}))},as=function(){try{if(this.is_pending=this.has_pending_snippet(),at(this,Ja,0),at(this,fn,0),at(this,_a,Xt(()=>{N(this,vn).call(this,N(this,fa))})),N(this,Ja)>0){var t=at(this,qa,document.createDocumentFragment());qs(N(this,_a),t);const n=N(this,ha).pending;at(this,Qt,Xt(()=>n(N(this,fa))))}else _t(this,Dt,Ur).call(this,Re)}catch(n){this.error(n)}},Ur=function(t){this.is_pending=!1,t.transfer_effects(N(this,kr),N(this,wr))},Wr=function(t){var n=st,r=ct,o=Et;ya(N(this,ta)),ba(N(this,ta)),On(N(this,ta).ctx);try{return xn.ensure(),t()}catch(c){return ul(c),null}finally{ya(n),ba(r),On(o)}},ns=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&_t(r=this.parent,Dt,ns).call(r,t,n);return}at(this,Ja,N(this,Ja)+t),N(this,Ja)===0&&(_t(this,Dt,Ur).call(this,n),N(this,Qt)&&bn(N(this,Qt),()=>{at(this,Qt,null)}),N(this,qa)&&(N(this,fa).before(N(this,qa)),at(this,qa,null)))},rs=function(t){N(this,_a)&&(Gt(N(this,_a)),at(this,_a,null)),N(this,Qt)&&(Gt(N(this,Qt)),at(this,Qt,null)),N(this,ia)&&(Gt(N(this,ia)),at(this,ia,null));let n=N(this,ha).failed;const r=o=>{const{reset:c,invoke_onerror:l}=_t(this,Dt,ts).call(this,o);l(),n&&at(this,ia,_t(this,Dt,Wr).call(this,()=>{try{return Xt(()=>{var i=st;i.b=this,i.f|=Qo,n(N(this,fa),()=>o,()=>c)})}catch(i){return Xa(i,N(this,ta).parent),null}}))};ja(()=>{var o;try{o=this.transform_error(t)}catch(c){Xa(c,N(this,ta)&&N(this,ta).parent);return}o!==null&&typeof o=="object"&&typeof o.then=="function"?o.then(r,c=>Xa(c,N(this,ta)&&N(this,ta).parent)):r(o)})};function Ms(a,t,n,r){const o=Mr()?Bn:Es;var c=a.filter(b=>!b.settled),l=t.map(o);if(n.length===0&&c.length===0){r(l);return}var i=st,u=Rd(),f=c.length===1?c[0].promise:c.length>1?Promise.all(c.map(b=>b.promise)):null;function _(b){if((i.f&ca)===0){u();try{r([...l,...b])}catch(x){Xa(x,i)}Zr()}}var g=_l();if(n.length===0){f.then(()=>_([])).finally(g);return}function h(){Promise.all(n.map(b=>Ld(b))).then(_).catch(b=>Xa(b,i)).finally(g)}f?f.then(()=>{u(),h(),Zr()}):h()}function Rd(){var a=st,t=ct,n=Et,r=Re;return function(c=!0){ya(a),ba(t),On(n),c&&(a.f&ca)===0&&(r==null||r.activate(),r==null||r.apply())}}function Zr(a=!0){ya(null),ba(null),On(null),a&&(Re==null||Re.deactivate())}function _l(){var a=st,t=a.b,n=Re,r=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(r,a),()=>{t==null||t.update_pending_count(-1,n),n.decrement(r,a)}}function Bn(a){var t=Ut|qt;return st!==null&&(st.f|=Kn),{ctx:Et,deps:null,effects:null,equals:ll,f:t,fn:a,reactions:null,rv:0,v:It,wv:0,parent:st,ac:null}}const cr=Symbol("obsolete");function Ld(a,t,n){let r=st;r===null&&Xc();var o=void 0,c=nn(It),l=!ct,i=new Set;return Zd(()=>{var b,x;var u=st,f=Zi();o=f.promise;try{Promise.resolve(a()).then(f.resolve,S=>{S!==Pr&&f.reject(S)}).finally(Zr)}catch(S){f.reject(S),Zr()}var _=Re;if(l){if((u.f&Vn)!==0)var g=_l();if((b=r.b)!=null&&b.is_rendered())(x=_.async_deriveds.get(u))==null||x.reject(cr);else for(const S of i.values())S.reject(cr);i.add(f),_.async_deriveds.set(u,f)}const h=(S,T=void 0)=>{g==null||g(),i.delete(f),T!==cr&&(_.activate(),T?(c.f|=tn,zn(c,T)):((c.f&tn)!==0&&(c.f^=tn),zn(c,S)),_.deactivate())};f.promise.then(h,S=>h(null,S||"unknown"))}),go(()=>{for(const u of i)u.reject(cr)}),new Promise(u=>{function f(_){function g(){_===o?u(c):f(o)}_.then(g,g)}f(o)})}function j(a){const t=Bn(a);return Rl(t),t}function Es(a){const t=Bn(a);return t.equals=cl,t}function Od(a){var t=a.effects;if(t!==null){a.effects=null;for(var n=0;n<t.length;n+=1)Gt(t[n])}}function Cs(a){var t,n=st,r=a.parent;if(!Wa&&r!==null&&a.v!==It&&(r.f&(ca|Zt))!==0)return yd(),a.v;ya(r);try{a.f&=~wn,Od(a),t=zl(a)}finally{ya(n)}return t}function pl(a){var t=Cs(a);if(!a.equals(t)&&(a.wv=Ol(),(!(Re!=null&&Re.is_fork)||a.deps===null)&&(Re!==null?(Re.capture(a,t,!0),fr==null||fr.capture(a,t,!0)):a.v=t,a.deps===null))){Ft(a,Ot);return}Wa||(Yt!==null?(Fs()||Re!=null&&Re.is_fork)&&Yt.set(a,t):Ps(a))}function Bd(a){var t;if(a.effects!==null)for(const n of a.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&Jn(()=>{n.ac.abort(Pr),n.ac=null}),n.fn!==null&&(n.teardown=Kc),mr(n,0),Is(n))}function gl(a){if(a.effects!==null)for(const t of a.effects)t.teardown&&t.fn!==null&&Hn(t)}let Co=null,Pn=null,Re=null,fr=null,Yt=null,os=null,hr=!1,No=!1,Cn=null,Yr=null;var ai=0;let zd=1;var Fn,Qa,hn,An,In,qn,La,Rn,aa,xr,Oa,xa,Ea,Ln,_n,xt,ss,dr,is,ml,bl,En,Hd,ur;const fo=class fo{constructor(){ot(this,xt);oa(this,"id",zd++);ot(this,Fn,!1);oa(this,"linked",!0);ot(this,Qa,null);ot(this,hn,null);oa(this,"async_deriveds",new Map);oa(this,"current",new Map);oa(this,"previous",new Map);ot(this,An,new Set);ot(this,In,new Set);ot(this,qn,0);ot(this,La,new Map);ot(this,Rn,null);ot(this,aa,[]);ot(this,xr,[]);ot(this,Oa,new Set);ot(this,xa,new Set);ot(this,Ea,new Map);ot(this,Ln,new Set);oa(this,"is_fork",!1);ot(this,_n,!1);Pn===null?Co=Pn=this:(at(Pn,hn,this),at(this,Qa,Pn)),Pn=this}skip_effect(t){N(this,Ea).has(t)||N(this,Ea).set(t,{d:[],m:[]}),N(this,Ln).delete(t)}unskip_effect(t,n=r=>this.schedule(r)){var r=N(this,Ea).get(t);if(r){N(this,Ea).delete(t);for(var o of r.d)Ft(o,qt),n(o);for(o of r.m)Ft(o,Pa),n(o)}N(this,Ln).add(t)}capture(t,n,r=!1){t.v!==It&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&tn)===0&&(this.current.set(t,[n,r]),Yt==null||Yt.set(t,n)),this.is_fork||(t.v=n)}activate(){Re=this}deactivate(){Re=null,Yt=null}flush(){try{No=!0,Re=this,_t(this,xt,dr).call(this)}finally{ai=0,os=null,Cn=null,Yr=null,No=!1,Re=null,Yt=null,mn.clear()}}discard(){var t;for(const n of N(this,In))n(this);N(this,In).clear();for(const n of this.async_deriveds.values())n.reject(cr);_t(this,xt,ur).call(this),(t=N(this,Rn))==null||t.resolve()}register_created_effect(t){N(this,xr).push(t)}increment(t,n){if(at(this,qn,N(this,qn)+1),t){let r=N(this,La).get(n)??0;N(this,La).set(n,r+1)}}decrement(t,n){if(at(this,qn,N(this,qn)-1),t){let r=N(this,La).get(n)??0;r===1?N(this,La).delete(n):N(this,La).set(n,r-1)}N(this,_n)||(at(this,_n,!0),ja(()=>{at(this,_n,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const r of t)N(this,Oa).add(r);for(const r of n)N(this,xa).add(r);t.clear(),n.clear()}oncommit(t){N(this,An).add(t)}ondiscard(t){N(this,In).add(t)}settled(){return(N(this,Rn)??at(this,Rn,Zi())).promise}static ensure(){if(Re===null){const t=Re=new fo;!No&&!hr&&ja(()=>{N(t,Fn)||t.flush()})}return Re}apply(){{Yt=null;return}}schedule(t){var o;if(os=t,(o=t.b)!=null&&o.is_pending&&(t.f&(kn|Dr|Ds))!==0&&(t.f&Vn)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(Cn!==null&&n===st&&(ct===null||(ct.f&Ut)===0))return;if((r&(Ua|ma))!==0){if((r&Ot)===0)return;n.f^=Ot}}N(this,aa).push(n)}};Fn=new WeakMap,Qa=new WeakMap,hn=new WeakMap,An=new WeakMap,In=new WeakMap,qn=new WeakMap,La=new WeakMap,Rn=new WeakMap,aa=new WeakMap,xr=new WeakMap,Oa=new WeakMap,xa=new WeakMap,Ea=new WeakMap,Ln=new WeakMap,_n=new WeakMap,xt=new WeakSet,ss=function(){if(this.is_fork)return!0;for(const r of N(this,La).keys()){for(var t=r,n=!1;t.parent!==null;){if(N(this,Ea).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},dr=function(){var u,f,_,g;at(this,Fn,!0),ai++>1e3&&(_t(this,xt,ur).call(this),Wd());for(const h of N(this,Oa))N(this,xa).delete(h),Ft(h,qt),this.schedule(h);for(const h of N(this,xa))Ft(h,Pa),this.schedule(h);const t=N(this,aa);at(this,aa,[]),this.apply();var n=Cn=[],r=[],o=Yr=[];for(const h of t)try{_t(this,xt,is).call(this,h,n,r)}catch(b){throw wl(h),_t(this,xt,ss).call(this)||this.discard(),b}if(Re=null,o.length>0){var c=fo.ensure();for(const h of o)c.schedule(h)}if(Cn=null,Yr=null,_t(this,xt,ss).call(this)){_t(this,xt,En).call(this,r),_t(this,xt,En).call(this,n);for(const[h,b]of N(this,Ea))kl(h,b);o.length>0&&_t(u=Re,xt,dr).call(u);return}const l=_t(this,xt,ml).call(this);if(l){_t(this,xt,En).call(this,r),_t(this,xt,En).call(this,n),_t(f=l,xt,bl).call(f,this);return}N(this,Oa).clear(),N(this,xa).clear();for(const h of N(this,An))h(this);N(this,An).clear(),fr=this,ni(r),ni(n),fr=null,(_=N(this,Rn))==null||_.resolve();var i=Re;if(N(this,qn)===0&&(N(this,aa).length===0||i!==null)&&_t(this,xt,ur).call(this),N(this,aa).length>0)if(i!==null){const h=i;N(h,aa).push(...N(this,aa).filter(b=>!N(h,aa).includes(b)))}else i=this;i!==null&&_t(g=i,xt,dr).call(g)},is=function(t,n,r){t.f^=Ot;for(var o=t.first;o!==null;){var c=o.f,l=(c&(ma|Ua))!==0,i=l&&(c&Ot)!==0,u=i||(c&Zt)!==0||N(this,Ea).has(o);if(!u&&o.fn!==null){l?o.f^=Ot:(c&kn)!==0?n.push(o):Nr(o)&&((c&Ta)!==0&&N(this,xa).add(o),Hn(o));var f=o.first;if(f!==null){o=f;continue}}for(;o!==null;){var _=o.next;if(_!==null){o=_;break}o=o.parent}}},ml=function(){for(var t=N(this,Qa);t!==null;){if(!t.is_fork){for(const[n,[,r]]of this.current)if(t.current.has(n)&&!r)return t}t=N(t,Qa)}return null},bl=function(t){var r;for(const[o,c]of t.current)!this.previous.has(o)&&t.previous.has(o)&&this.previous.set(o,t.previous.get(o)),this.current.set(o,c);for(const[o,c]of t.async_deriveds){const l=this.async_deriveds.get(o);l&&c.promise.then(l.resolve).catch(l.reject)}t.async_deriveds.clear(),this.transfer_effects(N(t,Oa),N(t,xa));const n=o=>{var c=o.reactions;if(c!==null&&!((o.f&Ut)!==0&&(o.f&(qt|Pa))===0))for(const u of c){var l=u.f;if((l&Ut)!==0)n(u);else{var i=u;l&(Nn|Ta)&&!this.async_deriveds.has(i)&&(N(this,xa).delete(i),Ft(i,qt),this.schedule(i))}}};for(const o of this.current.keys())n(o);this.oncommit(()=>t.discard()),_t(r=t,xt,ur).call(r),Re=this,_t(this,xt,dr).call(this)},En=function(t){for(var n=0;n<t.length;n+=1)fl(t[n],N(this,Oa),N(this,xa))},Hd=function(){var g;for(let h=Co;h!==null;h=N(h,hn)){var t=h.id<this.id,n=[];for(const[b,[x,S]]of this.current){if(h.current.has(b)){var r=h.current.get(b)[0];if(t&&x!==r)h.current.set(b,[x,S]);else continue}n.push(b)}if(t)for(const[b,x]of this.async_deriveds){const S=h.async_deriveds.get(b);S&&x.promise.then(S.resolve).catch(S.reject)}var o=[...h.current.keys()].filter(b=>!h.current.get(b)[1]);if(!(!N(h,Fn)||o.length===0)){var c=o.filter(b=>!this.current.has(b));if(c.length===0)t&&h.discard();else if(n.length>0){if(t)for(const b of N(this,Ln))h.unskip_effect(b,x=>{var S;(x.f&(Ta|Nn))!==0?h.schedule(x):_t(S=h,xt,En).call(S,[x])});h.activate();var l=new Set,i=new Map;for(var u of n)yl(u,c,l,i);i=new Map;var f=[...h.current].filter(([b,x])=>{const S=this.current.get(b);return S?S[0]!==x[0]||S[1]!==x[1]:!0}).map(([b])=>b);if(f.length>0)for(const b of N(this,xr))(b.f&(ca|Zt|Qr))===0&&Ns(b,f,i)&&((b.f&(Nn|Ta))!==0?(Ft(b,qt),h.schedule(b)):N(h,Oa).add(b));if(N(h,aa).length>0&&!N(h,_n)){h.apply();for(var _ of N(h,aa))_t(g=h,xt,is).call(g,_,[],[]);at(h,aa,[])}h.deactivate()}}}},ur=function(){if(this.linked){var t=N(this,Qa),n=N(this,hn);t===null?Co=n:at(t,hn,n),n===null?Pn=t:at(n,Qa,t),this.linked=!1}};let xn=fo;function Ud(a){var t=hr;hr=!0;try{for(var n;;){if(Dd(),Re===null)return n;Re.flush()}}finally{hr=t}}function Wd(){try{nd()}catch(a){Xa(a,os)}}let wa=null;function ni(a){var t=a.length;if(t!==0){for(var n=0;n<t;){var r=a[n++];if((r.f&(ca|Zt))===0&&Nr(r)&&(wa=new Set,Hn(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&Al(r),(wa==null?void 0:wa.size)>0)){mn.clear();for(const o of wa){if((o.f&(ca|Zt))!==0)continue;const c=[o];let l=o.parent;for(;l!==null;)wa.has(l)&&(wa.delete(l),c.push(l)),l=l.parent;for(let i=c.length-1;i>=0;i--){const u=c[i];(u.f&(ca|Zt))===0&&Hn(u)}}wa.clear()}}wa=null}}function yl(a,t,n,r){if(!n.has(a)&&(n.add(a),a.reactions!==null))for(const o of a.reactions){const c=o.f;(c&Ut)!==0?yl(o,t,n,r):(c&(Nn|Ta))!==0&&(c&qt)===0&&Ns(o,t,r)&&(Ft(o,qt),js(o))}}function Ns(a,t,n){const r=n.get(a);if(r!==void 0)return r;if(a.deps!==null)for(const o of a.deps){if(Jr.call(t,o))return!0;if((o.f&Ut)!==0&&Ns(o,t,n))return n.set(o,!0),!0}return n.set(a,!1),!1}function js(a){Re.schedule(a)}function kl(a,t){if(!((a.f&ma)!==0&&(a.f&Ot)!==0)){(a.f&qt)!==0?t.d.push(a):(a.f&Pa)!==0&&t.m.push(a),Ft(a,Ot);for(var n=a.first;n!==null;)kl(n,t),n=n.next}}function wl(a){Ft(a,Ot);for(var t=a.first;t!==null;)wl(t),t=t.next}let eo=new Set;const mn=new Map;let xl=!1;function nn(a,t){var n={f:0,v:a,reactions:null,equals:ll,rv:0,wv:0};return n}function z(a,t){const n=nn(a);return Rl(n),n}function Yd(a,t=!1,n=!0){var o;const r=nn(a);return t||(r.equals=cl),$n&&n&&Et!==null&&Et.l!==null&&((o=Et.l).s??(o.s=[])).push(r),r}function v(a,t,n=!1){ct!==null&&(!Da||(ct.f&Qr)!==0)&&Mr()&&(ct.f&(Ut|Ta|Nn|Qr))!==0&&(Ia===null||!Ia.has(a))&&id();let r=n?ze(t):t;return zn(a,r,Yr)}function zn(a,t,n=null){if(!a.equals(t)){mn.set(a,Wa?t:a.v);var r=xn.ensure();if(r.capture(a,t),(a.f&Ut)!==0){const o=a;(a.f&qt)!==0&&Cs(o),Yt===null&&Ps(o)}a.wv=Ol(),Sl(a,qt,n),Mr()&&st!==null&&(st.f&Ot)!==0&&(st.f&(ma|Ua))===0&&(va===null?au([a]):va.push(a)),!r.is_fork&&eo.size>0&&!xl&&Gd()}return t}function Gd(){xl=!1;for(const a of eo){(a.f&Ot)!==0&&Ft(a,Pa);let t;try{t=Nr(a)}catch{t=!0}t&&Hn(a)}eo.clear()}function ri(a,t=1){var n=e(a),r=t===1?n++:n--;return v(a,n),r}function _r(a){v(a,a.v+1)}function Sl(a,t,n){var r=a.reactions;if(r!==null)for(var o=Mr(),c=r.length,l=0;l<c;l++){var i=r[l],u=i.f;if(!(!o&&i===st)){var f=(u&qt)===0;if(f&&Ft(i,t),(u&Qr)!==0)eo.add(i);else if((u&Ut)!==0){var _=i;Yt==null||Yt.delete(_),(u&wn)===0&&(u&ga&&(st===null||(st.f&Xr)===0)&&(i.f|=wn),Sl(_,Pa,n))}else if(f){var g=i;(u&Ta)!==0&&wa!==null&&wa.add(g),n!==null?n.push(g):js(g)}}}}function ze(a){if(typeof a!="object"||a===null||Aa in a)return a;const t=Ts(a);if(t!==Gc&&t!==Vc)return a;var n=new Map,r=Ss(a),o=z(0),c=yn,l=i=>{if(yn===c)return i();var u=ct,f=yn;ba(null),ii(c);var _=i();return ba(u),ii(f),_};return r&&n.set("length",z(a.length)),new Proxy(a,{defineProperty(i,u,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&od();var _=n.get(u);return _===void 0?l(()=>{var g=z(f.value);return n.set(u,g),g}):v(_,f.value,!0),!0},deleteProperty(i,u){var f=n.get(u);if(f===void 0){if(u in i){const _=l(()=>z(It));n.set(u,_),_r(o)}}else v(f,It),_r(o);return!0},get(i,u,f){var b;if(u===Aa)return a;var _=n.get(u),g=u in i;if(_===void 0&&(!g||(b=en(i,u))!=null&&b.writable)&&(_=l(()=>{var x=ze(g?i[u]:It),S=z(x);return S}),n.set(u,_)),_!==void 0){var h=e(_);return h===It?void 0:h}return Reflect.get(i,u,f)},getOwnPropertyDescriptor(i,u){var f=Reflect.getOwnPropertyDescriptor(i,u);if(f&&"value"in f){var _=n.get(u);_&&(f.value=e(_))}else if(f===void 0){var g=n.get(u),h=g==null?void 0:g.v;if(g!==void 0&&h!==It)return{enumerable:!0,configurable:!0,value:h,writable:!0}}return f},has(i,u){var h;if(u===Aa)return!0;var f=n.get(u),_=f!==void 0&&f.v!==It||Reflect.has(i,u);if(f!==void 0||st!==null&&(!_||(h=en(i,u))!=null&&h.writable)){f===void 0&&(f=l(()=>{var b=_?ze(i[u]):It,x=z(b);return x}),n.set(u,f));var g=e(f);if(g===It)return!1}return _},set(i,u,f,_){var w;var g=n.get(u),h=u in i;if(r&&u==="length")for(var b=f;b<g.v;b+=1){var x=n.get(b+"");x!==void 0?v(x,It):b in i&&(x=l(()=>z(It)),n.set(b+"",x))}if(g===void 0)(!h||(w=en(i,u))!=null&&w.writable)&&(g=l(()=>z(void 0)),v(g,ze(f)),n.set(u,g));else{h=g.v!==It;var S=l(()=>ze(f));v(g,S)}var T=Reflect.getOwnPropertyDescriptor(i,u);if(T!=null&&T.set&&T.set.call(_,f),!h){if(r&&typeof u=="string"){var M=n.get("length"),R=Number(u);Number.isInteger(R)&&R>=M.v&&v(M,R+1)}_r(o)}return!0},ownKeys(i){e(o);var u=Reflect.ownKeys(i).filter(g=>{var h=n.get(g);return h===void 0||h.v!==It});for(var[f,_]of n)_.v!==It&&!(f in i)&&u.push(f);return u},setPrototypeOf(){sd()}})}function oi(a){try{if(a!==null&&typeof a=="object"&&Aa in a)return a[Aa]}catch{}return a}function Vd(a,t){return Object.is(oi(a),oi(t))}var ls,Qn,Tl,Dl,Pl;function Kd(){if(ls===void 0){ls=window,Qn=document,Tl=/Firefox/.test(navigator.userAgent);var a=Element.prototype,t=Node.prototype,n=Text.prototype;Dl=en(t,"firstChild").get,Pl=en(t,"nextSibling").get,ei(a)&&(a[Zo]=void 0,a[zr]=null,a[es]=void 0,a.__e=void 0),ei(n)&&(n[lr]=void 0)}}function Ma(a=""){return document.createTextNode(a)}function Ba(a){return Dl.call(a)}function Er(a){return Pl.call(a)}function s(a,t){return Ba(a)}function Fe(a,t=!1){{var n=Ba(a);return n instanceof Comment&&n.data===""?Er(n):n}}function d(a,t=1,n=!1){let r=a;for(;t--;)r=Er(r);return r}function $d(a){a.textContent=""}function Ml(){return!1}function El(a,t,n){return t==null||t===il?n?document.createElement(a,{is:n}):document.createElement(a):n?document.createElementNS(t,a,{is:n}):document.createElementNS(t,a)}function Cl(a){st===null&&(ct===null&&ad(),td()),Wa&&ed()}function Jd(a,t){var n=t.last;n===null?t.last=t.first=a:(n.next=a,a.prev=n,t.last=a)}function ka(a,t){var n=st;n!==null&&(n.f&Zt)!==0&&(a|=Zt);var r={ctx:Et,deps:null,nodes:null,f:a|qt|ga,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};Re==null||Re.register_created_effect(r);var o=r;if((a&kn)!==0)Cn!==null?Cn.push(r):xn.ensure().schedule(r);else if(t!==null){try{Hn(r)}catch(l){throw Gt(r),l}o.deps===null&&o.teardown===null&&o.nodes===null&&o.first===o.last&&(o.f&Kn)===0&&(o=o.first,(a&Ta)!==0&&(a&an)!==0&&o!==null&&(o.f|=an))}if(o!==null&&(o.parent=n,n!==null&&Jd(o,n),ct!==null&&(ct.f&Ut)!==0&&(a&Ua)===0)){var c=ct;(c.effects??(c.effects=[])).push(o)}return r}function Fs(){return ct!==null&&!Da}function go(a){const t=ka(Dr,null);return Ft(t,Ot),t.teardown=a,t}function St(a){Cl();var t=st.f,n=!ct&&(t&ma)!==0&&Et!==null&&!Et.i;if(n){var r=Et;(r.e??(r.e=[])).push(a)}else return Nl(a)}function Nl(a){return ka(kn|al,a)}function Qd(a){return Cl(),ka(Dr|al,a)}function Xd(a){xn.ensure();const t=ka(Ua|Kn,a);return(n={})=>new Promise(r=>{n.outro?bn(t,()=>{Gt(t),r(void 0)}):(Gt(t),r(void 0))})}function mo(a){return ka(kn,a)}function Zd(a){return ka(Nn|Kn,a)}function As(a,t=0){return ka(Dr|t,a)}function E(a,t=[],n=[],r=[]){Ms(r,t,n,o=>{ka(Dr,()=>{a(...o.map(e))})})}function Cr(a,t=[],n=[],r=[]){Ms(r,t,n,o=>{ka(kn,()=>a(...o.map(e)))})}function Xn(a,t=0){var n=ka(Ta|t,a);return n}function jl(a,t=0){var n=ka(Ds|t,a);return n}function Xt(a){return ka(ma|Kn,a)}function Fl(a){var t=a.teardown;if(t!==null){const n=Wa,r=ct;si(!0),ba(null);try{t.call(null)}finally{si(n),ba(r)}}}function Is(a,t=!1){var n=a.first;for(a.first=a.last=null;n!==null;){const o=n.ac;o!==null&&Jn(()=>{o.abort(Pr)});var r=n.next;(n.f&Ua)!==0?n.parent=null:Gt(n,t),n=r}}function eu(a){for(var t=a.first;t!==null;){var n=t.next;(t.f&ma)===0&&Gt(t),t=n}}function Gt(a,t=!0){var n=!1;(t||(a.f&tl)!==0)&&a.nodes!==null&&a.nodes.end!==null&&(tu(a.nodes.start,a.nodes.end),n=!0),a.f|=Xo,Is(a,t&&!n),mr(a,0);var r=a.nodes&&a.nodes.t;if(r!==null)for(const c of r)c.stop();Fl(a),a.f^=Xo,a.f|=ca;var o=a.parent;o!==null&&o.first!==null&&Al(a),a.next=a.prev=a.teardown=a.ctx=a.deps=a.fn=a.nodes=a.ac=a.b=null}function tu(a,t){for(;a!==null;){var n=a===t?null:Er(a);a.remove(),a=n}}function Al(a){var t=a.parent,n=a.prev,r=a.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===a&&(t.first=r),t.last===a&&(t.last=n))}function bn(a,t,n=!0){var r=[];Il(a,r,!0);var o=()=>{n&&Gt(a),t&&t()},c=r.length;if(c>0){var l=()=>--c||o();for(var i of r)i.out(l)}else o()}function Il(a,t,n){if((a.f&Zt)===0){a.f^=Zt;var r=a.nodes&&a.nodes.t;if(r!==null)for(const i of r)(i.is_global||n)&&t.push(i);for(var o=a.first;o!==null;){var c=o.next;if((o.f&Ua)===0){var l=(o.f&an)!==0||(o.f&ma)!==0&&(a.f&Ta)!==0;Il(o,t,l?n:!1)}o=c}}}function to(a){ql(a,!0)}function ql(a,t){if((a.f&Zt)!==0){a.f^=Zt,(a.f&Ot)===0&&(Ft(a,qt),xn.ensure().schedule(a));for(var n=a.first;n!==null;){var r=n.next,o=(n.f&an)!==0||(n.f&ma)!==0;ql(n,o?t:!1),n=r}var c=a.nodes&&a.nodes.t;if(c!==null)for(const l of c)(l.is_global||t)&&l.in()}}function qs(a,t){if(a.nodes)for(var n=a.nodes.start,r=a.nodes.end;n!==null;){var o=n===r?null:Er(n);t.append(n),n=o}}let Gr=!1,Wa=!1;function si(a){Wa=a}let ct=null,Da=!1;function ba(a){ct=a}let st=null;function ya(a){st=a}let Ia=null;function Rl(a){ct!==null&&(Ia??(Ia=new Set)).add(a)}let na=null,sa=0,va=null;function au(a){va=a}let Ll=1,dn=0,yn=dn;function ii(a){yn=a}function Ol(){return++Ll}function Nr(a){var t=a.f;if((t&qt)!==0)return!0;if(t&Ut&&(a.f&=~wn),(t&Pa)!==0){for(var n=a.deps,r=n.length,o=0;o<r;o++){var c=n[o];if(Nr(c)&&pl(c),c.wv>a.wv)return!0}(t&ga)!==0&&Yt===null&&Ft(a,Ot)}return!1}function Bl(a,t,n=!0){var r=a.reactions;if(r!==null&&!(Ia!==null&&Ia.has(a)))for(var o=0;o<r.length;o++){var c=r[o];(c.f&Ut)!==0?Bl(c,t,!1):t===c&&(n?Ft(c,qt):(c.f&Ot)!==0&&Ft(c,Pa),js(c))}}function zl(a){var S;var t=na,n=sa,r=va,o=ct,c=Ia,l=Et,i=Da,u=yn,f=a.f;na=null,sa=0,va=null,ct=(f&(ma|Ua))===0?a:null,Ia=null,On(a.ctx),Da=!1,yn=++dn,a.ac!==null&&(Jn(()=>{a.ac.abort(Pr)}),a.ac=null);try{a.f|=Xr;var _=a.fn,g=_();a.f|=Vn;var h=a.deps,b=Re==null?void 0:Re.is_fork;if(na!==null){var x;if(b||mr(a,sa),h!==null&&sa>0)for(h.length=sa+na.length,x=0;x<na.length;x++)h[sa+x]=na[x];else a.deps=h=na;if(Fs()&&(a.f&ga)!==0)for(x=sa;x<h.length;x++)((S=h[x]).reactions??(S.reactions=[])).push(a)}else!b&&h!==null&&sa<h.length&&(mr(a,sa),h.length=sa);if(Mr()&&va!==null&&!Da&&h!==null&&(a.f&(Ut|Pa|qt))===0)for(x=0;x<va.length;x++)Bl(va[x],a);if(o!==null&&o!==a){if(dn++,o.deps!==null)for(let T=0;T<n;T+=1)o.deps[T].rv=dn;if(t!==null)for(const T of t)T.rv=dn;va!==null&&(r===null?r=va:r.push(...va))}return(a.f&tn)!==0&&(a.f^=tn),g}catch(T){return ul(T)}finally{a.f^=Xr,na=t,sa=n,va=r,ct=o,Ia=c,On(l),Da=i,yn=u}}function nu(a,t){let n=t.reactions;if(n!==null){var r=Wc.call(n,a);if(r!==-1){var o=n.length-1;o===0?n=t.reactions=null:(n[r]=n[o],n.pop())}}if(n===null&&(t.f&Ut)!==0&&(na===null||!Jr.call(na,t))){var c=t;(c.f&ga)!==0&&(c.f^=ga,c.f&=~wn),c.v!==It&&Ps(c),c.ac!==null&&Jn(()=>{c.ac.abort(Pr),c.ac=null,Ft(c,qt)}),Bd(c),mr(c,0)}}function mr(a,t){var n=a.deps;if(n!==null)for(var r=t;r<n.length;r++)nu(a,n[r])}function Hn(a){var t=a.f;if((t&ca)===0){Ft(a,Ot);var n=st,r=Gr;st=a,Gr=(t&(ma|Ua))===0;try{(t&(Ta|Ds))!==0?eu(a):Is(a),Fl(a);var o=zl(a);a.teardown=typeof o=="function"?o:null,a.wv=Ll;var c;Qi&&Sd&&(a.f&qt)!==0&&a.deps}finally{Gr=r,st=n}}}async function ru(){await Promise.resolve(),Ud()}function e(a){var t=a.f,n=(t&Ut)!==0;if(ct!==null&&!Da){var r=st!==null&&(st.f&ca)!==0;if(!r&&(Ia===null||!Ia.has(a))){var o=ct.deps;if((ct.f&Xr)!==0)a.rv<dn&&(a.rv=dn,na===null&&o!==null&&o[sa]===a?sa++:na===null?na=[a]:na.push(a));else{ct.deps??(ct.deps=[]),Jr.call(ct.deps,a)||ct.deps.push(a);var c=a.reactions;c===null?a.reactions=[ct]:Jr.call(c,ct)||c.push(ct)}}}if(Wa&&mn.has(a))return mn.get(a);if(n){var l=a;if(Wa){var i=l.v;return((l.f&Ot)===0&&l.reactions!==null||Ul(l))&&(i=Cs(l)),mn.set(l,i),i}var u=(l.f&ga)===0&&!Da&&ct!==null&&(Gr||(ct.f&ga)!==0),f=(l.f&Vn)===0;Nr(l)&&(u&&(l.f|=ga),pl(l)),u&&!f&&(gl(l),Hl(l))}if(Yt!=null&&Yt.has(a))return Yt.get(a);if((a.f&tn)!==0)throw a.v;return a.v}function Hl(a){if(a.f|=ga,a.deps!==null)for(const t of a.deps)(t.reactions??(t.reactions=[])).push(a),(t.f&Ut)!==0&&(t.f&ga)===0&&(gl(t),Hl(t))}function Ul(a){if(a.v===It)return!0;if(a.deps===null)return!1;for(const t of a.deps)if(mn.has(t)||(t.f&Ut)!==0&&Ul(t))return!0;return!1}function Vt(a){var t=Da;try{return Da=!0,a()}finally{Da=t}}function sn(a){if(!(typeof a!="object"||!a||a instanceof EventTarget)){if(Aa in a)cs(a);else if(!Array.isArray(a))for(let t in a){const n=a[t];typeof n=="object"&&n&&Aa in n&&cs(n)}}}function cs(a,t=new Set){if(typeof a=="object"&&a!==null&&!(a instanceof EventTarget)&&!t.has(a)){t.add(a),a instanceof Date&&a.getTime();for(let r in a)try{cs(a[r],t)}catch{}const n=Ts(a);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=Xi(n);for(let o in r){const c=r[o].get;if(c)try{c.call(a)}catch{}}}}}function ou(a){return a.endsWith("capture")&&a!=="gotpointercapture"&&a!=="lostpointercapture"}const su=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function iu(a){return su.includes(a)}const lu={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function cu(a){return a=a.toLowerCase(),lu[a]??a}const du=["touchstart","touchmove"];function uu(a){return du.includes(a)}const un=Symbol("events"),Wl=new Set,ds=new Set;function Yl(a,t,n,r={}){function o(c){if(r.capture||us.call(t,c),!c.cancelBubble)return Jn(()=>n==null?void 0:n.call(this,c))}return a.startsWith("pointer")||a.startsWith("touch")||a==="wheel"?ja(()=>{t.addEventListener(a,o,r)}):t.addEventListener(a,o,r),o}function kt(a,t,n,r,o){var c={capture:r,passive:o},l=Yl(a,t,n,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&go(()=>{t.removeEventListener(a,l,c)})}function W(a,t,n){(t[un]??(t[un]={}))[a]=n}function yt(a){for(var t=0;t<a.length;t++)Wl.add(a[t]);for(var n of ds)n(a)}let li=null;function us(a){var S,T;var t=this,n=t.ownerDocument,r=a.type,o=((S=a.composedPath)==null?void 0:S.call(a))||[],c=o[0]||a.target;li=a;var l=0,i=li===a&&a[un];if(i){var u=o.indexOf(i);if(u!==-1&&(t===document||t===window)){a[un]=t;return}var f=o.indexOf(t);if(f===-1)return;u<=f&&(l=u)}if(c=o[l]||a.target,c!==t){Yc(a,"currentTarget",{configurable:!0,get(){return c||n}});var _=ct,g=st;ba(null),ya(null);try{for(var h,b=[];c!==null&&c!==t;){try{var x=(T=c[un])==null?void 0:T[r];x!=null&&(!c.disabled||a.target===c)&&x.call(c,a)}catch(M){h?b.push(M):h=M}if(a.cancelBubble)break;l++,c=l<o.length?o[l]:null}if(h){for(let M of b)queueMicrotask(()=>{throw M});throw h}}finally{a[un]=t,delete a.currentTarget,ba(_),ya(g)}}}var $i;const jo=(($i=globalThis==null?void 0:globalThis.window)==null?void 0:$i.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:a=>a});function vu(a){return(jo==null?void 0:jo.createHTML(a))??a}function Gl(a){var t=El("template");return t.innerHTML=vu(a.replaceAll("<!>","<!---->")),t.content}function Sn(a,t){var n=st;n.nodes===null&&(n.nodes={start:a,end:t,a:null,t:null})}function C(a,t){var n=(t&sl)!==0,r=(t&gd)!==0,o,c=!a.startsWith("<!>");return()=>{o===void 0&&(o=Gl(c?a:"<!>"+a),n||(o=Ba(o)));var l=r||Tl?document.importNode(o,!0):o.cloneNode(!0);if(n){var i=Ba(l),u=l.lastChild;Sn(i,u)}else Sn(l,l);return l}}function fu(a,t,n="svg"){var r=!a.startsWith("<!>"),o=(t&sl)!==0,c=`<${n}>${r?a:"<!>"+a}</${n}>`,l;return()=>{if(!l){var i=Gl(c),u=Ba(i);if(o)for(l=document.createDocumentFragment();Ba(u);)l.appendChild(Ba(u));else l=Ba(u)}var f=l.cloneNode(!0);if(o){var _=Ba(f),g=f.lastChild;Sn(_,g)}else Sn(f,f);return f}}function Dn(a,t){return fu(a,t,"svg")}function ci(a=""){{var t=Ma(a+"");return Sn(t,t),t}}function Oe(){var a=document.createDocumentFragment(),t=document.createComment(""),n=Ma();return a.append(t,n),Sn(t,n),a}function m(a,t){a!==null&&a.before(t)}function p(a,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(a[lr]??(a[lr]=a.nodeValue))&&(a[lr]=n,a.nodeValue=`${n}`)}function hu(a,t){return _u(a,t)}const Lr=new Map;function _u(a,{target:t,anchor:n,props:r={},events:o,context:c,intro:l=!0,transformError:i}){Kd();var u=void 0,f=Xd(()=>{var _=n??t.appendChild(Ma());jd(_,{pending:()=>{}},b=>{ut({});var x=Et;c&&(x.c=c),o&&(r.$$events=o),u=a(b,r)||{},vt()},i);var g=new Set,h=b=>{for(var x=0;x<b.length;x++){var S=b[x];if(!g.has(S)){g.add(S);var T=uu(S);for(const w of[t,document]){var M=Lr.get(w);M===void 0&&(M=new Map,Lr.set(w,M));var R=M.get(S);R===void 0?(w.addEventListener(S,us,{passive:T}),M.set(S,1)):M.set(S,R+1)}}}};return h(_o(Wl)),ds.add(h),()=>{var T;for(var b of g)for(const M of[t,document]){var x=Lr.get(M),S=x.get(b);--S==0?(M.removeEventListener(b,us),x.delete(b),x.size===0&&Lr.delete(M)):x.set(b,S)}ds.delete(h),_!==n&&((T=_.parentNode)==null||T.removeChild(_))}});return pu.set(u,f),u}let pu=new WeakMap;var Sa,Ca,la,pn,Sr,Tr,ho;class Rs{constructor(t,n=!0){oa(this,"anchor");ot(this,Sa,new Map);ot(this,Ca,new Map);ot(this,la,new Map);ot(this,pn,new Set);ot(this,Sr,!0);ot(this,Tr,t=>{if(N(this,Sa).has(t)){var n=N(this,Sa).get(t),r=N(this,Ca).get(n);if(r)to(r),N(this,pn).delete(n);else{var o=N(this,la).get(n);o&&(to(o.effect),N(this,Ca).set(n,o.effect),N(this,la).delete(n),o.fragment.lastChild.remove(),this.anchor.before(o.fragment),r=o.effect)}for(const[c,l]of N(this,Sa)){if(N(this,Sa).delete(c),c===t)break;const i=N(this,la).get(l);i&&(Gt(i.effect),N(this,la).delete(l))}for(const[c,l]of N(this,Ca)){if(c===n||N(this,pn).has(c))continue;const i=()=>{if(Array.from(N(this,Sa).values()).includes(c)){var f=document.createDocumentFragment();qs(l,f),f.append(Ma()),N(this,la).set(c,{effect:l,fragment:f})}else Gt(l);N(this,pn).delete(c),N(this,Ca).delete(c)};N(this,Sr)||!r?(N(this,pn).add(c),bn(l,i,!1)):i()}}});ot(this,ho,t=>{N(this,Sa).delete(t);const n=Array.from(N(this,Sa).values());for(const[r,o]of N(this,la))n.includes(r)||(Gt(o.effect),N(this,la).delete(r))});this.anchor=t,at(this,Sr,n)}ensure(t,n){var r=Re,o=Ml();if(n&&!N(this,Ca).has(t)&&!N(this,la).has(t))if(o){var c=document.createDocumentFragment(),l=Ma();c.append(l),N(this,la).set(t,{effect:Xt(()=>n(l)),fragment:c})}else N(this,Ca).set(t,Xt(()=>n(this.anchor)));if(N(this,Sa).set(r,t),o){for(const[i,u]of N(this,Ca))i===t?r.unskip_effect(u):r.skip_effect(u);for(const[i,u]of N(this,la))i===t?r.unskip_effect(u.effect):r.skip_effect(u.effect);r.oncommit(N(this,Tr)),r.ondiscard(N(this,ho))}else N(this,Tr).call(this,r)}}Sa=new WeakMap,Ca=new WeakMap,la=new WeakMap,pn=new WeakMap,Sr=new WeakMap,Tr=new WeakMap,ho=new WeakMap;function oe(a,t,n=!1){var r=new Rs(a),o=n?an:0;function c(l,i){r.ensure(l,i)}Xn(()=>{var l=!1;t((i,u=0)=>{l=!0,c(u,i)}),l||c(-1,null)},o)}function Ha(a,t){return t}function gu(a,t,n){for(var r=[],o=t.length,c,l=t.length,i=0;i<o;i++){let g=t[i];bn(g,()=>{if(c){if(c.pending.delete(g),c.done.add(g),c.pending.size===0){var h=a.outrogroups;vs(a,_o(c.done)),h.delete(c),h.size===0&&(a.outrogroups=null)}}else l-=1},!1)}if(l===0){var u=r.length===0&&n!==null&&a.pending.size===0;if(u){var f=n,_=f.parentNode;$d(_),_.append(f),a.items.clear()}vs(a,t,!u)}else c={pending:new Set(t),done:new Set},(a.outrogroups??(a.outrogroups=new Set)).add(c)}function vs(a,t,n=!0){var r;if(a.pending.size>0){r=new Set;for(const l of a.pending.values())for(const i of l)r.add(a.items.get(i).e)}for(var o=0;o<t.length;o++){var c=t[o];if(r!=null&&r.has(c)){c.f|=Na;const l=document.createDocumentFragment();qs(c,l)}else Gt(t[o],n)}}var di;function je(a,t,n,r,o,c=null){var l=a,i=new Map,u=(t&rl)!==0;if(u){var f=a;l=f.appendChild(Ma())}var _=null,g=Es(()=>{var w=n();return Ss(w)?w:w==null?[]:_o(w)}),h,b=new Map,x=!0;function S(w){(R.effect.f&ca)===0&&(R.pending.delete(w),R.fallback=_,mu(R,h,l,t,r),_!==null&&(h.length===0?(_.f&Na)===0?to(_):(_.f^=Na,vr(_,null,l)):bn(_,()=>{_=null})))}function T(w){R.pending.delete(w)}var M=Xn(()=>{h=e(g);for(var w=h.length,A=new Set,k=Re,D=Ml(),Y=0;Y<w;Y+=1){var he=h[Y],le=r(he,Y),ne=x?null:i.get(le);ne?(ne.v&&zn(ne.v,he),ne.i&&zn(ne.i,Y),D&&k.unskip_effect(ne.e)):(ne=bu(i,x?l:di??(di=Ma()),he,le,Y,o,t,n),x||(ne.e.f|=Na),i.set(le,ne)),A.add(le)}if(w===0&&c&&!_&&(x?_=Xt(()=>c(l)):(_=Xt(()=>c(di??(di=Ma()))),_.f|=Na)),w>A.size&&Zc(),!x)if(b.set(k,A),D){for(const[Z,G]of i)A.has(Z)||k.skip_effect(G.e);k.oncommit(S),k.ondiscard(T)}else S(k);e(g)}),R={effect:M,items:i,pending:b,outrogroups:null,fallback:_};x=!1}function ar(a){for(;a!==null&&(a.f&ma)===0;)a=a.next;return a}function mu(a,t,n,r,o){var ne,Z,G,ie,F,L,re,be,ye;var c=(r&ud)!==0,l=t.length,i=a.items,u=ar(a.effect.first),f,_=null,g,h=[],b=[],x,S,T,M;if(c)for(M=0;M<l;M+=1)x=t[M],S=o(x,M),T=i.get(S).e,(T.f&Na)===0&&((Z=(ne=T.nodes)==null?void 0:ne.a)==null||Z.measure(),(g??(g=new Set)).add(T));for(M=0;M<l;M+=1){if(x=t[M],S=o(x,M),T=i.get(S).e,a.outrogroups!==null)for(const H of a.outrogroups)H.pending.delete(T),H.done.delete(T);if((T.f&Zt)!==0&&(to(T),c&&((ie=(G=T.nodes)==null?void 0:G.a)==null||ie.unfix(),(g??(g=new Set)).delete(T))),(T.f&Na)!==0)if(T.f^=Na,T===u)vr(T,null,n);else{var R=_?_.next:u;T===a.effect.last&&(a.effect.last=T.prev),T.prev&&(T.prev.next=T.next),T.next&&(T.next.prev=T.prev),$a(a,_,T),$a(a,T,R),vr(T,R,n),_=T,h=[],b=[],u=ar(_.next);continue}if(T!==u){if(f!==void 0&&f.has(T)){if(h.length<b.length){var w=b[0],A;_=w.prev;var k=h[0],D=h[h.length-1];for(A=0;A<h.length;A+=1)vr(h[A],w,n);for(A=0;A<b.length;A+=1)f.delete(b[A]);$a(a,k.prev,D.next),$a(a,_,k),$a(a,D,w),u=w,_=D,M-=1,h=[],b=[]}else f.delete(T),vr(T,u,n),$a(a,T.prev,T.next),$a(a,T,_===null?a.effect.first:_.next),$a(a,_,T),_=T;continue}for(h=[],b=[];u!==null&&u!==T;)(f??(f=new Set)).add(u),b.push(u),u=ar(u.next);if(u===null)continue}(T.f&Na)===0&&h.push(T),_=T,u=ar(T.next)}if(a.outrogroups!==null){for(const H of a.outrogroups)H.pending.size===0&&(vs(a,_o(H.done)),(F=a.outrogroups)==null||F.delete(H));a.outrogroups.size===0&&(a.outrogroups=null)}if(u!==null||f!==void 0){var Y=[];if(f!==void 0)for(T of f)(T.f&Zt)===0&&Y.push(T);for(;u!==null;)(u.f&Zt)===0&&u!==a.fallback&&Y.push(u),u=ar(u.next);var he=Y.length;if(he>0){var le=(r&rl)!==0&&l===0?n:null;if(c){for(M=0;M<he;M+=1)(re=(L=Y[M].nodes)==null?void 0:L.a)==null||re.measure();for(M=0;M<he;M+=1)(ye=(be=Y[M].nodes)==null?void 0:be.a)==null||ye.fix()}gu(a,Y,le)}}c&&ja(()=>{var H,ce;if(g!==void 0)for(T of g)(ce=(H=T.nodes)==null?void 0:H.a)==null||ce.apply()})}function bu(a,t,n,r,o,c,l,i){var u=(l&cd)!==0?(l&vd)===0?Yd(n,!1,!1):nn(n):null,f=(l&dd)!==0?nn(o):null;return{v:u,i:f,e:Xt(()=>(c(t,u??n,f??o,i),()=>{a.delete(r)}))}}function vr(a,t,n){if(a.nodes)for(var r=a.nodes.start,o=a.nodes.end,c=t&&(t.f&Na)===0?t.nodes.start:n;r!==null;){var l=Er(r);if(c.before(r),r===o)return;r=l}}function $a(a,t,n){t===null?a.effect.first=n:t.next=n,n===null?a.effect.last=t:n.prev=t}function Je(a,t,n,r,o){var i;var c=(i=t.$$slots)==null?void 0:i[n],l=!1;c===!0&&(c=t.children,l=!0),c===void 0||c(a,l?()=>r:r)}function jr(a,t,n){var r=new Rs(a);Xn(()=>{var o=t()??null;r.ensure(o,o&&(c=>n(c,o)))},an)}function yu(a,t,n,r,o,c){var l=null,i=a,u=new Rs(i,!1);Xn(()=>{const f=t()||null;var _=md;if(f===null){u.ensure(null,null);return}return u.ensure(f,g=>{if(f){if(l=El(f,_),Sn(l,l),r){var h=null,b=l.appendChild(Ma());r(l,b),h==null||h.remove()}st.nodes.end=l,g.before(l)}}),()=>{}},an),go(()=>{})}function Fr(a,t){var n;n=document.head.appendChild(Ma());try{Xn(()=>{var r=Xt(()=>t(n));r.f|=tl})}finally{}}function ku(a,t){var n=void 0,r;jl(()=>{n!==(n=t())&&(r&&(Gt(r),r=null),n&&(r=Xt(()=>{mo(()=>n(a))})))})}function Vl(a){var t,n,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var o=a.length;for(t=0;t<o;t++)a[t]&&(n=Vl(a[t]))&&(r&&(r+=" "),r+=n)}else for(n in a)a[n]&&(r&&(r+=" "),r+=n);return r}function wu(){for(var a,t,n=0,r="",o=arguments.length;n<o;n++)(a=arguments[n])&&(t=Vl(a))&&(r&&(r+=" "),r+=t);return r}function xu(a){return typeof a=="object"?wu(a):a??""}const ui=[...` 	
\r\f \v\uFEFF`];function Su(a,t,n){var r=a==null?"":""+a;if(t&&(r=r?r+" "+t:t),n){for(var o of Object.keys(n))if(n[o])r=r?r+" "+o:o;else if(r.length)for(var c=o.length,l=0;(l=r.indexOf(o,l))>=0;){var i=l+c;(l===0||ui.includes(r[l-1]))&&(i===r.length||ui.includes(r[i]))?r=(l===0?"":r.substring(0,l))+r.substring(i+1):l=i}}return r===""?null:r}function vi(a,t=!1){var n=t?" !important;":";",r="";for(var o of Object.keys(a)){var c=a[o];c!=null&&c!==""&&(r+=" "+o+": "+c+n)}return r}function Fo(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function Tu(a,t){if(t){var n="",r,o;if(Array.isArray(t)?(r=t[0],o=t[1]):r=t,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,l=0,i=!1,u=[];r&&u.push(...Object.keys(r).map(Fo)),o&&u.push(...Object.keys(o).map(Fo));var f=0,_=-1;const S=a.length;for(var g=0;g<S;g++){var h=a[g];if(i?h==="/"&&a[g-1]==="*"&&(i=!1):c?c===h&&(c=!1):h==="/"&&a[g+1]==="*"?i=!0:h==='"'||h==="'"?c=h:h==="("?l++:h===")"&&l--,!i&&c===!1&&l===0){if(h===":"&&_===-1)_=g;else if(h===";"||g===S-1){if(_!==-1){var b=Fo(a.substring(f,_).trim());if(!u.includes(b)){h!==";"&&g++;var x=a.substring(f,g).trim();n+=" "+x+";"}}f=g+1,_=-1}}}}return r&&(n+=vi(r)),o&&(n+=vi(o,!0)),n=n.trim(),n===""?null:n}return a==null?null:String(a)}function Ge(a,t,n,r,o,c){var l=a[Zo];if(l!==n||l===void 0){var i=Su(n,r,c);i==null?a.removeAttribute("class"):t?a.className=i:a.setAttribute("class",i),a[Zo]=n}else if(c&&o!==c)for(var u in c){var f=!!c[u];(o==null||f!==!!o[u])&&a.classList.toggle(u,f)}return c}function Ao(a,t={},n,r){for(var o in n){var c=n[o];t[o]!==c&&(n[o]==null?a.style.removeProperty(o):a.style.setProperty(o,c,r))}}function Rt(a,t,n,r){var o=a[es];if(o!==t){var c=Tu(t,r);c==null?a.removeAttribute("style"):a.style.cssText=c,a[es]=t}else r&&(Array.isArray(r)?(Ao(a,n==null?void 0:n[0],r[0]),Ao(a,n==null?void 0:n[1],r[1],"important")):Ao(a,n,r));return r}function At(a,t,n=!1){if(a.multiple){if(t==null)return;if(!Ss(t))return kd();for(var r of a.options)r.selected=t.includes(pr(r));return}for(r of a.options){var o=pr(r);if(Vd(o,t)){r.selected=!0;return}}(!n||t!==void 0)&&(a.selectedIndex=-1)}function Bt(a){var t=new MutationObserver(()=>{"__value"in a&&At(a,a.__value)});t.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),go(()=>{t.disconnect()})}function ao(a,t,n=t){var r=new WeakSet,o=!0;hl(a,"change",c=>{var l=c?"[selected]":":checked",i;if(a.multiple)i=[].map.call(a.querySelectorAll(l),pr);else{var u=a.querySelector(l)??a.querySelector("option:not([disabled])");i=u&&pr(u)}n(i),a.__value=i,Re!==null&&r.add(Re)}),mo(()=>{var c=t();if(a===document.activeElement){var l=Re;if(r.has(l))return}if(At(a,c,o),o&&c===void 0){var i=a.querySelector(":checked");i!==null&&(c=pr(i),n(c))}a.__value=c,o=!1}),Bt(a)}function pr(a){return"__value"in a?a.__value:a.value}const nr=Symbol("class"),rr=Symbol("style"),Kl=Symbol("is custom element"),$l=Symbol("is html"),Du=po?"input":"INPUT",Pu=po?"option":"OPTION",Mu=po?"select":"SELECT",Eu=po?"progress":"PROGRESS";function no(a,t){var n=bo(a);n.value===(n.value=t??void 0)||a.value===t&&(t!==0||a.nodeName!==Eu)||(a.value=t??"")}function Jl(a,t){var n=bo(a);n.checked!==(n.checked=t??void 0)&&(a.checked=t)}function Cu(a,t){t?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function I(a,t,n,r){var o=bo(a);o[t]!==(o[t]=n)&&(t==="loading"&&(a[Jc]=n),n==null?a.removeAttribute(t):typeof n!="string"&&Ql(a).includes(t)?a[t]=n:a.setAttribute(t,n))}function Nu(a,t,n,r,o=!1,c=!1){var l=bo(a),i=l[Kl],u=!l[$l],f=t||{},_=a.nodeName===Pu;for(var g in t)g in n||(n[g]=null);n.class?n.class=xu(n.class):n[nr]&&(n.class=null),n[rr]&&(n.style??(n.style=null));var h=Ql(a);if(a.nodeName===Du&&"type"in n&&("value"in n||"__value"in n)){var b=n.type;(b!==f.type||b===void 0&&a.hasAttribute("type"))&&(f.type=b,I(a,"type",b))}for(const k in n){let D=n[k];if(_&&k==="value"&&D==null){a.value=a.__value="",f[k]=D;continue}if(k==="class"){var x=a.namespaceURI==="http://www.w3.org/1999/xhtml";Ge(a,x,D,r,t==null?void 0:t[nr],n[nr]),f[k]=D,f[nr]=n[nr];continue}if(k==="style"){Rt(a,D,t==null?void 0:t[rr],n[rr]),f[k]=D,f[rr]=n[rr];continue}var S=f[k];if(!(D===S&&!(D===void 0&&a.hasAttribute(k)))){f[k]=D;var T=k[0]+k[1];if(T!=="$$")if(T==="on"){const Y={},he="$$"+k;let le=k.slice(2);var M=iu(le);if(ou(le)&&(le=le.slice(0,-7),Y.capture=!0),!M&&S){if(D!=null)continue;a.removeEventListener(le,f[he],Y),f[he]=null}if(M)W(le,a,D),yt([le]);else if(D!=null){let ne=function(Z){f[k].call(this,Z)};var A=ne;f[he]=Yl(le,a,ne,Y)}}else if(k==="style")I(a,k,D);else if(k==="autofocus")gn(a,!!D);else if(!i&&(k==="__value"||k==="value"&&D!=null))a.value=a.__value=D;else if(k==="selected"&&_)Cu(a,D);else{var R=k;u||(R=cu(R));var w=R==="defaultValue"||R==="defaultChecked";if(D==null&&!i&&!w)if(l[k]=null,R==="value"||R==="checked"){let Y=a;const he=t===void 0;if(R==="value"){let le=Y.defaultValue;Y.removeAttribute(R),Y.defaultValue=le,Y.value=Y.__value=he?le:null}else{let le=Y.defaultChecked;Y.removeAttribute(R),Y.defaultChecked=le,Y.checked=he?le:!1}}else a.removeAttribute(k);else w||h.includes(R)&&(i||typeof D!="string")?(a[R]=D,R in l&&(l[R]=It)):typeof D!="function"&&I(a,R,D)}}}return f}function fi(a,t,n=[],r=[],o=[],c,l=!1,i=!1){Ms(o,n,r,u=>{var f=void 0,_={},g=a.nodeName===Mu,h=!1;if(jl(()=>{var x=t(...u.map(e)),S=Nu(a,f,x,c,l,i);h&&g&&"value"in x&&At(a,x.value);for(let M of Object.getOwnPropertySymbols(_))x[M]||Gt(_[M]);for(let M of Object.getOwnPropertySymbols(x)){var T=x[M];M.description===bd&&(!f||T!==f[M])&&(_[M]&&Gt(_[M]),_[M]=Xt(()=>ku(a,()=>T))),S[M]=T}f=S}),g){var b=a;mo(()=>{At(b,f.value,!0),Bt(b)})}h=!0})}function bo(a){return a[zr]??(a[zr]={[Kl]:a.nodeName.includes("-"),[$l]:a.namespaceURI===il})}var hi=new Map;function Ql(a){var t=a.getAttribute("is")||a.nodeName,n=hi.get(t);if(n)return n;hi.set(t,n=[]);for(var r,o=a,c=Element.prototype;c!==o;){r=Xi(o);for(var l in r)r[l].set&&l!=="innerHTML"&&l!=="textContent"&&l!=="innerText"&&n.push(l);o=Ts(o)}return n}function wt(a,t,n=t){var r=new WeakSet;hl(a,"input",async o=>{var c=o?a.defaultValue:a.value;if(c=Io(a)?qo(c):c,n(c),Re!==null&&r.add(Re),await ru(),c!==(c=t())){var l=a.selectionStart,i=a.selectionEnd,u=a.value.length;if(a.value=c??"",i!==null){var f=a.value.length;l===i&&i===u&&f>u?(a.selectionStart=f,a.selectionEnd=f):(a.selectionStart=l,a.selectionEnd=Math.min(i,f))}}}),Vt(t)==null&&a.value&&(n(Io(a)?qo(a.value):a.value),Re!==null&&r.add(Re)),As(()=>{var o=t();if(a===document.activeElement){var c=Re;if(r.has(c))return}Io(a)&&o===qo(a.value)||a.type==="date"&&!o&&!a.value||o!==a.value&&(a.value=o??"")})}function Io(a){var t=a.type;return t==="number"||t==="range"}function qo(a){return a===""?null:+a}function Ro(a,t){return a===t||(a==null?void 0:a[Aa])===t}function ju(a={},t,n,r){var o=Et.r,c=st;return mo(()=>{var l,i;return As(()=>{l=i,i=[],Vt(()=>{Ro(n(...i),a)||(t(a,...i),l&&Ro(n(...l),a)&&t(null,...l))})}),()=>{let u=c;for(;u!==o&&u.parent!==null&&u.parent.f&Xo;)u=u.parent;const f=()=>{i&&Ro(n(...i),a)&&t(null,...i)},_=u.teardown;u.teardown=()=>{f(),_==null||_()}}}),a}function Fu(a=!1){const t=Et,n=t.l.u;if(!n)return;let r=()=>sn(t.s);if(a){let o=0,c={};const l=Bn(()=>{let i=!1;const u=t.s;for(const f in u)u[f]!==c[f]&&(c[f]=u[f],i=!0);return i&&o++,o});r=()=>e(l)}n.b.length&&Qd(()=>{_i(t,r),Jo(n.b)}),St(()=>{const o=Vt(()=>n.m.map($c));return()=>{for(const c of o)typeof c=="function"&&c()}}),n.a.length&&St(()=>{_i(t,r),Jo(n.a)})}function _i(a,t){if(a.l.s)for(const n of a.l.s)e(n);t()}const Au={get(a,t){if(!a.exclude.includes(t))return e(a.version),t in a.special?a.special[t]():a.props[t]},set(a,t,n){if(!(t in a.special)){var r=st;try{ya(a.parent_effect),a.special[t]=pa({get[t](){return a.props[t]}},t,ol)}finally{ya(r)}}return a.special[t](n),ri(a.version),!0},getOwnPropertyDescriptor(a,t){if(!a.exclude.includes(t)&&t in a.props)return{enumerable:!0,configurable:!0,value:a.props[t]}},deleteProperty(a,t){return a.exclude.includes(t)||(a.exclude.push(t),ri(a.version)),!0},has(a,t){return a.exclude.includes(t)?!1:t in a.props},ownKeys(a){return Reflect.ownKeys(a.props).filter(t=>!a.exclude.includes(t))}};function Ke(a,t){return new Proxy({props:a,exclude:t,special:{},version:nn(0),parent_effect:st},Au)}const Iu={get(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(tr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(a,t,n){let r=a.props.length;for(;r--;){let o=a.props[r];tr(o)&&(o=o());const c=en(o,t);if(c&&c.set)return c.set(n),!0}return!1},getOwnPropertyDescriptor(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(tr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const o=en(r,t);return o&&!o.configurable&&(o.configurable=!0),o}}},has(a,t){if(t===Aa||t===nl)return!1;for(let n of a.props)if(tr(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(a){const t=[];for(let n of a.props)if(tr(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function Xe(...a){return new Proxy({props:a},Iu)}function pa(a,t,n,r){var A;var o=!$n||(n&hd)!==0,c=(n&_d)!==0,l=(n&pd)!==0,i=r,u=!0,f=void 0,_=()=>l&&o?(f??(f=Bn(r)),e(f)):(u&&(u=!1,i=l?Vt(r):r),i);let g;if(c){var h=Aa in a||nl in a;g=((A=en(a,t))==null?void 0:A.set)??(h&&t in a?k=>a[t]=k:void 0)}var b,x=!1;c?[b,x]=Md(()=>a[t]):b=a[t],b===void 0&&r!==void 0&&(b=_(),g&&(o&&rd(),g(b)));var S;if(o?S=()=>{var k=a[t];return k===void 0?_():(u=!0,k)}:S=()=>{var k=a[t];return k!==void 0&&(i=void 0),k===void 0?i:k},o&&(n&ol)===0)return S;if(g){var T=a.$$legacy;return(function(k,D){return arguments.length>0?((!o||!D||T||x)&&g(D?S():k),k):S()})}var M=!1,R=((n&fd)!==0?Bn:Es)(()=>(M=!1,S()));c&&e(R);var w=st;return(function(k,D){if(arguments.length>0){const Y=D?e(R):o&&c?ze(k):k;return v(R,Y),M=!0,i!==void 0&&(i=Y),k}return Wa&&M||(w.f&ca)!==0?R.v:e(R)})}function rn(a){Et===null&&Qc(),$n&&Et.l!==null?qu(Et).m.push(a):St(()=>{const t=Vt(a);if(typeof t=="function")return t})}function qu(a){var t=a.l;return t.u??(t.u={a:[],b:[],m:[]})}const Ru="modulepreload",Lu=function(a){return"/"+a},pi={},Ou=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let l=function(f){return Promise.all(f.map(_=>Promise.resolve(_).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=l(n.map(f=>{if(f=Lu(f),f in pi)return;pi[f]=!0;const _=f.endsWith(".css"),g=_?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${g}`))return;const h=document.createElement("link");if(h.rel=_?"stylesheet":Ru,_||(h.as="script"),h.crossOrigin="",h.href=f,u&&h.setAttribute("nonce",u),document.head.appendChild(h),_)return new Promise((b,x)=>{h.addEventListener("load",b),h.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${f}`)))})}))}function c(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return o.then(l=>{for(const i of l||[])i.status==="rejected"&&c(i.reason);return t().catch(c)})},Bu="5";var Ji;typeof window<"u"&&((Ji=window.__svelte??(window.__svelte={})).v??(Ji.v=new Set)).add(Bu);Td();/**
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
 */const zu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const Hu=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const gi=(...a)=>a.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var Uu=Dn("<svg><!><!></svg>");function Ze(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]),r=Ke(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);ut(t,!1);let o=pa(t,"name",8,void 0),c=pa(t,"color",8,"currentColor"),l=pa(t,"size",8,24),i=pa(t,"strokeWidth",8,2),u=pa(t,"absoluteStrokeWidth",8,!1),f=pa(t,"iconNode",24,()=>[]);Fu();var _=Uu();fi(_,(b,x,S)=>({...zu,...b,...r,width:l(),height:l(),stroke:c(),"stroke-width":x,class:S}),[()=>Hu(r)?void 0:{"aria-hidden":"true"},()=>(sn(u()),sn(i()),sn(l()),Vt(()=>u()?Number(i())*24/Number(l()):i())),()=>(sn(gi),sn(o()),sn(n),Vt(()=>gi("lucide-icon","lucide",o()?`lucide-${o()}`:"",n.class)))]);var g=s(_);je(g,1,f,Ha,(b,x)=>{var S=j(()=>el(e(x),2));let T=()=>e(S)[0],M=()=>e(S)[1];var R=Oe(),w=Fe(R);yu(w,T,!0,(A,k)=>{fi(A,()=>({...M()}))}),m(b,R)});var h=d(g);Je(h,t,"default",{}),m(a,_),vt()}function mi(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];Ze(a,Xe({name:"award"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Wu(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];Ze(a,Xe({name:"bell"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Yu(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];Ze(a,Xe({name:"book-open"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Gu(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];Ze(a,Xe({name:"calendar-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Xl(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];Ze(a,Xe({name:"calendar-days"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Vu(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];Ze(a,Xe({name:"calendar-range"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Ls(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];Ze(a,Xe({name:"chart-column"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function za(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];Ze(a,Xe({name:"check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Un(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];Ze(a,Xe({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Ku(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15 18-6-6 6-6"}]];Ze(a,Xe({name:"chevron-left"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Wn(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];Ze(a,Xe({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function fs(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];Ze(a,Xe({name:"circle-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Zl(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];Ze(a,Xe({name:"circle-question-mark"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function br(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];Ze(a,Xe({name:"clock"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function $u(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];Ze(a,Xe({name:"download"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Ju(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];Ze(a,Xe({name:"ellipsis-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Qu(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];Ze(a,Xe({name:"flame"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Xu(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];Ze(a,Xe({name:"folder"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Zu(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];Ze(a,Xe({name:"grip-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ev(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]];Ze(a,Xe({name:"languages"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ec(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["rect",{x:"3",y:"4",width:"6",height:"6",rx:"1"}]];Ze(a,Xe({name:"list-todo"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function tv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];Ze(a,Xe({name:"mail"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function av(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];Ze(a,Xe({name:"palette"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function nv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];Ze(a,Xe({name:"pause"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Os(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];Ze(a,Xe({name:"pencil"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ro(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];Ze(a,Xe({name:"play"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Yn(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];Ze(a,Xe({name:"plus"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function tc(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];Ze(a,Xe({name:"quote"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function rv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];Ze(a,Xe({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ov(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];Ze(a,Xe({name:"rotate-ccw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function sv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]];Ze(a,Xe({name:"save"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function iv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];Ze(a,Xe({name:"search"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function lv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];Ze(a,Xe({name:"settings"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function cv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 4v16"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]];Ze(a,Xe({name:"skip-forward"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function dv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];Ze(a,Xe({name:"square"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function uv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Ze(a,Xe({name:"sun"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function vv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];Ze(a,Xe({name:"sunrise"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function fv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];Ze(a,Xe({name:"tag"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function hs(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];Ze(a,Xe({name:"target"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function yo(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Ze(a,Xe({name:"trash-2"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Lo(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];Ze(a,Xe({name:"trending-up"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function hv(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Ze(a,Xe({name:"upload"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function _v(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]];Ze(a,Xe({name:"user-round"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ac(a,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Ze(a,Xe({name:"x"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Oe(),i=Fe(l);Je(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}const pv="/timer";function nc(){const a=window.location.hash,t=a.startsWith("#")?a.slice(1):a;return!t||t==="/"?pv:t}let Bs=z(ze(nc())),bi=!1;function gv(){bi||typeof window>"u"||(bi=!0,window.addEventListener("hashchange",()=>{v(Bs,nc(),!0)}))}gv();function mv(){return e(Bs)}function rc(a){if(window.location.hash===`#${a}`){v(Bs,a,!0);return}window.location.hash=a}const bv=[{path:"/timer",labelKey:"timer"},{path:"/tasks",labelKey:"tasks"},{path:"/stats",labelKey:"stats"},{path:"/settings",labelKey:"settings"},{path:"/help",labelKey:"help"}],yv={page:{timer:"番茄钟 - PomoFlow",tasks:"任务 - PomoFlow",stats:"统计 - PomoFlow",settings:"配置 - PomoFlow"},nav:{timer:"番茄钟",tasks:"任务清单",stats:"统计",settings:"配置",help:"帮助与反馈",mainNav:"主导航"},mode:{focus:"专注",shortBreak:"短休息",longBreak:"长休息",focusing:"专注中"},priority:{high:"高",medium:"中",low:"低",none:"无"},common:{confirm:"知道了",noData:"暂无任务",reviewPlaceholder:"写点复盘…",ariaCompleted:"已完成",ariaMarkDone:"标记完成",ariaMarkUndone:"标记为未完成",loading:"加载中...",close:"关闭",clear:"清除",add:"添加",expand:"展开",collapse:"收起"},timer:{start:"开始专注",startBreak:"开始休息啦",pause:"暂停",resume:"继续",stop:"停止",abandon:"放弃",skip:"跳过",starting:"启动中...",todayDone:"今日已完成",pomodoroUnit:"个番茄钟",pomodoros:"番茄",taskList:"任务清单",todayFocus:"今日专注",minute:"分钟",selectTask:"选择专注任务",selectTaskPlaceholder:"-- 选择任务 --",modeTabsAria:"计时器模式",noSpecificTask:"无特定任务",noTodoTask:"暂无待办任务",reviewTitle:"📝 今日日复盘",reviewPlaceholder:"记录今天的复盘…",clearFilter:"清除筛选",startTooltip:"开始专注",mottoRefresh:"换一条",modalTitle:"提示",focusCompleteTitle:"专注完成",noTask:"暂无任务",expandSubtasks:"展开子任务",collapseSubtasks:"收起子任务"},filter:{project:"项目",tag:"标签",priority:"优先级",date:"日　期",all:"全部",allProject:"全部项目",allTag:"全部标签",allPriority:"全部优先级",today:"今天",tomorrow:"明天",thisWeek:"本周",week:"本周",month:"本月",startDate:"开始日期",endDate:"结束日期",dueDate:"到期日",start:"开始",end:"结束",to:"至",export:"导出",projectAria:"项目筛选",tagAria:"标签筛选",priorityAria:"优先级筛选"},export:{index:"序号",title:"任务描述",project:"项目",priority:"优先级",dueDate:"到期日",estimated:"预计番茄数",tags:"标签",subtasks:"子任务",status:"任务状态",statusActive:"未完成",statusCompleted:"已完成",fileName:"任务清单"},task:{statEstimated:"预计时间",statActive:"待完成任务",statFocused:"已专注时间",statCompleted:"已完成任务",statCompletedPomo:"已完成番茄钟",searchResult:"搜索结果",list:"清单",task:"任务",noTask:"暂无任务",noDate:"未安排日期",unscheduled:"未安排",minute:"分钟",startTooltip:"开始专注",detailPriority:"优先级",detailPomodoro:"番茄",detailDueDate:"到期日",detailProject:"清单",detailReminder:"提醒",detailRepeat:"重复",detailNoTags:"无标签",detailEditTags:"编辑标签",detailCollapse:"收起",detailAddSubtask:"添加子任务...",subtaskEditPlaceholder:"修改子任务...",editSubtask:"编辑子任务",deleteSubtask:"删除子任务",detailAddNote:"添加备注...",detailDelete:"删除任务",detailNoProject:"无",detailNoTagsAvailable:"暂无可用标签",detailEmpty:"点击任务查看详情",detailTimeFilled:"已用当前时间补全截止时间，如需调整请在「到期日」中修改。",deleteConfirm:"删除任务「{title}」？",emptyAll:"暂无任务，添加一个开始吧",emptyFiltered:"此筛选下没有任务",groupHeader:"{date}（{weekday}）| {n} 分钟",detailPanelAria:"任务详情",titleAria:"标题",detailDescription:"描述",detailDescPlaceholder:"补充细节...",detailSubtasks:"子任务",newSubtaskAria:"新子任务",unknownProject:"未知",toggleSubtaskAria:"切换子任务完成",dblclickToEdit:"双击编辑",noTagsHint:"还没有标签，在「设置 → 标签」里创建",tagPickerAria:"标签多选",saveFailed:"保存失败：{err}",setTagsFailed:"设置标签失败：{err}",addSubtaskFailed:"添加子任务失败：{err}",updateSubtaskFailed:"更新子任务失败：{err}",deleteSubtaskFailed:"删除子任务失败：{err}"},stats:{dimToday:"今日",dimWeek:"本周",dimMonth:"本月",dimQuarter:"季度",dimHalf:"半年",dimYear:"年",focusDuration:"专注时长",sessions:"番茄数",completed:"完成任务",avg:"日均专注",activeDays:"活跃天数",longestStreak:"最长连续专注",avgWeek:"周均专注",avgMonth:"月均专注",peakMonth:"高峰月",peakPeriod:"高峰期",bestProject:"最佳项目",momRatio:"环比上期",trendTitle:"专注趋势",projectDist:"项目时间分布",noData:"该维度暂无专注数据",noProject:"暂无项目数据",unitMin:"分钟",unitCount:"个",unitDay:"天",byDay:"日",byWeek:"周",byMonth:"月",weeklyFocusTitle:"本周专注时长（分钟）",loading:"统计加载中...",loadError:"统计加载失败：{err}",trendChartAria:"专注趋势柱状图",donutChartAria:"项目时间分布环形图"},enum:{reminder:{"":"不提醒",on_time:"准时","5m":"提前 5 分钟","30m":"提前 30 分钟","1h":"提前 1 小时","1d":"提前 1 天","2d":"提前 2 天"},repeat:{"":"不重复",daily:"每天",weekday:"每个工作日",weekly:"每周",monthly:"每月",yearly:"每年",custom:"自定义"},weekday:["周日","周一","周二","周三","周四","周五","周六"]},settings:{tab:{account:"账号",timer:"番茄钟",lists:"清单管理",tags:"标签管理",theme:"主题背景",motto:"名言警句",notification:"通知文案",language:"中英切换"},language:{title:"界面语言",desc:"选择系统的显示语言，切换后所有页面文字随之变化",zh:"中文",en:"英文"},timerTitle:"番茄钟",timerParams:"番茄钟参数",durationSetting:"时长设置",behaviorSetting:"行为偏好",focusDuration:"番茄时长",shortBreakDuration:"短时休息",longBreakDuration:"长时休息",longBreakInterval:"长时休息间隔",longBreakIntervalEvery:"长休息间隔（每 N 个专注）",minute:"分钟",pomodoroUnit:"个番茄",autoStartNext:"自动开始下个番茄",autoStartNextDesc:"完成一个番茄后立即开始下一个",autoStartBreak:"自动开始休息",autoStartBreakDesc:"番茄完成后自动进入休息时段",autoEnterBreak:"专注完成后自动进入休息",disableBreak:"禁用休息",disableBreakDesc:"开启后将跳过所有休息时段",soundEnabled:"完成提示音",systemNotification:"系统通知",reset:"恢复默认",accountNotOpen:"该功能暂未开放",systemSection:"系统能力",autostart:"开机自启动",autostartHint:"OS 启动时自动运行 PomoFlow（静默启动，常驻托盘）",on:"已开启",off:"已关闭",notifTest:"系统通知测试",notifTestHint:"发送一条测试通知，验证系统通知链路是否通",sendTest:"发送测试",trayHint:"💡 关闭主窗口时 PomoFlow 会驻留在系统托盘，右键托盘图标可『显示窗口 / 退出』。",autostartFail:"自启动切换失败：{err}",notifPermDenied:"通知权限未授予，无法发送",notifSendFail:"通知失败：{err}",testNotifTitle:"PomoFlow 测试通知",testNotifBody:"当前 active 任务数：{n}",theme:{title:"主题背景",desc:"上方选主题决定主色（按钮、进度环、导航指示），下方选背景图可单独替换背景层——两者互不影响。",preset:"预设主题",presetBg:"预设背景",presetBgHint:"点选 8 张之一即可换背景；主色仍由上方所选主题决定。",presetBgName:{"preset-bg-1":"预设 1","preset-bg-2":"预设 2","preset-bg-3":"预设 3","preset-bg-4":"预设 4","preset-bg-5":"预设 5","preset-bg-6":"预设 6","preset-bg-7":"预设 7","preset-bg-8":"预设 8"},custom:"自定义背景",upload:"上传图片",customUsed:"已使用自定义背景",bgUsed:"已使用自定义背景图",presetBgUsed:"已使用预设背景",clearBg:"移除背景图",customHint:"支持 JPG/PNG，大图会自动压缩；上传图片会覆盖预设背景，主色仍由所选主题决定。",reset:"恢复默认",compressFail:"图片处理失败，请换一张",bgTooLarge:"背景图片过大，无法持久保存。本次使用有效，但刷新后需重新设置。",presetName:{default:"默认",sunny:"暖阳",ocean:"海洋",forest:"森林",dusk:"黄昏",lavender:"薰衣草",evening:"暮色",teal:"青石"}},motto:{title:"名言警句",addPlaceholder:"输入名言…",authorPlaceholder:"作者（可选）",addBtn:"添加",empty:"暂未添加自定义名言。番茄钟页面将轮播内置名言。",builtInBadge:"内置",defaultAuthor:"自定义",textRequired:"请输入名言内容",textTooLong:"名言不能超过 500 字",authorTooLong:"作者不能超过 64 字"},notification:{title:"通知文案",styleLabel:"提示风格",styleHintCustom:"自定义风格：填写下方文案 + 风格描述",styleHintPreset:"预设风格文案跟随界面语言自动切换；如需自定义文案请选择「自定义风格」。",styleDesc:"风格描述",styleDescPlaceholder:"如：霸气总裁风、文艺青年风…",focusEnd:"🍅 专注结束",breakEnd:"☕ 休息结束",reminder:"🔔 任务到期提醒",titleLabel:"标题",bodyLabel:"正文",placeholderHint:"用 {task_title} 作为任务名占位符，触发时自动替换",save:"保存",saved:"✓ 已保存",styleName:{default:"默认",cute:"卡哇伊",self_dep:"自嘲",strive:"奋斗",funny:"搞笑",custom:"自定义风格"},fallback:{focusTitle:"专注结束",focusBody:"番茄钟结束了，休息一下吧",breakTitle:"休息结束",breakBody:"休息结束，满满的能量开启新的任务专注。"}},repeatCustom:{title:"自定义重复",startDate:"开始日期",endDate:"结束日期",interval:"重复间隔（0~99）",type:"重复类型",typeDay:"日",typeWeek:"周",typeMonth:"月",typeYear:"年",weekdays:"重复在星期几（可多选）",monthDays:"重复在当月几日（可多选）",weekShort:["一","二","三","四","五","六","日"],needPickWeek:"请至少选择一个星期",needPickDay:"请至少选择一个日期",cancel:"取消",confirm:"确定"},list:{title:"清单管理",addRootPlaceholder:"一级清单名称",addRoot:"添加一级清单",addChild:"添加子清单",edit:"修改",del:"删除",level2Placeholder:"二级清单名称",level3Placeholder:"三级清单名称",empty:"暂无清单",dragHint:"按住拖动以重排或改变层级",reorderFail:"拖拽排序失败，请重试",reorderFailDepth:"层级过深，无法移动到此处",reorderFailCycle:"无法移动到当前位置（会形成循环）"},tag:{namePlaceholder:"输入新标签名称",add:"添加标签",colorLabel:"选择颜色：",colorAria:"颜色 {color}",nameLabel:"名称",empty:"暂无标签，请添加一个",dragHandle:"拖动以重排"}},form:{placeholder:"在此输入”任务描述”添加新任务，按「回车」键保存",titlePlaceholder:"任务标题...",pomodoroIcons:"预计番茄钟数",pomodoroUnit:"个番茄钟",more:"更多",collapse:"收起",submit:"提交",estimatedPomo:"预计番茄数",needTitle:"请输入任务名称",needTimeForReminder:"设置了提醒，请在到期日中选择具体时间（时分）",addFailed:"添加失败"},sidebar:{searchPlaceholder:"搜索",searchTasksPlaceholder:"搜索任务标题...",planned:"已计划",completed:"已完成",journal:"手账模式",emptyHint:"暂无清单，点击 + 添加",addRootAria:"新增根清单",addListTitle:"新增清单",listNamePlaceholder:"清单名称...",moreActions:"更多操作",deleteListConfirm:"删除此清单？子清单会一并删除"},journal:{monthTitle:"{year} 年 {month} 月",yearOption:"{year} 年",monthOption:"{month} 月",prevMonth:"上一月",nextMonth:"下一月",yearAria:"年份",monthAria:"月份",weekRange:"第 {n} 周（{ms}/{ds} ~ {me}/{de}）",weekday:["周一","周二","周三","周四","周五","周六","周日"],dailyReviewPlaceholder:"日复盘",weeklyReview:"📋 周复盘",weeklyReviewPlaceholder:"本周复盘"},monthPanel:{title:"{year}年{month}月 · 复盘",weeklyReadonly:"周复盘（只读 · 在手账模式每周区块内编辑）",weekRange:"第 {n} 周（周一起 {date}）",empty:"（空）",monthlyReview:"📋 月度复盘",monthlyPlaceholder:"本月总结…"},help:{tab:{manual:"用户手册",faq:"常见问题",contact:"联系我们"},manual:{timer:{title:"🍅 番茄钟",items:[{text:"选择一个任务后点击「开始」，进入专注计时。专注结束后自动切换到休息模式。"},{text:"三种模式：「专注」（默认 25 分钟，可自定义）/「短休息」（默认 5 分钟）/「长休息」（默认 15 分钟，每 N 个番茄触发一次）。"},{text:"专注结束时弹出系统通知 + 模态框提示（文案可在「配置 → 通知文案」中自定义风格）。"},{text:"可开启「自动开始休息」「自动开始下个番茄」，专注结束后无需手动操作。"},{text:"计时器到点后即使切到其他页面，通知和自动衔接也会正常触发。"},{text:"右侧显示当月任务清单，支持按项目、标签、优先级、日期筛选。"},{text:"专注下方有「今日日复盘」文本框和「座右铭」卡片（可点换一条）。"}]},tasks:{title:"📋 任务清单",items:[{text:"左侧栏切换视图：今天 / 明天 / 本周 / 已计划 / 已完成 / 手账模式。"},{text:"「已计划」页支持按项目、标签、优先级、本周、本月、到期日范围筛选。"},{text:"任务支持：标题、备注、优先级（高/中/低/无）、到期日（含时分）、预计番茄数、番茄时长、提醒、重复。"},{text:"清单（项目）支持嵌套（最多 3 级）、自定义颜色。标签支持多对多、12 种预设色。"},{text:"子任务（Checklist）：每个任务可添加多个子任务，独立勾选完成。"},{text:"点击任务可展开右侧详情面板，直接编辑标题、到期日、优先级、提醒、重复、标签、子任务、备注。"}]},reminder:{title:"🔔 任务提醒",items:[{text:"设置提醒后，到达提醒时间点（到期日减去提前量）会弹出浏览器系统通知。"},{text:"提醒选项：准时 / 提前 5 分钟 / 30 分钟 / 1 小时 / 1 天 / 2 天。"},{text:"专注期间不弹提醒，专注结束后自动补弹（避免打断专注）。"},{text:"同一提醒只弹一次，不会重复打扰。"},{text:"设置提醒时必须填写到期日的时间（时分），否则会提示补全。"}]},repeat:{title:"🔁 任务重复",items:[{text:"内置规则：每天 / 工作日 / 每周 / 每月 / 每年。设置后自动预生成重复实例（上限 50 个）。"},{text:"「自定义」：可选重复间隔（0~99）、类型（日/周/月/年）。",sub:"间隔 0 = 每周期都重复；间隔 1 = 每隔 1 个周期（跳过 1 个）；间隔 N = 每隔 N 个周期。"},{text:"类型为「周」可选星期几（一~日多选）；类型为「月」可选当月几日（多选）。"},{text:"修改重复规则时，旧的未完成实例会自动删除并按新规则重新生成。"},{text:"每个重复实例会完整复制原任务的标签、子任务、备注、优先级、番茄数。"}]},journal:{title:"📔 手账模式",items:[{text:"月级视图，按自然周分组（周一~周日），每周内按 3+3+1 分行展示。"},{text:"每天方块显示当日任务（方形复选框可切完成）+ 日复盘文本框。"},{text:"每周底部有周复盘文本框。右侧面板展示当月各周复盘（只读）+ 月度复盘（可编辑）。"},{text:"支持上一月/下一月 + 年/月下拉切换。"},{text:"番茄钟页面的「今日日复盘」与手账模式当天的日复盘数据同步。"}]},stats:{title:"📊 统计报表",items:[{text:"6 种维度切换：今日 / 本周 / 本月 / 季度 / 半年 / 年。"},{text:"通用 4 卡：专注时长、番茄数、完成任务、日均专注。"},{text:"维度越长亮点越多：活跃天数、最长连续专注、周/月均、高峰期、最佳项目、环比上期。"},{text:"趋势柱状图（按日/周/月自动切换粒度）+ 圆环图（项目时间分布），全部跟随当前主题主色（accent）统一配色，告别五颜六色。"}]},settings:{title:"⚙️ 配置",items:[{text:"「番茄钟」：专注/休息时长、长时休息间隔（2~6 个番茄）、自动开始选项。"},{text:"「清单管理」：添加/修改/删除项目（嵌套 3 级）、自定义颜色。"},{text:"「标签管理」：添加/修改/删除标签、12 种预设色。"},{text:"「主题背景」：8 种预设主题（默认/暖阳/海洋/森林/黄昏/薰衣草/暮色/青石），各含专属背景渐变与配套主色；亦可自定义上传图片（自动压缩），所有页面统一半透明蒙层淡化背景、避免刺眼。"},{text:"「名言警句」：管理自定义座右铭（存数据库，番茄钟页轮播展示）。"},{text:"「通知文案」：6 种风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），分别配置专注结束/休息结束/任务提醒的标题和正文。"}]}},faq:{items:[{q:"数据保存在哪里？会丢失吗？",a:"所有数据（任务、番茄记录、复盘、名言、通知文案、主题设置）保存在本地 SQLite 数据库（pomoflow.db）和浏览器 localStorage 中，无需联网。升级版本时数据库会自动迁移，旧数据完整保留。建议定期备份 pomoflow.db 文件。"},{q:"如何修改番茄时长和长时休息间隔？",a:"进入「配置」→「番茄钟」，在「番茄时长」「短时休息」「长时休息」下拉框中选择分钟数（1~90 分钟可选）。长时休息间隔可选 2~6 个番茄（即每完成几个番茄触发一次长休息）。"},{q:"为什么专注期间不弹任务提醒？",a:"这是设计行为。专注期间系统会抑制所有任务提醒，避免打断你的专注。专注结束后会自动补弹被跳过的提醒。"},{q:"任务提醒不弹通知怎么办？",a:"首次使用时浏览器会请求通知权限，需要点击「允许」。如果之前拒绝了，可在浏览器地址栏左侧的设置图标中重新允许通知。另外，提醒需要任务设置了「到期日+具体时间（时分）」和「提醒选项」才会触发。"},{q:"自定义重复的间隔 0 和间隔 1 有什么区别？",a:"间隔 0 = 每个周期都重复（如每天都出现）。间隔 1 = 每隔 1 个周期（如第 1 周、第 3 周、第 5 周，跳过第 2、4 周）。间隔 N = 跳过 N 个周期后再重复。"},{q:"手账模式的周复盘和月度复盘在哪里编辑？",a:"周复盘在每周区块底部的文本框直接编辑（失焦自动保存）。月度复盘在右侧面板的「📋 月度复盘」文本框编辑。左侧编辑后右侧面板会自动刷新。"},{q:"自定义名言存在哪里？刷新会丢失吗？",a:"自定义名言存在数据库（pomoflow.db）中，刷新页面不会丢失。内置的 50 条名言是程序自带的。番茄钟页面的名言卡片优先轮播自定义名言（逐条不重复），轮完一轮后重新开始。"},{q:"切换页面后专注还在计时吗？自动休息还会触发吗？",a:"是的。计时器和所有自动逻辑（自动开始休息、自动开始下个番茄、专注完成通知）都在全局状态中，切到任务清单/统计/配置等页面不影响。专注到点会正常通知和衔接。"},{q:"主题背景上传的图片太大怎么办？",a:"上传图片会自动压缩（缩放到 1920px 宽、JPEG 0.8 质量），不会撑爆存储。如果图片仍然过大导致无法持久保存，会弹出提示告知你刷新后需重新设置。"},{q:"通知文案可以自定义吗？",a:"可以。进入「配置」→「通知文案」，选择风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），文案会自动填入。你可以手动修改每个场景的标题和正文。任务提醒正文支持用 {task_title} 作为任务名占位符，触发时自动替换。"},{q:"删除清单（项目）会删除里面的任务吗？",a:"删除清单后，归属该清单的任务会自动变为「无项目」状态，任务本身不会被删除。删除子清单同理，任务会上升到父清单。"},{q:"切换主题或上传背景图后，按钮和图表颜色会跟着变吗？",a:"会。8 种预设主题各自配有一套主色（accent），切换后按钮、导航指示条、计时器圆环、统计图表、输入框焦点光晕等全部跟随变化。上传自定义背景图时，主色自动回退为默认的柔雾番茄红。"},{q:"上传的背景图太鲜艳影响阅读怎么办？",a:"所有页面都有一层统一的半透明蒙层覆盖在背景图上，会自动淡化背景，保证文字与卡片清晰可读。如果仍觉得偏亮，可在「配置 → 主题背景」中换用更柔和的预设主题。"}]},contact:{intro:"如有商务合作或其他事项，可通过以下方式联系我们：",emailLabel:"邮箱：",phoneLabel:"电话：",workHoursLabel:"工作时间：",workHours:"周一至周五 7:00 - 08:50 | 18：30 - 22：00 ; 周末 07：00 - 22：00",feedbackTitle:"问题反馈 / 功能建议",feedbackDesc:"如果您在使用过程中遇到 Bug 或有功能建议，请发送邮件到以上邮箱，我们会及时跟进处理。",subjectLabel:"邮件主题格式：",subjectFormat:"PomoFlow-功能建议",subjectHint:"（可选：功能建议 / Bug 反馈 / 使用疑问）",bodyLabel:"邮件正文建议包含：",bodyItems:["问题或建议的详细描述","您的联系方式（邮箱 / QQ / 手机号），方便我们回复","遇到 Bug 时的操作步骤（便于我们复现）"],exampleLabel:"示例：",exampleText:`主题：PomoFlow-Bug 反馈

您好，我在创建任务时点击「重复」
选择「自定义」后弹窗没有出现。

联系方式：user@example.com`}}},kv={page:{timer:"Timer - PomoFlow",tasks:"Tasks - PomoFlow",stats:"Stats - PomoFlow",settings:"Settings - PomoFlow"},nav:{timer:"Pomodoro",tasks:"Tasks",stats:"Stats",settings:"Settings",help:"Help & Feedback",mainNav:"Main navigation"},mode:{focus:"Focus",shortBreak:"Short Break",longBreak:"Long Break",focusing:"Focusing"},priority:{high:"High",medium:"Medium",low:"Low",none:"None"},common:{confirm:"OK",noData:"No tasks yet",reviewPlaceholder:"Write a review…",ariaCompleted:"Completed",ariaMarkDone:"Mark complete",ariaMarkUndone:"Mark as not done",loading:"Loading...",close:"Close",clear:"Clear",add:"Add",expand:"Expand",collapse:"Collapse"},timer:{start:"Start Focus",startBreak:"Start Break",pause:"Pause",resume:"Resume",stop:"Stop",abandon:"Abandon",skip:"Skip",starting:"Starting…",todayDone:"Today completed",pomodoroUnit:"pomodoros",pomodoros:"pomodoros",taskList:"Tasks",todayFocus:"Today's focus",minute:"min",selectTask:"Select a task",selectTaskPlaceholder:"-- Select a task --",modeTabsAria:"Timer mode",noSpecificTask:"No specific task",noTodoTask:"No active tasks",reviewTitle:"📝 Daily Review",reviewPlaceholder:"Write today’s review…",clearFilter:"Clear filters",startTooltip:"Start focus",mottoRefresh:"Next",modalTitle:"Notice",focusCompleteTitle:"Focus complete",noTask:"No tasks",expandSubtasks:"Expand subtasks",collapseSubtasks:"Collapse subtasks"},filter:{project:"Project",tag:"Tag",priority:"Priority",date:"Date",all:"All",allProject:"All projects",allTag:"All tags",allPriority:"All priorities",today:"Today",tomorrow:"Tomorrow",thisWeek:"This week",week:"This week",month:"This month",startDate:"Start date",endDate:"End date",dueDate:"Due date",start:"Start",end:"End",to:"to",export:"Export",projectAria:"Filter by project",tagAria:"Filter by tag",priorityAria:"Filter by priority"},export:{index:"No.",title:"Task",project:"Project",priority:"Priority",dueDate:"Due date",estimated:"Est. Pomodoros",tags:"Tags",subtasks:"Subtasks",status:"Status",statusActive:"Active",statusCompleted:"Completed",fileName:"Tasks"},task:{statEstimated:"Estimated time",statActive:"Active tasks",statFocused:"Time focused",statCompleted:"Tasks done",statCompletedPomo:"Pomodoros done",searchResult:"Search results",list:"List",task:"Tasks",noTask:"No tasks yet",noDate:"No date",unscheduled:"Unscheduled",minute:"min",startTooltip:"Start focus",detailPriority:"Priority",detailPomodoro:"Pomodoro",detailDueDate:"Due date",detailProject:"List",detailReminder:"Reminder",detailRepeat:"Repeat",detailNoTags:"No tags",detailEditTags:"Edit tags",detailCollapse:"Collapse",detailAddSubtask:"Add subtask...",subtaskEditPlaceholder:"Edit subtask...",editSubtask:"Edit subtask",deleteSubtask:"Delete subtask",detailAddNote:"Add note...",detailDelete:"Delete task",detailNoProject:"None",detailNoTagsAvailable:"No tags available",detailEmpty:"Click a task to view details",detailTimeFilled:"Filled the due time with the current time. Adjust in “Due date” if needed.",deleteConfirm:'Delete task "{title}"?',emptyAll:"No tasks yet — add one to get started",emptyFiltered:"No tasks match these filters",groupHeader:"{date} ({weekday}) | {n} min",detailPanelAria:"Task details",titleAria:"Title",detailDescription:"Description",detailDescPlaceholder:"Add details...",detailSubtasks:"Subtasks",newSubtaskAria:"New subtask",unknownProject:"Unknown",toggleSubtaskAria:"Toggle subtask completion",dblclickToEdit:"Double-click to edit",noTagsHint:"No tags yet — create them in Settings → Tags",tagPickerAria:"Tag multi-select",saveFailed:"Save failed: {err}",setTagsFailed:"Failed to set tags: {err}",addSubtaskFailed:"Failed to add subtask: {err}",updateSubtaskFailed:"Failed to update subtask: {err}",deleteSubtaskFailed:"Failed to delete subtask: {err}"},stats:{dimToday:"Today",dimWeek:"This week",dimMonth:"This month",dimQuarter:"Quarter",dimHalf:"Half-year",dimYear:"Year",focusDuration:"Focus time",sessions:"Pomodoros",completed:"Tasks done",avg:"Daily avg",activeDays:"Active days",longestStreak:"Longest streak",avgWeek:"Weekly avg",avgMonth:"Monthly avg",peakMonth:"Peak month",peakPeriod:"Peak period",bestProject:"Top project",momRatio:"vs last period",trendTitle:"Focus trend",projectDist:"Project distribution",noData:"No focus data for this range",noProject:"No project data",unitMin:"min",unitCount:"",unitDay:"d",byDay:"day",byWeek:"week",byMonth:"month",weeklyFocusTitle:"This week’s focus (min)",loading:"Loading stats...",loadError:"Failed to load stats: {err}",trendChartAria:"Focus trend bar chart",donutChartAria:"Project distribution donut chart"},enum:{reminder:{"":"No reminder",on_time:"On time","5m":"5 min before","30m":"30 min before","1h":"1 hour before","1d":"1 day before","2d":"2 days before"},repeat:{"":"No repeat",daily:"Daily",weekday:"Weekdays",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",custom:"Custom"},weekday:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},settings:{tab:{account:"Account",timer:"Pomodoro",lists:"Lists",tags:"Tags",theme:"Theme",motto:"Mottos",notification:"Notifications",language:"Language"},language:{title:"Interface Language",desc:"Choose the display language. All pages update instantly.",zh:"Chinese",en:"English"},timerTitle:"Pomodoro",timerParams:"Timer parameters",durationSetting:"Durations",behaviorSetting:"Behavior",focusDuration:"Focus duration",shortBreakDuration:"Short break",longBreakDuration:"Long break",longBreakInterval:"Long-break interval",longBreakIntervalEvery:"Long-break interval (every N focus sessions)",minute:"min",pomodoroUnit:"pomodoros",autoStartNext:"Auto-start next pomodoro",autoStartNextDesc:"Start the next pomodoro immediately after one ends",autoStartBreak:"Auto-start break",autoStartBreakDesc:"Enter break automatically after a pomodoro",autoEnterBreak:"Enter break automatically after focus ends",disableBreak:"Disable breaks",disableBreakDesc:"Skip all break periods when enabled",soundEnabled:"Completion sound",systemNotification:"System notifications",reset:"Reset to default",accountNotOpen:"This feature is not available yet",systemSection:"System",autostart:"Launch at startup",autostartHint:"Run PomoFlow automatically at OS startup (silent start, stays in tray)",on:"On",off:"Off",notifTest:"Notification test",notifTestHint:"Send a test notification to verify the system notification pipeline",sendTest:"Send test",trayHint:"💡 When you close the main window, PomoFlow stays in the system tray. Right-click the tray icon to show the window or quit.",autostartFail:"Failed to toggle autostart: {err}",notifPermDenied:"Notification permission not granted",notifSendFail:"Notification failed: {err}",testNotifTitle:"PomoFlow test notification",testNotifBody:"Active tasks: {n}",theme:{title:"Theme",desc:"Pick a preset above to set the accent color (buttons, progress ring, nav indicator). Pick a background below to independently override the background layer. The two are independent.",preset:"Preset themes",presetBg:"Preset backgrounds",presetBgHint:"Click any of the 8 boxes to switch the background. The accent color still comes from the chosen theme above.",presetBgName:{"preset-bg-1":"Preset 1","preset-bg-2":"Preset 2","preset-bg-3":"Preset 3","preset-bg-4":"Preset 4","preset-bg-5":"Preset 5","preset-bg-6":"Preset 6","preset-bg-7":"Preset 7","preset-bg-8":"Preset 8"},custom:"Custom background",upload:"Upload image",customUsed:"Using custom background",bgUsed:"Custom background active",presetBgUsed:"Preset background active",clearBg:"Remove background",customHint:"JPG/PNG supported; large images are auto-compressed. The uploaded image replaces the preset background; the accent color still comes from the chosen theme.",reset:"Reset to default",compressFail:"Image processing failed, please try another.",bgTooLarge:"The background image is too large to persist. It works this session, but you’ll need to reset it after refresh.",presetName:{default:"Default",sunny:"Sunny",ocean:"Ocean",forest:"Forest",dusk:"Dusk",lavender:"Lavender",evening:"Evening",teal:"Teal"}},motto:{title:"Mottos",addPlaceholder:"Enter a motto…",authorPlaceholder:"Author (optional)",addBtn:"Add",empty:"No custom mottos yet. The timer page will cycle through built-in mottos.",builtInBadge:"Built-in",defaultAuthor:"Custom",textRequired:"Please enter the motto text",textTooLong:"Motto text must be at most 500 characters",authorTooLong:"Author must be at most 64 characters"},notification:{title:"Notifications",styleLabel:"Style",styleHintCustom:"Custom style: fill in the texts below + a style description",styleHintPreset:'Preset style texts follow the interface language automatically. To customize, choose "Custom style".',styleDesc:"Style description",styleDescPlaceholder:"e.g. CEO style, artsy style…",focusEnd:"🍅 Focus ended",breakEnd:"☕ Break ended",reminder:"🔔 Task reminder",titleLabel:"Title",bodyLabel:"Body",placeholderHint:"Use {task_title} as the task name placeholder; auto-replaced on trigger",save:"Save",saved:"✓ Saved",styleName:{default:"Default",cute:"Cute",self_dep:"Self-deprecating",strive:"Strive",funny:"Funny",custom:"Custom"},fallback:{focusTitle:"Focus ended",focusBody:"A pomodoro just ended — take a short break.",breakTitle:"Break ended",breakBody:"Break over — back to focused work with fresh energy."}},repeatCustom:{title:"Custom repeat",startDate:"Start date",endDate:"End date",interval:"Interval (0–99)",type:"Repeat type",typeDay:"Day",typeWeek:"Week",typeMonth:"Month",typeYear:"Year",weekdays:"Repeat on weekdays (multi-select)",monthDays:"Repeat on days of month (multi-select)",weekShort:["M","T","W","T","F","S","S"],needPickWeek:"Please pick at least one weekday",needPickDay:"Please pick at least one date",cancel:"Cancel",confirm:"OK"},list:{title:"Lists",addRootPlaceholder:"Top-level list name",addRoot:"Add top-level list",addChild:"Add sub-list",edit:"Rename",del:"Delete",level2Placeholder:"Sub-list name",level3Placeholder:"Sub-list name",empty:"No lists yet",dragHint:"Hold and drag to reorder or change level",reorderFail:"Reorder failed, please try again",reorderFailDepth:"Target location exceeds max depth",reorderFailCycle:"Cannot move: would create a cycle"},tag:{namePlaceholder:"Enter tag name",add:"Add tag",colorLabel:"Color:",colorAria:"Color {color}",nameLabel:"Name",empty:"No tags yet, add one",dragHandle:"Drag to reorder"}},form:{placeholder:'Type a "task description" here to add a new task, press Enter to save',titlePlaceholder:"Task title...",pomodoroIcons:"Estimated pomodoros",pomodoroUnit:"pomodoros",more:"More",collapse:"Collapse",submit:"Add",estimatedPomo:"Est. pomodoros",needTitle:"Please enter a task title",needTimeForReminder:"A reminder needs a specific time (HH:MM) in the due date",addFailed:"Failed to add"},sidebar:{searchPlaceholder:"Search",searchTasksPlaceholder:"Search task titles...",planned:"Planned",completed:"Completed",journal:"Journal",emptyHint:"No lists yet, click + to add",addRootAria:"Add root list",addListTitle:"Add list",listNamePlaceholder:"List name...",moreActions:"More actions",deleteListConfirm:"Delete this list? Sub-lists will be deleted too"},journal:{monthTitle:"{month} {year}",yearOption:"{year}",monthOption:"{month}",prevMonth:"Previous month",nextMonth:"Next month",yearAria:"Year",monthAria:"Month",weekRange:"Week {n} ({ms}/{ds} – {me}/{de})",weekday:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],dailyReviewPlaceholder:"Daily review",weeklyReview:"📋 Weekly review",weeklyReviewPlaceholder:"This week's review"},monthPanel:{title:"{month}/{year} · Review",weeklyReadonly:"Weekly reviews (read-only · edited in each week block)",weekRange:"Week {n} (from {date})",empty:"(empty)",monthlyReview:"📋 Monthly review",monthlyPlaceholder:"Monthly summary…"},help:{tab:{manual:"User Manual",faq:"FAQ",contact:"Contact Us"},manual:{timer:{title:"🍅 Pomodoro",items:[{text:"Pick a task and click “Start” to begin a focus session. When focus ends, the app switches to break mode automatically."},{text:"Three modes: “Focus” (default 25 min, customizable) / “Short break” (default 5 min) / “Long break” (default 15 min, triggered every N pomodoros)."},{text:"When focus ends, a system notification + modal appears (you can customize the wording under Settings → Notifications)."},{text:"Enable “Auto-start break” and “Auto-start next pomodoro” so focus endings need no manual action."},{text:"Even if you switch pages after the timer finishes, notifications and auto-transitions still fire."},{text:"The right panel shows the current task list, filterable by project, tag, priority, and date."},{text:"Below the timer are a “Daily review” text box and a “Motto” card (click to get another)."}]},tasks:{title:"📋 Tasks",items:[{text:"Switch views from the left sidebar: Today / Tomorrow / This week / Planned / Completed / Journal."},{text:"The “Planned” view supports filtering by project, tag, priority, this week, this month, and due-date range."},{text:"Tasks support: title, note, priority (high/medium/low/none), due date (with time), estimated pomodoros, pomodoro duration, reminder, and repeat."},{text:"Lists (projects) support nesting (up to 3 levels) and custom colors. Tags support many-to-many with 12 preset colors."},{text:"Subtasks (checklist): each task can have multiple subtasks, each toggleable independently."},{text:"Click a task to open the right detail panel and edit title, due date, priority, reminder, repeat, tags, subtasks, and notes."}]},reminder:{title:"🔔 Reminders",items:[{text:"After setting a reminder, a browser notification fires at the reminder time (due date minus the lead time)."},{text:"Reminder options: On time / 5 min / 30 min / 1 hour / 1 day / 2 days before."},{text:"No reminders fire during focus; they are shown after focus ends (to avoid breaking focus)."},{text:"Each reminder fires only once — no repeat interruptions."},{text:"A reminder requires a due date with a specific time (HH:MM); otherwise you’ll be prompted to fill it in."}]},repeat:{title:"🔁 Repeat",items:[{text:"Built-in rules: Daily / Weekdays / Weekly / Monthly / Yearly. Setting one auto-generates repeat instances (up to 50)."},{text:"“Custom”: choose an interval (0–99) and a type (day/week/month/year).",sub:"Interval 0 = repeat every cycle; interval 1 = every other cycle (skip 1); interval N = every N cycles."},{text:"Type “Week” lets you pick weekdays (Mon–Sun, multi-select); type “Month” lets you pick days of the month (multi-select)."},{text:"When you change the repeat rule, old incomplete instances are deleted and regenerated under the new rule."},{text:"Each repeat instance fully copies the original task’s tags, subtasks, notes, priority, and pomodoro count."}]},journal:{title:"📔 Journal",items:[{text:"Monthly view, grouped by natural weeks (Mon–Sun); each week is laid out in a 3+3+1 row split."},{text:"Each day cell shows that day’s tasks (a square checkbox toggles completion) plus a daily-review text box."},{text:"Each week has a weekly-review box at the bottom. The right panel shows the month’s weekly reviews (read-only) + a monthly review (editable)."},{text:"Supports previous/next month and year/month dropdowns."},{text:"The “daily review” on the timer page syncs with the same day’s daily review in Journal mode."}]},stats:{title:"📊 Stats",items:[{text:"Six range filters: Today / This week / This month / Quarter / Half-year / Year."},{text:"Four common cards: focus time, pomodoros, tasks done, daily average."},{text:"Longer ranges unlock more highlights: active days, longest streak, weekly/monthly averages, peak period, top project, and period-over-period."},{text:"Trend bar chart (auto day/week/month granularity) + donut chart (project time distribution), all colored by the current theme accent — no more rainbow."}]},settings:{title:"⚙️ Settings",items:[{text:"“Pomodoro”: focus/break durations, long-break interval (2–6 pomodoros), and auto-start options."},{text:"“Lists”: add/rename/delete projects (3-level nesting), custom colors."},{text:"“Tags”: add/rename/delete tags, 12 preset colors."},{text:"“Theme”: 8 preset themes (Default/Sunny/Ocean/Forest/Dusk/Lavender/Evening/Teal), each with its own background gradient and matching accent; you can also upload a custom image (auto-compressed). All pages use a unified translucent veil to soften the background."},{text:"“Mottos”: manage custom mottos (stored in the database, cycled on the timer page)."},{text:"“Notifications”: 6 styles (Default/Cute/Self-deprecating/Strive/Funny/Custom), each configurable for focus-end/break-end/reminder title and body."}]}},faq:{items:[{q:"Where is my data stored? Can it be lost?",a:"All data (tasks, pomodoro records, reviews, mottos, notification wording, theme settings) is stored in a local SQLite database (pomoflow.db) and browser localStorage — no internet needed. When you upgrade, the database auto-migrates and old data is fully preserved. Back up pomoflow.db regularly."},{q:"How do I change the pomodoro duration and long-break interval?",a:"Go to Settings → Pomodoro and pick minutes from the Focus / Short break / Long break dropdowns (1–90 min). The long-break interval can be 2–6 pomodoros (i.e. a long break every N pomodoros)."},{q:"Why do task reminders not fire during focus?",a:"By design. During focus, all task reminders are suppressed so your focus isn’t interrupted. Skipped reminders are shown after focus ends."},{q:"What if task reminders don’t show a notification?",a:"On first use the browser asks for notification permission — click “Allow”. If you denied it, re-enable notifications via the settings icon on the left of the address bar. Also, a reminder only fires when the task has a due date with a specific time (HH:MM) and a reminder option set."},{q:"In custom repeat, what’s the difference between interval 0 and interval 1?",a:"Interval 0 = repeat every cycle (e.g. appears every day). Interval 1 = every other cycle (e.g. weeks 1, 3, 5, skipping 2 and 4). Interval N = skip N cycles, then repeat."},{q:"Where do I edit weekly and monthly reviews in Journal mode?",a:"Weekly reviews are edited in the text box at the bottom of each week block (auto-saved on blur). Monthly reviews are edited in the “📋 Monthly review” box on the right panel. Edits on the left refresh the right panel automatically."},{q:"Where are custom mottos stored? Lost on refresh?",a:"Custom mottos are stored in the database (pomoflow.db) and survive refreshes. The 50 built-in mottos ship with the app. The motto card on the timer page prefers custom mottos (cycling without repeats) and restarts after one full loop."},{q:"Does focus keep timing after I switch pages? Do auto-breaks still fire?",a:"Yes. The timer and all auto logic (auto-start break, auto-start next pomodoro, focus-end notification) live in global state, so switching to Tasks/Stats/Settings doesn’t affect them. Focus completions still notify and transition."},{q:"What if an uploaded background image is too large?",a:"Uploads are auto-compressed (scaled to 1920px wide, JPEG quality 0.8), so storage isn’t blown up. If an image is still too large to persist, a prompt tells you to reset after refresh."},{q:"Can notification wording be customized?",a:"Yes. Go to Settings → Notifications and pick a style (Default/Cute/Self-deprecating/Strive/Funny/Custom); the wording auto-fills. You can edit each scene’s title and body. The reminder body supports {task_title} as the task name placeholder, auto-replaced on trigger."},{q:"Does deleting a list (project) delete its tasks?",a:"No. Deleting a list sets its tasks to “no project”; the tasks themselves aren’t deleted. Deleting a sub-list works the same way — tasks move up to the parent list."},{q:"Do buttons and charts change color when I switch themes or upload a background?",a:"Yes. Each of the 8 preset themes has its own accent color; switching it updates buttons, the nav indicator, the timer ring, charts, and input focus glow. When you upload a custom background, the accent falls back to the default soft tomato."},{q:"What if an uploaded background is too vivid to read?",a:"Every page has a unified translucent veil over the background that softens it, keeping text and cards readable. If it still feels bright, switch to a softer preset theme under Settings → Theme."}]},contact:{intro:"For business cooperation or other matters, reach us via:",emailLabel:"Email: ",phoneLabel:"Phone: ",workHoursLabel:"Working hours: ",workHours:"Mon–Fri 7:00 - 08:50 | 18：30 - 22：00 ;  Weekend: 07:00 - 22:00",feedbackTitle:"Bug Reports / Feature Requests",feedbackDesc:"If you hit a bug or have a feature idea, email the address above and we’ll follow up.",subjectLabel:"Email subject format:",subjectFormat:"PomoFlow-Feature Request",subjectHint:"(Optional: Feature Request / Bug Report / Question)",bodyLabel:"Email body should include:",bodyItems:["Detailed description of the issue or suggestion","Your contact (email / QQ / phone) so we can reply","Steps to reproduce if it’s a bug"],exampleLabel:"Example:",exampleText:`Subject: PomoFlow-Bug Report

Hi, when creating a task I clicked “Repeat”
and chose “Custom” but the dialog didn’t appear.

Contact: user@example.com`}}},wv={zh:yv,en:kv},yi="zh",oc="pomoflow-lang";function xv(){if(typeof localStorage>"u")return yi;try{const a=localStorage.getItem(oc);if(a==="en"||a==="zh")return a}catch{}return yi}let ko=z(ze(xv()));function wo(){return e(ko)}function Sv(a){if(v(ko,a,!0),typeof localStorage<"u")try{localStorage.setItem(oc,a)}catch{}typeof document<"u"&&(document.documentElement.lang=a)}function gt(){return wv[e(ko)]}function Nt(a,t){return Object.entries(t).reduce((n,[r,o])=>n.split(`{${r}}`).join(String(o)),a)}typeof document<"u"&&(document.documentElement.lang=e(ko));const sc="pomoflow:settings:v2",Tv="pomoflow:settings:v1",or={focusDuration:25,shortBreakDuration:5,longBreakDuration:15,longBreakInterval:4,autoStartNextPomodoro:!1,autoStartBreak:!1,disableBreak:!1,soundEnabled:!0,desktopNotificationEnabled:!0};function Dv(a){try{const t=JSON.parse(a),n={};return typeof t.focusMinutes=="number"&&(n.focusDuration=t.focusMinutes),typeof t.shortBreakMinutes=="number"&&(n.shortBreakDuration=t.shortBreakMinutes),typeof t.longBreakMinutes=="number"&&(n.longBreakDuration=t.longBreakMinutes),typeof t.longBreakInterval=="number"&&(n.longBreakInterval=t.longBreakInterval),typeof t.autoChain=="boolean"&&(n.autoStartBreak=t.autoChain),typeof t.soundEnabled=="boolean"&&(n.soundEnabled=t.soundEnabled),typeof t.desktopNotificationEnabled=="boolean"&&(n.desktopNotificationEnabled=t.desktopNotificationEnabled),Object.keys(n).length>0?n:null}catch{return null}}function ic(a){typeof localStorage>"u"||localStorage.setItem(sc,JSON.stringify(a))}function Pv(){if(typeof localStorage>"u")return{...or};const a=localStorage.getItem(sc);if(a)try{const n=JSON.parse(a);return{...or,...n}}catch{return{...or}}const t=localStorage.getItem(Tv);if(t){const n=Dv(t);if(n){const r={...or,...n};return ic(r),r}}return{...or}}let Vr=z(ze(Pv()));function Va(){return e(Vr)}function ki(a){v(Vr,{...e(Vr),...a},!0),ic(e(Vr))}const Mv=[{key:"default",label:"默认"},{key:"cute",label:"卡哇伊"},{key:"self_dep",label:"自嘲"},{key:"strive",label:"奋斗"},{key:"funny",label:"搞笑"},{key:"custom",label:"自定义风格"}],lc={default:{style:"default",focus_end_title:"专注结束",focus_end_body:"番茄钟结束了，休息一下吧",break_end_title:"休息结束",break_end_body:"休息结束，满满的能量开启新的任务专注。",reminder_title:"PomoFlow 任务提醒",reminder_body:"任务「{task_title}」提醒时间已到"},cute:{style:"cute",focus_end_title:"专注完成啦~",focus_end_body:"你好棒呀！休息一下吧~ ✨",break_end_title:"休息结束啦~",break_end_body:"元气满满，继续加油鸭！✧",reminder_title:"该做任务啦~",reminder_body:"「{task_title}」的时间到啦，快去看看吧~ ♪"},self_dep:{style:"self_dep",focus_end_title:"又混过去一个",focus_end_body:"居然坚持下来了，不太像你啊…",break_end_title:"该干活了",break_end_body:"虽然我知道你不想，但还是开始吧…",reminder_title:"别装了",reminder_body:"「{task_title}」该做了，别再拖了"},strive:{style:"strive",focus_end_title:"专注完成！",focus_end_body:"又一个番茄被你征服！继续！",break_end_title:"休息结束！",break_end_body:"调整完毕，向下一个目标冲刺！",reminder_title:"时间到了！",reminder_body:"「{task_title}」——现在就是行动的时刻！"},funny:{style:"funny",focus_end_title:"终于停了！",focus_end_body:"番茄钟说：你该歇了，我也该歇了 😂",break_end_title:"歇够了？",break_end_body:"再不开始老板要扣工资了…你是自己的老板？那更得自律！🤣",reminder_title:"起来搬砖！",reminder_body:"「{task_title}」叫你回来干活了 🧱"},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}},cc={default:{style:"default",focus_end_title:"Focus Complete",focus_end_body:"Pomodoro finished. Take a break.",break_end_title:"Break Over",break_end_body:"Break ended — recharge and start your next focus.",reminder_title:"PomoFlow Task Reminder",reminder_body:'Task "{task_title}" reminder time has arrived'},cute:{style:"cute",focus_end_title:"Focus done~",focus_end_body:"Great job! Take a little break~ ✨",break_end_title:"Break over~",break_end_body:"Full of energy, keep it up!",reminder_title:"Time for a task~",reminder_body:'It’s time for "{task_title}", go check it~ ♪'},self_dep:{style:"self_dep",focus_end_title:"Another one down",focus_end_body:"You actually stuck with it — not very you…",break_end_title:"Back to work",break_end_body:"I know you don’t want to, but let’s begin…",reminder_title:"Stop pretending",reminder_body:'"{task_title}" is due — no more procrastinating'},strive:{style:"strive",focus_end_title:"Focus complete!",focus_end_body:"Another pomodoro conquered! Keep going!",break_end_title:"Break over!",break_end_body:"Recharged — sprint toward the next goal!",reminder_title:"Time’s up!",reminder_body:'"{task_title}" — act now!'},funny:{style:"funny",focus_end_title:"Finally stopped!",focus_end_body:"The pomodoro says: you should rest, so should I 😂",break_end_title:"Rested enough?",break_end_body:"If you don’t start now the boss will dock your pay… wait, you ARE the boss? Even more reason to be disciplined! 🤣",reminder_title:"Get back to work!",reminder_body:'"{task_title}" is calling you back to grind 🧱'},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}};function dc(a,t,n){const r=t==="en"?cc:lc;if(a==="custom"){const l=r.default;return{focus_end_title:(n==null?void 0:n.focus_end_title)||l.focus_end_title,focus_end_body:(n==null?void 0:n.focus_end_body)||l.focus_end_body,break_end_title:(n==null?void 0:n.break_end_title)||l.break_end_title,break_end_body:(n==null?void 0:n.break_end_body)||l.break_end_body,reminder_title:(n==null?void 0:n.reminder_title)||l.reminder_title,reminder_body:(n==null?void 0:n.reminder_body)||l.reminder_body}}const c=r[a||"default"]??r.default;return{focus_end_title:c.focus_end_title,focus_end_body:c.focus_end_body,break_end_title:c.break_end_title,break_end_body:c.break_end_body,reminder_title:c.reminder_title,reminder_body:c.reminder_body}}function $t(a,t,n,r){if(typeof t=="function"?a!==t||!r:!t.has(a))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(a):r?r.value:t.get(a)}function sr(a,t,n,r,o){if(typeof t=="function"?a!==t||!0:!t.has(a))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(a,n),n}var on,da,Mn,Or;const wi="__TAURI_TO_IPC_KEY__";function Ev(a,t=!1){return window.__TAURI_INTERNALS__.transformCallback(a,t)}class Cv{constructor(t){on.set(this,void 0),da.set(this,0),Mn.set(this,[]),Or.set(this,void 0),sr(this,on,t||(()=>{})),this.id=Ev(n=>{const r=n.index;if("end"in n){r==$t(this,da,"f")?this.cleanupCallback():sr(this,Or,r);return}const o=n.message;if(r==$t(this,da,"f")){for($t(this,on,"f").call(this,o),sr(this,da,$t(this,da,"f")+1);$t(this,da,"f")in $t(this,Mn,"f");){const c=$t(this,Mn,"f")[$t(this,da,"f")];$t(this,on,"f").call(this,c),delete $t(this,Mn,"f")[$t(this,da,"f")],sr(this,da,$t(this,da,"f")+1)}$t(this,da,"f")===$t(this,Or,"f")&&this.cleanupCallback()}else $t(this,Mn,"f")[r]=o})}cleanupCallback(){window.__TAURI_INTERNALS__.unregisterCallback(this.id)}set onmessage(t){sr(this,on,t)}get onmessage(){return $t(this,on,"f")}[(on=new WeakMap,da=new WeakMap,Mn=new WeakMap,Or=new WeakMap,wi)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[wi]()}}class xi{constructor(t,n,r){this.plugin=t,this.event=n,this.channelId=r}async unregister(){return qe(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}}async function uc(a,t,n){const r=new Cv(n);try{return await qe(`plugin:${a}|register_listener`,{event:t,handler:r}),new xi(a,t,r.id)}catch{return await qe(`plugin:${a}|registerListener`,{event:t,handler:r}),new xi(a,t,r.id)}}async function qe(a,t={},n){return window.__TAURI_INTERNALS__.invoke(a,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const Tn=a=>qe("list_tasks",{query:a}),_s=(a,t)=>qe("upsert_task",{task:a,tagIds:t}),Nv=a=>qe("delete_task",{id:a}),vc=a=>qe("complete_task",{id:a}),fc=a=>qe("reopen_task",{id:a}),zs=()=>qe("list_projects"),oo=a=>qe("upsert_project",{project:a}),hc=a=>qe("delete_project",{id:a}),jv=a=>qe("reorder_projects",{items:a}),Hs=()=>qe("list_tags"),Si=a=>qe("upsert_tag",{tag:a}),Fv=a=>qe("delete_tag",{id:a}),Av=a=>qe("reorder_tags",{items:a}),Iv=a=>qe("list_tags_for_task",{taskId:a}),qv=(a,t)=>qe("set_tags_for_task",{taskId:a,tagIds:t}),Rv=(a,t,n)=>qe("start_pomodoro",{taskId:a,projectId:t,duration:n}),_c=(a,t)=>qe("stop_pomodoro",{sessionId:a,isCompleted:t}),Ti=a=>qe("get_daily_review",{date:a}),pc=a=>qe("upsert_daily_review",{review:a}),Lv=(a,t)=>qe("list_daily_reviews",{startDate:a,endDate:t}),gc=a=>qe("delete_daily_review",{date:a}),Ov=a=>qe("upsert_weekly_review",{review:a}),mc=(a,t)=>qe("list_weekly_reviews",{year:a,month:t}),Bv=a=>qe("delete_weekly_review",{weekStart:a}),zv=a=>qe("get_monthly_review",{yearMonth:a}),Hv=a=>qe("upsert_monthly_review",{review:a}),Uv=a=>qe("delete_monthly_review",{yearMonth:a}),bc=a=>qe("list_subtasks_for_task",{taskId:a}),ps=a=>qe("upsert_subtask",{subtask:a}),Wv=a=>qe("delete_subtask",{id:a}),yc=()=>qe("list_mottos"),Yv=a=>qe("upsert_motto",{motto:a}),Gv=a=>qe("delete_motto",{id:a}),kc=()=>qe("get_notification_template"),Vv=a=>qe("upsert_notification_template",{template:a}),Kv=(a,t)=>qe("today_completed_minutes",{startMs:a,endMs:t}),Di=(a,t,n,r)=>qe("stats_range",{startDate:a,endDate:t,group:n,tzOffsetMin:r}),$v=(a,t,n,r)=>qe("stats_overview",{today:a,weekStart:t,monthStart:n,tzOffsetMin:r}),Jv=(a,t,n,r)=>qe("export_tasks_xlsx",{path:a,sheetName:t,headers:n,rows:r});var gs;(function(a){a.Year="year",a.Month="month",a.TwoWeeks="twoWeeks",a.Week="week",a.Day="day",a.Hour="hour",a.Minute="minute",a.Second="second"})(gs||(gs={}));class Qv{static at(t,n=!1,r=!1){return{at:{date:t,repeating:n,allowWhileIdle:r},interval:void 0,every:void 0}}static interval(t,n=!1){return{at:void 0,interval:{interval:t,allowWhileIdle:n},every:void 0}}static every(t,n,r=!1){return{at:void 0,interval:void 0,every:{interval:t,count:n,allowWhileIdle:r}}}}var ms;(function(a){a[a.None=0]="None",a[a.Min=1]="Min",a[a.Low=2]="Low",a[a.Default=3]="Default",a[a.High=4]="High"})(ms||(ms={}));var bs;(function(a){a[a.Secret=-1]="Secret",a[a.Private=0]="Private",a[a.Public=1]="Public"})(bs||(bs={}));async function xo(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await qe("plugin:notification|is_permission_granted")}async function So(){return await window.Notification.requestPermission()}function To(a){typeof a=="string"?new window.Notification(a):new window.Notification(a.title,a)}async function Xv(a){await qe("plugin:notification|register_action_types",{types:a})}async function Zv(){return await qe("plugin:notification|get_pending")}async function ef(a){await qe("plugin:notification|cancel",{notifications:a})}async function tf(){await qe("plugin:notification|cancel")}async function af(){return await qe("plugin:notification|get_active")}async function nf(a){await qe("plugin:notification|remove_active",{notifications:a})}async function rf(){await qe("plugin:notification|remove_active")}async function of(a){await qe("plugin:notification|create_channel",{...a})}async function sf(a){await qe("plugin:notification|delete_channel",{id:a})}async function lf(){return await qe("plugin:notification|listChannels")}async function cf(a){return await uc("notification","notification",a)}async function df(a){return await uc("notification","actionPerformed",a)}const uf=Object.freeze(Object.defineProperty({__proto__:null,get Importance(){return ms},Schedule:Qv,get ScheduleEvery(){return gs},get Visibility(){return bs},active:af,cancel:ef,cancelAll:tf,channels:lf,createChannel:of,isPermissionGranted:xo,onAction:df,onNotificationReceived:cf,pending:Zv,registerActionTypes:Xv,removeActive:nf,removeAllActive:rf,removeChannel:sf,requestPermission:So,sendNotification:To},Symbol.toStringTag,{value:"Module"})),wc="pomoflow-focus-count";let Ce=ze({mode:"focus",secondsLeft:Va().focusDuration*60,running:!1,sessionId:null,activeTask:null,focusCompletedCount:vf(),pendingCompletionMessage:null,todayCount:0,todayMinutes:0}),Do=0,Po=0,ys=new Date().toDateString(),yr=!1,ua=null;function vf(){try{return parseInt(localStorage.getItem(wc)||"0",10)||0}catch{return 0}}function Us(){return Ce}function ff(){return ua}async function xc(){try{ua=await kc()}catch{}}function hf(){var a;return((a=Ce.activeTask)==null?void 0:a.pomodoro_duration)??Va().focusDuration}function Ar(a){const t=Va();return a==="focus"?hf()*60:a==="short_break"?t.shortBreakDuration*60:t.longBreakDuration*60}function Mo(){!Ce.running&&Ce.sessionId===null&&(Ce.secondsLeft=Ar(Ce.mode))}async function Gn(a,t,n){const r=n??Math.floor(Ar(Ce.mode)/60),o=await Rv(a,t,r);Ce.sessionId=o.id,n!==void 0&&(Ce.secondsLeft=n*60),Do=Date.now(),Po=Ce.secondsLeft,Ce.running=!0,yr=!1}async function _f(a){Ce.sessionId!==null&&await Ws(!1),Ce.activeTask=a,Ce.mode="focus",Mo(),await Gn(a.id,a.project_id??null,a.pomodoro_duration??void 0)}async function pf(a){Ce.activeTask=a,!Ce.running&&(Ce.sessionId!==null&&await Ws(!1),Ce.mode="focus",Mo(),await Gn(a.id,a.project_id??null,a.pomodoro_duration??void 0))}function Oo(){Ce.running&&(Ce.running=!1)}function Bo(){Ce.running||Ce.sessionId===null||(Do=Date.now(),Po=Ce.secondsLeft,Ce.running=!0)}async function Ws(a){const t=Ce.sessionId;if(Ce.running=!1,Ce.sessionId=null,t!==null)try{await _c(t,a)}catch(n){console.warn("stop pomodoro failed",n)}Ce.secondsLeft=Ar(Ce.mode)}function so(a){Ce.mode=a,Ce.running=!1,Ce.sessionId=null,Ce.secondsLeft=Ar(a)}function gf(){if(!Ce.running)return;const a=Math.floor((Date.now()-Do)/1e3),t=Math.max(0,Po-a);if(t<=0){Ce.secondsLeft=0,Ce.running=!1,Ce.sessionId!==null&&!yr&&(yr=!0,Sc());return}Ce.secondsLeft=t}function mf(){if(!Ce.running)return;const a=Math.floor((Date.now()-Do)/1e3),t=Math.max(0,Po-a);t<=0?(Ce.secondsLeft=0,Ce.running=!1,Ce.sessionId!==null&&!yr&&(yr=!0,Sc())):Ce.secondsLeft=t}function bf(){Ce.pendingCompletionMessage=null}function Pi(a){Ce.activeTask=a,Mo()}function yf(){Mo()}function kf(a){const t=new Date().toDateString();t!==ys?(ys=t,Ce.todayCount=1,Ce.todayMinutes=a):(Ce.todayCount+=1,Ce.todayMinutes+=a)}function wf(a,t){Ce.todayCount=a,Ce.todayMinutes=t,ys=new Date().toDateString()}async function zo(){try{const a=new Date,t=a.getDay(),n=new Date(a);n.setDate(a.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0);const r=new Date(a.getFullYear(),a.getMonth(),1),o=l=>`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,c=await $v(o(a),o(n),o(r),-a.getTimezoneOffset());wf(c.today_sessions,c.today_minutes)}catch(a){console.warn("sync today stats",a)}}let Mi=!1;function xf(){if(Mi||typeof window>"u")return;Mi=!0,zo(),document.addEventListener("visibilitychange",()=>{document.hidden||zo()});let a=new Date().toDateString();window.setInterval(()=>{const t=new Date().toDateString();t!==a&&(a=t,zo())},6e4)}function Sf(a){const t=new Date;t.setHours(0,0,0,0);const n=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0,23,59,59,999),o={high:0,medium:1,low:2,none:3},c=a.filter(l=>{if(l.status!=="active"||!l.due_date)return!1;const i=new Date(l.due_date);if(isNaN(i.getTime())||i<n||i>r)return!1;const u=new Date(i);return u.setHours(0,0,0,0),u.getTime()<=t.getTime()});return c.sort((l,i)=>{const u=o[l.priority??"none"]??3,f=o[i.priority??"none"]??3;return u!==f?u-f:new Date(l.created_at??0).getTime()-new Date(i.created_at??0).getTime()}),c[0]??null}async function Tf(a,t){if(Va().desktopNotificationEnabled)try{let n=await xo();if(n||(n=await So()==="granted"),!n)return;To({title:a,body:t})}catch(n){console.warn("notification failed",n)}}async function Sc(){const a=Ce.mode,t=Math.floor(Ar(a)/60),n=Ce.activeTask,r=wo(),o=ua?{focus_end_title:ua.focus_end_title??void 0,focus_end_body:ua.focus_end_body??void 0,break_end_title:ua.break_end_title??void 0,break_end_body:ua.break_end_body??void 0,reminder_title:ua.reminder_title??void 0,reminder_body:ua.reminder_body??void 0}:null,c=dc(ua==null?void 0:ua.style,r,o),l=a==="focus"?c.focus_end_title:c.break_end_title,i=a==="focus"?c.focus_end_body:c.break_end_body;await Tf(l,i),Ce.pendingCompletionMessage=i;const u=Ce.sessionId;if(Ce.running=!1,Ce.sessionId=null,u!==null)try{await _c(u,!0)}catch(h){console.warn("stop pomodoro failed",h)}const f=Va();if(a==="focus"){Ce.focusCompletedCount+=1;try{localStorage.setItem(wc,String(Ce.focusCompletedCount))}catch{}kf(t);let h=[];try{h=await Tn({status:null,limit:null})}catch(x){console.warn("refresh tasks failed",x)}const b=n?h.find(x=>x.id===n.id)??null:null;if(!f.disableBreak&&f.autoStartBreak){const S=Ce.focusCompletedCount%f.longBreakInterval===0,T=S?"long_break":"short_break",M=S?f.longBreakDuration:f.shortBreakDuration;so(T),await Gn(null,(b==null?void 0:b.project_id)??(n==null?void 0:n.project_id)??null,M);return}await Ei(h,b,f.autoStartNextPomodoro);return}let _=[];try{_=await Tn({status:null,limit:null})}catch(h){console.warn("refresh tasks failed",h)}const g=n?_.find(h=>h.id===n.id)??null:null;await Ei(_,g,f.autoStartNextPomodoro)}async function Ei(a,t,n){if(t!==null&&t.status==="active"&&(t.completed_pomodoros??0)<(t.estimated_pomodoros??0)&&t){so("focus"),Ce.activeTask=t,n&&await Gn(t.id,t.project_id??null,t.pomodoro_duration??void 0);return}t&&t.status==="completed"&&(Ce.activeTask=null);const o=Sf(a);Ce.activeTask=o,so("focus"),o&&n&&await Gn(o.id,o.project_id??null,o.pomodoro_duration??void 0)}const Tc="pomoflow-fired-reminders",Df=3e4,Pf=10080*60*1e3,Mf={on_time:0,minutes5:5*6e4,minutes30:30*6e4,hour1:60*6e4,day1:1440*6e4,days2:2880*6e4};function Ef(){try{const a=localStorage.getItem(Tc);return a?JSON.parse(a):{}}catch{return{}}}function Cf(a){try{localStorage.setItem(Tc,JSON.stringify(a))}catch{}}function Dc(){const a=Us();return a.running&&a.mode==="focus"}async function Nf(a){const t=ff(),n=wo(),r=t?{reminder_title:t.reminder_title??void 0,reminder_body:t.reminder_body??void 0}:null,o=dc(t==null?void 0:t.style,n,r),c=o.reminder_body.replace(/\{task_title\}/g,a.title);try{let l=await xo();if(l||(l=await So()==="granted"),!l)return;To({title:o.reminder_title,body:c})}catch(l){console.warn("reminder notification failed",l)}}async function jf(){const a=Date.now(),t=Ef();let n=!1,r=[];try{r=await Tn({status:"active",limit:null})}catch{return}const o=Dc();for(const l of r){if(l.status!=="active"||!l.reminder||l.reminder==="none"||!l.due_date)continue;const i=Mf[l.reminder];if(i===void 0)continue;const u=new Date(l.due_date).getTime();if(Number.isNaN(u))continue;const f=u-i;if(f>a)continue;const _=`${l.id}:${f}`;t[_]||o||(t[_]=f,n=!0,await Nf(l))}const c=a-Pf;for(const l of Object.keys(t))t[l]<c&&(delete t[l],n=!0);n&&Cf(t)}let Ci=!1,Ni=!1,Ho=!1;async function Kr(){if(!Ho){Ho=!0;try{await jf()}finally{Ho=!1}}}function Ff(){Kr()}function Af(){Ci||typeof window>"u"||(Ci=!0,Kr(),window.setInterval(()=>void Kr(),Df),window.setInterval(()=>{const a=Dc();Ni&&!a&&Kr(),Ni=a},1e3))}const If="/assets/preset-1-CBSgnW-Q.jpg",qf="/assets/preset-2-DV_n3pDN.jpg",Rf="/assets/preset-3-q3qAbjR3.jpg",Lf="/assets/preset-4-B_bSN4WY.jpg",Of="/assets/preset-5-C1j6rp_Z.jpg",Bf="/assets/preset-6-_4eNaNuV.jpg",zf="/assets/preset-7-D1OhqFGY.jpg",Hf="/assets/preset-8-oFCsPykG.jpg",io=[{id:"preset-bg-1",url:`url(${If})`},{id:"preset-bg-2",url:`url(${qf})`},{id:"preset-bg-3",url:`url(${Rf})`},{id:"preset-bg-4",url:`url(${Lf})`},{id:"preset-bg-5",url:`url(${Of})`},{id:"preset-bg-6",url:`url(${Bf})`},{id:"preset-bg-7",url:`url(${zf})`},{id:"preset-bg-8",url:`url(${Hf})`}],Uf=io.map(a=>a.id);function Wf(a){return Uf.includes(a)}function Yf(a){var t;return((t=io.find(n=>n.id===a))==null?void 0:t.url)??""}const Pc=[{id:"default",name:"默认",preview:"linear-gradient(160deg, #faf8f5, #ede4d8)"},{id:"sunny",name:"暖阳",preview:"linear-gradient(160deg, #fffbf5, #fde4c2)"},{id:"ocean",name:"海洋",preview:"linear-gradient(160deg, #f2f7fb, #c8dcf0)"},{id:"forest",name:"森林",preview:"linear-gradient(160deg, #f3f7f1, #cde0c6)"},{id:"dusk",name:"黄昏",preview:"linear-gradient(160deg, #fdf7f1, #edd0bc)"},{id:"lavender",name:"薰衣草",preview:"linear-gradient(160deg, #f8f5fb, #dcc8ed)"},{id:"evening",name:"暮色",preview:"linear-gradient(160deg, #f6f3f0, #d8cbbe)"},{id:"teal",name:"青石",preview:"linear-gradient(160deg, #f3f7f6, #c4dad5)"}],Gf=Pc.map(a=>a.id);function Vf(a){return Gf.includes(a)}const Mc="pomoflow-theme",Ys="preset-bg-1";function Uo(){return{theme:"default",background:{kind:"preset",id:Ys}}}function Kf(a){return a?a.kind==="preset"?`preset:${a.id}`:a.url:""}function $f(){if(typeof localStorage>"u")return Uo();try{const a=localStorage.getItem(Mc);if(!a||!a.startsWith("{"))return Uo();const t=JSON.parse(a),n=typeof t.theme=="string"&&Vf(t.theme)?t.theme:"default",r=typeof t.background=="string"?t.background:"";if(r.startsWith("preset:")){const o=r.slice(7);if(Wf(o))return{theme:n,background:{kind:"preset",id:o}}}return r.startsWith("url(")?{theme:n,background:{kind:"custom",url:r}}:{theme:n,background:{kind:"preset",id:Ys}}}catch{return Uo()}}function Ir(a){if(!(typeof localStorage>"u"))try{localStorage.setItem(Mc,JSON.stringify({theme:a.theme,background:Kf(a.background)}))}catch{}}function Jf(a){return a?a.kind==="preset"?Yf(a.id):a.url:null}let Ya=z("default"),Ga=z(null);function Zn(){if(typeof document>"u")return;const a=document.documentElement;a.setAttribute("data-theme",e(Ya));const t=Jf(e(Ga));t?a.style.setProperty("--bg-page",t):a.style.removeProperty("--bg-page")}function Qf(){const a=$f();v(Ya,a.theme,!0),v(Ga,a.background,!0),Zn()}function Xf(){return e(Ya)}function Zf(){return e(Ga)}function eh(a){v(Ya,a,!0),Ir({theme:a,background:e(Ga)}),Zn()}function th(a){const t={kind:"preset",id:a};v(Ga,t,!0),Ir({theme:e(Ya),background:t}),Zn()}function ah(a){if(!a.startsWith("url("))return;const t={kind:"custom",url:a};v(Ga,t,!0),Ir({theme:e(Ya),background:t}),Zn()}function Wo(){v(Ga,null),Ir({theme:e(Ya),background:null}),Zn()}function Yo(){v(Ya,"default"),v(Ga,{kind:"preset",id:Ys},!0),Ir({theme:e(Ya),background:e(Ga)}),Zn()}function nh(a){return new Promise(t=>{const n=new FileReader;n.onerror=()=>t(null),n.onload=()=>{const r=new Image;r.onerror=()=>t(null),r.onload=()=>{try{const c=Math.min(1,1920/Math.max(r.width,r.height)),l=Math.max(1,Math.round(r.width*c)),i=Math.max(1,Math.round(r.height*c)),u=document.createElement("canvas");u.width=l,u.height=i;const f=u.getContext("2d");if(!f)return t(null);f.drawImage(r,0,0,l,i),t(`url(${u.toDataURL("image/jpeg",.8)})`)}catch{t(null)}},r.src=String(n.result)},n.readAsDataURL(a)})}var rh=Dn('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function Ec(a,t){let n=pa(t,"size",3,14),r=pa(t,"filled",3,!0);var o=rh(),c=s(o);E(()=>{I(o,"width",n()),I(o,"height",n()),I(c,"fill",r()?"currentColor":"#e5e7eb")}),m(a,o)}const oh=ze({project:null,tag:null,priority:null,date:null});var sh=C('<textarea class="review-textarea svelte-1na66lg"></textarea>');function lo(a,t){ut(t,!0);const n=j(gt);let r=pa(t,"rows",3,2),o=z(ze(Vt(()=>t.value??"")));St(()=>{const i=t.value??"";Vt(()=>{i!==e(o)&&v(o,i,!0)})});function c(){const i=e(o).trim();i===""?t.value&&t.onDelete&&t.onDelete():i!==(t.value??"")&&t.onSave(i)}var l=sh();E(()=>{I(l,"placeholder",t.placeholder??e(n).common.reviewPlaceholder),I(l,"aria-label",t.ariaLabel??t.placeholder??e(n).common.reviewPlaceholder),I(l,"rows",r())}),kt("blur",l,c),wt(l,()=>e(o),i=>v(o,i)),m(a,l),vt()}const ji=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function Fi(){return ji[Math.floor(Math.random()*ji.length)]}const Cc=ze({n:0});function Ai(){Cc.n+=1}var ih=C('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985"><!></button></div></div>');function lh(a,t){ut(t,!0);const n=j(gt);let r=z(ze([])),o=z(ze(new Set)),c=z(null);async function l(){try{v(r,await yc(),!0)}catch{v(r,[],!0)}}rn(()=>{l()}),St(()=>{Cc.n,l()}),St(()=>{var g;if(!e(c))if(e(r).length>0){const h=e(r)[0];v(c,{text:h.text,author:(g=h.author)!=null&&g.trim()?h.author:e(n).settings.motto.defaultAuthor},!0);const b=new Set(e(o));b.add(h.id),v(o,b,!0)}else v(c,Fi(),!0)});function i(){var g;if(e(r).length>0){let h=e(r).filter(S=>!e(o).has(S.id));h.length===0&&(v(o,new Set,!0),h=e(r));const b=h[0];v(c,{text:b.text,author:(g=b.author)!=null&&g.trim()?b.author:e(n).settings.motto.defaultAuthor},!0);const x=new Set(e(o));x.add(b.id),v(o,x,!0)}else v(c,Fi(),!0)}var u=Oe(),f=Fe(u);{var _=g=>{var h=ih(),b=s(h),x=s(b),S=s(x);tc(S,{size:20});var T=d(x,2),M=s(T),R=s(M),w=d(M,2),A=s(w),k=d(T,2),D=s(k);rv(D,{size:14}),E(()=>{p(R,e(c).text),p(A,`—— ${e(c).author??""}`),I(k,"aria-label",e(n).timer.mottoRefresh),I(k,"title",e(n).timer.mottoRefresh)}),W("click",k,i),m(g,h)};oe(f,g=>{e(c)&&g(_)})}m(a,u),vt()}yt(["click"]);var ch=C('<div class="empty svelte-1qmsx7e"> </div>'),dh=C('<button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-main svelte-1qmsx7e"><span class="item-title svelte-1qmsx7e"> </span> <span class="item-sub svelte-1qmsx7e"> </span></span> <span class="pri-dot svelte-1qmsx7e"></span></button>'),uh=C('<button type="button" class="backdrop svelte-1qmsx7e" aria-hidden="true" tabindex="-1"></button> <div class="menu svelte-1qmsx7e" role="listbox"><button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-title svelte-1qmsx7e"> </span></button> <!> <!></div>',1),vh=C('<div class="selector svelte-1qmsx7e"><button type="button" class="trigger svelte-1qmsx7e" aria-haspopup="listbox"><span class="trigger-label svelte-1qmsx7e"> </span> <!></button> <!></div>');function fh(a,t){ut(t,!0);const n=j(gt);let r=z(!1);const o={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};function c(b){t.onSelect(b),v(r,!1)}var l=vh(),i=s(l),u=s(i),f=s(u),_=d(u,2);{let b=j(()=>"chev"+(e(r)?" open":""));Un(_,{size:16,get class(){return e(b)}})}var g=d(i,2);{var h=b=>{var x=uh(),S=Fe(x),T=d(S,2),M=s(T),R=s(M),w=s(R);{var A=ne=>{za(ne,{size:16})};oe(w,ne=>{t.activeTask||ne(A)})}var k=d(R,2),D=s(k),Y=d(M,2);{var he=ne=>{var Z=ch(),G=s(Z);E(()=>p(G,e(n).timer.noTodoTask)),m(ne,Z)};oe(Y,ne=>{t.tasks.length===0&&ne(he)})}var le=d(Y,2);je(le,17,()=>t.tasks,ne=>ne.id,(ne,Z)=>{var G=dh(),ie=s(G),F=s(ie);{var L=O=>{za(O,{size:16})};oe(F,O=>{var $;(($=t.activeTask)==null?void 0:$.id)===e(Z).id&&O(L)})}var re=d(ie,2),be=s(re),ye=s(be),H=d(be,2),ce=s(H),xe=d(re,2);E(()=>{var O;I(G,"aria-selected",((O=t.activeTask)==null?void 0:O.id)===e(Z).id),p(ye,e(Z).title),p(ce,`${e(Z).completed_pomodoros??0??""}/${e(Z).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`),Rt(xe,`background-color: ${o[e(Z).priority??"none"]??o.none??""}`)}),W("click",G,()=>c(e(Z))),m(ne,G)}),E(()=>{I(M,"aria-selected",t.activeTask===null),p(D,e(n).timer.noSpecificTask)}),W("click",S,()=>v(r,!1)),W("click",M,()=>c(null)),m(b,x)};oe(g,b=>{e(r)&&b(h)})}E(()=>{I(i,"aria-expanded",e(r)),p(f,t.activeTask?t.activeTask.title:e(n).timer.selectTask)}),W("click",i,()=>v(r,!e(r))),m(a,l),vt()}yt(["click"]);var Ii=C("<option> </option>"),qi=C('<button type="button"> </button>'),hh=C('<button type="button" class="clear svelte-13vcwbh"> </button>'),_h=C('<div class="empty svelte-13vcwbh"> </div>'),ph=C('<button type="button" class="expander svelte-13vcwbh"><!></button>'),gh=C('<span class="expander-placeholder svelte-13vcwbh"></span>'),Go=C('<span class="meta-item svelte-13vcwbh"> </span>'),mh=C('<button type="button" class="start svelte-13vcwbh"><!></button>'),bh=C('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),yh=C('<div class="subs svelte-13vcwbh"></div>'),kh=C('<div><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),wh=C('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh"> </h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh"> </span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh"> </h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project"> </label> <select id="timer-filter-project" class="svelte-13vcwbh"><option> </option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag"> </label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option> </option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function xh(a,t){ut(t,!0);const n=j(gt),r={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let o=z(ze(new Set));function c(V){const y=new Set(e(o));y.has(V)?y.delete(V):y.add(V),v(o,y,!0)}function l(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const i=j(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),u=["high","medium","low"],f=j(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low})),_=["today","tomorrow","this_week"],g=j(()=>({today:e(n).filter.today,tomorrow:e(n).filter.tomorrow,this_week:e(n).filter.thisWeek}));function h(V){var y;return V?((y=t.projects.find(P=>P.id===V))==null?void 0:y.name)??"":""}var b=wh(),x=s(b),S=s(x),T=s(S),M=s(T),R=d(T,2),w=s(R),A=s(w),k=d(w,2),D=s(k),Y=d(S,2),he=s(Y),le=s(he),ne=d(he,2),Z=s(ne),G=s(Z),ie=s(G),F=d(G,2),L=s(F),re=s(L);L.value=L.__value="";var be=d(L);je(be,17,()=>t.projects,V=>V.id,(V,y)=>{var P=Ii(),ae=s(P),J={};E(()=>{p(ae,e(y).name),J!==(J=e(y).id)&&(P.value=(P.__value=e(y).id)??"")}),m(V,P)});var ye;Bt(F);var H=d(Z,2),ce=s(H),xe=s(ce),O=d(ce,2),$=s(O),U=s($);$.value=$.__value="";var ee=d($);je(ee,17,()=>t.tags,V=>V.id,(V,y)=>{var P=Ii(),ae=s(P),J={};E(()=>{p(ae,e(y).name),J!==(J=e(y).id)&&(P.value=(P.__value=e(y).id)??"")}),m(V,P)});var pe;Bt(O);var ke=d(ne,2),ve=s(ke),ge=s(ve),q=d(ve,2);je(q,20,()=>u,V=>V,(V,y)=>{var P=qi();let ae;var J=s(P);E(()=>{ae=Ge(P,1,"opt svelte-13vcwbh",null,ae,{active:t.filter.priority===y}),p(J,e(f)[y])}),W("click",P,()=>t.onFilterChange({priority:t.filter.priority===y?null:y})),m(V,P)});var se=d(q,2),ue=s(se),Se=d(se,2);je(Se,20,()=>_,V=>V,(V,y)=>{var P=qi();let ae;var J=s(P);E(()=>{ae=Ge(P,1,"opt svelte-13vcwbh",null,ae,{active:t.filter.date===y}),p(J,e(g)[y])}),W("click",P,()=>t.onFilterChange({date:t.filter.date===y?null:y})),m(V,P)});var Ne=d(ke,2);{var Ie=V=>{var y=hh(),P=s(y);E(()=>p(P,e(n).timer.clearFilter)),W("click",y,l),m(V,y)};oe(Ne,V=>{e(i)&&V(Ie)})}var He=d(x,2),B=s(He);{var fe=V=>{var y=_h(),P=s(y);E(()=>p(P,e(n).timer.noTask)),m(V,y)};oe(B,V=>{t.tasks.length===0&&V(fe)})}var we=d(B,2);je(we,17,()=>t.tasks,V=>V.id,(V,y)=>{const P=j(()=>e(y).status==="completed"),ae=j(()=>{var Be;return(((Be=e(y).subtasks)==null?void 0:Be.length)??0)>0}),J=j(()=>e(o).has(e(y).id)),Q=j(()=>e(ae)?(e(y).subtasks??[]).filter(Be=>Be.is_completed).length:0),K=j(()=>h(e(y).project_id));var X=kh();let Pe;var De=s(X),Ue=s(De);{var mt=Be=>{var Ae=ph(),it=s(Ae);{var te=Le=>{Un(Le,{size:14})},Me=Le=>{Wn(Le,{size:14})};oe(it,Le=>{e(J)?Le(te):Le(Me,-1)})}E(()=>I(Ae,"aria-label",e(J)?e(n).timer.collapseSubtasks:e(n).timer.expandSubtasks)),W("click",Ae,()=>c(e(y).id)),m(Be,Ae)},dt=Be=>{var Ae=gh();m(Be,Ae)};oe(Ue,Be=>{e(ae)?Be(mt):Be(dt,-1)})}var ft=d(Ue,2),rt=d(ft,2),We=s(rt);let me;var _e=s(We),et=d(We,2),tt=s(et),ht=s(tt),nt=d(tt,2);{var Pt=Be=>{var Ae=Go(),it=s(Ae);E(()=>{var te;return p(it,`· ${e(Q)??""}/${((te=e(y).subtasks)==null?void 0:te.length)??0??""}`)}),m(Be,Ae)};oe(nt,Be=>{e(ae)&&Be(Pt)})}var jt=d(nt,2);{var Lt=Be=>{var Ae=Go(),it=s(Ae);E(()=>p(it,e(K))),m(Be,Ae)};oe(jt,Be=>{e(K)&&Be(Lt)})}var zt=d(jt,2);{var Ve=Be=>{var Ae=Go(),it=s(Ae);E(te=>p(it,te),[()=>e(y).due_date.slice(0,10)]),m(Be,Ae)};oe(zt,Be=>{e(y).due_date&&Be(Ve)})}var pt=d(rt,2);{var lt=Be=>{var Ae=mh(),it=s(Ae);ro(it,{size:10,color:"#fff",fill:"#fff"}),E(()=>{I(Ae,"aria-label",e(n).timer.startTooltip),I(Ae,"title",e(n).timer.startTooltip)}),W("click",Ae,()=>t.onStartTask(e(y))),m(Be,Ae)};oe(pt,Be=>{e(P)||Be(lt)})}var Ht=d(De,2);{var Ct=Be=>{var Ae=yh();je(Ae,21,()=>e(y).subtasks??[],it=>it.id,(it,te)=>{var Me=bh();let Le;var Ye=s(Me),Mt=d(Ye,2),Te=s(Mt);E(()=>{Le=Ge(Me,1,"sub-row svelte-13vcwbh",null,Le,{done:e(te).is_completed}),Jl(Ye,e(te).is_completed),p(Te,e(te).title)}),W("change",Ye,$e=>t.onToggleSubtask(e(te).id,$e.currentTarget.checked)),m(it,Me)}),m(Be,Ae)};oe(Ht,Be=>{e(ae)&&e(J)&&Be(Ct)})}E(()=>{Pe=Ge(X,1,"task-card svelte-13vcwbh",null,Pe,{active:e(y).id===t.activeTaskId}),Rt(ft,`background-color: ${r[e(y).priority||"none"]??r.none??""}`),me=Ge(We,1,"title svelte-13vcwbh",null,me,{done:e(P)}),p(_e,e(y).title),p(ht,`${e(y).completed_pomodoros??0??""}/${e(y).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`)}),m(V,X)}),E(()=>{p(M,e(n).timer.todayFocus),p(A,t.todayMinutes),p(D,e(n).timer.minute),p(le,e(n).timer.taskList),p(ie,e(n).filter.project),p(re,e(n).filter.all),ye!==(ye=t.filter.project??"")&&(F.value=(F.__value=t.filter.project??"")??"",At(F,t.filter.project??"")),p(xe,e(n).filter.tag),p(U,e(n).filter.all),pe!==(pe=t.filter.tag??"")&&(O.value=(O.__value=t.filter.tag??"")??"",At(O,t.filter.tag??"")),p(ge,e(n).filter.priority),p(ue,e(n).filter.date)}),W("change",F,V=>t.onFilterChange({project:V.currentTarget.value||null})),W("change",O,V=>t.onFilterChange({tag:V.currentTarget.value||null})),m(a,b),vt()}yt(["change","click"]);var Sh=C('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt"> </h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button"> </button></div></div>');function Th(a,t){ut(t,!0);const n=j(gt);function r(u){u.target===u.currentTarget&&t.onClose()}function o(u){u.key==="Escape"&&t.onClose()}var c=Oe();kt("keydown",ls,function(...u){var f;(f=t.open?o:void 0)==null||f.apply(this,u)});var l=Fe(c);{var i=u=>{var f=Sh(),_=s(f),g=d(s(_),2),h=s(g),b=d(g,2),x=s(b),S=d(b,2),T=s(S);E(()=>{p(h,e(n).timer.modalTitle),p(x,t.message),p(T,e(n).common.confirm)}),W("click",f,r),W("click",S,function(...M){var R;(R=t.onClose)==null||R.apply(this,M)}),m(u,f)};oe(l,u=>{t.open&&u(i)})}m(a,c),vt()}yt(["click"]);var Dh=C('<span class="pomo-count svelte-17qnxlg"> </span>'),Ph=C('<div class="error svelte-17qnxlg" role="alert"> </div>'),Mh=C('<button class="btn pause svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Eh=C('<button class="btn primary svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Ch=C('<button class="btn primary svelte-17qnxlg"><!> </button>'),Nh=C('<div class="layout page-veil svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist"><button role="tab"> </button> <button role="tab"> </button> <button role="tab"> </button></div> <!> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><defs class="svelte-17qnxlg"><linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%" class="svelte-17qnxlg"><stop offset="0%" stop-color="var(--color-accent-400, #e29676)" class="svelte-17qnxlg"></stop><stop offset="100%" stop-color="var(--color-accent-600, #c9552d)" class="svelte-17qnxlg"></stop></linearGradient></defs><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none" stroke-linecap="round" stroke="url(#ring-gradient)"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-row svelte-17qnxlg"><span class="mode-label svelte-17qnxlg"> </span> <!></div></div></div> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> <b class="svelte-17qnxlg"> </b> </div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg"> </div> <!></div> <!></div></div> <!> <!></div>');function Ri(a,t){ut(t,!0);let n=z(ze([])),r=z(ze([])),o=z(ze([])),c=z(ze([])),l=z(null),i=z(0),u=z(null),f=z(!1);const _=oh,g=j(Us),h=j(gt),b=j(()=>{var Me;const te=Va();return e(g).mode==="focus"?(((Me=e(g).activeTask)==null?void 0:Me.pomodoro_duration)??te.focusDuration)*60:e(g).mode==="short_break"?te.shortBreakDuration*60:te.longBreakDuration*60}),x=j(()=>e(b)>0?1-e(g).secondsLeft/e(b):0),S=j(()=>Math.floor(e(g).secondsLeft/60)),T=j(()=>e(g).secondsLeft%60),M=j(()=>`${String(e(S)).padStart(2,"0")}:${String(e(T)).padStart(2,"0")}`),R=j(()=>e(g).activeTask),w=j(()=>!e(g).running&&e(g).sessionId===null&&!e(f)),A=j(()=>e(g).mode==="focus"),k=j(()=>e(g).mode==="focus"?e(h).mode.focusing:e(g).mode==="short_break"?e(h).mode.shortBreak:e(h).mode.longBreak);function D(){const te=new Date,Me=new Date(te.getFullYear(),te.getMonth(),te.getDate(),0,0,0,0),Le=new Date(te.getFullYear(),te.getMonth(),te.getDate()+1,0,0,0,0);return{startMs:Me.getTime(),endMs:Le.getTime()}}function Y(){const te=new Date,Me=new Date(te.getFullYear(),te.getMonth(),1,0,0,0,0),Ye=new Date(te.getFullYear(),te.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:Me.getTime(),monthEndMs:Ye}}function he(){const te=new Date;return`${te.getFullYear()}-${String(te.getMonth()+1).padStart(2,"0")}-${String(te.getDate()).padStart(2,"0")}`}St(()=>{e(g).todayCount,F(),Z(),G()}),St(()=>{e(g).activeTask&&e(g).activeTask.status==="completed"&&Pi(null)});async function le(){try{v(n,await zs(),!0)}catch(te){console.warn("refresh projects",te)}}async function ne(){try{v(r,await Hs(),!0)}catch(te){console.warn("refresh tags",te)}}async function Z(){try{const te=Y(),Me=await Tn({status:null,month_start_ms:te.monthStartMs,month_end_ms:te.monthEndMs,project_id:_.project,tag_id:_.tag,priority:_.priority,date:_.date,limit:null}),Le={high:0,medium:1,low:2,none:3};v(o,Me.sort((Ye,Mt)=>{if(Ye.status!==Mt.status)return Ye.status==="active"?-1:1;const Te=Le[Ye.priority??"none"]??3,$e=Le[Mt.priority??"none"]??3;return Te!==$e?Te-$e:new Date(Ye.created_at??0).getTime()-new Date(Mt.created_at??0).getTime()}),!0)}catch(te){console.warn("refresh tasks",te)}}async function G(){try{const te=await Tn({status:"active",limit:null}),Me={high:0,medium:1,low:2,none:3};v(c,te.sort((Le,Ye)=>{const Mt=Me[Le.priority??"none"]??3,Te=Me[Ye.priority??"none"]??3;return Mt!==Te?Mt-Te:new Date(Le.created_at??0).getTime()-new Date(Ye.created_at??0).getTime()}),!0)}catch(te){console.warn("refresh active tasks",te)}}async function ie(){try{const te=await Ti(he());v(l,(te==null?void 0:te.content)??null,!0)}catch(te){console.warn("refresh review",te)}}async function F(){try{const te=D();v(i,await Kv(te.startMs,te.endMs),!0)}catch(te){console.warn("refresh minutes",te)}}St(()=>{_.project,_.tag,_.priority,_.date,Z()}),rn(async()=>{await Promise.all([le(),ne(),Z(),G(),ie(),F()])});async function L(){var te,Me,Le;if(e(w)){v(f,!0),v(u,null);try{await Gn(((te=e(R))==null?void 0:te.id)??null,((Me=e(R))==null?void 0:Me.project_id)??null,((Le=e(R))==null?void 0:Le.pomodoro_duration)??void 0)}catch(Ye){v(u,String(Ye),!0)}finally{v(f,!1)}}}async function re(){try{await Ws(!1)}catch(te){v(u,String(te),!0)}}function be(te){so(te)}async function ye(te){try{await _f(te)}catch(Me){v(u,String(Me),!0)}}function H(te){Pi(te)}async function ce(te,Me){try{const Le=await Promise.all(e(o).map(Mt=>bc(Mt.id)));let Ye=null;for(const Mt of Le){const Te=Mt.find($e=>$e.id===te);if(Te){Ye=Te;break}}if(!Ye)return;await ps({...Ye,is_completed:Me}),await Z(),await F()}catch(Le){console.warn("toggle subtask",Le)}}async function xe(te){try{const Me=he(),Le=await Ti(Me),Ye=Le?{...Le,content:te}:{id:crypto.randomUUID(),date:Me,content:te,updated_at:new Date().toISOString()};await pc(Ye),v(l,te,!0)}catch(Me){console.warn("save review",Me)}}async function O(){try{await gc(he()),v(l,null)}catch(te){console.warn("delete review",te)}}const $=280,U=12,ee=($-U)/2,pe=2*Math.PI*ee,ke=j(()=>pe*(1-e(x)));var ve=Nh();Fr("17qnxlg",te=>{Cr(()=>{Qn.title=e(h).page.timer??""})});var ge=s(ve),q=s(ge),se=s(q),ue=s(se);let Se;var Ne=s(ue),Ie=d(ue,2);let He;var B=s(Ie),fe=d(Ie,2);let we;var V=s(fe),y=d(se,2);{var P=te=>{fh(te,{get tasks(){return e(c)},get activeTask(){return e(R)},onSelect:H})};oe(y,te=>{e(A)&&te(P)})}var ae=d(y,2),J=s(ae);I(J,"width",$),I(J,"height",$),I(J,"viewBox","0 0 280 280");var Q=d(s(J));I(Q,"cx",$/2),I(Q,"cy",$/2),I(Q,"r",ee),I(Q,"stroke-width",U);var K=d(Q);I(K,"cx",$/2),I(K,"cy",$/2),I(K,"r",ee),I(K,"stroke-width",U),I(K,"stroke-dasharray",pe),I(K,"transform","rotate(-90 140 140)");var X=d(J,2),Pe=s(X),De=s(Pe),Ue=d(Pe,2),mt=s(Ue),dt=s(mt),ft=d(mt,2);{var rt=te=>{var Me=Dh(),Le=s(Me);E(()=>{var Ye,Mt;return p(Le,`${((Ye=e(R))==null?void 0:Ye.completed_pomodoros)??0??""}/${((Mt=e(R))==null?void 0:Mt.estimated_pomodoros)??0??""} ${e(h).timer.pomodoros??""}`)}),m(te,Me)};oe(ft,te=>{e(A)&&te(rt)})}var We=d(ae,2);{var me=te=>{var Me=Ph(),Le=s(Me);E(()=>p(Le,`⚠ ${e(u)??""}`)),m(te,Me)};oe(We,te=>{e(u)&&te(me)})}var _e=d(We,2),et=s(_e);{var tt=te=>{var Me=Mh(),Le=Fe(Me),Ye=s(Le);nv(Ye,{size:18,fill:"currentColor"});var Mt=d(Ye),Te=d(Le,2),$e=s(Te);cv($e,{size:16});var bt=d($e);E(()=>{p(Mt,` ${e(h).timer.pause??""}`),p(bt,` ${e(h).timer.skip??""}`)}),W("click",Le,function(...Kt){Oo==null||Oo.apply(this,Kt)}),W("click",Te,re),m(te,Me)},ht=te=>{var Me=Eh(),Le=Fe(Me),Ye=s(Le);ro(Ye,{size:18,fill:"currentColor"});var Mt=d(Ye),Te=d(Le,2),$e=s(Te);dv($e,{size:16});var bt=d($e);E(()=>{p(Mt,` ${e(h).timer.resume??""}`),p(bt,` ${e(h).timer.abandon??""}`)}),W("click",Le,function(...Kt){Bo==null||Bo.apply(this,Kt)}),W("click",Te,re),m(te,Me)},nt=te=>{var Me=Ch(),Le=s(Me);ro(Le,{size:18,fill:"currentColor"});var Ye=d(Le);E(()=>{Me.disabled=!e(w),p(Ye,` ${(e(f)?e(h).timer.starting:e(A)?e(h).timer.start:e(h).timer.startBreak)??""}`)}),W("click",Me,L),m(te,Me)};oe(et,te=>{e(g).running?te(tt):e(g).sessionId?te(ht,1):te(nt,-1)})}var Pt=d(_e,2),jt=d(s(Pt)),Lt=d(jt),zt=s(Lt),Ve=d(Lt),pt=d(Pt,2),lt=s(pt),Ht=s(lt),Ct=d(lt,2);lo(Ct,{get value(){return e(l)},get placeholder(){return e(h).timer.reviewPlaceholder},rows:2,onSave:xe,onDelete:O});var Be=d(pt,2);lh(Be,{});var Ae=d(ge,2);{let te=j(()=>{var Me;return((Me=e(g).activeTask)==null?void 0:Me.id)??null});xh(Ae,{get todayMinutes(){return e(i)},get projects(){return e(n)},get tags(){return e(r)},get tasks(){return e(o)},get activeTaskId(){return e(te)},get filter(){return _},onFilterChange:Me=>Object.assign(_,Me),onStartTask:ye,onToggleSubtask:ce})}var it=d(Ae,2);{let te=j(()=>e(g).pendingCompletionMessage!==null),Me=j(()=>e(g).pendingCompletionMessage??"");Th(it,{get open(){return e(te)},get message(){return e(Me)},get onClose(){return bf}})}E(()=>{I(se,"aria-label",e(h).timer.modeTabsAria),Se=Ge(ue,1,"mode-tab svelte-17qnxlg",null,Se,{active:e(g).mode==="focus"}),I(ue,"aria-selected",e(g).mode==="focus"),p(Ne,e(h).mode.focus),He=Ge(Ie,1,"mode-tab svelte-17qnxlg",null,He,{active:e(g).mode==="short_break"}),I(Ie,"aria-selected",e(g).mode==="short_break"),p(B,e(h).mode.shortBreak),we=Ge(fe,1,"mode-tab svelte-17qnxlg",null,we,{active:e(g).mode==="long_break"}),I(fe,"aria-selected",e(g).mode==="long_break"),p(V,e(h).mode.longBreak),I(K,"stroke-dashoffset",e(ke)),p(De,e(M)),p(dt,e(k)),p(jt,` ${e(h).timer.todayDone??""} `),p(zt,e(g).todayCount),p(Ve,` ${e(h).timer.pomodoroUnit??""}`),p(Ht,e(h).timer.reviewTitle)}),W("click",ue,()=>be("focus")),W("click",Ie,()=>be("short_break")),W("click",fe,()=>be("long_break")),m(a,ve),vt()}yt(["click"]);async function jh(a={}){return typeof a=="object"&&Object.freeze(a),await qe("plugin:dialog|save",{options:a})}//! 截止时间（due_date）相关工具。
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
function co(a){return!!a&&a.includes("T")}function Jt(a){return(a||"").slice(0,10)}function Fa(){const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Fh(){const a=new Date;return`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`}function ks(a){return`${Jt(a)||Fa()}T${Fh()}`}function $r(){const a=new Date;return a.setDate(a.getDate()+1),`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Li(a){if(!a)return"";try{const t=new Date(a);if(isNaN(t.getTime()))return"";const n=t.getTimezoneOffset();return new Date(t.getTime()-n*6e4).toISOString().slice(0,16)}catch{return""}}function ws(a){if(!a)return null;try{const t=new Date(a);return isNaN(t.getTime())?null:t.toISOString()}catch{return null}}var Ah=C('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <span class="filter-stats svelte-qbpxhc"> </span></button>'),Ih=C('<button type="button" class="add-root svelte-qbpxhc"><!></button>'),qh=C('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Rh=C('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Lh=C('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),Oh=C('<span class="expand-spacer svelte-qbpxhc"></span>'),Bh=C('<button type="button" class="more-btn svelte-qbpxhc"><!></button>'),zh=C('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),Hh=C('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Oi=C('<button type="button" class="ctx-item svelte-qbpxhc"><!> </button>'),Uh=C('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> </button>'),Wh=C('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),Yh=C('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),Gh=C('<div class="empty-hint svelte-qbpxhc"> </div>'),Vh=C('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),Kh=C('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> </button> <!></div> <!></div></aside>');function $h(a,t){ut(t,!0);const n=j(gt);let r=pa(t,"search",3,""),o=z(!0),c=z(ze(new Set)),l=z(null),i=z(null),u=z(""),f=z(null),_=z("");function g(O){const $=O.getDay(),U=$===0?-6:1-$,ee=new Date(O);return ee.setDate(ee.getDate()+U),ee.setHours(0,0,0,0),ee}function h(O){const $=g(O),U=new Date($);return U.setDate(U.getDate()+6),U.setHours(23,59,59,999),U}function b(O,$){if($==="journal")return{timeStr:"",count:0};const U=Fa(),ee=$r(),pe=g(new Date),ke=h(new Date);let ve=O;$==="today"&&(ve=O.filter(Se=>Jt(Se.due_date)===U)),$==="tomorrow"&&(ve=O.filter(Se=>Jt(Se.due_date)===ee)),$==="week"&&(ve=O.filter(Se=>{if(!Se.due_date)return!1;const Ne=new Date(Se.due_date);return Ne>=pe&&Ne<=ke})),$==="planned"&&(ve=O.filter(Se=>Se.due_date!==null&&Se.due_date!==void 0)),$==="completed"&&(ve=O.filter(Se=>Se.status==="completed"));const ge=ve.reduce((Se,Ne)=>Se+(Ne.estimated_pomodoros||0)*(Ne.pomodoro_duration||25),0),q=Math.floor(ge/60),se=ge%60;return{timeStr:q>0?`${q}h ${se}m`:`${se}m`,count:ve.length}}function x(O){const $=new Map,U=[];for(const pe of O)$.set(pe.id,{...pe,children:[],depth:0});for(const pe of O){const ke=$.get(pe.id);ke&&(pe.parent_id&&$.has(pe.parent_id)?$.get(pe.parent_id).children.push(ke):U.push(ke))}const ee=(pe,ke)=>{for(const ve of pe)ve.depth=ke,ee(ve.children,ke+1)};return ee(U,0),U}function S(O,$){const U=[];for(const ee of O)U.push(ee),$.has(ee.id)&&ee.children.length>0&&U.push(...S(ee.children,$));return U}const T=j(()=>x(t.projects)),M=j(()=>S(e(T),e(c))),R=j(()=>[{key:"today",icon:uv,label:e(n).filter.today},{key:"tomorrow",icon:vv,label:e(n).filter.tomorrow},{key:"week",icon:Xl,label:e(n).filter.week},{key:"planned",icon:Gu,label:e(n).sidebar.planned},{key:"completed",icon:fs,label:e(n).sidebar.completed},{key:"journal",icon:Vu,label:e(n).sidebar.journal}]),w=j(()=>t.selectedProject===null?t.filter:"");function A(O){const $=new Set(e(c));$.has(O)?$.delete(O):$.add(O),v(c,$,!0)}function k(O){t.onSetFilter(O),t.onSelectProject(null)}var D=Kh(),Y=s(D),he=s(Y);iv(he,{size:14,class:"search-icon"});var le=d(he,2),ne=d(Y,2);je(ne,21,()=>e(R),O=>O.key,(O,$)=>{const U=j(()=>b(t.tasks,e($).key)),ee=j(()=>e(w)===e($).key);var pe=Ah();let ke;var ve=s(pe),ge=s(ve);jr(ge,()=>e($).icon,(Se,Ne)=>{Ne(Se,{size:16})});var q=d(ge),se=d(ve,2),ue=s(se);E(()=>{ke=Ge(pe,1,"filter-btn svelte-qbpxhc",null,ke,{active:e(ee)}),p(q,` ${e($).label??""}`),p(ue,`${e(U).timeStr??""} ${e(U).count??""}`)}),W("click",pe,()=>k(e($).key)),m(O,pe)});var Z=d(ne,2),G=s(Z),ie=s(G),F=s(ie);{var L=O=>{Un(O,{size:14})},re=O=>{Wn(O,{size:14})};oe(F,O=>{e(o)?O(L):O(re,-1)})}var be=d(F),ye=d(ie,2);{var H=O=>{var $=Ih(),U=s($);Yn(U,{size:14}),E(()=>{I($,"aria-label",e(n).sidebar.addRootAria),I($,"title",e(n).sidebar.addListTitle)}),W("click",$,()=>{v(f,"root"),v(_,"")}),m(O,$)};oe(ye,O=>{t.onCreateProject&&O(H)})}var ce=d(G,2);{var xe=O=>{var $=Vh(),U=s($);{var ee=ge=>{var q=qh(),se=s(q);gn(se,!0),E(()=>I(se,"placeholder",e(n).sidebar.listNamePlaceholder)),W("keydown",se,ue=>{if(ue.key==="Enter"){const Se=e(_).trim();Se&&t.onCreateProject&&t.onCreateProject(Se,null),v(f,null),v(_,"")}ue.key==="Escape"&&(v(f,null),v(_,""))}),kt("blur",se,()=>{const ue=e(_).trim();ue&&t.onCreateProject&&t.onCreateProject(ue,null),v(f,null),v(_,"")}),wt(se,()=>e(_),ue=>v(_,ue)),m(ge,q)};oe(U,ge=>{e(f)==="root"&&t.onCreateProject&&ge(ee)})}var pe=d(U,2);je(pe,17,()=>e(M),ge=>ge.id,(ge,q)=>{const se=j(()=>t.selectedProject===e(q).id),ue=j(()=>e(l)===e(q).id),Se=j(()=>e(i)===e(q).id),Ne=j(()=>e(q).children.length>0),Ie=j(()=>e(c).has(e(q).id));var He=Yh(),B=s(He);{var fe=J=>{var Q=Rh(),K=s(Q);gn(K,!0),W("keydown",K,X=>{if(X.key==="Enter"){const Pe=e(u).trim();Pe&&t.onUpdateProject&&t.onUpdateProject(e(q).id,Pe),v(i,null),v(u,"")}X.key==="Escape"&&(v(i,null),v(u,""))}),kt("blur",K,()=>{const X=e(u).trim();X&&t.onUpdateProject&&t.onUpdateProject(e(q).id,X),v(i,null),v(u,"")}),wt(K,()=>e(u),X=>v(u,X)),m(J,Q)},we=J=>{var Q=zh();let K;var X=s(Q),Pe=s(X);{var De=me=>{var _e=Lh(),et=s(_e);{var tt=nt=>{Un(nt,{size:12})},ht=nt=>{Wn(nt,{size:12})};oe(et,nt=>{e(Ie)?nt(tt):nt(ht,-1)})}E(()=>I(_e,"aria-label",e(Ie)?e(n).form.collapse:e(n).common.expand)),W("click",_e,nt=>{nt.stopPropagation(),A(e(q).id)}),m(me,_e)},Ue=me=>{var _e=Oh();m(me,_e)};oe(Pe,me=>{e(Ne)?me(De):me(Ue,-1)})}var mt=d(Pe,2);{let me=j(()=>e(q).color||"var(--color-accent)");Xu(mt,{size:14,get color(){return e(me)}})}var dt=d(mt,2),ft=s(dt),rt=d(X,2);{var We=me=>{var _e=Bh(),et=s(_e);Ju(et,{size:14}),E(()=>I(_e,"aria-label",e(n).sidebar.moreActions)),W("click",_e,tt=>{tt.stopPropagation(),v(l,e(ue)?null:e(q).id,!0)}),m(me,_e)};oe(rt,me=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&e(q).depth<2)&&me(We)})}E(()=>{K=Ge(Q,1,"node-row svelte-qbpxhc",null,K,{active:e(se)}),p(ft,e(q).name)}),W("click",X,()=>{t.onSelectProject(e(q).id),t.onSetFilter("")}),W("keydown",X,me=>{(me.key==="Enter"||me.key===" ")&&(me.preventDefault(),t.onSelectProject(e(q).id),t.onSetFilter(""))}),m(J,Q)};oe(B,J=>{e(Se)?J(fe):J(we,-1)})}var V=d(B,2);{var y=J=>{var Q=Hh(),K=s(Q);gn(K,!0),E(()=>{Rt(Q,`padding-left: ${(e(q).depth+1)*12+12}px;`),I(K,"placeholder",e(q).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)}),W("keydown",K,X=>{if(X.key==="Enter"){const Pe=e(_).trim();Pe&&t.onCreateProject&&t.onCreateProject(Pe,e(q).id),v(f,null),v(_,"");const De=new Set(e(c));De.add(e(q).id),v(c,De,!0)}X.key==="Escape"&&(v(f,null),v(_,""))}),kt("blur",K,()=>{const X=e(_).trim();X&&t.onCreateProject&&t.onCreateProject(X,e(q).id),v(f,null),v(_,"");const Pe=new Set(e(c));Pe.add(e(q).id),v(c,Pe,!0)}),wt(K,()=>e(_),X=>v(_,X)),m(J,Q)};oe(V,J=>{e(f)===e(q).id&&t.onCreateProject&&J(y)})}var P=d(V,2);{var ae=J=>{var Q=Wh(),K=s(Q);{var X=dt=>{var ft=Oi(),rt=s(ft);Yn(rt,{size:12});var We=d(rt);E(()=>p(We,` ${e(n).settings.list.addChild??""}`)),W("click",ft,()=>{v(f,e(q).id,!0),v(_,""),v(l,null)}),m(dt,ft)};oe(K,dt=>{t.onCreateProject&&e(q).depth<2&&dt(X)})}var Pe=d(K,2);{var De=dt=>{var ft=Oi(),rt=s(ft);Os(rt,{size:12});var We=d(rt);E(()=>p(We,` ${e(n).settings.list.edit??""}`)),W("click",ft,()=>{v(u,e(q).name,!0),v(i,e(q).id,!0),v(l,null)}),m(dt,ft)};oe(Pe,dt=>{t.onUpdateProject&&dt(De)})}var Ue=d(Pe,2);{var mt=dt=>{var ft=Uh(),rt=s(ft);yo(rt,{size:12});var We=d(rt);E(()=>p(We,` ${e(n).settings.list.del??""}`)),W("click",ft,()=>{t.onDeleteProject(e(q).id),v(l,null)}),m(dt,ft)};oe(Ue,dt=>{t.onDeleteProject&&dt(mt)})}m(J,Q)};oe(P,J=>{e(ue)&&!e(Se)&&J(ae)})}E(()=>Rt(He,`padding-left: ${e(q).depth*12}px;`)),m(ge,He)});var ke=d(pe,2);{var ve=ge=>{var q=Gh(),se=s(q);E(()=>p(se,e(n).sidebar.emptyHint)),m(ge,q)};oe(ke,ge=>{t.projects.length===0&&e(f)!=="root"&&ge(ve)})}m(O,$)};oe(ce,O=>{e(o)&&O(xe)})}E(()=>{no(le,r()),I(le,"placeholder",e(n).sidebar.searchTasksPlaceholder),p(be,` ${e(n).task.list??""}`)}),W("input",le,O=>{var $;return($=t.onSearchChange)==null?void 0:$.call(t,O.currentTarget.value)}),W("click",ie,()=>v(o,!e(o))),m(a,D),vt()}yt(["input","click","keydown"]);var Jh=C('<span class="pri-badge svelte-3041n"> </span>'),Qh=C('<span class="tag svelte-3041n"> </span>'),Xh=C('<div class="row-2 svelte-3041n"></div>'),Zh=C("<span></span>"),e_=C('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),t_=C('<span class="due svelte-3041n"> </span>'),a_=C('<button type="button" class="start svelte-3041n"><!></button>'),n_=C('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function Nc(a,t){ut(t,!0);const n=j(gt),r=j(()=>t.task.status==="completed"),o=j(()=>t.task.estimated_pomodoros||0),c=j(()=>t.task.completed_pomodoros||0),l=j(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),i=j(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""})[t.task.priority||"none"]),u=j(()=>t.task.due_date?Jt(t.task.due_date):"");var f=n_();let _;var g=s(f);let h;var b=s(g);{var x=F=>{za(F,{size:12,strokeWidth:3,color:"#fff"})};oe(b,F=>{e(r)&&F(x)})}var S=d(g,2),T=s(S),M=s(T);{var R=F=>{var L=Jh(),re=s(L);E(()=>{Rt(L,`--pri-color: ${e(l)??""}`),p(re,e(i))}),m(F,L)};oe(M,F=>{t.task.priority&&t.task.priority!=="none"&&F(R)})}var w=d(M,2),A=s(w),k=d(T,2);{var D=F=>{var L=Xh();je(L,21,()=>t.task.tags.slice(0,3),re=>re.id,(re,be)=>{var ye=Qh(),H=s(ye);E(()=>p(H,`#${e(be).name??""}`)),m(re,ye)}),m(F,L)};oe(k,F=>{t.task.tags&&t.task.tags.length>0&&F(D)})}var Y=d(k,2),he=s(Y);{var le=F=>{var L=e_(),re=s(L);je(re,21,()=>Array.from({length:Math.min(e(o),8)}),Ha,(H,ce,xe)=>{var O=Zh();let $;E(()=>$=Ge(O,1,"dot svelte-3041n",null,$,{filled:xe<e(c)})),m(H,O)});var be=d(re,2),ye=s(be);E(()=>p(ye,`${e(c)??""}/${e(o)??""} ${e(n).timer.pomodoros??""}`)),m(F,L)};oe(he,F=>{e(o)>0&&F(le)})}var ne=d(he,2);{var Z=F=>{var L=t_(),re=s(L);E(()=>p(re,e(u))),m(F,L)};oe(ne,F=>{e(u)&&F(Z)})}var G=d(S,2);{var ie=F=>{var L=a_(),re=s(L);ro(re,{size:13,color:"#fff",fill:"#fff"}),E(()=>{I(L,"aria-label",e(n).task.startTooltip),I(L,"title",e(n).task.startTooltip)}),W("click",L,be=>{var ye;be.stopPropagation(),(ye=t.onStart)==null||ye.call(t,t.task)}),m(F,L)};oe(G,F=>{!e(r)&&t.onStart&&F(ie)})}E(()=>{_=Ge(f,1,"task-card svelte-3041n",null,_,{selected:t.selected,done:e(r)}),I(f,"aria-label",t.task.title),h=Ge(g,1,"check svelte-3041n",null,h,{checked:e(r)}),I(g,"aria-label",e(r)?e(n).common.ariaMarkUndone:e(n).common.ariaMarkDone),p(A,t.task.title)}),W("click",f,()=>t.onSelect(t.task)),W("keydown",f,F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),t.onSelect(t.task))}),W("click",g,F=>{F.stopPropagation(),t.onToggle(t.task.id)}),m(a,f),vt()}yt(["click","keydown"]);//! 清单(项目)树 → 下拉选项平铺 —— v1 TaskForm/TaskDetailPanel 共用逻辑。
//!
//! 规则(v1 getProjectTreeOptions):
//!   - 深度优先遍历,子清单缩进一级(depth 供前端渲染 `'　'.repeat(depth)`)
//!   - 有子清单的父节点 `disabled: true`(任务只能挂到叶子清单)
function jc(a){const t=new Map;for(const c of a)t.set(c.id,{...c,children:[]});const n=[];for(const c of a)c.parent_id&&t.has(c.parent_id)?t.get(c.parent_id).children.push(c.id):n.push(c.id);const r=[],o=(c,l)=>{const i=t.get(c),u=i.children.length>0;r.push({id:i.id,name:i.name,depth:l,disabled:u});for(const f of i.children)o(f,l+1)};for(const c of n)o(c,0);return r}var r_=C('<div class="empty svelte-q02l1n"> </div>'),o_=C('<span class="check svelte-q02l1n">✓</span>'),s_=C('<button type="button"><!> <span class="name svelte-q02l1n"> </span></button>'),i_=C('<div class="chips svelte-q02l1n" role="group"></div>');function l_(a,t){ut(t,!0);const n=j(gt),r=j(()=>new Set(t.selected));function o(_){const g=new Set(e(r));g.has(_)?g.delete(_):g.add(_),t.onChange([...g])}function c(_){return`--chip-color: ${_&&_.length>0?_:"var(--color-accent)"};`}var l=Oe(),i=Fe(l);{var u=_=>{var g=r_(),h=s(g);E(()=>p(h,e(n).task.detailNoTagsAvailable)),m(_,g)},f=_=>{var g=i_();je(g,21,()=>t.tags,h=>h.id,(h,b)=>{const x=j(()=>e(r).has(e(b).id));var S=s_();let T;var M=s(S);{var R=k=>{var D=o_();m(k,D)};oe(M,k=>{e(x)&&k(R)})}var w=d(M,2),A=s(w);E(k=>{T=Ge(S,1,"chip svelte-q02l1n",null,T,{on:e(x)}),Rt(S,k),I(S,"aria-pressed",e(x)),p(A,e(b).name)},[()=>c(e(b).color)]),W("click",S,()=>o(e(b).id)),m(h,S)}),E(()=>I(g,"aria-label",e(n).task.tagPickerAria)),m(_,g)};oe(i,_=>{t.tags.length===0?_(u):_(f,-1)})}m(a,l),vt()}yt(["click"]);var c_=C('<input type="text" class="title-input svelte-1t5orp1"/>'),d_=C('<button type="button" class="title-btn svelte-1t5orp1"> </button>'),u_=C('<button type="button" class="icon-btn svelte-1t5orp1"><!></button>'),v_=C('<li><input type="checkbox" class="svelte-1t5orp1"/> <!> <!> <button type="button" class="icon-btn danger svelte-1t5orp1"><!></button></li>');function f_(a,t){ut(t,!0);const n=j(gt);let r=z(!1),o=z(ze(Vt(()=>t.subtask.title))),c=z(null);St(()=>{e(r)||v(o,t.subtask.title,!0)});function l(){v(o,t.subtask.title,!0),v(r,!0),queueMicrotask(()=>{var k;return(k=e(c))==null?void 0:k.focus()})}function i(){const k=e(o).trim();e(r)&&(v(r,!1),k&&k!==t.subtask.title?t.onChange({...t.subtask,title:k}):k||v(o,t.subtask.title,!0))}function u(){v(o,t.subtask.title,!0),v(r,!1)}function f(k){k.key==="Enter"?(k.preventDefault(),i()):k.key==="Escape"&&(k.preventDefault(),u())}function _(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var g=v_();let h;var b=s(g),x=d(b,2);{var S=k=>{var D=c_();ju(D,Y=>v(c,Y),()=>e(c)),E(()=>I(D,"aria-label",e(n).task.editSubtask)),kt("blur",D,i),W("keydown",D,f),wt(D,()=>e(o),Y=>v(o,Y)),m(k,D)},T=k=>{var D=d_(),Y=s(D);E(()=>{I(D,"title",e(n).task.dblclickToEdit),p(Y,t.subtask.title)}),W("dblclick",D,l),m(k,D)};oe(x,k=>{e(r)?k(S):k(T,-1)})}var M=d(x,2);{var R=k=>{var D=u_(),Y=s(D);Os(Y,{size:13}),E(()=>{I(D,"aria-label",e(n).task.editSubtask),I(D,"title",e(n).task.editSubtask)}),W("click",D,l),m(k,D)};oe(M,k=>{e(r)||k(R)})}var w=d(M,2),A=s(w);yo(A,{size:13}),E(()=>{h=Ge(g,1,"row svelte-1t5orp1",null,h,{done:t.subtask.is_completed}),Jl(b,t.subtask.is_completed),I(b,"aria-label",e(n).task.toggleSubtaskAria),I(w,"aria-label",e(n).task.deleteSubtask),I(w,"title",e(n).task.deleteSubtask)}),W("change",b,_),W("click",w,()=>t.onDelete(t.subtask.id)),m(a,g),vt()}yt(["change","keydown","dblclick","click"]);var Bi=C('<button type="button"> </button>'),h_=C('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="weekdays svelte-1h3pyjl"></div></div>'),__=C('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="month-grid svelte-1h3pyjl"></div></div>'),p_=C('<div class="warn svelte-1h3pyjl"> </div>'),g_=C('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl"> </h3> <button type="button" class="close-btn svelte-1h3pyjl"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl"> </label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl"> </label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl"> </label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl"> </label> <select id="rc-type" class="input svelte-1h3pyjl"><option> </option><option> </option><option> </option><option> </option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl"> </button> <button type="button" class="btn-confirm svelte-1h3pyjl"> </button></div></div></div>');function Fc(a,t){ut(t,!0);const n=j(gt);function r(){const w=new Date,A=k=>String(k).padStart(2,"0");return`${w.getFullYear()}-${A(w.getMonth()+1)}-${A(w.getDate())}T${A(w.getHours())}:${A(w.getMinutes())}`}function o(){return`${new Date().getFullYear()}-12-31T23:59`}let c=z(ze(r())),l=z(ze(o())),i=z(1),u=z("week"),f=z(ze([])),_=z(ze([]));St(()=>{if(t.open&&t.initialConfig)try{const w=JSON.parse(t.initialConfig);v(c,w.startDate||r(),!0),v(l,w.endDate||o(),!0),v(i,w.interval||1,!0),v(u,w.type||"week",!0),v(f,w.weekdays||[],!0),v(_,w.monthDays||[],!0)}catch{}});function g(w,A,k){k(w.includes(A)?w.filter(D=>D!==A):[...w,A].sort((D,Y)=>D-Y))}function h(){const w={interval:e(i),type:e(u),startDate:e(c),endDate:e(l)};e(u)==="week"&&(w.weekdays=e(f)),e(u)==="month"&&(w.monthDays=e(_)),t.onConfirm(JSON.stringify(w))}let b=j(()=>e(u)==="week"&&e(f).length===0||e(u)==="month"&&e(_).length===0);function x(w){w.target===w.currentTarget&&t.onClose()}function S(w){w.key==="Escape"&&t.onClose()}var T=Oe(),M=Fe(T);{var R=w=>{var A=g_(),k=s(A),D=s(k),Y=s(D),he=s(Y),le=d(Y,2),ne=s(le);ac(ne,{size:18});var Z=d(D,2),G=s(Z),ie=s(G),F=s(ie),L=s(F),re=d(F,2),be=d(ie,2),ye=s(be),H=s(ye),ce=d(ye,2),xe=d(G,2),O=s(xe),$=s(O),U=s($),ee=d($,2),pe=d(O,2),ke=s(pe),ve=s(ke),ge=d(ke,2),q=s(ge),se=s(q);q.value=q.__value="day";var ue=d(q),Se=s(ue);ue.value=ue.__value="week";var Ne=d(ue),Ie=s(Ne);Ne.value=Ne.__value="month";var He=d(Ne),B=s(He);He.value=He.__value="year";var fe=d(xe,2);{var we=De=>{var Ue=h_(),mt=s(Ue),dt=s(mt),ft=d(mt,2);je(ft,21,()=>e(n).settings.repeatCustom.weekShort,Ha,(rt,We,me)=>{const _e=j(()=>me+1),et=j(()=>e(f).includes(e(_e)));var tt=Bi();let ht;var nt=s(tt);E(()=>{ht=Ge(tt,1,"weekday-btn svelte-1h3pyjl",null,ht,{active:e(et)}),p(nt,e(We))}),W("click",tt,()=>g(e(f),e(_e),Pt=>v(f,Pt,!0))),m(rt,tt)}),E(()=>p(dt,e(n).settings.repeatCustom.weekdays)),m(De,Ue)};oe(fe,De=>{e(u)==="week"&&De(we)})}var V=d(fe,2);{var y=De=>{var Ue=__(),mt=s(Ue),dt=s(mt),ft=d(mt,2);je(ft,20,()=>Array.from({length:31},(rt,We)=>We+1),Ha,(rt,We)=>{const me=j(()=>e(_).includes(We));var _e=Bi();let et;var tt=s(_e);E(()=>{et=Ge(_e,1,"month-btn svelte-1h3pyjl",null,et,{active:e(me)}),p(tt,We)}),W("click",_e,()=>g(e(_),We,ht=>v(_,ht,!0))),m(rt,_e)}),E(()=>p(dt,e(n).settings.repeatCustom.monthDays)),m(De,Ue)};oe(V,De=>{e(u)==="month"&&De(y)})}var P=d(V,2);{var ae=De=>{var Ue=p_(),mt=s(Ue);E(()=>p(mt,e(u)==="week"?e(n).settings.repeatCustom.needPickWeek:e(n).settings.repeatCustom.needPickDay)),m(De,Ue)};oe(P,De=>{e(b)&&De(ae)})}var J=d(Z,2),Q=s(J),K=s(Q),X=d(Q,2),Pe=s(X);E(()=>{p(he,e(n).settings.repeatCustom.title),I(le,"aria-label",e(n).common.close),p(L,e(n).settings.repeatCustom.startDate),p(H,e(n).settings.repeatCustom.endDate),p(U,e(n).settings.repeatCustom.interval),p(ve,e(n).settings.repeatCustom.type),p(se,e(n).settings.repeatCustom.typeDay),p(Se,e(n).settings.repeatCustom.typeWeek),p(Ie,e(n).settings.repeatCustom.typeMonth),p(B,e(n).settings.repeatCustom.typeYear),p(K,e(n).settings.repeatCustom.cancel),X.disabled=e(b),p(Pe,e(n).settings.repeatCustom.confirm)}),W("click",A,x),W("keydown",A,S),W("click",le,function(...De){var Ue;(Ue=t.onClose)==null||Ue.apply(this,De)}),wt(re,()=>e(c),De=>v(c,De)),wt(ce,()=>e(l),De=>v(l,De)),wt(ee,()=>e(i),De=>v(i,De)),ao(ge,()=>e(u),De=>v(u,De)),W("click",Q,function(...De){var Ue;(Ue=t.onClose)==null||Ue.apply(this,De)}),W("click",X,h),m(w,A)};oe(M,w=>{t.open&&w(R)})}m(a,T),vt()}yt(["click","keydown"]);var m_=C("<span> </span>"),Vo=C("<option> </option>"),b_=C('<button type="button" class="link svelte-1qppxcb"> </button>'),y_=C('<aside class="panel svelte-1qppxcb"><header class="head svelte-1qppxcb"><div class="meta svelte-1qppxcb"><span class="proj svelte-1qppxcb"> </span> <!></div> <button class="close svelte-1qppxcb">×</button></header> <input class="title svelte-1qppxcb"/> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="desc"> </label> <textarea id="desc" class="desc svelte-1qppxcb" rows="4"></textarea></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="proj"> </label> <select id="proj" class="svelte-1qppxcb"><option> </option><!></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="pri"> </label> <select id="pri" class="svelte-1qppxcb"><option> </option><option> </option><option> </option><option> </option></select></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="est"> </label> <div class="pomo-row svelte-1qppxcb"><span class="pomo-done svelte-1qppxcb"> </span> <input id="est" class="pomo-input svelte-1qppxcb" type="number" min="1" max="99"/> <span class="pomo-minutes svelte-1qppxcb"> </span></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="due"> </label> <div class="row-inline svelte-1qppxcb"><input id="due" type="datetime-local" class="svelte-1qppxcb"/> <!></div></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="reminder"> </label> <select id="reminder" class="svelte-1qppxcb"></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="repeat"> </label> <select id="repeat" class="svelte-1qppxcb"></select></div></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb"> </span> <!></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb"> </span> <ul class="sub-list svelte-1qppxcb"></ul> <form class="sub-add svelte-1qppxcb"><input type="text" class="svelte-1qppxcb"/> <button type="submit" class="svelte-1qppxcb"> </button></form></section> <section class="block svelte-1qppxcb"><button class="delete svelte-1qppxcb"> </button></section> <!></aside>');function k_(a,t){ut(t,!0);const n=j(gt);let r=z(ze(Vt(()=>t.task.title))),o=z(ze(Vt(()=>t.task.description??""))),c=z(ze(Vt(()=>Li(t.task.due_date))));St(()=>{v(r,t.task.title,!0),v(o,t.task.description??"",!0),v(c,Li(t.task.due_date),!0)});function l(){return new Date().toISOString()}async function i(de){try{await _s({...t.task,...de,updated_at:l()}),t.onChanged()}catch(Ee){console.error("patch task failed",Ee),alert(Nt(e(n).task.saveFailed,{err:String(Ee)}))}}async function u(de,Ee){try{await _s({...t.task,repeat:de,updated_at:l(),...de==="custom"&&Ee!==void 0?{repeat_config:Ee}:{}},e(b)),t.onChanged()}catch(Qe){console.error("patch repeat failed",Qe),alert(Nt(e(n).task.saveFailed,{err:String(Qe)}))}}async function f(){const de=e(r).trim();!de||de===t.task.title||await i({title:de})}async function _(){e(o)!==(t.task.description??"")&&await i({description:e(o)})}async function g(){const de=ws(e(c));de!==t.task.due_date&&await i({due_date:de})}function h(){v(c,""),i({due_date:null})}let b=z(ze([]));St(()=>{x()});async function x(){try{const de=await Iv(t.task.id);v(b,de.map(Ee=>Ee.id),!0)}catch(de){console.error("load tags failed",de)}}async function S(de){const Ee=e(b);v(b,de,!0);try{await qv(t.task.id,de),t.onChanged()}catch(Qe){v(b,Ee,!0),alert(Nt(e(n).task.setTagsFailed,{err:String(Qe)}))}}let T=z(ze([])),M=z("");St(()=>{R()});async function R(){try{v(T,await bc(t.task.id),!0)}catch(de){console.error("load subtasks failed",de)}}async function w(){const de=e(M).trim();if(!de)return;v(M,"");const Ee={id:crypto.randomUUID(),task_id:t.task.id,title:de,is_completed:!1,position:e(T).length,created_at:l(),updated_at:l()};try{const Qe=await ps(Ee);v(T,[...e(T),Qe],!0),t.onChanged()}catch(Qe){alert(Nt(e(n).task.addSubtaskFailed,{err:String(Qe)}))}}async function A(de){const Ee=e(T).find(Qe=>Qe.id===de.id);v(T,e(T).map(Qe=>Qe.id===de.id?de:Qe),!0);try{await ps(de),t.onChanged()}catch(Qe){Ee&&v(T,e(T).map(ra=>ra.id===Ee.id?Ee:ra),!0),alert(Nt(e(n).task.updateSubtaskFailed,{err:String(Qe)}))}}async function k(de){const Ee=e(T);v(T,e(T).filter(Qe=>Qe.id!==de),!0);try{await Wv(de),t.onChanged()}catch(Qe){v(T,Ee,!0),alert(Nt(e(n).task.deleteSubtaskFailed,{err:String(Qe)}))}}async function D(){try{await Nv(t.task.id),t.onClose(),t.onChanged()}catch(de){alert(Nt(e(n).task.saveFailed,{err:String(de)}))}}const Y=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],he=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],le={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},ne={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function Z(de){return e(n).enum.reminder[le[de]]}function G(de){return e(n).enum.repeat[ne[de]]}function ie(de){var Ee;return de?((Ee=t.projects.find(Qe=>Qe.id===de))==null?void 0:Ee.name)??e(n).task.unknownProject:e(n).task.detailNoProject}function F(de){return{high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""}[de??"none"]??""}let L=z(!1);const re=j(Va),be=j(()=>t.task.estimated_pomodoros*(t.task.pomodoro_duration??e(re).focusDuration));function ye(de){const Ee=de.currentTarget,Qe=Math.round(Number(Ee.value)),ra=Math.min(99,Math.max(1,Number.isFinite(Qe)?Qe:1));ra!==t.task.estimated_pomodoros&&i({estimated_pomodoros:ra})}function H(de){if(de==="none"){i({reminder:de});return}if(co(e(c)))i({reminder:de});else{const Ee=ks(e(c));alert(e(n).task.detailTimeFilled),v(c,Ee,!0),i({reminder:de,due_date:ws(Ee)})}}var ce=y_(),xe=s(ce),O=s(xe),$=s(O),U=s($),ee=d($,2);{var pe=de=>{var Ee=m_(),Qe=s(Ee);E(ra=>{Ge(Ee,1,`pri pri-${t.task.priority??""}`,"svelte-1qppxcb"),p(Qe,ra)},[()=>F(t.task.priority)]),m(de,Ee)};oe(ee,de=>{t.task.priority!=="none"&&de(pe)})}var ke=d(O,2),ve=d(xe,2),ge=d(ve,2),q=s(ge),se=s(q),ue=d(q,2),Se=d(ge,2),Ne=s(Se),Ie=s(Ne),He=s(Ie),B=d(Ie,2),fe=s(B),we=s(fe);fe.value=fe.__value="";var V=d(fe);je(V,17,()=>jc(t.projects),de=>de.id,(de,Ee)=>{var Qe=Vo(),ra=s(Qe),Ka={};E(er=>{Qe.disabled=e(Ee).disabled,p(ra,`${er??""}${e(Ee).name??""}`),Ka!==(Ka=e(Ee).id)&&(Qe.value=(Qe.__value=e(Ee).id)??"")},[()=>"　".repeat(e(Ee).depth)]),m(de,Qe)});var y;Bt(B);var P=d(Ne,2),ae=s(P),J=s(ae),Q=d(ae,2),K=s(Q),X=s(K);K.value=K.__value="none";var Pe=d(K),De=s(Pe);Pe.value=Pe.__value="high";var Ue=d(Pe),mt=s(Ue);Ue.value=Ue.__value="medium";var dt=d(Ue),ft=s(dt);dt.value=dt.__value="low";var rt;Bt(Q);var We=d(Se,2),me=s(We),_e=s(me),et=d(me,2),tt=s(et),ht=s(tt),nt=d(tt,2),Pt=d(nt,2),jt=s(Pt),Lt=d(We,2),zt=s(Lt),Ve=s(zt),pt=d(zt,2),lt=s(pt),Ht=d(lt,2);{var Ct=de=>{var Ee=b_(),Qe=s(Ee);E(()=>p(Qe,e(n).common.clear)),W("click",Ee,h),m(de,Ee)};oe(Ht,de=>{e(c)&&de(Ct)})}var Be=d(Lt,2),Ae=s(Be),it=s(Ae),te=s(it),Me=d(it,2);je(Me,21,()=>Y,de=>de.value,(de,Ee)=>{var Qe=Vo(),ra=s(Qe),Ka={};E(er=>{p(ra,er),Ka!==(Ka=e(Ee).value)&&(Qe.value=(Qe.__value=e(Ee).value)??"")},[()=>Z(e(Ee).value)]),m(de,Qe)});var Le;Bt(Me);var Ye=d(Ae,2),Mt=s(Ye),Te=s(Mt),$e=d(Mt,2);je($e,21,()=>he,de=>de.value,(de,Ee)=>{var Qe=Vo(),ra=s(Qe),Ka={};E(er=>{p(ra,er),Ka!==(Ka=e(Ee).value)&&(Qe.value=(Qe.__value=e(Ee).value)??"")},[()=>G(e(Ee).value)]),m(de,Qe)});var bt;Bt($e);var Kt=d(Be,2),ea=s(Kt),qc=s(ea),Rc=d(ea,2);l_(Rc,{get tags(){return t.allTags},get selected(){return e(b)},onChange:S});var Gs=d(Kt,2),Vs=s(Gs),Lc=s(Vs),Ks=d(Vs,2);je(Ks,21,()=>e(T),de=>de.id,(de,Ee)=>{f_(de,{get subtask(){return e(Ee)},onChange:A,onDelete:k})});var $s=d(Ks,2),qr=s($s),Js=d(qr,2),Oc=s(Js),Qs=d(Gs,2),Xs=s(Qs),Bc=s(Xs),zc=d(Qs,2);Fc(zc,{get open(){return e(L)},get initialConfig(){return t.task.repeat_config},onConfirm:de=>{v(L,!1),u("custom",de)},onClose:()=>v(L,!1)}),E((de,Ee)=>{I(ce,"aria-label",e(n).task.detailPanelAria),p(U,de),I(ke,"aria-label",e(n).common.close),I(ve,"aria-label",e(n).task.titleAria),p(se,e(n).task.detailDescription),I(ue,"placeholder",e(n).task.detailDescPlaceholder),p(He,e(n).task.detailProject),p(we,e(n).task.detailNoProject),y!==(y=t.task.project_id??"")&&(B.value=(B.__value=t.task.project_id??"")??"",At(B,t.task.project_id??"")),p(J,e(n).task.detailPriority),p(X,e(n).priority.none),p(De,e(n).priority.high),p(mt,e(n).priority.medium),p(ft,e(n).priority.low),rt!==(rt=t.task.priority)&&(Q.value=(Q.__value=t.task.priority)??"",At(Q,t.task.priority)),p(_e,e(n).task.detailPomodoro),p(ht,`${t.task.completed_pomodoros??""}/`),no(nt,t.task.estimated_pomodoros),p(jt,`= ${e(be)??""}${e(n).task.minute??""}`),p(Ve,e(n).task.detailDueDate),p(te,e(n).task.detailReminder),Le!==(Le=t.task.reminder??"none")&&(Me.value=(Me.__value=t.task.reminder??"none")??"",At(Me,t.task.reminder??"none")),p(Te,e(n).task.detailRepeat),bt!==(bt=t.task.repeat??"none")&&($e.value=($e.__value=t.task.repeat??"none")??"",At($e,t.task.repeat??"none")),p(qc,e(n).filter.tag),p(Lc,e(n).task.detailSubtasks),I(qr,"placeholder",e(n).task.detailAddSubtask),I(qr,"aria-label",e(n).task.newSubtaskAria),Js.disabled=Ee,p(Oc,e(n).common.add),p(Bc,e(n).task.detailDelete)},[()=>ie(t.task.project_id),()=>!e(M).trim()]),W("click",ke,function(...de){var Ee;(Ee=t.onClose)==null||Ee.apply(this,de)}),kt("blur",ve,f),W("keydown",ve,de=>{de.key==="Enter"&&(de.preventDefault(),de.currentTarget.blur())}),wt(ve,()=>e(r),de=>v(r,de)),kt("blur",ue,_),wt(ue,()=>e(o),de=>v(o,de)),W("change",B,de=>{const Ee=de.currentTarget.value;i({project_id:Ee||null})}),W("change",Q,de=>{const Ee=de.currentTarget.value;i({priority:Ee})}),W("change",nt,ye),W("input",lt,de=>{de.currentTarget.value.length===16&&de.currentTarget.blur()}),kt("blur",lt,g),wt(lt,()=>e(c),de=>v(c,de)),W("change",Me,de=>{const Ee=de.currentTarget.value;H(Ee)}),W("change",$e,de=>{const Ee=de.currentTarget.value;Ee==="custom"?v(L,!0):u(Ee)}),kt("submit",$s,de=>{de.preventDefault(),w()}),wt(qr,()=>e(M),de=>v(M,de)),W("click",Xs,()=>{confirm(Nt(e(n).task.deleteConfirm,{title:t.task.title}))&&D()}),m(a,ce),vt()}yt(["click","keydown","change","input"]);var w_=C('<div class="group-tasks svelte-1u318f6"></div>'),x_=C('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),S_=C('<div class="grouped svelte-1u318f6"></div>');function T_(a,t){ut(t,!0);const n=j(gt),r="unscheduled";let o=z(ze(new Set));function c(f,_){const g=new Date(f+"T00:00:00"),h=_.reduce((b,x)=>b+(x.estimated_pomodoros||0)*(x.pomodoro_duration||25),0);return Nt(e(n).task.groupHeader,{date:f,weekday:e(n).enum.weekday[g.getDay()],n:h})}function l(f){const _=new Set(e(o));_.has(f)?_.delete(f):_.add(f),v(o,_,!0)}const i=j(()=>{const f=new Map;for(const g of t.tasks){let h;t.groupBy==="completed_at"?g.completed_at?h=Jt(g.completed_at):h=r:h=g.due_date?Jt(g.due_date):r,f.has(h)||f.set(h,[]),f.get(h).push(g)}const _=Array.from(f.entries());return _.sort((g,h)=>g[0]===r?1:h[0]===r?-1:new Date(g[0]).getTime()-new Date(h[0]).getTime()),_});var u=S_();je(u,21,()=>e(i),([f,_])=>f,(f,_)=>{var g=j(()=>el(e(_),2));let h=()=>e(g)[0],b=()=>e(g)[1];const x=j(()=>e(o).has(h()));var S=x_(),T=s(S),M=s(T),R=s(M),w=d(M,2),A=s(w);{var k=le=>{Wn(le,{size:16})},D=le=>{Un(le,{size:16})};oe(A,le=>{e(x)?le(k):le(D,-1)})}var Y=d(T,2);{var he=le=>{var ne=w_();je(ne,21,b,Z=>Z.id,(Z,G)=>{{let ie=j(()=>{var F;return((F=t.selectedTask)==null?void 0:F.id)===e(G).id});Nc(Z,{get task(){return e(G)},get selected(){return e(ie)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),m(le,ne)};oe(Y,le=>{e(x)||le(he)})}E(le=>{I(T,"aria-expanded",!e(x)),p(R,le)},[()=>h()===r?e(n).task.noDate:c(h(),b())]),W("click",T,()=>l(h())),m(f,S)}),m(a,u),vt()}yt(["click"]);var D_=C('<span class="unit svelte-1i37zgo"> </span>'),P_=C('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function Wt(a,t){var n=P_();let r;var o=s(n),c=s(o);jr(c,()=>t.icon,(h,b)=>{b(h,{size:18,strokeWidth:1.8})});var l=d(o,2),i=s(l),u=d(i);{var f=h=>{var b=D_(),x=s(b);E(()=>p(x,t.unit)),m(h,b)};oe(u,h=>{t.unit&&h(f)})}var _=d(l,2),g=s(_);E(()=>{r=Ge(n,1,"stat-card svelte-1i37zgo",null,r,{accent:t.accent}),p(i,t.value),p(g,t.label)}),m(a,n)}var zi=C("<option> </option>"),M_=C('<button type="button" class="clear-btn svelte-1ko7jxa"> </button>'),E_=C('<button type="button" class="export-btn svelte-1ko7jxa"><!> </button>'),C_=C('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><option> </option><option> </option><option> </option><option> </option></select> <button type="button"> </button> <button type="button"> </button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <!></div></div>');function Hi(a,t){ut(t,!0);const n=j(gt),r=j(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function o(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var c=C_(),l=s(c),i=s(l),u=s(i),f=s(u);u.value=u.__value="";var _=d(u);je(_,17,()=>t.projects,q=>q.id,(q,se)=>{var ue=zi(),Se=s(ue),Ne={};E(()=>{p(Se,e(se).name),Ne!==(Ne=e(se).id)&&(ue.value=(ue.__value=e(se).id)??"")}),m(q,ue)});var g;Bt(i);var h=d(i,2),b=s(h),x=s(b);b.value=b.__value="";var S=d(b);je(S,17,()=>t.tags,q=>q.id,(q,se)=>{var ue=zi(),Se=s(ue),Ne={};E(()=>{p(Se,e(se).name),Ne!==(Ne=e(se).id)&&(ue.value=(ue.__value=e(se).id)??"")}),m(q,ue)});var T;Bt(h);var M=d(h,2),R=s(M),w=s(R);R.value=R.__value="";var A=d(R),k=s(A);A.value=A.__value="high";var D=d(A),Y=s(D);D.value=D.__value="medium";var he=d(D),le=s(he);he.value=he.__value="low";var ne=d(he),Z=s(ne);ne.value=ne.__value="none";var G;Bt(M);var ie=d(M,2);let F;var L=s(ie),re=d(ie,2);let be;var ye=s(re),H=d(re,2);{var ce=q=>{var se=M_(),ue=s(se);E(()=>p(ue,e(n).timer.clearFilter)),W("click",se,o),m(q,se)};oe(H,q=>{e(r)&&q(ce)})}var xe=d(l,2),O=s(xe),$=s(O),U=d(O,2),ee=d(U,2),pe=s(ee),ke=d(ee,2),ve=d(ke,2);{var ge=q=>{var se=E_(),ue=s(se);$u(ue,{size:14});var Se=d(ue);E(()=>p(Se,` ${e(n).filter.export??""}`)),W("click",se,function(...Ne){var Ie;(Ie=t.onExport)==null||Ie.apply(this,Ne)}),m(q,se)};oe(ve,q=>{t.onExport&&q(ge)})}E((q,se)=>{I(i,"title",q),I(i,"aria-label",e(n).filter.projectAria),p(f,e(n).filter.allProject),g!==(g=t.filterProject??"")&&(i.value=(i.__value=t.filterProject??"")??"",At(i,t.filterProject??"")),I(h,"title",se),I(h,"aria-label",e(n).filter.tagAria),p(x,e(n).filter.allTag),T!==(T=t.filterTag??"")&&(h.value=(h.__value=t.filterTag??"")??"",At(h,t.filterTag??"")),I(M,"aria-label",e(n).filter.priorityAria),p(w,e(n).filter.allPriority),p(k,e(n).priority.high),p(Y,e(n).priority.medium),p(le,e(n).priority.low),p(Z,e(n).priority.none),G!==(G=t.filterPriority??"")&&(M.value=(M.__value=t.filterPriority??"")??"",At(M,t.filterPriority??"")),F=Ge(ie,1,"preset-btn svelte-1ko7jxa",null,F,{on:t.filterPreset==="week"}),p(L,e(n).filter.week),be=Ge(re,1,"preset-btn svelte-1ko7jxa",null,be,{on:t.filterPreset==="month"}),p(ye,e(n).filter.month),p($,e(n).filter.dueDate),no(U,t.filterStartDate),I(U,"aria-label",e(n).filter.startDate),p(pe,e(n).filter.to),no(ke,t.filterEndDate),I(ke,"aria-label",e(n).filter.endDate)},[()=>{var q;return t.filterProject!==null?(q=t.projects.find(se=>se.id===t.filterProject))==null?void 0:q.name:e(n).filter.allProject},()=>{var q;return t.filterTag!==null?(q=t.tags.find(se=>se.id===t.filterTag))==null?void 0:q.name:e(n).filter.allTag}]),W("change",i,q=>{const se=q.currentTarget.value;t.setFilterProject(se||null)}),W("change",h,q=>{const se=q.currentTarget.value;t.setFilterTag(se||null)}),W("change",M,q=>{const se=q.currentTarget.value;t.setFilterPriority(se||null)}),W("click",ie,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),W("click",re,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),W("change",U,q=>t.setFilterStartDate(q.currentTarget.value)),W("change",ke,q=>t.setFilterEndDate(q.currentTarget.value)),m(a,c),vt()}yt(["change","click"]);var N_=C('<button type="button"><!></button>'),j_=C('<div class="error svelte-1vpobhk"> </div>'),Ko=C("<option> </option>"),F_=C('<button type="button"> </button>'),A_=C('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk"> </span> <div class="tag-chips svelte-1vpobhk"></div></div>'),I_=C('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk"> </label> <select id="tf-proj" class="svelte-1vpobhk"><option> </option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk"> </label> <select id="tf-pri" class="svelte-1vpobhk"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk"> </label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk"> </label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk"> </label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk"> </label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk"> </button></div></div>'),q_=C('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function R_(a,t){ut(t,!0);const n=j(gt),r=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],o=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],c={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},l={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function i(O){return e(n).enum.reminder[c[O]]}function u(O){return e(n).enum.repeat[l[O]]}let f=j(Va),_=z(""),g=z(ze(Vt(()=>t.defaultProjectId??null))),h=z("medium"),b=z(ze(Vt(()=>t.defaultDueDate||Fa()))),x=z(0),S=z("none"),T=z("none"),M=z(null),R=z(!1),w=z(ze(Vt(()=>t.tags.length>0?[t.tags[0].id]:[]))),A=z(!1),k=z(""),D=z(!1);St(()=>{v(g,t.defaultProjectId??null,!0)}),St(()=>{v(b,t.defaultDueDate||Fa(),!0)}),St(()=>{t.tags.length>0&&e(w).length===0&&v(w,[t.tags[0].id],!0)});async function Y(){const O=e(_).trim();if(!O){v(k,e(n).form.needTitle,!0);return}let $=e(b)||Fa();if(e(S)!=="none"&&!co($)){if(!e(D)){v(D,!0),v(k,e(n).form.needTimeForReminder,!0);return}$=ks($)}v(D,!1),v(k,"");try{await t.onAdd({title:O,project_id:e(g),priority:e(h),due_date:$,estimated_pomodoros:e(x)>0?e(x):1,pomodoro_duration:e(f).focusDuration,reminder:e(S)==="none"?null:e(S),repeat:e(T)==="none"?null:e(T),repeat_config:e(T)==="custom"?e(M):null,tag_ids:e(w)}),v(_,""),v(g,t.defaultProjectId??null,!0),v(h,"medium"),v(b,t.defaultDueDate||Fa(),!0),v(x,0),v(S,"none"),v(D,!1),v(T,"none"),v(M,null),v(w,t.tags.length>0?[t.tags[0].id]:[],!0),v(A,!1)}catch(U){v(k,String(U),!0)}}function he(O){O.preventDefault(),Y()}function le(){e(A)||co(e(b))||v(b,ks(e(b)),!0),v(A,!e(A))}var ne=q_(),Z=s(ne),G=s(Z);Yn(G,{size:16,class:"plus-icon"});var ie=d(G,2),F=d(ie,2);je(F,20,()=>Array.from({length:6},(O,$)=>$+1),Ha,(O,$)=>{const U=j(()=>e(x)>=$);var ee=N_();let pe;var ke=s(ee);Ec(ke,{size:14,get filled(){return e(U)}}),E(()=>{pe=Ge(ee,1,"tomato-btn svelte-1vpobhk",null,pe,{filled:e(U)}),I(ee,"aria-label",`${$} ${e(n).form.pomodoroUnit}`),I(ee,"aria-pressed",e(U))}),W("click",ee,()=>v(x,$,!0)),m(O,ee)});var L=d(F,2),re=s(L),be=d(Z,2);{var ye=O=>{var $=j_(),U=s($);E(()=>p(U,e(k))),m(O,$)};oe(be,O=>{e(k)&&O(ye)})}var H=d(be,2);{var ce=O=>{var $=I_(),U=s($),ee=s(U),pe=s(ee),ke=d(ee,2),ve=s(ke),ge=s(ve);ve.value=ve.__value="";var q=d(ve);je(q,17,()=>jc(t.projects),Ve=>Ve.id,(Ve,pt)=>{var lt=Ko(),Ht=s(lt),Ct={};E(Be=>{lt.disabled=e(pt).disabled,p(Ht,`${Be??""}${e(pt).name??""}`),Ct!==(Ct=e(pt).id)&&(lt.value=(lt.__value=e(pt).id)??"")},[()=>"　".repeat(e(pt).depth)]),m(Ve,lt)});var se;Bt(ke);var ue=d(U,2),Se=s(ue),Ne=s(Se),Ie=d(Se,2),He=s(Ie),B=s(He);He.value=He.__value="high";var fe=d(He),we=s(fe);fe.value=fe.__value="medium";var V=d(fe),y=s(V);V.value=V.__value="low";var P=d(V),ae=s(P);P.value=P.__value="none";var J;Bt(Ie);var Q=d(ue,2),K=s(Q),X=s(K),Pe=d(K,2),De=d(Q,2),Ue=s(De),mt=s(Ue),dt=d(Ue,2),ft=d(De,2),rt=s(ft),We=s(rt),me=d(rt,2);je(me,21,()=>r,Ve=>Ve.value,(Ve,pt)=>{var lt=Ko(),Ht=s(lt),Ct={};E(Be=>{p(Ht,Be),Ct!==(Ct=e(pt).value)&&(lt.value=(lt.__value=e(pt).value)??"")},[()=>i(e(pt).value)]),m(Ve,lt)});var _e=d(ft,2),et=s(_e),tt=s(et),ht=d(et,2);je(ht,21,()=>o,Ve=>Ve.value,(Ve,pt)=>{var lt=Ko(),Ht=s(lt),Ct={};E(Be=>{p(Ht,Be),Ct!==(Ct=e(pt).value)&&(lt.value=(lt.__value=e(pt).value)??"")},[()=>u(e(pt).value)]),m(Ve,lt)});var nt=d(_e,2);{var Pt=Ve=>{var pt=A_(),lt=s(pt),Ht=s(lt),Ct=d(lt,2);je(Ct,21,()=>t.tags,Be=>Be.id,(Be,Ae)=>{const it=j(()=>e(w).includes(e(Ae).id));var te=F_();let Me;var Le=s(te);E(()=>{Me=Ge(te,1,"chip svelte-1vpobhk",null,Me,{on:e(it)}),I(te,"aria-pressed",e(it)),p(Le,e(Ae).name)}),W("click",te,()=>v(w,e(it)?e(w).filter(Ye=>Ye!==e(Ae).id):[...e(w),e(Ae).id],!0)),m(Be,te)}),E(()=>p(Ht,e(n).filter.tag)),m(Ve,pt)};oe(nt,Ve=>{t.tags.length>0&&Ve(Pt)})}var jt=d(nt,2),Lt=s(jt),zt=s(Lt);E(()=>{p(pe,e(n).filter.project),p(ge,e(n).task.detailNoProject),se!==(se=e(g)??"")&&(ke.value=(ke.__value=e(g)??"")??"",At(ke,e(g)??"")),p(Ne,e(n).filter.priority),p(B,e(n).priority.high),p(we,e(n).priority.medium),p(y,e(n).priority.low),p(ae,e(n).priority.none),J!==(J=e(h))&&(Ie.value=(Ie.__value=e(h))??"",At(Ie,e(h))),p(X,e(n).filter.dueDate),p(mt,e(n).form.estimatedPomo),p(We,e(n).task.detailReminder),p(tt,e(n).task.detailRepeat),p(zt,e(n).form.submit)}),W("change",ke,Ve=>{const pt=Ve.currentTarget.value;v(g,pt||null,!0)}),W("change",Ie,Ve=>{v(h,Ve.currentTarget.value,!0)}),W("input",Pe,Ve=>{Ve.currentTarget.value.length===16&&Ve.currentTarget.blur()}),wt(Pe,()=>e(b),Ve=>v(b,Ve)),wt(dt,()=>e(x),Ve=>v(x,Ve)),W("change",me,()=>v(D,!1)),ao(me,()=>e(S),Ve=>v(S,Ve)),W("change",ht,Ve=>{Ve.currentTarget.value==="custom"?v(R,!0):v(M,null)}),ao(ht,()=>e(T),Ve=>v(T,Ve)),W("click",Lt,Y),m(O,$)};oe(H,O=>{e(A)&&O(ce)})}var xe=d(H,2);Fc(xe,{get open(){return e(R)},get initialConfig(){return e(M)},onConfirm:O=>{v(M,O,!0),v(R,!1)},onClose:()=>v(R,!1)}),E(()=>{I(ie,"placeholder",e(n).form.titlePlaceholder),I(F,"aria-label",e(n).form.pomodoroIcons),p(re,e(A)?e(n).form.collapse:e(n).form.more)}),kt("submit",ne,he),wt(ie,()=>e(_),O=>v(_,O)),W("click",L,le),m(a,ne),vt()}yt(["click","change","input"]);//! 月历工具:ISO 日期格式化 + 自然周(周一起点)计算。
//! 手账视图(JournalView)与月度复盘面板(MonthReviewPanel)共用。
//! (v1 frontend/src/utils/calendar.ts 对应物,v1 12bc45a 抽取)
function gr(a){return String(a).padStart(2,"0")}function ln(a){return`${a.getFullYear()}-${gr(a.getMonth()+1)}-${gr(a.getDate())}`}function Ac(a,t){const n=[],r=new Date(a,t-1,1);for(;r.getDay()!==1;)r.setDate(r.getDate()+1);for(;r.getMonth()===t-1;)n.push(new Date(r)),r.setDate(r.getDate()+7);return n}var L_=C('<button type="button"><!></button>');function O_(a,t){ut(t,!0);const n=j(gt);var r=L_();let o;var c=s(r);{var l=i=>{za(i,{size:10,strokeWidth:3,color:"#fff"})};oe(c,i=>{t.completed&&i(l)})}E(()=>{o=Ge(r,1,"checkbox svelte-1bxwwxl",null,o,{completed:t.completed}),I(r,"aria-label",t.completed?e(n).common.ariaCompleted:e(n).common.ariaMarkDone)}),W("click",r,i=>{i.stopPropagation(),t.onToggle()}),m(a,r),vt()}yt(["click"]);var Ui=C("<option> </option>"),B_=C('<div class="no-task svelte-tr144z"> </div>'),z_=C('<div class="task-row svelte-tr144z"><!> <span> </span></div>'),H_=C('<div class="day-cell svelte-tr144z"><div> </div> <!> <div class="day-divider svelte-tr144z"></div> <!></div>'),U_=C('<section class="week-card svelte-tr144z"><div class="week-title svelte-tr144z"> </div> <div class="day-grid svelte-tr144z"></div> <div class="weekly-block svelte-tr144z"><div class="weekly-label svelte-tr144z"> </div> <!></div></section>'),W_=C('<div class="journal svelte-tr144z"><div class="inner svelte-tr144z"><div class="head svelte-tr144z"><h1 class="title svelte-tr144z"> </h1> <div class="month-nav svelte-tr144z"><button type="button" class="nav-btn svelte-tr144z"><!></button> <select class="select svelte-tr144z"></select> <select class="select svelte-tr144z"></select> <button type="button" class="nav-btn svelte-tr144z"><!></button></div></div> <div class="weeks svelte-tr144z"></div></div></div>');function Y_(a,t){ut(t,!0);const n=j(gt),r=Array.from({length:61},(H,ce)=>2026+ce),o=Array.from({length:12},(H,ce)=>ce+1);let c=z(ze([])),l=z(ze([]));async function i(H,ce){const xe=ln(new Date(H,ce-1,1)),O=ln(new Date(H,ce,0));try{const[$,U]=await Promise.all([mc(H,ce),Lv(xe,O)]);if(H!==t.year||ce!==t.month)return;v(c,$,!0),v(l,U,!0)}catch($){console.warn("journal load reviews failed",$)}}St(()=>{const H=t.year,ce=t.month;i(H,ce)});const u=j(()=>{const H=e(n).journal.weekday;return Ac(t.year,t.month).map((ce,xe)=>{const O=Array.from({length:7},(ee,pe)=>{const ke=new Date(ce);return ke.setDate(ke.getDate()+pe),ke}),$=O[6],U=O.map((ee,pe)=>({iso:ln(ee),label:`${H[pe]} ${ee.getMonth()+1}/${ee.getDate()}`}));return{startISO:ln(ce),title:Nt(e(n).journal.weekRange,{n:xe+1,ms:ce.getMonth()+1,ds:ce.getDate(),me:$.getMonth()+1,de:$.getDate()}),days:U}})});function f(H){return H===ln(new Date)}const _=j(()=>{const H=new Map;for(const ce of t.tasks){const xe=Jt(ce.due_date);xe&&(H.has(xe)||H.set(xe,[]),H.get(xe).push(ce))}return H}),g=j(()=>new Map(e(c).map(H=>[H.week_start,H]))),h=j(()=>new Map(e(l).map(H=>[H.date,H])));function b(){t.month===1?(t.onMonthChange(12),t.onYearChange(t.year-1)):t.onMonthChange(t.month-1)}function x(){t.month===12?(t.onMonthChange(1),t.onYearChange(t.year+1)):t.onMonthChange(t.month+1)}async function S(H){var ce;try{H.status==="active"?await vc(H.id):await fc(H.id),(ce=t.onTasksChange)==null||ce.call(t)}catch(xe){console.warn("journal toggle task failed",xe)}}async function T(H,ce){try{const xe=e(h).get(H),O=xe?{...xe,content:ce}:{id:crypto.randomUUID(),date:H,content:ce,updated_at:new Date().toISOString()};await pc(O),await i(t.year,t.month)}catch(xe){console.warn("journal save daily review failed",xe)}}async function M(H){try{await gc(H),await i(t.year,t.month)}catch(ce){console.warn("journal delete daily review failed",ce)}}async function R(H,ce){var xe;try{const O=e(g).get(H),$=O?{...O,content:ce}:{id:crypto.randomUUID(),week_start:H,content:ce,updated_at:new Date().toISOString()};await Ov($),await i(t.year,t.month),(xe=t.onReviewChange)==null||xe.call(t)}catch(O){console.warn("journal save weekly review failed",O)}}async function w(H){var ce;try{await Bv(H),await i(t.year,t.month),(ce=t.onReviewChange)==null||ce.call(t)}catch(xe){console.warn("journal delete weekly review failed",xe)}}var A=W_(),k=s(A),D=s(k),Y=s(D),he=s(Y),le=d(Y,2),ne=s(le),Z=s(ne);Ku(Z,{size:16});var G=d(ne,2);je(G,20,()=>r,H=>H,(H,ce)=>{var xe=Ui(),O=s(xe),$={};E(U=>{p(O,U),$!==($=ce)&&(xe.value=(xe.__value=ce)??"")},[()=>Nt(e(n).journal.yearOption,{year:ce})]),m(H,xe)});var ie;Bt(G);var F=d(G,2);je(F,20,()=>o,H=>H,(H,ce)=>{var xe=Ui(),O=s(xe),$={};E(U=>{p(O,U),$!==($=ce)&&(xe.value=(xe.__value=ce)??"")},[()=>Nt(e(n).journal.monthOption,{month:ce})]),m(H,xe)});var L;Bt(F);var re=d(F,2),be=s(re);Wn(be,{size:16});var ye=d(D,2);je(ye,21,()=>e(u),H=>H.startISO,(H,ce)=>{var xe=U_(),O=s(xe),$=s(O),U=d(O,2);je(U,21,()=>e(ce).days,ge=>ge.iso,(ge,q)=>{var se=H_(),ue=s(se);let Se;var Ne=s(ue),Ie=d(ue,2);{var He=V=>{var y=B_(),P=s(y);E(()=>p(P,e(n).common.noData)),m(V,y)},B=j(()=>(e(_).get(e(q).iso)??[]).length===0),fe=V=>{var y=Oe(),P=Fe(y);je(P,17,()=>e(_).get(e(q).iso)??[],ae=>ae.id,(ae,J,Q,K)=>{var X=z_(),Pe=s(X);{let dt=j(()=>e(J).status==="completed");O_(Pe,{get completed(){return e(dt)},onToggle:()=>S(e(J))})}var De=d(Pe,2);let Ue;var mt=s(De);E(()=>{Ue=Ge(De,1,"task-title svelte-tr144z",null,Ue,{done:e(J).status==="completed"}),p(mt,e(J).title)}),m(ae,X)}),m(V,y)};oe(Ie,V=>{e(B)?V(He):V(fe,-1)})}var we=d(Ie,4);{let V=j(()=>{var y;return((y=e(h).get(e(q).iso))==null?void 0:y.content)??null});lo(we,{get value(){return e(V)},get placeholder(){return e(n).journal.dailyReviewPlaceholder},rows:2,onSave:y=>T(e(q).iso,y),onDelete:()=>M(e(q).iso)})}E(V=>{Se=Ge(ue,1,"day-head svelte-tr144z",null,Se,V),p(Ne,e(q).label)},[()=>({today:f(e(q).iso)})]),m(ge,se)});var ee=d(U,2),pe=s(ee),ke=s(pe),ve=d(pe,2);{let ge=j(()=>{var q;return((q=e(g).get(e(ce).startISO))==null?void 0:q.content)??null});lo(ve,{get value(){return e(ge)},get placeholder(){return e(n).journal.weeklyReviewPlaceholder},rows:5,onSave:q=>R(e(ce).startISO,q),onDelete:()=>w(e(ce).startISO)})}E(()=>{p($,e(ce).title),p(ke,e(n).journal.weeklyReview)}),m(H,xe)}),E(H=>{p(he,H),I(ne,"title",e(n).journal.prevMonth),I(ne,"aria-label",e(n).journal.prevMonth),I(G,"aria-label",e(n).journal.yearAria),ie!==(ie=t.year)&&(G.value=(G.__value=t.year)??"",At(G,t.year)),I(F,"aria-label",e(n).journal.monthAria),L!==(L=t.month)&&(F.value=(F.__value=t.month)??"",At(F,t.month)),I(re,"title",e(n).journal.nextMonth),I(re,"aria-label",e(n).journal.nextMonth)},[()=>Nt(e(n).journal.monthTitle,{year:t.year,month:t.month})]),W("click",ne,b),W("change",G,H=>t.onYearChange(Number(H.currentTarget.value))),W("change",F,H=>t.onMonthChange(Number(H.currentTarget.value))),W("click",re,x),m(a,A),vt()}yt(["click","change"]);var G_=C('<div class="week-card svelte-w363gh"><div class="week-head svelte-w363gh"> </div> <div> </div></div>'),V_=C('<aside class="panel svelte-w363gh"><h2 class="title svelte-w363gh"> </h2> <div class="weekly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <div class="week-list svelte-w363gh"></div></div> <div class="monthly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div></aside>');function K_(a,t){ut(t,!0);const n=j(gt);let r=z(ze([])),o=z(null);async function c(k,D){try{const[Y,he]=await Promise.all([mc(k,D),zv(`${k}-${gr(D)}`)]);if(k!==t.year||D!==t.month)return;v(r,Y,!0),v(o,he,!0)}catch(Y){console.warn("month panel load failed",Y)}}St(()=>{const k=t.year,D=t.month;t.reviewVersion,c(k,D)});const l=j(()=>Ac(t.year,t.month)),i=j(()=>{const k=new Map;for(const D of e(r))k.set(D.week_start,D.content);return k});async function u(k){try{const D=`${t.year}-${gr(t.month)}`,Y=e(o)?{...e(o),content:k}:{id:crypto.randomUUID(),year_month:D,content:k,updated_at:new Date().toISOString()};await Hv(Y),await c(t.year,t.month)}catch(D){console.warn("month panel save failed",D)}}async function f(){try{await Uv(`${t.year}-${gr(t.month)}`),await c(t.year,t.month)}catch(k){console.warn("month panel delete failed",k)}}var _=V_(),g=s(_),h=s(g),b=d(g,2),x=s(b),S=s(x),T=d(x,2);je(T,23,()=>e(l),k=>ln(k),(k,D,Y)=>{const he=j(()=>ln(e(D))),le=j(()=>e(i).get(e(he)));var ne=G_(),Z=s(ne),G=s(Z),ie=d(Z,2);let F;var L=s(ie);E((re,be,ye)=>{p(G,re),F=Ge(ie,1,"week-content svelte-w363gh",null,F,be),p(L,ye)},[()=>Nt(e(n).monthPanel.weekRange,{n:e(Y)+1,date:e(he)}),()=>{var re;return{dimmed:!((re=e(le))!=null&&re.trim())}},()=>{var re;return(re=e(le))!=null&&re.trim()?e(le):e(n).monthPanel.empty}]),m(k,ne)});var M=d(b,2),R=s(M),w=s(R),A=d(R,2);{let k=j(()=>{var D;return((D=e(o))==null?void 0:D.content)??null});lo(A,{get value(){return e(k)},get placeholder(){return e(n).monthPanel.monthlyPlaceholder},rows:6,onSave:u,onDelete:f})}E((k,D)=>{I(_,"aria-label",k),p(h,D),p(S,e(n).monthPanel.weeklyReadonly),p(w,e(n).monthPanel.monthlyReview)},[()=>Nt(e(n).monthPanel.title,{year:t.year,month:t.month}),()=>Nt(e(n).monthPanel.title,{year:t.year,month:t.month})]),m(a,_),vt()}var $_=C('<h1 class="title svelte-969q1d"> </h1>'),J_=C('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),Q_=C('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),X_=C('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),Z_=C('<p class="loading svelte-969q1d"> </p>'),ep=C('<p class="empty svelte-969q1d"><!></p>'),tp=C('<div class="task-list svelte-969q1d"></div>'),ap=C('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),np=C('<div class="page page-veil svelte-969q1d"><!> <div class="main svelte-969q1d"><!></div> <!></div>');function rp(a,t){ut(t,!0);let n=z(ze([])),r=z(ze([])),o=z(ze([])),c=z(!0),l=z(null);const i=j(gt);let u=z(null),f=z("today"),_=z(""),g=z(null),h=z(ze(new Date().getFullYear())),b=z(new Date().getMonth()+1),x=z(0),S=z(null),T=z(null),M=z(null),R=z(null),w=z(""),A=z(""),k=z(null),D=z(null),Y=z(null),he=z(null),le=z(""),ne=z("");const Z=j(()=>{let B=[...e(n)];const fe={high:0,medium:1,low:2,none:3};if(e(_).trim()){const K=e(_).trim().toLowerCase();return B=B.filter(X=>X.title.toLowerCase().includes(K)),B.sort((X,Pe)=>{if(X.status!==Pe.status)return X.status==="active"?-1:1;const De=fe[X.priority||"none"]??3,Ue=fe[Pe.priority||"none"]??3;return De!==Ue?De-Ue:new Date(X.created_at??0).getTime()-new Date(Pe.created_at??0).getTime()}),B}const we=Fa(),V=$r(),y=new Date,P=y.getDay(),ae=P===0?6:P-1,J=new Date(y);J.setDate(J.getDate()-ae),J.setHours(0,0,0,0);const Q=new Date(J);return Q.setDate(Q.getDate()+6),Q.setHours(23,59,59,999),e(u)!==null?B=B.filter(K=>K.project_id===e(u)):e(f)==="today"?B=B.filter(K=>Jt(K.due_date)===we):e(f)==="tomorrow"?B=B.filter(K=>Jt(K.due_date)===V):e(f)==="week"?B=B.filter(K=>{if(!K.due_date)return!1;const X=new Date(K.due_date);return X>=J&&X<=Q}):e(f)==="planned"?B=G(B,{project:e(S),tag:e(T),priority:e(M),preset:e(R),startDate:e(w),endDate:e(A)}):e(f)==="completed"?(B=B.filter(K=>K.status==="completed"),B=G(B,{project:e(k),tag:e(D),priority:e(Y),preset:e(he),startDate:e(le),endDate:e(ne)})):e(f)==="journal"&&(B=B.filter(K=>!!K.due_date)),B.sort((K,X)=>{if(K.status!==X.status)return K.status==="active"?-1:1;const Pe=fe[K.priority||"none"]??3,De=fe[X.priority||"none"]??3;return Pe!==De?Pe-De:new Date(K.created_at??0).getTime()-new Date(X.created_at??0).getTime()}),B});function G(B,fe){let we=B;if(fe.project!==null&&(we=we.filter(V=>V.project_id===fe.project)),fe.tag!==null&&(we=we.filter(V=>(V.tags??[]).some(y=>y.id===fe.tag))),fe.priority!==null&&(we=we.filter(V=>V.priority===fe.priority)),fe.preset==="week"){const V=new Date,y=V.getDay(),P=y===0?6:y-1,ae=new Date(V);ae.setDate(V.getDate()-P);const J=new Date(ae);J.setDate(ae.getDate()+6);const Q=Jt(ae.toISOString()),K=Jt(J.toISOString());we=we.filter(X=>{const Pe=Jt(X.due_date);return!!Pe&&Pe>=Q&&Pe<=K})}if(fe.preset==="month"){const V=new Date,y=`${V.getFullYear()}-${String(V.getMonth()+1).padStart(2,"0")}-01`,P=new Date(V.getFullYear(),V.getMonth()+1,0),ae=Jt(P.toISOString());we=we.filter(J=>{const Q=Jt(J.due_date);return!!Q&&Q>=y&&Q<=ae})}return fe.startDate&&(we=we.filter(V=>{const y=Jt(V.due_date);return!!y&&y>=fe.startDate})),fe.endDate&&(we=we.filter(V=>{const y=Jt(V.due_date);return!!y&&y<=fe.endDate})),we}const ie=j(()=>{const B=e(Z).filter(P=>P.status==="active").reduce((P,ae)=>P+(ae.estimated_pomodoros||0)*(ae.pomodoro_duration||25),0),fe=e(Z).filter(P=>P.status==="active").length,we=e(Z).reduce((P,ae)=>P+(ae.completed_pomodoros||0)*(ae.pomodoro_duration||25),0),V=e(Z).reduce((P,ae)=>P+(ae.completed_pomodoros||0),0),y=e(Z).filter(P=>P.status==="completed").length;return{estimatedMinutes:B,activeCount:fe,focusedMinutes:we,completedCount:y,completedPomodoros:V}}),F=j(()=>{if(e(_).trim())return`${e(i).task.searchResult} (${e(Z).length})`;if(e(u)!==null){const fe=e(r).find(we=>we.id===e(u));return(fe==null?void 0:fe.name)||e(i).task.list}return{today:e(i).filter.today,tomorrow:e(i).filter.tomorrow,week:e(i).filter.week,planned:e(i).sidebar.planned,completed:e(i).sidebar.completed,journal:e(i).sidebar.journal,"":e(i).task.task}[e(f)]||e(i).task.task});async function L(){try{const[B,fe,we]=await Promise.all([Tn({}),zs(),Hs()]);if(v(n,B.map(V=>({...V,tags:V.tags??[]})),!0),v(r,fe,!0),v(o,we,!0),e(g)){const V=e(n).find(y=>y.id===e(g).id);v(g,V??null,!0)}Ff()}catch(B){v(l,String(B),!0)}finally{v(c,!1)}}rn(L);function re(){return new Date().toISOString()}function be(){return crypto.randomUUID()}async function ye(B){const fe=typeof B=="string"?B:B.id,we=typeof B=="string"?e(n).find(V=>V.id===fe):B;if(we)try{we.status==="active"?await vc(fe):await fc(fe),await L()}catch(V){v(l,String(V),!0)}}async function H(B,fe=null){try{await oo({id:be(),name:B,color:"#c97b6e",parent_id:fe??null,created_at:re(),updated_at:re()}),await L()}catch(we){v(l,String(we),!0)}}async function ce(B,fe){try{const we=e(r).find(V=>V.id===B);if(!we)return;await oo({...we,name:fe,updated_at:re()}),await L()}catch(we){v(l,String(we),!0)}}async function xe(B){if(confirm(e(i).sidebar.deleteListConfirm))try{await hc(B),e(u)===B&&v(u,null),await L()}catch(fe){v(l,String(fe),!0)}}function O(B){v(g,B,!0)}function $(){v(g,null)}function U(){L()}async function ee(B){try{await pf(B),rc("/timer")}catch(fe){v(l,String(fe),!0)}}async function pe(B){const fe=B.due_date??(e(f)==="tomorrow"?$r():Fa());try{const we=be();await _s({id:we,title:B.title,description:"",project_id:B.project_id??e(u),priority:B.priority,status:"active",due_date:ws(co(fe)?fe:`${fe}T00:00:00`),estimated_pomodoros:B.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:B.pomodoro_duration,reminder:B.reminder??"none",repeat:B.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:B.repeat_config??null,completed_at:null,created_at:re(),updated_at:re()},B.tag_ids),await L()}catch(we){v(l,String(we),!0)}}async function ke(){try{const B=await jh({defaultPath:`${e(i).export.fileName}_${Fa()}.xlsx`,filters:[{name:"xlsx",extensions:["xlsx"]}]});if(!B)return;const fe=[e(i).export.index,e(i).export.title,e(i).export.project,e(i).export.priority,e(i).export.dueDate,e(i).export.estimated,e(i).export.tags,e(i).export.subtasks,e(i).export.status],we=e(Z).map(V=>{var y;return{title:V.title,project:((y=e(r).find(P=>P.id===V.project_id))==null?void 0:y.name)??"",priority:e(i).priority[V.priority??"none"]??V.priority??"",dueDate:V.due_date?V.due_date.slice(0,10):"",estimated:V.estimated_pomodoros??0,tags:(V.tags??[]).map(P=>P.name).join(", "),subtasks:(V.subtasks??[]).map(P=>P.title).join(`
`),status:V.status==="completed"?e(i).export.statusCompleted:e(i).export.statusActive}});await Jv(B,e(i).nav.tasks,fe,we)}catch(B){v(l,String(B),!0)}}var ve=np();Fr("969q1d",B=>{Cr(()=>{Qn.title=e(i).page.tasks??""})});var ge=s(ve);$h(ge,{get projects(){return e(r)},get filter(){return e(f)},get selectedProject(){return e(u)},onSetFilter:B=>{v(f,B,!0),v(_,"")},onSelectProject:B=>{v(u,B,!0),v(_,"")},onCreateProject:H,onUpdateProject:ce,onDeleteProject:xe,get search(){return e(_)},onSearchChange:B=>{v(_,B,!0),B.trim()&&(v(u,null),v(f,""))},get tasks(){return e(n)}});var q=d(ge,2),se=s(q);{var ue=B=>{Y_(B,{get year(){return e(h)},get month(){return e(b)},get tasks(){return e(Z)},onYearChange:fe=>v(h,fe,!0),onMonthChange:fe=>v(b,fe,!0),onReviewChange:()=>v(x,e(x)+1),onTasksChange:()=>void L()})},Se=B=>{var fe=ap(),we=s(fe);{var V=me=>{var _e=$_(),et=s(_e);E(()=>p(et,e(F))),m(me,_e)};oe(we,me=>{e(F)&&me(V)})}var y=d(we,2);{var P=me=>{var _e=J_(),et=s(_e);Wt(et,{get icon(){return br},get label(){return e(i).task.statFocused},get value(){return e(ie).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var tt=d(et,2);Wt(tt,{get icon(){return hs},get label(){return e(i).task.statCompletedPomo},get value(){return e(ie).completedPomodoros},get unit(){return e(i).stats.unitCount},accent:!0});var ht=d(tt,2);Wt(ht,{get icon(){return fs},get label(){return e(i).task.statCompleted},get value(){return e(ie).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),m(me,_e)},ae=me=>{var _e=Q_(),et=s(_e);Wt(et,{get icon(){return br},get label(){return e(i).task.statEstimated},get value(){return e(ie).estimatedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var tt=d(et,2);Wt(tt,{get icon(){return hs},get label(){return e(i).task.statActive},get value(){return e(ie).activeCount},get unit(){return e(i).stats.unitCount},accent:!0});var ht=d(tt,2);Wt(ht,{get icon(){return Ls},get label(){return e(i).task.statFocused},get value(){return e(ie).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var nt=d(ht,2);Wt(nt,{get icon(){return fs},get label(){return e(i).task.statCompleted},get value(){return e(ie).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),m(me,_e)};oe(y,me=>{e(f)==="completed"?me(P):me(ae,-1)})}var J=d(y,2);{var Q=me=>{Hi(me,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(k)},setFilterProject:_e=>v(k,_e,!0),get filterTag(){return e(D)},setFilterTag:_e=>v(D,_e,!0),get filterPriority(){return e(Y)},setFilterPriority:_e=>v(Y,_e,!0),get filterPreset(){return e(he)},setFilterPreset:_e=>v(he,_e,!0),get filterStartDate(){return e(le)},setFilterStartDate:_e=>v(le,_e,!0),get filterEndDate(){return e(ne)},setFilterEndDate:_e=>v(ne,_e,!0)})},K=me=>{Hi(me,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(S)},setFilterProject:_e=>v(S,_e,!0),get filterTag(){return e(T)},setFilterTag:_e=>v(T,_e,!0),get filterPriority(){return e(M)},setFilterPriority:_e=>v(M,_e,!0),get filterPreset(){return e(R)},setFilterPreset:_e=>v(R,_e,!0),get filterStartDate(){return e(w)},setFilterStartDate:_e=>v(w,_e,!0),get filterEndDate(){return e(A)},setFilterEndDate:_e=>v(A,_e,!0),onExport:ke})};oe(J,me=>{e(f)==="completed"?me(Q):e(f)==="planned"&&me(K,1)})}var X=d(J,2);{var Pe=me=>{{let _e=j(()=>e(f)==="tomorrow"?$r():Fa());R_(me,{get projects(){return e(r)},get tags(){return e(o)},get defaultProjectId(){return e(u)},get defaultDueDate(){return e(_e)},onAdd:pe})}};oe(X,me=>{e(f)!=="completed"&&me(Pe)})}var De=d(X,2);{var Ue=me=>{var _e=X_(),et=s(_e),tt=s(et),ht=d(et,2);E(()=>p(tt,`⚠ ${e(l)??""}`)),W("click",ht,()=>v(l,null)),m(me,_e)};oe(De,me=>{e(l)&&me(Ue)})}var mt=d(De,2);{var dt=me=>{var _e=Z_(),et=s(_e);E(()=>p(et,e(i).common.loading)),m(me,_e)},ft=me=>{var _e=ep(),et=s(_e);{var tt=nt=>{var Pt=ci();E(()=>p(Pt,e(i).task.emptyAll)),m(nt,Pt)},ht=nt=>{var Pt=ci();E(()=>p(Pt,e(i).task.emptyFiltered)),m(nt,Pt)};oe(et,nt=>{e(n).length===0?nt(tt):nt(ht,-1)})}m(me,_e)},rt=me=>{T_(me,{get tasks(){return e(Z)},groupBy:"due_date",get selectedTask(){return e(g)},onToggle:ye,onSelect:O,onStart:ee})},We=me=>{var _e=tp();je(_e,21,()=>e(Z),et=>et.id,(et,tt)=>{{let ht=j(()=>{var nt;return((nt=e(g))==null?void 0:nt.id)===e(tt).id});Nc(et,{get task(){return e(tt)},get selected(){return e(ht)},onToggle:()=>ye(e(tt)),onSelect:O,onStart:ee})}}),m(me,_e)};oe(mt,me=>{e(c)?me(dt):e(Z).length===0?me(ft,1):e(f)==="week"||e(f)==="planned"||e(f)==="completed"?me(rt,2):me(We,-1)})}m(B,fe)};oe(se,B=>{e(f)==="journal"?B(ue):B(Se,-1)})}var Ne=d(q,2);{var Ie=B=>{K_(B,{get year(){return e(h)},get month(){return e(b)},get reviewVersion(){return e(x)}})},He=B=>{k_(B,{get task(){return e(g)},get projects(){return e(r)},get allTags(){return e(o)},onClose:$,onChanged:U})};oe(Ne,B=>{e(f)==="journal"?B(Ie):e(g)&&B(He,1)})}m(a,ve),vt()}yt(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
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
const op=[{key:"today",group:"day"},{key:"week",group:"day"},{key:"month",group:"day"},{key:"quarter",group:"week"},{key:"halfyear",group:"month"},{key:"year",group:"month"}];function Wi(a){return String(a).padStart(2,"0")}function Tt(a){return`${a.getFullYear()}-${Wi(a.getMonth()+1)}-${Wi(a.getDate())}`}function $o(a,t){return Math.round((t.getTime()-a.getTime())/864e5)+1}function Yi(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today")return{start:Tt(n),end:Tt(n),days:1,group:"day"};if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Tt(i),end:Tt(u),days:7,group:"day"}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth(),1),u=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:Tt(i),end:Tt(u),days:u.getDate(),group:"day"}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),i*3,1),f=new Date(n.getFullYear(),i*3+3,0);return{start:Tt(u),end:Tt(f),days:$o(u,f),group:"week"}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i,1),f=new Date(n.getFullYear(),i+6,0);return{start:Tt(u),end:Tt(f),days:$o(u,f),group:"month"}}const c=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31);return{start:Tt(c),end:Tt(l),days:$o(c,l),group:"month"}}function sp(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today"){const i=new Date(n);return i.setDate(n.getDate()-1),{start:Tt(i),end:Tt(i)}}if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o-7);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Tt(i),end:Tt(u)}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth()-1,1),u=new Date(n.getFullYear(),n.getMonth(),0);return{start:Tt(i),end:Tt(u)}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),(i-1)*3,1),f=new Date(n.getFullYear(),i*3,0);return{start:Tt(u),end:Tt(f)}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i-6,1),f=new Date(n.getFullYear(),i,0);return{start:Tt(u),end:Tt(f)}}const c=new Date(n.getFullYear()-1,0,1),l=new Date(n.getFullYear()-1,11,31);return{start:Tt(c),end:Tt(l)}}function Ic(a,t){return t==="month"?`${Number(a.slice(5,7))}`:`${Number(a.slice(5,7))}/${Number(a.slice(8,10))}`}function ip(a,t=new Date){return Tt(t)}var lp=C('<div class="empty svelte-1ixrxd8"> </div>'),cp=Dn('<text class="tick svelte-1ixrxd8" text-anchor="end"> </text>'),dp=Dn('<line class="grid svelte-1ixrxd8"></line><!>',1),up=Dn('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),vp=Dn('<rect rx="3"></rect><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),fp=C('<div class="tooltip svelte-1ixrxd8"> </div>'),hp=C('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" class="svelte-1ixrxd8"><!><!></svg> <!></div>');function _p(a,t){ut(t,!0);const n=j(gt),r=600,o=240,c={top:14,right:8,bottom:26,left:42},l=r-c.left-c.right,i=o-c.top-c.bottom,u=2,f=10,_=34;let g=z(null);function h(A){if(A<=0)return 0;const k=Math.pow(10,Math.floor(Math.log10(A))),D=A/k;return(D<=1?1:D<=2?2:D<=5?5:10)*k}function b(A,k){return Ic(A,k)}const x=j(()=>{const A=t.data.length,k=t.data.reduce((ie,F)=>Math.max(ie,F.minutes),0),D=h(k),Y=A>0?l/A:l,he=Math.min(Y*.62,_),le=Math.max(1,Math.ceil(A/f)),ne=t.group==="day"?ip():null,Z=t.data.map((ie,F)=>{const L=ie.minutes>0&&D>0?Math.max(u,ie.minutes/D*i):u,re=c.left+Y*F+(Y-he)/2;return{i:F,key:ie.key,minutes:ie.minutes,x:re,y:c.top+i-L,w:he,h:L,hitX:c.left+Y*F,hitW:Y,label:b(ie.key,t.group),showLabel:F%le===0||F===A-1,isCurrent:ne!==null&&ie.key===ne}}),G=[0,.25,.5,.75,1].map(ie=>({y:c.top+i-ie*i,value:Math.round(D*ie),labeled:ie===0||ie===.5||ie===1}));return{bars:Z,gridlines:G}}),S=j(()=>e(g)!==null?e(x).bars[e(g)]:null);var T=Oe(),M=Fe(T);{var R=A=>{var k=lp(),D=s(k);E(()=>p(D,t.emptyText??e(n).stats.noData)),m(A,k)},w=A=>{var k=hp(),D=s(k);I(D,"viewBox","0 0 600 240");var Y=s(D);je(Y,17,()=>e(x).gridlines,Ha,(Z,G)=>{var ie=dp(),F=Fe(ie),L=d(F);{var re=be=>{var ye=cp(),H=s(ye);E(()=>{I(ye,"x",c.left-6),I(ye,"y",e(G).y+3),p(H,e(G).value)}),m(be,ye)};oe(L,be=>{e(G).labeled&&be(re)})}E(()=>{I(F,"x1",c.left),I(F,"x2",r-c.right),I(F,"y1",e(G).y),I(F,"y2",e(G).y)}),m(Z,ie)});var he=d(Y);je(he,17,()=>e(x).bars,Z=>Z.key,(Z,G)=>{var ie=vp(),F=Fe(ie);let L;var re=d(F);{var be=H=>{var ce=up();I(ce,"y",o-8);var xe=s(ce);E(()=>{I(ce,"x",e(G).x+e(G).w/2),p(xe,e(G).label)}),m(H,ce)};oe(re,H=>{e(G).showLabel&&H(be)})}var ye=d(re);E(()=>{L=Ge(F,0,"bar svelte-1ixrxd8",null,L,{zero:e(G).minutes===0,current:e(G).isCurrent}),I(F,"x",e(G).x),I(F,"y",e(G).y),I(F,"width",e(G).w),I(F,"height",e(G).h),I(ye,"x",e(G).hitX),I(ye,"y",c.top),I(ye,"width",e(G).hitW),I(ye,"height",i)}),kt("pointerenter",ye,()=>v(g,e(G).i,!0)),kt("pointerleave",ye,()=>v(g,null)),m(Z,ie)});var le=d(D,2);{var ne=Z=>{var G=fp();let ie;var F=s(G);E(L=>{ie=Rt(G,"",ie,L),p(F,`${e(S).label??""} · ${e(S).minutes??""} ${e(n).stats.unitMin??""}`)},[()=>({left:Math.min(88,Math.max(12,(e(S).x+e(S).w/2)/r*100))+"%",top:e(S).y/o*100+"%"})]),m(Z,G)};oe(le,Z=>{e(S)&&Z(ne)})}E(()=>I(D,"aria-label",e(n).stats.trendChartAria)),kt("pointerleave",D,()=>v(g,null)),m(A,k)};oe(M,A=>{t.data.length===0?A(R):A(w,-1)})}m(a,T),vt()}var pp=C('<div class="empty svelte-s63rv4"> </div>'),gp=Dn('<circle role="presentation" pathLength="100"></circle>'),mp=C('<div class="tooltip svelte-s63rv4"> </div>'),bp=C('<span><i class="dot svelte-s63rv4"></i> <span class="name svelte-s63rv4"> </span> <span class="minutes svelte-s63rv4"> </span></span>'),yp=C('<div class="donut svelte-s63rv4"><div class="chart svelte-s63rv4"><svg role="img" class="svelte-s63rv4"><g></g></svg> <!></div> <div class="legend svelte-s63rv4"></div></div>');function kp(a,t){ut(t,!0);const n=j(gt),r=220,o=110,c=76,l=2/360*100,i=[90,75,60,45,30,15,0];function u(R){return`color-mix(in srgb, var(--color-accent, #e74c3c) ${i[R%i.length]}%, white)`}function f(R){return R>=i.length?Math.max(.4,1-(R-i.length+1)*.15):void 0}let _=z(null);const g=j(()=>t.projects.reduce((R,w)=>R+w.total_minutes,0)),h=j(()=>{if(e(g)<=0||t.projects.length===0)return[];const R=t.projects.length>1?l:0;let w=0;return t.projects.map((A,k)=>{const D=A.total_minutes/e(g),Y=Math.max(.6,D*100-R),he=(w+D/2)/100*2*Math.PI-Math.PI/2,le={i:k,p:A,len:Y,offset:w,color:u(k),opacity:f(k),tipX:o+c*Math.cos(he),tipY:o+c*Math.sin(he)};return w+=D*100,le})}),b=j(()=>e(_)!==null?e(h)[e(_)]:null);var x=Oe(),S=Fe(x);{var T=R=>{var w=pp(),A=s(w);E(()=>p(A,t.emptyText??e(n).stats.noProject)),m(R,w)},M=R=>{var w=yp(),A=s(w),k=s(A);I(k,"viewBox","0 0 220 220");var D=s(k);I(D,"transform","rotate(-90 110 110)"),je(D,21,()=>e(h),ne=>ne.p.project_id,(ne,Z)=>{var G=gp();let ie;I(G,"cx",o),I(G,"cy",o),I(G,"r",c);let F;E(()=>{ie=Ge(G,0,"seg svelte-s63rv4",null,ie,{hovered:e(_)===e(Z).i}),I(G,"opacity",e(Z).opacity),I(G,"stroke-dasharray",`${e(Z).len??""} ${100-e(Z).len}`),I(G,"stroke-dashoffset",-e(Z).offset),F=Rt(G,"",F,{stroke:e(Z).color})}),kt("pointerenter",G,()=>v(_,e(Z).i,!0)),kt("pointerleave",G,()=>v(_,null)),m(ne,G)});var Y=d(k,2);{var he=ne=>{var Z=mp();let G;var ie=s(Z);E(()=>{G=Rt(Z,"",G,{left:e(b).tipX/r*100+"%",top:e(b).tipY/r*100+"%"}),p(ie,`${e(b).p.project_name??""} · ${e(b).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),m(ne,Z)};oe(Y,ne=>{e(b)&&ne(he)})}var le=d(A,2);je(le,21,()=>e(h),ne=>ne.p.project_id,(ne,Z)=>{var G=bp();let ie;var F=s(G);let L;var re=d(F,2),be=s(re),ye=d(re,2),H=s(ye);E(()=>{ie=Ge(G,1,"legend-item svelte-s63rv4",null,ie,{hovered:e(_)===e(Z).i}),L=Rt(F,"",L,{background:e(Z).color,opacity:e(Z).opacity??1}),p(be,e(Z).p.project_name),p(H,`${e(Z).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),m(ne,G)}),E(()=>I(k,"aria-label",e(n).stats.donutChartAria)),m(R,w)};oe(S,R=>{e(h).length===0?R(T):R(M,-1)})}m(a,x),vt()}var wp=C("<button> </button>"),xp=C('<div class="error svelte-giv6a6" role="alert"> </div>'),Sp=C('<p class="loading svelte-giv6a6"> </p>'),Tp=C('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),Dp=C('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section></div>',1),Pp=C('<div class="stats-veil page-veil svelte-giv6a6"><div class="page svelte-giv6a6"><h2 class="svelte-giv6a6"> </h2> <div class="dims svelte-giv6a6"></div> <!> <!></div></div>');function Mp(a,t){ut(t,!0);const n=j(gt);let r=z("week"),o=z(null),c=z(0),l=z(!0),i=z(null),u=0;const f=j(()=>Yi(e(r))),_=j(()=>e(f).group),g=j(()=>e(_)==="day"?e(n).stats.byDay:e(_)==="week"?e(n).stats.byWeek:e(n).stats.byMonth),h=j(()=>({today:e(n).stats.dimToday,week:e(n).stats.dimWeek,month:e(n).stats.dimMonth,quarter:e(n).stats.dimQuarter,halfyear:e(n).stats.dimHalf,year:e(n).stats.dimYear})),b=j(()=>{var L;return((L=e(o))==null?void 0:L.summary.total_minutes)??0}),x=j(()=>{var L;return((L=e(o))==null?void 0:L.summary.total_sessions)??0}),S=j(()=>{var L;return((L=e(o))==null?void 0:L.summary.completed_tasks)??0}),T=j(()=>Math.round(e(b)/Math.max(1,e(f).days))),M=j(()=>{if(!e(o))return null;const L=e(o).trend;let re=0,be=0;for(const H of L)H.minutes>0?(be++,re=Math.max(re,be)):be=0;let ye={key:"",minutes:0,sessions:0};for(const H of L)H.minutes>ye.minutes&&(ye=H);return{activeDays:L.filter(H=>H.minutes>0).length,longest:re,perPeriod:L.length>0?Math.round(e(b)/L.length):0,peak:ye,projects:[...e(o).projects].sort((H,ce)=>ce.total_minutes-H.total_minutes)}}),R=j(()=>e(c)>0?Math.round((e(b)-e(c))/e(c)*100):e(b)>0?100:0),w=j(()=>`${e(R)>=0?"+":""}${e(R)}%`),A=j(()=>e(M)?e(M).projects:[]);St(()=>{const L=Yi(e(r)),re=sp(e(r)),be=++u;v(o,null),v(c,0),v(i,null),v(l,!0);const ye=-new Date().getTimezoneOffset();Di(L.start,L.end,L.group,ye).then(H=>{be===u&&(v(o,H,!0),v(l,!1))}).catch(H=>{be===u&&(v(i,String(H),!0),v(l,!1))}),Di(re.start,re.end,L.group,ye).then(H=>{be===u&&v(c,H.summary.total_minutes,!0)}).catch(()=>{})});var k=Pp();Fr("giv6a6",L=>{Cr(()=>{Qn.title=e(n).page.stats??""})});var D=s(k),Y=s(D),he=s(Y),le=d(Y,2);je(le,21,()=>op,L=>L.key,(L,re)=>{var be=wp();let ye;var H=s(be);E(()=>{ye=Ge(be,1,"dim-pill svelte-giv6a6",null,ye,{active:e(r)===e(re).key}),I(be,"aria-pressed",e(r)===e(re).key),p(H,e(h)[e(re).key])}),W("click",be,()=>v(r,e(re).key,!0)),m(L,be)});var ne=d(le,2);{var Z=L=>{var re=xp(),be=s(re);E(ye=>p(be,`⚠ ${ye??""}`),[()=>Nt(e(n).stats.loadError,{err:e(i)})]),m(L,re)};oe(ne,L=>{e(i)&&L(Z)})}var G=d(ne,2);{var ie=L=>{var re=Sp(),be=s(re);E(()=>p(be,e(n).stats.loading)),m(L,re)},F=L=>{var re=Dp(),be=Fe(re),ye=s(be);Wt(ye,{get icon(){return br},get label(){return e(n).stats.focusDuration},get value(){return e(b)},get unit(){return e(n).stats.unitMin},accent:!0});var H=d(ye,2);Wt(H,{get icon(){return Ls},get label(){return e(n).stats.sessions},get value(){return e(x)},get unit(){return e(n).stats.unitCount},accent:!0});var ce=d(H,2);Wt(ce,{get icon(){return hs},get label(){return e(n).stats.completed},get value(){return e(S)},get unit(){return e(n).stats.unitCount},accent:!0});var xe=d(ce,2);Wt(xe,{get icon(){return Lo},get label(){return e(n).stats.avg},get value(){return e(T)},get unit(){return e(n).stats.unitMin},accent:!0});var O=d(be,2);{var $=Ne=>{var Ie=Tp(),He=s(Ie);Wt(He,{get icon(){return Xl},get label(){return e(n).stats.activeDays},get value(){return e(M).activeDays},get unit(){return e(n).stats.unitDay},accent:!0});var B=d(He,2);{var fe=K=>{Wt(K,{get icon(){return Qu},get label(){return e(n).stats.longestStreak},get value(){return e(M).longest},get unit(){return e(n).stats.unitDay},accent:!0})};oe(B,K=>{(e(r)==="month"||e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&K(fe)})}var we=d(B,2);{var V=K=>{{let X=j(()=>e(_)==="week"?e(n).stats.avgWeek:e(n).stats.avgMonth);Wt(K,{get icon(){return Lo},get label(){return e(X)},get value(){return e(M).perPeriod},get unit(){return e(n).stats.unitMin},accent:!0})}};oe(we,K=>{(e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&K(V)})}var y=d(we,2);{var P=K=>{{let X=j(()=>e(_)==="month"?e(n).stats.peakMonth:e(n).stats.peakPeriod),Pe=j(()=>e(M).peak.key?Ic(e(M).peak.key,e(_)):"—"),De=j(()=>e(M).peak.minutes?`${e(M).peak.minutes} ${e(n).stats.unitMin}`:"");Wt(K,{get icon(){return mi},get label(){return e(X)},get value(){return e(Pe)},get unit(){return e(De)},accent:!0})}};oe(y,K=>{(e(r)==="halfyear"||e(r)==="year")&&K(P)})}var ae=d(y,2);{var J=K=>{{let X=j(()=>`${e(M).projects[0].total_minutes} ${e(n).stats.unitMin}`);Wt(K,{get icon(){return mi},get label(){return e(n).stats.bestProject},get value(){return e(M).projects[0].project_name},get unit(){return e(X)},accent:!0})}};oe(ae,K=>{(e(r)==="halfyear"||e(r)==="year")&&e(M).projects[0]&&K(J)})}var Q=d(ae,2);Wt(Q,{get icon(){return Lo},get label(){return e(n).stats.momRatio},get value(){return e(w)},accent:!0}),m(Ne,Ie)};oe(O,Ne=>{e(M)&&e(r)!=="today"&&Ne($)})}var U=d(O,2);let ee;var pe=s(U),ke=s(pe),ve=s(ke),ge=d(ke,2);_p(ge,{get data(){return e(o).trend},get group(){return e(_)}});var q=d(pe,2),se=s(q),ue=s(se),Se=d(se,2);kp(Se,{get projects(){return e(A)}}),E(()=>{ee=Ge(U,1,"charts svelte-giv6a6",null,ee,{split:e(r)!=="month"}),p(ve,`${e(n).stats.trendTitle??""}（${e(g)??""}）`),p(ue,e(n).stats.projectDist)}),m(L,re)};oe(G,L=>{e(l)?L(ie):e(o)&&L(F,1)})}E(()=>p(he,e(n).nav.stats)),m(a,k),vt()}yt(["click"]);var Ep=C('<button type="button" role="switch"><span class="knob svelte-1re5fgf"></span></button>');function ir(a,t){ut(t,!0);let n=pa(t,"disabled",3,!1);var r=Ep();let o;E(()=>{o=Ge(r,1,"switch svelte-1re5fgf",null,o,{on:t.checked}),I(r,"aria-checked",t.checked),I(r,"aria-label",t.label),r.disabled=n()}),W("click",r,()=>t.onChange(!t.checked)),m(a,r),vt()}yt(["click"]);async function Cp(){return await qe("plugin:autostart|is_enabled")}async function Np(){await qe("plugin:autostart|enable")}async function jp(){await qe("plugin:autostart|disable")}var Br=C("<option> </option>"),Fp=C('<div class="error svelte-90mmv5" role="alert"> </div>'),Ap=C('<div><h2 class="tab-title svelte-90mmv5"> </h2> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <button type="button" class="action svelte-90mmv5"> </button></div></div> <p class="tray-hint svelte-90mmv5"> </p></section> <!></div>');function Ip(a,t){ut(t,!0);const n=j(gt),r=j(Va),o=[1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90],c=[2,3,4,5,6];function l(Te,$e){return $e.includes(Te)?$e:[...$e,Te].sort((bt,Kt)=>bt-Kt)}let i=z(!1),u=z(!1),f=z(0),_=z(null);async function g(){try{v(i,await Cp(),!0)}catch(Te){console.warn("isEnabled failed",Te),v(i,!1)}try{const Te=await Tn({status:"active"});v(f,Te.length,!0)}catch{}}St(()=>{g()}),St(()=>{e(r).focusDuration,e(r).shortBreakDuration,e(r).longBreakDuration,e(r).longBreakInterval,yf()});function h(Te,$e){ki({[Te]:$e})}function b(Te){Te&&e(r).autoStartBreak?ki({disableBreak:!0,autoStartBreak:!1}):h("disableBreak",Te)}async function x(){if(!e(u)){v(u,!0),v(_,null);try{e(i)?(await jp(),v(i,!1)):(await Np(),v(i,!0))}catch(Te){v(_,Nt(e(n).settings.autostartFail,{err:String(Te)}),!0)}finally{v(u,!1)}}}async function S(){v(_,null);try{let Te=await xo();if(Te||(Te=await So()==="granted"),!Te){v(_,e(n).settings.notifPermDenied,!0);return}To({title:e(n).settings.testNotifTitle,body:Nt(e(n).settings.testNotifBody,{n:e(f)})})}catch(Te){v(_,Nt(e(n).settings.notifSendFail,{err:String(Te)}),!0)}}var T=Ap(),M=s(T),R=s(M),w=d(M,2),A=s(w),k=s(A),D=d(A,2),Y=s(D),he=s(Y),le=s(he),ne=d(he,2);je(ne,20,()=>l(e(r).focusDuration,o),Te=>Te,(Te,$e)=>{var bt=Br(),Kt=s(bt),ea={};E(()=>{p(Kt,`${$e??""}${e(n).settings.minute??""}`),ea!==(ea=$e)&&(bt.value=(bt.__value=$e)??"")}),m(Te,bt)});var Z;Bt(ne);var G=d(Y,2),ie=s(G),F=s(ie),L=d(ie,2);je(L,20,()=>l(e(r).shortBreakDuration,o),Te=>Te,(Te,$e)=>{var bt=Br(),Kt=s(bt),ea={};E(()=>{p(Kt,`${$e??""}${e(n).settings.minute??""}`),ea!==(ea=$e)&&(bt.value=(bt.__value=$e)??"")}),m(Te,bt)});var re;Bt(L);var be=d(G,2),ye=s(be),H=s(ye),ce=d(ye,2);je(ce,20,()=>l(e(r).longBreakDuration,o),Te=>Te,(Te,$e)=>{var bt=Br(),Kt=s(bt),ea={};E(()=>{p(Kt,`${$e??""}${e(n).settings.minute??""}`),ea!==(ea=$e)&&(bt.value=(bt.__value=$e)??"")}),m(Te,bt)});var xe;Bt(ce);var O=d(be,2),$=s(O),U=s($),ee=d($,2);je(ee,20,()=>l(e(r).longBreakInterval,c),Te=>Te,(Te,$e)=>{var bt=Br(),Kt=s(bt),ea={};E(()=>{p(Kt,`${$e??""}${e(n).settings.pomodoroUnit??""}`),ea!==(ea=$e)&&(bt.value=(bt.__value=$e)??"")}),m(Te,bt)});var pe;Bt(ee);var ke=d(w,2),ve=s(ke),ge=s(ve),q=d(ve,2),se=s(q),ue=s(se),Se=s(ue),Ne=s(Se),Ie=d(Se,2),He=s(Ie),B=d(ue,2);ir(B,{get checked(){return e(r).autoStartNextPomodoro},onChange:Te=>h("autoStartNextPomodoro",Te),get label(){return e(n).settings.autoStartNext}});var fe=d(se,2),we=s(fe),V=s(we),y=s(V),P=d(V,2),ae=s(P),J=d(we,2);ir(J,{get checked(){return e(r).autoStartBreak},onChange:Te=>h("autoStartBreak",Te),get label(){return e(n).settings.autoStartBreak}});var Q=d(fe,2),K=s(Q),X=s(K),Pe=s(X),De=d(X,2),Ue=s(De),mt=d(K,2);ir(mt,{get checked(){return e(r).disableBreak},onChange:b,get label(){return e(n).settings.disableBreak}});var dt=d(ke,2),ft=s(dt),rt=s(ft),We=d(ft,2),me=s(We),_e=s(me),et=s(_e),tt=d(_e,2);ir(tt,{get checked(){return e(r).desktopNotificationEnabled},onChange:Te=>h("desktopNotificationEnabled",Te),get label(){return e(n).settings.systemNotification}});var ht=d(me,2),nt=s(ht),Pt=s(nt),jt=s(Pt),Lt=d(Pt,2),zt=s(Lt),Ve=d(nt,2);ir(Ve,{get checked(){return e(i)},onChange:x,get label(){return e(n).settings.autostart},get disabled(){return e(u)}});var pt=d(ht,2),lt=s(pt),Ht=s(lt),Ct=s(Ht),Be=d(Ht,2),Ae=s(Be),it=d(lt,2),te=s(it),Me=d(We,2),Le=s(Me),Ye=d(dt,2);{var Mt=Te=>{var $e=Fp(),bt=s($e);E(()=>p(bt,`⚠ ${e(_)??""}`)),m(Te,$e)};oe(Ye,Te=>{e(_)&&Te(Mt)})}E(()=>{p(R,e(n).settings.timerTitle),p(k,e(n).settings.durationSetting),p(le,e(n).settings.focusDuration),Z!==(Z=e(r).focusDuration)&&(ne.value=(ne.__value=e(r).focusDuration)??"",At(ne,e(r).focusDuration)),p(F,e(n).settings.shortBreakDuration),re!==(re=e(r).shortBreakDuration)&&(L.value=(L.__value=e(r).shortBreakDuration)??"",At(L,e(r).shortBreakDuration)),p(H,e(n).settings.longBreakDuration),xe!==(xe=e(r).longBreakDuration)&&(ce.value=(ce.__value=e(r).longBreakDuration)??"",At(ce,e(r).longBreakDuration)),p(U,e(n).settings.longBreakInterval),pe!==(pe=e(r).longBreakInterval)&&(ee.value=(ee.__value=e(r).longBreakInterval)??"",At(ee,e(r).longBreakInterval)),p(ge,e(n).settings.behaviorSetting),p(Ne,e(n).settings.autoStartNext),p(He,e(n).settings.autoStartNextDesc),p(y,e(n).settings.autoStartBreak),p(ae,e(n).settings.autoStartBreakDesc),p(Pe,e(n).settings.disableBreak),p(Ue,e(n).settings.disableBreakDesc),p(rt,e(n).settings.systemSection),p(et,e(n).settings.systemNotification),p(jt,e(n).settings.autostart),p(zt,e(n).settings.autostartHint),p(Ct,e(n).settings.notifTest),p(Ae,e(n).settings.notifTestHint),p(te,e(n).settings.sendTest),p(Le,e(n).settings.trayHint)}),W("change",ne,Te=>h("focusDuration",Number(Te.currentTarget.value))),W("change",L,Te=>h("shortBreakDuration",Number(Te.currentTarget.value))),W("change",ce,Te=>h("longBreakDuration",Number(Te.currentTarget.value))),W("change",ee,Te=>h("longBreakInterval",Number(Te.currentTarget.value))),W("click",it,S),m(a,T),vt()}yt(["change","click"]);const uo=["#c97b6e","#d4945c","#d4a574","#b8a878","#7fa086","#6b9b8a","#5c8b84","#5c8fad","#7a8fb0","#8b7baf","#a68b78","#a8a298"],Za=uo[0];var qp=C('<div class="error svelte-1o455o6" role="alert"> </div>'),Rp=C('<div class="add-root-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),Lp=C('<button type="button" class="add-root-btn svelte-1o455o6"><!> </button>'),Op=C('<button type="button"></button>'),Bp=C('<div class="edit-box svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/> <div class="color-row svelte-1o455o6"></div> <div class="edit-actions svelte-1o455o6"><button type="button" class="link-btn svelte-1o455o6"> </button> <button type="button" class="save-btn svelte-1o455o6"> </button></div></div>'),zp=C('<button type="button" class="chevron svelte-1o455o6"><!></button>'),Hp=C('<span class="chevron-spacer svelte-1o455o6"></span>'),Up=C('<button type="button" class="icon-btn svelte-1o455o6"><!></button>'),Wp=C('<div role="treeitem" tabindex="-1" aria-selected="false"><span><!> <span class="dot svelte-1o455o6"></span> <span class="name svelte-1o455o6"> </span></span> <span class="actions svelte-1o455o6"><!> <button type="button" class="icon-btn svelte-1o455o6"><!></button> <button type="button" class="icon-btn danger svelte-1o455o6"><!></button></span></div>'),Yp=C('<div class="add-child-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),Gp=C('<div class="row-wrap svelte-1o455o6"><!> <!></div>'),Vp=C('<div class="empty svelte-1o455o6"> </div>'),Kp=C('<div class="manager svelte-1o455o6"><h2 class="tab-title svelte-1o455o6"> </h2> <p class="drag-hint svelte-1o455o6"> </p> <!> <!> <div role="tree" tabindex="-1"><!> <!></div></div>');function $p(a,t){ut(t,!0);const n=j(gt);let r=z(ze([])),o=z(ze(new Set)),c=z("root"),l=z(""),i=z(null),u=z(""),f=z(ze(Za)),_=z(null),g=z(null),h=z(null),b=z(!1);function x(){return new Date().toISOString()}async function S(){try{v(r,await zs(),!0)}catch{}}rn(()=>{S()}),St(()=>{if(!e(_))return;const y=window.setTimeout(()=>v(_,null),3e3);return()=>window.clearTimeout(y)});function T(y){const P=new Map,ae=[];for(const K of y)P.set(K.id,{...K,children:[],depth:0});for(const K of y){const X=P.get(K.id);X&&(K.parent_id&&P.has(K.parent_id)?P.get(K.parent_id).children.push(X):ae.push(X))}const J=K=>{K.sort((X,Pe)=>(X.display_order??0)-(Pe.display_order??0)||(X.created_at??"").localeCompare(Pe.created_at??"")||X.id.localeCompare(Pe.id)),K.forEach(X=>J(X.children))};J(ae);const Q=(K,X)=>{for(const Pe of K)Pe.depth=X,Q(Pe.children,X+1)};return Q(ae,0),ae}function M(y,P){const ae=[];for(const J of y)ae.push(J),P.has(J.id)&&J.children.length>0&&ae.push(...M(J.children,P));return ae}const R=j(()=>T(e(r))),w=j(()=>M(e(R),e(o)));function A(y){const P=new Set(e(o));P.has(y)?P.delete(y):P.add(y),v(o,P,!0)}function k(){const y=new Map;for(const P of e(r))y.set(P.id,P.parent_id??null);return y}function D(){const y=new Map;for(const P of e(r)){const ae=P.parent_id??null;y.has(ae)||y.set(ae,[]),y.get(ae).push(P.id)}return y}function Y(y,P){const ae=P.get(y)??[];return ae.length===0?1:1+Math.max(...ae.map(J=>Y(J,P)))}function he(y,P,ae){let J=y;const Q=new Set;for(;J;){if(J===P)return!0;if(Q.has(J))return!1;Q.add(J),J=ae.get(J)??null}return!1}async function le(){const y=e(l).trim();if(!y)return;const P=e(c)==="root"?null:e(c),ae=e(r).filter(J=>(J.parent_id??null)===P);try{await oo({id:crypto.randomUUID(),name:y,color:Za,parent_id:P,display_order:ae.length,created_at:x(),updated_at:x()})}catch(J){v(_,String(J),!0)}if(v(l,""),v(c,null),P){const J=new Set(e(o));J.add(P),v(o,J,!0)}await S()}function ne(y){v(i,y.id,!0),v(u,y.name,!0),v(f,y.color??Za,!0)}async function Z(){if(!e(i))return;const y=e(u).trim();if(!y)return;const P=e(r).find(ae=>ae.id===e(i));if(P){try{await oo({...P,name:y,color:e(f),updated_at:x()})}catch(ae){v(_,String(ae),!0)}v(i,null),v(u,""),await S()}}async function G(y){try{await hc(y)}catch(P){v(_,String(P),!0)}await S()}function ie(y){return y.includes("exceed max depth")?e(n).settings.list.reorderFailDepth:y.includes("cycle")?e(n).settings.list.reorderFailCycle:e(n).settings.list.reorderFail}function F(y){return y.map(P=>({id:P.id,parent_id:P.parent_id??null,display_order:P.display_order??0}))}function L(y){const P=new Map;for(const J of y){const Q=J.parent_id??null;P.has(Q)||P.set(Q,[]),P.get(Q).push(J)}const ae=new Map;for(const J of P.values())J.slice().sort((Q,K)=>(Q.display_order??0)-(K.display_order??0)).forEach((Q,K)=>ae.set(Q.id,K));return y.map(J=>({...J,display_order:ae.get(J.id)??0}))}async function re(y,P){if(!e(r).find(X=>X.id===y))return;const J=e(r).filter(X=>(X.parent_id??null)===P&&X.id!==y).length,Q=e(r).map(X=>X.id===y?{...X,parent_id:P,display_order:J}:X),K=L(Q);if(v(r,K,!0),P){const X=new Set(e(o));X.add(P),v(o,X,!0)}try{await jv(F(K)),await S()}catch(X){await S(),v(_,ie(String(X)),!0)}}function be(y){const P=e(g);if(H(),!P||P===y.id)return;const ae=e(r).find(K=>K.id===P);if(!ae||(ae.parent_id??null)===y.id)return;const J=k();if(he(y.id,P,J)){v(_,e(n).settings.list.reorderFailCycle,!0);return}const Q=Y(P,D());if(y.depth+Q>2){v(_,e(n).settings.list.reorderFailDepth,!0);return}re(P,y.id)}function ye(){const y=e(g);if(H(),!y)return;const P=e(r).find(ae=>ae.id===y);if(P){if((P.parent_id??null)===null){const ae=e(r).filter(J=>J.parent_id==null&&J.id!==y).length;if((P.display_order??0)===ae)return}re(y,null)}}function H(){v(g,null),v(h,null),v(b,!1)}function ce(y,P){y.dataTransfer&&(v(g,P.id,!0),y.dataTransfer.effectAllowed="move",y.dataTransfer.setData("text/plain",P.id))}function xe(y,P){e(g)&&(y.preventDefault(),y.stopPropagation(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),v(h,P.id,!0),v(b,!1))}function O(y,P){y.preventDefault(),y.stopPropagation(),be(P)}function $(y){e(g)&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),v(b,!0),v(h,null))}function U(y){y.preventDefault(),ye()}function ee(y){y.target===y.currentTarget&&v(b,!1)}var pe=Kp(),ke=s(pe),ve=s(ke),ge=d(ke,2),q=s(ge),se=d(ge,2);{var ue=y=>{var P=qp(),ae=s(P);E(()=>p(ae,e(_))),m(y,P)};oe(se,y=>{e(_)&&y(ue)})}var Se=d(se,2);{var Ne=y=>{var P=Rp(),ae=s(P);gn(ae,!0),E(()=>I(ae,"placeholder",e(n).settings.list.addRootPlaceholder)),W("keydown",ae,J=>{J.key==="Enter"&&le(),J.key==="Escape"&&(v(c,null),v(l,""))}),kt("blur",ae,()=>{e(l).trim()?le():(v(c,null),v(l,""))}),wt(ae,()=>e(l),J=>v(l,J)),m(y,P)},Ie=y=>{var P=Lp(),ae=s(P);Yn(ae,{size:16});var J=d(ae);E(()=>p(J,` ${e(n).settings.list.addRoot??""}`)),W("click",P,()=>{v(c,"root"),v(l,"")}),m(y,P)};oe(Se,y=>{e(c)==="root"?y(Ne):y(Ie,-1)})}var He=d(Se,2);let B;var fe=s(He);je(fe,17,()=>e(w),y=>y.id,(y,P)=>{const ae=j(()=>e(i)===e(P).id),J=j(()=>e(c)===e(P).id),Q=j(()=>e(P).children.length>0),K=j(()=>e(o).has(e(P).id)),X=j(()=>!e(ae)&&!e(J)&&e(P).depth>0);var Pe=Gp(),De=s(Pe);{var Ue=rt=>{var We=Bp(),me=s(We),_e=d(me,2);je(_e,20,()=>uo,jt=>jt,(jt,Lt)=>{var zt=Op();let Ve;E(pt=>{Ve=Ge(zt,1,"swatch svelte-1o455o6",null,Ve,{active:e(f)===Lt}),Rt(zt,`background-color: ${Lt??""}`),I(zt,"aria-label",pt)},[()=>Nt(e(n).settings.tag.colorAria,{color:Lt})]),W("click",zt,()=>v(f,Lt,!0)),m(jt,zt)});var et=d(_e,2),tt=s(et),ht=s(tt),nt=d(tt,2),Pt=s(nt);E(()=>{I(me,"placeholder",e(P).name),p(ht,e(n).settings.repeatCustom.cancel),p(Pt,e(n).settings.notification.save)}),W("keydown",me,jt=>{jt.key==="Enter"&&Z(),jt.key==="Escape"&&(v(i,null),v(u,""))}),wt(me,()=>e(u),jt=>v(u,jt)),W("click",tt,()=>{v(i,null),v(u,"")}),W("click",nt,Z),m(rt,We)},mt=rt=>{var We=Wp();let me;var _e=s(We);let et;var tt=s(_e);{var ht=Ae=>{var it=zp(),te=s(it);{var Me=Ye=>{Un(Ye,{size:14})},Le=Ye=>{Wn(Ye,{size:14})};oe(te,Ye=>{e(K)?Ye(Me):Ye(Le,-1)})}E(()=>I(it,"aria-label",e(K)?e(n).common.expand:e(n).common.collapse)),W("click",it,Ye=>{Ye.stopPropagation(),A(e(P).id)}),m(Ae,it)},nt=Ae=>{var it=Hp();m(Ae,it)};oe(tt,Ae=>{e(Q)?Ae(ht):Ae(nt,-1)})}var Pt=d(tt,2),jt=d(Pt,2),Lt=s(jt),zt=d(_e,2),Ve=s(zt);{var pt=Ae=>{var it=Up(),te=s(it);Yn(te,{size:14}),E(()=>{I(it,"title",e(n).settings.list.addChild),I(it,"aria-label",e(n).settings.list.addChild)}),W("click",it,Me=>{Me.stopPropagation(),v(c,e(P).id,!0),v(l,"")}),m(Ae,it)};oe(Ve,Ae=>{e(P).depth<2&&Ae(pt)})}var lt=d(Ve,2),Ht=s(lt);Os(Ht,{size:14});var Ct=d(lt,2),Be=s(Ct);yo(Be,{size:14}),E(()=>{me=Ge(We,1,"row svelte-1o455o6",null,me,{"drop-over":e(h)===e(P).id&&e(g)!==e(P).id,dragging:e(g)===e(P).id}),I(We,"draggable",e(X)),et=Ge(_e,1,"label svelte-1o455o6",null,et,{grabbable:e(X)}),Rt(Pt,`background-color: ${e(P).color??Za??""}`),p(Lt,e(P).name),I(lt,"title",e(n).settings.list.edit),I(lt,"aria-label",e(n).settings.list.edit),I(Ct,"title",e(n).settings.list.del),I(Ct,"aria-label",e(n).settings.list.del)}),kt("dragstart",We,Ae=>ce(Ae,e(P))),kt("dragover",We,Ae=>xe(Ae,e(P))),kt("drop",We,Ae=>O(Ae,e(P))),kt("dragend",We,H),W("click",lt,Ae=>{Ae.stopPropagation(),ne(e(P))}),W("click",Ct,Ae=>{Ae.stopPropagation(),G(e(P).id)}),m(rt,We)};oe(De,rt=>{e(ae)?rt(Ue):rt(mt,-1)})}var dt=d(De,2);{var ft=rt=>{var We=Yp(),me=s(We);gn(me,!0),E(()=>I(me,"placeholder",e(P).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)),W("keydown",me,_e=>{_e.key==="Enter"&&le(),_e.key==="Escape"&&(v(c,null),v(l,""))}),kt("blur",me,()=>{e(l).trim()?le():(v(c,null),v(l,""))}),wt(me,()=>e(l),_e=>v(l,_e)),m(rt,We)};oe(dt,rt=>{e(J)&&rt(ft)})}E(()=>Rt(Pe,`padding-left: ${e(P).depth*24}px`)),m(y,Pe)});var we=d(fe,2);{var V=y=>{var P=Vp(),ae=s(P);E(()=>p(ae,e(n).settings.list.empty)),m(y,P)};oe(we,y=>{e(r).length===0&&e(c)!=="root"&&y(V)})}E(()=>{p(ve,e(n).settings.list.title),p(q,e(n).settings.list.dragHint),B=Ge(He,1,"tree svelte-1o455o6",null,B,{"over-root":e(b)})}),kt("dragover",He,$),kt("drop",He,U),kt("dragleave",He,ee),m(a,pe),vt()}yt(["keydown","click"]);var Gi=C('<button type="button"></button>'),Jp=C('<div class="error svelte-1hwdvdh" role="alert"> </div>'),Qp=C('<div class="edit-box svelte-1hwdvdh"><div class="edit-name-row svelte-1hwdvdh"><span class="name-label svelte-1hwdvdh"> </span> <input type="text" class="text-input svelte-1hwdvdh"/></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div> <div class="edit-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <button type="button" class="save-btn svelte-1hwdvdh"> </button></div></div>'),Xp=C('<div class="tag-row svelte-1hwdvdh"><div class="tag-row-main svelte-1hwdvdh"><span class="grip svelte-1hwdvdh"><!></span> <span class="dot svelte-1hwdvdh"></span> <span class="tag-name svelte-1hwdvdh"> </span></div> <div class="tag-row-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <span class="sep svelte-1hwdvdh">|</span> <button type="button" class="link-btn danger svelte-1hwdvdh"> </button></div></div>'),Zp=C('<div role="listitem" tabindex="-1"><!></div>'),eg=C('<div class="empty svelte-1hwdvdh"> </div>'),tg=C('<div><h2 class="tab-title svelte-1hwdvdh"> </h2> <div class="add-card svelte-1hwdvdh"><div class="add-row svelte-1hwdvdh"><input type="text" class="text-input svelte-1hwdvdh"/> <button type="button" class="add-btn svelte-1hwdvdh"> </button></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div></div> <!> <div class="tag-list svelte-1hwdvdh" role="list"></div> <!></div>');function ag(a,t){ut(t,!0);const n=j(gt);let r=z(ze([])),o=z(""),c=z(ze(Za)),l=z(null),i=z(""),u=z(ze(Za)),f=z(null),_=z(null),g=z(null);function h(){return new Date().toISOString()}async function b(){try{const U=await Hs();v(r,[...U].sort((ee,pe)=>(ee.display_order??0)-(pe.display_order??0)||(ee.created_at??"").localeCompare(pe.created_at??"")||ee.id.localeCompare(pe.id)),!0)}catch{}}rn(()=>{b()}),St(()=>{if(!e(f))return;const U=window.setTimeout(()=>v(f,null),3e3);return()=>window.clearTimeout(U)});function x(U,ee,pe){const ke=U.slice(),[ve]=ke.splice(ee,1);return ke.splice(pe,0,ve),ke}async function S(){const U=e(o).trim();if(U)try{await Si({id:crypto.randomUUID(),name:U,color:e(c),display_order:e(r).length,created_at:h(),updated_at:h()}),v(o,""),await b()}catch(ee){v(f,String(ee),!0)}}async function T(U){try{await Fv(U),await b()}catch(ee){v(f,String(ee),!0)}}function M(U){v(l,U.id,!0),v(i,U.name,!0),v(u,U.color??Za,!0)}async function R(){if(!e(l))return;const U=e(i).trim();if(!U)return;const ee=e(r).find(pe=>pe.id===e(l));if(ee){try{await Si({...ee,name:U,color:e(u),updated_at:h()})}catch(pe){v(f,String(pe),!0)}v(l,null),await b()}}function w(U,ee){U.dataTransfer&&(v(_,ee.id,!0),U.dataTransfer.effectAllowed="move",U.dataTransfer.setData("text/plain",ee.id))}function A(U,ee){!e(_)||e(_)===ee.id||(U.preventDefault(),U.stopPropagation(),U.dataTransfer&&(U.dataTransfer.dropEffect="move"),v(g,ee.id,!0))}function k(U,ee){U.preventDefault(),U.stopPropagation();const pe=e(_);if(v(_,null),v(g,null),!pe||pe===ee.id)return;const ke=e(r).findIndex(ue=>ue.id===pe),ve=e(r).findIndex(ue=>ue.id===ee.id);if(ke<0||ve<0)return;const ge=e(r),q=x(e(r),ke,ve);v(r,q,!0);const se=q.map((ue,Se)=>({id:ue.id,display_order:Se}));Av(se).then(b).catch(async ue=>{v(r,ge,!0),await b(),v(f,String(ue)||e(n).settings.list.reorderFail,!0)})}function D(){v(_,null),v(g,null)}var Y=tg(),he=s(Y),le=s(he),ne=d(he,2),Z=s(ne),G=s(Z),ie=d(G,2),F=s(ie),L=d(Z,2),re=s(L),be=s(re),ye=d(re,2);je(ye,20,()=>uo,U=>U,(U,ee)=>{var pe=Gi();let ke;E(ve=>{ke=Ge(pe,1,"swatch svelte-1hwdvdh",null,ke,{active:e(c)===ee}),Rt(pe,`background-color: ${ee??""}`),I(pe,"aria-label",ve)},[()=>Nt(e(n).settings.tag.colorAria,{color:ee})]),W("click",pe,()=>v(c,ee,!0)),m(U,pe)});var H=d(ne,2);{var ce=U=>{var ee=Jp(),pe=s(ee);E(()=>p(pe,e(f))),m(U,ee)};oe(H,U=>{e(f)&&U(ce)})}var xe=d(H,2);je(xe,21,()=>e(r),U=>U.id,(U,ee)=>{const pe=j(()=>e(l)===e(ee).id);var ke=Zp();let ve;var ge=s(ke);{var q=ue=>{var Se=Qp(),Ne=s(Se),Ie=s(Ne),He=s(Ie),B=d(Ie,2);gn(B,!0);var fe=d(Ne,2),we=s(fe),V=s(we),y=d(we,2);je(y,20,()=>uo,X=>X,(X,Pe)=>{var De=Gi();let Ue;E(mt=>{Ue=Ge(De,1,"swatch sm svelte-1hwdvdh",null,Ue,{active:e(u)===Pe}),Rt(De,`background-color: ${Pe??""}`),I(De,"aria-label",mt)},[()=>Nt(e(n).settings.tag.colorAria,{color:Pe})]),W("click",De,()=>v(u,Pe,!0)),m(X,De)});var P=d(fe,2),ae=s(P),J=s(ae),Q=d(ae,2),K=s(Q);E(()=>{p(He,e(n).settings.tag.nameLabel),p(V,e(n).settings.tag.colorLabel),p(J,e(n).settings.repeatCustom.cancel),p(K,e(n).settings.notification.save)}),W("keydown",B,X=>{X.key==="Enter"&&R(),X.key==="Escape"&&v(l,null)}),wt(B,()=>e(i),X=>v(i,X)),W("click",ae,()=>v(l,null)),W("click",Q,R),m(ue,Se)},se=ue=>{var Se=Xp(),Ne=s(Se),Ie=s(Ne),He=s(Ie);Zu(He,{size:16});var B=d(Ie,2),fe=d(B,2),we=s(fe),V=d(Ne,2),y=s(V),P=s(y),ae=d(y,4),J=s(ae);E(()=>{I(Ie,"aria-label",e(n).settings.tag.dragHandle),I(Ie,"title",e(n).settings.tag.dragHandle),Rt(B,`background-color: ${e(ee).color??Za??""}`),p(we,e(ee).name),p(P,e(n).settings.list.edit),p(J,e(n).settings.list.del)}),W("click",y,()=>M(e(ee))),W("click",ae,()=>void T(e(ee).id)),m(ue,Se)};oe(ge,ue=>{e(pe)?ue(q):ue(se,-1)})}E(()=>{ve=Ge(ke,1,"tag-card svelte-1hwdvdh",null,ve,{dragging:e(_)===e(ee).id,"drop-over":e(g)===e(ee).id&&e(_)!==null&&e(_)!==e(ee).id}),I(ke,"draggable",!e(pe))}),kt("dragstart",ke,ue=>w(ue,e(ee))),kt("dragover",ke,ue=>A(ue,e(ee))),kt("drop",ke,ue=>k(ue,e(ee))),kt("dragend",ke,D),m(U,ke)});var O=d(xe,2);{var $=U=>{var ee=eg(),pe=s(ee);E(()=>p(pe,e(n).settings.tag.empty)),m(U,ee)};oe(O,U=>{e(r).length===0&&U($)})}E(()=>{p(le,e(n).settings.tab.tags),I(G,"placeholder",e(n).settings.tag.namePlaceholder),p(F,e(n).settings.tag.add),p(be,e(n).settings.tag.colorLabel)}),W("keydown",G,U=>{U.key==="Enter"&&S()}),wt(G,()=>e(o),U=>v(o,U)),W("click",ie,S),m(a,Y),vt()}yt(["keydown","click"]);var Vi=C('<span class="badge svelte-wf1h2h"><!></span>'),ng=C('<button type="button"><!> <span class="card-name svelte-wf1h2h"> </span></button>'),rg=C('<button type="button"><!> <span class="card-name corner svelte-wf1h2h"> </span></button>'),og=C('<p class="used svelte-wf1h2h"><!> </p>'),sg=C('<div class="thumb svelte-wf1h2h"></div> <span class="used svelte-wf1h2h"><!> </span> <button type="button" class="clear-btn svelte-wf1h2h"><!> </button>',1),ig=C('<p class="fail svelte-wf1h2h" role="alert"> </p>'),lg=C('<button type="button" class="reset-btn svelte-wf1h2h"><!> </button>'),cg=C('<div class="setting svelte-wf1h2h"><h2 class="tab-title svelte-wf1h2h"> </h2> <p class="desc svelte-wf1h2h"> </p> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div> <p class="hint svelte-wf1h2h"> </p> <!></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="custom-row svelte-wf1h2h"><label class="upload-btn svelte-wf1h2h"><input type="file" accept="image/*" class="file-input svelte-wf1h2h"/> <!> </label> <!></div> <!> <p class="hint svelte-wf1h2h"> </p></section> <!></div>');function dg(a,t){ut(t,!0);const n=j(gt),r=j(Xf),o=j(Zf);let c=z(!1);async function l(ve){var ue;const ge=ve.currentTarget,q=(ue=ge.files)==null?void 0:ue[0];if(!q)return;v(c,!1);const se=await nh(q);se?ah(se):v(c,!0),ge.value=""}const i=j(()=>{var ve;return((ve=e(o))==null?void 0:ve.kind)==="preset"?e(o).id:null}),u=j(()=>{var ve;return((ve=e(o))==null?void 0:ve.kind)==="custom"}),f=j(()=>{var ve;return e(r)==="default"&&((ve=e(o))==null?void 0:ve.kind)==="preset"&&e(o).id==="preset-bg-1"}),_=j(()=>{var ve,ge;if(((ve=e(o))==null?void 0:ve.kind)==="preset"){const q=io.find(se=>se.id===e(o).id);return q?`background-image: ${q.url}`:null}return((ge=e(o))==null?void 0:ge.kind)==="custom"?`background-image: ${e(o).url}`:null});var g=cg(),h=s(g),b=s(h),x=d(h,2),S=s(x),T=d(x,2),M=s(T),R=s(M),w=d(M,2);je(w,21,()=>Pc,ve=>ve.id,(ve,ge)=>{const q=j(()=>e(r)===e(ge).id);var se=ng();let ue;var Se=s(se);{var Ne=B=>{var fe=Vi(),we=s(fe);za(we,{size:11,strokeWidth:3}),m(B,fe)};oe(Se,B=>{e(q)&&B(Ne)})}var Ie=d(Se,2),He=s(Ie);E(()=>{ue=Ge(se,1,"card svelte-wf1h2h",null,ue,{active:e(q)}),Rt(se,`background: ${e(ge).preview??""}`),I(se,"title",e(n).settings.theme.presetName[e(ge).id]),I(se,"aria-pressed",e(q)),p(He,e(n).settings.theme.presetName[e(ge).id])}),W("click",se,()=>eh(e(ge).id)),m(ve,se)});var A=d(T,2),k=s(A),D=s(k),Y=d(k,2);je(Y,21,()=>io,ve=>ve.id,(ve,ge)=>{const q=j(()=>e(i)===e(ge).id);var se=rg();let ue;var Se=s(se);{var Ne=B=>{var fe=Vi(),we=s(fe);za(we,{size:11,strokeWidth:3}),m(B,fe)};oe(Se,B=>{e(q)&&B(Ne)})}var Ie=d(Se,2),He=s(Ie);E(()=>{ue=Ge(se,1,"card cover svelte-wf1h2h",null,ue,{active:e(q)}),Rt(se,`background-image: ${e(ge).url??""}`),I(se,"title",e(n).settings.theme.presetBgName[e(ge).id]),I(se,"aria-pressed",e(q)),p(He,e(n).settings.theme.presetBgName[e(ge).id])}),W("click",se,()=>th(e(ge).id)),m(ve,se)});var he=d(Y,2),le=s(he),ne=d(he,2);{var Z=ve=>{var ge=og(),q=s(ge);za(q,{size:13});var se=d(q);E(()=>p(se,` ${e(n).settings.theme.presetBgUsed??""}`)),m(ve,ge)};oe(ne,ve=>{e(i)&&ve(Z)})}var G=d(A,2),ie=s(G),F=s(ie),L=d(ie,2),re=s(L),be=s(re),ye=d(be,2);hv(ye,{size:14});var H=d(ye),ce=d(re,2);{var xe=ve=>{var ge=sg(),q=Fe(ge),se=d(q,2),ue=s(se);za(ue,{size:13});var Se=d(ue),Ne=d(se,2),Ie=s(Ne);ac(Ie,{size:12});var He=d(Ie);E(()=>{Rt(q,e(_)),I(q,"aria-label",e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed),p(Se,` ${(e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed)??""}`),p(He,` ${e(n).settings.theme.clearBg??""}`)}),W("click",Ne,function(...B){Wo==null||Wo.apply(this,B)}),m(ve,ge)};oe(ce,ve=>{e(o)&&e(_)&&ve(xe)})}var O=d(L,2);{var $=ve=>{var ge=ig(),q=s(ge);E(()=>p(q,e(n).settings.theme.compressFail)),m(ve,ge)};oe(O,ve=>{e(c)&&ve($)})}var U=d(O,2),ee=s(U),pe=d(G,2);{var ke=ve=>{var ge=lg(),q=s(ge);ov(q,{size:12});var se=d(q);E(()=>p(se,` ${e(n).settings.theme.reset??""}`)),W("click",ge,function(...ue){Yo==null||Yo.apply(this,ue)}),m(ve,ge)};oe(pe,ve=>{e(f)||ve(ke)})}E(()=>{p(b,e(n).settings.theme.title),p(S,e(n).settings.theme.desc),p(R,e(n).settings.theme.preset),p(D,e(n).settings.theme.presetBg),p(le,e(n).settings.theme.presetBgHint),p(F,e(n).settings.theme.custom),p(H,` ${e(n).settings.theme.upload??""}`),p(ee,e(n).settings.theme.customHint)}),W("change",be,l),m(a,g),vt()}yt(["click","change"]);var ug=C('<div class="error svelte-16699lq" role="alert"> </div>'),vg=C('<div class="empty svelte-16699lq"> </div>'),fg=C('<div class="item svelte-16699lq"><div class="item-main svelte-16699lq"><div class="item-text svelte-16699lq"> </div> <div class="item-author svelte-16699lq"> </div></div> <button type="button" class="del-btn svelte-16699lq"><!></button></div>'),hg=C('<div class="manager svelte-16699lq"><h2 class="tab-title svelte-16699lq"> </h2> <div class="add-card svelte-16699lq"><textarea class="textarea svelte-16699lq"></textarea> <div class="author-row svelte-16699lq"><input type="text" class="author-input svelte-16699lq"/> <button type="button" class="add-btn svelte-16699lq"><!> </button></div></div> <!> <div class="list svelte-16699lq"><!> <!></div></div>');function _g(a,t){ut(t,!0);const n=j(gt),r=500,o=64;let c=z(ze([])),l=z(""),i=z(""),u=z(null);function f(){return new Date().toISOString()}async function _(){try{v(c,await yc(),!0)}catch{}}rn(()=>{_()}),St(()=>{if(!e(u))return;const F=window.setTimeout(()=>v(u,null),3e3);return()=>window.clearTimeout(F)});function g(){const F=e(l).trim();return F.length<1?e(n).settings.motto.textRequired:F.length>r?e(n).settings.motto.textTooLong:e(i).trim().length>o?e(n).settings.motto.authorTooLong:null}async function h(){const F=g();if(F){v(u,F,!0);return}try{await Yv({id:crypto.randomUUID(),text:e(l).trim(),author:e(i).trim()||null,created_at:f(),updated_at:f()}),v(l,""),v(i,""),await _(),Ai()}catch(L){v(u,String(L),!0)}}async function b(F){try{await Gv(F),await _(),Ai()}catch(L){v(u,String(L),!0)}}var x=hg(),S=s(x),T=s(S),M=d(S,2),R=s(M);I(R,"rows",2);var w=d(R,2),A=s(w),k=d(A,2),D=s(k);Yn(D,{size:14});var Y=d(D),he=d(M,2);{var le=F=>{var L=ug(),re=s(L);E(()=>p(re,e(u))),m(F,L)};oe(he,F=>{e(u)&&F(le)})}var ne=d(he,2),Z=s(ne);{var G=F=>{var L=vg(),re=s(L);E(()=>p(re,e(n).settings.motto.empty)),m(F,L)};oe(Z,F=>{e(c).length===0&&F(G)})}var ie=d(Z,2);je(ie,17,()=>e(c),F=>F.id,(F,L)=>{var re=fg(),be=s(re),ye=s(be),H=s(ye),ce=d(ye,2),xe=s(ce),O=d(be,2),$=s(O);yo($,{size:14}),E(U=>{p(H,e(L).text),p(xe,`—— ${U??""}`),I(O,"aria-label",e(n).settings.list.del)},[()=>{var U;return(U=e(L).author)!=null&&U.trim()?e(L).author:e(n).settings.motto.defaultAuthor}]),W("click",O,()=>void b(e(L).id)),m(F,re)}),E(()=>{p(T,e(n).settings.motto.title),I(R,"placeholder",e(n).settings.motto.addPlaceholder),I(A,"placeholder",e(n).settings.motto.authorPlaceholder),p(Y,` ${e(n).settings.motto.addBtn??""}`)}),wt(R,()=>e(l),F=>v(l,F)),W("keydown",A,F=>{F.key==="Enter"&&h()}),wt(A,()=>e(i),F=>v(i,F)),W("click",k,h),m(a,x),vt()}yt(["keydown","click"]);var pg=C("<option> </option>"),gg=C('<div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style-desc"> </label> <input id="notif-style-desc" type="text" class="text-input svelte-s7babn"/></div>'),mg=C('<span class="saved svelte-s7babn"> </span>'),bg=C('<span class="save-error svelte-s7babn" role="alert"> </span>'),yg=C('<div class="setting svelte-s7babn"><h2 class="tab-title svelte-s7babn"> </h2> <div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style"> </label> <select id="notif-style" class="select svelte-s7babn"></select> <p class="hint svelte-s7babn"> </p></div> <!> <div class="fields svelte-s7babn"><section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-fe-title"> </label> <input id="ntf-fe-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-fe-body"> </label> <input id="ntf-fe-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-be-title"> </label> <input id="ntf-be-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-be-body"> </label> <input id="ntf-be-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-rm-title"> </label> <input id="ntf-rm-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-rm-body"> </label> <input id="ntf-rm-body" type="text" class="text-input svelte-s7babn"/> <p class="hint svelte-s7babn"> </p></section></div> <div class="save-row svelte-s7babn"><button type="button" class="save-btn svelte-s7babn"><!> </button> <!> <!></div></div>');function kg(a,t){ut(t,!0);const n=j(gt),r=j(wo);let o=z("default"),c=z(""),l=z(null),i=z(ze({focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""})),u=z(!1),f=z(null);const _=j(()=>e(o)==="custom");rn(()=>{kc().then(Q=>{v(o,Q.style||"default",!0),v(c,Q.style_description||"",!0),v(l,Q,!0)}).catch(()=>{})}),St(()=>{if(e(_))e(l)&&v(i,{focus_end_title:e(l).focus_end_title||"",focus_end_body:e(l).focus_end_body||"",break_end_title:e(l).break_end_title||"",break_end_body:e(l).break_end_body||"",reminder_title:e(l).reminder_title||"",reminder_body:e(l).reminder_body||""},!0);else{const Q=(e(r)==="en"?cc:lc)[e(o)];v(i,{focus_end_title:Q.focus_end_title,focus_end_body:Q.focus_end_body,break_end_title:Q.break_end_title,break_end_body:Q.break_end_body,reminder_title:Q.reminder_title,reminder_body:Q.reminder_body},!0)}});async function g(){v(f,null);const Q={id:"1",style:e(o),style_description:e(_)?e(c):null,focus_end_title:e(i).focus_end_title,focus_end_body:e(i).focus_end_body,break_end_title:e(i).break_end_title,break_end_body:e(i).break_end_body,reminder_title:e(i).reminder_title,reminder_body:e(i).reminder_body};try{const K=await Vv(Q);v(l,K,!0),await xc(),v(u,!0),window.setTimeout(()=>v(u,!1),2e3)}catch(K){v(f,String(K),!0)}}var h=yg(),b=s(h),x=s(b),S=d(b,2),T=s(S),M=s(T),R=d(T,2);je(R,21,()=>Mv,Q=>Q.key,(Q,K)=>{var X=pg(),Pe=s(X),De={};E(()=>{p(Pe,e(n).settings.notification.styleName[e(K).key]),De!==(De=e(K).key)&&(X.value=(X.__value=e(K).key)??"")}),m(Q,X)});var w=d(R,2),A=s(w),k=d(S,2);{var D=Q=>{var K=gg(),X=s(K),Pe=s(X),De=d(X,2);E(()=>{p(Pe,e(n).settings.notification.styleDesc),I(De,"placeholder",e(n).settings.notification.styleDescPlaceholder)}),wt(De,()=>e(c),Ue=>v(c,Ue)),m(Q,K)};oe(k,Q=>{e(_)&&Q(D)})}var Y=d(k,2),he=s(Y),le=s(he),ne=s(le),Z=d(le,2),G=s(Z),ie=d(Z,2),F=d(ie,2),L=s(F),re=d(F,2),be=d(he,2),ye=s(be),H=s(ye),ce=d(ye,2),xe=s(ce),O=d(ce,2),$=d(O,2),U=s($),ee=d($,2),pe=d(be,2),ke=s(pe),ve=s(ke),ge=d(ke,2),q=s(ge),se=d(ge,2),ue=d(se,2),Se=s(ue),Ne=d(ue,2),Ie=d(Ne,2),He=s(Ie),B=d(Y,2),fe=s(B),we=s(fe);sv(we,{size:14});var V=d(we),y=d(fe,2);{var P=Q=>{var K=mg(),X=s(K);E(()=>p(X,e(n).settings.notification.saved)),m(Q,K)};oe(y,Q=>{e(u)&&Q(P)})}var ae=d(y,2);{var J=Q=>{var K=bg(),X=s(K);E(()=>p(X,e(f))),m(Q,K)};oe(ae,Q=>{e(f)&&Q(J)})}E(()=>{p(x,e(n).settings.notification.title),p(M,e(n).settings.notification.styleLabel),p(A,e(_)?e(n).settings.notification.styleHintCustom:e(n).settings.notification.styleHintPreset),p(ne,e(n).settings.notification.focusEnd),p(G,e(n).settings.notification.titleLabel),ie.disabled=!e(_),p(L,e(n).settings.notification.bodyLabel),re.disabled=!e(_),p(H,e(n).settings.notification.breakEnd),p(xe,e(n).settings.notification.titleLabel),O.disabled=!e(_),p(U,e(n).settings.notification.bodyLabel),ee.disabled=!e(_),p(ve,e(n).settings.notification.reminder),p(q,e(n).settings.notification.titleLabel),se.disabled=!e(_),p(Se,e(n).settings.notification.bodyLabel),Ne.disabled=!e(_),p(He,e(n).settings.notification.placeholderHint),p(V,` ${e(n).settings.notification.save??""}`)}),ao(R,()=>e(o),Q=>v(o,Q)),wt(ie,()=>e(i).focus_end_title,Q=>e(i).focus_end_title=Q),wt(re,()=>e(i).focus_end_body,Q=>e(i).focus_end_body=Q),wt(O,()=>e(i).break_end_title,Q=>e(i).break_end_title=Q),wt(ee,()=>e(i).break_end_body,Q=>e(i).break_end_body=Q),wt(se,()=>e(i).reminder_title,Q=>e(i).reminder_title=Q),wt(Ne,()=>e(i).reminder_body,Q=>e(i).reminder_body=Q),W("click",fe,g),m(a,h),vt()}yt(["click"]);var wg=C('<span class="badge svelte-hb0yns"><!></span>'),xg=C('<button type="button"><!> <span class="label svelte-hb0yns"> </span> <span class="sub svelte-hb0yns"> </span></button>'),Sg=C('<div><h2 class="tab-title svelte-hb0yns"> </h2> <p class="desc svelte-hb0yns"> </p> <div class="options svelte-hb0yns"></div></div>');function Tg(a,t){ut(t,!0);const n=j(gt),r=j(wo),o=[{key:"zh",label:"中文",sub:"Chinese"},{key:"en",label:"English",sub:"英文"}];var c=Sg(),l=s(c),i=s(l),u=d(l,2),f=s(u),_=d(u,2);je(_,21,()=>o,g=>g.key,(g,h)=>{const b=j(()=>e(r)===e(h).key);var x=xg();let S;var T=s(x);{var M=D=>{var Y=wg(),he=s(Y);za(he,{size:16}),m(D,Y)};oe(T,D=>{e(b)&&D(M)})}var R=d(T,2),w=s(R),A=d(R,2),k=s(A);E(()=>{S=Ge(x,1,"option svelte-hb0yns",null,S,{active:e(b)}),I(x,"aria-pressed",e(b)),p(w,e(h).label),p(k,e(h).sub)}),W("click",x,()=>Sv(e(h).key)),m(g,x)}),E(()=>{p(i,e(n).settings.language.title),p(f,e(n).settings.language.desc)}),m(a,c),vt()}yt(["click"]);var Dg=C('<span class="indicator svelte-uox1oc" aria-hidden="true"></span>'),Pg=C('<button type="button"><!> <!> </button>'),Mg=C('<div class="account-placeholder svelte-uox1oc"><p class="svelte-uox1oc"> </p></div>'),Eg=C('<div class="settings-page page-veil svelte-uox1oc"><aside class="menu svelte-uox1oc"><nav class="menu-nav svelte-uox1oc"></nav></aside> <main class="content svelte-uox1oc"><div class="card svelte-uox1oc"><!></div></main></div>');function Cg(a,t){ut(t,!0);const n=j(gt);let r=z("timer");const o=j(()=>[{key:"account",icon:_v,label:e(n).settings.tab.account},{key:"timer",icon:br,label:e(n).settings.tab.timer},{key:"lists",icon:ec,label:e(n).settings.tab.lists},{key:"tags",icon:fv,label:e(n).settings.tab.tags},{key:"theme",icon:av,label:e(n).settings.tab.theme},{key:"motto",icon:tc,label:e(n).settings.tab.motto},{key:"notification",icon:Wu,label:e(n).settings.tab.notification},{key:"language",icon:ev,label:e(n).settings.tab.language}]);var c=Eg();Fr("uox1oc",w=>{Cr(()=>{Qn.title=e(n).page.settings??""})});var l=s(c),i=s(l);je(i,21,()=>e(o),w=>w.key,(w,A)=>{const k=j(()=>e(r)===e(A).key);var D=Pg();let Y;var he=s(D);{var le=G=>{var ie=Dg();m(G,ie)};oe(he,G=>{e(k)&&G(le)})}var ne=d(he,2);jr(ne,()=>e(A).icon,(G,ie)=>{ie(G,{size:16})});var Z=d(ne);E(()=>{Y=Ge(D,1,"menu-item svelte-uox1oc",null,Y,{active:e(k)}),I(D,"aria-current",e(k)?"true":void 0),p(Z,` ${e(A).label??""}`)}),W("click",D,()=>v(r,e(A).key,!0)),m(w,D)});var u=d(l,2),f=s(u),_=s(f);{var g=w=>{var A=Mg(),k=s(A),D=s(k);E(()=>p(D,e(n).settings.accountNotOpen)),m(w,A)},h=w=>{Ip(w,{})},b=w=>{$p(w,{})},x=w=>{ag(w,{})},S=w=>{dg(w,{})},T=w=>{_g(w,{})},M=w=>{kg(w,{})},R=w=>{Tg(w,{})};oe(_,w=>{e(r)==="account"?w(g):e(r)==="timer"?w(h,1):e(r)==="lists"?w(b,2):e(r)==="tags"?w(x,3):e(r)==="theme"?w(S,4):e(r)==="motto"?w(T,5):e(r)==="notification"?w(M,6):e(r)==="language"&&w(R,7)})}m(a,c),vt()}yt(["click"]);var Ng=C('<button type="button"><!> </button>'),jg=C('<br/> <span class="sub svelte-k6bk06"> </span>',1),Fg=C('<li class="svelte-k6bk06"> <!></li>'),Ag=C('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <ul class="svelte-k6bk06"></ul></section>'),Ig=C('<div class="manual svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),qg=C('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p></section>'),Rg=C('<div class="faq"><h2 class="svelte-k6bk06"> </h2> <!></div>'),Lg=C('<li class="svelte-k6bk06"> </li>'),Og=C('<div class="contact"><h2 class="svelte-k6bk06"> </h2> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>522988349@qq.com</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>18688994926</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span> </span></div></div> <div class="feedback svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono svelte-k6bk06"> </div> <div class="hint svelte-k6bk06"> </div></div> <div><span class="lbl xs svelte-k6bk06"> </span> <ul class="body-items svelte-k6bk06"></ul></div> <div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono muted svelte-k6bk06"> </div></div></div></div></div>'),Bg=C('<div class="help-page page-veil svelte-k6bk06"><aside class="menu svelte-k6bk06"><nav class="menu-nav"></nav></aside> <main class="content svelte-k6bk06"><div class="card svelte-k6bk06"><!></div></main></div>');function zg(a,t){ut(t,!0);const n=j(gt);let r=z("manual");const o=["timer","tasks","reminder","repeat","journal","stats","settings"];var c=Bg();Fr("k6bk06",x=>{Cr(()=>{Qn.title=`${e(n).nav.help??""} - PomoFlow`})});var l=s(c),i=s(l);je(i,21,()=>[{key:"manual",icon:Yu},{key:"faq",icon:Zl},{key:"contact",icon:tv}],x=>x.key,(x,S)=>{const T=j(()=>e(r)===e(S).key);var M=Ng();let R;var w=s(M);jr(w,()=>e(S).icon,(k,D)=>{D(k,{size:16})});var A=d(w);E(()=>{R=Ge(M,1,"menu-item svelte-k6bk06",null,R,{active:e(T)}),I(M,"aria-current",e(T)?"true":void 0),p(A,` ${e(n).help.tab[e(S).key]??""}`)}),W("click",M,()=>v(r,e(S).key,!0)),m(x,M)});var u=d(l,2),f=s(u),_=s(f);{var g=x=>{var S=Ig(),T=s(S),M=s(T),R=d(T,2);je(R,16,()=>o,w=>w,(w,A)=>{const k=j(()=>e(n).help.manual[A]);var D=Ag(),Y=s(D),he=s(Y),le=d(Y,2);je(le,21,()=>e(k).items,Ha,(ne,Z)=>{const G=j(()=>e(Z));var ie=Fg(),F=s(ie),L=d(F);{var re=be=>{var ye=jg(),H=d(Fe(ye),2),ce=s(H);E(()=>p(ce,e(G).sub)),m(be,ye)};oe(L,be=>{e(G).sub&&be(re)})}E(()=>p(F,`${e(G).text??""} `)),m(ne,ie)}),E(()=>p(he,e(k).title)),m(w,D)}),E(()=>p(M,e(n).help.tab.manual)),m(x,S)},h=x=>{var S=Rg(),T=s(S),M=s(T),R=d(T,2);je(R,17,()=>e(n).help.faq.items,Ha,(w,A)=>{var k=qg(),D=s(k),Y=s(D),he=d(D,2),le=s(he);E(()=>{p(Y,`Q: ${e(A).q??""}`),p(le,`A: ${e(A).a??""}`)}),m(w,k)}),E(()=>p(M,e(n).help.tab.faq)),m(x,S)},b=x=>{const S=j(()=>e(n).help.contact);var T=Og(),M=s(T),R=s(M),w=d(M,2),A=s(w),k=d(w,2),D=s(k),Y=s(D),he=s(Y),le=d(D,2),ne=s(le),Z=s(ne),G=d(le,2),ie=s(G),F=s(ie),L=d(ie,2),re=s(L),be=d(k,2),ye=s(be),H=s(ye),ce=d(ye,2),xe=s(ce),O=d(ce,2),$=s(O),U=s($),ee=s(U),pe=d(U,2),ke=s(pe),ve=d(pe,2),ge=s(ve),q=d($,2),se=s(q),ue=s(se),Se=d(se,2);je(Se,21,()=>e(S).bodyItems,Ha,(we,V)=>{var y=Lg(),P=s(y);E(()=>p(P,e(V))),m(we,y)});var Ne=d(q,2),Ie=s(Ne),He=s(Ie),B=d(Ie,2),fe=s(B);E(()=>{p(R,e(n).help.tab.contact),p(A,e(S).intro),p(he,e(S).emailLabel),p(Z,e(S).phoneLabel),p(F,e(S).workHoursLabel),p(re,e(S).workHours),p(H,e(S).feedbackTitle),p(xe,e(S).feedbackDesc),p(ee,e(S).subjectLabel),p(ke,e(S).subjectFormat),p(ge,e(S).subjectHint),p(ue,e(S).bodyLabel),p(He,e(S).exampleLabel),p(fe,e(S).exampleText)}),m(x,T)};oe(_,x=>{e(r)==="manual"?x(g):e(r)==="faq"?x(h,1):x(b,-1)})}m(a,c),vt()}yt(["click"]);var Hg=C("<button><!> </button>"),Ug=C('<main class="app app-bg svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true"><!></span> <h1 class="svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function Wg(a,t){ut(t,!0);const n=j(gt);Qf(),St(()=>{if(!Us().running)return;const A=setInterval(()=>gf(),1e3);return()=>clearInterval(A)}),rn(()=>{xc(),document.addEventListener("visibilitychange",()=>{document.hidden||mf()}),xf(),Af(),(async()=>{try{const{isPermissionGranted:w,requestPermission:A}=await Ou(async()=>{const{isPermissionGranted:k,requestPermission:D}=await Promise.resolve().then(()=>uf);return{isPermissionGranted:k,requestPermission:D}},void 0);await w()||await A()}catch{}})()});const r=j(mv),o={timer:br,tasks:ec,stats:Ls,settings:lv,help:Zl};var c=Ug(),l=s(c),i=s(l),u=s(i),f=s(u);Ec(f,{size:26});var _=d(i,2);je(_,21,()=>bv,w=>w.path,(w,A)=>{const k=j(()=>o[e(A).labelKey]);var D=Hg();let Y;var he=s(D);jr(he,()=>e(k),(ne,Z)=>{Z(ne,{size:18})});var le=d(he);E(()=>{Y=Ge(D,1,"nav-item svelte-1n46o8q",null,Y,{active:e(r)===e(A).path}),I(D,"aria-current",e(r)===e(A).path?"page":void 0),p(le,` ${e(n).nav[e(A).labelKey]??""}`)}),W("click",D,()=>rc(e(A).path)),m(w,D)});var g=d(l,2),h=s(g);{var b=w=>{Ri(w,{})},x=w=>{rp(w,{})},S=w=>{Mp(w,{})},T=w=>{Cg(w,{})},M=w=>{zg(w,{})},R=w=>{Ri(w,{})};oe(h,w=>{e(r)==="/timer"?w(b):e(r)==="/tasks"?w(x,1):e(r)==="/stats"?w(S,2):e(r)==="/settings"?w(T,3):e(r)==="/help"?w(M,4):w(R,-1)})}E(()=>I(_,"aria-label",e(n).nav.mainNav)),m(a,c),vt()}yt(["click"]);hu(Wg,{target:document.getElementById("app")});
