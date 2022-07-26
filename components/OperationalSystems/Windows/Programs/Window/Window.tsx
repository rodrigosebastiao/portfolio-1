import styles from "../Window/Window.module.scss";
// import variables from "../../../Windows";
import Modal from "react-modal";
import Minimize from "./Minimize";
import Restore from "./Restore";
import Close from "./Close";


const imagePath = "/Windows/";

interface IWindowProps {
    statePrograms: any
    setStatePrograms?: any
    taskbarPosition?: any
    onClick?: ()=>void
    openProgram?: (program: object, query?)=>void
    closeProgram?: (program: object)=>void
    restoreMaximize?: (program: object, event: object)=>void
}

//git commit -m "Phone call +55 11 9 3357-2137" //https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137


export default function Window(props: IWindowProps){
    const {
        statePrograms, 
        setStatePrograms,
        taskbarPosition,
        closeProgram, 
        openProgram, 
        restoreMaximize,
    } = props;

    // const altName = (tool)=> `Windows Bar ${tool} Icon`;
    // const programId = (id) => id.replace(/.(png|jpg|jpeg|gif|svg)/g, '');

    const windowHeader = (program, programstyles)  => (<header className="window-header">
        <h2 style={{fontSize: "0"}}>{program.name}</h2>
        <div className={styles.window__controllers} style={{background: programstyles.programHeader}}>
            <Minimize 
                onClick={()=>openProgram(program)}
                className={`${styles.window__icon} ${styles.window__icon__minimize}`}
            />
            <Restore 
                onClick={(event)=>restoreMaximize(program, event)}
                programstyles={programstyles}
                className={`${styles.window__icon} ${styles.window__icon__restore}`}
            />
            <Close 
                onClick={()=>closeProgram(program)}
                className={`${styles.window__icon} ${styles.window__icon__close}`}
            />
        </div>
    </header>)
    

    return (
        statePrograms
        .filter(program=>program.open)
        .map(program=>{
            return (
                <Modal
                    key={program.id}
                    isOpen={program.open}
                    className={`${styles.window__frame} ${program.id}`}
                    style={{
                        content: {
                            position: "absolute",
                            with: "100%",
                            background: "#fff",
                            top: taskbarPosition.top ? "40px" : 0,
                            left: taskbarPosition.left ? "40px" : 0,
                            right: taskbarPosition.right ? "40px" : 0,
                            bottom: taskbarPosition.bottom ? "40px" : 0,
                            visibility: program.active && program.ready ? "visible" : "hidden",
                            zIndex: program.zIndex,
                        }
                    }}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    // style={customStyles}
                    contentLabel="Example Modal">
                        <div>
                            {/* <header className="window-header">
                                <h2 style={{color: "transparent"}}>{program.name}</h2>
                                <div className={styles.window__controllers}>
                                    <Minimize 
                                        onClick={()=>openProgram(program)}
                                        className={`${styles.window__icon} ${styles.window__icon__minimize}`}
                                    />
                                    <Restore 
                                        onClick={()=>restoreMaximize(program)}
                                        className={`${styles.window__icon} ${styles.window__icon__restore}`}
                                    />
                                    <Close 
                                        onClick={()=>closeProgram(program)}
                                        className={`${styles.window__icon} ${styles.window__icon__close}`}
                                    />
                                </div>
                            </header> */}
                            <div className="window-container">
                                <program.Component
                                    /*receive program: CHROME, WHATSAPP... */
                                    windowHeader={windowHeader}
                                    program={program}
                                    openProgram={openProgram} 
                                    closeProgram={closeProgram}
                                    statePrograms={statePrograms}
                                    setStatePrograms={setStatePrograms}
                                />
                            </div>
                    </div>
                </Modal>
            )
        })
        
    )
}