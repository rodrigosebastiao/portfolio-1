import { useEffect, useState, memo } from "react";
import styles from "../../../../styles/Windows/Programs/Whatsapp.module.scss";
import useFetch from "../../../../hooks/useFetch";


function Chrome(props){
    const {program, openProgram, closeProgram} = props;
    const [url, ] = useState("https://api.whatsapp.com/send?1=en&phone=5511933572137");
    const [cached, setCached] = useState("");

    const {resource} = useFetch(url);

    useEffect(() => {
        if(cached){
            setCached(resource);
        }
    }, [resource]);

    
    return (
        <div className={"Whatsapp"}>
            <div dangerouslySetInnerHTML={{__html: resource}} />
        </div>
    )
}

export default Chrome;