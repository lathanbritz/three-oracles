import{_ as f,$ as w,r as h,o as c,c as l,a as t,F as p,b as $,d as N,p as M,e as E,f as u,t as _,n as v,g as m,h as P,i as W,u as q,j as C,w as O,k as S,l as J,m as X,q as V,s as T,v as U,x as Y,V as j,y as z,z as G,A as K}from"./vendor.f4defb24.js";const Q=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}};Q();let g=null;const Z={name:"Home",data(){return{oracle_data:{},oracle_data_alts:{},animate:!0}},async mounted(){g=new WebSocket("ws://localhost:5000"),this.connectWebsocket()},methods:{progressBar(){console.log("animate progressBar"),this.animate=!1,w(".progress-bar").animate({width:"100%"},3e4),setInterval(function(){w(".progress-bar").animate({width:"100%"},3e4)},3e4)},connectWebsocket(){const e=this;g.onopen=function(o){g.send(JSON.stringify({request:"SUBSCRIBE",message:e.key,channel:"currency"})),g.send(JSON.stringify({request:"SUBSCRIBE",message:e.key,channel:"alt"})),console.log("sockets connected! :)")},g.onmessage=function(o){const a=JSON.parse(o.data);a.currency!=null&&(console.log(a.currency.symbol),e.fetchData(a.currency),e.animate&&e.progressBar()),a.alt!=null&&(console.log(a.alt.symbol),e.fetchData(a.alt),e.animate&&e.progressBar())},g.onerror=function(o){console.log("There was an error connection to socket websocket! :("),console.log(o),g.close()},g.onclose=function(o){console.log("socket disconnected!")}},fetchData:function(e){if(e==null)return{};const o=e.symbol;e.color_bg="bg-purple",console.log("previous: "+e.previous),"previous"in e&&(e.previous>e.filteredMedian?e.color_bg="bg-pink":e.color_bg="bg-green"),console.log(e.symbol+":"+e.type),e.type=="currency"?this.oracle_data[o]=e:this.oracle_data_alts[o]=e},theFormat(e){return e.toFixed(8)}}},x=e=>(M("data-v-750be191"),e=e(),E(),e),ee=N('<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" data-v-750be191><div class="col-md-5 p-lg-5 mx-auto my-5" data-v-750be191><h1 class="display-4 fw-normal" data-v-750be191>XRPL ORACLES</h1><p class="lead fw-normal" data-v-750be191>BY THREE</p></div><div class="product-device shadow-sm d-none d-md-block" data-v-750be191></div><div class="product-device product-device-2 shadow-sm d-none d-md-block" data-v-750be191></div></div>',1),te={class:"row align-items-md-stretch"},se=x(()=>t("div",{class:"col-md-6"},[t("div",{class:"h-100 p-5 text-white bg-dark rounded-3"},[t("h2",null,"Oracle signals"),t("p",null,"Clone, deploy, configure. Your own oracle today."),t("p",null,"Libraries and services."),t("button",{class:"btn btn-outline-light",type:"button"},"Get Started")])],-1)),oe={class:"col-md-6"},ne={class:"h-100 p-5 bg-dark text-white rounded-3"},ae=x(()=>t("h2",null,"Feed your contracts",-1)),re=x(()=>t("div",{class:"progress progress-striped active"},[t("div",{class:"progress-bar progress-bar-success",style:{width:"0%"}})],-1)),ce={class:"list-group"},le={key:0,class:"list-group-item bg-purple"},ie=x(()=>t("span",{class:"float-end"},"-",-1)),de={class:"float-end"},ue=x(()=>t("br",null,null,-1)),_e={class:"list-group"},me={key:0,class:"list-group-item bg-purple"},pe=x(()=>t("span",{class:"float-end"},"-",-1)),he={class:"float-end"};function fe(e,o,a,n,r,i){const d=h("number");return c(),l(p,null,[ee,t("div",te,[se,t("div",oe,[t("div",ne,[ae,re,(c(!0),l(p,null,$(r.oracle_data,s=>(c(),l("ul",ce,[s.filteredMedian===void 0?(c(),l("li",le,[u(_(s.symbol)+" ",1),ie])):(c(),l("li",{key:1,class:v(["list-group-item",s.color_bg])},[u(_(s.symbol)+" ",1),t("span",de,[m(d,{ref:s.symbol,from:s.previous,to:s.filteredMedian,format:i.theFormat,duration:1,delay:0,easing:"Power1.easeOut"},null,8,["from","to","format"])])],2))]))),256)),ue,(c(!0),l(p,null,$(r.oracle_data_alts,s=>(c(),l("ul",_e,[s.filteredMedian===void 0?(c(),l("li",me,[u(_(s.symbol)+" ",1),pe])):(c(),l("li",{key:1,class:v(["list-group-item",s.color_bg])},[u(_(s.symbol)+" ",1),t("span",he,[m(d,{ref:s.symbol,from:s.previous,to:s.filteredMedian,format:i.theFormat,duration:1,delay:0,easing:"Power1.easeOut"},null,8,["from","to","format"])])],2))]))),256))])])])],64)}var ve=f(Z,[["render",fe],["__scopeId","data-v-750be191"]]);let b=null;const ge={name:"Home",data(){return{oracle_data:{},oracle_data_alts:{},animate:!0}},async mounted(){b=new WebSocket("ws://localhost:5000"),this.connectWebsocket()},methods:{progressBar(){console.log("animate progressBar"),this.animate=!1,w(".progress-bar").animate({width:"100%"},3e4),setInterval(function(){w(".progress-bar").animate({width:"100%"},3e4)},3e4)},connectWebsocket(){const e=this;b.onopen=function(o){b.send(JSON.stringify({request:"SUBSCRIBE",message:e.key,channel:"currency"})),b.send(JSON.stringify({request:"SUBSCRIBE",message:e.key,channel:"alt"})),console.log("sockets connected! :)")},b.onmessage=function(o){const a=JSON.parse(o.data);a.currency!=null&&(console.log(a.currency.symbol),e.fetchData(a.currency),e.animate&&e.progressBar()),a.alt!=null&&(console.log(a.alt.symbol),e.fetchData(a.alt),e.animate&&e.progressBar())},b.onerror=function(o){console.log("There was an error connection to socket websocket! :("),console.log(o),b.close()},b.onclose=function(o){console.log("socket disconnected!")}},fetchData:function(e){if(e==null)return{};const o=e.symbol;e.color_bg="bg-purple",console.log("previous: "+e.previous),"previous"in e&&(e.previous>e.filteredMedian?e.color_bg="bg-pink":e.color_bg="bg-green"),console.log(e.symbol+":"+e.type),e.type=="currency"?this.oracle_data[o]=e:this.oracle_data_alts[o]=e},theFormat(e){return e.toFixed(8)}}},L=e=>(M("data-v-3d78a4ac"),e=e(),E(),e),be=N('<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" data-v-3d78a4ac><div class="col-md-5 p-lg-5 mx-auto my-5" data-v-3d78a4ac><h1 class="display-4 fw-normal" data-v-3d78a4ac>XRPL ORACLES</h1><p class="lead fw-normal" data-v-3d78a4ac>BY THREE</p></div><div class="product-device shadow-sm d-none d-md-block" data-v-3d78a4ac></div><div class="product-device product-device-2 shadow-sm d-none d-md-block" data-v-3d78a4ac></div></div>',1),ye={class:"row align-items-md-stretch"},ke=L(()=>t("div",{class:"col-md-6"},[t("div",{class:"h-100 p-5 text-white bg-dark rounded-3"},[t("h2",null,"Oracle signals"),t("p",null,"Clone, deploy, configure. Your own oracle today."),t("p",null,"Libraries and services."),t("button",{class:"btn btn-outline-light",type:"button"},"Get Started")])],-1)),we={class:"col-md-6"},$e={class:"h-100 p-5 bg-dark text-white rounded-3"},xe=L(()=>t("h2",null,"Feed your contracts",-1)),Le=L(()=>t("div",{class:"progress progress-striped active"},[t("div",{class:"progress-bar progress-bar-success",style:{width:"0%"}})],-1)),Se={class:"list-group"},Be={key:0,class:"list-group-item bg-purple"},Ne=L(()=>t("span",{class:"float-end"},"-",-1)),Me={class:"float-end"},Ee=L(()=>t("br",null,null,-1)),Oe={class:"list-group"},Re={key:0,class:"list-group-item bg-purple"},Ie=L(()=>t("span",{class:"float-end"},"-",-1)),Ce={class:"float-end"};function Fe(e,o,a,n,r,i){const d=h("number");return c(),l(p,null,[be,t("div",ye,[ke,t("div",we,[t("div",$e,[xe,Le,(c(!0),l(p,null,$(r.oracle_data,s=>(c(),l("ul",Se,[s.filteredMedian===void 0?(c(),l("li",Be,[u(_(s.symbol)+" ",1),Ne])):(c(),l("li",{key:1,class:v(["list-group-item",s.color_bg])},[u(_(s.symbol)+" ",1),t("span",Me,[m(d,{ref:s.symbol,from:s.previous,to:s.filteredMedian,format:i.theFormat,duration:1,delay:0,easing:"Power1.easeOut"},null,8,["from","to","format"])])],2))]))),256)),Ee,(c(!0),l(p,null,$(r.oracle_data_alts,s=>(c(),l("ul",Oe,[s.filteredMedian===void 0?(c(),l("li",Re,[u(_(s.symbol)+" ",1),Ie])):(c(),l("li",{key:1,class:v(["list-group-item",s.color_bg])},[u(_(s.symbol)+" ",1),t("span",Ce,[m(d,{ref:s.symbol,from:s.previous,to:s.filteredMedian,format:i.theFormat,duration:1,delay:0,easing:"Power1.easeOut"},null,8,["from","to","format"])])],2))]))),256))])])])],64)}var De=f(ge,[["render",Fe],["__scopeId","data-v-3d78a4ac"]]);let y=null;const Ae={name:"Xrpl",data(){return{oracle_data:{},previous:{},animate:!0,client:null,ledger_index:null}},async mounted(){y=new WebSocket("ws://localhost:5000"),this.connectWebsocket()},methods:{progressBar(){console.log("animate progressBar"),this.animate=!1,w(".progress-bar").animate({width:"100%"},3e4),setInterval(function(){w(".progress-bar").animate({width:"100%"},3e4)},3e4)},connectWebsocket(){const e=this;y.onopen=function(o){y.send(JSON.stringify({request:"SUBSCRIBE",message:e.key,channel:"oracles"})),console.log("sockets connected! :)")},y.onmessage=function(o){const a=JSON.parse(o.data);a.oracles!=null&&(console.log(a.oracles),e.fetchData(a.oracles),e.animate&&e.progressBar())},y.onerror=function(o){console.log("There was an error connection to socket websocket! :("),console.log(o),y.close()},y.onclose=function(o){console.log("socket disconnected!")}},fetchData:function(e){if(e==null)return{};this.ledger_index=e.ledger_index;const o={symbol:e.limited_amount.currency,filteredMedian:e.limited_amount.value,color_bg:"bg-purple",meta:JSON.stringify(e.meta,void 0,2)};this.oracle_data[o.symbol]!=null&&(o.filteredMedian<this.oracle_data[o.symbol].filteredMedian?o.color_bg="bg-pink":o.color_bg="bg-green"),this.oracle_data[o.symbol]=o},theFormat(e){return e.toFixed(8)}}},F=e=>(M("data-v-b5174a12"),e=e(),E(),e),He=N('<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" data-v-b5174a12><div class="col-md-5 p-lg-5 mx-auto my-5" data-v-b5174a12><h1 class="display-4 fw-normal" data-v-b5174a12>XRPL ORACLES</h1><p class="lead fw-normal" data-v-b5174a12>BY THREE</p></div><div class="product-device shadow-sm d-none d-md-block" data-v-b5174a12></div><div class="product-device product-device-2 shadow-sm d-none d-md-block" data-v-b5174a12></div></div>',1),Pe={class:"row align-items-md-stretch"},We={class:"col-md-12"},qe={class:"h-100 p-5 bg-dark text-white rounded-3"},Je=F(()=>t("div",{class:"progress progress-striped active"},[t("div",{class:"progress-bar progress-bar-success",style:{width:"0%"}})],-1)),Xe={class:"list-group"},Ve={key:0,class:"list-group-item bg-purple"},Te=F(()=>t("span",{class:"float-end"},"-",-1)),Ue=["href"],Ye={class:"float-end"},je=["id"],ze={class:"card card-body"};function Ge(e,o,a,n,r,i){const d=h("number");return c(),l(p,null,[He,t("div",Pe,[t("div",We,[t("div",qe,[t("h2",null,"Ledger "+_(r.ledger_index),1),Je,(c(!0),l(p,null,$(r.oracle_data,s=>(c(),l("ul",Xe,[s.filteredMedian===void 0?(c(),l("li",Ve,[u(_(s.symbol)+" ",1),Te])):(c(),l("li",{key:1,class:v(["list-group-item",s.color_bg])},[t("a",{class:"btn btn-dark","data-bs-toggle":"collapse",href:"#"+s.symbol,role:"button","aria-expanded":"false","aria-controls":"collapseExample"},"XRP/"+_(s.symbol),9,Ue),t("span",Ye,[m(d,{ref:s.symbol,from:s.previous,to:s.filteredMedian,format:i.theFormat,duration:1,delay:0,easing:"Power1.easeOut"},null,8,["from","to","format"])]),t("div",{class:"collapse",id:s.symbol},[t("div",ze,[t("pre",null,_(s.meta),1)])],8,je)],2))]))),256))])])])],64)}var Ke=f(Ae,[["render",Ge],["__scopeId","data-v-b5174a12"]]);const D=[{path:"/",name:"Home",component:ve,meta:{layout:"MainLayout"}},{path:"/monitor",name:"Monitor",component:De,meta:{layout:"MainLayout"}},{path:"/xrpl",name:"Xrpl",component:Ke,meta:{layout:"MainLayout"}}],Qe=P(),Ze=W({history:Qe,routes:D}),et={data(){return{access:null}},setup(){const e=D,o=q(),a=C(()=>o.currentRoute.value.path),n=d=>d===a.value,r=a.value,i=C(()=>o.currentRoute.value.name);return{isActive:n,routes:e,path:r,pathName:i}},mounted(){window.matchMedia("(max-width: 990px )"),this.pathName==="Home"&&document.body.classList.add("text-white","bg-dark","front"),((n,r,i,d)=>{const s=document.getElementById(n),k=document.getElementById(r),R=document.getElementById(i),I=document.getElementById(d);s&&k&&R&&I&&s.addEventListener("click",()=>{console.log("clickeeedd"),k.classList.toggle("show"),s.classList.toggle("bx-x"),R.classList.toggle("body-pd"),I.classList.toggle("body-pd")})})("header-toggle","nav-bar","body-pd","header");const o=document.querySelectorAll(".nav_link");function a(){o&&(o.forEach(n=>n.classList.remove("active")),this.classList.add("active"))}o.forEach(n=>n.addEventListener("click",a))},updated(){document.body.classList.remove("text-white","bg-dark","front"),this.pathName==="Home"&&document.body.classList.add("text-white","bg-dark","front")},destroyed(){console.log("destroyed"),document.body.classList.remove("text-white","bg-dark","front")}},tt=t("header",{class:"header",id:"header"},[t("div",{class:"header_toggle"},[t("i",{class:"bx bx-menu",id:"header-toggle"})])],-1),st={class:"l-navbar",id:"nav-bar"},ot={class:"nav"},nt={key:0,class:"bx bx-tone nav_icon"},at=u(),rt=t("span",{class:"nav_name"},"Main",-1),ct={class:"nav_list"},lt={key:0,class:"bx bx-trip nav_icon"},it=u(),dt=t("span",{class:"nav_name"},"Monitor",-1),ut={key:0,class:"bx bx-x nav_icon"},_t=u(),mt=t("span",{class:"nav_name"},"XRPL",-1),pt=t("i",{class:"bx bx-log-out nav_icon"},null,-1),ht=u(),ft=t("span",{class:"nav_name"},"SignOut",-1),vt=[pt,ht,ft];function gt(e,o,a,n,r,i){const d=h("router-link");return c(),l(p,null,[tt,t("div",st,[t("nav",ot,[t("div",null,[m(d,{to:n.routes[0].path,class:v(["nav_link",{active:n.isActive(n.routes[0].path)}]),title:n.routes[0].name},{default:O(()=>[n.routes[0].path==="/"?(c(),l("i",nt)):S("",!0),at,rt,u(" "+_(n.routes[0].path!=="/"?n.routes[0].name:""),1)]),_:1},8,["to","title","class"]),t("div",ct,[m(d,{to:n.routes[1].path,class:v(["nav_link",{active:n.isActive(n.routes[1].path)}]),title:n.routes[1].name},{default:O(()=>[n.routes[1].path==="/monitor"?(c(),l("i",lt)):S("",!0),it,dt,u(" "+_(n.routes[1].path!=="/monitor"?n.routes[1].name:""),1)]),_:1},8,["to","title","class"]),m(d,{to:n.routes[2].path,class:v(["nav_link",{active:n.isActive(n.routes[2].path)}]),title:n.routes[2].name},{default:O(()=>[n.routes[2].path==="/xrpl"?(c(),l("i",ut)):S("",!0),_t,mt,u(" "+_(n.routes[2].path!=="/xrpl"?n.routes[2].name:""),1)]),_:1},8,["to","title","class"])])]),r.access===!0?(c(),l("a",{key:0,onClick:o[0]||(o[0]=(...s)=>e.logout&&e.logout(...s)),class:"nav_link"},vt)):S("",!0)])])],64)}var A=f(et,[["render",gt]]);const bt={setup(){const e=new Date().getFullYear(),o=J([2019,e]),a=X([]);return V(()=>{a.value=[]}),{list:o,divs:a}}},yt={key:0};function kt(e,o,a,n,r,i){return c(!0),l(p,null,$(n.list,(d,s)=>(c(),l("span",{ref:k=>{n.divs[s]=k},key:d},[u(_(d)+" ",1),s!=Object.keys(n.list).length-1?(c(),l("span",yt,"-\xA0")):S("",!0)],512))),128)}var H=f(bt,[["render",kt]]);const wt={name:"MainLayout",components:{Nav:A,Refs:H}},$t={class:"dashboard"},xt={class:"container flex-shrink-0 mb-4"},Lt={class:"container footer mb-2 mt-auto"},St={class:"border-top py-3"},Bt=u(" \xA9 How ");function Nt(e,o,a,n,r,i){const d=h("Nav"),s=h("router-view"),k=h("Refs");return c(),l("div",$t,[m(d),t("main",xt,[m(s)]),t("footer",Lt,[t("div",St,[Bt,m(k)])])])}var Mt=f(wt,[["render",Nt],["__scopeId","data-v-02addc27"]]);const Et={name:"MainLayout",components:{Nav:A,Refs:H}},Ot={class:"dashboard dashboard-compact"},Rt={class:"container flex-shrink-0 mb-4"},It=t("footer",{class:"container footer mb-2 mt-auto"},[t("div",{class:"border-top py-3 fs-6 text-center"}," Data provided from oracles powers on-chain financial instruments, amm's, contracts, cheques, loans, the list is endless. ")],-1);function Ct(e,o,a,n,r,i){const d=h("Nav"),s=h("router-view");return c(),l("div",Ot,[m(d),t("main",Rt,[m(s)]),It])}var Ft=f(Et,[["render",Ct]]);const Dt={components:{DefaultLayout:Mt,MainLayout:Ft},data(){return{layout:null}},watch:{$route(e){this.layout=e.meta.layout!==void 0?e.meta.layout:"DefaultLayout"}}};function At(e,o,a,n,r,i){return c(),T(U(r.layout))}var Ht=f(Dt,[["render",At]]);const B=Y(Ht);B.use(Ze);B.use(j);B.use(z);B.use(G,K);B.mount("#app");
