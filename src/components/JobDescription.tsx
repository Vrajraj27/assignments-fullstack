import React, { useState } from 'react';
import { Job } from '../types';
import { ChevronDown, ChevronUp, Building, MapPin, Briefcase, DollarSign } from 'lucide-react';

interface JobDescriptionProps {
  job: Job;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-teal-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">{job.title}</h2>
        <div className="mt-2 flex flex-wrap gap-3">
          <div className="flex items-center text-teal-100">
            <Building className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.company}</span>
          </div>
          <div className="flex items-center text-teal-100">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center text-teal-100">
            <Briefcase className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.type}</span>
          </div>
          <div className="flex items-center text-teal-100">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.salary}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700">{job.description}</p>
        
        <div className={`mt-4 space-y-4 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Responsibilities</h3>
            <ul className="mt-2 space-y-1 text-gray-700 list-disc pl-5">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800">Requirements</h3>
            <ul className="mt-2 space-y-1 text-gray-700 list-disc pl-5">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800">Benefits</h3>
            <ul className="mt-2 space-y-1 text-gray-700 list-disc pl-5">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <button
          className="mt-4 flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span>View Less</span>
              <ChevronUp className="h-5 w-5 ml-1" />
            </>
          ) : (
            <>
              <span>View Full Job Description</span>
              <ChevronDown className="h-5 w-5 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default JobDescription;