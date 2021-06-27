import Box from './box'

const Board = ({ onClick, value }) => (
    <div className="board">
        {[...Array(9)].map((_, pos) => <Box key={pos} name={pos} onClick={() => onClick(pos)} value={value[pos]} />)}
    </div>
)

export default Board