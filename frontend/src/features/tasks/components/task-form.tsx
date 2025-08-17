import type {ITaskFormValue} from "../../../interfaces";
import {type FormEvent, useState} from "react";
import Select from "react-select";
import type {SingleValue} from "react-select";

interface IProps {
    handleCreateTask: (value: ITaskFormValue) => void;
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const TaskForm = (props: IProps) => {
    const [assignee, setAssignee] = useState<null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleAssigneeChange = (value: SingleValue<{ label: string, value: string }>) => {
        console.log({ value })
    }

    return (
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputEmail4"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">Description</label>
                <textarea className="form-control" id="inputPassword4"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">Assignee</label>
                <Select onChange={handleAssigneeChange} options={options} />
            </div>
            <div className="col-12 d-flex justify-content-end pt-4">
                <button type="submit" className="btn btn-primary">Create Task</button>
            </div>
        </form>
    )
}

export {TaskForm};
