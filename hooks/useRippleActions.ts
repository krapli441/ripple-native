// useRippleActions.ts
import {useState} from 'react';
import {Ripple, AuthToken} from '../types/rippleTypes';

const useRippleActions = (authToken: AuthToken) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const fetchNearbyRipples = async (
    latitude: number,
    longitude: number,
    maxDistance: number,
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://ripple.testpilotapp.com/ripples/nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`,
      );
      if (response.ok) {
        const newRipples: Ripple[] = await response.json();
        setRipples(newRipples);
      } else {
        console.log('리플 불러오기 실패');
      }
    } catch (error) {
      console.error('fetchNearbyRipples Error:', error);
    }
  };

  const handleLike = async (
    rippleId: string,
    userId: string,
  ): Promise<void> => {
    console.log(`Sending like for rippleId: ${rippleId}, userId: ${userId}`); 
    try {
      const response = await fetch(
        `https://ripple.testpilotapp.com/ripples/${rippleId}/like`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId}),
        },
      );

      if (response.ok) {
        const updatedRipple = await response.json();
        setRipples(
          ripples.map(r => {
            if (r._id === rippleId) {
              return {...r, likedUsers: updatedRipple.likedUsers};
            }
            return r;
          }),
        );
      } else {
        console.error('Failed to update like');
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  return {ripples, setRipples, fetchNearbyRipples, handleLike};
};

export default useRippleActions;
