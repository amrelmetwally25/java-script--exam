let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let searchBox = document.getElementById("searchBox");
let letterBox = document.getElementById("letterBox");

function toggleSideNav() {
  var sideNav = document.querySelector(".nav-tab");
  sideNav.classList.toggle("hidden"); // تبديل العرض بين مخفي وغير مخفي
}

function showSearchInputs() {
  searchContainer.classList.remove("hidden");
  rowData.innerHTML = "";
}

function closeSideNav() {
  var sideNav = document.querySelector(".nav-tab");
  sideNav.classList.add("hidden"); // إضافة العرض المخفي
}

async function getMeals() {
  try {
    const api = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
    );
    debugger;
    const response = await api.json();
    displayMeals(response.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getMeals();

function displayMeals(data) {
  console.log(data);
  let box = "";
  debugger;
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-3/12 p-3">
               <div onclick="mealsDetails('${data[i].idMeal}')" class="food-imgs relative overflow-hidden rounded-lg cursor-pointer">
            <img src="${data[i].strMealThumb}"class="w-full " alt="">
            <div
                class="layer p-3 absolute top-full left-0 w-full h-full bg-white bg-opacity-80 transition-all duration-500 content-center">
                <h2 class="font-mono text-2xl font-bold">${data[i].strMeal}</h2>
            </div>
        </div>   
                    
             </div>`;
  }
  rowData.innerHTML = box;
}

async function mealsDetails(idMeal) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let respone = await api.json();
  displayMealsDetalis(respone);
}

function displayMealsDetalis(data) {
  rowData.innerHTML = "";
  let box = `<section class="">
        <div class="container mx-auto">
            <div>
                <div class="flex flex-wrap space-x-4">
                    <div class="w-4/12">
                        <img src="${
                          data.meals[0].strMealThumb
                        }" class="w-full rounded-md" alt="">
                        <h2 class="text-white text-4xl font-bold">${
                          data.meals[0].strMeal
                        }</h2>
                    </div>
                    <div class="w-7/12">
                        <h2 class="text-white text-4xl mb-3">Instructions</h2>
                        <p class="text-white mb-3">${
                          data.meals[0].strInstructions
                        }</p>
                        <h3 class="text-white text-3xl mb-2">Area : ${
                          data.meals[0].strArea
                        }</h3>
                        <h3 class="text-white text-3xl mb-2">Category : ${
                          data.meals[0].strCategory
                        }</h3>
                        <h3 class="text-white text-3xl mb-2">Recipes :</h3>
                        <ul class="list-none flex flex-wrap gap-2 mb-4">
                                          ${data.meals[0].strIngredients
                                            .map(
                                              (ingredient, index) =>
                                                `<li class="alert-info bg-blue-100 border border-blue-400 text-blue-700 p-2 rounded m-2">${ingredient}</li>`
                                            )
                                            .join("")}

                        </ul>
                        <div class="space-x-3">
                            <a target="_blank"
                                href="${data.meals[0].strSource}"
                                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Source
                            </a>
                            <a target="_blank" href="${
                              data.meals[0].strYoutube
                            }"
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Youtube
                            </a>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>`;
  rowData.innerHTML = box;

  // console.log(data.meals[0].strMealThumb);

  // console.log(data.meals[0]);
}

async function getSearch(search) {
  try {
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`
    );
    let response = await api.json();
    displaySearch(response.meals);
  } catch {
    console.error("Error fetching data:, error");
  }
}

searchBox.addEventListener("input", function () {
  getSearch(searchBox);
});

function displaySearch(data) {
  rowData.innerHTML = "";
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-3/12 p-3">
               <div class="food-imgs relative overflow-hidden rounded-lg cursor-pointer">
            <img src="${data[i].strMealThumb}" class="w-full " alt="">
            <div
                class="layer p-3 absolute top-full left-0 w-full h-full bg-white bg-opacity-80 transition-all duration-500 content-center">
                <h2 class="font-mono text-2xl font-bold">${data[i].strMeal}</h2>
            </div>
        </div>   
                
             </div>`;
  }
  rowData.innerHTML = box;
}

async function getLetter(letter) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter.value}`
    );
    let respone = await api.json();
    displayLetter(respone.meals);
  } catch {
    console.log("Error fetching data:, error");
  }
}

letterBox.addEventListener("input", function () {
  getLetter(letterBox);
});

function displayLetter(data) {
  rowData.innerHTML = "";
  box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-3/12 p-3">
               <div class="food-imgs relative overflow-hidden rounded-lg cursor-pointer">
            <img src="${data[i].strMealThumb}" class="w-full " alt="">
            <div
                class="layer p-3 absolute top-full left-0 w-full h-full bg-white bg-opacity-80 transition-all duration-500 content-center">
                <h2 class="font-mono text-2xl font-bold">${data[i].strMeal}</h2>
            </div>
        </div>   
                
             </div>`;
  }
  rowData.innerHTML = box;
}

async function getCategories() {
  try {
    const api = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const response = await api.json();
    displayMeals(response.categories);
  } catch (error) {
    console.error("Error fetching data:, error");
  }
}

function displayMeals(data) {
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-3/12 p-3">
               <div class="food-imgs relative overflow-hidden rounded-lg cursor-pointer">
            <img src="${data[i].strCategoryThumb}" class="w-full " alt="">
            <div
                class="layer p-3 absolute top-full left-0 w-full h-full bg-white bg-opacity-80 transition-all duration-500 text-center">
                <h3 class="font-mono text-2xl font-bold">${data[i].strCategory}</h3>
                
            </div>
        </div>   
                    
             </div>`;
  }
  rowData.innerHTML = box;
}

async function getArea() {
  try {
    const api = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let response = await api.json();
    displayArea(response.meals);
  } catch {
    console.log("fetching data:error");
  }
}

function displayArea(data) {
  console.log(data);
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-3/12 p-3">
    <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
            <h3 class='text-white '>${data[i].strArea}</h3>b 
    </div>
</div>`;
  }
  rowData.innerHTML = box;
}

async function getIngredients() {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let respone = await api.json();
    displayIngredients(respone.meals.slice(0, 20));
  } catch {
    console.log("fetching data:error");
  }
}

function displayIngredients(data) {
  console.log(data);
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-3/12 p-3">
     <div onclick="getAreaMeals('${
       data[i].strArea
     }')" class="rounded-2 text-center cursor-pointer">
             <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
             <h3 class="text-white font-bold text-3xl">${
               data[i].strIngredient
             }</h3>
                <p class="text-white">${data[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
     </div>
 </div>`;
  }
  rowData.innerHTML = box;
}
