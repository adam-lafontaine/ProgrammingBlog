(function(t){function e(e){for(var r,o,s=e[0],i=e[1],u=e[2],_=0,l=[];_<s.length;_++)o=s[_],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&l.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);b&&b(e);while(l.length)l.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={app:0},a={app:0},c=[];function s(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-24c56bb1":"97f82618","chunk-36f6de68":"cc6bde1c","chunk-3c3c1be2":"af29ec84"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n={"chunk-24c56bb1":1,"chunk-36f6de68":1,"chunk-3c3c1be2":1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-24c56bb1":"173c3464","chunk-36f6de68":"7a817a4a","chunk-3c3c1be2":"327ad4f3"}[t]+".css",a=i.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=c[s],_=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(_===r||_===a))return e()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){u=l[s],_=u.getAttribute("data-href");if(_===r||_===a)return e()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=e,b.onerror=function(e){var r=e&&e.target&&e.target.src||a,c=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[t],b.parentNode.removeChild(b),n(c)},b.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(b)})).then((function(){o[t]=0})));var r=a[t];if(0!==r)if(r)e.push(r[2]);else{var c=new Promise((function(e,n){r=a[t]=[e,n]}));e.push(r[2]=c);var u,_=document.createElement("script");_.charset="utf-8",_.timeout=120,i.nc&&_.setAttribute("nonce",i.nc),_.src=s(t);var l=new Error;u=function(e){_.onerror=_.onload=null,clearTimeout(b);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}a[t]=void 0}};var b=setTimeout((function(){u({type:"timeout",target:_})}),12e4);_.onerror=_.onload=u,document.head.appendChild(_)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],_=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var b=_;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"034f":function(t,e,n){"use strict";n("85ec")},"6efc":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return a})),n.d(e,"a",(function(){return c}));var r,o,a;n("bee2"),n("d4ec");(function(t){t["FETCH_HOMEPAGE_CONTENT"]="fetchHomepageContent",t["FETCH_POST_LIST"]="fetchPostList",t["FETCH_SELECTED_POST"]="fetchSelectedPost",t["FETCH_VIDEO_RESOURCES"]="fetchVideoResources",t["FETCH_WEBSITE_RESOURCES"]="fetchWebsiteResources",t["LOAD_CMS_BRANCH"]="loadCmsBranch"})(r||(r={})),function(t){t["GET_HOMEPAGE_CONTENT"]="getHomepageContent",t["GET_POST_LIST"]="getPostList",t["GET_SELECTED_POST"]="getSelectedPost",t["GET_VIDEO_RESOURCES"]="getVideoResources",t["GET_WEBSITE_RESOURCES"]="getWebsiteResources",t["GET_CMS_BRANCH"]="setCmsBranch",t["GET_ERROR"]="getError"}(o||(o={})),function(t){t["SET_HOMEPAGE_CONTENT"]="setHomepageContent",t["SET_POST_LIST"]="setPostList",t["SET_SELECTED_POST"]="setSelectedPost",t["SET_VIDEO_RESOURCES"]="setVideoResources",t["SET_WEBSITE_RESOURCES"]="setWebsiteResources",t["SET_CMS_BRANCH"]="setCmsBranch",t["SET_ERROR"]="setError"}(a||(a={}));var c;(function(t){function e(){return{id:"",title:"",subtitle:"",tags:[],content_html:""}}function n(){return{youtube_id:"",description:""}}function r(){return{url:"",title:"",description:""}}function o(){return{number:"",id:"",title:"",tags:[],route:"",filename:""}}function a(){return{title:"",text:""}}t.post=e,t.video_resource=n,t.website_resource=r,t.post_info=o,t.homepage_content=a})(c||(c={}))},"85ec":function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("5f5b");n("ab8b"),n("2dd8");r["default"].use(o["a"]);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("b-navbar",{attrs:{type:"dark",variant:"dark",fixed:"top"}},[n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[t._v("Home")]),n("b-nav-item",{attrs:{to:"/posts"}},[t._v("Posts")]),n("b-nav-item",{attrs:{to:"/resources"}},[t._v("Resources")])],1)],1),n("b-navbar-nav",[n("b-nav-item",{attrs:{href:"https://github.com/adam-lafontaine",target:"_blank"}},[n("b-icon-github")],1),n("b-nav-item",{attrs:{href:"https://prettyspecial.itch.io/the-mandelbrot-experience",target:"_blank"}},[n("svg",{staticClass:"b-icon bi",attrs:{viewBox:"0 0 17 16",width:"1em",height:"1em",focusable:"false",role:"img","aria-label":"itch.io",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[n("g",[n("path",{attrs:{d:t.itchio_path}})])])])],1)],1),n("router-view")],1)},c=[],s=n("bee2"),i=n("d4ec"),u=n("262e"),_=n("2caf"),l=n("9ab4"),b=n("1b40"),p=n("7386"),f=function(t){Object(u["a"])(n,t);var e=Object(_["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.itchio_path="M 2.214844 0.0976562 C 1.472656 0.5625 0.015625 2.320312 0 2.78125 L 0 3.546875 C 0 4.511719 0.863281 5.363281 1.644531 5.363281 C 2.585938 5.363281 3.367188 4.546875 3.367188 3.574219 C 3.367188 4.546875 4.125 5.363281 5.066406 5.363281 C 6.007812 5.363281 6.738281 4.546875 6.738281 3.574219 C 6.738281 4.546875 7.542969 5.363281 8.484375 5.363281 L 8.5 5.363281 C 9.441406 5.363281 10.246094 4.546875 10.246094 3.574219 C 10.246094 4.546875 10.976562 5.363281 11.917969 5.363281 C 12.855469 5.363281 13.613281 4.546875 13.613281 3.574219 C 13.613281 4.546875 14.398438 5.363281 15.335938 5.363281 C 16.121094 5.363281 16.984375 4.511719 16.984375 3.546875 L 16.984375 2.78125 C 16.96875 2.320312 15.507812 0.558594 14.769531 0.0976562 C 12.464844 0.015625 10.871094 0 8.492188 0 C 6.113281 0 2.871094 0.0390625 2.214844 0.0976562 Z M 6.726562 4.90625 C 6.636719 5.074219 6.523438 5.222656 6.394531 5.355469 C 6.039062 5.71875 5.554688 5.945312 5.019531 5.945312 C 4.5 5.945312 4.007812 5.734375 3.636719 5.355469 C 3.507812 5.222656 3.410156 5.082031 3.320312 4.917969 C 3.230469 5.082031 3.105469 5.222656 2.976562 5.355469 C 2.609375 5.734375 2.113281 5.945312 1.597656 5.945312 C 1.53125 5.945312 1.464844 5.925781 1.410156 5.90625 C 1.335938 6.734375 1.304688 7.523438 1.292969 8.097656 L 1.292969 8.101562 C 1.289062 8.394531 1.289062 8.632812 1.289062 8.96875 C 1.300781 10.699219 1.125 14.582031 2.015625 15.539062 C 3.398438 15.875 5.941406 16.03125 8.492188 16.03125 C 11.042969 16.03125 13.585938 15.875 14.964844 15.539062 C 15.859375 14.582031 15.679688 10.699219 15.695312 8.96875 C 15.691406 8.632812 15.691406 8.394531 15.691406 8.101562 L 15.691406 8.097656 C 15.679688 7.523438 15.648438 6.734375 15.570312 5.90625 C 15.515625 5.925781 15.449219 5.945312 15.386719 5.945312 C 14.871094 5.945312 14.375 5.734375 14.003906 5.355469 C 13.875 5.222656 13.75 5.082031 13.660156 4.917969 C 13.570312 5.082031 13.472656 5.222656 13.34375 5.355469 C 12.976562 5.734375 12.480469 5.945312 11.964844 5.945312 C 11.429688 5.945312 10.941406 5.71875 10.585938 5.355469 C 10.457031 5.222656 10.347656 5.070312 10.257812 4.90625 C 10.167969 5.070312 10.058594 5.222656 9.929688 5.355469 C 9.558594 5.734375 9.0625 5.945312 8.546875 5.945312 C 8.527344 5.945312 8.511719 5.945312 8.492188 5.941406 C 8.472656 5.945312 8.453125 5.945312 8.433594 5.945312 C 7.917969 5.945312 7.421875 5.734375 7.054688 5.355469 C 6.925781 5.222656 6.816406 5.070312 6.726562 4.90625 Z M 5.308594 6.832031 C 5.871094 6.832031 6.371094 6.832031 6.988281 7.539062 C 7.472656 7.488281 7.980469 7.460938 8.492188 7.460938 C 9 7.460938 9.507812 7.488281 9.996094 7.539062 C 10.613281 6.832031 11.113281 6.832031 11.671875 6.832031 L 11.675781 6.832031 C 11.9375 6.832031 13 6.832031 13.738281 9.011719 L 14.535156 12 C 15.121094 14.226562 14.347656 14.277344 13.375 14.28125 C 11.9375 14.226562 11.144531 13.128906 11.144531 12.035156 C 10.347656 12.171875 9.417969 12.238281 8.492188 12.238281 C 7.5625 12.238281 6.632812 12.171875 5.839844 12.035156 C 5.839844 13.128906 5.042969 14.226562 3.605469 14.28125 C 2.636719 14.277344 1.859375 14.226562 2.449219 12 L 3.242188 9.011719 C 3.980469 6.832031 5.042969 6.832031 5.308594 6.832031 Z M 8.492188 8.542969 L 8.492188 8.546875 C 8.488281 8.546875 6.976562 10.003906 6.707031 10.519531 L 7.695312 10.480469 L 7.695312 11.386719 C 7.695312 11.429688 8.09375 11.410156 8.492188 11.390625 C 8.890625 11.410156 9.285156 11.429688 9.285156 11.386719 L 9.285156 10.480469 L 10.277344 10.519531 C 10.003906 10.003906 8.492188 8.546875 8.492188 8.546875 Z M 8.492188 8.542969 ",t}return Object(s["a"])(n)}(b["b"]);f=Object(l["a"])([Object(b["a"])({components:{BIconGithub:p["m"],BIconLinkedin:p["n"]}})],f);var E=f,h=E,d=(n("034f"),n("2877")),m=Object(d["a"])(h,a,c,!1,null,null,null),O=m.exports,C=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("home-component")},S=[],v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"below-navbar"},[n("h1",{staticClass:"code-font mt-3"},[t._v(t._s(t.page_title))]),n("p",{directives:[{name:"b-modal",rawName:"v-b-modal.branch-modal",modifiers:{"branch-modal":!0}}]},[t._v(t._s(t.page_text))]),n("b-row",[n("b-col",{staticClass:"mt-3",attrs:{cols:"12","v-if":t.has_post}},[t._v(" Latest post: "),n("b-link",{attrs:{to:t.latest_post_route}},[t._v(t._s(t.latest_post_title))])],1),n("b-col",{staticClass:"mt-3",attrs:{cols:"12","v-if":t.has_post}},[t._v(" All posts: "),n("b-link",{attrs:{to:"/posts"}},[t._v("Posts")])],1),n("b-col",{staticClass:"mt-3",attrs:{cols:"12"}},[t._v(" Online resources: "),n("b-link",{attrs:{to:"/resources"}},[t._v("Resources")])],1)],1),n("div",[n("b-modal",{attrs:{id:"branch-modal","hide-header":"","hide-footer":""}},[n("b-row",{attrs:{"no-gutters":""}},[n("b-col",{attrs:{cols:"10"}},[n("b-form-input",{attrs:{type:"text"},model:{value:t.branch_name,callback:function(e){t.branch_name=e},expression:"branch_name"}})],1),n("b-col",{attrs:{cols:"2"}},[n("b-button",{on:{click:t.submit_branch_name}},[t._v("OK")])],1)],1)],1)],1)],1)},g=[],R=(n("4e82"),n("4bb5")),j=n("6efc"),k=Object(R["a"])("post_module"),w=function(t){Object(u["a"])(n,t);var e=Object(_["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.branch_name="",t.page_title="",t.page_text="",t.latest_post_title="",t.latest_post_route="",t}return Object(s["a"])(n,[{key:"mounted",value:function(){""===this.st_homepage_content.title?this.ac_fetch_homepage_content().then(this.process_homepage_content):this.process_homepage_content(),this.ac_fetch_post_list().then(this.process_post_list)}},{key:"process_homepage_content",value:function(){this.page_title=this.st_homepage_content.title,this.page_text=this.st_homepage_content.text}},{key:"process_post_list",value:function(){var t=function(t,e){return t.id<e.id?1:-1},e=this.st_post_list.sort(t);if(e.length>0){var n=e[0];this.latest_post_title=n.title,this.latest_post_route="/posts/"+n.route}}},{key:"process_submit",value:function(){this.st_cms_branch===this.branch_name&&F.push("/posts")}},{key:"submit_branch_name",value:function(){this.ac_load_cms_branch(this.branch_name).then(this.process_submit)}},{key:"has_post",get:function(){return this.latest_post_route.length>0}}]),n}(b["b"]);Object(l["a"])([k.Action(j["b"].FETCH_HOMEPAGE_CONTENT)],w.prototype,"ac_fetch_homepage_content",void 0),Object(l["a"])([k.Getter(j["c"].GET_HOMEPAGE_CONTENT)],w.prototype,"st_homepage_content",void 0),Object(l["a"])([k.Action(j["b"].FETCH_POST_LIST)],w.prototype,"ac_fetch_post_list",void 0),Object(l["a"])([k.Getter(j["c"].GET_POST_LIST)],w.prototype,"st_post_list",void 0),Object(l["a"])([k.Action(j["b"].LOAD_CMS_BRANCH)],w.prototype,"ac_load_cms_branch",void 0),Object(l["a"])([k.Getter(j["c"].GET_CMS_BRANCH)],w.prototype,"st_cms_branch",void 0),w=Object(l["a"])([Object(b["a"])({components:{}})],w);var y=w,P=y,x=(n("d1f6"),Object(d["a"])(P,v,g,!1,null,null,null)),H=x.exports,L=function(t){Object(u["a"])(n,t);var e=Object(_["a"])(n);function n(){return Object(i["a"])(this,n),e.apply(this,arguments)}return Object(s["a"])(n)}(b["b"]);L=Object(l["a"])([Object(b["a"])({components:{HomeComponent:H}})],L);var A=L,N=A,M=Object(d["a"])(N,T,S,!1,null,null,null),G=M.exports;r["default"].use(C["a"]);var I,B="../views",D=("".concat(B,"/Test.vue"),"".concat(B,"/About.vue"),"".concat(B,"/Posts.vue"),[{path:"/",name:"Home",component:G},{path:"/posts",name:"Posts",component:function(){return n.e("chunk-3c3c1be2").then(n.bind(null,"f2fd"))}},{path:"/posts/:title_kebab",name:"Post",component:function(){return n.e("chunk-24c56bb1").then(n.bind(null,"37d3"))}},{path:"/posts/*",name:"Posts",component:function(){return n.e("chunk-3c3c1be2").then(n.bind(null,"f2fd"))}},{path:"/resources",name:"Resources",component:function(){return n.e("chunk-36f6de68").then(n.bind(null,"93b9"))}},{path:"*",name:"Home",component:G}]),U=new C["a"]({mode:"history",base:"/",routes:D}),F=U,V=n("2f62"),W=n("53ca"),Z=n("ade3"),$=n("1da1"),q=(n("4de4"),n("7db0"),n("ac1f"),n("5319"),n("5b81"),n("b64b"),n("96cf"),n("bc3a")),J=n.n(q),K=n("0e54"),z=n.n(K),Q=(I={},Object(Z["a"])(I,j["b"].FETCH_HOMEPAGE_CONTENT,(function(t){return Object($["a"])(regeneratorRuntime.mark((function e(){var n,r,o,a,c,s,i,u,_;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,r=t.state,o=X(r.cms_branch)+"/pages/home.json",a="",c=j["a"].homepage_content(),s=function(t){a="FETCH_HOMEPAGE_CONTENT ".concat(t)},i=function(){console.error(a),n(j["d"].SET_HOMEPAGE_CONTENT,c)},e.prev=6,s("fetching content"),e.next=10,Y(o);case 10:if(u=e.sent,s("checking response data"),et(u.data,c)){e.next=15;break}return i(),e.abrupt("return");case 15:_=u.data,n(j["d"].SET_HOMEPAGE_CONTENT,_),e.next=23;break;case 19:e.prev=19,e.t0=e["catch"](6),console.error(e.t0),n(j["d"].SET_HOMEPAGE_CONTENT,c);case 23:case"end":return e.stop()}}),e,null,[[6,19]])})))()})),Object(Z["a"])(I,j["b"].FETCH_POST_LIST,(function(t){return Object($["a"])(regeneratorRuntime.mark((function e(){var n,r,o,a,c,s,i,u,_,l,b;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,r=t.state,o=X(r.cms_branch)+"/posts/post_manifest.json",a="",c=j["a"].post_info(),s=function(t){a="FETCH_POST_LIST ".concat(t)},i=function(){console.error(a),n(j["d"].SET_POST_LIST,[])},e.prev=6,s("fetching post list"),e.next=10,Y(o);case 10:if(u=e.sent,s("checking response data"),et(u.data,{posts:[]})){e.next=15;break}return i(),e.abrupt("return");case 15:if(_=u.data.posts.filter((function(t){return t.id.length>0})),l=Array.isArray(_)&&_.length>0&&nt(_,c),l){e.next=20;break}return i(),e.abrupt("return");case 20:b=_,n(j["d"].SET_POST_LIST,b),e.next=28;break;case 24:e.prev=24,e.t0=e["catch"](6),console.error(e.t0),n(j["d"].SET_POST_LIST,[]);case 28:case"end":return e.stop()}}),e,null,[[6,24]])})))()})),Object(Z["a"])(I,j["b"].FETCH_SELECTED_POST,(function(t,e){return Object($["a"])(regeneratorRuntime.mark((function n(){var r,o,a,c,s,i,u,_,l,b,p,f;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.commit,o=t.state,a=j["a"].post(),c="",s=function(t){c="FETCH_SELECTED_POST ".concat(t)},i=function(){console.error(c),r(j["d"].SET_SELECTED_POST,a)},0!==o.post_list.length){n.next=9;break}return s("post list not loaded"),i(),n.abrupt("return");case 9:if(n.prev=9,s("finding post listing"),u=o.post_list.find((function(t){return t.id===e})),null!=u){n.next=15;break}return i(),n.abrupt("return");case 15:return _=X(o.cms_branch)+"/posts/".concat(u.filename),s("fetching blog post"),n.next=19,Y(_);case 19:l=n.sent,b=l.data,o.cms_branch===o.default_cms_branch&&(p=/\/CMS\/raw\/[A-Za-z0-9_-]*\//g,b=b.replaceAll(p,"/CMS/raw/".concat(o.default_cms_branch,"/"))),s("building post"),f=tt(u,b),r(j["d"].SET_SELECTED_POST,f),n.next=31;break;case 27:n.prev=27,n.t0=n["catch"](9),console.error(n.t0),r(j["d"].SET_SELECTED_POST,a);case 31:case"end":return n.stop()}}),n,null,[[9,27]])})))()})),Object(Z["a"])(I,j["b"].FETCH_VIDEO_RESOURCES,(function(t){return Object($["a"])(regeneratorRuntime.mark((function e(){var n,r,o,a,c,s,i,u,_,l,b;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,r=t.state,o=X(r.cms_branch)+"/resources/youtube_videos.json",a=j["a"].video_resource(),c="",s=function(t){c="FETCH_VIDEO_RESOURCES ".concat(t)},i=function(){console.error(c),n(j["d"].SET_VIDEO_RESOURCES,[])},e.prev=6,s("fetching resources"),e.next=10,Y(o);case 10:if(u=e.sent,s("checking response data"),et(u.data,{videos:[]})){e.next=15;break}return i(),e.abrupt("return");case 15:if(_=u.data.videos,l=Array.isArray(_)&&_.length>0&&nt(_,a),l){e.next=20;break}return i(),e.abrupt("return");case 20:b=_,n(j["d"].SET_VIDEO_RESOURCES,b),e.next=28;break;case 24:e.prev=24,e.t0=e["catch"](6),console.error(e.t0),n(j["d"].SET_VIDEO_RESOURCES,[]);case 28:case"end":return e.stop()}}),e,null,[[6,24]])})))()})),Object(Z["a"])(I,j["b"].FETCH_WEBSITE_RESOURCES,(function(t){return Object($["a"])(regeneratorRuntime.mark((function e(){var n,r,o,a,c,s,i,u,_,l,b;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,r=t.state,o=X(r.cms_branch)+"/resources/websites.json",a=j["a"].website_resource(),c="",s=function(t){c="FETCH_WEBSITE_RESOURCES ".concat(t)},i=function(){console.error(c),n(j["d"].SET_WEBSITE_RESOURCES,[])},e.prev=6,s("fetching resources"),e.next=10,Y(o);case 10:if(u=e.sent,s("checking response data"),et(u.data,{websites:[]})){e.next=15;break}return i(),e.abrupt("return");case 15:if(_=u.data.websites,l=Array.isArray(_)&&_.length>0&&nt(_,a),l){e.next=20;break}return i(),e.abrupt("return");case 20:b=_,n(j["d"].SET_WEBSITE_RESOURCES,b),e.next=29;break;case 24:e.prev=24,e.t0=e["catch"](6),console.error(c),console.error(e.t0),n(j["d"].SET_WEBSITE_RESOURCES,[]);case 29:case"end":return e.stop()}}),e,null,[[6,24]])})))()})),Object(Z["a"])(I,j["b"].LOAD_CMS_BRANCH,(function(t,e){return Object($["a"])(regeneratorRuntime.mark((function n(){var r,o,a,c,s,i,u,_,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.commit,o=t.state,a=X(e)+"/pages/home.json",c="",s=j["a"].homepage_content(),i=function(t){c="LOAD_CMS_BRANCH ".concat(t)},u=function(){console.error(c),r(j["d"].SET_HOMEPAGE_CONTENT,s)},n.prev=6,i("fetching content"),n.next=10,Y(a);case 10:if(_=n.sent,i("checking response data"),et(_.data,s)){n.next=15;break}return u(),n.abrupt("return");case 15:l=_.data,r(j["d"].SET_HOMEPAGE_CONTENT,l),r(j["d"].SET_CMS_BRANCH,e),n.next=24;break;case 20:n.prev=20,n.t0=n["catch"](6),console.log("No branch ".concat(e," found")),r(j["d"].SET_CMS_BRANCH,o.default_cms_branch);case 24:case"end":return n.stop()}}),n,null,[[6,20]])})))()})),I);function X(t){return"https://raw.githubusercontent.com/adam-lafontaine/CMS/"+t+"/blog"}function Y(t){var e=J.a.get(t);return e}function tt(t,e){var n="#",r="##",o=e.indexOf(n)+n.length+1,a=e.indexOf("\n",o),c=e.substring(o,a);o=e.indexOf(r)+r.length+1,a=e.indexOf("\n",o);var s=e.substring(o,a);o=a+1,a=e.length;var i=z()(e.substring(o,a));return{id:t.id,title:c,subtitle:s,tags:t.tags,content_html:i}}function et(t,e){if(null===t||"object"!==Object(W["a"])(t)||"object"!==Object(W["a"])(e))return!1;var n=Object.keys(e);return n.every((function(e){return t.hasOwnProperty(e)}))}function nt(t,e){return t.every((function(t){return et(t,e)}))}var rt=Q;function ot(){var t={homepage_content:j["a"].homepage_content(),post_list:[],selected_post:j["a"].post(),video_resources:[],website_resources:[],default_cms_branch:"current",cms_branch:"current",error:""};return t}var at,ct,st=ot(),it=st,ut=(at={},Object(Z["a"])(at,j["d"].SET_HOMEPAGE_CONTENT,(function(t,e){t.homepage_content=e})),Object(Z["a"])(at,j["d"].SET_POST_LIST,(function(t,e){t.post_list=e})),Object(Z["a"])(at,j["d"].SET_SELECTED_POST,(function(t,e){t.selected_post=e})),Object(Z["a"])(at,j["d"].SET_VIDEO_RESOURCES,(function(t,e){t.video_resources=e})),Object(Z["a"])(at,j["d"].SET_WEBSITE_RESOURCES,(function(t,e){t.website_resources=e})),Object(Z["a"])(at,j["d"].SET_CMS_BRANCH,(function(t,e){t.cms_branch=e})),Object(Z["a"])(at,j["d"].SET_ERROR,(function(t,e){t.error=e})),Object(Z["a"])(at,"reset",(function(t){var e=ot();Object.assign(t,e)})),at),_t=ut,lt=(ct={},Object(Z["a"])(ct,j["c"].GET_HOMEPAGE_CONTENT,(function(t){return t.homepage_content})),Object(Z["a"])(ct,j["c"].GET_POST_LIST,(function(t){return t.post_list})),Object(Z["a"])(ct,j["c"].GET_SELECTED_POST,(function(t){return t.selected_post})),Object(Z["a"])(ct,j["c"].GET_VIDEO_RESOURCES,(function(t){return t.video_resources})),Object(Z["a"])(ct,j["c"].GET_WEBSITE_RESOURCES,(function(t){return t.website_resources})),Object(Z["a"])(ct,j["c"].GET_CMS_BRANCH,(function(t){return t.cms_branch})),Object(Z["a"])(ct,j["c"].GET_ERROR,(function(t){return t.error})),ct),bt=lt,pt={namespaced:!0,state:it,getters:bt,mutations:_t,actions:rt},ft=pt;r["default"].use(V["a"]);var Et=new V["a"].Store({modules:{post_module:ft}});r["default"].config.productionTip=!1,new r["default"]({router:F,store:Et,render:function(t){return t(O)}}).$mount("#app")},d1f6:function(t,e,n){"use strict";n("e247")},e247:function(t,e,n){}});
//# sourceMappingURL=app.9c6118c3.js.map