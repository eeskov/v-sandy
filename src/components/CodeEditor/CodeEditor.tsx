import { Button, Input, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubLight } from '@uiw/codemirror-theme-github';

import styles from './CodeEditor.module.css';
import { useSandyStore } from '../../store';

const { TextArea } = Input;
const { Title } = Typography;

interface CodeEditorProps {
  runCode: (code: string, input: string) => void;
}

export function CodeEditor({ runCode }: CodeEditorProps) {
  const codeSnippet = useSandyStore((state) => {
    if (state.currentSnippetId) {
      return state.snippets.find((snippet) => snippet.id === state.currentSnippetId);
    }
    return null;
  });

  useEffect(() => {
    setTitle(codeSnippet?.title || 'New');
    setCode(codeSnippet?.code || '');
    setInput(codeSnippet?.input || '');
  }, [codeSnippet]);

  const saveSnippet = useSandyStore((state) => state.saveSnippet);

  const [title, setTitle] = useState<string>(codeSnippet?.title || 'New');
  const [code, setCode] = useState<string>(codeSnippet?.code || '');
  const [input, setInput] = useState<string>(codeSnippet?.input || '');
  // const [expectedOutput, setExpectedOutput] = useState<string>(codeSnippet?.expectedOutput || '');

  return (
    <>
      <Input className={styles.title} value={title} onChange={(e) => setTitle(e.target.value)} />
      <CodeMirror
        value={code}
        className={styles.editor}
        placeholder="Code goes here..."
        height="1000px"
        maxHeight="1000px"
        theme={githubLight}
        extensions={[javascript()]}
        onChange={(value): void => {
          setCode(value);
        }}
      />
      <Title style={{ marginTop: 20 }} level={5}>
        Input
      </Title>
      <TextArea rows={3} value={input} onChange={(e): void => setInput(e.target.value)} />
      <Space wrap className={styles.buttons}>
        <Button type="primary" onClick={() => runCode(code, input)}>
          Run
        </Button>
        <Button
          onClick={() =>
            saveSnippet({
              id: codeSnippet?.id,
              title,
              code,
              input
            })
          }
        >
          Save
        </Button>
      </Space>
    </>
  );
}
