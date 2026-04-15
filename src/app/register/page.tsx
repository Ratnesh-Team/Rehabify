'use client'

import { AppShell } from '@/components/shell/AppShell'
import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'

type Center = {
  _id: string
  Name: string
  Address: string
  Owner_Name: string
  Contact_Number?: number
  Email?: string
  State?: string
  District?: string
  Pincode?: number
  Established_Year?: number
  IsVerified: boolean
  ImageURL?: string
  NMK_Verification_Image?: string
}

type Patient = {
  _id: string
  Name: string
  Age?: number
  Gender: string
  State: string
  District?: string
  Guardian_Name?: string
  Addiction_Type: string
  Addiction_Duration?: number
  'Duration_of-Treatment'?: number
  Employment_Status: number
  Joining_Date: string
  Counselling_Count?: number
  Counsellor_Name?: string
}

type RegistrationForm = {
  name: string
  address: string
  ownerName: string
  contactNumber: string
  state: string
  district: string
  pinCode: string
  yearOfRegistration: string
  imageUrl: string
  verificationImageUrl: string
}

type PatientForm = {
  name: string
  age: string
  gender: string
  state: string
  district: string
  guardianName: string
  addictionType: string
  addictionDuration: string
  durationOfTreatment: string
  employmentStatus: string
  joiningDate: string
  counsellingCount: string
  counsellorName: string
}

const initialRegistrationForm: RegistrationForm = {
  name: '',
  address: '',
  ownerName: '',
  contactNumber: '',
  state: '',
  district: '',
  pinCode: '',
  yearOfRegistration: '',
  imageUrl: '',
  verificationImageUrl: '',
}

const initialPatientForm: PatientForm = {
  name: '',
  age: '',
  gender: '',
  state: '',
  district: '',
  guardianName: '',
  addictionType: '',
  addictionDuration: '',
  durationOfTreatment: '',
  employmentStatus: '1',
  joiningDate: '',
  counsellingCount: '',
  counsellorName: '',
}

export default function RegisterPage() {
  const [mode, setMode] = useState<'loading' | 'register' | 'pending' | 'manage'>('loading')
  const [email, setEmail] = useState('')
  const [center, setCenter] = useState<Center | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState('')

  const [registerForm, setRegisterForm] = useState<RegistrationForm>(initialRegistrationForm)
  const [patientForm, setPatientForm] = useState<PatientForm>(initialPatientForm)

  const [submittingCenter, setSubmittingCenter] = useState(false)
  const [submittingPatient, setSubmittingPatient] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info')
  const [centerErrors, setCenterErrors] = useState<Partial<RegistrationForm>>({})
  const [patientErrors, setPatientErrors] = useState<Partial<PatientForm>>({})

  const validateCenterForm = (): boolean => {
    const errors: Partial<RegistrationForm> = {}
    if (!registerForm.name.trim()) errors.name = 'required'
    if (!registerForm.address.trim()) errors.address = 'required'
    if (!registerForm.ownerName.trim()) errors.ownerName = 'required'
    if (!registerForm.contactNumber.trim()) {
      errors.contactNumber = 'required'
    } else if (!/^\d{7,15}$/.test(registerForm.contactNumber.replace(/\s/g, ''))) {
      errors.contactNumber = 'must be 7-15 digits'
    }
    if (!registerForm.state.trim()) errors.state = 'required'
    if (!registerForm.district.trim()) errors.district = 'required'
    if (!registerForm.pinCode.trim()) {
      errors.pinCode = 'required'
    } else if (!/^\d{6}$/.test(registerForm.pinCode.trim())) {
      errors.pinCode = 'must be 6 digits'
    }
    if (!registerForm.yearOfRegistration.trim()) {
      errors.yearOfRegistration = 'required'
    } else {
      const year = Number(registerForm.yearOfRegistration)
      if (Number.isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        errors.yearOfRegistration = 'invalid year'
      }
    }
    setCenterErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePatientForm = (): boolean => {
    const errors: Partial<PatientForm> = {}
    if (!patientForm.name.trim()) errors.name = 'required'
    if (!patientForm.age.trim()) {
      errors.age = 'required'
    } else {
      const age = Number(patientForm.age)
      if (Number.isNaN(age) || age < 0 || age > 120) errors.age = 'invalid age'
    }
    if (!patientForm.gender.trim()) errors.gender = 'required'
    if (!patientForm.state.trim()) errors.state = 'required'
    if (!patientForm.addictionType.trim()) errors.addictionType = 'required'
    if (!patientForm.joiningDate) errors.joiningDate = 'required'
    setPatientErrors(errors)
    return Object.keys(errors).length === 0
  }

  const loadStatus = async () => {
    setMode('loading')
    setStatusMessage('')

    const meResponse = await fetch('/api/me')
    const meResult = await meResponse.json()

    if (!meResponse.ok || !meResult?.data?.email) {
      setMode('register')
      return
    }

    const currentEmail = meResult.data.email as string
    setEmail(currentEmail)

    const centerResponse = await fetch(`/api/nmk?email=${encodeURIComponent(currentEmail)}`)
    const centerResult = await centerResponse.json()

    if (!centerResponse.ok) {
      setMode('register')
      return
    }

    const centerData: Center[] = centerResult.data ?? []
    if (centerData.length === 0) {
      setCenter(null)
      setMode('register')
      return
    }

    const selectedCenter = centerData[0]
    setCenter(selectedCenter)

    if (!selectedCenter.IsVerified) {
      setMode('pending')
      return
    }

    setMode('manage')

    const usersResponse = await fetch(`/api/users?NMK_Code=${encodeURIComponent(selectedCenter._id)}`)
    const usersResult = await usersResponse.json()
    if (usersResponse.ok) {
      setPatients(usersResult.data ?? [])
    } else {
      setPatients([])
    }
  }

  useEffect(() => {
    void loadStatus()
  }, [])

  const onCenterFieldChange = <K extends keyof RegistrationForm>(
    key: K,
    value: RegistrationForm[K]
  ) => {
    setRegisterForm(previous => ({ ...previous, [key]: value }))
  }

  const onPatientFieldChange = <K extends keyof PatientForm>(key: K, value: PatientForm[K]) => {
    setPatientForm(previous => ({ ...previous, [key]: value }))
  }

  const onRegisterCenter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage('')

    if (!validateCenterForm()) return

    setSubmittingCenter(true)
    try {
      const payload = {
        Name: registerForm.name.trim(),
        Address: registerForm.address.trim(),
        Owner_Name: registerForm.ownerName.trim(),
        Contact_Number: Number.parseInt(registerForm.contactNumber, 10),
        Email: email,
        ImageURL: registerForm.imageUrl || undefined,
        State: registerForm.state.trim(),
        District: registerForm.district.trim(),
        Pincode: Number.parseInt(registerForm.pinCode, 10),
        Established_Year: Number.parseInt(registerForm.yearOfRegistration, 10),
        NMK_Verification_Image: registerForm.verificationImageUrl || undefined,
      }

      const response = await fetch('/api/nmk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        setStatusMessage(result.message || result.error || 'Failed to register NMK')
        setStatusType('error')
        return
      }

      setRegisterForm(initialRegistrationForm)
      setCenterErrors({})
      setStatusMessage('NMK registered. Verification pending (2-5 business days).')
      setStatusType('success')
      await loadStatus()
    } finally {
      setSubmittingCenter(false)
    }
  }

  const onAddPatient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!center) return

    setStatusMessage('')
    if (!validatePatientForm()) return

    setSubmittingPatient(true)
    try {
      const payload = {
        Name: patientForm.name.trim(),
        Age: Number.parseInt(patientForm.age, 10),
        Gender: patientForm.gender,
        State: patientForm.state.trim(),
        District: patientForm.district.trim() || undefined,
        Guardian_Name: patientForm.guardianName.trim() || undefined,
        Addiction_Type: patientForm.addictionType.trim(),
        Addiction_Duration: patientForm.addictionDuration ? Number.parseInt(patientForm.addictionDuration, 10) : 0,
        'Duration_of-Treatment': patientForm.durationOfTreatment ? Number.parseInt(patientForm.durationOfTreatment, 10) : 0,
        Is_Treatment_Completed: false,
        Under_Treatment: true,
        Employment_Status: Number.parseInt(patientForm.employmentStatus, 10),
        Nasha_Mukti_Centre_Name: center.Name,
        Nasha_Mukti_Centre_Address: center.Address,
        Nasha_Mukti_Centre_Code: center._id,
        Joining_Date: patientForm.joiningDate,
        Counselling_Count: patientForm.counsellingCount ? Number.parseInt(patientForm.counsellingCount, 10) : 0,
        Counsellor_Name: patientForm.counsellorName.trim() || undefined,
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        setStatusMessage(result.message || result.error || 'Failed to add patient')
        setStatusType('error')
        return
      }

      setPatientForm(initialPatientForm)
      setPatientErrors({})
      setStatusMessage('Patient added successfully.')
      setStatusType('success')
      await loadStatus()
    } finally {
      setSubmittingPatient(false)
    }
  }

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return patients
    }

    return patients.filter(patient => {
      return (
        patient.Name.toLowerCase().includes(query) ||
        patient.Gender.toLowerCase().includes(query) ||
        patient.State.toLowerCase().includes(query) ||
        patient.Addiction_Type.toLowerCase().includes(query) ||
        (patient.District ?? '').toLowerCase().includes(query)
      )
    })
  }, [patients, search])

  return (
    <AppShell
      title="Manage NMK"
      subtitle="Register your center, track approval status, and manage patients."
    >
      {statusMessage ? (
        <div className={`mb-4 rounded-md border px-4 py-3 text-sm ${
          statusType === 'error'
            ? 'border-red-200 bg-red-50 text-red-800'
            : statusType === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-amber-200 bg-amber-50 text-amber-900'
        }`}>
          {statusMessage}
        </div>
      ) : null}

      {mode === 'loading' ? <p className="text-sm text-neutral-600">Loading registration status...</p> : null}

      {mode === 'register' ? (
        <form onSubmit={onRegisterCenter} noValidate className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-neutral-900">Register Nasha Mukti Kendra</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <input
                value={registerForm.name}
                onChange={event => { onCenterFieldChange('name', event.target.value); setCenterErrors(p => ({...p, name: undefined})) }}
                placeholder="NMK Name *"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.name ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
              />
              {centerErrors.name ? <p className="mt-0.5 text-xs text-red-600">Name {centerErrors.name}</p> : null}
            </div>
            <div>
              <input
                value={registerForm.ownerName}
                onChange={event => { onCenterFieldChange('ownerName', event.target.value); setCenterErrors(p => ({...p, ownerName: undefined})) }}
                placeholder="Owner Name *"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.ownerName ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
              />
              {centerErrors.ownerName ? <p className="mt-0.5 text-xs text-red-600">Owner name {centerErrors.ownerName}</p> : null}
            </div>
            <div className="md:col-span-2">
              <input
                value={registerForm.address}
                onChange={event => { onCenterFieldChange('address', event.target.value); setCenterErrors(p => ({...p, address: undefined})) }}
                placeholder="Full Address *"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.address ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
              />
              {centerErrors.address ? <p className="mt-0.5 text-xs text-red-600">Address {centerErrors.address}</p> : null}
            </div>
            <div>
              <input
                value={registerForm.contactNumber}
                onChange={event => { onCenterFieldChange('contactNumber', event.target.value.replace(/\D/g, '')); setCenterErrors(p => ({...p, contactNumber: undefined})) }}
                placeholder="Contact Number * (digits only)"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.contactNumber ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
                inputMode="numeric"
              />
              {centerErrors.contactNumber ? <p className="mt-0.5 text-xs text-red-600">Contact {centerErrors.contactNumber}</p> : null}
            </div>
            <div>
              <input
                value={registerForm.state}
                onChange={event => { onCenterFieldChange('state', event.target.value); setCenterErrors(p => ({...p, state: undefined})) }}
                placeholder="State *"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.state ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
              />
              {centerErrors.state ? <p className="mt-0.5 text-xs text-red-600">State {centerErrors.state}</p> : null}
            </div>
            <div>
              <input
                value={registerForm.district}
                onChange={event => { onCenterFieldChange('district', event.target.value); setCenterErrors(p => ({...p, district: undefined})) }}
                placeholder="District *"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.district ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
              />
              {centerErrors.district ? <p className="mt-0.5 text-xs text-red-600">District {centerErrors.district}</p> : null}
            </div>
            <div>
              <input
                value={registerForm.pinCode}
                onChange={event => { onCenterFieldChange('pinCode', event.target.value.replace(/\D/g, '')); setCenterErrors(p => ({...p, pinCode: undefined})) }}
                placeholder="Pincode * (6 digits)"
                maxLength={6}
                inputMode="numeric"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.pinCode ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
              />
              {centerErrors.pinCode ? <p className="mt-0.5 text-xs text-red-600">Pincode {centerErrors.pinCode}</p> : null}
            </div>
            <div>
              <input
                value={registerForm.yearOfRegistration}
                onChange={event => { onCenterFieldChange('yearOfRegistration', event.target.value.replace(/\D/g, '')); setCenterErrors(p => ({...p, yearOfRegistration: undefined})) }}
                placeholder={`Established Year * (e.g. 2010)`}
                maxLength={4}
                inputMode="numeric"
                className={`w-full rounded-md border px-3 py-2 text-sm ${centerErrors.yearOfRegistration ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
              />
              {centerErrors.yearOfRegistration ? <p className="mt-0.5 text-xs text-red-600">Year {centerErrors.yearOfRegistration}</p> : null}
            </div>
            <input
              value={registerForm.imageUrl}
              onChange={event => onCenterFieldChange('imageUrl', event.target.value)}
              placeholder="Center Image URL (optional)"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              value={registerForm.verificationImageUrl}
              onChange={event => onCenterFieldChange('verificationImageUrl', event.target.value)}
              placeholder="Verification Document URL (optional)"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submittingCenter}
            className="mt-4 rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#da4d00] disabled:opacity-60"
          >
            {submittingCenter ? 'Registering...' : 'Register NMK'}
          </button>
        </form>
      ) : null}

      {mode === 'pending' ? (
        <div className="rounded-xl border border-orange-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-neutral-900">Data verification in progress</p>
          <p className="mt-3 text-sm text-neutral-600">We are verifying your Nasha Mukti Kendra details.</p>
          <p className="mt-2 text-sm text-neutral-600">Usually it takes 2 to 5 days.</p>

          <Link
            href="/register/approval"
            className="mt-6 inline-flex rounded-full bg-[#f75700] px-6 py-3 text-sm font-semibold text-white hover:bg-[#da4d00]"
          >
            View Approval Status
          </Link>
        </div>
      ) : null}

      {mode === 'manage' && center ? (
        <div className="space-y-5">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid md:grid-cols-2">
              <div className="h-56 bg-slate-100">
                {center.ImageURL ? (
                  <div
                    role="img"
                    aria-label={center.Name}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${center.ImageURL})` }}
                  />
                ) : null}
              </div>
              <div className="space-y-1 p-5 text-sm text-neutral-700">
                <h3 className="text-xl font-bold text-cyan-600">{center.Name}</h3>
                <p>{center.Address}</p>
                <p>{center.Owner_Name}</p>
                <p>{center.Email ?? 'N/A'}</p>
                <p>{center.Contact_Number ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          <form onSubmit={onAddPatient} noValidate className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-600">Add Patient</h3>
            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <input
                  value={patientForm.name}
                  onChange={event => { onPatientFieldChange('name', event.target.value); setPatientErrors(p => ({...p, name: undefined})) }}
                  placeholder="Name *"
                  className={`w-full rounded-md border px-3 py-2 text-sm ${patientErrors.name ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
                />
                {patientErrors.name ? <p className="mt-0.5 text-xs text-red-600">Name {patientErrors.name}</p> : null}
              </div>
              <div>
                <input
                  value={patientForm.age}
                  onChange={event => { onPatientFieldChange('age', event.target.value.replace(/\D/g, '')); setPatientErrors(p => ({...p, age: undefined})) }}
                  placeholder="Age *"
                  inputMode="numeric"
                  maxLength={3}
                  className={`w-full rounded-md border px-3 py-2 text-sm ${patientErrors.age ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
                />
                {patientErrors.age ? <p className="mt-0.5 text-xs text-red-600">Age {patientErrors.age}</p> : null}
              </div>
              <div>
                <select
                  value={patientForm.gender}
                  onChange={event => { onPatientFieldChange('gender', event.target.value); setPatientErrors(p => ({...p, gender: undefined})) }}
                  className={`w-full rounded-md border px-3 py-2 text-sm ${patientErrors.gender ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
                >
                  <option value="">Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {patientErrors.gender ? <p className="mt-0.5 text-xs text-red-600">Gender {patientErrors.gender}</p> : null}
              </div>
              <div>
                <input
                  value={patientForm.state}
                  onChange={event => { onPatientFieldChange('state', event.target.value); setPatientErrors(p => ({...p, state: undefined})) }}
                  placeholder="State *"
                  className={`w-full rounded-md border px-3 py-2 text-sm ${patientErrors.state ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
                />
                {patientErrors.state ? <p className="mt-0.5 text-xs text-red-600">State {patientErrors.state}</p> : null}
              </div>
              <input
                value={patientForm.district}
                onChange={event => onPatientFieldChange('district', event.target.value)}
                placeholder="District"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                value={patientForm.guardianName}
                onChange={event => onPatientFieldChange('guardianName', event.target.value)}
                placeholder="Guardian Name"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <div>
                <input
                  value={patientForm.addictionType}
                  onChange={event => { onPatientFieldChange('addictionType', event.target.value); setPatientErrors(p => ({...p, addictionType: undefined})) }}
                  placeholder="Addiction Type *"
                  className={`w-full rounded-md border px-3 py-2 text-sm ${patientErrors.addictionType ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
                />
                {patientErrors.addictionType ? <p className="mt-0.5 text-xs text-red-600">Addiction type {patientErrors.addictionType}</p> : null}
              </div>
              <input
                value={patientForm.addictionDuration}
                onChange={event => onPatientFieldChange('addictionDuration', event.target.value.replace(/\D/g, ''))}
                placeholder="Addiction Duration (months)"
                inputMode="numeric"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                value={patientForm.durationOfTreatment}
                onChange={event => onPatientFieldChange('durationOfTreatment', event.target.value.replace(/\D/g, ''))}
                placeholder="Treatment Duration (months)"
                inputMode="numeric"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <select
                value={patientForm.employmentStatus}
                onChange={event => onPatientFieldChange('employmentStatus', event.target.value)}
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              >
                <option value="1">Employed</option>
                <option value="0">Unemployed</option>
              </select>
              <div>
                <label className="mb-0.5 block text-xs text-neutral-500">Joining Date *</label>
                <input
                  type="date"
                  value={patientForm.joiningDate}
                  onChange={event => { onPatientFieldChange('joiningDate', event.target.value); setPatientErrors(p => ({...p, joiningDate: undefined})) }}
                  className={`w-full rounded-md border px-3 py-2 text-sm ${patientErrors.joiningDate ? 'border-red-400 bg-red-50' : 'border-orange-200'}`}
                />
                {patientErrors.joiningDate ? <p className="mt-0.5 text-xs text-red-600">Joining date {patientErrors.joiningDate}</p> : null}
              </div>
              <input
                value={patientForm.counsellingCount}
                onChange={event => onPatientFieldChange('counsellingCount', event.target.value.replace(/\D/g, ''))}
                placeholder="Counselling Count"
                inputMode="numeric"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                value={patientForm.counsellorName}
                onChange={event => onPatientFieldChange('counsellorName', event.target.value)}
                placeholder="Counsellor Name"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={submittingPatient}
              className="mt-4 rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#da4d00] disabled:opacity-60"
            >
              {submittingPatient ? 'Saving...' : 'Add Patient'}
            </button>
          </form>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Nasha Mukti Kendra Patient</h3>
              <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search..."
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-neutral-700">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Age</th>
                    <th className="px-3 py-2">Gender</th>
                    <th className="px-3 py-2">State</th>
                    <th className="px-3 py-2">District</th>
                    <th className="px-3 py-2">Addiction Type</th>
                    <th className="px-3 py-2">Joining Date</th>
                    <th className="px-3 py-2">Employment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map(patient => (
                    <tr key={patient._id} className="border-t border-slate-100">
                      <td className="px-3 py-2">{patient.Name}</td>
                      <td className="px-3 py-2">{patient.Age ?? '-'}</td>
                      <td className="px-3 py-2">{patient.Gender}</td>
                      <td className="px-3 py-2">{patient.State}</td>
                      <td className="px-3 py-2">{patient.District ?? '-'}</td>
                      <td className="px-3 py-2">{patient.Addiction_Type}</td>
                      <td className="px-3 py-2">{patient.Joining_Date}</td>
                      <td className="px-3 py-2">
                        {patient.Employment_Status === 1 ? 'Employed' : 'Unemployed'}
                      </td>
                    </tr>
                  ))}

                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-3 py-6 text-center text-neutral-600">
                        Patients not yet registered.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  )
}
