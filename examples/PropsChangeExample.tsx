import * as React from 'react';
import styled from '@emotion/styled';
import { AXFDataGrid, AXFDGColumn, AXFDGDataItem, AXFDGSortParam } from '../@axframe-datagrid';
import { Checkbox, Col, Divider, Form, InputNumber, Row, Select, Switch } from 'antd';
import { delay } from '../@axframe-datagrid/utils';
import ExampleContainer from '../components/ExampleContainer';
import { useContainerSize } from '../hooks/useContainerSize';

interface Props {}

interface IListItem {
  id: string;
  title: string;
  writer: string;
  createAt: string;
}

const listFirst: AXFDGDataItem<IListItem>[] = Array.from(Array(200)).map((v, i) => ({
  values: {
    id: `FIRST_${i}`,
    title: `F title_${i}`,
    writer: `F writer_${i}`,
    createAt: `2022-09-08`,
    group: {
      k: `K${i}`,
    },
  },
}));

const listSecond: AXFDGDataItem<IListItem>[] = Array.from(Array(100)).map((v, i) => ({
  values: {
    id: `SECOND ID_${i}`,
    title: `S title_${i}`,
    writer: `S writer_${i}`,
    createAt: `2022-09-08`,
    group: {
      k: `K${i}`,
    },
  },
}));

const columnsFirst: AXFDGColumn<IListItem>[] = [
  {
    key: ['group', 'k'],
    label: 'PK',
    width: 80,
  },
  {
    key: 'id',
    label: '아이디 IS LONG !',
    width: 100,
  },
  {
    key: 'title',
    label: '제목',
    width: 300,
  },
  {
    key: 'writer',
    label: '작성자',
    width: 100,
  },
  {
    key: 'createAt',
    label: '작성일',
    width: 100,
  },
];

function PropsChangeExample(props: Props) {
  const [list, setList] = React.useState(listFirst);
  const [listName, setListName] = React.useState('listFirst');
  const [loading, setLoading] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const [width, setWidth] = React.useState(600);
  const [height, setHeight] = React.useState(300);
  const [headerHeight, setHeaderHeight] = React.useState(35);
  const [footerHeight, setFooterHeight] = React.useState(30);
  const [itemHeight, setItemHeight] = React.useState(15);
  const [itemPadding, setItemPadding] = React.useState(7);
  const [frozenColumnIndex, setFrozenColumnIndex] = React.useState(0);
  const [checkedIndexes, setCheckedIndexes] = React.useState<number[]>([]);
  const [checkedRowKeys, setCheckedRowKeys] = React.useState<string[]>([]);
  const [sortParams, setSortParams] = React.useState<AXFDGSortParam[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [columns, setColumns] = React.useState<AXFDGColumn<IListItem>[]>([]);
  const [selectedRowKey, setSelectedRowKey] = React.useState<string>();
  const [showLineNumber, setShowLineNumber] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { width: containerWidth, height: containerHeight } = useContainerSize(containerRef);
  React.useEffect(() => {
    setColumns(columnsFirst);
  }, []);

  return (
    <>
      <Wrap style={{ width, height }}>
        <Container ref={containerRef} style={{ width, height }}>
          <AXFDataGrid<IListItem>
            width={containerWidth}
            height={containerHeight}
            headerHeight={headerHeight}
            footerHeight={footerHeight}
            itemHeight={itemHeight}
            itemPadding={itemPadding}
            frozenColumnIndex={frozenColumnIndex}
            data={list}
            columns={columns}
            onChangeColumns={(columnIndex, width, columns) => {
              console.log('onChangeColumnWidths', columnIndex, width, columns);
              setColumns(columns);
            }}
            rowChecked={{
              checkedIndexes,
              // checkedRowKeys,
              onChange: (checkedIndexes, checkedRowKeys, checkedAll) => {
                console.log('onChange rowSelection', checkedIndexes, checkedRowKeys, checkedAll);
              },
            }}
            page={{
              currentPage,
              pageSize: 50,
              totalPages: 10,
              totalElements: list.length,
              loading: false,
              onChange: (pageNo, pageSize) => {
                console.log(pageNo, pageSize);
                setCurrentPage(pageNo);
              },
              displayPaginationLength: 5,
            }}
            sort={{
              sortParams,
              onChange: sortParams => {
                console.log('onChange: sortParams', sortParams);
              },
            }}
            loading={loading}
            spinning={spinning}
            rowKey={['group', 'k']}
            selectedRowKey={selectedRowKey}
            showLineNumber={showLineNumber}
          />
        </Container>
      </Wrap>

      <Divider />

      <Form
        layout={'vertical'}
        initialValues={{
          width,
          height,
          headerHeight,
          footerHeight,
          itemHeight,
          itemPadding,
          frozenColumnIndex,
          selectedIds: checkedIndexes,
          sortParams,
          currentPage,
          listName,
        }}
      >
        <Row gutter={20}>
          <Col xs={12} sm={6}>
            <Form.Item name={'loading'} label={'Loading'} valuePropName={'checked'}>
              <Switch onChange={checked => setLoading(checked)} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'spinning'} label={'Spinning'} valuePropName={'checked'}>
              <Switch onChange={checked => setSpinning(checked)} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'showLineNumber'} label={'LineNumber'} valuePropName={'checked'}>
              <Switch onChange={checked => setShowLineNumber(checked)} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'width'} label={'Width'}>
              <InputNumber
                min={100}
                onChange={width => {
                  setWidth(Number(width));
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'height'} label={'Height'}>
              <InputNumber
                min={100}
                onChange={height => {
                  setHeight(Number(height));
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'headerHeight'} label={'Header Height'}>
              <InputNumber
                min={22}
                onChange={headerHeight => {
                  setHeaderHeight(Number(headerHeight));
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'footerHeight'} label={'Footer Height'}>
              <InputNumber
                min={22}
                onChange={footerHeight => {
                  setFooterHeight(Number(footerHeight));
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'itemHeight'} label={'Item Height'}>
              <InputNumber
                min={1}
                onChange={itemHeight => {
                  setItemHeight(Number(itemHeight));
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'itemPadding'} label={'Item Padding'}>
              <InputNumber
                min={1}
                onChange={itemPadding => {
                  setItemPadding(Number(itemPadding));
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={12} sm={6}>
            <Form.Item name={'frozenColumnIndex'} label={'Frozen Column Index'}>
              <Select
                onChange={value => setFrozenColumnIndex(value)}
                options={columns.map((c, i) => ({ value: i, text: i }))}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'currentPage'} label={'CurrentPage'}>
              <Select
                onChange={value => setCurrentPage(value)}
                options={Array.from({ length: 10 }).map((_, i) => ({ label: i + 1, value: i + 1 }))}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'listName'} label={'Data Change'}>
              <Select
                onChange={async value => {
                  setListName(value);
                  setSpinning(true);
                  await delay(300);

                  if (value === 'listFirst') {
                    setList(listFirst);
                  } else {
                    setList(listSecond);
                  }

                  setSpinning(false);
                }}
                options={[
                  { value: 'listFirst', label: 'listFirst' },
                  { value: 'listSecond', label: 'listSecond' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={12} sm={12}>
            <Form.Item name={'checkedIndexes'} label={'checkedIndexes'}>
              <Checkbox.Group
                options={Array.from({ length: 10 }).map((_, i) => ({ label: i, value: i }))}
                onChange={checkedValue => {
                  setCheckedIndexes(checkedValue as number[]);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12}>
            <Form.Item name={'sortParams'} label={'SortParams'}>
              <Checkbox.Group
                options={[
                  { label: 'id desc', value: `{ "key": "id", "orderBy": "desc" }` },
                  { label: 'title asc', value: `{ "key": "title", "orderBy": "asc" }` },
                  { label: 'writer desc', value: `{ "key": "writer", "orderBy": "desc" }` },
                  { label: 'createAt asc', value: `{ "key": "createAt", "orderBy": "asc" }` },
                ]}
                onChange={checkedValue => {
                  setSortParams(
                    checkedValue.map(value => {
                      console.log(value);
                      return JSON.parse(`${value}`);
                    }),
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Item name={'selectedRowKey'} label={'SelectedRowKey'}>
              <Select
                onChange={value => setSelectedRowKey(value)}
                options={[
                  {
                    label: '',
                    value: '',
                  },
                  ...Array.from({ length: 10 }).map((_, i) => ({ label: `K${i}`, value: `K${i}` })),
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

const Wrap = styled.div`
  position: relative;
`;
const Container = styled(ExampleContainer)``;

export default PropsChangeExample;
