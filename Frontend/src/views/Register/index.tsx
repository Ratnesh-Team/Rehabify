/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Select from '@/components/ui/Select'
import { useNavigate } from 'react-router-dom'
import userRegisteration from './userRegisteration'
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
import DatePicker from '@/components/ui/DatePicker'
import type { FieldProps } from 'formik'



type Option = {
    value: string
    label: string
}
// const options: Option[] = [
//     { value: 'foo', label: 'Foo' },
//     { value: 'bar', label: 'Bar' },
// ]
//in this way of option give me list states in value and label
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
    input: string
    select: string
    multipleSelect: string[]
    date: Date | null
    time: Date | null
    singleCheckbox: boolean
    multipleCheckbox: Array<string | number>
    radio: string
    switcher: boolean
    segment: string[];
    upload: File[];
}


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(25, 'Too Long!')
        .required('NMK Name Required'),
    address: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Address Name Required'),
    ownerName: Yup.string()
        .min(3, 'Too Short!')
        .max(25, 'Too Long!')
        .required('Owner Name Required'),
    contactNumber: Yup.string()
        .required('Contact Number Required')
        .min(10, 'Too Short!')
        .matches(/^[0-9]*$/, 'Only Numbers Allowed'),
    state: Yup.string().required('State Required'),
    district: Yup.string().required('District Required'),
    pinCode: Yup.string().required('Pincode Required'),
    yearOfRegistrtion: Yup.date().required('Date Required!').nullable(),

})


const index = () => {

    const navigate = useNavigate();
    const submit = () => {
        console.log('submitted')
    }
    const handle = () => {
        navigate('/Register/userRegistration')
    }

    return (
        <>
            <Alert showIcon className="mb-4" >
                Please be patient, this page is under development
            </Alert>
            <Box display="flex" justifyContent={"space-between"}>
                <Typography variant='h4' fontWeight="Bold"> Register for NMK Here </Typography>
                <Button variant='solid' onClick={handle} >Register</Button>
            </Box>
            <div style={{ marginTop: "2rem" }}>
                <Formik
                    initialValues={{
                        name: '',
                        address: '',
                        ownerName: '',
                        contactNumber: '',
                        email: '',
                        state: '',
                        district: '',
                        pinCode: '',
                        yearOfRegistrtion: Date.now(),

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
                    {({ values, touched, errors, resetForm }) => (
                        <Form>
                            <FormContainer >



                                <Grid container spacing={3}>

                                    <Grid item xs={6} sm={6} style={{

                                        paddingTop: "0px",
                                    }}>
                                        <FormItem
                                            label="Name"
                                            invalid={errors.name && touched.name}
                                            errorMessage={errors.name}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="name"
                                                placeholder=" NMK Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </Grid>

                                    <Grid item xs={6} sm={6} style={{
                                        paddingTop: "0px"
                                    }}>
                                        <FormItem
                                            label="Email"
                                            invalid={errors.email && touched.email}
                                            errorMessage={errors.email}
                                        >
                                            <Field
                                                type="email"
                                                autoComplete="off"
                                                name="email"
                                                placeholder="Email"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </Grid>


                                    <Grid item xs={6} sm={6} style={{
                                        paddingTop: "0px"
                                    }}>
                                        <FormItem
                                            label="Owner's Name"
                                            invalid={errors.ownerName && touched.ownerName}
                                            errorMessage={errors.ownerName}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="ownerName"
                                                placeholder="Owner's Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </Grid>

                                    <Grid item xs={6} sm={6} style={{
                                        paddingTop: "0px"
                                    }}>
                                        <FormItem
                                            label="Contact Number"
                                            invalid={errors.contactNumber && touched.contactNumber}
                                            errorMessage={errors.contactNumber}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                name="contactNumber"
                                                placeholder="Contact Number"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </Grid>
                                    <Grid item xs={6} sm={6} style={{

                                        paddingTop: "0px",
                                    }}>
                                        {/* <FormItem
                                            label="State"
                                            invalid={errors.state && touched.state}
                                            errorMessage={errors.state}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="state"
                                                placeholder="State"
                                                component={Input}
                                            />
                                        </FormItem> */}
                                        <FormItem
                                            asterisk
                                            label="Select State"
                                            invalid={errors.state && touched.state}
                                            errorMessage={errors.state}
                                        >
                                            <Field name="select">
                                                {({ field, form }: FieldProps<FormModel>) => (
                                                    <Select
                                                        field={field}
                                                        form={form}
                                                        options={options}
                                                        value={options.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.state
                                                        )}
                                                        onChange={(option) =>
                                                            form.setFieldValue(
                                                                "state",
                                                                option?.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </Grid>

                                    <Grid item xs={6} sm={6} style={{

                                        paddingTop: "0px",
                                    }}>
                                        <FormItem
                                            label="District"
                                            invalid={errors.district && touched.district}
                                            errorMessage={errors.district}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="district"
                                                placeholder="District"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </Grid>
                                    <Grid item xs={6} sm={6} style={{

                                        paddingTop: "0px",
                                    }}>
                                        <FormItem
                                            label="PinCode"
                                            invalid={errors.pinCode && touched.pinCode}
                                            errorMessage={errors.pinCode}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                name="pinCode"
                                                placeholder="PinCode"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </Grid>

                                    <Grid item xs={6} sm={6} style={{

                                        paddingTop: "0px",
                                    }}>
                                        {/* <FormItem
                                            label="Year Of Registration"
                                            invalid={errors.yearOfRegistrtion && touched.yearOfRegistrtion}
                                            errorMessage={errors.yearOfRegistrtion}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="yearOfRegistrtion"
                                                placeholder="Year Of Registration"
                                                component={Input}
                                            />

                                        </FormItem> */}

                                        <FormItem
                                            asterisk
                                            label="Year Of Registration"
                                            invalid={errors.yearOfRegistrtion && touched.yearOfRegistrtion}
                                            errorMessage={errors.yearOfRegistrtion}
                                        >
                                            <Field name="yearOfRegistrtion" placeholder="Date">
                                                {({ field, form }: FieldProps<FormModel>) => (
                                                    <DatePicker
                                                        field={field}
                                                        form={form}
                                                        value={new Date(values.yearOfRegistrtion)} // Convert string to Date object
                                                        onChange={(date) => {
                                                            form.setFieldValue(
                                                                "yearOfRegistrtion",
                                                                date
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </Grid>



                                    <Grid item xs={12} sm={12} style={{
                                        paddingTop: "0px"
                                    }}
                                    >
                                        <FormItem
                                            label="Address"
                                            invalid={errors.address && touched.address}
                                            errorMessage={errors.address}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="address"
                                                placeholder="Address"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </Grid>

                                    <Grid item xs={12} sm={12} style={{
                                        paddingTop: "0px"
                                    }}>
                                        <Upload draggable />
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
            </div>




        </>


    )
}

export default index 