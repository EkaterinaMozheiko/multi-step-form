import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classnames from 'classnames';

import { FirstFormStep } from '../first-form-step';
import { SecondFormStep } from '../second-form-step';

enum ActiveTabName {
    STEP1 = 'step1',
    STEP2 = 'step2'
}

const FirstStepDefaultValues = {
    name: '',
    secondName: '',
    email: '',
    phoneNumber: ''
}

const SecondStepDefaultValues = {
    shippingMethod: 'delivery',
    country: '',
    city: '',
    zipcode: '',
    address: '',
    date: '',
    comment: ''
}

export const MultiStepForm: FC = () => {
    const firstStepMethods = useForm({
        defaultValues: FirstStepDefaultValues,
        mode: 'onBlur',
        shouldUnregister: false,
        shouldFocusError: true
    });

    const secondStepMethods = useForm({
        defaultValues: SecondStepDefaultValues,
        mode: 'onBlur',
        shouldFocusError: true
    });

    const [activeTab, setActiveTab] = useState<ActiveTabName>(ActiveTabName.STEP1);

    const isFirstStepValidAndDirty = () => {
        return firstStepMethods.formState.isValid && firstStepMethods.formState.isDirty;
    }

    const onClickTabItem = (tab: ActiveTabName) => {
        if (tab === ActiveTabName.STEP1 || (tab === ActiveTabName.STEP2 && isFirstStepValidAndDirty)) {
            setActiveTab(tab);
        }
    }

    const goToNextStep = () => setActiveTab(ActiveTabName.STEP2);

    const sendForm = (formValues: typeof FirstStepDefaultValues & Partial<typeof SecondStepDefaultValues>) => {
        const xhr = new XMLHttpRequest();
        const formValuesJSON = JSON.stringify(formValues);

        xhr.open('POST', '/test.php', false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(formValuesJSON);

        if (xhr.status != 200) {
            alert('Просьба повторить запрос позже');
        } else {
            alert('Успешно отправлено');
            window.location.reload();
        }
    }

    const handleSubmit = () => {
        const formValues = { ...firstStepMethods.getValues(), ...secondStepMethods.getValues() };

        sendForm(formValues);
    }

    return (
        <div className="tabs">
            <ul className="tab-list">
                <li
                    className={classnames('tab-list-item', {
                        ['tab-list-item_active']: activeTab === ActiveTabName.STEP1
                    })}
                    onClick={() => onClickTabItem(ActiveTabName.STEP1)}
                >
                    Основные данные
                </li>
                <li
                    className={classnames('tab-list-item', {
                        ['tab-list-item_active']: activeTab === ActiveTabName.STEP2
                    })}
                    onClick={() => onClickTabItem(ActiveTabName.STEP2)}
                >
                    Адрес доставки
                </li>
            </ul>
            <FormProvider {...firstStepMethods} >
                {activeTab === ActiveTabName.STEP1 && <FirstFormStep onSubmit={goToNextStep} />}
            </FormProvider>
            <FormProvider {...secondStepMethods} >
                {activeTab === ActiveTabName.STEP2 && <SecondFormStep onSubmit={handleSubmit} />}
            </FormProvider>
        </div>
    );
}
