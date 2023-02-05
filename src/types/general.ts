export type RouteType = "/" | "/search-results" | "/subscriptions";

export type DrawerItemProps = {
  url: RouteType;
  text: string;
  icon: JSX.Element;
};
