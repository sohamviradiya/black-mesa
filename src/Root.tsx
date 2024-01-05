import React from 'react';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { Router, Route, RootRoute } from '@tanstack/react-router';
import Lab from './pages/Lab';

const root = new RootRoute({
  component: () => (<Outlet />),
});

const LabRoute = new Route({ path: '/', component: Lab, getParentRoute: () => root, });

const routeTree = root.addChildren([LabRoute]);

const router = new Router({ routeTree });


function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
