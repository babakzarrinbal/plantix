import React from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { sensorData } from '@api'; // Adjust the import path as needed

const { Option } = Select;

const SensorDataCreate: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(sensorData.create);

  const onFinish = async (values: any) => {
    try {
      await mutateAsync(values);
      notification.success({
        message: 'Sensor Created',
        description: 'The sensor data has been successfully created.',
      });
      navigate('/'); // Redirect back to the list page
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'There was an error creating the sensor data.',
      });
    }
  };

  return (
    <Form
      name="create_sensor"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        label="Sensor ID"
        name="sensorId"
        rules={[{ required: true, message: 'Please input the sensor ID!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please select the sensor type!' }]}
      >
        <Select placeholder="Select a type">
          <Option value="humidity">Humidity</Option>
          <Option value="temperature">Temperature</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Value"
        name="value"
        rules={[{ required: true, message: 'Please input the sensor value!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
          Submit
        </Button>
        <Button onClick={() => navigate('/')}>
          Back to List
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SensorDataCreate;
