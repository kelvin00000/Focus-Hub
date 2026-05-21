// import { type HttpsCallableResult, httpsCallable } from "firebase/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveSearchResponse, saveUserMessage } from "./firestore";


// const aiSearch = httpsCallable(functions, "aiSearch");

export async function sendAISearchQuery(query: string, personalStudyMode: boolean){
    if(!query) throw new Error
    const isGoogleSearch = false;

    await saveUserMessage(query, personalStudyMode);

    async function aiSearch(prompt: string){
        const genAI = new GoogleGenerativeAI('AIzaSyDUvrR4cO3uW8AMqj5_Ky-bwb8yqUwCb-0');
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    }

    const Rawresponse = await aiSearch(query);
    console.log(Rawresponse)
    const response = '';

    saveSearchResponse(query, response, personalStudyMode, isGoogleSearch)
}




export async function sendAIDocQuery(doc: File|undefined, personalStudyMode: boolean){
    return personalStudyMode;
}


// "https://www.googleapis.com/customsearch/v1?key=AIzaSyDoRWFZojCsoopx4Y6vNxurb2IwB37Vmto&cx=95e4d89cdb1164138&q=test"
