import React, { FC, BaseSyntheticEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Input } from '../../components';

interface SecondFormStepProps {
    onSubmit: (formValues: any) => void;
}

export const SecondFormStep: FC<SecondFormStepProps> = ({ onSubmit }) => {
    const { watch, register, handleSubmit, errors } = useFormContext();

    const watchShippingMethod = watch('shippingMethod');

    const submit = (formValues: any, event?: BaseSyntheticEvent) => {
        event?.preventDefault();

        onSubmit(formValues);
    }

    return (
        <form className="container" onSubmit={handleSubmit(submit)}>
            <fieldset className="radiogroup" role="radiogroup">
                <label >
                    <input id="delivery" ref={register()} type="radio" name="shippingMethod" value="delivery" />
                    Доставка
                </label>

                <label >
                    <input id="pickup" ref={register()} type="radio" name="shippingMethod" value="pickup" />
                    Самовывоз
                </label>
            </fieldset>
            {
                watchShippingMethod === 'delivery'
                && (
                    <>
                        <Input
                            label="Страна"
                            name="country"
                            placeholder="Россия"
                            errorMessage={errors.country && 'Поле Страна обязательно для заполнения'}
                            ref={register({ required: true })}
                        />
                        <div className="row">
                            <Input
                                className="input_half-width"
                                label="Город"
                                name="city"
                                placeholder="Москва"
                                errorMessage={errors.city && 'Поле Город обязательно для заполнения'}
                                ref={register({ required: true, maxLength: 255 })}
                            />
                            <Input
                                className="input_half-width"
                                label="Индекс"
                                name="zipcode"
                                placeholder="123456"
                                errorMessage={errors.zipcode && 'Поле Индекс обязательно для заполнения'}
                                ref={register({ required: true, minLength: 6, maxLength: 6 })}
                            />
                        </div>
                        <Input
                            label="Адрес"
                            name="address"
                            placeholder=""
                            errorMessage={errors.address && 'Поле Адрес обязательно для заполнения'}
                            ref={register({ required: true })}
                        />
                        <Input
                            label="Дата доставки"
                            type="date"
                            name="date"
                            errorMessage={errors.date && 'Поле Дата доставки обязательно для заполнения'}
                            ref={register({ required: true })}
                        />
                    </>
                )
            }
            {watchShippingMethod === 'pickup' && (
                <div className="input">
                    <label className="label" htmlFor="comment">Комментарий к заказу</label>
                    <textarea
                        className="input__control"
                        id="comment"
                        autoComplete="comment"
                        name="comment"
                        ref={register()}
                    />
                </div>
            )}
            <Button type="submit" name="submit-second-step">Оформить заказ</Button>
        </form>
    );
}