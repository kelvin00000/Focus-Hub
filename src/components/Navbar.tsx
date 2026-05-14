import { type DocumentData } from "firebase/firestore";
import { Link } from "react-router";
import { Menu } from "lucide-react"


type props = {
    title: string,
    showTitle: boolean,
    showProfileIcon: boolean,
    showMenuButton: boolean,
    userInfo: DocumentData|null|undefined
}
export default function Navbar({title, showTitle, showProfileIcon, showMenuButton, userInfo}:props){
    return(
        <>
            {userInfo&&
                    <div className="fixed flex items-center justify-between mt-0 pl-[5%] pr-[5%] h-[65px] w-full backdrop-blur-sm lg:pl-[2.5%] lg:pr-[2.5%] z-50">
                    <div className="flex flex-row gap-2.5 w-[75%]">
                        <img className="w-7.5 h-7.5 rounded-full" src="/logo.jpg" />
                        {showTitle?<span className="text-[#F5F5F5] font-fam-bold text-2xl truncate">{title}</span>:''}
                    </div>

                    <div className="flex items-center gap-2.5">
                        {showProfileIcon?<img className="w-7.5 h-7.5 rounded-[100%]" src={userInfo.profileImage} />:''}
                        {showMenuButton
                            ? <Link className="flex items-center justify-center w-10 h-10 rounded-[100%]" to='/'>
                                    <Menu size={20} color="#F5F5F5" />
                                </Link>
                            :''
                        }
                    </div>
                </div>
            }
        </>
    )
}
