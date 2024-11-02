import { Box, Grid, Typography } from '@mui/material'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { MouseEvent } from 'react'
import Upload from '@/components/ui/Upload'
import { Alert } from '@/components/ui'
import Dialog from '@/components/ui/Dialog'
import { Notification, toast } from '@/components/ui'
import { Base_Url } from '@/configs/app.config'
import { DoubleSidedImage } from '@/components/shared'
import { addDoctor } from '@/services/DoctorService'


//write schema for form validation from the default values

const validationSchema = Yup.object().shape({
    Name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Only letters and spaces allowed.')
    .min(3, 'Should be at least 3 characters.')
    .max(50, 'Should not exceed 50 characters.').required('Name is required'),
    Description: Yup.string().min(10, 'Should be at least 10 characters.')
    .max(300, 'Should not exceed 300 characters.').required('Description is required'),
    Specialization: Yup.string().min(3, 'Should be at least 3 characters.')
    .max(100, 'Should not exceed 100 characters.').required('Specialization is required'),
    ClinicAddress: Yup.string().min(10, 'Should be at least 10 characters.')
    .max(200, 'should not exceed 200 characters').required('ClinicAddress is required'),
    ContactNumber: Yup.string().matches(/^\d{10}$/, 'Must be exactly 10 digits.').required('ContactNumber is required'),
    Email: Yup.string().email("Invalid Email").required('Email is required'),
    // ImageURL: Yup.string().required('ImageURL is required'),


})


const AddDoctor = ({ dialogIsOpen, setIsOpen }: { dialogIsOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
 
    const [files, setFiles] = useState<string>("")
    const navigate = useNavigate();

    const openNotification = (
        type: 'success' | 'warning' | 'danger' | 'info',
        Message: string
    ) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {Message}
            </Notification>
        )
    }

    const submit = async (values: any) => {
     
        try {
            const response = await addDoctor(values)
            const data = await response.data;
            if (data.status === 201) {
                openNotification('success', 'New Doctor added successfully');
                setIsOpen(false)
            }
            else {
                openNotification('danger', 'Failed to add Doctor');
            }
        } catch (error) {
            

        }
    };

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }
    const onUpload = async (files: File[]) => {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'pbfwqcie'); // Use your Cloudinary upload preset

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/daosik5yi/image/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log('Image uploaded to Cloudinary:', data.secure_url);
            setFiles(data.secure_url);

        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);

        }
    };

    return (
        
                <>
                    <Dialog
                        isOpen={dialogIsOpen}
                        onClose={onDialogClose}
                        width={800}
                        height={490}
                        onRequestClose={onDialogClose}
                        shouldFocusAfterRender={true}
                    >
                        <h2>Doctor&apos;s Registration</h2>
                        <div className="max-h-96 overflow-y-auto">
                            <div className="flex flex-col h-full justify-between">


                                <Formik
                                    const initialValues={{
                                        Name: "",
                                        Description: "",
                                        Specialization: "",
                                        ClinicAddress: "",
                                        ContactNumber: '',
                                        Email: "",
                                        ImageURL: "",

                                    }}
                                    validationSchema={validationSchema}

                                    onSubmit={(values, { resetForm, setSubmitting }) => {
                                        values.ImageURL = files
                                        const data = {
                                            "Name": values.Name,
                                            "Description": values.Description,
                                            "Specialization": values.Specialization,
                                            "ClinicAddress": values.ClinicAddress,
                                            "ContactNumber": parseInt(values.ContactNumber),
                                            "Email": values.Email,
                                            "ImageURL": values.ImageURL
                                        }
                                        submit(data);
                                        setTimeout(() => {
                                            setSubmitting(false)
                                            resetForm()
                                        }, 400);
                                    }}
                                >
                                    {({ touched, errors, resetForm }) => (
                                        <Form>
                                            <FormContainer >
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6} >
                                                        <FormItem
                                                            label="Name"
                                                            invalid={errors.Name && touched.Name}
                                                            errorMessage={errors.Name}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="Name"
                                                                placeholder="Doctor's Name"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} >
                                                        <FormItem
                                                            label="Description"
                                                            invalid={errors.Description && touched.Description}
                                                            errorMessage={errors.Description}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="Description"
                                                                placeholder="Description"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </Grid>


                                                    <Grid item xs={12} sm={6} style={{
                                                        paddingTop: "0px"
                                                    }}>

                                                        <FormItem
                                                            label="Specialization"
                                                            invalid={errors.Specialization && touched.Specialization}
                                                            errorMessage={errors.Specialization}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="Specialization"
                                                                placeholder="Specialization"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} style={{
                                                        paddingTop: "0px"
                                                    }}>

                                                        <FormItem
                                                            label="ClinicAddress"
                                                            invalid={errors.ClinicAddress && touched.ClinicAddress}
                                                            errorMessage={errors.ClinicAddress}
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="ClinicAddress"
                                                                placeholder="ClinicAddress"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </Grid>


                                                    <Grid item xs={12} sm={6} style={{

                                                        paddingTop: "0px",
                                                    }}>
                                                        <FormItem
                                                            label="ContactNumber"
                                                            invalid={errors.ContactNumber && touched.ContactNumber}
                                                            errorMessage={errors.ContactNumber}
                                                        >
                                                            <Field
                                                                type="number"
                                                                autoComplete="off"
                                                                name="ContactNumber"
                                                                placeholder="ContactNumber"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} style={{
                                                        paddingTop: "0px"
                                                    }}>
                                                        <FormItem
                                                            label="Email"
                                                            invalid={errors.Email && touched.Email}
                                                            errorMessage={errors.Email}
                                                        >
                                                            <Field
                                                                type="email"
                                                                autoComplete="off"
                                                                name="Email"
                                                                placeholder="Email"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} style={{
                                                        paddingTop: "0px"
                                                    }}>
                                                        <h6>Upload Doctor Photo</h6>

                                                        <Upload draggable onChange={(file) => onUpload(file)} />
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} style={{
                                                        paddingTop: "0px"
                                                    }}>
                                                        <FormItem>
                                                            <Button
                                                                type="reset"
                                                                className="ltr:mr-2 rtl:ml-2"
                                                                onClick={() => resetForm()}
                                                            >
                                                                Reset
                                                            </Button>
                                                            <Button variant="solid" type="submit">
                                                                Submit
                                                            </Button>
                                                        </FormItem>
                                                    </Grid>
                                                </Grid>
                                            </FormContainer>
                                        </Form>
                                    )}
                                </Formik>
                            </div >
                        </div>
                    </Dialog >
                </>
            

    )
}


    export default AddDoctor;