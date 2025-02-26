import { useForm } from "react-hook-form";
import CustomInput from "../components/ui/CustomInput";
import { FaUser, FaLock } from "react-icons/fa";

export default function CustomForm() {
  return (
    <div>
      <form
        className="w-[500px] border border-gray-400 p-5 rounded-md shadow-md"
        action=""
      >
        <CustomInput
          icon={<FaUser />}
          type={"text"}
          placeholder={"UserName"}
          label={"Name"}
        />
        <CustomInput
          type={"password"}
          icon={<FaLock />}
          placeholder={"password"}
        />
        <button
          type="submit"
          className="my-5 border p-2 rounded-md bg-gray-800 text-white w-[100%]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
