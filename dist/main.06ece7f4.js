!function(e){function n(n){for(var r,i,l=n[0],c=n[1],u=n[2],d=0,f=[];d<l.length;d++)i=l[d],a[i]&&f.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(n);f.length;)f.shift()();return o.push.apply(o,u||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,l=1;l<t.length;l++){var c=t[l];0!==a[c]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={0:0},o=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t=a[e];if(0!==t)if(t)n.push(t[2]);else{var r=new Promise(function(n,r){t=a[e]=[n,r]});n.push(t[2]=r);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=function(e){return i.p+"templates/"+({1:"src/containers/Country",2:"src/containers/Post",3:"src/pages/404",4:"src/pages/about",5:"src/pages/blog",6:"src/pages/countries",7:"src/pages/index",10:"vendors~src/pages/index"}[e]||e)+"."+{1:"b2895b8d",2:"51e41522",3:"b1069fac",4:"b6ada200",5:"c2e422ed",6:"bf0d4cff",7:"f1da7fb8",10:"b25f6fc1"}[e]+".js"}(e);var c=new Error;o=function(n){l.onerror=l.onload=null,clearTimeout(u);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",c.type=r,c.request=o,t[1](c)}a[e]=void 0}};var u=setTimeout(function(){o({type:"timeout",target:l})},12e4);l.onerror=l.onload=o,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=n,l=l.slice();for(var u=0;u<l.length;u++)n(l[u]);var s=c;o.push([76,8,9]),t()}({134:function(e,n,t){var r={".":18,"./":18,"./index":18,"./index.js":18};function a(e){var n=o(e);return t(n)}function o(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=134},142:function(e,n,t){"use strict";t.r(n),function(e){var r=t(1),a=t.n(r),o=t(19),i=t.n(o),l=t(61),c=t(28);if(n.default=c.a,"undefined"!=typeof document){var u=document.getElementById("root"),s=u.hasChildNodes()?i.a.hydrate:i.a.render,d=function(e){s(a.a.createElement(l.AppContainer,null,a.a.createElement(e,null)),u)};d(c.a),e&&e.hot&&e.hot.accept("./App",function(){d(c.a)})}}.call(this,t(143)(e))},20:function(e,n,t){"use strict";var r=t(1),a=t.n(r),o=t(6),i=t(23),l=t(9),c=Object(o.default)(i.a).withConfig({displayName:"Link__StyledLink",componentId:"sc-1uu1uln-0"})(["color:",";:hover{color:",";}:active{color:",";}:visited{color:",";}"],l.a.link,l.a.hoveredLink,l.a.activeLink,l.a.visitedLink);n.a=function(e){return a.a.createElement(c,e)}},23:function(e,n,t){"use strict";var r=t(25);t.d(n,"a",function(){return r.Link}),t.d(n,"b",function(){return r.Router})},26:function(e,n,t){"use strict";var r=t(1),a=t.n(r),o=t(6),i=t(27),l=o.default.section.withConfig({displayName:"DefaultOneCol__Wrapper",componentId:"kuze0m-0"})(["width:100%;position:relative;"]),c=Object(o.default)(i.Container).withConfig({displayName:"DefaultOneCol__StyledContainer",componentId:"kuze0m-1"})(["margin:0 auto;"]);n.a=function(e){return a.a.createElement(l,{className:e.className||""},a.a.createElement(c,null,a.a.createElement(i.Row,null,a.a.createElement(i.Col,{xs:4,sm:6,lg:8,offset:{sm:1,lg:2}},e.children))))}},28:function(e,n,t){"use strict";var r=t(1),a=t.n(r),o=t(15),i=t(6),l=t(26),c=t(9),u=i.default.section.withConfig({displayName:"TopBar__TopBarSection",componentId:"sc-1tz0efv-0"})(["width:100%;text-transform:uppercase;font-size:0.7rem;letter-spacing:0.2rem;background-color:",";color:",";"],c.a.highlight1,c.a.highlight4),s=function(){return a.a.createElement(u,null,a.a.createElement(l.a,null,"fernandolopez.dev"))},d=t(23),f=function(){return a.a.createElement("div",null,"This is a dynamic page! It will not be statically exported, but is available at runtime")},p=t(22),m=t(20),g=i.default.section.withConfig({displayName:"BottomBar__BottomBarSection",componentId:"sc-1vxcjy3-0"})(["width:100%;padding-top:1rem;margin-top:1rem;border-top:1px solid ",";font-size:0.8rem;"],c.a.highlight1),h=i.default.ul.withConfig({displayName:"BottomBar__StyledUl",componentId:"sc-1vxcjy3-1"})(["margin:0;padding-left:0;list-style:none;"]),v=i.default.li.withConfig({displayName:"BottomBar__StyledLi",componentId:"sc-1vxcjy3-2"})(["margin:0.5rem 0;"]),b=i.default.span.withConfig({displayName:"BottomBar__StyledSpan",componentId:"sc-1vxcjy3-3"})(["display:inline-block;margin-left:0.5rem;"]),y=function(){return a.a.createElement(g,null,a.a.createElement(l.a,null,a.a.createElement(h,null,a.a.createElement(v,null,a.a.createElement(m.a,{as:"a",href:"https://www.linkedin.com/in/fernando-augusto-l%C3%B3pez-plascencia-0797a111/"},a.a.createElement(p.c,null),a.a.createElement(b,null,"LinkedIn"))),a.a.createElement(v,null,a.a.createElement(m.a,{as:"a",href:"https://www.github.com/sgenius"},a.a.createElement(p.b,null),a.a.createElement(b,null,"Github"))),a.a.createElement(v,null,a.a.createElement(m.a,{as:"a",href:"https://twitter.com/sgenius"},a.a.createElement(p.d,null),a.a.createElement(b,null,"Twitter"))),a.a.createElement(v,null,a.a.createElement(m.a,{as:"a",href:"http://mapasmapas.blogspot.com/"},a.a.createElement(p.a,null),a.a.createElement(b,null,"My old map blog"))))))};t(148);Object(o.addPrefetchExcludes)(["dynamic"]);n.a=function(){return a.a.createElement(o.Root,null,a.a.createElement(s,null),a.a.createElement(a.a.Suspense,{fallback:a.a.createElement("em",null,"Loading...")},a.a.createElement(d.b,null,a.a.createElement(f,{path:"dynamic"}),a.a.createElement(o.Routes,{path:"*"}))),a.a.createElement(y,null))}},40:function(e,n,t){"use strict";t.r(n);var r=t(57),a=[{location:"../node_modules/react-static-plugin-source-filesystem",plugins:[],hooks:{}},{location:"../node_modules/react-static-plugin-reach-router",plugins:[],hooks:t.n(r)()({})},{location:"../node_modules/react-static-plugin-sitemap/dist",plugins:[],hooks:{}},{location:"../node_modules/react-static-plugin-styled-components",plugins:[],hooks:{}},{location:"..",plugins:[],hooks:{}}];n.default=a},55:function(e,n,t){"use strict";t.r(n),function(e){t.d(n,"notFoundTemplate",function(){return y});var r=t(4),a=t.n(r),o=t(5),i=t.n(o),l=t(1),c=t.n(l),u=t(8),s=t.n(u);Object(u.setHasBabelPlugin)();var d={loading:function(){return null},error:function(e){return console.error(e.error),c.a.createElement("div",null,"An error occurred loading this page's template. More information is available in the console.")},ignoreBabelRename:!0},f=s()(i()({id:"../src/pages/404.js",load:function(){return Promise.all([t.e(3).then(t.bind(null,69))]).then(function(e){return e[0]})},path:function(){return a.a.join(e,"../src/pages/404.js")},resolve:function(){return 69},chunkName:function(){return"src/pages/404"}}),d);f.template="../src/pages/404.js";var p=s()(i()({id:"../src/pages/about.js",load:function(){return Promise.all([t.e(4).then(t.bind(null,70))]).then(function(e){return e[0]})},path:function(){return a.a.join(e,"../src/pages/about.js")},resolve:function(){return 70},chunkName:function(){return"src/pages/about"}}),d);p.template="../src/pages/about.js";var m=s()(i()({id:"../src/pages/blog.js",load:function(){return Promise.all([t.e(5).then(t.bind(null,71))]).then(function(e){return e[0]})},path:function(){return a.a.join(e,"../src/pages/blog.js")},resolve:function(){return 71},chunkName:function(){return"src/pages/blog"}}),d);m.template="../src/pages/blog.js";var g=s()(i()({id:"../src/pages/countries.js",load:function(){return Promise.all([t.e(6).then(t.bind(null,72))]).then(function(e){return e[0]})},path:function(){return a.a.join(e,"../src/pages/countries.js")},resolve:function(){return 72},chunkName:function(){return"src/pages/countries"}}),d);g.template="../src/pages/countries.js";var h=s()(i()({id:"../src/pages/index.js",load:function(){return Promise.all([Promise.all([t.e(10),t.e(7)]).then(t.bind(null,75))]).then(function(e){return e[0]})},path:function(){return a.a.join(e,"../src/pages/index.js")},resolve:function(){return 75},chunkName:function(){return"src/pages/index"}}),d);h.template="../src/pages/index.js";var v=s()(i()({id:"../src/containers/Post",load:function(){return Promise.all([t.e(2).then(t.bind(null,73))]).then(function(e){return e[0]})},path:function(){return a.a.join(e,"../src/containers/Post")},resolve:function(){return 73},chunkName:function(){return"src/containers/Post"}}),d);v.template="../src/containers/Post";var b=s()(i()({id:"../src/containers/Country",load:function(){return Promise.all([t.e(1).then(t.bind(null,74))]).then(function(e){return e[0]})},path:function(){return a.a.join(e,"../src/containers/Country")},resolve:function(){return 74},chunkName:function(){return"src/containers/Country"}}),d);b.template="../src/containers/Country",n.default={"../src/pages/404.js":f,"../src/pages/about.js":p,"../src/pages/blog.js":m,"../src/pages/countries.js":g,"../src/pages/index.js":h,"../src/containers/Post":v,"../src/containers/Country":b};var y="../src/pages/404.js"}.call(this,"/")},76:function(e,n,t){t(77),t(132),e.exports=t(139)},9:function(e,n,t){"use strict";var r="rgba(53, 135, 164, 1)",a={background:"#E2E2E2",textColor:"#04080F",grayTextColor:"#4C4E51",highlight1:"rgba(136, 204, 241, 1)",highlight2:"rgba(193, 223, 240, 1)",highlight3:r,highlight4:"rgba(0, 38, 66, 1)",link:r,hoveredLink:r,activeLink:r,visitedLink:r,es:"#6B5E62"};n.a=a}});