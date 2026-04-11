
export interface PatientDetails {
  _id: string
  selected: boolean
  firstName: string
  lastName: string
  age: string
  gender: string
  dateofBirth: DateofBirth
  bloodGroup: string
  skinType: string
  allergies: string
  medications: string
  diseases: string
  medication: string
  email: string
  created: Created
  __v: number
}

export interface Id {
  $oid: string
}

export interface DateofBirth {
  $date: string
}

export interface Created {
  $date: string
}



export interface PatientResponse {
  message: string
  status: boolean
  data: PatientResponseData
}

export interface PatientResponseData {
  firstName: string
  lastName: string
  age: string
  gender: string
  dateofBirth: string
  bloodGroup: string
  skinType: string
  allergies: string
  diseases: string
  medication: string
  email: string
  _id: string
  created: string
  __v: number
}


export interface PatientCounter {
  message: string
  status: boolean
  data: PatientCounterList
}

export interface PatientCounterList {
  total: number
}
