import CommentForm from "./CommentForm";
import userIcon from "../assets/images/chefs/user-icon.png";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import commentPostedTime from '../utilities/time';


const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
  indexOfComments,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = commentPostedTime(new Date().getTime() - new Date(comment.createdAt).getTime())

  return (
    <Wrapper>
      <Card className="comment-card">
        <div className="comment-card__top">
          <Card.Img
            className="comment-card__img"
            src={userIcon}
            alt="user-icon"
          />
          <Card.Title className="comment-card__title">
            {comment.username}
            <i className="comment-card__date">{createdAt}{indexOfComments}</i>
          </Card.Title>
        </div>
        <Card.Body className="comment-card__body">
          {!isEditing && <p className="comment-card__text">{comment.body}</p>}
          {isEditing && (
            <CommentForm
              buttonText="Update"
              hasCancelButton
              initialText={comment.body}
              handleSubmit={(text) => updateComment(text, comment.id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}
          <div className="comment-card__actions">
            {canReply && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
            )}
            {canEdit && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "editing" })
                }
              >
                Edit
              </div>
            )}
            {canDelete && (
              <div
                className="comment-action"
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </div>
            )}
          </div>
        </Card.Body>
        {isReplying && (
          <CommentForm
            buttonText="Reply" hasCancelButton
            handleCancel={() => {
                setActiveComment(null);
              }}
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            <h3 className="reply-title">{replies.length > 1 ? `${replies.length} replies for this comment` : `One reply for this comment`}</h3>
            {replies.map((reply) => (
              <div key={reply.id} className='mt-sm-4'>
                <Comment
                  comment={reply}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  addComment={addComment}
                  replies={[]}
                  parentId={comment.id}
                  currentUserId={currentUserId}
                />
              </div>
            ))}
          </div>
        )}
      </Card>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.section`
  .comment-card {
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: var(--shadow);
    margin: 1rem;
    padding: 1.5rem;
    border-radius: var(--borderRadius);
    width: 95%;
    .comment-card__top {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      .comment-card__img {
        padding: 0.3rem;
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 50%;
        border: 0.125rem solid var(--gray);
      }
      .comment-card__title {
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        .comment-card__date {
          font-size: var(--extrasmallFontSize);
          font-weight: 300;
          margin: 0.5rem 0.2rem;
          color: var(--gray);
        }
      }
    }

    .comment-card__body {
      width: 100%;
      padding: 0 1rem;
      margin-top: 1rem;
      .comment-card__text {
        font-size: var(--smallFontSize);
        font-weight: 300;
        color: var(--gray);
      }
      .comment-card__actions {
      }
      .comment-action {
      }
    }

    .comment-card__actions {
      display: flex;
      font-size: var(--smallFontSize);
      color: var(--orange);
      margin-bottom: 1rem;
      cursor: pointer;
      margin-top: 0.5rem;
      .comment-action {
        margin-right: 0.5rem;
      }
      .comment-action:hover {
        text-decoration: underline;
      }
    }

    .replies {
      margin-left: 1rem;
      .reply-title {
        font-size: calc(var(--headingFontSize) - 0.2rem) !important;
        font-weight: 900;
        margin-bottom: 1rem !important;
        text-transform: none !important;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1200px) {
      .replies {
        .comment-card__title {
          width: 87%;
        }
      }
    }
    @media only screen and (max-width: 992px) {
      .comment-form {
        margin-bottom: 2rem;
      }
      .comment-card__title {
        width: 86% !important;
      }
      .replies {
        .comment-card__title {
          width: 83% !important;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .comment-card__title {
        width: 81% !important;
      }
      .replies {
        .comment-card__title {
          width: 77% !important;
        }
      }
    }
    @media only screen and (max-width: 450px) {
      padding: 1rem !important;
      margin: 0.5rem !important;
      .comment-card__top {
        flex-direction: column !important;
        align-items: center;
        .comment-card__title {
          width: 95% !important;
        }
      }
      .replies {
        .reply-title {
          font-size: var(--bodyFontSize) !important;
        }
        .comment-card {
          margin: 0.5rem 0 !important;
        }
      }
    }
  }
`;
