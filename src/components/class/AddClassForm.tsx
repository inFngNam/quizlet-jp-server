import React, { useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { convertRefToObject } from '../../helper/converRefToObj';

const AddClassForm = ({
    showAddClass,
    hideAddClass,
    createClass,
    user,
    addToast,
}: any) => {
    const classRef: any = useRef([]);
    const createClassHandle = () => {
        const input = convertRefToObject(classRef.current)
        createClass(user.token, input, addToast)
        hideAddClass()
    }
    return (
        <Modal show={showAddClass} onHide={hideAddClass}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm class mới
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="login-form-container">
                    <Form>
                        <Form.Control
                            placeholder="Nhập tên lớp học..."
                            name="name"
                            className="login-form"
                            ref={(el: any) => (classRef.current['name'] = el)}
                            required
                        >
                        </Form.Control>
                        <Form.Control
                            placeholder="Mô tả..."
                            name="name"
                            className="login-form"
                            ref={(el: any) => (classRef.current['description'] = el)}
                            required
                        ></Form.Control>
                        <Form.Control
                            as="select"
                            name="public"
                            ref={(el: any) => (classRef.current['public'] = el)}
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
                            onClick={createClassHandle}
                        >
                        </Form.Control>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default AddClassForm;