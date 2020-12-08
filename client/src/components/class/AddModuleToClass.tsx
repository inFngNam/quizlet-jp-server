import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { convertRefToObject } from '../../helper/converRefToObj';

const AddModuleToClass = ({
    showAddModule,
    hideAddModuleModal,
    user,
    addToast,
    module,
    class_,
    assignModuleToClass,
    createModuleInClass
}: any) => {
    const moduleRef: any = useRef([]);
    const addNewModuleHandle = () => {
        const input = convertRefToObject(moduleRef.current)
        // console.log(input)
        createModuleInClass(user.token, class_.id, class_.code, input, addToast)
        hideAddModuleModal()
    }
    const assignModuleToClassHandle = (module_id: number) => {
        assignModuleToClass(user.token, module_id, class_.id, addToast);
        hideAddModuleModal();
    }
    return (
        <Modal show={showAddModule} onHide={hideAddModuleModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm học phần
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="add-module-folder-container">
                    <div className="create-option">
                        <h4>Tạo mới</h4>
                    </div>
                    <Form>
                        <Form.Control
                            placeholder="Nhập tiêu đề..."
                            name="name"
                            className="login-form"
                            ref={(el: any) => (moduleRef.current['name'] = el)}
                            required
                        >
                        </Form.Control>
                        <Form.Control
                            placeholder="Nhập mô tả (tùy chọn)"
                            name="description"
                            ref={(el: any) => (moduleRef.current['description'] = el)}
                            className="login-form"
                        >
                        </Form.Control>
                        <Form.Control
                            type="number"
                            className="login-form"
                            placeholder="Điểm học phần tối đa..."
                            ref={(el: any) => (moduleRef.current['max_score'] = el)}
                            min={0}
                        ></Form.Control>
                        <Form.Control
                            as="select"
                            name="public"
                            ref={(el: any) => (moduleRef.current['public'] = el)}
                            className="login-form"
                            defaultValue={1}
                        >
                            <option value={1}>Mọi người</option>
                            <option value={0}>Chỉ mình tôi</option>
                        </Form.Control>
                        <Form.Control
                            type="button"
                            name="create"
                            value="Tạo học phần"
                            className="login-button"
                            onClick={addNewModuleHandle}
                        >
                        </Form.Control>
                    </Form>
                    <div className="create-option">
                        <h4>Học phần của bạn</h4>
                        <div className="import-modules">
                            {module && module.list.length > 0 ? module.list.map((item: any, i: any) => (
                                <div key={i} className="your-module">
                                    {item.name}
                                    <Button onClick={() => assignModuleToClassHandle(item.id)}>+</Button>
                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddModuleToClass;
