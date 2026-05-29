/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$4=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$6=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$4=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$4,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$4+x):s+o$4+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$4),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$4)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$4),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$4,t+1));)d.push({type:7,index:l}),t+=o$4.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$3=s.litElementPolyfillSupport;o$3?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$2,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e$1=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(s=>t[s]).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return E}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1=o=>o??A;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

/**
 * Miscellaneous helper utilities – ported / simplified from the HA frontend.
 */
// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------
const fireEvent = (node, type, detail, options) => {
    const event = new CustomEvent(type, {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail,
    });
    node.dispatchEvent(event);
    return event;
};
// ---------------------------------------------------------------------------
// Entity helpers
// ---------------------------------------------------------------------------
/** Simple domain.object_id validation that matches HA's implementation. */
const isValidEntityId = (entityId) => /^(\w+)\.(\w+)$/.test(entityId);
/**
 * Computes the display unit for an entity (ported from HA frontend).
 * Returns config.unit if set, otherwise derives from entity state parts.
 */
const computeEntityUnitDisplay = (hass, stateObj, config) => {
    if (!stateObj)
        return "";
    // Explicit unit in config takes precedence
    if (config.unit)
        return config.unit;
    const parts = config.attribute
        ? hass.formatEntityAttributeValueToParts(stateObj, config.attribute)
        : hass.formatEntityStateToParts(stateObj);
    return parts.find((part) => part.type === "unit")?.value ?? "";
};
/**
 * Find entities suitable as defaults for a card stub config.
 * Ported from HA frontend's findEntities utility.
 */
const findEntities = (hass, maxEntities, entities, entitiesFallback, includeDomains, entityFilter) => {
    const result = [];
    const candidates = [...entities, ...entitiesFallback];
    for (const entityId of candidates) {
        if (result.length >= maxEntities)
            break;
        const stateObj = hass.states[entityId];
        if (!stateObj)
            continue;
        if (includeDomains) {
            const domain = entityId.split(".")[0];
            if (!includeDomains.includes(domain))
                continue;
        }
        if (entityFilter && !entityFilter(stateObj))
            continue;
        result.push(entityId);
    }
    if (result.length < maxEntities) {
        for (const [entityId, stateObj] of Object.entries(hass.states)) {
            if (result.length >= maxEntities)
                break;
            if (result.includes(entityId))
                continue;
            if (includeDomains) {
                const domain = entityId.split(".")[0];
                if (!includeDomains.includes(domain))
                    continue;
            }
            if (entityFilter && !entityFilter(stateObj))
                continue;
            result.push(entityId);
        }
    }
    return result;
};
/**
 * Creates the entity-not-found warning message.
 * Tries to use hass.localize; falls back to a plain English string.
 */
const createEntityNotFoundWarning = (hass, entityId) => hass.localize
    ? hass.localize("ui.panel.lovelace.warning.entity_not_found", {
        entity: entityId,
    })
    : `Entity not found: ${entityId}`;
const hasConfigOrEntityChanged = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
element, changedProps) => {
    if (changedProps.has("_config"))
        return true;
    const oldHass = changedProps.get("hass");
    if (!oldHass || !element.hass || !element._config)
        return true;
    const entityId = element._config.entity;
    return (oldHass.states[entityId] !== element.hass.states[entityId] ||
        oldHass.localize !== element.hass.localize ||
        oldHass.locale !== element.hass.locale ||
        oldHass.themes !== element.hass.themes);
};
// ---------------------------------------------------------------------------
// Action helpers
// ---------------------------------------------------------------------------
const hasAction = (config) => config !== undefined && config.action !== "none";
const hasAnyAction = (config) => hasAction(config.tap_action) ||
    hasAction(config.hold_action) ||
    hasAction(config.double_tap_action);
// ---------------------------------------------------------------------------
// Theming
// ---------------------------------------------------------------------------
/**
 * Simplified port of HA's applyThemesOnElement.
 * Applies CSS custom properties from the named theme onto the element.
 */
const applyThemesOnElement = (element, themes, themeName) => {
    if (!themeName || !themes?.themes?.[themeName])
        return;
    const theme = themes.themes[themeName];
    for (const [key, value] of Object.entries(theme)) {
        element.style.setProperty(`--${key}`, value);
    }
};
// ---------------------------------------------------------------------------
// Number formatting (ported from HA frontend)
// ---------------------------------------------------------------------------
var NumberFormat;
(function (NumberFormat) {
    NumberFormat["language"] = "language";
    NumberFormat["system"] = "system";
    NumberFormat["comma_decimal"] = "comma_decimal";
    NumberFormat["decimal_comma"] = "decimal_comma";
    NumberFormat["space_comma"] = "space_comma";
    NumberFormat["quote_decimal"] = "quote_decimal";
    NumberFormat["none"] = "none";
})(NumberFormat || (NumberFormat = {}));
const numberFormatToLocale = (localeOptions) => {
    switch (localeOptions.number_format) {
        case NumberFormat.comma_decimal:
            return ["en-US", "en"];
        case NumberFormat.decimal_comma:
            return ["de", "es", "it"];
        case NumberFormat.space_comma:
            return ["fr", "sv", "cs"];
        case NumberFormat.quote_decimal:
            return ["de-CH"];
        case NumberFormat.system:
            return undefined;
        default:
            return localeOptions.language;
    }
};
const getDefaultFormatOptions = (num, options) => {
    const defaultOptions = {
        maximumFractionDigits: 2,
        ...options,
    };
    if (typeof num !== "string")
        return defaultOptions;
    if (!options ||
        (options.minimumFractionDigits === undefined &&
            options.maximumFractionDigits === undefined)) {
        const digits = num.indexOf(".") > -1 ? num.split(".")[1].length : 0;
        defaultOptions.minimumFractionDigits = digits;
        defaultOptions.maximumFractionDigits = digits;
    }
    return defaultOptions;
};
const formatNumber = (num, localeOptions, options) => {
    const locale = localeOptions ? numberFormatToLocale(localeOptions) : undefined;
    if (localeOptions?.number_format !== NumberFormat.none &&
        !Number.isNaN(Number(num))) {
        return new Intl.NumberFormat(locale, getDefaultFormatOptions(num, options)).format(Number(num));
    }
    if (!Number.isNaN(Number(num)) &&
        num !== "" &&
        localeOptions?.number_format === NumberFormat.none) {
        return new Intl.NumberFormat("en-US", getDefaultFormatOptions(num, { ...options, useGrouping: false })).format(Number(num));
    }
    return String(num);
};
/** Whether to insert a non-breaking space before the % sign (locale-aware). */
const blankBeforePercent = (localeOptions) => {
    switch (localeOptions.language) {
        case "cs":
        case "de":
        case "fi":
        case "fr":
        case "sk":
        case "sv":
            return "\u00a0";
        default:
            return "";
    }
};
// ---------------------------------------------------------------------------
// Render utilities
// ---------------------------------------------------------------------------
/** Runs a callback after the next browser render frame. */
const afterNextRender = (cb) => {
    setTimeout(() => requestAnimationFrame(() => cb()), 0);
};
// ---------------------------------------------------------------------------
// Gauge math (ported from HA frontend src/util/calculate.ts)
// ---------------------------------------------------------------------------
const normalize = (value, min, max) => {
    if (isNaN(value) || isNaN(min) || isNaN(max))
        return 0;
    if (value > max)
        return max;
    if (value < min)
        return min;
    return value;
};
const getValueInPercentage = (value, min, max) => {
    const newMax = max - min;
    const newVal = value - min;
    return (100 * newVal) / newMax;
};

/**
 * Action handler directive – ported from HA frontend.
 * Provides tap / hold / double-tap gesture recognition on Lovelace cards.
 */
// ---------------------------------------------------------------------------
// Deep-equal helper (avoids re-binding when options haven't changed)
// ---------------------------------------------------------------------------
const deepEqual = (a, b) => {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (typeof a !== "object" || a === null || b === null)
        return false;
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length)
        return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
};
// ---------------------------------------------------------------------------
// Touch detection
// ---------------------------------------------------------------------------
const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
let ActionHandler = class ActionHandler extends HTMLElement {
    constructor() {
        super(...arguments);
        this.holdTime = 500;
        this.held = false;
        this.cancelled = false;
    }
    connectedCallback() {
        Object.assign(this.style, {
            position: "fixed",
            width: isTouch ? "100px" : "50px",
            height: isTouch ? "100px" : "50px",
            transform: "translate(-50%, -50%) scale(0)",
            pointerEvents: "none",
            zIndex: "999",
            background: "var(--primary-color)",
            opacity: "0.2",
            borderRadius: "50%",
            transition: "transform 180ms ease-in-out",
        });
        [
            "touchcancel",
            "mouseout",
            "mouseup",
            "touchmove",
            "mousewheel",
            "wheel",
            "scroll",
        ].forEach((ev) => {
            document.addEventListener(ev, () => {
                this.cancelled = true;
                if (this.timer) {
                    this._stopAnimation();
                    clearTimeout(this.timer);
                    this.timer = undefined;
                }
            }, { passive: true });
        });
    }
    bind(element, options = {}) {
        if (element.actionHandler && deepEqual(options, element.actionHandler.options)) {
            return;
        }
        if (element.actionHandler) {
            element.removeEventListener("touchstart", element.actionHandler.start);
            element.removeEventListener("touchend", element.actionHandler.end);
            element.removeEventListener("touchcancel", element.actionHandler.end);
            element.removeEventListener("mousedown", element.actionHandler.start);
            element.removeEventListener("click", element.actionHandler.end);
            element.removeEventListener("keydown", element.actionHandler.handleKeyDown);
        }
        else {
            element.addEventListener("contextmenu", (ev) => {
                ev.preventDefault?.();
                ev.stopPropagation?.();
                return false;
            });
        }
        element.actionHandler = { options };
        if (options.disabled)
            return;
        element.actionHandler.start = (ev) => {
            this.cancelled = false;
            let x;
            let y;
            if (ev.touches) {
                x = ev.touches[0].clientX;
                y = ev.touches[0].clientY;
            }
            else {
                x = ev.clientX;
                y = ev.clientY;
            }
            if (options.hasHold) {
                this.held = false;
                this.timer = window.setTimeout(() => {
                    this._startAnimation(x, y);
                    this.held = true;
                }, this.holdTime);
            }
        };
        element.actionHandler.end = (ev) => {
            if (ev.type === "touchcancel" ||
                (ev.type === "touchend" && this.cancelled)) {
                return;
            }
            const target = ev.target;
            if (ev.cancelable)
                ev.preventDefault();
            if (options.hasHold) {
                clearTimeout(this.timer);
                this._stopAnimation();
                this.timer = undefined;
            }
            if (options.hasHold && this.held) {
                fireEvent(target, "action", { action: "hold" });
            }
            else if (options.hasDoubleClick) {
                if ((ev.type === "click" && ev.detail < 2) ||
                    !this.dblClickTimeout) {
                    this.dblClickTimeout = window.setTimeout(() => {
                        this.dblClickTimeout = undefined;
                        if (options.hasTap !== false) {
                            fireEvent(target, "action", { action: "tap" });
                        }
                    }, 250);
                }
                else {
                    clearTimeout(this.dblClickTimeout);
                    this.dblClickTimeout = undefined;
                    fireEvent(target, "action", { action: "double_tap" });
                }
            }
            else if (options.hasTap !== false) {
                fireEvent(target, "action", { action: "tap" });
            }
        };
        element.actionHandler.handleKeyDown = (ev) => {
            if (!["Enter", " "].includes(ev.key))
                return;
            ev.currentTarget.actionHandler.end(ev);
        };
        element.addEventListener("touchstart", element.actionHandler.start, {
            passive: true,
        });
        element.addEventListener("touchend", element.actionHandler.end);
        element.addEventListener("touchcancel", element.actionHandler.end);
        element.addEventListener("mousedown", element.actionHandler.start, {
            passive: true,
        });
        element.addEventListener("click", element.actionHandler.end);
        element.addEventListener("keydown", element.actionHandler.handleKeyDown);
    }
    _startAnimation(x, y) {
        Object.assign(this.style, {
            left: `${x}px`,
            top: `${y}px`,
            transform: "translate(-50%, -50%) scale(1)",
        });
    }
    _stopAnimation() {
        Object.assign(this.style, {
            left: "",
            top: "",
            transform: "translate(-50%, -50%) scale(0)",
        });
    }
};
ActionHandler = __decorate([
    t$1("ha-gauge-action-handler")
], ActionHandler);
// ---------------------------------------------------------------------------
// Singleton getter
// ---------------------------------------------------------------------------
const getActionHandler = () => {
    const body = document.body;
    const existing = body.querySelector("ha-gauge-action-handler");
    if (existing)
        return existing;
    const handler = document.createElement("ha-gauge-action-handler");
    body.appendChild(handler);
    return handler;
};
const actionHandlerBind = (element, options) => {
    const handler = getActionHandler();
    if (!handler)
        return;
    handler.bind(element, options);
};
// ---------------------------------------------------------------------------
// Lit directive
// ---------------------------------------------------------------------------
const actionHandler = e$1(class extends i$1 {
    update(part, [options]) {
        actionHandlerBind(part.element, options);
        return E;
    }
    render(_options) { }
});

/**
 * Handle Lovelace card actions – ported and simplified from HA frontend.
 */
// ---------------------------------------------------------------------------
// Helpers that mirror HA internals
// ---------------------------------------------------------------------------
const forwardHaptic = (element, type) => {
    fireEvent(element, "haptic", type);
};
const navigate = (path, options) => {
    if (options?.replace) {
        window.history.replaceState(null, "", path);
    }
    else {
        window.history.pushState(null, "", path);
    }
    fireEvent(window, "location-changed", { replace: options?.replace });
};
const showConfirmationDialog = async (element, hass, confirmation, userId) => {
    if (typeof confirmation === "object") {
        // Check exemptions
        if (confirmation.exemptions?.some((e) => e.user === userId)) {
            return true;
        }
        // Try HA dialog first, fall back to window.confirm
        return new Promise((resolve) => {
            try {
                fireEvent(element, "show-dialog", {
                    dialogTag: "ha-dialog-box",
                    dialogImport: () => Promise.resolve(),
                    dialogParams: {
                        text: confirmation.text,
                        title: confirmation.title,
                        dismissText: confirmation.dismissText,
                        confirmText: confirmation.confirmText,
                        confirm: () => resolve(true),
                        cancel: () => resolve(false),
                    },
                });
            }
            catch {
                resolve(window.confirm(confirmation.text ?? "Are you sure?"));
            }
        });
    }
    return true;
};
// ---------------------------------------------------------------------------
// Main handler (mirrors HA's handleAction)
// ---------------------------------------------------------------------------
const handleAction = async (node, hass, config, action) => {
    let actionConfig;
    if (action === "double_tap" && config.double_tap_action) {
        actionConfig = config.double_tap_action;
    }
    else if (action === "hold" && config.hold_action) {
        actionConfig = config.hold_action;
    }
    else if (action === "tap" && config.tap_action) {
        actionConfig = config.tap_action;
    }
    if (!actionConfig) {
        actionConfig = { action: "more-info" };
    }
    // Confirmation dialog
    if (actionConfig.confirmation) {
        forwardHaptic(node, "warning");
        const confirmed = await showConfirmationDialog(node, hass, actionConfig.confirmation, hass.user?.id);
        if (!confirmed)
            return;
    }
    switch (actionConfig.action) {
        case "more-info": {
            const entityId = actionConfig.entity ?? config.entity;
            if (entityId) {
                fireEvent(node, "hass-more-info", { entityId });
            }
            break;
        }
        case "navigate":
            if (actionConfig.navigation_path) {
                navigate(actionConfig.navigation_path, {
                    replace: actionConfig.navigation_replace,
                });
            }
            break;
        case "url":
            if (actionConfig.url_path) {
                window.open(actionConfig.url_path);
            }
            break;
        case "toggle":
            if (config.entity) {
                hass.callService("homeassistant", "toggle", {
                    entity_id: config.entity,
                });
                forwardHaptic(node, "light");
            }
            break;
        case "perform-action":
        case "call-service": {
            const performAction = actionConfig.perform_action ?? actionConfig.service;
            if (!performAction)
                break;
            const [domain, service] = performAction.split(".", 2);
            hass.callService(domain, service, actionConfig.data ?? actionConfig.service_data, actionConfig.target);
            forwardHaptic(node, "light");
            break;
        }
        case "assist":
            fireEvent(node, "show-voice-command-dialog", {
                pipeline_id: actionConfig.pipeline_id ?? "last_used",
                start_listening: actionConfig.start_listening ?? false,
            });
            break;
        case "fire-dom-event":
            fireEvent(node, "ll-custom", actionConfig);
            break;
    }
};

/** Shared constants – kept in a separate file to avoid circular imports. */
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

/**
 * ha-gauge-element  –  bundled gauge SVG component.
 *
 * Functionally identical to HA's built-in <ha-gauge> component.
 * Uses a distinct element name to avoid conflicts with the already-registered
 * <ha-gauge> in the HA frontend and to allow future visual customisation.
 */
const getAngle = (value, min, max) => {
    const percentage = getValueInPercentage(normalize(value, min, max), min, max);
    return (percentage * 180) / 100;
};
let HaGaugeElement = class HaGaugeElement extends i$2 {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.needle = false;
        this.label = "";
        this._angle = 0;
        this._updated = false;
        this._segment_label = "";
        this._rescaleOnConnect = false;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this._rescaleOnConnect) {
            this._rescaleSvg();
            this._rescaleOnConnect = false;
        }
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        afterNextRender(() => {
            this._updated = true;
            if (this.needle) {
                this._angle = getAngle(this.value, this.min, this.max);
            }
            this._segment_label = this._getSegmentLabel();
            this._rescaleSvg();
        });
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("levels") || changedProperties.has("min")) {
            if (this.levels) {
                this._sortedLevels = [...this.levels].sort((a, b) => a.level - b.level);
                if (this._sortedLevels.length > 0 &&
                    this._sortedLevels[0].level !== this.min) {
                    this._sortedLevels.unshift({
                        level: this.min,
                        stroke: "var(--info-color)",
                    });
                }
            }
            else {
                this._sortedLevels = undefined;
            }
        }
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (!this._updated ||
            (!changedProperties.has("value") &&
                !changedProperties.has("valueText") &&
                !changedProperties.has("label") &&
                !changedProperties.has("_segment_label"))) {
            return;
        }
        this._angle = getAngle(this.value, this.min, this.max);
        this._segment_label = this._getSegmentLabel();
        this._rescaleSvg();
    }
    render() {
        const arcRadius = 40;
        const arcLength = Math.PI * arcRadius;
        const valueAngle = getAngle(this.value, this.min, this.max);
        const strokeOffset = this._updated
            ? arcLength * (1 - valueAngle / 180)
            : arcLength;
        return w `
      <svg viewBox="-50 -50 100 55" class="gauge">
        <path
          class="levels-base"
          d="M -40 0 A 40 40 0 0 1 40 0"
        />
        ${this._sortedLevels?.map((level, i, arr) => {
            const startLevel = level.level;
            const endLevel = i + 1 < arr.length ? arr[i + 1].level : this.max;
            const startAngle = getAngle(startLevel, this.min, this.max);
            const endAngle = getAngle(endLevel, this.min, this.max);
            const largeArc = endAngle - startAngle > 180 ? 1 : 0;
            const x1 = -arcRadius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = -arcRadius * Math.sin((startAngle * Math.PI) / 180);
            const isFirst = i === 0;
            const isLast = i === arr.length - 1;
            if (isFirst) {
                return w `
              <path
                class="level"
                stroke="${level.stroke}"
                style="stroke-linecap: butt"
                d="M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 40 0"
              />
            `;
            }
            if (isLast) {
                const offsetAngle = 0.5;
                const midAngle = endAngle - offsetAngle;
                const xm = -arcRadius * Math.cos((midAngle * Math.PI) / 180);
                const ym = -arcRadius * Math.sin((midAngle * Math.PI) / 180);
                return w `
              <path class="level" stroke="${level.stroke}" style="stroke-linecap: butt"
                    d="M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 40 0" />
              <path class="level" stroke="${level.stroke}" style="stroke-linecap: butt"
                    d="M ${xm} ${ym} A ${arcRadius} ${arcRadius} 0 0 1 40 0" />
            `;
            }
            return w `
            <path
              class="level"
              stroke="${level.stroke}"
              style="stroke-linecap: butt"
              d="M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 40 0"
            ></path>
          `;
        })}

        ${this.needle
            ? w `
              <path
                class="needle"
                d="M -34,-3 L -40,-1 A 1,1,0,0,0,-40,1 L -34,3 A 2,2,0,0,0,-34,-3 Z"
                style=${o({ transform: `rotate(${this._angle}deg)` })}
              />
            `
            : w `
              <path
                class="value"
                d="M -40 0 A 40 40 0 0 1 40 0"
                stroke-dasharray="${arcLength}"
                style=${o({ strokeDashoffset: `${strokeOffset}` })}
              />
            `}
      </svg>
      <svg class="text">
        <text
          class="value-text"
          x="0"
          y="-5"
          dominant-baseline="middle"
          text-anchor="middle"
        >
          ${this._segment_label
            ? this._segment_label
            : this.valueText ||
                formatNumber(this.value, this.locale, this.formatOptions)}${this._segment_label
            ? ""
            : this.label === "%"
                ? blankBeforePercent(this.locale) + "%"
                : ` ${this.label}`}
        </text>
      </svg>
    `;
    }
    _rescaleSvg() {
        if (!this.isConnected) {
            this._rescaleOnConnect = true;
            return;
        }
        const svgRoot = this.shadowRoot?.querySelector(".text");
        if (!svgRoot)
            return;
        const box = svgRoot.querySelector("text")?.getBBox();
        if (!box)
            return;
        svgRoot.setAttribute("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
    }
    _getSegmentLabel() {
        if (this._sortedLevels) {
            for (let i = this._sortedLevels.length - 1; i >= 0; i--) {
                if (this.value >= this._sortedLevels[i].level) {
                    return this._sortedLevels[i].label ?? "";
                }
            }
        }
        return "";
    }
};
HaGaugeElement.styles = i$5 `
    :host {
      position: relative;
    }

    .levels-base {
      fill: none;
      stroke: var(--primary-background-color);
      stroke-width: 7.2;
      stroke-linecap: butt;
    }

    .level {
      fill: none;
      stroke-width: 7.2;
      stroke-linecap: butt;
    }

    .value {
      fill: none;
      stroke-width: 7.2;
      stroke: var(--gauge-color);
      stroke-linecap: butt;
      transition: stroke-dashoffset 1s ease 0s;
    }

    .needle {
      fill: var(--primary-text-color);
      stroke: var(--card-background-color);
      color: var(--primary-text-color);
      stroke-width: 1;
      stroke-linecap: round;
      transform-origin: 0 0;
      transition: all 1s ease 0s;
    }

    .text {
      position: absolute;
      max-height: 40%;
      max-width: 55%;
      left: 50%;
      bottom: 13%;
      transform: translate(-50%, 0%);
    }

    .value-text {
      font-size: var(--ha-font-size-l, 1.4rem);
      fill: var(--primary-text-color);
      direction: ltr;
    }
  `;
__decorate([
    n$1({ type: Number })
], HaGaugeElement.prototype, "min", void 0);
__decorate([
    n$1({ type: Number })
], HaGaugeElement.prototype, "max", void 0);
__decorate([
    n$1({ type: Number })
], HaGaugeElement.prototype, "value", void 0);
__decorate([
    n$1({ attribute: false })
], HaGaugeElement.prototype, "formatOptions", void 0);
__decorate([
    n$1({ attribute: false })
], HaGaugeElement.prototype, "valueText", void 0);
__decorate([
    n$1({ attribute: false })
], HaGaugeElement.prototype, "locale", void 0);
__decorate([
    n$1({ type: Boolean })
], HaGaugeElement.prototype, "needle", void 0);
__decorate([
    n$1({ type: Array })
], HaGaugeElement.prototype, "levels", void 0);
__decorate([
    n$1()
], HaGaugeElement.prototype, "label", void 0);
__decorate([
    r()
], HaGaugeElement.prototype, "_angle", void 0);
__decorate([
    r()
], HaGaugeElement.prototype, "_updated", void 0);
__decorate([
    r()
], HaGaugeElement.prototype, "_segment_label", void 0);
HaGaugeElement = __decorate([
    t$1("ha-gauge-element")
], HaGaugeElement);

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}

/**
 * A `StructFailure` represents a single specific failure in validation.
 */
/**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
class StructError extends TypeError {
    constructor(failure, failures) {
        let cached;
        const { message, explanation, ...rest } = failure;
        const { path } = failure;
        const msg = path.length === 0 ? message : `At path: ${path.join('.')} -- ${message}`;
        super(explanation ?? msg);
        if (explanation != null)
            this.cause = msg;
        Object.assign(this, rest);
        this.name = this.constructor.name;
        this.failures = () => {
            return (cached ?? (cached = [failure, ...failures()]));
        };
    }
}

/**
 * Check if a value is an iterator.
 */
function isIterable(x) {
    return isObject(x) && typeof x[Symbol.iterator] === 'function';
}
/**
 * Check if a value is a plain object.
 */
function isObject(x) {
    return typeof x === 'object' && x != null;
}
/**
 * Check if a value is a non-array object.
 */
function isNonArrayObject(x) {
    return isObject(x) && !Array.isArray(x);
}
/**
 * Return a value as a printable string.
 */
function print(value) {
    if (typeof value === 'symbol') {
        return value.toString();
    }
    return typeof value === 'string' ? JSON.stringify(value) : `${value}`;
}
/**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */
function shiftIterator(input) {
    const { done, value } = input.next();
    return done ? undefined : value;
}
/**
 * Convert a single validation result to a failure.
 */
function toFailure(result, context, struct, value) {
    if (result === true) {
        return;
    }
    else if (result === false) {
        result = {};
    }
    else if (typeof result === 'string') {
        result = { message: result };
    }
    const { path, branch } = context;
    const { type } = struct;
    const { refinement, message = `Expected a value of type \`${type}\`${refinement ? ` with refinement \`${refinement}\`` : ''}, but received: \`${print(value)}\``, } = result;
    return {
        value,
        type,
        refinement,
        key: path[path.length - 1],
        path,
        branch,
        ...result,
        message,
    };
}
/**
 * Convert a validation result to an iterable of failures.
 */
function* toFailures(result, context, struct, value) {
    if (!isIterable(result)) {
        result = [result];
    }
    for (const r of result) {
        const failure = toFailure(r, context, struct, value);
        if (failure) {
            yield failure;
        }
    }
}
/**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 */
function* run(value, struct, options = {}) {
    const { path = [], branch = [value], coerce = false, mask = false } = options;
    const ctx = { path, branch, mask };
    if (coerce) {
        value = struct.coercer(value, ctx);
    }
    let status = 'valid';
    for (const failure of struct.validator(value, ctx)) {
        failure.explanation = options.message;
        status = 'not_valid';
        yield [failure, undefined];
    }
    for (let [k, v, s] of struct.entries(value, ctx)) {
        const ts = run(v, s, {
            path: k === undefined ? path : [...path, k],
            branch: k === undefined ? branch : [...branch, v],
            coerce,
            mask,
            message: options.message,
        });
        for (const t of ts) {
            if (t[0]) {
                status = t[0].refinement != null ? 'not_refined' : 'not_valid';
                yield [t[0], undefined];
            }
            else if (coerce) {
                v = t[1];
                if (k === undefined) {
                    value = v;
                }
                else if (value instanceof Map) {
                    value.set(k, v);
                }
                else if (value instanceof Set) {
                    value.add(v);
                }
                else if (isObject(value)) {
                    if (v !== undefined || k in value)
                        value[k] = v;
                }
            }
        }
    }
    if (status !== 'not_valid') {
        for (const failure of struct.refiner(value, ctx)) {
            failure.explanation = options.message;
            status = 'not_refined';
            yield [failure, undefined];
        }
    }
    if (status === 'valid') {
        yield [undefined, value];
    }
}

/**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */
class Struct {
    constructor(props) {
        const { type, schema, validator, refiner, coercer = (value) => value, entries = function* () { }, } = props;
        this.type = type;
        this.schema = schema;
        this.entries = entries;
        this.coercer = coercer;
        if (validator) {
            this.validator = (value, context) => {
                const result = validator(value, context);
                return toFailures(result, context, this, value);
            };
        }
        else {
            this.validator = () => [];
        }
        if (refiner) {
            this.refiner = (value, context) => {
                const result = refiner(value, context);
                return toFailures(result, context, this, value);
            };
        }
        else {
            this.refiner = () => [];
        }
    }
    /**
     * Assert that a value passes the struct's validation, throwing if it doesn't.
     */
    assert(value, message) {
        return assert(value, this, message);
    }
    /**
     * Create a value with the struct's coercion logic, then validate it.
     */
    create(value, message) {
        return create(value, this, message);
    }
    /**
     * Check if a value passes the struct's validation.
     */
    is(value) {
        return is(value, this);
    }
    /**
     * Mask a value, coercing and validating it, but returning only the subset of
     * properties defined by the struct's schema. Masking applies recursively to
     * props of `object` structs only.
     */
    mask(value, message) {
        return mask(value, this, message);
    }
    /**
     * Validate a value with the struct's validation logic, returning a tuple
     * representing the result.
     *
     * You may optionally pass `true` for the `coerce` argument to coerce
     * the value before attempting to validate it. If you do, the result will
     * contain the coerced result when successful. Also, `mask` will turn on
     * masking of the unknown `object` props recursively if passed.
     */
    validate(value, options = {}) {
        return validate(value, this, options);
    }
}
/**
 * Assert that a value passes a struct, throwing if it doesn't.
 */
function assert(value, struct, message) {
    const result = validate(value, struct, { message });
    if (result[0]) {
        throw result[0];
    }
}
/**
 * Create a value with the coercion logic of struct and validate it.
 */
function create(value, struct, message) {
    const result = validate(value, struct, { coerce: true, message });
    if (result[0]) {
        throw result[0];
    }
    else {
        return result[1];
    }
}
/**
 * Mask a value, returning only the subset of properties defined by a struct.
 */
function mask(value, struct, message) {
    const result = validate(value, struct, { coerce: true, mask: true, message });
    if (result[0]) {
        throw result[0];
    }
    else {
        return result[1];
    }
}
/**
 * Check if a value passes a struct.
 */
function is(value, struct) {
    const result = validate(value, struct);
    return !result[0];
}
/**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 */
function validate(value, struct, options = {}) {
    const tuples = run(value, struct, options);
    const tuple = shiftIterator(tuples);
    if (tuple[0]) {
        const error = new StructError(tuple[0], function* () {
            for (const t of tuples) {
                if (t[0]) {
                    yield t[0];
                }
            }
        });
        return [error, undefined];
    }
    else {
        const v = tuple[1];
        return [undefined, v];
    }
}

function assign(...Structs) {
    const isType = Structs[0].type === 'type';
    const schemas = Structs.map((s) => s.schema);
    const schema = Object.assign({}, ...schemas);
    return isType ? type(schema) : object(schema);
}
/**
 * Define a new struct type with a custom validation function.
 */
function define(name, validator) {
    return new Struct({ type: name, schema: null, validator });
}
function array(Element) {
    return new Struct({
        type: 'array',
        schema: Element,
        *entries(value) {
            if (Element && Array.isArray(value)) {
                for (const [i, v] of value.entries()) {
                    yield [i, v, Element];
                }
            }
        },
        coercer(value) {
            return Array.isArray(value) ? value.slice() : value;
        },
        validator(value) {
            return (Array.isArray(value) ||
                `Expected an array value, but received: ${print(value)}`);
        },
    });
}
/**
 * Ensure that a value is a boolean.
 */
function boolean() {
    return define('boolean', (value) => {
        return typeof value === 'boolean';
    });
}
/**
 * Ensure that no value ever passes validation.
 */
function never() {
    return define('never', () => false);
}
/**
 * Ensure that a value is a number.
 */
function number() {
    return define('number', (value) => {
        return ((typeof value === 'number' && !isNaN(value)) ||
            `Expected a number, but received: ${print(value)}`);
    });
}
function object(schema) {
    const knowns = schema ? Object.keys(schema) : [];
    const Never = never();
    return new Struct({
        type: 'object',
        schema: schema ? schema : null,
        *entries(value) {
            if (schema && isObject(value)) {
                const unknowns = new Set(Object.keys(value));
                for (const key of knowns) {
                    unknowns.delete(key);
                    yield [key, value[key], schema[key]];
                }
                for (const key of unknowns) {
                    yield [key, value[key], Never];
                }
            }
        },
        validator(value) {
            return (isNonArrayObject(value) ||
                `Expected an object, but received: ${print(value)}`);
        },
        coercer(value, ctx) {
            if (!isNonArrayObject(value)) {
                return value;
            }
            const coerced = { ...value };
            // The `object` struct has special behaviour enabled by the mask flag.
            // When masking, properties that are not in the schema are deleted from
            // the coerced object instead of eventually failing validaiton.
            if (ctx.mask && schema) {
                for (const key in coerced) {
                    if (schema[key] === undefined) {
                        delete coerced[key];
                    }
                }
            }
            return coerced;
        },
    });
}
/**
 * Augment a struct to allow `undefined` values.
 */
function optional(struct) {
    return new Struct({
        ...struct,
        validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
        refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx),
    });
}
/**
 * Ensure that a value is a string.
 */
function string() {
    return define('string', (value) => {
        return (typeof value === 'string' ||
            `Expected a string, but received: ${print(value)}`);
    });
}
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */
function type(schema) {
    const keys = Object.keys(schema);
    return new Struct({
        type: 'type',
        schema,
        *entries(value) {
            if (isObject(value)) {
                for (const k of keys) {
                    yield [k, value[k], schema[k]];
                }
            }
        },
        validator(value) {
            return (isNonArrayObject(value) ||
                `Expected an object, but received: ${print(value)}`);
        },
        coercer(value) {
            return isNonArrayObject(value) ? { ...value } : value;
        },
    });
}

/**
 * ha-gauge-card-editor  –  Visual config editor for ha-gauge-card.
 *
 * Rendered by HA's Lovelace UI when editing the card.
 * Uses <ha-form> (available at runtime in the HA frontend) to render the form.
 */
// ---------------------------------------------------------------------------
// Struct validation
// ---------------------------------------------------------------------------
const gaugeSegmentStruct = object({
    from: number(),
    color: string(),
    label: optional(string()),
});
const baseLovelaceCardConfig = object({
    type: string(),
    view_layout: optional(object()),
    grid_options: optional(object()),
    visibility: optional(object()),
    layout_options: optional(object()),
});
const cardConfigStruct = assign(baseLovelaceCardConfig, object({
    name: optional(string()),
    entity: optional(string()),
    attribute: optional(string()),
    unit: optional(string()),
    min: optional(number()),
    max: optional(number()),
    severity: optional(object()),
    theme: optional(string()),
    needle: optional(boolean()),
    segments: optional(array(gaugeSegmentStruct)),
    tap_action: optional(object()),
    hold_action: optional(object()),
    double_tap_action: optional(object()),
}));
// ---------------------------------------------------------------------------
// Supported tap actions
// ---------------------------------------------------------------------------
const TAP_ACTIONS = [
    "more-info",
    "navigate",
    "url",
    "perform-action",
    "assist",
    "none",
];
// ACTION_RELATED_CONTEXT tells ha-form to pass entity context into action selectors
const ACTION_RELATED_CONTEXT = { entity: "entity" };
// Attribute names that are not numeric – excluded from the attribute dropdown
const NON_NUMERIC_ATTRIBUTES = [
    "fan_modes",
    "hvac_modes",
    "preset_modes",
    "source_list",
    "sound_mode_list",
    "effect_list",
    "entity_picture",
    "icon",
    "friendly_name",
    "supported_features",
    "rgb_color",
    "hs_color",
    "xy_color",
    "rgbw_color",
    "rgbww_color",
];
// ---------------------------------------------------------------------------
// Editor element
// ---------------------------------------------------------------------------
let HaGaugeCardEditor = class HaGaugeCardEditor extends i$2 {
    constructor() {
        super(...arguments);
        this._schema = memoizeOne((showSeverity, entityId) => [
            {
                name: "entity",
                selector: {
                    entity: {
                        domain: ["counter", "input_number", "number", "sensor"],
                    },
                },
            },
            {
                name: "attribute",
                selector: {
                    attribute: {
                        entity_id: entityId,
                        hide_attributes: NON_NUMERIC_ATTRIBUTES,
                    },
                },
            },
            {
                name: "name",
                selector: { entity_name: {} },
                context: { entity: "entity" },
            },
            { name: "unit", selector: { text: {} } },
            { name: "theme", selector: { theme: {} } },
            {
                name: "",
                type: "grid",
                schema: [
                    {
                        name: "min",
                        default: DEFAULT_MIN,
                        selector: { number: { mode: "box", step: "any" } },
                    },
                    {
                        name: "max",
                        default: DEFAULT_MAX,
                        selector: { number: { mode: "box", step: "any" } },
                    },
                ],
            },
            {
                name: "",
                type: "grid",
                schema: [
                    { name: "needle", selector: { boolean: {} } },
                    { name: "show_severity", selector: { boolean: {} } },
                ],
            },
            ...(showSeverity
                ? [
                    {
                        name: "severity",
                        type: "grid",
                        schema: [
                            {
                                name: "green",
                                selector: { number: { mode: "box", step: "any" } },
                            },
                            {
                                name: "yellow",
                                selector: { number: { mode: "box", step: "any" } },
                            },
                            {
                                name: "red",
                                selector: { number: { mode: "box", step: "any" } },
                            },
                        ],
                    },
                ]
                : []),
            {
                name: "interactions",
                type: "expandable",
                flatten: true,
                iconPath: 
                // mdi:gesture-tap path
                "M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z",
                schema: [
                    {
                        name: "tap_action",
                        selector: {
                            ui_action: {
                                actions: TAP_ACTIONS,
                                default_action: "more-info",
                            },
                        },
                        context: ACTION_RELATED_CONTEXT,
                    },
                    {
                        name: "",
                        type: "optional_actions",
                        flatten: true,
                        schema: ["hold_action", "double_tap_action"].map((action) => ({
                            name: action,
                            selector: {
                                ui_action: {
                                    actions: TAP_ACTIONS,
                                    default_action: "none",
                                },
                            },
                            context: ACTION_RELATED_CONTEXT,
                        })),
                    },
                ],
            },
        ]);
        this._computeLabelCallback = (schema) => {
            if (!this.hass)
                return schema.name;
            switch (schema.name) {
                case "name":
                    return this.hass.localize("ui.panel.lovelace.editor.card.generic.name");
                case "entity":
                    return `${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")})`;
                case "max":
                    return this.hass.localize("ui.panel.lovelace.editor.card.generic.maximum");
                case "min":
                    return this.hass.localize("ui.panel.lovelace.editor.card.generic.minimum");
                case "show_severity":
                    return this.hass.localize("ui.panel.lovelace.editor.card.gauge.severity.define");
                case "needle":
                    return this.hass.localize("ui.panel.lovelace.editor.card.gauge.needle_gauge");
                case "theme":
                    return `${this.hass.localize("ui.panel.lovelace.editor.card.generic.theme")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`;
                case "unit":
                    return this.hass.localize("ui.panel.lovelace.editor.card.generic.unit");
                case "interactions":
                    return this.hass.localize("ui.panel.lovelace.editor.card.generic.interactions");
                case "tap_action":
                case "hold_action":
                case "double_tap_action":
                    return `${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`;
                case "attribute":
                    return this.hass.localize("ui.panel.lovelace.editor.card.generic.attribute");
                default:
                    // "green" | "yellow" | "red"
                    return this.hass.localize(`ui.panel.lovelace.editor.card.gauge.severity.${schema.name}`);
            }
        };
    }
    setConfig(config) {
        assert(config, cardConfigStruct);
        this._config = config;
    }
    render() {
        if (!this.hass || !this._config)
            return A;
        const schema = this._schema(this._config.severity !== undefined, this._config.entity);
        const data = {
            show_severity: this._config.severity !== undefined,
            ...this._config,
        };
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
    _valueChanged(ev) {
        let config = ev.detail.value;
        if (config.show_severity) {
            const severity = config.severity;
            config = {
                ...config,
                severity: {
                    green: config.green ?? severity?.green ?? 0,
                    yellow: config.yellow ?? severity?.yellow ?? 0,
                    red: config.red ?? severity?.red ?? 0,
                },
            };
        }
        else if (!config.show_severity && config.severity) {
            delete config.severity;
        }
        delete config.show_severity;
        delete config.green;
        delete config.yellow;
        delete config.red;
        fireEvent(this, "config-changed", { config });
    }
};
__decorate([
    n$1({ attribute: false })
], HaGaugeCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], HaGaugeCardEditor.prototype, "_config", void 0);
HaGaugeCardEditor = __decorate([
    t$1("ha-gauge-card-editor")
], HaGaugeCardEditor);

/**
 * ha-gauge-card  –  HACS custom gauge card.
 *
 * Functionally identical to the built-in Home Assistant gauge card.
 * Card type: custom:ha-gauge-card
 */
const severityMap = {
    red: "var(--error-color)",
    green: "var(--success-color)",
    yellow: "var(--warning-color)",
    normal: "var(--info-color)",
};
const UNAVAILABLE = "unavailable";
// ---------------------------------------------------------------------------
// Card element
// ---------------------------------------------------------------------------
let HaGaugeCard = class HaGaugeCard extends i$2 {
    constructor() {
        super(...arguments);
        this._gaugeSizePx = 250;
    }
    static async getConfigElement() {
        return document.createElement("ha-gauge-card-editor");
    }
    static getStubConfig(hass, entities, entitiesFallback) {
        const includeDomains = ["counter", "input_number", "number", "sensor"];
        const entityFilter = (stateObj) => !isNaN(Number(stateObj.state));
        const foundEntities = findEntities(hass, 1, entities, entitiesFallback, includeDomains, entityFilter);
        return { type: "custom:ha-gauge-card", entity: foundEntities[0] || "" };
    }
    getCardSize() {
        return 4;
    }
    setConfig(config) {
        if (!config.entity) {
            throw new Error("Entity must be specified");
        }
        if (!isValidEntityId(config.entity)) {
            throw new Error("Invalid entity");
        }
        this._config = { min: DEFAULT_MIN, max: DEFAULT_MAX, ...config };
    }
    render() {
        if (!this._config || !this.hass)
            return A;
        const stateObj = this.hass.states[this._config.entity];
        if (!stateObj) {
            return b `
        <hui-warning .hass=${this.hass}>
          ${createEntityNotFoundWarning(this.hass, this._config.entity)}
        </hui-warning>
      `;
        }
        if (stateObj.state === UNAVAILABLE) {
            return b `
        <hui-warning>
          ${this.hass.localize("ui.panel.lovelace.warning.entity_unavailable", { entity: this._config.entity })}
        </hui-warning>
      `;
        }
        let parts;
        if (this._config.attribute) {
            parts = this.hass.formatEntityAttributeValueToParts(stateObj, this._config.attribute);
        }
        else {
            parts = this.hass.formatEntityStateToParts(stateObj);
        }
        const valueToDisplay = parts.find((part) => part.type === "value")?.value;
        const value = this._config.attribute
            ? stateObj.attributes[this._config.attribute]
            : stateObj.state;
        if (isNaN(Number(value))) {
            return b `
        <hui-warning>
          ${this.hass.localize(this._config.attribute
                ? "ui.panel.lovelace.warning.attribute_not_numeric"
                : "ui.panel.lovelace.warning.entity_non_numeric", {
                entity: this._config.entity,
                attribute: this._config.attribute,
            })}
        </hui-warning>
      `;
        }
        const name = this.hass.formatEntityName(stateObj, this._config.name);
        const unit = computeEntityUnitDisplay(this.hass, stateObj, this._config) ?? "";
        return b `
      <ha-card
        class=${e({
            action: hasAnyAction(this._config),
        })}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleClick: hasAction(this._config.double_tap_action),
        })}
        tabindex=${o$1(!this._config.tap_action || hasAction(this._config.tap_action)
            ? "0"
            : undefined)}
      >
        <div class="gauge-wrap">
          <ha-gauge-element
            .min=${this._config.min}
            .max=${this._config.max}
            .value=${Number(value)}
            .valueText=${valueToDisplay}
            .locale=${this.hass.locale}
            .label=${unit}
            style=${o({
            "--gauge-color": this._computeSeverity(Number(value)),
            width: `${this._gaugeSizePx}px`,
        })}
            .needle=${this._config.needle}
            .levels=${this._config.needle ? this._severityLevels() : undefined}
          ></ha-gauge-element>
        </div>
        <p class="title" .title=${name}>${name}</p>
      </ha-card>
    `;
    }
    shouldUpdate(changedProps) {
        return hasConfigOrEntityChanged(this, changedProps);
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (!this._config || !this.hass)
            return;
        const oldHass = changedProps.get("hass");
        const oldConfig = changedProps.get("_config");
        if (!oldHass ||
            !oldConfig ||
            oldHass.themes !== this.hass.themes ||
            oldConfig.theme !== this._config.theme) {
            applyThemesOnElement(this, this.hass.themes, this._config.theme);
        }
        this._watchCardResize();
        this._updateGaugeSize();
    }
    firstUpdated() {
        this._watchCardResize();
        this._updateGaugeSize();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._resizeObserver?.disconnect();
        this._resizeObserver = undefined;
    }
    _watchCardResize() {
        const card = this.renderRoot?.querySelector("ha-card");
        if (!card || this._resizeObserver) {
            return;
        }
        this._resizeObserver = new ResizeObserver(() => {
            this._updateGaugeSize();
        });
        this._resizeObserver.observe(card);
    }
    _updateGaugeSize() {
        const card = this.renderRoot?.querySelector("ha-card");
        if (!card) {
            return;
        }
        const title = this.renderRoot?.querySelector(".title");
        const cardStyle = getComputedStyle(card);
        const paddingX = parseFloat(cardStyle.paddingLeft || "0") +
            parseFloat(cardStyle.paddingRight || "0");
        const paddingY = parseFloat(cardStyle.paddingTop || "0") +
            parseFloat(cardStyle.paddingBottom || "0");
        const innerWidth = Math.max(0, card.clientWidth - paddingX);
        const innerHeight = Math.max(0, card.clientHeight - paddingY);
        const titleHeight = title?.getBoundingClientRect().height ?? 0;
        const gaugeAvailableHeight = Math.max(40, innerHeight - titleHeight + 8);
        // Match the gauge SVG aspect ratio (viewBox width:100 height:55).
        const gaugeAspect = 100 / 55;
        const maxWidthByHeight = gaugeAvailableHeight * gaugeAspect;
        const nextSize = Math.max(72, Math.floor(Math.min(innerWidth, maxWidthByHeight)));
        if (Math.abs(nextSize - this._gaugeSizePx) > 1) {
            this._gaugeSizePx = nextSize;
        }
    }
    _computeSeverity(numberValue) {
        if (this._config.needle)
            return undefined;
        // New segments format
        const segments = this._config.segments;
        if (segments) {
            const sorted = [...segments].sort((a, b) => a.from - b.from);
            for (let i = 0; i < sorted.length; i++) {
                const segment = sorted[i];
                if (segment &&
                    numberValue >= segment.from &&
                    (i + 1 === sorted.length || numberValue < sorted[i + 1]?.from)) {
                    return segment.color;
                }
            }
            return severityMap.normal;
        }
        // Legacy severity format
        const sections = this._config.severity;
        if (!sections)
            return severityMap.normal;
        const sectionsArray = Object.keys(sections);
        const sortable = sectionsArray.map((severity) => [severity, sections[severity]]);
        for (const severity of sortable) {
            if (severityMap[severity[0]] == null || isNaN(severity[1])) {
                return severityMap.normal;
            }
        }
        sortable.sort((a, b) => a[1] - b[1]);
        if (numberValue >= sortable[0][1] && numberValue < sortable[1][1]) {
            return severityMap[sortable[0][0]];
        }
        if (numberValue >= sortable[1][1] && numberValue < sortable[2][1]) {
            return severityMap[sortable[1][0]];
        }
        if (numberValue >= sortable[2][1]) {
            return severityMap[sortable[2][0]];
        }
        return severityMap.normal;
    }
    _severityLevels() {
        // New segments format
        const segments = this._config.segments;
        if (segments) {
            return segments.map((segment) => ({
                level: segment?.from,
                stroke: segment?.color,
                label: segment?.label,
            }));
        }
        // Legacy severity format
        const sections = this._config.severity;
        if (!sections) {
            return [{ level: 0, stroke: severityMap.normal }];
        }
        const sectionsArray = Object.keys(sections);
        return sectionsArray.map((severity) => ({
            level: sections[severity],
            stroke: severityMap[severity],
        }));
    }
    _handleAction(ev) {
        handleAction(this, this.hass, this._config, ev.detail.action);
    }
};
HaGaugeCard.styles = i$5 `
    ha-card {
      height: 100%;
      overflow: hidden;
      padding-inline: calc(var(--ha-space-3, 12px) * 0.6);
      padding-block: clamp(2px, 1.8%, calc(var(--ha-space-3, 12px) * 0.6));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0;
      box-sizing: border-box;
    }

    ha-card.action {
      cursor: pointer;
    }

    ha-card:focus {
      outline: none;
    }

    .gauge-wrap {
      width: 100%;
      min-height: 0;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .title {
      width: 100%;
      font-size: var(--ha-font-size-m, 1rem);
      line-height: var(--ha-line-height-expanded, 1.5);
      margin: -6px 0 0;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: none;
      color: var(--primary-text-color);
    }

    ha-gauge-element {
      display: block;
      max-width: 100%;
      flex: none;
    }
  `;
__decorate([
    n$1({ attribute: false })
], HaGaugeCard.prototype, "hass", void 0);
__decorate([
    r()
], HaGaugeCard.prototype, "_config", void 0);
__decorate([
    r()
], HaGaugeCard.prototype, "_gaugeSizePx", void 0);
HaGaugeCard = __decorate([
    t$1("ha-gauge-card")
], HaGaugeCard);

/**
 * ha-gauge  –  HACS custom gauge card entry point.
 *
 * Registers the card with Home Assistant's custom card registry so it appears
 * in the card picker with a proper name and preview icon.
 */
const CARD_VERSION = "1.0.5";
// Register card with Home Assistant's custom card registry
window.customCards =
    window.customCards || [];
window.customCards.push({
    type: "ha-gauge-card",
    name: "HA Gauge",
    description: "A gauge card – functionally identical to the built-in gauge card, ready for visual customisation.",
    preview: true,
    version: CARD_VERSION,
    documentationURL: "https://github.com/neo170/ha-gauge",
});
console.info(`%c HA-GAUGE-CARD v${CARD_VERSION} %c Loaded `, "color: #fff; background: #3498db; font-weight: bold; padding: 2px 6px; border-radius: 3px 0 0 3px;", "color: #3498db; background: #ecf0f1; font-weight: bold; padding: 2px 6px; border-radius: 0 3px 3px 0;");
