import { Section, Container, Title } from './App.styled';
import { useState } from 'react';
import { Notification } from './Notification/Notification';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { FeedbackBlock } from './Feedback.styled';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = typeFeedback => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [typeFeedback]: prevFeedback[typeFeedback] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const positivePercentage = () => {
    const { good } = feedback;

    const totalFeedback = countTotalFeedback();
    const positivePercentage =
      totalFeedback === 0 ? 0 : Math.round((good / totalFeedback) * 100);
    return positivePercentage;
  };


  const { good, neutral, bad } = feedback;
  return (
    <Section>
      <Container>
        <Title>Hello</Title>
        <FeedbackBlock>
          <h2>Please leave feedback</h2>
          <FeedbackOptions
            options={{ good, neutral, bad }}
            onLeaveFeedback={onLeaveFeedback}
          />
          <h2>Statistics</h2>
          {countTotalFeedback() > 0 ? ( // Проверка на наличие хотя бы одного отзыва
            <Statistics
              feedback={{ good, neutral, bad }}
              totalFeedback={countTotalFeedback}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </FeedbackBlock>
      </Container>
    </Section>
  );
};
