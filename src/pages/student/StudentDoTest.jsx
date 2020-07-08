import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NavigationPrompt from 'react-router-navigation-prompt';
import { useDispatch, useSelector } from 'react-redux';
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion';
import {
  selectStudentId,
  selectStudentSubjects,
  selectStudentToken,
} from '../../store/student/selectors';
import { getMcQuestionsForTest, submitTest } from '../../store/test/actions';
import { select3mcQuestionsForSubject } from '../../store/test/selectors';
import { Layout, Button, Modal } from 'antd';

const { Content } = Layout;

export default function StudentDoTest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const { subjectid } = useParams();
  const token = useSelector(selectStudentToken);
  const questions = useSelector(select3mcQuestionsForSubject);
  const subjects = useSelector(selectStudentSubjects);
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);
  const [answer3, setAnswer3] = useState(0);
  const [question1, setQuestion1] = useState(0);
  const [question2, setQuestion2] = useState(0);
  const [question3, setQuestion3] = useState(0);
  const [testDone, setTestDone] = useState(false);
  const [blockNavigation, setBlockNavigation] = useState(true);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMcQuestionsForTest(subjectid));
  }, [dispatch, subjectid]);

  const onFinish = () => {
    setTestDone(true);
    dispatch(
      submitTest(
        studentId,
        subjectid,
        question1,
        question2,
        question3,
        answer1,
        answer2,
        answer3
      )
    );
    setAnswer1(0);
    setAnswer2(0);
    setAnswer3(0);
    setBlockNavigation(false);
  };

  const goToMain = () => {
    history.push(`/students/${studentId}/subjects/${subjectid}`);
  };

  const doAnotherTest = () => {
    setBlockNavigation(true);
    setTestDone(false);
    dispatch(getMcQuestionsForTest(subjectid));
  };

  const onPick = (e) => {
    if (e.questionNumber * 1 === 1) {
      setQuestion1(e.questionId);
      e.value === 1 || e.value % 4 === 1 ? setAnswer1(1) : setAnswer1(0);
    } else if (e.questionNumber === 2) {
      setQuestion2(e.questionId);
      e.value === 1 || e.value % 4 === 1 ? setAnswer2(1) : setAnswer2(0);
    } else {
      setQuestion3(e.questionId);
      e.value === 1 || e.value % 4 === 1 ? setAnswer3(1) : setAnswer3(0);
    }
  };

  const renderMCQ = () => {
    return (
      <>
        {questions.map(({ text, answers }, i) => (
          <MultipleChoiceQuestion
            key={i}
            text={text}
            answers={answers}
            onPick={onPick}
            questionNumber={i + 1}
          />
        ))}
        {!testDone ? (
          <Button
            style={{
              width: 160,
              backgroundColor: '#B81D9D',
              border: 'none',
              color: '#fff',
            }}
            onClick={onFinish}
          >
            Finish
          </Button>
        ) : null}
        {testDone ? (
          <>
            <p>{'You want to take another test?'.toUpperCase()}</p>
            <Button
              style={{
                width: 160,
                backgroundColor: '#4BC0E7',
                border: 'none',
                color: '#fff',
                marginRight: 20,
              }}
              onClick={doAnotherTest}
            >
              yes
            </Button>
            <Button
              style={{
                width: 160,
                backgroundColor: '#B81D9D',
                border: 'none',
                color: '#fff',
              }}
              onClick={goToMain}
            >
              no
            </Button>
          </>
        ) : null}
      </>
    );
  };

  return (
    <Layout>
      <NavigationPrompt
        beforeConfirm={(clb) => {
          dispatch(
            submitTest(
              studentId,
              subjectid,
              question1,
              question2,
              question3,
              0,
              0,
              0
            )
          );
          clb();
        }}
        when={blockNavigation}
      >
        {({ onConfirm, onCancel }) => (
          <Modal
            visible
            show={true}
            title="Are you sure you want to leave?"
            onCancel={onCancel}
            onOk={onConfirm}
          >
            <div>
              If you leave this page your test score will be set to zero!
            </div>
          </Modal>
        )}
      </NavigationPrompt>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {questions && subjects ? renderMCQ() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
