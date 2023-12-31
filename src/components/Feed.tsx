"use client"

import {useEffect, useState} from 'react'
import {PromptCardList} from '@components/PromptCardList'
import {Post} from '@/types/feedTypes'
import Image from 'next/image'
import {fetchAllPosts} from '@utils/dbFetchFunctions'
import {useNotification} from '@contexts/NotificationContext'
import {NotificationContextData} from '@/types/NotificationTypes'

export const Feed = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState<Post[]>([])
    const {setError} = useNotification() as NotificationContextData

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchAllPosts()
            .then(data => setPosts(data as Post[]))
            .catch(e => setError(e.message))
    }, [])

    //  eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        handleSearchChange()
    }, [searchText])

    const handleSearchChange = () => {
        const results: Post[] = []

        posts.forEach(post => {
            if (post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())) ||
                post.creator.username.toLowerCase().includes(searchText.toLowerCase())
            ) results.push(post)
        })

        setSearchResults(results)
    }

    const clearSearchField = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSearchText('')
    }

    const handleESC = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') setSearchText('')
    }

    const handleTagClick = (tag: string) => {
        setSearchText(tag)
    }

    return (
        <section className={'feed'}>
            <form className={'search_form'}>
                <input
                    type={'text'}
                    className={'search_input peer'}
                    placeholder={'Search for a tag or a user...'}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={handleESC}
                />
                <button className={'search_clear_btn'} onClick={clearSearchField}>
                    <Image src={'assets/icons/clear.svg'} alt={'X'} width={16} height={16}
                           style={{display: searchText ? 'block' : 'none'}}/>
                </button>
            </form>

            <PromptCardList
                data={searchText ? searchResults : posts}
                mt={16}
                callbacks={
                    {handleTagClick}
                }
            />
        </section>
    )
}