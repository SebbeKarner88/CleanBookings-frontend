import { useState } from 'react';
import NavBar from '../common/NavBar';
import '../styles/FAQ.css'
import { Footer } from '../common/Footer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

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
            question: 'Hur ser er avbokningspolicy ut?',
            answer: 'Du kan avboka din städning utan kostnad upp till 48 timmar innan den bokade tiden. Om bokningen sker senare än så kommer du debiteras en avbokningsavgift.'
        },
        {
            question: 'Vad bör jag göra för att förbereda min bostad/fastighet innan bokad service?',
            answer: 'Plocka bort lösa föremål från golv och andra ytor. Om det finns specifika ytor du vill att vi ska fokusera på eller om det finns känsliga material eller områden, var vänlig och låt oss veta i förväg.'
        },
        {
            question: 'Behöver jag bistå med rengöringsprodukter eller redskap?',
            answer: 'Nej, vår personal tar med sig allt som de kan tänkas behöva. Finns det däremot önskemål på specifika produkter du vill att vi använder behöver du meddela oss i förväg.'
        },
        {
            question: 'Är era rengöringsprodukter säkra för barn och djur?',
            answer: 'Ja. Vi använder miljövänliga produkter som är säkra för barn och djur. Vi vill bidra till en sund miljöhållning i samband med våra städtjänster.'
        },
        {
            question: 'Hur kan jag vara trygg i att min bostad/fastighet är i säkra händer?',
            answer: 'Vi värdesätter våra kunders förtroende och varje medarbetare måste genomgå grundlig bakgrundskoll och upplärning för att säkerställa er trygghet.'
        },
        {
            question: 'Var kan jag delge er om mina specifika önskemål gällande städning, val av produkter eller annat?',
            answer: 'Du kan skicka med ett meddelande när du bokar en tjänst online eller kontakta oss via telefon, mail eller kontaktforumuläret. Du hittar alla våra kontaktuppgifter nedan.'
        }
    ];


    const handleClick = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <>
            <NavBar />
            <div className='faq-container'>
                <h1 className='faq'>Vanliga Frågor</h1>
                <hr id='line' />

                {faqs.map((faq, index) => (
                    <div key={index}>
                        <button
                            type="button"
                            className='faq-question'
                            onClick={() => handleClick(index)}
                            aria-label={`${faq.question} (Tryck på knappen för att expandera/minimera)`}
                        >
                            {faq.question} {
                                index === expandedIndex
                                    ? <ArrowDropUpIcon />
                                    : <ArrowDropDownIcon />
                            }
                        </button>
                        {expandedIndex === index && <div className='faq-answer'>{faq.answer}</div>}
                    </div>
                ))}
            </div>
            <div className='contact-btn'>
                <LinkContainer to="/contact">
                    <Button variant="dark" size="lg" className="btn-dark-purple mb-3 my-5">
                        Kontakta oss
                    </Button>
                </LinkContainer>
            </div>
            <Footer />
        </>
    );
}

export default FAQ;
