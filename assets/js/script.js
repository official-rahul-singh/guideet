document.addEventListener("DOMContentLoaded", function () {


    // accordion code  ============ start =====>
        const detailsElements = document.querySelectorAll("details");
    const summaryElements = document.querySelectorAll("summary");
    summaryElements.forEach((summary, index) => {
        summary.addEventListener("click", () => {
            // Close other open details elements and remove 'active' class
            detailsElements.forEach((details, i) => {
                if (i !== index) {
                    details.open = false;
                }
            });
        });
    });

});


// menu start
let headerUl = document.querySelector('header nav');

function toggleButtons() {
  let header = document.querySelector("header");
  headerUl.classList.toggle("show-ul");
let cancel_btn= document.querySelector(".cancel-btn");

  if (!headerUl.classList.contains("show-ul")) {
    document.querySelector('.doc-overlay').remove();
    enableScroll();
  } else {
    let docOverlayDiv = document.createElement('div');
    header.appendChild(docOverlayDiv);
    docOverlayDiv.classList.add('doc-overlay');
    disableScroll();
    cancel_btn.style.display="block";

    docOverlayDiv.addEventListener('click', function (event) {
      headerUl.classList.remove("show-ul");
      docOverlayDiv.remove();
      enableScroll();
    });
  }
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}
// menu end



// mobile Dropdown  ============ start =====>
  const navDropdowns = document.querySelectorAll(".dropdown");
navDropdowns.forEach((parentDropdown) => {
parentDropdown.addEventListener("click", function (e) {
this.classList.toggle("showMenu");
});

const subDropdowns = parentDropdown.querySelectorAll(".dropdown ul");
subDropdowns.forEach((subDropdown) => {
subDropdown.addEventListener("click", function (event) {
   event.stopPropagation(); // Prevents the click event from reaching the parent dropdown
});
});
});

// Add a click event listener to the document to close dropdowns when clicking outside
document.addEventListener("click", (e) => {
navDropdowns.forEach((dropdown) => {
if (!dropdown.contains(e.target)) {
   dropdown.classList.remove("showMenu");
}
});
});
// mobile Dropdown  ============ end =====>



  
    // mobile menu code ============ start =====>
      let searchIcon = document.querySelector(".mob-search-button");
    let searchForm = document.querySelector(".search-form");
    let svg1 =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    let svg2 =
        '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
    let isSvg1 = true;
    searchIcon.addEventListener("click", function () {
        searchIcon.innerHTML = isSvg1 ? svg2 : svg1;
        isSvg1 = !isSvg1;

        searchForm.classList.toggle("search-bar-show");
    });

    const toggleslideBtn = document.querySelector(".toggle-slide-button");
    const cancelBtn = document.querySelector(".cancel-btn");
    const headerUl1 = document.querySelector("header ul");

    function toggleButtons(cancelBtn, headerUl) {
        headerUl.classList.toggle("show-ul");
        cancelBtn.style.display = cancelBtn.style.display === "block" ? "none" : "block";
    }

    toggleslideBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });

    cancelBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });
    // mobile menu code ============ start =====>



        // testimonial slider
    const wrapper = document.querySelector(".slide-wrapper");
    const carousel = document.querySelector(".carousel");
    const indicatorsContainer = document.querySelector(".indicators");
    const firstCardWidth = carousel.querySelector(".slide-card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".slide-wrapper i");
    const carouselChildrens = [...carousel.children];

    let isDragging = false, isAutoPlay = true, cardGap = 16, startX, startScrollLeft, timeoutId, activeIndicator;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return;
        // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += (firstCardWidth + cardGap), 1000);
    }
    autoPlay();
    const updateActiveIndicator = () => {
        const scrollLeft = carousel.scrollLeft;
        const index = Math.round(scrollLeft / (firstCardWidth + cardGap)) - cardPerView;
        const indicators = document.querySelectorAll(".indicator");
        indicators.forEach((indicator, i) => {
            if (i === index) {
                setActiveIndicator(indicator);
            }
        });
    }


    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    carousel.addEventListener("scroll", updateActiveIndicator);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);


    // Create indicators
    for (let i = 0; i < carouselChildrens.length - 2 * cardPerView; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        if (i === 0) {
            indicator.classList.add("active");
            activeIndicator = indicator;
        }
        indicator.addEventListener("click", () => {
            carousel.scrollLeft = (i + cardPerView) * (firstCardWidth + cardGap);
            setActiveIndicator(indicator);
        });
        indicatorsContainer.appendChild(indicator);
    }


    // Function to set active indicator
    const setActiveIndicator = (indicator) => {
        if (activeIndicator) {
            activeIndicator.classList.remove("active");
        }
        indicator.classList.add("active");
        activeIndicator = indicator;
    }





// header scroll


// let lastScrollTop = 0;
// window.addEventListener('scroll', function() {
//   let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//   if (currentScroll > lastScrollTop) {
//     // Scrolling down
//     document.querySelector('header').style.top = '-44px'; // Hide header
    
//   } else {
//     // Scrolling up
//     document.querySelector('header').style.top = '0px'; // Show header
//   }

//   lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
// });

// let isPast200px = false;
// window.addEventListener('scroll', function() {
// 	let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
// 	if (currentScroll > 50) {
// 		if (!isPast200px) {
// 			// Scrolled beyond 200px
// 			document.querySelector('header').style.backgroundColor = '#fff'; // Change to the desired color
//             document.querySelector('header').style.boxShadow = "0px 0px 7px 0px rgba(0, 0, 0, 0.15)";
// 			isPast200px = true;
// 		}
// 	} else {
// 		// Scrolled within the first 200px
// 		if (isPast200px) {
// 			document.querySelector('header').style.backgroundColor = 'transparent'; // Change to the desired color
// 			isPast200px = false;
//             document.querySelector('header').style.boxShadow = "unset";

// 		}
// 	}
// });





// my code
// Initialize variables
let lastScrollTop = 0;
let isPast200px = false;

// Function to handle scroll event
function handleScroll() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector('header');

    // Toggle header visibility based on scroll direction
    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }

    // Toggle header background and shadow past 50px
    if (currentScroll > 50) {
        if (!isPast200px) {
            // Scrolled beyond 50px
            header.classList.add('header-scrolled');
            isPast200px = true;
        }
    } else {
        if (isPast200px) {
            // Scrolled within the first 50px
            header.classList.remove('header-scrolled');
            isPast200px = false;
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
// my code
