import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAllUpdateProfileErrors, updateProfile } from '../store/slices/updateProfileSlice';
import { toast } from 'react-toastify';
import { getUser } from '../store/slices/userSlice';

const UpdateProfile = () => {
    const { user } = useSelector((state) => state.user);
    const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
    const dispatch = useDispatch()
    const navigateTo = useNavigate()

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);
    const [address, setAddress] = useState(user && user.address);
    const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
    const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);
    const [secondNiche, setSecondNiche] = useState(user && user.niches?.secondNiche);
    const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
    const [resume, setResume] = useState(null);
    const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

    const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        if (user && user.role === "Job Seeker") {
            formData.append("firstNiche", firstNiche);
            formData.append("secondNiche", secondNiche);
            formData.append("thirdNiche", thirdNiche);
            formData.append("coverLetter", coverLetter);
        }
        if (resume) {
            formData.append("resume", resume);
        }
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUpdateProfileErrors());
        }
        if (isUpdated) {
            toast.success("Profile Updated.");
            dispatch(getUser());
            dispatch(clearAllUpdateProfileErrors());
        }
    }, [dispatch, loading, error, isUpdated, user]);


    const resumeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
            const reader = new FileReader();
            reader.onload = () => {
                setResumePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }




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
        "Game Development",
        "IoT (Internet of Things)",
        "Big Data",
        "Machine Learning",
        "IT Project Management",
        "IT Support and Helpdesk",
        "Systems Administration",
        "IT Consulting",
    ];

    return (
        <>
            <div className="account_components">
                <h3>Update Profiles</h3>
                <div>
                    <label htmlFor="">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Phone Number</label>
                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                {user && user.role === "Job Seeker" && (
                    <>
                        <label>My Prefered Job Niches</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <select type="text" value={firstNiche} onChange={(e) => setFirstNiche(e.target.value)} >
                                {nichesArray.map((element, index) => {
                                    return (
                                        <option value={element} key={index}>{element}</option>
                                    )
                                })}
                            </select>
                            <select type="text" value={secondNiche} onChange={(e) => setSecondNiche(e.target.value)} >
                                {nichesArray.map((element, index) => {
                                    return (
                                        <option value={element} key={index}>{element}</option>
                                    )
                                })}
                            </select>
                            <select type="text" value={thirdNiche} onChange={(e) => setThirdNiche(e.target.value)} >
                                {nichesArray.map((element, index) => {
                                    return (
                                        <option value={element} key={index}>{element}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <label>Cover Letter</label>
                            <textarea value={coverLetter}
                                onChange={(e) => { setCoverLetter(e.target.value) }}
                                row={5}
                            />
                        </div>
                        <div>
                            <label>Upload Resume</label>
                            <input type='file' onChange={resumeHandler} />
                        </div>
                        {
                            user && user.resume && (
                                <div>
                                    <p>Resume Preview</p>
                                    <Link to={user.resume && user.resume.url}
                                        target='_blank'
                                        className='view-resume'>
                                        view Resume
                                    </Link>
                                </div>
                            )
                        }
                    </>


                )
                }
                <div className="save_change_btn_wrapper">
<button className='btn' onClick={handleUpdateProfile} disabled={loading}>Save Changes</button>
                </div>

            </div>
        </>
    );
}

export default UpdateProfile;
