import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const CEOBriefCard: React.FC = () => (
    <div className="bg-white p-6 rounded-lg border border-border-color shadow-sm h-full">
        <h3 className="font-semibold text-lg text-text-dark mb-4">60-sec CEO Brief</h3>
        <div className="space-y-3 text-sm">
            <div>
                <h4 className="font-semibold text-text-dark">Daily Summary:</h4>
                <p className="text-text-light">Overall production is on track, with a 2% surplus. Logistics OTD is stable at 94.7%.</p>
            </div>
            <div>
                <h4 className="font-semibold text-text-dark">Top Risk:</h4>
                <p className="text-text-light">Material shortage for Mold B may impact afternoon shifts. <a href="#" className="text-primary-blue font-medium hover:underline">See impact</a></p>
            </div>
            <div>
                <h4 className="font-semibold text-text-dark">Top 3 Actions:</h4>
                <ul className="list-decimal list-inside text-text-light">
                    <li>Approve overtime for Crew C.</li>
                    <li>Expedite alternate supplier order #5821.</li>
                    <li>Reschedule non-critical jobs on Machine 7.</li>
                </ul>
            </div>
        </div>
        <button className="w-full mt-4 p-3 flex items-center justify-center gap-2 bg-gray-100 text-text-dark font-medium rounded-md hover:bg-gray-200">
            <FaPaperPlane /> Send via Email/WhatsApp
        </button>
    </div>
);

export default CEOBriefCard;