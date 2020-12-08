import React, { useRef, useState } from 'react';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { formatDate } from '../../helper/formatDate';
import { convertRefToObject } from '../../helper/converRefToObj';
import { useToasts } from 'react-toast-notifications';
import { userRegister, register } from '../../redux/actions/userAction';
import { connect } from 'react-redux';

const RegisterPopup = ({ showRegister, closeRegisterPopup, openLoginPopup, userRegister, register }: any) => {
  // const [disableRegister, setDisableRegister] = useState(true)
  const {addToast} = useToasts();
  const buildOptions = (start: number, end: number) => {
        var arr = [];
        for (let i = start; i <= end; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }
        return arr; 
  }
  const switchRegisterToLogin = () => {
    closeRegisterPopup();
    openLoginPopup();
  }
  const registerRef: any = useRef([]);
  const birthdayRef: any = useRef([]);
  const registerHandle = () => {
    const accountInfo = convertRefToObject(registerRef.current);
    const birthDayInfo = formatDate(birthdayRef.current);
    accountInfo['birthday'] = birthDayInfo;
    console.log(accountInfo);
    // userRegister(accountInfo, addToast)
    register(accountInfo, addToast)
  }
  return (
    <>

      <Modal
        show={showRegister}
        onHide={closeRegisterPopup}

      >
        <Modal.Header closeButton style={{ backgroundColor: "white" }}>
          <Modal.Title style={{ color: "black" }}>Đăng Ký</Modal.Title>
        </Modal.Header>
        <Modal.Body >

          
          <Row>
            <Col className="continue-with" >
              <FcGoogle className=" google" style={{ fontSize: "2rem" }} />
              Tiếp tục với Google
            </Col>

            <Col className="continue-with">
              <AiFillFacebook className=" facebook" style={{ fontSize: "2rem" }} />
              Tiếp tục với Facebook
            </Col>
          </Row>
          
          

          <div className="hrline">
            <hr style={{ backgroundColor: "black" }} />
            <div style={{ whiteSpace: "nowrap", padding: "0 1.5rem", opacity: "0.5" }}>Hoặc Email</div>
            <hr style={{ backgroundColor: "black" }} />
          </div>


          <div className="fomr-container">
            <Form
            
            >
              <Form.Label>Ngày sinh</Form.Label>

              <Form.Row>
                <Form.Group as={Col} sm={3}  className="inputselectform" >
                  <Form.Control as="select" id="select_day" ref={(el: any) => (birthdayRef.current['date'] = el)}>
                    <option value={0}>Ngày</option>  
                    {buildOptions(1, 31)}              
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} sm={3}  className="inputselectform" >
                  <Form.Control as="select" ref={(el: any) => (birthdayRef.current['month'] = el)}>
                    <option value={0}>Tháng</option>
                    {buildOptions(1, 12)}    
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} sm={3}  className="inputselectform">
                  <Form.Control as="select" ref={(el: any) => (birthdayRef.current['year'] = el)}>
                    <option value={0}>Năm</option>
                    {buildOptions(1980, 2020)}  
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Username"
                  name="name"
                  className="inputform"
                  required
                  ref={(el: any) => (registerRef.current['username'] = el)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail ">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="inputform"
                  required
                  ref={(el: any) => (registerRef.current['email'] = el)}
                />


              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="inputform"
                  required
                  ref={(el: any) => (registerRef.current['password'] = el)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Tôi chấp thuận điều khoản dịch vụ và chính sách quyền riêng tư"
                />
              </Form.Group>

              <Form.Text className="text-muted" >
                We'll never share your email with anyone else.
              </Form.Text>

              <Form.Control
                type="button"
                name="register"
                value="Đăng Ký"
                className="register-button"
                onClick={registerHandle}
              >
              </Form.Control>

            </Form>
          </div>

          <div className="already-have-account">
            <div>
              bạn đã có tài khoản rồi à?
              </div>
            <div style={{ color: " #3ccfcf", cursor: 'pointer' }} onClick={switchRegisterToLogin}>
              Đăng nhập
              </div>
          </div>

          <div className="quitlet-sware">
            <div>
              Quizlet sẽ không bao giờ bán thông tin email
              của bạn cho bất kỳ bên thứ ba nào.
              Giống như bạn chúng tôi cũng gét thư rác.
              </div>
          </div>


        </Modal.Body>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    userRegister: (credential: any, addToast: any) => dispatch(userRegister(credential, addToast)),
    register: (credential: any, addToast: any) => dispatch(register(credential, addToast))
  }
}

export default connect(null, mapDispatchToProps)(React.memo(RegisterPopup));
