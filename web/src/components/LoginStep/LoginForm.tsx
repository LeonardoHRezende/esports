import { useState } from "react";

//firebase
import { auth } from "../../pages/api/firebase"
import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

//icons
import { FcGoogle } from "react-icons/fc";
import { GrHomeRounded } from "react-icons/gr";


export default function LoginForm() {

    const [step, setStep] = useState<Number>(3);
    //STEP 1 USUÁRIO E SENHA (LOGIN)
    //STEP 2 COMPLETAR CADASTRO
    //STEP 3 ESQUECEU A SENHA
    //STEP 4 CADASTRAR

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState<String>();
    const [discord, setDiscord] = useState<String>();

    //FUNÇÃO PARA MUDAR O ESTADO DO STEP
    function changeStep() {

    }


    //FUNÇÃO PARA REALIZAR LOGIN COM O GOOGLE
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

    //FUNÇÃO PARA REALIZAR LOGIN COM E-MAIL E SENHA
    function handleSignIn() {
        event?.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error.response)
            });
    }

    //FUNÇÃO PARA SE CADASTRAR COM E-MAIL E SENHA
    function handleSignUp() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error.response)
            });
    }

    //FUNÇÃO PARA RECUPERAR SENHA
    function handleRecovery() {
    }

    return (
        <>
            <h1 className="text-white py-6 text-2xl font-bold text-center">
                {
                    step == 2 ? "Complete seu cadastro para encontrar seu duo!"
                        :
                        step == 3 ? "Redefinição de senha"
                            :
                            step == 4 ? "Cadastre-se para encontrar seu duo!"
                                :
                                "Entre para encontrar seu duo!"
                }
            </h1>

            <form className="mt-8 bg-[#2A2634] p-5 rounded-lg text-white sm:min-w-[460px]">

                {
                    step == 1 ?
                        //LOGIN
                        <>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 text-start">
                                    <label htmlFor="email">
                                        E-mail (usuário)
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Digite seu e-mail"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
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
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" />
                                </div>

                                <div className="text-sm text-start text-violet-500">
                                    <a onClick={() => setStep(3)}>
                                        Esqueceu sua senha?
                                    </a>
                                </div>

                                <button type="button"
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700"
                                    onClick={() => changeStep()}>
                                    Encontrar Duo
                                </button>

                                <button type="button"
                                    className="bg-white text-gray-800 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-gray-300 hover:text-black"
                                    onClick={() => handleGoogleSignIn()}>
                                    <FcGoogle size={20} />
                                    Entrar com o Google
                                </button>

                                <div className="flex flex-row gap-1 text-sm justify-center items-center">
                                    <p>Precisando de uma conta?</p>
                                    <a className="text-violet-500 hover:cursor-pointer" onClick={() => setStep(4)}>Cadastre-se agora</a>
                                </div>
                            </div>

                        </>
                        :
                        //COMPLETAR CADASTRO
                        step == 2 ?
                            <>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2 text-start">
                                        <label htmlFor="name">
                                            Seu nome (ou nickname)
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Como te chamam dentro do game?"
                                            value={email}
                                            onChange={(event) => setName(event.target.value)}
                                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 text-start">
                                        <label htmlFor="discord">
                                            Qual seu Discord?
                                        </label>
                                        <input
                                            id="discord"
                                            name="discord"
                                            type="text"
                                            placeholder="Usuário#0000"
                                            value={email}
                                            onChange={(event) => setName(event.target.value)}
                                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                        />
                                    </div>

                                    <button type="button"
                                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700"
                                        onClick={() => handleSignIn()}>
                                        Finaizar meu cadastro
                                    </button>

                                </div>

                            </>
                            :
                            step == 3 ?

                                <>
                                    <div className="flex flex-col gap-4">
                                        <div className="text-white">
                                            <GrHomeRounded />
                                        </div>
                                        <div className="flex flex-col gap-2 text-start">
                                            <label htmlFor="email">
                                                E-mail (usuário)
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Digite seu e-mail"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-sm">
                                                Digite seu e-mail cadastro, para receber um link de recuperação de conta.
                                            </p>
                                        </div>


                                        <button type="button"
                                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700"
                                            onClick={() => changeStep()}>
                                            Recuperar Senha
                                        </button>
                                    </div>

                                </>
                                :
                                step == 4 ?
                                    <>

                                    </>
                                    :
                                    <>

                                    </>
                }

            </form>
        </>
    )
}