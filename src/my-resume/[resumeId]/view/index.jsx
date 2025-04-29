import Navbar from '@/components/custom/Nav'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import globalAPI from './../../../../services/globalAPI'
import { useParams } from 'react-router'
import ShareButton from '@/dashboard/resume/components/ShareButton'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        globalAPI.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            <div id="no-print">
                <Navbar />

                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
                        resume url with your friends and family </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download PDF</Button>
                        <ShareButton resumeId={resumeId} resumeInfo={resumeInfo} ></ShareButton>
                    </div>
                </div>

            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area" >
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume