import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import {
    AiOutlineDelete, AiFillSetting,
    AiOutlineEyeInvisible, AiOutlineEye, AiOutlineUpload
}
    from 'react-icons/ai';
import { Link } from 'react-router-dom';
import UpdateFolderForm from './UpdateFolderForm';

const Folder = (props: any) => {
    const { folder, deleteFolder, addToast, user, updateFolder } = props;
    const [showUpdateFolder, setShowUpdateFolder] = useState(false);
    const hideUpdateFolderCreateFolder = () => {
        setShowUpdateFolder(false);
    }
    return (
        <Card className="card-container">
            <Card.Header className="curd-control">
                <Button size="sm" variant="outline-danger">
                    <AiOutlineDelete className="delete-module" onClick={() => deleteFolder(user.token, folder.id, addToast)} />
                </Button>
                <Button size="sm" variant="primary" onClick={() => setShowUpdateFolder(true)}>
                    <AiFillSetting className="delete-module" />
                </Button>
                <UpdateFolderForm
                    folder={folder}
                    showUpdateFolder={showUpdateFolder}
                    hideUpdateFolderCreateFolder={hideUpdateFolderCreateFolder}
                    user={user}
                    addToast={addToast}
                    updateFolder={updateFolder}
                />
            </Card.Header>
            <Link to={`/${user?.user?.username}/folder?code=${folder.code}&id=${folder.id}`} style={{textDecoration: "none", color: "black"}}>
                <Card.Body className="folder-body">
                    <Card.Title>{folder?.name}</Card.Title>
                    <Card.Text>
                        {folder?.description}
                    </Card.Text>
                    <Card.Text style={{ fontWeight: "bold" }}>
                        Chế độ: {folder.public == 1 ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
                    </Card.Text>
                </Card.Body>
            </Link>
            <Card.Footer className="author-name" style={{ backgroundColor: "white", display: "flex", justifyContent: "flex-end" }}>
                Tạo bởi: {user?.user?.username}
            </Card.Footer>
        </Card>
    )
}
export default Folder;