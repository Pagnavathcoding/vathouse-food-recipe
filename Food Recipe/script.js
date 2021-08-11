const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const content = document.getElementById("content");
const keyWord = document.getElementById("keyword");
let clear = document.getElementById("clear");
searchInput.addEventListener("input", () => {
    if (searchInput.value === '') {
        clear.style.display = "none";
    }
    else {
        clear.style.display = "block";
    }
});
clear.addEventListener("click", () => {
    searchInput.value = '';
    clear.style.display = "none";
})
searchInput.addEventListener("keypress", (clickEvent) => {
    if (clickEvent.key === "Enter") {
        foodSearch();
    }
})
searchButton.addEventListener("click", foodSearch);

function foodSearch() {
    if (searchInput.value === '') {
        keyWord.innerHTML = `Please input your food name!`;
        keyWord.style.color = "#f94348";
    }
    else {
        keyWord.style.color = "#003638";
        const id = 'eb22663c';
        const key = '6487fdc659099768feafa7414a1b2b77';
        const api = `https://api.edamam.com/search?q=${searchInput.value}&app_id=${id}&app_key=${key}`;
        keyWord.innerHTML = `Your food name: <i>${searchInput.value}</i>`;
        async function fetchAPI() {
            const res = await fetch(api);
            return res.json().then((data) => {
                const dataFood = data.hits;
                var displayFood = '';
                for (let index = 0; index < dataFood.length; index++) {
                    let diet = dataFood[index].recipe.dietLabels;
                    let items = dataFood[index].recipe.ingredients;
                    let nextItems = '';
                    for (let item = 0; item < items.length; item++) {
                        nextItems += `
                    <div class="how-to">
                            <ul>
                                <li>${items[item].text}</li>
                            </ul>
                            <div><i><b>Weight: </b></i><b>${items[item].weight}</b></div>
                            <div><i><b>Type of food: </b></i><b>${items[item].foodCategory}</b></div>
                            <img src=${items[item].image} alt=${items[item].text}/>
                        </div>
                `;
                    }
                    displayFood += `
                <div class="food" id=${dataFood[index].recipe.label}>
                        <h1>${dataFood[index].recipe.label}</h1>
                        <img src=${dataFood[index].recipe.image} alt=${dataFood[index].recipe.image}/>
                        <div><i><b>Diet: </b></i><b>${diet, (diet.length == 0 ? 0 : diet)}</b></div>
                        <div class="line"></div>
                        <b id="how">How to cook?</b>
                        <p><i>Type of food: </i>${dataFood[index].recipe.cuisineType}<p>
                        <p id="eat">${dataFood[index].recipe.mealType}</p>
                        <div class="end">
                            <i><b>Calories: </b>${dataFood[index].recipe.calories}<br><b>Total weight: </b>${dataFood[index].recipe.totalWeight}</i>
                        </div>
                        ${nextItems}
                        <div class="health-tags">
                            <b>Health Tags:</b>
                            <div>${dataFood[index].recipe.healthLabels}</div>
                        </div>
                </div>
            `;
                    console.log(diet);
                }
                content.innerHTML = displayFood;
                console.log(data)
            }).catch((err) => {
                return err;
            })
        }
        fetchAPI();
    }
}
// default
function container() {
    if (searchInput.value === '') {
        keyWord.innerHTML = `Your food name: ${searchInput.value} does not exist!`
    }
    else {
        const id = 'eb22663c';
        const key = '6487fdc659099768feafa7414a1b2b77';
        const api = `https://api.edamam.com/search?q=${searchInput.value}&app_id=${id}&app_key=${key}`;
        keyWord.innerHTML = `Your food name: <i>${searchInput.value}</i>`;
        async function fetchAPI() {
            const res = await fetch(api);
            return res.json().then((data) => {
                const dataFood = data.hits;
                var displayFood = '';
                for (let index = 0; index < dataFood.length; index++) {
                    let diet = dataFood[index].recipe.dietLabels;
                    let items = dataFood[index].recipe.ingredients;
                    let nextItems = '';
                    for (let item = 0; item < items.length; item++) {
                        nextItems += `
                    <div class="how-to">
                            <ul>
                                <li>${items[item].text}</li>
                            </ul>
                            <div><i><b>Weight: </b></i><b>${items[item].weight}</b></div>
                            <div><i><b>Type of food: </b></i><b>${items[item].foodCategory}</b></div>
                            <img src=${items[item].image} alt=${items[item].text}/>
                        </div>
                `;
                    }
                    displayFood += `
                <div class="food" id= id=${dataFood[index].recipe.label}>
                        <h1>${dataFood[index].recipe.label}</h1>
                        <img src=${dataFood[index].recipe.image} alt=${dataFood[index].recipe.image}/>
                        <div><i><b>Diet: </b></i><b>${diet, (diet.length == 0 ? 0 : diet)}</b></div>
                        <div class="line"></div>
                        <b id="how">How to cook?</b>
                        <p><i>Type of food: </i>${dataFood[index].recipe.cuisineType}<p>
                        <p id="eat">${dataFood[index].recipe.mealType}</p>
                        <div class="end">
                            <i><b>Calories: </b>${dataFood[index].recipe.calories}<br><b>Total weight: </b>${dataFood[index].recipe.totalWeight}</i>
                        </div>
                        ${nextItems}
                        <div class="health-tags">
                            <b>Health Tags:</b>
                            <div>${dataFood[index].recipe.healthLabels}</div>
                        </div>
                </div>
            `;
                    console.log(diet);
                }
                content.innerHTML = displayFood;
                console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        }
        fetchAPI();
    }
}
container();