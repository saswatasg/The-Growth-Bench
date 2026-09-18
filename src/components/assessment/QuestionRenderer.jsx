import React from 'react';
import ScenarioQuestion from './ScenarioQuestion';
import OrderingQuestion from './OrderingQuestion';
import SimulationQuestion from './SimulationQuestion';
import FillBlankQuestion from './FillBlankQuestion';
import DecisionTreeQuestion from './DecisionTreeQuestion';

const QuestionRenderer = ({ question, answer, onChange }) => {
  if (!question) return null;

  switch (question.type) {
    case 'scenario':
      return <ScenarioQuestion question={question} answer={answer} onChange={onChange} />;
    case 'ordering':
      return <OrderingQuestion question={question} answer={answer} onChange={onChange} />;
    case 'simulation':
      return <SimulationQuestion question={question} answer={answer} onChange={onChange} />;
    case 'fill_blank':
      return <FillBlankQuestion question={question} answer={answer} onChange={onChange} />;
    case 'decision_tree':
      return <DecisionTreeQuestion question={question} answer={answer} onChange={onChange} />;
    default:
      return <p className="text-body-md text-sale">Unknown question type: {question.type}</p>;
  }
};

export default QuestionRenderer;
