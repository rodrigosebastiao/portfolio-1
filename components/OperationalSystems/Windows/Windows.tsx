import {useState, useEffect, useCallback} from "react";
import Desktop from "./Programs/Desktop/Desktop";
import Window from "./Programs/Window/Window";
import Taskbar from "./Taskbar/Taskbar";
import {systemPrograms}  from "../Windows/controllers/programs";
import { GraphQLClient, request, gql } from 'graphql-request';
import Modal from 'react-modal';


interface TaskbarIconsCollection {
    barIconsCollection: {
        /* items: Array<{
            image: {
                description: string
                title: string
                url: string
                height: number
                width: number
            }
        }> */
    }
}

// import contentful from "contentful";

const space_id = "dwrajoogc4l3";
const environment_id = "master";
// const accessToken = "f47WOEJwMutx7fbutP6x-_zkUDQcNfjT2uRTO-wrATI"; //Production
// const accessToken = "Vercel Integration | SoGQ4";
const accessToken = "9KoJS3scUGP-zbfsWyRlfa9Cdk0_DWDKVzyqjPl-j5g";//Preview
    
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${space_id}/environments/${environment_id}?access_token=${accessToken}`;

export default function Windows(){
    const [APIContent, setAPIContent] = useState<TaskbarIconsCollection>({barIconsCollection: []});

    useEffect(()=>{
        //   const client = contentful.createClient({
        //         space: space_id,
        //         environment: environment_id, // defaults to 'master' if not set
        //         accessToken: accessToken,
        //         // host: "cdn.contentful.com"
        //         host: "preview.contentful.com"
        //     })
        
        //     client.getEntries()
        //     .then((entry) => console.log(entry))
        //     .catch(console.error)
        
        
        //     // console.log(
        //     //     fetch("https://cdn.contentful.com/spaces/dwrajoogc4l3/portfolio/environments/master", {headers: {
        //     //         Authorization: "f47WOEJwMutx7fbutP6x-_zkUDQcNfjT2uRTO-wrATI"
        //     //     }}).then(data=>data.json().then(data=>data))
        //     // );

        console.log("endpoint", endpoint);
        
    
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });
    
    
        const queries = gql`query {
            # add your query
            learningCollection {
                items {
                    image {
                        title
                        description
                        url
                        width
                        height
                    }
                }
            }
        }`;
    
        const data = graphQLClient.request(queries)
        .then(data=>{
            setAPIContent(data);
        });
    }, []);


    /*     const componentList = [
        {name: "desktop", component: Desktop}
    ] */

    const MAX_Z_INDEX = 5000;

    /* Initial State Management */
    const newSystemPrograms = systemPrograms.map(item=>({
        ...item, 
        open: false, 
        active: false, 
        redirectWindow: false,
        leftMenu: false,
        ready: false,
        windowContent: null, 
        zIndex: 0
    }));
    
    const [statePrograms, setStatePrograms] = useState(newSystemPrograms);
    const [desktopVisible, setDesktopVisible] = useState(true);
    const [taskbarPosition, setBarPosition, ] = useState({top: false, right: false, left: false, bottom: true});
  

    useEffect(()=>{
        const createProgramContainer = (id) => {
            const root = document.querySelector("#__next");
            const child = document.createElement("div");
            child.setAttribute("id", id);
            child.setAttribute("class", "window-modal");
            root.appendChild(child);
        }

        statePrograms
            .map(program=>{
                createProgramContainer(program.id);
                Modal.setAppElement(`#${program.id}`);
            });
    }, []);



    const programOverlay = (currentProgram, zIndex) => {        
        return statePrograms.map(program=>{
            if(program.id === currentProgram.id){
                program.zIndex = zIndex;                
            } else {
                if(program.zIndex > 0){
                    program.zIndex = program.zIndex - 1000;
                }
            }
        });
    }

    const progressStart = () => {
        document.body.classList.add("progress");
    }

    const progressComplete = () => {
        document.body.classList.remove("progress");
    }



    const openProgram = useCallback(async (currentProgram, query) => {
        if(!currentProgram.open){

            progressStart();
        }

        const syntheticDelay = Math.random() * 800;
        await new Promise((resolve)=>setTimeout(resolve, syntheticDelay));
        
        statePrograms.map((program)=>({...program, active: false}));

        statePrograms.map((program)=>{
            if(program.id === currentProgram.id){
                program.active = !program.active;
                if(!currentProgram.open){                        
                    program.open = true;
                    program.active = true;
                }
            } else {
                program.active = false;
            }
            return program;
        });
        
        programOverlay(currentProgram, MAX_Z_INDEX);
        setStatePrograms([...statePrograms]);
        setDesktopVisible(false);

        /* setTimeout(()=>{
            // In case get stuck
            progressComplete();
        }, 5000); */
    }, []);

    const closeProgram = (currentProgram) => {
        statePrograms.map((program)=>{
            if(program.id === currentProgram.id){
                program.active = false;
                program.open = false;
            }
            return program;
        });
        programOverlay(currentProgram, 0);

        setStatePrograms([...statePrograms]);
        setDesktopVisible(true);
    }

    const restoreMaximize = (currentProgram) => {
        statePrograms.map((program)=>{
            if(program.id === currentProgram.id){
                /* TODO */
            }
            return program;
        });

        setStatePrograms([...statePrograms]);
    }



    return (
        <>
            {/* <MouseLoader /> */}
            {/* <WindowWelcomeScreen /> */}
            {/* <h1>Windows 10</h1> */}

            <Desktop
                desktopVisible={desktopVisible}
                zIndex={MAX_Z_INDEX}
            />

            <Window
                statePrograms={statePrograms}
                setStatePrograms={setStatePrograms}
                openProgram={openProgram}
                closeProgram={closeProgram}
                restoreMaximize={restoreMaximize}
                taskbarPosition={taskbarPosition}
            />
            <Taskbar
                statePrograms={statePrograms}
                setStatePrograms={setStatePrograms}
                desktopVisible={desktopVisible}
                setBarPosition={setBarPosition}
                taskbarPosition={taskbarPosition}
                setDesktopVisible={setDesktopVisible}
                openProgram={openProgram}
                backgroundColor="rgba(25, 25, 25, 0.85)"
                blur={"15px"}
            />
            {/* <TaskView 
                systemPrograms={systemPrograms}
            /> */}
            {/* <ProgramList 
                systemPrograms={systemPrograms}
            /> */}
        </>
    )
}