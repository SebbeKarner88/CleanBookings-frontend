import { useState } from 'react';
import NavBar from '../common/NavBar';
import '../styles/FAQ.css'
import { Footer } from '../common/Footer';
import {MdExpandLess, MdExpandMore} from "react-icons/md";

function FAQ() {
    const [ expandedIndex, setExpandedIndex ] = useState<number | null>(0);
    const faqs = [
        {
            question: 'Hur ofta borde jag boka en städservice?',
            answer: 'Det beror på många olika faktorer så som storleken på ditt hem eller din fastighet, nivån av aktivitet och dina personliga preferenser för renlighet. De flesta kunder tycker att städservice varannan vecka hjälper dem att hålla sitt hem snyggt och prydligt.'
        },
        {
            question: 'Hur bokar jag en städservice hos er?',
            answer: 'Du kan boka våra tjänster online via vår webbsida genom att klicka på "Våra tjänster" i menyn högst upp. Välj den typ av tjänst som passar dig bäst, bestäm datum och tid för när tjänsten ska utföras och fyll i dina personliga uppgifter.'
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


    const handleClick = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <>
            <NavBar />
            <div className='faq-container'>
                <h1 className='faq'>Frequently Asked Questions</h1>

                {faqs.map((faq, index) => (
                    <div key={index}>
                            <button
                                type="button"
                                className='btn fs-4 faq-question'
                                onClick={() => handleClick(index)}
                                aria-label={`${faq.question} (Tryck på knappen för att expandera/minimera)`}
                            >
                                {faq.question} {
                                    index === expandedIndex
                                        ? <MdExpandLess size={35} aria-hidden={true} />
                                        : <MdExpandMore size={35} aria-hidden={true} />
                                }
                            </button>
                        {expandedIndex === index && <div className='faq-answer'>{faq.answer}</div>}
                    </div>
                ))}

            </div>
            <Footer />
        </>
    );
}

export default FAQ;
