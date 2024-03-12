import React from "react";

import Head from "next/head";

const HtmlHead = ({ params }) => {
  const { title, meta, faviconUrl } = params;

  return (
    <Head>
      <meta name="description" content={meta} />
      <title>{title}</title>
      <link rel="icon" href={faviconUrl} />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3551487159103497"
        crossorigin="anonymous"
      ></script>
    </Head>
  );
};

export default HtmlHead;
