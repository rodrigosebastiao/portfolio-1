import styles from "../../../../styles/Windows/Taskbar/Bar.module.scss";
import Image from "next/image";


const imagePath = "/Windows/Taskbar/Bar/";

interface Bar {
    APIContent?: object
    statePrograms?: any
    setStatePrograms?: any
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

//git commit -m "Phone call +55 11 9 3357-2137" //https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137


export default function Bar(props: Bar){
    const {statePrograms, barIcons, openProgram, closeProgram, backgroundColor, blur, zIndex} = props;
    const altName = (tool)=> `Windows Bar ${tool} Icon`;
    // const programId = (id) => id.replace(/.(png|jpg|jpeg|gif|svg)/g, '');

    return (
        <footer className={styles.bar} style={{backgroundColor, backdropFilter: `blur(${blur})`, zIndex}}>                
            <div className={styles.bar__wrapper}>
                <ul className={styles.bar__tools}>
                    {statePrograms.map((program, index)=>
                     <li 
                        key={index} 
                        onClick={()=>{ openProgram(program) }} 
                        className={`${program.id} ${styles["bar__tool"]} ${program.isOpen ? styles["bar__tool--open"] : ""} ${program.selected ? styles["bar__tool--selected"] : ""}`}
                    >
                        <a href={program?.href}><Image src={`${imagePath}${program.icon.src}`} alt={altName(program.icon.alt)} width={program.icon.width} height={program.icon.height} layout="intrinsic"/></a>
                    </li>
                    )}
                    
                    {barIcons?.items?.map(item=>
                    <li key={item.image.title}>
                        <Image src={item.image.url} alt={item.image.description} width={item.image.width} height={item.image.width}/>
                    </li>)}
                </ul>

                <ul className={styles.bar__action}>
                    <li className={styles.bar__tools}></li>
                    <li className={styles.bar__goback__desktop}></li>
                </ul>
            </div>
        </footer>
    )
}