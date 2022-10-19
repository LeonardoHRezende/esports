import '../styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import axios from "axios";


import Loading from '../components/Loading/Loading';
import Logo from '../assets/logo-nlw-esports.svg';


import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import { FloppyDisk, NotePencil } from 'phosphor-react';

import Swal from 'sweetalert2'




function User() {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    const [loading, setLoading] = useState<Boolean>(false)

    const [name, setName] = useState(sessionStorage.getItem('identify') ? sessionStorage.getItem('identify') : '');
    const [discord, setDiscord] = useState(sessionStorage.getItem('discordUser') ? sessionStorage.getItem('discordUser') : '');
    const [edit, setEdit] = useState<Boolean>(false);

    function saveEdit() {

        if (!discord) {

            Toast.fire({
                icon: 'warning',
                title: 'Digite seu Discord'
            })

        }
        else if (!name) {

            Toast.fire({
                icon: 'warning',
                title: 'Digite seu Nick'
            })

        }
        else {

            Swal.fire({
                text: 'Você tem certeza que quer editar seu usuário?',
                icon: 'warning',
                confirmButtonColor: '#67E0B3',
                confirmButtonText: 'Salvar Edição'
            }).then((result) => {
                if (result.isConfirmed) {

                }
            })

        }

    }

    useEffect(() => {

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

                <div className="max-w-[1344px] min-h-screen mx-auto flex flex-col items-center mb-20">
                    <a href='/'><img src={Logo} alt="" /></a>



                    <form className="bg-[#2A2634] p-5 rounded-lg text-white sm:min-w-[460px] mt-14">
                        <div className="flex flex-col gap-4">

                            <h1 className="text-2xl text-white font-semibold text-center">
                                Edite seu usuário
                            </h1>

                            <div className="flex flex-col gap-2 text-start">
                                <label htmlFor="email">
                                    Discord User
                                </label>
                                <input
                                    id="discord"
                                    name="discord"
                                    type="text"
                                    value={discord ? discord : ''}
                                    onChange={(event) => { setDiscord(event.target.value) }}
                                    className={edit ? `bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500` : `bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 opacity-50`}
                                    disabled={edit ? false : true}
                                />
                            </div>

                            <div className="flex flex-col gap-2 text-start">
                                <label htmlFor="email">
                                    Nickname
                                </label>
                                <input
                                    id="nickname"
                                    name="nickname"
                                    type="text"
                                    value={name ? name : ''}
                                    onChange={(event) => setName(event?.target.value)}
                                    className={edit ? `bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500` : `bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 opacity-50`} disabled={edit ? false : true}
                                />
                            </div>

                            <div className="flex flex-row justify-center gap-3">
                                <button type="button"
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700"
                                    onClick={() => setEdit(true)}>
                                    <NotePencil /> Editar
                                </button>

                                <button type="button"
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700"
                                    onClick={() => saveEdit()}>
                                    <FloppyDisk /> Salvar
                                </button>
                            </div>


                        </div>


                    </form>
                </div>


                <Footer />

            </>

    )
}

export default User
