import React from 'react';
import Main from './pages/Main';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { Router, Route, RootRoute } from '@tanstack/react-router';
import Lab from './pages/Lab';

const root = new RootRoute({
  component: () => (<Outlet />),
});


const MainRoute = new Route({ path: '/', component: Main, getParentRoute: () => root, });
const LabRoute = new Route({ path: '/lab', component: Lab, getParentRoute: () => root, });

const routeTree = root.addChildren([MainRoute,LabRoute]);

const router = new Router({ routeTree });


function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
