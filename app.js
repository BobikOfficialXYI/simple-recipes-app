const gridView = document.getElementById('grid-view');
const detailView = document.getElementById('detail-view');
const detailImg = document.getElementById('detail-img');
const detailTitle = document.getElementById('detail-title');
const detailRecipe = document.getElementById('detail-recipe');
const backBtn = document.getElementById('back-btn');

let recipes = [];

async function loadRecipes() {
  try {
    const res = await fetch('recipes.json');
    recipes = await res.json();
    renderGrid();
  } catch (e) {
    console.error('Failed to load recipes', e);
    gridView.innerHTML = '<p style="padding:20px">Ошибка загрузки рецептов</p>';
  }
}

function renderGrid() {
  gridView.innerHTML = '';
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      <div class="name">${recipe.name}</div>
    `;
    card.addEventListener('click', () => showDetail(recipe));
    gridView.appendChild(card);
  });
}

function showDetail(recipe) {
  detailImg.src = recipe.image;
  detailImg.alt = recipe.name;
  detailTitle.textContent = recipe.name;
  detailRecipe.textContent = recipe.recipe;
  gridView.style.display = 'none';
  detailView.classList.add('active');
  window.scrollTo(0, 0);
}

function showGrid() {
  detailView.classList.remove('active');
  gridView.style.display = 'grid';
  window.scrollTo(0, 0);
}

backBtn.addEventListener('click', showGrid);

loadRecipes();
