interface IProps{
    onClick: (event: object) => any
    className: string
    programstyles?: any
}


function Restore(props: IProps){
    return(
        <button {...props}>
            <div style={{background: props.programstyles?.programWindow}}></div>
            <div style={{background: props.programstyles?.programWindow}}></div>
        </button>
    )
}

export default Restore;