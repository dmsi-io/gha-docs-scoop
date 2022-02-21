var x=Object.create,g=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var C=e=>g(e,"__esModule",{value:!0});var v=(e,r,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of E(r))!y.call(e,i)&&i!=="default"&&g(e,i,{get:()=>r[i],enumerable:!(n=k(r,i))||n.enumerable});return e},d=e=>v(C(g(e!=null?x(S(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var m=d(require("child_process")),o=d(require("fs")),$=(e,r)=>{let n=(0,o.readFileSync)(e).toString();return n.startsWith("---")?n:`---
title: ${r}
---

${n}

{{< packages >}}`},h=e=>{(0,m.exec)(`rm docs-hugo/content/packages/${e}/**/*.md`),(0,m.exec)("git ls-files",(r,n,i)=>{if(r){console.error(`error: ${r.message}`);return}if(i){console.error(`stderr: ${i}`);return}n.split(`
`).map(c=>c.trim()).filter(c=>c.endsWith(".md")).forEach(c=>{let a=c.replace(/.+\/(.+?\.md)/,"$1"),s=`docs-hugo/content/packages/${e}/${c.replace(/(?:package|private|public|tools)\/|[^\/]+\.md|\/src/g,"")}`;s.endsWith("/")&&(s=s.slice(0,s.length-1)),console.log(`outputDir: ${s}`);let l=s.split("/").map(t=>t.replace("/","")).filter(t=>t&&t.trim().length>0);if(l.forEach((t,f)=>{let p=l.slice(0,f+1).join("/");if(!(0,o.existsSync)(p)){(0,o.mkdirSync)(p);let u=`${t.charAt(0).toUpperCase()}${t.slice(1)}`;(0,o.writeFileSync)(`${p}/_index.md`,`---
title: ${u}
---
`)}}),a.toLowerCase()==="readme.md"||s.endsWith(a.split(".")[0])){let t=l[l.length-1];t=`${t.charAt(0).toUpperCase()}${t.slice(1)}`,console.log("writing to",`./${s}/_index.md`),(0,o.writeFileSync)(`./${s}/_index.md`,$(c,t))}else console.log("writing to",`./${s}/${a}`),(0,o.writeFileSync)(`./${s}/${a}`,$(c,a.replace(".md","")))})})};if(require.main===module){let e=process.argv[2];e?h(e):(console.error(`Include the name of the package as an argument to this script in the form of:
${process.execPath} ${process.argv[1]} packageName`),process.exit(1))}
