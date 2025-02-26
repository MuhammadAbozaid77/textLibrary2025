import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue, // Function To Set Values
    formState: {
      errors,
      isDirty,
      dirtyFields,
      touchedFields,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
      isValid,
      isSubmitting, //  Nedding Async await   with on submit and Sleep(3000)
      isValidating,
    },
    watch,
  } = useForm({
    // resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "muhammad",
      age: 0,
    },
  });

  const watchAge = watch("age");
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
              {...register("firstName", {
                maxLength: {
                  value: 10,
                  message: "Maximum Numbers",
                },
                validate: (e) => {
                  if (e === "ahmed") {
                    return "Not Good For Every ON";
                  }
                },
              })}
              id=""
            />
            {errors?.firstName?.message ? (
              <span className="text-red-500">{errors?.firstName?.message}</span>
            ) : null}
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="capitalize">
              age
            </label>
            <input
              className="border p-1 rounded outline-none bg-blue-100 "
              type="number"
              {...register("age", {
                valueAsNumber: true,
              })}
              id=""
            />
            {errors?.age?.message ? (
              <span className="text-red-500">{errors?.age?.message}</span>
            ) : null}
          </div>

          {watchAge > 50 && (
            <span className=" p-1 bg-blue-100 rounded-md">Good Watch</span>
          )}

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
  /* <div className="flex flex-col mb-3">
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
</div> */
}
