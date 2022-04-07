import { schema, normalize, denormalize } from "normalizr"

const blog = {
    id: "1",
    title: "Titulo de la publicacion",
    description: "Description de la publicacion",
    content: "Hola esta publicacion fue mia",
    author: {
        id: "1",
        name: "John"
    },
    comments: [{
            id: "1",
            author: "Alejandro",
            content: "¡Cheto el post!"
        },
        {
            id: "2",
            author: "Leandro",
            content: "Algo burdo, pero bueno"
        }
    ]
}

//Normalizacion
const author = new schema.Entity("authors")
const comment = new schema.Entity("comments")
const blogSchema = new schema.Entity("blog", {
    author: author,
    comments: [comment]
})

const normalizedData = normalize(blog, blogSchema)
    //console.log(JSON.stringify(normalizedData, null, "\t"))

//Desnormalizacion
const normalData = denormalize(normalizedData.result, blogSchema, normalizedData.entities)
console.log(normalData)