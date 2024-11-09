/* eslint-disable react/prop-types */
import { useState } from 'react';
import toast from 'react-hot-toast';

const JoinButton = ({ communityId, isMember, isRequestSent, onJoinRequest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinClick = async () => {
    setIsLoading(true);

    try {
      await onJoinRequest(communityId);
      toast.success('Join Request sent')
    } catch (error) { toast.error('Join Request sent failed!') } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleJoinClick}
      className="bg-sky-500 hover:bg-sky-400 transition duration-300 text-white py-1.5 px-5 rounded-full text-sm"
    >
      {isLoading ? 'Sending Request' : 'Join'}
    </button>
  );
}

export default JoinButton;
