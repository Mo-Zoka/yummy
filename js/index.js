// <refrence types="../@types/jquery"/>

let homeMeals = [];
let mealDetails = [];
let categories = [];
let meals = [];
let areas = [];
let ingredients = [];

async function getHomeMeals() {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let finalResult = await result.json();
  homeMeals = finalResult.meals;
  hideLoading();
  displayHomeMeals();
}

async function getMealDetails(id) {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  finalResult = await result.json();
  mealDetails = finalResult.meals[0];
  hideLoading();
  displayMealDetails();
}

async function getCategories() {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  finalResult = await result.json();
  categories = finalResult.categories;
  displayCategories();
  hideLoading();
}

async function getMealsByCategories(category) {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  finalResult = await result.json();
  meals = finalResult.meals;
  displayMeals(meals);
  hideLoading();
}

async function getAreas() {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  finalResult = await result.json();
  areas = finalResult.meals;
  displayAreas();
  hideLoading();
}

async function getMealsByAreas(area) {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  finalResult = await result.json();
  meals = finalResult.meals;
  displayMeals(meals);
  hideLoading();
}

async function getIngredients() {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  finalResult = await result.json();
  ingredients = finalResult.meals;
  displayIngredients();
  hideLoading();
}

async function getMealsByIngredients(i) {
  showLoading();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`
  );
  finalResult = await result.json();
  meals = finalResult.meals;
  displayMeals(meals);
  hideLoading();
}

async function getSearch1(x) {
  showLoading2();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`
  );
  finalResult = await result.json();
  meals = finalResult.meals;
  displaySearchMeals(meals);
  hideLoading2();
}

async function getSearch2(x) {
  showLoading2();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`
  );
  finalResult = await result.json();
  meals = finalResult.meals;
  displaySearchMeals(meals);
  hideLoading2();
}

getHomeMeals();

function displayHomeMeals() {
  let box = "";
  let data = document.getElementById("data");

  for (let i = 0; i < homeMeals.length; i++) {
    box += `
        <div class="my-card col-md-6 col-lg-4 col-xl-3 rounded-3 overflow-hidden">
                    <div class="position-relative overflow-hidden">
                        <img src="${homeMeals[i].strMealThumb}" alt="" class="rounded-3">
                        <div
                            class="layer position-absolute z-3 rounded-3 d-flex justify-content-start align-items-center">
                            <h3 class="bold ps-3">${homeMeals[i].strMeal}</h3>
                            <p class="meal-id d-none">${homeMeals[i].idMeal}</p>
                        </div>
                    </div>
                </div>
        `;
  }

  data.innerHTML = box;
}

function displayMeals(meals) {
  let box = "";
  let data = document.getElementById("data");

  for (let i = 0; i < meals.length; i++) {
    box += `
          <div class="my-card col-md-6 col-lg-4 col-xl-3 rounded-3 overflow-hidden">
                      <div class="position-relative overflow-hidden">
                          <img src="${meals[i].strMealThumb}" alt="" class="rounded-3">
                          <div
                              class="layer position-absolute z-3 rounded-3 d-flex justify-content-start align-items-center">
                              <h3 class="bold ps-3">${meals[i].strMeal}</h3>
                              <p class="meal-id d-none">${meals[i].idMeal}</p>
                          </div>
                      </div>
                  </div>
          `;
  }

  data.innerHTML = box;
}

function displayMealDetails() {
  let box = "";
  let data = document.getElementById("details");
  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    let ingredient = mealDetails[`strIngredient${i}`];
    let measure = mealDetails[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      recipes += `
            <h4><span class="badge text-bg-info fw-light me-3"> 
            ${measure} ${ingredient}
            </span></h4>
        `;
    }
  }

  let tags = "";
  if (mealDetails.strTags) {
    tagsArray = mealDetails.strTags.split(",");
    tagsArray.forEach((tag) => {
      tags += `
        <h4><span class="badge text-bg-light fw-light me-3">${tag.trim()}</span></h4>
      `;
    });
  }

  box = `
        <div>
            <div class="container py-4 d-flex justify-content-end">
                <div><i class="fa-solid fa-xmark fa-2x"></i></div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="d-flex flex-column justify-content-start">
                            <img src="${mealDetails.strMealThumb}" alt="" class="rounded-3">
                            <h2>${mealDetails.strMeal}</h2>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div>
                            <h3>Instructions</h3>
                            <p>${mealDetails.strInstructions}</p>
                            <h3>Area : ${mealDetails.strArea}</h3>
                            <h3>Category : ${mealDetails.strCategory}</h3>
                            <h3>Recipes :</h3>
                            <div class="d-flex justify-content-start flex-wrap pb-2" id="recipes">
                                
                            </div>
                            <h3>Tags :</h3>
                            <div class="d-flex justify-content-start pb-3" id="tags">
                                
                            </div>
                            <a href="${mealDetails.strSource}" target="_blank"><button type="button" class="btn btn-success me-2">Source</button></a>
                            <a href="${mealDetails.strYoutube}" target="_blank"><button type="button" class="btn btn-danger">Youtube</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  data.innerHTML = box;
  document.getElementById("recipes").innerHTML = recipes;
  document.getElementById("tags").innerHTML = tags;
}

function displayCategories() {
  let box = "";
  let data = document.getElementById("data");

  for (let i = 0; i < categories.length; i++) {
    box += `
            <div class="cat-card col-md-6 col-lg-4 col-xl-3 rounded-3 overflow-hidden">
                        <div class="position-relative overflow-hidden">
                            <img src="${
                              categories[i].strCategoryThumb
                            }" alt="" class="rounded-3">
                            <div
                                class="layer position-absolute z-3 rounded-3 d-flex flex-column justify-content-center align-items-center">
                                <h3 class="bold ps-3 category">${
                                  categories[i].strCategory
                                }</h3>
                                <p class="text-center ps-2 pe-2"> ${getFirst20Words(
                                  categories[i].strCategoryDescription
                                )} </p>
                            </div>
                        </div>
                    </div>
            `;
  }

  data.innerHTML = box;
}

function displayAreas() {
  let box = "";
  let data = document.getElementById("data");

  for (let i = 0; i < areas.length; i++) {
    box += `
            <div class="area-card col-md-6 col-lg-4 col-xl-3 rounded-3">
                        <div class="d-flex flex-column justify-content-center align-items-center ">
                            <i class="fa-solid fa-house-laptop fa-4x pb-2"></i>
                            <h4 class="area-name" >${areas[i].strArea}</h4>
                        </div>
                    </div>
            `;
  }

  data.innerHTML = box;
}

function displayIngredients() {
  let box = "";
  let data = document.getElementById("data");

  for (let i = 0; i < 20; i++) {
    box += `
              <div class="i-card col-md-6 col-lg-4 col-xl-3 rounded-3 text-white">
                          <div class="d-flex flex-column justify-content-center align-items-center ">
                              <i class="fa-solid fa-drumstick-bite fa-4x pb-2"></i>
                              <h4 class="i-name" >${
                                ingredients[i].strIngredient
                              }</h4>
                              <p class="ps-2 pe-3">${getFirst20Words(
                                ingredients[i].strDescription
                              )}</p>
                          </div>
                      </div>
              `;
  }

  data.innerHTML = box;
}

function displaySearchPage() {
  let box = "";
  let data = document.getElementById("data");

  box = `
        <div class="d-flex">
            <div class="input-group rounded w-50 text-white">
                <input type="text" class="search-bar1 form-control rounded me-3" placeholder="Search by name"
                    aria-label="Search" aria-describedby="search-addon" />
            </div>
            <div class="input-group rounded w-50">
                <input type="text" class="search-bar2 form-control rounded" maxlength="1" placeholder="Search by first letter"
                    aria-label="Search" aria-describedby="search-addon" />
            </div>
        </div>
        <div class="row g-4 position-relative" id="searchMeals">
            <div
                class="loading2 position-absolute top-0 start-0 end-0 bottom-0 w-100 h-100 justify-content-center align-items-center">
                <div class="loader"></div>
            </div>

        </div>
    `;

  data.innerHTML = box;

  // --- search --- //

  $(".search-bar1").on("keyup", function () {
    var value = $(this).val();
    console.log(value);
    getSearch1(value);
  });

  $(".search-bar2").on("keyup", function () {
    var value = $(this).val();
    getSearch2(value);
  });

  // --- search --- //
}

function displaySearchMeals(meals) {
  let box = "";
  let data = document.getElementById("searchMeals");

  for (let i = 0; i < meals.length; i++) {
    box += `
            <div class="my-card col-md-6 col-lg-4 col-xl-3 rounded-3 overflow-hidden">
                        <div class="position-relative overflow-hidden">
                            <img src="${meals[i].strMealThumb}" alt="" class="rounded-3">
                            <div
                                class="layer position-absolute z-3 rounded-3 d-flex justify-content-start align-items-center">
                                <h3 class="bold ps-3">${meals[i].strMeal}</h3>
                                <p class="meal-id d-none">${meals[i].idMeal}</p>
                            </div>
                        </div>
                    </div>
            `;
  }

  data.innerHTML = box;
}

// --- loading --- //
function showLoading() {
  $(".loading").css("display", "flex");
}

function hideLoading() {
  $(".loading").css("display", "none");
}

function showLoading2() {
  $(".loading2").css("display", "flex");
}

function hideLoading2() {
  $(".loading2").css("display", "none");
}
// --- loading --- //

// --- side menu --- //

$("#menu-button").on("click", function () {
  if ($(".menu").css("left") == "0px") {
    $(".menu").animate({ left: "-250px" }, 500);
    $(".sideBar").animate({ left: "0px" }, 500);
  } else {
    $(".menu").animate({ left: "0px" }, 500);
    $(".sideBar").animate({ left: "250px" }, 500);
  }
});

// --- side menu --- //

// --- details screen --- //

$(document).on("click", ".my-card", function () {
  let mealId = $(this).find(".meal-id").html();
  getMealDetails(mealId);
  $(".details").css("display", "block");
});

$(document).on("click", ".fa-xmark", function () {
  $(".details").css("display", "none");
});

// --- details screen --- //

$(document).on("click", "#categories", function () {
  getCategories();
  $(".menu").animate({ left: "-250px" }, 500);
  $(".sideBar").animate({ left: "0px" }, 500);
});

$(document).on("click", "#areas", function () {
  getAreas();
  $(".menu").animate({ left: "-250px" }, 500);
  $(".sideBar").animate({ left: "0px" }, 500);
});

$(document).on("click", "#ingredients", function () {
  getIngredients();
  $(".menu").animate({ left: "-250px" }, 500);
  $(".sideBar").animate({ left: "0px" }, 500);
});

$(document).on("click", "#search", function () {
  displaySearchPage();
  $(".menu").animate({ left: "-250px" }, 500);
  $(".sideBar").animate({ left: "0px" }, 500);
});

$(document).on("click", "#contact", function () {
  displayContactPage();
  $(".menu").animate({ left: "-250px" }, 500);
  $(".sideBar").animate({ left: "0px" }, 500);
});

function getFirst20Words(text) {
  const words = text.split(" ");
  const first20Words = words.slice(0, 20);
  return first20Words.join(" ") + (words.length > 20 ? "..." : "");
}

$(document).on("click", ".cat-card", function () {
  let category = $(this).find(".category").html();
  getMealsByCategories(category);
});

$(document).on("click", ".area-card", function () {
  let area = $(this).find(".area-name").html();
  getMealsByAreas(area);
});

$(document).on("click", ".i-card", function () {
  let i = $(this).find(".i-name").html();
  getMealsByIngredients(i);
});

// --- contact us --- //

$("#contactUs").on("click", function () {
  displayContactPage();
});

function displayContactPage() {
  let box = "";
  let data = document.getElementById("data");
  box = `
      <div class="contact vh-100">
              <div
                class="container d-flex flex-column justify-content-center align-items-center w-75 vh-100"
              >
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      id="nameInput"
                      placeholder="Enter Your Name"
                    />
                    <div class="alert alert-danger d-none text-center py-2 my-2">
                      Special characters and numbers not allowed
                    </div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="email"
                      class="form-control"
                      id="emailInput"
                      placeholder="Enter Your Email"
                    />
                    <div class="alert alert-danger d-none text-center py-2 my-2">
                      Email not valid *example@yyy.zzz
                    </div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      id="phoneInput"
                      placeholder="Enter Your Phone"
                    />
                    <div class="alert alert-danger d-none text-center py-2 my-2">
                      Enter valid Phone Number
                    </div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="number"
                      class="form-control"
                      id="ageInput"
                      placeholder="Enter Your Age"
                    />
                    <div class="alert alert-danger d-none text-center py-2 my-2">
                      Enter valid age
                    </div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="password"
                      class="form-control"
                      id="passwordInput"
                      placeholder="Enter Your Password"
                    />
                    <div class="alert alert-danger d-none text-center py-2 my-2">
                      Enter valid password *Minimum eight characters, at least one
                      letter and one number:*
                    </div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="password"
                      class="form-control"
                      id="repasswordInput"
                      placeholder="Enter Your Repassword"
                    />
                    <div class="alert alert-danger d-none text-center py-2 my-2">
                      Enter valid repassword
                    </div>
                  </div>
                </div>
                <div
                  class="button-parent d-flex w-100 justify-content-center position-relative p-5"
                >
                  <button
                    type="button"
                    class="btn btn-outline-danger catch-me disabled"
                    id="submitButton"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
    `;

  data.innerHTML = box;

  $("#nameInput").on("input", function () {
    let isValidNameInput = validateName($("#nameInput").val());
    if (isValidNameInput) {
      $("#nameInput").next().addClass("d-none");
      $("#nameInput").addClass("is-valid");
    } else {
      $("#nameInput").removeClass("is-valid");
      $("#nameInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#emailInput").on("input", function () {
    let isValidEmailInput = validateEmail($("#emailInput").val());
    if (isValidEmailInput) {
      $("#emailInput").next().addClass("d-none");
      $("#emailInput").addClass("is-valid");
    } else {
      $("#emailInput").removeClass("is-valid");
      $("#emailInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#phoneInput").on("input", function () {
    let isValidPhoneInput = validatePhone($("#phoneInput").val());
    if (isValidPhoneInput) {
      $("#phoneInput").next().addClass("d-none");
      $("#phoneInput").addClass("is-valid");
    } else {
      $("#phoneInput").removeClass("is-valid");
      $("#phoneInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#ageInput").on("input", function () {
    let isValidAgeInput = validateAge($("#ageInput").val());
    if (isValidAgeInput) {
      $("#ageInput").next().addClass("d-none");
      $("#ageInput").addClass("is-valid");
    } else {
      $("#ageInput").removeClass("is-valid");
      $("#ageInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#passwordInput").on("input", function () {
    let isValidPasswordInput = validatePassword($("#passwordInput").val());
    if (isValidPasswordInput) {
      $("#passwordInput").next().addClass("d-none");
      $("#passwordInput").addClass("is-valid");
    } else {
      $("#passwordInput").removeClass("is-valid");
      $("#passwordInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#repasswordInput").on("input", function () {
    let isValidRepasswordInput = validateRePassword();
    if (isValidRepasswordInput) {
      $("#repasswordInput").next().addClass("d-none");
      $("#repasswordInput").addClass("is-valid");
    } else {
      $("#repasswordInput").removeClass("is-valid");
      $("#repasswordInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });
}

function validateName(Name) {
  let regex = /^[a-zA-Z]{3,20}$/;
  return regex.test(Name);
}

function validateEmail(Email) {
  let regex = /^[\w\.]{3,20}@[a-zA-Z]{3,20}\.(com|org|net)$/;
  return regex.test(Email);
}

function validatePhone(phone) {
  let regex = /^(20|\+2)?01[0125][0-9]{8}$/;
  return regex.test(phone);
}

function validateAge(age) {
  let regex = /^[1-9]{1,2}0?$/;
  return regex.test(age);
}

function validatePassword(pass) {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  return regex.test(pass);
}

function validateRePassword() {
  return $("#repasswordInput").val() === $("#passwordInput").val();
}

function checkFormValidity() {
  if (
    $("#nameInput").hasClass("is-valid") &&
    $("#emailInput").hasClass("is-valid") &&
    $("#phoneInput").hasClass("is-valid") &&
    $("#ageInput").hasClass("is-valid") &&
    $("#passwordInput").hasClass("is-valid") &&
    $("#repasswordInput").hasClass("is-valid")
  ) {
    $("#submitButton").removeClass("disabled");
  } else {
    $("#submitButton").addClass("disabled");
  }
}

// --- contact us --- //
