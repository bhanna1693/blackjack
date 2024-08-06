var F=Object.defineProperty;var R=(r,e,t)=>e in r?F(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var v=(r,e,t)=>R(r,typeof e!="symbol"?e+"":e,t);import{d as V,r as p,c as m,u as W,D as H,a as T,o as c,b as i,e as o,F as b,f as I,n as N,g as P,_ as L,h as Y,i as z,t as j,j as _,s as A,k as l,l as O,m as U}from"./index-078nt6D3.js";class J{constructor(e){v(this,"playerType","player");v(this,"name","");v(this,"cards",[]);v(this,"id","");v(this,"isDealer");this.name=e.name,this.id=e.name,this.playerType=e.playerType??"player",this.cards=e.cards??[],this.isDealer=this.playerType==="dealer"}}class $ extends J{constructor(){super(...arguments);v(this,"finalScore",0);v(this,"currentScore",0);v(this,"hasBlackjack",!1);v(this,"isBusted",!1)}playerReset(){this.cards=[],this.finalScore=0,this.currentScore=0,this.hasBlackjack=!1,this.isBusted=!1}calculateCurrentState(){this.currentScore=this.getPlayerScore(),this.isBusted=this.currentScore>21,this.hasBlackjack=this.cards.length===2&&this.currentScore===21,(this.isBusted||this.hasBlackjack)&&(this.finalScore=this.currentScore)}addCard(t){this.cards.push(t),this.calculateCurrentState(),(this.isBusted||this.hasBlackjack)&&this.stand()}stand(){this.cards.forEach(t=>t.setFaceUp()),this.calculateCurrentState(),this.finalScore=this.currentScore}getPlayerScore(){return[...this.cards].sort((a,u)=>a.isAce?1:-1).reduce((a,u)=>{let h=0;return u.rank==="A"?a+11>21?h=1:h=11:["K","Q","J"].includes(u.rank)?h=10:h=parseInt(u.rank),a+h},0)}}class K extends ${constructor(){super({name:"Dealer",playerType:"dealer",cards:[]})}}const M=V("blackjack",()=>{const r=p(new K),e=p([new $({name:"Brian"})]),t=p(-1),a=p(f()),u=m(()=>t.value>e.value.length-1),h=m(()=>t.value>-1?e.value[t.value]:void 0),d=p("init"),S=m(()=>d.value==="over"),D=m(()=>d.value==="inProgress"),B=m(()=>d.value==="init");function f(){const s=W();return new H({backImgChoice:s.selectedCardImage})}function x(){t.value=-1,d.value="inProgress",a.value=f(),a.value.shuffle(),r.value.playerReset(),e.value.forEach(s=>s.playerReset());for(let s=0;s<2;s++){e.value.forEach(E=>E.addCard(a.value.dealCard()));const g=a.value.dealCard();s===0&&g.setFaceDown(),r.value.addCard(g)}n(),r.value.hasBlackjack&&(e.value.forEach(s=>k(s)),y())}function n(){var s,g;t.value++,u.value?y():((s=h.value)!=null&&s.hasBlackjack||(g=h.value)!=null&&g.isBusted)&&n()}function w(s){s.addCard(a.value.dealCard()),(s.isBusted||s.hasBlackjack)&&k(s)}function k(s){s.stand(),n()}function C(s){s.addCard(a.value.dealCard()),k(s)}function y(){for(console.log("dealer turn"),r.value.cards.forEach(s=>s.setFaceUp()),r.value.calculateCurrentState();r.value.currentScore<17;)r.value.addCard(a.value.dealCard());r.value.stand(),d.value="over"}return{dealer:r,players:e,activePlayerIndex:t,deck:a,isDealersTurn:u,isGameOver:S,isGameInProgress:D,isGameInit:B,startGame:x,playerHit:w,playerStand:k,playerDoubleDown:C,dealersTurn:y}}),Q={key:0,class:"flex flex-col items-center"},q={class:"m-0 mt-1"},G=T({__name:"BlackjackHand",props:{player:{}},setup(r){const e=r,t=m(()=>e.player.cards),a=m(()=>`${t.value.length*5.5}rem`);return(u,h)=>t.value.length?(c(),i("div",Q,[o("div",{class:"flex content-center",style:Y({maxWidth:a.value})},[(c(!0),i(b,null,I(t.value,(d,S)=>(c(),i("div",{key:d.id,class:N(["overflow-hidden",{"overflow-visible":S===t.value.length-1}])},[P(L,{card:d,class:"w-36"},null,8,["card"])],2))),128))],4),o("p",q,[z(" Total: "),o("span",null,j(u.player.currentScore),1)])])):_("",!0)}}),X={key:0,class:"flex flex-col justify-center items-center"},Z={key:0},ee={class:"text-center"},te=o("hr",{class:"divider"},null,-1),ae={class:"flex justify-between"},se={key:0},re={class:"mt-4 flex flex-col items-center"},ne=o("div",{class:"text-primary mb-4"},"Your turn",-1),ce={class:"flex justify-center join join-horizontal"},le=["onClick"],ie=["onClick"],oe=["onClick"],ue={class:"text-center"},de={key:1,class:"flex items-center justify-center my-8"},he=T({__name:"BlackjackGame",setup(r){const e=M(),{players:t,dealer:a,activePlayerIndex:u,isDealersTurn:h,isGameOver:d,isGameInProgress:S,isGameInit:D}=A(e);function B(f){if(f.isBusted)return{msg:"Busted!",className:"text-error"};if(d)return a.value.finalScore===f.finalScore?{msg:"Push",className:"text-primary"}:!a.value.isBusted&&a.value.finalScore>f.finalScore?{msg:"You lost!",className:"text-error"}:{msg:f.hasBlackjack?"Winner winner chicken dinner!":a.value.isBusted?"Dealer Busted, You Won!":"You Won!",className:"text-success"}}return(f,x)=>(c(),i(b,null,[l(S)||l(d)?(c(),i("section",X,[l(a).cards.length?(c(),i("div",Z,[o("h3",ee,j(l(a).name),1),P(G,{player:l(a)},null,8,["player"])])):_("",!0),te,o("div",ae,[(c(!0),i(b,null,I(l(t),(n,w)=>{var k,C;return c(),i("div",{key:n.name},[n.cards.length?(c(),i("div",se,[P(G,{player:n},null,8,["player"]),o("div",re,[w===l(u)?(c(),i(b,{key:0},[ne,o("div",ce,[o("button",{type:"button",class:"join-item btn btn-primary",onClick:y=>l(e).playerHit(n)}," Hit ",8,le),o("button",{type:"button",class:"join-item btn btn-outline text-primary",onClick:y=>l(e).playerStand(n)}," Stay ",8,ie),n.cards.length===2?(c(),i("button",{key:0,type:"button",class:"join-item btn btn-outline text-primary",onClick:y=>l(e).playerDoubleDown(n)}," Double Down ",8,oe)):_("",!0)])],64)):(c(),i("div",{key:1,class:N((k=B(n))==null?void 0:k.className)},j((C=B(n))==null?void 0:C.msg),3))]),o("h3",ue,j(n.name),1)])):_("",!0)])}),128))])])):_("",!0),l(d)||l(D)?(c(),i("div",de,[o("button",{type:"button",class:"btn btn-accent",onClick:x[0]||(x[0]=(...n)=>l(e).startGame&&l(e).startGame(...n))}," Start New Game ")])):_("",!0)],64))}}),ve={key:0},ke=T({__name:"BlackjackView",setup(r){const e=p("init"),t=m(()=>e.value==="loading"),a=m(()=>e.value==="loaded");return O(()=>{e.value="loading",setTimeout(()=>{e.value="loaded"},500)}),(u,h)=>t.value?(c(),i("div",ve,"Loading...")):a.value?(c(),U(he,{key:1})):_("",!0)}});export{ke as default};
