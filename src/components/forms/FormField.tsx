import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

interface IFormField<T extends FieldValues> {
    fieldError: FieldError | undefined;
    customError?: string | null;
    register: UseFormRegister<T>;
    label: string;
    fieldName: string;
    inputType: HTMLInputTypeAttribute;
    options?: string[] | null;
    labelDescription?: string;
    placeholder?: string
    value?: string
    defaultValue?: string
    checked?: boolean
    min?: string
    radioLabel?: string
}

export function FormField<T extends FieldValues>({
    fieldError,
    customError,
    register,
    label,
    fieldName,
    inputType,
    options,
    labelDescription,
    placeholder,
    defaultValue,
    min,
    radioLabel
}: IFormField<T>) {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={fieldName} className="form-label fw-semibold">
                    {label}
                    <div className="form-text">
                        {labelDescription}
                    </div>
                </label>
                {
                    fieldError &&
                    <div className="text-danger my-1">
                        {fieldError.message}
                    </div>
                }
                {
                    inputType === "radio" && options
                        ? getRadioButtonField()
                        : (
                            <input
                                {...register(fieldName as Path<T>)}
                                type={inputType}
                                min={min}
                                className={fieldError || customError != undefined ? "form-control is-invalid" : "form-control border-dark-purple"}
                                id={fieldName}
                                placeholder={placeholder}
                                defaultValue={defaultValue}
                            />
                        )}
            </div>
        </>
    );

    function getRadioButtonField() {
        return <div>
            {
                options?.map((option) => (
                    <div key={option} className="form-check form-check-inline px-0 my-1">
                        <input
                            {...register(fieldName as Path<T>)}
                            type="radio"
                            value={option}
                            id={`${fieldName}-${option}`}
                            className={fieldError ? "btn-check is-invalid" : "btn-check"}
                        />
                        <label
                            htmlFor={`${fieldName}-${option}`}
                            className="btn btn-outline-dark"
                        >
                            {option}
                        </label>
                    </div>
                ))}
        </div>;
    }
}