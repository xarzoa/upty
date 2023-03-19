import Head from 'next/head';

export default function HeadComp({ data }) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta
          name="viewport"
          content="width=device-width,  initial-scale=1.0, maximum-scale=1.0, user-scalable=0'"
        />
        <meta name="keywords" content={data.tags} />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="xarzoa" />

        {/* og-tags */}

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={data.title}
        />
        <meta
          property="og:description"
          content={data.description}
        />
        <meta
          property="og:image"
          content={data.ogImg}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content={data.title}
        />
        <meta
          property="twitter:description"
          content={data.description}
        />
        <meta
          property="twitter:image"
          content={data.ogImg}
        />
        <link rel="icon" href={data.favicon} />
      </Head>
    </>
  );
}
