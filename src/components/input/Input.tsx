import styles from './Input.module.css'

type InputProps = {
    text: string,
    onChange: (value: string) => void;
    type: string,
    id: string,
}


function Input(props: InputProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value); // Передаем новое значение в onChange
    };
    return (
        <label className={styles.label} >
	   	    <input className={styles.label__input} type={props.type} id={props.id} onChange={handleChange}></input>
 	   	    <span className={styles.label__text}>{props.text}</span>           
 	    </label>
    )
}

export {
    Input,
}
  