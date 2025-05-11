const backToTop = document.querySelector(".backToTop");

// Zobrazí nebo skryje tlačítko podle aktuální pozice scrollu
function toggleBackToTopButton() {
  if (window.scrollY > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}

// Zkontroluje scroll při načtení stránky
toggleBackToTopButton();

// Při scrollování volá funkci, která zobrazuje/skrývá tlačítko
window.addEventListener("scroll", toggleBackToTopButton);

// Po kliknutí na tlačítko se stránka posune nahoru s plynulým efektem
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
