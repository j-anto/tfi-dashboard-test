import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Briefcase, DollarSign, TrendingUp, Users, Truck, Package } from 'lucide-react';

const financialData = [
  { quarter: 'Q2 2022', revenue: 2422.3, operatingIncome: 391.0, netIncome: 276.8, adjustedEPS: 2.61, freeCashFlow: 309.6 },
  { quarter: 'Q3 2022', revenue: 2242.0, operatingIncome: 318.4, netIncome: 245.2, adjustedEPS: 2.01, freeCashFlow: 191.7 },
  { quarter: 'Q4 2022', revenue: 1956.7, operatingIncome: 216.9, netIncome: 153.5, adjustedEPS: 1.72, freeCashFlow: 120.3 },
  { quarter: 'Q1 2023', revenue: 1850.2, operatingIncome: 166.4, netIncome: 111.9, adjustedEPS: 1.33, freeCashFlow: 195.7 },
  { quarter: 'Q2 2023', revenue: 1791.3, operatingIncome: 192.4, netIncome: 128.2, adjustedEPS: 1.59, freeCashFlow: 138.1 },
  { quarter: 'Q3 2023', revenue: 1911.0, operatingIncome: 200.6, netIncome: 133.3, adjustedEPS: 1.57, freeCashFlow: 191.8 },
  { quarter: 'Q4 2023', revenue: 1968.7, operatingIncome: 198.3, netIncome: 131.4, adjustedEPS: 1.71, freeCashFlow: 191.5 },
  { quarter: 'Q1 2024', revenue: 1870.8, operatingIncome: 151.6, netIncome: 92.8, adjustedEPS: 1.24, freeCashFlow: 137.2 },
  { quarter: 'Q2 2024', revenue: 2264.5, operatingIncome: 208.1, netIncome: 117.8, adjustedEPS: 1.71, freeCashFlow: 151.4 },
];

const segmentData = [
  { quarter: 'Q1 2024', packageAndCourier: 18.2, lessThanTruckload: 66.9, truckload: 41.5, logistics: 40.2 },
  { quarter: 'Q2 2024', packageAndCourier: 24.0, lessThanTruckload: 109.9, truckload: 83.3, logistics: 50.6 },
];

const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold">${value}M</p>
  </div>
);

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedSegmentMetric, setSelectedSegmentMetric] = useState('packageAndCourier');

  const getChartData = () => {
    return financialData.map(item => ({
      quarter: item.quarter,
      [selectedMetric]: item[selectedMetric]
    }));
  };

  const getSegmentChartData = () => {
    return segmentData.map(item => ({
      quarter: item.quarter,
      [selectedSegmentMetric]: item[selectedSegmentMetric]
    }));
  };

  const latestQuarterData = financialData[financialData.length - 1];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TFI International Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard title="Revenue" value={latestQuarterData.revenue.toFixed(1)} icon={<DollarSign className="w-6 h-6 text-green-500" />} />
        <MetricCard title="Operating Income" value={latestQuarterData.operatingIncome.toFixed(1)} icon={<Briefcase className="w-6 h-6 text-blue-500" />} />
        <MetricCard title="Net Income" value={latestQuarterData.netIncome.toFixed(1)} icon={<TrendingUp className="w-6 h-6 text-purple-500" />} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Financial Performance Trend</h2>
        <div className="mb-4">
          <select 
            value={selectedMetric} 
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="revenue">Revenue</option>
            <option value="operatingIncome">Operating Income</option>
            <option value="netIncome">Net Income</option>
            <option value="adjustedEPS">Adjusted EPS</option>
            <option value="freeCashFlow">Free Cash Flow</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Segment Performance</h2>
        <div className="mb-4">
          <select 
            value={selectedSegmentMetric} 
            onChange={(e) => setSelectedSegmentMetric(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="packageAndCourier">Package and Courier</option>
            <option value="lessThanTruckload">Less-Than-Truckload</option>
            <option value="truckload">Truckload</option>
            <option value="logistics">Logistics</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getSegmentChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={selectedSegmentMetric} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Key Highlights</h2>
        <ul className="list-disc pl-5">
          <li>Q2 2024 revenue increased to $2,264.5M, up from $1,791.3M in Q2 2023.</li>
          <li>Operating income grew to $208.1M from $192.4M in the same quarter last year.</li>
          <li>Net income slightly decreased to $117.8M compared to $128.2M in Q2 2023.</li>
          <li>Adjusted earnings per share (diluted) were $1.71, compared to $1.59 in Q2 2023.</li>
          <li>Free cash flow improved to $151.4M from $138.1M in Q2 2023.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
