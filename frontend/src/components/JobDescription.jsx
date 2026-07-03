import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const initialJob = location.state?.job;

    const jobData = singleJob || initialJob;
    const { id: jobId } = useParams();

    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        dispatch(setSingleJob(null));
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`
                );

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));

                    if (user) {
                        setIsApplied(
                            res.data.job.applications.some(
                                (application) => application.applicant === user._id
                            )
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user]);

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please login to apply.");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setIsApplied(true);

                dispatch(
                    setSingleJob({
                        ...singleJob,
                        applications: [
                            ...jobData?.applications,
                            { applicant: user._id },
                        ],
                    })
                );

                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    if (!singleJob) {
        return (
            <div className="max-w-7xl mx-auto my-10 text-center">
                Loading...
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                    <h1 className="font-bold text-xl md:text-2xl">{jobData?.title}</h1>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Badge variant="ghost" className="text-blue-700 font-bold">
                            {jobData?.position} Positions
                        </Badge>

                        <Badge variant="ghost" className="text-red-600 font-bold">
                            {jobData?.jobType}
                        </Badge>

                        <Badge variant="ghost" className="text-purple-700 font-bold">
                            {jobData?.salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={applyJobHandler}
                    disabled={isApplied}
                    className={`w-full md:w-auto ${isApplied
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-[#7209b7] hover:bg-[#5f32ad]"
                        }`}
                >
                    {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>

            <h1 className="border-b-2 border-gray-300 font-medium py-4">
                Job Description
            </h1>

            <div className="my-4 space-y-2">
                <h1 className="font-bold">
                    Role:
                    <span className="pl-4 font-normal text-gray-800">
                        {jobData?.title}
                    </span>
                </h1>

                <h1 className="font-bold">
                    Location:
                    <span className="pl-4 font-normal text-gray-800">
                        {jobData?.location}
                    </span>
                </h1>

                <h1 className="font-bold">
                    Description:
                    <span className="pl-4 font-normal text-gray-800">
                        {jobData?.description}
                    </span>
                </h1>

                <h1 className="font-bold">
                    Experience:
                    <span className="pl-4 font-normal text-gray-800">
                        {jobData?.experienceLevel} yrs
                    </span>
                </h1>

                <h1 className="font-bold">
                    Salary:
                    <span className="pl-4 font-normal text-gray-800">
                        {jobData?.salary} LPA
                    </span>
                </h1>

                <h1 className="font-bold">
                    Total Applicants:
                    <span className="pl-4 font-normal text-gray-800">
                        {jobData?.applications?.length || 0}
                    </span>
                </h1>

                <h1 className="font-bold">
                    Posted Date:
                    <span className="pl-4 font-normal text-gray-800">
                        {jobData?.createdAt?.split("T")[0]}
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;