import React from 'react'
import { DefaultPlayer } from 'react-html5video'
import 'react-html5video/dist/styles.css'
import vid from '../video/tuto.mp4'
function How() {
    return (
        <div className="min-h-full flex items-center justify-center py-14 px-10 sm:px-10 lg:px-8">
            <div className="max-w-lg w-full space-y-40">
                <DefaultPlayer>
                    <source src={vid} type='video/webm' />
                </DefaultPlayer>
            </div>
        </div>
    )
}

export default How