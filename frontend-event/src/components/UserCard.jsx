import React from 'react'

const UserCard = () => {
    return (
        <div className="max-w-xs w-full bg-Flesh shadow-lg rounded-lg overflow-hidden">
            <div className="text-center p-6 h-96">
                {/* Profile photo */}
                <img className="h-32 w-32 rounded-full mx-auto mb-4" src="https://randomuser.me/api/portraits/men/31.jpg" alt="User Profile Picture" />

                {/* User Name */}
                <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>

                {/* Follow Button */}
                <button className="mt-4 bg-DarkPurple text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none">
                    Follow
                </button>
            </div>
        </div>
    )
}

export default UserCard
