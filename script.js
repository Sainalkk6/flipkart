const url =
  "https://real-time-flipkart-api.p.rapidapi.com/products-by-category?category_id=tyy%2C4io&page=10";
const brandFilter = document.querySelector(".brand-bucket");
const filterBox = document.querySelector(".filter-indicator-content");
const clearBrandFilter = document.querySelector(".clear-brand-filter");
const clearFilter = document.querySelector(".clear-all");
const filterIndicator = document.querySelector(".filter-indicator");
const categorySelectMain = document.querySelector(".main-sort");
const categDiv = categorySelectMain.querySelectorAll(":not(span) div");
const mobileCard = document.querySelector(".main-home-content");
const ascendingFilter = document.getElementById("low-to-high");
const descendingFilter = document.getElementById("high-to-low");
const options = document.querySelectorAll(".option");
const select = document.querySelector(".select");
const selectMin = document.querySelector(".minimum");
const hider = document.querySelector(".modal");
const hider1 = document.querySelector(".modal1");
const hider2 = document.querySelector(".modal2");
const brandMain = document.querySelector(".brand-section-bottom");
const count = document.querySelector(".count span");
const ratingInputs = document.querySelectorAll(".rating-content-inner input");
const ratingContent = document.querySelector(".rating-content");
const ratingContent1 = document.querySelector(".rating-content1");
const memoryContent = document.querySelector(".memory-content");
const searchResultCount = document.querySelector(".main-result");
const searchBar = document.querySelector(".form-inner input");
const popularity = document.getElementById("popularity");
const percentage = document.querySelectorAll(".percentage");
const discountInput = document.querySelectorAll(
  ".discount-content-inner input"
);

let productsData = [];
let filterBased = [];
let priceRange = { min: 0, max: Infinity };
let ratingRange = [];
let discountArr = [];
let brands = [];
let ramRange = [];

hider1.addEventListener("click", function () {
  hider1.classList.toggle("active-modal");
  ratingContent.classList.toggle("hidden");
});

hider2.addEventListener("click", function () {
  hider2.classList.toggle("active-modal");
  ratingContent1.classList.toggle("hidden");
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    // Handle option click
    console.log(option.value);
  });
});

async function getPhoneDetails() {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5689d58451mshcbb7b3bd6f3eb70p115517jsn1c5a06683d60",
      "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    productsData = result.products;
    console.log(productsData);

    createFilter(productsData);
    displayCards(productsData);
  } catch (error) {
    console.error(error);
  }
}

searchBar.addEventListener("input", (e) => {
  e.preventDefault();
  searchResultCount.innerHTML = "";
  const span = document.createElement("span");
  span.innerHTML = `Showing 1 - ${productsData.length} of ${productsData.length} results for "${e.target.value}"`;
  searchResultCount.appendChild(span);
});

// clearFilter.addEventListener('click',()=>{
//   clearFilter.classList.toggle('hidden')
//   clearBrandFilter.classList.toggle('hidden')
// })

// clearBrandFilter.addEventListener('click',()=>clearBrandFilter.classList.toggle('hidden'))

select.addEventListener("change", () => {
  priceRange.max = parseFloat(select.value) || Infinity;
  applyFilters();
});

selectMin.addEventListener("change", () => {
  priceRange.min = parseFloat(selectMin.value) || 0;
  applyFilters();
});

ratingInputs.forEach((input) => {
  input.addEventListener("change", () => {
    updateRatingRange();
    applyFilters();
  });
});



discountInput.forEach((input) => {
  input.addEventListener("change", () => {
    updateDiscountArr();
    applyFilters();
  });
});

function createFilter(mobiles) {
  brandFilter.innerHTML = "";
  // memoryContent.innerHTML = "";
  // const memorySet = new Set();

  const percentageSet = new Set();
  const brandSet = new Set();

  mobiles.forEach((mobile) => {
    if (!brandSet.has(mobile.brand)) {
      brandSet.add(mobile.brand);
      const mobileTicker = document.createElement("div");
      mobileTicker.classList.add("brand-name");

      const html = `<label class="brand-label">
          <input type="checkbox" class="checkbox" value="${mobile.brand}" data-value = "${mobile.brand}">
          <span class="brand-name-target">${mobile.brand}</span>
        </label>`;

      mobileTicker.insertAdjacentHTML("beforeend", html);
      brandFilter.appendChild(mobileTicker);

      const brandInput = mobileTicker.querySelectorAll("input");

      brandInput.forEach((input) => {
        input.addEventListener("change", () => {
          updateBrand();
          applyFilters();
        });
      });

      function updateBrand() {
        brands = [];
        brandInput.forEach((input) => {
          if (input.checked) {
            const value = input.getAttribute("data-value");
            if (value) {
              brands.push(value);
            }
          }
        });
      }
    }
  });

  percentage.forEach((percen) => {
    percen.addEventListener("change", (e) => {
      let newPercentage = e.target.value;
      newPercentage = newPercentage.slice(0, 2);
    });
  });

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        if (!filterBased.includes(value)) {
          filterBased.push(value);
        }
      } else {
        filterBased = filterBased.filter((item) => item !== value);
      }
      updateFilters();
    });
  });

  clearBrandFilter.addEventListener("click", () => {
    clearFilters();
    clearBrandFilter.classList.toggle("hidden");
  });
  clearFilter.addEventListener("click", () => clearFilters());

  hider.addEventListener("click", function () {
    hider.classList.toggle("active-modal");
    brandMain.classList.toggle("hidden");
    count.textContent = count.textContent === `${brandSet.size} MORE` ? "0 MORE" : `${brandSet.size} MORE`;
  });
}



function updateDiscountArr() {
  discountArr = [];
  discountInput.forEach((input) => {
    if (input.checked) {
      const value = input.getAttribute("data-value");
      if (value) {
        discountArr.push(value);
      }
    }
  });
}

function updateRatingRange() {
  ratingRange = [];
  ratingInputs.forEach((input) => {
    if (input.checked) {
      const value = parseInt(input.getAttribute("data-value"), 10);
      if (value) {
        ratingRange.push(value);
      }
    }
  });
}

function updateFilters() {
  filterBox.innerHTML = "";
  filterIndicator.classList.remove("hidden");
  clearFilter.classList.toggle("hidden",filterBased.length === 0 && ratingRange.length === 0 && priceRange.min === 0 && brands.length === 0 && priceRange.max === Infinity);
  clearBrandFilter.classList.toggle("hidden", filterBased.length === 0);

  filterBased.forEach((brand) => {
    const filter = document.createElement("div");
    filter.classList.add("filter");
    filter.setAttribute("data-brand", brand);
    filter.innerHTML = `<span class="close-btn">✕</span>
      <span class="brand-name-1">${brand}</span>`;
    filterBox.appendChild(filter);

    filter.querySelector(".close-btn").addEventListener("click", () => {
      filterBox.removeChild(filter);
      filterBased = filterBased.filter((item) => item !== brand);
      document.querySelector(`.checkbox[value="${brand}"]`).checked = false;
      updateFilters();
      applyFilters();
    });
  });

  applyFilters();
}

function clearFilters() {
  filterBox.innerHTML = "";
  filterBased = [];
  priceRange = { min: 0, max: Infinity };
  ratingRange = [];
  ramRange = [];
  brands =[]
  clearBrandFilter.classList.toggle("hidden");
  clearFilter.classList.toggle("hidden");
  document.querySelectorAll(".checkbox").forEach((checkbox) => (checkbox.checked = false));
  document.querySelectorAll(".rating-content-inner input").forEach((input) => (input.checked = false));
  select.value = "";
  selectMin.value = "";
  applyFilters();
  displayCards(productsData);
}

createFilter(productsData);

function applyFilters() {
  const discountedMobiles = productsData.filter((mobile) => {
    const ogPrice = mobile.mrp;
    const offPrice = mobile.price;
    const percentage = Number(Math.ceil(((ogPrice - offPrice) / ogPrice) * 100));
    let discount = discountArr[0];
    discount = +discount;
    const discounted = percentage >= discount;
    return discounted;
  });

  const mobill = discountedMobiles.map((m) => m.brand);

  const filteredMobiles = productsData.filter((mobile) => {
    const ogPrice = mobile.mrp;
    const offPrice = mobile.price;
    const percentage = Number(Math.ceil(((ogPrice - offPrice) / ogPrice) * 100));
    const brandMatch = brands.length === 0 || brands.includes(mobile.brand);
    const priceMatch = mobile.price >= priceRange.min && mobile.price <= priceRange.max;
    const discountMatch =discountArr.length === 0 || discountArr.some((discount) => percentage >= +discount);

    return discountMatch && brandMatch && priceMatch;
  });

  console.log(filteredMobiles);
  filteredMobiles.length === 0 ? displayCards(productsData) : displayCards(filteredMobiles);
}


function displayCards(data) {
  mobileCard.innerHTML = "";
  data.forEach(createCard);
}

function createCard(result) {
  const ogPrice = result.mrp;
  const offPrice = result.price;
  const html = `
    <div class="mobile-card">
      <div class="mobile-card-inner">
        <div class="mobile-card-container">
          <div class="mobile-picture-container">
            <div class="mobile-card-image">
              <img src="${result.images[0]}" alt="">
            </div>
            <div class="add-to-compare">
              <input type="checkbox">
              <span>Add to Compare</span>
            </div>
            <div class="heart">
              <svg id="heart-${
                result.id
              }" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="N1bADF" width="16" height="16" viewBox="0 0 20 16">
                <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="#C2C2C2" class="x1UMqG" stroke="#FFFFFF" fill-rule="evenodd" opacity=".9"></path>
              </svg>
            </div>
          </div>
          <div class="mobile-description-container">
            <div class="about-mobile">
              <span class="hover-me">${result.title}</span>
              <div class="mobile-rating">
                <div class="mobile-star-rating">
                  <span>${result.rating.average}</span>
                  <img src="assets/img/star.svg" alt="">
                </div>
                <div class="rating-review">
                  <span>${result.rating.count.toLocaleString()} Ratings & ${result.rating.reviewCount.toLocaleString()} Reviews</span>
                </div>
              </div>
              <div class="mobile-features">
                <ul>
                  ${result.highlights
                    .map((h) => `<li class="points">${h}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>
            <div class="price-container">
              <div class="price-top">
                <span>₹${offPrice.toLocaleString()}</span>
                <div class="real-price">₹${ogPrice.toLocaleString()}</div>
                <div class="off"><span>${Math.ceil(
                  ((ogPrice - offPrice) / ogPrice) * 100
                )}% off</span></div>
                <div class="delivery"><span>Free delivery</span></div>
              </div>
              <div class="f-assure"><img src="assets/img/fassure.png" alt=""></div>
              <div class="save"><span>Save extra with combo offers</span></div>
              <div class="save"><span class="bank">Bank Offer</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  mobileCard.insertAdjacentHTML("beforeend", html);
}

function sortDescending() {
  const sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
  displayCards(sortedProducts);
}

function sortAscending() {
  const sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
  displayCards(sortedProducts);
}

function sortPopular() {
  const sortedProducts = [...productsData].sort(
    (a, b) => b.rating.average - a.rating.average
  );
  displayCards(sortedProducts);
}
popularity.addEventListener("click", sortPopular);
ascendingFilter.addEventListener("click", sortAscending);
descendingFilter.addEventListener("click", sortDescending);

categDiv.forEach((div) => {
  div.addEventListener("click", function () {
    categDiv.forEach((el) => el.classList.remove("active-categ"));
    div.classList.add("active-categ");
  });
});

getPhoneDetails();
