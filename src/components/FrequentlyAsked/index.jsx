import React, { useState, useEffect } from 'react';
import './FrequentlyAsked.scss';

const FrequentlyAsked = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Clean up the state when the component unmounts
    return () => {
      setIsOpen(false);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`faq ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
      <div className="question">{question}</div>
      {isOpen && <div className="answer">{answer}</div>}
    </div>
  );
};

export default FrequentlyAsked;
