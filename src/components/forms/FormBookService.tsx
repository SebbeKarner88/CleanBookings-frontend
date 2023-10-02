import { useState } from 'react'
import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { bookService } from "../../api/CustomerApi.ts";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FormField } from "./FormField.tsx";
import MyModal from '../../common/MyModal.tsx';

const schema = z.object({
    type: z
        .string()
        .nonempty({ message: "Type is required." }),
    date: z
        .string()
        .nonempty({ message: "Date is required." }),
    message: z
        .string()
});

type FormData = z.infer<typeof schema>;


const BookingForm = () => {
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ selectedService, setSelectedService ] = useState(''); // State to store selected service
    const [ selectedDate, setSelectedDate ] = useState(''); // State to store selected date


    /* TODO: add logic with fetch for booking a service */
    /* TODO: add logic to check if user is logged in before making booking possible */

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const navigation = useNavigate();

    function onSubmit(data: FieldValues) {
        bookService(
            data.customerId,  /** TODO add context for customer ID */
            selectedService,
            selectedDate,
            data.message
        ).then(response => {
            if (response?.status == 201) {
                // Set data if needed
                navigation("/")
            }
        });
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
                        inputType="text"
                        fieldError={errors.type}
                        register={register}
                    />
                    <select
                        className="form-control"
                        id="type-of-service"
                        onChange={(e) => setSelectedService(e.target.value)}
                        value={selectedService}
                    >
                        <option value="">Select a service</option>
                        <option value="Basic Cleaning">Basic Cleaning</option>
                        <option value="Top Cleaning">Top Cleaning</option>
                        <option value="Diamond Cleaning">Diamond Cleaning</option>
                        <option value="Window Cleaning">Window Cleaning</option>
                    </select>
                </div>
                <div className="col-md-6">
                    {/* Use a date picker component here */}
                    <FormField
                        fieldName="date"
                        label="Date"
                        inputType="date"
                        fieldError={errors.date}
                        register={register}
                        value={selectedDate}
                        onChange={(e: any) => setSelectedDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
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

            <button
                type="submit"
                className="btn btn-outline-dark w-100"
                onClick={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                Book
            </button>
            <MyModal
                modalVisible={modalVisible}
                header="Thank you for booking!"
                description="You will receive a confirmation email shortly."
                onRequestClose={() => setModalVisible(!modalVisible)}
            />
            <div className="mt-3 d-flex gap-2 align-items-center">
                <VscAccount size={20} />
                <strong>Already have an account? </strong>
                <Link to="/login">Sign in</Link>
            </div>
        </form>
    )
}

export default BookingForm