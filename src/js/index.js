let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let searchBox = document.getElementById("searchBox");
let letterBox = document.getElementById("letterBox");
let contactContiner = document.getElementById("contactContiner");

function toggleSideNav() {
  var sideNav = document.querySelector(".nav-tab");
  sideNav.classList.toggle("hidden");
}

function showSearchInputs() {
  searchContainer.classList.remove("hidden");
  rowData.innerHTML = "";
}

function closeSideNav() {
  var sideNav = document.querySelector(".nav-tab");
  sideNav.classList.add("hidden"); //
}

async function getMeals() {
  try {
    const api = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
    );
    const response = await api.json();
    displayMeals(response.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getMeals();

function displayMeals(data) {
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-full md:w-1/2 lg:w-3/12 p-3 ">
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
                    <div class="w-full md:w-4/12">
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
                          ${getRecipe(data)}
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
}

function getRecipe(data) {
  let str = ``;
  for (let i = 1; i < 14; i++) {
    if (data.meals[0][`strIngredient${i}`])
      str += `<li class="alert-info bg-blue-100 border border-blue-400 text-blue-700 p-2 rounded m-2">${
        data.meals[0][`strIngredient${i}`]
      }</li>`;
  }
  return str;
}

async function getSearch(search) {
  try {
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`
    );
    let response = await api.json();
    displayMeals(response.meals);
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
    displayCategory(response.categories);
  } catch (error) {
    console.error("Error fetching data:, error");
  }
}


function displayCategory(data) {
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-full md:w-1/2 lg:w-3/12 p-3">
               <div onclick="getCategoryMeals('${
                 data[i].strCategory
               }')" class="food-imgs relative overflow-hidden rounded-lg cursor-pointer">
            <img src="${data[i].strCategoryThumb}" class="w-full " alt="">
            <div
                class="layer p-3 absolute top-full left-0 w-full h-full bg-white bg-opacity-80 transition-all duration-500 text-center">
                <h3 class="font-mono text-2xl font-bold">${
                  data[i].strCategory
                }</h3>
                <p>${data[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>

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
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-full md:w-1/2 lg:w-3/12 p-3">
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
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `<div class="w-full md:w-1/2 lg:w-3/12 p-3">
     <div onclick="getIngredientsMeals('${
       data[i].strIngredient
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


async function getCategoryMeals(category) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let respone = await api.json();
  displayMeals(respone.meals);
}


async function getAreaMeals(Area) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
  );
  let response = await api.json();
  displayMeals(response.meals);
}


async function getIngredientsMeals(gredients) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${gredients}`
  );
  let response = await api.json();
  if (response.meals) displayMeals(response.meals);
}


function showContacts() {
  rowData.innerHTML = "";
  let box = `
  
        <div class="container mx-auto w-3/4 text-center mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <input id="nameInput" onkeyup="validateName()" type="text" class="form-control bg-gray-800 text-white p-2 rounded w-full" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert hidden bg-red-500 text-white p-2 mt-2 rounded">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div>
                <input id="emailInput" onkeyup="validateEmail()" type="email" class="form-control bg-gray-800 text-white p-2 rounded w-full" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert hidden bg-red-500 text-white p-2 mt-2 rounded">
                    Email not valid *example@yyy.zzz
                </div>
            </div>
            <div>
                <input id="phoneInput" onkeyup="validatePhone()" type="text" class="form-control bg-gray-800 text-white p-2 rounded w-full" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert hidden bg-red-500 text-white p-2 mt-2 rounded">
                    Enter valid Phone Number
                </div>
            </div>
            <div>
                <input id="ageInput" onkeyup="validateAge()" type="number" class="form-control bg-gray-800 text-white p-2 rounded w-full" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert hidden bg-red-500 text-white p-2 mt-2 rounded">
                    Enter valid age
                </div>
            </div>
            <div>
                <input id="passwordInput" onkeyup="validatePassword()" type="password" class="form-control bg-gray-800 text-white p-2 rounded w-full" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert hidden bg-red-500 text-white p-2 mt-2 rounded">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div>
                <input id="repasswordInput" onkeyup="validateRepassword()" type="password" class="form-control bg-gray-800 text-white p-2 rounded w-full" placeholder="Repassword">
                <div id="repasswordAlert" class="alert hidden bg-red-500 text-white p-2 mt-2 rounded">
                    Enter valid repassword
                </div>
            </div>
        </div>
        <button  id="sbmitBtn" onclick="inputsValidation()" class="btn bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-4">Submit</button>
    </div>
            `;
  rowData.innerHTML = box;
}


function validateName() {
  const name = document.getElementById("nameInput").value;
  const namePattern = /^[a-zA-Z ]+$/;
  const nameAlert = document.getElementById("nameAlert");
  if (!namePattern.test(name)) {
      nameAlert.classList.remove("hidden");
  } else {
      nameAlert.classList.add("hidden");
      return true
  }
}

function validateEmail() {
  const email = document.getElementById("emailInput").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailAlert = document.getElementById("emailAlert");
  if (!emailPattern.test(email)) {
      emailAlert.classList.remove("hidden");
  } else {
      emailAlert.classList.add("hidden");
      return true
  }
}

function validatePhone() {
  const phone = document.getElementById("phoneInput").value;
  const phonePattern = /^\d{10}$/;
  const phoneAlert = document.getElementById("phoneAlert");
  if (!phonePattern.test(phone)) {
      phoneAlert.classList.remove("hidden");
  } else {
      phoneAlert.classList.add("hidden");
      return true
  }
}

function validateAge() {
  const age = document.getElementById("ageInput").value;
  const agePattern = /^\d+$/;
  const ageAlert = document.getElementById("ageAlert");
  if (!agePattern.test(age) || age < 1 || age > 100) {
      ageAlert.classList.remove("hidden");
  } else {
      ageAlert.classList.add("hidden");
      return true
  }
}

function validatePassword() {
  const password = document.getElementById("passwordInput").value;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const passwordAlert = document.getElementById("passwordAlert");
  if (!passwordPattern.test(password)) {
      passwordAlert.classList.remove("hidden");
  } else {
      passwordAlert.classList.add("hidden");
      return true
  }
}

function validateRepassword() {
  const password = document.getElementById("passwordInput").value;
  const repassword = document.getElementById("repasswordInput").value;
  const repasswordAlert = document.getElementById("repasswordAlert");
  if (password !== repassword) {
      repasswordAlert.classList.remove("hidden");
  } else {
      repasswordAlert.classList.add("hidden");
      return true
  }
}

function inputsValidation() {
  validateName();
  validateEmail();
  validatePhone();
  validateAge();
  validatePassword();
  validateRepassword();
}
