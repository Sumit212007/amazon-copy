let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector" data-product-id="${product.id}">
                    ${[...Array(10).keys()].map(i => `<option value="${i+1}">${i+1}</option>`).join('')}
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png"> Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        // Get the selected quantity for this product
        const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
        const quantity = Number(quantitySelector.value);

        // Check if product already exists in cart
        let existingItem = cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }

        console.log(cart); // show cart in console

        // Show "Added" message
        const addMessage = button.parentElement.querySelector('.added-to-cart');
        addMessage.classList.add('show');
        setTimeout(() => addMessage.classList.remove('show'), 2000);

        // Update cart quantity display
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.js-cart-quantity').innerText = totalQuantity;
    });
});
