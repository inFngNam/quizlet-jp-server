import React, {useRef} from 'react';
import { Modal, Form } from 'react-bootstrap';
import { convertRefToObject } from '../../helper/converRefToObj';

const UpdateFolderForm = ({
    showUpdateFolder,
    hideUpdateFolderCreateFolder,
    user,
    addToast,
    folder,
    updateFolder
}: any) => {
        const folderRef: any = useRef([]);
        const updateFolderHandle = () => {
            const input = convertRefToObject(folderRef.current)
            console.log(input)
            updateFolder(user.token, folder.id, input, addToast)
            hideUpdateFolderCreateFolder()
        }
    return (
        <Modal show={showUpdateFolder} onHide={hideUpdateFolderCreateFolder}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sửa đổi thư mục
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
                            defaultValue={folder?.name}
                            required
                        >
                        </Form.Control>
                        <Form.Control
                            placeholder="Nhập mô tả (tùy chọn)"
                            name="description"
                            ref={(el: any) => (folderRef.current['description'] = el)}
                            className="login-form"
                            defaultValue={folder?.description}
                        >
                        </Form.Control>
                        <Form.Control
                            as="select"
                            name="public"
                            ref={(el: any) => (folderRef.current['public'] = el)}
                            className="login-form"
                            defaultValue={folder?.public}
                        >
                            <option value={1}>Mọi người</option>
                            <option value={0}>Chỉ mình tôi</option>
                        </Form.Control>
                        <Form.Control
                            type="button"
                            name="update"
                            value="Xác nhận thay đổi"
                            className="login-button"
                            onClick={updateFolderHandle}
                        >
                        </Form.Control>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default React.memo(UpdateFolderForm);