import TabsComponent from './tabs';
import Item from './tabs-item';

export { Item };

export type { TabsProps } from './tabs';
export type { TabsItemProps } from './tabs-item';

type TabsType = typeof TabsComponent;

interface TabsComponentType extends TabsType {
  Item: typeof Item;
}

const Tabs = TabsComponent as TabsComponentType;

Tabs.Item = Item;

export default Tabs;
