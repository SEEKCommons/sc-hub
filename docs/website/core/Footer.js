/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc
  }

  pageUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? language + '/' : '') + doc
  }

  render () {
    const currentYear = new Date().getFullYear()
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>

          <div>
            <h5>Guides</h5>
            <a
              href={this.docUrl(
                'authoring-getting-started.html',
                this.props.language
              )}
            >
              Authoring a Case
            </a>
            <a
              href={this.docUrl(
                'teaching-getting-started.html',
                this.props.language
              )}
            >
              Teaching a Case
            </a>
            <a href={this.pageUrl('help.html', this.props.language)}>
              Get Help
            </a>
          </div>

          <div>
            <h5>Community</h5>
            <a
              href="http://www.teachmsc.org/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Michigan Sustainability Cases
            </a>
            <a
              href="http://seas.umich.edu"
              target="_blank"
              rel="noreferrer noopener"
            >
              School of Environment and Sustainability
            </a>
          </div>

          <div>
            <h5>More</h5>
            <a
              href="https://twitter.com/learnmsc"
              target="_blank"
              rel="noreferrer noopener"
            >
              Twitter
            </a>
            <a href="https://github.com/">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub"
            >
              Star
            </a>
          </div>
        </section>

        <a
          href="http://www.teachmsc.org/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource"
        >
          <img
            src={this.props.config.baseUrl + 'img/msc-logo.svg'}
            alt="Michigan Sustainability Cases"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    )
  }
}

module.exports = Footer
