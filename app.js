// Simple SPA logic using localStorage
(function(){
  const KEY = 'health-goals:v1';
  const defaults = { water:0, goals:{water:2000,cal:2000}, meals:[], activities:[] };

  function load(){
    try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):defaults;}catch(e){return defaults}
  }
  function save(state){localStorage.setItem(KEY,JSON.stringify(state))}

  let state = load();

  // Elements
  const el = id=>document.getElementById(id);
  const render = ()=>{
    // Water
    el('water-current').textContent = state.water;
    el('water-goal').textContent = state.goals.water;
    const pct = Math.min(100, Math.round((state.water / Math.max(1,state.goals.water)) * 100));
    el('water-progress').style.width = pct + '%';

    // Meals
    const mealsList = el('meals-list'); mealsList.innerHTML = '';
    let totalCal = 0;
    state.meals.forEach((m, i)=>{
      totalCal += Number(m.kcal)||0;
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(m.name)}</strong> — ${m.kcal} kcal <button data-idx="${i}" class="btn">Remove</button>`;
      mealsList.appendChild(li);
    });
    el('total-cal').textContent = totalCal;

    // Activities
    const actList = el('activities-list'); actList.innerHTML = '';
    state.activities.forEach((a,i)=>{
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(a.name)}</strong> ${a.duration?('- '+a.duration+' min'):''} ${a.kcal?('— '+a.kcal+' kcal'):''} <button data-idx="${i}" class="btn">Remove</button>`;
      actList.appendChild(li);
    });
  };

  function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

  // Init values into form
  function initForms(){
    el('goal-water').value = state.goals.water;
    el('goal-cal').value = state.goals.cal;
  }

  // Event handlers
  document.addEventListener('click', e=>{
    const t = e.target;
    if(t.matches('[data-add]')){
      const add = Number(t.getAttribute('data-add'))||0; state.water += add; save(state); render();
    }
    if(t.id==='water-add-custom'){
      const v = Number(el('water-custom').value)||0; if(v>0){state.water+=v;save(state);render();el('water-custom').value=''}
    }
    if(t.matches('#meals-list .btn')){
      const i = Number(t.getAttribute('data-idx')); state.meals.splice(i,1); save(state); render();
    }
    if(t.matches('#activities-list .btn')){
      const i = Number(t.getAttribute('data-idx')); state.activities.splice(i,1); save(state); render();
    }
  });

  document.getElementById('meal-form').addEventListener('submit', e=>{
    e.preventDefault();
    const name = el('meal-name').value.trim();
    const kcal = Number(el('meal-cal').value)||0;
    if(!name) return;
    state.meals.push({name,kcal}); save(state); render(); e.target.reset();
  });

  document.getElementById('activity-form').addEventListener('submit', e=>{
    e.preventDefault();
    const name = el('activity-name').value.trim();
    const duration = Number(el('activity-duration').value)||0;
    const kcal = Number(el('activity-cal').value)||0;
    if(!name) return;
    state.activities.push({name,duration,kcal}); save(state); render(); e.target.reset();
  });

  document.getElementById('goals-form').addEventListener('submit', e=>{
    e.preventDefault();
    const gw = Number(el('goal-water').value)||state.goals.water;
    const gc = Number(el('goal-cal').value)||state.goals.cal;
    state.goals.water = gw; state.goals.cal = gc; save(state); render();
  });

  // expose reset for quick dev (not shown)
  window.__healthReset = function(){state = JSON.parse(JSON.stringify(defaults)); save(state); render(); initForms()}

  // first render
  initForms(); render();
})();
