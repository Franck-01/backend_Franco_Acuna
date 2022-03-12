let carts;
fetch('/carts').then(result => result.json()).then(json => {
    carts = json.payload;
    let containerC = document.getElementById('cart-container');
    carts.forEach(cart => {
        let card = document.createElement('div');
        card.setAttribute('class', 'pilot-card');
        let name = document.createElement('p');
        name.setAttribute('class', 'pilot-text');
        name.innerHTML = cart.name;
        card.append(name);
        containerC.append(card);
    })
})
let formCart = document.getElementById('cartsForm');
const handlesubmit = (evt, formCart, route) => {
    evt.preventDefault();
    let formDate = new FormData(formCart);
    fetch(route, {
            method: "POST",
            body: formDate
        })
        .then(result => result.json()).then(json => console.log(json))
    formCart.reset();
}
formCart.addEventListener('submit', (e) => handlesubmit(e, e.target, '/carts'))

let products;
fetch('/products').then(result => result.json()).then(json => {
    products = json.payload;
    let container = document.getElementById('products-container');
    products.forEach(product => {
        let card = document.createElement('div');
        card.setAttribute('class', 'pilot-card');
        let name = document.createElement('p');
        name.setAttribute('class', 'pilot-text');
        name.innerHTML = product.name;
        let model = document.createElement('p');
        model.setAttribute('class', 'pilot-text');
        model.innerHTML = product.model;
        let description = document.createElement('p');
        description.setAttribute('class', 'pilot-text');
        description.innerHTML = product.description;
        let price = document.createElement('p');
        price.setAttribute('class', 'pilot-text');
        price.innerHTML = product.price;
        let URL_img = document.createElement('img');
        URL_img.src = product.URL_img;
        card.append(name);
        card.append(model);
        card.append(description);
        card.append(price);
        card.append(URL_img);
        container.append(card);
    })
})
let form = document.getElementById('productsForm');
const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
            method: "POST",
            body: formData
        })
        .then(result => result.json()).then(json => console.log(json))
    form.reset();
}
form.addEventListener('submit', (e) => handleSubmit(e, e.target, '/products'))