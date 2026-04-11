import PatientModel from "../model/patientModel.js";

const createPatient_Service = async (data) => {
  const patient = new PatientModel(data);
  return await patient.save();
};

const getAllPatient_Service = async () => {
  return await PatientModel.find();
};

const getPatientById_Service = async (id) => {
  return await PatientModel.findOne({ _id: id });
};

const updatePatient_Service = async (id, data) => {
  return await PatientModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
};

const deletePatient_Service = async (id) => {
  return await PatientModel.findOneAndDelete({ _id: id });
};

// const getAllPatientsCount_Services = async () => {
//   const patients = await PatientModel.find();
//   const counts = {
//     total: patients.length,
//   };
//   return counts;
// };

const getAllPatientsCount_Services = async () => {
  const total = await PatientModel.countDocuments();

  return {
    total,
  };
};

export {
  createPatient_Service,
  getAllPatient_Service,
  getPatientById_Service,
  updatePatient_Service,
  deletePatient_Service,
  getAllPatientsCount_Services,
};
