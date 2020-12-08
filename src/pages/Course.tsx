import React, { useState } from 'react';
import HeaderPage from '../components/layouts/Header'
import { Redirect } from 'react-router-dom';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccessRolePopup from "../components/layouts/AccessRolePopup";
import { addModule, allModules } from '../redux/actions/moduleAction';
import { useToasts } from "react-toast-notifications";
import { convertRefToObject } from '../helper/converRefToObj';

const Course = ({ module, allModules, user, addModule, showAddCourse, closeCoursePopup, handleAddd }: any) => {


    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [publicc, setPublicc] = useState(1);
    const [formData, setFormData] = useState({ title: "", description: "", publicc: 1, maxscore: "" });
    const { addToast } = useToasts();

    const handleMax = (max: any) => {
        setShowModal(false);
        if (max === "1") setPublicc(1);
        if (max === "0") setPublicc(0);

    }

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    }

    const closePopup = () => {
        setShowModal(false);
    };
    const openPopup = () => {
        setShowModal(true);
    };

    const handleSubmit = (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            console.log("validatefalse");
        }
        else {


            e.preventDefault();

            const data1 = { ...formData, publicc };
            const data = {
                name: data1.title,
                public: !!data1.publicc,
                max_score: Number(data1.maxscore),
                description: data1.description,
            };
            // console.log(data);
            
            handleAddd();
            // const credential = convertRefToObject(loginRef.current);
            console.log(data);
            addModule(user.token, addToast, data);
      
            setFormData({ title: "", description: "", publicc: 1, maxscore: "" });
            setPublicc(1);
            

        }

        setValidated(true);
    }

    return (
        // <React.Fragment>
        //     <HeaderPage />
        <Modal show={showAddCourse} onHide={closeCoursePopup} dialogClassName="my-modal">
            <Modal.Body>
                <div className="course-container">
                    <Col md={12}>
                        <Row style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="add-new-course-text">
                                Tạo học phần mới
                        </div>
                            <div>
                                <button className="add-c" type="submit" form="thisform" >Tạo </button>
                            </div>
                        </Row>
                    </Col>


                    <Col md={7} >
                        <div className="login-form-container" >
                            <Form id="thisform" noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group as={Col}>
                                    <Form.Label>Tiêu đề</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề..."
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

                                <Form.Group as={Col}>
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Thêm mô tả..."
                                        name="description"
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black" }}
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Bạn phải nhập mô tả.
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Điểm tối đa</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Nhập điểm tối đa..."
                                        name="maxscore"
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black", width: "15rem" }}
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Bạn phải nhập điểm tối đa
                                </Form.Control.Feedback>
                                </Form.Group>

                            </Form>
                        </div>
                    </Col>

                    <Col md={12}>
                        <AccessRolePopup showModal={showModal} closePopup={closePopup} handleMax={handleMax} />
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


                </div>
            </Modal.Body>

        </Modal >
        // </React.Fragment>

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
        allModules: (token: String) => dispatch(),
        addModule: (token: String, addToast: any, data: object) => dispatch(addModule(token, addToast, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Course));