var x=Object.create;var g=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var C=e=>g(e,"__esModule",{value:!0});var v=(e,r,i,c)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of E(r))!y.call(e,t)&&(i||t!=="default")&&g(e,t,{get:()=>r[t],enumerable:!(c=k(r,t))||c.enumerable});return e},d=(e,r)=>v(C(g(e!=null?x(S(e)):{},"default",!r&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var m=d(require("child_process")),s=d(require("fs")),$=(e,r)=>{let i=(0,s.readFileSync)(e).toString();return i.startsWith("---")?i:`---
title: ${r}
---

${i}

{{< packages >}}`},h=e=>{(0,m.exec)(`rm docs-hugo/content/packages/${e}/**/*.md`),(0,m.exec)("git ls-files",(r,i,c)=>{if(r){console.error(`error: ${r.message}`);return}if(c){console.error(`stderr: ${c}`);return}i.split(`
`).map(t=>t.trim()).filter(t=>t.endsWith(".md")).forEach(t=>{let a=t.replace(/.+\/(.+?\.md)/,"$1"),o=`docs-hugo/content/packages/${e}/${t.replace(/(?:package|private|public|tools)\/|[^\/]+\.md|\/src/g,"")}`;o.endsWith("/")&&(o=o.slice(0,o.length-1)),console.log(`outputDir: ${o}`);let l=o.split("/").map(n=>n.replace("/","")).filter(n=>n&&n.trim().length>0);if(l.forEach((n,f)=>{let p=l.slice(0,f+1).join("/");if(!(0,s.existsSync)(p)){(0,s.mkdirSync)(p);let u=`${n.charAt(0).toUpperCase()}${n.slice(1)}`;(0,s.writeFileSync)(`${p}/_index.md`,`---
title: ${u}
---
`)}}),a.toLowerCase()==="readme.md"||o.endsWith(a.split(".")[0])){let n=l[l.length-1];n=`${n.charAt(0).toUpperCase()}${n.slice(1)}`,console.log("writing to",`./${o}/_index.md`),(0,s.writeFileSync)(`./${o}/_index.md`,$(t,n))}else console.log("writing to",`./${o}/${a}`),(0,s.writeFileSync)(`./${o}/${a}`,$(t,a.replace(".md","")))})})};if(require.main===module){let e=process.argv[2];e?h(e):(console.error(`Include the name of the package as an argument to this script in the form of:
${process.execPath} ${process.argv[1]} packageName`),process.exit(1))}
