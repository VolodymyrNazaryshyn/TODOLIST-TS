import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        e.key === "Enter" && addTask();
    }

    function addTask() {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <TextField
                label="Type value"
                error={!!error}
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                helperText={error}
            />
            <IconButton onClick={addTask} color="primary"><ControlPoint /></IconButton>
        </div>
    );
}
