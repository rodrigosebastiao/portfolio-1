// import useEmbedded from "../../../hooks/useEmbedded";
import embedded from "../../../hooks/embedded";
import {TaskViewIcon} from "../icons/TaskViewIcon";
import {StartIcon} from "../icons/StartIcon";
import Start from "../Programs/Start/Start";
import Chrome from "../Programs/Chrome/Chrome";
import Whatsapp from "../Programs/Whatsapp/Whatsapp";


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
        icon: StartIcon,
        // icon: {src: "start.png", width: 16, height: 16},
        isNativeSystem: true,
        optNewWindow: false,
        Component: (props)=>{
            return Start(props);
        }
    },
    {
        id: "taskview",
        name: "Task View",
        icon: TaskViewIcon,
        // icon: {src: "taskView.png", width: 16, height: 14},
        isNativeSystem: true,
        optNewWindow: false,
        Component: (props)=>{
            return //TaskView(props);
        }
    },
    {
        id: "fileexplorer",
        name: "File Explorer",
        icon: {src: "file-explorer.png", width: 22, height: 22},
        isNativeSystem: true,
        optNewWindow: false,
        Component: (props)=>{
            return //FileExplorer(props);
        }
    },
    {
        id: "git",
        name: "Git Bash",
        icon: {src: "git.png", width: 22, height: 22},
        isNativeSystem: false,
        optNewWindow: false,
        //git commit -m "Phone call +55 11 9 3357-2137",
        Component: (props)=>{
            return //Git(props);
        }
    },
    {
        id: "vscode",
        name: "Visual Studio Code",
        icon: {src: "vscode.png", width: 22, height: 22},
        isNativeSystem: false,
        optNewWindow: false,
        Component: (props)=>{
            return //VScode(props);
        }
    },
    {
        id: "chrome",
        name: "Google Chrome",
        icon: {src: "chrome.png", width: 22, height: 22},
        isNativeSystem: false,
        optNewWindow: false,
        Component: (props)=>{
            return Chrome(props);
        }
    },
    {
        id: "whatsapp",
        name: "Whatsapp",
        icon: {src: "whatsapp.png", width: 22, height: 22},
        isNativeSystem: false,
        optNewWindow: true,
        url: "https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137",
        Component: (props)=>{
            return Whatsapp(props);
        }
    },
];
