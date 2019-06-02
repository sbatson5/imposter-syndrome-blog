import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';

const Layout = ({
  children,
  title,
  description,
  image
}) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="blog" />
    </Helmet>
    {children}
  </div>
);

export default Layout;
