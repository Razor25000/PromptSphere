"use client"
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

  return (
    <nav className='w-full pt-3 mb-16 flex-between'>
      <Link href='/'>
        <div className='flex gap-2 flex-center' style={{ cursor: 'pointer' }}>
          <Image
            src='/assets/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
            className='object-contain'
          />
          <p className='logo_text'>PromptSphère</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt'>
              <button className='black_btn'>Créer un prompt</button>
            </Link>

            <button type='button' onClick={() => signOut()} className='outline_btn'>
              Déconnexion
            </button>

            <Link href='/profile'>
              <div style={{ cursor: 'pointer' }}>
                <Image
                  src={session.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </div>
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
            <div onClick={() => setToggleDropdown(!toggleDropdown)} style={{ cursor: 'pointer' }}>
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </div>
            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile'>
                  <button className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                    Mon profil
                  </button>
                </Link>
                <Link href='/create-prompt'>
                  <button className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                    Créer un prompt
                  </button>
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
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
