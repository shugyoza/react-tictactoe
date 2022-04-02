// all the little square in the board
// can also be written like this
export default function Square(props) {
    const win = props.winner.length;
    const a = props.winner[1];
    const b = props.winner[2];
    const c = props.winner[3];
    const i = props.id;

    return (
        <button
        style={{color:`${win && (i === a || i === b || i === c) ? 'green' : 'black'}`}}
        className='square'
        id={props.id}
        onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}
