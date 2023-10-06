(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();function W(){let e=["home","kontakt","about"];function t(o){for(var i=0;i<e.length;i++)o!==e[i]?document.getElementById(e[i]).style.display="none":document.getElementById(e[i]).style.display="block"}return{menu:t}}const E=`
<ul class="menu-item" id="lang-home">Home</ul>
<ul class="menu-item" id="lang-about">About</ul>
<ul class="menu-item" id="lang-kontakt">Kontakt</ul>
<ul id="lang-menu">
  <label for="language-select"></label>
  <select id="language-select">
  <option value="zh">Chinese</option>
    <option value="en">English</option>

  </select>
</ul>`,h=document.getElementById("menu"),w=document.getElementById("slide-menu-button"),u=document.getElementById("slide-menu");function L(){const e=window.innerWidth,t=window.innerHeight,o=e*t;if(console.log("🚀 ~ file: nav.js:38 ~ setMenu ~ viewportHeight, viewportWidth, screenSize",t,e,o),o>6e5){h.innerHTML=E,h.style.display="flex",u.style.display="none",u.innerHTML="";const i=document.getElementById("lang-menu");i.style="",i.style=`position: absolute;
                          right: 20px;`,w.style.display="none"}else if(o<599999){u.innerHTML=E,h.style.display="none",u.style.display="none",h.innerHTML="";const i=document.getElementById("lang-menu");i.style="",i.style=`margin-right: 20px;
                          margin-left: 20px;
                          margin-top: 10px;`,w.style.display="block"}B()}L();w.addEventListener("click",()=>{u.style.display!=="block"?u.style.display="block":u.style.display==="block"&&(u.style.display="none")});window.addEventListener("resize",function(){L()});const p=W();function B(){document.getElementById("lang-home").onclick=function(){p.menu("home")},document.getElementById("lang-kontakt").onclick=function(){p.menu("kontakt")},document.getElementById("lang-about").onclick=function(){p.menu("about")}}B();p.menu("home");const D={en:{home:"Home",services:"Services",about:"About",gallery:"Gallery",kontakt:"Kontakt",aboutText:`Qianxi Kindergarten is located in Taiwan and is deeply loved and trusted by parents and students. Many parents have said that their children have grown up here, gaining many valuable experiences and knowledge.
    The faculty in the kindergarten is excellent. The teachers are passionate and loving towards the children. They not only teach seriously but also establish deep emotional connections with the children.

    Key features include:
    
    Professional teaching team: Includes specialist teachers in music, physical fitness, and rhythm, ensuring children receive a balanced education in various fields.
    Small class sizes: Ensures every child receives adequate attention and guidance.
    Caring principal: She is not only a good mentor and friend to the children but also a great partner for parents. Whenever a child has needs or faces challenges, she actively steps in to help.
    Nutritious lunches: Prepared by the dedicated kitchen aunt, ensuring the ingredients are healthy and delicious.
    Diverse outdoor activities: During winter and summer breaks, the school organizes various field trips, allowing children to learn while having fun.
    High trust from parents: Many parents believe that this is the best choice for their children's happy growth and successful learning.
    A foreign parent also shared that he had worked here in the past and greatly respects and appreciates the principal's teaching methods and management philosophy.
    The principal not only cares for each student but is also willing to provide space for community use free of charge, showing her vast love and generosity.
    
    In conclusion, Qianxi Kindergarten is an institution filled with love, knowledge, and professionalism. It is highly recommended for all parents and children.`},zh:{home:"首頁",services:"服務",about:"關於",gallery:"畫廊",kontakt:"聯絡",aboutText:`謙禧幼兒園位於台灣，深受家長與學生的喜愛與信賴。許多家長表示，他們的孩子在這裡成長，學習到很多寶貴的經驗與知識
      園內師資優良，老師對孩子充滿熱情與愛心，他們不僅認真教學，還能與孩子建立深厚的情感連結。

      特色如下：
      
      專業的教學團隊：包括音樂、體能、韻律等多元專業老師，讓孩子從各方面獲得均衡的教育。
      小班制教學：確保每位孩子都能得到充分的關注和教導。
      貼心的園長：她不僅是孩子的良師益友，還是家長的好夥伴。當孩子有需求或困難時，她都會主動出手幫助。
      營養豐盛的午餐：由煮飯阿姨親手烹製，保證食材健康且美味。
      多元化的戶外活動：寒暑假時，學校會組織各種校外教學，讓孩子在玩樂中學習。
      家長的高度信賴：不少家長都認為，這裡是讓孩子快樂成長、學有所成的最佳選擇。
      外國家長亦分享，他曾在這裡工作過，非常尊敬且欣賞園長的教學方法與經營理念。園長不僅關心每一位學生，更願意無償提供場地給社區使用，顯示其廣大的愛心與慷慨。
      
      總之，謙禧幼兒園是一個充滿愛、知識與專業的學習機構，真心推薦給所有家長與孩子。`}},f=["lang-home","lang-about","lang-kontakt","lang-aboutText"];function T(e){for(let t=0;t<f.length;t++){const o=document.getElementById(f[t]);if(o){const i=f[t].split("-")[1];o.innerText=D[e][i]}}}function S(){document.getElementById("language-select").onchange=function(){const e=this.value;console.log("🚀 ~ file: lang.js:26 ~ selectedLanguage:",e),console.log("🚀 ~ file: lang.js:26 ~ this.value;:",this.value),T(e)}}S();window.addEventListener("resize",function(){S(),console.log("🚀 ~ file: lang.js:33 ~ initLangSelect:","initLangSelect")});T("zh");const y=document.querySelector(".container");let H="thumb-wrapper";function z(e,t,o){const i=document.createElement("div");i.classList.add(H);const n=document.createElement("div");n.classList.add("full-image"),n.style.backgroundImage=t,n.origImg=o,n.style.backgroundSize="cover",n.style.backgroundPosition="center center",n.style.backgroundRepeat="no-repeat",n.alt=`Full Image ${e+1}`,i.appendChild(n),y.appendChild(i)}function M(){for(console.log("setImages called");y.firstChild;)y.removeChild(y.firstChild);for(let e=0;e<18;e++){const t=`url('assets/img/${e+1}.png')`,o=`url('assets/img/${e+1}.png')`;z(e,t,o)}}document.addEventListener("DOMContentLoaded",function(){function e(){const t=document.querySelectorAll(`.${H}`);function o(m){return Math.floor(Math.random()*m)}const i=o(t.length),a=t[i].querySelector(".full-image");let s=document.getElementById("ani-image");s.style.backgroundImage=a.origImg,s.style.transition="none";const c=a.style.backgroundImage;a.style.backgroundImage="";const d=document.getElementById("lang-welcome"),l=document.getElementById("wellcome-conatainer");k(s,a,d,l),s.getBoundingClientRect(),s.style.transition="left 2s ease, top 2s ease, width 2s ease, height 2s ease";const r=s.style.backgroundImage.split('"')[1];P(r,s,d,l),setTimeout(function(){k(s,a,d,l)},4e3),setTimeout(function(){e(),a.style.backgroundImage=c},6e3)}e()});function k(e,t,o,i){const n=t.getBoundingClientRect();i.style.opacity=.2,o.style.opacity=1,e.style.width=`${n.width}px`,e.style.height=`${n.height}px`,e.style.left=`${n.left}px`,e.style.top=`${n.top}px`}function F(e,t,o,i,n){if(n.style.opacity=.7,i.style.opacity=0,e){const a=window.innerWidth,s=window.innerHeight,c=N(t,o,a/1.2,s/1.2),d=(a-c.width)/2,l=(s-c.height)/2;e.style.left=`${d}px`,e.style.top=`${l}px`,e.style.width=`${c.width}px`,e.style.height=`${c.height}px`}}function P(e,t,o,i){var n=new Image;return n.src=e,new Promise(function(a,s){n.onload=function(){var c=this.width,d=this.height;a([c,d]),F(t,c,d,o,i)},n.onerror=function(c){console.error("Error event:",c),s(new Error("Failed to load the image."))}})}window.addEventListener("resize",function(){C()});C();function C(){let e=document.getElementById("ani-image");e.style.transition="none",e.style.backgroundImage="";const t=window.innerWidth,o=window.innerHeight;t<o?(document.querySelector(".container").style.gridTemplateColumns="repeat(3, 1fr)",M()):(document.querySelector(".container").style.gridTemplateColumns="repeat(6, 1fr)",M())}function N(e,t,o,i){const n=e/t;let a=e,s=t;return a>o&&(a=o,s=a/n),s>i&&(s=i,a=s*n),{width:a,height:s}}let v=!1;const O=.2;function q(){Math.random()<O&&(v=!0,g=-g)}function R(e,t,o){return e+(t-e)*o}setInterval(q,200);let g=1,U=Math.random()*Math.PI*2,b=1;$();setInterval(()=>(b+=Math.random()*(.05-.01)+.01,U+=Math.random()*(.05-.01)+.01),Math.random()*(80-20)+20);function K(e){if(!e||!(e instanceof HTMLElement)){console.warn("Invalid bubble provided to moveBubble function.");return}let t=parseFloat(getComputedStyle(e).width),o=window.innerWidth/2-t/2,i=120;const n=Math.random()*(7-1)+1;let a;const s=.7;function c(){if(e.isMerged){cancelAnimationFrame(a);return}const d=e.querySelector("img"),l=parseFloat(d.style.width);if(Math.abs(g)>s){const r=Math.sign(g),m=Math.max(1+g*.001,.7);o+=r*Math.sin(b)*n,d.style.width=`${l*m}px`,d.style.height=`${l*m}px`}else{let r=Math.random()>.5?1:-1;if(Math.random()<.02){const m=Math.random()*.1+.95,I=R(l,l*m,.05);d.style.width=`${I}px`,d.style.height=`${I}px`}o+=r*Math.sin(b)*n}if(i+=Math.random(),e.style.left=`${o}px`,e.style.bottom=`${i}px`,v&&(g=-g,v=!1),parseInt(e.style.left)>window.innerWidth-t||parseInt(e.style.bottom)>window.innerHeight-t||parseInt(e.style.left)<0||parseInt(e.style.bottom)<0||l>350||l<20||e.destroy===!0){e.dataset.outOfBounds="true",e.remove(),cancelAnimationFrame(a);let r=document.createElement("div");r.style.width=l*2+"px",r.style.height=l*2+"px",r.style.left=`${parseFloat(e.style.left)-l/2}px`,r.style.bottom=`${parseFloat(e.style.bottom)-l/2}px`,r.className="bubble-burst",document.body.appendChild(r),r.addEventListener("animationend",function(){r.remove(),r=null}),document.getElementsByClassName("image-container").length===0&&$();return}a=requestAnimationFrame(c)}c()}function $(){for(let e=0;e<25;e++)setTimeout(()=>J(),500+100*e);_(),setTimeout(()=>G(),500),setTimeout(()=>Q(),2500),setTimeout(()=>j(),3e3)}function j(){const e=document.getElementById("animatedBunny");e.classList.remove("bunnyArmUpDown"),e.classList.add("bunnyHandMix"),e.style.animation="bunnyAnimation 1.5s infinite"}function _(){const e=document.getElementById("animatedBunny");e.classList.remove("bunnyHandMix"),e.classList.add("bunnyArmUpDown"),e.style.animation="armUpDownAnimation 0.5s forwards"}function G(){const e=document.getElementById("animatedBunny");e.classList.remove("bunnyArmUpDown"),e.classList.add("bunnyHeadSwing"),e.style.animation="headswingAnimation 1.5s infinite"}function Q(){const e=document.getElementById("animatedBunny");e.style.animation="armUpDownAnimation 0.5s forwards reverse"}function Y(e,t){return Math.random()*(t-e+1)+e}function J(){const e=document.createElement("div");e.classList.add("image-container");const t=document.createElement("img");t.src="public/assets/ani/bubbleImg/output.gif",t.alt="Bubble Animation",t.classList.add("sliding"),e.appendChild(t);const o=Math.random()*(100-50)+50;t.style.width=`${o}px`,t.style.height=`${o}px`,document.body.appendChild(e),setInterval(()=>{const i=e.querySelector("img.active");i&&i.classList.remove("active"),t.src=images[currentBubbleFrame],t.classList.add("active"),currentBubbleFrame=(currentBubbleFrame+1)%71},100),e.style.opacity=Y(.3,.7),e.destroy=!1,e.onclick=function(){this.destroy=!0},e.addEventListener("dragstart",function(i){i.preventDefault()}),K(e)}let x=!1;function A(){x||(x=!0)}document.addEventListener("click",A);document.addEventListener("touchstart",A);
