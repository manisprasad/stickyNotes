import React from 'react';

const GroupSelector = ({ group, groups, setGroup, handleAddGroup }) => {
    return (
        <div className="flex flex-col space-y-2">
            <select
                className="p-2 border rounded bg-gray-800 text-white border-gray-700"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
            >
                <option value="" disabled>Select Group</option>
                {groups.map((group, index) => (
                    <option key={index} value={group} className="bg-gray-800 text-white">
                        {group}
                    </option>
                ))}
            </select>
            <input
                type="text"
                className="p-2 border rounded bg-gray-800 text-white border-gray-700"
                placeholder="New Group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
            />
            <button
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                onClick={handleAddGroup}
            >
                Add Group
            </button>
        </div>
    );
};

export default GroupSelector;
