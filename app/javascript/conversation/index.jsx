/**
 * @providesModule Conversation
 * @flow
 */

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import DocumentTitle from 'react-document-title'
import { Switch, Route, Redirect } from 'react-router-dom'

import RecentCommentThreads from 'conversation/RecentCommentThreads'
import SelectedCommentThread from 'conversation/SelectedCommentThread'
import { NoSelectedCommentThread } from 'conversation/shared'

import type { State, Reader } from 'redux/state'

type StateProps = { commentable: boolean, kicker: string, reader: ?Reader }
function mapStateToProps ({ caseData }: State): StateProps {
  const { commentable, kicker, reader } = caseData
  return { commentable, kicker, reader }
}

const Conversation = ({ commentable, kicker, intl, reader }) =>
  !commentable || !reader || !reader.enrollment ? (
    <Redirect to="/" />
  ) : (
    <DocumentTitle
      title={`${intl.formatMessage({
        id: 'conversation',
        defaultMessage: 'Conversation',
      })} — ${kicker} — Gala`}
    >
      <Container>
        <Route component={RecentCommentThreads} />
        <Switch>
          <Route
            path="/conversation/:threadId"
            render={({ history, location, match }) => (
              <SelectedCommentThread
                heightOffset={108}
                history={history}
                location={location}
                match={match}
              />
            )}
          />
          <Route component={NoSelectedCommentThread} />
        </Switch>
      </Container>
    </DocumentTitle>
  )
export default injectIntl(connect(mapStateToProps)(Conversation))

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1em;
`