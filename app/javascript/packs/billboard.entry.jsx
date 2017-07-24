/**
 * @noflow
 */

import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { UnconnectedBillboardTitle } from 'overview/BillboardTitle'
import { UnconnectedGroupChooser } from 'overview/GroupChooser'

const container = document.getElementById('billboard-app')

const caseData = JSON.parse(container.getAttribute('data-case-data'))
const groupData = JSON.parse(container.getAttribute('data-group-data'))
const deploymentId = JSON.parse(container.getAttribute('data-deployment-id'))

const Column = styled.div`
  max-width: 40em;
  padding: 0 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button.attrs({
  className: 'pt-button pt-large pt-intent-success',
  type: 'submit',
})`
  margin: 2em;
`

if (container != null) {
  ReactDOM.render(
    <Column>
      <UnconnectedBillboardTitle updateCase={() => {}} {...caseData} />
      <UnconnectedGroupChooser rounded activeGroup={groupData} />

      <form action="/enrollments" method="POST">
        <input type="hidden" name="deployment_id" value={deploymentId} />
        <Button>Let’s get started!</Button>
      </form>
    </Column>,
    container
  )
}
