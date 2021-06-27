
import React from 'react' 

export const Box = ({ name, onClick, value }) => <button name={name} className="box" onClick={onClick}>{value}</button>

export default Box