import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {Row, Spinner} from "react-bootstrap";
import {allTest, checkResult} from "../../redux/actions/testActions";
import {useToasts} from "react-toast-notifications";
import ScorePopup from "./ScorePopup";

const TestData = ({allTest, user, checkAnswer, test}: any) => {
    const quizData = [
        {
            id: "1",
            question: "What is the most used programming language in 2019?",
            answer: [{answer: "Java"}, {answer: "C"}, {answer: "Python"}, {answer: "JavaScript"}],
        }, {
            id: "1",
            question: "Who is the President of US?",
            answer: [{answer: "Florin Pop"}, {answer: "Donald Trump"}, {answer: "Ivan Saldano"}, {answer: "Mihai Andrei"}],
        }, {
            id: "1",
            question: "What does HTML stand for?",
            answer: [{answer: "Hypertext Markup Language"}, {answer: "Cascading Style Sheet"}, {answer: "Jason Object Notation"}, {answer: "Helicopters Terminals Motorboats Lamborginis"}],
        }, {
            id: "1",
            question: "What year was JavaScript launched?",
            answer: [{answer: "1996"}, {answer: "1995"}, {answer: "1994"}, {answer: "none of the above"}],
        }
    ];

    let {id} = useParams<{ id: any }>();

    const [loading, setLoading] = useState(true)

    const {addToast} = useToasts()

    useEffect(() => {
        setLoading(true)
        allTest(user.token, id, () => {
            setLoading(false)
        })

    }, [])

    const [questionIndex, setQuestionIndex] = useState(0)
    const [data, setData] = useState(quizData);
    const [popup, setPopup] = useState(false);
    const [playerAnswer, setPlayerAnswer] = useState({
        id: "",
        answer: "",
    })
    const [dataPost, setDataPost] = useState<{ id: string; answer: string; }[]>([]);


    const handleSubmit = () => {
        const data = {
            sets: [...dataPost, playerAnswer],
        };

        checkAnswer(user.token, addToast, data, () => setPopup(true));


    }

    const handleClose = () => {
        setPopup(false)
    }

    const handleNextQuestion = () => {
        setQuestionIndex(questionIndex + 1);
        setDataPost([...dataPost, playerAnswer])
    }

    const handleChange = (e: any) => {
        console.log(e.target.id, e.target.value);
        setPlayerAnswer({
            ...playerAnswer,
            id: e.target.id,
            answer: e.target.value
        })
    }

    return (
        <>
            {loading ? (
                <Row style={{marginTop: "100px", marginBottom: "100px"}} className="d-flex justify-content-center">
                    <Spinner animation="grow" variant="success"/>
                    <Spinner animation="grow" variant="danger"/>
                    <Spinner animation="grow" variant="warning"/>
                </Row>
            ) : <div className="test-container">
                <div className="quiz-container" id="quiz">
                    <div className="quiz-header">
                        <h2 id="question">{data[questionIndex].question}</h2>
                        <ul>
                            {data[questionIndex].answer.map(e1 => (
                                <>
                                    <li>
                                        <input
                                            type="radio"
                                            id={data[questionIndex].id}
                                            value={e1.answer}
                                            name="answer"
                                            className="answer"
                                            onChange={handleChange}
                                            defaultChecked={false}
                                        />
                                        <label
                                            id="text">{data[questionIndex].answer[data[questionIndex].answer.indexOf(e1)].answer}</label>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                    {
                        questionIndex < data.length - 1
                            ? <button type="submit" onClick={handleNextQuestion}>Next</button>
                            : <button type="submit" onClick={handleSubmit}>Submit</button>

                    }
                </div>
            </div>
            }
            <ScorePopup showPopup={popup} closePopup={handleClose} score={test.score}/>

        </>
    )

}

const mapStateToProps = (state: any) => {
    console.log('mapStateToProps', state)
    return {
        user: state.user,
        test: state.test,
    }
}
const mapDispatchToProps = (dispatch: any) => {

    return {
        allTest: (token: String, moduleId: any, setLoading?: any) => dispatch(allTest(token, moduleId, setLoading)),
        checkAnswer: (token: String, addToast: any, data: object, setPopup?: any) => dispatch(checkResult(token, addToast, data, setPopup))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TestData));
