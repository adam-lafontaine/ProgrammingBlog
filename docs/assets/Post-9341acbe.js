import{d as ut,h as ft,i as z,o as dt,r as gt,c as W,a as R,t as V,F as ve,j as pt,b as Te,w as ke,u as me,k as ht,l as _t,p as Et,m as bt,e as $,f as Ae,g as Ce,_ as wt}from"./index-cac98452.js";import{D as Nt,F as yt}from"./Footer-c2e15bbb.js";function xt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function je(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],l=typeof n;(l==="object"||l==="function")&&!Object.isFrozen(n)&&je(n)}),e}class Ie{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Fe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function P(e,...t){const n=Object.create(null);for(const l in e)n[l]=e[l];return t.forEach(function(l){for(const p in l)n[p]=l[p]}),n}const Mt="</span>",Le=e=>!!e.scope,Ot=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((l,p)=>`${l}${"_".repeat(p+1)}`)].join(" ")}return`${t}${e}`};class St{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Fe(t)}openNode(t){if(!Le(t))return;const n=Ot(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Le(t)&&(this.buffer+=Mt)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const De=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class he{constructor(){this.rootNode=De(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=De({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(l=>this._walk(t,l)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{he._collapse(n)}))}}class Rt extends he{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const l=t.root;n&&(l.scope=`language:${n}`),this.add(l)}toHTML(){return new St(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Z(e){return e?typeof e=="string"?e:e.source:null}function Ge(e){return F("(?=",e,")")}function vt(e){return F("(?:",e,")*")}function Tt(e){return F("(?:",e,")?")}function F(...e){return e.map(n=>Z(n)).join("")}function kt(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function _e(...e){return"("+(kt(e).capture?"":"?:")+e.map(l=>Z(l)).join("|")+")"}function Ke(e){return new RegExp(e.toString()+"|").exec("").length-1}function mt(e,t){const n=e&&e.exec(t);return n&&n.index===0}const At=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ee(e,{joinWith:t}){let n=0;return e.map(l=>{n+=1;const p=n;let E=Z(l),o="";for(;E.length>0;){const i=At.exec(E);if(!i){o+=E;break}o+=E.substring(0,i.index),E=E.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?o+="\\"+String(Number(i[1])+p):(o+=i[0],i[0]==="("&&n++)}return o}).map(l=>`(${l})`).join(t)}const Ct=/\b\B/,ze="[a-zA-Z]\\w*",be="[a-zA-Z_]\\w*",We="\\b\\d+(\\.\\d+)?",qe="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Xe="\\b(0b[01]+)",It="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Lt=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=F(t,/.*\b/,e.binary,/\b.*/)),P({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,l)=>{n.index!==0&&l.ignoreMatch()}},e)},J={begin:"\\\\[\\s\\S]",relevance:0},Dt={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[J]},Bt={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[J]},Pt={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ae=function(e,t,n={}){const l=P({scope:"comment",begin:e,end:t,contains:[]},n);l.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const p=_e("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return l.contains.push({begin:F(/[ ]+/,"(",p,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),l},Ht=ae("//","$"),Ut=ae("/\\*","\\*/"),$t=ae("#","$"),jt={scope:"number",begin:We,relevance:0},Ft={scope:"number",begin:qe,relevance:0},Gt={scope:"number",begin:Xe,relevance:0},Kt={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[J,{begin:/\[/,end:/\]/,relevance:0,contains:[J]}]}]},zt={scope:"title",begin:ze,relevance:0},Wt={scope:"title",begin:be,relevance:0},qt={begin:"\\.\\s*"+be,relevance:0},Xt=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var ie=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Ct,IDENT_RE:ze,UNDERSCORE_IDENT_RE:be,NUMBER_RE:We,C_NUMBER_RE:qe,BINARY_NUMBER_RE:Xe,RE_STARTERS_RE:It,SHEBANG:Lt,BACKSLASH_ESCAPE:J,APOS_STRING_MODE:Dt,QUOTE_STRING_MODE:Bt,PHRASAL_WORDS_MODE:Pt,COMMENT:ae,C_LINE_COMMENT_MODE:Ht,C_BLOCK_COMMENT_MODE:Ut,HASH_COMMENT_MODE:$t,NUMBER_MODE:jt,C_NUMBER_MODE:Ft,BINARY_NUMBER_MODE:Gt,REGEXP_MODE:Kt,TITLE_MODE:zt,UNDERSCORE_TITLE_MODE:Wt,METHOD_GUARD:qt,END_SAME_AS_BEGIN:Xt});function Yt(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Vt(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Zt(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Yt,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Jt(e,t){Array.isArray(e.illegal)&&(e.illegal=_e(...e.illegal))}function Qt(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function en(e,t){e.relevance===void 0&&(e.relevance=1)}const tn=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(l=>{delete e[l]}),e.keywords=n.keywords,e.begin=F(n.beforeMatch,Ge(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},nn=["of","and","for","in","not","or","if","then","parent","list","value"],sn="keyword";function Ye(e,t,n=sn){const l=Object.create(null);return typeof e=="string"?p(n,e.split(" ")):Array.isArray(e)?p(n,e):Object.keys(e).forEach(function(E){Object.assign(l,Ye(e[E],t,E))}),l;function p(E,o){t&&(o=o.map(i=>i.toLowerCase())),o.forEach(function(i){const u=i.split("|");l[u[0]]=[E,rn(u[0],u[1])]})}}function rn(e,t){return t?Number(t):on(e)?0:1}function on(e){return nn.includes(e.toLowerCase())}const Be={},j=e=>{console.error(e)},Pe=(e,...t)=>{console.log(`WARN: ${e}`,...t)},q=(e,t)=>{Be[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Be[`${e}/${t}`]=!0)},oe=new Error;function Ve(e,t,{key:n}){let l=0;const p=e[n],E={},o={};for(let i=1;i<=t.length;i++)o[i+l]=p[i],E[i+l]=!0,l+=Ke(t[i-1]);e[n]=o,e[n]._emit=E,e[n]._multi=!0}function an(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw j("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),oe;if(typeof e.beginScope!="object"||e.beginScope===null)throw j("beginScope must be object"),oe;Ve(e,e.begin,{key:"beginScope"}),e.begin=Ee(e.begin,{joinWith:""})}}function cn(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw j("skip, excludeEnd, returnEnd not compatible with endScope: {}"),oe;if(typeof e.endScope!="object"||e.endScope===null)throw j("endScope must be object"),oe;Ve(e,e.end,{key:"endScope"}),e.end=Ee(e.end,{joinWith:""})}}function ln(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function un(e){ln(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),an(e),cn(e)}function fn(e){function t(o,i){return new RegExp(Z(o),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,u){u.position=this.position++,this.matchIndexes[this.matchAt]=u,this.regexes.push([u,i]),this.matchAt+=Ke(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const i=this.regexes.map(u=>u[1]);this.matcherRe=t(Ee(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;const u=this.matcherRe.exec(i);if(!u)return null;const h=u.findIndex((T,H)=>H>0&&T!==void 0),b=this.matchIndexes[h];return u.splice(0,h),Object.assign(u,b)}}class l{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];const u=new n;return this.rules.slice(i).forEach(([h,b])=>u.addRule(h,b)),u.compile(),this.multiRegexes[i]=u,u}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,u){this.rules.push([i,u]),u.type==="begin"&&this.count++}exec(i){const u=this.getMatcher(this.regexIndex);u.lastIndex=this.lastIndex;let h=u.exec(i);if(this.resumingScanAtSamePosition()&&!(h&&h.index===this.lastIndex)){const b=this.getMatcher(0);b.lastIndex=this.lastIndex+1,h=b.exec(i)}return h&&(this.regexIndex+=h.position+1,this.regexIndex===this.count&&this.considerAll()),h}}function p(o){const i=new l;return o.contains.forEach(u=>i.addRule(u.begin,{rule:u,type:"begin"})),o.terminatorEnd&&i.addRule(o.terminatorEnd,{type:"end"}),o.illegal&&i.addRule(o.illegal,{type:"illegal"}),i}function E(o,i){const u=o;if(o.isCompiled)return u;[Vt,Qt,un,tn].forEach(b=>b(o,i)),e.compilerExtensions.forEach(b=>b(o,i)),o.__beforeBegin=null,[Zt,Jt,en].forEach(b=>b(o,i)),o.isCompiled=!0;let h=null;return typeof o.keywords=="object"&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),h=o.keywords.$pattern,delete o.keywords.$pattern),h=h||/\w+/,o.keywords&&(o.keywords=Ye(o.keywords,e.case_insensitive)),u.keywordPatternRe=t(h,!0),i&&(o.begin||(o.begin=/\B|\b/),u.beginRe=t(u.begin),!o.end&&!o.endsWithParent&&(o.end=/\B|\b/),o.end&&(u.endRe=t(u.end)),u.terminatorEnd=Z(u.end)||"",o.endsWithParent&&i.terminatorEnd&&(u.terminatorEnd+=(o.end?"|":"")+i.terminatorEnd)),o.illegal&&(u.illegalRe=t(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map(function(b){return dn(b==="self"?o:b)})),o.contains.forEach(function(b){E(b,u)}),o.starts&&E(o.starts,i),u.matcher=p(u),u}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=P(e.classNameAliases||{}),E(e)}function Ze(e){return e?e.endsWithParent||Ze(e.starts):!1}function dn(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return P(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ze(e)?P(e,{starts:e.starts?P(e.starts):null}):Object.isFrozen(e)?P(e):e}var gn="11.8.0";class pn extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const pe=Fe,He=P,Ue=Symbol("nomatch"),hn=7,Je=function(e){const t=Object.create(null),n=Object.create(null),l=[];let p=!0;const E="Could not find the language '{}', did you forget to load/include a language module?",o={disableAutodetect:!0,name:"Plain text",contains:[]};let i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Rt};function u(s){return i.noHighlightRe.test(s)}function h(s){let c=s.className+" ";c+=s.parentNode?s.parentNode.className:"";const g=i.languageDetectRe.exec(c);if(g){const w=D(g[1]);return w||(Pe(E.replace("{}",g[1])),Pe("Falling back to no-highlight mode for this block.",s)),w?g[1]:"no-highlight"}return c.split(/\s+/).find(w=>u(w)||D(w))}function b(s,c,g){let w="",y="";typeof c=="object"?(w=s,g=c.ignoreIllegals,y=c.language):(q("10.7.0","highlight(lang, code, ...args) has been deprecated."),q("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),y=s,w=c),g===void 0&&(g=!0);const m={code:w,language:y};ee("before:highlight",m);const B=m.result?m.result:T(m.language,m.code,g);return B.code=m.code,ee("after:highlight",B),B}function T(s,c,g,w){const y=Object.create(null);function m(r,a){return r.keywords[a]}function B(){if(!f.keywords){x.addText(N);return}let r=0;f.keywordPatternRe.lastIndex=0;let a=f.keywordPatternRe.exec(N),d="";for(;a;){d+=N.substring(r,a.index);const _=C.case_insensitive?a[0].toLowerCase():a[0],O=m(f,_);if(O){const[I,ct]=O;if(x.addText(d),d="",y[_]=(y[_]||0)+1,y[_]<=hn&&(se+=ct),I.startsWith("_"))d+=a[0];else{const lt=C.classNameAliases[I]||I;A(a[0],lt)}}else d+=a[0];r=f.keywordPatternRe.lastIndex,a=f.keywordPatternRe.exec(N)}d+=N.substring(r),x.addText(d)}function te(){if(N==="")return;let r=null;if(typeof f.subLanguage=="string"){if(!t[f.subLanguage]){x.addText(N);return}r=T(f.subLanguage,N,!0,Re[f.subLanguage]),Re[f.subLanguage]=r._top}else r=L(N,f.subLanguage.length?f.subLanguage:null);f.relevance>0&&(se+=r.relevance),x.__addSublanguage(r._emitter,r.language)}function v(){f.subLanguage!=null?te():B(),N=""}function A(r,a){r!==""&&(x.startScope(a),x.addText(r),x.endScope())}function xe(r,a){let d=1;const _=a.length-1;for(;d<=_;){if(!r._emit[d]){d++;continue}const O=C.classNameAliases[r[d]]||r[d],I=a[d];O?A(I,O):(N=I,B(),N=""),d++}}function Me(r,a){return r.scope&&typeof r.scope=="string"&&x.openNode(C.classNameAliases[r.scope]||r.scope),r.beginScope&&(r.beginScope._wrap?(A(N,C.classNameAliases[r.beginScope._wrap]||r.beginScope._wrap),N=""):r.beginScope._multi&&(xe(r.beginScope,a),N="")),f=Object.create(r,{parent:{value:f}}),f}function Oe(r,a,d){let _=mt(r.endRe,d);if(_){if(r["on:end"]){const O=new Ie(r);r["on:end"](a,O),O.isMatchIgnored&&(_=!1)}if(_){for(;r.endsParent&&r.parent;)r=r.parent;return r}}if(r.endsWithParent)return Oe(r.parent,a,d)}function st(r){return f.matcher.regexIndex===0?(N+=r[0],1):(ge=!0,0)}function it(r){const a=r[0],d=r.rule,_=new Ie(d),O=[d.__beforeBegin,d["on:begin"]];for(const I of O)if(I&&(I(r,_),_.isMatchIgnored))return st(a);return d.skip?N+=a:(d.excludeBegin&&(N+=a),v(),!d.returnBegin&&!d.excludeBegin&&(N=a)),Me(d,r),d.returnBegin?0:a.length}function rt(r){const a=r[0],d=c.substring(r.index),_=Oe(f,r,d);if(!_)return Ue;const O=f;f.endScope&&f.endScope._wrap?(v(),A(a,f.endScope._wrap)):f.endScope&&f.endScope._multi?(v(),xe(f.endScope,r)):O.skip?N+=a:(O.returnEnd||O.excludeEnd||(N+=a),v(),O.excludeEnd&&(N=a));do f.scope&&x.closeNode(),!f.skip&&!f.subLanguage&&(se+=f.relevance),f=f.parent;while(f!==_.parent);return _.starts&&Me(_.starts,r),O.returnEnd?0:a.length}function ot(){const r=[];for(let a=f;a!==C;a=a.parent)a.scope&&r.unshift(a.scope);r.forEach(a=>x.openNode(a))}let ne={};function Se(r,a){const d=a&&a[0];if(N+=r,d==null)return v(),0;if(ne.type==="begin"&&a.type==="end"&&ne.index===a.index&&d===""){if(N+=c.slice(a.index,a.index+1),!p){const _=new Error(`0 width match regex (${s})`);throw _.languageName=s,_.badRule=ne.rule,_}return 1}if(ne=a,a.type==="begin")return it(a);if(a.type==="illegal"&&!g){const _=new Error('Illegal lexeme "'+d+'" for mode "'+(f.scope||"<unnamed>")+'"');throw _.mode=f,_}else if(a.type==="end"){const _=rt(a);if(_!==Ue)return _}if(a.type==="illegal"&&d==="")return 1;if(de>1e5&&de>a.index*3)throw new Error("potential infinite loop, way more iterations than matches");return N+=d,d.length}const C=D(s);if(!C)throw j(E.replace("{}",s)),new Error('Unknown language: "'+s+'"');const at=fn(C);let fe="",f=w||at;const Re={},x=new i.__emitter(i);ot();let N="",se=0,U=0,de=0,ge=!1;try{if(C.__emitTokens)C.__emitTokens(c,x);else{for(f.matcher.considerAll();;){de++,ge?ge=!1:f.matcher.considerAll(),f.matcher.lastIndex=U;const r=f.matcher.exec(c);if(!r)break;const a=c.substring(U,r.index),d=Se(a,r);U=r.index+d}Se(c.substring(U))}return x.finalize(),fe=x.toHTML(),{language:s,value:fe,relevance:se,illegal:!1,_emitter:x,_top:f}}catch(r){if(r.message&&r.message.includes("Illegal"))return{language:s,value:pe(c),illegal:!0,relevance:0,_illegalBy:{message:r.message,index:U,context:c.slice(U-100,U+100),mode:r.mode,resultSoFar:fe},_emitter:x};if(p)return{language:s,value:pe(c),illegal:!1,relevance:0,errorRaised:r,_emitter:x,_top:f};throw r}}function H(s){const c={value:pe(s),illegal:!1,relevance:0,_top:o,_emitter:new i.__emitter(i)};return c._emitter.addText(s),c}function L(s,c){c=c||i.languages||Object.keys(t);const g=H(s),w=c.filter(D).filter(ye).map(v=>T(v,s,!1));w.unshift(g);const y=w.sort((v,A)=>{if(v.relevance!==A.relevance)return A.relevance-v.relevance;if(v.language&&A.language){if(D(v.language).supersetOf===A.language)return 1;if(D(A.language).supersetOf===v.language)return-1}return 0}),[m,B]=y,te=m;return te.secondBest=B,te}function M(s,c,g){const w=c&&n[c]||g;s.classList.add("hljs"),s.classList.add(`language-${w}`)}function k(s){let c=null;const g=h(s);if(u(g))return;if(ee("before:highlightElement",{el:s,language:g}),s.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(s)),i.throwUnescapedHTML))throw new pn("One of your code blocks includes unescaped HTML.",s.innerHTML);c=s;const w=c.textContent,y=g?b(w,{language:g,ignoreIllegals:!0}):L(w);s.innerHTML=y.value,M(s,g,y.language),s.result={language:y.language,re:y.relevance,relevance:y.relevance},y.secondBest&&(s.secondBest={language:y.secondBest.language,relevance:y.secondBest.relevance}),ee("after:highlightElement",{el:s,result:y,text:w})}function G(s){i=He(i,s)}const K=()=>{S(),q("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function we(){S(),q("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let ce=!1;function S(){if(document.readyState==="loading"){ce=!0;return}document.querySelectorAll(i.cssSelector).forEach(k)}function Q(){ce&&S()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",Q,!1);function Y(s,c){let g=null;try{g=c(e)}catch(w){if(j("Language definition for '{}' could not be registered.".replace("{}",s)),p)j(w);else throw w;g=o}g.name||(g.name=s),t[s]=g,g.rawDefinition=c.bind(null,e),g.aliases&&Ne(g.aliases,{languageName:s})}function le(s){delete t[s];for(const c of Object.keys(n))n[c]===s&&delete n[c]}function ue(){return Object.keys(t)}function D(s){return s=(s||"").toLowerCase(),t[s]||t[n[s]]}function Ne(s,{languageName:c}){typeof s=="string"&&(s=[s]),s.forEach(g=>{n[g.toLowerCase()]=c})}function ye(s){const c=D(s);return c&&!c.disableAutodetect}function Qe(s){s["before:highlightBlock"]&&!s["before:highlightElement"]&&(s["before:highlightElement"]=c=>{s["before:highlightBlock"](Object.assign({block:c.el},c))}),s["after:highlightBlock"]&&!s["after:highlightElement"]&&(s["after:highlightElement"]=c=>{s["after:highlightBlock"](Object.assign({block:c.el},c))})}function et(s){Qe(s),l.push(s)}function tt(s){const c=l.indexOf(s);c!==-1&&l.splice(c,1)}function ee(s,c){const g=s;l.forEach(function(w){w[g]&&w[g](c)})}function nt(s){return q("10.7.0","highlightBlock will be removed entirely in v12.0"),q("10.7.0","Please use highlightElement now."),k(s)}Object.assign(e,{highlight:b,highlightAuto:L,highlightAll:S,highlightElement:k,highlightBlock:nt,configure:G,initHighlighting:K,initHighlightingOnLoad:we,registerLanguage:Y,unregisterLanguage:le,listLanguages:ue,getLanguage:D,registerAliases:Ne,autoDetection:ye,inherit:He,addPlugin:et,removePlugin:tt}),e.debugMode=function(){p=!1},e.safeMode=function(){p=!0},e.versionString=gn,e.regex={concat:F,lookahead:Ge,either:_e,optional:Tt,anyNumberOfTimes:vt};for(const s in ie)typeof ie[s]=="object"&&je(ie[s]);return Object.assign(e,ie),e},X=Je({});X.newInstance=()=>Je({});var _n=X;X.HighlightJS=X;X.default=X;const re=xt(_n);function En(e){const t=e.regex,n=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),l="decltype\\(auto\\)",p="[a-zA-Z_]\\w*::",E="<[^<>]+>",o="(?!struct)("+l+"|"+t.optional(p)+"[a-zA-Z_]\\w*"+t.optional(E)+")",i={className:"type",begin:"\\b[a-z\\d_]*_t\\b"},u="\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)",h={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+u+"|.)",end:"'",illegal:"."},e.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},b={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},T={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(h,{className:"string"}),{className:"string",begin:/<.*?>/},n,e.C_BLOCK_COMMENT_MODE]},H={className:"title",begin:t.optional(p)+e.IDENT_RE,relevance:0},L=t.optional(p)+e.IDENT_RE+"\\s*\\(",M=["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","break","case","catch","class","co_await","co_return","co_yield","compl","concept","const_cast|10","consteval","constexpr","constinit","continue","decltype","default","delete","do","dynamic_cast|10","else","enum","explicit","export","extern","false","final","for","friend","goto","if","import","inline","module","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","override","private","protected","public","reflexpr","register","reinterpret_cast|10","requires","return","sizeof","static_assert","static_cast|10","struct","switch","synchronized","template","this","thread_local","throw","transaction_safe","transaction_safe_dynamic","true","try","typedef","typeid","typename","union","using","virtual","volatile","while","xor","xor_eq"],k=["bool","char","char16_t","char32_t","char8_t","double","float","int","long","short","void","wchar_t","unsigned","signed","const","static"],G=["any","auto_ptr","barrier","binary_semaphore","bitset","complex","condition_variable","condition_variable_any","counting_semaphore","deque","false_type","future","imaginary","initializer_list","istringstream","jthread","latch","lock_guard","multimap","multiset","mutex","optional","ostringstream","packaged_task","pair","promise","priority_queue","queue","recursive_mutex","recursive_timed_mutex","scoped_lock","set","shared_future","shared_lock","shared_mutex","shared_timed_mutex","shared_ptr","stack","string_view","stringstream","timed_mutex","thread","true_type","tuple","unique_lock","unique_ptr","unordered_map","unordered_multimap","unordered_multiset","unordered_set","variant","vector","weak_ptr","wstring","wstring_view"],K=["abort","abs","acos","apply","as_const","asin","atan","atan2","calloc","ceil","cerr","cin","clog","cos","cosh","cout","declval","endl","exchange","exit","exp","fabs","floor","fmod","forward","fprintf","fputs","free","frexp","fscanf","future","invoke","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","labs","launder","ldexp","log","log10","make_pair","make_shared","make_shared_for_overwrite","make_tuple","make_unique","malloc","memchr","memcmp","memcpy","memset","modf","move","pow","printf","putchar","puts","realloc","scanf","sin","sinh","snprintf","sprintf","sqrt","sscanf","std","stderr","stdin","stdout","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","swap","tan","tanh","terminate","to_underlying","tolower","toupper","vfprintf","visit","vprintf","vsprintf"],S={type:k,keyword:M,literal:["NULL","false","nullopt","nullptr","true"],built_in:["_Pragma"],_type_hints:G},Q={className:"function.dispatch",relevance:0,keywords:{_hint:K},begin:t.concat(/\b/,/(?!decltype)/,/(?!if)/,/(?!for)/,/(?!switch)/,/(?!while)/,e.IDENT_RE,t.lookahead(/(<[^<>]+>|)\s*\(/))},Y=[Q,T,i,n,e.C_BLOCK_COMMENT_MODE,b,h],le={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:S,contains:Y.concat([{begin:/\(/,end:/\)/,keywords:S,contains:Y.concat(["self"]),relevance:0}]),relevance:0},ue={className:"function",begin:"("+o+"[\\*&\\s]+)+"+L,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:S,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:l,keywords:S,relevance:0},{begin:L,returnBegin:!0,contains:[H],relevance:0},{begin:/::/,relevance:0},{begin:/:/,endsWithParent:!0,contains:[h,b]},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:S,relevance:0,contains:[n,e.C_BLOCK_COMMENT_MODE,h,b,i,{begin:/\(/,end:/\)/,keywords:S,relevance:0,contains:["self",n,e.C_BLOCK_COMMENT_MODE,h,b,i]}]},i,n,e.C_BLOCK_COMMENT_MODE,T]};return{name:"C++",aliases:["cc","c++","h++","hpp","hh","hxx","cxx"],keywords:S,illegal:"</",classNameAliases:{"function.dispatch":"built_in"},contains:[].concat(le,ue,Q,Y,[T,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",end:">",keywords:S,contains:["self",i]},{begin:e.IDENT_RE+"::",keywords:S},{match:[/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,/\s+/,/\w+/],className:{1:"keyword",3:"title.class"}}])}}function bn(e){const t={className:"variable",variants:[{begin:"\\$\\("+e.UNDERSCORE_IDENT_RE+"\\)",contains:[e.BACKSLASH_ESCAPE]},{begin:/\$[@%<?\^\+\*]/}]},n={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,t]},l={className:"variable",begin:/\$\([\w-]+\s/,end:/\)/,keywords:{built_in:"subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"},contains:[t]},p={begin:"^"+e.UNDERSCORE_IDENT_RE+"\\s*(?=[:+?]?=)"},E={className:"meta",begin:/^\.PHONY:/,end:/$/,keywords:{$pattern:/[\.\w]+/,keyword:".PHONY"}},o={className:"section",begin:/^[^\s]+:/,end:/$/,contains:[t]};return{name:"Makefile",aliases:["mk","mak","make"],keywords:{$pattern:/[\w-]+/,keyword:"define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"},contains:[e.HASH_COMMENT_MODE,t,n,l,p,E,o]}}function wn(e){return{name:"Plain text",aliases:["text","txt"],disableAutodetect:!0}}const Nn=e=>(Et("data-v-980a6867"),e=e(),bt(),e),yn={key:0},xn={class:"post-header"},Mn={class:"container"},On={class:"d-flex justify-content-between"},Sn={class:"post-date"},Rn={key:1},vn={class:"container text-center mt-5"},Tn=Nn(()=>R("h3",{class:"code-font"},"Post Not found",-1)),kn={key:2},$e="POST_MAIN_CONTENT",mn=ut({__name:"Post",props:{title_kebab:{type:String,required:!0}},setup(e){const t=e;re.registerLanguage("cpp",En),re.registerLanguage("makefile",bn),re.registerLanguage("plaintext",wn);const n=ft(),l=z(!1),p=z(!1),E=z(""),o=z(""),i=z([]),u=z("");let h="";dt(async()=>{if(h="",n.has_posts||await n.fetch_post_list(),!n.has_posts){b();return}T()});function b(){document.title="Post not found",p.value=!0}async function T(){const M=n.post_list.find(k=>k.route===t.title_kebab);if(M===void 0){b();return}await n.fetch_selected_post(M.id),H()}function H(){l.value=!0;const M=n.selected_post;E.value=M.title,o.value=M.subtitle,i.value=M.tags,u.value=Nt.to_date_string(M.id),document.title=M.title;const k=document.getElementById($e);k&&(h=M.content_html.length>0?M.content_html:"<p>Post content not found</p>",k.innerHTML=h,re.highlightAll())}const L=()=>h.length>100;return(M,k)=>{const G=gt("RouterLink");return $(),W(ve,null,[l.value?($(),W("div",yn,[R("div",xn,[R("div",Mn,[R("h1",null,V(E.value),1),R("p",null,V(o.value),1),R("div",On,[R("div",Sn,V(u.value),1),R("div",null,[($(!0),W(ve,null,pt(i.value,K=>($(),W("span",{key:K,class:"badge bg-primary code-font ms-2"},V(K),1))),128))])])])])])):p.value?($(),W("div",Rn,[R("div",vn,[Tn,R("p",null," '"+V(M.$route.path)+"' could not be found ",1),R("p",null,[Te(G,{to:me(Ce).home},{default:ke(()=>[Ae(" Home ")]),_:1},8,["to"])]),R("p",null,[Te(G,{to:me(Ce).post_list},{default:ke(()=>[Ae(" Posts ")]),_:1},8,["to"])])])])):($(),W("div",kn)),R("div",{class:"container"},[R("div",{id:$e,class:"main-content"})]),L()?($(),ht(yt,{key:3})):_t("",!0)],64)}}});const In=wt(mn,[["__scopeId","data-v-980a6867"]]);export{In as default};
