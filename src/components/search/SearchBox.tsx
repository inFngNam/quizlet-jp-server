import { from } from '@apollo/client';
import React, { useRef, useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchBox = ({
    showSearchBox,
    hideSearchBox
}: any) => {
    const [keyWord, setKeyWord]: any = useState('');
    const searchBoxInputOnchange = (event: any) => {
        setKeyWord(event.target.value)
    }
    return (
        <Modal show={showSearchBox} onHide={hideSearchBox}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Tìm kiếm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="add-module-folder-container">
                    <Form>
                        <Row>
                            <Col sm={9}>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Từ khóa"
                                        name="name"
                                        className="login-form"
                                        value={keyWord}
                                        onChange={(event: any) => searchBoxInputOnchange(event)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Link to={`/subject/search?name=${keyWord}`}>
                                    <Button variant="success" onClick={() => hideSearchBox()}>
                                        Tìm kiếm
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SearchBox
