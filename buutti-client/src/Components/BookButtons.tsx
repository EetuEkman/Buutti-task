import React from "react";

interface Props {
    saveBook: () => Promise<void>;
    updateBook: () => Promise<void>;
    deleteBook: () => Promise<void>;
    isWorking: boolean;
}
export default function BookButtons(props: Props) {
    function onSavePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        props.saveBook();
    }

    function onUpdatePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        props.updateBook();
    }

    function onDeletePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        props.deleteBook();
    }

    return (
        <div className="book-buttons">
            {
                props.isWorking ?
                    <>
                        <button disabled>Save new</button>
                        <button disabled>Save</button>
                        <button disabled>Delete</button>
                    </>
                    :
                    <>
                        <button onPointerDown={onSavePointerDown}>Save new</button>
                        <button onPointerDown={onUpdatePointerDown}>Save</button>
                        <button onPointerDown={onDeletePointerDown}>Delete</button>
                    </>
            }
        </div>
    )
}