import{d as u,o as d,r as l,c as p,a as e,t as _,b as o,w as n,u as a,e as i,f as s,g as c}from"./index-cac98452.js";const f={class:"container text-center mt-5"},m=e("h3",{class:"code-font"},"Page Not found",-1),k=u({__name:"PageNotFound",setup(h){return d(()=>{document.title="Page not found"}),(r,g)=>{const t=l("RouterLink");return i(),p("div",f,[m,e("p",null," We could not find the page at '"+_(r.$route.path)+"' ",1),e("p",null,[o(t,{to:a(c).home},{default:n(()=>[s(" Home ")]),_:1},8,["to"])]),e("p",null,[o(t,{to:a(c).post_list},{default:n(()=>[s(" Posts ")]),_:1},8,["to"])])])}}});export{k as default};