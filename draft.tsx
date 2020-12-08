<Card key={i}>
    <Card.Header className="created-at" style={{ justifyContent: "flex-start" }}>
        <AiOutlineDelete className="delete-module" onClick={() => deleteTerm(user.token, addToast, id, t.id)} />
        <AiOutlineEdit className="edit-module" style={{ marginLeft: "1rem" }} onClick={() => openPopupUpdate(t)} />
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