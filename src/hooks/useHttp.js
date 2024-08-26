import { useCallback, useState , useEffect } from "react";

async function sendHttpRequest(url, config ){

    const response = await fetch(url , config); 
    const resData = await response.json();

    if(!response.ok){
        throw new Error(resData.message || 'Something wnet wrong, failed to send request.'); 
    }

    return resData;
}



export default function useHttp(url , config , inintialData = []){

    const [data , setData] = useState(inintialData); 
    const [isLoading , setIsLoading] = useState(false); 
    const [error , setError]= useState(); 


    const sendRequest = useCallback(async function sendRequest(data){
        setIsLoading(true)
        try{
            const resData = await sendHttpRequest(url , {...config, body: data});
            setData(resData); 
        }catch(error){
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false); 

    } , [url , config]); 


    useEffect(
        ()=>{
            if((config && (config.method === 'GET' || !config.method)|| !config))
                sendRequest() 
        }
        ,[sendRequest , config]
    );

    return{
        data, 
        isLoading, 
        error, 
        sendRequest
    }
}