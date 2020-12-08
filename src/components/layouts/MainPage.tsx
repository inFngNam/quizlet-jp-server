import React from 'react';
import { Col, Row, Image, ButtonGroup, Button, Form } from 'react-bootstrap';

const MainPage = ({ user, setTabIndex, tabIndex }: any) => {

    return (

        <Row className="main-page-header">
            <Col xs={1}></Col>
            <Col xs={2} style={{ textAlign: "center" }}>
                <Image thumbnail src={user?.user?.avatar ? `${user?.user?.avatar}`: require('../../assets/avatar.png')} className="avatar-custom" />
                <br />
                <b>{user?.user?.username}</b>
            </Col>
            <Col xs={8} style={{ marginTop: "40px" }}>
                <ButtonGroup className="controller mb-2">
                    <Button
                        variant="light"
                        className={tabIndex === 1 ? "active-tab" : ''}
                        onClick={() => setTabIndex(1)}
                    >
                        Hoạt động gần đây
                    </Button>
                    <Button
                        variant="light"
                        className={tabIndex === 2 ? "active-tab" : ''}
                        onClick={() => setTabIndex(2)}
                    >
                        Học phần
                    </Button>
                    <Button
                        variant="light"
                        className={tabIndex === 3 ? "active-tab" : ''}
                        onClick={() => setTabIndex(3)}
                    >
                        Thư mục
                    </Button>
                    <Button
                        variant="light"
                        className={tabIndex === 4 ? "active-tab" : ''}
                        onClick={() => setTabIndex(4)}
                    >
                        Lớp học
                    </Button>
                    <Button
                        variant="light"
                        className={tabIndex === 5 ? "active-tab" : ''}
                        onClick={() => setTabIndex(5)}
                    >
                        Đã học
                    </Button>
                </ButtonGroup>
                <Form className="selections-controller">
                    <Form.Control
                        as="select"
                        size="sm"
                        className="mr-sm-2 custom-form"
                        defaultValue={tabIndex}
                        custom
                        onChange={(event: any) => {
                            console.log("VALUE", event.target.value)
                            setTabIndex(parseInt(event.target.value))
                        }}
                    >
                        <option value={1}>Hoạt động gần đây</option>
                        <option value={2}>Học phần</option>
                        <option value={3}>Thư mục</option>
                        <option value={4}>Lớp học</option>
                        <option value={5}>Đã học</option>
                    </Form.Control>
                </Form>
            </Col>
        </Row>

    )
}

export default React.memo(MainPage);