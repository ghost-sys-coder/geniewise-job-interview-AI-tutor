import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/shared/InterviewCard'

const Home = () => {
  return (
    <>
      <section className='card-cta'>
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get interviewed ready with AI powered practice and feedback</h2>
          <p>Practice with real interview questions and get instant feedback</p>
          <Button asChild className='btn-primary'>
            <Link href={"/interview"}>
              Start your interview
            </Link>
          </Button>
        </div>
        <Image
          src={"/robot.png"}
          alt='robot'
          width={400}
          height={400}
          className='max-sm:hidden'
        />
      </section>
      <section className='flex gap-6 flex-col mt-8'>
        <h2>Your interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard key={index} {...interview} />
          ))}
          {/* <p>You haven&apos;t taken any interviews</p> */}
        </div>
      </section>
      <section className='flex gap-6 mt-8 flex-col'>
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard key={index} {...interview} />
          ))}
          {/* <p>There are no interviews available</p> */}
        </div>
      </section>
    </>
  )
}

export default Home