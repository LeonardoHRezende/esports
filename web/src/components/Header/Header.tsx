import { SignOut, User } from "phosphor-react"
import { useNavigate } from "react-router-dom"

import { getAuth, signOut } from "firebase/auth";

import Swal from 'sweetalert2'


function Header() {

    const navigate = useNavigate();
    const auth = getAuth();

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

    function logOut() {

        Swal.fire({
            text: 'Você tem certeza que quer sair?',
            icon: 'warning',
            confirmButtonColor: '#e90f0f',
            confirmButtonText: 'Sair'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                    .then((result) => {
                        sessionStorage.removeItem('identify')
                        navigate('/login')
                    }).catch((error) => {
                        Toast.fire({
                            icon: 'error',
                            title: 'Um erro inesperado aconteceu!'
                        })
                    });
            }
        })
    }

    return (
        <>
            <div className="max-w-[1344px] my-10 flex flex-row gap-5 justify-end items-center mx-auto">
                <button
                    className="bg-violet-500 rounded-full p-2 hover:bg-violet-600"
                    onClick={() => { navigate('/user') }}>
                    <User size={25} className="text-white" />
                </button>
                <button className="bg-violet-500 rounded-full p-2 mr-5"
                    onClick={() => { logOut() }}>
                    <SignOut size={25} className="text-white" />
                </button>
            </div>

        </>
    )
}

export default Header
