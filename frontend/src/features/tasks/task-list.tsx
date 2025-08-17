import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TaskModal} from "./components/task-modal.tsx";
import type {ITask, ITaskFormValue} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../store";
import {fetchUsersAsync} from "../users/users-slice.ts";
import {
    createTaskAsync,
    fetchTasksAsync,
    fetchTaskStatusesAsync,
    selectGroupedTasks,
    updateTaskAsync
} from "./tasks-slice.ts";
import {hideNotfication, showNotification} from "../alerts/notification-slice.ts";
import {TaskItem} from "./components/task-item.tsx";

const TaskList = () => {
    const {loading: isTaskLoading, taskCreated, taskUpdated} = useAppSelector(state => state.tasks);
    const groupedTasks = useAppSelector(selectGroupedTasks);

    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);

    useEffect(() => {
        dispatch(fetchUsersAsync({page: 1, limit: 1000}));
        dispatch(fetchTasksAsync({ page: 1, limit: 1000 }));
        dispatch(fetchTaskStatusesAsync({page: 1, limit: 1000}));
    }, []);

    useEffect(() => {
        if (!isTaskLoading && taskCreated) {
            dispatch(showNotification('Task created!'));

            setTimeout(() => {
                dispatch(hideNotfication());
            }, 300);
        }

        if (!isTaskLoading && taskUpdated) {
            dispatch(showNotification('Task updated!'));

            setTimeout(() => {
                dispatch(hideNotfication());
            }, 300);
        }
    }, [isTaskLoading, taskCreated, dispatch, taskUpdated]);

    const handleToggleModal = () => {
        setShow(state => {
            return !state;
        });
    }

    const handleCreateTask = (value: ITaskFormValue) => {
        if (taskToEdit) {
            dispatch(updateTaskAsync(value)).then(() => {
                handleToggleModal();
            })
        } else {
            dispatch(createTaskAsync(value)).then(() => {
                handleToggleModal();
            });
        }
    }

    const handleEditTask = (task: ITask) => {
        handleToggleModal();

        setTaskToEdit(task);
    }

    return (
        <>
            <div className="container-fluid mt-4">
                <div className="col-12 pb-4 d-flex justify-content-end">
                    <Button onClick={handleToggleModal} type='button' variant="primary">Add Task</Button>
                </div>
                <div className="row g-3">
                    {/* TODO Column */}
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-header bg-danger text-white text-center">
                                <h5 className="card-title mb-0">TODO</h5>
                            </div>
                            <div className="card-body">
                                {groupedTasks['TODO']?.map((task) => (
                                    <TaskItem
                                        onEditClick={handleEditTask}
                                        task={task}
                                        key={task.token} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-header bg-warning text-dark text-center">
                                <h5 className="card-title mb-0">IN PROGRESS</h5>
                            </div>
                            <div className="card-body">
                                {groupedTasks['IN_PROGRESS']?.map((task) => (
                                    <TaskItem
                                        onEditClick={handleEditTask}
                                        task={task}
                                        key={task.token} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-header bg-success text-white text-center">
                                <h5 className="card-title mb-0">DONE</h5>
                            </div>
                            <div className="card-body">
                                {groupedTasks['DONE']?.map((task) => (
                                    <TaskItem
                                        onEditClick={handleEditTask}
                                        task={task}
                                        key={task.token} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TaskModal
                task={taskToEdit}
                show={show}
                onClose={handleToggleModal}
                handleSubmitTaskData={handleCreateTask}
            />
        </>
    )
}

export {TaskList}
