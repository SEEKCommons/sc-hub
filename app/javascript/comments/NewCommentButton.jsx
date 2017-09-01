/**
 * @providesModule NewCommentButton
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'

import { FormattedMessage } from 'react-intl'
import { Tooltip, Position, Intent } from '@blueprintjs/core'
import { EditorState } from 'draft-js'

import CommunityChooser from 'overview/CommunityChooser'

import { acceptSelection } from 'redux/actions'
import { getSelectionText, getParagraphs } from 'shared/draftHelpers'

import type { State } from 'redux/state'

type OwnProps = { cardId: string }

function mapStateToProps (state: State, { cardId }: OwnProps) {
  const editorState =
    state.cardsById[cardId].editorState || EditorState.createEmpty()

  return {
    acceptingSelection: state.ui.acceptingSelection,
    selectionPending: !editorState.getSelection().isCollapsed(),
    selectionNotUnique: selectionNotUnique(editorState),
  }
}

type Props = {
  acceptingSelection: boolean,
  selectionPending: boolean,
  selectionNotUnique: boolean,
  addCommentThread: () => Promise<void>,
  acceptSelection: typeof acceptSelection,
}

const NewCommentButton = ({
  acceptingSelection,
  selectionPending,
  selectionNotUnique,
  addCommentThread,
  acceptSelection,
}: Props) => (
  <Tooltip
    position={Position.BOTTOM}
    intent={selectionNotUnique ? Intent.DANGER : undefined}
    portalClassName="NewCommentButton__CommunityChooser"
    isOpen={acceptingSelection && selectionPending}
    content={
      selectionNotUnique ? (
        <UniquenessWarning />
      ) : (
        <CommunityChooser white disabled />
      )
    }
  >
    <button
      className="o-button CommentThreads__new-button"
      disabled={(acceptingSelection && !selectionPending) || selectionNotUnique}
      onClick={acceptingSelection ? addCommentThread : acceptSelection}
    >
      {!acceptingSelection ? (
        <FormattedMessage
          id="comments.writeNew"
          defaultMessage="Write a new response"
        />
      ) : !selectionPending ? (
        <FormattedMessage
          id="comments.select"
          defaultMessage="Select a few words"
        />
      ) : (
        <FormattedMessage id="comments.here" defaultMessage="Respond here" />
      )}
    </button>
  </Tooltip>
)

export default connect(mapStateToProps, { acceptSelection })(NewCommentButton)

const UniquenessWarning = () => (
  <div style={{ padding: '6px 12px' }}>
    <FormattedMessage id="comments.selectionNotUnique" />
  </div>
)

function selectionNotUnique (editorState: EditorState): boolean {
  const selection = getSelectionText(editorState)
  if (selection === '') return false

  const card = getParagraphs(editorState).join('\n----->8-----\n')
  return card.split(selection).length > 2
}
