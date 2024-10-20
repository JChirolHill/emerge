import React from 'react';
import StageManager from './StageManager';

export default function App() {
    return (
        <>
            <div className="hero text-center py-2">
                <div>
                    <h1>emerge</h1>
                </div>
            </div>
            <div className="container-fluid">
                <StageManager/>
            </div>
        </>
    );
}