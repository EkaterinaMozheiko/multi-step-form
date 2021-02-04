import React, { BaseSyntheticEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Input } from '../../components';

interface FirstStepFormProps {
    onSubmit: () => void;
}

const PHONE_NUMBER_REGEX = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const FirstFormStep: FC<FirstStepFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, errors } = useFormContext();

    const submit = (_, event?: BaseSyntheticEvent) => {
        event?.preventDefault();
        onSubmit();
    }

    return (
        <form className="container" onSubmit={handleSubmit(submit)}>
            <div className="row">
                <Input 
                    className="input_half-width"
                    label="Имя"
                    name="name"
                    placeholder="Иван"
                    errorMessage={errors.name && 'Поле Имя обязательно для заполнения'}
                    ref={register({ 
                        required: true, 
                        maxLength: 255 
                    })}
                />
                <Input 
                    className="input_half-width"
                    label="Фамилия"
                    name="secondName"
                    placeholder="Иванов"
                    errorMessage={errors.secondName && 'Поле Фамилия обязательно для заполнения'}
                    ref={register({ 
                        required: true, 
                        maxLength: 255 
                    })}
                />
            </div>
            <Input 
                label="Телефон"
                name="phoneNumber"
                type="tel"
                errorMessage={errors.phoneNumber && 'Поле Телефон обязательно для заполнения'}
                ref={register({ 
                    required: true,
                    pattern: PHONE_NUMBER_REGEX 
                })}
                placeholder="+79046524783"
            />
            <Input 
                label="Email"
                name="email"
                type="email"
                placeholder="example@example.com"
                errorMessage={errors.email && 'Поле Email обязательно для заполнения'}
                ref={register({ 
                    required: true, 
                    pattern: EMAIL_REGEX
                })}
            />
            <Button type="submit" name="submit-first-step">
                Продолжить
            </Button>
        </form>
    );
}