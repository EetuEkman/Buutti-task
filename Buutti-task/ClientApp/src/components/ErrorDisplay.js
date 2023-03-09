import React from "react";
import FETCH_ERRORS from "../Constants/FetchErrors";

export default function ErrorDisplay(props) {
    function getErrorText(error) {
        switch (error) {
            case FETCH_ERRORS.NetworkError:
                return {
                    name: FETCH_ERRORS.NetworkError,
                    description: "Please check your network connectivity."
                }
                break;
            default:
                return {
                    name: error,
                    description: ""
                }
        }
    }

    const error = getErrorText(props.error);

    return (
        <div>
            {
                props.error.length > 0 ? <div><h1>{error.name}</h1><p>{error.description}</p></div > : null
            }
        </div>
    )
}