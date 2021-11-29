import {useState, useEffect, useLayoutEffect} from "react";
import Bar from "./Taskbar/Bar";
import Window from "./Program/Window";
import {systemPrograms}  from "../Windows/controllers/programs";
import { GraphQLClient, request, gql } from 'graphql-request';
import Link from "next/link";
import Modal from 'react-modal';


interface BarIconsCollection {
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
    const [APIContent, setAPIContent] = useState<BarIconsCollection>({barIconsCollection: []});

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


    const newSystemPrograms = systemPrograms.map(item=>({...item, isOpen: false, selected: false, windowContent: null, zIndex: 0}));
    const [statePrograms, setStatePrograms] = useState(newSystemPrograms);

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


    const alternateProgram = (currentState, currentProgram) => {
        return currentState.map(program=>({
            ...program,
            selected: program.id === currentProgram.id
        }));
    }

    const MAX_Z_INDEX = 5000;

    const programOverlay = (currentState, currentProgram, zIndex) => {        
        return currentState.map(program=>{
            if(program.id === currentProgram.id){
                program.zIndex = zIndex;                
            } else {
                if(program.zIndex > 0){
                    program.zIndex = program.zIndex - 1000;
                }
            }
        });
    }

    const openProgram = async (currentProgram, query) => {

        statePrograms.map((program)=>({...program, selected: false}));

        const updateStatePrograms = await Promise.all( 
            statePrograms.map(async (program)=>{
                if(program.id === currentProgram.id){
                    program.selected = !program.selected;
                    if(!currentProgram.isOpen){
                        const syntheticDelay = Math.random() * (2000 - 500) + 500;
                        //Loader start
                        await new Promise((resolve)=>setTimeout(resolve, syntheticDelay));
                        
                        program.windowContent = await currentProgram.open();
                        // program.windowContent = await program.name;
                        
                        // const req = await fetch(`/api/scrape?url=https://www.google.com`);
                        // const res = await req.json();
                        // const data = await res.data;
                        // program.windowContent = await data;

                        program.isOpen = true;
                    }
                } else {
                    program.selected = false;
                }
                return program;
            })
        );
        
        programOverlay(statePrograms, currentProgram, MAX_Z_INDEX);

        setStatePrograms([...updateStatePrograms]);

        //Loader stop
    }

    const closeProgram = (currentProgram) => {
        statePrograms.map((program)=>{
            if(program.id === currentProgram.id){
                program.selected = false;
                program.isOpen = false;
                program.windowContent = null;
            }
            return program;
        });
        programOverlay(statePrograms, currentProgram, 0);

        setStatePrograms([...statePrograms]);
    }



    return (
        <>
            {/* <MouseLoader /> */}
            {/* <WindowWelcomeScreen /> */}
            {/* <h1>Windows 10</h1> */}
            <Window
                statePrograms={statePrograms}
                setStatePrograms={setStatePrograms}
                closeProgram={closeProgram}
            />
            <Bar
                statePrograms={statePrograms}
                setStatePrograms={setStatePrograms}
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