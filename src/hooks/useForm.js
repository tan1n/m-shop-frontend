import { useState } from 'react'

export default function useForm(initialvalue) {

    const [values, setValues] = useState(initialvalue)

    return [values, (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    ]
}
