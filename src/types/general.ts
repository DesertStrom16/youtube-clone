export type RouteType = "/" | "/search-results" | "/subscriptions";

export type DrawerItemProps = {
  url: RouteType;
  text: string;
  icon: JSX.Element;
};

export type StringWithAutocomplete<T> = T | (string & Record<never, never>);
export type LocalStorageOptions = StringWithAutocomplete<"comments">;