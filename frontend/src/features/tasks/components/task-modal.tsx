import Modal from 'react-bootstrap/Modal';
import {TaskForm} from "./task-form.tsx";
import type {ITaskFormValue} from "../../../interfaces";

interface IProps {
    show: boolean;
    onClose: () => void;
    handleCreateTask: (value: ITaskFormValue) => void;
}

const TaskModal = (props: IProps) => {
    const { show, onClose, handleCreateTask } = props;

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm handleSubmit={handleCreateTask} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export { TaskModal };
