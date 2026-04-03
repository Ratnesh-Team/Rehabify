'use client'

import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  Plus,
  Stethoscope,
  Upload,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'

type Doctor = {
  _id: string
  Name: string
  Description?: string
  Specialization?: string
  ClinicAddress?: string
  ContactNumber?: number | string
  Email?: string
  ImageURL?: string
}

type AppointmentForm = {
  name: string
  contactNumber: string
  email: string
  appointmentDate: string
  appointmentTime: string
}

type NmkForm = {
  name: string
  ownerName: string
  address: string
  contactNumber: string
  email: string
  state: string
  district: string
  pinCode: string
  yearOfRegistration: string
}

type DoctorForm = {
  Name: string
  Description: string
  Specialization: string
  ClinicAddress: string
  ContactNumber: string
  Email: string
}

type UploadState = {
  centerUrl: string
  verificationUrl: string
  doctorUrl: string
  centerUploading: boolean
  verificationUploading: boolean
  doctorUploading: boolean
}

const initialAppointmentForm: AppointmentForm = {
  name: '',
  contactNumber: '',
  email: '',
  appointmentDate: '',
  appointmentTime: '',
}

const initialNmkForm: NmkForm = {
  name: '',
  ownerName: '',
  address: '',
  contactNumber: '',
  email: '',
  state: '',
  district: '',
  pinCode: '',
  yearOfRegistration: '',
}

const initialDoctorForm: DoctorForm = {
  Name: '',
  Description: '',
  Specialization: '',
  ClinicAddress: '',
  ContactNumber: '',
  Email: '',
}

const indianStateOptions = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
]

function normalizeDigits(value: string | number | undefined) {
  return String(value ?? '').replace(/\D/g, '')
}

async function uploadToCloudinary(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'pbfwqcie')

  const response = await fetch('https://api.cloudinary.com/v1_1/daosik5yi/image/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Image upload failed')
  }

  const result = await response.json()
  if (!result?.secure_url) {
    throw new Error('Missing upload URL')
  }

  return String(result.secure_url)
}

export function LandingExperience() {
  const [loadingDoctors, setLoadingDoctors] = useState(true)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null)

  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>(initialAppointmentForm)
  const [appointmentErrors, setAppointmentErrors] = useState<Partial<AppointmentForm>>({})

  const [showNmkModal, setShowNmkModal] = useState(false)
  const [showDoctorModal, setShowDoctorModal] = useState(false)

  const [nmkForm, setNmkForm] = useState<NmkForm>(initialNmkForm)
  const [doctorForm, setDoctorForm] = useState<DoctorForm>(initialDoctorForm)

  const [uploadState, setUploadState] = useState<UploadState>({
    centerUrl: '',
    verificationUrl: '',
    doctorUrl: '',
    centerUploading: false,
    verificationUploading: false,
    doctorUploading: false,
  })

  const [sessionEmail, setSessionEmail] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmittingNmk, setIsSubmittingNmk] = useState(false)
  const [isSubmittingDoctor, setIsSubmittingDoctor] = useState(false)

  const featuredDoctors = useMemo(() => {
    return doctors.slice(0, 6)
  }, [doctors])

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetch('/api/doctor', { cache: 'no-store' })
        const result = await response.json()
        if (response.ok) {
          setDoctors(result.data ?? [])
        }
      } finally {
        setLoadingDoctors(false)
      }
    }

    const loadSessionEmail = async () => {
      try {
        const response = await fetch('/api/me', { cache: 'no-store' })
        if (!response.ok) {
          return
        }
        const result = await response.json()
        const currentEmail = String(result?.data?.email ?? '').trim()
        if (currentEmail) {
          setSessionEmail(currentEmail)
          setNmkForm(current => ({ ...current, email: currentEmail }))
        }
      } catch {
        // Keep the form usable even if session is unavailable.
      }
    }

    void loadDoctors()
    void loadSessionEmail()
  }, [])

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      setShowNmkModal(false)
      setShowDoctorModal(false)
      setActiveDoctor(null)
      setShowAppointmentForm(false)
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  const handleUpload = async (kind: 'center' | 'verification' | 'doctor', file?: File) => {
    if (!file) {
      return
    }

    if (kind === 'center') {
      setUploadState(current => ({ ...current, centerUploading: true }))
    }
    if (kind === 'verification') {
      setUploadState(current => ({ ...current, verificationUploading: true }))
    }
    if (kind === 'doctor') {
      setUploadState(current => ({ ...current, doctorUploading: true }))
    }

    try {
      const uploadedUrl = await uploadToCloudinary(file)
      if (kind === 'center') {
        setUploadState(current => ({ ...current, centerUrl: uploadedUrl, centerUploading: false }))
      }
      if (kind === 'verification') {
        setUploadState(current => ({ ...current, verificationUrl: uploadedUrl, verificationUploading: false }))
      }
      if (kind === 'doctor') {
        setUploadState(current => ({ ...current, doctorUrl: uploadedUrl, doctorUploading: false }))
      }
      setStatusMessage('File uploaded successfully.')
    } catch {
      if (kind === 'center') {
        setUploadState(current => ({ ...current, centerUploading: false }))
      }
      if (kind === 'verification') {
        setUploadState(current => ({ ...current, verificationUploading: false }))
      }
      if (kind === 'doctor') {
        setUploadState(current => ({ ...current, doctorUploading: false }))
      }
      setStatusMessage('Upload failed. Please try again.')
    }
  }

  const handleAppointmentFieldChange = <K extends keyof AppointmentForm>(
    key: K,
    value: AppointmentForm[K]
  ) => {
    setAppointmentForm(current => ({ ...current, [key]: value }))
    setAppointmentErrors(current => ({ ...current, [key]: '' }))
  }

  const validateAppointment = () => {
    const errors: Partial<AppointmentForm> = {}

    if (!appointmentForm.name.trim()) {
      errors.name = 'required'
    }

    if (!appointmentForm.contactNumber.trim()) {
      errors.contactNumber = 'required'
    }

    if (!appointmentForm.email.trim()) {
      errors.email = 'required'
    } else if (!/\S+@\S+\.\S+/.test(appointmentForm.email)) {
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

  const handleAppointmentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateAppointment()) {
      return
    }

    window.alert('Appointment booked successfully')
    setShowAppointmentForm(false)
    setAppointmentForm(initialAppointmentForm)
  }

  const handleNmkSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage('')

    if (uploadState.centerUploading || uploadState.verificationUploading) {
      setStatusMessage('Please wait for uploads to complete.')
      return
    }

    if (!uploadState.centerUrl || !uploadState.verificationUrl) {
      setStatusMessage('Center photo and verification document are required.')
      return
    }

    const contactNumber = Number.parseInt(nmkForm.contactNumber, 10)
    const pinCode = Number.parseInt(nmkForm.pinCode, 10)
    const year = Number.parseInt(nmkForm.yearOfRegistration, 10)

    if (Number.isNaN(contactNumber) || Number.isNaN(pinCode) || Number.isNaN(year)) {
      setStatusMessage('Contact number, pincode, and year must be valid numbers.')
      return
    }

    setIsSubmittingNmk(true)

    try {
      const payload = {
        Name: nmkForm.name,
        Address: nmkForm.address,
        Owner_Name: nmkForm.ownerName,
        Contact_Number: contactNumber,
        Email: nmkForm.email || sessionEmail,
        ImageURL: uploadState.centerUrl,
        State: nmkForm.state,
        District: nmkForm.district,
        Pincode: pinCode,
        IsVerified: false,
        Established_Year: year,
        NMK_Verification_Image: uploadState.verificationUrl,
      }

      const response = await fetch('/api/addNmk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        setStatusMessage(result.message || 'Failed to register NMK.')
        return
      }

      setStatusMessage('NMK registered successfully. Verification is pending.')
      setNmkForm(current => ({ ...initialNmkForm, email: current.email }))
      setUploadState(current => ({ ...current, centerUrl: '', verificationUrl: '' }))
      setShowNmkModal(false)
    } catch {
      setStatusMessage('Unable to register NMK at the moment.')
    } finally {
      setIsSubmittingNmk(false)
    }
  }

  const handleDoctorSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage('')

    if (uploadState.doctorUploading) {
      setStatusMessage('Please wait for doctor photo upload to finish.')
      return
    }

    if (!uploadState.doctorUrl) {
      setStatusMessage('Doctor photo is required before submit.')
      return
    }

    const contactNumber = Number.parseInt(doctorForm.ContactNumber, 10)
    if (Number.isNaN(contactNumber)) {
      setStatusMessage('Doctor contact number must be a valid number.')
      return
    }

    setIsSubmittingDoctor(true)

    try {
      const payload = {
        Name: doctorForm.Name,
        Description: doctorForm.Description,
        Specialization: doctorForm.Specialization,
        ClinicAddress: doctorForm.ClinicAddress,
        ContactNumber: contactNumber,
        Email: doctorForm.Email,
        ImageURL: uploadState.doctorUrl,
      }

      const response = await fetch('/api/addDoctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        setStatusMessage(result.message || 'Failed to register doctor.')
        return
      }

      setStatusMessage('Doctor registration submitted successfully.')
      setDoctorForm(initialDoctorForm)
      setUploadState(current => ({ ...current, doctorUrl: '' }))
      setShowDoctorModal(false)

      const doctorsResponse = await fetch('/api/doctor', { cache: 'no-store' })
      const doctorsResult = await doctorsResponse.json()
      if (doctorsResponse.ok) {
        setDoctors(doctorsResult.data ?? [])
      }
    } catch {
      setStatusMessage('Unable to register doctor at the moment.')
    } finally {
      setIsSubmittingDoctor(false)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f4ec] text-neutral-900">
      <section className="relative overflow-hidden border-b border-[#d8c9a8] bg-gradient-to-br from-[#f7edd8] via-[#f9f4ea] to-[#f3e2bc]">
        <div className="absolute -left-20 top-14 h-72 w-72 rounded-full bg-[#f75700]/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#0b6e69]/15 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-18">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-[#d0b48a] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a4b11]">
              Reimagined from legacy UI behavior
            </p>
            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              Rehabify
              <span className="mt-2 block text-2xl font-semibold text-[#47413a] md:text-3xl">
                The Path to a Brighter Tomorrow
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#554f47] md:text-lg">
              This new landing experience keeps the old click journey intact: card click to popup, in-popup
              appointment booking, NMK registration popup, and direct photo plus verification uploads.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowDoctorModal(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#f75700] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#df4f00]"
              >
                <Plus className="h-4 w-4" />
                Register Doctor Popup
              </button>
              <button
                type="button"
                onClick={() => setShowNmkModal(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[#0b6e69] bg-white px-5 py-3 text-sm font-semibold text-[#0b6e69] transition hover:bg-[#e7f4f3]"
              >
                <Building2 className="h-4 w-4" />
                Add NMK Popup
              </button>
              <Link
                href="/database"
                className="inline-flex items-center gap-2 rounded-full border border-[#d1c4ad] bg-[#f5efe2] px-5 py-3 text-sm font-semibold text-[#4f463d] transition hover:bg-[#ece2cc]"
              >
                Open Database
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[#d8c9a8] bg-white/90 p-4 shadow-lg shadow-[#9b8452]/15">
            <Image
              src="/img/home_page_img/india-map.png"
              alt="India map"
              width={860}
              height={560}
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#b9e2df] bg-[#e9f7f6] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0b6e69]">Legacy click flow</p>
            <h3 className="mt-2 text-xl font-black">Click Doctor Card</h3>
            <p className="mt-2 text-sm leading-6 text-[#35524f]">
              Matching the old interface, cards are clickable and open a popup with doctor details, WhatsApp action,
              and appointment form.
            </p>
          </article>

          <article className="rounded-2xl border border-[#f4c7a9] bg-[#fff1e6] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8d4a1a]">Legacy upload flow</p>
            <h3 className="mt-2 text-xl font-black">Add NMK with Evidence</h3>
            <p className="mt-2 text-sm leading-6 text-[#5f4735]">
              NMK registration now includes popup form and direct photo plus verification uploads before submit.
            </p>
          </article>

          <article className="rounded-2xl border border-[#cdc3f0] bg-[#f2edff] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#5a4795]">Legacy section anchors</p>
            <h3 className="mt-2 text-xl font-black">Nearest Center and Remedies</h3>
            <p className="mt-2 text-sm leading-6 text-[#4e4466]">
              The old homepage anchors are preserved through direct links to treatment centers and home remedies.
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-full border border-[#b5d9e8] bg-[#dff1f8] px-3 py-3 sm:px-8">
          <div className="grid gap-2 text-center sm:grid-cols-3">
            <div>
              <p className="text-2xl font-black text-[#f75700]">100+</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#415d6c] sm:text-sm">
                Registered Nasha Mukti Kendra
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#f75700]">50+</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#415d6c] sm:text-sm">Registered NGO</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#f75700]">400+</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#415d6c] sm:text-sm">Community Member</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-7xl px-4 pb-10 md:px-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black">Doctor Cards with Popup</h2>
            <p className="text-sm text-[#5d5449]">Click any card to open details and book appointment in a popup.</p>
          </div>
          <Link
            href="/doctor"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b6e69] hover:text-[#07504d]"
          >
            Open full doctor page
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {loadingDoctors ? <p className="text-sm text-[#6f6559]">Loading doctors...</p> : null}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDoctors.map(doctor => (
            <article
              key={doctor._id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveDoctor(doctor)
                setShowAppointmentForm(false)
              }}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setActiveDoctor(doctor)
                  setShowAppointmentForm(false)
                }
              }}
              className="cursor-pointer overflow-hidden rounded-2xl border border-[#dbc9b2] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-52 bg-[#f3ede2]">
                {doctor.ImageURL ? (
                  <div
                    role="img"
                    aria-label={doctor.Name}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${doctor.ImageURL})` }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#807567]">Doctor Photo</div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#f2edff] px-2.5 py-1 text-xs font-semibold text-[#5a4795]">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {doctor.Specialization || 'General'}
                </p>
                <h3 className="text-lg font-bold text-[#2b251f]">{doctor.Name}</h3>
                <p className="line-clamp-2 text-sm text-[#5e5245]">{doctor.ClinicAddress || 'Address not available'}</p>
              </div>
            </article>
          ))}
        </div>

        {!loadingDoctors && featuredDoctors.length === 0 ? (
          <div className="rounded-2xl border border-[#d9cbb8] bg-white p-8 text-center text-sm text-[#665b4d]">
            No verified doctors found yet. Use the Register Doctor popup to add one.
          </div>
        ) : null}
      </section>

      <section className="mx-auto mb-12 w-full max-w-7xl px-4 md:px-8">
        <div className="grid gap-5 md:grid-cols-[1.15fr_1fr]">
          <div className="rounded-2xl border border-[#d3c4ad] bg-[#fff7eb] p-5">
            <h3 className="text-2xl font-black">Nearest Nasha Mukti Kendra</h3>
            <p className="mt-2 text-sm leading-6 text-[#5f5245]">
              We kept the old location intent and turned it into a clear action path for users who need center lookup.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/treatment-centers"
                className="inline-flex items-center gap-2 rounded-full bg-[#f75700] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#df4f00]"
              >
                <MapPin className="h-4 w-4" />
                Find Centers
              </Link>
              <Link
                href="/home-remedies"
                className="inline-flex items-center gap-2 rounded-full border border-[#cfb896] bg-white px-5 py-2.5 text-sm font-semibold text-[#5d4730] hover:bg-[#f7efdd]"
              >
                Home Remedies
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#c3dcd9] bg-[#e9f7f6] p-5">
            <h3 className="text-2xl font-black">Legacy Flow Snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#375653]">
              <li>Doctor card click opens popup details.</li>
              <li>Popup includes appointment booking and WhatsApp action.</li>
              <li>NMK popup includes owner data, center details, and document upload.</li>
              <li>Uploads are routed through Cloudinary before API submit.</li>
            </ul>
          </div>
        </div>
      </section>

      {statusMessage ? (
        <div className="fixed bottom-4 left-1/2 z-40 w-[92vw] max-w-3xl -translate-x-1/2 rounded-xl border border-[#d6c6ab] bg-white px-4 py-3 text-sm font-medium text-[#3f372e] shadow-lg">
          {statusMessage}
        </div>
      ) : null}

      {activeDoctor ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#d4c3a8] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-[#2c261f]">Doctor Details Popup</h3>
              <button
                type="button"
                onClick={() => setActiveDoctor(null)}
                className="rounded-md border border-[#d1c4b2] p-1.5 text-[#5a4f42] hover:bg-[#f5efe4]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <div className="h-56 overflow-hidden rounded-xl bg-[#f0e8da]">
                {activeDoctor.ImageURL ? (
                  <div
                    role="img"
                    aria-label={activeDoctor.Name}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${activeDoctor.ImageURL})` }}
                  />
                ) : null}
              </div>

              <div className="space-y-2 text-sm text-[#5e5448]">
                <h4 className="text-2xl font-bold text-[#2e2821]">{activeDoctor.Name}</h4>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#f2edff] px-3 py-1 text-xs font-semibold text-[#5a4795]">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {activeDoctor.Specialization || 'General'}
                </p>
                <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" />{activeDoctor.ClinicAddress || 'N/A'}</p>
                <p className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4" />{activeDoctor.Email || 'N/A'}</p>
                <p className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4" />{activeDoctor.ContactNumber || 'N/A'}</p>
                <p className="pt-1 font-medium text-[#453d33]">{activeDoctor.Description || 'No description available.'}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowAppointmentForm(current => !current)}
                className="inline-flex items-center gap-2 rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#df4f00]"
              >
                <CalendarDays className="h-4 w-4" />
                {showAppointmentForm ? 'Close Appointment Form' : 'Book Appointment'}
              </button>

              <a
                href={`https://wa.me/+91${normalizeDigits(activeDoctor.ContactNumber)}?text=I%20want%20to%20book%20an%20appointment`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#0b6e69] bg-white px-4 py-2 text-sm font-semibold text-[#0b6e69] hover:bg-[#e7f4f3]"
              >
                Message on WhatsApp
              </a>
            </div>

            {showAppointmentForm ? (
              <form onSubmit={handleAppointmentSubmit} className="mt-4 grid gap-3 rounded-xl border border-[#ddd2bf] bg-[#f8f3ea] p-4 md:grid-cols-2">
                <label className="text-sm font-medium text-[#52493d]">
                  Name {appointmentErrors.name ? <span className="text-red-600">({appointmentErrors.name})</span> : null}
                  <input
                    value={appointmentForm.name}
                    onChange={event => handleAppointmentFieldChange('name', event.target.value)}
                    className="mt-1 w-full rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
                    placeholder="Enter your name"
                  />
                </label>

                <label className="text-sm font-medium text-[#52493d]">
                  Contact Number {appointmentErrors.contactNumber ? <span className="text-red-600">({appointmentErrors.contactNumber})</span> : null}
                  <input
                    value={appointmentForm.contactNumber}
                    onChange={event => handleAppointmentFieldChange('contactNumber', event.target.value)}
                    className="mt-1 w-full rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
                    placeholder="+91"
                  />
                </label>

                <label className="text-sm font-medium text-[#52493d]">
                  Email {appointmentErrors.email ? <span className="text-red-600">({appointmentErrors.email})</span> : null}
                  <input
                    value={appointmentForm.email}
                    onChange={event => handleAppointmentFieldChange('email', event.target.value)}
                    className="mt-1 w-full rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
                    placeholder="Enter your email"
                    type="email"
                  />
                </label>

                <label className="text-sm font-medium text-[#52493d]">
                  Appointment Date {appointmentErrors.appointmentDate ? <span className="text-red-600">({appointmentErrors.appointmentDate})</span> : null}
                  <input
                    value={appointmentForm.appointmentDate}
                    onChange={event => handleAppointmentFieldChange('appointmentDate', event.target.value)}
                    className="mt-1 w-full rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
                    type="date"
                  />
                </label>

                <label className="text-sm font-medium text-[#52493d] md:col-span-2">
                  Appointment Time {appointmentErrors.appointmentTime ? <span className="text-red-600">({appointmentErrors.appointmentTime})</span> : null}
                  <input
                    value={appointmentForm.appointmentTime}
                    onChange={event => handleAppointmentFieldChange('appointmentTime', event.target.value)}
                    className="mt-1 w-full rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm md:max-w-xs"
                    type="time"
                  />
                </label>

                <button
                  type="submit"
                  className="md:col-span-2 inline-flex items-center justify-center rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#df4f00]"
                >
                  Schedule Appointment
                </button>
              </form>
            ) : null}
          </div>
        </div>
      ) : null}

      {showDoctorModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#d4c3a8] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-[#2c261f]">Register Doctor Popup</h3>
              <button
                type="button"
                onClick={() => setShowDoctorModal(false)}
                className="rounded-md border border-[#d1c4b2] p-1.5 text-[#5a4f42] hover:bg-[#f5efe4]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleDoctorSubmit} className="grid gap-3 md:grid-cols-2">
              <input
                value={doctorForm.Name}
                onChange={event => setDoctorForm(current => ({ ...current, Name: event.target.value }))}
                placeholder="Doctor Name"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={doctorForm.Specialization}
                onChange={event => setDoctorForm(current => ({ ...current, Specialization: event.target.value }))}
                placeholder="Specialization"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={doctorForm.Email}
                onChange={event => setDoctorForm(current => ({ ...current, Email: event.target.value }))}
                placeholder="Email"
                type="email"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={doctorForm.ContactNumber}
                onChange={event => setDoctorForm(current => ({ ...current, ContactNumber: event.target.value }))}
                placeholder="Contact Number"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={doctorForm.ClinicAddress}
                onChange={event => setDoctorForm(current => ({ ...current, ClinicAddress: event.target.value }))}
                placeholder="Clinic Address"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm md:col-span-2"
              />
              <textarea
                value={doctorForm.Description}
                onChange={event => setDoctorForm(current => ({ ...current, Description: event.target.value }))}
                placeholder="Description"
                required
                className="min-h-24 rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm md:col-span-2"
              />

              <div className="rounded-xl border border-dashed border-[#b89f7d] bg-[#f9f4ea] p-4 md:col-span-2">
                <p className="mb-2 text-sm font-semibold text-[#5f4735]">Upload Doctor Photo</p>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#c3b095] bg-white px-3 py-2 text-sm font-medium text-[#5b4631] hover:bg-[#f6efe2]">
                  <Upload className="h-4 w-4" />
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={event => void handleUpload('doctor', event.target.files?.[0])}
                  />
                </label>
                {uploadState.doctorUploading ? <p className="mt-2 text-xs text-[#6f665a]">Uploading...</p> : null}
                {uploadState.doctorUrl ? (
                  <a href={uploadState.doctorUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all text-xs text-[#0b6e69] underline">
                    {uploadState.doctorUrl}
                  </a>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmittingDoctor}
                className="md:col-span-2 inline-flex items-center justify-center rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#df4f00] disabled:opacity-60"
              >
                {isSubmittingDoctor ? 'Submitting...' : 'Submit Doctor'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {showNmkModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#d4c3a8] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-[#2c261f]">Add NMK Popup with Photo Upload</h3>
              <button
                type="button"
                onClick={() => setShowNmkModal(false)}
                className="rounded-md border border-[#d1c4b2] p-1.5 text-[#5a4f42] hover:bg-[#f5efe4]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleNmkSubmit} className="grid gap-3 md:grid-cols-2">
              <input
                value={nmkForm.name}
                onChange={event => setNmkForm(current => ({ ...current, name: event.target.value }))}
                placeholder="NMK Name"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.ownerName}
                onChange={event => setNmkForm(current => ({ ...current, ownerName: event.target.value }))}
                placeholder="Owner Name"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.email}
                onChange={event => setNmkForm(current => ({ ...current, email: event.target.value }))}
                placeholder="Email"
                type="email"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.contactNumber}
                onChange={event => setNmkForm(current => ({ ...current, contactNumber: event.target.value }))}
                placeholder="Contact Number"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.state}
                onChange={event => setNmkForm(current => ({ ...current, state: event.target.value }))}
                placeholder="State"
                list="state-options"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.district}
                onChange={event => setNmkForm(current => ({ ...current, district: event.target.value }))}
                placeholder="District"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.pinCode}
                onChange={event => setNmkForm(current => ({ ...current, pinCode: event.target.value }))}
                placeholder="Pin Code"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.yearOfRegistration}
                onChange={event => setNmkForm(current => ({ ...current, yearOfRegistration: event.target.value }))}
                placeholder="Established Year"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm"
              />
              <input
                value={nmkForm.address}
                onChange={event => setNmkForm(current => ({ ...current, address: event.target.value }))}
                placeholder="Address"
                required
                className="rounded-md border border-[#cdbfa8] bg-white px-3 py-2 text-sm md:col-span-2"
              />

              <div className="rounded-xl border border-dashed border-[#b89f7d] bg-[#f9f4ea] p-4">
                <p className="mb-2 text-sm font-semibold text-[#5f4735]">Upload NMK Photo</p>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#c3b095] bg-white px-3 py-2 text-sm font-medium text-[#5b4631] hover:bg-[#f6efe2]">
                  <ImageIcon className="h-4 w-4" />
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={event => void handleUpload('center', event.target.files?.[0])}
                  />
                </label>
                {uploadState.centerUploading ? <p className="mt-2 text-xs text-[#6f665a]">Uploading...</p> : null}
                {uploadState.centerUrl ? (
                  <a href={uploadState.centerUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all text-xs text-[#0b6e69] underline">
                    {uploadState.centerUrl}
                  </a>
                ) : null}
              </div>

              <div className="rounded-xl border border-dashed border-[#b89f7d] bg-[#f9f4ea] p-4">
                <p className="mb-2 text-sm font-semibold text-[#5f4735]">Upload Verification Document</p>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#c3b095] bg-white px-3 py-2 text-sm font-medium text-[#5b4631] hover:bg-[#f6efe2]">
                  <Upload className="h-4 w-4" />
                  Choose Document Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={event => void handleUpload('verification', event.target.files?.[0])}
                  />
                </label>
                {uploadState.verificationUploading ? <p className="mt-2 text-xs text-[#6f665a]">Uploading...</p> : null}
                {uploadState.verificationUrl ? (
                  <a href={uploadState.verificationUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all text-xs text-[#0b6e69] underline">
                    {uploadState.verificationUrl}
                  </a>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmittingNmk}
                className="md:col-span-2 inline-flex items-center justify-center rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#df4f00] disabled:opacity-60"
              >
                {isSubmittingNmk ? 'Submitting...' : 'Submit NMK'}
              </button>
            </form>

            <datalist id="state-options">
              {indianStateOptions.map(state => (
                <option key={state} value={state} />
              ))}
            </datalist>
          </div>
        </div>
      ) : null}
    </main>
  )
}
