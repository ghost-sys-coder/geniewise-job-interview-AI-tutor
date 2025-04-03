import React from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';

enum CallStatus{
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

const Agent = ({ userName }: AgentProps) => {
    const callStatus = CallStatus.ACTIVE;
    const isSpeaking = true;

    const messages = [
        'What is your name?',
        'My name is John Doe.',
        'What is your experience with React?',
        'I have 3 years of experience with React.',
        'What is your experience with Node.js?',
        'I have 2 years of experience with Node.js.',
        'What is your experience with TypeScript?',
        'I have 2 years of experience with TypeScript.',
        'What is your experience with Next.js?',
        'I have 1 year of experience with Next.js.',
        'What is your experience with GraphQL?',    
        'I have 1 year of experience with GraphQL.',
        'What is your experience with MongoDB?',
        'I have 1 year of experience with MongoDB.',
    ]

    const lastMessage = messages[messages.length - 1];


    return (
        <>
            <div className='call-view'>
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src={"/ai-avatar.png"}
                            alt='avatar'
                            width={65}
                            height={54}
                            className='object-cover'
                        />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>AI Interview</h3>
                </div>
                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src={"/user-avatar.png"}
                            alt='user-avatar'
                            width={540}
                            height={540}
                            className='rounded-full object-cover size-[120px]'
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>
            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p className={cn("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100")}>{lastMessage}</p>
                    </div>
                </div>
            )}
            <div className="flex justify-center w-full">
                {callStatus !== 'ACTIVE' ? (
                    <button className='relative btn-call' type='button'>
                        <span className={cn('absolute animate-ping rounded-full  opacity-75', callStatus === "CONNECTING" && 'hidden')} />
                            <span>{callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Start Interview" : "...."}</span>
                    </button>
                ) : (
                    <button className='btn-disconnect' type='button'>End Call</button>
                )}
            </div>
        </>
    )
}

export default Agent