import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
function ForgetPassword() {
  return (
    <>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4 ">Password Reset</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            {/* {message && <Alert variant="success">{message}</Alert>} */}
            <Form onSubmit="">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
              <Button className="w-100 mt-3" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
      </>
    </>
  );
}

export default ForgetPassword;
