import React from 'react';
import CorrectionPart from './CorrectionPart';
import { AnyCorrections } from './API';

export default function CorrectionBlock(props) {
    let anyCorrection = AnyCorrections(props.correction);
    if (anyCorrection) {
        return (
            <div key={`correction-${props.indexLine}-${props.indexCorrection}`}>
                { props.correction.map((part, indexPart) => {
                    return (
                        <CorrectionPart 
                            key={`correction-part-${indexPart}`}
                            indexLine={props.indexLine} 
                            indexCorrection={props.indexCorrection} 
                            indexPart={indexPart} 
                            part={part}/>
                    );
                }) }
            </div>
        );
    }
    else {
        return <div className="text-success">No corrections!</div>
    }
}