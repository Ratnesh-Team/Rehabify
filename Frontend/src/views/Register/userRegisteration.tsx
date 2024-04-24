import {  Box, Grid, Typography } from '@mui/material'
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


const userRegisteration = () => {
    const submit = () => {

        console.log('submitted')
    }
    return (
        <div style={{ marginTop: "2rem" }}>
            <Alert showIcon className="mb-4" >
                Please be patient, this page is under development
            </Alert>
            <Formik
                const initialValues={{

                    name: 'Ayesha Mangal',
                    age: 45,
                    gender: 'Male',
                    state: 'Assam',
                    district: 'South Salmara-Mankachar',
                    guardianName: 'Suhana Savant',
                    addictionType: 'Alcohol',
                    addictionDuration: 83,
                    durationOfTreatment: 11,
                    isTreatmentCompleted: false,
                    underTreatment: true,
                    employmentStatus: 0,
                    nashaMuktiCentreName: 'Nasha Mukti Kendra_22',
                    nashaMuktiCentreAddress: 'H.No. 657, Gill Zila, Ballia 760768',
                    nashaMuktiCentreCode: 'NMK022',
                    joiningDate: '17/06/2023',
                    counsellingCount: 16,
                    counsellorName: 'Kimaya Lall',
                    // Add more fields as needed
                }}
                // validationSchema={validationSchema}
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
                                        label="Age"
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
                                    >
                                        <Field
                                            type="age"
                                            autoComplete="off"
                                            name="age"
                                            placeholder="Age"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>


                                <Grid item xs={6} sm={6} style={{
                                    paddingTop: "0px"
                                }}>
                                    <FormItem
                                        label="Genger"
                                    // invalid={errors.ownerName && touched.ownerName}
                                    // errorMessage={errors.ownerName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="gender"
                                            placeholder="Genger"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{
                                    paddingTop: "0px"
                                }}>
                                    <FormItem
                                        label="State"
                                    // invalid={errors.contactNumber && touched.contactNumber}
                                    // errorMessage={errors.contactNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="state"
                                            placeholder="State"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>


                                <Grid item xs={6} sm={6} style={{

                                    paddingTop: "0px",
                                }}>
                                    <FormItem
                                        label="District"
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}
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
                                    paddingTop: "0px"
                                }}>
                                    <FormItem
                                        label="Garurdian Name"
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="garurdianName"
                                            placeholder="Garurdian Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>


                                <Grid item xs={6} sm={6} style={{
                                    paddingTop: "0px"
                                }}>
                                    <FormItem
                                        label="Addiction Type"
                                    // invalid={errors.ownerName && touched.ownerName}
                                    // errorMessage={errors.ownerName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="addictionType"
                                            placeholder="Addiction Type"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{
                                    paddingTop: "0px"
                                }}>
                                    <FormItem
                                        label="Addiction Duration"
                                    // invalid={errors.contactNumber && touched.contactNumber}
                                    // errorMessage={errors.contactNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="addictionDuration"
                                            placeholder="Addiction Duration"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Duration of Treatment"
                                    // invalid={errors.durationOfTreatment && touched.durationOfTreatment}
                                    // errorMessage={errors.durationOfTreatment}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="durationOfTreatment"
                                            placeholder="Duration of Treatment"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Is Treatment Completed"
                                    // invalid={errors.isTreatmentCompleted && touched.isTreatmentCompleted}
                                    // errorMessage={errors.isTreatmentCompleted}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="isTreatmentCompleted"
                                            placeholder="Is Treatment Completed"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Under Treatment"
                                    // invalid={errors.underTreatment && touched.underTreatment}
                                    // errorMessage={errors.underTreatment}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="underTreatment"
                                            placeholder="Under Treatment"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Employment Status"
                                    // invalid={errors.employmentStatus && touched.employmentStatus}
                                    // errorMessage={errors.employmentStatus}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="employmentStatus"
                                            placeholder="Employment Status"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Nasha Mukti Centre Name"
                                    // invalid={errors.nashaMuktiCentreName && touched.nashaMuktiCentreName}
                                    // errorMessage={errors.nashaMuktiCentreName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="nashaMuktiCentreName"
                                            placeholder="Nasha Mukti Centre Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Nasha Mukti Centre Address"
                                    // invalid={errors.nashaMuktiCentreAddress && touched.nashaMuktiCentreAddress}
                                    // errorMessage={errors.nashaMuktiCentreAddress}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="nashaMuktiCentreAddress"
                                            placeholder="Nasha Mukti Centre Address"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Nasha Mukti Centre Code"
                                    // invalid={errors.nashaMuktiCentreCode && touched.nashaMuktiCentreCode}
                                    // errorMessage={errors.nashaMuktiCentreCode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="nashaMuktiCentreCode"
                                            placeholder="Nasha Mukti Centre Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Joining Date"
                                    // invalid={errors.joiningDate && touched.joiningDate}
                                    // errorMessage={errors.joiningDate}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="joiningDate"
                                            placeholder="Joining Date"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Counsellor Name"
                                    // invalid={errors.joiningDate && touched.joiningDate}
                                    // errorMessage={errors.joiningDate}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="counsellorName"
                                            placeholder="Counsellor Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </Grid>

                                <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                    <FormItem
                                        label="Counselling Count"
                                    // invalid={errors.joiningDate && touched.joiningDate}
                                    // errorMessage={errors.joiningDate}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="counsellingCount"
                                            placeholder="Counselling Count"
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
    )
}

export default userRegisteration