interface IProps{
    onClick: () => void;
    className: string;
}


function Minimize(props: IProps){
    return(
        <button {...props}>
            <div></div>
        </button>
    )
}

export default Minimize;