import { useState, useRef } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel } from "swiper";
import TrackVisibility from "react-on-screen";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useCustomContext } from "../context/customContext";
import { LOCAL_URL } from "../context/constants";


const Comments = ({ commentsUrl, currentUserId, backendComments, singlePage, witchComments }) => {
  const { isAuthenticated, user, handleLogout } = useCustomContext()
  const [buttonText, setButtonText] = useState("Add Comment");
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const breakpointsComments = {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    576: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    1200: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  };

  const getReplies = (commentId) =>
  backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = async (text, parentId) => {
    const newComment = {
      id: witchComments.length + 1,
      body: text,
      parentId: parentId || null,
      userId: (isAuthenticated ? user.id : ""),
      username: (isAuthenticated ? user.username : ""),
      email: (isAuthenticated ? user.email : ""),
      createdAt: new Date().toISOString(),
      blogTitle: singlePage.title,
      blogImage: singlePage.bgImg,
    };
    setButtonText("Sending...");
    await axios.post(`${commentsUrl}`, newComment, {headers: {
      'Access-Control-Allow-Origin': "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
    }}).then((res) => {

      if (res.status === 200 || res.statusText === "Created") {
        setStatus({ succes: true, message: "Comment added successfully" });
        setTimeout(() => {
          refAlert.current.className += " d-none";
        }, 3000);
      } else {
        setStatus({
          succes: false,
          message: "Something went wrong, please try again later.",
        });
        setTimeout(() => {
          refAlert.current.className += " d-none";
        }, 3000);
      }
    });
    setButtonText(buttonText);
    setActiveComment(null);
  };

  const updateComment = (text, commentId) => {
    backendComments.map((backendComment) => {
      if (backendComment.id === commentId) {
        setButtonText("Updating...");
        axios.put(`${commentsUrl}/${commentId}`, { ...backendComment, body: text }).then((res) => {
          if (res.status === 200) {
            setStatus({
              succes: true,
              message: "Comment updated successfully",
            });
            setTimeout(() => {
              refAlert.current.className += " d-none";
            }, 3000);
          } else {
            setStatus({
              succes: false,
              message: "Something went wrong, please try again later.",
            });
            setTimeout(() => {
              refAlert.current.className += " d-none";
            }, 3000);
          }
        });
        setButtonText(buttonText);
        setActiveComment(null);
        return { ...backendComment, body: text };
      }
      return backendComment;
    });
  };

  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      setButtonText("Deleting...");
      await axios.delete(`${commentsUrl}/${commentId}`).then((res) => {
        if (res.status === 200) {
          setStatus({ succes: true, message: "Comment deleted successfully" });
          setTimeout(() => {
            refAlert.current.className += " d-none";
          }, 3000);
        } else {
          setStatus({
            succes: false,
            message: "Something went wrong, please try again later.",
          });
          setTimeout(() => {
            refAlert.current.className += " d-none";
          }, 3000);
        }
      });
      setButtonText(buttonText);
    }
  };

  return (
    <Wrapper>
      <div className="comments">
        <div className="comments-alert">
          {status.message && (
            <Alert
              ref={refAlert}
              className={status.succes ? "alert-success" : "alert-danger"}
            >
              {status.message}
            </Alert>
          )}
        </div>
        <h3 className="comments-title">Leave a comment</h3>
        {isAuthenticated ? (
          <p className="mb-2" style={{ fontWeight: "300", color: "var(--gray)" }}>
            Logged in as{" "}
            <Link style={{ color: "var(--orange)" }} reloadDocument to={`/my-account`}>
              {user.username}
            </Link>
            .{" "}
            <span style={{ color: "var(--orange)", cursor: "pointer" }} onClick={handleLogout}>
              Log out
            </span>
            ?
          </p>
        ) : (
          <p className="mb-2" style={{ fontWeight: "300", color: "var(--gray)" }}>
            You must be logged in!
          </p>
        )}
        <CommentForm isAuthenticated={isAuthenticated} buttonText={buttonText} handleSubmit={addComment} />
        <h4 className="comments-title mt-5">
          {witchComments.length > 0 && rootComments.length > 0
            ? rootComments.length > 1
              ? `${rootComments.length} Comments to “${singlePage.title}” `
              : `One Comment to “${singlePage.title}” `
            : `No Comment to “${singlePage.title}” `}
        </h4>
        {witchComments.length > 0 && backendComments.length > 0 ? (
          <TrackVisibility>
            {({ isVisible }) => (
              <Swiper
                spaceBetween={0}
                grabCursor={true}
                breakpoints={breakpointsComments}
                keyboard={{
                  enabled: true,
                }}
                mousewheel={true}
                loop={false}
                slidesPerView={1}
                modules={[Keyboard, Mousewheel]}
                className="d-flex mt-3"
              >
                {rootComments.map((rootComment, index) => (
                  <SwiperSlide className="" key={rootComment.id}>
                    <Comment
                      indexOfComments={rootComments.length > 0 && ` - ${index + 1}/${rootComments.length}`}
                      comment={rootComment}
                      replies={getReplies(rootComment.id)}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                      currentUserId={currentUserId}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </TrackVisibility>
        ) : (
          <div
            className="flex-column comments__main--reading-card"
            style={{ marginTop: "2rem", width: "auto" }}
          >
            <h5 className="d-block">NO Comment</h5>
            <p>Be the first to post your review</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Comments;

const Wrapper = styled.section`
  .comments {
    margin-top: 2rem;
    .comments-alert {
      position: fixed;
      top: 5%;
      width: 50%;
      left: 25%;
      z-index: 5;
      text-align: center;
      .alert {
        animation: moveDownToUp 1s ease-in;
        transition: var(--transition-fast);
      }
    }
    .comments-title {
      font-size: calc(var(--headingFontSize) - 0.2rem) !important;
      font-weight: 900;
      margin-bottom: 1rem !important;
      text-transform: none !important;
    }
    .comments-text {
      color: var(--gray);
      font-weight: 300;
      a {
        color: var(--orange) !important;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 450px) {
      .comments-text {
        font-size: var(--smallFontSize) !important;
      }
    }
  }
`;
