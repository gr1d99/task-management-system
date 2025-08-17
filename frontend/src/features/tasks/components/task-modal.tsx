import Modal from 'react-bootstrap/Modal';
import {TaskForm} from "./task-form.tsx";
import type {ITask, ITaskFormValue} from "../../../interfaces";

interface IProps {
    task: ITask | null;
    show: boolean;
    onClose: () => void;
    handleSubmitTaskData: (value: ITaskFormValue) => void;
}

const TaskModal = (props: IProps) => {
    const { show, onClose, handleSubmitTaskData, task } = props;

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{task ? 'Update' : 'Add new'} task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm
                        task={task}
                        handleSubmitTaskData={handleSubmitTaskData} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export { TaskModal };
