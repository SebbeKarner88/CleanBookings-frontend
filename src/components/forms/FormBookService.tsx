import { useContext, useState } from 'react'
import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { bookService } from "../../api/CustomerApi.ts";
import { useNavigate } from "react-router-dom";
import { FormField } from "./FormField.tsx";
import MyModal from '../../common/MyModal.tsx';
import { AuthContext } from '../../context/AuthContext.tsx';

const schema = z.object({
    type: z
        .string()
        .nonempty({ message: "Type is required." }),
    date: z
        .string()
        .nonempty({message: "Date is required."}),
    message: z
        .string()
});

type FormData = z.infer<typeof schema>;

const BookingForm = () => {
    const [ modalVisible, setModalVisible ] = useState(false)
    const { customerId } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const navigation = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    function onSubmit(data: FieldValues) {
        bookService(
            customerId,
            data.type,
            data.date,
            data.message
        ).then(response => {
            if (response?.status == 200) {
                setModalVisible(!modalVisible)
                navigation("/");
            } else {
                setErrorMessage("Something went wrong, try again.");
            }
        }).catch(error => console.error(error.message));
    }

    return (
        <form
            className="my-3 my-md-5 px-4 text-start"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="row">
                <div className="col-md-6">
                    <FormField
                        fieldName="type"
                        label="Type of service"
                        labelDescription="What kind of service would you like to book?"
                        inputType="radio"
                        options={["BASIC", "TOPP", "DIAMOND", "WINDOW" ]}
                        fieldError={errors.type}
                        register={register}
                    />
                </div>
                <div className="col-md-6">
                    <FormField
                        fieldName="date"
                        label="Date"
                        inputType="date"
                        fieldError={errors.date}
                        customError={errorMessage}
                        register={register}
                    />
                </div>
            </div>
            <div className="row">
                {/*  <div className="col-md-6">
                    <FormField
                        fieldName="cleaner"
                        label="Cleaner"
                        labelDescription="Who would you like to perform the job?"
                        inputType="radio"
                        options={[ "Angelina", "Sebastian", "Jimmy", "Georgios", "Joachim", "Jonas" ]}
                        fieldError={errors.type}
                        register={register}
                        value={selectedCleaner}
                    />
                </div> */}
                <div className="col-md-6">
                    <FormField
                        fieldName="message"
                        label="Message"
                        labelDescription="Message"
                        inputType="text"
                        fieldError={errors.message}
                        register={register}
                    />
                </div>
            </div>
            {/** TODO: Add payment options */}
            <button
                type="submit"
                className="btn btn-outline-dark w-100"
                // onClick={() => {
                //     setModalVisible(!modalVisible);
                // }}
            >
                Book
            </button>
            <MyModal
                modalVisible={modalVisible}
                header="Thank you for booking!"
                description="You will receive a confirmation email shortly."
                onRequestClose={() => setModalVisible(!modalVisible)}
            />
        </form>
    )
}

export default BookingForm