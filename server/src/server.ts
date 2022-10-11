import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { ConvertHoursToMinutes } from './tools/convert-hours-to-minutes';
import { ConvertMinutesToHours } from './tools/convert-minutes-to-hours';

const app = express();
const prisma = new PrismaClient();
// localhost:3333/ads

app.use(cors());
app.use(express.json());

//Rota para exibir os games
app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });

    return response.json(games);
});


//Rota para criar um ad
app.post('/games/:id/ads', async (request, response) => {


    const gameId: string = request.params.id;

    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: ConvertHoursToMinutes(body.hourStart),
            hourEnd: ConvertHoursToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad)
});


//Rota para exibir os anuncios do game específico
app.get('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc',
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: ConvertMinutesToHours(ad.hourStart),
            hourEnd: ConvertMinutesToHours(ad.hourEnd),
        }
    }));

});

app.listen(3333);