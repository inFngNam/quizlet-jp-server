import React, { useState, useEffect, useMemo, useContext } from 'react'
import HeaderPage from '../components/layouts/Header'
import { Row, Col, Navbar, Card, Button, Container } from 'react-bootstrap';
import { FaHome, FaLeaf } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { AiOutlineProject, AiOutlineFolder } from 'react-icons/ai';
import { BsFiles } from 'react-icons/bs';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { me } from '../redux/actions/userAction';
import MainPage from '../components/layouts/MainPage';
import ListModule from '../components/ListModule';
import ListFolder from '../components/folder/ListFolder';
import VerticalNav from '../components/layouts/VerticalNav';
import ListClass from '../components/class/ListClass';
import { ControlContext } from '../hooks/ControlContext';
// export const ControlContext = React.createContext<any>(null);

const Overview = ({ user }: any) => {

    const [showList, setShowList] = useState(true);
    const show = (s: any) => {
        setShowList(s);
    }
    const { tabIndex, setTabIndex } = useContext(ControlContext);
    useEffect(() => {
        me(user.token)
    }, [])
    if (!user?.token) {
        return <Redirect to="/home"></Redirect>
    }
    return (
        <React.Fragment>
            <Row>
                <Col md={12} className="pd-r-30">
                    <HeaderPage />
                </Col>
            </Row>
            <Row>
                <Col md={3} className="vertical-nav-container">
                    <VerticalNav />
                </Col>
                <Col md={9} style={{ paddingBottom: "200px" }}>
                    <MainPage show={show} showList={showList} tabIndex={tabIndex} setTabIndex={setTabIndex} user={user} />
                    {tabIndex == 2 ? (
                        <ListModule user={user} />
                    ) : null}
                    {tabIndex === 3 ? (
                        <ListFolder user={user} />
                    ) : null}
                    {tabIndex === 4 ? (
                        <ListClass user={user} />
                    ) : null}
                </Col>
            </Row>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        me: (token: string) => dispatch(me(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Overview))
