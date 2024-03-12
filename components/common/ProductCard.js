import React from "react";
import { orange } from "./colors";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
} from "@mui/material";

const ProductCard = ({ product, setDialogDisplayed, setCurrentPromotion }) => {
  const imageUrl = product.image.formats
    ? product.image.formats.medium.url
    : product.image.url;

  const handleClick = () => {
    setDialogDisplayed(true);
    setCurrentPromotion(product);
  };
  return (
    <div>
      <Card className="custom-card">
        <Divider style={{ borderColor: orange[500], borderWidth: "2px" }} />
        <CardActionArea className="card-action-area" onClick={handleClick}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10} style={{ width: "100%", height: "220px" }}>
              <CardMedia
                component="img"
                src={imageUrl}
                title="Product Image"
                style={{ objectFit: "contain", height: "220px" }}
              />
            </Grid>
            <Grid item xs={2}>
              <CardContent style={{ height: "35px" }}>
                <p className="card-content">
                  {`${product.name}`.toUpperCase()} {product.price}
                </p>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductCard;
