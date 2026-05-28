import { SearchX } from "lucide-react";

type props = {
    message: string;
    actionMessage: string
};

const NoResultsScreen = ({ message, actionMessage }: props) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-10">
            <SearchX
                size={150}
                className="text-bgtext opacity-70"
            />

            <span className="mt-10 text-[19px] text-bgtext text-center font-medium leading-0 opacity-70">{message}</span>
            <span className="text-[17px] text-bgtext text-center font-medium leading-6 opacity-70">{actionMessage}</span>
        </div>
    );
};

export default NoResultsScreen;
