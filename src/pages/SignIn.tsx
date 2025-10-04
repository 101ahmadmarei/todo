import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import {Formik, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {useTranslation} from '@/locales/useTranslation.ts';
import {Loader2Icon} from "lucide-react";

interface FormData {
    email: string;
    password: string;
}

export default function SignIn() {
    const [generalError, setGeneralError] = useState<string>('');
    const navigate = useNavigate();
    const {t} = useTranslation();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email(t('signin.errors.emailInvalid'))
            .required(t('signin.errors.emailRequired')),
        password: Yup.string()
            .min(6, t('signin.errors.passwordMinLength'))
            .required(t('signin.errors.passwordRequired'))
    });

    const initialValues: FormData = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values: FormData, {setSubmitting}: any) => {

        await new Promise(resolve => setTimeout(resolve, 2000));

        localStorage.setItem('user', JSON.stringify({
            email: values.email,
            signedInAt: new Date().toISOString()
        }));

        window.dispatchEvent(new Event('authChange'));

        navigate('/');

        setSubmitting(false);

    };

    return (
        <div className="flex flex-1 items-center justify-center bg-background">
            <div className="max-w-lg lg:max-w-md w-full px-4">
                <div className="lg:px-4">
                    <h1 className="text-2xl font-bold mb-2 text-center">{t('signin.title')}</h1>
                    <p className="text-subtext text-center mb-6 mx-3 leading-8">
                        {t('signin.subtitle')}
                    </p>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, errors, touched, values, handleChange, handleBlur}) => (
                        <Form className="flex flex-col gap-4">
                            {generalError && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                    {generalError}
                                </div>
                            )}

                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="email">{t('signin.email')}</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder={t('signin.emailPlaceholder')}
                                    value={values.email}
                                    onChange={(e) => {
                                        handleChange(e);
                                        if (generalError) setGeneralError('');
                                    }}
                                    onBlur={handleBlur}
                                    className={errors.email && touched.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                    disabled={isSubmitting}

                                />
                                <ErrorMessage name="email" component="span" className="text-sm text-red-600"/>
                            </div>

                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="password">{t('signin.password')}</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder={t('signin.passwordPlaceholder')}
                                    value={values.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                        if (generalError) setGeneralError('');
                                    }}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="password" component="span" className="text-sm text-red-600"/>
                            </div>

                            <Button
                                type="submit"
                                variant="default"
                                disabled={isSubmitting}
                                className="relative mt-3 text-white"
                            >
                                {isSubmitting && (
                                    <Loader2Icon className="animate-spin"/>
                                )}
                                {t('signin.signInButton')}

                            </Button>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm text-center font-bold mt-4 text-subtext ">
                    {t('signin.noAccount')}{" "}
                    <Button asChild variant="link" className="p-0 h-auto font-medium">
                        <Link to="/signup">{t('signin.signUpLink')}</Link>
                    </Button>
                </p>
            </div>
        </div>
    );
}