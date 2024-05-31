let cart = [];
let currentProduct = {};
let shopping_cart = [];

function displayProduct(name, img, price, desc) {
    currentProduct = { name, img, price, desc }; 
    document.getElementById('product_img').src = img;
    document.getElementById('product_name').innerText = name;
    document.getElementById('product_price').innerText = '₱' + price + '.00';
    document.getElementById('product_desc').innerText = desc;
    document.getElementById('itemQuant').value = 1;
    togglePreview();
}

function togglePreview() {
    const previewMenu = document.getElementById('previewMenu');
    previewMenu.classList.toggle('active');
}

function toggle_remove() {
    togglePreview();
}


function increaseQuant() {
    let quantInput = document.getElementById('itemQuant');
    let quantity = parseInt(quantInput.value);
    quantInput.value = quantity + 1;
}

function decreaseQuant() {
    let quantInput = document.getElementById('itemQuant');
    let quantity = parseInt(quantInput.value);
    if (quantity > 1) {
        quantInput.value = quantity - 1;
    }
}

function addToCart() {
    const quant = parseInt(document.getElementById('itemQuant').value);
    const product = {
        name: currentProduct.name,
        price: parseFloat(currentProduct.price),
        quantity: quant
    };
    shopping_cart.push(product);
    update_cart();
    updateCartIcon();
    togglePreview();
}

function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.dataset.count = shopping_cart.length;
}

function toggleCart() {
    const shoppingCart = document.getElementById('shopping_cart');
    shoppingCart.classList.toggle('active');
    renderCartItems();
}

function update_cart() {
    const item_list = document.getElementById('item_list');
    const display_total = document.getElementById('total_price');
    item_list.innerHTML = ''; 
    let total = 0;

    shopping_cart.forEach((item, index) => {

        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);

        console.log("Item Price:", price, "Item Quantity:", quantity); 

        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        } else {
            console.error("Invalid price or quantity for item:", item);
        }

        const row = document.createElement('tr'); 

        const name_cell = document.createElement('td');
        name_cell.textContent = item.name; 
        row.appendChild(name_cell);

        const quantity_cell = document.createElement('td');
        quantity_cell.textContent = item.quantity + 'x'; 
        row.appendChild(quantity_cell);

        const price_cell = document.createElement('td');
        price_cell.textContent = '₱' + (price * quantity).toFixed(2);
        price_cell.classList.add('class_price');
        row.appendChild(price_cell);

        const delete_button = document.createElement('td');
        const delete_icon = document.createElement('span');
        delete_icon.className = 'delete_icon bx bxs-trash-alt'; 
        delete_icon.setAttribute('onclick', `delete_item(${index})`); 
        delete_button.appendChild(delete_icon);
        row.appendChild(delete_button);

        item_list.appendChild(row); 
    });

    display_total.textContent = '₱' + total.toFixed(2);
    display_total.classList.add('total_price');
}

function delete_item(index) {
    shopping_cart.splice(index, 1);
    update_cart();
    updateCartIcon();
}

function checkout() {
    if (shopping_cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout');
        const shoppingCart = document.getElementById('shopping_cart');
        const placeOrder = document.getElementById('place_order');

        shoppingCart.classList.remove('active');
        placeOrder.classList.add('active');
    }
}

function remove_cart() {
    toggleCart();
}

function toggle_cardfields() {
    const pay_method = document.getElementById('pay_method').value;
    const name_on_card_row = document.getElementById('name_on_card_row');
    const card_num_row = document.getElementById('card_num_row');

    if (pay_method === 'Card') {
        name_on_card_row.style.display = 'table-row';
        card_num_row.style.display = 'table-row';
    } else {
        name_on_card_row.style.display = 'none';
        card_num_row.style.display = 'none';
    }
}

function display_success() {
    const full_name = document.getElementById("full_name").value;
    const mobile_num = document.getElementById("mobile_num").value;
    const address = document.getElementById("address").value;
    const pay_method = document.getElementById("pay_method").value;
    const name_on_card = document.getElementById("name_on_card").value;
    const card_num = document.getElementById("card_num").value;

    if (full_name.trim() === "" || mobile_num.trim() === "" || address.trim() === "") {
        alert("Please fill in all the required fields.");
    } else if (pay_method === "Card" && (name_on_card.trim() === "" || card_num.trim() === "")) {
        alert("Please provide valid card details.");
    } else {
        const placeOrder = document.getElementById('place_order');
        const displaySuccess = document.getElementById('display_success');
        const overlay = document.querySelector('.placeOrderOverlay');

        placeOrder.classList.remove('active');
        displaySuccess.classList.add('active');
        overlay.style.display = 'block';
    }
}

function successfully_ordered() {
    const placeOrder = document.getElementById('place_order');
    const displaySuccess = document.getElementById('display_success');
    const overlay = document.querySelector('.placeOrderOverlay');

    displaySuccess.classList.remove('active');
    placeOrder.classList.add('active');
    overlay.style.display = 'none';
    location.reload();
}


function back_to_cart() {
    const placeOrder = document.getElementById('place_order');
    placeOrder.classList.remove('active');
    document.getElementById('shopping_cart').classList.add('active'); 
}

