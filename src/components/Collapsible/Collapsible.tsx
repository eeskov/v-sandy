import { Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;

interface CollapsibleProps {
  title: string;
  children: JSX.Element;
}
export const Collapsible = ({ title, children }: CollapsibleProps): JSX.Element => {
  const [opened, setOpened] = useState<boolean>(true);
  return (
    <>
      <div onClick={(): void => setOpened(!opened)}>
        <Title level={4}>
          {title} {opened ? <DownOutlined /> : <UpOutlined />}
        </Title>
      </div>
      {opened && children}
    </>
  );
};
