import { useState } from "react";
import { useNavigate } from "react-router-dom";

//firebase
import { auth } from "../../pages/api/firebase"
import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

//icons
import { FcGoogle } from "react-icons/fc";
import { AiFillHome } from "react-icons/ai";

//alerts
import Swal from 'sweetalert2'
import verificaUser from "../../helpers/verificaUser";
import criaUser from "../../helpers/criaUser";


export default function LoginForm() {

    const navigate = useNavigate();

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

    const [step, setStep] = useState<Number>(1);
    //STEP 1 USUÁRIO E SENHA (LOGIN)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //STEP 2 COMPLETAR CADASTRO
    const [name, setName] = useState('');
    const [discord, setDiscord] = useState('');
    //STEP 3 ESQUECEU A SENHA

    //STEP 4 CADASTRAR
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [idGoogle, setIdGoogle] = useState('');

    //FUNÇÃO PARA REALIZAR LOGIN COM O GOOGLE
    function handleGoogleSignIn() {
        event?.preventDefault();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)

            .then(async (result) => {

                Toast.fire({
                    icon: 'success',
                    title: 'Login efetuado com suceso!'
                })

                //RECEBE O UUID DA CONTA GOOGLE
                const uuid = result.user && result.user.uid ? result.user.uid : '';

                //SETA O ESTADO DO ID DA CONTA GOOGLE COM O VALOR RECEBIDO
                setIdGoogle(uuid)

                //VERIFICA SE O USUARIO JA ESTÁ NA BASE E ESTÁ COMPLETO
                const userGoogle = await verificaUser(uuid);

                if (userGoogle.props.dados && userGoogle.props.dados.users) {

                    const user = userGoogle.props.dados.users[0]

                    sessionStorage.setItem('discordUser', user.discordUser)
                    sessionStorage.setItem('identify', user.nickName)

                    navigate('/');
                }

                else {
                    setStep(2);
                }


            })
            .catch((error) => {

                Toast.fire({
                    icon: 'error',
                    title: 'Um erro inesperado aconteceu!'
                })
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

    //FUNÇÃO PARA RECUPERAR SENHA
    async function handleCompleteRegister() {

        const dados = {
            "idGoogle": idGoogle,
            "discordUser": discord,
            "nickName": name
        }

        const completarRegistro = await criaUser(dados)

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
                                    onClick={() => handleGoogleSignIn()}>
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
                                            value={name}
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
                                            value={discord}
                                            onChange={(event) => setDiscord(event.target.value)}
                                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                        />
                                    </div>

                                    <button type="button"
                                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700"
                                        onClick={() => handleCompleteRegister()}>
                                        Finaizar meu cadastro
                                    </button>

                                </div>

                            </>
                            :
                            //RECUPERAR CONTA
                            step == 3 ?

                                <>
                                    <div className="flex flex-col gap-4">
                                        <div className="text-white">
                                            <a className="cursor-pointer"
                                                onClick={() => setStep(1)}>
                                                <AiFillHome size={24} />
                                            </a>
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
                                            onClick={() => setStep(3)}>
                                            Recuperar Senha
                                        </button>
                                    </div>

                                </>
                                :
                                //CADASTRAR CONTA
                                step == 4 ?
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
                                                    placeholder="Informe seu e-mail (usuário)"
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2 text-start">
                                                <label htmlFor="password">
                                                    Digite sua senha
                                                </label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="******"
                                                    value={password}
                                                    onChange={(event) => setPassword(event.target.value)}
                                                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" />

                                                <label htmlFor="passwordConfirm">
                                                    Confirme sua senha
                                                </label>
                                                <input
                                                    id="passwordConfirm"
                                                    name="passwordConfirm"
                                                    type="password"
                                                    placeholder="******"
                                                    value={passwordConfirm}
                                                    onChange={(event) => setPasswordConfirm(event.target.value)}
                                                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" />
                                            </div>

                                            <button type="button"
                                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-violet-700"
                                                onClick={() => handleSignUp()}>
                                                Cadastrar
                                            </button>

                                            <button type="button"
                                                className="bg-white text-gray-800 px-5 h-12 rounded-md font-semibold flex items-center gap-3 justify-center hover:bg-gray-300 hover:text-black"
                                                onClick={() => handleGoogleSignIn()}>
                                                <FcGoogle size={20} />
                                                Cadastrar com o Google
                                            </button>
                                        </div>

                                    </>
                                    :
                                    <>

                                    </>
                }

            </form>
        </>
    )
}