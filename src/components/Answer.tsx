import { AnswerType } from '../pages/Question';

const Answer = ({ answer }: { answer: AnswerType }) => {
  return (
    <div>
      <p>{answer.content}</p>
      <p>{answer.author}</p>
    </div>
  );
};

export default Answer;
