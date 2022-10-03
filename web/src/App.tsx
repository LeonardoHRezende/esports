import './styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';

import axios from "axios";

import { GameController, MagnifyingGlassPlus } from 'phosphor-react';
import { GameBanner } from './components/GameBanner';

import Logo from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { Input } from './components/Form/input';
import { CreateAdModal } from './components/Form/CreateAdModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}


function App() {


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

        <h1 className="text-6xl text-white font-black mt-20">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
        </h1>

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
              slidesPerView: 6
            },
          }}
        >
          {games.map(game => {
            return (
              <SwiperSlide className="relative rounded-lg overflow-hidden 2xl:mx-0 lg:ml-5 ml-5">
                <GameBanner
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

    </>
  )
}

export default App
