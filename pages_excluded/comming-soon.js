import React from "react";

import dynamic from "next/dynamic";

import { Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

import HtmlHead from "./components/common/HtmlHead";
import Footer from "./components/Footer";

const CommingSoon = ({ data }) => {
  const { title, meta_description } = data;
  const {
    contact: { address },
  } = data;
  const {
    position: { latitude, longitude },
  } = data;
  const {
    logo: {
      image: { url },
    },
  } = data;

  const headParams = {
    title: title,
    meta: meta_description,
    faviconUrl: url,
  };

  const DynamicMap = dynamic(() => import("./components/common/Map"), {
    ssr: false,
  });

  const socialNetworks = data.social_networks.map((network, key) => {
    if (network.name === "Instagram") {
      return (
        <Link
          className="social-network-link instagram"
          href={`https://${network.url}`}
          key={key}
          target="_blank"
        >
          <InstagramIcon className="social-network-logo" />
        </Link>
      );
    }
  });

  return (
    <>
      <HtmlHead params={headParams} />

      <h1 className="green-text">{title}</h1>
      <img src={url} className="main-logo" />
      <h1>Uskoro otvaramo!</h1>
      <h4>{address}</h4>
      <h2>Pratite nas na društvenim mrežama</h2>
      <>{socialNetworks}</>
      <DynamicMap position={[latitude, longitude]} />
      <Footer title={title} />
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

  return {
    props: { data },
  };
};

export default CommingSoon;
