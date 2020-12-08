import Axios from 'axios';
import React from 'react'
import { Row, Card, Image, Button } from 'react-bootstrap';
import { REMOVE_MEMBER } from '../services/joining/joining.service';
import { connect, useSelector, useDispatch } from 'react-redux';
import { removeMember, getMembers } from '../redux/actions/membersAction';


const Member = ({
    listMember, user,
    member,
    classItem,
    username
}: any) => {
    const dispatch = useDispatch();
    const dispatchGetListMember = (members: any) => dispatch(getMembers(members))
    const handleRemoveMember = () => {
        Axios.delete(`${REMOVE_MEMBER.url}/${classItem.id}/${member.user_id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                if (res.data !== null) {
                    dispatchGetListMember(res.data)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    return (
        <Card style={{marginTop: "20px"}}>
            <Image style={{ height: "50px", width: "50px" }} src={require('../assets/avatar.png')} thumbnail roundedCircle />
            <Card.Body>
                <Card.Title as="h6">
                    {member.username}
                </Card.Title>
                {username !== member.username ? (
                    <Card.Link>
                    <Button onClick={handleRemoveMember}>Xóa</Button>
                </Card.Link>
                ): null}
            </Card.Body>
        </Card>
    )
}

export default Member
