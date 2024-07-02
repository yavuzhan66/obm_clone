/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/********************************************************************* 






/********************************************************************* */


document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.shop-item-button');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalPriceElement = document.querySelector('.cart-total-price');
  const purchaseButton = document.querySelector('.btn-purchase');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCartClicked);
  });

  purchaseButton.addEventListener('click', purchaseClicked);

  function addToCartClicked(event) {
      const button = event.target;
      const shopItem = button.closest('.service-card');
      const title = shopItem.querySelector('.card-title').innerText;
      const price = shopItem.querySelector('.shop-price').innerText;
      addItemToCart(title, price);
      updateCartTotal();
  }

  function addItemToCart(title, price) {
      const cartRow = document.createElement('div');
      cartRow.classList.add('cart-row');
      const cartItemNames = cartItemsContainer.querySelectorAll('.cart-item-title');
      for (let i = 0; i < cartItemNames.length; i++) {
          if (cartItemNames[i].innerText === title) {
              alert('This item is already added to the cart');
              return;
          }
      }
      const cartRowContents = `
          <div class="cart-item cart-column">
              <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1">
              <button class="btn btn-danger" type="button">REMOVE</button>
          </div>`;
      cartRow.innerHTML = cartRowContents;
      cartItemsContainer.append(cartRow);
      cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
      cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
  }

  function removeCartItem(event) {
      const buttonClicked = event.target;
      buttonClicked.closest('.cart-row').remove();
      updateCartTotal();
  }

  function quantityChanged(event) {
      const input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
      }
      updateCartTotal();
  }

  function updateCartTotal() {
      const cartRows = cartItemsContainer.querySelectorAll('.cart-row');
      let total = 0;
      cartRows.forEach(cartRow => {
          const priceElement = cartRow.querySelector('.cart-price');
          const quantityElement = cartRow.querySelector('.cart-quantity-input');
          const price = parseFloat(priceElement.innerText.replace('€', ''));
          const quantity = quantityElement.value;
          total += price * quantity;
      });
      cartTotalPriceElement.innerText = total.toFixed(2) + '€';
  }

  function purchaseClicked() {
      alert('Merci pour votre achat !');
      window.location.href = 'https://www.stripe.com'; // lien vers paiement
  }
});
