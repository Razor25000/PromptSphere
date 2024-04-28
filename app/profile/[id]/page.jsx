import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '../../../components/Profile';

const UserProfile = ({ params }) => {
  // Accéder aux paramètres de recherche uniquement côté client
  const [userName, setUserName] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (params?.id) {
      fetchPosts();
    }
  }, [params?.id]);

  // Cette partie utilise le Suspense pour englober les détails spécifiques au client
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ClientSideProfile userName={userName} userPosts={userPosts} />
    </Suspense>
  );
};

// Composant spécifique au client pour l'utilisation de useSearchParams
const ClientSideProfile = ({ userName, userPosts }) => {
  const [searchParams] = useSearchParams();
  const nameFromSearch = searchParams.get('name');

  useEffect(() => {
    if (nameFromSearch) {
      setUserName(nameFromSearch);
    }
  }, [nameFromSearch]);

  return (
    <Profile
      name={userName || 'User'}
      desc={`Welcome to ${userName}'s personalized profile page. Explore their exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
