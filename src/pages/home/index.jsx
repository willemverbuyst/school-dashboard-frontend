import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { selectTeacherId } from '../../store/teacher/selectors';
import BarChartHome from './BarChartHome';
import LineChartHome from './LineChartHome';
import PolarChartHome from './PolarChartHome';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

export default function Home() {
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const teacherId = useSelector(selectTeacherId);

  useEffect(() => {
    if (studentId) {
      history.push(`/students/${studentId}`);
    }
    if (teacherId) {
      history.push(`/teachers/${teacherId}`);
    }
  });

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          <Row justify="space-around">
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <BarChartHome
                  labels={['Welcome', 'to', 'your', 'dashboard']}
                  color={['#FF2694', '#FF2694', '#FF2694', '#FF2694']}
                  data={[80, 56, 67, 45]}
                />
              </div>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <PolarChartHome
                  labels={['Please', 'log', 'in']}
                  color={['#B81D9D', '#D222E1', '#8F1CB8']}
                  data={[80, 56, 67]}
                />
              </div>
            </Col>
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <LineChartHome
                  labels={['to', 'see', 'your', 'progress']}
                  color={['#A026FF']}
                  data={[45, 67, 56, 80]}
                />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
