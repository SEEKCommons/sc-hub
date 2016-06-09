import React from 'react'
import Sidebar from './Sidebar.js'
import Edgenote from './Edgenote.js'
import LoadingIcon from './LoadingIcon.js'
import gatherEdgenotes from '../gatherEdgenotes.js'
import { I18n } from "./I18n.js"

class EdgenoteGallery extends React.Component {
  constructor() {
    super()
    this.state = {
      edgenote_ids: []
    }
  }

  setEdgenotes(contents) {
    let edgenote_ids = gatherEdgenotes(contents)
    this.setState({edgenote_ids: edgenote_ids})
  }

  componentDidMount() {
    let contents = window.caseData.segments.length > 0 ? window.caseData.segments.map((x) => {return x[1]}) : ""
    this.setEdgenotes(contents)
  }

  renderEdgenotes() {
    let block
    if (this.state.edgenote_ids.length != 0) {
      block = <div className="edgenotes">
                {
                  this.state.edgenote_ids.map( (id) => {
                    return (
                      <Edgenote
                        random={true}
                        path_prefix={""}
                        selected_id={this.state.selected_id}
                        id={id}
                        key={`edgenote_${id}`}
                        handleHoverID={this.props.id}
                      />
                    )
                  } )
                }
              </div>
    } else {
      block =  <LoadingIcon />
    }
    return block
  }

  render() {
    let {slug, coverURL, title, segmentTitles} = this.props
    let selectedSegment = parseInt(this.props.params.selectedSegment) - 1
    return (
      <div className="window">
        <Sidebar
          slug={slug}
          coverURL={coverURL}
          title={title}
          segmentTitles={segmentTitles}
          selectedSegment={selectedSegment}
        />
        <main id="EdgenoteGallery">
          <div id="EdgenoteGalleryHeader">
            <h1><I18n meaning="edgenote_gallery" /></h1>
          </div>
          {this.renderEdgenotes()}
        </main>
        {this.props.children}
      </div>
    )
  }
}

export default EdgenoteGallery
