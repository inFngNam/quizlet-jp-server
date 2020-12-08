import {Button, Modal} from "react-bootstrap";
import React from "react";
import {useHistory} from "react-router-dom";

const ScorePopup = ({score, showPopup, closePopup}: any) => {
    const history = useHistory();
    return (
        <Modal show={showPopup} onHide={closePopup} dialogClassName="my-modal">
            <Modal.Header>
                <Modal.Title>Điểm của bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>{score}</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{width: "100%", backgroundColor: " #3ccfcf", border: "none"}}
                        onClick={history.goBack}
                >Quay lại</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ScorePopup;
