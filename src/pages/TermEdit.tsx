import React, { useState } from 'react';
import HeaderPage from '../components/layouts/Header'
import { Redirect } from 'react-router-dom';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccessRolePopup from "../components/layouts/AccessRolePopup";
import { addTerm } from '../redux/actions/termActions';
import { useToasts } from "react-toast-notifications";


import { TermPopupProps } from '../types';

const TermEdit = ({ terms, user, showAddTerm, closePopup, module_id, addTerm }: TermPopupProps) => {


    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ question: "", explain: "", score: 0 });
    const { addToast } = useToasts();

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    }


    const handleSubmit = (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            console.log("validatefalse");
        }
        else {
            e.preventDefault();
            const data = {
                question: formData.question,
                explain: formData.explain,
                score: formData.score,
                module_id: Number(module_id),
            };

            console.log(data);
            closePopup();
            addTerm(user.token, addToast, data);
            setFormData({ question: "", explain: "", score: 0 });
        }

        setValidated(true);
    }

    return (

        <Modal show={showAddTerm} onHide={closePopup} dialogClassName="my-modal">
            <Modal.Body>
                <div className="course-container">
                    <Col md={12}>
                        <Row style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="add-new-course-text">
                                Tạo thuật ngữ mới
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
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Question..."
                                        name="question"
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black" }}
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Không được bỏ trống.
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Explain</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Explain..."
                                        name="explain"
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black" }}
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Không được bỏ trống.
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Score..."
                                        name="score"
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black", width: "15rem" }}
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Không được bỏ trống.
                                </Form.Control.Feedback>
                                </Form.Group>

                            </Form>
                        </div>
                    </Col>
                </div>
            </Modal.Body>
        </Modal >
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        terms: state.terms
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        addTerm: (token: String, addToast: any, data: any) => dispatch(addTerm(token, addToast, data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TermEdit));