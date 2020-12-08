import React, {useState} from 'react';
import TermButton from './TermButton';
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {connect} from 'react-redux';
import {allTerms, deleteTerm} from '../../redux/actions/termActions';
import {Link, useParams} from 'react-router-dom';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import TermEdit from "../../pages/TermEdit";
import TermUpdate from "../../pages/TermUpdate";
import {useToasts} from "react-toast-notifications";

const TermData = ({allTerms, terms, user, deleteTerm, name}: any) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);
    const [itemsIndex, setItemsIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const {addToast} = useToasts();
    const [itemm, setItemm] = useState({question: "", explain: "", score: 0});

    let {id} = useParams<{ id: any }>();
    // console.log(id);

    const closePopup = () => {
        setShowModal(false);
    };
    const openPopup = () => {
        setShowModal(true);
    };

    const closePopupUpdate = () => {
        setShowModalUpdate(false);
    };
    const openPopupUpdate = (item: any) => {
        setItemm(item);
        // console.log(itemm)

        setShowModalUpdate(true);

    };

    const handleClickFlashCardBtn = () => {
        // allTest(user.token, module.id);
        window.location.replace(`/testing/term/${id}`);
    }


    // useEffect(() => {
    //     allTerms(user.token, id)
    // }, [])

    const arrowLeft = () => {
        setIsFlipped(false);
        (itemsIndex === 0) ? setItemsIndex(0) : setItemsIndex(itemsIndex - 1);
    }

    const arrowRight = () => {
        setIsFlipped(false);
        (itemsIndex === terms.list.length - 1) ? setItemsIndex(terms.list.length - 1) : setItemsIndex(itemsIndex + 1);
    }

    return (
        <Row className="term-container">
            {/* <Row className="term-content"> */}
            <Col sm={12}>
                <Row>
                    <Container>
                        <div className="ten-hoc-phan">
                            {name}
                        </div>
                    </Container>
                </Row>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={3} style={{paddingLeft: "107px"}}>
                        <div>
                            <div>Học</div>
                        </div>
                        <Link to={`/testing/term/${id}`} style={{textDecoration: "none", color: "black"}}>
                            <TermButton title="Thẻ ghi nhớ"
                                        path="M28 22.28c0 .396-.323.72-.72.72H8.72a.721.721 0 0 1-.72-.72V21h15.28c1.5 0 2.72-1.22 2.72-2.72V13h1.28a.72.72 0 0 1 .72.72v8.56M8 15a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2H8m-4 3.28V9.72A.72.72 0 0 1 4.72 9h18.56a.72.72 0 0 1 .72.72v8.56c0 .396-.323.72-.72.72H4.72a.721.721 0 0 1-.72-.72M27.28 11H26V9.72C26 8.22 24.78 7 23.28 7H4.72C3.22 7 2 8.22 2 9.72v8.56C2 19.78 3.22 21 4.72 21H6v1.28C6 23.78 7.22 25 8.72 25h18.56c1.5 0 2.72-1.22 2.72-2.72v-8.56c0-1.5-1.22-2.72-2.72-2.72z"/>
                        </Link>
                        <TermButton title="Học"
                                    path="M8.557 8.77c-3.24 3.192-4.048 8.247-1.651 12.328 2.4 4.087 7.267 5.926 11.704 4.755a3.166 3.166 0 0 1 1.336-2.611c1.446-1.033 3.474-.718 4.525.702a3.152 3.152 0 0 1-.719 4.448c-1.43 1.022-3.431.724-4.49-.658-5.333 1.469-11.213-.722-14.103-5.644-2.92-4.972-1.86-11.147 2.2-14.943a3.16 3.16 0 0 1 1.186-3.539c1.446-1.033 3.475-.718 4.525.703a3.152 3.152 0 0 1-.718 4.448 3.29 3.29 0 0 1-3.795.01m12.451 17.647c.335.454.988.555 1.45.225.463-.331.567-.972.232-1.426a1.053 1.053 0 0 0-1.45-.224c-.464.33-.567.972-.232 1.425M9.608 6.784c.335.453.987.555 1.45.224.463-.33.566-.972.231-1.425a1.053 1.053 0 0 0-1.45-.225 1.013 1.013 0 0 0-.232 1.426m17.687 14.47a1.11 1.11 0 0 1-1.471.498 1.074 1.074 0 0 1-.508-1.446c.242-.489.445-.997.605-1.518.176-.572.79-.895 1.372-.722.582.172.91.776.735 1.348-.194.631-.44 1.247-.733 1.84m1.155-7.094a1.085 1.085 0 0 1-.94 1.22 1.097 1.097 0 0 1-1.24-.924 9.874 9.874 0 0 0-.36-1.589c-.18-.57.146-1.176.727-1.353a1.104 1.104 0 0 1 1.376.714c.2.633.345 1.279.437 1.932m-3.117-6.553a1.069 1.069 0 0 1-.077 1.528 1.114 1.114 0 0 1-1.554-.075 10.122 10.122 0 0 0-1.208-1.113 1.07 1.07 0 0 1-.177-1.52 1.113 1.113 0 0 1 1.547-.174c.525.41 1.016.863 1.469 1.354m-6.32-3.681c.59.14.954.725.81 1.306-.143.58-.738.937-1.328.797a10.564 10.564 0 0 0-1.638-.257 1.088 1.088 0 0 1-1.012-1.163 1.095 1.095 0 0 1 1.183-.994 12.8 12.8 0 0 1 1.985.31z"/>
                        <TermButton title="Viết"
                                    path="M10.962 22.99a1.02 1.02 0 0 1-.712-.289.967.967 0 0 1-.24-1.019l3.002-8.409c.003-.01.01-.017.014-.027.007-.019.018-.036.027-.054a.962.962 0 0 1 .175-.257c.01-.01.013-.023.023-.033l8.824-8.615a1.025 1.025 0 0 1 1.423 0 .967.967 0 0 1 0 1.39l-8.113 7.92 4.192 4.092 8.113-7.92a1.023 1.023 0 0 1 1.423 0 .965.965 0 0 1 0 1.39l-8.824 8.613c-.01.01-.025.014-.035.024-.076.067-.16.122-.254.165-.02.009-.038.02-.06.029-.01.005-.02.011-.031.015l-8.617 2.93c-.108.036-.22.054-.33.054m3.423-7.592l-1.788 5.012 5.135-1.745-3.347-3.267m15.501 10.478a.97.97 0 0 1 .958.982.97.97 0 0 1-.958.983H8.803a.97.97 0 0 1-.959-.983.97.97 0 0 1 .959-.982h21.083m-25.011.412c.05.118.09.236.11.364a1.962 1.962 0 0 1-.544 1.778 2.06 2.06 0 0 1-2.847 0A1.93 1.93 0 0 1 1 27.035c0-.128.02-.255.04-.383a2.31 2.31 0 0 1 .302-.708c.07-.108.161-.207.252-.294.09-.089.191-.177.302-.246.11-.069.231-.128.352-.187a2.067 2.067 0 0 1 2.194.432c.09.088.171.187.252.294.07.11.13.227.181.345z"/>
                        <TermButton title="Chính tả"
                                    path="M10.962 22.99a1.02 1.02 0 0 1-.712-.289.967.967 0 0 1-.24-1.019l3.002-8.409c.003-.01.01-.017.014-.027.007-.019.018-.036.027-.054a.962.962 0 0 1 .175-.257c.01-.01.013-.023.023-.033l8.824-8.615a1.025 1.025 0 0 1 1.423 0 .967.967 0 0 1 0 1.39l-8.113 7.92 4.192 4.092 8.113-7.92a1.023 1.023 0 0 1 1.423 0 .965.965 0 0 1 0 1.39l-8.824 8.613c-.01.01-.025.014-.035.024-.076.067-.16.122-.254.165-.02.009-.038.02-.06.029-.01.005-.02.011-.031.015l-8.617 2.93c-.108.036-.22.054-.33.054m3.423-7.592l-1.788 5.012 5.135-1.745-3.347-3.267m15.501 10.478a.97.97 0 0 1 .958.982.97.97 0 0 1-.958.983H8.803a.97.97 0 0 1-.959-.983.97.97 0 0 1 .959-.982h21.083m-25.011.412c.05.118.09.236.11.364a1.962 1.962 0 0 1-.544 1.778 2.06 2.06 0 0 1-2.847 0A1.93 1.93 0 0 1 1 27.035c0-.128.02-.255.04-.383a2.31 2.31 0 0 1 .302-.708c.07-.108.161-.207.252-.294.09-.089.191-.177.302-.246.11-.069.231-.128.352-.187a2.067 2.067 0 0 1 2.194.432c.09.088.171.187.252.294.07.11.13.227.181.345z"/>
                        <TermButton title="Kiểm tra"
                                    path="M24.277 26.777H7.722A.723.723 0 0 1 7 26.054V5.72A.72.72 0 0 1 7.72 5H18v4.057c0 1.5 1.22 2.72 2.72 2.72H25v14.277a.733.733 0 0 1-.723.723M20 6.36l3.53 3.417h-2.81a.73.73 0 0 1-.72-.72V6.36m-1 16.417a1 1 0 1 1 0 2h-9a1 1 0 1 1 0-2h9m-9-2a1 1 0 1 1 0-2h7a1 1 0 1 1 0 2h-7m12-6a1 1 0 1 1 0 2H10a1 1 0 1 1 0-2h12m4.988-4.06a.997.997 0 0 0-.055-.27.722.722 0 0 0-.034-.092.976.976 0 0 0-.177-.262l-.019-.026-.007-.009-7-6.777a.982.982 0 0 0-.279-.184c-.03-.014-.065-.022-.098-.033a.997.997 0 0 0-.253-.05C19.043 3.01 19.023 3 19 3H7.72C6.22 3 5 4.22 5 5.72v20.334a2.726 2.726 0 0 0 2.722 2.723h16.555A2.727 2.727 0 0 0 27 26.054V10.777c0-.02-.01-.039-.012-.06z"/>

                        <div>
                            <div>Trò chơi</div>
                            <TermButton title="Ghép thẻ"
                                        path="M29.235 18.593a.641.641 0 0 1-.635.644h-7.306v-2.003c0-1.342-1.076-2.433-2.4-2.433H6.93c-1.323 0-2.4 1.09-2.4 2.433v2.003H3.4a.641.641 0 0 1-.635-.644v-7.66a.64.64 0 0 1 .635-.643h25.2a.64.64 0 0 1 .635.643v7.66m-13.124.957c.49 0 .889.38.889.85s-.398.85-.889.85H9.89c-.49 0-.889-.38-.889-.85s.398-.85.889-.85h6.222m3.418 3.517a.641.641 0 0 1-.635.644H6.93a.641.641 0 0 1-.635-.644v-5.833a.64.64 0 0 1 .635-.643h11.965a.64.64 0 0 1 .635.643v5.833M28.6 8.5H3.4C2.076 8.5 1 9.59 1 10.933v7.66c0 1.342 1.076 2.434 2.4 2.434h1.13v2.04c0 1.342 1.076 2.433 2.4 2.433h11.964c1.324 0 2.4-1.091 2.4-2.433v-2.04H28.6c1.324 0 2.4-1.092 2.4-2.434v-7.66C31 9.591 29.924 8.5 28.6 8.5z"/>
                            <TermButton title="Thiên thạch"
                                        path="M30.202 17.854c.596.481.892 1.249.771 2.002l-1.08 6.846a2.157 2.157 0 0 1-1.354 1.668l-6.487 2.488a2.165 2.165 0 0 1-2.126-.333l-5.404-4.359a2.15 2.15 0 0 1-.773-2.002l1.083-6.845c.058-.365.212-.7.433-.982.004-.006.004-.013.009-.018l.005-.004c.235-.293.545-.526.906-.664l6.486-2.489c.36-.136.746-.171 1.114-.112.004 0 .009-.002.013-.001.012.003.021.011.034.015.348.063.682.205.966.433l5.404 4.357m-8.588 2.22l.936-5.026-5.008 1.92 4.072 3.106m6.579 6.36l1.08-6.845a.427.427 0 0 0-.153-.4l-4.86-3.918-1.208 6.49c-.002.01-.009.02-.012.03-.008.038-.027.073-.04.11a.823.823 0 0 1-.093.187c-.008.012-.01.026-.018.037-.013.018-.034.024-.048.04a.84.84 0 0 1-.21.171c-.03.018-.055.036-.086.05a.855.855 0 0 1-.339.077h-.003a.86.86 0 0 1-.155-.015c-.016-.003-.03-.014-.046-.018a.817.817 0 0 1-.196-.079c-.032-.017-.066-.03-.096-.05-.009-.007-.02-.008-.027-.015l-5.26-4.01-.973 6.156a.428.428 0 0 0 .155.4l5.404 4.357c.12.096.283.121.425.066l6.487-2.487a.432.432 0 0 0 .272-.334M13.904 5.884c.564.518.81 1.302.645 2.047l-1.06 4.743a2.16 2.16 0 0 1-1.454 1.58l-4.652 1.457a2.122 2.122 0 0 1-1.069.052c-.008-.001-.016 0-.025-.002-.013-.003-.023-.011-.035-.015a2.153 2.153 0 0 1-.97-.502l-3.59-3.286a2.142 2.142 0 0 1-.598-.944c0-.004-.003-.006-.004-.01-.003-.01 0-.018-.003-.027a2.14 2.14 0 0 1-.04-1.067l1.06-4.742a2.158 2.158 0 0 1 1.454-1.58l4.65-1.457a2.17 2.17 0 0 1 2.101.467l3.59 3.286m-10.46 5.345l2.42 2.217.6-3.075-3.02.858m8.365 1.07l1.058-4.74a.429.429 0 0 0-.13-.412L9.15 3.862a.434.434 0 0 0-.42-.092L4.08 5.226a.435.435 0 0 0-.292.317l-.906 4.06L7.34 8.337c.009-.002.018 0 .026-.002.058-.015.118-.011.18-.014.056-.002.111-.01.166 0 .01 0 .018-.003.028 0 .04.007.07.03.106.043.062.021.123.04.179.074.044.027.079.063.117.098.044.039.088.074.124.122.034.047.055.101.08.156.018.039.046.07.058.113.003.01 0 .02.003.03.013.054.01.11.013.166.002.06.01.117 0 .175-.001.009.003.018 0 .028l-.884 4.538 3.981-1.247a.435.435 0 0 0 .292-.318z"/>
                        </div>
                    </Col>
                    <Col lg={7} style={{margin: "0 2% 0 4%"}}>

                        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                            <div className="term-content-right" onClick={() => setIsFlipped(true)}>
                                {(terms.list.length === 0) ? (
                                    <div>bạn chưa tạo thẻ nào</div>) : (terms.list[itemsIndex].question)}
                            </div>
                            <div className="term-content-right" onClick={() => setIsFlipped(false)}>
                                {(terms.list.length === 0) ? (
                                    <div>bạn chưa tạo thẻ nào</div>) : (terms.list[itemsIndex].explain)}
                            </div>
                        </ReactCardFlip>
                        {
                            (terms.list.length === 0) ?
                                (<div></div>) : (
                                    <div style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "3.5rem"
                                    }}>
                                        <AiOutlineArrowLeft className="arrow" onClick={arrowLeft}/>
                                        <div style={{fontSize: "1.5rem"}}>{itemsIndex + 1 + "/" + terms.list.length}</div>
                                        <AiOutlineArrowRight className="arrow" onClick={arrowRight}/>
                                    </div>
                                )
                        }

                    </Col>
                    {/* <Col sm={1}></Col> */}
                </Row>
                {terms.creator == user.user.id ? (
                    <Row style={{margin: "80px 0 50px 0"}}>
                        <Col lg={5}></Col>
                        <Col lg={6}>
                            <Button
                                style={{background: "#3ccfcf"}}
                                size="lg"
                                block
                                onClick={openPopup}
                            >
                                Thêm thuật ngữ
                            </Button>
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                ) : null}
                <Row>
                    <Col lg={5}></Col>
                    <Col lg={6}>
                        <h4 style={{marginBottom: "50px"}}>Thuật ngữ trong học phần này ({terms.total})</h4>
                        {terms.creator == user.user.id && terms.list.map((t: any, i: number) => (
                            <Card key={i} className="term-items">
                                <Card.Header className="created-at" style={{justifyContent: "flex-start"}}>
                                    <AiOutlineDelete className="delete-module"
                                                     onClick={() => deleteTerm(user.token, addToast, id, t.id)}/>
                                    <AiOutlineEdit className="edit-module" style={{marginLeft: "1rem"}}
                                                   onClick={() => openPopupUpdate(t)}/>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col lg={6}>
                                            <Container>
                                                {t.question}
                                            </Container>
                                        </Col>
                                        <Col lg={6}>
                                            <Container>
                                                {t.explain}
                                            </Container>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                        <TermEdit showAddTerm={showModal} closePopup={closePopup} module_id={id}/>
                        {
                            (showModalUpdate) ? (
                                <TermUpdate showEditTerm={showModalUpdate} closePopup={closePopupUpdate} module_id={id}
                                            item={itemm}/>
                            ) : (null)

                        }
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        terms: state.terms
    }
}
const mapDispatchToProps = (dispatch: any) => {

    return {
        allTerms: (token: String, id: any, setLoading: any) => dispatch(allTerms(token, id, setLoading)),
        deleteTerm: (token: String, addToast: any, module_id: any, term_id: any) => dispatch(deleteTerm(token, addToast, module_id, term_id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TermData));
