(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-97e6d302"],{"00b4":function(e,t,r){"use strict";r("ac1f");var n=r("23e7"),o=r("da84"),i=r("c65b"),c=r("e330"),s=r("1626"),a=r("861d"),u=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),l=o.Error,f=c(/./.test);n({target:"RegExp",proto:!0,forced:!u},{test:function(e){var t=this.exec;if(!s(t))return f(this,e);var r=i(t,this,e);if(null!==r&&!a(r))throw new l("RegExp exec method returned something other than an Object or null");return!!r}})},"107c":function(e,t,r){var n=r("d039"),o=r("da84"),i=o.RegExp;e.exports=n((function(){var e=i("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},3363:function(e,t,r){"use strict";r("e6ae")},"4df4":function(e,t,r){"use strict";var n=r("da84"),o=r("0366"),i=r("c65b"),c=r("7b0b"),s=r("9bdd"),a=r("e95a"),u=r("68ee"),l=r("07fa"),f=r("8418"),d=r("9a1f"),b=r("35a1"),p=n.Array;e.exports=function(e){var t=c(e),r=u(this),n=arguments.length,v=n>1?arguments[1]:void 0,h=void 0!==v;h&&(v=o(v,n>2?arguments[2]:void 0));var _,g,y,x,m,w,E=b(t),O=0;if(!E||this==p&&a(E))for(_=l(t),g=r?new this(_):p(_);_>O;O++)w=h?v(t[O],O):t[O],f(g,O,w);else for(x=d(t,E),m=x.next,g=r?new this:[];!(y=i(m,x)).done;O++)w=h?s(x,v,[y.value,O],!0):y.value,f(g,O,w);return g.length=O,g}},9263:function(e,t,r){"use strict";var n=r("c65b"),o=r("e330"),i=r("577e"),c=r("ad6d"),s=r("9f7f"),a=r("5692"),u=r("7c73"),l=r("69f3").get,f=r("fce3"),d=r("107c"),b=a("native-string-replace",String.prototype.replace),p=RegExp.prototype.exec,v=p,h=o("".charAt),_=o("".indexOf),g=o("".replace),y=o("".slice),x=function(){var e=/a/,t=/b*/g;return n(p,e,"a"),n(p,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),m=s.BROKEN_CARET,w=void 0!==/()??/.exec("")[1],E=x||w||m||f||d;E&&(v=function(e){var t,r,o,s,a,f,d,E=this,O=l(E),I=i(e),S=O.raw;if(S)return S.lastIndex=E.lastIndex,t=n(v,S,I),E.lastIndex=S.lastIndex,t;var j=O.groups,k=m&&E.sticky,R=n(c,E),A=E.source,C=0,T=I;if(k&&(R=g(R,"y",""),-1===_(R,"g")&&(R+="g"),T=y(I,E.lastIndex),E.lastIndex>0&&(!E.multiline||E.multiline&&"\n"!==h(I,E.lastIndex-1))&&(A="(?: "+A+")",T=" "+T,C++),r=new RegExp("^(?:"+A+")",R)),w&&(r=new RegExp("^"+A+"$(?!\\s)",R)),x&&(o=E.lastIndex),s=n(p,k?r:E,T),k?s?(s.input=y(s.input,C),s[0]=y(s[0],C),s.index=E.lastIndex,E.lastIndex+=s[0].length):E.lastIndex=0:x&&s&&(E.lastIndex=E.global?s.index+s[0].length:o),w&&s&&s.length>1&&n(b,s[0],r,(function(){for(a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(s[a]=void 0)})),s&&j)for(s.groups=f=u(null),a=0;a<j.length;a++)d=j[a],f[d[0]]=s[d[1]];return s}),e.exports=v},"93b9":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("resources-component")},o=[],i=r("bee2"),c=r("d4ec"),s=r("262e"),a=r("2caf"),u=r("9ab4"),l=r("1b40"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"below-navbar"},[r("b-container",[r("b-row",[r("b-col",{attrs:{cols:"12",lg:"6"}},[r("h2",{staticClass:"code-font mt-3"},[e._v("Videos")]),r("b-list-group",e._l(e.video_links,(function(t){return r("b-list-group-item",{key:t.id},[r("b-row",{attrs:{"no-gutters":""}},[r("b-col",{staticClass:"mr-auto",attrs:{cols:"12",sm:"9",md:"6",lg:"4",xl:"3"}},[r("b-embed",{attrs:{type:"iframe",aspect:"16by9",src:t.url,allowfullscreen:""}})],1),r("b-col",{attrs:{cols:"12",lg:"6"}},[r("small",[e._v(e._s(t.description))])])],1)],1)})),1)],1),r("b-col",{attrs:{cols:"12",lg:"6"}},[r("h2",{staticClass:"code-font mt-3"},[e._v("Websites")]),r("b-list-group",e._l(e.website_links,(function(t){return r("b-list-group-item",{key:t.id,attrs:{href:t.url,target:"_blank"}},[r("b-row",[r("b-col",{attrs:{cols:"12"}},[r("span",[e._v(e._s(t.title))])]),r("b-col",{attrs:{cols:"12"}},[r("small",[e._v(e._s(t.description))])])],1)],1)})),1)],1)],1)],1)],1)},d=[];r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),r("d9e2"),r("fb6a"),r("b0c0"),r("a630"),r("ac1f"),r("00b4");function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e,t){if(e){if("string"===typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?b(e,t):void 0}}function v(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=p(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){s=!0,i=e},f:function(){try{c||null==r["return"]||r["return"]()}finally{if(s)throw i}}}}r("d81d");var h=r("4bb5"),_=r("6efc"),g=Object(h["a"])("post_module"),y=function(e){Object(s["a"])(r,e);var t=Object(a["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.video_links=[],e.website_links=[],e}return Object(i["a"])(r,[{key:"mounted",value:function(){this.video_links=[],this.website_links=[],this.ac_fetch_video_resources().then(this.process_video_resources),this.ac_fetch_website_resources().then(this.process_website_resources)}},{key:"process_video_resources",value:function(){var e=this;this.video_links=this.st_video_resources.map((function(t){return e.to_youtube_reference(t)}))}},{key:"process_website_resources",value:function(){this.website_links=[];var e,t=1,r=v(this.st_website_resources);try{for(r.s();!(e=r.n()).done;){var n=e.value;this.website_links.push(this.to_website_reference(n,t)),t++}}catch(o){r.e(o)}finally{r.f()}}},{key:"to_youtube_reference",value:function(e){return{id:e.youtube_id,url:"https://www.youtube.com/embed/".concat(e.youtube_id),description:e.description}}},{key:"to_website_reference",value:function(e,t){return{id:"".concat(t),url:e.url,title:e.title,description:e.description}}}]),r}(l["b"]);Object(u["a"])([g.Action(_["b"].FETCH_VIDEO_RESOURCES)],y.prototype,"ac_fetch_video_resources",void 0),Object(u["a"])([g.Getter(_["c"].GET_VIDEO_RESOURCES)],y.prototype,"st_video_resources",void 0),Object(u["a"])([g.Action(_["b"].FETCH_WEBSITE_RESOURCES)],y.prototype,"ac_fetch_website_resources",void 0),Object(u["a"])([g.Getter(_["c"].GET_WEBSITE_RESOURCES)],y.prototype,"st_website_resources",void 0),y=Object(u["a"])([Object(l["a"])({components:{}})],y);var x=y,m=x,w=(r("3363"),r("2877")),E=Object(w["a"])(m,f,d,!1,null,null,null),O=E.exports,I=function(e){Object(s["a"])(r,e);var t=Object(a["a"])(r);function r(){return Object(c["a"])(this,r),t.apply(this,arguments)}return Object(i["a"])(r)}(l["b"]);I=Object(u["a"])([Object(l["a"])({components:{ResourcesComponent:O}})],I);var S=I,j=S,k=Object(w["a"])(j,n,o,!1,null,null,null);t["default"]=k.exports},"9bdd":function(e,t,r){var n=r("825a"),o=r("2a62");e.exports=function(e,t,r,i){try{return i?t(n(r)[0],r[1]):t(r)}catch(c){o(e,"throw",c)}}},"9f7f":function(e,t,r){var n=r("d039"),o=r("da84"),i=o.RegExp,c=n((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),s=c||n((function(){return!i("a","y").sticky})),a=c||n((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:a,MISSED_STICKY:s,UNSUPPORTED_Y:c}},a630:function(e,t,r){var n=r("23e7"),o=r("4df4"),i=r("1c7e"),c=!i((function(e){Array.from(e)}));n({target:"Array",stat:!0,forced:c},{from:o})},ac1f:function(e,t,r){"use strict";var n=r("23e7"),o=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},ad6d:function(e,t,r){"use strict";var n=r("825a");e.exports=function(){var e=n(this),t="";return e.hasIndices&&(t+="d"),e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b0c0:function(e,t,r){var n=r("83ab"),o=r("5e77").EXISTS,i=r("e330"),c=r("9bf2").f,s=Function.prototype,a=i(s.toString),u=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,l=i(u.exec),f="name";n&&!o&&c(s,f,{configurable:!0,get:function(){try{return l(u,a(this))[1]}catch(e){return""}}})},d81d:function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").map,i=r("1dde"),c=i("map");n({target:"Array",proto:!0,forced:!c},{map:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},e6ae:function(e,t,r){},fb6a:function(e,t,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("e8b5"),c=r("68ee"),s=r("861d"),a=r("23cb"),u=r("07fa"),l=r("fc6a"),f=r("8418"),d=r("b622"),b=r("1dde"),p=r("f36a"),v=b("slice"),h=d("species"),_=o.Array,g=Math.max;n({target:"Array",proto:!0,forced:!v},{slice:function(e,t){var r,n,o,d=l(this),b=u(d),v=a(e,b),y=a(void 0===t?b:t,b);if(i(d)&&(r=d.constructor,c(r)&&(r===_||i(r.prototype))?r=void 0:s(r)&&(r=r[h],null===r&&(r=void 0)),r===_||void 0===r))return p(d,v,y);for(n=new(void 0===r?_:r)(g(y-v,0)),o=0;v<y;v++,o++)v in d&&f(n,o,d[v]);return n.length=o,n}})},fce3:function(e,t,r){var n=r("d039"),o=r("da84"),i=o.RegExp;e.exports=n((function(){var e=i(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-97e6d302.6a2f08a0.js.map