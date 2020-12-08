import React from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { deleteClass, updateClass } from '../../redux/actions/classActions'
import Class from './Class';
import { UpdateClassInput } from '../../types';
import { Col, Row } from 'react-bootstrap';

const ListClass = ({ classes, deleteClass, user, updateClass }: any) => {
    const { addToast } = useToasts();
    
    return (
        // <Container>
            <Row>
                <Col xs={1} className="col-vertical-res">
                    
                </Col>
            <Col xs={10} className="course-part">
                <div>
                    
                        {classes && classes.list && classes.list.length > 0 ? (
                            classes.list.map((class_: any, index: any) => (
                                <Class
                                    key={index}
                                    class_={class_}
                                    deleteClass={deleteClass}
                                    user={user}
                                    addToast={addToast}
                                    updateClass={updateClass}
                                />
                            ))
                        ) : (<h3>Tạo class ngay</h3>)}
                </div>
            </Col>
            </Row>
            
        // </Container>
    )
}
const mapStateToProps = (state: any) => {
    return {
        classes: state.classes
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteClass: (token: string, class_id: number, addToast: any) => dispatch(deleteClass(token, class_id, addToast)),
        updateClass: (token: string, class_id: number,
            input: UpdateClassInput,
            addToast: any) => dispatch(updateClass(token, class_id, input, addToast))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListClass));