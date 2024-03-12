import React from "react";

import { Card, CardActionArea, CardMedia } from "@mui/material";

const ImageCard = ({ promotion, setDialogDisplayed, setCurrentPromotion }) => {
  const imageUrl = promotion.image.formats
    ? promotion.image.formats.medium.url
    : promotion.image.url;

  const handleClick = () => {
    setDialogDisplayed(true);
    setCurrentPromotion(promotion);
  };
  return (
    <div>
      <Card className="custom-card">
        <CardActionArea
          className="card-action-area"
          onClick={() => handleClick()}
        >
          <CardMedia
            component="img"
            className="card-image"
            image={imageUrl}
            title="Promotion Image"
          />
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ImageCard;
