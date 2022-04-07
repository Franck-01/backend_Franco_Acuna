const socket = io();
let user;
const form = document.getElementById('formis');
const input = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');

const userLoged = {
    author: {}
}

const userInfo = async() => {
    const { value: formValues } = await new swal({
        title: 'Bienvenido',
        html: '<label>Cual es tu nombre?:</label>' +
            '<input id="name" class="swal2-input">' +
            '<label>Edad:</label>' +
            '<input id="age" class="swal2-input">' +
            '<label>Rango:</label>' +
            '<input id="rank" class="swal2-input">' +
            '<label>Tu facción:</label>' +
            '<input id="faction" class="swal2-input">' +
            '<label>nos faltaria un email:</label>' +
            '<input id="id" class="swal2-input">',
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
            userLoged.author.name = document.getElementById('name').value
            userLoged.author.age = document.getElementById('age').value
            userLoged.author.rank = document.getElementById('rank').value
            userLoged.author.faction = document.getElementById('faction').value
            userLoged.author.id = document.getElementById('id').value
        }
    })
    if (formValues) {
        console.log(formValues)
    }
}

userInfo()

input.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        socket.emit('message', {
            user: user,
            message: input.value.trim(),
        })
        userLoged.text = input.value.trim()
        socket.emit('userInfo', userLoged)
        input.value = "";
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(form)
    let info = {};
    formData.forEach((val, key) => info[key] = val);
    socket.emit('sentPrinc', info);
    form.reset();
})

socket.on('ChatLog', data => {
    console.log(data)
    const chatLog = document.getElementById('ChatLog');
    let messages = "";
    data.forEach(message => {
        messages += `
                    <div class="chatMessage">
                        <p class="email">${message.author.id}:</p>
                        <p class="time">${message.time}</p>
                        <p class="message">${message.text}</p>
                    </div>
                    `
    });
    chatLog.innerHTML = messages;
})

socket.on('princLog', data => {
    const champs = data.payload;
    const champsTemplate = document.getElementById('champsTemplate');
    fetch('templates/saveInfo.handlebars').then(res => {
        return res.text();
    }).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({
            champs
        });
        champsTemplate.innerHTML = html;
    })
})