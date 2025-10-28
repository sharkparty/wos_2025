// Framework
import { JSX } from "react";
// 3rd Party
import { AlertDialog, Avatar, DropdownMenu } from "radix-ui";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// Local
import { friendlyDateUtil } from "./friendly-date.util";
import { User, useUsersContext } from "../user-context";
import styles from "./user-table-row.module.css";
import alert from "./alert.module.css";
import { Button } from "../button";

const { Root, Trigger, Portal, Content, Item } = DropdownMenu;

const { Root: AvatarRoot, Image } = Avatar;

const {
  Root: AlertRoot,
  Trigger: AlertTrigger,
  Portal: AlertPortal,
  Overlay,
  Content: AlertContent,
  Title,
  Description: AlertDescription,
  Action: AlertAction,
} = AlertDialog;

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
  const { deleteUser } = useUsersContext();

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
      <AlertRoot>
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
                  <AlertTrigger className={alert.alertTrigger}>
                    <Item className={styles.dropDownItem}>Delete user</Item>
                  </AlertTrigger>
                </Content>
              </Portal>
            </Root>
          )}
        </td>
        <AlertPortal>
          <Overlay className={alert.alertOverlay}>
            <AlertContent className={alert.alertContent}>
              <Title className={alert.alertDialogTitle}>Delete User</Title>
              <AlertDescription className={alert.alertDialogDescription}>
                Are you sure? The user <strong>{name}</strong> will be
                permanently deleted.
              </AlertDescription>
              <div className={alert.alertActionsContainer}>
                <AlertAction asChild={true}>
                  <Button variant="outline">Cancel</Button>
                </AlertAction>
                <Button onClick={() => deleteUser(id)} variant="destroy">
                  Delete User
                </Button>
              </div>
            </AlertContent>
          </Overlay>
        </AlertPortal>
      </AlertRoot>
    </tr>
  );
};
