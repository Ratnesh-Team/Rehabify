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
    name: Yup.string().required('Name is required'),
    age: Yup.string().required('Age is required'),
    gender: Yup.string().required('gender is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    guardianName: Yup.string().required('Guardian Name is required'),
    addictionType: Yup.string().required('Addiction Type is required'),
    addictionDuration: Yup.number().required('Addiction Duration is required'),
    durationOfTreatment: Yup.number().required('Duration of Treatment is required'),
    // isTreatmentCompleted: Yup.boolean().required('Is Treatment Completed is required'),
    // underTreatment: Yup.boolean().required('Under Treatment is required'),
    employmentStatus: Yup.string().required('Employment Status is required'),
    // nashaMuktiCentreName: Yup.string().required('Nasha Mukti Centre Name is required'),
    // nashaMuktiCentreAddress: Yup.string().required('Nasha Mukti Centre Address is required'),
    // nashaMuktiCentreCode: Yup.string().required('Nasha Mukti Centre Code is required'),
    joiningDate: Yup.string().required('Joining Date is required'),
    counsellingCount: Yup.string().required('Counselling Count is required'),
    counsellorName: Yup.string().required('Counsellor Name is required'),
    // Add more fields as needed
})











const UserRegisteration = ({ dialogIsOpen, setIsOpen }) => {

    const submit = () => {

        console.log('submitted')
    }


    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    // const onDialogOk = (e: MouseEvent) => {
    //     console.log('onDialogOk', e)
    //     setIsOpen(false)
    // }


    return (


        <>
            {/* <Button variant="solid" onClick={() => openDialog()}>
                Custom Size Dialog
            </Button> */}
            <Dialog
                isOpen={dialogIsOpen}
                width={800}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}


            >
                <div className="h-[70vh]  overflow-x-auto mt-10" style={{ scrollbarWidth: "none" }}>
                    <Alert showIcon className="mb-4" >
                        Please be patient, this page is under development
                    </Alert>
                    <Formik
                        const initialValues={{

                            name: '',
                            age: '',
                            gender: '',
                            state: '',
                            district: '',
                            guardianName: '',
                            addictionType: '',
                            addictionDuration: '',
                            durationOfTreatment: 0,
                            // isTreatmentCompleted: false,
                            // underTreatment: true,
                            employmentStatus: '',
                            // nashaMuktiCentreName: 'Nasha Mukti Kendra_22',
                            // nashaMuktiCentreAddress: 'H.No. 657, Gill Zila, Ballia 760768',
                            // nashaMuktiCentreCode: 'NMK022',
                            joiningDate: Date.now(),
                            counsellingCount: '',
                            counsellorName: '',
                            // Add more fields as needed
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
                                                    placeholder="User Name"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </Grid>

                                        <Grid item xs={6} sm={6} style={{
                                            paddingTop: "0px"
                                        }}>
                                            <FormItem
                                                label="Age"
                                                invalid={errors.age && touched.age}
                                                errorMessage={errors.age}
                                            >
                                                <Field
                                                    type="number"
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
                                            {/* <FormItem
                                        label="Gender"
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
                                    </FormItem> */}
                                            <FormItem
                                                asterisk
                                                label="Select Gender"
                                                invalid={errors.gender && touched.gender}
                                                errorMessage={errors.gender}
                                            >
                                                <Field name="gender">
                                                    {({ field, form }: FieldProps<FormModel>) => (
                                                        <Select
                                                            field={field}
                                                            form={form}
                                                            options={genderOptions}
                                                            value={genderOptions.filter(
                                                                (option) =>
                                                                    option.value ===
                                                                    values.gender
                                                            )}
                                                            onChange={(option) =>
                                                                form.setFieldValue(
                                                                    "gender",
                                                                    option?.value
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                        </Grid>

                                        <Grid item xs={6} sm={6} style={{
                                            paddingTop: "0px"
                                        }}>
                                            {/* <FormItem
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
                                    </FormItem> */}
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
                                            paddingTop: "0px"
                                        }}>
                                            <FormItem
                                                label="Garurdian Name"
                                                invalid={errors.guardianName && touched.guardianName}
                                                errorMessage={errors.guardianName}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="guardianName"
                                                    placeholder="Garurdian Name"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </Grid>


                                        <Grid item xs={6} sm={6} style={{
                                            paddingTop: "0px"
                                        }}>
                                            <FormItem
                                                asterisk
                                                label="Select Addiction Type"
                                                invalid={errors.addictionType && touched.addictionType}
                                                errorMessage={errors.addictionType}
                                            >
                                                <Field name="addictionType">
                                                    {({ field, form }: FieldProps<FormModel>) => (
                                                        <Select
                                                            field={field}
                                                            form={form}
                                                            options={addictionTypeOptions}
                                                            value={addictionTypeOptions.filter(
                                                                (option) =>
                                                                    option.value ===
                                                                    values.addictionType
                                                            )}
                                                            onChange={(option) =>
                                                                form.setFieldValue(
                                                                    "addictionType",
                                                                    option?.value
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                        </Grid>

                                        <Grid item xs={6} sm={6} style={{
                                            paddingTop: "0px"
                                        }}>
                                            <FormItem
                                                label="Addiction Duration"
                                                invalid={errors.addictionDuration && touched.addictionDuration}
                                                errorMessage={errors.addictionDuration}
                                            >
                                                <Field
                                                    type="number"
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
                                                    type="number"
                                                    autoComplete="off"
                                                    name="durationOfTreatment"
                                                    placeholder="Duration of Treatment"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </Grid>

                                        {/* <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
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
                                </Grid> */}

                                        {/* <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
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
                                </Grid> */}

                                        <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                            <FormItem
                                                asterisk
                                                label="Employment Status"
                                                invalid={errors.employmentStatus && touched.employmentStatus}
                                                errorMessage={errors.employmentStatus}
                                            >
                                                <Field name="employmentStatus">
                                                    {({ field, form }: FieldProps<FormModel>) => (
                                                        <Select
                                                            field={field}
                                                            form={form}
                                                            options={employmentOptions}
                                                            value={employmentOptions.filter(
                                                                (option) =>
                                                                    option.value ===
                                                                    values.employmentStatus
                                                            )}
                                                            onChange={(option) =>
                                                                form.setFieldValue(
                                                                    "employmentStatus",
                                                                    option?.value
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                        </Grid>

                                        {/* <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
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
                                </Grid> */}

                                        {/* <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
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
                                </Grid> */}

                                        {/* <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
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
                                </Grid> */}

                                        <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                            {/* <FormItem
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
                                    </FormItem> */}
                                            <FormItem
                                                asterisk
                                                label="Joining Date"
                                                invalid={errors.joiningDate && touched.joiningDate}
                                                errorMessage={errors.joiningDate}
                                            >
                                                <Field name="joiningDate" placeholder="Date">
                                                    {({ field, form }: FieldProps<FormModel>) => (
                                                        <DatePicker
                                                            field={field}
                                                            form={form}
                                                            value={new Date(values.joiningDate)} // Convert string to Date object
                                                            onChange={(date) => {
                                                                form.setFieldValue(
                                                                    "joiningDate",
                                                                    date
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                        </Grid>

                                        <Grid item xs={6} sm={6} style={{ paddingTop: "0px" }}>
                                            <FormItem
                                                label="Counsellor Name"
                                                invalid={errors.counsellorName && touched.counsellorName}
                                                errorMessage={errors.counsellorName}
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
                                                invalid={errors.counsellingCount && touched.counsellingCount}
                                                errorMessage={errors.counsellingCount}
                                            >
                                                <Field
                                                    type="number"
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
            </Dialog >
        </>
    )
}

export default UserRegisteration;