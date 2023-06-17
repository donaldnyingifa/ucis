import React from 'react';
import Image from "react-bootstrap/Image";
import P1 from '../../images/partner/firs.jpeg'
import './partner.scss'

function PartnerAgency() {
  return (
    <>
    <div className='partner'>
      <h5>PartnerAgencies</h5>
      <Image src={P1} />
    </div>

   
    </>
  )
}

export default PartnerAgency