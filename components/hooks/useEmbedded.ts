import { useEffect, useState } from "react";

export default function useEmbedded(url){
    const [HTMLString, setHTMLString] = useState("");

    // https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137
    useEffect(() => {
        fetch(`/api/scrape?url=${url}`)
            .then(res=>res.json())
            .then(data=>{
                // const domParser = new DOMParser();
                // const htmlDoc = domParser.parseFromString(data, "text/html");
                setHTMLString(data.data);
            });
    }, [url]);

    return {
        resource: HTMLString
    };
}