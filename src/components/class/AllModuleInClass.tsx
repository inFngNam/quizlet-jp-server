import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Spinner, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { getModulesInClass } from '../../redux/actions/classActions';
import { connect } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AllModuleInClass = ({
    user,
    class_,
    getModulesInClass,
    addToast,
    classes,
    deleteModuleFromClass,
    usernamePath
}: any) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        if (user?.token) {
            getModulesInClass(user.token, class_.id, addToast, () => {
                setLoading(false)
            })
        }
    }, [class_])
    return (
        <React.Fragment>
            {loading === false ? (
                <React.Fragment>
                    <Row style={{ marginTop: "15px" }} className="d-flex justify-content-center">
                        {classes.totalModules > 0 ? (
                            <h3>Học phần ( {classes.totalModules} )</h3>
                        ) : null}
                    </Row>
                    <Row className="list-module-folder">
                        <Col sm={1}></Col>
                        <Col sm={11}>
                            <Row>
                                {classes && classes.totalModules > 0 && classes.modules.map((module: any, i: any) => (
                                    <Card className="module-item" key={i}>
                                        <Card.Body>
                                            <Link to={`/course/${module.name}/${module.id}`} style={{ textDecoration: "none", color: "black" }}>
                                                <Card.Title>{module.name}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    <img src={user?.user?.avatar ? `${user?.user?.avatar}` : require('../../assets/avatar.png')} className="avatar-small" />
                                                    {" " + user?.user?.username}
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    {module?.description}
                                                </Card.Text>
                                            </Link>
                                            <Card.Link>
                                                {usernamePath === user?.user?.username ? (
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        overlay={
                                                            <Tooltip id="folder-delete">
                                                                Xóa học phần
                                                     </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            variant="outline-danger"
                                                            className="folder-actions"
                                                            onClick={() => deleteModuleFromClass(user.token, module.id, class_.id, addToast)}
                                                        >
                                                            <AiOutlineDelete />
                                                        </Button>
                                                    </OverlayTrigger>
                                                ) : null}
                                            </Card.Link>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </React.Fragment>
            ) : (
                    <Row style={{ marginTop: "100px" }} className="d-flex justify-content-center">
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                    </Row>
                )}
        </React.Fragment>
    )
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        getModulesInClass: (token: string, class_id: number, addToast: any, setLoading: any) => dispatch(getModulesInClass(token, class_id, addToast, setLoading))
    }
}
export default connect(null, mapDispatchToProps)(React.memo(AllModuleInClass)); 
