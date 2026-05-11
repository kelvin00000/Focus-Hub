import { Trash2 } from "lucide-react";

//USE THIS SAME MODAL FOR LOG OUT OR REMOVE ACCOUNT WARNING

type props = {
    message: string,
    isDeleteWarning: boolean,
    setShowDeleteModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function WarningModal({message, isDeleteWarning, setShowDeleteModal}: props){
    return(
        <>
           <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm">
                <div className="w-[300px] rounded-3xl border border-[#0A1A2F] bg-[#02101F] p-4 shadow-2xl">
                    <div className="mt-1 rounded-2xl border border-[#0A1A2F] bg-[#031829] p-4">
                        <p className="text-[15px] text-[#F5F5F5]">
                            {message}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                        onClick={() => {setShowDeleteModal(false)}}
                        className="rounded-xl border border-[#0A1A2F] px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5">
                            Cancel
                        </button>

                        {isDeleteWarning
                            ?<button className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-gray-300">
                                <Trash2 size={16} />
                                Delete
                            </button>
                            :<button className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-gray-300">
                                Continue
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
