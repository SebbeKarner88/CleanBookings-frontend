import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";
import {HTMLInputTypeAttribute} from "react";

interface IFormField<T extends FieldValues> {
    fieldError: FieldError | undefined;
    customError?: string | null;
    register: UseFormRegister<T>;
    label: string;
    fieldName: string;
    inputType: HTMLInputTypeAttribute;
    options?: string[];
    labelDescription?: string;
}

export function FormField<T extends FieldValues>({
                                                     fieldError,
                                                     customError,
                                                     register,
                                                     label,
                                                     fieldName,
                                                     inputType,
                                                     options,
                                                     labelDescription
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
                                className={fieldError || customError != undefined ? "form-control is-invalid" : "form-control"}
                                id={fieldName}
                            />
                        )}
            </div>
        </>
    );

    function getRadioButtonField() {
        return <div>
            {
                options?.map((option) => (
                    <div key={option} className="form-check">
                        <input
                            {...register(fieldName as Path<T>)}
                            type="radio"
                            value={option}
                            id={`${fieldName}-${option}`}
                            className={fieldError ? "form-check-input is-invalid" : "form-check-input"}
                        />
                        <label
                            htmlFor={`${fieldName}-${option}`}
                            className="form-check-label"
                        >
                            {option}
                        </label>
                    </div>
                ))}
        </div>;
    }
}