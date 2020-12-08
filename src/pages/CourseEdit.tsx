import React, { useState } from 'react';
import HeaderPage from '../components/layouts/Header'
import { Redirect } from 'react-router-dom';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccessRolePopup from "../components/layouts/AccessRolePopup";
import { editModule } from '../redux/actions/moduleAction';
import { useToasts } from "react-toast-notifications";

const CourseEdit = ({ module, user, addModule, showAddCourse, closeCoursePopup, handleAddd, currentModule, editModule }: any) => {

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [publicc, setPublicc] = useState(currentModule.public);
    const [name, setName] = useState(currentModule.name);
    const [formData, setFormData] = useState({ title: "", publicc: 1 });
    const { addToast } = useToasts();

    const handleMax = (max: any) => {
        setShowModal(false);
        if (max === "1") setPublicc(1);
        if (max === "0") setPublicc(0);

    }

    const handleChange = (e: any) => {
        setName(e.target.value);
    }

    const closePopup = () => {
        setShowModal(false);
    };
    const openPopup = () => {
        setShowModal(true);
    };

    const handleSubmit = (e: any) => {
        console.log("is oke")
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            console.log("validatefalse");
        }
        else {
            e.preventDefault();
            const data = {
                name,
                publicc,
            };

            console.log(data);
        
            editModule(user.token, addToast, currentModule.id, data);
        }

        setValidated(true);
    }

    return (

        <Modal show={showAddCourse} onHide={closeCoursePopup} dialogClassName="my-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit học phần</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col md={7} >
                    <div className="login-form-container" >
                        <Form id="thatform" noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group as={Col}>
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tiêu đề..."
                                    value={name}
                                    name="title"
                                    className="login-form"
                                    required
                                    style={{ borderBottomColor: "black" }}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Bạn phải nhập tiêu đề.
                                </Form.Control.Feedback>
                            </Form.Group>


                        </Form>
                    </div>
                </Col>

                <Col md={12}>
                    <AccessRolePopup showModal={showModal} closePopup={closePopup} handleMax={handleMax} edit={currentModule} />
                    <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ fontWeight: "bold", marginRight: "2rem", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <div style={{ fontSize: "1.5rem", display: "flex" }}>
                                <div>Quyền truy cập: </div>
                                {
                                    (publicc === 1) ? (
                                        <div style={{ marginLeft: "1rem", color: "#3ccfcf", fontSize: "1.7rem" }}>Mọi người</div>
                                    ) : null

                                }
                                {
                                    (publicc === 0) ? (
                                        <div style={{ marginLeft: "1rem", color: "#3ccfcf", fontSize: "1.7rem" }}>Chỉ mình tôi</div>
                                    ) : null
                                }
                            </div>
                            <div className="thaydoi" onClick={openPopup} style={{ fontSize: "1rem" }}>
                                Thay đổi
                            </div>
                        </div>
                    </Row>

                </Col>

            </Modal.Body>
            <Modal.Footer>
                <Button style={{ width: "100%", backgroundColor: " #3ccfcf", border: "none" }} type="submit" form="thatform">Lưu</Button>
            </Modal.Footer>

        </Modal >
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        module: state.module
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        editModule: (token: String, addToast: any, id: any, data: object) => dispatch(editModule(token, addToast, id, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CourseEdit));