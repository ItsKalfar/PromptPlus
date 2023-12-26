import React from "react"

export const OutputBox: React.FC<IOutputBoxProps> = ({ response }) => {
  return (
    <div className="border-gray-200 border-2 px-3 py-2 w-full h-[250px] rounded-md my-4 overflow-y-auto text-gray-900">
      <p>{response}</p>
    </div>
  )
}
