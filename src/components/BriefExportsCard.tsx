import React from 'react';
import { FaPaperPlane, FaDownload } from 'react-icons/fa';

interface BriefExportsCardProps {
    title: string;
    isBrief: boolean;
}

const BriefExportsCard: React.FC<BriefExportsCardProps> = ({ title, isBrief }) => (
    <div className="bg-white p-6 rounded-lg border border-border-color shadow-sm h-full">
        <h3 className="font-semibold text-lg text-text-dark mb-4">{title}</h3>
        <div className="space-y-3 text-sm">
            <label className="font-medium text-text-dark">
                {isBrief ? 'Select Recipients' : 'Select Format'}
            </label>
            <select className="w-full p-2 border border-border-color rounded-md bg-white">
                {isBrief ? (
                    <>
                        <option>Role-based: Plant Managers</option>
                        <option>Role-based: All CEOs</option>
                    </>
                ) : (
                    <>
                        <option>Format: CSV</option>
                        <option>Format: XLSX</option>
                        <option>Format: PDF</option>
                    </>
                )}
            </select>
            <label className="font-medium text-text-dark">
                {isBrief ? 'Delivery' : 'Destination'}
            </label>
            <select className="w-full p-2 border border-border-color rounded-md bg-white">
                <option>{isBrief ? 'Send via Email' : 'Webhook to Slack'}</option>
                <option>{isBrief ? 'Send via WhatsApp' : 'Webhook to Teams'}</option>
            </select>
            <button className="w-full mt-2 p-3 flex items-center justify-center gap-2 bg-primary-blue text-white font-semibold rounded-md hover:bg-blue-700">
                {isBrief ? <FaPaperPlane /> : <FaDownload />}
                {isBrief ? 'Send Brief Now' : 'Generate Export'}
            </button>
        </div>
    </div>
);

export default BriefExportsCard;