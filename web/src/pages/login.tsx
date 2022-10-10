import { useState } from "react";

//firebase
import { auth } from "./api/firebase"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

//icons
import { FcGoogle } from "react-icons/fc";

//images
import Logo from '../assets/logo-nlw-esports.svg';


function Login() {

    const [step, setStep] = useState<Number>(0);


    function handleGoogleSignIn() {
        event?.preventDefault();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

                <img src={Logo} alt="" />

                <h1 className="text-white py-6 text-2xl font-bold text-center">Faça seu Cadastro <br></br>para encontrar seu duo!</h1>

                <form className="mt-8 bg-[#2A2634] p-5 rounded-lg text-white sm:min-w-[460px]">

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 text-start">
                            <label htmlFor="email">
                                E-mail (usuário)
                            </label>
                            <input
                                id="email" name="email" type="email" placeholder="Digite seu e-mail"
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2 text-start">
                            <label htmlFor="password">
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="******"
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" />
                        </div>

                        <button type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700">
                            Encontrar Duo
                        </button>

                        <div>
                            Ou
                        </div>

                        <button type="submit"
                            className="bg-white text-gray-800 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-gray-300 hover:text-black"
                            onClick={() => handleGoogleSignIn()}>
                            <FcGoogle size={20} />
                            Entrar com o Google
                        </button>
                    </div>

                </form>
            </main>
        </div>
    )
}

export default Login
