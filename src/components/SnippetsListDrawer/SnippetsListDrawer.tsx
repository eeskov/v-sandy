import { Button, Drawer, List } from 'antd';

import { useSandyStore } from '../../store';

export function SnippetsListDrawer() {
  const { snippetsListOpened, toggleSnippetsList, snippets, removeSnippet, setCurrentSnippetId } = useSandyStore(
    (state) => ({
      snippetsListOpened: state.snippetsListOpened,
      setCurrentSnippetId: state.setCurrentSnippetId,
      toggleSnippetsList: state.toggleSnippetsList,
      removeSnippet: state.removeSnippet,
      snippets: state.snippets
    })
  );
  return (
    <Drawer size="large" title="List" placement="right" onClose={() => toggleSnippetsList()} open={snippetsListOpened}>
      <Button onClick={() => setCurrentSnippetId(null)}>Create new</Button>
      <List
        itemLayout="horizontal"
        dataSource={snippets.filter((snippet) => snippet.id !== null)}
        renderItem={(item) => (
          <List.Item>
            <Button type="link" onClick={() => setCurrentSnippetId(item.id!)}>
              {item.title}
            </Button>
            <Button type="text" onClick={() => removeSnippet(item.id!)}>
              Remove
            </Button>
          </List.Item>
        )}
      />
    </Drawer>
  );
}
