import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import Select, {type SingleValue} from "react-select";

import type {ITask, ITaskFormValue} from "../../../interfaces";

import {useAppDispatch, useAppSelector} from "../../../store";
import {selectUsersOptions} from "../../users/users-slice.ts";
import {clearError, selectStatusesOptions} from "../tasks-slice.ts";

interface IProps {
    task: ITask | null;
    handleSubmitTaskData: (value: ITaskFormValue) => void;
}

const TaskForm = ({handleSubmitTaskData, task}: IProps) => {
    const usersState = useAppSelector(state => state.users);
    const statuses = useAppSelector(state => state.tasks.statusesList);

    const [formState, setFormState] = useState<ITaskFormValue>(() => {
        let assignee = null;
        let status = null;

        if (usersState.data.length > 0 && task?.assigneeId) {
            const user = usersState.data.find(user => user.id.toString() === task.assigneeId.toString());

            if (user) {
                assignee = {
                    label: user.email,
                    value: user.id
                }
            }
        }

        if (statuses.length > 0 && task?.statusId) {
            const statusObj = statuses.find(s => s.id.toString() === task.statusId.toString());

            if (statusObj) {
                status = {
                    label: statusObj.name,
                    value: statusObj.id.toString()
                }
            }
        }

        if (!task && statuses.length > 0) {
            const todo = statuses.find(s => s.name.toLowerCase() === 'todo');

            if (todo) {
                status = {
                    label: todo.name,
                    value: todo.id.toString()
                }
            }
        }

        return {
            token: task?.token ?? '',
            title: task?.title ?? '',
            description: task?.description ?? '',
            assignee,
            status
        }
    });

    const dispatch = useAppDispatch();
    const usersOptions = useAppSelector(selectUsersOptions);
    const statusesOptions = useAppSelector(selectStatusesOptions);
    const {loading, taskCreated} = useAppSelector(state => state.tasks);

    useEffect(() => {
        dispatch(clearError());
    }, []);

    useEffect(() => {
        if (!loading && taskCreated) {
            const form = document.getElementById('task-form') as (HTMLFormElement | undefined);

            if (form !== undefined) {
                form.reset();
            }
        }

    }, [loading, taskCreated]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleSubmitTaskData(formState)
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;

        setFormState(state => ({...state, [name]: value}))
    }

    const handleAssigneeSelectChange = (value: SingleValue<{ label: string; value: string; }>) => {
        setFormState(state => ({...state, assignee: value}))
    }

    const handleStatusSelectChange = (value: SingleValue<{ label: string; value: string; }>) => {
        setFormState(state => ({...state, status: value}))
    }

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;

        setFormState(state => {
            return {...state, [name]: value}
        })
    }

    return (
        <form id='task-form' className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">Title</label>
                <input
                    value={formState.title}
                    onChange={handleInputChange}
                    required
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    value={formState.description}
                    onChange={handleTextareaChange}
                    name="description"
                    className="form-control"
                    id="description"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="assignee" className="form-label">Assignee</label>
                <Select
                    value={formState.assignee}
                    required
                    id="assignee"
                    name="assignee"
                    isClearable
                    options={usersOptions}
                    onChange={handleAssigneeSelectChange}
                    isLoading={usersState.loading}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="status" className="form-label">Status</label>
                <Select
                    value={formState.status}
                    required
                    id="assignee"
                    name="assignee"
                    isDisabled={!task}
                    isClearable
                    options={statusesOptions}
                    onChange={handleStatusSelectChange}
                    isLoading={usersState.loading}/>
            </div>
            <div className="col-12 d-flex justify-content-end pt-4">
                <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-primary">{task ? 'Update' : 'Create'} Task
                </button>
            </div>
        </form>
    )
}

export {TaskForm};
