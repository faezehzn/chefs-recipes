import { Card } from "react-bootstrap";
import { GetSlug } from "../utilities/StringSlugConverter";

const EmbedCard = ({ singleRecipe }) => {
  const styles = {
    embedBody: {
      backgroundColor: "#fff",
    },
    embedBodyCartTop: {
      width: "10vw",
      minWidth: "10vw",
      borderRadius: "0.75rem",
      overflow: "auto",
      position: "relative",
    },
    embedBodyCartImg: {
      borderRadius: "0.75rem",
      height: "15vh",
      minHeight: "15vh",
    },
    embedBodyCartBody: {
      padding: "0 0 0 2rem",
    },
    embedBodyCartTitle: {
      fontSize: "1.5rem",
      color: "#2b2c2b",
      fontWeight: "700",
      width: "90%",
    },
    embedBodyCartBadges: {
      display: "flex",
      marginBottom: "0.5rem",
      height: "1.8rem",
    },
    embedBodyCartBadge: {
      backgroundColor: "#C06014",
      borderRadius: "1.3rem",
      marginRight: "0.5rem",
      padding: "0.5rem 1rem",
      color: "#F3F4ED",
      fontSize: "0.7rem",
    },
    embedBodyCartText: {
      fontSize: "0.9rem",
      color: "#536162",
      fontWeight: "700",
    },
    embedBodyCartTextInner: {
      fontSize: "1rem",
      color: "#C06014",
    },
  };

  if (!singleRecipe) {
    return null;
  }
  return (
    <div>
      <Card style={styles.embedBody}>
        <div style={styles.embedBodyCartTop}>
          <a href={`${window.location}`}>
            <Card.Img
              style={styles.embedBodyCartImg}
              src={singleRecipe.image}
              alt={singleRecipe.title}
            />
          </a>
        </div>
        <Card.Body style={styles.embedBodyCartBody}>
          <a href={`${window.location}`}>
            <Card.Title style={styles.embedBodyCartTitle}>
              {singleRecipe.title}
            </Card.Title>
          </a>
          <Card.Text style={styles.embedBodyCartBadges}>
            <span
              style={styles.embedBodyCartBadge}
              className="d-flex align-items-center"
            >
              {singleRecipe.readyInMinutes} min
            </span>
            {singleRecipe.analyzedInstructions.length > 0 ? (
              <span
                style={styles.embedBodyCartBadge}
                className="d-flex align-items-center"
              >
                {singleRecipe.analyzedInstructions[0].steps.length} steps
              </span>
            ) : null}
          </Card.Text>
          <Card.Text style={styles.embedBodyCartText}>
            Powered by:{" "}
            <a
              href={`${window.location.origin}/authors/${GetSlug(
                singleRecipe.sourceName.toLowerCase()
              )}`}
              style={styles.embedBodyCartTextInner}
            >
              {singleRecipe.sourceName}
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmbedCard;
