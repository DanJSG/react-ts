import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="row justify-content-center h-100 d-flex flex-column align-items-center">
            <div className="spinner-rainbow">
                <div style={{height: "12rem", width: "12rem"}} className="spinner-grow"/>
            </div>
            <h1 className="font-weight-light ml-4 mt-4">Logging you in...</h1>
        </div>
    );
}

export default Loading;
