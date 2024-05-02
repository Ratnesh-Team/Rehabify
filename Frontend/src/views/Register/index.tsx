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
import { Alert, Notification, toast } from '@/components/ui'
import DatePicker from '@/components/ui/DatePicker'
import type { FieldProps } from 'formik'
import UserRegisteration from './userRegisteration'
import { image } from 'd3-fetch'
import { Base_Url } from '@/configs/app.config'


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
    yaerOfRegistration: Yup.string().required('Date Required!').nullable(),

})


const index = () => {
    const [notification, setNotification] = useState<string | null>(null);

    const [files, setFiles] = useState<string>("")
    const [files2, setFiles2] = useState<string>("")


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

    const handle = () => {
        navigate('/Register/userRegistration')
    }

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
            const response = await fetch(Base_Url + '/addNmk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            console.log('Success:', data);
            if (data.status === 200) {
                openNotification('success', 'NMK Registered Successfully');
                navigate('/Register/approval')
            }
            else {
                openNotification('danger', 'Failed to Register NMK');
            }
        } catch (error) {
            
        }
    };

    return (
        <>
            <Box display="flex" justifyContent={"space-between"}>
                <Typography variant='h4' fontWeight="Bold"> Register for NMK Here </Typography>

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
                        yaerOfRegistration:'',
                        image1: '',
                        image2: '',

                    }}
                    validationSchema={validationSchema}
                    onSubmit={(value, { resetForm, setSubmitting }) => {
                        // Define the values object
                        value.image1 = files;
                        value.image2 = files2;
                        const data = {
                            "Name": value.name,
                            "Address": value.address,
                            "Owner_Name": value.ownerName,
                            "Contact_Number": parseInt(value.contactNumber),
                            "Email": value.email,
                            "ImageURL": value.image1,
                            "State": value.state,
                            "District": value.district,
                            "Pincode": parseInt(value.pinCode), // Convert to integer
                            "IsVerified": false,
                            "Established_Year": parseInt(value.yaerOfRegistration),
                            "NMK_Verification_Image": value.image2,
                        };
                        submit(data);
                        setTimeout(() => {
                            // alert(JSON.stringify(value, null, 2));
                            setSubmitting(false);
                            resetForm();
                        }, 400);
                    }}

                >
                    {({ values, touched, errors, resetForm }) => (
                        <Form>
                            <FormContainer >
                                <Grid container spacing={3}>

                                    <Grid item xs={12} sm={6} style={{

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

                                    <Grid item xs={12} sm={6} style={{
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


                                    <Grid item xs={12} sm={6} style={{
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

                                    <Grid item xs={12} sm={6} style={{
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
                                    <Grid item xs={12} sm={6} style={{

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

                                    <Grid item xs={12} sm={6} style={{

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
                                    <Grid item xs={12} sm={6} style={{

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

                                    <Grid item xs={12} sm={6} style={{

                                        paddingTop: "0px",
                                    }}>


                                        <FormItem
                                            label="Year of Registration"
                                            invalid={errors.yaerOfRegistration && touched.yaerOfRegistration}
                                            errorMessage={errors.yaerOfRegistration}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                name="yaerOfRegistration"
                                                placeholder="Year of Registration"
                                                component={Input}
                                            />
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
                                            {({ field, form }: FieldProps) => (
                                                <Upload draggable onChange={(files) => onUpload(files, 'image1')} />
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
            </div >




        </>


    )
}

export default index 