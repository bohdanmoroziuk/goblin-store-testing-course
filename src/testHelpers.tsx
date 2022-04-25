import React, { ReactNode } from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';

export type RenderComponent = () => ReactNode;

export type RenderWithRouterResult = RenderResult & { history: MemoryHistory  };

export type RenderWithRouter = (renderComponent: RenderComponent, route?: string) => RenderWithRouterResult;

global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory();

  if (route) {
    history.push(route);
  }

  return {
    history,
    ...render(
      <Router history={history}>
        {renderComponent()}
      </Router>
    ),
  };
};

declare global {
  namespace NodeJS {
    interface Global {
      renderWithRouter: RenderWithRouter;
    }
  }

  namespace globalThis {
    const renderWithRouter: RenderWithRouter;
  }
}
