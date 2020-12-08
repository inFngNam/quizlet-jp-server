import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Spinner, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { getModulesInFolder } from '../../redux/actions/folderActions';
import { connect } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AllModuleInFolder = ({
    user,
    folder,
    getModulesInFolder,
    addToast,
    folders,
    deleteModuleFromFolder,
    usernamePath,
}: any) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        if (user?.token) {
            getModulesInFolder(user.token, folder.id, addToast, () => {
                setLoading(false)
            })
        }
    }, [folder])
    return (
        <React.Fragment>
            {loading === false ? (
                <Row className="list-module-folder">
                    <Col sm={1}></Col>
                    <Col sm={11}>
                        <Row>
                            {folders && folders.totalModules > 0 ? folders.modules.map((module: any, i: any) => (
                                <Card className="module-item" key={i}>
                                    <Card.Body>
                                        <Link to={`/course/${module.name}/${module.id}`} style={{ textDecoration: "none", color: "black" }}>
                                            <Card.Title>{module.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                <img src={user?.user?.avatar ? `${user?.user?.avatar}` : require('../../assets/avatar.png')} className="avatar-small" />
                                                {" " + usernamePath}
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
                                                        onClick={() => deleteModuleFromFolder(user.token, module.id, folder.id, addToast)}

                                                    >
                                                        <AiOutlineDelete />
                                                    </Button>
                                                </OverlayTrigger>
                                            ) : null}
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            )) : (
                                    <Row style={{ marginTop: "20px", marginLeft: "10px" }} className="d-flex justify-content-center">
                                        <h3>Chưa có học phần nào</h3>
                                    </Row>
                                )}
                        </Row>
                    </Col>
                </Row>
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
const mapStateToProps = (state: any) => {
    return {
        folders: state.folders
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        getModulesInFolder: (token: string, folder_id: number, addToast: any, setLoading: any) => dispatch(getModulesInFolder(token, folder_id, addToast, setLoading))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AllModuleInFolder));
