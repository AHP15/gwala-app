import styles from '../styles/Input.module.css';

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
    <div className={styles.container}>
      <label htmlFor={options.id} className={styles.label}>{label}</label>
      <input {...options} className={styles.input} />
    </div>
  );
}

export default Input;
