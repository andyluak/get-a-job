import Head from "next/head";
import React from "react";

type Props = {
  page: string;
};

const DefaultHead = ({ page }: Props) => {
  const title = page ? `${page} - Get A Job` : "Get A Job";
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default DefaultHead;
