import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import globalAPI from '../../../../../services/globalAPI';
import { toast } from "sonner"
import { useParams } from 'react-router';

function PersonalDetail({ enabledNext }) {

    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo) {
            setFormData({
                firstName: resumeInfo.firstName || null,
                lastName: resumeInfo.lastName || null,
                jobTitle: resumeInfo.jobTitle || null,
                address: resumeInfo.address || null,
                phone: resumeInfo.phone || null,
                email: resumeInfo.email || null,
            });
        }
    }, [resumeInfo]);

    const handleInputChange = (e) => {
        enabledNext(false)
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: formData
        }
        globalAPI.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            // console.log(data);
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            // console.log(data);
            setLoading(false);
        })

    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit"
                        disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail