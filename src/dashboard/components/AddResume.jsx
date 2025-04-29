import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import globalAPI from '../../../services/globalAPI';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const onCreate = async () => {
        setLoading(true)
        const uuid = uuidv4();
        const data = {
            data: {
                resumeId: uuid,
                title: resumeTitle,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        globalAPI.CreateNewResume(data).then(resp => {
            if (resp) {
                setLoading(false);
                navigation('/dashboard/resume/' + resp.data.data.documentId + "/edit");
            }
        }, (error) => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div className='p-14 py-24 border-2 items-center flex justify-center bg-secondary rounded-lg h-60
            hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
                onClick={() => setOpenDialog(true)}>
                <PlusSquare></PlusSquare>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Resume's Title
                            <Input className="my-2" placeholder="Ex. FullStack Resume"
                                onChange={(e) => setResumeTitle(e.target.value)} />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={() => onCreate()}>
                                {loading ?
                                    <Loader2 className='animate-spin' /> : 'Create'
                                }
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume