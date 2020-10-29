import Home from '../page/Home';
import Auth from '../page/Auth';
import Registration from '../page/Registration';
import CurrentStamp from '../page/CurrentStamp';
import ErrorPage from '../page/ErrorPage';

export const routesLists = {
  '/': Home,
  '/auth': Auth,
  '/registration': Registration,
  '/stamp/:stampID': CurrentStamp,
  '/404': ErrorPage,
};
