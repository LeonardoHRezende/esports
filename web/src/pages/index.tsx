import '../styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

import axios from "axios";

import { GameBanner } from '../components/GameBanner';
import Loading from '../components/Loading/Loading';
import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/Form/CreateAdModal';

import Logo from '../assets/logo-nlw-esports.svg';


import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number
    }
}

function Home() {

    const [loading, setLoading] = useState<Boolean>(false)
    const [games, setGames] = useState<Game[]>([]);
    const name = sessionStorage.getItem('identify') ? sessionStorage.getItem('identify') : '';
    const navigate = useNavigate();

    useEffect(() => {

        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (

        name && loading ?
            <>
                <Loading />
            </> :
            <>


                <Header />

                <div className="max-w-[1344px] mx-auto flex flex-col items-center mb-20">
                    
                    ,<button onClick={()=> navigate('/') }><img src={Logo} alt="" /></button>

                    <h1 className="text-4xl text-white font-black text-center mt-20">
                        {name ? name : ''}
                    </h1>

                    <h1 className="text-6xl text-white font-black">
                        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
                    </h1>

                    <Swiper
                        className="grid grid-cols-6 gap-6 mt-16"
                        modules={[Navigation, Pagination, A11y]}
                        slidesPerView={6}
                        spaceBetween={15}
                        pagination={{ clickable: true }}
                        navigation
                        breakpoints={{
                            250: {
                                slidesPerView: 1
                            },
                            340: {
                                slidesPerView: 2
                            },
                            640: {
                                slidesPerView: 3
                            },
                            768: {
                                slidesPerView: 3
                            },
                            1024: {
                                slidesPerView: 4
                            },
                            1280: {
                                slidesPerView: 4
                            },
                            1344: {
                                slidesPerView: 6
                            },
                            1400: {
                                slidesPerView: 6
                            }
                        }}
                    >
                        {games.map(game => {
                            return (
                                <SwiperSlide className="relative rounded-lg overflow-hidden 2xl:mx-0 lg:ml-5 ml-5">
                                    <GameBanner
                                        id={game.id}
                                        key={game.id}
                                        bannerUrl={game.bannerUrl}
                                        title={game.title}
                                        adsCount={game._count.ads}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>

                    <Dialog.Root>
                        <CreateAdBanner />
                        <CreateAdModal />
                    </Dialog.Root>

                </div>

                <Footer />

            </>

    )
}

export default Home
