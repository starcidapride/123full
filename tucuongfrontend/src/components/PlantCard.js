import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// truyền tham số vào cái component này để nó render ra tham số
function PlantCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.data.image} />
      <Card.Body>
        <Card.Title>{props.data.name}</Card.Title>
        <Card.Text>
        {props.data.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default PlantCard