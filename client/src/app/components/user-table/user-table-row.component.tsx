// Framework
import { JSX } from "react";
// 3rd Party
// Local
import styles from './user-table-row.module.css';
import { Button } from '../button';

type TableRowProps = {

};

export const TableRow = (props: TableRowProps): JSX.Element => {
  return (
    <tr className={styles.userTableRow}>
      <td>Alice Johnson</td>
      <td>Admin</td>
      <td>2024-01-15</td>
      <td>
        <Button variant="secondary" rounded={true}>
          <span>...</span>
        </Button>
      </td>
    </tr>
  );
};
