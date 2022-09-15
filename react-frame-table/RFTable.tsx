import * as React from 'react';
import { AppStoreProvider, AppStore, getAppStoreActions } from './store';
import Table from './components/Table';
import { RFTableProps } from './types';
import create from 'zustand';
import { getFrozenColumnsWidth } from './utils/getFrozenColumnsWidth';

export function RFTable<T = Record<string, any>>({
  width,
  height,
  headerHeight = 30,
  data,
  columns,
  columnsGroup = [],
  frozenColumnIndex = 0,
  itemHeight = 15,
  itemPadding = 7,
  scrollTop = 0,
  scrollLeft = 0,
  className,
  rowSelection,
}: RFTableProps<T>) {
  const containerBorderWidth = 1;
  const contentBodyHeight = height - headerHeight - containerBorderWidth * 2;
  const displayItemCount = Math.ceil(contentBodyHeight / (itemHeight + itemPadding * 2));

  const selectedIdsMap: Map<number, any> = React.useMemo(
    () => new Map(rowSelection?.selectedIds.map(id => [id, true])),
    [rowSelection?.selectedIds],
  );

  const frozenColumnsWidth = React.useMemo(
    () =>
      getFrozenColumnsWidth({
        rowSelection,
        itemHeight,
        itemPadding,
        frozenColumnIndex,
        columns,
      }),
    [columns, frozenColumnIndex, itemHeight, itemPadding, rowSelection],
  );

  return (
    <AppStoreProvider
      createStore={() =>
        create<AppStore<T>>((set, get) => ({
          containerBorderWidth: 1,
          width,
          height,
          headerHeight,
          data,
          columns,
          columnsGroup,
          frozenColumnIndex,
          itemHeight,
          itemPadding,
          scrollTop,
          scrollLeft,
          contentBodyHeight,
          displayItemCount,
          className,
          rowSelection,
          selectedIdsMap,
          selectedAll: false,
          frozenColumnsWidth,
          ...getAppStoreActions(set, get),
        }))
      }
    >
      <Table />
    </AppStoreProvider>
  );
}
