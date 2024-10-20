import React from 'react';

export default function CorrectionPart(props) {
    return (
        <span 
            key={`part-${props.indexLine}-${props.indexCorrection}-${props.indexPart}`} 
            className={props.part.added ? 'correction-added' : props.part.removed ? 'correction-removed' : 'correction-same'}>
                {props.part.value}
        </span>
    );
}