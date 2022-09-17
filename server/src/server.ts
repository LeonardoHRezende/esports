import express from 'express'

const app = express()

// localhost:3333/ads


//Rota para exibir os games
app.get('/games', (request, response)=>{
    return response.json([]);
});


//Rota para criar um ad
app.post('/ads', (request, response)=>{
    return response.status(201).json([])
})


//Rota para exibir os anuncios do game específico
app.get('/games/:id/ads', (request, response) => {

    const gameId = request.params.id;

    return response.send(gameId)

    return response.json([
        {
            id: 1,
            name: 'Anuncio 1'
        },
        {
            id: 2,    
            name: 'Anuncio 2'  
        },
        {
            id: 3,
            name: 'Anuncio 3'
        },
        {
            id: 4,
            name: 'Anuncio 4'
        }
    ])
    
});


//Rota para capturar e exibir id do discord
app.get('/ads/:id/discord', (request, response) => {

    const adId = request.params.id;

    return response.send(adId)

    return response.json([
        {
            id: 1,
            name: 'Anuncio 1'
        },
        {
            id: 2,    
            name: 'Anuncio 2'  
        },
        {
            id: 3,
            name: 'Anuncio 3'
        },
        {
            id: 4,
            name: 'Anuncio 4'
        }
    ])
    
});

app.listen(3333);