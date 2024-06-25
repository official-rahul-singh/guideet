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


// header scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    document.querySelector('header').style.top = '-76px'; // Hide header
    // document.querySelector('header nav').style.padding = '16px'; // Hide header
    
  } else {
    // Scrolling up
    document.querySelector('header').style.top = '0'; // Show header
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

let isPast200px = false;
window.addEventListener('scroll', function() {
	let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
	if (currentScroll > 50) {
		if (!isPast200px) {
			// Scrolled beyond 200px
			document.querySelector('header').style.backgroundColor = 'var(--primary-color)'; // Change to the desired color
			isPast200px = true;
		}
	} else {
		// Scrolled within the first 200px
		if (isPast200px) {
			document.querySelector('header').style.backgroundColor = 'transparent'; // Change to the desired color
			isPast200px = false;

		}
	}
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

    const toggleslideBtn = document.querySelector(".toggle-slide-btn");
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