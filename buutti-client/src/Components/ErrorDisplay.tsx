import React from "react";
import FETCH_ERRORS from "../Constants/FetchErrors";

interface Props {
    error: string;
}

export default function ErrorDisplay(props: Props) {
    function getErrorText(error: string) {
        switch (error) {
            case FETCH_ERRORS.NetworkError:
                return {
                    name: FETCH_ERRORS.NetworkError,
                    description: "Please check your network connectivity."
                }
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