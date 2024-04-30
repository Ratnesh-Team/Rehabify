/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Select from '@/components/ui/Select'
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
import DatePicker from '@/components/ui/DatePicker'
import type { FieldProps } from 'formik'
import UserRegisteration from './userRegisteration'
import { image } from 'd3-fetch'


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

    state: string

    yearOfRegistration: Date | null


}


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('NMK Name Required'),
    address: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Address Name Required'),
    ownerName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Owner Name Required'),
    contactNumber: Yup.string()
        .required('Contact Number Required')
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .matches(/^[0-9]*$/, 'Only Numbers Allowed'),
    state: Yup.string().required('State Required'),
    district: Yup.string().required('District Required'),
    pinCode: Yup.string().required('Pincode Required'),
    yearOfRegistrtion: Yup.string().required('Date Required!').nullable(),

})


const index = () => {
    const [dialogIsOpen, setIsOpen] = useState<boolean>(false);
    const [files,setFiles] = useState<string>("")
    const [files2,setFiles2] = useState<string>("")
    const openDialog = () => {
        setIsOpen(true)
    }

    const onUpload = async (files: File[], imageField: string) => {
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
            
            if (imageField === 'image1') {
                setFiles(data.secure_url);
            } else if (imageField === 'image2') {
                setFiles2(data.secure_url);
            }

        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);

        }
    };
    const navigate = useNavigate();
    const submit = () => {
        console.log('submitted')
    }
    const handle = () => {
        navigate('/Register/userRegistration')
    }

    return (
        <>
            <Box display="flex" justifyContent={"space-between"}>
                <Typography variant='h4' fontWeight="Bold"> Register for NMK Here </Typography>
                <Button variant='solid' onClick={openDialog} >Register User</Button>
            </Box>
            {dialogIsOpen && <UserRegisteration dialogIsOpen={dialogIsOpen} setIsOpen={setIsOpen} />}

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
                        image1: '',
                        image2: '',

                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                        
                        values.image1 = files
                        values.image2 = files2
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

                                    <Grid item xs={12}sm={6} style={{

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

                                    <Grid item xs={12}sm={6} style={{
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


                                    <Grid item xs={12}sm={6} style={{
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

                                    <Grid item xs={12}sm={6} style={{
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
                                    <Grid item xs={12}sm={6} style={{

                                        paddingTop: "0px",
                                    }}>

                                        <FormItem
                                            asterisk
                                            label="Select State"
                                            invalid={errors.state && touched.state}
                                            errorMessage={errors.state}
                                        >
                                            <Field name="state">
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

                                    <Grid item xs={12}sm={6} style={{

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
                                    <Grid item xs={12}sm={6} style={{

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

                                    <Grid item xs={12}sm={6} style={{

                                        paddingTop: "0px",
                                    }}>


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

                                    <Grid item xs={12} sm={6} style={{
                                        paddingTop: "0px"
                                    }}>
                                <h6>Upload Nasha Mukti Kendra Photo</h6>
                                        <Field name="image1">
                                            {({ field,form }: FieldProps) => (
                                                <Upload draggable onChange={(files) => onUpload(files, 'image1') } />
                                            )}
                                            
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{
                                        paddingTop: "0px"
                                    }}>
                                        <h6>Upload Nasha Mukti Kendra  Verification Document</h6>
                                        <Field name="image2">
                                            {({ field, form }: FieldProps) => (
                                                <Upload draggable onChange={(files) => onUpload(files, 'image2')} />
                                            )}
                                        </Field>

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