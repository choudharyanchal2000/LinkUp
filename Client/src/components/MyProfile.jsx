import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <>
            <div className="account_components">
                <h3>My Profiles</h3>
                <div>
                    <label htmlFor="">Full Name</label>
                    <input type="text" disabled value={user && user.name} onChange={(e) => e.target.value} />
                </div>
                <div>
                    <label htmlFor="">Email Address</label>
                    <input type="email" disabled value={user && user.email} onChange={(e) => e.target.value} />
                </div>
                {user && user.role === "Job Seeker" && (
                    <>
                        <label>My Prefered Job Niches</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <input type="text" disabled value={user && user.niches.firstNiche} onChange={(e) => e.target.value} />
                            <input type="text" disabled value={user && user.niches.secondNiche} onChange={(e) => e.target.value} />
                            <input type="text" disabled value={user && user.niches.thirdNiche} onChange={(e) => e.target.value} />
                        </div>
                    </>
                )
                }
                <div>
                    <label htmlFor="">Phone Number</label>
                    <input type="number" disabled value={user && user.phone} onChange={(e) => e.target.value} />
                </div>
                <div>
                    <label htmlFor="">Address</label>
                    <input type="text" disabled value={user && user.address} onChange={(e) => e.target.value} />
                </div>
                <div>
                    <label htmlFor="">Role</label>
                    <input type="text" disabled value={user && user.role} onChange={(e) => e.target.value} />
                </div>
                <div>
                    <label htmlFor="">Joined On</label>
                    <input type="text" disabled value={user && user.createdAt} onChange={(e) => e.target.value} />
                </div>
            </div>
        </>
    );
}

export default MyProfile;
