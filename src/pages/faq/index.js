import React, {useEffect} from 'react'
import FrequentlyAsked from '../../components/FrequentlyAsked'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './faq.scss'

function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <>
      <Header />
      <div className='faq-page'>
        <FrequentlyAsked
          question="What is NIMC (National Identity Management Commission)?"
          answer="The NIMC (pronounced as “Neem-See”) is the primary legal institution in Nigeria mandated by law to institutionalize identity management system and regulate the identity sector. (NIMC Act 2007; Sections 1, 2, 5 and 6)."
        />
        <FrequentlyAsked
          question="What is NIMC setup to do (Mandate)?"
          answer={
            <ul>
              <li>To operate and manage the National Identity Management System (NIMS).</li>
              <li> Carry out enrolment of citizens and legal residents and issue a unique National Identification Number (NIN).</li>
              <li> After enrolment, issue a National e-ID Card which is also called a Smart General Multi-Purpose Card (GMPC).</li>
              <li>Manage the National Identity Database (NIDB).</li>
              <li>Harmonize and integrate all databases in the country into one centralized identity (The NIMC database).</li>
              <li> Verification and authentication of citizens’ identity via the platform to be provided by NIMC.</li>
            </ul>
          }
        />
        <FrequentlyAsked
          question="What is National Identity Management System (NIMS) ?"
          answer="National Identity Management System (NIMS) is the infrastructure that is responsible for the management of the NIMC mandate."
        />
        <FrequentlyAsked
          question="What is the National Identification Number (NIN)?"
          answer="The National Identification Number-NIN (pronounced as “Neen”) is a unique number issued to a successful enrolled individual This number is randomly generated and it is issued for life."
        />
        <FrequentlyAsked
          question="Who should register and get a NIN?"
          answer="All citizens and legal residents are eligible to enroll for their National Identification Number (NIN)."
        />
        <FrequentlyAsked
          question="What is the NIN used for?"
          answer="The NIN is used to tie all records about an individual into the National Identity Database and is also used as a valid means of establishing or verifying individual identity."
        />
        <FrequentlyAsked
          question="How can I get my NIN?"
          answer="Upon successful enrolment, a Transaction Slip is issued. The applicant is informed when to come for collection of his/her NIN. A second slip called the National Identification Number (NIN) Slip is issued when the applicant returns to collect his/her NIN. The NIN Slip has your 11 Digit Number at the top left corner, second row. This is the slip that contains the NIN and is valid for all legitimate transactions in Nigeria."
        />
      </div>

      <Footer />
    </>
  )
}

export default FAQ