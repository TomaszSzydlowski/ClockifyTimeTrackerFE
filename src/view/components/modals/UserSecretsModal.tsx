import { Button, Modal } from 'antd'
import React, {FC, useState} from 'react'

export const UserSecretModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
        Open Modal
    </Button>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    </Modal>
    </>
);
};

