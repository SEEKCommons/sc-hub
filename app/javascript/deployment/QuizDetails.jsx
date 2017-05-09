/**
 * @providesModule QuizDetails
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { List } from 'immutable'

import QuizCustomizer from './QuizCustomizer'
import { QuestionType } from './QuizCard'

import { Question } from './types'
import type { Quiz } from './types'

type Props = {
  quiz: Quiz,
  customQuestions: List<Question>,
  onChangeCustomQuestions: List<Question> => void,
}
const QuizDetails = ({
  quiz,
  customQuestions = List(),
  onChangeCustomQuestions,
}: Props) => (
  <div
    className="pt-card"
    style={{
      backgroundColor: '#446583',
      overflow: 'scroll',
      height: 'calc(100vh - 164px)',
    }}
  >
    <CardTitle>Quiz details</CardTitle>
    <ol>
      <SectionTitle>Base questions</SectionTitle>
      {quiz.questions.map((question: Question, i: number) => (
        <li key={i}>
          {question.content}
          {question.options.length === 0
            ? <QuestionType className="pt-icon-standard pt-icon-comment" />
            : <OptionsList>
              {question.options.map((option: string, i: number) => (
                <li key={i}>{option}</li>
                ))}
            </OptionsList>}
        </li>
      ))}
      <SectionTitle>Custom questions</SectionTitle>
      <QuizCustomizer
        customQuestions={customQuestions}
        onChange={onChangeCustomQuestions}
      />
    </ol>
  </div>
)

export default QuizDetails

const CardTitle = styled.h1`
  font-family: 'tenso';
  font-size: 17px;
`

const SectionTitle = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 1;
  display: block;
  margin: 1em 0 0.25em -17px;
`

const OptionsList = styled.ul`
  margin: 0;
  font-size: 14px;

  & > li {
    display: inline;
    list-style: none;

    &:not(:first-child)::before {
      content: '—';
      margin: 0 0.5em;
    }
  }
`
