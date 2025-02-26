import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../utils/validationSchema";
import { Input } from "../components/form/input";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: zodResolver(registerSchema) });

  //Calling Function-------------------------------
  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] border border-gray-400 p-5 rounded-md shadow-md"
        >
          <h1 className="mb-5 text-[30px] font-bold text-center">Register </h1>

          <div className="flex flex-col mb-3">
            <label htmlFor="" className="capitalize">
              FirstName
            </label>
            <input
              className="border p-1 rounded outline-none bg-blue-100 "
              type="text"
              {...register("firstName")}
              id=""
            />
            {errors?.firstName?.message ? (
              <span className="text-red-500">{errors?.firstName?.message}</span>
            ) : null}
          </div>
          {/* <div className="flex flex-col mb-3">
            <label htmlFor="" className="capitalize">
              SecondName
            </label>
            <input
              className="border p-1 rounded outline-none bg-blue-100 "
              type="text"
              {...register("secondName")}
              id=""
            />
            {errors?.secondName?.message ? (
              <span className="text-red-500">
                {errors?.secondName?.message}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="capitalize">
              email
            </label>
            <input
              className="border p-1 rounded outline-none bg-blue-100 "
              type="text"
              {...register("email")}
              id=""
            />
            {errors?.email?.message ? (
              <span className="text-red-500">{errors?.email?.message}</span>
            ) : null}
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="capitalize">
              password
            </label>
            <input
              className="border p-1 rounded outline-none bg-blue-100 "
              type="password"
              {...register("password")}
              id=""
            />

            {errors?.password?.message ? (
              <span className="text-red-500">{errors?.password?.message}</span>
            ) : null}
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="capitalize">
              confirmPassword
            </label>
            <input
              className="border p-1 rounded outline-none bg-blue-100 "
              type="password"
              {...register("confirmPassword")}
              id=""
            />
            {errors?.confirmPassword?.message ? (
              <span className="text-red-500">
                {errors?.confirmPassword?.message}
              </span>
            ) : null}
          </div> */}
          <button
            type="submit"
            className="my-5 border p-2 rounded-md bg-blue-500 text-white w-[100%]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

{
  /* <Input
            label={"firstName"}
            register={register}
            error={errors?.firstName?.message}
            name={"firstName"}
            type={"text"}
          /> */
}
