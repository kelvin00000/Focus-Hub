// import { type HttpsCallableResult, httpsCallable } from "firebase/functions";
import { saveSearchResponse } from "./firestore";
import OpenAI from 'openai';

// const aiSearch = httpsCallable(functions, "aiSearch");

export async function sendAISearchQuery(query: string, personalStudyMode: boolean){
    if(!query) throw new Error
    const isGoogleSearch = false;

    const searchOpenAI = async (prompt: string) => {
        const openai = new OpenAI({
            apiKey: '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',
            dangerouslyAllowBrowser: true
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500
        });
        return completion.choices[0].message.content;
    };

    const rawResponse = await searchOpenAI(query);
    // console.log(Rawresponse)

    if(!rawResponse){
        throw new Error;
    }
    saveSearchResponse(query, rawResponse!, personalStudyMode, isGoogleSearch)
}



export async function sendAIDocQuery(convertedText: string, query: string, personalStudyMode: boolean){
    if(!convertedText) throw new Error();

    // Construct final prompt
    const prompt = `Here is a document:
    ${convertedText}
    Question: ${query}
    Please answer the question based on the document content.`;

    await sendAISearchQuery(prompt, personalStudyMode);
}


// "https://www.googleapis.com/customsearch/v1?key=AIzaSyDoRWFZojCsoopx4Y6vNxurb2IwB37Vmto&cx=95e4d89cdb1164138&q=test"
