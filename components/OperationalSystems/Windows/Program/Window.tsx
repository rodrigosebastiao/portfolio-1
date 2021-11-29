import styles from "../../../../styles/Windows/Window/Window.module.scss";
import React, {useEffect} from 'react';
import Modal from 'react-modal';
import Desktop from "../Program/Desktop";


const imagePath = "/Windows/Taskbar/Bar/";

interface Window {
    statePrograms: any
    setStatePrograms?: any
    closeProgram?: (id: string)=>void
    backgroundColor?: string
    opacity?: number
    filter?: any
    zIndex?: string
}

//git commit -m "Phone call +55 11 9 3357-2137" //https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137


export default function Window(props: Window){
    const {statePrograms, closeProgram, zIndex, setStatePrograms} = props;

    // const programId = (id) => id.replace(/.(png|jpg|jpeg|gif|svg)/g, '');

    console.log("Window statePrograms", statePrograms);
    

    return (
        <div className={styles.window__frame} style={{zIndex,}}>
            {
                statePrograms
                .filter(program=>program.windowContent !== null && program.isOpen && program.selected)
                // .filter(program=>program.isOpen && program.selected)
                .map(program=>{
                    return(
                        <div key={program.id} className="window-frame" style={{zIndex: program.zIndex}}>                                  

                            <Desktop zIndex="2000"/>
                            <Modal
                                isOpen={true}
                                // onAfterOpen={afterOpenModal}
                                // onRequestClose={closeModal}
                                // style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <header>
                                    {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                                    <h2>{program.name}</h2>
                                    {/* <button onClick={closeModal}>close</button> */}
                                    <span onClick={()=>closeProgram(program)}>X</span>                                   
                                </header>

                                <div className="window-receiver">
                                   {program.windowContent}
                                </div>
                            </Modal>
                        </div>
                    )
                })
            }
        </div>
    )
}