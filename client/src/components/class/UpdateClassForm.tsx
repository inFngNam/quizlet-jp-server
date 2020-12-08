import React, {useRef} from 'react';
import { Modal, Form } from 'react-bootstrap';
import { convertRefToObject } from '../../helper/converRefToObj';

const UpdateClassForm = ({
    showUpdateClass,
    hideUpdateClass,
    user,
    addToast,
    class_,
    updateClass
}: any) => {
        const classRef: any = useRef([]);
        const updateClassHandle = () => {
            const input = convertRefToObject(classRef.current)
            console.log(input)
            updateClass(user.token, class_.id, input, addToast)
            hideUpdateClass()
        }
    return (
        <Modal show={showUpdateClass} onHide={hideUpdateClass}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sửa đổi lớp học
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="login-form-container">
                    <Form>
                        <Form.Control
                            placeholder="Nhập tiêu đề..."
                            name="name"
                            className="login-form"
                            ref={(el: any) => (classRef.current['name'] = el)}
                            defaultValue={class_?.name}
                            required
                        >
                        </Form.Control>
                        <Form.Control
                            placeholder="Nhập mô tả (tùy chọn)"
                            name="description"
                            ref={(el: any) => (classRef.current['description'] = el)}
                            className="login-form"
                            defaultValue={class_?.description}
                        ></Form.Control>
                        <Form.Control
                            as="select"
                            name="public"
                            ref={(el: any) => (classRef.current['public'] = el)}
                            className="login-form"
                            defaultValue={class_?.public}
                        >
                            <option value={1}>Mọi người</option>
                            <option value={0}>Chỉ mình tôi</option>
                        </Form.Control>
                        <Form.Control
                            type="button"
                            name="update"
                            value="Xác nhận thay đổi"
                            className="login-button"
                            onClick={updateClassHandle}
                        >
                        </Form.Control>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default React.memo(UpdateClassForm);