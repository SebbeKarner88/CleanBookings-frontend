import { useContext, useState } from 'react'
import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { bookService } from "../../api/CustomerApi.ts";
import { useNavigate } from "react-router-dom";
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


const BookingForm = () => {
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ selectedService, setSelectedService ] = useState('')
    const [ selectedDate, setSelectedDate ] = useState('')
    const { customerId } = useContext(AuthContext)

    /* TODO: how to make the picked option slected when the user is redirected to this view (via BookingView.tsx)? */

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
                setErrorMessage("Date is already booked.");
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
                        checked
                        /** FUNKAR EJ SOM JAG VILL. hur får jag choice att bli markerad och inte dyka upp som en dublett? */
                        options={[ /* OM man har valt typ av städning på sidan "Services" vill jag att detta valet ska vara markerat här, men hur?? */
                                "BASIC", "TOPP", "DIAMOND", "WINDOW" ]}
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
                        customError={errorMessage}
                        register={register}
                        value={selectedDate}
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
            {/** TODO: Add some logic for modal showing success message only if the booking actually is successful */}
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