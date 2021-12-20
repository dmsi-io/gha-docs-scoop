var x=Object.create;var m=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var C=e=>m(e,"__esModule",{value:!0});var v=(e,r,o,c)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of E(r))!y.call(e,t)&&(o||t!=="default")&&m(e,t,{get:()=>r[t],enumerable:!(c=k(r,t))||c.enumerable});return e},d=(e,r)=>v(C(m(e!=null?x(S(e)):{},"default",!r&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var g=d(require("child_process"),1),n=d(require("fs"),1),h=(e,r)=>{let o=(0,n.readFileSync)(e).toString();return o.startsWith("---")?o:`---
title: ${r}
---

${o}

{{< packages >}}`},$=e=>{(0,g.exec)(`rm docs-hugo/content/packages/${e}/**/*.md`),(0,g.exec)("git ls-files",(r,o,c)=>{if(r){console.error(`error: ${r.message}`);return}if(c){console.error(`stderr: ${c}`);return}o.split(`
`).map(t=>t.trim()).filter(t=>t.endsWith(".md")).forEach(t=>{let a=t.replace(/.+\/(.+?\.md)/,"$1"),i=`docs-hugo/content/packages/${e}/${t.replace(/(?:package|private|public|tools)\/|[^\/]+\.md|\/src/g,"")}`;i.endsWith("/")&&(i=i.slice(0,i.length-1));let l=i.split("/").map(s=>s.replace("/","")).filter(s=>s&&s.trim().length>0);if(l.forEach((s,f)=>{let p=l.slice(0,f+1).join("/");if(!(0,n.existsSync)(p)){(0,n.mkdirSync)(p);let u=`${s.charAt(0).toUpperCase()}${s.slice(1)}`;(0,n.writeFileSync)(`${p}/_index.md`,`---
title: ${u}
---
`)}}),a.toLowerCase()==="readme.md"||i.endsWith(a.split(".")[0])){let s=l[l.length-1];s=`${s.charAt(0).toUpperCase()}${s.slice(1)}`,(0,n.writeFileSync)(`${i}/_index.md`,h(t,s))}else(0,n.writeFileSync)(`${i}/${a}`,h(t,a.replace(".md","")))})})};if(require.main===module){let e=process.argv[2];e?$(e):(console.error(`Include the name of the package as an argument to this script in the form of:
${process.execPath} ${process.argv[1]} packageName`),process.exit(1))}
