"use client"


import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DashboardList } from "@/app/types";



const Modal = ({ setModalVisible, data, edit }: {
    setModalVisible?: any;
    data?: DashboardList;
    edit?: boolean
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: edit ? {
            name: data?.name,
            email: data?.email,

        } : {
            name: "",
            email: ""
        },
    });

    const handleClose = () => {
        setModalVisible(false);
    };

    const userData = data;





    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        //console.log(data);

        if (edit) {
            //console.log(userData?.id);
            const loaderID = toast.loading("Updating...");

            axios
                .put(`/api/adduser/${userData?.id}`, {
                    name: data.name,
                    email: data.email
                })
                .then(() => {
                    toast.success("Updated");
                    //setModalVisible(false);
                    window.location.reload()
                    toast.dismiss(loaderID);
                })
                .catch(() => toast.error("Something went wrong."));

        } else {
            axios.post("/api/adduser", data)
                .then((callback) => {
                    if (callback) {


                        toast.success("Email added");
                        window.location.reload()
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong!");
                })
                .finally(() => setIsLoading(false));
        }





    }

    return (
        <div>
            <div
                className="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
                id="modal"
            >
                <div
                    role="alert"
                    className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
                >
                    <form className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400" onSubmit={handleSubmit(onSubmit)}>

                        {
                            edit && <h4>{userData?.id}</h4>
                        }
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="name"
                            label="Name"
                        />
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="email"
                            label="Email address"
                            type="email"
                        />

                        <div className="flex items-center mt-5 justify-start w-full">
                            <Button disabled={isLoading} fullWidth type="submit">

                                Submit
                            </Button>
                            <button
                                onClick={handleClose}
                                className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                        <div
                            onClick={handleClose}
                            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Close"
                                className="icon icon-tabler icon-tabler-x"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                            </svg>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal