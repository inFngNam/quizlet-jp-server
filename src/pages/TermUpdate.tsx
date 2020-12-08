import React, { useState } from 'react';
import HeaderPage from '../components/layouts/Header'
import { Redirect } from 'react-router-dom';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccessRolePopup from "../components/layouts/AccessRolePopup";
import { editTerm } from '../redux/actions/termActions';
import { useToasts } from "react-toast-notifications";


import { TermPopupProps } from '../types';

const TermUpdate = ({ terms, user, showEditTerm, closePopup, module_id, editTerm, item }: TermPopupProps) => {



    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ question: item.question, explain: item.explain, score: item.score });
    const { addToast } = useToasts();
    console.log(formData);

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
                score: Number(formData.score),

            };
            console.log(data);
            editTerm(user.token, addToast, module_id, item.id, data);
            setFormData({ question: data.question, explain: data.explain, score: data.score });
            closePopup();
        }

        setValidated(true);
    }

    return (

        <Modal show={showEditTerm} onHide={closePopup} dialogClassName="my-modal">
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <div className="course-container">
                    <Col md={12}>
                        <Row style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="add-new-course-text">
                                Update term
                        </div>
                            <div>
                                <button className="add-c" type="submit" form="thisformm" >update </button>
                            </div>
                        </Row>
                    </Col>


                    <Col md={7} >
                        <div className="login-form-container" >
                            <Form id="thisformm" noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group as={Col}>
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Question..."
                                        name="question"
                                        className="login-form"
                                        value={formData.question}
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
                                        value={formData.explain}
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
                                        value={formData.score}
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
        editTerm: (token: String, addToast: any, module_id: any, term_id: any, data: any) => dispatch(editTerm(token, addToast, module_id, term_id, data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TermUpdate));