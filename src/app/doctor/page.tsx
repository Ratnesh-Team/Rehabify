'use client'

import { AppShell } from '@/components/shell/AppShell'
import { FormEvent, useEffect, useMemo, useState } from 'react'

type Doctor = {
  _id: string
  Name: string
  Description?: string
  Specialization: string
  ClinicAddress?: string
  ContactNumber?: number | string
  Email: string
  ImageURL?: string
}

type AppointmentForm = {
  name: string
  contactNumber: string
  email: string
  appointmentDate: string
  appointmentTime: string
}

type RegisterDoctorForm = {
  Name: string
  Description: string
  Specialization: string
  ClinicAddress: string
  ContactNumber: string
  Email: string
  ImageURL: string
}

const initialAppointmentForm: AppointmentForm = {
  name: '',
  contactNumber: '',
  email: '',
  appointmentDate: '',
  appointmentTime: '',
}

const initialDoctorForm: RegisterDoctorForm = {
  Name: '',
  Description: '',
  Specialization: '',
  ClinicAddress: '',
  ContactNumber: '',
  Email: '',
  ImageURL: '',
}

function normalizeDigits(value: string | number | undefined) {
  return String(value ?? '').replace(/\D/g, '')
}

export default function DoctorPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [items, setItems] = useState<Doctor[]>([])
  const [query, setQuery] = useState('')

  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [doctorForm, setDoctorForm] = useState<RegisterDoctorForm>(initialDoctorForm)

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>(initialAppointmentForm)
  const [appointmentErrors, setAppointmentErrors] = useState<Partial<AppointmentForm>>({})

  const load = async () => {
    try {
      const response = await fetch('/api/doctors')
      const result = await response.json()

      if (response.ok) {
        setItems(result.data ?? [])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const filteredItems = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) {
      return items
    }

    return items.filter(doctor => {
      const contact = String(doctor.ContactNumber ?? '').toLowerCase()
      return (
        doctor.Name.toLowerCase().includes(search) ||
        doctor.Specialization.toLowerCase().includes(search) ||
        doctor.Email.toLowerCase().includes(search) ||
        (doctor.ClinicAddress ?? '').toLowerCase().includes(search) ||
        contact.includes(search)
      )
    })
  }, [items, query])

  const handleDoctorFieldChange = <K extends keyof RegisterDoctorForm>(
    key: K,
    value: RegisterDoctorForm[K]
  ) => {
    setDoctorForm(current => ({ ...current, [key]: value }))
  }

  const [doctorFormErrors, setDoctorFormErrors] = useState<Partial<RegisterDoctorForm>>({})
  const [doctorFormServerError, setDoctorFormServerError] = useState('')

  const validateDoctorForm = () => {
    const errors: Partial<RegisterDoctorForm> = {}
    if (!doctorForm.Name.trim()) errors.Name = 'required'
    if (!doctorForm.Specialization.trim()) errors.Specialization = 'required'
    if (!doctorForm.Email.trim()) {
      errors.Email = 'required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doctorForm.Email)) {
      errors.Email = 'invalid email'
    }
    if (doctorForm.ContactNumber && !/^\d{7,15}$/.test(doctorForm.ContactNumber.replace(/\s/g, ''))) {
      errors.ContactNumber = 'invalid number'
    }
    setDoctorFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddDoctor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDoctorFormServerError('')

    if (!validateDoctorForm()) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...doctorForm,
          ContactNumber: doctorForm.ContactNumber ? Number.parseInt(doctorForm.ContactNumber, 10) : undefined,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        setDoctorFormServerError(result.message || result.error || 'Failed to register doctor')
        return
      }

      setDoctorForm(initialDoctorForm)
      setDoctorFormErrors({})
      setShowRegisterForm(false)
      await load()
    } finally {
      setSubmitting(false)
    }
  }

  const handleAppointmentFieldChange = <K extends keyof AppointmentForm>(
    key: K,
    value: AppointmentForm[K]
  ) => {
    setAppointmentForm(current => ({ ...current, [key]: value }))
    setAppointmentErrors(current => ({ ...current, [key]: '' }))
  }

  const validateAppointmentForm = () => {
    const errors: Partial<AppointmentForm> = {}

    if (!appointmentForm.name.trim()) {
      errors.name = 'required'
    }

    if (!appointmentForm.contactNumber.trim()) {
      errors.contactNumber = 'required'
    }

    if (!appointmentForm.email.trim()) {
      errors.email = 'required'
    }

    if (appointmentForm.email && !/\S+@\S+\.\S+/.test(appointmentForm.email)) {
      errors.email = 'invalid email'
    }

    if (!appointmentForm.appointmentDate) {
      errors.appointmentDate = 'required'
    }

    if (!appointmentForm.appointmentTime) {
      errors.appointmentTime = 'required'
    }

    setAppointmentErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAppointmentSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!validateAppointmentForm()) {
      return
    }

    window.alert('Appointment booked successfully')
    setShowAppointmentForm(false)
    setAppointmentForm(initialAppointmentForm)
  }

  const closeDoctorDialog = () => {
    setSelectedDoctor(null)
    setShowAppointmentForm(false)
    setAppointmentForm(initialAppointmentForm)
    setAppointmentErrors({})
  }

  return (
    <AppShell title="Doctor Appointment" subtitle="Search doctors and register new doctor profiles.">
      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-black text-neutral-900">Doctor Appointment</h2>
          <button
            type="button"
            onClick={() => setShowRegisterForm(true)}
            className="rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00]"
          >
            Register Doctor
          </button>
        </div>

        <div className="flex justify-end">
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search..."
            className="w-full max-w-xs rounded-md border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
        </div>

        {loading ? <p className="text-sm text-neutral-600">Loading doctors...</p> : null}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(doctor => (
            <article
              key={doctor._id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedDoctor(doctor)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setSelectedDoctor(doctor)
                }
              }}
              className="cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="h-56 bg-slate-100">
                {doctor.ImageURL ? (
                  <div
                    role="img"
                    aria-label={doctor.Name}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${doctor.ImageURL})` }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">Doctor Photo</div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-lg font-bold text-emerald-700">{doctor.Name}</h3>
                <p className="text-sm text-neutral-700">{doctor.Specialization}</p>
                <p className="line-clamp-1 text-sm text-neutral-600">{doctor.ClinicAddress ?? 'Address not available'}</p>
              </div>
            </article>
          ))}
        </div>

        {!loading && filteredItems.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-neutral-600 shadow-sm">
            No doctors matched your search.
          </div>
        ) : null}
      </section>

      {showRegisterForm ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-neutral-900">Doctor Registration</h3>
              <button
                type="button"
                onClick={() => setShowRegisterForm(false)}
                className="rounded-md border border-slate-300 px-2 py-1 text-sm"
              >
                Close
              </button>
            </div>

            {doctorFormServerError ? (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {doctorFormServerError}
              </div>
            ) : null}
            <form onSubmit={handleAddDoctor} noValidate className="grid gap-3 md:grid-cols-2">
              <div>
                <input
                  value={doctorForm.Name}
                  onChange={event => {
                    handleDoctorFieldChange('Name', event.target.value)
                    setDoctorFormErrors(p => ({ ...p, Name: undefined }))
                  }}
                  placeholder="Doctor name *"
                  className={`w-full rounded-md border px-3 py-2 text-sm ${doctorFormErrors.Name ? 'border-red-400 bg-red-50' : 'border-slate-300'}`}
                />
                {doctorFormErrors.Name ? <p className="mt-0.5 text-xs text-red-600">Name {doctorFormErrors.Name}</p> : null}
              </div>
              <div>
                <input
                  value={doctorForm.Specialization}
                  onChange={event => {
                    handleDoctorFieldChange('Specialization', event.target.value)
                    setDoctorFormErrors(p => ({ ...p, Specialization: undefined }))
                  }}
                  placeholder="Specialization *"
                  className={`w-full rounded-md border px-3 py-2 text-sm ${doctorFormErrors.Specialization ? 'border-red-400 bg-red-50' : 'border-slate-300'}`}
                />
                {doctorFormErrors.Specialization ? <p className="mt-0.5 text-xs text-red-600">Specialization {doctorFormErrors.Specialization}</p> : null}
              </div>
              <div>
                <input
                  value={doctorForm.Email}
                  onChange={event => {
                    handleDoctorFieldChange('Email', event.target.value)
                    setDoctorFormErrors(p => ({ ...p, Email: undefined }))
                  }}
                  placeholder="Email *"
                  type="email"
                  className={`w-full rounded-md border px-3 py-2 text-sm ${doctorFormErrors.Email ? 'border-red-400 bg-red-50' : 'border-slate-300'}`}
                />
                {doctorFormErrors.Email ? <p className="mt-0.5 text-xs text-red-600">Email {doctorFormErrors.Email}</p> : null}
              </div>
              <div>
                <input
                  value={doctorForm.ContactNumber}
                  onChange={event => {
                    handleDoctorFieldChange('ContactNumber', event.target.value)
                    setDoctorFormErrors(p => ({ ...p, ContactNumber: undefined }))
                  }}
                  placeholder="Contact number"
                  className={`w-full rounded-md border px-3 py-2 text-sm ${doctorFormErrors.ContactNumber ? 'border-red-400 bg-red-50' : 'border-slate-300'}`}
                />
                {doctorFormErrors.ContactNumber ? <p className="mt-0.5 text-xs text-red-600">Contact {doctorFormErrors.ContactNumber}</p> : null}
              </div>
              <input
                value={doctorForm.ClinicAddress}
                onChange={event => handleDoctorFieldChange('ClinicAddress', event.target.value)}
                placeholder="Clinic address"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
              />
              <textarea
                value={doctorForm.Description}
                onChange={event => handleDoctorFieldChange('Description', event.target.value)}
                placeholder="Description"
                className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
              />
              <input
                value={doctorForm.ImageURL}
                onChange={event => handleDoctorFieldChange('ImageURL', event.target.value)}
                placeholder="Doctor photo URL (https://...)"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
              />

              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00] disabled:opacity-60 md:col-span-2"
              >
                {submitting ? 'Submitting...' : 'Register Doctor'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {selectedDoctor ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={closeDoctorDialog}
                className="rounded-md border border-slate-300 px-2.5 py-1 text-sm"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-[240px_1fr]">
              <div className="h-60 overflow-hidden rounded-lg bg-slate-100 md:h-full">
                {selectedDoctor.ImageURL ? (
                  <div
                    role="img"
                    aria-label={selectedDoctor.Name}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedDoctor.ImageURL})` }}
                  />
                ) : null}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-neutral-900">{selectedDoctor.Name}</h3>
                <p className="text-sm text-neutral-700">Specialization: {selectedDoctor.Specialization}</p>
                <p className="text-sm text-neutral-700">Email: {selectedDoctor.Email}</p>
                <p className="text-sm text-neutral-700">Contact Number: {selectedDoctor.ContactNumber ?? 'N/A'}</p>
                <p className="text-sm font-semibold text-neutral-800">{selectedDoctor.Description}</p>
                <p className="text-sm text-neutral-700">Address: {selectedDoctor.ClinicAddress ?? 'N/A'}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowAppointmentForm(current => !current)}
                className="rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00]"
              >
                {showAppointmentForm ? 'Close Appointment Form' : 'Book Appointment'}
              </button>
              <a
                href={`https://wa.me/+91${normalizeDigits(selectedDoctor.ContactNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                Message on WhatsApp
              </a>
            </div>

            {showAppointmentForm ? (
              <form onSubmit={handleAppointmentSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Name {appointmentErrors.name ? <span className="text-red-500">({appointmentErrors.name})</span> : null}
                  </label>
                  <input
                    value={appointmentForm.name}
                    onChange={event => handleAppointmentFieldChange('name', event.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Contact Number {appointmentErrors.contactNumber ? <span className="text-red-500">({appointmentErrors.contactNumber})</span> : null}
                  </label>
                  <input
                    value={appointmentForm.contactNumber}
                    onChange={event => handleAppointmentFieldChange('contactNumber', event.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    placeholder="+91"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Email {appointmentErrors.email ? <span className="text-red-500">({appointmentErrors.email})</span> : null}
                  </label>
                  <input
                    value={appointmentForm.email}
                    onChange={event => handleAppointmentFieldChange('email', event.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Appointment Date {appointmentErrors.appointmentDate ? <span className="text-red-500">({appointmentErrors.appointmentDate})</span> : null}
                  </label>
                  <input
                    value={appointmentForm.appointmentDate}
                    onChange={event => handleAppointmentFieldChange('appointmentDate', event.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    type="date"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Appointment Time {appointmentErrors.appointmentTime ? <span className="text-red-500">({appointmentErrors.appointmentTime})</span> : null}
                  </label>
                  <input
                    value={appointmentForm.appointmentTime}
                    onChange={event => handleAppointmentFieldChange('appointmentTime', event.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    type="time"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00] md:col-span-2"
                >
                  Schedule Appointment
                </button>
              </form>
            ) : null}
          </div>
        </div>
      ) : null}
    </AppShell>
  )
}
