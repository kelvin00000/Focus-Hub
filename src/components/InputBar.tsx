import { BotIcon, SendIcon, Paperclip, X, FileText } from "lucide-react";
import { FcGoogle } from "react-icons/fc"
import { useState, useEffect } from "react"

type props = {
    showShareFileButtton: boolean
}

export default function InputBar({showShareFileButtton}: props){
    const [searchMethod, setSearchMethod] = useState('none');
    const [placeholderText, setPlaceholderText] = useState('Type a message here');
    const sampleTexts = ['Upload a documenent', 'Search for anything', 'Type a message here'];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % sampleTexts.length;
            setPlaceholderText(sampleTexts[index]);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    //SEARCH METHOD CLEAR
    function clearSearchMethod(e){
        e.stopPropagation();
        setSearchMethod('none')
    }

    return(
        <>
            <div className="fixed bottom-[2%] flex flex-col items-center justify-center p-3.5 w-[95%] h-[100px] bg-bgforeground rounded-[30px] text-[#F5F5F5] lg:bottom-[5%] lg:w-[40%]">
                <div className="flex items-center justify-between w-full h-[70%]">
                    <input className="ml-[15px] w-full border-none outline-none" id="input-text" type="text" placeholder={placeholderText} />
                    {showShareFileButtton?
                        <>
                            <input className="hidden" type="file" id="share-document" />
                            <label className="flex items-center justify-center mr-[2%] p-1.5 rounded-full border border-[#0A1A2F]" htmlFor="share-document">
                                <Paperclip size={20} className="cursor-pointer" />
                            </label>
                        </>
                    :''
                    }
                    <button className="p-2.5 rounded-full border-none bg-[#0A1A2F] cursor-pointer"><SendIcon size={18} color="#F5F5F5" /></button>
                </div>

                <div className="flex items-center gap-[2%] w-full">
                    <div
                    className={searchMethod==='ai'?'hidden': "relative flex items-center justify-center gap-2 p-1.5 h-[32px] w-[90px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                    onClick={() => setSearchMethod('google')}
                    >
                        <FcGoogle className="w-[20px] h-[20px] fill-[#F5F5F5]" />
                        <span className="text-[13px]">Search</span>
                        <button
                            className={searchMethod==='google'?"absolute top-[-20%] right-[-20%] flex items-center justify-center p-1 rounded-full border border-[#0A1A2F] cursor-pointer": 'hidden'}
                            onClick={clearSearchMethod}
                            >
                                <X size={15} color="#F5F5F5" />
                            </button>
                    </div>
                    <div
                    className={searchMethod==='google'?'hidden': "relative flex items-center justify-center gap-2 p-1.5 h-[32px] w-[70px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                    onClick={() => setSearchMethod('ai')}
                    >
                        <BotIcon size={18} color="#F5F5F5" />
                        <span className="text-[13px]">AI</span>
                        <button
                            className={searchMethod==='ai'?"absolute top-[-20%] right-[-20%] flex items-center justify-center p-1 rounded-full border border-[#0A1A2F] cursor-pointer": 'hidden'}
                            onClick={clearSearchMethod}
                            >
                                <X size={15} color="#F5F5F5" />
                        </button>
                    </div>
                    <input className="hidden" type="file" id="upload-document" />
                        <label className={searchMethod==='google'|| searchMethod==='ai'?'hidden': "flex items-center justify-center gap-2 p-1.5 h-[32px] w-[70px] border border-[#0A1A2F] rounded-[20px] cursor-pointer"}
                            htmlFor="upload-document">
                            <FileText size={17} className="cursor-pointer" />
                            <span className="text-[13px]">doc</span>
                        </label>
                </div>
            </div>
        </>
    )
}
