# Testing and validation evidence
Fill in the results yourself and keep screenshots. Browsers named in the brief: Chrome, Firefox, Safari, Edge.

| # | Test | Expected result | Chrome | Firefox | Safari | Edge |
|---|------|-----------------|--------|---------|--------|------|
| 1 | Open index.html | Red header, dark navbar, 8 products with pictures, cart on the right | | | | |
| 2 | Click Add to cart | Green message; cart shows the item and total | | | | |
| 3 | Use + and - in the cart | Quantity changes; at 0 the item disappears | | | | |
| 4 | Type "milk" in the search box | Only milk shows | | | | |
| 5 | Click the Fruit, Dairy, Bakery links | Page jumps to that part | | | | |
| 6 | Make the window narrower than 700px | Columns stack; links hide behind the Menu button; button opens and closes them | | | | |
| 7 | Send the empty contact form | Three error messages with a warning symbol | | | | |
| 8 | Send the form filled in correctly | Confirmation message; form clears | | | | |
| 9 | Click Checkout with an empty cart | Red message says the cart is empty | | | | |
| 10 | Type `<b>hi</b>` in the search box | Treated as plain text; nothing runs (XSS check) | | | | |

Validators: W3C HTML (validator.w3.org), W3C CSS (jigsaw.w3.org/css-validator), WAVE (wave.webaim.org), Chrome Lighthouse.
