import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-4 lg:gap-12'>
                    <ul className='hidden md:flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='hidden md:flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                                <div className="md:hidden">
                                    <button onClick={() => setIsOpen(!isOpen)}>
                                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=''>
                                            <div className='flex gap-2 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                    }

                </div>
            </div>
            {
                isOpen && (
                    <div className="md:hidden bg-white border-t shadow-lg">
                        <ul className="flex flex-col p-4 gap-4 font-medium">

                            {
                                user && user.role === "recruiter" ? (
                                    <>
                                        <li>
                                            <Link onClick={() => setIsOpen(false)} to="/admin/companies">
                                                Companies
                                            </Link>
                                        </li>

                                        <li>
                                            <Link onClick={() => setIsOpen(false)} to="/admin/jobs">
                                                Jobs
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link onClick={() => setIsOpen(false)} to="/">
                                                Home
                                            </Link>
                                        </li>

                                        <li>
                                            <Link onClick={() => setIsOpen(false)} to="/jobs">
                                                Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link onClick={() => setIsOpen(false)} to="/browse">
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )
                            }

                            {
                                !user ? (
                                    <>
                                        <Link onClick={() => setIsOpen(false)} to="/login">
                                            <Button variant="outline" className="w-full">
                                                Login
                                            </Button>
                                        </Link>

                                        <Link onClick={() => setIsOpen(false)} to="/signup">
                                            <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                                                Signup
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {
                                            user.role === "student" && (
                                                <Link
                                                    onClick={() => setIsOpen(false)}
                                                    to="/profile"
                                                >
                                                    View Profile
                                                </Link>
                                            )
                                        }

                                        <Button
                                            variant="outline"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                )
                            }

                        </ul>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar