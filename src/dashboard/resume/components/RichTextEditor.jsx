import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from '../../../../services/aiModel';
import { toast } from 'sonner';

const PROMPT = 'Generate 5–7 bullet points describing key responsibilities and achievements for the following job position: {positionTitle}. Format the output strictly using valid HTML with <ul> and <li> tags only. There will only 1 object and it should contains only 1 field: "experience_bullets_html" (html).'
function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);
    const GenerateSummaryFromAI = async () => {

        if (!resumeInfo?.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
        setLoading(true)
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

        const result = await AIChatSession.sendMessage(prompt);
        console.log(JSON.parse(result.response.text()));
        const resp = JSON.parse(result.response.text());
        const newValue = resp[0].experience_bullets_html;
        setValue(newValue);
        console.log(resp);
        onRichTextEditorChange({ target: { value: newValue } });
        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between items-center my-2'>
                <label className='text-xs'>Summary</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummaryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor