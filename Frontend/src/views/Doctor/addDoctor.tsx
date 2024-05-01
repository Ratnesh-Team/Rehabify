import { Box, Grid, Typography } from '@mui/material'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Field, Form, Formik } from 'formik'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import * as Yup from 'yup'
import type { MouseEvent } from 'react'
import Upload from '@/components/ui/Upload'
import { Alert } from '@/components/ui'
import Select from '@/components/ui/Select'
import type { FieldProps } from 'formik'
import DatePicker from '@/components/ui/DatePicker'
import Dialog from '@/components/ui/Dialog'


//write schema for form validation from the default values

type Option = {
    value: string
    label: string
}

const genderOptions: Option[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
]

const employmentOptions: Option[] = [
    { value: 'employed', label: 'Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
    { value: 'retired', label: 'Retired' },
    { value: 'housewife', label: 'Housewife' },

]

const addictionTypeOptions: Option[] = [
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'tobacco', label: 'Tobacco' },
    { value: 'cannabis', label: 'Cannabis' },
    { value: 'opiods', label: 'Opiods' },
    { value: 'benzodiazepines', label: 'Benzodiazepines' },
    { value: 'cocaine', label: 'Cocaine' },
    { value: 'amphetamines', label: 'Amphetamines' },
    { value: 'hallucinogens', label: 'Hallucinogens' },
    { value: 'inhalants', label: 'Inhalants' },
    { value: 'phencyclidine', label: 'Phencyclidine' },
    { value: 'other', label: 'Other' },
]


const options: Option[] = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' },
]
type FormModel = {

    state: string
    gender: string
    employmentStatus: string
    addictionType: string
    yearOfRegistration: Date | null


}

const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Description: Yup.string().required('Description is required'),
    Specialization: Yup.string().required('Specialization is required'),
    ClinicAddress: Yup.string().required('ClinicAddress is required'),
    ContactNumber: Yup.number().required('ContactNumber is required'),
    Email: Yup.string().email("Invalid Email").required('Email is required'),
    ImageURL: Yup.string().required('ImageURL is required'),
    Doctor_Code: Yup.string().required('Doctor Code is required'),

})








const AddDoctor = ({ dialogIsOpen, setIsOpen }: { dialogIsOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {

    const submit = () => {
        console.log('submitted')
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

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
                                Name: "Dr. Rahul Verma",
                                Description: "Compassionate cardiologist specializing in heart rehabilitation.",
                                Specialization: "Cardiology",
                                ClinicAddress: "321 Oak Lane, Bangalore",
                                ContactNumber: 91234567893,
                                Email: "rahulverma@example.com",
                                ImageURL: "https://thumbs.dreamstime.com/b/portrait-indian-doctor-portrait-male-indian-doctor-serious-expression-crossed-arms-wearing-white-coat-having-open-137577527.jpg",
                                Doctor_Code: "DOC003"
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm, setSubmitting }) => {
                                console.log(values)
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2))
                                    setSubmitting(false)
                                    resetForm()
                                }, 400)
                            }}
                        >
                            {({ touched, errors, resetForm }) => (
                                <Form>
                                    <FormContainer >
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} sm={6} style={{
                                                paddingTop: "0px",
                                            }}>
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

                                            <Grid item xs={6} sm={6} style={{
                                                paddingTop: "0px"
                                            }}>
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


                                            <Grid item xs={6} sm={6} style={{
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

                                            <Grid item xs={6} sm={6} style={{
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


                                            <Grid item xs={6} sm={6} style={{

                                                paddingTop: "0px",
                                            }}>
                                                <FormItem
                                                    label="ContactNumber"
                                                    invalid={errors.ContactNumber && touched.ContactNumber}
                                                    errorMessage={errors.ContactNumber}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="ContactNumber"
                                                        placeholder="ContactNumber"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </Grid>

                                            <Grid item xs={6} sm={6} style={{
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


                                            <Grid item xs={6} sm={6} style={{
                                                paddingTop: "0px"
                                            }}>
                                                <FormItem
                                                    label="ImageURL"
                                                    invalid={errors.ImageURL && touched.ImageURL}
                                                    errorMessage={errors.ImageURL}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="ImageURL"
                                                        placeholder="ImageURL"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </Grid>

                                            <Grid item xs={6} sm={6} style={{
                                                paddingTop: "0px"
                                            }}>
                                                <FormItem
                                                    label="Doctor_Code"
                                                    invalid={errors.Doctor_Code && touched.Doctor_Code}
                                                    errorMessage={errors.Doctor_Code}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="Doctor_Code"
                                                        placeholder="Doctor's Code"
                                                        component={Input}
                                                    />
                                                </FormItem>
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
                                                    <Button variant="solid" type="submit" onClick={submit}>
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