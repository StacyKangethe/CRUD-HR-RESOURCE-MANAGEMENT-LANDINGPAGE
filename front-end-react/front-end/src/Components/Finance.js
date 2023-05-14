import React from 'react';
import { Col, Row, Progress } from 'antd';

const Finance = ({ data }) => {
  const below50000 = data?.filter((employee) => employee.salary < 50000).length || 0;
  const between50000and100000 = data?.filter(
    (employee) => employee.salary >= 50000 && employee.salary <= 100000
  ).length || 0;
  const above100000 = data?.filter((employee) => employee.salary > 100000).length || 0;

  const totalEmployees = data?.length || 0;
  const percentageBelow50000 = totalEmployees ? (below50000 / totalEmployees) * 100 : 0;
  const percentageBetween50000and100000 = totalEmployees
    ? (between50000and100000 / totalEmployees) * 100
    : 0;
  const percentageAbove100000 = totalEmployees ? (above100000 / totalEmployees) * 100 : 0;

  const totalSalary = data?.reduce((accumulator, employee) => accumulator + parseFloat(employee.salary), 0) || 0;

  //calculating number of employees on leave
  const totalOnLeave = data?.filter((employee) => employee.leave).length || 0;
  const percentageOnLeave = totalEmployees ? (totalOnLeave / totalEmployees) * 100 : 0;

  return (
    <div>
        <h2>Employee Earnings</h2>
        <Row>
            <Col style={{ padding: 50 }}  span={6}>
                <Progress
                type="circle"
                percent={Math.round(percentageBelow50000)}
                format={(percent) => `${percent} %`}
                />
                <h3>Earn below 50,000</h3>
            </Col>

            <Col style={{ padding: 50 }}  span={6}>
                <Progress
                type="circle"
                percent={Math.round(percentageBetween50000and100000)}
                format={(percent) => `${percent} %`}
                />
                <h3>Earn between 50,000 and 100,000</h3>
            </Col>

            <Col style={{ padding: 50 }}  span={6}>
                <Progress
                type="circle"
                percent={Math.round(percentageAbove100000)}
                format={(percent) => `${percent} %`}
                />
                <h3>Earn more than 100,000</h3>
            </Col>
   
            <Col style={{ padding: 50 }}  span={6}>
            <Progress
                type="circle"
                percent={Math.round(percentageOnLeave)}
                format={(percent) => `${percent} %`}
                />
            <h3>Total Employees On Leave: {totalOnLeave}</h3>
            </Col>
        </Row>

        <Row>
            <h3> <span style={{backgroundColor: "#1d4296", padding: "1em", borderRadius: "0.5em"}}>{totalSalary.toLocaleString()}</span>  Cumulative Remuneration</h3>
        </Row>

    </div>
  );
};

Finance.defaultProps = {
  data: [],
};

export default Finance;
