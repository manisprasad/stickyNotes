import React from 'react';
import './Loading.css';
import "../../index.css"

const Loading = () => {
    return (
        <div className="loader-container show z-500">
            <div className="loader"></div>
        </div>
    );
};

export default Loading;