import { useLocation } from "react-router-dom";
import Seo, { SeoProps } from "./Seo";

/**
 * Router-aware version of the Seo component
 * This component must be used inside a Router context
 * It automatically provides the current path to the Seo component
 */
const RouterAwareSeo = (props: Omit<SeoProps, 'path'>) => {
  const { pathname } = useLocation();
  return <Seo {...props} path={pathname} />;
};

export default RouterAwareSeo;
