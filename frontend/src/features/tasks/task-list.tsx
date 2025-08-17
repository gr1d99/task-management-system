import {Button} from "react-bootstrap";
import {useState} from "react";
import {TaskModal} from "./components/task-modal.tsx";
import type {ITaskFormValue} from "../../interfaces";

const TaskList = () => {
    const [show, setShow] = useState(false);

    const handleShowTaskModal = () => {
        setShow(!show);
    }

    const handleCreateTask = (value: ITaskFormValue) => {
        console.log({ value })
    }

    return (
        <>
            <div className="container-fluid mt-4">
                <div className="col-12 pb-4 d-flex justify-content-end">
                    <Button onClick={handleShowTaskModal} type='button' variant="primary">Add Task</Button>
                </div>
                <div className="row g-3">
                    {/* TODO Column */}
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-header bg-danger text-white text-center">
                                <h5 className="card-title mb-0">TODO</h5>
                            </div>
                            <div className="card-body">
                                {/* Task items would go here */}
                                <div className="card mb-2">
                                    <div className="card-body py-2">
                                        <small>Sample TODO task</small>
                                    </div>
                                </div>
                                <div className="card mb-2">
                                    <div className="card-body py-2">
                                        <small>Another TODO task</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* IN PROGRESS Column */}
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-header bg-warning text-dark text-center">
                                <h5 className="card-title mb-0">IN PROGRESS</h5>
                            </div>
                            <div className="card-body">
                                {/* Task items would go here */}
                                <div className="card mb-2">
                                    <div className="card-body py-2">
                                        <small>Sample in progress task</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DONE Column */}
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-header bg-success text-white text-center">
                                <h5 className="card-title mb-0">DONE</h5>
                            </div>
                            <div className="card-body">
                                {/* Task items would go here */}
                                <div className="card mb-2">
                                    <div className="card-body py-2">
                                        <small>Sample completed task</small>
                                    </div>
                                </div>
                                <div className="card mb-2">
                                    <div className="card-body py-2">
                                        <small>Another completed task</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TaskModal
                show={show}
                onClose={handleShowTaskModal}
                handleCreateTask={handleCreateTask}
            />
        </>
    )
}

export { TaskList }
