import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function CustomInput({
  type,
  placeholder,
  value,
  onChange,
  name,
  label,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col mb-3">
      <label htmlFor="" className="capitalize">
        {label}
      </label>
      <div className="flex justify-between items-center bg-gray-50 border p-1 rounded-md">
        <div className="mx-2"> {icon} </div>
        <input
          type={showPassword ? "text" : type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className=" p-1 rounded outline-none  w-[100%] bg-gray-50 text-gray-700"
        />
        {type === "password" ? (
          <div className="mx-1" onClick={handleTogglePassword}>
            {showPassword ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* <span className="text-red-500">ssss</span> */}
    </div>
  );
}

// return (
//   <div className="flex flex-col mb-3 ">
//     <label htmlFor="" className="capitalize">
//       {label}
//     </label>
//     <div className="flex justify-between items-center bg-gray-50 border p-1 rounded-md">
//       <div className="mx-2"> {icon} </div>
//       <input
//         type={showPassword ? "text" : type}
//         name={name}
//         onChange={onChange}
//         value={value}
//         placeholder={placeholder}
//         className=" p-1 rounded outline-none  w-[100%] bg-gray-50 text-gray-700"
//       />
//       {type === "password" ? (
//         <div className="mx-1" onClick={handleTogglePassword}>
//           {showPassword ? (
//             <AiOutlineEye size={20} />
//           ) : (
//             <AiOutlineEyeInvisible size={20} />
//           )}
//         </div>
//       ) : (
//         ""
//       )}
//     </div>

//     {/* <span className="text-red-500">ssss</span> */}
//   </div>
// );
// }
