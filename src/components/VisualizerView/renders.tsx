import { Typography } from 'antd';

import { getColor } from './utils';
import styles from './VisualizerView.module.css';

const { Text } = Typography;

export function render2DArray(arr: unknown[][], prev?: unknown[][]) {
  return (
    <table className={styles.table}>
      <tbody>
        {arr.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => (
              <td key={j} style={{ backgroundColor: prev ? getColor(arr[i][j], prev[i][j]) : '#fff' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: '10px' }}>
                    {i.toString()}-{j.toString()}
                  </Text>
                </div>
                <div>
                  <Text code style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>
                    {col?.toString()}
                  </Text>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export function renderArray(arr: unknown[], prev?: unknown[]) {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          {arr.map((val, i) => (
            <td key={i} style={{ backgroundColor: prev ? getColor(arr[i], prev[i]) : '#fff' }}>
              <div>
                <Text type="secondary" style={{ fontSize: '10px' }}>
                  {i.toString()}
                </Text>
              </div>
              <div>
                <Text code style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>
                  {val?.toString()}
                </Text>
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
