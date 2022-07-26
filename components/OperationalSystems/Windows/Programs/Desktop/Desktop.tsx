
interface IProps {
    zIndex: number
    desktopVisible: Boolean
}


export default function Desktop(props: IProps) {
    const {
        zIndex,
        desktopVisible
    } = props;

    return (
        <div className="desktop" style={{zIndex: desktopVisible ? zIndex : 0}}>
            <h1>Desktop</h1>
        </div>
    )
}