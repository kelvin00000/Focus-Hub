// import { Document, Page, pdfjs } from "react-pdf";
import { BotIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc"

// pdfjs.GlobalWorkerOptions.workerSrc =
//   `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type props = {
    sender: string,
    searchMethod: string | undefined,
    query: string | undefined,
    message: string,
    tag: string,
    isUserMessage: boolean
}

export default function ChatMessage({sender, searchMethod, query, message, tag, isUserMessage}: props){
    return(
        <>
            <div className={`flex ${isUserMessage?'justify-end':'justify-start'} w-full`}>
                <div className="flex flex-col shrink-0 gap-10px p-[15px] max-w-[85%] text-[#F5F5F5] bg-bgforeground rounded-[20px] border border-gray-800 lg:max-w-[65%]">
                    <div className="mb-[10px] font-light italic">{
                        isUserMessage?''
                        : searchMethod==='AI Search'? (
                            <div className="flex items-center gap-2.5">
                                <BotIcon size={18} color="#F5F5F5" />
                                <span>{sender}'s  {searchMethod}</span>
                            </div>
                        )
                        : searchMethod==='Google Search'? (
                            <div className="flex items-center gap-2.5">
                                <FcGoogle size={18} color="#F5F5F5" />
                                <span>{sender}'s  {searchMethod}</span>
                            </div>
                        )
                        : sender
                    }</div>
                    {query?
                        <>
                            <span className="mb-[3px] text-[12px] italic">Query</span>
                            <div className="mb-[15px]">{query}</div>
                            <span className="mb-[3px] text-[12px] italic">Response</span>
                        </>
                    : ''
                    }
                    <div className=" font-[100px]">{message}</div>
                    <div className="mt-[15px] text-[15px] text-blue-950 italic">{tag}</div>
                </div>
            </div>
        </>
    )
}
