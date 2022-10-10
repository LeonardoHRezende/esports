//images
import Logo from '../assets/logo-nlw-esports.svg';
import LoginForm from '../components/LoginStep/LoginForm';


function Login() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

                <img src={Logo} alt="" />

                <LoginForm />

            </main>
        </div>
    )
}

export default Login
