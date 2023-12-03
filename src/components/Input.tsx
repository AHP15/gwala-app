
type Options = {
  id: string,
  type: string,
  name: string,
  placeholder: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean,
  disabled?: boolean
};

const Input = ({ label, options }: { label: string, options: Options }) => {
  return (
    <div>
      <label htmlFor={options.id}>{label}</label>
      <input {...options} />
    </div>
  );
}

export default Input;
