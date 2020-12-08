import React, {useEffect, useState} from 'react';
import HeaderPage from '../components/layouts/Header';
import TermData from '../components/layouts/TermData';
import {Col, Row, Spinner} from 'react-bootstrap';
import {allTerms} from '../redux/actions/termActions';
import {connect} from 'react-redux';

const Term = ({location, match, user, allTerms, terms}: any) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        allTerms(user.token, match?.params?.id, () => {
            setLoading(false)
        })
    }, [location])
    return (
        <>
            <Row>
                <Col md={12} className="pd-r-30">
                    <HeaderPage/>
                </Col>
            </Row>
            <Row>
                {loading == false && (terms == null || terms.list == null || terms.list.length < 1) || terms.creator == null? (
                    <Col md={3} className="vertical-nav-container">
                        <VerticalNav />
                    </Col>
                ): null}
                {loading == false && terms !== null && terms.list != null ? (
                    <Col md={12} style={{paddingBottom: "200px"}}>
                        <TermData
                            name={match.params.name}
                            user={user}
                        />
                    </Col>
                ) : null}
            </Row>
            {loading == true ? (
                <Row style={{marginTop: "100px"}} className="d-flex justify-content-center">
                    <Spinner animation="grow" variant="success"/>
                    <Spinner animation="grow" variant="danger"/>
                    <Spinner animation="grow" variant="warning"/>
                </Row>
            ) : null}
        </>
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
        allTerms: (token: string, id: number, setLoading?: any) => dispatch(allTerms(token, id, setLoading))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Term))
