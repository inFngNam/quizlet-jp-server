import React, { useRef, useState } from 'react';
import { Modal, Button, Form, } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AccessRolePopupProps } from '../../types';
const AccessRolePopup = ({ user, showModal, closePopup, handleMax, edit }: AccessRolePopupProps) => {
    const [max, setMax] = useState("1");

    const handleChange = (e: any) => {
        setMax(e.target.value);
      } 

    return (
        <Modal show={showModal} onHide={closePopup} size="xl">
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="selectMax" >
                        <Form.Label>Quyền truy cập</Form.Label>
                        <Form.Control as="select" size="lg" custom onChange={handleChange}>
                            <option value="1" >Mọi người</option>
                            <option value="0" >Chỉ mình tôi</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button  style={{ width: "100%", backgroundColor: " #3ccfcf", border: "none" }} onClick={() => handleMax(max)} >Lưu</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(React.memo(AccessRolePopup));