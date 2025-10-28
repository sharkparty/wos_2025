// Framework
import { JSX } from "react";
// 3rd Party
import { Avatar, DropdownMenu } from "radix-ui";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// Local
import { friendlyDateUtil } from "./friendly-date.util";
import { User } from "../user-context";
import styles from "./user-table-row.module.css";
import { Button } from "../button";

const { Root, Trigger, Portal, Content, Item } = DropdownMenu;

const { Root: AvatarRoot, Image } = Avatar;

type TableRowProps = {
  loading?: boolean;
} & User;

export const TableRow = ({
  id,
  first,
  last,
  photo,
  role,
  createdAt,
  loading,
}: TableRowProps): JSX.Element => {
  const name = `${first || ""} ${last || ""}`;

  return (
    <tr className={styles.userTableRow}>
      <td>
        {!loading && first ? (
          <div className={styles.userRowContainer}>
            <AvatarRoot>
              <Image
                className={styles.avatar}
                alt={`Avatar for ${name}`}
                src={photo}
              />
            </AvatarRoot>
            <p>{name}</p>
          </div>
        ) : (
          <Skeleton className={styles.skeleton} />
        )}
      </td>
      <td>
        {loading || !role ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          `${role.name}`
        )}
      </td>
      <td>
        {loading || !createdAt ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          friendlyDateUtil(createdAt)
        )}
      </td>
      <td>
        {!loading && id && (
          <Root>
            <Trigger asChild={true}>
              <Button variant="secondary" rounded={true}>
                <DotsHorizontalIcon />
              </Button>
            </Trigger>
            <Portal>
              <Content className={styles.dropDownContent} align="end">
                <Item className={styles.dropDownItem}>Edit user</Item>
                <Item className={styles.dropDownItem}>Delete user</Item>
              </Content>
            </Portal>
          </Root>
        )}
      </td>
    </tr>
  );
};
