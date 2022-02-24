let pilots;
fetch('/pilots').then(result => result.json()).then(json => {
    pilots = json.payload;
    let container = document.getElementById('pilot-container');
    pilots.forEach(pilot => {
        let card = document.createElement('div');
        card.setAttribute('class', 'pilot-card');
        let name = document.createElement('p');
        name.setAttribute('class', 'pilot-text');
        name.innerHTML = pilot.name;
        let img = document.createElement('img');
        img.src = pilot.thumbnail;
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
form.addEventListener('submit', (e) => handleSubmit(e, e.target, '/pilots'))