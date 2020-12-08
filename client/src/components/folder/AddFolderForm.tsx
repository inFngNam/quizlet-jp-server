import React, { useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { convertRefToObject } from '../../helper/converRefToObj';

const AddFolderForm = ({
    showAddFolder,
    hideAddFolder,
    createFolder,
    user,
    addToast
}: any) => {
    const folderRef: any = useRef([]);
    const createFolderHandle = () => {
        const input = convertRefToObject(folderRef.current)
        createFolder(user.token, input, addToast)
        hideAddFolder()
    }
    return (
        <Modal show={showAddFolder} onHide={hideAddFolder}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm thư mục mới
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="login-form-container">
                    <Form>
                        <Form.Control
                            placeholder="Nhập tiêu đề..."
                            name="name"
                            className="login-form"
                            ref={(el: any) => (folderRef.current['name'] = el)}
                            required
                        >
                        </Form.Control>
                        <Form.Control
                            placeholder="Nhập mô tả (tùy chọn)"
                            name="description"
                            ref={(el: any) => (folderRef.current['description'] = el)}
                            className="login-form"
                        >
                        </Form.Control>
                        <Form.Control
                            as="select"
                            name="public"
                            ref={(el: any) => (folderRef.current['public'] = el)}
                            className="login-form"
                            defaultValue={1}
                        >
                            <option value={1}>Mọi người</option>
                            <option value={0}>Chỉ mình tôi</option>
                        </Form.Control>
                        <Form.Control
                            type="button"
                            name="create"
                            value="Tạo thư mục"
                            className="login-button"
                            onClick={createFolderHandle}
                        >
                        </Form.Control>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default AddFolderForm;