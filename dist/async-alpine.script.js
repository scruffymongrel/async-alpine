var c=(t,e)=>[...t.attributes].map(i=>i.name).filter(i=>{for(let s of e.alpine.attributes)if(i.startsWith(s))return!0;return!1}).filter(i=>i!==`${e.alpine.prefix}cloak`),f=(t,e)=>{for(let i of t.attributes)t.node.setAttribute(e.prefix+b(i),t.node.getAttribute(i)),t.node.removeAttribute(i)},l=(t,e)=>{for(let i of t.attributes){let s=b(i);t.node.setAttribute(s,t.node.getAttribute(e.prefix+s)),t.node.removeAttribute(e.prefix+s)}},b=t=>t.startsWith("@")?"x-on:"+t.slice(1):t;var A=class{constructor(t,e,i){this.instance=e,this.status="unloaded",this.src=t.getAttribute(this.instance.config.prefix+this.instance.config.src),this.strategy=t.getAttribute(this.instance.config.prefix+this.instance.config.root)||this.instance.config.defaultStrategy,this.name=t.getAttribute(`${this.instance.config.alpine.prefix}data`).split("(")[0],this.id=t.id||this.instance.config.prefix+i,this.root={node:t,attributes:c(t,this.instance.config)},t.setAttribute(this.instance.config.prefix+this.instance.config.id,this.id),this.children=[...t.querySelectorAll("*")].filter(n=>c(n,this.instance.config).length).filter(n=>!n.hasAttribute(this.instance.config.prefix+this.instance.config.root)).filter(n=>n.closest(`[${this.instance.config.prefix}${this.instance.config.root}]`)===t).map(n=>({node:n,attributes:c(n,this.instance.config)})),this.parents=[];let s=t;do{if(s=s.parentNode.closest(`[${this.instance.config.prefix}${this.instance.config.root}]`),!s)break;let n=e.components.find(o=>o.root.node===s);this.parents.push(n.id)}while(s)}deactivate(){f(this.root,this.instance.config);for(let t of this.children)f(t,this.instance.config)}async download(t){this.status="loading";let e=await this.getModule();t.data(this.name,e),this.activate()}async getModule(){if(this.instance.moduleCache[this.src])return this.instance.moduleCache[this.src];let t=await import(this.src),e=t[this.name]||t.default||Object.values(t)[0]||!1;return this.instance.moduleCache[this.src]=e,e}activate(){l(this.root,this.instance.config);for(let t of this.children)l(t,this.instance.config);this.root.node.removeAttribute(`${this.instance.config.alpine.prefix}cloak`);for(let t of this.children)t.node.removeAttribute(`${this.instance.config.alpine.prefix}cloak`);this.status="loaded",window.dispatchEvent(new CustomEvent("async-alpine:loaded",{detail:{id:this.id}}))}};var j=t=>new Promise(e=>{window.addEventListener("async-alpine:load",i=>{i.detail.id===t.id&&t.status==="unloaded"&&e()})}),p=j;var $=()=>new Promise(t=>{"requestIdleCallback"in window?window.requestIdleCallback(t):setTimeout(t,200)}),u=$;var C=(t,e)=>new Promise(i=>{let s=e.indexOf("("),n=e.slice(s),o=window.matchMedia(n);o.matches?i():o.addEventListener("change",i,{once:!0})}),h=C;var P=(t,e,i)=>new Promise(s=>{if(i!=="unloaded")return s();window.addEventListener("async-alpine:loaded",n=>{n.detail.id===e&&t.status==="unloaded"&&s()})}),m=P;var E=(t,e)=>new Promise(i=>{let s="0px 0px 0px 0px";if(e.indexOf("(")!==-1){let o=e.indexOf("(")+1;s=e.slice(o,-1)}let n=new IntersectionObserver(o=>{o[0].isIntersecting&&(n.disconnect(),i())},{rootMargin:s});n.observe(t.root.node)}),g=E;var k={prefix:"ax-",root:"load",src:"load-src",id:"id",defaultStrategy:"immediate",alpine:{prefix:"x-",attributes:["x-",":","@"]}},d=k;var I=1,w=(t,e={})=>{let i={config:d,components:[],moduleCache:{}};e.prefix&&(i.config.prefix=e.prefix),e.alpinePrefix&&(i.config.alpine.prefix=e.alpinePrefix,i.config.alpine.attributes.push(e.alpinePrefix));let s=document.querySelectorAll(`[${d.prefix}${d.root}]`);if(!!s){for(let n of s){let o=new A(n,i,I++);i.components.push(o)}for(let n of i.components){n.deactivate();let o=n.strategy.split("|").map(r=>r.trim()).filter(r=>r!=="immediate").filter(r=>r!=="eager");if(!o.length){n.download(t);continue}let a=[];for(let r of o){if(r==="idle"){a.push(u());continue}if(r.startsWith("visible")){a.push(g(n,r));continue}if(r.startsWith("media")){a.push(h(n,r));continue}if(r==="event"&&a.push(p(n)),r==="parent"||r==="parents")for(let v of n.parents){let x=i.components.find(y=>y.id===v);a.push(m(n,x.id,x.status))}}Promise.all(a).then(()=>{n.download(t)})}}};document.addEventListener("alpine:init",()=>{w(Alpine)});
