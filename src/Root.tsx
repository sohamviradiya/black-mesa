import React from 'react';
import Main from './pages/Main';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { Router, Route, RootRoute } from '@tanstack/react-router';
import Test from './pages/Test';

const root = new RootRoute({
  component: () => (<Outlet />),
});


const MainRoute = new Route({ path: '/', component: Main, getParentRoute: () => root, });
const TestRoute = new Route({ path: '/test', component: Test, getParentRoute: () => root, });

const routeTree = root.addChildren([MainRoute,TestRoute]);

const router = new Router({ routeTree });


function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
