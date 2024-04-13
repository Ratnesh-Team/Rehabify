import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

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

})


const index = () => {
    const submit = () => {
        console.log('submitted')
    }

    return (


        <>
            <Box display="flex" justifyContent={"space-between"}>
                <Typography variant='h4' fontWeight="Bold"> Register for NMK Here </Typography>
                <Button variant='solid'>Register</Button>
            </Box>
            <div style={{ marginTop: "2rem" }}>
                <Formik
                    initialValues={{
                        name: '',
                        address: '',
                        ownerName: '',
                        contactNumber: '',
                        email: '',

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
                                                type="text"
                                                autoComplete="off"
                                                name="contactNumber"
                                                placeholder="Contact Number"
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