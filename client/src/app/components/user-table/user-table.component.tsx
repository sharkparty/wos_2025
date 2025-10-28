// Framework
import { JSX } from "react";
// 3rd Party
// Local
import { TableRow } from "./user-table-row.component";
import { Button } from "../button";
import { UserSchema, UserSchemaCollection } from "./user.schema";
import styles from "./user-table.module.css";

export type UserTableProps = {
  usersData?: UserSchemaCollection;
  loading?: boolean;
};

export const UserTable = ({
  loading = true,
  usersData,
}: UserTableProps): JSX.Element => {
  let rows: UserSchemaCollection = [];

  if (loading) {
    for (let i = 0; i < 9; i++) {
      rows.push({ id: `${i}` } as UserSchema);
    }
  } else {
    rows = usersData;
  }

  console.log(111, rows);

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
          {rows.map((props: UserSchema) => (
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
