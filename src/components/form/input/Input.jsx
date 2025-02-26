export default function Input({ type, register, name, error, label }) {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor="" className="capitalize">
        {label}
      </label>
      <input
        className="border p-1 rounded outline-none bg-blue-100 "
        type={type}
        {...register(name)}
        id=""
      />
      {error ? <span className="text-red-500">{error}</span> : null}
    </div>
  );
}
