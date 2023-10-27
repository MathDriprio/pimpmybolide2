'use strict';



/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

document.addEventListener('DOMContentLoaded', function () {
    let currentImageIndex = 0;
    let isTuningActive = false; // Utilisez une variable pour suivre l'état de l'option de tuning
    const productImages = document.querySelectorAll('#product-carousel .carousel-item');
    const tunedCarImages = document.querySelectorAll('.tuned-car-image'); // Sélectionnez toutes les images avec la classe "tuned-car-image"
    const totalImages = productImages.length;

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const tuningButton = document.getElementById('tuning-button');
    const engineStageSelect = document.getElementById('engine-stage');
    const productPriceElement = document.getElementById('product-price');


    function updateVisibleImage() {
        if (isTuningActive) {
            productImages.forEach((img) => {
                img.style.display = 'none'; // Masquez les images principales
            });
            tunedCarImages.forEach((img, index) => {
                img.style.display = index === currentImageIndex ? 'block' : 'none'; // Affichez les images de tuning en fonction de l'index courant
            });
        } else {
            productImages.forEach((img, index) => {
                img.style.display = index === currentImageIndex ? 'block' : 'none'; // Affichez les images principales en fonction de l'index courant
            });
            tunedCarImages.forEach((img) => {
                img.style.display = 'none'; // Masquez les images de tuning
            });
        }
    }

    function calculatePrice() {
        const selectedStage = engineStageSelect.value;
        let stagePriceIncrease;
        let basePrice = Number.parseInt(document.querySelector("#product-price").title);
        console.log(basePrice, document.querySelector("#product-price"));
        switch (selectedStage) {
            case 'stage0':
                stagePriceIncrease = 0;
                break;
            case 'stage1':
                stagePriceIncrease = 5000;
                break;
            case 'stage2':
                stagePriceIncrease = 20000;
                break;
            case 'stage3':
                stagePriceIncrease = 30000;
                break;
            default:
                stagePriceIncrease = 0;
        }

        const newPrice = isTuningActive ? basePrice : (basePrice + stagePriceIncrease);
        productPriceElement.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(newPrice);
    }

    prevButton.addEventListener('click', () => {
        if (isTuningActive) {
            currentImageIndex = (currentImageIndex - 1 + tunedCarImages.length) % tunedCarImages.length; // Défilement des images de tuning
        } else {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages; // Défilement des images principales
        }
        updateVisibleImage();
    });

    nextButton.addEventListener('click', () => {
        if (isTuningActive) {
            currentImageIndex = (currentImageIndex + 1) % tunedCarImages.length; // Défilement des images de tuning
        } else {
            currentImageIndex = (currentImageIndex + 1) % totalImages; // Défilement des images principales
        }
        updateVisibleImage();
    });

    tuningButton.addEventListener('click', () => {
        isTuningActive = !isTuningActive; // Inverser l'état de l'option de tuning
        currentImageIndex = 0; // Réinitialisez l'index lorsque vous activez l'option de tuning
        updateVisibleImage();
        calculatePrice(); // Recalculer le prix en fonction de l'option de tuning
    });

    engineStageSelect.addEventListener('change', calculatePrice);

    updateVisibleImage();
    calculatePrice();
});
