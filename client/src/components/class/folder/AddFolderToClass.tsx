import React, { useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { convertRefToObject } from '../../../helper/converRefToObj';

const AddFolderToClass = ({
    user,
    folders,
    showAddFolder,
    hideAddFolderModal,
    createFolderInClass,
    assignFolderToClass,
    classItem,
    addToast
}: any) => {
    const folderRef: any = useRef([]);
    const createFolderInClassHandle = () => {
        const input = convertRefToObject(folderRef.current);
        createFolderInClass(user.token, classItem.id, classItem.code, input, addToast)
        hideAddFolderModal()
    }
    const assignFolderToClassHandle = (folder_id: number) => {
        assignFolderToClass(user.token, folder_id, classItem.id, addToast)
        hideAddFolderModal()
    }
    return (
        <Modal show={showAddFolder} onHide={hideAddFolderModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm thư mục
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
                            ref={(el: any) => (folderRef.current['name'] = el)}
                            required
                        />
                        <Form.Control
                            placeholder="Nhập mô tả (tùy chọn)"
                            name="description"
                            ref={(el: any) => (folderRef.current['description'] = el)}
                            className="login-form"
                        />
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
                            onClick={createFolderInClassHandle}
                        >
                        </Form.Control>
                    </Form>
                    <div className="create-option">
                        <h4>Thư mục của bạn</h4>
                        <div className="import-modules">
                            {folders && folders.list.length > 0 ? folders.list.map((item: any, i: any) => (
                                <div key={i} className="your-module">
                                    {item.name}
                                    <Button onClick={() => assignFolderToClassHandle(item.id)}>+</Button>
                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default React.memo(AddFolderToClass);
