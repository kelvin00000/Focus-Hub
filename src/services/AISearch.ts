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
