type props = {
    message: string;
    show: boolean
};

const LoadingToast = ({ message, show }: props) => {

    return (
        <section
            className={`
                fixed left-1/2 -translate-x-1/2
                w-[90%] lg:w-[300px] h-[50px]
                bg-[#0A1A2F] text-[#0A1A2F]
                rounded-[14px] z-[999]
                flex items-center justify-center gap-4 px-5 border-4 border-bgforeground
                transition-all duration-300 ease-in-out
                ${show ? "bottom-[15%] lg:bottom-[20%]" : "-bottom-full"}
            `}
        >

            <div className="flex items-center gap-1 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#F5F5F5] animate-bounce"></span>

                <span
                    className="w-2 h-2 rounded-full bg-[#F5F5F5] animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                ></span>

                <span
                    className="w-2 h-2 rounded-full bg-[#F5F5F5] animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                ></span>
            </div>

            <p className="text-[16px] font-medium text-[#F5F5F5]">
                {message}
            </p>

        </section>
    );
};

export default LoadingToast;
