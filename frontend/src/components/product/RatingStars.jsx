/* eslint-disable react/no-array-index-key */
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { Container, Row, Col } from 'react-bootstrap';

export default function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = new Array(fullStars).fill().map((_, index) => <BsStarFill key={index} color="gold" />);

  const renderHalfStar = <BsStarHalf color="gold" />;

  const renderEmptyStars = new Array(emptyStars).fill().map((_, index) => <BsStar key={index} color="gold" />);

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          {renderStars}
          {hasHalfStar && renderHalfStar}
          {renderEmptyStars}
          <span>{`(${rating})`}</span>
        </Col>
      </Row>
    </Container>
  );
}
