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
    setSubmittingCenter(true)
    setStatusMessage('')

    try {
      const payload = {
        Name: registerForm.name,
        Address: registerForm.address,
        Owner_Name: registerForm.ownerName,
        Contact_Number: Number.parseInt(registerForm.contactNumber, 10),
        Email: email,
        ImageURL: registerForm.imageUrl,
        State: registerForm.state,
        District: registerForm.district,
        Pincode: Number.parseInt(registerForm.pinCode, 10),
        IsVerified: false,
        Established_Year: Number.parseInt(registerForm.yearOfRegistration, 10),
        NMK_Verification_Image: registerForm.verificationImageUrl,
      }

      const response = await fetch('/api/addNmk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        setStatusMessage(result.message || 'Failed to register NMK')
        return
      }

      setRegisterForm(initialRegistrationForm)
      setStatusMessage('NMK registered successfully. Verification is pending.')
      await loadStatus()
    } finally {
      setSubmittingCenter(false)
    }
  }

  const onAddPatient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!center) {
      return
    }

    setSubmittingPatient(true)
    setStatusMessage('')

    try {
      const payload = {
        Name: patientForm.name,
        Age: Number.parseInt(patientForm.age, 10),
        Gender: patientForm.gender,
        State: patientForm.state,
        District: patientForm.district,
        Guardian_Name: patientForm.guardianName,
        Addiction_Type: patientForm.addictionType,
        Addiction_Duration: Number.parseInt(patientForm.addictionDuration, 10),
        'Duration_of-Treatment': Number.parseInt(patientForm.durationOfTreatment, 10),
        Is_Treatment_Completed: false,
        Under_Treatment: true,
        Employment_Status: Number.parseInt(patientForm.employmentStatus, 10),
        Nasha_Mukti_Centre_Name: center.Name,
        Nasha_Mukti_Centre_Address: center.Address,
        Nasha_Mukti_Centre_Code: center._id,
        Joining_Date: patientForm.joiningDate,
        Counselling_Count: Number.parseInt(patientForm.counsellingCount, 10),
        Counsellor_Name: patientForm.counsellorName,
      }

      const response = await fetch('/api/addPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        setStatusMessage(result.message || 'Failed to add patient')
        return
      }

      setPatientForm(initialPatientForm)
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
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {statusMessage}
        </div>
      ) : null}

      {mode === 'loading' ? <p className="text-sm text-neutral-600">Loading registration status...</p> : null}

      {mode === 'register' ? (
        <form onSubmit={onRegisterCenter} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-neutral-900">Register for NMK</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              required
              value={registerForm.name}
              onChange={event => onCenterFieldChange('name', event.target.value)}
              placeholder="NMK Name"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={registerForm.ownerName}
              onChange={event => onCenterFieldChange('ownerName', event.target.value)}
              placeholder="Owner Name"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={registerForm.address}
              onChange={event => onCenterFieldChange('address', event.target.value)}
              placeholder="Address"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm md:col-span-2"
            />
            <input
              required
              value={registerForm.contactNumber}
              onChange={event => onCenterFieldChange('contactNumber', event.target.value)}
              placeholder="Contact Number"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={registerForm.state}
              onChange={event => onCenterFieldChange('state', event.target.value)}
              placeholder="State"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={registerForm.district}
              onChange={event => onCenterFieldChange('district', event.target.value)}
              placeholder="District"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={registerForm.pinCode}
              onChange={event => onCenterFieldChange('pinCode', event.target.value)}
              placeholder="Pincode"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              required
              value={registerForm.yearOfRegistration}
              onChange={event => onCenterFieldChange('yearOfRegistration', event.target.value)}
              placeholder="Established Year"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              value={registerForm.imageUrl}
              onChange={event => onCenterFieldChange('imageUrl', event.target.value)}
              placeholder="Center Image URL"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm"
            />
            <input
              value={registerForm.verificationImageUrl}
              onChange={event => onCenterFieldChange('verificationImageUrl', event.target.value)}
              placeholder="Verification Document URL"
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

          <form onSubmit={onAddPatient} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-600">Add User</h3>
            <div className="grid gap-3 md:grid-cols-4">
              <input
                required
                value={patientForm.name}
                onChange={event => onPatientFieldChange('name', event.target.value)}
                placeholder="Name"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.age}
                onChange={event => onPatientFieldChange('age', event.target.value)}
                placeholder="Age"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.gender}
                onChange={event => onPatientFieldChange('gender', event.target.value)}
                placeholder="Gender"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.state}
                onChange={event => onPatientFieldChange('state', event.target.value)}
                placeholder="State"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.district}
                onChange={event => onPatientFieldChange('district', event.target.value)}
                placeholder="District"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.guardianName}
                onChange={event => onPatientFieldChange('guardianName', event.target.value)}
                placeholder="Guardian Name"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.addictionType}
                onChange={event => onPatientFieldChange('addictionType', event.target.value)}
                placeholder="Addiction Type"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.addictionDuration}
                onChange={event => onPatientFieldChange('addictionDuration', event.target.value)}
                placeholder="Addiction Duration"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.durationOfTreatment}
                onChange={event => onPatientFieldChange('durationOfTreatment', event.target.value)}
                placeholder="Duration Of Treatment"
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
              <input
                required
                type="date"
                value={patientForm.joiningDate}
                onChange={event => onPatientFieldChange('joiningDate', event.target.value)}
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
                value={patientForm.counsellingCount}
                onChange={event => onPatientFieldChange('counsellingCount', event.target.value)}
                placeholder="Counselling Count"
                className="rounded-md border border-orange-200 px-3 py-2 text-sm"
              />
              <input
                required
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
