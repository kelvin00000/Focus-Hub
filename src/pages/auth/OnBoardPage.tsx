import type { DocumentData } from "firebase/firestore";
import Navbar from "../../components/Navbar"
import { useAuth } from "../../hooks/useAuth"

type props = {
    userInfo: DocumentData|null|undefined
}

export default function OnBoardPage({userInfo}: props){
    useAuth();
    return(
        <>
            <title>Welcome</title>

            <Navbar userInfo={userInfo} title={"Welcome"} showTitle={true} showProfileIcon={true} showMenuButton={false} />

            <section className="flex items-center justify-center w-full h-screen bg-bgdark">
                working
            </section>
        </>
    )
}
