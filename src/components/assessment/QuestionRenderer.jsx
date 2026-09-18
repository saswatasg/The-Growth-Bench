import React from 'react';
import SingleQuestion from './SingleQuestion';
import MultiQuestion from './MultiQuestion';
import OrderingQuestion from './OrderingQuestion';

const QuestionRenderer = ({ question, answer, onChange }) => {
  if (!question) return null;

  switch (question.type) {
    case 'single':
      return <SingleQuestion question={question} answer={answer} onChange={onChange} />;
    case 'multi':
      return <MultiQuestion question={question} answer={answer} onChange={onChange} />;
    case 'ordering':
      return <OrderingQuestion question={question} answer={answer} onChange={onChange} />;
    default:
      return <p className="text-body-md text-sale">Unknown question type: {question.type}</p>;
  }
};

export default QuestionRenderer;
