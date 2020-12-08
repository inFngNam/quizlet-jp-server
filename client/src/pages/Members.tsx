import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Container, Image, Spinner } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import HeaderPage from '../components/layouts/Header';
import VerticalNav from '../components/layouts/VerticalNav';
import { AiOutlineDelete, AiOutlineUsergroupAdd, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Axios from 'axios';
import { CLASS_DETAIL } from '../services/class/class.service';
import Member from '../components/Member';


export const Members = ({ match, location }: any) => {
    const listMember: any = useSelector((state: any) => state.members)
    const user: any = useSelector((state: any) => state.user)
    // console.log(user.token)
    // console.log(match)
    const { code, id, username } = match.params;
    const [classItem, setClassItem]: any = useState(null);
    const [loading, setLoading]: any = useState(true);
    useEffect(() => {
        Axios.get(`${CLASS_DETAIL.url}?code=${code}&id=${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                if (res.data !== null) {
                    setClassItem(res.data);
                    setLoading(false);
                }
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
    }, [location])
    return (
        <React.Fragment>
            <Row>
                <Col md={12} className="pd-r-30">
                    <HeaderPage></HeaderPage>
                </Col>
            </Row>
            <Row>
                <Col md={3} className="vertical-nav-container">
                    <VerticalNav />
                </Col >
                <Col md={9} style={{ paddingBottom: "200px" }}>
                    {loading == false && classItem !== null ? (

                        <Row className="folder-header">
                            <Col lg={4}>
                                <div className="folder-auhor">
                                </div>
                                <div className="folder-info">
                                    <AiOutlineUsergroupAdd style={{ fontSize: "50px", marginBottom: "10px" }} />
                                    <span className="folder-name">
                                        {classItem?.name}
                                    </span>
                                    <div>
                                        {classItem?.description}
                                    </div>
                                    <div className="mode_des">
                                        {classItem?.public == 1 ? (
                                            <>
                                                <AiFillEye></AiFillEye>
                                                    Mọi người
                                                </>
                                        ) : (
                                                <>
                                                    <AiFillEyeInvisible></AiFillEyeInvisible>
                                                    Chỉ mình tôi
                                                </>
                                            )}
                                    </div>
                                    {username === user?.user?.username ? (
                                        <div>
                                            {listMember ? listMember?.list.length + " thành viên" : "0 thành viên"}
                                        </div>
                                    ) : null}

                                </div>
                            </Col>
                            <Col lg={8}></Col>
                        </Row>

                        /* <Col md={2}></Col>
                    <Col md={5} style={{ paddingBottom: "200px", paddingTop: "100px" }}>
                        {listMember && listMember.list.map((m: any, i: number) => (
                            <Card key={i}>
                                <Image style={{ height: "50px", width: "50px" }} src={require('../assets/avatar.png')} thumbnail roundedCircle />
                                <Card.Body>
                                    <Card.Title as="h6">
                                        {m.username}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col> */
                    ) : null}
                    {loading == false && listMember && listMember.list.map((m: any, i: number) => (
                        <Member
                        key={i}
                        user={user}
                        member={m}
                        classItem={classItem}
                        username={username}
                        />
                    ))}
                </Col>
                {loading == true ? (
                    <Row style={{ marginTop: "100px" }} className="d-flex justify-content-center">
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                    </Row>
                ) : null}
            </Row>
        </React.Fragment>
    )
}

const mapStateToProp = (state: any) => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProp, null)(React.memo(Members))
