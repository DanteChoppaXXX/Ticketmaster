import React from "react";
import { Card, CardMedia, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "95%",
    left: "11px",
    top: "70px",
    borderRadius: "0",
  },
  bgImg: {
    height: 0,
    paddingTop: "56.25%",
  },
  content: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    color: "#fcfcfc",
  },
  overlay: {
    background: "rgb(0,0,0)",
    // eslint-disable-next-line
    background:
      "linear-gradient(6deg, rgba(0,0,0,0.8552338530066815) 48%, rgba(22,22,23,0.49888641425389757) 100%)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  icons: {
    marginRight: "8px",
  },
  name: {
    fontWeight: 450,
  },
  sub: {
    fontSize: "0.75rem",
  },
}));

const ImgCard = ({ date, image, name, tix }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => history.push("/ticket");

  return (
    <Card onClick={handleClick} className={classes.root}>
      <CardMedia image={image} className={classes.bgImg} />
      <div className={classes.overlay}></div>
      <div className={classes.content}>
        <Typography variant="h6" className={classes.name}>
          {name}
        </Typography>
        <Typography variant="subtitle1"  component="h4" className={classes.seating}>
          {date}
        </Typography>
        <Typography variant="subtitle2" className={classes.sub} component="p">
          <span className={classes.icons}>
            <i className="fa fa-ticket" aria-hidden="true"></i>
          </span>
          {`${tix} tickets`}
        </Typography>
      </div>
    </Card>
  );
};

export default ImgCard;
