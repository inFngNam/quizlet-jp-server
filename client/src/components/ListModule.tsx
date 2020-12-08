import React, {useState} from 'react';
import { deleteModule } from '../redux/actions/moduleAction';
import { connect } from 'react-redux';
import ModuleCard from './layouts/ModuleCard';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Course from '../pages/Course';
import { FiEye,FiEyeOff } from 'react-icons/fi';

const ListModule = ({ module, deleteModule, user }: any) => {
    const [addCourse, setAddCourse] = useState(false);

    const handleAdd = () => {
        setAddCourse(true);
    }

    const handleCloseCourse = () => {
        setAddCourse(false);
    }

    const handleAddd = () => {
        setAddCourse(false);
    }

    return (
        <React.Fragment>
            { module && module.list.length > 0 ? (
                <Col md={12} className="course-module-part">
                    <div>
                        <button className="add-course" onClick={handleAdd}>Tạo học phần </button>
                        <Course showAddCourse={addCourse} closeCoursePopup={handleCloseCourse} handleAddd={handleAddd}/>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-start", width: "100%", flexDirection: "column" }}>
                        <div>
                            {
                                module.list.map((item: any) => {
                                    return (
                                        <React.Fragment key={item.id}>
                                            {/* <Link to={`/course/${item.id}`} style={{textDecoration: "none"}}> */}
                                                <ModuleCard
                                                    deleteModule={deleteModule}
                                                    module={item}
                                                    user={user}
                                                ></ModuleCard>
                                            {/* </Link> */}
                                            
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>

                        {/* <Link to="/course" style={{ textDecoration: 'none' }}> */}
                           
                            
                        {/* </Link> */}

                    </div>
                </Col>
            ) : (
                    <h3 className="no-modules-notification">
                        Bạn chưa tạo học phần nào
                        <br />
                        {/* <Link to="/course" style={{ textDecoration: 'none' }}> */}

                            <button className="add-course" style={{ marginTop: "20px" }} onClick={handleAdd}>Tạo học phần </button>
                            <Course showAddCourse={addCourse} closeCoursePopup={handleCloseCourse} handleAddd={handleAddd}/>

                        {/* </Link> */}
                    </h3>
                )}
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => {
    return {
        module: state.module
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteModule: (token: string, addToast: any, id: any) => dispatch(deleteModule(token, addToast, id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListModule));