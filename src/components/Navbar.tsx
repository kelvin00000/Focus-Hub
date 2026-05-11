import { Link } from "react-router";
import { Menu } from "lucide-react"
import user from '../assets/user.jpg'


type props = {
    title: string,
    showMenuButton: boolean
}

export default function Navbar({title, showMenuButton}:props){
    return(
        <>
            <div className="fixed flex items-center justify-between mt-[5%] ml-[5%] w-[90%] lg:mt-[2%] lg:ml-[2.5%] lg:w-[95%] z-50">
                <div className="flex flex-row gap-2.5">
                    <img className="w-7.5 h-7.5 rounded-full" src="/logo.jpg" />
                    <span className="text-[#F5F5F5] font-fam-bold text-2xl">{title}</span>
                </div>

                <div className="flex flex-row items-center gap-2.5">
                    <img className="w-7.5 h-7.5 rounded-[100%]" src={user} />
                    {showMenuButton
                    ? <Link className="flex items-center justify-center w-10 h-10 rounded-[100%]" to='/'>
                            <Menu size={20} color="#F5F5F5" />
                        </Link>
                    :''
                    }
                </div>
            </div>
        </>
    )
}
