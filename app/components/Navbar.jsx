"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
    signIn, signOut, useSession, getProviders
} from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex flex-center gap-2">
                <Image
                    src="/assets/images/logo.svg" alt="PromptSphere" width={30} height={30} className="object-contain"
                />
                <p className="logo_text">PromptSphere</p>
            </Link>
            {/* Desktop Navigation*/}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">Créer un prompt</Link>
                        <button type="button" onClick={signOut} className="outline_btn">Se déconnecter</button>
                        <Link href="/profile" >
                            <Image src={session?.user.image} alt="Profile" width={37} height={37} className="rounded-full" />

                        </Link>

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                onClick={() => signIn(provider.id)}
                                key={provider.name}
                                className="black_btn"


                            >
                                S'enregistrer

                            </button>
                        ))}



                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">

                        <Image src={session?.user.image} alt="Profile" width={37} height={37} className="rounded-full" onClick={() => setToggleDropdown
                            ((prev) => !prev)} />


                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Mon Profil
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Créer un prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    S'enregistrer
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar