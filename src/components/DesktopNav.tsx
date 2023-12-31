"use client"

import Link from 'next/link'
import {navProps} from '@/types/navTypes'
import Image from 'next/image'

export const DesktopNav = ({isUserLoggedIn, handleLogout, handleLogin, providers, userImage}: navProps) => {
    return (
        <div className="large-screen-f">
            {isUserLoggedIn ? (
                <div className={'logged-in-menu'}>
                    <Link href={'/create-post'} className={'black_btn'}>
                        Create Post
                    </Link>

                    <button type={'button'} onClick={handleLogout} className={'outline_btn'}>
                        Logout
                    </button>

                    <Link href={'/profile'}>
                        <Image
                            src={userImage || ''}
                               alt={'Profile'}
                               width={37}
                               height={37}
                               className={'rounded-full'}
                        />
                    </Link>
                </div>
                ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            key={provider.name}
                            type="button"
                            className="black_btn"
                            onClick={() => handleLogin(provider.id, '/')}
                        >
                            Sign In with {provider.name}
                        </button>
                    ))}
                </>
                )}
        </div>
    )
}