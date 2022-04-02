export default function MoveButton(props) {
    if (props.bold) {
        return (
            <li key={props.id}>
                <button style={{fontWeight:'bolder'}} id={props.id} onClick={props.jumpTo}>{props.desc}</button>
                <button key={`undo-${props.id}`} id={`undo-${props.id}`} onClick={props.undo}>Undo</button>
            </li>
        )
    }
    return (
            <li key={props.id}>
                <button id={props.id} onClick={props.jumpTo}>{props.desc}</button>
            </li>
    )
}
