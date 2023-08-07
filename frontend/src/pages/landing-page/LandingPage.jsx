import { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import Banner from '../../components/landing-page/Banner';
import ProductCarousel from '../../components/landing-page/ProductCarousel';
import useGetProducts from '../../hooks/products/useGetProducts';
import { AuthContext } from '../../contexts/AuthContext';
import LoginAlert from '../../components/landing-page/LoginAlert';
import CategoryShowcase from '../../components/landing-page/CategoryShowcase';
import mobileCategImg from '../../assets/pics/mobile-category.jpg';
import LaptopCategImg from '../../assets/pics/laptop-category.jpg';
import audioCategImg from '../../assets/pics/audio-category.jpg';

import '../../components/landing-page/landingPage.css';
import LoadingComponent from '../../components/LoadingComponent';

function LandingPage() {
  const { data, isFetching } = useGetProducts('pageLimit=40');
  const { auth } = useContext(AuthContext);
  return (
    isFetching
      ? <LoadingComponent />
      : (
        <Container className="landing-page">
          <Banner />
          {!auth.email
            && (
              <Row className="pt-4 px-4">
                <LoginAlert />
              </Row>
            )}
          <Row className="justify-content-center">
            <h4>Newest Products</h4>

            <ProductCarousel productData={data} length={12} />
          </Row>
          <Row>
            <h4 className="p-4">Categories</h4>

            <CategoryShowcase
              products={data?.products.filter((product) => product.categories.includes('Smartphones'))}
              img={mobileCategImg}
              title="Smartphones"
              qparam="smartphone"
            />
          </Row>
          <Row>
            <CategoryShowcase
              products={data?.products.filter((product) => product.categories.includes('Laptops'))}
              img={LaptopCategImg}
              title="Laptops"
              qparam="laptops"
            />
          </Row>
          <Row>
            <CategoryShowcase
              products={data?.products.filter((product) => product.categories.includes('Audio Devices'))}
              img={audioCategImg}
              title="Audio Devices"
              qparam="audio devices"
            />
          </Row>
        </Container>
      ));
}

export default LandingPage;
