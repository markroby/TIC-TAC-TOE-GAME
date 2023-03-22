if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// lazm ykon el text is more than 0 
//by3ml el 3malya el 7sabya

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
// lazm eb2a fy 7aga fy text
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
        }

        function connect() {
            var balloon = shopItem.getElementsByClassName('shop-item-title')[0].innerText
            var flower = shopItem.getElementsByClassName('shop-item-title')[1].innerText
            var drink = shopItem.getElementsByClassName('shop-item-title')[2].innerText
            var accessories = shopItem.getElementsByClassName('shop-item-title')[3].innerText
            var car = shopItem.getElementsByClassName('shop-item-title')[4].innerText
            var chair = shopItem.getElementsByClassName('shop-item-title')[5].innerText
            var cake = shopItem.getElementsByClassName('shop-item-title')[6].innerText
            var DJ = shopItem.getElementsByClassName('shop-item-title')[7].innerText
            var desert = shopItem.getElementsByClassName('shop-item-title')[8].innerText
            var place = shopItem.getElementsByClassName('shop-item-title')[9].innerText

            // ==================================================
            //================= connections =====================
            //===================================================
            var mysql = require('mysql');
            var con = mysql.createConnection({
                host: "localhost",
                usre: "root",
                password: "",
                database: "7ahflamar"
            });

            con.connect(function (err) {
                if (err) throw err;
                var sql = "insert into Event (Balloon,Flower,Drink,Accessories, Car,Chair,Cake,DJ,Desert,Place ) values ('" + balloon + "','" + flower + "','" + drink + "','" + accessories + "','" + car + "','" + chair + "','" + cake + "','" + DJ + "','" + desert + "','" + place + "',)"
                con.query(sql, function (err, result) {
                    if (err) throw err
                })
            })

        }
    }
    var name = document.getElementsByName('')


    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// by5ly el output e3ml round bya5d mn ba3d el point 2 decmal
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total


    // insert total price to database
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        usre: "root",
        password: "",
        database: "7ahflamar"
    });

    con.connect(function (err) {
        if (err) throw err;
        var sql = "insert into Event (Total) values ('" + total + "')"
        con.query(sql, function (err, result) {
            if (err) throw err
        })
    })
}