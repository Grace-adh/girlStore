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
  updateCartCount();
});


//Section cart.html


    // Récupérer le panier depuis localStorage
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          const cartBody = document.getElementById("cart-body");
          const grandTotalEl = document.getElementById("grand-total");


          // Fonction pour afficher le panier
          function displayCart() {
              cartBody.innerHTML = "";
              let grandTotal = 0;

              cart.forEach((item, index) => {
              const total = item.price * item.quantity;
              grandTotal += total;

              const row = document.createElement("tr");
              row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="60" /> <br> ${item.name}</td>
                <td>${item.price} €</td>
                <td>
                  <input type="number" min="1" value="${item.quantity}" class="form-control quantity-input" data-index="${index}">
                </td>
                <td>${total.toFixed(2)} €</td>
                <td>
                  <button class="btn btn-sm btn-danger btn-remove" data-index="${index}">Supprimer</button>
                </td>
              `;
              cartBody.appendChild(row);
              });

              grandTotalEl.textContent = grandTotal.toFixed(2);

              attachEvents(); // relier les inputs et boutons
          }

          // Mettre à jour la quantité
          function attachEvents() {
              document.querySelectorAll(".quantity-input").forEach(input => {
                  input.addEventListener("change", e => {
                    const idx = e.target.dataset.index;
                    let qty = parseInt(e.target.value);
                    if (qty < 1) qty = 1;
                    cart[idx].quantity = qty;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    displayCart();
                  });
              });

              document.querySelectorAll(".btn-remove").forEach(btn => {
                    btn.addEventListener("click", e => {
                      const idx = e.target.dataset.index;
                      cart.splice(idx, 1);
                      localStorage.setItem("cart", JSON.stringify(cart));
                      displayCart();
                    });
              });
          }

          // Vider le panier
          document.getElementById("btn-clear").addEventListener("click", () => {
          cart = [];
          localStorage.removeItem("cart");
          displayCart();
          });

          // Simuler le paiement
          document.getElementById("btn-pay").addEventListener("click", () => {
          if(cart.length === 0){
          alert("Votre panier est vide 😢");
          return;
          }
          alert(`Merci pour votre achat ! Total payé : ${grandTotalEl.textContent} €`);
          cart = [];
          localStorage.removeItem("cart");
          displayCart();
          });

// Affichage initial
    displayCart();


    // 🛒 Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // total = somme des quantités
  const totalItems = cart.length;
  const cartCount = document.getElementById("cartCount");
  
  // Mise à jour du badge
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "inline" : "none";
  }
}

// ✅ Appeler la fonction dès le chargement de la page
updateCartCount();
