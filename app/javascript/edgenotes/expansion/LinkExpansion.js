/**
 * Value object for the expansion of a link into an embed or a preview.
 *
 * @providesModule LinkExpansion
 * @flow
 */

import { Orchard } from 'shared/orchard'

type Embed = { __html?: string }
type Preview = {
  title?: string,
  type?: string,
  url?: string,
  description?: string,
  images?: string[],
}

export interface ILinkExpansion {
  actsAsLink(): boolean;
  linkDomain(): string;
}

class LinkExpansion implements ILinkExpansion {
  static async fetch (params: { slug: string, updatedAt: Date, url: string }) {
    const { slug, updatedAt, url } = params
    if (!url) return new NullLinkExpansion(url)

    return new LinkExpansion(
      await Orchard.harvest(`edgenotes/${slug}/link_expansion`, {
        href: url,
        updatedAt,
      })
    )
  }

  embed: ?Embed
  preview: Preview

  constructor ({ embed, preview }: { embed: Embed, preview: Preview }) {
    this.embed = embed
    this.preview = preview
  }

  actsAsLink (): boolean {
    return !(this.embed && this.embed.__html)
  }

  linkDomain () {
    return domain(this.preview.url)
  }
}

export default LinkExpansion

export class NullLinkExpansion implements ILinkExpansion {
  url: ?string

  constructor (url: ?string) {
    this.url = url
  }

  actsAsLink () {
    return !!this.url
  }

  linkDomain () {
    return domain(this.url)
  }
}

function domain (url: ?string): string {
  if (url == null) return ''
  return new URL(url).host.replace(/^www\./, '')
}
