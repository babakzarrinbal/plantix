import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SensorDataList from './list';
import * as Api from '@api'; 

// Mock the API call
jest.mock('@api', () => ({
  sensorData: {
    list: jest.fn(),
  },
}));

const queryClient = new QueryClient();


const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe('SensorDataList', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('renders and fetches sensor data successfully', async () => {
    (Api.sensorData.list as jest.Mock).mockResolvedValue({
      data: [{ id: 1, sensorId: 'Sensor-1', type: 'Temperature', value: 25, timestamp: new Date().toISOString() }],
      total: 1,
    });

    render(<SensorDataList />, { wrapper });
    expect(await screen.findByText('Sensor-1')).toBeInTheDocument();
    expect(screen.getByText(/create sensor/i)).toBeInTheDocument();
  });

  it('navigates to the create sensor page on button click', async () => {
    render(<SensorDataList />, { wrapper });

    userEvent.click(screen.getByText(/create sensor/i));
  });

  it('navigates to detail page upon row click', async () => {
    (Api.sensorData.list as jest.Mock).mockResolvedValue({
      data: [{ id: 1, sensorId: 'Sensor-1', type: 'Temperature', value: 25, timestamp: new Date().toISOString() }],
      total: 1,
    });

    render(<SensorDataList />, { wrapper });

    const row = await screen.findByText('Sensor-1');
    userEvent.click(row);
  });
});
