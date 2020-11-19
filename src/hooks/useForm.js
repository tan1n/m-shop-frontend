import { useState } from 'react'

export default function useForm(initialvalue) {

    const [values, setValues] = useState(initialvalue)

    return [values, (e) => {
        if (e.value) {
            setValues({
                ...values,
                district: e.value
            })
        } else {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }
    }, setValues]
}
