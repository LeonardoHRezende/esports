import '../styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';

import axios from "axios";

import { GameBanner } from '../components/GameBanner';

import Logo from '../assets/logo-nlw-esports.svg';
import { useEffect, useState } from 'react';
import { getRandomValues } from 'crypto';

interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number
    }
}


function Ads() {


    const [games, setGames] = useState<Game[]>([]);


    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])

    return (
        <>
            <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
                <img src={Logo} alt="" />

                <h1 className="text-4xl text-white font-black text-center mt-20">
                    rezeONE
                </h1>

                <h1 className="text-6xl text-white font-black">
                    Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
                </h1>


                <GameBanner
                    key={games[0].id}
                    bannerUrl={games[0].bannerUrl}
                    title={games[0].title}
                    adsCount={games[0]._count.ads}
                />


            </div>

        </>
    )
}

export default Ads
