import React from 'react';
import { Radio, Form, Row, Col } from 'antd';

export default function MultipleChoiceQuestion({
  text,
  answers,
  onPick,
  questionNumber,
}) {
  return (
    <>
      <Row>
        <Col>{text}</Col>
      </Row>
      <Row>
        <Col>
          <Form.Item>
            <Radio.Group onChange={(e) => onPick(e.target)}>
              {answers.map(({ text, id, questionId }, i) => (
                <Radio
                  key={i}
                  style={{
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                  }}
                  value={id}
                  questionId={questionId}
                  questionNumber={questionNumber}
                >
                  {text}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
