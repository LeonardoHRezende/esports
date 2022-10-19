import { SignOut, User } from "phosphor-react"
import { useNavigate } from "react-router-dom"


function Header() {

    const navigate = useNavigate();

    return (
        <>
            <div className="max-w-[1344px] my-10 flex flex-row gap-5 justify-end items-center mx-auto">
                <button 
                className="bg-violet-500 rounded-full p-2 hover:bg-violet-600"
                onClick={()=>{navigate('/user')}}>
                    <User size={25} className="text-white"/>
                </button>
                <button className="bg-violet-500 rounded-full p-2 mr-5">
                    <SignOut size={25} className="text-white"/>
                </button>
            </div>

        </>
    )
}

export default Header
