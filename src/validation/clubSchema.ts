import * as yup from "yup";

export const createClubValidationSchema = yup.object().shape({
  clubData: yup.object({
    name: yup.string().required("Data harus diisi"),
    short_name: yup.string().required("Data harus diisi"),
    logo: yup.mixed().required("Data harus diisi"),
  }).required("Data Club belum lengkap"),
  phone: yup.string().required("Data harus diisi"),
  sports: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        description: yup.string().required(),
        type: yup.string().required(),
        thumbnail: yup.string(),
      })
    )
    .min(1, "Pilih minimal satu cabang olahraga")
    .required("Data wajib diisi"),
});