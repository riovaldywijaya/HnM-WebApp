import { Outlet } from 'react-router';
import Navbarr from './Navbarr';
import Footerr from './Footerr';

export default function Layout() {
  return (
    <>
      <Navbarr />
      <Outlet />
      <Footerr />
    </>
  );
}
