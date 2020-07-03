import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectForOverview } from '../../store/overviewTeacher/actions';
import { selectSubjectOverview } from '../../store/overviewTeacher/selectors';
import {
  selectTeacherStudents,
  selectTeacherToken,
} from '../../store/teacher/selectors';
import DoughnutChart from '../../components/charts/DoughnutChart';
import BarChartTest from '../../components/charts/BarChartTest';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

export default function TeacherSubjectDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const { subjectid } = useParams();
  const results = useSelector(selectSubjectOverview);
  const students = useSelector(selectTeacherStudents);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getSubjectForOverview(subjectid));
  }, [dispatch, subjectid]);

  const renderCharts = () => {
    return results.map(({ score, studentId }, i) => (
      <Col key={i}>
        <DoughnutChart
          data={[score, 100 - score]}
          color={['#8F1CB8', '#eee']}
          title={`${
            students.find((student) => student.id === studentId).name
          } ${score}%`}
        />
      </Col>
    ));
  };

  const renderTestsBar = () => {
    return results.map(({ tests, studentId }, i) => (
      <Col key={i}>
        <BarChartTest
          data={[tests]}
          color={['#8F1CB8']}
          labels={[`${tests} tests`]}
          title={``}
          max={20}
        />
      </Col>
    ));
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row>AVERAGE GRADES</Row>
          <Row>{results && students ? renderCharts() : null}</Row>
          <Row>TESTS DONE</Row>
          <Row>{results && students ? renderTestsBar() : null}</Row>
        </Content>
      </Layout>
    </Layout>
  );
}
