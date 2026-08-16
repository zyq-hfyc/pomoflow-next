var Jo=Object.defineProperty;var jl=t=>{throw TypeError(t)};var Zo=(t,e,n)=>e in t?Jo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Nt=(t,e,n)=>Zo(t,typeof e!="symbol"?e+"":e,n),ba=(t,e,n)=>e.has(t)||jl("Cannot "+n);var y=(t,e,n)=>(ba(t,e,"read from private field"),n?n.call(t):e.get(t)),Me=(t,e,n)=>e.has(t)?jl("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Te=(t,e,n,a)=>(ba(t,e,"write to private field"),a?a.call(t,n):e.set(t,n),n),Be=(t,e,n)=>(ba(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const _i=!1;var sl=Array.isArray,Qo=Array.prototype.indexOf,na=Array.prototype.includes,ha=Array.from,$o=Object.defineProperty,Sn=Object.getOwnPropertyDescriptor,gi=Object.getOwnPropertyDescriptors,es=Object.prototype,ts=Array.prototype,cl=Object.getPrototypeOf,Pl=Object.isExtensible;function pr(t){return typeof t=="function"}const ns=()=>{};function rs(t){return t()}function Oa(t){for(var e=0;e<t.length;e++)t[e]()}function pi(){var t,e,n=new Promise((a,l)=>{t=a,e=l});return{promise:n,resolve:t,reject:e}}function bi(t,e){if(Array.isArray(t))return t;if(!(Symbol.iterator in t))return Array.from(t);const n=[];for(const a of t)if(n.push(a),n.length===e)break;return n}const ft=2,ar=4,Rr=8,ul=1<<24,Xt=16,Yt=32,pn=64,Ia=128,Ut=512,vt=1024,ct=2048,Zt=4096,jt=8192,Ft=16384,ur=32768,Aa=1<<25,Mn=65536,ra=1<<17,mi=1<<18,vr=1<<19,yi=1<<20,rn=1<<25,Bn=65536,aa=1<<21,Gn=1<<22,Tn=1<<23,on=Symbol("$state"),wi=Symbol("legacy props"),as=Symbol(""),Gr=Symbol("attributes"),Fa=Symbol("class"),za=Symbol("style"),wr=Symbol("text"),Xr=Symbol("form reset"),Lr=new class extends Error{constructor(){super(...arguments);Nt(this,"name","StaleReactionError");Nt(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var di;const _a=!!((di=globalThis.document)!=null&&di.contentType)&&globalThis.document.contentType.includes("xml");function ls(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function is(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function os(t,e,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function ss(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function cs(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function us(t){throw new Error("https://svelte.dev/e/effect_orphan")}function vs(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function ds(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function fs(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function hs(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function _s(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function gs(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const ps=1,bs=2,ki=4,ms=8,ys=16,ws=1,ks=2,xi=4,xs=8,Ss=16,Si=1,Ts=2,st=Symbol("uninitialized"),Ti="http://www.w3.org/1999/xhtml",Ms="http://www.w3.org/2000/svg",Ds="@attach";function js(){console.warn("https://svelte.dev/e/derived_inert")}function Ps(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function Es(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Mi(t){return t===this.v}function Cs(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function Di(t){return!Cs(t,this.v)}let dr=!1,Ns=!1;function qs(){dr=!0}let lt=null;function lr(t){lt=t}function rt(t,e=!1,n){lt={p:lt,i:!1,c:null,e:null,s:t,x:null,r:je,l:dr&&!e?{s:null,u:null,$:[]}:null}}function at(t){var e=lt,n=e.e;if(n!==null){e.e=null;for(var a of n)Ji(a)}return e.i=!0,lt=e.p,{}}function Br(){return!dr||lt!==null&&lt.l===null}let Pn=[];function ji(){var t=Pn;Pn=[],Oa(t)}function an(t){if(Pn.length===0&&!jr){var e=Pn;queueMicrotask(()=>{e===Pn&&ji()})}Pn.push(t)}function Os(){for(;Pn.length>0;)ji()}function Pi(t){var e=je;if(e===null)return Ae.f|=Tn,t;if((e.f&ur)===0&&(e.f&ar)===0)throw t;xn(t,e)}function xn(t,e){if(!(e!==null&&(e.f&Ft)!==0)){for(;e!==null;){if((e.f&Ia)!==0){if((e.f&ur)===0)throw t;try{e.b.error(t);return}catch(n){t=n}}e=e.parent}throw t}}const Is=-7169;function it(t,e){t.f=t.f&Is|e}function vl(t){(t.f&Ut)!==0||t.deps===null?it(t,vt):it(t,Zt)}function Ei(t){if(t!==null)for(const e of t)(e.f&ft)===0||(e.f&Bn)===0||(e.f^=Bn,Ei(e.deps))}function Ci(t,e,n){(t.f&ct)!==0?e.add(t):(t.f&Zt)!==0&&n.add(t),Ei(t.deps),it(t,vt)}let Vr=!1;function As(t){var e=Vr;try{return Vr=!1,[t(),Vr]}finally{Vr=e}}function Jr(t,e){if(e){const n=document.body;t.autofocus=!0,an(()=>{document.activeElement===n&&t.focus()})}}let El=!1;function Fs(){El||(El=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var e;if(!t.defaultPrevented)for(const n of t.target.elements)(e=n[Xr])==null||e.call(n)})},{capture:!0}))}function fr(t){var e=Ae,n=je;Ht(null),Wt(null);try{return t()}finally{Ht(e),Wt(n)}}function Ni(t,e,n,a=n){t.addEventListener(e,()=>fr(n));const l=t[Xr];l?t[Xr]=()=>{l(),a(!0)}:t[Xr]=()=>a(!0),Fs()}function zs(t){let e=0,n=Dn(0),a;return()=>{pl()&&(r(n),bl(()=>(e===0&&(a=yt(()=>t(()=>Pr(n)))),e+=1,()=>{an(()=>{e-=1,e===0&&(a==null||a(),a=void 0,Pr(n))})})))}}var Rs=Mn|vr;function Ls(t,e,n,a){new Bs(t,e,n,a)}var Rt,ol,Lt,qn,Pt,Bt,St,Ot,vn,On,wn,Zn,Or,Ir,dn,va,nt,Us,Ys,Ra,Hs,La,Zr,Qr,Ba,Ua;class Bs{constructor(e,n,a,l){Me(this,nt);Nt(this,"parent");Nt(this,"is_pending",!1);Nt(this,"transform_error");Me(this,Rt);Me(this,ol,null);Me(this,Lt);Me(this,qn);Me(this,Pt);Me(this,Bt,null);Me(this,St,null);Me(this,Ot,null);Me(this,vn,null);Me(this,On,0);Me(this,wn,0);Me(this,Zn,!1);Me(this,Or,new Set);Me(this,Ir,new Set);Me(this,dn,null);Me(this,va,zs(()=>(Te(this,dn,Dn(y(this,On))),()=>{Te(this,dn,null)})));var o;Te(this,Rt,e),Te(this,Lt,n),Te(this,qn,i=>{var s=je;s.b=this,s.f|=Ia,a(i)}),this.parent=je.b,this.transform_error=l??((o=this.parent)==null?void 0:o.transform_error)??(i=>i),Te(this,Pt,_r(()=>{Be(this,nt,La).call(this)},Rs))}defer_effect(e){Ci(e,y(this,Or),y(this,Ir))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!y(this,Lt).pending}update_pending_count(e,n){Be(this,nt,Ba).call(this,e,n),Te(this,On,y(this,On)+e),!(!y(this,dn)||y(this,Zn))&&(Te(this,Zn,!0),an(()=>{Te(this,Zn,!1),y(this,dn)&&or(y(this,dn),y(this,On))}))}get_effect_pending(){return y(this,va).call(this),r(y(this,dn))}error(e){if(!y(this,Lt).onerror&&!y(this,Lt).failed)throw e;we!=null&&we.is_fork?(y(this,Bt)&&we.skip_effect(y(this,Bt)),y(this,St)&&we.skip_effect(y(this,St)),y(this,Ot)&&we.skip_effect(y(this,Ot)),we.oncommit(()=>{Be(this,nt,Ua).call(this,e)})):Be(this,nt,Ua).call(this,e)}}Rt=new WeakMap,ol=new WeakMap,Lt=new WeakMap,qn=new WeakMap,Pt=new WeakMap,Bt=new WeakMap,St=new WeakMap,Ot=new WeakMap,vn=new WeakMap,On=new WeakMap,wn=new WeakMap,Zn=new WeakMap,Or=new WeakMap,Ir=new WeakMap,dn=new WeakMap,va=new WeakMap,nt=new WeakSet,Us=function(){try{Te(this,Bt,Tt(()=>y(this,qn).call(this,y(this,Rt))))}catch(e){this.error(e)}},Ys=function(e){const n=y(this,Lt).failed,{reset:a,invoke_onerror:l}=Be(this,nt,Ra).call(this,e);an(l),n&&Te(this,Ot,Tt(()=>{n(y(this,Rt),()=>e,()=>a)}))},Ra=function(e){var n=!1,a=!1;const l=()=>{if(n){Es();return}n=!0,a&&gs(),y(this,Ot)!==null&&Rn(y(this,Ot),()=>{Te(this,Ot,null)}),Be(this,nt,Qr).call(this,()=>{Be(this,nt,La).call(this)})};return{reset:l,invoke_onerror:()=>{var i,s;try{a=!0,(s=(i=y(this,Lt)).onerror)==null||s.call(i,e,l),a=!1}catch(c){xn(c,y(this,Pt)&&y(this,Pt).parent)}}}},Hs=function(){const e=y(this,Lt).pending;e&&(this.is_pending=!0,Te(this,St,Tt(()=>e(y(this,Rt)))),an(()=>{var n=Te(this,vn,document.createDocumentFragment()),a=Qt();n.append(a),Te(this,Bt,Be(this,nt,Qr).call(this,()=>Tt(()=>y(this,qn).call(this,a)))),y(this,wn)===0&&(y(this,Rt).before(n),Te(this,vn,null),Rn(y(this,St),()=>{Te(this,St,null)}),Be(this,nt,Zr).call(this,we))}))},La=function(){try{if(this.is_pending=this.has_pending_snippet(),Te(this,wn,0),Te(this,On,0),Te(this,Bt,Tt(()=>{y(this,qn).call(this,y(this,Rt))})),y(this,wn)>0){var e=Te(this,vn,document.createDocumentFragment());yl(y(this,Bt),e);const n=y(this,Lt).pending;Te(this,St,Tt(()=>n(y(this,Rt))))}else Be(this,nt,Zr).call(this,we)}catch(n){this.error(n)}},Zr=function(e){this.is_pending=!1,e.transfer_effects(y(this,Or),y(this,Ir))},Qr=function(e){var n=je,a=Ae,l=lt;Wt(y(this,Pt)),Ht(y(this,Pt)),lr(y(this,Pt).ctx);try{return Un.ensure(),e()}catch(o){return Pi(o),null}finally{Wt(n),Ht(a),lr(l)}},Ba=function(e,n){var a;if(!this.has_pending_snippet()){this.parent&&Be(a=this.parent,nt,Ba).call(a,e,n);return}Te(this,wn,y(this,wn)+e),y(this,wn)===0&&(Be(this,nt,Zr).call(this,n),y(this,St)&&Rn(y(this,St),()=>{Te(this,St,null)}),y(this,vn)&&(y(this,Rt).before(y(this,vn)),Te(this,vn,null)))},Ua=function(e){y(this,Bt)&&(mt(y(this,Bt)),Te(this,Bt,null)),y(this,St)&&(mt(y(this,St)),Te(this,St,null)),y(this,Ot)&&(mt(y(this,Ot)),Te(this,Ot,null));let n=y(this,Lt).failed;const a=l=>{const{reset:o,invoke_onerror:i}=Be(this,nt,Ra).call(this,l);i(),n&&Te(this,Ot,Be(this,nt,Qr).call(this,()=>{try{return Tt(()=>{var s=je;s.b=this,s.f|=Ia,n(y(this,Rt),()=>l,()=>o)})}catch(s){return xn(s,y(this,Pt).parent),null}}))};an(()=>{var l;try{l=this.transform_error(e)}catch(o){xn(o,y(this,Pt)&&y(this,Pt).parent);return}l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(a,o=>xn(o,y(this,Pt)&&y(this,Pt).parent)):a(l)})};function qi(t,e,n,a){const l=Br()?ir:dl;var o=t.filter(_=>!_.settled),i=e.map(l);if(n.length===0&&o.length===0){a(i);return}var s=je,c=Ws(),u=o.length===1?o[0].promise:o.length>1?Promise.all(o.map(_=>_.promise)):null;function f(_){if((s.f&Ft)===0){c();try{a([...i,..._])}catch(m){xn(m,s)}la()}}var p=Oi();if(n.length===0){u.then(()=>f([])).finally(p);return}function g(){Promise.all(n.map(_=>Vs(_))).then(f).catch(_=>xn(_,s)).finally(p)}u?u.then(()=>{c(),g(),la()}):g()}function Ws(){var t=je,e=Ae,n=lt,a=we;return function(o=!0){Wt(t),Ht(e),lr(n),o&&(t.f&Ft)===0&&(a==null||a.activate(),a==null||a.apply())}}function la(t=!0){Wt(null),Ht(null),lr(null),t&&(we==null||we.deactivate())}function Oi(){var t=je,e=t.b,n=we,a=!!(e!=null&&e.is_rendered());return e==null||e.update_pending_count(1,n),n.increment(a,t),()=>{e==null||e.update_pending_count(-1,n),n.decrement(a,t)}}function ir(t){var e=ft|ct;return je!==null&&(je.f|=vr),{ctx:lt,deps:null,effects:null,equals:Mi,f:e,fn:t,reactions:null,rv:0,v:st,wv:0,parent:je,ac:null}}const kr=Symbol("obsolete");function Vs(t,e,n){let a=je;a===null&&is();var l=void 0,o=Dn(st),i=!Ae,s=new Set;return oc(()=>{var _,m;var c=je,u=pi();l=u.promise;try{Promise.resolve(t()).then(u.resolve,x=>{x!==Lr&&u.reject(x)}).finally(la)}catch(x){u.reject(x),la()}var f=we;if(i){if((c.f&ur)!==0)var p=Oi();if((_=a.b)!=null&&_.is_rendered())(m=f.async_deriveds.get(c))==null||m.reject(kr);else for(const x of s.values())x.reject(kr);s.add(u),f.async_deriveds.set(c,u)}const g=(x,k=void 0)=>{p==null||p(),s.delete(u),k!==kr&&(f.activate(),k?(o.f|=Tn,or(o,k)):((o.f&Tn)!==0&&(o.f^=Tn),or(o,x)),f.deactivate())};u.promise.then(g,x=>g(null,x||"unknown"))}),ga(()=>{for(const c of s)c.reject(kr)}),new Promise(c=>{function u(f){function p(){f===l?c(o):u(l)}f.then(p,p)}u(l)})}function G(t){const e=ir(t);return no(e),e}function dl(t){const e=ir(t);return e.equals=Di,e}function Ks(t){var e=t.effects;if(e!==null){t.effects=null;for(var n=0;n<e.length;n+=1)mt(e[n])}}function fl(t){var e,n=je,a=t.parent;if(!bn&&a!==null&&t.v!==st&&(a.f&(Ft|jt))!==0)return js(),t.v;Wt(a);try{t.f&=~Bn,Ks(t),e=io(t)}finally{Wt(n)}return e}function Ii(t){var e=fl(t);if(!t.equals(e)&&(t.wv=ao(),(!(we!=null&&we.is_fork)||t.deps===null)&&(we!==null?(we.capture(t,e,!0),Dr==null||Dr.capture(t,e,!0)):t.v=e,t.deps===null))){it(t,vt);return}bn||(gt!==null?(pl()||we!=null&&we.is_fork)&&gt.set(t,e):vl(t))}function Gs(t){var e;if(t.effects!==null)for(const n of t.effects)(n.teardown||n.ac)&&((e=n.teardown)==null||e.call(n),n.ac!==null&&fr(()=>{n.ac.abort(Lr),n.ac=null}),n.fn!==null&&(n.teardown=ns),Nr(n,0),ml(n))}function Ai(t){if(t.effects!==null)for(const e of t.effects)e.teardown&&e.fn!==null&&sr(e)}let ma=null,Wn=null,we=null,Dr=null,gt=null,Ya=null,jr=!1,ya=!1,Kn=null,$r=null;var Cl=0;let Xs=1;var Qn,kn,In,$n,er,tr,fn,nr,Et,Ar,hn,Kt,tn,rr,An,Ve,Ha,xr,Wa,Fi,zi,Vn,Js,Sr;const da=class da{constructor(){Me(this,Ve);Nt(this,"id",Xs++);Me(this,Qn,!1);Nt(this,"linked",!0);Me(this,kn,null);Me(this,In,null);Nt(this,"async_deriveds",new Map);Nt(this,"current",new Map);Nt(this,"previous",new Map);Me(this,$n,new Set);Me(this,er,new Set);Me(this,tr,0);Me(this,fn,new Map);Me(this,nr,null);Me(this,Et,[]);Me(this,Ar,[]);Me(this,hn,new Set);Me(this,Kt,new Set);Me(this,tn,new Map);Me(this,rr,new Set);Nt(this,"is_fork",!1);Me(this,An,!1);Wn===null?ma=Wn=this:(Te(Wn,In,this),Te(this,kn,Wn)),Wn=this}skip_effect(e){y(this,tn).has(e)||y(this,tn).set(e,{d:[],m:[]}),y(this,rr).delete(e)}unskip_effect(e,n=a=>this.schedule(a)){var a=y(this,tn).get(e);if(a){y(this,tn).delete(e);for(var l of a.d)it(l,ct),n(l);for(l of a.m)it(l,Zt),n(l)}y(this,rr).add(e)}capture(e,n,a=!1){e.v!==st&&!this.previous.has(e)&&this.previous.set(e,e.v),(e.f&Tn)===0&&(this.current.set(e,[n,a]),gt==null||gt.set(e,n)),this.is_fork||(e.v=n)}activate(){we=this}deactivate(){we=null,gt=null}flush(){try{ya=!0,we=this,Be(this,Ve,xr).call(this)}finally{Cl=0,Ya=null,Kn=null,$r=null,ya=!1,we=null,gt=null,zn.clear()}}discard(){var e;for(const n of y(this,er))n(this);y(this,er).clear();for(const n of this.async_deriveds.values())n.reject(kr);Be(this,Ve,Sr).call(this),(e=y(this,nr))==null||e.resolve()}register_created_effect(e){y(this,Ar).push(e)}increment(e,n){if(Te(this,tr,y(this,tr)+1),e){let a=y(this,fn).get(n)??0;y(this,fn).set(n,a+1)}}decrement(e,n){if(Te(this,tr,y(this,tr)-1),e){let a=y(this,fn).get(n)??0;a===1?y(this,fn).delete(n):y(this,fn).set(n,a-1)}y(this,An)||(Te(this,An,!0),an(()=>{Te(this,An,!1),this.linked&&this.flush()}))}transfer_effects(e,n){for(const a of e)y(this,hn).add(a);for(const a of n)y(this,Kt).add(a);e.clear(),n.clear()}oncommit(e){y(this,$n).add(e)}ondiscard(e){y(this,er).add(e)}settled(){return(y(this,nr)??Te(this,nr,pi())).promise}static ensure(){if(we===null){const e=we=new da;!ya&&!jr&&an(()=>{y(e,Qn)||e.flush()})}return we}apply(){{gt=null;return}}schedule(e){var l;if(Ya=e,(l=e.b)!=null&&l.is_pending&&(e.f&(ar|Rr|ul))!==0&&(e.f&ur)===0){e.b.defer_effect(e);return}for(var n=e;n.parent!==null;){n=n.parent;var a=n.f;if(Kn!==null&&n===je&&(Ae===null||(Ae.f&ft)===0))return;if((a&(pn|Yt))!==0){if((a&vt)===0)return;n.f^=vt}}y(this,Et).push(n)}};Qn=new WeakMap,kn=new WeakMap,In=new WeakMap,$n=new WeakMap,er=new WeakMap,tr=new WeakMap,fn=new WeakMap,nr=new WeakMap,Et=new WeakMap,Ar=new WeakMap,hn=new WeakMap,Kt=new WeakMap,tn=new WeakMap,rr=new WeakMap,An=new WeakMap,Ve=new WeakSet,Ha=function(){if(this.is_fork)return!0;for(const a of y(this,fn).keys()){for(var e=a,n=!1;e.parent!==null;){if(y(this,tn).has(e)){n=!0;break}e=e.parent}if(!n)return!0}return!1},xr=function(){var c,u,f,p;Te(this,Qn,!0),Cl++>1e3&&(Be(this,Ve,Sr).call(this),Qs());for(const g of y(this,hn))y(this,Kt).delete(g),it(g,ct),this.schedule(g);for(const g of y(this,Kt))it(g,Zt),this.schedule(g);const e=y(this,Et);Te(this,Et,[]),this.apply();var n=Kn=[],a=[],l=$r=[];for(const g of e)try{Be(this,Ve,Wa).call(this,g,n,a)}catch(_){throw Bi(g),Be(this,Ve,Ha).call(this)||this.discard(),_}if(we=null,l.length>0){var o=da.ensure();for(const g of l)o.schedule(g)}if(Kn=null,$r=null,Be(this,Ve,Ha).call(this)){Be(this,Ve,Vn).call(this,a),Be(this,Ve,Vn).call(this,n);for(const[g,_]of y(this,tn))Li(g,_);l.length>0&&Be(c=we,Ve,xr).call(c);return}const i=Be(this,Ve,Fi).call(this);if(i){Be(this,Ve,Vn).call(this,a),Be(this,Ve,Vn).call(this,n),Be(u=i,Ve,zi).call(u,this);return}y(this,hn).clear(),y(this,Kt).clear();for(const g of y(this,$n))g(this);y(this,$n).clear(),Dr=this,Nl(a),Nl(n),Dr=null,(f=y(this,nr))==null||f.resolve();var s=we;if(y(this,tr)===0&&(y(this,Et).length===0||s!==null)&&Be(this,Ve,Sr).call(this),y(this,Et).length>0)if(s!==null){const g=s;y(g,Et).push(...y(this,Et).filter(_=>!y(g,Et).includes(_)))}else s=this;s!==null&&Be(p=s,Ve,xr).call(p)},Wa=function(e,n,a){e.f^=vt;for(var l=e.first;l!==null;){var o=l.f,i=(o&(Yt|pn))!==0,s=i&&(o&vt)!==0,c=s||(o&jt)!==0||y(this,tn).has(l);if(!c&&l.fn!==null){i?l.f^=vt:(o&ar)!==0?n.push(l):Yr(l)&&((o&Xt)!==0&&y(this,Kt).add(l),sr(l));var u=l.first;if(u!==null){l=u;continue}}for(;l!==null;){var f=l.next;if(f!==null){l=f;break}l=l.parent}}},Fi=function(){for(var e=y(this,kn);e!==null;){if(!e.is_fork){for(const[n,[,a]]of this.current)if(e.current.has(n)&&!a)return e}e=y(e,kn)}return null},zi=function(e){var a;for(const[l,o]of e.current)!this.previous.has(l)&&e.previous.has(l)&&this.previous.set(l,e.previous.get(l)),this.current.set(l,o);for(const[l,o]of e.async_deriveds){const i=this.async_deriveds.get(l);i&&o.promise.then(i.resolve).catch(i.reject)}e.async_deriveds.clear(),this.transfer_effects(y(e,hn),y(e,Kt));const n=l=>{var o=l.reactions;if(o!==null&&!((l.f&ft)!==0&&(l.f&(ct|Zt))===0))for(const c of o){var i=c.f;if((i&ft)!==0)n(c);else{var s=c;i&(Gn|Xt)&&!this.async_deriveds.has(s)&&(y(this,Kt).delete(s),it(s,ct),this.schedule(s))}}};for(const l of this.current.keys())n(l);this.oncommit(()=>e.discard()),Be(a=e,Ve,Sr).call(a),we=this,Be(this,Ve,xr).call(this)},Vn=function(e){for(var n=0;n<e.length;n+=1)Ci(e[n],y(this,hn),y(this,Kt))},Js=function(){var p;for(let g=ma;g!==null;g=y(g,In)){var e=g.id<this.id,n=[];for(const[_,[m,x]]of this.current){if(g.current.has(_)){var a=g.current.get(_)[0];if(e&&m!==a)g.current.set(_,[m,x]);else continue}n.push(_)}if(e)for(const[_,m]of this.async_deriveds){const x=g.async_deriveds.get(_);x&&m.promise.then(x.resolve).catch(x.reject)}var l=[...g.current.keys()].filter(_=>!g.current.get(_)[1]);if(!(!y(g,Qn)||l.length===0)){var o=l.filter(_=>!this.current.has(_));if(o.length===0)e&&g.discard();else if(n.length>0){if(e)for(const _ of y(this,rr))g.unskip_effect(_,m=>{var x;(m.f&(Xt|Gn))!==0?g.schedule(m):Be(x=g,Ve,Vn).call(x,[m])});g.activate();var i=new Set,s=new Map;for(var c of n)Ri(c,o,i,s);s=new Map;var u=[...g.current].filter(([_,m])=>{const x=this.current.get(_);return x?x[0]!==m[0]||x[1]!==m[1]:!0}).map(([_])=>_);if(u.length>0)for(const _ of y(this,Ar))(_.f&(Ft|jt|ra))===0&&hl(_,u,s)&&((_.f&(Gn|Xt))!==0?(it(_,ct),g.schedule(_)):y(g,hn).add(_));if(y(g,Et).length>0&&!y(g,An)){g.apply();for(var f of y(g,Et))Be(p=g,Ve,Wa).call(p,f,[],[]);Te(g,Et,[])}g.deactivate()}}}},Sr=function(){if(this.linked){var e=y(this,kn),n=y(this,In);e===null?ma=n:Te(e,In,n),n===null?Wn=e:Te(n,kn,e),this.linked=!1}};let Un=da;function Zs(t){var e=jr;jr=!0;try{for(var n;;){if(Os(),we===null)return n;we.flush()}}finally{jr=e}}function Qs(){try{vs()}catch(t){xn(t,Ya)}}let Vt=null;function Nl(t){var e=t.length;if(e!==0){for(var n=0;n<e;){var a=t[n++];if((a.f&(Ft|jt))===0&&Yr(a)&&(Vt=new Set,sr(a),a.deps===null&&a.first===null&&a.nodes===null&&a.teardown===null&&a.ac===null&&$i(a),(Vt==null?void 0:Vt.size)>0)){zn.clear();for(const l of Vt){if((l.f&(Ft|jt))!==0)continue;const o=[l];let i=l.parent;for(;i!==null;)Vt.has(i)&&(Vt.delete(i),o.push(i)),i=i.parent;for(let s=o.length-1;s>=0;s--){const c=o[s];(c.f&(Ft|jt))===0&&sr(c)}}Vt.clear()}}Vt=null}}function Ri(t,e,n,a){if(!n.has(t)&&(n.add(t),t.reactions!==null))for(const l of t.reactions){const o=l.f;(o&ft)!==0?Ri(l,e,n,a):(o&(Gn|Xt))!==0&&(o&ct)===0&&hl(l,e,a)&&(it(l,ct),_l(l))}}function hl(t,e,n){const a=n.get(t);if(a!==void 0)return a;if(t.deps!==null)for(const l of t.deps){if(na.call(e,l))return!0;if((l.f&ft)!==0&&hl(l,e,n))return n.set(l,!0),!0}return n.set(t,!1),!1}function _l(t){we.schedule(t)}function Li(t,e){if(!((t.f&Yt)!==0&&(t.f&vt)!==0)){(t.f&ct)!==0?e.d.push(t):(t.f&Zt)!==0&&e.m.push(t),it(t,vt);for(var n=t.first;n!==null;)Li(n,e),n=n.next}}function Bi(t){it(t,vt);for(var e=t.first;e!==null;)Bi(e),e=e.next}let ia=new Set;const zn=new Map;let Ui=!1;function Dn(t,e){var n={f:0,v:t,reactions:null,equals:Mi,rv:0,wv:0};return n}function R(t,e){const n=Dn(t);return no(n),n}function $s(t,e=!1,n=!0){var l;const a=Dn(t);return e||(a.equals=Di),dr&&n&&lt!==null&&lt.l!==null&&((l=lt.l).s??(l.s=[])).push(a),a}function h(t,e,n=!1){Ae!==null&&(!Jt||(Ae.f&ra)!==0)&&Br()&&(Ae.f&(ft|Xt|Gn|ra))!==0&&(sn===null||!sn.has(t))&&_s();let a=n?Ce(e):e;return or(t,a,$r)}function or(t,e,n=null){if(!t.equals(e)){zn.set(t,bn?e:t.v);var a=Un.ensure();if(a.capture(t,e),(t.f&ft)!==0){const l=t;(t.f&ct)!==0&&fl(l),gt===null&&vl(l)}t.wv=ao(),Yi(t,ct,n),Br()&&je!==null&&(je.f&vt)!==0&&(je.f&(Yt|pn))===0&&(zt===null?uc([t]):zt.push(t)),!a.is_fork&&ia.size>0&&!Ui&&ec()}return e}function ec(){Ui=!1;for(const t of ia){(t.f&vt)!==0&&it(t,Zt);let e;try{e=Yr(t)}catch{e=!0}e&&sr(t)}ia.clear()}function ql(t,e=1){var n=r(t),a=e===1?n++:n--;return h(t,n),a}function Pr(t){h(t,t.v+1)}function Yi(t,e,n){var a=t.reactions;if(a!==null)for(var l=Br(),o=a.length,i=0;i<o;i++){var s=a[i],c=s.f;if(!(!l&&s===je)){var u=(c&ct)===0;if(u&&it(s,e),(c&ra)!==0)ia.add(s);else if((c&ft)!==0){var f=s;gt==null||gt.delete(f),(c&Bn)===0&&(c&Ut&&(je===null||(je.f&aa)===0)&&(s.f|=Bn),Yi(f,Zt,n))}else if(u){var p=s;(c&Xt)!==0&&Vt!==null&&Vt.add(p),n!==null?n.push(p):_l(p)}}}}function Ce(t){if(typeof t!="object"||t===null||on in t)return t;const e=cl(t);if(e!==es&&e!==ts)return t;var n=new Map,a=sl(t),l=R(0),o=Ln,i=s=>{if(Ln===o)return s();var c=Ae,u=Ln;Ht(null),Al(o);var f=s();return Ht(c),Al(u),f};return a&&n.set("length",R(t.length)),new Proxy(t,{defineProperty(s,c,u){(!("value"in u)||u.configurable===!1||u.enumerable===!1||u.writable===!1)&&fs();var f=n.get(c);return f===void 0?i(()=>{var p=R(u.value);return n.set(c,p),p}):h(f,u.value,!0),!0},deleteProperty(s,c){var u=n.get(c);if(u===void 0){if(c in s){const f=i(()=>R(st));n.set(c,f),Pr(l)}}else h(u,st),Pr(l);return!0},get(s,c,u){var _;if(c===on)return t;var f=n.get(c),p=c in s;if(f===void 0&&(!p||(_=Sn(s,c))!=null&&_.writable)&&(f=i(()=>{var m=Ce(p?s[c]:st),x=R(m);return x}),n.set(c,f)),f!==void 0){var g=r(f);return g===st?void 0:g}return Reflect.get(s,c,u)},getOwnPropertyDescriptor(s,c){var u=Reflect.getOwnPropertyDescriptor(s,c);if(u&&"value"in u){var f=n.get(c);f&&(u.value=r(f))}else if(u===void 0){var p=n.get(c),g=p==null?void 0:p.v;if(p!==void 0&&g!==st)return{enumerable:!0,configurable:!0,value:g,writable:!0}}return u},has(s,c){var g;if(c===on)return!0;var u=n.get(c),f=u!==void 0&&u.v!==st||Reflect.has(s,c);if(u!==void 0||je!==null&&(!f||(g=Sn(s,c))!=null&&g.writable)){u===void 0&&(u=i(()=>{var _=f?Ce(s[c]):st,m=R(_);return m}),n.set(c,u));var p=r(u);if(p===st)return!1}return f},set(s,c,u,f){var S;var p=n.get(c),g=c in s;if(a&&c==="length")for(var _=u;_<p.v;_+=1){var m=n.get(_+"");m!==void 0?h(m,st):_ in s&&(m=i(()=>R(st)),n.set(_+"",m))}if(p===void 0)(!g||(S=Sn(s,c))!=null&&S.writable)&&(p=i(()=>R(void 0)),h(p,Ce(u)),n.set(c,p));else{g=p.v!==st;var x=i(()=>Ce(u));h(p,x)}var k=Reflect.getOwnPropertyDescriptor(s,c);if(k!=null&&k.set&&k.set.call(f,u),!g){if(a&&typeof c=="string"){var M=n.get("length"),P=Number(c);Number.isInteger(P)&&P>=M.v&&h(M,P+1)}Pr(l)}return!0},ownKeys(s){r(l);var c=Reflect.ownKeys(s).filter(p=>{var g=n.get(p);return g===void 0||g.v!==st});for(var[u,f]of n)f.v!==st&&!(u in s)&&c.push(u);return c},setPrototypeOf(){hs()}})}function Ol(t){try{if(t!==null&&typeof t=="object"&&on in t)return t[on]}catch{}return t}function tc(t,e){return Object.is(Ol(t),Ol(e))}var Va,gl,Hi,Wi,Vi;function nc(){if(Va===void 0){Va=window,gl=document,Hi=/Firefox/.test(navigator.userAgent);var t=Element.prototype,e=Node.prototype,n=Text.prototype;Wi=Sn(e,"firstChild").get,Vi=Sn(e,"nextSibling").get,Pl(t)&&(t[Fa]=void 0,t[Gr]=null,t[za]=void 0,t.__e=void 0),Pl(n)&&(n[wr]=void 0)}}function Qt(t=""){return document.createTextNode(t)}function _n(t){return Wi.call(t)}function Ur(t){return Vi.call(t)}function v(t,e){return _n(t)}function Pe(t,e=!1){{var n=_n(t);return n instanceof Comment&&n.data===""?Ur(n):n}}function d(t,e=1,n=!1){let a=t;for(;e--;)a=Ur(a);return a}function rc(t){t.textContent=""}function Ki(){return!1}function Gi(t,e,n){return e==null||e===Ti?n?document.createElement(t,{is:n}):document.createElement(t):n?document.createElementNS(e,t,{is:n}):document.createElementNS(e,t)}function Xi(t){je===null&&(Ae===null&&us(),cs()),bn&&ss()}function ac(t,e){var n=e.last;n===null?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}function $t(t,e){var n=je;n!==null&&(n.f&jt)!==0&&(t|=jt);var a={ctx:lt,deps:null,nodes:null,f:t|ct|Ut,first:null,fn:e,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};we==null||we.register_created_effect(a);var l=a;if((t&ar)!==0)Kn!==null?Kn.push(a):Un.ensure().schedule(a);else if(e!==null){try{sr(a)}catch(i){throw mt(a),i}l.deps===null&&l.teardown===null&&l.nodes===null&&l.first===l.last&&(l.f&vr)===0&&(l=l.first,(t&Xt)!==0&&(t&Mn)!==0&&l!==null&&(l.f|=Mn))}if(l!==null&&(l.parent=n,n!==null&&ac(l,n),Ae!==null&&(Ae.f&ft)!==0&&(t&pn)===0)){var o=Ae;(o.effects??(o.effects=[])).push(l)}return a}function pl(){return Ae!==null&&!Jt}function ga(t){const e=$t(Rr,null);return it(e,vt),e.teardown=t,e}function ot(t){Xi();var e=je.f,n=!Ae&&(e&Yt)!==0&&lt!==null&&!lt.i;if(n){var a=lt;(a.e??(a.e=[])).push(t)}else return Ji(t)}function Ji(t){return $t(ar|yi,t)}function lc(t){return Xi(),$t(Rr|yi,t)}function ic(t){Un.ensure();const e=$t(pn|vr,t);return(n={})=>new Promise(a=>{n.outro?Rn(e,()=>{mt(e),a(void 0)}):(mt(e),a(void 0))})}function hr(t){return $t(ar,t)}function oc(t){return $t(Gn|vr,t)}function bl(t,e=0){return $t(Rr|e,t)}function K(t,e=[],n=[],a=[]){qi(a,e,n,l=>{$t(Rr,()=>{t(...l.map(r))})})}function _r(t,e=0){var n=$t(Xt|e,t);return n}function Zi(t,e=0){var n=$t(ul|e,t);return n}function Tt(t){return $t(Yt|vr,t)}function Qi(t){var e=t.teardown;if(e!==null){const n=bn,a=Ae;Il(!0),Ht(null);try{e.call(null)}finally{Il(n),Ht(a)}}}function ml(t,e=!1){var n=t.first;for(t.first=t.last=null;n!==null;){const l=n.ac;l!==null&&fr(()=>{l.abort(Lr)});var a=n.next;(n.f&pn)!==0?n.parent=null:mt(n,e),n=a}}function sc(t){for(var e=t.first;e!==null;){var n=e.next;(e.f&Yt)===0&&mt(e),e=n}}function mt(t,e=!0){var n=!1;(e||(t.f&mi)!==0)&&t.nodes!==null&&t.nodes.end!==null&&(cc(t.nodes.start,t.nodes.end),n=!0),t.f|=Aa,ml(t,e&&!n),Nr(t,0);var a=t.nodes&&t.nodes.t;if(a!==null)for(const o of a)o.stop();Qi(t),t.f^=Aa,t.f|=Ft;var l=t.parent;l!==null&&l.first!==null&&$i(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes=t.ac=t.b=null}function cc(t,e){for(;t!==null;){var n=t===e?null:Ur(t);t.remove(),t=n}}function $i(t){var e=t.parent,n=t.prev,a=t.next;n!==null&&(n.next=a),a!==null&&(a.prev=n),e!==null&&(e.first===t&&(e.first=a),e.last===t&&(e.last=n))}function Rn(t,e,n=!0){var a=[];eo(t,a,!0);var l=()=>{n&&mt(t),e&&e()},o=a.length;if(o>0){var i=()=>--o||l();for(var s of a)s.out(i)}else l()}function eo(t,e,n){if((t.f&jt)===0){t.f^=jt;var a=t.nodes&&t.nodes.t;if(a!==null)for(const s of a)(s.is_global||n)&&e.push(s);for(var l=t.first;l!==null;){var o=l.next;if((l.f&pn)===0){var i=(l.f&Mn)!==0||(l.f&Yt)!==0&&(t.f&Xt)!==0;eo(l,e,i?n:!1)}l=o}}}function oa(t){to(t,!0)}function to(t,e){if((t.f&jt)!==0){t.f^=jt,(t.f&vt)===0&&(it(t,ct),Un.ensure().schedule(t));for(var n=t.first;n!==null;){var a=n.next,l=(n.f&Mn)!==0||(n.f&Yt)!==0;to(n,l?e:!1),n=a}var o=t.nodes&&t.nodes.t;if(o!==null)for(const i of o)(i.is_global||e)&&i.in()}}function yl(t,e){if(t.nodes)for(var n=t.nodes.start,a=t.nodes.end;n!==null;){var l=n===a?null:Ur(n);e.append(n),n=l}}let ea=!1,bn=!1;function Il(t){bn=t}let Ae=null,Jt=!1;function Ht(t){Ae=t}let je=null;function Wt(t){je=t}let sn=null;function no(t){Ae!==null&&(sn??(sn=new Set)).add(t)}let Ct=null,qt=0,zt=null;function uc(t){zt=t}let ro=1,En=0,Ln=En;function Al(t){Ln=t}function ao(){return++ro}function Yr(t){var e=t.f;if((e&ct)!==0)return!0;if(e&ft&&(t.f&=~Bn),(e&Zt)!==0){for(var n=t.deps,a=n.length,l=0;l<a;l++){var o=n[l];if(Yr(o)&&Ii(o),o.wv>t.wv)return!0}(e&Ut)!==0&&gt===null&&it(t,vt)}return!1}function lo(t,e,n=!0){var a=t.reactions;if(a!==null&&!(sn!==null&&sn.has(t)))for(var l=0;l<a.length;l++){var o=a[l];(o.f&ft)!==0?lo(o,e,!1):e===o&&(n?it(o,ct):(o.f&vt)!==0&&it(o,Zt),_l(o))}}function io(t){var x;var e=Ct,n=qt,a=zt,l=Ae,o=sn,i=lt,s=Jt,c=Ln,u=t.f;Ct=null,qt=0,zt=null,Ae=(u&(Yt|pn))===0?t:null,sn=null,lr(t.ctx),Jt=!1,Ln=++En,t.ac!==null&&(fr(()=>{t.ac.abort(Lr)}),t.ac=null);try{t.f|=aa;var f=t.fn,p=f();t.f|=ur;var g=t.deps,_=we==null?void 0:we.is_fork;if(Ct!==null){var m;if(_||Nr(t,qt),g!==null&&qt>0)for(g.length=qt+Ct.length,m=0;m<Ct.length;m++)g[qt+m]=Ct[m];else t.deps=g=Ct;if(pl()&&(t.f&Ut)!==0)for(m=qt;m<g.length;m++)((x=g[m]).reactions??(x.reactions=[])).push(t)}else!_&&g!==null&&qt<g.length&&(Nr(t,qt),g.length=qt);if(Br()&&zt!==null&&!Jt&&g!==null&&(t.f&(ft|Zt|ct))===0)for(m=0;m<zt.length;m++)lo(zt[m],t);if(l!==null&&l!==t){if(En++,l.deps!==null)for(let k=0;k<n;k+=1)l.deps[k].rv=En;if(e!==null)for(const k of e)k.rv=En;zt!==null&&(a===null?a=zt:a.push(...zt))}return(t.f&Tn)!==0&&(t.f^=Tn),p}catch(k){return Pi(k)}finally{t.f^=aa,Ct=e,qt=n,zt=a,Ae=l,sn=o,lr(i),Jt=s,Ln=c}}function vc(t,e){let n=e.reactions;if(n!==null){var a=Qo.call(n,t);if(a!==-1){var l=n.length-1;l===0?n=e.reactions=null:(n[a]=n[l],n.pop())}}if(n===null&&(e.f&ft)!==0&&(Ct===null||!na.call(Ct,e))){var o=e;(o.f&Ut)!==0&&(o.f^=Ut,o.f&=~Bn),o.v!==st&&vl(o),o.ac!==null&&fr(()=>{o.ac.abort(Lr),o.ac=null,it(o,ct)}),Gs(o),Nr(o,0)}}function Nr(t,e){var n=t.deps;if(n!==null)for(var a=e;a<n.length;a++)vc(t,n[a])}function sr(t){var e=t.f;if((e&Ft)===0){it(t,vt);var n=je,a=ea;je=t,ea=(e&(Yt|pn))===0;try{(e&(Xt|ul))!==0?sc(t):ml(t),Qi(t);var l=io(t);t.teardown=typeof l=="function"?l:null,t.wv=ro;var o;_i&&Ns&&(t.f&ct)!==0&&t.deps}finally{ea=a,je=n}}}async function dc(){await Promise.resolve(),Zs()}function r(t){var e=t.f,n=(e&ft)!==0;if(Ae!==null&&!Jt){var a=je!==null&&(je.f&Ft)!==0;if(!a&&(sn===null||!sn.has(t))){var l=Ae.deps;if((Ae.f&aa)!==0)t.rv<En&&(t.rv=En,Ct===null&&l!==null&&l[qt]===t?qt++:Ct===null?Ct=[t]:Ct.push(t));else{Ae.deps??(Ae.deps=[]),na.call(Ae.deps,t)||Ae.deps.push(t);var o=t.reactions;o===null?t.reactions=[Ae]:na.call(o,Ae)||o.push(Ae)}}}if(bn&&zn.has(t))return zn.get(t);if(n){var i=t;if(bn){var s=i.v;return((i.f&vt)===0&&i.reactions!==null||so(i))&&(s=fl(i)),zn.set(i,s),s}var c=(i.f&Ut)===0&&!Jt&&Ae!==null&&(ea||(Ae.f&Ut)!==0),u=(i.f&ur)===0;Yr(i)&&(c&&(i.f|=Ut),Ii(i)),c&&!u&&(Ai(i),oo(i))}if(gt!=null&&gt.has(t))return gt.get(t);if((t.f&Tn)!==0)throw t.v;return t.v}function oo(t){if(t.f|=Ut,t.deps!==null)for(const e of t.deps)(e.reactions??(e.reactions=[])).push(t),(e.f&ft)!==0&&(e.f&Ut)===0&&(Ai(e),oo(e))}function so(t){if(t.v===st)return!0;if(t.deps===null)return!1;for(const e of t.deps)if(zn.has(e)||(e.f&ft)!==0&&so(e))return!0;return!1}function yt(t){var e=Jt;try{return Jt=!0,t()}finally{Jt=e}}function jn(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(on in t)Ka(t);else if(!Array.isArray(t))for(let e in t){const n=t[e];typeof n=="object"&&n&&on in n&&Ka(n)}}}function Ka(t,e=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!e.has(t)){e.add(t),t instanceof Date&&t.getTime();for(let a in t)try{Ka(t[a],e)}catch{}const n=cl(t);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const a=gi(n);for(let l in a){const o=a[l].get;if(o)try{o.call(t)}catch{}}}}}function fc(t){return t.endsWith("capture")&&t!=="gotpointercapture"&&t!=="lostpointercapture"}const hc=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function _c(t){return hc.includes(t)}const gc={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function pc(t){return t=t.toLowerCase(),gc[t]??t}const bc=["touchstart","touchmove"];function mc(t){return bc.includes(t)}const Cn=Symbol("events"),co=new Set,Ga=new Set;function uo(t,e,n,a={}){function l(o){if(a.capture||Xa.call(e,o),!o.cancelBubble)return fr(()=>n==null?void 0:n.call(this,o))}return t.startsWith("pointer")||t.startsWith("touch")||t==="wheel"?an(()=>{e.addEventListener(t,l,a)}):e.addEventListener(t,l,a),l}function pt(t,e,n,a,l){var o={capture:a,passive:l},i=uo(t,e,n,o);(e===document.body||e===window||e===document||e instanceof HTMLMediaElement)&&ga(()=>{e.removeEventListener(t,i,o)})}function H(t,e,n){(e[Cn]??(e[Cn]={}))[t]=n}function ut(t){for(var e=0;e<t.length;e++)co.add(t[e]);for(var n of Ga)n(t)}let Fl=null;function Xa(t){var x,k;var e=this,n=e.ownerDocument,a=t.type,l=((x=t.composedPath)==null?void 0:x.call(t))||[],o=l[0]||t.target;Fl=t;var i=0,s=Fl===t&&t[Cn];if(s){var c=l.indexOf(s);if(c!==-1&&(e===document||e===window)){t[Cn]=e;return}var u=l.indexOf(e);if(u===-1)return;c<=u&&(i=c)}if(o=l[i]||t.target,o!==e){$o(t,"currentTarget",{configurable:!0,get(){return o||n}});var f=Ae,p=je;Ht(null),Wt(null);try{for(var g,_=[];o!==null&&o!==e;){try{var m=(k=o[Cn])==null?void 0:k[a];m!=null&&(!o.disabled||t.target===o)&&m.call(o,t)}catch(M){g?_.push(M):g=M}if(t.cancelBubble)break;i++,o=i<l.length?l[i]:null}if(g){for(let M of _)queueMicrotask(()=>{throw M});throw g}}finally{t[Cn]=e,delete t.currentTarget,Ht(f),Wt(p)}}}var fi;const wa=((fi=globalThis==null?void 0:globalThis.window)==null?void 0:fi.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:t=>t});function yc(t){return(wa==null?void 0:wa.createHTML(t))??t}function vo(t){var e=Gi("template");return e.innerHTML=yc(t.replaceAll("<!>","<!---->")),e.content}function Yn(t,e){var n=je;n.nodes===null&&(n.nodes={start:t,end:e,a:null,t:null})}function C(t,e){var n=(e&Si)!==0,a=(e&Ts)!==0,l,o=!t.startsWith("<!>");return()=>{l===void 0&&(l=vo(o?t:"<!>"+t),n||(l=_n(l)));var i=a||Hi?document.importNode(l,!0):l.cloneNode(!0);if(n){var s=_n(i),c=i.lastChild;Yn(s,c)}else Yn(i,i);return i}}function wc(t,e,n="svg"){var a=!t.startsWith("<!>"),l=(e&Si)!==0,o=`<${n}>${a?t:"<!>"+t}</${n}>`,i;return()=>{if(!i){var s=vo(o),c=_n(s);if(l)for(i=document.createDocumentFragment();_n(c);)i.appendChild(_n(c));else i=_n(c)}var u=i.cloneNode(!0);if(l){var f=_n(u),p=u.lastChild;Yn(f,p)}else Yn(u,u);return u}}function Hn(t,e){return wc(t,e,"svg")}function Ja(t=""){{var e=Qt(t+"");return Yn(e,e),e}}function Le(){var t=document.createDocumentFragment(),e=document.createComment(""),n=Qt();return t.append(e,n),Yn(e,n),t}function b(t,e){t!==null&&t.before(e)}function le(t,e){var n=e==null?"":typeof e=="object"?`${e}`:e;n!==(t[wr]??(t[wr]=t.nodeValue))&&(t[wr]=n,t.nodeValue=`${n}`)}function kc(t,e){return xc(t,e)}const Kr=new Map;function xc(t,{target:e,anchor:n,props:a={},events:l,context:o,intro:i=!0,transformError:s}){nc();var c=void 0,u=ic(()=>{var f=n??e.appendChild(Qt());Ls(f,{pending:()=>{}},_=>{rt({});var m=lt;o&&(m.c=o),l&&(a.$$events=l),c=t(_,a)||{},at()},s);var p=new Set,g=_=>{for(var m=0;m<_.length;m++){var x=_[m];if(!p.has(x)){p.add(x);var k=mc(x);for(const S of[e,document]){var M=Kr.get(S);M===void 0&&(M=new Map,Kr.set(S,M));var P=M.get(x);P===void 0?(S.addEventListener(x,Xa,{passive:k}),M.set(x,1)):M.set(x,P+1)}}}};return g(ha(co)),Ga.add(g),()=>{var k;for(var _ of p)for(const M of[e,document]){var m=Kr.get(M),x=m.get(_);--x==0?(M.removeEventListener(_,Xa),m.delete(_),m.size===0&&Kr.delete(M)):m.set(_,x)}Ga.delete(g),f!==n&&((k=f.parentNode)==null||k.removeChild(f))}});return Sc.set(c,u),c}let Sc=new WeakMap;var Gt,nn,It,Fn,Fr,zr,fa;class wl{constructor(e,n=!0){Nt(this,"anchor");Me(this,Gt,new Map);Me(this,nn,new Map);Me(this,It,new Map);Me(this,Fn,new Set);Me(this,Fr,!0);Me(this,zr,e=>{if(y(this,Gt).has(e)){var n=y(this,Gt).get(e),a=y(this,nn).get(n);if(a)oa(a),y(this,Fn).delete(n);else{var l=y(this,It).get(n);l&&(oa(l.effect),y(this,nn).set(n,l.effect),y(this,It).delete(n),l.fragment.lastChild.remove(),this.anchor.before(l.fragment),a=l.effect)}for(const[o,i]of y(this,Gt)){if(y(this,Gt).delete(o),o===e)break;const s=y(this,It).get(i);s&&(mt(s.effect),y(this,It).delete(i))}for(const[o,i]of y(this,nn)){if(o===n||y(this,Fn).has(o))continue;const s=()=>{if(Array.from(y(this,Gt).values()).includes(o)){var u=document.createDocumentFragment();yl(i,u),u.append(Qt()),y(this,It).set(o,{effect:i,fragment:u})}else mt(i);y(this,Fn).delete(o),y(this,nn).delete(o)};y(this,Fr)||!a?(y(this,Fn).add(o),Rn(i,s,!1)):s()}}});Me(this,fa,e=>{y(this,Gt).delete(e);const n=Array.from(y(this,Gt).values());for(const[a,l]of y(this,It))n.includes(a)||(mt(l.effect),y(this,It).delete(a))});this.anchor=e,Te(this,Fr,n)}ensure(e,n){var a=we,l=Ki();if(n&&!y(this,nn).has(e)&&!y(this,It).has(e))if(l){var o=document.createDocumentFragment(),i=Qt();o.append(i),y(this,It).set(e,{effect:Tt(()=>n(i)),fragment:o})}else y(this,nn).set(e,Tt(()=>n(this.anchor)));if(y(this,Gt).set(a,e),l){for(const[s,c]of y(this,nn))s===e?a.unskip_effect(c):a.skip_effect(c);for(const[s,c]of y(this,It))s===e?a.unskip_effect(c.effect):a.skip_effect(c.effect);a.oncommit(y(this,zr)),a.ondiscard(y(this,fa))}else y(this,zr).call(this,a)}}Gt=new WeakMap,nn=new WeakMap,It=new WeakMap,Fn=new WeakMap,Fr=new WeakMap,zr=new WeakMap,fa=new WeakMap;function $(t,e,n=!1){var a=new wl(t),l=n?Mn:0;function o(i,s){a.ensure(i,s)}_r(()=>{var i=!1;e((s,c=0)=>{i=!0,o(c,s)}),i||o(-1,null)},l)}function cr(t,e){return e}function Tc(t,e,n){for(var a=[],l=e.length,o,i=e.length,s=0;s<l;s++){let p=e[s];Rn(p,()=>{if(o){if(o.pending.delete(p),o.done.add(p),o.pending.size===0){var g=t.outrogroups;Za(t,ha(o.done)),g.delete(o),g.size===0&&(t.outrogroups=null)}}else i-=1},!1)}if(i===0){var c=a.length===0&&n!==null&&t.pending.size===0;if(c){var u=n,f=u.parentNode;rc(f),f.append(u),t.items.clear()}Za(t,e,!c)}else o={pending:new Set(e),done:new Set},(t.outrogroups??(t.outrogroups=new Set)).add(o)}function Za(t,e,n=!0){var a;if(t.pending.size>0){a=new Set;for(const i of t.pending.values())for(const s of i)a.add(t.items.get(s).e)}for(var l=0;l<e.length;l++){var o=e[l];if(a!=null&&a.has(o)){o.f|=rn;const i=document.createDocumentFragment();yl(o,i)}else mt(e[l],n)}}var zl;function De(t,e,n,a,l,o=null){var i=t,s=new Map,c=(e&ki)!==0;if(c){var u=t;i=u.appendChild(Qt())}var f=null,p=dl(()=>{var S=n();return sl(S)?S:S==null?[]:ha(S)}),g,_=new Map,m=!0;function x(S){(P.effect.f&Ft)===0&&(P.pending.delete(S),P.fallback=f,Mc(P,g,i,e,a),f!==null&&(g.length===0?(f.f&rn)===0?oa(f):(f.f^=rn,Tr(f,null,i)):Rn(f,()=>{f=null})))}function k(S){P.pending.delete(S)}var M=_r(()=>{g=r(p);for(var S=g.length,O=new Set,E=we,U=Ki(),X=0;X<S;X+=1){var ge=g[X],ae=a(ge,X),N=m?null:s.get(ae);N?(N.v&&or(N.v,ge),N.i&&or(N.i,X),U&&E.unskip_effect(N.e)):(N=Dc(s,m?i:zl??(zl=Qt()),ge,ae,X,l,e,n),m||(N.e.f|=rn),s.set(ae,N)),O.add(ae)}if(S===0&&o&&!f&&(m?f=Tt(()=>o(i)):(f=Tt(()=>o(zl??(zl=Qt()))),f.f|=rn)),S>O.size&&os(),!m)if(_.set(E,O),U){for(const[W,I]of s)O.has(W)||E.skip_effect(I.e);E.oncommit(x),E.ondiscard(k)}else x(E);r(p)}),P={effect:M,items:s,pending:_,outrogroups:null,fallback:f};m=!1}function br(t){for(;t!==null&&(t.f&Yt)===0;)t=t.next;return t}function Mc(t,e,n,a,l){var N,W,I,A,L,ce,ie,oe,te;var o=(a&ms)!==0,i=e.length,s=t.items,c=br(t.effect.first),u,f=null,p,g=[],_=[],m,x,k,M;if(o)for(M=0;M<i;M+=1)m=e[M],x=l(m,M),k=s.get(x).e,(k.f&rn)===0&&((W=(N=k.nodes)==null?void 0:N.a)==null||W.measure(),(p??(p=new Set)).add(k));for(M=0;M<i;M+=1){if(m=e[M],x=l(m,M),k=s.get(x).e,t.outrogroups!==null)for(const ve of t.outrogroups)ve.pending.delete(k),ve.done.delete(k);if((k.f&jt)!==0&&(oa(k),o&&((A=(I=k.nodes)==null?void 0:I.a)==null||A.unfix(),(p??(p=new Set)).delete(k))),(k.f&rn)!==0)if(k.f^=rn,k===c)Tr(k,null,n);else{var P=f?f.next:c;k===t.effect.last&&(t.effect.last=k.prev),k.prev&&(k.prev.next=k.next),k.next&&(k.next.prev=k.prev),yn(t,f,k),yn(t,k,P),Tr(k,P,n),f=k,g=[],_=[],c=br(f.next);continue}if(k!==c){if(u!==void 0&&u.has(k)){if(g.length<_.length){var S=_[0],O;f=S.prev;var E=g[0],U=g[g.length-1];for(O=0;O<g.length;O+=1)Tr(g[O],S,n);for(O=0;O<_.length;O+=1)u.delete(_[O]);yn(t,E.prev,U.next),yn(t,f,E),yn(t,U,S),c=S,f=U,M-=1,g=[],_=[]}else u.delete(k),Tr(k,c,n),yn(t,k.prev,k.next),yn(t,k,f===null?t.effect.first:f.next),yn(t,f,k),f=k;continue}for(g=[],_=[];c!==null&&c!==k;)(u??(u=new Set)).add(c),_.push(c),c=br(c.next);if(c===null)continue}(k.f&rn)===0&&g.push(k),f=k,c=br(k.next)}if(t.outrogroups!==null){for(const ve of t.outrogroups)ve.pending.size===0&&(Za(t,ha(ve.done)),(L=t.outrogroups)==null||L.delete(ve));t.outrogroups.size===0&&(t.outrogroups=null)}if(c!==null||u!==void 0){var X=[];if(u!==void 0)for(k of u)(k.f&jt)===0&&X.push(k);for(;c!==null;)(c.f&jt)===0&&c!==t.fallback&&X.push(c),c=br(c.next);var ge=X.length;if(ge>0){var ae=(a&ki)!==0&&i===0?n:null;if(o){for(M=0;M<ge;M+=1)(ie=(ce=X[M].nodes)==null?void 0:ce.a)==null||ie.measure();for(M=0;M<ge;M+=1)(te=(oe=X[M].nodes)==null?void 0:oe.a)==null||te.fix()}Tc(t,X,ae)}}o&&an(()=>{var ve,B;if(p!==void 0)for(k of p)(B=(ve=k.nodes)==null?void 0:ve.a)==null||B.apply()})}function Dc(t,e,n,a,l,o,i,s){var c=(i&ps)!==0?(i&ys)===0?$s(n,!1,!1):Dn(n):null,u=(i&bs)!==0?Dn(l):null;return{v:c,i:u,e:Tt(()=>(o(e,c??n,u??l,s),()=>{t.delete(a)}))}}function Tr(t,e,n){if(t.nodes)for(var a=t.nodes.start,l=t.nodes.end,o=e&&(e.f&rn)===0?e.nodes.start:n;a!==null;){var i=Ur(a);if(o.before(a),a===l)return;a=i}}function yn(t,e,n){e===null?t.effect.first=n:e.next=n,n===null?t.effect.last=e:n.prev=e}function Ge(t,e,n,a,l){var s;var o=(s=e.$$slots)==null?void 0:s[n],i=!1;o===!0&&(o=e.children,i=!0),o===void 0||o(t,i?()=>a:a)}function fo(t,e,n){var a=new wl(t);_r(()=>{var l=e()??null;a.ensure(l,l&&(o=>n(o,l)))},Mn)}function jc(t,e,n,a,l,o){var i=null,s=t,c=new wl(s,!1);_r(()=>{const u=e()||null;var f=Ms;if(u===null){c.ensure(null,null);return}return c.ensure(u,p=>{if(u){if(i=Gi(u,f),Yn(i,i),a){var g=null,_=i.appendChild(Qt());a(i,_),g==null||g.remove()}je.nodes.end=i,p.before(i)}}),()=>{}},Mn),ga(()=>{})}function ho(t,e){var n;n=document.head.appendChild(Qt());try{_r(()=>{var a=Tt(()=>e(n));a.f|=mi})}finally{}}function Pc(t,e){var n=void 0,a;Zi(()=>{n!==(n=e())&&(a&&(mt(a),a=null),n&&(a=Tt(()=>{hr(()=>n(t))})))})}function _o(t){var e,n,a="";if(typeof t=="string"||typeof t=="number")a+=t;else if(typeof t=="object")if(Array.isArray(t)){var l=t.length;for(e=0;e<l;e++)t[e]&&(n=_o(t[e]))&&(a&&(a+=" "),a+=n)}else for(n in t)t[n]&&(a&&(a+=" "),a+=n);return a}function Ec(){for(var t,e,n=0,a="",l=arguments.length;n<l;n++)(t=arguments[n])&&(e=_o(t))&&(a&&(a+=" "),a+=e);return a}function Cc(t){return typeof t=="object"?Ec(t):t??""}const Rl=[...` 	
\r\f \v\uFEFF`];function Nc(t,e,n){var a=t==null?"":""+t;if(e&&(a=a?a+" "+e:e),n){for(var l of Object.keys(n))if(n[l])a=a?a+" "+l:l;else if(a.length)for(var o=l.length,i=0;(i=a.indexOf(l,i))>=0;){var s=i+o;(i===0||Rl.includes(a[i-1]))&&(s===a.length||Rl.includes(a[s]))?a=(i===0?"":a.substring(0,i))+a.substring(s+1):i=s}}return a===""?null:a}function Ll(t,e=!1){var n=e?" !important;":";",a="";for(var l of Object.keys(t)){var o=t[l];o!=null&&o!==""&&(a+=" "+l+": "+o+n)}return a}function ka(t){return t[0]!=="-"||t[1]!=="-"?t.toLowerCase():t}function qc(t,e){if(e){var n="",a,l;if(Array.isArray(e)?(a=e[0],l=e[1]):a=e,t){t=String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var o=!1,i=0,s=!1,c=[];a&&c.push(...Object.keys(a).map(ka)),l&&c.push(...Object.keys(l).map(ka));var u=0,f=-1;const x=t.length;for(var p=0;p<x;p++){var g=t[p];if(s?g==="/"&&t[p-1]==="*"&&(s=!1):o?o===g&&(o=!1):g==="/"&&t[p+1]==="*"?s=!0:g==='"'||g==="'"?o=g:g==="("?i++:g===")"&&i--,!s&&o===!1&&i===0){if(g===":"&&f===-1)f=p;else if(g===";"||p===x-1){if(f!==-1){var _=ka(t.substring(u,f).trim());if(!c.includes(_)){g!==";"&&p++;var m=t.substring(u,p).trim();n+=" "+m+";"}}u=p+1,f=-1}}}}return a&&(n+=Ll(a)),l&&(n+=Ll(l,!0)),n=n.trim(),n===""?null:n}return t==null?null:String(t)}function Ue(t,e,n,a,l,o){var i=t[Fa];if(i!==n||i===void 0){var s=Nc(n,a,o);s==null?t.removeAttribute("class"):e?t.className=s:t.setAttribute("class",s),t[Fa]=n}else if(o&&l!==o)for(var c in o){var u=!!o[c];(l==null||u!==!!l[c])&&t.classList.toggle(c,u)}return o}function xa(t,e={},n,a){for(var l in n){var o=n[l];e[l]!==o&&(n[l]==null?t.style.removeProperty(l):t.style.setProperty(l,o,a))}}function cn(t,e,n,a){var l=t[za];if(l!==e){var o=qc(e,a);o==null?t.removeAttribute("style"):t.style.cssText=o,t[za]=e}else a&&(Array.isArray(a)?(xa(t,n==null?void 0:n[0],a[0]),xa(t,n==null?void 0:n[1],a[1],"important")):xa(t,n,a));return a}function bt(t,e,n=!1){if(t.multiple){if(e==null)return;if(!sl(e))return Ps();for(var a of t.options)a.selected=e.includes(Er(a));return}for(a of t.options){var l=Er(a);if(tc(l,e)){a.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Mt(t){var e=new MutationObserver(()=>{"__value"in t&&bt(t,t.__value)});e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),ga(()=>{e.disconnect()})}function sa(t,e,n=e){var a=new WeakSet,l=!0;Ni(t,"change",o=>{var i=o?"[selected]":":checked",s;if(t.multiple)s=[].map.call(t.querySelectorAll(i),Er);else{var c=t.querySelector(i)??t.querySelector("option:not([disabled])");s=c&&Er(c)}n(s),t.__value=s,we!==null&&a.add(we)}),hr(()=>{var o=e();if(t===document.activeElement){var i=we;if(a.has(i))return}if(bt(t,o,l),l&&o===void 0){var s=t.querySelector(":checked");s!==null&&(o=Er(s),n(o))}t.__value=o,l=!1}),Mt(t)}function Er(t){return"__value"in t?t.__value:t.value}const mr=Symbol("class"),yr=Symbol("style"),go=Symbol("is custom element"),po=Symbol("is html"),Oc=_a?"input":"INPUT",Ic=_a?"option":"OPTION",Ac=_a?"select":"SELECT",Fc=_a?"progress":"PROGRESS";function Nn(t,e){var n=pa(t);n.value===(n.value=e??void 0)||t.value===e&&(e!==0||t.nodeName!==Fc)||(t.value=e??"")}function Cr(t,e){var n=pa(t);n.checked!==(n.checked=e??void 0)&&(t.checked=e)}function zc(t,e){e?t.hasAttribute("selected")||t.setAttribute("selected",""):t.removeAttribute("selected")}function ue(t,e,n,a){var l=pa(t);l[e]!==(l[e]=n)&&(e==="loading"&&(t[as]=n),n==null?t.removeAttribute(e):typeof n!="string"&&bo(t).includes(e)?t[e]=n:t.setAttribute(e,n))}function Rc(t,e,n,a,l=!1,o=!1){var i=pa(t),s=i[go],c=!i[po],u=e||{},f=t.nodeName===Ic;for(var p in e)p in n||(n[p]=null);n.class?n.class=Cc(n.class):n[mr]&&(n.class=null),n[yr]&&(n.style??(n.style=null));var g=bo(t);if(t.nodeName===Oc&&"type"in n&&("value"in n||"__value"in n)){var _=n.type;(_!==u.type||_===void 0&&t.hasAttribute("type"))&&(u.type=_,ue(t,"type",_))}for(const E in n){let U=n[E];if(f&&E==="value"&&U==null){t.value=t.__value="",u[E]=U;continue}if(E==="class"){var m=t.namespaceURI==="http://www.w3.org/1999/xhtml";Ue(t,m,U,a,e==null?void 0:e[mr],n[mr]),u[E]=U,u[mr]=n[mr];continue}if(E==="style"){cn(t,U,e==null?void 0:e[yr],n[yr]),u[E]=U,u[yr]=n[yr];continue}var x=u[E];if(!(U===x&&!(U===void 0&&t.hasAttribute(E)))){u[E]=U;var k=E[0]+E[1];if(k!=="$$")if(k==="on"){const X={},ge="$$"+E;let ae=E.slice(2);var M=_c(ae);if(fc(ae)&&(ae=ae.slice(0,-7),X.capture=!0),!M&&x){if(U!=null)continue;t.removeEventListener(ae,u[ge],X),u[ge]=null}if(M)H(ae,t,U),ut([ae]);else if(U!=null){let N=function(W){u[E].call(this,W)};var O=N;u[ge]=uo(ae,t,N,X)}}else if(E==="style")ue(t,E,U);else if(E==="autofocus")Jr(t,!!U);else if(!s&&(E==="__value"||E==="value"&&U!=null))t.value=t.__value=U;else if(E==="selected"&&f)zc(t,U);else{var P=E;c||(P=pc(P));var S=P==="defaultValue"||P==="defaultChecked";if(U==null&&!s&&!S)if(i[E]=null,P==="value"||P==="checked"){let X=t;const ge=e===void 0;if(P==="value"){let ae=X.defaultValue;X.removeAttribute(P),X.defaultValue=ae,X.value=X.__value=ge?ae:null}else{let ae=X.defaultChecked;X.removeAttribute(P),X.defaultChecked=ae,X.checked=ge?ae:!1}}else t.removeAttribute(E);else S||g.includes(P)&&(s||typeof U!="string")?(t[P]=U,P in i&&(i[P]=st)):typeof U!="function"&&ue(t,P,U)}}}return u}function Bl(t,e,n=[],a=[],l=[],o,i=!1,s=!1){qi(l,n,a,c=>{var u=void 0,f={},p=t.nodeName===Ac,g=!1;if(Zi(()=>{var m=e(...c.map(r)),x=Rc(t,u,m,o,i,s);g&&p&&"value"in m&&bt(t,m.value);for(let M of Object.getOwnPropertySymbols(f))m[M]||mt(f[M]);for(let M of Object.getOwnPropertySymbols(m)){var k=m[M];M.description===Ds&&(!u||k!==u[M])&&(f[M]&&mt(f[M]),f[M]=Tt(()=>Pc(t,()=>k))),x[M]=k}u=x}),p){var _=t;hr(()=>{bt(_,u.value,!0),Mt(_)})}g=!0})}function pa(t){return t[Gr]??(t[Gr]={[go]:t.nodeName.includes("-"),[po]:t.namespaceURI===Ti})}var Ul=new Map;function bo(t){var e=t.getAttribute("is")||t.nodeName,n=Ul.get(e);if(n)return n;Ul.set(e,n=[]);for(var a,l=t,o=Element.prototype;o!==l;){a=gi(l);for(var i in a)a[i].set&&i!=="innerHTML"&&i!=="textContent"&&i!=="innerText"&&n.push(i);l=cl(l)}return n}function Dt(t,e,n=e){var a=new WeakSet;Ni(t,"input",async l=>{var o=l?t.defaultValue:t.value;if(o=Sa(t)?Ta(o):o,n(o),we!==null&&a.add(we),await dc(),o!==(o=e())){var i=t.selectionStart,s=t.selectionEnd,c=t.value.length;if(t.value=o??"",s!==null){var u=t.value.length;i===s&&s===c&&u>c?(t.selectionStart=u,t.selectionEnd=u):(t.selectionStart=i,t.selectionEnd=Math.min(s,u))}}}),yt(e)==null&&t.value&&(n(Sa(t)?Ta(t.value):t.value),we!==null&&a.add(we)),bl(()=>{var l=e();if(t===document.activeElement){var o=we;if(a.has(o))return}Sa(t)&&l===Ta(t.value)||t.type==="date"&&!l&&!t.value||l!==t.value&&(t.value=l??"")})}function Sa(t){var e=t.type;return e==="number"||e==="range"}function Ta(t){return t===""?null:+t}function Ma(t,e){return t===e||(t==null?void 0:t[on])===e}function Lc(t={},e,n,a){var l=lt.r,o=je;return hr(()=>{var i,s;return bl(()=>{i=s,s=[],yt(()=>{Ma(n(...s),t)||(e(t,...s),i&&Ma(n(...i),t)&&e(null,...i))})}),()=>{let c=o;for(;c!==l&&c.parent!==null&&c.parent.f&Aa;)c=c.parent;const u=()=>{s&&Ma(n(...s),t)&&e(null,...s)},f=c.teardown;c.teardown=()=>{u(),f==null||f()}}}),t}function Bc(t=!1){const e=lt,n=e.l.u;if(!n)return;let a=()=>jn(e.s);if(t){let l=0,o={};const i=ir(()=>{let s=!1;const c=e.s;for(const u in c)c[u]!==o[u]&&(o[u]=c[u],s=!0);return s&&l++,l});a=()=>r(i)}n.b.length&&lc(()=>{Yl(e,a),Oa(n.b)}),ot(()=>{const l=yt(()=>n.m.map(rs));return()=>{for(const o of l)typeof o=="function"&&o()}}),n.a.length&&ot(()=>{Yl(e,a),Oa(n.a)})}function Yl(t,e){if(t.l.s)for(const n of t.l.s)r(n);e()}const Uc={get(t,e){if(!t.exclude.includes(e))return r(t.version),e in t.special?t.special[e]():t.props[e]},set(t,e,n){if(!(e in t.special)){var a=je;try{Wt(t.parent_effect),t.special[e]=At({get[e](){return t.props[e]}},e,xi)}finally{Wt(a)}}return t.special[e](n),ql(t.version),!0},getOwnPropertyDescriptor(t,e){if(!t.exclude.includes(e)&&e in t.props)return{enumerable:!0,configurable:!0,value:t.props[e]}},deleteProperty(t,e){return t.exclude.includes(e)||(t.exclude.push(e),ql(t.version)),!0},has(t,e){return t.exclude.includes(e)?!1:e in t.props},ownKeys(t){return Reflect.ownKeys(t.props).filter(e=>!t.exclude.includes(e))}};function Ke(t,e){return new Proxy({props:t,exclude:e,special:{},version:Dn(0),parent_effect:je},Uc)}const Yc={get(t,e){let n=t.props.length;for(;n--;){let a=t.props[n];if(pr(a)&&(a=a()),typeof a=="object"&&a!==null&&e in a)return a[e]}},set(t,e,n){let a=t.props.length;for(;a--;){let l=t.props[a];pr(l)&&(l=l());const o=Sn(l,e);if(o&&o.set)return o.set(n),!0}return!1},getOwnPropertyDescriptor(t,e){let n=t.props.length;for(;n--;){let a=t.props[n];if(pr(a)&&(a=a()),typeof a=="object"&&a!==null&&e in a){const l=Sn(a,e);return l&&!l.configurable&&(l.configurable=!0),l}}},has(t,e){if(e===on||e===wi)return!1;for(let n of t.props)if(pr(n)&&(n=n()),n!=null&&e in n)return!0;return!1},ownKeys(t){const e=[];for(let n of t.props)if(pr(n)&&(n=n()),!!n){for(const a in n)e.includes(a)||e.push(a);for(const a of Object.getOwnPropertySymbols(n))e.includes(a)||e.push(a)}return e}};function Qe(...t){return new Proxy({props:t},Yc)}function At(t,e,n,a){var O;var l=!dr||(n&ks)!==0,o=(n&xs)!==0,i=(n&Ss)!==0,s=a,c=!0,u=void 0,f=()=>i&&l?(u??(u=ir(a)),r(u)):(c&&(c=!1,s=i?yt(a):a),s);let p;if(o){var g=on in t||wi in t;p=((O=Sn(t,e))==null?void 0:O.set)??(g&&e in t?E=>t[e]=E:void 0)}var _,m=!1;o?[_,m]=As(()=>t[e]):_=t[e],_===void 0&&a!==void 0&&(_=f(),p&&(l&&ds(),p(_)));var x;if(l?x=()=>{var E=t[e];return E===void 0?f():(c=!0,E)}:x=()=>{var E=t[e];return E!==void 0&&(s=void 0),E===void 0?s:E},l&&(n&xi)===0)return x;if(p){var k=t.$$legacy;return(function(E,U){return arguments.length>0?((!l||!U||k||m)&&p(U?x():E),E):x()})}var M=!1,P=((n&ws)!==0?ir:dl)(()=>(M=!1,x()));o&&r(P);var S=je;return(function(E,U){if(arguments.length>0){const X=U?r(P):l&&o?Ce(E):E;return h(P,X),M=!0,s!==void 0&&(s=X),E}return bn&&M||(S.f&Ft)!==0?P.v:r(P)})}function kl(t){lt===null&&ls(),dr&&lt.l!==null?Hc(lt).m.push(t):ot(()=>{const e=yt(t);if(typeof e=="function")return e})}function Hc(t){var e=t.l;return e.u??(e.u={a:[],b:[],m:[]})}const Wc="5";var hi;typeof window<"u"&&((hi=window.__svelte??(window.__svelte={})).v??(hi.v=new Set)).add(Wc);const Vc="/timer";function mo(){const t=window.location.hash,e=t.startsWith("#")?t.slice(1):t;return!e||e==="/"?Vc:e}let xl=R(Ce(mo())),Hl=!1;function Kc(){Hl||typeof window>"u"||(Hl=!0,window.addEventListener("hashchange",()=>{h(xl,mo(),!0)}))}Kc();function Gc(){return r(xl)}function yo(t){if(window.location.hash===`#${t}`){h(xl,t,!0);return}window.location.hash=t}const Xc=[{path:"/timer",label:"番茄钟"},{path:"/tasks",label:"任务"},{path:"/stats",label:"统计"},{path:"/settings",label:"设置"}],wo="pomoflow:settings:v1",Mr={focusMinutes:25,shortBreakMinutes:5,longBreakMinutes:15,longBreakInterval:4,autoChain:!0,soundEnabled:!0,desktopNotificationEnabled:!0};function Jc(){if(typeof localStorage>"u")return{...Mr};const t=localStorage.getItem(wo);if(!t)return{...Mr};try{const e=JSON.parse(t);return{...Mr,...e}}catch{return{...Mr}}}function ko(t){typeof localStorage>"u"||localStorage.setItem(wo,JSON.stringify(t))}let Xn=R(Ce(Jc()));function gn(){return r(Xn)}function Zc(t){h(Xn,{...r(Xn),...t},!0),ko(r(Xn))}function Qc(){h(Xn,{...Mr},!0),ko(r(Xn))}let He=Ce({mode:"focus",secondsLeft:1500,running:!1,sessionId:null,currentTaskId:null,focusCompletedInCycle:0});function xo(){return He}function Jn(t){const e=gn();He.secondsLeft=t==="focus"?e.focusMinutes*60:t==="short_break"?e.shortBreakMinutes*60:e.longBreakMinutes*60}function Wl(t,e){He.running||(He.mode="focus",Jn("focus"),He.currentTaskId=t,He.sessionId=e,He.running=!0)}function Da(){He.running&&(He.running=!1)}function ja(){He.running||He.sessionId===null||(He.running=!0)}function So(t){const e=He.mode;He.running=!1,He.sessionId=null,He.currentTaskId=null;const n=gn();if(e==="focus"&&t){He.focusCompletedInCycle+=1;const l=He.focusCompletedInCycle%n.longBreakInterval===0?"long_break":"short_break";He.mode=l,Jn(l),n.autoChain&&(He.running=!0)}else e==="focus"&&!t?(He.mode="focus",He.focusCompletedInCycle=0,Jn("focus")):(He.mode="focus",Jn("focus"),n.autoChain&&(He.running=!1))}function Vl(t){He.running||(He.mode=t,Jn(t))}function $c(){if(He.running){if(He.secondsLeft>0){He.secondsLeft-=1;return}So(!0)}}function eu(){He.running||Jn(He.mode)}async function Ye(t,e={},n){return window.__TAURI_INTERNALS__.invoke(t,e,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const Sl=t=>Ye("list_tasks",{query:t}),To=t=>Ye("upsert_task",{task:t}),Mo=t=>Ye("complete_task",{id:t}),Do=t=>Ye("reopen_task",{id:t}),jo=()=>Ye("list_projects"),Kl=t=>Ye("upsert_project",{project:t}),tu=t=>Ye("delete_project",{id:t}),Po=()=>Ye("list_tags"),nu=t=>Ye("list_tags_for_task",{taskId:t}),Eo=(t,e)=>Ye("set_tags_for_task",{taskId:t,tagIds:e}),Qa=(t,e,n)=>Ye("start_pomodoro",{taskId:t,projectId:e,duration:n}),ru=(t,e)=>Ye("stop_pomodoro",{sessionId:t,isCompleted:e}),Gl=t=>Ye("get_daily_review",{date:t}),Co=t=>Ye("upsert_daily_review",{review:t}),au=(t,e)=>Ye("list_daily_reviews",{startDate:t,endDate:e}),No=t=>Ye("delete_daily_review",{date:t}),lu=t=>Ye("upsert_weekly_review",{review:t}),qo=(t,e)=>Ye("list_weekly_reviews",{year:t,month:e}),iu=t=>Ye("delete_weekly_review",{weekStart:t}),ou=t=>Ye("get_monthly_review",{yearMonth:t}),su=t=>Ye("upsert_monthly_review",{review:t}),cu=t=>Ye("delete_monthly_review",{yearMonth:t}),Oo=t=>Ye("list_subtasks_for_task",{taskId:t}),$a=t=>Ye("upsert_subtask",{subtask:t}),uu=t=>Ye("delete_subtask",{id:t}),vu=()=>Ye("list_mottos"),du=(t,e)=>Ye("today_completed_minutes",{startMs:t,endMs:e}),Xl=(t,e,n,a)=>Ye("stats_range",{startDate:t,endDate:e,group:n,tzOffsetMin:a});var Jl;(function(t){t.Year="year",t.Month="month",t.TwoWeeks="twoWeeks",t.Week="week",t.Day="day",t.Hour="hour",t.Minute="minute",t.Second="second"})(Jl||(Jl={}));var Zl;(function(t){t[t.None=0]="None",t[t.Min=1]="Min",t[t.Low=2]="Low",t[t.Default=3]="Default",t[t.High=4]="High"})(Zl||(Zl={}));var Ql;(function(t){t[t.Secret=-1]="Secret",t[t.Private=0]="Private",t[t.Public=1]="Public"})(Ql||(Ql={}));async function el(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await Ye("plugin:notification|is_permission_granted")}async function Io(){return await window.Notification.requestPermission()}function Ao(t){typeof t=="string"?new window.Notification(t):new window.Notification(t.title,t)}var fu=C('<textarea class="review-textarea svelte-1na66lg"></textarea>');function ca(t,e){rt(e,!0);let n=At(e,"rows",3,2),a=R(Ce(yt(()=>e.value??"")));ot(()=>{const i=e.value??"";yt(()=>{i!==r(a)&&h(a,i,!0)})});function l(){const i=r(a).trim();i===""?e.value&&e.onDelete&&e.onDelete():i!==(e.value??"")&&e.onSave(i)}var o=fu();K(()=>{ue(o,"placeholder",e.placeholder??"写下今天的复盘..."),ue(o,"aria-label",e.ariaLabel??e.placeholder??"复盘内容"),ue(o,"rows",n())}),pt("blur",o,l),Dt(o,()=>r(a),i=>h(a,i)),b(t,o),at()}qs();/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const hu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const _u=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const $l=(...t)=>t.filter((e,n,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===n).join(" ").trim();var gu=Hn("<svg><!><!></svg>");function $e(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]),a=Ke(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);rt(e,!1);let l=At(e,"name",8,void 0),o=At(e,"color",8,"currentColor"),i=At(e,"size",8,24),s=At(e,"strokeWidth",8,2),c=At(e,"absoluteStrokeWidth",8,!1),u=At(e,"iconNode",24,()=>[]);Bc();var f=gu();Bl(f,(_,m,x)=>({...hu,..._,...a,width:i(),height:i(),stroke:o(),"stroke-width":m,class:x}),[()=>_u(a)?void 0:{"aria-hidden":"true"},()=>(jn(c()),jn(s()),jn(i()),yt(()=>c()?Number(s())*24/Number(i()):s())),()=>(jn($l),jn(l()),jn(n),yt(()=>$l("lucide-icon","lucide",l()?`lucide-${l()}`:"",n.class)))]);var p=v(f);De(p,1,u,cr,(_,m)=>{var x=G(()=>bi(r(m),2));let k=()=>r(x)[0],M=()=>r(x)[1];var P=Le(),S=Pe(P);jc(S,k,!0,(O,E)=>{Bl(O,()=>({...M()}))}),b(_,P)});var g=d(p);Ge(g,e,"default",{}),b(t,f),at()}function ei(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];$e(t,Qe({name:"award"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function pu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];$e(t,Qe({name:"calendar-check"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Fo(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];$e(t,Qe({name:"calendar-days"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function bu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];$e(t,Qe({name:"calendar-range"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function zo(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];$e(t,Qe({name:"chart-column"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Ro(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M20 6 9 17l-5-5"}]];$e(t,Qe({name:"check"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function ua(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m6 9 6 6 6-6"}]];$e(t,Qe({name:"chevron-down"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function mu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m15 18-6-6 6-6"}]];$e(t,Qe({name:"chevron-left"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function qr(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m9 18 6-6-6-6"}]];$e(t,Qe({name:"chevron-right"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function tl(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];$e(t,Qe({name:"circle-check"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function nl(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];$e(t,Qe({name:"clock"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function yu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];$e(t,Qe({name:"download"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function wu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];$e(t,Qe({name:"ellipsis-vertical"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function ku(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];$e(t,Qe({name:"flame"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function xu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];$e(t,Qe({name:"folder"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Su(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];$e(t,Qe({name:"pencil"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Lo(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];$e(t,Qe({name:"play"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function rl(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];$e(t,Qe({name:"plus"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Tu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];$e(t,Qe({name:"quote"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Mu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];$e(t,Qe({name:"refresh-cw"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Du(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];$e(t,Qe({name:"search"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function ju(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];$e(t,Qe({name:"sun"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Pu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];$e(t,Qe({name:"sunrise"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function al(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];$e(t,Qe({name:"target"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Eu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];$e(t,Qe({name:"trash-2"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Pa(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];$e(t,Qe({name:"trending-up"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}function Cu(t,e){const n=Ke(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];$e(t,Qe({name:"x"},()=>n,{get iconNode(){return a},children:(l,o)=>{var i=Le(),s=Pe(i);Ge(s,e,"default",{}),b(l,i)},$$slots:{default:!0}}))}const ti=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function ni(){return ti[Math.floor(Math.random()*ti.length)]}var Nu=C('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985" aria-label="换一条" title="换一条"><!></button></div></div>');function qu(t,e){rt(e,!0);let n=R(Ce([])),a=R(Ce(new Set)),l=R(null);async function o(){try{h(n,await vu(),!0)}catch{h(n,[],!0)}}kl(()=>{o()}),ot(()=>{var f;if(!r(l))if(r(n).length>0){const p=r(n)[0];h(l,{text:p.text,author:(f=p.author)!=null&&f.trim()?p.author:"佚名"},!0);const g=new Set(r(a));g.add(p.id),h(a,g,!0)}else h(l,ni(),!0)});function i(){var f;if(r(n).length>0){let p=r(n).filter(m=>!r(a).has(m.id));p.length===0&&(h(a,new Set,!0),p=r(n));const g=p[0];h(l,{text:g.text,author:(f=g.author)!=null&&f.trim()?g.author:"佚名"},!0);const _=new Set(r(a));_.add(g.id),h(a,_,!0)}else h(l,ni(),!0)}var s=Le(),c=Pe(s);{var u=f=>{var p=Nu(),g=v(p),_=v(g),m=v(_);Tu(m,{size:20});var x=d(_,2),k=v(x),M=v(k),P=d(k,2),S=v(P),O=d(x,2),E=v(O);Mu(E,{size:14}),K(()=>{le(M,r(l).text),le(S,`—— ${r(l).author??""}`)}),H("click",O,i),b(f,p)};$(c,f=>{r(l)&&f(u)})}b(t,s),at()}ut(["click"]);var ri=C("<option> </option>"),ai=C('<button type="button"> </button>'),Ou=C('<button type="button" class="clear svelte-13vcwbh">清除筛选</button>'),Iu=C('<div class="empty svelte-13vcwbh">暂无任务</div>'),Au=C('<button type="button" class="expander svelte-13vcwbh"><!></button>'),Fu=C('<span class="expander-placeholder svelte-13vcwbh"></span>'),Ea=C('<span class="meta-item svelte-13vcwbh"> </span>'),zu=C('<button type="button" class="start svelte-13vcwbh" aria-label="开始专注" title="开始专注"><!></button>'),Ru=C('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),Lu=C('<div class="subs svelte-13vcwbh"></div>'),Bu=C('<div class="task-card svelte-13vcwbh"><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),Uu=C('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh">今日专注</h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh">分钟</span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh">任务列表</h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project">项目</label> <select id="timer-filter-project" class="svelte-13vcwbh"><option>全部</option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag">标签</label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option>全部</option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh">优先级</span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh">日期</span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function Yu(t,e){rt(e,!0);const n={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let a=R(Ce(new Set));function l(T){const j=new Set(r(a));j.has(T)?j.delete(T):j.add(T),h(a,j,!0)}function o(){e.onFilterChange({project:null,tag:null,priority:null,date:null})}const i=G(()=>e.filter.tag!==null||e.filter.project!==null||e.filter.priority!==null||e.filter.date!==null),s=["high","medium","low"],c={high:"高",medium:"中",low:"低"},u=["today","tomorrow","this_week"],f={today:"今日",tomorrow:"明日",this_week:"本周"};function p(T){var j;return T?((j=e.projects.find(ee=>ee.id===T))==null?void 0:j.name)??"":""}var g=Uu(),_=v(g),m=v(_),x=d(v(m),2),k=v(x),M=v(k),P=d(m,2),S=d(v(P),2),O=v(S),E=d(v(O),2),U=v(E);U.value=U.__value="";var X=d(U);De(X,17,()=>e.projects,T=>T.id,(T,j)=>{var ee=ri(),se=v(ee),pe={};K(()=>{le(se,r(j).name),pe!==(pe=r(j).id)&&(ee.value=(ee.__value=r(j).id)??"")}),b(T,ee)});var ge;Mt(E);var ae=d(O,2),N=d(v(ae),2),W=v(N);W.value=W.__value="";var I=d(W);De(I,17,()=>e.tags,T=>T.id,(T,j)=>{var ee=ri(),se=v(ee),pe={};K(()=>{le(se,r(j).name),pe!==(pe=r(j).id)&&(ee.value=(ee.__value=r(j).id)??"")}),b(T,ee)});var A;Mt(N);var L=d(S,2),ce=d(v(L),2);De(ce,20,()=>s,T=>T,(T,j)=>{var ee=ai();let se;var pe=v(ee);K(()=>{se=Ue(ee,1,"opt svelte-13vcwbh",null,se,{active:e.filter.priority===j}),le(pe,c[j])}),H("click",ee,()=>e.onFilterChange({priority:e.filter.priority===j?null:j})),b(T,ee)});var ie=d(ce,4);De(ie,20,()=>u,T=>T,(T,j)=>{var ee=ai();let se;var pe=v(ee);K(()=>{se=Ue(ee,1,"opt svelte-13vcwbh",null,se,{active:e.filter.date===j}),le(pe,f[j])}),H("click",ee,()=>e.onFilterChange({date:e.filter.date===j?null:j})),b(T,ee)});var oe=d(L,2);{var te=T=>{var j=Ou();H("click",j,o),b(T,j)};$(oe,T=>{r(i)&&T(te)})}var ve=d(_,2),B=v(ve);{var Z=T=>{var j=Iu();b(T,j)};$(B,T=>{e.tasks.length===0&&T(Z)})}var w=d(B,2);De(w,17,()=>e.tasks,T=>T.id,(T,j)=>{const ee=G(()=>r(j).status==="completed"),se=G(()=>{var D;return(((D=r(j).subtasks)==null?void 0:D.length)??0)>0}),pe=G(()=>r(a).has(r(j).id)),de=G(()=>r(se)?(r(j).subtasks??[]).filter(D=>D.is_completed).length:0),Ee=G(()=>p(r(j).project_id));var Ne=Bu(),me=v(Ne),ze=v(me);{var xe=D=>{var F=Au(),z=v(F);{var re=Ze=>{ua(Ze,{size:14})},Ie=Ze=>{qr(Ze,{size:14})};$(z,Ze=>{r(pe)?Ze(re):Ze(Ie,-1)})}K(()=>ue(F,"aria-label",r(pe)?"折叠子任务":"展开子任务")),H("click",F,()=>l(r(j).id)),b(D,F)},Oe=D=>{var F=Fu();b(D,F)};$(ze,D=>{r(se)?D(xe):D(Oe,-1)})}var Xe=d(ze,2),q=d(Xe,2),Q=v(q);let he;var ne=v(Q),ke=d(Q,2),be=v(ke),fe=v(be),ye=d(be,2);{var V=D=>{var F=Ea(),z=v(F);K(()=>{var re;return le(z,`· ${r(de)??""}/${((re=r(j).subtasks)==null?void 0:re.length)??0??""}`)}),b(D,F)};$(ye,D=>{r(se)&&D(V)})}var J=d(ye,2);{var _e=D=>{var F=Ea(),z=v(F);K(()=>le(z,r(Ee))),b(D,F)};$(J,D=>{r(Ee)&&D(_e)})}var qe=d(J,2);{var Fe=D=>{var F=Ea(),z=v(F);K(re=>le(z,re),[()=>r(j).due_date.slice(0,10)]),b(D,F)};$(qe,D=>{r(j).due_date&&D(Fe)})}var et=d(q,2);{var We=D=>{var F=zu(),z=v(F);Lo(z,{size:10,color:"#fff",fill:"#fff"}),H("click",F,()=>e.onStartTask(r(j))),b(D,F)};$(et,D=>{r(ee)||D(We)})}var Je=d(me,2);{var dt=D=>{var F=Lu();De(F,21,()=>r(j).subtasks??[],z=>z.id,(z,re)=>{var Ie=Ru();let Ze;var tt=v(Ie),kt=d(tt,2),mn=v(kt);K(()=>{Ze=Ue(Ie,1,"sub-row svelte-13vcwbh",null,Ze,{done:r(re).is_completed}),Cr(tt,r(re).is_completed),le(mn,r(re).title)}),H("change",tt,Hr=>e.onToggleSubtask(r(re).id,Hr.currentTarget.checked)),b(z,Ie)}),b(D,F)};$(Je,D=>{r(se)&&r(pe)&&D(dt)})}K(()=>{cn(Xe,`background-color: ${n[r(j).priority||"none"]??n.none??""}`),he=Ue(Q,1,"title svelte-13vcwbh",null,he,{done:r(ee)}),le(ne,r(j).title),le(fe,`${r(j).completed_pomodoros??0??""}/${r(j).estimated_pomodoros??0??""} 番茄`)}),b(T,Ne)}),K(()=>{le(M,e.todayMinutes),ge!==(ge=e.filter.project??"")&&(E.value=(E.__value=e.filter.project??"")??"",bt(E,e.filter.project??"")),A!==(A=e.filter.tag??"")&&(N.value=(N.__value=e.filter.tag??"")??"",bt(N,e.filter.tag??""))}),H("change",E,T=>e.onFilterChange({project:T.currentTarget.value||null})),H("change",N,T=>e.onFilterChange({tag:T.currentTarget.value||null})),b(t,g),at()}ut(["change","click"]);var Hu=C('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt">专注完成</h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button">确定</button></div></div>');function Wu(t,e){rt(e,!0);function n(s){s.target===s.currentTarget&&e.onClose()}function a(s){s.key==="Escape"&&e.onClose()}var l=Le();pt("keydown",Va,function(...s){var c;(c=e.open?a:void 0)==null||c.apply(this,s)});var o=Pe(l);{var i=s=>{var c=Hu(),u=v(c),f=d(v(u),4),p=v(f),g=d(f,2);K(()=>le(p,e.message)),H("click",c,n),H("click",g,function(..._){var m;(m=e.onClose)==null||m.apply(this,_)}),b(s,c)};$(o,s=>{e.open&&s(i)})}b(t,l),at()}ut(["click"]);var Vu=C('<div class="task-title svelte-17qnxlg"> </div>'),Ku=C('<option class="svelte-17qnxlg"> </option>'),Gu=C('<div class="task-picker svelte-17qnxlg"><label for="task-select" class="svelte-17qnxlg">本次专注:</label> <select id="task-select" class="svelte-17qnxlg"><option class="svelte-17qnxlg">-- 选择任务 --</option><!></select></div>'),Xu=C('<div class="error svelte-17qnxlg" role="alert"> </div>'),Ju=C('<button class="btn primary svelte-17qnxlg">暂停</button> <button class="btn danger svelte-17qnxlg">停止</button>',1),Zu=C('<button class="btn primary svelte-17qnxlg">继续</button> <button class="btn danger svelte-17qnxlg">停止</button>',1),Qu=C('<button class="btn primary svelte-17qnxlg"> </button>'),$u=C('<div class="layout svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist" aria-label="计时器模式"><button role="tab">专注</button> <button role="tab">短休息</button> <button role="tab">长休息</button></div> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-label svelte-17qnxlg"> </div> <!></div></div> <!> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> 今日已完成 <b class="svelte-17qnxlg"> </b> 个番茄 <!></div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg">今日日复盘</div> <!></div> <!></div></div> <!> <!></div>');function li(t,e){rt(e,!0);let n=R(Ce([])),a=R(Ce([])),l=R(Ce([])),o=R(""),i=R(null),s=R(0),c=R(null),u=R(!1),f=R(Ce({project:null,tag:null,priority:null,date:null})),p=R(!1),g=R("");const _=G(xo),m=G(()=>{const Y=gn();return r(_).mode==="focus"?Y.focusMinutes*60:r(_).mode==="short_break"?Y.shortBreakMinutes*60:Y.longBreakMinutes*60}),x=G(()=>r(m)>0?1-r(_).secondsLeft/r(m):0),k=G(()=>Math.floor(r(_).secondsLeft/60)),M=G(()=>r(_).secondsLeft%60),P=G(()=>`${String(r(k)).padStart(2,"0")}:${String(r(M)).padStart(2,"0")}`),S=G(()=>r(l).find(Y=>Y.id===r(o))??null),O=G(()=>!r(_).running&&r(_).sessionId===null&&r(_).mode==="focus"&&r(o)!==""&&!r(u)),E=G(()=>r(_).mode==="focus"),U=G(()=>r(_).mode==="focus"?"专注":r(_).mode==="short_break"?"短休息":"长休息");function X(){const Y=new Date,Se=new Date(Y.getFullYear(),Y.getMonth(),Y.getDate(),0,0,0,0),Re=new Date(Y.getFullYear(),Y.getMonth(),Y.getDate()+1,0,0,0,0);return{startMs:Se.getTime(),endMs:Re.getTime()}}function ge(){const Y=new Date,Se=new Date(Y.getFullYear(),Y.getMonth(),1,0,0,0,0),wt=new Date(Y.getFullYear(),Y.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:Se.getTime(),monthEndMs:wt}}function ae(){const Y=new Date;return`${Y.getFullYear()}-${String(Y.getMonth()+1).padStart(2,"0")}-${String(Y.getDate()).padStart(2,"0")}`}let N=!1;ot(()=>{N&&!r(_).running&&r(_).secondsLeft===0&&W(),N=r(_).running});function W(){r(S)?h(g,`太棒了!休息一下吧 —— ${r(S).title}`):h(g,"太棒了!休息一下吧"),h(p,!0),oe(),gn().desktopNotificationEnabled&&I("专注完成",r(g))}async function I(Y,Se){try{let Re=await el();if(Re||(Re=await Io()==="granted"),!Re)return;Ao({title:Y,body:Se})}catch(Re){console.warn("notification failed",Re)}}async function A(){try{h(n,await jo(),!0)}catch(Y){console.warn("refresh projects",Y)}}async function L(){try{h(a,await Po(),!0)}catch(Y){console.warn("refresh tags",Y)}}async function ce(){try{const Y=ge();h(l,await Sl({status:null,month_start_ms:Y.monthStartMs,month_end_ms:Y.monthEndMs,project_id:r(f).project,tag_id:r(f).tag,priority:r(f).priority,date:r(f).date,limit:null}),!0)}catch(Y){console.warn("refresh tasks",Y)}}async function ie(){try{const Y=await Gl(ae());h(i,(Y==null?void 0:Y.content)??null,!0)}catch(Y){console.warn("refresh review",Y)}}async function oe(){try{const Y=X();h(s,await du(Y.startMs,Y.endMs),!0)}catch(Y){console.warn("refresh minutes",Y)}}ot(()=>{r(f),ce()}),kl(async()=>{await Promise.all([A(),L(),ce(),ie(),oe()])});async function te(){if(r(O)){h(u,!0),h(c,null);try{const Y=gn(),Se=await Qa(r(o),null,Y.focusMinutes);Wl(r(o),Se.id)}catch(Y){h(c,String(Y),!0)}finally{h(u,!1)}}}async function ve(Y){if(!r(_).sessionId)return;const Se=r(_).sessionId;So(Y);try{await ru(Se,Y)}catch(Re){h(c,String(Re),!0)}}function B(Y){r(_).running||Vl(Y)}async function Z(Y){r(_).running&&await ve(!1),h(o,Y.id,!0),r(_).mode!=="focus"&&Vl("focus");try{const Se=await Qa(Y.id,Y.project_id??null,Y.pomodoro_duration??gn().focusMinutes);Wl(Y.id,Se.id)}catch(Se){h(c,String(Se),!0)}}async function w(Y,Se){try{const Re=await Promise.all(r(l).map(un=>Oo(un.id)));let wt=null;for(const un of Re){const en=un.find(gr=>gr.id===Y);if(en){wt=en;break}}if(!wt)return;await $a({...wt,is_completed:Se}),await ce(),await oe()}catch(Re){console.warn("toggle subtask",Re)}}async function T(Y){try{const Se=ae(),Re=await Gl(Se),wt=Re?{...Re,content:Y}:{id:crypto.randomUUID(),date:Se,content:Y,updated_at:new Date().toISOString()};await Co(wt),h(i,Y,!0)}catch(Se){console.warn("save review",Se)}}async function j(){try{await No(ae()),h(i,null)}catch(Y){console.warn("delete review",Y)}}function ee(){h(p,!1)}const se=280,pe=12,de=(se-pe)/2,Ee=2*Math.PI*de,Ne=G(()=>Ee*(1-r(x)));var me=$u(),ze=v(me),xe=v(ze),Oe=v(xe),Xe=v(Oe);let q;var Q=d(Xe,2);let he;var ne=d(Q,2);let ke;var be=d(Oe,2),fe=v(be);ue(fe,"width",se),ue(fe,"height",se),ue(fe,"viewBox","0 0 280 280");var ye=v(fe);ue(ye,"cx",se/2),ue(ye,"cy",se/2),ue(ye,"r",de),ue(ye,"stroke-width",pe);var V=d(ye);ue(V,"cx",se/2),ue(V,"cy",se/2),ue(V,"r",de),ue(V,"stroke-width",pe),ue(V,"stroke-dasharray",Ee),ue(V,"transform","rotate(-90 140 140)");var J=d(fe,2),_e=v(J),qe=v(_e),Fe=d(_e,2),et=v(Fe),We=d(Fe,2);{var Je=Y=>{var Se=Vu(),Re=v(Se);K(()=>{ue(Se,"title",r(S).title),le(Re,r(S).title)}),b(Y,Se)};$(We,Y=>{r(S)&&Y(Je)})}var dt=d(be,2);{var D=Y=>{var Se=Gu(),Re=d(v(Se),2),wt=v(Re);wt.value=wt.__value="";var un=d(wt);De(un,17,()=>r(l).filter(en=>en.status==="active"),en=>en.id,(en,gr)=>{var Wr=Ku(),Xo=v(Wr),Dl={};K(()=>{le(Xo,r(gr).title),Dl!==(Dl=r(gr).id)&&(Wr.value=(Wr.__value=r(gr).id)??"")}),b(en,Wr)}),K(()=>Re.disabled=r(_).running),sa(Re,()=>r(o),en=>h(o,en)),b(Y,Se)};$(dt,Y=>{r(E)&&Y(D)})}var F=d(dt,2);{var z=Y=>{var Se=Xu(),Re=v(Se);K(()=>le(Re,`⚠ ${r(c)??""}`)),b(Y,Se)};$(F,Y=>{r(c)&&Y(z)})}var re=d(F,2),Ie=v(re);{var Ze=Y=>{var Se=Ju(),Re=Pe(Se),wt=d(Re,2);H("click",Re,function(...un){Da==null||Da.apply(this,un)}),H("click",wt,()=>ve(!1)),b(Y,Se)},tt=Y=>{var Se=Zu(),Re=Pe(Se),wt=d(Re,2);H("click",Re,function(...un){ja==null||ja.apply(this,un)}),H("click",wt,()=>ve(!1)),b(Y,Se)},kt=Y=>{var Se=Qu(),Re=v(Se);K(()=>{Se.disabled=!r(O),le(Re,r(u)?"启动中...":"开始")}),H("click",Se,te),b(Y,Se)};$(Ie,Y=>{r(_).running?Y(Ze):r(_).sessionId?Y(tt,1):Y(kt,-1)})}var mn=d(re,2),Hr=d(v(mn),2),Yo=v(Hr),Ho=d(Hr,2);{var Wo=Y=>{var Se=Ja();K(Re=>le(Se,`(每 ${Re??""} 个 → 长休息)`),[()=>gn().longBreakInterval]),b(Y,Se)};$(Ho,Y=>{r(E)&&Y(Wo)})}var Tl=d(mn,2),Vo=d(v(Tl),2);ca(Vo,{get value(){return r(i)},placeholder:"写下今天的复盘...",rows:2,onSave:T,onDelete:j});var Ko=d(Tl,2);qu(Ko,{});var Ml=d(ze,2);Yu(Ml,{get todayMinutes(){return r(s)},get projects(){return r(n)},get tags(){return r(a)},get tasks(){return r(l)},get filter(){return r(f)},onFilterChange:Y=>h(f,{...r(f),...Y},!0),onStartTask:Z,onToggleSubtask:w});var Go=d(Ml,2);Wu(Go,{get open(){return r(p)},get message(){return r(g)},onClose:ee}),K(()=>{q=Ue(Xe,1,"mode-tab svelte-17qnxlg",null,q,{active:r(_).mode==="focus"}),Xe.disabled=r(_).running,ue(Xe,"aria-selected",r(_).mode==="focus"),he=Ue(Q,1,"mode-tab svelte-17qnxlg",null,he,{active:r(_).mode==="short_break"}),Q.disabled=r(_).running,ue(Q,"aria-selected",r(_).mode==="short_break"),ke=Ue(ne,1,"mode-tab svelte-17qnxlg",null,ke,{active:r(_).mode==="long_break"}),ne.disabled=r(_).running,ue(ne,"aria-selected",r(_).mode==="long_break"),ue(V,"stroke-dashoffset",r(Ne)),le(qe,r(P)),le(et,r(U)),le(Yo,r(_).focusCompletedInCycle)}),H("click",Xe,()=>B("focus")),H("click",Q,()=>B("short_break")),H("click",ne,()=>B("long_break")),b(t,me),at()}ut(["click"]);//! 截止时间（due_date）相关工具。
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
function ll(t){return!!t&&t.includes("T")}function ht(t){return(t||"").slice(0,10)}function ln(){const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function ev(){const t=new Date;return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function ii(t){return`${ht(t)||ln()}T${ev()}`}function ta(){const t=new Date;return t.setDate(t.getDate()+1),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}var tv=C('<span class="filter-stats svelte-qbpxhc"> </span>'),nv=C('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <!></button>'),rv=C('<button type="button" class="add-root svelte-qbpxhc" aria-label="新增根清单" title="新增清单"><!></button>'),av=C('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" placeholder="清单名称..." class="add-input svelte-qbpxhc"/></div>'),lv=C('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),iv=C('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),ov=C('<span class="expand-spacer svelte-qbpxhc"></span>'),sv=C('<button type="button" class="more-btn svelte-qbpxhc" aria-label="更多操作"><!></button>'),cv=C('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),uv=C('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),vv=C('<button type="button" class="ctx-item svelte-qbpxhc"><!> 新增子清单</button>'),dv=C('<button type="button" class="ctx-item svelte-qbpxhc"><!> 重命名</button>'),fv=C('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> 删除</button>'),hv=C('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),_v=C('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),gv=C('<div class="empty-hint svelte-qbpxhc">还没有清单,点 + 新建</div>'),pv=C('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),bv=C('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" placeholder="搜索任务标题..." class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> 清单</button> <!></div> <!></div></aside>');function mv(t,e){rt(e,!0);let n=At(e,"search",3,""),a=R(!0),l=R(Ce(new Set)),o=R(null),i=R(null),s=R(""),c=R(null),u=R("");function f(B){const Z=B.getDay(),w=Z===0?-6:1-Z,T=new Date(B);return T.setDate(T.getDate()+w),T.setHours(0,0,0,0),T}function p(B){const Z=f(B),w=new Date(Z);return w.setDate(w.getDate()+6),w.setHours(23,59,59,999),w}function g(B,Z){if(Z==="journal")return{timeStr:"",count:0};const w=ln(),T=ta(),j=f(new Date),ee=p(new Date);let se=B;Z==="today"&&(se=B.filter(me=>ht(me.due_date)===w)),Z==="tomorrow"&&(se=B.filter(me=>ht(me.due_date)===T)),Z==="week"&&(se=B.filter(me=>{if(!me.due_date)return!1;const ze=new Date(me.due_date);return ze>=j&&ze<=ee})),Z==="planned"&&(se=B.filter(me=>me.due_date!==null&&me.due_date!==void 0)),Z==="completed"&&(se=B.filter(me=>me.status==="completed"));const pe=se.reduce((me,ze)=>me+(ze.estimated_pomodoros||0)*(ze.pomodoro_duration||25),0),de=Math.floor(pe/60),Ee=pe%60;return{timeStr:de>0?`${de}h ${Ee}m`:`${Ee}m`,count:se.length}}function _(B){const Z=new Map,w=[];for(const j of B)Z.set(j.id,{...j,children:[],depth:0});for(const j of B){const ee=Z.get(j.id);ee&&(j.parent_id&&Z.has(j.parent_id)?Z.get(j.parent_id).children.push(ee):w.push(ee))}const T=(j,ee)=>{for(const se of j)se.depth=ee,T(se.children,ee+1)};return T(w,0),w}function m(B,Z){const w=[];for(const T of B)w.push(T),Z.has(T.id)&&T.children.length>0&&w.push(...m(T.children,Z));return w}const x=G(()=>_(e.projects)),k=G(()=>m(r(x),r(l))),M=[{key:"today",icon:ju,label:"今天"},{key:"tomorrow",icon:Pu,label:"明天"},{key:"week",icon:Fo,label:"本周"},{key:"planned",icon:pu,label:"已计划"},{key:"completed",icon:tl,label:"已完成"},{key:"journal",icon:bu,label:"手账"}],P=G(()=>e.selectedProject===null?e.filter:"");function S(B){const Z=new Set(r(l));Z.has(B)?Z.delete(B):Z.add(B),h(l,Z,!0)}function O(B){e.onSetFilter(B),e.onSelectProject(null)}var E=bv(),U=v(E),X=v(U);Du(X,{size:14,class:"search-icon"});var ge=d(X,2),ae=d(U,2);De(ae,21,()=>M,B=>B.key,(B,Z)=>{const w=G(()=>g(e.tasks,r(Z).key)),T=G(()=>r(P)===r(Z).key);var j=nv();let ee;var se=v(j),pe=v(se);fo(pe,()=>r(Z).icon,(me,ze)=>{ze(me,{size:16})});var de=d(pe),Ee=d(se,2);{var Ne=me=>{var ze=tv(),xe=v(ze);K(()=>le(xe,`${r(w).timeStr??""} ${r(w).count??""}`)),b(me,ze)};$(Ee,me=>{r(w).count>0&&me(Ne)})}K(()=>{ee=Ue(j,1,"filter-btn svelte-qbpxhc",null,ee,{active:r(T)}),le(de,` ${r(Z).label??""}`)}),H("click",j,()=>O(r(Z).key)),b(B,j)});var N=d(ae,2),W=v(N),I=v(W),A=v(I);{var L=B=>{ua(B,{size:14})},ce=B=>{qr(B,{size:14})};$(A,B=>{r(a)?B(L):B(ce,-1)})}var ie=d(I,2);{var oe=B=>{var Z=rv(),w=v(Z);rl(w,{size:14}),H("click",Z,()=>{h(c,"root"),h(u,"")}),b(B,Z)};$(ie,B=>{e.onCreateProject&&B(oe)})}var te=d(W,2);{var ve=B=>{var Z=pv(),w=v(Z);{var T=pe=>{var de=av(),Ee=v(de);Jr(Ee,!0),H("keydown",Ee,Ne=>{if(Ne.key==="Enter"){const me=r(u).trim();me&&e.onCreateProject&&e.onCreateProject(me,null),h(c,null),h(u,"")}Ne.key==="Escape"&&(h(c,null),h(u,""))}),pt("blur",Ee,()=>{const Ne=r(u).trim();Ne&&e.onCreateProject&&e.onCreateProject(Ne,null),h(c,null),h(u,"")}),Dt(Ee,()=>r(u),Ne=>h(u,Ne)),b(pe,de)};$(w,pe=>{r(c)==="root"&&e.onCreateProject&&pe(T)})}var j=d(w,2);De(j,17,()=>r(k),pe=>pe.id,(pe,de)=>{const Ee=G(()=>e.selectedProject===r(de).id),Ne=G(()=>r(o)===r(de).id),me=G(()=>r(i)===r(de).id),ze=G(()=>r(de).children.length>0),xe=G(()=>r(l).has(r(de).id));var Oe=_v(),Xe=v(Oe);{var q=fe=>{var ye=lv(),V=v(ye);Jr(V,!0),H("keydown",V,J=>{if(J.key==="Enter"){const _e=r(s).trim();_e&&e.onUpdateProject&&e.onUpdateProject(r(de).id,_e),h(i,null),h(s,"")}J.key==="Escape"&&(h(i,null),h(s,""))}),pt("blur",V,()=>{const J=r(s).trim();J&&e.onUpdateProject&&e.onUpdateProject(r(de).id,J),h(i,null),h(s,"")}),Dt(V,()=>r(s),J=>h(s,J)),b(fe,ye)},Q=fe=>{var ye=cv();let V;var J=v(ye),_e=v(J);{var qe=F=>{var z=iv(),re=v(z);{var Ie=tt=>{ua(tt,{size:12})},Ze=tt=>{qr(tt,{size:12})};$(re,tt=>{r(xe)?tt(Ie):tt(Ze,-1)})}K(()=>ue(z,"aria-label",r(xe)?"收起":"展开")),H("click",z,tt=>{tt.stopPropagation(),S(r(de).id)}),b(F,z)},Fe=F=>{var z=ov();b(F,z)};$(_e,F=>{r(ze)?F(qe):F(Fe,-1)})}var et=d(_e,2);{let F=G(()=>r(de).color||"var(--color-accent)");xu(et,{size:14,get color(){return r(F)}})}var We=d(et,2),Je=v(We),dt=d(J,2);{var D=F=>{var z=sv(),re=v(z);wu(re,{size:14}),H("click",z,Ie=>{Ie.stopPropagation(),h(o,r(Ne)?null:r(de).id,!0)}),b(F,z)};$(dt,F=>{(e.onUpdateProject||e.onDeleteProject||e.onCreateProject&&r(de).depth<2)&&F(D)})}K(()=>{V=Ue(ye,1,"node-row svelte-qbpxhc",null,V,{active:r(Ee)}),le(Je,r(de).name)}),H("click",J,()=>{e.onSelectProject(r(de).id),e.onSetFilter("")}),H("keydown",J,F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),e.onSelectProject(r(de).id),e.onSetFilter(""))}),b(fe,ye)};$(Xe,fe=>{r(me)?fe(q):fe(Q,-1)})}var he=d(Xe,2);{var ne=fe=>{var ye=uv(),V=v(ye);Jr(V,!0),K(()=>{cn(ye,`padding-left: ${(r(de).depth+1)*12+12}px;`),ue(V,"placeholder",r(de).depth===0?"子清单名称...":"孙清单名称...")}),H("keydown",V,J=>{if(J.key==="Enter"){const _e=r(u).trim();_e&&e.onCreateProject&&e.onCreateProject(_e,r(de).id),h(c,null),h(u,"");const qe=new Set(r(l));qe.add(r(de).id),h(l,qe,!0)}J.key==="Escape"&&(h(c,null),h(u,""))}),pt("blur",V,()=>{const J=r(u).trim();J&&e.onCreateProject&&e.onCreateProject(J,r(de).id),h(c,null),h(u,"");const _e=new Set(r(l));_e.add(r(de).id),h(l,_e,!0)}),Dt(V,()=>r(u),J=>h(u,J)),b(fe,ye)};$(he,fe=>{r(c)===r(de).id&&e.onCreateProject&&fe(ne)})}var ke=d(he,2);{var be=fe=>{var ye=hv(),V=v(ye);{var J=We=>{var Je=vv(),dt=v(Je);rl(dt,{size:12}),H("click",Je,()=>{h(c,r(de).id,!0),h(u,""),h(o,null)}),b(We,Je)};$(V,We=>{e.onCreateProject&&r(de).depth<2&&We(J)})}var _e=d(V,2);{var qe=We=>{var Je=dv(),dt=v(Je);Su(dt,{size:12}),H("click",Je,()=>{h(s,r(de).name,!0),h(i,r(de).id,!0),h(o,null)}),b(We,Je)};$(_e,We=>{e.onUpdateProject&&We(qe)})}var Fe=d(_e,2);{var et=We=>{var Je=fv(),dt=v(Je);Eu(dt,{size:12}),H("click",Je,()=>{e.onDeleteProject(r(de).id),h(o,null)}),b(We,Je)};$(Fe,We=>{e.onDeleteProject&&We(et)})}b(fe,ye)};$(ke,fe=>{r(Ne)&&!r(me)&&fe(be)})}K(()=>cn(Oe,`padding-left: ${r(de).depth*12}px;`)),b(pe,Oe)});var ee=d(j,2);{var se=pe=>{var de=gv();b(pe,de)};$(ee,pe=>{e.projects.length===0&&r(c)!=="root"&&pe(se)})}b(B,Z)};$(te,B=>{r(a)&&B(ve)})}K(()=>Nn(ge,n())),H("input",ge,B=>{var Z;return(Z=e.onSearchChange)==null?void 0:Z.call(e,B.currentTarget.value)}),H("click",I,()=>h(a,!r(a))),b(t,E),at()}ut(["input","click","keydown"]);var yv=C('<span class="pri-badge svelte-3041n"> </span>'),wv=C('<span class="tag svelte-3041n"> </span>'),kv=C('<div class="row-2 svelte-3041n"></div>'),xv=C("<span></span>"),Sv=C('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),Tv=C('<span class="due svelte-3041n"> </span>'),Mv=C('<button type="button" class="start svelte-3041n" aria-label="开始专注" title="开始专注"><!></button>'),Dv=C('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function Bo(t,e){rt(e,!0);const n=G(()=>e.task.status==="completed"),a=G(()=>e.task.estimated_pomodoros||0),l=G(()=>e.task.completed_pomodoros||0),o=G(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[e.task.priority||"none"]),i=G(()=>({high:"高",medium:"中",low:"低",none:""})[e.task.priority||"none"]),s=G(()=>e.task.due_date?ht(e.task.due_date):"");var c=Dv();let u;var f=v(c);let p;var g=v(f);{var _=A=>{Ro(A,{size:12,strokeWidth:3,color:"#fff"})};$(g,A=>{r(n)&&A(_)})}var m=d(f,2),x=v(m),k=v(x);{var M=A=>{var L=yv(),ce=v(L);K(()=>{cn(L,`--pri-color: ${r(o)??""}`),le(ce,r(i))}),b(A,L)};$(k,A=>{e.task.priority&&e.task.priority!=="none"&&A(M)})}var P=d(k,2),S=v(P),O=d(x,2);{var E=A=>{var L=kv();De(L,21,()=>e.task.tags.slice(0,3),ce=>ce.id,(ce,ie)=>{var oe=wv(),te=v(oe);K(()=>le(te,`#${r(ie).name??""}`)),b(ce,oe)}),b(A,L)};$(O,A=>{e.task.tags&&e.task.tags.length>0&&A(E)})}var U=d(O,2),X=v(U);{var ge=A=>{var L=Sv(),ce=v(L);De(ce,21,()=>Array.from({length:Math.min(r(a),8)}),cr,(te,ve,B)=>{var Z=xv();let w;K(()=>w=Ue(Z,1,"dot svelte-3041n",null,w,{filled:B<r(l)})),b(te,Z)});var ie=d(ce,2),oe=v(ie);K(()=>le(oe,`${r(l)??""}/${r(a)??""} 番茄`)),b(A,L)};$(X,A=>{r(a)>0&&A(ge)})}var ae=d(X,2);{var N=A=>{var L=Tv(),ce=v(L);K(()=>le(ce,r(s))),b(A,L)};$(ae,A=>{r(s)&&A(N)})}var W=d(m,2);{var I=A=>{var L=Mv(),ce=v(L);Lo(ce,{size:13,color:"#fff",fill:"#fff"}),H("click",L,ie=>{var oe;ie.stopPropagation(),(oe=e.onStart)==null||oe.call(e,e.task)}),b(A,L)};$(W,A=>{!r(n)&&e.onStart&&A(I)})}K(()=>{u=Ue(c,1,"task-card svelte-3041n",null,u,{selected:e.selected,done:r(n)}),ue(c,"aria-label",e.task.title),p=Ue(f,1,"check svelte-3041n",null,p,{checked:r(n)}),ue(f,"aria-label",r(n)?"标记为未完成":"标记为完成"),le(S,e.task.title)}),H("click",c,()=>e.onSelect(e.task)),H("keydown",c,A=>{(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),e.onSelect(e.task))}),H("click",f,A=>{A.stopPropagation(),e.onToggle(e.task.id)}),b(t,c),at()}ut(["click","keydown"]);var jv=C('<div class="empty svelte-q02l1n">还没有标签,在「设置 → 标签」里创建</div>'),Pv=C('<span class="check svelte-q02l1n">✓</span>'),Ev=C('<button type="button"><!> <span class="name svelte-q02l1n"> </span></button>'),Cv=C('<div class="chips svelte-q02l1n" role="group" aria-label="标签多选"></div>');function Nv(t,e){rt(e,!0);const n=G(()=>new Set(e.selected));function a(u){const f=new Set(r(n));f.has(u)?f.delete(u):f.add(u),e.onChange([...f])}function l(u){return`--chip-color: ${u&&u.length>0?u:"var(--color-accent)"};`}var o=Le(),i=Pe(o);{var s=u=>{var f=jv();b(u,f)},c=u=>{var f=Cv();De(f,21,()=>e.tags,p=>p.id,(p,g)=>{const _=G(()=>r(n).has(r(g).id));var m=Ev();let x;var k=v(m);{var M=O=>{var E=Pv();b(O,E)};$(k,O=>{r(_)&&O(M)})}var P=d(k,2),S=v(P);K(O=>{x=Ue(m,1,"chip svelte-q02l1n",null,x,{on:r(_)}),cn(m,O),ue(m,"aria-pressed",r(_)),le(S,r(g).name)},[()=>l(r(g).color)]),H("click",m,()=>a(r(g).id)),b(p,m)}),b(u,f)};$(i,u=>{e.tags.length===0?u(s):u(c,-1)})}b(t,o),at()}ut(["click"]);var qv=C('<input type="text" class="title-input svelte-1t5orp1" aria-label="编辑子任务"/>'),Ov=C('<button type="button" class="title-btn svelte-1t5orp1" title="双击编辑"> </button>'),Iv=C('<li><input type="checkbox" aria-label="切换子任务完成" class="svelte-1t5orp1"/> <!> <button type="button" class="del svelte-1t5orp1" aria-label="删除子任务">×</button></li>');function Av(t,e){rt(e,!0);let n=R(!1),a=R(Ce(yt(()=>e.subtask.title))),l=R(null);ot(()=>{r(n)||h(a,e.subtask.title,!0)});function o(){h(a,e.subtask.title,!0),h(n,!0),queueMicrotask(()=>{var M;return(M=r(l))==null?void 0:M.focus()})}function i(){const M=r(a).trim();r(n)&&(h(n,!1),M&&M!==e.subtask.title?e.onChange({...e.subtask,title:M}):M||h(a,e.subtask.title,!0))}function s(){h(a,e.subtask.title,!0),h(n,!1)}function c(M){M.key==="Enter"?(M.preventDefault(),i()):M.key==="Escape"&&(M.preventDefault(),s())}function u(){e.onChange({...e.subtask,is_completed:!e.subtask.is_completed})}var f=Iv();let p;var g=v(f),_=d(g,2);{var m=M=>{var P=qv();Lc(P,S=>h(l,S),()=>r(l)),pt("blur",P,i),H("keydown",P,c),Dt(P,()=>r(a),S=>h(a,S)),b(M,P)},x=M=>{var P=Ov(),S=v(P);K(()=>le(S,e.subtask.title)),H("dblclick",P,o),b(M,P)};$(_,M=>{r(n)?M(m):M(x,-1)})}var k=d(_,2);K(()=>{p=Ue(f,1,"row svelte-1t5orp1",null,p,{done:e.subtask.is_completed}),Cr(g,e.subtask.is_completed)}),H("change",g,u),H("click",k,()=>e.onDelete(e.subtask.id)),b(t,f),at()}ut(["change","keydown","dblclick","click"]);var Fv=C("<span> </span>"),Ca=C("<option> </option>"),zv=C('<button type="button" class="link svelte-1qppxcb">清除</button>'),Rv=C('<aside class="panel svelte-1qppxcb" aria-label="任务详情"><header class="head svelte-1qppxcb"><div class="meta svelte-1qppxcb"><span class="proj svelte-1qppxcb"> </span> <!></div> <button class="close svelte-1qppxcb" aria-label="关闭">×</button></header> <input class="title svelte-1qppxcb" aria-label="标题"/> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="desc">描述</label> <textarea id="desc" class="desc svelte-1qppxcb" rows="4" placeholder="补充细节..."></textarea></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="proj">清单</label> <select id="proj" class="svelte-1qppxcb"><option>无项目</option><!></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="pri">优先级</label> <select id="pri" class="svelte-1qppxcb"><option>无</option><option>高</option><option>中</option><option>低</option></select></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="due">截止日期</label> <div class="row-inline svelte-1qppxcb"><input id="due" type="datetime-local" class="svelte-1qppxcb"/> <!></div></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="reminder">提醒</label> <select id="reminder" class="svelte-1qppxcb"></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="repeat">重复</label> <select id="repeat" class="svelte-1qppxcb"></select></div></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb">标签</span> <!></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb">子任务</span> <ul class="sub-list svelte-1qppxcb"></ul> <form class="sub-add svelte-1qppxcb"><input type="text" placeholder="添加子任务..." aria-label="新子任务" class="svelte-1qppxcb"/> <button type="submit" class="svelte-1qppxcb">添加</button></form></section></aside>');function Lv(t,e){rt(e,!0);let n=R(Ce(yt(()=>e.task.title))),a=R(Ce(yt(()=>e.task.description??""))),l=R(Ce(yt(()=>o(e.task.due_date))));ot(()=>{h(n,e.task.title,!0),h(a,e.task.description??"",!0),h(l,o(e.task.due_date),!0)});function o(D){if(!D)return"";try{const F=new Date(D);if(isNaN(F.getTime()))return"";const z=F.getTimezoneOffset();return new Date(F.getTime()-z*6e4).toISOString().slice(0,16)}catch{return""}}function i(D){if(!D)return null;try{const F=new Date(D);return isNaN(F.getTime())?null:F.toISOString()}catch{return null}}function s(){return new Date().toISOString()}async function c(D){try{await To({...e.task,...D,updated_at:s()}),e.onChanged()}catch(F){console.error("patch task failed",F),alert(`保存失败:${F}`)}}async function u(){const D=r(n).trim();!D||D===e.task.title||await c({title:D})}async function f(){r(a)!==(e.task.description??"")&&await c({description:r(a)})}async function p(){const D=i(r(l));D!==e.task.due_date&&await c({due_date:D})}function g(){h(l,""),c({due_date:null})}let _=R(Ce([]));ot(()=>{m()});async function m(){try{const D=await nu(e.task.id);h(_,D.map(F=>F.id),!0)}catch(D){console.error("load tags failed",D)}}async function x(D){const F=r(_);h(_,D,!0);try{await Eo(e.task.id,D),e.onChanged()}catch(z){h(_,F,!0),alert(`设置标签失败:${z}`)}}let k=R(Ce([])),M=R("");ot(()=>{P()});async function P(){try{h(k,await Oo(e.task.id),!0)}catch(D){console.error("load subtasks failed",D)}}async function S(){const D=r(M).trim();if(!D)return;h(M,"");const F={id:crypto.randomUUID(),task_id:e.task.id,title:D,is_completed:!1,position:r(k).length,created_at:s(),updated_at:s()};try{const z=await $a(F);h(k,[...r(k),z],!0),e.onChanged()}catch(z){alert(`添加子任务失败:${z}`)}}async function O(D){const F=r(k).find(z=>z.id===D.id);h(k,r(k).map(z=>z.id===D.id?D:z),!0);try{await $a(D),e.onChanged()}catch(z){F&&h(k,r(k).map(re=>re.id===F.id?F:re),!0),alert(`更新子任务失败:${z}`)}}async function E(D){const F=r(k);h(k,r(k).filter(z=>z.id!==D),!0);try{await uu(D),e.onChanged()}catch(z){h(k,F,!0),alert(`删除子任务失败:${z}`)}}const U=[{value:"none",label:"不提醒"},{value:"on_time",label:"准时"},{value:"minutes5",label:"提前 5 分钟"},{value:"minutes30",label:"提前 30 分钟"},{value:"hour1",label:"提前 1 小时"},{value:"day1",label:"提前 1 天"},{value:"days2",label:"提前 2 天"}],X=[{value:"none",label:"不重复"},{value:"daily",label:"每天"},{value:"weekdays",label:"工作日"},{value:"weekly",label:"每周"},{value:"monthly",label:"每月"},{value:"yearly",label:"每年"}];function ge(D){var F;return D?((F=e.projects.find(z=>z.id===D))==null?void 0:F.name)??"未知":"无项目"}function ae(D){return{high:"高",medium:"中",low:"低",none:""}[D??"none"]??""}var N=Rv(),W=v(N),I=v(W),A=v(I),L=v(A),ce=d(A,2);{var ie=D=>{var F=Fv(),z=v(F);K(re=>{Ue(F,1,`pri pri-${e.task.priority??""}`,"svelte-1qppxcb"),le(z,re)},[()=>ae(e.task.priority)]),b(D,F)};$(ce,D=>{e.task.priority!=="none"&&D(ie)})}var oe=d(I,2),te=d(W,2),ve=d(te,2),B=d(v(ve),2),Z=d(ve,2),w=v(Z),T=d(v(w),2),j=v(T);j.value=j.__value="";var ee=d(j);De(ee,17,()=>e.projects,D=>D.id,(D,F)=>{var z=Ca(),re=v(z),Ie={};K(()=>{le(re,r(F).name),Ie!==(Ie=r(F).id)&&(z.value=(z.__value=r(F).id)??"")}),b(D,z)});var se;Mt(T);var pe=d(w,2),de=d(v(pe),2),Ee=v(de);Ee.value=Ee.__value="none";var Ne=d(Ee);Ne.value=Ne.__value="high";var me=d(Ne);me.value=me.__value="medium";var ze=d(me);ze.value=ze.__value="low";var xe;Mt(de);var Oe=d(Z,2),Xe=d(v(Oe),2),q=v(Xe),Q=d(q,2);{var he=D=>{var F=zv();H("click",F,g),b(D,F)};$(Q,D=>{r(l)&&D(he)})}var ne=d(Oe,2),ke=v(ne),be=d(v(ke),2);De(be,21,()=>U,D=>D.value,(D,F)=>{var z=Ca(),re=v(z),Ie={};K(()=>{le(re,r(F).label),Ie!==(Ie=r(F).value)&&(z.value=(z.__value=r(F).value)??"")}),b(D,z)});var fe;Mt(be);var ye=d(ke,2),V=d(v(ye),2);De(V,21,()=>X,D=>D.value,(D,F)=>{var z=Ca(),re=v(z),Ie={};K(()=>{le(re,r(F).label),Ie!==(Ie=r(F).value)&&(z.value=(z.__value=r(F).value)??"")}),b(D,z)});var J;Mt(V);var _e=d(ne,2),qe=d(v(_e),2);Nv(qe,{get tags(){return e.allTags},get selected(){return r(_)},onChange:x});var Fe=d(_e,2),et=d(v(Fe),2);De(et,21,()=>r(k),D=>D.id,(D,F)=>{Av(D,{get subtask(){return r(F)},onChange:O,onDelete:E})});var We=d(et,2),Je=v(We),dt=d(Je,2);K((D,F)=>{le(L,D),se!==(se=e.task.project_id??"")&&(T.value=(T.__value=e.task.project_id??"")??"",bt(T,e.task.project_id??"")),xe!==(xe=e.task.priority)&&(de.value=(de.__value=e.task.priority)??"",bt(de,e.task.priority)),fe!==(fe=e.task.reminder??"none")&&(be.value=(be.__value=e.task.reminder??"none")??"",bt(be,e.task.reminder??"none")),J!==(J=e.task.repeat??"none")&&(V.value=(V.__value=e.task.repeat??"none")??"",bt(V,e.task.repeat??"none")),dt.disabled=F},[()=>ge(e.task.project_id),()=>!r(M).trim()]),H("click",oe,function(...D){var F;(F=e.onClose)==null||F.apply(this,D)}),pt("blur",te,u),H("keydown",te,D=>{D.key==="Enter"&&(D.preventDefault(),D.currentTarget.blur())}),Dt(te,()=>r(n),D=>h(n,D)),pt("blur",B,f),Dt(B,()=>r(a),D=>h(a,D)),H("change",T,D=>{const F=D.currentTarget.value;c({project_id:F||null})}),H("change",de,D=>{const F=D.currentTarget.value;c({priority:F})}),pt("blur",q,p),Dt(q,()=>r(l),D=>h(l,D)),H("change",be,D=>{const F=D.currentTarget.value;c({reminder:F})}),H("change",V,D=>{const F=D.currentTarget.value;c({repeat:F})}),pt("submit",We,D=>{D.preventDefault(),S()}),Dt(Je,()=>r(M),D=>h(M,D)),b(t,N),at()}ut(["click","keydown","change"]);var Bv=C('<div class="group-tasks svelte-1u318f6"></div>'),Uv=C('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),Yv=C('<div class="grouped svelte-1u318f6"></div>');function Hv(t,e){rt(e,!0);const n="unscheduled";let a=R(Ce(new Set));const l=["周日","周一","周二","周三","周四","周五","周六"];function o(u,f){const p=new Date(u+"T00:00:00"),g=f.reduce((_,m)=>_+(m.estimated_pomodoros||0)*(m.pomodoro_duration||25),0);return`${u}（${l[p.getDay()]}）| ${g} 分钟`}function i(u){const f=new Set(r(a));f.has(u)?f.delete(u):f.add(u),h(a,f,!0)}const s=G(()=>{const u=new Map;for(const p of e.tasks){let g;e.groupBy==="completed_at"?p.completed_at?g=ht(p.completed_at):g=n:g=p.due_date?ht(p.due_date):n,u.has(g)||u.set(g,[]),u.get(g).push(p)}const f=Array.from(u.entries());return f.sort((p,g)=>p[0]===n?1:g[0]===n?-1:new Date(p[0]).getTime()-new Date(g[0]).getTime()),f});var c=Yv();De(c,21,()=>r(s),([u,f])=>u,(u,f)=>{var p=G(()=>bi(r(f),2));let g=()=>r(p)[0],_=()=>r(p)[1];const m=G(()=>r(a).has(g()));var x=Uv(),k=v(x),M=v(k),P=v(M),S=d(M,2),O=v(S);{var E=ae=>{qr(ae,{size:16})},U=ae=>{ua(ae,{size:16})};$(O,ae=>{r(m)?ae(E):ae(U,-1)})}var X=d(k,2);{var ge=ae=>{var N=Bv();De(N,21,_,W=>W.id,(W,I)=>{{let A=G(()=>{var L;return((L=e.selectedTask)==null?void 0:L.id)===r(I).id});Bo(W,{get task(){return r(I)},get selected(){return r(A)},get onToggle(){return e.onToggle},get onSelect(){return e.onSelect},get onStart(){return e.onStart}})}}),b(ae,N)};$(X,ae=>{r(m)||ae(ge)})}K(ae=>{ue(k,"aria-expanded",!r(m)),le(P,ae)},[()=>g()===n?"未排期":o(g(),_())]),H("click",k,()=>i(g())),b(u,x)}),b(t,c),at()}ut(["click"]);var Wv=C('<span class="unit svelte-1i37zgo"> </span>'),Vv=C('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function _t(t,e){var n=Vv();let a;var l=v(n),o=v(l);fo(o,()=>e.icon,(g,_)=>{_(g,{size:18,strokeWidth:1.8})});var i=d(l,2),s=v(i),c=d(s);{var u=g=>{var _=Wv(),m=v(_);K(()=>le(m,e.unit)),b(g,_)};$(c,g=>{e.unit&&g(u)})}var f=d(i,2),p=v(f);K(()=>{a=Ue(n,1,"stat-card svelte-1i37zgo",null,a,{accent:e.accent}),le(s,e.value),le(p,e.label)}),b(t,n)}var oi=C("<option> </option>"),Kv=C('<button type="button" class="clear-btn svelte-1ko7jxa">清除筛选</button>'),Gv=C('<button type="button" class="export-btn svelte-1ko7jxa"><!> 导出</button>'),Xv=C('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa" aria-label="项目筛选"><option>全部项目</option><!></select> <select class="select svelte-1ko7jxa" aria-label="标签筛选"><option>全部标签</option><!></select> <select class="select svelte-1ko7jxa" aria-label="优先级筛选"><option>全部优先级</option><option>高</option><option>中</option><option>低</option><option>无</option></select> <button type="button">本周</button> <button type="button">本月</button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa">到期日</span> <input type="date" class="date svelte-1ko7jxa" aria-label="起始日期"/> <span class="hint svelte-1ko7jxa">至</span> <input type="date" class="date svelte-1ko7jxa" aria-label="结束日期"/> <!></div></div>');function si(t,e){rt(e,!0);const n=G(()=>e.filterProject!==null||e.filterTag!==null||e.filterPriority!==null||e.filterPreset!==null||e.filterStartDate!==""||e.filterEndDate!=="");function a(){e.setFilterProject(null),e.setFilterTag(null),e.setFilterPriority(null),e.setFilterPreset(null),e.setFilterStartDate(""),e.setFilterEndDate("")}var l=Xv(),o=v(l),i=v(o),s=v(i);s.value=s.__value="";var c=d(s);De(c,17,()=>e.projects,ie=>ie.id,(ie,oe)=>{var te=oi(),ve=v(te),B={};K(()=>{le(ve,r(oe).name),B!==(B=r(oe).id)&&(te.value=(te.__value=r(oe).id)??"")}),b(ie,te)});var u;Mt(i);var f=d(i,2),p=v(f);p.value=p.__value="";var g=d(p);De(g,17,()=>e.tags,ie=>ie.id,(ie,oe)=>{var te=oi(),ve=v(te),B={};K(()=>{le(ve,r(oe).name),B!==(B=r(oe).id)&&(te.value=(te.__value=r(oe).id)??"")}),b(ie,te)});var _;Mt(f);var m=d(f,2),x=v(m);x.value=x.__value="";var k=d(x);k.value=k.__value="high";var M=d(k);M.value=M.__value="medium";var P=d(M);P.value=P.__value="low";var S=d(P);S.value=S.__value="none";var O;Mt(m);var E=d(m,2);let U;var X=d(E,2);let ge;var ae=d(X,2);{var N=ie=>{var oe=Kv();H("click",oe,a),b(ie,oe)};$(ae,ie=>{r(n)&&ie(N)})}var W=d(o,2),I=d(v(W),2),A=d(I,4),L=d(A,2);{var ce=ie=>{var oe=Gv(),te=v(oe);yu(te,{size:14}),H("click",oe,function(...ve){var B;(B=e.onExport)==null||B.apply(this,ve)}),b(ie,oe)};$(L,ie=>{e.onExport&&ie(ce)})}K((ie,oe)=>{ue(i,"title",ie),u!==(u=e.filterProject??"")&&(i.value=(i.__value=e.filterProject??"")??"",bt(i,e.filterProject??"")),ue(f,"title",oe),_!==(_=e.filterTag??"")&&(f.value=(f.__value=e.filterTag??"")??"",bt(f,e.filterTag??"")),O!==(O=e.filterPriority??"")&&(m.value=(m.__value=e.filterPriority??"")??"",bt(m,e.filterPriority??"")),U=Ue(E,1,"preset-btn svelte-1ko7jxa",null,U,{on:e.filterPreset==="week"}),ge=Ue(X,1,"preset-btn svelte-1ko7jxa",null,ge,{on:e.filterPreset==="month"}),Nn(I,e.filterStartDate),Nn(A,e.filterEndDate)},[()=>{var ie;return e.filterProject!==null?(ie=e.projects.find(oe=>oe.id===e.filterProject))==null?void 0:ie.name:"全部项目"},()=>{var ie;return e.filterTag!==null?(ie=e.tags.find(oe=>oe.id===e.filterTag))==null?void 0:ie.name:"全部标签"}]),H("change",i,ie=>{const oe=ie.currentTarget.value;e.setFilterProject(oe||null)}),H("change",f,ie=>{const oe=ie.currentTarget.value;e.setFilterTag(oe||null)}),H("change",m,ie=>{const oe=ie.currentTarget.value;e.setFilterPriority(oe||null)}),H("click",E,()=>e.setFilterPreset(e.filterPreset==="week"?null:"week")),H("click",X,()=>e.setFilterPreset(e.filterPreset==="month"?null:"month")),H("change",I,ie=>e.setFilterStartDate(ie.currentTarget.value)),H("change",A,ie=>e.setFilterEndDate(ie.currentTarget.value)),b(t,l),at()}ut(["change","click"]);var Jv=Hn('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function Zv(t,e){let n=At(e,"size",3,14),a=At(e,"filled",3,!0);var l=Jv(),o=v(l);K(()=>{ue(l,"width",n()),ue(l,"height",n()),ue(o,"fill",a()?"currentColor":"#e5e7eb")}),b(t,l)}var ci=C('<button type="button"> </button>'),Qv=C('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl">星期</span> <div class="weekdays svelte-1h3pyjl"></div></div>'),$v=C('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl">日期</span> <div class="month-grid svelte-1h3pyjl"></div></div>'),ed=C('<div class="warn svelte-1h3pyjl"> </div>'),td=C('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl">自定义重复</h3> <button type="button" class="close-btn svelte-1h3pyjl" aria-label="关闭"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl">开始日期</label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl">结束日期</label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl">间隔</label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl">类型</label> <select id="rc-type" class="input svelte-1h3pyjl"><option>按日</option><option>按周</option><option>按月</option><option>按年</option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl">取消</button> <button type="button" class="btn-confirm svelte-1h3pyjl">确定</button></div></div></div>');function nd(t,e){rt(e,!0);function n(){const S=new Date,O=E=>String(E).padStart(2,"0");return`${S.getFullYear()}-${O(S.getMonth()+1)}-${O(S.getDate())}T${O(S.getHours())}:${O(S.getMinutes())}`}function a(){return`${new Date().getFullYear()}-12-31T23:59`}const l=["一","二","三","四","五","六","日"];let o=R(Ce(n())),i=R(Ce(a())),s=R(1),c=R("week"),u=R(Ce([])),f=R(Ce([]));ot(()=>{if(e.open&&e.initialConfig)try{const S=JSON.parse(e.initialConfig);h(o,S.startDate||n(),!0),h(i,S.endDate||a(),!0),h(s,S.interval||1,!0),h(c,S.type||"week",!0),h(u,S.weekdays||[],!0),h(f,S.monthDays||[],!0)}catch{}});function p(S,O,E){E(S.includes(O)?S.filter(U=>U!==O):[...S,O].sort((U,X)=>U-X))}function g(){const S={interval:r(s),type:r(c),startDate:r(o),endDate:r(i)};r(c)==="week"&&(S.weekdays=r(u)),r(c)==="month"&&(S.monthDays=r(f)),e.onConfirm(JSON.stringify(S))}let _=G(()=>r(c)==="week"&&r(u).length===0||r(c)==="month"&&r(f).length===0);function m(S){S.target===S.currentTarget&&e.onClose()}function x(S){S.key==="Escape"&&e.onClose()}var k=Le(),M=Pe(k);{var P=S=>{var O=td(),E=v(O),U=v(E),X=d(v(U),2),ge=v(X);Cu(ge,{size:18});var ae=d(U,2),N=v(ae),W=v(N),I=d(v(W),2),A=d(W,2),L=d(v(A),2),ce=d(N,2),ie=v(ce),oe=d(v(ie),2),te=d(ie,2),ve=d(v(te),2),B=v(ve);B.value=B.__value="day";var Z=d(B);Z.value=Z.__value="week";var w=d(Z);w.value=w.__value="month";var T=d(w);T.value=T.__value="year";var j=d(ce,2);{var ee=xe=>{var Oe=Qv(),Xe=d(v(Oe),2);De(Xe,21,()=>l,cr,(q,Q,he)=>{const ne=G(()=>he+1),ke=G(()=>r(u).includes(r(ne)));var be=ci();let fe;var ye=v(be);K(()=>{fe=Ue(be,1,"weekday-btn svelte-1h3pyjl",null,fe,{active:r(ke)}),le(ye,r(Q))}),H("click",be,()=>p(r(u),r(ne),V=>h(u,V,!0))),b(q,be)}),b(xe,Oe)};$(j,xe=>{r(c)==="week"&&xe(ee)})}var se=d(j,2);{var pe=xe=>{var Oe=$v(),Xe=d(v(Oe),2);De(Xe,20,()=>Array.from({length:31},(q,Q)=>Q+1),cr,(q,Q)=>{const he=G(()=>r(f).includes(Q));var ne=ci();let ke;var be=v(ne);K(()=>{ke=Ue(ne,1,"month-btn svelte-1h3pyjl",null,ke,{active:r(he)}),le(be,Q)}),H("click",ne,()=>p(r(f),Q,fe=>h(f,fe,!0))),b(q,ne)}),b(xe,Oe)};$(se,xe=>{r(c)==="month"&&xe(pe)})}var de=d(se,2);{var Ee=xe=>{var Oe=ed(),Xe=v(Oe);K(()=>le(Xe,r(c)==="week"?"请选择至少一个星期":"请选择至少一个日期")),b(xe,Oe)};$(de,xe=>{r(_)&&xe(Ee)})}var Ne=d(ae,2),me=v(Ne),ze=d(me,2);K(()=>ze.disabled=r(_)),H("click",O,m),H("keydown",O,x),H("click",X,function(...xe){var Oe;(Oe=e.onClose)==null||Oe.apply(this,xe)}),Dt(I,()=>r(o),xe=>h(o,xe)),Dt(L,()=>r(i),xe=>h(i,xe)),Dt(oe,()=>r(s),xe=>h(s,xe)),sa(ve,()=>r(c),xe=>h(c,xe)),H("click",me,function(...xe){var Oe;(Oe=e.onClose)==null||Oe.apply(this,xe)}),H("click",ze,g),b(S,O)};$(M,S=>{e.open&&S(P)})}b(t,k),at()}ut(["click","keydown"]);var rd=C('<button type="button"><!></button>'),ad=C('<div class="error svelte-1vpobhk"> </div>'),Na=C("<option> </option>"),ld=C('<button type="button"> </button>'),id=C('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk">标签</span> <div class="tag-chips svelte-1vpobhk"></div></div>'),od=C('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk">清单</label> <select id="tf-proj" class="svelte-1vpobhk"><option>无项目</option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk">优先级</label> <select id="tf-pri" class="svelte-1vpobhk"><option>高</option><option>中</option><option>低</option><option>无</option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk">截止日期</label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk">预计番茄</label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk">提醒</label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk">重复</label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk">添加</button></div></div>'),sd=C('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" placeholder="任务标题..." class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group" aria-label="预计番茄数"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function cd(t,e){rt(e,!0);const n=[{value:"none",label:"不提醒"},{value:"on_time",label:"准时"},{value:"minutes5",label:"提前 5 分钟"},{value:"minutes30",label:"提前 30 分钟"},{value:"hour1",label:"提前 1 小时"},{value:"day1",label:"提前 1 天"},{value:"days2",label:"提前 2 天"}],a=[{value:"none",label:"不重复"},{value:"daily",label:"每天"},{value:"weekdays",label:"工作日"},{value:"weekly",label:"每周"},{value:"monthly",label:"每月"},{value:"yearly",label:"每年"},{value:"custom",label:"自定义..."}];let l=gn(),o=R(""),i=R(Ce(yt(()=>e.defaultProjectId??null))),s=R("medium"),c=R(Ce(yt(()=>e.defaultDueDate||ln()))),u=R(0),f=R("none"),p=R("none"),g=R(null),_=R(!1),m=R(Ce(yt(()=>e.tags.length>0?[e.tags[0].id]:[]))),x=R(!1),k=R(""),M=R(!1);ot(()=>{h(i,e.defaultProjectId??null,!0)}),ot(()=>{h(c,e.defaultDueDate||ln(),!0)}),ot(()=>{e.tags.length>0&&r(m).length===0&&h(m,[e.tags[0].id],!0)});function P(){const te=new Map;for(const w of e.projects)te.set(w.id,{...w,children:[]});const ve=[];for(const w of e.projects)w.parent_id&&te.has(w.parent_id)?te.get(w.parent_id).children.push(w.id):ve.push(w.id);const B=[],Z=(w,T)=>{const j=te.get(w),ee=j.children.length>0;B.push({id:j.id,name:j.name,depth:T,disabled:ee});for(const se of j.children)Z(se,T+1)};for(const w of ve)Z(w,0);return B}async function S(){const te=r(o).trim();if(!te){h(k,"请输入任务标题");return}let ve=r(c)||ln();if(r(f)!=="none"&&!ll(ve)){if(!r(M)){h(M,!0),h(k,"提醒任务需要具体时间,请补充时分");return}ve=ii(ve)}h(M,!1),h(k,"");try{await e.onAdd({title:te,project_id:r(i),priority:r(s),due_date:ve,estimated_pomodoros:r(u)>0?r(u):1,pomodoro_duration:l.focusMinutes,reminder:r(f)==="none"?null:r(f),repeat:r(p)==="none"?null:r(p),repeat_config:r(p)==="custom"?r(g):null,tag_ids:r(m)}),h(o,""),h(i,e.defaultProjectId??null,!0),h(s,"medium"),h(c,e.defaultDueDate||ln(),!0),h(u,0),h(f,"none"),h(M,!1),h(p,"none"),h(g,null),h(m,e.tags.length>0?[e.tags[0].id]:[],!0),h(x,!1)}catch(B){h(k,String(B),!0)}}function O(te){te.preventDefault(),S()}function E(){r(x)||ll(r(c))||h(c,ii(r(c)),!0),h(x,!r(x))}var U=sd(),X=v(U),ge=v(X);rl(ge,{size:16,class:"plus-icon"});var ae=d(ge,2),N=d(ae,2);De(N,20,()=>Array.from({length:6},(te,ve)=>ve+1),cr,(te,ve)=>{const B=G(()=>r(u)>=ve);var Z=rd();let w;var T=v(Z);Zv(T,{size:14,get filled(){return r(B)}}),K(()=>{w=Ue(Z,1,"tomato-btn svelte-1vpobhk",null,w,{filled:r(B)}),ue(Z,"aria-label",`${ve} 个番茄`),ue(Z,"aria-pressed",r(B))}),H("click",Z,()=>h(u,ve,!0)),b(te,Z)});var W=d(N,2),I=v(W),A=d(X,2);{var L=te=>{var ve=ad(),B=v(ve);K(()=>le(B,r(k))),b(te,ve)};$(A,te=>{r(k)&&te(L)})}var ce=d(A,2);{var ie=te=>{var ve=od(),B=v(ve),Z=d(v(B),2),w=v(Z);w.value=w.__value="";var T=d(w);De(T,17,P,V=>V.id,(V,J)=>{var _e=Na(),qe=v(_e),Fe={};K(et=>{_e.disabled=r(J).disabled,le(qe,`${et??""}${r(J).name??""}`),Fe!==(Fe=r(J).id)&&(_e.value=(_e.__value=r(J).id)??"")},[()=>"　".repeat(r(J).depth)]),b(V,_e)});var j;Mt(Z);var ee=d(B,2),se=d(v(ee),2),pe=v(se);pe.value=pe.__value="high";var de=d(pe);de.value=de.__value="medium";var Ee=d(de);Ee.value=Ee.__value="low";var Ne=d(Ee);Ne.value=Ne.__value="none";var me;Mt(se);var ze=d(ee,2),xe=d(v(ze),2),Oe=d(ze,2),Xe=d(v(Oe),2),q=d(Oe,2),Q=d(v(q),2);De(Q,21,()=>n,V=>V.value,(V,J)=>{var _e=Na(),qe=v(_e),Fe={};K(()=>{le(qe,r(J).label),Fe!==(Fe=r(J).value)&&(_e.value=(_e.__value=r(J).value)??"")}),b(V,_e)});var he=d(q,2),ne=d(v(he),2);De(ne,21,()=>a,V=>V.value,(V,J)=>{var _e=Na(),qe=v(_e),Fe={};K(()=>{le(qe,r(J).label),Fe!==(Fe=r(J).value)&&(_e.value=(_e.__value=r(J).value)??"")}),b(V,_e)});var ke=d(he,2);{var be=V=>{var J=id(),_e=d(v(J),2);De(_e,21,()=>e.tags,qe=>qe.id,(qe,Fe)=>{const et=G(()=>r(m).includes(r(Fe).id));var We=ld();let Je;var dt=v(We);K(()=>{Je=Ue(We,1,"chip svelte-1vpobhk",null,Je,{on:r(et)}),ue(We,"aria-pressed",r(et)),le(dt,r(Fe).name)}),H("click",We,()=>h(m,r(et)?r(m).filter(D=>D!==r(Fe).id):[...r(m),r(Fe).id],!0)),b(qe,We)}),b(V,J)};$(ke,V=>{e.tags.length>0&&V(be)})}var fe=d(ke,2),ye=v(fe);K(()=>{j!==(j=r(i)??"")&&(Z.value=(Z.__value=r(i)??"")??"",bt(Z,r(i)??"")),me!==(me=r(s))&&(se.value=(se.__value=r(s))??"",bt(se,r(s)))}),H("change",Z,V=>{const J=V.currentTarget.value;h(i,J||null,!0)}),H("change",se,V=>{h(s,V.currentTarget.value,!0)}),pt("blur",xe,V=>{V.currentTarget.value.length===16&&V.currentTarget.blur()}),Dt(xe,()=>r(c),V=>h(c,V)),Dt(Xe,()=>r(u),V=>h(u,V)),H("change",Q,()=>h(M,!1)),sa(Q,()=>r(f),V=>h(f,V)),H("change",ne,V=>{V.currentTarget.value==="custom"?h(_,!0):h(g,null)}),sa(ne,()=>r(p),V=>h(p,V)),H("click",ye,S),b(te,ve)};$(ce,te=>{r(x)&&te(ie)})}var oe=d(ce,2);nd(oe,{get open(){return r(_)},get initialConfig(){return r(g)},onConfirm:te=>{h(g,te,!0),h(_,!1)},onClose:()=>h(_,!1)}),K(()=>le(I,r(x)?"收起":"更多")),pt("submit",U,O),Dt(ae,()=>r(o),te=>h(o,te)),H("click",W,E),b(t,U),at()}ut(["click","change"]);var ud=C('<button type="button"><!></button>');function vd(t,e){rt(e,!0);var n=ud();let a;var l=v(n);{var o=i=>{Ro(i,{size:10,strokeWidth:3,color:"#fff"})};$(l,i=>{e.completed&&i(o)})}K(()=>{a=Ue(n,1,"checkbox svelte-1bxwwxl",null,a,{completed:e.completed}),ue(n,"aria-label",e.completed?"已完成":"标记完成")}),H("click",n,i=>{i.stopPropagation(),e.onToggle()}),b(t,n),at()}ut(["click"]);var ui=C("<option> </option>"),dd=C('<div class="no-task svelte-tr144z">暂无任务</div>'),fd=C('<div class="task-row svelte-tr144z"><!> <span> </span></div>'),hd=C('<div class="day-cell svelte-tr144z"><div> </div> <!> <div class="day-divider svelte-tr144z"></div> <!></div>'),_d=C('<section class="week-card svelte-tr144z"><div class="week-title svelte-tr144z"> </div> <div class="day-grid svelte-tr144z"></div> <div class="weekly-block svelte-tr144z"><div class="weekly-label svelte-tr144z">📋 周复盘</div> <!></div></section>'),gd=C('<div class="journal svelte-tr144z"><div class="inner svelte-tr144z"><div class="head svelte-tr144z"><h1 class="title svelte-tr144z"> </h1> <div class="month-nav svelte-tr144z"><button type="button" class="nav-btn svelte-tr144z" title="上一月" aria-label="上一月"><!></button> <select class="select svelte-tr144z" aria-label="年份"></select> <select class="select svelte-tr144z" aria-label="月份"></select> <button type="button" class="nav-btn svelte-tr144z" title="下一月" aria-label="下一月"><!></button></div></div> <div class="weeks svelte-tr144z"></div></div></div>');function pd(t,e){rt(e,!0);const n=Array.from({length:61},(w,T)=>2026+T),a=Array.from({length:12},(w,T)=>T+1),l=["周一","周二","周三","周四","周五","周六","周日"];let o=R(Ce([])),i=R(Ce([]));function s(w){return String(w).padStart(2,"0")}function c(w){return`${w.getFullYear()}-${s(w.getMonth()+1)}-${s(w.getDate())}`}function u(w,T){const j=[],ee=new Date(w,T-1,1);for(;ee.getDay()!==1;)ee.setDate(ee.getDate()+1);for(;ee.getMonth()===T-1;)j.push(new Date(ee)),ee.setDate(ee.getDate()+7);return j}async function f(w,T){const j=c(new Date(w,T-1,1)),ee=c(new Date(w,T,0));try{const[se,pe]=await Promise.all([qo(w,T),au(j,ee)]);if(w!==e.year||T!==e.month)return;h(o,se,!0),h(i,pe,!0)}catch(se){console.warn("journal load reviews failed",se)}}ot(()=>{const w=e.year,T=e.month;f(w,T)});const p=G(()=>u(e.year,e.month).map((w,T)=>{const j=Array.from({length:7},(pe,de)=>{const Ee=new Date(w);return Ee.setDate(Ee.getDate()+de),Ee}),ee=j[6],se=j.map((pe,de)=>({iso:c(pe),label:`${l[de]} ${pe.getMonth()+1}/${pe.getDate()}`}));return{startISO:c(w),title:`第 ${T+1} 周（${w.getMonth()+1}/${w.getDate()} ~ ${ee.getMonth()+1}/${ee.getDate()}）`,days:se}}));function g(w){return w===c(new Date)}const _=G(()=>{const w=new Map;for(const T of e.tasks){const j=ht(T.due_date);j&&(w.has(j)||w.set(j,[]),w.get(j).push(T))}return w}),m=G(()=>new Map(r(o).map(w=>[w.week_start,w]))),x=G(()=>new Map(r(i).map(w=>[w.date,w])));function k(){e.month===1?(e.onMonthChange(12),e.onYearChange(e.year-1)):e.onMonthChange(e.month-1)}function M(){e.month===12?(e.onMonthChange(1),e.onYearChange(e.year+1)):e.onMonthChange(e.month+1)}async function P(w){var T;try{w.status==="active"?await Mo(w.id):await Do(w.id),(T=e.onTasksChange)==null||T.call(e)}catch(j){console.warn("journal toggle task failed",j)}}async function S(w,T){try{const j=r(x).get(w),ee=j?{...j,content:T}:{id:crypto.randomUUID(),date:w,content:T,updated_at:new Date().toISOString()};await Co(ee),await f(e.year,e.month)}catch(j){console.warn("journal save daily review failed",j)}}async function O(w){try{await No(w),await f(e.year,e.month)}catch(T){console.warn("journal delete daily review failed",T)}}async function E(w,T){var j;try{const ee=r(m).get(w),se=ee?{...ee,content:T}:{id:crypto.randomUUID(),week_start:w,content:T,updated_at:new Date().toISOString()};await lu(se),await f(e.year,e.month),(j=e.onReviewChange)==null||j.call(e)}catch(ee){console.warn("journal save weekly review failed",ee)}}async function U(w){var T;try{await iu(w),await f(e.year,e.month),(T=e.onReviewChange)==null||T.call(e)}catch(j){console.warn("journal delete weekly review failed",j)}}var X=gd(),ge=v(X),ae=v(ge),N=v(ae),W=v(N),I=d(N,2),A=v(I),L=v(A);mu(L,{size:16});var ce=d(A,2);De(ce,20,()=>n,w=>w,(w,T)=>{var j=ui(),ee=v(j),se={};K(()=>{le(ee,`${T??""} 年`),se!==(se=T)&&(j.value=(j.__value=T)??"")}),b(w,j)});var ie;Mt(ce);var oe=d(ce,2);De(oe,20,()=>a,w=>w,(w,T)=>{var j=ui(),ee=v(j),se={};K(()=>{le(ee,`${T??""} 月`),se!==(se=T)&&(j.value=(j.__value=T)??"")}),b(w,j)});var te;Mt(oe);var ve=d(oe,2),B=v(ve);qr(B,{size:16});var Z=d(ae,2);De(Z,21,()=>r(p),w=>w.startISO,(w,T)=>{var j=_d(),ee=v(j),se=v(ee),pe=d(ee,2);De(pe,21,()=>r(T).days,Ne=>Ne.iso,(Ne,me)=>{var ze=hd(),xe=v(ze);let Oe;var Xe=v(xe),q=d(xe,2);{var Q=be=>{var fe=dd();b(be,fe)},he=G(()=>(r(_).get(r(me).iso)??[]).length===0),ne=be=>{var fe=Le(),ye=Pe(fe);De(ye,17,()=>r(_).get(r(me).iso)??[],V=>V.id,(V,J)=>{var _e=fd(),qe=v(_e);{let Je=G(()=>r(J).status==="completed");vd(qe,{get completed(){return r(Je)},onToggle:()=>P(r(J))})}var Fe=d(qe,2);let et;var We=v(Fe);K(()=>{et=Ue(Fe,1,"task-title svelte-tr144z",null,et,{done:r(J).status==="completed"}),le(We,r(J).title)}),b(V,_e)}),b(be,fe)};$(q,be=>{r(he)?be(Q):be(ne,-1)})}var ke=d(q,4);{let be=G(()=>{var fe;return((fe=r(x).get(r(me).iso))==null?void 0:fe.content)??null});ca(ke,{get value(){return r(be)},placeholder:"日复盘",rows:2,onSave:fe=>S(r(me).iso,fe),onDelete:()=>O(r(me).iso)})}K(be=>{Oe=Ue(xe,1,"day-head svelte-tr144z",null,Oe,be),le(Xe,r(me).label)},[()=>({today:g(r(me).iso)})]),b(Ne,ze)});var de=d(pe,2),Ee=d(v(de),2);{let Ne=G(()=>{var me;return((me=r(m).get(r(T).startISO))==null?void 0:me.content)??null});ca(Ee,{get value(){return r(Ne)},placeholder:"本周复盘",rows:5,onSave:me=>E(r(T).startISO,me),onDelete:()=>U(r(T).startISO)})}K(()=>le(se,r(T).title)),b(w,j)}),K(()=>{le(W,`${e.year??""} 年 ${e.month??""} 月`),ie!==(ie=e.year)&&(ce.value=(ce.__value=e.year)??"",bt(ce,e.year)),te!==(te=e.month)&&(oe.value=(oe.__value=e.month)??"",bt(oe,e.month))}),H("click",A,k),H("change",ce,w=>e.onYearChange(Number(w.currentTarget.value))),H("change",oe,w=>e.onMonthChange(Number(w.currentTarget.value))),H("click",ve,M),b(t,X),at()}ut(["click","change"]);var bd=C('<div class="empty svelte-w363gh">本月暂无周复盘</div>'),md=C('<div class="week-card svelte-w363gh"><div class="week-head svelte-w363gh"> </div> <div class="week-content svelte-w363gh"> </div></div>'),yd=C('<div class="week-list svelte-w363gh"></div>'),wd=C('<aside class="panel svelte-w363gh"><h2 class="title svelte-w363gh"> </h2> <div class="weekly-block svelte-w363gh"><div class="label svelte-w363gh">周复盘（只读 · 在手账模式每周区块内编辑）</div> <!></div> <div class="monthly-block svelte-w363gh"><div class="label svelte-w363gh">📋 月度复盘</div> <!></div></aside>');function kd(t,e){rt(e,!0);let n=R(Ce([])),a=R(null);function l(P){return String(P).padStart(2,"0")}async function o(P,S){try{const[O,E]=await Promise.all([qo(P,S),ou(`${P}-${l(S)}`)]);if(P!==e.year||S!==e.month)return;h(n,O,!0),h(a,E,!0)}catch(O){console.warn("month panel load failed",O)}}ot(()=>{const P=e.year,S=e.month;e.reviewVersion,o(P,S)});const i=G(()=>[...r(n)].sort((P,S)=>P.week_start.localeCompare(S.week_start)));async function s(P){try{const S=`${e.year}-${l(e.month)}`,O=r(a)?{...r(a),content:P}:{id:crypto.randomUUID(),year_month:S,content:P,updated_at:new Date().toISOString()};await su(O),await o(e.year,e.month)}catch(S){console.warn("month panel save failed",S)}}async function c(){try{await cu(`${e.year}-${l(e.month)}`),await o(e.year,e.month)}catch(P){console.warn("month panel delete failed",P)}}var u=wd(),f=v(u),p=v(f),g=d(f,2),_=d(v(g),2);{var m=P=>{var S=bd();b(P,S)},x=P=>{var S=yd();De(S,23,()=>r(i),O=>O.week_start,(O,E,U)=>{var X=md(),ge=v(X),ae=v(ge),N=d(ge,2),W=v(N);K(I=>{le(ae,`第 ${r(U)+1} 周（周一起 ${r(E).week_start??""}）`),le(W,I)},[()=>{var I;return(I=r(E).content)!=null&&I.trim()?r(E).content:"（空）"}]),b(O,X)}),b(P,S)};$(_,P=>{r(i).length===0?P(m):P(x,-1)})}var k=d(g,2),M=d(v(k),2);{let P=G(()=>{var S;return((S=r(a))==null?void 0:S.content)??null});ca(M,{get value(){return r(P)},placeholder:"本月总结…",rows:6,onSave:s,onDelete:c})}K(()=>{ue(u,"aria-label",`${e.year??""}年${e.month??""}月复盘`),le(p,`${e.year??""}年${e.month??""}月 · 复盘`)}),b(t,u),at()}var xd=C('<h1 class="title svelte-969q1d"> </h1>'),Sd=C('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),Td=C('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),Md=C('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),Dd=C('<p class="loading svelte-969q1d">加载中...</p>'),jd=C('<p class="empty svelte-969q1d"><!></p>'),Pd=C('<div class="task-list svelte-969q1d"></div>'),Ed=C('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),Cd=C('<div class="page svelte-969q1d"><!> <div class="main svelte-969q1d"><!></div> <!></div>');function Nd(t,e){rt(e,!0);let n=R(Ce([])),a=R(Ce([])),l=R(Ce([])),o=R(!0),i=R(null),s=R(null),c=R("today"),u=R(""),f=R(null),p=R(Ce(new Date().getFullYear())),g=R(new Date().getMonth()+1),_=R(0),m=R(null),x=R(null),k=R(null),M=R(null),P=R(""),S=R(""),O=R(null),E=R(null),U=R(null),X=R(null),ge=R(""),ae=R("");const N=G(()=>{let q=[...r(n)];const Q={high:0,medium:1,low:2,none:3};if(r(u).trim()){const J=r(u).trim().toLowerCase();return q=q.filter(_e=>_e.title.toLowerCase().includes(J)),q.sort((_e,qe)=>{if(_e.status!==qe.status)return _e.status==="active"?-1:1;const Fe=Q[_e.priority||"none"]??3,et=Q[qe.priority||"none"]??3;return Fe!==et?Fe-et:new Date(_e.created_at??0).getTime()-new Date(qe.created_at??0).getTime()}),q}const he=ln(),ne=ta(),ke=new Date,be=ke.getDay(),fe=be===0?6:be-1,ye=new Date(ke);ye.setDate(ye.getDate()-fe),ye.setHours(0,0,0,0);const V=new Date(ye);return V.setDate(V.getDate()+6),V.setHours(23,59,59,999),r(s)!==null?q=q.filter(J=>J.project_id===r(s)):r(c)==="today"?q=q.filter(J=>ht(J.due_date)===he):r(c)==="tomorrow"?q=q.filter(J=>ht(J.due_date)===ne):r(c)==="week"?q=q.filter(J=>{if(!J.due_date)return!1;const _e=new Date(J.due_date);return _e>=ye&&_e<=V}):r(c)==="planned"?q=W(q,{project:r(m),tag:r(x),priority:r(k),preset:r(M),startDate:r(P),endDate:r(S)}):r(c)==="completed"?(q=q.filter(J=>J.status==="completed"),q=W(q,{project:r(O),tag:r(E),priority:r(U),preset:r(X),startDate:r(ge),endDate:r(ae)})):r(c)==="journal"&&(q=q.filter(J=>!!J.due_date)),q.sort((J,_e)=>{if(J.status!==_e.status)return J.status==="active"?-1:1;const qe=Q[J.priority||"none"]??3,Fe=Q[_e.priority||"none"]??3;return qe!==Fe?qe-Fe:new Date(J.created_at??0).getTime()-new Date(_e.created_at??0).getTime()}),q});function W(q,Q){let he=q;if(Q.project!==null&&(he=he.filter(ne=>ne.project_id===Q.project)),Q.tag!==null&&(he=he.filter(ne=>(ne.tags??[]).some(ke=>ke.id===Q.tag))),Q.priority!==null&&(he=he.filter(ne=>ne.priority===Q.priority)),Q.preset==="week"){const ne=new Date,ke=ne.getDay(),be=ke===0?6:ke-1,fe=new Date(ne);fe.setDate(ne.getDate()-be);const ye=new Date(fe);ye.setDate(fe.getDate()+6);const V=ht(fe.toISOString()),J=ht(ye.toISOString());he=he.filter(_e=>{const qe=ht(_e.due_date);return!!qe&&qe>=V&&qe<=J})}if(Q.preset==="month"){const ne=new Date,ke=`${ne.getFullYear()}-${String(ne.getMonth()+1).padStart(2,"0")}-01`,be=new Date(ne.getFullYear(),ne.getMonth()+1,0),fe=ht(be.toISOString());he=he.filter(ye=>{const V=ht(ye.due_date);return!!V&&V>=ke&&V<=fe})}return Q.startDate&&(he=he.filter(ne=>{const ke=ht(ne.due_date);return!!ke&&ke>=Q.startDate})),Q.endDate&&(he=he.filter(ne=>{const ke=ht(ne.due_date);return!!ke&&ke<=Q.endDate})),he}const I=G(()=>{const q=r(N).filter(be=>be.status==="active").reduce((be,fe)=>be+(fe.estimated_pomodoros||0)*(fe.pomodoro_duration||25),0),Q=r(N).filter(be=>be.status==="active").length,he=r(N).reduce((be,fe)=>be+(fe.completed_pomodoros||0)*(fe.pomodoro_duration||25),0),ne=r(N).reduce((be,fe)=>be+(fe.completed_pomodoros||0),0),ke=r(N).filter(be=>be.status==="completed").length;return{estimatedMinutes:q,activeCount:Q,focusedMinutes:he,completedCount:ke,completedPomodoros:ne}}),A=G(()=>{if(r(u).trim())return`搜索结果 (${r(N).length})`;if(r(s)!==null){const Q=r(a).find(he=>he.id===r(s));return(Q==null?void 0:Q.name)||"清单"}return{today:"今天",tomorrow:"明天",week:"本周",planned:"已计划",completed:"已完成",journal:"手账","":"任务"}[r(c)]||"任务"});async function L(){try{const[q,Q,he]=await Promise.all([Sl({}),jo(),Po()]);if(h(n,q.map(ne=>({...ne,tags:ne.tags??[]})),!0),h(a,Q,!0),h(l,he,!0),r(f)){const ne=r(n).find(ke=>ke.id===r(f).id);h(f,ne??null,!0)}}catch(q){h(i,String(q),!0)}finally{h(o,!1)}}kl(L);function ce(){return new Date().toISOString()}function ie(){return crypto.randomUUID()}async function oe(q){const Q=typeof q=="string"?q:q.id,he=typeof q=="string"?r(n).find(ne=>ne.id===Q):q;if(he)try{he.status==="active"?await Mo(Q):await Do(Q),await L()}catch(ne){h(i,String(ne),!0)}}async function te(q,Q=null){try{await Kl({id:ie(),name:q,color:"#c97b6e",parent_id:Q??null,created_at:ce(),updated_at:ce()}),await L()}catch(he){h(i,String(he),!0)}}async function ve(q,Q){try{const he=r(a).find(ne=>ne.id===q);if(!he)return;await Kl({...he,name:Q,updated_at:ce()}),await L()}catch(he){h(i,String(he),!0)}}async function B(q){if(confirm("删除此清单？子清单会一并删除"))try{await tu(q),r(s)===q&&h(s,null),await L()}catch(Q){h(i,String(Q),!0)}}function Z(q){h(f,q,!0)}function w(){h(f,null)}function T(){L()}async function j(q){try{const Q=await Qa(q.id,null,q.pomodoro_duration??25);yo("/timer"),window.dispatchEvent(new CustomEvent("pomoflow:start-task",{detail:{task:q,session:Q}}))}catch(Q){h(i,String(Q),!0)}}async function ee(q){const Q=q.due_date??(r(c)==="tomorrow"?ta():ln());try{const he=ie();await To({id:he,title:q.title,description:"",project_id:q.project_id??r(s),priority:q.priority,status:"active",due_date:ll(Q)?Q:`${Q}T00:00:00`,estimated_pomodoros:q.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:q.pomodoro_duration,reminder:q.reminder??"none",repeat:q.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:q.repeat_config??null,completed_at:null,created_at:ce(),updated_at:ce()}),q.tag_ids.length>0&&await Eo(he,q.tag_ids),await L()}catch(he){h(i,String(he),!0)}}async function se(){const q=r(N),Q=["标题","项目","优先级","截止","标签","番茄数","状态"],he=q.map(ye=>{var V;return[ye.title,((V=r(a).find(J=>J.id===ye.project_id))==null?void 0:V.name)??"",ye.priority??"",ht(ye.due_date),(ye.tags??[]).map(J=>J.name).join("; "),`${ye.completed_pomodoros??0}/${ye.estimated_pomodoros??0}`,ye.status]}),ne=[Q,...he].map(ye=>ye.map(V=>`"${String(V).replace(/"/g,'""')}"`).join(",")).join(`
`),ke=new Blob(["\uFEFF"+ne],{type:"text/csv;charset=utf-8"}),be=URL.createObjectURL(ke),fe=document.createElement("a");fe.href=be,fe.download=`tasks-${ln()}.csv`,fe.click(),URL.revokeObjectURL(be)}var pe=Cd();ho("969q1d",q=>{hr(()=>{gl.title="任务 - PomoFlow"})});var de=v(pe);mv(de,{get projects(){return r(a)},get filter(){return r(c)},get selectedProject(){return r(s)},onSetFilter:q=>{h(c,q,!0),h(u,"")},onSelectProject:q=>{h(s,q,!0),h(u,"")},onCreateProject:te,onUpdateProject:ve,onDeleteProject:B,get search(){return r(u)},onSearchChange:q=>{h(u,q,!0),q.trim()&&(h(s,null),h(c,""))},get tasks(){return r(n)}});var Ee=d(de,2),Ne=v(Ee);{var me=q=>{pd(q,{get year(){return r(p)},get month(){return r(g)},get tasks(){return r(N)},onYearChange:Q=>h(p,Q,!0),onMonthChange:Q=>h(g,Q,!0),onReviewChange:()=>h(_,r(_)+1),onTasksChange:()=>void L()})},ze=q=>{var Q=Ed(),he=v(Q);{var ne=z=>{var re=xd(),Ie=v(re);K(()=>le(Ie,r(A))),b(z,re)};$(he,z=>{r(A)&&z(ne)})}var ke=d(he,2);{var be=z=>{var re=Sd(),Ie=v(re);_t(Ie,{get icon(){return nl},label:"已专注",get value(){return r(I).focusedMinutes},unit:"分钟",accent:!0});var Ze=d(Ie,2);_t(Ze,{get icon(){return al},label:"已完成番茄",get value(){return r(I).completedPomodoros},unit:"个",accent:!0});var tt=d(Ze,2);_t(tt,{get icon(){return tl},label:"已完成任务",get value(){return r(I).completedCount},unit:"个",accent:!0}),b(z,re)},fe=z=>{var re=Td(),Ie=v(re);_t(Ie,{get icon(){return nl},label:"预计专注",get value(){return r(I).estimatedMinutes},unit:"分钟",accent:!0});var Ze=d(Ie,2);_t(Ze,{get icon(){return al},label:"进行中",get value(){return r(I).activeCount},unit:"个",accent:!0});var tt=d(Ze,2);_t(tt,{get icon(){return zo},label:"已专注",get value(){return r(I).focusedMinutes},unit:"分钟",accent:!0});var kt=d(tt,2);_t(kt,{get icon(){return tl},label:"已完成",get value(){return r(I).completedCount},unit:"个",accent:!0}),b(z,re)};$(ke,z=>{r(c)==="completed"?z(be):z(fe,-1)})}var ye=d(ke,2);{var V=z=>{si(z,{get projects(){return r(a)},get tags(){return r(l)},get filterProject(){return r(O)},setFilterProject:re=>h(O,re,!0),get filterTag(){return r(E)},setFilterTag:re=>h(E,re,!0),get filterPriority(){return r(U)},setFilterPriority:re=>h(U,re,!0),get filterPreset(){return r(X)},setFilterPreset:re=>h(X,re,!0),get filterStartDate(){return r(ge)},setFilterStartDate:re=>h(ge,re,!0),get filterEndDate(){return r(ae)},setFilterEndDate:re=>h(ae,re,!0)})},J=z=>{si(z,{get projects(){return r(a)},get tags(){return r(l)},get filterProject(){return r(m)},setFilterProject:re=>h(m,re,!0),get filterTag(){return r(x)},setFilterTag:re=>h(x,re,!0),get filterPriority(){return r(k)},setFilterPriority:re=>h(k,re,!0),get filterPreset(){return r(M)},setFilterPreset:re=>h(M,re,!0),get filterStartDate(){return r(P)},setFilterStartDate:re=>h(P,re,!0),get filterEndDate(){return r(S)},setFilterEndDate:re=>h(S,re,!0),onExport:se})};$(ye,z=>{r(c)==="completed"?z(V):r(c)==="planned"&&z(J,1)})}var _e=d(ye,2);{var qe=z=>{{let re=G(()=>r(c)==="tomorrow"?ta():ln());cd(z,{get projects(){return r(a)},get tags(){return r(l)},get defaultProjectId(){return r(s)},get defaultDueDate(){return r(re)},onAdd:ee})}};$(_e,z=>{r(c)!=="completed"&&z(qe)})}var Fe=d(_e,2);{var et=z=>{var re=Md(),Ie=v(re),Ze=v(Ie),tt=d(Ie,2);K(()=>le(Ze,`⚠ ${r(i)??""}`)),H("click",tt,()=>h(i,null)),b(z,re)};$(Fe,z=>{r(i)&&z(et)})}var We=d(Fe,2);{var Je=z=>{var re=Dd();b(z,re)},dt=z=>{var re=jd(),Ie=v(re);{var Ze=kt=>{var mn=Ja("暂无任务，添加一个开始吧");b(kt,mn)},tt=kt=>{var mn=Ja("此筛选下没有任务");b(kt,mn)};$(Ie,kt=>{r(n).length===0?kt(Ze):kt(tt,-1)})}b(z,re)},D=z=>{{let re=G(()=>r(c)==="completed"?"completed_at":"due_date");Hv(z,{get tasks(){return r(N)},get groupBy(){return r(re)},get selectedTask(){return r(f)},onToggle:oe,onSelect:Z,onStart:j})}},F=z=>{var re=Pd();De(re,21,()=>r(N),Ie=>Ie.id,(Ie,Ze)=>{{let tt=G(()=>{var kt;return((kt=r(f))==null?void 0:kt.id)===r(Ze).id});Bo(Ie,{get task(){return r(Ze)},get selected(){return r(tt)},onToggle:()=>oe(r(Ze)),onSelect:Z,onStart:j})}}),b(z,re)};$(We,z=>{r(o)?z(Je):r(N).length===0?z(dt,1):r(c)==="week"||r(c)==="planned"||r(c)==="completed"?z(D,2):z(F,-1)})}b(q,Q)};$(Ne,q=>{r(c)==="journal"?q(me):q(ze,-1)})}var xe=d(Ee,2);{var Oe=q=>{kd(q,{get year(){return r(p)},get month(){return r(g)},get reviewVersion(){return r(_)}})},Xe=q=>{Lv(q,{get task(){return r(f)},get projects(){return r(a)},get allTags(){return r(l)},onClose:w,onChanged:T})};$(xe,q=>{r(c)==="journal"?q(Oe):r(f)&&q(Xe,1)})}b(t,pe),at()}ut(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
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
const qd=[{key:"today",label:"今日",group:"day"},{key:"week",label:"本周",group:"day"},{key:"month",label:"本月",group:"day"},{key:"quarter",label:"季度",group:"week"},{key:"halfyear",label:"半年",group:"month"},{key:"year",label:"年",group:"month"}];function vi(t){return String(t).padStart(2,"0")}function xt(t){return`${t.getFullYear()}-${vi(t.getMonth()+1)}-${vi(t.getDate())}`}function qa(t,e){return Math.round((e.getTime()-t.getTime())/864e5)+1}function il(t,e=new Date){const n=new Date(e.getFullYear(),e.getMonth(),e.getDate()),a=n.getDay(),l=a===0?-6:1-a;if(t==="today")return{start:xt(n),end:xt(n),days:1,group:"day"};if(t==="week"){const s=new Date(n);s.setDate(n.getDate()+l);const c=new Date(s);return c.setDate(s.getDate()+6),{start:xt(s),end:xt(c),days:7,group:"day"}}if(t==="month"){const s=new Date(n.getFullYear(),n.getMonth(),1),c=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:xt(s),end:xt(c),days:c.getDate(),group:"day"}}if(t==="quarter"){const s=Math.floor(n.getMonth()/3),c=new Date(n.getFullYear(),s*3,1),u=new Date(n.getFullYear(),s*3+3,0);return{start:xt(c),end:xt(u),days:qa(c,u),group:"week"}}if(t==="halfyear"){const s=n.getMonth()<6?0:6,c=new Date(n.getFullYear(),s,1),u=new Date(n.getFullYear(),s+6,0);return{start:xt(c),end:xt(u),days:qa(c,u),group:"month"}}const o=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);return{start:xt(o),end:xt(i),days:qa(o,i),group:"month"}}function Od(t,e=new Date){const n=il(t,e),a=new Date(n.start+"T00:00:00"),l=new Date(n.end+"T00:00:00"),o=Math.round((l.getTime()-a.getTime())/864e5)+1,i=new Date(a);i.setDate(a.getDate()-1);const s=new Date(i);return s.setDate(i.getDate()-o+1),{start:xt(s),end:xt(i)}}function Uo(t,e){return e==="month"?`${Number(t.slice(5,7))}`:`${Number(t.slice(5,7))}/${Number(t.slice(8,10))}`}function Id(t,e=new Date){return xt(e)}var Ad=C('<div class="empty svelte-1ixrxd8"> </div>'),Fd=Hn('<text class="tick svelte-1ixrxd8" text-anchor="end"> </text>'),zd=Hn('<line class="grid svelte-1ixrxd8"></line><!>',1),Rd=Hn('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),Ld=Hn('<rect rx="3"></rect><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),Bd=C('<div class="tooltip svelte-1ixrxd8"> </div>'),Ud=C('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" aria-label="专注趋势柱状图" class="svelte-1ixrxd8"><!><!></svg> <!></div>');function Yd(t,e){rt(e,!0);let n=At(e,"emptyText",3,"该维度暂无专注数据");const a=600,l=240,o={top:14,right:8,bottom:26,left:42},i=a-o.left-o.right,s=l-o.top-o.bottom,c=2,u=10,f=34;let p=R(null);function g(O){if(O<=0)return 0;const E=Math.pow(10,Math.floor(Math.log10(O))),U=O/E;return(U<=1?1:U<=2?2:U<=5?5:10)*E}function _(O,E){return Uo(O,E)}const m=G(()=>{const O=e.data.length,E=e.data.reduce((A,L)=>Math.max(A,L.minutes),0),U=g(E),X=O>0?i/O:i,ge=Math.min(X*.62,f),ae=Math.max(1,Math.ceil(O/u)),N=e.group==="day"?Id():null,W=e.data.map((A,L)=>{const ce=A.minutes>0&&U>0?Math.max(c,A.minutes/U*s):c,ie=o.left+X*L+(X-ge)/2;return{i:L,key:A.key,minutes:A.minutes,x:ie,y:o.top+s-ce,w:ge,h:ce,hitX:o.left+X*L,hitW:X,label:_(A.key,e.group),showLabel:L%ae===0||L===O-1,isCurrent:N!==null&&A.key===N}}),I=[0,.25,.5,.75,1].map(A=>({y:o.top+s-A*s,value:Math.round(U*A),labeled:A===0||A===.5||A===1}));return{bars:W,gridlines:I}}),x=G(()=>r(p)!==null?r(m).bars[r(p)]:null);var k=Le(),M=Pe(k);{var P=O=>{var E=Ad(),U=v(E);K(()=>le(U,n())),b(O,E)},S=O=>{var E=Ud(),U=v(E);ue(U,"viewBox","0 0 600 240");var X=v(U);De(X,17,()=>r(m).gridlines,cr,(W,I)=>{var A=zd(),L=Pe(A),ce=d(L);{var ie=oe=>{var te=Fd(),ve=v(te);K(()=>{ue(te,"x",o.left-6),ue(te,"y",r(I).y+3),le(ve,r(I).value)}),b(oe,te)};$(ce,oe=>{r(I).labeled&&oe(ie)})}K(()=>{ue(L,"x1",o.left),ue(L,"x2",a-o.right),ue(L,"y1",r(I).y),ue(L,"y2",r(I).y)}),b(W,A)});var ge=d(X);De(ge,17,()=>r(m).bars,W=>W.key,(W,I)=>{var A=Ld(),L=Pe(A);let ce;var ie=d(L);{var oe=ve=>{var B=Rd();ue(B,"y",l-8);var Z=v(B);K(()=>{ue(B,"x",r(I).x+r(I).w/2),le(Z,r(I).label)}),b(ve,B)};$(ie,ve=>{r(I).showLabel&&ve(oe)})}var te=d(ie);K(()=>{ce=Ue(L,0,"bar svelte-1ixrxd8",null,ce,{zero:r(I).minutes===0,current:r(I).isCurrent}),ue(L,"x",r(I).x),ue(L,"y",r(I).y),ue(L,"width",r(I).w),ue(L,"height",r(I).h),ue(te,"x",r(I).hitX),ue(te,"y",o.top),ue(te,"width",r(I).hitW),ue(te,"height",s)}),pt("pointerenter",te,()=>h(p,r(I).i,!0)),pt("pointerleave",te,()=>h(p,null)),b(W,A)});var ae=d(U,2);{var N=W=>{var I=Bd();let A;var L=v(I);K(ce=>{A=cn(I,"",A,ce),le(L,`${r(x).label??""} · ${r(x).minutes??""} 分钟`)},[()=>({left:Math.min(88,Math.max(12,(r(x).x+r(x).w/2)/a*100))+"%",top:r(x).y/l*100+"%"})]),b(W,I)};$(ae,W=>{r(x)&&W(N)})}pt("pointerleave",U,()=>h(p,null)),b(O,E)};$(M,O=>{e.data.length===0?O(P):O(S,-1)})}b(t,k),at()}var Hd=C('<div class="empty svelte-s63rv4"> </div>'),Wd=Hn('<circle role="presentation" pathLength="100"></circle>'),Vd=C('<div class="tooltip svelte-s63rv4"> </div>'),Kd=C('<span><i class="dot svelte-s63rv4"></i> <span class="name svelte-s63rv4"> </span> <span class="minutes svelte-s63rv4"> </span></span>'),Gd=C('<div class="donut svelte-s63rv4"><div class="chart svelte-s63rv4"><svg role="img" aria-label="项目时间分布环形图" class="svelte-s63rv4"><g></g></svg> <!></div> <div class="legend svelte-s63rv4"></div></div>');function Xd(t,e){rt(e,!0);let n=At(e,"emptyText",3,"暂无项目数据");const a=220,l=110,o=76,i=2/360*100,s=[90,75,60,45,30,15,0];function c(P){return`color-mix(in srgb, var(--color-accent, #e74c3c) ${s[P%s.length]}%, white)`}function u(P){return P>=s.length?Math.max(.4,1-(P-s.length+1)*.15):void 0}let f=R(null);const p=G(()=>e.projects.reduce((P,S)=>P+S.total_minutes,0)),g=G(()=>{if(r(p)<=0||e.projects.length===0)return[];const P=e.projects.length>1?i:0;let S=0;return e.projects.map((O,E)=>{const U=O.total_minutes/r(p),X=Math.max(.6,U*100-P),ge=(S+U/2)/100*2*Math.PI-Math.PI/2,ae={i:E,p:O,len:X,offset:S,color:c(E),opacity:u(E),tipX:l+o*Math.cos(ge),tipY:l+o*Math.sin(ge)};return S+=U*100,ae})}),_=G(()=>r(f)!==null?r(g)[r(f)]:null);var m=Le(),x=Pe(m);{var k=P=>{var S=Hd(),O=v(S);K(()=>le(O,n())),b(P,S)},M=P=>{var S=Gd(),O=v(S),E=v(O);ue(E,"viewBox","0 0 220 220");var U=v(E);ue(U,"transform","rotate(-90 110 110)"),De(U,21,()=>r(g),N=>N.p.project_id,(N,W)=>{var I=Wd();let A;ue(I,"cx",l),ue(I,"cy",l),ue(I,"r",o);let L;K(()=>{A=Ue(I,0,"seg svelte-s63rv4",null,A,{hovered:r(f)===r(W).i}),ue(I,"opacity",r(W).opacity),ue(I,"stroke-dasharray",`${r(W).len??""} ${100-r(W).len}`),ue(I,"stroke-dashoffset",-r(W).offset),L=cn(I,"",L,{stroke:r(W).color})}),pt("pointerenter",I,()=>h(f,r(W).i,!0)),pt("pointerleave",I,()=>h(f,null)),b(N,I)});var X=d(E,2);{var ge=N=>{var W=Vd();let I;var A=v(W);K(()=>{I=cn(W,"",I,{left:r(_).tipX/a*100+"%",top:r(_).tipY/a*100+"%"}),le(A,`${r(_).p.project_name??""} · ${r(_).p.total_minutes??""} 分钟`)}),b(N,W)};$(X,N=>{r(_)&&N(ge)})}var ae=d(O,2);De(ae,21,()=>r(g),N=>N.p.project_id,(N,W)=>{var I=Kd();let A;var L=v(I);let ce;var ie=d(L,2),oe=v(ie),te=d(ie,2),ve=v(te);K(()=>{A=Ue(I,1,"legend-item svelte-s63rv4",null,A,{hovered:r(f)===r(W).i}),ce=cn(L,"",ce,{background:r(W).color,opacity:r(W).opacity??1}),le(oe,r(W).p.project_name),le(ve,`${r(W).p.total_minutes??""} 分钟`)}),b(N,I)}),b(P,S)};$(x,P=>{r(g).length===0?P(k):P(M,-1)})}b(t,m),at()}var Jd=C("<button> </button>"),Zd=C('<div class="error svelte-giv6a6" role="alert"> </div>'),Qd=C('<p class="loading svelte-giv6a6">统计加载中...</p>'),$d=C('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),ef=C('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6">项目时间分布</h3> <!></section></div>',1),tf=C('<div class="page svelte-giv6a6"><h2 class="svelte-giv6a6">统计</h2> <div class="dims svelte-giv6a6"></div> <!> <!></div>');function nf(t,e){rt(e,!0);let n=R("week"),a=R(null),l=R(0),o=R(!0),i=R(null),s=0;const c=G(()=>il(r(n))),u=G(()=>r(c).group),f=G(()=>r(u)==="day"?"按日":r(u)==="week"?"按周":"按月"),p=G(()=>{var N;return((N=r(a))==null?void 0:N.summary.total_minutes)??0}),g=G(()=>{var N;return((N=r(a))==null?void 0:N.summary.total_sessions)??0}),_=G(()=>{var N;return((N=r(a))==null?void 0:N.summary.completed_tasks)??0}),m=G(()=>Math.round(r(p)/Math.max(1,r(c).days))),x=G(()=>{if(!r(a))return null;const N=r(a).trend;let W=0,I=0;for(const L of N)L.minutes>0?(I++,W=Math.max(W,I)):I=0;let A={key:"",minutes:0,sessions:0};for(const L of N)L.minutes>A.minutes&&(A=L);return{activeDays:N.filter(L=>L.minutes>0).length,longest:W,perPeriod:N.length>0?Math.round(r(p)/N.length):0,peak:A,projects:[...r(a).projects].sort((L,ce)=>ce.total_minutes-L.total_minutes)}}),k=G(()=>r(l)>0?Math.round((r(p)-r(l))/r(l)*100):r(p)>0?100:0),M=G(()=>`${r(k)>=0?"+":""}${r(k)}%`),P=G(()=>r(x)?r(x).projects:[]);ot(()=>{const N=il(r(n)),W=Od(r(n)),I=++s;h(a,null),h(l,0),h(i,null),h(o,!0);const A=-new Date().getTimezoneOffset();Xl(N.start,N.end,N.group,A).then(L=>{I===s&&(h(a,L,!0),h(o,!1))}).catch(L=>{I===s&&(h(i,`统计加载失败:${String(L)}`),h(o,!1))}),Xl(W.start,W.end,N.group,A).then(L=>{I===s&&h(l,L.summary.total_minutes,!0)}).catch(()=>{})});var S=tf();ho("giv6a6",N=>{hr(()=>{gl.title="统计 - PomoFlow"})});var O=d(v(S),2);De(O,21,()=>qd,N=>N.key,(N,W)=>{var I=Jd();let A;var L=v(I);K(()=>{A=Ue(I,1,"dim-pill svelte-giv6a6",null,A,{active:r(n)===r(W).key}),ue(I,"aria-pressed",r(n)===r(W).key),le(L,r(W).label)}),H("click",I,()=>h(n,r(W).key,!0)),b(N,I)});var E=d(O,2);{var U=N=>{var W=Zd(),I=v(W);K(()=>le(I,`⚠ ${r(i)??""}`)),b(N,W)};$(E,N=>{r(i)&&N(U)})}var X=d(E,2);{var ge=N=>{var W=Qd();b(N,W)},ae=N=>{var W=ef(),I=Pe(W),A=v(I);_t(A,{get icon(){return nl},label:"专注时长",get value(){return r(p)},unit:"分钟",accent:!0});var L=d(A,2);_t(L,{get icon(){return zo},label:"番茄数",get value(){return r(g)},unit:"个",accent:!0});var ce=d(L,2);_t(ce,{get icon(){return al},label:"完成任务",get value(){return r(_)},unit:"个",accent:!0});var ie=d(ce,2);_t(ie,{get icon(){return Pa},label:"日均专注",get value(){return r(m)},unit:"分钟",accent:!0});var oe=d(I,2);{var te=pe=>{var de=$d(),Ee=v(de);_t(Ee,{get icon(){return Fo},label:"活跃天数",get value(){return r(x).activeDays},unit:"天",accent:!0});var Ne=d(Ee,2);{var me=ne=>{_t(ne,{get icon(){return ku},label:"最长连续专注",get value(){return r(x).longest},unit:"天",accent:!0})};$(Ne,ne=>{(r(n)==="month"||r(n)==="quarter"||r(n)==="halfyear"||r(n)==="year")&&ne(me)})}var ze=d(Ne,2);{var xe=ne=>{{let ke=G(()=>r(u)==="week"?"周均专注":"月均专注");_t(ne,{get icon(){return Pa},get label(){return r(ke)},get value(){return r(x).perPeriod},unit:"分钟",accent:!0})}};$(ze,ne=>{(r(n)==="quarter"||r(n)==="halfyear"||r(n)==="year")&&ne(xe)})}var Oe=d(ze,2);{var Xe=ne=>{{let ke=G(()=>r(u)==="month"?"高峰月":"高峰期"),be=G(()=>r(x).peak.key?Uo(r(x).peak.key,r(u)):"—"),fe=G(()=>r(x).peak.minutes?`${r(x).peak.minutes} 分钟`:"");_t(ne,{get icon(){return ei},get label(){return r(ke)},get value(){return r(be)},get unit(){return r(fe)},accent:!0})}};$(Oe,ne=>{(r(n)==="halfyear"||r(n)==="year")&&ne(Xe)})}var q=d(Oe,2);{var Q=ne=>{{let ke=G(()=>`${r(x).projects[0].total_minutes} 分钟`);_t(ne,{get icon(){return ei},label:"最佳项目",get value(){return r(x).projects[0].project_name},get unit(){return r(ke)},accent:!0})}};$(q,ne=>{(r(n)==="halfyear"||r(n)==="year")&&r(x).projects[0]&&ne(Q)})}var he=d(q,2);_t(he,{get icon(){return Pa},label:"环比上期",get value(){return r(M)},accent:!0}),b(pe,de)};$(oe,pe=>{r(x)&&r(n)!=="today"&&pe(te)})}var ve=d(oe,2);let B;var Z=v(ve),w=v(Z),T=v(w),j=d(w,2);Yd(j,{get data(){return r(a).trend},get group(){return r(u)}});var ee=d(Z,2),se=d(v(ee),2);Xd(se,{get projects(){return r(P)}}),K(()=>{B=Ue(ve,1,"charts svelte-giv6a6",null,B,{split:r(n)!=="month"}),le(T,`专注趋势(${r(f)??""})`)}),b(N,W)};$(X,N=>{r(o)?N(ge):r(a)&&N(ae,1)})}b(t,S),at()}ut(["click"]);async function rf(){return await Ye("plugin:autostart|is_enabled")}async function af(){await Ye("plugin:autostart|enable")}async function lf(){await Ye("plugin:autostart|disable")}var of=C('<div class="error svelte-uox1oc" role="alert"> </div>'),sf=C('<div class="page svelte-uox1oc"><h2 class="svelte-uox1oc">设置</h2> <section class="block svelte-uox1oc"><h3 class="svelte-uox1oc">番茄钟参数</h3> <div class="row svelte-uox1oc"><label for="focus-min" class="svelte-uox1oc">专注时长(分钟)</label> <input id="focus-min" type="number" min="1" max="120" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="sb-min" class="svelte-uox1oc">短休息时长(分钟)</label> <input id="sb-min" type="number" min="1" max="60" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="lb-min" class="svelte-uox1oc">长休息时长(分钟)</label> <input id="lb-min" type="number" min="1" max="120" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="lb-int" class="svelte-uox1oc">长休息间隔(每 N 个专注)</label> <input id="lb-int" type="number" min="2" max="12" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="auto-chain" class="svelte-uox1oc">专注完成后自动进入休息</label> <input id="auto-chain" type="checkbox" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="snd" class="svelte-uox1oc">完成提示音</label> <input id="snd" type="checkbox" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="ntf" class="svelte-uox1oc">系统通知</label> <input id="ntf" type="checkbox" class="svelte-uox1oc"/></div> <button class="reset-btn svelte-uox1oc">恢复默认</button></section> <section class="block svelte-uox1oc"><h3 class="svelte-uox1oc">系统能力</h3> <div class="row svelte-uox1oc"><div class="row-label svelte-uox1oc"><span class="name svelte-uox1oc">开机自启动</span> <span class="hint svelte-uox1oc">OS 启动时自动运行 PomoFlow(静默启动,常驻托盘)</span></div> <button> </button></div> <div class="row svelte-uox1oc"><div class="row-label svelte-uox1oc"><span class="name svelte-uox1oc">系统通知测试</span> <span class="hint svelte-uox1oc">发送一条测试通知,验证系统通知链路是否通</span></div> <button class="action svelte-uox1oc">发送测试</button></div> <p class="tray-hint svelte-uox1oc">💡 关闭主窗口时 PomoFlow 会驻留在系统托盘,右键托盘图标可『显示窗口 / 退出』。</p></section> <!></div>');function cf(t,e){rt(e,!0);const n=G(gn);let a=R(!1),l=R(!1),o=R("default"),i=R(0),s=R(null);async function c(){try{h(a,await rf(),!0)}catch(w){console.warn("isEnabled failed",w),h(a,!1)}try{h(o,await el()?"granted":"default",!0)}catch{h(o,"default")}try{const w=await Sl({status:"active"});h(i,w.length,!0)}catch{}}ot(()=>{c()}),ot(()=>{r(n).focusMinutes,r(n).shortBreakMinutes,r(n).longBreakMinutes,r(n).longBreakInterval,r(n).autoChain,eu()});function u(w,T){Zc({[w]:T})}async function f(){if(!r(l)){h(l,!0),h(s,null);try{r(a)?(await lf(),h(a,!1)):(await af(),h(a,!0))}catch(w){h(s,`自启动切换失败: ${w}`)}finally{h(l,!1)}}}async function p(){h(s,null);try{let w=await el();if(w)h(o,"granted");else{const T=await Io();w=T==="granted",h(o,T,!0)}if(!w){h(s,"通知权限未授予,无法发送");return}Ao({title:"PomoFlow 测试通知",body:`当前 active 任务数:${r(i)}`})}catch(w){h(s,`通知失败: ${w}`)}}var g=sf(),_=d(v(g),2),m=d(v(_),2),x=d(v(m),2),k=d(m,2),M=d(v(k),2),P=d(k,2),S=d(v(P),2),O=d(P,2),E=d(v(O),2),U=d(O,2),X=d(v(U),2),ge=d(U,2),ae=d(v(ge),2),N=d(ge,2),W=d(v(N),2),I=d(N,2),A=d(_,2),L=d(v(A),2),ce=d(v(L),2);let ie;var oe=v(ce),te=d(L,2),ve=d(v(te),2),B=d(A,2);{var Z=w=>{var T=of(),j=v(T);K(()=>le(j,`⚠ ${r(s)??""}`)),b(w,T)};$(B,w=>{r(s)&&w(Z)})}K(()=>{Nn(x,r(n).focusMinutes),Nn(M,r(n).shortBreakMinutes),Nn(S,r(n).longBreakMinutes),Nn(E,r(n).longBreakInterval),Cr(X,r(n).autoChain),Cr(ae,r(n).soundEnabled),Cr(W,r(n).desktopNotificationEnabled),ie=Ue(ce,1,"toggle svelte-uox1oc",null,ie,{on:r(a)}),ce.disabled=r(l),ue(ce,"aria-pressed",r(a)),le(oe,r(l)?"...":r(a)?"已开启":"已关闭")}),H("input",x,w=>u("focusMinutes",Math.max(1,Math.min(120,+w.currentTarget.value||25)))),H("input",M,w=>u("shortBreakMinutes",Math.max(1,Math.min(60,+w.currentTarget.value||5)))),H("input",S,w=>u("longBreakMinutes",Math.max(1,Math.min(120,+w.currentTarget.value||15)))),H("input",E,w=>u("longBreakInterval",Math.max(2,Math.min(12,+w.currentTarget.value||4)))),H("change",X,w=>u("autoChain",w.currentTarget.checked)),H("change",ae,w=>u("soundEnabled",w.currentTarget.checked)),H("change",W,w=>u("desktopNotificationEnabled",w.currentTarget.checked)),H("click",I,()=>Qc()),H("click",ce,f),H("click",ve,p),b(t,g),at()}ut(["input","change","click"]);var uf=C("<button> </button>"),vf=C('<main class="app svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true">🍅</span> <h1 class="svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q" aria-label="主导航"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function df(t,e){rt(e,!0),ot(()=>{if(!xo().running)return;const m=setInterval(()=>$c(),1e3);return()=>clearInterval(m)});const n=G(Gc);var a=vf(),l=v(a),o=d(v(l),2);De(o,21,()=>Xc,_=>_.path,(_,m)=>{var x=uf();let k;var M=v(x);K(()=>{k=Ue(x,1,"nav-item svelte-1n46o8q",null,k,{active:r(n)===r(m).path}),ue(x,"aria-current",r(n)===r(m).path?"page":void 0),le(M,r(m).label)}),H("click",x,()=>yo(r(m).path)),b(_,x)});var i=d(l,2),s=v(i);{var c=_=>{li(_,{})},u=_=>{Nd(_,{})},f=_=>{nf(_,{})},p=_=>{cf(_,{})},g=_=>{li(_,{})};$(s,_=>{r(n)==="/timer"?_(c):r(n)==="/tasks"?_(u,1):r(n)==="/stats"?_(f,2):r(n)==="/settings"?_(p,3):_(g,-1)})}b(t,a),at()}ut(["click"]);kc(df,{target:document.getElementById("app")});
