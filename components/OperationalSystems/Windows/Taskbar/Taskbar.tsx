import {useState} from 'react';
import styles from "../Taskbar/Taskbar.module.scss";
import Image from "next/image";


const imagePath = "/Windows/";

interface Taskbar {
    APIContent?: object
    statePrograms: any
    setStatePrograms?: any
    desktopVisible?: Boolean
    setDesktopVisible?: any
    setBarPosition?: any
    taskbarPosition?: any
    onClick?: ()=>void
    openProgram?: (id: string, query?)=>void
    closeProgram?: (id: string)=>void
    backgroundColor?: string
    blur?: string
    zIndex?: string
    filter?: any

    barIcons?: {
        items: Array<{
            image: {
                description: string
                title: string
                url: string
                height: number
                width: number
            }
        }>
    }
    action?: () => void
}


export default function Taskbar(props: Taskbar){
    const {
        statePrograms, 
        setStatePrograms, 
        desktopVisible, 
        setDesktopVisible, 
        barIcons,
        openProgram, 
        closeProgram, 
        backgroundColor, 
        blur, 
        zIndex,
        taskbarPosition
    } = props;
    
    const [windowEdge, setBarPosition] = useState({top: false, right: false, left: false, bottom: true});
    

    const altName = (tool)=> `Windows Bar ${tool} Icon`;
    // const programId = (id) => id.replace(/.(png|jpg|jpeg|gif|svg)/g, '');

    const rightClickMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const closeProgramRightClick = (event, program) => {
        // if(event.button === 2){
        //     closeProgram(program.id);
        // }
    }


    const offerRedirect = (currentProgram) => {
        /* if(currentProgram.openNewWindow){
            window.location.href = currentProgram.url;
        } */
        currentProgram.redirectWindow = true;
        setStatePrograms([...statePrograms]);
    }

    const redirect = (currentProgram) => {
        //redirect url
        window.location.href = currentProgram.url;
    }

    const handleClick = (event, program) => {
        openProgram(program);

        if(program.optNewWindow){
            offerRedirect(program);
        } else {
            rightClickMenu(event);
        }
    }

    const handleWindowEdge = (event) => {
        setBarPosition({
            top: false, 
            right: false, 
            left: false, 
            bottom: true
        });
    }

    const onDragStart = (event) => {
        event.preventDefault();
        handleWindowEdge(event);
    }

    const onDragEnd = (event) => {
        event.preventDefault();
        handleWindowEdge(event);
    }
    

    return (
        <footer
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className={styles.taskbar} 
            style={{
            backgroundColor, 
            backdropFilter: `blur(${blur})`, 
            zIndex,
            top: taskbarPosition.top ? 0 : "initial",
            left: taskbarPosition.left ? 0 : "initial",
            right: taskbarPosition.right ? 0 : "initial",
            bottom: taskbarPosition.bottom ? 0 : "initial",
            position: 'fixed',
            }}
        >
            <div className={styles.taskbar__wrapper}>
                <ul className={styles.taskbar__tools}>
                    {statePrograms.map((program, index)=>
                        <li
                            key={index}                        
                            className={`${program.id} ${styles["taskbar__tool"]} ${program.open ? styles["taskbar__tool--open"] : ""} ${program.active ? styles["taskbar__tool--active"] : ""}`}
                        >
                            <a onClick={(event)=> handleClick(event, program)}>
                                {program.icon?.src 
                                    ? <Image src={`${imagePath}${program.icon.src}`} alt={altName(program.icon.alt)} width={program.icon.width} height={program.icon.height} layout="intrinsic"/>
                                    : <program.icon />
                                }
                            </a>

                            {
                                program.redirectWindow ?
                                <div className="tip-redirect">
                                    {
                                        <div>
                                            <div onClick={()=>openProgram(program)}>Open Now</div>
                                            <div onClick={()=>redirect(program)}>Open New Window</div>
                                        </div>
                                    }
                                </div> 
                                : null
                            }

                            {
                                program.leftMenu ?
                                <div className="taskbar-left-menu">
                                    {
                                        <div>
                                            <div onClick={()=>closeProgram(program)}>Open New Window</div>
                                        </div>
                                    }
                                </div>
                                : null
                            }
                        </li>
                    )}
                    
                    {barIcons?.items?.map(item=>
                    <li key={item.image.title}>
                        <Image src={item.image.url} alt={item.image.description} width={item.image.width} height={item.image.width}/>
                    </li>)}
                </ul>

                <ul className={styles.taskbar__action}>
                    <li className={styles.taskbar__tools}></li>
                    <li className={styles.taskbar__goback__desktop} onClick={()=>setDesktopVisible(!desktopVisible)}></li>
                </ul>
            </div>
        </footer>
    )
}