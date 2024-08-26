import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
export default function Resrcode() {
    let navigate = useNavigate()
    let [loading, setloading] = useState(false)
    let [message, setmessage] = useState('')
    function handelResrcode(values) {
        setloading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            .then((response) => {
                console.log(response.data);
                if(response.data.status === 'Success'){
                    setloading(false)
                    setmessage('')
                    navigate('/newpass')
                }
            })
            .catch((err) => {
                setmessage(err.response?.data.message);
                setloading(false);
            });
    }

    let validationSchema = yup.object({
        resetCode: yup.string().max(6).required("code is required"),
    })

    let formik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validationSchema,
        onSubmit: handelResrcode
    })
    return (
        <>
            <h2 className='my-10 text-2xl'>ResetCode :</h2>
            {message ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{message}</span>
                </div>
            </div> : ''}
            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                    <input value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">resetCode</label>
                </div>
                {formik.errors.resetCode && formik.touched.resetCode ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{formik.errors.resetCode}</span>
                    </div>
                </div>
                    : ''}

                <div className="flex flex-col gap-5 ">

                    <button type="submit" className="text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> {loading ? <i className=' fas fa-spin fa-spinner text-white'></i> : 'Send'}</button>
                </div>
            </form>
        </>
    )
}
