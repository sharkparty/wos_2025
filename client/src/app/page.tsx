"use client";
// 3rd Party
import { Form } from "radix-ui";
import { PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
// Local
import {
  Button,
  UsersProvider,
  useUsersContext,
  UserTable,
  Tabs,
  Tab,
} from "./components";
import styles from "./page.module.css";

const { Root: FormRoot, Field, Control } = Form;

const HomePageContent = () => {
  const { users, isLoading, setSearch } = useUsersContext();
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
              >
                <p className={styles.addUserButtonContainer}>
                  <PlusIcon />
                  Add User
                </p>
              </Button>
            </div>
            <div className={styles.userTableContainer}>
              <UserTable usersData={users} loading={isLoading} />
            </div>
          </Tab>
          <Tab key="roles" label="Roles">
            <p>HW</p>
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
