import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import {
    AiOutlineDelete, AiFillSetting,
    AiOutlineEyeInvisible, AiOutlineEye, AiOutlineUpload
}
    from 'react-icons/ai';
import { Link } from 'react-router-dom';
import UpdateClassFrom from './UpdateClassForm';

const Folder = (props: any) => {
    const { class_, deleteClass, addToast, user, updateClass } = props;
    const [showUpdateClass, setShowUpdateClass] = useState(false);
    const hideUpdateClass = () => {
        setShowUpdateClass(false);
    }
    return (
        <Card className="card-container">
            <Card.Header className="curd-control">
                <Button size="sm" variant="outline-danger">
                    <AiOutlineDelete className="delete-module" onClick={() => deleteClass(user.token, class_.id, addToast)} />
                </Button>
                <Button size="sm" variant="primary" onClick={() => setShowUpdateClass(true)}>
                    <AiFillSetting className="delete-module" />
                </Button>
                <UpdateClassFrom
                    class_={class_}
                    showUpdateClass={showUpdateClass}
                    hideUpdateClass={hideUpdateClass}
                    user={user}
                    addToast={addToast}
                    updateClass={updateClass}
                />
            </Card.Header>
            <Link to={`${user?.user?.username}/class?code=${class_.code}&id=${class_.id}`} style={{textDecoration: "none", color: "black"}}>
                <Card.Body className="folder-body">
                    <Card.Title>{class_?.name}</Card.Title>
                    <Card.Text>
                        {class_?.description}
                    </Card.Text>
                    <Card.Text style={{ fontWeight: "bold" }}>
                        Chế độ: {class_.public === 1 ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
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