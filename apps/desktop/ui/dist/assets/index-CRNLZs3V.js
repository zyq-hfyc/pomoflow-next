var Ds=Object.defineProperty;var yi=e=>{throw TypeError(e)};var Cs=(e,t,n)=>t in e?Ds(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Pt=(e,t,n)=>Cs(e,typeof t!="symbol"?t+"":t,n),_a=(e,t,n)=>t.has(e)||yi("Cannot "+n);var m=(e,t,n)=>(_a(e,t,"read from private field"),n?n.call(e):t.get(e)),Pe=(e,t,n)=>t.has(e)?yi("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),we=(e,t,n,a)=>(_a(e,t,"write to private field"),a?a.call(e,n):t.set(e,n),n),Oe=(e,t,n)=>(_a(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const il=!1;var ti=Array.isArray,qs=Array.prototype.indexOf,Xr=Array.prototype.includes,ua=Array.from,Ns=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,ll=Object.getOwnPropertyDescriptors,As=Object.prototype,Is=Array.prototype,ni=Object.getPrototypeOf,wi=Object.isExtensible;function vr(e){return typeof e=="function"}const Os=()=>{};function Fs(e){return e()}function Da(e){for(var t=0;t<e.length;t++)e[t]()}function sl(){var e,t,n=new Promise((a,i)=>{e=a,t=i});return{promise:n,resolve:e,reject:t}}function ol(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const n=[];for(const a of e)if(n.push(a),n.length===t)break;return n}const ct=2,Qn=4,Nr=8,ri=1<<24,Vt=16,Rt=32,fn=64,Ca=128,Lt=512,lt=1024,at=2048,Kt=4096,wt=8192,qt=16384,ir=32768,qa=1<<25,yn=65536,$r=1<<17,cl=1<<18,lr=1<<19,ul=1<<20,en=1<<25,On=65536,ea=1<<21,Bn=1<<22,mn=1<<23,rn=Symbol("$state"),vl=Symbol("legacy props"),Ls=Symbol(""),Wr=Symbol("attributes"),Na=Symbol("class"),Aa=Symbol("style"),_r=Symbol("text"),Yr=Symbol("form reset"),Ar=new class extends Error{constructor(){super(...arguments);Pt(this,"name","StaleReactionError");Pt(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var nl;const va=!!((nl=globalThis.document)!=null&&nl.contentType)&&globalThis.document.contentType.includes("xml");function Rs(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function zs(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Bs(e,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Us(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Hs(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Ws(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Ys(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Vs(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function Gs(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Ks(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Js(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Zs(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Qs=1,Xs=2,fl=4,$s=8,eo=16,to=1,no=2,dl=4,ro=8,ao=16,io=1,lo=2,rt=Symbol("uninitialized"),hl="http://www.w3.org/1999/xhtml",so="http://www.w3.org/2000/svg",oo="@attach";function co(){console.warn("https://svelte.dev/e/derived_inert")}function uo(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function vo(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function _l(e){return e===this.v}function fo(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function pl(e){return!fo(e,this.v)}let sr=!1,ho=!1;function _o(){sr=!0}let Qe=null;function Xn(e){Qe=e}function st(e,t=!1,n){Qe={p:Qe,i:!1,c:null,e:null,s:e,x:null,r:De,l:sr&&!t?{s:null,u:null,$:[]}:null}}function ot(e){var t=Qe,n=t.e;if(n!==null){t.e=null;for(var a of n)zl(a)}return t.i=!0,Qe=t.p,{}}function Ir(){return!sr||Qe!==null&&Qe.l===null}let Sn=[];function gl(){var e=Sn;Sn=[],Da(e)}function tn(e){if(Sn.length===0&&!kr){var t=Sn;queueMicrotask(()=>{t===Sn&&gl()})}Sn.push(e)}function po(){for(;Sn.length>0;)gl()}function bl(e){var t=De;if(t===null)return Ce.f|=mn,e;if((t.f&ir)===0&&(t.f&Qn)===0)throw e;gn(e,t)}function gn(e,t){if(!(t!==null&&(t.f&qt)!==0)){for(;t!==null;){if((t.f&Ca)!==0){if((t.f&ir)===0)throw e;try{t.b.error(e);return}catch(n){e=n}}t=t.parent}throw e}}const go=-7169;function nt(e,t){e.f=e.f&go|t}function ai(e){(e.f&Lt)!==0||e.deps===null?nt(e,lt):nt(e,Kt)}function ml(e){if(e!==null)for(const t of e)(t.f&ct)===0||(t.f&On)===0||(t.f^=On,ml(t.deps))}function yl(e,t,n){(e.f&at)!==0?t.add(e):(e.f&Kt)!==0&&n.add(e),ml(e.deps),nt(e,lt)}let Ur=!1;function bo(e){var t=Ur;try{return Ur=!1,[e(),Ur]}finally{Ur=t}}function Vr(e,t){if(t){const n=document.body;e.autofocus=!0,tn(()=>{document.activeElement===n&&e.focus()})}}let ki=!1;function mo(){ki||(ki=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n[Yr])==null||t.call(n)})},{capture:!0}))}function or(e){var t=Ce,n=De;zt(null),Bt(null);try{return e()}finally{zt(t),Bt(n)}}function wl(e,t,n,a=n){e.addEventListener(t,()=>or(n));const i=e[Yr];i?e[Yr]=()=>{i(),a(!0)}:e[Yr]=()=>a(!0),mo()}function yo(e){let t=0,n=wn(0),a;return()=>{ci()&&(r(n),ui(()=>(t===0&&(a=pt(()=>e(()=>xr(n)))),t+=1,()=>{tn(()=>{t-=1,t===0&&(a==null||a(),a=void 0,xr(n))})})))}}var wo=yn|lr;function ko(e,t,n,a){new xo(e,t,n,a)}var At,ei,It,jn,xt,Ot,gt,Mt,sn,Mn,_n,Wn,jr,Mr,on,sa,Ge,So,To,Ia,Eo,Oa,Gr,Kr,Fa,La;class xo{constructor(t,n,a,i){Pe(this,Ge);Pt(this,"parent");Pt(this,"is_pending",!1);Pt(this,"transform_error");Pe(this,At);Pe(this,ei,null);Pe(this,It);Pe(this,jn);Pe(this,xt);Pe(this,Ot,null);Pe(this,gt,null);Pe(this,Mt,null);Pe(this,sn,null);Pe(this,Mn,0);Pe(this,_n,0);Pe(this,Wn,!1);Pe(this,jr,new Set);Pe(this,Mr,new Set);Pe(this,on,null);Pe(this,sa,yo(()=>(we(this,on,wn(m(this,Mn))),()=>{we(this,on,null)})));var l;we(this,At,t),we(this,It,n),we(this,jn,s=>{var o=De;o.b=this,o.f|=Ca,a(s)}),this.parent=De.b,this.transform_error=i??((l=this.parent)==null?void 0:l.transform_error)??(s=>s),we(this,xt,cr(()=>{Oe(this,Ge,Oa).call(this)},wo))}defer_effect(t){yl(t,m(this,jr),m(this,Mr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!m(this,It).pending}update_pending_count(t,n){Oe(this,Ge,Fa).call(this,t,n),we(this,Mn,m(this,Mn)+t),!(!m(this,on)||m(this,Wn))&&(we(this,Wn,!0),tn(()=>{we(this,Wn,!1),m(this,on)&&er(m(this,on),m(this,Mn))}))}get_effect_pending(){return m(this,sa).call(this),r(m(this,on))}error(t){if(!m(this,It).onerror&&!m(this,It).failed)throw t;oe!=null&&oe.is_fork?(m(this,Ot)&&oe.skip_effect(m(this,Ot)),m(this,gt)&&oe.skip_effect(m(this,gt)),m(this,Mt)&&oe.skip_effect(m(this,Mt)),oe.oncommit(()=>{Oe(this,Ge,La).call(this,t)})):Oe(this,Ge,La).call(this,t)}}At=new WeakMap,ei=new WeakMap,It=new WeakMap,jn=new WeakMap,xt=new WeakMap,Ot=new WeakMap,gt=new WeakMap,Mt=new WeakMap,sn=new WeakMap,Mn=new WeakMap,_n=new WeakMap,Wn=new WeakMap,jr=new WeakMap,Mr=new WeakMap,on=new WeakMap,sa=new WeakMap,Ge=new WeakSet,So=function(){try{we(this,Ot,bt(()=>m(this,jn).call(this,m(this,At))))}catch(t){this.error(t)}},To=function(t){const n=m(this,It).failed,{reset:a,invoke_onerror:i}=Oe(this,Ge,Ia).call(this,t);tn(i),n&&we(this,Mt,bt(()=>{n(m(this,At),()=>t,()=>a)}))},Ia=function(t){var n=!1,a=!1;const i=()=>{if(n){vo();return}n=!0,a&&Zs(),m(this,Mt)!==null&&An(m(this,Mt),()=>{we(this,Mt,null)}),Oe(this,Ge,Kr).call(this,()=>{Oe(this,Ge,Oa).call(this)})};return{reset:i,invoke_onerror:()=>{var s,o;try{a=!0,(o=(s=m(this,It)).onerror)==null||o.call(s,t,i),a=!1}catch(c){gn(c,m(this,xt)&&m(this,xt).parent)}}}},Eo=function(){const t=m(this,It).pending;t&&(this.is_pending=!0,we(this,gt,bt(()=>t(m(this,At)))),tn(()=>{var n=we(this,sn,document.createDocumentFragment()),a=Jt();n.append(a),we(this,Ot,Oe(this,Ge,Kr).call(this,()=>bt(()=>m(this,jn).call(this,a)))),m(this,_n)===0&&(m(this,At).before(n),we(this,sn,null),An(m(this,gt),()=>{we(this,gt,null)}),Oe(this,Ge,Gr).call(this,oe))}))},Oa=function(){try{if(this.is_pending=this.has_pending_snippet(),we(this,_n,0),we(this,Mn,0),we(this,Ot,bt(()=>{m(this,jn).call(this,m(this,At))})),m(this,_n)>0){var t=we(this,sn,document.createDocumentFragment());fi(m(this,Ot),t);const n=m(this,It).pending;we(this,gt,bt(()=>n(m(this,At))))}else Oe(this,Ge,Gr).call(this,oe)}catch(n){this.error(n)}},Gr=function(t){this.is_pending=!1,t.transfer_effects(m(this,jr),m(this,Mr))},Kr=function(t){var n=De,a=Ce,i=Qe;Bt(m(this,xt)),zt(m(this,xt)),Xn(m(this,xt).ctx);try{return Fn.ensure(),t()}catch(l){return bl(l),null}finally{Bt(n),zt(a),Xn(i)}},Fa=function(t,n){var a;if(!this.has_pending_snippet()){this.parent&&Oe(a=this.parent,Ge,Fa).call(a,t,n);return}we(this,_n,m(this,_n)+t),m(this,_n)===0&&(Oe(this,Ge,Gr).call(this,n),m(this,gt)&&An(m(this,gt),()=>{we(this,gt,null)}),m(this,sn)&&(m(this,At).before(m(this,sn)),we(this,sn,null)))},La=function(t){m(this,Ot)&&(ft(m(this,Ot)),we(this,Ot,null)),m(this,gt)&&(ft(m(this,gt)),we(this,gt,null)),m(this,Mt)&&(ft(m(this,Mt)),we(this,Mt,null));let n=m(this,It).failed;const a=i=>{const{reset:l,invoke_onerror:s}=Oe(this,Ge,Ia).call(this,i);s(),n&&we(this,Mt,Oe(this,Ge,Kr).call(this,()=>{try{return bt(()=>{var o=De;o.b=this,o.f|=Ca,n(m(this,At),()=>i,()=>l)})}catch(o){return gn(o,m(this,xt).parent),null}}))};tn(()=>{var i;try{i=this.transform_error(t)}catch(l){gn(l,m(this,xt)&&m(this,xt).parent);return}i!==null&&typeof i=="object"&&typeof i.then=="function"?i.then(a,l=>gn(l,m(this,xt)&&m(this,xt).parent)):a(i)})};function kl(e,t,n,a){const i=Ir()?$n:ii;var l=e.filter(p=>!p.settled),s=t.map(i);if(n.length===0&&l.length===0){a(s);return}var o=De,c=Po(),u=l.length===1?l[0].promise:l.length>1?Promise.all(l.map(p=>p.promise)):null;function v(p){if((o.f&qt)===0){c();try{a([...s,...p])}catch(g){gn(g,o)}ta()}}var b=xl();if(n.length===0){u.then(()=>v([])).finally(b);return}function f(){Promise.all(n.map(p=>jo(p))).then(v).catch(p=>gn(p,o)).finally(b)}u?u.then(()=>{c(),f(),ta()}):f()}function Po(){var e=De,t=Ce,n=Qe,a=oe;return function(l=!0){Bt(e),zt(t),Xn(n),l&&(e.f&qt)===0&&(a==null||a.activate(),a==null||a.apply())}}function ta(e=!0){Bt(null),zt(null),Xn(null),e&&(oe==null||oe.deactivate())}function xl(){var e=De,t=e.b,n=oe,a=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(a,e),()=>{t==null||t.update_pending_count(-1,n),n.decrement(a,e)}}function $n(e){var t=ct|at;return De!==null&&(De.f|=lr),{ctx:Qe,deps:null,effects:null,equals:_l,f:t,fn:e,reactions:null,rv:0,v:rt,wv:0,parent:De,ac:null}}const pr=Symbol("obsolete");function jo(e,t,n){let a=De;a===null&&zs();var i=void 0,l=wn(rt),s=!Ce,o=new Set;return Ho(()=>{var p,g;var c=De,u=sl();i=u.promise;try{Promise.resolve(e()).then(u.resolve,S=>{S!==Ar&&u.reject(S)}).finally(ta)}catch(S){u.reject(S),ta()}var v=oe;if(s){if((c.f&ir)!==0)var b=xl();if((p=a.b)!=null&&p.is_rendered())(g=v.async_deriveds.get(c))==null||g.reject(pr);else for(const S of o.values())S.reject(pr);o.add(u),v.async_deriveds.set(c,u)}const f=(S,y=void 0)=>{b==null||b(),o.delete(u),y!==pr&&(v.activate(),y?(l.f|=mn,er(l,y)):((l.f&mn)!==0&&(l.f^=mn),er(l,S)),v.deactivate())};u.promise.then(f,S=>f(null,S||"unknown"))}),fa(()=>{for(const c of o)c.reject(pr)}),new Promise(c=>{function u(v){function b(){v===i?c(l):u(i)}v.then(b,b)}u(i)})}function ie(e){const t=$n(e);return Vl(t),t}function ii(e){const t=$n(e);return t.equals=pl,t}function Mo(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)ft(t[n])}}function li(e){var t,n=De,a=e.parent;if(!dn&&a!==null&&e.v!==rt&&(a.f&(qt|wt))!==0)return co(),e.v;Bt(a);try{e.f&=~On,Mo(e),t=Zl(e)}finally{Bt(n)}return t}function Sl(e){var t=li(e);if(!e.equals(t)&&(e.wv=Kl(),(!(oe!=null&&oe.is_fork)||e.deps===null)&&(oe!==null?(oe.capture(e,t,!0),wr==null||wr.capture(e,t,!0)):e.v=t,e.deps===null))){nt(e,lt);return}dn||(vt!==null?(ci()||oe!=null&&oe.is_fork)&&vt.set(e,t):ai(e))}function Do(e){var t;if(e.effects!==null)for(const n of e.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&or(()=>{n.ac.abort(Ar),n.ac=null}),n.fn!==null&&(n.teardown=Os),Er(n,0),vi(n))}function Tl(e){if(e.effects!==null)for(const t of e.effects)t.teardown&&t.fn!==null&&nr(t)}let pa=null,Ln=null,oe=null,wr=null,vt=null,Ra=null,kr=!1,ga=!1,zn=null,Jr=null;var xi=0;let Co=1;var Yn,pn,Dn,Vn,Gn,Kn,cn,Jn,St,Dr,un,Ht,Xt,Zn,Cn,Ue,za,gr,Ba,El,Pl,Rn,qo,br;const oa=class oa{constructor(){Pe(this,Ue);Pt(this,"id",Co++);Pe(this,Yn,!1);Pt(this,"linked",!0);Pe(this,pn,null);Pe(this,Dn,null);Pt(this,"async_deriveds",new Map);Pt(this,"current",new Map);Pt(this,"previous",new Map);Pe(this,Vn,new Set);Pe(this,Gn,new Set);Pe(this,Kn,0);Pe(this,cn,new Map);Pe(this,Jn,null);Pe(this,St,[]);Pe(this,Dr,[]);Pe(this,un,new Set);Pe(this,Ht,new Set);Pe(this,Xt,new Map);Pe(this,Zn,new Set);Pt(this,"is_fork",!1);Pe(this,Cn,!1);Ln===null?pa=Ln=this:(we(Ln,Dn,this),we(this,pn,Ln)),Ln=this}skip_effect(t){m(this,Xt).has(t)||m(this,Xt).set(t,{d:[],m:[]}),m(this,Zn).delete(t)}unskip_effect(t,n=a=>this.schedule(a)){var a=m(this,Xt).get(t);if(a){m(this,Xt).delete(t);for(var i of a.d)nt(i,at),n(i);for(i of a.m)nt(i,Kt),n(i)}m(this,Zn).add(t)}capture(t,n,a=!1){t.v!==rt&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&mn)===0&&(this.current.set(t,[n,a]),vt==null||vt.set(t,n)),this.is_fork||(t.v=n)}activate(){oe=this}deactivate(){oe=null,vt=null}flush(){try{ga=!0,oe=this,Oe(this,Ue,gr).call(this)}finally{xi=0,Ra=null,zn=null,Jr=null,ga=!1,oe=null,vt=null,Nn.clear()}}discard(){var t;for(const n of m(this,Gn))n(this);m(this,Gn).clear();for(const n of this.async_deriveds.values())n.reject(pr);Oe(this,Ue,br).call(this),(t=m(this,Jn))==null||t.resolve()}register_created_effect(t){m(this,Dr).push(t)}increment(t,n){if(we(this,Kn,m(this,Kn)+1),t){let a=m(this,cn).get(n)??0;m(this,cn).set(n,a+1)}}decrement(t,n){if(we(this,Kn,m(this,Kn)-1),t){let a=m(this,cn).get(n)??0;a===1?m(this,cn).delete(n):m(this,cn).set(n,a-1)}m(this,Cn)||(we(this,Cn,!0),tn(()=>{we(this,Cn,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const a of t)m(this,un).add(a);for(const a of n)m(this,Ht).add(a);t.clear(),n.clear()}oncommit(t){m(this,Vn).add(t)}ondiscard(t){m(this,Gn).add(t)}settled(){return(m(this,Jn)??we(this,Jn,sl())).promise}static ensure(){if(oe===null){const t=oe=new oa;!ga&&!kr&&tn(()=>{m(t,Yn)||t.flush()})}return oe}apply(){{vt=null;return}}schedule(t){var i;if(Ra=t,(i=t.b)!=null&&i.is_pending&&(t.f&(Qn|Nr|ri))!==0&&(t.f&ir)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var a=n.f;if(zn!==null&&n===De&&(Ce===null||(Ce.f&ct)===0))return;if((a&(fn|Rt))!==0){if((a&lt)===0)return;n.f^=lt}}m(this,St).push(n)}};Yn=new WeakMap,pn=new WeakMap,Dn=new WeakMap,Vn=new WeakMap,Gn=new WeakMap,Kn=new WeakMap,cn=new WeakMap,Jn=new WeakMap,St=new WeakMap,Dr=new WeakMap,un=new WeakMap,Ht=new WeakMap,Xt=new WeakMap,Zn=new WeakMap,Cn=new WeakMap,Ue=new WeakSet,za=function(){if(this.is_fork)return!0;for(const a of m(this,cn).keys()){for(var t=a,n=!1;t.parent!==null;){if(m(this,Xt).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},gr=function(){var c,u,v,b;we(this,Yn,!0),xi++>1e3&&(Oe(this,Ue,br).call(this),Ao());for(const f of m(this,un))m(this,Ht).delete(f),nt(f,at),this.schedule(f);for(const f of m(this,Ht))nt(f,Kt),this.schedule(f);const t=m(this,St);we(this,St,[]),this.apply();var n=zn=[],a=[],i=Jr=[];for(const f of t)try{Oe(this,Ue,Ba).call(this,f,n,a)}catch(p){throw Dl(f),Oe(this,Ue,za).call(this)||this.discard(),p}if(oe=null,i.length>0){var l=oa.ensure();for(const f of i)l.schedule(f)}if(zn=null,Jr=null,Oe(this,Ue,za).call(this)){Oe(this,Ue,Rn).call(this,a),Oe(this,Ue,Rn).call(this,n);for(const[f,p]of m(this,Xt))Ml(f,p);i.length>0&&Oe(c=oe,Ue,gr).call(c);return}const s=Oe(this,Ue,El).call(this);if(s){Oe(this,Ue,Rn).call(this,a),Oe(this,Ue,Rn).call(this,n),Oe(u=s,Ue,Pl).call(u,this);return}m(this,un).clear(),m(this,Ht).clear();for(const f of m(this,Vn))f(this);m(this,Vn).clear(),wr=this,Si(a),Si(n),wr=null,(v=m(this,Jn))==null||v.resolve();var o=oe;if(m(this,Kn)===0&&(m(this,St).length===0||o!==null)&&Oe(this,Ue,br).call(this),m(this,St).length>0)if(o!==null){const f=o;m(f,St).push(...m(this,St).filter(p=>!m(f,St).includes(p)))}else o=this;o!==null&&Oe(b=o,Ue,gr).call(b)},Ba=function(t,n,a){t.f^=lt;for(var i=t.first;i!==null;){var l=i.f,s=(l&(Rt|fn))!==0,o=s&&(l&lt)!==0,c=o||(l&wt)!==0||m(this,Xt).has(i);if(!c&&i.fn!==null){s?i.f^=lt:(l&Qn)!==0?n.push(i):Lr(i)&&((l&Vt)!==0&&m(this,Ht).add(i),nr(i));var u=i.first;if(u!==null){i=u;continue}}for(;i!==null;){var v=i.next;if(v!==null){i=v;break}i=i.parent}}},El=function(){for(var t=m(this,pn);t!==null;){if(!t.is_fork){for(const[n,[,a]]of this.current)if(t.current.has(n)&&!a)return t}t=m(t,pn)}return null},Pl=function(t){var a;for(const[i,l]of t.current)!this.previous.has(i)&&t.previous.has(i)&&this.previous.set(i,t.previous.get(i)),this.current.set(i,l);for(const[i,l]of t.async_deriveds){const s=this.async_deriveds.get(i);s&&l.promise.then(s.resolve).catch(s.reject)}t.async_deriveds.clear(),this.transfer_effects(m(t,un),m(t,Ht));const n=i=>{var l=i.reactions;if(l!==null&&!((i.f&ct)!==0&&(i.f&(at|Kt))===0))for(const c of l){var s=c.f;if((s&ct)!==0)n(c);else{var o=c;s&(Bn|Vt)&&!this.async_deriveds.has(o)&&(m(this,Ht).delete(o),nt(o,at),this.schedule(o))}}};for(const i of this.current.keys())n(i);this.oncommit(()=>t.discard()),Oe(a=t,Ue,br).call(a),oe=this,Oe(this,Ue,gr).call(this)},Rn=function(t){for(var n=0;n<t.length;n+=1)yl(t[n],m(this,un),m(this,Ht))},qo=function(){var b;for(let f=pa;f!==null;f=m(f,Dn)){var t=f.id<this.id,n=[];for(const[p,[g,S]]of this.current){if(f.current.has(p)){var a=f.current.get(p)[0];if(t&&g!==a)f.current.set(p,[g,S]);else continue}n.push(p)}if(t)for(const[p,g]of this.async_deriveds){const S=f.async_deriveds.get(p);S&&g.promise.then(S.resolve).catch(S.reject)}var i=[...f.current.keys()].filter(p=>!f.current.get(p)[1]);if(!(!m(f,Yn)||i.length===0)){var l=i.filter(p=>!this.current.has(p));if(l.length===0)t&&f.discard();else if(n.length>0){if(t)for(const p of m(this,Zn))f.unskip_effect(p,g=>{var S;(g.f&(Vt|Bn))!==0?f.schedule(g):Oe(S=f,Ue,Rn).call(S,[g])});f.activate();var s=new Set,o=new Map;for(var c of n)jl(c,l,s,o);o=new Map;var u=[...f.current].filter(([p,g])=>{const S=this.current.get(p);return S?S[0]!==g[0]||S[1]!==g[1]:!0}).map(([p])=>p);if(u.length>0)for(const p of m(this,Dr))(p.f&(qt|wt|$r))===0&&si(p,u,o)&&((p.f&(Bn|Vt))!==0?(nt(p,at),f.schedule(p)):m(f,un).add(p));if(m(f,St).length>0&&!m(f,Cn)){f.apply();for(var v of m(f,St))Oe(b=f,Ue,Ba).call(b,v,[],[]);we(f,St,[])}f.deactivate()}}}},br=function(){if(this.linked){var t=m(this,pn),n=m(this,Dn);t===null?pa=n:we(t,Dn,n),n===null?Ln=t:we(n,pn,t),this.linked=!1}};let Fn=oa;function No(e){var t=kr;kr=!0;try{for(var n;;){if(po(),oe===null)return n;oe.flush()}}finally{kr=t}}function Ao(){try{Ys()}catch(e){gn(e,Ra)}}let Ut=null;function Si(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var a=e[n++];if((a.f&(qt|wt))===0&&Lr(a)&&(Ut=new Set,nr(a),a.deps===null&&a.first===null&&a.nodes===null&&a.teardown===null&&a.ac===null&&Hl(a),(Ut==null?void 0:Ut.size)>0)){Nn.clear();for(const i of Ut){if((i.f&(qt|wt))!==0)continue;const l=[i];let s=i.parent;for(;s!==null;)Ut.has(s)&&(Ut.delete(s),l.push(s)),s=s.parent;for(let o=l.length-1;o>=0;o--){const c=l[o];(c.f&(qt|wt))===0&&nr(c)}}Ut.clear()}}Ut=null}}function jl(e,t,n,a){if(!n.has(e)&&(n.add(e),e.reactions!==null))for(const i of e.reactions){const l=i.f;(l&ct)!==0?jl(i,t,n,a):(l&(Bn|Vt))!==0&&(l&at)===0&&si(i,t,a)&&(nt(i,at),oi(i))}}function si(e,t,n){const a=n.get(e);if(a!==void 0)return a;if(e.deps!==null)for(const i of e.deps){if(Xr.call(t,i))return!0;if((i.f&ct)!==0&&si(i,t,n))return n.set(i,!0),!0}return n.set(e,!1),!1}function oi(e){oe.schedule(e)}function Ml(e,t){if(!((e.f&Rt)!==0&&(e.f&lt)!==0)){(e.f&at)!==0?t.d.push(e):(e.f&Kt)!==0&&t.m.push(e),nt(e,lt);for(var n=e.first;n!==null;)Ml(n,t),n=n.next}}function Dl(e){nt(e,lt);for(var t=e.first;t!==null;)Dl(t),t=t.next}let na=new Set;const Nn=new Map;let Cl=!1;function wn(e,t){var n={f:0,v:e,reactions:null,equals:_l,rv:0,wv:0};return n}function I(e,t){const n=wn(e);return Vl(n),n}function Io(e,t=!1,n=!0){var i;const a=wn(e);return t||(a.equals=pl),sr&&n&&Qe!==null&&Qe.l!==null&&((i=Qe.l).s??(i.s=[])).push(a),a}function d(e,t,n=!1){Ce!==null&&(!Gt||(Ce.f&$r)!==0)&&Ir()&&(Ce.f&(ct|Vt|Bn|$r))!==0&&(an===null||!an.has(e))&&Js();let a=n?Ie(t):t;return er(e,a,Jr)}function er(e,t,n=null){if(!e.equals(t)){Nn.set(e,dn?t:e.v);var a=Fn.ensure();if(a.capture(e,t),(e.f&ct)!==0){const i=e;(e.f&at)!==0&&li(i),vt===null&&ai(i)}e.wv=Kl(),ql(e,at,n),Ir()&&De!==null&&(De.f&lt)!==0&&(De.f&(Rt|fn))===0&&(Nt===null?Vo([e]):Nt.push(e)),!a.is_fork&&na.size>0&&!Cl&&Oo()}return t}function Oo(){Cl=!1;for(const e of na){(e.f&lt)!==0&&nt(e,Kt);let t;try{t=Lr(e)}catch{t=!0}t&&nr(e)}na.clear()}function Ti(e,t=1){var n=r(e),a=t===1?n++:n--;return d(e,n),a}function xr(e){d(e,e.v+1)}function ql(e,t,n){var a=e.reactions;if(a!==null)for(var i=Ir(),l=a.length,s=0;s<l;s++){var o=a[s],c=o.f;if(!(!i&&o===De)){var u=(c&at)===0;if(u&&nt(o,t),(c&$r)!==0)na.add(o);else if((c&ct)!==0){var v=o;vt==null||vt.delete(v),(c&On)===0&&(c&Lt&&(De===null||(De.f&ea)===0)&&(o.f|=On),ql(v,Kt,n))}else if(u){var b=o;(c&Vt)!==0&&Ut!==null&&Ut.add(b),n!==null?n.push(b):oi(b)}}}}function Ie(e){if(typeof e!="object"||e===null||rn in e)return e;const t=ni(e);if(t!==As&&t!==Is)return e;var n=new Map,a=ti(e),i=I(0),l=In,s=o=>{if(In===l)return o();var c=Ce,u=In;zt(null),ji(l);var v=o();return zt(c),ji(u),v};return a&&n.set("length",I(e.length)),new Proxy(e,{defineProperty(o,c,u){(!("value"in u)||u.configurable===!1||u.enumerable===!1||u.writable===!1)&&Gs();var v=n.get(c);return v===void 0?s(()=>{var b=I(u.value);return n.set(c,b),b}):d(v,u.value,!0),!0},deleteProperty(o,c){var u=n.get(c);if(u===void 0){if(c in o){const v=s(()=>I(rt));n.set(c,v),xr(i)}}else d(u,rt),xr(i);return!0},get(o,c,u){var p;if(c===rn)return e;var v=n.get(c),b=c in o;if(v===void 0&&(!b||(p=bn(o,c))!=null&&p.writable)&&(v=s(()=>{var g=Ie(b?o[c]:rt),S=I(g);return S}),n.set(c,v)),v!==void 0){var f=r(v);return f===rt?void 0:f}return Reflect.get(o,c,u)},getOwnPropertyDescriptor(o,c){var u=Reflect.getOwnPropertyDescriptor(o,c);if(u&&"value"in u){var v=n.get(c);v&&(u.value=r(v))}else if(u===void 0){var b=n.get(c),f=b==null?void 0:b.v;if(b!==void 0&&f!==rt)return{enumerable:!0,configurable:!0,value:f,writable:!0}}return u},has(o,c){var f;if(c===rn)return!0;var u=n.get(c),v=u!==void 0&&u.v!==rt||Reflect.has(o,c);if(u!==void 0||De!==null&&(!v||(f=bn(o,c))!=null&&f.writable)){u===void 0&&(u=s(()=>{var p=v?Ie(o[c]):rt,g=I(p);return g}),n.set(c,u));var b=r(u);if(b===rt)return!1}return v},set(o,c,u,v){var P;var b=n.get(c),f=c in o;if(a&&c==="length")for(var p=u;p<b.v;p+=1){var g=n.get(p+"");g!==void 0?d(g,rt):p in o&&(g=s(()=>I(rt)),n.set(p+"",g))}if(b===void 0)(!f||(P=bn(o,c))!=null&&P.writable)&&(b=s(()=>I(void 0)),d(b,Ie(u)),n.set(c,b));else{f=b.v!==rt;var S=s(()=>Ie(u));d(b,S)}var y=Reflect.getOwnPropertyDescriptor(o,c);if(y!=null&&y.set&&y.set.call(v,u),!f){if(a&&typeof c=="string"){var x=n.get("length"),L=Number(c);Number.isInteger(L)&&L>=x.v&&d(x,L+1)}xr(i)}return!0},ownKeys(o){r(i);var c=Reflect.ownKeys(o).filter(b=>{var f=n.get(b);return f===void 0||f.v!==rt});for(var[u,v]of n)v.v!==rt&&!(u in o)&&c.push(u);return c},setPrototypeOf(){Ks()}})}function Ei(e){try{if(e!==null&&typeof e=="object"&&rn in e)return e[rn]}catch{}return e}function Fo(e,t){return Object.is(Ei(e),Ei(t))}var Ua,Nl,Al,Il,Ol;function Lo(){if(Ua===void 0){Ua=window,Nl=document,Al=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;Il=bn(t,"firstChild").get,Ol=bn(t,"nextSibling").get,wi(e)&&(e[Na]=void 0,e[Wr]=null,e[Aa]=void 0,e.__e=void 0),wi(n)&&(n[_r]=void 0)}}function Jt(e=""){return document.createTextNode(e)}function tr(e){return Il.call(e)}function Or(e){return Ol.call(e)}function h(e,t){return tr(e)}function Re(e,t=!1){{var n=tr(e);return n instanceof Comment&&n.data===""?Or(n):n}}function _(e,t=1,n=!1){let a=e;for(;t--;)a=Or(a);return a}function Ro(e){e.textContent=""}function Fl(){return!1}function Ll(e,t,n){return t==null||t===hl?n?document.createElement(e,{is:n}):document.createElement(e):n?document.createElementNS(t,e,{is:n}):document.createElementNS(t,e)}function Rl(e){De===null&&(Ce===null&&Ws(),Hs()),dn&&Us()}function zo(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Zt(e,t){var n=De;n!==null&&(n.f&wt)!==0&&(e|=wt);var a={ctx:Qe,deps:null,nodes:null,f:e|at|Lt,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};oe==null||oe.register_created_effect(a);var i=a;if((e&Qn)!==0)zn!==null?zn.push(a):Fn.ensure().schedule(a);else if(t!==null){try{nr(a)}catch(s){throw ft(a),s}i.deps===null&&i.teardown===null&&i.nodes===null&&i.first===i.last&&(i.f&lr)===0&&(i=i.first,(e&Vt)!==0&&(e&yn)!==0&&i!==null&&(i.f|=yn))}if(i!==null&&(i.parent=n,n!==null&&zo(i,n),Ce!==null&&(Ce.f&ct)!==0&&(e&fn)===0)){var l=Ce;(l.effects??(l.effects=[])).push(i)}return a}function ci(){return Ce!==null&&!Gt}function fa(e){const t=Zt(Nr,null);return nt(t,lt),t.teardown=e,t}function ut(e){Rl();var t=De.f,n=!Ce&&(t&Rt)!==0&&Qe!==null&&!Qe.i;if(n){var a=Qe;(a.e??(a.e=[])).push(e)}else return zl(e)}function zl(e){return Zt(Qn|ul,e)}function Bo(e){return Rl(),Zt(Nr|ul,e)}function Uo(e){Fn.ensure();const t=Zt(fn|lr,e);return(n={})=>new Promise(a=>{n.outro?An(t,()=>{ft(t),a(void 0)}):(ft(t),a(void 0))})}function Fr(e){return Zt(Qn,e)}function Ho(e){return Zt(Bn|lr,e)}function ui(e,t=0){return Zt(Nr|t,e)}function V(e,t=[],n=[],a=[]){kl(a,t,n,i=>{Zt(Nr,()=>{e(...i.map(r))})})}function cr(e,t=0){var n=Zt(Vt|t,e);return n}function Bl(e,t=0){var n=Zt(ri|t,e);return n}function bt(e){return Zt(Rt|lr,e)}function Ul(e){var t=e.teardown;if(t!==null){const n=dn,a=Ce;Pi(!0),zt(null);try{t.call(null)}finally{Pi(n),zt(a)}}}function vi(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){const i=n.ac;i!==null&&or(()=>{i.abort(Ar)});var a=n.next;(n.f&fn)!==0?n.parent=null:ft(n,t),n=a}}function Wo(e){for(var t=e.first;t!==null;){var n=t.next;(t.f&Rt)===0&&ft(t),t=n}}function ft(e,t=!0){var n=!1;(t||(e.f&cl)!==0)&&e.nodes!==null&&e.nodes.end!==null&&(Yo(e.nodes.start,e.nodes.end),n=!0),e.f|=qa,vi(e,t&&!n),Er(e,0);var a=e.nodes&&e.nodes.t;if(a!==null)for(const l of a)l.stop();Ul(e),e.f^=qa,e.f|=qt;var i=e.parent;i!==null&&i.first!==null&&Hl(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=e.b=null}function Yo(e,t){for(;e!==null;){var n=e===t?null:Or(e);e.remove(),e=n}}function Hl(e){var t=e.parent,n=e.prev,a=e.next;n!==null&&(n.next=a),a!==null&&(a.prev=n),t!==null&&(t.first===e&&(t.first=a),t.last===e&&(t.last=n))}function An(e,t,n=!0){var a=[];Wl(e,a,!0);var i=()=>{n&&ft(e),t&&t()},l=a.length;if(l>0){var s=()=>--l||i();for(var o of a)o.out(s)}else i()}function Wl(e,t,n){if((e.f&wt)===0){e.f^=wt;var a=e.nodes&&e.nodes.t;if(a!==null)for(const o of a)(o.is_global||n)&&t.push(o);for(var i=e.first;i!==null;){var l=i.next;if((i.f&fn)===0){var s=(i.f&yn)!==0||(i.f&Rt)!==0&&(e.f&Vt)!==0;Wl(i,t,s?n:!1)}i=l}}}function ra(e){Yl(e,!0)}function Yl(e,t){if((e.f&wt)!==0){e.f^=wt,(e.f&lt)===0&&(nt(e,at),Fn.ensure().schedule(e));for(var n=e.first;n!==null;){var a=n.next,i=(n.f&yn)!==0||(n.f&Rt)!==0;Yl(n,i?t:!1),n=a}var l=e.nodes&&e.nodes.t;if(l!==null)for(const s of l)(s.is_global||t)&&s.in()}}function fi(e,t){if(e.nodes)for(var n=e.nodes.start,a=e.nodes.end;n!==null;){var i=n===a?null:Or(n);t.append(n),n=i}}let Zr=!1,dn=!1;function Pi(e){dn=e}let Ce=null,Gt=!1;function zt(e){Ce=e}let De=null;function Bt(e){De=e}let an=null;function Vl(e){Ce!==null&&(an??(an=new Set)).add(e)}let Tt=null,jt=0,Nt=null;function Vo(e){Nt=e}let Gl=1,Tn=0,In=Tn;function ji(e){In=e}function Kl(){return++Gl}function Lr(e){var t=e.f;if((t&at)!==0)return!0;if(t&ct&&(e.f&=~On),(t&Kt)!==0){for(var n=e.deps,a=n.length,i=0;i<a;i++){var l=n[i];if(Lr(l)&&Sl(l),l.wv>e.wv)return!0}(t&Lt)!==0&&vt===null&&nt(e,lt)}return!1}function Jl(e,t,n=!0){var a=e.reactions;if(a!==null&&!(an!==null&&an.has(e)))for(var i=0;i<a.length;i++){var l=a[i];(l.f&ct)!==0?Jl(l,t,!1):t===l&&(n?nt(l,at):(l.f&lt)!==0&&nt(l,Kt),oi(l))}}function Zl(e){var S;var t=Tt,n=jt,a=Nt,i=Ce,l=an,s=Qe,o=Gt,c=In,u=e.f;Tt=null,jt=0,Nt=null,Ce=(u&(Rt|fn))===0?e:null,an=null,Xn(e.ctx),Gt=!1,In=++Tn,e.ac!==null&&(or(()=>{e.ac.abort(Ar)}),e.ac=null);try{e.f|=ea;var v=e.fn,b=v();e.f|=ir;var f=e.deps,p=oe==null?void 0:oe.is_fork;if(Tt!==null){var g;if(p||Er(e,jt),f!==null&&jt>0)for(f.length=jt+Tt.length,g=0;g<Tt.length;g++)f[jt+g]=Tt[g];else e.deps=f=Tt;if(ci()&&(e.f&Lt)!==0)for(g=jt;g<f.length;g++)((S=f[g]).reactions??(S.reactions=[])).push(e)}else!p&&f!==null&&jt<f.length&&(Er(e,jt),f.length=jt);if(Ir()&&Nt!==null&&!Gt&&f!==null&&(e.f&(ct|Kt|at))===0)for(g=0;g<Nt.length;g++)Jl(Nt[g],e);if(i!==null&&i!==e){if(Tn++,i.deps!==null)for(let y=0;y<n;y+=1)i.deps[y].rv=Tn;if(t!==null)for(const y of t)y.rv=Tn;Nt!==null&&(a===null?a=Nt:a.push(...Nt))}return(e.f&mn)!==0&&(e.f^=mn),b}catch(y){return bl(y)}finally{e.f^=ea,Tt=t,jt=n,Nt=a,Ce=i,an=l,Xn(s),Gt=o,In=c}}function Go(e,t){let n=t.reactions;if(n!==null){var a=qs.call(n,e);if(a!==-1){var i=n.length-1;i===0?n=t.reactions=null:(n[a]=n[i],n.pop())}}if(n===null&&(t.f&ct)!==0&&(Tt===null||!Xr.call(Tt,t))){var l=t;(l.f&Lt)!==0&&(l.f^=Lt,l.f&=~On),l.v!==rt&&ai(l),l.ac!==null&&or(()=>{l.ac.abort(Ar),l.ac=null,nt(l,at)}),Do(l),Er(l,0)}}function Er(e,t){var n=e.deps;if(n!==null)for(var a=t;a<n.length;a++)Go(e,n[a])}function nr(e){var t=e.f;if((t&qt)===0){nt(e,lt);var n=De,a=Zr;De=e,Zr=(t&(Rt|fn))===0;try{(t&(Vt|ri))!==0?Wo(e):vi(e),Ul(e);var i=Zl(e);e.teardown=typeof i=="function"?i:null,e.wv=Gl;var l;il&&ho&&(e.f&at)!==0&&e.deps}finally{Zr=a,De=n}}}async function Ko(){await Promise.resolve(),No()}function r(e){var t=e.f,n=(t&ct)!==0;if(Ce!==null&&!Gt){var a=De!==null&&(De.f&qt)!==0;if(!a&&(an===null||!an.has(e))){var i=Ce.deps;if((Ce.f&ea)!==0)e.rv<Tn&&(e.rv=Tn,Tt===null&&i!==null&&i[jt]===e?jt++:Tt===null?Tt=[e]:Tt.push(e));else{Ce.deps??(Ce.deps=[]),Xr.call(Ce.deps,e)||Ce.deps.push(e);var l=e.reactions;l===null?e.reactions=[Ce]:Xr.call(l,Ce)||l.push(Ce)}}}if(dn&&Nn.has(e))return Nn.get(e);if(n){var s=e;if(dn){var o=s.v;return((s.f&lt)===0&&s.reactions!==null||Xl(s))&&(o=li(s)),Nn.set(s,o),o}var c=(s.f&Lt)===0&&!Gt&&Ce!==null&&(Zr||(Ce.f&Lt)!==0),u=(s.f&ir)===0;Lr(s)&&(c&&(s.f|=Lt),Sl(s)),c&&!u&&(Tl(s),Ql(s))}if(vt!=null&&vt.has(e))return vt.get(e);if((e.f&mn)!==0)throw e.v;return e.v}function Ql(e){if(e.f|=Lt,e.deps!==null)for(const t of e.deps)(t.reactions??(t.reactions=[])).push(e),(t.f&ct)!==0&&(t.f&Lt)===0&&(Tl(t),Ql(t))}function Xl(e){if(e.v===rt)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(Nn.has(t)||(t.f&ct)!==0&&Xl(t))return!0;return!1}function pt(e){var t=Gt;try{return Gt=!0,e()}finally{Gt=t}}function xn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(rn in e)Ha(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&rn in n&&Ha(n)}}}function Ha(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let a in e)try{Ha(e[a],t)}catch{}const n=ni(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const a=ll(n);for(let i in a){const l=a[i].get;if(l)try{l.call(e)}catch{}}}}}function Jo(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Zo=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Qo(e){return Zo.includes(e)}const Xo={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function $o(e){return e=e.toLowerCase(),Xo[e]??e}const ec=["touchstart","touchmove"];function tc(e){return ec.includes(e)}const En=Symbol("events"),$l=new Set,Wa=new Set;function es(e,t,n,a={}){function i(l){if(a.capture||Ya.call(t,l),!l.cancelBubble)return or(()=>n==null?void 0:n.call(this,l))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?tn(()=>{t.addEventListener(e,i,a)}):t.addEventListener(e,i,a),i}function Ft(e,t,n,a,i){var l={capture:a,passive:i},s=es(e,t,n,l);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&fa(()=>{t.removeEventListener(e,s,l)})}function O(e,t,n){(t[En]??(t[En]={}))[e]=n}function dt(e){for(var t=0;t<e.length;t++)$l.add(e[t]);for(var n of Wa)n(e)}let Mi=null;function Ya(e){var S,y;var t=this,n=t.ownerDocument,a=e.type,i=((S=e.composedPath)==null?void 0:S.call(e))||[],l=i[0]||e.target;Mi=e;var s=0,o=Mi===e&&e[En];if(o){var c=i.indexOf(o);if(c!==-1&&(t===document||t===window)){e[En]=t;return}var u=i.indexOf(t);if(u===-1)return;c<=u&&(s=c)}if(l=i[s]||e.target,l!==t){Ns(e,"currentTarget",{configurable:!0,get(){return l||n}});var v=Ce,b=De;zt(null),Bt(null);try{for(var f,p=[];l!==null&&l!==t;){try{var g=(y=l[En])==null?void 0:y[a];g!=null&&(!l.disabled||e.target===l)&&g.call(l,e)}catch(x){f?p.push(x):f=x}if(e.cancelBubble)break;s++,l=s<i.length?i[s]:null}if(f){for(let x of p)queueMicrotask(()=>{throw x});throw f}}finally{e[En]=t,delete e.currentTarget,zt(v),Bt(b)}}}var rl;const ba=((rl=globalThis==null?void 0:globalThis.window)==null?void 0:rl.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function nc(e){return(ba==null?void 0:ba.createHTML(e))??e}function ts(e){var t=Ll("template");return t.innerHTML=nc(e.replaceAll("<!>","<!---->")),t.content}function rr(e,t){var n=De;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function j(e,t){var n=(t&io)!==0,a=(t&lo)!==0,i,l=!e.startsWith("<!>");return()=>{i===void 0&&(i=ts(l?e:"<!>"+e),n||(i=tr(i)));var s=a||Al?document.importNode(i,!0):i.cloneNode(!0);if(n){var o=tr(s),c=s.lastChild;rr(o,c)}else rr(s,s);return s}}function rc(e,t,n="svg"){var a=!e.startsWith("<!>"),i=`<${n}>${a?e:"<!>"+e}</${n}>`,l;return()=>{if(!l){var s=ts(i),o=tr(s);l=tr(o)}var c=l.cloneNode(!0);return rr(c,c),c}}function ns(e,t){return rc(e,t,"svg")}function Va(e=""){{var t=Jt(e+"");return rr(t,t),t}}function We(){var e=document.createDocumentFragment(),t=document.createComment(""),n=Jt();return e.append(t,n),rr(t,n),e}function k(e,t){e!==null&&e.before(t)}function ne(e,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(e[_r]??(e[_r]=e.nodeValue))&&(e[_r]=n,e.nodeValue=`${n}`)}function ac(e,t){return ic(e,t)}const Hr=new Map;function ic(e,{target:t,anchor:n,props:a={},events:i,context:l,intro:s=!0,transformError:o}){Lo();var c=void 0,u=Uo(()=>{var v=n??t.appendChild(Jt());ko(v,{pending:()=>{}},p=>{st({});var g=Qe;l&&(g.c=l),i&&(a.$$events=i),c=e(p,a)||{},ot()},o);var b=new Set,f=p=>{for(var g=0;g<p.length;g++){var S=p[g];if(!b.has(S)){b.add(S);var y=tc(S);for(const P of[t,document]){var x=Hr.get(P);x===void 0&&(x=new Map,Hr.set(P,x));var L=x.get(S);L===void 0?(P.addEventListener(S,Ya,{passive:y}),x.set(S,1)):x.set(S,L+1)}}}};return f(ua($l)),Wa.add(f),()=>{var y;for(var p of b)for(const x of[t,document]){var g=Hr.get(x),S=g.get(p);--S==0?(x.removeEventListener(p,Ya),g.delete(p),g.size===0&&Hr.delete(x)):g.set(p,S)}Wa.delete(f),v!==n&&((y=v.parentNode)==null||y.removeChild(v))}});return lc.set(c,u),c}let lc=new WeakMap;var Wt,$t,Dt,qn,Cr,qr,ca;class di{constructor(t,n=!0){Pt(this,"anchor");Pe(this,Wt,new Map);Pe(this,$t,new Map);Pe(this,Dt,new Map);Pe(this,qn,new Set);Pe(this,Cr,!0);Pe(this,qr,t=>{if(m(this,Wt).has(t)){var n=m(this,Wt).get(t),a=m(this,$t).get(n);if(a)ra(a),m(this,qn).delete(n);else{var i=m(this,Dt).get(n);i&&(ra(i.effect),m(this,$t).set(n,i.effect),m(this,Dt).delete(n),i.fragment.lastChild.remove(),this.anchor.before(i.fragment),a=i.effect)}for(const[l,s]of m(this,Wt)){if(m(this,Wt).delete(l),l===t)break;const o=m(this,Dt).get(s);o&&(ft(o.effect),m(this,Dt).delete(s))}for(const[l,s]of m(this,$t)){if(l===n||m(this,qn).has(l))continue;const o=()=>{if(Array.from(m(this,Wt).values()).includes(l)){var u=document.createDocumentFragment();fi(s,u),u.append(Jt()),m(this,Dt).set(l,{effect:s,fragment:u})}else ft(s);m(this,qn).delete(l),m(this,$t).delete(l)};m(this,Cr)||!a?(m(this,qn).add(l),An(s,o,!1)):o()}}});Pe(this,ca,t=>{m(this,Wt).delete(t);const n=Array.from(m(this,Wt).values());for(const[a,i]of m(this,Dt))n.includes(a)||(ft(i.effect),m(this,Dt).delete(a))});this.anchor=t,we(this,Cr,n)}ensure(t,n){var a=oe,i=Fl();if(n&&!m(this,$t).has(t)&&!m(this,Dt).has(t))if(i){var l=document.createDocumentFragment(),s=Jt();l.append(s),m(this,Dt).set(t,{effect:bt(()=>n(s)),fragment:l})}else m(this,$t).set(t,bt(()=>n(this.anchor)));if(m(this,Wt).set(a,t),i){for(const[o,c]of m(this,$t))o===t?a.unskip_effect(c):a.skip_effect(c);for(const[o,c]of m(this,Dt))o===t?a.unskip_effect(c.effect):a.skip_effect(c.effect);a.oncommit(m(this,qr)),a.ondiscard(m(this,ca))}else m(this,qr).call(this,a)}}Wt=new WeakMap,$t=new WeakMap,Dt=new WeakMap,qn=new WeakMap,Cr=new WeakMap,qr=new WeakMap,ca=new WeakMap;function K(e,t,n=!1){var a=new di(e),i=n?yn:0;function l(s,o){a.ensure(s,o)}cr(()=>{var s=!1;t((o,c=0)=>{s=!0,l(c,o)}),s||l(-1,null)},i)}function Pr(e,t){return t}function sc(e,t,n){for(var a=[],i=t.length,l,s=t.length,o=0;o<i;o++){let b=t[o];An(b,()=>{if(l){if(l.pending.delete(b),l.done.add(b),l.pending.size===0){var f=e.outrogroups;Ga(e,ua(l.done)),f.delete(l),f.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var c=a.length===0&&n!==null&&e.pending.size===0;if(c){var u=n,v=u.parentNode;Ro(v),v.append(u),e.items.clear()}Ga(e,t,!c)}else l={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(l)}function Ga(e,t,n=!0){var a;if(e.pending.size>0){a=new Set;for(const s of e.pending.values())for(const o of s)a.add(e.items.get(o).e)}for(var i=0;i<t.length;i++){var l=t[i];if(a!=null&&a.has(l)){l.f|=en;const s=document.createDocumentFragment();fi(l,s)}else ft(t[i],n)}}var Di;function Le(e,t,n,a,i,l=null){var s=e,o=new Map,c=(t&fl)!==0;if(c){var u=e;s=u.appendChild(Jt())}var v=null,b=ii(()=>{var P=n();return ti(P)?P:P==null?[]:ua(P)}),f,p=new Map,g=!0;function S(P){(L.effect.f&qt)===0&&(L.pending.delete(P),L.fallback=v,oc(L,f,s,t,a),v!==null&&(f.length===0?(v.f&en)===0?ra(v):(v.f^=en,mr(v,null,s)):An(v,()=>{v=null})))}function y(P){L.pending.delete(P)}var x=cr(()=>{f=r(b);for(var P=f.length,Y=new Set,D=oe,W=Fl(),H=0;H<P;H+=1){var ke=f[H],G=a(ke,H),fe=g?null:o.get(G);fe?(fe.v&&er(fe.v,ke),fe.i&&er(fe.i,H),W&&D.unskip_effect(fe.e)):(fe=cc(o,g?s:Di??(Di=Jt()),ke,G,H,i,t,n),g||(fe.e.f|=en),o.set(G,fe)),Y.add(G)}if(P===0&&l&&!v&&(g?v=bt(()=>l(s)):(v=bt(()=>l(Di??(Di=Jt()))),v.f|=en)),P>Y.size&&Bs(),!g)if(p.set(D,Y),W){for(const[be,qe]of o)Y.has(be)||D.skip_effect(qe.e);D.oncommit(S),D.ondiscard(y)}else S(D);r(b)}),L={effect:x,items:o,pending:p,outrogroups:null,fallback:v};g=!1}function fr(e){for(;e!==null&&(e.f&Rt)===0;)e=e.next;return e}function oc(e,t,n,a,i){var fe,be,qe,ee,me,xe,$,le,Q;var l=(a&$s)!==0,s=t.length,o=e.items,c=fr(e.effect.first),u,v=null,b,f=[],p=[],g,S,y,x;if(l)for(x=0;x<s;x+=1)g=t[x],S=i(g,x),y=o.get(S).e,(y.f&en)===0&&((be=(fe=y.nodes)==null?void 0:fe.a)==null||be.measure(),(b??(b=new Set)).add(y));for(x=0;x<s;x+=1){if(g=t[x],S=i(g,x),y=o.get(S).e,e.outrogroups!==null)for(const se of e.outrogroups)se.pending.delete(y),se.done.delete(y);if((y.f&wt)!==0&&(ra(y),l&&((ee=(qe=y.nodes)==null?void 0:qe.a)==null||ee.unfix(),(b??(b=new Set)).delete(y))),(y.f&en)!==0)if(y.f^=en,y===c)mr(y,null,n);else{var L=v?v.next:c;y===e.effect.last&&(e.effect.last=y.prev),y.prev&&(y.prev.next=y.next),y.next&&(y.next.prev=y.prev),hn(e,v,y),hn(e,y,L),mr(y,L,n),v=y,f=[],p=[],c=fr(v.next);continue}if(y!==c){if(u!==void 0&&u.has(y)){if(f.length<p.length){var P=p[0],Y;v=P.prev;var D=f[0],W=f[f.length-1];for(Y=0;Y<f.length;Y+=1)mr(f[Y],P,n);for(Y=0;Y<p.length;Y+=1)u.delete(p[Y]);hn(e,D.prev,W.next),hn(e,v,D),hn(e,W,P),c=P,v=W,x-=1,f=[],p=[]}else u.delete(y),mr(y,c,n),hn(e,y.prev,y.next),hn(e,y,v===null?e.effect.first:v.next),hn(e,v,y),v=y;continue}for(f=[],p=[];c!==null&&c!==y;)(u??(u=new Set)).add(c),p.push(c),c=fr(c.next);if(c===null)continue}(y.f&en)===0&&f.push(y),v=y,c=fr(y.next)}if(e.outrogroups!==null){for(const se of e.outrogroups)se.pending.size===0&&(Ga(e,ua(se.done)),(me=e.outrogroups)==null||me.delete(se));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||u!==void 0){var H=[];if(u!==void 0)for(y of u)(y.f&wt)===0&&H.push(y);for(;c!==null;)(c.f&wt)===0&&c!==e.fallback&&H.push(c),c=fr(c.next);var ke=H.length;if(ke>0){var G=(a&fl)!==0&&s===0?n:null;if(l){for(x=0;x<ke;x+=1)($=(xe=H[x].nodes)==null?void 0:xe.a)==null||$.measure();for(x=0;x<ke;x+=1)(Q=(le=H[x].nodes)==null?void 0:le.a)==null||Q.fix()}sc(e,H,G)}}l&&tn(()=>{var se,N;if(b!==void 0)for(y of b)(N=(se=y.nodes)==null?void 0:se.a)==null||N.apply()})}function cc(e,t,n,a,i,l,s,o){var c=(s&Qs)!==0?(s&eo)===0?Io(n,!1,!1):wn(n):null,u=(s&Xs)!==0?wn(i):null;return{v:c,i:u,e:bt(()=>(l(t,c??n,u??i,o),()=>{e.delete(a)}))}}function mr(e,t,n){if(e.nodes)for(var a=e.nodes.start,i=e.nodes.end,l=t&&(t.f&en)===0?t.nodes.start:n;a!==null;){var s=Or(a);if(l.before(a),a===i)return;a=s}}function hn(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function Xe(e,t,n,a,i){var o;var l=(o=t.$$slots)==null?void 0:o[n],s=!1;l===!0&&(l=t.children,s=!0),l===void 0||l(e,s?()=>a:a)}function rs(e,t,n){var a=new di(e);cr(()=>{var i=t()??null;a.ensure(i,i&&(l=>n(l,i)))},yn)}function uc(e,t,n,a,i,l){var s=null,o=e,c=new di(o,!1);cr(()=>{const u=t()||null;var v=so;if(u===null){c.ensure(null,null);return}return c.ensure(u,b=>{if(u){if(s=Ll(u,v),rr(s,s),a){var f=null,p=s.appendChild(Jt());a(s,p),f==null||f.remove()}De.nodes.end=s,b.before(s)}}),()=>{}},yn),fa(()=>{})}function vc(e,t){var n;n=document.head.appendChild(Jt());try{cr(()=>{var a=bt(()=>t(n));a.f|=cl})}finally{}}function fc(e,t){var n=void 0,a;Bl(()=>{n!==(n=t())&&(a&&(ft(a),a=null),n&&(a=bt(()=>{Fr(()=>n(e))})))})}function as(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=as(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}function dc(){for(var e,t,n=0,a="",i=arguments.length;n<i;n++)(e=arguments[n])&&(t=as(e))&&(a&&(a+=" "),a+=t);return a}function hc(e){return typeof e=="object"?dc(e):e??""}const Ci=[...` 	
\r\f \v\uFEFF`];function _c(e,t,n){var a=e==null?"":""+e;if(t&&(a=a?a+" "+t:t),n){for(var i of Object.keys(n))if(n[i])a=a?a+" "+i:i;else if(a.length)for(var l=i.length,s=0;(s=a.indexOf(i,s))>=0;){var o=s+l;(s===0||Ci.includes(a[s-1]))&&(o===a.length||Ci.includes(a[o]))?a=(s===0?"":a.substring(0,s))+a.substring(o+1):s=o}}return a===""?null:a}function qi(e,t=!1){var n=t?" !important;":";",a="";for(var i of Object.keys(e)){var l=e[i];l!=null&&l!==""&&(a+=" "+i+": "+l+n)}return a}function ma(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function pc(e,t){if(t){var n="",a,i;if(Array.isArray(t)?(a=t[0],i=t[1]):a=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var l=!1,s=0,o=!1,c=[];a&&c.push(...Object.keys(a).map(ma)),i&&c.push(...Object.keys(i).map(ma));var u=0,v=-1;const S=e.length;for(var b=0;b<S;b++){var f=e[b];if(o?f==="/"&&e[b-1]==="*"&&(o=!1):l?l===f&&(l=!1):f==="/"&&e[b+1]==="*"?o=!0:f==='"'||f==="'"?l=f:f==="("?s++:f===")"&&s--,!o&&l===!1&&s===0){if(f===":"&&v===-1)v=b;else if(f===";"||b===S-1){if(v!==-1){var p=ma(e.substring(u,v).trim());if(!c.includes(p)){f!==";"&&b++;var g=e.substring(u,b).trim();n+=" "+g+";"}}u=b+1,v=-1}}}}return a&&(n+=qi(a)),i&&(n+=qi(i,!0)),n=n.trim(),n===""?null:n}return e==null?null:String(e)}function Ve(e,t,n,a,i,l){var s=e[Na];if(s!==n||s===void 0){var o=_c(n,a,l);o==null?e.removeAttribute("class"):t?e.className=o:e.setAttribute("class",o),e[Na]=n}else if(l&&i!==l)for(var c in l){var u=!!l[c];(i==null||u!==!!i[c])&&e.classList.toggle(c,u)}return l}function ya(e,t={},n,a){for(var i in n){var l=n[i];t[i]!==l&&(n[i]==null?e.style.removeProperty(i):e.style.setProperty(i,l,a))}}function ar(e,t,n,a){var i=e[Aa];if(i!==t){var l=pc(t,a);l==null?e.removeAttribute("style"):e.style.cssText=l,e[Aa]=t}else a&&(Array.isArray(a)?(ya(e,n==null?void 0:n[0],a[0]),ya(e,n==null?void 0:n[1],a[1],"important")):ya(e,n,a));return a}function mt(e,t,n=!1){if(e.multiple){if(t==null)return;if(!ti(t))return uo();for(var a of e.options)a.selected=t.includes(Sr(a));return}for(a of e.options){var i=Sr(a);if(Fo(i,t)){a.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function Ct(e){var t=new MutationObserver(()=>{"__value"in e&&mt(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),fa(()=>{t.disconnect()})}function aa(e,t,n=t){var a=new WeakSet,i=!0;wl(e,"change",l=>{var s=l?"[selected]":":checked",o;if(e.multiple)o=[].map.call(e.querySelectorAll(s),Sr);else{var c=e.querySelector(s)??e.querySelector("option:not([disabled])");o=c&&Sr(c)}n(o),e.__value=o,oe!==null&&a.add(oe)}),Fr(()=>{var l=t();if(e===document.activeElement){var s=oe;if(a.has(s))return}if(mt(e,l,i),i&&l===void 0){var o=e.querySelector(":checked");o!==null&&(l=Sr(o),n(l))}e.__value=l,i=!1}),Ct(e)}function Sr(e){return"__value"in e?e.__value:e.value}const dr=Symbol("class"),hr=Symbol("style"),is=Symbol("is custom element"),ls=Symbol("is html"),gc=va?"input":"INPUT",bc=va?"option":"OPTION",mc=va?"select":"SELECT",yc=va?"progress":"PROGRESS";function Pn(e,t){var n=da(e);n.value===(n.value=t??void 0)||e.value===t&&(t!==0||e.nodeName!==yc)||(e.value=t??"")}function Tr(e,t){var n=da(e);n.checked!==(n.checked=t??void 0)&&(e.checked=t)}function wc(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function Me(e,t,n,a){var i=da(e);i[t]!==(i[t]=n)&&(t==="loading"&&(e[Ls]=n),n==null?e.removeAttribute(t):typeof n!="string"&&ss(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function kc(e,t,n,a,i=!1,l=!1){var s=da(e),o=s[is],c=!s[ls],u=t||{},v=e.nodeName===bc;for(var b in t)b in n||(n[b]=null);n.class?n.class=hc(n.class):n[dr]&&(n.class=null),n[hr]&&(n.style??(n.style=null));var f=ss(e);if(e.nodeName===gc&&"type"in n&&("value"in n||"__value"in n)){var p=n.type;(p!==u.type||p===void 0&&e.hasAttribute("type"))&&(u.type=p,Me(e,"type",p))}for(const D in n){let W=n[D];if(v&&D==="value"&&W==null){e.value=e.__value="",u[D]=W;continue}if(D==="class"){var g=e.namespaceURI==="http://www.w3.org/1999/xhtml";Ve(e,g,W,a,t==null?void 0:t[dr],n[dr]),u[D]=W,u[dr]=n[dr];continue}if(D==="style"){ar(e,W,t==null?void 0:t[hr],n[hr]),u[D]=W,u[hr]=n[hr];continue}var S=u[D];if(!(W===S&&!(W===void 0&&e.hasAttribute(D)))){u[D]=W;var y=D[0]+D[1];if(y!=="$$")if(y==="on"){const H={},ke="$$"+D;let G=D.slice(2);var x=Qo(G);if(Jo(G)&&(G=G.slice(0,-7),H.capture=!0),!x&&S){if(W!=null)continue;e.removeEventListener(G,u[ke],H),u[ke]=null}if(x)O(G,e,W),dt([G]);else if(W!=null){let fe=function(be){u[D].call(this,be)};var Y=fe;u[ke]=es(G,e,fe,H)}}else if(D==="style")Me(e,D,W);else if(D==="autofocus")Vr(e,!!W);else if(!o&&(D==="__value"||D==="value"&&W!=null))e.value=e.__value=W;else if(D==="selected"&&v)wc(e,W);else{var L=D;c||(L=$o(L));var P=L==="defaultValue"||L==="defaultChecked";if(W==null&&!o&&!P)if(s[D]=null,L==="value"||L==="checked"){let H=e;const ke=t===void 0;if(L==="value"){let G=H.defaultValue;H.removeAttribute(L),H.defaultValue=G,H.value=H.__value=ke?G:null}else{let G=H.defaultChecked;H.removeAttribute(L),H.defaultChecked=G,H.checked=ke?G:!1}}else e.removeAttribute(D);else P||f.includes(L)&&(o||typeof W!="string")?(e[L]=W,L in s&&(s[L]=rt)):typeof W!="function"&&Me(e,L,W)}}}return u}function Ni(e,t,n=[],a=[],i=[],l,s=!1,o=!1){kl(i,n,a,c=>{var u=void 0,v={},b=e.nodeName===mc,f=!1;if(Bl(()=>{var g=t(...c.map(r)),S=kc(e,u,g,l,s,o);f&&b&&"value"in g&&mt(e,g.value);for(let x of Object.getOwnPropertySymbols(v))g[x]||ft(v[x]);for(let x of Object.getOwnPropertySymbols(g)){var y=g[x];x.description===oo&&(!u||y!==u[x])&&(v[x]&&ft(v[x]),v[x]=bt(()=>fc(e,()=>y))),S[x]=y}u=S}),b){var p=e;Fr(()=>{mt(p,u.value,!0),Ct(p)})}f=!0})}function da(e){return e[Wr]??(e[Wr]={[is]:e.nodeName.includes("-"),[ls]:e.namespaceURI===hl})}var Ai=new Map;function ss(e){var t=e.getAttribute("is")||e.nodeName,n=Ai.get(t);if(n)return n;Ai.set(t,n=[]);for(var a,i=e,l=Element.prototype;l!==i;){a=ll(i);for(var s in a)a[s].set&&s!=="innerHTML"&&s!=="textContent"&&s!=="innerText"&&n.push(s);i=ni(i)}return n}function yt(e,t,n=t){var a=new WeakSet;wl(e,"input",async i=>{var l=i?e.defaultValue:e.value;if(l=wa(e)?ka(l):l,n(l),oe!==null&&a.add(oe),await Ko(),l!==(l=t())){var s=e.selectionStart,o=e.selectionEnd,c=e.value.length;if(e.value=l??"",o!==null){var u=e.value.length;s===o&&o===c&&u>c?(e.selectionStart=u,e.selectionEnd=u):(e.selectionStart=s,e.selectionEnd=Math.min(o,u))}}}),pt(t)==null&&e.value&&(n(wa(e)?ka(e.value):e.value),oe!==null&&a.add(oe)),ui(()=>{var i=t();if(e===document.activeElement){var l=oe;if(a.has(l))return}wa(e)&&i===ka(e.value)||e.type==="date"&&!i&&!e.value||i!==e.value&&(e.value=i??"")})}function wa(e){var t=e.type;return t==="number"||t==="range"}function ka(e){return e===""?null:+e}function xa(e,t){return e===t||(e==null?void 0:e[rn])===t}function xc(e={},t,n,a){var i=Qe.r,l=De;return Fr(()=>{var s,o;return ui(()=>{s=o,o=[],pt(()=>{xa(n(...o),e)||(t(e,...o),s&&xa(n(...s),e)&&t(null,...s))})}),()=>{let c=l;for(;c!==i&&c.parent!==null&&c.parent.f&qa;)c=c.parent;const u=()=>{o&&xa(n(...o),e)&&t(null,...o)},v=c.teardown;c.teardown=()=>{u(),v==null||v()}}}),e}function Sc(e=!1){const t=Qe,n=t.l.u;if(!n)return;let a=()=>xn(t.s);if(e){let i=0,l={};const s=$n(()=>{let o=!1;const c=t.s;for(const u in c)c[u]!==l[u]&&(l[u]=c[u],o=!0);return o&&i++,i});a=()=>r(s)}n.b.length&&Bo(()=>{Ii(t,a),Da(n.b)}),ut(()=>{const i=pt(()=>n.m.map(Fs));return()=>{for(const l of i)typeof l=="function"&&l()}}),n.a.length&&ut(()=>{Ii(t,a),Da(n.a)})}function Ii(e,t){if(e.l.s)for(const n of e.l.s)r(n);t()}const Tc={get(e,t){if(!e.exclude.includes(t))return r(e.version),t in e.special?e.special[t]():e.props[t]},set(e,t,n){if(!(t in e.special)){var a=De;try{Bt(e.parent_effect),e.special[t]=Yt({get[t](){return e.props[t]}},t,dl)}finally{Bt(a)}}return e.special[t](n),Ti(e.version),!0},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},deleteProperty(e,t){return e.exclude.includes(t)||(e.exclude.push(t),Ti(e.version)),!0},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function Ke(e,t){return new Proxy({props:e,exclude:t,special:{},version:wn(0),parent_effect:De},Tc)}const Ec={get(e,t){let n=e.props.length;for(;n--;){let a=e.props[n];if(vr(a)&&(a=a()),typeof a=="object"&&a!==null&&t in a)return a[t]}},set(e,t,n){let a=e.props.length;for(;a--;){let i=e.props[a];vr(i)&&(i=i());const l=bn(i,t);if(l&&l.set)return l.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let a=e.props[n];if(vr(a)&&(a=a()),typeof a=="object"&&a!==null&&t in a){const i=bn(a,t);return i&&!i.configurable&&(i.configurable=!0),i}}},has(e,t){if(t===rn||t===vl)return!1;for(let n of e.props)if(vr(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(e){const t=[];for(let n of e.props)if(vr(n)&&(n=n()),!!n){for(const a in n)t.includes(a)||t.push(a);for(const a of Object.getOwnPropertySymbols(n))t.includes(a)||t.push(a)}return t}};function $e(...e){return new Proxy({props:e},Ec)}function Yt(e,t,n,a){var Y;var i=!sr||(n&no)!==0,l=(n&ro)!==0,s=(n&ao)!==0,o=a,c=!0,u=void 0,v=()=>s&&i?(u??(u=$n(a)),r(u)):(c&&(c=!1,o=s?pt(a):a),o);let b;if(l){var f=rn in e||vl in e;b=((Y=bn(e,t))==null?void 0:Y.set)??(f&&t in e?D=>e[t]=D:void 0)}var p,g=!1;l?[p,g]=bo(()=>e[t]):p=e[t],p===void 0&&a!==void 0&&(p=v(),b&&(i&&Vs(),b(p)));var S;if(i?S=()=>{var D=e[t];return D===void 0?v():(c=!0,D)}:S=()=>{var D=e[t];return D!==void 0&&(o=void 0),D===void 0?o:D},i&&(n&dl)===0)return S;if(b){var y=e.$$legacy;return(function(D,W){return arguments.length>0?((!i||!W||y||g)&&b(W?S():D),D):S()})}var x=!1,L=((n&to)!==0?$n:ii)(()=>(x=!1,S()));l&&r(L);var P=De;return(function(D,W){if(arguments.length>0){const H=W?r(L):i&&l?Ie(D):D;return d(L,H),x=!0,o!==void 0&&(o=H),D}return dn&&x||(P.f&qt)!==0?L.v:r(L)})}function hi(e){Qe===null&&Rs(),sr&&Qe.l!==null?Pc(Qe).m.push(e):ut(()=>{const t=pt(e);if(typeof t=="function")return t})}function Pc(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const jc="5";var al;typeof window<"u"&&((al=window.__svelte??(window.__svelte={})).v??(al.v=new Set)).add(jc);const Mc="/timer";function os(){const e=window.location.hash,t=e.startsWith("#")?e.slice(1):e;return!t||t==="/"?Mc:t}let _i=I(Ie(os())),Oi=!1;function Dc(){Oi||typeof window>"u"||(Oi=!0,window.addEventListener("hashchange",()=>{d(_i,os(),!0)}))}Dc();function Cc(){return r(_i)}function cs(e){if(window.location.hash===`#${e}`){d(_i,e,!0);return}window.location.hash=e}const qc=[{path:"/timer",label:"番茄钟"},{path:"/tasks",label:"任务"},{path:"/stats",label:"统计"},{path:"/journal",label:"手账"},{path:"/settings",label:"设置"}],us="pomoflow:settings:v1",yr={focusMinutes:25,shortBreakMinutes:5,longBreakMinutes:15,longBreakInterval:4,autoChain:!0,soundEnabled:!0,desktopNotificationEnabled:!0};function Nc(){if(typeof localStorage>"u")return{...yr};const e=localStorage.getItem(us);if(!e)return{...yr};try{const t=JSON.parse(e);return{...yr,...t}}catch{return{...yr}}}function vs(e){typeof localStorage>"u"||localStorage.setItem(us,JSON.stringify(e))}let Un=I(Ie(Nc()));function vn(){return r(Un)}function Ac(e){d(Un,{...r(Un),...e},!0),vs(r(Un))}function Ic(){d(Un,{...yr},!0),vs(r(Un))}let Fe=Ie({mode:"focus",secondsLeft:1500,running:!1,sessionId:null,currentTaskId:null,focusCompletedInCycle:0});function fs(){return Fe}function Hn(e){const t=vn();Fe.secondsLeft=e==="focus"?t.focusMinutes*60:e==="short_break"?t.shortBreakMinutes*60:t.longBreakMinutes*60}function Fi(e,t){Fe.running||(Fe.mode="focus",Hn("focus"),Fe.currentTaskId=e,Fe.sessionId=t,Fe.running=!0)}function Sa(){Fe.running&&(Fe.running=!1)}function Ta(){Fe.running||Fe.sessionId===null||(Fe.running=!0)}function ds(e){const t=Fe.mode;Fe.running=!1,Fe.sessionId=null,Fe.currentTaskId=null;const n=vn();if(t==="focus"&&e){Fe.focusCompletedInCycle+=1;const i=Fe.focusCompletedInCycle%n.longBreakInterval===0?"long_break":"short_break";Fe.mode=i,Hn(i),n.autoChain&&(Fe.running=!0)}else t==="focus"&&!e?(Fe.mode="focus",Fe.focusCompletedInCycle=0,Hn("focus")):(Fe.mode="focus",Hn("focus"),n.autoChain&&(Fe.running=!1))}function Li(e){Fe.running||(Fe.mode=e,Hn(e))}function Oc(){if(Fe.running){if(Fe.secondsLeft>0){Fe.secondsLeft-=1;return}ds(!0)}}function Fc(){Fe.running||Hn(Fe.mode)}async function et(e,t={},n){return window.__TAURI_INTERNALS__.invoke(e,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const pi=e=>et("list_tasks",{query:e}),hs=e=>et("upsert_task",{task:e}),Lc=e=>et("complete_task",{id:e}),Rc=e=>et("reopen_task",{id:e}),_s=()=>et("list_projects"),Ri=e=>et("upsert_project",{project:e}),zc=e=>et("delete_project",{id:e}),ps=()=>et("list_tags"),Bc=e=>et("list_tags_for_task",{taskId:e}),gs=(e,t)=>et("set_tags_for_task",{taskId:e,tagIds:t}),Ka=(e,t,n)=>et("start_pomodoro",{taskId:e,projectId:t,duration:n}),Uc=(e,t)=>et("stop_pomodoro",{sessionId:e,isCompleted:t}),Ea=e=>et("get_daily_review",{date:e}),zi=e=>et("upsert_daily_review",{review:e}),bs=e=>et("list_subtasks_for_task",{taskId:e}),Ja=e=>et("upsert_subtask",{subtask:e}),Hc=e=>et("delete_subtask",{id:e}),Wc=()=>et("list_mottos"),Yc=(e,t)=>et("today_completed_minutes",{startMs:e,endMs:t});var Bi;(function(e){e.Year="year",e.Month="month",e.TwoWeeks="twoWeeks",e.Week="week",e.Day="day",e.Hour="hour",e.Minute="minute",e.Second="second"})(Bi||(Bi={}));var Ui;(function(e){e[e.None=0]="None",e[e.Min=1]="Min",e[e.Low=2]="Low",e[e.Default=3]="Default",e[e.High=4]="High"})(Ui||(Ui={}));var Hi;(function(e){e[e.Secret=-1]="Secret",e[e.Private=0]="Private",e[e.Public=1]="Public"})(Hi||(Hi={}));async function Za(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await et("plugin:notification|is_permission_granted")}async function ms(){return await window.Notification.requestPermission()}function ys(e){typeof e=="string"?new window.Notification(e):new window.Notification(e.title,e)}var Vc=j('<textarea class="review-textarea svelte-1na66lg"></textarea>');function Gc(e,t){st(t,!0);let n=Yt(t,"rows",3,2),a=I(Ie(pt(()=>t.value??"")));ut(()=>{const s=t.value??"";s!==r(a)&&d(a,s,!0)});function i(){const s=r(a).trim();s===""?t.value&&t.onDelete&&t.onDelete():s!==(t.value??"")&&t.onSave(s)}var l=Vc();V(()=>{Me(l,"placeholder",t.placeholder??"写下今天的复盘..."),Me(l,"rows",n())}),Ft("blur",l,i),yt(l,()=>r(a),s=>d(a,s)),k(e,l),ot()}_o();/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Kc={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Jc=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Wi=(...e)=>e.filter((t,n,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===n).join(" ").trim();var Zc=ns("<svg><!><!></svg>");function tt(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]),a=Ke(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);st(t,!1);let i=Yt(t,"name",8,void 0),l=Yt(t,"color",8,"currentColor"),s=Yt(t,"size",8,24),o=Yt(t,"strokeWidth",8,2),c=Yt(t,"absoluteStrokeWidth",8,!1),u=Yt(t,"iconNode",24,()=>[]);Sc();var v=Zc();Ni(v,(p,g,S)=>({...Kc,...p,...a,width:s(),height:s(),stroke:l(),"stroke-width":g,class:S}),[()=>Jc(a)?void 0:{"aria-hidden":"true"},()=>(xn(c()),xn(o()),xn(s()),pt(()=>c()?Number(o())*24/Number(s()):o())),()=>(xn(Wi),xn(i()),xn(n),pt(()=>Wi("lucide-icon","lucide",i()?`lucide-${i()}`:"",n.class)))]);var b=h(v);Le(b,1,u,Pr,(p,g)=>{var S=ie(()=>ol(r(g),2));let y=()=>r(S)[0],x=()=>r(S)[1];var L=We(),P=Re(L);uc(P,y,!0,(Y,D)=>{Ni(Y,()=>({...x()}))}),k(p,L)});var f=_(b);Xe(f,t,"default",{}),k(e,v),ot()}function Qc(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];tt(e,$e({name:"calendar-check"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function Xc(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];tt(e,$e({name:"calendar-days"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function $c(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];tt(e,$e({name:"calendar-range"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function eu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];tt(e,$e({name:"chart-column"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function tu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M20 6 9 17l-5-5"}]];tt(e,$e({name:"check"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function ia(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m6 9 6 6 6-6"}]];tt(e,$e({name:"chevron-down"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function la(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m9 18 6-6-6-6"}]];tt(e,$e({name:"chevron-right"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function Qa(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];tt(e,$e({name:"circle-check"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function Yi(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];tt(e,$e({name:"clock"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function nu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];tt(e,$e({name:"download"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function ru(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];tt(e,$e({name:"ellipsis-vertical"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function au(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];tt(e,$e({name:"folder"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function iu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];tt(e,$e({name:"pencil"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function ws(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];tt(e,$e({name:"play"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function Xa(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];tt(e,$e({name:"plus"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function lu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];tt(e,$e({name:"quote"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function su(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];tt(e,$e({name:"refresh-cw"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function ou(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];tt(e,$e({name:"search"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function cu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];tt(e,$e({name:"sun"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function uu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];tt(e,$e({name:"sunrise"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function Vi(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];tt(e,$e({name:"target"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function vu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];tt(e,$e({name:"trash-2"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}function fu(e,t){const n=Ke(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];tt(e,$e({name:"x"},()=>n,{get iconNode(){return a},children:(i,l)=>{var s=We(),o=Re(s);Xe(o,t,"default",{}),k(i,s)},$$slots:{default:!0}}))}const Gi=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function Ki(){return Gi[Math.floor(Math.random()*Gi.length)]}var du=j('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985" aria-label="换一条" title="换一条"><!></button></div></div>');function hu(e,t){st(t,!0);let n=I(Ie([])),a=I(Ie(new Set)),i=I(null);async function l(){try{d(n,await Wc(),!0)}catch{d(n,[],!0)}}hi(()=>{l()}),ut(()=>{var v;if(!r(i))if(r(n).length>0){const b=r(n)[0];d(i,{text:b.text,author:(v=b.author)!=null&&v.trim()?b.author:"佚名"},!0);const f=new Set(r(a));f.add(b.id),d(a,f,!0)}else d(i,Ki(),!0)});function s(){var v;if(r(n).length>0){let b=r(n).filter(g=>!r(a).has(g.id));b.length===0&&(d(a,new Set,!0),b=r(n));const f=b[0];d(i,{text:f.text,author:(v=f.author)!=null&&v.trim()?f.author:"佚名"},!0);const p=new Set(r(a));p.add(f.id),d(a,p,!0)}else d(i,Ki(),!0)}var o=We(),c=Re(o);{var u=v=>{var b=du(),f=h(b),p=h(f),g=h(p);lu(g,{size:20});var S=_(p,2),y=h(S),x=h(y),L=_(y,2),P=h(L),Y=_(S,2),D=h(Y);su(D,{size:14}),V(()=>{ne(x,r(i).text),ne(P,`—— ${r(i).author??""}`)}),O("click",Y,s),k(v,b)};K(c,v=>{r(i)&&v(u)})}k(e,o),ot()}dt(["click"]);var Ji=j("<option> </option>"),Zi=j('<button type="button"> </button>'),_u=j('<button type="button" class="clear svelte-13vcwbh">清除筛选</button>'),pu=j('<div class="empty svelte-13vcwbh">暂无任务</div>'),gu=j('<button type="button" class="expander svelte-13vcwbh"><!></button>'),bu=j('<span class="expander-placeholder svelte-13vcwbh"></span>'),Pa=j('<span class="meta-item svelte-13vcwbh"> </span>'),mu=j('<button type="button" class="start svelte-13vcwbh" aria-label="开始专注" title="开始专注"><!></button>'),yu=j('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),wu=j('<div class="subs svelte-13vcwbh"></div>'),ku=j('<div class="task-card svelte-13vcwbh"><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),xu=j('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh">今日专注</h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh">分钟</span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh">任务列表</h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project">项目</label> <select id="timer-filter-project" class="svelte-13vcwbh"><option>全部</option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag">标签</label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option>全部</option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh">优先级</span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh">日期</span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function Su(e,t){st(t,!0);const n={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let a=I(Ie(new Set));function i(F){const A=new Set(r(a));A.has(F)?A.delete(F):A.add(F),d(a,A,!0)}function l(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const s=ie(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),o=["high","medium","low"],c={high:"高",medium:"中",low:"低"},u=["today","tomorrow","this_week"],v={today:"今日",tomorrow:"明日",this_week:"本周"};function b(F){var A;return F?((A=t.projects.find(ce=>ce.id===F))==null?void 0:A.name)??"":""}var f=xu(),p=h(f),g=h(p),S=_(h(g),2),y=h(S),x=h(y),L=_(g,2),P=_(h(L),2),Y=h(P),D=_(h(Y),2),W=h(D);W.value=W.__value="";var H=_(W);Le(H,17,()=>t.projects,F=>F.id,(F,A)=>{var ce=Ji(),re=h(ce),pe={};V(()=>{ne(re,r(A).name),pe!==(pe=r(A).id)&&(ce.value=(ce.__value=r(A).id)??"")}),k(F,ce)});var ke;Ct(D);var G=_(Y,2),fe=_(h(G),2),be=h(fe);be.value=be.__value="";var qe=_(be);Le(qe,17,()=>t.tags,F=>F.id,(F,A)=>{var ce=Ji(),re=h(ce),pe={};V(()=>{ne(re,r(A).name),pe!==(pe=r(A).id)&&(ce.value=(ce.__value=r(A).id)??"")}),k(F,ce)});var ee;Ct(fe);var me=_(P,2),xe=_(h(me),2);Le(xe,20,()=>o,F=>F,(F,A)=>{var ce=Zi();let re;var pe=h(ce);V(()=>{re=Ve(ce,1,"opt svelte-13vcwbh",null,re,{active:t.filter.priority===A}),ne(pe,c[A])}),O("click",ce,()=>t.onFilterChange({priority:t.filter.priority===A?null:A})),k(F,ce)});var $=_(xe,4);Le($,20,()=>u,F=>F,(F,A)=>{var ce=Zi();let re;var pe=h(ce);V(()=>{re=Ve(ce,1,"opt svelte-13vcwbh",null,re,{active:t.filter.date===A}),ne(pe,v[A])}),O("click",ce,()=>t.onFilterChange({date:t.filter.date===A?null:A})),k(F,ce)});var le=_(me,2);{var Q=F=>{var A=_u();O("click",A,l),k(F,A)};K(le,F=>{r(s)&&F(Q)})}var se=_(p,2),N=h(se);{var z=F=>{var A=pu();k(F,A)};K(N,F=>{t.tasks.length===0&&F(z)})}var C=_(N,2);Le(C,17,()=>t.tasks,F=>F.id,(F,A)=>{const ce=ie(()=>r(A).status==="completed"),re=ie(()=>{var w;return(((w=r(A).subtasks)==null?void 0:w.length)??0)>0}),pe=ie(()=>r(a).has(r(A).id)),te=ie(()=>r(re)?(r(A).subtasks??[]).filter(w=>w.is_completed).length:0),ze=ie(()=>b(r(A).project_id));var Be=ku(),ye=h(Be),E=h(ye);{var q=w=>{var T=gu(),U=h(T);{var Te=Et=>{ia(Et,{size:14})},Ze=Et=>{la(Et,{size:14})};K(U,Et=>{r(pe)?Et(Te):Et(Ze,-1)})}V(()=>Me(T,"aria-label",r(pe)?"折叠子任务":"展开子任务")),O("click",T,()=>i(r(A).id)),k(w,T)},B=w=>{var T=bu();k(w,T)};K(E,w=>{r(re)?w(q):w(B,-1)})}var X=_(E,2),ge=_(X,2),de=h(ge);let je;var he=h(de),Ne=_(de,2),ue=h(Ne),ve=h(ue),Ee=_(ue,2);{var R=w=>{var T=Pa(),U=h(T);V(()=>{var Te;return ne(U,`· ${r(te)??""}/${((Te=r(A).subtasks)==null?void 0:Te.length)??0??""}`)}),k(w,T)};K(Ee,w=>{r(re)&&w(R)})}var ae=_(Ee,2);{var Se=w=>{var T=Pa(),U=h(T);V(()=>ne(U,r(ze))),k(w,T)};K(ae,w=>{r(ze)&&w(Se)})}var Je=_(ae,2);{var Ye=w=>{var T=Pa(),U=h(T);V(Te=>ne(U,Te),[()=>r(A).due_date.slice(0,10)]),k(w,T)};K(Je,w=>{r(A).due_date&&w(Ye)})}var it=_(ge,2);{var He=w=>{var T=mu(),U=h(T);ws(U,{size:10,color:"#fff",fill:"#fff"}),O("click",T,()=>t.onStartTask(r(A))),k(w,T)};K(it,w=>{r(ce)||w(He)})}var Z=_(ye,2);{var J=w=>{var T=wu();Le(T,21,()=>r(A).subtasks??[],U=>U.id,(U,Te)=>{var Ze=yu();let Et;var kt=h(Ze),ha=_(kt,2),Rr=h(ha);V(()=>{Et=Ve(Ze,1,"sub-row svelte-13vcwbh",null,Et,{done:r(Te).is_completed}),Tr(kt,r(Te).is_completed),ne(Rr,r(Te).title)}),O("change",kt,zr=>t.onToggleSubtask(r(Te).id,zr.currentTarget.checked)),k(U,Ze)}),k(w,T)};K(Z,w=>{r(re)&&r(pe)&&w(J)})}V(()=>{ar(X,`background-color: ${n[r(A).priority||"none"]??n.none??""}`),je=Ve(de,1,"title svelte-13vcwbh",null,je,{done:r(ce)}),ne(he,r(A).title),ne(ve,`${r(A).completed_pomodoros??0??""}/${r(A).estimated_pomodoros??0??""} 番茄`)}),k(F,Be)}),V(()=>{ne(x,t.todayMinutes),ke!==(ke=t.filter.project??"")&&(D.value=(D.__value=t.filter.project??"")??"",mt(D,t.filter.project??"")),ee!==(ee=t.filter.tag??"")&&(fe.value=(fe.__value=t.filter.tag??"")??"",mt(fe,t.filter.tag??""))}),O("change",D,F=>t.onFilterChange({project:F.currentTarget.value||null})),O("change",fe,F=>t.onFilterChange({tag:F.currentTarget.value||null})),k(e,f),ot()}dt(["change","click"]);var Tu=j('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt">专注完成</h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button">确定</button></div></div>');function Eu(e,t){st(t,!0);function n(o){o.target===o.currentTarget&&t.onClose()}function a(o){o.key==="Escape"&&t.onClose()}var i=We();Ft("keydown",Ua,function(...o){var c;(c=t.open?a:void 0)==null||c.apply(this,o)});var l=Re(i);{var s=o=>{var c=Tu(),u=h(c),v=_(h(u),4),b=h(v),f=_(v,2);V(()=>ne(b,t.message)),O("click",c,n),O("click",f,function(...p){var g;(g=t.onClose)==null||g.apply(this,p)}),k(o,c)};K(l,o=>{t.open&&o(s)})}k(e,i),ot()}dt(["click"]);var Pu=j('<div class="task-title svelte-17qnxlg"> </div>'),ju=j('<option class="svelte-17qnxlg"> </option>'),Mu=j('<div class="task-picker svelte-17qnxlg"><label for="task-select" class="svelte-17qnxlg">本次专注:</label> <select id="task-select" class="svelte-17qnxlg"><option class="svelte-17qnxlg">-- 选择任务 --</option><!></select></div>'),Du=j('<div class="error svelte-17qnxlg" role="alert"> </div>'),Cu=j('<button class="btn primary svelte-17qnxlg">暂停</button> <button class="btn danger svelte-17qnxlg">停止</button>',1),qu=j('<button class="btn primary svelte-17qnxlg">继续</button> <button class="btn danger svelte-17qnxlg">停止</button>',1),Nu=j('<button class="btn primary svelte-17qnxlg"> </button>'),Au=j('<div class="layout svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist" aria-label="计时器模式"><button role="tab">专注</button> <button role="tab">短休息</button> <button role="tab">长休息</button></div> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-label svelte-17qnxlg"> </div> <!></div></div> <!> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> 今日已完成 <b class="svelte-17qnxlg"> </b> 个番茄 <!></div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg">今日日复盘</div> <!></div> <!></div></div> <!> <!></div>');function Qi(e,t){st(t,!0);let n=I(Ie([])),a=I(Ie([])),i=I(Ie([])),l=I(""),s=I(null),o=I(0),c=I(null),u=I(!1),v=I(Ie({project:null,tag:null,priority:null,date:null})),b=I(!1),f=I("");const p=ie(fs),g=ie(()=>{const M=vn();return r(p).mode==="focus"?M.focusMinutes*60:r(p).mode==="short_break"?M.shortBreakMinutes*60:M.longBreakMinutes*60}),S=ie(()=>r(g)>0?1-r(p).secondsLeft/r(g):0),y=ie(()=>Math.floor(r(p).secondsLeft/60)),x=ie(()=>r(p).secondsLeft%60),L=ie(()=>`${String(r(y)).padStart(2,"0")}:${String(r(x)).padStart(2,"0")}`),P=ie(()=>r(i).find(M=>M.id===r(l))??null),Y=ie(()=>!r(p).running&&r(p).sessionId===null&&r(p).mode==="focus"&&r(l)!==""&&!r(u)),D=ie(()=>r(p).mode==="focus"),W=ie(()=>r(p).mode==="focus"?"专注":r(p).mode==="short_break"?"短休息":"长休息");function H(){const M=new Date,_e=new Date(M.getFullYear(),M.getMonth(),M.getDate(),0,0,0,0),Ae=new Date(M.getFullYear(),M.getMonth(),M.getDate()+1,0,0,0,0);return{startMs:_e.getTime(),endMs:Ae.getTime()}}function ke(){const M=new Date,_e=new Date(M.getFullYear(),M.getMonth(),1,0,0,0,0),ht=new Date(M.getFullYear(),M.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:_e.getTime(),monthEndMs:ht}}function G(){const M=new Date;return`${M.getFullYear()}-${String(M.getMonth()+1).padStart(2,"0")}-${String(M.getDate()).padStart(2,"0")}`}let fe=!1;ut(()=>{fe&&!r(p).running&&r(p).secondsLeft===0&&be(),fe=r(p).running});function be(){r(P)?d(f,`太棒了!休息一下吧 —— ${r(P).title}`):d(f,"太棒了!休息一下吧"),d(b,!0),le(),vn().desktopNotificationEnabled&&qe("专注完成",r(f))}async function qe(M,_e){try{let Ae=await Za();if(Ae||(Ae=await ms()==="granted"),!Ae)return;ys({title:M,body:_e})}catch(Ae){console.warn("notification failed",Ae)}}async function ee(){try{d(n,await _s(),!0)}catch(M){console.warn("refresh projects",M)}}async function me(){try{d(a,await ps(),!0)}catch(M){console.warn("refresh tags",M)}}async function xe(){try{const M=ke();d(i,await pi({status:null,month_start_ms:M.monthStartMs,month_end_ms:M.monthEndMs,project_id:r(v).project,tag_id:r(v).tag,priority:r(v).priority,date:r(v).date,limit:null}),!0)}catch(M){console.warn("refresh tasks",M)}}async function $(){try{const M=await Ea(G());d(s,(M==null?void 0:M.content)??null,!0)}catch(M){console.warn("refresh review",M)}}async function le(){try{const M=H();d(o,await Yc(M.startMs,M.endMs),!0)}catch(M){console.warn("refresh minutes",M)}}ut(()=>{r(v),xe()}),hi(async()=>{await Promise.all([ee(),me(),xe(),$(),le()])});async function Q(){if(r(Y)){d(u,!0),d(c,null);try{const M=vn(),_e=await Ka(r(l),null,M.focusMinutes);Fi(r(l),_e.id)}catch(M){d(c,String(M),!0)}finally{d(u,!1)}}}async function se(M){if(!r(p).sessionId)return;const _e=r(p).sessionId;ds(M);try{await Uc(_e,M)}catch(Ae){d(c,String(Ae),!0)}}function N(M){r(p).running||Li(M)}async function z(M){r(p).running&&await se(!1),d(l,M.id,!0),r(p).mode!=="focus"&&Li("focus");try{const _e=await Ka(M.id,M.project_id??null,M.pomodoro_duration??vn().focusMinutes);Fi(M.id,_e.id)}catch(_e){d(c,String(_e),!0)}}async function C(M,_e){try{const Ae=await Promise.all(r(i).map(ln=>bs(ln.id)));let ht=null;for(const ln of Ae){const Qt=ln.find(ur=>ur.id===M);if(Qt){ht=Qt;break}}if(!ht)return;await Ja({...ht,is_completed:_e}),await xe(),await le()}catch(Ae){console.warn("toggle subtask",Ae)}}async function F(M){try{const _e=G(),Ae=await Ea(_e),ht=Ae?{...Ae,content:M}:{id:crypto.randomUUID(),date:_e,content:M,updated_at:new Date().toISOString()};await zi(ht),d(s,M,!0)}catch(_e){console.warn("save review",_e)}}async function A(){try{const M=G(),_e=await Ea(M);_e&&await zi({..._e,content:""}),d(s,null)}catch(M){console.warn("delete review",M)}}function ce(){d(b,!1)}const re=280,pe=12,te=(re-pe)/2,ze=2*Math.PI*te,Be=ie(()=>ze*(1-r(S)));var ye=Au(),E=h(ye),q=h(E),B=h(q),X=h(B);let ge;var de=_(X,2);let je;var he=_(de,2);let Ne;var ue=_(B,2),ve=h(ue);Me(ve,"width",re),Me(ve,"height",re),Me(ve,"viewBox","0 0 280 280");var Ee=h(ve);Me(Ee,"cx",re/2),Me(Ee,"cy",re/2),Me(Ee,"r",te),Me(Ee,"stroke-width",pe);var R=_(Ee);Me(R,"cx",re/2),Me(R,"cy",re/2),Me(R,"r",te),Me(R,"stroke-width",pe),Me(R,"stroke-dasharray",ze),Me(R,"transform","rotate(-90 140 140)");var ae=_(ve,2),Se=h(ae),Je=h(Se),Ye=_(Se,2),it=h(Ye),He=_(Ye,2);{var Z=M=>{var _e=Pu(),Ae=h(_e);V(()=>{Me(_e,"title",r(P).title),ne(Ae,r(P).title)}),k(M,_e)};K(He,M=>{r(P)&&M(Z)})}var J=_(ue,2);{var w=M=>{var _e=Mu(),Ae=_(h(_e),2),ht=h(Ae);ht.value=ht.__value="";var ln=_(ht);Le(ln,17,()=>r(i).filter(Qt=>Qt.status==="active"),Qt=>Qt.id,(Qt,ur)=>{var Br=ju(),Ms=h(Br),mi={};V(()=>{ne(Ms,r(ur).title),mi!==(mi=r(ur).id)&&(Br.value=(Br.__value=r(ur).id)??"")}),k(Qt,Br)}),V(()=>Ae.disabled=r(p).running),aa(Ae,()=>r(l),Qt=>d(l,Qt)),k(M,_e)};K(J,M=>{r(D)&&M(w)})}var T=_(J,2);{var U=M=>{var _e=Du(),Ae=h(_e);V(()=>ne(Ae,`⚠ ${r(c)??""}`)),k(M,_e)};K(T,M=>{r(c)&&M(U)})}var Te=_(T,2),Ze=h(Te);{var Et=M=>{var _e=Cu(),Ae=Re(_e),ht=_(Ae,2);O("click",Ae,function(...ln){Sa==null||Sa.apply(this,ln)}),O("click",ht,()=>se(!1)),k(M,_e)},kt=M=>{var _e=qu(),Ae=Re(_e),ht=_(Ae,2);O("click",Ae,function(...ln){Ta==null||Ta.apply(this,ln)}),O("click",ht,()=>se(!1)),k(M,_e)},ha=M=>{var _e=Nu(),Ae=h(_e);V(()=>{_e.disabled=!r(Y),ne(Ae,r(u)?"启动中...":"开始")}),O("click",_e,Q),k(M,_e)};K(Ze,M=>{r(p).running?M(Et):r(p).sessionId?M(kt,1):M(ha,-1)})}var Rr=_(Te,2),zr=_(h(Rr),2),xs=h(zr),Ss=_(zr,2);{var Ts=M=>{var _e=Va();V(Ae=>ne(_e,`(每 ${Ae??""} 个 → 长休息)`),[()=>vn().longBreakInterval]),k(M,_e)};K(Ss,M=>{r(D)&&M(Ts)})}var gi=_(Rr,2),Es=_(h(gi),2);Gc(Es,{get value(){return r(s)},placeholder:"写下今天的复盘...",rows:2,onSave:F,onDelete:A});var Ps=_(gi,2);hu(Ps,{});var bi=_(E,2);Su(bi,{get todayMinutes(){return r(o)},get projects(){return r(n)},get tags(){return r(a)},get tasks(){return r(i)},get filter(){return r(v)},onFilterChange:M=>d(v,{...r(v),...M},!0),onStartTask:z,onToggleSubtask:C});var js=_(bi,2);Eu(js,{get open(){return r(b)},get message(){return r(f)},onClose:ce}),V(()=>{ge=Ve(X,1,"mode-tab svelte-17qnxlg",null,ge,{active:r(p).mode==="focus"}),X.disabled=r(p).running,Me(X,"aria-selected",r(p).mode==="focus"),je=Ve(de,1,"mode-tab svelte-17qnxlg",null,je,{active:r(p).mode==="short_break"}),de.disabled=r(p).running,Me(de,"aria-selected",r(p).mode==="short_break"),Ne=Ve(he,1,"mode-tab svelte-17qnxlg",null,Ne,{active:r(p).mode==="long_break"}),he.disabled=r(p).running,Me(he,"aria-selected",r(p).mode==="long_break"),Me(R,"stroke-dashoffset",r(Be)),ne(Je,r(L)),ne(it,r(W)),ne(xs,r(p).focusCompletedInCycle)}),O("click",X,()=>N("focus")),O("click",de,()=>N("short_break")),O("click",he,()=>N("long_break")),k(e,ye),ot()}dt(["click"]);//! 截止时间（due_date）相关工具。
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
function $a(e){return!!e&&e.includes("T")}function _t(e){return(e||"").slice(0,10)}function nn(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Iu(){const e=new Date;return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function Xi(e){return`${_t(e)||nn()}T${Iu()}`}function Qr(){const e=new Date;return e.setDate(e.getDate()+1),`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}var Ou=j('<span class="filter-stats svelte-qbpxhc"> </span>'),Fu=j('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <!></button>'),Lu=j('<button type="button" class="add-root svelte-qbpxhc" aria-label="新增根清单" title="新增清单"><!></button>'),Ru=j('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" placeholder="清单名称..." class="add-input svelte-qbpxhc"/></div>'),zu=j('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Bu=j('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),Uu=j('<span class="expand-spacer svelte-qbpxhc"></span>'),Hu=j('<button type="button" class="more-btn svelte-qbpxhc" aria-label="更多操作"><!></button>'),Wu=j('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),Yu=j('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Vu=j('<button type="button" class="ctx-item svelte-qbpxhc"><!> 新增子清单</button>'),Gu=j('<button type="button" class="ctx-item svelte-qbpxhc"><!> 重命名</button>'),Ku=j('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> 删除</button>'),Ju=j('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),Zu=j('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),Qu=j('<div class="empty-hint svelte-qbpxhc">还没有清单,点 + 新建</div>'),Xu=j('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),$u=j('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" placeholder="搜索任务标题..." class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> 清单</button> <!></div> <!></div></aside>');function ev(e,t){st(t,!0);let n=Yt(t,"search",3,""),a=I(!0),i=I(Ie(new Set)),l=I(null),s=I(null),o=I(""),c=I(null),u=I("");function v(N){const z=N.getDay(),C=z===0?-6:1-z,F=new Date(N);return F.setDate(F.getDate()+C),F.setHours(0,0,0,0),F}function b(N){const z=v(N),C=new Date(z);return C.setDate(C.getDate()+6),C.setHours(23,59,59,999),C}function f(N,z){if(z==="journal")return{timeStr:"",count:0};const C=nn(),F=Qr(),A=v(new Date),ce=b(new Date);let re=N;z==="today"&&(re=N.filter(ye=>_t(ye.due_date)===C)),z==="tomorrow"&&(re=N.filter(ye=>_t(ye.due_date)===F)),z==="week"&&(re=N.filter(ye=>{if(!ye.due_date)return!1;const E=new Date(ye.due_date);return E>=A&&E<=ce})),z==="planned"&&(re=N.filter(ye=>ye.due_date!==null&&ye.due_date!==void 0)),z==="completed"&&(re=N.filter(ye=>ye.status==="completed"));const pe=re.reduce((ye,E)=>ye+(E.estimated_pomodoros||0)*(E.pomodoro_duration||25),0),te=Math.floor(pe/60),ze=pe%60;return{timeStr:te>0?`${te}h ${ze}m`:`${ze}m`,count:re.length}}function p(N){const z=new Map,C=[];for(const A of N)z.set(A.id,{...A,children:[],depth:0});for(const A of N){const ce=z.get(A.id);ce&&(A.parent_id&&z.has(A.parent_id)?z.get(A.parent_id).children.push(ce):C.push(ce))}const F=(A,ce)=>{for(const re of A)re.depth=ce,F(re.children,ce+1)};return F(C,0),C}function g(N,z){const C=[];for(const F of N)C.push(F),z.has(F.id)&&F.children.length>0&&C.push(...g(F.children,z));return C}const S=ie(()=>p(t.projects)),y=ie(()=>g(r(S),r(i))),x=[{key:"today",icon:cu,label:"今天"},{key:"tomorrow",icon:uu,label:"明天"},{key:"week",icon:Xc,label:"本周"},{key:"planned",icon:Qc,label:"已计划"},{key:"completed",icon:Qa,label:"已完成"},{key:"journal",icon:$c,label:"手账"}],L=ie(()=>t.selectedProject===null?t.filter:"");function P(N){const z=new Set(r(i));z.has(N)?z.delete(N):z.add(N),d(i,z,!0)}function Y(N){t.onSetFilter(N),t.onSelectProject(null)}var D=$u(),W=h(D),H=h(W);ou(H,{size:14,class:"search-icon"});var ke=_(H,2),G=_(W,2);Le(G,21,()=>x,N=>N.key,(N,z)=>{const C=ie(()=>f(t.tasks,r(z).key)),F=ie(()=>r(L)===r(z).key);var A=Fu();let ce;var re=h(A),pe=h(re);rs(pe,()=>r(z).icon,(ye,E)=>{E(ye,{size:16})});var te=_(pe),ze=_(re,2);{var Be=ye=>{var E=Ou(),q=h(E);V(()=>ne(q,`${r(C).timeStr??""} ${r(C).count??""}`)),k(ye,E)};K(ze,ye=>{r(C).count>0&&ye(Be)})}V(()=>{ce=Ve(A,1,"filter-btn svelte-qbpxhc",null,ce,{active:r(F)}),ne(te,` ${r(z).label??""}`)}),O("click",A,()=>Y(r(z).key)),k(N,A)});var fe=_(G,2),be=h(fe),qe=h(be),ee=h(qe);{var me=N=>{ia(N,{size:14})},xe=N=>{la(N,{size:14})};K(ee,N=>{r(a)?N(me):N(xe,-1)})}var $=_(qe,2);{var le=N=>{var z=Lu(),C=h(z);Xa(C,{size:14}),O("click",z,()=>{d(c,"root"),d(u,"")}),k(N,z)};K($,N=>{t.onCreateProject&&N(le)})}var Q=_(be,2);{var se=N=>{var z=Xu(),C=h(z);{var F=pe=>{var te=Ru(),ze=h(te);Vr(ze,!0),O("keydown",ze,Be=>{if(Be.key==="Enter"){const ye=r(u).trim();ye&&t.onCreateProject&&t.onCreateProject(ye,null),d(c,null),d(u,"")}Be.key==="Escape"&&(d(c,null),d(u,""))}),Ft("blur",ze,()=>{const Be=r(u).trim();Be&&t.onCreateProject&&t.onCreateProject(Be,null),d(c,null),d(u,"")}),yt(ze,()=>r(u),Be=>d(u,Be)),k(pe,te)};K(C,pe=>{r(c)==="root"&&t.onCreateProject&&pe(F)})}var A=_(C,2);Le(A,17,()=>r(y),pe=>pe.id,(pe,te)=>{const ze=ie(()=>t.selectedProject===r(te).id),Be=ie(()=>r(l)===r(te).id),ye=ie(()=>r(s)===r(te).id),E=ie(()=>r(te).children.length>0),q=ie(()=>r(i).has(r(te).id));var B=Zu(),X=h(B);{var ge=ve=>{var Ee=zu(),R=h(Ee);Vr(R,!0),O("keydown",R,ae=>{if(ae.key==="Enter"){const Se=r(o).trim();Se&&t.onUpdateProject&&t.onUpdateProject(r(te).id,Se),d(s,null),d(o,"")}ae.key==="Escape"&&(d(s,null),d(o,""))}),Ft("blur",R,()=>{const ae=r(o).trim();ae&&t.onUpdateProject&&t.onUpdateProject(r(te).id,ae),d(s,null),d(o,"")}),yt(R,()=>r(o),ae=>d(o,ae)),k(ve,Ee)},de=ve=>{var Ee=Wu();let R;var ae=h(Ee),Se=h(ae);{var Je=T=>{var U=Bu(),Te=h(U);{var Ze=kt=>{ia(kt,{size:12})},Et=kt=>{la(kt,{size:12})};K(Te,kt=>{r(q)?kt(Ze):kt(Et,-1)})}V(()=>Me(U,"aria-label",r(q)?"收起":"展开")),O("click",U,kt=>{kt.stopPropagation(),P(r(te).id)}),k(T,U)},Ye=T=>{var U=Uu();k(T,U)};K(Se,T=>{r(E)?T(Je):T(Ye,-1)})}var it=_(Se,2);{let T=ie(()=>r(te).color||"var(--color-accent)");au(it,{size:14,get color(){return r(T)}})}var He=_(it,2),Z=h(He),J=_(ae,2);{var w=T=>{var U=Hu(),Te=h(U);ru(Te,{size:14}),O("click",U,Ze=>{Ze.stopPropagation(),d(l,r(Be)?null:r(te).id,!0)}),k(T,U)};K(J,T=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&r(te).depth<2)&&T(w)})}V(()=>{R=Ve(Ee,1,"node-row svelte-qbpxhc",null,R,{active:r(ze)}),ne(Z,r(te).name)}),O("click",ae,()=>{t.onSelectProject(r(te).id),t.onSetFilter("")}),O("keydown",ae,T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),t.onSelectProject(r(te).id),t.onSetFilter(""))}),k(ve,Ee)};K(X,ve=>{r(ye)?ve(ge):ve(de,-1)})}var je=_(X,2);{var he=ve=>{var Ee=Yu(),R=h(Ee);Vr(R,!0),V(()=>{ar(Ee,`padding-left: ${(r(te).depth+1)*12+12}px;`),Me(R,"placeholder",r(te).depth===0?"子清单名称...":"孙清单名称...")}),O("keydown",R,ae=>{if(ae.key==="Enter"){const Se=r(u).trim();Se&&t.onCreateProject&&t.onCreateProject(Se,r(te).id),d(c,null),d(u,"");const Je=new Set(r(i));Je.add(r(te).id),d(i,Je,!0)}ae.key==="Escape"&&(d(c,null),d(u,""))}),Ft("blur",R,()=>{const ae=r(u).trim();ae&&t.onCreateProject&&t.onCreateProject(ae,r(te).id),d(c,null),d(u,"");const Se=new Set(r(i));Se.add(r(te).id),d(i,Se,!0)}),yt(R,()=>r(u),ae=>d(u,ae)),k(ve,Ee)};K(je,ve=>{r(c)===r(te).id&&t.onCreateProject&&ve(he)})}var Ne=_(je,2);{var ue=ve=>{var Ee=Ju(),R=h(Ee);{var ae=He=>{var Z=Vu(),J=h(Z);Xa(J,{size:12}),O("click",Z,()=>{d(c,r(te).id,!0),d(u,""),d(l,null)}),k(He,Z)};K(R,He=>{t.onCreateProject&&r(te).depth<2&&He(ae)})}var Se=_(R,2);{var Je=He=>{var Z=Gu(),J=h(Z);iu(J,{size:12}),O("click",Z,()=>{d(o,r(te).name,!0),d(s,r(te).id,!0),d(l,null)}),k(He,Z)};K(Se,He=>{t.onUpdateProject&&He(Je)})}var Ye=_(Se,2);{var it=He=>{var Z=Ku(),J=h(Z);vu(J,{size:12}),O("click",Z,()=>{t.onDeleteProject(r(te).id),d(l,null)}),k(He,Z)};K(Ye,He=>{t.onDeleteProject&&He(it)})}k(ve,Ee)};K(Ne,ve=>{r(Be)&&!r(ye)&&ve(ue)})}V(()=>ar(B,`padding-left: ${r(te).depth*12}px;`)),k(pe,B)});var ce=_(A,2);{var re=pe=>{var te=Qu();k(pe,te)};K(ce,pe=>{t.projects.length===0&&r(c)!=="root"&&pe(re)})}k(N,z)};K(Q,N=>{r(a)&&N(se)})}V(()=>Pn(ke,n())),O("input",ke,N=>{var z;return(z=t.onSearchChange)==null?void 0:z.call(t,N.currentTarget.value)}),O("click",qe,()=>d(a,!r(a))),k(e,D),ot()}dt(["input","click","keydown"]);var tv=j('<span class="pri-badge svelte-3041n"> </span>'),nv=j('<span class="tag svelte-3041n"> </span>'),rv=j('<div class="row-2 svelte-3041n"></div>'),av=j("<span></span>"),iv=j('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),lv=j('<span class="due svelte-3041n"> </span>'),sv=j('<button type="button" class="start svelte-3041n" aria-label="开始专注" title="开始专注"><!></button>'),ov=j('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function ks(e,t){st(t,!0);const n=ie(()=>t.task.status==="completed"),a=ie(()=>t.task.estimated_pomodoros||0),i=ie(()=>t.task.completed_pomodoros||0),l=ie(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),s=ie(()=>({high:"高",medium:"中",low:"低",none:""})[t.task.priority||"none"]),o=ie(()=>t.task.due_date?_t(t.task.due_date):"");var c=ov();let u;var v=h(c);let b;var f=h(v);{var p=ee=>{tu(ee,{size:12,strokeWidth:3,color:"#fff"})};K(f,ee=>{r(n)&&ee(p)})}var g=_(v,2),S=h(g),y=h(S);{var x=ee=>{var me=tv(),xe=h(me);V(()=>{ar(me,`--pri-color: ${r(l)??""}`),ne(xe,r(s))}),k(ee,me)};K(y,ee=>{t.task.priority&&t.task.priority!=="none"&&ee(x)})}var L=_(y,2),P=h(L),Y=_(S,2);{var D=ee=>{var me=rv();Le(me,21,()=>t.task.tags.slice(0,3),xe=>xe.id,(xe,$)=>{var le=nv(),Q=h(le);V(()=>ne(Q,`#${r($).name??""}`)),k(xe,le)}),k(ee,me)};K(Y,ee=>{t.task.tags&&t.task.tags.length>0&&ee(D)})}var W=_(Y,2),H=h(W);{var ke=ee=>{var me=iv(),xe=h(me);Le(xe,21,()=>Array.from({length:Math.min(r(a),8)}),Pr,(Q,se,N)=>{var z=av();let C;V(()=>C=Ve(z,1,"dot svelte-3041n",null,C,{filled:N<r(i)})),k(Q,z)});var $=_(xe,2),le=h($);V(()=>ne(le,`${r(i)??""}/${r(a)??""} 番茄`)),k(ee,me)};K(H,ee=>{r(a)>0&&ee(ke)})}var G=_(H,2);{var fe=ee=>{var me=lv(),xe=h(me);V(()=>ne(xe,r(o))),k(ee,me)};K(G,ee=>{r(o)&&ee(fe)})}var be=_(g,2);{var qe=ee=>{var me=sv(),xe=h(me);ws(xe,{size:13,color:"#fff",fill:"#fff"}),O("click",me,$=>{var le;$.stopPropagation(),(le=t.onStart)==null||le.call(t,t.task)}),k(ee,me)};K(be,ee=>{!r(n)&&t.onStart&&ee(qe)})}V(()=>{u=Ve(c,1,"task-card svelte-3041n",null,u,{selected:t.selected,done:r(n)}),Me(c,"aria-label",t.task.title),b=Ve(v,1,"check svelte-3041n",null,b,{checked:r(n)}),Me(v,"aria-label",r(n)?"标记为未完成":"标记为完成"),ne(P,t.task.title)}),O("click",c,()=>t.onSelect(t.task)),O("keydown",c,ee=>{(ee.key==="Enter"||ee.key===" ")&&(ee.preventDefault(),t.onSelect(t.task))}),O("click",v,ee=>{ee.stopPropagation(),t.onToggle(t.task.id)}),k(e,c),ot()}dt(["click","keydown"]);var cv=j('<div class="empty svelte-q02l1n">还没有标签,在「设置 → 标签」里创建</div>'),uv=j('<span class="check svelte-q02l1n">✓</span>'),vv=j('<button type="button"><!> <span class="name svelte-q02l1n"> </span></button>'),fv=j('<div class="chips svelte-q02l1n" role="group" aria-label="标签多选"></div>');function dv(e,t){st(t,!0);const n=ie(()=>new Set(t.selected));function a(u){const v=new Set(r(n));v.has(u)?v.delete(u):v.add(u),t.onChange([...v])}function i(u){return`--chip-color: ${u&&u.length>0?u:"var(--color-accent)"};`}var l=We(),s=Re(l);{var o=u=>{var v=cv();k(u,v)},c=u=>{var v=fv();Le(v,21,()=>t.tags,b=>b.id,(b,f)=>{const p=ie(()=>r(n).has(r(f).id));var g=vv();let S;var y=h(g);{var x=Y=>{var D=uv();k(Y,D)};K(y,Y=>{r(p)&&Y(x)})}var L=_(y,2),P=h(L);V(Y=>{S=Ve(g,1,"chip svelte-q02l1n",null,S,{on:r(p)}),ar(g,Y),Me(g,"aria-pressed",r(p)),ne(P,r(f).name)},[()=>i(r(f).color)]),O("click",g,()=>a(r(f).id)),k(b,g)}),k(u,v)};K(s,u=>{t.tags.length===0?u(o):u(c,-1)})}k(e,l),ot()}dt(["click"]);var hv=j('<input type="text" class="title-input svelte-1t5orp1" aria-label="编辑子任务"/>'),_v=j('<button type="button" class="title-btn svelte-1t5orp1" title="双击编辑"> </button>'),pv=j('<li><input type="checkbox" aria-label="切换子任务完成" class="svelte-1t5orp1"/> <!> <button type="button" class="del svelte-1t5orp1" aria-label="删除子任务">×</button></li>');function gv(e,t){st(t,!0);let n=I(!1),a=I(Ie(pt(()=>t.subtask.title))),i=I(null);ut(()=>{r(n)||d(a,t.subtask.title,!0)});function l(){d(a,t.subtask.title,!0),d(n,!0),queueMicrotask(()=>{var x;return(x=r(i))==null?void 0:x.focus()})}function s(){const x=r(a).trim();r(n)&&(d(n,!1),x&&x!==t.subtask.title?t.onChange({...t.subtask,title:x}):x||d(a,t.subtask.title,!0))}function o(){d(a,t.subtask.title,!0),d(n,!1)}function c(x){x.key==="Enter"?(x.preventDefault(),s()):x.key==="Escape"&&(x.preventDefault(),o())}function u(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var v=pv();let b;var f=h(v),p=_(f,2);{var g=x=>{var L=hv();xc(L,P=>d(i,P),()=>r(i)),Ft("blur",L,s),O("keydown",L,c),yt(L,()=>r(a),P=>d(a,P)),k(x,L)},S=x=>{var L=_v(),P=h(L);V(()=>ne(P,t.subtask.title)),O("dblclick",L,l),k(x,L)};K(p,x=>{r(n)?x(g):x(S,-1)})}var y=_(p,2);V(()=>{b=Ve(v,1,"row svelte-1t5orp1",null,b,{done:t.subtask.is_completed}),Tr(f,t.subtask.is_completed)}),O("change",f,u),O("click",y,()=>t.onDelete(t.subtask.id)),k(e,v),ot()}dt(["change","keydown","dblclick","click"]);var bv=j("<span> </span>"),ja=j("<option> </option>"),mv=j('<button type="button" class="link svelte-1qppxcb">清除</button>'),yv=j('<aside class="panel svelte-1qppxcb" aria-label="任务详情"><header class="head svelte-1qppxcb"><div class="meta svelte-1qppxcb"><span class="proj svelte-1qppxcb"> </span> <!></div> <button class="close svelte-1qppxcb" aria-label="关闭">×</button></header> <input class="title svelte-1qppxcb" aria-label="标题"/> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="desc">描述</label> <textarea id="desc" class="desc svelte-1qppxcb" rows="4" placeholder="补充细节..."></textarea></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="proj">清单</label> <select id="proj" class="svelte-1qppxcb"><option>无项目</option><!></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="pri">优先级</label> <select id="pri" class="svelte-1qppxcb"><option>无</option><option>高</option><option>中</option><option>低</option></select></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="due">截止日期</label> <div class="row-inline svelte-1qppxcb"><input id="due" type="datetime-local" class="svelte-1qppxcb"/> <!></div></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="reminder">提醒</label> <select id="reminder" class="svelte-1qppxcb"></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="repeat">重复</label> <select id="repeat" class="svelte-1qppxcb"></select></div></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb">标签</span> <!></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb">子任务</span> <ul class="sub-list svelte-1qppxcb"></ul> <form class="sub-add svelte-1qppxcb"><input type="text" placeholder="添加子任务..." aria-label="新子任务" class="svelte-1qppxcb"/> <button type="submit" class="svelte-1qppxcb">添加</button></form></section></aside>');function wv(e,t){st(t,!0);let n=I(Ie(pt(()=>t.task.title))),a=I(Ie(pt(()=>t.task.description??""))),i=I(Ie(pt(()=>l(t.task.due_date))));ut(()=>{d(n,t.task.title,!0),d(a,t.task.description??"",!0),d(i,l(t.task.due_date),!0)});function l(w){if(!w)return"";try{const T=new Date(w);if(isNaN(T.getTime()))return"";const U=T.getTimezoneOffset();return new Date(T.getTime()-U*6e4).toISOString().slice(0,16)}catch{return""}}function s(w){if(!w)return null;try{const T=new Date(w);return isNaN(T.getTime())?null:T.toISOString()}catch{return null}}function o(){return new Date().toISOString()}async function c(w){try{await hs({...t.task,...w,updated_at:o()}),t.onChanged()}catch(T){console.error("patch task failed",T),alert(`保存失败:${T}`)}}async function u(){const w=r(n).trim();!w||w===t.task.title||await c({title:w})}async function v(){r(a)!==(t.task.description??"")&&await c({description:r(a)})}async function b(){const w=s(r(i));w!==t.task.due_date&&await c({due_date:w})}function f(){d(i,""),c({due_date:null})}let p=I(Ie([]));ut(()=>{g()});async function g(){try{const w=await Bc(t.task.id);d(p,w.map(T=>T.id),!0)}catch(w){console.error("load tags failed",w)}}async function S(w){const T=r(p);d(p,w,!0);try{await gs(t.task.id,w),t.onChanged()}catch(U){d(p,T,!0),alert(`设置标签失败:${U}`)}}let y=I(Ie([])),x=I("");ut(()=>{L()});async function L(){try{d(y,await bs(t.task.id),!0)}catch(w){console.error("load subtasks failed",w)}}async function P(){const w=r(x).trim();if(!w)return;d(x,"");const T={id:crypto.randomUUID(),task_id:t.task.id,title:w,is_completed:!1,position:r(y).length,created_at:o(),updated_at:o()};try{const U=await Ja(T);d(y,[...r(y),U],!0),t.onChanged()}catch(U){alert(`添加子任务失败:${U}`)}}async function Y(w){const T=r(y).find(U=>U.id===w.id);d(y,r(y).map(U=>U.id===w.id?w:U),!0);try{await Ja(w),t.onChanged()}catch(U){T&&d(y,r(y).map(Te=>Te.id===T.id?T:Te),!0),alert(`更新子任务失败:${U}`)}}async function D(w){const T=r(y);d(y,r(y).filter(U=>U.id!==w),!0);try{await Hc(w),t.onChanged()}catch(U){d(y,T,!0),alert(`删除子任务失败:${U}`)}}const W=[{value:"none",label:"不提醒"},{value:"on_time",label:"准时"},{value:"minutes5",label:"提前 5 分钟"},{value:"minutes30",label:"提前 30 分钟"},{value:"hour1",label:"提前 1 小时"},{value:"day1",label:"提前 1 天"},{value:"days2",label:"提前 2 天"}],H=[{value:"none",label:"不重复"},{value:"daily",label:"每天"},{value:"weekdays",label:"工作日"},{value:"weekly",label:"每周"},{value:"monthly",label:"每月"},{value:"yearly",label:"每年"}];function ke(w){var T;return w?((T=t.projects.find(U=>U.id===w))==null?void 0:T.name)??"未知":"无项目"}function G(w){return{high:"高",medium:"中",low:"低",none:""}[w??"none"]??""}var fe=yv(),be=h(fe),qe=h(be),ee=h(qe),me=h(ee),xe=_(ee,2);{var $=w=>{var T=bv(),U=h(T);V(Te=>{Ve(T,1,`pri pri-${t.task.priority??""}`,"svelte-1qppxcb"),ne(U,Te)},[()=>G(t.task.priority)]),k(w,T)};K(xe,w=>{t.task.priority!=="none"&&w($)})}var le=_(qe,2),Q=_(be,2),se=_(Q,2),N=_(h(se),2),z=_(se,2),C=h(z),F=_(h(C),2),A=h(F);A.value=A.__value="";var ce=_(A);Le(ce,17,()=>t.projects,w=>w.id,(w,T)=>{var U=ja(),Te=h(U),Ze={};V(()=>{ne(Te,r(T).name),Ze!==(Ze=r(T).id)&&(U.value=(U.__value=r(T).id)??"")}),k(w,U)});var re;Ct(F);var pe=_(C,2),te=_(h(pe),2),ze=h(te);ze.value=ze.__value="none";var Be=_(ze);Be.value=Be.__value="high";var ye=_(Be);ye.value=ye.__value="medium";var E=_(ye);E.value=E.__value="low";var q;Ct(te);var B=_(z,2),X=_(h(B),2),ge=h(X),de=_(ge,2);{var je=w=>{var T=mv();O("click",T,f),k(w,T)};K(de,w=>{r(i)&&w(je)})}var he=_(B,2),Ne=h(he),ue=_(h(Ne),2);Le(ue,21,()=>W,w=>w.value,(w,T)=>{var U=ja(),Te=h(U),Ze={};V(()=>{ne(Te,r(T).label),Ze!==(Ze=r(T).value)&&(U.value=(U.__value=r(T).value)??"")}),k(w,U)});var ve;Ct(ue);var Ee=_(Ne,2),R=_(h(Ee),2);Le(R,21,()=>H,w=>w.value,(w,T)=>{var U=ja(),Te=h(U),Ze={};V(()=>{ne(Te,r(T).label),Ze!==(Ze=r(T).value)&&(U.value=(U.__value=r(T).value)??"")}),k(w,U)});var ae;Ct(R);var Se=_(he,2),Je=_(h(Se),2);dv(Je,{get tags(){return t.allTags},get selected(){return r(p)},onChange:S});var Ye=_(Se,2),it=_(h(Ye),2);Le(it,21,()=>r(y),w=>w.id,(w,T)=>{gv(w,{get subtask(){return r(T)},onChange:Y,onDelete:D})});var He=_(it,2),Z=h(He),J=_(Z,2);V((w,T)=>{ne(me,w),re!==(re=t.task.project_id??"")&&(F.value=(F.__value=t.task.project_id??"")??"",mt(F,t.task.project_id??"")),q!==(q=t.task.priority)&&(te.value=(te.__value=t.task.priority)??"",mt(te,t.task.priority)),ve!==(ve=t.task.reminder??"none")&&(ue.value=(ue.__value=t.task.reminder??"none")??"",mt(ue,t.task.reminder??"none")),ae!==(ae=t.task.repeat??"none")&&(R.value=(R.__value=t.task.repeat??"none")??"",mt(R,t.task.repeat??"none")),J.disabled=T},[()=>ke(t.task.project_id),()=>!r(x).trim()]),O("click",le,function(...w){var T;(T=t.onClose)==null||T.apply(this,w)}),Ft("blur",Q,u),O("keydown",Q,w=>{w.key==="Enter"&&(w.preventDefault(),w.currentTarget.blur())}),yt(Q,()=>r(n),w=>d(n,w)),Ft("blur",N,v),yt(N,()=>r(a),w=>d(a,w)),O("change",F,w=>{const T=w.currentTarget.value;c({project_id:T||null})}),O("change",te,w=>{const T=w.currentTarget.value;c({priority:T})}),Ft("blur",ge,b),yt(ge,()=>r(i),w=>d(i,w)),O("change",ue,w=>{const T=w.currentTarget.value;c({reminder:T})}),O("change",R,w=>{const T=w.currentTarget.value;c({repeat:T})}),Ft("submit",He,w=>{w.preventDefault(),P()}),yt(Z,()=>r(x),w=>d(x,w)),k(e,fe),ot()}dt(["click","keydown","change"]);var kv=j('<div class="group-tasks svelte-1u318f6"></div>'),xv=j('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),Sv=j('<div class="grouped svelte-1u318f6"></div>');function Tv(e,t){st(t,!0);const n="unscheduled";let a=I(Ie(new Set));const i=["周日","周一","周二","周三","周四","周五","周六"];function l(u,v){const b=new Date(u+"T00:00:00"),f=v.reduce((p,g)=>p+(g.estimated_pomodoros||0)*(g.pomodoro_duration||25),0);return`${u}（${i[b.getDay()]}）| ${f} 分钟`}function s(u){const v=new Set(r(a));v.has(u)?v.delete(u):v.add(u),d(a,v,!0)}const o=ie(()=>{const u=new Map;for(const b of t.tasks){let f;t.groupBy==="completed_at"?b.completed_at?f=_t(b.completed_at):f=n:f=b.due_date?_t(b.due_date):n,u.has(f)||u.set(f,[]),u.get(f).push(b)}const v=Array.from(u.entries());return v.sort((b,f)=>b[0]===n?1:f[0]===n?-1:new Date(b[0]).getTime()-new Date(f[0]).getTime()),v});var c=Sv();Le(c,21,()=>r(o),([u,v])=>u,(u,v)=>{var b=ie(()=>ol(r(v),2));let f=()=>r(b)[0],p=()=>r(b)[1];const g=ie(()=>r(a).has(f()));var S=xv(),y=h(S),x=h(y),L=h(x),P=_(x,2),Y=h(P);{var D=G=>{la(G,{size:16})},W=G=>{ia(G,{size:16})};K(Y,G=>{r(g)?G(D):G(W,-1)})}var H=_(y,2);{var ke=G=>{var fe=kv();Le(fe,21,p,be=>be.id,(be,qe)=>{{let ee=ie(()=>{var me;return((me=t.selectedTask)==null?void 0:me.id)===r(qe).id});ks(be,{get task(){return r(qe)},get selected(){return r(ee)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),k(G,fe)};K(H,G=>{r(g)||G(ke)})}V(G=>{Me(y,"aria-expanded",!r(g)),ne(L,G)},[()=>f()===n?"未排期":l(f(),p())]),O("click",y,()=>s(f())),k(u,S)}),k(e,c),ot()}dt(["click"]);var Ev=j('<span class="unit svelte-1i37zgo"> </span>'),Pv=j('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function kn(e,t){var n=Pv();let a;var i=h(n),l=h(i);rs(l,()=>t.icon,(f,p)=>{p(f,{size:18,strokeWidth:1.8})});var s=_(i,2),o=h(s),c=_(o);{var u=f=>{var p=Ev(),g=h(p);V(()=>ne(g,t.unit)),k(f,p)};K(c,f=>{t.unit&&f(u)})}var v=_(s,2),b=h(v);V(()=>{a=Ve(n,1,"stat-card svelte-1i37zgo",null,a,{accent:t.accent}),ne(o,t.value),ne(b,t.label)}),k(e,n)}var $i=j("<option> </option>"),jv=j('<button type="button" class="clear-btn svelte-1ko7jxa">清除筛选</button>'),Mv=j('<button type="button" class="export-btn svelte-1ko7jxa"><!> 导出</button>'),Dv=j('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa" aria-label="项目筛选"><option>全部项目</option><!></select> <select class="select svelte-1ko7jxa" aria-label="标签筛选"><option>全部标签</option><!></select> <select class="select svelte-1ko7jxa" aria-label="优先级筛选"><option>全部优先级</option><option>高</option><option>中</option><option>低</option><option>无</option></select> <button type="button">本周</button> <button type="button">本月</button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa">到期日</span> <input type="date" class="date svelte-1ko7jxa" aria-label="起始日期"/> <span class="hint svelte-1ko7jxa">至</span> <input type="date" class="date svelte-1ko7jxa" aria-label="结束日期"/> <!></div></div>');function el(e,t){st(t,!0);const n=ie(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function a(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var i=Dv(),l=h(i),s=h(l),o=h(s);o.value=o.__value="";var c=_(o);Le(c,17,()=>t.projects,$=>$.id,($,le)=>{var Q=$i(),se=h(Q),N={};V(()=>{ne(se,r(le).name),N!==(N=r(le).id)&&(Q.value=(Q.__value=r(le).id)??"")}),k($,Q)});var u;Ct(s);var v=_(s,2),b=h(v);b.value=b.__value="";var f=_(b);Le(f,17,()=>t.tags,$=>$.id,($,le)=>{var Q=$i(),se=h(Q),N={};V(()=>{ne(se,r(le).name),N!==(N=r(le).id)&&(Q.value=(Q.__value=r(le).id)??"")}),k($,Q)});var p;Ct(v);var g=_(v,2),S=h(g);S.value=S.__value="";var y=_(S);y.value=y.__value="high";var x=_(y);x.value=x.__value="medium";var L=_(x);L.value=L.__value="low";var P=_(L);P.value=P.__value="none";var Y;Ct(g);var D=_(g,2);let W;var H=_(D,2);let ke;var G=_(H,2);{var fe=$=>{var le=jv();O("click",le,a),k($,le)};K(G,$=>{r(n)&&$(fe)})}var be=_(l,2),qe=_(h(be),2),ee=_(qe,4),me=_(ee,2);{var xe=$=>{var le=Mv(),Q=h(le);nu(Q,{size:14}),O("click",le,function(...se){var N;(N=t.onExport)==null||N.apply(this,se)}),k($,le)};K(me,$=>{t.onExport&&$(xe)})}V(($,le)=>{Me(s,"title",$),u!==(u=t.filterProject??"")&&(s.value=(s.__value=t.filterProject??"")??"",mt(s,t.filterProject??"")),Me(v,"title",le),p!==(p=t.filterTag??"")&&(v.value=(v.__value=t.filterTag??"")??"",mt(v,t.filterTag??"")),Y!==(Y=t.filterPriority??"")&&(g.value=(g.__value=t.filterPriority??"")??"",mt(g,t.filterPriority??"")),W=Ve(D,1,"preset-btn svelte-1ko7jxa",null,W,{on:t.filterPreset==="week"}),ke=Ve(H,1,"preset-btn svelte-1ko7jxa",null,ke,{on:t.filterPreset==="month"}),Pn(qe,t.filterStartDate),Pn(ee,t.filterEndDate)},[()=>{var $;return t.filterProject!==null?($=t.projects.find(le=>le.id===t.filterProject))==null?void 0:$.name:"全部项目"},()=>{var $;return t.filterTag!==null?($=t.tags.find(le=>le.id===t.filterTag))==null?void 0:$.name:"全部标签"}]),O("change",s,$=>{const le=$.currentTarget.value;t.setFilterProject(le||null)}),O("change",v,$=>{const le=$.currentTarget.value;t.setFilterTag(le||null)}),O("change",g,$=>{const le=$.currentTarget.value;t.setFilterPriority(le||null)}),O("click",D,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),O("click",H,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),O("change",qe,$=>t.setFilterStartDate($.currentTarget.value)),O("change",ee,$=>t.setFilterEndDate($.currentTarget.value)),k(e,i),ot()}dt(["change","click"]);var Cv=ns('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function qv(e,t){let n=Yt(t,"size",3,14),a=Yt(t,"filled",3,!0);var i=Cv(),l=h(i);V(()=>{Me(i,"width",n()),Me(i,"height",n()),Me(l,"fill",a()?"currentColor":"#e5e7eb")}),k(e,i)}var tl=j('<button type="button"> </button>'),Nv=j('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl">星期</span> <div class="weekdays svelte-1h3pyjl"></div></div>'),Av=j('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl">日期</span> <div class="month-grid svelte-1h3pyjl"></div></div>'),Iv=j('<div class="warn svelte-1h3pyjl"> </div>'),Ov=j('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl">自定义重复</h3> <button type="button" class="close-btn svelte-1h3pyjl" aria-label="关闭"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl">开始日期</label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl">结束日期</label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl">间隔</label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl">类型</label> <select id="rc-type" class="input svelte-1h3pyjl"><option>按日</option><option>按周</option><option>按月</option><option>按年</option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl">取消</button> <button type="button" class="btn-confirm svelte-1h3pyjl">确定</button></div></div></div>');function Fv(e,t){st(t,!0);function n(){const P=new Date,Y=D=>String(D).padStart(2,"0");return`${P.getFullYear()}-${Y(P.getMonth()+1)}-${Y(P.getDate())}T${Y(P.getHours())}:${Y(P.getMinutes())}`}function a(){return`${new Date().getFullYear()}-12-31T23:59`}const i=["一","二","三","四","五","六","日"];let l=I(Ie(n())),s=I(Ie(a())),o=I(1),c=I("week"),u=I(Ie([])),v=I(Ie([]));ut(()=>{if(t.open&&t.initialConfig)try{const P=JSON.parse(t.initialConfig);d(l,P.startDate||n(),!0),d(s,P.endDate||a(),!0),d(o,P.interval||1,!0),d(c,P.type||"week",!0),d(u,P.weekdays||[],!0),d(v,P.monthDays||[],!0)}catch{}});function b(P,Y,D){D(P.includes(Y)?P.filter(W=>W!==Y):[...P,Y].sort((W,H)=>W-H))}function f(){const P={interval:r(o),type:r(c),startDate:r(l),endDate:r(s)};r(c)==="week"&&(P.weekdays=r(u)),r(c)==="month"&&(P.monthDays=r(v)),t.onConfirm(JSON.stringify(P))}let p=ie(()=>r(c)==="week"&&r(u).length===0||r(c)==="month"&&r(v).length===0);function g(P){P.target===P.currentTarget&&t.onClose()}function S(P){P.key==="Escape"&&t.onClose()}var y=We(),x=Re(y);{var L=P=>{var Y=Ov(),D=h(Y),W=h(D),H=_(h(W),2),ke=h(H);fu(ke,{size:18});var G=_(W,2),fe=h(G),be=h(fe),qe=_(h(be),2),ee=_(be,2),me=_(h(ee),2),xe=_(fe,2),$=h(xe),le=_(h($),2),Q=_($,2),se=_(h(Q),2),N=h(se);N.value=N.__value="day";var z=_(N);z.value=z.__value="week";var C=_(z);C.value=C.__value="month";var F=_(C);F.value=F.__value="year";var A=_(xe,2);{var ce=q=>{var B=Nv(),X=_(h(B),2);Le(X,21,()=>i,Pr,(ge,de,je)=>{const he=ie(()=>je+1),Ne=ie(()=>r(u).includes(r(he)));var ue=tl();let ve;var Ee=h(ue);V(()=>{ve=Ve(ue,1,"weekday-btn svelte-1h3pyjl",null,ve,{active:r(Ne)}),ne(Ee,r(de))}),O("click",ue,()=>b(r(u),r(he),R=>d(u,R,!0))),k(ge,ue)}),k(q,B)};K(A,q=>{r(c)==="week"&&q(ce)})}var re=_(A,2);{var pe=q=>{var B=Av(),X=_(h(B),2);Le(X,20,()=>Array.from({length:31},(ge,de)=>de+1),Pr,(ge,de)=>{const je=ie(()=>r(v).includes(de));var he=tl();let Ne;var ue=h(he);V(()=>{Ne=Ve(he,1,"month-btn svelte-1h3pyjl",null,Ne,{active:r(je)}),ne(ue,de)}),O("click",he,()=>b(r(v),de,ve=>d(v,ve,!0))),k(ge,he)}),k(q,B)};K(re,q=>{r(c)==="month"&&q(pe)})}var te=_(re,2);{var ze=q=>{var B=Iv(),X=h(B);V(()=>ne(X,r(c)==="week"?"请选择至少一个星期":"请选择至少一个日期")),k(q,B)};K(te,q=>{r(p)&&q(ze)})}var Be=_(G,2),ye=h(Be),E=_(ye,2);V(()=>E.disabled=r(p)),O("click",Y,g),O("keydown",Y,S),O("click",H,function(...q){var B;(B=t.onClose)==null||B.apply(this,q)}),yt(qe,()=>r(l),q=>d(l,q)),yt(me,()=>r(s),q=>d(s,q)),yt(le,()=>r(o),q=>d(o,q)),aa(se,()=>r(c),q=>d(c,q)),O("click",ye,function(...q){var B;(B=t.onClose)==null||B.apply(this,q)}),O("click",E,f),k(P,Y)};K(x,P=>{t.open&&P(L)})}k(e,y),ot()}dt(["click","keydown"]);var Lv=j('<button type="button"><!></button>'),Rv=j('<div class="error svelte-1vpobhk"> </div>'),Ma=j("<option> </option>"),zv=j('<button type="button"> </button>'),Bv=j('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk">标签</span> <div class="tag-chips svelte-1vpobhk"></div></div>'),Uv=j('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk">清单</label> <select id="tf-proj" class="svelte-1vpobhk"><option>无项目</option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk">优先级</label> <select id="tf-pri" class="svelte-1vpobhk"><option>高</option><option>中</option><option>低</option><option>无</option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk">截止日期</label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk">预计番茄</label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk">提醒</label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk">重复</label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk">添加</button></div></div>'),Hv=j('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" placeholder="任务标题..." class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group" aria-label="预计番茄数"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function Wv(e,t){st(t,!0);const n=[{value:"none",label:"不提醒"},{value:"on_time",label:"准时"},{value:"minutes5",label:"提前 5 分钟"},{value:"minutes30",label:"提前 30 分钟"},{value:"hour1",label:"提前 1 小时"},{value:"day1",label:"提前 1 天"},{value:"days2",label:"提前 2 天"}],a=[{value:"none",label:"不重复"},{value:"daily",label:"每天"},{value:"weekdays",label:"工作日"},{value:"weekly",label:"每周"},{value:"monthly",label:"每月"},{value:"yearly",label:"每年"},{value:"custom",label:"自定义..."}];let i=vn(),l=I(""),s=I(Ie(pt(()=>t.defaultProjectId??null))),o=I("medium"),c=I(Ie(pt(()=>t.defaultDueDate||nn()))),u=I(0),v=I("none"),b=I("none"),f=I(null),p=I(!1),g=I(Ie(pt(()=>t.tags.length>0?[t.tags[0].id]:[]))),S=I(!1),y=I(""),x=I(!1);ut(()=>{d(s,t.defaultProjectId??null,!0)}),ut(()=>{d(c,t.defaultDueDate||nn(),!0)}),ut(()=>{t.tags.length>0&&r(g).length===0&&d(g,[t.tags[0].id],!0)});function L(){const Q=new Map;for(const C of t.projects)Q.set(C.id,{...C,children:[]});const se=[];for(const C of t.projects)C.parent_id&&Q.has(C.parent_id)?Q.get(C.parent_id).children.push(C.id):se.push(C.id);const N=[],z=(C,F)=>{const A=Q.get(C),ce=A.children.length>0;N.push({id:A.id,name:A.name,depth:F,disabled:ce});for(const re of A.children)z(re,F+1)};for(const C of se)z(C,0);return N}async function P(){const Q=r(l).trim();if(!Q){d(y,"请输入任务标题");return}let se=r(c)||nn();if(r(v)!=="none"&&!$a(se)){if(!r(x)){d(x,!0),d(y,"提醒任务需要具体时间,请补充时分");return}se=Xi(se)}d(x,!1),d(y,"");try{await t.onAdd({title:Q,project_id:r(s),priority:r(o),due_date:se,estimated_pomodoros:r(u)>0?r(u):1,pomodoro_duration:i.focusMinutes,reminder:r(v)==="none"?null:r(v),repeat:r(b)==="none"?null:r(b),repeat_config:r(b)==="custom"?r(f):null,tag_ids:r(g)}),d(l,""),d(s,t.defaultProjectId??null,!0),d(o,"medium"),d(c,t.defaultDueDate||nn(),!0),d(u,0),d(v,"none"),d(x,!1),d(b,"none"),d(f,null),d(g,t.tags.length>0?[t.tags[0].id]:[],!0),d(S,!1)}catch(N){d(y,String(N),!0)}}function Y(Q){Q.preventDefault(),P()}function D(){r(S)||$a(r(c))||d(c,Xi(r(c)),!0),d(S,!r(S))}var W=Hv(),H=h(W),ke=h(H);Xa(ke,{size:16,class:"plus-icon"});var G=_(ke,2),fe=_(G,2);Le(fe,20,()=>Array.from({length:6},(Q,se)=>se+1),Pr,(Q,se)=>{const N=ie(()=>r(u)>=se);var z=Lv();let C;var F=h(z);qv(F,{size:14,get filled(){return r(N)}}),V(()=>{C=Ve(z,1,"tomato-btn svelte-1vpobhk",null,C,{filled:r(N)}),Me(z,"aria-label",`${se} 个番茄`),Me(z,"aria-pressed",r(N))}),O("click",z,()=>d(u,se,!0)),k(Q,z)});var be=_(fe,2),qe=h(be),ee=_(H,2);{var me=Q=>{var se=Rv(),N=h(se);V(()=>ne(N,r(y))),k(Q,se)};K(ee,Q=>{r(y)&&Q(me)})}var xe=_(ee,2);{var $=Q=>{var se=Uv(),N=h(se),z=_(h(N),2),C=h(z);C.value=C.__value="";var F=_(C);Le(F,17,L,R=>R.id,(R,ae)=>{var Se=Ma(),Je=h(Se),Ye={};V(it=>{Se.disabled=r(ae).disabled,ne(Je,`${it??""}${r(ae).name??""}`),Ye!==(Ye=r(ae).id)&&(Se.value=(Se.__value=r(ae).id)??"")},[()=>"　".repeat(r(ae).depth)]),k(R,Se)});var A;Ct(z);var ce=_(N,2),re=_(h(ce),2),pe=h(re);pe.value=pe.__value="high";var te=_(pe);te.value=te.__value="medium";var ze=_(te);ze.value=ze.__value="low";var Be=_(ze);Be.value=Be.__value="none";var ye;Ct(re);var E=_(ce,2),q=_(h(E),2),B=_(E,2),X=_(h(B),2),ge=_(B,2),de=_(h(ge),2);Le(de,21,()=>n,R=>R.value,(R,ae)=>{var Se=Ma(),Je=h(Se),Ye={};V(()=>{ne(Je,r(ae).label),Ye!==(Ye=r(ae).value)&&(Se.value=(Se.__value=r(ae).value)??"")}),k(R,Se)});var je=_(ge,2),he=_(h(je),2);Le(he,21,()=>a,R=>R.value,(R,ae)=>{var Se=Ma(),Je=h(Se),Ye={};V(()=>{ne(Je,r(ae).label),Ye!==(Ye=r(ae).value)&&(Se.value=(Se.__value=r(ae).value)??"")}),k(R,Se)});var Ne=_(je,2);{var ue=R=>{var ae=Bv(),Se=_(h(ae),2);Le(Se,21,()=>t.tags,Je=>Je.id,(Je,Ye)=>{const it=ie(()=>r(g).includes(r(Ye).id));var He=zv();let Z;var J=h(He);V(()=>{Z=Ve(He,1,"chip svelte-1vpobhk",null,Z,{on:r(it)}),Me(He,"aria-pressed",r(it)),ne(J,r(Ye).name)}),O("click",He,()=>d(g,r(it)?r(g).filter(w=>w!==r(Ye).id):[...r(g),r(Ye).id],!0)),k(Je,He)}),k(R,ae)};K(Ne,R=>{t.tags.length>0&&R(ue)})}var ve=_(Ne,2),Ee=h(ve);V(()=>{A!==(A=r(s)??"")&&(z.value=(z.__value=r(s)??"")??"",mt(z,r(s)??"")),ye!==(ye=r(o))&&(re.value=(re.__value=r(o))??"",mt(re,r(o)))}),O("change",z,R=>{const ae=R.currentTarget.value;d(s,ae||null,!0)}),O("change",re,R=>{d(o,R.currentTarget.value,!0)}),Ft("blur",q,R=>{R.currentTarget.value.length===16&&R.currentTarget.blur()}),yt(q,()=>r(c),R=>d(c,R)),yt(X,()=>r(u),R=>d(u,R)),O("change",de,()=>d(x,!1)),aa(de,()=>r(v),R=>d(v,R)),O("change",he,R=>{R.currentTarget.value==="custom"?d(p,!0):d(f,null)}),aa(he,()=>r(b),R=>d(b,R)),O("click",Ee,P),k(Q,se)};K(xe,Q=>{r(S)&&Q($)})}var le=_(xe,2);Fv(le,{get open(){return r(p)},get initialConfig(){return r(f)},onConfirm:Q=>{d(f,Q,!0),d(p,!1)},onClose:()=>d(p,!1)}),V(()=>ne(qe,r(S)?"收起":"更多")),Ft("submit",W,Y),yt(G,()=>r(l),Q=>d(l,Q)),O("click",be,D),k(e,W),ot()}dt(["click","change"]);var Yv=j('<div class="journal-placeholder svelte-969q1d"><h2 class="svelte-969q1d">手账模式</h2> <p>月视图按自然周分组、每日勾选 + 复盘 — 在 P1.10 实现。</p> <p class="hint svelte-969q1d"> </p></div>'),Vv=j('<h1 class="title svelte-969q1d"> </h1>'),Gv=j('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),Kv=j('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),Jv=j('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),Zv=j('<p class="loading svelte-969q1d">加载中...</p>'),Qv=j('<p class="empty svelte-969q1d"><!></p>'),Xv=j('<div class="task-list svelte-969q1d"></div>'),$v=j('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),ef=j('<div class="page svelte-969q1d"><!> <div class="main svelte-969q1d"><!></div> <!></div>');function tf(e,t){st(t,!0);let n=I(Ie([])),a=I(Ie([])),i=I(Ie([])),l=I(!0),s=I(null),o=I(null),c=I("today"),u=I(""),v=I(null),b=I(null),f=I(null),p=I(null),g=I(null),S=I(""),y=I(""),x=I(null),L=I(null),P=I(null),Y=I(null),D=I(""),W=I("");const H=ie(()=>{let E=[...r(n)];const q={high:0,medium:1,low:2,none:3};if(r(u).trim()){const ue=r(u).trim().toLowerCase();return E=E.filter(ve=>ve.title.toLowerCase().includes(ue)),E.sort((ve,Ee)=>{if(ve.status!==Ee.status)return ve.status==="active"?-1:1;const R=q[ve.priority||"none"]??3,ae=q[Ee.priority||"none"]??3;return R!==ae?R-ae:new Date(ve.created_at??0).getTime()-new Date(Ee.created_at??0).getTime()}),E}const B=nn(),X=Qr(),ge=new Date,de=ge.getDay(),je=de===0?6:de-1,he=new Date(ge);he.setDate(he.getDate()-je),he.setHours(0,0,0,0);const Ne=new Date(he);return Ne.setDate(Ne.getDate()+6),Ne.setHours(23,59,59,999),r(o)!==null?E=E.filter(ue=>ue.project_id===r(o)):r(c)==="today"?E=E.filter(ue=>_t(ue.due_date)===B):r(c)==="tomorrow"?E=E.filter(ue=>_t(ue.due_date)===X):r(c)==="week"?E=E.filter(ue=>{if(!ue.due_date)return!1;const ve=new Date(ue.due_date);return ve>=he&&ve<=Ne}):r(c)==="planned"?E=ke(E,{project:r(b),tag:r(f),priority:r(p),preset:r(g),startDate:r(S),endDate:r(y)}):r(c)==="completed"?(E=E.filter(ue=>ue.status==="completed"),E=ke(E,{project:r(x),tag:r(L),priority:r(P),preset:r(Y),startDate:r(D),endDate:r(W)})):r(c)==="journal"&&(E=E.filter(ue=>ue.status==="active"&&ue.due_date)),E.sort((ue,ve)=>{if(ue.status!==ve.status)return ue.status==="active"?-1:1;const Ee=q[ue.priority||"none"]??3,R=q[ve.priority||"none"]??3;return Ee!==R?Ee-R:new Date(ue.created_at??0).getTime()-new Date(ve.created_at??0).getTime()}),E});function ke(E,q){let B=E;if(q.project!==null&&(B=B.filter(X=>X.project_id===q.project)),q.tag!==null&&(B=B.filter(X=>(X.tags??[]).some(ge=>ge.id===q.tag))),q.priority!==null&&(B=B.filter(X=>X.priority===q.priority)),q.preset==="week"){const X=new Date,ge=X.getDay(),de=ge===0?6:ge-1,je=new Date(X);je.setDate(X.getDate()-de);const he=new Date(je);he.setDate(je.getDate()+6);const Ne=_t(je.toISOString()),ue=_t(he.toISOString());B=B.filter(ve=>{const Ee=_t(ve.due_date);return!!Ee&&Ee>=Ne&&Ee<=ue})}if(q.preset==="month"){const X=new Date,ge=`${X.getFullYear()}-${String(X.getMonth()+1).padStart(2,"0")}-01`,de=new Date(X.getFullYear(),X.getMonth()+1,0),je=_t(de.toISOString());B=B.filter(he=>{const Ne=_t(he.due_date);return!!Ne&&Ne>=ge&&Ne<=je})}return q.startDate&&(B=B.filter(X=>{const ge=_t(X.due_date);return!!ge&&ge>=q.startDate})),q.endDate&&(B=B.filter(X=>{const ge=_t(X.due_date);return!!ge&&ge<=q.endDate})),B}const G=ie(()=>{const E=r(H).filter(de=>de.status==="active").reduce((de,je)=>de+(je.estimated_pomodoros||0)*(je.pomodoro_duration||25),0),q=r(H).filter(de=>de.status==="active").length,B=r(H).reduce((de,je)=>de+(je.completed_pomodoros||0)*(je.pomodoro_duration||25),0),X=r(H).reduce((de,je)=>de+(je.completed_pomodoros||0),0),ge=r(H).filter(de=>de.status==="completed").length;return{estimatedMinutes:E,activeCount:q,focusedMinutes:B,completedCount:ge,completedPomodoros:X}}),fe=ie(()=>{if(r(u).trim())return`搜索结果 (${r(H).length})`;if(r(o)!==null){const q=r(a).find(B=>B.id===r(o));return(q==null?void 0:q.name)||"清单"}return{today:"今天",tomorrow:"明天",week:"本周",planned:"已计划",completed:"已完成",journal:"手账","":"任务"}[r(c)]||"任务"});async function be(){try{const[E,q,B]=await Promise.all([pi({}),_s(),ps()]);if(d(n,E.map(X=>({...X,tags:X.tags??[]})),!0),d(a,q,!0),d(i,B,!0),r(v)){const X=r(n).find(ge=>ge.id===r(v).id);d(v,X??null,!0)}}catch(E){d(s,String(E),!0)}finally{d(l,!1)}}hi(be);function qe(){return new Date().toISOString()}function ee(){return crypto.randomUUID()}async function me(E){const q=typeof E=="string"?E:E.id,B=typeof E=="string"?r(n).find(X=>X.id===q):E;if(B)try{B.status==="active"?await Lc(q):await Rc(q),await be()}catch(X){d(s,String(X),!0)}}async function xe(E,q=null){try{await Ri({id:ee(),name:E,color:"#c97b6e",parent_id:q??null,created_at:qe(),updated_at:qe()}),await be()}catch(B){d(s,String(B),!0)}}async function $(E,q){try{const B=r(a).find(X=>X.id===E);if(!B)return;await Ri({...B,name:q,updated_at:qe()}),await be()}catch(B){d(s,String(B),!0)}}async function le(E){if(confirm("删除此清单？子清单会一并删除"))try{await zc(E),r(o)===E&&d(o,null),await be()}catch(q){d(s,String(q),!0)}}function Q(E){d(v,E,!0)}function se(){d(v,null)}function N(){be()}async function z(E){try{const q=await Ka(E.id,null,E.pomodoro_duration??25);cs("/timer"),window.dispatchEvent(new CustomEvent("pomoflow:start-task",{detail:{task:E,session:q}}))}catch(q){d(s,String(q),!0)}}async function C(E){const q=E.due_date??(r(c)==="tomorrow"?Qr():nn());try{const B=ee();await hs({id:B,title:E.title,description:"",project_id:E.project_id??r(o),priority:E.priority,status:"active",due_date:$a(q)?q:`${q}T00:00:00`,estimated_pomodoros:E.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:E.pomodoro_duration,reminder:E.reminder??"none",repeat:E.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:E.repeat_config??null,completed_at:null,created_at:qe(),updated_at:qe()}),E.tag_ids.length>0&&await gs(B,E.tag_ids),await be()}catch(B){d(s,String(B),!0)}}async function F(){const E=r(H),q=["标题","项目","优先级","截止","标签","番茄数","状态"],B=E.map(he=>{var Ne;return[he.title,((Ne=r(a).find(ue=>ue.id===he.project_id))==null?void 0:Ne.name)??"",he.priority??"",_t(he.due_date),(he.tags??[]).map(ue=>ue.name).join("; "),`${he.completed_pomodoros??0}/${he.estimated_pomodoros??0}`,he.status]}),X=[q,...B].map(he=>he.map(Ne=>`"${String(Ne).replace(/"/g,'""')}"`).join(",")).join(`
`),ge=new Blob(["\uFEFF"+X],{type:"text/csv;charset=utf-8"}),de=URL.createObjectURL(ge),je=document.createElement("a");je.href=de,je.download=`tasks-${nn()}.csv`,je.click(),URL.revokeObjectURL(de)}var A=ef();vc("969q1d",E=>{Fr(()=>{Nl.title="任务 - PomoFlow"})});var ce=h(A);ev(ce,{get projects(){return r(a)},get filter(){return r(c)},get selectedProject(){return r(o)},onSetFilter:E=>{d(c,E,!0),d(u,"")},onSelectProject:E=>{d(o,E,!0),d(u,"")},onCreateProject:xe,onUpdateProject:$,onDeleteProject:le,get search(){return r(u)},onSearchChange:E=>{d(u,E,!0),E.trim()&&(d(o,null),d(c,""))},get tasks(){return r(n)}});var re=_(ce,2),pe=h(re);{var te=E=>{var q=Yv(),B=_(h(q),4),X=h(B);V(()=>ne(X,`当前 active 任务数：${r(H).length??""}`)),k(E,q)},ze=E=>{var q=$v(),B=h(q);{var X=Z=>{var J=Vv(),w=h(J);V(()=>ne(w,r(fe))),k(Z,J)};K(B,Z=>{r(fe)&&Z(X)})}var ge=_(B,2);{var de=Z=>{var J=Gv(),w=h(J);kn(w,{get icon(){return Yi},label:"已专注",get value(){return r(G).focusedMinutes},unit:"分钟",accent:!0});var T=_(w,2);kn(T,{get icon(){return Vi},label:"已完成番茄",get value(){return r(G).completedPomodoros},unit:"个",accent:!0});var U=_(T,2);kn(U,{get icon(){return Qa},label:"已完成任务",get value(){return r(G).completedCount},unit:"个",accent:!0}),k(Z,J)},je=Z=>{var J=Kv(),w=h(J);kn(w,{get icon(){return Yi},label:"预计专注",get value(){return r(G).estimatedMinutes},unit:"分钟",accent:!0});var T=_(w,2);kn(T,{get icon(){return Vi},label:"进行中",get value(){return r(G).activeCount},unit:"个",accent:!0});var U=_(T,2);kn(U,{get icon(){return eu},label:"已专注",get value(){return r(G).focusedMinutes},unit:"分钟",accent:!0});var Te=_(U,2);kn(Te,{get icon(){return Qa},label:"已完成",get value(){return r(G).completedCount},unit:"个",accent:!0}),k(Z,J)};K(ge,Z=>{r(c)==="completed"?Z(de):Z(je,-1)})}var he=_(ge,2);{var Ne=Z=>{el(Z,{get projects(){return r(a)},get tags(){return r(i)},get filterProject(){return r(x)},setFilterProject:J=>d(x,J,!0),get filterTag(){return r(L)},setFilterTag:J=>d(L,J,!0),get filterPriority(){return r(P)},setFilterPriority:J=>d(P,J,!0),get filterPreset(){return r(Y)},setFilterPreset:J=>d(Y,J,!0),get filterStartDate(){return r(D)},setFilterStartDate:J=>d(D,J,!0),get filterEndDate(){return r(W)},setFilterEndDate:J=>d(W,J,!0)})},ue=Z=>{el(Z,{get projects(){return r(a)},get tags(){return r(i)},get filterProject(){return r(b)},setFilterProject:J=>d(b,J,!0),get filterTag(){return r(f)},setFilterTag:J=>d(f,J,!0),get filterPriority(){return r(p)},setFilterPriority:J=>d(p,J,!0),get filterPreset(){return r(g)},setFilterPreset:J=>d(g,J,!0),get filterStartDate(){return r(S)},setFilterStartDate:J=>d(S,J,!0),get filterEndDate(){return r(y)},setFilterEndDate:J=>d(y,J,!0),onExport:F})};K(he,Z=>{r(c)==="completed"?Z(Ne):r(c)==="planned"&&Z(ue,1)})}var ve=_(he,2);{var Ee=Z=>{{let J=ie(()=>r(c)==="tomorrow"?Qr():nn());Wv(Z,{get projects(){return r(a)},get tags(){return r(i)},get defaultProjectId(){return r(o)},get defaultDueDate(){return r(J)},onAdd:C})}};K(ve,Z=>{r(c)!=="completed"&&Z(Ee)})}var R=_(ve,2);{var ae=Z=>{var J=Jv(),w=h(J),T=h(w),U=_(w,2);V(()=>ne(T,`⚠ ${r(s)??""}`)),O("click",U,()=>d(s,null)),k(Z,J)};K(R,Z=>{r(s)&&Z(ae)})}var Se=_(R,2);{var Je=Z=>{var J=Zv();k(Z,J)},Ye=Z=>{var J=Qv(),w=h(J);{var T=Te=>{var Ze=Va("暂无任务，添加一个开始吧");k(Te,Ze)},U=Te=>{var Ze=Va("此筛选下没有任务");k(Te,Ze)};K(w,Te=>{r(n).length===0?Te(T):Te(U,-1)})}k(Z,J)},it=Z=>{{let J=ie(()=>r(c)==="completed"?"completed_at":"due_date");Tv(Z,{get tasks(){return r(H)},get groupBy(){return r(J)},get selectedTask(){return r(v)},onToggle:me,onSelect:Q,onStart:z})}},He=Z=>{var J=Xv();Le(J,21,()=>r(H),w=>w.id,(w,T)=>{{let U=ie(()=>{var Te;return((Te=r(v))==null?void 0:Te.id)===r(T).id});ks(w,{get task(){return r(T)},get selected(){return r(U)},onToggle:()=>me(r(T)),onSelect:Q,onStart:z})}}),k(Z,J)};K(Se,Z=>{r(l)?Z(Je):r(H).length===0?Z(Ye,1):r(c)==="week"||r(c)==="planned"||r(c)==="completed"?Z(it,2):Z(He,-1)})}k(E,q)};K(pe,E=>{r(c)==="journal"?E(te):E(ze,-1)})}var Be=_(re,2);{var ye=E=>{wv(E,{get task(){return r(v)},get projects(){return r(a)},get allTags(){return r(i)},onClose:se,onChanged:N})};K(Be,E=>{r(v)&&r(c)!=="journal"&&E(ye)})}k(e,A),ot()}dt(["click"]);var nf=j('<div class="page svelte-giv6a6"><h2 class="svelte-giv6a6">统计</h2> <p class="placeholder svelte-giv6a6">🚧 统计页即将实装 —— 6 维度切换 + 4 通用卡 + 趋势柱状图 + 项目圆环图。</p> <p class="placeholder svelte-giv6a6">P1.9 阶段交付(见 docs/migration-roadmap)。</p></div>');function rf(e){var t=nf();k(e,t)}var af=j('<div class="page svelte-1p9kpu2"><h2 class="svelte-1p9kpu2">手账</h2> <p class="placeholder svelte-1p9kpu2">🚧 手账模式即将实装 —— 月视图 + 日/周/月复盘 + 每日任务勾选。</p> <p class="placeholder svelte-1p9kpu2">P1.10 阶段交付(见 docs/migration-roadmap)。</p></div>');function lf(e){var t=af();k(e,t)}async function sf(){return await et("plugin:autostart|is_enabled")}async function of(){await et("plugin:autostart|enable")}async function cf(){await et("plugin:autostart|disable")}var uf=j('<div class="error svelte-uox1oc" role="alert"> </div>'),vf=j('<div class="page svelte-uox1oc"><h2 class="svelte-uox1oc">设置</h2> <section class="block svelte-uox1oc"><h3 class="svelte-uox1oc">番茄钟参数</h3> <div class="row svelte-uox1oc"><label for="focus-min" class="svelte-uox1oc">专注时长(分钟)</label> <input id="focus-min" type="number" min="1" max="120" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="sb-min" class="svelte-uox1oc">短休息时长(分钟)</label> <input id="sb-min" type="number" min="1" max="60" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="lb-min" class="svelte-uox1oc">长休息时长(分钟)</label> <input id="lb-min" type="number" min="1" max="120" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="lb-int" class="svelte-uox1oc">长休息间隔(每 N 个专注)</label> <input id="lb-int" type="number" min="2" max="12" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="auto-chain" class="svelte-uox1oc">专注完成后自动进入休息</label> <input id="auto-chain" type="checkbox" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="snd" class="svelte-uox1oc">完成提示音</label> <input id="snd" type="checkbox" class="svelte-uox1oc"/></div> <div class="row svelte-uox1oc"><label for="ntf" class="svelte-uox1oc">系统通知</label> <input id="ntf" type="checkbox" class="svelte-uox1oc"/></div> <button class="reset-btn svelte-uox1oc">恢复默认</button></section> <section class="block svelte-uox1oc"><h3 class="svelte-uox1oc">系统能力</h3> <div class="row svelte-uox1oc"><div class="row-label svelte-uox1oc"><span class="name svelte-uox1oc">开机自启动</span> <span class="hint svelte-uox1oc">OS 启动时自动运行 PomoFlow(静默启动,常驻托盘)</span></div> <button> </button></div> <div class="row svelte-uox1oc"><div class="row-label svelte-uox1oc"><span class="name svelte-uox1oc">系统通知测试</span> <span class="hint svelte-uox1oc">发送一条测试通知,验证系统通知链路是否通</span></div> <button class="action svelte-uox1oc">发送测试</button></div> <p class="tray-hint svelte-uox1oc">💡 关闭主窗口时 PomoFlow 会驻留在系统托盘,右键托盘图标可『显示窗口 / 退出』。</p></section> <!></div>');function ff(e,t){st(t,!0);const n=ie(vn);let a=I(!1),i=I(!1),l=I("default"),s=I(0),o=I(null);async function c(){try{d(a,await sf(),!0)}catch(C){console.warn("isEnabled failed",C),d(a,!1)}try{d(l,await Za()?"granted":"default",!0)}catch{d(l,"default")}try{const C=await pi({status:"active"});d(s,C.length,!0)}catch{}}ut(()=>{c()}),ut(()=>{r(n).focusMinutes,r(n).shortBreakMinutes,r(n).longBreakMinutes,r(n).longBreakInterval,r(n).autoChain,Fc()});function u(C,F){Ac({[C]:F})}async function v(){if(!r(i)){d(i,!0),d(o,null);try{r(a)?(await cf(),d(a,!1)):(await of(),d(a,!0))}catch(C){d(o,`自启动切换失败: ${C}`)}finally{d(i,!1)}}}async function b(){d(o,null);try{let C=await Za();if(C)d(l,"granted");else{const F=await ms();C=F==="granted",d(l,F,!0)}if(!C){d(o,"通知权限未授予,无法发送");return}ys({title:"PomoFlow 测试通知",body:`当前 active 任务数:${r(s)}`})}catch(C){d(o,`通知失败: ${C}`)}}var f=vf(),p=_(h(f),2),g=_(h(p),2),S=_(h(g),2),y=_(g,2),x=_(h(y),2),L=_(y,2),P=_(h(L),2),Y=_(L,2),D=_(h(Y),2),W=_(Y,2),H=_(h(W),2),ke=_(W,2),G=_(h(ke),2),fe=_(ke,2),be=_(h(fe),2),qe=_(fe,2),ee=_(p,2),me=_(h(ee),2),xe=_(h(me),2);let $;var le=h(xe),Q=_(me,2),se=_(h(Q),2),N=_(ee,2);{var z=C=>{var F=uf(),A=h(F);V(()=>ne(A,`⚠ ${r(o)??""}`)),k(C,F)};K(N,C=>{r(o)&&C(z)})}V(()=>{Pn(S,r(n).focusMinutes),Pn(x,r(n).shortBreakMinutes),Pn(P,r(n).longBreakMinutes),Pn(D,r(n).longBreakInterval),Tr(H,r(n).autoChain),Tr(G,r(n).soundEnabled),Tr(be,r(n).desktopNotificationEnabled),$=Ve(xe,1,"toggle svelte-uox1oc",null,$,{on:r(a)}),xe.disabled=r(i),Me(xe,"aria-pressed",r(a)),ne(le,r(i)?"...":r(a)?"已开启":"已关闭")}),O("input",S,C=>u("focusMinutes",Math.max(1,Math.min(120,+C.currentTarget.value||25)))),O("input",x,C=>u("shortBreakMinutes",Math.max(1,Math.min(60,+C.currentTarget.value||5)))),O("input",P,C=>u("longBreakMinutes",Math.max(1,Math.min(120,+C.currentTarget.value||15)))),O("input",D,C=>u("longBreakInterval",Math.max(2,Math.min(12,+C.currentTarget.value||4)))),O("change",H,C=>u("autoChain",C.currentTarget.checked)),O("change",G,C=>u("soundEnabled",C.currentTarget.checked)),O("change",be,C=>u("desktopNotificationEnabled",C.currentTarget.checked)),O("click",qe,()=>Ic()),O("click",xe,v),O("click",se,b),k(e,f),ot()}dt(["input","change","click"]);var df=j("<button> </button>"),hf=j('<main class="app svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true">🍅</span> <h1 class="svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q" aria-label="主导航"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function _f(e,t){st(t,!0),ut(()=>{if(!fs().running)return;const S=setInterval(()=>Oc(),1e3);return()=>clearInterval(S)});const n=ie(Cc);var a=hf(),i=h(a),l=_(h(i),2);Le(l,21,()=>qc,g=>g.path,(g,S)=>{var y=df();let x;var L=h(y);V(()=>{x=Ve(y,1,"nav-item svelte-1n46o8q",null,x,{active:r(n)===r(S).path}),Me(y,"aria-current",r(n)===r(S).path?"page":void 0),ne(L,r(S).label)}),O("click",y,()=>cs(r(S).path)),k(g,y)});var s=_(i,2),o=h(s);{var c=g=>{Qi(g,{})},u=g=>{tf(g,{})},v=g=>{rf(g)},b=g=>{lf(g)},f=g=>{ff(g,{})},p=g=>{Qi(g,{})};K(o,g=>{r(n)==="/timer"?g(c):r(n)==="/tasks"?g(u,1):r(n)==="/stats"?g(v,2):r(n)==="/journal"?g(b,3):r(n)==="/settings"?g(f,4):g(p,-1)})}k(e,a),ot()}dt(["click"]);ac(_f,{target:document.getElementById("app")});
