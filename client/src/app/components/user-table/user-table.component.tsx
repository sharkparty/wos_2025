// Framework
import { JSX } from "react";
// 3rd Party
// Local
import { TableRow } from './user-table-row.component';
import { Button } from '../button';
import { UserSchemaCollection } from './user.schema';
import styles from "./user-table.module.css";

export type UserTableProps = {
  usersData?: UserSchemaCollection;
  loading?: boolean;
};

export const UserTable = (props: UserTableProps): JSX.Element => {
  return (
    <div className={styles.userTableContainer}>
      <table
        className={styles.userTable}
        role="region"
        aria-label="User data and roles table"
        cellSpacing={0}
        cellPadding={0}
        width={100}
      >
        <thead className={styles.userTableHead}>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Role</th>
            <th scope="col">Joined</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody className={styles.userTableBody}>
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
        <tfoot className={styles.userTableFooter}>
          <tr>
            <td colSpan={4}>
              <nav
                className={styles.paginationControls}
                aria-label="Pagination Navigation"
              >
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={true}
                  aria-label="Previous Page"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  aria-label="Next Page"
                >
                  Next
                </Button>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
