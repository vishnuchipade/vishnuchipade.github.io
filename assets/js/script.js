"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

//Add event listener to select list drop down menu
const selectElements = document.querySelectorAll("[data-select]");

selectElements.forEach(select => {
  const selectValue = select.querySelector("[data-select-value]");
  const selectList = select.nextElementSibling; // assuming structure is <button> + <ul>
  const selectItems = selectList.querySelectorAll("[data-select-item]");

  // Toggle dropdown on select click
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });

  // Set value and close on item click
  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);

      // Trigger filter if needed
      filterFunc?.(selectedValue);
    });
  });
});


// filter variables
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedCategory) {
  for (let i = 0; i < filterItems.length; i++) {
    const categories = filterItems[i].dataset.category.toLowerCase().split(',').map(cat => cat.trim());

    if (selectedCategory === "all") {
      filterItems[i].classList.add("active");
    } else if (categories.includes(selectedCategory)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    //selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}


//RESEARCH

// research variables
const researchItems = document.querySelectorAll("[bdata-research-item]");
const researchModalContainer = document.querySelector(
  "[bdata-modal-container]"
);
const reseachModalCloseBtn = document.querySelector("[bdata-modal-close-btn]");
const researchOverlay = document.querySelector("[bdata-overlay]");
const researchItemsDetailed = document.querySelectorAll(
  "[detailed-researchitem]"
);

// modal variable
const researchModalImg = document.querySelector("[bdata-modal-img]");
const researchModalTitle = document.querySelector("[bdata-modal-title]");
const researchModalText = document.querySelector("[bdata-modal-text]");

// modal toggle function
const researchModalFunc = function () {
  researchModalContainer.classList.toggle("active");
  //overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < researchItems.length; i++) {
  researchItems[i].addEventListener("click", function () {
    researchModalImg.src = this.querySelector("[data-research-img]").src;
    researchModalImg.alt = this.querySelector("[data-research-img]").alt;
    researchModalTitle.innerHTML = this.querySelector(
      "[bdata-research-title]"
    ).innerHTML;
    researchModalText.innerHTML = this.querySelector(
      "[bdata-research-text]"
    ).innerHTML;

    researchModalFunc();
  });
}


function alignModalToMainContent() {
  const modal = document.querySelector(".modal-container");
  const mainContent = document.querySelector(".main-content");

  if (modal && mainContent) {
    const rect = mainContent.getBoundingClientRect();

    modal.style.left = `${rect.left}px`;
    modal.style.width = `${rect.width}px`;
    
    console.log("Main content width:", rect.width);
    console.log("Modal container width set to:", modal.style.width);
  }
}

// Align on load and on resize
window.addEventListener("load", alignModalToMainContent);
window.addEventListener("resize", alignModalToMainContent);

// add click event to modal close button
reseachModalCloseBtn.addEventListener("click", researchModalFunc);
researchOverlay.addEventListener("click", researchModalFunc);

// PUBLICATION

// const publicationAbstractItems = document.querySelectorAll(
//   "[ pdata-publication-abstract]"
// );
// const publicationCiteItems = document.querySelectorAll(
//   "[pdata-publication-cite]"
// );

// const publicationModalContainer = document.querySelector(
//   "[pdata-modal-container]"
// );
// const publicationModalCloseBtn = document.querySelector(
//   "[pdata-modal-close-btn]"
// );
// const publicationOverlay = document.querySelector("[pdata-overlay]");
// const publicationtemsDetailed = document.querySelectorAll(
//   "[detailed-publication-item]"
// );

// // modal variable
// const publicationModalImg = document.querySelector("[pdata-modal-img]");
// const publicationModalTitle = document.querySelector("[pdata-modal-title]");
// const publicationModalText = document.querySelector("[pdata-modal-text]");

// // modal toggle function
// const publicationModalFunc = function () {
//   publicationModalContainer.classList.toggle("active");
//   // overlay.classList.toggle("active");
// };

// // add click event to abstract item
// for (let i = 0; i < publicationAbstractItems.length; i++) {
//   publicationAbstractItems[i].addEventListener("click", function () {
//     publicationModalTitle.innerHTML = this.querySelector(
//       "[pdata-publication-title]"
//     ).innerHTML;
//     publicationModalText.innerHTML = this.querySelector(
//       "[pdata-publication-text]"
//     ).innerHTML;

//     publicationModalFunc();
//   });
// }

// // add click event to cite items
// for (let i = 0; i < publicationCiteItems.length; i++) {
//   publicationCiteItems[i].addEventListener("click", function () {
//     publicationModalTitle.innerHTML = this.querySelector(
//       "[pdata-publication-title]"
//     ).innerHTML;
//     publicationModalText.innerHTML = this.querySelector(
//       "[pdata-publication-text]"
//     ).innerHTML;

//     publicationModalFunc();
//   });
// }

// // add click event to modal close button
// publicationModalCloseBtn.addEventListener("click", publicationModalFunc);
// publicationOverlay.addEventListener("click", publicationModalFunc);


// //Reverse the order of the journal at the beginning launch of the page
// // Get the 'ol' element using its class
// const ol = document.querySelector('.custom-counter');
// const items = Array.from(ol.getElementsByTagName('li'));

// // Filter only active items (those with class 'active')
// const activeItems = items.filter(item => item.classList.contains('active'));

// //Reverse the numbering of the publication items
// // Select all ordered lists with the class "custom-counter"
// // const listItems = document.querySelectorAll('.custom-counter li');
// const totalItems = activeItems.length;

// // Loop through each <li> and set the reverse number
// activeItems.forEach((li, index) => {
//     li.setAttribute('data-number', totalItems - index); // Set reverse numbering
// });


