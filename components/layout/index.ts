import LayoutComponent from './layout';
import Header from './header';
import Sider from './sider';
import Content from './content';
import Footer from './footer';

export { Header, Sider, Content, Footer };
export type { LayoutProps } from './layout';
export type { HeaderProps } from './header';
export type { SiderProps } from './sider';
export type { ContentProps } from './content';
export type { FooterProps } from './footer';

type LayoutType = typeof LayoutComponent;

interface LayoutComponentType extends LayoutType {
  Header: typeof Header;
  Sider: typeof Sider;
  Content: typeof Content;
  Footer: typeof Footer;
}

const Layout = LayoutComponent as LayoutComponentType;

Layout.Header = Header;
Layout.Sider = Sider;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
