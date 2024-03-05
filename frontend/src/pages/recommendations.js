import Container from "react-bootstrap/esm/Container";
import { SingleCardComponent, MultipleCardComponent } from "../components/Card";
import { Row, Col, Button, Image, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import './recommendations.css';

const Recommendations = () => {
  const [format, setFormat] = useState("single")
  const [formatTo, setformatTo] = useState('double')

  const handleFormatChange = (format) => {
    if (format === 'single') {
      setFormat('single')
    } else {
      setformatTo(format)
      handleFormatShow()
    }
  }

  const [formatShow, setFormatShow] = useState(false);

  const handleFormatClose = () => setFormatShow(false);
  const handleFormatShow = () => setFormatShow(true);
  const handleFormatSubmit = () => {
    setFormat(formatTo)
    setFormatShow(false);
  }

  const [email, setEmail] = useState("");

  const [inviteShow, setInviteShow] = useState(false);
  const handleInviteOpen = () => setInviteShow(true);
  const handleInviteClose = () => setInviteShow(false);
  const [formData, setFormData] = useState({
    phonenumber: undefined,
    gamingdate: undefined,
    gamingtime: undefined,
    gamelocation: undefined,
    notes: "",
    zip: undefined
  });
  return (
    <Container>
      <div className="recommd-tool">
        <h3>Recommendations for you</h3>
        <div className="d-flex align-items-center">
          <span style={{ marginRight: 20 }}>Game Format</span>
          <div>
            <span style={format === 'single' ? { color: 'rgb(45,116,229)', borderBottom: '2px solid rgb(45, 116, 229)', display: 'inline-block', padding: '8px', margin: '0 10px' } : { display: 'inline-block', padding: '8px', margin: '0 10px' }} onClick={() => { handleFormatChange('single') }}>Single</span>
            <span style={format === 'double' ? { color: 'rgb(45,116,229)', borderBottom: '2px solid rgb(45, 116, 229)', display: 'inline-block', padding: '8px', margin: '0 10px' } : { display: 'inline-block', padding: '8px', margin: '0 10px' }} onClick={() => { handleFormatChange('double') }}>Double</span>
            <span style={format === 'mix' ? { color: 'rgb(45,116,229)', borderBottom: '2px solid rgb(45, 116, 229)', display: 'inline-block', padding: '8px', margin: '0 10px' } : { display: 'inline-block', padding: '8px', margin: '0 10px' }} onClick={() => { handleFormatChange('mix') }}>Mix</span>
          </div>
        </div>
      </div>
      {format === 'single' && <div>
        <Row className="my-4">
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
          <Col md={3} className="d-flex justify-content-center mb-4" sm >
            <SingleCardComponent invite onInviteClick={handleInviteOpen} />
          </Col>
        </Row>
      </div>}
      {(format === 'double' || format === 'mix') &&
        <div>
          <Row>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
          </Row>
          <Row>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
            <Col md={3} className="d-flex justify-content-center mb-4" sm>
              <MultipleCardComponent invite onInviteClick={handleInviteOpen} />
            </Col>
          </Row>
        </div>}


      <Modal show={formatShow} onHide={handleFormatClose} centered size="lg">
        <Modal.Body>
          <div style={{ padding: 40 }}>
            <h4>Please let use know who is your partner</h4>
            <div className="d-flex align-items-center my-5">
              <Form.Control
                type="email"
                placeholder="Type in your partner's email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button style={{ marginLeft: 10 }} onClick={handleFormatSubmit} >Submit</Button>
            </div>
            <h4>Don’t have a partner yet? Click <span style={{ color: 'blue' }}>here</span> to find a partner first.</h4>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={inviteShow} onHide={handleInviteClose} centered>
        <Modal.Body>
          <h4>Hi Daniel, please fill up your invitationfor Jennifer</h4>
          <Form>
            <Form.Group className="mb-3" controlId="phonenumber">
              <Form.Label>Your Phone Number</Form.Label>
              <Form.Control
                value={formData.phonenumber}
                onChange={(e) => {
                  handleChange("phonenumber", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="gamingdate">
              <Form.Label>Gaming Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.gamingdate}
                onChange={(e) => {
                  handleChange("gamingdate", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="gamingtime">
              <Form.Label>Gaming Time</Form.Label>
              <Form.Control
                value={formData.gamingtime}
                onChange={(e) => {
                  handleChange("gamingtime", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="gamelocation">
              <Form.Label>Gaming Location</Form.Label>
              <Form.Control
                value={formData.gamelocation}
                onChange={(e) => {
                  handleChange("gamelocation", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="opponentscores">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                value={formData.zip}
                onChange={(e) => {
                  handleChange("zip", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="notes"
            >
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={formData.notes}
                onChange={(e) => {
                  handleChange("notes", e.target.value);
                }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInviteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleInviteClose}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default Recommendations;
