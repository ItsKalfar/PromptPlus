import React, { forwardRef } from "react"

export const InputField: React.FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, id, type, error, ...props }, ref) => {
  return (
    <div className="my-1 w-full relative ">
      <input
        type={type}
        className={`
        w-full bg-transparent border-2 rounded-md border-gray-200 px-3 py-2 disabled:opacity-[0.4] focus:bg-transparent focus:outline-none text-gray-900 ${className} active:bg-transparent focus:bg-transparent
        `}
        ref={ref}
        {...props}
      />
      <p className="text-xs font-semibold text-[#ef233c] mt-1 mb-2">{error}</p>
    </div>
  )
})
