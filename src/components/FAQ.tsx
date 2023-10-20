import React, { useState } from 'react';
import NavBar from '../common/NavBar';

function FAQ() {
    const [ expandedIndex, setExpandedIndex ] = useState(null);

    const faqs = [

        //TODO - Behövs det uppdateringslogik för FAQs?


        {
            question: 'How often should I book a cleaning service?',
            answer: 'It depends on various factors including the size of your property/home, the level of activity and your own personal preference for cleanliness. However, many customers find that a service every other week keeps their property/home fresh and tidy.'
        },
        {
            question: 'How do I make a booking for a cleaning service?',
            answer: 'You can book our services online through our website. Just select your desired cleaning package, specify the date and time that work best for you, and provide the necessary details about your home.'
        },
        {
            question: 'What is your cancellation policy?',
            answer: 'You can cancel your booking without any charge up to 48 hours before the scheduled service. If you cancel less than 48 hours in advance, a cancellation fee may apply.'
        },
        {
            question: 'What should I do to prepare my property/home for the first cleaning service?',
            answer: 'Please ensure a clear path for our cleaners by removing any clutter. If there are specific areas you want us to focus on, or any sensitive materials or areas in your property/home, let us know beforehand.'
        },
        {
            question: 'Do I need to provide cleaning supplies or equipment?',
            answer: 'No, our professionals come equipped with all the necessary cleaning supplies and equipment. However, if you have specific products you want us to use, please let us know.'
        },
        {
            question: 'Are your cleaning products safe for kids and pets?',
            answer: 'Absolutely, we use eco-friendly products that are safe for children and pets. We believe in providing a healthy environment along with our cleaning services.'
        },
        {
            question: 'What measures are in place to ensure the security of my property?',
            answer: 'Our team is fully insured and bonded. We value your trust, so we make sure all our staff undergo thorough background checks and training to ensure the security and safety of your property.'
        },
        {
            question: 'How can I share my specific cleaning preferences or special instructions?',
            answer: 'You can provide special instructions when booking your service online or simply contact us directly. We strive to meet your expectations and will communicate your preferences to the cleaning professionals.'
        }
    ];


    const handleClick = index => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <>
            <NavBar />
            <div>
                <h2>Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <h4 onClick={() => handleClick(index)}>
                            {faq.question}
                        </h4>
                        {expandedIndex === index && <p>{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </>
    );
}

export default FAQ;
