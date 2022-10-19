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

import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import Header from '../components/Header/Header';

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
    hourStart: string,
    isActive: boolean
}


function Ads() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ads, setAds] = useState<Ads[]>([]);
    const [loading, setLoading] = useState<Boolean>(false)
    const [discord, setDiscord] = useState('');
    const identify = sessionStorage.getItem('identify') ? sessionStorage.getItem('identify') : '';
    const [adId, setAdId] = useState('');

    const bannerUrl = sessionStorage.getItem('bannerUrl') ? sessionStorage.getItem('bannerUrl') : '';
    const title = sessionStorage.getItem('title') ? sessionStorage.getItem('title') : '';
    const adsCount = sessionStorage.getItem('adsCount') ? sessionStorage.getItem('adsCount') : '1';
    const adCount = parseInt(adsCount ? adsCount : '1');

    function deleteLogico() {
        axios.put(`http://localhost:3333/games/${adId}/ads`)
            .then(response => {

                console.log(response.data)
            })

    }

    function conectar(Anuncio: Ads) {
        setDiscord(Anuncio.discord)
        setAdId(Anuncio.id)

    }


    useEffect(() => {

        axios.get(`http://localhost:3333/games/${id}/ads`)
            .then(response => {

                setAds(response.data)
                console.log(response.data)
            })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (

        identify && loading ?
            <>
                <Loading />
            </> :

            <>
                {ads.length < 1 ?

                    <>


                        <Header />
                        <div className="max-w-[1344px] mx-auto flex flex-col items-center mb-20">
                            <button onClick={() => navigate('/')}><img src={Logo} alt="" /></button>

                            <div className="flex flex-col mt-20 justify-center items-center md:flex-row md:gap-10">

                                <div className="relative rounded-lg overflow-hidden max-w-[208px] max-h-[280px]">

                                    <GameBanner
                                        id={id ? id : ''}
                                        bannerUrl={bannerUrl ? bannerUrl : ''}
                                        title={title ? title : ''}
                                        adsCount={adCount ? adCount : 1}
                                    />

                                </div>

                                <div className="flex flex-col mt-20 justify-center items-center md:flex-row md:gap-10">
                                    <div>
                                        <h1 className="font-bold text-2xl text-white mt-10"><span className="font-semibold text-white">{identify ? identify : ''}</span> não encontramos nenhum anúncio para esse game.</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row justify-center items-center mt-10">
                                <button
                                    className="self-end max-w-[200px] px-4 py-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3 mt-5 md:mt-0"
                                    onClick={() => window.location.href = "/"}>
                                    Voltar para o ínicio
                                </button>
                            </div>

                        </div>
                    </>
                    :

                    <>
                        <Header />
                        <div className="max-w-[1344px] mx-auto flex flex-col items-center mb-20">
                            <button onClick={() => navigate('/')}><img src={Logo} alt="" /></button>

                            <div className="flex flex-col mt-20 justify-center items-center md:flex-row md:gap-10">

                                <div className="relative rounded-lg overflow-hidden max-w-[208px] max-h-[280px]">

                                    <GameBanner
                                        id={id ? id : ''}
                                        bannerUrl={bannerUrl ? bannerUrl : ''}
                                        title={title ? title : ''}
                                        adsCount={adCount ? adCount : 1}
                                    />

                                </div>

                                <div>

                                    <h1 className="font-bold text-2xl text-white mt-10">Econtre seu duo!</h1>
                                    <p className="font-bold text-2xl text-white mt-14">{title ? title : ''}</p>
                                    <p className="text-zinc-500"><span className="font-semibold text-white">{identify ? identify : ''}</span> Conecte-se e comece a jogar!</p>

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
                                            slidesPerView: 1
                                        },
                                        640: {
                                            slidesPerView: 2
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
                                    {ads.map((Anuncio, index) => {
                                        return (

                                            <>

                                                {
                                                    Anuncio && Anuncio.isActive ?
                                                        <SwiperSlide
                                                            className="relative rounded-lg overflow-hidden 2xl:mx-0 lg:ml-5 ml-5 max-w-[220px]"
                                                            key={index}>

                                                            <div className="bg-[#2A2634] p-8 text-white rounded-lg shadow-lg shadow-black/25 py-5 flex flex-col gap-3">

                                                                <div className="">
                                                                    <p className="text-sm text-zinc-400">Nome</p>
                                                                    <p className="text-sm font-semibold">{Anuncio.name}</p>
                                                                </div>

                                                                <div className="">
                                                                    <p className="text-sm text-zinc-400">Tempo de jogo</p>
                                                                    <p className="text-sm font-semibold">{Anuncio.yearsPlaying > 1 ? `${Anuncio.yearsPlaying} anos` : `${Anuncio.yearsPlaying} ano`}</p>
                                                                </div>

                                                                <div className="">
                                                                    <p className="text-sm text-zinc-400">Disponibilidade</p>
                                                                    <p className="text-sm font-semibold">{Anuncio.weekDays.length} dias {Anuncio.hourStart}h - {Anuncio.hourEnd}h</p>
                                                                </div>

                                                                <div className="">
                                                                    <p className="text-sm text-zinc-400">Chamada de áudio?</p>
                                                                    <p className={`text-sm font-semibold ${Anuncio.useVoiceChannel ? 'text-emerald-400' : 'text-red-400'}`}>{Anuncio.useVoiceChannel ? "Sim" : "Não"}</p>
                                                                </div>

                                                                <Dialog.Trigger
                                                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-700"
                                                                    onClick={() => conectar(Anuncio)}>
                                                                    <GameController size={50} />
                                                                    Conectar
                                                                </Dialog.Trigger>

                                                            </div>
                                                        </SwiperSlide>
                                                        :
                                                        <>
                                                        </>
                                                }

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
                                                    <p className="font-semibold text-sm">{discord ? discord : ''}</p>
                                                </div>

                                                
                                            <button
                                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-700"
                                                onClick={() => deleteLogico()}>
                                                <GameController size={30} />
                                                Jogar
                                            </button>
                                            </div>

                                        </Dialog.Content>
                                    </Dialog.Overlay>
                                </Dialog.Portal>
                            </Dialog.Root>

                        </div>
                    </>

                }
            </>
    )
}

export default Ads
