import * as React from 'react';
import RowSelector from './RowSelector';
import { getCellValue, getCellValueByRowKey } from '../utils';
import { BodyTable, TableBodyTr } from './TableBody';
import { useAppStore } from '../store';
import TableColGroupFrozen from './TableColGroupFrozen';
import styled from '@emotion/styled';

interface Props {
  style?: React.CSSProperties;
}

function TableBodyFrozen(props: Props) {
  const scrollTop = useAppStore(s => s.scrollTop);
  const itemHeight = useAppStore(s => s.itemHeight);
  const itemPadding = useAppStore(s => s.itemPadding);
  const trHeight = itemHeight + itemPadding * 2 + 1;
  const displayItemCount = useAppStore(s => s.displayItemCount);
  const data = useAppStore(s => s.data);
  const selectedKeyMap = useAppStore(s => s.checkedIndexesMap);
  const setSelectedKeys = useAppStore(s => s.setCheckedIndexes);
  const selectedAll = useAppStore(s => s.checkedAll);
  const hasRowChecked = useAppStore(s => !!s.rowChecked);
  const columns = useAppStore(s => s.columns);
  const frozenColumnIndex = useAppStore(s => s.frozenColumnIndex);
  const hoverItemIndex = useAppStore(s => s.hoverItemIndex);
  const setHoverItemIndex = useAppStore(s => s.setHoverItemIndex);
  const handleClick = useAppStore(s => s.handleClick);
  const rowKey = useAppStore(s => s.rowKey);
  const selectedRowKey = useAppStore(s => s.selectedRowKey);

  const startIdx = Math.floor(scrollTop / trHeight);
  const endNumber = Math.min(startIdx + displayItemCount, data.length);

  const handleChangeChecked = React.useCallback(
    (itemIndex: number, checked: boolean) => {
      if (checked) {
        selectedKeyMap.set(itemIndex, true);
      } else {
        selectedKeyMap.delete(itemIndex);
      }
      setSelectedKeys([...selectedKeyMap.keys()]);
    },
    [selectedKeyMap, setSelectedKeys],
  );

  return (
    <BodyTable style={props.style}>
      <TableColGroupFrozen />
      <tbody role={'rfdg-body-frozen'}>
        {Array.from({ length: endNumber - startIdx }, (_, i) => {
          const ri = startIdx + i;
          const item = data[ri];
          if (!item) {
            return null;
          }

          return (
            <TableBodyTr
              key={ri}
              itemHeight={itemHeight}
              itemPadding={itemPadding}
              hover={hoverItemIndex === ri}
              active={rowKey ? getCellValueByRowKey(rowKey, item) === selectedRowKey : false}
              onMouseOver={() => setHoverItemIndex(ri)}
              onMouseOut={() => setHoverItemIndex(undefined)}
            >
              {hasRowChecked && (
                <td>
                  <RowSelector
                    checked={selectedAll === true || selectedKeyMap.get(ri)}
                    handleChange={checked => handleChangeChecked(ri, checked)}
                  />
                </td>
              )}
              {columns.slice(0, frozenColumnIndex).map((column, idx) => {
                return (
                  <td
                    key={idx}
                    style={{
                      textAlign: column.align,
                    }}
                    onClick={() => handleClick(ri, idx)}
                  >
                    {getCellValue(column, item)}
                  </td>
                );
              })}
            </TableBodyTr>
          );
        })}
      </tbody>
    </BodyTable>
  );
}

export default TableBodyFrozen;
