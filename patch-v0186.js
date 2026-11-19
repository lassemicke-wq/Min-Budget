'use strict';
/* Min Ekonomi v0.18.6 patch: date-controlled savings withdrawals linked to expenses. */
(function(){
  const PATCH_VERSION='0.18.6';
  function init(){
    if(typeof S==='undefined'||typeof q!=='function'||typeof save!=='function'||typeof render!=='function'){setTimeout(init,100);return}
    // Current savings balance: future dated transfers do not change today's balance.
    window.bal=function(account,asOf=(new Date()).toISOString().slice(0,10)){
      return +(account.openingBalance||0)+S.savingsTransfers.filter(t=>t.accountId===account.id&&(!t.date||t.date<=asOf)).reduce((n,t)=>n+(t.direction==='deposit'?+t.amount:-t.amount),0)
    };
    const dialog=document.querySelector('#tx form')||document.querySelector('#txForm');
    if(dialog&&!document.querySelector('#txFundingWrap')){
      const person=document.querySelector('#txPerson')?.closest('label');
      const label=document.createElement('label');label.id='txFundingWrap';label.innerHTML='Betalas från<select id="txFunding"><option value="">Vanligt konto</option></select>';
      (person||dialog.lastElementChild).insertAdjacentElement('afterend',label);
    }
    const originalOpen=window.openTx;
    window.openTx=function(x={}){
      originalOpen(x);
      const wrap=q('#txFundingWrap'),sel=q('#txFunding');if(!wrap||!sel)return;
      const sync=()=>{const expense=q('#txType').value==='expense';wrap.style.display=expense?'block':'none';sel.innerHTML='<option value="">Vanligt konto</option>'+S.savingsAccounts.map(a=>`<option value="${a.id}" ${a.id===x.paidFromAccountId?'selected':''}>Sparkonto: ${a.name}</option>`).join('')};
      q('#txType').addEventListener('change',sync);sync();
    };
    const form=q('#txForm');
    form.onsubmit=async e=>{
      e.preventDefault();
      const type=q('#txType').value,amount=+q('#txAmount').value,date=q('#txDate').value,note=q('#txNote').value;
      if(!(amount>0)||!date)return alert('Kontrollera belopp och datum.');
      if(type==='savings'){
        const accountId=q('#txSavings')?.value;if(!accountId)return alert('Välj sparkonto.');
        S.savingsTransfers.push({id:crypto.randomUUID(),accountId,direction:'deposit',amount,date,note});await save();q('#tx').close();render();return;
      }
      const id=q('#txId').value||crypto.randomUUID(),old=S.transactions.find(t=>t.id===id),funding=type==='expense'?(q('#txFunding')?.value||''):'';
      const tx={id,date,type,amount,category:q('#txCategory')?.value||q('#txCat')?.value,person:q('#txPerson').value,note,sourceRecurringId:old?.sourceRecurringId,sourcePeriod:old?.sourcePeriod,paidFromAccountId:funding||undefined,linkedSavingsTransferId:old?.linkedSavingsTransferId};
      let transfer=old?.linkedSavingsTransferId&&S.savingsTransfers.find(t=>t.id===old.linkedSavingsTransferId);
      if(funding){
        if(!transfer){transfer={id:crypto.randomUUID(),linkedTransactionId:id};S.savingsTransfers.push(transfer)}
        Object.assign(transfer,{accountId:funding,direction:'withdraw',amount,date,note:`Betalning: ${tx.category}${note?' · '+note:''}`,linkedTransactionId:id});tx.linkedSavingsTransferId=transfer.id;
      }else if(transfer){S.savingsTransfers=S.savingsTransfers.filter(t=>t.id!==transfer.id);delete tx.linkedSavingsTransferId}
      S.transactions=S.transactions.filter(t=>t.id!==id);S.transactions.push(tx);await save();q('#tx').close();render();
    };
    // Linked delete: remove expense and matching withdrawal together after one confirmation.
    document.addEventListener('click',async e=>{
      const btn=e.target.closest('button[data-del]');if(!btn)return;const tx=S.transactions.find(t=>t.id===btn.dataset.del);if(!tx||!tx.linkedSavingsTransferId)return;
      e.preventDefault();e.stopImmediatePropagation();
      if(confirm('Ta bort utgiften och det kopplade uttaget från sparkontot?')){
        S.transactions=S.transactions.filter(t=>t.id!==tx.id);S.savingsTransfers=S.savingsTransfers.filter(t=>t.id!==tx.linkedSavingsTransferId);await save();render();
      }
    },true);
    // Manual savings movements also receive an explicit date.
    document.addEventListener('click',async e=>{
      const btn=e.target.closest('button[data-dep],button[data-out]');if(!btn)return;
      e.preventDefault();e.stopImmediatePropagation();const accountId=btn.dataset.dep||btn.dataset.out,direction=btn.dataset.dep?'deposit':'withdraw',amount=+prompt(direction==='deposit'?'Insättning:':'Uttag:','0');if(!(amount>0))return;
      const date=prompt('Datum (ÅÅÅÅ-MM-DD):',(new Date()).toISOString().slice(0,10));if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return alert('Ange datum som ÅÅÅÅ-MM-DD.');
      const note=prompt('Kommentar:','')||'';S.savingsTransfers.push({id:crypto.randomUUID(),accountId,direction,amount,date,note});await save();render();
    },true);
    const h=document.querySelector('header div');if(h&&!h.textContent.includes(PATCH_VERSION))h.textContent=h.textContent.replace(/version\s+[^·]+/i,`version ${PATCH_VERSION}`);
  }
  setTimeout(init,0);
})();
