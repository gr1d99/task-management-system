import type {ITask} from "../../../interfaces";

const TaskItem = ({task, onEditClick}: { task: ITask, onEditClick: (task: ITask) => void }) => {
    const handleEditClick = () => {
        onEditClick(task);
    }

    return (
        <div className="card mb-2">
            <div className="card-body py-2">
                <h5>{task.title}</h5>
                <div className="border-bottom"></div>
                <div className="pt-4">
                    <p>{task.description}</p>
                </div>
            </div>
            <div className="card-footer d-flex gap-2 justify-content-end">
                <button className="btn btn-secondary btn-sm" onClick={handleEditClick}>Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
            </div>
        </div>
    )
}

export {TaskItem}
