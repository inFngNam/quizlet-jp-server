import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getQuerySearch } from '../helper/getQuerySearch';
import { getPathUrl } from '../helper/getPathUrl';
import { FOLDER_DETAIL } from '../services/folder/folder.service';
import HeaderPage from '../components/layouts/Header';
import VerticalNav from '../components/layouts/VerticalNav';
import {
    AiOutlineFolder, AiOutlinePlusCircle,
    AiOutlineSetting, AiOutlineShareAlt, AiOutlineDelete,
    AiFillEye, AiFillEyeInvisible
}
    from 'react-icons/ai';
import {
    deleteFolder, updateFolder, createModuleInFolder,
    deleteModuleFromFolder, assignModuleToFolder
}
    from '../redux/actions/folderActions';
import { ModuleCreate, UpdateFolderInput } from '../types';
import UpdateFolderForm from '../components/folder/UpdateFolderForm';
import AddModuleToFolder from '../components/folder/AddModuleToFolder';
import AllModuleInFolder from '../components/folder/AllModuleInFolder';
import ShareFolder from '../components/folder/ShareFolder';

const FolderDetail = ({
    location,
    match,
    user,
    folders,
    deleteFolder,
    updateFolder,
    module,
    createModuleInFolder,
    deleteModuleFromFolder,
    assignModuleToFolder }: any) => {
    const [folder, setFolder]: any = useState(null);
    const query = getQuerySearch();
    const id = query.get('id');
    const code = query.get('code');
    const usernamePath = match?.params?.username;
    const { addToast } = useToasts();
    const [showUpdateFolder, setShowUpdateFolder] = useState(false);
    const hideUpdateFolderCreateFolder = () => {
        setShowUpdateFolder(false);
    }
    const [showAddModule, setShowAddModule] = useState(false);
    const hideAddModuleModal = () => {
        setShowAddModule(false);
    }
    const [showShareFolder, setShowShareFolder] = useState(false);
    const hideShareFolder = () => {
        setShowShareFolder(false);
    }

    useEffect(() => {
        if (user?.token) {
            Axios.get(`${FOLDER_DETAIL.url}?code=${code}&id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    if (res.data !== null) {
                        setFolder(res.data)
                    }
                })
                .catch(e => {
                    addToast("Error when trying get folder", {
                        appearance: "error",
                        autoDismiss: true
                    })
                })
        }
    }, [location.search])
    useEffect(() => {
        if (folders && folders.list.length > 0) {
            const findResult = folders.list.find((item: any) => item.id == id && item.code == code)
            if (findResult !== undefined) {
                setFolder(findResult)
            }
        }
    }, [folders])
    if (!user?.token) {
        return <Redirect to="/home"></Redirect>
    }
    const deleteFolderHandle = (token: string, folder_id: number, addToast: any) => {
        deleteFolder(token, folder_id, addToast)
    }
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
                    {folder !== null ? (
                        <React.Fragment>
                            <Row className="folder-header">
                                <Col lg={4}>
                                    <div className="folder-auhor">
                                        {folders?.totalModules} học phần {" "} | Tạo bởi<span className="author">{" " + usernamePath}</span>
                                    </div>
                                    <div className="folder-info">
                                        <AiOutlineFolder style={{ fontSize: "50px", marginBottom: "10px" }} />
                                        <span className="folder-name">
                                            {folder?.name}
                                        </span>
                                        <div>
                                            {folder?.description}
                                        </div>
                                        <div className="mode_des">
                                            {folder?.public == 1 ? (
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
                                    </div>
                                </Col>
                                <Col lg={5}>
                                </Col>
                                <Col lg={3}>
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
                                            <AddModuleToFolder
                                                showAddModule={showAddModule}
                                                hideAddModuleModal={hideAddModuleModal}
                                                addToast={addToast}
                                                module={module}
                                                folder={folder}
                                                user={user}
                                                createModuleInFolder={createModuleInFolder}
                                                assignModuleToFolder={assignModuleToFolder}
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
                                                    onClick={() => setShowUpdateFolder(true)}
                                                >
                                                    <AiOutlineSetting />
                                                </Button>
                                            </OverlayTrigger>
                                            <UpdateFolderForm
                                                folder={folder}
                                                showUpdateFolder={showUpdateFolder}
                                                hideUpdateFolderCreateFolder={hideUpdateFolderCreateFolder}
                                                user={user}
                                                addToast={addToast}
                                                updateFolder={updateFolder}

                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-delete">
                                                        Xóa thư mục
                                        </Tooltip>
                                                }
                                            >
                                                <Link to="/overview" className="link">
                                                    <Button
                                                        variant="outline-danger"
                                                        className="folder-actions folder-delete"
                                                        onClick={() => deleteFolderHandle(user.token, folder.id, addToast)}
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
                                            onClick={() => setShowShareFolder(true)}
                                        >
                                            <AiOutlineShareAlt />
                                        </Button>
                                    </OverlayTrigger>
                                    <ShareFolder
                                        showShareFolder={showShareFolder}
                                        hideShareFolder={hideShareFolder}
                                        user={user}
                                        addToast={addToast}
                                    />
                                </Col>
                            </Row>
                            <AllModuleInFolder
                                user={user}
                                folder={folder}
                                addToast={addToast}
                                deleteModuleFromFolder={deleteModuleFromFolder}
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
        folders: state.folders
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteFolder: (token: string, folder_id: number,
            addToast: any) => dispatch(deleteFolder(token, folder_id, addToast)),
        updateFolder: (token: string, folder_id: number, input: UpdateFolderInput,
            addToast: any) => dispatch(updateFolder(token, folder_id, input, addToast)),
        createModuleInFolder: (token: string, folder_id: number, code: string,
            input: ModuleCreate, addToast: any) => dispatch(createModuleInFolder(token, folder_id, code, input, addToast)),
        deleteModuleFromFolder: (token: string, module_id: number,
            folder_id: number, addToast: any) => dispatch(deleteModuleFromFolder(token, module_id, folder_id, addToast)),
        assignModuleToFolder: (token: string, module_id: number,
            folder_id: number, addToast: any) => dispatch(assignModuleToFolder(token, module_id, folder_id, addToast))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FolderDetail))
