import React, { useRef } from 'react';
import { Modal, Button, Form, } from 'react-bootstrap';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, login } from '../../redux/actions/userAction';
import { useToasts } from "react-toast-notifications";
import { convertRefToObject } from '../../helper/converRefToObj';
const LoginPopup = ({show, closeLoginPopup, userLogin, login}: any) => {
    const { addToast } = useToasts();
    const loginRef: any = useRef([]);
    const loginHandle = () => {
        const credential = convertRefToObject(loginRef.current);
        // console.log("CRE", credential)
        // userLogin(credential, addToast);
        login(credential, addToast);
    }
    return (
        <Modal show={show} onHide={closeLoginPopup}>
            <Modal.Header closeButton>
                <Modal.Title>Đăng nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="login-social-api">
                    <FcGoogle className="login-social-icon google" style={{fontSize: "2rem"}}/>
                    Đăng nhập bằng Google
                </div>
                <div className="login-social-api">
                    <AiFillFacebook className="login-social-icon facebook" style={{fontSize: "2rem"}}/>
                    Đăng nhập bằng Facebook
                </div>
                <div className="login-social-api apple" >
                    <FaApple className="login-social-icon apple" style={{fontSize: "2rem"}}/>
                    Đăng nhập bằng Apple
                </div>
                <div className="login-form-container">
                    <Form>
                        <Form.Control
                            
                            placeholder="Điền email..."
                            name="email"
                            className="login-form"
                            required
                            ref={(el: any) => (loginRef.current['email'] = el)}
                        >

                        </Form.Control>
                        <Form.Control
                            type="password"
                            placeholder="Mật khẩu..."
                            name="password"
                            className="login-form"
                            required
                            ref={(el: any) => (loginRef.current['password'] = el)}
                        >
                        </Form.Control>
                        <span className="forget-password">
                            <Link to="/overview">Quên mật khẩu</Link>
                        </span>
                        <Form.Control
                            type="button"
                            name="login"
                            value="Đăng nhập"
                            className="login-button"
                            onClick={loginHandle}
                        >
                        </Form.Control>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        userLogin: (credential: any, addToast: any) => dispatch(userLogin(credential, addToast)),
        login: (credential: any, addToast: any) => dispatch(login(credential, addToast))
    }
} 
export default connect(null, mapDispatchToProps)(React.memo(LoginPopup));