"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    getProviders().then((res) => {
      setProviders(res);
    });
  }, []);

  const handleSignOut = () => {
    signOut();
    // Pas besoin de forcer un rafraîchissement ici, `next-auth` va rafraîchir la session.
  };

  return (
    <nav className='w-full pt-3 mb-16 flex-between'>
      <Link href='/' passHref>
        <a className='flex gap-2 flex-center'>
          <Image
            src='/assets/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
            className='object-contain'
          />
          <p className='logo_text'>Promptopia</p>
        </a>
      </Link>

      {/* Desktop Navigation */}
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' passHref>
              <a className='black_btn'>Créer un prompt</a>
            </Link>

            <button type='button' onClick={handleSignOut} className='outline_btn'>
              Déconnexion
            </button>

            <Link href='/profile' passHref>
              <a>
                <Image
                  src={session.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </a>
            </Link>
          </div>
        ) : (
          providers && Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'
            >
              Se connecter avec {provider.name}
            </button>
          ))
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='relative sm:hidden'>
        {session?.user ? (
          <>
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile' passHref>
                  <a className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                    Mon profil
                  </a>
                </Link>
                <Link href='/create-prompt' passHref>
                  <a className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                    Créer un prompt
                  </a>
                </Link>
                <button
                  type='button'
                  onClick={handleSignOut}
                  className='w-full mt-5 black_btn'
                >
                  Déconnexion
                </button>
              </div>
            )}
          </>
        ) : (
          providers && Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'
            >
              Se connecter avec {provider.name}
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;
