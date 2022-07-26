import { useEffect, useState } from "react";

// const api_url = process.env.VERCEL_URL;
const api_url = "http://localhost:3000";

export default function useFetch(url){
    const [ready, setReady] = useState(false);
    const [resource, setResource] = useState(null);


    // https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137
    useEffect(() => {
        
        fetch(`${api_url}/api/scrape?url=${url}`)
        .then(res=>res.json())
        .then(data=>{
            // const domParser = new DOMParser();
            // const htmlDoc = domParser.parseFromString(data, "text/html");
            setResource(data.data);
        })
        .catch(()=>{
            const error = "Resource unavailable. Try again or change request.";
            console.log(error);
            setResource(error);
        })
        .finally(()=>{
            document.body.classList.remove("progress");
            setReady(true);
        });
    }, [url]);

    return {
        resource,
        ready
    };
}