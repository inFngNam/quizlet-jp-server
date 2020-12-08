import React, { useContext, useState } from 'react';
import { AiFillGolden, AiFillFolderOpen, AiFillHome, AiFillCarryOut, AiFillBank } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AddFolderForm from '../folder/AddFolderForm';
import { createFolder } from '../../redux/actions/folderActions';
import { CreateFolderInput, CreateClassInput } from '../../types';
import { createClass } from "../../redux/actions/classActions";
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import AddClassForm from '../class/AddClassForm';
import { ControlContext } from '../../hooks/ControlContext';

const VerticalNav = ({
    createFolder,
    folders,
    user,
    classes,
    createClass,
    joined
}: any) => {
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const hideCreateFolderCreateFolder = () => {
        setShowCreateFolder(false);
    }
    const [showCreateClass, setShowCreateClass] = useState(false);
    const hideCreateClass = () => {
        setShowCreateClass(false);
    }
    const { addToast } = useToasts();
    const {
        tabIndex, setTabIndex,
        showAddFolder, setShowAddFolder, hideAddFolder,
        showAddClass, setShowAddClass, hideAddClass
    } = useContext(ControlContext);
    // console.log(a)
    return (
        <div>
            <ul className="vertical-nav">
                <li className="nav-home">

                    <Link to="/overview" onClick={() => setTabIndex(3)} className="active">

                        <AiFillHome></AiFillHome> Trang chủ

                        </Link>

                </li>
                <hr />
                <li>
                    <Link to="/overview#sets" onClick={() => setTabIndex(2)} className={tabIndex == 2 ? "active" : ''}>
                        <AiFillCarryOut></AiFillCarryOut> Học phần
                    </Link>
                </li>
                <li>
                    <Link to="/overview#folders" onClick={() => setTabIndex(3)} className={tabIndex == 3 ? "active" : ''}>
                        <AiFillFolderOpen></AiFillFolderOpen> Thư mục ( {folders.totalFolders} )
                    </Link>
                    <ul className="vertical-nav-child">
                        {folders && folders.list.length > 0 ? folders.list.map((folder: any, index: any) => (
                            <li key={index}>

                                <Link to={`/${user?.user?.username}/folder?code=${folder.code}&id=${folder.id}`}>
                                    {folder.name}
                                </Link>
                            </li>
                        )) : null}
                        <li>
                            <a
                                style={{ color: "#3ccfcf" }}
                                onClick={setShowAddFolder}
                            >
                                Thêm thư mục
                            </a>
                            <AddFolderForm
                                showAddFolder={showAddFolder}
                                hideAddFolder={hideAddFolder}
                                createFolder={createFolder}
                                addToast={addToast}
                                user={user}
                            />
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/overview#class" onClick={() => setTabIndex(4)} className={tabIndex == 4 ? "active" : ''}>
                        <AiFillGolden></AiFillGolden> Lớp học ( {classes.totalClasses} )
                    </Link>
                    <ul className="vertical-nav-child">
                        {classes && classes.list.length > 0 ? classes.list.map((item: any, index: any) => (
                            <li key={index}>
                                <Link to={`/${user?.user?.username}/class?code=${item.code}&id=${item.id}`}>
                                    {item.name}
                                </Link>
                            </li>
                        )) : null}
                        <li>
                            <a
                                style={{ color: "#3ccfcf" }}
                                onClick={setShowAddClass}
                            >
                                Thêm lớp học mới
                            </a>
                            <AddClassForm
                                showAddClass={showAddClass}
                                hideAddClass={hideAddClass}
                                user={user}
                                addToast={addToast}
                                createClass={createClass}
                            />
                        </li>
                    </ul>
                </li>
                <li>
                    <a>
                        <AiFillBank></AiFillBank> Đã tham gia ( {joined?.totalJoined} )
                    </a>
                    <ul className="vertical-nav-child">
                        {joined && joined.list.length > 0 ? joined.list.map((item: any, index: any) => (
                            <li key={index}>
                                <Link to={`/${item?.username}/class?code=${item.code}&id=${item.id}`}>
                                    {item.name}
                                </Link>
                            </li>
                        )) : null}
                    </ul>
                </li>
            </ul>
        </div>
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        folders: state.folders,
        classes: state.classes,
        joined: state.joined
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        createFolder: (token: string, input: CreateFolderInput,
            addToast: any) => dispatch(createFolder(token, input, addToast)),
        createClass: (token: string, input: CreateClassInput,
            addToast: any) => dispatch(createClass(token, input, addToast))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(VerticalNav));