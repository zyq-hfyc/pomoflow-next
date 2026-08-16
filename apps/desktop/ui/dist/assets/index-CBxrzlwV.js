var Us=Object.defineProperty;var jl=e=>{throw TypeError(e)};var Hs=(e,t,n)=>t in e?Us(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Et=(e,t,n)=>Hs(e,typeof t!="symbol"?t+"":t,n),ga=(e,t,n)=>t.has(e)||jl("Cannot "+n);var m=(e,t,n)=>(ga(e,t,"read from private field"),n?n.call(e):t.get(e)),Ce=(e,t,n)=>t.has(e)?jl("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Te=(e,t,n,a)=>(ga(e,t,"write to private field"),a?a.call(e,n):t.set(e,n),n),Le=(e,t,n)=>(ga(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();const hi=!1;var ol=Array.isArray,Ys=Array.prototype.indexOf,ea=Array.prototype.includes,da=Array.from,Ws=Object.defineProperty,kn=Object.getOwnPropertyDescriptor,_i=Object.getOwnPropertyDescriptors,Vs=Object.prototype,Gs=Array.prototype,cl=Object.getPrototypeOf,Dl=Object.isExtensible;function _r(e){return typeof e=="function"}const Ks=()=>{};function Xs(e){return e()}function Fa(e){for(var t=0;t<e.length;t++)e[t]()}function pi(){var e,t,n=new Promise((a,l)=>{e=a,t=l});return{promise:n,resolve:e,reject:t}}function gi(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const n=[];for(const a of e)if(n.push(a),n.length===t)break;return n}const ut=2,nr=4,Or=8,ul=1<<24,Kt=16,Ut=32,pn=64,Aa=128,Bt=512,ot=1024,it=2048,Jt=4096,St=8192,Ot=16384,or=32768,Oa=1<<25,Sn=65536,ta=1<<17,bi=1<<18,cr=1<<19,mi=1<<20,nn=1<<25,Rn=65536,na=1<<21,Vn=1<<22,xn=1<<23,ln=Symbol("$state"),yi=Symbol("legacy props"),Js=Symbol(""),Vr=Symbol("attributes"),Ia=Symbol("class"),La=Symbol("style"),mr=Symbol("text"),Gr=Symbol("form reset"),Ir=new class extends Error{constructor(){super(...arguments);Et(this,"name","StaleReactionError");Et(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var vi;const fa=!!((vi=globalThis.document)!=null&&vi.contentType)&&globalThis.document.contentType.includes("xml");function Zs(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Qs(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function $s(e,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function eo(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function to(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function no(e){throw new Error("https://svelte.dev/e/effect_orphan")}function ro(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function ao(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function lo(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function io(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function so(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function oo(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const co=1,uo=2,wi=4,vo=8,fo=16,ho=1,_o=2,ki=4,po=8,go=16,xi=1,bo=2,lt=Symbol("uninitialized"),Si="http://www.w3.org/1999/xhtml",mo="http://www.w3.org/2000/svg",yo="@attach";function wo(){console.warn("https://svelte.dev/e/derived_inert")}function ko(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function xo(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Ti(e){return e===this.v}function So(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Mi(e){return!So(e,this.v)}let ur=!1,To=!1;function Mo(){ur=!0}let et=null;function rr(e){et=e}function rt(e,t=!1,n){et={p:et,i:!1,c:null,e:null,s:e,x:null,r:qe,l:ur&&!t?{s:null,u:null,$:[]}:null}}function at(e){var t=et,n=t.e;if(n!==null){t.e=null;for(var a of n)Xi(a)}return t.i=!0,et=t.p,{}}function Lr(){return!ur||et!==null&&et.l===null}let Pn=[];function Pi(){var e=Pn;Pn=[],Fa(e)}function rn(e){if(Pn.length===0&&!Mr){var t=Pn;queueMicrotask(()=>{t===Pn&&Pi()})}Pn.push(e)}function Po(){for(;Pn.length>0;)Pi()}function ji(e){var t=qe;if(t===null)return Fe.f|=xn,e;if((t.f&or)===0&&(t.f&nr)===0)throw e;wn(e,t)}function wn(e,t){if(!(t!==null&&(t.f&Ot)!==0)){for(;t!==null;){if((t.f&Aa)!==0){if((t.f&or)===0)throw e;try{t.b.error(e);return}catch(n){e=n}}t=t.parent}throw e}}const jo=-7169;function nt(e,t){e.f=e.f&jo|t}function vl(e){(e.f&Bt)!==0||e.deps===null?nt(e,ot):nt(e,Jt)}function Di(e){if(e!==null)for(const t of e)(t.f&ut)===0||(t.f&Rn)===0||(t.f^=Rn,Di(t.deps))}function Ei(e,t,n){(e.f&it)!==0?t.add(e):(e.f&Jt)!==0&&n.add(e),Di(e.deps),nt(e,ot)}let Yr=!1;function Do(e){var t=Yr;try{return Yr=!1,[e(),Yr]}finally{Yr=t}}function Kr(e,t){if(t){const n=document.body;e.autofocus=!0,rn(()=>{document.activeElement===n&&e.focus()})}}let El=!1;function Eo(){El||(El=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n[Gr])==null||t.call(n)})},{capture:!0}))}function vr(e){var t=Fe,n=qe;Ht(null),Yt(null);try{return e()}finally{Ht(t),Yt(n)}}function Ci(e,t,n,a=n){e.addEventListener(t,()=>vr(n));const l=e[Gr];l?e[Gr]=()=>{l(),a(!0)}:e[Gr]=()=>a(!0),Eo()}function Co(e){let t=0,n=Tn(0),a;return()=>{gl()&&(r(n),bl(()=>(t===0&&(a=bt(()=>e(()=>Pr(n)))),t+=1,()=>{rn(()=>{t-=1,t===0&&(a==null||a(),a=void 0,Pr(n))})})))}}var qo=Sn|cr;function No(e,t,n,a){new Fo(e,t,n,a)}var Lt,sl,Rt,Cn,Mt,zt,yt,qt,un,qn,mn,Xn,Cr,qr,vn,ca,Ze,Ao,Oo,Ra,Io,za,Xr,Jr,Ba,Ua;class Fo{constructor(t,n,a,l){Ce(this,Ze);Et(this,"parent");Et(this,"is_pending",!1);Et(this,"transform_error");Ce(this,Lt);Ce(this,sl,null);Ce(this,Rt);Ce(this,Cn);Ce(this,Mt);Ce(this,zt,null);Ce(this,yt,null);Ce(this,qt,null);Ce(this,un,null);Ce(this,qn,0);Ce(this,mn,0);Ce(this,Xn,!1);Ce(this,Cr,new Set);Ce(this,qr,new Set);Ce(this,vn,null);Ce(this,ca,Co(()=>(Te(this,vn,Tn(m(this,qn))),()=>{Te(this,vn,null)})));var i;Te(this,Lt,t),Te(this,Rt,n),Te(this,Cn,s=>{var o=qe;o.b=this,o.f|=Aa,a(s)}),this.parent=qe.b,this.transform_error=l??((i=this.parent)==null?void 0:i.transform_error)??(s=>s),Te(this,Mt,fr(()=>{Le(this,Ze,za).call(this)},qo))}defer_effect(t){Ei(t,m(this,Cr),m(this,qr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!m(this,Rt).pending}update_pending_count(t,n){Le(this,Ze,Ba).call(this,t,n),Te(this,qn,m(this,qn)+t),!(!m(this,vn)||m(this,Xn))&&(Te(this,Xn,!0),rn(()=>{Te(this,Xn,!1),m(this,vn)&&lr(m(this,vn),m(this,qn))}))}get_effect_pending(){return m(this,ca).call(this),r(m(this,vn))}error(t){if(!m(this,Rt).onerror&&!m(this,Rt).failed)throw t;me!=null&&me.is_fork?(m(this,zt)&&me.skip_effect(m(this,zt)),m(this,yt)&&me.skip_effect(m(this,yt)),m(this,qt)&&me.skip_effect(m(this,qt)),me.oncommit(()=>{Le(this,Ze,Ua).call(this,t)})):Le(this,Ze,Ua).call(this,t)}}Lt=new WeakMap,sl=new WeakMap,Rt=new WeakMap,Cn=new WeakMap,Mt=new WeakMap,zt=new WeakMap,yt=new WeakMap,qt=new WeakMap,un=new WeakMap,qn=new WeakMap,mn=new WeakMap,Xn=new WeakMap,Cr=new WeakMap,qr=new WeakMap,vn=new WeakMap,ca=new WeakMap,Ze=new WeakSet,Ao=function(){try{Te(this,zt,wt(()=>m(this,Cn).call(this,m(this,Lt))))}catch(t){this.error(t)}},Oo=function(t){const n=m(this,Rt).failed,{reset:a,invoke_onerror:l}=Le(this,Ze,Ra).call(this,t);rn(l),n&&Te(this,qt,wt(()=>{n(m(this,Lt),()=>t,()=>a)}))},Ra=function(t){var n=!1,a=!1;const l=()=>{if(n){xo();return}n=!0,a&&oo(),m(this,qt)!==null&&In(m(this,qt),()=>{Te(this,qt,null)}),Le(this,Ze,Jr).call(this,()=>{Le(this,Ze,za).call(this)})};return{reset:l,invoke_onerror:()=>{var s,o;try{a=!0,(o=(s=m(this,Rt)).onerror)==null||o.call(s,t,l),a=!1}catch(c){wn(c,m(this,Mt)&&m(this,Mt).parent)}}}},Io=function(){const t=m(this,Rt).pending;t&&(this.is_pending=!0,Te(this,yt,wt(()=>t(m(this,Lt)))),rn(()=>{var n=Te(this,un,document.createDocumentFragment()),a=Zt();n.append(a),Te(this,zt,Le(this,Ze,Jr).call(this,()=>wt(()=>m(this,Cn).call(this,a)))),m(this,mn)===0&&(m(this,Lt).before(n),Te(this,un,null),In(m(this,yt),()=>{Te(this,yt,null)}),Le(this,Ze,Xr).call(this,me))}))},za=function(){try{if(this.is_pending=this.has_pending_snippet(),Te(this,mn,0),Te(this,qn,0),Te(this,zt,wt(()=>{m(this,Cn).call(this,m(this,Lt))})),m(this,mn)>0){var t=Te(this,un,document.createDocumentFragment());yl(m(this,zt),t);const n=m(this,Rt).pending;Te(this,yt,wt(()=>n(m(this,Lt))))}else Le(this,Ze,Xr).call(this,me)}catch(n){this.error(n)}},Xr=function(t){this.is_pending=!1,t.transfer_effects(m(this,Cr),m(this,qr))},Jr=function(t){var n=qe,a=Fe,l=et;Yt(m(this,Mt)),Ht(m(this,Mt)),rr(m(this,Mt).ctx);try{return zn.ensure(),t()}catch(i){return ji(i),null}finally{Yt(n),Ht(a),rr(l)}},Ba=function(t,n){var a;if(!this.has_pending_snippet()){this.parent&&Le(a=this.parent,Ze,Ba).call(a,t,n);return}Te(this,mn,m(this,mn)+t),m(this,mn)===0&&(Le(this,Ze,Xr).call(this,n),m(this,yt)&&In(m(this,yt),()=>{Te(this,yt,null)}),m(this,un)&&(m(this,Lt).before(m(this,un)),Te(this,un,null)))},Ua=function(t){m(this,zt)&&(_t(m(this,zt)),Te(this,zt,null)),m(this,yt)&&(_t(m(this,yt)),Te(this,yt,null)),m(this,qt)&&(_t(m(this,qt)),Te(this,qt,null));let n=m(this,Rt).failed;const a=l=>{const{reset:i,invoke_onerror:s}=Le(this,Ze,Ra).call(this,l);s(),n&&Te(this,qt,Le(this,Ze,Jr).call(this,()=>{try{return wt(()=>{var o=qe;o.b=this,o.f|=Aa,n(m(this,Lt),()=>l,()=>i)})}catch(o){return wn(o,m(this,Mt).parent),null}}))};rn(()=>{var l;try{l=this.transform_error(t)}catch(i){wn(i,m(this,Mt)&&m(this,Mt).parent);return}l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(a,i=>wn(i,m(this,Mt)&&m(this,Mt).parent)):a(l)})};function qi(e,t,n,a){const l=Lr()?ar:dl;var i=e.filter(p=>!p.settled),s=t.map(l);if(n.length===0&&i.length===0){a(s);return}var o=qe,c=Lo(),u=i.length===1?i[0].promise:i.length>1?Promise.all(i.map(p=>p.promise)):null;function f(p){if((o.f&Ot)===0){c();try{a([...s,...p])}catch(g){wn(g,o)}ra()}}var b=Ni();if(n.length===0){u.then(()=>f([])).finally(b);return}function _(){Promise.all(n.map(p=>Ro(p))).then(f).catch(p=>wn(p,o)).finally(b)}u?u.then(()=>{c(),_(),ra()}):_()}function Lo(){var e=qe,t=Fe,n=et,a=me;return function(i=!0){Yt(e),Ht(t),rr(n),i&&(e.f&Ot)===0&&(a==null||a.activate(),a==null||a.apply())}}function ra(e=!0){Yt(null),Ht(null),rr(null),e&&(me==null||me.deactivate())}function Ni(){var e=qe,t=e.b,n=me,a=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(a,e),()=>{t==null||t.update_pending_count(-1,n),n.decrement(a,e)}}function ar(e){var t=ut|it;return qe!==null&&(qe.f|=cr),{ctx:et,deps:null,effects:null,equals:Ti,f:t,fn:e,reactions:null,rv:0,v:lt,wv:0,parent:qe,ac:null}}const yr=Symbol("obsolete");function Ro(e,t,n){let a=qe;a===null&&Qs();var l=void 0,i=Tn(lt),s=!Fe,o=new Set;return ec(()=>{var p,g;var c=qe,u=pi();l=u.promise;try{Promise.resolve(e()).then(u.resolve,k=>{k!==Ir&&u.reject(k)}).finally(ra)}catch(k){u.reject(k),ra()}var f=me;if(s){if((c.f&or)!==0)var b=Ni();if((p=a.b)!=null&&p.is_rendered())(g=f.async_deriveds.get(c))==null||g.reject(yr);else for(const k of o.values())k.reject(yr);o.add(u),f.async_deriveds.set(c,u)}const _=(k,w=void 0)=>{b==null||b(),o.delete(u),w!==yr&&(f.activate(),w?(i.f|=xn,lr(i,w)):((i.f&xn)!==0&&(i.f^=xn),lr(i,k)),f.deactivate())};u.promise.then(_,k=>_(null,k||"unknown"))}),ha(()=>{for(const c of o)c.reject(yr)}),new Promise(c=>{function u(f){function b(){f===l?c(i):u(l)}f.then(b,b)}u(l)})}function $(e){const t=ar(e);return ts(t),t}function dl(e){const t=ar(e);return t.equals=Mi,t}function zo(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)_t(t[n])}}function fl(e){var t,n=qe,a=e.parent;if(!gn&&a!==null&&e.v!==lt&&(a.f&(Ot|St))!==0)return wo(),e.v;Yt(a);try{e.f&=~Rn,zo(e),t=ls(e)}finally{Yt(n)}return t}function Fi(e){var t=fl(e);if(!e.equals(t)&&(e.wv=rs(),(!(me!=null&&me.is_fork)||e.deps===null)&&(me!==null?(me.capture(e,t,!0),Tr==null||Tr.capture(e,t,!0)):e.v=t,e.deps===null))){nt(e,ot);return}gn||(ft!==null?(gl()||me!=null&&me.is_fork)&&ft.set(e,t):vl(e))}function Bo(e){var t;if(e.effects!==null)for(const n of e.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&vr(()=>{n.ac.abort(Ir),n.ac=null}),n.fn!==null&&(n.teardown=Ks),Er(n,0),ml(n))}function Ai(e){if(e.effects!==null)for(const t of e.effects)t.teardown&&t.fn!==null&&ir(t)}let ba=null,Hn=null,me=null,Tr=null,ft=null,Ha=null,Mr=!1,ma=!1,Wn=null,Zr=null;var Cl=0;let Uo=1;var Jn,yn,Nn,Zn,Qn,$n,dn,er,Pt,Nr,fn,Vt,en,tr,Fn,Ye,Ya,wr,Wa,Oi,Ii,Yn,Ho,kr;const ua=class ua{constructor(){Ce(this,Ye);Et(this,"id",Uo++);Ce(this,Jn,!1);Et(this,"linked",!0);Ce(this,yn,null);Ce(this,Nn,null);Et(this,"async_deriveds",new Map);Et(this,"current",new Map);Et(this,"previous",new Map);Ce(this,Zn,new Set);Ce(this,Qn,new Set);Ce(this,$n,0);Ce(this,dn,new Map);Ce(this,er,null);Ce(this,Pt,[]);Ce(this,Nr,[]);Ce(this,fn,new Set);Ce(this,Vt,new Set);Ce(this,en,new Map);Ce(this,tr,new Set);Et(this,"is_fork",!1);Ce(this,Fn,!1);Hn===null?ba=Hn=this:(Te(Hn,Nn,this),Te(this,yn,Hn)),Hn=this}skip_effect(t){m(this,en).has(t)||m(this,en).set(t,{d:[],m:[]}),m(this,tr).delete(t)}unskip_effect(t,n=a=>this.schedule(a)){var a=m(this,en).get(t);if(a){m(this,en).delete(t);for(var l of a.d)nt(l,it),n(l);for(l of a.m)nt(l,Jt),n(l)}m(this,tr).add(t)}capture(t,n,a=!1){t.v!==lt&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&xn)===0&&(this.current.set(t,[n,a]),ft==null||ft.set(t,n)),this.is_fork||(t.v=n)}activate(){me=this}deactivate(){me=null,ft=null}flush(){try{ma=!0,me=this,Le(this,Ye,wr).call(this)}finally{Cl=0,Ha=null,Wn=null,Zr=null,ma=!1,me=null,ft=null,On.clear()}}discard(){var t;for(const n of m(this,Qn))n(this);m(this,Qn).clear();for(const n of this.async_deriveds.values())n.reject(yr);Le(this,Ye,kr).call(this),(t=m(this,er))==null||t.resolve()}register_created_effect(t){m(this,Nr).push(t)}increment(t,n){if(Te(this,$n,m(this,$n)+1),t){let a=m(this,dn).get(n)??0;m(this,dn).set(n,a+1)}}decrement(t,n){if(Te(this,$n,m(this,$n)-1),t){let a=m(this,dn).get(n)??0;a===1?m(this,dn).delete(n):m(this,dn).set(n,a-1)}m(this,Fn)||(Te(this,Fn,!0),rn(()=>{Te(this,Fn,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const a of t)m(this,fn).add(a);for(const a of n)m(this,Vt).add(a);t.clear(),n.clear()}oncommit(t){m(this,Zn).add(t)}ondiscard(t){m(this,Qn).add(t)}settled(){return(m(this,er)??Te(this,er,pi())).promise}static ensure(){if(me===null){const t=me=new ua;!ma&&!Mr&&rn(()=>{m(t,Jn)||t.flush()})}return me}apply(){{ft=null;return}}schedule(t){var l;if(Ha=t,(l=t.b)!=null&&l.is_pending&&(t.f&(nr|Or|ul))!==0&&(t.f&or)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var a=n.f;if(Wn!==null&&n===qe&&(Fe===null||(Fe.f&ut)===0))return;if((a&(pn|Ut))!==0){if((a&ot)===0)return;n.f^=ot}}m(this,Pt).push(n)}};Jn=new WeakMap,yn=new WeakMap,Nn=new WeakMap,Zn=new WeakMap,Qn=new WeakMap,$n=new WeakMap,dn=new WeakMap,er=new WeakMap,Pt=new WeakMap,Nr=new WeakMap,fn=new WeakMap,Vt=new WeakMap,en=new WeakMap,tr=new WeakMap,Fn=new WeakMap,Ye=new WeakSet,Ya=function(){if(this.is_fork)return!0;for(const a of m(this,dn).keys()){for(var t=a,n=!1;t.parent!==null;){if(m(this,en).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},wr=function(){var c,u,f,b;Te(this,Jn,!0),Cl++>1e3&&(Le(this,Ye,kr).call(this),Wo());for(const _ of m(this,fn))m(this,Vt).delete(_),nt(_,it),this.schedule(_);for(const _ of m(this,Vt))nt(_,Jt),this.schedule(_);const t=m(this,Pt);Te(this,Pt,[]),this.apply();var n=Wn=[],a=[],l=Zr=[];for(const _ of t)try{Le(this,Ye,Wa).call(this,_,n,a)}catch(p){throw zi(_),Le(this,Ye,Ya).call(this)||this.discard(),p}if(me=null,l.length>0){var i=ua.ensure();for(const _ of l)i.schedule(_)}if(Wn=null,Zr=null,Le(this,Ye,Ya).call(this)){Le(this,Ye,Yn).call(this,a),Le(this,Ye,Yn).call(this,n);for(const[_,p]of m(this,en))Ri(_,p);l.length>0&&Le(c=me,Ye,wr).call(c);return}const s=Le(this,Ye,Oi).call(this);if(s){Le(this,Ye,Yn).call(this,a),Le(this,Ye,Yn).call(this,n),Le(u=s,Ye,Ii).call(u,this);return}m(this,fn).clear(),m(this,Vt).clear();for(const _ of m(this,Zn))_(this);m(this,Zn).clear(),Tr=this,ql(a),ql(n),Tr=null,(f=m(this,er))==null||f.resolve();var o=me;if(m(this,$n)===0&&(m(this,Pt).length===0||o!==null)&&Le(this,Ye,kr).call(this),m(this,Pt).length>0)if(o!==null){const _=o;m(_,Pt).push(...m(this,Pt).filter(p=>!m(_,Pt).includes(p)))}else o=this;o!==null&&Le(b=o,Ye,wr).call(b)},Wa=function(t,n,a){t.f^=ot;for(var l=t.first;l!==null;){var i=l.f,s=(i&(Ut|pn))!==0,o=s&&(i&ot)!==0,c=o||(i&St)!==0||m(this,en).has(l);if(!c&&l.fn!==null){s?l.f^=ot:(i&nr)!==0?n.push(l):zr(l)&&((i&Kt)!==0&&m(this,Vt).add(l),ir(l));var u=l.first;if(u!==null){l=u;continue}}for(;l!==null;){var f=l.next;if(f!==null){l=f;break}l=l.parent}}},Oi=function(){for(var t=m(this,yn);t!==null;){if(!t.is_fork){for(const[n,[,a]]of this.current)if(t.current.has(n)&&!a)return t}t=m(t,yn)}return null},Ii=function(t){var a;for(const[l,i]of t.current)!this.previous.has(l)&&t.previous.has(l)&&this.previous.set(l,t.previous.get(l)),this.current.set(l,i);for(const[l,i]of t.async_deriveds){const s=this.async_deriveds.get(l);s&&i.promise.then(s.resolve).catch(s.reject)}t.async_deriveds.clear(),this.transfer_effects(m(t,fn),m(t,Vt));const n=l=>{var i=l.reactions;if(i!==null&&!((l.f&ut)!==0&&(l.f&(it|Jt))===0))for(const c of i){var s=c.f;if((s&ut)!==0)n(c);else{var o=c;s&(Vn|Kt)&&!this.async_deriveds.has(o)&&(m(this,Vt).delete(o),nt(o,it),this.schedule(o))}}};for(const l of this.current.keys())n(l);this.oncommit(()=>t.discard()),Le(a=t,Ye,kr).call(a),me=this,Le(this,Ye,wr).call(this)},Yn=function(t){for(var n=0;n<t.length;n+=1)Ei(t[n],m(this,fn),m(this,Vt))},Ho=function(){var b;for(let _=ba;_!==null;_=m(_,Nn)){var t=_.id<this.id,n=[];for(const[p,[g,k]]of this.current){if(_.current.has(p)){var a=_.current.get(p)[0];if(t&&g!==a)_.current.set(p,[g,k]);else continue}n.push(p)}if(t)for(const[p,g]of this.async_deriveds){const k=_.async_deriveds.get(p);k&&g.promise.then(k.resolve).catch(k.reject)}var l=[..._.current.keys()].filter(p=>!_.current.get(p)[1]);if(!(!m(_,Jn)||l.length===0)){var i=l.filter(p=>!this.current.has(p));if(i.length===0)t&&_.discard();else if(n.length>0){if(t)for(const p of m(this,tr))_.unskip_effect(p,g=>{var k;(g.f&(Kt|Vn))!==0?_.schedule(g):Le(k=_,Ye,Yn).call(k,[g])});_.activate();var s=new Set,o=new Map;for(var c of n)Li(c,i,s,o);o=new Map;var u=[..._.current].filter(([p,g])=>{const k=this.current.get(p);return k?k[0]!==g[0]||k[1]!==g[1]:!0}).map(([p])=>p);if(u.length>0)for(const p of m(this,Nr))(p.f&(Ot|St|ta))===0&&hl(p,u,o)&&((p.f&(Vn|Kt))!==0?(nt(p,it),_.schedule(p)):m(_,fn).add(p));if(m(_,Pt).length>0&&!m(_,Fn)){_.apply();for(var f of m(_,Pt))Le(b=_,Ye,Wa).call(b,f,[],[]);Te(_,Pt,[])}_.deactivate()}}}},kr=function(){if(this.linked){var t=m(this,yn),n=m(this,Nn);t===null?ba=n:Te(t,Nn,n),n===null?Hn=t:Te(n,yn,t),this.linked=!1}};let zn=ua;function Yo(e){var t=Mr;Mr=!0;try{for(var n;;){if(Po(),me===null)return n;me.flush()}}finally{Mr=t}}function Wo(){try{ro()}catch(e){wn(e,Ha)}}let Wt=null;function ql(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var a=e[n++];if((a.f&(Ot|St))===0&&zr(a)&&(Wt=new Set,ir(a),a.deps===null&&a.first===null&&a.nodes===null&&a.teardown===null&&a.ac===null&&Qi(a),(Wt==null?void 0:Wt.size)>0)){On.clear();for(const l of Wt){if((l.f&(Ot|St))!==0)continue;const i=[l];let s=l.parent;for(;s!==null;)Wt.has(s)&&(Wt.delete(s),i.push(s)),s=s.parent;for(let o=i.length-1;o>=0;o--){const c=i[o];(c.f&(Ot|St))===0&&ir(c)}}Wt.clear()}}Wt=null}}function Li(e,t,n,a){if(!n.has(e)&&(n.add(e),e.reactions!==null))for(const l of e.reactions){const i=l.f;(i&ut)!==0?Li(l,t,n,a):(i&(Vn|Kt))!==0&&(i&it)===0&&hl(l,t,a)&&(nt(l,it),_l(l))}}function hl(e,t,n){const a=n.get(e);if(a!==void 0)return a;if(e.deps!==null)for(const l of e.deps){if(ea.call(t,l))return!0;if((l.f&ut)!==0&&hl(l,t,n))return n.set(l,!0),!0}return n.set(e,!1),!1}function _l(e){me.schedule(e)}function Ri(e,t){if(!((e.f&Ut)!==0&&(e.f&ot)!==0)){(e.f&it)!==0?t.d.push(e):(e.f&Jt)!==0&&t.m.push(e),nt(e,ot);for(var n=e.first;n!==null;)Ri(n,t),n=n.next}}function zi(e){nt(e,ot);for(var t=e.first;t!==null;)zi(t),t=t.next}let aa=new Set;const On=new Map;let Bi=!1;function Tn(e,t){var n={f:0,v:e,reactions:null,equals:Ti,rv:0,wv:0};return n}function L(e,t){const n=Tn(e);return ts(n),n}function Vo(e,t=!1,n=!0){var l;const a=Tn(e);return t||(a.equals=Mi),ur&&n&&et!==null&&et.l!==null&&((l=et.l).s??(l.s=[])).push(a),a}function h(e,t,n=!1){Fe!==null&&(!Xt||(Fe.f&ta)!==0)&&Lr()&&(Fe.f&(ut|Kt|Vn|ta))!==0&&(sn===null||!sn.has(e))&&so();let a=n?Ie(t):t;return lr(e,a,Zr)}function lr(e,t,n=null){if(!e.equals(t)){On.set(e,gn?t:e.v);var a=zn.ensure();if(a.capture(e,t),(e.f&ut)!==0){const l=e;(e.f&it)!==0&&fl(l),ft===null&&vl(l)}e.wv=rs(),Ui(e,it,n),Lr()&&qe!==null&&(qe.f&ot)!==0&&(qe.f&(Ut|pn))===0&&(It===null?rc([e]):It.push(e)),!a.is_fork&&aa.size>0&&!Bi&&Go()}return t}function Go(){Bi=!1;for(const e of aa){(e.f&ot)!==0&&nt(e,Jt);let t;try{t=zr(e)}catch{t=!0}t&&ir(e)}aa.clear()}function Nl(e,t=1){var n=r(e),a=t===1?n++:n--;return h(e,n),a}function Pr(e){h(e,e.v+1)}function Ui(e,t,n){var a=e.reactions;if(a!==null)for(var l=Lr(),i=a.length,s=0;s<i;s++){var o=a[s],c=o.f;if(!(!l&&o===qe)){var u=(c&it)===0;if(u&&nt(o,t),(c&ta)!==0)aa.add(o);else if((c&ut)!==0){var f=o;ft==null||ft.delete(f),(c&Rn)===0&&(c&Bt&&(qe===null||(qe.f&na)===0)&&(o.f|=Rn),Ui(f,Jt,n))}else if(u){var b=o;(c&Kt)!==0&&Wt!==null&&Wt.add(b),n!==null?n.push(b):_l(b)}}}}function Ie(e){if(typeof e!="object"||e===null||ln in e)return e;const t=cl(e);if(t!==Vs&&t!==Gs)return e;var n=new Map,a=ol(e),l=L(0),i=Ln,s=o=>{if(Ln===i)return o();var c=Fe,u=Ln;Ht(null),Ol(i);var f=o();return Ht(c),Ol(u),f};return a&&n.set("length",L(e.length)),new Proxy(e,{defineProperty(o,c,u){(!("value"in u)||u.configurable===!1||u.enumerable===!1||u.writable===!1)&&lo();var f=n.get(c);return f===void 0?s(()=>{var b=L(u.value);return n.set(c,b),b}):h(f,u.value,!0),!0},deleteProperty(o,c){var u=n.get(c);if(u===void 0){if(c in o){const f=s(()=>L(lt));n.set(c,f),Pr(l)}}else h(u,lt),Pr(l);return!0},get(o,c,u){var p;if(c===ln)return e;var f=n.get(c),b=c in o;if(f===void 0&&(!b||(p=kn(o,c))!=null&&p.writable)&&(f=s(()=>{var g=Ie(b?o[c]:lt),k=L(g);return k}),n.set(c,f)),f!==void 0){var _=r(f);return _===lt?void 0:_}return Reflect.get(o,c,u)},getOwnPropertyDescriptor(o,c){var u=Reflect.getOwnPropertyDescriptor(o,c);if(u&&"value"in u){var f=n.get(c);f&&(u.value=r(f))}else if(u===void 0){var b=n.get(c),_=b==null?void 0:b.v;if(b!==void 0&&_!==lt)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return u},has(o,c){var _;if(c===ln)return!0;var u=n.get(c),f=u!==void 0&&u.v!==lt||Reflect.has(o,c);if(u!==void 0||qe!==null&&(!f||(_=kn(o,c))!=null&&_.writable)){u===void 0&&(u=s(()=>{var p=f?Ie(o[c]):lt,g=L(p);return g}),n.set(c,u));var b=r(u);if(b===lt)return!1}return f},set(o,c,u,f){var T;var b=n.get(c),_=c in o;if(a&&c==="length")for(var p=u;p<b.v;p+=1){var g=n.get(p+"");g!==void 0?h(g,lt):p in o&&(g=s(()=>L(lt)),n.set(p+"",g))}if(b===void 0)(!_||(T=kn(o,c))!=null&&T.writable)&&(b=s(()=>L(void 0)),h(b,Ie(u)),n.set(c,b));else{_=b.v!==lt;var k=s(()=>Ie(u));h(b,k)}var w=Reflect.getOwnPropertyDescriptor(o,c);if(w!=null&&w.set&&w.set.call(f,u),!_){if(a&&typeof c=="string"){var S=n.get("length"),C=Number(c);Number.isInteger(C)&&C>=S.v&&h(S,C+1)}Pr(l)}return!0},ownKeys(o){r(l);var c=Reflect.ownKeys(o).filter(b=>{var _=n.get(b);return _===void 0||_.v!==lt});for(var[u,f]of n)f.v!==lt&&!(u in o)&&c.push(u);return c},setPrototypeOf(){io()}})}function Fl(e){try{if(e!==null&&typeof e=="object"&&ln in e)return e[ln]}catch{}return e}function Ko(e,t){return Object.is(Fl(e),Fl(t))}var Va,pl,Hi,Yi,Wi;function Xo(){if(Va===void 0){Va=window,pl=document,Hi=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;Yi=kn(t,"firstChild").get,Wi=kn(t,"nextSibling").get,Dl(e)&&(e[Ia]=void 0,e[Vr]=null,e[La]=void 0,e.__e=void 0),Dl(n)&&(n[mr]=void 0)}}function Zt(e=""){return document.createTextNode(e)}function hn(e){return Yi.call(e)}function Rr(e){return Wi.call(e)}function v(e,t){return hn(e)}function Ne(e,t=!1){{var n=hn(e);return n instanceof Comment&&n.data===""?Rr(n):n}}function d(e,t=1,n=!1){let a=e;for(;t--;)a=Rr(a);return a}function Jo(e){e.textContent=""}function Vi(){return!1}function Gi(e,t,n){return t==null||t===Si?n?document.createElement(e,{is:n}):document.createElement(e):n?document.createElementNS(t,e,{is:n}):document.createElementNS(t,e)}function Ki(e){qe===null&&(Fe===null&&no(),to()),gn&&eo()}function Zo(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Qt(e,t){var n=qe;n!==null&&(n.f&St)!==0&&(e|=St);var a={ctx:et,deps:null,nodes:null,f:e|it|Bt,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};me==null||me.register_created_effect(a);var l=a;if((e&nr)!==0)Wn!==null?Wn.push(a):zn.ensure().schedule(a);else if(t!==null){try{ir(a)}catch(s){throw _t(a),s}l.deps===null&&l.teardown===null&&l.nodes===null&&l.first===l.last&&(l.f&cr)===0&&(l=l.first,(e&Kt)!==0&&(e&Sn)!==0&&l!==null&&(l.f|=Sn))}if(l!==null&&(l.parent=n,n!==null&&Zo(l,n),Fe!==null&&(Fe.f&ut)!==0&&(e&pn)===0)){var i=Fe;(i.effects??(i.effects=[])).push(l)}return a}function gl(){return Fe!==null&&!Xt}function ha(e){const t=Qt(Or,null);return nt(t,ot),t.teardown=e,t}function ct(e){Ki();var t=qe.f,n=!Fe&&(t&Ut)!==0&&et!==null&&!et.i;if(n){var a=et;(a.e??(a.e=[])).push(e)}else return Xi(e)}function Xi(e){return Qt(nr|mi,e)}function Qo(e){return Ki(),Qt(Or|mi,e)}function $o(e){zn.ensure();const t=Qt(pn|cr,e);return(n={})=>new Promise(a=>{n.outro?In(t,()=>{_t(t),a(void 0)}):(_t(t),a(void 0))})}function dr(e){return Qt(nr,e)}function ec(e){return Qt(Vn|cr,e)}function bl(e,t=0){return Qt(Or|t,e)}function K(e,t=[],n=[],a=[]){qi(a,t,n,l=>{Qt(Or,()=>{e(...l.map(r))})})}function fr(e,t=0){var n=Qt(Kt|t,e);return n}function Ji(e,t=0){var n=Qt(ul|t,e);return n}function wt(e){return Qt(Ut|cr,e)}function Zi(e){var t=e.teardown;if(t!==null){const n=gn,a=Fe;Al(!0),Ht(null);try{t.call(null)}finally{Al(n),Ht(a)}}}function ml(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){const l=n.ac;l!==null&&vr(()=>{l.abort(Ir)});var a=n.next;(n.f&pn)!==0?n.parent=null:_t(n,t),n=a}}function tc(e){for(var t=e.first;t!==null;){var n=t.next;(t.f&Ut)===0&&_t(t),t=n}}function _t(e,t=!0){var n=!1;(t||(e.f&bi)!==0)&&e.nodes!==null&&e.nodes.end!==null&&(nc(e.nodes.start,e.nodes.end),n=!0),e.f|=Oa,ml(e,t&&!n),Er(e,0);var a=e.nodes&&e.nodes.t;if(a!==null)for(const i of a)i.stop();Zi(e),e.f^=Oa,e.f|=Ot;var l=e.parent;l!==null&&l.first!==null&&Qi(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=e.b=null}function nc(e,t){for(;e!==null;){var n=e===t?null:Rr(e);e.remove(),e=n}}function Qi(e){var t=e.parent,n=e.prev,a=e.next;n!==null&&(n.next=a),a!==null&&(a.prev=n),t!==null&&(t.first===e&&(t.first=a),t.last===e&&(t.last=n))}function In(e,t,n=!0){var a=[];$i(e,a,!0);var l=()=>{n&&_t(e),t&&t()},i=a.length;if(i>0){var s=()=>--i||l();for(var o of a)o.out(s)}else l()}function $i(e,t,n){if((e.f&St)===0){e.f^=St;var a=e.nodes&&e.nodes.t;if(a!==null)for(const o of a)(o.is_global||n)&&t.push(o);for(var l=e.first;l!==null;){var i=l.next;if((l.f&pn)===0){var s=(l.f&Sn)!==0||(l.f&Ut)!==0&&(e.f&Kt)!==0;$i(l,t,s?n:!1)}l=i}}}function la(e){es(e,!0)}function es(e,t){if((e.f&St)!==0){e.f^=St,(e.f&ot)===0&&(nt(e,it),zn.ensure().schedule(e));for(var n=e.first;n!==null;){var a=n.next,l=(n.f&Sn)!==0||(n.f&Ut)!==0;es(n,l?t:!1),n=a}var i=e.nodes&&e.nodes.t;if(i!==null)for(const s of i)(s.is_global||t)&&s.in()}}function yl(e,t){if(e.nodes)for(var n=e.nodes.start,a=e.nodes.end;n!==null;){var l=n===a?null:Rr(n);t.append(n),n=l}}let Qr=!1,gn=!1;function Al(e){gn=e}let Fe=null,Xt=!1;function Ht(e){Fe=e}let qe=null;function Yt(e){qe=e}let sn=null;function ts(e){Fe!==null&&(sn??(sn=new Set)).add(e)}let jt=null,Ct=0,It=null;function rc(e){It=e}let ns=1,jn=0,Ln=jn;function Ol(e){Ln=e}function rs(){return++ns}function zr(e){var t=e.f;if((t&it)!==0)return!0;if(t&ut&&(e.f&=~Rn),(t&Jt)!==0){for(var n=e.deps,a=n.length,l=0;l<a;l++){var i=n[l];if(zr(i)&&Fi(i),i.wv>e.wv)return!0}(t&Bt)!==0&&ft===null&&nt(e,ot)}return!1}function as(e,t,n=!0){var a=e.reactions;if(a!==null&&!(sn!==null&&sn.has(e)))for(var l=0;l<a.length;l++){var i=a[l];(i.f&ut)!==0?as(i,t,!1):t===i&&(n?nt(i,it):(i.f&ot)!==0&&nt(i,Jt),_l(i))}}function ls(e){var k;var t=jt,n=Ct,a=It,l=Fe,i=sn,s=et,o=Xt,c=Ln,u=e.f;jt=null,Ct=0,It=null,Fe=(u&(Ut|pn))===0?e:null,sn=null,rr(e.ctx),Xt=!1,Ln=++jn,e.ac!==null&&(vr(()=>{e.ac.abort(Ir)}),e.ac=null);try{e.f|=na;var f=e.fn,b=f();e.f|=or;var _=e.deps,p=me==null?void 0:me.is_fork;if(jt!==null){var g;if(p||Er(e,Ct),_!==null&&Ct>0)for(_.length=Ct+jt.length,g=0;g<jt.length;g++)_[Ct+g]=jt[g];else e.deps=_=jt;if(gl()&&(e.f&Bt)!==0)for(g=Ct;g<_.length;g++)((k=_[g]).reactions??(k.reactions=[])).push(e)}else!p&&_!==null&&Ct<_.length&&(Er(e,Ct),_.length=Ct);if(Lr()&&It!==null&&!Xt&&_!==null&&(e.f&(ut|Jt|it))===0)for(g=0;g<It.length;g++)as(It[g],e);if(l!==null&&l!==e){if(jn++,l.deps!==null)for(let w=0;w<n;w+=1)l.deps[w].rv=jn;if(t!==null)for(const w of t)w.rv=jn;It!==null&&(a===null?a=It:a.push(...It))}return(e.f&xn)!==0&&(e.f^=xn),b}catch(w){return ji(w)}finally{e.f^=na,jt=t,Ct=n,It=a,Fe=l,sn=i,rr(s),Xt=o,Ln=c}}function ac(e,t){let n=t.reactions;if(n!==null){var a=Ys.call(n,e);if(a!==-1){var l=n.length-1;l===0?n=t.reactions=null:(n[a]=n[l],n.pop())}}if(n===null&&(t.f&ut)!==0&&(jt===null||!ea.call(jt,t))){var i=t;(i.f&Bt)!==0&&(i.f^=Bt,i.f&=~Rn),i.v!==lt&&vl(i),i.ac!==null&&vr(()=>{i.ac.abort(Ir),i.ac=null,nt(i,it)}),Bo(i),Er(i,0)}}function Er(e,t){var n=e.deps;if(n!==null)for(var a=t;a<n.length;a++)ac(e,n[a])}function ir(e){var t=e.f;if((t&Ot)===0){nt(e,ot);var n=qe,a=Qr;qe=e,Qr=(t&(Ut|pn))===0;try{(t&(Kt|ul))!==0?tc(e):ml(e),Zi(e);var l=ls(e);e.teardown=typeof l=="function"?l:null,e.wv=ns;var i;hi&&To&&(e.f&it)!==0&&e.deps}finally{Qr=a,qe=n}}}async function lc(){await Promise.resolve(),Yo()}function r(e){var t=e.f,n=(t&ut)!==0;if(Fe!==null&&!Xt){var a=qe!==null&&(qe.f&Ot)!==0;if(!a&&(sn===null||!sn.has(e))){var l=Fe.deps;if((Fe.f&na)!==0)e.rv<jn&&(e.rv=jn,jt===null&&l!==null&&l[Ct]===e?Ct++:jt===null?jt=[e]:jt.push(e));else{Fe.deps??(Fe.deps=[]),ea.call(Fe.deps,e)||Fe.deps.push(e);var i=e.reactions;i===null?e.reactions=[Fe]:ea.call(i,Fe)||i.push(Fe)}}}if(gn&&On.has(e))return On.get(e);if(n){var s=e;if(gn){var o=s.v;return((s.f&ot)===0&&s.reactions!==null||ss(s))&&(o=fl(s)),On.set(s,o),o}var c=(s.f&Bt)===0&&!Xt&&Fe!==null&&(Qr||(Fe.f&Bt)!==0),u=(s.f&or)===0;zr(s)&&(c&&(s.f|=Bt),Fi(s)),c&&!u&&(Ai(s),is(s))}if(ft!=null&&ft.has(e))return ft.get(e);if((e.f&xn)!==0)throw e.v;return e.v}function is(e){if(e.f|=Bt,e.deps!==null)for(const t of e.deps)(t.reactions??(t.reactions=[])).push(e),(t.f&ut)!==0&&(t.f&Bt)===0&&(Ai(t),is(t))}function ss(e){if(e.v===lt)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(On.has(t)||(t.f&ut)!==0&&ss(t))return!0;return!1}function bt(e){var t=Xt;try{return Xt=!0,e()}finally{Xt=t}}function Mn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(ln in e)Ga(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&ln in n&&Ga(n)}}}function Ga(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let a in e)try{Ga(e[a],t)}catch{}const n=cl(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const a=_i(n);for(let l in a){const i=a[l].get;if(i)try{i.call(e)}catch{}}}}}function ic(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const sc=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function oc(e){return sc.includes(e)}const cc={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function uc(e){return e=e.toLowerCase(),cc[e]??e}const vc=["touchstart","touchmove"];function dc(e){return vc.includes(e)}const Dn=Symbol("events"),os=new Set,Ka=new Set;function cs(e,t,n,a={}){function l(i){if(a.capture||Xa.call(t,i),!i.cancelBubble)return vr(()=>n==null?void 0:n.call(this,i))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?rn(()=>{t.addEventListener(e,l,a)}):t.addEventListener(e,l,a),l}function ht(e,t,n,a,l){var i={capture:a,passive:l},s=cs(e,t,n,i);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&ha(()=>{t.removeEventListener(e,s,i)})}function W(e,t,n){(t[Dn]??(t[Dn]={}))[e]=n}function vt(e){for(var t=0;t<e.length;t++)os.add(e[t]);for(var n of Ka)n(e)}let Il=null;function Xa(e){var k,w;var t=this,n=t.ownerDocument,a=e.type,l=((k=e.composedPath)==null?void 0:k.call(e))||[],i=l[0]||e.target;Il=e;var s=0,o=Il===e&&e[Dn];if(o){var c=l.indexOf(o);if(c!==-1&&(t===document||t===window)){e[Dn]=t;return}var u=l.indexOf(t);if(u===-1)return;c<=u&&(s=c)}if(i=l[s]||e.target,i!==t){Ws(e,"currentTarget",{configurable:!0,get(){return i||n}});var f=Fe,b=qe;Ht(null),Yt(null);try{for(var _,p=[];i!==null&&i!==t;){try{var g=(w=i[Dn])==null?void 0:w[a];g!=null&&(!i.disabled||e.target===i)&&g.call(i,e)}catch(S){_?p.push(S):_=S}if(e.cancelBubble)break;s++,i=s<l.length?l[s]:null}if(_){for(let S of p)queueMicrotask(()=>{throw S});throw _}}finally{e[Dn]=t,delete e.currentTarget,Ht(f),Yt(b)}}}var di;const ya=((di=globalThis==null?void 0:globalThis.window)==null?void 0:di.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function fc(e){return(ya==null?void 0:ya.createHTML(e))??e}function us(e){var t=Gi("template");return t.innerHTML=fc(e.replaceAll("<!>","<!---->")),t.content}function Bn(e,t){var n=qe;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function D(e,t){var n=(t&xi)!==0,a=(t&bo)!==0,l,i=!e.startsWith("<!>");return()=>{l===void 0&&(l=us(i?e:"<!>"+e),n||(l=hn(l)));var s=a||Hi?document.importNode(l,!0):l.cloneNode(!0);if(n){var o=hn(s),c=s.lastChild;Bn(o,c)}else Bn(s,s);return s}}function hc(e,t,n="svg"){var a=!e.startsWith("<!>"),l=(t&xi)!==0,i=`<${n}>${a?e:"<!>"+e}</${n}>`,s;return()=>{if(!s){var o=us(i),c=hn(o);if(l)for(s=document.createDocumentFragment();hn(c);)s.appendChild(hn(c));else s=hn(c)}var u=s.cloneNode(!0);if(l){var f=hn(u),b=u.lastChild;Bn(f,b)}else Bn(u,u);return u}}function Un(e,t){return hc(e,t,"svg")}function Ja(e=""){{var t=Zt(e+"");return Bn(t,t),t}}function Re(){var e=document.createDocumentFragment(),t=document.createComment(""),n=Zt();return e.append(t,n),Bn(t,n),e}function y(e,t){e!==null&&e.before(t)}function re(e,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(e[mr]??(e[mr]=e.nodeValue))&&(e[mr]=n,e.nodeValue=`${n}`)}function _c(e,t){return pc(e,t)}const Wr=new Map;function pc(e,{target:t,anchor:n,props:a={},events:l,context:i,intro:s=!0,transformError:o}){Xo();var c=void 0,u=$o(()=>{var f=n??t.appendChild(Zt());No(f,{pending:()=>{}},p=>{rt({});var g=et;i&&(g.c=i),l&&(a.$$events=l),c=e(p,a)||{},at()},o);var b=new Set,_=p=>{for(var g=0;g<p.length;g++){var k=p[g];if(!b.has(k)){b.add(k);var w=dc(k);for(const T of[t,document]){var S=Wr.get(T);S===void 0&&(S=new Map,Wr.set(T,S));var C=S.get(k);C===void 0?(T.addEventListener(k,Xa,{passive:w}),S.set(k,1)):S.set(k,C+1)}}}};return _(da(os)),Ka.add(_),()=>{var w;for(var p of b)for(const S of[t,document]){var g=Wr.get(S),k=g.get(p);--k==0?(S.removeEventListener(p,Xa),g.delete(p),g.size===0&&Wr.delete(S)):g.set(p,k)}Ka.delete(_),f!==n&&((w=f.parentNode)==null||w.removeChild(f))}});return gc.set(c,u),c}let gc=new WeakMap;var Gt,tn,Nt,An,Fr,Ar,va;class wl{constructor(t,n=!0){Et(this,"anchor");Ce(this,Gt,new Map);Ce(this,tn,new Map);Ce(this,Nt,new Map);Ce(this,An,new Set);Ce(this,Fr,!0);Ce(this,Ar,t=>{if(m(this,Gt).has(t)){var n=m(this,Gt).get(t),a=m(this,tn).get(n);if(a)la(a),m(this,An).delete(n);else{var l=m(this,Nt).get(n);l&&(la(l.effect),m(this,tn).set(n,l.effect),m(this,Nt).delete(n),l.fragment.lastChild.remove(),this.anchor.before(l.fragment),a=l.effect)}for(const[i,s]of m(this,Gt)){if(m(this,Gt).delete(i),i===t)break;const o=m(this,Nt).get(s);o&&(_t(o.effect),m(this,Nt).delete(s))}for(const[i,s]of m(this,tn)){if(i===n||m(this,An).has(i))continue;const o=()=>{if(Array.from(m(this,Gt).values()).includes(i)){var u=document.createDocumentFragment();yl(s,u),u.append(Zt()),m(this,Nt).set(i,{effect:s,fragment:u})}else _t(s);m(this,An).delete(i),m(this,tn).delete(i)};m(this,Fr)||!a?(m(this,An).add(i),In(s,o,!1)):o()}}});Ce(this,va,t=>{m(this,Gt).delete(t);const n=Array.from(m(this,Gt).values());for(const[a,l]of m(this,Nt))n.includes(a)||(_t(l.effect),m(this,Nt).delete(a))});this.anchor=t,Te(this,Fr,n)}ensure(t,n){var a=me,l=Vi();if(n&&!m(this,tn).has(t)&&!m(this,Nt).has(t))if(l){var i=document.createDocumentFragment(),s=Zt();i.append(s),m(this,Nt).set(t,{effect:wt(()=>n(s)),fragment:i})}else m(this,tn).set(t,wt(()=>n(this.anchor)));if(m(this,Gt).set(a,t),l){for(const[o,c]of m(this,tn))o===t?a.unskip_effect(c):a.skip_effect(c);for(const[o,c]of m(this,Nt))o===t?a.unskip_effect(c.effect):a.skip_effect(c.effect);a.oncommit(m(this,Ar)),a.ondiscard(m(this,va))}else m(this,Ar).call(this,a)}}Gt=new WeakMap,tn=new WeakMap,Nt=new WeakMap,An=new WeakMap,Fr=new WeakMap,Ar=new WeakMap,va=new WeakMap;function J(e,t,n=!1){var a=new wl(e),l=n?Sn:0;function i(s,o){a.ensure(s,o)}fr(()=>{var s=!1;t((o,c=0)=>{s=!0,i(c,o)}),s||i(-1,null)},l)}function sr(e,t){return t}function bc(e,t,n){for(var a=[],l=t.length,i,s=t.length,o=0;o<l;o++){let b=t[o];In(b,()=>{if(i){if(i.pending.delete(b),i.done.add(b),i.pending.size===0){var _=e.outrogroups;Za(e,da(i.done)),_.delete(i),_.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var c=a.length===0&&n!==null&&e.pending.size===0;if(c){var u=n,f=u.parentNode;Jo(f),f.append(u),e.items.clear()}Za(e,t,!c)}else i={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(i)}function Za(e,t,n=!0){var a;if(e.pending.size>0){a=new Set;for(const s of e.pending.values())for(const o of s)a.add(e.items.get(o).e)}for(var l=0;l<t.length;l++){var i=t[l];if(a!=null&&a.has(i)){i.f|=nn;const s=document.createDocumentFragment();yl(i,s)}else _t(t[l],n)}}var Ll;function Oe(e,t,n,a,l,i=null){var s=e,o=new Map,c=(t&wi)!==0;if(c){var u=e;s=u.appendChild(Zt())}var f=null,b=dl(()=>{var T=n();return ol(T)?T:T==null?[]:da(T)}),_,p=new Map,g=!0;function k(T){(C.effect.f&Ot)===0&&(C.pending.delete(T),C.fallback=f,mc(C,_,s,t,a),f!==null&&(_.length===0?(f.f&nn)===0?la(f):(f.f^=nn,xr(f,null,s)):In(f,()=>{f=null})))}function w(T){C.pending.delete(T)}var S=fr(()=>{_=r(b);for(var T=_.length,F=new Set,M=me,R=Vi(),V=0;V<T;V+=1){var _e=_[V],ee=a(_e,V),q=g?null:o.get(ee);q?(q.v&&lr(q.v,_e),q.i&&lr(q.i,V),R&&M.unskip_effect(q.e)):(q=yc(o,g?s:Ll??(Ll=Zt()),_e,ee,V,l,t,n),g||(q.e.f|=nn),o.set(ee,q)),F.add(ee)}if(T===0&&i&&!f&&(g?f=wt(()=>i(s)):(f=wt(()=>i(Ll??(Ll=Zt()))),f.f|=nn)),T>F.size&&$s(),!g)if(p.set(M,F),R){for(const[z,N]of o)F.has(z)||M.skip_effect(N.e);M.oncommit(k),M.ondiscard(w)}else k(M);r(b)}),C={effect:S,items:o,pending:p,outrogroups:null,fallback:f};g=!1}function pr(e){for(;e!==null&&(e.f&Ut)===0;)e=e.next;return e}function mc(e,t,n,a,l){var q,z,N,E,B,de,ne,ae,Z;var i=(a&vo)!==0,s=t.length,o=e.items,c=pr(e.effect.first),u,f=null,b,_=[],p=[],g,k,w,S;if(i)for(S=0;S<s;S+=1)g=t[S],k=l(g,S),w=o.get(k).e,(w.f&nn)===0&&((z=(q=w.nodes)==null?void 0:q.a)==null||z.measure(),(b??(b=new Set)).add(w));for(S=0;S<s;S+=1){if(g=t[S],k=l(g,S),w=o.get(k).e,e.outrogroups!==null)for(const ie of e.outrogroups)ie.pending.delete(w),ie.done.delete(w);if((w.f&St)!==0&&(la(w),i&&((E=(N=w.nodes)==null?void 0:N.a)==null||E.unfix(),(b??(b=new Set)).delete(w))),(w.f&nn)!==0)if(w.f^=nn,w===c)xr(w,null,n);else{var C=f?f.next:c;w===e.effect.last&&(e.effect.last=w.prev),w.prev&&(w.prev.next=w.next),w.next&&(w.next.prev=w.prev),bn(e,f,w),bn(e,w,C),xr(w,C,n),f=w,_=[],p=[],c=pr(f.next);continue}if(w!==c){if(u!==void 0&&u.has(w)){if(_.length<p.length){var T=p[0],F;f=T.prev;var M=_[0],R=_[_.length-1];for(F=0;F<_.length;F+=1)xr(_[F],T,n);for(F=0;F<p.length;F+=1)u.delete(p[F]);bn(e,M.prev,R.next),bn(e,f,M),bn(e,R,T),c=T,f=R,S-=1,_=[],p=[]}else u.delete(w),xr(w,c,n),bn(e,w.prev,w.next),bn(e,w,f===null?e.effect.first:f.next),bn(e,f,w),f=w;continue}for(_=[],p=[];c!==null&&c!==w;)(u??(u=new Set)).add(c),p.push(c),c=pr(c.next);if(c===null)continue}(w.f&nn)===0&&_.push(w),f=w,c=pr(w.next)}if(e.outrogroups!==null){for(const ie of e.outrogroups)ie.pending.size===0&&(Za(e,da(ie.done)),(B=e.outrogroups)==null||B.delete(ie));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||u!==void 0){var V=[];if(u!==void 0)for(w of u)(w.f&St)===0&&V.push(w);for(;c!==null;)(c.f&St)===0&&c!==e.fallback&&V.push(c),c=pr(c.next);var _e=V.length;if(_e>0){var ee=(a&wi)!==0&&s===0?n:null;if(i){for(S=0;S<_e;S+=1)(ne=(de=V[S].nodes)==null?void 0:de.a)==null||ne.measure();for(S=0;S<_e;S+=1)(Z=(ae=V[S].nodes)==null?void 0:ae.a)==null||Z.fix()}bc(e,V,ee)}}i&&rn(()=>{var ie,A;if(b!==void 0)for(w of b)(A=(ie=w.nodes)==null?void 0:ie.a)==null||A.apply()})}function yc(e,t,n,a,l,i,s,o){var c=(s&co)!==0?(s&fo)===0?Vo(n,!1,!1):Tn(n):null,u=(s&uo)!==0?Tn(l):null;return{v:c,i:u,e:wt(()=>(i(t,c??n,u??l,o),()=>{e.delete(a)}))}}function xr(e,t,n){if(e.nodes)for(var a=e.nodes.start,l=e.nodes.end,i=t&&(t.f&nn)===0?t.nodes.start:n;a!==null;){var s=Rr(a);if(i.before(a),a===l)return;a=s}}function bn(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function Ge(e,t,n,a,l){var o;var i=(o=t.$$slots)==null?void 0:o[n],s=!1;i===!0&&(i=t.children,s=!0),i===void 0||i(e,s?()=>a:a)}function vs(e,t,n){var a=new wl(e);fr(()=>{var l=t()??null;a.ensure(l,l&&(i=>n(i,l)))},Sn)}function wc(e,t,n,a,l,i){var s=null,o=e,c=new wl(o,!1);fr(()=>{const u=t()||null;var f=mo;if(u===null){c.ensure(null,null);return}return c.ensure(u,b=>{if(u){if(s=Gi(u,f),Bn(s,s),a){var _=null,p=s.appendChild(Zt());a(s,p),_==null||_.remove()}qe.nodes.end=s,b.before(s)}}),()=>{}},Sn),ha(()=>{})}function ds(e,t){var n;n=document.head.appendChild(Zt());try{fr(()=>{var a=wt(()=>t(n));a.f|=bi})}finally{}}function kc(e,t){var n=void 0,a;Ji(()=>{n!==(n=t())&&(a&&(_t(a),a=null),n&&(a=wt(()=>{dr(()=>n(e))})))})}function fs(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var l=e.length;for(t=0;t<l;t++)e[t]&&(n=fs(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}function xc(){for(var e,t,n=0,a="",l=arguments.length;n<l;n++)(e=arguments[n])&&(t=fs(e))&&(a&&(a+=" "),a+=t);return a}function Sc(e){return typeof e=="object"?xc(e):e??""}const Rl=[...` 	
\r\f \v\uFEFF`];function Tc(e,t,n){var a=e==null?"":""+e;if(t&&(a=a?a+" "+t:t),n){for(var l of Object.keys(n))if(n[l])a=a?a+" "+l:l;else if(a.length)for(var i=l.length,s=0;(s=a.indexOf(l,s))>=0;){var o=s+i;(s===0||Rl.includes(a[s-1]))&&(o===a.length||Rl.includes(a[o]))?a=(s===0?"":a.substring(0,s))+a.substring(o+1):s=o}}return a===""?null:a}function zl(e,t=!1){var n=t?" !important;":";",a="";for(var l of Object.keys(e)){var i=e[l];i!=null&&i!==""&&(a+=" "+l+": "+i+n)}return a}function wa(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function Mc(e,t){if(t){var n="",a,l;if(Array.isArray(t)?(a=t[0],l=t[1]):a=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var i=!1,s=0,o=!1,c=[];a&&c.push(...Object.keys(a).map(wa)),l&&c.push(...Object.keys(l).map(wa));var u=0,f=-1;const k=e.length;for(var b=0;b<k;b++){var _=e[b];if(o?_==="/"&&e[b-1]==="*"&&(o=!1):i?i===_&&(i=!1):_==="/"&&e[b+1]==="*"?o=!0:_==='"'||_==="'"?i=_:_==="("?s++:_===")"&&s--,!o&&i===!1&&s===0){if(_===":"&&f===-1)f=b;else if(_===";"||b===k-1){if(f!==-1){var p=wa(e.substring(u,f).trim());if(!c.includes(p)){_!==";"&&b++;var g=e.substring(u,b).trim();n+=" "+g+";"}}u=b+1,f=-1}}}}return a&&(n+=zl(a)),l&&(n+=zl(l,!0)),n=n.trim(),n===""?null:n}return e==null?null:String(e)}function He(e,t,n,a,l,i){var s=e[Ia];if(s!==n||s===void 0){var o=Tc(n,a,i);o==null?e.removeAttribute("class"):t?e.className=o:e.setAttribute("class",o),e[Ia]=n}else if(i&&l!==i)for(var c in i){var u=!!i[c];(l==null||u!==!!l[c])&&e.classList.toggle(c,u)}return i}function ka(e,t={},n,a){for(var l in n){var i=n[l];t[l]!==i&&(n[l]==null?e.style.removeProperty(l):e.style.setProperty(l,i,a))}}function on(e,t,n,a){var l=e[La];if(l!==t){var i=Mc(t,a);i==null?e.removeAttribute("style"):e.style.cssText=i,e[La]=t}else a&&(Array.isArray(a)?(ka(e,n==null?void 0:n[0],a[0]),ka(e,n==null?void 0:n[1],a[1],"important")):ka(e,n,a));return a}function kt(e,t,n=!1){if(e.multiple){if(t==null)return;if(!ol(t))return ko();for(var a of e.options)a.selected=t.includes(jr(a));return}for(a of e.options){var l=jr(a);if(Ko(l,t)){a.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function At(e){var t=new MutationObserver(()=>{"__value"in e&&kt(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),ha(()=>{t.disconnect()})}function ia(e,t,n=t){var a=new WeakSet,l=!0;Ci(e,"change",i=>{var s=i?"[selected]":":checked",o;if(e.multiple)o=[].map.call(e.querySelectorAll(s),jr);else{var c=e.querySelector(s)??e.querySelector("option:not([disabled])");o=c&&jr(c)}n(o),e.__value=o,me!==null&&a.add(me)}),dr(()=>{var i=t();if(e===document.activeElement){var s=me;if(a.has(s))return}if(kt(e,i,l),l&&i===void 0){var o=e.querySelector(":checked");o!==null&&(i=jr(o),n(i))}e.__value=i,l=!1}),At(e)}function jr(e){return"__value"in e?e.__value:e.value}const gr=Symbol("class"),br=Symbol("style"),hs=Symbol("is custom element"),_s=Symbol("is html"),Pc=fa?"input":"INPUT",jc=fa?"option":"OPTION",Dc=fa?"select":"SELECT",Ec=fa?"progress":"PROGRESS";function En(e,t){var n=_a(e);n.value===(n.value=t??void 0)||e.value===t&&(t!==0||e.nodeName!==Ec)||(e.value=t??"")}function Dr(e,t){var n=_a(e);n.checked!==(n.checked=t??void 0)&&(e.checked=t)}function Cc(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function le(e,t,n,a){var l=_a(e);l[t]!==(l[t]=n)&&(t==="loading"&&(e[Js]=n),n==null?e.removeAttribute(t):typeof n!="string"&&ps(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function qc(e,t,n,a,l=!1,i=!1){var s=_a(e),o=s[hs],c=!s[_s],u=t||{},f=e.nodeName===jc;for(var b in t)b in n||(n[b]=null);n.class?n.class=Sc(n.class):n[gr]&&(n.class=null),n[br]&&(n.style??(n.style=null));var _=ps(e);if(e.nodeName===Pc&&"type"in n&&("value"in n||"__value"in n)){var p=n.type;(p!==u.type||p===void 0&&e.hasAttribute("type"))&&(u.type=p,le(e,"type",p))}for(const M in n){let R=n[M];if(f&&M==="value"&&R==null){e.value=e.__value="",u[M]=R;continue}if(M==="class"){var g=e.namespaceURI==="http://www.w3.org/1999/xhtml";He(e,g,R,a,t==null?void 0:t[gr],n[gr]),u[M]=R,u[gr]=n[gr];continue}if(M==="style"){on(e,R,t==null?void 0:t[br],n[br]),u[M]=R,u[br]=n[br];continue}var k=u[M];if(!(R===k&&!(R===void 0&&e.hasAttribute(M)))){u[M]=R;var w=M[0]+M[1];if(w!=="$$")if(w==="on"){const V={},_e="$$"+M;let ee=M.slice(2);var S=oc(ee);if(ic(ee)&&(ee=ee.slice(0,-7),V.capture=!0),!S&&k){if(R!=null)continue;e.removeEventListener(ee,u[_e],V),u[_e]=null}if(S)W(ee,e,R),vt([ee]);else if(R!=null){let q=function(z){u[M].call(this,z)};var F=q;u[_e]=cs(ee,e,q,V)}}else if(M==="style")le(e,M,R);else if(M==="autofocus")Kr(e,!!R);else if(!o&&(M==="__value"||M==="value"&&R!=null))e.value=e.__value=R;else if(M==="selected"&&f)Cc(e,R);else{var C=M;c||(C=uc(C));var T=C==="defaultValue"||C==="defaultChecked";if(R==null&&!o&&!T)if(s[M]=null,C==="value"||C==="checked"){let V=e;const _e=t===void 0;if(C==="value"){let ee=V.defaultValue;V.removeAttribute(C),V.defaultValue=ee,V.value=V.__value=_e?ee:null}else{let ee=V.defaultChecked;V.removeAttribute(C),V.defaultChecked=ee,V.checked=_e?ee:!1}}else e.removeAttribute(M);else T||_.includes(C)&&(o||typeof R!="string")?(e[C]=R,C in s&&(s[C]=lt)):typeof R!="function"&&le(e,C,R)}}}return u}function Bl(e,t,n=[],a=[],l=[],i,s=!1,o=!1){qi(l,n,a,c=>{var u=void 0,f={},b=e.nodeName===Dc,_=!1;if(Ji(()=>{var g=t(...c.map(r)),k=qc(e,u,g,i,s,o);_&&b&&"value"in g&&kt(e,g.value);for(let S of Object.getOwnPropertySymbols(f))g[S]||_t(f[S]);for(let S of Object.getOwnPropertySymbols(g)){var w=g[S];S.description===yo&&(!u||w!==u[S])&&(f[S]&&_t(f[S]),f[S]=wt(()=>kc(e,()=>w))),k[S]=w}u=k}),b){var p=e;dr(()=>{kt(p,u.value,!0),At(p)})}_=!0})}function _a(e){return e[Vr]??(e[Vr]={[hs]:e.nodeName.includes("-"),[_s]:e.namespaceURI===Si})}var Ul=new Map;function ps(e){var t=e.getAttribute("is")||e.nodeName,n=Ul.get(t);if(n)return n;Ul.set(t,n=[]);for(var a,l=e,i=Element.prototype;i!==l;){a=_i(l);for(var s in a)a[s].set&&s!=="innerHTML"&&s!=="textContent"&&s!=="innerText"&&n.push(s);l=cl(l)}return n}function xt(e,t,n=t){var a=new WeakSet;Ci(e,"input",async l=>{var i=l?e.defaultValue:e.value;if(i=xa(e)?Sa(i):i,n(i),me!==null&&a.add(me),await lc(),i!==(i=t())){var s=e.selectionStart,o=e.selectionEnd,c=e.value.length;if(e.value=i??"",o!==null){var u=e.value.length;s===o&&o===c&&u>c?(e.selectionStart=u,e.selectionEnd=u):(e.selectionStart=s,e.selectionEnd=Math.min(o,u))}}}),bt(t)==null&&e.value&&(n(xa(e)?Sa(e.value):e.value),me!==null&&a.add(me)),bl(()=>{var l=t();if(e===document.activeElement){var i=me;if(a.has(i))return}xa(e)&&l===Sa(e.value)||e.type==="date"&&!l&&!e.value||l!==e.value&&(e.value=l??"")})}function xa(e){var t=e.type;return t==="number"||t==="range"}function Sa(e){return e===""?null:+e}function Ta(e,t){return e===t||(e==null?void 0:e[ln])===t}function Nc(e={},t,n,a){var l=et.r,i=qe;return dr(()=>{var s,o;return bl(()=>{s=o,o=[],bt(()=>{Ta(n(...o),e)||(t(e,...o),s&&Ta(n(...s),e)&&t(null,...s))})}),()=>{let c=i;for(;c!==l&&c.parent!==null&&c.parent.f&Oa;)c=c.parent;const u=()=>{o&&Ta(n(...o),e)&&t(null,...o)},f=c.teardown;c.teardown=()=>{u(),f==null||f()}}}),e}function Fc(e=!1){const t=et,n=t.l.u;if(!n)return;let a=()=>Mn(t.s);if(e){let l=0,i={};const s=ar(()=>{let o=!1;const c=t.s;for(const u in c)c[u]!==i[u]&&(i[u]=c[u],o=!0);return o&&l++,l});a=()=>r(s)}n.b.length&&Qo(()=>{Hl(t,a),Fa(n.b)}),ct(()=>{const l=bt(()=>n.m.map(Xs));return()=>{for(const i of l)typeof i=="function"&&i()}}),n.a.length&&ct(()=>{Hl(t,a),Fa(n.a)})}function Hl(e,t){if(e.l.s)for(const n of e.l.s)r(n);t()}const Ac={get(e,t){if(!e.exclude.includes(t))return r(e.version),t in e.special?e.special[t]():e.props[t]},set(e,t,n){if(!(t in e.special)){var a=qe;try{Yt(e.parent_effect),e.special[t]=Ft({get[t](){return e.props[t]}},t,ki)}finally{Yt(a)}}return e.special[t](n),Nl(e.version),!0},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},deleteProperty(e,t){return e.exclude.includes(t)||(e.exclude.push(t),Nl(e.version)),!0},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function Ve(e,t){return new Proxy({props:e,exclude:t,special:{},version:Tn(0),parent_effect:qe},Ac)}const Oc={get(e,t){let n=e.props.length;for(;n--;){let a=e.props[n];if(_r(a)&&(a=a()),typeof a=="object"&&a!==null&&t in a)return a[t]}},set(e,t,n){let a=e.props.length;for(;a--;){let l=e.props[a];_r(l)&&(l=l());const i=kn(l,t);if(i&&i.set)return i.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let a=e.props[n];if(_r(a)&&(a=a()),typeof a=="object"&&a!==null&&t in a){const l=kn(a,t);return l&&!l.configurable&&(l.configurable=!0),l}}},has(e,t){if(t===ln||t===yi)return!1;for(let n of e.props)if(_r(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(e){const t=[];for(let n of e.props)if(_r(n)&&(n=n()),!!n){for(const a in n)t.includes(a)||t.push(a);for(const a of Object.getOwnPropertySymbols(n))t.includes(a)||t.push(a)}return t}};function Xe(...e){return new Proxy({props:e},Oc)}function Ft(e,t,n,a){var F;var l=!ur||(n&_o)!==0,i=(n&po)!==0,s=(n&go)!==0,o=a,c=!0,u=void 0,f=()=>s&&l?(u??(u=ar(a)),r(u)):(c&&(c=!1,o=s?bt(a):a),o);let b;if(i){var _=ln in e||yi in e;b=((F=kn(e,t))==null?void 0:F.set)??(_&&t in e?M=>e[t]=M:void 0)}var p,g=!1;i?[p,g]=Do(()=>e[t]):p=e[t],p===void 0&&a!==void 0&&(p=f(),b&&(l&&ao(),b(p)));var k;if(l?k=()=>{var M=e[t];return M===void 0?f():(c=!0,M)}:k=()=>{var M=e[t];return M!==void 0&&(o=void 0),M===void 0?o:M},l&&(n&ki)===0)return k;if(b){var w=e.$$legacy;return(function(M,R){return arguments.length>0?((!l||!R||w||g)&&b(R?k():M),M):k()})}var S=!1,C=((n&ho)!==0?ar:dl)(()=>(S=!1,k()));i&&r(C);var T=qe;return(function(M,R){if(arguments.length>0){const V=R?r(C):l&&i?Ie(M):M;return h(C,V),S=!0,o!==void 0&&(o=V),M}return gn&&S||(T.f&Ot)!==0?C.v:r(C)})}function kl(e){et===null&&Zs(),ur&&et.l!==null?Ic(et).m.push(e):ct(()=>{const t=bt(e);if(typeof t=="function")return t})}function Ic(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Lc="5";var fi;typeof window<"u"&&((fi=window.__svelte??(window.__svelte={})).v??(fi.v=new Set)).add(Lc);const Rc="/timer";function gs(){const e=window.location.hash,t=e.startsWith("#")?e.slice(1):e;return!t||t==="/"?Rc:t}let xl=L(Ie(gs())),Yl=!1;function zc(){Yl||typeof window>"u"||(Yl=!0,window.addEventListener("hashchange",()=>{h(xl,gs(),!0)}))}zc();function Bc(){return r(xl)}function bs(e){if(window.location.hash===`#${e}`){h(xl,e,!0);return}window.location.hash=e}const Uc=[{path:"/timer",label:"番茄钟"},{path:"/tasks",label:"任务"},{path:"/stats",label:"统计"},{path:"/journal",label:"手账"},{path:"/settings",label:"设置"}],ms="pomoflow:settings:v1",Sr={focusMinutes:25,shortBreakMinutes:5,longBreakMinutes:15,longBreakInterval:4,autoChain:!0,soundEnabled:!0,desktopNotificationEnabled:!0};function Hc(){if(typeof localStorage>"u")return{...Sr};const e=localStorage.getItem(ms);if(!e)return{...Sr};try{const t=JSON.parse(e);return{...Sr,...t}}catch{return{...Sr}}}function ys(e){typeof localStorage>"u"||localStorage.setItem(ms,JSON.stringify(e))}let Gn=L(Ie(Hc()));function _n(){return r(Gn)}function Yc(e){h(Gn,{...r(Gn),...e},!0),ys(r(Gn))}function Wc(){h(Gn,{...Sr},!0),ys(r(Gn))}let Ue=Ie({mode:"focus",secondsLeft:1500,running:!1,sessionId:null,currentTaskId:null,focusCompletedInCycle:0});function ws(){return Ue}function Kn(e){const t=_n();Ue.secondsLeft=e==="focus"?t.focusMinutes*60:e==="short_break"?t.shortBreakMinutes*60:t.longBreakMinutes*60}function Wl(e,t){Ue.running||(Ue.mode="focus",Kn("focus"),Ue.currentTaskId=e,Ue.sessionId=t,Ue.running=!0)}function Ma(){Ue.running&&(Ue.running=!1)}function Pa(){Ue.running||Ue.sessionId===null||(Ue.running=!0)}function ks(e){const t=Ue.mode;Ue.running=!1,Ue.sessionId=null,Ue.currentTaskId=null;const n=_n();if(t==="focus"&&e){Ue.focusCompletedInCycle+=1;const l=Ue.focusCompletedInCycle%n.longBreakInterval===0?"long_break":"short_break";Ue.mode=l,Kn(l),n.autoChain&&(Ue.running=!0)}else t==="focus"&&!e?(Ue.mode="focus",Ue.focusCompletedInCycle=0,Kn("focus")):(Ue.mode="focus",Kn("focus"),n.autoChain&&(Ue.running=!1))}function Vl(e){Ue.running||(Ue.mode=e,Kn(e))}function Vc(){if(Ue.running){if(Ue.secondsLeft>0){Ue.secondsLeft-=1;return}ks(!0)}}function Gc(){Ue.running||Kn(Ue.mode)}async function tt(e,t={},n){return window.__TAURI_INTERNALS__.invoke(e,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const Sl=e=>tt("list_tasks",{query:e}),xs=e=>tt("upsert_task",{task:e}),Kc=e=>tt("complete_task",{id:e}),Xc=e=>tt("reopen_task",{id:e}),Ss=()=>tt("list_projects"),Gl=e=>tt("upsert_project",{project:e}),Jc=e=>tt("delete_project",{id:e}),Ts=()=>tt("list_tags"),Zc=e=>tt("list_tags_for_task",{taskId:e}),Ms=(e,t)=>tt("set_tags_for_task",{taskId:e,tagIds:t}),Qa=(e,t,n)=>tt("start_pomodoro",{taskId:e,projectId:t,duration:n}),Qc=(e,t)=>tt("stop_pomodoro",{sessionId:e,isCompleted:t}),ja=e=>tt("get_daily_review",{date:e}),Kl=e=>tt("upsert_daily_review",{review:e}),Ps=e=>tt("list_subtasks_for_task",{taskId:e}),$a=e=>tt("upsert_subtask",{subtask:e}),$c=e=>tt("delete_subtask",{id:e}),eu=()=>tt("list_mottos"),tu=(e,t)=>tt("today_completed_minutes",{startMs:e,endMs:t}),Xl=(e,t,n,a)=>tt("stats_range",{startDate:e,endDate:t,group:n,tzOffsetMin:a});var Jl;(function(e){e.Year="year",e.Month="month",e.TwoWeeks="twoWeeks",e.Week="week",e.Day="day",e.Hour="hour",e.Minute="minute",e.Second="second"})(Jl||(Jl={}));var Zl;(function(e){e[e.None=0]="None",e[e.Min=1]="Min",e[e.Low=2]="Low",e[e.Default=3]="Default",e[e.High=4]="High"})(Zl||(Zl={}));var Ql;(function(e){e[e.Secret=-1]="Secret",e[e.Private=0]="Private",e[e.Public=1]="Public"})(Ql||(Ql={}));async function el(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await tt("plugin:notification|is_permission_granted")}async function js(){return await window.Notification.requestPermission()}function Ds(e){typeof e=="string"?new window.Notification(e):new window.Notification(e.title,e)}var nu=D('<textarea class="review-textarea svelte-1na66lg"></textarea>');function ru(e,t){rt(t,!0);let n=Ft(t,"rows",3,2),a=L(Ie(bt(()=>t.value??"")));ct(()=>{const s=t.value??"";s!==r(a)&&h(a,s,!0)});function l(){const s=r(a).trim();s===""?t.value&&t.onDelete&&t.onDelete():s!==(t.value??"")&&t.onSave(s)}var i=nu();K(()=>{le(i,"placeholder",t.placeholder??"写下今天的复盘..."),le(i,"rows",n())}),ht("blur",i,l),xt(i,()=>r(a),s=>h(a,s)),y(e,i),at()}Mo();/**
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
 */const au={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const lu=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const $l=(...e)=>e.filter((t,n,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===n).join(" ").trim();var iu=Un("<svg><!><!></svg>");function Je(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]),a=Ve(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);rt(t,!1);let l=Ft(t,"name",8,void 0),i=Ft(t,"color",8,"currentColor"),s=Ft(t,"size",8,24),o=Ft(t,"strokeWidth",8,2),c=Ft(t,"absoluteStrokeWidth",8,!1),u=Ft(t,"iconNode",24,()=>[]);Fc();var f=iu();Bl(f,(p,g,k)=>({...au,...p,...a,width:s(),height:s(),stroke:i(),"stroke-width":g,class:k}),[()=>lu(a)?void 0:{"aria-hidden":"true"},()=>(Mn(c()),Mn(o()),Mn(s()),bt(()=>c()?Number(o())*24/Number(s()):o())),()=>(Mn($l),Mn(l()),Mn(n),bt(()=>$l("lucide-icon","lucide",l()?`lucide-${l()}`:"",n.class)))]);var b=v(f);Oe(b,1,u,sr,(p,g)=>{var k=$(()=>gi(r(g),2));let w=()=>r(k)[0],S=()=>r(k)[1];var C=Re(),T=Ne(C);wc(T,w,!0,(F,M)=>{Bl(F,()=>({...S()}))}),y(p,C)});var _=d(b);Ge(_,t,"default",{}),y(e,f),at()}function ei(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];Je(e,Xe({name:"award"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function su(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];Je(e,Xe({name:"calendar-check"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function Es(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];Je(e,Xe({name:"calendar-days"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function ou(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];Je(e,Xe({name:"calendar-range"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function Cs(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];Je(e,Xe({name:"chart-column"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function cu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M20 6 9 17l-5-5"}]];Je(e,Xe({name:"check"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function sa(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"m6 9 6 6 6-6"}]];Je(e,Xe({name:"chevron-down"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function oa(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"m9 18 6-6-6-6"}]];Je(e,Xe({name:"chevron-right"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function tl(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];Je(e,Xe({name:"circle-check"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function nl(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];Je(e,Xe({name:"clock"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function uu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];Je(e,Xe({name:"download"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function vu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];Je(e,Xe({name:"ellipsis-vertical"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function du(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];Je(e,Xe({name:"flame"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function fu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];Je(e,Xe({name:"folder"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function hu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];Je(e,Xe({name:"pencil"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function qs(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];Je(e,Xe({name:"play"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function rl(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];Je(e,Xe({name:"plus"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function _u(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];Je(e,Xe({name:"quote"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function pu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];Je(e,Xe({name:"refresh-cw"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function gu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];Je(e,Xe({name:"search"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function bu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Je(e,Xe({name:"sun"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function mu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];Je(e,Xe({name:"sunrise"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function al(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];Je(e,Xe({name:"target"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function yu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Je(e,Xe({name:"trash-2"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function Da(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];Je(e,Xe({name:"trending-up"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}function wu(e,t){const n=Ve(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const a=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Je(e,Xe({name:"x"},()=>n,{get iconNode(){return a},children:(l,i)=>{var s=Re(),o=Ne(s);Ge(o,t,"default",{}),y(l,s)},$$slots:{default:!0}}))}const ti=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function ni(){return ti[Math.floor(Math.random()*ti.length)]}var ku=D('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985" aria-label="换一条" title="换一条"><!></button></div></div>');function xu(e,t){rt(t,!0);let n=L(Ie([])),a=L(Ie(new Set)),l=L(null);async function i(){try{h(n,await eu(),!0)}catch{h(n,[],!0)}}kl(()=>{i()}),ct(()=>{var f;if(!r(l))if(r(n).length>0){const b=r(n)[0];h(l,{text:b.text,author:(f=b.author)!=null&&f.trim()?b.author:"佚名"},!0);const _=new Set(r(a));_.add(b.id),h(a,_,!0)}else h(l,ni(),!0)});function s(){var f;if(r(n).length>0){let b=r(n).filter(g=>!r(a).has(g.id));b.length===0&&(h(a,new Set,!0),b=r(n));const _=b[0];h(l,{text:_.text,author:(f=_.author)!=null&&f.trim()?_.author:"佚名"},!0);const p=new Set(r(a));p.add(_.id),h(a,p,!0)}else h(l,ni(),!0)}var o=Re(),c=Ne(o);{var u=f=>{var b=ku(),_=v(b),p=v(_),g=v(p);_u(g,{size:20});var k=d(p,2),w=v(k),S=v(w),C=d(w,2),T=v(C),F=d(k,2),M=v(F);pu(M,{size:14}),K(()=>{re(S,r(l).text),re(T,`—— ${r(l).author??""}`)}),W("click",F,s),y(f,b)};J(c,f=>{r(l)&&f(u)})}y(e,o),at()}vt(["click"]);var ri=D("<option> </option>"),ai=D('<button type="button"> </button>'),Su=D('<button type="button" class="clear svelte-13vcwbh">清除筛选</button>'),Tu=D('<div class="empty svelte-13vcwbh">暂无任务</div>'),Mu=D('<button type="button" class="expander svelte-13vcwbh"><!></button>'),Pu=D('<span class="expander-placeholder svelte-13vcwbh"></span>'),Ea=D('<span class="meta-item svelte-13vcwbh"> </span>'),ju=D('<button type="button" class="start svelte-13vcwbh" aria-label="开始专注" title="开始专注"><!></button>'),Du=D('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),Eu=D('<div class="subs svelte-13vcwbh"></div>'),Cu=D('<div class="task-card svelte-13vcwbh"><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),qu=D('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh">今日专注</h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh">分钟</span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh">任务列表</h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project">项目</label> <select id="timer-filter-project" class="svelte-13vcwbh"><option>全部</option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag">标签</label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option>全部</option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh">优先级</span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh">日期</span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function Nu(e,t){rt(t,!0);const n={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let a=L(Ie(new Set));function l(Y){const H=new Set(r(a));H.has(Y)?H.delete(Y):H.add(Y),h(a,H,!0)}function i(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const s=$(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),o=["high","medium","low"],c={high:"高",medium:"中",low:"低"},u=["today","tomorrow","this_week"],f={today:"今日",tomorrow:"明日",this_week:"本周"};function b(Y){var H;return Y?((H=t.projects.find(pe=>pe.id===Y))==null?void 0:H.name)??"":""}var _=qu(),p=v(_),g=v(p),k=d(v(g),2),w=v(k),S=v(w),C=d(g,2),T=d(v(C),2),F=v(T),M=d(v(F),2),R=v(M);R.value=R.__value="";var V=d(R);Oe(V,17,()=>t.projects,Y=>Y.id,(Y,H)=>{var pe=ri(),fe=v(pe),we={};K(()=>{re(fe,r(H).name),we!==(we=r(H).id)&&(pe.value=(pe.__value=r(H).id)??"")}),y(Y,pe)});var _e;At(M);var ee=d(F,2),q=d(v(ee),2),z=v(q);z.value=z.__value="";var N=d(z);Oe(N,17,()=>t.tags,Y=>Y.id,(Y,H)=>{var pe=ri(),fe=v(pe),we={};K(()=>{re(fe,r(H).name),we!==(we=r(H).id)&&(pe.value=(pe.__value=r(H).id)??"")}),y(Y,pe)});var E;At(q);var B=d(T,2),de=d(v(B),2);Oe(de,20,()=>o,Y=>Y,(Y,H)=>{var pe=ai();let fe;var we=v(pe);K(()=>{fe=He(pe,1,"opt svelte-13vcwbh",null,fe,{active:t.filter.priority===H}),re(we,c[H])}),W("click",pe,()=>t.onFilterChange({priority:t.filter.priority===H?null:H})),y(Y,pe)});var ne=d(de,4);Oe(ne,20,()=>u,Y=>Y,(Y,H)=>{var pe=ai();let fe;var we=v(pe);K(()=>{fe=He(pe,1,"opt svelte-13vcwbh",null,fe,{active:t.filter.date===H}),re(we,f[H])}),W("click",pe,()=>t.onFilterChange({date:t.filter.date===H?null:H})),y(Y,pe)});var ae=d(B,2);{var Z=Y=>{var H=Su();W("click",H,i),y(Y,H)};J(ae,Y=>{r(s)&&Y(Z)})}var ie=d(p,2),A=v(ie);{var G=Y=>{var H=Tu();y(Y,H)};J(A,Y=>{t.tasks.length===0&&Y(G)})}var O=d(A,2);Oe(O,17,()=>t.tasks,Y=>Y.id,(Y,H)=>{const pe=$(()=>r(H).status==="completed"),fe=$(()=>{var x;return(((x=r(H).subtasks)==null?void 0:x.length)??0)>0}),we=$(()=>r(a).has(r(H).id)),ve=$(()=>r(fe)?(r(H).subtasks??[]).filter(x=>x.is_completed).length:0),ze=$(()=>b(r(H).project_id));var Be=Cu(),Se=v(Be),j=v(Se);{var U=x=>{var P=Mu(),te=v(P);{var je=Dt=>{sa(Dt,{size:14})},$e=Dt=>{oa(Dt,{size:14})};J(te,Dt=>{r(we)?Dt(je):Dt($e,-1)})}K(()=>le(P,"aria-label",r(we)?"折叠子任务":"展开子任务")),W("click",P,()=>l(r(H).id)),y(x,P)},X=x=>{var P=Pu();y(x,P)};J(j,x=>{r(fe)?x(U):x(X,-1)})}var ce=d(j,2),ke=d(ce,2),ye=v(ke);let Me;var se=v(ye),De=d(ye,2),ge=v(De),be=v(ge),Ee=d(ge,2);{var Q=x=>{var P=Ea(),te=v(P);K(()=>{var je;return re(te,`· ${r(ve)??""}/${((je=r(H).subtasks)==null?void 0:je.length)??0??""}`)}),y(x,P)};J(Ee,x=>{r(fe)&&x(Q)})}var he=d(Ee,2);{var Pe=x=>{var P=Ea(),te=v(P);K(()=>re(te,r(ze))),y(x,P)};J(he,x=>{r(ze)&&x(Pe)})}var Qe=d(he,2);{var Ke=x=>{var P=Ea(),te=v(P);K(je=>re(te,je),[()=>r(H).due_date.slice(0,10)]),y(x,P)};J(Qe,x=>{r(H).due_date&&x(Ke)})}var st=d(ke,2);{var We=x=>{var P=ju(),te=v(P);qs(te,{size:10,color:"#fff",fill:"#fff"}),W("click",P,()=>t.onStartTask(r(H))),y(x,P)};J(st,x=>{r(pe)||x(We)})}var ue=d(Se,2);{var oe=x=>{var P=Eu();Oe(P,21,()=>r(H).subtasks??[],te=>te.id,(te,je)=>{var $e=Du();let Dt;var Tt=v($e),pa=d(Tt,2),Br=v(pa);K(()=>{Dt=He($e,1,"sub-row svelte-13vcwbh",null,Dt,{done:r(je).is_completed}),Dr(Tt,r(je).is_completed),re(Br,r(je).title)}),W("change",Tt,Ur=>t.onToggleSubtask(r(je).id,Ur.currentTarget.checked)),y(te,$e)}),y(x,P)};J(ue,x=>{r(fe)&&r(we)&&x(oe)})}K(()=>{on(ce,`background-color: ${n[r(H).priority||"none"]??n.none??""}`),Me=He(ye,1,"title svelte-13vcwbh",null,Me,{done:r(pe)}),re(se,r(H).title),re(be,`${r(H).completed_pomodoros??0??""}/${r(H).estimated_pomodoros??0??""} 番茄`)}),y(Y,Be)}),K(()=>{re(S,t.todayMinutes),_e!==(_e=t.filter.project??"")&&(M.value=(M.__value=t.filter.project??"")??"",kt(M,t.filter.project??"")),E!==(E=t.filter.tag??"")&&(q.value=(q.__value=t.filter.tag??"")??"",kt(q,t.filter.tag??""))}),W("change",M,Y=>t.onFilterChange({project:Y.currentTarget.value||null})),W("change",q,Y=>t.onFilterChange({tag:Y.currentTarget.value||null})),y(e,_),at()}vt(["change","click"]);var Fu=D('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt">专注完成</h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button">确定</button></div></div>');function Au(e,t){rt(t,!0);function n(o){o.target===o.currentTarget&&t.onClose()}function a(o){o.key==="Escape"&&t.onClose()}var l=Re();ht("keydown",Va,function(...o){var c;(c=t.open?a:void 0)==null||c.apply(this,o)});var i=Ne(l);{var s=o=>{var c=Fu(),u=v(c),f=d(v(u),4),b=v(f),_=d(f,2);K(()=>re(b,t.message)),W("click",c,n),W("click",_,function(...p){var g;(g=t.onClose)==null||g.apply(this,p)}),y(o,c)};J(i,o=>{t.open&&o(s)})}y(e,l),at()}vt(["click"]);var Ou=D('<div class="task-title svelte-17qnxlg"> </div>'),Iu=D('<option class="svelte-17qnxlg"> </option>'),Lu=D('<div class="task-picker svelte-17qnxlg"><label for="task-select" class="svelte-17qnxlg">本次专注:</label> <select id="task-select" class="svelte-17qnxlg"><option class="svelte-17qnxlg">-- 选择任务 --</option><!></select></div>'),Ru=D('<div class="error svelte-17qnxlg" role="alert"> </div>'),zu=D('<button class="btn primary svelte-17qnxlg">暂停</button> <button class="btn danger svelte-17qnxlg">停止</button>',1),Bu=D('<button class="btn primary svelte-17qnxlg">继续</button> <button class="btn danger svelte-17qnxlg">停止</button>',1),Uu=D('<button class="btn primary svelte-17qnxlg"> </button>'),Hu=D('<div class="layout svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist" aria-label="计时器模式"><button role="tab">专注</button> <button role="tab">短休息</button> <button role="tab">长休息</button></div> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-label svelte-17qnxlg"> </div> <!></div></div> <!> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> 今日已完成 <b class="svelte-17qnxlg"> </b> 个番茄 <!></div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg">今日日复盘</div> <!></div> <!></div></div> <!> <!></div>');function li(e,t){rt(t,!0);let n=L(Ie([])),a=L(Ie([])),l=L(Ie([])),i=L(""),s=L(null),o=L(0),c=L(null),u=L(!1),f=L(Ie({project:null,tag:null,priority:null,date:null})),b=L(!1),_=L("");const p=$(ws),g=$(()=>{const I=_n();return r(p).mode==="focus"?I.focusMinutes*60:r(p).mode==="short_break"?I.shortBreakMinutes*60:I.longBreakMinutes*60}),k=$(()=>r(g)>0?1-r(p).secondsLeft/r(g):0),w=$(()=>Math.floor(r(p).secondsLeft/60)),S=$(()=>r(p).secondsLeft%60),C=$(()=>`${String(r(w)).padStart(2,"0")}:${String(r(S)).padStart(2,"0")}`),T=$(()=>r(l).find(I=>I.id===r(i))??null),F=$(()=>!r(p).running&&r(p).sessionId===null&&r(p).mode==="focus"&&r(i)!==""&&!r(u)),M=$(()=>r(p).mode==="focus"),R=$(()=>r(p).mode==="focus"?"专注":r(p).mode==="short_break"?"短休息":"长休息");function V(){const I=new Date,xe=new Date(I.getFullYear(),I.getMonth(),I.getDate(),0,0,0,0),Ae=new Date(I.getFullYear(),I.getMonth(),I.getDate()+1,0,0,0,0);return{startMs:xe.getTime(),endMs:Ae.getTime()}}function _e(){const I=new Date,xe=new Date(I.getFullYear(),I.getMonth(),1,0,0,0,0),pt=new Date(I.getFullYear(),I.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:xe.getTime(),monthEndMs:pt}}function ee(){const I=new Date;return`${I.getFullYear()}-${String(I.getMonth()+1).padStart(2,"0")}-${String(I.getDate()).padStart(2,"0")}`}let q=!1;ct(()=>{q&&!r(p).running&&r(p).secondsLeft===0&&z(),q=r(p).running});function z(){r(T)?h(_,`太棒了!休息一下吧 —— ${r(T).title}`):h(_,"太棒了!休息一下吧"),h(b,!0),ae(),_n().desktopNotificationEnabled&&N("专注完成",r(_))}async function N(I,xe){try{let Ae=await el();if(Ae||(Ae=await js()==="granted"),!Ae)return;Ds({title:I,body:xe})}catch(Ae){console.warn("notification failed",Ae)}}async function E(){try{h(n,await Ss(),!0)}catch(I){console.warn("refresh projects",I)}}async function B(){try{h(a,await Ts(),!0)}catch(I){console.warn("refresh tags",I)}}async function de(){try{const I=_e();h(l,await Sl({status:null,month_start_ms:I.monthStartMs,month_end_ms:I.monthEndMs,project_id:r(f).project,tag_id:r(f).tag,priority:r(f).priority,date:r(f).date,limit:null}),!0)}catch(I){console.warn("refresh tasks",I)}}async function ne(){try{const I=await ja(ee());h(s,(I==null?void 0:I.content)??null,!0)}catch(I){console.warn("refresh review",I)}}async function ae(){try{const I=V();h(o,await tu(I.startMs,I.endMs),!0)}catch(I){console.warn("refresh minutes",I)}}ct(()=>{r(f),de()}),kl(async()=>{await Promise.all([E(),B(),de(),ne(),ae()])});async function Z(){if(r(F)){h(u,!0),h(c,null);try{const I=_n(),xe=await Qa(r(i),null,I.focusMinutes);Wl(r(i),xe.id)}catch(I){h(c,String(I),!0)}finally{h(u,!1)}}}async function ie(I){if(!r(p).sessionId)return;const xe=r(p).sessionId;ks(I);try{await Qc(xe,I)}catch(Ae){h(c,String(Ae),!0)}}function A(I){r(p).running||Vl(I)}async function G(I){r(p).running&&await ie(!1),h(i,I.id,!0),r(p).mode!=="focus"&&Vl("focus");try{const xe=await Qa(I.id,I.project_id??null,I.pomodoro_duration??_n().focusMinutes);Wl(I.id,xe.id)}catch(xe){h(c,String(xe),!0)}}async function O(I,xe){try{const Ae=await Promise.all(r(l).map(cn=>Ps(cn.id)));let pt=null;for(const cn of Ae){const $t=cn.find(hr=>hr.id===I);if($t){pt=$t;break}}if(!pt)return;await $a({...pt,is_completed:xe}),await de(),await ae()}catch(Ae){console.warn("toggle subtask",Ae)}}async function Y(I){try{const xe=ee(),Ae=await ja(xe),pt=Ae?{...Ae,content:I}:{id:crypto.randomUUID(),date:xe,content:I,updated_at:new Date().toISOString()};await Kl(pt),h(s,I,!0)}catch(xe){console.warn("save review",xe)}}async function H(){try{const I=ee(),xe=await ja(I);xe&&await Kl({...xe,content:""}),h(s,null)}catch(I){console.warn("delete review",I)}}function pe(){h(b,!1)}const fe=280,we=12,ve=(fe-we)/2,ze=2*Math.PI*ve,Be=$(()=>ze*(1-r(k)));var Se=Hu(),j=v(Se),U=v(j),X=v(U),ce=v(X);let ke;var ye=d(ce,2);let Me;var se=d(ye,2);let De;var ge=d(X,2),be=v(ge);le(be,"width",fe),le(be,"height",fe),le(be,"viewBox","0 0 280 280");var Ee=v(be);le(Ee,"cx",fe/2),le(Ee,"cy",fe/2),le(Ee,"r",ve),le(Ee,"stroke-width",we);var Q=d(Ee);le(Q,"cx",fe/2),le(Q,"cy",fe/2),le(Q,"r",ve),le(Q,"stroke-width",we),le(Q,"stroke-dasharray",ze),le(Q,"transform","rotate(-90 140 140)");var he=d(be,2),Pe=v(he),Qe=v(Pe),Ke=d(Pe,2),st=v(Ke),We=d(Ke,2);{var ue=I=>{var xe=Ou(),Ae=v(xe);K(()=>{le(xe,"title",r(T).title),re(Ae,r(T).title)}),y(I,xe)};J(We,I=>{r(T)&&I(ue)})}var oe=d(ge,2);{var x=I=>{var xe=Lu(),Ae=d(v(xe),2),pt=v(Ae);pt.value=pt.__value="";var cn=d(pt);Oe(cn,17,()=>r(l).filter($t=>$t.status==="active"),$t=>$t.id,($t,hr)=>{var Hr=Iu(),Bs=v(Hr),Pl={};K(()=>{re(Bs,r(hr).title),Pl!==(Pl=r(hr).id)&&(Hr.value=(Hr.__value=r(hr).id)??"")}),y($t,Hr)}),K(()=>Ae.disabled=r(p).running),ia(Ae,()=>r(i),$t=>h(i,$t)),y(I,xe)};J(oe,I=>{r(M)&&I(x)})}var P=d(oe,2);{var te=I=>{var xe=Ru(),Ae=v(xe);K(()=>re(Ae,`⚠ ${r(c)??""}`)),y(I,xe)};J(P,I=>{r(c)&&I(te)})}var je=d(P,2),$e=v(je);{var Dt=I=>{var xe=zu(),Ae=Ne(xe),pt=d(Ae,2);W("click",Ae,function(...cn){Ma==null||Ma.apply(this,cn)}),W("click",pt,()=>ie(!1)),y(I,xe)},Tt=I=>{var xe=Bu(),Ae=Ne(xe),pt=d(Ae,2);W("click",Ae,function(...cn){Pa==null||Pa.apply(this,cn)}),W("click",pt,()=>ie(!1)),y(I,xe)},pa=I=>{var xe=Uu(),Ae=v(xe);K(()=>{xe.disabled=!r(F),re(Ae,r(u)?"启动中...":"开始")}),W("click",xe,Z),y(I,xe)};J($e,I=>{r(p).running?I(Dt):r(p).sessionId?I(Tt,1):I(pa,-1)})}var Br=d(je,2),Ur=d(v(Br),2),As=v(Ur),Os=d(Ur,2);{var Is=I=>{var xe=Ja();K(Ae=>re(xe,`(每 ${Ae??""} 个 → 长休息)`),[()=>_n().longBreakInterval]),y(I,xe)};J(Os,I=>{r(M)&&I(Is)})}var Tl=d(Br,2),Ls=d(v(Tl),2);ru(Ls,{get value(){return r(s)},placeholder:"写下今天的复盘...",rows:2,onSave:Y,onDelete:H});var Rs=d(Tl,2);xu(Rs,{});var Ml=d(j,2);Nu(Ml,{get todayMinutes(){return r(o)},get projects(){return r(n)},get tags(){return r(a)},get tasks(){return r(l)},get filter(){return r(f)},onFilterChange:I=>h(f,{...r(f),...I},!0),onStartTask:G,onToggleSubtask:O});var zs=d(Ml,2);Au(zs,{get open(){return r(b)},get message(){return r(_)},onClose:pe}),K(()=>{ke=He(ce,1,"mode-tab svelte-17qnxlg",null,ke,{active:r(p).mode==="focus"}),ce.disabled=r(p).running,le(ce,"aria-selected",r(p).mode==="focus"),Me=He(ye,1,"mode-tab svelte-17qnxlg",null,Me,{active:r(p).mode==="short_break"}),ye.disabled=r(p).running,le(ye,"aria-selected",r(p).mode==="short_break"),De=He(se,1,"mode-tab svelte-17qnxlg",null,De,{active:r(p).mode==="long_break"}),se.disabled=r(p).running,le(se,"aria-selected",r(p).mode==="long_break"),le(Q,"stroke-dashoffset",r(Be)),re(Qe,r(C)),re(st,r(R)),re(As,r(p).focusCompletedInCycle)}),W("click",ce,()=>A("focus")),W("click",ye,()=>A("short_break")),W("click",se,()=>A("long_break")),y(e,Se),at()}vt(["click"]);//! 截止时间（due_date）相关工具。
//!
//! 后端 due_date 存为 ISO datetime 字符串（如 "2026-07-12T09:30:00"）。
//! 用户也可以只选日期 — 后端接受 "YYYY-MM-DD"。
//!
//! `TaskForm` / `TaskDetailPanel` 共用本工具保证校验逻辑一致。
//!
//! 与 v1 完全对齐：
//! - `hasTimePart`：含 'T' 即视为用户选了时分
//! - `datePart`：取 YYYY-MM-DD 部分
//! - `todayStr`：今天 YYYY-MM-DD
//! - `fillCurrentTime`：补全时分（默认当前时刻），用于"设置了提醒但用户未选时间"的兜底
function ll(e){return!!e&&e.includes("T")}function gt(e){return(e||"").slice(0,10)}function an(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Yu(){const e=new Date;return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function ii(e){return`${gt(e)||an()}T${Yu()}`}function $r(){const e=new Date;return e.setDate(e.getDate()+1),`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}var Wu=D('<span class="filter-stats svelte-qbpxhc"> </span>'),Vu=D('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <!></button>'),Gu=D('<button type="button" class="add-root svelte-qbpxhc" aria-label="新增根清单" title="新增清单"><!></button>'),Ku=D('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" placeholder="清单名称..." class="add-input svelte-qbpxhc"/></div>'),Xu=D('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Ju=D('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),Zu=D('<span class="expand-spacer svelte-qbpxhc"></span>'),Qu=D('<button type="button" class="more-btn svelte-qbpxhc" aria-label="更多操作"><!></button>'),$u=D('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),ev=D('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),tv=D('<button type="button" class="ctx-item svelte-qbpxhc"><!> 新增子清单</button>'),nv=D('<button type="button" class="ctx-item svelte-qbpxhc"><!> 重命名</button>'),rv=D('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> 删除</button>'),av=D('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),lv=D('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),iv=D('<div class="empty-hint svelte-qbpxhc">还没有清单,点 + 新建</div>'),sv=D('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),ov=D('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" placeholder="搜索任务标题..." class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> 清单</button> <!></div> <!></div></aside>');function cv(e,t){rt(t,!0);let n=Ft(t,"search",3,""),a=L(!0),l=L(Ie(new Set)),i=L(null),s=L(null),o=L(""),c=L(null),u=L("");function f(A){const G=A.getDay(),O=G===0?-6:1-G,Y=new Date(A);return Y.setDate(Y.getDate()+O),Y.setHours(0,0,0,0),Y}function b(A){const G=f(A),O=new Date(G);return O.setDate(O.getDate()+6),O.setHours(23,59,59,999),O}function _(A,G){if(G==="journal")return{timeStr:"",count:0};const O=an(),Y=$r(),H=f(new Date),pe=b(new Date);let fe=A;G==="today"&&(fe=A.filter(Se=>gt(Se.due_date)===O)),G==="tomorrow"&&(fe=A.filter(Se=>gt(Se.due_date)===Y)),G==="week"&&(fe=A.filter(Se=>{if(!Se.due_date)return!1;const j=new Date(Se.due_date);return j>=H&&j<=pe})),G==="planned"&&(fe=A.filter(Se=>Se.due_date!==null&&Se.due_date!==void 0)),G==="completed"&&(fe=A.filter(Se=>Se.status==="completed"));const we=fe.reduce((Se,j)=>Se+(j.estimated_pomodoros||0)*(j.pomodoro_duration||25),0),ve=Math.floor(we/60),ze=we%60;return{timeStr:ve>0?`${ve}h ${ze}m`:`${ze}m`,count:fe.length}}function p(A){const G=new Map,O=[];for(const H of A)G.set(H.id,{...H,children:[],depth:0});for(const H of A){const pe=G.get(H.id);pe&&(H.parent_id&&G.has(H.parent_id)?G.get(H.parent_id).children.push(pe):O.push(pe))}const Y=(H,pe)=>{for(const fe of H)fe.depth=pe,Y(fe.children,pe+1)};return Y(O,0),O}function g(A,G){const O=[];for(const Y of A)O.push(Y),G.has(Y.id)&&Y.children.length>0&&O.push(...g(Y.children,G));return O}const k=$(()=>p(t.projects)),w=$(()=>g(r(k),r(l))),S=[{key:"today",icon:bu,label:"今天"},{key:"tomorrow",icon:mu,label:"明天"},{key:"week",icon:Es,label:"本周"},{key:"planned",icon:su,label:"已计划"},{key:"completed",icon:tl,label:"已完成"},{key:"journal",icon:ou,label:"手账"}],C=$(()=>t.selectedProject===null?t.filter:"");function T(A){const G=new Set(r(l));G.has(A)?G.delete(A):G.add(A),h(l,G,!0)}function F(A){t.onSetFilter(A),t.onSelectProject(null)}var M=ov(),R=v(M),V=v(R);gu(V,{size:14,class:"search-icon"});var _e=d(V,2),ee=d(R,2);Oe(ee,21,()=>S,A=>A.key,(A,G)=>{const O=$(()=>_(t.tasks,r(G).key)),Y=$(()=>r(C)===r(G).key);var H=Vu();let pe;var fe=v(H),we=v(fe);vs(we,()=>r(G).icon,(Se,j)=>{j(Se,{size:16})});var ve=d(we),ze=d(fe,2);{var Be=Se=>{var j=Wu(),U=v(j);K(()=>re(U,`${r(O).timeStr??""} ${r(O).count??""}`)),y(Se,j)};J(ze,Se=>{r(O).count>0&&Se(Be)})}K(()=>{pe=He(H,1,"filter-btn svelte-qbpxhc",null,pe,{active:r(Y)}),re(ve,` ${r(G).label??""}`)}),W("click",H,()=>F(r(G).key)),y(A,H)});var q=d(ee,2),z=v(q),N=v(z),E=v(N);{var B=A=>{sa(A,{size:14})},de=A=>{oa(A,{size:14})};J(E,A=>{r(a)?A(B):A(de,-1)})}var ne=d(N,2);{var ae=A=>{var G=Gu(),O=v(G);rl(O,{size:14}),W("click",G,()=>{h(c,"root"),h(u,"")}),y(A,G)};J(ne,A=>{t.onCreateProject&&A(ae)})}var Z=d(z,2);{var ie=A=>{var G=sv(),O=v(G);{var Y=we=>{var ve=Ku(),ze=v(ve);Kr(ze,!0),W("keydown",ze,Be=>{if(Be.key==="Enter"){const Se=r(u).trim();Se&&t.onCreateProject&&t.onCreateProject(Se,null),h(c,null),h(u,"")}Be.key==="Escape"&&(h(c,null),h(u,""))}),ht("blur",ze,()=>{const Be=r(u).trim();Be&&t.onCreateProject&&t.onCreateProject(Be,null),h(c,null),h(u,"")}),xt(ze,()=>r(u),Be=>h(u,Be)),y(we,ve)};J(O,we=>{r(c)==="root"&&t.onCreateProject&&we(Y)})}var H=d(O,2);Oe(H,17,()=>r(w),we=>we.id,(we,ve)=>{const ze=$(()=>t.selectedProject===r(ve).id),Be=$(()=>r(i)===r(ve).id),Se=$(()=>r(s)===r(ve).id),j=$(()=>r(ve).children.length>0),U=$(()=>r(l).has(r(ve).id));var X=lv(),ce=v(X);{var ke=be=>{var Ee=Xu(),Q=v(Ee);Kr(Q,!0),W("keydown",Q,he=>{if(he.key==="Enter"){const Pe=r(o).trim();Pe&&t.onUpdateProject&&t.onUpdateProject(r(ve).id,Pe),h(s,null),h(o,"")}he.key==="Escape"&&(h(s,null),h(o,""))}),ht("blur",Q,()=>{const he=r(o).trim();he&&t.onUpdateProject&&t.onUpdateProject(r(ve).id,he),h(s,null),h(o,"")}),xt(Q,()=>r(o),he=>h(o,he)),y(be,Ee)},ye=be=>{var Ee=$u();let Q;var he=v(Ee),Pe=v(he);{var Qe=P=>{var te=Ju(),je=v(te);{var $e=Tt=>{sa(Tt,{size:12})},Dt=Tt=>{oa(Tt,{size:12})};J(je,Tt=>{r(U)?Tt($e):Tt(Dt,-1)})}K(()=>le(te,"aria-label",r(U)?"收起":"展开")),W("click",te,Tt=>{Tt.stopPropagation(),T(r(ve).id)}),y(P,te)},Ke=P=>{var te=Zu();y(P,te)};J(Pe,P=>{r(j)?P(Qe):P(Ke,-1)})}var st=d(Pe,2);{let P=$(()=>r(ve).color||"var(--color-accent)");fu(st,{size:14,get color(){return r(P)}})}var We=d(st,2),ue=v(We),oe=d(he,2);{var x=P=>{var te=Qu(),je=v(te);vu(je,{size:14}),W("click",te,$e=>{$e.stopPropagation(),h(i,r(Be)?null:r(ve).id,!0)}),y(P,te)};J(oe,P=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&r(ve).depth<2)&&P(x)})}K(()=>{Q=He(Ee,1,"node-row svelte-qbpxhc",null,Q,{active:r(ze)}),re(ue,r(ve).name)}),W("click",he,()=>{t.onSelectProject(r(ve).id),t.onSetFilter("")}),W("keydown",he,P=>{(P.key==="Enter"||P.key===" ")&&(P.preventDefault(),t.onSelectProject(r(ve).id),t.onSetFilter(""))}),y(be,Ee)};J(ce,be=>{r(Se)?be(ke):be(ye,-1)})}var Me=d(ce,2);{var se=be=>{var Ee=ev(),Q=v(Ee);Kr(Q,!0),K(()=>{on(Ee,`padding-left: ${(r(ve).depth+1)*12+12}px;`),le(Q,"placeholder",r(ve).depth===0?"子清单名称...":"孙清单名称...")}),W("keydown",Q,he=>{if(he.key==="Enter"){const Pe=r(u).trim();Pe&&t.onCreateProject&&t.onCreateProject(Pe,r(ve).id),h(c,null),h(u,"");const Qe=new Set(r(l));Qe.add(r(ve).id),h(l,Qe,!0)}he.key==="Escape"&&(h(c,null),h(u,""))}),ht("blur",Q,()=>{const he=r(u).trim();he&&t.onCreateProject&&t.onCreateProject(he,r(ve).id),h(c,null),h(u,"");const Pe=new Set(r(l));Pe.add(r(ve).id),h(l,Pe,!0)}),xt(Q,()=>r(u),he=>h(u,he)),y(be,Ee)};J(Me,be=>{r(c)===r(ve).id&&t.onCreateProject&&be(se)})}var De=d(Me,2);{var ge=be=>{var Ee=av(),Q=v(Ee);{var he=We=>{var ue=tv(),oe=v(ue);rl(oe,{size:12}),W("click",ue,()=>{h(c,r(ve).id,!0),h(u,""),h(i,null)}),y(We,ue)};J(Q,We=>{t.onCreateProject&&r(ve).depth<2&&We(he)})}var Pe=d(Q,2);{var Qe=We=>{var ue=nv(),oe=v(ue);hu(oe,{size:12}),W("click",ue,()=>{h(o,r(ve).name,!0),h(s,r(ve).id,!0),h(i,null)}),y(We,ue)};J(Pe,We=>{t.onUpdateProject&&We(Qe)})}var Ke=d(Pe,2);{var st=We=>{var ue=rv(),oe=v(ue);yu(oe,{size:12}),W("click",ue,()=>{t.onDeleteProject(r(ve).id),h(i,null)}),y(We,ue)};J(Ke,We=>{t.onDeleteProject&&We(st)})}y(be,Ee)};J(De,be=>{r(Be)&&!r(Se)&&be(ge)})}K(()=>on(X,`padding-left: ${r(ve).depth*12}px;`)),y(we,X)});var pe=d(H,2);{var fe=we=>{var ve=iv();y(we,ve)};J(pe,we=>{t.projects.length===0&&r(c)!=="root"&&we(fe)})}y(A,G)};J(Z,A=>{r(a)&&A(ie)})}K(()=>En(_e,n())),W("input",_e,A=>{var G;return(G=t.onSearchChange)==null?void 0:G.call(t,A.currentTarget.value)}),W("click",N,()=>h(a,!r(a))),y(e,M),at()}vt(["input","click","keydown"]);var uv=D('<span class="pri-badge svelte-3041n"> </span>'),vv=D('<span class="tag svelte-3041n"> </span>'),dv=D('<div class="row-2 svelte-3041n"></div>'),fv=D("<span></span>"),hv=D('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),_v=D('<span class="due svelte-3041n"> </span>'),pv=D('<button type="button" class="start svelte-3041n" aria-label="开始专注" title="开始专注"><!></button>'),gv=D('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function Ns(e,t){rt(t,!0);const n=$(()=>t.task.status==="completed"),a=$(()=>t.task.estimated_pomodoros||0),l=$(()=>t.task.completed_pomodoros||0),i=$(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),s=$(()=>({high:"高",medium:"中",low:"低",none:""})[t.task.priority||"none"]),o=$(()=>t.task.due_date?gt(t.task.due_date):"");var c=gv();let u;var f=v(c);let b;var _=v(f);{var p=E=>{cu(E,{size:12,strokeWidth:3,color:"#fff"})};J(_,E=>{r(n)&&E(p)})}var g=d(f,2),k=v(g),w=v(k);{var S=E=>{var B=uv(),de=v(B);K(()=>{on(B,`--pri-color: ${r(i)??""}`),re(de,r(s))}),y(E,B)};J(w,E=>{t.task.priority&&t.task.priority!=="none"&&E(S)})}var C=d(w,2),T=v(C),F=d(k,2);{var M=E=>{var B=dv();Oe(B,21,()=>t.task.tags.slice(0,3),de=>de.id,(de,ne)=>{var ae=vv(),Z=v(ae);K(()=>re(Z,`#${r(ne).name??""}`)),y(de,ae)}),y(E,B)};J(F,E=>{t.task.tags&&t.task.tags.length>0&&E(M)})}var R=d(F,2),V=v(R);{var _e=E=>{var B=hv(),de=v(B);Oe(de,21,()=>Array.from({length:Math.min(r(a),8)}),sr,(Z,ie,A)=>{var G=fv();let O;K(()=>O=He(G,1,"dot svelte-3041n",null,O,{filled:A<r(l)})),y(Z,G)});var ne=d(de,2),ae=v(ne);K(()=>re(ae,`${r(l)??""}/${r(a)??""} 番茄`)),y(E,B)};J(V,E=>{r(a)>0&&E(_e)})}var ee=d(V,2);{var q=E=>{var B=_v(),de=v(B);K(()=>re(de,r(o))),y(E,B)};J(ee,E=>{r(o)&&E(q)})}var z=d(g,2);{var N=E=>{var B=pv(),de=v(B);qs(de,{size:13,color:"#fff",fill:"#fff"}),W("click",B,ne=>{var ae;ne.stopPropagation(),(ae=t.onStart)==null||ae.call(t,t.task)}),y(E,B)};J(z,E=>{!r(n)&&t.onStart&&E(N)})}K(()=>{u=He(c,1,"task-card svelte-3041n",null,u,{selected:t.selected,done:r(n)}),le(c,"aria-label",t.task.title),b=He(f,1,"check svelte-3041n",null,b,{checked:r(n)}),le(f,"aria-label",r(n)?"标记为未完成":"标记为完成"),re(T,t.task.title)}),W("click",c,()=>t.onSelect(t.task)),W("keydown",c,E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),t.onSelect(t.task))}),W("click",f,E=>{E.stopPropagation(),t.onToggle(t.task.id)}),y(e,c),at()}vt(["click","keydown"]);var bv=D('<div class="empty svelte-q02l1n">还没有标签,在「设置 → 标签」里创建</div>'),mv=D('<span class="check svelte-q02l1n">✓</span>'),yv=D('<button type="button"><!> <span class="name svelte-q02l1n"> </span></button>'),wv=D('<div class="chips svelte-q02l1n" role="group" aria-label="标签多选"></div>');function kv(e,t){rt(t,!0);const n=$(()=>new Set(t.selected));function a(u){const f=new Set(r(n));f.has(u)?f.delete(u):f.add(u),t.onChange([...f])}function l(u){return`--chip-color: ${u&&u.length>0?u:"var(--color-accent)"};`}var i=Re(),s=Ne(i);{var o=u=>{var f=bv();y(u,f)},c=u=>{var f=wv();Oe(f,21,()=>t.tags,b=>b.id,(b,_)=>{const p=$(()=>r(n).has(r(_).id));var g=yv();let k;var w=v(g);{var S=F=>{var M=mv();y(F,M)};J(w,F=>{r(p)&&F(S)})}var C=d(w,2),T=v(C);K(F=>{k=He(g,1,"chip svelte-q02l1n",null,k,{on:r(p)}),on(g,F),le(g,"aria-pressed",r(p)),re(T,r(_).name)},[()=>l(r(_).color)]),W("click",g,()=>a(r(_).id)),y(b,g)}),y(u,f)};J(s,u=>{t.tags.length===0?u(o):u(c,-1)})}y(e,i),at()}vt(["click"]);var xv=D('<input type="text" class="title-input svelte-1t5orp1" aria-label="编辑子任务"/>'),Sv=D('<button type="button" class="title-btn svelte-1t5orp1" title="双击编辑"> </button>'),Tv=D('<li><input type="checkbox" aria-label="切换子任务完成" class="svelte-1t5orp1"/> <!> <button type="button" class="del svelte-1t5orp1" aria-label="删除子任务">×</button></li>');function Mv(e,t){rt(t,!0);let n=L(!1),a=L(Ie(bt(()=>t.subtask.title))),l=L(null);ct(()=>{r(n)||h(a,t.subtask.title,!0)});function i(){h(a,t.subtask.title,!0),h(n,!0),queueMicrotask(()=>{var S;return(S=r(l))==null?void 0:S.focus()})}function s(){const S=r(a).trim();r(n)&&(h(n,!1),S&&S!==t.subtask.title?t.onChange({...t.subtask,title:S}):S||h(a,t.subtask.title,!0))}function o(){h(a,t.subtask.title,!0),h(n,!1)}function c(S){S.key==="Enter"?(S.preventDefault(),s()):S.key==="Escape"&&(S.preventDefault(),o())}function u(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var f=Tv();let b;var _=v(f),p=d(_,2);{var g=S=>{var C=xv();Nc(C,T=>h(l,T),()=>r(l)),ht("blur",C,s),W("keydown",C,c),xt(C,()=>r(a),T=>h(a,T)),y(S,C)},k=S=>{var C=Sv(),T=v(C);K(()=>re(T,t.subtask.title)),W("dblclick",C,i),y(S,C)};J(p,S=>{r(n)?S(g):S(k,-1)})}var w=d(p,2);K(()=>{b=He(f,1,"row svelte-1t5orp1",null,b,{done:t.subtask.is_completed}),Dr(_,t.subtask.is_completed)}),W("change",_,u),W("click",w,()=>t.onDelete(t.subtask.id)),y(e,f),at()}vt(["change","keydown","dblclick","click"]);var Pv=D("<span> </span>"),Ca=D("<option> </option>"),jv=D('<button type="button" class="link svelte-1qppxcb">清除</button>'),Dv=D('<aside class="panel svelte-1qppxcb" aria-label="任务详情"><header class="head svelte-1qppxcb"><div class="meta svelte-1qppxcb"><span class="proj svelte-1qppxcb"> </span> <!></div> <button class="close svelte-1qppxcb" aria-label="关闭">×</button></header> <input class="title svelte-1qppxcb" aria-label="标题"/> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="desc">描述</label> <textarea id="desc" class="desc svelte-1qppxcb" rows="4" placeholder="补充细节..."></textarea></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="proj">清单</label> <select id="proj" class="svelte-1qppxcb"><option>无项目</option><!></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="pri">优先级</label> <select id="pri" class="svelte-1qppxcb"><option>无</option><option>高</option><option>中</option><option>低</option></select></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="due">截止日期</label> <div class="row-inline svelte-1qppxcb"><input id="due" type="datetime-local" class="svelte-1qppxcb"/> <!></div></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="reminder">提醒</label> <select id="reminder" class="svelte-1qppxcb"></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="repeat">重复</label> <select id="repeat" class="svelte-1qppxcb"></select></div></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb">标签</span> <!></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb">子任务</span> <ul class="sub-list svelte-1qppxcb"></ul> <form class="sub-add svelte-1qppxcb"><input type="text" placeholder="添加子任务..." aria-label="新子任务" class="svelte-1qppxcb"/> <button type="submit" class="svelte-1qppxcb">添加</button></form></section></aside>');function Ev(e,t){rt(t,!0);let n=L(Ie(bt(()=>t.task.title))),a=L(Ie(bt(()=>t.task.description??""))),l=L(Ie(bt(()=>i(t.task.due_date))));ct(()=>{h(n,t.task.title,!0),h(a,t.task.description??"",!0),h(l,i(t.task.due_date),!0)});function i(x){if(!x)return"";try{const P=new Date(x);if(isNaN(P.getTime()))return"";const te=P.getTimezoneOffset();return new Date(P.getTime()-te*6e4).toISOString().slice(0,16)}catch{return""}}function s(x){if(!x)return null;try{const P=new Date(x);return isNaN(P.getTime())?null:P.toISOString()}catch{return null}}function o(){return new Date().toISOString()}async function c(x){try{await xs({...t.task,...x,updated_at:o()}),t.onChanged()}catch(P){console.error("patch task failed",P),alert(`保存失败:${P}`)}}async function u(){const x=r(n).trim();!x||x===t.task.title||await c({title:x})}async function f(){r(a)!==(t.task.description??"")&&await c({description:r(a)})}async function b(){const x=s(r(l));x!==t.task.due_date&&await c({due_date:x})}function _(){h(l,""),c({due_date:null})}let p=L(Ie([]));ct(()=>{g()});async function g(){try{const x=await Zc(t.task.id);h(p,x.map(P=>P.id),!0)}catch(x){console.error("load tags failed",x)}}async function k(x){const P=r(p);h(p,x,!0);try{await Ms(t.task.id,x),t.onChanged()}catch(te){h(p,P,!0),alert(`设置标签失败:${te}`)}}let w=L(Ie([])),S=L("");ct(()=>{C()});async function C(){try{h(w,await Ps(t.task.id),!0)}catch(x){console.error("load subtasks failed",x)}}async function T(){const x=r(S).trim();if(!x)return;h(S,"");const P={id:crypto.randomUUID(),task_id:t.task.id,title:x,is_completed:!1,position:r(w).length,created_at:o(),updated_at:o()};try{const te=await $a(P);h(w,[...r(w),te],!0),t.onChanged()}catch(te){alert(`添加子任务失败:${te}`)}}async function F(x){const P=r(w).find(te=>te.id===x.id);h(w,r(w).map(te=>te.id===x.id?x:te),!0);try{await $a(x),t.onChanged()}catch(te){P&&h(w,r(w).map(je=>je.id===P.id?P:je),!0),alert(`更新子任务失败:${te}`)}}async function M(x){const P=r(w);h(w,r(w).filter(te=>te.id!==x),!0);try{await $c(x),t.onChanged()}catch(te){h(w,P,!0),alert(`删除子任务失败:${te}`)}}const R=[{value:"none",label:"不提醒"},{value:"on_time",label:"准时"},{value:"minutes5",label:"提前 5 分钟"},{value:"minutes30",label:"提前 30 分钟"},{value:"hour1",label:"提前 1 小时"},{value:"day1",label:"提前 1 天"},{value:"days2",label:"提前 2 天"}],V=[{value:"none",label:"不重复"},{value:"daily",label:"每天"},{value:"weekdays",label:"工作日"},{value:"weekly",label:"每周"},{value:"monthly",label:"每月"},{value:"yearly",label:"每年"}];function _e(x){var P;return x?((P=t.projects.find(te=>te.id===x))==null?void 0:P.name)??"未知":"无项目"}function ee(x){return{high:"高",medium:"中",low:"低",none:""}[x??"none"]??""}var q=Dv(),z=v(q),N=v(z),E=v(N),B=v(E),de=d(E,2);{var ne=x=>{var P=Pv(),te=v(P);K(je=>{He(P,1,`pri pri-${t.task.priority??""}`,"svelte-1qppxcb"),re(te,je)},[()=>ee(t.task.priority)]),y(x,P)};J(de,x=>{t.task.priority!=="none"&&x(ne)})}var ae=d(N,2),Z=d(z,2),ie=d(Z,2),A=d(v(ie),2),G=d(ie,2),O=v(G),Y=d(v(O),2),H=v(Y);H.value=H.__value="";var pe=d(H);Oe(pe,17,()=>t.projects,x=>x.id,(x,P)=>{var te=Ca(),je=v(te),$e={};K(()=>{re(je,r(P).name),$e!==($e=r(P).id)&&(te.value=(te.__value=r(P).id)??"")}),y(x,te)});var fe;At(Y);var we=d(O,2),ve=d(v(we),2),ze=v(ve);ze.value=ze.__value="none";var Be=d(ze);Be.value=Be.__value="high";var Se=d(Be);Se.value=Se.__value="medium";var j=d(Se);j.value=j.__value="low";var U;At(ve);var X=d(G,2),ce=d(v(X),2),ke=v(ce),ye=d(ke,2);{var Me=x=>{var P=jv();W("click",P,_),y(x,P)};J(ye,x=>{r(l)&&x(Me)})}var se=d(X,2),De=v(se),ge=d(v(De),2);Oe(ge,21,()=>R,x=>x.value,(x,P)=>{var te=Ca(),je=v(te),$e={};K(()=>{re(je,r(P).label),$e!==($e=r(P).value)&&(te.value=(te.__value=r(P).value)??"")}),y(x,te)});var be;At(ge);var Ee=d(De,2),Q=d(v(Ee),2);Oe(Q,21,()=>V,x=>x.value,(x,P)=>{var te=Ca(),je=v(te),$e={};K(()=>{re(je,r(P).label),$e!==($e=r(P).value)&&(te.value=(te.__value=r(P).value)??"")}),y(x,te)});var he;At(Q);var Pe=d(se,2),Qe=d(v(Pe),2);kv(Qe,{get tags(){return t.allTags},get selected(){return r(p)},onChange:k});var Ke=d(Pe,2),st=d(v(Ke),2);Oe(st,21,()=>r(w),x=>x.id,(x,P)=>{Mv(x,{get subtask(){return r(P)},onChange:F,onDelete:M})});var We=d(st,2),ue=v(We),oe=d(ue,2);K((x,P)=>{re(B,x),fe!==(fe=t.task.project_id??"")&&(Y.value=(Y.__value=t.task.project_id??"")??"",kt(Y,t.task.project_id??"")),U!==(U=t.task.priority)&&(ve.value=(ve.__value=t.task.priority)??"",kt(ve,t.task.priority)),be!==(be=t.task.reminder??"none")&&(ge.value=(ge.__value=t.task.reminder??"none")??"",kt(ge,t.task.reminder??"none")),he!==(he=t.task.repeat??"none")&&(Q.value=(Q.__value=t.task.repeat??"none")??"",kt(Q,t.task.repeat??"none")),oe.disabled=P},[()=>_e(t.task.project_id),()=>!r(S).trim()]),W("click",ae,function(...x){var P;(P=t.onClose)==null||P.apply(this,x)}),ht("blur",Z,u),W("keydown",Z,x=>{x.key==="Enter"&&(x.preventDefault(),x.currentTarget.blur())}),xt(Z,()=>r(n),x=>h(n,x)),ht("blur",A,f),xt(A,()=>r(a),x=>h(a,x)),W("change",Y,x=>{const P=x.currentTarget.value;c({project_id:P||null})}),W("change",ve,x=>{const P=x.currentTarget.value;c({priority:P})}),ht("blur",ke,b),xt(ke,()=>r(l),x=>h(l,x)),W("change",ge,x=>{const P=x.currentTarget.value;c({reminder:P})}),W("change",Q,x=>{const P=x.currentTarget.value;c({repeat:P})}),ht("submit",We,x=>{x.preventDefault(),T()}),xt(ue,()=>r(S),x=>h(S,x)),y(e,q),at()}vt(["click","keydown","change"]);var Cv=D('<div class="group-tasks svelte-1u318f6"></div>'),qv=D('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),Nv=D('<div class="grouped svelte-1u318f6"></div>');function Fv(e,t){rt(t,!0);const n="unscheduled";let a=L(Ie(new Set));const l=["周日","周一","周二","周三","周四","周五","周六"];function i(u,f){const b=new Date(u+"T00:00:00"),_=f.reduce((p,g)=>p+(g.estimated_pomodoros||0)*(g.pomodoro_duration||25),0);return`${u}（${l[b.getDay()]}）| ${_} 分钟`}function s(u){const f=new Set(r(a));f.has(u)?f.delete(u):f.add(u),h(a,f,!0)}const o=$(()=>{const u=new Map;for(const b of t.tasks){let _;t.groupBy==="completed_at"?b.completed_at?_=gt(b.completed_at):_=n:_=b.due_date?gt(b.due_date):n,u.has(_)||u.set(_,[]),u.get(_).push(b)}const f=Array.from(u.entries());return f.sort((b,_)=>b[0]===n?1:_[0]===n?-1:new Date(b[0]).getTime()-new Date(_[0]).getTime()),f});var c=Nv();Oe(c,21,()=>r(o),([u,f])=>u,(u,f)=>{var b=$(()=>gi(r(f),2));let _=()=>r(b)[0],p=()=>r(b)[1];const g=$(()=>r(a).has(_()));var k=qv(),w=v(k),S=v(w),C=v(S),T=d(S,2),F=v(T);{var M=ee=>{oa(ee,{size:16})},R=ee=>{sa(ee,{size:16})};J(F,ee=>{r(g)?ee(M):ee(R,-1)})}var V=d(w,2);{var _e=ee=>{var q=Cv();Oe(q,21,p,z=>z.id,(z,N)=>{{let E=$(()=>{var B;return((B=t.selectedTask)==null?void 0:B.id)===r(N).id});Ns(z,{get task(){return r(N)},get selected(){return r(E)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),y(ee,q)};J(V,ee=>{r(g)||ee(_e)})}K(ee=>{le(w,"aria-expanded",!r(g)),re(C,ee)},[()=>_()===n?"未排期":i(_(),p())]),W("click",w,()=>s(_())),y(u,k)}),y(e,c),at()}vt(["click"]);var Av=D('<span class="unit svelte-1i37zgo"> </span>'),Ov=D('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function dt(e,t){var n=Ov();let a;var l=v(n),i=v(l);vs(i,()=>t.icon,(_,p)=>{p(_,{size:18,strokeWidth:1.8})});var s=d(l,2),o=v(s),c=d(o);{var u=_=>{var p=Av(),g=v(p);K(()=>re(g,t.unit)),y(_,p)};J(c,_=>{t.unit&&_(u)})}var f=d(s,2),b=v(f);K(()=>{a=He(n,1,"stat-card svelte-1i37zgo",null,a,{accent:t.accent}),re(o,t.value),re(b,t.label)}),y(e,n)}var si=D("<option> </option>"),Iv=D('<button type="button" class="clear-btn svelte-1ko7jxa">清除筛选</button>'),Lv=D('<button type="button" class="export-btn svelte-1ko7jxa"><!> 导出</button>'),Rv=D('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa" aria-label="项目筛选"><option>全部项目</option><!></select> <select class="select svelte-1ko7jxa" aria-label="标签筛选"><option>全部标签</option><!></select> <select class="select svelte-1ko7jxa" aria-label="优先级筛选"><option>全部优先级</option><option>高</option><option>中</option><option>低</option><option>无</option></select> <button type="button">本周</button> <button type="button">本月</button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa">到期日</span> <input type="date" class="date svelte-1ko7jxa" aria-label="起始日期"/> <span class="hint svelte-1ko7jxa">至</span> <input type="date" class="date svelte-1ko7jxa" aria-label="结束日期"/> <!></div></div>');function oi(e,t){rt(t,!0);const n=$(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function a(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var l=Rv(),i=v(l),s=v(i),o=v(s);o.value=o.__value="";var c=d(o);Oe(c,17,()=>t.projects,ne=>ne.id,(ne,ae)=>{var Z=si(),ie=v(Z),A={};K(()=>{re(ie,r(ae).name),A!==(A=r(ae).id)&&(Z.value=(Z.__value=r(ae).id)??"")}),y(ne,Z)});var u;At(s);var f=d(s,2),b=v(f);b.value=b.__value="";var _=d(b);Oe(_,17,()=>t.tags,ne=>ne.id,(ne,ae)=>{var Z=si(),ie=v(Z),A={};K(()=>{re(ie,r(ae).name),A!==(A=r(ae).id)&&(Z.value=(Z.__value=r(ae).id)??"")}),y(ne,Z)});var p;At(f);var g=d(f,2),k=v(g);k.value=k.__value="";var w=d(k);w.value=w.__value="high";var S=d(w);S.value=S.__value="medium";var C=d(S);C.value=C.__value="low";var T=d(C);T.value=T.__value="none";var F;At(g);var M=d(g,2);let R;var V=d(M,2);let _e;var ee=d(V,2);{var q=ne=>{var ae=Iv();W("click",ae,a),y(ne,ae)};J(ee,ne=>{r(n)&&ne(q)})}var z=d(i,2),N=d(v(z),2),E=d(N,4),B=d(E,2);{var de=ne=>{var ae=Lv(),Z=v(ae);uu(Z,{size:14}),W("click",ae,function(...ie){var A;(A=t.onExport)==null||A.apply(this,ie)}),y(ne,ae)};J(B,ne=>{t.onExport&&ne(de)})}K((ne,ae)=>{le(s,"title",ne),u!==(u=t.filterProject??"")&&(s.value=(s.__value=t.filterProject??"")??"",kt(s,t.filterProject??"")),le(f,"title",ae),p!==(p=t.filterTag??"")&&(f.value=(f.__value=t.filterTag??"")??"",kt(f,t.filterTag??"")),F!==(F=t.filterPriority??"")&&(g.value=(g.__value=t.filterPriority??"")??"",kt(g,t.filterPriority??"")),R=He(M,1,"preset-btn svelte-1ko7jxa",null,R,{on:t.filterPreset==="week"}),_e=He(V,1,"preset-btn svelte-1ko7jxa",null,_e,{on:t.filterPreset==="month"}),En(N,t.filterStartDate),En(E,t.filterEndDate)},[()=>{var ne;return t.filterProject!==null?(ne=t.projects.find(ae=>ae.id===t.filterProject))==null?void 0:ne.name:"全部项目"},()=>{var ne;return t.filterTag!==null?(ne=t.tags.find(ae=>ae.id===t.filterTag))==null?void 0:ne.name:"全部标签"}]),W("change",s,ne=>{const ae=ne.currentTarget.value;t.setFilterProject(ae||null)}),W("change",f,ne=>{const ae=ne.currentTarget.value;t.setFilterTag(ae||null)}),W("change",g,ne=>{const ae=ne.currentTarget.value;t.setFilterPriority(ae||null)}),W("click",M,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),W("click",V,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),W("change",N,ne=>t.setFilterStartDate(ne.currentTarget.value)),W("change",E,ne=>t.setFilterEndDate(ne.currentTarget.value)),y(e,l),at()}vt(["change","click"]);var zv=Un('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function Bv(e,t){let n=Ft(t,"size",3,14),a=Ft(t,"filled",3,!0);var l=zv(),i=v(l);K(()=>{le(l,"width",n()),le(l,"height",n()),le(i,"fill",a()?"currentColor":"#e5e7eb")}),y(e,l)}var ci=D('<button type="button"> </button>'),Uv=D('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl">星期</span> <div class="weekdays svelte-1h3pyjl"></div></div>'),Hv=D('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl">日期</span> <div class="month-grid svelte-1h3pyjl"></div></div>'),Yv=D('<div class="warn svelte-1h3pyjl"> </div>'),Wv=D('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl">自定义重复</h3> <button type="button" class="close-btn svelte-1h3pyjl" aria-label="关闭"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl">开始日期</label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl">结束日期</label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl">间隔</label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl">类型</label> <select id="rc-type" class="input svelte-1h3pyjl"><option>按日</option><option>按周</option><option>按月</option><option>按年</option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl">取消</button> <button type="button" class="btn-confirm svelte-1h3pyjl">确定</button></div></div></div>');function Vv(e,t){rt(t,!0);function n(){const T=new Date,F=M=>String(M).padStart(2,"0");return`${T.getFullYear()}-${F(T.getMonth()+1)}-${F(T.getDate())}T${F(T.getHours())}:${F(T.getMinutes())}`}function a(){return`${new Date().getFullYear()}-12-31T23:59`}const l=["一","二","三","四","五","六","日"];let i=L(Ie(n())),s=L(Ie(a())),o=L(1),c=L("week"),u=L(Ie([])),f=L(Ie([]));ct(()=>{if(t.open&&t.initialConfig)try{const T=JSON.parse(t.initialConfig);h(i,T.startDate||n(),!0),h(s,T.endDate||a(),!0),h(o,T.interval||1,!0),h(c,T.type||"week",!0),h(u,T.weekdays||[],!0),h(f,T.monthDays||[],!0)}catch{}});function b(T,F,M){M(T.includes(F)?T.filter(R=>R!==F):[...T,F].sort((R,V)=>R-V))}function _(){const T={interval:r(o),type:r(c),startDate:r(i),endDate:r(s)};r(c)==="week"&&(T.weekdays=r(u)),r(c)==="month"&&(T.monthDays=r(f)),t.onConfirm(JSON.stringify(T))}let p=$(()=>r(c)==="week"&&r(u).length===0||r(c)==="month"&&r(f).length===0);function g(T){T.target===T.currentTarget&&t.onClose()}function k(T){T.key==="Escape"&&t.onClose()}var w=Re(),S=Ne(w);{var C=T=>{var F=Wv(),M=v(F),R=v(M),V=d(v(R),2),_e=v(V);wu(_e,{size:18});var ee=d(R,2),q=v(ee),z=v(q),N=d(v(z),2),E=d(z,2),B=d(v(E),2),de=d(q,2),ne=v(de),ae=d(v(ne),2),Z=d(ne,2),ie=d(v(Z),2),A=v(ie);A.value=A.__value="day";var G=d(A);G.value=G.__value="week";var O=d(G);O.value=O.__value="month";var Y=d(O);Y.value=Y.__value="year";var H=d(de,2);{var pe=U=>{var X=Uv(),ce=d(v(X),2);Oe(ce,21,()=>l,sr,(ke,ye,Me)=>{const se=$(()=>Me+1),De=$(()=>r(u).includes(r(se)));var ge=ci();let be;var Ee=v(ge);K(()=>{be=He(ge,1,"weekday-btn svelte-1h3pyjl",null,be,{active:r(De)}),re(Ee,r(ye))}),W("click",ge,()=>b(r(u),r(se),Q=>h(u,Q,!0))),y(ke,ge)}),y(U,X)};J(H,U=>{r(c)==="week"&&U(pe)})}var fe=d(H,2);{var we=U=>{var X=Hv(),ce=d(v(X),2);Oe(ce,20,()=>Array.from({length:31},(ke,ye)=>ye+1),sr,(ke,ye)=>{const Me=$(()=>r(f).includes(ye));var se=ci();let De;var ge=v(se);K(()=>{De=He(se,1,"month-btn svelte-1h3pyjl",null,De,{active:r(Me)}),re(ge,ye)}),W("click",se,()=>b(r(f),ye,be=>h(f,be,!0))),y(ke,se)}),y(U,X)};J(fe,U=>{r(c)==="month"&&U(we)})}var ve=d(fe,2);{var ze=U=>{var X=Yv(),ce=v(X);K(()=>re(ce,r(c)==="week"?"请选择至少一个星期":"请选择至少一个日期")),y(U,X)};J(ve,U=>{r(p)&&U(ze)})}var Be=d(ee,2),Se=v(Be),j=d(Se,2);K(()=>j.disabled=r(p)),W("click",F,g),W("keydown",F,k),W("click",V,function(...U){var X;(X=t.onClose)==null||X.apply(this,U)}),xt(N,()=>r(i),U=>h(i,U)),xt(B,()=>r(s),U=>h(s,U)),xt(ae,()=>r(o),U=>h(o,U)),ia(ie,()=>r(c),U=>h(c,U)),W("click",Se,function(...U){var X;(X=t.onClose)==null||X.apply(this,U)}),W("click",j,_),y(T,F)};J(S,T=>{t.open&&T(C)})}y(e,w),at()}vt(["click","keydown"]);var Gv=D('<button type="button"><!></button>'),Kv=D('<div class="error svelte-1vpobhk"> </div>'),qa=D("<option> </option>"),Xv=D('<button type="button"> </button>'),Jv=D('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk">标签</span> <div class="tag-chips svelte-1vpobhk"></div></div>'),Zv=D('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk">清单</label> <select id="tf-proj" class="svelte-1vpobhk"><option>无项目</option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk">优先级</label> <select id="tf-pri" class="svelte-1vpobhk"><option>高</option><option>中</option><option>低</option><option>无</option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk">截止日期</label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk">预计番茄</label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk">提醒</label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk">重复</label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk">添加</button></div></div>'),Qv=D('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" placeholder="任务标题..." class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group" aria-label="预计番茄数"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function $v(e,t){rt(t,!0);const n=[{value:"none",label:"不提醒"},{value:"on_time",label:"准时"},{value:"minutes5",label:"提前 5 分钟"},{value:"minutes30",label:"提前 30 分钟"},{value:"hour1",label:"提前 1 小时"},{value:"day1",label:"提前 1 天"},{value:"days2",label:"提前 2 天"}],a=[{value:"none",label:"不重复"},{value:"daily",label:"每天"},{value:"weekdays",label:"工作日"},{value:"weekly",label:"每周"},{value:"monthly",label:"每月"},{value:"yearly",label:"每年"},{value:"custom",label:"自定义..."}];let l=_n(),i=L(""),s=L(Ie(bt(()=>t.defaultProjectId??null))),o=L("medium"),c=L(Ie(bt(()=>t.defaultDueDate||an()))),u=L(0),f=L("none"),b=L("none"),_=L(null),p=L(!1),g=L(Ie(bt(()=>t.tags.length>0?[t.tags[0].id]:[]))),k=L(!1),w=L(""),S=L(!1);ct(()=>{h(s,t.defaultProjectId??null,!0)}),ct(()=>{h(c,t.defaultDueDate||an(),!0)}),ct(()=>{t.tags.length>0&&r(g).length===0&&h(g,[t.tags[0].id],!0)});function C(){const Z=new Map;for(const O of t.projects)Z.set(O.id,{...O,children:[]});const ie=[];for(const O of t.projects)O.parent_id&&Z.has(O.parent_id)?Z.get(O.parent_id).children.push(O.id):ie.push(O.id);const A=[],G=(O,Y)=>{const H=Z.get(O),pe=H.children.length>0;A.push({id:H.id,name:H.name,depth:Y,disabled:pe});for(const fe of H.children)G(fe,Y+1)};for(const O of ie)G(O,0);return A}async function T(){const Z=r(i).trim();if(!Z){h(w,"请输入任务标题");return}let ie=r(c)||an();if(r(f)!=="none"&&!ll(ie)){if(!r(S)){h(S,!0),h(w,"提醒任务需要具体时间,请补充时分");return}ie=ii(ie)}h(S,!1),h(w,"");try{await t.onAdd({title:Z,project_id:r(s),priority:r(o),due_date:ie,estimated_pomodoros:r(u)>0?r(u):1,pomodoro_duration:l.focusMinutes,reminder:r(f)==="none"?null:r(f),repeat:r(b)==="none"?null:r(b),repeat_config:r(b)==="custom"?r(_):null,tag_ids:r(g)}),h(i,""),h(s,t.defaultProjectId??null,!0),h(o,"medium"),h(c,t.defaultDueDate||an(),!0),h(u,0),h(f,"none"),h(S,!1),h(b,"none"),h(_,null),h(g,t.tags.length>0?[t.tags[0].id]:[],!0),h(k,!1)}catch(A){h(w,String(A),!0)}}function F(Z){Z.preventDefault(),T()}function M(){r(k)||ll(r(c))||h(c,ii(r(c)),!0),h(k,!r(k))}var R=Qv(),V=v(R),_e=v(V);rl(_e,{size:16,class:"plus-icon"});var ee=d(_e,2),q=d(ee,2);Oe(q,20,()=>Array.from({length:6},(Z,ie)=>ie+1),sr,(Z,ie)=>{const A=$(()=>r(u)>=ie);var G=Gv();let O;var Y=v(G);Bv(Y,{size:14,get filled(){return r(A)}}),K(()=>{O=He(G,1,"tomato-btn svelte-1vpobhk",null,O,{filled:r(A)}),le(G,"aria-label",`${ie} 个番茄`),le(G,"aria-pressed",r(A))}),W("click",G,()=>h(u,ie,!0)),y(Z,G)});var z=d(q,2),N=v(z),E=d(V,2);{var B=Z=>{var ie=Kv(),A=v(ie);K(()=>re(A,r(w))),y(Z,ie)};J(E,Z=>{r(w)&&Z(B)})}var de=d(E,2);{var ne=Z=>{var ie=Zv(),A=v(ie),G=d(v(A),2),O=v(G);O.value=O.__value="";var Y=d(O);Oe(Y,17,C,Q=>Q.id,(Q,he)=>{var Pe=qa(),Qe=v(Pe),Ke={};K(st=>{Pe.disabled=r(he).disabled,re(Qe,`${st??""}${r(he).name??""}`),Ke!==(Ke=r(he).id)&&(Pe.value=(Pe.__value=r(he).id)??"")},[()=>"　".repeat(r(he).depth)]),y(Q,Pe)});var H;At(G);var pe=d(A,2),fe=d(v(pe),2),we=v(fe);we.value=we.__value="high";var ve=d(we);ve.value=ve.__value="medium";var ze=d(ve);ze.value=ze.__value="low";var Be=d(ze);Be.value=Be.__value="none";var Se;At(fe);var j=d(pe,2),U=d(v(j),2),X=d(j,2),ce=d(v(X),2),ke=d(X,2),ye=d(v(ke),2);Oe(ye,21,()=>n,Q=>Q.value,(Q,he)=>{var Pe=qa(),Qe=v(Pe),Ke={};K(()=>{re(Qe,r(he).label),Ke!==(Ke=r(he).value)&&(Pe.value=(Pe.__value=r(he).value)??"")}),y(Q,Pe)});var Me=d(ke,2),se=d(v(Me),2);Oe(se,21,()=>a,Q=>Q.value,(Q,he)=>{var Pe=qa(),Qe=v(Pe),Ke={};K(()=>{re(Qe,r(he).label),Ke!==(Ke=r(he).value)&&(Pe.value=(Pe.__value=r(he).value)??"")}),y(Q,Pe)});var De=d(Me,2);{var ge=Q=>{var he=Jv(),Pe=d(v(he),2);Oe(Pe,21,()=>t.tags,Qe=>Qe.id,(Qe,Ke)=>{const st=$(()=>r(g).includes(r(Ke).id));var We=Xv();let ue;var oe=v(We);K(()=>{ue=He(We,1,"chip svelte-1vpobhk",null,ue,{on:r(st)}),le(We,"aria-pressed",r(st)),re(oe,r(Ke).name)}),W("click",We,()=>h(g,r(st)?r(g).filter(x=>x!==r(Ke).id):[...r(g),r(Ke).id],!0)),y(Qe,We)}),y(Q,he)};J(De,Q=>{t.tags.length>0&&Q(ge)})}var be=d(De,2),Ee=v(be);K(()=>{H!==(H=r(s)??"")&&(G.value=(G.__value=r(s)??"")??"",kt(G,r(s)??"")),Se!==(Se=r(o))&&(fe.value=(fe.__value=r(o))??"",kt(fe,r(o)))}),W("change",G,Q=>{const he=Q.currentTarget.value;h(s,he||null,!0)}),W("change",fe,Q=>{h(o,Q.currentTarget.value,!0)}),ht("blur",U,Q=>{Q.currentTarget.value.length===16&&Q.currentTarget.blur()}),xt(U,()=>r(c),Q=>h(c,Q)),xt(ce,()=>r(u),Q=>h(u,Q)),W("change",ye,()=>h(S,!1)),ia(ye,()=>r(f),Q=>h(f,Q)),W("change",se,Q=>{Q.currentTarget.value==="custom"?h(p,!0):h(_,null)}),ia(se,()=>r(b),Q=>h(b,Q)),W("click",Ee,T),y(Z,ie)};J(de,Z=>{r(k)&&Z(ne)})}var ae=d(de,2);Vv(ae,{get open(){return r(p)},get initialConfig(){return r(_)},onConfirm:Z=>{h(_,Z,!0),h(p,!1)},onClose:()=>h(p,!1)}),K(()=>re(N,r(k)?"收起":"更多")),ht("submit",R,F),xt(ee,()=>r(i),Z=>h(i,Z)),W("click",z,M),y(e,R),at()}vt(["click","change"]);var ed=D('<div class="journal-placeholder svelte-969q1d"><h2 class="svelte-969q1d">手账模式</h2> <p>月视图按自然周分组、每日勾选 + 复盘 — 在 P1.10 实现。</p> <p class="hint svelte-969q1d"> </p></div>'),td=D('<h1 class="title svelte-969q1d"> </h1>'),nd=D('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),rd=D('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),ad=D('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),ld=D('<p class="loading svelte-969q1d">加载中...</p>'),id=D('<p class="empty svelte-969q1d"><!></p>'),sd=D('<div class="task-list svelte-969q1d"></div>'),od=D('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),cd=D('<div class="page svelte-969q1d"><!> <div class="main svelte-969q1d"><!></div> <!></div>');function ud(e,t){rt(t,!0);let n=L(Ie([])),a=L(Ie([])),l=L(Ie([])),i=L(!0),s=L(null),o=L(null),c=L("today"),u=L(""),f=L(null),b=L(null),_=L(null),p=L(null),g=L(null),k=L(""),w=L(""),S=L(null),C=L(null),T=L(null),F=L(null),M=L(""),R=L("");const V=$(()=>{let j=[...r(n)];const U={high:0,medium:1,low:2,none:3};if(r(u).trim()){const ge=r(u).trim().toLowerCase();return j=j.filter(be=>be.title.toLowerCase().includes(ge)),j.sort((be,Ee)=>{if(be.status!==Ee.status)return be.status==="active"?-1:1;const Q=U[be.priority||"none"]??3,he=U[Ee.priority||"none"]??3;return Q!==he?Q-he:new Date(be.created_at??0).getTime()-new Date(Ee.created_at??0).getTime()}),j}const X=an(),ce=$r(),ke=new Date,ye=ke.getDay(),Me=ye===0?6:ye-1,se=new Date(ke);se.setDate(se.getDate()-Me),se.setHours(0,0,0,0);const De=new Date(se);return De.setDate(De.getDate()+6),De.setHours(23,59,59,999),r(o)!==null?j=j.filter(ge=>ge.project_id===r(o)):r(c)==="today"?j=j.filter(ge=>gt(ge.due_date)===X):r(c)==="tomorrow"?j=j.filter(ge=>gt(ge.due_date)===ce):r(c)==="week"?j=j.filter(ge=>{if(!ge.due_date)return!1;const be=new Date(ge.due_date);return be>=se&&be<=De}):r(c)==="planned"?j=_e(j,{project:r(b),tag:r(_),priority:r(p),preset:r(g),startDate:r(k),endDate:r(w)}):r(c)==="completed"?(j=j.filter(ge=>ge.status==="completed"),j=_e(j,{project:r(S),tag:r(C),priority:r(T),preset:r(F),startDate:r(M),endDate:r(R)})):r(c)==="journal"&&(j=j.filter(ge=>ge.status==="active"&&ge.due_date)),j.sort((ge,be)=>{if(ge.status!==be.status)return ge.status==="active"?-1:1;const Ee=U[ge.priority||"none"]??3,Q=U[be.priority||"none"]??3;return Ee!==Q?Ee-Q:new Date(ge.created_at??0).getTime()-new Date(be.created_at??0).getTime()}),j});function _e(j,U){let X=j;if(U.project!==null&&(X=X.filter(ce=>ce.project_id===U.project)),U.tag!==null&&(X=X.filter(ce=>(ce.tags??[]).some(ke=>ke.id===U.tag))),U.priority!==null&&(X=X.filter(ce=>ce.priority===U.priority)),U.preset==="week"){const ce=new Date,ke=ce.getDay(),ye=ke===0?6:ke-1,Me=new Date(ce);Me.setDate(ce.getDate()-ye);const se=new Date(Me);se.setDate(Me.getDate()+6);const De=gt(Me.toISOString()),ge=gt(se.toISOString());X=X.filter(be=>{const Ee=gt(be.due_date);return!!Ee&&Ee>=De&&Ee<=ge})}if(U.preset==="month"){const ce=new Date,ke=`${ce.getFullYear()}-${String(ce.getMonth()+1).padStart(2,"0")}-01`,ye=new Date(ce.getFullYear(),ce.getMonth()+1,0),Me=gt(ye.toISOString());X=X.filter(se=>{const De=gt(se.due_date);return!!De&&De>=ke&&De<=Me})}return U.startDate&&(X=X.filter(ce=>{const ke=gt(ce.due_date);return!!ke&&ke>=U.startDate})),U.endDate&&(X=X.filter(ce=>{const ke=gt(ce.due_date);return!!ke&&ke<=U.endDate})),X}const ee=$(()=>{const j=r(V).filter(ye=>ye.status==="active").reduce((ye,Me)=>ye+(Me.estimated_pomodoros||0)*(Me.pomodoro_duration||25),0),U=r(V).filter(ye=>ye.status==="active").length,X=r(V).reduce((ye,Me)=>ye+(Me.completed_pomodoros||0)*(Me.pomodoro_duration||25),0),ce=r(V).reduce((ye,Me)=>ye+(Me.completed_pomodoros||0),0),ke=r(V).filter(ye=>ye.status==="completed").length;return{estimatedMinutes:j,activeCount:U,focusedMinutes:X,completedCount:ke,completedPomodoros:ce}}),q=$(()=>{if(r(u).trim())return`搜索结果 (${r(V).length})`;if(r(o)!==null){const U=r(a).find(X=>X.id===r(o));return(U==null?void 0:U.name)||"清单"}return{today:"今天",tomorrow:"明天",week:"本周",planned:"已计划",completed:"已完成",journal:"手账","":"任务"}[r(c)]||"任务"});async function z(){try{const[j,U,X]=await Promise.all([Sl({}),Ss(),Ts()]);if(h(n,j.map(ce=>({...ce,tags:ce.tags??[]})),!0),h(a,U,!0),h(l,X,!0),r(f)){const ce=r(n).find(ke=>ke.id===r(f).id);h(f,ce??null,!0)}}catch(j){h(s,String(j),!0)}finally{h(i,!1)}}kl(z);function N(){return new Date().toISOString()}function E(){return crypto.randomUUID()}async function B(j){const U=typeof j=="string"?j:j.id,X=typeof j=="string"?r(n).find(ce=>ce.id===U):j;if(X)try{X.status==="active"?await Kc(U):await Xc(U),await z()}catch(ce){h(s,String(ce),!0)}}async function de(j,U=null){try{await Gl({id:E(),name:j,color:"#c97b6e",parent_id:U??null,created_at:N(),updated_at:N()}),await z()}catch(X){h(s,String(X),!0)}}async function ne(j,U){try{const X=r(a).find(ce=>ce.id===j);if(!X)return;await Gl({...X,name:U,updated_at:N()}),await z()}catch(X){h(s,String(X),!0)}}async function ae(j){if(confirm("删除此清单？子清单会一并删除"))try{await Jc(j),r(o)===j&&h(o,null),await z()}catch(U){h(s,String(U),!0)}}function Z(j){h(f,j,!0)}function ie(){h(f,null)}function A(){z()}async function G(j){try{const U=await Qa(j.id,null,j.pomodoro_duration??25);bs("/timer"),window.dispatchEvent(new CustomEvent("pomoflow:start-task",{detail:{task:j,session:U}}))}catch(U){h(s,String(U),!0)}}async function O(j){const U=j.due_date??(r(c)==="tomorrow"?$r():an());try{const X=E();await xs({id:X,title:j.title,description:"",project_id:j.project_id??r(o),priority:j.priority,status:"active",due_date:ll(U)?U:`${U}T00:00:00`,estimated_pomodoros:j.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:j.pomodoro_duration,reminder:j.reminder??"none",repeat:j.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:j.repeat_config??null,completed_at:null,created_at:N(),updated_at:N()}),j.tag_ids.length>0&&await Ms(X,j.tag_ids),await z()}catch(X){h(s,String(X),!0)}}async function Y(){const j=r(V),U=["标题","项目","优先级","截止","标签","番茄数","状态"],X=j.map(se=>{var De;return[se.title,((De=r(a).find(ge=>ge.id===se.project_id))==null?void 0:De.name)??"",se.priority??"",gt(se.due_date),(se.tags??[]).map(ge=>ge.name).join("; "),`${se.completed_pomodoros??0}/${se.estimated_pomodoros??0}`,se.status]}),ce=[U,...X].map(se=>se.map(De=>`"${String(De).replace(/"/g,'""')}"`).join(",")).join(`
`),ke=new Blob(["\uFEFF"+ce],{type:"text/csv;charset=utf-8"}),ye=URL.createObjectURL(ke),Me=document.createElement("a");Me.href=ye,Me.download=`tasks-${an()}.csv`,Me.click(),URL.revokeObjectURL(ye)}var H=cd();ds("969q1d",j=>{dr(()=>{pl.title="任务 - PomoFlow"})});var pe=v(H);cv(pe,{get projects(){return r(a)},get filter(){return r(c)},get selectedProject(){return r(o)},onSetFilter:j=>{h(c,j,!0),h(u,"")},onSelectProject:j=>{h(o,j,!0),h(u,"")},onCreateProject:de,onUpdateProject:ne,onDeleteProject:ae,get search(){return r(u)},onSearchChange:j=>{h(u,j,!0),j.trim()&&(h(o,null),h(c,""))},get tasks(){return r(n)}});var fe=d(pe,2),we=v(fe);{var ve=j=>{var U=ed(),X=d(v(U),4),ce=v(X);K(()=>re(ce,`当前 active 任务数：${r(V).length??""}`)),y(j,U)},ze=j=>{var U=od(),X=v(U);{var ce=ue=>{var oe=td(),x=v(oe);K(()=>re(x,r(q))),y(ue,oe)};J(X,ue=>{r(q)&&ue(ce)})}var ke=d(X,2);{var ye=ue=>{var oe=nd(),x=v(oe);dt(x,{get icon(){return nl},label:"已专注",get value(){return r(ee).focusedMinutes},unit:"分钟",accent:!0});var P=d(x,2);dt(P,{get icon(){return al},label:"已完成番茄",get value(){return r(ee).completedPomodoros},unit:"个",accent:!0});var te=d(P,2);dt(te,{get icon(){return tl},label:"已完成任务",get value(){return r(ee).completedCount},unit:"个",accent:!0}),y(ue,oe)},Me=ue=>{var oe=rd(),x=v(oe);dt(x,{get icon(){return nl},label:"预计专注",get value(){return r(ee).estimatedMinutes},unit:"分钟",accent:!0});var P=d(x,2);dt(P,{get icon(){return al},label:"进行中",get value(){return r(ee).activeCount},unit:"个",accent:!0});var te=d(P,2);dt(te,{get icon(){return Cs},label:"已专注",get value(){return r(ee).focusedMinutes},unit:"分钟",accent:!0});var je=d(te,2);dt(je,{get icon(){return tl},label:"已完成",get value(){return r(ee).completedCount},unit:"个",accent:!0}),y(ue,oe)};J(ke,ue=>{r(c)==="completed"?ue(ye):ue(Me,-1)})}var se=d(ke,2);{var De=ue=>{oi(ue,{get projects(){return r(a)},get tags(){return r(l)},get filterProject(){return r(S)},setFilterProject:oe=>h(S,oe,!0),get filterTag(){return r(C)},setFilterTag:oe=>h(C,oe,!0),get filterPriority(){return r(T)},setFilterPriority:oe=>h(T,oe,!0),get filterPreset(){return r(F)},setFilterPreset:oe=>h(F,oe,!0),get filterStartDate(){return r(M)},setFilterStartDate:oe=>h(M,oe,!0),get filterEndDate(){return r(R)},setFilterEndDate:oe=>h(R,oe,!0)})},ge=ue=>{oi(ue,{get projects(){return r(a)},get tags(){return r(l)},get filterProject(){return r(b)},setFilterProject:oe=>h(b,oe,!0),get filterTag(){return r(_)},setFilterTag:oe=>h(_,oe,!0),get filterPriority(){return r(p)},setFilterPriority:oe=>h(p,oe,!0),get filterPreset(){return r(g)},setFilterPreset:oe=>h(g,oe,!0),get filterStartDate(){return r(k)},setFilterStartDate:oe=>h(k,oe,!0),get filterEndDate(){return r(w)},setFilterEndDate:oe=>h(w,oe,!0),onExport:Y})};J(se,ue=>{r(c)==="completed"?ue(De):r(c)==="planned"&&ue(ge,1)})}var be=d(se,2);{var Ee=ue=>{{let oe=$(()=>r(c)==="tomorrow"?$r():an());$v(ue,{get projects(){return r(a)},get tags(){return r(l)},get defaultProjectId(){return r(o)},get defaultDueDate(){return r(oe)},onAdd:O})}};J(be,ue=>{r(c)!=="completed"&&ue(Ee)})}var Q=d(be,2);{var he=ue=>{var oe=ad(),x=v(oe),P=v(x),te=d(x,2);K(()=>re(P,`⚠ ${r(s)??""}`)),W("click",te,()=>h(s,null)),y(ue,oe)};J(Q,ue=>{r(s)&&ue(he)})}var Pe=d(Q,2);{var Qe=ue=>{var oe=ld();y(ue,oe)},Ke=ue=>{var oe=id(),x=v(oe);{var P=je=>{var $e=Ja("暂无任务，添加一个开始吧");y(je,$e)},te=je=>{var $e=Ja("此筛选下没有任务");y(je,$e)};J(x,je=>{r(n).length===0?je(P):je(te,-1)})}y(ue,oe)},st=ue=>{{let oe=$(()=>r(c)==="completed"?"completed_at":"due_date");Fv(ue,{get tasks(){return r(V)},get groupBy(){return r(oe)},get selectedTask(){return r(f)},onToggle:B,onSelect:Z,onStart:G})}},We=ue=>{var oe=sd();Oe(oe,21,()=>r(V),x=>x.id,(x,P)=>{{let te=$(()=>{var je;return((je=r(f))==null?void 0:je.id)===r(P).id});Ns(x,{get task(){return r(P)},get selected(){return r(te)},onToggle:()=>B(r(P)),onSelect:Z,onStart:G})}}),y(ue,oe)};J(Pe,ue=>{r(i)?ue(Qe):r(V).length===0?ue(Ke,1):r(c)==="week"||r(c)==="planned"||r(c)==="completed"?ue(st,2):ue(We,-1)})}y(j,U)};J(we,j=>{r(c)==="journal"?j(ve):j(ze,-1)})}var Be=d(fe,2);{var Se=j=>{Ev(j,{get task(){return r(f)},get projects(){return r(a)},get allTags(){return r(l)},onClose:ie,onChanged:A})};J(Be,j=>{r(f)&&r(c)!=="journal"&&j(Se)})}y(e,H),at()}vt(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
//! `DIMENSIONS` / `getRange` / `getPrevRange` / `keyLabel` 纯函数移植。
//!
//! 边界语义(与 v1 逐条对齐,勿擅自改动):
//! - today    : 当天,固定 1 天
//! - week     : 本周一 → 周日,固定 7 天(周一开始;周日属于上一周)
//! - month    : 自然月(1 号 → 月末)
//! - quarter  : 自然季度(季度首月 1 号 → 季度末月月末,按 3 个月推进)
//! - halfyear : 自然半年(上半年 1/1–6/30,下半年 7/1–12/31,按 6 个月推进)
//! - year     : 自然年(1/1 → 12/31)
//! - prev     : 当前区间整体往前平移一个周期(prevEnd = start 前一天,
//!              prevStart 再往前推 span-1 天;span 为当前区间实际天数)
//!
//! 趋势粒度(group)按维度固定:today/week/month → day,quarter → week,
//! halfyear/year → month。
//!
//! 所有函数均为纯函数;`now` 参数仅用于注入"当前时刻"方便核对边界,
//! 缺省取系统时间。日期一律本地时区(与后端 `tz_offset_min` 分桶口径一致)。
const vd=[{key:"today",label:"今日",group:"day"},{key:"week",label:"本周",group:"day"},{key:"month",label:"本月",group:"day"},{key:"quarter",label:"季度",group:"week"},{key:"halfyear",label:"半年",group:"month"},{key:"year",label:"年",group:"month"}];function ui(e){return String(e).padStart(2,"0")}function mt(e){return`${e.getFullYear()}-${ui(e.getMonth()+1)}-${ui(e.getDate())}`}function Na(e,t){return Math.round((t.getTime()-e.getTime())/864e5)+1}function il(e,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=n.getDay(),l=a===0?-6:1-a;if(e==="today")return{start:mt(n),end:mt(n),days:1,group:"day"};if(e==="week"){const o=new Date(n);o.setDate(n.getDate()+l);const c=new Date(o);return c.setDate(o.getDate()+6),{start:mt(o),end:mt(c),days:7,group:"day"}}if(e==="month"){const o=new Date(n.getFullYear(),n.getMonth(),1),c=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:mt(o),end:mt(c),days:c.getDate(),group:"day"}}if(e==="quarter"){const o=Math.floor(n.getMonth()/3),c=new Date(n.getFullYear(),o*3,1),u=new Date(n.getFullYear(),o*3+3,0);return{start:mt(c),end:mt(u),days:Na(c,u),group:"week"}}if(e==="halfyear"){const o=n.getMonth()<6?0:6,c=new Date(n.getFullYear(),o,1),u=new Date(n.getFullYear(),o+6,0);return{start:mt(c),end:mt(u),days:Na(c,u),group:"month"}}const i=new Date(n.getFullYear(),0,1),s=new Date(n.getFullYear(),11,31);return{start:mt(i),end:mt(s),days:Na(i,s),group:"month"}}function dd(e,t=new Date){const n=il(e,t),a=new Date(n.start+"T00:00:00"),l=new Date(n.end+"T00:00:00"),i=Math.round((l.getTime()-a.getTime())/864e5)+1,s=new Date(a);s.setDate(a.getDate()-1);const o=new Date(s);return o.setDate(s.getDate()-i+1),{start:mt(o),end:mt(s)}}function Fs(e,t){return t==="month"?`${Number(e.slice(5,7))}`:`${Number(e.slice(5,7))}/${Number(e.slice(8,10))}`}function fd(e,t=new Date){return mt(t)}var hd=D('<div class="empty svelte-1ixrxd8"> </div>'),_d=Un('<text class="tick svelte-1ixrxd8" text-anchor="end"> </text>'),pd=Un('<line class="grid svelte-1ixrxd8"></line><!>',1),gd=Un('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),bd=Un('<rect rx="3"></rect><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),md=D('<div class="tooltip svelte-1ixrxd8"> </div>'),yd=D('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" aria-label="专注趋势柱状图" class="svelte-1ixrxd8"><!><!></svg> <!></div>');function wd(e,t){rt(t,!0);let n=Ft(t,"emptyText",3,"该维度暂无专注数据");const a=600,l=240,i={top:14,right:8,bottom:26,left:42},s=a-i.left-i.right,o=l-i.top-i.bottom,c=2,u=10,f=34;let b=L(null);function _(F){if(F<=0)return 0;const M=Math.pow(10,Math.floor(Math.log10(F))),R=F/M;return(R<=1?1:R<=2?2:R<=5?5:10)*M}function p(F,M){return Fs(F,M)}const g=$(()=>{const F=t.data.length,M=t.data.reduce((E,B)=>Math.max(E,B.minutes),0),R=_(M),V=F>0?s/F:s,_e=Math.min(V*.62,f),ee=Math.max(1,Math.ceil(F/u)),q=t.group==="day"?fd():null,z=t.data.map((E,B)=>{const de=E.minutes>0&&R>0?Math.max(c,E.minutes/R*o):c,ne=i.left+V*B+(V-_e)/2;return{i:B,key:E.key,minutes:E.minutes,x:ne,y:i.top+o-de,w:_e,h:de,hitX:i.left+V*B,hitW:V,label:p(E.key,t.group),showLabel:B%ee===0||B===F-1,isCurrent:q!==null&&E.key===q}}),N=[0,.25,.5,.75,1].map(E=>({y:i.top+o-E*o,value:Math.round(R*E),labeled:E===0||E===.5||E===1}));return{bars:z,gridlines:N}}),k=$(()=>r(b)!==null?r(g).bars[r(b)]:null);var w=Re(),S=Ne(w);{var C=F=>{var M=hd(),R=v(M);K(()=>re(R,n())),y(F,M)},T=F=>{var M=yd(),R=v(M);le(R,"viewBox","0 0 600 240");var V=v(R);Oe(V,17,()=>r(g).gridlines,sr,(z,N)=>{var E=pd(),B=Ne(E),de=d(B);{var ne=ae=>{var Z=_d(),ie=v(Z);K(()=>{le(Z,"x",i.left-6),le(Z,"y",r(N).y+3),re(ie,r(N).value)}),y(ae,Z)};J(de,ae=>{r(N).labeled&&ae(ne)})}K(()=>{le(B,"x1",i.left),le(B,"x2",a-i.right),le(B,"y1",r(N).y),le(B,"y2",r(N).y)}),y(z,E)});var _e=d(V);Oe(_e,17,()=>r(g).bars,z=>z.key,(z,N)=>{var E=bd(),B=Ne(E);let de;var ne=d(B);{var ae=ie=>{var A=gd();le(A,"y",l-8);var G=v(A);K(()=>{le(A,"x",r(N).x+r(N).w/2),re(G,r(N).label)}),y(ie,A)};J(ne,ie=>{r(N).showLabel&&ie(ae)})}var Z=d(ne);K(()=>{de=He(B,0,"bar svelte-1ixrxd8",null,de,{zero:r(N).minutes===0,current:r(N).isCurrent}),le(B,"x",r(N).x),le(B,"y",r(N).y),le(B,"width",r(N).w),le(B,"height",r(N).h),le(Z,"x",r(N).hitX),le(Z,"y",i.top),le(Z,"width",r(N).hitW),le(Z,"height",o)}),ht("pointerenter",Z,()=>h(b,r(N).i,!0)),ht("pointerleave",Z,()=>h(b,null)),y(z,E)});var ee=d(R,2);{var q=z=>{var N=md();let E;var B=v(N);K(de=>{E=on(N,"",E,de),re(B,`${r(k).label??""} · ${r(k).minutes??""} 分钟`)},[()=>({left:Math.min(88,Math.max(12,(r(k).x+r(k).w/2)/a*100))+"%",top:r(k).y/l*100+"%"})]),y(z,N)};J(ee,z=>{r(k)&&z(q)})}ht("pointerleave",R,()=>h(b,null)),y(F,M)};J(S,F=>{t.data.length===0?F(C):F(T,-1)})}y(e,w),at()}var kd=D('<div class="empty svelte-s63rv4"> </div>'),xd=Un('<circle role="presentation" pathLength="100"></circle>'),Sd=D('<div class="tooltip svelte-s63rv4"> </div>'),Td=D('<span><i class="dot svelte-s63rv4"></i> <span class="name svelte-s63rv4"> </span> <span class="minutes svelte-s63rv4"> </span></span>'),Md=D('<div class="donut svelte-s63rv4"><div class="chart svelte-s63rv4"><svg role="img" aria-label="项目时间分布环形图" class="svelte-s63rv4"><g></g></svg> <!></div> <div class="legend svelte-s63rv4"></div></div>');function Pd(e,t){rt(t,!0);let n=Ft(t,"emptyText",3,"暂无项目数据");const a=220,l=110,i=76,s=2/360*100,o=[90,75,60,45,30,15,0];function c(C){return`color-mix(in srgb, var(--color-accent, #e74c3c) ${o[C%o.length]}%, white)`}function u(C){return C>=o.length?Math.max(.4,1-(C-o.length+1)*.15):void 0}let f=L(null);const b=$(()=>t.projects.reduce((C,T)=>C+T.total_minutes,0)),_=$(()=>{if(r(b)<=0||t.projects.length===0)return[];const C=t.projects.length>1?s:0;let T=0;return t.projects.map((F,M)=>{const R=F.total_minutes/r(b),V=Math.max(.6,R*100-C),_e=(T+R/2)/100*2*Math.PI-Math.PI/2,ee={i:M,p:F,len:V,offset:T,color:c(M),opacity:u(M),tipX:l+i*Math.cos(_e),tipY:l+i*Math.sin(_e)};return T+=R*100,ee})}),p=$(()=>r(f)!==null?r(_)[r(f)]:null);var g=Re(),k=Ne(g);{var w=C=>{var T=kd(),F=v(T);K(()=>re(F,n())),y(C,T)},S=C=>{var T=Md(),F=v(T),M=v(F);le(M,"viewBox","0 0 220 220");var R=v(M);le(R,"transform","rotate(-90 110 110)"),Oe(R,21,()=>r(_),q=>q.p.project_id,(q,z)=>{var N=xd();let E;le(N,"cx",l),le(N,"cy",l),le(N,"r",i);let B;K(()=>{E=He(N,0,"seg svelte-s63rv4",null,E,{hovered:r(f)===r(z).i}),le(N,"opacity",r(z).opacity),le(N,"stroke-dasharray",`${r(z).len??""} ${100-r(z).len}`),le(N,"stroke-dashoffset",-r(z).offset),B=on(N,"",B,{stroke:r(z).color})}),ht("pointerenter",N,()=>h(f,r(z).i,!0)),ht("pointerleave",N,()=>h(f,null)),y(q,N)});var V=d(M,2);{var _e=q=>{var z=Sd();let N;var E=v(z);K(()=>{N=on(z,"",N,{left:r(p).tipX/a*100+"%",top:r(p).tipY/a*100+"%"}),re(E,`${r(p).p.project_name??""} · ${r(p).p.total_minutes??""} 分钟`)}),y(q,z)};J(V,q=>{r(p)&&q(_e)})}var ee=d(F,2);Oe(ee,21,()=>r(_),q=>q.p.project_id,(q,z)=>{var N=Td();let E;var B=v(N);let de;var ne=d(B,2),ae=v(ne),Z=d(ne,2),ie=v(Z);K(()=>{E=He(N,1,"legend-item svelte-s63rv4",null,E,{hovered:r(f)===r(z).i}),de=on(B,"",de,{background:r(z).color,opacity:r(z).opacity??1}),re(ae,r(z).p.project_name),re(ie,`${r(z).p.total_minutes??""} 分钟`)}),y(q,N)}),y(C,T)};J(k,C=>{r(_).length===0?C(w):C(S,-1)})}y(e,g),at()}var jd=D("<button> </button>"),Dd=D('<div class="error svelte-giv6a6" role="alert"> </div>'),Ed=D('<p class="loading svelte-giv6a6">统计加载中...</p>'),Cd=D('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),qd=D('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6">项目时间分布</h3> <!></section></div>',1),Nd=D('<div class="page svelte-giv6a6"><h2 class="svelte-giv6a6">统计</h2> <div class="dims svelte-giv6a6"></div> <!> <!></div>');function Fd(e,t){rt(t,!0);let n=L("week"),a=L(null),l=L(0),i=L(!0),s=L(null),o=0;const c=$(()=>il(r(n))),u=$(()=>r(c).group),f=$(()=>r(u)==="day"?"按日":r(u)==="week"?"按周":"按月"),b=$(()=>{var q;return((q=r(a))==null?void 0:q.summary.total_minutes)??0}),_=$(()=>{var q;return((q=r(a))==null?void 0:q.summary.total_sessions)??0}),p=$(()=>{var q;return((q=r(a))==null?void 0:q.summary.completed_tasks)??0}),g=$(()=>Math.round(r(b)/Math.max(1,r(c).days))),k=$(()=>{if(!r(a))return null;const q=r(a).trend;let z=0,N=0;for(const B of q)B.minutes>0?(N++,z=Math.max(z,N)):N=0;let E={key:"",minutes:0,sessions:0};for(const B of q)B.minutes>E.minutes&&(E=B);return{activeDays:q.filter(B=>B.minutes>0).length,longest:z,perPeriod:q.length>0?Math.round(r(b)/q.length):0,peak:E,projects:[...r(a).projects].sort((B,de)=>de.total_minutes-B.total_minutes)}}),w=$(()=>r(l)>0?Math.round((r(b)-r(l))/r(l)*100):r(b)>0?100:0),S=$(()=>`${r(w)>=0?"+":""}${r(w)}%`),C=$(()=>r(k)?r(k).projects:[]);ct(()=>{const q=il(r(n)),z=dd(r(n)),N=++o;h(a,null),h(l,0),h(s,null),h(i,!0);const E=-new Date().getTimezoneOffset();Xl(q.start,q.end,q.group,E).then(B=>{N===o&&(h(a,B,!0),h(i,!1))}).catch(B=>{N===o&&(h(s,`统计加载失败:${String(B)}`),h(i,!1))}),Xl(z.start,z.end,q.group,E).then(B=>{N===o&&h(l,B.summary.total_minutes,!0)}).catch(()=>{})});var T=Nd();ds("giv6a6",q=>{dr(()=>{pl.title="统计 - PomoFlow"})});var F=d(v(T),2);Oe(F,21,()=>vd,q=>q.key,(q,z)=>{var N=jd();let E;var B=v(N);K(()=>{E=He(N,1,"dim-pill svelte-giv6a6",null,E,{active:r(n)===r(z).key}),le(N,"aria-pressed",r(n)===r(z).key),re(B,r(z).label)}),W("click",N,()=>h(n,r(z).key,!0)),y(q,N)});var M=d(F,2);{var R=q=>{var z=Dd(),N=v(z);K(()=>re(N,`⚠ ${r(s)??""}`)),y(q,z)};J(M,q=>{r(s)&&q(R)})}var V=d(M,2);{var _e=q=>{var z=Ed();y(q,z)},ee=q=>{var z=qd(),N=Ne(z),E=v(N);dt(E,{get icon(){return nl},label:"专注时长",get value(){return r(b)},unit:"分钟",accent:!0});var B=d(E,2);dt(B,{get icon(){return Cs},label:"番茄数",get value(){return r(_)},unit:"个",accent:!0});var de=d(B,2);dt(de,{get icon(){return al},label:"完成任务",get value(){return r(p)},unit:"个",accent:!0});var ne=d(de,2);dt(ne,{get icon(){return Da},label:"日均专注",get value(){return r(g)},unit:"分钟",accent:!0});var ae=d(N,2);{var Z=we=>{var ve=Cd(),ze=v(ve);dt(ze,{get icon(){return Es},label:"活跃天数",get value(){return r(k).activeDays},unit:"天",accent:!0});var Be=d(ze,2);{var Se=se=>{dt(se,{get icon(){return du},label:"最长连续专注",get value(){return r(k).longest},unit:"天",accent:!0})};J(Be,se=>{(r(n)==="month"||r(n)==="quarter"||r(n)==="halfyear"||r(n)==="year")&&se(Se)})}var j=d(Be,2);{var U=se=>{{let De=$(()=>r(u)==="week"?"周均专注":"月均专注");dt(se,{get icon(){return Da},get label(){return r(De)},get value(){return r(k).perPeriod},unit:"分钟",accent:!0})}};J(j,se=>{(r(n)==="quarter"||r(n)==="halfyear"||r(n)==="year")&&se(U)})}var X=d(j,2);{var ce=se=>{{let De=$(()=>r(u)==="month"?"高峰月":"高峰期"),ge=$(()=>r(k).peak.key?Fs(r(k).peak.key,r(u)):"—"),be=$(()=>r(k).peak.minutes?`${r(k).peak.minutes} 分钟`:"");dt(se,{get icon(){return ei},get label(){return r(De)},get value(){return r(ge)},get unit(){return r(be)},accent:!0})}};J(X,se=>{(r(n)==="halfyear"||r(n)==="year")&&se(ce)})}var ke=d(X,2);{var ye=se=>{{let De=$(()=>`${r(k).projects[0].total_minutes} 分钟`);dt(se,{get icon(){return ei},label:"最佳项目",get value(){return r(k).projects[0].project_name},get unit(){return r(De)},accent:!0})}};J(ke,se=>{(r(n)==="halfyear"||r(n)==="year")&&r(k).projects[0]&&se(ye)})}var Me=d(ke,2);dt(Me,{get icon(){return Da},label:"环比上期",get value(){return r(S)},accent:!0}),y(we,ve)};J(ae,we=>{r(k)&&r(n)!=="today"&&we(Z)})}var ie=d(ae,2);let A;var G=v(ie),O=v(G),Y=v(O),H=d(O,2);wd(H,{get data(){return r(a).trend},get group(){return r(u)}});var pe=d(G,2),fe=d(v(pe),2);Pd(fe,{get projects(){return r(C)}}),K(()=>{A=He(ie,1,"charts svelte-giv6a6",null,A,{split:r(n)!=="month"}),re(Y,`专注趋势(${r(f)??""})`)}),y(q,z)};J(V,q=>{r(i)?q(_e):r(a)&&q(ee,1)})}y(e,T),at()}vt(["click"]);var Ad=D('<div class="page svelte-1p9kpu2"><h2 class="svelte-1p9kpu2">手账</h2> <p class="placeholder svelte-1p9kpu2">🚧 手账模式即将实装 —— 月视图 + 日/周/月复盘 + 每日任务勾选。</p> <p class="placeholder svelte-1p9kpu2">P1.10 阶段交付(见 docs/migration-roadmap)。</p></div>');function Od(e){var t=Ad();y(e,t)}async function Id(){return await tt("plugin:autostart|is_enabled")}async function Ld(){await tt("plugin:autostart|enable")}async function Rd(){await tt("plugin:autostart|disable")}var zd=D('<div class="error svelte-uox1oc" role="alert"> </div>'),Bd=D('<div class="page svelte-uox1oc"><h2 class="svelte-uox1oc">设置</h2> <section class="block svelte-uox1oc"><h3 class="svelte-uox1oc">番茄钟参数</h3> <div class="row svelte-uox1oc"><label for="focus-min" class="svelte-uox1oc">专注时长(分钟)</label> <input id="focus-min" type="number" min="1" max="120" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="sb-min" class="svelte-uox1oc">短休息时长(分钟)</label> <input id="sb-min" type="number" min="1" max="60" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="lb-min" class="svelte-uox1oc">长休息时长(分钟)</label> <input id="lb-min" type="number" min="1" max="120" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="lb-int" class="svelte-uox1oc">长休息间隔(每 N 个专注)</label> <input id="lb-int" type="number" min="2" max="12" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="auto-chain" class="svelte-uox1oc">专注完成后自动进入休息</label> <input id="auto-chain" type="checkbox" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="snd" class="svelte-uox1oc">完成提示音</label> <input id="snd" type="checkbox" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="ntf" class="svelte-uox1oc">系统通知</label> <input id="ntf" type="checkbox" class="svelte-uox1oc"/></div> <button class="reset-btn svelte-uox1oc">恢复默认</button></section> <section class="block svelte-uox1oc"><h3 class="svelte-uox1oc">系统能力</h3> <div class="row svelte-uox1oc"><div class="row-label svelte-uox1oc"><span class="name svelte-uox1oc">开机自启动</span> <span class="hint svelte-uox1oc">OS 启动时自动运行 PomoFlow(静默启动,常驻托盘)</span></div> <button> </button></div> <div class="row svelte-uox1oc"><div class="row-label svelte-uox1oc"><span class="name svelte-uox1oc">系统通知测试</span> <span class="hint svelte-uox1oc">发送一条测试通知,验证系统通知链路是否通</span></div> <button class="action svelte-uox1oc">发送测试</button></div> <p class="tray-hint svelte-uox1oc">💡 关闭主窗口时 PomoFlow 会驻留在系统托盘,右键托盘图标可『显示窗口 / 退出』。</p></section> <!></div>');function Ud(e,t){rt(t,!0);const n=$(_n);let a=L(!1),l=L(!1),i=L("default"),s=L(0),o=L(null);async function c(){try{h(a,await Id(),!0)}catch(O){console.warn("isEnabled failed",O),h(a,!1)}try{h(i,await el()?"granted":"default",!0)}catch{h(i,"default")}try{const O=await Sl({status:"active"});h(s,O.length,!0)}catch{}}ct(()=>{c()}),ct(()=>{r(n).focusMinutes,r(n).shortBreakMinutes,r(n).longBreakMinutes,r(n).longBreakInterval,r(n).autoChain,Gc()});function u(O,Y){Yc({[O]:Y})}async function f(){if(!r(l)){h(l,!0),h(o,null);try{r(a)?(await Rd(),h(a,!1)):(await Ld(),h(a,!0))}catch(O){h(o,`自启动切换失败: ${O}`)}finally{h(l,!1)}}}async function b(){h(o,null);try{let O=await el();if(O)h(i,"granted");else{const Y=await js();O=Y==="granted",h(i,Y,!0)}if(!O){h(o,"通知权限未授予,无法发送");return}Ds({title:"PomoFlow 测试通知",body:`当前 active 任务数:${r(s)}`})}catch(O){h(o,`通知失败: ${O}`)}}var _=Bd(),p=d(v(_),2),g=d(v(p),2),k=d(v(g),2),w=d(g,2),S=d(v(w),2),C=d(w,2),T=d(v(C),2),F=d(C,2),M=d(v(F),2),R=d(F,2),V=d(v(R),2),_e=d(R,2),ee=d(v(_e),2),q=d(_e,2),z=d(v(q),2),N=d(q,2),E=d(p,2),B=d(v(E),2),de=d(v(B),2);let ne;var ae=v(de),Z=d(B,2),ie=d(v(Z),2),A=d(E,2);{var G=O=>{var Y=zd(),H=v(Y);K(()=>re(H,`⚠ ${r(o)??""}`)),y(O,Y)};J(A,O=>{r(o)&&O(G)})}K(()=>{En(k,r(n).focusMinutes),En(S,r(n).shortBreakMinutes),En(T,r(n).longBreakMinutes),En(M,r(n).longBreakInterval),Dr(V,r(n).autoChain),Dr(ee,r(n).soundEnabled),Dr(z,r(n).desktopNotificationEnabled),ne=He(de,1,"toggle svelte-uox1oc",null,ne,{on:r(a)}),de.disabled=r(l),le(de,"aria-pressed",r(a)),re(ae,r(l)?"...":r(a)?"已开启":"已关闭")}),W("input",k,O=>u("focusMinutes",Math.max(1,Math.min(120,+O.currentTarget.value||25)))),W("input",S,O=>u("shortBreakMinutes",Math.max(1,Math.min(60,+O.currentTarget.value||5)))),W("input",T,O=>u("longBreakMinutes",Math.max(1,Math.min(120,+O.currentTarget.value||15)))),W("input",M,O=>u("longBreakInterval",Math.max(2,Math.min(12,+O.currentTarget.value||4)))),W("change",V,O=>u("autoChain",O.currentTarget.checked)),W("change",ee,O=>u("soundEnabled",O.currentTarget.checked)),W("change",z,O=>u("desktopNotificationEnabled",O.currentTarget.checked)),W("click",N,()=>Wc()),W("click",de,f),W("click",ie,b),y(e,_),at()}vt(["input","change","click"]);var Hd=D("<button> </button>"),Yd=D('<main class="app svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true">🍅</span> <h1 class="svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q" aria-label="主导航"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function Wd(e,t){rt(t,!0),ct(()=>{if(!ws().running)return;const k=setInterval(()=>Vc(),1e3);return()=>clearInterval(k)});const n=$(Bc);var a=Yd(),l=v(a),i=d(v(l),2);Oe(i,21,()=>Uc,g=>g.path,(g,k)=>{var w=Hd();let S;var C=v(w);K(()=>{S=He(w,1,"nav-item svelte-1n46o8q",null,S,{active:r(n)===r(k).path}),le(w,"aria-current",r(n)===r(k).path?"page":void 0),re(C,r(k).label)}),W("click",w,()=>bs(r(k).path)),y(g,w)});var s=d(l,2),o=v(s);{var c=g=>{li(g,{})},u=g=>{ud(g,{})},f=g=>{Fd(g,{})},b=g=>{Od(g)},_=g=>{Ud(g,{})},p=g=>{li(g,{})};J(o,g=>{r(n)==="/timer"?g(c):r(n)==="/tasks"?g(u,1):r(n)==="/stats"?g(f,2):r(n)==="/journal"?g(b,3):r(n)==="/settings"?g(_,4):g(p,-1)})}y(e,a),at()}vt(["click"]);_c(Wd,{target:document.getElementById("app")});
