import '../styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';

import axios from "axios";

import { GameBanner } from '../components/GameBanner';

import Logo from '../assets/logo-nlw-esports.svg';
import { useEffect, useState } from 'react';
import { CheckCircle, GameController, X } from 'phosphor-react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useLocation, useParams } from 'react-router-dom';

interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number
    }
}

interface Ads {
    id: string,
    name: string,
    discord: string,
    weekDays: Array<[]>,
    useVoiceChannel: boolean,
    yearsPlaying: number,
    hourEnd: string,
    hourStart: string
}


function Ads() {

    const { id } = useParams();

    const [game, setGame] = useState<Game[]>([]);
    const [ads, setAds] = useState<Ads[]>([]);

    const bannerUrl = sessionStorage.getItem('banneUrl') ? sessionStorage.getItem('banneUrl') : null;
    const title = sessionStorage.getItem('title')

    useEffect(() => {
        axios.get(`http://localhost:3333/games/${id}/ads`)
            .then(response => {
                setAds(response.data)
            })
    }, [])

    return (
        <>
            <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
                <img src={Logo} alt="" />

                <div className="grid grid-cols-2 mt-20 justify-center">

                    <div className="relative rounded-lg overflow-hidden max-w-[208px] max-h-[280px]">

                        <GameBanner
                            bannerUrl={bannerUrl}
                            title={title}
                            adsCount={4}
                        />

                    </div>

                    <div>

                        <h1 className="font-bold text-2xl text-white mt-10">Econtre seu duo!</h1>
                        <p className="font-bold text-2xl text-white mt-14">League of Legends</p>
                        <p className="text-zinc-500"><span className="font-semibold text-white">rezeONE</span> Conecte-se e comece a jogar!</p>

                    </div>
                </div>

                <Dialog.Root>


                    <Swiper
                        className="grid grid-cols-6 gap-6 mt-16"
                        modules={[Navigation, Pagination, A11y]}
                        slidesPerView={6}
                        spaceBetween={15}
                        pagination={{ clickable: true }}
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
                        }}
                    >
                        {ads.map((Anuncios, index) => {
                            return (
                                <>
                                    <SwiperSlide
                                        className="relative rounded-lg overflow-hidden 2xl:mx-0 lg:ml-5 ml-5"
                                        key={index}>
                                            
                                        <div className="bg-[#2A2634] p-8 text-white rounded-lg shadow-lg shadow-black/25 py-5 flex flex-col gap-3">

                                            <div className="">
                                                <p className="text-sm text-zinc-400">Nome</p>
                                                <p className="text-sm font-semibold">{Anuncios.name}</p>
                                            </div>

                                            <div className="">
                                                <p className="text-sm text-zinc-400">Tempo de jogo</p>
                                                <p className="text-sm font-semibold">{Anuncios.yearsPlaying > 1 ? `${Anuncios.yearsPlaying} anos` : `${Anuncios.yearsPlaying} ano`}</p>
                                            </div>

                                            <div className="">
                                                <p className="text-sm text-zinc-400">Disponibilidade</p>
                                                <p className="text-sm font-semibold">{Anuncios.weekDays.length} dias {Anuncios.hourStart}h - {Anuncios.hourEnd}h</p>
                                            </div>

                                            <div className="">
                                                <p className="text-sm text-zinc-400">Chamada de áudio?</p>
                                                <p className={`text-sm font-semibold ${Anuncios.useVoiceChannel ? 'text-emerald-400' : 'text-red-400'}`}>{Anuncios.useVoiceChannel ? "Sim" : "Não"}</p>
                                            </div>

                                            <Dialog.Trigger
                                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-700">
                                                <GameController size={50} />
                                                Conectar
                                            </Dialog.Trigger>

                                        </div>
                                    </SwiperSlide>
                                </>
                            )
                        })}

                    </Swiper>

                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/60 inset-0 fixed z-40">
                            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-[430px] shadow-lg shadow-black/25">

                                <div className="flex flex-row justify-end">
                                    <Dialog.Close>  <X /> </Dialog.Close>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="">
                                        <CheckCircle className="text-emerald-400" size={64} />
                                    </div>

                                    <div className="">
                                        <p className="text-2xl font-semibold">Let's play!</p>
                                    </div>

                                    <div className="">
                                        <p className="text-sm text-zinc-400">Agora é só começar a jogar!</p>
                                    </div>

                                    <div className="">
                                        <p className="text-sm font-semibold">Adicione no Discord</p>
                                    </div>

                                    <div className="bg-zinc-900 py-3 px-4 rounded">

                                        <p className="font-semibold text-sm">rezeone#273</p>

                                    </div>
                                </div>

                            </Dialog.Content>
                        </Dialog.Overlay>
                    </Dialog.Portal>
                </Dialog.Root>

            </div>

        </>
    )
}

export default Ads
