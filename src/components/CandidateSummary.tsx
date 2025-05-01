import React from 'react';
import { CandidateProfile } from '../types';
import { Award, Briefcase as BriefcaseBusiness, GraduationCap, Heart, Lightbulb, Calendar, HelpCircle } from 'lucide-react';

interface CandidateSummaryProps {
  profile: CandidateProfile;
}

const CandidateSummary: React.FC<CandidateSummaryProps> = ({ profile }) => {
  const hasProfileData = Object.values(profile).some(value => 
    Array.isArray(value) ? value.length > 0 : Boolean(value)
  );

  if (!hasProfileData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-gray-500">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Candidate Profile</h3>
          <p className="text-sm">
            As the conversation progresses, we'll build a profile based on the information shared.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">
          {profile.name ? `${profile.name}'s Profile` : 'Candidate Profile'}
        </h3>
      </div>
      
      <div className="p-6 space-y-4">
        {profile.experience && profile.experience.length > 0 && (
          <div className="flex items-start">
            <BriefcaseBusiness className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Experience</h4>
              <ul className="mt-1 text-sm text-gray-600">
                {profile.experience.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {profile.skills && profile.skills.length > 0 && (
          <div className="flex items-start">
            <Award className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Skills</h4>
              <div className="mt-1 flex flex-wrap gap-1">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {profile.education && profile.education.length > 0 && (
          <div className="flex items-start">
            <GraduationCap className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Education</h4>
              <ul className="mt-1 text-sm text-gray-600">
                {profile.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {profile.interests && profile.interests.length > 0 && (
          <div className="flex items-start">
            <Heart className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Interests</h4>
              <div className="mt-1 flex flex-wrap gap-1">
                {profile.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {profile.availability && (
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Availability</h4>
              <p className="mt-1 text-sm text-gray-600">{profile.availability}</p>
            </div>
          </div>
        )}
        
        {profile.strengths && profile.strengths.length > 0 && (
          <div className="flex items-start">
            <Lightbulb className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-700">Strengths</h4>
              <ul className="mt-1 text-sm text-gray-600">
                {profile.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSummary;