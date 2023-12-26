interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  error?: string
}

interface IOutputBoxProps {
  response: string
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
