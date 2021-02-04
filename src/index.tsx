import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import { MultiStepForm } from './containers';

import './style.scss';

const App: FC = () => {
    return (
        <div className="wrapper">
            <MultiStepForm />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));
