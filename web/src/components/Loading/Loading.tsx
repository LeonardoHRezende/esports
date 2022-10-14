import Logo from '../../assets/logo-nlw-esports.svg';


function Loading() {
    return (
        <>
            <div className="max-w-[1344px] min-h-screen mx-auto flex flex-row justify-center items-center animate-pulse">
                <img src={Logo} alt="" />
            </div>

        </>
    )
}

export default Loading
