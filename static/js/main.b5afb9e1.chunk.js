(this["webpackJsonppokemon-app"]=this["webpackJsonppokemon-app"]||[]).push([[0],{41:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(16),o=a.n(r),i=a(2),s=a(1);function j(e){var t=e.spriteUrl;return Object(s.jsx)("img",{height:"250px",src:t})}var u=a(4),b=a.n(u);function O(e){var t=e.types;return Object(s.jsx)("h3",{children:t.join(", ").replace(/\b\w/g,(function(e){return e.toUpperCase()}))})}var p=a(7),f={sprites:{front_default:void 0}};var h=function(){var e=Object(n.useState)(f),t=Object(i.a)(e,2),a=(t[0],t[1],Object(n.useState)([])),c=Object(i.a)(a,2),r=(c[0],c[1],Object(n.useState)("https://pokeapi.co/api/v2/pokemon")),o=Object(i.a)(r,2),u=(o[0],o[1],Object(n.useState)()),h=Object(i.a)(u,2),d=(h[0],h[1],Object(n.useState)()),m=Object(i.a)(d,2),l=(m[0],m[1],Object(n.useState)(!0)),g=Object(i.a)(l,2),v=g[0],x=g[1],S=Object(n.useState)(""),k=Object(i.a)(S,2),_=k[0],y=k[1],E=Object(n.useState)(""),w=Object(i.a)(E,2),M=w[0],C=w[1],U=Object(n.useState)([]),F=Object(i.a)(U,2),D=F[0],P=F[1],J=Object(n.useState)(0),A=Object(i.a)(J,2),B=A[0],H=A[1],N=Object(n.useState)(""),G=Object(i.a)(N,2),I=G[0],L=G[1],Q=Object(n.useState)(),T=Object(i.a)(Q,2),q=(T[0],T[1],Object(n.useState)([])),z=Object(i.a)(q,2),K=(z[0],z[1]),R=Object(n.useState)([]),V=Object(i.a)(R,2),W=V[0],X=V[1],Y=Object(n.useState)([]),Z=Object(i.a)(Y,2),$=Z[0],ee=Z[1],te=Object(n.useState)([]),ae=Object(i.a)(te,2),ne=ae[0],ce=ae[1],re=Object(n.useState)([]),oe=Object(i.a)(re,2),ie=oe[0],se=oe[1],je=Object(n.useState)([]),ue=Object(i.a)(je,2),be=ue[0],Oe=ue[1],pe=Object(n.useState)([]),fe=Object(i.a)(pe,2),he=(fe[0],fe[1]),de=Object(n.useState)([]),me=Object(i.a)(de,2),le=me[0],ge=me[1],ve=Object(n.useState)(!1),xe=Object(i.a)(ve,2),Se=xe[0],ke=xe[1],_e=Object(n.useState)(void 0),ye=Object(i.a)(_e,2),Ee=ye[0],we=ye[1],Me=Object(n.useState)(0),Ce=Object(i.a)(Me,2),Ue=Ce[0],Fe=Ce[1],De=Object(n.useState)(0),Pe=Object(i.a)(De,2),Je=Pe[0],Ae=Pe[1];function Be(){var e=Math.floor(898*Math.random());x(!0),H(e),Promise.all([He(e),Ne(e),b.a.get("https://pokeapi.co/api/v2/type/")]).then((function(e){var t=e[0].data;y(t.sprites.front_default),C(t.name);var a=t.types.map((function(e){return e.type.name}));P(a);var n=e[1].data;L(n.generation.name),Promise.all(a.map((function(e){return b.a.get("https://pokeapi.co/api/v2/type/".concat(e))}))).then((function(t){x(!1);var a=Object.fromEntries(t[0].data.damage_relations.double_damage_from.map((function(e){return[e.name,2]}))),n=Object.fromEntries(t[0].data.damage_relations.half_damage_from.map((function(e){return[e.name,.5]})));Object.keys(n).forEach((function(e){a[e]=.5}));var c=Object.fromEntries(t[0].data.damage_relations.no_damage_from.map((function(e){return[e.name,0]})));if(Object.keys(c).forEach((function(e){a[e]=c[e]})),t[1]){var r=Object.fromEntries(t[1].data.damage_relations.double_damage_from.map((function(e){return[e.name,2]})));Object.keys(r).forEach((function(e){a[e]?a[e]*=r[e]:a[e]=r[e]}));var o=Object.fromEntries(t[1].data.damage_relations.half_damage_from.map((function(e){return[e.name,.5]})));Object.keys(o).forEach((function(e){a[e]?a[e]*=o[e]:a[e]=o[e]}));var i=Object.fromEntries(t[1].data.damage_relations.no_damage_from.map((function(e){return[e.name,0]})));Object.keys(i).forEach((function(e){a[e]?a[e]*=i[e]:a[e]=i[e]}))}var s=[],j=[],u=[],b=[],O=[],p=[],f=[];e[2].data.results.forEach((function(e){"unknown"!=e.name&&"shadow"!=e.name&&f.push(e.name)})),he(f),f.forEach((function(e){2==a[e]?s.push(e):4==a[e]?j.push(e):.5==a[e]?u.push(e):.25==a[e]?b.push(e):0==a[e]?O.push(e):p.push(e)})),X(s),ee(j),ce(u),se(b),Oe(O),K(a),function(e,t,a,n,c,r){var o=e.concat(t),i=a.concat(n).concat(c),s=o[Math.floor(Math.random()*o.length)],j=i[Math.floor(Math.random()*i.length)],u=r.filter((function(e){return e!=s&&e!=j})),b=[];for(;b.length<2;){var O=u[Math.floor(Math.random()*u.length)];-1==b.indexOf(O)&&b.push(O)}for(var p=[s].concat([j]).concat(b),f=p.length-1;f>0;f--){var h=Math.floor(Math.random()*f),d=p[f];p[f]=p[h],p[h]=d}ge(p)}(s,j,u,b,O,f)}))})).catch((function(e){console.error(e)}))}function He(e){return b.a.get("https://pokeapi.co/api/v2/pokemon/"+e)}function Ne(e){return b.a.get("https://pokeapi.co/api/v2/pokemon-species/"+e)}return Object(n.useEffect)((function(){Be()}),[]),v?"Loading...":Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("div",{children:["High Score: ",Je]}),Object(s.jsx)("div",{children:_&&Object(s.jsx)(j,{spriteUrl:_})}),Object(s.jsx)("h1",{children:M.replace(/\b\w/g,(function(e){return e.toUpperCase()}))}),Ee&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("h3",{children:["Pokedex Number #",B]}),Object(s.jsx)("h4",{children:I.replace(/\b\w/g,(function(e){return e.toUpperCase()}))}),Object(s.jsx)(O,{types:D}),Object(s.jsxs)("div",{children:["Double Damage From: ",W.join(", ").replace(/\b\w/g,(function(e){return e.toUpperCase()}))]}),Object(s.jsxs)("div",{children:["Quadruple Damage From: ",$.join(", ").replace(/\b\w/g,(function(e){return e.toUpperCase()}))]}),Object(s.jsxs)("div",{children:["Half Damage From: ",ne.join(", ").replace(/\b\w/g,(function(e){return e.toUpperCase()}))]}),Object(s.jsxs)("div",{children:["One Fourth Damage From: ",ie.join(", ").replace(/\b\w/g,(function(e){return e.toUpperCase()}))]}),Object(s.jsxs)("div",{children:["No Damage From: ",be.join(", ").replace(/\b\w/g,(function(e){return e.toUpperCase()}))]})]}),!Ee&&Object(s.jsx)("h2",{children:"Select the type that would be effective against this Pokemon! \ud83d\ude0e\ud83d\udc4c"}),Object(s.jsx)("div",{children:le.length>0&&le.map((function(e,t){var a=!1;return e==Ee&&(a=!0),Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(p.a,{variant:a?Se?"success":"danger":"primary",onClick:function(){return function(e){var t=-1!=W.indexOf(e)||-1!=$.indexOf(e);!Ee&&t&&(Fe(Ue+1),Je<Ue+1&&Ae(Ue+1)),we(e),ke(t)}(e)},disabled:Ee,children:e},e),t%2==1&&Object(s.jsx)("br",{})]})}))}),Object(s.jsxs)("h1",{children:[Ee&&Se&&"GOOOOOOD JOB \ud83d\ude1c",Ee&&!Se&&"oh noo... \ud83d\ude14"]}),Object(s.jsx)("div",{children:Ee&&Object(s.jsx)(p.a,{onClick:function(){Se||Fe(0),we(void 0),Be()},children:Se?"Anotha' one":"Try Again?"})}),Object(s.jsxs)("div",{children:["Points: ",Ue]})]})};a(40);o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(h,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.b5afb9e1.chunk.js.map