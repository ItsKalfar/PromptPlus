import { forwardRef } from "react"

export const Button: React.FC<IButtonProps> = forwardRef<
  HTMLButtonElement,
  IButtonProps
>(({ className, ...props }, ref) => {
  return (
    <button
      type="button"
      className={`rounded-md inline-flex flex-shrink-0 justify-center items-center text-center shadow-sm bg-gray-800 text-white h-10 px-6 py-2 ${className}`}
      {...props}
      ref={ref}
    />
  )
})
