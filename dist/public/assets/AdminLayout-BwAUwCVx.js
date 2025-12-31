import{c as a,u as m,r as p,j as e,a1 as u,U as b,M as y,a2 as f}from"./index-BTsS2pso.js";import{u as g}from"./useAdminAuth-DPZQ3AaQ.js";import{U as k}from"./users-DQXstw1Y.js";import{P as j,C as v}from"./phone-BNs6ey6n.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=a("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=a("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=a("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=a("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=a("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=a("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]),C=[{path:"/admin",label:"Dashboard",icon:L},{path:"/admin/hero",label:"Hero Section",icon:M},{path:"/admin/about",label:"About Section",icon:H},{path:"/admin/mentors",label:"Mentors",icon:b},{path:"/admin/team",label:"Team Members",icon:k},{path:"/admin/contact",label:"Contact Section",icon:j},{path:"/admin/footer",label:"Footer Section",icon:N},{path:"/admin/emails",label:"Notify Emails",icon:y}];function r({isOpen:t}){return e.jsxs("div",{className:"w-6 h-6 flex flex-col justify-center items-center",children:[e.jsx("span",{className:`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out ${t?"rotate-45 translate-y-1.5":""}`}),e.jsx("span",{className:`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out mt-1.5 ${t?"opacity-0 scale-0":"opacity-100 scale-100"}`}),e.jsx("span",{className:`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out mt-1.5 ${t?"-rotate-45 -translate-y-2":""}`})]})}function E({children:t}){const[i]=m(),[l,n]=p.useState(!1),{isAuthenticated:c,logout:h}=g();if(!c)return e.jsx(u,{to:"/admin/login"});const d=()=>{h()};return e.jsxs("div",{className:"min-h-screen bg-slate-950",children:[!l&&e.jsx("button",{onClick:()=>n(!0),className:"fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-lg","aria-label":"Open menu",children:e.jsx(r,{isOpen:!1})}),e.jsxs("aside",{className:`
        fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-40
        transform transition-transform duration-300 ease-in-out
        ${l?"translate-x-0":"-translate-x-full"}
      `,children:[e.jsxs("div",{className:"p-6 border-b border-slate-800 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-white",children:"Admin Panel"}),e.jsx("p",{className:"text-sm text-slate-400 mt-1",children:"AkashVahini CMS"})]}),e.jsx("button",{onClick:()=>n(!1),className:"p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors","aria-label":"Close menu",children:e.jsx(r,{isOpen:!0})})]}),e.jsx("nav",{className:"p-4 space-y-1",children:C.map(s=>{const x=s.icon,o=i===s.path;return e.jsx(f,{href:s.path,onClick:()=>n(!1),children:e.jsxs("div",{className:`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${o?"bg-cyan-500/20 text-cyan-400 border border-cyan-500/30":"text-slate-400 hover:bg-slate-800 hover:text-white"}
                `,children:[e.jsx(x,{className:"w-5 h-5"}),e.jsx("span",{className:"font-medium",children:s.label}),o&&e.jsx(v,{className:"w-4 h-4 ml-auto"})]})},s.path)})}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 space-y-2",children:[e.jsxs("a",{href:"/",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all",children:[e.jsx(w,{className:"w-5 h-5"}),e.jsx("span",{children:"View Website"})]}),e.jsxs("button",{onClick:d,className:"w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-all",children:[e.jsx(A,{className:"w-5 h-5"}),e.jsx("span",{children:"Logout"})]})]})]}),l&&e.jsx("div",{className:"fixed inset-0 bg-black/50 z-30",onClick:()=>n(!1)}),e.jsx("main",{className:"min-h-screen",children:e.jsx("div",{className:"pt-16 px-6 pb-6",children:t})})]})}export{E as A,N as F,M as H,H as I};
