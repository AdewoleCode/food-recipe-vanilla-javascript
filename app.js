const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_key = 'b8da70a648c8dee61e9eaa4669bd072c';
const APP_Id = 'd910b847';



searchForm.addEventListener('submit', searchInput )

function searchInput(e){
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;


    if (searchQuery == ''){
        alert('search cannot be empty');
        return;
    }

    fetchData();
}

async function fetchData(){
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_Id}&app_key=${APP_key}`
    const result = await fetch (baseUrl);
    const data = await result.json();

    renderResult(data.hits);
}

function renderResult(results){
    let generatedResult = '';
    results.map(result => {
        generatedResult += 
        `
        <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-button" href="${result.recipe.url}"> View Recipe</a>
                </div>
                <p class="item-data"> Calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data"> Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "no data found"}</p>
                <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedResult;
}