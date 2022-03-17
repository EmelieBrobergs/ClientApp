import React, { CSSProperties } from "react";

/** Only the slow onces will see you Monkey! */
export function Monkey() {
    return (
        <div style={{ ...centeredContent, ...fullScreen, ...dimmed }}>
            <p style={face}><span style={flip}>👂</span>👁👃👁👂</p>
            <p style={mouth}>💋</p>
            <p>Em PLM Loading...</p>
        </div>
    )
}

const dimmed: CSSProperties = {
    opacity: 0.3
}

const flip: CSSProperties = {
    display: 'inline-block',
    transform: 'rotateY(180deg)'
}

const face: CSSProperties = {
    margin: 0,
    fontSize: '2em'
}
const mouth: CSSProperties = {
    transform: 'rotateZ(30deg) translateX(-4px)',
    margin: 0,
    fontSize: '3.5em'
}

const centeredContent: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
};

const fullScreen: CSSProperties = {
    width: '100%',
    height: '100%'
}