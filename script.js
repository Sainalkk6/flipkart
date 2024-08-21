const url = "https://real-time-flipkart-api.p.rapidapi.com/products-by-category?category_id=tyy%2C4io&page=14";
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
const discountInput = document.querySelectorAll(".discount-content-inner input");
const ramInput = document.querySelectorAll('.memory-content-inner input')
const pageNavigator = document.querySelector('.page-navigator')
const pageLanded = document.querySelector('.where-am-i')
const categories = document.querySelectorAll('.sort-category')


categories.forEach(categ=>{
  categ.addEventListener('click',()=>{
    categories.forEach(i=>i.classList.remove('active-categ'))
    categ.classList.add('active-categ')
  })
})

let productsData = [];
let filterBased = [];
let priceRange = { min: 0, max: Infinity };
let ratingRange = [];
let discountArr = [];
let brands = [];
let ramRange = [];
let arr = ['a','c','d','e','f','h','i','j','k','l','n','o','p','q','r','s','t','u','v','w','x','y','z']

const itemsPerPage = 24
let currentPage = 1

async function fetchAllPages() {
  const totalPages = 3; 
  for (let page = 1; page <= totalPages; page++) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5689d58451mshcbb7b3bd6f3eb70p115517jsn1c5a06683d60",
        "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
      },
    };
    
    try {
      const response = await fetch(`./assets/data/data.json`);
      const result = await response.json();
      productsData = result;
      filteredMobiles = result;
      createFilter(filteredMobiles);
      displayCurrent();
      createPages();
  
      searchResultCount.innerHTML = "";
      const span = document.createElement("span");
      span.innerHTML = `Showing 1 - 24 of ${productsData.length} results for "${searchBar.value}"`;
      searchResultCount.appendChild(span);    
    } catch (err) {
      console.log(err);
    }
  }
  return productsData;
}

function displayCurrent() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filteredMobiles.slice(start, end);
  displayCards(paginatedItems);
  const span2 = document.createElement('span');
  pageLanded.innerHTML = '';
  span2.classList.add('page-landed');
  let totalPages = Math.ceil(filteredMobiles.length / itemsPerPage);
  if (totalPages === 0) totalPages = 1;
  span2.innerHTML = `Page ${currentPage} of ${totalPages}`;
  pageLanded.appendChild(span2);
}

function createPages() {
  let pages = Math.ceil(filteredMobiles.length / itemsPerPage);
  pageNavigator.innerHTML = '';

  for (let i = 1; i <= pages; i++) {
    const html = `<span class="current" value='${i}'>${i}</span>`;
    pageNavigator.insertAdjacentHTML('beforeend', html);
  }

  document.querySelector('.current').classList.add('active-navigator');
  document.querySelectorAll('.current').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.current').forEach(btn => btn.classList.remove('active-navigator'));
      btn.classList.add('active-navigator');
      currentPage = i + 1;
      displayCurrent();
    });
  });
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





fetchAllPages();

hider1.addEventListener("click", function () {
  hider1.classList.toggle("active-modal");
  ratingContent.classList.toggle("hidden");
});

hider2.addEventListener("click", function () {
  hider2.classList.toggle("active-modal");
  ratingContent1.classList.toggle("hidden");
});

searchBar.addEventListener("input", (e) => {
  e.preventDefault();
  searchResultCount.innerHTML = "";
  const span = document.createElement("span");
  span.innerHTML = `Showing 1 - ${productsData.length} of ${productsData.length} results for "${e.target.value}"`;
  searchResultCount.appendChild(span);
});

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

ramInput.forEach(input => {
  input.addEventListener('change', () => {
    ramUpdate();
    applyFilters();
  });
});

discountInput.forEach((input) => {
  input.addEventListener("change", () => {
    updateDiscountArr();
    applyFilters();
  });
});

const brandSet = new Set();

function createFilter(mobiles) {
  mobiles.forEach((mobile) => {
    if (!brandSet.has(mobile.brand)) {
      brandSet.add(mobile.brand);
      const mobileTicker = document.createElement("div");
      mobileTicker.classList.add("brand-name");
      const html = `
        <label class="brand-label">
          <input type="checkbox" class="checkbox" value="${mobile.brand}" data-value="${mobile.brand}">
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
}

function updateBrand() {
  brands = [];
  document.querySelectorAll('.brand-bucket input:checked').forEach((input) => {
    if (input.checked) {
      const value = input.getAttribute('data-value');
      brands.push(value);
    }
  });
}

function updateRatingRange() {
  ratingRange = [];
  document.querySelectorAll('.rating-content input:checked').forEach((input) => {
    if (input.checked) {
      ratingRange.push(parseFloat(input.getAttribute('data-value')));
    }
  });
}

function updateDiscountArr() {
  discountArr = [];
  document.querySelectorAll('.discount-content-inner input:checked').forEach((input) => {
    if (input.checked) {
      discountArr.push(parseFloat(input.getAttribute('data-value')));
    }
  });
}

function ramUpdate() {
  ramRange = [];
  document.querySelectorAll('.memory-content-inner input:checked').forEach((input) => {
    if (input.checked) {
      ramRange.push(parseFloat(input.getAttribute('data-value')));
    }
  });
}

function applyFilters() {
  filteredMobiles = productsData.filter((product) => {
    return (
      product.price >= priceRange.min &&
      product.price <= priceRange.max &&
      (brands.length === 0 || brands.includes(product.brand)) &&
      (ratingRange.length === 0 || ratingRange.includes(product.rating.average)) &&
      (discountArr.length === 0 || discountArr.some(d => (product.mrp - product.price) / product.mrp * 100 >= d)) &&
      (ramRange.length === 0 || ramRange.includes(product.ram))
    );
  });
  currentPage = 1; 
  displayCurrent();
  createPages();
  searchResultCount.innerHTML = "";
  const span = document.createElement("span");
  span.innerHTML = `Showing 1 - ${Math.min(itemsPerPage, filteredMobiles.length)} of ${filteredMobiles.length} results for "${searchBar.value}"`;
  searchResultCount.appendChild(span);
}

function clearFilters() {
  priceRange = { min: 0, max: Infinity };
  ratingRange = [];
  discountArr = [];
  brands = [];
  ramRange = [];
  document.querySelectorAll('.brand-bucket input').forEach((input) => input.checked = false);
  document.querySelectorAll('.rating-content input').forEach((input) => input.checked = false);
  document.querySelectorAll('.discount-content-inner input').forEach((input) => input.checked = false);
  document.querySelectorAll('.memory-content-inner input').forEach((input) => input.checked = false);
  applyFilters();
}

function sortDescending() {
  const sortedProducts = [...filteredMobiles].sort((a, b) => b.price - a.price);
  displayCards(sortedProducts);
}

function sortAscending() {
  const sortedProducts = [...filteredMobiles].sort((a, b) => a.price - b.price);
  displayCards(sortedProducts);
}

function sortPopular() {
  const sortedProducts = [...filteredMobiles].sort(
    (a, b) => b.rating.average - a.rating.average
  );
  displayCards(sortedProducts);
}
popularity.addEventListener("click", sortPopular);
ascendingFilter.addEventListener("click", sortAscending);
descendingFilter.addEventListener("click", sortDescending);

categorySelectMain.addEventListener("change", (e) => {
  const value = e.target.value;
  filteredMobiles = productsData.filter(product => product.category === value);
  displayCurrent();
});
