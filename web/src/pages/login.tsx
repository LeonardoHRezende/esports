import axios from "axios";
import { useEffect, useState } from 'react';

//images
import Logo from '../assets/logo-nlw-esports.svg';

//components
import LoginForm from '../components/LoginStep/LoginForm';
import Loading from '../components/Loading/Loading';


function Login() {

    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    return (
        loading ?
            <>
                <Loading />
            </> :
            <div className="flex min-h-screen flex-col items-center justify-center py-2">
                <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

                    <a href='/'><img src={Logo} alt="" /></a>

                    <LoginForm />

                </main>
            </div>
    )
}

export default Login
