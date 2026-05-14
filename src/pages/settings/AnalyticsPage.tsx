import type { DocumentData } from "firebase/firestore"
import Navbar from "../../components/Navbar"

type props = {
    userInfo: DocumentData|null|undefined
}

export default function AnalyticsPage({userInfo}: props){
    return(
        <>
            <title>Analytics</title>

            <Navbar userInfo={userInfo} title={"Analytics"} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <section className="flex items-center justify-center w-full h-screen bg-bgdark">
                working
            </section>
        </>
    )
}
