import { saveUserMessage, saveSearchResponse } from "./firestore";
// import { httpsCallable } from 'firebase/functions';
// import { functions } from "./authentication";
// import { type HttpsCallableResult } from "firebase/functions";


// const googleSearch = httpsCallable(functions, "braveSearch");

export async function sendGoogleSearchQuery(query: string, personalStudyMode: boolean){
    if(!query) return;
    const isGoogleSearch = true;
    await saveUserMessage(query, personalStudyMode);

    async function googleSearch(query: string){
        const response = await fetch(
            `https://corsproxy.io/?${encodeURIComponent('https://api.search.brave.com/res/v1/web/search?q=' + query)}`,
            { headers: { 'X-Subscription-Token': 'BSA2CKyFHsqnrWlcfFRRNqg-ad6gltc' } }
        );
        return await response.json();
    }

    const rawResponse = await googleSearch(query);
    console.log(rawResponse);

    const response = rawResponse.web.results[1].description;
    const searcQuery = rawResponse.query.original;

    await saveSearchResponse(searcQuery, response, personalStudyMode, isGoogleSearch)
}


//95e4d89cdb1164138

// async function googleSearch() {
//     const GOOGLE_SEARCH_API_KEY = "AIzaSyBMvIHHaP4Ajqro523p2W17UDyzMGcEnJM";
//     const SEARCH_ENGINE_ID = "95e4d89cdb1164138";

//     try{
//         const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;
//         const response = await fetch(url);
//         // https://www.googleapis.com/customsearch/v1?key=AIzaSyBMvIHHaP4Ajqro523p2W17UDyzMGcEnJM&cx=95e4d89cdb1164138&q=test

//         const data = await response.json();
//         console.log(data)

//         return data;
//     }
//     catch(error){
//         console.error('Function error:', error);
//         throw error;
//     }
// }


// exports.googleSearch = onCall({ secrets: [googleApiKey] }, async (request) => {
//     try {
//         const { query } = request.data;
//         const SEARCH_ENGINE_ID = "95e4d89cdb1164138";

//         const url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey.value()}&cx=${SEARCH_ENGINE_ID}&q=${query}`;
//         const response = await fetch(url);
//         const data = await response.json();

//         return data;
//     } catch(error) {
//         console.error('Function error:', error);
//         throw error;
//     }
// });
