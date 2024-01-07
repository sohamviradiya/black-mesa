import React from 'react';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { Router, Route, RootRoute } from '@tanstack/react-router';
import Lab from './pages/Lab';
import Main from './pages/Main';
import { Difficulty } from './modules/state';

const root = new RootRoute({
  component: () => (<Outlet />),
});

export const LabRoute = new Route({
  path: '/play', component: Lab, getParentRoute: () => root,
  validateSearch: (search: Record<string, unknown>) => {
    const difficulty = search.difficulty as string;
    if (!difficulty) {
      return {
        difficulty: 'ROOKIE' as Difficulty,
      }
    }
    const difficulties = ['ROOKIE', 'CASUAL', 'MASTER', 'VETERAN', 'INSANE'];
    return {
      difficulty:  (difficulties.includes(difficulty) ? difficulty : 'ROOKIE') as Difficulty,
    }
  }
  });
const MainRoute = new Route({ path: '/', component: Main, getParentRoute: () => root, });


const routeTree = root.addChildren([LabRoute, MainRoute]);

const router = new Router({ routeTree });


function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
