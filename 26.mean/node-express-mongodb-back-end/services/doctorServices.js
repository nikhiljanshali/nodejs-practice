import DoctorModel from "../model/doctorModel.js";

const createDoctor_Service = async (data) => {
  const doctor = new DoctorModel(data);
  return await doctor.save();
};

const getAllDoctor_Service = async () => {
  return await DoctorModel.find();
};

const getDoctorById_Service = async (id) => {
  return await DoctorModel.findOne({ _id: id });
};

const updateDoctor_Service = async (id, data) => {
  return await DoctorModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
};

const deleteDoctor_Service = async (id) => {
  return await DoctorModel.findOneAndDelete({ _id: id });
};

const getAllDoctorCount_Services = async () => {
  const result = await DoctorModel.aggregate([
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              { case: { $lte: ["$rating", 1] }, then: "0-1" },
              { case: { $lte: ["$rating", 2] }, then: "1-2" },
              { case: { $lte: ["$rating", 3] }, then: "2-3" },
              { case: { $lte: ["$rating", 4] }, then: "3-4" },
              { case: { $lte: ["$rating", 5] }, then: "4-5" },
            ],
            default: "unknown",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        ratingRange: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { ratingRange: 1 },
    },
  ]);

  const total = await DoctorModel.countDocuments();

  return {
    total,
    ratingDistribution: result,
  };
};
export {
  createDoctor_Service,
  getAllDoctor_Service,
  getDoctorById_Service,
  updateDoctor_Service,
  deleteDoctor_Service,
  getAllDoctorCount_Services,
};
