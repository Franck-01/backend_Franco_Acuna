let products;
fetch('/products').then(result => result.json()).then(json => {
    products = json.payload;
    let container = document.getElementById('pilot-container');
    products.forEach(product => {
        let card = document.createElement('div');
        card.setAttribute('class', 'pilot-card');
        let name = document.createElement('p');
        name.setAttribute('class', 'pilot-text');
        name.innerHTML = product.name;
        let img = document.createElement('img');
        img.src = product.thumbnail;
        card.append(name);
        card.append(img);
        container.append(card);
    })
})


let form = document.getElementById('pilotForm');
const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData
    }).then(result => result.json()).then(json => console.log(json))
    form.reset();
}
form.addEventListener('submit', (e) => handleSubmit(e, e.target, '/products'))