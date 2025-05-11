//2. VALIDACE HESLA
//načtení html z indexu
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//validace hesla pomocí funkce
function validatePasswords() {
  // Definujeme si objekt, který mapuje možné stavy na barvy
  const state = {
    empty: "", // pokud heslo není vyplněné → bez barvy
    invalid: "red", // pokud hesla nesedí nebo potvrzení chybí → červená
    valid: "green", // pokud hesla sedí → zelená
  };
  // Určíme barvu podle stavu:
  // 1. Pokud heslo je prázdné → použijeme state.empty ('')
  // 2. Pokud potvrzovací heslo je prázdné nebo hesla nejsou stejná → state.invalid ('red')
  // 3. Jinak (hesla souhlasí) → state.valid ('green')
  const color =
    password.value === ""
      ? state.empty
      : confirmPassword.value === "" || password.value !== confirmPassword.value
      ? state.invalid
      : state.valid;
  // Aplikujeme určenou barvu na obě pole
  password.style.borderColor = color;
  confirmPassword.style.borderColor = color;
}
// Přidáme posluchače události "input" na obě pole,
// aby se kontrola spustila pokaždé, když uživatel něco napíše
password.addEventListener("input", validatePasswords);
confirmPassword.addEventListener("input", validatePasswords);
