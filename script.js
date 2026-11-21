// ============================================================
// script.js - what the page DOES
// Written with simple "var" variables and plain functions (W3Schools, n.d.-b, n.d.-g).
//
// SECURITY NOTE:I use textContentinstead of innerHTML, when I puttext on the page.
// textContent treats everything as plain text, so typed code cannot run (XSS)
// (MDN Web Docs, n.d.-a; OWASP, n.d.).
// ============================================================


// ------------------------------------------------------------
// 1. THE CART
// ------------------------------------------------------------

// The cart is a list. Each item looks like { name: "Milk (2L)", price: 3.2, quantity: 2 }
var cart = [];


// ------------------------------------------------------------
// 2. THE MESSAGE BOX
// ------------------------------------------------------------
var messageTimer;

function showMessage(text, isError) {
  var box = document.getElementById("status");   // find the message box (W3Schools, n.d.-g)
  box.textContent = text;                         //put the words in it

  if (isError) {
    box.className = "error-message";              // dark red for a problem
  } else {
    box.className = "";                           // normal green
  }

  clearTimeout(messageTimer);                     // stop any old timer
  messageTimer = setTimeout(function () {
    box.textContent = "";                         // empty the box after 4 seconds so it disappears
  }, 4000);
}


// ------------------------------------------------------------
// 3. ADD TO CART  (runs when an "Add to cart" button is clicked)
// ------------------------------------------------------------
function addToCart(name, price) {
  var found = false;

  // checkk if the prodcut is already in the cart 
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].quantity = cart[i].quantity + 1;    // already there, so add one more
      found = true;
    }
  }

  // not in the cart yet, so add it as a new item
  if (found === false) {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  showCart();
  showMessage(name + " added to cart.", false);
}


// ------------------------------------------------------------
// 4. REMOVE FROM CART
// ------------------------------------------------------------
function changeQuantity(name, amount) {
  var newCart = [];

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].quantity = cart[i].quantity + amount;
    }
    // only keep items that still have 1 or more. An item at 0 is dropped (removed).
    if (cart[i].quantity > 0) {
      newCart.push(cart[i]);
    }
  }

  cart = newCart;
  showCart();
}


// ------------------------------------------------------------
// 5. MAKE A SMALL BUTTON FOR THE CART
// ------------------------------------------------------------
function makeSmallButton(symbol, wordsForScreenReader, name, amount) {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "small-button";
  button.textContent = symbol;
  button.setAttribute("aria-label", wordsForScreenReader + " " + name);   // a full description for screen readers
  button.addEventListener("click", function () {
    changeQuantity(name, amount);
  });
  return button;
}


// ------------------------------------------------------------
// 6. SHOW THE CART ON THE PAGE
// ------------------------------------------------------------
function showCart() {
  var list = document.getElementById("cart-list");
  list.textContent = "";                          // empty the list first
  var total = 0;

  // if there is nothing in the cart, say so
  if (cart.length === 0) {
    var emptyItem = document.createElement("li");
    emptyItem.textContent = "Your cart is empty.";
    list.appendChild(emptyItem);
  }

  // make one list line for each item
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total = total + item.price * item.quantity;

    var line = document.createElement("li");
    line.textContent = item.name + " x" + item.quantity + " ";
    line.appendChild(makeSmallButton("-", "Decrease quantity of", item.name, -1));
    line.appendChild(makeSmallButton("+", "Increase quantity of", item.name, 1));
    list.appendChild(line);
  }

  document.getElementById("cart-total").textContent = "$" + total.toFixed(2);   // toFixed(2) = 2 decimal places
}


// ------------------------------------------------------------
// 7. CHECKOUT (demo only)
// ------------------------------------------------------------
function checkout() {
  if (cart.length === 0) {
    showMessage("Your cart is empty.", true);
    return;
  }

  cart = [];                                      // empty the cart
  showCart();
  showMessage("Order placed. Thank you!", false);
}


// ------------------------------------------------------------
// 8. SEARCH (idea from W3Schools, n.d.-m)
// Hide every product card whose name does not contain the typed words.
// ------------------------------------------------------------
function searchProducts() {
  var typed = document.getElementById("search").value.toLowerCase();
  var cards = document.getElementsByClassName("card");
  var shown = 0;

  for (var i = 0; i < cards.length; i++) {
    var name = cards[i].getElementsByTagName("h3")[0].textContent.toLowerCase();

    if (name.indexOf(typed) > -1) {
      cards[i].style.display = "";                // show the card
      shown = shown + 1;
    } else {
      cards[i].style.display = "none";            // hide the card
    }
  }

  // show the "No products found" line only when nothing matches
  document.getElementById("no-results").hidden = (shown > 0);
}


// ------------------------------------------------------------
// 9. MENU BUTTON FOR SMALL SCREENS (pattern from W3Schools, n.d.-l)
// Adds or removes the word "responsive" on the navbar. 
// ------------------------------------------------------------
function toggleMenu() {
  var navbar = document.getElementById("navbar");
  var button = document.getElementById("menu-button");

  if (navbar.className === "navbar") {
    navbar.className = "navbar responsive";       // open
    button.setAttribute("aria-expanded", "true");  // tells screen readers the menu is open (MDN Web Docs, n.d.-g)
  } else {
    navbar.className = "navbar";                  // closed
    button.setAttribute("aria-expanded", "false");
  }
}


// ------------------------------------------------------------
// 10. CONTACT FORM CHECKS (idea from W3Schools, n.d.-b)
// ------------------------------------------------------------

// Show an error under a box and mark the box as wrong
function showFieldError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).setAttribute("aria-invalid", "true");
}

// Remove an error
function clearFieldError(id) {
  document.getElementById(id + "-error").textContent = "";
  document.getElementById(id).setAttribute("aria-invalid", "false");
}

function checkContactForm() {
  var name = document.getElementById("c-name").value.trim();
  var email = document.getElementById("c-email").value.trim();
  var message = document.getElementById("c-message").value.trim();
  var allGood = true;

  // Check the name: at least 2 letters
  if (name.length < 2) {
    showFieldError("c-name", "Enter your full name.");
    allGood = false;
  } else {
    clearFieldError("c-name");
  }

  // Check the email: needs an @ and a dot after it (a simple check that only looks at the shape)
  var atPosition = email.indexOf("@");
  var dotPosition = email.lastIndexOf(".");
  if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition >= email.length - 1) {
    showFieldError("c-email", "Enter a valid email, like name@example.com.");
    allGood = false;
  } else {
    clearFieldError("c-email");
  }

  // Check the message: at least 10 letters
  if (message.length < 10) {
    showFieldError("c-message", "Write at least 10 characters.");
    allGood = false;
  } else {
    clearFieldError("c-message");
  }

  // SECURITY NOTE: these checks help the user. A real server must check the data again,
  // because anyone can skip the checks in their own browser.
  if (allGood) {
    document.getElementById("contact-form").reset();
    showMessage("Message sent. We will reply by email.", false);
  }

  return false;   // false stops the page from reloading
}


// ------------------------------------------------------------
// 11. START: draw the empty cart when the page loads
// ------------------------------------------------------------
showCart();
