import { from } from "@apollo/client";
import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Col, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getQuerySearch } from "../helper/getQuerySearch";
import  { assignModuleToClass, createClass,deleteClass,deleteModuleFromClass,updateClass } from "../redux/actions/classActions";
import HeaderPage from '../components/layouts/Header';
import VerticalNav from "../components/layouts/VerticalNav";
import {
  AiOutlineFolder, AiOutlinePlusCircle,
  AiOutlineSetting, AiOutlineShareAlt, AiOutlineDelete
}
  from 'react-icons/ai';
import AddModuleToClass from "../components/class/AddModuleToClass";
import AllModuleInClass from "../components/class/AllModuleInClass";
import UpdateClassForm from "../components/class/UpdateClassForm";
import { ModuleCreate, UpdateClassInput } from "../types";
import { connect } from "react-redux";

const ClassDetail = ({
  user,
  createClass,
  deleteClass,
  updateClass,

}: any) =>{
  const [class_, setClass]: any = useState(null);
  const query = getQuerySearch();
  const id = query.get('id');
  const code =query.get('code');
  const { addToast } = useToasts();
  const [showUpdateClass, setShowUpdateClass] = useState(false);

  const hideUpdateClassCreateClass = ()=> {setShowUpdateClass(false);}

  const [showAddModule, setShowAddModule] = useState(false);
  const hideAddModuleModal = () => {
    setShowAddModule(false);
  }

  // useEffect(()=> {
  //   if(user?.token) {
  //     Axios.get(`${}?code=${code}&id=${id}`, {
  //       headers: {
  //         'Authorization': `Bearer ${user.token}`
  //       }
  //     }).then(res => {
  //       if(res.data!==null){
  //         setClass(res.data);
  //       }
  //     }).catch(e => {
  //       addToast("Error when trying get class", {
  //         appearance:"error",
  //         autoDismiss: true,
  //       })
  //     })

  // }, []);
  if(!user?.token) {
    return <Redirect to="/home"> </Redirect>
  }

  const deleteClassHandle =(token: string, class_id: number, addToast: any) => {
    deleteClass(token, class_id, addToast);
  }
  
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <HeaderPage></HeaderPage>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="vertical-nav-container">
          <VerticalNav />
        </Col>
        <Col md={9} style={{ paddingBottom: "200px" }}>
          {class_ !== null ? (
                        <React.Fragment>
                            <Row className="class-header">
                                <Col lg={4}>
                                    <div className="class-auhor">
                                        1 học phần {" "} | Tạo bởi<span className="author">{" " + user.user.username}</span>
                                    </div>
                                    <div className="class-info">
                                        <AiOutlineFolder style={{ fontSize: "50px", marginBottom: "10px" }} />
                                        <span className="class-name">
                                            {class_?.name}
                                        </span>
                                    </div>
                                </Col>
                                <Col lg={5}>
                                </Col>
                                <Col lg={3}>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="class-add-module">
                                                Thêm học class
                                        </Tooltip>
                                        }
                                    >
                                        <Button
                                            className="class-actions"
                                            onClick={() => setShowAddModule(true)}
                                        >
                                            <AiOutlinePlusCircle />
                                        </Button>
                                    </OverlayTrigger>
                                    <AddModuleToClass
                                        showAddModule={showAddModule}
                                        hideAddModuleModal={hideAddModuleModal}
                                        addToast={addToast}
                                        module={module}
                                        class_={class_}
                                        user={user}
                                        assignModuleToClass={assignModuleToClass}
                                    />
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="class-share">
                                                Chia sẻ
                                        </Tooltip>
                                        }
                                    >
                                        <Button className="class-actions">
                                            <AiOutlineShareAlt />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="class-update">
                                                Chỉnh sửa
                                        </Tooltip>
                                        }
                                    >
                                        <Button
                                            className="class-actions"
                                            onClick={() => setShowUpdateClass(true)}
                                        >
                                            <AiOutlineSetting />
                                        </Button>
                                    </OverlayTrigger>
                                    <UpdateClassForm
                                        class_={class_}
                                        showUpdateClass={showUpdateClass}
                                        hideUpdateClassCreateClass={hideUpdateClassCreateClass}
                                        user={user}
                                        addToast={addToast}
                                        updateClass={updateClass}
                                        
                                    />
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="class-delete">
                                                Xóa thư mục
                                        </Tooltip>
                                        }
                                    >
                                        <Link to="/overview" className="link">
                                            <Button
                                                variant="outline-danger"
                                                className="class-actions class-delete"
                                                onClick={() => deleteClass(user.token, class_.id, addToast)}
                                            >
                                                <AiOutlineDelete />
                                            </Button>
                                        </Link>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            <AllModuleInClass
                                user={user}
                                class_={class_}
                                addToast={addToast}
                                deleteModuleFromClass={deleteModuleFromClass}
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
      module: state.module
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
      deleteClass: (token: string, class_id: number,
          addToast: any) => dispatch(deleteClass(token, class_id, addToast)),
      updateClass: (token: string, class_id: number, input: UpdateClassInput,
          addToast: any) => dispatch(updateClass(token, class_id, input, addToast)),
      // createModuleInClass: (token: string, class_id: number, code: string,
      //     input: ModuleCreate, addToast: any) => dispatch(createModuleInClass(token, class_id, code, input, addToast)),
      deleteModuleFromClass: (token: string, module_id: number,
          class_id: number, addToast: any) => dispatch(deleteModuleFromClass(token, module_id, class_id, addToast)),
      assignModuleToClass: (token: string, module_id: number,
          class_id: number, addToast: any) => dispatch(assignModuleToClass(token, module_id, class_id, addToast))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClassDetail))