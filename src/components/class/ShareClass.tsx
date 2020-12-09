import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getQuerySearch } from '../../helper/getQuerySearch';
import { GENERATE_SHARED_LINK, SHARE_LINK_ACTION } from '../../services/folder/folder.service';
import { GENERATE_SHARED_LINK_CLASS, SHARE_CLASS_LINK } from '../../services/class/class.service';
import CopyToClipboard from 'react-copy-to-clipboard';

const ShareClass = ({ showShareFolder, hideShareFolder, user, addToast }: any) => {
    const query = getQuerySearch();
    const id = query.get('id');
    const code = query.get('code');
    const [sharedLink, setSharedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const emailRef: any = useRef('');
    useEffect(() => {
        if (user?.token) {
            Axios.get(`${GENERATE_SHARED_LINK_CLASS.url}/${id}/${code}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
                }
            })
                .then(res => {
                    if (res.data !== null && res.data.link) {
                        setSharedLink(res.data.link);
                    }
                })
        }
    }, [])
    const shareLink = () => {
        const friendEmail = emailRef.current.value
        if (user?.token) {
            Axios.post(`${SHARE_CLASS_LINK.url}`, {
               'from': user?.user?.email,
               'to': friendEmail,
               'link': sharedLink
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
                }
            })
            .then(res => {
                addToast("Shared with your friend", {
                    appearance: "success",
                    autoDismiss: true
                })
            })
            .catch(e => {
                console.log(e)
                addToast("An error occurred during the sharing process", {
                    appearance: "error",
                    autoDismiss: true
                })
            })
        }
    }
    return (
        <Modal show={showShareFolder} onHide={hideShareFolder}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Mời thành viên tham gia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {sharedLink ? (
                    <div className="add-module-folder-container">
                    <Form>
                        <Row>
                            <Col sm={9}>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Địa chỉ email bạn bè"
                                        name="name"
                                        className="login-form"
                                        ref={emailRef}
                                    >
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Button
                                    variant="success"
                                    onClick={shareLink}
                                >
                                    Gửi email
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Form noValidate validated={copied}>
                        <Row>
                            <Col sm={9}>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Control
                                        placeholder="Địa chỉ email bạn bè"
                                        name="name"
                                        className="login-form"
                                        defaultValue={sharedLink}
                                    />
                                    <Form.Control.Feedback>
                                        Đã sao chép liên kết
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <CopyToClipboard text={sharedLink} onCopy={() => setCopied(true)}>
                                    <Button variant="success">Copy link</Button>
                                </CopyToClipboard>
                            </Col>
                        </Row>

                    </Form>
                </div>
                ): (
                    <Row className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                    </Row>
                )}
            </Modal.Body>
        </Modal>
    )
}
export default React.memo(ShareClass);