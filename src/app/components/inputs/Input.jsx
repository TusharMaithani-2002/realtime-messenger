"use client";
import clsx from "clsx"; // dynamic classes

function Input({ label, id, type, required, register, errors, disabled }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-md leading-6 text-gray-900 font-bold"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          type={type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-inset
            focus:ring-2
            sm:text-sm
            sm:leading-6
            focus:ring-purple-900
        `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
}

export default Input;
