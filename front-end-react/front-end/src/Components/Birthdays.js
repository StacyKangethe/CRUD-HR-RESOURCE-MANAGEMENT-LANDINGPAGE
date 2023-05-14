import React from 'react';
import { Card, Col, Row } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Birthdays = ({ data }) => {
  const countBirthdaysByMonth = () => {
    const birthdaysPerMonth = Array(12).fill(0);

    data.forEach((employee) => {
      const month = new Date(employee.dob).getMonth();
      birthdaysPerMonth[month]++;
    });

    return birthdaysPerMonth.map((count, index) => ({
      month: new Date(0, index).toLocaleString('en', { month: 'short' }),
      count,
    }));
  };

  const chartData = countBirthdaysByMonth();

  return (
    <div>
      <Row>
        <Col span={24}>
          <Card title="Birthdays by Month">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1d4296" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Birthdays;
