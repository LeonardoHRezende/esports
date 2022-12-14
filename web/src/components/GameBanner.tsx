import { useNavigate } from "react-router-dom"

interface GameBannerProps {
    id: string,
    bannerUrl: string,
    title: string,
    adsCount: any

}

export function GameBanner(props: GameBannerProps) {

    const navigate = useNavigate();

    function viewAds() {

        sessionStorage.setItem('bannerUrl', props.bannerUrl);
        sessionStorage.setItem('title', props.title);
        sessionStorage.setItem('adsCount', props.adsCount);

        navigate(`/ads/${props.id}`);
    }

    return (
        <button
            className="relative rounded-lg overflow-hidden"
            onClick={()=> viewAds()}>
            <img src={props.bannerUrl} alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{props.title}</strong>
                <span className="text-zinc-300 text-sm block">{props.adsCount == 0 ? '0 anúncio(s)' : 'Vários anúncio(s)'} </span>
            </div>
        </button>
    )
}