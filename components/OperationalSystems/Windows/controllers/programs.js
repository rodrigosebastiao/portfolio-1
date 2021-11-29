// import useEmbedded from "../../../hooks/useEmbedded";
import embedded from "../../../hooks/embedded";


// https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137
/* useEffect(() => {
  fetch("/api/scrape?url=https://www.google.com")
    .then(res=>res.json())
    .then(data=>{
      // const domParser = new DOMParser();
      // const htmlDoc = domParser.parseFromString(data, "text/html");
      setHTMLString(data.data);
    });
    setHTMLString(resource);
}, [resource]); */


export const systemPrograms = [
    {
        id: "start",
        name: "Start",
        icon: {src: "start.png", width: 16, height: 16},
        isNativeSystem: true,
        optNewWindow: false,
        open: ()=>{
            console.log("Whatsapp open");
        }
    },
    {
        id: "taskView",
        name: "Task View",
        icon: {src: "taskView.png", width: 16, height: 14},
        isNativeSystem: true,
        optNewWindow: false,
        open: ()=>{
            console.log("Task View");
        }
    },
    {
        id: "file-explorer",
        name: "File Explorer",
        icon: {src: "file-explorer.png", width: 26, height: 26},
        isNativeSystem: false,
        optNewWindow: false,
        open: ()=>{
            console.log("File Explorer open");
        }
    },
    {
        id: "git",
        name: "Git Bash",
        icon: {src: "git.png", width: 22, height: 22},
        isNativeSystem: false,
        optNewWindow: false,
        open: ()=>{
            console.log("Git Bash open");
        }
    },
    {
        id: "vscode",
        name: "Visual Studio Code",
        icon: {src: "vscode.png", width: 22, height: 22},
        isNativeSystem: false,
        optNewWindow: false,
        open: ()=>{
            console.log("vscode open");
        }
    },
    {
        id: "chrome",
        name: "Google Chrome",
        icon: {src: "chrome.png", width: 22, height: 22},
        isNativeSystem: false,
        optNewWindow: false,
        // template: (resource)=>`<div className="Google Chrome"><div className="tabs"></div><div className="addresss"></div>${resource}</div>`,
        open: async (url="https://www.google.com")=>{
            const {req} = embedded(url);
            let template = "";

            console.log("req", req);

            await req.then((res)=>res.json())
            .then((res)=>{
                const response = res.data;
                template = <div><div dangerouslySetInnerHTML={{__html: response}} /></div>;
            })
            .catch(err=>{
                console.log(err);

                template = <div className="template error">
                    Failed to load resource, reason: {err.message}. Please try again later.
                </div>;
            });
            return template;
        }
    },
    {
        id: "whatsapp",
        name: "Whatsapp",
        icon: {src: "whatsapp.png", width: 22, height: 22},
        // href: "https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137",
        isNativeSystem: false,
        optNewWindow: true,
        open: async (url="https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137")=>{
            const {resource} = await embedded(url);
            const template = <div dangerouslySetInnerHTML={{__html: resource}} />;
            // const template = <div>Teste</div>;
            return template;
        }
    },
];
