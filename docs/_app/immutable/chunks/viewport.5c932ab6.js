import{r as M}from"./index.5f7dae1e.js";var g=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function W(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var _="Expected a function",E=0/0,$="[object Symbol]",F=/^\s+|\s+$/g,N=/^[-+]0x[0-9a-f]+$/i,R=/^0b[01]+$/i,z=/^0o[0-7]+$/i,A=parseInt,B=typeof g=="object"&&g&&g.Object===Object&&g,P=typeof self=="object"&&self&&self.Object===Object&&self,D=B||P||Function("return this")(),G=Object.prototype,H=G.toString,U=Math.max,X=Math.min,v=function(){return D.Date.now()};function q(e,n,i){var a,c,b,s,r,f,u=0,T=!1,d=!1,p=!0;if(typeof e!="function")throw new TypeError(_);n=S(n)||0,j(i)&&(T=!!i.leading,d="maxWait"in i,b=d?U(S(i.maxWait)||0,n):b,p="trailing"in i?!!i.trailing:p);function y(t){var o=a,l=c;return a=c=void 0,u=t,s=e.apply(l,o),s}function x(t){return u=t,r=setTimeout(m,n),T?y(t):s}function k(t){var o=t-f,l=t-u,I=n-o;return d?X(I,b-l):I}function w(t){var o=t-f,l=t-u;return f===void 0||o>=n||o<0||d&&l>=b}function m(){var t=v();if(w(t))return O(t);r=setTimeout(m,k(t))}function O(t){return r=void 0,p&&a?y(t):(a=c=void 0,s)}function L(){r!==void 0&&clearTimeout(r),u=0,a=f=c=r=void 0}function C(){return r===void 0?s:O(v())}function h(){var t=v(),o=w(t);if(a=arguments,c=this,f=t,o){if(r===void 0)return x(f);if(d)return r=setTimeout(m,n),y(f)}return r===void 0&&(r=setTimeout(m,n)),s}return h.cancel=L,h.flush=C,h}function j(e){var n=typeof e;return!!e&&(n=="object"||n=="function")}function J(e){return!!e&&typeof e=="object"}function K(e){return typeof e=="symbol"||J(e)&&H.call(e)==$}function S(e){if(typeof e=="number")return e;if(K(e))return E;if(j(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=j(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=e.replace(F,"");var i=R.test(e);return i||z.test(e)?A(e.slice(2),i?2:8):N.test(e)?E:+e}var Q=q;const V=W(Q),Z=M({width:0,height:0},e=>{const n=()=>e({width:window.innerWidth,height:window.innerHeight});return n(),window.addEventListener("resize",V(n,250)),()=>{window.removeEventListener("resize",n)}});export{Z as v};