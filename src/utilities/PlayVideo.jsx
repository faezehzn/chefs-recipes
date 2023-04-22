import { Modal } from "react-bootstrap";
import { useState } from "react";
import { ImPlay2 } from "react-icons/im";
import styled from "styled-components";

const PlayVideo = ({ className, youTubeId }) => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <Wrapper>
      <ImPlay2
        onClick={() => setPlayVideo(true)}
        className={className + " video--icon"}
      />
      <Modal
        className="modal-video"
        fullscreen={true}
        show={playVideo}
        onHide={() => setPlayVideo(false)}
        animation={true}
      >
        <Modal.Header
          className="modal-video__header"
          closeButton
        ></Modal.Header>
        <Modal.Body className="modal-video__body" closeButton>
          <iframe
            width={window.innerWidth - 700}
            height={window.innerHeight - 300}
            className="modal-video__iframe"
            src={`//www.youtube.com/embed/${youTubeId}`}
            title="YouTube video player"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};

export default PlayVideo;

const Wrapper = styled.section`
  .video--icon {
    position: absolute;
    color: var(--orange);
    top: 35%;
    left: 40%;
    font-size: 10rem;
    cursor: pointer;
  }
  /************ Responsive Css - video player modal ************/
  @media only screen and (max-width: 1200px) {
    .video--icon {
      top: 32%;
      left: 38%;
    }
  }
  @media only screen and (max-width: 992px) {
    .video--icon {
      top: 35%;
      left: 40%;
    }
  }
  @media only screen and (max-width: 768px) {
    .video--icon {
      top: 30%;
      left: 35%;
    }
  }
  @media only screen and (max-width: 576px) {
    .video--icon {
      font-size: 7rem;
      top: 35%;
      left: 40%;
    }
  }
  @media only screen and (max-width: 450px) {
    .video--icon {
      font-size: 3rem;
      top: 75%;
      left: 2%;
    }
  }
`;
