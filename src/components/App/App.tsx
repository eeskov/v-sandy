import { Alert, Button, Col, Layout, Row, Space } from 'antd';
import { useEffect, useState } from 'react';

import { CodeError, InputError, runCode } from '../../services/codeInterpreter';
import { CodeEditor } from '../CodeEditor';
import styles from './App.module.css';
import { StateContainer, clearStateContainer, getStateContainer } from '../../services/visualizerAPI';
import { VisualizerView } from '../VisualizerView';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { useSandyStore } from '../../store';
import { SnippetsListDrawer } from '../SnippetsListDrawer';
import { HowTo } from '../HowTo';

export function App() {
  const [error, setError] = useState<{ type: 'code' | 'input'; message: string } | null>(null);
  const [visualizerStates, setVisualizerStates] = useState<StateContainer | null>(null);
  const { toggleSnippetsList, snippetsListOpened, currentSnippetId } = useSandyStore((state) => ({
    toggleSnippetsList: state.toggleSnippetsList,
    snippetsListOpened: state.snippetsListOpened,
    currentSnippetId: state.currentSnippetId
  }));

  const cleanup = () => {
    setError(null);
    setVisualizerStates(null);
    clearStateContainer();
  };
  useEffect(() => {
    cleanup();
  }, [currentSnippetId]);

  const onCodeRun = (code: string, input: string) => {
    try {
      cleanup();
      const output = runCode(code, input);
      console.log('result', output);
      setVisualizerStates(getStateContainer());
    } catch (e) {
      if (e instanceof InputError) {
        setError({ type: 'input', message: e.message });
      }
      if (e instanceof CodeError) {
        setError({ type: 'code', message: e.message });
      }
    }
  };

  return (
    <>
      {error && (
        <Space direction="vertical" style={{ width: '100%', position: 'absolute', top: 0, zIndex: 99999 }}>
          <Alert
            banner
            message={`Error in ${error.type}`}
            description={error.message}
            type="error"
            closeIcon
            onClose={() => setError(null)}
          />
        </Space>
      )}
      <Layout>
        {!snippetsListOpened && (
          <Button className={styles.drawerButton} onClick={() => toggleSnippetsList()}>
            <DoubleLeftOutlined />
          </Button>
        )}
        {snippetsListOpened && <SnippetsListDrawer />}
        <Layout.Content>
          <Row>
            <Col span={12} flex={'auto'} style={{ justifyContent: 'center' }}>
              <div className={styles.vizualizerPanel}>
                {visualizerStates && <VisualizerView visualizerStates={visualizerStates} />}
                {!visualizerStates && <HowTo />}
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.codeEditorPanel}>
                <CodeEditor runCode={onCodeRun} />
              </div>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
}
