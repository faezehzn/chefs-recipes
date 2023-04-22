import { Badge, Modal } from "react-bootstrap";
import { useState } from "react";
import { ImSearch } from "react-icons/im";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import "swiper/css/navigation";
import "swiper/css";

const FullScreenImages = ({ className }) => {
  const { singleProduct } = useCustomContext();
  const [fullImage, setFullImage] = useState(false);
  
  return (
    <Wrapper>
      <Badge
        onClick={() => setFullImage(true)}
        className={className + " image--icon"}
      >
        <ImSearch />
      </Badge>
      <Modal
        style={{ opacity: "1"}}
        fullscreen={true}
        show={fullImage}
        onHide={() => setFullImage(false)}
        animation={true}
      >
        <Modal.Header
          style={{ margin: "1rem", border: "none"}}
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <Swiper
            spaceBetween={0}
            grabCursor={true}
            navigation={true}
            keyboard={{
              enabled: true,
            }}
            loop={false}
            modules={[Navigation, Keyboard]}
            className="d-flex swiper__box"
          >
            {singleProduct.images.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item} alt={singleProduct.title} style={{ height: "100%"}} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};

export default FullScreenImages;

const Wrapper = styled.section`
  position: relative;
  .image--icon {
    position: absolute;
    top: 2.5rem;
    right: 4rem;
    z-index: 100;
    color: var(--orange);
    background-color: var(--light) !important;
    font-size: var(--bodyFontSize);
    width: 2rem;
    height: 2rem;
    padding: 0.3rem;
    border-radius: 50%;
    transition: var(--transition-fast);
    border: 0.05rem solid var(--gray);
    cursor: pointer;
  }

  /************ Responsive Css - image modal ************/
  @media only screen and (max-width: 1300px) {
    .image--icon {
      right: 2.5rem;
      top: 2rem;
    }
  }
  @media only screen and (max-width: 992px) {
    .image--icon {
      display: none;
    }
  }
`;
