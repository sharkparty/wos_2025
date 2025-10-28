"use client";
// Framework
import { useState, useMemo } from "react";
// 3rd Party
import Skeleton from 'react-loading-skeleton';
import { Form, AlertDialog } from "radix-ui";
import { PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
// Local
import {
  Button,
  UsersProvider,
  useUsersContext,
  UserTable,
  Tabs,
  Tab,
  Role,
  friendlyDateUtil,
} from "./components";
import styles from "./page.module.css";
import alert from "../app/components/user-table/alert.module.css";

const { Root: FormRoot, Field, Control } = Form;

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

const HomePageContent = () => {
  const { users, isLoading, setSearch, roles, updateRole } = useUsersContext();

  const [newRoleName, setNewRoleName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useMemo(() => {
    if (newRoleName && newRoleName.length >= 3) {
      // eslint-disable-next-line react-hooks/set-state-in-render
      setIsFormValid(true);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-render
      setIsFormValid(false);
    }
  }, [newRoleName]);

  return (
    <main className={styles.pageContainer}>
      <section className={styles.pageContent}>
        <Tabs>
          <Tab key="users" label="Users">
            <div className={styles.formContainer}>
              <FormRoot className={styles.formRoot}>
                <Field className={styles.formField} name="filter">
                  <MagnifyingGlassIcon
                    width="1.25rem"
                    height="1.25rem"
                    className={styles.searchIcon}
                  />
                  <Control asChild={true}>
                    <input
                      className={styles.searchInput}
                      placeholder="Search by name"
                      autoFocus={true}
                      type="text"
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </Control>
                </Field>
              </FormRoot>
              <Button
                className={styles.addUserButton}
                variant="primary"
                size="md"
                disabled={true}
              >
                <p className={styles.addUserButtonContainer}>
                  <PlusIcon />
                  Add User
                </p>
              </Button>
            </div>
            <div className={styles.userTableContainer}>
              {!isLoading ? (
                <UserTable usersData={users} loading={isLoading} />
              ) : (
                <Skeleton height="3rem" />
              )}
            </div>
          </Tab>
          <Tab key="roles" label="Roles">
            <div className={styles.formContainer}>
              <Button
                className={styles.addUserButton}
                disabled={true}
                variant="primary"
                size="md"
              >
                <p className={styles.addUserButtonContainer}>
                  <PlusIcon />
                  Add Role
                </p>
              </Button>
            </div>
            <div className={styles.rolesContainer}>
              <AlertRoot>
                <ul className={styles.rolesList}>
                  {(roles || []).map((role: Role) => (
                    <li key={role.id} className={styles.rolesItem}>
                      <div>
                        <p>{role.name}</p>
                        <small>
                          Last Updated: {friendlyDateUtil(role.updatedAt || "")}
                        </small>
                      </div>
                      <AlertTrigger asChild={true}>
                        <Button variant="outline" size="md">
                          Edit role name
                        </Button>
                      </AlertTrigger>
                      <AlertPortal>
                        <Overlay className={alert.alertOverlay}>
                          <AlertContent className={alert.alertContent}>
                            <Title className={alert.alertDialogTitle}>
                              Rename Role
                            </Title>
                            <AlertDescription
                              asChild={true}
                              className={alert.alertDialogDescription}
                            >
                              <div className={styles.roleRenameForm}>
                                <label htmlFor="role">
                                  Rename role <strong>{role.name}</strong>
                                  <br />
                                  <input
                                    className={styles.roleInput}
                                    type="text"
                                    required={true}
                                    aria-label="role name"
                                    name="role"
                                    value={newRoleName}
                                    onChange={(e) =>
                                      setNewRoleName(e.target.value)
                                    }
                                  />
                                </label>
                                {!isFormValid && (
                                  <small>
                                    Role name must be longer than 3 characters.
                                  </small>
                                )}
                              </div>
                            </AlertDescription>

                            <div className={alert.alertActionsContainer}>
                              <AlertAction asChild={true}>
                                <Button variant="outline">Cancel</Button>
                              </AlertAction>
                              <AlertAction asChild={true}>
                                <Button
                                  disabled={!isFormValid}
                                  variant="primary"
                                  onClick={() =>
                                    updateRole(role.id, { name: newRoleName })
                                  }
                                >
                                  Save role
                                </Button>
                              </AlertAction>
                            </div>
                          </AlertContent>
                        </Overlay>
                      </AlertPortal>
                    </li>
                  ))}
                </ul>
              </AlertRoot>
            </div>
          </Tab>
        </Tabs>
      </section>
    </main>
  );
};

const Home = () => (
  <UsersProvider>
    <HomePageContent />
  </UsersProvider>
);

export default Home;
