import styled from '@emotion/styled';
import { ScreenContainer } from 'components/lib';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { KanbanColumn } from './kaban-column';
import { SearchPanel } from './search-panel';
import { useKanbanSearchParams, useProjectInUrl } from './util';

export const KanbanScreen = () => {
  useDocumentTitle('看板列表');

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  /* overflow-x: scroll; */
  flex: 1;
`;
