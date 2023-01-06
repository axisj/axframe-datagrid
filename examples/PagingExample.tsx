import * as React from 'react';
import styled from '@emotion/styled';
import { AXFDataGrid, AXFDGColumn } from '../@axframe-datagrid';
import ExampleContainer from '../components/ExampleContainer';
import { useContainerSize } from '../hooks/useContainerSize';

interface Props {}

interface IListItem {
  id: string;
  title: string;
  writer: string;
  createAt: string;
}

const list = Array.from(Array(1000)).map((v, i) => ({
  values: {
    id: `ID_${i}`,
    title: `title_${i}`,
    writer: `writer_${i}`,
    createAt: `2022-09-08`,
  },
}));

function PagingExample(props: Props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [columns, setColumns] = React.useState<AXFDGColumn<IListItem>[]>([
    {
      key: 'id',
      label: '아이디 IS LONG !',
      width: 100,
      sortDisable: true,
    },
    {
      key: 'title',
      label: '제목',
      width: 300,
      itemRender: item => {
        return `${item.writer}//${item.title}`;
      },
    },
    {
      key: 'writer',
      label: '작성자',
      width: 100,
      itemRender: item => {
        return `${item.writer}//A`;
      },
    },
    {
      key: 'createAt',
      label: '작성일',
      width: 100,
    },
  ]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { width: containerWidth, height: containerHeight } = useContainerSize(containerRef);

  return (
    <Container ref={containerRef}>
      <AXFDataGrid<IListItem>
        width={containerWidth}
        height={containerHeight}
        headerHeight={35}
        data={list}
        columns={columns}
        page={{
          currentPage: currentPage,
          pageSize: 50,
          totalPages: 10,
          totalElements: 498,
          loading: false,
          onChange: (pageNo, pageSize) => {
            console.log(pageNo, pageSize);
            setCurrentPage(pageNo);
          },
          displayPaginationLength: 5,
        }}
        onClick={({ item, itemIndex, columnIndex, column }) => {
          console.log('click tr', item, itemIndex, columnIndex, column);
        }}
      />
    </Container>
  );
}

const Container = styled(ExampleContainer)``;

export default PagingExample;
