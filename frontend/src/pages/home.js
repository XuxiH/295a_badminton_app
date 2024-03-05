import Container from "react-bootstrap/esm/Container";
import { Card, Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const Home = () => {
    return (
        <Container>
            <h3 className="my-4">Rating History</h3>
            <Card style={{ height: 220, width: 300 }}>
                <Card.Body>
                    <p>Current Rating: 1234</p>
                </Card.Body>
            </Card>
            <h3 className="my-4">Recent Games</h3>
            <div>
                <Row>
                    <Col className="my-3" sm xs={2} md={2} >
                        <span style={{ color: 'rgba(180, 180, 180, 1)', fontSize: 20 }}>Date</span>
                    </Col>
                    <Col className="my-3" sm xs={3} md={2}>
                        <span style={{ color: 'rgba(180, 180, 180, 1)', fontSize: 20 }}>Author</span>
                    </Col>
                    <Col className="my-3" sm xs={6} md={2}>
                        <span style={{ color: 'rgba(180, 180, 180, 1)', fontSize: 20 }}>Play Format</span>
                    </Col>
                    <Col className="my-3" sm xs={1} md={6}>
                        <span></span>
                    </Col>
                </Row>
                <Row style={{ borderBottom: '1px solid rgba(180, 180, 180, 1)' }}>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Nov 23,2023</span>
                    </Col>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Jennifer Lee</span>
                    </Col>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Single</span>
                    </Col>
                    <Col className="d-flex justify-content-around align-items-center  my-3" sm md={6}>
                        <div>
                            <span>
                                <Image style={{ height: '2em', marginRight: '20px' }} src="https://github.com/mdo.png" roundedCircle />
                                <span>Jennifer Lee</span>
                            </span>
                        </div>
                        <div>
                            <span>34 vs 28</span>
                        </div>
                        <div>
                            <span>
                                <Image style={{ height: '2em', marginRight: '20px' }} src="https://github.com/mdo.png" roundedCircle />
                                <span>Jessica Young</span>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row style={{ borderBottom: '1px solid rgba(180, 180, 180, 1)' }}>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Nov 23,2023</span>
                    </Col>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Jennifer Lee</span>
                    </Col>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Single</span>
                    </Col>
                    <Col className="d-flex justify-content-around align-items-center my-3" sm md={6}>
                        <div className="d-flex flex-column">
                            <span>
                                <Image style={{ height: '2em', marginRight: '20px' }} src="https://github.com/mdo.png" roundedCircle />
                                <span>Jennifer Lee</span>
                            </span>
                            <span>
                                <Image style={{ height: '2em', marginRight: '20px' }} src="https://github.com/mdo.png" roundedCircle />
                                <span>Jennifer Lee</span>
                            </span>
                        </div>
                        <div>
                            <span>34 vs 28</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span>
                                <Image style={{ height: '2em', marginRight: '20px' }} src="https://github.com/mdo.png" roundedCircle />
                                <span>Jessica Young</span>
                            </span>
                            <span>
                                <Image style={{ height: '2em', marginRight: '20px' }} src="https://github.com/mdo.png" roundedCircle />
                                <span>Jessica Young</span>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row style={{ borderBottom: '1px solid rgba(180, 180, 180, 1)' }}>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Nov 23,2023</span>
                    </Col>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Jennifer Lee</span>
                    </Col>
                    <Col className="my-3 d-flex align-items-center" sm md={2}>
                        <span>Single</span>
                    </Col>
                    <Col className="d-flex justify-content-around align-items-center  my-3" sm md={6}>
                        <div>
                            <span>Jennifer Lee</span>
                        </div>
                        <div>
                            <span>34 vs 28</span>
                        </div>
                        <div>
                            <span>Jessica Young</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
export default Home;
