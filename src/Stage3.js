import React, { useState, useEffect } from 'react';
import InputArea from './InputArea';
import { SplitLinesFromRaw, CountLinesRaw, TrimSentence } from './API';

// Stage 3 shows users each correction so they can correctly split by line
// Only moves to stage 4 when all lines are correctly split up
export default function Stage3(props) {
    const [raw, setRaw] = useState(props.inputText.join('\n'));
    const [numLinesRaw, setNumLinesRaw] = useState(CountLinesRaw(raw));
    const [linesEqual, setLinesEqual] = useState(props.originalLines.length === numLinesRaw);

    useEffect(() => {
        const tempRaw = props.inputText.join('\n');
        setRaw(tempRaw);
        const tempNumLinesRaw = CountLinesRaw(tempRaw)
        setNumLinesRaw(tempNumLinesRaw);
        setLinesEqual(props.originalLines.length === tempNumLinesRaw);
    }, [props.inputText, props.originalLines]);

    return (
        <div>
            <h4 className="mb-3">Add/remove new lines (return key) until the number of lines matches that of the original:</h4>
            <h4>{props.currCorrectionIndex}/{props.totalCorrections} Corrections</h4>

            <div className="row">
                <div className="col-12 col-md-6 text-end divider">
                    <h3>Original</h3>
                    <div style={{marginTop: '10px'}} className="text-start overflow-auto text-nowrap">
                        { props.originalLines.map((line, index) => {
                            return (<div key={`orig-line-${index}`} className="spaced-vertically">{(line)}</div>)
                        })}
                    </div>
                </div>
                <div className="col-12 col-md-6 text-start">
                    <h3>Correction</h3>
                    <InputArea
                        spaced={true}
                        inputText={raw}
                        rows={props.originalLines.length}
                        onInput={handleInput}
                        nowrap={true}/>
                </div>
            </div>

            <div className="row">
                <div className={`col-6 text-end divider ${linesEqual ? 'text-success' : 'text-danger'}`}>
                    {`${props.originalLines.length} lines`}
                </div>
                <div className={`col-6 text-start ${linesEqual ? 'text-success' : 'text-danger'}`}>
                    {`${numLinesRaw} lines`}
                </div>
            </div>

            <button className="btn" onClick={handleReset}>Reset</button>
            {props.originalLines.length === numLinesRaw && <button className="btn" onClick={handleSubmit}>Continue</button>}
        </div>
    );

    function handleInput(event) {
        console.log(event);
        setRaw(event.target.value);

        let updatedLines = CountLinesRaw(event.target.value);
        setNumLinesRaw(updatedLines);
        setLinesEqual(props.originalLines.length === updatedLines);
    }

    function handleSubmit() {
        if (props.originalLines.length === numLinesRaw) {
            props.onSubmit(SplitLinesFromRaw(raw));
        }
        // TODO else do error message
    }

    function handleReset() {
        setRaw(props.inputText.join('\n'));
    }
}
