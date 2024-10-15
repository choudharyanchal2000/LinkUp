import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CiCircleInfo } from 'react-icons/ci'
import { clearAllJobErrors, postJob, resetJobSlice } from '../store/slices/jobSlice';

const JobPost = () => {

    const [title, setTitle] = useState("");
    const [jobType, setJobType] = useState("");
    const [location, setLocation] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [offers, setOffers] = useState("");
    const [jobNiche, setJobNiche] = useState("");
    const [salary, setSalary] = useState("");
    const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
    const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
    const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

    const nichesArray = [
        "Software Development",
        "Web Development",
        "Cybersecurity",
        "Data Science",
        "Artificial Intelligence",
        "Cloud Computing",
        "DevOps",
        "Mobile App Development",
        "Blockchain",
        "Database Administration",
        "Network Administration",
        "UI/UX Design",
        "IT Project Management",
        "IT Support and Helpdesk",
        "Systems Administration",
        "IT Consulting",
        "Game Development",
        "IoT (Internet of Things)",
        "Big Data",
        "Machine Learning",


    ];

    const cities = [
        "New York, NY",
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Hyderabad",
        "Chennai",
        "Kolkata",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Lucknow",
        "Kanpur",
        "Nagpur",
        "Visakhapatnam",
        "Indore",
        "Thane",
        "Bhopal",
        "Patna",
        "Vadodara",
        "Ghaziabad",
        "Ludhiana",
        "Agra",
        "Nashik",
        "Faridabad",
        "Meerut",
        "Rajkot",
        "Varanasi",
        "Srinagar",
        "Aurangabad",
        "Chandigarh",
        "Trivandrum",
        "Kochi",
    ];

    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { loading, error, message } = useSelector((state) => state.jobs);
    const dispatch = useDispatch();

    const handlePostJob = (e) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("jobType", jobType);
        formData.append("location", location);
        formData.append("companyName", companyName);
        formData.append("introduction", introduction);
        formData.append("responsibilities", responsibilities);
        formData.append("qualifications", qualifications);
        offers && formData.append("offers", offers);
        formData.append("jobNiche", jobNiche);
        formData.append("salary", salary);
        hiringMultipleCandidates &&
            formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
        personalWebsiteTitle &&
            formData.append("personalWebsiteTitle", personalWebsiteTitle);
        personalWebsiteUrl &&
            formData.append("personalWebsiteUrl", personalWebsiteUrl);
            console.log(formData);
        dispatch(postJob(formData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllJobErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetJobSlice());
        }
    }, [dispatch, error, loading, message]);


    return (
        <>

            <div className="account_components">
                <h3>Post A Job</h3>
                <div>
                    <label>Job Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Job Title' />
                </div>

                <div>
                    <label>Job Type</label>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)} placeholder='Job Type' >
                        <option value="">Select Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                    </select>
                </div>

                <div>
                    <label>Location</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)} placeholder='location' >
                        <option value="">Select your City</option>
                        {cities.map((city) => {
                            return <option key={cities.indexOf(city)} value={city}>{city}</option>
                        })}

                    </select>
                </div>

                <div>
                    <label>Company Name</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='Company Name' />
                </div>

                <div>
                    <label>Company/Job Indroduction</label>
                    <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder='Company/Job Introduction' rows={7} />
                </div>
                <div>
                    <label>Responsibilities</label>
                    <textarea value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} placeholder='Responsibilities' rows={7} />
                </div>
                <div>
                    <label>Qualifications</label>
                    <textarea value={qualifications} onChange={(e) => setQualifications(e.target.value)} placeholder='Required Qualifications for Job' rows={7} />
                </div>
                <div>
                    <div className='label-infoTag-wrapper'>
                        <label>What We Offer</label>
                        <span><CiCircleInfo />optional</span>
                    </div>
                    <textarea value={offers} onChange={(e) => setOffers(e.target.value)} placeholder='What are we Offering in return' rows={7} />
                </div>
                <div>
                    <label>Job Niche</label>
                    <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)} placeholder='Job Niche' >
                        <option value="">Select Job Niche</option>
                        {nichesArray.map((niche) => {
                            return <option key={nichesArray.indexOf(niche)} value={niche}>{niche}</option>
                        })}

                    </select>
                </div>
                <div>
                    <label>Salary</label>
                    <input type="Number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder='$5000' />
                </div>
                <div>
                    <div className='label-infoTag-wrapper'>
                        <label>Hiring Multiple Candidate</label>
                        <span><CiCircleInfo />optional</span>
                    </div>
                    <select value={hiringMultipleCandidates} onChange={(e) => setHiringMultipleCandidates(e.target.value)} placeholder='Job Type' >
                        <option value="">Hiring Multiple Candidate</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div>
                    <label>Personal Website Title</label>
                    <input type="text" value={personalWebsiteTitle} onChange={(e) => setPersonalWebsiteTitle(e.target.value)} placeholder='Person Website Title/Name' />
                </div>
                <div>
                    <label>Personal Website Link</label>
                    <input type="text" value={personalWebsiteUrl} onChange={(e) => setPersonalWebsiteUrl(e.target.value)} placeholder='Person Website URL/Link' />
                </div>

                <div>
                    <button className='btn' onClick={handlePostJob} disabled={loading}> Post Job </button>
                </div>
            </div>
        </>
    );
}

export default JobPost;
