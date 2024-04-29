import { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { Button, Col, Container, Card, Form, Row } from "react-bootstrap";
import 'react-spring-bottom-sheet/dist/style.css'
// these imports of line 6 and 7 are to take data from db to populate into the bottomsheet
import { useQuery } from '@apollo/client';
import { QUERY_FOUNTAINS } from "../utils/queries";


export default function SlideUp() {
  const [open] = useState(false);

  const { loading, data } = useQuery(QUERY_FOUNTAINS);
  const cards = data?.fountains || [];

  const popHeight = 670; // Adjust the pop height as needed

  return (
    <>
      <BottomSheet className='slideup'
      blocking = {false}
        open={open}
        header={
          <div className="sheetHeader">SHEET HEADER
            <Container className="mt-5">
              <Row>
                <Col sm={4}>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button>
                      Search
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        }
        snapPoints={({ maxHeight }) => {
          return [maxHeight - popHeight, maxHeight - 200];
        }}
      >
        <div className="sheetBody">
        {cards.map(({_id, place, address}) => {
          return (
          <Col md="4">
            <Card key={_id} border='dark'>
              <Card.Body>
                <Card.Title>{address}</Card.Title>
                <Card.Text>{place}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          )
        })}
        </div>
      </BottomSheet>
    </>
  );
}