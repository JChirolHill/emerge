import React from "react";

export default function InputArea(props) {
    return (
        <div>
            <h4>{props.instructions}</h4>
            <div>
                <textarea 
                    className={`w-100 ${props.spaced && 'spaced-vertically'}`}
                    rows={props.rows ?? 8}
                    value={props.inputText}
                    onChange={props.onInput}
                    wrap={props.nowrap ? 'off' : 'on'}></textarea>
            </div>
        </div>
    );
}
