// Sélection de tous les boutons "Add"
const addButtons = document.querySelectorAll(".btnAdd");

addButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const productCard = btn.closest(".bg-light"); // carte du produit
    const image = productCard.querySelector("img").src;
    const priceText = productCard.querySelector(".pu").textContent;
    const price = parseFloat(priceText.replace("Price:", "").replace("€", "").trim());
    const name = productCard.querySelector("img").alt;

    // Créer un objet produit
    const product = { name, price, image, quantity: 1 };

    // Charger le panier existant ou créer un nouveau
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Vérifie si le produit est déjà dans le panier
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    // Sauvegarder dans localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Animation + feedback
    btn.textContent = "Added ✅";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add";
      btn.disabled = false;
    }, 1000);
  });
});
