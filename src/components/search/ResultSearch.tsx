import React from 'react'
import { Button, Card, Form, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { getQuerySearch } from '../../helper/getQuerySearch'
import { optionsSearch } from '../../helper/optionsSeacrh'
import { joinClass } from '../../redux/actions/joinClassAction';
const ResultSearch = ({
    result,
    categorySearch,
    changeCategorySearch,
    sortByState,
    changeSortBy,
    user
}: any) => {
    const options = optionsSearch();
    const handle = (event: any) => {
        changeCategorySearch(event.target.value)
    }
    const {addToast} = useToasts();
    const query = getQuerySearch()
    return (
        <React.Fragment>
            {result == null || result.length < 1 ? (
                <h3 style={{ margin: "10px" }}>Không có kết quả phù hợp cho `{query.get('name')}`</h3>
            ) : (
                    <h3 style={{ margin: "10px" }}>Có {result.length} kết quả phù hợp `{query.get('name')}`</h3>
                )}
                <Row>
                <Col xs={5}>
                    <Form>
                        <Form.Control
                            as="select"
                            defaultValue={categorySearch}
                            name="category"
                            onChange={handle}
                            className="login-form"
                        >
                            <option disabled>Danh mục</option>
                            {options.category.map((c: any, i: number) => (
                                <option
                                    key={i} value={c.value}
                                >
                                    {c.label}
                                </option>
                            ))}
                        </Form.Control>
                    </Form>
                </Col>
                <Col xs={4}>
                    <Form>
                        <Form.Control
                            as="select"
                            defaultValue={categorySearch}
                            name="category"
                            className="login-form"
                            onChange={(event: any) => changeSortBy(event.target.value)}
                        >
                            <option disabled>Sắp xếp theo</option>
                            {options.fields.map((c: any, i: number) => (
                                <option key={i} value={c.value}>{c.label}</option>
                            ))}
                        </Form.Control>
                    </Form>
                </Col>
            </Row>
            {categorySearch == 'module' && result.map((res: any, i: number) => (
                <Card className="result-item" key={i}>
                    <Link to="/overview" style={{ textDecoration: "none", color: "black" }}>
                        <Card.Body>
                            <Card.Title>
                                {res.name}
                            </Card.Title>
                            <Card.Text>
                                {res.terms} thuật ngữ
                            </Card.Text>
                        </Card.Body>
                        <Card.Text style={{ marginLeft: "20px" }}>
                            <Image thumbnail src={require('../../assets/avatar.png')} className="avatar-custom-result"></Image>
                        </Card.Text>
                        <Card.Text className="author-result-search">
                            {res?.username}
                        </Card.Text>
                    </Link>
                    <Card.Body>
                    <Button>Join</Button>
                    </Card.Body>
                </Card>
            ))}
            {categorySearch == 'folder' && result.map((res: any, i: number) => (
                <Card className="result-item" key={i}>
                    <Link to={`/${res.username}/folder?code=${res.code}&id=${res.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <Card.Body>
                            <Card.Title>
                                {res.name}
                            </Card.Title>
                            <Card.Text>
                                {res?.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Text style={{ marginLeft: "20px" }}>
                            <Image thumbnail src={require('../../assets/avatar.png')} className="avatar-custom-result"></Image>
                        </Card.Text>
                        <Card.Text className="author-result-search">
                            {res?.username}
                        </Card.Text>
                    </Link>
                </Card>
            ))}
            {categorySearch == 'class' && result.map((res: any, i: number) => (
                <Card className="result-item" key={i}>
                    <Link to={`/${res.username}/class?code=${res.code}&id=${res.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <Card.Body>
                            <Card.Title>
                                {res.name}
                            </Card.Title>
                            <Card.Text>
                                {res?.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Text style={{ marginLeft: "20px" }}>
                            <Image thumbnail src={require('../../assets/avatar.png')} className="avatar-custom-result"></Image>
                        </Card.Text>
                        <Card.Text className="author-result-search">
                            {res?.username}
                        </Card.Text>
                    </Link>
                    <Row>
                        <Col sm={5}></Col>
                        <Col sm={4}>
                        <Button variant="success"
                            onClick={() => joinClass(user.token, res.id, addToast)}
                        >Gửi yêu cầu</Button>
                        </Col>
                    </Row>
                </Card>
            ))}
        </React.Fragment>
    )
}

export default ResultSearch
