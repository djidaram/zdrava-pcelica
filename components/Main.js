import React from "react";
import { MDXRemote } from "next-mdx-remote";

import NoPromotions from "./common/NoPromotions";
import PromotionCard from "./common/ImageCard";
import ProductCard from "./common/ProductCard";
import Contact from "../components/Contact";
import { Dialog, DialogTitle, DialogContent, Grid, Card } from "@mui/material";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const Main = ({
  products,
  promotions,
  contact,
  position,
  social_networks,
  about,
}) => {
  const [isDialogDisplayed, setDialogDisplayed] = React.useState(false);
  const [currentPromotion, setCurrentPromotion] = React.useState();

  const [transform, setTransform] = React.useState("translate3d(0,0px,0)");
  React.useEffect(() => {
    if (window.innerWidth >= 700) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 700) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    if (window.pageYOffset < 400) {
      var windowScrollTop = window.pageYOffset / 4;
      setTransform("translate3d(0,-" + windowScrollTop + "px,0)");
    }
  };

  return (
    <div>
      <Card elevation={8} style={{ transform: transform, margin: "0 16px" }}>
        <Grid container>
          <Grid item xs={12}>
            <div className="main-image-box">
              {about.image.map((item, index) => (
                <img
                  key={`main-image=${index}`}
                  src={item.formats ? item.formats.medium.url : item.url}
                />
              ))}
            </div>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="left"
            xs={12}
            spacing={3}
            style={{ margin: "0 24px 24px 0px" }}
          >
            {products.map((product, index) => (
              <Grid
                item
                xs={12}
                md={3}
                className="main"
                key={`product-key-${index}`}
              >
                <ProductCard
                  product={product}
                  setDialogDisplayed={setDialogDisplayed}
                  setCurrentPromotion={setCurrentPromotion}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} style={{ margin: "0 24px 24px 0px" }}>
            <div id="Akcije" className="main">
              {promotions.length > 0 ? (
                promotions.map((promotion, index) => (
                  <PromotionCard
                    promotion={promotion}
                    setDialogDisplayed={setDialogDisplayed}
                    setCurrentPromotion={setCurrentPromotion}
                    key={`promotion-key-${index}`}
                  />
                ))
              ) : (
                <NoPromotions />
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div id="Kontakt" style={{ margin: "0 24px 24px 24px" }}>
              <Contact
                contact={contact}
                position={position}
                social_networks={social_networks}
              />
            </div>
          </Grid>
        </Grid>
      </Card>

      {currentPromotion && (
        <Details
          promotion={currentPromotion}
          isOpen={isDialogDisplayed}
          closeCallback={setDialogDisplayed}
        />
      )}
    </div>
  );
};

const Details = ({ promotion, isOpen, closeCallback }) => {
  const { id, name, description } = promotion;

  const idDetailsTitle = `details-title-${id}`;
  const idDetailsDescription = `details-description-${id}`;

  return (
    <Dialog
      keepMounted
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={isOpen}
      onClose={() => closeCallback(false)}
      aria-labelledby={idDetailsTitle}
      aria-describedby={idDetailsDescription}
      maxWidth="md"
    >
      <div className="dialog">
        <IconButton
          onClick={() => closeCallback(false)}
          className="button-close"
          size="large"
        >
          <Close />
        </IconButton>
        <div className="sections">
          <DialogTitle
            className="dialog-title"
            style={{ padding: "16px 16px 0 16px" }}
            id={idDetailsTitle}
          >
            {name}
          </DialogTitle>
          <DialogContent
            className="dialog-content"
            id={idDetailsDescription}
            style={{ padding: "16px" }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <img
                src={
                  promotion.image.formats
                    ? promotion.image.formats.medium.url
                    : promotion.image.url
                }
              />
            </div>
            <MDXRemote {...description} />
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};

export default Main;
