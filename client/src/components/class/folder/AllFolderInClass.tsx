import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getFoldersInClass } from '../../../redux/actions/classActions';
import { Row, Col, Card, Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AllFolderInClass = ({
    user,
    classItem,
    addToast,
    getFoldersInClass,
    deleteFolderFromClass,
    classes,
    usernamePath
}: any) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        if (user?.token) {
            getFoldersInClass(user.token, classItem.id, addToast, () => {
                setLoading(false)
            })
        }
    }, [classItem])
    return (
        <React.Fragment>
            {loading == false ? (
                <React.Fragment>
                    <Row style={{ marginTop: "20px" }} className="d-flex justify-content-center">
                        {classes.totalFolders > 0 ? (
                            <h3>Thư mục ( {classes.totalFolders} )</h3>
                        ) : null}
                    </Row>
                    <Row className="list-module-folder">
                        <Col sm={1}></Col>
                        <Col sm={11}>
                            <Row>
                                {classes && classes.totalFolders > 0 && classes.folders.map((folder: any, i: any) => (
                                    <Card className="module-item" key={i}>
                                        <Card.Body>
                                            <Link
                                                to={`/${user?.user?.username}/folder?code=${folder.code}&id=${folder.id}`}
                                                style={{ textDecoration: "none", color: "black" }}
                                            >
                                                <Card.Title>{folder.name}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    <img src={user?.user?.avatar ? `${user?.user?.avatar}` : require('../../../assets/avatar.png')} className="avatar-small" />
                                                    {" " + user?.user?.username}
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    {folder?.description}
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
                                                            onClick={() => deleteFolderFromClass(user.token, folder.id, classItem.id, addToast)}
                                                        >
                                                            <AiOutlineDelete />
                                                        </Button>
                                                    </OverlayTrigger>
                                                ): null}
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
        getFoldersInClass: (
            token: string, class_id: number, addToast: any,
            callback: any
        ) => dispatch(getFoldersInClass(token, class_id, addToast, callback))
    }
}
export default connect(null, mapDispatchToProps)(React.memo(AllFolderInClass))
