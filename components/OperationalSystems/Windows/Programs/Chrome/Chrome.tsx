import { useEffect, useState } from "react";
import styles from "./Chrome.module.scss";
import useFetch from "../../../../hooks/useFetch";


const imagePath = "/Windows";

function Chrome(props){
    const {program, statePrograms, setStatePrograms, closeProgram, windowHeader} = props;
    const [url, setUrl] = useState("https://www.google.com");
    const {resource, ready} = useFetch(url);
    const [searchValue, setSearchValue] = useState("");
    const [tabSize, setTabSize] = useState(188);
    const [mementoTabs, setMementoTabs] = useState([]);


    const blankResource = `<div className="blank-page"></div>`

    const [tabs, setTabs] = useState([{
        id: 0,
        active: true,
        favicon: `${imagePath}/blank_tab.png`, 
        title: "New Tab", 
        resource: blankResource,
        url: "about:blank",
        placeholder: "about:blank"
    }]);


    useEffect(() => {
        if(ready){
            program.ready = true;
            setStatePrograms([...statePrograms]);
        }
        handleFocus();
    }, [ready]);


    useEffect(() => {
        if(document.querySelector(".chrome-tab title")){
            const favicon = document.querySelector(".chrome-tab [rel=icon]")?.getAttribute("href");
            const favicon2 = document.querySelector(".chrome-tab [itemprop=image]")?.getAttribute("content");

            const id = tabs.length;
            const newPage = {
                id: id,
                active: true,
                favicon: favicon || favicon2,
                title: (document.querySelector(".chrome-tab title") as HTMLElement)?.innerText,
                resource: resource || "",
                url: url,
                placeholder: "about:blank"
            };
            tabs.push(newPage);
            
            setTabs(tabs);
        }
    }, [document.querySelector(".chrome-tab")?.children]);

    
    function handleFocus(){
        const inputSearch = (document.querySelector("#chrome__search") as HTMLElement);
        if(inputSearch){
            inputSearch.focus();
        }
    }

    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        
        if(tabs.length > 0){
            const searchInfo = `https://www.google.com/search?q=${searchValue}`;
            const seachUservalue = regex.test(searchValue) ? searchInfo : searchValue;
            const id = tabs.length - 1;

            const newBlankTab = {
                id: id,
                active: true,
                favicon: `${imagePath}/blank_tab.png`,
                title: "New Tab", 
                resource: await resource, 
                url: seachUservalue,
                placeholder: "about:blank"
            };
            tabs.push(newBlankTab);
            handleActiveTab(id);
        } else {
            const activeTab = tabs.findIndex(item=>item.active);
            if(activeTab > -1){
                tabs[activeTab].resource = await resource;
                handleActiveTab(tabs[activeTab].id);
            }
        }
        
        setUrl(searchValue);
        setTabs(tabs);
    }

    const handlePageLocalNavigation = (event) => {
        const regex = /http|wwww/;
        if(regex.test(event.target.value)){
            event.preventDefault();
            setUrl(event.target.href);
            // setTabs([...tabs, url: event.target.href]);
        } else {
            const defaultSearch = `https://www.google.com/search?q=${event.target.value}`;
            setUrl(defaultSearch);
            // setTabs([...tabs, url: event.target.href]);
        }
    };


    const adjustTabWidthUI = () => {
        const tabsQuantity = tabs.length;
        const windowSpace = (window.innerWidth - 20) * 0.8;
        const tabSize = windowSpace / tabsQuantity;
        setTabSize(tabSize);
    }


    const handleActiveTab = (id?) => {
        // const updatedTabs = tabs.map(item => item.id === id ? ({...item, active: true}) : ({...item, active: false}));
        const updatedTabs = tabs.map((item, index, array) => {
            if(item.id === id){
                item.active = true;
            } else {
                item.active = false;
                if(array.length){
                    array[array.length - 1].active = true;
                }
            }
            return item;
        });
        setTabs(updatedTabs);
    }

    const handleCloseTab = (id)=>{
        const itemIndex = tabs.indexOf(id);
        
        if(tabs.length > 1){
            tabs.splice(itemIndex, 1);
            setTabs(tabs);
            handleActiveTab(id);
            adjustTabWidthUI();
        } else {
            closeProgram(program);
        }
    }

    const handleMouseDown = (event, id)=>{
        if(event.button === 1){
            handleCloseTab(id);
        }
    }

    const handleNewTab = ()=>{
        const id = tabs.length;

        const newBlankTab = {
            id: id,
            active: true,
            favicon: `${imagePath}/blank_tab.png`,
            title: "New Tab", 
            resource: blankResource, 
            url: "about:blank",
            placeholder: "about:blank"
        };
        tabs.push(newBlankTab);
        setTabs(tabs);
        handleActiveTab(id);
        adjustTabWidthUI();
        handleFocus();
    }

    const tabCurveUI = (side: String) => <span className={`${styles["chrome__sub_tab-curve"]} ${styles["chrome__sub_tab-curve-"+side]}`}>
            <span></span>
        </span>;
    

    return (
       <>
            {windowHeader(program, styles)}
            <div className={styles.chrome}>
                {<div className={styles.chrome__sub_header}>
                    <ul className={styles.chrome__sub_tabs}>
                        {
                            tabs.map((tab, index)=>{
                                return (
                                    <li 
                                        key={index}
                                        style={{width: tabSize}}
                                        className={`${styles.chrome__sub_tab} ${tab.active ? styles["chrome__sub_tab--active"] : ""}`}
                                        onClick={()=>{handleActiveTab(index)}}
                                        onMouseDown={(event)=>handleMouseDown(event, index)}
                                    >
                                        <span className={styles.chrome__favicon}>
                                            <img src={tab.favicon} alt={`favicon ${tab.favicon}`} />
                                        </span>
                                        <span className={styles.chrome__sub_tab__title}>{tab.title}</span>
                                        <button className={styles.chrome__icon__close} onClick={()=>{handleCloseTab(index)}}>
                                            <div></div>
                                            <div></div>
                                        </button>
                                        {
                                            tab ? 
                                                <>  
                                                    {tabCurveUI("left")}
                                                    {tabCurveUI("right")}
                                                </> :
                                                null
                                        }
                                    </li>
                                )
                            })
                        }
                       <li className={`create-new-tab ${styles.chrome__newtab}`}>
                            <button onClick={handleNewTab} className={styles.chrome__icon__newtab}>
                                <div></div>
                                <div></div>
                            </button>
                       </li>
                    </ul>
    
                    {
                        tabs.filter(tab=>tab.active)
                        .map((tab, index)=>{
                            return (
                            <div  key={index} className={styles.chrome__search__wrapper}>
                                <form className={styles.chrome__search__form} onSubmit={handleSubmit}>
                                    <i className="fas fa-info"></i>
                                    <input
                                        id="chrome__search"
                                        className={styles.chrome__search}
                                        type="text" 
                                        placeholder={tab.placeholder || "Search in Google or type URL"}
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                    />
                                </form>
                            </div>
                            )
                        })
                    }
                    <div className={styles.chrome__bookmarks}></div>
                </div>}
    
                {
                    tabs.map((tab, index)=>{
                        return (
                            <div 
                                key={index}
                                className={`chrome-tab ${styles.chrome__window} ${tab.active ? styles["chrome__window--active"] : ""}`}
                                onClick={handlePageLocalNavigation} 
                                dangerouslySetInnerHTML={{__html: tab.resource}} 
                            />
                        )
                    })
                }
                
            </div>
       </>
    )
}

export default Chrome;