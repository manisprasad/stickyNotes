import React from 'react';
import { colors } from './constant.jsx';

const ColorPicker = ({ color, setColor }) => {
    return (
        <select
            className="p-2 border rounded bg-gray-800 text-white border-gray-700"
            value={color}
            onChange={(e) => setColor(e.target.value)}
        >
            {colors.map((color, index) => (
                <option key={index} value={color} className="bg-gray-800 text-white">
                    {color}
                </option>
            ))}
        </select>
    );
};

export default ColorPicker;
