var Oc=Object.defineProperty;var Qs=a=>{throw TypeError(a)};var Bc=(a,t,n)=>t in a?Oc(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;var oa=(a,t,n)=>Bc(a,typeof t!="symbol"?t+"":t,n),Po=(a,t,n)=>t.has(a)||Qs("Cannot "+n);var j=(a,t,n)=>(Po(a,t,"read from private field"),n?n.call(a):t.get(a)),ot=(a,t,n)=>t.has(a)?Qs("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,n),nt=(a,t,n,r)=>(Po(a,t,"write to private field"),r?r.call(a,n):t.set(a,n),n),_t=(a,t,n)=>(Po(a,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const $i=!1;var ws=Array.isArray,zc=Array.prototype.indexOf,Kr=Array.prototype.includes,fo=Array.from,Hc=Object.defineProperty,en=Object.getOwnPropertyDescriptor,Ji=Object.getOwnPropertyDescriptors,Uc=Object.prototype,Wc=Array.prototype,xs=Object.getPrototypeOf,Xs=Object.isExtensible;function er(a){return typeof a=="function"}const Yc=()=>{};function Gc(a){return a()}function Ko(a){for(var t=0;t<a.length;t++)a[t]()}function Qi(){var a,t,n=new Promise((r,o)=>{a=r,t=o});return{promise:n,resolve:a,reject:t}}function Xi(a,t){if(Array.isArray(a))return a;if(!(Symbol.iterator in a))return Array.from(a);const n=[];for(const r of a)if(n.push(r),n.length===t)break;return n}const Ut=2,yn=4,Sr=8,Ss=1<<24,Ta=16,ma=32,Ua=64,$o=128,ga=512,Ot=1024,qt=2048,Pa=4096,Zt=8192,ca=16384,Gn=32768,Jo=1<<25,an=65536,$r=1<<17,Zi=1<<18,Vn=1<<19,el=1<<20,Na=1<<25,kn=65536,Jr=1<<21,Cn=1<<22,tn=1<<23,Aa=Symbol("$state"),tl=Symbol("legacy props"),Vc=Symbol(""),Or=Symbol("attributes"),Qo=Symbol("class"),Xo=Symbol("style"),ir=Symbol("text"),Br=Symbol("form reset"),Tr=new class extends Error{constructor(){super(...arguments);oa(this,"name","StaleReactionError");oa(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var Gi;const ho=!!((Gi=globalThis.document)!=null&&Gi.contentType)&&globalThis.document.contentType.includes("xml");function Kc(a){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function $c(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Jc(a,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Qc(a){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Xc(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Zc(a){throw new Error("https://svelte.dev/e/effect_orphan")}function ed(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function td(a){throw new Error("https://svelte.dev/e/props_invalid_value")}function ad(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function nd(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function rd(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function od(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const sd=1,id=2,al=4,ld=8,cd=16,dd=1,ud=2,nl=4,vd=8,fd=16,rl=1,hd=2,It=Symbol("uninitialized"),ol="http://www.w3.org/1999/xhtml",_d="http://www.w3.org/2000/svg",pd="@attach";function gd(){console.warn("https://svelte.dev/e/derived_inert")}function md(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function bd(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function sl(a){return a===this.v}function yd(a,t){return a!=a?t==t:a!==t||a!==null&&typeof a=="object"||typeof a=="function"}function il(a){return!yd(a,this.v)}let Kn=!1,kd=!1;function wd(){Kn=!0}let Et=null;function Ln(a){Et=a}function vt(a,t=!1,n){Et={p:Et,i:!1,c:null,e:null,s:a,x:null,r:st,l:Kn&&!t?{s:null,u:null,$:[]}:null}}function ft(a){var t=Et,n=t.e;if(n!==null){t.e=null;for(var r of n)El(r)}return t.i=!0,Et=t.p,{}}function Dr(){return!Kn||Et!==null&&Et.l===null}let ln=[];function ll(){var a=ln;ln=[],Ko(a)}function ja(a){if(ln.length===0&&!fr){var t=ln;queueMicrotask(()=>{t===ln&&ll()})}ln.push(a)}function xd(){for(;ln.length>0;)ll()}function cl(a){var t=st;if(t===null)return ut.f|=tn,a;if((t.f&Gn)===0&&(t.f&yn)===0)throw a;Xa(a,t)}function Xa(a,t){if(!(t!==null&&(t.f&ca)!==0)){for(;t!==null;){if((t.f&$o)!==0){if((t.f&Gn)===0)throw a;try{t.b.error(a);return}catch(n){a=n}}t=t.parent}throw a}}const Sd=-7169;function Ft(a,t){a.f=a.f&Sd|t}function Ts(a){(a.f&ga)!==0||a.deps===null?Ft(a,Ot):Ft(a,Pa)}function dl(a){if(a!==null)for(const t of a)(t.f&Ut)===0||(t.f&kn)===0||(t.f^=kn,dl(t.deps))}function ul(a,t,n){(a.f&qt)!==0?t.add(a):(a.f&Pa)!==0&&n.add(a),dl(a.deps),Ft(a,Ot)}let Ir=!1;function Td(a){var t=Ir;try{return Ir=!1,[a(),Ir]}finally{Ir=t}}function pn(a,t){if(t){const n=document.body;a.autofocus=!0,ja(()=>{document.activeElement===n&&a.focus()})}}let Zs=!1;function Dd(){Zs||(Zs=!0,document.addEventListener("reset",a=>{Promise.resolve().then(()=>{var t;if(!a.defaultPrevented)for(const n of a.target.elements)(t=n[Br])==null||t.call(n)})},{capture:!0}))}function $n(a){var t=ut,n=st;ba(null),ya(null);try{return a()}finally{ba(t),ya(n)}}function vl(a,t,n,r=n){a.addEventListener(t,()=>$n(n));const o=a[Br];o?a[Br]=()=>{o(),r(!0)}:a[Br]=()=>r(!0),Dd()}function Pd(a){let t=0,n=nn(0),r;return()=>{Ns()&&(e(n),js(()=>(t===0&&(r=Vt(()=>a(()=>hr(n)))),t+=1,()=>{ja(()=>{t-=1,t===0&&(r==null||r(),r=void 0,hr(n))})})))}}var Md=an|Vn;function Ed(a,t,n,r){new Cd(a,t,n,r)}var fa,ks,ha,un,ta,_a,Qt,ia,qa,vn,Ja,Nn,br,yr,Ra,co,Dt,Nd,jd,Zo,Fd,es,zr,Hr,ts,as;class Cd{constructor(t,n,r,o){ot(this,Dt);oa(this,"parent");oa(this,"is_pending",!1);oa(this,"transform_error");ot(this,fa);ot(this,ks,null);ot(this,ha);ot(this,un);ot(this,ta);ot(this,_a,null);ot(this,Qt,null);ot(this,ia,null);ot(this,qa,null);ot(this,vn,0);ot(this,Ja,0);ot(this,Nn,!1);ot(this,br,new Set);ot(this,yr,new Set);ot(this,Ra,null);ot(this,co,Pd(()=>(nt(this,Ra,nn(j(this,vn))),()=>{nt(this,Ra,null)})));var c;nt(this,fa,t),nt(this,ha,n),nt(this,un,l=>{var i=st;i.b=this,i.f|=$o,r(l)}),this.parent=st.b,this.transform_error=o??((c=this.parent)==null?void 0:c.transform_error)??(l=>l),nt(this,ta,Qn(()=>{_t(this,Dt,es).call(this)},Md))}defer_effect(t){ul(t,j(this,br),j(this,yr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!j(this,ha).pending}update_pending_count(t,n){_t(this,Dt,ts).call(this,t,n),nt(this,vn,j(this,vn)+t),!(!j(this,Ra)||j(this,Nn))&&(nt(this,Nn,!0),ja(()=>{nt(this,Nn,!1),j(this,Ra)&&Bn(j(this,Ra),j(this,vn))}))}get_effect_pending(){return j(this,co).call(this),e(j(this,Ra))}error(t){if(!j(this,ha).onerror&&!j(this,ha).failed)throw t;qe!=null&&qe.is_fork?(j(this,_a)&&qe.skip_effect(j(this,_a)),j(this,Qt)&&qe.skip_effect(j(this,Qt)),j(this,ia)&&qe.skip_effect(j(this,ia)),qe.oncommit(()=>{_t(this,Dt,as).call(this,t)})):_t(this,Dt,as).call(this,t)}}fa=new WeakMap,ks=new WeakMap,ha=new WeakMap,un=new WeakMap,ta=new WeakMap,_a=new WeakMap,Qt=new WeakMap,ia=new WeakMap,qa=new WeakMap,vn=new WeakMap,Ja=new WeakMap,Nn=new WeakMap,br=new WeakMap,yr=new WeakMap,Ra=new WeakMap,co=new WeakMap,Dt=new WeakSet,Nd=function(){try{nt(this,_a,Xt(()=>j(this,un).call(this,j(this,fa))))}catch(t){this.error(t)}},jd=function(t){const n=j(this,ha).failed,{reset:r,invoke_onerror:o}=_t(this,Dt,Zo).call(this,t);ja(o),n&&nt(this,ia,Xt(()=>{n(j(this,fa),()=>t,()=>r)}))},Zo=function(t){var n=!1,r=!1;const o=()=>{if(n){bd();return}n=!0,r&&od(),j(this,ia)!==null&&mn(j(this,ia),()=>{nt(this,ia,null)}),_t(this,Dt,Hr).call(this,()=>{_t(this,Dt,es).call(this)})};return{reset:o,invoke_onerror:()=>{var l,i;try{r=!0,(i=(l=j(this,ha)).onerror)==null||i.call(l,t,o),r=!1}catch(u){Xa(u,j(this,ta)&&j(this,ta).parent)}}}},Fd=function(){const t=j(this,ha).pending;t&&(this.is_pending=!0,nt(this,Qt,Xt(()=>t(j(this,fa)))),ja(()=>{var n=nt(this,qa,document.createDocumentFragment()),r=Ma();n.append(r),nt(this,_a,_t(this,Dt,Hr).call(this,()=>Xt(()=>j(this,un).call(this,r)))),j(this,Ja)===0&&(j(this,fa).before(n),nt(this,qa,null),mn(j(this,Qt),()=>{nt(this,Qt,null)}),_t(this,Dt,zr).call(this,qe))}))},es=function(){try{if(this.is_pending=this.has_pending_snippet(),nt(this,Ja,0),nt(this,vn,0),nt(this,_a,Xt(()=>{j(this,un).call(this,j(this,fa))})),j(this,Ja)>0){var t=nt(this,qa,document.createDocumentFragment());As(j(this,_a),t);const n=j(this,ha).pending;nt(this,Qt,Xt(()=>n(j(this,fa))))}else _t(this,Dt,zr).call(this,qe)}catch(n){this.error(n)}},zr=function(t){this.is_pending=!1,t.transfer_effects(j(this,br),j(this,yr))},Hr=function(t){var n=st,r=ut,o=Et;ya(j(this,ta)),ba(j(this,ta)),Ln(j(this,ta).ctx);try{return wn.ensure(),t()}catch(c){return cl(c),null}finally{ya(n),ba(r),Ln(o)}},ts=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&_t(r=this.parent,Dt,ts).call(r,t,n);return}nt(this,Ja,j(this,Ja)+t),j(this,Ja)===0&&(_t(this,Dt,zr).call(this,n),j(this,Qt)&&mn(j(this,Qt),()=>{nt(this,Qt,null)}),j(this,qa)&&(j(this,fa).before(j(this,qa)),nt(this,qa,null)))},as=function(t){j(this,_a)&&(Gt(j(this,_a)),nt(this,_a,null)),j(this,Qt)&&(Gt(j(this,Qt)),nt(this,Qt,null)),j(this,ia)&&(Gt(j(this,ia)),nt(this,ia,null));let n=j(this,ha).failed;const r=o=>{const{reset:c,invoke_onerror:l}=_t(this,Dt,Zo).call(this,o);l(),n&&nt(this,ia,_t(this,Dt,Hr).call(this,()=>{try{return Xt(()=>{var i=st;i.b=this,i.f|=$o,n(j(this,fa),()=>o,()=>c)})}catch(i){return Xa(i,j(this,ta).parent),null}}))};ja(()=>{var o;try{o=this.transform_error(t)}catch(c){Xa(c,j(this,ta)&&j(this,ta).parent);return}o!==null&&typeof o=="object"&&typeof o.then=="function"?o.then(r,c=>Xa(c,j(this,ta)&&j(this,ta).parent)):r(o)})};function Ds(a,t,n,r){const o=Dr()?On:Ps;var c=a.filter(b=>!b.settled),l=t.map(o);if(n.length===0&&c.length===0){r(l);return}var i=st,u=Ad(),f=c.length===1?c[0].promise:c.length>1?Promise.all(c.map(b=>b.promise)):null;function h(b){if((i.f&ca)===0){u();try{r([...l,...b])}catch(w){Xa(w,i)}Qr()}}var g=fl();if(n.length===0){f.then(()=>h([])).finally(g);return}function _(){Promise.all(n.map(b=>Id(b))).then(h).catch(b=>Xa(b,i)).finally(g)}f?f.then(()=>{u(),_(),Qr()}):_()}function Ad(){var a=st,t=ut,n=Et,r=qe;return function(c=!0){ya(a),ba(t),Ln(n),c&&(a.f&ca)===0&&(r==null||r.activate(),r==null||r.apply())}}function Qr(a=!0){ya(null),ba(null),Ln(null),a&&(qe==null||qe.deactivate())}function fl(){var a=st,t=a.b,n=qe,r=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(r,a),()=>{t==null||t.update_pending_count(-1,n),n.decrement(r,a)}}function On(a){var t=Ut|qt;return st!==null&&(st.f|=Vn),{ctx:Et,deps:null,effects:null,equals:sl,f:t,fn:a,reactions:null,rv:0,v:It,wv:0,parent:st,ac:null}}const lr=Symbol("obsolete");function Id(a,t,n){let r=st;r===null&&$c();var o=void 0,c=nn(It),l=!ut,i=new Set;return Jd(()=>{var b,w;var u=st,f=Qi();o=f.promise;try{Promise.resolve(a()).then(f.resolve,x=>{x!==Tr&&f.reject(x)}).finally(Qr)}catch(x){f.reject(x),Qr()}var h=qe;if(l){if((u.f&Gn)!==0)var g=fl();if((b=r.b)!=null&&b.is_rendered())(w=h.async_deriveds.get(u))==null||w.reject(lr);else for(const x of i.values())x.reject(lr);i.add(f),h.async_deriveds.set(u,f)}const _=(x,S=void 0)=>{g==null||g(),i.delete(f),S!==lr&&(h.activate(),S?(c.f|=tn,Bn(c,S)):((c.f&tn)!==0&&(c.f^=tn),Bn(c,x)),h.deactivate())};f.promise.then(_,x=>_(null,x||"unknown"))}),_o(()=>{for(const u of i)u.reject(lr)}),new Promise(u=>{function f(h){function g(){h===o?u(c):f(o)}h.then(g,g)}f(o)})}function I(a){const t=On(a);return Il(t),t}function Ps(a){const t=On(a);return t.equals=il,t}function qd(a){var t=a.effects;if(t!==null){a.effects=null;for(var n=0;n<t.length;n+=1)Gt(t[n])}}function Ms(a){var t,n=st,r=a.parent;if(!Wa&&r!==null&&a.v!==It&&(r.f&(ca|Zt))!==0)return gd(),a.v;ya(r);try{a.f&=~kn,qd(a),t=Ol(a)}finally{ya(n)}return t}function hl(a){var t=Ms(a);if(!a.equals(t)&&(a.wv=Rl(),(!(qe!=null&&qe.is_fork)||a.deps===null)&&(qe!==null?(qe.capture(a,t,!0),vr==null||vr.capture(a,t,!0)):a.v=t,a.deps===null))){Ft(a,Ot);return}Wa||(Yt!==null?(Ns()||qe!=null&&qe.is_fork)&&Yt.set(a,t):Ts(a))}function Rd(a){var t;if(a.effects!==null)for(const n of a.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&$n(()=>{n.ac.abort(Tr),n.ac=null}),n.fn!==null&&(n.teardown=Yc),pr(n,0),Fs(n))}function _l(a){if(a.effects!==null)for(const t of a.effects)t.teardown&&t.fn!==null&&zn(t)}let Mo=null,Dn=null,qe=null,vr=null,Yt=null,ns=null,fr=!1,Eo=!1,En=null,Ur=null;var ei=0;let Ld=1;var jn,Qa,fn,Fn,An,In,La,qn,aa,kr,Oa,xa,Ea,Rn,hn,xt,rs,cr,os,pl,gl,Mn,Od,dr;const uo=class uo{constructor(){ot(this,xt);oa(this,"id",Ld++);ot(this,jn,!1);oa(this,"linked",!0);ot(this,Qa,null);ot(this,fn,null);oa(this,"async_deriveds",new Map);oa(this,"current",new Map);oa(this,"previous",new Map);ot(this,Fn,new Set);ot(this,An,new Set);ot(this,In,0);ot(this,La,new Map);ot(this,qn,null);ot(this,aa,[]);ot(this,kr,[]);ot(this,Oa,new Set);ot(this,xa,new Set);ot(this,Ea,new Map);ot(this,Rn,new Set);oa(this,"is_fork",!1);ot(this,hn,!1);Dn===null?Mo=Dn=this:(nt(Dn,fn,this),nt(this,Qa,Dn)),Dn=this}skip_effect(t){j(this,Ea).has(t)||j(this,Ea).set(t,{d:[],m:[]}),j(this,Rn).delete(t)}unskip_effect(t,n=r=>this.schedule(r)){var r=j(this,Ea).get(t);if(r){j(this,Ea).delete(t);for(var o of r.d)Ft(o,qt),n(o);for(o of r.m)Ft(o,Pa),n(o)}j(this,Rn).add(t)}capture(t,n,r=!1){t.v!==It&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&tn)===0&&(this.current.set(t,[n,r]),Yt==null||Yt.set(t,n)),this.is_fork||(t.v=n)}activate(){qe=this}deactivate(){qe=null,Yt=null}flush(){try{Eo=!0,qe=this,_t(this,xt,cr).call(this)}finally{ei=0,ns=null,En=null,Ur=null,Eo=!1,qe=null,Yt=null,gn.clear()}}discard(){var t;for(const n of j(this,An))n(this);j(this,An).clear();for(const n of this.async_deriveds.values())n.reject(lr);_t(this,xt,dr).call(this),(t=j(this,qn))==null||t.resolve()}register_created_effect(t){j(this,kr).push(t)}increment(t,n){if(nt(this,In,j(this,In)+1),t){let r=j(this,La).get(n)??0;j(this,La).set(n,r+1)}}decrement(t,n){if(nt(this,In,j(this,In)-1),t){let r=j(this,La).get(n)??0;r===1?j(this,La).delete(n):j(this,La).set(n,r-1)}j(this,hn)||(nt(this,hn,!0),ja(()=>{nt(this,hn,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const r of t)j(this,Oa).add(r);for(const r of n)j(this,xa).add(r);t.clear(),n.clear()}oncommit(t){j(this,Fn).add(t)}ondiscard(t){j(this,An).add(t)}settled(){return(j(this,qn)??nt(this,qn,Qi())).promise}static ensure(){if(qe===null){const t=qe=new uo;!Eo&&!fr&&ja(()=>{j(t,jn)||t.flush()})}return qe}apply(){{Yt=null;return}}schedule(t){var o;if(ns=t,(o=t.b)!=null&&o.is_pending&&(t.f&(yn|Sr|Ss))!==0&&(t.f&Gn)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(En!==null&&n===st&&(ut===null||(ut.f&Ut)===0))return;if((r&(Ua|ma))!==0){if((r&Ot)===0)return;n.f^=Ot}}j(this,aa).push(n)}};jn=new WeakMap,Qa=new WeakMap,fn=new WeakMap,Fn=new WeakMap,An=new WeakMap,In=new WeakMap,La=new WeakMap,qn=new WeakMap,aa=new WeakMap,kr=new WeakMap,Oa=new WeakMap,xa=new WeakMap,Ea=new WeakMap,Rn=new WeakMap,hn=new WeakMap,xt=new WeakSet,rs=function(){if(this.is_fork)return!0;for(const r of j(this,La).keys()){for(var t=r,n=!1;t.parent!==null;){if(j(this,Ea).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},cr=function(){var u,f,h,g;nt(this,jn,!0),ei++>1e3&&(_t(this,xt,dr).call(this),zd());for(const _ of j(this,Oa))j(this,xa).delete(_),Ft(_,qt),this.schedule(_);for(const _ of j(this,xa))Ft(_,Pa),this.schedule(_);const t=j(this,aa);nt(this,aa,[]),this.apply();var n=En=[],r=[],o=Ur=[];for(const _ of t)try{_t(this,xt,os).call(this,_,n,r)}catch(b){throw yl(_),_t(this,xt,rs).call(this)||this.discard(),b}if(qe=null,o.length>0){var c=uo.ensure();for(const _ of o)c.schedule(_)}if(En=null,Ur=null,_t(this,xt,rs).call(this)){_t(this,xt,Mn).call(this,r),_t(this,xt,Mn).call(this,n);for(const[_,b]of j(this,Ea))bl(_,b);o.length>0&&_t(u=qe,xt,cr).call(u);return}const l=_t(this,xt,pl).call(this);if(l){_t(this,xt,Mn).call(this,r),_t(this,xt,Mn).call(this,n),_t(f=l,xt,gl).call(f,this);return}j(this,Oa).clear(),j(this,xa).clear();for(const _ of j(this,Fn))_(this);j(this,Fn).clear(),vr=this,ti(r),ti(n),vr=null,(h=j(this,qn))==null||h.resolve();var i=qe;if(j(this,In)===0&&(j(this,aa).length===0||i!==null)&&_t(this,xt,dr).call(this),j(this,aa).length>0)if(i!==null){const _=i;j(_,aa).push(...j(this,aa).filter(b=>!j(_,aa).includes(b)))}else i=this;i!==null&&_t(g=i,xt,cr).call(g)},os=function(t,n,r){t.f^=Ot;for(var o=t.first;o!==null;){var c=o.f,l=(c&(ma|Ua))!==0,i=l&&(c&Ot)!==0,u=i||(c&Zt)!==0||j(this,Ea).has(o);if(!u&&o.fn!==null){l?o.f^=Ot:(c&yn)!==0?n.push(o):Er(o)&&((c&Ta)!==0&&j(this,xa).add(o),zn(o));var f=o.first;if(f!==null){o=f;continue}}for(;o!==null;){var h=o.next;if(h!==null){o=h;break}o=o.parent}}},pl=function(){for(var t=j(this,Qa);t!==null;){if(!t.is_fork){for(const[n,[,r]]of this.current)if(t.current.has(n)&&!r)return t}t=j(t,Qa)}return null},gl=function(t){var r;for(const[o,c]of t.current)!this.previous.has(o)&&t.previous.has(o)&&this.previous.set(o,t.previous.get(o)),this.current.set(o,c);for(const[o,c]of t.async_deriveds){const l=this.async_deriveds.get(o);l&&c.promise.then(l.resolve).catch(l.reject)}t.async_deriveds.clear(),this.transfer_effects(j(t,Oa),j(t,xa));const n=o=>{var c=o.reactions;if(c!==null&&!((o.f&Ut)!==0&&(o.f&(qt|Pa))===0))for(const u of c){var l=u.f;if((l&Ut)!==0)n(u);else{var i=u;l&(Cn|Ta)&&!this.async_deriveds.has(i)&&(j(this,xa).delete(i),Ft(i,qt),this.schedule(i))}}};for(const o of this.current.keys())n(o);this.oncommit(()=>t.discard()),_t(r=t,xt,dr).call(r),qe=this,_t(this,xt,cr).call(this)},Mn=function(t){for(var n=0;n<t.length;n+=1)ul(t[n],j(this,Oa),j(this,xa))},Od=function(){var g;for(let _=Mo;_!==null;_=j(_,fn)){var t=_.id<this.id,n=[];for(const[b,[w,x]]of this.current){if(_.current.has(b)){var r=_.current.get(b)[0];if(t&&w!==r)_.current.set(b,[w,x]);else continue}n.push(b)}if(t)for(const[b,w]of this.async_deriveds){const x=_.async_deriveds.get(b);x&&w.promise.then(x.resolve).catch(x.reject)}var o=[..._.current.keys()].filter(b=>!_.current.get(b)[1]);if(!(!j(_,jn)||o.length===0)){var c=o.filter(b=>!this.current.has(b));if(c.length===0)t&&_.discard();else if(n.length>0){if(t)for(const b of j(this,Rn))_.unskip_effect(b,w=>{var x;(w.f&(Ta|Cn))!==0?_.schedule(w):_t(x=_,xt,Mn).call(x,[w])});_.activate();var l=new Set,i=new Map;for(var u of n)ml(u,c,l,i);i=new Map;var f=[..._.current].filter(([b,w])=>{const x=this.current.get(b);return x?x[0]!==w[0]||x[1]!==w[1]:!0}).map(([b])=>b);if(f.length>0)for(const b of j(this,kr))(b.f&(ca|Zt|$r))===0&&Es(b,f,i)&&((b.f&(Cn|Ta))!==0?(Ft(b,qt),_.schedule(b)):j(_,Oa).add(b));if(j(_,aa).length>0&&!j(_,hn)){_.apply();for(var h of j(_,aa))_t(g=_,xt,os).call(g,h,[],[]);nt(_,aa,[])}_.deactivate()}}}},dr=function(){if(this.linked){var t=j(this,Qa),n=j(this,fn);t===null?Mo=n:nt(t,fn,n),n===null?Dn=t:nt(n,Qa,t),this.linked=!1}};let wn=uo;function Bd(a){var t=fr;fr=!0;try{for(var n;;){if(xd(),qe===null)return n;qe.flush()}}finally{fr=t}}function zd(){try{ed()}catch(a){Xa(a,ns)}}let wa=null;function ti(a){var t=a.length;if(t!==0){for(var n=0;n<t;){var r=a[n++];if((r.f&(ca|Zt))===0&&Er(r)&&(wa=new Set,zn(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&jl(r),(wa==null?void 0:wa.size)>0)){gn.clear();for(const o of wa){if((o.f&(ca|Zt))!==0)continue;const c=[o];let l=o.parent;for(;l!==null;)wa.has(l)&&(wa.delete(l),c.push(l)),l=l.parent;for(let i=c.length-1;i>=0;i--){const u=c[i];(u.f&(ca|Zt))===0&&zn(u)}}wa.clear()}}wa=null}}function ml(a,t,n,r){if(!n.has(a)&&(n.add(a),a.reactions!==null))for(const o of a.reactions){const c=o.f;(c&Ut)!==0?ml(o,t,n,r):(c&(Cn|Ta))!==0&&(c&qt)===0&&Es(o,t,r)&&(Ft(o,qt),Cs(o))}}function Es(a,t,n){const r=n.get(a);if(r!==void 0)return r;if(a.deps!==null)for(const o of a.deps){if(Kr.call(t,o))return!0;if((o.f&Ut)!==0&&Es(o,t,n))return n.set(o,!0),!0}return n.set(a,!1),!1}function Cs(a){qe.schedule(a)}function bl(a,t){if(!((a.f&ma)!==0&&(a.f&Ot)!==0)){(a.f&qt)!==0?t.d.push(a):(a.f&Pa)!==0&&t.m.push(a),Ft(a,Ot);for(var n=a.first;n!==null;)bl(n,t),n=n.next}}function yl(a){Ft(a,Ot);for(var t=a.first;t!==null;)yl(t),t=t.next}let Xr=new Set;const gn=new Map;let kl=!1;function nn(a,t){var n={f:0,v:a,reactions:null,equals:sl,rv:0,wv:0};return n}function W(a,t){const n=nn(a);return Il(n),n}function Hd(a,t=!1,n=!0){var o;const r=nn(a);return t||(r.equals=il),Kn&&n&&Et!==null&&Et.l!==null&&((o=Et.l).s??(o.s=[])).push(r),r}function v(a,t,n=!1){ut!==null&&(!Da||(ut.f&$r)!==0)&&Dr()&&(ut.f&(Ut|Ta|Cn|$r))!==0&&(Ia===null||!Ia.has(a))&&rd();let r=n?Be(t):t;return Bn(a,r,Ur)}function Bn(a,t,n=null){if(!a.equals(t)){gn.set(a,Wa?t:a.v);var r=wn.ensure();if(r.capture(a,t),(a.f&Ut)!==0){const o=a;(a.f&qt)!==0&&Ms(o),Yt===null&&Ts(o)}a.wv=Rl(),wl(a,qt,n),Dr()&&st!==null&&(st.f&Ot)!==0&&(st.f&(ma|Ua))===0&&(va===null?Zd([a]):va.push(a)),!r.is_fork&&Xr.size>0&&!kl&&Ud()}return t}function Ud(){kl=!1;for(const a of Xr){(a.f&Ot)!==0&&Ft(a,Pa);let t;try{t=Er(a)}catch{t=!0}t&&zn(a)}Xr.clear()}function ai(a,t=1){var n=e(a),r=t===1?n++:n--;return v(a,n),r}function hr(a){v(a,a.v+1)}function wl(a,t,n){var r=a.reactions;if(r!==null)for(var o=Dr(),c=r.length,l=0;l<c;l++){var i=r[l],u=i.f;if(!(!o&&i===st)){var f=(u&qt)===0;if(f&&Ft(i,t),(u&$r)!==0)Xr.add(i);else if((u&Ut)!==0){var h=i;Yt==null||Yt.delete(h),(u&kn)===0&&(u&ga&&(st===null||(st.f&Jr)===0)&&(i.f|=kn),wl(h,Pa,n))}else if(f){var g=i;(u&Ta)!==0&&wa!==null&&wa.add(g),n!==null?n.push(g):Cs(g)}}}}function Be(a){if(typeof a!="object"||a===null||Aa in a)return a;const t=xs(a);if(t!==Uc&&t!==Wc)return a;var n=new Map,r=ws(a),o=W(0),c=bn,l=i=>{if(bn===c)return i();var u=ut,f=bn;ba(null),oi(c);var h=i();return ba(u),oi(f),h};return r&&n.set("length",W(a.length)),new Proxy(a,{defineProperty(i,u,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&ad();var h=n.get(u);return h===void 0?l(()=>{var g=W(f.value);return n.set(u,g),g}):v(h,f.value,!0),!0},deleteProperty(i,u){var f=n.get(u);if(f===void 0){if(u in i){const h=l(()=>W(It));n.set(u,h),hr(o)}}else v(f,It),hr(o);return!0},get(i,u,f){var b;if(u===Aa)return a;var h=n.get(u),g=u in i;if(h===void 0&&(!g||(b=en(i,u))!=null&&b.writable)&&(h=l(()=>{var w=Be(g?i[u]:It),x=W(w);return x}),n.set(u,h)),h!==void 0){var _=e(h);return _===It?void 0:_}return Reflect.get(i,u,f)},getOwnPropertyDescriptor(i,u){var f=Reflect.getOwnPropertyDescriptor(i,u);if(f&&"value"in f){var h=n.get(u);h&&(f.value=e(h))}else if(f===void 0){var g=n.get(u),_=g==null?void 0:g.v;if(g!==void 0&&_!==It)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return f},has(i,u){var _;if(u===Aa)return!0;var f=n.get(u),h=f!==void 0&&f.v!==It||Reflect.has(i,u);if(f!==void 0||st!==null&&(!h||(_=en(i,u))!=null&&_.writable)){f===void 0&&(f=l(()=>{var b=h?Be(i[u]):It,w=W(b);return w}),n.set(u,f));var g=e(f);if(g===It)return!1}return h},set(i,u,f,h){var y;var g=n.get(u),_=u in i;if(r&&u==="length")for(var b=f;b<g.v;b+=1){var w=n.get(b+"");w!==void 0?v(w,It):b in i&&(w=l(()=>W(It)),n.set(b+"",w))}if(g===void 0)(!_||(y=en(i,u))!=null&&y.writable)&&(g=l(()=>W(void 0)),v(g,Be(f)),n.set(u,g));else{_=g.v!==It;var x=l(()=>Be(f));v(g,x)}var S=Reflect.getOwnPropertyDescriptor(i,u);if(S!=null&&S.set&&S.set.call(h,f),!_){if(r&&typeof u=="string"){var C=n.get("length"),z=Number(u);Number.isInteger(z)&&z>=C.v&&v(C,z+1)}hr(o)}return!0},ownKeys(i){e(o);var u=Reflect.ownKeys(i).filter(g=>{var _=n.get(g);return _===void 0||_.v!==It});for(var[f,h]of n)h.v!==It&&!(f in i)&&u.push(f);return u},setPrototypeOf(){nd()}})}function ni(a){try{if(a!==null&&typeof a=="object"&&Aa in a)return a[Aa]}catch{}return a}function Wd(a,t){return Object.is(ni(a),ni(t))}var ss,Jn,xl,Sl,Tl;function Yd(){if(ss===void 0){ss=window,Jn=document,xl=/Firefox/.test(navigator.userAgent);var a=Element.prototype,t=Node.prototype,n=Text.prototype;Sl=en(t,"firstChild").get,Tl=en(t,"nextSibling").get,Xs(a)&&(a[Qo]=void 0,a[Or]=null,a[Xo]=void 0,a.__e=void 0),Xs(n)&&(n[ir]=void 0)}}function Ma(a=""){return document.createTextNode(a)}function Ba(a){return Sl.call(a)}function Pr(a){return Tl.call(a)}function s(a,t){return Ba(a)}function Ne(a,t=!1){{var n=Ba(a);return n instanceof Comment&&n.data===""?Pr(n):n}}function d(a,t=1,n=!1){let r=a;for(;t--;)r=Pr(r);return r}function Gd(a){a.textContent=""}function Dl(){return!1}function Pl(a,t,n){return t==null||t===ol?n?document.createElement(a,{is:n}):document.createElement(a):n?document.createElementNS(t,a,{is:n}):document.createElementNS(t,a)}function Ml(a){st===null&&(ut===null&&Zc(),Xc()),Wa&&Qc()}function Vd(a,t){var n=t.last;n===null?t.last=t.first=a:(n.next=a,a.prev=n,t.last=a)}function ka(a,t){var n=st;n!==null&&(n.f&Zt)!==0&&(a|=Zt);var r={ctx:Et,deps:null,nodes:null,f:a|qt|ga,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};qe==null||qe.register_created_effect(r);var o=r;if((a&yn)!==0)En!==null?En.push(r):wn.ensure().schedule(r);else if(t!==null){try{zn(r)}catch(l){throw Gt(r),l}o.deps===null&&o.teardown===null&&o.nodes===null&&o.first===o.last&&(o.f&Vn)===0&&(o=o.first,(a&Ta)!==0&&(a&an)!==0&&o!==null&&(o.f|=an))}if(o!==null&&(o.parent=n,n!==null&&Vd(o,n),ut!==null&&(ut.f&Ut)!==0&&(a&Ua)===0)){var c=ut;(c.effects??(c.effects=[])).push(o)}return r}function Ns(){return ut!==null&&!Da}function _o(a){const t=ka(Sr,null);return Ft(t,Ot),t.teardown=a,t}function St(a){Ml();var t=st.f,n=!ut&&(t&ma)!==0&&Et!==null&&!Et.i;if(n){var r=Et;(r.e??(r.e=[])).push(a)}else return El(a)}function El(a){return ka(yn|el,a)}function Kd(a){return Ml(),ka(Sr|el,a)}function $d(a){wn.ensure();const t=ka(Ua|Vn,a);return(n={})=>new Promise(r=>{n.outro?mn(t,()=>{Gt(t),r(void 0)}):(Gt(t),r(void 0))})}function po(a){return ka(yn,a)}function Jd(a){return ka(Cn|Vn,a)}function js(a,t=0){return ka(Sr|t,a)}function M(a,t=[],n=[],r=[]){Ds(r,t,n,o=>{ka(Sr,()=>{a(...o.map(e))})})}function Mr(a,t=[],n=[],r=[]){Ds(r,t,n,o=>{ka(yn,()=>a(...o.map(e)))})}function Qn(a,t=0){var n=ka(Ta|t,a);return n}function Cl(a,t=0){var n=ka(Ss|t,a);return n}function Xt(a){return ka(ma|Vn,a)}function Nl(a){var t=a.teardown;if(t!==null){const n=Wa,r=ut;ri(!0),ba(null);try{t.call(null)}finally{ri(n),ba(r)}}}function Fs(a,t=!1){var n=a.first;for(a.first=a.last=null;n!==null;){const o=n.ac;o!==null&&$n(()=>{o.abort(Tr)});var r=n.next;(n.f&Ua)!==0?n.parent=null:Gt(n,t),n=r}}function Qd(a){for(var t=a.first;t!==null;){var n=t.next;(t.f&ma)===0&&Gt(t),t=n}}function Gt(a,t=!0){var n=!1;(t||(a.f&Zi)!==0)&&a.nodes!==null&&a.nodes.end!==null&&(Xd(a.nodes.start,a.nodes.end),n=!0),a.f|=Jo,Fs(a,t&&!n),pr(a,0);var r=a.nodes&&a.nodes.t;if(r!==null)for(const c of r)c.stop();Nl(a),a.f^=Jo,a.f|=ca;var o=a.parent;o!==null&&o.first!==null&&jl(a),a.next=a.prev=a.teardown=a.ctx=a.deps=a.fn=a.nodes=a.ac=a.b=null}function Xd(a,t){for(;a!==null;){var n=a===t?null:Pr(a);a.remove(),a=n}}function jl(a){var t=a.parent,n=a.prev,r=a.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===a&&(t.first=r),t.last===a&&(t.last=n))}function mn(a,t,n=!0){var r=[];Fl(a,r,!0);var o=()=>{n&&Gt(a),t&&t()},c=r.length;if(c>0){var l=()=>--c||o();for(var i of r)i.out(l)}else o()}function Fl(a,t,n){if((a.f&Zt)===0){a.f^=Zt;var r=a.nodes&&a.nodes.t;if(r!==null)for(const i of r)(i.is_global||n)&&t.push(i);for(var o=a.first;o!==null;){var c=o.next;if((o.f&Ua)===0){var l=(o.f&an)!==0||(o.f&ma)!==0&&(a.f&Ta)!==0;Fl(o,t,l?n:!1)}o=c}}}function Zr(a){Al(a,!0)}function Al(a,t){if((a.f&Zt)!==0){a.f^=Zt,(a.f&Ot)===0&&(Ft(a,qt),wn.ensure().schedule(a));for(var n=a.first;n!==null;){var r=n.next,o=(n.f&an)!==0||(n.f&ma)!==0;Al(n,o?t:!1),n=r}var c=a.nodes&&a.nodes.t;if(c!==null)for(const l of c)(l.is_global||t)&&l.in()}}function As(a,t){if(a.nodes)for(var n=a.nodes.start,r=a.nodes.end;n!==null;){var o=n===r?null:Pr(n);t.append(n),n=o}}let Wr=!1,Wa=!1;function ri(a){Wa=a}let ut=null,Da=!1;function ba(a){ut=a}let st=null;function ya(a){st=a}let Ia=null;function Il(a){ut!==null&&(Ia??(Ia=new Set)).add(a)}let na=null,sa=0,va=null;function Zd(a){va=a}let ql=1,cn=0,bn=cn;function oi(a){bn=a}function Rl(){return++ql}function Er(a){var t=a.f;if((t&qt)!==0)return!0;if(t&Ut&&(a.f&=~kn),(t&Pa)!==0){for(var n=a.deps,r=n.length,o=0;o<r;o++){var c=n[o];if(Er(c)&&hl(c),c.wv>a.wv)return!0}(t&ga)!==0&&Yt===null&&Ft(a,Ot)}return!1}function Ll(a,t,n=!0){var r=a.reactions;if(r!==null&&!(Ia!==null&&Ia.has(a)))for(var o=0;o<r.length;o++){var c=r[o];(c.f&Ut)!==0?Ll(c,t,!1):t===c&&(n?Ft(c,qt):(c.f&Ot)!==0&&Ft(c,Pa),Cs(c))}}function Ol(a){var x;var t=na,n=sa,r=va,o=ut,c=Ia,l=Et,i=Da,u=bn,f=a.f;na=null,sa=0,va=null,ut=(f&(ma|Ua))===0?a:null,Ia=null,Ln(a.ctx),Da=!1,bn=++cn,a.ac!==null&&($n(()=>{a.ac.abort(Tr)}),a.ac=null);try{a.f|=Jr;var h=a.fn,g=h();a.f|=Gn;var _=a.deps,b=qe==null?void 0:qe.is_fork;if(na!==null){var w;if(b||pr(a,sa),_!==null&&sa>0)for(_.length=sa+na.length,w=0;w<na.length;w++)_[sa+w]=na[w];else a.deps=_=na;if(Ns()&&(a.f&ga)!==0)for(w=sa;w<_.length;w++)((x=_[w]).reactions??(x.reactions=[])).push(a)}else!b&&_!==null&&sa<_.length&&(pr(a,sa),_.length=sa);if(Dr()&&va!==null&&!Da&&_!==null&&(a.f&(Ut|Pa|qt))===0)for(w=0;w<va.length;w++)Ll(va[w],a);if(o!==null&&o!==a){if(cn++,o.deps!==null)for(let S=0;S<n;S+=1)o.deps[S].rv=cn;if(t!==null)for(const S of t)S.rv=cn;va!==null&&(r===null?r=va:r.push(...va))}return(a.f&tn)!==0&&(a.f^=tn),g}catch(S){return cl(S)}finally{a.f^=Jr,na=t,sa=n,va=r,ut=o,Ia=c,Ln(l),Da=i,bn=u}}function eu(a,t){let n=t.reactions;if(n!==null){var r=zc.call(n,a);if(r!==-1){var o=n.length-1;o===0?n=t.reactions=null:(n[r]=n[o],n.pop())}}if(n===null&&(t.f&Ut)!==0&&(na===null||!Kr.call(na,t))){var c=t;(c.f&ga)!==0&&(c.f^=ga,c.f&=~kn),c.v!==It&&Ts(c),c.ac!==null&&$n(()=>{c.ac.abort(Tr),c.ac=null,Ft(c,qt)}),Rd(c),pr(c,0)}}function pr(a,t){var n=a.deps;if(n!==null)for(var r=t;r<n.length;r++)eu(a,n[r])}function zn(a){var t=a.f;if((t&ca)===0){Ft(a,Ot);var n=st,r=Wr;st=a,Wr=(t&(ma|Ua))===0;try{(t&(Ta|Ss))!==0?Qd(a):Fs(a),Nl(a);var o=Ol(a);a.teardown=typeof o=="function"?o:null,a.wv=ql;var c;$i&&kd&&(a.f&qt)!==0&&a.deps}finally{Wr=r,st=n}}}async function tu(){await Promise.resolve(),Bd()}function e(a){var t=a.f,n=(t&Ut)!==0;if(ut!==null&&!Da){var r=st!==null&&(st.f&ca)!==0;if(!r&&(Ia===null||!Ia.has(a))){var o=ut.deps;if((ut.f&Jr)!==0)a.rv<cn&&(a.rv=cn,na===null&&o!==null&&o[sa]===a?sa++:na===null?na=[a]:na.push(a));else{ut.deps??(ut.deps=[]),Kr.call(ut.deps,a)||ut.deps.push(a);var c=a.reactions;c===null?a.reactions=[ut]:Kr.call(c,ut)||c.push(ut)}}}if(Wa&&gn.has(a))return gn.get(a);if(n){var l=a;if(Wa){var i=l.v;return((l.f&Ot)===0&&l.reactions!==null||zl(l))&&(i=Ms(l)),gn.set(l,i),i}var u=(l.f&ga)===0&&!Da&&ut!==null&&(Wr||(ut.f&ga)!==0),f=(l.f&Gn)===0;Er(l)&&(u&&(l.f|=ga),hl(l)),u&&!f&&(_l(l),Bl(l))}if(Yt!=null&&Yt.has(a))return Yt.get(a);if((a.f&tn)!==0)throw a.v;return a.v}function Bl(a){if(a.f|=ga,a.deps!==null)for(const t of a.deps)(t.reactions??(t.reactions=[])).push(a),(t.f&Ut)!==0&&(t.f&ga)===0&&(_l(t),Bl(t))}function zl(a){if(a.v===It)return!0;if(a.deps===null)return!1;for(const t of a.deps)if(gn.has(t)||(t.f&Ut)!==0&&zl(t))return!0;return!1}function Vt(a){var t=Da;try{return Da=!0,a()}finally{Da=t}}function sn(a){if(!(typeof a!="object"||!a||a instanceof EventTarget)){if(Aa in a)is(a);else if(!Array.isArray(a))for(let t in a){const n=a[t];typeof n=="object"&&n&&Aa in n&&is(n)}}}function is(a,t=new Set){if(typeof a=="object"&&a!==null&&!(a instanceof EventTarget)&&!t.has(a)){t.add(a),a instanceof Date&&a.getTime();for(let r in a)try{is(a[r],t)}catch{}const n=xs(a);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=Ji(n);for(let o in r){const c=r[o].get;if(c)try{c.call(a)}catch{}}}}}function au(a){return a.endsWith("capture")&&a!=="gotpointercapture"&&a!=="lostpointercapture"}const nu=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function ru(a){return nu.includes(a)}const ou={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function su(a){return a=a.toLowerCase(),ou[a]??a}const iu=["touchstart","touchmove"];function lu(a){return iu.includes(a)}const dn=Symbol("events"),Hl=new Set,ls=new Set;function Ul(a,t,n,r={}){function o(c){if(r.capture||cs.call(t,c),!c.cancelBubble)return $n(()=>n==null?void 0:n.call(this,c))}return a.startsWith("pointer")||a.startsWith("touch")||a==="wheel"?ja(()=>{t.addEventListener(a,o,r)}):t.addEventListener(a,o,r),o}function kt(a,t,n,r,o){var c={capture:r,passive:o},l=Ul(a,t,n,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&_o(()=>{t.removeEventListener(a,l,c)})}function G(a,t,n){(t[dn]??(t[dn]={}))[a]=n}function yt(a){for(var t=0;t<a.length;t++)Hl.add(a[t]);for(var n of ls)n(a)}let si=null;function cs(a){var x,S;var t=this,n=t.ownerDocument,r=a.type,o=((x=a.composedPath)==null?void 0:x.call(a))||[],c=o[0]||a.target;si=a;var l=0,i=si===a&&a[dn];if(i){var u=o.indexOf(i);if(u!==-1&&(t===document||t===window)){a[dn]=t;return}var f=o.indexOf(t);if(f===-1)return;u<=f&&(l=u)}if(c=o[l]||a.target,c!==t){Hc(a,"currentTarget",{configurable:!0,get(){return c||n}});var h=ut,g=st;ba(null),ya(null);try{for(var _,b=[];c!==null&&c!==t;){try{var w=(S=c[dn])==null?void 0:S[r];w!=null&&(!c.disabled||a.target===c)&&w.call(c,a)}catch(C){_?b.push(C):_=C}if(a.cancelBubble)break;l++,c=l<o.length?o[l]:null}if(_){for(let C of b)queueMicrotask(()=>{throw C});throw _}}finally{a[dn]=t,delete a.currentTarget,ba(h),ya(g)}}}var Vi;const Co=((Vi=globalThis==null?void 0:globalThis.window)==null?void 0:Vi.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:a=>a});function cu(a){return(Co==null?void 0:Co.createHTML(a))??a}function Wl(a){var t=Pl("template");return t.innerHTML=cu(a.replaceAll("<!>","<!---->")),t.content}function xn(a,t){var n=st;n.nodes===null&&(n.nodes={start:a,end:t,a:null,t:null})}function E(a,t){var n=(t&rl)!==0,r=(t&hd)!==0,o,c=!a.startsWith("<!>");return()=>{o===void 0&&(o=Wl(c?a:"<!>"+a),n||(o=Ba(o)));var l=r||xl?document.importNode(o,!0):o.cloneNode(!0);if(n){var i=Ba(l),u=l.lastChild;xn(i,u)}else xn(l,l);return l}}function du(a,t,n="svg"){var r=!a.startsWith("<!>"),o=(t&rl)!==0,c=`<${n}>${r?a:"<!>"+a}</${n}>`,l;return()=>{if(!l){var i=Wl(c),u=Ba(i);if(o)for(l=document.createDocumentFragment();Ba(u);)l.appendChild(Ba(u));else l=Ba(u)}var f=l.cloneNode(!0);if(o){var h=Ba(f),g=f.lastChild;xn(h,g)}else xn(f,f);return f}}function Tn(a,t){return du(a,t,"svg")}function ii(a=""){{var t=Ma(a+"");return xn(t,t),t}}function Le(){var a=document.createDocumentFragment(),t=document.createComment(""),n=Ma();return a.append(t,n),xn(t,n),a}function m(a,t){a!==null&&a.before(t)}function p(a,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(a[ir]??(a[ir]=a.nodeValue))&&(a[ir]=n,a.nodeValue=`${n}`)}function uu(a,t){return vu(a,t)}const qr=new Map;function vu(a,{target:t,anchor:n,props:r={},events:o,context:c,intro:l=!0,transformError:i}){Yd();var u=void 0,f=$d(()=>{var h=n??t.appendChild(Ma());Ed(h,{pending:()=>{}},b=>{vt({});var w=Et;c&&(w.c=c),o&&(r.$$events=o),u=a(b,r)||{},ft()},i);var g=new Set,_=b=>{for(var w=0;w<b.length;w++){var x=b[w];if(!g.has(x)){g.add(x);var S=lu(x);for(const y of[t,document]){var C=qr.get(y);C===void 0&&(C=new Map,qr.set(y,C));var z=C.get(x);z===void 0?(y.addEventListener(x,cs,{passive:S}),C.set(x,1)):C.set(x,z+1)}}}};return _(fo(Hl)),ls.add(_),()=>{var S;for(var b of g)for(const C of[t,document]){var w=qr.get(C),x=w.get(b);--x==0?(C.removeEventListener(b,cs),w.delete(b),w.size===0&&qr.delete(C)):w.set(b,x)}ls.delete(_),h!==n&&((S=h.parentNode)==null||S.removeChild(h))}});return fu.set(u,f),u}let fu=new WeakMap;var Sa,Ca,la,_n,wr,xr,vo;class Is{constructor(t,n=!0){oa(this,"anchor");ot(this,Sa,new Map);ot(this,Ca,new Map);ot(this,la,new Map);ot(this,_n,new Set);ot(this,wr,!0);ot(this,xr,t=>{if(j(this,Sa).has(t)){var n=j(this,Sa).get(t),r=j(this,Ca).get(n);if(r)Zr(r),j(this,_n).delete(n);else{var o=j(this,la).get(n);o&&(Zr(o.effect),j(this,Ca).set(n,o.effect),j(this,la).delete(n),o.fragment.lastChild.remove(),this.anchor.before(o.fragment),r=o.effect)}for(const[c,l]of j(this,Sa)){if(j(this,Sa).delete(c),c===t)break;const i=j(this,la).get(l);i&&(Gt(i.effect),j(this,la).delete(l))}for(const[c,l]of j(this,Ca)){if(c===n||j(this,_n).has(c))continue;const i=()=>{if(Array.from(j(this,Sa).values()).includes(c)){var f=document.createDocumentFragment();As(l,f),f.append(Ma()),j(this,la).set(c,{effect:l,fragment:f})}else Gt(l);j(this,_n).delete(c),j(this,Ca).delete(c)};j(this,wr)||!r?(j(this,_n).add(c),mn(l,i,!1)):i()}}});ot(this,vo,t=>{j(this,Sa).delete(t);const n=Array.from(j(this,Sa).values());for(const[r,o]of j(this,la))n.includes(r)||(Gt(o.effect),j(this,la).delete(r))});this.anchor=t,nt(this,wr,n)}ensure(t,n){var r=qe,o=Dl();if(n&&!j(this,Ca).has(t)&&!j(this,la).has(t))if(o){var c=document.createDocumentFragment(),l=Ma();c.append(l),j(this,la).set(t,{effect:Xt(()=>n(l)),fragment:c})}else j(this,Ca).set(t,Xt(()=>n(this.anchor)));if(j(this,Sa).set(r,t),o){for(const[i,u]of j(this,Ca))i===t?r.unskip_effect(u):r.skip_effect(u);for(const[i,u]of j(this,la))i===t?r.unskip_effect(u.effect):r.skip_effect(u.effect);r.oncommit(j(this,xr)),r.ondiscard(j(this,vo))}else j(this,xr).call(this,r)}}Sa=new WeakMap,Ca=new WeakMap,la=new WeakMap,_n=new WeakMap,wr=new WeakMap,xr=new WeakMap,vo=new WeakMap;function oe(a,t,n=!1){var r=new Is(a),o=n?an:0;function c(l,i){r.ensure(l,i)}Qn(()=>{var l=!1;t((i,u=0)=>{l=!0,c(u,i)}),l||c(-1,null)},o)}function Ha(a,t){return t}function hu(a,t,n){for(var r=[],o=t.length,c,l=t.length,i=0;i<o;i++){let g=t[i];mn(g,()=>{if(c){if(c.pending.delete(g),c.done.add(g),c.pending.size===0){var _=a.outrogroups;ds(a,fo(c.done)),_.delete(c),_.size===0&&(a.outrogroups=null)}}else l-=1},!1)}if(l===0){var u=r.length===0&&n!==null&&a.pending.size===0;if(u){var f=n,h=f.parentNode;Gd(h),h.append(f),a.items.clear()}ds(a,t,!u)}else c={pending:new Set(t),done:new Set},(a.outrogroups??(a.outrogroups=new Set)).add(c)}function ds(a,t,n=!0){var r;if(a.pending.size>0){r=new Set;for(const l of a.pending.values())for(const i of l)r.add(a.items.get(i).e)}for(var o=0;o<t.length;o++){var c=t[o];if(r!=null&&r.has(c)){c.f|=Na;const l=document.createDocumentFragment();As(c,l)}else Gt(t[o],n)}}var li;function Ce(a,t,n,r,o,c=null){var l=a,i=new Map,u=(t&al)!==0;if(u){var f=a;l=f.appendChild(Ma())}var h=null,g=Ps(()=>{var y=n();return ws(y)?y:y==null?[]:fo(y)}),_,b=new Map,w=!0;function x(y){(z.effect.f&ca)===0&&(z.pending.delete(y),z.fallback=h,_u(z,_,l,t,r),h!==null&&(_.length===0?(h.f&Na)===0?Zr(h):(h.f^=Na,ur(h,null,l)):mn(h,()=>{h=null})))}function S(y){z.pending.delete(y)}var C=Qn(()=>{_=e(g);for(var y=_.length,q=new Set,T=qe,N=Dl(),L=0;L<y;L+=1){var ae=_[L],ne=r(ae,L),re=w?null:i.get(ne);re?(re.v&&Bn(re.v,ae),re.i&&Bn(re.i,L),N&&T.unskip_effect(re.e)):(re=pu(i,w?l:li??(li=Ma()),ae,ne,L,o,t,n),w||(re.e.f|=Na),i.set(ne,re)),q.add(ne)}if(y===0&&c&&!h&&(w?h=Xt(()=>c(l)):(h=Xt(()=>c(li??(li=Ma()))),h.f|=Na)),y>q.size&&Jc(),!w)if(b.set(T,q),N){for(const[ee,Q]of i)q.has(ee)||T.skip_effect(Q.e);T.oncommit(x),T.ondiscard(S)}else x(T);e(g)}),z={effect:C,items:i,pending:b,outrogroups:null,fallback:h};w=!1}function tr(a){for(;a!==null&&(a.f&ma)===0;)a=a.next;return a}function _u(a,t,n,r,o){var re,ee,Q,se,B,R,ce,he,me;var c=(r&ld)!==0,l=t.length,i=a.items,u=tr(a.effect.first),f,h=null,g,_=[],b=[],w,x,S,C;if(c)for(C=0;C<l;C+=1)w=t[C],x=o(w,C),S=i.get(x).e,(S.f&Na)===0&&((ee=(re=S.nodes)==null?void 0:re.a)==null||ee.measure(),(g??(g=new Set)).add(S));for(C=0;C<l;C+=1){if(w=t[C],x=o(w,C),S=i.get(x).e,a.outrogroups!==null)for(const ye of a.outrogroups)ye.pending.delete(S),ye.done.delete(S);if((S.f&Zt)!==0&&(Zr(S),c&&((se=(Q=S.nodes)==null?void 0:Q.a)==null||se.unfix(),(g??(g=new Set)).delete(S))),(S.f&Na)!==0)if(S.f^=Na,S===u)ur(S,null,n);else{var z=h?h.next:u;S===a.effect.last&&(a.effect.last=S.prev),S.prev&&(S.prev.next=S.next),S.next&&(S.next.prev=S.prev),$a(a,h,S),$a(a,S,z),ur(S,z,n),h=S,_=[],b=[],u=tr(h.next);continue}if(S!==u){if(f!==void 0&&f.has(S)){if(_.length<b.length){var y=b[0],q;h=y.prev;var T=_[0],N=_[_.length-1];for(q=0;q<_.length;q+=1)ur(_[q],y,n);for(q=0;q<b.length;q+=1)f.delete(b[q]);$a(a,T.prev,N.next),$a(a,h,T),$a(a,N,y),u=y,h=N,C-=1,_=[],b=[]}else f.delete(S),ur(S,u,n),$a(a,S.prev,S.next),$a(a,S,h===null?a.effect.first:h.next),$a(a,h,S),h=S;continue}for(_=[],b=[];u!==null&&u!==S;)(f??(f=new Set)).add(u),b.push(u),u=tr(u.next);if(u===null)continue}(S.f&Na)===0&&_.push(S),h=S,u=tr(S.next)}if(a.outrogroups!==null){for(const ye of a.outrogroups)ye.pending.size===0&&(ds(a,fo(ye.done)),(B=a.outrogroups)==null||B.delete(ye));a.outrogroups.size===0&&(a.outrogroups=null)}if(u!==null||f!==void 0){var L=[];if(f!==void 0)for(S of f)(S.f&Zt)===0&&L.push(S);for(;u!==null;)(u.f&Zt)===0&&u!==a.fallback&&L.push(u),u=tr(u.next);var ae=L.length;if(ae>0){var ne=(r&al)!==0&&l===0?n:null;if(c){for(C=0;C<ae;C+=1)(ce=(R=L[C].nodes)==null?void 0:R.a)==null||ce.measure();for(C=0;C<ae;C+=1)(me=(he=L[C].nodes)==null?void 0:he.a)==null||me.fix()}hu(a,L,ne)}}c&&ja(()=>{var ye,je;if(g!==void 0)for(S of g)(je=(ye=S.nodes)==null?void 0:ye.a)==null||je.apply()})}function pu(a,t,n,r,o,c,l,i){var u=(l&sd)!==0?(l&cd)===0?Hd(n,!1,!1):nn(n):null,f=(l&id)!==0?nn(o):null;return{v:u,i:f,e:Xt(()=>(c(t,u??n,f??o,i),()=>{a.delete(r)}))}}function ur(a,t,n){if(a.nodes)for(var r=a.nodes.start,o=a.nodes.end,c=t&&(t.f&Na)===0?t.nodes.start:n;r!==null;){var l=Pr(r);if(c.before(r),r===o)return;r=l}}function $a(a,t,n){t===null?a.effect.first=n:t.next=n,n===null?a.effect.last=t:n.prev=t}function $e(a,t,n,r,o){var i;var c=(i=t.$$slots)==null?void 0:i[n],l=!1;c===!0&&(c=t.children,l=!0),c===void 0||c(a,l?()=>r:r)}function Cr(a,t,n){var r=new Is(a);Qn(()=>{var o=t()??null;r.ensure(o,o&&(c=>n(c,o)))},an)}function gu(a,t,n,r,o,c){var l=null,i=a,u=new Is(i,!1);Qn(()=>{const f=t()||null;var h=_d;if(f===null){u.ensure(null,null);return}return u.ensure(f,g=>{if(f){if(l=Pl(f,h),xn(l,l),r){var _=null,b=l.appendChild(Ma());r(l,b),_==null||_.remove()}st.nodes.end=l,g.before(l)}}),()=>{}},an),_o(()=>{})}function Nr(a,t){var n;n=document.head.appendChild(Ma());try{Qn(()=>{var r=Xt(()=>t(n));r.f|=Zi})}finally{}}function mu(a,t){var n=void 0,r;Cl(()=>{n!==(n=t())&&(r&&(Gt(r),r=null),n&&(r=Xt(()=>{po(()=>n(a))})))})}function Yl(a){var t,n,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var o=a.length;for(t=0;t<o;t++)a[t]&&(n=Yl(a[t]))&&(r&&(r+=" "),r+=n)}else for(n in a)a[n]&&(r&&(r+=" "),r+=n);return r}function bu(){for(var a,t,n=0,r="",o=arguments.length;n<o;n++)(a=arguments[n])&&(t=Yl(a))&&(r&&(r+=" "),r+=t);return r}function yu(a){return typeof a=="object"?bu(a):a??""}const ci=[...` 	
\r\f \v\uFEFF`];function ku(a,t,n){var r=a==null?"":""+a;if(t&&(r=r?r+" "+t:t),n){for(var o of Object.keys(n))if(n[o])r=r?r+" "+o:o;else if(r.length)for(var c=o.length,l=0;(l=r.indexOf(o,l))>=0;){var i=l+c;(l===0||ci.includes(r[l-1]))&&(i===r.length||ci.includes(r[i]))?r=(l===0?"":r.substring(0,l))+r.substring(i+1):l=i}}return r===""?null:r}function di(a,t=!1){var n=t?" !important;":";",r="";for(var o of Object.keys(a)){var c=a[o];c!=null&&c!==""&&(r+=" "+o+": "+c+n)}return r}function No(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function wu(a,t){if(t){var n="",r,o;if(Array.isArray(t)?(r=t[0],o=t[1]):r=t,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,l=0,i=!1,u=[];r&&u.push(...Object.keys(r).map(No)),o&&u.push(...Object.keys(o).map(No));var f=0,h=-1;const x=a.length;for(var g=0;g<x;g++){var _=a[g];if(i?_==="/"&&a[g-1]==="*"&&(i=!1):c?c===_&&(c=!1):_==="/"&&a[g+1]==="*"?i=!0:_==='"'||_==="'"?c=_:_==="("?l++:_===")"&&l--,!i&&c===!1&&l===0){if(_===":"&&h===-1)h=g;else if(_===";"||g===x-1){if(h!==-1){var b=No(a.substring(f,h).trim());if(!u.includes(b)){_!==";"&&g++;var w=a.substring(f,g).trim();n+=" "+w+";"}}f=g+1,h=-1}}}}return r&&(n+=di(r)),o&&(n+=di(o,!0)),n=n.trim(),n===""?null:n}return a==null?null:String(a)}function Ge(a,t,n,r,o,c){var l=a[Qo];if(l!==n||l===void 0){var i=ku(n,r,c);i==null?a.removeAttribute("class"):t?a.className=i:a.setAttribute("class",i),a[Qo]=n}else if(c&&o!==c)for(var u in c){var f=!!c[u];(o==null||f!==!!o[u])&&a.classList.toggle(u,f)}return c}function jo(a,t={},n,r){for(var o in n){var c=n[o];t[o]!==c&&(n[o]==null?a.style.removeProperty(o):a.style.setProperty(o,c,r))}}function Rt(a,t,n,r){var o=a[Xo];if(o!==t){var c=wu(t,r);c==null?a.removeAttribute("style"):a.style.cssText=c,a[Xo]=t}else r&&(Array.isArray(r)?(jo(a,n==null?void 0:n[0],r[0]),jo(a,n==null?void 0:n[1],r[1],"important")):jo(a,n,r));return r}function At(a,t,n=!1){if(a.multiple){if(t==null)return;if(!ws(t))return md();for(var r of a.options)r.selected=t.includes(_r(r));return}for(r of a.options){var o=_r(r);if(Wd(o,t)){r.selected=!0;return}}(!n||t!==void 0)&&(a.selectedIndex=-1)}function Bt(a){var t=new MutationObserver(()=>{"__value"in a&&At(a,a.__value)});t.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),_o(()=>{t.disconnect()})}function eo(a,t,n=t){var r=new WeakSet,o=!0;vl(a,"change",c=>{var l=c?"[selected]":":checked",i;if(a.multiple)i=[].map.call(a.querySelectorAll(l),_r);else{var u=a.querySelector(l)??a.querySelector("option:not([disabled])");i=u&&_r(u)}n(i),a.__value=i,qe!==null&&r.add(qe)}),po(()=>{var c=t();if(a===document.activeElement){var l=qe;if(r.has(l))return}if(At(a,c,o),o&&c===void 0){var i=a.querySelector(":checked");i!==null&&(c=_r(i),n(c))}a.__value=c,o=!1}),Bt(a)}function _r(a){return"__value"in a?a.__value:a.value}const ar=Symbol("class"),nr=Symbol("style"),Gl=Symbol("is custom element"),Vl=Symbol("is html"),xu=ho?"input":"INPUT",Su=ho?"option":"OPTION",Tu=ho?"select":"SELECT",Du=ho?"progress":"PROGRESS";function to(a,t){var n=go(a);n.value===(n.value=t??void 0)||a.value===t&&(t!==0||a.nodeName!==Du)||(a.value=t??"")}function Kl(a,t){var n=go(a);n.checked!==(n.checked=t??void 0)&&(a.checked=t)}function Pu(a,t){t?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function O(a,t,n,r){var o=go(a);o[t]!==(o[t]=n)&&(t==="loading"&&(a[Vc]=n),n==null?a.removeAttribute(t):typeof n!="string"&&$l(a).includes(t)?a[t]=n:a.setAttribute(t,n))}function Mu(a,t,n,r,o=!1,c=!1){var l=go(a),i=l[Gl],u=!l[Vl],f=t||{},h=a.nodeName===Su;for(var g in t)g in n||(n[g]=null);n.class?n.class=yu(n.class):n[ar]&&(n.class=null),n[nr]&&(n.style??(n.style=null));var _=$l(a);if(a.nodeName===xu&&"type"in n&&("value"in n||"__value"in n)){var b=n.type;(b!==f.type||b===void 0&&a.hasAttribute("type"))&&(f.type=b,O(a,"type",b))}for(const T in n){let N=n[T];if(h&&T==="value"&&N==null){a.value=a.__value="",f[T]=N;continue}if(T==="class"){var w=a.namespaceURI==="http://www.w3.org/1999/xhtml";Ge(a,w,N,r,t==null?void 0:t[ar],n[ar]),f[T]=N,f[ar]=n[ar];continue}if(T==="style"){Rt(a,N,t==null?void 0:t[nr],n[nr]),f[T]=N,f[nr]=n[nr];continue}var x=f[T];if(!(N===x&&!(N===void 0&&a.hasAttribute(T)))){f[T]=N;var S=T[0]+T[1];if(S!=="$$")if(S==="on"){const L={},ae="$$"+T;let ne=T.slice(2);var C=ru(ne);if(au(ne)&&(ne=ne.slice(0,-7),L.capture=!0),!C&&x){if(N!=null)continue;a.removeEventListener(ne,f[ae],L),f[ae]=null}if(C)G(ne,a,N),yt([ne]);else if(N!=null){let re=function(ee){f[T].call(this,ee)};var q=re;f[ae]=Ul(ne,a,re,L)}}else if(T==="style")O(a,T,N);else if(T==="autofocus")pn(a,!!N);else if(!i&&(T==="__value"||T==="value"&&N!=null))a.value=a.__value=N;else if(T==="selected"&&h)Pu(a,N);else{var z=T;u||(z=su(z));var y=z==="defaultValue"||z==="defaultChecked";if(N==null&&!i&&!y)if(l[T]=null,z==="value"||z==="checked"){let L=a;const ae=t===void 0;if(z==="value"){let ne=L.defaultValue;L.removeAttribute(z),L.defaultValue=ne,L.value=L.__value=ae?ne:null}else{let ne=L.defaultChecked;L.removeAttribute(z),L.defaultChecked=ne,L.checked=ae?ne:!1}}else a.removeAttribute(T);else y||_.includes(z)&&(i||typeof N!="string")?(a[z]=N,z in l&&(l[z]=It)):typeof N!="function"&&O(a,z,N)}}}return f}function ui(a,t,n=[],r=[],o=[],c,l=!1,i=!1){Ds(o,n,r,u=>{var f=void 0,h={},g=a.nodeName===Tu,_=!1;if(Cl(()=>{var w=t(...u.map(e)),x=Mu(a,f,w,c,l,i);_&&g&&"value"in w&&At(a,w.value);for(let C of Object.getOwnPropertySymbols(h))w[C]||Gt(h[C]);for(let C of Object.getOwnPropertySymbols(w)){var S=w[C];C.description===pd&&(!f||S!==f[C])&&(h[C]&&Gt(h[C]),h[C]=Xt(()=>mu(a,()=>S))),x[C]=S}f=x}),g){var b=a;po(()=>{At(b,f.value,!0),Bt(b)})}_=!0})}function go(a){return a[Or]??(a[Or]={[Gl]:a.nodeName.includes("-"),[Vl]:a.namespaceURI===ol})}var vi=new Map;function $l(a){var t=a.getAttribute("is")||a.nodeName,n=vi.get(t);if(n)return n;vi.set(t,n=[]);for(var r,o=a,c=Element.prototype;c!==o;){r=Ji(o);for(var l in r)r[l].set&&l!=="innerHTML"&&l!=="textContent"&&l!=="innerText"&&n.push(l);o=xs(o)}return n}function wt(a,t,n=t){var r=new WeakSet;vl(a,"input",async o=>{var c=o?a.defaultValue:a.value;if(c=Fo(a)?Ao(c):c,n(c),qe!==null&&r.add(qe),await tu(),c!==(c=t())){var l=a.selectionStart,i=a.selectionEnd,u=a.value.length;if(a.value=c??"",i!==null){var f=a.value.length;l===i&&i===u&&f>u?(a.selectionStart=f,a.selectionEnd=f):(a.selectionStart=l,a.selectionEnd=Math.min(i,f))}}}),Vt(t)==null&&a.value&&(n(Fo(a)?Ao(a.value):a.value),qe!==null&&r.add(qe)),js(()=>{var o=t();if(a===document.activeElement){var c=qe;if(r.has(c))return}Fo(a)&&o===Ao(a.value)||a.type==="date"&&!o&&!a.value||o!==a.value&&(a.value=o??"")})}function Fo(a){var t=a.type;return t==="number"||t==="range"}function Ao(a){return a===""?null:+a}function Io(a,t){return a===t||(a==null?void 0:a[Aa])===t}function Eu(a={},t,n,r){var o=Et.r,c=st;return po(()=>{var l,i;return js(()=>{l=i,i=[],Vt(()=>{Io(n(...i),a)||(t(a,...i),l&&Io(n(...l),a)&&t(null,...l))})}),()=>{let u=c;for(;u!==o&&u.parent!==null&&u.parent.f&Jo;)u=u.parent;const f=()=>{i&&Io(n(...i),a)&&t(null,...i)},h=u.teardown;u.teardown=()=>{f(),h==null||h()}}}),a}function Cu(a=!1){const t=Et,n=t.l.u;if(!n)return;let r=()=>sn(t.s);if(a){let o=0,c={};const l=On(()=>{let i=!1;const u=t.s;for(const f in u)u[f]!==c[f]&&(c[f]=u[f],i=!0);return i&&o++,o});r=()=>e(l)}n.b.length&&Kd(()=>{fi(t,r),Ko(n.b)}),St(()=>{const o=Vt(()=>n.m.map(Gc));return()=>{for(const c of o)typeof c=="function"&&c()}}),n.a.length&&St(()=>{fi(t,r),Ko(n.a)})}function fi(a,t){if(a.l.s)for(const n of a.l.s)e(n);t()}const Nu={get(a,t){if(!a.exclude.includes(t))return e(a.version),t in a.special?a.special[t]():a.props[t]},set(a,t,n){if(!(t in a.special)){var r=st;try{ya(a.parent_effect),a.special[t]=pa({get[t](){return a.props[t]}},t,nl)}finally{ya(r)}}return a.special[t](n),ai(a.version),!0},getOwnPropertyDescriptor(a,t){if(!a.exclude.includes(t)&&t in a.props)return{enumerable:!0,configurable:!0,value:a.props[t]}},deleteProperty(a,t){return a.exclude.includes(t)||(a.exclude.push(t),ai(a.version)),!0},has(a,t){return a.exclude.includes(t)?!1:t in a.props},ownKeys(a){return Reflect.ownKeys(a.props).filter(t=>!a.exclude.includes(t))}};function Ve(a,t){return new Proxy({props:a,exclude:t,special:{},version:nn(0),parent_effect:st},Nu)}const ju={get(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(er(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(a,t,n){let r=a.props.length;for(;r--;){let o=a.props[r];er(o)&&(o=o());const c=en(o,t);if(c&&c.set)return c.set(n),!0}return!1},getOwnPropertyDescriptor(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(er(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const o=en(r,t);return o&&!o.configurable&&(o.configurable=!0),o}}},has(a,t){if(t===Aa||t===tl)return!1;for(let n of a.props)if(er(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(a){const t=[];for(let n of a.props)if(er(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function Qe(...a){return new Proxy({props:a},ju)}function pa(a,t,n,r){var q;var o=!Kn||(n&ud)!==0,c=(n&vd)!==0,l=(n&fd)!==0,i=r,u=!0,f=void 0,h=()=>l&&o?(f??(f=On(r)),e(f)):(u&&(u=!1,i=l?Vt(r):r),i);let g;if(c){var _=Aa in a||tl in a;g=((q=en(a,t))==null?void 0:q.set)??(_&&t in a?T=>a[t]=T:void 0)}var b,w=!1;c?[b,w]=Td(()=>a[t]):b=a[t],b===void 0&&r!==void 0&&(b=h(),g&&(o&&td(),g(b)));var x;if(o?x=()=>{var T=a[t];return T===void 0?h():(u=!0,T)}:x=()=>{var T=a[t];return T!==void 0&&(i=void 0),T===void 0?i:T},o&&(n&nl)===0)return x;if(g){var S=a.$$legacy;return(function(T,N){return arguments.length>0?((!o||!N||S||w)&&g(N?x():T),T):x()})}var C=!1,z=((n&dd)!==0?On:Ps)(()=>(C=!1,x()));c&&e(z);var y=st;return(function(T,N){if(arguments.length>0){const L=N?e(z):o&&c?Be(T):T;return v(z,L),C=!0,i!==void 0&&(i=L),T}return Wa&&C||(y.f&ca)!==0?z.v:e(z)})}function rn(a){Et===null&&Kc(),Kn&&Et.l!==null?Fu(Et).m.push(a):St(()=>{const t=Vt(a);if(typeof t=="function")return t})}function Fu(a){var t=a.l;return t.u??(t.u={a:[],b:[],m:[]})}const Au="modulepreload",Iu=function(a){return"/"+a},hi={},qu=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let l=function(f){return Promise.all(f.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=l(n.map(f=>{if(f=Iu(f),f in hi)return;hi[f]=!0;const h=f.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${g}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":Au,h||(_.as="script"),_.crossOrigin="",_.href=f,u&&_.setAttribute("nonce",u),document.head.appendChild(_),h)return new Promise((b,w)=>{_.addEventListener("load",b),_.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${f}`)))})}))}function c(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return o.then(l=>{for(const i of l||[])i.status==="rejected"&&c(i.reason);return t().catch(c)})},Ru="5";var Ki;typeof window<"u"&&((Ki=window.__svelte??(window.__svelte={})).v??(Ki.v=new Set)).add(Ru);wd();/**
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
 */const Lu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const Ou=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const _i=(...a)=>a.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var Bu=Tn("<svg><!><!></svg>");function Xe(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]),r=Ve(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);vt(t,!1);let o=pa(t,"name",8,void 0),c=pa(t,"color",8,"currentColor"),l=pa(t,"size",8,24),i=pa(t,"strokeWidth",8,2),u=pa(t,"absoluteStrokeWidth",8,!1),f=pa(t,"iconNode",24,()=>[]);Cu();var h=Bu();ui(h,(b,w,x)=>({...Lu,...b,...r,width:l(),height:l(),stroke:c(),"stroke-width":w,class:x}),[()=>Ou(r)?void 0:{"aria-hidden":"true"},()=>(sn(u()),sn(i()),sn(l()),Vt(()=>u()?Number(i())*24/Number(l()):i())),()=>(sn(_i),sn(o()),sn(n),Vt(()=>_i("lucide-icon","lucide",o()?`lucide-${o()}`:"",n.class)))]);var g=s(h);Ce(g,1,f,Ha,(b,w)=>{var x=I(()=>Xi(e(w),2));let S=()=>e(x)[0],C=()=>e(x)[1];var z=Le(),y=Ne(z);gu(y,S,!0,(q,T)=>{ui(q,()=>({...C()}))}),m(b,z)});var _=d(g);$e(_,t,"default",{}),m(a,h),ft()}function pi(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];Xe(a,Qe({name:"award"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function zu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];Xe(a,Qe({name:"bell"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Hu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];Xe(a,Qe({name:"book-open"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Uu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];Xe(a,Qe({name:"calendar-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Jl(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];Xe(a,Qe({name:"calendar-days"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Wu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];Xe(a,Qe({name:"calendar-range"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function qs(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];Xe(a,Qe({name:"chart-column"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function za(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];Xe(a,Qe({name:"check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Hn(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];Xe(a,Qe({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Yu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m15 18-6-6 6-6"}]];Xe(a,Qe({name:"chevron-left"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Un(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];Xe(a,Qe({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function us(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];Xe(a,Qe({name:"circle-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Ql(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];Xe(a,Qe({name:"circle-question-mark"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function gr(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];Xe(a,Qe({name:"clock"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Gu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];Xe(a,Qe({name:"download"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Vu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];Xe(a,Qe({name:"ellipsis-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Ku(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];Xe(a,Qe({name:"flame"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function $u(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];Xe(a,Qe({name:"folder"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Ju(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];Xe(a,Qe({name:"grip-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Qu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]];Xe(a,Qe({name:"languages"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Xl(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["rect",{x:"3",y:"4",width:"6",height:"6",rx:"1"}]];Xe(a,Qe({name:"list-todo"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Xu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];Xe(a,Qe({name:"mail"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Zu(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];Xe(a,Qe({name:"palette"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ev(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];Xe(a,Qe({name:"pause"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Rs(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];Xe(a,Qe({name:"pencil"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ao(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];Xe(a,Qe({name:"play"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Wn(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];Xe(a,Qe({name:"plus"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function Zl(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];Xe(a,Qe({name:"quote"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function tv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];Xe(a,Qe({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function av(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];Xe(a,Qe({name:"rotate-ccw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function nv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]];Xe(a,Qe({name:"save"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function rv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];Xe(a,Qe({name:"search"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ov(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];Xe(a,Qe({name:"settings"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function sv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 4v16"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]];Xe(a,Qe({name:"skip-forward"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function iv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];Xe(a,Qe({name:"square"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function lv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Xe(a,Qe({name:"sun"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function cv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];Xe(a,Qe({name:"sunrise"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function dv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];Xe(a,Qe({name:"tag"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function vs(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];Xe(a,Qe({name:"target"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function mo(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Xe(a,Qe({name:"trash-2"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function qo(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];Xe(a,Qe({name:"trending-up"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function uv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Xe(a,Qe({name:"upload"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function vv(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]];Xe(a,Qe({name:"user-round"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}function ec(a,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Xe(a,Qe({name:"x"},()=>n,{get iconNode(){return r},children:(o,c)=>{var l=Le(),i=Ne(l);$e(i,t,"default",{}),m(o,l)},$$slots:{default:!0}}))}const fv="/timer";function tc(){const a=window.location.hash,t=a.startsWith("#")?a.slice(1):a;return!t||t==="/"?fv:t}let Ls=W(Be(tc())),gi=!1;function hv(){gi||typeof window>"u"||(gi=!0,window.addEventListener("hashchange",()=>{v(Ls,tc(),!0)}))}hv();function _v(){return e(Ls)}function ac(a){if(window.location.hash===`#${a}`){v(Ls,a,!0);return}window.location.hash=a}const pv=[{path:"/timer",labelKey:"timer"},{path:"/tasks",labelKey:"tasks"},{path:"/stats",labelKey:"stats"},{path:"/settings",labelKey:"settings"},{path:"/help",labelKey:"help"}],gv={page:{timer:"番茄钟 - PomoFlow",tasks:"任务 - PomoFlow",stats:"统计 - PomoFlow",settings:"配置 - PomoFlow"},nav:{timer:"番茄钟",tasks:"任务清单",stats:"统计",settings:"配置",help:"帮助与反馈",mainNav:"主导航"},mode:{focus:"专注",shortBreak:"短休息",longBreak:"长休息",focusing:"专注中"},priority:{high:"高",medium:"中",low:"低",none:"无"},common:{confirm:"知道了",noData:"暂无任务",reviewPlaceholder:"写点复盘…",ariaCompleted:"已完成",ariaMarkDone:"标记完成",ariaMarkUndone:"标记为未完成",loading:"加载中...",close:"关闭",clear:"清除",add:"添加",expand:"展开",collapse:"收起"},timer:{start:"开始专注",startBreak:"开始休息啦",pause:"暂停",resume:"继续",stop:"停止",abandon:"放弃",skip:"跳过",starting:"启动中...",todayDone:"今日已完成",pomodoroUnit:"个番茄钟",pomodoros:"番茄",taskList:"任务清单",todayFocus:"今日专注",minute:"分钟",selectTask:"选择专注任务",selectTaskPlaceholder:"-- 选择任务 --",modeTabsAria:"计时器模式",noSpecificTask:"无特定任务",noTodoTask:"暂无待办任务",reviewTitle:"📝 今日日复盘",reviewPlaceholder:"记录今天的复盘…",clearFilter:"清除筛选",startTooltip:"开始专注",mottoRefresh:"换一条",modalTitle:"提示",focusCompleteTitle:"专注完成",noTask:"暂无任务",expandSubtasks:"展开子任务",collapseSubtasks:"收起子任务"},filter:{project:"项目",tag:"标签",priority:"优先级",date:"日　期",all:"全部",allProject:"全部项目",allTag:"全部标签",allPriority:"全部优先级",today:"今天",tomorrow:"明天",thisWeek:"本周",week:"本周",month:"本月",startDate:"开始日期",endDate:"结束日期",dueDate:"到期日",start:"开始",end:"结束",to:"至",export:"导出",projectAria:"项目筛选",tagAria:"标签筛选",priorityAria:"优先级筛选"},export:{index:"序号",title:"任务描述",project:"项目",priority:"优先级",dueDate:"到期日",estimated:"预计番茄数",tags:"标签",subtasks:"子任务",status:"任务状态",statusActive:"未完成",statusCompleted:"已完成",fileName:"任务清单"},task:{statEstimated:"预计时间",statActive:"待完成任务",statFocused:"已专注时间",statCompleted:"已完成任务",statCompletedPomo:"已完成番茄钟",searchResult:"搜索结果",list:"清单",task:"任务",noTask:"暂无任务",noDate:"未安排日期",unscheduled:"未安排",minute:"分钟",startTooltip:"开始专注",detailPriority:"优先级",detailPomodoro:"番茄",detailDueDate:"到期日",detailProject:"清单",detailReminder:"提醒",detailRepeat:"重复",detailNoTags:"无标签",detailEditTags:"编辑标签",detailCollapse:"收起",detailAddSubtask:"添加子任务...",subtaskEditPlaceholder:"修改子任务...",editSubtask:"编辑子任务",deleteSubtask:"删除子任务",detailAddNote:"添加备注...",detailDelete:"删除任务",detailNoProject:"无",detailNoTagsAvailable:"暂无可用标签",detailEmpty:"点击任务查看详情",detailTimeFilled:"已用当前时间补全截止时间，如需调整请在「到期日」中修改。",deleteConfirm:"删除任务「{title}」？",emptyAll:"暂无任务，添加一个开始吧",emptyFiltered:"此筛选下没有任务",groupHeader:"{date}（{weekday}）| {n} 分钟",detailPanelAria:"任务详情",titleAria:"标题",detailDescription:"描述",detailDescPlaceholder:"补充细节...",detailSubtasks:"子任务",newSubtaskAria:"新子任务",unknownProject:"未知",toggleSubtaskAria:"切换子任务完成",dblclickToEdit:"双击编辑",noTagsHint:"还没有标签，在「设置 → 标签」里创建",tagPickerAria:"标签多选",saveFailed:"保存失败：{err}",setTagsFailed:"设置标签失败：{err}",addSubtaskFailed:"添加子任务失败：{err}",updateSubtaskFailed:"更新子任务失败：{err}",deleteSubtaskFailed:"删除子任务失败：{err}"},stats:{dimToday:"今日",dimWeek:"本周",dimMonth:"本月",dimQuarter:"季度",dimHalf:"半年",dimYear:"年",focusDuration:"专注时长",sessions:"番茄数",completed:"完成任务",avg:"日均专注",activeDays:"活跃天数",longestStreak:"最长连续专注",avgWeek:"周均专注",avgMonth:"月均专注",peakMonth:"高峰月",peakPeriod:"高峰期",bestProject:"最佳项目",momRatio:"环比上期",trendTitle:"专注趋势",projectDist:"项目时间分布",noData:"该维度暂无专注数据",noProject:"暂无项目数据",unitMin:"分钟",unitCount:"个",unitDay:"天",byDay:"日",byWeek:"周",byMonth:"月",weeklyFocusTitle:"本周专注时长（分钟）",loading:"统计加载中...",loadError:"统计加载失败：{err}",trendChartAria:"专注趋势柱状图",donutChartAria:"项目时间分布环形图"},enum:{reminder:{"":"不提醒",on_time:"准时","5m":"提前 5 分钟","30m":"提前 30 分钟","1h":"提前 1 小时","1d":"提前 1 天","2d":"提前 2 天"},repeat:{"":"不重复",daily:"每天",weekday:"每个工作日",weekly:"每周",monthly:"每月",yearly:"每年",custom:"自定义"},weekday:["周日","周一","周二","周三","周四","周五","周六"]},settings:{tab:{account:"账号",timer:"番茄钟",lists:"清单管理",tags:"标签管理",theme:"主题背景",motto:"名言警句",notification:"通知文案",language:"中英切换"},language:{title:"界面语言",desc:"选择系统的显示语言，切换后所有页面文字随之变化",zh:"中文",en:"英文"},timerTitle:"番茄钟",timerParams:"番茄钟参数",durationSetting:"时长设置",behaviorSetting:"行为偏好",focusDuration:"番茄时长",shortBreakDuration:"短时休息",longBreakDuration:"长时休息",longBreakInterval:"长时休息间隔",longBreakIntervalEvery:"长休息间隔（每 N 个专注）",minute:"分钟",pomodoroUnit:"个番茄",autoStartNext:"自动开始下个番茄",autoStartNextDesc:"完成一个番茄后立即开始下一个",autoStartBreak:"自动开始休息",autoStartBreakDesc:"番茄完成后自动进入休息时段",autoEnterBreak:"专注完成后自动进入休息",disableBreak:"禁用休息",disableBreakDesc:"开启后将跳过所有休息时段",soundEnabled:"完成提示音",systemNotification:"系统通知",reset:"恢复默认",accountNotOpen:"该功能暂未开放",systemSection:"系统能力",autostart:"开机自启动",autostartHint:"OS 启动时自动运行 PomoFlow（静默启动，常驻托盘）",on:"已开启",off:"已关闭",notifTest:"系统通知测试",notifTestHint:"发送一条测试通知，验证系统通知链路是否通",sendTest:"发送测试",trayHint:"💡 关闭主窗口时 PomoFlow 会驻留在系统托盘，右键托盘图标可『显示窗口 / 退出』。",autostartFail:"自启动切换失败：{err}",notifPermDenied:"通知权限未授予，无法发送",notifSendFail:"通知失败：{err}",testNotifTitle:"PomoFlow 测试通知",testNotifBody:"当前 active 任务数：{n}",theme:{title:"主题背景",desc:"上方选主题决定主色（按钮、进度环、导航指示），下方选背景图可单独替换背景层——两者互不影响。",preset:"预设主题",presetBg:"预设背景",presetBgHint:"点选 8 张之一即可换背景；主色仍由上方所选主题决定。",presetBgName:{"preset-bg-1":"预设 1","preset-bg-2":"预设 2","preset-bg-3":"预设 3","preset-bg-4":"预设 4","preset-bg-5":"预设 5","preset-bg-6":"预设 6","preset-bg-7":"预设 7","preset-bg-8":"预设 8"},custom:"自定义背景",upload:"上传图片",customUsed:"已使用自定义背景",bgUsed:"已使用自定义背景图",presetBgUsed:"已使用预设背景",clearBg:"移除背景图",customHint:"支持 JPG/PNG，大图会自动压缩；上传图片会覆盖预设背景，主色仍由所选主题决定。",reset:"恢复默认",compressFail:"图片处理失败，请换一张",bgTooLarge:"背景图片过大，无法持久保存。本次使用有效，但刷新后需重新设置。",presetName:{default:"默认",sunny:"暖阳",ocean:"海洋",forest:"森林",dusk:"黄昏",lavender:"薰衣草",evening:"暮色",teal:"青石"}},motto:{title:"名言警句",addPlaceholder:"输入名言…",authorPlaceholder:"作者（可选）",addBtn:"添加",empty:"暂未添加自定义名言。番茄钟页面将轮播内置名言。",builtInBadge:"内置",defaultAuthor:"自定义",textRequired:"请输入名言内容",textTooLong:"名言不能超过 500 字",authorTooLong:"作者不能超过 64 字"},notification:{title:"通知文案",styleLabel:"提示风格",styleHintCustom:"自定义风格：填写下方文案 + 风格描述",styleHintPreset:"预设风格文案跟随界面语言自动切换；如需自定义文案请选择「自定义风格」。",styleDesc:"风格描述",styleDescPlaceholder:"如：霸气总裁风、文艺青年风…",focusEnd:"🍅 专注结束",breakEnd:"☕ 休息结束",reminder:"🔔 任务到期提醒",titleLabel:"标题",bodyLabel:"正文",placeholderHint:"用 {task_title} 作为任务名占位符，触发时自动替换",save:"保存",saved:"✓ 已保存",styleName:{default:"默认",cute:"卡哇伊",self_dep:"自嘲",strive:"奋斗",funny:"搞笑",custom:"自定义风格"},fallback:{focusTitle:"专注结束",focusBody:"番茄钟结束了，休息一下吧",breakTitle:"休息结束",breakBody:"休息结束，满满的能量开启新的任务专注。"}},repeatCustom:{title:"自定义重复",startDate:"开始日期",endDate:"结束日期",interval:"重复间隔（0~99）",type:"重复类型",typeDay:"日",typeWeek:"周",typeMonth:"月",typeYear:"年",weekdays:"重复在星期几（可多选）",monthDays:"重复在当月几日（可多选）",weekShort:["一","二","三","四","五","六","日"],needPickWeek:"请至少选择一个星期",needPickDay:"请至少选择一个日期",cancel:"取消",confirm:"确定"},list:{title:"清单管理",addRootPlaceholder:"一级清单名称",addRoot:"添加一级清单",addChild:"添加子清单",edit:"修改",del:"删除",level2Placeholder:"二级清单名称",level3Placeholder:"三级清单名称",empty:"暂无清单",dragHint:"按住拖动以重排或改变层级",reorderFail:"拖拽排序失败，请重试",reorderFailDepth:"层级过深，无法移动到此处",reorderFailCycle:"无法移动到当前位置（会形成循环）"},tag:{namePlaceholder:"输入新标签名称",add:"添加标签",colorLabel:"选择颜色：",colorAria:"颜色 {color}",nameLabel:"名称",empty:"暂无标签，请添加一个",dragHandle:"拖动以重排"}},form:{placeholder:"在此输入”任务描述”添加新任务，按「回车」键保存",titlePlaceholder:"任务标题...",pomodoroIcons:"预计番茄钟数",pomodoroUnit:"个番茄钟",more:"更多",collapse:"收起",submit:"提交",estimatedPomo:"预计番茄数",needTitle:"请输入任务名称",needTimeForReminder:"设置了提醒，请在到期日中选择具体时间（时分）",addFailed:"添加失败"},sidebar:{searchPlaceholder:"搜索",searchTasksPlaceholder:"搜索任务标题...",planned:"已计划",completed:"已完成",journal:"手账模式",emptyHint:"暂无清单，点击 + 添加",addRootAria:"新增根清单",addListTitle:"新增清单",listNamePlaceholder:"清单名称...",moreActions:"更多操作",deleteListConfirm:"删除此清单？子清单会一并删除"},journal:{monthTitle:"{year} 年 {month} 月",yearOption:"{year} 年",monthOption:"{month} 月",prevMonth:"上一月",nextMonth:"下一月",yearAria:"年份",monthAria:"月份",weekRange:"第 {n} 周（{ms}/{ds} ~ {me}/{de}）",weekday:["周一","周二","周三","周四","周五","周六","周日"],dailyReviewPlaceholder:"日复盘",weeklyReview:"📋 周复盘",weeklyReviewPlaceholder:"本周复盘"},monthPanel:{title:"{year}年{month}月 · 复盘",weeklyReadonly:"周复盘（只读 · 在手账模式每周区块内编辑）",noWeekly:"本月暂无周复盘",weekRange:"第 {n} 周（周一起 {date}）",empty:"（空）",monthlyReview:"📋 月度复盘",monthlyPlaceholder:"本月总结…"},help:{tab:{manual:"用户手册",faq:"常见问题",contact:"联系我们"},manual:{timer:{title:"🍅 番茄钟",items:[{text:"选择一个任务后点击「开始」，进入专注计时。专注结束后自动切换到休息模式。"},{text:"三种模式：「专注」（默认 25 分钟，可自定义）/「短休息」（默认 5 分钟）/「长休息」（默认 15 分钟，每 N 个番茄触发一次）。"},{text:"专注结束时弹出系统通知 + 模态框提示（文案可在「配置 → 通知文案」中自定义风格）。"},{text:"可开启「自动开始休息」「自动开始下个番茄」，专注结束后无需手动操作。"},{text:"计时器到点后即使切到其他页面，通知和自动衔接也会正常触发。"},{text:"右侧显示当月任务清单，支持按项目、标签、优先级、日期筛选。"},{text:"专注下方有「今日日复盘」文本框和「座右铭」卡片（可点换一条）。"}]},tasks:{title:"📋 任务清单",items:[{text:"左侧栏切换视图：今天 / 明天 / 本周 / 已计划 / 已完成 / 手账模式。"},{text:"「已计划」页支持按项目、标签、优先级、本周、本月、到期日范围筛选。"},{text:"任务支持：标题、备注、优先级（高/中/低/无）、到期日（含时分）、预计番茄数、番茄时长、提醒、重复。"},{text:"清单（项目）支持嵌套（最多 3 级）、自定义颜色。标签支持多对多、12 种预设色。"},{text:"子任务（Checklist）：每个任务可添加多个子任务，独立勾选完成。"},{text:"点击任务可展开右侧详情面板，直接编辑标题、到期日、优先级、提醒、重复、标签、子任务、备注。"}]},reminder:{title:"🔔 任务提醒",items:[{text:"设置提醒后，到达提醒时间点（到期日减去提前量）会弹出浏览器系统通知。"},{text:"提醒选项：准时 / 提前 5 分钟 / 30 分钟 / 1 小时 / 1 天 / 2 天。"},{text:"专注期间不弹提醒，专注结束后自动补弹（避免打断专注）。"},{text:"同一提醒只弹一次，不会重复打扰。"},{text:"设置提醒时必须填写到期日的时间（时分），否则会提示补全。"}]},repeat:{title:"🔁 任务重复",items:[{text:"内置规则：每天 / 工作日 / 每周 / 每月 / 每年。设置后自动预生成重复实例（上限 50 个）。"},{text:"「自定义」：可选重复间隔（0~99）、类型（日/周/月/年）。",sub:"间隔 0 = 每周期都重复；间隔 1 = 每隔 1 个周期（跳过 1 个）；间隔 N = 每隔 N 个周期。"},{text:"类型为「周」可选星期几（一~日多选）；类型为「月」可选当月几日（多选）。"},{text:"修改重复规则时，旧的未完成实例会自动删除并按新规则重新生成。"},{text:"每个重复实例会完整复制原任务的标签、子任务、备注、优先级、番茄数。"}]},journal:{title:"📔 手账模式",items:[{text:"月级视图，按自然周分组（周一~周日），每周内按 3+3+1 分行展示。"},{text:"每天方块显示当日任务（方形复选框可切完成）+ 日复盘文本框。"},{text:"每周底部有周复盘文本框。右侧面板展示当月各周复盘（只读）+ 月度复盘（可编辑）。"},{text:"支持上一月/下一月 + 年/月下拉切换。"},{text:"番茄钟页面的「今日日复盘」与手账模式当天的日复盘数据同步。"}]},stats:{title:"📊 统计报表",items:[{text:"6 种维度切换：今日 / 本周 / 本月 / 季度 / 半年 / 年。"},{text:"通用 4 卡：专注时长、番茄数、完成任务、日均专注。"},{text:"维度越长亮点越多：活跃天数、最长连续专注、周/月均、高峰期、最佳项目、环比上期。"},{text:"趋势柱状图（按日/周/月自动切换粒度）+ 圆环图（项目时间分布），全部跟随当前主题主色（accent）统一配色，告别五颜六色。"}]},settings:{title:"⚙️ 配置",items:[{text:"「番茄钟」：专注/休息时长、长时休息间隔（2~6 个番茄）、自动开始选项。"},{text:"「清单管理」：添加/修改/删除项目（嵌套 3 级）、自定义颜色。"},{text:"「标签管理」：添加/修改/删除标签、12 种预设色。"},{text:"「主题背景」：8 种预设主题（默认/暖阳/海洋/森林/黄昏/薰衣草/暮色/青石），各含专属背景渐变与配套主色；亦可自定义上传图片（自动压缩），所有页面统一半透明蒙层淡化背景、避免刺眼。"},{text:"「名言警句」：管理自定义座右铭（存数据库，番茄钟页轮播展示）。"},{text:"「通知文案」：6 种风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），分别配置专注结束/休息结束/任务提醒的标题和正文。"}]}},faq:{items:[{q:"数据保存在哪里？会丢失吗？",a:"所有数据（任务、番茄记录、复盘、名言、通知文案、主题设置）保存在本地 SQLite 数据库（pomoflow.db）和浏览器 localStorage 中，无需联网。升级版本时数据库会自动迁移，旧数据完整保留。建议定期备份 pomoflow.db 文件。"},{q:"如何修改番茄时长和长时休息间隔？",a:"进入「配置」→「番茄钟」，在「番茄时长」「短时休息」「长时休息」下拉框中选择分钟数（1~90 分钟可选）。长时休息间隔可选 2~6 个番茄（即每完成几个番茄触发一次长休息）。"},{q:"为什么专注期间不弹任务提醒？",a:"这是设计行为。专注期间系统会抑制所有任务提醒，避免打断你的专注。专注结束后会自动补弹被跳过的提醒。"},{q:"任务提醒不弹通知怎么办？",a:"首次使用时浏览器会请求通知权限，需要点击「允许」。如果之前拒绝了，可在浏览器地址栏左侧的设置图标中重新允许通知。另外，提醒需要任务设置了「到期日+具体时间（时分）」和「提醒选项」才会触发。"},{q:"自定义重复的间隔 0 和间隔 1 有什么区别？",a:"间隔 0 = 每个周期都重复（如每天都出现）。间隔 1 = 每隔 1 个周期（如第 1 周、第 3 周、第 5 周，跳过第 2、4 周）。间隔 N = 跳过 N 个周期后再重复。"},{q:"手账模式的周复盘和月度复盘在哪里编辑？",a:"周复盘在每周区块底部的文本框直接编辑（失焦自动保存）。月度复盘在右侧面板的「📋 月度复盘」文本框编辑。左侧编辑后右侧面板会自动刷新。"},{q:"自定义名言存在哪里？刷新会丢失吗？",a:"自定义名言存在数据库（pomoflow.db）中，刷新页面不会丢失。内置的 50 条名言是程序自带的。番茄钟页面的名言卡片优先轮播自定义名言（逐条不重复），轮完一轮后重新开始。"},{q:"切换页面后专注还在计时吗？自动休息还会触发吗？",a:"是的。计时器和所有自动逻辑（自动开始休息、自动开始下个番茄、专注完成通知）都在全局状态中，切到任务清单/统计/配置等页面不影响。专注到点会正常通知和衔接。"},{q:"主题背景上传的图片太大怎么办？",a:"上传图片会自动压缩（缩放到 1920px 宽、JPEG 0.8 质量），不会撑爆存储。如果图片仍然过大导致无法持久保存，会弹出提示告知你刷新后需重新设置。"},{q:"通知文案可以自定义吗？",a:"可以。进入「配置」→「通知文案」，选择风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），文案会自动填入。你可以手动修改每个场景的标题和正文。任务提醒正文支持用 {task_title} 作为任务名占位符，触发时自动替换。"},{q:"删除清单（项目）会删除里面的任务吗？",a:"删除清单后，归属该清单的任务会自动变为「无项目」状态，任务本身不会被删除。删除子清单同理，任务会上升到父清单。"},{q:"切换主题或上传背景图后，按钮和图表颜色会跟着变吗？",a:"会。8 种预设主题各自配有一套主色（accent），切换后按钮、导航指示条、计时器圆环、统计图表、输入框焦点光晕等全部跟随变化。上传自定义背景图时，主色自动回退为默认的柔雾番茄红。"},{q:"上传的背景图太鲜艳影响阅读怎么办？",a:"所有页面都有一层统一的半透明蒙层覆盖在背景图上，会自动淡化背景，保证文字与卡片清晰可读。如果仍觉得偏亮，可在「配置 → 主题背景」中换用更柔和的预设主题。"}]},contact:{intro:"如有商务合作或其他事项，可通过以下方式联系我们：",emailLabel:"邮箱：",phoneLabel:"电话：",workHoursLabel:"工作时间：",workHours:"周一至周五 7:00 - 08:50 | 18：30 - 22：00 ; 周末 07：00 - 22：00",feedbackTitle:"问题反馈 / 功能建议",feedbackDesc:"如果您在使用过程中遇到 Bug 或有功能建议，请发送邮件到以上邮箱，我们会及时跟进处理。",subjectLabel:"邮件主题格式：",subjectFormat:"PomoFlow-功能建议",subjectHint:"（可选：功能建议 / Bug 反馈 / 使用疑问）",bodyLabel:"邮件正文建议包含：",bodyItems:["问题或建议的详细描述","您的联系方式（邮箱 / QQ / 手机号），方便我们回复","遇到 Bug 时的操作步骤（便于我们复现）"],exampleLabel:"示例：",exampleText:`主题：PomoFlow-Bug 反馈

您好，我在创建任务时点击「重复」
选择「自定义」后弹窗没有出现。

联系方式：user@example.com`}}},mv={page:{timer:"Timer - PomoFlow",tasks:"Tasks - PomoFlow",stats:"Stats - PomoFlow",settings:"Settings - PomoFlow"},nav:{timer:"Pomodoro",tasks:"Tasks",stats:"Stats",settings:"Settings",help:"Help & Feedback",mainNav:"Main navigation"},mode:{focus:"Focus",shortBreak:"Short Break",longBreak:"Long Break",focusing:"Focusing"},priority:{high:"High",medium:"Medium",low:"Low",none:"None"},common:{confirm:"OK",noData:"No tasks yet",reviewPlaceholder:"Write a review…",ariaCompleted:"Completed",ariaMarkDone:"Mark complete",ariaMarkUndone:"Mark as not done",loading:"Loading...",close:"Close",clear:"Clear",add:"Add",expand:"Expand",collapse:"Collapse"},timer:{start:"Start Focus",startBreak:"Start Break",pause:"Pause",resume:"Resume",stop:"Stop",abandon:"Abandon",skip:"Skip",starting:"Starting…",todayDone:"Today completed",pomodoroUnit:"pomodoros",pomodoros:"pomodoros",taskList:"Tasks",todayFocus:"Today's focus",minute:"min",selectTask:"Select a task",selectTaskPlaceholder:"-- Select a task --",modeTabsAria:"Timer mode",noSpecificTask:"No specific task",noTodoTask:"No active tasks",reviewTitle:"📝 Daily Review",reviewPlaceholder:"Write today’s review…",clearFilter:"Clear filters",startTooltip:"Start focus",mottoRefresh:"Next",modalTitle:"Notice",focusCompleteTitle:"Focus complete",noTask:"No tasks",expandSubtasks:"Expand subtasks",collapseSubtasks:"Collapse subtasks"},filter:{project:"Project",tag:"Tag",priority:"Priority",date:"Date",all:"All",allProject:"All projects",allTag:"All tags",allPriority:"All priorities",today:"Today",tomorrow:"Tomorrow",thisWeek:"This week",week:"This week",month:"This month",startDate:"Start date",endDate:"End date",dueDate:"Due date",start:"Start",end:"End",to:"to",export:"Export",projectAria:"Filter by project",tagAria:"Filter by tag",priorityAria:"Filter by priority"},export:{index:"No.",title:"Task",project:"Project",priority:"Priority",dueDate:"Due date",estimated:"Est. Pomodoros",tags:"Tags",subtasks:"Subtasks",status:"Status",statusActive:"Active",statusCompleted:"Completed",fileName:"Tasks"},task:{statEstimated:"Estimated time",statActive:"Active tasks",statFocused:"Time focused",statCompleted:"Tasks done",statCompletedPomo:"Pomodoros done",searchResult:"Search results",list:"List",task:"Tasks",noTask:"No tasks yet",noDate:"No date",unscheduled:"Unscheduled",minute:"min",startTooltip:"Start focus",detailPriority:"Priority",detailPomodoro:"Pomodoro",detailDueDate:"Due date",detailProject:"List",detailReminder:"Reminder",detailRepeat:"Repeat",detailNoTags:"No tags",detailEditTags:"Edit tags",detailCollapse:"Collapse",detailAddSubtask:"Add subtask...",subtaskEditPlaceholder:"Edit subtask...",editSubtask:"Edit subtask",deleteSubtask:"Delete subtask",detailAddNote:"Add note...",detailDelete:"Delete task",detailNoProject:"None",detailNoTagsAvailable:"No tags available",detailEmpty:"Click a task to view details",detailTimeFilled:"Filled the due time with the current time. Adjust in “Due date” if needed.",deleteConfirm:'Delete task "{title}"?',emptyAll:"No tasks yet — add one to get started",emptyFiltered:"No tasks match these filters",groupHeader:"{date} ({weekday}) | {n} min",detailPanelAria:"Task details",titleAria:"Title",detailDescription:"Description",detailDescPlaceholder:"Add details...",detailSubtasks:"Subtasks",newSubtaskAria:"New subtask",unknownProject:"Unknown",toggleSubtaskAria:"Toggle subtask completion",dblclickToEdit:"Double-click to edit",noTagsHint:"No tags yet — create them in Settings → Tags",tagPickerAria:"Tag multi-select",saveFailed:"Save failed: {err}",setTagsFailed:"Failed to set tags: {err}",addSubtaskFailed:"Failed to add subtask: {err}",updateSubtaskFailed:"Failed to update subtask: {err}",deleteSubtaskFailed:"Failed to delete subtask: {err}"},stats:{dimToday:"Today",dimWeek:"This week",dimMonth:"This month",dimQuarter:"Quarter",dimHalf:"Half-year",dimYear:"Year",focusDuration:"Focus time",sessions:"Pomodoros",completed:"Tasks done",avg:"Daily avg",activeDays:"Active days",longestStreak:"Longest streak",avgWeek:"Weekly avg",avgMonth:"Monthly avg",peakMonth:"Peak month",peakPeriod:"Peak period",bestProject:"Top project",momRatio:"vs last period",trendTitle:"Focus trend",projectDist:"Project distribution",noData:"No focus data for this range",noProject:"No project data",unitMin:"min",unitCount:"",unitDay:"d",byDay:"day",byWeek:"week",byMonth:"month",weeklyFocusTitle:"This week’s focus (min)",loading:"Loading stats...",loadError:"Failed to load stats: {err}",trendChartAria:"Focus trend bar chart",donutChartAria:"Project distribution donut chart"},enum:{reminder:{"":"No reminder",on_time:"On time","5m":"5 min before","30m":"30 min before","1h":"1 hour before","1d":"1 day before","2d":"2 days before"},repeat:{"":"No repeat",daily:"Daily",weekday:"Weekdays",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",custom:"Custom"},weekday:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},settings:{tab:{account:"Account",timer:"Pomodoro",lists:"Lists",tags:"Tags",theme:"Theme",motto:"Mottos",notification:"Notifications",language:"Language"},language:{title:"Interface Language",desc:"Choose the display language. All pages update instantly.",zh:"Chinese",en:"English"},timerTitle:"Pomodoro",timerParams:"Timer parameters",durationSetting:"Durations",behaviorSetting:"Behavior",focusDuration:"Focus duration",shortBreakDuration:"Short break",longBreakDuration:"Long break",longBreakInterval:"Long-break interval",longBreakIntervalEvery:"Long-break interval (every N focus sessions)",minute:"min",pomodoroUnit:"pomodoros",autoStartNext:"Auto-start next pomodoro",autoStartNextDesc:"Start the next pomodoro immediately after one ends",autoStartBreak:"Auto-start break",autoStartBreakDesc:"Enter break automatically after a pomodoro",autoEnterBreak:"Enter break automatically after focus ends",disableBreak:"Disable breaks",disableBreakDesc:"Skip all break periods when enabled",soundEnabled:"Completion sound",systemNotification:"System notifications",reset:"Reset to default",accountNotOpen:"This feature is not available yet",systemSection:"System",autostart:"Launch at startup",autostartHint:"Run PomoFlow automatically at OS startup (silent start, stays in tray)",on:"On",off:"Off",notifTest:"Notification test",notifTestHint:"Send a test notification to verify the system notification pipeline",sendTest:"Send test",trayHint:"💡 When you close the main window, PomoFlow stays in the system tray. Right-click the tray icon to show the window or quit.",autostartFail:"Failed to toggle autostart: {err}",notifPermDenied:"Notification permission not granted",notifSendFail:"Notification failed: {err}",testNotifTitle:"PomoFlow test notification",testNotifBody:"Active tasks: {n}",theme:{title:"Theme",desc:"Pick a preset above to set the accent color (buttons, progress ring, nav indicator). Pick a background below to independently override the background layer. The two are independent.",preset:"Preset themes",presetBg:"Preset backgrounds",presetBgHint:"Click any of the 8 boxes to switch the background. The accent color still comes from the chosen theme above.",presetBgName:{"preset-bg-1":"Preset 1","preset-bg-2":"Preset 2","preset-bg-3":"Preset 3","preset-bg-4":"Preset 4","preset-bg-5":"Preset 5","preset-bg-6":"Preset 6","preset-bg-7":"Preset 7","preset-bg-8":"Preset 8"},custom:"Custom background",upload:"Upload image",customUsed:"Using custom background",bgUsed:"Custom background active",presetBgUsed:"Preset background active",clearBg:"Remove background",customHint:"JPG/PNG supported; large images are auto-compressed. The uploaded image replaces the preset background; the accent color still comes from the chosen theme.",reset:"Reset to default",compressFail:"Image processing failed, please try another.",bgTooLarge:"The background image is too large to persist. It works this session, but you’ll need to reset it after refresh.",presetName:{default:"Default",sunny:"Sunny",ocean:"Ocean",forest:"Forest",dusk:"Dusk",lavender:"Lavender",evening:"Evening",teal:"Teal"}},motto:{title:"Mottos",addPlaceholder:"Enter a motto…",authorPlaceholder:"Author (optional)",addBtn:"Add",empty:"No custom mottos yet. The timer page will cycle through built-in mottos.",builtInBadge:"Built-in",defaultAuthor:"Custom",textRequired:"Please enter the motto text",textTooLong:"Motto text must be at most 500 characters",authorTooLong:"Author must be at most 64 characters"},notification:{title:"Notifications",styleLabel:"Style",styleHintCustom:"Custom style: fill in the texts below + a style description",styleHintPreset:'Preset style texts follow the interface language automatically. To customize, choose "Custom style".',styleDesc:"Style description",styleDescPlaceholder:"e.g. CEO style, artsy style…",focusEnd:"🍅 Focus ended",breakEnd:"☕ Break ended",reminder:"🔔 Task reminder",titleLabel:"Title",bodyLabel:"Body",placeholderHint:"Use {task_title} as the task name placeholder; auto-replaced on trigger",save:"Save",saved:"✓ Saved",styleName:{default:"Default",cute:"Cute",self_dep:"Self-deprecating",strive:"Strive",funny:"Funny",custom:"Custom"},fallback:{focusTitle:"Focus ended",focusBody:"A pomodoro just ended — take a short break.",breakTitle:"Break ended",breakBody:"Break over — back to focused work with fresh energy."}},repeatCustom:{title:"Custom repeat",startDate:"Start date",endDate:"End date",interval:"Interval (0–99)",type:"Repeat type",typeDay:"Day",typeWeek:"Week",typeMonth:"Month",typeYear:"Year",weekdays:"Repeat on weekdays (multi-select)",monthDays:"Repeat on days of month (multi-select)",weekShort:["M","T","W","T","F","S","S"],needPickWeek:"Please pick at least one weekday",needPickDay:"Please pick at least one date",cancel:"Cancel",confirm:"OK"},list:{title:"Lists",addRootPlaceholder:"Top-level list name",addRoot:"Add top-level list",addChild:"Add sub-list",edit:"Rename",del:"Delete",level2Placeholder:"Sub-list name",level3Placeholder:"Sub-list name",empty:"No lists yet",dragHint:"Hold and drag to reorder or change level",reorderFail:"Reorder failed, please try again",reorderFailDepth:"Target location exceeds max depth",reorderFailCycle:"Cannot move: would create a cycle"},tag:{namePlaceholder:"Enter tag name",add:"Add tag",colorLabel:"Color:",colorAria:"Color {color}",nameLabel:"Name",empty:"No tags yet, add one",dragHandle:"Drag to reorder"}},form:{placeholder:'Type a "task description" here to add a new task, press Enter to save',titlePlaceholder:"Task title...",pomodoroIcons:"Estimated pomodoros",pomodoroUnit:"pomodoros",more:"More",collapse:"Collapse",submit:"Add",estimatedPomo:"Est. pomodoros",needTitle:"Please enter a task title",needTimeForReminder:"A reminder needs a specific time (HH:MM) in the due date",addFailed:"Failed to add"},sidebar:{searchPlaceholder:"Search",searchTasksPlaceholder:"Search task titles...",planned:"Planned",completed:"Completed",journal:"Journal",emptyHint:"No lists yet, click + to add",addRootAria:"Add root list",addListTitle:"Add list",listNamePlaceholder:"List name...",moreActions:"More actions",deleteListConfirm:"Delete this list? Sub-lists will be deleted too"},journal:{monthTitle:"{month} {year}",yearOption:"{year}",monthOption:"{month}",prevMonth:"Previous month",nextMonth:"Next month",yearAria:"Year",monthAria:"Month",weekRange:"Week {n} ({ms}/{ds} – {me}/{de})",weekday:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],dailyReviewPlaceholder:"Daily review",weeklyReview:"📋 Weekly review",weeklyReviewPlaceholder:"This week's review"},monthPanel:{title:"{month}/{year} · Review",weeklyReadonly:"Weekly reviews (read-only · edited in each week block)",noWeekly:"No weekly reviews this month",weekRange:"Week {n} (from {date})",empty:"(empty)",monthlyReview:"📋 Monthly review",monthlyPlaceholder:"Monthly summary…"},help:{tab:{manual:"User Manual",faq:"FAQ",contact:"Contact Us"},manual:{timer:{title:"🍅 Pomodoro",items:[{text:"Pick a task and click “Start” to begin a focus session. When focus ends, the app switches to break mode automatically."},{text:"Three modes: “Focus” (default 25 min, customizable) / “Short break” (default 5 min) / “Long break” (default 15 min, triggered every N pomodoros)."},{text:"When focus ends, a system notification + modal appears (you can customize the wording under Settings → Notifications)."},{text:"Enable “Auto-start break” and “Auto-start next pomodoro” so focus endings need no manual action."},{text:"Even if you switch pages after the timer finishes, notifications and auto-transitions still fire."},{text:"The right panel shows the current task list, filterable by project, tag, priority, and date."},{text:"Below the timer are a “Daily review” text box and a “Motto” card (click to get another)."}]},tasks:{title:"📋 Tasks",items:[{text:"Switch views from the left sidebar: Today / Tomorrow / This week / Planned / Completed / Journal."},{text:"The “Planned” view supports filtering by project, tag, priority, this week, this month, and due-date range."},{text:"Tasks support: title, note, priority (high/medium/low/none), due date (with time), estimated pomodoros, pomodoro duration, reminder, and repeat."},{text:"Lists (projects) support nesting (up to 3 levels) and custom colors. Tags support many-to-many with 12 preset colors."},{text:"Subtasks (checklist): each task can have multiple subtasks, each toggleable independently."},{text:"Click a task to open the right detail panel and edit title, due date, priority, reminder, repeat, tags, subtasks, and notes."}]},reminder:{title:"🔔 Reminders",items:[{text:"After setting a reminder, a browser notification fires at the reminder time (due date minus the lead time)."},{text:"Reminder options: On time / 5 min / 30 min / 1 hour / 1 day / 2 days before."},{text:"No reminders fire during focus; they are shown after focus ends (to avoid breaking focus)."},{text:"Each reminder fires only once — no repeat interruptions."},{text:"A reminder requires a due date with a specific time (HH:MM); otherwise you’ll be prompted to fill it in."}]},repeat:{title:"🔁 Repeat",items:[{text:"Built-in rules: Daily / Weekdays / Weekly / Monthly / Yearly. Setting one auto-generates repeat instances (up to 50)."},{text:"“Custom”: choose an interval (0–99) and a type (day/week/month/year).",sub:"Interval 0 = repeat every cycle; interval 1 = every other cycle (skip 1); interval N = every N cycles."},{text:"Type “Week” lets you pick weekdays (Mon–Sun, multi-select); type “Month” lets you pick days of the month (multi-select)."},{text:"When you change the repeat rule, old incomplete instances are deleted and regenerated under the new rule."},{text:"Each repeat instance fully copies the original task’s tags, subtasks, notes, priority, and pomodoro count."}]},journal:{title:"📔 Journal",items:[{text:"Monthly view, grouped by natural weeks (Mon–Sun); each week is laid out in a 3+3+1 row split."},{text:"Each day cell shows that day’s tasks (a square checkbox toggles completion) plus a daily-review text box."},{text:"Each week has a weekly-review box at the bottom. The right panel shows the month’s weekly reviews (read-only) + a monthly review (editable)."},{text:"Supports previous/next month and year/month dropdowns."},{text:"The “daily review” on the timer page syncs with the same day’s daily review in Journal mode."}]},stats:{title:"📊 Stats",items:[{text:"Six range filters: Today / This week / This month / Quarter / Half-year / Year."},{text:"Four common cards: focus time, pomodoros, tasks done, daily average."},{text:"Longer ranges unlock more highlights: active days, longest streak, weekly/monthly averages, peak period, top project, and period-over-period."},{text:"Trend bar chart (auto day/week/month granularity) + donut chart (project time distribution), all colored by the current theme accent — no more rainbow."}]},settings:{title:"⚙️ Settings",items:[{text:"“Pomodoro”: focus/break durations, long-break interval (2–6 pomodoros), and auto-start options."},{text:"“Lists”: add/rename/delete projects (3-level nesting), custom colors."},{text:"“Tags”: add/rename/delete tags, 12 preset colors."},{text:"“Theme”: 8 preset themes (Default/Sunny/Ocean/Forest/Dusk/Lavender/Evening/Teal), each with its own background gradient and matching accent; you can also upload a custom image (auto-compressed). All pages use a unified translucent veil to soften the background."},{text:"“Mottos”: manage custom mottos (stored in the database, cycled on the timer page)."},{text:"“Notifications”: 6 styles (Default/Cute/Self-deprecating/Strive/Funny/Custom), each configurable for focus-end/break-end/reminder title and body."}]}},faq:{items:[{q:"Where is my data stored? Can it be lost?",a:"All data (tasks, pomodoro records, reviews, mottos, notification wording, theme settings) is stored in a local SQLite database (pomoflow.db) and browser localStorage — no internet needed. When you upgrade, the database auto-migrates and old data is fully preserved. Back up pomoflow.db regularly."},{q:"How do I change the pomodoro duration and long-break interval?",a:"Go to Settings → Pomodoro and pick minutes from the Focus / Short break / Long break dropdowns (1–90 min). The long-break interval can be 2–6 pomodoros (i.e. a long break every N pomodoros)."},{q:"Why do task reminders not fire during focus?",a:"By design. During focus, all task reminders are suppressed so your focus isn’t interrupted. Skipped reminders are shown after focus ends."},{q:"What if task reminders don’t show a notification?",a:"On first use the browser asks for notification permission — click “Allow”. If you denied it, re-enable notifications via the settings icon on the left of the address bar. Also, a reminder only fires when the task has a due date with a specific time (HH:MM) and a reminder option set."},{q:"In custom repeat, what’s the difference between interval 0 and interval 1?",a:"Interval 0 = repeat every cycle (e.g. appears every day). Interval 1 = every other cycle (e.g. weeks 1, 3, 5, skipping 2 and 4). Interval N = skip N cycles, then repeat."},{q:"Where do I edit weekly and monthly reviews in Journal mode?",a:"Weekly reviews are edited in the text box at the bottom of each week block (auto-saved on blur). Monthly reviews are edited in the “📋 Monthly review” box on the right panel. Edits on the left refresh the right panel automatically."},{q:"Where are custom mottos stored? Lost on refresh?",a:"Custom mottos are stored in the database (pomoflow.db) and survive refreshes. The 50 built-in mottos ship with the app. The motto card on the timer page prefers custom mottos (cycling without repeats) and restarts after one full loop."},{q:"Does focus keep timing after I switch pages? Do auto-breaks still fire?",a:"Yes. The timer and all auto logic (auto-start break, auto-start next pomodoro, focus-end notification) live in global state, so switching to Tasks/Stats/Settings doesn’t affect them. Focus completions still notify and transition."},{q:"What if an uploaded background image is too large?",a:"Uploads are auto-compressed (scaled to 1920px wide, JPEG quality 0.8), so storage isn’t blown up. If an image is still too large to persist, a prompt tells you to reset after refresh."},{q:"Can notification wording be customized?",a:"Yes. Go to Settings → Notifications and pick a style (Default/Cute/Self-deprecating/Strive/Funny/Custom); the wording auto-fills. You can edit each scene’s title and body. The reminder body supports {task_title} as the task name placeholder, auto-replaced on trigger."},{q:"Does deleting a list (project) delete its tasks?",a:"No. Deleting a list sets its tasks to “no project”; the tasks themselves aren’t deleted. Deleting a sub-list works the same way — tasks move up to the parent list."},{q:"Do buttons and charts change color when I switch themes or upload a background?",a:"Yes. Each of the 8 preset themes has its own accent color; switching it updates buttons, the nav indicator, the timer ring, charts, and input focus glow. When you upload a custom background, the accent falls back to the default soft tomato."},{q:"What if an uploaded background is too vivid to read?",a:"Every page has a unified translucent veil over the background that softens it, keeping text and cards readable. If it still feels bright, switch to a softer preset theme under Settings → Theme."}]},contact:{intro:"For business cooperation or other matters, reach us via:",emailLabel:"Email: ",phoneLabel:"Phone: ",workHoursLabel:"Working hours: ",workHours:"Mon–Fri 7:00 - 08:50 | 18：30 - 22：00 ;  Weekend: 07:00 - 22:00",feedbackTitle:"Bug Reports / Feature Requests",feedbackDesc:"If you hit a bug or have a feature idea, email the address above and we’ll follow up.",subjectLabel:"Email subject format:",subjectFormat:"PomoFlow-Feature Request",subjectHint:"(Optional: Feature Request / Bug Report / Question)",bodyLabel:"Email body should include:",bodyItems:["Detailed description of the issue or suggestion","Your contact (email / QQ / phone) so we can reply","Steps to reproduce if it’s a bug"],exampleLabel:"Example:",exampleText:`Subject: PomoFlow-Bug Report

Hi, when creating a task I clicked “Repeat”
and chose “Custom” but the dialog didn’t appear.

Contact: user@example.com`}}},bv={zh:gv,en:mv},mi="zh",nc="pomoflow-lang";function yv(){if(typeof localStorage>"u")return mi;try{const a=localStorage.getItem(nc);if(a==="en"||a==="zh")return a}catch{}return mi}let bo=W(Be(yv()));function yo(){return e(bo)}function kv(a){if(v(bo,a,!0),typeof localStorage<"u")try{localStorage.setItem(nc,a)}catch{}typeof document<"u"&&(document.documentElement.lang=a)}function mt(){return bv[e(bo)]}function Nt(a,t){return Object.entries(t).reduce((n,[r,o])=>n.split(`{${r}}`).join(String(o)),a)}typeof document<"u"&&(document.documentElement.lang=e(bo));const rc="pomoflow:settings:v2",wv="pomoflow:settings:v1",rr={focusDuration:25,shortBreakDuration:5,longBreakDuration:15,longBreakInterval:4,autoStartNextPomodoro:!1,autoStartBreak:!1,disableBreak:!1,soundEnabled:!0,desktopNotificationEnabled:!0};function xv(a){try{const t=JSON.parse(a),n={};return typeof t.focusMinutes=="number"&&(n.focusDuration=t.focusMinutes),typeof t.shortBreakMinutes=="number"&&(n.shortBreakDuration=t.shortBreakMinutes),typeof t.longBreakMinutes=="number"&&(n.longBreakDuration=t.longBreakMinutes),typeof t.longBreakInterval=="number"&&(n.longBreakInterval=t.longBreakInterval),typeof t.autoChain=="boolean"&&(n.autoStartBreak=t.autoChain),typeof t.soundEnabled=="boolean"&&(n.soundEnabled=t.soundEnabled),typeof t.desktopNotificationEnabled=="boolean"&&(n.desktopNotificationEnabled=t.desktopNotificationEnabled),Object.keys(n).length>0?n:null}catch{return null}}function oc(a){typeof localStorage>"u"||localStorage.setItem(rc,JSON.stringify(a))}function Sv(){if(typeof localStorage>"u")return{...rr};const a=localStorage.getItem(rc);if(a)try{const n=JSON.parse(a);return{...rr,...n}}catch{return{...rr}}const t=localStorage.getItem(wv);if(t){const n=xv(t);if(n){const r={...rr,...n};return oc(r),r}}return{...rr}}let Yr=W(Be(Sv()));function Va(){return e(Yr)}function bi(a){v(Yr,{...e(Yr),...a},!0),oc(e(Yr))}const Tv=[{key:"default",label:"默认"},{key:"cute",label:"卡哇伊"},{key:"self_dep",label:"自嘲"},{key:"strive",label:"奋斗"},{key:"funny",label:"搞笑"},{key:"custom",label:"自定义风格"}],sc={default:{style:"default",focus_end_title:"专注结束",focus_end_body:"番茄钟结束了，休息一下吧",break_end_title:"休息结束",break_end_body:"休息结束，满满的能量开启新的任务专注。",reminder_title:"PomoFlow 任务提醒",reminder_body:"任务「{task_title}」提醒时间已到"},cute:{style:"cute",focus_end_title:"专注完成啦~",focus_end_body:"你好棒呀！休息一下吧~ ✨",break_end_title:"休息结束啦~",break_end_body:"元气满满，继续加油鸭！✧",reminder_title:"该做任务啦~",reminder_body:"「{task_title}」的时间到啦，快去看看吧~ ♪"},self_dep:{style:"self_dep",focus_end_title:"又混过去一个",focus_end_body:"居然坚持下来了，不太像你啊…",break_end_title:"该干活了",break_end_body:"虽然我知道你不想，但还是开始吧…",reminder_title:"别装了",reminder_body:"「{task_title}」该做了，别再拖了"},strive:{style:"strive",focus_end_title:"专注完成！",focus_end_body:"又一个番茄被你征服！继续！",break_end_title:"休息结束！",break_end_body:"调整完毕，向下一个目标冲刺！",reminder_title:"时间到了！",reminder_body:"「{task_title}」——现在就是行动的时刻！"},funny:{style:"funny",focus_end_title:"终于停了！",focus_end_body:"番茄钟说：你该歇了，我也该歇了 😂",break_end_title:"歇够了？",break_end_body:"再不开始老板要扣工资了…你是自己的老板？那更得自律！🤣",reminder_title:"起来搬砖！",reminder_body:"「{task_title}」叫你回来干活了 🧱"},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}},ic={default:{style:"default",focus_end_title:"Focus Complete",focus_end_body:"Pomodoro finished. Take a break.",break_end_title:"Break Over",break_end_body:"Break ended — recharge and start your next focus.",reminder_title:"PomoFlow Task Reminder",reminder_body:'Task "{task_title}" reminder time has arrived'},cute:{style:"cute",focus_end_title:"Focus done~",focus_end_body:"Great job! Take a little break~ ✨",break_end_title:"Break over~",break_end_body:"Full of energy, keep it up!",reminder_title:"Time for a task~",reminder_body:'It’s time for "{task_title}", go check it~ ♪'},self_dep:{style:"self_dep",focus_end_title:"Another one down",focus_end_body:"You actually stuck with it — not very you…",break_end_title:"Back to work",break_end_body:"I know you don’t want to, but let’s begin…",reminder_title:"Stop pretending",reminder_body:'"{task_title}" is due — no more procrastinating'},strive:{style:"strive",focus_end_title:"Focus complete!",focus_end_body:"Another pomodoro conquered! Keep going!",break_end_title:"Break over!",break_end_body:"Recharged — sprint toward the next goal!",reminder_title:"Time’s up!",reminder_body:'"{task_title}" — act now!'},funny:{style:"funny",focus_end_title:"Finally stopped!",focus_end_body:"The pomodoro says: you should rest, so should I 😂",break_end_title:"Rested enough?",break_end_body:"If you don’t start now the boss will dock your pay… wait, you ARE the boss? Even more reason to be disciplined! 🤣",reminder_title:"Get back to work!",reminder_body:'"{task_title}" is calling you back to grind 🧱'},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}};function lc(a,t,n){const r=t==="en"?ic:sc;if(a==="custom"){const l=r.default;return{focus_end_title:(n==null?void 0:n.focus_end_title)||l.focus_end_title,focus_end_body:(n==null?void 0:n.focus_end_body)||l.focus_end_body,break_end_title:(n==null?void 0:n.break_end_title)||l.break_end_title,break_end_body:(n==null?void 0:n.break_end_body)||l.break_end_body,reminder_title:(n==null?void 0:n.reminder_title)||l.reminder_title,reminder_body:(n==null?void 0:n.reminder_body)||l.reminder_body}}const c=r[a||"default"]??r.default;return{focus_end_title:c.focus_end_title,focus_end_body:c.focus_end_body,break_end_title:c.break_end_title,break_end_body:c.break_end_body,reminder_title:c.reminder_title,reminder_body:c.reminder_body}}function $t(a,t,n,r){if(typeof t=="function"?a!==t||!r:!t.has(a))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(a):r?r.value:t.get(a)}function or(a,t,n,r,o){if(typeof t=="function"?a!==t||!0:!t.has(a))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(a,n),n}var on,da,Pn,Rr;const yi="__TAURI_TO_IPC_KEY__";function Dv(a,t=!1){return window.__TAURI_INTERNALS__.transformCallback(a,t)}class Pv{constructor(t){on.set(this,void 0),da.set(this,0),Pn.set(this,[]),Rr.set(this,void 0),or(this,on,t||(()=>{})),this.id=Dv(n=>{const r=n.index;if("end"in n){r==$t(this,da,"f")?this.cleanupCallback():or(this,Rr,r);return}const o=n.message;if(r==$t(this,da,"f")){for($t(this,on,"f").call(this,o),or(this,da,$t(this,da,"f")+1);$t(this,da,"f")in $t(this,Pn,"f");){const c=$t(this,Pn,"f")[$t(this,da,"f")];$t(this,on,"f").call(this,c),delete $t(this,Pn,"f")[$t(this,da,"f")],or(this,da,$t(this,da,"f")+1)}$t(this,da,"f")===$t(this,Rr,"f")&&this.cleanupCallback()}else $t(this,Pn,"f")[r]=o})}cleanupCallback(){window.__TAURI_INTERNALS__.unregisterCallback(this.id)}set onmessage(t){or(this,on,t)}get onmessage(){return $t(this,on,"f")}[(on=new WeakMap,da=new WeakMap,Pn=new WeakMap,Rr=new WeakMap,yi)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[yi]()}}class ki{constructor(t,n,r){this.plugin=t,this.event=n,this.channelId=r}async unregister(){return Ie(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}}async function cc(a,t,n){const r=new Pv(n);try{return await Ie(`plugin:${a}|register_listener`,{event:t,handler:r}),new ki(a,t,r.id)}catch{return await Ie(`plugin:${a}|registerListener`,{event:t,handler:r}),new ki(a,t,r.id)}}async function Ie(a,t={},n){return window.__TAURI_INTERNALS__.invoke(a,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const Sn=a=>Ie("list_tasks",{query:a}),fs=(a,t)=>Ie("upsert_task",{task:a,tagIds:t}),Mv=a=>Ie("delete_task",{id:a}),dc=a=>Ie("complete_task",{id:a}),uc=a=>Ie("reopen_task",{id:a}),Os=()=>Ie("list_projects"),no=a=>Ie("upsert_project",{project:a}),vc=a=>Ie("delete_project",{id:a}),Ev=a=>Ie("reorder_projects",{items:a}),Bs=()=>Ie("list_tags"),wi=a=>Ie("upsert_tag",{tag:a}),Cv=a=>Ie("delete_tag",{id:a}),Nv=a=>Ie("reorder_tags",{items:a}),jv=a=>Ie("list_tags_for_task",{taskId:a}),Fv=(a,t)=>Ie("set_tags_for_task",{taskId:a,tagIds:t}),Av=(a,t,n)=>Ie("start_pomodoro",{taskId:a,projectId:t,duration:n}),fc=(a,t)=>Ie("stop_pomodoro",{sessionId:a,isCompleted:t}),xi=a=>Ie("get_daily_review",{date:a}),hc=a=>Ie("upsert_daily_review",{review:a}),Iv=(a,t)=>Ie("list_daily_reviews",{startDate:a,endDate:t}),_c=a=>Ie("delete_daily_review",{date:a}),qv=a=>Ie("upsert_weekly_review",{review:a}),pc=(a,t)=>Ie("list_weekly_reviews",{year:a,month:t}),Rv=a=>Ie("delete_weekly_review",{weekStart:a}),Lv=a=>Ie("get_monthly_review",{yearMonth:a}),Ov=a=>Ie("upsert_monthly_review",{review:a}),Bv=a=>Ie("delete_monthly_review",{yearMonth:a}),gc=a=>Ie("list_subtasks_for_task",{taskId:a}),hs=a=>Ie("upsert_subtask",{subtask:a}),zv=a=>Ie("delete_subtask",{id:a}),mc=()=>Ie("list_mottos"),Hv=a=>Ie("upsert_motto",{motto:a}),Uv=a=>Ie("delete_motto",{id:a}),bc=()=>Ie("get_notification_template"),Wv=a=>Ie("upsert_notification_template",{template:a}),Yv=(a,t)=>Ie("today_completed_minutes",{startMs:a,endMs:t}),Si=(a,t,n,r)=>Ie("stats_range",{startDate:a,endDate:t,group:n,tzOffsetMin:r}),Gv=(a,t,n,r)=>Ie("stats_overview",{today:a,weekStart:t,monthStart:n,tzOffsetMin:r}),Vv=(a,t,n,r)=>Ie("export_tasks_xlsx",{path:a,sheetName:t,headers:n,rows:r});var _s;(function(a){a.Year="year",a.Month="month",a.TwoWeeks="twoWeeks",a.Week="week",a.Day="day",a.Hour="hour",a.Minute="minute",a.Second="second"})(_s||(_s={}));class Kv{static at(t,n=!1,r=!1){return{at:{date:t,repeating:n,allowWhileIdle:r},interval:void 0,every:void 0}}static interval(t,n=!1){return{at:void 0,interval:{interval:t,allowWhileIdle:n},every:void 0}}static every(t,n,r=!1){return{at:void 0,interval:void 0,every:{interval:t,count:n,allowWhileIdle:r}}}}var ps;(function(a){a[a.None=0]="None",a[a.Min=1]="Min",a[a.Low=2]="Low",a[a.Default=3]="Default",a[a.High=4]="High"})(ps||(ps={}));var gs;(function(a){a[a.Secret=-1]="Secret",a[a.Private=0]="Private",a[a.Public=1]="Public"})(gs||(gs={}));async function ko(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await Ie("plugin:notification|is_permission_granted")}async function wo(){return await window.Notification.requestPermission()}function xo(a){typeof a=="string"?new window.Notification(a):new window.Notification(a.title,a)}async function $v(a){await Ie("plugin:notification|register_action_types",{types:a})}async function Jv(){return await Ie("plugin:notification|get_pending")}async function Qv(a){await Ie("plugin:notification|cancel",{notifications:a})}async function Xv(){await Ie("plugin:notification|cancel")}async function Zv(){return await Ie("plugin:notification|get_active")}async function ef(a){await Ie("plugin:notification|remove_active",{notifications:a})}async function tf(){await Ie("plugin:notification|remove_active")}async function af(a){await Ie("plugin:notification|create_channel",{...a})}async function nf(a){await Ie("plugin:notification|delete_channel",{id:a})}async function rf(){return await Ie("plugin:notification|listChannels")}async function of(a){return await cc("notification","notification",a)}async function sf(a){return await cc("notification","actionPerformed",a)}const lf=Object.freeze(Object.defineProperty({__proto__:null,get Importance(){return ps},Schedule:Kv,get ScheduleEvery(){return _s},get Visibility(){return gs},active:Zv,cancel:Qv,cancelAll:Xv,channels:rf,createChannel:af,isPermissionGranted:ko,onAction:sf,onNotificationReceived:of,pending:Jv,registerActionTypes:$v,removeActive:ef,removeAllActive:tf,removeChannel:nf,requestPermission:wo,sendNotification:xo},Symbol.toStringTag,{value:"Module"})),yc="pomoflow-focus-count";let Ee=Be({mode:"focus",secondsLeft:Va().focusDuration*60,running:!1,sessionId:null,activeTask:null,focusCompletedCount:cf(),pendingCompletionMessage:null,todayCount:0,todayMinutes:0}),So=0,To=0,ms=new Date().toDateString(),mr=!1,ua=null;function cf(){try{return parseInt(localStorage.getItem(yc)||"0",10)||0}catch{return 0}}function zs(){return Ee}function df(){return ua}async function kc(){try{ua=await bc()}catch{}}function uf(){var a;return((a=Ee.activeTask)==null?void 0:a.pomodoro_duration)??Va().focusDuration}function jr(a){const t=Va();return a==="focus"?uf()*60:a==="short_break"?t.shortBreakDuration*60:t.longBreakDuration*60}function Do(){!Ee.running&&Ee.sessionId===null&&(Ee.secondsLeft=jr(Ee.mode))}async function Yn(a,t,n){const r=n??Math.floor(jr(Ee.mode)/60),o=await Av(a,t,r);Ee.sessionId=o.id,n!==void 0&&(Ee.secondsLeft=n*60),So=Date.now(),To=Ee.secondsLeft,Ee.running=!0,mr=!1}async function vf(a){Ee.sessionId!==null&&await Hs(!1),Ee.activeTask=a,Ee.mode="focus",Do(),await Yn(a.id,a.project_id??null,a.pomodoro_duration??void 0)}async function ff(a){Ee.activeTask=a,!Ee.running&&(Ee.sessionId!==null&&await Hs(!1),Ee.mode="focus",Do(),await Yn(a.id,a.project_id??null,a.pomodoro_duration??void 0))}function Ro(){Ee.running&&(Ee.running=!1)}function Lo(){Ee.running||Ee.sessionId===null||(So=Date.now(),To=Ee.secondsLeft,Ee.running=!0)}async function Hs(a){const t=Ee.sessionId;if(Ee.running=!1,Ee.sessionId=null,t!==null)try{await fc(t,a)}catch(n){console.warn("stop pomodoro failed",n)}Ee.secondsLeft=jr(Ee.mode)}function ro(a){Ee.mode=a,Ee.running=!1,Ee.sessionId=null,Ee.secondsLeft=jr(a)}function hf(){if(!Ee.running)return;const a=Math.floor((Date.now()-So)/1e3),t=Math.max(0,To-a);if(t<=0){Ee.secondsLeft=0,Ee.running=!1,Ee.sessionId!==null&&!mr&&(mr=!0,wc());return}Ee.secondsLeft=t}function _f(){if(!Ee.running)return;const a=Math.floor((Date.now()-So)/1e3),t=Math.max(0,To-a);t<=0?(Ee.secondsLeft=0,Ee.running=!1,Ee.sessionId!==null&&!mr&&(mr=!0,wc())):Ee.secondsLeft=t}function pf(){Ee.pendingCompletionMessage=null}function Ti(a){Ee.activeTask=a,Do()}function gf(){Do()}function mf(a){const t=new Date().toDateString();t!==ms?(ms=t,Ee.todayCount=1,Ee.todayMinutes=a):(Ee.todayCount+=1,Ee.todayMinutes+=a)}function bf(a,t){Ee.todayCount=a,Ee.todayMinutes=t,ms=new Date().toDateString()}async function Oo(){try{const a=new Date,t=a.getDay(),n=new Date(a);n.setDate(a.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0);const r=new Date(a.getFullYear(),a.getMonth(),1),o=l=>`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,c=await Gv(o(a),o(n),o(r),-a.getTimezoneOffset());bf(c.today_sessions,c.today_minutes)}catch(a){console.warn("sync today stats",a)}}let Di=!1;function yf(){if(Di||typeof window>"u")return;Di=!0,Oo(),document.addEventListener("visibilitychange",()=>{document.hidden||Oo()});let a=new Date().toDateString();window.setInterval(()=>{const t=new Date().toDateString();t!==a&&(a=t,Oo())},6e4)}function kf(a){const t=new Date;t.setHours(0,0,0,0);const n=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0,23,59,59,999),o={high:0,medium:1,low:2,none:3},c=a.filter(l=>{if(l.status!=="active"||!l.due_date)return!1;const i=new Date(l.due_date);if(isNaN(i.getTime())||i<n||i>r)return!1;const u=new Date(i);return u.setHours(0,0,0,0),u.getTime()<=t.getTime()});return c.sort((l,i)=>{const u=o[l.priority??"none"]??3,f=o[i.priority??"none"]??3;return u!==f?u-f:new Date(l.created_at??0).getTime()-new Date(i.created_at??0).getTime()}),c[0]??null}async function wf(a,t){if(Va().desktopNotificationEnabled)try{let n=await ko();if(n||(n=await wo()==="granted"),!n)return;xo({title:a,body:t})}catch(n){console.warn("notification failed",n)}}async function wc(){const a=Ee.mode,t=Math.floor(jr(a)/60),n=Ee.activeTask,r=yo(),o=ua?{focus_end_title:ua.focus_end_title??void 0,focus_end_body:ua.focus_end_body??void 0,break_end_title:ua.break_end_title??void 0,break_end_body:ua.break_end_body??void 0,reminder_title:ua.reminder_title??void 0,reminder_body:ua.reminder_body??void 0}:null,c=lc(ua==null?void 0:ua.style,r,o),l=a==="focus"?c.focus_end_title:c.break_end_title,i=a==="focus"?c.focus_end_body:c.break_end_body;await wf(l,i),Ee.pendingCompletionMessage=i;const u=Ee.sessionId;if(Ee.running=!1,Ee.sessionId=null,u!==null)try{await fc(u,!0)}catch(_){console.warn("stop pomodoro failed",_)}const f=Va();if(a==="focus"){Ee.focusCompletedCount+=1;try{localStorage.setItem(yc,String(Ee.focusCompletedCount))}catch{}mf(t);let _=[];try{_=await Sn({status:null,limit:null})}catch(w){console.warn("refresh tasks failed",w)}const b=n?_.find(w=>w.id===n.id)??null:null;if(!f.disableBreak&&f.autoStartBreak){const x=Ee.focusCompletedCount%f.longBreakInterval===0,S=x?"long_break":"short_break",C=x?f.longBreakDuration:f.shortBreakDuration;ro(S),await Yn(null,(b==null?void 0:b.project_id)??(n==null?void 0:n.project_id)??null,C);return}await Pi(_,b,f.autoStartNextPomodoro);return}let h=[];try{h=await Sn({status:null,limit:null})}catch(_){console.warn("refresh tasks failed",_)}const g=n?h.find(_=>_.id===n.id)??null:null;await Pi(h,g,f.autoStartNextPomodoro)}async function Pi(a,t,n){if(t!==null&&t.status==="active"&&(t.completed_pomodoros??0)<(t.estimated_pomodoros??0)&&t){ro("focus"),Ee.activeTask=t,n&&await Yn(t.id,t.project_id??null,t.pomodoro_duration??void 0);return}t&&t.status==="completed"&&(Ee.activeTask=null);const o=kf(a);Ee.activeTask=o,ro("focus"),o&&n&&await Yn(o.id,o.project_id??null,o.pomodoro_duration??void 0)}const xc="pomoflow-fired-reminders",xf=3e4,Sf=10080*60*1e3,Tf={on_time:0,minutes5:5*6e4,minutes30:30*6e4,hour1:60*6e4,day1:1440*6e4,days2:2880*6e4};function Df(){try{const a=localStorage.getItem(xc);return a?JSON.parse(a):{}}catch{return{}}}function Pf(a){try{localStorage.setItem(xc,JSON.stringify(a))}catch{}}function Sc(){const a=zs();return a.running&&a.mode==="focus"}async function Mf(a){const t=df(),n=yo(),r=t?{reminder_title:t.reminder_title??void 0,reminder_body:t.reminder_body??void 0}:null,o=lc(t==null?void 0:t.style,n,r),c=o.reminder_body.replace(/\{task_title\}/g,a.title);try{let l=await ko();if(l||(l=await wo()==="granted"),!l)return;xo({title:o.reminder_title,body:c})}catch(l){console.warn("reminder notification failed",l)}}async function Ef(){const a=Date.now(),t=Df();let n=!1,r=[];try{r=await Sn({status:"active",limit:null})}catch{return}const o=Sc();for(const l of r){if(l.status!=="active"||!l.reminder||l.reminder==="none"||!l.due_date)continue;const i=Tf[l.reminder];if(i===void 0)continue;const u=new Date(l.due_date).getTime();if(Number.isNaN(u))continue;const f=u-i;if(f>a)continue;const h=`${l.id}:${f}`;t[h]||o||(t[h]=f,n=!0,await Mf(l))}const c=a-Sf;for(const l of Object.keys(t))t[l]<c&&(delete t[l],n=!0);n&&Pf(t)}let Mi=!1,Ei=!1,Bo=!1;async function Gr(){if(!Bo){Bo=!0;try{await Ef()}finally{Bo=!1}}}function Cf(){Gr()}function Nf(){Mi||typeof window>"u"||(Mi=!0,Gr(),window.setInterval(()=>void Gr(),xf),window.setInterval(()=>{const a=Sc();Ei&&!a&&Gr(),Ei=a},1e3))}const jf="/assets/preset-1-CBSgnW-Q.jpg",Ff="/assets/preset-2-DV_n3pDN.jpg",Af="/assets/preset-3-q3qAbjR3.jpg",If="/assets/preset-4-B_bSN4WY.jpg",qf="/assets/preset-5-C1j6rp_Z.jpg",Rf="/assets/preset-6-_4eNaNuV.jpg",Lf="/assets/preset-7-D1OhqFGY.jpg",Of="/assets/preset-8-oFCsPykG.jpg",oo=[{id:"preset-bg-1",url:`url(${jf})`},{id:"preset-bg-2",url:`url(${Ff})`},{id:"preset-bg-3",url:`url(${Af})`},{id:"preset-bg-4",url:`url(${If})`},{id:"preset-bg-5",url:`url(${qf})`},{id:"preset-bg-6",url:`url(${Rf})`},{id:"preset-bg-7",url:`url(${Lf})`},{id:"preset-bg-8",url:`url(${Of})`}],Bf=oo.map(a=>a.id);function zf(a){return Bf.includes(a)}function Hf(a){var t;return((t=oo.find(n=>n.id===a))==null?void 0:t.url)??""}const Tc=[{id:"default",name:"默认",preview:"linear-gradient(160deg, #faf8f5, #ede4d8)"},{id:"sunny",name:"暖阳",preview:"linear-gradient(160deg, #fffbf5, #fde4c2)"},{id:"ocean",name:"海洋",preview:"linear-gradient(160deg, #f2f7fb, #c8dcf0)"},{id:"forest",name:"森林",preview:"linear-gradient(160deg, #f3f7f1, #cde0c6)"},{id:"dusk",name:"黄昏",preview:"linear-gradient(160deg, #fdf7f1, #edd0bc)"},{id:"lavender",name:"薰衣草",preview:"linear-gradient(160deg, #f8f5fb, #dcc8ed)"},{id:"evening",name:"暮色",preview:"linear-gradient(160deg, #f6f3f0, #d8cbbe)"},{id:"teal",name:"青石",preview:"linear-gradient(160deg, #f3f7f6, #c4dad5)"}],Uf=Tc.map(a=>a.id);function Wf(a){return Uf.includes(a)}const Dc="pomoflow-theme",Us="preset-bg-1";function zo(){return{theme:"default",background:{kind:"preset",id:Us}}}function Yf(a){return a?a.kind==="preset"?`preset:${a.id}`:a.url:""}function Gf(){if(typeof localStorage>"u")return zo();try{const a=localStorage.getItem(Dc);if(!a||!a.startsWith("{"))return zo();const t=JSON.parse(a),n=typeof t.theme=="string"&&Wf(t.theme)?t.theme:"default",r=typeof t.background=="string"?t.background:"";if(r.startsWith("preset:")){const o=r.slice(7);if(zf(o))return{theme:n,background:{kind:"preset",id:o}}}return r.startsWith("url(")?{theme:n,background:{kind:"custom",url:r}}:{theme:n,background:{kind:"preset",id:Us}}}catch{return zo()}}function Fr(a){if(!(typeof localStorage>"u"))try{localStorage.setItem(Dc,JSON.stringify({theme:a.theme,background:Yf(a.background)}))}catch{}}function Vf(a){return a?a.kind==="preset"?Hf(a.id):a.url:null}let Ya=W("default"),Ga=W(null);function Xn(){if(typeof document>"u")return;const a=document.documentElement;a.setAttribute("data-theme",e(Ya));const t=Vf(e(Ga));t?a.style.setProperty("--bg-page",t):a.style.removeProperty("--bg-page")}function Kf(){const a=Gf();v(Ya,a.theme,!0),v(Ga,a.background,!0),Xn()}function $f(){return e(Ya)}function Jf(){return e(Ga)}function Qf(a){v(Ya,a,!0),Fr({theme:a,background:e(Ga)}),Xn()}function Xf(a){const t={kind:"preset",id:a};v(Ga,t,!0),Fr({theme:e(Ya),background:t}),Xn()}function Zf(a){if(!a.startsWith("url("))return;const t={kind:"custom",url:a};v(Ga,t,!0),Fr({theme:e(Ya),background:t}),Xn()}function Ho(){v(Ga,null),Fr({theme:e(Ya),background:null}),Xn()}function Uo(){v(Ya,"default"),v(Ga,{kind:"preset",id:Us},!0),Fr({theme:e(Ya),background:e(Ga)}),Xn()}function eh(a){return new Promise(t=>{const n=new FileReader;n.onerror=()=>t(null),n.onload=()=>{const r=new Image;r.onerror=()=>t(null),r.onload=()=>{try{const c=Math.min(1,1920/Math.max(r.width,r.height)),l=Math.max(1,Math.round(r.width*c)),i=Math.max(1,Math.round(r.height*c)),u=document.createElement("canvas");u.width=l,u.height=i;const f=u.getContext("2d");if(!f)return t(null);f.drawImage(r,0,0,l,i),t(`url(${u.toDataURL("image/jpeg",.8)})`)}catch{t(null)}},r.src=String(n.result)},n.readAsDataURL(a)})}var th=Tn('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function Pc(a,t){let n=pa(t,"size",3,14),r=pa(t,"filled",3,!0);var o=th(),c=s(o);M(()=>{O(o,"width",n()),O(o,"height",n()),O(c,"fill",r()?"currentColor":"#e5e7eb")}),m(a,o)}const ah=Be({project:null,tag:null,priority:null,date:null});var nh=E('<textarea class="review-textarea svelte-1na66lg"></textarea>');function so(a,t){vt(t,!0);const n=I(mt);let r=pa(t,"rows",3,2),o=W(Be(Vt(()=>t.value??"")));St(()=>{const i=t.value??"";Vt(()=>{i!==e(o)&&v(o,i,!0)})});function c(){const i=e(o).trim();i===""?t.value&&t.onDelete&&t.onDelete():i!==(t.value??"")&&t.onSave(i)}var l=nh();M(()=>{O(l,"placeholder",t.placeholder??e(n).common.reviewPlaceholder),O(l,"aria-label",t.ariaLabel??t.placeholder??e(n).common.reviewPlaceholder),O(l,"rows",r())}),kt("blur",l,c),wt(l,()=>e(o),i=>v(o,i)),m(a,l),ft()}const Ci=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function Ni(){return Ci[Math.floor(Math.random()*Ci.length)]}const Mc=Be({n:0});function ji(){Mc.n+=1}var rh=E('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985"><!></button></div></div>');function oh(a,t){vt(t,!0);const n=I(mt);let r=W(Be([])),o=W(Be(new Set)),c=W(null);async function l(){try{v(r,await mc(),!0)}catch{v(r,[],!0)}}rn(()=>{l()}),St(()=>{Mc.n,l()}),St(()=>{var g;if(!e(c))if(e(r).length>0){const _=e(r)[0];v(c,{text:_.text,author:(g=_.author)!=null&&g.trim()?_.author:e(n).settings.motto.defaultAuthor},!0);const b=new Set(e(o));b.add(_.id),v(o,b,!0)}else v(c,Ni(),!0)});function i(){var g;if(e(r).length>0){let _=e(r).filter(x=>!e(o).has(x.id));_.length===0&&(v(o,new Set,!0),_=e(r));const b=_[0];v(c,{text:b.text,author:(g=b.author)!=null&&g.trim()?b.author:e(n).settings.motto.defaultAuthor},!0);const w=new Set(e(o));w.add(b.id),v(o,w,!0)}else v(c,Ni(),!0)}var u=Le(),f=Ne(u);{var h=g=>{var _=rh(),b=s(_),w=s(b),x=s(w);Zl(x,{size:20});var S=d(w,2),C=s(S),z=s(C),y=d(C,2),q=s(y),T=d(S,2),N=s(T);tv(N,{size:14}),M(()=>{p(z,e(c).text),p(q,`—— ${e(c).author??""}`),O(T,"aria-label",e(n).timer.mottoRefresh),O(T,"title",e(n).timer.mottoRefresh)}),G("click",T,i),m(g,_)};oe(f,g=>{e(c)&&g(h)})}m(a,u),ft()}yt(["click"]);var sh=E('<div class="empty svelte-1qmsx7e"> </div>'),ih=E('<button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-main svelte-1qmsx7e"><span class="item-title svelte-1qmsx7e"> </span> <span class="item-sub svelte-1qmsx7e"> </span></span> <span class="pri-dot svelte-1qmsx7e"></span></button>'),lh=E('<button type="button" class="backdrop svelte-1qmsx7e" aria-hidden="true" tabindex="-1"></button> <div class="menu svelte-1qmsx7e" role="listbox"><button type="button" class="item svelte-1qmsx7e" role="option"><span class="check svelte-1qmsx7e"><!></span> <span class="item-title svelte-1qmsx7e"> </span></button> <!> <!></div>',1),ch=E('<div class="selector svelte-1qmsx7e"><button type="button" class="trigger svelte-1qmsx7e" aria-haspopup="listbox"><span class="trigger-label svelte-1qmsx7e"> </span> <!></button> <!></div>');function dh(a,t){vt(t,!0);const n=I(mt);let r=W(!1);const o={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};function c(b){t.onSelect(b),v(r,!1)}var l=ch(),i=s(l),u=s(i),f=s(u),h=d(u,2);{let b=I(()=>"chev"+(e(r)?" open":""));Hn(h,{size:16,get class(){return e(b)}})}var g=d(i,2);{var _=b=>{var w=lh(),x=Ne(w),S=d(x,2),C=s(S),z=s(C),y=s(z);{var q=re=>{za(re,{size:16})};oe(y,re=>{t.activeTask||re(q)})}var T=d(z,2),N=s(T),L=d(C,2);{var ae=re=>{var ee=sh(),Q=s(ee);M(()=>p(Q,e(n).timer.noTodoTask)),m(re,ee)};oe(L,re=>{t.tasks.length===0&&re(ae)})}var ne=d(L,2);Ce(ne,17,()=>t.tasks,re=>re.id,(re,ee)=>{var Q=ih(),se=s(Q),B=s(se);{var R=D=>{za(D,{size:16})};oe(B,D=>{var A;((A=t.activeTask)==null?void 0:A.id)===e(ee).id&&D(R)})}var ce=d(se,2),he=s(ce),me=s(he),ye=d(he,2),je=s(ye),Ze=d(ce,2);M(()=>{var D;O(Q,"aria-selected",((D=t.activeTask)==null?void 0:D.id)===e(ee).id),p(me,e(ee).title),p(je,`${e(ee).completed_pomodoros??0??""}/${e(ee).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`),Rt(Ze,`background-color: ${o[e(ee).priority??"none"]??o.none??""}`)}),G("click",Q,()=>c(e(ee))),m(re,Q)}),M(()=>{O(C,"aria-selected",t.activeTask===null),p(N,e(n).timer.noSpecificTask)}),G("click",x,()=>v(r,!1)),G("click",C,()=>c(null)),m(b,w)};oe(g,b=>{e(r)&&b(_)})}M(()=>{O(i,"aria-expanded",e(r)),p(f,t.activeTask?t.activeTask.title:e(n).timer.selectTask)}),G("click",i,()=>v(r,!e(r))),m(a,l),ft()}yt(["click"]);var Fi=E("<option> </option>"),Ai=E('<button type="button"> </button>'),uh=E('<button type="button" class="clear svelte-13vcwbh"> </button>'),vh=E('<div class="empty svelte-13vcwbh"> </div>'),fh=E('<button type="button" class="expander svelte-13vcwbh"><!></button>'),hh=E('<span class="expander-placeholder svelte-13vcwbh"></span>'),Wo=E('<span class="meta-item svelte-13vcwbh"> </span>'),_h=E('<button type="button" class="start svelte-13vcwbh"><!></button>'),ph=E('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),gh=E('<div class="subs svelte-13vcwbh"></div>'),mh=E('<div><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),bh=E('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh"> </h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh"> </span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh"> </h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project"> </label> <select id="timer-filter-project" class="svelte-13vcwbh"><option> </option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag"> </label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option> </option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function yh(a,t){vt(t,!0);const n=I(mt),r={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let o=W(Be(new Set));function c(Z){const k=new Set(e(o));k.has(Z)?k.delete(Z):k.add(Z),v(o,k,!0)}function l(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const i=I(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),u=["high","medium","low"],f=I(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low})),h=["today","tomorrow","this_week"],g=I(()=>({today:e(n).filter.today,tomorrow:e(n).filter.tomorrow,this_week:e(n).filter.thisWeek}));function _(Z){var k;return Z?((k=t.projects.find(P=>P.id===Z))==null?void 0:k.name)??"":""}var b=bh(),w=s(b),x=s(w),S=s(x),C=s(S),z=d(S,2),y=s(z),q=s(y),T=d(y,2),N=s(T),L=d(x,2),ae=s(L),ne=s(ae),re=d(ae,2),ee=s(re),Q=s(ee),se=s(Q),B=d(Q,2),R=s(B),ce=s(R);R.value=R.__value="";var he=d(R);Ce(he,17,()=>t.projects,Z=>Z.id,(Z,k)=>{var P=Fi(),J=s(P),K={};M(()=>{p(J,e(k).name),K!==(K=e(k).id)&&(P.value=(P.__value=e(k).id)??"")}),m(Z,P)});var me;Bt(B);var ye=d(ee,2),je=s(ye),Ze=s(je),D=d(je,2),A=s(D),F=s(A);A.value=A.__value="";var Y=d(A);Ce(Y,17,()=>t.tags,Z=>Z.id,(Z,k)=>{var P=Fi(),J=s(P),K={};M(()=>{p(J,e(k).name),K!==(K=e(k).id)&&(P.value=(P.__value=e(k).id)??"")}),m(Z,P)});var fe;Bt(D);var be=d(re,2),le=s(be),pe=s(le),H=d(le,2);Ce(H,20,()=>u,Z=>Z,(Z,k)=>{var P=Ai();let J;var K=s(P);M(()=>{J=Ge(P,1,"opt svelte-13vcwbh",null,J,{active:t.filter.priority===k}),p(K,e(f)[k])}),G("click",P,()=>t.onFilterChange({priority:t.filter.priority===k?null:k})),m(Z,P)});var ie=d(H,2),ue=s(ie),ke=d(ie,2);Ce(ke,20,()=>h,Z=>Z,(Z,k)=>{var P=Ai();let J;var K=s(P);M(()=>{J=Ge(P,1,"opt svelte-13vcwbh",null,J,{active:t.filter.date===k}),p(K,e(g)[k])}),G("click",P,()=>t.onFilterChange({date:t.filter.date===k?null:k})),m(Z,P)});var Pe=d(be,2);{var Fe=Z=>{var k=uh(),P=s(k);M(()=>p(P,e(n).timer.clearFilter)),G("click",k,l),m(Z,k)};oe(Pe,Z=>{e(i)&&Z(Fe)})}var ze=d(w,2),U=s(ze);{var ve=Z=>{var k=vh(),P=s(k);M(()=>p(P,e(n).timer.noTask)),m(Z,k)};oe(U,Z=>{t.tasks.length===0&&Z(ve)})}var we=d(U,2);Ce(we,17,()=>t.tasks,Z=>Z.id,(Z,k)=>{const P=I(()=>e(k).status==="completed"),J=I(()=>{var Oe;return(((Oe=e(k).subtasks)==null?void 0:Oe.length)??0)>0}),K=I(()=>e(o).has(e(k).id)),$=I(()=>e(J)?(e(k).subtasks??[]).filter(Oe=>Oe.is_completed).length:0),V=I(()=>_(e(k).project_id));var X=mh();let De;var Se=s(X),Ue=s(Se);{var pt=Oe=>{var Ae=fh(),it=s(Ae);{var te=Re=>{Hn(Re,{size:14})},Te=Re=>{Un(Re,{size:14})};oe(it,Re=>{e(K)?Re(te):Re(Te,-1)})}M(()=>O(Ae,"aria-label",e(K)?e(n).timer.collapseSubtasks:e(n).timer.expandSubtasks)),G("click",Ae,()=>c(e(k).id)),m(Oe,Ae)},lt=Oe=>{var Ae=hh();m(Oe,Ae)};oe(Ue,Oe=>{e(J)?Oe(pt):Oe(lt,-1)})}var ct=d(Ue,2),et=d(ct,2),He=s(et);let ge;var _e=s(He),tt=d(He,2),at=s(tt),ht=s(at),rt=d(at,2);{var Pt=Oe=>{var Ae=Wo(),it=s(Ae);M(()=>{var te;return p(it,`· ${e($)??""}/${((te=e(k).subtasks)==null?void 0:te.length)??0??""}`)}),m(Oe,Ae)};oe(rt,Oe=>{e(J)&&Oe(Pt)})}var jt=d(rt,2);{var Lt=Oe=>{var Ae=Wo(),it=s(Ae);M(()=>p(it,e(V))),m(Oe,Ae)};oe(jt,Oe=>{e(V)&&Oe(Lt)})}var zt=d(jt,2);{var Ye=Oe=>{var Ae=Wo(),it=s(Ae);M(te=>p(it,te),[()=>e(k).due_date.slice(0,10)]),m(Oe,Ae)};oe(zt,Oe=>{e(k).due_date&&Oe(Ye)})}var gt=d(et,2);{var dt=Oe=>{var Ae=_h(),it=s(Ae);ao(it,{size:10,color:"#fff",fill:"#fff"}),M(()=>{O(Ae,"aria-label",e(n).timer.startTooltip),O(Ae,"title",e(n).timer.startTooltip)}),G("click",Ae,()=>t.onStartTask(e(k))),m(Oe,Ae)};oe(gt,Oe=>{e(P)||Oe(dt)})}var Ht=d(Se,2);{var Ct=Oe=>{var Ae=gh();Ce(Ae,21,()=>e(k).subtasks??[],it=>it.id,(it,te)=>{var Te=ph();let Re;var We=s(Te),Mt=d(We,2),xe=s(Mt);M(()=>{Re=Ge(Te,1,"sub-row svelte-13vcwbh",null,Re,{done:e(te).is_completed}),Kl(We,e(te).is_completed),p(xe,e(te).title)}),G("change",We,Ke=>t.onToggleSubtask(e(te).id,Ke.currentTarget.checked)),m(it,Te)}),m(Oe,Ae)};oe(Ht,Oe=>{e(J)&&e(K)&&Oe(Ct)})}M(()=>{De=Ge(X,1,"task-card svelte-13vcwbh",null,De,{active:e(k).id===t.activeTaskId}),Rt(ct,`background-color: ${r[e(k).priority||"none"]??r.none??""}`),ge=Ge(He,1,"title svelte-13vcwbh",null,ge,{done:e(P)}),p(_e,e(k).title),p(ht,`${e(k).completed_pomodoros??0??""}/${e(k).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`)}),m(Z,X)}),M(()=>{p(C,e(n).timer.todayFocus),p(q,t.todayMinutes),p(N,e(n).timer.minute),p(ne,e(n).timer.taskList),p(se,e(n).filter.project),p(ce,e(n).filter.all),me!==(me=t.filter.project??"")&&(B.value=(B.__value=t.filter.project??"")??"",At(B,t.filter.project??"")),p(Ze,e(n).filter.tag),p(F,e(n).filter.all),fe!==(fe=t.filter.tag??"")&&(D.value=(D.__value=t.filter.tag??"")??"",At(D,t.filter.tag??"")),p(pe,e(n).filter.priority),p(ue,e(n).filter.date)}),G("change",B,Z=>t.onFilterChange({project:Z.currentTarget.value||null})),G("change",D,Z=>t.onFilterChange({tag:Z.currentTarget.value||null})),m(a,b),ft()}yt(["change","click"]);var kh=E('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt"> </h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button"> </button></div></div>');function wh(a,t){vt(t,!0);const n=I(mt);function r(u){u.target===u.currentTarget&&t.onClose()}function o(u){u.key==="Escape"&&t.onClose()}var c=Le();kt("keydown",ss,function(...u){var f;(f=t.open?o:void 0)==null||f.apply(this,u)});var l=Ne(c);{var i=u=>{var f=kh(),h=s(f),g=d(s(h),2),_=s(g),b=d(g,2),w=s(b),x=d(b,2),S=s(x);M(()=>{p(_,e(n).timer.modalTitle),p(w,t.message),p(S,e(n).common.confirm)}),G("click",f,r),G("click",x,function(...C){var z;(z=t.onClose)==null||z.apply(this,C)}),m(u,f)};oe(l,u=>{t.open&&u(i)})}m(a,c),ft()}yt(["click"]);var xh=E('<span class="pomo-count svelte-17qnxlg"> </span>'),Sh=E('<div class="error svelte-17qnxlg" role="alert"> </div>'),Th=E('<button class="btn pause svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Dh=E('<button class="btn primary svelte-17qnxlg"><!> </button> <button class="btn secondary svelte-17qnxlg"><!> </button>',1),Ph=E('<button class="btn primary svelte-17qnxlg"><!> </button>'),Mh=E('<div class="layout page-veil svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist"><button role="tab"> </button> <button role="tab"> </button> <button role="tab"> </button></div> <!> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><defs class="svelte-17qnxlg"><linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%" class="svelte-17qnxlg"><stop offset="0%" stop-color="var(--color-accent-400, #e29676)" class="svelte-17qnxlg"></stop><stop offset="100%" stop-color="var(--color-accent-600, #c9552d)" class="svelte-17qnxlg"></stop></linearGradient></defs><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none" stroke-linecap="round" stroke="url(#ring-gradient)"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-row svelte-17qnxlg"><span class="mode-label svelte-17qnxlg"> </span> <!></div></div></div> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> <b class="svelte-17qnxlg"> </b> </div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg"> </div> <!></div> <!></div></div> <!> <!></div>');function Ii(a,t){vt(t,!0);let n=W(Be([])),r=W(Be([])),o=W(Be([])),c=W(Be([])),l=W(null),i=W(0),u=W(null),f=W(!1);const h=ah,g=I(zs),_=I(mt),b=I(()=>{var Te;const te=Va();return e(g).mode==="focus"?(((Te=e(g).activeTask)==null?void 0:Te.pomodoro_duration)??te.focusDuration)*60:e(g).mode==="short_break"?te.shortBreakDuration*60:te.longBreakDuration*60}),w=I(()=>e(b)>0?1-e(g).secondsLeft/e(b):0),x=I(()=>Math.floor(e(g).secondsLeft/60)),S=I(()=>e(g).secondsLeft%60),C=I(()=>`${String(e(x)).padStart(2,"0")}:${String(e(S)).padStart(2,"0")}`),z=I(()=>e(g).activeTask),y=I(()=>!e(g).running&&e(g).sessionId===null&&!e(f)),q=I(()=>e(g).mode==="focus"),T=I(()=>e(g).mode==="focus"?e(_).mode.focusing:e(g).mode==="short_break"?e(_).mode.shortBreak:e(_).mode.longBreak);function N(){const te=new Date,Te=new Date(te.getFullYear(),te.getMonth(),te.getDate(),0,0,0,0),Re=new Date(te.getFullYear(),te.getMonth(),te.getDate()+1,0,0,0,0);return{startMs:Te.getTime(),endMs:Re.getTime()}}function L(){const te=new Date,Te=new Date(te.getFullYear(),te.getMonth(),1,0,0,0,0),We=new Date(te.getFullYear(),te.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:Te.getTime(),monthEndMs:We}}function ae(){const te=new Date;return`${te.getFullYear()}-${String(te.getMonth()+1).padStart(2,"0")}-${String(te.getDate()).padStart(2,"0")}`}St(()=>{e(g).todayCount,B(),ee(),Q()}),St(()=>{e(g).activeTask&&e(g).activeTask.status==="completed"&&Ti(null)});async function ne(){try{v(n,await Os(),!0)}catch(te){console.warn("refresh projects",te)}}async function re(){try{v(r,await Bs(),!0)}catch(te){console.warn("refresh tags",te)}}async function ee(){try{const te=L(),Te=await Sn({status:null,month_start_ms:te.monthStartMs,month_end_ms:te.monthEndMs,project_id:h.project,tag_id:h.tag,priority:h.priority,date:h.date,limit:null}),Re={high:0,medium:1,low:2,none:3};v(o,Te.sort((We,Mt)=>{if(We.status!==Mt.status)return We.status==="active"?-1:1;const xe=Re[We.priority??"none"]??3,Ke=Re[Mt.priority??"none"]??3;return xe!==Ke?xe-Ke:new Date(We.created_at??0).getTime()-new Date(Mt.created_at??0).getTime()}),!0)}catch(te){console.warn("refresh tasks",te)}}async function Q(){try{const te=await Sn({status:"active",limit:null}),Te={high:0,medium:1,low:2,none:3};v(c,te.sort((Re,We)=>{const Mt=Te[Re.priority??"none"]??3,xe=Te[We.priority??"none"]??3;return Mt!==xe?Mt-xe:new Date(Re.created_at??0).getTime()-new Date(We.created_at??0).getTime()}),!0)}catch(te){console.warn("refresh active tasks",te)}}async function se(){try{const te=await xi(ae());v(l,(te==null?void 0:te.content)??null,!0)}catch(te){console.warn("refresh review",te)}}async function B(){try{const te=N();v(i,await Yv(te.startMs,te.endMs),!0)}catch(te){console.warn("refresh minutes",te)}}St(()=>{h.project,h.tag,h.priority,h.date,ee()}),rn(async()=>{await Promise.all([ne(),re(),ee(),Q(),se(),B()])});async function R(){var te,Te,Re;if(e(y)){v(f,!0),v(u,null);try{await Yn(((te=e(z))==null?void 0:te.id)??null,((Te=e(z))==null?void 0:Te.project_id)??null,((Re=e(z))==null?void 0:Re.pomodoro_duration)??void 0)}catch(We){v(u,String(We),!0)}finally{v(f,!1)}}}async function ce(){try{await Hs(!1)}catch(te){v(u,String(te),!0)}}function he(te){ro(te)}async function me(te){try{await vf(te)}catch(Te){v(u,String(Te),!0)}}function ye(te){Ti(te)}async function je(te,Te){try{const Re=await Promise.all(e(o).map(Mt=>gc(Mt.id)));let We=null;for(const Mt of Re){const xe=Mt.find(Ke=>Ke.id===te);if(xe){We=xe;break}}if(!We)return;await hs({...We,is_completed:Te}),await ee(),await B()}catch(Re){console.warn("toggle subtask",Re)}}async function Ze(te){try{const Te=ae(),Re=await xi(Te),We=Re?{...Re,content:te}:{id:crypto.randomUUID(),date:Te,content:te,updated_at:new Date().toISOString()};await hc(We),v(l,te,!0)}catch(Te){console.warn("save review",Te)}}async function D(){try{await _c(ae()),v(l,null)}catch(te){console.warn("delete review",te)}}const A=280,F=12,Y=(A-F)/2,fe=2*Math.PI*Y,be=I(()=>fe*(1-e(w)));var le=Mh();Nr("17qnxlg",te=>{Mr(()=>{Jn.title=e(_).page.timer??""})});var pe=s(le),H=s(pe),ie=s(H),ue=s(ie);let ke;var Pe=s(ue),Fe=d(ue,2);let ze;var U=s(Fe),ve=d(Fe,2);let we;var Z=s(ve),k=d(ie,2);{var P=te=>{dh(te,{get tasks(){return e(c)},get activeTask(){return e(z)},onSelect:ye})};oe(k,te=>{e(q)&&te(P)})}var J=d(k,2),K=s(J);O(K,"width",A),O(K,"height",A),O(K,"viewBox","0 0 280 280");var $=d(s(K));O($,"cx",A/2),O($,"cy",A/2),O($,"r",Y),O($,"stroke-width",F);var V=d($);O(V,"cx",A/2),O(V,"cy",A/2),O(V,"r",Y),O(V,"stroke-width",F),O(V,"stroke-dasharray",fe),O(V,"transform","rotate(-90 140 140)");var X=d(K,2),De=s(X),Se=s(De),Ue=d(De,2),pt=s(Ue),lt=s(pt),ct=d(pt,2);{var et=te=>{var Te=xh(),Re=s(Te);M(()=>{var We,Mt;return p(Re,`${((We=e(z))==null?void 0:We.completed_pomodoros)??0??""}/${((Mt=e(z))==null?void 0:Mt.estimated_pomodoros)??0??""} ${e(_).timer.pomodoros??""}`)}),m(te,Te)};oe(ct,te=>{e(q)&&te(et)})}var He=d(J,2);{var ge=te=>{var Te=Sh(),Re=s(Te);M(()=>p(Re,`⚠ ${e(u)??""}`)),m(te,Te)};oe(He,te=>{e(u)&&te(ge)})}var _e=d(He,2),tt=s(_e);{var at=te=>{var Te=Th(),Re=Ne(Te),We=s(Re);ev(We,{size:18,fill:"currentColor"});var Mt=d(We),xe=d(Re,2),Ke=s(xe);sv(Ke,{size:16});var bt=d(Ke);M(()=>{p(Mt,` ${e(_).timer.pause??""}`),p(bt,` ${e(_).timer.skip??""}`)}),G("click",Re,function(...Kt){Ro==null||Ro.apply(this,Kt)}),G("click",xe,ce),m(te,Te)},ht=te=>{var Te=Dh(),Re=Ne(Te),We=s(Re);ao(We,{size:18,fill:"currentColor"});var Mt=d(We),xe=d(Re,2),Ke=s(xe);iv(Ke,{size:16});var bt=d(Ke);M(()=>{p(Mt,` ${e(_).timer.resume??""}`),p(bt,` ${e(_).timer.abandon??""}`)}),G("click",Re,function(...Kt){Lo==null||Lo.apply(this,Kt)}),G("click",xe,ce),m(te,Te)},rt=te=>{var Te=Ph(),Re=s(Te);ao(Re,{size:18,fill:"currentColor"});var We=d(Re);M(()=>{Te.disabled=!e(y),p(We,` ${(e(f)?e(_).timer.starting:e(q)?e(_).timer.start:e(_).timer.startBreak)??""}`)}),G("click",Te,R),m(te,Te)};oe(tt,te=>{e(g).running?te(at):e(g).sessionId?te(ht,1):te(rt,-1)})}var Pt=d(_e,2),jt=d(s(Pt)),Lt=d(jt),zt=s(Lt),Ye=d(Lt),gt=d(Pt,2),dt=s(gt),Ht=s(dt),Ct=d(dt,2);so(Ct,{get value(){return e(l)},get placeholder(){return e(_).timer.reviewPlaceholder},rows:2,onSave:Ze,onDelete:D});var Oe=d(gt,2);oh(Oe,{});var Ae=d(pe,2);{let te=I(()=>{var Te;return((Te=e(g).activeTask)==null?void 0:Te.id)??null});yh(Ae,{get todayMinutes(){return e(i)},get projects(){return e(n)},get tags(){return e(r)},get tasks(){return e(o)},get activeTaskId(){return e(te)},get filter(){return h},onFilterChange:Te=>Object.assign(h,Te),onStartTask:me,onToggleSubtask:je})}var it=d(Ae,2);{let te=I(()=>e(g).pendingCompletionMessage!==null),Te=I(()=>e(g).pendingCompletionMessage??"");wh(it,{get open(){return e(te)},get message(){return e(Te)},get onClose(){return pf}})}M(()=>{O(ie,"aria-label",e(_).timer.modeTabsAria),ke=Ge(ue,1,"mode-tab svelte-17qnxlg",null,ke,{active:e(g).mode==="focus"}),O(ue,"aria-selected",e(g).mode==="focus"),p(Pe,e(_).mode.focus),ze=Ge(Fe,1,"mode-tab svelte-17qnxlg",null,ze,{active:e(g).mode==="short_break"}),O(Fe,"aria-selected",e(g).mode==="short_break"),p(U,e(_).mode.shortBreak),we=Ge(ve,1,"mode-tab svelte-17qnxlg",null,we,{active:e(g).mode==="long_break"}),O(ve,"aria-selected",e(g).mode==="long_break"),p(Z,e(_).mode.longBreak),O(V,"stroke-dashoffset",e(be)),p(Se,e(C)),p(lt,e(T)),p(jt,` ${e(_).timer.todayDone??""} `),p(zt,e(g).todayCount),p(Ye,` ${e(_).timer.pomodoroUnit??""}`),p(Ht,e(_).timer.reviewTitle)}),G("click",ue,()=>he("focus")),G("click",Fe,()=>he("short_break")),G("click",ve,()=>he("long_break")),m(a,le),ft()}yt(["click"]);async function Eh(a={}){return typeof a=="object"&&Object.freeze(a),await Ie("plugin:dialog|save",{options:a})}//! 截止时间（due_date）相关工具。
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
function io(a){return!!a&&a.includes("T")}function Jt(a){return(a||"").slice(0,10)}function Fa(){const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Ch(){const a=new Date;return`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`}function bs(a){return`${Jt(a)||Fa()}T${Ch()}`}function Vr(){const a=new Date;return a.setDate(a.getDate()+1),`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function qi(a){if(!a)return"";try{const t=new Date(a);if(isNaN(t.getTime()))return"";const n=t.getTimezoneOffset();return new Date(t.getTime()-n*6e4).toISOString().slice(0,16)}catch{return""}}function ys(a){if(!a)return null;try{const t=new Date(a);return isNaN(t.getTime())?null:t.toISOString()}catch{return null}}var Nh=E('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <span class="filter-stats svelte-qbpxhc"> </span></button>'),jh=E('<button type="button" class="add-root svelte-qbpxhc"><!></button>'),Fh=E('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Ah=E('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Ih=E('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),qh=E('<span class="expand-spacer svelte-qbpxhc"></span>'),Rh=E('<button type="button" class="more-btn svelte-qbpxhc"><!></button>'),Lh=E('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),Oh=E('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Ri=E('<button type="button" class="ctx-item svelte-qbpxhc"><!> </button>'),Bh=E('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> </button>'),zh=E('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),Hh=E('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),Uh=E('<div class="empty-hint svelte-qbpxhc"> </div>'),Wh=E('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),Yh=E('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> </button> <!></div> <!></div></aside>');function Gh(a,t){vt(t,!0);const n=I(mt);let r=pa(t,"search",3,""),o=W(!0),c=W(Be(new Set)),l=W(null),i=W(null),u=W(""),f=W(null),h=W("");function g(D){const A=D.getDay(),F=A===0?-6:1-A,Y=new Date(D);return Y.setDate(Y.getDate()+F),Y.setHours(0,0,0,0),Y}function _(D){const A=g(D),F=new Date(A);return F.setDate(F.getDate()+6),F.setHours(23,59,59,999),F}function b(D,A){if(A==="journal")return{timeStr:"",count:0};const F=Fa(),Y=Vr(),fe=g(new Date),be=_(new Date);let le=D;A==="today"&&(le=D.filter(ke=>Jt(ke.due_date)===F)),A==="tomorrow"&&(le=D.filter(ke=>Jt(ke.due_date)===Y)),A==="week"&&(le=D.filter(ke=>{if(!ke.due_date)return!1;const Pe=new Date(ke.due_date);return Pe>=fe&&Pe<=be})),A==="planned"&&(le=D.filter(ke=>ke.due_date!==null&&ke.due_date!==void 0)),A==="completed"&&(le=D.filter(ke=>ke.status==="completed"));const pe=le.reduce((ke,Pe)=>ke+(Pe.estimated_pomodoros||0)*(Pe.pomodoro_duration||25),0),H=Math.floor(pe/60),ie=pe%60;return{timeStr:H>0?`${H}h ${ie}m`:`${ie}m`,count:le.length}}function w(D){const A=new Map,F=[];for(const fe of D)A.set(fe.id,{...fe,children:[],depth:0});for(const fe of D){const be=A.get(fe.id);be&&(fe.parent_id&&A.has(fe.parent_id)?A.get(fe.parent_id).children.push(be):F.push(be))}const Y=(fe,be)=>{for(const le of fe)le.depth=be,Y(le.children,be+1)};return Y(F,0),F}function x(D,A){const F=[];for(const Y of D)F.push(Y),A.has(Y.id)&&Y.children.length>0&&F.push(...x(Y.children,A));return F}const S=I(()=>w(t.projects)),C=I(()=>x(e(S),e(c))),z=I(()=>[{key:"today",icon:lv,label:e(n).filter.today},{key:"tomorrow",icon:cv,label:e(n).filter.tomorrow},{key:"week",icon:Jl,label:e(n).filter.week},{key:"planned",icon:Uu,label:e(n).sidebar.planned},{key:"completed",icon:us,label:e(n).sidebar.completed},{key:"journal",icon:Wu,label:e(n).sidebar.journal}]),y=I(()=>t.selectedProject===null?t.filter:"");function q(D){const A=new Set(e(c));A.has(D)?A.delete(D):A.add(D),v(c,A,!0)}function T(D){t.onSetFilter(D),t.onSelectProject(null)}var N=Yh(),L=s(N),ae=s(L);rv(ae,{size:14,class:"search-icon"});var ne=d(ae,2),re=d(L,2);Ce(re,21,()=>e(z),D=>D.key,(D,A)=>{const F=I(()=>b(t.tasks,e(A).key)),Y=I(()=>e(y)===e(A).key);var fe=Nh();let be;var le=s(fe),pe=s(le);Cr(pe,()=>e(A).icon,(ke,Pe)=>{Pe(ke,{size:16})});var H=d(pe),ie=d(le,2),ue=s(ie);M(()=>{be=Ge(fe,1,"filter-btn svelte-qbpxhc",null,be,{active:e(Y)}),p(H,` ${e(A).label??""}`),p(ue,`${e(F).timeStr??""} ${e(F).count??""}`)}),G("click",fe,()=>T(e(A).key)),m(D,fe)});var ee=d(re,2),Q=s(ee),se=s(Q),B=s(se);{var R=D=>{Hn(D,{size:14})},ce=D=>{Un(D,{size:14})};oe(B,D=>{e(o)?D(R):D(ce,-1)})}var he=d(B),me=d(se,2);{var ye=D=>{var A=jh(),F=s(A);Wn(F,{size:14}),M(()=>{O(A,"aria-label",e(n).sidebar.addRootAria),O(A,"title",e(n).sidebar.addListTitle)}),G("click",A,()=>{v(f,"root"),v(h,"")}),m(D,A)};oe(me,D=>{t.onCreateProject&&D(ye)})}var je=d(Q,2);{var Ze=D=>{var A=Wh(),F=s(A);{var Y=pe=>{var H=Fh(),ie=s(H);pn(ie,!0),M(()=>O(ie,"placeholder",e(n).sidebar.listNamePlaceholder)),G("keydown",ie,ue=>{if(ue.key==="Enter"){const ke=e(h).trim();ke&&t.onCreateProject&&t.onCreateProject(ke,null),v(f,null),v(h,"")}ue.key==="Escape"&&(v(f,null),v(h,""))}),kt("blur",ie,()=>{const ue=e(h).trim();ue&&t.onCreateProject&&t.onCreateProject(ue,null),v(f,null),v(h,"")}),wt(ie,()=>e(h),ue=>v(h,ue)),m(pe,H)};oe(F,pe=>{e(f)==="root"&&t.onCreateProject&&pe(Y)})}var fe=d(F,2);Ce(fe,17,()=>e(C),pe=>pe.id,(pe,H)=>{const ie=I(()=>t.selectedProject===e(H).id),ue=I(()=>e(l)===e(H).id),ke=I(()=>e(i)===e(H).id),Pe=I(()=>e(H).children.length>0),Fe=I(()=>e(c).has(e(H).id));var ze=Hh(),U=s(ze);{var ve=K=>{var $=Ah(),V=s($);pn(V,!0),G("keydown",V,X=>{if(X.key==="Enter"){const De=e(u).trim();De&&t.onUpdateProject&&t.onUpdateProject(e(H).id,De),v(i,null),v(u,"")}X.key==="Escape"&&(v(i,null),v(u,""))}),kt("blur",V,()=>{const X=e(u).trim();X&&t.onUpdateProject&&t.onUpdateProject(e(H).id,X),v(i,null),v(u,"")}),wt(V,()=>e(u),X=>v(u,X)),m(K,$)},we=K=>{var $=Lh();let V;var X=s($),De=s(X);{var Se=ge=>{var _e=Ih(),tt=s(_e);{var at=rt=>{Hn(rt,{size:12})},ht=rt=>{Un(rt,{size:12})};oe(tt,rt=>{e(Fe)?rt(at):rt(ht,-1)})}M(()=>O(_e,"aria-label",e(Fe)?e(n).form.collapse:e(n).common.expand)),G("click",_e,rt=>{rt.stopPropagation(),q(e(H).id)}),m(ge,_e)},Ue=ge=>{var _e=qh();m(ge,_e)};oe(De,ge=>{e(Pe)?ge(Se):ge(Ue,-1)})}var pt=d(De,2);{let ge=I(()=>e(H).color||"var(--color-accent)");$u(pt,{size:14,get color(){return e(ge)}})}var lt=d(pt,2),ct=s(lt),et=d(X,2);{var He=ge=>{var _e=Rh(),tt=s(_e);Vu(tt,{size:14}),M(()=>O(_e,"aria-label",e(n).sidebar.moreActions)),G("click",_e,at=>{at.stopPropagation(),v(l,e(ue)?null:e(H).id,!0)}),m(ge,_e)};oe(et,ge=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&e(H).depth<2)&&ge(He)})}M(()=>{V=Ge($,1,"node-row svelte-qbpxhc",null,V,{active:e(ie)}),p(ct,e(H).name)}),G("click",X,()=>{t.onSelectProject(e(H).id),t.onSetFilter("")}),G("keydown",X,ge=>{(ge.key==="Enter"||ge.key===" ")&&(ge.preventDefault(),t.onSelectProject(e(H).id),t.onSetFilter(""))}),m(K,$)};oe(U,K=>{e(ke)?K(ve):K(we,-1)})}var Z=d(U,2);{var k=K=>{var $=Oh(),V=s($);pn(V,!0),M(()=>{Rt($,`padding-left: ${(e(H).depth+1)*12+12}px;`),O(V,"placeholder",e(H).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)}),G("keydown",V,X=>{if(X.key==="Enter"){const De=e(h).trim();De&&t.onCreateProject&&t.onCreateProject(De,e(H).id),v(f,null),v(h,"");const Se=new Set(e(c));Se.add(e(H).id),v(c,Se,!0)}X.key==="Escape"&&(v(f,null),v(h,""))}),kt("blur",V,()=>{const X=e(h).trim();X&&t.onCreateProject&&t.onCreateProject(X,e(H).id),v(f,null),v(h,"");const De=new Set(e(c));De.add(e(H).id),v(c,De,!0)}),wt(V,()=>e(h),X=>v(h,X)),m(K,$)};oe(Z,K=>{e(f)===e(H).id&&t.onCreateProject&&K(k)})}var P=d(Z,2);{var J=K=>{var $=zh(),V=s($);{var X=lt=>{var ct=Ri(),et=s(ct);Wn(et,{size:12});var He=d(et);M(()=>p(He,` ${e(n).settings.list.addChild??""}`)),G("click",ct,()=>{v(f,e(H).id,!0),v(h,""),v(l,null)}),m(lt,ct)};oe(V,lt=>{t.onCreateProject&&e(H).depth<2&&lt(X)})}var De=d(V,2);{var Se=lt=>{var ct=Ri(),et=s(ct);Rs(et,{size:12});var He=d(et);M(()=>p(He,` ${e(n).settings.list.edit??""}`)),G("click",ct,()=>{v(u,e(H).name,!0),v(i,e(H).id,!0),v(l,null)}),m(lt,ct)};oe(De,lt=>{t.onUpdateProject&&lt(Se)})}var Ue=d(De,2);{var pt=lt=>{var ct=Bh(),et=s(ct);mo(et,{size:12});var He=d(et);M(()=>p(He,` ${e(n).settings.list.del??""}`)),G("click",ct,()=>{t.onDeleteProject(e(H).id),v(l,null)}),m(lt,ct)};oe(Ue,lt=>{t.onDeleteProject&&lt(pt)})}m(K,$)};oe(P,K=>{e(ue)&&!e(ke)&&K(J)})}M(()=>Rt(ze,`padding-left: ${e(H).depth*12}px;`)),m(pe,ze)});var be=d(fe,2);{var le=pe=>{var H=Uh(),ie=s(H);M(()=>p(ie,e(n).sidebar.emptyHint)),m(pe,H)};oe(be,pe=>{t.projects.length===0&&e(f)!=="root"&&pe(le)})}m(D,A)};oe(je,D=>{e(o)&&D(Ze)})}M(()=>{to(ne,r()),O(ne,"placeholder",e(n).sidebar.searchTasksPlaceholder),p(he,` ${e(n).task.list??""}`)}),G("input",ne,D=>{var A;return(A=t.onSearchChange)==null?void 0:A.call(t,D.currentTarget.value)}),G("click",se,()=>v(o,!e(o))),m(a,N),ft()}yt(["input","click","keydown"]);var Vh=E('<span class="pri-badge svelte-3041n"> </span>'),Kh=E('<span class="tag svelte-3041n"> </span>'),$h=E('<div class="row-2 svelte-3041n"></div>'),Jh=E("<span></span>"),Qh=E('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),Xh=E('<span class="due svelte-3041n"> </span>'),Zh=E('<button type="button" class="start svelte-3041n"><!></button>'),e_=E('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function Ec(a,t){vt(t,!0);const n=I(mt),r=I(()=>t.task.status==="completed"),o=I(()=>t.task.estimated_pomodoros||0),c=I(()=>t.task.completed_pomodoros||0),l=I(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),i=I(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""})[t.task.priority||"none"]),u=I(()=>t.task.due_date?Jt(t.task.due_date):"");var f=e_();let h;var g=s(f);let _;var b=s(g);{var w=B=>{za(B,{size:12,strokeWidth:3,color:"#fff"})};oe(b,B=>{e(r)&&B(w)})}var x=d(g,2),S=s(x),C=s(S);{var z=B=>{var R=Vh(),ce=s(R);M(()=>{Rt(R,`--pri-color: ${e(l)??""}`),p(ce,e(i))}),m(B,R)};oe(C,B=>{t.task.priority&&t.task.priority!=="none"&&B(z)})}var y=d(C,2),q=s(y),T=d(S,2);{var N=B=>{var R=$h();Ce(R,21,()=>t.task.tags.slice(0,3),ce=>ce.id,(ce,he)=>{var me=Kh(),ye=s(me);M(()=>p(ye,`#${e(he).name??""}`)),m(ce,me)}),m(B,R)};oe(T,B=>{t.task.tags&&t.task.tags.length>0&&B(N)})}var L=d(T,2),ae=s(L);{var ne=B=>{var R=Qh(),ce=s(R);Ce(ce,21,()=>Array.from({length:Math.min(e(o),8)}),Ha,(ye,je,Ze)=>{var D=Jh();let A;M(()=>A=Ge(D,1,"dot svelte-3041n",null,A,{filled:Ze<e(c)})),m(ye,D)});var he=d(ce,2),me=s(he);M(()=>p(me,`${e(c)??""}/${e(o)??""} ${e(n).timer.pomodoros??""}`)),m(B,R)};oe(ae,B=>{e(o)>0&&B(ne)})}var re=d(ae,2);{var ee=B=>{var R=Xh(),ce=s(R);M(()=>p(ce,e(u))),m(B,R)};oe(re,B=>{e(u)&&B(ee)})}var Q=d(x,2);{var se=B=>{var R=Zh(),ce=s(R);ao(ce,{size:13,color:"#fff",fill:"#fff"}),M(()=>{O(R,"aria-label",e(n).task.startTooltip),O(R,"title",e(n).task.startTooltip)}),G("click",R,he=>{var me;he.stopPropagation(),(me=t.onStart)==null||me.call(t,t.task)}),m(B,R)};oe(Q,B=>{!e(r)&&t.onStart&&B(se)})}M(()=>{h=Ge(f,1,"task-card svelte-3041n",null,h,{selected:t.selected,done:e(r)}),O(f,"aria-label",t.task.title),_=Ge(g,1,"check svelte-3041n",null,_,{checked:e(r)}),O(g,"aria-label",e(r)?e(n).common.ariaMarkUndone:e(n).common.ariaMarkDone),p(q,t.task.title)}),G("click",f,()=>t.onSelect(t.task)),G("keydown",f,B=>{(B.key==="Enter"||B.key===" ")&&(B.preventDefault(),t.onSelect(t.task))}),G("click",g,B=>{B.stopPropagation(),t.onToggle(t.task.id)}),m(a,f),ft()}yt(["click","keydown"]);//! 清单(项目)树 → 下拉选项平铺 —— v1 TaskForm/TaskDetailPanel 共用逻辑。
//!
//! 规则(v1 getProjectTreeOptions):
//!   - 深度优先遍历,子清单缩进一级(depth 供前端渲染 `'　'.repeat(depth)`)
//!   - 有子清单的父节点 `disabled: true`(任务只能挂到叶子清单)
function Cc(a){const t=new Map;for(const c of a)t.set(c.id,{...c,children:[]});const n=[];for(const c of a)c.parent_id&&t.has(c.parent_id)?t.get(c.parent_id).children.push(c.id):n.push(c.id);const r=[],o=(c,l)=>{const i=t.get(c),u=i.children.length>0;r.push({id:i.id,name:i.name,depth:l,disabled:u});for(const f of i.children)o(f,l+1)};for(const c of n)o(c,0);return r}var t_=E('<div class="empty svelte-q02l1n"> </div>'),a_=E('<span class="check svelte-q02l1n">✓</span>'),n_=E('<button type="button"><!> <span class="name svelte-q02l1n"> </span></button>'),r_=E('<div class="chips svelte-q02l1n" role="group"></div>');function o_(a,t){vt(t,!0);const n=I(mt),r=I(()=>new Set(t.selected));function o(h){const g=new Set(e(r));g.has(h)?g.delete(h):g.add(h),t.onChange([...g])}function c(h){return`--chip-color: ${h&&h.length>0?h:"var(--color-accent)"};`}var l=Le(),i=Ne(l);{var u=h=>{var g=t_(),_=s(g);M(()=>p(_,e(n).task.detailNoTagsAvailable)),m(h,g)},f=h=>{var g=r_();Ce(g,21,()=>t.tags,_=>_.id,(_,b)=>{const w=I(()=>e(r).has(e(b).id));var x=n_();let S;var C=s(x);{var z=T=>{var N=a_();m(T,N)};oe(C,T=>{e(w)&&T(z)})}var y=d(C,2),q=s(y);M(T=>{S=Ge(x,1,"chip svelte-q02l1n",null,S,{on:e(w)}),Rt(x,T),O(x,"aria-pressed",e(w)),p(q,e(b).name)},[()=>c(e(b).color)]),G("click",x,()=>o(e(b).id)),m(_,x)}),M(()=>O(g,"aria-label",e(n).task.tagPickerAria)),m(h,g)};oe(i,h=>{t.tags.length===0?h(u):h(f,-1)})}m(a,l),ft()}yt(["click"]);var s_=E('<input type="text" class="title-input svelte-1t5orp1"/>'),i_=E('<button type="button" class="title-btn svelte-1t5orp1"> </button>'),l_=E('<button type="button" class="icon-btn svelte-1t5orp1"><!></button>'),c_=E('<li><input type="checkbox" class="svelte-1t5orp1"/> <!> <!> <button type="button" class="icon-btn danger svelte-1t5orp1"><!></button></li>');function d_(a,t){vt(t,!0);const n=I(mt);let r=W(!1),o=W(Be(Vt(()=>t.subtask.title))),c=W(null);St(()=>{e(r)||v(o,t.subtask.title,!0)});function l(){v(o,t.subtask.title,!0),v(r,!0),queueMicrotask(()=>{var T;return(T=e(c))==null?void 0:T.focus()})}function i(){const T=e(o).trim();e(r)&&(v(r,!1),T&&T!==t.subtask.title?t.onChange({...t.subtask,title:T}):T||v(o,t.subtask.title,!0))}function u(){v(o,t.subtask.title,!0),v(r,!1)}function f(T){T.key==="Enter"?(T.preventDefault(),i()):T.key==="Escape"&&(T.preventDefault(),u())}function h(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var g=c_();let _;var b=s(g),w=d(b,2);{var x=T=>{var N=s_();Eu(N,L=>v(c,L),()=>e(c)),M(()=>O(N,"aria-label",e(n).task.editSubtask)),kt("blur",N,i),G("keydown",N,f),wt(N,()=>e(o),L=>v(o,L)),m(T,N)},S=T=>{var N=i_(),L=s(N);M(()=>{O(N,"title",e(n).task.dblclickToEdit),p(L,t.subtask.title)}),G("dblclick",N,l),m(T,N)};oe(w,T=>{e(r)?T(x):T(S,-1)})}var C=d(w,2);{var z=T=>{var N=l_(),L=s(N);Rs(L,{size:13}),M(()=>{O(N,"aria-label",e(n).task.editSubtask),O(N,"title",e(n).task.editSubtask)}),G("click",N,l),m(T,N)};oe(C,T=>{e(r)||T(z)})}var y=d(C,2),q=s(y);mo(q,{size:13}),M(()=>{_=Ge(g,1,"row svelte-1t5orp1",null,_,{done:t.subtask.is_completed}),Kl(b,t.subtask.is_completed),O(b,"aria-label",e(n).task.toggleSubtaskAria),O(y,"aria-label",e(n).task.deleteSubtask),O(y,"title",e(n).task.deleteSubtask)}),G("change",b,h),G("click",y,()=>t.onDelete(t.subtask.id)),m(a,g),ft()}yt(["change","keydown","dblclick","click"]);var Li=E('<button type="button"> </button>'),u_=E('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="weekdays svelte-1h3pyjl"></div></div>'),v_=E('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="month-grid svelte-1h3pyjl"></div></div>'),f_=E('<div class="warn svelte-1h3pyjl"> </div>'),h_=E('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl"> </h3> <button type="button" class="close-btn svelte-1h3pyjl"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl"> </label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl"> </label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl"> </label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl"> </label> <select id="rc-type" class="input svelte-1h3pyjl"><option> </option><option> </option><option> </option><option> </option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl"> </button> <button type="button" class="btn-confirm svelte-1h3pyjl"> </button></div></div></div>');function Nc(a,t){vt(t,!0);const n=I(mt);function r(){const y=new Date,q=T=>String(T).padStart(2,"0");return`${y.getFullYear()}-${q(y.getMonth()+1)}-${q(y.getDate())}T${q(y.getHours())}:${q(y.getMinutes())}`}function o(){return`${new Date().getFullYear()}-12-31T23:59`}let c=W(Be(r())),l=W(Be(o())),i=W(1),u=W("week"),f=W(Be([])),h=W(Be([]));St(()=>{if(t.open&&t.initialConfig)try{const y=JSON.parse(t.initialConfig);v(c,y.startDate||r(),!0),v(l,y.endDate||o(),!0),v(i,y.interval||1,!0),v(u,y.type||"week",!0),v(f,y.weekdays||[],!0),v(h,y.monthDays||[],!0)}catch{}});function g(y,q,T){T(y.includes(q)?y.filter(N=>N!==q):[...y,q].sort((N,L)=>N-L))}function _(){const y={interval:e(i),type:e(u),startDate:e(c),endDate:e(l)};e(u)==="week"&&(y.weekdays=e(f)),e(u)==="month"&&(y.monthDays=e(h)),t.onConfirm(JSON.stringify(y))}let b=I(()=>e(u)==="week"&&e(f).length===0||e(u)==="month"&&e(h).length===0);function w(y){y.target===y.currentTarget&&t.onClose()}function x(y){y.key==="Escape"&&t.onClose()}var S=Le(),C=Ne(S);{var z=y=>{var q=h_(),T=s(q),N=s(T),L=s(N),ae=s(L),ne=d(L,2),re=s(ne);ec(re,{size:18});var ee=d(N,2),Q=s(ee),se=s(Q),B=s(se),R=s(B),ce=d(B,2),he=d(se,2),me=s(he),ye=s(me),je=d(me,2),Ze=d(Q,2),D=s(Ze),A=s(D),F=s(A),Y=d(A,2),fe=d(D,2),be=s(fe),le=s(be),pe=d(be,2),H=s(pe),ie=s(H);H.value=H.__value="day";var ue=d(H),ke=s(ue);ue.value=ue.__value="week";var Pe=d(ue),Fe=s(Pe);Pe.value=Pe.__value="month";var ze=d(Pe),U=s(ze);ze.value=ze.__value="year";var ve=d(Ze,2);{var we=Se=>{var Ue=u_(),pt=s(Ue),lt=s(pt),ct=d(pt,2);Ce(ct,21,()=>e(n).settings.repeatCustom.weekShort,Ha,(et,He,ge)=>{const _e=I(()=>ge+1),tt=I(()=>e(f).includes(e(_e)));var at=Li();let ht;var rt=s(at);M(()=>{ht=Ge(at,1,"weekday-btn svelte-1h3pyjl",null,ht,{active:e(tt)}),p(rt,e(He))}),G("click",at,()=>g(e(f),e(_e),Pt=>v(f,Pt,!0))),m(et,at)}),M(()=>p(lt,e(n).settings.repeatCustom.weekdays)),m(Se,Ue)};oe(ve,Se=>{e(u)==="week"&&Se(we)})}var Z=d(ve,2);{var k=Se=>{var Ue=v_(),pt=s(Ue),lt=s(pt),ct=d(pt,2);Ce(ct,20,()=>Array.from({length:31},(et,He)=>He+1),Ha,(et,He)=>{const ge=I(()=>e(h).includes(He));var _e=Li();let tt;var at=s(_e);M(()=>{tt=Ge(_e,1,"month-btn svelte-1h3pyjl",null,tt,{active:e(ge)}),p(at,He)}),G("click",_e,()=>g(e(h),He,ht=>v(h,ht,!0))),m(et,_e)}),M(()=>p(lt,e(n).settings.repeatCustom.monthDays)),m(Se,Ue)};oe(Z,Se=>{e(u)==="month"&&Se(k)})}var P=d(Z,2);{var J=Se=>{var Ue=f_(),pt=s(Ue);M(()=>p(pt,e(u)==="week"?e(n).settings.repeatCustom.needPickWeek:e(n).settings.repeatCustom.needPickDay)),m(Se,Ue)};oe(P,Se=>{e(b)&&Se(J)})}var K=d(ee,2),$=s(K),V=s($),X=d($,2),De=s(X);M(()=>{p(ae,e(n).settings.repeatCustom.title),O(ne,"aria-label",e(n).common.close),p(R,e(n).settings.repeatCustom.startDate),p(ye,e(n).settings.repeatCustom.endDate),p(F,e(n).settings.repeatCustom.interval),p(le,e(n).settings.repeatCustom.type),p(ie,e(n).settings.repeatCustom.typeDay),p(ke,e(n).settings.repeatCustom.typeWeek),p(Fe,e(n).settings.repeatCustom.typeMonth),p(U,e(n).settings.repeatCustom.typeYear),p(V,e(n).settings.repeatCustom.cancel),X.disabled=e(b),p(De,e(n).settings.repeatCustom.confirm)}),G("click",q,w),G("keydown",q,x),G("click",ne,function(...Se){var Ue;(Ue=t.onClose)==null||Ue.apply(this,Se)}),wt(ce,()=>e(c),Se=>v(c,Se)),wt(je,()=>e(l),Se=>v(l,Se)),wt(Y,()=>e(i),Se=>v(i,Se)),eo(pe,()=>e(u),Se=>v(u,Se)),G("click",$,function(...Se){var Ue;(Ue=t.onClose)==null||Ue.apply(this,Se)}),G("click",X,_),m(y,q)};oe(C,y=>{t.open&&y(z)})}m(a,S),ft()}yt(["click","keydown"]);var __=E("<span> </span>"),Yo=E("<option> </option>"),p_=E('<button type="button" class="link svelte-1qppxcb"> </button>'),g_=E('<aside class="panel svelte-1qppxcb"><header class="head svelte-1qppxcb"><div class="meta svelte-1qppxcb"><span class="proj svelte-1qppxcb"> </span> <!></div> <button class="close svelte-1qppxcb">×</button></header> <input class="title svelte-1qppxcb"/> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="desc"> </label> <textarea id="desc" class="desc svelte-1qppxcb" rows="4"></textarea></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="proj"> </label> <select id="proj" class="svelte-1qppxcb"><option> </option><!></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="pri"> </label> <select id="pri" class="svelte-1qppxcb"><option> </option><option> </option><option> </option><option> </option></select></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="est"> </label> <div class="pomo-row svelte-1qppxcb"><span class="pomo-done svelte-1qppxcb"> </span> <input id="est" class="pomo-input svelte-1qppxcb" type="number" min="1" max="99"/> <span class="pomo-minutes svelte-1qppxcb"> </span></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="due"> </label> <div class="row-inline svelte-1qppxcb"><input id="due" type="datetime-local" class="svelte-1qppxcb"/> <!></div></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="reminder"> </label> <select id="reminder" class="svelte-1qppxcb"></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="repeat"> </label> <select id="repeat" class="svelte-1qppxcb"></select></div></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb"> </span> <!></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb"> </span> <ul class="sub-list svelte-1qppxcb"></ul> <form class="sub-add svelte-1qppxcb"><input type="text" class="svelte-1qppxcb"/> <button type="submit" class="svelte-1qppxcb"> </button></form></section> <section class="block svelte-1qppxcb"><button class="delete svelte-1qppxcb"> </button></section> <!></aside>');function m_(a,t){vt(t,!0);const n=I(mt);let r=W(Be(Vt(()=>t.task.title))),o=W(Be(Vt(()=>t.task.description??""))),c=W(Be(Vt(()=>qi(t.task.due_date))));St(()=>{v(r,t.task.title,!0),v(o,t.task.description??"",!0),v(c,qi(t.task.due_date),!0)});function l(){return new Date().toISOString()}async function i(de){try{await fs({...t.task,...de,updated_at:l()}),t.onChanged()}catch(Me){console.error("patch task failed",Me),alert(Nt(e(n).task.saveFailed,{err:String(Me)}))}}async function u(de,Me){try{await fs({...t.task,repeat:de,updated_at:l(),...de==="custom"&&Me!==void 0?{repeat_config:Me}:{}},e(b)),t.onChanged()}catch(Je){console.error("patch repeat failed",Je),alert(Nt(e(n).task.saveFailed,{err:String(Je)}))}}async function f(){const de=e(r).trim();!de||de===t.task.title||await i({title:de})}async function h(){e(o)!==(t.task.description??"")&&await i({description:e(o)})}async function g(){const de=ys(e(c));de!==t.task.due_date&&await i({due_date:de})}function _(){v(c,""),i({due_date:null})}let b=W(Be([]));St(()=>{w()});async function w(){try{const de=await jv(t.task.id);v(b,de.map(Me=>Me.id),!0)}catch(de){console.error("load tags failed",de)}}async function x(de){const Me=e(b);v(b,de,!0);try{await Fv(t.task.id,de),t.onChanged()}catch(Je){v(b,Me,!0),alert(Nt(e(n).task.setTagsFailed,{err:String(Je)}))}}let S=W(Be([])),C=W("");St(()=>{z()});async function z(){try{v(S,await gc(t.task.id),!0)}catch(de){console.error("load subtasks failed",de)}}async function y(){const de=e(C).trim();if(!de)return;v(C,"");const Me={id:crypto.randomUUID(),task_id:t.task.id,title:de,is_completed:!1,position:e(S).length,created_at:l(),updated_at:l()};try{const Je=await hs(Me);v(S,[...e(S),Je],!0),t.onChanged()}catch(Je){alert(Nt(e(n).task.addSubtaskFailed,{err:String(Je)}))}}async function q(de){const Me=e(S).find(Je=>Je.id===de.id);v(S,e(S).map(Je=>Je.id===de.id?de:Je),!0);try{await hs(de),t.onChanged()}catch(Je){Me&&v(S,e(S).map(ra=>ra.id===Me.id?Me:ra),!0),alert(Nt(e(n).task.updateSubtaskFailed,{err:String(Je)}))}}async function T(de){const Me=e(S);v(S,e(S).filter(Je=>Je.id!==de),!0);try{await zv(de),t.onChanged()}catch(Je){v(S,Me,!0),alert(Nt(e(n).task.deleteSubtaskFailed,{err:String(Je)}))}}async function N(){try{await Mv(t.task.id),t.onClose(),t.onChanged()}catch(de){alert(Nt(e(n).task.saveFailed,{err:String(de)}))}}const L=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],ae=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],ne={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},re={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function ee(de){return e(n).enum.reminder[ne[de]]}function Q(de){return e(n).enum.repeat[re[de]]}function se(de){var Me;return de?((Me=t.projects.find(Je=>Je.id===de))==null?void 0:Me.name)??e(n).task.unknownProject:e(n).task.detailNoProject}function B(de){return{high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""}[de??"none"]??""}let R=W(!1);const ce=I(Va),he=I(()=>t.task.estimated_pomodoros*(t.task.pomodoro_duration??e(ce).focusDuration));function me(de){const Me=de.currentTarget,Je=Math.round(Number(Me.value)),ra=Math.min(99,Math.max(1,Number.isFinite(Je)?Je:1));ra!==t.task.estimated_pomodoros&&i({estimated_pomodoros:ra})}function ye(de){if(de==="none"){i({reminder:de});return}if(io(e(c)))i({reminder:de});else{const Me=bs(e(c));alert(e(n).task.detailTimeFilled),v(c,Me,!0),i({reminder:de,due_date:ys(Me)})}}var je=g_(),Ze=s(je),D=s(Ze),A=s(D),F=s(A),Y=d(A,2);{var fe=de=>{var Me=__(),Je=s(Me);M(ra=>{Ge(Me,1,`pri pri-${t.task.priority??""}`,"svelte-1qppxcb"),p(Je,ra)},[()=>B(t.task.priority)]),m(de,Me)};oe(Y,de=>{t.task.priority!=="none"&&de(fe)})}var be=d(D,2),le=d(Ze,2),pe=d(le,2),H=s(pe),ie=s(H),ue=d(H,2),ke=d(pe,2),Pe=s(ke),Fe=s(Pe),ze=s(Fe),U=d(Fe,2),ve=s(U),we=s(ve);ve.value=ve.__value="";var Z=d(ve);Ce(Z,17,()=>Cc(t.projects),de=>de.id,(de,Me)=>{var Je=Yo(),ra=s(Je),Ka={};M(Zn=>{Je.disabled=e(Me).disabled,p(ra,`${Zn??""}${e(Me).name??""}`),Ka!==(Ka=e(Me).id)&&(Je.value=(Je.__value=e(Me).id)??"")},[()=>"　".repeat(e(Me).depth)]),m(de,Je)});var k;Bt(U);var P=d(Pe,2),J=s(P),K=s(J),$=d(J,2),V=s($),X=s(V);V.value=V.__value="none";var De=d(V),Se=s(De);De.value=De.__value="high";var Ue=d(De),pt=s(Ue);Ue.value=Ue.__value="medium";var lt=d(Ue),ct=s(lt);lt.value=lt.__value="low";var et;Bt($);var He=d(ke,2),ge=s(He),_e=s(ge),tt=d(ge,2),at=s(tt),ht=s(at),rt=d(at,2),Pt=d(rt,2),jt=s(Pt),Lt=d(He,2),zt=s(Lt),Ye=s(zt),gt=d(zt,2),dt=s(gt),Ht=d(dt,2);{var Ct=de=>{var Me=p_(),Je=s(Me);M(()=>p(Je,e(n).common.clear)),G("click",Me,_),m(de,Me)};oe(Ht,de=>{e(c)&&de(Ct)})}var Oe=d(Lt,2),Ae=s(Oe),it=s(Ae),te=s(it),Te=d(it,2);Ce(Te,21,()=>L,de=>de.value,(de,Me)=>{var Je=Yo(),ra=s(Je),Ka={};M(Zn=>{p(ra,Zn),Ka!==(Ka=e(Me).value)&&(Je.value=(Je.__value=e(Me).value)??"")},[()=>ee(e(Me).value)]),m(de,Je)});var Re;Bt(Te);var We=d(Ae,2),Mt=s(We),xe=s(Mt),Ke=d(Mt,2);Ce(Ke,21,()=>ae,de=>de.value,(de,Me)=>{var Je=Yo(),ra=s(Je),Ka={};M(Zn=>{p(ra,Zn),Ka!==(Ka=e(Me).value)&&(Je.value=(Je.__value=e(Me).value)??"")},[()=>Q(e(Me).value)]),m(de,Je)});var bt;Bt(Ke);var Kt=d(Oe,2),ea=s(Kt),Fc=s(ea),Ac=d(ea,2);o_(Ac,{get tags(){return t.allTags},get selected(){return e(b)},onChange:x});var Ws=d(Kt,2),Ys=s(Ws),Ic=s(Ys),Gs=d(Ys,2);Ce(Gs,21,()=>e(S),de=>de.id,(de,Me)=>{d_(de,{get subtask(){return e(Me)},onChange:q,onDelete:T})});var Vs=d(Gs,2),Ar=s(Vs),Ks=d(Ar,2),qc=s(Ks),$s=d(Ws,2),Js=s($s),Rc=s(Js),Lc=d($s,2);Nc(Lc,{get open(){return e(R)},get initialConfig(){return t.task.repeat_config},onConfirm:de=>{v(R,!1),u("custom",de)},onClose:()=>v(R,!1)}),M((de,Me)=>{O(je,"aria-label",e(n).task.detailPanelAria),p(F,de),O(be,"aria-label",e(n).common.close),O(le,"aria-label",e(n).task.titleAria),p(ie,e(n).task.detailDescription),O(ue,"placeholder",e(n).task.detailDescPlaceholder),p(ze,e(n).task.detailProject),p(we,e(n).task.detailNoProject),k!==(k=t.task.project_id??"")&&(U.value=(U.__value=t.task.project_id??"")??"",At(U,t.task.project_id??"")),p(K,e(n).task.detailPriority),p(X,e(n).priority.none),p(Se,e(n).priority.high),p(pt,e(n).priority.medium),p(ct,e(n).priority.low),et!==(et=t.task.priority)&&($.value=($.__value=t.task.priority)??"",At($,t.task.priority)),p(_e,e(n).task.detailPomodoro),p(ht,`${t.task.completed_pomodoros??""}/`),to(rt,t.task.estimated_pomodoros),p(jt,`= ${e(he)??""}${e(n).task.minute??""}`),p(Ye,e(n).task.detailDueDate),p(te,e(n).task.detailReminder),Re!==(Re=t.task.reminder??"none")&&(Te.value=(Te.__value=t.task.reminder??"none")??"",At(Te,t.task.reminder??"none")),p(xe,e(n).task.detailRepeat),bt!==(bt=t.task.repeat??"none")&&(Ke.value=(Ke.__value=t.task.repeat??"none")??"",At(Ke,t.task.repeat??"none")),p(Fc,e(n).filter.tag),p(Ic,e(n).task.detailSubtasks),O(Ar,"placeholder",e(n).task.detailAddSubtask),O(Ar,"aria-label",e(n).task.newSubtaskAria),Ks.disabled=Me,p(qc,e(n).common.add),p(Rc,e(n).task.detailDelete)},[()=>se(t.task.project_id),()=>!e(C).trim()]),G("click",be,function(...de){var Me;(Me=t.onClose)==null||Me.apply(this,de)}),kt("blur",le,f),G("keydown",le,de=>{de.key==="Enter"&&(de.preventDefault(),de.currentTarget.blur())}),wt(le,()=>e(r),de=>v(r,de)),kt("blur",ue,h),wt(ue,()=>e(o),de=>v(o,de)),G("change",U,de=>{const Me=de.currentTarget.value;i({project_id:Me||null})}),G("change",$,de=>{const Me=de.currentTarget.value;i({priority:Me})}),G("change",rt,me),G("input",dt,de=>{de.currentTarget.value.length===16&&de.currentTarget.blur()}),kt("blur",dt,g),wt(dt,()=>e(c),de=>v(c,de)),G("change",Te,de=>{const Me=de.currentTarget.value;ye(Me)}),G("change",Ke,de=>{const Me=de.currentTarget.value;Me==="custom"?v(R,!0):u(Me)}),kt("submit",Vs,de=>{de.preventDefault(),y()}),wt(Ar,()=>e(C),de=>v(C,de)),G("click",Js,()=>{confirm(Nt(e(n).task.deleteConfirm,{title:t.task.title}))&&N()}),m(a,je),ft()}yt(["click","keydown","change","input"]);var b_=E('<div class="group-tasks svelte-1u318f6"></div>'),y_=E('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),k_=E('<div class="grouped svelte-1u318f6"></div>');function w_(a,t){vt(t,!0);const n=I(mt),r="unscheduled";let o=W(Be(new Set));function c(f,h){const g=new Date(f+"T00:00:00"),_=h.reduce((b,w)=>b+(w.estimated_pomodoros||0)*(w.pomodoro_duration||25),0);return Nt(e(n).task.groupHeader,{date:f,weekday:e(n).enum.weekday[g.getDay()],n:_})}function l(f){const h=new Set(e(o));h.has(f)?h.delete(f):h.add(f),v(o,h,!0)}const i=I(()=>{const f=new Map;for(const g of t.tasks){let _;t.groupBy==="completed_at"?g.completed_at?_=Jt(g.completed_at):_=r:_=g.due_date?Jt(g.due_date):r,f.has(_)||f.set(_,[]),f.get(_).push(g)}const h=Array.from(f.entries());return h.sort((g,_)=>g[0]===r?1:_[0]===r?-1:new Date(g[0]).getTime()-new Date(_[0]).getTime()),h});var u=k_();Ce(u,21,()=>e(i),([f,h])=>f,(f,h)=>{var g=I(()=>Xi(e(h),2));let _=()=>e(g)[0],b=()=>e(g)[1];const w=I(()=>e(o).has(_()));var x=y_(),S=s(x),C=s(S),z=s(C),y=d(C,2),q=s(y);{var T=ne=>{Un(ne,{size:16})},N=ne=>{Hn(ne,{size:16})};oe(q,ne=>{e(w)?ne(T):ne(N,-1)})}var L=d(S,2);{var ae=ne=>{var re=b_();Ce(re,21,b,ee=>ee.id,(ee,Q)=>{{let se=I(()=>{var B;return((B=t.selectedTask)==null?void 0:B.id)===e(Q).id});Ec(ee,{get task(){return e(Q)},get selected(){return e(se)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),m(ne,re)};oe(L,ne=>{e(w)||ne(ae)})}M(ne=>{O(S,"aria-expanded",!e(w)),p(z,ne)},[()=>_()===r?e(n).task.noDate:c(_(),b())]),G("click",S,()=>l(_())),m(f,x)}),m(a,u),ft()}yt(["click"]);var x_=E('<span class="unit svelte-1i37zgo"> </span>'),S_=E('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function Wt(a,t){var n=S_();let r;var o=s(n),c=s(o);Cr(c,()=>t.icon,(_,b)=>{b(_,{size:18,strokeWidth:1.8})});var l=d(o,2),i=s(l),u=d(i);{var f=_=>{var b=x_(),w=s(b);M(()=>p(w,t.unit)),m(_,b)};oe(u,_=>{t.unit&&_(f)})}var h=d(l,2),g=s(h);M(()=>{r=Ge(n,1,"stat-card svelte-1i37zgo",null,r,{accent:t.accent}),p(i,t.value),p(g,t.label)}),m(a,n)}var Oi=E("<option> </option>"),T_=E('<button type="button" class="clear-btn svelte-1ko7jxa"> </button>'),D_=E('<button type="button" class="export-btn svelte-1ko7jxa"><!> </button>'),P_=E('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><option> </option><option> </option><option> </option><option> </option></select> <button type="button"> </button> <button type="button"> </button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <!></div></div>');function Bi(a,t){vt(t,!0);const n=I(mt),r=I(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function o(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var c=P_(),l=s(c),i=s(l),u=s(i),f=s(u);u.value=u.__value="";var h=d(u);Ce(h,17,()=>t.projects,H=>H.id,(H,ie)=>{var ue=Oi(),ke=s(ue),Pe={};M(()=>{p(ke,e(ie).name),Pe!==(Pe=e(ie).id)&&(ue.value=(ue.__value=e(ie).id)??"")}),m(H,ue)});var g;Bt(i);var _=d(i,2),b=s(_),w=s(b);b.value=b.__value="";var x=d(b);Ce(x,17,()=>t.tags,H=>H.id,(H,ie)=>{var ue=Oi(),ke=s(ue),Pe={};M(()=>{p(ke,e(ie).name),Pe!==(Pe=e(ie).id)&&(ue.value=(ue.__value=e(ie).id)??"")}),m(H,ue)});var S;Bt(_);var C=d(_,2),z=s(C),y=s(z);z.value=z.__value="";var q=d(z),T=s(q);q.value=q.__value="high";var N=d(q),L=s(N);N.value=N.__value="medium";var ae=d(N),ne=s(ae);ae.value=ae.__value="low";var re=d(ae),ee=s(re);re.value=re.__value="none";var Q;Bt(C);var se=d(C,2);let B;var R=s(se),ce=d(se,2);let he;var me=s(ce),ye=d(ce,2);{var je=H=>{var ie=T_(),ue=s(ie);M(()=>p(ue,e(n).timer.clearFilter)),G("click",ie,o),m(H,ie)};oe(ye,H=>{e(r)&&H(je)})}var Ze=d(l,2),D=s(Ze),A=s(D),F=d(D,2),Y=d(F,2),fe=s(Y),be=d(Y,2),le=d(be,2);{var pe=H=>{var ie=D_(),ue=s(ie);Gu(ue,{size:14});var ke=d(ue);M(()=>p(ke,` ${e(n).filter.export??""}`)),G("click",ie,function(...Pe){var Fe;(Fe=t.onExport)==null||Fe.apply(this,Pe)}),m(H,ie)};oe(le,H=>{t.onExport&&H(pe)})}M((H,ie)=>{O(i,"title",H),O(i,"aria-label",e(n).filter.projectAria),p(f,e(n).filter.allProject),g!==(g=t.filterProject??"")&&(i.value=(i.__value=t.filterProject??"")??"",At(i,t.filterProject??"")),O(_,"title",ie),O(_,"aria-label",e(n).filter.tagAria),p(w,e(n).filter.allTag),S!==(S=t.filterTag??"")&&(_.value=(_.__value=t.filterTag??"")??"",At(_,t.filterTag??"")),O(C,"aria-label",e(n).filter.priorityAria),p(y,e(n).filter.allPriority),p(T,e(n).priority.high),p(L,e(n).priority.medium),p(ne,e(n).priority.low),p(ee,e(n).priority.none),Q!==(Q=t.filterPriority??"")&&(C.value=(C.__value=t.filterPriority??"")??"",At(C,t.filterPriority??"")),B=Ge(se,1,"preset-btn svelte-1ko7jxa",null,B,{on:t.filterPreset==="week"}),p(R,e(n).filter.week),he=Ge(ce,1,"preset-btn svelte-1ko7jxa",null,he,{on:t.filterPreset==="month"}),p(me,e(n).filter.month),p(A,e(n).filter.dueDate),to(F,t.filterStartDate),O(F,"aria-label",e(n).filter.startDate),p(fe,e(n).filter.to),to(be,t.filterEndDate),O(be,"aria-label",e(n).filter.endDate)},[()=>{var H;return t.filterProject!==null?(H=t.projects.find(ie=>ie.id===t.filterProject))==null?void 0:H.name:e(n).filter.allProject},()=>{var H;return t.filterTag!==null?(H=t.tags.find(ie=>ie.id===t.filterTag))==null?void 0:H.name:e(n).filter.allTag}]),G("change",i,H=>{const ie=H.currentTarget.value;t.setFilterProject(ie||null)}),G("change",_,H=>{const ie=H.currentTarget.value;t.setFilterTag(ie||null)}),G("change",C,H=>{const ie=H.currentTarget.value;t.setFilterPriority(ie||null)}),G("click",se,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),G("click",ce,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),G("change",F,H=>t.setFilterStartDate(H.currentTarget.value)),G("change",be,H=>t.setFilterEndDate(H.currentTarget.value)),m(a,c),ft()}yt(["change","click"]);var M_=E('<button type="button"><!></button>'),E_=E('<div class="error svelte-1vpobhk"> </div>'),Go=E("<option> </option>"),C_=E('<button type="button"> </button>'),N_=E('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk"> </span> <div class="tag-chips svelte-1vpobhk"></div></div>'),j_=E('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk"> </label> <select id="tf-proj" class="svelte-1vpobhk"><option> </option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk"> </label> <select id="tf-pri" class="svelte-1vpobhk"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk"> </label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk"> </label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk"> </label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk"> </label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk"> </button></div></div>'),F_=E('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function A_(a,t){vt(t,!0);const n=I(mt),r=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],o=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],c={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},l={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function i(D){return e(n).enum.reminder[c[D]]}function u(D){return e(n).enum.repeat[l[D]]}let f=I(Va),h=W(""),g=W(Be(Vt(()=>t.defaultProjectId??null))),_=W("medium"),b=W(Be(Vt(()=>t.defaultDueDate||Fa()))),w=W(0),x=W("none"),S=W("none"),C=W(null),z=W(!1),y=W(Be(Vt(()=>t.tags.length>0?[t.tags[0].id]:[]))),q=W(!1),T=W(""),N=W(!1);St(()=>{v(g,t.defaultProjectId??null,!0)}),St(()=>{v(b,t.defaultDueDate||Fa(),!0)}),St(()=>{t.tags.length>0&&e(y).length===0&&v(y,[t.tags[0].id],!0)});async function L(){const D=e(h).trim();if(!D){v(T,e(n).form.needTitle,!0);return}let A=e(b)||Fa();if(e(x)!=="none"&&!io(A)){if(!e(N)){v(N,!0),v(T,e(n).form.needTimeForReminder,!0);return}A=bs(A)}v(N,!1),v(T,"");try{await t.onAdd({title:D,project_id:e(g),priority:e(_),due_date:A,estimated_pomodoros:e(w)>0?e(w):1,pomodoro_duration:e(f).focusDuration,reminder:e(x)==="none"?null:e(x),repeat:e(S)==="none"?null:e(S),repeat_config:e(S)==="custom"?e(C):null,tag_ids:e(y)}),v(h,""),v(g,t.defaultProjectId??null,!0),v(_,"medium"),v(b,t.defaultDueDate||Fa(),!0),v(w,0),v(x,"none"),v(N,!1),v(S,"none"),v(C,null),v(y,t.tags.length>0?[t.tags[0].id]:[],!0),v(q,!1)}catch(F){v(T,String(F),!0)}}function ae(D){D.preventDefault(),L()}function ne(){e(q)||io(e(b))||v(b,bs(e(b)),!0),v(q,!e(q))}var re=F_(),ee=s(re),Q=s(ee);Wn(Q,{size:16,class:"plus-icon"});var se=d(Q,2),B=d(se,2);Ce(B,20,()=>Array.from({length:6},(D,A)=>A+1),Ha,(D,A)=>{const F=I(()=>e(w)>=A);var Y=M_();let fe;var be=s(Y);Pc(be,{size:14,get filled(){return e(F)}}),M(()=>{fe=Ge(Y,1,"tomato-btn svelte-1vpobhk",null,fe,{filled:e(F)}),O(Y,"aria-label",`${A} ${e(n).form.pomodoroUnit}`),O(Y,"aria-pressed",e(F))}),G("click",Y,()=>v(w,A,!0)),m(D,Y)});var R=d(B,2),ce=s(R),he=d(ee,2);{var me=D=>{var A=E_(),F=s(A);M(()=>p(F,e(T))),m(D,A)};oe(he,D=>{e(T)&&D(me)})}var ye=d(he,2);{var je=D=>{var A=j_(),F=s(A),Y=s(F),fe=s(Y),be=d(Y,2),le=s(be),pe=s(le);le.value=le.__value="";var H=d(le);Ce(H,17,()=>Cc(t.projects),Ye=>Ye.id,(Ye,gt)=>{var dt=Go(),Ht=s(dt),Ct={};M(Oe=>{dt.disabled=e(gt).disabled,p(Ht,`${Oe??""}${e(gt).name??""}`),Ct!==(Ct=e(gt).id)&&(dt.value=(dt.__value=e(gt).id)??"")},[()=>"　".repeat(e(gt).depth)]),m(Ye,dt)});var ie;Bt(be);var ue=d(F,2),ke=s(ue),Pe=s(ke),Fe=d(ke,2),ze=s(Fe),U=s(ze);ze.value=ze.__value="high";var ve=d(ze),we=s(ve);ve.value=ve.__value="medium";var Z=d(ve),k=s(Z);Z.value=Z.__value="low";var P=d(Z),J=s(P);P.value=P.__value="none";var K;Bt(Fe);var $=d(ue,2),V=s($),X=s(V),De=d(V,2),Se=d($,2),Ue=s(Se),pt=s(Ue),lt=d(Ue,2),ct=d(Se,2),et=s(ct),He=s(et),ge=d(et,2);Ce(ge,21,()=>r,Ye=>Ye.value,(Ye,gt)=>{var dt=Go(),Ht=s(dt),Ct={};M(Oe=>{p(Ht,Oe),Ct!==(Ct=e(gt).value)&&(dt.value=(dt.__value=e(gt).value)??"")},[()=>i(e(gt).value)]),m(Ye,dt)});var _e=d(ct,2),tt=s(_e),at=s(tt),ht=d(tt,2);Ce(ht,21,()=>o,Ye=>Ye.value,(Ye,gt)=>{var dt=Go(),Ht=s(dt),Ct={};M(Oe=>{p(Ht,Oe),Ct!==(Ct=e(gt).value)&&(dt.value=(dt.__value=e(gt).value)??"")},[()=>u(e(gt).value)]),m(Ye,dt)});var rt=d(_e,2);{var Pt=Ye=>{var gt=N_(),dt=s(gt),Ht=s(dt),Ct=d(dt,2);Ce(Ct,21,()=>t.tags,Oe=>Oe.id,(Oe,Ae)=>{const it=I(()=>e(y).includes(e(Ae).id));var te=C_();let Te;var Re=s(te);M(()=>{Te=Ge(te,1,"chip svelte-1vpobhk",null,Te,{on:e(it)}),O(te,"aria-pressed",e(it)),p(Re,e(Ae).name)}),G("click",te,()=>v(y,e(it)?e(y).filter(We=>We!==e(Ae).id):[...e(y),e(Ae).id],!0)),m(Oe,te)}),M(()=>p(Ht,e(n).filter.tag)),m(Ye,gt)};oe(rt,Ye=>{t.tags.length>0&&Ye(Pt)})}var jt=d(rt,2),Lt=s(jt),zt=s(Lt);M(()=>{p(fe,e(n).filter.project),p(pe,e(n).task.detailNoProject),ie!==(ie=e(g)??"")&&(be.value=(be.__value=e(g)??"")??"",At(be,e(g)??"")),p(Pe,e(n).filter.priority),p(U,e(n).priority.high),p(we,e(n).priority.medium),p(k,e(n).priority.low),p(J,e(n).priority.none),K!==(K=e(_))&&(Fe.value=(Fe.__value=e(_))??"",At(Fe,e(_))),p(X,e(n).filter.dueDate),p(pt,e(n).form.estimatedPomo),p(He,e(n).task.detailReminder),p(at,e(n).task.detailRepeat),p(zt,e(n).form.submit)}),G("change",be,Ye=>{const gt=Ye.currentTarget.value;v(g,gt||null,!0)}),G("change",Fe,Ye=>{v(_,Ye.currentTarget.value,!0)}),G("input",De,Ye=>{Ye.currentTarget.value.length===16&&Ye.currentTarget.blur()}),wt(De,()=>e(b),Ye=>v(b,Ye)),wt(lt,()=>e(w),Ye=>v(w,Ye)),G("change",ge,()=>v(N,!1)),eo(ge,()=>e(x),Ye=>v(x,Ye)),G("change",ht,Ye=>{Ye.currentTarget.value==="custom"?v(z,!0):v(C,null)}),eo(ht,()=>e(S),Ye=>v(S,Ye)),G("click",Lt,L),m(D,A)};oe(ye,D=>{e(q)&&D(je)})}var Ze=d(ye,2);Nc(Ze,{get open(){return e(z)},get initialConfig(){return e(C)},onConfirm:D=>{v(C,D,!0),v(z,!1)},onClose:()=>v(z,!1)}),M(()=>{O(se,"placeholder",e(n).form.titlePlaceholder),O(B,"aria-label",e(n).form.pomodoroIcons),p(ce,e(q)?e(n).form.collapse:e(n).form.more)}),kt("submit",re,ae),wt(se,()=>e(h),D=>v(h,D)),G("click",R,ne),m(a,re),ft()}yt(["click","change","input"]);var I_=E('<button type="button"><!></button>');function q_(a,t){vt(t,!0);const n=I(mt);var r=I_();let o;var c=s(r);{var l=i=>{za(i,{size:10,strokeWidth:3,color:"#fff"})};oe(c,i=>{t.completed&&i(l)})}M(()=>{o=Ge(r,1,"checkbox svelte-1bxwwxl",null,o,{completed:t.completed}),O(r,"aria-label",t.completed?e(n).common.ariaCompleted:e(n).common.ariaMarkDone)}),G("click",r,i=>{i.stopPropagation(),t.onToggle()}),m(a,r),ft()}yt(["click"]);var zi=E("<option> </option>"),R_=E('<div class="no-task svelte-tr144z"> </div>'),L_=E('<div class="task-row svelte-tr144z"><!> <span> </span></div>'),O_=E('<div class="day-cell svelte-tr144z"><div> </div> <!> <div class="day-divider svelte-tr144z"></div> <!></div>'),B_=E('<section class="week-card svelte-tr144z"><div class="week-title svelte-tr144z"> </div> <div class="day-grid svelte-tr144z"></div> <div class="weekly-block svelte-tr144z"><div class="weekly-label svelte-tr144z"> </div> <!></div></section>'),z_=E('<div class="journal svelte-tr144z"><div class="inner svelte-tr144z"><div class="head svelte-tr144z"><h1 class="title svelte-tr144z"> </h1> <div class="month-nav svelte-tr144z"><button type="button" class="nav-btn svelte-tr144z"><!></button> <select class="select svelte-tr144z"></select> <select class="select svelte-tr144z"></select> <button type="button" class="nav-btn svelte-tr144z"><!></button></div></div> <div class="weeks svelte-tr144z"></div></div></div>');function H_(a,t){vt(t,!0);const n=I(mt),r=Array.from({length:61},(D,A)=>2026+A),o=Array.from({length:12},(D,A)=>A+1);let c=W(Be([])),l=W(Be([]));function i(D){return String(D).padStart(2,"0")}function u(D){return`${D.getFullYear()}-${i(D.getMonth()+1)}-${i(D.getDate())}`}function f(D,A){const F=[],Y=new Date(D,A-1,1);for(;Y.getDay()!==1;)Y.setDate(Y.getDate()+1);for(;Y.getMonth()===A-1;)F.push(new Date(Y)),Y.setDate(Y.getDate()+7);return F}async function h(D,A){const F=u(new Date(D,A-1,1)),Y=u(new Date(D,A,0));try{const[fe,be]=await Promise.all([pc(D,A),Iv(F,Y)]);if(D!==t.year||A!==t.month)return;v(c,fe,!0),v(l,be,!0)}catch(fe){console.warn("journal load reviews failed",fe)}}St(()=>{const D=t.year,A=t.month;h(D,A)});const g=I(()=>{const D=e(n).journal.weekday;return f(t.year,t.month).map((A,F)=>{const Y=Array.from({length:7},(le,pe)=>{const H=new Date(A);return H.setDate(H.getDate()+pe),H}),fe=Y[6],be=Y.map((le,pe)=>({iso:u(le),label:`${D[pe]} ${le.getMonth()+1}/${le.getDate()}`}));return{startISO:u(A),title:Nt(e(n).journal.weekRange,{n:F+1,ms:A.getMonth()+1,ds:A.getDate(),me:fe.getMonth()+1,de:fe.getDate()}),days:be}})});function _(D){return D===u(new Date)}const b=I(()=>{const D=new Map;for(const A of t.tasks){const F=Jt(A.due_date);F&&(D.has(F)||D.set(F,[]),D.get(F).push(A))}return D}),w=I(()=>new Map(e(c).map(D=>[D.week_start,D]))),x=I(()=>new Map(e(l).map(D=>[D.date,D])));function S(){t.month===1?(t.onMonthChange(12),t.onYearChange(t.year-1)):t.onMonthChange(t.month-1)}function C(){t.month===12?(t.onMonthChange(1),t.onYearChange(t.year+1)):t.onMonthChange(t.month+1)}async function z(D){var A;try{D.status==="active"?await dc(D.id):await uc(D.id),(A=t.onTasksChange)==null||A.call(t)}catch(F){console.warn("journal toggle task failed",F)}}async function y(D,A){try{const F=e(x).get(D),Y=F?{...F,content:A}:{id:crypto.randomUUID(),date:D,content:A,updated_at:new Date().toISOString()};await hc(Y),await h(t.year,t.month)}catch(F){console.warn("journal save daily review failed",F)}}async function q(D){try{await _c(D),await h(t.year,t.month)}catch(A){console.warn("journal delete daily review failed",A)}}async function T(D,A){var F;try{const Y=e(w).get(D),fe=Y?{...Y,content:A}:{id:crypto.randomUUID(),week_start:D,content:A,updated_at:new Date().toISOString()};await qv(fe),await h(t.year,t.month),(F=t.onReviewChange)==null||F.call(t)}catch(Y){console.warn("journal save weekly review failed",Y)}}async function N(D){var A;try{await Rv(D),await h(t.year,t.month),(A=t.onReviewChange)==null||A.call(t)}catch(F){console.warn("journal delete weekly review failed",F)}}var L=z_(),ae=s(L),ne=s(ae),re=s(ne),ee=s(re),Q=d(re,2),se=s(Q),B=s(se);Yu(B,{size:16});var R=d(se,2);Ce(R,20,()=>r,D=>D,(D,A)=>{var F=zi(),Y=s(F),fe={};M(be=>{p(Y,be),fe!==(fe=A)&&(F.value=(F.__value=A)??"")},[()=>Nt(e(n).journal.yearOption,{year:A})]),m(D,F)});var ce;Bt(R);var he=d(R,2);Ce(he,20,()=>o,D=>D,(D,A)=>{var F=zi(),Y=s(F),fe={};M(be=>{p(Y,be),fe!==(fe=A)&&(F.value=(F.__value=A)??"")},[()=>Nt(e(n).journal.monthOption,{month:A})]),m(D,F)});var me;Bt(he);var ye=d(he,2),je=s(ye);Un(je,{size:16});var Ze=d(ne,2);Ce(Ze,21,()=>e(g),D=>D.startISO,(D,A)=>{var F=B_(),Y=s(F),fe=s(Y),be=d(Y,2);Ce(be,21,()=>e(A).days,ue=>ue.iso,(ue,ke)=>{var Pe=O_(),Fe=s(Pe);let ze;var U=s(Fe),ve=d(Fe,2);{var we=J=>{var K=R_(),$=s(K);M(()=>p($,e(n).common.noData)),m(J,K)},Z=I(()=>(e(b).get(e(ke).iso)??[]).length===0),k=J=>{var K=Le(),$=Ne(K);Ce($,17,()=>e(b).get(e(ke).iso)??[],V=>V.id,(V,X,De,Se)=>{var Ue=L_(),pt=s(Ue);{let He=I(()=>e(X).status==="completed");q_(pt,{get completed(){return e(He)},onToggle:()=>z(e(X))})}var lt=d(pt,2);let ct;var et=s(lt);M(()=>{ct=Ge(lt,1,"task-title svelte-tr144z",null,ct,{done:e(X).status==="completed"}),p(et,e(X).title)}),m(V,Ue)}),m(J,K)};oe(ve,J=>{e(Z)?J(we):J(k,-1)})}var P=d(ve,4);{let J=I(()=>{var K;return((K=e(x).get(e(ke).iso))==null?void 0:K.content)??null});so(P,{get value(){return e(J)},get placeholder(){return e(n).journal.dailyReviewPlaceholder},rows:2,onSave:K=>y(e(ke).iso,K),onDelete:()=>q(e(ke).iso)})}M(J=>{ze=Ge(Fe,1,"day-head svelte-tr144z",null,ze,J),p(U,e(ke).label)},[()=>({today:_(e(ke).iso)})]),m(ue,Pe)});var le=d(be,2),pe=s(le),H=s(pe),ie=d(pe,2);{let ue=I(()=>{var ke;return((ke=e(w).get(e(A).startISO))==null?void 0:ke.content)??null});so(ie,{get value(){return e(ue)},get placeholder(){return e(n).journal.weeklyReviewPlaceholder},rows:5,onSave:ke=>T(e(A).startISO,ke),onDelete:()=>N(e(A).startISO)})}M(()=>{p(fe,e(A).title),p(H,e(n).journal.weeklyReview)}),m(D,F)}),M(D=>{p(ee,D),O(se,"title",e(n).journal.prevMonth),O(se,"aria-label",e(n).journal.prevMonth),O(R,"aria-label",e(n).journal.yearAria),ce!==(ce=t.year)&&(R.value=(R.__value=t.year)??"",At(R,t.year)),O(he,"aria-label",e(n).journal.monthAria),me!==(me=t.month)&&(he.value=(he.__value=t.month)??"",At(he,t.month)),O(ye,"title",e(n).journal.nextMonth),O(ye,"aria-label",e(n).journal.nextMonth)},[()=>Nt(e(n).journal.monthTitle,{year:t.year,month:t.month})]),G("click",se,S),G("change",R,D=>t.onYearChange(Number(D.currentTarget.value))),G("change",he,D=>t.onMonthChange(Number(D.currentTarget.value))),G("click",ye,C),m(a,L),ft()}yt(["click","change"]);var U_=E('<div class="empty svelte-w363gh"> </div>'),W_=E('<div class="week-card svelte-w363gh"><div class="week-head svelte-w363gh"> </div> <div class="week-content svelte-w363gh"> </div></div>'),Y_=E('<div class="week-list svelte-w363gh"></div>'),G_=E('<aside class="panel svelte-w363gh"><h2 class="title svelte-w363gh"> </h2> <div class="weekly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div> <div class="monthly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div></aside>');function V_(a,t){vt(t,!0);const n=I(mt);let r=W(Be([])),o=W(null);function c(L){return String(L).padStart(2,"0")}async function l(L,ae){try{const[ne,re]=await Promise.all([pc(L,ae),Lv(`${L}-${c(ae)}`)]);if(L!==t.year||ae!==t.month)return;v(r,ne,!0),v(o,re,!0)}catch(ne){console.warn("month panel load failed",ne)}}St(()=>{const L=t.year,ae=t.month;t.reviewVersion,l(L,ae)});const i=I(()=>[...e(r)].sort((L,ae)=>L.week_start.localeCompare(ae.week_start)));async function u(L){try{const ae=`${t.year}-${c(t.month)}`,ne=e(o)?{...e(o),content:L}:{id:crypto.randomUUID(),year_month:ae,content:L,updated_at:new Date().toISOString()};await Ov(ne),await l(t.year,t.month)}catch(ae){console.warn("month panel save failed",ae)}}async function f(){try{await Bv(`${t.year}-${c(t.month)}`),await l(t.year,t.month)}catch(L){console.warn("month panel delete failed",L)}}var h=G_(),g=s(h),_=s(g),b=d(g,2),w=s(b),x=s(w),S=d(w,2);{var C=L=>{var ae=U_(),ne=s(ae);M(()=>p(ne,e(n).monthPanel.noWeekly)),m(L,ae)},z=L=>{var ae=Y_();Ce(ae,23,()=>e(i),ne=>ne.week_start,(ne,re,ee)=>{var Q=W_(),se=s(Q),B=s(se),R=d(se,2),ce=s(R);M((he,me)=>{p(B,he),p(ce,me)},[()=>Nt(e(n).monthPanel.weekRange,{n:e(ee)+1,date:e(re).week_start}),()=>{var he;return(he=e(re).content)!=null&&he.trim()?e(re).content:e(n).monthPanel.empty}]),m(ne,Q)}),m(L,ae)};oe(S,L=>{e(i).length===0?L(C):L(z,-1)})}var y=d(b,2),q=s(y),T=s(q),N=d(q,2);{let L=I(()=>{var ae;return((ae=e(o))==null?void 0:ae.content)??null});so(N,{get value(){return e(L)},get placeholder(){return e(n).monthPanel.monthlyPlaceholder},rows:6,onSave:u,onDelete:f})}M((L,ae)=>{O(h,"aria-label",L),p(_,ae),p(x,e(n).monthPanel.weeklyReadonly),p(T,e(n).monthPanel.monthlyReview)},[()=>Nt(e(n).monthPanel.title,{year:t.year,month:t.month}),()=>Nt(e(n).monthPanel.title,{year:t.year,month:t.month})]),m(a,h),ft()}var K_=E('<h1 class="title svelte-969q1d"> </h1>'),$_=E('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),J_=E('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),Q_=E('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),X_=E('<p class="loading svelte-969q1d"> </p>'),Z_=E('<p class="empty svelte-969q1d"><!></p>'),ep=E('<div class="task-list svelte-969q1d"></div>'),tp=E('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),ap=E('<div class="page page-veil svelte-969q1d"><!> <div class="main svelte-969q1d"><!></div> <!></div>');function np(a,t){vt(t,!0);let n=W(Be([])),r=W(Be([])),o=W(Be([])),c=W(!0),l=W(null);const i=I(mt);let u=W(null),f=W("today"),h=W(""),g=W(null),_=W(Be(new Date().getFullYear())),b=W(new Date().getMonth()+1),w=W(0),x=W(null),S=W(null),C=W(null),z=W(null),y=W(""),q=W(""),T=W(null),N=W(null),L=W(null),ae=W(null),ne=W(""),re=W("");const ee=I(()=>{let U=[...e(n)];const ve={high:0,medium:1,low:2,none:3};if(e(h).trim()){const V=e(h).trim().toLowerCase();return U=U.filter(X=>X.title.toLowerCase().includes(V)),U.sort((X,De)=>{if(X.status!==De.status)return X.status==="active"?-1:1;const Se=ve[X.priority||"none"]??3,Ue=ve[De.priority||"none"]??3;return Se!==Ue?Se-Ue:new Date(X.created_at??0).getTime()-new Date(De.created_at??0).getTime()}),U}const we=Fa(),Z=Vr(),k=new Date,P=k.getDay(),J=P===0?6:P-1,K=new Date(k);K.setDate(K.getDate()-J),K.setHours(0,0,0,0);const $=new Date(K);return $.setDate($.getDate()+6),$.setHours(23,59,59,999),e(u)!==null?U=U.filter(V=>V.project_id===e(u)):e(f)==="today"?U=U.filter(V=>Jt(V.due_date)===we):e(f)==="tomorrow"?U=U.filter(V=>Jt(V.due_date)===Z):e(f)==="week"?U=U.filter(V=>{if(!V.due_date)return!1;const X=new Date(V.due_date);return X>=K&&X<=$}):e(f)==="planned"?U=Q(U,{project:e(x),tag:e(S),priority:e(C),preset:e(z),startDate:e(y),endDate:e(q)}):e(f)==="completed"?(U=U.filter(V=>V.status==="completed"),U=Q(U,{project:e(T),tag:e(N),priority:e(L),preset:e(ae),startDate:e(ne),endDate:e(re)})):e(f)==="journal"&&(U=U.filter(V=>!!V.due_date)),U.sort((V,X)=>{if(V.status!==X.status)return V.status==="active"?-1:1;const De=ve[V.priority||"none"]??3,Se=ve[X.priority||"none"]??3;return De!==Se?De-Se:new Date(V.created_at??0).getTime()-new Date(X.created_at??0).getTime()}),U});function Q(U,ve){let we=U;if(ve.project!==null&&(we=we.filter(Z=>Z.project_id===ve.project)),ve.tag!==null&&(we=we.filter(Z=>(Z.tags??[]).some(k=>k.id===ve.tag))),ve.priority!==null&&(we=we.filter(Z=>Z.priority===ve.priority)),ve.preset==="week"){const Z=new Date,k=Z.getDay(),P=k===0?6:k-1,J=new Date(Z);J.setDate(Z.getDate()-P);const K=new Date(J);K.setDate(J.getDate()+6);const $=Jt(J.toISOString()),V=Jt(K.toISOString());we=we.filter(X=>{const De=Jt(X.due_date);return!!De&&De>=$&&De<=V})}if(ve.preset==="month"){const Z=new Date,k=`${Z.getFullYear()}-${String(Z.getMonth()+1).padStart(2,"0")}-01`,P=new Date(Z.getFullYear(),Z.getMonth()+1,0),J=Jt(P.toISOString());we=we.filter(K=>{const $=Jt(K.due_date);return!!$&&$>=k&&$<=J})}return ve.startDate&&(we=we.filter(Z=>{const k=Jt(Z.due_date);return!!k&&k>=ve.startDate})),ve.endDate&&(we=we.filter(Z=>{const k=Jt(Z.due_date);return!!k&&k<=ve.endDate})),we}const se=I(()=>{const U=e(ee).filter(P=>P.status==="active").reduce((P,J)=>P+(J.estimated_pomodoros||0)*(J.pomodoro_duration||25),0),ve=e(ee).filter(P=>P.status==="active").length,we=e(ee).reduce((P,J)=>P+(J.completed_pomodoros||0)*(J.pomodoro_duration||25),0),Z=e(ee).reduce((P,J)=>P+(J.completed_pomodoros||0),0),k=e(ee).filter(P=>P.status==="completed").length;return{estimatedMinutes:U,activeCount:ve,focusedMinutes:we,completedCount:k,completedPomodoros:Z}}),B=I(()=>{if(e(h).trim())return`${e(i).task.searchResult} (${e(ee).length})`;if(e(u)!==null){const ve=e(r).find(we=>we.id===e(u));return(ve==null?void 0:ve.name)||e(i).task.list}return{today:e(i).filter.today,tomorrow:e(i).filter.tomorrow,week:e(i).filter.week,planned:e(i).sidebar.planned,completed:e(i).sidebar.completed,journal:e(i).sidebar.journal,"":e(i).task.task}[e(f)]||e(i).task.task});async function R(){try{const[U,ve,we]=await Promise.all([Sn({}),Os(),Bs()]);if(v(n,U.map(Z=>({...Z,tags:Z.tags??[]})),!0),v(r,ve,!0),v(o,we,!0),e(g)){const Z=e(n).find(k=>k.id===e(g).id);v(g,Z??null,!0)}Cf()}catch(U){v(l,String(U),!0)}finally{v(c,!1)}}rn(R);function ce(){return new Date().toISOString()}function he(){return crypto.randomUUID()}async function me(U){const ve=typeof U=="string"?U:U.id,we=typeof U=="string"?e(n).find(Z=>Z.id===ve):U;if(we)try{we.status==="active"?await dc(ve):await uc(ve),await R()}catch(Z){v(l,String(Z),!0)}}async function ye(U,ve=null){try{await no({id:he(),name:U,color:"#c97b6e",parent_id:ve??null,created_at:ce(),updated_at:ce()}),await R()}catch(we){v(l,String(we),!0)}}async function je(U,ve){try{const we=e(r).find(Z=>Z.id===U);if(!we)return;await no({...we,name:ve,updated_at:ce()}),await R()}catch(we){v(l,String(we),!0)}}async function Ze(U){if(confirm(e(i).sidebar.deleteListConfirm))try{await vc(U),e(u)===U&&v(u,null),await R()}catch(ve){v(l,String(ve),!0)}}function D(U){v(g,U,!0)}function A(){v(g,null)}function F(){R()}async function Y(U){try{await ff(U),ac("/timer")}catch(ve){v(l,String(ve),!0)}}async function fe(U){const ve=U.due_date??(e(f)==="tomorrow"?Vr():Fa());try{const we=he();await fs({id:we,title:U.title,description:"",project_id:U.project_id??e(u),priority:U.priority,status:"active",due_date:ys(io(ve)?ve:`${ve}T00:00:00`),estimated_pomodoros:U.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:U.pomodoro_duration,reminder:U.reminder??"none",repeat:U.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:U.repeat_config??null,completed_at:null,created_at:ce(),updated_at:ce()},U.tag_ids),await R()}catch(we){v(l,String(we),!0)}}async function be(){try{const U=await Eh({defaultPath:`${e(i).export.fileName}_${Fa()}.xlsx`,filters:[{name:"xlsx",extensions:["xlsx"]}]});if(!U)return;const ve=[e(i).export.index,e(i).export.title,e(i).export.project,e(i).export.priority,e(i).export.dueDate,e(i).export.estimated,e(i).export.tags,e(i).export.subtasks,e(i).export.status],we=e(ee).map(Z=>{var k;return{title:Z.title,project:((k=e(r).find(P=>P.id===Z.project_id))==null?void 0:k.name)??"",priority:e(i).priority[Z.priority??"none"]??Z.priority??"",dueDate:Z.due_date?Z.due_date.slice(0,10):"",estimated:Z.estimated_pomodoros??0,tags:(Z.tags??[]).map(P=>P.name).join(", "),subtasks:(Z.subtasks??[]).map(P=>P.title).join(`
`),status:Z.status==="completed"?e(i).export.statusCompleted:e(i).export.statusActive}});await Vv(U,e(i).nav.tasks,ve,we)}catch(U){v(l,String(U),!0)}}var le=ap();Nr("969q1d",U=>{Mr(()=>{Jn.title=e(i).page.tasks??""})});var pe=s(le);Gh(pe,{get projects(){return e(r)},get filter(){return e(f)},get selectedProject(){return e(u)},onSetFilter:U=>{v(f,U,!0),v(h,"")},onSelectProject:U=>{v(u,U,!0),v(h,"")},onCreateProject:ye,onUpdateProject:je,onDeleteProject:Ze,get search(){return e(h)},onSearchChange:U=>{v(h,U,!0),U.trim()&&(v(u,null),v(f,""))},get tasks(){return e(n)}});var H=d(pe,2),ie=s(H);{var ue=U=>{H_(U,{get year(){return e(_)},get month(){return e(b)},get tasks(){return e(ee)},onYearChange:ve=>v(_,ve,!0),onMonthChange:ve=>v(b,ve,!0),onReviewChange:()=>v(w,e(w)+1),onTasksChange:()=>void R()})},ke=U=>{var ve=tp(),we=s(ve);{var Z=ge=>{var _e=K_(),tt=s(_e);M(()=>p(tt,e(B))),m(ge,_e)};oe(we,ge=>{e(B)&&ge(Z)})}var k=d(we,2);{var P=ge=>{var _e=$_(),tt=s(_e);Wt(tt,{get icon(){return gr},get label(){return e(i).task.statFocused},get value(){return e(se).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var at=d(tt,2);Wt(at,{get icon(){return vs},get label(){return e(i).task.statCompletedPomo},get value(){return e(se).completedPomodoros},get unit(){return e(i).stats.unitCount},accent:!0});var ht=d(at,2);Wt(ht,{get icon(){return us},get label(){return e(i).task.statCompleted},get value(){return e(se).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),m(ge,_e)},J=ge=>{var _e=J_(),tt=s(_e);Wt(tt,{get icon(){return gr},get label(){return e(i).task.statEstimated},get value(){return e(se).estimatedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var at=d(tt,2);Wt(at,{get icon(){return vs},get label(){return e(i).task.statActive},get value(){return e(se).activeCount},get unit(){return e(i).stats.unitCount},accent:!0});var ht=d(at,2);Wt(ht,{get icon(){return qs},get label(){return e(i).task.statFocused},get value(){return e(se).focusedMinutes},get unit(){return e(i).stats.unitMin},accent:!0});var rt=d(ht,2);Wt(rt,{get icon(){return us},get label(){return e(i).task.statCompleted},get value(){return e(se).completedCount},get unit(){return e(i).stats.unitCount},accent:!0}),m(ge,_e)};oe(k,ge=>{e(f)==="completed"?ge(P):ge(J,-1)})}var K=d(k,2);{var $=ge=>{Bi(ge,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(T)},setFilterProject:_e=>v(T,_e,!0),get filterTag(){return e(N)},setFilterTag:_e=>v(N,_e,!0),get filterPriority(){return e(L)},setFilterPriority:_e=>v(L,_e,!0),get filterPreset(){return e(ae)},setFilterPreset:_e=>v(ae,_e,!0),get filterStartDate(){return e(ne)},setFilterStartDate:_e=>v(ne,_e,!0),get filterEndDate(){return e(re)},setFilterEndDate:_e=>v(re,_e,!0)})},V=ge=>{Bi(ge,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(x)},setFilterProject:_e=>v(x,_e,!0),get filterTag(){return e(S)},setFilterTag:_e=>v(S,_e,!0),get filterPriority(){return e(C)},setFilterPriority:_e=>v(C,_e,!0),get filterPreset(){return e(z)},setFilterPreset:_e=>v(z,_e,!0),get filterStartDate(){return e(y)},setFilterStartDate:_e=>v(y,_e,!0),get filterEndDate(){return e(q)},setFilterEndDate:_e=>v(q,_e,!0),onExport:be})};oe(K,ge=>{e(f)==="completed"?ge($):e(f)==="planned"&&ge(V,1)})}var X=d(K,2);{var De=ge=>{{let _e=I(()=>e(f)==="tomorrow"?Vr():Fa());A_(ge,{get projects(){return e(r)},get tags(){return e(o)},get defaultProjectId(){return e(u)},get defaultDueDate(){return e(_e)},onAdd:fe})}};oe(X,ge=>{e(f)!=="completed"&&ge(De)})}var Se=d(X,2);{var Ue=ge=>{var _e=Q_(),tt=s(_e),at=s(tt),ht=d(tt,2);M(()=>p(at,`⚠ ${e(l)??""}`)),G("click",ht,()=>v(l,null)),m(ge,_e)};oe(Se,ge=>{e(l)&&ge(Ue)})}var pt=d(Se,2);{var lt=ge=>{var _e=X_(),tt=s(_e);M(()=>p(tt,e(i).common.loading)),m(ge,_e)},ct=ge=>{var _e=Z_(),tt=s(_e);{var at=rt=>{var Pt=ii();M(()=>p(Pt,e(i).task.emptyAll)),m(rt,Pt)},ht=rt=>{var Pt=ii();M(()=>p(Pt,e(i).task.emptyFiltered)),m(rt,Pt)};oe(tt,rt=>{e(n).length===0?rt(at):rt(ht,-1)})}m(ge,_e)},et=ge=>{w_(ge,{get tasks(){return e(ee)},groupBy:"due_date",get selectedTask(){return e(g)},onToggle:me,onSelect:D,onStart:Y})},He=ge=>{var _e=ep();Ce(_e,21,()=>e(ee),tt=>tt.id,(tt,at)=>{{let ht=I(()=>{var rt;return((rt=e(g))==null?void 0:rt.id)===e(at).id});Ec(tt,{get task(){return e(at)},get selected(){return e(ht)},onToggle:()=>me(e(at)),onSelect:D,onStart:Y})}}),m(ge,_e)};oe(pt,ge=>{e(c)?ge(lt):e(ee).length===0?ge(ct,1):e(f)==="week"||e(f)==="planned"||e(f)==="completed"?ge(et,2):ge(He,-1)})}m(U,ve)};oe(ie,U=>{e(f)==="journal"?U(ue):U(ke,-1)})}var Pe=d(H,2);{var Fe=U=>{V_(U,{get year(){return e(_)},get month(){return e(b)},get reviewVersion(){return e(w)}})},ze=U=>{m_(U,{get task(){return e(g)},get projects(){return e(r)},get allTags(){return e(o)},onClose:A,onChanged:F})};oe(Pe,U=>{e(f)==="journal"?U(Fe):e(g)&&U(ze,1)})}m(a,le),ft()}yt(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
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
const rp=[{key:"today",group:"day"},{key:"week",group:"day"},{key:"month",group:"day"},{key:"quarter",group:"week"},{key:"halfyear",group:"month"},{key:"year",group:"month"}];function Hi(a){return String(a).padStart(2,"0")}function Tt(a){return`${a.getFullYear()}-${Hi(a.getMonth()+1)}-${Hi(a.getDate())}`}function Vo(a,t){return Math.round((t.getTime()-a.getTime())/864e5)+1}function Ui(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today")return{start:Tt(n),end:Tt(n),days:1,group:"day"};if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Tt(i),end:Tt(u),days:7,group:"day"}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth(),1),u=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:Tt(i),end:Tt(u),days:u.getDate(),group:"day"}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),i*3,1),f=new Date(n.getFullYear(),i*3+3,0);return{start:Tt(u),end:Tt(f),days:Vo(u,f),group:"week"}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i,1),f=new Date(n.getFullYear(),i+6,0);return{start:Tt(u),end:Tt(f),days:Vo(u,f),group:"month"}}const c=new Date(n.getFullYear(),0,1),l=new Date(n.getFullYear(),11,31);return{start:Tt(c),end:Tt(l),days:Vo(c,l),group:"month"}}function op(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today"){const i=new Date(n);return i.setDate(n.getDate()-1),{start:Tt(i),end:Tt(i)}}if(a==="week"){const i=new Date(n);i.setDate(n.getDate()+o-7);const u=new Date(i);return u.setDate(i.getDate()+6),{start:Tt(i),end:Tt(u)}}if(a==="month"){const i=new Date(n.getFullYear(),n.getMonth()-1,1),u=new Date(n.getFullYear(),n.getMonth(),0);return{start:Tt(i),end:Tt(u)}}if(a==="quarter"){const i=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),(i-1)*3,1),f=new Date(n.getFullYear(),i*3,0);return{start:Tt(u),end:Tt(f)}}if(a==="halfyear"){const i=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),i-6,1),f=new Date(n.getFullYear(),i,0);return{start:Tt(u),end:Tt(f)}}const c=new Date(n.getFullYear()-1,0,1),l=new Date(n.getFullYear()-1,11,31);return{start:Tt(c),end:Tt(l)}}function jc(a,t){return t==="month"?`${Number(a.slice(5,7))}`:`${Number(a.slice(5,7))}/${Number(a.slice(8,10))}`}function sp(a,t=new Date){return Tt(t)}var ip=E('<div class="empty svelte-1ixrxd8"> </div>'),lp=Tn('<text class="tick svelte-1ixrxd8" text-anchor="end"> </text>'),cp=Tn('<line class="grid svelte-1ixrxd8"></line><!>',1),dp=Tn('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),up=Tn('<rect rx="3"></rect><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),vp=E('<div class="tooltip svelte-1ixrxd8"> </div>'),fp=E('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" class="svelte-1ixrxd8"><!><!></svg> <!></div>');function hp(a,t){vt(t,!0);const n=I(mt),r=600,o=240,c={top:14,right:8,bottom:26,left:42},l=r-c.left-c.right,i=o-c.top-c.bottom,u=2,f=10,h=34;let g=W(null);function _(q){if(q<=0)return 0;const T=Math.pow(10,Math.floor(Math.log10(q))),N=q/T;return(N<=1?1:N<=2?2:N<=5?5:10)*T}function b(q,T){return jc(q,T)}const w=I(()=>{const q=t.data.length,T=t.data.reduce((se,B)=>Math.max(se,B.minutes),0),N=_(T),L=q>0?l/q:l,ae=Math.min(L*.62,h),ne=Math.max(1,Math.ceil(q/f)),re=t.group==="day"?sp():null,ee=t.data.map((se,B)=>{const R=se.minutes>0&&N>0?Math.max(u,se.minutes/N*i):u,ce=c.left+L*B+(L-ae)/2;return{i:B,key:se.key,minutes:se.minutes,x:ce,y:c.top+i-R,w:ae,h:R,hitX:c.left+L*B,hitW:L,label:b(se.key,t.group),showLabel:B%ne===0||B===q-1,isCurrent:re!==null&&se.key===re}}),Q=[0,.25,.5,.75,1].map(se=>({y:c.top+i-se*i,value:Math.round(N*se),labeled:se===0||se===.5||se===1}));return{bars:ee,gridlines:Q}}),x=I(()=>e(g)!==null?e(w).bars[e(g)]:null);var S=Le(),C=Ne(S);{var z=q=>{var T=ip(),N=s(T);M(()=>p(N,t.emptyText??e(n).stats.noData)),m(q,T)},y=q=>{var T=fp(),N=s(T);O(N,"viewBox","0 0 600 240");var L=s(N);Ce(L,17,()=>e(w).gridlines,Ha,(ee,Q)=>{var se=cp(),B=Ne(se),R=d(B);{var ce=he=>{var me=lp(),ye=s(me);M(()=>{O(me,"x",c.left-6),O(me,"y",e(Q).y+3),p(ye,e(Q).value)}),m(he,me)};oe(R,he=>{e(Q).labeled&&he(ce)})}M(()=>{O(B,"x1",c.left),O(B,"x2",r-c.right),O(B,"y1",e(Q).y),O(B,"y2",e(Q).y)}),m(ee,se)});var ae=d(L);Ce(ae,17,()=>e(w).bars,ee=>ee.key,(ee,Q)=>{var se=up(),B=Ne(se);let R;var ce=d(B);{var he=ye=>{var je=dp();O(je,"y",o-8);var Ze=s(je);M(()=>{O(je,"x",e(Q).x+e(Q).w/2),p(Ze,e(Q).label)}),m(ye,je)};oe(ce,ye=>{e(Q).showLabel&&ye(he)})}var me=d(ce);M(()=>{R=Ge(B,0,"bar svelte-1ixrxd8",null,R,{zero:e(Q).minutes===0,current:e(Q).isCurrent}),O(B,"x",e(Q).x),O(B,"y",e(Q).y),O(B,"width",e(Q).w),O(B,"height",e(Q).h),O(me,"x",e(Q).hitX),O(me,"y",c.top),O(me,"width",e(Q).hitW),O(me,"height",i)}),kt("pointerenter",me,()=>v(g,e(Q).i,!0)),kt("pointerleave",me,()=>v(g,null)),m(ee,se)});var ne=d(N,2);{var re=ee=>{var Q=vp();let se;var B=s(Q);M(R=>{se=Rt(Q,"",se,R),p(B,`${e(x).label??""} · ${e(x).minutes??""} ${e(n).stats.unitMin??""}`)},[()=>({left:Math.min(88,Math.max(12,(e(x).x+e(x).w/2)/r*100))+"%",top:e(x).y/o*100+"%"})]),m(ee,Q)};oe(ne,ee=>{e(x)&&ee(re)})}M(()=>O(N,"aria-label",e(n).stats.trendChartAria)),kt("pointerleave",N,()=>v(g,null)),m(q,T)};oe(C,q=>{t.data.length===0?q(z):q(y,-1)})}m(a,S),ft()}var _p=E('<div class="empty svelte-s63rv4"> </div>'),pp=Tn('<circle role="presentation" pathLength="100"></circle>'),gp=E('<div class="tooltip svelte-s63rv4"> </div>'),mp=E('<span><i class="dot svelte-s63rv4"></i> <span class="name svelte-s63rv4"> </span> <span class="minutes svelte-s63rv4"> </span></span>'),bp=E('<div class="donut svelte-s63rv4"><div class="chart svelte-s63rv4"><svg role="img" class="svelte-s63rv4"><g></g></svg> <!></div> <div class="legend svelte-s63rv4"></div></div>');function yp(a,t){vt(t,!0);const n=I(mt),r=220,o=110,c=76,l=2/360*100,i=[90,75,60,45,30,15,0];function u(z){return`color-mix(in srgb, var(--color-accent, #e74c3c) ${i[z%i.length]}%, white)`}function f(z){return z>=i.length?Math.max(.4,1-(z-i.length+1)*.15):void 0}let h=W(null);const g=I(()=>t.projects.reduce((z,y)=>z+y.total_minutes,0)),_=I(()=>{if(e(g)<=0||t.projects.length===0)return[];const z=t.projects.length>1?l:0;let y=0;return t.projects.map((q,T)=>{const N=q.total_minutes/e(g),L=Math.max(.6,N*100-z),ae=(y+N/2)/100*2*Math.PI-Math.PI/2,ne={i:T,p:q,len:L,offset:y,color:u(T),opacity:f(T),tipX:o+c*Math.cos(ae),tipY:o+c*Math.sin(ae)};return y+=N*100,ne})}),b=I(()=>e(h)!==null?e(_)[e(h)]:null);var w=Le(),x=Ne(w);{var S=z=>{var y=_p(),q=s(y);M(()=>p(q,t.emptyText??e(n).stats.noProject)),m(z,y)},C=z=>{var y=bp(),q=s(y),T=s(q);O(T,"viewBox","0 0 220 220");var N=s(T);O(N,"transform","rotate(-90 110 110)"),Ce(N,21,()=>e(_),re=>re.p.project_id,(re,ee)=>{var Q=pp();let se;O(Q,"cx",o),O(Q,"cy",o),O(Q,"r",c);let B;M(()=>{se=Ge(Q,0,"seg svelte-s63rv4",null,se,{hovered:e(h)===e(ee).i}),O(Q,"opacity",e(ee).opacity),O(Q,"stroke-dasharray",`${e(ee).len??""} ${100-e(ee).len}`),O(Q,"stroke-dashoffset",-e(ee).offset),B=Rt(Q,"",B,{stroke:e(ee).color})}),kt("pointerenter",Q,()=>v(h,e(ee).i,!0)),kt("pointerleave",Q,()=>v(h,null)),m(re,Q)});var L=d(T,2);{var ae=re=>{var ee=gp();let Q;var se=s(ee);M(()=>{Q=Rt(ee,"",Q,{left:e(b).tipX/r*100+"%",top:e(b).tipY/r*100+"%"}),p(se,`${e(b).p.project_name??""} · ${e(b).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),m(re,ee)};oe(L,re=>{e(b)&&re(ae)})}var ne=d(q,2);Ce(ne,21,()=>e(_),re=>re.p.project_id,(re,ee)=>{var Q=mp();let se;var B=s(Q);let R;var ce=d(B,2),he=s(ce),me=d(ce,2),ye=s(me);M(()=>{se=Ge(Q,1,"legend-item svelte-s63rv4",null,se,{hovered:e(h)===e(ee).i}),R=Rt(B,"",R,{background:e(ee).color,opacity:e(ee).opacity??1}),p(he,e(ee).p.project_name),p(ye,`${e(ee).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),m(re,Q)}),M(()=>O(T,"aria-label",e(n).stats.donutChartAria)),m(z,y)};oe(x,z=>{e(_).length===0?z(S):z(C,-1)})}m(a,w),ft()}var kp=E("<button> </button>"),wp=E('<div class="error svelte-giv6a6" role="alert"> </div>'),xp=E('<p class="loading svelte-giv6a6"> </p>'),Sp=E('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),Tp=E('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section></div>',1),Dp=E('<div class="stats-veil page-veil svelte-giv6a6"><div class="page svelte-giv6a6"><h2 class="svelte-giv6a6"> </h2> <div class="dims svelte-giv6a6"></div> <!> <!></div></div>');function Pp(a,t){vt(t,!0);const n=I(mt);let r=W("week"),o=W(null),c=W(0),l=W(!0),i=W(null),u=0;const f=I(()=>Ui(e(r))),h=I(()=>e(f).group),g=I(()=>e(h)==="day"?e(n).stats.byDay:e(h)==="week"?e(n).stats.byWeek:e(n).stats.byMonth),_=I(()=>({today:e(n).stats.dimToday,week:e(n).stats.dimWeek,month:e(n).stats.dimMonth,quarter:e(n).stats.dimQuarter,halfyear:e(n).stats.dimHalf,year:e(n).stats.dimYear})),b=I(()=>{var R;return((R=e(o))==null?void 0:R.summary.total_minutes)??0}),w=I(()=>{var R;return((R=e(o))==null?void 0:R.summary.total_sessions)??0}),x=I(()=>{var R;return((R=e(o))==null?void 0:R.summary.completed_tasks)??0}),S=I(()=>Math.round(e(b)/Math.max(1,e(f).days))),C=I(()=>{if(!e(o))return null;const R=e(o).trend;let ce=0,he=0;for(const ye of R)ye.minutes>0?(he++,ce=Math.max(ce,he)):he=0;let me={key:"",minutes:0,sessions:0};for(const ye of R)ye.minutes>me.minutes&&(me=ye);return{activeDays:R.filter(ye=>ye.minutes>0).length,longest:ce,perPeriod:R.length>0?Math.round(e(b)/R.length):0,peak:me,projects:[...e(o).projects].sort((ye,je)=>je.total_minutes-ye.total_minutes)}}),z=I(()=>e(c)>0?Math.round((e(b)-e(c))/e(c)*100):e(b)>0?100:0),y=I(()=>`${e(z)>=0?"+":""}${e(z)}%`),q=I(()=>e(C)?e(C).projects:[]);St(()=>{const R=Ui(e(r)),ce=op(e(r)),he=++u;v(o,null),v(c,0),v(i,null),v(l,!0);const me=-new Date().getTimezoneOffset();Si(R.start,R.end,R.group,me).then(ye=>{he===u&&(v(o,ye,!0),v(l,!1))}).catch(ye=>{he===u&&(v(i,String(ye),!0),v(l,!1))}),Si(ce.start,ce.end,R.group,me).then(ye=>{he===u&&v(c,ye.summary.total_minutes,!0)}).catch(()=>{})});var T=Dp();Nr("giv6a6",R=>{Mr(()=>{Jn.title=e(n).page.stats??""})});var N=s(T),L=s(N),ae=s(L),ne=d(L,2);Ce(ne,21,()=>rp,R=>R.key,(R,ce)=>{var he=kp();let me;var ye=s(he);M(()=>{me=Ge(he,1,"dim-pill svelte-giv6a6",null,me,{active:e(r)===e(ce).key}),O(he,"aria-pressed",e(r)===e(ce).key),p(ye,e(_)[e(ce).key])}),G("click",he,()=>v(r,e(ce).key,!0)),m(R,he)});var re=d(ne,2);{var ee=R=>{var ce=wp(),he=s(ce);M(me=>p(he,`⚠ ${me??""}`),[()=>Nt(e(n).stats.loadError,{err:e(i)})]),m(R,ce)};oe(re,R=>{e(i)&&R(ee)})}var Q=d(re,2);{var se=R=>{var ce=xp(),he=s(ce);M(()=>p(he,e(n).stats.loading)),m(R,ce)},B=R=>{var ce=Tp(),he=Ne(ce),me=s(he);Wt(me,{get icon(){return gr},get label(){return e(n).stats.focusDuration},get value(){return e(b)},get unit(){return e(n).stats.unitMin},accent:!0});var ye=d(me,2);Wt(ye,{get icon(){return qs},get label(){return e(n).stats.sessions},get value(){return e(w)},get unit(){return e(n).stats.unitCount},accent:!0});var je=d(ye,2);Wt(je,{get icon(){return vs},get label(){return e(n).stats.completed},get value(){return e(x)},get unit(){return e(n).stats.unitCount},accent:!0});var Ze=d(je,2);Wt(Ze,{get icon(){return qo},get label(){return e(n).stats.avg},get value(){return e(S)},get unit(){return e(n).stats.unitMin},accent:!0});var D=d(he,2);{var A=Pe=>{var Fe=Sp(),ze=s(Fe);Wt(ze,{get icon(){return Jl},get label(){return e(n).stats.activeDays},get value(){return e(C).activeDays},get unit(){return e(n).stats.unitDay},accent:!0});var U=d(ze,2);{var ve=V=>{Wt(V,{get icon(){return Ku},get label(){return e(n).stats.longestStreak},get value(){return e(C).longest},get unit(){return e(n).stats.unitDay},accent:!0})};oe(U,V=>{(e(r)==="month"||e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&V(ve)})}var we=d(U,2);{var Z=V=>{{let X=I(()=>e(h)==="week"?e(n).stats.avgWeek:e(n).stats.avgMonth);Wt(V,{get icon(){return qo},get label(){return e(X)},get value(){return e(C).perPeriod},get unit(){return e(n).stats.unitMin},accent:!0})}};oe(we,V=>{(e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&V(Z)})}var k=d(we,2);{var P=V=>{{let X=I(()=>e(h)==="month"?e(n).stats.peakMonth:e(n).stats.peakPeriod),De=I(()=>e(C).peak.key?jc(e(C).peak.key,e(h)):"—"),Se=I(()=>e(C).peak.minutes?`${e(C).peak.minutes} ${e(n).stats.unitMin}`:"");Wt(V,{get icon(){return pi},get label(){return e(X)},get value(){return e(De)},get unit(){return e(Se)},accent:!0})}};oe(k,V=>{(e(r)==="halfyear"||e(r)==="year")&&V(P)})}var J=d(k,2);{var K=V=>{{let X=I(()=>`${e(C).projects[0].total_minutes} ${e(n).stats.unitMin}`);Wt(V,{get icon(){return pi},get label(){return e(n).stats.bestProject},get value(){return e(C).projects[0].project_name},get unit(){return e(X)},accent:!0})}};oe(J,V=>{(e(r)==="halfyear"||e(r)==="year")&&e(C).projects[0]&&V(K)})}var $=d(J,2);Wt($,{get icon(){return qo},get label(){return e(n).stats.momRatio},get value(){return e(y)},accent:!0}),m(Pe,Fe)};oe(D,Pe=>{e(C)&&e(r)!=="today"&&Pe(A)})}var F=d(D,2);let Y;var fe=s(F),be=s(fe),le=s(be),pe=d(be,2);hp(pe,{get data(){return e(o).trend},get group(){return e(h)}});var H=d(fe,2),ie=s(H),ue=s(ie),ke=d(ie,2);yp(ke,{get projects(){return e(q)}}),M(()=>{Y=Ge(F,1,"charts svelte-giv6a6",null,Y,{split:e(r)!=="month"}),p(le,`${e(n).stats.trendTitle??""}（${e(g)??""}）`),p(ue,e(n).stats.projectDist)}),m(R,ce)};oe(Q,R=>{e(l)?R(se):e(o)&&R(B,1)})}M(()=>p(ae,e(n).nav.stats)),m(a,T),ft()}yt(["click"]);var Mp=E('<button type="button" role="switch"><span class="knob svelte-1re5fgf"></span></button>');function sr(a,t){vt(t,!0);let n=pa(t,"disabled",3,!1);var r=Mp();let o;M(()=>{o=Ge(r,1,"switch svelte-1re5fgf",null,o,{on:t.checked}),O(r,"aria-checked",t.checked),O(r,"aria-label",t.label),r.disabled=n()}),G("click",r,()=>t.onChange(!t.checked)),m(a,r),ft()}yt(["click"]);async function Ep(){return await Ie("plugin:autostart|is_enabled")}async function Cp(){await Ie("plugin:autostart|enable")}async function Np(){await Ie("plugin:autostart|disable")}var Lr=E("<option> </option>"),jp=E('<div class="error svelte-90mmv5" role="alert"> </div>'),Fp=E('<div><h2 class="tab-title svelte-90mmv5"> </h2> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <button type="button" class="action svelte-90mmv5"> </button></div></div> <p class="tray-hint svelte-90mmv5"> </p></section> <!></div>');function Ap(a,t){vt(t,!0);const n=I(mt),r=I(Va),o=[1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90],c=[2,3,4,5,6];function l(xe,Ke){return Ke.includes(xe)?Ke:[...Ke,xe].sort((bt,Kt)=>bt-Kt)}let i=W(!1),u=W(!1),f=W(0),h=W(null);async function g(){try{v(i,await Ep(),!0)}catch(xe){console.warn("isEnabled failed",xe),v(i,!1)}try{const xe=await Sn({status:"active"});v(f,xe.length,!0)}catch{}}St(()=>{g()}),St(()=>{e(r).focusDuration,e(r).shortBreakDuration,e(r).longBreakDuration,e(r).longBreakInterval,gf()});function _(xe,Ke){bi({[xe]:Ke})}function b(xe){xe&&e(r).autoStartBreak?bi({disableBreak:!0,autoStartBreak:!1}):_("disableBreak",xe)}async function w(){if(!e(u)){v(u,!0),v(h,null);try{e(i)?(await Np(),v(i,!1)):(await Cp(),v(i,!0))}catch(xe){v(h,Nt(e(n).settings.autostartFail,{err:String(xe)}),!0)}finally{v(u,!1)}}}async function x(){v(h,null);try{let xe=await ko();if(xe||(xe=await wo()==="granted"),!xe){v(h,e(n).settings.notifPermDenied,!0);return}xo({title:e(n).settings.testNotifTitle,body:Nt(e(n).settings.testNotifBody,{n:e(f)})})}catch(xe){v(h,Nt(e(n).settings.notifSendFail,{err:String(xe)}),!0)}}var S=Fp(),C=s(S),z=s(C),y=d(C,2),q=s(y),T=s(q),N=d(q,2),L=s(N),ae=s(L),ne=s(ae),re=d(ae,2);Ce(re,20,()=>l(e(r).focusDuration,o),xe=>xe,(xe,Ke)=>{var bt=Lr(),Kt=s(bt),ea={};M(()=>{p(Kt,`${Ke??""}${e(n).settings.minute??""}`),ea!==(ea=Ke)&&(bt.value=(bt.__value=Ke)??"")}),m(xe,bt)});var ee;Bt(re);var Q=d(L,2),se=s(Q),B=s(se),R=d(se,2);Ce(R,20,()=>l(e(r).shortBreakDuration,o),xe=>xe,(xe,Ke)=>{var bt=Lr(),Kt=s(bt),ea={};M(()=>{p(Kt,`${Ke??""}${e(n).settings.minute??""}`),ea!==(ea=Ke)&&(bt.value=(bt.__value=Ke)??"")}),m(xe,bt)});var ce;Bt(R);var he=d(Q,2),me=s(he),ye=s(me),je=d(me,2);Ce(je,20,()=>l(e(r).longBreakDuration,o),xe=>xe,(xe,Ke)=>{var bt=Lr(),Kt=s(bt),ea={};M(()=>{p(Kt,`${Ke??""}${e(n).settings.minute??""}`),ea!==(ea=Ke)&&(bt.value=(bt.__value=Ke)??"")}),m(xe,bt)});var Ze;Bt(je);var D=d(he,2),A=s(D),F=s(A),Y=d(A,2);Ce(Y,20,()=>l(e(r).longBreakInterval,c),xe=>xe,(xe,Ke)=>{var bt=Lr(),Kt=s(bt),ea={};M(()=>{p(Kt,`${Ke??""}${e(n).settings.pomodoroUnit??""}`),ea!==(ea=Ke)&&(bt.value=(bt.__value=Ke)??"")}),m(xe,bt)});var fe;Bt(Y);var be=d(y,2),le=s(be),pe=s(le),H=d(le,2),ie=s(H),ue=s(ie),ke=s(ue),Pe=s(ke),Fe=d(ke,2),ze=s(Fe),U=d(ue,2);sr(U,{get checked(){return e(r).autoStartNextPomodoro},onChange:xe=>_("autoStartNextPomodoro",xe),get label(){return e(n).settings.autoStartNext}});var ve=d(ie,2),we=s(ve),Z=s(we),k=s(Z),P=d(Z,2),J=s(P),K=d(we,2);sr(K,{get checked(){return e(r).autoStartBreak},onChange:xe=>_("autoStartBreak",xe),get label(){return e(n).settings.autoStartBreak}});var $=d(ve,2),V=s($),X=s(V),De=s(X),Se=d(X,2),Ue=s(Se),pt=d(V,2);sr(pt,{get checked(){return e(r).disableBreak},onChange:b,get label(){return e(n).settings.disableBreak}});var lt=d(be,2),ct=s(lt),et=s(ct),He=d(ct,2),ge=s(He),_e=s(ge),tt=s(_e),at=d(_e,2);sr(at,{get checked(){return e(r).desktopNotificationEnabled},onChange:xe=>_("desktopNotificationEnabled",xe),get label(){return e(n).settings.systemNotification}});var ht=d(ge,2),rt=s(ht),Pt=s(rt),jt=s(Pt),Lt=d(Pt,2),zt=s(Lt),Ye=d(rt,2);sr(Ye,{get checked(){return e(i)},onChange:w,get label(){return e(n).settings.autostart},get disabled(){return e(u)}});var gt=d(ht,2),dt=s(gt),Ht=s(dt),Ct=s(Ht),Oe=d(Ht,2),Ae=s(Oe),it=d(dt,2),te=s(it),Te=d(He,2),Re=s(Te),We=d(lt,2);{var Mt=xe=>{var Ke=jp(),bt=s(Ke);M(()=>p(bt,`⚠ ${e(h)??""}`)),m(xe,Ke)};oe(We,xe=>{e(h)&&xe(Mt)})}M(()=>{p(z,e(n).settings.timerTitle),p(T,e(n).settings.durationSetting),p(ne,e(n).settings.focusDuration),ee!==(ee=e(r).focusDuration)&&(re.value=(re.__value=e(r).focusDuration)??"",At(re,e(r).focusDuration)),p(B,e(n).settings.shortBreakDuration),ce!==(ce=e(r).shortBreakDuration)&&(R.value=(R.__value=e(r).shortBreakDuration)??"",At(R,e(r).shortBreakDuration)),p(ye,e(n).settings.longBreakDuration),Ze!==(Ze=e(r).longBreakDuration)&&(je.value=(je.__value=e(r).longBreakDuration)??"",At(je,e(r).longBreakDuration)),p(F,e(n).settings.longBreakInterval),fe!==(fe=e(r).longBreakInterval)&&(Y.value=(Y.__value=e(r).longBreakInterval)??"",At(Y,e(r).longBreakInterval)),p(pe,e(n).settings.behaviorSetting),p(Pe,e(n).settings.autoStartNext),p(ze,e(n).settings.autoStartNextDesc),p(k,e(n).settings.autoStartBreak),p(J,e(n).settings.autoStartBreakDesc),p(De,e(n).settings.disableBreak),p(Ue,e(n).settings.disableBreakDesc),p(et,e(n).settings.systemSection),p(tt,e(n).settings.systemNotification),p(jt,e(n).settings.autostart),p(zt,e(n).settings.autostartHint),p(Ct,e(n).settings.notifTest),p(Ae,e(n).settings.notifTestHint),p(te,e(n).settings.sendTest),p(Re,e(n).settings.trayHint)}),G("change",re,xe=>_("focusDuration",Number(xe.currentTarget.value))),G("change",R,xe=>_("shortBreakDuration",Number(xe.currentTarget.value))),G("change",je,xe=>_("longBreakDuration",Number(xe.currentTarget.value))),G("change",Y,xe=>_("longBreakInterval",Number(xe.currentTarget.value))),G("click",it,x),m(a,S),ft()}yt(["change","click"]);const lo=["#c97b6e","#d4945c","#d4a574","#b8a878","#7fa086","#6b9b8a","#5c8b84","#5c8fad","#7a8fb0","#8b7baf","#a68b78","#a8a298"],Za=lo[0];var Ip=E('<div class="error svelte-1o455o6" role="alert"> </div>'),qp=E('<div class="add-root-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),Rp=E('<button type="button" class="add-root-btn svelte-1o455o6"><!> </button>'),Lp=E('<button type="button"></button>'),Op=E('<div class="edit-box svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/> <div class="color-row svelte-1o455o6"></div> <div class="edit-actions svelte-1o455o6"><button type="button" class="link-btn svelte-1o455o6"> </button> <button type="button" class="save-btn svelte-1o455o6"> </button></div></div>'),Bp=E('<button type="button" class="chevron svelte-1o455o6"><!></button>'),zp=E('<span class="chevron-spacer svelte-1o455o6"></span>'),Hp=E('<button type="button" class="icon-btn svelte-1o455o6"><!></button>'),Up=E('<div role="treeitem" tabindex="-1" aria-selected="false"><span><!> <span class="dot svelte-1o455o6"></span> <span class="name svelte-1o455o6"> </span></span> <span class="actions svelte-1o455o6"><!> <button type="button" class="icon-btn svelte-1o455o6"><!></button> <button type="button" class="icon-btn danger svelte-1o455o6"><!></button></span></div>'),Wp=E('<div class="add-child-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),Yp=E('<div class="row-wrap svelte-1o455o6"><!> <!></div>'),Gp=E('<div class="empty svelte-1o455o6"> </div>'),Vp=E('<div class="manager svelte-1o455o6"><h2 class="tab-title svelte-1o455o6"> </h2> <p class="drag-hint svelte-1o455o6"> </p> <!> <!> <div role="tree" tabindex="-1"><!> <!></div></div>');function Kp(a,t){vt(t,!0);const n=I(mt);let r=W(Be([])),o=W(Be(new Set)),c=W("root"),l=W(""),i=W(null),u=W(""),f=W(Be(Za)),h=W(null),g=W(null),_=W(null),b=W(!1);function w(){return new Date().toISOString()}async function x(){try{v(r,await Os(),!0)}catch{}}rn(()=>{x()}),St(()=>{if(!e(h))return;const k=window.setTimeout(()=>v(h,null),3e3);return()=>window.clearTimeout(k)});function S(k){const P=new Map,J=[];for(const V of k)P.set(V.id,{...V,children:[],depth:0});for(const V of k){const X=P.get(V.id);X&&(V.parent_id&&P.has(V.parent_id)?P.get(V.parent_id).children.push(X):J.push(X))}const K=V=>{V.sort((X,De)=>(X.display_order??0)-(De.display_order??0)||(X.created_at??"").localeCompare(De.created_at??"")||X.id.localeCompare(De.id)),V.forEach(X=>K(X.children))};K(J);const $=(V,X)=>{for(const De of V)De.depth=X,$(De.children,X+1)};return $(J,0),J}function C(k,P){const J=[];for(const K of k)J.push(K),P.has(K.id)&&K.children.length>0&&J.push(...C(K.children,P));return J}const z=I(()=>S(e(r))),y=I(()=>C(e(z),e(o)));function q(k){const P=new Set(e(o));P.has(k)?P.delete(k):P.add(k),v(o,P,!0)}function T(){const k=new Map;for(const P of e(r))k.set(P.id,P.parent_id??null);return k}function N(){const k=new Map;for(const P of e(r)){const J=P.parent_id??null;k.has(J)||k.set(J,[]),k.get(J).push(P.id)}return k}function L(k,P){const J=P.get(k)??[];return J.length===0?1:1+Math.max(...J.map(K=>L(K,P)))}function ae(k,P,J){let K=k;const $=new Set;for(;K;){if(K===P)return!0;if($.has(K))return!1;$.add(K),K=J.get(K)??null}return!1}async function ne(){const k=e(l).trim();if(!k)return;const P=e(c)==="root"?null:e(c),J=e(r).filter(K=>(K.parent_id??null)===P);try{await no({id:crypto.randomUUID(),name:k,color:Za,parent_id:P,display_order:J.length,created_at:w(),updated_at:w()})}catch(K){v(h,String(K),!0)}if(v(l,""),v(c,null),P){const K=new Set(e(o));K.add(P),v(o,K,!0)}await x()}function re(k){v(i,k.id,!0),v(u,k.name,!0),v(f,k.color??Za,!0)}async function ee(){if(!e(i))return;const k=e(u).trim();if(!k)return;const P=e(r).find(J=>J.id===e(i));if(P){try{await no({...P,name:k,color:e(f),updated_at:w()})}catch(J){v(h,String(J),!0)}v(i,null),v(u,""),await x()}}async function Q(k){try{await vc(k)}catch(P){v(h,String(P),!0)}await x()}function se(k){return k.includes("exceed max depth")?e(n).settings.list.reorderFailDepth:k.includes("cycle")?e(n).settings.list.reorderFailCycle:e(n).settings.list.reorderFail}function B(k){return k.map(P=>({id:P.id,parent_id:P.parent_id??null,display_order:P.display_order??0}))}function R(k){const P=new Map;for(const K of k){const $=K.parent_id??null;P.has($)||P.set($,[]),P.get($).push(K)}const J=new Map;for(const K of P.values())K.slice().sort(($,V)=>($.display_order??0)-(V.display_order??0)).forEach(($,V)=>J.set($.id,V));return k.map(K=>({...K,display_order:J.get(K.id)??0}))}async function ce(k,P){if(!e(r).find(X=>X.id===k))return;const K=e(r).filter(X=>(X.parent_id??null)===P&&X.id!==k).length,$=e(r).map(X=>X.id===k?{...X,parent_id:P,display_order:K}:X),V=R($);if(v(r,V,!0),P){const X=new Set(e(o));X.add(P),v(o,X,!0)}try{await Ev(B(V)),await x()}catch(X){await x(),v(h,se(String(X)),!0)}}function he(k){const P=e(g);if(ye(),!P||P===k.id)return;const J=e(r).find(V=>V.id===P);if(!J||(J.parent_id??null)===k.id)return;const K=T();if(ae(k.id,P,K)){v(h,e(n).settings.list.reorderFailCycle,!0);return}const $=L(P,N());if(k.depth+$>2){v(h,e(n).settings.list.reorderFailDepth,!0);return}ce(P,k.id)}function me(){const k=e(g);if(ye(),!k)return;const P=e(r).find(J=>J.id===k);if(P){if((P.parent_id??null)===null){const J=e(r).filter(K=>K.parent_id==null&&K.id!==k).length;if((P.display_order??0)===J)return}ce(k,null)}}function ye(){v(g,null),v(_,null),v(b,!1)}function je(k,P){k.dataTransfer&&(v(g,P.id,!0),k.dataTransfer.effectAllowed="move",k.dataTransfer.setData("text/plain",P.id))}function Ze(k,P){e(g)&&(k.preventDefault(),k.stopPropagation(),k.dataTransfer&&(k.dataTransfer.dropEffect="move"),v(_,P.id,!0),v(b,!1))}function D(k,P){k.preventDefault(),k.stopPropagation(),he(P)}function A(k){e(g)&&(k.preventDefault(),k.dataTransfer&&(k.dataTransfer.dropEffect="move"),v(b,!0),v(_,null))}function F(k){k.preventDefault(),me()}function Y(k){k.target===k.currentTarget&&v(b,!1)}var fe=Vp(),be=s(fe),le=s(be),pe=d(be,2),H=s(pe),ie=d(pe,2);{var ue=k=>{var P=Ip(),J=s(P);M(()=>p(J,e(h))),m(k,P)};oe(ie,k=>{e(h)&&k(ue)})}var ke=d(ie,2);{var Pe=k=>{var P=qp(),J=s(P);pn(J,!0),M(()=>O(J,"placeholder",e(n).settings.list.addRootPlaceholder)),G("keydown",J,K=>{K.key==="Enter"&&ne(),K.key==="Escape"&&(v(c,null),v(l,""))}),kt("blur",J,()=>{e(l).trim()?ne():(v(c,null),v(l,""))}),wt(J,()=>e(l),K=>v(l,K)),m(k,P)},Fe=k=>{var P=Rp(),J=s(P);Wn(J,{size:16});var K=d(J);M(()=>p(K,` ${e(n).settings.list.addRoot??""}`)),G("click",P,()=>{v(c,"root"),v(l,"")}),m(k,P)};oe(ke,k=>{e(c)==="root"?k(Pe):k(Fe,-1)})}var ze=d(ke,2);let U;var ve=s(ze);Ce(ve,17,()=>e(y),k=>k.id,(k,P)=>{const J=I(()=>e(i)===e(P).id),K=I(()=>e(c)===e(P).id),$=I(()=>e(P).children.length>0),V=I(()=>e(o).has(e(P).id)),X=I(()=>!e(J)&&!e(K)&&e(P).depth>0);var De=Yp(),Se=s(De);{var Ue=et=>{var He=Op(),ge=s(He),_e=d(ge,2);Ce(_e,20,()=>lo,jt=>jt,(jt,Lt)=>{var zt=Lp();let Ye;M(gt=>{Ye=Ge(zt,1,"swatch svelte-1o455o6",null,Ye,{active:e(f)===Lt}),Rt(zt,`background-color: ${Lt??""}`),O(zt,"aria-label",gt)},[()=>Nt(e(n).settings.tag.colorAria,{color:Lt})]),G("click",zt,()=>v(f,Lt,!0)),m(jt,zt)});var tt=d(_e,2),at=s(tt),ht=s(at),rt=d(at,2),Pt=s(rt);M(()=>{O(ge,"placeholder",e(P).name),p(ht,e(n).settings.repeatCustom.cancel),p(Pt,e(n).settings.notification.save)}),G("keydown",ge,jt=>{jt.key==="Enter"&&ee(),jt.key==="Escape"&&(v(i,null),v(u,""))}),wt(ge,()=>e(u),jt=>v(u,jt)),G("click",at,()=>{v(i,null),v(u,"")}),G("click",rt,ee),m(et,He)},pt=et=>{var He=Up();let ge;var _e=s(He);let tt;var at=s(_e);{var ht=Ae=>{var it=Bp(),te=s(it);{var Te=We=>{Hn(We,{size:14})},Re=We=>{Un(We,{size:14})};oe(te,We=>{e(V)?We(Te):We(Re,-1)})}M(()=>O(it,"aria-label",e(V)?e(n).common.expand:e(n).common.collapse)),G("click",it,We=>{We.stopPropagation(),q(e(P).id)}),m(Ae,it)},rt=Ae=>{var it=zp();m(Ae,it)};oe(at,Ae=>{e($)?Ae(ht):Ae(rt,-1)})}var Pt=d(at,2),jt=d(Pt,2),Lt=s(jt),zt=d(_e,2),Ye=s(zt);{var gt=Ae=>{var it=Hp(),te=s(it);Wn(te,{size:14}),M(()=>{O(it,"title",e(n).settings.list.addChild),O(it,"aria-label",e(n).settings.list.addChild)}),G("click",it,Te=>{Te.stopPropagation(),v(c,e(P).id,!0),v(l,"")}),m(Ae,it)};oe(Ye,Ae=>{e(P).depth<2&&Ae(gt)})}var dt=d(Ye,2),Ht=s(dt);Rs(Ht,{size:14});var Ct=d(dt,2),Oe=s(Ct);mo(Oe,{size:14}),M(()=>{ge=Ge(He,1,"row svelte-1o455o6",null,ge,{"drop-over":e(_)===e(P).id&&e(g)!==e(P).id,dragging:e(g)===e(P).id}),O(He,"draggable",e(X)),tt=Ge(_e,1,"label svelte-1o455o6",null,tt,{grabbable:e(X)}),Rt(Pt,`background-color: ${e(P).color??Za??""}`),p(Lt,e(P).name),O(dt,"title",e(n).settings.list.edit),O(dt,"aria-label",e(n).settings.list.edit),O(Ct,"title",e(n).settings.list.del),O(Ct,"aria-label",e(n).settings.list.del)}),kt("dragstart",He,Ae=>je(Ae,e(P))),kt("dragover",He,Ae=>Ze(Ae,e(P))),kt("drop",He,Ae=>D(Ae,e(P))),kt("dragend",He,ye),G("click",dt,Ae=>{Ae.stopPropagation(),re(e(P))}),G("click",Ct,Ae=>{Ae.stopPropagation(),Q(e(P).id)}),m(et,He)};oe(Se,et=>{e(J)?et(Ue):et(pt,-1)})}var lt=d(Se,2);{var ct=et=>{var He=Wp(),ge=s(He);pn(ge,!0),M(()=>O(ge,"placeholder",e(P).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)),G("keydown",ge,_e=>{_e.key==="Enter"&&ne(),_e.key==="Escape"&&(v(c,null),v(l,""))}),kt("blur",ge,()=>{e(l).trim()?ne():(v(c,null),v(l,""))}),wt(ge,()=>e(l),_e=>v(l,_e)),m(et,He)};oe(lt,et=>{e(K)&&et(ct)})}M(()=>Rt(De,`padding-left: ${e(P).depth*24}px`)),m(k,De)});var we=d(ve,2);{var Z=k=>{var P=Gp(),J=s(P);M(()=>p(J,e(n).settings.list.empty)),m(k,P)};oe(we,k=>{e(r).length===0&&e(c)!=="root"&&k(Z)})}M(()=>{p(le,e(n).settings.list.title),p(H,e(n).settings.list.dragHint),U=Ge(ze,1,"tree svelte-1o455o6",null,U,{"over-root":e(b)})}),kt("dragover",ze,A),kt("drop",ze,F),kt("dragleave",ze,Y),m(a,fe),ft()}yt(["keydown","click"]);var Wi=E('<button type="button"></button>'),$p=E('<div class="error svelte-1hwdvdh" role="alert"> </div>'),Jp=E('<div class="edit-box svelte-1hwdvdh"><div class="edit-name-row svelte-1hwdvdh"><span class="name-label svelte-1hwdvdh"> </span> <input type="text" class="text-input svelte-1hwdvdh"/></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div> <div class="edit-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <button type="button" class="save-btn svelte-1hwdvdh"> </button></div></div>'),Qp=E('<div class="tag-row svelte-1hwdvdh"><div class="tag-row-main svelte-1hwdvdh"><span class="grip svelte-1hwdvdh"><!></span> <span class="dot svelte-1hwdvdh"></span> <span class="tag-name svelte-1hwdvdh"> </span></div> <div class="tag-row-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <span class="sep svelte-1hwdvdh">|</span> <button type="button" class="link-btn danger svelte-1hwdvdh"> </button></div></div>'),Xp=E('<div role="listitem" tabindex="-1"><!></div>'),Zp=E('<div class="empty svelte-1hwdvdh"> </div>'),eg=E('<div><h2 class="tab-title svelte-1hwdvdh"> </h2> <div class="add-card svelte-1hwdvdh"><div class="add-row svelte-1hwdvdh"><input type="text" class="text-input svelte-1hwdvdh"/> <button type="button" class="add-btn svelte-1hwdvdh"> </button></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div></div> <!> <div class="tag-list svelte-1hwdvdh" role="list"></div> <!></div>');function tg(a,t){vt(t,!0);const n=I(mt);let r=W(Be([])),o=W(""),c=W(Be(Za)),l=W(null),i=W(""),u=W(Be(Za)),f=W(null),h=W(null),g=W(null);function _(){return new Date().toISOString()}async function b(){try{const F=await Bs();v(r,[...F].sort((Y,fe)=>(Y.display_order??0)-(fe.display_order??0)||(Y.created_at??"").localeCompare(fe.created_at??"")||Y.id.localeCompare(fe.id)),!0)}catch{}}rn(()=>{b()}),St(()=>{if(!e(f))return;const F=window.setTimeout(()=>v(f,null),3e3);return()=>window.clearTimeout(F)});function w(F,Y,fe){const be=F.slice(),[le]=be.splice(Y,1);return be.splice(fe,0,le),be}async function x(){const F=e(o).trim();if(F)try{await wi({id:crypto.randomUUID(),name:F,color:e(c),display_order:e(r).length,created_at:_(),updated_at:_()}),v(o,""),await b()}catch(Y){v(f,String(Y),!0)}}async function S(F){try{await Cv(F),await b()}catch(Y){v(f,String(Y),!0)}}function C(F){v(l,F.id,!0),v(i,F.name,!0),v(u,F.color??Za,!0)}async function z(){if(!e(l))return;const F=e(i).trim();if(!F)return;const Y=e(r).find(fe=>fe.id===e(l));if(Y){try{await wi({...Y,name:F,color:e(u),updated_at:_()})}catch(fe){v(f,String(fe),!0)}v(l,null),await b()}}function y(F,Y){F.dataTransfer&&(v(h,Y.id,!0),F.dataTransfer.effectAllowed="move",F.dataTransfer.setData("text/plain",Y.id))}function q(F,Y){!e(h)||e(h)===Y.id||(F.preventDefault(),F.stopPropagation(),F.dataTransfer&&(F.dataTransfer.dropEffect="move"),v(g,Y.id,!0))}function T(F,Y){F.preventDefault(),F.stopPropagation();const fe=e(h);if(v(h,null),v(g,null),!fe||fe===Y.id)return;const be=e(r).findIndex(ue=>ue.id===fe),le=e(r).findIndex(ue=>ue.id===Y.id);if(be<0||le<0)return;const pe=e(r),H=w(e(r),be,le);v(r,H,!0);const ie=H.map((ue,ke)=>({id:ue.id,display_order:ke}));Nv(ie).then(b).catch(async ue=>{v(r,pe,!0),await b(),v(f,String(ue)||e(n).settings.list.reorderFail,!0)})}function N(){v(h,null),v(g,null)}var L=eg(),ae=s(L),ne=s(ae),re=d(ae,2),ee=s(re),Q=s(ee),se=d(Q,2),B=s(se),R=d(ee,2),ce=s(R),he=s(ce),me=d(ce,2);Ce(me,20,()=>lo,F=>F,(F,Y)=>{var fe=Wi();let be;M(le=>{be=Ge(fe,1,"swatch svelte-1hwdvdh",null,be,{active:e(c)===Y}),Rt(fe,`background-color: ${Y??""}`),O(fe,"aria-label",le)},[()=>Nt(e(n).settings.tag.colorAria,{color:Y})]),G("click",fe,()=>v(c,Y,!0)),m(F,fe)});var ye=d(re,2);{var je=F=>{var Y=$p(),fe=s(Y);M(()=>p(fe,e(f))),m(F,Y)};oe(ye,F=>{e(f)&&F(je)})}var Ze=d(ye,2);Ce(Ze,21,()=>e(r),F=>F.id,(F,Y)=>{const fe=I(()=>e(l)===e(Y).id);var be=Xp();let le;var pe=s(be);{var H=ue=>{var ke=Jp(),Pe=s(ke),Fe=s(Pe),ze=s(Fe),U=d(Fe,2);pn(U,!0);var ve=d(Pe,2),we=s(ve),Z=s(we),k=d(we,2);Ce(k,20,()=>lo,X=>X,(X,De)=>{var Se=Wi();let Ue;M(pt=>{Ue=Ge(Se,1,"swatch sm svelte-1hwdvdh",null,Ue,{active:e(u)===De}),Rt(Se,`background-color: ${De??""}`),O(Se,"aria-label",pt)},[()=>Nt(e(n).settings.tag.colorAria,{color:De})]),G("click",Se,()=>v(u,De,!0)),m(X,Se)});var P=d(ve,2),J=s(P),K=s(J),$=d(J,2),V=s($);M(()=>{p(ze,e(n).settings.tag.nameLabel),p(Z,e(n).settings.tag.colorLabel),p(K,e(n).settings.repeatCustom.cancel),p(V,e(n).settings.notification.save)}),G("keydown",U,X=>{X.key==="Enter"&&z(),X.key==="Escape"&&v(l,null)}),wt(U,()=>e(i),X=>v(i,X)),G("click",J,()=>v(l,null)),G("click",$,z),m(ue,ke)},ie=ue=>{var ke=Qp(),Pe=s(ke),Fe=s(Pe),ze=s(Fe);Ju(ze,{size:16});var U=d(Fe,2),ve=d(U,2),we=s(ve),Z=d(Pe,2),k=s(Z),P=s(k),J=d(k,4),K=s(J);M(()=>{O(Fe,"aria-label",e(n).settings.tag.dragHandle),O(Fe,"title",e(n).settings.tag.dragHandle),Rt(U,`background-color: ${e(Y).color??Za??""}`),p(we,e(Y).name),p(P,e(n).settings.list.edit),p(K,e(n).settings.list.del)}),G("click",k,()=>C(e(Y))),G("click",J,()=>void S(e(Y).id)),m(ue,ke)};oe(pe,ue=>{e(fe)?ue(H):ue(ie,-1)})}M(()=>{le=Ge(be,1,"tag-card svelte-1hwdvdh",null,le,{dragging:e(h)===e(Y).id,"drop-over":e(g)===e(Y).id&&e(h)!==null&&e(h)!==e(Y).id}),O(be,"draggable",!e(fe))}),kt("dragstart",be,ue=>y(ue,e(Y))),kt("dragover",be,ue=>q(ue,e(Y))),kt("drop",be,ue=>T(ue,e(Y))),kt("dragend",be,N),m(F,be)});var D=d(Ze,2);{var A=F=>{var Y=Zp(),fe=s(Y);M(()=>p(fe,e(n).settings.tag.empty)),m(F,Y)};oe(D,F=>{e(r).length===0&&F(A)})}M(()=>{p(ne,e(n).settings.tab.tags),O(Q,"placeholder",e(n).settings.tag.namePlaceholder),p(B,e(n).settings.tag.add),p(he,e(n).settings.tag.colorLabel)}),G("keydown",Q,F=>{F.key==="Enter"&&x()}),wt(Q,()=>e(o),F=>v(o,F)),G("click",se,x),m(a,L),ft()}yt(["keydown","click"]);var Yi=E('<span class="badge svelte-wf1h2h"><!></span>'),ag=E('<button type="button"><!> <span class="card-name svelte-wf1h2h"> </span></button>'),ng=E('<button type="button"><!> <span class="card-name corner svelte-wf1h2h"> </span></button>'),rg=E('<p class="used svelte-wf1h2h"><!> </p>'),og=E('<div class="thumb svelte-wf1h2h"></div> <span class="used svelte-wf1h2h"><!> </span> <button type="button" class="clear-btn svelte-wf1h2h"><!> </button>',1),sg=E('<p class="fail svelte-wf1h2h" role="alert"> </p>'),ig=E('<button type="button" class="reset-btn svelte-wf1h2h"><!> </button>'),lg=E('<div class="setting svelte-wf1h2h"><h2 class="tab-title svelte-wf1h2h"> </h2> <p class="desc svelte-wf1h2h"> </p> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div> <p class="hint svelte-wf1h2h"> </p> <!></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="custom-row svelte-wf1h2h"><label class="upload-btn svelte-wf1h2h"><input type="file" accept="image/*" class="file-input svelte-wf1h2h"/> <!> </label> <!></div> <!> <p class="hint svelte-wf1h2h"> </p></section> <!></div>');function cg(a,t){vt(t,!0);const n=I(mt),r=I($f),o=I(Jf);let c=W(!1);async function l(le){var ue;const pe=le.currentTarget,H=(ue=pe.files)==null?void 0:ue[0];if(!H)return;v(c,!1);const ie=await eh(H);ie?Zf(ie):v(c,!0),pe.value=""}const i=I(()=>{var le;return((le=e(o))==null?void 0:le.kind)==="preset"?e(o).id:null}),u=I(()=>{var le;return((le=e(o))==null?void 0:le.kind)==="custom"}),f=I(()=>{var le;return e(r)==="default"&&((le=e(o))==null?void 0:le.kind)==="preset"&&e(o).id==="preset-bg-1"}),h=I(()=>{var le,pe;if(((le=e(o))==null?void 0:le.kind)==="preset"){const H=oo.find(ie=>ie.id===e(o).id);return H?`background-image: ${H.url}`:null}return((pe=e(o))==null?void 0:pe.kind)==="custom"?`background-image: ${e(o).url}`:null});var g=lg(),_=s(g),b=s(_),w=d(_,2),x=s(w),S=d(w,2),C=s(S),z=s(C),y=d(C,2);Ce(y,21,()=>Tc,le=>le.id,(le,pe)=>{const H=I(()=>e(r)===e(pe).id);var ie=ag();let ue;var ke=s(ie);{var Pe=U=>{var ve=Yi(),we=s(ve);za(we,{size:11,strokeWidth:3}),m(U,ve)};oe(ke,U=>{e(H)&&U(Pe)})}var Fe=d(ke,2),ze=s(Fe);M(()=>{ue=Ge(ie,1,"card svelte-wf1h2h",null,ue,{active:e(H)}),Rt(ie,`background: ${e(pe).preview??""}`),O(ie,"title",e(n).settings.theme.presetName[e(pe).id]),O(ie,"aria-pressed",e(H)),p(ze,e(n).settings.theme.presetName[e(pe).id])}),G("click",ie,()=>Qf(e(pe).id)),m(le,ie)});var q=d(S,2),T=s(q),N=s(T),L=d(T,2);Ce(L,21,()=>oo,le=>le.id,(le,pe)=>{const H=I(()=>e(i)===e(pe).id);var ie=ng();let ue;var ke=s(ie);{var Pe=U=>{var ve=Yi(),we=s(ve);za(we,{size:11,strokeWidth:3}),m(U,ve)};oe(ke,U=>{e(H)&&U(Pe)})}var Fe=d(ke,2),ze=s(Fe);M(()=>{ue=Ge(ie,1,"card cover svelte-wf1h2h",null,ue,{active:e(H)}),Rt(ie,`background-image: ${e(pe).url??""}`),O(ie,"title",e(n).settings.theme.presetBgName[e(pe).id]),O(ie,"aria-pressed",e(H)),p(ze,e(n).settings.theme.presetBgName[e(pe).id])}),G("click",ie,()=>Xf(e(pe).id)),m(le,ie)});var ae=d(L,2),ne=s(ae),re=d(ae,2);{var ee=le=>{var pe=rg(),H=s(pe);za(H,{size:13});var ie=d(H);M(()=>p(ie,` ${e(n).settings.theme.presetBgUsed??""}`)),m(le,pe)};oe(re,le=>{e(i)&&le(ee)})}var Q=d(q,2),se=s(Q),B=s(se),R=d(se,2),ce=s(R),he=s(ce),me=d(he,2);uv(me,{size:14});var ye=d(me),je=d(ce,2);{var Ze=le=>{var pe=og(),H=Ne(pe),ie=d(H,2),ue=s(ie);za(ue,{size:13});var ke=d(ue),Pe=d(ie,2),Fe=s(Pe);ec(Fe,{size:12});var ze=d(Fe);M(()=>{Rt(H,e(h)),O(H,"aria-label",e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed),p(ke,` ${(e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed)??""}`),p(ze,` ${e(n).settings.theme.clearBg??""}`)}),G("click",Pe,function(...U){Ho==null||Ho.apply(this,U)}),m(le,pe)};oe(je,le=>{e(o)&&e(h)&&le(Ze)})}var D=d(R,2);{var A=le=>{var pe=sg(),H=s(pe);M(()=>p(H,e(n).settings.theme.compressFail)),m(le,pe)};oe(D,le=>{e(c)&&le(A)})}var F=d(D,2),Y=s(F),fe=d(Q,2);{var be=le=>{var pe=ig(),H=s(pe);av(H,{size:12});var ie=d(H);M(()=>p(ie,` ${e(n).settings.theme.reset??""}`)),G("click",pe,function(...ue){Uo==null||Uo.apply(this,ue)}),m(le,pe)};oe(fe,le=>{e(f)||le(be)})}M(()=>{p(b,e(n).settings.theme.title),p(x,e(n).settings.theme.desc),p(z,e(n).settings.theme.preset),p(N,e(n).settings.theme.presetBg),p(ne,e(n).settings.theme.presetBgHint),p(B,e(n).settings.theme.custom),p(ye,` ${e(n).settings.theme.upload??""}`),p(Y,e(n).settings.theme.customHint)}),G("change",he,l),m(a,g),ft()}yt(["click","change"]);var dg=E('<div class="error svelte-16699lq" role="alert"> </div>'),ug=E('<div class="empty svelte-16699lq"> </div>'),vg=E('<div class="item svelte-16699lq"><div class="item-main svelte-16699lq"><div class="item-text svelte-16699lq"> </div> <div class="item-author svelte-16699lq"> </div></div> <button type="button" class="del-btn svelte-16699lq"><!></button></div>'),fg=E('<div class="manager svelte-16699lq"><h2 class="tab-title svelte-16699lq"> </h2> <div class="add-card svelte-16699lq"><textarea class="textarea svelte-16699lq"></textarea> <div class="author-row svelte-16699lq"><input type="text" class="author-input svelte-16699lq"/> <button type="button" class="add-btn svelte-16699lq"><!> </button></div></div> <!> <div class="list svelte-16699lq"><!> <!></div></div>');function hg(a,t){vt(t,!0);const n=I(mt),r=500,o=64;let c=W(Be([])),l=W(""),i=W(""),u=W(null);function f(){return new Date().toISOString()}async function h(){try{v(c,await mc(),!0)}catch{}}rn(()=>{h()}),St(()=>{if(!e(u))return;const B=window.setTimeout(()=>v(u,null),3e3);return()=>window.clearTimeout(B)});function g(){const B=e(l).trim();return B.length<1?e(n).settings.motto.textRequired:B.length>r?e(n).settings.motto.textTooLong:e(i).trim().length>o?e(n).settings.motto.authorTooLong:null}async function _(){const B=g();if(B){v(u,B,!0);return}try{await Hv({id:crypto.randomUUID(),text:e(l).trim(),author:e(i).trim()||null,created_at:f(),updated_at:f()}),v(l,""),v(i,""),await h(),ji()}catch(R){v(u,String(R),!0)}}async function b(B){try{await Uv(B),await h(),ji()}catch(R){v(u,String(R),!0)}}var w=fg(),x=s(w),S=s(x),C=d(x,2),z=s(C);O(z,"rows",2);var y=d(z,2),q=s(y),T=d(q,2),N=s(T);Wn(N,{size:14});var L=d(N),ae=d(C,2);{var ne=B=>{var R=dg(),ce=s(R);M(()=>p(ce,e(u))),m(B,R)};oe(ae,B=>{e(u)&&B(ne)})}var re=d(ae,2),ee=s(re);{var Q=B=>{var R=ug(),ce=s(R);M(()=>p(ce,e(n).settings.motto.empty)),m(B,R)};oe(ee,B=>{e(c).length===0&&B(Q)})}var se=d(ee,2);Ce(se,17,()=>e(c),B=>B.id,(B,R)=>{var ce=vg(),he=s(ce),me=s(he),ye=s(me),je=d(me,2),Ze=s(je),D=d(he,2),A=s(D);mo(A,{size:14}),M(F=>{p(ye,e(R).text),p(Ze,`—— ${F??""}`),O(D,"aria-label",e(n).settings.list.del)},[()=>{var F;return(F=e(R).author)!=null&&F.trim()?e(R).author:e(n).settings.motto.defaultAuthor}]),G("click",D,()=>void b(e(R).id)),m(B,ce)}),M(()=>{p(S,e(n).settings.motto.title),O(z,"placeholder",e(n).settings.motto.addPlaceholder),O(q,"placeholder",e(n).settings.motto.authorPlaceholder),p(L,` ${e(n).settings.motto.addBtn??""}`)}),wt(z,()=>e(l),B=>v(l,B)),G("keydown",q,B=>{B.key==="Enter"&&_()}),wt(q,()=>e(i),B=>v(i,B)),G("click",T,_),m(a,w),ft()}yt(["keydown","click"]);var _g=E("<option> </option>"),pg=E('<div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style-desc"> </label> <input id="notif-style-desc" type="text" class="text-input svelte-s7babn"/></div>'),gg=E('<span class="saved svelte-s7babn"> </span>'),mg=E('<span class="save-error svelte-s7babn" role="alert"> </span>'),bg=E('<div class="setting svelte-s7babn"><h2 class="tab-title svelte-s7babn"> </h2> <div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style"> </label> <select id="notif-style" class="select svelte-s7babn"></select> <p class="hint svelte-s7babn"> </p></div> <!> <div class="fields svelte-s7babn"><section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-fe-title"> </label> <input id="ntf-fe-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-fe-body"> </label> <input id="ntf-fe-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-be-title"> </label> <input id="ntf-be-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-be-body"> </label> <input id="ntf-be-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-rm-title"> </label> <input id="ntf-rm-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-rm-body"> </label> <input id="ntf-rm-body" type="text" class="text-input svelte-s7babn"/> <p class="hint svelte-s7babn"> </p></section></div> <div class="save-row svelte-s7babn"><button type="button" class="save-btn svelte-s7babn"><!> </button> <!> <!></div></div>');function yg(a,t){vt(t,!0);const n=I(mt),r=I(yo);let o=W("default"),c=W(""),l=W(null),i=W(Be({focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""})),u=W(!1),f=W(null);const h=I(()=>e(o)==="custom");rn(()=>{bc().then($=>{v(o,$.style||"default",!0),v(c,$.style_description||"",!0),v(l,$,!0)}).catch(()=>{})}),St(()=>{if(e(h))e(l)&&v(i,{focus_end_title:e(l).focus_end_title||"",focus_end_body:e(l).focus_end_body||"",break_end_title:e(l).break_end_title||"",break_end_body:e(l).break_end_body||"",reminder_title:e(l).reminder_title||"",reminder_body:e(l).reminder_body||""},!0);else{const $=(e(r)==="en"?ic:sc)[e(o)];v(i,{focus_end_title:$.focus_end_title,focus_end_body:$.focus_end_body,break_end_title:$.break_end_title,break_end_body:$.break_end_body,reminder_title:$.reminder_title,reminder_body:$.reminder_body},!0)}});async function g(){v(f,null);const $={id:"1",style:e(o),style_description:e(h)?e(c):null,focus_end_title:e(i).focus_end_title,focus_end_body:e(i).focus_end_body,break_end_title:e(i).break_end_title,break_end_body:e(i).break_end_body,reminder_title:e(i).reminder_title,reminder_body:e(i).reminder_body};try{const V=await Wv($);v(l,V,!0),await kc(),v(u,!0),window.setTimeout(()=>v(u,!1),2e3)}catch(V){v(f,String(V),!0)}}var _=bg(),b=s(_),w=s(b),x=d(b,2),S=s(x),C=s(S),z=d(S,2);Ce(z,21,()=>Tv,$=>$.key,($,V)=>{var X=_g(),De=s(X),Se={};M(()=>{p(De,e(n).settings.notification.styleName[e(V).key]),Se!==(Se=e(V).key)&&(X.value=(X.__value=e(V).key)??"")}),m($,X)});var y=d(z,2),q=s(y),T=d(x,2);{var N=$=>{var V=pg(),X=s(V),De=s(X),Se=d(X,2);M(()=>{p(De,e(n).settings.notification.styleDesc),O(Se,"placeholder",e(n).settings.notification.styleDescPlaceholder)}),wt(Se,()=>e(c),Ue=>v(c,Ue)),m($,V)};oe(T,$=>{e(h)&&$(N)})}var L=d(T,2),ae=s(L),ne=s(ae),re=s(ne),ee=d(ne,2),Q=s(ee),se=d(ee,2),B=d(se,2),R=s(B),ce=d(B,2),he=d(ae,2),me=s(he),ye=s(me),je=d(me,2),Ze=s(je),D=d(je,2),A=d(D,2),F=s(A),Y=d(A,2),fe=d(he,2),be=s(fe),le=s(be),pe=d(be,2),H=s(pe),ie=d(pe,2),ue=d(ie,2),ke=s(ue),Pe=d(ue,2),Fe=d(Pe,2),ze=s(Fe),U=d(L,2),ve=s(U),we=s(ve);nv(we,{size:14});var Z=d(we),k=d(ve,2);{var P=$=>{var V=gg(),X=s(V);M(()=>p(X,e(n).settings.notification.saved)),m($,V)};oe(k,$=>{e(u)&&$(P)})}var J=d(k,2);{var K=$=>{var V=mg(),X=s(V);M(()=>p(X,e(f))),m($,V)};oe(J,$=>{e(f)&&$(K)})}M(()=>{p(w,e(n).settings.notification.title),p(C,e(n).settings.notification.styleLabel),p(q,e(h)?e(n).settings.notification.styleHintCustom:e(n).settings.notification.styleHintPreset),p(re,e(n).settings.notification.focusEnd),p(Q,e(n).settings.notification.titleLabel),se.disabled=!e(h),p(R,e(n).settings.notification.bodyLabel),ce.disabled=!e(h),p(ye,e(n).settings.notification.breakEnd),p(Ze,e(n).settings.notification.titleLabel),D.disabled=!e(h),p(F,e(n).settings.notification.bodyLabel),Y.disabled=!e(h),p(le,e(n).settings.notification.reminder),p(H,e(n).settings.notification.titleLabel),ie.disabled=!e(h),p(ke,e(n).settings.notification.bodyLabel),Pe.disabled=!e(h),p(ze,e(n).settings.notification.placeholderHint),p(Z,` ${e(n).settings.notification.save??""}`)}),eo(z,()=>e(o),$=>v(o,$)),wt(se,()=>e(i).focus_end_title,$=>e(i).focus_end_title=$),wt(ce,()=>e(i).focus_end_body,$=>e(i).focus_end_body=$),wt(D,()=>e(i).break_end_title,$=>e(i).break_end_title=$),wt(Y,()=>e(i).break_end_body,$=>e(i).break_end_body=$),wt(ie,()=>e(i).reminder_title,$=>e(i).reminder_title=$),wt(Pe,()=>e(i).reminder_body,$=>e(i).reminder_body=$),G("click",ve,g),m(a,_),ft()}yt(["click"]);var kg=E('<span class="badge svelte-hb0yns"><!></span>'),wg=E('<button type="button"><!> <span class="label svelte-hb0yns"> </span> <span class="sub svelte-hb0yns"> </span></button>'),xg=E('<div><h2 class="tab-title svelte-hb0yns"> </h2> <p class="desc svelte-hb0yns"> </p> <div class="options svelte-hb0yns"></div></div>');function Sg(a,t){vt(t,!0);const n=I(mt),r=I(yo),o=[{key:"zh",label:"中文",sub:"Chinese"},{key:"en",label:"English",sub:"英文"}];var c=xg(),l=s(c),i=s(l),u=d(l,2),f=s(u),h=d(u,2);Ce(h,21,()=>o,g=>g.key,(g,_)=>{const b=I(()=>e(r)===e(_).key);var w=wg();let x;var S=s(w);{var C=N=>{var L=kg(),ae=s(L);za(ae,{size:16}),m(N,L)};oe(S,N=>{e(b)&&N(C)})}var z=d(S,2),y=s(z),q=d(z,2),T=s(q);M(()=>{x=Ge(w,1,"option svelte-hb0yns",null,x,{active:e(b)}),O(w,"aria-pressed",e(b)),p(y,e(_).label),p(T,e(_).sub)}),G("click",w,()=>kv(e(_).key)),m(g,w)}),M(()=>{p(i,e(n).settings.language.title),p(f,e(n).settings.language.desc)}),m(a,c),ft()}yt(["click"]);var Tg=E('<span class="indicator svelte-uox1oc" aria-hidden="true"></span>'),Dg=E('<button type="button"><!> <!> </button>'),Pg=E('<div class="account-placeholder svelte-uox1oc"><p class="svelte-uox1oc"> </p></div>'),Mg=E('<div class="settings-page page-veil svelte-uox1oc"><aside class="menu svelte-uox1oc"><nav class="menu-nav svelte-uox1oc"></nav></aside> <main class="content svelte-uox1oc"><div class="card svelte-uox1oc"><!></div></main></div>');function Eg(a,t){vt(t,!0);const n=I(mt);let r=W("timer");const o=I(()=>[{key:"account",icon:vv,label:e(n).settings.tab.account},{key:"timer",icon:gr,label:e(n).settings.tab.timer},{key:"lists",icon:Xl,label:e(n).settings.tab.lists},{key:"tags",icon:dv,label:e(n).settings.tab.tags},{key:"theme",icon:Zu,label:e(n).settings.tab.theme},{key:"motto",icon:Zl,label:e(n).settings.tab.motto},{key:"notification",icon:zu,label:e(n).settings.tab.notification},{key:"language",icon:Qu,label:e(n).settings.tab.language}]);var c=Mg();Nr("uox1oc",y=>{Mr(()=>{Jn.title=e(n).page.settings??""})});var l=s(c),i=s(l);Ce(i,21,()=>e(o),y=>y.key,(y,q)=>{const T=I(()=>e(r)===e(q).key);var N=Dg();let L;var ae=s(N);{var ne=Q=>{var se=Tg();m(Q,se)};oe(ae,Q=>{e(T)&&Q(ne)})}var re=d(ae,2);Cr(re,()=>e(q).icon,(Q,se)=>{se(Q,{size:16})});var ee=d(re);M(()=>{L=Ge(N,1,"menu-item svelte-uox1oc",null,L,{active:e(T)}),O(N,"aria-current",e(T)?"true":void 0),p(ee,` ${e(q).label??""}`)}),G("click",N,()=>v(r,e(q).key,!0)),m(y,N)});var u=d(l,2),f=s(u),h=s(f);{var g=y=>{var q=Pg(),T=s(q),N=s(T);M(()=>p(N,e(n).settings.accountNotOpen)),m(y,q)},_=y=>{Ap(y,{})},b=y=>{Kp(y,{})},w=y=>{tg(y,{})},x=y=>{cg(y,{})},S=y=>{hg(y,{})},C=y=>{yg(y,{})},z=y=>{Sg(y,{})};oe(h,y=>{e(r)==="account"?y(g):e(r)==="timer"?y(_,1):e(r)==="lists"?y(b,2):e(r)==="tags"?y(w,3):e(r)==="theme"?y(x,4):e(r)==="motto"?y(S,5):e(r)==="notification"?y(C,6):e(r)==="language"&&y(z,7)})}m(a,c),ft()}yt(["click"]);var Cg=E('<button type="button"><!> </button>'),Ng=E('<br/> <span class="sub svelte-k6bk06"> </span>',1),jg=E('<li class="svelte-k6bk06"> <!></li>'),Fg=E('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <ul class="svelte-k6bk06"></ul></section>'),Ag=E('<div class="manual svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),Ig=E('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p></section>'),qg=E('<div class="faq"><h2 class="svelte-k6bk06"> </h2> <!></div>'),Rg=E('<li class="svelte-k6bk06"> </li>'),Lg=E('<div class="contact"><h2 class="svelte-k6bk06"> </h2> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>522988349@qq.com</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>18688994926</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span> </span></div></div> <div class="feedback svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono svelte-k6bk06"> </div> <div class="hint svelte-k6bk06"> </div></div> <div><span class="lbl xs svelte-k6bk06"> </span> <ul class="body-items svelte-k6bk06"></ul></div> <div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono muted svelte-k6bk06"> </div></div></div></div></div>'),Og=E('<div class="help-page page-veil svelte-k6bk06"><aside class="menu svelte-k6bk06"><nav class="menu-nav"></nav></aside> <main class="content svelte-k6bk06"><div class="card svelte-k6bk06"><!></div></main></div>');function Bg(a,t){vt(t,!0);const n=I(mt);let r=W("manual");const o=["timer","tasks","reminder","repeat","journal","stats","settings"];var c=Og();Nr("k6bk06",w=>{Mr(()=>{Jn.title=`${e(n).nav.help??""} - PomoFlow`})});var l=s(c),i=s(l);Ce(i,21,()=>[{key:"manual",icon:Hu},{key:"faq",icon:Ql},{key:"contact",icon:Xu}],w=>w.key,(w,x)=>{const S=I(()=>e(r)===e(x).key);var C=Cg();let z;var y=s(C);Cr(y,()=>e(x).icon,(T,N)=>{N(T,{size:16})});var q=d(y);M(()=>{z=Ge(C,1,"menu-item svelte-k6bk06",null,z,{active:e(S)}),O(C,"aria-current",e(S)?"true":void 0),p(q,` ${e(n).help.tab[e(x).key]??""}`)}),G("click",C,()=>v(r,e(x).key,!0)),m(w,C)});var u=d(l,2),f=s(u),h=s(f);{var g=w=>{var x=Ag(),S=s(x),C=s(S),z=d(S,2);Ce(z,16,()=>o,y=>y,(y,q)=>{const T=I(()=>e(n).help.manual[q]);var N=Fg(),L=s(N),ae=s(L),ne=d(L,2);Ce(ne,21,()=>e(T).items,Ha,(re,ee)=>{const Q=I(()=>e(ee));var se=jg(),B=s(se),R=d(B);{var ce=he=>{var me=Ng(),ye=d(Ne(me),2),je=s(ye);M(()=>p(je,e(Q).sub)),m(he,me)};oe(R,he=>{e(Q).sub&&he(ce)})}M(()=>p(B,`${e(Q).text??""} `)),m(re,se)}),M(()=>p(ae,e(T).title)),m(y,N)}),M(()=>p(C,e(n).help.tab.manual)),m(w,x)},_=w=>{var x=qg(),S=s(x),C=s(S),z=d(S,2);Ce(z,17,()=>e(n).help.faq.items,Ha,(y,q)=>{var T=Ig(),N=s(T),L=s(N),ae=d(N,2),ne=s(ae);M(()=>{p(L,`Q: ${e(q).q??""}`),p(ne,`A: ${e(q).a??""}`)}),m(y,T)}),M(()=>p(C,e(n).help.tab.faq)),m(w,x)},b=w=>{const x=I(()=>e(n).help.contact);var S=Lg(),C=s(S),z=s(C),y=d(C,2),q=s(y),T=d(y,2),N=s(T),L=s(N),ae=s(L),ne=d(N,2),re=s(ne),ee=s(re),Q=d(ne,2),se=s(Q),B=s(se),R=d(se,2),ce=s(R),he=d(T,2),me=s(he),ye=s(me),je=d(me,2),Ze=s(je),D=d(je,2),A=s(D),F=s(A),Y=s(F),fe=d(F,2),be=s(fe),le=d(fe,2),pe=s(le),H=d(A,2),ie=s(H),ue=s(ie),ke=d(ie,2);Ce(ke,21,()=>e(x).bodyItems,Ha,(we,Z)=>{var k=Rg(),P=s(k);M(()=>p(P,e(Z))),m(we,k)});var Pe=d(H,2),Fe=s(Pe),ze=s(Fe),U=d(Fe,2),ve=s(U);M(()=>{p(z,e(n).help.tab.contact),p(q,e(x).intro),p(ae,e(x).emailLabel),p(ee,e(x).phoneLabel),p(B,e(x).workHoursLabel),p(ce,e(x).workHours),p(ye,e(x).feedbackTitle),p(Ze,e(x).feedbackDesc),p(Y,e(x).subjectLabel),p(be,e(x).subjectFormat),p(pe,e(x).subjectHint),p(ue,e(x).bodyLabel),p(ze,e(x).exampleLabel),p(ve,e(x).exampleText)}),m(w,S)};oe(h,w=>{e(r)==="manual"?w(g):e(r)==="faq"?w(_,1):w(b,-1)})}m(a,c),ft()}yt(["click"]);var zg=E("<button><!> </button>"),Hg=E('<main class="app app-bg svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true"><!></span> <h1 class="svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function Ug(a,t){vt(t,!0);const n=I(mt);Kf(),St(()=>{if(!zs().running)return;const q=setInterval(()=>hf(),1e3);return()=>clearInterval(q)}),rn(()=>{kc(),document.addEventListener("visibilitychange",()=>{document.hidden||_f()}),yf(),Nf(),(async()=>{try{const{isPermissionGranted:y,requestPermission:q}=await qu(async()=>{const{isPermissionGranted:T,requestPermission:N}=await Promise.resolve().then(()=>lf);return{isPermissionGranted:T,requestPermission:N}},void 0);await y()||await q()}catch{}})()});const r=I(_v),o={timer:gr,tasks:Xl,stats:qs,settings:ov,help:Ql};var c=Hg(),l=s(c),i=s(l),u=s(i),f=s(u);Pc(f,{size:26});var h=d(i,2);Ce(h,21,()=>pv,y=>y.path,(y,q)=>{const T=I(()=>o[e(q).labelKey]);var N=zg();let L;var ae=s(N);Cr(ae,()=>e(T),(re,ee)=>{ee(re,{size:18})});var ne=d(ae);M(()=>{L=Ge(N,1,"nav-item svelte-1n46o8q",null,L,{active:e(r)===e(q).path}),O(N,"aria-current",e(r)===e(q).path?"page":void 0),p(ne,` ${e(n).nav[e(q).labelKey]??""}`)}),G("click",N,()=>ac(e(q).path)),m(y,N)});var g=d(l,2),_=s(g);{var b=y=>{Ii(y,{})},w=y=>{np(y,{})},x=y=>{Pp(y,{})},S=y=>{Eg(y,{})},C=y=>{Bg(y,{})},z=y=>{Ii(y,{})};oe(_,y=>{e(r)==="/timer"?y(b):e(r)==="/tasks"?y(w,1):e(r)==="/stats"?y(x,2):e(r)==="/settings"?y(S,3):e(r)==="/help"?y(C,4):y(z,-1)})}M(()=>O(h,"aria-label",e(n).nav.mainNav)),m(a,c),ft()}yt(["click"]);uu(Ug,{target:document.getElementById("app")});
