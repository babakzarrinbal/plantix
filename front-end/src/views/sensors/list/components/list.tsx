import React, { useState } from "react";
import { useQuery } from "react-query";
import { Table, Button, Spin, notification } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { sensorData } from "@api";
import { Sensor, FetchSensorDataResult, Pagination } from "@/types/sensors"; 

// Function to fetch sensor data, taking pagination parameters
const fetchSensorData = async (
  page: number,
  limit: number
): Promise<FetchSensorDataResult> => {
  // Call the API and return the result
  return await sensorData.list({ query: { page, limit } });
};

const SensorDataList: React.FC = () => {
  // Hook to programmatically navigate using React Router
  const navigate = useNavigate();

  // Local state for managing table pagination
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // React Query hook to fetch sensor data, re-fetch 
  const { data, error, isLoading } = useQuery<FetchSensorDataResult, Error>(
    ["sensorData", pagination.current, pagination.pageSize],
    () => fetchSensorData(pagination.current, pagination.pageSize),
    {
      keepPreviousData: true, // Keep displaying current data during refetch
      refetchInterval: 5000, // Refetch data every 5 seconds
      onSuccess: (data) => {
        // Update pagination total when data fetch is successful
        setPagination((p) => ({ ...p, total: data.total }));
      },
      onError: (error) => {
        // Show error notification if data fetch fails
        notification.error({
          message: "Error Fetching Sensor Data",
          description: error.message || "Could not fetch sensor list. Please try again later.",
        });
      },
    }
  );

  // Columns configuration for Ant Design table
  const columns: ColumnsType<Sensor> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Sensor ID", dataIndex: "sensorId", key: "sensorId" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Value", dataIndex: "value", key: "value", render: (value) => `${value}` },
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp", render: (timestamp) => `${new Date(timestamp).toLocaleString()}` },
  ];

  // Handler for table pagination change
  const handleTableChange = (pagination: TablePaginationConfig) => {
    // Update local state with new pagination settings
    setPagination({
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    });
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => navigate("/create")} // Navigate to the create sensor page
      >
        Create Sensor
      </Button>
      <Spin spinning={isLoading} delay={500}> {/* Show spinner while loading */}
        <Table
          dataSource={data?.data} 
          columns={columns}
          rowKey="id" // Unique key for each row
          pagination={{ // Pagination configuration
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onChange={handleTableChange} 
          onRow={(record) => ({
            onClick: () => navigate(`/detail/${record.id}`), // Navigate to detail page on row click
            style: { cursor: "pointer" }, // Change cursor to pointer on hover
          })}
        />
      </Spin>
      {error instanceof Error && <div>An error occurred: {error.message}</div>} {/* Display errors if any */}
    </>
  );
};

export default SensorDataList; 
