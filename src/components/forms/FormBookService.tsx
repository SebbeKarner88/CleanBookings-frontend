import { useContext, useState } from 'react'
import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { bookService } from "../../api/CustomerApi.ts";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FormField } from "./FormField.tsx";
import MyModal from '../../common/MyModal.tsx';
import { AuthContext } from '../../context/AuthContext.tsx';

interface Props {
    choice: string | null
}

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


const BookingForm = ({ choice }: Props) => {
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ selectedService, setSelectedService ] = useState('')
    const [ selectedDate, setSelectedDate ] = useState('')
    const [ selectedCleaner, setSelectedCleaner ] = useState('')
    const { setCustomerId } = useContext(AuthContext)


    /* TODO: add logic with fetch for booking a service */
    /* TODO: add logic to check if user is logged in before making booking possible */
    /* TODO: how to make the picked option slected when the user is redirected to this view (via BookingView.tsx)? */

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
            setCustomerId,
            selectedService,
            selectedDate,
            selectedCleaner,
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
                        labelDescription="What kind of service would you like to book?"
                        inputType="radio"
                        options={[ /* OM man har valt typ av städning på sidan "Services" vill jag att detta valet ska vara markerat här, men hur?? */
                            "Basic Cleaning", "Top Cleaning", "Diamond Cleaning", "Window Cleaning" ]}
                        fieldError={errors.type}
                        register={register}
                        value={selectedService}
                    />
                </div>
                <div className="col-md-6">
                    <FormField
                        fieldName="date"
                        label="Date"
                        inputType="date"
                        fieldError={errors.date}
                        register={register}
                        value={selectedDate}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
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
                </div>
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
            {/** TODO: Add some logic for modal showing success message only if the booking actually is successful */}
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