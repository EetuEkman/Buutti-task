import React from "react";

export default function BookButtons(props) {
    function onSavePointerDown(event) {
        props.saveBook();
    }

    function onUpdatePointerDown(event) {
        props.updateBook();
    }

    function onDeletePointerDown(event) {
        props.deleteBook();
    }
    return (
        <div className="book-buttons">
            props.isWorking ? 
            <>
                <button onPointerDown={onSavePointerDown}>Save new</button>
                <button onPointerDown={onUpdatePointerDown}>Save</button>
                <button onPointerDown={onDeletePointerDown}>Delete</button>
            </>
            :
            <>
                <button disabled>Save new</button>
                <button disabled>Save</button>
                <button disabled>Delete</button>
            </>
        </div>
    )
}