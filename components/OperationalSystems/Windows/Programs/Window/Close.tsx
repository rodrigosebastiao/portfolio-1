interface IProps{
    onClick: () => void;
    className: string;
}


function Close(props: IProps){
    return(
        <button {...props}>
            <div></div>
            <div></div>
        </button>
    )
}

export default Close;