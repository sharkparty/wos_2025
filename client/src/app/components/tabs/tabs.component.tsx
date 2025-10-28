// Framework
import React, { JSX } from "react";
// 3rd Party
import { Tabs as RadixTabs } from "radix-ui";
// Local
import styles from "./tabs.module.css";

// Simplify JSX
const { Root, TabsTrigger, TabsList, TabsContent } = RadixTabs;

export type TabsProps = {
  children: React.ReactNode;
};

export const Tabs = ({ children }: TabsProps): JSX.Element => {
  const tabMap: TabProps[] = [];
  React.Children.forEach(children, (child) => {
    // Confirm the child is of the right type
    if (React.isValidElement<TabProps>(child) && child.type === Tab) {
      const { key } = child;
      tabMap.push({ ...child.props, key: `${key}` });
    }
  });

  return (
    <div className={styles.tabsContainer}>
      <Root defaultValue={tabMap[0].key}>
        <TabsList className={styles.tabsListContainer}>
          {tabMap.length > 0 &&
            tabMap.map((tab) => (
              <TabsTrigger
                className={styles.tabsListTrigger}
                value={tab.key}
                key={tab.key}
              >
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
        </TabsList>
        {tabMap.length > 0 &&
          tabMap.map((tab) => (
            <TabsContent value={tab.key} key={tab.key}>
              {tab.children}
            </TabsContent>
          ))}
      </Root>
    </div>
  );
};

// NOTE: The parent component is responsible for rendering.
interface TabProps {
  key: string; // TODO: don't overload the React API
  label: string;
  children: React.ReactNode; // Content inside the Tab
}
export const Tab = (props: TabProps) => {
  return null;
};
// Set the displayName for runtime type checking
Tab.displayName = "Tab";
