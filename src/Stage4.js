import React from 'react';
import { CalculateDiffs } from './API';
import CorrectionBlock from './CorrectionBlock';

// Stage 4 shows the user the combo of their entry and all corrections, split by sentence
export default function Stage4(props) {
    const diffs = CalculateDiffs(props.entries);

    return (
        <>
            <h4>Here are the results, grouped by sentence:</h4>
            { diffs.map((line, indexLine) => {
                return (
                    <div key={`sentence-${indexLine}`} className="correctionBlock">
                        <div>{props.originalLines[indexLine]}</div>
                        { line.map((correction, indexCorrection) => {
                            return (
                                <div key={`correction-block-${indexLine}-${indexCorrection}`}>
                                    <CorrectionBlock
                                        key={`correction-${indexLine}`}
                                        indexLine={indexLine}
                                        indexCorrection={indexCorrection}
                                        correction={correction}/>
                                </div>
                            );
                        })}
                    </div>
                );
            }) }

            <button className="btn" onClick={props.onAddCorrection}>Add Another Correction</button>
            <button className="btn" onClick={props.onSubmit}>Start Over</button>
        </>
    );
}
