import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import history from '@components/App/history';
import * as TestUtils from '@testing-library/react';

export function renderWithRouter(ui, his = history) {
    return {
        ...render(<Router history={his}>{ui}</Router>),
        history,
    }
};

export async function act(fn) {
    let res;
    await TestUtils.act(async () => {
        res = await fn();
    });
    return res;
};

