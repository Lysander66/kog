import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

import styles from './index.module.css'
import 'css-doodle'

function HomepageHeader () {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home () {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Lysander ${siteConfig.title}`}
      description="Description 33">
      {/* <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main> */}

      <css-doodle click-to-update>
        <style>

          {`
  :doodle {
    @grid: 20 / 100vmax;
    background: #0a0c27;
    font-family: sans-serif;
  }
  :after {
    content: \@hex.@r(0x2500, 0x257f);
    color: hsla(@r360, 70%, 70%, @r.9);
    font-size: 8vmin;
  }

  `}
        </style>

      </css-doodle>
    </Layout>
  )
}
