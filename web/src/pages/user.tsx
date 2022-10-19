import '../styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import axios from "axios";


import Loading from '../components/Loading/Loading';
import Logo from '../assets/logo-nlw-esports.svg';


import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';



function User() {

    const [loading, setLoading] = useState<Boolean>(false)
    const name = sessionStorage.getItem('identify') ? sessionStorage.getItem('identify') : '';

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

                    <h1 className="text-6xl text-white font-semibold mt-10">
                        Usuário 
                    </h1>
                </div>

                <Footer />
                
            </>

    )
}

export default User
