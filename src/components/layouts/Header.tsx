import React, { useState, useRef, useEffect } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col, Row, OverlayTrigger, Popover } from 'react-bootstrap';
import { logout } from '../../redux/actions/userAction';
import { userInfo } from 'os';
import SearchBox from '../search/SearchBox';
const Header = ({ user, logout }: any) => {
    const [show, setShow] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);

    const closeLoginPopup = () => {
        setShow(false);
    };
    const openLoginPopup = () => {
        setShow(true);
    };
    const closeRegisterPopup = () => {
        setShowRegister(false);
    };
    const openRegisterPopup = () => {
        setShowRegister(true);
    };
    const openLogout = () => {
        setLogoutModal(true);
    }
    const closeLogout = () => {
        setLogoutModal(false);
    };
    const handleLogout = (token: String) => {
        setLogoutModal(false);
        logout(token);
    }
    const hideSearchBox = () => {
        setShowSearchBox(false);
    }
    return (
        <React.Fragment>
            <LoginPopup show={show} closeLoginPopup={closeLoginPopup} />
            <RegisterPopup showRegister={showRegister} closeRegisterPopup={closeRegisterPopup} openLoginPopup={openLoginPopup} />
            <div className="header-container">
                <div className="left-container">
                    <div className='left'>
                        <Link to={user.token ? "/overview" : "/home"} >
                            <div aria-label="Quizlet" className="SiteLogo" role="img" title="Quizlet">
                                <svg fill="currentColor" viewBox="0 0 244 53" xmlns="http://www.w3.org/2000/svg" id="quizlet">
                                    <path
                                        d="M26.99 1.09c15.382 0 26.99 11.36 26.99 25.883 0 6.687-2.54 12.583-6.676 17.04l7.182 7.98H42.37l-2.49-2.847c-3.6 2.482-8.102 3.638-12.89 3.638C11.68 52.784 0 41.496 0 26.974 0 12.017 12.116 1.09 26.99 1.09zm0 41.7c2.03 0 3.844-.43 5.586-1.15L22.2 29.993h12.117l5.587 6.4c2.03-2.518 2.974-5.537 2.974-9.42 0-8.698-6.6-15.817-15.89-15.817-9.287 0-15.814 7.046-15.814 15.817 0 8.915 6.527 15.818 15.815 15.818zM61.035 15.76H71.99v20.706c0 4.89 3.048 6.686 6.676 6.686 3.627 0 6.675-1.797 6.675-6.686V15.758h10.956v21.64C96.296 48.04 88.026 53 78.666 53s-17.63-4.96-17.63-15.6V15.757zm42.75 36.235h10.81V15.758h-10.81v36.235zm-.992-45.69c0-3.56 2.92-6.303 6.36-6.303 3.518 0 6.36 2.743 6.36 6.303 0 3.485-2.842 6.23-6.36 6.23-3.44 0-6.36-2.745-6.36-6.23zm35.738 18.873h-16.74v-9.418h35.332l-20.15 26.817h19.133v9.418h-37.94l20.365-26.817zm23.67 26.817h10.81V1.883H162.2v50.11zm17.063-18.19c0-11.503 8.272-18.908 19.372-18.908 11.173 0 18.5 8.196 18.5 18.334 0 0 0 2.03-.217 3.684h-26.843c.218 4.314 3.48 6.883 9.648 6.883 6.966 0 10.883-2.085 12.987-3.523v9.347c-3.41 2.157-7.182 3.308-13.567 3.308-12.263 0-19.88-7.405-19.88-18.765v-.36zm26.99-4.026c0-3.235-3.337-5.967-7.618-5.967-4.498 0-8.27 2.66-8.488 5.967h16.105zm19.172-4.313h-4.86v-9.706h4.86V1.882h10.52v13.876H244v9.706h-8.054v26.53h-10.52v-26.53z" fillRule="evenodd">
                                    </path>
                                </svg>
                                <svg id="q" viewBox="0 0 70 25" fill="currentColor"><path d="M11.795 18.348c.43 0 .845-.044 1.245-.132.4-.088.786-.21 1.157-.366l-4.453-5.01h5.186l2.373 2.754c.43-.547.752-1.153.967-1.817.214-.664.322-1.416.322-2.256a6.85 6.85 0 0 0-1.919-4.79 6.614 6.614 0 0 0-2.139-1.464c-.83-.362-1.743-.542-2.74-.542-.995 0-1.903.175-2.724.527a6.466 6.466 0 0 0-2.124 1.45A6.609 6.609 0 0 0 5.555 8.87a7.072 7.072 0 0 0-.498 2.651c0 .958.166 1.851.498 2.681.332.83.796 1.553 1.391 2.168a6.466 6.466 0 0 0 2.124 1.45c.82.352 1.729.528 2.725.528zm0-17.96c1.64 0 3.164.289 4.57.865 1.406.576 2.622 1.362 3.648 2.358a10.872 10.872 0 0 1 2.417 3.53c.586 1.358.879 2.818.879 4.38 0 1.446-.254 2.793-.762 4.043a10.927 10.927 0 0 1-2.08 3.311l3.076 3.428h-5.186l-1.054-1.23a8.442 8.442 0 0 1-2.564 1.186 10.95 10.95 0 0 1-2.944.395c-1.621 0-3.135-.288-4.541-.864-1.406-.576-2.627-1.362-3.662-2.358a10.761 10.761 0 0 1-2.432-3.53c-.586-1.358-.879-2.818-.879-4.38 0-1.602.303-3.086.908-4.454a10.82 10.82 0 0 1 2.476-3.53 11.455 11.455 0 0 1 3.662-2.314C8.724.667 10.213.389 11.795.389z" fillRule="evenodd"></path></svg>
                            </div>
                        </Link>
                    </div>

                    <div className="right">
                        <div onClick={() => setShowSearchBox(true)}>
                            <AiOutlineSearch className="icon" />
                            <div>Tìm kiếm</div>
                        </div>
                        <SearchBox
                            hideSearchBox={hideSearchBox}
                            showSearchBox={showSearchBox}
                        />
                    </div>

                </div>

                <div className="rigth-container">
                    {user?.token ? (
                        <div>
                            <div className="header-icon-responsive-container">
                                <AiOutlineSearch className="icon header-icon-responsive" onClick={() => setShowSearchBox(true)}/>
                                {/* <BiAddToQueue className="icon header-icon-responsive" /> */}
                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    overlay={
                                        <Popover id="add">
                                            <Popover.Title>abc</Popover.Title>
                                            <Popover.Content>
                                                abc
                                            </Popover.Content>
                                        </Popover>
                                    }
                                >
                                    <BiAddToQueue className="icon header-icon-responsive" />
                                </OverlayTrigger>
                            </div>
                            <img src={user?.user?.avatar ? `${user?.user?.avatar}` : require('../../assets/avatar.png')} alt="Avatar" className="avatar" onClick={openLogout} />
                            <div>
                                {

                                    (logoutModal &&

                                        <Modal show={logoutModal} onHide={closeLogout} dialogClassName='custom-dialog-logout'>
                                            <Modal.Header style={{ backgroundColor: "white" }}>
                                                <Row style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                                                    <img src={require('../../assets/avatar.png')} alt="Avatar" className="avatar" />
                                                    <div style={{ color: "black" }}>{user.user.username}</div>
                                                </Row>
                                            </Modal.Header>
                                            <Modal.Body className="logoutCon" onClick={() => handleLogout(user.token)}>

                                                <Row style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
                                                    <FiLogOut style={{ fontSize: 30 }} />
                                                    <div className="logout-button">Đăng xuất</div>

                                                </Row>

                                            </Modal.Body>

                                        </Modal>

                                    )
                                }

                            </div>
                        </div>


                    ) : (
                            <React.Fragment>
                                <div className="button signin" onClick={openLoginPopup}>
                                    Đăng nhập
                            </div>
                                <div className="button signup" onClick={openRegisterPopup}>
                                    Đăng Ký
                            </div>
                            </React.Fragment>
                        )}
                </div>

            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: (token: String) => dispatch(logout(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));