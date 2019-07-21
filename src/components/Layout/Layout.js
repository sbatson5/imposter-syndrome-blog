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
      <meta name="google-site-verification" content="KcmxLbVeRmb_f539GPdSV2ZHVl9eqV9qEXclRMLC1MA" />
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      {image ? <meta property="og:image" content={image} /> : ''}
      <meta property="og:type" content="blog" />
    </Helmet>
    <base target="_blank" />
    {children}
  </div>
);

export default Layout;
