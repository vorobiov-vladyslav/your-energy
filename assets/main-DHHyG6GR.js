(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const U="https://your-energy.b.goit.study/api";async function g(e,t={}){const a=await fetch(`${U}${e}`,t);if(!a.ok)throw new Error(`HTTP ${a.status}`);return a.json()}function Y(){return g("/quote")}function j(e,t=1,a=12){const r=new URLSearchParams({filter:e,page:t,limit:a});return g(`/filters?${r}`)}function G(e={}){const t=new URLSearchParams(e);return g(`/exercises?${t}`)}function J(e){return g(`/exercises/${e}`)}function K(e,t){return g(`/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}function Q(e){return g("/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})})}function z(){const e=document.querySelector(".quote-card-quote"),t=document.querySelector(".quote-card-author");!e||!t||Y().then(a=>{e.textContent=a.quote,t.textContent=a.author}).catch(()=>{})}function V({name:e,filter:t,imgURL:a}){return`<li class="exercise-card" data-name="${e}" data-filter="${t}">
  <a class="exercise-card-link" href="#">
    <img src="${a}" alt="${e}" class="exercise-card-img" loading="lazy" />
    <div class="exercise-card-overlay">
      <p class="exercise-card-name">${e}</p>
      <p class="exercise-card-subtitle">${t}</p>
    </div>
  </a>
</li>`}function N(e,{showTrash:t=!1}={}){const a=t?`<button class="workout-card-trash" type="button" aria-label="Remove from favorites" data-remove-id="${e._id}">
        <img src="./images/icons/trash.svg" alt="" width="16" height="16" />
      </button>`:"",r=e.rating?e.rating.toFixed(1):"0.0";return`<li class="workout-card" data-exercise-id="${e._id}">
  <div class="workout-card-top">
    <span class="workout-card-badge">WORKOUT</span>
    <span class="workout-card-rating">${r}<img src="./images/icons/star-orange.svg" alt="rating" /></span>
    ${a}
    <button class="workout-card-start" type="button" data-start-id="${e._id}">Start <img src="./images/icons/arrow-right.svg" alt="" /></button>
  </div>
  <div class="workout-card-body">
    <div class="workout-card-icon">
      <img src="./images/icons/running-man-dark.svg" alt="" width="24" height="24" />
    </div>
    <h3 class="workout-card-name">${e.name}</h3>
  </div>
  <div class="workout-card-meta">
    <span>Burned calories: <strong>${e.burnedCalories} / ${e.time} min</strong></span>
    <span>Body part: <strong>${e.bodyPart}</strong></span>
    <span>Target: <strong>${e.target}</strong></span>
  </div>
</li>`}function W(e,t){const a=Z(e.rating),r=t?"Remove from favorites":"Add to favorites",s=t?"heart-filled-dark.svg":"heart-dark.svg";return`<div class="modal-exercise-content">
  <button class="modal-close" type="button" aria-label="Close" data-modal-close>
    <img class="modal-close-icon" src="./images/icons/x-light.svg" alt="" width="24" height="24" />
  </button>
  <div class="modal-exercise-gif">
    <img src="${e.gifUrl}" alt="${e.name}" />
  </div>
  <div class="modal-exercise-info">
    <h3 class="modal-exercise-title">${e.name}</h3>
    <div class="modal-exercise-rating">
      <span class="modal-exercise-rating-value">${e.rating.toFixed(1)}</span>
      <div class="modal-exercise-stars">${a}</div>
    </div>
    <div class="modal-exercise-details">
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Target</span>
        <span class="modal-exercise-detail-value">${e.target}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Body Part</span>
        <span class="modal-exercise-detail-value">${e.bodyPart}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Equipment</span>
        <span class="modal-exercise-detail-value">${e.equipment}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Popular</span>
        <span class="modal-exercise-detail-value">${e.popularity}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Burned calories</span>
        <span class="modal-exercise-detail-value">${e.burnedCalories}/${e.time} min</span>
      </div>
    </div>
    <p class="modal-exercise-desc">${e.description}</p>
    <div class="modal-exercise-actions">
      <button class="modal-btn modal-btn-fav" type="button" data-fav-id="${e._id}">
        <span>${r}</span>
        <img class="modal-btn-fav-icon" src="./images/icons/${s}" alt="" width="18" height="18" />
      </button>
      <button class="modal-btn modal-btn-rating" type="button" data-rating-id="${e._id}">Give a rating</button>
    </div>
  </div>
</div>`}function X(e){return`<div class="modal-rating-content">
  <button class="modal-close" type="button" aria-label="Close" data-modal-close>
    <img class="modal-close-icon" src="./images/icons/x-light.svg" alt="" width="28" height="28" />
  </button>
  <p class="modal-rating-label">Rating</p>
  <div class="modal-rating-row">
    <span class="modal-rating-value">0.0</span>
    <div class="modal-rating-stars">
      ${[1,2,3,4,5].map(t=>`<img class="modal-star" src="./images/icons/star-grey.svg" alt="${t} star" width="24" height="24" data-star="${t}" />`).join("")}
    </div>
  </div>
  <form class="modal-rating-form" data-exercise-id="${e}">
    <input class="modal-rating-email" type="email" name="email" placeholder="Email" required />
    <textarea class="modal-rating-comment" name="review" placeholder="Your comment" rows="4"></textarea>
    <button class="modal-rating-submit" type="submit">Send</button>
    <p class="modal-rating-message" hidden></p>
  </form>
</div>`}function Z(e){const t=Math.round(e);return[1,2,3,4,5].map(a=>`<img src="./images/icons/${a<=t?"star-orange":"star-grey"}.svg" alt="" width="14" height="14" />`).join("")}function $(e,t,a,r){if(e.innerHTML="",a<=1)return;ee(t,a).forEach(i=>{if(i==="..."){const n=document.createElement("span");n.classList.add("pagination-ellipsis"),n.textContent="...",e.appendChild(n)}else{const n=document.createElement("span");n.classList.add("pagination-num"),i===t&&n.classList.add("is-active"),n.textContent=i,n.addEventListener("click",()=>r(i)),e.appendChild(n)}})}function ee(e,t){if(t<=1*2+1*2+3)return Array.from({length:t},(o,D)=>D+1);const s=[],i=Math.max(e-1,2),n=Math.min(e+1,t-1),c=i>3,m=n<t-1-1;for(let o=1;o<=1;o++)s.push(o);if(c)s.push("...");else for(let o=2;o<i;o++)s.push(o);for(let o=i;o<=n;o++)s.push(o);if(m)s.push("...");else for(let o=n+1;o<=t-1;o++)s.push(o);for(let o=t-1+1;o<=t;o++)s.push(o);return s}let d,h;function te(e){if(d=document.querySelector(".exercises-search"),!d)return;d.hidden=!1,h=e;const t=d.querySelector(".exercises-search-input"),a=d.querySelector(".exercises-search-btn");t.addEventListener("keydown",O),a.addEventListener("click",A)}function se(){if(!d)return;d.hidden=!0;const e=d.querySelector(".exercises-search-input"),t=d.querySelector(".exercises-search-btn");e.value="",e.removeEventListener("keydown",O),t.removeEventListener("click",A),d=null,h=null}function O(e){e.key==="Enter"&&(e.preventDefault(),F())}function A(){F()}function F(){if(!d||!h)return;const e=d.querySelector(".exercises-search-input");h(e.value.trim())}let v={},p=1,f,L,P;function ae(e,t,a,r,s,i){if(f=r,L=s,P=i,p=1,v={[t]:e,page:1,limit:10},a){a.innerHTML=`<span class="exercises-title-back">Exercises</span> / <span class="exercises-title-category">${e}</span>`;const n=a.querySelector(".exercises-title-back");n&&(n.style.cursor="pointer",n.addEventListener("click",()=>{I(),a&&(a.innerHTML="Exercises"),P()},{once:!0}))}te(n=>{v.keyword=n||void 0,p=1,v.page=1,E()}),E()}function I(){se(),f&&f.classList.remove("exercises-list--workouts")}async function E(){if(f)try{const e={...v,page:p};Object.keys(e).forEach(s=>e[s]===void 0&&delete e[s]);const t=await G(e),a=t.results||[];a.length===0?f.innerHTML='<li class="workout-card"><p style="padding:20px;text-align:center;">No exercises found.</p></li>':f.innerHTML=a.map(s=>N(s)).join(""),f.classList.add("exercises-list--workouts");const r=parseInt(t.totalPages,10)||1;L&&$(L,p,r,s=>{p=s,E()})}catch{f.innerHTML='<li class="workout-card"><p style="padding:20px;text-align:center;">Failed to load exercises.</p></li>'}}const ne={muscles:"Muscles","body-parts":"Body parts",equipment:"Equipment"},ie={muscles:"muscles","body-parts":"bodypart",equipment:"equipment"};let b="muscles",w=1;function re(){const e=document.querySelector(".exercises-tabs"),t=document.querySelector(".exercises-list"),a=document.querySelector(".exercises-grid .pagination"),r=document.querySelector(".exercises-title");if(!e||!t)return;e.addEventListener("click",i=>{const n=i.target.closest(".exercises-tab");n&&(e.querySelectorAll(".exercises-tab").forEach(c=>c.classList.remove("is-active")),n.classList.add("is-active"),b=n.dataset.filter,w=1,I(),r&&(r.innerHTML="Exercises"),s())}),t.addEventListener("click",i=>{const n=i.target.closest(".exercise-card");if(!n)return;i.preventDefault();const c=n.dataset.name,m=ie[b];ae(c,m,r,t,a,()=>{s()})});function s(){_(b,w,t,a)}s()}async function _(e,t,a,r){try{const s=await j(ne[e],t,12),i=s.results||[];a.innerHTML=i.map(V).join("");const n=parseInt(s.totalPages,10);r&&$(r,t,n,c=>{w=c,_(e,c,a,r)})}catch{a.innerHTML='<li class="exercise-card"><p style="padding:20px;text-align:center;">Failed to load filters.</p></li>'}}const M="favorites",x=8;function y(){try{return JSON.parse(localStorage.getItem(M))||[]}catch{return[]}}function oe(e){const t=y();t.some(a=>a._id===e._id)||(t.push(e),localStorage.setItem(M,JSON.stringify(t)))}function H(e){const t=y().filter(a=>a._id!==e);localStorage.setItem(M,JSON.stringify(t))}function R(e){return y().some(t=>t._id===e)}function T(){const e=document.querySelector(".favorites-list"),t=document.querySelector(".favorites-content .pagination");if(!e)return;let a=1;function r(s){a=s;const i=y();if(i.length===0){e.innerHTML=`<li class="favorites-empty"><p>It appears that you haven't added any exercises to your favorites yet. Start exploring and add exercises that you enjoy to your favorites for easy access in the future.</p></li>`,t&&(t.innerHTML="");return}const n=Math.ceil(i.length/x);a>n&&(a=n);const c=(a-1)*x,m=i.slice(c,c+x);e.innerHTML=m.map(o=>N(o,{showTrash:!0})).join(""),t&&$(t,a,n,r)}e.addEventListener("click",s=>{const i=s.target.closest("[data-remove-id]");i&&(H(i.dataset.removeId),r(a))}),r(1)}function ce(){const e=document.querySelector(".footer-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.querySelector(".footer-input"),r=a.value.trim();if(!r)return;let s=e.querySelector(".footer-form-message");s||(s=document.createElement("p"),s.classList.add("footer-form-message"),e.appendChild(s));try{const i=await Q(r);s.textContent=i.message||"Subscription successful!",s.className="footer-form-message footer-form-message--success",s.hidden=!1,a.value=""}catch{s.textContent="Subscription failed. Please try again.",s.className="footer-form-message footer-form-message--error",s.hidden=!1}})}let l;function le(){l=document.querySelector("[data-modal-rating]"),l&&(l.addEventListener("click",e=>{(e.target===l||e.target.closest("[data-modal-close]"))&&k()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&l&&!l.hidden&&k()}))}function de(e){if(!l)return;l.innerHTML=X(e),l.hidden=!1,document.body.style.overflow="hidden";let t=0;const a=l.querySelectorAll("[data-star]"),r=l.querySelector(".modal-rating-value"),s=l.querySelector(".modal-rating-form");a.forEach(i=>{i.style.cursor="pointer",i.addEventListener("click",()=>{t=parseInt(i.dataset.star,10),ue(a,t),r&&(r.textContent=t.toFixed(1))})}),s&&s.addEventListener("submit",async i=>{i.preventDefault();const n=s.querySelector(".modal-rating-message"),c=s.email.value.trim(),m=s.review.value.trim();if(!t||!c){n&&(n.textContent="Please select a rating and enter your email.",n.hidden=!1);return}try{await K(e,{rate:t,email:c,review:m}),n&&(n.textContent="Thank you for your rating!",n.className="modal-rating-message modal-rating-message--success",n.hidden=!1),setTimeout(()=>k(),1500)}catch{n&&(n.textContent="Failed to send rating. Please try again.",n.className="modal-rating-message modal-rating-message--error",n.hidden=!1)}})}function k(){l&&(l.hidden=!0,l.innerHTML="",document.body.style.overflow="")}function ue(e,t){e.forEach(a=>{const r=parseInt(a.dataset.star,10);a.src=r<=t?"./images/icons/star-orange.svg":"./images/icons/star-grey.svg"})}let u;function me(){u=document.querySelector("[data-modal-exercise]"),u&&(document.addEventListener("click",e=>{const t=e.target.closest("[data-start-id]");t&&fe(t.dataset.startId)}),u.addEventListener("click",e=>{(e.target===u||e.target.closest("[data-modal-close]"))&&q()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!u.hidden&&q()}))}async function fe(e){try{const t=await J(e),a=R(e);u.innerHTML=W(t,a),u.hidden=!1,document.body.style.overflow="hidden";const r=u.querySelector("[data-fav-id]");r&&r.addEventListener("click",()=>{const i=r.querySelector("span"),n=r.querySelector("img");if(R(e)?(H(e),i&&(i.textContent="Add to favorites"),n&&(n.src="./images/icons/heart-dark.svg")):(oe(t),i&&(i.textContent="Remove from favorites"),n&&(n.src="./images/icons/heart-filled-dark.svg")),document.querySelector(".favorites-list")&&document.querySelector(".favorites")){const{initFavoritesPage:m}=ge();m&&m()}});const s=u.querySelector("[data-rating-id]");s&&s.addEventListener("click",()=>{q(),de(s.dataset.ratingId)})}catch{}}function q(){u&&(u.hidden=!0,u.innerHTML="",document.body.style.overflow="")}function ge(){return{initFavoritesPage:window.__reinitFavorites}}const B=document.querySelector("[data-menu-open]"),C=document.querySelector("[data-menu-close]"),S=document.querySelector("[data-menu]");B&&C&&S&&(B.addEventListener("click",()=>{S.classList.add("is-open"),document.body.style.overflow="hidden"}),C.addEventListener("click",()=>{S.classList.remove("is-open"),document.body.style.overflow=""}));z();ce();me();le();document.querySelector(".exercises")&&re();document.querySelector(".favorites")&&(T(),window.__reinitFavorites=T);
//# sourceMappingURL=main-DHHyG6GR.js.map
