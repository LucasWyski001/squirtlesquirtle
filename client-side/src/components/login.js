import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Retro.png';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// instead of function use this syntax way, in line 5
export const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              {data ? (
                <Card.Body>
                  <h3>
                    Success! You may now head{' '}
                    <Link to="/home">to the homepage.</Link>
                  </h3>
                </Card.Body>
              ) : (
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                      <img src={logo} alt="Logo" />
                    </h2>
                    <div className="mb-3">
                      <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">Email</Form.Label>
                          <Form.Control type="text" placeholder="Enter Email" name="email" value={formState.email} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" name="password" value={formState.password} onChange={handleChange} />
                        </Form.Group>


                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        ></Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              )}

              {error && (
                <h3>
                  {error.message}
                </h3>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}