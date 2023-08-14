import { Space, Typography } from 'antd';

const { Title, Text } = Typography;
export function HowTo() {
  return (
    <Space direction="vertical">
      <Title level={3}>How to use:</Title>
      <Text>
        use <Text code>v(name:string, data)</Text>
        <br />
        <Text>
          <Text code>data</Text> can be an object
        </Text>
      </Text>
    </Space>
  );
}
