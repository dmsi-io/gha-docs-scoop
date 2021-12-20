var x=Object.create,m=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var C=e=>m(e,"__esModule",{value:!0});var v=(e,r,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of E(r))!y.call(e,o)&&o!=="default"&&m(e,o,{get:()=>r[o],enumerable:!(n=k(r,o))||n.enumerable});return e},d=e=>v(C(m(e!=null?x(S(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var g=d(require("child_process")),s=d(require("fs")),h=(e,r)=>{let n=(0,s.readFileSync)(e).toString();return n.startsWith("---")?n:`---
title: ${r}
---

${n}

{{< packages >}}`},$=e=>{(0,g.exec)(`rm docs-hugo/content/packages/${e}/**/*.md`),(0,g.exec)("git ls-files",(r,n,o)=>{if(r){console.error(`error: ${r.message}`);return}if(o){console.error(`stderr: ${o}`);return}n.split(`
`).map(c=>c.trim()).filter(c=>c.endsWith(".md")).forEach(c=>{let a=c.replace(/.+\/(.+?\.md)/,"$1"),i=`docs-hugo/content/packages/${e}/${c.replace(/(?:package|private|public|tools)\/|[^\/]+\.md|\/src/g,"")}`;i.endsWith("/")&&(i=i.slice(0,i.length-1));let p=i.split("/").map(t=>t.replace("/","")).filter(t=>t&&t.trim().length>0);if(p.forEach((t,f)=>{let l=p.slice(0,f+1).join("/");if(!(0,s.existsSync)(l)){(0,s.mkdirSync)(l);let u=`${t.charAt(0).toUpperCase()}${t.slice(1)}`;(0,s.writeFileSync)(`${l}/_index.md`,`---
title: ${u}
---
`)}}),a.toLowerCase()==="readme.md"||i.endsWith(a.split(".")[0])){let t=p[p.length-1];t=`${t.charAt(0).toUpperCase()}${t.slice(1)}`,(0,s.writeFileSync)(`${i}/_index.md`,h(c,t))}else(0,s.writeFileSync)(`${i}/${a}`,h(c,a.replace(".md","")))})})};if(require.main===module){let e=process.argv[2];e?$(e):(console.error(`Include the name of the package as an argument to this script in the form of:
${process.execPath} ${process.argv[1]} packageName`),process.exit(1))}
