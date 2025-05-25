document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // TLAČÍTKO "ZPĚT NAHORU" – jen na stránkách, kde existuje
  // ============================
  const backToTop = document.querySelector(".backToTop");

  if (backToTop) {
    function toggleBackToTopButton() {
      backToTop.style.display = window.scrollY > 200 ? "block" : "none";
    }

    toggleBackToTopButton();
    window.addEventListener("scroll", toggleBackToTopButton);

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ============================
  // REGISTRAČNÍ FORMULÁŘ
  // ============================
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  if (password && confirmPassword) {
    function validatePasswords() {
      // Vymazání předchozích úprav
      password.style.borderColor = "";
      confirmPassword.style.borderColor = "";
      password.classList.remove("valid", "invalid");
      confirmPassword.classList.remove("valid", "invalid");

      // Pokud je heslo prázdné, nehodnotíme
      if (password.value === "") return;

      // Nesouhlasí hesla nebo prázdné potvrzení → červeně
      if (
        confirmPassword.value === "" ||
        password.value !== confirmPassword.value
      ) {
        password.classList.add("invalid");
        confirmPassword.classList.add("invalid");
      } else {
        // Hesla sedí → zeleně
        password.classList.add("valid");
        confirmPassword.classList.add("valid");
      }
    }

    password.addEventListener("input", validatePasswords);
    confirmPassword.addEventListener("input", validatePasswords);
  }
});

// ============================
// DALŠÍ FILMY
// ============================
const select = document.getElementById("select-movie");
const movieSection = document.getElementById("movie-cards");
const body = document.body;

// Při změně výběru voláme funkci fetchData s hodnotou selectu
select.addEventListener("change", (e) => {
  const value = e.target.value;
  fetchData(value);
});

// Pomocná funkce: vytvoří obrázek a přidá ho do daného elementu
const addToWebsite = (imageUrl, whereToAdd) => {
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Film";
  img.classList.add("movie-image");
  whereToAdd.appendChild(img);
};

// Hlavní funkce: načte data z API TVMaze a vykreslí obrázky
const fetchData = (query) => {
  movieSection.innerHTML = "";
  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      const slicedData = data.slice(0, 10);
      if (slicedData.length === 0) {
        const p = document.createElement("p");
        p.textContent = "Žádné výsledky.";
        movieSection.appendChild(p);
        return;
      }
      // Pro každý výsledek přidáme obrázek, pokud je dostupný
      slicedData.forEach((item) => {
        const show = item.show;
        if (show.image && show.image.medium) {
          addToWebsite(show.image.medium, movieSection);
        }
      });
    })
    .catch((err) => {
      console.error("Chyba při načítání:", err);
      const p = document.createElement("p");
      p.textContent = "Došlo k chybě při načítání dat.";
      movieSection.appendChild(p);
    });
};
