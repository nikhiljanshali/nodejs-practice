export interface DoctorResponse {
  message: string
  status: boolean
  data: DoctorResponseData[]
}

export interface DoctorResponseData {
  contact: Contact
  _id: string
  firstName: string
  lastName: string
  specialization: string
  licenseNumber: string
  hospital: string
  availability: Availability[]
  rating: number
  patientReviews: any[]
  __v: number
}

export interface Contact {
  phone: string
  email: string
  address: string
}

export interface Availability {
  day: string
  from: string
  to: string
  _id: string
}




export interface DoctorPayload {
  _id: Id
  firstName: string
  lastName: string
  specialization: string
  licenseNumber: string
  contact: Contact
  hospital: string
  availability: Availability[]
  rating: number
  patientReviews: any[]
  __v: number
}

export interface Id {
  $oid: string
}

export interface Contact {
  phone: string
  email: string
  address: string
}

export interface Availability {
  day: string
  from: string
  to: string
  _id: string
}

export interface Id2 {
  $oid: string
}
