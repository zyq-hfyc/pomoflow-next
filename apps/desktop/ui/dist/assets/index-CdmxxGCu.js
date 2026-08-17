var Xc=Object.defineProperty;var li=a=>{throw TypeError(a)};var $c=(a,t,n)=>t in a?Xc(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;var ia=(a,t,n)=>$c(a,typeof t!="symbol"?t+"":t,n),Fo=(a,t,n)=>t.has(a)||li("Cannot "+n);var N=(a,t,n)=>(Fo(a,t,"read from private field"),n?n.call(a):t.get(a)),at=(a,t,n)=>t.has(a)?li("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,n),tt=(a,t,n,r)=>(Fo(a,t,"write to private field"),r?r.call(a,n):t.set(a,n),n),ht=(a,t,n)=>(Fo(a,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const sl=!1;var Cs=Array.isArray,Jc=Array.prototype.indexOf,eo=Array.prototype.includes,bo=Array.from,Qc=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,il=Object.getOwnPropertyDescriptors,Zc=Object.prototype,ed=Array.prototype,Es=Object.getPrototypeOf,ci=Object.isExtensible;function rr(a){return typeof a=="function"}const td=()=>{};function ad(a){return a()}function ts(a){for(var t=0;t<a.length;t++)a[t]()}function ll(){var a,t,n=new Promise((r,o)=>{a=r,t=o});return{promise:n,resolve:a,reject:t}}function cl(a,t){if(Array.isArray(a))return a;if(!(Symbol.iterator in a))return Array.from(a);const n=[];for(const r of a)if(n.push(r),n.length===t)break;return n}const Wt=2,xn=4,Mr=8,As=1<<24,Pa=16,ya=32,Ya=64,as=128,ba=512,zt=1024,Bt=2048,Ca=4096,ta=8192,ua=16384,Jn=32768,ns=1<<25,nn=65536,to=1<<17,dl=1<<18,Qn=1<<19,ul=1<<20,ja=1<<25,Tn=65536,ao=1<<21,In=1<<22,an=1<<23,qa=Symbol("$state"),vl=Symbol("legacy props"),nd=Symbol(""),Yr=Symbol("attributes"),rs=Symbol("class"),os=Symbol("style"),ur=Symbol("text"),Kr=Symbol("form reset"),Cr=new class extends Error{constructor(){super(...arguments);ia(this,"name","StaleReactionError");ia(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var nl;const yo=!!((nl=globalThis.document)!=null&&nl.contentType)&&globalThis.document.contentType.includes("xml");function rd(a){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function od(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function sd(a,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function id(a){throw new Error("https://svelte.dev/e/effect_in_teardown")}function ld(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function cd(a){throw new Error("https://svelte.dev/e/effect_orphan")}function dd(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function ud(a){throw new Error("https://svelte.dev/e/props_invalid_value")}function vd(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function fd(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function hd(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function _d(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const pd=1,gd=2,fl=4,md=8,bd=16,yd=1,kd=2,hl=4,wd=8,xd=16,_l=1,Td=2,Ot=Symbol("uninitialized"),pl="http://www.w3.org/1999/xhtml",Sd="http://www.w3.org/2000/svg",Dd="@attach";function Pd(){console.warn("https://svelte.dev/e/derived_inert")}function Md(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function Cd(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function gl(a){return a===this.v}function Ed(a,t){return a!=a?t==t:a!==t||a!==null&&typeof a=="object"||typeof a=="function"}function ml(a){return!Ed(a,this.v)}let Zn=!1,Ad=!1;function Nd(){Zn=!0}let At=null;function Un(a){At=a}function _t(a,t=!1,n){At={p:At,i:!1,c:null,e:null,s:a,x:null,r:st,l:Zn&&!t?{s:null,u:null,$:[]}:null}}function pt(a){var t=At,n=t.e;if(n!==null){t.e=null;for(var r of n)Bl(r)}return t.i=!0,At=t.p,{}}function Er(){return!Zn||At!==null&&At.l===null}let un=[];function bl(){var a=un;un=[],ts(a)}function Fa(a){if(un.length===0&&!gr){var t=un;queueMicrotask(()=>{t===un&&bl()})}un.push(a)}function jd(){for(;un.length>0;)bl()}function yl(a){var t=st;if(t===null)return ct.f|=an,a;if((t.f&Jn)===0&&(t.f&xn)===0)throw a;Za(a,t)}function Za(a,t){if(!(t!==null&&(t.f&ua)!==0)){for(;t!==null;){if((t.f&as)!==0){if((t.f&Jn)===0)throw a;try{t.b.error(a);return}catch(n){a=n}}t=t.parent}throw a}}const Fd=-7169;function It(a,t){a.f=a.f&Fd|t}function Ns(a){(a.f&ba)!==0||a.deps===null?It(a,zt):It(a,Ca)}function kl(a){if(a!==null)for(const t of a)(t.f&Wt)===0||(t.f&Tn)===0||(t.f^=Tn,kl(t.deps))}function wl(a,t,n){(a.f&Bt)!==0?t.add(a):(a.f&Ca)!==0&&n.add(a),kl(a.deps),It(a,zt)}let zr=!1;function Id(a){var t=zr;try{return zr=!1,[a(),zr]}finally{zr=t}}function bn(a,t){if(t){const n=document.body;a.autofocus=!0,Fa(()=>{document.activeElement===n&&a.focus()})}}let di=!1;function qd(){di||(di=!0,document.addEventListener("reset",a=>{Promise.resolve().then(()=>{var t;if(!a.defaultPrevented)for(const n of a.target.elements)(t=n[Kr])==null||t.call(n)})},{capture:!0}))}function er(a){var t=ct,n=st;ka(null),wa(null);try{return a()}finally{ka(t),wa(n)}}function xl(a,t,n,r=n){a.addEventListener(t,()=>er(n));const o=a[Kr];o?a[Kr]=()=>{o(),r(!0)}:a[Kr]=()=>r(!0),qd()}function Ld(a){let t=0,n=rn(0),r;return()=>{Rs()&&(e(n),Os(()=>(t===0&&(r=Vt(()=>a(()=>mr(n)))),t+=1,()=>{Fa(()=>{t-=1,t===0&&(r==null||r(),r=void 0,mr(n))})})))}}var Rd=nn|Qn;function Od(a,t,n,r){new Bd(a,t,n,r)}var _a,Ms,pa,hn,na,ga,Zt,ca,Ra,_n,Ja,qn,xr,Tr,Oa,po,Et,zd,Hd,ss,Ud,is,Gr,Vr,ls,cs;class Bd{constructor(t,n,r,o){at(this,Et);ia(this,"parent");ia(this,"is_pending",!1);ia(this,"transform_error");at(this,_a);at(this,Ms,null);at(this,pa);at(this,hn);at(this,na);at(this,ga,null);at(this,Zt,null);at(this,ca,null);at(this,Ra,null);at(this,_n,0);at(this,Ja,0);at(this,qn,!1);at(this,xr,new Set);at(this,Tr,new Set);at(this,Oa,null);at(this,po,Ld(()=>(tt(this,Oa,rn(N(this,_n))),()=>{tt(this,Oa,null)})));var c;tt(this,_a,t),tt(this,pa,n),tt(this,hn,l=>{var i=st;i.b=this,i.f|=as,r(l)}),this.parent=st.b,this.transform_error=o??((c=this.parent)==null?void 0:c.transform_error)??(l=>l),tt(this,na,ar(()=>{ht(this,Et,is).call(this)},Rd))}defer_effect(t){wl(t,N(this,xr),N(this,Tr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!N(this,pa).pending}update_pending_count(t,n){ht(this,Et,ls).call(this,t,n),tt(this,_n,N(this,_n)+t),!(!N(this,Oa)||N(this,qn))&&(tt(this,qn,!0),Fa(()=>{tt(this,qn,!1),N(this,Oa)&&Yn(N(this,Oa),N(this,_n))}))}get_effect_pending(){return N(this,po).call(this),e(N(this,Oa))}error(t){if(!N(this,pa).onerror&&!N(this,pa).failed)throw t;Le!=null&&Le.is_fork?(N(this,ga)&&Le.skip_effect(N(this,ga)),N(this,Zt)&&Le.skip_effect(N(this,Zt)),N(this,ca)&&Le.skip_effect(N(this,ca)),Le.oncommit(()=>{ht(this,Et,cs).call(this,t)})):ht(this,Et,cs).call(this,t)}}_a=new WeakMap,Ms=new WeakMap,pa=new WeakMap,hn=new WeakMap,na=new WeakMap,ga=new WeakMap,Zt=new WeakMap,ca=new WeakMap,Ra=new WeakMap,_n=new WeakMap,Ja=new WeakMap,qn=new WeakMap,xr=new WeakMap,Tr=new WeakMap,Oa=new WeakMap,po=new WeakMap,Et=new WeakSet,zd=function(){try{tt(this,ga,ea(()=>N(this,hn).call(this,N(this,_a))))}catch(t){this.error(t)}},Hd=function(t){const n=N(this,pa).failed,{reset:r,invoke_onerror:o}=ht(this,Et,ss).call(this,t);Fa(o),n&&tt(this,ca,ea(()=>{n(N(this,_a),()=>t,()=>r)}))},ss=function(t){var n=!1,r=!1;const o=()=>{if(n){Cd();return}n=!0,r&&_d(),N(this,ca)!==null&&kn(N(this,ca),()=>{tt(this,ca,null)}),ht(this,Et,Vr).call(this,()=>{ht(this,Et,is).call(this)})};return{reset:o,invoke_onerror:()=>{var l,i;try{r=!0,(i=(l=N(this,pa)).onerror)==null||i.call(l,t,o),r=!1}catch(u){Za(u,N(this,na)&&N(this,na).parent)}}}},Ud=function(){const t=N(this,pa).pending;t&&(this.is_pending=!0,tt(this,Zt,ea(()=>t(N(this,_a)))),Fa(()=>{var n=tt(this,Ra,document.createDocumentFragment()),r=Ea();n.append(r),tt(this,ga,ht(this,Et,Vr).call(this,()=>ea(()=>N(this,hn).call(this,r)))),N(this,Ja)===0&&(N(this,_a).before(n),tt(this,Ra,null),kn(N(this,Zt),()=>{tt(this,Zt,null)}),ht(this,Et,Gr).call(this,Le))}))},is=function(){try{if(this.is_pending=this.has_pending_snippet(),tt(this,Ja,0),tt(this,_n,0),tt(this,ga,ea(()=>{N(this,hn).call(this,N(this,_a))})),N(this,Ja)>0){var t=tt(this,Ra,document.createDocumentFragment());zs(N(this,ga),t);const n=N(this,pa).pending;tt(this,Zt,ea(()=>n(N(this,_a))))}else ht(this,Et,Gr).call(this,Le)}catch(n){this.error(n)}},Gr=function(t){this.is_pending=!1,t.transfer_effects(N(this,xr),N(this,Tr))},Vr=function(t){var n=st,r=ct,o=At;wa(N(this,na)),ka(N(this,na)),Un(N(this,na).ctx);try{return Sn.ensure(),t()}catch(c){return yl(c),null}finally{wa(n),ka(r),Un(o)}},ls=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&ht(r=this.parent,Et,ls).call(r,t,n);return}tt(this,Ja,N(this,Ja)+t),N(this,Ja)===0&&(ht(this,Et,Gr).call(this,n),N(this,Zt)&&kn(N(this,Zt),()=>{tt(this,Zt,null)}),N(this,Ra)&&(N(this,_a).before(N(this,Ra)),tt(this,Ra,null)))},cs=function(t){N(this,ga)&&(Gt(N(this,ga)),tt(this,ga,null)),N(this,Zt)&&(Gt(N(this,Zt)),tt(this,Zt,null)),N(this,ca)&&(Gt(N(this,ca)),tt(this,ca,null));let n=N(this,pa).failed;const r=o=>{const{reset:c,invoke_onerror:l}=ht(this,Et,ss).call(this,o);l(),n&&tt(this,ca,ht(this,Et,Vr).call(this,()=>{try{return ea(()=>{var i=st;i.b=this,i.f|=as,n(N(this,_a),()=>o,()=>c)})}catch(i){return Za(i,N(this,na).parent),null}}))};Fa(()=>{var o;try{o=this.transform_error(t)}catch(c){Za(c,N(this,na)&&N(this,na).parent);return}o!==null&&typeof o=="object"&&typeof o.then=="function"?o.then(r,c=>Za(c,N(this,na)&&N(this,na).parent)):r(o)})};function js(a,t,n,r){const o=Er()?Wn:Fs;var c=a.filter(y=>!y.settled),l=t.map(o);if(n.length===0&&c.length===0){r(l);return}var i=st,u=Wd(),f=c.length===1?c[0].promise:c.length>1?Promise.all(c.map(y=>y.promise)):null;function _(y){if((i.f&ua)===0){u();try{r([...l,...y])}catch(w){Za(w,i)}no()}}var m=Tl();if(n.length===0){f.then(()=>_([])).finally(m);return}function h(){Promise.all(n.map(y=>Yd(y))).then(_).catch(y=>Za(y,i)).finally(m)}f?f.then(()=>{u(),h(),no()}):h()}function Wd(){var a=st,t=ct,n=At,r=Le;return function(c=!0){wa(a),ka(t),Un(n),c&&(a.f&ua)===0&&(r==null||r.activate(),r==null||r.apply())}}function no(a=!0){wa(null),ka(null),Un(null),a&&(Le==null||Le.deactivate())}function Tl(){var a=st,t=a.b,n=Le,r=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(r,a),()=>{t==null||t.update_pending_count(-1,n),n.decrement(r,a)}}function Wn(a){var t=Wt|Bt;return st!==null&&(st.f|=Qn),{ctx:At,deps:null,effects:null,equals:gl,f:t,fn:a,reactions:null,rv:0,v:Ot,wv:0,parent:st,ac:null}}const vr=Symbol("obsolete");function Yd(a,t,n){let r=st;r===null&&od();var o=void 0,c=rn(Ot),l=!ct,i=new Set;return su(()=>{var y,w;var u=st,f=ll();o=f.promise;try{Promise.resolve(a()).then(f.resolve,T=>{T!==Cr&&f.reject(T)}).finally(no)}catch(T){f.reject(T),no()}var _=Le;if(l){if((u.f&Jn)!==0)var m=Tl();if((y=r.b)!=null&&y.is_rendered())(w=_.async_deriveds.get(u))==null||w.reject(vr);else for(const T of i.values())T.reject(vr);i.add(f),_.async_deriveds.set(u,f)}const h=(T,M=void 0)=>{m==null||m(),i.delete(f),M!==vr&&(_.activate(),M?(c.f|=an,Yn(c,M)):((c.f&an)!==0&&(c.f^=an),Yn(c,T)),_.deactivate())};f.promise.then(h,T=>h(null,T||"unknown"))}),ko(()=>{for(const u of i)u.reject(vr)}),new Promise(u=>{function f(_){function m(){_===o?u(c):f(o)}_.then(m,m)}f(o)})}function j(a){const t=Wn(a);return Kl(t),t}function Fs(a){const t=Wn(a);return t.equals=ml,t}function Kd(a){var t=a.effects;if(t!==null){a.effects=null;for(var n=0;n<t.length;n+=1)Gt(t[n])}}function Is(a){var t,n=st,r=a.parent;if(!Ka&&r!==null&&a.v!==Ot&&(r.f&(ua|ta))!==0)return Pd(),a.v;wa(r);try{a.f&=~Tn,Kd(a),t=$l(a)}finally{wa(n)}return t}function Sl(a){var t=Is(a);if(!a.equals(t)&&(a.wv=Vl(),(!(Le!=null&&Le.is_fork)||a.deps===null)&&(Le!==null?(Le.capture(a,t,!0),pr==null||pr.capture(a,t,!0)):a.v=t,a.deps===null))){It(a,zt);return}Ka||(Kt!==null?(Rs()||Le!=null&&Le.is_fork)&&Kt.set(a,t):Ns(a))}function Gd(a){var t;if(a.effects!==null)for(const n of a.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&er(()=>{n.ac.abort(Cr),n.ac=null}),n.fn!==null&&(n.teardown=td),kr(n,0),Bs(n))}function Dl(a){if(a.effects!==null)for(const t of a.effects)t.teardown&&t.fn!==null&&Kn(t)}let Io=null,An=null,Le=null,pr=null,Kt=null,ds=null,gr=!1,qo=!1,Fn=null,Xr=null;var ui=0;let Vd=1;var Ln,Qa,pn,Rn,On,Bn,Ba,zn,ra,Sr,za,Sa,Aa,Hn,gn,wt,us,fr,vs,Pl,Ml,jn,Xd,hr;const go=class go{constructor(){at(this,wt);ia(this,"id",Vd++);at(this,Ln,!1);ia(this,"linked",!0);at(this,Qa,null);at(this,pn,null);ia(this,"async_deriveds",new Map);ia(this,"current",new Map);ia(this,"previous",new Map);at(this,Rn,new Set);at(this,On,new Set);at(this,Bn,0);at(this,Ba,new Map);at(this,zn,null);at(this,ra,[]);at(this,Sr,[]);at(this,za,new Set);at(this,Sa,new Set);at(this,Aa,new Map);at(this,Hn,new Set);ia(this,"is_fork",!1);at(this,gn,!1);An===null?Io=An=this:(tt(An,pn,this),tt(this,Qa,An)),An=this}skip_effect(t){N(this,Aa).has(t)||N(this,Aa).set(t,{d:[],m:[]}),N(this,Hn).delete(t)}unskip_effect(t,n=r=>this.schedule(r)){var r=N(this,Aa).get(t);if(r){N(this,Aa).delete(t);for(var o of r.d)It(o,Bt),n(o);for(o of r.m)It(o,Ca),n(o)}N(this,Hn).add(t)}capture(t,n,r=!1){t.v!==Ot&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&an)===0&&(this.current.set(t,[n,r]),Kt==null||Kt.set(t,n)),this.is_fork||(t.v=n)}activate(){Le=this}deactivate(){Le=null,Kt=null}flush(){try{qo=!0,Le=this,ht(this,wt,fr).call(this)}finally{ui=0,ds=null,Fn=null,Xr=null,qo=!1,Le=null,Kt=null,yn.clear()}}discard(){var t;for(const n of N(this,On))n(this);N(this,On).clear();for(const n of this.async_deriveds.values())n.reject(vr);ht(this,wt,hr).call(this),(t=N(this,zn))==null||t.resolve()}register_created_effect(t){N(this,Sr).push(t)}increment(t,n){if(tt(this,Bn,N(this,Bn)+1),t){let r=N(this,Ba).get(n)??0;N(this,Ba).set(n,r+1)}}decrement(t,n){if(tt(this,Bn,N(this,Bn)-1),t){let r=N(this,Ba).get(n)??0;r===1?N(this,Ba).delete(n):N(this,Ba).set(n,r-1)}N(this,gn)||(tt(this,gn,!0),Fa(()=>{tt(this,gn,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const r of t)N(this,za).add(r);for(const r of n)N(this,Sa).add(r);t.clear(),n.clear()}oncommit(t){N(this,Rn).add(t)}ondiscard(t){N(this,On).add(t)}settled(){return(N(this,zn)??tt(this,zn,ll())).promise}static ensure(){if(Le===null){const t=Le=new go;!qo&&!gr&&Fa(()=>{N(t,Ln)||t.flush()})}return Le}apply(){{Kt=null;return}}schedule(t){var o;if(ds=t,(o=t.b)!=null&&o.is_pending&&(t.f&(xn|Mr|As))!==0&&(t.f&Jn)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(Fn!==null&&n===st&&(ct===null||(ct.f&Wt)===0))return;if((r&(Ya|ya))!==0){if((r&zt)===0)return;n.f^=zt}}N(this,ra).push(n)}};Ln=new WeakMap,Qa=new WeakMap,pn=new WeakMap,Rn=new WeakMap,On=new WeakMap,Bn=new WeakMap,Ba=new WeakMap,zn=new WeakMap,ra=new WeakMap,Sr=new WeakMap,za=new WeakMap,Sa=new WeakMap,Aa=new WeakMap,Hn=new WeakMap,gn=new WeakMap,wt=new WeakSet,us=function(){if(this.is_fork)return!0;for(const r of N(this,Ba).keys()){for(var t=r,n=!1;t.parent!==null;){if(N(this,Aa).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},fr=function(){var u,f,_,m;tt(this,Ln,!0),ui++>1e3&&(ht(this,wt,hr).call(this),Jd());for(const h of N(this,za))N(this,Sa).delete(h),It(h,Bt),this.schedule(h);for(const h of N(this,Sa))It(h,Ca),this.schedule(h);const t=N(this,ra);tt(this,ra,[]),this.apply();var n=Fn=[],r=[],o=Xr=[];for(const h of t)try{ht(this,wt,vs).call(this,h,n,r)}catch(y){throw Al(h),ht(this,wt,us).call(this)||this.discard(),y}if(Le=null,o.length>0){var c=go.ensure();for(const h of o)c.schedule(h)}if(Fn=null,Xr=null,ht(this,wt,us).call(this)){ht(this,wt,jn).call(this,r),ht(this,wt,jn).call(this,n);for(const[h,y]of N(this,Aa))El(h,y);o.length>0&&ht(u=Le,wt,fr).call(u);return}const l=ht(this,wt,Pl).call(this);if(l){ht(this,wt,jn).call(this,r),ht(this,wt,jn).call(this,n),ht(f=l,wt,Ml).call(f,this);return}N(this,za).clear(),N(this,Sa).clear();for(const h of N(this,Rn))h(this);N(this,Rn).clear(),pr=this,vi(r),vi(n),pr=null,(_=N(this,zn))==null||_.resolve();var i=Le;if(N(this,Bn)===0&&(N(this,ra).length===0||i!==null)&&ht(this,wt,hr).call(this),N(this,ra).length>0)if(i!==null){const h=i;N(h,ra).push(...N(this,ra).filter(y=>!N(h,ra).includes(y)))}else i=this;i!==null&&ht(m=i,wt,fr).call(m)},vs=function(t,n,r){t.f^=zt;for(var o=t.first;o!==null;){var c=o.f,l=(c&(ya|Ya))!==0,i=l&&(c&zt)!==0,u=i||(c&ta)!==0||N(this,Aa).has(o);if(!u&&o.fn!==null){l?o.f^=zt:(c&xn)!==0?n.push(o):jr(o)&&((c&Pa)!==0&&N(this,Sa).add(o),Kn(o));var f=o.first;if(f!==null){o=f;continue}}for(;o!==null;){var _=o.next;if(_!==null){o=_;break}o=o.parent}}},Pl=function(){for(var t=N(this,Qa);t!==null;){if(!t.is_fork){for(const[n,[,r]]of this.current)if(t.current.has(n)&&!r)return t}t=N(t,Qa)}return null},Ml=function(t){var r;for(const[o,c]of t.current)!this.previous.has(o)&&t.previous.has(o)&&this.previous.set(o,t.previous.get(o)),this.current.set(o,c);for(const[o,c]of t.async_deriveds){const l=this.async_deriveds.get(o);l&&c.promise.then(l.resolve).catch(l.reject)}t.async_deriveds.clear(),this.transfer_effects(N(t,za),N(t,Sa));const n=o=>{var c=o.reactions;if(c!==null&&!((o.f&Wt)!==0&&(o.f&(Bt|Ca))===0))for(const u of c){var l=u.f;if((l&Wt)!==0)n(u);else{var i=u;l&(In|Pa)&&!this.async_deriveds.has(i)&&(N(this,Sa).delete(i),It(i,Bt),this.schedule(i))}}};for(const o of this.current.keys())n(o);this.oncommit(()=>t.discard()),ht(r=t,wt,hr).call(r),Le=this,ht(this,wt,fr).call(this)},jn=function(t){for(var n=0;n<t.length;n+=1)wl(t[n],N(this,za),N(this,Sa))},Xd=function(){var m;for(let h=Io;h!==null;h=N(h,pn)){var t=h.id<this.id,n=[];for(const[y,[w,T]]of this.current){if(h.current.has(y)){var r=h.current.get(y)[0];if(t&&w!==r)h.current.set(y,[w,T]);else continue}n.push(y)}if(t)for(const[y,w]of this.async_deriveds){const T=h.async_deriveds.get(y);T&&w.promise.then(T.resolve).catch(T.reject)}var o=[...h.current.keys()].filter(y=>!h.current.get(y)[1]);if(!(!N(h,Ln)||o.length===0)){var c=o.filter(y=>!this.current.has(y));if(c.length===0)t&&h.discard();else if(n.length>0){if(t)for(const y of N(this,Hn))h.unskip_effect(y,w=>{var T;(w.f&(Pa|In))!==0?h.schedule(w):ht(T=h,wt,jn).call(T,[w])});h.activate();var l=new Set,i=new Map;for(var u of n)Cl(u,c,l,i);i=new Map;var f=[...h.current].filter(([y,w])=>{const T=this.current.get(y);return T?T[0]!==w[0]||T[1]!==w[1]:!0}).map(([y])=>y);if(f.length>0)for(const y of N(this,Sr))(y.f&(ua|ta|to))===0&&qs(y,f,i)&&((y.f&(In|Pa))!==0?(It(y,Bt),h.schedule(y)):N(h,za).add(y));if(N(h,ra).length>0&&!N(h,gn)){h.apply();for(var _ of N(h,ra))ht(m=h,wt,vs).call(m,_,[],[]);tt(h,ra,[])}h.deactivate()}}}},hr=function(){if(this.linked){var t=N(this,Qa),n=N(this,pn);t===null?Io=n:tt(t,pn,n),n===null?An=t:tt(n,Qa,t),this.linked=!1}};let Sn=go;function $d(a){var t=gr;gr=!0;try{for(var n;;){if(jd(),Le===null)return n;Le.flush()}}finally{gr=t}}function Jd(){try{dd()}catch(a){Za(a,ds)}}let Ta=null;function vi(a){var t=a.length;if(t!==0){for(var n=0;n<t;){var r=a[n++];if((r.f&(ua|ta))===0&&jr(r)&&(Ta=new Set,Kn(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&Ul(r),(Ta==null?void 0:Ta.size)>0)){yn.clear();for(const o of Ta){if((o.f&(ua|ta))!==0)continue;const c=[o];let l=o.parent;for(;l!==null;)Ta.has(l)&&(Ta.delete(l),c.push(l)),l=l.parent;for(let i=c.length-1;i>=0;i--){const u=c[i];(u.f&(ua|ta))===0&&Kn(u)}}Ta.clear()}}Ta=null}}function Cl(a,t,n,r){if(!n.has(a)&&(n.add(a),a.reactions!==null))for(const o of a.reactions){const c=o.f;(c&Wt)!==0?Cl(o,t,n,r):(c&(In|Pa))!==0&&(c&Bt)===0&&qs(o,t,r)&&(It(o,Bt),Ls(o))}}function qs(a,t,n){const r=n.get(a);if(r!==void 0)return r;if(a.deps!==null)for(const o of a.deps){if(eo.call(t,o))return!0;if((o.f&Wt)!==0&&qs(o,t,n))return n.set(o,!0),!0}return n.set(a,!1),!1}function Ls(a){Le.schedule(a)}function El(a,t){if(!((a.f&ya)!==0&&(a.f&zt)!==0)){(a.f&Bt)!==0?t.d.push(a):(a.f&Ca)!==0&&t.m.push(a),It(a,zt);for(var n=a.first;n!==null;)El(n,t),n=n.next}}function Al(a){It(a,zt);for(var t=a.first;t!==null;)Al(t),t=t.next}let ro=new Set;const yn=new Map;let Nl=!1;function rn(a,t){var n={f:0,v:a,reactions:null,equals:gl,rv:0,wv:0};return n}function z(a,t){const n=rn(a);return Kl(n),n}function Qd(a,t=!1,n=!0){var o;const r=rn(a);return t||(r.equals=ml),Zn&&n&&At!==null&&At.l!==null&&((o=At.l).s??(o.s=[])).push(r),r}function v(a,t,n=!1){ct!==null&&(!Ma||(ct.f&to)!==0)&&Er()&&(ct.f&(Wt|Pa|In|to))!==0&&(La===null||!La.has(a))&&hd();let r=n?ze(t):t;return Yn(a,r,Xr)}function Yn(a,t,n=null){if(!a.equals(t)){yn.set(a,Ka?t:a.v);var r=Sn.ensure();if(r.capture(a,t),(a.f&Wt)!==0){const o=a;(a.f&Bt)!==0&&Is(o),Kt===null&&Ns(o)}a.wv=Vl(),jl(a,Bt,n),Er()&&st!==null&&(st.f&zt)!==0&&(st.f&(ya|Ya))===0&&(ha===null?cu([a]):ha.push(a)),!r.is_fork&&ro.size>0&&!Nl&&Zd()}return t}function Zd(){Nl=!1;for(const a of ro){(a.f&zt)!==0&&It(a,Ca);let t;try{t=jr(a)}catch{t=!0}t&&Kn(a)}ro.clear()}function fi(a,t=1){var n=e(a),r=t===1?n++:n--;return v(a,n),r}function mr(a){v(a,a.v+1)}function jl(a,t,n){var r=a.reactions;if(r!==null)for(var o=Er(),c=r.length,l=0;l<c;l++){var i=r[l],u=i.f;if(!(!o&&i===st)){var f=(u&Bt)===0;if(f&&It(i,t),(u&to)!==0)ro.add(i);else if((u&Wt)!==0){var _=i;Kt==null||Kt.delete(_),(u&Tn)===0&&(u&ba&&(st===null||(st.f&ao)===0)&&(i.f|=Tn),jl(_,Ca,n))}else if(f){var m=i;(u&Pa)!==0&&Ta!==null&&Ta.add(m),n!==null?n.push(m):Ls(m)}}}}function ze(a){if(typeof a!="object"||a===null||qa in a)return a;const t=Es(a);if(t!==Zc&&t!==ed)return a;var n=new Map,r=Cs(a),o=z(0),c=wn,l=i=>{if(wn===c)return i();var u=ct,f=wn;ka(null),pi(c);var _=i();return ka(u),pi(f),_};return r&&n.set("length",z(a.length)),new Proxy(a,{defineProperty(i,u,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&vd();var _=n.get(u);return _===void 0?l(()=>{var m=z(f.value);return n.set(u,m),m}):v(_,f.value,!0),!0},deleteProperty(i,u){var f=n.get(u);if(f===void 0){if(u in i){const _=l(()=>z(Ot));n.set(u,_),mr(o)}}else v(f,Ot),mr(o);return!0},get(i,u,f){var y;if(u===qa)return a;var _=n.get(u),m=u in i;if(_===void 0&&(!m||(y=tn(i,u))!=null&&y.writable)&&(_=l(()=>{var w=ze(m?i[u]:Ot),T=z(w);return T}),n.set(u,_)),_!==void 0){var h=e(_);return h===Ot?void 0:h}return Reflect.get(i,u,f)},getOwnPropertyDescriptor(i,u){var f=Reflect.getOwnPropertyDescriptor(i,u);if(f&&"value"in f){var _=n.get(u);_&&(f.value=e(_))}else if(f===void 0){var m=n.get(u),h=m==null?void 0:m.v;if(m!==void 0&&h!==Ot)return{enumerable:!0,configurable:!0,value:h,writable:!0}}return f},has(i,u){var h;if(u===qa)return!0;var f=n.get(u),_=f!==void 0&&f.v!==Ot||Reflect.has(i,u);if(f!==void 0||st!==null&&(!_||(h=tn(i,u))!=null&&h.writable)){f===void 0&&(f=l(()=>{var y=_?ze(i[u]):Ot,w=z(y);return w}),n.set(u,f));var m=e(f);if(m===Ot)return!1}return _},set(i,u,f,_){var x;var m=n.get(u),h=u in i;if(r&&u==="length")for(var y=f;y<m.v;y+=1){var w=n.get(y+"");w!==void 0?v(w,Ot):y in i&&(w=l(()=>z(Ot)),n.set(y+"",w))}if(m===void 0)(!h||(x=tn(i,u))!=null&&x.writable)&&(m=l(()=>z(void 0)),v(m,ze(f)),n.set(u,m));else{h=m.v!==Ot;var T=l(()=>ze(f));v(m,T)}var M=Reflect.getOwnPropertyDescriptor(i,u);if(M!=null&&M.set&&M.set.call(_,f),!h){if(r&&typeof u=="string"){var D=n.get("length"),A=Number(u);Number.isInteger(A)&&A>=D.v&&v(D,A+1)}mr(o)}return!0},ownKeys(i){e(o);var u=Reflect.ownKeys(i).filter(m=>{var h=n.get(m);return h===void 0||h.v!==Ot});for(var[f,_]of n)_.v!==Ot&&!(f in i)&&u.push(f);return u},setPrototypeOf(){fd()}})}function hi(a){try{if(a!==null&&typeof a=="object"&&qa in a)return a[qa]}catch{}return a}function eu(a,t){return Object.is(hi(a),hi(t))}var fs,tr,Fl,Il,ql;function tu(){if(fs===void 0){fs=window,tr=document,Fl=/Firefox/.test(navigator.userAgent);var a=Element.prototype,t=Node.prototype,n=Text.prototype;Il=tn(t,"firstChild").get,ql=tn(t,"nextSibling").get,ci(a)&&(a[rs]=void 0,a[Yr]=null,a[os]=void 0,a.__e=void 0),ci(n)&&(n[ur]=void 0)}}function Ea(a=""){return document.createTextNode(a)}function Ha(a){return Il.call(a)}function Ar(a){return ql.call(a)}function s(a,t){return Ha(a)}function Ae(a,t=!1){{var n=Ha(a);return n instanceof Comment&&n.data===""?Ar(n):n}}function d(a,t=1,n=!1){let r=a;for(;t--;)r=Ar(r);return r}function au(a){a.textContent=""}function Ll(){return!1}function Rl(a,t,n){return t==null||t===pl?n?document.createElement(a,{is:n}):document.createElement(a):n?document.createElementNS(t,a,{is:n}):document.createElementNS(t,a)}function Ol(a){st===null&&(ct===null&&cd(),ld()),Ka&&id()}function nu(a,t){var n=t.last;n===null?t.last=t.first=a:(n.next=a,a.prev=n,t.last=a)}function xa(a,t){var n=st;n!==null&&(n.f&ta)!==0&&(a|=ta);var r={ctx:At,deps:null,nodes:null,f:a|Bt|ba,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};Le==null||Le.register_created_effect(r);var o=r;if((a&xn)!==0)Fn!==null?Fn.push(r):Sn.ensure().schedule(r);else if(t!==null){try{Kn(r)}catch(l){throw Gt(r),l}o.deps===null&&o.teardown===null&&o.nodes===null&&o.first===o.last&&(o.f&Qn)===0&&(o=o.first,(a&Pa)!==0&&(a&nn)!==0&&o!==null&&(o.f|=nn))}if(o!==null&&(o.parent=n,n!==null&&nu(o,n),ct!==null&&(ct.f&Wt)!==0&&(a&Ya)===0)){var c=ct;(c.effects??(c.effects=[])).push(o)}return r}function Rs(){return ct!==null&&!Ma}function ko(a){const t=xa(Mr,null);return It(t,zt),t.teardown=a,t}function Pt(a){Ol();var t=st.f,n=!ct&&(t&ya)!==0&&At!==null&&!At.i;if(n){var r=At;(r.e??(r.e=[])).push(a)}else return Bl(a)}function Bl(a){return xa(xn|ul,a)}function ru(a){return Ol(),xa(Mr|ul,a)}function ou(a){Sn.ensure();const t=xa(Ya|Qn,a);return(n={})=>new Promise(r=>{n.outro?kn(t,()=>{Gt(t),r(void 0)}):(Gt(t),r(void 0))})}function wo(a){return xa(xn,a)}function su(a){return xa(In|Qn,a)}function Os(a,t=0){return xa(Mr|t,a)}function C(a,t=[],n=[],r=[]){js(r,t,n,o=>{xa(Mr,()=>{a(...o.map(e))})})}function Nr(a,t=[],n=[],r=[]){js(r,t,n,o=>{xa(xn,()=>a(...o.map(e)))})}function ar(a,t=0){var n=xa(Pa|t,a);return n}function zl(a,t=0){var n=xa(As|t,a);return n}function ea(a){return xa(ya|Qn,a)}function Hl(a){var t=a.teardown;if(t!==null){const n=Ka,r=ct;_i(!0),ka(null);try{t.call(null)}finally{_i(n),ka(r)}}}function Bs(a,t=!1){var n=a.first;for(a.first=a.last=null;n!==null;){const o=n.ac;o!==null&&er(()=>{o.abort(Cr)});var r=n.next;(n.f&Ya)!==0?n.parent=null:Gt(n,t),n=r}}function iu(a){for(var t=a.first;t!==null;){var n=t.next;(t.f&ya)===0&&Gt(t),t=n}}function Gt(a,t=!0){var n=!1;(t||(a.f&dl)!==0)&&a.nodes!==null&&a.nodes.end!==null&&(lu(a.nodes.start,a.nodes.end),n=!0),a.f|=ns,Bs(a,t&&!n),kr(a,0);var r=a.nodes&&a.nodes.t;if(r!==null)for(const c of r)c.stop();Hl(a),a.f^=ns,a.f|=ua;var o=a.parent;o!==null&&o.first!==null&&Ul(a),a.next=a.prev=a.teardown=a.ctx=a.deps=a.fn=a.nodes=a.ac=a.b=null}function lu(a,t){for(;a!==null;){var n=a===t?null:Ar(a);a.remove(),a=n}}function Ul(a){var t=a.parent,n=a.prev,r=a.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===a&&(t.first=r),t.last===a&&(t.last=n))}function kn(a,t,n=!0){var r=[];Wl(a,r,!0);var o=()=>{n&&Gt(a),t&&t()},c=r.length;if(c>0){var l=()=>--c||o();for(var i of r)i.out(l)}else o()}function Wl(a,t,n){if((a.f&ta)===0){a.f^=ta;var r=a.nodes&&a.nodes.t;if(r!==null)for(const i of r)(i.is_global||n)&&t.push(i);for(var o=a.first;o!==null;){var c=o.next;if((o.f&Ya)===0){var l=(o.f&nn)!==0||(o.f&ya)!==0&&(a.f&Pa)!==0;Wl(o,t,l?n:!1)}o=c}}}function oo(a){Yl(a,!0)}function Yl(a,t){if((a.f&ta)!==0){a.f^=ta,(a.f&zt)===0&&(It(a,Bt),Sn.ensure().schedule(a));for(var n=a.first;n!==null;){var r=n.next,o=(n.f&nn)!==0||(n.f&ya)!==0;Yl(n,o?t:!1),n=r}var c=a.nodes&&a.nodes.t;if(c!==null)for(const l of c)(l.is_global||t)&&l.in()}}function zs(a,t){if(a.nodes)for(var n=a.nodes.start,r=a.nodes.end;n!==null;){var o=n===r?null:Ar(n);t.append(n),n=o}}let $r=!1,Ka=!1;function _i(a){Ka=a}let ct=null,Ma=!1;function ka(a){ct=a}let st=null;function wa(a){st=a}let La=null;function Kl(a){ct!==null&&(La??(La=new Set)).add(a)}let oa=null,la=0,ha=null;function cu(a){ha=a}let Gl=1,vn=0,wn=vn;function pi(a){wn=a}function Vl(){return++Gl}function jr(a){var t=a.f;if((t&Bt)!==0)return!0;if(t&Wt&&(a.f&=~Tn),(t&Ca)!==0){for(var n=a.deps,r=n.length,o=0;o<r;o++){var c=n[o];if(jr(c)&&Sl(c),c.wv>a.wv)return!0}(t&ba)!==0&&Kt===null&&It(a,zt)}return!1}function Xl(a,t,n=!0){var r=a.reactions;if(r!==null&&!(La!==null&&La.has(a)))for(var o=0;o<r.length;o++){var c=r[o];(c.f&Wt)!==0?Xl(c,t,!1):t===c&&(n?It(c,Bt):(c.f&zt)!==0&&It(c,Ca),Ls(c))}}function $l(a){var T;var t=oa,n=la,r=ha,o=ct,c=La,l=At,i=Ma,u=wn,f=a.f;oa=null,la=0,ha=null,ct=(f&(ya|Ya))===0?a:null,La=null,Un(a.ctx),Ma=!1,wn=++vn,a.ac!==null&&(er(()=>{a.ac.abort(Cr)}),a.ac=null);try{a.f|=ao;var _=a.fn,m=_();a.f|=Jn;var h=a.deps,y=Le==null?void 0:Le.is_fork;if(oa!==null){var w;if(y||kr(a,la),h!==null&&la>0)for(h.length=la+oa.length,w=0;w<oa.length;w++)h[la+w]=oa[w];else a.deps=h=oa;if(Rs()&&(a.f&ba)!==0)for(w=la;w<h.length;w++)((T=h[w]).reactions??(T.reactions=[])).push(a)}else!y&&h!==null&&la<h.length&&(kr(a,la),h.length=la);if(Er()&&ha!==null&&!Ma&&h!==null&&(a.f&(Wt|Ca|Bt))===0)for(w=0;w<ha.length;w++)Xl(ha[w],a);if(o!==null&&o!==a){if(vn++,o.deps!==null)for(let M=0;M<n;M+=1)o.deps[M].rv=vn;if(t!==null)for(const M of t)M.rv=vn;ha!==null&&(r===null?r=ha:r.push(...ha))}return(a.f&an)!==0&&(a.f^=an),m}catch(M){return yl(M)}finally{a.f^=ao,oa=t,la=n,ha=r,ct=o,La=c,Un(l),Ma=i,wn=u}}function du(a,t){let n=t.reactions;if(n!==null){var r=Jc.call(n,a);if(r!==-1){var o=n.length-1;o===0?n=t.reactions=null:(n[r]=n[o],n.pop())}}if(n===null&&(t.f&Wt)!==0&&(oa===null||!eo.call(oa,t))){var c=t;(c.f&ba)!==0&&(c.f^=ba,c.f&=~Tn),c.v!==Ot&&Ns(c),c.ac!==null&&er(()=>{c.ac.abort(Cr),c.ac=null,It(c,Bt)}),Gd(c),kr(c,0)}}function kr(a,t){var n=a.deps;if(n!==null)for(var r=t;r<n.length;r++)du(a,n[r])}function Kn(a){var t=a.f;if((t&ua)===0){It(a,zt);var n=st,r=$r;st=a,$r=(t&(ya|Ya))===0;try{(t&(Pa|As))!==0?iu(a):Bs(a),Hl(a);var o=$l(a);a.teardown=typeof o=="function"?o:null,a.wv=Gl;var c;sl&&Ad&&(a.f&Bt)!==0&&a.deps}finally{$r=r,st=n}}}async function uu(){await Promise.resolve(),$d()}function e(a){var t=a.f,n=(t&Wt)!==0;if(ct!==null&&!Ma){var r=st!==null&&(st.f&ua)!==0;if(!r&&(La===null||!La.has(a))){var o=ct.deps;if((ct.f&ao)!==0)a.rv<vn&&(a.rv=vn,oa===null&&o!==null&&o[la]===a?la++:oa===null?oa=[a]:oa.push(a));else{ct.deps??(ct.deps=[]),eo.call(ct.deps,a)||ct.deps.push(a);var c=a.reactions;c===null?a.reactions=[ct]:eo.call(c,ct)||c.push(ct)}}}if(Ka&&yn.has(a))return yn.get(a);if(n){var l=a;if(Ka){var i=l.v;return((l.f&zt)===0&&l.reactions!==null||Ql(l))&&(i=Is(l)),yn.set(l,i),i}var u=(l.f&ba)===0&&!Ma&&ct!==null&&($r||(ct.f&ba)!==0),f=(l.f&Jn)===0;jr(l)&&(u&&(l.f|=ba),Sl(l)),u&&!f&&(Dl(l),Jl(l))}if(Kt!=null&&Kt.has(a))return Kt.get(a);if((a.f&an)!==0)throw a.v;return a.v}function Jl(a){if(a.f|=ba,a.deps!==null)for(const t of a.deps)(t.reactions??(t.reactions=[])).push(a),(t.f&Wt)!==0&&(t.f&ba)===0&&(Dl(t),Jl(t))}function Ql(a){if(a.v===Ot)return!0;if(a.deps===null)return!1;for(const t of a.deps)if(yn.has(t)||(t.f&Wt)!==0&&Ql(t))return!0;return!1}function Vt(a){var t=Ma;try{return Ma=!0,a()}finally{Ma=t}}function cn(a){if(!(typeof a!="object"||!a||a instanceof EventTarget)){if(qa in a)hs(a);else if(!Array.isArray(a))for(let t in a){const n=a[t];typeof n=="object"&&n&&qa in n&&hs(n)}}}function hs(a,t=new Set){if(typeof a=="object"&&a!==null&&!(a instanceof EventTarget)&&!t.has(a)){t.add(a),a instanceof Date&&a.getTime();for(let r in a)try{hs(a[r],t)}catch{}const n=Es(a);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=il(n);for(let o in r){const c=r[o].get;if(c)try{c.call(a)}catch{}}}}}function vu(a){return a.endsWith("capture")&&a!=="gotpointercapture"&&a!=="lostpointercapture"}const fu=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function hu(a){return fu.includes(a)}const _u={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function pu(a){return a=a.toLowerCase(),_u[a]??a}const gu=["touchstart","touchmove"];function mu(a){return gu.includes(a)}const fn=Symbol("events"),Zl=new Set,_s=new Set;function ec(a,t,n,r={}){function o(c){if(r.capture||ps.call(t,c),!c.cancelBubble)return er(()=>n==null?void 0:n.call(this,c))}return a.startsWith("pointer")||a.startsWith("touch")||a==="wheel"?Fa(()=>{t.addEventListener(a,o,r)}):t.addEventListener(a,o,r),o}function Dt(a,t,n,r,o){var c={capture:r,passive:o},l=ec(a,t,n,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&ko(()=>{t.removeEventListener(a,l,c)})}function W(a,t,n){(t[fn]??(t[fn]={}))[a]=n}function xt(a){for(var t=0;t<a.length;t++)Zl.add(a[t]);for(var n of _s)n(a)}let gi=null;function ps(a){var T,M;var t=this,n=t.ownerDocument,r=a.type,o=((T=a.composedPath)==null?void 0:T.call(a))||[],c=o[0]||a.target;gi=a;var l=0,i=gi===a&&a[fn];if(i){var u=o.indexOf(i);if(u!==-1&&(t===document||t===window)){a[fn]=t;return}var f=o.indexOf(t);if(f===-1)return;u<=f&&(l=u)}if(c=o[l]||a.target,c!==t){Qc(a,"currentTarget",{configurable:!0,get(){return c||n}});var _=ct,m=st;ka(null),wa(null);try{for(var h,y=[];c!==null&&c!==t;){try{var w=(M=c[fn])==null?void 0:M[r];w!=null&&(!c.disabled||a.target===c)&&w.call(c,a)}catch(D){h?y.push(D):h=D}if(a.cancelBubble)break;l++,c=l<o.length?o[l]:null}if(h){for(let D of y)queueMicrotask(()=>{throw D});throw h}}finally{a[fn]=t,delete a.currentTarget,ka(_),wa(m)}}}var rl;const Lo=((rl=globalThis==null?void 0:globalThis.window)==null?void 0:rl.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:a=>a});function bu(a){return(Lo==null?void 0:Lo.createHTML(a))??a}function tc(a){var t=Rl("template");return t.innerHTML=bu(a.replaceAll("<!>","<!---->")),t.content}function Dn(a,t){var n=st;n.nodes===null&&(n.nodes={start:a,end:t,a:null,t:null})}function E(a,t){var n=(t&_l)!==0,r=(t&Td)!==0,o,c=!a.startsWith("<!>");return()=>{o===void 0&&(o=tc(c?a:"<!>"+a),n||(o=Ha(o)));var l=r||Fl?document.importNode(o,!0):o.cloneNode(!0);if(n){var i=Ha(l),u=l.lastChild;Dn(i,u)}else Dn(l,l);return l}}function yu(a,t,n="svg"){var r=!a.startsWith("<!>"),o=(t&_l)!==0,c=`<${n}>${r?a:"<!>"+a}</${n}>`,l;return()=>{if(!l){var i=tc(c),u=Ha(i);if(o)for(l=document.createDocumentFragment();Ha(u);)l.appendChild(Ha(u));else l=Ha(u)}var f=l.cloneNode(!0);if(o){var _=Ha(f),m=f.lastChild;Dn(_,m)}else Dn(f,f);return f}}function Cn(a,t){return yu(a,t,"svg")}function mi(a=""){{var t=Ea(a+"");return Dn(t,t),t}}function qe(){var a=document.createDocumentFragment(),t=document.createComment(""),n=Ea();return a.append(t,n),Dn(t,n),a}function g(a,t){a!==null&&a.before(t)}function p(a,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(a[ur]??(a[ur]=a.nodeValue))&&(a[ur]=n,a.nodeValue=`${n}`)}function ku(a,t){return wu(a,t)}const Hr=new Map;function wu(a,{target:t,anchor:n,props:r={},events:o,context:c,intro:l=!0,transformError:i}){tu();var u=void 0,f=ou(()=>{var _=n??t.appendChild(Ea());Od(_,{pending:()=>{}},y=>{_t({});var w=At;c&&(w.c=c),o&&(r.$$events=o),u=a(y,r)||{},pt()},i);var m=new Set,h=y=>{for(var w=0;w<y.length;w++){var T=y[w];if(!m.has(T)){m.add(T);var M=mu(T);for(const x of[t,document]){var D=Hr.get(x);D===void 0&&(D=new Map,Hr.set(x,D));var A=D.get(T);A===void 0?(x.addEventListener(T,ps,{passive:M}),D.set(T,1)):D.set(T,A+1)}}}};return h(bo(Zl)),_s.add(h),()=>{var M;for(var y of m)for(const D of[t,document]){var w=Hr.get(D),T=w.get(y);--T==0?(D.removeEventListener(y,ps),w.delete(y),w.size===0&&Hr.delete(D)):w.set(y,T)}_s.delete(h),_!==n&&((M=_.parentNode)==null||M.removeChild(_))}});return xu.set(u,f),u}let xu=new WeakMap;var Da,Na,da,mn,Dr,Pr,mo;class Hs{constructor(t,n=!0){ia(this,"anchor");at(this,Da,new Map);at(this,Na,new Map);at(this,da,new Map);at(this,mn,new Set);at(this,Dr,!0);at(this,Pr,t=>{if(N(this,Da).has(t)){var n=N(this,Da).get(t),r=N(this,Na).get(n);if(r)oo(r),N(this,mn).delete(n);else{var o=N(this,da).get(n);o&&(oo(o.effect),N(this,Na).set(n,o.effect),N(this,da).delete(n),o.fragment.lastChild.remove(),this.anchor.before(o.fragment),r=o.effect)}for(const[c,l]of N(this,Da)){if(N(this,Da).delete(c),c===t)break;const i=N(this,da).get(l);i&&(Gt(i.effect),N(this,da).delete(l))}for(const[c,l]of N(this,Na)){if(c===n||N(this,mn).has(c))continue;const i=()=>{if(Array.from(N(this,Da).values()).includes(c)){var f=document.createDocumentFragment();zs(l,f),f.append(Ea()),N(this,da).set(c,{effect:l,fragment:f})}else Gt(l);N(this,mn).delete(c),N(this,Na).delete(c)};N(this,Dr)||!r?(N(this,mn).add(c),kn(l,i,!1)):i()}}});at(this,mo,t=>{N(this,Da).delete(t);const n=Array.from(N(this,Da).values());for(const[r,o]of N(this,da))n.includes(r)||(Gt(o.effect),N(this,da).delete(r))});this.anchor=t,tt(this,Dr,n)}ensure(t,n){var r=Le,o=Ll();if(n&&!N(this,Na).has(t)&&!N(this,da).has(t))if(o){var c=document.createDocumentFragment(),l=Ea();c.append(l),N(this,da).set(t,{effect:ea(()=>n(l)),fragment:c})}else N(this,Na).set(t,ea(()=>n(this.anchor)));if(N(this,Da).set(r,t),o){for(const[i,u]of N(this,Na))i===t?r.unskip_effect(u):r.skip_effect(u);for(const[i,u]of N(this,da))i===t?r.unskip_effect(u.effect):r.skip_effect(u.effect);r.oncommit(N(this,Pr)),r.ondiscard(N(this,mo))}else N(this,Pr).call(this,r)}}Da=new WeakMap,Na=new WeakMap,da=new WeakMap,mn=new WeakMap,Dr=new WeakMap,Pr=new WeakMap,mo=new WeakMap;function se(a,t,n=!1){var r=new Hs(a),o=n?nn:0;function c(l,i){r.ensure(l,i)}ar(()=>{var l=!1;t((i,u=0)=>{l=!0,c(u,i)}),l||c(-1,null)},o)}function Wa(a,t){return t}function Tu(a,t,n){for(var r=[],o=t.length,c,l=t.length,i=0;i<o;i++){let m=t[i];kn(m,()=>{if(c){if(c.pending.delete(m),c.done.add(m),c.pending.size===0){var h=a.outrogroups;gs(a,bo(c.done)),h.delete(c),h.size===0&&(a.outrogroups=null)}}else l-=1},!1)}if(l===0){var u=r.length===0&&n!==null&&a.pending.size===0;if(u){var f=n,_=f.parentNode;au(_),_.append(f),a.items.clear()}gs(a,t,!u)}else c={pending:new Set(t),done:new Set},(a.outrogroups??(a.outrogroups=new Set)).add(c)}function gs(a,t,n=!0){var r;if(a.pending.size>0){r=new Set;for(const l of a.pending.values())for(const i of l)r.add(a.items.get(i).e)}for(var o=0;o<t.length;o++){var c=t[o];if(r!=null&&r.has(c)){c.f|=ja;const l=document.createDocumentFragment();zs(c,l)}else Gt(t[o],n)}}var bi;function Ee(a,t,n,r,o,c=null){var l=a,i=new Map,u=(t&fl)!==0;if(u){var f=a;l=f.appendChild(Ea())}var _=null,m=Fs(()=>{var x=n();return Cs(x)?x:x==null?[]:bo(x)}),h,y=new Map,w=!0;function T(x){(A.effect.f&ua)===0&&(A.pending.delete(x),A.fallback=_,Su(A,h,l,t,r),_!==null&&(h.length===0?(_.f&ja)===0?oo(_):(_.f^=ja,_r(_,null,l)):kn(_,()=>{_=null})))}function M(x){A.pending.delete(x)}var D=ar(()=>{h=e(m);for(var x=h.length,L=new Set,k=Le,P=Ll(),Y=0;Y<x;Y+=1){var fe=h[Y],ce=r(fe,Y),ae=w?null:i.get(ce);ae?(ae.v&&Yn(ae.v,fe),ae.i&&Yn(ae.i,Y),P&&k.unskip_effect(ae.e)):(ae=Du(i,w?l:bi??(bi=Ea()),fe,ce,Y,o,t,n),w||(ae.e.f|=ja),i.set(ce,ae)),L.add(ce)}if(x===0&&c&&!_&&(w?_=ea(()=>c(l)):(_=ea(()=>c(bi??(bi=Ea()))),_.f|=ja)),x>L.size&&sd(),!w)if(y.set(k,L),P){for(const[te,G]of i)L.has(te)||k.skip_effect(G.e);k.oncommit(T),k.ondiscard(M)}else T(k);e(m)}),A={effect:D,items:i,pending:y,outrogroups:null,fallback:_};w=!1}function or(a){for(;a!==null&&(a.f&ya)===0;)a=a.next;return a}function Su(a,t,n,r,o){var ae,te,G,ie,F,R,ne,pe,me;var c=(r&md)!==0,l=t.length,i=a.items,u=or(a.effect.first),f,_=null,m,h=[],y=[],w,T,M,D;if(c)for(D=0;D<l;D+=1)w=t[D],T=o(w,D),M=i.get(T).e,(M.f&ja)===0&&((te=(ae=M.nodes)==null?void 0:ae.a)==null||te.measure(),(m??(m=new Set)).add(M));for(D=0;D<l;D+=1){if(w=t[D],T=o(w,D),M=i.get(T).e,a.outrogroups!==null)for(const B of a.outrogroups)B.pending.delete(M),B.done.delete(M);if((M.f&ta)!==0&&(oo(M),c&&((ie=(G=M.nodes)==null?void 0:G.a)==null||ie.unfix(),(m??(m=new Set)).delete(M))),(M.f&ja)!==0)if(M.f^=ja,M===u)_r(M,null,n);else{var A=_?_.next:u;M===a.effect.last&&(a.effect.last=M.prev),M.prev&&(M.prev.next=M.next),M.next&&(M.next.prev=M.prev),$a(a,_,M),$a(a,M,A),_r(M,A,n),_=M,h=[],y=[],u=or(_.next);continue}if(M!==u){if(f!==void 0&&f.has(M)){if(h.length<y.length){var x=y[0],L;_=x.prev;var k=h[0],P=h[h.length-1];for(L=0;L<h.length;L+=1)_r(h[L],x,n);for(L=0;L<y.length;L+=1)f.delete(y[L]);$a(a,k.prev,P.next),$a(a,_,k),$a(a,P,x),u=x,_=P,D-=1,h=[],y=[]}else f.delete(M),_r(M,u,n),$a(a,M.prev,M.next),$a(a,M,_===null?a.effect.first:_.next),$a(a,_,M),_=M;continue}for(h=[],y=[];u!==null&&u!==M;)(f??(f=new Set)).add(u),y.push(u),u=or(u.next);if(u===null)continue}(M.f&ja)===0&&h.push(M),_=M,u=or(M.next)}if(a.outrogroups!==null){for(const B of a.outrogroups)B.pending.size===0&&(gs(a,bo(B.done)),(F=a.outrogroups)==null||F.delete(B));a.outrogroups.size===0&&(a.outrogroups=null)}if(u!==null||f!==void 0){var Y=[];if(f!==void 0)for(M of f)(M.f&ta)===0&&Y.push(M);for(;u!==null;)(u.f&ta)===0&&u!==a.fallback&&Y.push(u),u=or(u.next);var fe=Y.length;if(fe>0){var ce=(r&fl)!==0&&l===0?n:null;if(c){for(D=0;D<fe;D+=1)(ne=(R=Y[D].nodes)==null?void 0:R.a)==null||ne.measure();for(D=0;D<fe;D+=1)(me=(pe=Y[D].nodes)==null?void 0:pe.a)==null||me.fix()}Tu(a,Y,ce)}}c&&Fa(()=>{var B,de;if(m!==void 0)for(M of m)(de=(B=M.nodes)==null?void 0:B.a)==null||de.apply()})}function Du(a,t,n,r,o,c,l,i){var u=(l&pd)!==0?(l&bd)===0?Qd(n,!1,!1):rn(n):null,f=(l&gd)!==0?rn(o):null;return{v:u,i:f,e:ea(()=>(c(t,u??n,f??o,i),()=>{a.delete(r)}))}}function _r(a,t,n){if(a.nodes)for(var r=a.nodes.start,o=a.nodes.end,c=t&&(t.f&ja)===0?t.nodes.start:n;r!==null;){var l=Ar(r);if(c.before(r),r===o)return;r=l}}function $a(a,t,n){t===null?a.effect.first=n:t.next=n,n===null?a.effect.last=t:n.prev=t}function Ke(a,t,n,r,o){var i;var c=(i=t.$$slots)==null?void 0:i[n],l=!1;c===!0&&(c=t.children,l=!0),c===void 0||c(a,l?()=>r:r)}function Fr(a,t,n){var r=new Hs(a);ar(()=>{var o=t()??null;r.ensure(o,o&&(c=>n(c,o)))},nn)}function Pu(a,t,n,r,o,c){var l=null,i=a,u=new Hs(i,!1);ar(()=>{const f=t()||null;var _=Sd;if(f===null){u.ensure(null,null);return}return u.ensure(f,m=>{if(f){if(l=Rl(f,_),Dn(l,l),r){var h=null,y=l.appendChild(Ea());r(l,y),h==null||h.remove()}st.nodes.end=l,m.before(l)}}),()=>{}},nn),ko(()=>{})}function Ir(a,t){var n;n=document.head.appendChild(Ea());try{ar(()=>{var r=ea(()=>t(n));r.f|=dl})}finally{}}function Mu(a,t){var n=void 0,r;zl(()=>{n!==(n=t())&&(r&&(Gt(r),r=null),n&&(r=ea(()=>{wo(()=>n(a))})))})}function ac(a){var t,n,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var o=a.length;for(t=0;t<o;t++)a[t]&&(n=ac(a[t]))&&(r&&(r+=" "),r+=n)}else for(n in a)a[n]&&(r&&(r+=" "),r+=n);return r}function Cu(){for(var a,t,n=0,r="",o=arguments.length;n<o;n++)(a=arguments[n])&&(t=ac(a))&&(r&&(r+=" "),r+=t);return r}function Eu(a){return typeof a=="object"?Cu(a):a??""}const yi=[...` 	
\r\f \v\uFEFF`];function Au(a,t,n){var r=a==null?"":""+a;if(t&&(r=r?r+" "+t:t),n){for(var o of Object.keys(n))if(n[o])r=r?r+" "+o:o;else if(r.length)for(var c=o.length,l=0;(l=r.indexOf(o,l))>=0;){var i=l+c;(l===0||yi.includes(r[l-1]))&&(i===r.length||yi.includes(r[i]))?r=(l===0?"":r.substring(0,l))+r.substring(i+1):l=i}}return r===""?null:r}function ki(a,t=!1){var n=t?" !important;":";",r="";for(var o of Object.keys(a)){var c=a[o];c!=null&&c!==""&&(r+=" "+o+": "+c+n)}return r}function Ro(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function Nu(a,t){if(t){var n="",r,o;if(Array.isArray(t)?(r=t[0],o=t[1]):r=t,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,l=0,i=!1,u=[];r&&u.push(...Object.keys(r).map(Ro)),o&&u.push(...Object.keys(o).map(Ro));var f=0,_=-1;const T=a.length;for(var m=0;m<T;m++){var h=a[m];if(i?h==="/"&&a[m-1]==="*"&&(i=!1):c?c===h&&(c=!1):h==="/"&&a[m+1]==="*"?i=!0:h==='"'||h==="'"?c=h:h==="("?l++:h===")"&&l--,!i&&c===!1&&l===0){if(h===":"&&_===-1)_=m;else if(h===";"||m===T-1){if(_!==-1){var y=Ro(a.substring(f,_).trim());if(!u.includes(y)){h!==";"&&m++;var w=a.substring(f,m).trim();n+=" "+w+";"}}f=m+1,_=-1}}}}return r&&(n+=ki(r)),o&&(n+=ki(o,!0)),n=n.trim(),n===""?null:n}return a==null?null:String(a)}function et(a,t,n,r,o,c){var l=a[rs];if(l!==n||l===void 0){var i=Au(n,r,c);i==null?a.removeAttribute("class"):t?a.className=i:a.setAttribute("class",i),a[rs]=n}else if(c&&o!==c)for(var u in c){var f=!!c[u];(o==null||f!==!!o[u])&&a.classList.toggle(u,f)}return c}function Oo(a,t={},n,r){for(var o in n){var c=n[o];t[o]!==c&&(n[o]==null?a.style.removeProperty(o):a.style.setProperty(o,c,r))}}function jt(a,t,n,r){var o=a[os];if(o!==t){var c=Nu(t,r);c==null?a.removeAttribute("style"):a.style.cssText=c,a[os]=t}else r&&(Array.isArray(r)?(Oo(a,n==null?void 0:n[0],r[0]),Oo(a,n==null?void 0:n[1],r[1],"important")):Oo(a,n,r));return r}function qt(a,t,n=!1){if(a.multiple){if(t==null)return;if(!Cs(t))return Md();for(var r of a.options)r.selected=t.includes(br(r));return}for(r of a.options){var o=br(r);if(eu(o,t)){r.selected=!0;return}}(!n||t!==void 0)&&(a.selectedIndex=-1)}function Ht(a){var t=new MutationObserver(()=>{"__value"in a&&qt(a,a.__value)});t.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),ko(()=>{t.disconnect()})}function so(a,t,n=t){var r=new WeakSet,o=!0;xl(a,"change",c=>{var l=c?"[selected]":":checked",i;if(a.multiple)i=[].map.call(a.querySelectorAll(l),br);else{var u=a.querySelector(l)??a.querySelector("option:not([disabled])");i=u&&br(u)}n(i),a.__value=i,Le!==null&&r.add(Le)}),wo(()=>{var c=t();if(a===document.activeElement){var l=Le;if(r.has(l))return}if(qt(a,c,o),o&&c===void 0){var i=a.querySelector(":checked");i!==null&&(c=br(i),n(c))}a.__value=c,o=!1}),Ht(a)}function br(a){return"__value"in a?a.__value:a.value}const sr=Symbol("class"),ir=Symbol("style"),nc=Symbol("is custom element"),rc=Symbol("is html"),ju=yo?"input":"INPUT",Fu=yo?"option":"OPTION",Iu=yo?"select":"SELECT",qu=yo?"progress":"PROGRESS";function io(a,t){var n=xo(a);n.value===(n.value=t??void 0)||a.value===t&&(t!==0||a.nodeName!==qu)||(a.value=t??"")}function Us(a,t){var n=xo(a);n.checked!==(n.checked=t??void 0)&&(a.checked=t)}function Lu(a,t){t?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function I(a,t,n,r){var o=xo(a);o[t]!==(o[t]=n)&&(t==="loading"&&(a[nd]=n),n==null?a.removeAttribute(t):typeof n!="string"&&oc(a).includes(t)?a[t]=n:a.setAttribute(t,n))}function Ru(a,t,n,r,o=!1,c=!1){var l=xo(a),i=l[nc],u=!l[rc],f=t||{},_=a.nodeName===Fu;for(var m in t)m in n||(n[m]=null);n.class?n.class=Eu(n.class):n[sr]&&(n.class=null),n[ir]&&(n.style??(n.style=null));var h=oc(a);if(a.nodeName===ju&&"type"in n&&("value"in n||"__value"in n)){var y=n.type;(y!==f.type||y===void 0&&a.hasAttribute("type"))&&(f.type=y,I(a,"type",y))}for(const k in n){let P=n[k];if(_&&k==="value"&&P==null){a.value=a.__value="",f[k]=P;continue}if(k==="class"){var w=a.namespaceURI==="http://www.w3.org/1999/xhtml";et(a,w,P,r,t==null?void 0:t[sr],n[sr]),f[k]=P,f[sr]=n[sr];continue}if(k==="style"){jt(a,P,t==null?void 0:t[ir],n[ir]),f[k]=P,f[ir]=n[ir];continue}var T=f[k];if(!(P===T&&!(P===void 0&&a.hasAttribute(k)))){f[k]=P;var M=k[0]+k[1];if(M!=="$$")if(M==="on"){const Y={},fe="$$"+k;let ce=k.slice(2);var D=hu(ce);if(vu(ce)&&(ce=ce.slice(0,-7),Y.capture=!0),!D&&T){if(P!=null)continue;a.removeEventListener(ce,f[fe],Y),f[fe]=null}if(D)W(ce,a,P),xt([ce]);else if(P!=null){let ae=function(te){f[k].call(this,te)};var L=ae;f[fe]=ec(ce,a,ae,Y)}}else if(k==="style")I(a,k,P);else if(k==="autofocus")bn(a,!!P);else if(!i&&(k==="__value"||k==="value"&&P!=null))a.value=a.__value=P;else if(k==="selected"&&_)Lu(a,P);else{var A=k;u||(A=pu(A));var x=A==="defaultValue"||A==="defaultChecked";if(P==null&&!i&&!x)if(l[k]=null,A==="value"||A==="checked"){let Y=a;const fe=t===void 0;if(A==="value"){let ce=Y.defaultValue;Y.removeAttribute(A),Y.defaultValue=ce,Y.value=Y.__value=fe?ce:null}else{let ce=Y.defaultChecked;Y.removeAttribute(A),Y.defaultChecked=ce,Y.checked=fe?ce:!1}}else a.removeAttribute(k);else x||h.includes(A)&&(i||typeof P!="string")?(a[A]=P,A in l&&(l[A]=Ot)):typeof P!="function"&&I(a,A,P)}}}return f}function wi(a,t,n=[],r=[],o=[],c,l=!1,i=!1){js(o,n,r,u=>{var f=void 0,_={},m=a.nodeName===Iu,h=!1;if(zl(()=>{var w=t(...u.map(e)),T=Ru(a,f,w,c,l,i);h&&m&&"value"in w&&qt(a,w.value);for(let D of Object.getOwnPropertySymbols(_))w[D]||Gt(_[D]);for(let D of Object.getOwnPropertySymbols(w)){var M=w[D];D.description===Dd&&(!f||M!==f[D])&&(_[D]&&Gt(_[D]),_[D]=ea(()=>Mu(a,()=>M))),T[D]=M}f=T}),m){var y=a;wo(()=>{qt(y,f.value,!0),Ht(y)})}h=!0})}function xo(a){return a[Yr]??(a[Yr]={[nc]:a.nodeName.includes("-"),[rc]:a.namespaceURI===pl})}var xi=new Map;function oc(a){var t=a.getAttribute("is")||a.nodeName,n=xi.get(t);if(n)return n;xi.set(t,n=[]);for(var r,o=a,c=Element.prototype;c!==o;){r=il(o);for(var l in r)r[l].set&&l!=="innerHTML"&&l!=="textContent"&&l!=="innerText"&&n.push(l);o=Es(o)}return n}function kt(a,t,n=t){var r=new WeakSet;xl(a,"input",async o=>{var c=o?a.defaultValue:a.value;if(c=Bo(a)?zo(c):c,n(c),Le!==null&&r.add(Le),await uu(),c!==(c=t())){var l=a.selectionStart,i=a.selectionEnd,u=a.value.length;if(a.value=c??"",i!==null){var f=a.value.length;l===i&&i===u&&f>u?(a.selectionStart=f,a.selectionEnd=f):(a.selectionStart=l,a.selectionEnd=Math.min(i,f))}}}),Vt(t)==null&&a.value&&(n(Bo(a)?zo(a.value):a.value),Le!==null&&r.add(Le)),Os(()=>{var o=t();if(a===document.activeElement){var c=Le;if(r.has(c))return}Bo(a)&&o===zo(a.value)||a.type==="date"&&!o&&!a.value||o!==a.value&&(a.value=o??"")})}function Bo(a){var t=a.type;return t==="number"||t==="range"}function zo(a){return a===""?null:+a}function Ho(a,t){return a===t||(a==null?void 0:a[qa])===t}function Ou(a={},t,n,r){var o=At.r,c=st;return wo(()=>{var l,i;return Os(()=>{l=i,i=[],Vt(()=>{Ho(n(...i),a)||(t(a,...i),l&&Ho(n(...l),a)&&t(null,...l))})}),()=>{let u=c;for(;u!==o&&u.parent!==null&&u.parent.f&ns;)u=u.parent;const f=()=>{i&&Ho(n(...i),a)&&t(null,...i)},_=u.teardown;u.teardown=()=>{f(),_==null||_()}}}),a}function Bu(a=!1){const t=At,n=t.l.u;if(!n)return;let r=()=>cn(t.s);if(a){let o=0,c={};const l=Wn(()=>{let i=!1;const u=t.s;for(const f in u)u[f]!==c[f]&&(c[f]=u[f],i=!0);return i&&o++,o});r=()=>e(l)}n.b.length&&ru(()=>{Ti(t,r),ts(n.b)}),Pt(()=>{const o=Vt(()=>n.m.map(ad));return()=>{for(const c of o)typeof c=="function"&&c()}}),n.a.length&&Pt(()=>{Ti(t,r),ts(n.a)})}function Ti(a,t){if(a.l.s)for(const n of a.l.s)e(n);t()}const zu={get(a,t){if(!a.exclude.includes(t))return e(a.version),t in a.special?a.special[t]():a.props[t]},set(a,t,n){if(!(t in a.special)){var r=st;try{wa(a.parent_effect),a.special[t]=ma({get[t](){return a.props[t]}},t,hl)}finally{wa(r)}}return a.special[t](n),fi(a.version),!0},getOwnPropertyDescriptor(a,t){if(!a.exclude.includes(t)&&t in a.props)return{enumerable:!0,configurable:!0,value:a.props[t]}},deleteProperty(a,t){return a.exclude.includes(t)||(a.exclude.push(t),fi(a.version)),!0},has(a,t){return a.exclude.includes(t)?!1:t in a.props},ownKeys(a){return Reflect.ownKeys(a.props).filter(t=>!a.exclude.includes(t))}};function We(a,t){return new Proxy({props:a,exclude:t,special:{},version:rn(0),parent_effect:st},zu)}const Hu={get(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(rr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(a,t,n){let r=a.props.length;for(;r--;){let o=a.props[r];rr(o)&&(o=o());const c=tn(o,t);if(c&&c.set)return c.set(n),!0}return!1},getOwnPropertyDescriptor(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(rr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const o=tn(r,t);return o&&!o.configurable&&(o.configurable=!0),o}}},has(a,t){if(t===qa||t===vl)return!1;for(let n of a.props)if(rr(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(a){const t=[];for(let n of a.props)if(rr(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function Qe(...a){return new Proxy({props:a},Hu)}function ma(a,t,n,r){var L;var o=!Zn||(n&kd)!==0,c=(n&wd)!==0,l=(n&xd)!==0,i=r,u=!0,f=void 0,_=()=>l&&o?(f??(f=Wn(r)),e(f)):(u&&(u=!1,i=l?Vt(r):r),i);let m;if(c){var h=qa in a||vl in a;m=((L=tn(a,t))==null?void 0:L.set)??(h&&t in a?k=>a[t]=k:void 0)}var y,w=!1;c?[y,w]=Id(()=>a[t]):y=a[t],y===void 0&&r!==void 0&&(y=_(),m&&(o&&ud(),m(y)));var T;if(o?T=()=>{var k=a[t];return k===void 0?_():(u=!0,k)}:T=()=>{var k=a[t];return k!==void 0&&(i=void 0),k===void 0?i:k},o&&(n&hl)===0)return T;if(m){var M=a.$$legacy;return(function(k,P){return arguments.length>0?((!o||!P||M||w)&&m(P?T():k),k):T()})}var D=!1,A=((n&yd)!==0?Wn:Fs)(()=>(D=!1,T()));c&&e(A);var x=st;return(function(k,P){if(arguments.length>0){const Y=P?e(A):o&&c?ze(k):k;return v(A,Y),D=!0,i!==void 0&&(i=Y),k}return Ka&&D||(x.f&ua)!==0?A.v:e(A)})}function on(a){At===null&&rd(),Zn&&At.l!==null?Uu(At).m.push(a):Pt(()=>{const t=Vt(a);if(typeof t=="function")return t})}function Uu(a){var t=a.l;return t.u??(t.u={a:[],b:[],m:[]})}const Wu="modulepreload",Yu=function(a){return"/"+a},Si={},Ku=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let l=function(f){return Promise.all(f.map(_=>Promise.resolve(_).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=l(n.map(f=>{if(f=Yu(f),f in Si)return;Si[f]=!0;const _=f.endsWith(".css"),m=_?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${m}`))return;const h=document.createElement("link");if(h.rel=_?"stylesheet":Wu,_||(h.as="script"),h.crossOrigin="",h.href=f,u&&h.setAttribute("nonce",u),document.head.appendChild(h),_)return new Promise((y,w)=>{h.addEventListener("load",y),h.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${f}`)))})}))}function c(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return o.then(l=>{for(const i of l||[])i.status==="rejected"&&c(i.reason);return t().catch(c)})},Gu="5";var ol;typeof window<"u"&&((ol=window.__svelte??(window.__svelte={})).v??(ol.v=new Set)).add(Gu);Nd();/**
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
 */const Vu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const Xu=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const Di=(...a)=>a.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var $u=Cn("<svg><!><!></svg>");function Ze(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]),r=We(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);_t(t,!1);let o=ma(t,"name",8,void 0),c=ma(t,"color",8,"currentColor"),l=ma(t,"size",8,24),i=ma(t,"strokeWidth",8,2),u=ma(t,"absoluteStrokeWidth",8,!1),f=ma(t,"iconNode",24,()=>[]);Bu();var _=$u();wi(_,(y,w,T)=>({...Vu,...y,...r,width:l(),height:l(),stroke:c(),"stroke-width":w,class:T}),[()=>Xu(r)?void 0:{"aria-hidden":"true"},()=>(cn(u()),cn(i()),cn(l()),Vt(()=>u()?Number(i())*24/Number(l()):i())),()=>(cn(Di),cn(o()),cn(n),Vt(()=>Di("lucide-icon","lucide",o()?`lucide-${o()}`:"",n.class)))]);var m=s(_);Ee(m,1,f,Wa,(y,w)=>{var T=j(()=>cl(e(w),2));let M=()=>e(T)[0],D=()=>e(T)[1];var A=qe(),x=Ae(A);Pu(x,M,!0,(L,k)=>{wi(L,()=>({...D()}))}),g(y,A)});var h=d(m);Ke(h,t,"default",{}),g(a,_),pt()}function Pi(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];Ze(a,Qe({name:"award"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function sc(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];Ze(a,Qe({name:"bell"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Ju(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];Ze(a,Qe({name:"book-open"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Qu(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];Ze(a,Qe({name:"calendar-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function ic(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];Ze(a,Qe({name:"calendar-days"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Zu(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];Ze(a,Qe({name:"calendar-range"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function ev(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];Ze(a,Qe({name:"calendar"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Ws(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];Ze(a,Qe({name:"chart-column"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Ua(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];Ze(a,Qe({name:"check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Gn(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];Ze(a,Qe({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function tv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15 18-6-6 6-6"}]];Ze(a,Qe({name:"chevron-left"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Vn(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];Ze(a,Qe({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function ms(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];Ze(a,Qe({name:"circle-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function lc(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];Ze(a,Qe({name:"circle-question-mark"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Xn(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];Ze(a,Qe({name:"clock"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function av(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];Ze(a,Qe({name:"download"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function nv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];Ze(a,Qe({name:"ellipsis-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function rv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];Ze(a,Qe({name:"flame"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function ov(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];Ze(a,Qe({name:"folder"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function sv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];Ze(a,Qe({name:"grip-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function iv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]];Ze(a,Qe({name:"languages"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function cc(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["rect",{x:"3",y:"4",width:"6",height:"6",rx:"1"}]];Ze(a,Qe({name:"list-todo"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function lv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];Ze(a,Qe({name:"list"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function cv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];Ze(a,Qe({name:"mail"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function dv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];Ze(a,Qe({name:"palette"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function uv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];Ze(a,Qe({name:"pause"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Ys(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];Ze(a,Qe({name:"pencil"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function lo(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];Ze(a,Qe({name:"play"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Pn(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];Ze(a,Qe({name:"plus"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function dc(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];Ze(a,Qe({name:"quote"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function vv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];Ze(a,Qe({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function fv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m17 2 4 4-4 4"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{d:"m7 22-4-4 4-4"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3"}]];Ze(a,Qe({name:"repeat"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function hv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];Ze(a,Qe({name:"rotate-ccw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function _v(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]];Ze(a,Qe({name:"save"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function pv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];Ze(a,Qe({name:"search"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function gv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];Ze(a,Qe({name:"settings"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function mv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 4v16"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]];Ze(a,Qe({name:"skip-forward"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function bv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];Ze(a,Qe({name:"square"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function yv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Ze(a,Qe({name:"sun"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function kv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];Ze(a,Qe({name:"sunrise"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function wv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];Ze(a,Qe({name:"tag"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function bs(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];Ze(a,Qe({name:"target"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function qr(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Ze(a,Qe({name:"trash-2"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Uo(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];Ze(a,Qe({name:"trending-up"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function xv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Ze(a,Qe({name:"upload"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Tv(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]];Ze(a,Qe({name:"user-round"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}function Ks(a,t){const n=We(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Ze(a,Qe({name:"x"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=qe(),i=Ae(l);Ke(i,t,"default",{}),g(o,l)},$$slots:{default:!0}}))}const Sv="/timer";function uc(){const a=window.location.hash,t=a.startsWith("#")?a.slice(1):a;return!t||t==="/"?Sv:t}let Gs=z(ze(uc())),Mi=!1;function Dv(){Mi||typeof window>"u"||(Mi=!0,window.addEventListener("hashchange",()=>{v(Gs,uc(),!0)}))}Dv();function Pv(){return e(Gs)}function vc(a){if(window.location.hash===`#${a}`){v(Gs,a,!0);return}window.location.hash=a}const Mv=[{path:"/timer",labelKey:"timer"},{path:"/tasks",labelKey:"tasks"},{path:"/stats",labelKey:"stats"},{path:"/settings",labelKey:"settings"},{path:"/help",labelKey:"help"}],Cv={page:{timer:"番茄钟 - PomoFlow",tasks:"任务 - PomoFlow",stats:"统计 - PomoFlow",settings:"配置 - PomoFlow"},nav:{timer:"番茄钟",tasks:"任务清单",stats:"统计",settings:"配置",help:"帮助与反馈",mainNav:"主导航"},mode:{focus:"专注",shortBreak:"短休息",longBreak:"长休息",focusing:"专注中"},priority:{high:"高",medium:"中",low:"低",none:"无"},common:{confirm:"知道了",noData:"暂无任务",reviewPlaceholder:"写点复盘…",ariaCompleted:"已完成",ariaMarkDone:"标记完成",ariaMarkUndone:"标记为未完成",loading:"加载中...",close:"关闭",clear:"清除",add:"添加",expand:"展开",collapse:"收起"},timer:{start:"开始专注",startBreak:"开始休息啦",pause:"暂停",resume:"继续",stop:"停止",abandon:"放弃",skip:"跳过",starting:"启动中...",todayDone:"今日已完成",pomodoroUnit:"个番茄钟",pomodoros:"番茄",taskList:"任务清单",todayFocus:"今日专注",minute:"分钟",selectTask:"选择专注任务",selectTaskPlaceholder:"-- 选择任务 --",modeTabsAria:"计时器模式",noSpecificTask:"无特定任务",noTodoTask:"暂无待办任务",reviewTitle:"📝 今日日复盘",reviewPlaceholder:"记录今天的复盘…",clearFilter:"清除筛选",startTooltip:"开始专注",mottoRefresh:"换一条",modalTitle:"提示",focusCompleteTitle:"专注完成",noTask:"暂无任务",expandSubtasks:"展开子任务",collapseSubtasks:"收起子任务"},filter:{project:"项目",tag:"标签",priority:"优先级",date:"日　期",all:"全部",allProject:"全部项目",allTag:"全部标签",allPriority:"全部优先级",today:"今天",tomorrow:"明天",thisWeek:"本周",week:"本周",month:"本月",startDate:"开始日期",endDate:"结束日期",dueDate:"到期日",start:"开始",end:"结束",to:"至",export:"导出",projectAria:"项目筛选",tagAria:"标签筛选",priorityAria:"优先级筛选"},export:{index:"序号",title:"任务描述",project:"项目",priority:"优先级",dueDate:"到期日",estimated:"预计番茄数",tags:"标签",subtasks:"子任务",status:"任务状态",statusActive:"未完成",statusCompleted:"已完成",fileName:"任务清单"},task:{statEstimated:"预计时间",statActive:"待完成任务",statFocused:"已专注时间",statCompleted:"已完成任务",statCompletedPomo:"已完成番茄钟",searchResult:"搜索结果",list:"清单",task:"任务",noTask:"暂无任务",noDate:"未安排日期",unscheduled:"未安排",minute:"分钟",startTooltip:"开始专注",detailPriority:"优先级",detailPomodoro:"番茄",detailDueDate:"到期日",detailProject:"清单",detailReminder:"提醒",detailRepeat:"重复",detailNoTags:"无标签",detailEditTags:"编辑标签",detailCollapse:"收起",detailAddSubtask:"添加子任务...",subtaskEditPlaceholder:"修改子任务...",editSubtask:"编辑子任务",deleteSubtask:"删除子任务",detailAddNote:"添加备注...",detailDelete:"删除任务",detailNoProject:"无",detailNoTagsAvailable:"暂无可用标签",detailEmpty:"点击任务查看详情",detailTimeFilled:"已用当前时间补全截止时间，如需调整请在「到期日」中修改。",deleteConfirm:"删除任务「{title}」？",emptyAll:"暂无任务，添加一个开始吧",emptyFiltered:"此筛选下没有任务",groupHeader:"{date}（{weekday}）| {n} 分钟",detailPanelAria:"任务详情",titleAria:"标题",detailDescription:"描述",detailDescPlaceholder:"补充细节...",detailSubtasks:"子任务",newSubtaskAria:"新子任务",unknownProject:"未知",toggleSubtaskAria:"切换子任务完成",dblclickToEdit:"双击编辑",noTagsHint:"还没有标签，在「设置 → 标签」里创建",tagPickerAria:"标签多选",saveFailed:"保存失败：{err}",setTagsFailed:"设置标签失败：{err}",addSubtaskFailed:"添加子任务失败：{err}",updateSubtaskFailed:"更新子任务失败：{err}",deleteSubtaskFailed:"删除子任务失败：{err}"},stats:{dimToday:"今日",dimWeek:"本周",dimMonth:"本月",dimQuarter:"季度",dimHalf:"半年",dimYear:"年",focusDuration:"专注时长",sessions:"番茄数",completed:"完成任务",avg:"日均专注",activeDays:"活跃天数",longestStreak:"最长连续专注",avgWeek:"周均专注",avgMonth:"月均专注",peakMonth:"高峰月",peakPeriod:"高峰期",bestProject:"最佳项目",momRatio:"环比上期",trendTitle:"专注趋势",projectDist:"项目时间分布",noData:"该维度暂无专注数据",noProject:"暂无项目数据",unitMin:"分钟",unitCount:"个",unitDay:"天",byDay:"日",byWeek:"周",byMonth:"月",weeklyFocusTitle:"本周专注时长（分钟）",loading:"统计加载中...",loadError:"统计加载失败：{err}",trendChartAria:"专注趋势柱状图",donutChartAria:"项目时间分布环形图"},enum:{reminder:{"":"不提醒",on_time:"准时","5m":"提前 5 分钟","30m":"提前 30 分钟","1h":"提前 1 小时","1d":"提前 1 天","2d":"提前 2 天"},repeat:{"":"不重复",daily:"每天",weekday:"每个工作日",weekly:"每周",monthly:"每月",yearly:"每年",custom:"自定义"},weekday:["周日","周一","周二","周三","周四","周五","周六"]},settings:{tab:{account:"账号",timer:"番茄钟",lists:"清单管理",tags:"标签管理",theme:"主题背景",motto:"名言警句",notification:"通知文案",language:"中英切换"},language:{title:"界面语言",desc:"选择系统的显示语言，切换后所有页面文字随之变化",zh:"中文",en:"英文"},timerTitle:"番茄钟",timerParams:"番茄钟参数",durationSetting:"时长设置",behaviorSetting:"行为偏好",focusDuration:"番茄时长",shortBreakDuration:"短时休息",longBreakDuration:"长时休息",longBreakInterval:"长时休息间隔",longBreakIntervalEvery:"长休息间隔（每 N 个专注）",minute:"分钟",pomodoroUnit:"个番茄",autoStartNext:"自动开始下个番茄",autoStartNextDesc:"完成一个番茄后立即开始下一个",autoStartBreak:"自动开始休息",autoStartBreakDesc:"番茄完成后自动进入休息时段",autoEnterBreak:"专注完成后自动进入休息",disableBreak:"禁用休息",disableBreakDesc:"开启后将跳过所有休息时段",soundEnabled:"完成提示音",systemNotification:"系统通知",reset:"恢复默认",accountNotOpen:"该功能暂未开放",systemSection:"系统能力",autostart:"开机自启动",autostartHint:"OS 启动时自动运行 PomoFlow（静默启动，常驻托盘）",on:"已开启",off:"已关闭",notifTest:"系统通知测试",notifTestHint:"发送一条测试通知，验证系统通知链路是否通",sendTest:"发送测试",trayHint:"💡 关闭主窗口时 PomoFlow 会驻留在系统托盘，右键托盘图标可『显示窗口 / 退出』。",autostartFail:"自启动切换失败：{err}",notifPermDenied:"通知权限未授予，无法发送",notifSendFail:"通知失败：{err}",testNotifTitle:"PomoFlow 测试通知",testNotifBody:"当前 active 任务数：{n}",theme:{title:"主题背景",desc:"上方选主题决定主色（按钮、进度环、导航指示），下方选背景图可单独替换背景层——两者互不影响。",preset:"预设主题",presetBg:"预设背景",presetBgHint:"点选 8 张之一即可换背景；主色仍由上方所选主题决定。",presetBgName:{"preset-bg-1":"预设 1","preset-bg-2":"预设 2","preset-bg-3":"预设 3","preset-bg-4":"预设 4","preset-bg-5":"预设 5","preset-bg-6":"预设 6","preset-bg-7":"预设 7","preset-bg-8":"预设 8"},custom:"自定义背景",upload:"上传图片",customUsed:"已使用自定义背景",bgUsed:"已使用自定义背景图",presetBgUsed:"已使用预设背景",clearBg:"移除背景图",customHint:"支持 JPG/PNG，大图会自动压缩；上传图片会覆盖预设背景，主色仍由所选主题决定。",reset:"恢复默认",compressFail:"图片处理失败，请换一张",bgTooLarge:"背景图片过大，无法持久保存。本次使用有效，但刷新后需重新设置。",presetName:{default:"默认",sunny:"暖阳",ocean:"海洋",forest:"森林",dusk:"黄昏",lavender:"薰衣草",evening:"暮色",teal:"青石"}},motto:{title:"名言警句",addPlaceholder:"输入名言…",authorPlaceholder:"作者（可选）",addBtn:"添加",empty:"暂未添加自定义名言。番茄钟页面将轮播内置名言。",builtInBadge:"内置",defaultAuthor:"自定义",textRequired:"请输入名言内容",textTooLong:"名言不能超过 500 字",authorTooLong:"作者不能超过 64 字"},notification:{title:"通知文案",styleLabel:"提示风格",styleHintCustom:"自定义风格：填写下方文案 + 风格描述",styleHintPreset:"预设风格文案跟随界面语言自动切换；如需自定义文案请选择「自定义风格」。",styleDesc:"风格描述",styleDescPlaceholder:"如：霸气总裁风、文艺青年风…",focusEnd:"🍅 专注结束",breakEnd:"☕ 休息结束",reminder:"🔔 任务到期提醒",titleLabel:"标题",bodyLabel:"正文",placeholderHint:"用 {task_title} 作为任务名占位符，触发时自动替换",save:"保存",saved:"✓ 已保存",styleName:{default:"默认",cute:"卡哇伊",self_dep:"自嘲",strive:"奋斗",funny:"搞笑",custom:"自定义风格"},fallback:{focusTitle:"专注结束",focusBody:"番茄钟结束了，休息一下吧",breakTitle:"休息结束",breakBody:"休息结束，满满的能量开启新的任务专注。"}},repeatCustom:{title:"自定义重复",startDate:"开始日期",endDate:"结束日期",interval:"重复间隔（0~99）",type:"重复类型",typeDay:"日",typeWeek:"周",typeMonth:"月",typeYear:"年",weekdays:"重复在星期几（可多选）",monthDays:"重复在当月几日（可多选）",weekShort:["一","二","三","四","五","六","日"],needPickWeek:"请至少选择一个星期",needPickDay:"请至少选择一个日期",cancel:"取消",confirm:"确定"},list:{title:"清单管理",addRootPlaceholder:"一级清单名称",addRoot:"添加一级清单",addChild:"添加子清单",edit:"修改",del:"删除",level2Placeholder:"二级清单名称",level3Placeholder:"三级清单名称",empty:"暂无清单",dragHint:"按住拖动以重排或改变层级",reorderFail:"拖拽排序失败，请重试",reorderFailDepth:"层级过深，无法移动到此处",reorderFailCycle:"无法移动到当前位置（会形成循环）"},tag:{namePlaceholder:"输入新标签名称",add:"添加标签",colorLabel:"选择颜色：",colorAria:"颜色 {color}",nameLabel:"名称",empty:"暂无标签，请添加一个",dragHandle:"拖动以重排"}},form:{placeholder:"在此输入”任务描述”添加新任务，按「回车」键保存",titlePlaceholder:"任务标题...",pomodoroIcons:"预计番茄钟数",pomodoroUnit:"个番茄钟",more:"更多",collapse:"收起",submit:"提交",estimatedPomo:"预计番茄数",needTitle:"请输入任务名称",needTimeForReminder:"设置了提醒，请在到期日中选择具体时间（时分）",addFailed:"添加失败"},sidebar:{searchPlaceholder:"搜索",searchTasksPlaceholder:"搜索任务标题...",planned:"已计划",completed:"已完成",journal:"手账模式",emptyHint:"暂无清单，点击 + 添加",addRootAria:"新增根清单",addListTitle:"新增清单",listNamePlaceholder:"清单名称...",moreActions:"更多操作",deleteListConfirm:"删除此清单？子清单会一并删除"},journal:{monthTitle:"{year} 年 {month} 月",yearOption:"{year} 年",monthOption:"{month} 月",prevMonth:"上一月",nextMonth:"下一月",yearAria:"年份",monthAria:"月份",weekRange:"第 {n} 周（{ms}/{ds} ~ {me}/{de}）",weekday:["周一","周二","周三","周四","周五","周六","周日"],dailyReviewPlaceholder:"日复盘",weeklyReview:"📋 周复盘",weeklyReviewPlaceholder:"本周复盘"},monthPanel:{title:"{year}年{month}月 · 复盘",weeklyReadonly:"周复盘（只读 · 在手账模式每周区块内编辑）",weekRange:"第 {n} 周（周一起 {date}）",empty:"（空）",monthlyReview:"📋 月度复盘",monthlyPlaceholder:"本月总结…"},help:{tab:{manual:"用户手册",faq:"常见问题",contact:"联系我们"},manual:{timer:{title:"🍅 番茄钟",items:[{text:"选择一个任务后点击「开始」，进入专注计时。专注结束后自动切换到休息模式。"},{text:"三种模式：「专注」（默认 25 分钟，可自定义）/「短休息」（默认 5 分钟）/「长休息」（默认 15 分钟，每 N 个番茄触发一次）。"},{text:"专注结束时弹出系统通知 + 模态框提示（文案可在「配置 → 通知文案」中自定义风格）。"},{text:"可开启「自动开始休息」「自动开始下个番茄」，专注结束后无需手动操作。"},{text:"计时器到点后即使切到其他页面，通知和自动衔接也会正常触发。"},{text:"右侧显示当月任务清单，支持按项目、标签、优先级、日期筛选。"},{text:"专注下方有「今日日复盘」文本框和「座右铭」卡片（可点换一条）。"}]},tasks:{title:"📋 任务清单",items:[{text:"左侧栏切换视图：今天 / 明天 / 本周 / 已计划 / 已完成 / 手账模式。"},{text:"「已计划」页支持按项目、标签、优先级、本周、本月、到期日范围筛选。"},{text:"任务支持：标题、备注、优先级（高/中/低/无）、到期日（含时分）、预计番茄数、番茄时长、提醒、重复。"},{text:"清单（项目）支持嵌套（最多 3 级）、自定义颜色。标签支持多对多、12 种预设色。"},{text:"子任务（Checklist）：每个任务可添加多个子任务，独立勾选完成。"},{text:"点击任务可展开右侧详情面板，直接编辑标题、到期日、优先级、提醒、重复、标签、子任务、备注。"}]},reminder:{title:"🔔 任务提醒",items:[{text:"设置提醒后，到达提醒时间点（到期日减去提前量）会弹出浏览器系统通知。"},{text:"提醒选项：准时 / 提前 5 分钟 / 30 分钟 / 1 小时 / 1 天 / 2 天。"},{text:"专注期间不弹提醒，专注结束后自动补弹（避免打断专注）。"},{text:"同一提醒只弹一次，不会重复打扰。"},{text:"设置提醒时必须填写到期日的时间（时分），否则会提示补全。"}]},repeat:{title:"🔁 任务重复",items:[{text:"内置规则：每天 / 工作日 / 每周 / 每月 / 每年。设置后自动预生成重复实例（上限 50 个）。"},{text:"「自定义」：可选重复间隔（0~99）、类型（日/周/月/年）。",sub:"间隔 0 = 每周期都重复；间隔 1 = 每隔 1 个周期（跳过 1 个）；间隔 N = 每隔 N 个周期。"},{text:"类型为「周」可选星期几（一~日多选）；类型为「月」可选当月几日（多选）。"},{text:"修改重复规则时，旧的未完成实例会自动删除并按新规则重新生成。"},{text:"每个重复实例会完整复制原任务的标签、子任务、备注、优先级、番茄数。"}]},journal:{title:"📔 手账模式",items:[{text:"月级视图，按自然周分组（周一~周日），每周内按 3+3+1 分行展示。"},{text:"每天方块显示当日任务（方形复选框可切完成）+ 日复盘文本框。"},{text:"每周底部有周复盘文本框。右侧面板展示当月各周复盘（只读）+ 月度复盘（可编辑）。"},{text:"支持上一月/下一月 + 年/月下拉切换。"},{text:"番茄钟页面的「今日日复盘」与手账模式当天的日复盘数据同步。"}]},stats:{title:"📊 统计报表",items:[{text:"6 种维度切换：今日 / 本周 / 本月 / 季度 / 半年 / 年。"},{text:"通用 4 卡：专注时长、番茄数、完成任务、日均专注。"},{text:"维度越长亮点越多：活跃天数、最长连续专注、周/月均、高峰期、最佳项目、环比上期。"},{text:"趋势柱状图（按日/周/月自动切换粒度）+ 圆环图（项目时间分布），全部跟随当前主题主色（accent）统一配色，告别五颜六色。"}]},settings:{title:"⚙️ 配置",items:[{text:"「番茄钟」：专注/休息时长、长时休息间隔（2~6 个番茄）、自动开始选项。"},{text:"「清单管理」：添加/修改/删除项目（嵌套 3 级）、自定义颜色。"},{text:"「标签管理」：添加/修改/删除标签、12 种预设色。"},{text:"「主题背景」：8 种预设主题（默认/暖阳/海洋/森林/黄昏/薰衣草/暮色/青石），各含专属背景渐变与配套主色；亦可自定义上传图片（自动压缩），所有页面统一半透明蒙层淡化背景、避免刺眼。"},{text:"「名言警句」：管理自定义座右铭（存数据库，番茄钟页轮播展示）。"},{text:"「通知文案」：6 种风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），分别配置专注结束/休息结束/任务提醒的标题和正文。"}]}},faq:{items:[{q:"数据保存在哪里？会丢失吗？",a:"所有数据（任务、番茄记录、复盘、名言、通知文案、主题设置）保存在本地 SQLite 数据库（pomoflow.db）和浏览器 localStorage 中，无需联网。升级版本时数据库会自动迁移，旧数据完整保留。建议定期备份 pomoflow.db 文件。"},{q:"如何修改番茄时长和长时休息间隔？",a:"进入「配置」→「番茄钟」，在「番茄时长」「短时休息」「长时休息」下拉框中选择分钟数（1~90 分钟可选）。长时休息间隔可选 2~6 个番茄（即每完成几个番茄触发一次长休息）。"},{q:"为什么专注期间不弹任务提醒？",a:"这是设计行为。专注期间系统会抑制所有任务提醒，避免打断你的专注。专注结束后会自动补弹被跳过的提醒。"},{q:"任务提醒不弹通知怎么办？",a:"首次使用时浏览器会请求通知权限，需要点击「允许」。如果之前拒绝了，可在浏览器地址栏左侧的设置图标中重新允许通知。另外，提醒需要任务设置了「到期日+具体时间（时分）」和「提醒选项」才会触发。"},{q:"自定义重复的间隔 0 和间隔 1 有什么区别？",a:"间隔 0 = 每个周期都重复（如每天都出现）。间隔 1 = 每隔 1 个周期（如第 1 周、第 3 周、第 5 周，跳过第 2、4 周）。间隔 N = 跳过 N 个周期后再重复。"},{q:"手账模式的周复盘和月度复盘在哪里编辑？",a:"周复盘在每周区块底部的文本框直接编辑（失焦自动保存）。月度复盘在右侧面板的「📋 月度复盘」文本框编辑。左侧编辑后右侧面板会自动刷新。"},{q:"自定义名言存在哪里？刷新会丢失吗？",a:"自定义名言存在数据库（pomoflow.db）中，刷新页面不会丢失。内置的 50 条名言是程序自带的。番茄钟页面的名言卡片优先轮播自定义名言（逐条不重复），轮完一轮后重新开始。"},{q:"切换页面后专注还在计时吗？自动休息还会触发吗？",a:"是的。计时器和所有自动逻辑（自动开始休息、自动开始下个番茄、专注完成通知）都在全局状态中，切到任务清单/统计/配置等页面不影响。专注到点会正常通知和衔接。"},{q:"主题背景上传的图片太大怎么办？",a:"上传图片会自动压缩（缩放到 1920px 宽、JPEG 0.8 质量），不会撑爆存储。如果图片仍然过大导致无法持久保存，会弹出提示告知你刷新后需重新设置。"},{q:"通知文案可以自定义吗？",a:"可以。进入「配置」→「通知文案」，选择风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），文案会自动填入。你可以手动修改每个场景的标题和正文。任务提醒正文支持用 {task_title} 作为任务名占位符，触发时自动替换。"},{q:"删除清单（项目）会删除里面的任务吗？",a:"删除清单后，归属该清单的任务会自动变为「无项目」状态，任务本身不会被删除。删除子清单同理，任务会上升到父清单。"},{q:"切换主题或上传背景图后，按钮和图表颜色会跟着变吗？",a:"会。8 种预设主题各自配有一套主色（accent），切换后按钮、导航指示条、计时器圆环、统计图表、输入框焦点光晕等全部跟随变化。上传自定义背景图时，主色自动回退为默认的柔雾番茄红。"},{q:"上传的背景图太鲜艳影响阅读怎么办？",a:"所有页面都有一层统一的半透明蒙层覆盖在背景图上，会自动淡化背景，保证文字与卡片清晰可读。如果仍觉得偏亮，可在「配置 → 主题背景」中换用更柔和的预设主题。"}]},contact:{intro:"如有商务合作或其他事项，可通过以下方式联系我们：",emailLabel:"邮箱：",phoneLabel:"电话：",workHoursLabel:"工作时间：",workHours:"周一至周五 7:00 - 08:50 | 18：30 - 22：00 ; 周末 07：00 - 22：00",feedbackTitle:"问题反馈 / 功能建议",feedbackDesc:"如果您在使用过程中遇到 Bug 或有功能建议，请发送邮件到以上邮箱，我们会及时跟进处理。",subjectLabel:"邮件主题格式：",subjectFormat:"PomoFlow-功能建议",subjectHint:"（可选：功能建议 / Bug 反馈 / 使用疑问）",bodyLabel:"邮件正文建议包含：",bodyItems:["问题或建议的详细描述","您的联系方式（邮箱 / QQ / 手机号），方便我们回复","遇到 Bug 时的操作步骤（便于我们复现）"],exampleLabel:"示例：",exampleText:`主题：PomoFlow-Bug 反馈

您好，我在创建任务时点击「重复」
选择「自定义」后弹窗没有出现。

联系方式：user@example.com`}}},Ev={page:{timer:"Timer - PomoFlow",tasks:"Tasks - PomoFlow",stats:"Stats - PomoFlow",settings:"Settings - PomoFlow"},nav:{timer:"Pomodoro",tasks:"Tasks",stats:"Stats",settings:"Settings",help:"Help & Feedback",mainNav:"Main navigation"},mode:{focus:"Focus",shortBreak:"Short Break",longBreak:"Long Break",focusing:"Focusing"},priority:{high:"High",medium:"Medium",low:"Low",none:"None"},common:{confirm:"OK",noData:"No tasks yet",reviewPlaceholder:"Write a review…",ariaCompleted:"Completed",ariaMarkDone:"Mark complete",ariaMarkUndone:"Mark as not done",loading:"Loading...",close:"Close",clear:"Clear",add:"Add",expand:"Expand",collapse:"Collapse"},timer:{start:"Start Focus",startBreak:"Start Break",pause:"Pause",resume:"Resume",stop:"Stop",abandon:"Abandon",skip:"Skip",starting:"Starting…",todayDone:"Today completed",pomodoroUnit:"pomodoros",pomodoros:"pomodoros",taskList:"Tasks",todayFocus:"Today's focus",minute:"min",selectTask:"Select a task",selectTaskPlaceholder:"-- Select a task --",modeTabsAria:"Timer mode",noSpecificTask:"No specific task",noTodoTask:"No active tasks",reviewTitle:"📝 Daily Review",reviewPlaceholder:"Write today’s review…",clearFilter:"Clear filters",startTooltip:"Start focus",mottoRefresh:"Next",modalTitle:"Notice",focusCompleteTitle:"Focus complete",noTask:"No tasks",expandSubtasks:"Expand subtasks",collapseSubtasks:"Collapse subtasks"},filter:{project:"Project",tag:"Tag",priority:"Priority",date:"Date",all:"All",allProject:"All projects",allTag:"All tags",allPriority:"All priorities",today:"Today",tomorrow:"Tomorrow",thisWeek:"This week",week:"This week",month:"This month",startDate:"Start date",endDate:"End date",dueDate:"Due date",start:"Start",end:"End",to:"to",export:"Export",projectAria:"Filter by project",tagAria:"Filter by tag",priorityAria:"Filter by priority"},export:{index:"No.",title:"Task",project:"Project",priority:"Priority",dueDate:"Due date",estimated:"Est. Pomodoros",tags:"Tags",subtasks:"Subtasks",status:"Status",statusActive:"Active",statusCompleted:"Completed",fileName:"Tasks"},task:{statEstimated:"Estimated time",statActive:"Active tasks",statFocused:"Time focused",statCompleted:"Tasks done",statCompletedPomo:"Pomodoros done",searchResult:"Search results",list:"List",task:"Tasks",noTask:"No tasks yet",noDate:"No date",unscheduled:"Unscheduled",minute:"min",startTooltip:"Start focus",detailPriority:"Priority",detailPomodoro:"Pomodoro",detailDueDate:"Due date",detailProject:"List",detailReminder:"Reminder",detailRepeat:"Repeat",detailNoTags:"No tags",detailEditTags:"Edit tags",detailCollapse:"Collapse",detailAddSubtask:"Add subtask...",subtaskEditPlaceholder:"Edit subtask...",editSubtask:"Edit subtask",deleteSubtask:"Delete subtask",detailAddNote:"Add note...",detailDelete:"Delete task",detailNoProject:"None",detailNoTagsAvailable:"No tags available",detailEmpty:"Click a task to view details",detailTimeFilled:"Filled the due time with the current time. Adjust in “Due date” if needed.",deleteConfirm:'Delete task "{title}"?',emptyAll:"No tasks yet — add one to get started",emptyFiltered:"No tasks match these filters",groupHeader:"{date} ({weekday}) | {n} min",detailPanelAria:"Task details",titleAria:"Title",detailDescription:"Description",detailDescPlaceholder:"Add details...",detailSubtasks:"Subtasks",newSubtaskAria:"New subtask",unknownProject:"Unknown",toggleSubtaskAria:"Toggle subtask completion",dblclickToEdit:"Double-click to edit",noTagsHint:"No tags yet — create them in Settings → Tags",tagPickerAria:"Tag multi-select",saveFailed:"Save failed: {err}",setTagsFailed:"Failed to set tags: {err}",addSubtaskFailed:"Failed to add subtask: {err}",updateSubtaskFailed:"Failed to update subtask: {err}",deleteSubtaskFailed:"Failed to delete subtask: {err}"},stats:{dimToday:"Today",dimWeek:"This week",dimMonth:"This month",dimQuarter:"Quarter",dimHalf:"Half-year",dimYear:"Year",focusDuration:"Focus time",sessions:"Pomodoros",completed:"Tasks done",avg:"Daily avg",activeDays:"Active days",longestStreak:"Longest streak",avgWeek:"Weekly avg",avgMonth:"Monthly avg",peakMonth:"Peak month",peakPeriod:"Peak period",bestProject:"Top project",momRatio:"vs last period",trendTitle:"Focus trend",projectDist:"Project distribution",noData:"No focus data for this range",noProject:"No project data",unitMin:"min",unitCount:"",unitDay:"d",byDay:"day",byWeek:"week",byMonth:"month",weeklyFocusTitle:"This week’s focus (min)",loading:"Loading stats...",loadError:"Failed to load stats: {err}",trendChartAria:"Focus trend bar chart",donutChartAria:"Project distribution donut chart"},enum:{reminder:{"":"No reminder",on_time:"On time","5m":"5 min before","30m":"30 min before","1h":"1 hour before","1d":"1 day before","2d":"2 days before"},repeat:{"":"No repeat",daily:"Daily",weekday:"Weekdays",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",custom:"Custom"},weekday:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},settings:{tab:{account:"Account",timer:"Pomodoro",lists:"Lists",tags:"Tags",theme:"Theme",motto:"Mottos",notification:"Notifications",language:"Language"},language:{title:"Interface Language",desc:"Choose the display language. All pages update instantly.",zh:"Chinese",en:"English"},timerTitle:"Pomodoro",timerParams:"Timer parameters",durationSetting:"Durations",behaviorSetting:"Behavior",focusDuration:"Focus duration",shortBreakDuration:"Short break",longBreakDuration:"Long break",longBreakInterval:"Long-break interval",longBreakIntervalEvery:"Long-break interval (every N focus sessions)",minute:"min",pomodoroUnit:"pomodoros",autoStartNext:"Auto-start next pomodoro",autoStartNextDesc:"Start the next pomodoro immediately after one ends",autoStartBreak:"Auto-start break",autoStartBreakDesc:"Enter break automatically after a pomodoro",autoEnterBreak:"Enter break automatically after focus ends",disableBreak:"Disable breaks",disableBreakDesc:"Skip all break periods when enabled",soundEnabled:"Completion sound",systemNotification:"System notifications",reset:"Reset to default",accountNotOpen:"This feature is not available yet",systemSection:"System",autostart:"Launch at startup",autostartHint:"Run PomoFlow automatically at OS startup (silent start, stays in tray)",on:"On",off:"Off",notifTest:"Notification test",notifTestHint:"Send a test notification to verify the system notification pipeline",sendTest:"Send test",trayHint:"💡 When you close the main window, PomoFlow stays in the system tray. Right-click the tray icon to show the window or quit.",autostartFail:"Failed to toggle autostart: {err}",notifPermDenied:"Notification permission not granted",notifSendFail:"Notification failed: {err}",testNotifTitle:"PomoFlow test notification",testNotifBody:"Active tasks: {n}",theme:{title:"Theme",desc:"Pick a preset above to set the accent color (buttons, progress ring, nav indicator). Pick a background below to independently override the background layer. The two are independent.",preset:"Preset themes",presetBg:"Preset backgrounds",presetBgHint:"Click any of the 8 boxes to switch the background. The accent color still comes from the chosen theme above.",presetBgName:{"preset-bg-1":"Preset 1","preset-bg-2":"Preset 2","preset-bg-3":"Preset 3","preset-bg-4":"Preset 4","preset-bg-5":"Preset 5","preset-bg-6":"Preset 6","preset-bg-7":"Preset 7","preset-bg-8":"Preset 8"},custom:"Custom background",upload:"Upload image",customUsed:"Using custom background",bgUsed:"Custom background active",presetBgUsed:"Preset background active",clearBg:"Remove background",customHint:"JPG/PNG supported; large images are auto-compressed. The uploaded image replaces the preset background; the accent color still comes from the chosen theme.",reset:"Reset to default",compressFail:"Image processing failed, please try another.",bgTooLarge:"The background image is too large to persist. It works this session, but you’ll need to reset it after refresh.",presetName:{default:"Default",sunny:"Sunny",ocean:"Ocean",forest:"Forest",dusk:"Dusk",lavender:"Lavender",evening:"Evening",teal:"Teal"}},motto:{title:"Mottos",addPlaceholder:"Enter a motto…",authorPlaceholder:"Author (optional)",addBtn:"Add",empty:"No custom mottos yet. The timer page will cycle through built-in mottos.",builtInBadge:"Built-in",defaultAuthor:"Custom",textRequired:"Please enter the motto text",textTooLong:"Motto text must be at most 500 characters",authorTooLong:"Author must be at most 64 characters"},notification:{title:"Notifications",styleLabel:"Style",styleHintCustom:"Custom style: fill in the texts below + a style description",styleHintPreset:'Preset style texts follow the interface language automatically. To customize, choose "Custom style".',styleDesc:"Style description",styleDescPlaceholder:"e.g. CEO style, artsy style…",focusEnd:"🍅 Focus ended",breakEnd:"☕ Break ended",reminder:"🔔 Task reminder",titleLabel:"Title",bodyLabel:"Body",placeholderHint:"Use {task_title} as the task name placeholder; auto-replaced on trigger",save:"Save",saved:"✓ Saved",styleName:{default:"Default",cute:"Cute",self_dep:"Self-deprecating",strive:"Strive",funny:"Funny",custom:"Custom"},fallback:{focusTitle:"Focus ended",focusBody:"A pomodoro just ended — take a short break.",breakTitle:"Break ended",breakBody:"Break over — back to focused work with fresh energy."}},repeatCustom:{title:"Custom repeat",startDate:"Start date",endDate:"End date",interval:"Interval (0–99)",type:"Repeat type",typeDay:"Day",typeWeek:"Week",typeMonth:"Month",typeYear:"Year",weekdays:"Repeat on weekdays (multi-select)",monthDays:"Repeat on days of month (multi-select)",weekShort:["M","T","W","T","F","S","S"],needPickWeek:"Please pick at least one weekday",needPickDay:"Please pick at least one date",cancel:"Cancel",confirm:"OK"},list:{title:"Lists",addRootPlaceholder:"Top-level list name",addRoot:"Add top-level list",addChild:"Add sub-list",edit:"Rename",del:"Delete",level2Placeholder:"Sub-list name",level3Placeholder:"Sub-list name",empty:"No lists yet",dragHint:"Hold and drag to reorder or change level",reorderFail:"Reorder failed, please try again",reorderFailDepth:"Target location exceeds max depth",reorderFailCycle:"Cannot move: would create a cycle"},tag:{namePlaceholder:"Enter tag name",add:"Add tag",colorLabel:"Color:",colorAria:"Color {color}",nameLabel:"Name",empty:"No tags yet, add one",dragHandle:"Drag to reorder"}},form:{placeholder:'Type a "task description" here to add a new task, press Enter to save',titlePlaceholder:"Task title...",pomodoroIcons:"Estimated pomodoros",pomodoroUnit:"pomodoros",more:"More",collapse:"Collapse",submit:"Add",estimatedPomo:"Est. pomodoros",needTitle:"Please enter a task title",needTimeForReminder:"A reminder needs a specific time (HH:MM) in the due date",addFailed:"Failed to add"},sidebar:{searchPlaceholder:"Search",searchTasksPlaceholder:"Search task titles...",planned:"Planned",completed:"Completed",journal:"Journal",emptyHint:"No lists yet, click + to add",addRootAria:"Add root list",addListTitle:"Add list",listNamePlaceholder:"List name...",moreActions:"More actions",deleteListConfirm:"Delete this list? Sub-lists will be deleted too"},journal:{monthTitle:"{month} {year}",yearOption:"{year}",monthOption:"{month}",prevMonth:"Previous month",nextMonth:"Next month",yearAria:"Year",monthAria:"Month",weekRange:"Week {n} ({ms}/{ds} – {me}/{de})",weekday:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],dailyReviewPlaceholder:"Daily review",weeklyReview:"📋 Weekly review",weeklyReviewPlaceholder:"This week's review"},monthPanel:{title:"{month}/{year} · Review",weeklyReadonly:"Weekly reviews (read-only · edited in each week block)",weekRange:"Week {n} (from {date})",empty:"(empty)",monthlyReview:"📋 Monthly review",monthlyPlaceholder:"Monthly summary…"},help:{tab:{manual:"User Manual",faq:"FAQ",contact:"Contact Us"},manual:{timer:{title:"🍅 Pomodoro",items:[{text:"Pick a task and click “Start” to begin a focus session. When focus ends, the app switches to break mode automatically."},{text:"Three modes: “Focus” (default 25 min, customizable) / “Short break” (default 5 min) / “Long break” (default 15 min, triggered every N pomodoros)."},{text:"When focus ends, a system notification + modal appears (you can customize the wording under Settings → Notifications)."},{text:"Enable “Auto-start break” and “Auto-start next pomodoro” so focus endings need no manual action."},{text:"Even if you switch pages after the timer finishes, notifications and auto-transitions still fire."},{text:"The right panel shows the current task list, filterable by project, tag, priority, and date."},{text:"Below the timer are a “Daily review” text box and a “Motto” card (click to get another)."}]},tasks:{title:"📋 Tasks",items:[{text:"Switch views from the left sidebar: Today / Tomorrow / This week / Planned / Completed / Journal."},{text:"The “Planned” view supports filtering by project, tag, priority, this week, this month, and due-date range."},{text:"Tasks support: title, note, priority (high/medium/low/none), due date (with time), estimated pomodoros, pomodoro duration, reminder, and repeat."},{text:"Lists (projects) support nesting (up to 3 levels) and custom colors. Tags support many-to-many with 12 preset colors."},{text:"Subtasks (checklist): each task can have multiple subtasks, each toggleable independently."},{text:"Click a task to open the right detail panel and edit title, due date, priority, reminder, repeat, tags, subtasks, and notes."}]},reminder:{title:"🔔 Reminders",items:[{text:"After setting a reminder, a browser notification fires at the reminder time (due date minus the lead time)."},{text:"Reminder options: On time / 5 min / 30 min / 1 hour / 1 day / 2 days before."},{text:"No reminders fire during focus; they are shown after focus ends (to avoid breaking focus)."},{text:"Each reminder fires only once — no repeat interruptions."},{text:"A reminder requires a due date with a specific time (HH:MM); otherwise you’ll be prompted to fill it in."}]},repeat:{title:"🔁 Repeat",items:[{text:"Built-in rules: Daily / Weekdays / Weekly / Monthly / Yearly. Setting one auto-generates repeat instances (up to 50)."},{text:"“Custom”: choose an interval (0–99) and a type (day/week/month/year).",sub:"Interval 0 = repeat every cycle; interval 1 = every other cycle (skip 1); interval N = every N cycles."},{text:"Type “Week” lets you pick weekdays (Mon–Sun, multi-select); type “Month” lets you pick days of the month (multi-select)."},{text:"When you change the repeat rule, old incomplete instances are deleted and regenerated under the new rule."},{text:"Each repeat instance fully copies the original task’s tags, subtasks, notes, priority, and pomodoro count."}]},journal:{title:"📔 Journal",items:[{text:"Monthly view, grouped by natural weeks (Mon–Sun); each week is laid out in a 3+3+1 row split."},{text:"Each day cell shows that day’s tasks (a square checkbox toggles completion) plus a daily-review text box."},{text:"Each week has a weekly-review box at the bottom. The right panel shows the month’s weekly reviews (read-only) + a monthly review (editable)."},{text:"Supports previous/next month and year/month dropdowns."},{text:"The “daily review” on the timer page syncs with the same day’s daily review in Journal mode."}]},stats:{title:"📊 Stats",items:[{text:"Six range filters: Today / This week / This month / Quarter / Half-year / Year."},{text:"Four common cards: focus time, pomodoros, tasks done, daily average."},{text:"Longer ranges unlock more highlights: active days, longest streak, weekly/monthly averages, peak period, top project, and period-over-period."},{text:"Trend bar chart (auto day/week/month granularity) + donut chart (project time distribution), all colored by the current theme accent — no more rainbow."}]},settings:{title:"⚙️ Settings",items:[{text:"“Pomodoro”: focus/break durations, long-break interval (2–6 pomodoros), and auto-start options."},{text:"“Lists”: add/rename/delete projects (3-level nesting), custom colors."},{text:"“Tags”: add/rename/delete tags, 12 preset colors."},{text:"“Theme”: 8 preset themes (Default/Sunny/Ocean/Forest/Dusk/Lavender/Evening/Teal), each with its own background gradient and matching accent; you can also upload a custom image (auto-compressed). All pages use a unified translucent veil to soften the background."},{text:"“Mottos”: manage custom mottos (stored in the database, cycled on the timer page)."},{text:"“Notifications”: 6 styles (Default/Cute/Self-deprecating/Strive/Funny/Custom), each configurable for focus-end/break-end/reminder title and body."}]}},faq:{items:[{q:"Where is my data stored? Can it be lost?",a:"All data (tasks, pomodoro records, reviews, mottos, notification wording, theme settings) is stored in a local SQLite database (pomoflow.db) and browser localStorage — no internet needed. When you upgrade, the database auto-migrates and old data is fully preserved. Back up pomoflow.db regularly."},{q:"How do I change the pomodoro duration and long-break interval?",a:"Go to Settings → Pomodoro and pick minutes from the Focus / Short break / Long break dropdowns (1–90 min). The long-break interval can be 2–6 pomodoros (i.e. a long break every N pomodoros)."},{q:"Why do task reminders not fire during focus?",a:"By design. During focus, all task reminders are suppressed so your focus isn’t interrupted. Skipped reminders are shown after focus ends."},{q:"What if task reminders don’t show a notification?",a:"On first use the browser asks for notification permission — click “Allow”. If you denied it, re-enable notifications via the settings icon on the left of the address bar. Also, a reminder only fires when the task has a due date with a specific time (HH:MM) and a reminder option set."},{q:"In custom repeat, what’s the difference between interval 0 and interval 1?",a:"Interval 0 = repeat every cycle (e.g. appears every day). Interval 1 = every other cycle (e.g. weeks 1, 3, 5, skipping 2 and 4). Interval N = skip N cycles, then repeat."},{q:"Where do I edit weekly and monthly reviews in Journal mode?",a:"Weekly reviews are edited in the text box at the bottom of each week block (auto-saved on blur). Monthly reviews are edited in the “📋 Monthly review” box on the right panel. Edits on the left refresh the right panel automatically."},{q:"Where are custom mottos stored? Lost on refresh?",a:"Custom mottos are stored in the database (pomoflow.db) and survive refreshes. The 50 built-in mottos ship with the app. The motto card on the timer page prefers custom mottos (cycling without repeats) and restarts after one full loop."},{q:"Does focus keep timing after I switch pages? Do auto-breaks still fire?",a:"Yes. The timer and all auto logic (auto-start break, auto-start next pomodoro, focus-end notification) live in global state, so switching to Tasks/Stats/Settings doesn’t affect them. Focus completions still notify and transition."},{q:"What if an uploaded background image is too large?",a:"Uploads are auto-compressed (scaled to 1920px wide, JPEG quality 0.8), so storage isn’t blown up. If an image is still too large to persist, a prompt tells you to reset after refresh."},{q:"Can notification wording be customized?",a:"Yes. Go to Settings → Notifications and pick a style (Default/Cute/Self-deprecating/Strive/Funny/Custom); the wording auto-fills. You can edit each scene’s title and body. The reminder body supports {task_title} as the task name placeholder, auto-replaced on trigger."},{q:"Does deleting a list (project) delete its tasks?",a:"No. Deleting a list sets its tasks to “no project”; the tasks themselves aren’t deleted. Deleting a sub-list works the same way — tasks move up to the parent list."},{q:"Do buttons and charts change color when I switch themes or upload a background?",a:"Yes. Each of the 8 preset themes has its own accent color; switching it updates buttons, the nav indicator, the timer ring, charts, and input focus glow. When you upload a custom background, the accent falls back to the default soft tomato."},{q:"What if an uploaded background is too vivid to read?",a:"Every page has a unified translucent veil over the background that softens it, keeping text and cards readable. If it still feels bright, switch to a softer preset theme under Settings → Theme."}]},contact:{intro:"For business cooperation or other matters, reach us via:",emailLabel:"Email: ",phoneLabel:"Phone: ",workHoursLabel:"Working hours: ",workHours:"Mon–Fri 7:00 - 08:50 | 18：30 - 22：00 ;  Weekend: 07:00 - 22:00",feedbackTitle:"Bug Reports / Feature Requests",feedbackDesc:"If you hit a bug or have a feature idea, email the address above and we’ll follow up.",subjectLabel:"Email subject format:",subjectFormat:"PomoFlow-Feature Request",subjectHint:"(Optional: Feature Request / Bug Report / Question)",bodyLabel:"Email body should include:",bodyItems:["Detailed description of the issue or suggestion","Your contact (email / QQ / phone) so we can reply","Steps to reproduce if it’s a bug"],exampleLabel:"Example:",exampleText:`Subject: PomoFlow-Bug Report

Hi, when creating a task I clicked “Repeat”
and chose “Custom” but the dialog didn’t appear.

Contact: user@example.com`}}},Av={zh:Cv,en:Ev},Ci="zh",fc="pomoflow-lang";function Nv(){if(typeof localStorage>"u")return Ci;try{const a=localStorage.getItem(fc);if(a==="en"||a==="zh")return a}catch{}return Ci}let To=z(ze(Nv()));function So(){return e(To)}function jv(a){if(v(To,a,!0),typeof localStorage<"u")try{localStorage.setItem(fc,a)}catch{}typeof document<"u"&&(document.documentElement.lang=a)}function bt(){return Av[e(To)]}function Ft(a,t){return Object.entries(t).reduce((n,[r,o])=>n.split(`{${r}}`).join(String(o)),a)}typeof document<"u"&&(document.documentElement.lang=e(To));const hc="pomoflow:settings:v2",Fv="pomoflow:settings:v1",lr={focusDuration:25,shortBreakDuration:5,longBreakDuration:15,longBreakInterval:4,autoStartNextPomodoro:!1,autoStartBreak:!1,disableBreak:!1,soundEnabled:!0,desktopNotificationEnabled:!0};function Iv(a){try{const t=JSON.parse(a),n={};return typeof t.focusMinutes=="number"&&(n.focusDuration=t.focusMinutes),typeof t.shortBreakMinutes=="number"&&(n.shortBreakDuration=t.shortBreakMinutes),typeof t.longBreakMinutes=="number"&&(n.longBreakDuration=t.longBreakMinutes),typeof t.longBreakInterval=="number"&&(n.longBreakInterval=t.longBreakInterval),typeof t.autoChain=="boolean"&&(n.autoStartBreak=t.autoChain),typeof t.soundEnabled=="boolean"&&(n.soundEnabled=t.soundEnabled),typeof t.desktopNotificationEnabled=="boolean"&&(n.desktopNotificationEnabled=t.desktopNotificationEnabled),Object.keys(n).length>0?n:null}catch{return null}}function _c(a){typeof localStorage>"u"||localStorage.setItem(hc,JSON.stringify(a))}function qv(){if(typeof localStorage>"u")return{...lr};const a=localStorage.getItem(hc);if(a)try{const n=JSON.parse(a);return{...lr,...n}}catch{return{...lr}}const t=localStorage.getItem(Fv);if(t){const n=Iv(t);if(n){const r={...lr,...n};return _c(r),r}}return{...lr}}let Jr=z(ze(qv()));function Xa(){return e(Jr)}function Ei(a){v(Jr,{...e(Jr),...a},!0),_c(e(Jr))}const Lv=[{key:"default",label:"默认"},{key:"cute",label:"卡哇伊"},{key:"self_dep",label:"自嘲"},{key:"strive",label:"奋斗"},{key:"funny",label:"搞笑"},{key:"custom",label:"自定义风格"}],pc={default:{style:"default",focus_end_title:"专注结束",focus_end_body:"番茄钟结束了，休息一下吧",break_end_title:"休息结束",break_end_body:"休息结束，满满的能量开启新的任务专注。",reminder_title:"PomoFlow 任务提醒",reminder_body:"任务「{task_title}」提醒时间已到"},cute:{style:"cute",focus_end_title:"专注完成啦~",focus_end_body:"你好棒呀！休息一下吧~ ✨",break_end_title:"休息结束啦~",break_end_body:"元气满满，继续加油鸭！✧",reminder_title:"该做任务啦~",reminder_body:"「{task_title}」的时间到啦，快去看看吧~ ♪"},self_dep:{style:"self_dep",focus_end_title:"又混过去一个",focus_end_body:"居然坚持下来了，不太像你啊…",break_end_title:"该干活了",break_end_body:"虽然我知道你不想，但还是开始吧…",reminder_title:"别装了",reminder_body:"「{task_title}」该做了，别再拖了"},strive:{style:"strive",focus_end_title:"专注完成！",focus_end_body:"又一个番茄被你征服！继续！",break_end_title:"休息结束！",break_end_body:"调整完毕，向下一个目标冲刺！",reminder_title:"时间到了！",reminder_body:"「{task_title}」——现在就是行动的时刻！"},funny:{style:"funny",focus_end_title:"终于停了！",focus_end_body:"番茄钟说：你该歇了，我也该歇了 😂",break_end_title:"歇够了？",break_end_body:"再不开始老板要扣工资了…你是自己的老板？那更得自律！🤣",reminder_title:"起来搬砖！",reminder_body:"「{task_title}」叫你回来干活了 🧱"},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}},gc={default:{style:"default",focus_end_title:"Focus Complete",focus_end_body:"Pomodoro finished. Take a break.",break_end_title:"Break Over",break_end_body:"Break ended — recharge and start your next focus.",reminder_title:"PomoFlow Task Reminder",reminder_body:'Task "{task_title}" reminder time has arrived'},cute:{style:"cute",focus_end_title:"Focus done~",focus_end_body:"Great job! Take a little break~ ✨",break_end_title:"Break over~",break_end_body:"Full of energy, keep it up!",reminder_title:"Time for a task~",reminder_body:'It’s time for "{task_title}", go check it~ ♪'},self_dep:{style:"self_dep",focus_end_title:"Another one down",focus_end_body:"You actually stuck with it — not very you…",break_end_title:"Back to work",break_end_body:"I know you don’t want to, but let’s begin…",reminder_title:"Stop pretending",reminder_body:'"{task_title}" is due — no more procrastinating'},strive:{style:"strive",focus_end_title:"Focus complete!",focus_end_body:"Another pomodoro conquered! Keep going!",break_end_title:"Break over!",break_end_body:"Recharged — sprint toward the next goal!",reminder_title:"Time’s up!",reminder_body:'"{task_title}" — act now!'},funny:{style:"funny",focus_end_title:"Finally stopped!",focus_end_body:"The pomodoro says: you should rest, so should I 😂",break_end_title:"Rested enough?",break_end_body:"If you don’t start now the boss will dock your pay… wait, you ARE the boss? Even more reason to be disciplined! 🤣",reminder_title:"Get back to work!",reminder_body:'"{task_title}" is calling you back to grind 🧱'},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}};function mc(a,t,n){const r=t==="en"?gc:pc;if(a==="custom"){const l=r.default;return{focus_end_title:(n==null?void 0:n.focus_end_title)||l.focus_end_title,focus_end_body:(n==null?void 0:n.focus_end_body)||l.focus_end_body,break_end_title:(n==null?void 0:n.break_end_title)||l.break_end_title,break_end_body:(n==null?void 0:n.break_end_body)||l.break_end_body,reminder_title:(n==null?void 0:n.reminder_title)||l.reminder_title,reminder_body:(n==null?void 0:n.reminder_body)||l.reminder_body}}const c=r[a||"default"]??r.default;return{focus_end_title:c.focus_end_title,focus_end_body:c.focus_end_body,break_end_title:c.break_end_title,break_end_body:c.break_end_body,reminder_title:c.reminder_title,reminder_body:c.reminder_body}}function $t(a,t,n,r){if(typeof t=="function"?a!==t||!r:!t.has(a))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(a):r?r.value:t.get(a)}function cr(a,t,n,r,o){if(typeof t=="function"?a!==t||!0:!t.has(a))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(a,n),n}var ln,va,Nn,Ur;const Ai="__TAURI_TO_IPC_KEY__";function Rv(a,t=!1){return window.__TAURI_INTERNALS__.transformCallback(a,t)}class Ov{constructor(t){ln.set(this,void 0),va.set(this,0),Nn.set(this,[]),Ur.set(this,void 0),cr(this,ln,t||(()=>{})),this.id=Rv(n=>{const r=n.index;if("end"in n){r==$t(this,va,"f")?this.cleanupCallback():cr(this,Ur,r);return}const o=n.message;if(r==$t(this,va,"f")){for($t(this,ln,"f").call(this,o),cr(this,va,$t(this,va,"f")+1);$t(this,va,"f")in $t(this,Nn,"f");){const c=$t(this,Nn,"f")[$t(this,va,"f")];$t(this,ln,"f").call(this,c),delete $t(this,Nn,"f")[$t(this,va,"f")],cr(this,va,$t(this,va,"f")+1)}$t(this,va,"f")===$t(this,Ur,"f")&&this.cleanupCallback()}else $t(this,Nn,"f")[r]=o})}cleanupCallback(){window.__TAURI_INTERNALS__.unregisterCallback(this.id)}set onmessage(t){cr(this,ln,t)}get onmessage(){return $t(this,ln,"f")}[(ln=new WeakMap,va=new WeakMap,Nn=new WeakMap,Ur=new WeakMap,Ai)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[Ai]()}}class Ni{constructor(t,n,r){this.plugin=t,this.event=n,this.channelId=r}async unregister(){return Ie(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}}async function bc(a,t,n){const r=new Ov(n);try{return await Ie(`plugin:${a}|register_listener`,{event:t,handler:r}),new Ni(a,t,r.id)}catch{return await Ie(`plugin:${a}|registerListener`,{event:t,handler:r}),new Ni(a,t,r.id)}}async function Ie(a,t={},n){return window.__TAURI_INTERNALS__.invoke(a,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const Mn=a=>Ie("list_tasks",{query:a}),ys=(a,t)=>Ie("upsert_task",{task:a,tagIds:t}),Bv=a=>Ie("delete_task",{id:a}),yc=a=>Ie("complete_task",{id:a}),kc=a=>Ie("reopen_task",{id:a}),Vs=()=>Ie("list_projects"),co=a=>Ie("upsert_project",{project:a}),wc=a=>Ie("delete_project",{id:a}),zv=a=>Ie("reorder_projects",{items:a}),Xs=()=>Ie("list_tags"),ji=a=>Ie("upsert_tag",{tag:a}),Hv=a=>Ie("delete_tag",{id:a}),Uv=a=>Ie("reorder_tags",{items:a}),Wv=a=>Ie("list_tags_for_task",{taskId:a}),Yv=(a,t)=>Ie("set_tags_for_task",{taskId:a,tagIds:t}),Kv=(a,t,n)=>Ie("start_pomodoro",{taskId:a,projectId:t,duration:n}),xc=(a,t)=>Ie("stop_pomodoro",{sessionId:a,isCompleted:t}),Fi=a=>Ie("get_daily_review",{date:a}),Tc=a=>Ie("upsert_daily_review",{review:a}),Gv=(a,t)=>Ie("list_daily_reviews",{startDate:a,endDate:t}),Sc=a=>Ie("delete_daily_review",{date:a}),Vv=a=>Ie("upsert_weekly_review",{review:a}),Dc=(a,t)=>Ie("list_weekly_reviews",{year:a,month:t}),Xv=a=>Ie("delete_weekly_review",{weekStart:a}),$v=a=>Ie("get_monthly_review",{yearMonth:a}),Jv=a=>Ie("upsert_monthly_review",{review:a}),Qv=a=>Ie("delete_monthly_review",{yearMonth:a}),Pc=a=>Ie("list_subtasks_for_task",{taskId:a}),ks=a=>Ie("upsert_subtask",{subtask:a}),Zv=a=>Ie("delete_subtask",{id:a}),Mc=()=>Ie("list_mottos"),ef=a=>Ie("upsert_motto",{motto:a}),tf=a=>Ie("delete_motto",{id:a}),Cc=()=>Ie("get_notification_template"),af=a=>Ie("upsert_notification_template",{template:a}),nf=(a,t)=>Ie("today_completed_minutes",{startMs:a,endMs:t}),Ii=(a,t,n,r)=>Ie("stats_range",{startDate:a,endDate:t,group:n,tzOffsetMin:r}),rf=(a,t,n,r)=>Ie("stats_overview",{today:a,weekStart:t,monthStart:n,tzOffsetMin:r}),of=(a,t,n,r)=>Ie("export_tasks_xlsx",{path:a,sheetName:t,headers:n,rows:r});var ws;(function(a){a.Year="year",a.Month="month",a.TwoWeeks="twoWeeks",a.Week="week",a.Day="day",a.Hour="hour",a.Minute="minute",a.Second="second"})(ws||(ws={}));class sf{static at(t,n=!1,r=!1){return{at:{date:t,repeating:n,allowWhileIdle:r},interval:void 0,every:void 0}}static interval(t,n=!1){return{at:void 0,interval:{interval:t,allowWhileIdle:n},every:void 0}}static every(t,n,r=!1){return{at:void 0,interval:void 0,every:{interval:t,count:n,allowWhileIdle:r}}}}var xs;(function(a){a[a.None=0]="None",a[a.Min=1]="Min",a[a.Low=2]="Low",a[a.Default=3]="Default",a[a.High=4]="High"})(xs||(xs={}));var Ts;(function(a){a[a.Secret=-1]="Secret",a[a.Private=0]="Private",a[a.Public=1]="Public"})(Ts||(Ts={}));async function Do(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await Ie("plugin:notification|is_permission_granted")}async function Po(){return await window.Notification.requestPermission()}function Mo(a){typeof a=="string"?new window.Notification(a):new window.Notification(a.title,a)}async function lf(a){await Ie("plugin:notification|register_action_types",{types:a})}async function cf(){return await Ie("plugin:notification|get_pending")}async function df(a){await Ie("plugin:notification|cancel",{notifications:a})}async function uf(){await Ie("plugin:notification|cancel")}async function vf(){return await Ie("plugin:notification|get_active")}async function ff(a){await Ie("plugin:notification|remove_active",{notifications:a})}async function hf(){await Ie("plugin:notification|remove_active")}async function _f(a){await Ie("plugin:notification|create_channel",{...a})}async function pf(a){await Ie("plugin:notification|delete_channel",{id:a})}async function gf(){return await Ie("plugin:notification|listChannels")}async function mf(a){return await bc("notification","notification",a)}async function bf(a){return await bc("notification","actionPerformed",a)}const yf=Object.freeze(Object.defineProperty({__proto__:null,get Importance(){return xs},Schedule:sf,get ScheduleEvery(){return ws},get Visibility(){return Ts},active:vf,cancel:df,cancelAll:uf,channels:gf,createChannel:_f,isPermissionGranted:Do,onAction:bf,onNotificationReceived:mf,pending:cf,registerActionTypes:lf,removeActive:ff,removeAllActive:hf,removeChannel:pf,requestPermission:Po,sendNotification:Mo},Symbol.toStringTag,{value:"Module"})),Ec="pomoflow-focus-count";let Ce=ze({mode:"focus",secondsLeft:Xa().focusDuration*60,running:!1,sessionId:null,activeTask:null,focusCompletedCount:kf(),pendingCompletionMessage:null,todayCount:0,todayMinutes:0}),Co=0,Eo=0,Ss=new Date().toDateString(),wr=!1,fa=null;function kf(){try{return parseInt(localStorage.getItem(Ec)||"0",10)||0}catch{return 0}}function $s(){return Ce}function wf(){return fa}async function Ac(){try{fa=await Cc()}catch{}}function xf(){var a;return((a=Ce.activeTask)==null?void 0:a.pomodoro_duration)??Xa().focusDuration}function Lr(a){const t=Xa();return a==="focus"?xf()*60:a==="short_break"?t.shortBreakDuration*60:t.longBreakDuration*60}function Ao(){!Ce.running&&Ce.sessionId===null&&(Ce.secondsLeft=Lr(Ce.mode))}async function $n(a,t,n){const r=n??Math.floor(Lr(Ce.mode)/60),o=await Kv(a,t,r);Ce.sessionId=o.id,n!==void 0&&(Ce.secondsLeft=n*60),Co=Date.now(),Eo=Ce.secondsLeft,Ce.running=!0,wr=!1}async function Tf(a){Ce.sessionId!==null&&await Js(!1),Ce.activeTask=a,Ce.mode="focus",Ao(),await $n(a.id,a.project_id??null,a.pomodoro_duration??void 0)}async function Sf(a){Ce.activeTask=a,!Ce.running&&(Ce.sessionId!==null&&await Js(!1),Ce.mode="focus",Ao(),await $n(a.id,a.project_id??null,a.pomodoro_duration??void 0))}function Wo(){Ce.running&&(Ce.running=!1)}function Yo(){Ce.running||Ce.sessionId===null||(Co=Date.now(),Eo=Ce.secondsLeft,Ce.running=!0)}async function Js(a){const t=Ce.sessionId;if(Ce.running=!1,Ce.sessionId=null,t!==null)try{await xc(t,a)}catch(n){console.warn("stop pomodoro failed",n)}Ce.secondsLeft=Lr(Ce.mode)}function uo(a){Ce.mode=a,Ce.running=!1,Ce.sessionId=null,Ce.secondsLeft=Lr(a)}function Df(){if(!Ce.running)return;const a=Math.floor((Date.now()-Co)/1e3),t=Math.max(0,Eo-a);if(t<=0){Ce.secondsLeft=0,Ce.running=!1,Ce.sessionId!==null&&!wr&&(wr=!0,Nc());return}Ce.secondsLeft=t}function Pf(){if(!Ce.running)return;const a=Math.floor((Date.now()-Co)/1e3),t=Math.max(0,Eo-a);t<=0?(Ce.secondsLeft=0,Ce.running=!1,Ce.sessionId!==null&&!wr&&(wr=!0,Nc())):Ce.secondsLeft=t}function Mf(){Ce.pendingCompletionMessage=null}function qi(a){Ce.activeTask=a,Ao()}function Cf(){Ao()}function Ef(a){const t=new Date().toDateString();t!==Ss?(Ss=t,Ce.todayCount=1,Ce.todayMinutes=a):(Ce.todayCount+=1,Ce.todayMinutes+=a)}function Af(a,t){Ce.todayCount=a,Ce.todayMinutes=t,Ss=new Date().toDateString()}async function Ko(){try{const a=new Date,t=a.getDay(),n=new Date(a);n.setDate(a.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0);const r=new Date(a.getFullYear(),a.getMonth(),1),o=l=>`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,c=await rf(o(a),o(n),o(r),-a.getTimezoneOffset());Af(c.today_sessions,c.today_minutes)}catch(a){console.warn("sync today stats",a)}}let Li=!1;function Nf(){if(Li||typeof window>"u")return;Li=!0,Ko(),document.addEventListener("visibilitychange",()=>{document.hidden||Ko()});let a=new Date().toDateString();window.setInterval(()=>{const t=new Date().toDateString();t!==a&&(a=t,Ko())},6e4)}function jf(a){const t=new Date;t.setHours(0,0,0,0);const n=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0,23,59,59,999),o={high:0,medium:1,low:2,none:3},c=a.filter(l=>{if(l.status!=="active"||!l.due_date)return!1;const i=new Date(l.due_date);if(isNaN(i.getTime())||i<n||i>r)return!1;const u=new Date(i);return u.setHours(0,0,0,0),u.getTime()<=t.getTime()});return c.sort((l,i)=>{const u=o[l.priority??"none"]??3,f=o[i.priority??"none"]??3;return u!==f?u-f:new Date(l.created_at??0).getTime()-new Date(i.created_at??0).getTime()}),c[0]??null}async function Ff(a,t){if(Xa().desktopNotificationEnabled)try{let n=await Do();if(n||(n=await Po()==="granted"),!n)return;Mo({title:a,body:t})}catch(n){console.warn("notification failed",n)}}async function Nc(){const a=Ce.mode,t=Math.floor(Lr(a)/60),n=Ce.activeTask,r=So(),o=fa?{focus_end_title:fa.focus_end_title??void 0,focus_end_body:fa.focus_end_body??void 0,break_end_title:fa.break_end_title??void 0,break_end_body:fa.break_end_body??void 0,reminder_title:fa.reminder_title??void 0,reminder_body:fa.reminder_body??void 0}:null,c=mc(fa==null?void 0:fa.style,r,o),l=a==="focus"?c.focus_end_title:c.break_end_title,i=a==="focus"?c.focus_end_body:c.break_end_body;await Ff(l,i),Ce.pendingCompletionMessage=i;const u=Ce.sessionId;if(Ce.running=!1,Ce.sessionId=null,u!==null)try{await xc(u,!0)}catch(h){console.warn("stop pomodoro failed",h)}const f=Xa();if(a==="focus"){Ce.focusCompletedCount+=1;try{localStorage.setItem(Ec,String(Ce.focusCompletedCount))}catch{}Ef(t);let h=[];try{h=await Mn({status:null,limit:null})}catch(w){console.warn("refresh tasks failed",w)}const y=n?h.find(w=>w.id===n.id)??null:null;if(!f.disableBreak&&f.autoStartBreak){const T=Ce.focusCompletedCount%f.longBreakInterval===0,M=T?"long_break":"short_break",D=T?f.longBreakDuration:f.shortBreakDuration;uo(M),await $n(null,(y==null?void 0:y.project_id)??(n==null?void 0:n.project_id)??null,D);return}await Ri(h,y,f.autoStartNextPomodoro);return}let _=[];try{_=await Mn({status:null,limit:null})}catch(h){console.warn("refresh tasks failed",h)}const m=n?_.find(h=>h.id===n.id)??null:null;await Ri(_,m,f.autoStartNextPomodoro)}async function Ri(a,t,n){if(t!==null&&t.status==="active"&&(t.completed_pomodoros??0)<(t.estimated_pomodoros??0)&&t){uo("focus"),Ce.activeTask=t,n&&await $n(t.id,t.project_id??null,t.pomodoro_duration??void 0);return}t&&t.status==="completed"&&(Ce.activeTask=null);const o=jf(a);Ce.activeTask=o,uo("focus"),o&&n&&await $n(o.id,o.project_id??null,o.pomodoro_duration??void 0)}const jc="pomoflow-fired-reminders",If=3e4,qf=10080*60*1e3,Lf={on_time:0,minutes5:5*6e4,minutes30:30*6e4,hour1:60*6e4,day1:1440*6e4,days2:2880*6e4};function Rf(){try{const a=localStorage.getItem(jc);return a?JSON.parse(a):{}}catch{return{}}}function Of(a){try{localStorage.setItem(jc,JSON.stringify(a))}catch{}}function Fc(){const a=$s();return a.running&&a.mode==="focus"}async function Bf(a){const t=wf(),n=So(),r=t?{reminder_title:t.reminder_title??void 0,reminder_body:t.reminder_body??void 0}:null,o=mc(t==null?void 0:t.style,n,r),c=o.reminder_body.replace(/\{task_title\}/g,a.title);try{let l=await Do();if(l||(l=await Po()==="granted"),!l)return;Mo({title:o.reminder_title,body:c})}catch(l){console.warn("reminder notification failed",l)}}async function zf(){const a=Date.now(),t=Rf();let n=!1,r=[];try{r=await Mn({status:"active",limit:null})}catch{return}const o=Fc();for(const l of r){if(l.status!=="active"||!l.reminder||l.reminder==="none"||!l.due_date)continue;const i=Lf[l.reminder];if(i===void 0)continue;const u=new Date(l.due_date).getTime();if(Number.isNaN(u))continue;const f=u-i;if(f>a)continue;const _=`${l.id}:${f}`;t[_]||o||(t[_]=f,n=!0,await Bf(l))}const c=a-qf;for(const l of Object.keys(t))t[l]<c&&(delete t[l],n=!0);n&&Of(t)}let Oi=!1,Bi=!1,Go=!1;async function Qr(){if(!Go){Go=!0;try{await zf()}finally{Go=!1}}}function Hf(){Qr()}function Uf(){Oi||typeof window>"u"||(Oi=!0,Qr(),window.setInterval(()=>void Qr(),If),window.setInterval(()=>{const a=Fc();Bi&&!a&&Qr(),Bi=a},1e3))}const Wf="/assets/preset-1-CBSgnW-Q.jpg",Yf="/assets/preset-2-DV_n3pDN.jpg",Kf="/assets/preset-3-q3qAbjR3.jpg",Gf="/assets/preset-4-B_bSN4WY.jpg",Vf="/assets/preset-5-C1j6rp_Z.jpg",Xf="/assets/preset-6-_4eNaNuV.jpg",$f="/assets/preset-7-D1OhqFGY.jpg",Jf="/assets/preset-8-oFCsPykG.jpg",vo=[{id:"preset-bg-1",url:`url(${Wf})`},{id:"preset-bg-2",url:`url(${Yf})`},{id:"preset-bg-3",url:`url(${Kf})`},{id:"preset-bg-4",url:`url(${Gf})`},{id:"preset-bg-5",url:`url(${Vf})`},{id:"preset-bg-6",url:`url(${Xf})`},{id:"preset-bg-7",url:`url(${$f})`},{id:"preset-bg-8",url:`url(${Jf})`}],Qf=vo.map(a=>a.id);function Zf(a){return Qf.includes(a)}function eh(a){var t;return((t=vo.find(n=>n.id===a))==null?void 0:t.url)??""}const Ic=[{id:"default",name:"默认",preview:"linear-gradient(160deg, #faf8f5, #ede4d8)"},{id:"sunny",name:"暖阳",preview:"linear-gradient(160deg, #fffbf5, #fde4c2)"},{id:"ocean",name:"海洋",preview:"linear-gradient(160deg, #f2f7fb, #c8dcf0)"},{id:"forest",name:"森林",preview:"linear-gradient(160deg, #f3f7f1, #cde0c6)"},{id:"dusk",name:"黄昏",preview:"linear-gradient(160deg, #fdf7f1, #edd0bc)"},{id:"lavender",name:"薰衣草",preview:"linear-gradient(160deg, #f8f5fb, #dcc8ed)"},{id:"evening",name:"暮色",preview:"linear-gradient(160deg, #f6f3f0, #d8cbbe)"},{id:"teal",name:"青石",preview:"linear-gradient(160deg, #f3f7f6, #c4dad5)"}],th=Ic.map(a=>a.id);function ah(a){return th.includes(a)}const qc="pomoflow-theme",Qs="preset-bg-1";function Vo(){return{theme:"default",background:{kind:"preset",id:Qs}}}function nh(a){return a?a.kind==="preset"?`preset:${a.id}`:a.url:""}function rh(){if(typeof localStorage>"u")return Vo();try{const a=localStorage.getItem(qc);if(!a||!a.startsWith("{"))return Vo();const t=JSON.parse(a),n=typeof t.theme=="string"&&ah(t.theme)?t.theme:"default",r=typeof t.background=="string"?t.background:"";if(r.startsWith("preset:")){const o=r.slice(7);if(Zf(o))return{theme:n,background:{kind:"preset",id:o}}}return r.startsWith("url(")?{theme:n,background:{kind:"custom",url:r}}:{theme:n,background:{kind:"preset",id:Qs}}}catch{return Vo()}}function Rr(a){if(!(typeof localStorage>"u"))try{localStorage.setItem(qc,JSON.stringify({theme:a.theme,background:nh(a.background)}))}catch{}}function oh(a){return a?a.kind==="preset"?eh(a.id):a.url:null}let Ga=z("default"),Va=z(null);function nr(){if(typeof document>"u")return;const a=document.documentElement;a.setAttribute("data-theme",e(Ga));const t=oh(e(Va));t?a.style.setProperty("--bg-page",t):a.style.removeProperty("--bg-page")}function sh(){const a=rh();v(Ga,a.theme,!0),v(Va,a.background,!0),nr()}function ih(){return e(Ga)}function lh(){return e(Va)}function ch(a){v(Ga,a,!0),Rr({theme:a,background:e(Va)}),nr()}function dh(a){const t={kind:"preset",id:a};v(Va,t,!0),Rr({theme:e(Ga),background:t}),nr()}function uh(a){if(!a.startsWith("url("))return;const t={kind:"custom",url:a};v(Va,t,!0),Rr({theme:e(Ga),background:t}),nr()}function Xo(){v(Va,null),Rr({theme:e(Ga),background:null}),nr()}function $o(){v(Ga,"default"),v(Va,{kind:"preset",id:Qs},!0),Rr({theme:e(Ga),background:e(Va)}),nr()}function vh(a){return new Promise(t=>{const n=new FileReader;n.onerror=()=>t(null),n.onload=()=>{const r=new Image;r.onerror=()=>t(null),r.onload=()=>{try{const c=Math.min(1,1920/Math.max(r.width,r.height)),l=Math.max(1,Math.round(r.width*c)),i=Math.max(1,Math.round(r.height*c)),u=document.createElement("canvas");u.width=l,u.height=i;const f=u.getContext("2d");if(!f)return t(null);f.drawImage(r,0,0,l,i),t(`url(${u.toDataURL("image/jpeg",.8)})`)}catch{t(null)}},r.src=String(n.result)},n.readAsDataURL(a)})}const fh="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAoJSURBVHhe7d09VOJYGwfwLbe0nO61nLOvQBACAcGA8hG2eaec0tLS0tLOckpLyyktLSneURzHEb/R0ZnANpSWlNnzJAThIYOQ3OQ+wfs/5zl7zp6zZ2f8/ZPc3BD84483FL2clfRqugDzOGEeylkJ/7ciIYmupRRdy3zUq5mdX5py8LOiNH5VFWN4fk6YJzzlVOupnD58LKd3nsrpDSiIrqp/4v+vCKdYRzRgZ+q6ljGGB8PPjF9Jj8zj6DQfy+lP95XUB1GIAKNX04u6pmy1tUy9jcADxB/Mj/48VNKNx3Jq976SeY//zCIeA0eYXk1vtLXMIaDbg9F54eO5L6WarZK8eaPK7/DfRWSGwPW8rWX225ryPAxPGf+hnBqZ+5L8GS4T+O8mMiFwXe/UrFO802B0qvhmAeyBs0JZ3sB/V5Gh6LXMh46mNDu1cfRQ448UQdZFEVD0vxWtU1NaAD/X+P1plVPGXUnW78rpj/hn8aai/y2/62jKgQ3/VvCH564k1+8ribd356Brme1OTem9ZfxWSX6Z9eRuU40t4J/T3EXXVpROLTs43Qt8a+7MSXZv1+b4jsE66rMj8ALfxh+a9eTeXO0u6v9TFzpa9lDgT4H/UoLm1TysDcxTvpbtCvwZ8PtzW5Kfr9eS4b1T0GvZTQte4LvAH8zNenIP/2zJp1PL7Ah87/jmrCdh9kOzLvinltkX+EzxrVlLHJIuAfzhOlr2QOD7gL+ehEuBcb2WaJLcLzDxa9m6wPcP3x6SJXi5zRP4fuIPl4DM5UBc84PFNwtglYD/msDP1b5fweihxLcKYFwXE/vYJLD4fZ9PNWTwB7O8i218j15dKfiJD6f3MIQ/fsK4WksYl2vLwX3IxHqO7//2bpjCE79fgN6VGtCzg5fbPf/ww1YACMbG4xf+oATFeMv3ReHLos9f/DAWAILRg8K/Ki4bl8Vl46oY929R+HLd9x8/rAWA8MK3p6n6sB7o7/QF+kmeMIcXPsxFMd5l/lKKdeoPDj/sBYDwwB8ado+Q4X08Hh/gnIdwwjcu4J/qsoItXYXXR7fnIbzw+9PEljPHfFuHA/68FADCCd+cphrbwqYzhecbO27DYm+fZXjhXxTixkVB6rreGxg++jG63/jwJM9tvOIPb++yCD98a1yfBXi/qOk2GN4tPssSYPig8M0CFKRufdazgH30Y/Sg8FkWAIPPgj+8oeMl/PD7M+tZAI5+jB4kPqsCYHC3+CwLEDj+rGcBeF0boweND5/acRs/8L2WgC/+jGeBdlX5jOGDxvdaAAzOAt9rAbjiF+LGeUFqYeuxwHt8bU3p8cb3UgAMzgrfSwH441vTVGOTvwRTryqbFPD9KIBXfNjV8xLe+P35hM1H0q5mGhTwWReABb49bkMAHy4DXWw+iF7JvKeCz7IAAn90vqtxDdubaVeVXSr4sJvnNn7hsygAf3zJ+L4qOX9qqN2/98foPPBZFIA1Pmzpug0ZfFUyzlalZ2zfX/2Po/PC91oAP/C9FIAKvj1f8d0AbP1idJ74XgpADR9CCR/mFG8K/aplPmF4nvjMCkAAH0IJ/0yVjG+r0sFoATSlSQmfSQEE/tgAfr8AL+sAuP5Tw4ftXLdhhc8q1PDtGawD+r9mhRS+pwJ4wPcjFPFhTtW49Q1ksP1LDd9LASiFKr51GYhbbxXbC0AMzxN/XgqAwangWwXoLwR/aZlDDM8bfx4KgMFJ4cMlYLX/ePhnRdGp4cNmTpiDwanh22O+80cRf14LQAnfKkA1vUgRP6wFwOCU8b+txgzzFpAifhgLgMGp41sFqKYLFPHDVgAMHgb8QQEwOAX8sBSA8n3+a/hmAZ6q6Q2MTgGfegGobu/Ogn86qQC88WE/n1qoPdLF4LPi9wugbFLE91IApwc7w4Nf0yLx0oYDut/4jmcAKvjMCiDwf4s/VgBK+EwKIPAn4psFeKwoGkV8eIzrNgJ/OnyrANV0gSK+pwII/KnwvzoWgAg+qwJgdIH/gm8WAJ4FUMRnUQCMLvBH8a0CqOoCRXz4qJbbCPxxdCd8swCQx3K6Sw3fSwEwusB3xh8U4KmSblDDZ10AgT8+J/mY9abwz0p6jxo+ywIIfOc5yUcOzQL8qKS2MDpvfFYFEPjOc5KPGl9zUevLIh4rsobheeOzKIDAdx7AhznORzfNAsDvAKKG77UAAt95bHyYxkqsYBbAuhNI6ZTwvRRA4DvPMP5JLtqrq/95+d7Ax0pqnxK+l9e0BP74jOBbUx/gQx7K6Q2MzhPfUwEE/mv4RiMf2RkpQKuaXsTwPPFZFUDgO+Gj67+dH+WUTgWfRQEE/m/w8fV/UIBKap8KPuznu43An4Bv3f6NXv/twKNhKvheCiDwf4/fL4B1/++Uh5KsU8BnVgAH8LeMb53+YwvYfZCHsrxDAZ9JARzA3zS++e8in7H5SO4rifcU8GE3z20EvjM+zFFu6QM2H8tDWW5g8KDxPRXAAVzgR43jXLTruPrHaZXkTYweNL6XAmBwgd8f++nfa4Evjbgvp7o88cUjXeb4va/qX9P/Qun7UmpL4I+jhxLfvPZPefTbGT4LCPxw4x+vzHj024GzgMAPOX7OxdFvB84CrXKqK/DDi+/66LdzV5K3BX5I8b0c/XbgLHC3LrcEfgjxV+C+f8K277S5WZc1gR8ufJgv+cgGtnSdVil5gLHxCHw6+Me5aAMbesqNKr+7LSV7GF3gk8Q3vmT/mvwbQt3krpTcwvACnx7+cS5ifQ28H7lDlwKBTw1/qTHVAx+3aaqxhdtSUhf4BPFXlp4bamwRmzHPXSml3JSSPYFPCD8Xme5ZP6tcl5JbAp8UvrcNHze5LSUPBT5/fN+v+78L7BLeriXrAp8nfqTJZLfPbcxF4VqiidEFvv/4R7klPZBF32uBTaKb9aQu8IPDD2zFP21aanrxej3RFfjB4Puy0+c1UAI4Ewh858Hwc4VvB9YEV2uJpsBnjw/X/KPM0nv8MycXKMF1MXEo8Nnhw2qf1DX/tcAt4lVx+bPAZ4PP9VbPSy6KiW2B7x6/kYvscdnkYZlLdVm5LMa7GFzgT8BfWXo+yv3X+vXu8xBYF1wWlw8xvMB3wM9FmqFY7LnJhSptXxTjPYHvjA8PdUJ/yn8tTTW2CGcDgT8yjf+vRBT8s5rrNNXEh4tivPum8Vciz1+yE76yZd4Dt4uXhfjuW8S3Vvghvb1jHXigdFGIf2oWpB6Gn0P8/VBt6gSZr6r87hwVAaOHGF/ATxu7COcFqYvhQ4WfizwLeI/5rsa180J8/7wg9UKEf3CUi36c+1u6IFNX1T/P1NjG91XpgCL+cT7agC9h9PQ6tsj0+abGCt/U2M7ZqlTH8EHgN/LRxkkusnuci2riSCcQKMSZKm2frUp7p6tS/XRVemaCn4/14Pv1T+Bano/swDdtzwv4v9/jPPxLl7FMAAAAAElFTkSuQmCC",hh=ze({project:null,tag:null,priority:null,date:null});var _h=E('<textarea class="review-textarea svelte-1na66lg"></textarea>');function fo(a,t){_t(t,!0);const n=j(bt);let r=ma(t,"rows",3,2),o=z(ze(Vt(()=>t.value??"")));Pt(()=>{const i=t.value??"";Vt(()=>{i!==e(o)&&v(o,i,!0)})});function c(){const i=e(o).trim();i===""?t.value&&t.onDelete&&t.onDelete():i!==(t.value??"")&&t.onSave(i)}var l=_h();C(()=>{I(l,"placeholder",t.placeholder??e(n).common.reviewPlaceholder),I(l,"aria-label",t.ariaLabel??t.placeholder??e(n).common.reviewPlaceholder),I(l,"rows",r())}),Dt("blur",l,c),kt(l,()=>e(o),i=>v(o,i)),g(a,l),pt()}const zi=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function Hi(){return zi[Math.floor(Math.random()*zi.length)]}const Lc=ze({n:0});function Ui(){Lc.n+=1}var ph=E('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985"><!></button></div></div>');function gh(a,t){_t(t,!0);const n=j(bt);let r=z(ze([])),o=z(ze(new Set)),c=z(null);async function l(){try{v(r,await Mc(),!0)}catch{v(r,[],!0)}}on(()=>{l()}),Pt(()=>{Lc.n,l()}),Pt(()=>{var m;if(!e(c))if(e(r).length>0){const h=e(r)[0];v(c,{text:h.text,author:(m=h.author)!=null&&m.trim()?h.author:e(n).settings.motto.defaultAuthor},!0);const y=new Set(e(o));y.add(h.id),v(o,y,!0)}else v(c,Hi(),!0)});function i(){var m;if(e(r).length>0){let h=e(r).filter(T=>!e(o).has(T.id));h.length===0&&(v(o,new Set,!0),h=e(r));const y=h[0];v(c,{text:y.text,author:(m=y.author)!=null&&m.trim()?y.author:e(n).settings.motto.defaultAuthor},!0);const w=new Set(e(o));w.add(y.id),v(o,w,!0)}else v(c,Hi(),!0)}var u=qe(),f=Ae(u);{var _=m=>{var h=ph(),y=s(h),w=s(y),T=s(w);dc(T,{size:20});var M=d(w,2),D=s(M),A=s(D),x=d(D,2),L=s(x),k=d(M,2),P=s(k);vv(P,{size:14}),C(()=>{p(A,e(c).text),p(L,`—— ${e(c).author??""}`),I(k,"aria-label",e(n).timer.mottoRefresh),I(k,"title",e(n).timer.mottoRefresh)}),W("click",k,i),g(m,h)};se(f,m=>{e(c)&&m(_)})}g(a,u),pt()}xt(["click"]);var mh=E('<div class="empty svelte-1qmsx7e"> </div>'),bh=E('<button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-main svelte-1qmsx7e"><span class="item-title svelte-1qmsx7e"> </span> <span class="item-sub svelte-1qmsx7e"> </span></span> <span class="pri-dot svelte-1qmsx7e"></span></button>'),yh=E('<button type="button" class="backdrop svelte-1qmsx7e" aria-hidden="true" tabindex="-1"></button> <div class="menu svelte-1qmsx7e" role="listbox"><button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-title svelte-1qmsx7e"> </span></button> <!> <!></div>',1),kh=E('<div class="selector svelte-1qmsx7e"><button type="button" class="trigger svelte-1qmsx7e" aria-haspopup="listbox"><span class="trigger-label svelte-1qmsx7e"> </span> <!></button> <!></div>');function wh(a,t){_t(t,!0);const n=j(bt);let r=z(!1);const o={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};function c(y){t.onSelect(y),v(r,!1)}var l=kh(),i=s(l),u=s(i),f=s(u),_=d(u,2);{let y=j(()=>"chev"+(e(r)?" open":""));Gn(_,{size:16,get class(){return e(y)}})}var m=d(i,2);{var h=y=>{var w=yh(),T=Ae(w),M=d(T,2),D=s(M),A=s(D),x=s(A);{var L=ae=>{Ua(ae,{size:16})};se(x,ae=>{t.activeTask||ae(L)})}var k=d(A,2),P=s(k),Y=d(D,2);{var fe=ae=>{var te=mh(),G=s(te);C(()=>p(G,e(n).timer.noTodoTask)),g(ae,te)};se(Y,ae=>{t.tasks.length===0&&ae(fe)})}var ce=d(Y,2);Ee(ce,17,()=>t.tasks,ae=>ae.id,(ae,te)=>{var G=bh(),ie=s(G),F=s(ie);{var R=O=>{Ua(O,{size:16})};se(F,O=>{var X;((X=t.activeTask)==null?void 0:X.id)===e(te).id&&O(R)})}var ne=d(ie,2),pe=s(ne),me=s(pe),B=d(pe,2),de=s(B),we=d(ne,2);C(()=>{var O;I(G,"aria-selected",((O=t.activeTask)==null?void 0:O.id)===e(te).id),p(me,e(te).title),p(de,`${e(te).completed_pomodoros??0??""}/${e(te).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`),jt(we,`background-color: ${o[e(te).priority??"none"]??o.none??""}`)}),W("click",G,()=>c(e(te))),g(ae,G)}),C(()=>{I(D,"aria-selected",t.activeTask===null),p(P,e(n).timer.noSpecificTask)}),W("click",T,()=>v(r,!1)),W("click",D,()=>c(null)),g(y,w)};se(m,y=>{e(r)&&y(h)})}C(()=>{I(i,"aria-expanded",e(r)),p(f,t.activeTask?t.activeTask.title:e(n).timer.selectTask)}),W("click",i,()=>v(r,!e(r))),g(a,l),pt()}xt(["click"]);var Wi=E("<option> </option>"),Yi=E('<button type="button"> </button>'),xh=E('<button type="button" class="clear svelte-13vcwbh"> </button>'),Th=E('<div class="empty svelte-13vcwbh"> </div>'),Sh=E('<button type="button" class="expander svelte-13vcwbh"><!></button>'),Dh=E('<span class="expander-placeholder svelte-13vcwbh"></span>'),Jo=E('<span class="meta-item svelte-13vcwbh"> </span>'),Ph=E('<button type="button" class="start svelte-13vcwbh"><!></button>'),Mh=E('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),Ch=E('<div class="subs svelte-13vcwbh"></div>'),Eh=E('<div><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),Ah=E('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh"> </h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh"> </span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh"> </h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project"> </label> <select id="timer-filter-project" class="svelte-13vcwbh"><option> </option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag"> </label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option> </option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function Nh(a,t){_t(t,!0);const n=j(bt),r={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let o=z(ze(new Set));function c(K){const b=new Set(e(o));b.has(K)?b.delete(K):b.add(K),v(o,b,!0)}function l(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const i=j(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),u=["high","medium","low"],f=j(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low})),_=["today","tomorrow","this_week"],m=j(()=>({today:e(n).filter.today,tomorrow:e(n).filter.tomorrow,this_week:e(n).filter.thisWeek}));function h(K){var b;return K?((b=t.projects.find(S=>S.id===K))==null?void 0:b.name)??"":""}var y=Ah(),w=s(y),T=s(w),M=s(T),D=s(M),A=d(M,2),x=s(A),L=s(x),k=d(x,2),P=s(k),Y=d(T,2),fe=s(Y),ce=s(fe),ae=d(fe,2),te=s(ae),G=s(te),ie=s(G),F=d(G,2),R=s(F),ne=s(R);R.value=R.__value="";var pe=d(R);Ee(pe,17,()=>t.projects,K=>K.id,(K,b)=>{var S=Wi(),$=s(S),J={};C(()=>{p($,e(b).name),J!==(J=e(b).id)&&(S.value=(S.__value=e(b).id)??"")}),g(K,S)});var me;Ht(F);var B=d(te,2),de=s(B),we=s(de),O=d(de,2),X=s(O),U=s(X);X.value=X.__value="";var Z=d(X);Ee(Z,17,()=>t.tags,K=>K.id,(K,b)=>{var S=Wi(),$=s(S),J={};C(()=>{p($,e(b).name),J!==(J=e(b).id)&&(S.value=(S.__value=e(b).id)??"")}),g(K,S)});var _e;Ht(O);var ye=d(ae,2),ve=s(ye),ge=s(ve),q=d(ve,2);Ee(q,20,()=>u,K=>K,(K,b)=>{var S=Yi();let $;var J=s(S);C(()=>{$=et(S,1,"opt svelte-13vcwbh",null,$,{active:t.filter.priority===b}),p(J,e(f)[b])}),W("click",S,()=>t.onFilterChange({priority:t.filter.priority===b?null:b})),g(K,S)});var re=d(q,2),ue=s(re),Se=d(re,2);Ee(Se,20,()=>_,K=>K,(K,b)=>{var S=Yi();let $;var J=s(S);C(()=>{$=et(S,1,"opt svelte-13vcwbh",null,$,{active:t.filter.date===b}),p(J,e(m)[b])}),W("click",S,()=>t.onFilterChange({date:t.filter.date===b?null:b})),g(K,S)});var Ne=d(ye,2);{var je=K=>{var b=xh(),S=s(b);C(()=>p(S,e(n).timer.clearFilter)),W("click",b,l),g(K,b)};se(Ne,K=>{e(i)&&K(je)})}var He=d(w,2),Ge=s(He);{var H=K=>{var b=Th(),S=s(b);C(()=>p(S,e(n).timer.noTask)),g(K,b)};se(Ge,K=>{t.tasks.length===0&&K(H)})}var he=d(Ge,2);Ee(he,17,()=>t.tasks,K=>K.id,(K,b)=>{const S=j(()=>e(b).status==="completed"),$=j(()=>{var Ue;return(((Ue=e(b).subtasks)==null?void 0:Ue.length)??0)>0}),J=j(()=>e(o).has(e(b).id)),Q=j(()=>e($)?(e(b).subtasks??[]).filter(Ue=>Ue.is_completed).length:0),oe=j(()=>h(e(b).project_id));var V=Eh();let xe;var ke=s(V),Oe=s(ke);{var dt=Ue=>{var Fe=Sh(),lt=s(Fe);{var ee=Re=>{Gn(Re,{size:14})},Pe=Re=>{Vn(Re,{size:14})};se(lt,Re=>{e(J)?Re(ee):Re(Pe,-1)})}C(()=>I(Fe,"aria-label",e(J)?e(n).timer.collapseSubtasks:e(n).timer.expandSubtasks)),W("click",Fe,()=>c(e(b).id)),g(Ue,Fe)},ut=Ue=>{var Fe=Dh();g(Ue,Fe)};se(Oe,Ue=>{e($)?Ue(dt):Ue(ut,-1)})}var vt=d(Oe,2),nt=d(vt,2),Ve=s(nt);let Be;var be=s(Ve),De=d(Ve,2),Xe=s(De),it=s(Xe),rt=d(Xe,2);{var mt=Ue=>{var Fe=Jo(),lt=s(Fe);C(()=>{var ee;return p(lt,`· ${e(Q)??""}/${((ee=e(b).subtasks)==null?void 0:ee.length)??0??""}`)}),g(Ue,Fe)};se(rt,Ue=>{e($)&&Ue(mt)})}var Tt=d(rt,2);{var Lt=Ue=>{var Fe=Jo(),lt=s(Fe);C(()=>p(lt,e(oe))),g(Ue,Fe)};se(Tt,Ue=>{e(oe)&&Ue(Lt)})}var Ut=d(Tt,2);{var $e=Ue=>{var Fe=Jo(),lt=s(Fe);C(ee=>p(lt,ee),[()=>e(b).due_date.slice(0,10)]),g(Ue,Fe)};se(Ut,Ue=>{e(b).due_date&&Ue($e)})}var gt=d(nt,2);{var ft=Ue=>{var Fe=Ph(),lt=s(Fe);lo(lt,{size:10,color:"#fff",fill:"#fff"}),C(()=>{I(Fe,"aria-label",e(n).timer.startTooltip),I(Fe,"title",e(n).timer.startTooltip)}),W("click",Fe,()=>t.onStartTask(e(b))),g(Ue,Fe)};se(gt,Ue=>{e(S)||Ue(ft)})}var Nt=d(ke,2);{var Mt=Ue=>{var Fe=Ch();Ee(Fe,21,()=>e(b).subtasks??[],lt=>lt.id,(lt,ee)=>{var Pe=Mh();let Re;var Je=s(Pe),St=d(Je,2),Te=s(St);C(()=>{Re=et(Pe,1,"sub-row svelte-13vcwbh",null,Re,{done:e(ee).is_completed}),Us(Je,e(ee).is_completed),p(Te,e(ee).title)}),W("change",Je,ot=>t.onToggleSubtask(e(ee).id,ot.currentTarget.checked)),g(lt,Pe)}),g(Ue,Fe)};se(Nt,Ue=>{e($)&&e(J)&&Ue(Mt)})}C(()=>{xe=et(V,1,"task-card svelte-13vcwbh",null,xe,{active:e(b).id===t.activeTaskId}),jt(vt,`background-color: ${r[e(b).priority||"none"]??r.none??""}`),Be=et(Ve,1,"title svelte-13vcwbh",null,Be,{done:e(S)}),p(be,e(b).title),p(it,`${e(b).completed_pomodoros??0??""}/${e(b).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`)}),g(K,V)}),C(()=>{p(D,e(n).timer.todayFocus),p(L,t.todayMinutes),p(P,e(n).timer.minute),p(ce,e(n).timer.taskList),p(ie,e(n).filter.project),p(ne,e(n).filter.all),me!==(me=t.filter.project??"")&&(F.value=(F.__value=t.filter.project??"")??"",qt(F,t.filter.project??"")),p(we,e(n).filter.tag),p(U,e(n).filter.all),_e!==(_e=t.filter.tag??"")&&(O.value=(O.__value=t.filter.tag??"")??"",qt(O,t.filter.tag??"")),p(ge,e(n).filter.priority),p(ue,e(n).filter.date)}),W("change",F,K=>t.onFilterChange({project:K.currentTarget.value||null})),W("change",O,K=>t.onFilterChange({tag:K.currentTarget.value||null})),g(a,y),pt()}xt(["change","click"]);var jh=E('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt"> </h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button"> </button></div></div>');function Fh(a,t){_t(t,!0);const n=j(bt);function r(u){u.target===u.currentTarget&&t.onClose()}function o(u){u.key==="Escape"&&t.onClose()}var c=qe();Dt("keydown",fs,function(...u){var f;(f=t.open?o:void 0)==null||f.apply(this,u)});var l=Ae(c);{var i=u=>{var f=jh(),_=s(f),m=d(s(_),2),h=s(m),y=d(m,2),w=s(y),T=d(y,2),M=s(T);C(()=>{p(h,e(n).timer.modalTitle),p(w,t.message),p(M,e(n).common.confirm)}),W("click",f,r),W("click",T,function(...D){var A;(A=t.onClose)==null||A.apply(this,D)}),g(u,f)};se(l,u=>{t.open&&u(i)})}g(a,c),pt()}xt(["click"]);var Ih=E('<span class="pomo-count svelte-17qnxlg"> </span>'),qh=E('<div class="error svelte-17qnxlg" role="alert"> </div>'),Lh=E('<button class="btn pause svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Rh=E('<button class="btn primary svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Oh=E('<button class="btn primary svelte-17qnxlg"><!> </button>'),Bh=E('<div class="layout page-veil svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist"><button role="tab"> </button> <button role="tab"> </button> <button role="tab"> </button></div> <!> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><defs class="svelte-17qnxlg"><linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%" class="svelte-17qnxlg"><stop offset="0%" stop-color="var(--color-accent-400, #e29676)" class="svelte-17qnxlg"></stop><stop offset="100%" stop-color="var(--color-accent-600, #c9552d)" class="svelte-17qnxlg"></stop></linearGradient></defs><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none" stroke-linecap="round" stroke="url(#ring-gradient)"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-row svelte-17qnxlg"><span class="mode-label svelte-17qnxlg"> </span> <!></div></div></div> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> <b class="svelte-17qnxlg"> </b> </div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg"> </div> <!></div> <!></div></div> <!> <!></div>');function Ki(a,t){_t(t,!0);let n=z(ze([])),r=z(ze([])),o=z(ze([])),c=z(ze([])),l=z(null),i=z(0),u=z(null),f=z(!1);const _=hh,m=j($s),h=j(bt),y=j(()=>{var Pe;const ee=Xa();return e(m).mode==="focus"?(((Pe=e(m).activeTask)==null?void 0:Pe.pomodoro_duration)??ee.focusDuration)*60:e(m).mode==="short_break"?ee.shortBreakDuration*60:ee.longBreakDuration*60}),w=j(()=>e(y)>0?1-e(m).secondsLeft/e(y):0),T=j(()=>Math.floor(e(m).secondsLeft/60)),M=j(()=>e(m).secondsLeft%60),D=j(()=>`${String(e(T)).padStart(2,"0")}:${String(e(M)).padStart(2,"0")}`),A=j(()=>e(m).activeTask),x=j(()=>!e(m).running&&e(m).sessionId===null&&!e(f)),L=j(()=>e(m).mode==="focus"),k=j(()=>e(m).mode==="focus"?e(h).mode.focusing:e(m).mode==="short_break"?e(h).mode.shortBreak:e(h).mode.longBreak);function P(){const ee=new Date,Pe=new Date(ee.getFullYear(),ee.getMonth(),ee.getDate(),0,0,0,0),Re=new Date(ee.getFullYear(),ee.getMonth(),ee.getDate()+1,0,0,0,0);return{startMs:Pe.getTime(),endMs:Re.getTime()}}function Y(){const ee=new Date,Pe=new Date(ee.getFullYear(),ee.getMonth(),1,0,0,0,0),Je=new Date(ee.getFullYear(),ee.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:Pe.getTime(),monthEndMs:Je}}function fe(){const ee=new Date;return`${ee.getFullYear()}-${String(ee.getMonth()+1).padStart(2,"0")}-${String(ee.getDate()).padStart(2,"0")}`}Pt(()=>{e(m).todayCount,F(),te(),G()}),Pt(()=>{e(m).activeTask&&e(m).activeTask.status==="completed"&&qi(null)});async function ce(){try{v(n,await Vs(),!0)}catch(ee){console.warn("refresh projects",ee)}}async function ae(){try{v(r,await Xs(),!0)}catch(ee){console.warn("refresh tags",ee)}}async function te(){try{const ee=Y(),Pe=await Mn({status:null,month_start_ms:ee.monthStartMs,month_end_ms:ee.monthEndMs,project_id:_.project,tag_id:_.tag,priority:_.priority,date:_.date,limit:null}),Re={high:0,medium:1,low:2,none:3};v(o,Pe.sort((Je,St)=>{if(Je.status!==St.status)return Je.status==="active"?-1:1;const Te=Re[Je.priority??"none"]??3,ot=Re[St.priority??"none"]??3;return Te!==ot?Te-ot:new Date(Je.created_at??0).getTime()-new Date(St.created_at??0).getTime()}),!0)}catch(ee){console.warn("refresh tasks",ee)}}async function G(){try{const ee=await Mn({status:"active",limit:null}),Pe={high:0,medium:1,low:2,none:3};v(c,ee.sort((Re,Je)=>{const St=Pe[Re.priority??"none"]??3,Te=Pe[Je.priority??"none"]??3;return St!==Te?St-Te:new Date(Re.created_at??0).getTime()-new Date(Je.created_at??0).getTime()}),!0)}catch(ee){console.warn("refresh active tasks",ee)}}async function ie(){try{const ee=await Fi(fe());v(l,(ee==null?void 0:ee.content)??null,!0)}catch(ee){console.warn("refresh review",ee)}}async function F(){try{const ee=P();v(i,await nf(ee.startMs,ee.endMs),!0)}catch(ee){console.warn("refresh minutes",ee)}}Pt(()=>{_.project,_.tag,_.priority,_.date,te()}),on(async()=>{await Promise.all([ce(),ae(),te(),G(),ie(),F()])});async function R(){var ee,Pe,Re;if(e(x)){v(f,!0),v(u,null);try{await $n(((ee=e(A))==null?void 0:ee.id)??null,((Pe=e(A))==null?void 0:Pe.project_id)??null,((Re=e(A))==null?void 0:Re.pomodoro_duration)??void 0)}catch(Je){v(u,String(Je),!0)}finally{v(f,!1)}}}async function ne(){try{await Js(!1)}catch(ee){v(u,String(ee),!0)}}function pe(ee){uo(ee)}async function me(ee){try{await Tf(ee)}catch(Pe){v(u,String(Pe),!0)}}function B(ee){qi(ee)}async function de(ee,Pe){try{const Re=await Promise.all(e(o).map(St=>Pc(St.id)));let Je=null;for(const St of Re){const Te=St.find(ot=>ot.id===ee);if(Te){Je=Te;break}}if(!Je)return;await ks({...Je,is_completed:Pe}),await te(),await F()}catch(Re){console.warn("toggle subtask",Re)}}async function we(ee){try{const Pe=fe(),Re=await Fi(Pe),Je=Re?{...Re,content:ee}:{id:crypto.randomUUID(),date:Pe,content:ee,updated_at:new Date().toISOString()};await Tc(Je),v(l,ee,!0)}catch(Pe){console.warn("save review",Pe)}}async function O(){try{await Sc(fe()),v(l,null)}catch(ee){console.warn("delete review",ee)}}const X=280,U=12,Z=(X-U)/2,_e=2*Math.PI*Z,ye=j(()=>_e*(1-e(w)));var ve=Bh();Ir("17qnxlg",ee=>{Nr(()=>{tr.title=e(h).page.timer??""})});var ge=s(ve),q=s(ge),re=s(q),ue=s(re);let Se;var Ne=s(ue),je=d(ue,2);let He;var Ge=s(je),H=d(je,2);let he;var K=s(H),b=d(re,2);{var S=ee=>{wh(ee,{get tasks(){return e(c)},get activeTask(){return e(A)},onSelect:B})};se(b,ee=>{e(L)&&ee(S)})}var $=d(b,2),J=s($);I(J,"width",X),I(J,"height",X),I(J,"viewBox","0 0 280 280");var Q=d(s(J));I(Q,"cx",X/2),I(Q,"cy",X/2),I(Q,"r",Z),I(Q,"stroke-width",U);var oe=d(Q);I(oe,"cx",X/2),I(oe,"cy",X/2),I(oe,"r",Z),I(oe,"stroke-width",U),I(oe,"stroke-dasharray",_e),I(oe,"transform","rotate(-90 140 140)");var V=d(J,2),xe=s(V),ke=s(xe),Oe=d(xe,2),dt=s(Oe),ut=s(dt),vt=d(dt,2);{var nt=ee=>{var Pe=Ih(),Re=s(Pe);C(()=>{var Je,St;return p(Re,`${((Je=e(A))==null?void 0:Je.completed_pomodoros)??0??""}/${((St=e(A))==null?void 0:St.estimated_pomodoros)??0??""} ${e(h).timer.pomodoros??""}`)}),g(ee,Pe)};se(vt,ee=>{e(L)&&ee(nt)})}var Ve=d($,2);{var Be=ee=>{var Pe=qh(),Re=s(Pe);C(()=>p(Re,`⚠ ${e(u)??""}`)),g(ee,Pe)};se(Ve,ee=>{e(u)&&ee(Be)})}var be=d(Ve,2),De=s(be);{var Xe=ee=>{var Pe=Lh(),Re=Ae(Pe),Je=s(Re);uv(Je,{size:18,fill:"currentColor"});var St=d(Je),Te=d(Re,2),ot=s(Te);mv(ot,{size:16});var yt=d(ot);C(()=>{p(St,` ${e(h).timer.pause??""}`),p(yt,` ${e(h).timer.skip??""}`)}),W("click",Re,function(...Xt){Wo==null||Wo.apply(this,Xt)}),W("click",Te,ne),g(ee,Pe)},it=ee=>{var Pe=Rh(),Re=Ae(Pe),Je=s(Re);lo(Je,{size:18,fill:"currentColor"});var St=d(Je),Te=d(Re,2),ot=s(Te);bv(ot,{size:16});var yt=d(ot);C(()=>{p(St,` ${e(h).timer.resume??""}`),p(yt,` ${e(h).timer.abandon??""}`)}),W("click",Re,function(...Xt){Yo==null||Yo.apply(this,Xt)}),W("click",Te,ne),g(ee,Pe)},rt=ee=>{var Pe=Oh(),Re=s(Pe);lo(Re,{size:18,fill:"currentColor"});var Je=d(Re);C(()=>{Pe.disabled=!e(x),p(Je,` ${(e(f)?e(h).timer.starting:e(L)?e(h).timer.start:e(h).timer.startBreak)??""}`)}),W("click",Pe,R),g(ee,Pe)};se(De,ee=>{e(m).running?ee(Xe):e(m).sessionId?ee(it,1):ee(rt,-1)})}var mt=d(be,2),Tt=d(s(mt)),Lt=d(Tt),Ut=s(Lt),$e=d(Lt),gt=d(mt,2),ft=s(gt),Nt=s(ft),Mt=d(ft,2);fo(Mt,{get value(){return e(l)},get placeholder(){return e(h).timer.reviewPlaceholder},rows:2,onSave:we,onDelete:O});var Ue=d(gt,2);gh(Ue,{});var Fe=d(ge,2);{let ee=j(()=>{var Pe;return((Pe=e(m).activeTask)==null?void 0:Pe.id)??null});Nh(Fe,{get todayMinutes(){return e(i)},get projects(){return e(n)},get tags(){return e(r)},get tasks(){return e(o)},get activeTaskId(){return e(ee)},get filter(){return _},onFilterChange:Pe=>Object.assign(_,Pe),onStartTask:me,onToggleSubtask:de})}var lt=d(Fe,2);{let ee=j(()=>e(m).pendingCompletionMessage!==null),Pe=j(()=>e(m).pendingCompletionMessage??"");Fh(lt,{get open(){return e(ee)},get message(){return e(Pe)},get onClose(){return Mf}})}C(()=>{I(re,"aria-label",e(h).timer.modeTabsAria),Se=et(ue,1,"mode-tab svelte-17qnxlg",null,Se,{active:e(m).mode==="focus"}),I(ue,"aria-selected",e(m).mode==="focus"),p(Ne,e(h).mode.focus),He=et(je,1,"mode-tab svelte-17qnxlg",null,He,{active:e(m).mode==="short_break"}),I(je,"aria-selected",e(m).mode==="short_break"),p(Ge,e(h).mode.shortBreak),he=et(H,1,"mode-tab svelte-17qnxlg",null,he,{active:e(m).mode==="long_break"}),I(H,"aria-selected",e(m).mode==="long_break"),p(K,e(h).mode.longBreak),I(oe,"stroke-dashoffset",e(ye)),p(ke,e(D)),p(ut,e(k)),p(Tt,` ${e(h).timer.todayDone??""} `),p(Ut,e(m).todayCount),p($e,` ${e(h).timer.pomodoroUnit??""}`),p(Nt,e(h).timer.reviewTitle)}),W("click",ue,()=>pe("focus")),W("click",je,()=>pe("short_break")),W("click",H,()=>pe("long_break")),g(a,ve),pt()}xt(["click"]);async function zh(a={}){return typeof a=="object"&&Object.freeze(a),await Ie("plugin:dialog|save",{options:a})}//! 截止时间（due_date）相关工具。
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
function ho(a){return!!a&&a.includes("T")}function Jt(a){return(a||"").slice(0,10)}function Ia(){const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Hh(){const a=new Date;return`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`}function Ds(a){return`${Jt(a)||Ia()}T${Hh()}`}function Zr(){const a=new Date;return a.setDate(a.getDate()+1),`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Gi(a){if(!a)return"";try{const t=new Date(a);if(isNaN(t.getTime()))return"";const n=t.getTimezoneOffset();return new Date(t.getTime()-n*6e4).toISOString().slice(0,16)}catch{return""}}function Ps(a){if(!a)return null;try{const t=new Date(a);return isNaN(t.getTime())?null:t.toISOString()}catch{return null}}var Uh=E('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <span class="filter-stats svelte-qbpxhc"> </span></button>'),Wh=E('<button type="button" class="add-root svelte-qbpxhc"><!></button>'),Yh=E('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Kh=E('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Gh=E('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),Vh=E('<span class="expand-spacer svelte-qbpxhc"></span>'),Xh=E('<button type="button" class="more-btn svelte-qbpxhc"><!></button>'),$h=E('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),Jh=E('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Vi=E('<button type="button" class="ctx-item svelte-qbpxhc"><!> </button>'),Qh=E('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> </button>'),Zh=E('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),e_=E('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),t_=E('<div class="empty-hint svelte-qbpxhc"> </div>'),a_=E('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),n_=E('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> </button> <!></div> <!></div></aside>');function r_(a,t){_t(t,!0);const n=j(bt);let r=ma(t,"search",3,""),o=z(!0),c=z(ze(new Set)),l=z(null),i=z(null),u=z(""),f=z(null),_=z("");function m(O){const X=O.getDay(),U=X===0?-6:1-X,Z=new Date(O);return Z.setDate(Z.getDate()+U),Z.setHours(0,0,0,0),Z}function h(O){const X=m(O),U=new Date(X);return U.setDate(U.getDate()+6),U.setHours(23,59,59,999),U}function y(O,X){if(X==="journal")return{timeStr:"",count:0};const U=Ia(),Z=Zr(),_e=m(new Date),ye=h(new Date);let ve=O;X==="today"&&(ve=O.filter(Se=>Jt(Se.due_date)===U)),X==="tomorrow"&&(ve=O.filter(Se=>Jt(Se.due_date)===Z)),X==="week"&&(ve=O.filter(Se=>{if(!Se.due_date)return!1;const Ne=new Date(Se.due_date);return Ne>=_e&&Ne<=ye})),X==="planned"&&(ve=O.filter(Se=>Se.due_date!==null&&Se.due_date!==void 0)),X==="completed"&&(ve=O.filter(Se=>Se.status==="completed"));const ge=ve.reduce((Se,Ne)=>Se+(Ne.estimated_pomodoros||0)*(Ne.pomodoro_duration||25),0),q=Math.floor(ge/60),re=ge%60;return{timeStr:q>0?`${q}h ${re}m`:`${re}m`,count:ve.length}}function w(O){const X=new Map,U=[];for(const _e of O)X.set(_e.id,{..._e,children:[],depth:0});for(const _e of O){const ye=X.get(_e.id);ye&&(_e.parent_id&&X.has(_e.parent_id)?X.get(_e.parent_id).children.push(ye):U.push(ye))}const Z=(_e,ye)=>{for(const ve of _e)ve.depth=ye,Z(ve.children,ye+1)};return Z(U,0),U}function T(O,X){const U=[];for(const Z of O)U.push(Z),X.has(Z.id)&&Z.children.length>0&&U.push(...T(Z.children,X));return U}const M=j(()=>w(t.projects)),D=j(()=>T(e(M),e(c))),A=j(()=>[{key:"today",icon:yv,label:e(n).filter.today},{key:"tomorrow",icon:kv,label:e(n).filter.tomorrow},{key:"week",icon:ic,label:e(n).filter.week},{key:"planned",icon:Qu,label:e(n).sidebar.planned},{key:"completed",icon:ms,label:e(n).sidebar.completed},{key:"journal",icon:Zu,label:e(n).sidebar.journal}]),x=j(()=>t.selectedProject===null?t.filter:"");function L(O){const X=new Set(e(c));X.has(O)?X.delete(O):X.add(O),v(c,X,!0)}function k(O){t.onSetFilter(O),t.onSelectProject(null)}var P=n_(),Y=s(P),fe=s(Y);pv(fe,{size:14,class:"search-icon"});var ce=d(fe,2),ae=d(Y,2);Ee(ae,21,()=>e(A),O=>O.key,(O,X)=>{const U=j(()=>y(t.tasks,e(X).key)),Z=j(()=>e(x)===e(X).key);var _e=Uh();let ye;var ve=s(_e),ge=s(ve);Fr(ge,()=>e(X).icon,(Se,Ne)=>{Ne(Se,{size:16})});var q=d(ge),re=d(ve,2),ue=s(re);C(()=>{ye=et(_e,1,"filter-btn svelte-qbpxhc",null,ye,{active:e(Z)}),p(q,` ${e(X).label??""}`),p(ue,`${e(U).timeStr??""} ${e(U).count??""}`)}),W("click",_e,()=>k(e(X).key)),g(O,_e)});var te=d(ae,2),G=s(te),ie=s(G),F=s(ie);{var R=O=>{Gn(O,{size:14})},ne=O=>{Vn(O,{size:14})};se(F,O=>{e(o)?O(R):O(ne,-1)})}var pe=d(F),me=d(ie,2);{var B=O=>{var X=Wh(),U=s(X);Pn(U,{size:14}),C(()=>{I(X,"aria-label",e(n).sidebar.addRootAria),I(X,"title",e(n).sidebar.addListTitle)}),W("click",X,()=>{v(f,"root"),v(_,"")}),g(O,X)};se(me,O=>{t.onCreateProject&&O(B)})}var de=d(G,2);{var we=O=>{var X=a_(),U=s(X);{var Z=ge=>{var q=Yh(),re=s(q);bn(re,!0),C(()=>I(re,"placeholder",e(n).sidebar.listNamePlaceholder)),W("keydown",re,ue=>{if(ue.key==="Enter"){const Se=e(_).trim();Se&&t.onCreateProject&&t.onCreateProject(Se,null),v(f,null),v(_,"")}ue.key==="Escape"&&(v(f,null),v(_,""))}),Dt("blur",re,()=>{const ue=e(_).trim();ue&&t.onCreateProject&&t.onCreateProject(ue,null),v(f,null),v(_,"")}),kt(re,()=>e(_),ue=>v(_,ue)),g(ge,q)};se(U,ge=>{e(f)==="root"&&t.onCreateProject&&ge(Z)})}var _e=d(U,2);Ee(_e,17,()=>e(D),ge=>ge.id,(ge,q)=>{const re=j(()=>t.selectedProject===e(q).id),ue=j(()=>e(l)===e(q).id),Se=j(()=>e(i)===e(q).id),Ne=j(()=>e(q).children.length>0),je=j(()=>e(c).has(e(q).id));var He=e_(),Ge=s(He);{var H=J=>{var Q=Kh(),oe=s(Q);bn(oe,!0),W("keydown",oe,V=>{if(V.key==="Enter"){const xe=e(u).trim();xe&&t.onUpdateProject&&t.onUpdateProject(e(q).id,xe),v(i,null),v(u,"")}V.key==="Escape"&&(v(i,null),v(u,""))}),Dt("blur",oe,()=>{const V=e(u).trim();V&&t.onUpdateProject&&t.onUpdateProject(e(q).id,V),v(i,null),v(u,"")}),kt(oe,()=>e(u),V=>v(u,V)),g(J,Q)},he=J=>{var Q=$h();let oe;var V=s(Q),xe=s(V);{var ke=Be=>{var be=Gh(),De=s(be);{var Xe=rt=>{Gn(rt,{size:12})},it=rt=>{Vn(rt,{size:12})};se(De,rt=>{e(je)?rt(Xe):rt(it,-1)})}C(()=>I(be,"aria-label",e(je)?e(n).form.collapse:e(n).common.expand)),W("click",be,rt=>{rt.stopPropagation(),L(e(q).id)}),g(Be,be)},Oe=Be=>{var be=Vh();g(Be,be)};se(xe,Be=>{e(Ne)?Be(ke):Be(Oe,-1)})}var dt=d(xe,2);{let Be=j(()=>e(q).color||"var(--color-accent)");ov(dt,{size:14,get color(){return e(Be)}})}var ut=d(dt,2),vt=s(ut),nt=d(V,2);{var Ve=Be=>{var be=Xh(),De=s(be);nv(De,{size:14}),C(()=>I(be,"aria-label",e(n).sidebar.moreActions)),W("click",be,Xe=>{Xe.stopPropagation(),v(l,e(ue)?null:e(q).id,!0)}),g(Be,be)};se(nt,Be=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&e(q).depth<2)&&Be(Ve)})}C(()=>{oe=et(Q,1,"node-row svelte-qbpxhc",null,oe,{active:e(re)}),p(vt,e(q).name)}),W("click",V,()=>{t.onSelectProject(e(q).id),t.onSetFilter("")}),W("keydown",V,Be=>{(Be.key==="Enter"||Be.key===" ")&&(Be.preventDefault(),t.onSelectProject(e(q).id),t.onSetFilter(""))}),g(J,Q)};se(Ge,J=>{e(Se)?J(H):J(he,-1)})}var K=d(Ge,2);{var b=J=>{var Q=Jh(),oe=s(Q);bn(oe,!0),C(()=>{jt(Q,`padding-left: ${(e(q).depth+1)*12+12}px;`),I(oe,"placeholder",e(q).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)}),W("keydown",oe,V=>{if(V.key==="Enter"){const xe=e(_).trim();xe&&t.onCreateProject&&t.onCreateProject(xe,e(q).id),v(f,null),v(_,"");const ke=new Set(e(c));ke.add(e(q).id),v(c,ke,!0)}V.key==="Escape"&&(v(f,null),v(_,""))}),Dt("blur",oe,()=>{const V=e(_).trim();V&&t.onCreateProject&&t.onCreateProject(V,e(q).id),v(f,null),v(_,"");const xe=new Set(e(c));xe.add(e(q).id),v(c,xe,!0)}),kt(oe,()=>e(_),V=>v(_,V)),g(J,Q)};se(K,J=>{e(f)===e(q).id&&t.onCreateProject&&J(b)})}var S=d(K,2);{var $=J=>{var Q=Zh(),oe=s(Q);{var V=ut=>{var vt=Vi(),nt=s(vt);Pn(nt,{size:12});var Ve=d(nt);C(()=>p(Ve,` ${e(n).settings.list.addChild??""}`)),W("click",vt,()=>{v(f,e(q).id,!0),v(_,""),v(l,null)}),g(ut,vt)};se(oe,ut=>{t.onCreateProject&&e(q).depth<2&&ut(V)})}var xe=d(oe,2);{var ke=ut=>{var vt=Vi(),nt=s(vt);Ys(nt,{size:12});var Ve=d(nt);C(()=>p(Ve,` ${e(n).settings.list.edit??""}`)),W("click",vt,()=>{v(u,e(q).name,!0),v(i,e(q).id,!0),v(l,null)}),g(ut,vt)};se(xe,ut=>{t.onUpdateProject&&ut(ke)})}var Oe=d(xe,2);{var dt=ut=>{var vt=Qh(),nt=s(vt);qr(nt,{size:12});var Ve=d(nt);C(()=>p(Ve,` ${e(n).settings.list.del??""}`)),W("click",vt,()=>{t.onDeleteProject(e(q).id),v(l,null)}),g(ut,vt)};se(Oe,ut=>{t.onDeleteProject&&ut(dt)})}g(J,Q)};se(S,J=>{e(ue)&&!e(Se)&&J($)})}C(()=>jt(He,`padding-left: ${e(q).depth*12}px;`)),g(ge,He)});var ye=d(_e,2);{var ve=ge=>{var q=t_(),re=s(q);C(()=>p(re,e(n).sidebar.emptyHint)),g(ge,q)};se(ye,ge=>{t.projects.length===0&&e(f)!=="root"&&ge(ve)})}g(O,X)};se(de,O=>{e(o)&&O(we)})}C(()=>{io(ce,r()),I(ce,"placeholder",e(n).sidebar.searchTasksPlaceholder),p(pe,` ${e(n).task.list??""}`)}),W("input",ce,O=>{var X;return(X=t.onSearchChange)==null?void 0:X.call(t,O.currentTarget.value)}),W("click",ie,()=>v(o,!e(o))),g(a,P),pt()}xt(["input","click","keydown"]);var o_=E('<span class="pri-badge svelte-3041n"> </span>'),s_=E('<span class="tag svelte-3041n"> </span>'),i_=E('<div class="row-2 svelte-3041n"></div>'),l_=E("<span></span>"),c_=E('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),d_=E('<span class="due svelte-3041n"> </span>'),u_=E('<button type="button" class="start svelte-3041n"><!></button>'),v_=E('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function Rc(a,t){_t(t,!0);const n=j(bt),r=j(()=>t.task.status==="completed"),o=j(()=>t.task.estimated_pomodoros||0),c=j(()=>t.task.completed_pomodoros||0),l=j(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),i=j(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""})[t.task.priority||"none"]),u=j(()=>t.task.due_date?Jt(t.task.due_date):"");var f=v_();let _;var m=s(f);let h;var y=s(m);{var w=F=>{Ua(F,{size:12,strokeWidth:3,color:"#fff"})};se(y,F=>{e(r)&&F(w)})}var T=d(m,2),M=s(T),D=s(M);{var A=F=>{var R=o_(),ne=s(R);C(()=>{jt(R,`--pri-color: ${e(l)??""}`),p(ne,e(i))}),g(F,R)};se(D,F=>{t.task.priority&&t.task.priority!=="none"&&F(A)})}var x=d(D,2),L=s(x),k=d(M,2);{var P=F=>{var R=i_();Ee(R,21,()=>t.task.tags.slice(0,3),ne=>ne.id,(ne,pe)=>{var me=s_(),B=s(me);C(()=>p(B,`#${e(pe).name??""}`)),g(ne,me)}),g(F,R)};se(k,F=>{t.task.tags&&t.task.tags.length>0&&F(P)})}var Y=d(k,2),fe=s(Y);{var ce=F=>{var R=c_(),ne=s(R);Ee(ne,21,()=>Array.from({length:Math.min(e(o),8)}),Wa,(B,de,we)=>{var O=l_();let X;C(()=>X=et(O,1,"dot svelte-3041n",null,X,{filled:we<e(c)})),g(B,O)});var pe=d(ne,2),me=s(pe);C(()=>p(me,`${e(c)??""}/${e(o)??""} ${e(n).timer.pomodoros??""}`)),g(F,R)};se(fe,F=>{e(o)>0&&F(ce)})}var ae=d(fe,2);{var te=F=>{var R=d_(),ne=s(R);C(()=>p(ne,e(u))),g(F,R)};se(ae,F=>{e(u)&&F(te)})}var G=d(T,2);{var ie=F=>{var R=u_(),ne=s(R);lo(ne,{size:13,color:"#fff",fill:"#fff"}),C(()=>{I(R,"aria-label",e(n).task.startTooltip),I(R,"title",e(n).task.startTooltip)}),W("click",R,pe=>{var me;pe.stopPropagation(),(me=t.onStart)==null||me.call(t,t.task)}),g(F,R)};se(G,F=>{!e(r)&&t.onStart&&F(ie)})}C(()=>{_=et(f,1,"task-card svelte-3041n",null,_,{selected:t.selected,done:e(r)}),I(f,"aria-label",t.task.title),h=et(m,1,"check svelte-3041n",null,h,{checked:e(r)}),I(m,"aria-label",e(r)?e(n).common.ariaMarkUndone:e(n).common.ariaMarkDone),p(L,t.task.title)}),W("click",f,()=>t.onSelect(t.task)),W("keydown",f,F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),t.onSelect(t.task))}),W("click",m,F=>{F.stopPropagation(),t.onToggle(t.task.id)}),g(a,f),pt()}xt(["click","keydown"]);//! 清单(项目)树 → 下拉选项平铺 —— v1 TaskForm/TaskDetailPanel 共用逻辑。
//!
//! 规则(v1 getProjectTreeOptions):
//!   - 深度优先遍历,子清单缩进一级(depth 供前端渲染 `'　'.repeat(depth)`)
//!   - 有子清单的父节点 `disabled: true`(任务只能挂到叶子清单)
function Oc(a){const t=new Map;for(const c of a)t.set(c.id,{...c,children:[]});const n=[];for(const c of a)c.parent_id&&t.has(c.parent_id)?t.get(c.parent_id).children.push(c.id):n.push(c.id);const r=[],o=(c,l)=>{const i=t.get(c),u=i.children.length>0;r.push({id:i.id,name:i.name,depth:l,disabled:u});for(const f of i.children)o(f,l+1)};for(const c of n)o(c,0);return r}var f_=E('<input type="text" class="title-input svelte-1t5orp1"/>'),h_=E('<button type="button" class="title-btn svelte-1t5orp1"> </button>'),__=E('<button type="button" class="icon-btn svelte-1t5orp1"><!></button>'),p_=E('<li><input type="checkbox" class="svelte-1t5orp1"/> <!> <!> <button type="button" class="icon-btn danger svelte-1t5orp1"><!></button></li>');function g_(a,t){_t(t,!0);const n=j(bt);let r=z(!1),o=z(ze(Vt(()=>t.subtask.title))),c=z(null);Pt(()=>{e(r)||v(o,t.subtask.title,!0)});function l(){v(o,t.subtask.title,!0),v(r,!0),queueMicrotask(()=>{var k;return(k=e(c))==null?void 0:k.focus()})}function i(){const k=e(o).trim();e(r)&&(v(r,!1),k&&k!==t.subtask.title?t.onChange({...t.subtask,title:k}):k||v(o,t.subtask.title,!0))}function u(){v(o,t.subtask.title,!0),v(r,!1)}function f(k){k.key==="Enter"?(k.preventDefault(),i()):k.key==="Escape"&&(k.preventDefault(),u())}function _(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var m=p_();let h;var y=s(m),w=d(y,2);{var T=k=>{var P=f_();Ou(P,Y=>v(c,Y),()=>e(c)),C(()=>I(P,"aria-label",e(n).task.editSubtask)),Dt("blur",P,i),W("keydown",P,f),kt(P,()=>e(o),Y=>v(o,Y)),g(k,P)},M=k=>{var P=h_(),Y=s(P);C(()=>{I(P,"title",e(n).task.dblclickToEdit),p(Y,t.subtask.title)}),W("dblclick",P,l),g(k,P)};se(w,k=>{e(r)?k(T):k(M,-1)})}var D=d(w,2);{var A=k=>{var P=__(),Y=s(P);Ys(Y,{size:13}),C(()=>{I(P,"aria-label",e(n).task.editSubtask),I(P,"title",e(n).task.editSubtask)}),W("click",P,l),g(k,P)};se(D,k=>{e(r)||k(A)})}var x=d(D,2),L=s(x);qr(L,{size:13}),C(()=>{h=et(m,1,"row svelte-1t5orp1",null,h,{done:t.subtask.is_completed}),Us(y,t.subtask.is_completed),I(y,"aria-label",e(n).task.toggleSubtaskAria),I(x,"aria-label",e(n).task.deleteSubtask),I(x,"title",e(n).task.deleteSubtask)}),W("change",y,_),W("click",x,()=>t.onDelete(t.subtask.id)),g(a,m),pt()}xt(["change","keydown","dblclick","click"]);var Xi=E('<button type="button"> </button>'),m_=E('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="weekdays svelte-1h3pyjl"></div></div>'),b_=E('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="month-grid svelte-1h3pyjl"></div></div>'),y_=E('<div class="warn svelte-1h3pyjl"> </div>'),k_=E('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl"> </h3> <button type="button" class="close-btn svelte-1h3pyjl"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl"> </label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl"> </label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl"> </label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl"> </label> <select id="rc-type" class="input svelte-1h3pyjl"><option> </option><option> </option><option> </option><option> </option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl"> </button> <button type="button" class="btn-confirm svelte-1h3pyjl"> </button></div></div></div>');function Bc(a,t){_t(t,!0);const n=j(bt);function r(){const x=new Date,L=k=>String(k).padStart(2,"0");return`${x.getFullYear()}-${L(x.getMonth()+1)}-${L(x.getDate())}T${L(x.getHours())}:${L(x.getMinutes())}`}function o(){return`${new Date().getFullYear()}-12-31T23:59`}let c=z(ze(r())),l=z(ze(o())),i=z(1),u=z("week"),f=z(ze([])),_=z(ze([]));Pt(()=>{if(t.open&&t.initialConfig)try{const x=JSON.parse(t.initialConfig);v(c,x.startDate||r(),!0),v(l,x.endDate||o(),!0),v(i,x.interval||1,!0),v(u,x.type||"week",!0),v(f,x.weekdays||[],!0),v(_,x.monthDays||[],!0)}catch{}});function m(x,L,k){k(x.includes(L)?x.filter(P=>P!==L):[...x,L].sort((P,Y)=>P-Y))}function h(){const x={interval:e(i),type:e(u),startDate:e(c),endDate:e(l)};e(u)==="week"&&(x.weekdays=e(f)),e(u)==="month"&&(x.monthDays=e(_)),t.onConfirm(JSON.stringify(x))}let y=j(()=>e(u)==="week"&&e(f).length===0||e(u)==="month"&&e(_).length===0);function w(x){x.target===x.currentTarget&&t.onClose()}function T(x){x.key==="Escape"&&t.onClose()}var M=qe(),D=Ae(M);{var A=x=>{var L=k_(),k=s(L),P=s(k),Y=s(P),fe=s(Y),ce=d(Y,2),ae=s(ce);Ks(ae,{size:18});var te=d(P,2),G=s(te),ie=s(G),F=s(ie),R=s(F),ne=d(F,2),pe=d(ie,2),me=s(pe),B=s(me),de=d(me,2),we=d(G,2),O=s(we),X=s(O),U=s(X),Z=d(X,2),_e=d(O,2),ye=s(_e),ve=s(ye),ge=d(ye,2),q=s(ge),re=s(q);q.value=q.__value="day";var ue=d(q),Se=s(ue);ue.value=ue.__value="week";var Ne=d(ue),je=s(Ne);Ne.value=Ne.__value="month";var He=d(Ne),Ge=s(He);He.value=He.__value="year";var H=d(we,2);{var he=ke=>{var Oe=m_(),dt=s(Oe),ut=s(dt),vt=d(dt,2);Ee(vt,21,()=>e(n).settings.repeatCustom.weekShort,Wa,(nt,Ve,Be)=>{const be=j(()=>Be+1),De=j(()=>e(f).includes(e(be)));var Xe=Xi();let it;var rt=s(Xe);C(()=>{it=et(Xe,1,"weekday-btn svelte-1h3pyjl",null,it,{active:e(De)}),p(rt,e(Ve))}),W("click",Xe,()=>m(e(f),e(be),mt=>v(f,mt,!0))),g(nt,Xe)}),C(()=>p(ut,e(n).settings.repeatCustom.weekdays)),g(ke,Oe)};se(H,ke=>{e(u)==="week"&&ke(he)})}var K=d(H,2);{var b=ke=>{var Oe=b_(),dt=s(Oe),ut=s(dt),vt=d(dt,2);Ee(vt,20,()=>Array.from({length:31},(nt,Ve)=>Ve+1),Wa,(nt,Ve)=>{const Be=j(()=>e(_).includes(Ve));var be=Xi();let De;var Xe=s(be);C(()=>{De=et(be,1,"month-btn svelte-1h3pyjl",null,De,{active:e(Be)}),p(Xe,Ve)}),W("click",be,()=>m(e(_),Ve,it=>v(_,it,!0))),g(nt,be)}),C(()=>p(ut,e(n).settings.repeatCustom.monthDays)),g(ke,Oe)};se(K,ke=>{e(u)==="month"&&ke(b)})}var S=d(K,2);{var $=ke=>{var Oe=y_(),dt=s(Oe);C(()=>p(dt,e(u)==="week"?e(n).settings.repeatCustom.needPickWeek:e(n).settings.repeatCustom.needPickDay)),g(ke,Oe)};se(S,ke=>{e(y)&&ke($)})}var J=d(te,2),Q=s(J),oe=s(Q),V=d(Q,2),xe=s(V);C(()=>{p(fe,e(n).settings.repeatCustom.title),I(ce,"aria-label",e(n).common.close),p(R,e(n).settings.repeatCustom.startDate),p(B,e(n).settings.repeatCustom.endDate),p(U,e(n).settings.repeatCustom.interval),p(ve,e(n).settings.repeatCustom.type),p(re,e(n).settings.repeatCustom.typeDay),p(Se,e(n).settings.repeatCustom.typeWeek),p(je,e(n).settings.repeatCustom.typeMonth),p(Ge,e(n).settings.repeatCustom.typeYear),p(oe,e(n).settings.repeatCustom.cancel),V.disabled=e(y),p(xe,e(n).settings.repeatCustom.confirm)}),W("click",L,w),W("keydown",L,T),W("click",ce,function(...ke){var Oe;(Oe=t.onClose)==null||Oe.apply(this,ke)}),kt(ne,()=>e(c),ke=>v(c,ke)),kt(de,()=>e(l),ke=>v(l,ke)),kt(Z,()=>e(i),ke=>v(i,ke)),so(ge,()=>e(u),ke=>v(u,ke)),W("click",Q,function(...ke){var Oe;(Oe=t.onClose)==null||Oe.apply(this,ke)}),W("click",V,h),g(x,L)};se(D,x=>{t.open&&x(A)})}g(a,M),pt()}xt(["click","keydown"]);var w_=E('<span class="tag-chip svelte-1qppxcb"> </span>'),x_=E('<div class="tag-chips svelte-1qppxcb"></div>'),T_=E('<span class="no-tags svelte-1qppxcb"> </span>'),S_=E('<label class="tags-editor-row svelte-1qppxcb"><input type="checkbox" class="svelte-1qppxcb"/> <span class="tag-dot svelte-1qppxcb"></span> <span> </span></label>'),D_=E('<div class="no-tags svelte-1qppxcb"> </div>'),P_=E('<div class="tags-editor svelte-1qppxcb"><!> <!></div>'),Qo=E("<option> </option>"),M_=E('<aside class="panel svelte-1qppxcb"><div class="head svelte-1qppxcb"><div class="head-left svelte-1qppxcb"><span class="pri-dot svelte-1qppxcb"></span> <input class="title-input svelte-1qppxcb"/></div> <button class="close svelte-1qppxcb"><!></button></div> <div class="tags svelte-1qppxcb"><!> <button type="button" class="tags-toggle svelte-1qppxcb"> </button> <!></div> <div class="rows svelte-1qppxcb"><div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><span class="pri-swatch svelte-1qppxcb"></span> </span> <select class="ctrl svelte-1qppxcb"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <span class="ctrl-group svelte-1qppxcb"><span class="pomo-done svelte-1qppxcb"> </span> <input class="pomo-input svelte-1qppxcb" type="number" min="1" max="99"/> <span class="pomo-minutes svelte-1qppxcb"> </span></span></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <input class="ctrl ctrl-bare svelte-1qppxcb" type="datetime-local"/></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"><option> </option><!></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"></select></div> <div class="row svelte-1qppxcb"><span class="row-label svelte-1qppxcb"><!> </span> <select class="ctrl svelte-1qppxcb"></select></div></div> <div class="subtasks svelte-1qppxcb"><!> <div class="sub-add svelte-1qppxcb"><!> <input type="text" class="svelte-1qppxcb"/></div></div> <div class="notes svelte-1qppxcb"><textarea rows="3" class="svelte-1qppxcb"></textarea></div> <div class="del-wrap svelte-1qppxcb"><button type="button" class="del-btn svelte-1qppxcb"><!> </button></div> <!></aside>');function C_(a,t){_t(t,!0);const n=j(bt);let r=z(ze(Vt(()=>t.task.title))),o=z(ze(Vt(()=>t.task.description??""))),c=z(ze(Vt(()=>Gi(t.task.due_date))));Pt(()=>{v(r,t.task.title,!0),v(o,t.task.description??"",!0),v(c,Gi(t.task.due_date),!0)});function l(){return new Date().toISOString()}async function i(le){try{await ys({...t.task,...le,updated_at:l()}),t.onChanged()}catch(Me){console.error("patch task failed",Me),alert(Ft(e(n).task.saveFailed,{err:String(Me)}))}}async function u(le,Me){try{await ys({...t.task,repeat:le,updated_at:l(),...le==="custom"&&Me!==void 0?{repeat_config:Me}:{}},e(h)),t.onChanged()}catch(Ye){console.error("patch repeat failed",Ye),alert(Ft(e(n).task.saveFailed,{err:String(Ye)}))}}async function f(){const le=e(r).trim();!le||le===t.task.title||await i({title:le})}async function _(){e(o)!==(t.task.description??"")&&await i({description:e(o)})}async function m(){const le=Ps(e(c));le!==t.task.due_date&&await i({due_date:le})}let h=z(ze([])),y=z(!1);Pt(()=>{w()});async function w(){try{const le=await Wv(t.task.id);v(h,le.map(Me=>Me.id),!0)}catch(le){console.error("load tags failed",le)}}async function T(le){const Me=e(h),Ye=Me.includes(le)?Me.filter(Rt=>Rt!==le):[...Me,le];v(h,Ye,!0);try{await Yv(t.task.id,Ye),t.onChanged()}catch(Rt){v(h,Me,!0),alert(Ft(e(n).task.setTagsFailed,{err:String(Rt)}))}}const M=j(()=>e(h).map(le=>t.allTags.find(Me=>Me.id===le)).filter(le=>!!le));let D=z(ze([])),A=z("");Pt(()=>{x()});async function x(){try{v(D,await Pc(t.task.id),!0)}catch(le){console.error("load subtasks failed",le)}}async function L(){const le=e(A).trim();if(!le)return;v(A,"");const Me={id:crypto.randomUUID(),task_id:t.task.id,title:le,is_completed:!1,position:e(D).length,created_at:l(),updated_at:l()};try{const Ye=await ks(Me);v(D,[...e(D),Ye],!0),t.onChanged()}catch(Ye){alert(Ft(e(n).task.addSubtaskFailed,{err:String(Ye)}))}}async function k(le){const Me=e(D).find(Ye=>Ye.id===le.id);v(D,e(D).map(Ye=>Ye.id===le.id?le:Ye),!0);try{await ks(le),t.onChanged()}catch(Ye){Me&&v(D,e(D).map(Rt=>Rt.id===Me.id?Me:Rt),!0),alert(Ft(e(n).task.updateSubtaskFailed,{err:String(Ye)}))}}async function P(le){const Me=e(D);v(D,e(D).filter(Ye=>Ye.id!==le),!0);try{await Zv(le),t.onChanged()}catch(Ye){v(D,Me,!0),alert(Ft(e(n).task.deleteSubtaskFailed,{err:String(Ye)}))}}async function Y(){try{await Bv(t.task.id),t.onClose(),t.onChanged()}catch(le){alert(Ft(e(n).task.saveFailed,{err:String(le)}))}}const fe=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],ce=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],ae={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},te={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function G(le){return e(n).enum.reminder[ae[le]]}function ie(le){return e(n).enum.repeat[te[le]]}let F=z(!1);const R=j(Xa),ne=j(()=>t.task.estimated_pomodoros*(t.task.pomodoro_duration??e(R).focusDuration));function pe(le){const Me=le.currentTarget,Ye=Math.round(Number(Me.value)),Rt=Math.min(99,Math.max(1,Number.isFinite(Ye)?Ye:1));Rt!==t.task.estimated_pomodoros&&i({estimated_pomodoros:Rt})}function me(le){if(le==="none"){i({reminder:le});return}if(ho(e(c)))i({reminder:le});else{const Me=Ds(e(c));alert(e(n).task.detailTimeFilled),v(c,Me,!0),i({reminder:le,due_date:Ps(Me)})}}const B={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #a8a298)",none:"var(--color-neutral-400, #a8a298)"};var de=M_(),we=s(de),O=s(we),X=s(O),U=d(X,2),Z=d(O,2),_e=s(Z);Ks(_e,{size:18});var ye=d(we,2),ve=s(ye);{var ge=le=>{var Me=x_();Ee(Me,21,()=>e(M),Ye=>Ye.id,(Ye,Rt)=>{var aa=w_(),Qt=s(aa);C(()=>{jt(aa,`background-color: ${e(Rt).color??""}`),p(Qt,e(Rt).name)}),g(Ye,aa)}),g(le,Me)},q=le=>{var Me=T_(),Ye=s(Me);C(()=>p(Ye,e(n).task.detailNoTags)),g(le,Me)};se(ve,le=>{e(M).length>0?le(ge):le(q,-1)})}var re=d(ve,2),ue=s(re),Se=d(re,2);{var Ne=le=>{var Me=P_(),Ye=s(Me);Ee(Ye,17,()=>t.allTags,Qt=>Qt.id,(Qt,sn)=>{var Br=S_(),jo=s(Br),ii=d(jo,2),Kc=d(ii,2),Gc=s(Kc);C(Vc=>{Us(jo,Vc),jt(ii,`background-color: ${e(sn).color??""}`),p(Gc,e(sn).name)},[()=>e(h).includes(e(sn).id)]),W("change",jo,()=>void T(e(sn).id)),g(Qt,Br)});var Rt=d(Ye,2);{var aa=Qt=>{var sn=D_(),Br=s(sn);C(()=>p(Br,e(n).task.detailNoTagsAvailable)),g(Qt,sn)};se(Rt,Qt=>{t.allTags.length===0&&Qt(aa)})}g(le,Me)};se(Se,le=>{e(y)&&le(Ne)})}var je=d(ye,2),He=s(je),Ge=s(He),H=s(Ge),he=d(H),K=d(Ge,2),b=s(K),S=s(b);b.value=b.__value="high";var $=d(b),J=s($);$.value=$.__value="medium";var Q=d($),oe=s(Q);Q.value=Q.__value="low";var V=d(Q),xe=s(V);V.value=V.__value="none";var ke;Ht(K);var Oe=d(He,2),dt=s(Oe),ut=s(dt);Xn(ut,{size:16});var vt=d(ut),nt=d(dt,2),Ve=s(nt),Be=s(Ve),be=d(Ve,2),De=d(be,2),Xe=s(De),it=d(Oe,2),rt=s(it),mt=s(rt);ev(mt,{size:16});var Tt=d(mt),Lt=d(rt,2),Ut=d(it,2),$e=s(Ut),gt=s($e);lv(gt,{size:16});var ft=d(gt),Nt=d($e,2),Mt=s(Nt),Ue=s(Mt);Mt.value=Mt.__value="";var Fe=d(Mt);Ee(Fe,17,()=>Oc(t.projects),le=>le.id,(le,Me)=>{var Ye=Qo(),Rt=s(Ye),aa={};C(Qt=>{Ye.disabled=e(Me).disabled,p(Rt,`${Qt??""}${e(Me).name??""}`),aa!==(aa=e(Me).id)&&(Ye.value=(Ye.__value=e(Me).id)??"")},[()=>"　".repeat(e(Me).depth)]),g(le,Ye)});var lt;Ht(Nt);var ee=d(Ut,2),Pe=s(ee),Re=s(Pe);sc(Re,{size:16});var Je=d(Re),St=d(Pe,2);Ee(St,21,()=>fe,le=>le.value,(le,Me)=>{var Ye=Qo(),Rt=s(Ye),aa={};C(Qt=>{p(Rt,Qt),aa!==(aa=e(Me).value)&&(Ye.value=(Ye.__value=e(Me).value)??"")},[()=>G(e(Me).value)]),g(le,Ye)});var Te;Ht(St);var ot=d(ee,2),yt=s(ot),Xt=s(yt);fv(Xt,{size:16});var sa=d(Xt),En=d(yt,2);Ee(En,21,()=>ce,le=>le.value,(le,Me)=>{var Ye=Qo(),Rt=s(Ye),aa={};C(Qt=>{p(Rt,Qt),aa!==(aa=e(Me).value)&&(Ye.value=(Ye.__value=e(Me).value)??"")},[()=>ie(e(Me).value)]),g(le,Ye)});var Zs;Ht(En);var ei=d(je,2),ti=s(ei);Ee(ti,17,()=>e(D),le=>le.id,(le,Me)=>{g_(le,{get subtask(){return e(Me)},onChange:k,onDelete:P})});var Uc=d(ti,2),ai=s(Uc);Pn(ai,{size:14,class:"sub-add-icon"});var Or=d(ai,2),ni=d(ei,2),No=s(ni),ri=d(ni,2),oi=s(ri),si=s(oi);qr(si,{size:14});var Wc=d(si),Yc=d(ri,2);Bc(Yc,{get open(){return e(F)},get initialConfig(){return t.task.repeat_config},onConfirm:le=>{v(F,!1),u("custom",le)},onClose:()=>v(F,!1)}),C(()=>{I(de,"aria-label",e(n).task.detailPanelAria),jt(X,`background-color: ${B[t.task.priority]??B.none??""}`),I(U,"aria-label",e(n).task.titleAria),I(Z,"aria-label",e(n).common.close),p(ue,e(y)?e(n).task.detailCollapse:e(n).task.detailEditTags),jt(H,`background-color: ${B[t.task.priority]??B.none??""}`),p(he,` ${e(n).task.detailPriority??""}`),p(S,e(n).priority.high),p(J,e(n).priority.medium),p(oe,e(n).priority.low),p(xe,e(n).priority.none),ke!==(ke=t.task.priority)&&(K.value=(K.__value=t.task.priority)??"",qt(K,t.task.priority)),p(vt,` ${e(n).task.detailPomodoro??""}`),p(Be,`${t.task.completed_pomodoros??""}/`),io(be,t.task.estimated_pomodoros),p(Xe,`= ${e(ne)??""}${e(n).task.minute??""}`),p(Tt,` ${e(n).task.detailDueDate??""}`),p(ft,` ${e(n).task.detailProject??""}`),p(Ue,e(n).task.detailNoProject),lt!==(lt=t.task.project_id??"")&&(Nt.value=(Nt.__value=t.task.project_id??"")??"",qt(Nt,t.task.project_id??"")),p(Je,` ${e(n).task.detailReminder??""}`),Te!==(Te=t.task.reminder??"none")&&(St.value=(St.__value=t.task.reminder??"none")??"",qt(St,t.task.reminder??"none")),p(sa,` ${e(n).task.detailRepeat??""}`),Zs!==(Zs=t.task.repeat??"none")&&(En.value=(En.__value=t.task.repeat??"none")??"",qt(En,t.task.repeat??"none")),I(Or,"placeholder",e(n).task.detailAddSubtask),I(Or,"aria-label",e(n).task.newSubtaskAria),I(No,"placeholder",e(n).task.detailAddNote),p(Wc,` ${e(n).task.detailDelete??""}`)}),Dt("blur",U,f),W("keydown",U,le=>{le.key==="Enter"&&(le.preventDefault(),le.currentTarget.blur())}),kt(U,()=>e(r),le=>v(r,le)),W("click",Z,function(...le){var Me;(Me=t.onClose)==null||Me.apply(this,le)}),W("click",re,()=>v(y,!e(y))),W("change",K,le=>{const Me=le.currentTarget.value;i({priority:Me})}),W("change",be,pe),W("input",Lt,le=>{le.currentTarget.value.length===16&&le.currentTarget.blur()}),Dt("blur",Lt,m),kt(Lt,()=>e(c),le=>v(c,le)),W("change",Nt,le=>{const Me=le.currentTarget.value;i({project_id:Me||null})}),W("change",St,le=>{const Me=le.currentTarget.value;me(Me)}),W("change",En,le=>{const Me=le.currentTarget.value;Me==="custom"?v(F,!0):u(Me)}),W("keydown",Or,le=>{le.key==="Enter"&&e(A).trim()&&(le.preventDefault(),L())}),kt(Or,()=>e(A),le=>v(A,le)),Dt("blur",No,_),kt(No,()=>e(o),le=>v(o,le)),W("click",oi,()=>void Y()),g(a,de),pt()}xt(["keydown","click","change","input"]);var E_=E('<div class="group-tasks svelte-1u318f6"></div>'),A_=E('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),N_=E('<div class="grouped svelte-1u318f6"></div>');function j_(a,t){_t(t,!0);const n=j(bt),r="unscheduled";let o=z(ze(new Set));function c(f,_){const m=new Date(f+"T00:00:00"),h=_.reduce((y,w)=>y+(w.estimated_pomodoros||0)*(w.pomodoro_duration||25),0);return Ft(e(n).task.groupHeader,{date:f,weekday:e(n).enum.weekday[m.getDay()],n:h})}function l(f){const _=new Set(e(o));_.has(f)?_.delete(f):_.add(f),v(o,_,!0)}const i=j(()=>{const f=new Map;for(const m of t.tasks){let h;t.groupBy==="completed_at"?m.completed_at?h=Jt(m.completed_at):h=r:h=m.due_date?Jt(m.due_date):r,f.has(h)||f.set(h,[]),f.get(h).push(m)}const _=Array.from(f.entries());return _.sort((m,h)=>m[0]===r?1:h[0]===r?-1:new Date(m[0]).getTime()-new Date(h[0]).getTime()),_});var u=N_();Ee(u,21,()=>e(i),([f,_])=>f,(f,_)=>{var m=j(()=>cl(e(_),2));let h=()=>e(m)[0],y=()=>e(m)[1];const w=j(()=>e(o).has(h()));var T=A_(),M=s(T),D=s(M),A=s(D),x=d(D,2),L=s(x);{var k=ce=>{Vn(ce,{size:16})},P=ce=>{Gn(ce,{size:16})};se(L,ce=>{e(w)?ce(k):ce(P,-1)})}var Y=d(M,2);{var fe=ce=>{var ae=E_();Ee(ae,21,y,te=>te.id,(te,G)=>{{let ie=j(()=>{var F;return((F=t.selectedTask)==null?void 0:F.id)===e(G).id});Rc(te,{get task(){return e(G)},get selected(){return e(ie)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),g(ce,ae)};se(Y,ce=>{e(w)||ce(fe)})}C(ce=>{I(M,"aria-expanded",!e(w)),p(A,ce)},[()=>h()===r?e(n).task.noDate:c(h(),y())]),W("click",M,()=>l(h())),g(f,T)}),g(a,u),pt()}xt(["click"]);var F_=E('<span class="unit svelte-1i37zgo"> </span>'),I_=E('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function Yt(a,t){var n=I_();let r;var o=s(n),c=s(o);Fr(c,()=>t.icon,(h,y)=>{y(h,{size:18,strokeWidth:1.8})});var l=d(o,2),i=s(l),u=d(i);{var f=h=>{var y=F_(),w=s(y);C(()=>p(w,t.unit)),g(h,y)};se(u,h=>{t.unit&&h(f)})}var _=d(l,2),m=s(_);C(()=>{r=et(n,1,"stat-card svelte-1i37zgo",null,r,{accent:t.accent}),p(i,t.value),p(m,t.label)}),g(a,n)}var $i=E("<option> </option>"),q_=E('<button type="button" class="clear-btn svelte-1ko7jxa"> </button>'),L_=E('<button type="button" class="export-btn svelte-1ko7jxa"><!> </button>'),R_=E('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><option> </option><option> </option><option> </option><option> </option></select> <button type="button"> </button> <button type="button"> </button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <!></div></div>');function Ji(a,t){_t(t,!0);const n=j(bt),r=j(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function o(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var c=R_(),l=s(c),i=s(l),u=s(i),f=s(u);u.value=u.__value="";var _=d(u);Ee(_,17,()=>t.projects,q=>q.id,(q,re)=>{var ue=$i(),Se=s(ue),Ne={};C(()=>{p(Se,e(re).name),Ne!==(Ne=e(re).id)&&(ue.value=(ue.__value=e(re).id)??"")}),g(q,ue)});var m;Ht(i);var h=d(i,2),y=s(h),w=s(y);y.value=y.__value="";var T=d(y);Ee(T,17,()=>t.tags,q=>q.id,(q,re)=>{var ue=$i(),Se=s(ue),Ne={};C(()=>{p(Se,e(re).name),Ne!==(Ne=e(re).id)&&(ue.value=(ue.__value=e(re).id)??"")}),g(q,ue)});var M;Ht(h);var D=d(h,2),A=s(D),x=s(A);A.value=A.__value="";var L=d(A),k=s(L);L.value=L.__value="high";var P=d(L),Y=s(P);P.value=P.__value="medium";var fe=d(P),ce=s(fe);fe.value=fe.__value="low";var ae=d(fe),te=s(ae);ae.value=ae.__value="none";var G;Ht(D);var ie=d(D,2);let F;var R=s(ie),ne=d(ie,2);let pe;var me=s(ne),B=d(ne,2);{var de=q=>{var re=q_(),ue=s(re);C(()=>p(ue,e(n).timer.clearFilter)),W("click",re,o),g(q,re)};se(B,q=>{e(r)&&q(de)})}var we=d(l,2),O=s(we),X=s(O),U=d(O,2),Z=d(U,2),_e=s(Z),ye=d(Z,2),ve=d(ye,2);{var ge=q=>{var re=L_(),ue=s(re);av(ue,{size:14});var Se=d(ue);C(()=>p(Se,` ${e(n).filter.export??""}`)),W("click",re,function(...Ne){var je;(je=t.onExport)==null||je.apply(this,Ne)}),g(q,re)};se(ve,q=>{t.onExport&&q(ge)})}C((q,re)=>{I(i,"title",q),I(i,"aria-label",e(n).filter.projectAria),p(f,e(n).filter.allProject),m!==(m=t.filterProject??"")&&(i.value=(i.__value=t.filterProject??"")??"",qt(i,t.filterProject??"")),I(h,"title",re),I(h,"aria-label",e(n).filter.tagAria),p(w,e(n).filter.allTag),M!==(M=t.filterTag??"")&&(h.value=(h.__value=t.filterTag??"")??"",qt(h,t.filterTag??"")),I(D,"aria-label",e(n).filter.priorityAria),p(x,e(n).filter.allPriority),p(k,e(n).priority.high),p(Y,e(n).priority.medium),p(ce,e(n).priority.low),p(te,e(n).priority.none),G!==(G=t.filterPriority??"")&&(D.value=(D.__value=t.filterPriority??"")??"",qt(D,t.filterPriority??"")),F=et(ie,1,"preset-btn svelte-1ko7jxa",null,F,{on:t.filterPreset==="week"}),p(R,e(n).filter.week),pe=et(ne,1,"preset-btn svelte-1ko7jxa",null,pe,{on:t.filterPreset==="month"}),p(me,e(n).filter.month),p(X,e(n).filter.dueDate),io(U,t.filterStartDate),I(U,"aria-label",e(n).filter.startDate),p(_e,e(n).filter.to),io(ye,t.filterEndDate),I(ye,"aria-label",e(n).filter.endDate)},[()=>{var q;return t.filterProject!==null?(q=t.projects.find(re=>re.id===t.filterProject))==null?void 0:q.name:e(n).filter.allProject},()=>{var q;return t.filterTag!==null?(q=t.tags.find(re=>re.id===t.filterTag))==null?void 0:q.name:e(n).filter.allTag}]),W("change",i,q=>{const re=q.currentTarget.value;t.setFilterProject(re||null)}),W("change",h,q=>{const re=q.currentTarget.value;t.setFilterTag(re||null)}),W("change",D,q=>{const re=q.currentTarget.value;t.setFilterPriority(re||null)}),W("click",ie,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),W("click",ne,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),W("change",U,q=>t.setFilterStartDate(q.currentTarget.value)),W("change",ye,q=>t.setFilterEndDate(q.currentTarget.value)),g(a,c),pt()}xt(["change","click"]);var O_=Cn('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function B_(a,t){let n=ma(t,"size",3,14),r=ma(t,"filled",3,!0);var o=O_(),c=s(o);C(()=>{I(o,"width",n()),I(o,"height",n()),I(c,"fill",r()?"currentColor":"#e5e7eb")}),g(a,o)}var z_=E('<button type="button"><!></button>'),H_=E('<div class="error svelte-1vpobhk"> </div>'),Zo=E("<option> </option>"),U_=E('<button type="button"> </button>'),W_=E('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk"> </span> <div class="tag-chips svelte-1vpobhk"></div></div>'),Y_=E('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk"> </label> <select id="tf-proj" class="svelte-1vpobhk"><option> </option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk"> </label> <select id="tf-pri" class="svelte-1vpobhk"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk"> </label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk"> </label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk"> </label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk"> </label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk"> </button></div></div>'),K_=E('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function G_(a,t){_t(t,!0);const n=j(bt),r=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],o=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],c={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},l={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function i(O){return e(n).enum.reminder[c[O]]}function u(O){return e(n).enum.repeat[l[O]]}let f=j(Xa),_=z(""),m=z(ze(Vt(()=>t.defaultProjectId??null))),h=z("medium"),y=z(ze(Vt(()=>t.defaultDueDate||Ia()))),w=z(0),T=z("none"),M=z("none"),D=z(null),A=z(!1),x=z(ze(Vt(()=>t.tags.length>0?[t.tags[0].id]:[]))),L=z(!1),k=z(""),P=z(!1);Pt(()=>{v(m,t.defaultProjectId??null,!0)}),Pt(()=>{v(y,t.defaultDueDate||Ia(),!0)}),Pt(()=>{t.tags.length>0&&e(x).length===0&&v(x,[t.tags[0].id],!0)});async function Y(){const O=e(_).trim();if(!O){v(k,e(n).form.needTitle,!0);return}let X=e(y)||Ia();if(e(T)!=="none"&&!ho(X)){if(!e(P)){v(P,!0),v(k,e(n).form.needTimeForReminder,!0);return}X=Ds(X)}v(P,!1),v(k,"");try{await t.onAdd({title:O,project_id:e(m),priority:e(h),due_date:X,estimated_pomodoros:e(w)>0?e(w):1,pomodoro_duration:e(f).focusDuration,reminder:e(T)==="none"?null:e(T),repeat:e(M)==="none"?null:e(M),repeat_config:e(M)==="custom"?e(D):null,tag_ids:e(x)}),v(_,""),v(m,t.defaultProjectId??null,!0),v(h,"medium"),v(y,t.defaultDueDate||Ia(),!0),v(w,0),v(T,"none"),v(P,!1),v(M,"none"),v(D,null),v(x,t.tags.length>0?[t.tags[0].id]:[],!0),v(L,!1)}catch(U){v(k,String(U),!0)}}function fe(O){O.preventDefault(),Y()}function ce(){e(L)||ho(e(y))||v(y,Ds(e(y)),!0),v(L,!e(L))}var ae=K_(),te=s(ae),G=s(te);Pn(G,{size:16,class:"plus-icon"});var ie=d(G,2),F=d(ie,2);Ee(F,20,()=>Array.from({length:6},(O,X)=>X+1),Wa,(O,X)=>{const U=j(()=>e(w)>=X);var Z=z_();let _e;var ye=s(Z);B_(ye,{size:14,get filled(){return e(U)}}),C(()=>{_e=et(Z,1,"tomato-btn svelte-1vpobhk",null,_e,{filled:e(U)}),I(Z,"aria-label",`${X} ${e(n).form.pomodoroUnit}`),I(Z,"aria-pressed",e(U))}),W("click",Z,()=>v(w,X,!0)),g(O,Z)});var R=d(F,2),ne=s(R),pe=d(te,2);{var me=O=>{var X=H_(),U=s(X);C(()=>p(U,e(k))),g(O,X)};se(pe,O=>{e(k)&&O(me)})}var B=d(pe,2);{var de=O=>{var X=Y_(),U=s(X),Z=s(U),_e=s(Z),ye=d(Z,2),ve=s(ye),ge=s(ve);ve.value=ve.__value="";var q=d(ve);Ee(q,17,()=>Oc(t.projects),$e=>$e.id,($e,gt)=>{var ft=Zo(),Nt=s(ft),Mt={};C(Ue=>{ft.disabled=e(gt).disabled,p(Nt,`${Ue??""}${e(gt).name??""}`),Mt!==(Mt=e(gt).id)&&(ft.value=(ft.__value=e(gt).id)??"")},[()=>"　".repeat(e(gt).depth)]),g($e,ft)});var re;Ht(ye);var ue=d(U,2),Se=s(ue),Ne=s(Se),je=d(Se,2),He=s(je),Ge=s(He);He.value=He.__value="high";var H=d(He),he=s(H);H.value=H.__value="medium";var K=d(H),b=s(K);K.value=K.__value="low";var S=d(K),$=s(S);S.value=S.__value="none";var J;Ht(je);var Q=d(ue,2),oe=s(Q),V=s(oe),xe=d(oe,2),ke=d(Q,2),Oe=s(ke),dt=s(Oe),ut=d(Oe,2),vt=d(ke,2),nt=s(vt),Ve=s(nt),Be=d(nt,2);Ee(Be,21,()=>r,$e=>$e.value,($e,gt)=>{var ft=Zo(),Nt=s(ft),Mt={};C(Ue=>{p(Nt,Ue),Mt!==(Mt=e(gt).value)&&(ft.value=(ft.__value=e(gt).value)??"")},[()=>i(e(gt).value)]),g($e,ft)});var be=d(vt,2),De=s(be),Xe=s(De),it=d(De,2);Ee(it,21,()=>o,$e=>$e.value,($e,gt)=>{var ft=Zo(),Nt=s(ft),Mt={};C(Ue=>{p(Nt,Ue),Mt!==(Mt=e(gt).value)&&(ft.value=(ft.__value=e(gt).value)??"")},[()=>u(e(gt).value)]),g($e,ft)});var rt=d(be,2);{var mt=$e=>{var gt=W_(),ft=s(gt),Nt=s(ft),Mt=d(ft,2);Ee(Mt,21,()=>t.tags,Ue=>Ue.id,(Ue,Fe)=>{const lt=j(()=>e(x).includes(e(Fe).id));var ee=U_();let Pe;var Re=s(ee);C(()=>{Pe=et(ee,1,"chip svelte-1vpobhk",null,Pe,{on:e(lt)}),I(ee,"aria-pressed",e(lt)),p(Re,e(Fe).name)}),W("click",ee,()=>v(x,e(lt)?e(x).filter(Je=>Je!==e(Fe).id):[...e(x),e(Fe).id],!0)),g(Ue,ee)}),C(()=>p(Nt,e(n).filter.tag)),g($e,gt)};se(rt,$e=>{t.tags.length>0&&$e(mt)})}var Tt=d(rt,2),Lt=s(Tt),Ut=s(Lt);C(()=>{p(_e,e(n).filter.project),p(ge,e(n).task.detailNoProject),re!==(re=e(m)??"")&&(ye.value=(ye.__value=e(m)??"")??"",qt(ye,e(m)??"")),p(Ne,e(n).filter.priority),p(Ge,e(n).priority.high),p(he,e(n).priority.medium),p(b,e(n).priority.low),p($,e(n).priority.none),J!==(J=e(h))&&(je.value=(je.__value=e(h))??"",qt(je,e(h))),p(V,e(n).filter.dueDate),p(dt,e(n).form.estimatedPomo),p(Ve,e(n).task.detailReminder),p(Xe,e(n).task.detailRepeat),p(Ut,e(n).form.submit)}),W("change",ye,$e=>{const gt=$e.currentTarget.value;v(m,gt||null,!0)}),W("change",je,$e=>{v(h,$e.currentTarget.value,!0)}),W("input",xe,$e=>{$e.currentTarget.value.length===16&&$e.currentTarget.blur()}),kt(xe,()=>e(y),$e=>v(y,$e)),kt(ut,()=>e(w),$e=>v(w,$e)),W("change",Be,()=>v(P,!1)),so(Be,()=>e(T),$e=>v(T,$e)),W("change",it,$e=>{$e.currentTarget.value==="custom"?v(A,!0):v(D,null)}),so(it,()=>e(M),$e=>v(M,$e)),W("click",Lt,Y),g(O,X)};se(B,O=>{e(L)&&O(de)})}var we=d(B,2);Bc(we,{get open(){return e(A)},get initialConfig(){return e(D)},onConfirm:O=>{v(D,O,!0),v(A,!1)},onClose:()=>v(A,!1)}),C(()=>{I(ie,"placeholder",e(n).form.titlePlaceholder),I(F,"aria-label",e(n).form.pomodoroIcons),p(ne,e(L)?e(n).form.collapse:e(n).form.more)}),Dt("submit",ae,fe),kt(ie,()=>e(_),O=>v(_,O)),W("click",R,ce),g(a,ae),pt()}xt(["click","change","input"]);//! 月历工具:ISO 日期格式化 + 自然周(周一起点)计算。
//! 手账视图(JournalView)与月度复盘面板(MonthReviewPanel)共用。
//! (v1 frontend/src/utils/calendar.ts 对应物,v1 12bc45a 抽取)
function yr(a){return String(a).padStart(2,"0")}function dn(a){return`${a.getFullYear()}-${yr(a.getMonth()+1)}-${yr(a.getDate())}`}function zc(a,t){const n=[],r=new Date(a,t-1,1);for(;r.getDay()!==1;)r.setDate(r.getDate()+1);for(;r.getMonth()===t-1;)n.push(new Date(r)),r.setDate(r.getDate()+7);return n}var V_=E('<button type="button"><!></button>');function X_(a,t){_t(t,!0);const n=j(bt);var r=V_();let o;var c=s(r);{var l=i=>{Ua(i,{size:10,strokeWidth:3,color:"#fff"})};se(c,i=>{t.completed&&i(l)})}C(()=>{o=et(r,1,"checkbox svelte-1bxwwxl",null,o,{completed:t.completed}),I(r,"aria-label",t.completed?e(n).common.ariaCompleted:e(n).common.ariaMarkDone)}),W("click",r,i=>{i.stopPropagation(),t.onToggle()}),g(a,r),pt()}xt(["click"]);var Qi=E("<option> </option>"),$_=E('<div class="no-task svelte-tr144z"> </div>'),J_=E('<div class="task-row svelte-tr144z"><!> <span> </span></div>'),Q_=E('<div class="day-cell svelte-tr144z"><div> </div> <!> <div class="day-divider svelte-tr144z"></div> <!></div>'),Z_=E('<section class="week-card svelte-tr144z"><div class="week-title svelte-tr144z"> </div> <div class="day-grid svelte-tr144z"></div> <div class="weekly-block svelte-tr144z"><div class="weekly-label svelte-tr144z"> </div> <!></div></section>'),ep=E('<div class="journal svelte-tr144z"><div class="inner svelte-tr144z"><div class="head svelte-tr144z"><h1 class="title svelte-tr144z"> </h1> <div class="month-nav svelte-tr144z"><button type="button" class="nav-btn svelte-tr144z"><!></button> <select class="select svelte-tr144z"></select> <select class="select svelte-tr144z"></select> <button type="button" class="nav-btn svelte-tr144z"><!></button></div></div> <div class="weeks svelte-tr144z"></div></div></div>');function tp(a,t){_t(t,!0);const n=j(bt),r=Array.from({length:61},(B,de)=>2026+de),o=Array.from({length:12},(B,de)=>de+1);let c=z(ze([])),l=z(ze([]));async function i(B,de){const we=dn(new Date(B,de-1,1)),O=dn(new Date(B,de,0));try{const[X,U]=await Promise.all([Dc(B,de),Gv(we,O)]);if(B!==t.year||de!==t.month)return;v(c,X,!0),v(l,U,!0)}catch(X){console.warn("journal load reviews failed",X)}}Pt(()=>{const B=t.year,de=t.month;i(B,de)});const u=j(()=>{const B=e(n).journal.weekday;return zc(t.year,t.month).map((de,we)=>{const O=Array.from({length:7},(Z,_e)=>{const ye=new Date(de);return ye.setDate(ye.getDate()+_e),ye}),X=O[6],U=O.map((Z,_e)=>({iso:dn(Z),label:`${B[_e]} ${Z.getMonth()+1}/${Z.getDate()}`}));return{startISO:dn(de),title:Ft(e(n).journal.weekRange,{n:we+1,ms:de.getMonth()+1,ds:de.getDate(),me:X.getMonth()+1,de:X.getDate()}),days:U}})});function f(B){return B===dn(new Date)}const _=j(()=>{const B=new Map;for(const de of t.tasks){const we=Jt(de.due_date);we&&(B.has(we)||B.set(we,[]),B.get(we).push(de))}return B}),m=j(()=>new Map(e(c).map(B=>[B.week_start,B]))),h=j(()=>new Map(e(l).map(B=>[B.date,B])));function y(){t.month===1?(t.onMonthChange(12),t.onYearChange(t.year-1)):t.onMonthChange(t.month-1)}function w(){t.month===12?(t.onMonthChange(1),t.onYearChange(t.year+1)):t.onMonthChange(t.month+1)}async function T(B){var de;try{B.status==="active"?await yc(B.id):await kc(B.id),(de=t.onTasksChange)==null||de.call(t)}catch(we){console.warn("journal toggle task failed",we)}}async function M(B,de){try{const we=e(h).get(B),O=we?{...we,content:de}:{id:crypto.randomUUID(),date:B,content:de,updated_at:new Date().toISOString()};await Tc(O),await i(t.year,t.month)}catch(we){console.warn("journal save daily review failed",we)}}async function D(B){try{await Sc(B),await i(t.year,t.month)}catch(de){console.warn("journal delete daily review failed",de)}}async function A(B,de){var we;try{const O=e(m).get(B),X=O?{...O,content:de}:{id:crypto.randomUUID(),week_start:B,content:de,updated_at:new Date().toISOString()};await Vv(X),await i(t.year,t.month),(we=t.onReviewChange)==null||we.call(t)}catch(O){console.warn("journal save weekly review failed",O)}}async function x(B){var de;try{await Xv(B),await i(t.year,t.month),(de=t.onReviewChange)==null||de.call(t)}catch(we){console.warn("journal delete weekly review failed",we)}}var L=ep(),k=s(L),P=s(k),Y=s(P),fe=s(Y),ce=d(Y,2),ae=s(ce),te=s(ae);tv(te,{size:16});var G=d(ae,2);Ee(G,20,()=>r,B=>B,(B,de)=>{var we=Qi(),O=s(we),X={};C(U=>{p(O,U),X!==(X=de)&&(we.value=(we.__value=de)??"")},[()=>Ft(e(n).journal.yearOption,{year:de})]),g(B,we)});var ie;Ht(G);var F=d(G,2);Ee(F,20,()=>o,B=>B,(B,de)=>{var we=Qi(),O=s(we),X={};C(U=>{p(O,U),X!==(X=de)&&(we.value=(we.__value=de)??"")},[()=>Ft(e(n).journal.monthOption,{month:de})]),g(B,we)});var R;Ht(F);var ne=d(F,2),pe=s(ne);Vn(pe,{size:16});var me=d(P,2);Ee(me,21,()=>e(u),B=>B.startISO,(B,de)=>{var we=Z_(),O=s(we),X=s(O),U=d(O,2);Ee(U,21,()=>e(de).days,ge=>ge.iso,(ge,q)=>{var re=Q_(),ue=s(re);let Se;var Ne=s(ue),je=d(ue,2);{var He=K=>{var b=$_(),S=s(b);C(()=>p(S,e(n).common.noData)),g(K,b)},Ge=j(()=>(e(_).get(e(q).iso)??[]).length===0),H=K=>{var b=qe(),S=Ae(b);Ee(S,17,()=>e(_).get(e(q).iso)??[],$=>$.id,($,J,Q,oe)=>{var V=J_(),xe=s(V);{let ut=j(()=>e(J).status==="completed");X_(xe,{get completed(){return e(ut)},onToggle:()=>T(e(J))})}var ke=d(xe,2);let Oe;var dt=s(ke);C(()=>{Oe=et(ke,1,"task-title svelte-tr144z",null,Oe,{done:e(J).status==="completed"}),p(dt,e(J).title)}),g($,V)}),g(K,b)};se(je,K=>{e(Ge)?K(He):K(H,-1)})}var he=d(je,4);{let K=j(()=>{var b;return((b=e(h).get(e(q).iso))==null?void 0:b.content)??null});fo(he,{get value(){return e(K)},get placeholder(){return e(n).journal.dailyReviewPlaceholder},rows:2,onSave:b=>M(e(q).iso,b),onDelete:()=>D(e(q).iso)})}C(K=>{Se=et(ue,1,"day-head svelte-tr144z",null,Se,K),p(Ne,e(q).label)},[()=>({today:f(e(q).iso)})]),g(ge,re)});var Z=d(U,2),_e=s(Z),ye=s(_e),ve=d(_e,2);{let ge=j(()=>{var q;return((q=e(m).get(e(de).startISO))==null?void 0:q.content)??null});fo(ve,{get value(){return e(ge)},get placeholder(){return e(n).journal.weeklyReviewPlaceholder},rows:5,onSave:q=>A(e(de).startISO,q),onDelete:()=>x(e(de).startISO)})}C(()=>{p(X,e(de).title),p(ye,e(n).journal.weeklyReview)}),g(B,we)}),C(B=>{p(fe,B),I(ae,"title",e(n).journal.prevMonth),I(ae,"aria-label",e(n).journal.prevMonth),I(G,"aria-label",e(n).journal.yearAria),ie!==(ie=t.year)&&(G.value=(G.__value=t.year)??"",qt(G,t.year)),I(F,"aria-label",e(n).journal.monthAria),R!==(R=t.month)&&(F.value=(F.__value=t.month)??"",qt(F,t.month)),I(ne,"title",e(n).journal.nextMonth),I(ne,"aria-label",e(n).journal.nextMonth)},[()=>Ft(e(n).journal.monthTitle,{year:t.year,month:t.month})]),W("click",ae,y),W("change",G,B=>t.onYearChange(Number(B.currentTarget.value))),W("change",F,B=>t.onMonthChange(Number(B.currentTarget.value))),W("click",ne,w),g(a,L),pt()}xt(["click","change"]);var ap=E('<div class="week-card svelte-w363gh"><div class="week-head svelte-w363gh"> </div> <div> </div></div>'),np=E('<aside class="panel svelte-w363gh"><h2 class="title svelte-w363gh"> </h2> <div class="weekly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <div class="week-list svelte-w363gh"></div></div> <div class="monthly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div></aside>');function rp(a,t){_t(t,!0);const n=j(bt);let r=z(ze([])),o=z(null);async function c(k,P){try{const[Y,fe]=await Promise.all([Dc(k,P),$v(`${k}-${yr(P)}`)]);if(k!==t.year||P!==t.month)return;v(r,Y,!0),v(o,fe,!0)}catch(Y){console.warn("month panel load failed",Y)}}Pt(()=>{const k=t.year,P=t.month;t.reviewVersion,c(k,P)});const l=j(()=>zc(t.year,t.month)),i=j(()=>{const k=new Map;for(const P of e(r))k.set(P.week_start,P.content);return k});async function u(k){try{const P=`${t.year}-${yr(t.month)}`,Y=e(o)?{...e(o),content:k}:{id:crypto.randomUUID(),year_month:P,content:k,updated_at:new Date().toISOString()};await Jv(Y),await c(t.year,t.month)}catch(P){console.warn("month panel save failed",P)}}async function f(){try{await Qv(`${t.year}-${yr(t.month)}`),await c(t.year,t.month)}catch(k){console.warn("month panel delete failed",k)}}var _=np(),m=s(_),h=s(m),y=d(m,2),w=s(y),T=s(w),M=d(w,2);Ee(M,23,()=>e(l),k=>dn(k),(k,P,Y)=>{const fe=j(()=>dn(e(P))),ce=j(()=>e(i).get(e(fe)));var ae=ap(),te=s(ae),G=s(te),ie=d(te,2);let F;var R=s(ie);C((ne,pe,me)=>{p(G,ne),F=et(ie,1,"week-content svelte-w363gh",null,F,pe),p(R,me)},[()=>Ft(e(n).monthPanel.weekRange,{n:e(Y)+1,date:e(fe)}),()=>{var ne;return{dimmed:!((ne=e(ce))!=null&&ne.trim())}},()=>{var ne;return(ne=e(ce))!=null&&ne.trim()?e(ce):e(n).monthPanel.empty}]),g(k,ae)});var D=d(y,2),A=s(D),x=s(A),L=d(A,2);{let k=j(()=>{var P;return((P=e(o))==null?void 0:P.content)??null});fo(L,{get value(){return e(k)},get placeholder(){return e(n).monthPanel.monthlyPlaceholder},rows:6,onSave:u,onDelete:f})}C((k,P)=>{I(_,"aria-label",k),p(h,P),p(T,e(n).monthPanel.weeklyReadonly),p(x,e(n).monthPanel.monthlyReview)},[()=>Ft(e(n).monthPanel.title,{year:t.year,month:t.month}),()=>Ft(e(n).monthPanel.title,{year:t.year,month:t.month})]),g(a,_),pt()}var op=E('<h1 class="title svelte-969q1d"> </h1>'),sp=E('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),ip=E('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),lp=E('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),cp=E('<p class="loading svelte-969q1d"> </p>'),dp=E('<p class="empty svelte-969q1d"><!></p>'),up=E('<div class="task-list svelte-969q1d"></div>'),vp=E('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),fp=E('<aside class="detail-empty svelte-969q1d"> </aside>'),hp=E('<div class="page page-veil svelte-969q1d"><!> <div class="main svelte-969q1d"><!></div> <!></div>');function _p(a,t){_t(t,!0);let n=z(ze([])),r=z(ze([])),o=z(ze([])),c=z(!0),l=z(null);const i=j(bt);let u=z(null),f=z("today"),_=z(""),m=z(null),h=z(ze(new Date().getFullYear())),y=z(new Date().getMonth()+1),w=z(0),T=z(null),M=z(null),D=z(null),A=z(null),x=z(""),L=z(""),k=z(null),P=z(null),Y=z(null),fe=z(null),ce=z(""),ae=z("");const te=j(()=>{let H=[...e(n)];const he={high:0,medium:1,low:2,none:3};if(e(_).trim()){const V=e(_).trim().toLowerCase();return H=H.filter(xe=>xe.title.toLowerCase().includes(V)),H.sort((xe,ke)=>{if(xe.status!==ke.status)return xe.status==="active"?-1:1;const Oe=he[xe.priority||"none"]??3,dt=he[ke.priority||"none"]??3;return Oe!==dt?Oe-dt:new Date(xe.created_at??0).getTime()-new Date(ke.created_at??0).getTime()}),H}const K=Ia(),b=Zr(),S=new Date,$=S.getDay(),J=$===0?6:$-1,Q=new Date(S);Q.setDate(Q.getDate()-J),Q.setHours(0,0,0,0);const oe=new Date(Q);return oe.setDate(oe.getDate()+6),oe.setHours(23,59,59,999),e(u)!==null?H=H.filter(V=>V.project_id===e(u)):e(f)==="today"?H=H.filter(V=>Jt(V.due_date)===K):e(f)==="tomorrow"?H=H.filter(V=>Jt(V.due_date)===b):e(f)==="week"?H=H.filter(V=>{if(!V.due_date)return!1;const xe=new Date(V.due_date);return xe>=Q&&xe<=oe}):e(f)==="planned"?H=G(H,{project:e(T),tag:e(M),priority:e(D),preset:e(A),startDate:e(x),endDate:e(L)}):e(f)==="completed"?(H=H.filter(V=>V.status==="completed"),H=G(H,{project:e(k),tag:e(P),priority:e(Y),preset:e(fe),startDate:e(ce),endDate:e(ae)})):e(f)==="journal"&&(H=H.filter(V=>!!V.due_date)),H.sort((V,xe)=>{if(V.status!==xe.status)return V.status==="active"?-1:1;const ke=he[V.priority||"none"]??3,Oe=he[xe.priority||"none"]??3;return ke!==Oe?ke-Oe:new Date(V.created_at??0).getTime()-new Date(xe.created_at??0).getTime()}),H});function G(H,he){let K=H;if(he.project!==null&&(K=K.filter(b=>b.project_id===he.project)),he.tag!==null&&(K=K.filter(b=>(b.tags??[]).some(S=>S.id===he.tag))),he.priority!==null&&(K=K.filter(b=>b.priority===he.priority)),he.preset==="week"){const b=new Date,S=b.getDay(),$=S===0?6:S-1,J=new Date(b);J.setDate(b.getDate()-$);const Q=new Date(J);Q.setDate(J.getDate()+6);const oe=Jt(J.toISOString()),V=Jt(Q.toISOString());K=K.filter(xe=>{const ke=Jt(xe.due_date);return!!ke&&ke>=oe&&ke<=V})}if(he.preset==="month"){const b=new Date,S=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}-01`,$=new Date(b.getFullYear(),b.getMonth()+1,0),J=Jt($.toISOString());K=K.filter(Q=>{const oe=Jt(Q.due_date);return!!oe&&oe>=S&&oe<=J})}return he.startDate&&(K=K.filter(b=>{const S=Jt(b.due_date);return!!S&&S>=he.startDate})),he.endDate&&(K=K.filter(b=>{const S=Jt(b.due_date);return!!S&&S<=he.endDate})),K}const ie=j(()=>{const H=e(te).filter($=>$.status==="active").reduce(($,J)=>$+(J.estimated_pomodoros||0)*(J.pomodoro_duration||25),0),he=e(te).filter($=>$.status==="active").length,K=e(te).reduce(($,J)=>$+(J.completed_pomodoros||0)*(J.pomodoro_duration||25),0),b=e(te).reduce(($,J)=>$+(J.completed_pomodoros||0),0),S=e(te).filter($=>$.status==="completed").length;return{estimatedMinutes:H,activeCount:he,focusedMinutes:K,completedCount:S,completedPomodoros:b}}),F=j(()=>{if(e(_).trim())return`${e(i).task.searchResult} (${e(te).length})`;if(e(u)!==null){const he=e(r).find(K=>K.id===e(u));return(he==null?void 0:he.name)||e(i).task.list}return{today:e(i).filter.today,tomorrow:e(i).filter.tomorrow,week:e(i).filter.week,planned:e(i).sidebar.planned,completed:e(i).sidebar.completed,journal:e(i).sidebar.journal,"":e(i).task.task}[e(f)]||e(i).task.task});async function R(){try{const[H,he,K]=await Promise.all([Mn({}),Vs(),Xs()]);if(v(n,H.map(b=>({...b,tags:b.tags??[]})),!0),v(r,he,!0),v(o,K,!0),e(m)){const b=e(n).find(S=>S.id===e(m).id);v(m,b??null,!0)}Hf()}catch(H){v(l,String(H),!0)}finally{v(c,!1)}}on(R);function ne(){return new Date().toISOString()}function pe(){return crypto.randomUUID()}async function me(H){const he=typeof H=="string"?H:H.id,K=typeof H=="string"?e(n).find(b=>b.id===he):H;if(K)try{K.status==="active"?await yc(he):await kc(he),await R()}catch(b){v(l,String(b),!0)}}async function B(H,he=null){try{await co({id:pe(),name:H,color:"#c97b6e",parent_id:he??null,created_at:ne(),updated_at:ne()}),await R()}catch(K){v(l,String(K),!0)}}async function de(H,he){try{const K=e(r).find(b=>b.id===H);if(!K)return;await co({...K,name:he,updated_at:ne()}),await R()}catch(K){v(l,String(K),!0)}}async function we(H){if(confirm(e(i).sidebar.deleteListConfirm))try{await wc(H),e(u)===H&&v(u,null),await R()}catch(he){v(l,String(he),!0)}}function O(H){v(m,H,!0)}function X(){v(m,null)}function U(){R()}async function Z(H){try{await Sf(H),vc("/timer")}catch(he){v(l,String(he),!0)}}async function _e(H){const he=H.due_date??(e(f)==="tomorrow"?Zr():Ia());try{const K=pe();await ys({id:K,title:H.title,description:"",project_id:H.project_id??e(u),priority:H.priority,status:"active",due_date:Ps(ho(he)?he:`${he}T00:00:00`),estimated_pomodoros:H.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:H.pomodoro_duration,reminder:H.reminder??"none",repeat:H.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:H.repeat_config??null,completed_at:null,created_at:ne(),updated_at:ne()},H.tag_ids),await R()}catch(K){v(l,String(K),!0)}}async function ye(){try{const H=await zh({defaultPath:`${e(i).export.fileName}_${Ia()}.xlsx`,filters:[{name:"xlsx",extensions:["xlsx"]}]});if(!H)return;const he=[e(i).export.index,e(i).export.title,e(i).export.project,e(i).export.priority,e(i).export.dueDate,e(i).export.estimated,e(i).export.tags,e(i).export.subtasks,e(i).export.status],K=e(te).map(b=>{var S;return{title:b.title,project:((S=e(r).find($=>$.id===b.project_id))==null?void 0:S.name)??"",priority:e(i).priority[b.priority??"none"]??b.priority??"",dueDate:b.due_date?b.due_date.slice(0,10):"",estimated:b.estimated_pomodoros??0,tags:(b.tags??[]).map($=>$.name).join(", "),subtasks:(b.subtasks??[]).map($=>$.title).join(`
`),status:b.status==="completed"?e(i).export.statusCompleted:e(i).export.statusActive}});await of(H,e(i).nav.tasks,he,K)}catch(H){v(l,String(H),!0)}}var ve=hp();Ir("969q1d",H=>{Nr(()=>{tr.title=e(i).page.tasks??""})});var ge=s(ve);r_(ge,{get projects(){return e(r)},get filter(){return e(f)},get selectedProject(){return e(u)},onSetFilter:H=>{v(f,H,!0),v(_,"")},onSelectProject:H=>{v(u,H,!0),v(_,"")},onCreateProject:B,onUpdateProject:de,onDeleteProject:we,get search(){return e(_)},onSearchChange:H=>{v(_,H,!0),H.trim()&&(v(u,null),v(f,""))},get tasks(){return e(n)}});var q=d(ge,2),re=s(q);{var ue=H=>{tp(H,{get year(){return e(h)},get month(){return e(y)},get tasks(){return e(te)},onYearChange:he=>v(h,he,!0),onMonthChange:he=>v(y,he,!0),onReviewChange:()=>v(w,e(w)+1),onTasksChange:()=>void R()})},Se=H=>{var he=vp(),K=s(he);{var b=be=>{var De=op(),Xe=s(De);C(()=>p(Xe,e(F))),g(be,De)};se(K,be=>{e(F)&&be(b)})}var S=d(K,2);{var $=be=>{var De=sp(),Xe=s(De);Yt(Xe,{get icon(){return Xn},get label(){return e(i).task.statFocused},get value(){return e(ie).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var it=d(Xe,2);Yt(it,{get icon(){return bs},get label(){return e(i).task.statCompletedPomo},get value(){return e(ie).completedPomodoros},get unit(){return e(i).stats.unitCount},accent:!0});var rt=d(it,2);Yt(rt,{get icon(){return ms},get label(){return e(i).task.statCompleted},get value(){return e(ie).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),g(be,De)},J=be=>{var De=ip(),Xe=s(De);Yt(Xe,{get icon(){return Xn},get label(){return e(i).task.statEstimated},get value(){return e(ie).estimatedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var it=d(Xe,2);Yt(it,{get icon(){return bs},get label(){return e(i).task.statActive},get value(){return e(ie).activeCount},get unit(){return e(i).stats.unitCount},accent:!0});var rt=d(it,2);Yt(rt,{get icon(){return Ws},get label(){return e(i).task.statFocused},get value(){return e(ie).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var mt=d(rt,2);Yt(mt,{get icon(){return ms},get label(){return e(i).task.statCompleted},get value(){return e(ie).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),g(be,De)};se(S,be=>{e(f)==="completed"?be($):be(J,-1)})}var Q=d(S,2);{var oe=be=>{Ji(be,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(k)},setFilterProject:De=>v(k,De,!0),get filterTag(){return e(P)},setFilterTag:De=>v(P,De,!0),get filterPriority(){return e(Y)},setFilterPriority:De=>v(Y,De,!0),get filterPreset(){return e(fe)},setFilterPreset:De=>v(fe,De,!0),get filterStartDate(){return e(ce)},setFilterStartDate:De=>v(ce,De,!0),get filterEndDate(){return e(ae)},setFilterEndDate:De=>v(ae,De,!0)})},V=be=>{Ji(be,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(T)},setFilterProject:De=>v(T,De,!0),get filterTag(){return e(M)},setFilterTag:De=>v(M,De,!0),get filterPriority(){return e(D)},setFilterPriority:De=>v(D,De,!0),get filterPreset(){return e(A)},setFilterPreset:De=>v(A,De,!0),get filterStartDate(){return e(x)},setFilterStartDate:De=>v(x,De,!0),get filterEndDate(){return e(L)},setFilterEndDate:De=>v(L,De,!0),onExport:ye})};se(Q,be=>{e(f)==="completed"?be(oe):e(f)==="planned"&&be(V,1)})}var xe=d(Q,2);{var ke=be=>{{let De=j(()=>e(f)==="tomorrow"?Zr():Ia());G_(be,{get projects(){return e(r)},get tags(){return e(o)},get defaultProjectId(){return e(u)},get defaultDueDate(){return e(De)},onAdd:_e})}};se(xe,be=>{e(f)!=="completed"&&be(ke)})}var Oe=d(xe,2);{var dt=be=>{var De=lp(),Xe=s(De),it=s(Xe),rt=d(Xe,2);C(()=>p(it,`⚠ ${e(l)??""}`)),W("click",rt,()=>v(l,null)),g(be,De)};se(Oe,be=>{e(l)&&be(dt)})}var ut=d(Oe,2);{var vt=be=>{var De=cp(),Xe=s(De);C(()=>p(Xe,e(i).common.loading)),g(be,De)},nt=be=>{var De=dp(),Xe=s(De);{var it=mt=>{var Tt=mi();C(()=>p(Tt,e(i).task.emptyAll)),g(mt,Tt)},rt=mt=>{var Tt=mi();C(()=>p(Tt,e(i).task.emptyFiltered)),g(mt,Tt)};se(Xe,mt=>{e(n).length===0?mt(it):mt(rt,-1)})}g(be,De)},Ve=be=>{j_(be,{get tasks(){return e(te)},groupBy:"due_date",get selectedTask(){return e(m)},onToggle:me,onSelect:O,onStart:Z})},Be=be=>{var De=up();Ee(De,21,()=>e(te),Xe=>Xe.id,(Xe,it)=>{{let rt=j(()=>{var mt;return((mt=e(m))==null?void 0:mt.id)===e(it).id});Rc(Xe,{get task(){return e(it)},get selected(){return e(rt)},onToggle:()=>me(e(it)),onSelect:O,onStart:Z})}}),g(be,De)};se(ut,be=>{e(c)?be(vt):e(te).length===0?be(nt,1):e(f)==="week"||e(f)==="planned"||e(f)==="completed"?be(Ve,2):be(Be,-1)})}g(H,he)};se(re,H=>{e(f)==="journal"?H(ue):H(Se,-1)})}var Ne=d(q,2);{var je=H=>{rp(H,{get year(){return e(h)},get month(){return e(y)},get reviewVersion(){return e(w)}})},He=H=>{C_(H,{get task(){return e(m)},get projects(){return e(r)},get allTags(){return e(o)},onClose:X,onChanged:U})},Ge=H=>{var he=fp(),K=s(he);C(()=>p(K,e(i).task.detailEmpty)),g(H,he)};se(Ne,H=>{e(f)==="journal"?H(je):e(m)?H(He,1):H(Ge,-1)})}g(a,ve),pt()}xt(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
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
const pp=[{key:"today",group:"day"},{key:"week",group:"day"},{key:"month",group:"day"},{key:"quarter",group:"week"},{key:"halfyear",group:"month"},{key:"year",group:"month"}];function Zi(a){return String(a).padStart(2,"0")}function Ct(a){return`${a.getFullYear()}-${Zi(a.getMonth()+1)}-${Zi(a.getDate())}`}function es(a,t){return Math.round((t.getTime()-a.getTime())/864e5)+1}function el(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today")return{start:Ct(n),end:Ct(n),days:1,group:"day"};if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Ct(i),end:Ct(u),days:7,group:"day"}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth(),1),u=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:Ct(i),end:Ct(u),days:u.getDate(),group:"day"}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),i*3,1),f=new Date(n.getFullYear(),i*3+3,0);return{start:Ct(u),end:Ct(f),days:es(u,f),group:"week"}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i,1),f=new Date(n.getFullYear(),i+6,0);return{start:Ct(u),end:Ct(f),days:es(u,f),group:"month"}}const c=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31);return{start:Ct(c),end:Ct(l),days:es(c,l),group:"month"}}function gp(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today"){const i=new Date(n);return i.setDate(n.getDate()-1),{start:Ct(i),end:Ct(i)}}if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o-7);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Ct(i),end:Ct(u)}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth()-1,1),u=new Date(n.getFullYear(),n.getMonth(),0);return{start:Ct(i),end:Ct(u)}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),(i-1)*3,1),f=new Date(n.getFullYear(),i*3,0);return{start:Ct(u),end:Ct(f)}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i-6,1),f=new Date(n.getFullYear(),i,0);return{start:Ct(u),end:Ct(f)}}const c=new Date(n.getFullYear()-1,0,1),l=new Date(n.getFullYear()-1,11,31);return{start:Ct(c),end:Ct(l)}}function Hc(a,t){return t==="month"?`${Number(a.slice(5,7))}`:`${Number(a.slice(5,7))}/${Number(a.slice(8,10))}`}function mp(a,t=new Date){return Ct(t)}var bp=E('<div class="empty svelte-1ixrxd8"> </div>'),yp=Cn('<text class="tick svelte-1ixrxd8" text-anchor="end"> </text>'),kp=Cn('<line class="grid svelte-1ixrxd8"></line><!>',1),wp=Cn('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),xp=Cn('<rect rx="3"></rect><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),Tp=E('<div class="tooltip svelte-1ixrxd8"> </div>'),Sp=E('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" class="svelte-1ixrxd8"><!><!></svg> <!></div>');function Dp(a,t){_t(t,!0);const n=j(bt),r=600,o=240,c={top:14,right:8,bottom:26,left:42},l=r-c.left-c.right,i=o-c.top-c.bottom,u=2,f=10,_=34;let m=z(null);function h(L){if(L<=0)return 0;const k=Math.pow(10,Math.floor(Math.log10(L))),P=L/k;return(P<=1?1:P<=2?2:P<=5?5:10)*k}function y(L,k){return Hc(L,k)}const w=j(()=>{const L=t.data.length,k=t.data.reduce((ie,F)=>Math.max(ie,F.minutes),0),P=h(k),Y=L>0?l/L:l,fe=Math.min(Y*.62,_),ce=Math.max(1,Math.ceil(L/f)),ae=t.group==="day"?mp():null,te=t.data.map((ie,F)=>{const R=ie.minutes>0&&P>0?Math.max(u,ie.minutes/P*i):u,ne=c.left+Y*F+(Y-fe)/2;return{i:F,key:ie.key,minutes:ie.minutes,x:ne,y:c.top+i-R,w:fe,h:R,hitX:c.left+Y*F,hitW:Y,label:y(ie.key,t.group),showLabel:F%ce===0||F===L-1,isCurrent:ae!==null&&ie.key===ae}}),G=[0,.25,.5,.75,1].map(ie=>({y:c.top+i-ie*i,value:Math.round(P*ie),labeled:ie===0||ie===.5||ie===1}));return{bars:te,gridlines:G}}),T=j(()=>e(m)!==null?e(w).bars[e(m)]:null);var M=qe(),D=Ae(M);{var A=L=>{var k=bp(),P=s(k);C(()=>p(P,t.emptyText??e(n).stats.noData)),g(L,k)},x=L=>{var k=Sp(),P=s(k);I(P,"viewBox","0 0 600 240");var Y=s(P);Ee(Y,17,()=>e(w).gridlines,Wa,(te,G)=>{var ie=kp(),F=Ae(ie),R=d(F);{var ne=pe=>{var me=yp(),B=s(me);C(()=>{I(me,"x",c.left-6),I(me,"y",e(G).y+3),p(B,e(G).value)}),g(pe,me)};se(R,pe=>{e(G).labeled&&pe(ne)})}C(()=>{I(F,"x1",c.left),I(F,"x2",r-c.right),I(F,"y1",e(G).y),I(F,"y2",e(G).y)}),g(te,ie)});var fe=d(Y);Ee(fe,17,()=>e(w).bars,te=>te.key,(te,G)=>{var ie=xp(),F=Ae(ie);let R;var ne=d(F);{var pe=B=>{var de=wp();I(de,"y",o-8);var we=s(de);C(()=>{I(de,"x",e(G).x+e(G).w/2),p(we,e(G).label)}),g(B,de)};se(ne,B=>{e(G).showLabel&&B(pe)})}var me=d(ne);C(()=>{R=et(F,0,"bar svelte-1ixrxd8",null,R,{zero:e(G).minutes===0,current:e(G).isCurrent}),I(F,"x",e(G).x),I(F,"y",e(G).y),I(F,"width",e(G).w),I(F,"height",e(G).h),I(me,"x",e(G).hitX),I(me,"y",c.top),I(me,"width",e(G).hitW),I(me,"height",i)}),Dt("pointerenter",me,()=>v(m,e(G).i,!0)),Dt("pointerleave",me,()=>v(m,null)),g(te,ie)});var ce=d(P,2);{var ae=te=>{var G=Tp();let ie;var F=s(G);C(R=>{ie=jt(G,"",ie,R),p(F,`${e(T).label??""} · ${e(T).minutes??""} ${e(n).stats.unitMin??""}`)},[()=>({left:Math.min(88,Math.max(12,(e(T).x+e(T).w/2)/r*100))+"%",top:e(T).y/o*100+"%"})]),g(te,G)};se(ce,te=>{e(T)&&te(ae)})}C(()=>I(P,"aria-label",e(n).stats.trendChartAria)),Dt("pointerleave",P,()=>v(m,null)),g(L,k)};se(D,L=>{t.data.length===0?L(A):L(x,-1)})}g(a,M),pt()}var Pp=E('<div class="empty svelte-s63rv4"> </div>'),Mp=Cn('<circle role="presentation" pathLength="100"></circle>'),Cp=E('<div class="tooltip svelte-s63rv4"> </div>'),Ep=E('<span><i class="dot svelte-s63rv4"></i> <span class="name svelte-s63rv4"> </span> <span class="minutes svelte-s63rv4"> </span></span>'),Ap=E('<div class="donut svelte-s63rv4"><div class="chart svelte-s63rv4"><svg role="img" class="svelte-s63rv4"><g></g></svg> <!></div> <div class="legend svelte-s63rv4"></div></div>');function Np(a,t){_t(t,!0);const n=j(bt),r=220,o=110,c=76,l=2/360*100,i=[90,75,60,45,30,15,0];function u(A){return`color-mix(in srgb, var(--color-accent, #e74c3c) ${i[A%i.length]}%, white)`}function f(A){return A>=i.length?Math.max(.4,1-(A-i.length+1)*.15):void 0}let _=z(null);const m=j(()=>t.projects.reduce((A,x)=>A+x.total_minutes,0)),h=j(()=>{if(e(m)<=0||t.projects.length===0)return[];const A=t.projects.length>1?l:0;let x=0;return t.projects.map((L,k)=>{const P=L.total_minutes/e(m),Y=Math.max(.6,P*100-A),fe=(x+P/2)/100*2*Math.PI-Math.PI/2,ce={i:k,p:L,len:Y,offset:x,color:u(k),opacity:f(k),tipX:o+c*Math.cos(fe),tipY:o+c*Math.sin(fe)};return x+=P*100,ce})}),y=j(()=>e(_)!==null?e(h)[e(_)]:null);var w=qe(),T=Ae(w);{var M=A=>{var x=Pp(),L=s(x);C(()=>p(L,t.emptyText??e(n).stats.noProject)),g(A,x)},D=A=>{var x=Ap(),L=s(x),k=s(L);I(k,"viewBox","0 0 220 220");var P=s(k);I(P,"transform","rotate(-90 110 110)"),Ee(P,21,()=>e(h),ae=>ae.p.project_id,(ae,te)=>{var G=Mp();let ie;I(G,"cx",o),I(G,"cy",o),I(G,"r",c);let F;C(()=>{ie=et(G,0,"seg svelte-s63rv4",null,ie,{hovered:e(_)===e(te).i}),I(G,"opacity",e(te).opacity),I(G,"stroke-dasharray",`${e(te).len??""} ${100-e(te).len}`),I(G,"stroke-dashoffset",-e(te).offset),F=jt(G,"",F,{stroke:e(te).color})}),Dt("pointerenter",G,()=>v(_,e(te).i,!0)),Dt("pointerleave",G,()=>v(_,null)),g(ae,G)});var Y=d(k,2);{var fe=ae=>{var te=Cp();let G;var ie=s(te);C(()=>{G=jt(te,"",G,{left:e(y).tipX/r*100+"%",top:e(y).tipY/r*100+"%"}),p(ie,`${e(y).p.project_name??""} · ${e(y).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),g(ae,te)};se(Y,ae=>{e(y)&&ae(fe)})}var ce=d(L,2);Ee(ce,21,()=>e(h),ae=>ae.p.project_id,(ae,te)=>{var G=Ep();let ie;var F=s(G);let R;var ne=d(F,2),pe=s(ne),me=d(ne,2),B=s(me);C(()=>{ie=et(G,1,"legend-item svelte-s63rv4",null,ie,{hovered:e(_)===e(te).i}),R=jt(F,"",R,{background:e(te).color,opacity:e(te).opacity??1}),p(pe,e(te).p.project_name),p(B,`${e(te).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),g(ae,G)}),C(()=>I(k,"aria-label",e(n).stats.donutChartAria)),g(A,x)};se(T,A=>{e(h).length===0?A(M):A(D,-1)})}g(a,w),pt()}var jp=E("<button> </button>"),Fp=E('<div class="error svelte-giv6a6" role="alert"> </div>'),Ip=E('<p class="loading svelte-giv6a6"> </p>'),qp=E('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),Lp=E('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section></div>',1),Rp=E('<div class="stats-veil page-veil svelte-giv6a6"><div class="page svelte-giv6a6"><h2 class="svelte-giv6a6"> </h2> <div class="dims svelte-giv6a6"></div> <!> <!></div></div>');function Op(a,t){_t(t,!0);const n=j(bt);let r=z("week"),o=z(null),c=z(0),l=z(!0),i=z(null),u=0;const f=j(()=>el(e(r))),_=j(()=>e(f).group),m=j(()=>e(_)==="day"?e(n).stats.byDay:e(_)==="week"?e(n).stats.byWeek:e(n).stats.byMonth),h=j(()=>({today:e(n).stats.dimToday,week:e(n).stats.dimWeek,month:e(n).stats.dimMonth,quarter:e(n).stats.dimQuarter,halfyear:e(n).stats.dimHalf,year:e(n).stats.dimYear})),y=j(()=>{var R;return((R=e(o))==null?void 0:R.summary.total_minutes)??0}),w=j(()=>{var R;return((R=e(o))==null?void 0:R.summary.total_sessions)??0}),T=j(()=>{var R;return((R=e(o))==null?void 0:R.summary.completed_tasks)??0}),M=j(()=>Math.round(e(y)/Math.max(1,e(f).days))),D=j(()=>{if(!e(o))return null;const R=e(o).trend;let ne=0,pe=0;for(const B of R)B.minutes>0?(pe++,ne=Math.max(ne,pe)):pe=0;let me={key:"",minutes:0,sessions:0};for(const B of R)B.minutes>me.minutes&&(me=B);return{activeDays:R.filter(B=>B.minutes>0).length,longest:ne,perPeriod:R.length>0?Math.round(e(y)/R.length):0,peak:me,projects:[...e(o).projects].sort((B,de)=>de.total_minutes-B.total_minutes)}}),A=j(()=>e(c)>0?Math.round((e(y)-e(c))/e(c)*100):e(y)>0?100:0),x=j(()=>`${e(A)>=0?"+":""}${e(A)}%`),L=j(()=>e(D)?e(D).projects:[]);Pt(()=>{const R=el(e(r)),ne=gp(e(r)),pe=++u;v(o,null),v(c,0),v(i,null),v(l,!0);const me=-new Date().getTimezoneOffset();Ii(R.start,R.end,R.group,me).then(B=>{pe===u&&(v(o,B,!0),v(l,!1))}).catch(B=>{pe===u&&(v(i,String(B),!0),v(l,!1))}),Ii(ne.start,ne.end,R.group,me).then(B=>{pe===u&&v(c,B.summary.total_minutes,!0)}).catch(()=>{})});var k=Rp();Ir("giv6a6",R=>{Nr(()=>{tr.title=e(n).page.stats??""})});var P=s(k),Y=s(P),fe=s(Y),ce=d(Y,2);Ee(ce,21,()=>pp,R=>R.key,(R,ne)=>{var pe=jp();let me;var B=s(pe);C(()=>{me=et(pe,1,"dim-pill svelte-giv6a6",null,me,{active:e(r)===e(ne).key}),I(pe,"aria-pressed",e(r)===e(ne).key),p(B,e(h)[e(ne).key])}),W("click",pe,()=>v(r,e(ne).key,!0)),g(R,pe)});var ae=d(ce,2);{var te=R=>{var ne=Fp(),pe=s(ne);C(me=>p(pe,`⚠ ${me??""}`),[()=>Ft(e(n).stats.loadError,{err:e(i)})]),g(R,ne)};se(ae,R=>{e(i)&&R(te)})}var G=d(ae,2);{var ie=R=>{var ne=Ip(),pe=s(ne);C(()=>p(pe,e(n).stats.loading)),g(R,ne)},F=R=>{var ne=Lp(),pe=Ae(ne),me=s(pe);Yt(me,{get icon(){return Xn},get label(){return e(n).stats.focusDuration},get value(){return e(y)},get unit(){return e(n).stats.unitMin},accent:!0});var B=d(me,2);Yt(B,{get icon(){return Ws},get label(){return e(n).stats.sessions},get value(){return e(w)},get unit(){return e(n).stats.unitCount},accent:!0});var de=d(B,2);Yt(de,{get icon(){return bs},get label(){return e(n).stats.completed},get value(){return e(T)},get unit(){return e(n).stats.unitCount},accent:!0});var we=d(de,2);Yt(we,{get icon(){return Uo},get label(){return e(n).stats.avg},get value(){return e(M)},get unit(){return e(n).stats.unitMin},accent:!0});var O=d(pe,2);{var X=Ne=>{var je=qp(),He=s(je);Yt(He,{get icon(){return ic},get label(){return e(n).stats.activeDays},get value(){return e(D).activeDays},get unit(){return e(n).stats.unitDay},accent:!0});var Ge=d(He,2);{var H=oe=>{Yt(oe,{get icon(){return rv},get label(){return e(n).stats.longestStreak},get value(){return e(D).longest},get unit(){return e(n).stats.unitDay},accent:!0})};se(Ge,oe=>{(e(r)==="month"||e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&oe(H)})}var he=d(Ge,2);{var K=oe=>{{let V=j(()=>e(_)==="week"?e(n).stats.avgWeek:e(n).stats.avgMonth);Yt(oe,{get icon(){return Uo},get label(){return e(V)},get value(){return e(D).perPeriod},get unit(){return e(n).stats.unitMin},accent:!0})}};se(he,oe=>{(e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&oe(K)})}var b=d(he,2);{var S=oe=>{{let V=j(()=>e(_)==="month"?e(n).stats.peakMonth:e(n).stats.peakPeriod),xe=j(()=>e(D).peak.key?Hc(e(D).peak.key,e(_)):"—"),ke=j(()=>e(D).peak.minutes?`${e(D).peak.minutes} ${e(n).stats.unitMin}`:"");Yt(oe,{get icon(){return Pi},get label(){return e(V)},get value(){return e(xe)},get unit(){return e(ke)},accent:!0})}};se(b,oe=>{(e(r)==="halfyear"||e(r)==="year")&&oe(S)})}var $=d(b,2);{var J=oe=>{{let V=j(()=>`${e(D).projects[0].total_minutes} ${e(n).stats.unitMin}`);Yt(oe,{get icon(){return Pi},get label(){return e(n).stats.bestProject},get value(){return e(D).projects[0].project_name},get unit(){return e(V)},accent:!0})}};se($,oe=>{(e(r)==="halfyear"||e(r)==="year")&&e(D).projects[0]&&oe(J)})}var Q=d($,2);Yt(Q,{get icon(){return Uo},get label(){return e(n).stats.momRatio},get value(){return e(x)},accent:!0}),g(Ne,je)};se(O,Ne=>{e(D)&&e(r)!=="today"&&Ne(X)})}var U=d(O,2);let Z;var _e=s(U),ye=s(_e),ve=s(ye),ge=d(ye,2);Dp(ge,{get data(){return e(o).trend},get group(){return e(_)}});var q=d(_e,2),re=s(q),ue=s(re),Se=d(re,2);Np(Se,{get projects(){return e(L)}}),C(()=>{Z=et(U,1,"charts svelte-giv6a6",null,Z,{split:e(r)!=="month"}),p(ve,`${e(n).stats.trendTitle??""}（${e(m)??""}）`),p(ue,e(n).stats.projectDist)}),g(R,ne)};se(G,R=>{e(l)?R(ie):e(o)&&R(F,1)})}C(()=>p(fe,e(n).nav.stats)),g(a,k),pt()}xt(["click"]);var Bp=E('<button type="button" role="switch"><span class="knob svelte-1re5fgf"></span></button>');function dr(a,t){_t(t,!0);let n=ma(t,"disabled",3,!1);var r=Bp();let o;C(()=>{o=et(r,1,"switch svelte-1re5fgf",null,o,{on:t.checked}),I(r,"aria-checked",t.checked),I(r,"aria-label",t.label),r.disabled=n()}),W("click",r,()=>t.onChange(!t.checked)),g(a,r),pt()}xt(["click"]);async function zp(){return await Ie("plugin:autostart|is_enabled")}async function Hp(){await Ie("plugin:autostart|enable")}async function Up(){await Ie("plugin:autostart|disable")}var Wr=E("<option> </option>"),Wp=E('<div class="error svelte-90mmv5" role="alert"> </div>'),Yp=E('<div><h2 class="tab-title svelte-90mmv5"> </h2> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <button type="button" class="action svelte-90mmv5"> </button></div></div> <p class="tray-hint svelte-90mmv5"> </p></section> <!></div>');function Kp(a,t){_t(t,!0);const n=j(bt),r=j(Xa),o=[1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90],c=[2,3,4,5,6];function l(Te,ot){return ot.includes(Te)?ot:[...ot,Te].sort((yt,Xt)=>yt-Xt)}let i=z(!1),u=z(!1),f=z(0),_=z(null);async function m(){try{v(i,await zp(),!0)}catch(Te){console.warn("isEnabled failed",Te),v(i,!1)}try{const Te=await Mn({status:"active"});v(f,Te.length,!0)}catch{}}Pt(()=>{m()}),Pt(()=>{e(r).focusDuration,e(r).shortBreakDuration,e(r).longBreakDuration,e(r).longBreakInterval,Cf()});function h(Te,ot){Ei({[Te]:ot})}function y(Te){Te&&e(r).autoStartBreak?Ei({disableBreak:!0,autoStartBreak:!1}):h("disableBreak",Te)}async function w(){if(!e(u)){v(u,!0),v(_,null);try{e(i)?(await Up(),v(i,!1)):(await Hp(),v(i,!0))}catch(Te){v(_,Ft(e(n).settings.autostartFail,{err:String(Te)}),!0)}finally{v(u,!1)}}}async function T(){v(_,null);try{let Te=await Do();if(Te||(Te=await Po()==="granted"),!Te){v(_,e(n).settings.notifPermDenied,!0);return}Mo({title:e(n).settings.testNotifTitle,body:Ft(e(n).settings.testNotifBody,{n:e(f)})})}catch(Te){v(_,Ft(e(n).settings.notifSendFail,{err:String(Te)}),!0)}}var M=Yp(),D=s(M),A=s(D),x=d(D,2),L=s(x),k=s(L),P=d(L,2),Y=s(P),fe=s(Y),ce=s(fe),ae=d(fe,2);Ee(ae,20,()=>l(e(r).focusDuration,o),Te=>Te,(Te,ot)=>{var yt=Wr(),Xt=s(yt),sa={};C(()=>{p(Xt,`${ot??""}${e(n).settings.minute??""}`),sa!==(sa=ot)&&(yt.value=(yt.__value=ot)??"")}),g(Te,yt)});var te;Ht(ae);var G=d(Y,2),ie=s(G),F=s(ie),R=d(ie,2);Ee(R,20,()=>l(e(r).shortBreakDuration,o),Te=>Te,(Te,ot)=>{var yt=Wr(),Xt=s(yt),sa={};C(()=>{p(Xt,`${ot??""}${e(n).settings.minute??""}`),sa!==(sa=ot)&&(yt.value=(yt.__value=ot)??"")}),g(Te,yt)});var ne;Ht(R);var pe=d(G,2),me=s(pe),B=s(me),de=d(me,2);Ee(de,20,()=>l(e(r).longBreakDuration,o),Te=>Te,(Te,ot)=>{var yt=Wr(),Xt=s(yt),sa={};C(()=>{p(Xt,`${ot??""}${e(n).settings.minute??""}`),sa!==(sa=ot)&&(yt.value=(yt.__value=ot)??"")}),g(Te,yt)});var we;Ht(de);var O=d(pe,2),X=s(O),U=s(X),Z=d(X,2);Ee(Z,20,()=>l(e(r).longBreakInterval,c),Te=>Te,(Te,ot)=>{var yt=Wr(),Xt=s(yt),sa={};C(()=>{p(Xt,`${ot??""}${e(n).settings.pomodoroUnit??""}`),sa!==(sa=ot)&&(yt.value=(yt.__value=ot)??"")}),g(Te,yt)});var _e;Ht(Z);var ye=d(x,2),ve=s(ye),ge=s(ve),q=d(ve,2),re=s(q),ue=s(re),Se=s(ue),Ne=s(Se),je=d(Se,2),He=s(je),Ge=d(ue,2);dr(Ge,{get checked(){return e(r).autoStartNextPomodoro},onChange:Te=>h("autoStartNextPomodoro",Te),get label(){return e(n).settings.autoStartNext}});var H=d(re,2),he=s(H),K=s(he),b=s(K),S=d(K,2),$=s(S),J=d(he,2);dr(J,{get checked(){return e(r).autoStartBreak},onChange:Te=>h("autoStartBreak",Te),get label(){return e(n).settings.autoStartBreak}});var Q=d(H,2),oe=s(Q),V=s(oe),xe=s(V),ke=d(V,2),Oe=s(ke),dt=d(oe,2);dr(dt,{get checked(){return e(r).disableBreak},onChange:y,get label(){return e(n).settings.disableBreak}});var ut=d(ye,2),vt=s(ut),nt=s(vt),Ve=d(vt,2),Be=s(Ve),be=s(Be),De=s(be),Xe=d(be,2);dr(Xe,{get checked(){return e(r).desktopNotificationEnabled},onChange:Te=>h("desktopNotificationEnabled",Te),get label(){return e(n).settings.systemNotification}});var it=d(Be,2),rt=s(it),mt=s(rt),Tt=s(mt),Lt=d(mt,2),Ut=s(Lt),$e=d(rt,2);dr($e,{get checked(){return e(i)},onChange:w,get label(){return e(n).settings.autostart},get disabled(){return e(u)}});var gt=d(it,2),ft=s(gt),Nt=s(ft),Mt=s(Nt),Ue=d(Nt,2),Fe=s(Ue),lt=d(ft,2),ee=s(lt),Pe=d(Ve,2),Re=s(Pe),Je=d(ut,2);{var St=Te=>{var ot=Wp(),yt=s(ot);C(()=>p(yt,`⚠ ${e(_)??""}`)),g(Te,ot)};se(Je,Te=>{e(_)&&Te(St)})}C(()=>{p(A,e(n).settings.timerTitle),p(k,e(n).settings.durationSetting),p(ce,e(n).settings.focusDuration),te!==(te=e(r).focusDuration)&&(ae.value=(ae.__value=e(r).focusDuration)??"",qt(ae,e(r).focusDuration)),p(F,e(n).settings.shortBreakDuration),ne!==(ne=e(r).shortBreakDuration)&&(R.value=(R.__value=e(r).shortBreakDuration)??"",qt(R,e(r).shortBreakDuration)),p(B,e(n).settings.longBreakDuration),we!==(we=e(r).longBreakDuration)&&(de.value=(de.__value=e(r).longBreakDuration)??"",qt(de,e(r).longBreakDuration)),p(U,e(n).settings.longBreakInterval),_e!==(_e=e(r).longBreakInterval)&&(Z.value=(Z.__value=e(r).longBreakInterval)??"",qt(Z,e(r).longBreakInterval)),p(ge,e(n).settings.behaviorSetting),p(Ne,e(n).settings.autoStartNext),p(He,e(n).settings.autoStartNextDesc),p(b,e(n).settings.autoStartBreak),p($,e(n).settings.autoStartBreakDesc),p(xe,e(n).settings.disableBreak),p(Oe,e(n).settings.disableBreakDesc),p(nt,e(n).settings.systemSection),p(De,e(n).settings.systemNotification),p(Tt,e(n).settings.autostart),p(Ut,e(n).settings.autostartHint),p(Mt,e(n).settings.notifTest),p(Fe,e(n).settings.notifTestHint),p(ee,e(n).settings.sendTest),p(Re,e(n).settings.trayHint)}),W("change",ae,Te=>h("focusDuration",Number(Te.currentTarget.value))),W("change",R,Te=>h("shortBreakDuration",Number(Te.currentTarget.value))),W("change",de,Te=>h("longBreakDuration",Number(Te.currentTarget.value))),W("change",Z,Te=>h("longBreakInterval",Number(Te.currentTarget.value))),W("click",lt,T),g(a,M),pt()}xt(["change","click"]);const _o=["#c97b6e","#d4945c","#d4a574","#b8a878","#7fa086","#6b9b8a","#5c8b84","#5c8fad","#7a8fb0","#8b7baf","#a68b78","#a8a298"],en=_o[0];var Gp=E('<div class="error svelte-1o455o6" role="alert"> </div>'),Vp=E('<div class="add-root-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),Xp=E('<button type="button" class="add-root-btn svelte-1o455o6"><!> </button>'),$p=E('<button type="button"></button>'),Jp=E('<div class="edit-box svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/> <div class="color-row svelte-1o455o6"></div> <div class="edit-actions svelte-1o455o6"><button type="button" class="link-btn svelte-1o455o6"> </button> <button type="button" class="save-btn svelte-1o455o6"> </button></div></div>'),Qp=E('<button type="button" class="chevron svelte-1o455o6"><!></button>'),Zp=E('<span class="chevron-spacer svelte-1o455o6"></span>'),eg=E('<button type="button" class="icon-btn svelte-1o455o6"><!></button>'),tg=E('<div role="treeitem" tabindex="-1" aria-selected="false"><span><!> <span class="dot svelte-1o455o6"></span> <span class="name svelte-1o455o6"> </span></span> <span class="actions svelte-1o455o6"><!> <button type="button" class="icon-btn svelte-1o455o6"><!></button> <button type="button" class="icon-btn danger svelte-1o455o6"><!></button></span></div>'),ag=E('<div class="add-child-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),ng=E('<div class="row-wrap svelte-1o455o6"><!> <!></div>'),rg=E('<div class="empty svelte-1o455o6"> </div>'),og=E('<div class="manager svelte-1o455o6"><h2 class="tab-title svelte-1o455o6"> </h2> <p class="drag-hint svelte-1o455o6"> </p> <!> <!> <div role="tree" tabindex="-1"><!> <!></div></div>');function sg(a,t){_t(t,!0);const n=j(bt);let r=z(ze([])),o=z(ze(new Set)),c=z("root"),l=z(""),i=z(null),u=z(""),f=z(ze(en)),_=z(null),m=z(null),h=z(null),y=z(!1);function w(){return new Date().toISOString()}async function T(){try{v(r,await Vs(),!0)}catch{}}on(()=>{T()}),Pt(()=>{if(!e(_))return;const b=window.setTimeout(()=>v(_,null),3e3);return()=>window.clearTimeout(b)});function M(b){const S=new Map,$=[];for(const oe of b)S.set(oe.id,{...oe,children:[],depth:0});for(const oe of b){const V=S.get(oe.id);V&&(oe.parent_id&&S.has(oe.parent_id)?S.get(oe.parent_id).children.push(V):$.push(V))}const J=oe=>{oe.sort((V,xe)=>(V.display_order??0)-(xe.display_order??0)||(V.created_at??"").localeCompare(xe.created_at??"")||V.id.localeCompare(xe.id)),oe.forEach(V=>J(V.children))};J($);const Q=(oe,V)=>{for(const xe of oe)xe.depth=V,Q(xe.children,V+1)};return Q($,0),$}function D(b,S){const $=[];for(const J of b)$.push(J),S.has(J.id)&&J.children.length>0&&$.push(...D(J.children,S));return $}const A=j(()=>M(e(r))),x=j(()=>D(e(A),e(o)));function L(b){const S=new Set(e(o));S.has(b)?S.delete(b):S.add(b),v(o,S,!0)}function k(){const b=new Map;for(const S of e(r))b.set(S.id,S.parent_id??null);return b}function P(){const b=new Map;for(const S of e(r)){const $=S.parent_id??null;b.has($)||b.set($,[]),b.get($).push(S.id)}return b}function Y(b,S){const $=S.get(b)??[];return $.length===0?1:1+Math.max(...$.map(J=>Y(J,S)))}function fe(b,S,$){let J=b;const Q=new Set;for(;J;){if(J===S)return!0;if(Q.has(J))return!1;Q.add(J),J=$.get(J)??null}return!1}async function ce(){const b=e(l).trim();if(!b)return;const S=e(c)==="root"?null:e(c),$=e(r).filter(J=>(J.parent_id??null)===S);try{await co({id:crypto.randomUUID(),name:b,color:en,parent_id:S,display_order:$.length,created_at:w(),updated_at:w()})}catch(J){v(_,String(J),!0)}if(v(l,""),v(c,null),S){const J=new Set(e(o));J.add(S),v(o,J,!0)}await T()}function ae(b){v(i,b.id,!0),v(u,b.name,!0),v(f,b.color??en,!0)}async function te(){if(!e(i))return;const b=e(u).trim();if(!b)return;const S=e(r).find($=>$.id===e(i));if(S){try{await co({...S,name:b,color:e(f),updated_at:w()})}catch($){v(_,String($),!0)}v(i,null),v(u,""),await T()}}async function G(b){try{await wc(b)}catch(S){v(_,String(S),!0)}await T()}function ie(b){return b.includes("exceed max depth")?e(n).settings.list.reorderFailDepth:b.includes("cycle")?e(n).settings.list.reorderFailCycle:e(n).settings.list.reorderFail}function F(b){return b.map(S=>({id:S.id,parent_id:S.parent_id??null,display_order:S.display_order??0}))}function R(b){const S=new Map;for(const J of b){const Q=J.parent_id??null;S.has(Q)||S.set(Q,[]),S.get(Q).push(J)}const $=new Map;for(const J of S.values())J.slice().sort((Q,oe)=>(Q.display_order??0)-(oe.display_order??0)).forEach((Q,oe)=>$.set(Q.id,oe));return b.map(J=>({...J,display_order:$.get(J.id)??0}))}async function ne(b,S){if(!e(r).find(V=>V.id===b))return;const J=e(r).filter(V=>(V.parent_id??null)===S&&V.id!==b).length,Q=e(r).map(V=>V.id===b?{...V,parent_id:S,display_order:J}:V),oe=R(Q);if(v(r,oe,!0),S){const V=new Set(e(o));V.add(S),v(o,V,!0)}try{await zv(F(oe)),await T()}catch(V){await T(),v(_,ie(String(V)),!0)}}function pe(b){const S=e(m);if(B(),!S||S===b.id)return;const $=e(r).find(oe=>oe.id===S);if(!$||($.parent_id??null)===b.id)return;const J=k();if(fe(b.id,S,J)){v(_,e(n).settings.list.reorderFailCycle,!0);return}const Q=Y(S,P());if(b.depth+Q>2){v(_,e(n).settings.list.reorderFailDepth,!0);return}ne(S,b.id)}function me(){const b=e(m);if(B(),!b)return;const S=e(r).find($=>$.id===b);if(S){if((S.parent_id??null)===null){const $=e(r).filter(J=>J.parent_id==null&&J.id!==b).length;if((S.display_order??0)===$)return}ne(b,null)}}function B(){v(m,null),v(h,null),v(y,!1)}function de(b,S){b.dataTransfer&&(v(m,S.id,!0),b.dataTransfer.effectAllowed="move",b.dataTransfer.setData("text/plain",S.id))}function we(b,S){e(m)&&(b.preventDefault(),b.stopPropagation(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),v(h,S.id,!0),v(y,!1))}function O(b,S){b.preventDefault(),b.stopPropagation(),pe(S)}function X(b){e(m)&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),v(y,!0),v(h,null))}function U(b){b.preventDefault(),me()}function Z(b){b.target===b.currentTarget&&v(y,!1)}var _e=og(),ye=s(_e),ve=s(ye),ge=d(ye,2),q=s(ge),re=d(ge,2);{var ue=b=>{var S=Gp(),$=s(S);C(()=>p($,e(_))),g(b,S)};se(re,b=>{e(_)&&b(ue)})}var Se=d(re,2);{var Ne=b=>{var S=Vp(),$=s(S);bn($,!0),C(()=>I($,"placeholder",e(n).settings.list.addRootPlaceholder)),W("keydown",$,J=>{J.key==="Enter"&&ce(),J.key==="Escape"&&(v(c,null),v(l,""))}),Dt("blur",$,()=>{e(l).trim()?ce():(v(c,null),v(l,""))}),kt($,()=>e(l),J=>v(l,J)),g(b,S)},je=b=>{var S=Xp(),$=s(S);Pn($,{size:16});var J=d($);C(()=>p(J,` ${e(n).settings.list.addRoot??""}`)),W("click",S,()=>{v(c,"root"),v(l,"")}),g(b,S)};se(Se,b=>{e(c)==="root"?b(Ne):b(je,-1)})}var He=d(Se,2);let Ge;var H=s(He);Ee(H,17,()=>e(x),b=>b.id,(b,S)=>{const $=j(()=>e(i)===e(S).id),J=j(()=>e(c)===e(S).id),Q=j(()=>e(S).children.length>0),oe=j(()=>e(o).has(e(S).id)),V=j(()=>!e($)&&!e(J)&&e(S).depth>0);var xe=ng(),ke=s(xe);{var Oe=nt=>{var Ve=Jp(),Be=s(Ve),be=d(Be,2);Ee(be,20,()=>_o,Tt=>Tt,(Tt,Lt)=>{var Ut=$p();let $e;C(gt=>{$e=et(Ut,1,"swatch svelte-1o455o6",null,$e,{active:e(f)===Lt}),jt(Ut,`background-color: ${Lt??""}`),I(Ut,"aria-label",gt)},[()=>Ft(e(n).settings.tag.colorAria,{color:Lt})]),W("click",Ut,()=>v(f,Lt,!0)),g(Tt,Ut)});var De=d(be,2),Xe=s(De),it=s(Xe),rt=d(Xe,2),mt=s(rt);C(()=>{I(Be,"placeholder",e(S).name),p(it,e(n).settings.repeatCustom.cancel),p(mt,e(n).settings.notification.save)}),W("keydown",Be,Tt=>{Tt.key==="Enter"&&te(),Tt.key==="Escape"&&(v(i,null),v(u,""))}),kt(Be,()=>e(u),Tt=>v(u,Tt)),W("click",Xe,()=>{v(i,null),v(u,"")}),W("click",rt,te),g(nt,Ve)},dt=nt=>{var Ve=tg();let Be;var be=s(Ve);let De;var Xe=s(be);{var it=Fe=>{var lt=Qp(),ee=s(lt);{var Pe=Je=>{Gn(Je,{size:14})},Re=Je=>{Vn(Je,{size:14})};se(ee,Je=>{e(oe)?Je(Pe):Je(Re,-1)})}C(()=>I(lt,"aria-label",e(oe)?e(n).common.expand:e(n).common.collapse)),W("click",lt,Je=>{Je.stopPropagation(),L(e(S).id)}),g(Fe,lt)},rt=Fe=>{var lt=Zp();g(Fe,lt)};se(Xe,Fe=>{e(Q)?Fe(it):Fe(rt,-1)})}var mt=d(Xe,2),Tt=d(mt,2),Lt=s(Tt),Ut=d(be,2),$e=s(Ut);{var gt=Fe=>{var lt=eg(),ee=s(lt);Pn(ee,{size:14}),C(()=>{I(lt,"title",e(n).settings.list.addChild),I(lt,"aria-label",e(n).settings.list.addChild)}),W("click",lt,Pe=>{Pe.stopPropagation(),v(c,e(S).id,!0),v(l,"")}),g(Fe,lt)};se($e,Fe=>{e(S).depth<2&&Fe(gt)})}var ft=d($e,2),Nt=s(ft);Ys(Nt,{size:14});var Mt=d(ft,2),Ue=s(Mt);qr(Ue,{size:14}),C(()=>{Be=et(Ve,1,"row svelte-1o455o6",null,Be,{"drop-over":e(h)===e(S).id&&e(m)!==e(S).id,dragging:e(m)===e(S).id}),I(Ve,"draggable",e(V)),De=et(be,1,"label svelte-1o455o6",null,De,{grabbable:e(V)}),jt(mt,`background-color: ${e(S).color??en??""}`),p(Lt,e(S).name),I(ft,"title",e(n).settings.list.edit),I(ft,"aria-label",e(n).settings.list.edit),I(Mt,"title",e(n).settings.list.del),I(Mt,"aria-label",e(n).settings.list.del)}),Dt("dragstart",Ve,Fe=>de(Fe,e(S))),Dt("dragover",Ve,Fe=>we(Fe,e(S))),Dt("drop",Ve,Fe=>O(Fe,e(S))),Dt("dragend",Ve,B),W("click",ft,Fe=>{Fe.stopPropagation(),ae(e(S))}),W("click",Mt,Fe=>{Fe.stopPropagation(),G(e(S).id)}),g(nt,Ve)};se(ke,nt=>{e($)?nt(Oe):nt(dt,-1)})}var ut=d(ke,2);{var vt=nt=>{var Ve=ag(),Be=s(Ve);bn(Be,!0),C(()=>I(Be,"placeholder",e(S).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)),W("keydown",Be,be=>{be.key==="Enter"&&ce(),be.key==="Escape"&&(v(c,null),v(l,""))}),Dt("blur",Be,()=>{e(l).trim()?ce():(v(c,null),v(l,""))}),kt(Be,()=>e(l),be=>v(l,be)),g(nt,Ve)};se(ut,nt=>{e(J)&&nt(vt)})}C(()=>jt(xe,`padding-left: ${e(S).depth*24}px`)),g(b,xe)});var he=d(H,2);{var K=b=>{var S=rg(),$=s(S);C(()=>p($,e(n).settings.list.empty)),g(b,S)};se(he,b=>{e(r).length===0&&e(c)!=="root"&&b(K)})}C(()=>{p(ve,e(n).settings.list.title),p(q,e(n).settings.list.dragHint),Ge=et(He,1,"tree svelte-1o455o6",null,Ge,{"over-root":e(y)})}),Dt("dragover",He,X),Dt("drop",He,U),Dt("dragleave",He,Z),g(a,_e),pt()}xt(["keydown","click"]);var tl=E('<button type="button"></button>'),ig=E('<div class="error svelte-1hwdvdh" role="alert"> </div>'),lg=E('<div class="edit-box svelte-1hwdvdh"><div class="edit-name-row svelte-1hwdvdh"><span class="name-label svelte-1hwdvdh"> </span> <input type="text" class="text-input svelte-1hwdvdh"/></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div> <div class="edit-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <button type="button" class="save-btn svelte-1hwdvdh"> </button></div></div>'),cg=E('<div class="tag-row svelte-1hwdvdh"><div class="tag-row-main svelte-1hwdvdh"><span class="grip svelte-1hwdvdh"><!></span> <span class="dot svelte-1hwdvdh"></span> <span class="tag-name svelte-1hwdvdh"> </span></div> <div class="tag-row-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <span class="sep svelte-1hwdvdh">|</span> <button type="button" class="link-btn danger svelte-1hwdvdh"> </button></div></div>'),dg=E('<div role="listitem" tabindex="-1"><!></div>'),ug=E('<div class="empty svelte-1hwdvdh"> </div>'),vg=E('<div><h2 class="tab-title svelte-1hwdvdh"> </h2> <div class="add-card svelte-1hwdvdh"><div class="add-row svelte-1hwdvdh"><input type="text" class="text-input svelte-1hwdvdh"/> <button type="button" class="add-btn svelte-1hwdvdh"> </button></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div></div> <!> <div class="tag-list svelte-1hwdvdh" role="list"></div> <!></div>');function fg(a,t){_t(t,!0);const n=j(bt);let r=z(ze([])),o=z(""),c=z(ze(en)),l=z(null),i=z(""),u=z(ze(en)),f=z(null),_=z(null),m=z(null);function h(){return new Date().toISOString()}async function y(){try{const U=await Xs();v(r,[...U].sort((Z,_e)=>(Z.display_order??0)-(_e.display_order??0)||(Z.created_at??"").localeCompare(_e.created_at??"")||Z.id.localeCompare(_e.id)),!0)}catch{}}on(()=>{y()}),Pt(()=>{if(!e(f))return;const U=window.setTimeout(()=>v(f,null),3e3);return()=>window.clearTimeout(U)});function w(U,Z,_e){const ye=U.slice(),[ve]=ye.splice(Z,1);return ye.splice(_e,0,ve),ye}async function T(){const U=e(o).trim();if(U)try{await ji({id:crypto.randomUUID(),name:U,color:e(c),display_order:e(r).length,created_at:h(),updated_at:h()}),v(o,""),await y()}catch(Z){v(f,String(Z),!0)}}async function M(U){try{await Hv(U),await y()}catch(Z){v(f,String(Z),!0)}}function D(U){v(l,U.id,!0),v(i,U.name,!0),v(u,U.color??en,!0)}async function A(){if(!e(l))return;const U=e(i).trim();if(!U)return;const Z=e(r).find(_e=>_e.id===e(l));if(Z){try{await ji({...Z,name:U,color:e(u),updated_at:h()})}catch(_e){v(f,String(_e),!0)}v(l,null),await y()}}function x(U,Z){U.dataTransfer&&(v(_,Z.id,!0),U.dataTransfer.effectAllowed="move",U.dataTransfer.setData("text/plain",Z.id))}function L(U,Z){!e(_)||e(_)===Z.id||(U.preventDefault(),U.stopPropagation(),U.dataTransfer&&(U.dataTransfer.dropEffect="move"),v(m,Z.id,!0))}function k(U,Z){U.preventDefault(),U.stopPropagation();const _e=e(_);if(v(_,null),v(m,null),!_e||_e===Z.id)return;const ye=e(r).findIndex(ue=>ue.id===_e),ve=e(r).findIndex(ue=>ue.id===Z.id);if(ye<0||ve<0)return;const ge=e(r),q=w(e(r),ye,ve);v(r,q,!0);const re=q.map((ue,Se)=>({id:ue.id,display_order:Se}));Uv(re).then(y).catch(async ue=>{v(r,ge,!0),await y(),v(f,String(ue)||e(n).settings.list.reorderFail,!0)})}function P(){v(_,null),v(m,null)}var Y=vg(),fe=s(Y),ce=s(fe),ae=d(fe,2),te=s(ae),G=s(te),ie=d(G,2),F=s(ie),R=d(te,2),ne=s(R),pe=s(ne),me=d(ne,2);Ee(me,20,()=>_o,U=>U,(U,Z)=>{var _e=tl();let ye;C(ve=>{ye=et(_e,1,"swatch svelte-1hwdvdh",null,ye,{active:e(c)===Z}),jt(_e,`background-color: ${Z??""}`),I(_e,"aria-label",ve)},[()=>Ft(e(n).settings.tag.colorAria,{color:Z})]),W("click",_e,()=>v(c,Z,!0)),g(U,_e)});var B=d(ae,2);{var de=U=>{var Z=ig(),_e=s(Z);C(()=>p(_e,e(f))),g(U,Z)};se(B,U=>{e(f)&&U(de)})}var we=d(B,2);Ee(we,21,()=>e(r),U=>U.id,(U,Z)=>{const _e=j(()=>e(l)===e(Z).id);var ye=dg();let ve;var ge=s(ye);{var q=ue=>{var Se=lg(),Ne=s(Se),je=s(Ne),He=s(je),Ge=d(je,2);bn(Ge,!0);var H=d(Ne,2),he=s(H),K=s(he),b=d(he,2);Ee(b,20,()=>_o,V=>V,(V,xe)=>{var ke=tl();let Oe;C(dt=>{Oe=et(ke,1,"swatch sm svelte-1hwdvdh",null,Oe,{active:e(u)===xe}),jt(ke,`background-color: ${xe??""}`),I(ke,"aria-label",dt)},[()=>Ft(e(n).settings.tag.colorAria,{color:xe})]),W("click",ke,()=>v(u,xe,!0)),g(V,ke)});var S=d(H,2),$=s(S),J=s($),Q=d($,2),oe=s(Q);C(()=>{p(He,e(n).settings.tag.nameLabel),p(K,e(n).settings.tag.colorLabel),p(J,e(n).settings.repeatCustom.cancel),p(oe,e(n).settings.notification.save)}),W("keydown",Ge,V=>{V.key==="Enter"&&A(),V.key==="Escape"&&v(l,null)}),kt(Ge,()=>e(i),V=>v(i,V)),W("click",$,()=>v(l,null)),W("click",Q,A),g(ue,Se)},re=ue=>{var Se=cg(),Ne=s(Se),je=s(Ne),He=s(je);sv(He,{size:16});var Ge=d(je,2),H=d(Ge,2),he=s(H),K=d(Ne,2),b=s(K),S=s(b),$=d(b,4),J=s($);C(()=>{I(je,"aria-label",e(n).settings.tag.dragHandle),I(je,"title",e(n).settings.tag.dragHandle),jt(Ge,`background-color: ${e(Z).color??en??""}`),p(he,e(Z).name),p(S,e(n).settings.list.edit),p(J,e(n).settings.list.del)}),W("click",b,()=>D(e(Z))),W("click",$,()=>void M(e(Z).id)),g(ue,Se)};se(ge,ue=>{e(_e)?ue(q):ue(re,-1)})}C(()=>{ve=et(ye,1,"tag-card svelte-1hwdvdh",null,ve,{dragging:e(_)===e(Z).id,"drop-over":e(m)===e(Z).id&&e(_)!==null&&e(_)!==e(Z).id}),I(ye,"draggable",!e(_e))}),Dt("dragstart",ye,ue=>x(ue,e(Z))),Dt("dragover",ye,ue=>L(ue,e(Z))),Dt("drop",ye,ue=>k(ue,e(Z))),Dt("dragend",ye,P),g(U,ye)});var O=d(we,2);{var X=U=>{var Z=ug(),_e=s(Z);C(()=>p(_e,e(n).settings.tag.empty)),g(U,Z)};se(O,U=>{e(r).length===0&&U(X)})}C(()=>{p(ce,e(n).settings.tab.tags),I(G,"placeholder",e(n).settings.tag.namePlaceholder),p(F,e(n).settings.tag.add),p(pe,e(n).settings.tag.colorLabel)}),W("keydown",G,U=>{U.key==="Enter"&&T()}),kt(G,()=>e(o),U=>v(o,U)),W("click",ie,T),g(a,Y),pt()}xt(["keydown","click"]);var al=E('<span class="badge svelte-wf1h2h"><!></span>'),hg=E('<button type="button"><!> <span class="card-name svelte-wf1h2h"> </span></button>'),_g=E('<button type="button"><!> <span class="card-name corner svelte-wf1h2h"> </span></button>'),pg=E('<p class="used svelte-wf1h2h"><!> </p>'),gg=E('<div class="thumb svelte-wf1h2h"></div> <span class="used svelte-wf1h2h"><!> </span> <button type="button" class="clear-btn svelte-wf1h2h"><!> </button>',1),mg=E('<p class="fail svelte-wf1h2h" role="alert"> </p>'),bg=E('<button type="button" class="reset-btn svelte-wf1h2h"><!> </button>'),yg=E('<div class="setting svelte-wf1h2h"><h2 class="tab-title svelte-wf1h2h"> </h2> <p class="desc svelte-wf1h2h"> </p> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div> <p class="hint svelte-wf1h2h"> </p> <!></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="custom-row svelte-wf1h2h"><label class="upload-btn svelte-wf1h2h"><input type="file" accept="image/*" class="file-input svelte-wf1h2h"/> <!> </label> <!></div> <!> <p class="hint svelte-wf1h2h"> </p></section> <!></div>');function kg(a,t){_t(t,!0);const n=j(bt),r=j(ih),o=j(lh);let c=z(!1);async function l(ve){var ue;const ge=ve.currentTarget,q=(ue=ge.files)==null?void 0:ue[0];if(!q)return;v(c,!1);const re=await vh(q);re?uh(re):v(c,!0),ge.value=""}const i=j(()=>{var ve;return((ve=e(o))==null?void 0:ve.kind)==="preset"?e(o).id:null}),u=j(()=>{var ve;return((ve=e(o))==null?void 0:ve.kind)==="custom"}),f=j(()=>{var ve;return e(r)==="default"&&((ve=e(o))==null?void 0:ve.kind)==="preset"&&e(o).id==="preset-bg-1"}),_=j(()=>{var ve,ge;if(((ve=e(o))==null?void 0:ve.kind)==="preset"){const q=vo.find(re=>re.id===e(o).id);return q?`background-image: ${q.url}`:null}return((ge=e(o))==null?void 0:ge.kind)==="custom"?`background-image: ${e(o).url}`:null});var m=yg(),h=s(m),y=s(h),w=d(h,2),T=s(w),M=d(w,2),D=s(M),A=s(D),x=d(D,2);Ee(x,21,()=>Ic,ve=>ve.id,(ve,ge)=>{const q=j(()=>e(r)===e(ge).id);var re=hg();let ue;var Se=s(re);{var Ne=Ge=>{var H=al(),he=s(H);Ua(he,{size:11,strokeWidth:3}),g(Ge,H)};se(Se,Ge=>{e(q)&&Ge(Ne)})}var je=d(Se,2),He=s(je);C(()=>{ue=et(re,1,"card svelte-wf1h2h",null,ue,{active:e(q)}),jt(re,`background: ${e(ge).preview??""}`),I(re,"title",e(n).settings.theme.presetName[e(ge).id]),I(re,"aria-pressed",e(q)),p(He,e(n).settings.theme.presetName[e(ge).id])}),W("click",re,()=>ch(e(ge).id)),g(ve,re)});var L=d(M,2),k=s(L),P=s(k),Y=d(k,2);Ee(Y,21,()=>vo,ve=>ve.id,(ve,ge)=>{const q=j(()=>e(i)===e(ge).id);var re=_g();let ue;var Se=s(re);{var Ne=Ge=>{var H=al(),he=s(H);Ua(he,{size:11,strokeWidth:3}),g(Ge,H)};se(Se,Ge=>{e(q)&&Ge(Ne)})}var je=d(Se,2),He=s(je);C(()=>{ue=et(re,1,"card cover svelte-wf1h2h",null,ue,{active:e(q)}),jt(re,`background-image: ${e(ge).url??""}`),I(re,"title",e(n).settings.theme.presetBgName[e(ge).id]),I(re,"aria-pressed",e(q)),p(He,e(n).settings.theme.presetBgName[e(ge).id])}),W("click",re,()=>dh(e(ge).id)),g(ve,re)});var fe=d(Y,2),ce=s(fe),ae=d(fe,2);{var te=ve=>{var ge=pg(),q=s(ge);Ua(q,{size:13});var re=d(q);C(()=>p(re,` ${e(n).settings.theme.presetBgUsed??""}`)),g(ve,ge)};se(ae,ve=>{e(i)&&ve(te)})}var G=d(L,2),ie=s(G),F=s(ie),R=d(ie,2),ne=s(R),pe=s(ne),me=d(pe,2);xv(me,{size:14});var B=d(me),de=d(ne,2);{var we=ve=>{var ge=gg(),q=Ae(ge),re=d(q,2),ue=s(re);Ua(ue,{size:13});var Se=d(ue),Ne=d(re,2),je=s(Ne);Ks(je,{size:12});var He=d(je);C(()=>{jt(q,e(_)),I(q,"aria-label",e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed),p(Se,` ${(e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed)??""}`),p(He,` ${e(n).settings.theme.clearBg??""}`)}),W("click",Ne,function(...Ge){Xo==null||Xo.apply(this,Ge)}),g(ve,ge)};se(de,ve=>{e(o)&&e(_)&&ve(we)})}var O=d(R,2);{var X=ve=>{var ge=mg(),q=s(ge);C(()=>p(q,e(n).settings.theme.compressFail)),g(ve,ge)};se(O,ve=>{e(c)&&ve(X)})}var U=d(O,2),Z=s(U),_e=d(G,2);{var ye=ve=>{var ge=bg(),q=s(ge);hv(q,{size:12});var re=d(q);C(()=>p(re,` ${e(n).settings.theme.reset??""}`)),W("click",ge,function(...ue){$o==null||$o.apply(this,ue)}),g(ve,ge)};se(_e,ve=>{e(f)||ve(ye)})}C(()=>{p(y,e(n).settings.theme.title),p(T,e(n).settings.theme.desc),p(A,e(n).settings.theme.preset),p(P,e(n).settings.theme.presetBg),p(ce,e(n).settings.theme.presetBgHint),p(F,e(n).settings.theme.custom),p(B,` ${e(n).settings.theme.upload??""}`),p(Z,e(n).settings.theme.customHint)}),W("change",pe,l),g(a,m),pt()}xt(["click","change"]);var wg=E('<div class="error svelte-16699lq" role="alert"> </div>'),xg=E('<div class="empty svelte-16699lq"> </div>'),Tg=E('<div class="item svelte-16699lq"><div class="item-main svelte-16699lq"><div class="item-text svelte-16699lq"> </div> <div class="item-author svelte-16699lq"> </div></div> <button type="button" class="del-btn svelte-16699lq"><!></button></div>'),Sg=E('<div class="manager svelte-16699lq"><h2 class="tab-title svelte-16699lq"> </h2> <div class="add-card svelte-16699lq"><textarea class="textarea svelte-16699lq"></textarea> <div class="author-row svelte-16699lq"><input type="text" class="author-input svelte-16699lq"/> <button type="button" class="add-btn svelte-16699lq"><!> </button></div></div> <!> <div class="list svelte-16699lq"><!> <!></div></div>');function Dg(a,t){_t(t,!0);const n=j(bt),r=500,o=64;let c=z(ze([])),l=z(""),i=z(""),u=z(null);function f(){return new Date().toISOString()}async function _(){try{v(c,await Mc(),!0)}catch{}}on(()=>{_()}),Pt(()=>{if(!e(u))return;const F=window.setTimeout(()=>v(u,null),3e3);return()=>window.clearTimeout(F)});function m(){const F=e(l).trim();return F.length<1?e(n).settings.motto.textRequired:F.length>r?e(n).settings.motto.textTooLong:e(i).trim().length>o?e(n).settings.motto.authorTooLong:null}async function h(){const F=m();if(F){v(u,F,!0);return}try{await ef({id:crypto.randomUUID(),text:e(l).trim(),author:e(i).trim()||null,created_at:f(),updated_at:f()}),v(l,""),v(i,""),await _(),Ui()}catch(R){v(u,String(R),!0)}}async function y(F){try{await tf(F),await _(),Ui()}catch(R){v(u,String(R),!0)}}var w=Sg(),T=s(w),M=s(T),D=d(T,2),A=s(D);I(A,"rows",2);var x=d(A,2),L=s(x),k=d(L,2),P=s(k);Pn(P,{size:14});var Y=d(P),fe=d(D,2);{var ce=F=>{var R=wg(),ne=s(R);C(()=>p(ne,e(u))),g(F,R)};se(fe,F=>{e(u)&&F(ce)})}var ae=d(fe,2),te=s(ae);{var G=F=>{var R=xg(),ne=s(R);C(()=>p(ne,e(n).settings.motto.empty)),g(F,R)};se(te,F=>{e(c).length===0&&F(G)})}var ie=d(te,2);Ee(ie,17,()=>e(c),F=>F.id,(F,R)=>{var ne=Tg(),pe=s(ne),me=s(pe),B=s(me),de=d(me,2),we=s(de),O=d(pe,2),X=s(O);qr(X,{size:14}),C(U=>{p(B,e(R).text),p(we,`—— ${U??""}`),I(O,"aria-label",e(n).settings.list.del)},[()=>{var U;return(U=e(R).author)!=null&&U.trim()?e(R).author:e(n).settings.motto.defaultAuthor}]),W("click",O,()=>void y(e(R).id)),g(F,ne)}),C(()=>{p(M,e(n).settings.motto.title),I(A,"placeholder",e(n).settings.motto.addPlaceholder),I(L,"placeholder",e(n).settings.motto.authorPlaceholder),p(Y,` ${e(n).settings.motto.addBtn??""}`)}),kt(A,()=>e(l),F=>v(l,F)),W("keydown",L,F=>{F.key==="Enter"&&h()}),kt(L,()=>e(i),F=>v(i,F)),W("click",k,h),g(a,w),pt()}xt(["keydown","click"]);var Pg=E("<option> </option>"),Mg=E('<div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style-desc"> </label> <input id="notif-style-desc" type="text" class="text-input svelte-s7babn"/></div>'),Cg=E('<span class="saved svelte-s7babn"> </span>'),Eg=E('<span class="save-error svelte-s7babn" role="alert"> </span>'),Ag=E('<div class="setting svelte-s7babn"><h2 class="tab-title svelte-s7babn"> </h2> <div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style"> </label> <select id="notif-style" class="select svelte-s7babn"></select> <p class="hint svelte-s7babn"> </p></div> <!> <div class="fields svelte-s7babn"><section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-fe-title"> </label> <input id="ntf-fe-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-fe-body"> </label> <input id="ntf-fe-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-be-title"> </label> <input id="ntf-be-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-be-body"> </label> <input id="ntf-be-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-rm-title"> </label> <input id="ntf-rm-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-rm-body"> </label> <input id="ntf-rm-body" type="text" class="text-input svelte-s7babn"/> <p class="hint svelte-s7babn"> </p></section></div> <div class="save-row svelte-s7babn"><button type="button" class="save-btn svelte-s7babn"><!> </button> <!> <!></div></div>');function Ng(a,t){_t(t,!0);const n=j(bt),r=j(So);let o=z("default"),c=z(""),l=z(null),i=z(ze({focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""})),u=z(!1),f=z(null);const _=j(()=>e(o)==="custom");on(()=>{Cc().then(Q=>{v(o,Q.style||"default",!0),v(c,Q.style_description||"",!0),v(l,Q,!0)}).catch(()=>{})}),Pt(()=>{if(e(_))e(l)&&v(i,{focus_end_title:e(l).focus_end_title||"",focus_end_body:e(l).focus_end_body||"",break_end_title:e(l).break_end_title||"",break_end_body:e(l).break_end_body||"",reminder_title:e(l).reminder_title||"",reminder_body:e(l).reminder_body||""},!0);else{const Q=(e(r)==="en"?gc:pc)[e(o)];v(i,{focus_end_title:Q.focus_end_title,focus_end_body:Q.focus_end_body,break_end_title:Q.break_end_title,break_end_body:Q.break_end_body,reminder_title:Q.reminder_title,reminder_body:Q.reminder_body},!0)}});async function m(){v(f,null);const Q={id:"1",style:e(o),style_description:e(_)?e(c):null,focus_end_title:e(i).focus_end_title,focus_end_body:e(i).focus_end_body,break_end_title:e(i).break_end_title,break_end_body:e(i).break_end_body,reminder_title:e(i).reminder_title,reminder_body:e(i).reminder_body};try{const oe=await af(Q);v(l,oe,!0),await Ac(),v(u,!0),window.setTimeout(()=>v(u,!1),2e3)}catch(oe){v(f,String(oe),!0)}}var h=Ag(),y=s(h),w=s(y),T=d(y,2),M=s(T),D=s(M),A=d(M,2);Ee(A,21,()=>Lv,Q=>Q.key,(Q,oe)=>{var V=Pg(),xe=s(V),ke={};C(()=>{p(xe,e(n).settings.notification.styleName[e(oe).key]),ke!==(ke=e(oe).key)&&(V.value=(V.__value=e(oe).key)??"")}),g(Q,V)});var x=d(A,2),L=s(x),k=d(T,2);{var P=Q=>{var oe=Mg(),V=s(oe),xe=s(V),ke=d(V,2);C(()=>{p(xe,e(n).settings.notification.styleDesc),I(ke,"placeholder",e(n).settings.notification.styleDescPlaceholder)}),kt(ke,()=>e(c),Oe=>v(c,Oe)),g(Q,oe)};se(k,Q=>{e(_)&&Q(P)})}var Y=d(k,2),fe=s(Y),ce=s(fe),ae=s(ce),te=d(ce,2),G=s(te),ie=d(te,2),F=d(ie,2),R=s(F),ne=d(F,2),pe=d(fe,2),me=s(pe),B=s(me),de=d(me,2),we=s(de),O=d(de,2),X=d(O,2),U=s(X),Z=d(X,2),_e=d(pe,2),ye=s(_e),ve=s(ye),ge=d(ye,2),q=s(ge),re=d(ge,2),ue=d(re,2),Se=s(ue),Ne=d(ue,2),je=d(Ne,2),He=s(je),Ge=d(Y,2),H=s(Ge),he=s(H);_v(he,{size:14});var K=d(he),b=d(H,2);{var S=Q=>{var oe=Cg(),V=s(oe);C(()=>p(V,e(n).settings.notification.saved)),g(Q,oe)};se(b,Q=>{e(u)&&Q(S)})}var $=d(b,2);{var J=Q=>{var oe=Eg(),V=s(oe);C(()=>p(V,e(f))),g(Q,oe)};se($,Q=>{e(f)&&Q(J)})}C(()=>{p(w,e(n).settings.notification.title),p(D,e(n).settings.notification.styleLabel),p(L,e(_)?e(n).settings.notification.styleHintCustom:e(n).settings.notification.styleHintPreset),p(ae,e(n).settings.notification.focusEnd),p(G,e(n).settings.notification.titleLabel),ie.disabled=!e(_),p(R,e(n).settings.notification.bodyLabel),ne.disabled=!e(_),p(B,e(n).settings.notification.breakEnd),p(we,e(n).settings.notification.titleLabel),O.disabled=!e(_),p(U,e(n).settings.notification.bodyLabel),Z.disabled=!e(_),p(ve,e(n).settings.notification.reminder),p(q,e(n).settings.notification.titleLabel),re.disabled=!e(_),p(Se,e(n).settings.notification.bodyLabel),Ne.disabled=!e(_),p(He,e(n).settings.notification.placeholderHint),p(K,` ${e(n).settings.notification.save??""}`)}),so(A,()=>e(o),Q=>v(o,Q)),kt(ie,()=>e(i).focus_end_title,Q=>e(i).focus_end_title=Q),kt(ne,()=>e(i).focus_end_body,Q=>e(i).focus_end_body=Q),kt(O,()=>e(i).break_end_title,Q=>e(i).break_end_title=Q),kt(Z,()=>e(i).break_end_body,Q=>e(i).break_end_body=Q),kt(re,()=>e(i).reminder_title,Q=>e(i).reminder_title=Q),kt(Ne,()=>e(i).reminder_body,Q=>e(i).reminder_body=Q),W("click",H,m),g(a,h),pt()}xt(["click"]);var jg=E('<span class="badge svelte-hb0yns"><!></span>'),Fg=E('<button type="button"><!> <span class="label svelte-hb0yns"> </span> <span class="sub svelte-hb0yns"> </span></button>'),Ig=E('<div><h2 class="tab-title svelte-hb0yns"> </h2> <p class="desc svelte-hb0yns"> </p> <div class="options svelte-hb0yns"></div></div>');function qg(a,t){_t(t,!0);const n=j(bt),r=j(So),o=[{key:"zh",label:"中文",sub:"Chinese"},{key:"en",label:"English",sub:"英文"}];var c=Ig(),l=s(c),i=s(l),u=d(l,2),f=s(u),_=d(u,2);Ee(_,21,()=>o,m=>m.key,(m,h)=>{const y=j(()=>e(r)===e(h).key);var w=Fg();let T;var M=s(w);{var D=P=>{var Y=jg(),fe=s(Y);Ua(fe,{size:16}),g(P,Y)};se(M,P=>{e(y)&&P(D)})}var A=d(M,2),x=s(A),L=d(A,2),k=s(L);C(()=>{T=et(w,1,"option svelte-hb0yns",null,T,{active:e(y)}),I(w,"aria-pressed",e(y)),p(x,e(h).label),p(k,e(h).sub)}),W("click",w,()=>jv(e(h).key)),g(m,w)}),C(()=>{p(i,e(n).settings.language.title),p(f,e(n).settings.language.desc)}),g(a,c),pt()}xt(["click"]);var Lg=E('<span class="indicator svelte-uox1oc" aria-hidden="true"></span>'),Rg=E('<button type="button"><!> <!> </button>'),Og=E('<div class="account-placeholder svelte-uox1oc"><p class="svelte-uox1oc"> </p></div>'),Bg=E('<div class="settings-page page-veil svelte-uox1oc"><aside class="menu svelte-uox1oc"><nav class="menu-nav svelte-uox1oc"></nav></aside> <main class="content svelte-uox1oc"><div class="card svelte-uox1oc"><!></div></main></div>');function zg(a,t){_t(t,!0);const n=j(bt);let r=z("timer");const o=j(()=>[{key:"account",icon:Tv,label:e(n).settings.tab.account},{key:"timer",icon:Xn,label:e(n).settings.tab.timer},{key:"lists",icon:cc,label:e(n).settings.tab.lists},{key:"tags",icon:wv,label:e(n).settings.tab.tags},{key:"theme",icon:dv,label:e(n).settings.tab.theme},{key:"motto",icon:dc,label:e(n).settings.tab.motto},{key:"notification",icon:sc,label:e(n).settings.tab.notification},{key:"language",icon:iv,label:e(n).settings.tab.language}]);var c=Bg();Ir("uox1oc",x=>{Nr(()=>{tr.title=e(n).page.settings??""})});var l=s(c),i=s(l);Ee(i,21,()=>e(o),x=>x.key,(x,L)=>{const k=j(()=>e(r)===e(L).key);var P=Rg();let Y;var fe=s(P);{var ce=G=>{var ie=Lg();g(G,ie)};se(fe,G=>{e(k)&&G(ce)})}var ae=d(fe,2);Fr(ae,()=>e(L).icon,(G,ie)=>{ie(G,{size:16})});var te=d(ae);C(()=>{Y=et(P,1,"menu-item svelte-uox1oc",null,Y,{active:e(k)}),I(P,"aria-current",e(k)?"true":void 0),p(te,` ${e(L).label??""}`)}),W("click",P,()=>v(r,e(L).key,!0)),g(x,P)});var u=d(l,2),f=s(u),_=s(f);{var m=x=>{var L=Og(),k=s(L),P=s(k);C(()=>p(P,e(n).settings.accountNotOpen)),g(x,L)},h=x=>{Kp(x,{})},y=x=>{sg(x,{})},w=x=>{fg(x,{})},T=x=>{kg(x,{})},M=x=>{Dg(x,{})},D=x=>{Ng(x,{})},A=x=>{qg(x,{})};se(_,x=>{e(r)==="account"?x(m):e(r)==="timer"?x(h,1):e(r)==="lists"?x(y,2):e(r)==="tags"?x(w,3):e(r)==="theme"?x(T,4):e(r)==="motto"?x(M,5):e(r)==="notification"?x(D,6):e(r)==="language"&&x(A,7)})}g(a,c),pt()}xt(["click"]);var Hg=E('<button type="button"><!> </button>'),Ug=E('<br/> <span class="sub svelte-k6bk06"> </span>',1),Wg=E('<li class="svelte-k6bk06"> <!></li>'),Yg=E('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <ul class="svelte-k6bk06"></ul></section>'),Kg=E('<div class="manual svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),Gg=E('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p></section>'),Vg=E('<div class="faq"><h2 class="svelte-k6bk06"> </h2> <!></div>'),Xg=E('<li class="svelte-k6bk06"> </li>'),$g=E('<div class="contact"><h2 class="svelte-k6bk06"> </h2> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>522988349@qq.com</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>18688994926</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span> </span></div></div> <div class="feedback svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono svelte-k6bk06"> </div> <div class="hint svelte-k6bk06"> </div></div> <div><span class="lbl xs svelte-k6bk06"> </span> <ul class="body-items svelte-k6bk06"></ul></div> <div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono muted svelte-k6bk06"> </div></div></div></div></div>'),Jg=E('<div class="help-page page-veil svelte-k6bk06"><aside class="menu svelte-k6bk06"><nav class="menu-nav"></nav></aside> <main class="content svelte-k6bk06"><div class="card svelte-k6bk06"><!></div></main></div>');function Qg(a,t){_t(t,!0);const n=j(bt);let r=z("manual");const o=["timer","tasks","reminder","repeat","journal","stats","settings"];var c=Jg();Ir("k6bk06",w=>{Nr(()=>{tr.title=`${e(n).nav.help??""} - PomoFlow`})});var l=s(c),i=s(l);Ee(i,21,()=>[{key:"manual",icon:Ju},{key:"faq",icon:lc},{key:"contact",icon:cv}],w=>w.key,(w,T)=>{const M=j(()=>e(r)===e(T).key);var D=Hg();let A;var x=s(D);Fr(x,()=>e(T).icon,(k,P)=>{P(k,{size:16})});var L=d(x);C(()=>{A=et(D,1,"menu-item svelte-k6bk06",null,A,{active:e(M)}),I(D,"aria-current",e(M)?"true":void 0),p(L,` ${e(n).help.tab[e(T).key]??""}`)}),W("click",D,()=>v(r,e(T).key,!0)),g(w,D)});var u=d(l,2),f=s(u),_=s(f);{var m=w=>{var T=Kg(),M=s(T),D=s(M),A=d(M,2);Ee(A,16,()=>o,x=>x,(x,L)=>{const k=j(()=>e(n).help.manual[L]);var P=Yg(),Y=s(P),fe=s(Y),ce=d(Y,2);Ee(ce,21,()=>e(k).items,Wa,(ae,te)=>{const G=j(()=>e(te));var ie=Wg(),F=s(ie),R=d(F);{var ne=pe=>{var me=Ug(),B=d(Ae(me),2),de=s(B);C(()=>p(de,e(G).sub)),g(pe,me)};se(R,pe=>{e(G).sub&&pe(ne)})}C(()=>p(F,`${e(G).text??""} `)),g(ae,ie)}),C(()=>p(fe,e(k).title)),g(x,P)}),C(()=>p(D,e(n).help.tab.manual)),g(w,T)},h=w=>{var T=Vg(),M=s(T),D=s(M),A=d(M,2);Ee(A,17,()=>e(n).help.faq.items,Wa,(x,L)=>{var k=Gg(),P=s(k),Y=s(P),fe=d(P,2),ce=s(fe);C(()=>{p(Y,`Q: ${e(L).q??""}`),p(ce,`A: ${e(L).a??""}`)}),g(x,k)}),C(()=>p(D,e(n).help.tab.faq)),g(w,T)},y=w=>{const T=j(()=>e(n).help.contact);var M=$g(),D=s(M),A=s(D),x=d(D,2),L=s(x),k=d(x,2),P=s(k),Y=s(P),fe=s(Y),ce=d(P,2),ae=s(ce),te=s(ae),G=d(ce,2),ie=s(G),F=s(ie),R=d(ie,2),ne=s(R),pe=d(k,2),me=s(pe),B=s(me),de=d(me,2),we=s(de),O=d(de,2),X=s(O),U=s(X),Z=s(U),_e=d(U,2),ye=s(_e),ve=d(_e,2),ge=s(ve),q=d(X,2),re=s(q),ue=s(re),Se=d(re,2);Ee(Se,21,()=>e(T).bodyItems,Wa,(he,K)=>{var b=Xg(),S=s(b);C(()=>p(S,e(K))),g(he,b)});var Ne=d(q,2),je=s(Ne),He=s(je),Ge=d(je,2),H=s(Ge);C(()=>{p(A,e(n).help.tab.contact),p(L,e(T).intro),p(fe,e(T).emailLabel),p(te,e(T).phoneLabel),p(F,e(T).workHoursLabel),p(ne,e(T).workHours),p(B,e(T).feedbackTitle),p(we,e(T).feedbackDesc),p(Z,e(T).subjectLabel),p(ye,e(T).subjectFormat),p(ge,e(T).subjectHint),p(ue,e(T).bodyLabel),p(He,e(T).exampleLabel),p(H,e(T).exampleText)}),g(w,M)};se(_,w=>{e(r)==="manual"?w(m):e(r)==="faq"?w(h,1):w(y,-1)})}g(a,c),pt()}xt(["click"]);var Zg=E("<button><!> </button>"),em=E('<main class="app app-bg svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><img class="logo svelte-1n46o8q" alt="PomoFlow" width="26" height="26"/> <h1 class="svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function tm(a,t){_t(t,!0);const n=j(bt);sh(),Pt(()=>{if(!$s().running)return;const x=setInterval(()=>Df(),1e3);return()=>clearInterval(x)}),on(()=>{Ac(),document.addEventListener("visibilitychange",()=>{document.hidden||Pf()}),Nf(),Uf(),(async()=>{try{const{isPermissionGranted:A,requestPermission:x}=await Ku(async()=>{const{isPermissionGranted:L,requestPermission:k}=await Promise.resolve().then(()=>yf);return{isPermissionGranted:L,requestPermission:k}},void 0);await A()||await x()}catch{}})()});const r=j(Pv),o={timer:Xn,tasks:cc,stats:Ws,settings:gv,help:lc};var c=em(),l=s(c),i=s(l),u=s(i),f=d(i,2);Ee(f,21,()=>Mv,A=>A.path,(A,x)=>{const L=j(()=>o[e(x).labelKey]);var k=Zg();let P;var Y=s(k);Fr(Y,()=>e(L),(ce,ae)=>{ae(ce,{size:18})});var fe=d(Y);C(()=>{P=et(k,1,"nav-item svelte-1n46o8q",null,P,{active:e(r)===e(x).path}),I(k,"aria-current",e(r)===e(x).path?"page":void 0),p(fe,` ${e(n).nav[e(x).labelKey]??""}`)}),W("click",k,()=>vc(e(x).path)),g(A,k)});var _=d(l,2),m=s(_);{var h=A=>{Ki(A,{})},y=A=>{_p(A,{})},w=A=>{Op(A,{})},T=A=>{zg(A,{})},M=A=>{Qg(A,{})},D=A=>{Ki(A,{})};se(m,A=>{e(r)==="/timer"?A(h):e(r)==="/tasks"?A(y,1):e(r)==="/stats"?A(w,2):e(r)==="/settings"?A(T,3):e(r)==="/help"?A(M,4):A(D,-1)})}C(()=>{I(u,"src",fh),I(f,"aria-label",e(n).nav.mainNav)}),g(a,c),pt()}xt(["click"]);ku(tm,{target:document.getElementById("app")});
