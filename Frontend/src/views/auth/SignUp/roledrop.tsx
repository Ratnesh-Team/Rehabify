import React from 'react'
import Select from '@/components/ui/Select'
import { FieldProps } from 'formik'

interface RoleDropProps extends FieldProps {
    Options: { value: string; label: string }[]
}

const RoleDrop = ({ field, form, Options }: RoleDropProps) => {
    const { name, value } = field
    const { setFieldValue } = form

    const handleChange = (selectedOption: { value: string; label: string }) => {
        setFieldValue(name, selectedOption.value)
    }

    return (
        <Select
            {...field}
            value={value}
            onChange={handleChange}
            options={Options}
            placeholder="Select a Role"
    ></Select>
    )
}

export default RoleDrop
