// src/Note.js
import React from 'react';
import { motion } from "framer-motion"

const Note = ({ isSticky, selectedGroup, content, user, highlightColor,refrence }) => {
    return (
        <>
            {isSticky ?
                <div className={`p-4 m-3 w-60 h-60 rounded-lg shadow-md ${highlightColor}`}>
                    <h4 className="font-semibold">{isSticky ? 'Sticky Note' : 'Non Sticky Note'}</h4>
                    <p className="text-sm"><strong>Group:</strong> {selectedGroup}</p>
                    <p className="text-sm"><strong>User:</strong> {user}</p>
                    <p className="mt-2">{content}</p>
                </div>:
                <motion.div drag dragConstraints={refrence} className={`p-4 m-3 w-60 h-60 rounded-lg shadow-md ${highlightColor}`}>
                    <h4 className="font-semibold">{isSticky ? 'Sticky Note' : 'Non Sticky Note'}</h4>
                    <p className="text-sm"><strong>Group:</strong> {selectedGroup}</p>
                    <p className="text-sm"><strong>User:</strong> {user}</p>
                    <p className="mt-2">{content}</p>
                </motion.div>

            }

        </>
    );
};

export default Note;
