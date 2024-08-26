import { useEffect, useCallback, useState } from "react";


async function sendHttpRequset(url , config) {

    const response = await fetch(url , config); 
    const resData = await response.json() ;

    if(!response.ok)
        throw new Error(resData.message || 'Something went wrong, failed to send request.');
    return resData;
}


export default function uesHttp(url , config , initialData = []){
    const [data , setData] = useState(initialData);
    const [isLoading , setIsLoading] = useState(); 
    const [error , setError] = useState(); 


    const sendRequest = useCallback(
        async function sendRequest(){
            setIsLoading(true); 
            try{
                const resData = await sendHttpRequset(url, {...config , body: data}); 
                setData(resData);
            }catch(error){
                setError(error.message || 'Something went wrong!');
            }
            setIsLoading(false);

    },[url , config ]);


    useEffect(
        ()=>{
            if((config && (config.method === 'GET' || !config.method)) || !config){
                sendRequest();
            }
        },[sendRequest , config]
    );

    return {
        data, 
        isLoading , 
        error , 
        sendRequest
    };
}
