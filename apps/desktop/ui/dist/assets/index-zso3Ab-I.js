var uc=Object.defineProperty;var Ms=a=>{throw TypeError(a)};var vc=(a,t,n)=>t in a?uc(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;var aa=(a,t,n)=>vc(a,typeof t!="symbol"?t+"":t,n),co=(a,t,n)=>t.has(a)||Ms("Cannot "+n);var F=(a,t,n)=>(co(a,t,"read from private field"),n?n.call(a):t.get(a)),tt=(a,t,n)=>t.has(a)?Ms("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,n),Ze=(a,t,n,r)=>(co(a,t,"write to private field"),r?r.call(a,n):t.set(a,n),n),_t=(a,t,n)=>(co(a,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const Di=!1;var ns=Array.isArray,fc=Array.prototype.indexOf,Lr=Array.prototype.includes,$r=Array.from,hc=Object.defineProperty,Ja=Object.getOwnPropertyDescriptor,Pi=Object.getOwnPropertyDescriptors,_c=Object.prototype,pc=Array.prototype,rs=Object.getPrototypeOf,Es=Object.isExtensible;function Gn(a){return typeof a=="function"}const gc=()=>{};function mc(a){return a()}function jo(a){for(var t=0;t<a.length;t++)a[t]()}function Mi(){var a,t,n=new Promise((r,o)=>{a=r,t=o});return{promise:n,resolve:a,reject:t}}function Ei(a,t){if(Array.isArray(a))return a;if(!(Symbol.iterator in a))return Array.from(a);const n=[];for(const r of a)if(n.push(r),n.length===t)break;return n}const Ut=2,pn=4,gr=8,os=1<<24,ka=16,ha=32,Oa=64,No=128,fa=512,Lt=1024,Rt=2048,xa=4096,Zt=8192,sa=16384,On=32768,Fo=1<<25,Xa=65536,Or=1<<17,Ci=1<<18,Bn=1<<19,ji=1<<20,Ma=1<<25,gn=65536,Br=1<<21,Tn=1<<22,Qa=1<<23,ja=Symbol("$state"),Ni=Symbol("legacy props"),bc=Symbol(""),Cr=Symbol("attributes"),Ao=Symbol("class"),Io=Symbol("style"),Zn=Symbol("text"),jr=Symbol("form reset"),mr=new class extends Error{constructor(){super(...arguments);aa(this,"name","StaleReactionError");aa(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var xi;const eo=!!((xi=globalThis.document)!=null&&xi.contentType)&&globalThis.document.contentType.includes("xml");function yc(a){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function kc(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function wc(a,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function xc(a){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Sc(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Tc(a){throw new Error("https://svelte.dev/e/effect_orphan")}function Dc(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Pc(a){throw new Error("https://svelte.dev/e/props_invalid_value")}function Mc(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Ec(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Cc(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function jc(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Nc=1,Fc=2,Fi=4,Ac=8,Ic=16,Rc=1,qc=2,Ai=4,Lc=8,Oc=16,Ii=1,Bc=2,It=Symbol("uninitialized"),Ri="http://www.w3.org/1999/xhtml",zc="http://www.w3.org/2000/svg",Hc="@attach";function Uc(){console.warn("https://svelte.dev/e/derived_inert")}function Wc(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function Yc(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function qi(a){return a===this.v}function Gc(a,t){return a!=a?t==t:a!==t||a!==null&&typeof a=="object"||typeof a=="function"}function Li(a){return!Gc(a,this.v)}let zn=!1,Kc=!1;function Vc(){zn=!0}let Et=null;function Fn(a){Et=a}function pt(a,t=!1,n){Et={p:Et,i:!1,c:null,e:null,s:a,x:null,r:rt,l:zn&&!t?{s:null,u:null,$:[]}:null}}function gt(a){var t=Et,n=t.e;if(n!==null){t.e=null;for(var r of n)sl(r)}return t.i=!0,Et=t.p,{}}function br(){return!zn||Et!==null&&Et.l===null}let an=[];function Oi(){var a=an;an=[],jo(a)}function Ea(a){if(an.length===0&&!rr){var t=an;queueMicrotask(()=>{t===an&&Oi()})}an.push(a)}function Jc(){for(;an.length>0;)Oi()}function Bi(a){var t=rt;if(t===null)return ct.f|=Qa,a;if((t.f&On)===0&&(t.f&pn)===0)throw a;Ka(a,t)}function Ka(a,t){if(!(t!==null&&(t.f&sa)!==0)){for(;t!==null;){if((t.f&No)!==0){if((t.f&On)===0)throw a;try{t.b.error(a);return}catch(n){a=n}}t=t.parent}throw a}}const Qc=-7169;function jt(a,t){a.f=a.f&Qc|t}function ss(a){(a.f&fa)!==0||a.deps===null?jt(a,Lt):jt(a,xa)}function zi(a){if(a!==null)for(const t of a)(t.f&Ut)===0||(t.f&gn)===0||(t.f^=gn,zi(t.deps))}function Hi(a,t,n){(a.f&Rt)!==0?t.add(a):(a.f&xa)!==0&&n.add(a),zi(a.deps),jt(a,Lt)}let Pr=!1;function Xc(a){var t=Pr;try{return Pr=!1,[a(),Pr]}finally{Pr=t}}function vn(a,t){if(t){const n=document.body;a.autofocus=!0,Ea(()=>{document.activeElement===n&&a.focus()})}}let Cs=!1;function Zc(){Cs||(Cs=!0,document.addEventListener("reset",a=>{Promise.resolve().then(()=>{var t;if(!a.defaultPrevented)for(const n of a.target.elements)(t=n[jr])==null||t.call(n)})},{capture:!0}))}function Hn(a){var t=ct,n=rt;_a(null),pa(null);try{return a()}finally{_a(t),pa(n)}}function Ui(a,t,n,r=n){a.addEventListener(t,()=>Hn(n));const o=a[jr];o?a[jr]=()=>{o(),r(!0)}:a[jr]=()=>r(!0),Zc()}function $c(a){let t=0,n=Za(0),r;return()=>{vs()&&(e(n),fs(()=>(t===0&&(r=Kt(()=>a(()=>or(n)))),t+=1,()=>{Ea(()=>{t-=1,t===0&&(r==null||r(),r=void 0,or(n))})})))}}var ed=Xa|Bn;function td(a,t,n,r){new ad(a,t,n,r)}var ca,as,da,sn,$t,ua,Qt,ra,Fa,ln,Ya,Dn,vr,fr,Aa,Qr,Mt,nd,rd,Ro,od,qo,Nr,Fr,Lo,Oo;class ad{constructor(t,n,r,o){tt(this,Mt);aa(this,"parent");aa(this,"is_pending",!1);aa(this,"transform_error");tt(this,ca);tt(this,as,null);tt(this,da);tt(this,sn);tt(this,$t);tt(this,ua,null);tt(this,Qt,null);tt(this,ra,null);tt(this,Fa,null);tt(this,ln,0);tt(this,Ya,0);tt(this,Dn,!1);tt(this,vr,new Set);tt(this,fr,new Set);tt(this,Aa,null);tt(this,Qr,$c(()=>(Ze(this,Aa,Za(F(this,ln))),()=>{Ze(this,Aa,null)})));var c;Ze(this,ca,t),Ze(this,da,n),Ze(this,sn,i=>{var l=rt;l.b=this,l.f|=No,r(i)}),this.parent=rt.b,this.transform_error=o??((c=this.parent)==null?void 0:c.transform_error)??(i=>i),Ze(this,$t,Wn(()=>{_t(this,Mt,qo).call(this)},ed))}defer_effect(t){Hi(t,F(this,vr),F(this,fr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!F(this,da).pending}update_pending_count(t,n){_t(this,Mt,Lo).call(this,t,n),Ze(this,ln,F(this,ln)+t),!(!F(this,Aa)||F(this,Dn))&&(Ze(this,Dn,!0),Ea(()=>{Ze(this,Dn,!1),F(this,Aa)&&In(F(this,Aa),F(this,ln))}))}get_effect_pending(){return F(this,Qr).call(this),e(F(this,Aa))}error(t){if(!F(this,da).onerror&&!F(this,da).failed)throw t;Ie!=null&&Ie.is_fork?(F(this,ua)&&Ie.skip_effect(F(this,ua)),F(this,Qt)&&Ie.skip_effect(F(this,Qt)),F(this,ra)&&Ie.skip_effect(F(this,ra)),Ie.oncommit(()=>{_t(this,Mt,Oo).call(this,t)})):_t(this,Mt,Oo).call(this,t)}}ca=new WeakMap,as=new WeakMap,da=new WeakMap,sn=new WeakMap,$t=new WeakMap,ua=new WeakMap,Qt=new WeakMap,ra=new WeakMap,Fa=new WeakMap,ln=new WeakMap,Ya=new WeakMap,Dn=new WeakMap,vr=new WeakMap,fr=new WeakMap,Aa=new WeakMap,Qr=new WeakMap,Mt=new WeakSet,nd=function(){try{Ze(this,ua,Xt(()=>F(this,sn).call(this,F(this,ca))))}catch(t){this.error(t)}},rd=function(t){const n=F(this,da).failed,{reset:r,invoke_onerror:o}=_t(this,Mt,Ro).call(this,t);Ea(o),n&&Ze(this,ra,Xt(()=>{n(F(this,ca),()=>t,()=>r)}))},Ro=function(t){var n=!1,r=!1;const o=()=>{if(n){Yc();return}n=!0,r&&jc(),F(this,ra)!==null&&hn(F(this,ra),()=>{Ze(this,ra,null)}),_t(this,Mt,Fr).call(this,()=>{_t(this,Mt,qo).call(this)})};return{reset:o,invoke_onerror:()=>{var i,l;try{r=!0,(l=(i=F(this,da)).onerror)==null||l.call(i,t,o),r=!1}catch(u){Ka(u,F(this,$t)&&F(this,$t).parent)}}}},od=function(){const t=F(this,da).pending;t&&(this.is_pending=!0,Ze(this,Qt,Xt(()=>t(F(this,ca)))),Ea(()=>{var n=Ze(this,Fa,document.createDocumentFragment()),r=Sa();n.append(r),Ze(this,ua,_t(this,Mt,Fr).call(this,()=>Xt(()=>F(this,sn).call(this,r)))),F(this,Ya)===0&&(F(this,ca).before(n),Ze(this,Fa,null),hn(F(this,Qt),()=>{Ze(this,Qt,null)}),_t(this,Mt,Nr).call(this,Ie))}))},qo=function(){try{if(this.is_pending=this.has_pending_snippet(),Ze(this,Ya,0),Ze(this,ln,0),Ze(this,ua,Xt(()=>{F(this,sn).call(this,F(this,ca))})),F(this,Ya)>0){var t=Ze(this,Fa,document.createDocumentFragment());_s(F(this,ua),t);const n=F(this,da).pending;Ze(this,Qt,Xt(()=>n(F(this,ca))))}else _t(this,Mt,Nr).call(this,Ie)}catch(n){this.error(n)}},Nr=function(t){this.is_pending=!1,t.transfer_effects(F(this,vr),F(this,fr))},Fr=function(t){var n=rt,r=ct,o=Et;pa(F(this,$t)),_a(F(this,$t)),Fn(F(this,$t).ctx);try{return mn.ensure(),t()}catch(c){return Bi(c),null}finally{pa(n),_a(r),Fn(o)}},Lo=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&_t(r=this.parent,Mt,Lo).call(r,t,n);return}Ze(this,Ya,F(this,Ya)+t),F(this,Ya)===0&&(_t(this,Mt,Nr).call(this,n),F(this,Qt)&&hn(F(this,Qt),()=>{Ze(this,Qt,null)}),F(this,Fa)&&(F(this,ca).before(F(this,Fa)),Ze(this,Fa,null)))},Oo=function(t){F(this,ua)&&(Gt(F(this,ua)),Ze(this,ua,null)),F(this,Qt)&&(Gt(F(this,Qt)),Ze(this,Qt,null)),F(this,ra)&&(Gt(F(this,ra)),Ze(this,ra,null));let n=F(this,da).failed;const r=o=>{const{reset:c,invoke_onerror:i}=_t(this,Mt,Ro).call(this,o);i(),n&&Ze(this,ra,_t(this,Mt,Fr).call(this,()=>{try{return Xt(()=>{var l=rt;l.b=this,l.f|=No,n(F(this,ca),()=>o,()=>c)})}catch(l){return Ka(l,F(this,$t).parent),null}}))};Ea(()=>{var o;try{o=this.transform_error(t)}catch(c){Ka(c,F(this,$t)&&F(this,$t).parent);return}o!==null&&typeof o=="object"&&typeof o.then=="function"?o.then(r,c=>Ka(c,F(this,$t)&&F(this,$t).parent)):r(o)})};function is(a,t,n,r){const o=br()?An:ls;var c=a.filter(b=>!b.settled),i=t.map(o);if(n.length===0&&c.length===0){r(i);return}var l=rt,u=sd(),f=c.length===1?c[0].promise:c.length>1?Promise.all(c.map(b=>b.promise)):null;function h(b){if((l.f&sa)===0){u();try{r([...i,...b])}catch(k){Ka(k,l)}zr()}}var g=Wi();if(n.length===0){f.then(()=>h([])).finally(g);return}function _(){Promise.all(n.map(b=>id(b))).then(h).catch(b=>Ka(b,l)).finally(g)}f?f.then(()=>{u(),_(),zr()}):_()}function sd(){var a=rt,t=ct,n=Et,r=Ie;return function(c=!0){pa(a),_a(t),Fn(n),c&&(a.f&sa)===0&&(r==null||r.activate(),r==null||r.apply())}}function zr(a=!0){pa(null),_a(null),Fn(null),a&&(Ie==null||Ie.deactivate())}function Wi(){var a=rt,t=a.b,n=Ie,r=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,n),n.increment(r,a),()=>{t==null||t.update_pending_count(-1,n),n.decrement(r,a)}}function An(a){var t=Ut|Rt;return rt!==null&&(rt.f|=Bn),{ctx:Et,deps:null,effects:null,equals:qi,f:t,fn:a,reactions:null,rv:0,v:It,wv:0,parent:rt,ac:null}}const $n=Symbol("obsolete");function id(a,t,n){let r=rt;r===null&&kc();var o=void 0,c=Za(It),i=!ct,l=new Set;return wd(()=>{var b,k;var u=rt,f=Mi();o=f.promise;try{Promise.resolve(a()).then(f.resolve,w=>{w!==mr&&f.reject(w)}).finally(zr)}catch(w){f.reject(w),zr()}var h=Ie;if(i){if((u.f&On)!==0)var g=Wi();if((b=r.b)!=null&&b.is_rendered())(k=h.async_deriveds.get(u))==null||k.reject($n);else for(const w of l.values())w.reject($n);l.add(f),h.async_deriveds.set(u,f)}const _=(w,x=void 0)=>{g==null||g(),l.delete(f),x!==$n&&(h.activate(),x?(c.f|=Qa,In(c,x)):((c.f&Qa)!==0&&(c.f^=Qa),In(c,w)),h.deactivate())};f.promise.then(_,w=>_(null,w||"unknown"))}),to(()=>{for(const u of l)u.reject($n)}),new Promise(u=>{function f(h){function g(){h===o?u(c):f(o)}h.then(g,g)}f(o)})}function R(a){const t=An(a);return vl(t),t}function ls(a){const t=An(a);return t.equals=Li,t}function ld(a){var t=a.effects;if(t!==null){a.effects=null;for(var n=0;n<t.length;n+=1)Gt(t[n])}}function cs(a){var t,n=rt,r=a.parent;if(!Ba&&r!==null&&a.v!==It&&(r.f&(sa|Zt))!==0)return Uc(),a.v;pa(r);try{a.f&=~gn,ld(a),t=pl(a)}finally{pa(n)}return t}function Yi(a){var t=cs(a);if(!a.equals(t)&&(a.wv=hl(),(!(Ie!=null&&Ie.is_fork)||a.deps===null)&&(Ie!==null?(Ie.capture(a,t,!0),nr==null||nr.capture(a,t,!0)):a.v=t,a.deps===null))){jt(a,Lt);return}Ba||(Yt!==null?(vs()||Ie!=null&&Ie.is_fork)&&Yt.set(a,t):ss(a))}function cd(a){var t;if(a.effects!==null)for(const n of a.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),n.ac!==null&&Hn(()=>{n.ac.abort(mr),n.ac=null}),n.fn!==null&&(n.teardown=gc),ir(n,0),hs(n))}function Gi(a){if(a.effects!==null)for(const t of a.effects)t.teardown&&t.fn!==null&&Rn(t)}let uo=null,wn=null,Ie=null,nr=null,Yt=null,Bo=null,rr=!1,vo=!1,Sn=null,Ar=null;var js=0;let dd=1;var Pn,Ga,cn,Mn,En,Cn,Ia,jn,ea,hr,Ra,ba,Da,Nn,dn,xt,zo,er,Ho,Ki,Vi,xn,ud,tr;const Xr=class Xr{constructor(){tt(this,xt);aa(this,"id",dd++);tt(this,Pn,!1);aa(this,"linked",!0);tt(this,Ga,null);tt(this,cn,null);aa(this,"async_deriveds",new Map);aa(this,"current",new Map);aa(this,"previous",new Map);tt(this,Mn,new Set);tt(this,En,new Set);tt(this,Cn,0);tt(this,Ia,new Map);tt(this,jn,null);tt(this,ea,[]);tt(this,hr,[]);tt(this,Ra,new Set);tt(this,ba,new Set);tt(this,Da,new Map);tt(this,Nn,new Set);aa(this,"is_fork",!1);tt(this,dn,!1);wn===null?uo=wn=this:(Ze(wn,cn,this),Ze(this,Ga,wn)),wn=this}skip_effect(t){F(this,Da).has(t)||F(this,Da).set(t,{d:[],m:[]}),F(this,Nn).delete(t)}unskip_effect(t,n=r=>this.schedule(r)){var r=F(this,Da).get(t);if(r){F(this,Da).delete(t);for(var o of r.d)jt(o,Rt),n(o);for(o of r.m)jt(o,xa),n(o)}F(this,Nn).add(t)}capture(t,n,r=!1){t.v!==It&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&Qa)===0&&(this.current.set(t,[n,r]),Yt==null||Yt.set(t,n)),this.is_fork||(t.v=n)}activate(){Ie=this}deactivate(){Ie=null,Yt=null}flush(){try{vo=!0,Ie=this,_t(this,xt,er).call(this)}finally{js=0,Bo=null,Sn=null,Ar=null,vo=!1,Ie=null,Yt=null,fn.clear()}}discard(){var t;for(const n of F(this,En))n(this);F(this,En).clear();for(const n of this.async_deriveds.values())n.reject($n);_t(this,xt,tr).call(this),(t=F(this,jn))==null||t.resolve()}register_created_effect(t){F(this,hr).push(t)}increment(t,n){if(Ze(this,Cn,F(this,Cn)+1),t){let r=F(this,Ia).get(n)??0;F(this,Ia).set(n,r+1)}}decrement(t,n){if(Ze(this,Cn,F(this,Cn)-1),t){let r=F(this,Ia).get(n)??0;r===1?F(this,Ia).delete(n):F(this,Ia).set(n,r-1)}F(this,dn)||(Ze(this,dn,!0),Ea(()=>{Ze(this,dn,!1),this.linked&&this.flush()}))}transfer_effects(t,n){for(const r of t)F(this,Ra).add(r);for(const r of n)F(this,ba).add(r);t.clear(),n.clear()}oncommit(t){F(this,Mn).add(t)}ondiscard(t){F(this,En).add(t)}settled(){return(F(this,jn)??Ze(this,jn,Mi())).promise}static ensure(){if(Ie===null){const t=Ie=new Xr;!vo&&!rr&&Ea(()=>{F(t,Pn)||t.flush()})}return Ie}apply(){{Yt=null;return}}schedule(t){var o;if(Bo=t,(o=t.b)!=null&&o.is_pending&&(t.f&(pn|gr|os))!==0&&(t.f&On)===0){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(Sn!==null&&n===rt&&(ct===null||(ct.f&Ut)===0))return;if((r&(Oa|ha))!==0){if((r&Lt)===0)return;n.f^=Lt}}F(this,ea).push(n)}};Pn=new WeakMap,Ga=new WeakMap,cn=new WeakMap,Mn=new WeakMap,En=new WeakMap,Cn=new WeakMap,Ia=new WeakMap,jn=new WeakMap,ea=new WeakMap,hr=new WeakMap,Ra=new WeakMap,ba=new WeakMap,Da=new WeakMap,Nn=new WeakMap,dn=new WeakMap,xt=new WeakSet,zo=function(){if(this.is_fork)return!0;for(const r of F(this,Ia).keys()){for(var t=r,n=!1;t.parent!==null;){if(F(this,Da).has(t)){n=!0;break}t=t.parent}if(!n)return!0}return!1},er=function(){var u,f,h,g;Ze(this,Pn,!0),js++>1e3&&(_t(this,xt,tr).call(this),fd());for(const _ of F(this,Ra))F(this,ba).delete(_),jt(_,Rt),this.schedule(_);for(const _ of F(this,ba))jt(_,xa),this.schedule(_);const t=F(this,ea);Ze(this,ea,[]),this.apply();var n=Sn=[],r=[],o=Ar=[];for(const _ of t)try{_t(this,xt,Ho).call(this,_,n,r)}catch(b){throw Xi(_),_t(this,xt,zo).call(this)||this.discard(),b}if(Ie=null,o.length>0){var c=Xr.ensure();for(const _ of o)c.schedule(_)}if(Sn=null,Ar=null,_t(this,xt,zo).call(this)){_t(this,xt,xn).call(this,r),_t(this,xt,xn).call(this,n);for(const[_,b]of F(this,Da))Qi(_,b);o.length>0&&_t(u=Ie,xt,er).call(u);return}const i=_t(this,xt,Ki).call(this);if(i){_t(this,xt,xn).call(this,r),_t(this,xt,xn).call(this,n),_t(f=i,xt,Vi).call(f,this);return}F(this,Ra).clear(),F(this,ba).clear();for(const _ of F(this,Mn))_(this);F(this,Mn).clear(),nr=this,Ns(r),Ns(n),nr=null,(h=F(this,jn))==null||h.resolve();var l=Ie;if(F(this,Cn)===0&&(F(this,ea).length===0||l!==null)&&_t(this,xt,tr).call(this),F(this,ea).length>0)if(l!==null){const _=l;F(_,ea).push(...F(this,ea).filter(b=>!F(_,ea).includes(b)))}else l=this;l!==null&&_t(g=l,xt,er).call(g)},Ho=function(t,n,r){t.f^=Lt;for(var o=t.first;o!==null;){var c=o.f,i=(c&(ha|Oa))!==0,l=i&&(c&Lt)!==0,u=l||(c&Zt)!==0||F(this,Da).has(o);if(!u&&o.fn!==null){i?o.f^=Lt:(c&pn)!==0?n.push(o):wr(o)&&((c&ka)!==0&&F(this,ba).add(o),Rn(o));var f=o.first;if(f!==null){o=f;continue}}for(;o!==null;){var h=o.next;if(h!==null){o=h;break}o=o.parent}}},Ki=function(){for(var t=F(this,Ga);t!==null;){if(!t.is_fork){for(const[n,[,r]]of this.current)if(t.current.has(n)&&!r)return t}t=F(t,Ga)}return null},Vi=function(t){var r;for(const[o,c]of t.current)!this.previous.has(o)&&t.previous.has(o)&&this.previous.set(o,t.previous.get(o)),this.current.set(o,c);for(const[o,c]of t.async_deriveds){const i=this.async_deriveds.get(o);i&&c.promise.then(i.resolve).catch(i.reject)}t.async_deriveds.clear(),this.transfer_effects(F(t,Ra),F(t,ba));const n=o=>{var c=o.reactions;if(c!==null&&!((o.f&Ut)!==0&&(o.f&(Rt|xa))===0))for(const u of c){var i=u.f;if((i&Ut)!==0)n(u);else{var l=u;i&(Tn|ka)&&!this.async_deriveds.has(l)&&(F(this,ba).delete(l),jt(l,Rt),this.schedule(l))}}};for(const o of this.current.keys())n(o);this.oncommit(()=>t.discard()),_t(r=t,xt,tr).call(r),Ie=this,_t(this,xt,er).call(this)},xn=function(t){for(var n=0;n<t.length;n+=1)Hi(t[n],F(this,Ra),F(this,ba))},ud=function(){var g;for(let _=uo;_!==null;_=F(_,cn)){var t=_.id<this.id,n=[];for(const[b,[k,w]]of this.current){if(_.current.has(b)){var r=_.current.get(b)[0];if(t&&k!==r)_.current.set(b,[k,w]);else continue}n.push(b)}if(t)for(const[b,k]of this.async_deriveds){const w=_.async_deriveds.get(b);w&&k.promise.then(w.resolve).catch(w.reject)}var o=[..._.current.keys()].filter(b=>!_.current.get(b)[1]);if(!(!F(_,Pn)||o.length===0)){var c=o.filter(b=>!this.current.has(b));if(c.length===0)t&&_.discard();else if(n.length>0){if(t)for(const b of F(this,Nn))_.unskip_effect(b,k=>{var w;(k.f&(ka|Tn))!==0?_.schedule(k):_t(w=_,xt,xn).call(w,[k])});_.activate();var i=new Set,l=new Map;for(var u of n)Ji(u,c,i,l);l=new Map;var f=[..._.current].filter(([b,k])=>{const w=this.current.get(b);return w?w[0]!==k[0]||w[1]!==k[1]:!0}).map(([b])=>b);if(f.length>0)for(const b of F(this,hr))(b.f&(sa|Zt|Or))===0&&ds(b,f,l)&&((b.f&(Tn|ka))!==0?(jt(b,Rt),_.schedule(b)):F(_,Ra).add(b));if(F(_,ea).length>0&&!F(_,dn)){_.apply();for(var h of F(_,ea))_t(g=_,xt,Ho).call(g,h,[],[]);Ze(_,ea,[])}_.deactivate()}}}},tr=function(){if(this.linked){var t=F(this,Ga),n=F(this,cn);t===null?uo=n:Ze(t,cn,n),n===null?wn=t:Ze(n,Ga,t),this.linked=!1}};let mn=Xr;function vd(a){var t=rr;rr=!0;try{for(var n;;){if(Jc(),Ie===null)return n;Ie.flush()}}finally{rr=t}}function fd(){try{Dc()}catch(a){Ka(a,Bo)}}let ma=null;function Ns(a){var t=a.length;if(t!==0){for(var n=0;n<t;){var r=a[n++];if((r.f&(sa|Zt))===0&&wr(r)&&(ma=new Set,Rn(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&cl(r),(ma==null?void 0:ma.size)>0)){fn.clear();for(const o of ma){if((o.f&(sa|Zt))!==0)continue;const c=[o];let i=o.parent;for(;i!==null;)ma.has(i)&&(ma.delete(i),c.push(i)),i=i.parent;for(let l=c.length-1;l>=0;l--){const u=c[l];(u.f&(sa|Zt))===0&&Rn(u)}}ma.clear()}}ma=null}}function Ji(a,t,n,r){if(!n.has(a)&&(n.add(a),a.reactions!==null))for(const o of a.reactions){const c=o.f;(c&Ut)!==0?Ji(o,t,n,r):(c&(Tn|ka))!==0&&(c&Rt)===0&&ds(o,t,r)&&(jt(o,Rt),us(o))}}function ds(a,t,n){const r=n.get(a);if(r!==void 0)return r;if(a.deps!==null)for(const o of a.deps){if(Lr.call(t,o))return!0;if((o.f&Ut)!==0&&ds(o,t,n))return n.set(o,!0),!0}return n.set(a,!1),!1}function us(a){Ie.schedule(a)}function Qi(a,t){if(!((a.f&ha)!==0&&(a.f&Lt)!==0)){(a.f&Rt)!==0?t.d.push(a):(a.f&xa)!==0&&t.m.push(a),jt(a,Lt);for(var n=a.first;n!==null;)Qi(n,t),n=n.next}}function Xi(a){jt(a,Lt);for(var t=a.first;t!==null;)Xi(t),t=t.next}let Hr=new Set;const fn=new Map;let Zi=!1;function Za(a,t){var n={f:0,v:a,reactions:null,equals:qi,rv:0,wv:0};return n}function H(a,t){const n=Za(a);return vl(n),n}function hd(a,t=!1,n=!0){var o;const r=Za(a);return t||(r.equals=Li),zn&&n&&Et!==null&&Et.l!==null&&((o=Et.l).s??(o.s=[])).push(r),r}function v(a,t,n=!1){ct!==null&&(!wa||(ct.f&Or)!==0)&&br()&&(ct.f&(Ut|ka|Tn|Or))!==0&&(Na===null||!Na.has(a))&&Cc();let r=n?Oe(t):t;return In(a,r,Ar)}function In(a,t,n=null){if(!a.equals(t)){fn.set(a,Ba?t:a.v);var r=mn.ensure();if(r.capture(a,t),(a.f&Ut)!==0){const o=a;(a.f&Rt)!==0&&cs(o),Yt===null&&ss(o)}a.wv=hl(),$i(a,Rt,n),br()&&rt!==null&&(rt.f&Lt)!==0&&(rt.f&(ha|Oa))===0&&(la===null?Td([a]):la.push(a)),!r.is_fork&&Hr.size>0&&!Zi&&_d()}return t}function _d(){Zi=!1;for(const a of Hr){(a.f&Lt)!==0&&jt(a,xa);let t;try{t=wr(a)}catch{t=!0}t&&Rn(a)}Hr.clear()}function Fs(a,t=1){var n=e(a),r=t===1?n++:n--;return v(a,n),r}function or(a){v(a,a.v+1)}function $i(a,t,n){var r=a.reactions;if(r!==null)for(var o=br(),c=r.length,i=0;i<c;i++){var l=r[i],u=l.f;if(!(!o&&l===rt)){var f=(u&Rt)===0;if(f&&jt(l,t),(u&Or)!==0)Hr.add(l);else if((u&Ut)!==0){var h=l;Yt==null||Yt.delete(h),(u&gn)===0&&(u&fa&&(rt===null||(rt.f&Br)===0)&&(l.f|=gn),$i(h,xa,n))}else if(f){var g=l;(u&ka)!==0&&ma!==null&&ma.add(g),n!==null?n.push(g):us(g)}}}}function Oe(a){if(typeof a!="object"||a===null||ja in a)return a;const t=rs(a);if(t!==_c&&t!==pc)return a;var n=new Map,r=ns(a),o=H(0),c=_n,i=l=>{if(_n===c)return l();var u=ct,f=_n;_a(null),Rs(c);var h=l();return _a(u),Rs(f),h};return r&&n.set("length",H(a.length)),new Proxy(a,{defineProperty(l,u,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&Mc();var h=n.get(u);return h===void 0?i(()=>{var g=H(f.value);return n.set(u,g),g}):v(h,f.value,!0),!0},deleteProperty(l,u){var f=n.get(u);if(f===void 0){if(u in l){const h=i(()=>H(It));n.set(u,h),or(o)}}else v(f,It),or(o);return!0},get(l,u,f){var b;if(u===ja)return a;var h=n.get(u),g=u in l;if(h===void 0&&(!g||(b=Ja(l,u))!=null&&b.writable)&&(h=i(()=>{var k=Oe(g?l[u]:It),w=H(k);return w}),n.set(u,h)),h!==void 0){var _=e(h);return _===It?void 0:_}return Reflect.get(l,u,f)},getOwnPropertyDescriptor(l,u){var f=Reflect.getOwnPropertyDescriptor(l,u);if(f&&"value"in f){var h=n.get(u);h&&(f.value=e(h))}else if(f===void 0){var g=n.get(u),_=g==null?void 0:g.v;if(g!==void 0&&_!==It)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return f},has(l,u){var _;if(u===ja)return!0;var f=n.get(u),h=f!==void 0&&f.v!==It||Reflect.has(l,u);if(f!==void 0||rt!==null&&(!h||(_=Ja(l,u))!=null&&_.writable)){f===void 0&&(f=i(()=>{var b=h?Oe(l[u]):It,k=H(b);return k}),n.set(u,f));var g=e(f);if(g===It)return!1}return h},set(l,u,f,h){var T;var g=n.get(u),_=u in l;if(r&&u==="length")for(var b=f;b<g.v;b+=1){var k=n.get(b+"");k!==void 0?v(k,It):b in l&&(k=i(()=>H(It)),n.set(b+"",k))}if(g===void 0)(!_||(T=Ja(l,u))!=null&&T.writable)&&(g=i(()=>H(void 0)),v(g,Oe(f)),n.set(u,g));else{_=g.v!==It;var w=i(()=>Oe(f));v(g,w)}var x=Reflect.getOwnPropertyDescriptor(l,u);if(x!=null&&x.set&&x.set.call(h,f),!_){if(r&&typeof u=="string"){var j=n.get("length"),S=Number(u);Number.isInteger(S)&&S>=j.v&&v(j,S+1)}or(o)}return!0},ownKeys(l){e(o);var u=Reflect.ownKeys(l).filter(g=>{var _=n.get(g);return _===void 0||_.v!==It});for(var[f,h]of n)h.v!==It&&!(f in l)&&u.push(f);return u},setPrototypeOf(){Ec()}})}function As(a){try{if(a!==null&&typeof a=="object"&&ja in a)return a[ja]}catch{}return a}function pd(a,t){return Object.is(As(a),As(t))}var Uo,Un,el,tl,al;function gd(){if(Uo===void 0){Uo=window,Un=document,el=/Firefox/.test(navigator.userAgent);var a=Element.prototype,t=Node.prototype,n=Text.prototype;tl=Ja(t,"firstChild").get,al=Ja(t,"nextSibling").get,Es(a)&&(a[Ao]=void 0,a[Cr]=null,a[Io]=void 0,a.__e=void 0),Es(n)&&(n[Zn]=void 0)}}function Sa(a=""){return document.createTextNode(a)}function qa(a){return tl.call(a)}function yr(a){return al.call(a)}function s(a,t){return qa(a)}function Ne(a,t=!1){{var n=qa(a);return n instanceof Comment&&n.data===""?yr(n):n}}function d(a,t=1,n=!1){let r=a;for(;t--;)r=yr(r);return r}function md(a){a.textContent=""}function nl(){return!1}function rl(a,t,n){return t==null||t===Ri?n?document.createElement(a,{is:n}):document.createElement(a):n?document.createElementNS(t,a,{is:n}):document.createElementNS(t,a)}function ol(a){rt===null&&(ct===null&&Tc(),Sc()),Ba&&xc()}function bd(a,t){var n=t.last;n===null?t.last=t.first=a:(n.next=a,a.prev=n,t.last=a)}function ga(a,t){var n=rt;n!==null&&(n.f&Zt)!==0&&(a|=Zt);var r={ctx:Et,deps:null,nodes:null,f:a|Rt|fa,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};Ie==null||Ie.register_created_effect(r);var o=r;if((a&pn)!==0)Sn!==null?Sn.push(r):mn.ensure().schedule(r);else if(t!==null){try{Rn(r)}catch(i){throw Gt(r),i}o.deps===null&&o.teardown===null&&o.nodes===null&&o.first===o.last&&(o.f&Bn)===0&&(o=o.first,(a&ka)!==0&&(a&Xa)!==0&&o!==null&&(o.f|=Xa))}if(o!==null&&(o.parent=n,n!==null&&bd(o,n),ct!==null&&(ct.f&Ut)!==0&&(a&Oa)===0)){var c=ct;(c.effects??(c.effects=[])).push(o)}return r}function vs(){return ct!==null&&!wa}function to(a){const t=ga(gr,null);return jt(t,Lt),t.teardown=a,t}function Pt(a){ol();var t=rt.f,n=!ct&&(t&ha)!==0&&Et!==null&&!Et.i;if(n){var r=Et;(r.e??(r.e=[])).push(a)}else return sl(a)}function sl(a){return ga(pn|ji,a)}function yd(a){return ol(),ga(gr|ji,a)}function kd(a){mn.ensure();const t=ga(Oa|Bn,a);return(n={})=>new Promise(r=>{n.outro?hn(t,()=>{Gt(t),r(void 0)}):(Gt(t),r(void 0))})}function ao(a){return ga(pn,a)}function wd(a){return ga(Tn|Bn,a)}function fs(a,t=0){return ga(gr|t,a)}function M(a,t=[],n=[],r=[]){is(r,t,n,o=>{ga(gr,()=>{a(...o.map(e))})})}function kr(a,t=[],n=[],r=[]){is(r,t,n,o=>{ga(pn,()=>a(...o.map(e)))})}function Wn(a,t=0){var n=ga(ka|t,a);return n}function il(a,t=0){var n=ga(os|t,a);return n}function Xt(a){return ga(ha|Bn,a)}function ll(a){var t=a.teardown;if(t!==null){const n=Ba,r=ct;Is(!0),_a(null);try{t.call(null)}finally{Is(n),_a(r)}}}function hs(a,t=!1){var n=a.first;for(a.first=a.last=null;n!==null;){const o=n.ac;o!==null&&Hn(()=>{o.abort(mr)});var r=n.next;(n.f&Oa)!==0?n.parent=null:Gt(n,t),n=r}}function xd(a){for(var t=a.first;t!==null;){var n=t.next;(t.f&ha)===0&&Gt(t),t=n}}function Gt(a,t=!0){var n=!1;(t||(a.f&Ci)!==0)&&a.nodes!==null&&a.nodes.end!==null&&(Sd(a.nodes.start,a.nodes.end),n=!0),a.f|=Fo,hs(a,t&&!n),ir(a,0);var r=a.nodes&&a.nodes.t;if(r!==null)for(const c of r)c.stop();ll(a),a.f^=Fo,a.f|=sa;var o=a.parent;o!==null&&o.first!==null&&cl(a),a.next=a.prev=a.teardown=a.ctx=a.deps=a.fn=a.nodes=a.ac=a.b=null}function Sd(a,t){for(;a!==null;){var n=a===t?null:yr(a);a.remove(),a=n}}function cl(a){var t=a.parent,n=a.prev,r=a.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===a&&(t.first=r),t.last===a&&(t.last=n))}function hn(a,t,n=!0){var r=[];dl(a,r,!0);var o=()=>{n&&Gt(a),t&&t()},c=r.length;if(c>0){var i=()=>--c||o();for(var l of r)l.out(i)}else o()}function dl(a,t,n){if((a.f&Zt)===0){a.f^=Zt;var r=a.nodes&&a.nodes.t;if(r!==null)for(const l of r)(l.is_global||n)&&t.push(l);for(var o=a.first;o!==null;){var c=o.next;if((o.f&Oa)===0){var i=(o.f&Xa)!==0||(o.f&ha)!==0&&(a.f&ka)!==0;dl(o,t,i?n:!1)}o=c}}}function Ur(a){ul(a,!0)}function ul(a,t){if((a.f&Zt)!==0){a.f^=Zt,(a.f&Lt)===0&&(jt(a,Rt),mn.ensure().schedule(a));for(var n=a.first;n!==null;){var r=n.next,o=(n.f&Xa)!==0||(n.f&ha)!==0;ul(n,o?t:!1),n=r}var c=a.nodes&&a.nodes.t;if(c!==null)for(const i of c)(i.is_global||t)&&i.in()}}function _s(a,t){if(a.nodes)for(var n=a.nodes.start,r=a.nodes.end;n!==null;){var o=n===r?null:yr(n);t.append(n),n=o}}let Ir=!1,Ba=!1;function Is(a){Ba=a}let ct=null,wa=!1;function _a(a){ct=a}let rt=null;function pa(a){rt=a}let Na=null;function vl(a){ct!==null&&(Na??(Na=new Set)).add(a)}let ta=null,na=0,la=null;function Td(a){la=a}let fl=1,nn=0,_n=nn;function Rs(a){_n=a}function hl(){return++fl}function wr(a){var t=a.f;if((t&Rt)!==0)return!0;if(t&Ut&&(a.f&=~gn),(t&xa)!==0){for(var n=a.deps,r=n.length,o=0;o<r;o++){var c=n[o];if(wr(c)&&Yi(c),c.wv>a.wv)return!0}(t&fa)!==0&&Yt===null&&jt(a,Lt)}return!1}function _l(a,t,n=!0){var r=a.reactions;if(r!==null&&!(Na!==null&&Na.has(a)))for(var o=0;o<r.length;o++){var c=r[o];(c.f&Ut)!==0?_l(c,t,!1):t===c&&(n?jt(c,Rt):(c.f&Lt)!==0&&jt(c,xa),us(c))}}function pl(a){var w;var t=ta,n=na,r=la,o=ct,c=Na,i=Et,l=wa,u=_n,f=a.f;ta=null,na=0,la=null,ct=(f&(ha|Oa))===0?a:null,Na=null,Fn(a.ctx),wa=!1,_n=++nn,a.ac!==null&&(Hn(()=>{a.ac.abort(mr)}),a.ac=null);try{a.f|=Br;var h=a.fn,g=h();a.f|=On;var _=a.deps,b=Ie==null?void 0:Ie.is_fork;if(ta!==null){var k;if(b||ir(a,na),_!==null&&na>0)for(_.length=na+ta.length,k=0;k<ta.length;k++)_[na+k]=ta[k];else a.deps=_=ta;if(vs()&&(a.f&fa)!==0)for(k=na;k<_.length;k++)((w=_[k]).reactions??(w.reactions=[])).push(a)}else!b&&_!==null&&na<_.length&&(ir(a,na),_.length=na);if(br()&&la!==null&&!wa&&_!==null&&(a.f&(Ut|xa|Rt))===0)for(k=0;k<la.length;k++)_l(la[k],a);if(o!==null&&o!==a){if(nn++,o.deps!==null)for(let x=0;x<n;x+=1)o.deps[x].rv=nn;if(t!==null)for(const x of t)x.rv=nn;la!==null&&(r===null?r=la:r.push(...la))}return(a.f&Qa)!==0&&(a.f^=Qa),g}catch(x){return Bi(x)}finally{a.f^=Br,ta=t,na=n,la=r,ct=o,Na=c,Fn(i),wa=l,_n=u}}function Dd(a,t){let n=t.reactions;if(n!==null){var r=fc.call(n,a);if(r!==-1){var o=n.length-1;o===0?n=t.reactions=null:(n[r]=n[o],n.pop())}}if(n===null&&(t.f&Ut)!==0&&(ta===null||!Lr.call(ta,t))){var c=t;(c.f&fa)!==0&&(c.f^=fa,c.f&=~gn),c.v!==It&&ss(c),c.ac!==null&&Hn(()=>{c.ac.abort(mr),c.ac=null,jt(c,Rt)}),cd(c),ir(c,0)}}function ir(a,t){var n=a.deps;if(n!==null)for(var r=t;r<n.length;r++)Dd(a,n[r])}function Rn(a){var t=a.f;if((t&sa)===0){jt(a,Lt);var n=rt,r=Ir;rt=a,Ir=(t&(ha|Oa))===0;try{(t&(ka|os))!==0?xd(a):hs(a),ll(a);var o=pl(a);a.teardown=typeof o=="function"?o:null,a.wv=fl;var c;Di&&Kc&&(a.f&Rt)!==0&&a.deps}finally{Ir=r,rt=n}}}async function Pd(){await Promise.resolve(),vd()}function e(a){var t=a.f,n=(t&Ut)!==0;if(ct!==null&&!wa){var r=rt!==null&&(rt.f&sa)!==0;if(!r&&(Na===null||!Na.has(a))){var o=ct.deps;if((ct.f&Br)!==0)a.rv<nn&&(a.rv=nn,ta===null&&o!==null&&o[na]===a?na++:ta===null?ta=[a]:ta.push(a));else{ct.deps??(ct.deps=[]),Lr.call(ct.deps,a)||ct.deps.push(a);var c=a.reactions;c===null?a.reactions=[ct]:Lr.call(c,ct)||c.push(ct)}}}if(Ba&&fn.has(a))return fn.get(a);if(n){var i=a;if(Ba){var l=i.v;return((i.f&Lt)===0&&i.reactions!==null||ml(i))&&(l=cs(i)),fn.set(i,l),l}var u=(i.f&fa)===0&&!wa&&ct!==null&&(Ir||(ct.f&fa)!==0),f=(i.f&On)===0;wr(i)&&(u&&(i.f|=fa),Yi(i)),u&&!f&&(Gi(i),gl(i))}if(Yt!=null&&Yt.has(a))return Yt.get(a);if((a.f&Qa)!==0)throw a.v;return a.v}function gl(a){if(a.f|=fa,a.deps!==null)for(const t of a.deps)(t.reactions??(t.reactions=[])).push(a),(t.f&Ut)!==0&&(t.f&fa)===0&&(Gi(t),gl(t))}function ml(a){if(a.v===It)return!0;if(a.deps===null)return!1;for(const t of a.deps)if(fn.has(t)||(t.f&Ut)!==0&&ml(t))return!0;return!1}function Kt(a){var t=wa;try{return wa=!0,a()}finally{wa=t}}function tn(a){if(!(typeof a!="object"||!a||a instanceof EventTarget)){if(ja in a)Wo(a);else if(!Array.isArray(a))for(let t in a){const n=a[t];typeof n=="object"&&n&&ja in n&&Wo(n)}}}function Wo(a,t=new Set){if(typeof a=="object"&&a!==null&&!(a instanceof EventTarget)&&!t.has(a)){t.add(a),a instanceof Date&&a.getTime();for(let r in a)try{Wo(a[r],t)}catch{}const n=rs(a);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=Pi(n);for(let o in r){const c=r[o].get;if(c)try{c.call(a)}catch{}}}}}function Md(a){return a.endsWith("capture")&&a!=="gotpointercapture"&&a!=="lostpointercapture"}const Ed=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Cd(a){return Ed.includes(a)}const jd={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Nd(a){return a=a.toLowerCase(),jd[a]??a}const Fd=["touchstart","touchmove"];function Ad(a){return Fd.includes(a)}const rn=Symbol("events"),bl=new Set,Yo=new Set;function yl(a,t,n,r={}){function o(c){if(r.capture||Go.call(t,c),!c.cancelBubble)return Hn(()=>n==null?void 0:n.call(this,c))}return a.startsWith("pointer")||a.startsWith("touch")||a==="wheel"?Ea(()=>{t.addEventListener(a,o,r)}):t.addEventListener(a,o,r),o}function kt(a,t,n,r,o){var c={capture:r,passive:o},i=yl(a,t,n,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&to(()=>{t.removeEventListener(a,i,c)})}function J(a,t,n){(t[rn]??(t[rn]={}))[a]=n}function St(a){for(var t=0;t<a.length;t++)bl.add(a[t]);for(var n of Yo)n(a)}let qs=null;function Go(a){var w,x;var t=this,n=t.ownerDocument,r=a.type,o=((w=a.composedPath)==null?void 0:w.call(a))||[],c=o[0]||a.target;qs=a;var i=0,l=qs===a&&a[rn];if(l){var u=o.indexOf(l);if(u!==-1&&(t===document||t===window)){a[rn]=t;return}var f=o.indexOf(t);if(f===-1)return;u<=f&&(i=u)}if(c=o[i]||a.target,c!==t){hc(a,"currentTarget",{configurable:!0,get(){return c||n}});var h=ct,g=rt;_a(null),pa(null);try{for(var _,b=[];c!==null&&c!==t;){try{var k=(x=c[rn])==null?void 0:x[r];k!=null&&(!c.disabled||a.target===c)&&k.call(c,a)}catch(j){_?b.push(j):_=j}if(a.cancelBubble)break;i++,c=i<o.length?o[i]:null}if(_){for(let j of b)queueMicrotask(()=>{throw j});throw _}}finally{a[rn]=t,delete a.currentTarget,_a(h),pa(g)}}}var Si;const fo=((Si=globalThis==null?void 0:globalThis.window)==null?void 0:Si.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:a=>a});function Id(a){return(fo==null?void 0:fo.createHTML(a))??a}function kl(a){var t=rl("template");return t.innerHTML=Id(a.replaceAll("<!>","<!---->")),t.content}function bn(a,t){var n=rt;n.nodes===null&&(n.nodes={start:a,end:t,a:null,t:null})}function E(a,t){var n=(t&Ii)!==0,r=(t&Bc)!==0,o,c=!a.startsWith("<!>");return()=>{o===void 0&&(o=kl(c?a:"<!>"+a),n||(o=qa(o)));var i=r||el?document.importNode(o,!0):o.cloneNode(!0);if(n){var l=qa(i),u=i.lastChild;bn(l,u)}else bn(i,i);return i}}function Rd(a,t,n="svg"){var r=!a.startsWith("<!>"),o=(t&Ii)!==0,c=`<${n}>${r?a:"<!>"+a}</${n}>`,i;return()=>{if(!i){var l=kl(c),u=qa(l);if(o)for(i=document.createDocumentFragment();qa(u);)i.appendChild(qa(u));else i=qa(u)}var f=i.cloneNode(!0);if(o){var h=qa(f),g=f.lastChild;bn(h,g)}else bn(f,f);return f}}function kn(a,t){return Rd(a,t,"svg")}function Ls(a=""){{var t=Sa(a+"");return bn(t,t),t}}function ze(){var a=document.createDocumentFragment(),t=document.createComment(""),n=Sa();return a.append(t,n),bn(t,n),a}function m(a,t){a!==null&&a.before(t)}function p(a,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(a[Zn]??(a[Zn]=a.nodeValue))&&(a[Zn]=n,a.nodeValue=`${n}`)}function qd(a,t){return Ld(a,t)}const Mr=new Map;function Ld(a,{target:t,anchor:n,props:r={},events:o,context:c,intro:i=!0,transformError:l}){gd();var u=void 0,f=kd(()=>{var h=n??t.appendChild(Sa());td(h,{pending:()=>{}},b=>{pt({});var k=Et;c&&(k.c=c),o&&(r.$$events=o),u=a(b,r)||{},gt()},l);var g=new Set,_=b=>{for(var k=0;k<b.length;k++){var w=b[k];if(!g.has(w)){g.add(w);var x=Ad(w);for(const T of[t,document]){var j=Mr.get(T);j===void 0&&(j=new Map,Mr.set(T,j));var S=j.get(w);S===void 0?(T.addEventListener(w,Go,{passive:x}),j.set(w,1)):j.set(w,S+1)}}}};return _($r(bl)),Yo.add(_),()=>{var x;for(var b of g)for(const j of[t,document]){var k=Mr.get(j),w=k.get(b);--w==0?(j.removeEventListener(b,Go),k.delete(b),k.size===0&&Mr.delete(j)):k.set(b,w)}Yo.delete(_),h!==n&&((x=h.parentNode)==null||x.removeChild(h))}});return Od.set(u,f),u}let Od=new WeakMap;var ya,Pa,oa,un,_r,pr,Zr;class ps{constructor(t,n=!0){aa(this,"anchor");tt(this,ya,new Map);tt(this,Pa,new Map);tt(this,oa,new Map);tt(this,un,new Set);tt(this,_r,!0);tt(this,pr,t=>{if(F(this,ya).has(t)){var n=F(this,ya).get(t),r=F(this,Pa).get(n);if(r)Ur(r),F(this,un).delete(n);else{var o=F(this,oa).get(n);o&&(Ur(o.effect),F(this,Pa).set(n,o.effect),F(this,oa).delete(n),o.fragment.lastChild.remove(),this.anchor.before(o.fragment),r=o.effect)}for(const[c,i]of F(this,ya)){if(F(this,ya).delete(c),c===t)break;const l=F(this,oa).get(i);l&&(Gt(l.effect),F(this,oa).delete(i))}for(const[c,i]of F(this,Pa)){if(c===n||F(this,un).has(c))continue;const l=()=>{if(Array.from(F(this,ya).values()).includes(c)){var f=document.createDocumentFragment();_s(i,f),f.append(Sa()),F(this,oa).set(c,{effect:i,fragment:f})}else Gt(i);F(this,un).delete(c),F(this,Pa).delete(c)};F(this,_r)||!r?(F(this,un).add(c),hn(i,l,!1)):l()}}});tt(this,Zr,t=>{F(this,ya).delete(t);const n=Array.from(F(this,ya).values());for(const[r,o]of F(this,oa))n.includes(r)||(Gt(o.effect),F(this,oa).delete(r))});this.anchor=t,Ze(this,_r,n)}ensure(t,n){var r=Ie,o=nl();if(n&&!F(this,Pa).has(t)&&!F(this,oa).has(t))if(o){var c=document.createDocumentFragment(),i=Sa();c.append(i),F(this,oa).set(t,{effect:Xt(()=>n(i)),fragment:c})}else F(this,Pa).set(t,Xt(()=>n(this.anchor)));if(F(this,ya).set(r,t),o){for(const[l,u]of F(this,Pa))l===t?r.unskip_effect(u):r.skip_effect(u);for(const[l,u]of F(this,oa))l===t?r.unskip_effect(u.effect):r.skip_effect(u.effect);r.oncommit(F(this,pr)),r.ondiscard(F(this,Zr))}else F(this,pr).call(this,r)}}ya=new WeakMap,Pa=new WeakMap,oa=new WeakMap,un=new WeakMap,_r=new WeakMap,pr=new WeakMap,Zr=new WeakMap;function le(a,t,n=!1){var r=new ps(a),o=n?Xa:0;function c(i,l){r.ensure(i,l)}Wn(()=>{var i=!1;t((l,u=0)=>{i=!0,c(u,l)}),i||c(-1,null)},o)}function La(a,t){return t}function Bd(a,t,n){for(var r=[],o=t.length,c,i=t.length,l=0;l<o;l++){let g=t[l];hn(g,()=>{if(c){if(c.pending.delete(g),c.done.add(g),c.pending.size===0){var _=a.outrogroups;Ko(a,$r(c.done)),_.delete(c),_.size===0&&(a.outrogroups=null)}}else i-=1},!1)}if(i===0){var u=r.length===0&&n!==null&&a.pending.size===0;if(u){var f=n,h=f.parentNode;md(h),h.append(f),a.items.clear()}Ko(a,t,!u)}else c={pending:new Set(t),done:new Set},(a.outrogroups??(a.outrogroups=new Set)).add(c)}function Ko(a,t,n=!0){var r;if(a.pending.size>0){r=new Set;for(const i of a.pending.values())for(const l of i)r.add(a.items.get(l).e)}for(var o=0;o<t.length;o++){var c=t[o];if(r!=null&&r.has(c)){c.f|=Ma;const i=document.createDocumentFragment();_s(c,i)}else Gt(t[o],n)}}var Os;function Me(a,t,n,r,o,c=null){var i=a,l=new Map,u=(t&Fi)!==0;if(u){var f=a;i=f.appendChild(Sa())}var h=null,g=ls(()=>{var T=n();return ns(T)?T:T==null?[]:$r(T)}),_,b=new Map,k=!0;function w(T){(S.effect.f&sa)===0&&(S.pending.delete(T),S.fallback=h,zd(S,_,i,t,r),h!==null&&(_.length===0?(h.f&Ma)===0?Ur(h):(h.f^=Ma,ar(h,null,i)):hn(h,()=>{h=null})))}function x(T){S.pending.delete(T)}var j=Wn(()=>{_=e(g);for(var T=_.length,q=new Set,A=Ie,O=nl(),U=0;U<T;U+=1){var $=_[U],ee=r($,U),he=k?null:l.get(ee);he?(he.v&&In(he.v,$),he.i&&In(he.i,U),O&&A.unskip_effect(he.e)):(he=Hd(l,k?i:Os??(Os=Sa()),$,ee,U,o,t,n),k||(he.e.f|=Ma),l.set(ee,he)),q.add(ee)}if(T===0&&c&&!h&&(k?h=Xt(()=>c(i)):(h=Xt(()=>c(Os??(Os=Sa()))),h.f|=Ma)),T>q.size&&wc(),!k)if(b.set(A,q),O){for(const[ne,te]of l)q.has(ne)||A.skip_effect(te.e);A.oncommit(w),A.ondiscard(x)}else w(A);e(g)}),S={effect:j,items:l,pending:b,outrogroups:null,fallback:h};k=!1}function Kn(a){for(;a!==null&&(a.f&ha)===0;)a=a.next;return a}function zd(a,t,n,r,o){var he,ne,te,ue,P,G,de,be,ge;var c=(r&Ac)!==0,i=t.length,l=a.items,u=Kn(a.effect.first),f,h=null,g,_=[],b=[],k,w,x,j;if(c)for(j=0;j<i;j+=1)k=t[j],w=o(k,j),x=l.get(w).e,(x.f&Ma)===0&&((ne=(he=x.nodes)==null?void 0:he.a)==null||ne.measure(),(g??(g=new Set)).add(x));for(j=0;j<i;j+=1){if(k=t[j],w=o(k,j),x=l.get(w).e,a.outrogroups!==null)for(const Te of a.outrogroups)Te.pending.delete(x),Te.done.delete(x);if((x.f&Zt)!==0&&(Ur(x),c&&((ue=(te=x.nodes)==null?void 0:te.a)==null||ue.unfix(),(g??(g=new Set)).delete(x))),(x.f&Ma)!==0)if(x.f^=Ma,x===u)ar(x,null,n);else{var S=h?h.next:u;x===a.effect.last&&(a.effect.last=x.prev),x.prev&&(x.prev.next=x.next),x.next&&(x.next.prev=x.prev),Wa(a,h,x),Wa(a,x,S),ar(x,S,n),h=x,_=[],b=[],u=Kn(h.next);continue}if(x!==u){if(f!==void 0&&f.has(x)){if(_.length<b.length){var T=b[0],q;h=T.prev;var A=_[0],O=_[_.length-1];for(q=0;q<_.length;q+=1)ar(_[q],T,n);for(q=0;q<b.length;q+=1)f.delete(b[q]);Wa(a,A.prev,O.next),Wa(a,h,A),Wa(a,O,T),u=T,h=O,j-=1,_=[],b=[]}else f.delete(x),ar(x,u,n),Wa(a,x.prev,x.next),Wa(a,x,h===null?a.effect.first:h.next),Wa(a,h,x),h=x;continue}for(_=[],b=[];u!==null&&u!==x;)(f??(f=new Set)).add(u),b.push(u),u=Kn(u.next);if(u===null)continue}(x.f&Ma)===0&&_.push(x),h=x,u=Kn(x.next)}if(a.outrogroups!==null){for(const Te of a.outrogroups)Te.pending.size===0&&(Ko(a,$r(Te.done)),(P=a.outrogroups)==null||P.delete(Te));a.outrogroups.size===0&&(a.outrogroups=null)}if(u!==null||f!==void 0){var U=[];if(f!==void 0)for(x of f)(x.f&Zt)===0&&U.push(x);for(;u!==null;)(u.f&Zt)===0&&u!==a.fallback&&U.push(u),u=Kn(u.next);var $=U.length;if($>0){var ee=(r&Fi)!==0&&i===0?n:null;if(c){for(j=0;j<$;j+=1)(de=(G=U[j].nodes)==null?void 0:G.a)==null||de.measure();for(j=0;j<$;j+=1)(ge=(be=U[j].nodes)==null?void 0:be.a)==null||ge.fix()}Bd(a,U,ee)}}c&&Ea(()=>{var Te,Fe;if(g!==void 0)for(x of g)(Fe=(Te=x.nodes)==null?void 0:Te.a)==null||Fe.apply()})}function Hd(a,t,n,r,o,c,i,l){var u=(i&Nc)!==0?(i&Ic)===0?hd(n,!1,!1):Za(n):null,f=(i&Fc)!==0?Za(o):null;return{v:u,i:f,e:Xt(()=>(c(t,u??n,f??o,l),()=>{a.delete(r)}))}}function ar(a,t,n){if(a.nodes)for(var r=a.nodes.start,o=a.nodes.end,c=t&&(t.f&Ma)===0?t.nodes.start:n;r!==null;){var i=yr(r);if(c.before(r),r===o)return;r=i}}function Wa(a,t,n){t===null?a.effect.first=n:t.next=n,n===null?a.effect.last=t:n.prev=t}function at(a,t,n,r,o){var l;var c=(l=t.$$slots)==null?void 0:l[n],i=!1;c===!0&&(c=t.children,i=!0),c===void 0||c(a,i?()=>r:r)}function xr(a,t,n){var r=new ps(a);Wn(()=>{var o=t()??null;r.ensure(o,o&&(c=>n(c,o)))},Xa)}function Ud(a,t,n,r,o,c){var i=null,l=a,u=new ps(l,!1);Wn(()=>{const f=t()||null;var h=zc;if(f===null){u.ensure(null,null);return}return u.ensure(f,g=>{if(f){if(i=rl(f,h),bn(i,i),r){var _=null,b=i.appendChild(Sa());r(i,b),_==null||_.remove()}rt.nodes.end=i,g.before(i)}}),()=>{}},Xa),to(()=>{})}function Sr(a,t){var n;n=document.head.appendChild(Sa());try{Wn(()=>{var r=Xt(()=>t(n));r.f|=Ci})}finally{}}function Wd(a,t){var n=void 0,r;il(()=>{n!==(n=t())&&(r&&(Gt(r),r=null),n&&(r=Xt(()=>{ao(()=>n(a))})))})}function wl(a){var t,n,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var o=a.length;for(t=0;t<o;t++)a[t]&&(n=wl(a[t]))&&(r&&(r+=" "),r+=n)}else for(n in a)a[n]&&(r&&(r+=" "),r+=n);return r}function Yd(){for(var a,t,n=0,r="",o=arguments.length;n<o;n++)(a=arguments[n])&&(t=wl(a))&&(r&&(r+=" "),r+=t);return r}function Gd(a){return typeof a=="object"?Yd(a):a??""}const Bs=[...` 	
\r\f \v\uFEFF`];function Kd(a,t,n){var r=a==null?"":""+a;if(t&&(r=r?r+" "+t:t),n){for(var o of Object.keys(n))if(n[o])r=r?r+" "+o:o;else if(r.length)for(var c=o.length,i=0;(i=r.indexOf(o,i))>=0;){var l=i+c;(i===0||Bs.includes(r[i-1]))&&(l===r.length||Bs.includes(r[l]))?r=(i===0?"":r.substring(0,i))+r.substring(l+1):i=l}}return r===""?null:r}function zs(a,t=!1){var n=t?" !important;":";",r="";for(var o of Object.keys(a)){var c=a[o];c!=null&&c!==""&&(r+=" "+o+": "+c+n)}return r}function ho(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function Vd(a,t){if(t){var n="",r,o;if(Array.isArray(t)?(r=t[0],o=t[1]):r=t,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,i=0,l=!1,u=[];r&&u.push(...Object.keys(r).map(ho)),o&&u.push(...Object.keys(o).map(ho));var f=0,h=-1;const w=a.length;for(var g=0;g<w;g++){var _=a[g];if(l?_==="/"&&a[g-1]==="*"&&(l=!1):c?c===_&&(c=!1):_==="/"&&a[g+1]==="*"?l=!0:_==='"'||_==="'"?c=_:_==="("?i++:_===")"&&i--,!l&&c===!1&&i===0){if(_===":"&&h===-1)h=g;else if(_===";"||g===w-1){if(h!==-1){var b=ho(a.substring(f,h).trim());if(!u.includes(b)){_!==";"&&g++;var k=a.substring(f,g).trim();n+=" "+k+";"}}f=g+1,h=-1}}}}return r&&(n+=zs(r)),o&&(n+=zs(o,!0)),n=n.trim(),n===""?null:n}return a==null?null:String(a)}function Ke(a,t,n,r,o,c){var i=a[Ao];if(i!==n||i===void 0){var l=Kd(n,r,c);l==null?a.removeAttribute("class"):t?a.className=l:a.setAttribute("class",l),a[Ao]=n}else if(c&&o!==c)for(var u in c){var f=!!c[u];(o==null||f!==!!o[u])&&a.classList.toggle(u,f)}return c}function _o(a,t={},n,r){for(var o in n){var c=n[o];t[o]!==c&&(n[o]==null?a.style.removeProperty(o):a.style.setProperty(o,c,r))}}function Ot(a,t,n,r){var o=a[Io];if(o!==t){var c=Vd(t,r);c==null?a.removeAttribute("style"):a.style.cssText=c,a[Io]=t}else r&&(Array.isArray(r)?(_o(a,n==null?void 0:n[0],r[0]),_o(a,n==null?void 0:n[1],r[1],"important")):_o(a,n,r));return r}function Nt(a,t,n=!1){if(a.multiple){if(t==null)return;if(!ns(t))return Wc();for(var r of a.options)r.selected=t.includes(sr(r));return}for(r of a.options){var o=sr(r);if(pd(o,t)){r.selected=!0;return}}(!n||t!==void 0)&&(a.selectedIndex=-1)}function qt(a){var t=new MutationObserver(()=>{"__value"in a&&Nt(a,a.__value)});t.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),to(()=>{t.disconnect()})}function Wr(a,t,n=t){var r=new WeakSet,o=!0;Ui(a,"change",c=>{var i=c?"[selected]":":checked",l;if(a.multiple)l=[].map.call(a.querySelectorAll(i),sr);else{var u=a.querySelector(i)??a.querySelector("option:not([disabled])");l=u&&sr(u)}n(l),a.__value=l,Ie!==null&&r.add(Ie)}),ao(()=>{var c=t();if(a===document.activeElement){var i=Ie;if(r.has(i))return}if(Nt(a,c,o),o&&c===void 0){var l=a.querySelector(":checked");l!==null&&(c=sr(l),n(c))}a.__value=c,o=!1}),qt(a)}function sr(a){return"__value"in a?a.__value:a.value}const Vn=Symbol("class"),Jn=Symbol("style"),xl=Symbol("is custom element"),Sl=Symbol("is html"),Jd=eo?"input":"INPUT",Qd=eo?"option":"OPTION",Xd=eo?"select":"SELECT",Zd=eo?"progress":"PROGRESS";function Vo(a,t){var n=no(a);n.value===(n.value=t??void 0)||a.value===t&&(t!==0||a.nodeName!==Zd)||(a.value=t??"")}function Tl(a,t){var n=no(a);n.checked!==(n.checked=t??void 0)&&(a.checked=t)}function $d(a,t){t?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function z(a,t,n,r){var o=no(a);o[t]!==(o[t]=n)&&(t==="loading"&&(a[bc]=n),n==null?a.removeAttribute(t):typeof n!="string"&&Dl(a).includes(t)?a[t]=n:a.setAttribute(t,n))}function eu(a,t,n,r,o=!1,c=!1){var i=no(a),l=i[xl],u=!i[Sl],f=t||{},h=a.nodeName===Qd;for(var g in t)g in n||(n[g]=null);n.class?n.class=Gd(n.class):n[Vn]&&(n.class=null),n[Jn]&&(n.style??(n.style=null));var _=Dl(a);if(a.nodeName===Jd&&"type"in n&&("value"in n||"__value"in n)){var b=n.type;(b!==f.type||b===void 0&&a.hasAttribute("type"))&&(f.type=b,z(a,"type",b))}for(const A in n){let O=n[A];if(h&&A==="value"&&O==null){a.value=a.__value="",f[A]=O;continue}if(A==="class"){var k=a.namespaceURI==="http://www.w3.org/1999/xhtml";Ke(a,k,O,r,t==null?void 0:t[Vn],n[Vn]),f[A]=O,f[Vn]=n[Vn];continue}if(A==="style"){Ot(a,O,t==null?void 0:t[Jn],n[Jn]),f[A]=O,f[Jn]=n[Jn];continue}var w=f[A];if(!(O===w&&!(O===void 0&&a.hasAttribute(A)))){f[A]=O;var x=A[0]+A[1];if(x!=="$$")if(x==="on"){const U={},$="$$"+A;let ee=A.slice(2);var j=Cd(ee);if(Md(ee)&&(ee=ee.slice(0,-7),U.capture=!0),!j&&w){if(O!=null)continue;a.removeEventListener(ee,f[$],U),f[$]=null}if(j)J(ee,a,O),St([ee]);else if(O!=null){let he=function(ne){f[A].call(this,ne)};var q=he;f[$]=yl(ee,a,he,U)}}else if(A==="style")z(a,A,O);else if(A==="autofocus")vn(a,!!O);else if(!l&&(A==="__value"||A==="value"&&O!=null))a.value=a.__value=O;else if(A==="selected"&&h)$d(a,O);else{var S=A;u||(S=Nd(S));var T=S==="defaultValue"||S==="defaultChecked";if(O==null&&!l&&!T)if(i[A]=null,S==="value"||S==="checked"){let U=a;const $=t===void 0;if(S==="value"){let ee=U.defaultValue;U.removeAttribute(S),U.defaultValue=ee,U.value=U.__value=$?ee:null}else{let ee=U.defaultChecked;U.removeAttribute(S),U.defaultChecked=ee,U.checked=$?ee:!1}}else a.removeAttribute(A);else T||_.includes(S)&&(l||typeof O!="string")?(a[S]=O,S in i&&(i[S]=It)):typeof O!="function"&&z(a,S,O)}}}return f}function Hs(a,t,n=[],r=[],o=[],c,i=!1,l=!1){is(o,n,r,u=>{var f=void 0,h={},g=a.nodeName===Xd,_=!1;if(il(()=>{var k=t(...u.map(e)),w=eu(a,f,k,c,i,l);_&&g&&"value"in k&&Nt(a,k.value);for(let j of Object.getOwnPropertySymbols(h))k[j]||Gt(h[j]);for(let j of Object.getOwnPropertySymbols(k)){var x=k[j];j.description===Hc&&(!f||x!==f[j])&&(h[j]&&Gt(h[j]),h[j]=Xt(()=>Wd(a,()=>x))),w[j]=x}f=w}),g){var b=a;ao(()=>{Nt(b,f.value,!0),qt(b)})}_=!0})}function no(a){return a[Cr]??(a[Cr]={[xl]:a.nodeName.includes("-"),[Sl]:a.namespaceURI===Ri})}var Us=new Map;function Dl(a){var t=a.getAttribute("is")||a.nodeName,n=Us.get(t);if(n)return n;Us.set(t,n=[]);for(var r,o=a,c=Element.prototype;c!==o;){r=Pi(o);for(var i in r)r[i].set&&i!=="innerHTML"&&i!=="textContent"&&i!=="innerText"&&n.push(i);o=rs(o)}return n}function wt(a,t,n=t){var r=new WeakSet;Ui(a,"input",async o=>{var c=o?a.defaultValue:a.value;if(c=po(a)?go(c):c,n(c),Ie!==null&&r.add(Ie),await Pd(),c!==(c=t())){var i=a.selectionStart,l=a.selectionEnd,u=a.value.length;if(a.value=c??"",l!==null){var f=a.value.length;i===l&&l===u&&f>u?(a.selectionStart=f,a.selectionEnd=f):(a.selectionStart=i,a.selectionEnd=Math.min(l,f))}}}),Kt(t)==null&&a.value&&(n(po(a)?go(a.value):a.value),Ie!==null&&r.add(Ie)),fs(()=>{var o=t();if(a===document.activeElement){var c=Ie;if(r.has(c))return}po(a)&&o===go(a.value)||a.type==="date"&&!o&&!a.value||o!==a.value&&(a.value=o??"")})}function po(a){var t=a.type;return t==="number"||t==="range"}function go(a){return a===""?null:+a}function mo(a,t){return a===t||(a==null?void 0:a[ja])===t}function tu(a={},t,n,r){var o=Et.r,c=rt;return ao(()=>{var i,l;return fs(()=>{i=l,l=[],Kt(()=>{mo(n(...l),a)||(t(a,...l),i&&mo(n(...i),a)&&t(null,...i))})}),()=>{let u=c;for(;u!==o&&u.parent!==null&&u.parent.f&Fo;)u=u.parent;const f=()=>{l&&mo(n(...l),a)&&t(null,...l)},h=u.teardown;u.teardown=()=>{f(),h==null||h()}}}),a}function au(a=!1){const t=Et,n=t.l.u;if(!n)return;let r=()=>tn(t.s);if(a){let o=0,c={};const i=An(()=>{let l=!1;const u=t.s;for(const f in u)u[f]!==c[f]&&(c[f]=u[f],l=!0);return l&&o++,o});r=()=>e(i)}n.b.length&&yd(()=>{Ws(t,r),jo(n.b)}),Pt(()=>{const o=Kt(()=>n.m.map(mc));return()=>{for(const c of o)typeof c=="function"&&c()}}),n.a.length&&Pt(()=>{Ws(t,r),jo(n.a)})}function Ws(a,t){if(a.l.s)for(const n of a.l.s)e(n);t()}const nu={get(a,t){if(!a.exclude.includes(t))return e(a.version),t in a.special?a.special[t]():a.props[t]},set(a,t,n){if(!(t in a.special)){var r=rt;try{pa(a.parent_effect),a.special[t]=va({get[t](){return a.props[t]}},t,Ai)}finally{pa(r)}}return a.special[t](n),Fs(a.version),!0},getOwnPropertyDescriptor(a,t){if(!a.exclude.includes(t)&&t in a.props)return{enumerable:!0,configurable:!0,value:a.props[t]}},deleteProperty(a,t){return a.exclude.includes(t)||(a.exclude.push(t),Fs(a.version)),!0},has(a,t){return a.exclude.includes(t)?!1:t in a.props},ownKeys(a){return Reflect.ownKeys(a.props).filter(t=>!a.exclude.includes(t))}};function $e(a,t){return new Proxy({props:a,exclude:t,special:{},version:Za(0),parent_effect:rt},nu)}const ru={get(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(Gn(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(a,t,n){let r=a.props.length;for(;r--;){let o=a.props[r];Gn(o)&&(o=o());const c=Ja(o,t);if(c&&c.set)return c.set(n),!0}return!1},getOwnPropertyDescriptor(a,t){let n=a.props.length;for(;n--;){let r=a.props[n];if(Gn(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const o=Ja(r,t);return o&&!o.configurable&&(o.configurable=!0),o}}},has(a,t){if(t===ja||t===Ni)return!1;for(let n of a.props)if(Gn(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(a){const t=[];for(let n of a.props)if(Gn(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function ot(...a){return new Proxy({props:a},ru)}function va(a,t,n,r){var q;var o=!zn||(n&qc)!==0,c=(n&Lc)!==0,i=(n&Oc)!==0,l=r,u=!0,f=void 0,h=()=>i&&o?(f??(f=An(r)),e(f)):(u&&(u=!1,l=i?Kt(r):r),l);let g;if(c){var _=ja in a||Ni in a;g=((q=Ja(a,t))==null?void 0:q.set)??(_&&t in a?A=>a[t]=A:void 0)}var b,k=!1;c?[b,k]=Xc(()=>a[t]):b=a[t],b===void 0&&r!==void 0&&(b=h(),g&&(o&&Pc(),g(b)));var w;if(o?w=()=>{var A=a[t];return A===void 0?h():(u=!0,A)}:w=()=>{var A=a[t];return A!==void 0&&(l=void 0),A===void 0?l:A},o&&(n&Ai)===0)return w;if(g){var x=a.$$legacy;return(function(A,O){return arguments.length>0?((!o||!O||x||k)&&g(O?w():A),A):w()})}var j=!1,S=((n&Rc)!==0?An:ls)(()=>(j=!1,w()));c&&e(S);var T=rt;return(function(A,O){if(arguments.length>0){const U=O?e(S):o&&c?Oe(A):A;return v(S,U),j=!0,l!==void 0&&(l=U),A}return Ba&&j||(T.f&sa)!==0?S.v:e(S)})}function $a(a){Et===null&&yc(),zn&&Et.l!==null?ou(Et).m.push(a):Pt(()=>{const t=Kt(a);if(typeof t=="function")return t})}function ou(a){var t=a.l;return t.u??(t.u={a:[],b:[],m:[]})}const su="5";var Ti;typeof window<"u"&&((Ti=window.__svelte??(window.__svelte={})).v??(Ti.v=new Set)).add(su);Vc();/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const iu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const lu=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Ys=(...a)=>a.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var cu=kn("<svg><!><!></svg>");function st(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]),r=$e(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);pt(t,!1);let o=va(t,"name",8,void 0),c=va(t,"color",8,"currentColor"),i=va(t,"size",8,24),l=va(t,"strokeWidth",8,2),u=va(t,"absoluteStrokeWidth",8,!1),f=va(t,"iconNode",24,()=>[]);au();var h=cu();Hs(h,(b,k,w)=>({...iu,...b,...r,width:i(),height:i(),stroke:c(),"stroke-width":k,class:w}),[()=>lu(r)?void 0:{"aria-hidden":"true"},()=>(tn(u()),tn(l()),tn(i()),Kt(()=>u()?Number(l())*24/Number(i()):l())),()=>(tn(Ys),tn(o()),tn(n),Kt(()=>Ys("lucide-icon","lucide",o()?`lucide-${o()}`:"",n.class)))]);var g=s(h);Me(g,1,f,La,(b,k)=>{var w=R(()=>Ei(e(k),2));let x=()=>e(w)[0],j=()=>e(w)[1];var S=ze(),T=Ne(S);Ud(T,x,!0,(q,A)=>{Hs(q,()=>({...j()}))}),m(b,S)});var _=d(g);at(_,t,"default",{}),m(a,h),gt()}function Gs(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];st(a,ot({name:"award"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function du(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];st(a,ot({name:"bell"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function uu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];st(a,ot({name:"book-open"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function vu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"m9 16 2 2 4-4"}]];st(a,ot({name:"calendar-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Pl(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M16 14h.01"}],["path",{d:"M8 18h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M16 18h.01"}]];st(a,ot({name:"calendar-days"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function fu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M16 2v4"}],["path",{d:"M3 10h18"}],["path",{d:"M8 2v4"}],["path",{d:"M17 14h-6"}],["path",{d:"M13 18H7"}],["path",{d:"M7 14h.01"}],["path",{d:"M17 18h.01"}]];st(a,ot({name:"calendar-range"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function gs(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];st(a,ot({name:"chart-column"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function on(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];st(a,ot({name:"check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function lr(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];st(a,ot({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function hu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m15 18-6-6 6-6"}]];st(a,ot({name:"chevron-left"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function qn(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];st(a,ot({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Jo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];st(a,ot({name:"circle-check"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Ml(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];st(a,ot({name:"circle-question-mark"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function cr(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];st(a,ot({name:"clock"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function _u(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];st(a,ot({name:"download"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function pu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];st(a,ot({name:"ellipsis-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function gu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];st(a,ot({name:"flame"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function mu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];st(a,ot({name:"folder"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function bu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];st(a,ot({name:"grip-vertical"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function yu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]];st(a,ot({name:"languages"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function El(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["rect",{x:"3",y:"4",width:"6",height:"6",rx:"1"}]];st(a,ot({name:"list-todo"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function ku(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];st(a,ot({name:"mail"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function wu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];st(a,ot({name:"palette"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Cl(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];st(a,ot({name:"pencil"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function jl(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];st(a,ot({name:"play"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Ln(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];st(a,ot({name:"plus"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Nl(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]];st(a,ot({name:"quote"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function xu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];st(a,ot({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Su(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];st(a,ot({name:"rotate-ccw"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Tu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]];st(a,ot({name:"save"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Du(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];st(a,ot({name:"search"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Pu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];st(a,ot({name:"settings"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Mu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];st(a,ot({name:"sun"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Eu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];st(a,ot({name:"sunrise"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Cu(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];st(a,ot({name:"tag"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Qo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];st(a,ot({name:"target"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function ms(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];st(a,ot({name:"trash-2"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function bo(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];st(a,ot({name:"trending-up"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function ju(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];st(a,ot({name:"upload"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}function Fl(a,t){const n=$e(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];st(a,ot({name:"x"},()=>n,{get iconNode(){return r},children:(o,c)=>{var i=ze(),l=Ne(i);at(l,t,"default",{}),m(o,i)},$$slots:{default:!0}}))}const Nu="/timer";function Al(){const a=window.location.hash,t=a.startsWith("#")?a.slice(1):a;return!t||t==="/"?Nu:t}let bs=H(Oe(Al())),Ks=!1;function Fu(){Ks||typeof window>"u"||(Ks=!0,window.addEventListener("hashchange",()=>{v(bs,Al(),!0)}))}Fu();function Au(){return e(bs)}function Il(a){if(window.location.hash===`#${a}`){v(bs,a,!0);return}window.location.hash=a}const Iu=[{path:"/timer",labelKey:"timer"},{path:"/tasks",labelKey:"tasks"},{path:"/stats",labelKey:"stats"},{path:"/settings",labelKey:"settings"},{path:"/help",labelKey:"help"}],Ru={page:{timer:"番茄钟 - PomoFlow",tasks:"任务 - PomoFlow",stats:"统计 - PomoFlow",settings:"配置 - PomoFlow"},nav:{timer:"番茄钟",tasks:"任务清单",stats:"统计",settings:"配置",help:"帮助与反馈",mainNav:"主导航"},mode:{focus:"专注",shortBreak:"短休息",longBreak:"长休息",focusing:"专注中"},priority:{high:"高",medium:"中",low:"低",none:"无"},common:{confirm:"知道了",noData:"暂无任务",reviewPlaceholder:"写点复盘…",ariaCompleted:"已完成",ariaMarkDone:"标记完成",ariaMarkUndone:"标记为未完成",loading:"加载中...",close:"关闭",clear:"清除",add:"添加",expand:"展开",collapse:"收起"},timer:{start:"开始专注",startBreak:"开始休息啦",pause:"暂停",resume:"继续",stop:"停止",abandon:"放弃",skip:"跳过",starting:"启动中...",todayDone:"今日已完成",pomodoroUnit:"个番茄钟",pomodoros:"番茄",taskList:"任务清单",todayFocus:"今日专注",minute:"分钟",selectTask:"选择专注任务",selectTaskPlaceholder:"-- 选择任务 --",modeTabsAria:"计时器模式",noSpecificTask:"无特定任务",noTodoTask:"暂无待办任务",reviewTitle:"📝 今日日复盘",reviewPlaceholder:"记录今天的复盘…",clearFilter:"清除筛选",startTooltip:"开始专注",mottoRefresh:"换一条",modalTitle:"提示",focusCompleteTitle:"专注完成",noTask:"暂无任务",expandSubtasks:"展开子任务",collapseSubtasks:"收起子任务"},filter:{project:"项目",tag:"标签",priority:"优先级",date:"日　期",all:"全部",allProject:"全部项目",allTag:"全部标签",allPriority:"全部优先级",today:"今天",tomorrow:"明天",thisWeek:"本周",week:"本周",month:"本月",startDate:"开始日期",endDate:"结束日期",dueDate:"到期日",start:"开始",end:"结束",to:"至",export:"导出",projectAria:"项目筛选",tagAria:"标签筛选",priorityAria:"优先级筛选"},export:{index:"序号",title:"任务描述",project:"项目",priority:"优先级",dueDate:"到期日",estimated:"预计番茄数",tags:"标签",subtasks:"子任务",status:"任务状态",statusActive:"未完成",statusCompleted:"已完成",fileName:"任务清单"},task:{statEstimated:"预计时间",statActive:"待完成任务",statFocused:"已专注时间",statCompleted:"已完成任务",statCompletedPomo:"已完成番茄钟",searchResult:"搜索结果",list:"清单",task:"任务",noTask:"暂无任务",noDate:"未安排日期",unscheduled:"未安排",minute:"分钟",startTooltip:"开始专注",detailPriority:"优先级",detailPomodoro:"番茄",detailDueDate:"到期日",detailProject:"清单",detailReminder:"提醒",detailRepeat:"重复",detailNoTags:"无标签",detailEditTags:"编辑标签",detailCollapse:"收起",detailAddSubtask:"添加子任务...",subtaskEditPlaceholder:"修改子任务...",editSubtask:"编辑子任务",deleteSubtask:"删除子任务",detailAddNote:"添加备注...",detailDelete:"删除任务",detailNoProject:"无",detailNoTagsAvailable:"暂无可用标签",detailEmpty:"点击任务查看详情",detailTimeFilled:"已用当前时间补全截止时间，如需调整请在「到期日」中修改。",deleteConfirm:"删除任务「{title}」？",emptyAll:"暂无任务，添加一个开始吧",emptyFiltered:"此筛选下没有任务",groupHeader:"{date}（{weekday}）| {n} 分钟",detailPanelAria:"任务详情",titleAria:"标题",detailDescription:"描述",detailDescPlaceholder:"补充细节...",detailSubtasks:"子任务",newSubtaskAria:"新子任务",unknownProject:"未知",toggleSubtaskAria:"切换子任务完成",dblclickToEdit:"双击编辑",noTagsHint:"还没有标签，在「设置 → 标签」里创建",tagPickerAria:"标签多选",saveFailed:"保存失败：{err}",setTagsFailed:"设置标签失败：{err}",addSubtaskFailed:"添加子任务失败：{err}",updateSubtaskFailed:"更新子任务失败：{err}",deleteSubtaskFailed:"删除子任务失败：{err}"},stats:{dimToday:"今日",dimWeek:"本周",dimMonth:"本月",dimQuarter:"季度",dimHalf:"半年",dimYear:"年",focusDuration:"专注时长",sessions:"番茄数",completed:"完成任务",avg:"日均专注",activeDays:"活跃天数",longestStreak:"最长连续专注",avgWeek:"周均专注",avgMonth:"月均专注",peakMonth:"高峰月",peakPeriod:"高峰期",bestProject:"最佳项目",momRatio:"环比上期",trendTitle:"专注趋势",projectDist:"项目时间分布",noData:"该维度暂无专注数据",noProject:"暂无项目数据",unitMin:"分钟",unitCount:"个",unitDay:"天",byDay:"日",byWeek:"周",byMonth:"月",weeklyFocusTitle:"本周专注时长（分钟）",loading:"统计加载中...",loadError:"统计加载失败：{err}",trendChartAria:"专注趋势柱状图",donutChartAria:"项目时间分布环形图"},enum:{reminder:{"":"不提醒",on_time:"准时","5m":"提前 5 分钟","30m":"提前 30 分钟","1h":"提前 1 小时","1d":"提前 1 天","2d":"提前 2 天"},repeat:{"":"不重复",daily:"每天",weekday:"每个工作日",weekly:"每周",monthly:"每月",yearly:"每年",custom:"自定义"},weekday:["周日","周一","周二","周三","周四","周五","周六"]},settings:{tab:{account:"账号",timer:"番茄钟",lists:"清单管理",tags:"标签管理",theme:"主题背景",motto:"名言警句",notification:"通知文案",language:"中英切换"},language:{title:"界面语言",desc:"选择系统的显示语言，切换后所有页面文字随之变化",zh:"中文",en:"英文"},timerTitle:"番茄钟",timerParams:"番茄钟参数",durationSetting:"时长设置",behaviorSetting:"行为偏好",focusDuration:"番茄时长",shortBreakDuration:"短时休息",longBreakDuration:"长时休息",longBreakInterval:"长时休息间隔",longBreakIntervalEvery:"长休息间隔（每 N 个专注）",minute:"分钟",pomodoroUnit:"个番茄",autoStartNext:"自动开始下个番茄",autoStartNextDesc:"完成一个番茄后立即开始下一个",autoStartBreak:"自动开始休息",autoStartBreakDesc:"番茄完成后自动进入休息时段",autoEnterBreak:"专注完成后自动进入休息",disableBreak:"禁用休息",disableBreakDesc:"开启后将跳过所有休息时段",soundEnabled:"完成提示音",systemNotification:"系统通知",reset:"恢复默认",accountNotOpen:"该功能暂未开放",systemSection:"系统能力",autostart:"开机自启动",autostartHint:"OS 启动时自动运行 PomoFlow（静默启动，常驻托盘）",on:"已开启",off:"已关闭",notifTest:"系统通知测试",notifTestHint:"发送一条测试通知，验证系统通知链路是否通",sendTest:"发送测试",trayHint:"💡 关闭主窗口时 PomoFlow 会驻留在系统托盘，右键托盘图标可『显示窗口 / 退出』。",autostartFail:"自启动切换失败：{err}",notifPermDenied:"通知权限未授予，无法发送",notifSendFail:"通知失败：{err}",testNotifTitle:"PomoFlow 测试通知",testNotifBody:"当前 active 任务数：{n}",theme:{title:"主题背景",desc:"上方选主题决定主色（按钮、进度环、导航指示），下方选背景图可单独替换背景层——两者互不影响。",preset:"预设主题",presetBg:"预设背景",presetBgHint:"点选 8 张之一即可换背景；主色仍由上方所选主题决定。",presetBgName:{"preset-bg-1":"预设 1","preset-bg-2":"预设 2","preset-bg-3":"预设 3","preset-bg-4":"预设 4","preset-bg-5":"预设 5","preset-bg-6":"预设 6","preset-bg-7":"预设 7","preset-bg-8":"预设 8"},custom:"自定义背景",upload:"上传图片",customUsed:"已使用自定义背景",bgUsed:"已使用自定义背景图",presetBgUsed:"已使用预设背景",clearBg:"移除背景图",customHint:"支持 JPG/PNG，大图会自动压缩；上传图片会覆盖预设背景，主色仍由所选主题决定。",reset:"恢复默认",compressFail:"图片处理失败，请换一张",bgTooLarge:"背景图片过大，无法持久保存。本次使用有效，但刷新后需重新设置。",presetName:{default:"默认",sunny:"暖阳",ocean:"海洋",forest:"森林",dusk:"黄昏",lavender:"薰衣草",evening:"暮色",teal:"青石"}},motto:{title:"名言警句",addPlaceholder:"输入名言…",authorPlaceholder:"作者（可选）",addBtn:"添加",empty:"暂未添加自定义名言。番茄钟页面将轮播内置名言。",builtInBadge:"内置",defaultAuthor:"自定义",textRequired:"请输入名言内容",textTooLong:"名言不能超过 500 字",authorTooLong:"作者不能超过 64 字"},notification:{title:"通知文案",styleLabel:"提示风格",styleHintCustom:"自定义风格：填写下方文案 + 风格描述",styleHintPreset:"预设风格文案跟随界面语言自动切换；如需自定义文案请选择「自定义风格」。",styleDesc:"风格描述",styleDescPlaceholder:"如：霸气总裁风、文艺青年风…",focusEnd:"🍅 专注结束",breakEnd:"☕ 休息结束",reminder:"🔔 任务到期提醒",titleLabel:"标题",bodyLabel:"正文",placeholderHint:"用 {task_title} 作为任务名占位符，触发时自动替换",save:"保存",saved:"✓ 已保存",styleName:{default:"默认",cute:"卡哇伊",self_dep:"自嘲",strive:"奋斗",funny:"搞笑",custom:"自定义风格"},fallback:{focusTitle:"专注结束",focusBody:"番茄钟结束了，休息一下吧",breakTitle:"休息结束",breakBody:"休息结束，满满的能量开启新的任务专注。"}},repeatCustom:{title:"自定义重复",startDate:"开始日期",endDate:"结束日期",interval:"重复间隔（0~99）",type:"重复类型",typeDay:"日",typeWeek:"周",typeMonth:"月",typeYear:"年",weekdays:"重复在星期几（可多选）",monthDays:"重复在当月几日（可多选）",weekShort:["一","二","三","四","五","六","日"],needPickWeek:"请至少选择一个星期",needPickDay:"请至少选择一个日期",cancel:"取消",confirm:"确定"},list:{title:"清单管理",addRootPlaceholder:"一级清单名称",addRoot:"添加一级清单",addChild:"添加子清单",edit:"修改",del:"删除",level2Placeholder:"二级清单名称",level3Placeholder:"三级清单名称",empty:"暂无清单",dragHint:"按住拖动以重排或改变层级",reorderFail:"拖拽排序失败，请重试",reorderFailDepth:"层级过深，无法移动到此处",reorderFailCycle:"无法移动到当前位置（会形成循环）"},tag:{namePlaceholder:"输入新标签名称",add:"添加标签",colorLabel:"选择颜色：",colorAria:"颜色 {color}",nameLabel:"名称",empty:"暂无标签，请添加一个",dragHandle:"拖动以重排"}},form:{placeholder:"在此输入”任务描述”添加新任务，按「回车」键保存",titlePlaceholder:"任务标题...",pomodoroIcons:"预计番茄钟数",pomodoroUnit:"个番茄钟",more:"更多",collapse:"收起",submit:"提交",estimatedPomo:"预计番茄数",needTitle:"请输入任务名称",needTimeForReminder:"设置了提醒，请在到期日中选择具体时间（时分）",addFailed:"添加失败"},sidebar:{searchPlaceholder:"搜索",searchTasksPlaceholder:"搜索任务标题...",planned:"已计划",completed:"已完成",journal:"手账模式",emptyHint:"暂无清单，点击 + 添加",addRootAria:"新增根清单",addListTitle:"新增清单",listNamePlaceholder:"清单名称...",moreActions:"更多操作",deleteListConfirm:"删除此清单？子清单会一并删除"},journal:{monthTitle:"{year} 年 {month} 月",yearOption:"{year} 年",monthOption:"{month} 月",prevMonth:"上一月",nextMonth:"下一月",yearAria:"年份",monthAria:"月份",weekRange:"第 {n} 周（{ms}/{ds} ~ {me}/{de}）",weekday:["周一","周二","周三","周四","周五","周六","周日"],dailyReviewPlaceholder:"日复盘",weeklyReview:"📋 周复盘",weeklyReviewPlaceholder:"本周复盘"},monthPanel:{title:"{year}年{month}月 · 复盘",weeklyReadonly:"周复盘（只读 · 在手账模式每周区块内编辑）",noWeekly:"本月暂无周复盘",weekRange:"第 {n} 周（周一起 {date}）",empty:"（空）",monthlyReview:"📋 月度复盘",monthlyPlaceholder:"本月总结…"},help:{tab:{manual:"用户手册",faq:"常见问题",contact:"联系我们"},manual:{timer:{title:"🍅 番茄钟",items:[{text:"选择一个任务后点击「开始」，进入专注计时。专注结束后自动切换到休息模式。"},{text:"三种模式：「专注」（默认 25 分钟，可自定义）/「短休息」（默认 5 分钟）/「长休息」（默认 15 分钟，每 N 个番茄触发一次）。"},{text:"专注结束时弹出系统通知 + 模态框提示（文案可在「配置 → 通知文案」中自定义风格）。"},{text:"可开启「自动开始休息」「自动开始下个番茄」，专注结束后无需手动操作。"},{text:"计时器到点后即使切到其他页面，通知和自动衔接也会正常触发。"},{text:"右侧显示当月任务清单，支持按项目、标签、优先级、日期筛选。"},{text:"专注下方有「今日日复盘」文本框和「座右铭」卡片（可点换一条）。"}]},tasks:{title:"📋 任务清单",items:[{text:"左侧栏切换视图：今天 / 明天 / 本周 / 已计划 / 已完成 / 手账模式。"},{text:"「已计划」页支持按项目、标签、优先级、本周、本月、到期日范围筛选。"},{text:"任务支持：标题、备注、优先级（高/中/低/无）、到期日（含时分）、预计番茄数、番茄时长、提醒、重复。"},{text:"清单（项目）支持嵌套（最多 3 级）、自定义颜色。标签支持多对多、12 种预设色。"},{text:"子任务（Checklist）：每个任务可添加多个子任务，独立勾选完成。"},{text:"点击任务可展开右侧详情面板，直接编辑标题、到期日、优先级、提醒、重复、标签、子任务、备注。"}]},reminder:{title:"🔔 任务提醒",items:[{text:"设置提醒后，到达提醒时间点（到期日减去提前量）会弹出浏览器系统通知。"},{text:"提醒选项：准时 / 提前 5 分钟 / 30 分钟 / 1 小时 / 1 天 / 2 天。"},{text:"专注期间不弹提醒，专注结束后自动补弹（避免打断专注）。"},{text:"同一提醒只弹一次，不会重复打扰。"},{text:"设置提醒时必须填写到期日的时间（时分），否则会提示补全。"}]},repeat:{title:"🔁 任务重复",items:[{text:"内置规则：每天 / 工作日 / 每周 / 每月 / 每年。设置后自动预生成重复实例（上限 50 个）。"},{text:"「自定义」：可选重复间隔（0~99）、类型（日/周/月/年）。",sub:"间隔 0 = 每周期都重复；间隔 1 = 每隔 1 个周期（跳过 1 个）；间隔 N = 每隔 N 个周期。"},{text:"类型为「周」可选星期几（一~日多选）；类型为「月」可选当月几日（多选）。"},{text:"修改重复规则时，旧的未完成实例会自动删除并按新规则重新生成。"},{text:"每个重复实例会完整复制原任务的标签、子任务、备注、优先级、番茄数。"}]},journal:{title:"📔 手账模式",items:[{text:"月级视图，按自然周分组（周一~周日），每周内按 3+3+1 分行展示。"},{text:"每天方块显示当日任务（方形复选框可切完成）+ 日复盘文本框。"},{text:"每周底部有周复盘文本框。右侧面板展示当月各周复盘（只读）+ 月度复盘（可编辑）。"},{text:"支持上一月/下一月 + 年/月下拉切换。"},{text:"番茄钟页面的「今日日复盘」与手账模式当天的日复盘数据同步。"}]},stats:{title:"📊 统计报表",items:[{text:"6 种维度切换：今日 / 本周 / 本月 / 季度 / 半年 / 年。"},{text:"通用 4 卡：专注时长、番茄数、完成任务、日均专注。"},{text:"维度越长亮点越多：活跃天数、最长连续专注、周/月均、高峰期、最佳项目、环比上期。"},{text:"趋势柱状图（按日/周/月自动切换粒度）+ 圆环图（项目时间分布），全部跟随当前主题主色（accent）统一配色，告别五颜六色。"}]},settings:{title:"⚙️ 配置",items:[{text:"「番茄钟」：专注/休息时长、长时休息间隔（2~6 个番茄）、自动开始选项。"},{text:"「清单管理」：添加/修改/删除项目（嵌套 3 级）、自定义颜色。"},{text:"「标签管理」：添加/修改/删除标签、12 种预设色。"},{text:"「主题背景」：8 种预设主题（默认/暖阳/海洋/森林/黄昏/薰衣草/暮色/青石），各含专属背景渐变与配套主色；亦可自定义上传图片（自动压缩），所有页面统一半透明蒙层淡化背景、避免刺眼。"},{text:"「名言警句」：管理自定义座右铭（存数据库，番茄钟页轮播展示）。"},{text:"「通知文案」：6 种风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），分别配置专注结束/休息结束/任务提醒的标题和正文。"}]}},faq:{items:[{q:"数据保存在哪里？会丢失吗？",a:"所有数据（任务、番茄记录、复盘、名言、通知文案、主题设置）保存在本地 SQLite 数据库（pomoflow.db）和浏览器 localStorage 中，无需联网。升级版本时数据库会自动迁移，旧数据完整保留。建议定期备份 pomoflow.db 文件。"},{q:"如何修改番茄时长和长时休息间隔？",a:"进入「配置」→「番茄钟」，在「番茄时长」「短时休息」「长时休息」下拉框中选择分钟数（1~90 分钟可选）。长时休息间隔可选 2~6 个番茄（即每完成几个番茄触发一次长休息）。"},{q:"为什么专注期间不弹任务提醒？",a:"这是设计行为。专注期间系统会抑制所有任务提醒，避免打断你的专注。专注结束后会自动补弹被跳过的提醒。"},{q:"任务提醒不弹通知怎么办？",a:"首次使用时浏览器会请求通知权限，需要点击「允许」。如果之前拒绝了，可在浏览器地址栏左侧的设置图标中重新允许通知。另外，提醒需要任务设置了「到期日+具体时间（时分）」和「提醒选项」才会触发。"},{q:"自定义重复的间隔 0 和间隔 1 有什么区别？",a:"间隔 0 = 每个周期都重复（如每天都出现）。间隔 1 = 每隔 1 个周期（如第 1 周、第 3 周、第 5 周，跳过第 2、4 周）。间隔 N = 跳过 N 个周期后再重复。"},{q:"手账模式的周复盘和月度复盘在哪里编辑？",a:"周复盘在每周区块底部的文本框直接编辑（失焦自动保存）。月度复盘在右侧面板的「📋 月度复盘」文本框编辑。左侧编辑后右侧面板会自动刷新。"},{q:"自定义名言存在哪里？刷新会丢失吗？",a:"自定义名言存在数据库（pomoflow.db）中，刷新页面不会丢失。内置的 50 条名言是程序自带的。番茄钟页面的名言卡片优先轮播自定义名言（逐条不重复），轮完一轮后重新开始。"},{q:"切换页面后专注还在计时吗？自动休息还会触发吗？",a:"是的。计时器和所有自动逻辑（自动开始休息、自动开始下个番茄、专注完成通知）都在全局状态中，切到任务清单/统计/配置等页面不影响。专注到点会正常通知和衔接。"},{q:"主题背景上传的图片太大怎么办？",a:"上传图片会自动压缩（缩放到 1920px 宽、JPEG 0.8 质量），不会撑爆存储。如果图片仍然过大导致无法持久保存，会弹出提示告知你刷新后需重新设置。"},{q:"通知文案可以自定义吗？",a:"可以。进入「配置」→「通知文案」，选择风格（默认/卡哇伊/自嘲/奋斗/搞笑/自定义），文案会自动填入。你可以手动修改每个场景的标题和正文。任务提醒正文支持用 {task_title} 作为任务名占位符，触发时自动替换。"},{q:"删除清单（项目）会删除里面的任务吗？",a:"删除清单后，归属该清单的任务会自动变为「无项目」状态，任务本身不会被删除。删除子清单同理，任务会上升到父清单。"},{q:"切换主题或上传背景图后，按钮和图表颜色会跟着变吗？",a:"会。8 种预设主题各自配有一套主色（accent），切换后按钮、导航指示条、计时器圆环、统计图表、输入框焦点光晕等全部跟随变化。上传自定义背景图时，主色自动回退为默认的柔雾番茄红。"},{q:"上传的背景图太鲜艳影响阅读怎么办？",a:"所有页面都有一层统一的半透明蒙层覆盖在背景图上，会自动淡化背景，保证文字与卡片清晰可读。如果仍觉得偏亮，可在「配置 → 主题背景」中换用更柔和的预设主题。"}]},contact:{intro:"如有商务合作或其他事项，可通过以下方式联系我们：",emailLabel:"邮箱：",phoneLabel:"电话：",workHoursLabel:"工作时间：",workHours:"周一至周五 7:00 - 08:50 | 18：30 - 22：00 ; 周末 07：00 - 22：00",feedbackTitle:"问题反馈 / 功能建议",feedbackDesc:"如果您在使用过程中遇到 Bug 或有功能建议，请发送邮件到以上邮箱，我们会及时跟进处理。",subjectLabel:"邮件主题格式：",subjectFormat:"PomoFlow-功能建议",subjectHint:"（可选：功能建议 / Bug 反馈 / 使用疑问）",bodyLabel:"邮件正文建议包含：",bodyItems:["问题或建议的详细描述","您的联系方式（邮箱 / QQ / 手机号），方便我们回复","遇到 Bug 时的操作步骤（便于我们复现）"],exampleLabel:"示例：",exampleText:`主题：PomoFlow-Bug 反馈

您好，我在创建任务时点击「重复」
选择「自定义」后弹窗没有出现。

联系方式：user@example.com`}}},qu={page:{timer:"Timer - PomoFlow",tasks:"Tasks - PomoFlow",stats:"Stats - PomoFlow",settings:"Settings - PomoFlow"},nav:{timer:"Pomodoro",tasks:"Tasks",stats:"Stats",settings:"Settings",help:"Help & Feedback",mainNav:"Main navigation"},mode:{focus:"Focus",shortBreak:"Short Break",longBreak:"Long Break",focusing:"Focusing"},priority:{high:"High",medium:"Medium",low:"Low",none:"None"},common:{confirm:"OK",noData:"No tasks yet",reviewPlaceholder:"Write a review…",ariaCompleted:"Completed",ariaMarkDone:"Mark complete",ariaMarkUndone:"Mark as not done",loading:"Loading...",close:"Close",clear:"Clear",add:"Add",expand:"Expand",collapse:"Collapse"},timer:{start:"Start Focus",startBreak:"Start Break",pause:"Pause",resume:"Resume",stop:"Stop",abandon:"Abandon",skip:"Skip",starting:"Starting…",todayDone:"Today completed",pomodoroUnit:"pomodoros",pomodoros:"pomodoros",taskList:"Tasks",todayFocus:"Today's focus",minute:"min",selectTask:"Select a task",selectTaskPlaceholder:"-- Select a task --",modeTabsAria:"Timer mode",noSpecificTask:"No specific task",noTodoTask:"No active tasks",reviewTitle:"📝 Daily Review",reviewPlaceholder:"Write today’s review…",clearFilter:"Clear filters",startTooltip:"Start focus",mottoRefresh:"Next",modalTitle:"Notice",focusCompleteTitle:"Focus complete",noTask:"No tasks",expandSubtasks:"Expand subtasks",collapseSubtasks:"Collapse subtasks"},filter:{project:"Project",tag:"Tag",priority:"Priority",date:"Date",all:"All",allProject:"All projects",allTag:"All tags",allPriority:"All priorities",today:"Today",tomorrow:"Tomorrow",thisWeek:"This week",week:"This week",month:"This month",startDate:"Start date",endDate:"End date",dueDate:"Due date",start:"Start",end:"End",to:"to",export:"Export",projectAria:"Filter by project",tagAria:"Filter by tag",priorityAria:"Filter by priority"},export:{index:"No.",title:"Task",project:"Project",priority:"Priority",dueDate:"Due date",estimated:"Est. Pomodoros",tags:"Tags",subtasks:"Subtasks",status:"Status",statusActive:"Active",statusCompleted:"Completed",fileName:"Tasks"},task:{statEstimated:"Estimated time",statActive:"Active tasks",statFocused:"Time focused",statCompleted:"Tasks done",statCompletedPomo:"Pomodoros done",searchResult:"Search results",list:"List",task:"Tasks",noTask:"No tasks yet",noDate:"No date",unscheduled:"Unscheduled",minute:"min",startTooltip:"Start focus",detailPriority:"Priority",detailPomodoro:"Pomodoro",detailDueDate:"Due date",detailProject:"List",detailReminder:"Reminder",detailRepeat:"Repeat",detailNoTags:"No tags",detailEditTags:"Edit tags",detailCollapse:"Collapse",detailAddSubtask:"Add subtask...",subtaskEditPlaceholder:"Edit subtask...",editSubtask:"Edit subtask",deleteSubtask:"Delete subtask",detailAddNote:"Add note...",detailDelete:"Delete task",detailNoProject:"None",detailNoTagsAvailable:"No tags available",detailEmpty:"Click a task to view details",detailTimeFilled:"Filled the due time with the current time. Adjust in “Due date” if needed.",deleteConfirm:'Delete task "{title}"?',emptyAll:"No tasks yet — add one to get started",emptyFiltered:"No tasks match these filters",groupHeader:"{date} ({weekday}) | {n} min",detailPanelAria:"Task details",titleAria:"Title",detailDescription:"Description",detailDescPlaceholder:"Add details...",detailSubtasks:"Subtasks",newSubtaskAria:"New subtask",unknownProject:"Unknown",toggleSubtaskAria:"Toggle subtask completion",dblclickToEdit:"Double-click to edit",noTagsHint:"No tags yet — create them in Settings → Tags",tagPickerAria:"Tag multi-select",saveFailed:"Save failed: {err}",setTagsFailed:"Failed to set tags: {err}",addSubtaskFailed:"Failed to add subtask: {err}",updateSubtaskFailed:"Failed to update subtask: {err}",deleteSubtaskFailed:"Failed to delete subtask: {err}"},stats:{dimToday:"Today",dimWeek:"This week",dimMonth:"This month",dimQuarter:"Quarter",dimHalf:"Half-year",dimYear:"Year",focusDuration:"Focus time",sessions:"Pomodoros",completed:"Tasks done",avg:"Daily avg",activeDays:"Active days",longestStreak:"Longest streak",avgWeek:"Weekly avg",avgMonth:"Monthly avg",peakMonth:"Peak month",peakPeriod:"Peak period",bestProject:"Top project",momRatio:"vs last period",trendTitle:"Focus trend",projectDist:"Project distribution",noData:"No focus data for this range",noProject:"No project data",unitMin:"min",unitCount:"",unitDay:"d",byDay:"day",byWeek:"week",byMonth:"month",weeklyFocusTitle:"This week’s focus (min)",loading:"Loading stats...",loadError:"Failed to load stats: {err}",trendChartAria:"Focus trend bar chart",donutChartAria:"Project distribution donut chart"},enum:{reminder:{"":"No reminder",on_time:"On time","5m":"5 min before","30m":"30 min before","1h":"1 hour before","1d":"1 day before","2d":"2 days before"},repeat:{"":"No repeat",daily:"Daily",weekday:"Weekdays",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",custom:"Custom"},weekday:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},settings:{tab:{account:"Account",timer:"Pomodoro",lists:"Lists",tags:"Tags",theme:"Theme",motto:"Mottos",notification:"Notifications",language:"Language"},language:{title:"Interface Language",desc:"Choose the display language. All pages update instantly.",zh:"Chinese",en:"English"},timerTitle:"Pomodoro",timerParams:"Timer parameters",durationSetting:"Durations",behaviorSetting:"Behavior",focusDuration:"Focus duration",shortBreakDuration:"Short break",longBreakDuration:"Long break",longBreakInterval:"Long-break interval",longBreakIntervalEvery:"Long-break interval (every N focus sessions)",minute:"min",pomodoroUnit:"pomodoros",autoStartNext:"Auto-start next pomodoro",autoStartNextDesc:"Start the next pomodoro immediately after one ends",autoStartBreak:"Auto-start break",autoStartBreakDesc:"Enter break automatically after a pomodoro",autoEnterBreak:"Enter break automatically after focus ends",disableBreak:"Disable breaks",disableBreakDesc:"Skip all break periods when enabled",soundEnabled:"Completion sound",systemNotification:"System notifications",reset:"Reset to default",accountNotOpen:"This feature is not available yet",systemSection:"System",autostart:"Launch at startup",autostartHint:"Run PomoFlow automatically at OS startup (silent start, stays in tray)",on:"On",off:"Off",notifTest:"Notification test",notifTestHint:"Send a test notification to verify the system notification pipeline",sendTest:"Send test",trayHint:"💡 When you close the main window, PomoFlow stays in the system tray. Right-click the tray icon to show the window or quit.",autostartFail:"Failed to toggle autostart: {err}",notifPermDenied:"Notification permission not granted",notifSendFail:"Notification failed: {err}",testNotifTitle:"PomoFlow test notification",testNotifBody:"Active tasks: {n}",theme:{title:"Theme",desc:"Pick a preset above to set the accent color (buttons, progress ring, nav indicator). Pick a background below to independently override the background layer. The two are independent.",preset:"Preset themes",presetBg:"Preset backgrounds",presetBgHint:"Click any of the 8 boxes to switch the background. The accent color still comes from the chosen theme above.",presetBgName:{"preset-bg-1":"Preset 1","preset-bg-2":"Preset 2","preset-bg-3":"Preset 3","preset-bg-4":"Preset 4","preset-bg-5":"Preset 5","preset-bg-6":"Preset 6","preset-bg-7":"Preset 7","preset-bg-8":"Preset 8"},custom:"Custom background",upload:"Upload image",customUsed:"Using custom background",bgUsed:"Custom background active",presetBgUsed:"Preset background active",clearBg:"Remove background",customHint:"JPG/PNG supported; large images are auto-compressed. The uploaded image replaces the preset background; the accent color still comes from the chosen theme.",reset:"Reset to default",compressFail:"Image processing failed, please try another.",bgTooLarge:"The background image is too large to persist. It works this session, but you’ll need to reset it after refresh.",presetName:{default:"Default",sunny:"Sunny",ocean:"Ocean",forest:"Forest",dusk:"Dusk",lavender:"Lavender",evening:"Evening",teal:"Teal"}},motto:{title:"Mottos",addPlaceholder:"Enter a motto…",authorPlaceholder:"Author (optional)",addBtn:"Add",empty:"No custom mottos yet. The timer page will cycle through built-in mottos.",builtInBadge:"Built-in",defaultAuthor:"Custom",textRequired:"Please enter the motto text",textTooLong:"Motto text must be at most 500 characters",authorTooLong:"Author must be at most 64 characters"},notification:{title:"Notifications",styleLabel:"Style",styleHintCustom:"Custom style: fill in the texts below + a style description",styleHintPreset:'Preset style texts follow the interface language automatically. To customize, choose "Custom style".',styleDesc:"Style description",styleDescPlaceholder:"e.g. CEO style, artsy style…",focusEnd:"🍅 Focus ended",breakEnd:"☕ Break ended",reminder:"🔔 Task reminder",titleLabel:"Title",bodyLabel:"Body",placeholderHint:"Use {task_title} as the task name placeholder; auto-replaced on trigger",save:"Save",saved:"✓ Saved",styleName:{default:"Default",cute:"Cute",self_dep:"Self-deprecating",strive:"Strive",funny:"Funny",custom:"Custom"},fallback:{focusTitle:"Focus ended",focusBody:"A pomodoro just ended — take a short break.",breakTitle:"Break ended",breakBody:"Break over — back to focused work with fresh energy."}},repeatCustom:{title:"Custom repeat",startDate:"Start date",endDate:"End date",interval:"Interval (0–99)",type:"Repeat type",typeDay:"Day",typeWeek:"Week",typeMonth:"Month",typeYear:"Year",weekdays:"Repeat on weekdays (multi-select)",monthDays:"Repeat on days of month (multi-select)",weekShort:["M","T","W","T","F","S","S"],needPickWeek:"Please pick at least one weekday",needPickDay:"Please pick at least one date",cancel:"Cancel",confirm:"OK"},list:{title:"Lists",addRootPlaceholder:"Top-level list name",addRoot:"Add top-level list",addChild:"Add sub-list",edit:"Rename",del:"Delete",level2Placeholder:"Sub-list name",level3Placeholder:"Sub-list name",empty:"No lists yet",dragHint:"Hold and drag to reorder or change level",reorderFail:"Reorder failed, please try again",reorderFailDepth:"Target location exceeds max depth",reorderFailCycle:"Cannot move: would create a cycle"},tag:{namePlaceholder:"Enter tag name",add:"Add tag",colorLabel:"Color:",colorAria:"Color {color}",nameLabel:"Name",empty:"No tags yet, add one",dragHandle:"Drag to reorder"}},form:{placeholder:'Type a "task description" here to add a new task, press Enter to save',titlePlaceholder:"Task title...",pomodoroIcons:"Estimated pomodoros",pomodoroUnit:"pomodoros",more:"More",collapse:"Collapse",submit:"Add",estimatedPomo:"Est. pomodoros",needTitle:"Please enter a task title",needTimeForReminder:"A reminder needs a specific time (HH:MM) in the due date",addFailed:"Failed to add"},sidebar:{searchPlaceholder:"Search",searchTasksPlaceholder:"Search task titles...",planned:"Planned",completed:"Completed",journal:"Journal",emptyHint:"No lists yet, click + to add",addRootAria:"Add root list",addListTitle:"Add list",listNamePlaceholder:"List name...",moreActions:"More actions",deleteListConfirm:"Delete this list? Sub-lists will be deleted too"},journal:{monthTitle:"{month} {year}",yearOption:"{year}",monthOption:"{month}",prevMonth:"Previous month",nextMonth:"Next month",yearAria:"Year",monthAria:"Month",weekRange:"Week {n} ({ms}/{ds} – {me}/{de})",weekday:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],dailyReviewPlaceholder:"Daily review",weeklyReview:"📋 Weekly review",weeklyReviewPlaceholder:"This week's review"},monthPanel:{title:"{month}/{year} · Review",weeklyReadonly:"Weekly reviews (read-only · edited in each week block)",noWeekly:"No weekly reviews this month",weekRange:"Week {n} (from {date})",empty:"(empty)",monthlyReview:"📋 Monthly review",monthlyPlaceholder:"Monthly summary…"},help:{tab:{manual:"User Manual",faq:"FAQ",contact:"Contact Us"},manual:{timer:{title:"🍅 Pomodoro",items:[{text:"Pick a task and click “Start” to begin a focus session. When focus ends, the app switches to break mode automatically."},{text:"Three modes: “Focus” (default 25 min, customizable) / “Short break” (default 5 min) / “Long break” (default 15 min, triggered every N pomodoros)."},{text:"When focus ends, a system notification + modal appears (you can customize the wording under Settings → Notifications)."},{text:"Enable “Auto-start break” and “Auto-start next pomodoro” so focus endings need no manual action."},{text:"Even if you switch pages after the timer finishes, notifications and auto-transitions still fire."},{text:"The right panel shows the current task list, filterable by project, tag, priority, and date."},{text:"Below the timer are a “Daily review” text box and a “Motto” card (click to get another)."}]},tasks:{title:"📋 Tasks",items:[{text:"Switch views from the left sidebar: Today / Tomorrow / This week / Planned / Completed / Journal."},{text:"The “Planned” view supports filtering by project, tag, priority, this week, this month, and due-date range."},{text:"Tasks support: title, note, priority (high/medium/low/none), due date (with time), estimated pomodoros, pomodoro duration, reminder, and repeat."},{text:"Lists (projects) support nesting (up to 3 levels) and custom colors. Tags support many-to-many with 12 preset colors."},{text:"Subtasks (checklist): each task can have multiple subtasks, each toggleable independently."},{text:"Click a task to open the right detail panel and edit title, due date, priority, reminder, repeat, tags, subtasks, and notes."}]},reminder:{title:"🔔 Reminders",items:[{text:"After setting a reminder, a browser notification fires at the reminder time (due date minus the lead time)."},{text:"Reminder options: On time / 5 min / 30 min / 1 hour / 1 day / 2 days before."},{text:"No reminders fire during focus; they are shown after focus ends (to avoid breaking focus)."},{text:"Each reminder fires only once — no repeat interruptions."},{text:"A reminder requires a due date with a specific time (HH:MM); otherwise you’ll be prompted to fill it in."}]},repeat:{title:"🔁 Repeat",items:[{text:"Built-in rules: Daily / Weekdays / Weekly / Monthly / Yearly. Setting one auto-generates repeat instances (up to 50)."},{text:"“Custom”: choose an interval (0–99) and a type (day/week/month/year).",sub:"Interval 0 = repeat every cycle; interval 1 = every other cycle (skip 1); interval N = every N cycles."},{text:"Type “Week” lets you pick weekdays (Mon–Sun, multi-select); type “Month” lets you pick days of the month (multi-select)."},{text:"When you change the repeat rule, old incomplete instances are deleted and regenerated under the new rule."},{text:"Each repeat instance fully copies the original task’s tags, subtasks, notes, priority, and pomodoro count."}]},journal:{title:"📔 Journal",items:[{text:"Monthly view, grouped by natural weeks (Mon–Sun); each week is laid out in a 3+3+1 row split."},{text:"Each day cell shows that day’s tasks (a square checkbox toggles completion) plus a daily-review text box."},{text:"Each week has a weekly-review box at the bottom. The right panel shows the month’s weekly reviews (read-only) + a monthly review (editable)."},{text:"Supports previous/next month and year/month dropdowns."},{text:"The “daily review” on the timer page syncs with the same day’s daily review in Journal mode."}]},stats:{title:"📊 Stats",items:[{text:"Six range filters: Today / This week / This month / Quarter / Half-year / Year."},{text:"Four common cards: focus time, pomodoros, tasks done, daily average."},{text:"Longer ranges unlock more highlights: active days, longest streak, weekly/monthly averages, peak period, top project, and period-over-period."},{text:"Trend bar chart (auto day/week/month granularity) + donut chart (project time distribution), all colored by the current theme accent — no more rainbow."}]},settings:{title:"⚙️ Settings",items:[{text:"“Pomodoro”: focus/break durations, long-break interval (2–6 pomodoros), and auto-start options."},{text:"“Lists”: add/rename/delete projects (3-level nesting), custom colors."},{text:"“Tags”: add/rename/delete tags, 12 preset colors."},{text:"“Theme”: 8 preset themes (Default/Sunny/Ocean/Forest/Dusk/Lavender/Evening/Teal), each with its own background gradient and matching accent; you can also upload a custom image (auto-compressed). All pages use a unified translucent veil to soften the background."},{text:"“Mottos”: manage custom mottos (stored in the database, cycled on the timer page)."},{text:"“Notifications”: 6 styles (Default/Cute/Self-deprecating/Strive/Funny/Custom), each configurable for focus-end/break-end/reminder title and body."}]}},faq:{items:[{q:"Where is my data stored? Can it be lost?",a:"All data (tasks, pomodoro records, reviews, mottos, notification wording, theme settings) is stored in a local SQLite database (pomoflow.db) and browser localStorage — no internet needed. When you upgrade, the database auto-migrates and old data is fully preserved. Back up pomoflow.db regularly."},{q:"How do I change the pomodoro duration and long-break interval?",a:"Go to Settings → Pomodoro and pick minutes from the Focus / Short break / Long break dropdowns (1–90 min). The long-break interval can be 2–6 pomodoros (i.e. a long break every N pomodoros)."},{q:"Why do task reminders not fire during focus?",a:"By design. During focus, all task reminders are suppressed so your focus isn’t interrupted. Skipped reminders are shown after focus ends."},{q:"What if task reminders don’t show a notification?",a:"On first use the browser asks for notification permission — click “Allow”. If you denied it, re-enable notifications via the settings icon on the left of the address bar. Also, a reminder only fires when the task has a due date with a specific time (HH:MM) and a reminder option set."},{q:"In custom repeat, what’s the difference between interval 0 and interval 1?",a:"Interval 0 = repeat every cycle (e.g. appears every day). Interval 1 = every other cycle (e.g. weeks 1, 3, 5, skipping 2 and 4). Interval N = skip N cycles, then repeat."},{q:"Where do I edit weekly and monthly reviews in Journal mode?",a:"Weekly reviews are edited in the text box at the bottom of each week block (auto-saved on blur). Monthly reviews are edited in the “📋 Monthly review” box on the right panel. Edits on the left refresh the right panel automatically."},{q:"Where are custom mottos stored? Lost on refresh?",a:"Custom mottos are stored in the database (pomoflow.db) and survive refreshes. The 50 built-in mottos ship with the app. The motto card on the timer page prefers custom mottos (cycling without repeats) and restarts after one full loop."},{q:"Does focus keep timing after I switch pages? Do auto-breaks still fire?",a:"Yes. The timer and all auto logic (auto-start break, auto-start next pomodoro, focus-end notification) live in global state, so switching to Tasks/Stats/Settings doesn’t affect them. Focus completions still notify and transition."},{q:"What if an uploaded background image is too large?",a:"Uploads are auto-compressed (scaled to 1920px wide, JPEG quality 0.8), so storage isn’t blown up. If an image is still too large to persist, a prompt tells you to reset after refresh."},{q:"Can notification wording be customized?",a:"Yes. Go to Settings → Notifications and pick a style (Default/Cute/Self-deprecating/Strive/Funny/Custom); the wording auto-fills. You can edit each scene’s title and body. The reminder body supports {task_title} as the task name placeholder, auto-replaced on trigger."},{q:"Does deleting a list (project) delete its tasks?",a:"No. Deleting a list sets its tasks to “no project”; the tasks themselves aren’t deleted. Deleting a sub-list works the same way — tasks move up to the parent list."},{q:"Do buttons and charts change color when I switch themes or upload a background?",a:"Yes. Each of the 8 preset themes has its own accent color; switching it updates buttons, the nav indicator, the timer ring, charts, and input focus glow. When you upload a custom background, the accent falls back to the default soft tomato."},{q:"What if an uploaded background is too vivid to read?",a:"Every page has a unified translucent veil over the background that softens it, keeping text and cards readable. If it still feels bright, switch to a softer preset theme under Settings → Theme."}]},contact:{intro:"For business cooperation or other matters, reach us via:",emailLabel:"Email: ",phoneLabel:"Phone: ",workHoursLabel:"Working hours: ",workHours:"Mon–Fri 7:00 - 08:50 | 18：30 - 22：00 ;  Weekend: 07:00 - 22:00",feedbackTitle:"Bug Reports / Feature Requests",feedbackDesc:"If you hit a bug or have a feature idea, email the address above and we’ll follow up.",subjectLabel:"Email subject format:",subjectFormat:"PomoFlow-Feature Request",subjectHint:"(Optional: Feature Request / Bug Report / Question)",bodyLabel:"Email body should include:",bodyItems:["Detailed description of the issue or suggestion","Your contact (email / QQ / phone) so we can reply","Steps to reproduce if it’s a bug"],exampleLabel:"Example:",exampleText:`Subject: PomoFlow-Bug Report

Hi, when creating a task I clicked “Repeat”
and chose “Custom” but the dialog didn’t appear.

Contact: user@example.com`}}},Lu={zh:Ru,en:qu},Vs="zh",Rl="pomoflow-lang";function Ou(){if(typeof localStorage>"u")return Vs;try{const a=localStorage.getItem(Rl);if(a==="en"||a==="zh")return a}catch{}return Vs}let ro=H(Oe(Ou()));function oo(){return e(ro)}function Bu(a){if(v(ro,a,!0),typeof localStorage<"u")try{localStorage.setItem(Rl,a)}catch{}typeof document<"u"&&(document.documentElement.lang=a)}function bt(){return Lu[e(ro)]}function Ct(a,t){return Object.entries(t).reduce((n,[r,o])=>n.split(`{${r}}`).join(String(o)),a)}typeof document<"u"&&(document.documentElement.lang=e(ro));const ql="pomoflow:settings:v2",zu="pomoflow:settings:v1",Qn={focusDuration:25,shortBreakDuration:5,longBreakDuration:15,longBreakInterval:4,autoStartNextPomodoro:!1,autoStartBreak:!1,disableBreak:!1,soundEnabled:!0,desktopNotificationEnabled:!0};function Hu(a){try{const t=JSON.parse(a),n={};return typeof t.focusMinutes=="number"&&(n.focusDuration=t.focusMinutes),typeof t.shortBreakMinutes=="number"&&(n.shortBreakDuration=t.shortBreakMinutes),typeof t.longBreakMinutes=="number"&&(n.longBreakDuration=t.longBreakMinutes),typeof t.longBreakInterval=="number"&&(n.longBreakInterval=t.longBreakInterval),typeof t.autoChain=="boolean"&&(n.autoStartBreak=t.autoChain),typeof t.soundEnabled=="boolean"&&(n.soundEnabled=t.soundEnabled),typeof t.desktopNotificationEnabled=="boolean"&&(n.desktopNotificationEnabled=t.desktopNotificationEnabled),Object.keys(n).length>0?n:null}catch{return null}}function Ll(a){typeof localStorage>"u"||localStorage.setItem(ql,JSON.stringify(a))}function Uu(){if(typeof localStorage>"u")return{...Qn};const a=localStorage.getItem(ql);if(a)try{const n=JSON.parse(a);return{...Qn,...n}}catch{return{...Qn}}const t=localStorage.getItem(zu);if(t){const n=Hu(t);if(n){const r={...Qn,...n};return Ll(r),r}}return{...Qn}}let Rr=H(Oe(Uu()));function en(){return e(Rr)}function Js(a){v(Rr,{...e(Rr),...a},!0),Ll(e(Rr))}const Wu=[{key:"default",label:"默认"},{key:"cute",label:"卡哇伊"},{key:"self_dep",label:"自嘲"},{key:"strive",label:"奋斗"},{key:"funny",label:"搞笑"},{key:"custom",label:"自定义风格"}],Ol={default:{style:"default",focus_end_title:"专注结束",focus_end_body:"番茄钟结束了，休息一下吧",break_end_title:"休息结束",break_end_body:"休息结束，满满的能量开启新的任务专注。",reminder_title:"PomoFlow 任务提醒",reminder_body:"任务「{task_title}」提醒时间已到"},cute:{style:"cute",focus_end_title:"专注完成啦~",focus_end_body:"你好棒呀！休息一下吧~ ✨",break_end_title:"休息结束啦~",break_end_body:"元气满满，继续加油鸭！✧",reminder_title:"该做任务啦~",reminder_body:"「{task_title}」的时间到啦，快去看看吧~ ♪"},self_dep:{style:"self_dep",focus_end_title:"又混过去一个",focus_end_body:"居然坚持下来了，不太像你啊…",break_end_title:"该干活了",break_end_body:"虽然我知道你不想，但还是开始吧…",reminder_title:"别装了",reminder_body:"「{task_title}」该做了，别再拖了"},strive:{style:"strive",focus_end_title:"专注完成！",focus_end_body:"又一个番茄被你征服！继续！",break_end_title:"休息结束！",break_end_body:"调整完毕，向下一个目标冲刺！",reminder_title:"时间到了！",reminder_body:"「{task_title}」——现在就是行动的时刻！"},funny:{style:"funny",focus_end_title:"终于停了！",focus_end_body:"番茄钟说：你该歇了，我也该歇了 😂",break_end_title:"歇够了？",break_end_body:"再不开始老板要扣工资了…你是自己的老板？那更得自律！🤣",reminder_title:"起来搬砖！",reminder_body:"「{task_title}」叫你回来干活了 🧱"},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}},Bl={default:{style:"default",focus_end_title:"Focus Complete",focus_end_body:"Pomodoro finished. Take a break.",break_end_title:"Break Over",break_end_body:"Break ended — recharge and start your next focus.",reminder_title:"PomoFlow Task Reminder",reminder_body:'Task "{task_title}" reminder time has arrived'},cute:{style:"cute",focus_end_title:"Focus done~",focus_end_body:"Great job! Take a little break~ ✨",break_end_title:"Break over~",break_end_body:"Full of energy, keep it up!",reminder_title:"Time for a task~",reminder_body:'It’s time for "{task_title}", go check it~ ♪'},self_dep:{style:"self_dep",focus_end_title:"Another one down",focus_end_body:"You actually stuck with it — not very you…",break_end_title:"Back to work",break_end_body:"I know you don’t want to, but let’s begin…",reminder_title:"Stop pretending",reminder_body:'"{task_title}" is due — no more procrastinating'},strive:{style:"strive",focus_end_title:"Focus complete!",focus_end_body:"Another pomodoro conquered! Keep going!",break_end_title:"Break over!",break_end_body:"Recharged — sprint toward the next goal!",reminder_title:"Time’s up!",reminder_body:'"{task_title}" — act now!'},funny:{style:"funny",focus_end_title:"Finally stopped!",focus_end_body:"The pomodoro says: you should rest, so should I 😂",break_end_title:"Rested enough?",break_end_body:"If you don’t start now the boss will dock your pay… wait, you ARE the boss? Even more reason to be disciplined! 🤣",reminder_title:"Get back to work!",reminder_body:'"{task_title}" is calling you back to grind 🧱'},custom:{style:"custom",focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""}};function zl(a,t,n){const r=t==="en"?Bl:Ol;if(a==="custom"){const i=r.default;return{focus_end_title:(n==null?void 0:n.focus_end_title)||i.focus_end_title,focus_end_body:(n==null?void 0:n.focus_end_body)||i.focus_end_body,break_end_title:(n==null?void 0:n.break_end_title)||i.break_end_title,break_end_body:(n==null?void 0:n.break_end_body)||i.break_end_body,reminder_title:(n==null?void 0:n.reminder_title)||i.reminder_title,reminder_body:(n==null?void 0:n.reminder_body)||i.reminder_body}}const c=r[a||"default"]??r.default;return{focus_end_title:c.focus_end_title,focus_end_body:c.focus_end_body,break_end_title:c.break_end_title,break_end_body:c.break_end_body,reminder_title:c.reminder_title,reminder_body:c.reminder_body}}async function Je(a,t={},n){return window.__TAURI_INTERNALS__.invoke(a,t,n)}//! Tauri invoke 的类型化封装 —— 与 `apps/desktop/src/commands.rs` 一一对应。
//!
//! 设计要点:
//! - 单一 `invoke` 入口,统一错误捕获(返回 `string`,与后端 `Result<_, String>` 对齐)。
//! - 不在每处 try/catch:调用方拿到 string 错误直接 `alert` / 显示 toast 即可。
//! - 类型是 `crates/core/src/model/*` 的**精确镜像**(serde 输出 snake_case);
//!   带 `#[serde(default)]` 的字段在此标 `?` —— 响应里后端总会给,构造请求时可省。
//! - 此文件不依赖 `lib/store` 等其他模块;纯 invoke 包装,组件层自由组合。
const yn=a=>Je("list_tasks",{query:a}),Xo=(a,t)=>Je("upsert_task",{task:a,tagIds:t}),Yu=a=>Je("delete_task",{id:a}),Hl=a=>Je("complete_task",{id:a}),Ul=a=>Je("reopen_task",{id:a}),ys=()=>Je("list_projects"),Yr=a=>Je("upsert_project",{project:a}),Wl=a=>Je("delete_project",{id:a}),Gu=a=>Je("reorder_projects",{items:a}),ks=()=>Je("list_tags"),Qs=a=>Je("upsert_tag",{tag:a}),Ku=a=>Je("delete_tag",{id:a}),Vu=a=>Je("reorder_tags",{items:a}),Ju=a=>Je("list_tags_for_task",{taskId:a}),Qu=(a,t)=>Je("set_tags_for_task",{taskId:a,tagIds:t}),Xu=(a,t,n)=>Je("start_pomodoro",{taskId:a,projectId:t,duration:n}),Yl=(a,t)=>Je("stop_pomodoro",{sessionId:a,isCompleted:t}),Xs=a=>Je("get_daily_review",{date:a}),Gl=a=>Je("upsert_daily_review",{review:a}),Zu=(a,t)=>Je("list_daily_reviews",{startDate:a,endDate:t}),Kl=a=>Je("delete_daily_review",{date:a}),$u=a=>Je("upsert_weekly_review",{review:a}),Vl=(a,t)=>Je("list_weekly_reviews",{year:a,month:t}),ev=a=>Je("delete_weekly_review",{weekStart:a}),tv=a=>Je("get_monthly_review",{yearMonth:a}),av=a=>Je("upsert_monthly_review",{review:a}),nv=a=>Je("delete_monthly_review",{yearMonth:a}),Jl=a=>Je("list_subtasks_for_task",{taskId:a}),Zo=a=>Je("upsert_subtask",{subtask:a}),rv=a=>Je("delete_subtask",{id:a}),Ql=()=>Je("list_mottos"),ov=a=>Je("upsert_motto",{motto:a}),sv=a=>Je("delete_motto",{id:a}),Xl=()=>Je("get_notification_template"),iv=a=>Je("upsert_notification_template",{template:a}),lv=(a,t)=>Je("today_completed_minutes",{startMs:a,endMs:t}),Zs=(a,t,n,r)=>Je("stats_range",{startDate:a,endDate:t,group:n,tzOffsetMin:r}),cv=(a,t,n,r)=>Je("stats_overview",{today:a,weekStart:t,monthStart:n,tzOffsetMin:r}),dv=(a,t,n,r)=>Je("export_tasks_xlsx",{path:a,sheetName:t,headers:n,rows:r});var $s;(function(a){a.Year="year",a.Month="month",a.TwoWeeks="twoWeeks",a.Week="week",a.Day="day",a.Hour="hour",a.Minute="minute",a.Second="second"})($s||($s={}));var ei;(function(a){a[a.None=0]="None",a[a.Min=1]="Min",a[a.Low=2]="Low",a[a.Default=3]="Default",a[a.High=4]="High"})(ei||(ei={}));var ti;(function(a){a[a.Secret=-1]="Secret",a[a.Private=0]="Private",a[a.Public=1]="Public"})(ti||(ti={}));async function ws(){return window.Notification.permission!=="default"?await Promise.resolve(window.Notification.permission==="granted"):await Je("plugin:notification|is_permission_granted")}async function xs(){return await window.Notification.requestPermission()}function Ss(a){typeof a=="string"?new window.Notification(a):new window.Notification(a.title,a)}const Zl="pomoflow-focus-count";let Ee=Oe({mode:"focus",secondsLeft:en().focusDuration*60,running:!1,sessionId:null,activeTask:null,focusCompletedCount:uv(),pendingCompletionMessage:null,todayCount:0,todayMinutes:0}),so=0,io=0,$o=new Date().toDateString(),dr=!1,ia=null;function uv(){try{return parseInt(localStorage.getItem(Zl)||"0",10)||0}catch{return 0}}function Ts(){return Ee}function vv(){return ia}async function $l(){try{ia=await Xl()}catch{}}function fv(){var a;return((a=Ee.activeTask)==null?void 0:a.pomodoro_duration)??en().focusDuration}function Tr(a){const t=en();return a==="focus"?fv()*60:a==="short_break"?t.shortBreakDuration*60:t.longBreakDuration*60}function Ds(){!Ee.running&&Ee.sessionId===null&&(Ee.secondsLeft=Tr(Ee.mode))}async function ur(a,t,n){const r=n??Math.floor(Tr(Ee.mode)/60),o=await Xu(a,t,r);Ee.sessionId=o.id,n!==void 0&&(Ee.secondsLeft=n*60),so=Date.now(),io=Ee.secondsLeft,Ee.running=!0,dr=!1}async function ec(a){Ee.sessionId!==null&&await tc(!1),Ee.activeTask=a,Ee.mode="focus",Ds(),await ur(a.id,a.project_id??null,a.pomodoro_duration??void 0)}function yo(){Ee.running&&(Ee.running=!1)}function ko(){Ee.running||Ee.sessionId===null||(so=Date.now(),io=Ee.secondsLeft,Ee.running=!0)}async function tc(a){const t=Ee.sessionId;if(Ee.running=!1,Ee.sessionId=null,t!==null)try{await Yl(t,a)}catch(n){console.warn("stop pomodoro failed",n)}Ee.secondsLeft=Tr(Ee.mode)}function Gr(a){Ee.mode=a,Ee.running=!1,Ee.sessionId=null,Ee.secondsLeft=Tr(a)}function hv(){if(!Ee.running)return;const a=Math.floor((Date.now()-so)/1e3),t=Math.max(0,io-a);if(t<=0){Ee.secondsLeft=0,Ee.running=!1,Ee.sessionId!==null&&!dr&&(dr=!0,ac());return}Ee.secondsLeft=t}function _v(){if(!Ee.running)return;const a=Math.floor((Date.now()-so)/1e3),t=Math.max(0,io-a);t<=0?(Ee.secondsLeft=0,Ee.running=!1,Ee.sessionId!==null&&!dr&&(dr=!0,ac())):Ee.secondsLeft=t}function pv(){Ee.pendingCompletionMessage=null}function ai(a){Ee.activeTask=a,Ds()}function gv(){Ds()}function mv(a){const t=new Date().toDateString();t!==$o?($o=t,Ee.todayCount=1,Ee.todayMinutes=a):(Ee.todayCount+=1,Ee.todayMinutes+=a)}function bv(a,t){Ee.todayCount=a,Ee.todayMinutes=t,$o=new Date().toDateString()}async function wo(){try{const a=new Date,t=a.getDay(),n=new Date(a);n.setDate(a.getDate()-(t===0?6:t-1)),n.setHours(0,0,0,0);const r=new Date(a.getFullYear(),a.getMonth(),1),o=i=>`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`,c=await cv(o(a),o(n),o(r),-a.getTimezoneOffset());bv(c.today_sessions,c.today_minutes)}catch(a){console.warn("sync today stats",a)}}let ni=!1;function yv(){if(ni||typeof window>"u")return;ni=!0,wo(),document.addEventListener("visibilitychange",()=>{document.hidden||wo()});let a=new Date().toDateString();window.setInterval(()=>{const t=new Date().toDateString();t!==a&&(a=t,wo())},6e4)}function kv(a){const t=new Date;t.setHours(0,0,0,0);const n=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0,23,59,59,999),o={high:0,medium:1,low:2,none:3},c=a.filter(i=>{if(i.status!=="active"||!i.due_date)return!1;const l=new Date(i.due_date);if(isNaN(l.getTime())||l<n||l>r)return!1;const u=new Date(l);return u.setHours(0,0,0,0),u.getTime()<=t.getTime()});return c.sort((i,l)=>{const u=o[i.priority??"none"]??3,f=o[l.priority??"none"]??3;return u!==f?u-f:new Date(i.created_at??0).getTime()-new Date(l.created_at??0).getTime()}),c[0]??null}async function wv(a,t){if(en().desktopNotificationEnabled)try{let n=await ws();if(n||(n=await xs()==="granted"),!n)return;Ss({title:a,body:t})}catch(n){console.warn("notification failed",n)}}async function ac(){const a=Ee.mode,t=Math.floor(Tr(a)/60),n=Ee.activeTask,r=oo(),o=ia?{focus_end_title:ia.focus_end_title??void 0,focus_end_body:ia.focus_end_body??void 0,break_end_title:ia.break_end_title??void 0,break_end_body:ia.break_end_body??void 0,reminder_title:ia.reminder_title??void 0,reminder_body:ia.reminder_body??void 0}:null,c=zl(ia==null?void 0:ia.style,r,o),i=a==="focus"?c.focus_end_title:c.break_end_title,l=a==="focus"?c.focus_end_body:c.break_end_body;await wv(i,l),Ee.pendingCompletionMessage=l;const u=Ee.sessionId;if(Ee.running=!1,Ee.sessionId=null,u!==null)try{await Yl(u,!0)}catch(_){console.warn("stop pomodoro failed",_)}const f=en();if(a==="focus"){Ee.focusCompletedCount+=1;try{localStorage.setItem(Zl,String(Ee.focusCompletedCount))}catch{}mv(t);let _=[];try{_=await yn({status:null,limit:null})}catch(k){console.warn("refresh tasks failed",k)}const b=n?_.find(k=>k.id===n.id)??null:null;if(!f.disableBreak&&f.autoStartBreak){const w=Ee.focusCompletedCount%f.longBreakInterval===0,x=w?"long_break":"short_break",j=w?f.longBreakDuration:f.shortBreakDuration;Gr(x),await ur(null,(b==null?void 0:b.project_id)??(n==null?void 0:n.project_id)??null,j);return}await ri(_,b,f.autoStartNextPomodoro);return}let h=[];try{h=await yn({status:null,limit:null})}catch(_){console.warn("refresh tasks failed",_)}const g=n?h.find(_=>_.id===n.id)??null:null;await ri(h,g,f.autoStartNextPomodoro)}async function ri(a,t,n){if(t!==null&&t.status==="active"&&(t.completed_pomodoros??0)<(t.estimated_pomodoros??0)&&t){Gr("focus"),Ee.activeTask=t,n&&await ur(t.id,t.project_id??null,t.pomodoro_duration??void 0);return}t&&t.status==="completed"&&(Ee.activeTask=null);const o=kv(a);Ee.activeTask=o,Gr("focus"),o&&n&&await ur(o.id,o.project_id??null,o.pomodoro_duration??void 0)}const nc="pomoflow-fired-reminders",xv=3e4,Sv=10080*60*1e3,Tv={on_time:0,minutes5:5*6e4,minutes30:30*6e4,hour1:60*6e4,day1:1440*6e4,days2:2880*6e4};function Dv(){try{const a=localStorage.getItem(nc);return a?JSON.parse(a):{}}catch{return{}}}function Pv(a){try{localStorage.setItem(nc,JSON.stringify(a))}catch{}}function rc(){const a=Ts();return a.running&&a.mode==="focus"}async function Mv(a){const t=vv(),n=oo(),r=t?{reminder_title:t.reminder_title??void 0,reminder_body:t.reminder_body??void 0}:null,o=zl(t==null?void 0:t.style,n,r),c=o.reminder_body.replace(/\{task_title\}/g,a.title);try{let i=await ws();if(i||(i=await xs()==="granted"),!i)return;Ss({title:o.reminder_title,body:c})}catch(i){console.warn("reminder notification failed",i)}}async function xo(){const a=Date.now(),t=Dv();let n=!1,r=[];try{r=await yn({status:"active",limit:null})}catch{return}const o=rc();for(const i of r){if(i.status!=="active"||!i.reminder||i.reminder==="none"||!i.due_date)continue;const l=Tv[i.reminder];if(l===void 0)continue;const u=new Date(i.due_date).getTime();if(Number.isNaN(u))continue;const f=u-l;if(f>a)continue;const h=`${i.id}:${f}`;t[h]||o||(t[h]=f,n=!0,await Mv(i))}const c=a-Sv;for(const i of Object.keys(t))t[i]<c&&(delete t[i],n=!0);n&&Pv(t)}let oi=!1,si=!1;function Ev(){oi||typeof window>"u"||(oi=!0,xo(),window.setInterval(()=>void xo(),xv),window.setInterval(()=>{const a=rc();si&&!a&&xo(),si=a},1e3))}const Cv="/assets/preset-1-CBSgnW-Q.jpg",jv="/assets/preset-2-DV_n3pDN.jpg",Nv="/assets/preset-3-q3qAbjR3.jpg",Fv="/assets/preset-4-B_bSN4WY.jpg",Av="/assets/preset-5-C1j6rp_Z.jpg",Iv="/assets/preset-6-_4eNaNuV.jpg",Rv="/assets/preset-7-D1OhqFGY.jpg",qv="/assets/preset-8-oFCsPykG.jpg",Kr=[{id:"preset-bg-1",url:`url(${Cv})`},{id:"preset-bg-2",url:`url(${jv})`},{id:"preset-bg-3",url:`url(${Nv})`},{id:"preset-bg-4",url:`url(${Fv})`},{id:"preset-bg-5",url:`url(${Av})`},{id:"preset-bg-6",url:`url(${Iv})`},{id:"preset-bg-7",url:`url(${Rv})`},{id:"preset-bg-8",url:`url(${qv})`}],Lv=Kr.map(a=>a.id);function Ov(a){return Lv.includes(a)}function Bv(a){var t;return((t=Kr.find(n=>n.id===a))==null?void 0:t.url)??""}const oc=[{id:"default",name:"默认",preview:"linear-gradient(160deg, #faf8f5, #ede4d8)"},{id:"sunny",name:"暖阳",preview:"linear-gradient(160deg, #fffbf5, #fde4c2)"},{id:"ocean",name:"海洋",preview:"linear-gradient(160deg, #f2f7fb, #c8dcf0)"},{id:"forest",name:"森林",preview:"linear-gradient(160deg, #f3f7f1, #cde0c6)"},{id:"dusk",name:"黄昏",preview:"linear-gradient(160deg, #fdf7f1, #edd0bc)"},{id:"lavender",name:"薰衣草",preview:"linear-gradient(160deg, #f8f5fb, #dcc8ed)"},{id:"evening",name:"暮色",preview:"linear-gradient(160deg, #f6f3f0, #d8cbbe)"},{id:"teal",name:"青石",preview:"linear-gradient(160deg, #f3f7f6, #c4dad5)"}],zv=oc.map(a=>a.id);function Hv(a){return zv.includes(a)}const sc="pomoflow-theme",Ps="preset-bg-1";function So(){return{theme:"default",background:{kind:"preset",id:Ps}}}function Uv(a){return a?a.kind==="preset"?`preset:${a.id}`:a.url:""}function Wv(){if(typeof localStorage>"u")return So();try{const a=localStorage.getItem(sc);if(!a||!a.startsWith("{"))return So();const t=JSON.parse(a),n=typeof t.theme=="string"&&Hv(t.theme)?t.theme:"default",r=typeof t.background=="string"?t.background:"";if(r.startsWith("preset:")){const o=r.slice(7);if(Ov(o))return{theme:n,background:{kind:"preset",id:o}}}return r.startsWith("url(")?{theme:n,background:{kind:"custom",url:r}}:{theme:n,background:{kind:"preset",id:Ps}}}catch{return So()}}function Dr(a){if(!(typeof localStorage>"u"))try{localStorage.setItem(sc,JSON.stringify({theme:a.theme,background:Uv(a.background)}))}catch{}}function Yv(a){return a?a.kind==="preset"?Bv(a.id):a.url:null}let za=H("default"),Ha=H(null);function Yn(){if(typeof document>"u")return;const a=document.documentElement;a.setAttribute("data-theme",e(za));const t=Yv(e(Ha));t?a.style.setProperty("--bg-page",t):a.style.removeProperty("--bg-page")}function Gv(){const a=Wv();v(za,a.theme,!0),v(Ha,a.background,!0),Yn()}function Kv(){return e(za)}function Vv(){return e(Ha)}function Jv(a){v(za,a,!0),Dr({theme:a,background:e(Ha)}),Yn()}function Qv(a){const t={kind:"preset",id:a};v(Ha,t,!0),Dr({theme:e(za),background:t}),Yn()}function Xv(a){if(!a.startsWith("url("))return;const t={kind:"custom",url:a};v(Ha,t,!0),Dr({theme:e(za),background:t}),Yn()}function To(){v(Ha,null),Dr({theme:e(za),background:null}),Yn()}function Do(){v(za,"default"),v(Ha,{kind:"preset",id:Ps},!0),Dr({theme:e(za),background:e(Ha)}),Yn()}function Zv(a){return new Promise(t=>{const n=new FileReader;n.onerror=()=>t(null),n.onload=()=>{const r=new Image;r.onerror=()=>t(null),r.onload=()=>{try{const c=Math.min(1,1920/Math.max(r.width,r.height)),i=Math.max(1,Math.round(r.width*c)),l=Math.max(1,Math.round(r.height*c)),u=document.createElement("canvas");u.width=i,u.height=l;const f=u.getContext("2d");if(!f)return t(null);f.drawImage(r,0,0,i,l),t(`url(${u.toDataURL("image/jpeg",.8)})`)}catch{t(null)}},r.src=String(n.result)},n.readAsDataURL(a)})}var $v=kn('<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20" r="10"></circle><ellipse cx="13" cy="18" rx="2.6" ry="4.5" fill="#ffffff" opacity="0.28"></ellipse><path d="M16 10 C 14 8, 12 6, 14 5 C 16 4, 18 5, 16 7 C 18 5, 20 6, 19 8 C 18 10, 16 10, 16 10 Z" fill="#7fa086"></path><path d="M16 8 L 16 4" stroke="#5f6f5a" stroke-width="1.3" stroke-linecap="round"></path></svg>');function ic(a,t){let n=va(t,"size",3,14),r=va(t,"filled",3,!0);var o=$v(),c=s(o);M(()=>{z(o,"width",n()),z(o,"height",n()),z(c,"fill",r()?"currentColor":"#e5e7eb")}),m(a,o)}var ef=E('<textarea class="review-textarea svelte-1na66lg"></textarea>');function Vr(a,t){pt(t,!0);const n=R(bt);let r=va(t,"rows",3,2),o=H(Oe(Kt(()=>t.value??"")));Pt(()=>{const l=t.value??"";Kt(()=>{l!==e(o)&&v(o,l,!0)})});function c(){const l=e(o).trim();l===""?t.value&&t.onDelete&&t.onDelete():l!==(t.value??"")&&t.onSave(l)}var i=ef();M(()=>{z(i,"placeholder",t.placeholder??e(n).common.reviewPlaceholder),z(i,"aria-label",t.ariaLabel??t.placeholder??e(n).common.reviewPlaceholder),z(i,"rows",r())}),kt("blur",i,c),wt(i,()=>e(o),l=>v(o,l)),m(a,i),gt()}const ii=[{text:"时间就像海绵里的水，只要愿挤，总还是有的。",author:"鲁迅"},{text:"滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。",author:"拉蒂默"},{text:"生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。",author:"曼德拉"},{text:"成功 = 艰苦劳动 + 正确方法 + 少说空话。",author:"爱因斯坦"},{text:"谁不会休息，谁就不会工作。",author:"列宁"},{text:"伟大的作品不是靠力量，而是靠坚持来完成的。",author:"约翰逊"},{text:"只要功夫深，铁杵磨成针。",author:"谚语"},{text:"千里之行，始于足下。",author:"老子"},{text:"天才是百分之一的灵感加上百分之九十九的汗水。",author:"爱迪生"},{text:"学如逆水行舟，不进则退。",author:"增广贤文"},{text:"业精于勤，荒于嬉；行成于思，毁于随。",author:"韩愈"},{text:"不积跬步，无以至千里；不积小流，无以成江海。",author:"荀子"},{text:"路漫漫其修远兮，吾将上下而求索。",author:"屈原"},{text:"盛年不重来，一日难再晨。及时当勉励，岁月不待人。",author:"陶渊明"},{text:"少壮不努力，老大徒伤悲。",author:"汉乐府"},{text:"黑发不知勤学早，白首方悔读书迟。",author:"颜真卿"},{text:"明日复明日，明日何其多。我生待明日，万事成蹉跎。",author:"文嘉"},{text:"合理安排时间，就等于节约时间。",author:"培根"},{text:"把活着的每一天看作生命的最后一天。",author:"海伦·凯勒"},{text:"人生在勤，不索何获。",author:"张衡"},{text:"骐骥一跃，不能十步；驽马十驾，功在不舍。",author:"荀子"},{text:"宝剑锋从磨砺出，梅花香自苦寒来。",author:"警世贤文"},{text:"千淘万漉虽辛苦，吹尽狂沙始到金。",author:"刘禹锡"},{text:"长风破浪会有时，直挂云帆济沧海。",author:"李白"},{text:"欲穷千里目，更上一层楼。",author:"王之涣"},{text:"会当凌绝顶，一览众山小。",author:"杜甫"},{text:"山重水复疑无路，柳暗花明又一村。",author:"陆游"},{text:"不畏浮云遮望眼，自缘身在最高层。",author:"王安石"},{text:"千磨万击还坚劲，任尔东西南北风。",author:"郑燮"},{text:"不经一番寒彻骨，怎得梅花扑鼻香。",author:"黄櫱禅师"},{text:"古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",author:"苏轼"},{text:"锲而舍之，朽木不折；锲而不舍，金石可镂。",author:"荀子"},{text:"书山有路勤为径，学海无涯苦作舟。",author:"韩愈"},{text:"博观而约取，厚积而薄发。",author:"苏轼"},{text:"纸上得来终觉浅，绝知此事要躬行。",author:"陆游"},{text:"问渠那得清如许，为有源头活水来。",author:"朱熹"},{text:"工欲善其事，必先利其器。",author:"孔子"},{text:"凡事预则立，不预则废。",author:"礼记"},{text:"勿以恶小而为之，勿以善小而不为。",author:"刘备"},{text:"静以修身，俭以养德。",author:"诸葛亮"},{text:"海纳百川，有容乃大；壁立千仞，无欲则刚。",author:"林则徐"},{text:"己所不欲，勿施于人。",author:"孔子"},{text:"三人行，必有我师焉。",author:"孔子"},{text:"知者不惑，仁者不忧，勇者不惧。",author:"孔子"},{text:"博学之，审问之，慎思之，明辨之，笃行之。",author:"礼记"},{text:"读万卷书，行万里路。",author:"刘彝"},{text:"为有牺牲多壮志，敢教日月换新天。",author:"毛泽东"},{text:"世上无难事，只要肯登攀。",author:"毛泽东"},{text:"最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。",author:"佚名"},{text:"行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",author:"戴尔·卡耐基"}];function li(){return ii[Math.floor(Math.random()*ii.length)]}var tf=E('<div class="motto-card svelte-4rj985"><div class="row svelte-4rj985"><span class="quote-icon svelte-4rj985"><!></span> <div class="text-wrap svelte-4rj985"><div class="text svelte-4rj985"> </div> <div class="author svelte-4rj985"> </div></div> <button type="button" class="refresh svelte-4rj985"><!></button></div></div>');function af(a,t){pt(t,!0);const n=R(bt);let r=H(Oe([])),o=H(Oe(new Set)),c=H(null);async function i(){try{v(r,await Ql(),!0)}catch{v(r,[],!0)}}$a(()=>{i()}),Pt(()=>{var g;if(!e(c))if(e(r).length>0){const _=e(r)[0];v(c,{text:_.text,author:(g=_.author)!=null&&g.trim()?_.author:e(n).settings.motto.defaultAuthor},!0);const b=new Set(e(o));b.add(_.id),v(o,b,!0)}else v(c,li(),!0)});function l(){var g;if(e(r).length>0){let _=e(r).filter(w=>!e(o).has(w.id));_.length===0&&(v(o,new Set,!0),_=e(r));const b=_[0];v(c,{text:b.text,author:(g=b.author)!=null&&g.trim()?b.author:e(n).settings.motto.defaultAuthor},!0);const k=new Set(e(o));k.add(b.id),v(o,k,!0)}else v(c,li(),!0)}var u=ze(),f=Ne(u);{var h=g=>{var _=tf(),b=s(_),k=s(b),w=s(k);Nl(w,{size:20});var x=d(k,2),j=s(x),S=s(j),T=d(j,2),q=s(T),A=d(x,2),O=s(A);xu(O,{size:14}),M(()=>{p(S,e(c).text),p(q,`—— ${e(c).author??""}`),z(A,"aria-label",e(n).timer.mottoRefresh),z(A,"title",e(n).timer.mottoRefresh)}),J("click",A,l),m(g,_)};le(f,g=>{e(c)&&g(h)})}m(a,u),gt()}St(["click"]);var ci=E("<option> </option>"),di=E('<button type="button"> </button>'),nf=E('<button type="button" class="clear svelte-13vcwbh"> </button>'),rf=E('<div class="empty svelte-13vcwbh"> </div>'),of=E('<button type="button" class="expander svelte-13vcwbh"><!></button>'),sf=E('<span class="expander-placeholder svelte-13vcwbh"></span>'),Po=E('<span class="meta-item svelte-13vcwbh"> </span>'),lf=E('<button type="button" class="start svelte-13vcwbh"><!></button>'),cf=E('<label><input type="checkbox" class="svelte-13vcwbh"/> <span class="sub-title svelte-13vcwbh"> </span></label>'),df=E('<div class="subs svelte-13vcwbh"></div>'),uf=E('<div class="task-card svelte-13vcwbh"><div class="task-row svelte-13vcwbh"><!> <span class="pri-dot svelte-13vcwbh"></span> <div class="task-main svelte-13vcwbh"><div> </div> <div class="meta svelte-13vcwbh"><span class="meta-item svelte-13vcwbh"> </span> <!> <!> <!></div></div> <!></div> <!></div>'),vf=E('<aside class="sidebar svelte-13vcwbh"><div class="top svelte-13vcwbh"><div class="today-focus svelte-13vcwbh"><h3 class="focus-label svelte-13vcwbh"> </h3> <div class="focus-value svelte-13vcwbh"><span class="num svelte-13vcwbh"> </span> <span class="unit svelte-13vcwbh"> </span></div></div> <div class="filters svelte-13vcwbh"><h3 class="filter-title svelte-13vcwbh"> </h3> <div class="row-2col svelte-13vcwbh"><div><label class="lbl svelte-13vcwbh" for="timer-filter-project"> </label> <select id="timer-filter-project" class="svelte-13vcwbh"><option> </option><!></select></div> <div><label class="lbl svelte-13vcwbh" for="timer-filter-tag"> </label> <select id="timer-filter-tag" class="svelte-13vcwbh"><option> </option><!></select></div></div> <div class="filter-grid svelte-13vcwbh"><span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div> <span class="lbl svelte-13vcwbh"> </span> <div class="btn-group svelte-13vcwbh"></div></div> <!></div></div> <div class="list svelte-13vcwbh"><!> <!></div></aside>');function ff(a,t){pt(t,!0);const n=R(bt),r={high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-text-muted, #9ca3af)"};let o=H(Oe(new Set));function c(Q){const y=new Set(e(o));y.has(Q)?y.delete(Q):y.add(Q),v(o,y,!0)}function i(){t.onFilterChange({project:null,tag:null,priority:null,date:null})}const l=R(()=>t.filter.tag!==null||t.filter.project!==null||t.filter.priority!==null||t.filter.date!==null),u=["high","medium","low"],f=R(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low})),h=["today","tomorrow","this_week"],g=R(()=>({today:e(n).filter.today,tomorrow:e(n).filter.tomorrow,this_week:e(n).filter.thisWeek}));function _(Q){var y;return Q?((y=t.projects.find(D=>D.id===Q))==null?void 0:y.name)??"":""}var b=vf(),k=s(b),w=s(k),x=s(w),j=s(x),S=d(x,2),T=s(S),q=s(T),A=d(T,2),O=s(A),U=d(w,2),$=s(U),ee=s($),he=d($,2),ne=s(he),te=s(ne),ue=s(te),P=d(te,2),G=s(P),de=s(G);G.value=G.__value="";var be=d(G);Me(be,17,()=>t.projects,Q=>Q.id,(Q,y)=>{var D=ci(),K=s(D),V={};M(()=>{p(K,e(y).name),V!==(V=e(y).id)&&(D.value=(D.__value=e(y).id)??"")}),m(Q,D)});var ge;qt(P);var Te=d(ne,2),Fe=s(Te),et=s(Fe),I=d(Fe,2),C=s(I),N=s(C);C.value=C.__value="";var B=d(C);Me(B,17,()=>t.tags,Q=>Q.id,(Q,y)=>{var D=ci(),K=s(D),V={};M(()=>{p(K,e(y).name),V!==(V=e(y).id)&&(D.value=(D.__value=e(y).id)??"")}),m(Q,D)});var ce;qt(I);var _e=d(he,2),re=s(_e),ve=s(re),L=d(re,2);Me(L,20,()=>u,Q=>Q,(Q,y)=>{var D=di();let K;var V=s(D);M(()=>{K=Ke(D,1,"opt svelte-13vcwbh",null,K,{active:t.filter.priority===y}),p(V,e(f)[y])}),J("click",D,()=>t.onFilterChange({priority:t.filter.priority===y?null:y})),m(Q,D)});var oe=d(L,2),ie=s(oe),me=d(oe,2);Me(me,20,()=>h,Q=>Q,(Q,y)=>{var D=di();let K;var V=s(D);M(()=>{K=Ke(D,1,"opt svelte-13vcwbh",null,K,{active:t.filter.date===y}),p(V,e(g)[y])}),J("click",D,()=>t.onFilterChange({date:t.filter.date===y?null:y})),m(Q,D)});var De=d(_e,2);{var je=Q=>{var y=nf(),D=s(y);M(()=>p(D,e(n).timer.clearFilter)),J("click",y,i),m(Q,y)};le(De,Q=>{e(l)&&Q(je)})}var Re=d(k,2),Y=s(Re);{var fe=Q=>{var y=rf(),D=s(y);M(()=>p(D,e(n).timer.noTask)),m(Q,y)};le(Y,Q=>{t.tasks.length===0&&Q(fe)})}var ke=d(Y,2);Me(ke,17,()=>t.tasks,Q=>Q.id,(Q,y)=>{const D=R(()=>e(y).status==="completed"),K=R(()=>{var Le;return(((Le=e(y).subtasks)==null?void 0:Le.length)??0)>0}),V=R(()=>e(o).has(e(y).id)),W=R(()=>e(K)?(e(y).subtasks??[]).filter(Le=>Le.is_completed).length:0),Z=R(()=>_(e(y).project_id));var X=uf(),Pe=s(X),Se=s(Pe);{var Ue=Le=>{var Xe=of(),qe=s(Xe);{var lt=we=>{lr(we,{size:14})},se=we=>{qn(we,{size:14})};le(qe,we=>{e(V)?we(lt):we(se,-1)})}M(()=>z(Xe,"aria-label",e(V)?e(n).timer.collapseSubtasks:e(n).timer.expandSubtasks)),J("click",Xe,()=>c(e(y).id)),m(Le,Xe)},ht=Le=>{var Xe=sf();m(Le,Xe)};le(Se,Le=>{e(K)?Le(Ue):Le(ht,-1)})}var dt=d(Se,2),ut=d(dt,2),We=s(ut);let Be;var ye=s(We),pe=d(We,2),Ye=s(pe),Qe=s(Ye),mt=d(Ye,2);{var Ge=Le=>{var Xe=Po(),qe=s(Xe);M(()=>{var lt;return p(qe,`· ${e(W)??""}/${((lt=e(y).subtasks)==null?void 0:lt.length)??0??""}`)}),m(Le,Xe)};le(mt,Le=>{e(K)&&Le(Ge)})}var Tt=d(mt,2);{var Ft=Le=>{var Xe=Po(),qe=s(Xe);M(()=>p(qe,e(Z))),m(Le,Xe)};le(Tt,Le=>{e(Z)&&Le(Ft)})}var Bt=d(Tt,2);{var zt=Le=>{var Xe=Po(),qe=s(Xe);M(lt=>p(qe,lt),[()=>e(y).due_date.slice(0,10)]),m(Le,Xe)};le(Bt,Le=>{e(y).due_date&&Le(zt)})}var At=d(ut,2);{var He=Le=>{var Xe=lf(),qe=s(Xe);jl(qe,{size:10,color:"#fff",fill:"#fff"}),M(()=>{z(Xe,"aria-label",e(n).timer.startTooltip),z(Xe,"title",e(n).timer.startTooltip)}),J("click",Xe,()=>t.onStartTask(e(y))),m(Le,Xe)};le(At,Le=>{e(D)||Le(He)})}var it=d(Pe,2);{var yt=Le=>{var Xe=df();Me(Xe,21,()=>e(y).subtasks??[],qe=>qe.id,(qe,lt)=>{var se=cf();let we;var Ae=s(se),Ve=d(Ae,2),Dt=s(Ve);M(()=>{we=Ke(se,1,"sub-row svelte-13vcwbh",null,we,{done:e(lt).is_completed}),Tl(Ae,e(lt).is_completed),p(Dt,e(lt).title)}),J("change",Ae,xe=>t.onToggleSubtask(e(lt).id,xe.currentTarget.checked)),m(qe,se)}),m(Le,Xe)};le(it,Le=>{e(K)&&e(V)&&Le(yt)})}M(()=>{Ot(dt,`background-color: ${r[e(y).priority||"none"]??r.none??""}`),Be=Ke(We,1,"title svelte-13vcwbh",null,Be,{done:e(D)}),p(ye,e(y).title),p(Qe,`${e(y).completed_pomodoros??0??""}/${e(y).estimated_pomodoros??0??""} ${e(n).timer.pomodoros??""}`)}),m(Q,X)}),M(()=>{p(j,e(n).timer.todayFocus),p(q,t.todayMinutes),p(O,e(n).timer.minute),p(ee,e(n).timer.taskList),p(ue,e(n).filter.project),p(de,e(n).filter.all),ge!==(ge=t.filter.project??"")&&(P.value=(P.__value=t.filter.project??"")??"",Nt(P,t.filter.project??"")),p(et,e(n).filter.tag),p(N,e(n).filter.all),ce!==(ce=t.filter.tag??"")&&(I.value=(I.__value=t.filter.tag??"")??"",Nt(I,t.filter.tag??"")),p(ve,e(n).filter.priority),p(ie,e(n).filter.date)}),J("change",P,Q=>t.onFilterChange({project:Q.currentTarget.value||null})),J("change",I,Q=>t.onFilterChange({tag:Q.currentTarget.value||null})),m(a,b),gt()}St(["change","click"]);var hf=E('<div class="backdrop svelte-1q19zmt" role="presentation"><div class="modal svelte-1q19zmt" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="icon-wrap svelte-1q19zmt">⏰</div> <h3 id="modal-title" class="title svelte-1q19zmt"> </h3> <p class="msg svelte-1q19zmt"> </p> <button class="btn svelte-1q19zmt" type="button"> </button></div></div>');function _f(a,t){pt(t,!0);const n=R(bt);function r(u){u.target===u.currentTarget&&t.onClose()}function o(u){u.key==="Escape"&&t.onClose()}var c=ze();kt("keydown",Uo,function(...u){var f;(f=t.open?o:void 0)==null||f.apply(this,u)});var i=Ne(c);{var l=u=>{var f=hf(),h=s(f),g=d(s(h),2),_=s(g),b=d(g,2),k=s(b),w=d(b,2),x=s(w);M(()=>{p(_,e(n).timer.focusCompleteTitle),p(k,t.message),p(x,e(n).common.confirm)}),J("click",f,r),J("click",w,function(...j){var S;(S=t.onClose)==null||S.apply(this,j)}),m(u,f)};le(i,u=>{t.open&&u(l)})}m(a,c),gt()}St(["click"]);var pf=E('<option class="svelte-17qnxlg"> </option>'),gf=E('<div class="task-picker svelte-17qnxlg"><select id="task-select" class="svelte-17qnxlg"><option class="svelte-17qnxlg"> </option><!></select></div>'),mf=E('<span class="pomo-count svelte-17qnxlg"> </span>'),bf=E('<div class="error svelte-17qnxlg" role="alert"> </div>'),ui=E('<button class="btn primary svelte-17qnxlg"> </button> <button class="btn danger svelte-17qnxlg"> </button>',1),yf=E('<button class="btn primary svelte-17qnxlg"> </button>'),kf=E('<div class="layout svelte-17qnxlg"><div class="main svelte-17qnxlg"><div class="main-inner svelte-17qnxlg"><div class="mode-tabs svelte-17qnxlg" role="tablist"><button role="tab"> </button> <button role="tab"> </button> <button role="tab"> </button></div> <!> <div class="ring-wrap svelte-17qnxlg"><svg class="ring svelte-17qnxlg" aria-hidden="true"><circle class="ring-track svelte-17qnxlg" fill="none"></circle><circle class="ring-progress svelte-17qnxlg" fill="none"></circle></svg> <div class="ring-center svelte-17qnxlg"><div class="time svelte-17qnxlg" aria-live="polite"> </div> <div class="mode-row svelte-17qnxlg"><span class="mode-label svelte-17qnxlg"> </span> <!></div></div></div> <!> <div class="controls svelte-17qnxlg"><!></div> <div class="today-stats svelte-17qnxlg"><span class="dot svelte-17qnxlg"></span> <b class="svelte-17qnxlg"> </b> </div> <div class="review-card svelte-17qnxlg"><div class="review-title svelte-17qnxlg"> </div> <!></div> <!></div></div> <!> <!></div>');function vi(a,t){pt(t,!0);let n=H(Oe([])),r=H(Oe([])),o=H(Oe([])),c=H(Oe([])),i=H(null),l=H(0),u=H(null),f=H(!1),h=H(Oe({project:null,tag:null,priority:null,date:null}));const g=R(Ts),_=R(bt),b=R(()=>{var we;const se=en();return e(g).mode==="focus"?(((we=e(g).activeTask)==null?void 0:we.pomodoro_duration)??se.focusDuration)*60:e(g).mode==="short_break"?se.shortBreakDuration*60:se.longBreakDuration*60}),k=R(()=>e(b)>0?1-e(g).secondsLeft/e(b):0),w=R(()=>Math.floor(e(g).secondsLeft/60)),x=R(()=>e(g).secondsLeft%60),j=R(()=>`${String(e(w)).padStart(2,"0")}:${String(e(x)).padStart(2,"0")}`),S=R(()=>e(g).activeTask),T=R(()=>!e(g).running&&e(g).sessionId===null&&!e(f)),q=R(()=>e(g).mode==="focus"),A=R(()=>e(g).mode==="focus"?e(_).mode.focusing:e(g).mode==="short_break"?e(_).mode.shortBreak:e(_).mode.longBreak);function O(){const se=new Date,we=new Date(se.getFullYear(),se.getMonth(),se.getDate(),0,0,0,0),Ae=new Date(se.getFullYear(),se.getMonth(),se.getDate()+1,0,0,0,0);return{startMs:we.getTime(),endMs:Ae.getTime()}}function U(){const se=new Date,we=new Date(se.getFullYear(),se.getMonth(),1,0,0,0,0),Ve=new Date(se.getFullYear(),se.getMonth()+1,1,0,0,0,0).getTime()-1;return{monthStartMs:we.getTime(),monthEndMs:Ve}}function $(){const se=new Date;return`${se.getFullYear()}-${String(se.getMonth()+1).padStart(2,"0")}-${String(se.getDate()).padStart(2,"0")}`}Pt(()=>{e(g).todayCount,P(),ne(),te()}),Pt(()=>{e(g).activeTask&&e(g).activeTask.status==="completed"&&ai(null)});async function ee(){try{v(n,await ys(),!0)}catch(se){console.warn("refresh projects",se)}}async function he(){try{v(r,await ks(),!0)}catch(se){console.warn("refresh tags",se)}}async function ne(){try{const se=U();v(o,await yn({status:null,month_start_ms:se.monthStartMs,month_end_ms:se.monthEndMs,project_id:e(h).project,tag_id:e(h).tag,priority:e(h).priority,date:e(h).date,limit:null}),!0)}catch(se){console.warn("refresh tasks",se)}}async function te(){try{const se=await yn({status:"active",limit:null}),we={high:0,medium:1,low:2,none:3};v(c,se.sort((Ae,Ve)=>{const Dt=we[Ae.priority??"none"]??3,xe=we[Ve.priority??"none"]??3;return Dt!==xe?Dt-xe:new Date(Ae.created_at??0).getTime()-new Date(Ve.created_at??0).getTime()}),!0)}catch(se){console.warn("refresh active tasks",se)}}async function ue(){try{const se=await Xs($());v(i,(se==null?void 0:se.content)??null,!0)}catch(se){console.warn("refresh review",se)}}async function P(){try{const se=O();v(l,await lv(se.startMs,se.endMs),!0)}catch(se){console.warn("refresh minutes",se)}}Pt(()=>{e(h),ne()}),$a(async()=>{await Promise.all([ee(),he(),ne(),te(),ue(),P()])});async function G(){var se,we,Ae;if(e(T)){v(f,!0),v(u,null);try{await ur(((se=e(S))==null?void 0:se.id)??null,((we=e(S))==null?void 0:we.project_id)??null,((Ae=e(S))==null?void 0:Ae.pomodoro_duration)??void 0)}catch(Ve){v(u,String(Ve),!0)}finally{v(f,!1)}}}async function de(){try{await tc(!1)}catch(se){v(u,String(se),!0)}}function be(se){e(g).running||Gr(se)}async function ge(se){try{await ec(se)}catch(we){v(u,String(we),!0)}}function Te(se){const we=se?e(c).find(Ae=>Ae.id===se)??null:null;ai(we)}async function Fe(se,we){try{const Ae=await Promise.all(e(o).map(Dt=>Jl(Dt.id)));let Ve=null;for(const Dt of Ae){const xe=Dt.find(vt=>vt.id===se);if(xe){Ve=xe;break}}if(!Ve)return;await Zo({...Ve,is_completed:we}),await ne(),await P()}catch(Ae){console.warn("toggle subtask",Ae)}}async function et(se){try{const we=$(),Ae=await Xs(we),Ve=Ae?{...Ae,content:se}:{id:crypto.randomUUID(),date:we,content:se,updated_at:new Date().toISOString()};await Gl(Ve),v(i,se,!0)}catch(we){console.warn("save review",we)}}async function I(){try{await Kl($()),v(i,null)}catch(se){console.warn("delete review",se)}}const C=280,N=12,B=(C-N)/2,ce=2*Math.PI*B,_e=R(()=>ce*(1-e(k)));var re=kf();Sr("17qnxlg",se=>{kr(()=>{Un.title=e(_).page.timer??""})});var ve=s(re),L=s(ve),oe=s(L),ie=s(oe);let me;var De=s(ie),je=d(ie,2);let Re;var Y=s(je),fe=d(je,2);let ke;var Q=s(fe),y=d(oe,2);{var D=se=>{var we=gf(),Ae=s(we),Ve=s(Ae),Dt=s(Ve);Ve.value=Ve.__value="";var xe=d(Ve);Me(xe,17,()=>e(c),ft=>ft.id,(ft,Ht)=>{var ae=pf(),Ce=s(ae),nt={};M(()=>{p(Ce,e(Ht).title),nt!==(nt=e(Ht).id)&&(ae.value=(ae.__value=e(Ht).id)??"")}),m(ft,ae)});var vt;qt(Ae),M(()=>{var ft,Ht,ae;Ae.disabled=e(g).running||e(g).sessionId!==null,p(Dt,e(_).timer.noSpecificTask),vt!==(vt=((ft=e(S))==null?void 0:ft.id)??"")&&(Ae.value=(Ae.__value=((Ht=e(S))==null?void 0:Ht.id)??"")??"",Nt(Ae,((ae=e(S))==null?void 0:ae.id)??""))}),J("change",Ae,ft=>Te(ft.currentTarget.value)),m(se,we)};le(y,se=>{e(q)&&se(D)})}var K=d(y,2),V=s(K);z(V,"width",C),z(V,"height",C),z(V,"viewBox","0 0 280 280");var W=s(V);z(W,"cx",C/2),z(W,"cy",C/2),z(W,"r",B),z(W,"stroke-width",N);var Z=d(W);z(Z,"cx",C/2),z(Z,"cy",C/2),z(Z,"r",B),z(Z,"stroke-width",N),z(Z,"stroke-dasharray",ce),z(Z,"transform","rotate(-90 140 140)");var X=d(V,2),Pe=s(X),Se=s(Pe),Ue=d(Pe,2),ht=s(Ue),dt=s(ht),ut=d(ht,2);{var We=se=>{var we=mf(),Ae=s(we);M(()=>{var Ve,Dt;return p(Ae,`${((Ve=e(S))==null?void 0:Ve.completed_pomodoros)??0??""}/${((Dt=e(S))==null?void 0:Dt.estimated_pomodoros)??0??""} ${e(_).timer.pomodoros??""}`)}),m(se,we)};le(ut,se=>{e(q)&&se(We)})}var Be=d(K,2);{var ye=se=>{var we=bf(),Ae=s(we);M(()=>p(Ae,`⚠ ${e(u)??""}`)),m(se,we)};le(Be,se=>{e(u)&&se(ye)})}var pe=d(Be,2),Ye=s(pe);{var Qe=se=>{var we=ui(),Ae=Ne(we),Ve=s(Ae),Dt=d(Ae,2),xe=s(Dt);M(()=>{p(Ve,e(_).timer.pause),p(xe,e(_).timer.abandon)}),J("click",Ae,function(...vt){yo==null||yo.apply(this,vt)}),J("click",Dt,de),m(se,we)},mt=se=>{var we=ui(),Ae=Ne(we),Ve=s(Ae),Dt=d(Ae,2),xe=s(Dt);M(()=>{p(Ve,e(_).timer.resume),p(xe,e(_).timer.abandon)}),J("click",Ae,function(...vt){ko==null||ko.apply(this,vt)}),J("click",Dt,de),m(se,we)},Ge=se=>{var we=yf(),Ae=s(we);M(()=>{we.disabled=!e(T),p(Ae,e(f)?e(_).timer.starting:e(q)?e(_).timer.start:e(_).timer.startBreak)}),J("click",we,G),m(se,we)};le(Ye,se=>{e(g).running?se(Qe):e(g).sessionId?se(mt,1):se(Ge,-1)})}var Tt=d(pe,2),Ft=d(s(Tt)),Bt=d(Ft),zt=s(Bt),At=d(Bt),He=d(Tt,2),it=s(He),yt=s(it),Le=d(it,2);Vr(Le,{get value(){return e(i)},get placeholder(){return e(_).timer.reviewPlaceholder},rows:2,onSave:et,onDelete:I});var Xe=d(He,2);af(Xe,{});var qe=d(ve,2);ff(qe,{get todayMinutes(){return e(l)},get projects(){return e(n)},get tags(){return e(r)},get tasks(){return e(o)},get filter(){return e(h)},onFilterChange:se=>v(h,{...e(h),...se},!0),onStartTask:ge,onToggleSubtask:Fe});var lt=d(qe,2);{let se=R(()=>e(g).pendingCompletionMessage!==null),we=R(()=>e(g).pendingCompletionMessage??"");_f(lt,{get open(){return e(se)},get message(){return e(we)},get onClose(){return pv}})}M(()=>{z(oe,"aria-label",e(_).timer.modeTabsAria),me=Ke(ie,1,"mode-tab svelte-17qnxlg",null,me,{active:e(g).mode==="focus"}),ie.disabled=e(g).running,z(ie,"aria-selected",e(g).mode==="focus"),p(De,e(_).mode.focus),Re=Ke(je,1,"mode-tab svelte-17qnxlg",null,Re,{active:e(g).mode==="short_break"}),je.disabled=e(g).running,z(je,"aria-selected",e(g).mode==="short_break"),p(Y,e(_).mode.shortBreak),ke=Ke(fe,1,"mode-tab svelte-17qnxlg",null,ke,{active:e(g).mode==="long_break"}),fe.disabled=e(g).running,z(fe,"aria-selected",e(g).mode==="long_break"),p(Q,e(_).mode.longBreak),z(Z,"stroke-dashoffset",e(_e)),p(Se,e(j)),p(dt,e(A)),p(Ft,` ${e(_).timer.todayDone??""} `),p(zt,e(g).todayCount),p(At,` ${e(_).timer.pomodoroUnit??""}`),p(yt,e(_).timer.reviewTitle)}),J("click",ie,()=>be("focus")),J("click",je,()=>be("short_break")),J("click",fe,()=>be("long_break")),m(a,re),gt()}St(["click","change"]);async function wf(a={}){return typeof a=="object"&&Object.freeze(a),await Je("plugin:dialog|save",{options:a})}//! 截止时间（due_date）相关工具。
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
function es(a){return!!a&&a.includes("T")}function Vt(a){return(a||"").slice(0,10)}function Ca(){const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function xf(){const a=new Date;return`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`}function fi(a){return`${Vt(a)||Ca()}T${xf()}`}function qr(){const a=new Date;return a.setDate(a.getDate()+1),`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function hi(a){if(!a)return"";try{const t=new Date(a);if(isNaN(t.getTime()))return"";const n=t.getTimezoneOffset();return new Date(t.getTime()-n*6e4).toISOString().slice(0,16)}catch{return""}}function lc(a){if(!a)return null;try{const t=new Date(a);return isNaN(t.getTime())?null:t.toISOString()}catch{return null}}var Sf=E('<span class="filter-stats svelte-qbpxhc"> </span>'),Tf=E('<button type="button"><span class="filter-label svelte-qbpxhc"><!> </span> <!></button>'),Df=E('<button type="button" class="add-root svelte-qbpxhc"><!></button>'),Pf=E('<div class="add-row depth-0 svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Mf=E('<div class="edit-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),Ef=E('<button type="button" class="expand-btn svelte-qbpxhc"><!></button>'),Cf=E('<span class="expand-spacer svelte-qbpxhc"></span>'),jf=E('<button type="button" class="more-btn svelte-qbpxhc"><!></button>'),Nf=E('<div><span class="node-label svelte-qbpxhc" role="button" tabindex="0"><!> <!> <span class="node-name svelte-qbpxhc"> </span></span> <!></div>'),Ff=E('<div class="add-row svelte-qbpxhc"><input type="text" class="add-input svelte-qbpxhc"/></div>'),_i=E('<button type="button" class="ctx-item svelte-qbpxhc"><!> </button>'),Af=E('<button type="button" class="ctx-item danger svelte-qbpxhc"><!> </button>'),If=E('<div class="context-menu svelte-qbpxhc"><!> <!> <!></div>'),Rf=E('<div class="tree-node svelte-qbpxhc"><!> <!> <!></div>'),qf=E('<div class="empty-hint svelte-qbpxhc"> </div>'),Lf=E('<div class="projects-tree svelte-qbpxhc"><!> <!> <!></div>'),Of=E('<aside class="sidebar svelte-qbpxhc"><div class="search-row svelte-qbpxhc"><!> <input type="text" class="search-input svelte-qbpxhc"/></div> <div class="time-filters svelte-qbpxhc"></div> <div class="projects-section svelte-qbpxhc"><div class="projects-header svelte-qbpxhc"><button type="button" class="projects-toggle svelte-qbpxhc"><!> </button> <!></div> <!></div></aside>');function Bf(a,t){pt(t,!0);const n=R(bt);let r=va(t,"search",3,""),o=H(!0),c=H(Oe(new Set)),i=H(null),l=H(null),u=H(""),f=H(null),h=H("");function g(I){const C=I.getDay(),N=C===0?-6:1-C,B=new Date(I);return B.setDate(B.getDate()+N),B.setHours(0,0,0,0),B}function _(I){const C=g(I),N=new Date(C);return N.setDate(N.getDate()+6),N.setHours(23,59,59,999),N}function b(I,C){if(C==="journal")return{timeStr:"",count:0};const N=Ca(),B=qr(),ce=g(new Date),_e=_(new Date);let re=I;C==="today"&&(re=I.filter(me=>Vt(me.due_date)===N)),C==="tomorrow"&&(re=I.filter(me=>Vt(me.due_date)===B)),C==="week"&&(re=I.filter(me=>{if(!me.due_date)return!1;const De=new Date(me.due_date);return De>=ce&&De<=_e})),C==="planned"&&(re=I.filter(me=>me.due_date!==null&&me.due_date!==void 0)),C==="completed"&&(re=I.filter(me=>me.status==="completed"));const ve=re.reduce((me,De)=>me+(De.estimated_pomodoros||0)*(De.pomodoro_duration||25),0),L=Math.floor(ve/60),oe=ve%60;return{timeStr:L>0?`${L}h ${oe}m`:`${oe}m`,count:re.length}}function k(I){const C=new Map,N=[];for(const ce of I)C.set(ce.id,{...ce,children:[],depth:0});for(const ce of I){const _e=C.get(ce.id);_e&&(ce.parent_id&&C.has(ce.parent_id)?C.get(ce.parent_id).children.push(_e):N.push(_e))}const B=(ce,_e)=>{for(const re of ce)re.depth=_e,B(re.children,_e+1)};return B(N,0),N}function w(I,C){const N=[];for(const B of I)N.push(B),C.has(B.id)&&B.children.length>0&&N.push(...w(B.children,C));return N}const x=R(()=>k(t.projects)),j=R(()=>w(e(x),e(c))),S=R(()=>[{key:"today",icon:Mu,label:e(n).filter.today},{key:"tomorrow",icon:Eu,label:e(n).filter.tomorrow},{key:"week",icon:Pl,label:e(n).filter.week},{key:"planned",icon:vu,label:e(n).sidebar.planned},{key:"completed",icon:Jo,label:e(n).sidebar.completed},{key:"journal",icon:fu,label:e(n).sidebar.journal}]),T=R(()=>t.selectedProject===null?t.filter:"");function q(I){const C=new Set(e(c));C.has(I)?C.delete(I):C.add(I),v(c,C,!0)}function A(I){t.onSetFilter(I),t.onSelectProject(null)}var O=Of(),U=s(O),$=s(U);Du($,{size:14,class:"search-icon"});var ee=d($,2),he=d(U,2);Me(he,21,()=>e(S),I=>I.key,(I,C)=>{const N=R(()=>b(t.tasks,e(C).key)),B=R(()=>e(T)===e(C).key);var ce=Tf();let _e;var re=s(ce),ve=s(re);xr(ve,()=>e(C).icon,(me,De)=>{De(me,{size:16})});var L=d(ve),oe=d(re,2);{var ie=me=>{var De=Sf(),je=s(De);M(()=>p(je,`${e(N).timeStr??""} ${e(N).count??""}`)),m(me,De)};le(oe,me=>{e(N).count>0&&me(ie)})}M(()=>{_e=Ke(ce,1,"filter-btn svelte-qbpxhc",null,_e,{active:e(B)}),p(L,` ${e(C).label??""}`)}),J("click",ce,()=>A(e(C).key)),m(I,ce)});var ne=d(he,2),te=s(ne),ue=s(te),P=s(ue);{var G=I=>{lr(I,{size:14})},de=I=>{qn(I,{size:14})};le(P,I=>{e(o)?I(G):I(de,-1)})}var be=d(P),ge=d(ue,2);{var Te=I=>{var C=Df(),N=s(C);Ln(N,{size:14}),M(()=>{z(C,"aria-label",e(n).sidebar.addRootAria),z(C,"title",e(n).sidebar.addListTitle)}),J("click",C,()=>{v(f,"root"),v(h,"")}),m(I,C)};le(ge,I=>{t.onCreateProject&&I(Te)})}var Fe=d(te,2);{var et=I=>{var C=Lf(),N=s(C);{var B=ve=>{var L=Pf(),oe=s(L);vn(oe,!0),M(()=>z(oe,"placeholder",e(n).sidebar.listNamePlaceholder)),J("keydown",oe,ie=>{if(ie.key==="Enter"){const me=e(h).trim();me&&t.onCreateProject&&t.onCreateProject(me,null),v(f,null),v(h,"")}ie.key==="Escape"&&(v(f,null),v(h,""))}),kt("blur",oe,()=>{const ie=e(h).trim();ie&&t.onCreateProject&&t.onCreateProject(ie,null),v(f,null),v(h,"")}),wt(oe,()=>e(h),ie=>v(h,ie)),m(ve,L)};le(N,ve=>{e(f)==="root"&&t.onCreateProject&&ve(B)})}var ce=d(N,2);Me(ce,17,()=>e(j),ve=>ve.id,(ve,L)=>{const oe=R(()=>t.selectedProject===e(L).id),ie=R(()=>e(i)===e(L).id),me=R(()=>e(l)===e(L).id),De=R(()=>e(L).children.length>0),je=R(()=>e(c).has(e(L).id));var Re=Rf(),Y=s(Re);{var fe=V=>{var W=Mf(),Z=s(W);vn(Z,!0),J("keydown",Z,X=>{if(X.key==="Enter"){const Pe=e(u).trim();Pe&&t.onUpdateProject&&t.onUpdateProject(e(L).id,Pe),v(l,null),v(u,"")}X.key==="Escape"&&(v(l,null),v(u,""))}),kt("blur",Z,()=>{const X=e(u).trim();X&&t.onUpdateProject&&t.onUpdateProject(e(L).id,X),v(l,null),v(u,"")}),wt(Z,()=>e(u),X=>v(u,X)),m(V,W)},ke=V=>{var W=Nf();let Z;var X=s(W),Pe=s(X);{var Se=ye=>{var pe=Ef(),Ye=s(pe);{var Qe=Ge=>{lr(Ge,{size:12})},mt=Ge=>{qn(Ge,{size:12})};le(Ye,Ge=>{e(je)?Ge(Qe):Ge(mt,-1)})}M(()=>z(pe,"aria-label",e(je)?e(n).form.collapse:e(n).common.expand)),J("click",pe,Ge=>{Ge.stopPropagation(),q(e(L).id)}),m(ye,pe)},Ue=ye=>{var pe=Cf();m(ye,pe)};le(Pe,ye=>{e(De)?ye(Se):ye(Ue,-1)})}var ht=d(Pe,2);{let ye=R(()=>e(L).color||"var(--color-accent)");mu(ht,{size:14,get color(){return e(ye)}})}var dt=d(ht,2),ut=s(dt),We=d(X,2);{var Be=ye=>{var pe=jf(),Ye=s(pe);pu(Ye,{size:14}),M(()=>z(pe,"aria-label",e(n).sidebar.moreActions)),J("click",pe,Qe=>{Qe.stopPropagation(),v(i,e(ie)?null:e(L).id,!0)}),m(ye,pe)};le(We,ye=>{(t.onUpdateProject||t.onDeleteProject||t.onCreateProject&&e(L).depth<2)&&ye(Be)})}M(()=>{Z=Ke(W,1,"node-row svelte-qbpxhc",null,Z,{active:e(oe)}),p(ut,e(L).name)}),J("click",X,()=>{t.onSelectProject(e(L).id),t.onSetFilter("")}),J("keydown",X,ye=>{(ye.key==="Enter"||ye.key===" ")&&(ye.preventDefault(),t.onSelectProject(e(L).id),t.onSetFilter(""))}),m(V,W)};le(Y,V=>{e(me)?V(fe):V(ke,-1)})}var Q=d(Y,2);{var y=V=>{var W=Ff(),Z=s(W);vn(Z,!0),M(()=>{Ot(W,`padding-left: ${(e(L).depth+1)*12+12}px;`),z(Z,"placeholder",e(L).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)}),J("keydown",Z,X=>{if(X.key==="Enter"){const Pe=e(h).trim();Pe&&t.onCreateProject&&t.onCreateProject(Pe,e(L).id),v(f,null),v(h,"");const Se=new Set(e(c));Se.add(e(L).id),v(c,Se,!0)}X.key==="Escape"&&(v(f,null),v(h,""))}),kt("blur",Z,()=>{const X=e(h).trim();X&&t.onCreateProject&&t.onCreateProject(X,e(L).id),v(f,null),v(h,"");const Pe=new Set(e(c));Pe.add(e(L).id),v(c,Pe,!0)}),wt(Z,()=>e(h),X=>v(h,X)),m(V,W)};le(Q,V=>{e(f)===e(L).id&&t.onCreateProject&&V(y)})}var D=d(Q,2);{var K=V=>{var W=If(),Z=s(W);{var X=dt=>{var ut=_i(),We=s(ut);Ln(We,{size:12});var Be=d(We);M(()=>p(Be,` ${e(n).settings.list.addChild??""}`)),J("click",ut,()=>{v(f,e(L).id,!0),v(h,""),v(i,null)}),m(dt,ut)};le(Z,dt=>{t.onCreateProject&&e(L).depth<2&&dt(X)})}var Pe=d(Z,2);{var Se=dt=>{var ut=_i(),We=s(ut);Cl(We,{size:12});var Be=d(We);M(()=>p(Be,` ${e(n).settings.list.edit??""}`)),J("click",ut,()=>{v(u,e(L).name,!0),v(l,e(L).id,!0),v(i,null)}),m(dt,ut)};le(Pe,dt=>{t.onUpdateProject&&dt(Se)})}var Ue=d(Pe,2);{var ht=dt=>{var ut=Af(),We=s(ut);ms(We,{size:12});var Be=d(We);M(()=>p(Be,` ${e(n).settings.list.del??""}`)),J("click",ut,()=>{t.onDeleteProject(e(L).id),v(i,null)}),m(dt,ut)};le(Ue,dt=>{t.onDeleteProject&&dt(ht)})}m(V,W)};le(D,V=>{e(ie)&&!e(me)&&V(K)})}M(()=>Ot(Re,`padding-left: ${e(L).depth*12}px;`)),m(ve,Re)});var _e=d(ce,2);{var re=ve=>{var L=qf(),oe=s(L);M(()=>p(oe,e(n).sidebar.emptyHint)),m(ve,L)};le(_e,ve=>{t.projects.length===0&&e(f)!=="root"&&ve(re)})}m(I,C)};le(Fe,I=>{e(o)&&I(et)})}M(()=>{Vo(ee,r()),z(ee,"placeholder",e(n).sidebar.searchTasksPlaceholder),p(be,` ${e(n).task.list??""}`)}),J("input",ee,I=>{var C;return(C=t.onSearchChange)==null?void 0:C.call(t,I.currentTarget.value)}),J("click",ue,()=>v(o,!e(o))),m(a,O),gt()}St(["input","click","keydown"]);var zf=E('<span class="pri-badge svelte-3041n"> </span>'),Hf=E('<span class="tag svelte-3041n"> </span>'),Uf=E('<div class="row-2 svelte-3041n"></div>'),Wf=E("<span></span>"),Yf=E('<span class="progress svelte-3041n"><span class="dots svelte-3041n"></span> <span class="count svelte-3041n"> </span></span>'),Gf=E('<span class="due svelte-3041n"> </span>'),Kf=E('<button type="button" class="start svelte-3041n"><!></button>'),Vf=E('<div role="button" tabindex="0"><button type="button"><!></button> <div class="main svelte-3041n"><div class="row-1 svelte-3041n"><!> <span class="title svelte-3041n"> </span></div> <!> <div class="row-3 svelte-3041n"><!> <!></div></div> <!></div>');function cc(a,t){pt(t,!0);const n=R(bt),r=R(()=>t.task.status==="completed"),o=R(()=>t.task.estimated_pomodoros||0),c=R(()=>t.task.completed_pomodoros||0),i=R(()=>({high:"var(--color-priority-high, #c97b6e)",medium:"var(--color-priority-medium, #d4a373)",low:"var(--color-priority-low, #9ca3af)",none:"var(--color-priority-low, #9ca3af)"})[t.task.priority||"none"]),l=R(()=>({high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""})[t.task.priority||"none"]),u=R(()=>t.task.due_date?Vt(t.task.due_date):"");var f=Vf();let h;var g=s(f);let _;var b=s(g);{var k=P=>{on(P,{size:12,strokeWidth:3,color:"#fff"})};le(b,P=>{e(r)&&P(k)})}var w=d(g,2),x=s(w),j=s(x);{var S=P=>{var G=zf(),de=s(G);M(()=>{Ot(G,`--pri-color: ${e(i)??""}`),p(de,e(l))}),m(P,G)};le(j,P=>{t.task.priority&&t.task.priority!=="none"&&P(S)})}var T=d(j,2),q=s(T),A=d(x,2);{var O=P=>{var G=Uf();Me(G,21,()=>t.task.tags.slice(0,3),de=>de.id,(de,be)=>{var ge=Hf(),Te=s(ge);M(()=>p(Te,`#${e(be).name??""}`)),m(de,ge)}),m(P,G)};le(A,P=>{t.task.tags&&t.task.tags.length>0&&P(O)})}var U=d(A,2),$=s(U);{var ee=P=>{var G=Yf(),de=s(G);Me(de,21,()=>Array.from({length:Math.min(e(o),8)}),La,(Te,Fe,et)=>{var I=Wf();let C;M(()=>C=Ke(I,1,"dot svelte-3041n",null,C,{filled:et<e(c)})),m(Te,I)});var be=d(de,2),ge=s(be);M(()=>p(ge,`${e(c)??""}/${e(o)??""} ${e(n).timer.pomodoros??""}`)),m(P,G)};le($,P=>{e(o)>0&&P(ee)})}var he=d($,2);{var ne=P=>{var G=Gf(),de=s(G);M(()=>p(de,e(u))),m(P,G)};le(he,P=>{e(u)&&P(ne)})}var te=d(w,2);{var ue=P=>{var G=Kf(),de=s(G);jl(de,{size:13,color:"#fff",fill:"#fff"}),M(()=>{z(G,"aria-label",e(n).task.startTooltip),z(G,"title",e(n).task.startTooltip)}),J("click",G,be=>{var ge;be.stopPropagation(),(ge=t.onStart)==null||ge.call(t,t.task)}),m(P,G)};le(te,P=>{!e(r)&&t.onStart&&P(ue)})}M(()=>{h=Ke(f,1,"task-card svelte-3041n",null,h,{selected:t.selected,done:e(r)}),z(f,"aria-label",t.task.title),_=Ke(g,1,"check svelte-3041n",null,_,{checked:e(r)}),z(g,"aria-label",e(r)?e(n).common.ariaMarkUndone:e(n).common.ariaMarkDone),p(q,t.task.title)}),J("click",f,()=>t.onSelect(t.task)),J("keydown",f,P=>{(P.key==="Enter"||P.key===" ")&&(P.preventDefault(),t.onSelect(t.task))}),J("click",g,P=>{P.stopPropagation(),t.onToggle(t.task.id)}),m(a,f),gt()}St(["click","keydown"]);var Jf=E('<div class="empty svelte-q02l1n"> </div>'),Qf=E('<span class="check svelte-q02l1n">✓</span>'),Xf=E('<button type="button"><!> <span class="name svelte-q02l1n"> </span></button>'),Zf=E('<div class="chips svelte-q02l1n" role="group"></div>');function $f(a,t){pt(t,!0);const n=R(bt),r=R(()=>new Set(t.selected));function o(h){const g=new Set(e(r));g.has(h)?g.delete(h):g.add(h),t.onChange([...g])}function c(h){return`--chip-color: ${h&&h.length>0?h:"var(--color-accent)"};`}var i=ze(),l=Ne(i);{var u=h=>{var g=Jf(),_=s(g);M(()=>p(_,e(n).task.detailNoTagsAvailable)),m(h,g)},f=h=>{var g=Zf();Me(g,21,()=>t.tags,_=>_.id,(_,b)=>{const k=R(()=>e(r).has(e(b).id));var w=Xf();let x;var j=s(w);{var S=A=>{var O=Qf();m(A,O)};le(j,A=>{e(k)&&A(S)})}var T=d(j,2),q=s(T);M(A=>{x=Ke(w,1,"chip svelte-q02l1n",null,x,{on:e(k)}),Ot(w,A),z(w,"aria-pressed",e(k)),p(q,e(b).name)},[()=>c(e(b).color)]),J("click",w,()=>o(e(b).id)),m(_,w)}),M(()=>z(g,"aria-label",e(n).task.tagPickerAria)),m(h,g)};le(l,h=>{t.tags.length===0?h(u):h(f,-1)})}m(a,i),gt()}St(["click"]);var eh=E('<input type="text" class="title-input svelte-1t5orp1"/>'),th=E('<button type="button" class="title-btn svelte-1t5orp1"> </button>'),ah=E('<li><input type="checkbox" class="svelte-1t5orp1"/> <!> <button type="button" class="del svelte-1t5orp1">×</button></li>');function nh(a,t){pt(t,!0);const n=R(bt);let r=H(!1),o=H(Oe(Kt(()=>t.subtask.title))),c=H(null);Pt(()=>{e(r)||v(o,t.subtask.title,!0)});function i(){v(o,t.subtask.title,!0),v(r,!0),queueMicrotask(()=>{var S;return(S=e(c))==null?void 0:S.focus()})}function l(){const S=e(o).trim();e(r)&&(v(r,!1),S&&S!==t.subtask.title?t.onChange({...t.subtask,title:S}):S||v(o,t.subtask.title,!0))}function u(){v(o,t.subtask.title,!0),v(r,!1)}function f(S){S.key==="Enter"?(S.preventDefault(),l()):S.key==="Escape"&&(S.preventDefault(),u())}function h(){t.onChange({...t.subtask,is_completed:!t.subtask.is_completed})}var g=ah();let _;var b=s(g),k=d(b,2);{var w=S=>{var T=eh();tu(T,q=>v(c,q),()=>e(c)),M(()=>z(T,"aria-label",e(n).task.editSubtask)),kt("blur",T,l),J("keydown",T,f),wt(T,()=>e(o),q=>v(o,q)),m(S,T)},x=S=>{var T=th(),q=s(T);M(()=>{z(T,"title",e(n).task.dblclickToEdit),p(q,t.subtask.title)}),J("dblclick",T,i),m(S,T)};le(k,S=>{e(r)?S(w):S(x,-1)})}var j=d(k,2);M(()=>{_=Ke(g,1,"row svelte-1t5orp1",null,_,{done:t.subtask.is_completed}),Tl(b,t.subtask.is_completed),z(b,"aria-label",e(n).task.toggleSubtaskAria),z(j,"aria-label",e(n).task.deleteSubtask)}),J("change",b,h),J("click",j,()=>t.onDelete(t.subtask.id)),m(a,g),gt()}St(["change","keydown","dblclick","click"]);var rh=E("<span> </span>"),Mo=E("<option> </option>"),oh=E('<button type="button" class="link svelte-1qppxcb"> </button>'),sh=E('<aside class="panel svelte-1qppxcb"><header class="head svelte-1qppxcb"><div class="meta svelte-1qppxcb"><span class="proj svelte-1qppxcb"> </span> <!></div> <button class="close svelte-1qppxcb">×</button></header> <input class="title svelte-1qppxcb"/> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="desc"> </label> <textarea id="desc" class="desc svelte-1qppxcb" rows="4"></textarea></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="proj"> </label> <select id="proj" class="svelte-1qppxcb"><option> </option><!></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="pri"> </label> <select id="pri" class="svelte-1qppxcb"><option> </option><option> </option><option> </option><option> </option></select></div></section> <section class="block svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="due"> </label> <div class="row-inline svelte-1qppxcb"><input id="due" type="datetime-local" class="svelte-1qppxcb"/> <!></div></section> <section class="block row svelte-1qppxcb"><div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="reminder"> </label> <select id="reminder" class="svelte-1qppxcb"></select></div> <div class="col svelte-1qppxcb"><label class="lbl svelte-1qppxcb" for="repeat"> </label> <select id="repeat" class="svelte-1qppxcb"></select></div></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb"> </span> <!></section> <section class="block svelte-1qppxcb"><span class="lbl svelte-1qppxcb"> </span> <ul class="sub-list svelte-1qppxcb"></ul> <form class="sub-add svelte-1qppxcb"><input type="text" class="svelte-1qppxcb"/> <button type="submit" class="svelte-1qppxcb"> </button></form></section> <section class="block svelte-1qppxcb"><button class="delete svelte-1qppxcb"> </button></section></aside>');function ih(a,t){pt(t,!0);const n=R(bt);let r=H(Oe(Kt(()=>t.task.title))),o=H(Oe(Kt(()=>t.task.description??""))),c=H(Oe(Kt(()=>hi(t.task.due_date))));Pt(()=>{v(r,t.task.title,!0),v(o,t.task.description??"",!0),v(c,hi(t.task.due_date),!0)});function i(){return new Date().toISOString()}async function l(ae){try{await Xo({...t.task,...ae,updated_at:i()}),t.onChanged()}catch(Ce){console.error("patch task failed",Ce),alert(Ct(e(n).task.saveFailed,{err:String(Ce)}))}}async function u(ae){try{await Xo({...t.task,repeat:ae,updated_at:i()},e(b)),t.onChanged()}catch(Ce){console.error("patch repeat failed",Ce),alert(Ct(e(n).task.saveFailed,{err:String(Ce)}))}}async function f(){const ae=e(r).trim();!ae||ae===t.task.title||await l({title:ae})}async function h(){e(o)!==(t.task.description??"")&&await l({description:e(o)})}async function g(){const ae=lc(e(c));ae!==t.task.due_date&&await l({due_date:ae})}function _(){v(c,""),l({due_date:null})}let b=H(Oe([]));Pt(()=>{k()});async function k(){try{const ae=await Ju(t.task.id);v(b,ae.map(Ce=>Ce.id),!0)}catch(ae){console.error("load tags failed",ae)}}async function w(ae){const Ce=e(b);v(b,ae,!0);try{await Qu(t.task.id,ae),t.onChanged()}catch(nt){v(b,Ce,!0),alert(Ct(e(n).task.setTagsFailed,{err:String(nt)}))}}let x=H(Oe([])),j=H("");Pt(()=>{S()});async function S(){try{v(x,await Jl(t.task.id),!0)}catch(ae){console.error("load subtasks failed",ae)}}async function T(){const ae=e(j).trim();if(!ae)return;v(j,"");const Ce={id:crypto.randomUUID(),task_id:t.task.id,title:ae,is_completed:!1,position:e(x).length,created_at:i(),updated_at:i()};try{const nt=await Zo(Ce);v(x,[...e(x),nt],!0),t.onChanged()}catch(nt){alert(Ct(e(n).task.addSubtaskFailed,{err:String(nt)}))}}async function q(ae){const Ce=e(x).find(nt=>nt.id===ae.id);v(x,e(x).map(nt=>nt.id===ae.id?ae:nt),!0);try{await Zo(ae),t.onChanged()}catch(nt){Ce&&v(x,e(x).map(Ta=>Ta.id===Ce.id?Ce:Ta),!0),alert(Ct(e(n).task.updateSubtaskFailed,{err:String(nt)}))}}async function A(ae){const Ce=e(x);v(x,e(x).filter(nt=>nt.id!==ae),!0);try{await rv(ae),t.onChanged()}catch(nt){v(x,Ce,!0),alert(Ct(e(n).task.deleteSubtaskFailed,{err:String(nt)}))}}async function O(){try{await Yu(t.task.id),t.onClose(),t.onChanged()}catch(ae){alert(Ct(e(n).task.saveFailed,{err:String(ae)}))}}const U=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],$=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"}],ee={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},he={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly"};function ne(ae){return e(n).enum.reminder[ee[ae]]}function te(ae){return e(n).enum.repeat[he[ae]]}function ue(ae){var Ce;return ae?((Ce=t.projects.find(nt=>nt.id===ae))==null?void 0:Ce.name)??e(n).task.unknownProject:e(n).task.detailNoProject}function P(ae){return{high:e(n).priority.high,medium:e(n).priority.medium,low:e(n).priority.low,none:""}[ae??"none"]??""}var G=sh(),de=s(G),be=s(de),ge=s(be),Te=s(ge),Fe=d(ge,2);{var et=ae=>{var Ce=rh(),nt=s(Ce);M(Ta=>{Ke(Ce,1,`pri pri-${t.task.priority??""}`,"svelte-1qppxcb"),p(nt,Ta)},[()=>P(t.task.priority)]),m(ae,Ce)};le(Fe,ae=>{t.task.priority!=="none"&&ae(et)})}var I=d(be,2),C=d(de,2),N=d(C,2),B=s(N),ce=s(B),_e=d(B,2),re=d(N,2),ve=s(re),L=s(ve),oe=s(L),ie=d(L,2),me=s(ie),De=s(me);me.value=me.__value="";var je=d(me);Me(je,17,()=>t.projects,ae=>ae.id,(ae,Ce)=>{var nt=Mo(),Ta=s(nt),Ua={};M(()=>{p(Ta,e(Ce).name),Ua!==(Ua=e(Ce).id)&&(nt.value=(nt.__value=e(Ce).id)??"")}),m(ae,nt)});var Re;qt(ie);var Y=d(ve,2),fe=s(Y),ke=s(fe),Q=d(fe,2),y=s(Q),D=s(y);y.value=y.__value="none";var K=d(y),V=s(K);K.value=K.__value="high";var W=d(K),Z=s(W);W.value=W.__value="medium";var X=d(W),Pe=s(X);X.value=X.__value="low";var Se;qt(Q);var Ue=d(re,2),ht=s(Ue),dt=s(ht),ut=d(ht,2),We=s(ut),Be=d(We,2);{var ye=ae=>{var Ce=oh(),nt=s(Ce);M(()=>p(nt,e(n).common.clear)),J("click",Ce,_),m(ae,Ce)};le(Be,ae=>{e(c)&&ae(ye)})}var pe=d(Ue,2),Ye=s(pe),Qe=s(Ye),mt=s(Qe),Ge=d(Qe,2);Me(Ge,21,()=>U,ae=>ae.value,(ae,Ce)=>{var nt=Mo(),Ta=s(nt),Ua={};M(lo=>{p(Ta,lo),Ua!==(Ua=e(Ce).value)&&(nt.value=(nt.__value=e(Ce).value)??"")},[()=>ne(e(Ce).value)]),m(ae,nt)});var Tt;qt(Ge);var Ft=d(Ye,2),Bt=s(Ft),zt=s(Bt),At=d(Bt,2);Me(At,21,()=>$,ae=>ae.value,(ae,Ce)=>{var nt=Mo(),Ta=s(nt),Ua={};M(lo=>{p(Ta,lo),Ua!==(Ua=e(Ce).value)&&(nt.value=(nt.__value=e(Ce).value)??"")},[()=>te(e(Ce).value)]),m(ae,nt)});var He;qt(At);var it=d(pe,2),yt=s(it),Le=s(yt),Xe=d(yt,2);$f(Xe,{get tags(){return t.allTags},get selected(){return e(b)},onChange:w});var qe=d(it,2),lt=s(qe),se=s(lt),we=d(lt,2);Me(we,21,()=>e(x),ae=>ae.id,(ae,Ce)=>{nh(ae,{get subtask(){return e(Ce)},onChange:q,onDelete:A})});var Ae=d(we,2),Ve=s(Ae),Dt=d(Ve,2),xe=s(Dt),vt=d(qe,2),ft=s(vt),Ht=s(ft);M((ae,Ce)=>{z(G,"aria-label",e(n).task.detailPanelAria),p(Te,ae),z(I,"aria-label",e(n).common.close),z(C,"aria-label",e(n).task.titleAria),p(ce,e(n).task.detailDescription),z(_e,"placeholder",e(n).task.detailDescPlaceholder),p(oe,e(n).task.detailProject),p(De,e(n).task.detailNoProject),Re!==(Re=t.task.project_id??"")&&(ie.value=(ie.__value=t.task.project_id??"")??"",Nt(ie,t.task.project_id??"")),p(ke,e(n).task.detailPriority),p(D,e(n).priority.none),p(V,e(n).priority.high),p(Z,e(n).priority.medium),p(Pe,e(n).priority.low),Se!==(Se=t.task.priority)&&(Q.value=(Q.__value=t.task.priority)??"",Nt(Q,t.task.priority)),p(dt,e(n).task.detailDueDate),p(mt,e(n).task.detailReminder),Tt!==(Tt=t.task.reminder??"none")&&(Ge.value=(Ge.__value=t.task.reminder??"none")??"",Nt(Ge,t.task.reminder??"none")),p(zt,e(n).task.detailRepeat),He!==(He=t.task.repeat??"none")&&(At.value=(At.__value=t.task.repeat??"none")??"",Nt(At,t.task.repeat??"none")),p(Le,e(n).filter.tag),p(se,e(n).task.detailSubtasks),z(Ve,"placeholder",e(n).task.detailAddSubtask),z(Ve,"aria-label",e(n).task.newSubtaskAria),Dt.disabled=Ce,p(xe,e(n).common.add),p(Ht,e(n).task.detailDelete)},[()=>ue(t.task.project_id),()=>!e(j).trim()]),J("click",I,function(...ae){var Ce;(Ce=t.onClose)==null||Ce.apply(this,ae)}),kt("blur",C,f),J("keydown",C,ae=>{ae.key==="Enter"&&(ae.preventDefault(),ae.currentTarget.blur())}),wt(C,()=>e(r),ae=>v(r,ae)),kt("blur",_e,h),wt(_e,()=>e(o),ae=>v(o,ae)),J("change",ie,ae=>{const Ce=ae.currentTarget.value;l({project_id:Ce||null})}),J("change",Q,ae=>{const Ce=ae.currentTarget.value;l({priority:Ce})}),kt("blur",We,g),wt(We,()=>e(c),ae=>v(c,ae)),J("change",Ge,ae=>{const Ce=ae.currentTarget.value;l({reminder:Ce})}),J("change",At,ae=>{const Ce=ae.currentTarget.value;u(Ce)}),kt("submit",Ae,ae=>{ae.preventDefault(),T()}),wt(Ve,()=>e(j),ae=>v(j,ae)),J("click",ft,()=>{confirm(Ct(e(n).task.deleteConfirm,{title:t.task.title}))&&O()}),m(a,G),gt()}St(["click","keydown","change"]);var lh=E('<div class="group-tasks svelte-1u318f6"></div>'),ch=E('<div class="group svelte-1u318f6"><button type="button" class="group-header svelte-1u318f6"><span> </span> <span class="chev svelte-1u318f6"><!></span></button> <!></div>'),dh=E('<div class="grouped svelte-1u318f6"></div>');function uh(a,t){pt(t,!0);const n=R(bt),r="unscheduled";let o=H(Oe(new Set));function c(f,h){const g=new Date(f+"T00:00:00"),_=h.reduce((b,k)=>b+(k.estimated_pomodoros||0)*(k.pomodoro_duration||25),0);return Ct(e(n).task.groupHeader,{date:f,weekday:e(n).enum.weekday[g.getDay()],n:_})}function i(f){const h=new Set(e(o));h.has(f)?h.delete(f):h.add(f),v(o,h,!0)}const l=R(()=>{const f=new Map;for(const g of t.tasks){let _;t.groupBy==="completed_at"?g.completed_at?_=Vt(g.completed_at):_=r:_=g.due_date?Vt(g.due_date):r,f.has(_)||f.set(_,[]),f.get(_).push(g)}const h=Array.from(f.entries());return h.sort((g,_)=>g[0]===r?1:_[0]===r?-1:new Date(g[0]).getTime()-new Date(_[0]).getTime()),h});var u=dh();Me(u,21,()=>e(l),([f,h])=>f,(f,h)=>{var g=R(()=>Ei(e(h),2));let _=()=>e(g)[0],b=()=>e(g)[1];const k=R(()=>e(o).has(_()));var w=ch(),x=s(w),j=s(x),S=s(j),T=d(j,2),q=s(T);{var A=ee=>{qn(ee,{size:16})},O=ee=>{lr(ee,{size:16})};le(q,ee=>{e(k)?ee(A):ee(O,-1)})}var U=d(x,2);{var $=ee=>{var he=lh();Me(he,21,b,ne=>ne.id,(ne,te)=>{{let ue=R(()=>{var P;return((P=t.selectedTask)==null?void 0:P.id)===e(te).id});cc(ne,{get task(){return e(te)},get selected(){return e(ue)},get onToggle(){return t.onToggle},get onSelect(){return t.onSelect},get onStart(){return t.onStart}})}}),m(ee,he)};le(U,ee=>{e(k)||ee($)})}M(ee=>{z(x,"aria-expanded",!e(k)),p(S,ee)},[()=>_()===r?e(n).task.unscheduled:c(_(),b())]),J("click",x,()=>i(_())),m(f,w)}),m(a,u),gt()}St(["click"]);var vh=E('<span class="unit svelte-1i37zgo"> </span>'),fh=E('<div><div class="icon-block svelte-1i37zgo"><!></div> <div class="value svelte-1i37zgo"> <!></div> <div class="label svelte-1i37zgo"> </div></div>');function Wt(a,t){var n=fh();let r;var o=s(n),c=s(o);xr(c,()=>t.icon,(_,b)=>{b(_,{size:18,strokeWidth:1.8})});var i=d(o,2),l=s(i),u=d(l);{var f=_=>{var b=vh(),k=s(b);M(()=>p(k,t.unit)),m(_,b)};le(u,_=>{t.unit&&_(f)})}var h=d(i,2),g=s(h);M(()=>{r=Ke(n,1,"stat-card svelte-1i37zgo",null,r,{accent:t.accent}),p(l,t.value),p(g,t.label)}),m(a,n)}var pi=E("<option> </option>"),hh=E('<button type="button" class="clear-btn svelte-1ko7jxa"> </button>'),_h=E('<button type="button" class="export-btn svelte-1ko7jxa"><!> </button>'),ph=E('<div class="filter-bar svelte-1ko7jxa"><div class="row-1 svelte-1ko7jxa"><select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><!></select> <select class="select svelte-1ko7jxa"><option> </option><option> </option><option> </option><option> </option><option> </option></select> <button type="button"> </button> <button type="button"> </button> <!></div> <div class="row-2 svelte-1ko7jxa"><span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <span class="hint svelte-1ko7jxa"> </span> <input type="date" class="date svelte-1ko7jxa"/> <!></div></div>');function gi(a,t){pt(t,!0);const n=R(bt),r=R(()=>t.filterProject!==null||t.filterTag!==null||t.filterPriority!==null||t.filterPreset!==null||t.filterStartDate!==""||t.filterEndDate!=="");function o(){t.setFilterProject(null),t.setFilterTag(null),t.setFilterPriority(null),t.setFilterPreset(null),t.setFilterStartDate(""),t.setFilterEndDate("")}var c=ph(),i=s(c),l=s(i),u=s(l),f=s(u);u.value=u.__value="";var h=d(u);Me(h,17,()=>t.projects,L=>L.id,(L,oe)=>{var ie=pi(),me=s(ie),De={};M(()=>{p(me,e(oe).name),De!==(De=e(oe).id)&&(ie.value=(ie.__value=e(oe).id)??"")}),m(L,ie)});var g;qt(l);var _=d(l,2),b=s(_),k=s(b);b.value=b.__value="";var w=d(b);Me(w,17,()=>t.tags,L=>L.id,(L,oe)=>{var ie=pi(),me=s(ie),De={};M(()=>{p(me,e(oe).name),De!==(De=e(oe).id)&&(ie.value=(ie.__value=e(oe).id)??"")}),m(L,ie)});var x;qt(_);var j=d(_,2),S=s(j),T=s(S);S.value=S.__value="";var q=d(S),A=s(q);q.value=q.__value="high";var O=d(q),U=s(O);O.value=O.__value="medium";var $=d(O),ee=s($);$.value=$.__value="low";var he=d($),ne=s(he);he.value=he.__value="none";var te;qt(j);var ue=d(j,2);let P;var G=s(ue),de=d(ue,2);let be;var ge=s(de),Te=d(de,2);{var Fe=L=>{var oe=hh(),ie=s(oe);M(()=>p(ie,e(n).timer.clearFilter)),J("click",oe,o),m(L,oe)};le(Te,L=>{e(r)&&L(Fe)})}var et=d(i,2),I=s(et),C=s(I),N=d(I,2),B=d(N,2),ce=s(B),_e=d(B,2),re=d(_e,2);{var ve=L=>{var oe=_h(),ie=s(oe);_u(ie,{size:14});var me=d(ie);M(()=>p(me,` ${e(n).filter.export??""}`)),J("click",oe,function(...De){var je;(je=t.onExport)==null||je.apply(this,De)}),m(L,oe)};le(re,L=>{t.onExport&&L(ve)})}M((L,oe)=>{z(l,"title",L),z(l,"aria-label",e(n).filter.projectAria),p(f,e(n).filter.allProject),g!==(g=t.filterProject??"")&&(l.value=(l.__value=t.filterProject??"")??"",Nt(l,t.filterProject??"")),z(_,"title",oe),z(_,"aria-label",e(n).filter.tagAria),p(k,e(n).filter.allTag),x!==(x=t.filterTag??"")&&(_.value=(_.__value=t.filterTag??"")??"",Nt(_,t.filterTag??"")),z(j,"aria-label",e(n).filter.priorityAria),p(T,e(n).filter.allPriority),p(A,e(n).priority.high),p(U,e(n).priority.medium),p(ee,e(n).priority.low),p(ne,e(n).priority.none),te!==(te=t.filterPriority??"")&&(j.value=(j.__value=t.filterPriority??"")??"",Nt(j,t.filterPriority??"")),P=Ke(ue,1,"preset-btn svelte-1ko7jxa",null,P,{on:t.filterPreset==="week"}),p(G,e(n).filter.week),be=Ke(de,1,"preset-btn svelte-1ko7jxa",null,be,{on:t.filterPreset==="month"}),p(ge,e(n).filter.month),p(C,e(n).filter.dueDate),Vo(N,t.filterStartDate),z(N,"aria-label",e(n).filter.startDate),p(ce,e(n).filter.to),Vo(_e,t.filterEndDate),z(_e,"aria-label",e(n).filter.endDate)},[()=>{var L;return t.filterProject!==null?(L=t.projects.find(oe=>oe.id===t.filterProject))==null?void 0:L.name:e(n).filter.allProject},()=>{var L;return t.filterTag!==null?(L=t.tags.find(oe=>oe.id===t.filterTag))==null?void 0:L.name:e(n).filter.allTag}]),J("change",l,L=>{const oe=L.currentTarget.value;t.setFilterProject(oe||null)}),J("change",_,L=>{const oe=L.currentTarget.value;t.setFilterTag(oe||null)}),J("change",j,L=>{const oe=L.currentTarget.value;t.setFilterPriority(oe||null)}),J("click",ue,()=>t.setFilterPreset(t.filterPreset==="week"?null:"week")),J("click",de,()=>t.setFilterPreset(t.filterPreset==="month"?null:"month")),J("change",N,L=>t.setFilterStartDate(L.currentTarget.value)),J("change",_e,L=>t.setFilterEndDate(L.currentTarget.value)),m(a,c),gt()}St(["change","click"]);var mi=E('<button type="button"> </button>'),gh=E('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="weekdays svelte-1h3pyjl"></div></div>'),mh=E('<div class="field svelte-1h3pyjl"><span class="lbl-blk svelte-1h3pyjl"> </span> <div class="month-grid svelte-1h3pyjl"></div></div>'),bh=E('<div class="warn svelte-1h3pyjl"> </div>'),yh=E('<div class="backdrop svelte-1h3pyjl" role="dialog" aria-modal="true" tabindex="-1"><div class="dialog svelte-1h3pyjl"><div class="header svelte-1h3pyjl"><h3 class="svelte-1h3pyjl"> </h3> <button type="button" class="close-btn svelte-1h3pyjl"><!></button></div> <div class="body svelte-1h3pyjl"><div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-start" class="svelte-1h3pyjl"> </label> <input id="rc-start" type="datetime-local" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-end" class="svelte-1h3pyjl"> </label> <input id="rc-end" type="datetime-local" class="input svelte-1h3pyjl"/></div></div> <div class="row svelte-1h3pyjl"><div class="field svelte-1h3pyjl"><label for="rc-interval" class="svelte-1h3pyjl"> </label> <input id="rc-interval" type="number" min="0" max="99" class="input svelte-1h3pyjl"/></div> <div class="field svelte-1h3pyjl"><label for="rc-type" class="svelte-1h3pyjl"> </label> <select id="rc-type" class="input svelte-1h3pyjl"><option> </option><option> </option><option> </option><option> </option></select></div></div> <!> <!> <!></div> <div class="footer svelte-1h3pyjl"><button type="button" class="btn-cancel svelte-1h3pyjl"> </button> <button type="button" class="btn-confirm svelte-1h3pyjl"> </button></div></div></div>');function kh(a,t){pt(t,!0);const n=R(bt);function r(){const T=new Date,q=A=>String(A).padStart(2,"0");return`${T.getFullYear()}-${q(T.getMonth()+1)}-${q(T.getDate())}T${q(T.getHours())}:${q(T.getMinutes())}`}function o(){return`${new Date().getFullYear()}-12-31T23:59`}let c=H(Oe(r())),i=H(Oe(o())),l=H(1),u=H("week"),f=H(Oe([])),h=H(Oe([]));Pt(()=>{if(t.open&&t.initialConfig)try{const T=JSON.parse(t.initialConfig);v(c,T.startDate||r(),!0),v(i,T.endDate||o(),!0),v(l,T.interval||1,!0),v(u,T.type||"week",!0),v(f,T.weekdays||[],!0),v(h,T.monthDays||[],!0)}catch{}});function g(T,q,A){A(T.includes(q)?T.filter(O=>O!==q):[...T,q].sort((O,U)=>O-U))}function _(){const T={interval:e(l),type:e(u),startDate:e(c),endDate:e(i)};e(u)==="week"&&(T.weekdays=e(f)),e(u)==="month"&&(T.monthDays=e(h)),t.onConfirm(JSON.stringify(T))}let b=R(()=>e(u)==="week"&&e(f).length===0||e(u)==="month"&&e(h).length===0);function k(T){T.target===T.currentTarget&&t.onClose()}function w(T){T.key==="Escape"&&t.onClose()}var x=ze(),j=Ne(x);{var S=T=>{var q=yh(),A=s(q),O=s(A),U=s(O),$=s(U),ee=d(U,2),he=s(ee);Fl(he,{size:18});var ne=d(O,2),te=s(ne),ue=s(te),P=s(ue),G=s(P),de=d(P,2),be=d(ue,2),ge=s(be),Te=s(ge),Fe=d(ge,2),et=d(te,2),I=s(et),C=s(I),N=s(C),B=d(C,2),ce=d(I,2),_e=s(ce),re=s(_e),ve=d(_e,2),L=s(ve),oe=s(L);L.value=L.__value="day";var ie=d(L),me=s(ie);ie.value=ie.__value="week";var De=d(ie),je=s(De);De.value=De.__value="month";var Re=d(De),Y=s(Re);Re.value=Re.__value="year";var fe=d(et,2);{var ke=Se=>{var Ue=gh(),ht=s(Ue),dt=s(ht),ut=d(ht,2);Me(ut,21,()=>e(n).settings.repeatCustom.weekShort,La,(We,Be,ye)=>{const pe=R(()=>ye+1),Ye=R(()=>e(f).includes(e(pe)));var Qe=mi();let mt;var Ge=s(Qe);M(()=>{mt=Ke(Qe,1,"weekday-btn svelte-1h3pyjl",null,mt,{active:e(Ye)}),p(Ge,e(Be))}),J("click",Qe,()=>g(e(f),e(pe),Tt=>v(f,Tt,!0))),m(We,Qe)}),M(()=>p(dt,e(n).settings.repeatCustom.weekdays)),m(Se,Ue)};le(fe,Se=>{e(u)==="week"&&Se(ke)})}var Q=d(fe,2);{var y=Se=>{var Ue=mh(),ht=s(Ue),dt=s(ht),ut=d(ht,2);Me(ut,20,()=>Array.from({length:31},(We,Be)=>Be+1),La,(We,Be)=>{const ye=R(()=>e(h).includes(Be));var pe=mi();let Ye;var Qe=s(pe);M(()=>{Ye=Ke(pe,1,"month-btn svelte-1h3pyjl",null,Ye,{active:e(ye)}),p(Qe,Be)}),J("click",pe,()=>g(e(h),Be,mt=>v(h,mt,!0))),m(We,pe)}),M(()=>p(dt,e(n).settings.repeatCustom.monthDays)),m(Se,Ue)};le(Q,Se=>{e(u)==="month"&&Se(y)})}var D=d(Q,2);{var K=Se=>{var Ue=bh(),ht=s(Ue);M(()=>p(ht,e(u)==="week"?e(n).settings.repeatCustom.needPickWeek:e(n).settings.repeatCustom.needPickDay)),m(Se,Ue)};le(D,Se=>{e(b)&&Se(K)})}var V=d(ne,2),W=s(V),Z=s(W),X=d(W,2),Pe=s(X);M(()=>{p($,e(n).settings.repeatCustom.title),z(ee,"aria-label",e(n).common.close),p(G,e(n).settings.repeatCustom.startDate),p(Te,e(n).settings.repeatCustom.endDate),p(N,e(n).settings.repeatCustom.interval),p(re,e(n).settings.repeatCustom.type),p(oe,e(n).settings.repeatCustom.typeDay),p(me,e(n).settings.repeatCustom.typeWeek),p(je,e(n).settings.repeatCustom.typeMonth),p(Y,e(n).settings.repeatCustom.typeYear),p(Z,e(n).settings.repeatCustom.cancel),X.disabled=e(b),p(Pe,e(n).settings.repeatCustom.confirm)}),J("click",q,k),J("keydown",q,w),J("click",ee,function(...Se){var Ue;(Ue=t.onClose)==null||Ue.apply(this,Se)}),wt(de,()=>e(c),Se=>v(c,Se)),wt(Fe,()=>e(i),Se=>v(i,Se)),wt(B,()=>e(l),Se=>v(l,Se)),Wr(ve,()=>e(u),Se=>v(u,Se)),J("click",W,function(...Se){var Ue;(Ue=t.onClose)==null||Ue.apply(this,Se)}),J("click",X,_),m(T,q)};le(j,T=>{t.open&&T(S)})}m(a,x),gt()}St(["click","keydown"]);var wh=E('<button type="button"><!></button>'),xh=E('<div class="error svelte-1vpobhk"> </div>'),Eo=E("<option> </option>"),Sh=E('<button type="button"> </button>'),Th=E('<div class="field full svelte-1vpobhk"><span class="lbl-blk svelte-1vpobhk"> </span> <div class="tag-chips svelte-1vpobhk"></div></div>'),Dh=E('<div class="details svelte-1vpobhk"><div class="field svelte-1vpobhk"><label for="tf-proj" class="svelte-1vpobhk"> </label> <select id="tf-proj" class="svelte-1vpobhk"><option> </option><!></select></div> <div class="field svelte-1vpobhk"><label for="tf-pri" class="svelte-1vpobhk"> </label> <select id="tf-pri" class="svelte-1vpobhk"><option> </option><option> </option><option> </option><option> </option></select></div> <div class="field svelte-1vpobhk"><label for="tf-due" class="svelte-1vpobhk"> </label> <input id="tf-due" type="datetime-local" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-est" class="svelte-1vpobhk"> </label> <input id="tf-est" type="number" min="1" max="20" class="svelte-1vpobhk"/></div> <div class="field svelte-1vpobhk"><label for="tf-remind" class="svelte-1vpobhk"> </label> <select id="tf-remind" class="svelte-1vpobhk"></select></div> <div class="field svelte-1vpobhk"><label for="tf-repeat" class="svelte-1vpobhk"> </label> <select id="tf-repeat" class="svelte-1vpobhk"></select></div> <!> <div class="actions svelte-1vpobhk"><button type="button" class="submit-btn svelte-1vpobhk"> </button></div></div>'),Ph=E('<form class="task-form svelte-1vpobhk"><div class="row-top svelte-1vpobhk"><!> <input type="text" class="title-input svelte-1vpobhk"/> <div class="tomatoes svelte-1vpobhk" role="group"></div> <button type="button" class="more-btn svelte-1vpobhk"> </button></div> <!> <!> <!></form>');function Mh(a,t){pt(t,!0);const n=R(bt),r=[{value:"none"},{value:"on_time"},{value:"minutes5"},{value:"minutes30"},{value:"hour1"},{value:"day1"},{value:"days2"}],o=[{value:"none"},{value:"daily"},{value:"weekdays"},{value:"weekly"},{value:"monthly"},{value:"yearly"},{value:"custom"}],c={none:"",on_time:"on_time",minutes5:"5m",minutes30:"30m",hour1:"1h",day1:"1d",days2:"2d"},i={none:"",daily:"daily",weekdays:"weekday",weekly:"weekly",monthly:"monthly",yearly:"yearly",custom:"custom"};function l(C){return e(n).enum.reminder[c[C]]}function u(C){return e(n).enum.repeat[i[C]]}let f=R(en),h=H(""),g=H(Oe(Kt(()=>t.defaultProjectId??null))),_=H("medium"),b=H(Oe(Kt(()=>t.defaultDueDate||Ca()))),k=H(0),w=H("none"),x=H("none"),j=H(null),S=H(!1),T=H(Oe(Kt(()=>t.tags.length>0?[t.tags[0].id]:[]))),q=H(!1),A=H(""),O=H(!1);Pt(()=>{v(g,t.defaultProjectId??null,!0)}),Pt(()=>{v(b,t.defaultDueDate||Ca(),!0)}),Pt(()=>{t.tags.length>0&&e(T).length===0&&v(T,[t.tags[0].id],!0)});function U(){const C=new Map;for(const _e of t.projects)C.set(_e.id,{..._e,children:[]});const N=[];for(const _e of t.projects)_e.parent_id&&C.has(_e.parent_id)?C.get(_e.parent_id).children.push(_e.id):N.push(_e.id);const B=[],ce=(_e,re)=>{const ve=C.get(_e),L=ve.children.length>0;B.push({id:ve.id,name:ve.name,depth:re,disabled:L});for(const oe of ve.children)ce(oe,re+1)};for(const _e of N)ce(_e,0);return B}async function $(){const C=e(h).trim();if(!C){v(A,e(n).form.needTitle,!0);return}let N=e(b)||Ca();if(e(w)!=="none"&&!es(N)){if(!e(O)){v(O,!0),v(A,e(n).form.needTimeForReminder,!0);return}N=fi(N)}v(O,!1),v(A,"");try{await t.onAdd({title:C,project_id:e(g),priority:e(_),due_date:N,estimated_pomodoros:e(k)>0?e(k):1,pomodoro_duration:e(f).focusDuration,reminder:e(w)==="none"?null:e(w),repeat:e(x)==="none"?null:e(x),repeat_config:e(x)==="custom"?e(j):null,tag_ids:e(T)}),v(h,""),v(g,t.defaultProjectId??null,!0),v(_,"medium"),v(b,t.defaultDueDate||Ca(),!0),v(k,0),v(w,"none"),v(O,!1),v(x,"none"),v(j,null),v(T,t.tags.length>0?[t.tags[0].id]:[],!0),v(q,!1)}catch(B){v(A,String(B),!0)}}function ee(C){C.preventDefault(),$()}function he(){e(q)||es(e(b))||v(b,fi(e(b)),!0),v(q,!e(q))}var ne=Ph(),te=s(ne),ue=s(te);Ln(ue,{size:16,class:"plus-icon"});var P=d(ue,2),G=d(P,2);Me(G,20,()=>Array.from({length:6},(C,N)=>N+1),La,(C,N)=>{const B=R(()=>e(k)>=N);var ce=wh();let _e;var re=s(ce);ic(re,{size:14,get filled(){return e(B)}}),M(()=>{_e=Ke(ce,1,"tomato-btn svelte-1vpobhk",null,_e,{filled:e(B)}),z(ce,"aria-label",`${N} ${e(n).form.pomodoroUnit}`),z(ce,"aria-pressed",e(B))}),J("click",ce,()=>v(k,N,!0)),m(C,ce)});var de=d(G,2),be=s(de),ge=d(te,2);{var Te=C=>{var N=xh(),B=s(N);M(()=>p(B,e(A))),m(C,N)};le(ge,C=>{e(A)&&C(Te)})}var Fe=d(ge,2);{var et=C=>{var N=Dh(),B=s(N),ce=s(B),_e=s(ce),re=d(ce,2),ve=s(re),L=s(ve);ve.value=ve.__value="";var oe=d(ve);Me(oe,17,U,He=>He.id,(He,it)=>{var yt=Eo(),Le=s(yt),Xe={};M(qe=>{yt.disabled=e(it).disabled,p(Le,`${qe??""}${e(it).name??""}`),Xe!==(Xe=e(it).id)&&(yt.value=(yt.__value=e(it).id)??"")},[()=>"　".repeat(e(it).depth)]),m(He,yt)});var ie;qt(re);var me=d(B,2),De=s(me),je=s(De),Re=d(De,2),Y=s(Re),fe=s(Y);Y.value=Y.__value="high";var ke=d(Y),Q=s(ke);ke.value=ke.__value="medium";var y=d(ke),D=s(y);y.value=y.__value="low";var K=d(y),V=s(K);K.value=K.__value="none";var W;qt(Re);var Z=d(me,2),X=s(Z),Pe=s(X),Se=d(X,2),Ue=d(Z,2),ht=s(Ue),dt=s(ht),ut=d(ht,2),We=d(Ue,2),Be=s(We),ye=s(Be),pe=d(Be,2);Me(pe,21,()=>r,He=>He.value,(He,it)=>{var yt=Eo(),Le=s(yt),Xe={};M(qe=>{p(Le,qe),Xe!==(Xe=e(it).value)&&(yt.value=(yt.__value=e(it).value)??"")},[()=>l(e(it).value)]),m(He,yt)});var Ye=d(We,2),Qe=s(Ye),mt=s(Qe),Ge=d(Qe,2);Me(Ge,21,()=>o,He=>He.value,(He,it)=>{var yt=Eo(),Le=s(yt),Xe={};M(qe=>{p(Le,qe),Xe!==(Xe=e(it).value)&&(yt.value=(yt.__value=e(it).value)??"")},[()=>u(e(it).value)]),m(He,yt)});var Tt=d(Ye,2);{var Ft=He=>{var it=Th(),yt=s(it),Le=s(yt),Xe=d(yt,2);Me(Xe,21,()=>t.tags,qe=>qe.id,(qe,lt)=>{const se=R(()=>e(T).includes(e(lt).id));var we=Sh();let Ae;var Ve=s(we);M(()=>{Ae=Ke(we,1,"chip svelte-1vpobhk",null,Ae,{on:e(se)}),z(we,"aria-pressed",e(se)),p(Ve,e(lt).name)}),J("click",we,()=>v(T,e(se)?e(T).filter(Dt=>Dt!==e(lt).id):[...e(T),e(lt).id],!0)),m(qe,we)}),M(()=>p(Le,e(n).filter.tag)),m(He,it)};le(Tt,He=>{t.tags.length>0&&He(Ft)})}var Bt=d(Tt,2),zt=s(Bt),At=s(zt);M(()=>{p(_e,e(n).filter.project),p(L,e(n).task.detailNoProject),ie!==(ie=e(g)??"")&&(re.value=(re.__value=e(g)??"")??"",Nt(re,e(g)??"")),p(je,e(n).filter.priority),p(fe,e(n).priority.high),p(Q,e(n).priority.medium),p(D,e(n).priority.low),p(V,e(n).priority.none),W!==(W=e(_))&&(Re.value=(Re.__value=e(_))??"",Nt(Re,e(_))),p(Pe,e(n).filter.dueDate),p(dt,e(n).form.estimatedPomo),p(ye,e(n).task.detailReminder),p(mt,e(n).task.detailRepeat),p(At,e(n).form.submit)}),J("change",re,He=>{const it=He.currentTarget.value;v(g,it||null,!0)}),J("change",Re,He=>{v(_,He.currentTarget.value,!0)}),kt("blur",Se,He=>{He.currentTarget.value.length===16&&He.currentTarget.blur()}),wt(Se,()=>e(b),He=>v(b,He)),wt(ut,()=>e(k),He=>v(k,He)),J("change",pe,()=>v(O,!1)),Wr(pe,()=>e(w),He=>v(w,He)),J("change",Ge,He=>{He.currentTarget.value==="custom"?v(S,!0):v(j,null)}),Wr(Ge,()=>e(x),He=>v(x,He)),J("click",zt,$),m(C,N)};le(Fe,C=>{e(q)&&C(et)})}var I=d(Fe,2);kh(I,{get open(){return e(S)},get initialConfig(){return e(j)},onConfirm:C=>{v(j,C,!0),v(S,!1)},onClose:()=>v(S,!1)}),M(()=>{z(P,"placeholder",e(n).form.titlePlaceholder),z(G,"aria-label",e(n).form.pomodoroIcons),p(be,e(q)?e(n).form.collapse:e(n).form.more)}),kt("submit",ne,ee),wt(P,()=>e(h),C=>v(h,C)),J("click",de,he),m(a,ne),gt()}St(["click","change"]);var Eh=E('<button type="button"><!></button>');function Ch(a,t){pt(t,!0);const n=R(bt);var r=Eh();let o;var c=s(r);{var i=l=>{on(l,{size:10,strokeWidth:3,color:"#fff"})};le(c,l=>{t.completed&&l(i)})}M(()=>{o=Ke(r,1,"checkbox svelte-1bxwwxl",null,o,{completed:t.completed}),z(r,"aria-label",t.completed?e(n).common.ariaCompleted:e(n).common.ariaMarkDone)}),J("click",r,l=>{l.stopPropagation(),t.onToggle()}),m(a,r),gt()}St(["click"]);var bi=E("<option> </option>"),jh=E('<div class="no-task svelte-tr144z"> </div>'),Nh=E('<div class="task-row svelte-tr144z"><!> <span> </span></div>'),Fh=E('<div class="day-cell svelte-tr144z"><div> </div> <!> <div class="day-divider svelte-tr144z"></div> <!></div>'),Ah=E('<section class="week-card svelte-tr144z"><div class="week-title svelte-tr144z"> </div> <div class="day-grid svelte-tr144z"></div> <div class="weekly-block svelte-tr144z"><div class="weekly-label svelte-tr144z"> </div> <!></div></section>'),Ih=E('<div class="journal svelte-tr144z"><div class="inner svelte-tr144z"><div class="head svelte-tr144z"><h1 class="title svelte-tr144z"> </h1> <div class="month-nav svelte-tr144z"><button type="button" class="nav-btn svelte-tr144z"><!></button> <select class="select svelte-tr144z"></select> <select class="select svelte-tr144z"></select> <button type="button" class="nav-btn svelte-tr144z"><!></button></div></div> <div class="weeks svelte-tr144z"></div></div></div>');function Rh(a,t){pt(t,!0);const n=R(bt),r=Array.from({length:61},(I,C)=>2026+C),o=Array.from({length:12},(I,C)=>C+1);let c=H(Oe([])),i=H(Oe([]));function l(I){return String(I).padStart(2,"0")}function u(I){return`${I.getFullYear()}-${l(I.getMonth()+1)}-${l(I.getDate())}`}function f(I,C){const N=[],B=new Date(I,C-1,1);for(;B.getDay()!==1;)B.setDate(B.getDate()+1);for(;B.getMonth()===C-1;)N.push(new Date(B)),B.setDate(B.getDate()+7);return N}async function h(I,C){const N=u(new Date(I,C-1,1)),B=u(new Date(I,C,0));try{const[ce,_e]=await Promise.all([Vl(I,C),Zu(N,B)]);if(I!==t.year||C!==t.month)return;v(c,ce,!0),v(i,_e,!0)}catch(ce){console.warn("journal load reviews failed",ce)}}Pt(()=>{const I=t.year,C=t.month;h(I,C)});const g=R(()=>{const I=e(n).journal.weekday;return f(t.year,t.month).map((C,N)=>{const B=Array.from({length:7},(re,ve)=>{const L=new Date(C);return L.setDate(L.getDate()+ve),L}),ce=B[6],_e=B.map((re,ve)=>({iso:u(re),label:`${I[ve]} ${re.getMonth()+1}/${re.getDate()}`}));return{startISO:u(C),title:Ct(e(n).journal.weekRange,{n:N+1,ms:C.getMonth()+1,ds:C.getDate(),me:ce.getMonth()+1,de:ce.getDate()}),days:_e}})});function _(I){return I===u(new Date)}const b=R(()=>{const I=new Map;for(const C of t.tasks){const N=Vt(C.due_date);N&&(I.has(N)||I.set(N,[]),I.get(N).push(C))}return I}),k=R(()=>new Map(e(c).map(I=>[I.week_start,I]))),w=R(()=>new Map(e(i).map(I=>[I.date,I])));function x(){t.month===1?(t.onMonthChange(12),t.onYearChange(t.year-1)):t.onMonthChange(t.month-1)}function j(){t.month===12?(t.onMonthChange(1),t.onYearChange(t.year+1)):t.onMonthChange(t.month+1)}async function S(I){var C;try{I.status==="active"?await Hl(I.id):await Ul(I.id),(C=t.onTasksChange)==null||C.call(t)}catch(N){console.warn("journal toggle task failed",N)}}async function T(I,C){try{const N=e(w).get(I),B=N?{...N,content:C}:{id:crypto.randomUUID(),date:I,content:C,updated_at:new Date().toISOString()};await Gl(B),await h(t.year,t.month)}catch(N){console.warn("journal save daily review failed",N)}}async function q(I){try{await Kl(I),await h(t.year,t.month)}catch(C){console.warn("journal delete daily review failed",C)}}async function A(I,C){var N;try{const B=e(k).get(I),ce=B?{...B,content:C}:{id:crypto.randomUUID(),week_start:I,content:C,updated_at:new Date().toISOString()};await $u(ce),await h(t.year,t.month),(N=t.onReviewChange)==null||N.call(t)}catch(B){console.warn("journal save weekly review failed",B)}}async function O(I){var C;try{await ev(I),await h(t.year,t.month),(C=t.onReviewChange)==null||C.call(t)}catch(N){console.warn("journal delete weekly review failed",N)}}var U=Ih(),$=s(U),ee=s($),he=s(ee),ne=s(he),te=d(he,2),ue=s(te),P=s(ue);hu(P,{size:16});var G=d(ue,2);Me(G,20,()=>r,I=>I,(I,C)=>{var N=bi(),B=s(N),ce={};M(_e=>{p(B,_e),ce!==(ce=C)&&(N.value=(N.__value=C)??"")},[()=>Ct(e(n).journal.yearOption,{year:C})]),m(I,N)});var de;qt(G);var be=d(G,2);Me(be,20,()=>o,I=>I,(I,C)=>{var N=bi(),B=s(N),ce={};M(_e=>{p(B,_e),ce!==(ce=C)&&(N.value=(N.__value=C)??"")},[()=>Ct(e(n).journal.monthOption,{month:C})]),m(I,N)});var ge;qt(be);var Te=d(be,2),Fe=s(Te);qn(Fe,{size:16});var et=d(ee,2);Me(et,21,()=>e(g),I=>I.startISO,(I,C)=>{var N=Ah(),B=s(N),ce=s(B),_e=d(B,2);Me(_e,21,()=>e(C).days,ie=>ie.iso,(ie,me)=>{var De=Fh(),je=s(De);let Re;var Y=s(je),fe=d(je,2);{var ke=K=>{var V=jh(),W=s(V);M(()=>p(W,e(n).common.noData)),m(K,V)},Q=R(()=>(e(b).get(e(me).iso)??[]).length===0),y=K=>{var V=ze(),W=Ne(V);Me(W,17,()=>e(b).get(e(me).iso)??[],Z=>Z.id,(Z,X,Pe,Se)=>{var Ue=Nh(),ht=s(Ue);{let Be=R(()=>e(X).status==="completed");Ch(ht,{get completed(){return e(Be)},onToggle:()=>S(e(X))})}var dt=d(ht,2);let ut;var We=s(dt);M(()=>{ut=Ke(dt,1,"task-title svelte-tr144z",null,ut,{done:e(X).status==="completed"}),p(We,e(X).title)}),m(Z,Ue)}),m(K,V)};le(fe,K=>{e(Q)?K(ke):K(y,-1)})}var D=d(fe,4);{let K=R(()=>{var V;return((V=e(w).get(e(me).iso))==null?void 0:V.content)??null});Vr(D,{get value(){return e(K)},get placeholder(){return e(n).journal.dailyReviewPlaceholder},rows:2,onSave:V=>T(e(me).iso,V),onDelete:()=>q(e(me).iso)})}M(K=>{Re=Ke(je,1,"day-head svelte-tr144z",null,Re,K),p(Y,e(me).label)},[()=>({today:_(e(me).iso)})]),m(ie,De)});var re=d(_e,2),ve=s(re),L=s(ve),oe=d(ve,2);{let ie=R(()=>{var me;return((me=e(k).get(e(C).startISO))==null?void 0:me.content)??null});Vr(oe,{get value(){return e(ie)},get placeholder(){return e(n).journal.weeklyReviewPlaceholder},rows:5,onSave:me=>A(e(C).startISO,me),onDelete:()=>O(e(C).startISO)})}M(()=>{p(ce,e(C).title),p(L,e(n).journal.weeklyReview)}),m(I,N)}),M(I=>{p(ne,I),z(ue,"title",e(n).journal.prevMonth),z(ue,"aria-label",e(n).journal.prevMonth),z(G,"aria-label",e(n).journal.yearAria),de!==(de=t.year)&&(G.value=(G.__value=t.year)??"",Nt(G,t.year)),z(be,"aria-label",e(n).journal.monthAria),ge!==(ge=t.month)&&(be.value=(be.__value=t.month)??"",Nt(be,t.month)),z(Te,"title",e(n).journal.nextMonth),z(Te,"aria-label",e(n).journal.nextMonth)},[()=>Ct(e(n).journal.monthTitle,{year:t.year,month:t.month})]),J("click",ue,x),J("change",G,I=>t.onYearChange(Number(I.currentTarget.value))),J("change",be,I=>t.onMonthChange(Number(I.currentTarget.value))),J("click",Te,j),m(a,U),gt()}St(["click","change"]);var qh=E('<div class="empty svelte-w363gh"> </div>'),Lh=E('<div class="week-card svelte-w363gh"><div class="week-head svelte-w363gh"> </div> <div class="week-content svelte-w363gh"> </div></div>'),Oh=E('<div class="week-list svelte-w363gh"></div>'),Bh=E('<aside class="panel svelte-w363gh"><h2 class="title svelte-w363gh"> </h2> <div class="weekly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div> <div class="monthly-block svelte-w363gh"><div class="label svelte-w363gh"> </div> <!></div></aside>');function zh(a,t){pt(t,!0);const n=R(bt);let r=H(Oe([])),o=H(null);function c(U){return String(U).padStart(2,"0")}async function i(U,$){try{const[ee,he]=await Promise.all([Vl(U,$),tv(`${U}-${c($)}`)]);if(U!==t.year||$!==t.month)return;v(r,ee,!0),v(o,he,!0)}catch(ee){console.warn("month panel load failed",ee)}}Pt(()=>{const U=t.year,$=t.month;t.reviewVersion,i(U,$)});const l=R(()=>[...e(r)].sort((U,$)=>U.week_start.localeCompare($.week_start)));async function u(U){try{const $=`${t.year}-${c(t.month)}`,ee=e(o)?{...e(o),content:U}:{id:crypto.randomUUID(),year_month:$,content:U,updated_at:new Date().toISOString()};await av(ee),await i(t.year,t.month)}catch($){console.warn("month panel save failed",$)}}async function f(){try{await nv(`${t.year}-${c(t.month)}`),await i(t.year,t.month)}catch(U){console.warn("month panel delete failed",U)}}var h=Bh(),g=s(h),_=s(g),b=d(g,2),k=s(b),w=s(k),x=d(k,2);{var j=U=>{var $=qh(),ee=s($);M(()=>p(ee,e(n).monthPanel.noWeekly)),m(U,$)},S=U=>{var $=Oh();Me($,23,()=>e(l),ee=>ee.week_start,(ee,he,ne)=>{var te=Lh(),ue=s(te),P=s(ue),G=d(ue,2),de=s(G);M((be,ge)=>{p(P,be),p(de,ge)},[()=>Ct(e(n).monthPanel.weekRange,{n:e(ne)+1,date:e(he).week_start}),()=>{var be;return(be=e(he).content)!=null&&be.trim()?e(he).content:e(n).monthPanel.empty}]),m(ee,te)}),m(U,$)};le(x,U=>{e(l).length===0?U(j):U(S,-1)})}var T=d(b,2),q=s(T),A=s(q),O=d(q,2);{let U=R(()=>{var $;return(($=e(o))==null?void 0:$.content)??null});Vr(O,{get value(){return e(U)},get placeholder(){return e(n).monthPanel.monthlyPlaceholder},rows:6,onSave:u,onDelete:f})}M((U,$)=>{z(h,"aria-label",U),p(_,$),p(w,e(n).monthPanel.weeklyReadonly),p(A,e(n).monthPanel.monthlyReview)},[()=>Ct(e(n).monthPanel.title,{year:t.year,month:t.month}),()=>Ct(e(n).monthPanel.title,{year:t.year,month:t.month})]),m(a,h),gt()}var Hh=E('<h1 class="title svelte-969q1d"> </h1>'),Uh=E('<div class="stats-3 svelte-969q1d"><!> <!> <!></div>'),Wh=E('<div class="stats-4 svelte-969q1d"><!> <!> <!> <!></div>'),Yh=E('<div class="error svelte-969q1d" role="alert"><span> </span> <button class="svelte-969q1d">×</button></div>'),Gh=E('<p class="loading svelte-969q1d"> </p>'),Kh=E('<p class="empty svelte-969q1d"><!></p>'),Vh=E('<div class="task-list svelte-969q1d"></div>'),Jh=E('<div class="inner svelte-969q1d"><!> <!> <!> <!> <!> <!></div>'),Qh=E('<div class="page svelte-969q1d"><!> <div class="main svelte-969q1d"><!></div> <!></div>');function Xh(a,t){pt(t,!0);let n=H(Oe([])),r=H(Oe([])),o=H(Oe([])),c=H(!0),i=H(null);const l=R(bt);let u=H(null),f=H("today"),h=H(""),g=H(null),_=H(Oe(new Date().getFullYear())),b=H(new Date().getMonth()+1),k=H(0),w=H(null),x=H(null),j=H(null),S=H(null),T=H(""),q=H(""),A=H(null),O=H(null),U=H(null),$=H(null),ee=H(""),he=H("");const ne=R(()=>{let Y=[...e(n)];const fe={high:0,medium:1,low:2,none:3};if(e(h).trim()){const Z=e(h).trim().toLowerCase();return Y=Y.filter(X=>X.title.toLowerCase().includes(Z)),Y.sort((X,Pe)=>{if(X.status!==Pe.status)return X.status==="active"?-1:1;const Se=fe[X.priority||"none"]??3,Ue=fe[Pe.priority||"none"]??3;return Se!==Ue?Se-Ue:new Date(X.created_at??0).getTime()-new Date(Pe.created_at??0).getTime()}),Y}const ke=Ca(),Q=qr(),y=new Date,D=y.getDay(),K=D===0?6:D-1,V=new Date(y);V.setDate(V.getDate()-K),V.setHours(0,0,0,0);const W=new Date(V);return W.setDate(W.getDate()+6),W.setHours(23,59,59,999),e(u)!==null?Y=Y.filter(Z=>Z.project_id===e(u)):e(f)==="today"?Y=Y.filter(Z=>Vt(Z.due_date)===ke):e(f)==="tomorrow"?Y=Y.filter(Z=>Vt(Z.due_date)===Q):e(f)==="week"?Y=Y.filter(Z=>{if(!Z.due_date)return!1;const X=new Date(Z.due_date);return X>=V&&X<=W}):e(f)==="planned"?Y=te(Y,{project:e(w),tag:e(x),priority:e(j),preset:e(S),startDate:e(T),endDate:e(q)}):e(f)==="completed"?(Y=Y.filter(Z=>Z.status==="completed"),Y=te(Y,{project:e(A),tag:e(O),priority:e(U),preset:e($),startDate:e(ee),endDate:e(he)})):e(f)==="journal"&&(Y=Y.filter(Z=>!!Z.due_date)),Y.sort((Z,X)=>{if(Z.status!==X.status)return Z.status==="active"?-1:1;const Pe=fe[Z.priority||"none"]??3,Se=fe[X.priority||"none"]??3;return Pe!==Se?Pe-Se:new Date(Z.created_at??0).getTime()-new Date(X.created_at??0).getTime()}),Y});function te(Y,fe){let ke=Y;if(fe.project!==null&&(ke=ke.filter(Q=>Q.project_id===fe.project)),fe.tag!==null&&(ke=ke.filter(Q=>(Q.tags??[]).some(y=>y.id===fe.tag))),fe.priority!==null&&(ke=ke.filter(Q=>Q.priority===fe.priority)),fe.preset==="week"){const Q=new Date,y=Q.getDay(),D=y===0?6:y-1,K=new Date(Q);K.setDate(Q.getDate()-D);const V=new Date(K);V.setDate(K.getDate()+6);const W=Vt(K.toISOString()),Z=Vt(V.toISOString());ke=ke.filter(X=>{const Pe=Vt(X.due_date);return!!Pe&&Pe>=W&&Pe<=Z})}if(fe.preset==="month"){const Q=new Date,y=`${Q.getFullYear()}-${String(Q.getMonth()+1).padStart(2,"0")}-01`,D=new Date(Q.getFullYear(),Q.getMonth()+1,0),K=Vt(D.toISOString());ke=ke.filter(V=>{const W=Vt(V.due_date);return!!W&&W>=y&&W<=K})}return fe.startDate&&(ke=ke.filter(Q=>{const y=Vt(Q.due_date);return!!y&&y>=fe.startDate})),fe.endDate&&(ke=ke.filter(Q=>{const y=Vt(Q.due_date);return!!y&&y<=fe.endDate})),ke}const ue=R(()=>{const Y=e(ne).filter(D=>D.status==="active").reduce((D,K)=>D+(K.estimated_pomodoros||0)*(K.pomodoro_duration||25),0),fe=e(ne).filter(D=>D.status==="active").length,ke=e(ne).reduce((D,K)=>D+(K.completed_pomodoros||0)*(K.pomodoro_duration||25),0),Q=e(ne).reduce((D,K)=>D+(K.completed_pomodoros||0),0),y=e(ne).filter(D=>D.status==="completed").length;return{estimatedMinutes:Y,activeCount:fe,focusedMinutes:ke,completedCount:y,completedPomodoros:Q}}),P=R(()=>{if(e(h).trim())return`${e(l).task.searchResult} (${e(ne).length})`;if(e(u)!==null){const fe=e(r).find(ke=>ke.id===e(u));return(fe==null?void 0:fe.name)||e(l).task.list}return{today:e(l).filter.today,tomorrow:e(l).filter.tomorrow,week:e(l).filter.week,planned:e(l).sidebar.planned,completed:e(l).sidebar.completed,journal:e(l).sidebar.journal,"":e(l).task.task}[e(f)]||e(l).task.task});async function G(){try{const[Y,fe,ke]=await Promise.all([yn({}),ys(),ks()]);if(v(n,Y.map(Q=>({...Q,tags:Q.tags??[]})),!0),v(r,fe,!0),v(o,ke,!0),e(g)){const Q=e(n).find(y=>y.id===e(g).id);v(g,Q??null,!0)}}catch(Y){v(i,String(Y),!0)}finally{v(c,!1)}}$a(G);function de(){return new Date().toISOString()}function be(){return crypto.randomUUID()}async function ge(Y){const fe=typeof Y=="string"?Y:Y.id,ke=typeof Y=="string"?e(n).find(Q=>Q.id===fe):Y;if(ke)try{ke.status==="active"?await Hl(fe):await Ul(fe),await G()}catch(Q){v(i,String(Q),!0)}}async function Te(Y,fe=null){try{await Yr({id:be(),name:Y,color:"#c97b6e",parent_id:fe??null,created_at:de(),updated_at:de()}),await G()}catch(ke){v(i,String(ke),!0)}}async function Fe(Y,fe){try{const ke=e(r).find(Q=>Q.id===Y);if(!ke)return;await Yr({...ke,name:fe,updated_at:de()}),await G()}catch(ke){v(i,String(ke),!0)}}async function et(Y){if(confirm(e(l).sidebar.deleteListConfirm))try{await Wl(Y),e(u)===Y&&v(u,null),await G()}catch(fe){v(i,String(fe),!0)}}function I(Y){v(g,Y,!0)}function C(){v(g,null)}function N(){G()}async function B(Y){try{await ec(Y),Il("/timer")}catch(fe){v(i,String(fe),!0)}}async function ce(Y){const fe=Y.due_date??(e(f)==="tomorrow"?qr():Ca());try{const ke=be();await Xo({id:ke,title:Y.title,description:"",project_id:Y.project_id??e(u),priority:Y.priority,status:"active",due_date:lc(es(fe)?fe:`${fe}T00:00:00`),estimated_pomodoros:Y.estimated_pomodoros,completed_pomodoros:0,pomodoro_duration:Y.pomodoro_duration,reminder:Y.reminder??"none",repeat:Y.repeat??"none",repeat_parent_id:null,repeat_end_date:null,repeat_config:Y.repeat_config??null,completed_at:null,created_at:de(),updated_at:de()},Y.tag_ids),await G()}catch(ke){v(i,String(ke),!0)}}async function _e(){try{const Y=await wf({defaultPath:`${e(l).export.fileName}_${Ca()}.xlsx`,filters:[{name:"xlsx",extensions:["xlsx"]}]});if(!Y)return;const fe=[e(l).export.index,e(l).export.title,e(l).export.project,e(l).export.priority,e(l).export.dueDate,e(l).export.estimated,e(l).export.tags,e(l).export.subtasks,e(l).export.status],ke=e(ne).map(Q=>{var y;return{title:Q.title,project:((y=e(r).find(D=>D.id===Q.project_id))==null?void 0:y.name)??"",priority:e(l).priority[Q.priority??"none"]??Q.priority??"",dueDate:Q.due_date?Q.due_date.slice(0,10):"",estimated:Q.estimated_pomodoros??0,tags:(Q.tags??[]).map(D=>D.name).join(", "),subtasks:(Q.subtasks??[]).map(D=>D.title).join(`
`),status:Q.status==="completed"?e(l).export.statusCompleted:e(l).export.statusActive}});await dv(Y,e(l).nav.tasks,fe,ke)}catch(Y){v(i,String(Y),!0)}}var re=Qh();Sr("969q1d",Y=>{kr(()=>{Un.title=e(l).page.tasks??""})});var ve=s(re);Bf(ve,{get projects(){return e(r)},get filter(){return e(f)},get selectedProject(){return e(u)},onSetFilter:Y=>{v(f,Y,!0),v(h,"")},onSelectProject:Y=>{v(u,Y,!0),v(h,"")},onCreateProject:Te,onUpdateProject:Fe,onDeleteProject:et,get search(){return e(h)},onSearchChange:Y=>{v(h,Y,!0),Y.trim()&&(v(u,null),v(f,""))},get tasks(){return e(n)}});var L=d(ve,2),oe=s(L);{var ie=Y=>{Rh(Y,{get year(){return e(_)},get month(){return e(b)},get tasks(){return e(ne)},onYearChange:fe=>v(_,fe,!0),onMonthChange:fe=>v(b,fe,!0),onReviewChange:()=>v(k,e(k)+1),onTasksChange:()=>void G()})},me=Y=>{var fe=Jh(),ke=s(fe);{var Q=ye=>{var pe=Hh(),Ye=s(pe);M(()=>p(Ye,e(P))),m(ye,pe)};le(ke,ye=>{e(P)&&ye(Q)})}var y=d(ke,2);{var D=ye=>{var pe=Uh(),Ye=s(pe);Wt(Ye,{get icon(){return cr},get label(){return e(l).task.statFocused},get value(){return e(ue).focusedMinutes},get unit(){return e(l).stats.unitMin},accent:!0});var Qe=d(Ye,2);Wt(Qe,{get icon(){return Qo},get label(){return e(l).task.statCompletedPomo},get value(){return e(ue).completedPomodoros},get unit(){return e(l).stats.unitCount},accent:!0});var mt=d(Qe,2);Wt(mt,{get icon(){return Jo},get label(){return e(l).task.statCompleted},get value(){return e(ue).completedCount},get unit(){return e(l).stats.unitCount},accent:!0}),m(ye,pe)},K=ye=>{var pe=Wh(),Ye=s(pe);Wt(Ye,{get icon(){return cr},get label(){return e(l).task.statEstimated},get value(){return e(ue).estimatedMinutes},get unit(){return e(l).stats.unitMin},accent:!0});var Qe=d(Ye,2);Wt(Qe,{get icon(){return Qo},get label(){return e(l).task.statActive},get value(){return e(ue).activeCount},get unit(){return e(l).stats.unitCount},accent:!0});var mt=d(Qe,2);Wt(mt,{get icon(){return gs},get label(){return e(l).task.statFocused},get value(){return e(ue).focusedMinutes},get unit(){return e(l).stats.unitMin},accent:!0});var Ge=d(mt,2);Wt(Ge,{get icon(){return Jo},get label(){return e(l).task.statCompleted},get value(){return e(ue).completedCount},get unit(){return e(l).stats.unitCount},accent:!0}),m(ye,pe)};le(y,ye=>{e(f)==="completed"?ye(D):ye(K,-1)})}var V=d(y,2);{var W=ye=>{gi(ye,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(A)},setFilterProject:pe=>v(A,pe,!0),get filterTag(){return e(O)},setFilterTag:pe=>v(O,pe,!0),get filterPriority(){return e(U)},setFilterPriority:pe=>v(U,pe,!0),get filterPreset(){return e($)},setFilterPreset:pe=>v($,pe,!0),get filterStartDate(){return e(ee)},setFilterStartDate:pe=>v(ee,pe,!0),get filterEndDate(){return e(he)},setFilterEndDate:pe=>v(he,pe,!0)})},Z=ye=>{gi(ye,{get projects(){return e(r)},get tags(){return e(o)},get filterProject(){return e(w)},setFilterProject:pe=>v(w,pe,!0),get filterTag(){return e(x)},setFilterTag:pe=>v(x,pe,!0),get filterPriority(){return e(j)},setFilterPriority:pe=>v(j,pe,!0),get filterPreset(){return e(S)},setFilterPreset:pe=>v(S,pe,!0),get filterStartDate(){return e(T)},setFilterStartDate:pe=>v(T,pe,!0),get filterEndDate(){return e(q)},setFilterEndDate:pe=>v(q,pe,!0),onExport:_e})};le(V,ye=>{e(f)==="completed"?ye(W):e(f)==="planned"&&ye(Z,1)})}var X=d(V,2);{var Pe=ye=>{{let pe=R(()=>e(f)==="tomorrow"?qr():Ca());Mh(ye,{get projects(){return e(r)},get tags(){return e(o)},get defaultProjectId(){return e(u)},get defaultDueDate(){return e(pe)},onAdd:ce})}};le(X,ye=>{e(f)!=="completed"&&ye(Pe)})}var Se=d(X,2);{var Ue=ye=>{var pe=Yh(),Ye=s(pe),Qe=s(Ye),mt=d(Ye,2);M(()=>p(Qe,`⚠ ${e(i)??""}`)),J("click",mt,()=>v(i,null)),m(ye,pe)};le(Se,ye=>{e(i)&&ye(Ue)})}var ht=d(Se,2);{var dt=ye=>{var pe=Gh(),Ye=s(pe);M(()=>p(Ye,e(l).common.loading)),m(ye,pe)},ut=ye=>{var pe=Kh(),Ye=s(pe);{var Qe=Ge=>{var Tt=Ls();M(()=>p(Tt,e(l).task.emptyAll)),m(Ge,Tt)},mt=Ge=>{var Tt=Ls();M(()=>p(Tt,e(l).task.emptyFiltered)),m(Ge,Tt)};le(Ye,Ge=>{e(n).length===0?Ge(Qe):Ge(mt,-1)})}m(ye,pe)},We=ye=>{{let pe=R(()=>e(f)==="completed"?"completed_at":"due_date");uh(ye,{get tasks(){return e(ne)},get groupBy(){return e(pe)},get selectedTask(){return e(g)},onToggle:ge,onSelect:I,onStart:B})}},Be=ye=>{var pe=Vh();Me(pe,21,()=>e(ne),Ye=>Ye.id,(Ye,Qe)=>{{let mt=R(()=>{var Ge;return((Ge=e(g))==null?void 0:Ge.id)===e(Qe).id});cc(Ye,{get task(){return e(Qe)},get selected(){return e(mt)},onToggle:()=>ge(e(Qe)),onSelect:I,onStart:B})}}),m(ye,pe)};le(ht,ye=>{e(c)?ye(dt):e(ne).length===0?ye(ut,1):e(f)==="week"||e(f)==="planned"||e(f)==="completed"?ye(We,2):ye(Be,-1)})}m(Y,fe)};le(oe,Y=>{e(f)==="journal"?Y(ie):Y(me,-1)})}var De=d(L,2);{var je=Y=>{zh(Y,{get year(){return e(_)},get month(){return e(b)},get reviewVersion(){return e(k)}})},Re=Y=>{ih(Y,{get task(){return e(g)},get projects(){return e(r)},get allTags(){return e(o)},onClose:C,onChanged:N})};le(De,Y=>{e(f)==="journal"?Y(je):e(g)&&Y(Re,1)})}m(a,re),gt()}St(["click"]);//! 统计页维度区间/标签工具 —— v1 `pomoflow/frontend/src/pages/StatsPage.tsx` 的
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
const Zh=[{key:"today",group:"day"},{key:"week",group:"day"},{key:"month",group:"day"},{key:"quarter",group:"week"},{key:"halfyear",group:"month"},{key:"year",group:"month"}];function yi(a){return String(a).padStart(2,"0")}function Jt(a){return`${a.getFullYear()}-${yi(a.getMonth()+1)}-${yi(a.getDate())}`}function Co(a,t){return Math.round((t.getTime()-a.getTime())/864e5)+1}function ts(a,t=new Date){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=n.getDay(),o=r===0?-6:1-r;if(a==="today")return{start:Jt(n),end:Jt(n),days:1,group:"day"};if(a==="week"){const l=new Date(n);l.setDate(n.getDate()+o);const u=new Date(l);return u.setDate(l.getDate()+6),{start:Jt(l),end:Jt(u),days:7,group:"day"}}if(a==="month"){const l=new Date(n.getFullYear(),n.getMonth(),1),u=new Date(n.getFullYear(),n.getMonth()+1,0);return{start:Jt(l),end:Jt(u),days:u.getDate(),group:"day"}}if(a==="quarter"){const l=Math.floor(n.getMonth()/3),u=new Date(n.getFullYear(),l*3,1),f=new Date(n.getFullYear(),l*3+3,0);return{start:Jt(u),end:Jt(f),days:Co(u,f),group:"week"}}if(a==="halfyear"){const l=n.getMonth()<6?0:6,u=new Date(n.getFullYear(),l,1),f=new Date(n.getFullYear(),l+6,0);return{start:Jt(u),end:Jt(f),days:Co(u,f),group:"month"}}const c=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);return{start:Jt(c),end:Jt(i),days:Co(c,i),group:"month"}}function $h(a,t=new Date){const n=ts(a,t),r=new Date(n.start+"T00:00:00"),o=new Date(n.end+"T00:00:00"),c=Math.round((o.getTime()-r.getTime())/864e5)+1,i=new Date(r);i.setDate(r.getDate()-1);const l=new Date(i);return l.setDate(i.getDate()-c+1),{start:Jt(l),end:Jt(i)}}function dc(a,t){return t==="month"?`${Number(a.slice(5,7))}`:`${Number(a.slice(5,7))}/${Number(a.slice(8,10))}`}function e_(a,t=new Date){return Jt(t)}var t_=E('<div class="empty svelte-1ixrxd8"> </div>'),a_=kn('<text class="tick svelte-1ixrxd8" text-anchor="end"> </text>'),n_=kn('<line class="grid svelte-1ixrxd8"></line><!>',1),r_=kn('<text class="tick svelte-1ixrxd8" text-anchor="middle"> </text>'),o_=kn('<rect rx="3"></rect><!><rect class="hit svelte-1ixrxd8" role="presentation"></rect>',1),s_=E('<div class="tooltip svelte-1ixrxd8"> </div>'),i_=E('<div class="chart-wrap svelte-1ixrxd8"><svg role="img" class="svelte-1ixrxd8"><!><!></svg> <!></div>');function l_(a,t){pt(t,!0);const n=R(bt),r=600,o=240,c={top:14,right:8,bottom:26,left:42},i=r-c.left-c.right,l=o-c.top-c.bottom,u=2,f=10,h=34;let g=H(null);function _(q){if(q<=0)return 0;const A=Math.pow(10,Math.floor(Math.log10(q))),O=q/A;return(O<=1?1:O<=2?2:O<=5?5:10)*A}function b(q,A){return dc(q,A)}const k=R(()=>{const q=t.data.length,A=t.data.reduce((ue,P)=>Math.max(ue,P.minutes),0),O=_(A),U=q>0?i/q:i,$=Math.min(U*.62,h),ee=Math.max(1,Math.ceil(q/f)),he=t.group==="day"?e_():null,ne=t.data.map((ue,P)=>{const G=ue.minutes>0&&O>0?Math.max(u,ue.minutes/O*l):u,de=c.left+U*P+(U-$)/2;return{i:P,key:ue.key,minutes:ue.minutes,x:de,y:c.top+l-G,w:$,h:G,hitX:c.left+U*P,hitW:U,label:b(ue.key,t.group),showLabel:P%ee===0||P===q-1,isCurrent:he!==null&&ue.key===he}}),te=[0,.25,.5,.75,1].map(ue=>({y:c.top+l-ue*l,value:Math.round(O*ue),labeled:ue===0||ue===.5||ue===1}));return{bars:ne,gridlines:te}}),w=R(()=>e(g)!==null?e(k).bars[e(g)]:null);var x=ze(),j=Ne(x);{var S=q=>{var A=t_(),O=s(A);M(()=>p(O,t.emptyText??e(n).stats.noData)),m(q,A)},T=q=>{var A=i_(),O=s(A);z(O,"viewBox","0 0 600 240");var U=s(O);Me(U,17,()=>e(k).gridlines,La,(ne,te)=>{var ue=n_(),P=Ne(ue),G=d(P);{var de=be=>{var ge=a_(),Te=s(ge);M(()=>{z(ge,"x",c.left-6),z(ge,"y",e(te).y+3),p(Te,e(te).value)}),m(be,ge)};le(G,be=>{e(te).labeled&&be(de)})}M(()=>{z(P,"x1",c.left),z(P,"x2",r-c.right),z(P,"y1",e(te).y),z(P,"y2",e(te).y)}),m(ne,ue)});var $=d(U);Me($,17,()=>e(k).bars,ne=>ne.key,(ne,te)=>{var ue=o_(),P=Ne(ue);let G;var de=d(P);{var be=Te=>{var Fe=r_();z(Fe,"y",o-8);var et=s(Fe);M(()=>{z(Fe,"x",e(te).x+e(te).w/2),p(et,e(te).label)}),m(Te,Fe)};le(de,Te=>{e(te).showLabel&&Te(be)})}var ge=d(de);M(()=>{G=Ke(P,0,"bar svelte-1ixrxd8",null,G,{zero:e(te).minutes===0,current:e(te).isCurrent}),z(P,"x",e(te).x),z(P,"y",e(te).y),z(P,"width",e(te).w),z(P,"height",e(te).h),z(ge,"x",e(te).hitX),z(ge,"y",c.top),z(ge,"width",e(te).hitW),z(ge,"height",l)}),kt("pointerenter",ge,()=>v(g,e(te).i,!0)),kt("pointerleave",ge,()=>v(g,null)),m(ne,ue)});var ee=d(O,2);{var he=ne=>{var te=s_();let ue;var P=s(te);M(G=>{ue=Ot(te,"",ue,G),p(P,`${e(w).label??""} · ${e(w).minutes??""} ${e(n).stats.unitMin??""}`)},[()=>({left:Math.min(88,Math.max(12,(e(w).x+e(w).w/2)/r*100))+"%",top:e(w).y/o*100+"%"})]),m(ne,te)};le(ee,ne=>{e(w)&&ne(he)})}M(()=>z(O,"aria-label",e(n).stats.trendChartAria)),kt("pointerleave",O,()=>v(g,null)),m(q,A)};le(j,q=>{t.data.length===0?q(S):q(T,-1)})}m(a,x),gt()}var c_=E('<div class="empty svelte-s63rv4"> </div>'),d_=kn('<circle role="presentation" pathLength="100"></circle>'),u_=E('<div class="tooltip svelte-s63rv4"> </div>'),v_=E('<span><i class="dot svelte-s63rv4"></i> <span class="name svelte-s63rv4"> </span> <span class="minutes svelte-s63rv4"> </span></span>'),f_=E('<div class="donut svelte-s63rv4"><div class="chart svelte-s63rv4"><svg role="img" class="svelte-s63rv4"><g></g></svg> <!></div> <div class="legend svelte-s63rv4"></div></div>');function h_(a,t){pt(t,!0);const n=R(bt),r=220,o=110,c=76,i=2/360*100,l=[90,75,60,45,30,15,0];function u(S){return`color-mix(in srgb, var(--color-accent, #e74c3c) ${l[S%l.length]}%, white)`}function f(S){return S>=l.length?Math.max(.4,1-(S-l.length+1)*.15):void 0}let h=H(null);const g=R(()=>t.projects.reduce((S,T)=>S+T.total_minutes,0)),_=R(()=>{if(e(g)<=0||t.projects.length===0)return[];const S=t.projects.length>1?i:0;let T=0;return t.projects.map((q,A)=>{const O=q.total_minutes/e(g),U=Math.max(.6,O*100-S),$=(T+O/2)/100*2*Math.PI-Math.PI/2,ee={i:A,p:q,len:U,offset:T,color:u(A),opacity:f(A),tipX:o+c*Math.cos($),tipY:o+c*Math.sin($)};return T+=O*100,ee})}),b=R(()=>e(h)!==null?e(_)[e(h)]:null);var k=ze(),w=Ne(k);{var x=S=>{var T=c_(),q=s(T);M(()=>p(q,t.emptyText??e(n).stats.noProject)),m(S,T)},j=S=>{var T=f_(),q=s(T),A=s(q);z(A,"viewBox","0 0 220 220");var O=s(A);z(O,"transform","rotate(-90 110 110)"),Me(O,21,()=>e(_),he=>he.p.project_id,(he,ne)=>{var te=d_();let ue;z(te,"cx",o),z(te,"cy",o),z(te,"r",c);let P;M(()=>{ue=Ke(te,0,"seg svelte-s63rv4",null,ue,{hovered:e(h)===e(ne).i}),z(te,"opacity",e(ne).opacity),z(te,"stroke-dasharray",`${e(ne).len??""} ${100-e(ne).len}`),z(te,"stroke-dashoffset",-e(ne).offset),P=Ot(te,"",P,{stroke:e(ne).color})}),kt("pointerenter",te,()=>v(h,e(ne).i,!0)),kt("pointerleave",te,()=>v(h,null)),m(he,te)});var U=d(A,2);{var $=he=>{var ne=u_();let te;var ue=s(ne);M(()=>{te=Ot(ne,"",te,{left:e(b).tipX/r*100+"%",top:e(b).tipY/r*100+"%"}),p(ue,`${e(b).p.project_name??""} · ${e(b).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),m(he,ne)};le(U,he=>{e(b)&&he($)})}var ee=d(q,2);Me(ee,21,()=>e(_),he=>he.p.project_id,(he,ne)=>{var te=v_();let ue;var P=s(te);let G;var de=d(P,2),be=s(de),ge=d(de,2),Te=s(ge);M(()=>{ue=Ke(te,1,"legend-item svelte-s63rv4",null,ue,{hovered:e(h)===e(ne).i}),G=Ot(P,"",G,{background:e(ne).color,opacity:e(ne).opacity??1}),p(be,e(ne).p.project_name),p(Te,`${e(ne).p.total_minutes??""} ${e(n).stats.unitMin??""}`)}),m(he,te)}),M(()=>z(A,"aria-label",e(n).stats.donutChartAria)),m(S,T)};le(w,S=>{e(_).length===0?S(x):S(j,-1)})}m(a,k),gt()}var __=E("<button> </button>"),p_=E('<div class="error svelte-giv6a6" role="alert"> </div>'),g_=E('<p class="loading svelte-giv6a6"> </p>'),m_=E('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!> <!> <!></div>'),b_=E('<div class="stats-4 svelte-giv6a6"><!> <!> <!> <!></div> <!> <div><section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section> <section class="chart-card svelte-giv6a6"><h3 class="svelte-giv6a6"> </h3> <!></section></div>',1),y_=E('<div class="page svelte-giv6a6"><h2 class="svelte-giv6a6"> </h2> <div class="dims svelte-giv6a6"></div> <!> <!></div>');function k_(a,t){pt(t,!0);const n=R(bt);let r=H("week"),o=H(null),c=H(0),i=H(!0),l=H(null),u=0;const f=R(()=>ts(e(r))),h=R(()=>e(f).group),g=R(()=>e(h)==="day"?e(n).stats.byDay:e(h)==="week"?e(n).stats.byWeek:e(n).stats.byMonth),_=R(()=>({today:e(n).stats.dimToday,week:e(n).stats.dimWeek,month:e(n).stats.dimMonth,quarter:e(n).stats.dimQuarter,halfyear:e(n).stats.dimHalf,year:e(n).stats.dimYear})),b=R(()=>{var P;return((P=e(o))==null?void 0:P.summary.total_minutes)??0}),k=R(()=>{var P;return((P=e(o))==null?void 0:P.summary.total_sessions)??0}),w=R(()=>{var P;return((P=e(o))==null?void 0:P.summary.completed_tasks)??0}),x=R(()=>Math.round(e(b)/Math.max(1,e(f).days))),j=R(()=>{if(!e(o))return null;const P=e(o).trend;let G=0,de=0;for(const ge of P)ge.minutes>0?(de++,G=Math.max(G,de)):de=0;let be={key:"",minutes:0,sessions:0};for(const ge of P)ge.minutes>be.minutes&&(be=ge);return{activeDays:P.filter(ge=>ge.minutes>0).length,longest:G,perPeriod:P.length>0?Math.round(e(b)/P.length):0,peak:be,projects:[...e(o).projects].sort((ge,Te)=>Te.total_minutes-ge.total_minutes)}}),S=R(()=>e(c)>0?Math.round((e(b)-e(c))/e(c)*100):e(b)>0?100:0),T=R(()=>`${e(S)>=0?"+":""}${e(S)}%`),q=R(()=>e(j)?e(j).projects:[]);Pt(()=>{const P=ts(e(r)),G=$h(e(r)),de=++u;v(o,null),v(c,0),v(l,null),v(i,!0);const be=-new Date().getTimezoneOffset();Zs(P.start,P.end,P.group,be).then(ge=>{de===u&&(v(o,ge,!0),v(i,!1))}).catch(ge=>{de===u&&(v(l,String(ge),!0),v(i,!1))}),Zs(G.start,G.end,P.group,be).then(ge=>{de===u&&v(c,ge.summary.total_minutes,!0)}).catch(()=>{})});var A=y_();Sr("giv6a6",P=>{kr(()=>{Un.title=e(n).page.stats??""})});var O=s(A),U=s(O),$=d(O,2);Me($,21,()=>Zh,P=>P.key,(P,G)=>{var de=__();let be;var ge=s(de);M(()=>{be=Ke(de,1,"dim-pill svelte-giv6a6",null,be,{active:e(r)===e(G).key}),z(de,"aria-pressed",e(r)===e(G).key),p(ge,e(_)[e(G).key])}),J("click",de,()=>v(r,e(G).key,!0)),m(P,de)});var ee=d($,2);{var he=P=>{var G=p_(),de=s(G);M(be=>p(de,`⚠ ${be??""}`),[()=>Ct(e(n).stats.loadError,{err:e(l)})]),m(P,G)};le(ee,P=>{e(l)&&P(he)})}var ne=d(ee,2);{var te=P=>{var G=g_(),de=s(G);M(()=>p(de,e(n).stats.loading)),m(P,G)},ue=P=>{var G=b_(),de=Ne(G),be=s(de);Wt(be,{get icon(){return cr},get label(){return e(n).stats.focusDuration},get value(){return e(b)},get unit(){return e(n).stats.unitMin},accent:!0});var ge=d(be,2);Wt(ge,{get icon(){return gs},get label(){return e(n).stats.sessions},get value(){return e(k)},get unit(){return e(n).stats.unitCount},accent:!0});var Te=d(ge,2);Wt(Te,{get icon(){return Qo},get label(){return e(n).stats.completed},get value(){return e(w)},get unit(){return e(n).stats.unitCount},accent:!0});var Fe=d(Te,2);Wt(Fe,{get icon(){return bo},get label(){return e(n).stats.avg},get value(){return e(x)},get unit(){return e(n).stats.unitMin},accent:!0});var et=d(de,2);{var I=me=>{var De=m_(),je=s(De);Wt(je,{get icon(){return Pl},get label(){return e(n).stats.activeDays},get value(){return e(j).activeDays},get unit(){return e(n).stats.unitDay},accent:!0});var Re=d(je,2);{var Y=W=>{Wt(W,{get icon(){return gu},get label(){return e(n).stats.longestStreak},get value(){return e(j).longest},get unit(){return e(n).stats.unitDay},accent:!0})};le(Re,W=>{(e(r)==="month"||e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&W(Y)})}var fe=d(Re,2);{var ke=W=>{{let Z=R(()=>e(h)==="week"?e(n).stats.avgWeek:e(n).stats.avgMonth);Wt(W,{get icon(){return bo},get label(){return e(Z)},get value(){return e(j).perPeriod},get unit(){return e(n).stats.unitMin},accent:!0})}};le(fe,W=>{(e(r)==="quarter"||e(r)==="halfyear"||e(r)==="year")&&W(ke)})}var Q=d(fe,2);{var y=W=>{{let Z=R(()=>e(h)==="month"?e(n).stats.peakMonth:e(n).stats.peakPeriod),X=R(()=>e(j).peak.key?dc(e(j).peak.key,e(h)):"—"),Pe=R(()=>e(j).peak.minutes?`${e(j).peak.minutes} ${e(n).stats.unitMin}`:"");Wt(W,{get icon(){return Gs},get label(){return e(Z)},get value(){return e(X)},get unit(){return e(Pe)},accent:!0})}};le(Q,W=>{(e(r)==="halfyear"||e(r)==="year")&&W(y)})}var D=d(Q,2);{var K=W=>{{let Z=R(()=>`${e(j).projects[0].total_minutes} ${e(n).stats.unitMin}`);Wt(W,{get icon(){return Gs},get label(){return e(n).stats.bestProject},get value(){return e(j).projects[0].project_name},get unit(){return e(Z)},accent:!0})}};le(D,W=>{(e(r)==="halfyear"||e(r)==="year")&&e(j).projects[0]&&W(K)})}var V=d(D,2);Wt(V,{get icon(){return bo},get label(){return e(n).stats.momRatio},get value(){return e(T)},accent:!0}),m(me,De)};le(et,me=>{e(j)&&e(r)!=="today"&&me(I)})}var C=d(et,2);let N;var B=s(C),ce=s(B),_e=s(ce),re=d(ce,2);l_(re,{get data(){return e(o).trend},get group(){return e(h)}});var ve=d(B,2),L=s(ve),oe=s(L),ie=d(L,2);h_(ie,{get projects(){return e(q)}}),M(()=>{N=Ke(C,1,"charts svelte-giv6a6",null,N,{split:e(r)!=="month"}),p(_e,`${e(n).stats.trendTitle??""}（${e(g)??""}）`),p(oe,e(n).stats.projectDist)}),m(P,G)};le(ne,P=>{e(i)?P(te):e(o)&&P(ue,1)})}M(()=>p(U,e(n).nav.stats)),m(a,A),gt()}St(["click"]);var w_=E('<button type="button" role="switch"><span class="knob svelte-1re5fgf"></span></button>');function Xn(a,t){pt(t,!0);let n=va(t,"disabled",3,!1);var r=w_();let o;M(()=>{o=Ke(r,1,"switch svelte-1re5fgf",null,o,{on:t.checked}),z(r,"aria-checked",t.checked),z(r,"aria-label",t.label),r.disabled=n()}),J("click",r,()=>t.onChange(!t.checked)),m(a,r),gt()}St(["click"]);async function x_(){return await Je("plugin:autostart|is_enabled")}async function S_(){await Je("plugin:autostart|enable")}async function T_(){await Je("plugin:autostart|disable")}var Er=E("<option> </option>"),D_=E('<div class="error svelte-90mmv5" role="alert"> </div>'),P_=E('<div><h2 class="tab-title svelte-90mmv5"> </h2> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <select class="select svelte-90mmv5"></select></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div></div></section> <section class="group svelte-90mmv5"><h3 class="group-title svelte-90mmv5"> </h3> <div class="group-body svelte-90mmv5"><div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"> </span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <!></div> <div class="form-row svelte-90mmv5"><span class="row-label svelte-90mmv5"><span class="name svelte-90mmv5"> </span> <span class="desc svelte-90mmv5"> </span></span> <button type="button" class="action svelte-90mmv5"> </button></div></div> <p class="tray-hint svelte-90mmv5"> </p></section> <!></div>');function M_(a,t){pt(t,!0);const n=R(bt),r=R(en),o=[1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90],c=[2,3,4,5,6];function i(xe,vt){return vt.includes(xe)?vt:[...vt,xe].sort((ft,Ht)=>ft-Ht)}let l=H(!1),u=H(!1),f=H(0),h=H(null);async function g(){try{v(l,await x_(),!0)}catch(xe){console.warn("isEnabled failed",xe),v(l,!1)}try{const xe=await yn({status:"active"});v(f,xe.length,!0)}catch{}}Pt(()=>{g()}),Pt(()=>{e(r).focusDuration,e(r).shortBreakDuration,e(r).longBreakDuration,e(r).longBreakInterval,gv()});function _(xe,vt){Js({[xe]:vt})}function b(xe){xe&&e(r).autoStartBreak?Js({disableBreak:!0,autoStartBreak:!1}):_("disableBreak",xe)}async function k(){if(!e(u)){v(u,!0),v(h,null);try{e(l)?(await T_(),v(l,!1)):(await S_(),v(l,!0))}catch(xe){v(h,Ct(e(n).settings.autostartFail,{err:String(xe)}),!0)}finally{v(u,!1)}}}async function w(){v(h,null);try{let xe=await ws();if(xe||(xe=await xs()==="granted"),!xe){v(h,e(n).settings.notifPermDenied,!0);return}Ss({title:e(n).settings.testNotifTitle,body:Ct(e(n).settings.testNotifBody,{n:e(f)})})}catch(xe){v(h,Ct(e(n).settings.notifSendFail,{err:String(xe)}),!0)}}var x=P_(),j=s(x),S=s(j),T=d(j,2),q=s(T),A=s(q),O=d(q,2),U=s(O),$=s(U),ee=s($),he=d($,2);Me(he,20,()=>i(e(r).focusDuration,o),xe=>xe,(xe,vt)=>{var ft=Er(),Ht=s(ft),ae={};M(()=>{p(Ht,`${vt??""}${e(n).settings.minute??""}`),ae!==(ae=vt)&&(ft.value=(ft.__value=vt)??"")}),m(xe,ft)});var ne;qt(he);var te=d(U,2),ue=s(te),P=s(ue),G=d(ue,2);Me(G,20,()=>i(e(r).shortBreakDuration,o),xe=>xe,(xe,vt)=>{var ft=Er(),Ht=s(ft),ae={};M(()=>{p(Ht,`${vt??""}${e(n).settings.minute??""}`),ae!==(ae=vt)&&(ft.value=(ft.__value=vt)??"")}),m(xe,ft)});var de;qt(G);var be=d(te,2),ge=s(be),Te=s(ge),Fe=d(ge,2);Me(Fe,20,()=>i(e(r).longBreakDuration,o),xe=>xe,(xe,vt)=>{var ft=Er(),Ht=s(ft),ae={};M(()=>{p(Ht,`${vt??""}${e(n).settings.minute??""}`),ae!==(ae=vt)&&(ft.value=(ft.__value=vt)??"")}),m(xe,ft)});var et;qt(Fe);var I=d(be,2),C=s(I),N=s(C),B=d(C,2);Me(B,20,()=>i(e(r).longBreakInterval,c),xe=>xe,(xe,vt)=>{var ft=Er(),Ht=s(ft),ae={};M(()=>{p(Ht,`${vt??""}${e(n).settings.pomodoroUnit??""}`),ae!==(ae=vt)&&(ft.value=(ft.__value=vt)??"")}),m(xe,ft)});var ce;qt(B);var _e=d(T,2),re=s(_e),ve=s(re),L=d(re,2),oe=s(L),ie=s(oe),me=s(ie),De=s(me),je=d(me,2),Re=s(je),Y=d(ie,2);Xn(Y,{get checked(){return e(r).autoStartNextPomodoro},onChange:xe=>_("autoStartNextPomodoro",xe),get label(){return e(n).settings.autoStartNext}});var fe=d(oe,2),ke=s(fe),Q=s(ke),y=s(Q),D=d(Q,2),K=s(D),V=d(ke,2);Xn(V,{get checked(){return e(r).autoStartBreak},onChange:xe=>_("autoStartBreak",xe),get label(){return e(n).settings.autoStartBreak}});var W=d(fe,2),Z=s(W),X=s(Z),Pe=s(X),Se=d(X,2),Ue=s(Se),ht=d(Z,2);Xn(ht,{get checked(){return e(r).disableBreak},onChange:b,get label(){return e(n).settings.disableBreak}});var dt=d(_e,2),ut=s(dt),We=s(ut),Be=d(ut,2),ye=s(Be),pe=s(ye),Ye=s(pe),Qe=d(pe,2);Xn(Qe,{get checked(){return e(r).desktopNotificationEnabled},onChange:xe=>_("desktopNotificationEnabled",xe),get label(){return e(n).settings.systemNotification}});var mt=d(ye,2),Ge=s(mt),Tt=s(Ge),Ft=s(Tt),Bt=d(Tt,2),zt=s(Bt),At=d(Ge,2);Xn(At,{get checked(){return e(l)},onChange:k,get label(){return e(n).settings.autostart},get disabled(){return e(u)}});var He=d(mt,2),it=s(He),yt=s(it),Le=s(yt),Xe=d(yt,2),qe=s(Xe),lt=d(it,2),se=s(lt),we=d(Be,2),Ae=s(we),Ve=d(dt,2);{var Dt=xe=>{var vt=D_(),ft=s(vt);M(()=>p(ft,`⚠ ${e(h)??""}`)),m(xe,vt)};le(Ve,xe=>{e(h)&&xe(Dt)})}M(()=>{p(S,e(n).settings.timerTitle),p(A,e(n).settings.durationSetting),p(ee,e(n).settings.focusDuration),ne!==(ne=e(r).focusDuration)&&(he.value=(he.__value=e(r).focusDuration)??"",Nt(he,e(r).focusDuration)),p(P,e(n).settings.shortBreakDuration),de!==(de=e(r).shortBreakDuration)&&(G.value=(G.__value=e(r).shortBreakDuration)??"",Nt(G,e(r).shortBreakDuration)),p(Te,e(n).settings.longBreakDuration),et!==(et=e(r).longBreakDuration)&&(Fe.value=(Fe.__value=e(r).longBreakDuration)??"",Nt(Fe,e(r).longBreakDuration)),p(N,e(n).settings.longBreakInterval),ce!==(ce=e(r).longBreakInterval)&&(B.value=(B.__value=e(r).longBreakInterval)??"",Nt(B,e(r).longBreakInterval)),p(ve,e(n).settings.behaviorSetting),p(De,e(n).settings.autoStartNext),p(Re,e(n).settings.autoStartNextDesc),p(y,e(n).settings.autoStartBreak),p(K,e(n).settings.autoStartBreakDesc),p(Pe,e(n).settings.disableBreak),p(Ue,e(n).settings.disableBreakDesc),p(We,e(n).settings.systemSection),p(Ye,e(n).settings.systemNotification),p(Ft,e(n).settings.autostart),p(zt,e(n).settings.autostartHint),p(Le,e(n).settings.notifTest),p(qe,e(n).settings.notifTestHint),p(se,e(n).settings.sendTest),p(Ae,e(n).settings.trayHint)}),J("change",he,xe=>_("focusDuration",Number(xe.currentTarget.value))),J("change",G,xe=>_("shortBreakDuration",Number(xe.currentTarget.value))),J("change",Fe,xe=>_("longBreakDuration",Number(xe.currentTarget.value))),J("change",B,xe=>_("longBreakInterval",Number(xe.currentTarget.value))),J("click",lt,w),m(a,x),gt()}St(["change","click"]);const Jr=["#c97b6e","#d4945c","#d4a574","#b8a878","#7fa086","#6b9b8a","#5c8b84","#5c8fad","#7a8fb0","#8b7baf","#a68b78","#a8a298"],Va=Jr[0];var E_=E('<div class="error svelte-1o455o6" role="alert"> </div>'),C_=E('<div class="add-root-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),j_=E('<button type="button" class="add-root-btn svelte-1o455o6"><!> </button>'),N_=E('<button type="button"></button>'),F_=E('<div class="edit-box svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/> <div class="color-row svelte-1o455o6"></div> <div class="edit-actions svelte-1o455o6"><button type="button" class="link-btn svelte-1o455o6"> </button> <button type="button" class="save-btn svelte-1o455o6"> </button></div></div>'),A_=E('<button type="button" class="chevron svelte-1o455o6"><!></button>'),I_=E('<span class="chevron-spacer svelte-1o455o6"></span>'),R_=E('<button type="button" class="icon-btn svelte-1o455o6"><!></button>'),q_=E('<div role="treeitem" tabindex="-1" aria-selected="false"><span><!> <span class="dot svelte-1o455o6"></span> <span class="name svelte-1o455o6"> </span></span> <span class="actions svelte-1o455o6"><!> <button type="button" class="icon-btn svelte-1o455o6"><!></button> <button type="button" class="icon-btn danger svelte-1o455o6"><!></button></span></div>'),L_=E('<div class="add-child-row svelte-1o455o6"><input type="text" class="text-input svelte-1o455o6"/></div>'),O_=E('<div class="row-wrap svelte-1o455o6"><!> <!></div>'),B_=E('<div class="empty svelte-1o455o6"> </div>'),z_=E('<div class="manager svelte-1o455o6"><h2 class="tab-title svelte-1o455o6"> </h2> <p class="drag-hint svelte-1o455o6"> </p> <!> <!> <div role="tree" tabindex="-1"><!> <!></div></div>');function H_(a,t){pt(t,!0);const n=R(bt);let r=H(Oe([])),o=H(Oe(new Set)),c=H("root"),i=H(""),l=H(null),u=H(""),f=H(Oe(Va)),h=H(null),g=H(null),_=H(null),b=H(!1);function k(){return new Date().toISOString()}async function w(){try{v(r,await ys(),!0)}catch{}}$a(()=>{w()}),Pt(()=>{if(!e(h))return;const y=window.setTimeout(()=>v(h,null),3e3);return()=>window.clearTimeout(y)});function x(y){const D=new Map,K=[];for(const Z of y)D.set(Z.id,{...Z,children:[],depth:0});for(const Z of y){const X=D.get(Z.id);X&&(Z.parent_id&&D.has(Z.parent_id)?D.get(Z.parent_id).children.push(X):K.push(X))}const V=Z=>{Z.sort((X,Pe)=>(X.display_order??0)-(Pe.display_order??0)||(X.created_at??"").localeCompare(Pe.created_at??"")||X.id.localeCompare(Pe.id)),Z.forEach(X=>V(X.children))};V(K);const W=(Z,X)=>{for(const Pe of Z)Pe.depth=X,W(Pe.children,X+1)};return W(K,0),K}function j(y,D){const K=[];for(const V of y)K.push(V),D.has(V.id)&&V.children.length>0&&K.push(...j(V.children,D));return K}const S=R(()=>x(e(r))),T=R(()=>j(e(S),e(o)));function q(y){const D=new Set(e(o));D.has(y)?D.delete(y):D.add(y),v(o,D,!0)}function A(){const y=new Map;for(const D of e(r))y.set(D.id,D.parent_id??null);return y}function O(){const y=new Map;for(const D of e(r)){const K=D.parent_id??null;y.has(K)||y.set(K,[]),y.get(K).push(D.id)}return y}function U(y,D){const K=D.get(y)??[];return K.length===0?1:1+Math.max(...K.map(V=>U(V,D)))}function $(y,D,K){let V=y;const W=new Set;for(;V;){if(V===D)return!0;if(W.has(V))return!1;W.add(V),V=K.get(V)??null}return!1}async function ee(){const y=e(i).trim();if(!y)return;const D=e(c)==="root"?null:e(c),K=e(r).filter(V=>(V.parent_id??null)===D);try{await Yr({id:crypto.randomUUID(),name:y,color:Va,parent_id:D,display_order:K.length,created_at:k(),updated_at:k()})}catch(V){v(h,String(V),!0)}if(v(i,""),v(c,null),D){const V=new Set(e(o));V.add(D),v(o,V,!0)}await w()}function he(y){v(l,y.id,!0),v(u,y.name,!0),v(f,y.color??Va,!0)}async function ne(){if(!e(l))return;const y=e(u).trim();if(!y)return;const D=e(r).find(K=>K.id===e(l));if(D){try{await Yr({...D,name:y,color:e(f),updated_at:k()})}catch(K){v(h,String(K),!0)}v(l,null),v(u,""),await w()}}async function te(y){try{await Wl(y)}catch(D){v(h,String(D),!0)}await w()}function ue(y){return y.includes("exceed max depth")?e(n).settings.list.reorderFailDepth:y.includes("cycle")?e(n).settings.list.reorderFailCycle:e(n).settings.list.reorderFail}function P(y){return y.map(D=>({id:D.id,parent_id:D.parent_id??null,display_order:D.display_order??0}))}function G(y){const D=new Map;for(const V of y){const W=V.parent_id??null;D.has(W)||D.set(W,[]),D.get(W).push(V)}const K=new Map;for(const V of D.values())V.slice().sort((W,Z)=>(W.display_order??0)-(Z.display_order??0)).forEach((W,Z)=>K.set(W.id,Z));return y.map(V=>({...V,display_order:K.get(V.id)??0}))}async function de(y,D){if(!e(r).find(X=>X.id===y))return;const V=e(r).filter(X=>(X.parent_id??null)===D&&X.id!==y).length,W=e(r).map(X=>X.id===y?{...X,parent_id:D,display_order:V}:X),Z=G(W);if(v(r,Z,!0),D){const X=new Set(e(o));X.add(D),v(o,X,!0)}try{await Gu(P(Z)),await w()}catch(X){await w(),v(h,ue(String(X)),!0)}}function be(y){const D=e(g);if(Te(),!D||D===y.id)return;const K=e(r).find(Z=>Z.id===D);if(!K||(K.parent_id??null)===y.id)return;const V=A();if($(y.id,D,V)){v(h,e(n).settings.list.reorderFailCycle,!0);return}const W=U(D,O());if(y.depth+W>2){v(h,e(n).settings.list.reorderFailDepth,!0);return}de(D,y.id)}function ge(){const y=e(g);if(Te(),!y)return;const D=e(r).find(K=>K.id===y);if(D){if((D.parent_id??null)===null){const K=e(r).filter(V=>V.parent_id==null&&V.id!==y).length;if((D.display_order??0)===K)return}de(y,null)}}function Te(){v(g,null),v(_,null),v(b,!1)}function Fe(y,D){y.dataTransfer&&(v(g,D.id,!0),y.dataTransfer.effectAllowed="move",y.dataTransfer.setData("text/plain",D.id))}function et(y,D){e(g)&&(y.preventDefault(),y.stopPropagation(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),v(_,D.id,!0),v(b,!1))}function I(y,D){y.preventDefault(),y.stopPropagation(),be(D)}function C(y){e(g)&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),v(b,!0),v(_,null))}function N(y){y.preventDefault(),ge()}function B(y){y.target===y.currentTarget&&v(b,!1)}var ce=z_(),_e=s(ce),re=s(_e),ve=d(_e,2),L=s(ve),oe=d(ve,2);{var ie=y=>{var D=E_(),K=s(D);M(()=>p(K,e(h))),m(y,D)};le(oe,y=>{e(h)&&y(ie)})}var me=d(oe,2);{var De=y=>{var D=C_(),K=s(D);vn(K,!0),M(()=>z(K,"placeholder",e(n).settings.list.addRootPlaceholder)),J("keydown",K,V=>{V.key==="Enter"&&ee(),V.key==="Escape"&&(v(c,null),v(i,""))}),kt("blur",K,()=>{e(i).trim()?ee():(v(c,null),v(i,""))}),wt(K,()=>e(i),V=>v(i,V)),m(y,D)},je=y=>{var D=j_(),K=s(D);Ln(K,{size:16});var V=d(K);M(()=>p(V,` ${e(n).settings.list.addRoot??""}`)),J("click",D,()=>{v(c,"root"),v(i,"")}),m(y,D)};le(me,y=>{e(c)==="root"?y(De):y(je,-1)})}var Re=d(me,2);let Y;var fe=s(Re);Me(fe,17,()=>e(T),y=>y.id,(y,D)=>{const K=R(()=>e(l)===e(D).id),V=R(()=>e(c)===e(D).id),W=R(()=>e(D).children.length>0),Z=R(()=>e(o).has(e(D).id)),X=R(()=>!e(K)&&!e(V)&&e(D).depth>0);var Pe=O_(),Se=s(Pe);{var Ue=We=>{var Be=F_(),ye=s(Be),pe=d(ye,2);Me(pe,20,()=>Jr,Ft=>Ft,(Ft,Bt)=>{var zt=N_();let At;M(He=>{At=Ke(zt,1,"swatch svelte-1o455o6",null,At,{active:e(f)===Bt}),Ot(zt,`background-color: ${Bt??""}`),z(zt,"aria-label",He)},[()=>Ct(e(n).settings.tag.colorAria,{color:Bt})]),J("click",zt,()=>v(f,Bt,!0)),m(Ft,zt)});var Ye=d(pe,2),Qe=s(Ye),mt=s(Qe),Ge=d(Qe,2),Tt=s(Ge);M(()=>{z(ye,"placeholder",e(D).name),p(mt,e(n).settings.repeatCustom.cancel),p(Tt,e(n).settings.notification.save)}),J("keydown",ye,Ft=>{Ft.key==="Enter"&&ne(),Ft.key==="Escape"&&(v(l,null),v(u,""))}),wt(ye,()=>e(u),Ft=>v(u,Ft)),J("click",Qe,()=>{v(l,null),v(u,"")}),J("click",Ge,ne),m(We,Be)},ht=We=>{var Be=q_();let ye;var pe=s(Be);let Ye;var Qe=s(pe);{var mt=qe=>{var lt=A_(),se=s(lt);{var we=Ve=>{lr(Ve,{size:14})},Ae=Ve=>{qn(Ve,{size:14})};le(se,Ve=>{e(Z)?Ve(we):Ve(Ae,-1)})}M(()=>z(lt,"aria-label",e(Z)?e(n).common.expand:e(n).common.collapse)),J("click",lt,Ve=>{Ve.stopPropagation(),q(e(D).id)}),m(qe,lt)},Ge=qe=>{var lt=I_();m(qe,lt)};le(Qe,qe=>{e(W)?qe(mt):qe(Ge,-1)})}var Tt=d(Qe,2),Ft=d(Tt,2),Bt=s(Ft),zt=d(pe,2),At=s(zt);{var He=qe=>{var lt=R_(),se=s(lt);Ln(se,{size:14}),M(()=>{z(lt,"title",e(n).settings.list.addChild),z(lt,"aria-label",e(n).settings.list.addChild)}),J("click",lt,we=>{we.stopPropagation(),v(c,e(D).id,!0),v(i,"")}),m(qe,lt)};le(At,qe=>{e(D).depth<2&&qe(He)})}var it=d(At,2),yt=s(it);Cl(yt,{size:14});var Le=d(it,2),Xe=s(Le);ms(Xe,{size:14}),M(()=>{ye=Ke(Be,1,"row svelte-1o455o6",null,ye,{"drop-over":e(_)===e(D).id&&e(g)!==e(D).id,dragging:e(g)===e(D).id}),z(Be,"draggable",e(X)),Ye=Ke(pe,1,"label svelte-1o455o6",null,Ye,{grabbable:e(X)}),Ot(Tt,`background-color: ${e(D).color??Va??""}`),p(Bt,e(D).name),z(it,"title",e(n).settings.list.edit),z(it,"aria-label",e(n).settings.list.edit),z(Le,"title",e(n).settings.list.del),z(Le,"aria-label",e(n).settings.list.del)}),kt("dragstart",Be,qe=>Fe(qe,e(D))),kt("dragover",Be,qe=>et(qe,e(D))),kt("drop",Be,qe=>I(qe,e(D))),kt("dragend",Be,Te),J("click",it,qe=>{qe.stopPropagation(),he(e(D))}),J("click",Le,qe=>{qe.stopPropagation(),te(e(D).id)}),m(We,Be)};le(Se,We=>{e(K)?We(Ue):We(ht,-1)})}var dt=d(Se,2);{var ut=We=>{var Be=L_(),ye=s(Be);vn(ye,!0),M(()=>z(ye,"placeholder",e(D).depth===0?e(n).settings.list.level2Placeholder:e(n).settings.list.level3Placeholder)),J("keydown",ye,pe=>{pe.key==="Enter"&&ee(),pe.key==="Escape"&&(v(c,null),v(i,""))}),kt("blur",ye,()=>{e(i).trim()?ee():(v(c,null),v(i,""))}),wt(ye,()=>e(i),pe=>v(i,pe)),m(We,Be)};le(dt,We=>{e(V)&&We(ut)})}M(()=>Ot(Pe,`padding-left: ${e(D).depth*24}px`)),m(y,Pe)});var ke=d(fe,2);{var Q=y=>{var D=B_(),K=s(D);M(()=>p(K,e(n).settings.list.empty)),m(y,D)};le(ke,y=>{e(r).length===0&&e(c)!=="root"&&y(Q)})}M(()=>{p(re,e(n).settings.list.title),p(L,e(n).settings.list.dragHint),Y=Ke(Re,1,"tree svelte-1o455o6",null,Y,{"over-root":e(b)})}),kt("dragover",Re,C),kt("drop",Re,N),kt("dragleave",Re,B),m(a,ce),gt()}St(["keydown","click"]);var ki=E('<button type="button"></button>'),U_=E('<div class="error svelte-1hwdvdh" role="alert"> </div>'),W_=E('<div class="edit-box svelte-1hwdvdh"><div class="edit-name-row svelte-1hwdvdh"><span class="name-label svelte-1hwdvdh"> </span> <input type="text" class="text-input svelte-1hwdvdh"/></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div> <div class="edit-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <button type="button" class="save-btn svelte-1hwdvdh"> </button></div></div>'),Y_=E('<div class="tag-row svelte-1hwdvdh"><div class="tag-row-main svelte-1hwdvdh"><span class="grip svelte-1hwdvdh"><!></span> <span class="dot svelte-1hwdvdh"></span> <span class="tag-name svelte-1hwdvdh"> </span></div> <div class="tag-row-actions svelte-1hwdvdh"><button type="button" class="link-btn svelte-1hwdvdh"> </button> <span class="sep svelte-1hwdvdh">|</span> <button type="button" class="link-btn danger svelte-1hwdvdh"> </button></div></div>'),G_=E('<div role="listitem" tabindex="-1"><!></div>'),K_=E('<div class="empty svelte-1hwdvdh"> </div>'),V_=E('<div><h2 class="tab-title svelte-1hwdvdh"> </h2> <div class="add-card svelte-1hwdvdh"><div class="add-row svelte-1hwdvdh"><input type="text" class="text-input svelte-1hwdvdh"/> <button type="button" class="add-btn svelte-1hwdvdh"> </button></div> <div><span class="color-label svelte-1hwdvdh"> </span> <div class="color-grid svelte-1hwdvdh"></div></div></div> <!> <div class="tag-list svelte-1hwdvdh" role="list"></div> <!></div>');function J_(a,t){pt(t,!0);const n=R(bt);let r=H(Oe([])),o=H(""),c=H(Oe(Va)),i=H(null),l=H(""),u=H(Oe(Va)),f=H(null),h=H(null),g=H(null);function _(){return new Date().toISOString()}async function b(){try{const N=await ks();v(r,[...N].sort((B,ce)=>(B.display_order??0)-(ce.display_order??0)||(B.created_at??"").localeCompare(ce.created_at??"")||B.id.localeCompare(ce.id)),!0)}catch{}}$a(()=>{b()}),Pt(()=>{if(!e(f))return;const N=window.setTimeout(()=>v(f,null),3e3);return()=>window.clearTimeout(N)});function k(N,B,ce){const _e=N.slice(),[re]=_e.splice(B,1);return _e.splice(ce,0,re),_e}async function w(){const N=e(o).trim();if(N)try{await Qs({id:crypto.randomUUID(),name:N,color:e(c),display_order:e(r).length,created_at:_(),updated_at:_()}),v(o,""),await b()}catch(B){v(f,String(B),!0)}}async function x(N){try{await Ku(N),await b()}catch(B){v(f,String(B),!0)}}function j(N){v(i,N.id,!0),v(l,N.name,!0),v(u,N.color??Va,!0)}async function S(){if(!e(i))return;const N=e(l).trim();if(!N)return;const B=e(r).find(ce=>ce.id===e(i));if(B){try{await Qs({...B,name:N,color:e(u),updated_at:_()})}catch(ce){v(f,String(ce),!0)}v(i,null),await b()}}function T(N,B){N.dataTransfer&&(v(h,B.id,!0),N.dataTransfer.effectAllowed="move",N.dataTransfer.setData("text/plain",B.id))}function q(N,B){!e(h)||e(h)===B.id||(N.preventDefault(),N.stopPropagation(),N.dataTransfer&&(N.dataTransfer.dropEffect="move"),v(g,B.id,!0))}function A(N,B){N.preventDefault(),N.stopPropagation();const ce=e(h);if(v(h,null),v(g,null),!ce||ce===B.id)return;const _e=e(r).findIndex(ie=>ie.id===ce),re=e(r).findIndex(ie=>ie.id===B.id);if(_e<0||re<0)return;const ve=e(r),L=k(e(r),_e,re);v(r,L,!0);const oe=L.map((ie,me)=>({id:ie.id,display_order:me}));Vu(oe).then(b).catch(async ie=>{v(r,ve,!0),await b(),v(f,String(ie)||e(n).settings.list.reorderFail,!0)})}function O(){v(h,null),v(g,null)}var U=V_(),$=s(U),ee=s($),he=d($,2),ne=s(he),te=s(ne),ue=d(te,2),P=s(ue),G=d(ne,2),de=s(G),be=s(de),ge=d(de,2);Me(ge,20,()=>Jr,N=>N,(N,B)=>{var ce=ki();let _e;M(re=>{_e=Ke(ce,1,"swatch svelte-1hwdvdh",null,_e,{active:e(c)===B}),Ot(ce,`background-color: ${B??""}`),z(ce,"aria-label",re)},[()=>Ct(e(n).settings.tag.colorAria,{color:B})]),J("click",ce,()=>v(c,B,!0)),m(N,ce)});var Te=d(he,2);{var Fe=N=>{var B=U_(),ce=s(B);M(()=>p(ce,e(f))),m(N,B)};le(Te,N=>{e(f)&&N(Fe)})}var et=d(Te,2);Me(et,21,()=>e(r),N=>N.id,(N,B)=>{const ce=R(()=>e(i)===e(B).id);var _e=G_();let re;var ve=s(_e);{var L=ie=>{var me=W_(),De=s(me),je=s(De),Re=s(je),Y=d(je,2);vn(Y,!0);var fe=d(De,2),ke=s(fe),Q=s(ke),y=d(ke,2);Me(y,20,()=>Jr,X=>X,(X,Pe)=>{var Se=ki();let Ue;M(ht=>{Ue=Ke(Se,1,"swatch sm svelte-1hwdvdh",null,Ue,{active:e(u)===Pe}),Ot(Se,`background-color: ${Pe??""}`),z(Se,"aria-label",ht)},[()=>Ct(e(n).settings.tag.colorAria,{color:Pe})]),J("click",Se,()=>v(u,Pe,!0)),m(X,Se)});var D=d(fe,2),K=s(D),V=s(K),W=d(K,2),Z=s(W);M(()=>{p(Re,e(n).settings.tag.nameLabel),p(Q,e(n).settings.tag.colorLabel),p(V,e(n).settings.repeatCustom.cancel),p(Z,e(n).settings.notification.save)}),J("keydown",Y,X=>{X.key==="Enter"&&S(),X.key==="Escape"&&v(i,null)}),wt(Y,()=>e(l),X=>v(l,X)),J("click",K,()=>v(i,null)),J("click",W,S),m(ie,me)},oe=ie=>{var me=Y_(),De=s(me),je=s(De),Re=s(je);bu(Re,{size:16});var Y=d(je,2),fe=d(Y,2),ke=s(fe),Q=d(De,2),y=s(Q),D=s(y),K=d(y,4),V=s(K);M(()=>{z(je,"aria-label",e(n).settings.tag.dragHandle),z(je,"title",e(n).settings.tag.dragHandle),Ot(Y,`background-color: ${e(B).color??Va??""}`),p(ke,e(B).name),p(D,e(n).settings.list.edit),p(V,e(n).settings.list.del)}),J("click",y,()=>j(e(B))),J("click",K,()=>void x(e(B).id)),m(ie,me)};le(ve,ie=>{e(ce)?ie(L):ie(oe,-1)})}M(()=>{re=Ke(_e,1,"tag-card svelte-1hwdvdh",null,re,{dragging:e(h)===e(B).id,"drop-over":e(g)===e(B).id&&e(h)!==null&&e(h)!==e(B).id}),z(_e,"draggable",!e(ce))}),kt("dragstart",_e,ie=>T(ie,e(B))),kt("dragover",_e,ie=>q(ie,e(B))),kt("drop",_e,ie=>A(ie,e(B))),kt("dragend",_e,O),m(N,_e)});var I=d(et,2);{var C=N=>{var B=K_(),ce=s(B);M(()=>p(ce,e(n).settings.tag.empty)),m(N,B)};le(I,N=>{e(r).length===0&&N(C)})}M(()=>{p(ee,e(n).settings.tab.tags),z(te,"placeholder",e(n).settings.tag.namePlaceholder),p(P,e(n).settings.tag.add),p(be,e(n).settings.tag.colorLabel)}),J("keydown",te,N=>{N.key==="Enter"&&w()}),wt(te,()=>e(o),N=>v(o,N)),J("click",ue,w),m(a,U),gt()}St(["keydown","click"]);var wi=E('<span class="badge svelte-wf1h2h"><!></span>'),Q_=E('<button type="button"><!> <span class="card-name svelte-wf1h2h"> </span></button>'),X_=E('<button type="button"><!> <span class="card-name corner svelte-wf1h2h"> </span></button>'),Z_=E('<p class="used svelte-wf1h2h"><!> </p>'),$_=E('<div class="thumb svelte-wf1h2h"></div> <span class="used svelte-wf1h2h"><!> </span> <button type="button" class="clear-btn svelte-wf1h2h"><!> </button>',1),ep=E('<p class="fail svelte-wf1h2h" role="alert"> </p>'),tp=E('<button type="button" class="reset-btn svelte-wf1h2h"><!> </button>'),ap=E('<div class="setting svelte-wf1h2h"><h2 class="tab-title svelte-wf1h2h"> </h2> <p class="desc svelte-wf1h2h"> </p> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="grid svelte-wf1h2h"></div> <p class="hint svelte-wf1h2h"> </p> <!></section> <section class="block svelte-wf1h2h"><h3 class="block-title svelte-wf1h2h"> </h3> <div class="custom-row svelte-wf1h2h"><label class="upload-btn svelte-wf1h2h"><input type="file" accept="image/*" class="file-input svelte-wf1h2h"/> <!> </label> <!></div> <!> <p class="hint svelte-wf1h2h"> </p></section> <!></div>');function np(a,t){pt(t,!0);const n=R(bt),r=R(Kv),o=R(Vv);let c=H(!1);async function i(re){var ie;const ve=re.currentTarget,L=(ie=ve.files)==null?void 0:ie[0];if(!L)return;v(c,!1);const oe=await Zv(L);oe?Xv(oe):v(c,!0),ve.value=""}const l=R(()=>{var re;return((re=e(o))==null?void 0:re.kind)==="preset"?e(o).id:null}),u=R(()=>{var re;return((re=e(o))==null?void 0:re.kind)==="custom"}),f=R(()=>{var re;return e(r)==="default"&&((re=e(o))==null?void 0:re.kind)==="preset"&&e(o).id==="preset-bg-1"}),h=R(()=>{var re,ve;if(((re=e(o))==null?void 0:re.kind)==="preset"){const L=Kr.find(oe=>oe.id===e(o).id);return L?`background-image: ${L.url}`:null}return((ve=e(o))==null?void 0:ve.kind)==="custom"?`background-image: ${e(o).url}`:null});var g=ap(),_=s(g),b=s(_),k=d(_,2),w=s(k),x=d(k,2),j=s(x),S=s(j),T=d(j,2);Me(T,21,()=>oc,re=>re.id,(re,ve)=>{const L=R(()=>e(r)===e(ve).id);var oe=Q_();let ie;var me=s(oe);{var De=Y=>{var fe=wi(),ke=s(fe);on(ke,{size:11,strokeWidth:3}),m(Y,fe)};le(me,Y=>{e(L)&&Y(De)})}var je=d(me,2),Re=s(je);M(()=>{ie=Ke(oe,1,"card svelte-wf1h2h",null,ie,{active:e(L)}),Ot(oe,`background: ${e(ve).preview??""}`),z(oe,"title",e(n).settings.theme.presetName[e(ve).id]),z(oe,"aria-pressed",e(L)),p(Re,e(n).settings.theme.presetName[e(ve).id])}),J("click",oe,()=>Jv(e(ve).id)),m(re,oe)});var q=d(x,2),A=s(q),O=s(A),U=d(A,2);Me(U,21,()=>Kr,re=>re.id,(re,ve)=>{const L=R(()=>e(l)===e(ve).id);var oe=X_();let ie;var me=s(oe);{var De=Y=>{var fe=wi(),ke=s(fe);on(ke,{size:11,strokeWidth:3}),m(Y,fe)};le(me,Y=>{e(L)&&Y(De)})}var je=d(me,2),Re=s(je);M(()=>{ie=Ke(oe,1,"card cover svelte-wf1h2h",null,ie,{active:e(L)}),Ot(oe,`background-image: ${e(ve).url??""}`),z(oe,"title",e(n).settings.theme.presetBgName[e(ve).id]),z(oe,"aria-pressed",e(L)),p(Re,e(n).settings.theme.presetBgName[e(ve).id])}),J("click",oe,()=>Qv(e(ve).id)),m(re,oe)});var $=d(U,2),ee=s($),he=d($,2);{var ne=re=>{var ve=Z_(),L=s(ve);on(L,{size:13});var oe=d(L);M(()=>p(oe,` ${e(n).settings.theme.presetBgUsed??""}`)),m(re,ve)};le(he,re=>{e(l)&&re(ne)})}var te=d(q,2),ue=s(te),P=s(ue),G=d(ue,2),de=s(G),be=s(de),ge=d(be,2);ju(ge,{size:14});var Te=d(ge),Fe=d(de,2);{var et=re=>{var ve=$_(),L=Ne(ve),oe=d(L,2),ie=s(oe);on(ie,{size:13});var me=d(ie),De=d(oe,2),je=s(De);Fl(je,{size:12});var Re=d(je);M(()=>{Ot(L,e(h)),z(L,"aria-label",e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed),p(me,` ${(e(u)?e(n).settings.theme.bgUsed:e(n).settings.theme.presetBgUsed)??""}`),p(Re,` ${e(n).settings.theme.clearBg??""}`)}),J("click",De,function(...Y){To==null||To.apply(this,Y)}),m(re,ve)};le(Fe,re=>{e(o)&&e(h)&&re(et)})}var I=d(G,2);{var C=re=>{var ve=ep(),L=s(ve);M(()=>p(L,e(n).settings.theme.compressFail)),m(re,ve)};le(I,re=>{e(c)&&re(C)})}var N=d(I,2),B=s(N),ce=d(te,2);{var _e=re=>{var ve=tp(),L=s(ve);Su(L,{size:12});var oe=d(L);M(()=>p(oe,` ${e(n).settings.theme.reset??""}`)),J("click",ve,function(...ie){Do==null||Do.apply(this,ie)}),m(re,ve)};le(ce,re=>{e(f)||re(_e)})}M(()=>{p(b,e(n).settings.theme.title),p(w,e(n).settings.theme.desc),p(S,e(n).settings.theme.preset),p(O,e(n).settings.theme.presetBg),p(ee,e(n).settings.theme.presetBgHint),p(P,e(n).settings.theme.custom),p(Te,` ${e(n).settings.theme.upload??""}`),p(B,e(n).settings.theme.customHint)}),J("change",be,i),m(a,g),gt()}St(["click","change"]);var rp=E('<div class="error svelte-16699lq" role="alert"> </div>'),op=E('<div class="empty svelte-16699lq"> </div>'),sp=E('<div class="item svelte-16699lq"><div class="item-main svelte-16699lq"><div class="item-text svelte-16699lq"> </div> <div class="item-author svelte-16699lq"> </div></div> <button type="button" class="del-btn svelte-16699lq"><!></button></div>'),ip=E('<div class="manager svelte-16699lq"><h2 class="tab-title svelte-16699lq"> </h2> <div class="add-card svelte-16699lq"><textarea class="textarea svelte-16699lq"></textarea> <div class="author-row svelte-16699lq"><input type="text" class="author-input svelte-16699lq"/> <button type="button" class="add-btn svelte-16699lq"><!> </button></div></div> <!> <div class="list svelte-16699lq"><!> <!></div></div>');function lp(a,t){pt(t,!0);const n=R(bt),r=500,o=64;let c=H(Oe([])),i=H(""),l=H(""),u=H(null);function f(){return new Date().toISOString()}async function h(){try{v(c,await Ql(),!0)}catch{}}$a(()=>{h()}),Pt(()=>{if(!e(u))return;const P=window.setTimeout(()=>v(u,null),3e3);return()=>window.clearTimeout(P)});function g(){const P=e(i).trim();return P.length<1?e(n).settings.motto.textRequired:P.length>r?e(n).settings.motto.textTooLong:e(l).trim().length>o?e(n).settings.motto.authorTooLong:null}async function _(){const P=g();if(P){v(u,P,!0);return}try{await ov({id:crypto.randomUUID(),text:e(i).trim(),author:e(l).trim()||null,created_at:f(),updated_at:f()}),v(i,""),v(l,""),await h()}catch(G){v(u,String(G),!0)}}async function b(P){try{await sv(P),await h()}catch(G){v(u,String(G),!0)}}var k=ip(),w=s(k),x=s(w),j=d(w,2),S=s(j);z(S,"rows",2);var T=d(S,2),q=s(T),A=d(q,2),O=s(A);Ln(O,{size:14});var U=d(O),$=d(j,2);{var ee=P=>{var G=rp(),de=s(G);M(()=>p(de,e(u))),m(P,G)};le($,P=>{e(u)&&P(ee)})}var he=d($,2),ne=s(he);{var te=P=>{var G=op(),de=s(G);M(()=>p(de,e(n).settings.motto.empty)),m(P,G)};le(ne,P=>{e(c).length===0&&P(te)})}var ue=d(ne,2);Me(ue,17,()=>e(c),P=>P.id,(P,G)=>{var de=sp(),be=s(de),ge=s(be),Te=s(ge),Fe=d(ge,2),et=s(Fe),I=d(be,2),C=s(I);ms(C,{size:14}),M(N=>{p(Te,e(G).text),p(et,`—— ${N??""}`),z(I,"aria-label",e(n).settings.list.del)},[()=>{var N;return(N=e(G).author)!=null&&N.trim()?e(G).author:e(n).settings.motto.defaultAuthor}]),J("click",I,()=>void b(e(G).id)),m(P,de)}),M(()=>{p(x,e(n).settings.motto.title),z(S,"placeholder",e(n).settings.motto.addPlaceholder),z(q,"placeholder",e(n).settings.motto.authorPlaceholder),p(U,` ${e(n).settings.motto.addBtn??""}`)}),wt(S,()=>e(i),P=>v(i,P)),J("keydown",q,P=>{P.key==="Enter"&&_()}),wt(q,()=>e(l),P=>v(l,P)),J("click",A,_),m(a,k),gt()}St(["keydown","click"]);var cp=E("<option> </option>"),dp=E('<div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style-desc"> </label> <input id="notif-style-desc" type="text" class="text-input svelte-s7babn"/></div>'),up=E('<span class="saved svelte-s7babn"> </span>'),vp=E('<span class="save-error svelte-s7babn" role="alert"> </span>'),fp=E('<div class="setting svelte-s7babn"><h2 class="tab-title svelte-s7babn"> </h2> <div class="block svelte-s7babn"><label class="label svelte-s7babn" for="notif-style"> </label> <select id="notif-style" class="select svelte-s7babn"></select> <p class="hint svelte-s7babn"> </p></div> <!> <div class="fields svelte-s7babn"><section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-fe-title"> </label> <input id="ntf-fe-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-fe-body"> </label> <input id="ntf-fe-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-be-title"> </label> <input id="ntf-be-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-be-body"> </label> <input id="ntf-be-body" type="text" class="text-input svelte-s7babn"/></section> <section><h3 class="group-title svelte-s7babn"> </h3> <label class="label svelte-s7babn" for="ntf-rm-title"> </label> <input id="ntf-rm-title" type="text" class="text-input mb svelte-s7babn"/> <label class="label svelte-s7babn" for="ntf-rm-body"> </label> <input id="ntf-rm-body" type="text" class="text-input svelte-s7babn"/> <p class="hint svelte-s7babn"> </p></section></div> <div class="save-row svelte-s7babn"><button type="button" class="save-btn svelte-s7babn"><!> </button> <!> <!></div></div>');function hp(a,t){pt(t,!0);const n=R(bt),r=R(oo);let o=H("default"),c=H(""),i=H(null),l=H(Oe({focus_end_title:"",focus_end_body:"",break_end_title:"",break_end_body:"",reminder_title:"",reminder_body:""})),u=H(!1),f=H(null);const h=R(()=>e(o)==="custom");$a(()=>{Xl().then(W=>{v(o,W.style||"default",!0),v(c,W.style_description||"",!0),v(i,W,!0)}).catch(()=>{})}),Pt(()=>{if(e(h))e(i)&&v(l,{focus_end_title:e(i).focus_end_title||"",focus_end_body:e(i).focus_end_body||"",break_end_title:e(i).break_end_title||"",break_end_body:e(i).break_end_body||"",reminder_title:e(i).reminder_title||"",reminder_body:e(i).reminder_body||""},!0);else{const W=(e(r)==="en"?Bl:Ol)[e(o)];v(l,{focus_end_title:W.focus_end_title,focus_end_body:W.focus_end_body,break_end_title:W.break_end_title,break_end_body:W.break_end_body,reminder_title:W.reminder_title,reminder_body:W.reminder_body},!0)}});async function g(){v(f,null);const W={id:"1",style:e(o),style_description:e(h)?e(c):null,focus_end_title:e(l).focus_end_title,focus_end_body:e(l).focus_end_body,break_end_title:e(l).break_end_title,break_end_body:e(l).break_end_body,reminder_title:e(l).reminder_title,reminder_body:e(l).reminder_body};try{const Z=await iv(W);v(i,Z,!0),await $l(),v(u,!0),window.setTimeout(()=>v(u,!1),2e3)}catch(Z){v(f,String(Z),!0)}}var _=fp(),b=s(_),k=s(b),w=d(b,2),x=s(w),j=s(x),S=d(x,2);Me(S,21,()=>Wu,W=>W.key,(W,Z)=>{var X=cp(),Pe=s(X),Se={};M(()=>{p(Pe,e(n).settings.notification.styleName[e(Z).key]),Se!==(Se=e(Z).key)&&(X.value=(X.__value=e(Z).key)??"")}),m(W,X)});var T=d(S,2),q=s(T),A=d(w,2);{var O=W=>{var Z=dp(),X=s(Z),Pe=s(X),Se=d(X,2);M(()=>{p(Pe,e(n).settings.notification.styleDesc),z(Se,"placeholder",e(n).settings.notification.styleDescPlaceholder)}),wt(Se,()=>e(c),Ue=>v(c,Ue)),m(W,Z)};le(A,W=>{e(h)&&W(O)})}var U=d(A,2),$=s(U),ee=s($),he=s(ee),ne=d(ee,2),te=s(ne),ue=d(ne,2),P=d(ue,2),G=s(P),de=d(P,2),be=d($,2),ge=s(be),Te=s(ge),Fe=d(ge,2),et=s(Fe),I=d(Fe,2),C=d(I,2),N=s(C),B=d(C,2),ce=d(be,2),_e=s(ce),re=s(_e),ve=d(_e,2),L=s(ve),oe=d(ve,2),ie=d(oe,2),me=s(ie),De=d(ie,2),je=d(De,2),Re=s(je),Y=d(U,2),fe=s(Y),ke=s(fe);Tu(ke,{size:14});var Q=d(ke),y=d(fe,2);{var D=W=>{var Z=up(),X=s(Z);M(()=>p(X,e(n).settings.notification.saved)),m(W,Z)};le(y,W=>{e(u)&&W(D)})}var K=d(y,2);{var V=W=>{var Z=vp(),X=s(Z);M(()=>p(X,e(f))),m(W,Z)};le(K,W=>{e(f)&&W(V)})}M(()=>{p(k,e(n).settings.notification.title),p(j,e(n).settings.notification.styleLabel),p(q,e(h)?e(n).settings.notification.styleHintCustom:e(n).settings.notification.styleHintPreset),p(he,e(n).settings.notification.focusEnd),p(te,e(n).settings.notification.titleLabel),ue.disabled=!e(h),p(G,e(n).settings.notification.bodyLabel),de.disabled=!e(h),p(Te,e(n).settings.notification.breakEnd),p(et,e(n).settings.notification.titleLabel),I.disabled=!e(h),p(N,e(n).settings.notification.bodyLabel),B.disabled=!e(h),p(re,e(n).settings.notification.reminder),p(L,e(n).settings.notification.titleLabel),oe.disabled=!e(h),p(me,e(n).settings.notification.bodyLabel),De.disabled=!e(h),p(Re,e(n).settings.notification.placeholderHint),p(Q,` ${e(n).settings.notification.save??""}`)}),Wr(S,()=>e(o),W=>v(o,W)),wt(ue,()=>e(l).focus_end_title,W=>e(l).focus_end_title=W),wt(de,()=>e(l).focus_end_body,W=>e(l).focus_end_body=W),wt(I,()=>e(l).break_end_title,W=>e(l).break_end_title=W),wt(B,()=>e(l).break_end_body,W=>e(l).break_end_body=W),wt(oe,()=>e(l).reminder_title,W=>e(l).reminder_title=W),wt(De,()=>e(l).reminder_body,W=>e(l).reminder_body=W),J("click",fe,g),m(a,_),gt()}St(["click"]);var _p=E('<span class="badge svelte-hb0yns"><!></span>'),pp=E('<button type="button"><!> <span class="label svelte-hb0yns"> </span> <span class="sub svelte-hb0yns"> </span></button>'),gp=E('<div><h2 class="tab-title svelte-hb0yns"> </h2> <p class="desc svelte-hb0yns"> </p> <div class="options svelte-hb0yns"></div></div>');function mp(a,t){pt(t,!0);const n=R(bt),r=R(oo),o=[{key:"zh",label:"中文",sub:"Chinese"},{key:"en",label:"English",sub:"English"}];var c=gp(),i=s(c),l=s(i),u=d(i,2),f=s(u),h=d(u,2);Me(h,21,()=>o,g=>g.key,(g,_)=>{const b=R(()=>e(r)===e(_).key);var k=pp();let w;var x=s(k);{var j=O=>{var U=_p(),$=s(U);on($,{size:16}),m(O,U)};le(x,O=>{e(b)&&O(j)})}var S=d(x,2),T=s(S),q=d(S,2),A=s(q);M(()=>{w=Ke(k,1,"option svelte-hb0yns",null,w,{active:e(b)}),z(k,"aria-pressed",e(b)),p(T,e(_).label),p(A,e(_).sub)}),J("click",k,()=>Bu(e(_).key)),m(g,k)}),M(()=>{p(l,e(n).settings.language.title),p(f,e(n).settings.language.desc)}),m(a,c),gt()}St(["click"]);var bp=E('<span class="indicator svelte-uox1oc" aria-hidden="true"></span>'),yp=E('<button type="button"><!> <!> </button>'),kp=E('<div class="settings-page page-veil svelte-uox1oc"><aside class="menu svelte-uox1oc"><nav class="menu-nav svelte-uox1oc"></nav></aside> <main class="content svelte-uox1oc"><div class="card svelte-uox1oc"><!></div></main></div>');function wp(a,t){pt(t,!0);const n=R(bt);let r=H("timer");const o=R(()=>[{key:"timer",icon:cr,label:e(n).settings.tab.timer},{key:"lists",icon:El,label:e(n).settings.tab.lists},{key:"tags",icon:Cu,label:e(n).settings.tab.tags},{key:"theme",icon:wu,label:e(n).settings.tab.theme},{key:"motto",icon:Nl,label:e(n).settings.tab.motto},{key:"notification",icon:du,label:e(n).settings.tab.notification},{key:"language",icon:yu,label:e(n).settings.tab.language}]);var c=kp();Sr("uox1oc",S=>{kr(()=>{Un.title=e(n).page.settings??""})});var i=s(c),l=s(i);Me(l,21,()=>e(o),S=>S.key,(S,T)=>{const q=R(()=>e(r)===e(T).key);var A=yp();let O;var U=s(A);{var $=ne=>{var te=bp();m(ne,te)};le(U,ne=>{e(q)&&ne($)})}var ee=d(U,2);xr(ee,()=>e(T).icon,(ne,te)=>{te(ne,{size:16})});var he=d(ee);M(()=>{O=Ke(A,1,"menu-item svelte-uox1oc",null,O,{active:e(q)}),z(A,"aria-current",e(q)?"true":void 0),p(he,` ${e(T).label??""}`)}),J("click",A,()=>v(r,e(T).key,!0)),m(S,A)});var u=d(i,2),f=s(u),h=s(f);{var g=S=>{M_(S,{})},_=S=>{H_(S,{})},b=S=>{J_(S,{})},k=S=>{np(S,{})},w=S=>{lp(S,{})},x=S=>{hp(S,{})},j=S=>{mp(S,{})};le(h,S=>{e(r)==="timer"?S(g):e(r)==="lists"?S(_,1):e(r)==="tags"?S(b,2):e(r)==="theme"?S(k,3):e(r)==="motto"?S(w,4):e(r)==="notification"?S(x,5):e(r)==="language"&&S(j,6)})}m(a,c),gt()}St(["click"]);var xp=E('<button type="button"><!> </button>'),Sp=E('<br/> <span class="sub svelte-k6bk06"> </span>',1),Tp=E('<li class="svelte-k6bk06"> <!></li>'),Dp=E('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <ul class="svelte-k6bk06"></ul></section>'),Pp=E('<div class="manual svelte-k6bk06"><h2 class="svelte-k6bk06"> </h2> <!></div>'),Mp=E('<section class="svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p></section>'),Ep=E('<div class="faq"><h2 class="svelte-k6bk06"> </h2> <!></div>'),Cp=E('<li class="svelte-k6bk06"> </li>'),jp=E('<div class="contact"><h2 class="svelte-k6bk06"> </h2> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>522988349@qq.com</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span>18688994926</span></div> <div class="row svelte-k6bk06"><span class="lbl svelte-k6bk06"> </span> <span> </span></div></div> <div class="feedback svelte-k6bk06"><h3 class="svelte-k6bk06"> </h3> <p class="svelte-k6bk06"> </p> <div class="info-box svelte-k6bk06"><div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono svelte-k6bk06"> </div> <div class="hint svelte-k6bk06"> </div></div> <div><span class="lbl xs svelte-k6bk06"> </span> <ul class="body-items svelte-k6bk06"></ul></div> <div><span class="lbl xs svelte-k6bk06"> </span> <div class="mono muted svelte-k6bk06"> </div></div></div></div></div>'),Np=E('<div class="help-page page-veil svelte-k6bk06"><aside class="menu svelte-k6bk06"><nav class="menu-nav"></nav></aside> <main class="content svelte-k6bk06"><div class="card svelte-k6bk06"><!></div></main></div>');function Fp(a,t){pt(t,!0);const n=R(bt);let r=H("manual");const o=["timer","tasks","reminder","repeat","journal","stats","settings"];var c=Np();Sr("k6bk06",k=>{kr(()=>{Un.title=`${e(n).nav.help??""} - PomoFlow`})});var i=s(c),l=s(i);Me(l,21,()=>[{key:"manual",icon:uu},{key:"faq",icon:Ml},{key:"contact",icon:ku}],k=>k.key,(k,w)=>{const x=R(()=>e(r)===e(w).key);var j=xp();let S;var T=s(j);xr(T,()=>e(w).icon,(A,O)=>{O(A,{size:16})});var q=d(T);M(()=>{S=Ke(j,1,"menu-item svelte-k6bk06",null,S,{active:e(x)}),z(j,"aria-current",e(x)?"true":void 0),p(q,` ${e(n).help.tab[e(w).key]??""}`)}),J("click",j,()=>v(r,e(w).key,!0)),m(k,j)});var u=d(i,2),f=s(u),h=s(f);{var g=k=>{var w=Pp(),x=s(w),j=s(x),S=d(x,2);Me(S,16,()=>o,T=>T,(T,q)=>{const A=R(()=>e(n).help.manual[q]);var O=Dp(),U=s(O),$=s(U),ee=d(U,2);Me(ee,21,()=>e(A).items,La,(he,ne)=>{const te=R(()=>e(ne));var ue=Tp(),P=s(ue),G=d(P);{var de=be=>{var ge=Sp(),Te=d(Ne(ge),2),Fe=s(Te);M(()=>p(Fe,e(te).sub)),m(be,ge)};le(G,be=>{e(te).sub&&be(de)})}M(()=>p(P,`${e(te).text??""} `)),m(he,ue)}),M(()=>p($,e(A).title)),m(T,O)}),M(()=>p(j,e(n).help.tab.manual)),m(k,w)},_=k=>{var w=Ep(),x=s(w),j=s(x),S=d(x,2);Me(S,17,()=>e(n).help.faq.items,La,(T,q)=>{var A=Mp(),O=s(A),U=s(O),$=d(O,2),ee=s($);M(()=>{p(U,`Q: ${e(q).q??""}`),p(ee,`A: ${e(q).a??""}`)}),m(T,A)}),M(()=>p(j,e(n).help.tab.faq)),m(k,w)},b=k=>{const w=R(()=>e(n).help.contact);var x=jp(),j=s(x),S=s(j),T=d(j,2),q=s(T),A=d(T,2),O=s(A),U=s(O),$=s(U),ee=d(O,2),he=s(ee),ne=s(he),te=d(ee,2),ue=s(te),P=s(ue),G=d(ue,2),de=s(G),be=d(A,2),ge=s(be),Te=s(ge),Fe=d(ge,2),et=s(Fe),I=d(Fe,2),C=s(I),N=s(C),B=s(N),ce=d(N,2),_e=s(ce),re=d(ce,2),ve=s(re),L=d(C,2),oe=s(L),ie=s(oe),me=d(oe,2);Me(me,21,()=>e(w).bodyItems,La,(ke,Q)=>{var y=Cp(),D=s(y);M(()=>p(D,e(Q))),m(ke,y)});var De=d(L,2),je=s(De),Re=s(je),Y=d(je,2),fe=s(Y);M(()=>{p(S,e(n).help.tab.contact),p(q,e(w).intro),p($,e(w).emailLabel),p(ne,e(w).phoneLabel),p(P,e(w).workHoursLabel),p(de,e(w).workHours),p(Te,e(w).feedbackTitle),p(et,e(w).feedbackDesc),p(B,e(w).subjectLabel),p(_e,e(w).subjectFormat),p(ve,e(w).subjectHint),p(ie,e(w).bodyLabel),p(Re,e(w).exampleLabel),p(fe,e(w).exampleText)}),m(k,x)};le(h,k=>{e(r)==="manual"?k(g):e(r)==="faq"?k(_,1):k(b,-1)})}m(a,c),gt()}St(["click"]);var Ap=E("<button><!> </button>"),Ip=E('<main class="app svelte-1n46o8q"><header class="topbar svelte-1n46o8q"><div class="brand svelte-1n46o8q"><span class="logo svelte-1n46o8q" aria-hidden="true"><!></span> <h1 class="svelte-1n46o8q">PomoFlow</h1></div> <nav class="nav svelte-1n46o8q"></nav></header> <div class="outlet svelte-1n46o8q"><!></div></main>');function Rp(a,t){pt(t,!0);const n=R(bt);Gv(),Pt(()=>{if(!Ts().running)return;const q=setInterval(()=>hv(),1e3);return()=>clearInterval(q)}),$a(()=>{$l(),document.addEventListener("visibilitychange",()=>{document.hidden||_v()}),yv(),Ev()});const r=R(Au),o={timer:cr,tasks:El,stats:gs,settings:Pu,help:Ml};var c=Ip(),i=s(c),l=s(i),u=s(l),f=s(u);ic(f,{size:26});var h=d(l,2);Me(h,21,()=>Iu,T=>T.path,(T,q)=>{const A=R(()=>o[e(q).labelKey]);var O=Ap();let U;var $=s(O);xr($,()=>e(A),(he,ne)=>{ne(he,{size:18})});var ee=d($);M(()=>{U=Ke(O,1,"nav-item svelte-1n46o8q",null,U,{active:e(r)===e(q).path}),z(O,"aria-current",e(r)===e(q).path?"page":void 0),p(ee,` ${e(n).nav[e(q).labelKey]??""}`)}),J("click",O,()=>Il(e(q).path)),m(T,O)});var g=d(i,2),_=s(g);{var b=T=>{vi(T,{})},k=T=>{Xh(T,{})},w=T=>{k_(T,{})},x=T=>{wp(T,{})},j=T=>{Fp(T,{})},S=T=>{vi(T,{})};le(_,T=>{e(r)==="/timer"?T(b):e(r)==="/tasks"?T(k,1):e(r)==="/stats"?T(w,2):e(r)==="/settings"?T(x,3):e(r)==="/help"?T(j,4):T(S,-1)})}M(()=>z(h,"aria-label",e(n).nav.mainNav)),m(a,c),gt()}St(["click"]);qd(Rp,{target:document.getElementById("app")});
