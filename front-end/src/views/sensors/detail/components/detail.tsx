import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Descriptions, Spin, notification, Button } from 'antd';
import { sensorData } from '@api'; 
import { Sensor } from "@/types/sensors";

const fetchSensorDetail = async (id: string): Promise<Sensor> => await sensorData.get(id);

const SensorDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const idValue = id || '';
  const { data, isLoading, error } = useQuery(['sensorDetail', idValue], () => fetchSensorDetail(idValue), {
    onError: (error) => {
      notification.error({
        message: 'Error Fetching Details',
        description: 'Could not fetch sensor details. Please try again later.',
      });
    },
  });

  return (
    <Spin spinning={isLoading} tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {error ? (
        <div>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>
      ) : (
        <>
          <Button type="primary" onClick={() => navigate('/')} style={{ marginBottom: 16 }}>
            Back to List
          </Button>
          <Descriptions title="Sensor Details" bordered column={1} style={{ padding: '24px', maxWidth: 800, margin: 'auto' }}>
            <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
            <Descriptions.Item label="Sensor ID">{data?.sensorId}</Descriptions.Item>
            <Descriptions.Item label="Type">{data?.type}</Descriptions.Item>
            <Descriptions.Item label="Value">{data?.value}</Descriptions.Item>
            <Descriptions.Item label="Timestamp">{data?.timestamp ? new Date(data.timestamp).toLocaleString() : ''}</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Spin>
  );
};

export default SensorDetailPage;
