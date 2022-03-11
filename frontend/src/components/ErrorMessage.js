import React from 'react'

const ErrorMessage = ({ children }) => {
    return (
        <div className="error-cont">
            <strong>{ children }</strong>
        </div>
    );
};

export default ErrorMessage
