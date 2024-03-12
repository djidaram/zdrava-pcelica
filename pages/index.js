import React from "react";

import { serialize } from "next-mdx-remote/serialize";

import HtmlHead from "../components/common/HtmlHead";
import Header from "../components/Header";
import Parallax from "../components/Parallax";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { Grid } from "@mui/material";

const App = ({ data, cmsDomain }) => {
  const { title, meta_description } = data;
  const { main_line, second_line } = data;
  const { contact, position } = data;
  const { social_networks } = data;
  const { promotions } = data;
  const {
    logo: {
      image: { url },
    },
  } = data;
  const { products } = data;
  const headParams = {
    title: title,
    meta: meta_description,
    faviconUrl: url,
  };
  const { about } = data;

  return (
    <>
      <HtmlHead params={headParams} />
      <Grid container>
        <Header title={title} logo={url} />
        <Grid container>
          <Grid item lg={2}></Grid>
          <Grid container item xs={12} md={12} lg={8}>
            <Grid item xs={12}>
              <Parallax main_line={main_line} second_line={second_line} />
            </Grid>
            <Grid item zeroMinWidth>
              <Main
                products={products}
                promotions={promotions}
                contact={contact}
                position={position}
                social_networks={social_networks}
                about={about}
              />
            </Grid>
          </Grid>
          <Grid item lg={2}>
            <></>
          </Grid>
        </Grid>

        <Footer title={title} />
      </Grid>
    </>
  );
};

export const getStaticProps = async () => {
  const cmsDomain = process.env.STRAPI_DOMAIN;
  const collection = process.env.COLLECTION_NAME;
  const url = `${cmsDomain}/${collection}`;
  console.log("Loaded CMS URL:", url);

  const response = await fetch(url);
  const data = await response.json();

  await serializeMarkdown(data);

  return {
    props: { data, cmsDomain },
  };
};

const serializeMarkdown = async (data) => {
  for (let promotion of data.promotions) {
    const new_description = await serialize(promotion.description);
    promotion.description = new_description;
  }

  for (let product of data.products) {
    const new_description = await serialize(product.description);
    product.description = new_description;
  }
};

export default App;
