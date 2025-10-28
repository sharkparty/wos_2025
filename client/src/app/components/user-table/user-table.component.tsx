// Framework
import { JSX } from "react";
// 3rd Party
// Local
import { TableRow } from "./user-table-row.component";
import { Button } from "../button";
import { User, useUsersContext } from "../user-context";
import styles from "./user-table.module.css";

export type UserTableProps = {
  usersData?: User[];
  loading?: boolean;
};

export const UserTable = ({
  loading = true,
  usersData,
}: UserTableProps): JSX.Element => {
  const { page, setPage, totalPages } = useUsersContext();

  let rows: User[] = [];

  if (usersData) {
    rows = usersData;
  } else {
    for (let i = 0; i < 9; i++) {
      rows.push({ id: `${i}` } as User);
    }
  }

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
          {rows.map((props: User) => (
            <TableRow loading={loading} key={props.id} {...props} />
          ))}
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
                  disabled={page <= 1}
                  aria-label="Previous Page"
                  onClick={() => setPage(page-1)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={page + 1 > totalPages}
                  aria-label="Next Page"
                  onClick={() => setPage(page+1)}
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
