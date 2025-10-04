import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Link, useNavigate} from "react-router-dom";
import {Formik, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useState, useRef} from 'react';
import {useTranslation} from '@/locales/useTranslation.ts';
import {Loader2Icon, UploadIcon} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";

interface FormData {
    name: string;
    email: string;
    password: string;
    avatar?: File | null;
}

export default function SignUp() {
    const [generalError, setGeneralError] = useState<string>('');
    const [avatarPreview, setAvatarPreview] = useState<string>('https://placehold.co/64x64?text=👤');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const {t} = useTranslation();


    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, t('signup.errors.nameMinLength'))
            .max(50, t('signup.errors.nameMaxLength'))
            .required(t('signup.errors.nameRequired')),
        email: Yup.string()
            .email(t('signup.errors.emailInvalid'))
            .required(t('signup.errors.emailRequired')),
        password: Yup.string()
            .min(8, t('signup.errors.passwordMinLength'))
            .required(t('signup.errors.passwordRequired'))
    });

    const initialValues: FormData = {
        name: '',
        email: '',
        password: '',
        avatar: null
    };

    const handleAvatarUpload = (setFieldValue: any) => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setGeneralError(t('signup.errors.invalidFileType'));
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setGeneralError(t('signup.errors.fileSizeLimit'));
                return;
            }

            setFieldValue('avatar', file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            setGeneralError('');
        }
    };

    const handleSubmit = async (values: FormData, {setSubmitting}: any) => {

        localStorage.setItem('user', JSON.stringify({
            name: values.name,
            email: values.email,
            avatar: avatarPreview ? avatarPreview : null,
            signedUpAt: new Date().toISOString()
        }));

        await new Promise(resolve => setTimeout(resolve, 2000));

        window.dispatchEvent(new Event('authChange'));

        navigate('/');

        setSubmitting(false);

    };

    return (
        <div className="flex flex-1 items-center justify-center bg-background">
            <div className="max-w-lg  sm:min-w-lg lg:max-w-md w-full px-4">
                <h1 className="text-2xl font-bold mb-2 text-center">{t('signup.title')}</h1>
                <p className="text-subtext text-center mb-6">
                    {t('signup.subtitle')}
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, errors, touched, values, handleChange, handleBlur, setFieldValue}) => (
                        <Form className="flex flex-col gap-6">
                            {generalError && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                    {generalError}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={avatarPreview}/>
                                </Avatar>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleAvatarUpload(setFieldValue)}
                                    disabled={isSubmitting}
                                    size="sm"
                                    className="font-bold"
                                >
                                    <UploadIcon/> {t('signup.upload')}
                                </Button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                    className="hidden"
                                />
                            </div>

                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="name">{t('signup.name')}</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder={t('signup.namePlaceholder')}
                                    value={values.name}
                                    onChange={(e) => {
                                        handleChange(e);
                                        if (generalError) setGeneralError('');
                                    }}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="name" component="span" className="text-sm text-red-600"/>
                            </div>

                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="email">{t('signup.email')}</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder={t('signup.emailPlaceholder')}
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
                                <Label htmlFor="password">{t('signup.password')}</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder={t('signup.passwordPlaceholder')}
                                    value={values.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                        if (generalError) setGeneralError('');
                                    }}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                    disabled={isSubmitting}
                                />
                                {!(errors.password && touched.password) &&
                                    <span className="text-xs text-muted-foreground">
                                    {t('signup.passwordRequirements')}
                                </span>}
                                <ErrorMessage name="password" component="span" className="text-sm text-red-600"/>
                            </div>

                            <Button
                                type="submit"
                                variant="default"
                                disabled={isSubmitting}
                                className="relative text-white"
                            >
                                {isSubmitting && (
                                    <Loader2Icon className="animate-spin"/>
                                )}
                                {t('signup.signUpButton')}

                            </Button>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm text-center mt-4 text-subtext ">
                    {t('signup.haveAccount')}{" "}
                    <Button asChild variant="link" className="p-0 h-auto font-medium">
                        <Link to="/signin">{t('signup.signInLink')}</Link>
                    </Button>
                </p>
            </div>
        </div>
    )
}