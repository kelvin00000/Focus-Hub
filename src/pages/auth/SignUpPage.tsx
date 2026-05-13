import Navbar from "../../components/Navbar"

export default function SignUpPage(){
    return(
        <>
            <title>Sign Up</title>

            <Navbar title={"Sign Up"} showTitle={false} showProfileIcon={false} showMenuButton={false} />

            <section className="flex flex-col items-center justify-center w-full h-screen text-[#F5F5F5] bg-bgdark">
                <p className="text-6xl">Lets</p>
                <p className="text-6xl">Start Learning</p>
                <span className="mt-1.5 text-[18px]">Click the button below to continue</span>

                <button className="mt-15 px-24 py-4 font-bold text-[1.2rem] text-bgtext bg-[#1F1F1F]/75 rounded-[20px] border border-[#071322] transition-all duration-500 hover:bg-foreground/25  cursor-pointer">Continue</button>
            </section>
        </>
    )
}
