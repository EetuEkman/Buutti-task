import React from "react";

export default function ErrorDisplay(props) {
    function getErrorText(error) {
        switch (error) {
            default:
                return error;
        }
    }

    return (
        <div>
            {
                props.error.length > 0 ? <div>{getErrorText(props.error)}</div > : null
            }
        </div>
    )
}