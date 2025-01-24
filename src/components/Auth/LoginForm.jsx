import React from 'react'
import { useForm } from 'react-hook-form';
import { login } from "../../Services/Operations/authAPI"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const response = await login(data);
        console.log(response);
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        if (userRole === 'Admin') {
            navigate('/admin-home');
        } else if (userRole === 'Author') {
            navigate('/author-home');
        } else {
            navigate('/unauthorized');
        }
    };

    return (
        <div className=''>
            <section className="bg-gray-900 h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Welcome back ...
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        id="email"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && <span className="text-red-500">Email is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        {...register("password", { required: true })}
                                        id="password"
                                        placeholder="••••••••"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                                    />
                                    {errors.password && <span className="text-red-500">Password is required</span>}
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <div className='text-center text-white'>OR</div>
                                <button onClick={() => { navigate("/signup") }} className="w-full text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginForm