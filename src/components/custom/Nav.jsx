import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import { UserButton, useUser } from '@clerk/clerk-react'

function Navbar() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 flex justify-between shadow-md items-center bg-secondary'>
            <Link to={"/"}>
                <img src='/logo.svg' width={100} height={100} />
            </Link>

            {isSignedIn ?
                <div className='flex justify-center items-center gap-2.5'>
                    <Link to={'/dashboard'}>
                        <Button variant="">DashBoard</Button>
                    </Link>
                    <UserButton></UserButton>
                </div> :
                <Link to={"/auth/sign-in"}>
                    <Button>Get Started</Button>
                </Link>
            }
        </div>
    )
}

export default Navbar