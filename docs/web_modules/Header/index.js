import React, { Component } from "react"
import { Link } from "react-router"

import styles from "./index.css"
import npmPkg from "../../../package.json"
import StatinamicLogoSVG from "../../../logo/statinamic-text.svg"

const supportUrl = "https://discord.gg/0ZcbPKXt5bW1pAiw"
const supportBadge =
  "https://img.shields.io/badge/support-reactiflux%23statinamic-738bd7.svg"
const changelogUrl =
  "https://github.com/MoOx/statinamic/blob/master/CHANGELOG.md"

export default class Header extends Component {

  render() {
    const separator = <span className={ styles.separator }>{ " | " }</span>

    return (
      <header>
        <div className={ styles.logo }>
          <StatinamicLogoSVG width="100%" height="auto" />
        </div>
        <nav className={ styles.nav }>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/"
          >
            { "Home" }
          </Link>
          { separator }
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/docs/setup/"
          >
            { "Setup" }
          </Link>
          { separator }
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/docs/usage/"
          >
            { "Usage" }
          </Link>
          { separator }
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/docs/faq/"
          >
            { "FAQ" }
          </Link>
          { separator }
          <a
            className={ styles.link }
            href="https://github.com/MoOx/statinamic"
          >
            { "GitHub" }
          </a>
          { separator }
          <a
            className={ styles.link }
            href="https://twitter.com/Statinamic"
          >
            { "Twitter" }
          </a>
          { separator }
          <a
            className={ styles.link }
            href={ supportUrl }
          >
            <img
              className={ styles.icon }
              src={ supportBadge }
              alt={ "Support on reactiflux#statinamic" }
            />
          </a>
          { separator }
          <a
            className={ styles.version }
            href={ changelogUrl }
          >
            { `v${ npmPkg.version }` }
          </a>
        </nav>
      </header>
    )
  }
}
