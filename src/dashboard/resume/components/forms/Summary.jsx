import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import globalAPI from '../../../../../services/globalAPI';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'react-router';
import { AIChatSession } from '../../../../../services/aiModel';

const prompt = "Job Title: {jobTitle}. Generate an array of JSON objects, where each object represents a summary for a different experience level (Fresher, Mid Level, Senior Level). Each object should have two fields: 'experience_level' (string) and 'summary' (string, 3-4 lines). Provide summaries for Fresher, Mid Level, and Senior Level."
function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState();

    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary])

    const GenerateSummaryFromAI = async () => {
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()))

        setAiGenerateSummaryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true)
        const data = {
            data: {
                summary: summary
            }
        }
        globalAPI.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            // console.log(data);
            // console.log(params?.resumeId);
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            // console.log(data);
            // console.log(params?.resumeId);
            setLoading(false);
        })
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-end'>
                        <Button variant="outline" onClick={() => GenerateSummaryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2 items-center">
                            <Brain className='h-4 w-4' />  Generate from AI</Button>
                    </div>
                    <Textarea className="mt-5" required
                        value={summary}
                        defaultValue={summary ? summary : resumeInfo?.summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit"
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>


            {aiGeneratedSummaryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummaryList?.map((item, index) => (
                    <div key={index}
                        onClick={() => setSummary(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}

        </div>
    )
}

export default Summary