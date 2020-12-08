import React from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { deleteFolder, updateFolder } from '../../redux/actions/folderActions';
import Folder from './Folder';
import { CreateFolderInput, UpdateFolderInput } from '../../types';
import { Col, Row } from 'react-bootstrap';


const ListFolder = ({ folders, deleteFolder, user, updateFolder }: any) => {
    const { addToast } = useToasts();
    
    return (
        // <Container>
            <Row>
                <Col xs={1} className="col-vertical-res">
                    
                </Col>
            <Col xs={10} className="course-part">
                <div>
                    
                        {folders && folders.list && folders.list.length > 0 ? (
                            folders.list.map((folder: any, index: any) => (
                                <Folder
                                    key={index}
                                    folder={folder}
                                    deleteFolder={deleteFolder}
                                    user={user}
                                    addToast={addToast}
                                    updateFolder={updateFolder}
                                />
                            ))
                        ) : (<h3>Tạo thư mục ngay</h3>)}
                </div>
            </Col>
            </Row>
            
        // </Container>
    )
}
const mapStateToProps = (state: any) => {
    return {
        folders: state.folders
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteFolder: (token: string, folder_id: number, addToast: any) => dispatch(deleteFolder(token, folder_id, addToast)),
        updateFolder: (token: string, folder_id: number,
            input: UpdateFolderInput,
            addToast: any) => dispatch(updateFolder(token, folder_id, input, addToast))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListFolder));