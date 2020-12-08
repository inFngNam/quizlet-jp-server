import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getQuerySearch } from '../helper/getQuerySearch';
import { getPathUrl } from '../helper/getPathUrl';
import HeaderPage from '../components/layouts/Header';
import VerticalNav from '../components/layouts/VerticalNav';
import {
    AiOutlineFolder, AiOutlinePlusCircle,
    AiOutlineSetting, AiOutlineShareAlt, AiOutlineDelete,
    AiOutlineFolderAdd,
    AiOutlineUsergroupAdd,
    AiFillEyeInvisible,
    AiFillEye,
    AiFillProfile
}
    from 'react-icons/ai';

import {
    updateClass, deleteClass, createModuleInClass,
    deleteModuleFromClass, assignModuleToClass,
    createFolderInClass, assignFolderToClass,
    deleteFolderFromClass
}
    from '../redux/actions/classActions';
import {  
    managementMember
}
from '../redux/actions/joinClassAction';
import { getMembers } from '../redux/actions/membersAction';
import { ModuleCreate, UpdateClassInput, CreateFolderInput } from '../types';
import { CLASS_DETAIL } from '../services/class/class.service';
import ShareClass from '../components/class/ShareClass';
import UpdateClassForm from '../components/class/UpdateClassForm';
import AddModuleToClass from '../components/class/AddModuleToClass';
import AllModuleInClass from '../components/class/AllModuleInClass';
import AllFolderInClass from '../components/class/folder/AllFolderInClass';
import AddFolderToClass from '../components/class/folder/AddFolderToClass';

const ClassDetail = ({
    location,
    match,
    user,
    folders,
    deleteFolder,
    module,
    updateClass,
    deleteClass,
    createModuleInClass,
    deleteModuleFromClass,
    assignModuleToClass,
    classes,
    createFolderInClass,
    assignFolderToClass,
    deleteFolderFromClass
}: any) => {
    // const [folder, setFolder]: any = useState(null);
    const listMembers: any = useSelector((state: any) => state.members);
    const dispatch = useDispatch();
    const query = getQuerySearch();
    const id = query.get('id');
    const code = query.get('code');
    const usernamePath = match?.params?.username
    const { addToast } = useToasts();
    const [showUpdateClass, setShowUpdateClass] = useState(false);
    const hideUpdateClass = () => {
        setShowUpdateClass(false);
    }
    const [showAddModule, setShowAddModule] = useState(false);
    const [showAddFolder, setShowAddFolder] = useState(false);
    const hideAddModuleModal = () => {
        setShowAddModule(false);
    }
    const hideAddFolderModal = () => {
        setShowAddFolder(false);
    }
    const [showShareClass, setShowShareClass] = useState(false);
    const hideShareClass = () => {
        setShowShareClass(false);
    }
    const [classItem, setClassItem]: any = useState(null);
    const [members, setMembers]: any = useState(null);
    const dispatchGetListMember = (members: any) => dispatch(getMembers(members))
    useEffect(() => {
        if (user?.token) {
            Axios.get(`${CLASS_DETAIL.url}?code=${code}&id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    if (res.data !== null) {
                        setClassItem(res.data)
                        managementMember(user.token, res.data?.id, res.data?.code)
                        .then(res => {
                            setMembers(res)
                            dispatchGetListMember(res)
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    }
                })
                .catch(e => {
                    addToast("Error when trying get class", {
                        appearance: "error",
                        autoDismiss: true
                    })
                })
        }
    }, [location.search])
    useEffect(() => {
        if (classes && classes.list.length > 0) {
            const findResult = classes.list.find((item: any) => item.id == id && item.code == code)
            if (findResult !== undefined) {
                setClassItem(findResult)
            }
        }
    }, [classes])
    // useEffect(() => {

    // })
    if (!user?.token) {
        return <Redirect to="/home"></Redirect>
    }
    const deleteFolderHandle = (token: string, folder_id: number, addToast: any) => {
        deleteFolder(token, folder_id, addToast)
    }
    // const deleteClassHandle = (token: string, class_id: number, addToast: any) => {
    //     deleteClass(token, class_id, addToast);
    // }
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
                </Col>
                <Col md={9} style={{ paddingBottom: "200px" }}>
                    {classItem !== null ? (
                        <React.Fragment>
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
                                        {usernamePath === user?.user?.username ? (
                                            <div>
                                            {members ? members?.length + " thành viên" : "0 thành viên"}
                                        </div>
                                        ): null}
                                    
                                    </div>
                                </Col>
                                <Col lg={4}>
                                </Col>
                                <Col lg={4}>
                                    {usernamePath === user?.user?.username ? (
                                        <React.Fragment>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-add-module">
                                                        Thêm học phần
                                        </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="folder-actions"
                                                    onClick={() => setShowAddModule(true)}
                                                >
                                                    <AiOutlinePlusCircle />
                                                </Button>
                                            </OverlayTrigger>
                                            <AddModuleToClass
                                                showAddModule={showAddModule}
                                                hideAddModuleModal={hideAddModuleModal}
                                                user={user}
                                                addToast={addToast}
                                                module={module}
                                                class_={classItem}
                                                createModuleInClass={createModuleInClass}
                                                assignModuleToClass={assignModuleToClass}
                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-add-module">
                                                        Thêm thư mục
                                        </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="folder-actions"
                                                    onClick={() => setShowAddFolder(true)}
                                                >
                                                    <AiOutlineFolderAdd />
                                                </Button>
                                            </OverlayTrigger>
                                            <AddFolderToClass
                                                showAddFolder={showAddFolder}
                                                hideAddFolderModal={hideAddFolderModal}
                                                folders={folders}
                                                user={user}
                                                createFolderInClass={createFolderInClass}
                                                assignFolderToClass={assignFolderToClass}
                                                classItem={classItem}
                                                addToast={addToast}
                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-update">
                                                        Chỉnh sửa
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="folder-actions"
                                                    onClick={() => setShowUpdateClass(true)}
                                                >
                                                    <AiOutlineSetting />
                                                </Button>
                                            </OverlayTrigger>
                                            <UpdateClassForm
                                                showUpdateClass={showUpdateClass}
                                                hideUpdateClass={hideUpdateClass}
                                                user={user}
                                                addToast={addToast}
                                                class_={classItem}
                                                updateClass={updateClass}
                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-update">
                                                        Thành viên
                                                    </Tooltip>
                                                }
                                            >
                                                <Link to={`/${usernamePath}/${classItem.id}/${classItem.code}/members`}>
                                                    <Button
                                                        className="folder-actions"
                                                        onClick={() => setShowUpdateClass(true)}
                                                    >
                                                        <AiFillProfile />
                                                    </Button>
                                                </Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-delete">
                                                        Xóa lớp học
                                                    </Tooltip>
                                                }
                                            >
                                                <Link to="/overview" className="link">
                                                    <Button
                                                        variant="outline-danger"
                                                        className="folder-actions folder-delete"
                                                        onClick={() => deleteClass(user.token, classItem.id, addToast)}
                                                    >
                                                        <AiOutlineDelete />
                                                    </Button>
                                                </Link>
                                            </OverlayTrigger>
                                        </React.Fragment>
                                    ) : null}

                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="folder-share">
                                                Chia sẻ
                                        </Tooltip>
                                        }
                                    >
                                        <Button
                                            className="folder-actions"
                                            onClick={() => setShowShareClass(true)}
                                        >
                                            <AiOutlineShareAlt />
                                        </Button>
                                    </OverlayTrigger>
                                    <ShareClass
                                        showShareFolder={showShareClass}
                                        hideShareFolder={hideShareClass}
                                        user={user}
                                        addToast={addToast}
                                    />
                                </Col>
                            </Row>
                            <AllModuleInClass
                                user={user}
                                class_={classItem}
                                addToast={addToast}
                                classes={classes}
                                deleteModuleFromClass={deleteModuleFromClass}
                                usernamePath={usernamePath}
                            />
                            <AllFolderInClass
                                user={user}
                                classItem={classItem}
                                addToast={addToast}
                                classes={classes}
                                deleteFolderFromClass={deleteFolderFromClass}
                                usernamePath={usernamePath}
                            />
                        </React.Fragment>

                    ) : (
                            <React.Fragment>
                                <Row style={{ marginTop: "100px" }} className="d-flex justify-content-center">
                                    <Spinner animation="border" variant="primary"></Spinner>
                                </Row>
                            </React.Fragment>
                        )}
                </Col>
            </Row>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        module: state.module,
        folders: state.folders,
        classes: state.classes
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateClass: (token: string, class_id: number, input: UpdateClassInput,
            addToast: any) => dispatch(updateClass(token, class_id, input, addToast)),
        deleteClass: (token: string, class_id: number, addToast: any) => dispatch(deleteClass(token, class_id, addToast)),
        createModuleInClass: (
            token: string, class_id: number, code: string,
            input: ModuleCreate, addToast: any
        ) => dispatch(createModuleInClass(token, class_id, code, input, addToast)),
        deleteModuleFromClass: (
            token: string, module_id: number,
            class_id: number, addToast: any
        ) => dispatch(deleteModuleFromClass(token, module_id, class_id, addToast)),
        assignModuleToClass: (
            token: string, module_id: number,
            class_id: number, addToast: any
        ) => dispatch(assignModuleToClass(token, module_id, class_id, addToast)),
        createFolderInClass: (
            token: string, class_id: number,
            code: string, input: CreateFolderInput, addToast: any
        ) => dispatch(createFolderInClass(token, class_id, code, input, addToast)),
        assignFolderToClass: (
            token: string, folder_id: number,
            class_id: number, addToast: any
        ) => dispatch(assignFolderToClass(token, folder_id, class_id, addToast)),
        deleteFolderFromClass: (
            token: string, folder_id: number,
            class_id: number, addToast: any
        ) => dispatch(deleteFolderFromClass(token, folder_id, class_id, addToast))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClassDetail))
